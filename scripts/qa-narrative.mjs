import { spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'test';
const offlineModes = new Set(['prepare', 'test']);
if (!offlineModes.has(mode)) {
  const provider = process.env.EVE_NARRATIVE_PROVIDER;
  if (!provider) {
    console.error('PROVIDER_NOT_CONFIGURED');
    process.exit(2);
  }
  console.error(`PROVIDER_NOT_CONFIGURED: no adapter is registered for ${provider}.`);
  process.exit(2);
}

const result = spawnSync(
  process.execPath,
  ['node_modules/vitest/vitest.mjs', '--config', 'vitest.qa.config.ts', 'run', 'tests/qa/m2-command.qa.ts', '--reporter=dot'],
  { cwd: process.cwd(), env: { ...process.env, M2_COMMAND: mode }, stdio: 'inherit' },
);
process.exit(result.status ?? 1);
