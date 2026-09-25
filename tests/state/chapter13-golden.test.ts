import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden13 from '../fixtures/rev19-chapter13-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures one Chapter 13 route per answer', () => {
  expect(golden13.routes.map((r) => r.answer).sort()).toEqual(['complied', 'countered', 'refused']);
  expect(golden13.routes.map((r) => r.honeypot).sort()).toEqual(['done', 'refused', 'staged']);
});

// Later chapters are additive: every captured Chapter 13 ending must replay to its exact save.
it.each(golden13.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 13 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter13.complete');
    expect([state.choices['c13.answer'], state.choices['act3.honeypot']]).toEqual([route.answer, route.honeypot]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
