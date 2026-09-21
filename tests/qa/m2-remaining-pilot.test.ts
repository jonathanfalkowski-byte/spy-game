import { describe, expect, it } from 'vitest';
import { fixtureCandidate } from './m2-fixtures';
import { M2_REMAINING_PILOT_SELECTION } from '../../src/qa/m2-calibration';
import { assertM21RemainingPilotPlan, buildM21RemainingPilotPlan, runM21RemainingPilotCalls } from '../../src/qa/m2-pilot';
import type { ProviderReviewResult } from '../../src/qa/m2-provider';

const candidates = [
  fixtureCandidate('opening-bad-assessment'),
  fixtureCandidate('chapter5-no-intimacy'),
  fixtureCandidate('chapter5-public-visibility'),
];

function result(overrides: Partial<ProviderReviewResult> = {}): ProviderReviewResult {
  return {
    findings: [],
    rejected: [],
    provenance: { provider: 'offline-test', model: 'offline-test', contextDigest: 'a'.repeat(64), transcriptDigest: 'b'.repeat(64), requestDigest: 'c'.repeat(64) },
    ...overrides,
  };
}

describe('M2 remaining pilot safety gate', () => {
  it('builds exactly the approved nine-call plan and excludes LOGIC', () => {
    const plan = buildM21RemainingPilotPlan(candidates);
    assertM21RemainingPilotPlan(plan);
    expect(plan.calls).toHaveLength(9);
    expect(plan.calls.map(({ routeId, reviewer }) => `${routeId}|${reviewer}`)).toEqual(M2_REMAINING_PILOT_SELECTION.map(({ routeId, reviewer }) => `${routeId}|${reviewer}`));
    expect(plan.calls.some((call) => call.reviewer === 'LOGIC')).toBe(false);
    expect(plan.calls.every((call) => call.contentRevision !== undefined && call.authority !== undefined)).toBe(true);
  });

  it('runs sequentially and fails fast without retrying deterministic provider errors', async () => {
    const calls: string[] = [];
    const provider = {
      name: 'offline-test',
      model: 'offline-test',
      review: () => [],
      reviewAsync: async (_context: unknown, contract: { reviewer: string }) => {
        calls.push(contract.reviewer);
        return result({ error: { code: 'PROVIDER_ERROR', message: 'test', status: 400 } });
      },
    };
    const run = await runM21RemainingPilotCalls(candidates, provider);
    expect(calls).toHaveLength(1);
    expect(run.accounting).toEqual({ plannedCalls: 9, attemptedExternalCalls: 1, completedExternalCalls: 0, failedExternalCalls: 1, skippedAfterFailFast: 8 });
  });

  it('treats ordinary findings as completed reviewer calls', async () => {
    let calls = 0;
    const provider = {
      name: 'offline-test',
      model: 'offline-test',
      review: () => [],
      reviewAsync: async () => { calls++; return result({ findings: [] }); },
    };
    const run = await runM21RemainingPilotCalls(candidates, provider);
    expect(calls).toBe(9);
    expect(run.accounting).toEqual({ plannedCalls: 9, attemptedExternalCalls: 9, completedExternalCalls: 9, failedExternalCalls: 0, skippedAfterFailFast: 0 });
  });
});
