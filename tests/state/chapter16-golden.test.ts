import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden16 from '../fixtures/rev19-chapter16-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures three aims and three arrivals', () => {
  expect(golden16.routes.map((r) => r.aim).sort()).toEqual(['expose', 'nell', 'terms']);
  expect(golden16.routes.map((r) => r.arrive).sort()).toEqual(['car', 'front', 'quiet']);
});

// Later chapters are additive: every captured Chapter 16 ending must replay to its exact save.
it.each(golden16.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 16 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter16.complete');
    expect([state.choices['act4.aim'], state.choices['act4.arrive']]).toEqual([route.aim, route.arrive]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
