import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { it, vi } from 'vitest';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';

/**
 * Skipped by default. EVE_REHASH_GATED=1 npx vitest run tests/tools/rehash-gated-goldens.test.ts
 * Chapters 6–9 are gated and unreleased, so an in-place text fix there may change their revision-19
 * save bytes. This keeps every ledger exactly as captured and refreshes only saveSha256. It refuses
 * to touch the Chapter 1–5 fixture, whose bytes must never change.
 */
const files = ['6', '7', '8', '9'].map((n) => `tests/fixtures/rev19-chapter${n}-golden.json`);

it.skipIf(!process.env.EVE_REHASH_GATED)('refreshes the Chapter 6–9 revision-19 save hashes', () => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  for (const file of files) {
    const raw = readFileSync(resolve(file), 'utf8');
    const data = JSON.parse(raw) as { routes: { name: string; events: number; saveSha256: string; ledger: GameEvent[] }[] };
    for (const route of data.routes) {
      const state = replay(route.ledger, 19);
      if (state.ledger.length !== route.events) throw new Error(`${file} ${route.name}: ledger no longer replays in full`);
      route.saveSha256 = createHash('sha256').update(encodeSave(state)).digest('hex');
    }
    const indented = raw.startsWith('{\n');
    writeFileSync(resolve(file), (indented ? JSON.stringify(data, null, 2) : JSON.stringify(data)) + (raw.endsWith('\n') ? '\n' : ''));
  }
  vi.unstubAllEnvs();
}, 600_000);
