import { spawnSync } from 'node:child_process';

const result = spawnSync(
  process.execPath,
  [
    'node_modules/vitest/vitest.mjs',
    'run',
    'tests/state/opening-cinematic-coverage.test.ts',
    '--reporter=verbose',
  ],
  {
    env: { ...process.env, EVE_OPENING_CINEMATIC_GATE: '1' },
    stdio: 'inherit',
  },
);
process.exit(result.status ?? 1);
