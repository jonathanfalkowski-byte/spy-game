import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { z } from 'zod';
import { initialState, reducer } from '../state/reducer';
import { availableQaActions, stableState, stateDigest, transcriptFromSnapshots, type QaAction, type QaTranscript, type QaTranscriptEntry } from './m1';
import { InteractionSemanticsSchema, interactionSemanticsForActionTypes } from './m2-interaction-semantics';
import type { GameEvent } from '../state/actions';
import type { GameState } from '../state/schema';

/** M1 is deterministic truth; M2 is an advisory, evidence-gated reviewer. */
export const M2_VERSION = 'm2-v1';

export const M2_TRANSITION_REVIEW_RULE =
  'Before claiming that state provenance contradicts dialogue, inspect the entire action transition: the player-selected utterance or thought, every emitted history record, the immediate response, next-scene narration, and resulting state. Do not infer speaker attribution solely from the final line in a transition. Do not infer gameplay semantics solely from action names. For evidence, selection, disclosure, attachment, consent, refusal, resource transfer, or relationship claims, consult runtime state, transition history, and interactionSemantics before making a causal claim.';

/** Lossless context format. State is delta encoded, never semantically summarized. */
export const M2_CONTEXT_COMPRESSION_VERSION = 'm2-context-delta-v1' as const;

const StateSnapshotSchema = z
  .object({
    node: z.string().max(120),
    claims: z.array(z.string().max(500)).max(500),
    facts: z.array(z.string().max(500)).max(500),
    inferences: z.array(z.unknown()).max(1000),
    evidence: z.array(z.string().max(80)).max(20),
    custody: z.unknown().nullable(),
    knowledge: z.array(z.string().max(500)).max(500),
    npcKnowledge: z.record(z.string(), z.object({ known: z.array(z.unknown()).max(500), beliefs: z.array(z.unknown()).max(500) }).strict()),
    relationships: z.record(z.string(), z.unknown()),
    resources: z.record(z.string(), z.unknown()),
    draft: z.unknown().nullable(),
    report: z.unknown().nullable(),
  })
  .strict();
export type M2StateSnapshot = z.infer<typeof StateSnapshotSchema>;

const ListDeltaSchema = z.object({ added: z.array(z.unknown()).default([]), removed: z.array(z.unknown()).default([]) }).strict();
const StateDeltaSchema = z
  .object({
    knowledge: ListDeltaSchema.optional(),
    evidence: ListDeltaSchema.optional(),
    facts: ListDeltaSchema.optional(),
    claims: ListDeltaSchema.optional(),
    inferences: ListDeltaSchema.optional(),
    npcKnowledgeAdded: z.array(z.object({ npc: z.string(), value: z.unknown() }).strict()).default([]),
    npcKnowledgeRemoved: z.array(z.object({ npc: z.string(), value: z.unknown() }).strict()).default([]),
    npcBeliefsAdded: z.array(z.object({ npc: z.string(), value: z.unknown() }).strict()).default([]),
    npcBeliefsRemoved: z.array(z.object({ npc: z.string(), value: z.unknown() }).strict()).default([]),
    custodyChanged: z.object({ from: z.unknown(), to: z.unknown() }).strict().optional(),
    relationshipChanges: z.record(z.string(), z.object({ from: z.unknown(), to: z.unknown() }).strict()).default({}),
    resourceChanges: z.record(z.string(), z.object({ from: z.unknown(), to: z.unknown() }).strict()).default({}),
    fieldChanges: z.record(z.string(), z.object({ from: z.unknown(), to: z.unknown() }).strict()).default({}),
  })
  .strict();
export type M2StateDelta = z.infer<typeof StateDeltaSchema>;

const CompressedTransitionSchema = z
  .object({
    step: z.number().int().positive(),
    previousNode: z.string().max(120),
    nextNode: z.string().max(120),
    action: z.object({
      id: z.string().max(300),
      type: z.string().max(80),
      source: z.string().max(160),
      intent: z.unknown(),
      previousNode: z.string().max(120),
      nextNode: z.string().max(120),
      choiceId: z.string().max(120).optional(),
    }).strict(),
    emittedHistory: z.array(z.object({ node: z.string().max(120), blocks: z.array(z.unknown()).max(100) }).strict()).max(100),
    stateDelta: StateDeltaSchema,
  })
  .strict();
export type M2CompressedTransition = z.infer<typeof CompressedTransitionSchema>;

function compactAction(action: NonNullable<ReturnType<typeof finalEntry>['action']>) {
  return {
    id: action.id,
    type: action.type,
    source: action.source,
    intent: action.intent,
    previousNode: action.previousNode,
    nextNode: action.nextNode,
    ...(action.choiceId ? { choiceId: action.choiceId } : {}),
  };
}

const CheckpointSchema = z.object({
  step: z.number().int().nonnegative(),
  node: z.string().max(120),
  reason: z.enum(['initial', 'chapter-entry', 'chapter-completion', 'reconvergence', 'milestone']),
  stateDigest: z.string().regex(/^[a-f0-9]{64}$/),
}).strict();
export type M2ContextCheckpoint = z.infer<typeof CheckpointSchema>;

const CompressedTranscriptSchema = z.object({
  version: z.literal(M2_CONTEXT_COMPRESSION_VERSION),
  initialState: StateSnapshotSchema,
  transitions: z.array(CompressedTransitionSchema).max(10000),
  checkpoints: z.array(CheckpointSchema).max(2000),
  finalState: StateSnapshotSchema,
}).strict();
export type M2CompressedTranscript = z.infer<typeof CompressedTranscriptSchema>;

export const M2FindingClassificationSchema = z.enum([
  'TRUE_ISSUE',
  'USEFUL_WARNING',
  'FALSE_POSITIVE',
  'INSUFFICIENT_EVIDENCE',
]);
export type M2FindingClassification = z.infer<typeof M2FindingClassificationSchema>;

/** Human follow-up disposition is calibration/reporting metadata, separate from finding classification. */
export const M2HumanDispositionSchema = z.enum([
  'ACTIONABLE_CURRENT',
  'KNOWN_FROZEN_HISTORICAL',
  'ACCEPTED_DESIGN_DEBT',
  'RESOLVED_CURRENT',
  'NEEDS_DECISION',
]);
export type M2HumanDisposition = z.infer<typeof M2HumanDispositionSchema>;

