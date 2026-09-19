import { expect, it } from 'vitest';
import { runCampaign } from './runner';

it('qa:deep — configurable nightly campaign', () => {
  const count = Number(process.env.QA_RANDOM_COUNT ?? 10000);
  const started = Date.now();
  const report = runCampaign({
    randomCount: Number.isFinite(count) && count > 0 ? count : 10000,
    maxSteps: 320,
    graph: { maxStates: 5000, maxDepth: 80, maxTransitions: 25000 },
  });
  console.log(JSON.stringify({ command: 'qa:deep', milliseconds: Date.now() - started, report }, null, 2));
  expect(report.goldenRoutes.fail).toBe(0);
  expect(report.replay.divergences).toBe(0);
}, 600_000);
