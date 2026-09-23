import { createHash } from 'node:crypto';
import { expect, it } from 'vitest';
import golden from '../fixtures/rev19-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';

// Chapter 6 is additive inside revision 19: every pre-Chapter-6 revision-19 ledger must replay
// to the exact save it produced when captured. A mismatch means Chapters 1-5 changed.
it.each(golden.routes.map((route) => [route.name, route] as const))(
  'replays revision-19 route %s to its captured save bytes',
  (_name, route) => {
    const state = replay(route.ledger as GameEvent[], 19);
    expect(state.ledger).toHaveLength(route.events);
    const raw = encodeSave(state);
    expect(createHash('sha256').update(raw).digest('hex')).toBe(route.saveSha256);
    expect(decodeSave(raw)).toEqual(state);
  },
  15_000,
);
