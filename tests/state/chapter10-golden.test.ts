import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden10 from '../fixtures/rev19-chapter10-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

// Later chapters are additive: every captured Chapter 10 ending must replay to its exact save.
it.each(golden10.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 10 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter10.complete');
    expect([state.choices['c10.target'], state.choices['c10.answer']]).toEqual([route.target, route.answer]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
