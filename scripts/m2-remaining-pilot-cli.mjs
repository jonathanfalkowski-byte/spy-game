import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { candidateFromTranscript, transcriptFromGameState } from '../src/qa/m2.ts';
import { createNarrativeProviderFromEnv } from '../src/qa/m2-provider.ts';
import {
  assertM21RemainingPilotPlan,
  buildM21RemainingPilotPlan,
  highestSeverity,
  runM21RemainingPilotCalls,
  summarizeM21PilotUsage,
} from '../src/qa/m2-pilot.ts';
import { M2_REMAINING_PILOT_SELECTION } from '../src/qa/m2-calibration.ts';
import { M2_1_GPT_56_SOL_PRICING, estimateProviderCostUsd } from '../src/qa/m2-provider.ts';
import { goldenRoutes } from '../tests/qa/golden-routes.ts';
import { runGoldenRoutes } from '../tests/qa/runner.ts';

const REQUIRED_PROVIDER = 'openai';
const REQUIRED_MODEL = 'gpt-5.6-sol';
const REPORT_PATH = resolve(process.cwd(), 'qa', 'reports', 'm2-1-pilot-latest.json');

function safeMessage(error) {
  return error instanceof Error ? error.message : 'Pilot execution failed.';
}

function preparedCandidates() {
  const golden = runGoldenRoutes();
  return ['opening-bad-assessment', 'chapter5-no-intimacy', 'chapter5-public-visibility'].map((routeId) => {
    const route = goldenRoutes.find((item) => item.id === routeId);
    const state = route && golden.states[routeId];
    if (!route || !state) throw new Error(`Missing pilot route ${routeId}`);
    return candidateFromTranscript({
      routeId,
      transcript: transcriptFromGameState(state),
      reason: 'GOLDEN_ROUTE',
      riskSignals: ['M2.1 approved remaining pilot'],
    });
  });
}

function printSummary(report) {
  const { usage } = report;
  console.log('EVE M2.1 REMAINING NARRATIVE QA');
  console.log(`Planned calls: ${report.plannedCalls}`);
  console.log(`Attempted external calls: ${report.attemptedExternalCalls}`);
  console.log(`Completed external calls: ${report.completedExternalCalls}`);
  console.log(`Failed external calls: ${report.failedExternalCalls}`);
  console.log(`Skipped after fail-fast: ${report.skippedAfterFailFast}`);
  console.log(`Input tokens: ${usage.usageAvailable ? usage.inputTokens : 'unavailable (0 recorded)'}`);
  console.log(`Output tokens: ${usage.usageAvailable ? usage.outputTokens : 'unavailable (0 recorded)'}`);
  console.log(`Reasoning tokens: ${usage.usageAvailable ? usage.reasoningTokens : 'unavailable (0 recorded)'}`);
  console.log(`Total tokens: ${usage.usageAvailable ? usage.totalTokens : 'unavailable (0 recorded)'}`);
  console.log(`Estimated cost: ${usage.estimatedCostUsd === undefined ? 'unavailable' : `$${usage.estimatedCostUsd.toFixed(6)}`}`);
  console.log('');
  console.log('route | reviewer | findings | highest severity | error');
  for (const item of report.results) {
    const error = item.result.error ? `${item.result.error.code}${item.result.error.status ? ` (${item.result.error.status})` : ''}` : '—';
    console.log(`${item.routeId} | ${item.reviewer} | ${item.result.findings.length} | ${highestSeverity(item.result.findings)} | ${error}`);
  }
  console.log(`Report: ${REPORT_PATH}`);
}

export async function runRemainingPilotCli(env = process.env) {
  if (env.EVE_NARRATIVE_PILOT_APPROVED !== '1') {
    console.error('PILOT_NOT_AUTHORIZED');
    return 3;
  }
  if (!env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY_MISSING');
    return 2;
  }
  if (env.EVE_NARRATIVE_PROVIDER !== REQUIRED_PROVIDER || env.EVE_NARRATIVE_MODEL !== REQUIRED_MODEL) {
    console.error('REMAINING_PILOT_PROVIDER_CONFIG_INVALID');
    return 2;
  }
  if (env.M2_SMOKE_ONLY) {
    console.error('M2_SMOKE_ONLY_MUST_BE_UNSET');
    return 3;
  }

  let candidates;
  let plan;
  try {
    candidates = preparedCandidates();
    plan = buildM21RemainingPilotPlan(candidates);
    assertM21RemainingPilotPlan(plan);
  } catch (error) {
    console.error(`REMAINING_PILOT_PLAN_ERROR: ${safeMessage(error)}`);
    return 1;
  }

  // The exact-nine assertion completes before provider construction or any review call.
  if (plan.calls.length !== 9 || plan.approvedSelection.length !== 9) {
    console.error('M2_REMAINING_PILOT_SELECTION_MISMATCH');
    return 1;
  }

  const configured = createNarrativeProviderFromEnv(env);
  if (configured.status !== 'AVAILABLE') {
    console.error(`PROVIDER_UNAVAILABLE: ${configured.reason}`);
    return 2;
  }

  const run = await runM21RemainingPilotCalls(candidates, configured.provider);
  const usage = summarizeM21PilotUsage(run.results);
  const outputCeilingCostUsd = estimateProviderCostUsd(
    { inputTokens: plan.estimatedInputTokens, outputTokens: plan.estimatedMaximumOutputTokens },
    M2_1_GPT_56_SOL_PRICING,
  );
  const report = {
    generatedAt: new Date().toISOString(),
    mode: 'REMAINING',
    provider: configured.provider.name,
    model: configured.provider.model,
    ...run.accounting,
    externalCalls: run.accounting.attemptedExternalCalls,
    usage,
    estimatedMaxCostUsd: outputCeilingCostUsd,
    approvedSelection: M2_REMAINING_PILOT_SELECTION,
    plan,
    results: run.results,
  };
  try {
    await mkdir(resolve(process.cwd(), 'qa', 'reports'), { recursive: true });
    await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.error(`REPORT_WRITE_FAILED: ${safeMessage(error)}`);
    return 1;
  }
  printSummary(report);
  return run.accounting.failedExternalCalls > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url.endsWith('/scripts/m2-remaining-pilot-cli.mjs')) {
  runRemainingPilotCli().then((code) => { process.exitCode = code; }).catch((error) => {
    console.error(`PILOT_FAILED: ${safeMessage(error)}`);
    process.exitCode = 1;
  });
}
