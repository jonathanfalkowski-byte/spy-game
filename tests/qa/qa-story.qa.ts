import { expect, it } from 'vitest';
import { runCampaign } from './runner';

it('qa:story — developer-scale deterministic campaign with multi-root graph', () => {
  const count = Number(process.env.QA_RANDOM_COUNT ?? 1000);
  const started = Date.now();
  const report = runCampaign({
    randomCount: Number.isFinite(count) && count > 0 ? count : 1000,
    maxSteps: 300,
    // Keep the graph cap at the review-sized bounded campaign. Story-scale
    // growth is provided by the 1,000 seeded simulations; graph breadth is
    // reported per replay-authenticated root and remains explicitly capped.
    graph: { maxStates: 250, maxDepth: 40, maxTransitions: 1000 },
  });
  console.log(JSON.stringify({ command: 'qa:story', milliseconds: Date.now() - started, report }, null, 2));
  expect(report.goldenRoutes.fail).toBe(0);
  expect(report.replay.divergences).toBe(0);
}, 300_000);
