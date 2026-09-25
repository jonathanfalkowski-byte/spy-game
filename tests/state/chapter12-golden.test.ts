import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden12 from '../fixtures/rev19-chapter12-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures one Chapter 12 route per answer to Nora', () => {
  expect(golden12.routes.map((r) => r.nora).sort()).toEqual(['go', 'kind', 'truth']);
  expect(golden12.routes.map((r) => r.singapore).sort()).toEqual(['everything', 'key', 'moved-in']);
});

// Later chapters are additive: every captured Chapter 12 ending must replay to its exact save.
it.each(golden12.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 12 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter12.complete');
    expect([state.choices['c12.nora'], state.choices['act3.singapore']]).toEqual([route.nora, route.singapore]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