export const M2HumanClassificationRecordSchema = z
  .object({
    reviewer: z.string().min(1).max(80),
    classification: M2FindingClassificationSchema,
    disposition: M2HumanDispositionSchema.optional(),
    routeId: z.string().min(1).max(160).optional(),
    findingId: z.string().min(1).max(200).optional(),
  })
  .strict();
export type M2HumanClassificationRecord = z.infer<typeof M2HumanClassificationRecordSchema>;

/** Explicit route authority for reports; this is derived from runtime revision metadata, never prose. */
export const M2RouteAuthoritySchema = z
  .object({
    source: z.enum(['AUTHENTICATED_FROZEN', 'CURRENT_AUTHORING']),
    authenticated: z.boolean(),
    frozen: z.boolean(),
    currentAuthoring: z.boolean(),
  })
  .strict();
export type M2RouteAuthority = z.infer<typeof M2RouteAuthoritySchema>;

/** Revision 17 is the current authoring line; revisions through 16 are authenticated frozen history. */
export function routeAuthorityForRevision(contentRevision: number): M2RouteAuthority {
  const currentAuthoring = contentRevision >= 17;
  return currentAuthoring
    ? { source: 'CURRENT_AUTHORING', authenticated: false, frozen: false, currentAuthoring: true }
    : { source: 'AUTHENTICATED_FROZEN', authenticated: true, frozen: true, currentAuthoring: false };
}

export type M2HumanClassificationMetrics = {
  reviewedFindings: number;
  trueIssues: number;
  usefulWarnings: number;
  falsePositives: number;
  insufficientEvidence: number;
};

/** Aggregate human labels by reviewer; this never auto-labels a finding. */
export function summarizeHumanClassifications(records: readonly M2HumanClassificationRecord[]): Record<string, M2HumanClassificationMetrics> {
  const summary: Record<string, M2HumanClassificationMetrics> = {};
  for (const record of records) {
    const parsed = M2HumanClassificationRecordSchema.parse(record);
    const metrics = summary[parsed.reviewer] ?? {
      reviewedFindings: 0,
      trueIssues: 0,
      usefulWarnings: 0,
      falsePositives: 0,
      insufficientEvidence: 0,
    };
    metrics.reviewedFindings += 1;
    if (parsed.classification === 'TRUE_ISSUE') metrics.trueIssues += 1;
    if (parsed.classification === 'USEFUL_WARNING') metrics.usefulWarnings += 1;
    if (parsed.classification === 'FALSE_POSITIVE') metrics.falsePositives += 1;
    if (parsed.classification === 'INSUFFICIENT_EVIDENCE') metrics.insufficientEvidence += 1;
    summary[parsed.reviewer] = metrics;
  }
  return summary;
}

export const M2SeveritySchema = z.enum(['BLOCKER', 'HIGH', 'MEDIUM', 'LOW']);
export type M2Severity = z.infer<typeof M2SeveritySchema>;

export const M2CategorySchema = z.enum([
  'CONTINUITY',
  'LOGIC',
  'KNOWLEDGE',
  'CHARACTER',
  'INVESTIGATION',
  'AGENCY_POWER',
  'ADULT_THRILLER',
  'PROSE',
  'ROUTE_COHESION',
]);
export type M2Category = z.infer<typeof M2CategorySchema>;

export const M2ConfidenceSchema = z.enum(['HIGH', 'MEDIUM', 'LOW']);
export type M2Confidence = z.infer<typeof M2ConfidenceSchema>;

export const M2ReviewerSchema = z.enum([
  'CONTINUITY',
  'LOGIC',
  'KNOWLEDGE',
  'CHARACTER',
  'INVESTIGATION',
  'AGENCY_POWER',
  'ADULT_THRILLER',
  'PROSE',
  'ROUTE_COHESION',
]);
export type M2Reviewer = z.infer<typeof M2ReviewerSchema>;

export const M2EvidenceSchema = z
  .object({
    type: z.string().min(1).max(80),
    reference: z.string().min(1).max(500),
    excerpt: z.string().max(2000).optional(),
  })
  .strict();
export type M2Evidence = z.infer<typeof M2EvidenceSchema>;

const M2FindingBaseSchema = z
  .object({
    reviewer: M2ReviewerSchema,
    reviewerVersion: z.string().regex(/^v\d+$/),
    provider: z.string().max(100).optional(),
    model: z.string().max(100).optional(),
    reviewers: z.array(M2ReviewerSchema).max(20).default([]),
    transcriptDigest: z.string().regex(/^[a-f0-9]{64}$/),
    contextDigest: z.string().regex(/^[a-f0-9]{64}$/),
    severity: M2SeveritySchema,
    category: M2CategorySchema,
    routeId: z.string().min(1).max(160),
    seed: z.number().int().nonnegative().optional(),
    chapter: z.string().max(80).optional(),
    node: z.string().min(1).max(120),
    finding: z.string().min(1).max(5000),
    currentEvidence: z.array(M2EvidenceSchema).max(20),
    priorEvidence: z.array(M2EvidenceSchema).max(20),
    stateEvidence: z.array(M2EvidenceSchema).max(20),
    reproductionTrace: z.array(z.string().max(300)).max(10000).default([]),
    whyItMatters: z.string().min(1).max(3000),
    confidence: M2ConfidenceSchema,
    humanReviewRequired: z.literal(true),
  })
  .strict();

/** High-severity narrative claims must be anchored in both present and prior/state evidence. */
export const M2FindingSchema = M2FindingBaseSchema.superRefine((finding, ctx) => {
  if ((finding.severity === 'HIGH' || finding.severity === 'BLOCKER') && finding.currentEvidence.length === 0) {
    ctx.addIssue({ code: 'custom', path: ['currentEvidence'], message: 'HIGH/BLOCKER findings require current evidence.' });
  }
  if (
    (finding.severity === 'HIGH' || finding.severity === 'BLOCKER') &&
    finding.priorEvidence.length === 0 &&
    finding.stateEvidence.length === 0
  ) {
    ctx.addIssue({ code: 'custom', path: ['priorEvidence'], message: 'HIGH/BLOCKER findings require prior transcript or state evidence.' });
  }
});
export type M2Finding = z.infer<typeof M2FindingSchema>;
export type M2FindingInput = z.input<typeof M2FindingBaseSchema>;

