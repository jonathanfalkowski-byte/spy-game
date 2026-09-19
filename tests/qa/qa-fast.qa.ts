import { expect, it } from 'vitest';
import { runCampaign } from './runner';

it('qa:fast — 100 deterministic routes and bounded multi-root graph smoke', () => {
  const started = Date.now();
  const report = runCampaign({
    randomCount: 100,
    graph: { maxStates: 250, maxDepth: 40, maxTransitions: 1000 },
  });
  console.log(JSON.stringify({ command: 'qa:fast', milliseconds: Date.now() - started, report }, null, 2));
  expect(report.goldenRoutes.fail).toBe(0);
  expect(report.replay.divergences).toBe(0);
}, 180_000);
