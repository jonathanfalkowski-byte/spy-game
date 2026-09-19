import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';
import { goldenRoutes } from './golden-routes';
import { runGoldenRoutes } from './runner';
import { simulateRandomRoute } from '../../src/qa/m1';
import {
  M2ReportSchema,
  MockFixtureProvider,
  buildNarrativeContext,
  candidateFromTranscript,
  reviewSelectedCandidates,
  selectNarrativeCandidates,
  summarizeFindings,
  transcriptFromGameState,
  writeM2Report,
  type QaNarrativeCandidate,
} from '../../src/qa/m2';

const mode = process.env.M2_COMMAND ?? 'test';

function riskSignals(routeId: string, description: string) {
  const text = `${routeId} ${description}`.toLowerCase();
  const signals: string[] = [];
  if (/evidence|investig|assessment|mission/.test(text)) signals.push('evidence custody', 'investigation');
  if (/julian|intimacy|privacy|relationship|bond/.test(text)) signals.push('relationship/dependency');
  if (/chapter5|public|professional/.test(text)) signals.push('current chapter 5 route');
  if (!signals.length) signals.push('golden route baseline');
  return signals;
}

function prepareCandidates(): QaNarrativeCandidate[] {
  const golden = runGoldenRoutes();
  const candidates = goldenRoutes.map((route) => {
    const state = golden.states[route.id];
    if (!state) throw new Error(`Golden route ${route.id} did not produce a state.`);
    return candidateFromTranscript({
      routeId: route.id,
      transcript: transcriptFromGameState(state),
      reason: 'GOLDEN_ROUTE',
      riskSignals: riskSignals(route.id, route.description),
      transcriptPath: `golden:${route.id}`,
    });
  });
  for (const seed of [17, 29, 41, 53]) {
    const simulation = simulateRandomRoute({ seed, maxSteps: 220, chooserPolicy: 'prefer-unseen-action' });
    if (!simulation.completed) continue;
    candidates.push(candidateFromTranscript({
      routeId: `fuzz-seed-${seed}`,
      transcript: simulation.transcript,
      reason: 'FUZZ_SAMPLE',
      riskSignals: ['bounded fuzz sample', ...riskSignals(`fuzz-${seed}`, simulation.state.scene)],
      transcriptPath: `fuzz:seed:${seed}`,
    }));
  }
  return candidates;
}

it('runs the offline M2 command mode', () => {
  if (mode === 'prepare') {
    const candidates = prepareCandidates();
    const selection = selectNarrativeCandidates(candidates, 30);
    const contexts = selection.selected.map((candidate) => buildNarrativeContext(candidate));
    const review = reviewSelectedCandidates(selection.selected, new MockFixtureProvider());
    const selected = selection.selected.map(({ transcript: _transcript, ...metadata }) => metadata);
    const report = M2ReportSchema.parse({
      version: 'm2-v1',
      routesReviewed: selection.selected.length,
      deduplicatedRoutes: selection.deduplicated,
      selected,
      reviewerCalls: review.reviewerCalls,
      estimatedContextBytes: contexts.reduce((total, context) => total + Buffer.byteLength(JSON.stringify(context), 'utf8'), 0),
      externalCalls: 0,
      findings: review.findings,
      summary: summarizeFindings(review.findings),
    });
    const paths = writeM2Report(report, process.cwd());
    const contextsPath = resolve(process.cwd(), 'qa', 'reports', 'm2-contexts.json');
    writeFileSync(contextsPath, JSON.stringify(contexts, null, 2) + '\n', 'utf8');
    console.log(JSON.stringify({
      mode,
      routesConsidered: selection.considered,
      routesReviewed: report.routesReviewed,
      deduplicatedRoutes: report.deduplicatedRoutes,
      reviewerCalls: report.reviewerCalls,
      estimatedContextBytes: report.estimatedContextBytes,
      report: paths,
      contextsPath,
      externalCalls: report.externalCalls,
    }, null, 2));
    expect(report.routesReviewed).toBeGreaterThan(0);
    expect(report.routesReviewed).toBeLessThanOrEqual(30);
    expect(report.externalCalls).toBe(0);
    expect(existsSync(paths.jsonPath)).toBe(true);
    return;
  }

  expect(mode).toBe('test');
  const contradiction = candidateFromTranscript({ routeId: 'fixture-continuity', transcript: (awaitableFixture('continuity-contradiction')), reason: 'DETERMINISTIC_WARNING', riskSignals: ['relationship'] });
  const knowledge = candidateFromTranscript({ routeId: 'fixture-knowledge', transcript: awaitableFixture('unsourced-knowledge'), reason: 'DETERMINISTIC_WARNING', riskSignals: ['knowledge'] });
  const clean = candidateFromTranscript({ routeId: 'fixture-clean', transcript: awaitableFixture('clean'), reason: 'GOLDEN_ROUTE' });
  const review = reviewSelectedCandidates(
    [contradiction, knowledge, clean],
    new MockFixtureProvider(),
    { 'fixture-continuity': 'continuity-contradiction', 'fixture-knowledge': 'unsourced-knowledge', 'fixture-clean': 'clean' },
  );
  expect(review.findings.some((finding) => finding.category === 'CONTINUITY' && finding.severity === 'HIGH')).toBe(true);
  expect(review.findings.some((finding) => finding.category === 'KNOWLEDGE')).toBe(true);
  expect(review.findings.some((finding) => finding.severity === 'BLOCKER')).toBe(false);
  expect(review.rejected).toEqual([]);
});

function awaitableFixture(kind: 'continuity-contradiction' | 'unsourced-knowledge' | 'clean') {
  const blocks = kind === 'clean'
    ? [{ kind: 'narrative' as const, text: 'A clean route.' }]
    : [{ kind: 'speech' as const, text: 'A review fixture.' }];
  return {
    seed: 1,
    contentRevision: 17,
    routeTrace: ['CHOOSE_DIALOGUE|id=bond.friend'],
    entries: [
      {
        step: 0,
        node: 'chapter5.presentation',
        blocks,
        evidence: [],
        knowledge: [],
        custody: null,
        npcKnowledge: {
          daniel: { known: [], beliefs: [] }, benton: { known: [], beliefs: [] }, maya: { known: [], beliefs: [] },
          sloane: { known: [], beliefs: [] }, marcus: { known: [], beliefs: [] }, voss: { known: [], beliefs: [] }, celeste: { known: [], beliefs: [] },
        },
        resources: { opportunities: 0, clinicOpportunity: 0, missionRemaining: 0, relationships: { mayaTrust: 0, credibility: 0, bond: 'friend' as const } },
      },
    ],
  };
}