export const M2ReasonSchema = z.enum([
  'GOLDEN_ROUTE',
  'CHANGED_ROUTE',
  'NEW_CONTENT',
  'HIGH_RISK_RECONVERGENCE',
  'DETERMINISTIC_WARNING',
  'DETERMINISTIC_FAILURE',
  'RARE_STATE_COMBINATION',
  'FUZZ_SAMPLE',
]);
export type M2SelectionReason = z.infer<typeof M2ReasonSchema>;

export const QaNarrativeCandidateSchema = z
  .object({
    routeId: z.string().min(1).max(160),
    seed: z.number().int().nonnegative().optional(),
    reason: M2ReasonSchema,
    riskSignals: z.array(z.string().max(160)).max(30).default([]),
    transcriptPath: z.string().max(500).optional(),
    stateSummary: z
      .object({
        node: z.string().max(120),
        contentRevision: z.number().int().nonnegative(),
        authority: M2RouteAuthoritySchema,
        stateDigest: z.string().regex(/^[a-f0-9]{64}$/),
        steps: z.number().int().nonnegative(),
      })
      .strict(),
    equivalenceSignature: z.string().regex(/^[a-f0-9]{64}$/),
  })
  .strict();
export type QaNarrativeCandidateMetadata = z.infer<typeof QaNarrativeCandidateSchema>;

export type QaNarrativeCandidate = QaNarrativeCandidateMetadata & { transcript: QaTranscript };

export const NarrativeContextSchema = z
  .object({
    compressionVersion: z.literal(M2_CONTEXT_COMPRESSION_VERSION),
    sourceTranscriptDigest: z.string().regex(/^[a-f0-9]{64}$/),
    compressedContextDigest: z.string().regex(/^[a-f0-9]{64}$/),
    route: z
      .object({
        routeId: z.string().min(1).max(160),
        seed: z.number().int().nonnegative().optional(),
        contentRevision: z.number().int().nonnegative(),
        authority: M2RouteAuthoritySchema,
        reason: M2ReasonSchema,
        riskSignals: z.array(z.string().max(160)).max(30),
        equivalenceSignature: z.string().regex(/^[a-f0-9]{64}$/),
      })
      .strict(),
    currentScene: z
      .object({
        node: z.string().min(1).max(120),
        chapter: z.string().max(80).optional(),
        movement: z.string().max(80).optional(),
        location: z.string().max(80).optional(),
        time: z.string().max(80).optional(),
      })
      .strict(),
    routeHistory: z
      .object({
        milestones: z.array(z.string().max(120)).max(1000),
        checkpoints: z.array(z.object({ step: z.number().int().nonnegative(), node: z.string().max(120), reason: z.string().max(80) }).strict()).max(2000),
      })
      .strict(),
    interactionSemantics: InteractionSemanticsSchema,
    visualState: z
      .object({
        shotId: z.string().max(160).optional(),
        assetId: z.string().max(160).optional(),
        wardrobe: z.string().max(500).optional(),
        bodyState: z.string().max(500).optional(),
      })
      .strict(),
    transcript: CompressedTranscriptSchema,
    fixture: z.enum(['continuity-contradiction', 'unsourced-knowledge', 'semantic-misinterpretation', 'reconverged-preserved', 'clean']).optional(),
  })
  .strict();
export type NarrativeContext = z.infer<typeof NarrativeContextSchema>;

export const ReviewerContractSchema = z
  .object({
    reviewer: M2ReviewerSchema,
    version: z.string().regex(/^v\d+$/),
    promptPath: z.string().min(1).max(300),
    checks: z.array(z.string().min(1).max(240)).min(1).max(30),
  })
  .strict();
export type ReviewerContract = z.infer<typeof ReviewerContractSchema>;

export const M2ReportSchema = z
  .object({
    version: z.literal(M2_VERSION),
    routesReviewed: z.number().int().nonnegative(),
    deduplicatedRoutes: z.number().int().nonnegative(),
    selected: z.array(QaNarrativeCandidateSchema).max(100),
    reviewerCalls: z.number().int().nonnegative(),
    estimatedContextBytes: z.number().int().nonnegative(),
    externalCalls: z.number().int().nonnegative(),
    findings: z.array(M2FindingSchema).max(10000),
    summary: z.record(z.string(), z.number().int().nonnegative()),
    mockFixtures: z.record(z.string(), z.string()).optional(),
  })
  .strict();
export type M2Report = z.infer<typeof M2ReportSchema>;

export const REVIEWER_CONTRACTS: readonly ReviewerContract[] = [
  { reviewer: 'CONTINUITY', version: 'v1', promptPath: 'docs/qa/prompts/continuity.v1.md', checks: ['location/time', 'wardrobe/props', 'evidence custody', 'relationships', 'prior event references'] },
  { reviewer: 'LOGIC', version: 'v1', promptPath: 'docs/qa/prompts/logic.v1.md', checks: ['causes precede consequences', 'refusal/acceptance remain meaningful', 'state-supported route changes', 'interaction semantics distinguish read, analyze, connect, and submit'] },
  { reviewer: 'KNOWLEDGE', version: 'v1', promptPath: 'docs/qa/prompts/knowledge.v1.md', checks: ['NPC knowledge has a source', 'beliefs are distinct from canon truth'] },
  { reviewer: 'CHARACTER', version: 'v1', promptPath: 'docs/qa/prompts/character.v1.md', checks: ['voice', 'goals and values', 'behavioral reversals'] },
  { reviewer: 'INVESTIGATION', version: 'v1', promptPath: 'docs/qa/prompts/investigation.v1.md', checks: ['evidence provenance', 'proof custody', 'wrong hypotheses remain valid', 'read, analyze, infer, submit, and recipient state remain distinct'] },
  { reviewer: 'AGENCY_POWER', version: 'v1', promptPath: 'docs/qa/prompts/agency-power.v1.md', checks: ['consent/compliance', 'desire/action', 'dependency/love', 'control/care'] },
  { reviewer: 'ADULT_THRILLER', version: 'v1', promptPath: 'docs/qa/prompts/adult-thriller.v1.md', checks: ['adult tension follows state', 'coercion is not mutual willingness', 'non-Julian possibilities remain'] },
  { reviewer: 'PROSE', version: 'v1', promptPath: 'docs/qa/prompts/prose.v1.md', checks: ['repetition', 'transitions', 'POV', 'tonal continuity'] },
  { reviewer: 'ROUTE_COHESION', version: 'v1', promptPath: 'docs/qa/prompts/route-cohesion.v1.md', checks: ['consequences persist', 'chapter transitions', 'reconvergence history'] },
];

