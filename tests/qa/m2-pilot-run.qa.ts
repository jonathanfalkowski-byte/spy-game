import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';
import { candidateFromTranscript, transcriptFromGameState } from '../../src/qa/m2';
import { createNarrativeProviderFromEnv } from '../../src/qa/m2-provider';
import { M2_1_PILOT_ROUTES, buildM21PilotPlan, runM21PilotCalls, summarizeM21PilotUsage } from '../../src/qa/m2-pilot';
import { goldenRoutes } from './golden-routes';
import { runGoldenRoutes } from './runner';

const enabled = process.env.M2_COMMAND === 'pilot';
const smokeOnly = process.env.M2_SMOKE_ONLY === '1';

it.skipIf(!enabled)('runs only the explicitly authorized M2.1 pilot call set', async () => {
  const configured = createNarrativeProviderFromEnv();
  if (configured.status !== 'AVAILABLE') throw new Error(configured.reason);
  const golden = runGoldenRoutes();
  const candidates = M2_1_PILOT_ROUTES.map((routeId) => {
    const route = goldenRoutes.find((item) => item.id === routeId);
    const state = route && golden.states[routeId];
    if (!route || !state) throw new Error(`Missing pilot route ${routeId}`);
    return candidateFromTranscript({ routeId, transcript: transcriptFromGameState(state), reason: 'GOLDEN_ROUTE', riskSignals: ['M2.1 pilot'] });
  });
  const plan = buildM21PilotPlan(candidates);
  const run = await runM21PilotCalls(candidates, configured.provider, smokeOnly ? 1 : undefined);
  expect(run.accounting.plannedCalls).toBe(smokeOnly ? 1 : 10);
  expect(run.accounting.attemptedExternalCalls).toBeGreaterThanOrEqual(1);
  const usage = summarizeM21PilotUsage(run.results);
  const reportDir = resolve(process.cwd(), 'qa', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const report = {
    plan,
    ...run.accounting,
    usage,
    results: run.results,
  };
  writeFileSync(resolve(reportDir, smokeOnly ? 'm2-1-smoke-latest.json' : 'm2-1-pilot-latest.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
});
