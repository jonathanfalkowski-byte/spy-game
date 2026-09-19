import { it } from 'vitest';
import { simulateRandomRoute } from '../../src/qa/m1';

it('replays one requested deterministic seed', () => {
  const seed = Number(process.env.QA_REPLAY_SEED ?? 1);
  const result = simulateRandomRoute({ seed, maxSteps: 220, chooserPolicy: 'prefer-unseen-action', replayEvery: 25 });
  console.log(JSON.stringify({ seed, completed: result.completed, failures: result.failures, trace: result.trace }, null, 2));
});