const contractByReviewer = new Map(REVIEWER_CONTRACTS.map((contract) => [contract.reviewer, contract]));

function digest(value: unknown) {
  return createHash('sha256').update(stableState(value)).digest('hex');
}

/** Convert a completed M1 state to a compact, replay-authenticated transcript. */
export function transcriptFromGameState(state: GameState, seed?: number): QaTranscript {
  let current = initialState(state.contentRevision ?? 13);
  const snapshots = [current];
  const actions: QaAction[] = [];
  const trace: string[] = [];
  for (const event of state.ledger as GameEvent[]) {
    const { expectedRevision: _expectedRevision, ...intent } = event.action;
    const action = availableQaActions(current).find((candidate) => stableState(candidate.intent) === stableState(intent));
    if (!action) throw new Error(`M2 transcript conversion could not resolve action ${event.action.type}.`);
    current = reducer(current, event.action);
    snapshots.push(current);
    actions.push(action);
    trace.push(action.id);
  }
  if (stateDigest(current) !== stateDigest(state)) throw new Error('M2 transcript conversion diverged from the M1 state.');
  return transcriptFromSnapshots(snapshots, actions, seed, trace);
}

function finalEntry(transcript: QaTranscript): QaTranscriptEntry {
  return transcript.entries.at(-1) ?? {
    step: 0,
    kind: 'initial',
    nextNode: 'unknown',
    node: 'unknown',
    emittedHistory: [],
    blocks: [],
    evidence: [],
    knowledge: [],
    custody: null,
    npcKnowledge: {},
    resources: { opportunities: 0, clinicOpportunity: 0, missionRemaining: 0, relationships: {} },
  } as unknown as QaTranscriptEntry;
}

/** Signature uses history and state-bearing milestones; it never uses node alone. */
export function routeEquivalenceSignature(transcript: QaTranscript) {
  const final = finalEntry(transcript);
  return digest({
    contentRevision: transcript.contentRevision,
    actions: transcript.routeTrace,
    final: {
      node: final.node,
      evidence: final.evidence,
      knowledge: final.knowledge,
      custody: final.custody,
      resources: final.resources,
      npcKnowledge: final.npcKnowledge,
    },
  });
}

export function candidateFromTranscript(input: {
  routeId: string;
  transcript: QaTranscript;
  reason: M2SelectionReason;
  riskSignals?: string[];
  transcriptPath?: string;
}): QaNarrativeCandidate {
  const final = finalEntry(input.transcript);
  return {
    routeId: input.routeId,
    seed: input.transcript.seed,
    reason: input.reason,
    riskSignals: input.riskSignals ?? [],
    transcriptPath: input.transcriptPath,
    stateSummary: {
      node: final.node,
      contentRevision: input.transcript.contentRevision,
      authority: routeAuthorityForRevision(input.transcript.contentRevision),
      stateDigest: digest(final),
      steps: input.transcript.routeTrace.length,
    },
    equivalenceSignature: routeEquivalenceSignature(input.transcript),
    transcript: input.transcript,
  };
}

const reasonPriority: Record<M2SelectionReason, number> = {
  CHANGED_ROUTE: 0,
  NEW_CONTENT: 1,
  DETERMINISTIC_FAILURE: 2,
  DETERMINISTIC_WARNING: 3,
  HIGH_RISK_RECONVERGENCE: 4,
  GOLDEN_ROUTE: 5,
  RARE_STATE_COMBINATION: 6,
  FUZZ_SAMPLE: 7,
};

export type SelectionResult = {
  selected: QaNarrativeCandidate[];
  considered: number;
  deduplicated: number;
  budget: number;
  equivalenceGroups: Record<string, string[]>;
};

/** Budget is a ceiling: no filler routes are added to reach it. */
export function selectNarrativeCandidates(candidates: QaNarrativeCandidate[], budget = 30): SelectionResult {
  if (!Number.isInteger(budget) || budget < 0) throw new Error('Narrative review budget must be a non-negative integer.');
  const sorted = [...candidates].sort((a, b) =>
    reasonPriority[a.reason] - reasonPriority[b.reason] ||
    b.riskSignals.length - a.riskSignals.length ||
    a.routeId.localeCompare(b.routeId),
  );
  const groups: Record<string, string[]> = {};
  const representatives: QaNarrativeCandidate[] = [];
  for (const candidate of sorted) {
    const group = groups[candidate.equivalenceSignature] ?? [];
    group.push(candidate.routeId);
    groups[candidate.equivalenceSignature] = group;
    if (group.length === 1) representatives.push(candidate);
  }
  return {
    selected: representatives.slice(0, budget),
    considered: candidates.length,
    deduplicated: representatives.length,
    budget,
    equivalenceGroups: groups,
  };
}

function chapterFromNode(node: string) {
  const prefix = node.split('.')[0];
  if (prefix.startsWith('chapter')) return prefix;
  if (['apartment', 'commute', 'office', 'helix', 'maya', 'ending', 'file', 'security', 'sloane', 'refusal', 'release', 'evening', 'warning', 'dayend', 'clinic', 'mission'].includes(prefix)) return prefix;
  return undefined;
}

function majorChoices(routeTrace: string[]) {
  return routeTrace.filter((action) => /CHOOSE|CONTINUE|SUBMIT|SPEND|CONNECT|REVIEW/.test(action));
}

function entrySnapshot(entry: ReturnType<typeof finalEntry>): M2StateSnapshot {
  return {
    node: entry.node,
    claims: [...(entry.claims ?? [])],
    facts: [...(entry.facts ?? [])],
    inferences: [...(entry.inferences ?? [])],
    evidence: [...entry.evidence],
    custody: entry.custody,
    knowledge: [...entry.knowledge],
    npcKnowledge: entry.npcKnowledge as M2StateSnapshot['npcKnowledge'],
    relationships: entry.resources.relationships,
    resources: {
      opportunities: entry.resources.opportunities,
      clinicOpportunity: entry.resources.clinicOpportunity,
      missionRemaining: entry.resources.missionRemaining,
    },
    draft: entry.draft ?? null,
    report: entry.report ?? null,
  };
}

