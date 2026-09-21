import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { candidateFromTranscript, transcriptFromGameState } from '../src/qa/m2.ts';
import { createNarrativeProviderFromEnv } from '../src/qa/m2-provider.ts';
import {
  M2_1_PILOT_ROUTES,
  buildM21PilotPlan,
  runM21PilotCalls,
  summarizeM21PilotUsage,
} from '../src/qa/m2-pilot.ts';
import { goldenRoutes } from '../tests/qa/golden-routes.ts';
import { runGoldenRoutes } from '../tests/qa/runner.ts';

const PILOT_SCOPE = 'm2.1';

function safeMessage(error) {
  return error instanceof Error ? error.message : 'Pilot execution failed.';
}

function mockProvider(mode) {
  let ordinal = 0;
  return {
    name: 'mock',
    model: 'offline-test',
    review: () => [],
    reviewAsync: async () => {
      ordinal += 1;
      if (mode === 'fail') {
        return {
          findings: [],
          rejected: ['Mock provider failure.'],
          provenance: { provider: 'mock', model: 'offline-test', contextDigest: 'a'.repeat(64), transcriptDigest: 'b'.repeat(64), requestDigest: `mock-${ordinal}` },
          error: { code: 'PROVIDER_ERROR', message: 'Mock provider failure.', status: 400, details: { code: 'invalid_request_error', message: 'mock failure' } },
        };
      }
      return {
        findings: [],
        rejected: [],
        provenance: { provider: 'mock', model: 'offline-test', contextDigest: 'a'.repeat(64), transcriptDigest: 'b'.repeat(64), requestDigest: `mock-${ordinal}` },
        usage: { inputTokens: 10, outputTokens: 2, totalTokens: 12 },
        estimatedCostUsd: 0,
      };
    },
  };
}

function preparedCandidates() {
  const golden = runGoldenRoutes();
  return M2_1_PILOT_ROUTES.map((routeId) => {
    const route = goldenRoutes.find((item) => item.id === routeId);
    const state = route && golden.states[routeId];
    if (!route || !state) throw new Error(`Missing pilot route ${routeId}`);
    return candidateFromTranscript({
      routeId,
      transcript: transcriptFromGameState(state),
      reason: 'GOLDEN_ROUTE',
      riskSignals: ['M2.1 pilot'],
    });
  });
}

export async function runPilotCli(env = process.env) {
  if (env.EVE_NARRATIVE_PILOT_APPROVED !== '1') {
    console.error('PILOT_NOT_AUTHORIZED');
    return 3;
  }
  const providerName = env.EVE_NARRATIVE_PROVIDER?.trim();
  if (!providerName) {
    console.error('PROVIDER_NOT_CONFIGURED');
    return 2;
  }
  const smokeOnly = env.M2_SMOKE_ONLY === '1';
  const mode = smokeOnly ? 'SMOKE' : 'FULL';
  const configured = env.M2_PILOT_OFFLINE_TEST === '1' && env.M2_PILOT_MOCK
    ? { status: 'AVAILABLE', provider: mockProvider(env.M2_PILOT_MOCK), config: { provider: env.EVE_NARRATIVE_PROVIDER, model: env.EVE_NARRATIVE_MODEL ?? 'offline-test' } }
    : createNarrativeProviderFromEnv(env);
  if (configured.status !== 'AVAILABLE') {
    console.error(`PROVIDER_UNAVAILABLE: ${configured.reason}`);
    return 2;
  }
  let candidates;
  try {
    candidates = preparedCandidates();
  } catch (error) {
    console.error(`PILOT_CONTEXT_ERROR: ${safeMessage(error)}`);
    return 1;
  }
  const plan = buildM21PilotPlan(candidates);
  const run = await runM21PilotCalls(candidates, configured.provider, smokeOnly ? 1 : undefined);
  const usage = summarizeM21PilotUsage(run.results);
  const generatedAt = new Date().toISOString();
  const report = {
    generatedAt,
    mode,
    provider: configured.provider.name,
    model: configured.provider.model,
    ...run.accounting,
    externalCalls: run.accounting.attemptedExternalCalls,
    usage,
    ...(usage.estimatedCostUsd === undefined ? {} : { estimatedCostUsd: usage.estimatedCostUsd }),
    plan,
    results: run.results,
  };
  const reportPath = resolve(process.cwd(), 'qa', 'reports', 'm2-1-pilot-latest.json');
  try {
    await mkdir(resolve(process.cwd(), 'qa', 'reports'), { recursive: true });
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.error(`REPORT_WRITE_FAILED: ${safeMessage(error)}`);
    return 1;
  }
  console.log('EVE M2.1 REAL NARRATIVE QA');
  console.log(`Mode: ${mode}`);
  console.log(`Provider: ${configured.provider.name}`);
  console.log(`Model: ${configured.provider.model}`);
  console.log(`Planned: ${run.accounting.plannedCalls}`);
  console.log(`Attempted: ${run.accounting.attemptedExternalCalls}`);
  console.log(`Completed: ${run.accounting.completedExternalCalls}`);
  console.log(`Failed: ${run.accounting.failedExternalCalls}`);
  console.log(`Skipped after fail-fast: ${run.accounting.skippedAfterFailFast}`);
  console.log(`Input tokens: ${usage.usageAvailable ? usage.inputTokens : 'unavailable (0 recorded)'}`);
  console.log(`Output tokens: ${usage.usageAvailable ? usage.outputTokens : 'unavailable (0 recorded)'}`);
  console.log(`Visible output approx: ${usage.visibleOutputTokensApprox ?? 'unavailable'}`);
  console.log(`Estimated cost: ${usage.estimatedCostUsd === undefined ? 'unavailable' : `$${usage.estimatedCostUsd.toFixed(6)}`}`);
  const firstError = run.results.find(({ result }) => result.error)?.result.error;
  if (firstError) {
    console.error(`Provider error: ${firstError.code}${firstError.status ? ` HTTP ${firstError.status}` : ''}${firstError.details?.param ? ` param=${firstError.details.param}` : ''}${firstError.details?.message ? ` message=${firstError.details.message}` : ''}`);
  }
  console.log(`Report: ${resolve(process.cwd(), 'qa', 'reports', 'm2-1-pilot-latest.json')}`);
  return run.accounting.failedExternalCalls > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url.endsWith('/scripts/m2-pilot-cli.mjs')) {
  runPilotCli().then((code) => process.exitCode = code).catch((error) => {
    console.error(`PILOT_FAILED: ${safeMessage(error)}`);
    process.exitCode = 1;
  });
}
