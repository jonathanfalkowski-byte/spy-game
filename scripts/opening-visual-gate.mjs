import { spawnSync } from 'node:child_process';

const result = spawnSync(
  process.execPath,
  ['node_modules/vitest/vitest.mjs', 'run', 'tests/state/opening-visual-occupancy.test.ts', '--reporter=verbose'],
  {
    stdio: 'inherit',
    env: { ...process.env, EVE_OPENING_VISUAL_GATE: '1' },
  },
);

process.exit(result.status ?? 1);
