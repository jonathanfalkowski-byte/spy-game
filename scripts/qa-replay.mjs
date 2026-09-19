import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const seedIndex = args.indexOf('--seed');
const seed = seedIndex >= 0 ? Number(args[seedIndex + 1]) : 1;
if (!Number.isInteger(seed) || seed < 0) {
  console.error('Usage: npm run qa:replay -- --seed <non-negative integer>');
  process.exit(2);
}
const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs', '--config', 'vitest.qa.config.ts', 'run', 'tests/qa/replay-cli.qa.ts', '--reporter=dot'], {
  cwd: process.cwd(),
  env: { ...process.env, QA_REPLAY_SEED: String(seed) },
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