function same(a: unknown, b: unknown) {
  return stableState(a) === stableState(b);
}

function listDelta(previous: unknown[], next: unknown[]) {
  if (same(previous, next)) return undefined;
  const remaining = [...previous];
  const removed: unknown[] = [];
  for (const value of previous) {
    const index = remaining.findIndex((candidate) => same(candidate, value));
    const nextIndex = next.findIndex((candidate) => same(candidate, value));
    if (index >= 0 && nextIndex >= 0) remaining.splice(index, 1);
    else if (index >= 0) {
      remaining.splice(index, 1);
      removed.push(value);
    }
  }
  const added = next.filter((value) => !previous.some((candidate) => same(candidate, value)));
  const replayed = [...previous.filter((value) => !removed.some((candidate) => same(candidate, value))), ...added];
  if (!same(replayed, next)) return { added: [...next], removed: [...previous] };
  return { added, removed };
}

function keyedNpcDelta(previous: Record<string, { known?: unknown[]; beliefs?: unknown[] }>, next: Record<string, { known?: unknown[]; beliefs?: unknown[] }>) {
  const result = { knownAdded: [] as Array<{ npc: string; value: unknown }>, knownRemoved: [] as Array<{ npc: string; value: unknown }>, beliefsAdded: [] as Array<{ npc: string; value: unknown }>, beliefsRemoved: [] as Array<{ npc: string; value: unknown }> };
  const names = new Set([...Object.keys(previous), ...Object.keys(next)]);
  for (const npc of names) {
    const oldKnown = previous[npc]?.known ?? [];
    const newKnown = next[npc]?.known ?? [];
    const oldBeliefs = previous[npc]?.beliefs ?? [];
    const newBeliefs = next[npc]?.beliefs ?? [];
    const known = listDelta(oldKnown, newKnown);
    const beliefs = listDelta(oldBeliefs, newBeliefs);
    for (const value of known?.added ?? []) result.knownAdded.push({ npc, value });
    for (const value of known?.removed ?? []) result.knownRemoved.push({ npc, value });
    for (const value of beliefs?.added ?? []) result.beliefsAdded.push({ npc, value });
    for (const value of beliefs?.removed ?? []) result.beliefsRemoved.push({ npc, value });
  }
  return result;
}

function deltaBetween(previous: M2StateSnapshot, next: M2StateSnapshot): M2StateDelta {
  const delta: M2StateDelta = {
    npcKnowledgeAdded: [], npcKnowledgeRemoved: [], npcBeliefsAdded: [], npcBeliefsRemoved: [],
    relationshipChanges: {}, resourceChanges: {}, fieldChanges: {},
  };
  for (const field of ['knowledge', 'evidence', 'facts', 'claims', 'inferences'] as const) {
    const value = listDelta(previous[field], next[field]);
    if (value) delta[field] = value as M2StateDelta[typeof field];
  }
  const npc = keyedNpcDelta(previous.npcKnowledge, next.npcKnowledge);
  delta.npcKnowledgeAdded = npc.knownAdded;
  delta.npcKnowledgeRemoved = npc.knownRemoved;
  delta.npcBeliefsAdded = npc.beliefsAdded;
  delta.npcBeliefsRemoved = npc.beliefsRemoved;
  if (!same(previous.custody, next.custody)) delta.custodyChanged = { from: previous.custody, to: next.custody };
  for (const key of new Set([...Object.keys(previous.relationships), ...Object.keys(next.relationships)])) {
    if (!same(previous.relationships[key], next.relationships[key])) delta.relationshipChanges[key] = { from: previous.relationships[key], to: next.relationships[key] };
  }
  for (const key of new Set([...Object.keys(previous.resources), ...Object.keys(next.resources)])) {
    if (!same(previous.resources[key], next.resources[key])) delta.resourceChanges[key] = { from: previous.resources[key], to: next.resources[key] };
  }
  for (const key of ['draft', 'report'] as const) {
    if (!same(previous[key], next[key])) delta.fieldChanges[key] = { from: previous[key], to: next[key] };
  }
  return delta;
}

function applyListDelta(values: unknown[], change: { added: unknown[]; removed: unknown[] } | undefined) {
  if (!change) return [...values];
  const result = [...values];
  for (const value of change.removed) {
    const index = result.findIndex((candidate) => same(candidate, value));
    if (index >= 0) result.splice(index, 1);
  }
  result.push(...change.added);
  return result;
}

function applyStateDelta(previous: M2StateSnapshot, delta: M2StateDelta, nextNode: string): M2StateSnapshot {
  const next = JSON.parse(JSON.stringify(previous)) as M2StateSnapshot;
  next.node = nextNode;
  for (const field of ['knowledge', 'evidence', 'facts', 'claims', 'inferences'] as const) {
    next[field] = applyListDelta(next[field], delta[field]) as never;
  }
  for (const item of delta.npcKnowledgeRemoved ?? []) {
    next.npcKnowledge[item.npc] ??= { known: [], beliefs: [] };
    next.npcKnowledge[item.npc].known = applyListDelta(next.npcKnowledge[item.npc].known, { added: [], removed: [item.value] });
  }
  for (const item of delta.npcKnowledgeAdded ?? []) {
    next.npcKnowledge[item.npc] ??= { known: [], beliefs: [] };
    next.npcKnowledge[item.npc].known.push(item.value);
  }
  for (const item of delta.npcBeliefsRemoved ?? []) {
    next.npcKnowledge[item.npc] ??= { known: [], beliefs: [] };
    next.npcKnowledge[item.npc].beliefs = applyListDelta(next.npcKnowledge[item.npc].beliefs, { added: [], removed: [item.value] });
  }
  for (const item of delta.npcBeliefsAdded ?? []) {
    next.npcKnowledge[item.npc] ??= { known: [], beliefs: [] };
    next.npcKnowledge[item.npc].beliefs.push(item.value);
  }
  if (delta.custodyChanged) next.custody = delta.custodyChanged.to;
  for (const [key, change] of Object.entries(delta.relationshipChanges ?? {})) next.relationships[key] = change.to;
  for (const [key, change] of Object.entries(delta.resourceChanges ?? {})) next.resources[key] = change.to;
  for (const [key, change] of Object.entries(delta.fieldChanges ?? {})) (next as Record<string, unknown>)[key] = change.to;
  return next;
}

