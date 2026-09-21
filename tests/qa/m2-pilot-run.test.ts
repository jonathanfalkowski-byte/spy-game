import { describe, expect, it } from 'vitest';
import { fixtureCandidate } from './m2-fixtures';
import { estimateM21SmokeCeilingCostUsd, runM21PilotCalls, summarizeM21PilotUsage } from '../../src/qa/m2-pilot';
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
    provenance: { provider: 'test', model: 'test', contextDigest: 'a'.repeat(64), transcriptDigest: 'b'.repeat(64), requestDigest: 'c'.repeat(64) },
    ...overrides,
  };
}

describe('M2.1 pilot runner accounting', () => {
  it('fails fast on deterministic HTTP 400 and reports skipped calls', async () => {
    let calls = 0;
    const provider = {
      name: 'test',
      model: 'test',
      review: () => [],
      reviewAsync: async () => {
        calls++;
        return result({ error: { code: 'PROVIDER_ERROR', message: 'OpenAI request failed.', status: 400, details: { code: 'invalid_request_error' } } });
      },
    };
    const run = await runM21PilotCalls(candidates, provider);
    expect(calls).toBe(1);
    expect(run.accounting).toEqual({ plannedCalls: 10, attemptedExternalCalls: 1, completedExternalCalls: 0, failedExternalCalls: 1, skippedAfterFailFast: 9 });
  });

  it('continues after transient failures without retrying', async () => {
    let calls = 0;
    const provider = {
      name: 'test',
      model: 'test',
      review: () => [],
      reviewAsync: async () => {
        calls++;
        return result({ error: { code: 'RATE_LIMIT', message: 'rate limited', status: 429 } });
      },
    };
    const run = await runM21PilotCalls(candidates, provider);
    expect(calls).toBe(10);
    expect(run.accounting).toEqual({ plannedCalls: 10, attemptedExternalCalls: 10, completedExternalCalls: 0, failedExternalCalls: 10, skippedAfterFailFast: 0 });
  });

  it('records usage only when supplied and never invents tokens or cost', () => {
    const unavailable = summarizeM21PilotUsage([{
      ordinal: 1, routeId: 'opening-bad-assessment', reviewer: 'LOGIC', result: result(),
    }]);
    expect(unavailable).toEqual({ usageAvailable: false, inputTokens: 0, outputTokens: 0, reasoningTokens: 0, totalTokens: 0 });
    const available = summarizeM21PilotUsage([{
      ordinal: 1, routeId: 'opening-bad-assessment', reviewer: 'LOGIC', result: result({ usage: { inputTokens: 12, outputTokens: 4, reasoningTokens: 2, totalTokens: 16 }, estimatedCostUsd: 0.000128 }),
    }]);
    expect(available).toEqual({ usageAvailable: true, inputTokens: 12, outputTokens: 4, reasoningTokens: 2, totalTokens: 16, visibleOutputTokensApprox: 2, estimatedCostUsd: 0.000128 });
  });

  it('keeps the 3000-token smoke ceiling under the authorized cost gate', () => {
    expect(estimateM21SmokeCeilingCostUsd()).toBeCloseTo(0.088916, 8);
    expect(estimateM21SmokeCeilingCostUsd()).toBeLessThan(0.1);
  });
});
