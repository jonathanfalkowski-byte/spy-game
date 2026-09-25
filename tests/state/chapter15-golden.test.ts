import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden15 from '../fixtures/rev19-chapter15-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures one Chapter 15 route per road', () => {
  expect(golden15.routes.map((r) => r.road).sort()).toEqual(['complied', 'countered', 'refused']);
  expect(golden15.routes.map((r) => r.cost).sort()).toEqual(['ally', 'money', 'visibility']);
});

// Later chapters are additive: every captured Chapter 15 ending must replay to its exact save.
it.each(golden15.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 15 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter15.complete');
    expect([state.choices['c14.answer'], state.choices['c15.cost'], state.choices['act3.leash']]).toEqual([route.road, route.cost, 'broken']);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
