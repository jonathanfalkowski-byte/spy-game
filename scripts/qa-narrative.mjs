import { spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'test';
const offlineModes = new Set(['prepare', 'test']);
if (mode === 'pilot') {
  if (process.argv[3] !== 'm2.1') {
    console.error('PILOT_SCOPE_REQUIRED: use pilot m2.1.');
    process.exit(3);
  }
  if (process.env.EVE_NARRATIVE_PILOT_APPROVED !== '1') {
    console.error('PILOT_NOT_AUTHORIZED');
    process.exit(3);
  }
  const provider = process.env.EVE_NARRATIVE_PROVIDER;
  if (!provider) {
    console.error('PROVIDER_NOT_CONFIGURED');
    process.exit(2);
  }
  const result = spawnSync(
    process.execPath,
    ['--no-warnings', '--experimental-strip-types', '--experimental-loader', './scripts/ts-strip-loader.mjs', './scripts/m2-pilot-cli.mjs'],
    { cwd: process.cwd(), env: { ...process.env }, stdio: 'inherit' },
  );
  process.exit(result.status ?? 1);
}
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
