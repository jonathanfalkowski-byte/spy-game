import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden14 from '../fixtures/rev19-chapter14-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures one Chapter 14 route per answer', () => {
  expect(golden14.routes.map((r) => r.answer).sort()).toEqual(['complied', 'countered', 'refused']);
  expect(golden14.routes.map((r) => r.sloane).sort()).toEqual(['free', 'handed', 'shut']);
});

// Later chapters are additive: every captured Chapter 14 ending must replay to its exact save.
it.each(golden14.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 14 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter14.complete');
    expect([state.choices['c14.answer'], state.choices['act3.sloane']]).toEqual([route.answer, route.sloane]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