function pruneDelta(delta: M2StateDelta): M2StateDelta {
  const compact: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(delta)) {
    if (Array.isArray(value) && value.length === 0) continue;
    if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) continue;
    compact[key] = value;
  }
  return compact as M2StateDelta;
}

function checkpointReason(previousNode: string, nextNode: string, emittedHistory: unknown[], step: number): M2ContextCheckpoint['reason'] | undefined {
  const previousChapter = previousNode.match(/^(chapter\d+)/)?.[1];
  const nextChapter = nextNode.match(/^(chapter\d+)/)?.[1];
  if (nextChapter && previousChapter !== nextChapter) return 'chapter-entry';
  if (/^chapter\d+\.complete$/.test(nextNode)) return 'chapter-completion';
  if (/invitation|presentation|assessment|handoff/.test(nextNode) || step % 25 === 0) return 'milestone';
  return undefined;
}

export function compressNarrativeTranscript(transcript: QaTranscript): M2CompressedTranscript {
  const initialState = entrySnapshot(transcript.entries[0] ?? finalEntry(transcript));
  let previous = initialState;
  const transitions: M2CompressedTransition[] = [];
  const checkpoints: M2ContextCheckpoint[] = [{ step: 0, node: initialState.node, reason: 'initial', stateDigest: digest(initialState) }];
  const seenNodes = new Set([initialState.node]);
  for (const entry of transcript.entries.slice(1)) {
    const next = entrySnapshot(entry);
    const action = entry.action;
    if (!action) throw new Error(`M2 compression requires an action for transition ${entry.step}.`);
    const emittedHistory = entry.emittedHistory;
    transitions.push({ step: entry.step, previousNode: entry.previousNode ?? previous.node, nextNode: entry.nextNode, action: compactAction(action), emittedHistory, stateDelta: deltaBetween(previous, next) });
    const reason = checkpointReason(previous.node, next.node, emittedHistory, entry.step) ?? (emittedHistory.length > 1 && seenNodes.has(next.node) ? 'reconvergence' : undefined);
    if (reason) checkpoints.push({ step: entry.step, node: next.node, reason, stateDigest: digest(next) });
    seenNodes.add(next.node);
    previous = next;
  }
  const finalState = previous;
  const parsed = CompressedTranscriptSchema.parse({ version: M2_CONTEXT_COMPRESSION_VERSION, initialState, transitions, checkpoints, finalState });
  return { ...parsed, transitions: parsed.transitions.map((transition) => ({ ...transition, stateDelta: pruneDelta(transition.stateDelta) })) };
}

export function rehydrateNarrativeTranscript(transcript: M2CompressedTranscript) {
  let state = transcript.initialState;
  for (const transition of transcript.transitions) state = applyStateDelta(state, transition.stateDelta, transition.nextNode);
  return state;
}

/** Rehydrate every checkpoint and verify its digest against the serialized proof. */
export function rehydrateNarrativeCheckpoints(transcript: M2CompressedTranscript) {
  const states = new Map<number, M2StateSnapshot>([[0, transcript.initialState]]);
  let state = transcript.initialState;
  for (const transition of transcript.transitions) {
    state = applyStateDelta(state, transition.stateDelta, transition.nextNode);
    states.set(transition.step, state);
  }
  return transcript.checkpoints.map((checkpoint) => {
    const checkpointState = states.get(checkpoint.step);
    if (!checkpointState || digest(checkpointState) !== checkpoint.stateDigest) throw new Error(`M2 checkpoint digest mismatch at step ${checkpoint.step}.`);
    return checkpointState;
  });
}

export function projectNarrativeContext(context: NarrativeContext, _reviewer: M2Reviewer): NarrativeContext {
  // The first implementation deliberately shares the complete lossless packet.
  // Reviewer-specific projections can be added later only if required causal evidence is retained.
  return compactNarrativeContext(context);
}

/** Validate and retain the sparse wire representation; Zod defaults are not re-emitted. */
export function compactNarrativeContext(context: NarrativeContext): NarrativeContext {
  const parsed = NarrativeContextSchema.parse(JSON.parse(JSON.stringify(context)));
  return {
    ...parsed,
    transcript: {
      ...parsed.transcript,
      transitions: parsed.transcript.transitions.map((transition) => ({ ...transition, stateDelta: pruneDelta(transition.stateDelta) })),
    },
  } as NarrativeContext;
}

export function compressedActionTrace(context: NarrativeContext) {
  return context.transcript.transitions.map((transition) => transition.action.id);
}

/** Keep only state and prose a specialist needs; omit the full GameState dump. */
export function buildNarrativeContext(candidate: QaNarrativeCandidate, fixture?: NarrativeContext['fixture']): NarrativeContext {
  const final = finalEntry(candidate.transcript);
  const compressedTranscript = compressNarrativeTranscript(candidate.transcript);
  const finalState = compressedTranscript.finalState;
  const sourceTranscriptDigest = transcriptDigest(candidate.transcript);
  const compressedContextDigest = digest(compressedTranscript);
  const context: NarrativeContext = {
    compressionVersion: M2_CONTEXT_COMPRESSION_VERSION,
    sourceTranscriptDigest,
    compressedContextDigest,
    route: {
      routeId: candidate.routeId,
      ...(candidate.seed === undefined ? {} : { seed: candidate.seed }),
      contentRevision: candidate.transcript.contentRevision,
      authority: routeAuthorityForRevision(candidate.transcript.contentRevision),
      reason: candidate.reason,
      riskSignals: candidate.riskSignals,
      equivalenceSignature: candidate.equivalenceSignature,
    },
    currentScene: {
      node: final.node,
      ...(chapterFromNode(final.node) ? { chapter: chapterFromNode(final.node) } : {}),
      movement: final.node.split('.')[1],
      location: final.node.split('.')[0],
    },
    routeHistory: {
      milestones: compressedTranscript.checkpoints.map((checkpoint) => checkpoint.node),
      checkpoints: compressedTranscript.checkpoints.map(({ step, node, reason }) => ({ step, node, reason })),
    },
    interactionSemantics: interactionSemanticsForActionTypes(compressedTranscript.transitions.map((transition) => transition.action.type)),
    visualState: {},
    transcript: compressedTranscript,
    fixture,
  };
  const parsed = NarrativeContextSchema.parse(context);
  return {
    ...parsed,
    transcript: {
      ...parsed.transcript,
      transitions: parsed.transcript.transitions.map((transition) => ({ ...transition, stateDelta: pruneDelta(transition.stateDelta) })),
    },
  } as NarrativeContext;
}

