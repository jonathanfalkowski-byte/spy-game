import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { it, vi } from 'vitest';
import { replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { rev19Routes, toRevision20 } from '../rev20-ledger';

/** Skipped by default. EVE_CAPTURE_REV20=1 npx vitest run tests/tools/capture-rev20-golden.test.ts
 * rewrites tests/fixtures/rev20-golden-ledgers.json. Recapture only for a deliberate revision-20 change. */
it.skipIf(!process.env.EVE_CAPTURE_REV20)('captures the revision-20 golden ledgers', () => {
  for (const n of [6, 7, 8, 9, 10, 11, 12]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const routes = rev19Routes.map(([name, ledger]) => {
    const r20 = toRevision20(ledger);
    const state = replay(r20, 20);
    return {
      name,
      events: r20.length,
      saveSha256: createHash('sha256').update(encodeSave(state)).digest('hex'),
      ledger: r20,
    };
  });
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const note =
    'Revision-20 ledgers (Chapters 1-9, gates open): the revision-19 golden routes with the same decisions, translated through the collapsed Aster negotiation. Replaying each must reproduce these exact save hashes.';
  writeFileSync(resolve('tests/fixtures/rev20-golden-ledgers.json'), JSON.stringify({ note, commit, routes }));
  vi.unstubAllEnvs();
}, 600_000);
