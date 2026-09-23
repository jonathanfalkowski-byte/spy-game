import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden from '../fixtures/rev19-chapter6-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => vi.stubEnv('VITE_EVE_CHAPTER6', '1'));
afterEach(() => vi.unstubAllEnvs());

// Chapter 7 is additive after Chapter 6: every captured Chapter 6 complete ledger must replay to the
// exact save it produced when captured. A mismatch means Chapters 1-6 changed.
it.each(golden.routes.map((route) => [route.name, route] as const))(
  'replays Chapter 6 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    expect(`${state.scene}.${state.phase}`).toBe('chapter6.complete');
    expect(state.choices['c6.route-lane']).toBe(route.lane);
    const raw = encodeSave(state);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
    expect(decodeSave(raw)).toEqual(state);
  },
  15_000,
);
