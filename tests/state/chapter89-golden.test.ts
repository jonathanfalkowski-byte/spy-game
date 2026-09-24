import { createHash } from 'node:crypto';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden8 from '../fixtures/rev19-chapter8-golden.json';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const bytes = (ledger: unknown[]) => {
  const state = replay(ledger as GameEvent[], 19);
  const raw = encodeSave(state);
  expect(decodeSave(raw)).toEqual(state);
  return { state, sha: createHash('sha256').update(raw).digest('hex') };
};

// Later chapters are additive: every captured Chapter 8 and Chapter 9 ending must replay to its exact save.
it.each(golden8.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 8 route %s to its captured save bytes',
  (_name, route) => {
    const { state, sha } = bytes(route.ledger);
    expect(`${state.scene}.${state.phase}`).toBe('chapter8.complete');
    expect([state.choices['c8.entered'], state.choices['own.crossover']]).toEqual([route.entered, route.crossover]);
    expect(sha).toBe(route.saveSha256);
  },
  15_000,
);

it.each(golden9.routes.map((r) => [r.name, r] as const))(
  'replays Chapter 9 route %s to its captured save bytes',
  (_name, route) => {
    const { state, sha } = bytes(route.ledger);
    expect(`${state.scene}.${state.phase}`).toBe('chapter9.complete');
    expect([state.choices['case.strength'], state.choices['case.name'], state.choices['c9.name-road'], state.choices['c9.entered']]).toEqual([route.strength, 'celeste', route.nameRoad, route.entered]);
    expect(sha).toBe(route.saveSha256);
  },
  15_000,
);
