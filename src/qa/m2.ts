import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { z } from 'zod';
import { initialState, nodeOf, reducer } from '../state/reducer';
import { stableState, stateDigest, type QaTranscript, type QaTranscriptEntry } from './m1';
import type { GameEvent } from '../state/actions';
import type { GameState } from '../state/schema';

/** M1 is deterministic truth; M2 is an advisory, evidence-gated reviewer. */
export const M2_VERSION = 'm2-v1';

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
    route: z
      .object({
        routeId: z.string().min(1).max(160),
        seed: z.number().int().nonnegative().optional(),
        contentRevision: z.number().int().nonnegative(),
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
    playerState: z
      .object({
        knownFacts: z.array(z.string().max(500)).max(100),
        claims: z.array(z.string().max(500)).max(100),
        evidence: z.array(z.string().max(80)).max(20),
        evidenceCustody: z.unknown().nullable(),
        relationships: z.record(z.string(), z.unknown()),
      })
      .strict(),
    npcState: z.record(
      z.string(),
      z
        .object({
          known: z.array(z.unknown()).max(100),
          beliefs: z.array(z.unknown()).max(100),
        })
        .strict(),
    ),
    routeHistory: z
      .object({
        actions: z.array(z.string().max(300)).max(10000),
        majorChoices: z.array(z.string().max(300)).max(1000),
        milestones: z.array(z.string().max(120)).max(1000),
      })
      .strict(),
    visualState: z
      .object({
        shotId: z.string().max(160).optional(),
        assetId: z.string().max(160).optional(),
        wardrobe: z.string().max(500).optional(),
        bodyState: z.string().max(500).optional(),
      })
      .strict(),
    transcript: z
      .array(
        z
          .object({
            step: z.number().int().nonnegative(),
            node: z.string().max(120),
            action: z.string().max(300).optional(),
            blocks: z.array(z.unknown()).max(100),
            evidence: z.array(z.string().max(80)).max(20),
            knowledge: z.array(z.string().max(500)).max(100),
          })
          .strict(),
      )
      .max(10000),
    fixture: z.enum(['continuity-contradiction', 'unsourced-knowledge', 'reconverged-preserved', 'clean']).optional(),
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
  { reviewer: 'LOGIC', version: 'v1', promptPath: 'docs/qa/prompts/logic.v1.md', checks: ['causes precede consequences', 'refusal/acceptance remain meaningful', 'state-supported route changes'] },
  { reviewer: 'KNOWLEDGE', version: 'v1', promptPath: 'docs/qa/prompts/knowledge.v1.md', checks: ['NPC knowledge has a source', 'beliefs are distinct from canon truth'] },
  { reviewer: 'CHARACTER', version: 'v1', promptPath: 'docs/qa/prompts/character.v1.md', checks: ['voice', 'goals and values', 'behavioral reversals'] },
  { reviewer: 'INVESTIGATION', version: 'v1', promptPath: 'docs/qa/prompts/investigation.v1.md', checks: ['evidence provenance', 'proof custody', 'wrong hypotheses remain valid'] },
  { reviewer: 'AGENCY_POWER', version: 'v1', promptPath: 'docs/qa/prompts/agency-power.v1.md', checks: ['consent/compliance', 'desire/action', 'dependency/love', 'control/care'] },
  { reviewer: 'ADULT_THRILLER', version: 'v1', promptPath: 'docs/qa/prompts/adult-thriller.v1.md', checks: ['adult tension follows state', 'coercion is not mutual willingness', 'non-Julian possibilities remain'] },
  { reviewer: 'PROSE', version: 'v1', promptPath: 'docs/qa/prompts/prose.v1.md', checks: ['repetition', 'transitions', 'POV', 'tonal continuity'] },
  { reviewer: 'ROUTE_COHESION', version: 'v1', promptPath: 'docs/qa/prompts/route-cohesion.v1.md', checks: ['consequences persist', 'chapter transitions', 'reconvergence history'] },
];

const contractByReviewer = new Map(REVIEWER_CONTRACTS.map((contract) => [contract.reviewer, contract]));

function digest(value: unknown) {
  return createHash('sha256').update(stableState(value)).digest('hex');
}

function actionLabel(action: Record<string, unknown>) {
  return Object.entries(action)
    .filter(([key]) => key !== 'expectedRevision')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('|');
}

function entryFor(snapshot: GameState, step: number, action?: string): QaTranscriptEntry {
  return {
    step,
    node: nodeOf(snapshot),
    blocks: snapshot.history.at(-1)?.blocks ?? [],
    action,
    evidence: [...snapshot.documents],
    knowledge: [...snapshot.knowledge],
    custody: snapshot.mission.capture,
    npcKnowledge: snapshot.npcs,
    resources: {
      opportunities: snapshot.opportunities,
      clinicOpportunity: snapshot.clinic.opportunity,
      missionRemaining: snapshot.mission.remaining,
      relationships: snapshot.relationships,
    },
  };
}

/** Convert a completed M1 state to a compact, replay-authenticated transcript. */
export function transcriptFromGameState(state: GameState, seed?: number): QaTranscript {
  let current = initialState(state.contentRevision ?? 13);
  const snapshots = [current];
  const trace: string[] = [];
  for (const event of state.ledger as GameEvent[]) {
    current = reducer(current, event.action);
    snapshots.push(current);
    trace.push(actionLabel(event.action));
  }
  if (stateDigest(current) !== stateDigest(state)) throw new Error('M2 transcript conversion diverged from the M1 state.');
  return {
    seed,
    contentRevision: state.contentRevision ?? 13,
    entries: snapshots.map((snapshot, index) => entryFor(snapshot, index, index ? trace[index - 1] : undefined)),
    routeTrace: trace,
  };
}

function finalEntry(transcript: QaTranscript) {
  return transcript.entries.at(-1) ?? {
    step: 0,
    node: 'unknown',
    blocks: [],
    evidence: [],
    knowledge: [],
    custody: null,
    npcKnowledge: {},
    resources: { opportunities: 0, clinicOpportunity: 0, missionRemaining: 0, relationships: {} },
  };
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

/** Keep only state and prose a specialist needs; omit the full GameState dump. */
export function buildNarrativeContext(candidate: QaNarrativeCandidate, fixture?: NarrativeContext['fixture']): NarrativeContext {
  const final = finalEntry(candidate.transcript);
  const context: NarrativeContext = {
    route: {
      routeId: candidate.routeId,
      ...(candidate.seed === undefined ? {} : { seed: candidate.seed }),
      contentRevision: candidate.transcript.contentRevision,
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
    playerState: {
      knownFacts: final.knowledge.slice(-100),
      claims: [],
      evidence: final.evidence,
      evidenceCustody: final.custody,
      relationships: final.resources.relationships,
    },
    npcState: Object.fromEntries(
      Object.entries(final.npcKnowledge as Record<string, { known?: unknown[]; beliefs?: unknown[] }>).map(([name, npc]) => [name, {
        known: npc.known ?? [],
        beliefs: npc.beliefs ?? [],
      }]),
    ),
    routeHistory: {
      actions: candidate.transcript.routeTrace,
      majorChoices: majorChoices(candidate.transcript.routeTrace),
      milestones: candidate.transcript.entries.map((entry) => entry.node),
    },
    visualState: {},
    transcript: candidate.transcript.entries.map((entry) => ({
      step: entry.step,
      node: entry.node,
      ...(entry.action === undefined ? {} : { action: entry.action }),
      blocks: entry.blocks,
      evidence: entry.evidence,
      knowledge: entry.knowledge.slice(-100),
    })),
    fixture,
  };
  return NarrativeContextSchema.parse(context);
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
        const checked = enforceFindingEvidence({ ...input, reproductionTrace: context.routeHistory.actions });
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
    ...report.selected.map((candidate) => `- \`${candidate.routeId}\` — ${candidate.reason}; ${candidate.riskSignals.join(', ') || 'no extra risk signal'}`),
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
