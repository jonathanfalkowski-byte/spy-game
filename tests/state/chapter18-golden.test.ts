import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden18 from '../fixtures/rev19-chapter18-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures three names and three switches', () => {
  expect(golden18.routes.map((r) => r.identity).sort()).toEqual(['adrian', 'evelyn', 'new']);
  expect(golden18.routes.map((r) => r.switch).sort()).toEqual(['armed', 'disarmed', 'handed']);
});

// Later chapters are additive: every captured Chapter 18 ending must replay to its exact save.
it.each(golden18.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 18 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter18.complete');
    expect([state.choices['end.name'], state.choices['end.switch']]).toEqual([route.identity, route.switch]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
