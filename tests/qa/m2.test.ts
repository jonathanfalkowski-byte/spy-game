import { describe, expect, it } from 'vitest';
import { initialState } from '../../src/state/reducer';
import {
  M2FindingSchema,
  MockFixtureProvider,
  buildNarrativeContext,
  candidateFromTranscript,
  contextDigest,
  dedupeFindings,
  enforceFindingEvidence,
  parseReviewerResult,
  providerNotConfigured,
  renderM2Markdown,
  reviewSelectedCandidates,
  routeEquivalenceSignature,
  selectNarrativeCandidates,
  transcriptDigest,
  transcriptFromGameState,
  type M2FindingInput,
} from '../../src/qa/m2';
import { fixtureCandidate, fixtureTranscript } from './m2-fixtures';
import futureContracts from './contracts/future-route-contracts.json';

describe('EVE QA M2 contracts', () => {
  it('converts an M1 state without mutating it and keeps a stable transcript digest', () => {
    const state = initialState(17);
    const before = JSON.stringify(state);
    const transcript = transcriptFromGameState(state, 7);
    expect(JSON.stringify(state)).toBe(before);
    expect(transcript.routeTrace).toEqual([]);
    expect(transcriptDigest(transcript)).toBe(transcriptDigest(transcript));
  });

  it('builds a compact context packet with a stable digest', () => {
    const candidate = fixtureCandidate('context-route', 'GOLDEN_ROUTE', 'clean');
    const context = buildNarrativeContext(candidate);
    expect(context.currentScene.node).toBe('chapter5.presentation');
    expect(context.transcript.length).toBe(2);
    expect(contextDigest(context)).toBe(contextDigest(JSON.parse(JSON.stringify(context))));
  });

  it('prioritizes changed/high-risk candidates and treats budget as a ceiling', () => {
    const candidates = [
      fixtureCandidate('fuzz', 'FUZZ_SAMPLE', 'fuzz'),
      fixtureCandidate('golden', 'GOLDEN_ROUTE', 'evidence'),
      fixtureCandidate('changed', 'CHANGED_ROUTE', 'changed'),
    ];
    const result = selectNarrativeCandidates(candidates, 2);
    expect(result.selected.map((candidate) => candidate.routeId)).toEqual(['changed', 'golden']);
    expect(result.selected).toHaveLength(2);
    expect(result.budget).toBe(2);
  });

  it('deduplicates equivalent histories without merging different route histories', () => {
    const left = fixtureCandidate('left', 'GOLDEN_ROUTE', 'clean');
    const equivalent = fixtureCandidate('equivalent', 'FUZZ_SAMPLE', 'clean');
    const different = fixtureCandidate('different', 'FUZZ_SAMPLE', 'refusal');
    expect(routeEquivalenceSignature(left.transcript)).toBe(routeEquivalenceSignature(equivalent.transcript));
    expect(routeEquivalenceSignature(left.transcript)).not.toBe(routeEquivalenceSignature(different.transcript));
    const result = selectNarrativeCandidates([left, equivalent, different], 30);
    expect(result.selected.map((candidate) => candidate.routeId)).toEqual(['left', 'different']);
    expect(Object.values(result.equivalenceGroups).some((routes) => routes.length === 2)).toBe(true);
  });

  it('rejects unsupported high-severity findings at the schema boundary', () => {
    const finding = {
      reviewer: 'CONTINUITY', reviewerVersion: 'v1', transcriptDigest: 'a'.repeat(64), contextDigest: 'b'.repeat(64),
      severity: 'HIGH', category: 'CONTINUITY', routeId: 'r', node: 'chapter5.room', finding: 'unsupported',
      currentEvidence: [], priorEvidence: [], stateEvidence: [], whyItMatters: 'why', confidence: 'HIGH', humanReviewRequired: true,
    } as const;
    expect(M2FindingSchema.safeParse(finding).success).toBe(false);
    const downgraded = enforceFindingEvidence(finding as unknown as M2FindingInput);
    expect(downgraded.finding?.severity).toBe('MEDIUM');
    expect(downgraded.finding?.confidence).toBe('LOW');
  });

  it('parses malformed provider output without accepting it', () => {
    const result = parseReviewerResult({ finding: 'not an array' });
    expect(result.findings).toHaveLength(0);
    expect(result.rejected[0]).toMatch(/array/);
  });

  it('runs deliberate mock contradiction and knowledge fixtures', () => {
    const contradiction = fixtureCandidate('contradiction', 'GOLDEN_ROUTE', 'clean');
    const knowledge = fixtureCandidate('knowledge', 'GOLDEN_ROUTE', 'clean');
    const run = reviewSelectedCandidates(
      [contradiction, knowledge],
      new MockFixtureProvider(),
      { contradiction: 'continuity-contradiction', knowledge: 'unsourced-knowledge' },
    );
    expect(run.reviewerCalls).toBeGreaterThan(0);
    expect(run.findings.some((finding) => finding.severity === 'HIGH' && finding.category === 'CONTINUITY')).toBe(true);
    expect(run.findings.some((finding) => finding.category === 'KNOWLEDGE')).toBe(true);
    expect(run.rejected).toEqual([]);
  });

  it('keeps clean and preserved-reconvergence fixtures free of high findings', () => {
    const clean = fixtureCandidate('clean', 'GOLDEN_ROUTE', 'clean');
    const reconverged = fixtureCandidate('reconverged', 'GOLDEN_ROUTE', 'reconverged-preserved');
    const run = reviewSelectedCandidates(
      [clean, reconverged],
      new MockFixtureProvider(),
      { clean: 'clean', reconverged: 'reconverged-preserved' },
    );
    expect(run.findings.filter((finding) => finding.severity === 'HIGH' || finding.severity === 'BLOCKER')).toHaveLength(0);
  });

  it('keeps future route contracts advisory until runtime state exists', () => {
    expect(futureContracts.every((contract) => contract.status === 'DESIGN CONTRACT / FUTURE')).toBe(true);
    const candidate = fixtureCandidate('future-contract', 'FUZZ_SAMPLE');
    const before = JSON.stringify(candidate.transcript);
    reviewSelectedCandidates([candidate], new MockFixtureProvider());
    expect(JSON.stringify(candidate.transcript)).toBe(before);
  });

  it('deduplicates findings while preserving reviewer provenance and evidence', () => {
    const base: M2FindingInput = {
      reviewer: 'CONTINUITY', reviewerVersion: 'v1', reviewers: [], transcriptDigest: 'a'.repeat(64), contextDigest: 'b'.repeat(64),
      severity: 'MEDIUM', category: 'CONTINUITY', routeId: 'r', node: 'chapter5.room', finding: 'Same issue',
      currentEvidence: [{ type: 'transcript', reference: 'step:1' }], priorEvidence: [], stateEvidence: [], whyItMatters: 'why', confidence: 'MEDIUM', humanReviewRequired: true,
    };
    const one = M2FindingSchema.parse(base);
    const two = M2FindingSchema.parse({ ...base, reviewer: 'LOGIC', currentEvidence: [{ type: 'state', reference: 'choices.x' }] });
    const merged = dedupeFindings([one, two]);
    expect(merged).toHaveLength(1);
    expect(merged[0].reviewers).toEqual(expect.arrayContaining(['CONTINUITY', 'LOGIC']));
    expect(merged[0].currentEvidence).toHaveLength(2);
  });

  it('fails closed when a real provider is not configured', () => {
    expect(() => providerNotConfigured(undefined)).toThrow('PROVIDER_NOT_CONFIGURED');
    expect(() => providerNotConfigured('unknown')).toThrow('PROVIDER_NOT_CONFIGURED');
  });

  it('renders a human-reviewable report without rewriting content', () => {
    const markdown = renderM2Markdown({
      version: 'm2-v1', routesReviewed: 1, deduplicatedRoutes: 1, selected: [fixtureCandidate('r')], reviewerCalls: 0,
      estimatedContextBytes: 100, externalCalls: 0, findings: [], summary: {},
    });
    expect(markdown).toContain('M1 is deterministic truth');
    expect(markdown).toContain('r');
  });
});
