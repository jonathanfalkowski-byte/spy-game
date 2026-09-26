import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden17 from '../fixtures/rev19-chapter17-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

it('captures three last words, and never topples Meridian', () => {
  expect(golden17.routes.map((r) => r.last).sort()).toEqual(['no', 'orchid', 'yes']);
  for (const r of golden17.routes) expect(['resigned', 'diminished', 'closed']).toContain(r.board);
});

// Later chapters are additive: every captured Chapter 17 ending must replay to its exact save.
it.each(golden17.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 17 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    const raw = encodeSave(state);
    expect(decodeSave(raw)).toEqual(state);
    expect(`${state.scene}.${state.phase}`).toBe('chapter17.complete');
    expect([state.choices['act4.board'], state.choices['act4.last']]).toEqual([route.board, route.last]);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
  },
  30_000,
);