export function reviewersForCandidate(candidate: QaNarrativeCandidate): M2Reviewer[] {
  const signals = candidate.riskSignals.join(' ').toLowerCase();
  if (candidate.reason === 'GOLDEN_ROUTE') return REVIEWER_CONTRACTS.map((contract) => contract.reviewer);
  const reviewers = new Set<M2Reviewer>(['CONTINUITY', 'LOGIC', 'ROUTE_COHESION']);
  if (/evidence|investig|custody/.test(signals)) reviewers.add('INVESTIGATION');
  if (/knowledge|npc|omniscience/.test(signals)) reviewers.add('KNOWLEDGE');
  if (/relationship|julian|dependency|power|intimacy/.test(signals)) {
    reviewers.add('AGENCY_POWER');
    reviewers.add('ADULT_THRILLER');
  }
  if (/prose|content|dialogue/.test(signals)) {
    reviewers.add('PROSE');
    reviewers.add('CHARACTER');
  }
  return [...reviewers];
}

export interface NarrativeReviewerProvider {
  readonly name: string;
  readonly model?: string;
  review(context: NarrativeContext, contract: ReviewerContract): unknown;
}

function evidence(type: string, reference: string, excerpt?: string): M2Evidence {
  return { type, reference, ...(excerpt ? { excerpt } : {}) };
}

function fixtureFinding(context: NarrativeContext, contract: ReviewerContract): M2FindingInput | undefined {
  if (context.fixture === 'continuity-contradiction' && contract.reviewer === 'CONTINUITY') {
    return {
      reviewer: 'CONTINUITY', reviewerVersion: 'v1', provider: 'MOCK', model: 'fixture',
      transcriptDigest: digest(context.transcript), contextDigest: digest(context), severity: 'HIGH', category: 'CONTINUITY',
      routeId: context.route.routeId, seed: context.route.seed, chapter: context.currentScene.chapter, node: context.currentScene.node,
      finding: 'A character references an event absent from this route history.',
      currentEvidence: [evidence('transcript', 'step:3', 'Maya says the unchosen invitation was accepted.')],
      priorEvidence: [evidence('route-history', 'action:2', 'The route records a refusal of the invitation.')],
      stateEvidence: [evidence('state', 'relationships.bond', 'The committed route state contains no accepted invitation.')],
      whyItMatters: 'The line contradicts the player-authored route and can make reconvergence feel like amnesia.',
      confidence: 'HIGH', humanReviewRequired: true,
    };
  }
  if (context.fixture === 'unsourced-knowledge' && contract.reviewer === 'KNOWLEDGE') {
    return {
      reviewer: 'KNOWLEDGE', reviewerVersion: 'v1', provider: 'MOCK', model: 'fixture',
      transcriptDigest: digest(context.transcript), contextDigest: digest(context), severity: 'MEDIUM', category: 'KNOWLEDGE',
      routeId: context.route.routeId, seed: context.route.seed, chapter: context.currentScene.chapter, node: context.currentScene.node,
      finding: 'An NPC appears to know a private fact without a represented source.',
      currentEvidence: [evidence('transcript', 'step:4', 'NPC states a private detail.')],
      priorEvidence: [],
      stateEvidence: [evidence('npc.known', 'maya.known', 'No matching sourced observation is present.')],
      whyItMatters: 'NPC knowledge should be traceable to witnessed, disclosed, or public authored events.',
      confidence: 'MEDIUM', humanReviewRequired: true,
    };
  }
  if (context.fixture === 'semantic-misinterpretation' && contract.reviewer === 'LOGIC') {
    return {
      reviewer: 'LOGIC', reviewerVersion: 'v1', provider: 'MOCK', model: 'fixture',
      transcriptDigest: digest(context.transcript), contextDigest: digest(context), severity: 'MEDIUM', category: 'LOGIC',
      routeId: context.route.routeId, seed: context.route.seed, chapter: context.currentScene.chapter, node: context.currentScene.node,
      finding: 'Only selected evidence should be attached to the submitted report.',
      currentEvidence: [evidence('state', 'report.documents', 'The report contains email, finance, news, and intel.')],
      priorEvidence: [evidence('transition', 'TOGGLE_EVIDENCE', 'Only email and finance were selected for relationship testing.')],
      stateEvidence: [evidence('interaction-semantics', 'TOGGLE_EVIDENCE.doesNotMean', 'Selection for connection does not control report attachment.')],
      whyItMatters: 'A reviewer must not infer attachment agency from an analytical selection action when the runtime attaches all reviewed documents.',
      confidence: 'HIGH', humanReviewRequired: true,
    };
  }
  return undefined;
}

export class MockFixtureProvider implements NarrativeReviewerProvider {
  readonly name = 'MOCK';
  readonly model = 'fixture-v1';
  review(context: NarrativeContext, contract: ReviewerContract) {
    const finding = fixtureFinding(context, contract);
    return finding ? [finding] : [];
  }
}

export type ParsedProviderResult = { findings: M2FindingInput[]; rejected: string[] };

/** Parse provider output without allowing a malformed response to mutate state or become a finding. */
export function parseReviewerResult(raw: unknown): ParsedProviderResult {
  if (!Array.isArray(raw)) return { findings: [], rejected: ['Provider response must be an array.'] };
  const findings: M2FindingInput[] = [];
  const rejected: string[] = [];
  for (const item of raw) {
    const parsed = M2FindingBaseSchema.safeParse(item);
    if (!parsed.success) rejected.push(parsed.error.issues.map((issue) => issue.message).join('; '));
    else findings.push(parsed.data);
  }
  return { findings, rejected };
}

export function enforceFindingEvidence(input: M2FindingInput): { finding?: M2Finding; rejected?: string } {
  const parsed = M2FindingSchema.safeParse(input);
  if (parsed.success) return { finding: parsed.data };
  if (input.severity === 'HIGH' || input.severity === 'BLOCKER') {
    const downgraded = M2FindingBaseSchema.safeParse({
      ...input,
      severity: 'MEDIUM',
      confidence: 'LOW',
      whyItMatters: `${input.whyItMatters} High severity was downgraded because the evidence requirement was not met.`,
    });
    if (downgraded.success) return { finding: downgraded.data as M2Finding };
  }
  return { rejected: parsed.error.issues.map((issue) => issue.message).join('; ') };
}

