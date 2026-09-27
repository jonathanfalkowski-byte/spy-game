import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { adjacent7, opposite7, suggested7 } from '../../src/content/chapter7';
import { chapter7Choices } from '../../src/content/chapter7';
import { c6, chapter5Complete, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  vi.stubEnv('VITE_EVE_CHAPTER6', '1');
  vi.stubEnv('VITE_EVE_CHAPTER7', '1');
});
afterEach(() => vi.unstubAllEnvs());

const julian = { 'c5.service': 'julian' };
/** Through Chapter 6 on the Julian workroom: the exit preparation and the end action decide the lane. */
const endOn = (exit: string, flags: Record<string, string> = {}) => {
  let s = walk(chapter5Complete({ flags: { ...julian, ...flags } }), ['begin', 'benefit-accept', 'expect-negotiate', 'counter-skip', 'friction-done', exit, 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  return c6(s, 'resolve-enforce');
};
const ids7 = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const c7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id });
  if (next === s) throw Error('Unavailable ' + id + ': ' + ids7(s).join(', '));
  return next;
};

it('carves Predator out of Executive: the Julian room held to its terms and knowingly deepened', () => {
  const predator = endOn('exit-deepen');
  expect(predator.phase).toBe('complete');
  expect(predator.choices['c6.route-lane']).toBe('predator');
  expect(text(predator)).toContain('tonight you started keeping the ledger');
  expect(deriveRoute6(predator)!.overlay).toEqual([]);
  // Held to its terms without the deepening, it stays the Julian lane.
  expect(endOn('exit-hold').choices['c6.route-lane']).toBe('executive');
});

it('seeds Predator from a kept lever and a transactional answer, without flipping other lanes', () => {
  const held = endOn('exit-hold');
  const kept = { ...held, choices: { ...held.choices, 'c3.memo': 'retain' } } as GameState;
  expect(deriveRoute6(kept)!.totals.predator).toBe(deriveRoute6(held)!.totals.predator + 2);
  expect(deriveRoute6(held)!.totals.predator).toBeGreaterThanOrEqual(1); // expect-negotiate
});

it('offers the Predator road at Chapter 7, beside Executive and Outside, with Celebrity as its opposite', () => {
  expect(adjacent7('predator')).toEqual(['executive', 'outside']);
  expect(adjacent7('executive')).toContain('predator');
  expect(opposite7('predator')).toBe('own-power');
  // The original ring is unchanged for the other lanes.
  expect([adjacent7('own-power'), opposite7('own-power')]).toEqual([['outside', 'executive'], 'institutional']);
  const confirm = c7(endOn('exit-deepen'), 'begin');
  expect(suggested7(confirm)).toBe('predator');
  expect(text(confirm)).toContain('the person who keeps the ledger runs the building');
  expect(ids7(confirm)).toEqual(['route-confirm', 'route-pivot-executive', 'route-pivot-outside', 'route-break']);
  const kept = c7(confirm, 'route-confirm');
  expect([kept.phase, kept.choices['route.lane']]).toEqual(['complete', 'predator']);
  expect(text(kept)).toContain('predator route — in development');
});
