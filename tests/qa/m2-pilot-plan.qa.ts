import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';
import { candidateFromTranscript, transcriptFromGameState, type QaNarrativeCandidate } from '../../src/qa/m2';
import { buildM21PilotPlan } from '../../src/qa/m2-pilot';
import { M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING } from '../../src/qa/m2-provider';
import { goldenRoutes, type GoldenRoute } from './golden-routes';
import { runGoldenRoutes } from './runner';

function pilotCandidates(): QaNarrativeCandidate[] {
  const golden = runGoldenRoutes();
  const wanted = new Set(['opening-bad-assessment', 'chapter5-no-intimacy', 'chapter5-public-visibility']);
  return goldenRoutes
    .filter((route: GoldenRoute) => wanted.has(route.id))
    .map((route: GoldenRoute) => {
      const state = golden.states[route.id];
      if (!state) throw new Error(`Pilot route ${route.id} did not produce a state.`);
      return candidateFromTranscript({
        routeId: route.id,
        transcript: transcriptFromGameState(state),
        reason: 'GOLDEN_ROUTE',
        riskSignals: ['M2.1 approved pilot route'],
        transcriptPath: `golden:${route.id}`,
      });
    });
}

it('prepares the exact M2.1 three-route ten-call plan without external calls', () => {
  const plan = buildM21PilotPlan(pilotCandidates());
  expect(plan.routes).toEqual(['opening-bad-assessment', 'chapter5-no-intimacy', 'chapter5-public-visibility']);
  expect(plan.calls).toHaveLength(10);
  expect(plan.outputTokenCeiling).toBe(M2_1_REAL_REVIEW_OUTPUT_TOKEN_CEILING);
  expect(plan.estimatedMaximumOutputTokens).toBe(33000);
  expect(plan.externalCalls).toBe(0);
  const reportDir = resolve(process.cwd(), 'qa', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const reportPath = resolve(reportDir, 'm2-1-pilot-plan.json');
  writeFileSync(reportPath, JSON.stringify(plan, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify(plan, null, 2));
});
