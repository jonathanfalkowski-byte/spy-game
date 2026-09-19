import { expect, it } from 'vitest';
import { simulateRandomRoute } from '../../src/qa/m1';

it('qa:benchmark — 100/250/1000 headless deterministic simulations', () => {
  const results = [100, 250, 1000].map((count) => {
    const started = Date.now();
    const routes = Array.from({ length: count }, (_, index) => simulateRandomRoute({
      seed: index + 1,
      maxSteps: 300,
      chooserPolicy: 'prefer-unseen-action',
      replayEvery: 25,
    }));
    return {
      count,
      milliseconds: Date.now() - started,
      completed: routes.filter((route) => route.completed).length,
      failures: routes.reduce((total, route) => total + route.failures.length, 0),
    };
  });
  console.log(JSON.stringify({ command: 'qa:benchmark', results }, null, 2));
  expect(results.every((result) => result.completed === result.count && result.failures === 0)).toBe(true);
}, 180_000);
