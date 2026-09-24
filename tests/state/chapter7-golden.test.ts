import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden from '../fixtures/rev19-chapter7-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  vi.stubEnv('VITE_EVE_CHAPTER6', '1');
  vi.stubEnv('VITE_EVE_CHAPTER7', '1');
});
afterEach(() => vi.unstubAllEnvs());

// Chapter 8 is additive after Chapter 7: every captured Chapter 7 complete ledger must replay to the
// exact save it produced when captured. A mismatch means Chapters 1-7 changed.
it.each(golden.routes.map((route) => [route.name, route] as const))(
  'replays Chapter 7 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    expect(`${state.scene}.${state.phase}`).toBe('chapter7.complete');
    expect([state.choices['route.lane'], state.choices['route.entry'], state.choices['c7.finding'] ?? null]).toEqual([route.lane, route.entry, route.finding]);
    const raw = encodeSave(state);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
    expect(decodeSave(raw)).toEqual(state);
  },
  15_000,
);