function normalizedFinding(finding: M2Finding) {
  return finding.finding.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 240);
}

export function dedupeFindings(findings: M2Finding[]) {
  const byKey = new Map<string, M2Finding>();
  for (const finding of findings) {
    const key = `${finding.category}|${finding.node}|${normalizedFinding(finding)}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, { ...finding, reviewers: [finding.reviewer, ...(finding.reviewers ?? [])].filter((value, index, all) => all.indexOf(value) === index) });
      continue;
    }
    const mergedReviewers = [...new Set([existing.reviewer, ...(existing.reviewers ?? []), finding.reviewer, ...(finding.reviewers ?? [])])];
    byKey.set(key, {
      ...existing,
      reviewers: mergedReviewers,
      currentEvidence: [...existing.currentEvidence, ...finding.currentEvidence].slice(0, 20),
      priorEvidence: [...existing.priorEvidence, ...finding.priorEvidence].slice(0, 20),
      stateEvidence: [...existing.stateEvidence, ...finding.stateEvidence].slice(0, 20),
      confidence: existing.confidence === 'HIGH' || finding.confidence === 'HIGH' ? 'HIGH' : existing.confidence,
    });
  }
  return [...byKey.values()];
}

export type ReviewRun = {
  findings: M2Finding[];
  rejected: string[];
  reviewerCalls: number;
};

export function reviewSelectedCandidates(
  selected: QaNarrativeCandidate[],
  provider: NarrativeReviewerProvider,
  fixtureByRoute: Record<string, NarrativeContext['fixture']> = {},
): ReviewRun {
  const accepted: M2Finding[] = [];
  const rejected: string[] = [];
  let reviewerCalls = 0;
  for (const candidate of selected) {
    const context = buildNarrativeContext(candidate, fixtureByRoute[candidate.routeId]);
    for (const reviewer of reviewersForCandidate(candidate)) {
      const contract = contractByReviewer.get(reviewer)!;
      reviewerCalls++;
      const parsed = parseReviewerResult(provider.review(context, contract));
      rejected.push(...parsed.rejected);
      for (const input of parsed.findings) {
        const checked = enforceFindingEvidence({ ...input, reproductionTrace: compressedActionTrace(context) });
        if (checked.finding) accepted.push(checked.finding);
        if (checked.rejected) rejected.push(checked.rejected);
      }
    }
  }
  return { findings: dedupeFindings(accepted), rejected, reviewerCalls };
}

export function providerNotConfigured(providerName = process.env.EVE_NARRATIVE_PROVIDER) {
  if (!providerName) throw new Error('PROVIDER_NOT_CONFIGURED');
  throw new Error(`PROVIDER_NOT_CONFIGURED: no adapter is registered for ${providerName}.`);
}

export function summarizeFindings(findings: M2Finding[]) {
  const summary: Record<string, number> = {};
  for (const finding of findings) {
    summary[finding.severity] = (summary[finding.severity] ?? 0) + 1;
    summary[`${finding.category}.${finding.severity}`] = (summary[`${finding.category}.${finding.severity}`] ?? 0) + 1;
  }
  return summary;
}

export function renderM2Markdown(report: M2Report) {
  const lines = [
    '# EVE narrative QA M2',
    '',
    'M1 is deterministic truth. M2 is a probabilistic, advisory reviewer; findings never rewrite runtime or canon.',
    '',
    `Routes reviewed: ${report.routesReviewed}`,
    `Deduplicated route representatives: ${report.deduplicatedRoutes}`,
    `Reviewer calls planned/run: ${report.reviewerCalls}`,
    `Estimated context volume: ${report.estimatedContextBytes} bytes`,
    `External calls: ${report.externalCalls}`,
    '',
    '## Severity summary',
    '',
    ...(['BLOCKER', 'HIGH', 'MEDIUM', 'LOW'].map((severity) => `- ${severity}: ${report.summary[severity] ?? 0}`)),
    '',
    '## Selected routes',
    '',
    ...report.selected.map((candidate) => `- \`${candidate.routeId}\` — revision ${candidate.stateSummary.contentRevision}; ${candidate.stateSummary.authority.source}; ${candidate.reason}; ${candidate.riskSignals.join(', ') || 'no extra risk signal'}`),
    '',
    '## Findings',
    '',
  ];
  if (!report.findings.length) lines.push('No mock findings were produced for the prepared real-route set. Human review remains required for any future provider findings.');
  for (const finding of report.findings) {
    lines.push(`### ${finding.severity} · ${finding.category} · ${finding.routeId} · ${finding.node}`);
    lines.push(`- ${finding.finding}`);
    lines.push(`- Why it matters: ${finding.whyItMatters}`);
    lines.push(`- Reviewer: ${finding.reviewer} ${finding.reviewerVersion}; confidence ${finding.confidence}; human review required: yes`);
    lines.push(`- Current evidence: ${finding.currentEvidence.map((item) => item.reference).join(', ') || 'none'}`);
    lines.push(`- Prior/state evidence: ${[...finding.priorEvidence, ...finding.stateEvidence].map((item) => item.reference).join(', ') || 'none'}`);
    lines.push(`- Reproduction trace: ${finding.reproductionTrace.join(' → ') || 'none'}`);
    lines.push('');
  }
  return lines.join('\n');
}

export function writeM2Report(report: M2Report, repositoryRoot: string) {
  const reportDir = resolve(repositoryRoot, 'qa', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const jsonPath = resolve(reportDir, 'm2-latest.json');
  const mdPath = resolve(reportDir, 'm2-latest.md');
  if (dirname(jsonPath) !== reportDir || dirname(mdPath) !== reportDir) throw new Error('Unsafe M2 report path.');
  writeFileSync(jsonPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  writeFileSync(mdPath, renderM2Markdown(report), 'utf8');
  return { jsonPath, mdPath };
}

export function contextDigest(context: NarrativeContext) {
  // JSON normalization makes the digest portable across provider serialization boundaries.
  return digest(JSON.parse(JSON.stringify(context)));
}

export function transcriptDigest(transcript: QaTranscript) {
  return digest(transcript);
}
