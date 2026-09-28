import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter16Choices } from '../../src/content/chapter16';
import { case16 } from '../../src/content/chapter16-predator';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = `CHAPTER${7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16}_CHOOSE`;
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter16Choices(s).map((c) => c.id.replace(/^chapter16\./, ''));
const c16 = (s: GameState, id: string) => choose(s, 'CHAPTER16_CHOOSE', 'chapter16.' + id);
const walk16 = (s: GameState, path: string[]) => path.reduce(c16, s);
const run = (s: GameState, n: 10 | 11 | 12 | 13 | 14 | 15, path: string[]) => path.reduce((x, id) => choose(x, `CHAPTER${n}_CHOOSE`, `chapter${n}.` + id), s);

const QUIET = {
  ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'],
  ch13: ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', 'mirror-refuse', 'night-wait', 'late-on', 'friday-end'],
  ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'room-wait', 'ask-none', 'last-refuse', 'mercy-none', 'day-window', 'p14-evening-alone'],
  ch15: ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-clients', 'cost-money', 'phone-keep', 'ev-alone'],
};
const ch15 = (took: string, cost: string) => ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-' + took, 'cost-' + cost, 'phone-keep', 'ev-alone'];
type Build = { night?: string; ch12?: string[]; ch13?: string[]; ch14?: string[]; ch15?: string[] };
/** A real save (the maximal-julian golden) played through Chapter 6 and the whole Predator road, Chapters 7 to 14
 * and 15 (quiet picks unless a build says otherwise), to Chapter 16's entry. */
function toLedger15(b: Build = {}) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  for (const id of ['begin', 'route-confirm', 'car-quiet', 'view-sit', 'want-money', 'clause-access', 'clause-report', 'clause-private', 'julian-truth', 'lever-read', 'visit-busy', 'offer-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  for (const id of ['begin-predator', 'weeks-begin', 'pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-spare', b.night ?? 'night-home', 'friday-lie', 'julian8-thank', 'p8-evening-alone'])
    s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  s = run(s, 10, ['begin-predator', 'ask-go', 'eve-sleep', 'open-flatter', 'adrian-composed', 'offer-decline', 'after-walk', 'marcus-lie', 'ev-alone']);
  s = run(s, 11, ['begin-predator', 'dress-own', 'room-listen', 'guest-none', 'page-read', 'back-close', 'iris-nothing', 'order-refuse', 'cloak-wait', 'car-keep', 'late-alone']);
  s = run(s, 12, b.ch12 ?? QUIET.ch12);
  s = run(s, 13, b.ch13 ?? QUIET.ch13);
  s = run(s, 14, b.ch14 ?? QUIET.ch14);
  s = run(s, 15, b.ch15 ?? QUIET.ch15);
  return s;
}

it('enters from the Predator Chapter 15 ledger and counts the case honestly', () => {
  const s = toLedger15();
  expect(`${s.scene}.${s.phase}`).toBe('chapter15.ledger');
  expect(ids(s)).toEqual(['begin-predator']);
  const floor = c16(s, 'begin-predator');
  expect(floor.phase).toBe('floor');
  expect(text(floor)).toContain('Celeste’s client ledger, in green');
  expect(text(floor)).toContain('The black phone, switched off');
  const want = c16(floor, 'case-set');
  expect(want.choices['act4.case']).toBe(case16(want).strength);
  expect(text(want)).toContain('Beside her.');
  // The money was spent in Ch15, and nobody who could pay for Helix is at hand: no Helix aim.
  expect(ids(want)).toEqual(['aim-seat', 'aim-wound', 'aim-nell']);
});

it('goes in to take the seat: Julian at the clasp, the page as her price, and the car she sent', () => {
  const beside = walk16(toLedger15(), ['begin-predator', 'case-set', 'aim-seat']);
  expect(text(beside)).toContain('as her successor');
  expect(ids(beside)).toContain('inside-julian');
  const order = walk16(beside, ['inside-none', 'outside-switch']);
  expect(ids(order)).toContain('first-clients');
  const held = c16(order, 'first-clients');
  const price = chapter16Choices(held).find((c) => c.id === 'chapter16.held-page');
  expect(price?.label).toBe('Your price: Page forty');
  const armour = c16(held, 'held-page');
  const clasp = c16(armour, 'wear-green');
  expect(ids(clasp)).toContain('clasp-julian');
  const done = walk16(clasp, ['clasp-julian', 'arrive-car']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter16.room');
  expect(text(done)).toContain('Good luck, Ms Vale.');
  expect(text(done)).toContain('The seventh chair is beside hers, and it has been pulled out.');
  expect(text(done)).toContain('I am going to sit in it.');
  expect([done.choices['act4.aim'], done.choices['act4.first'], done.choices['act4.held'], done.choices['act4.wear'], done.choices['act4.arrive'], done.choices['act4.seen']]).toEqual(['seat', 'clients', 'page', 'green', 'car', 'yes']);
  expect(ids(done)).toEqual([]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('refuses the chair to wound them from inside Helix, in full view', () => {
  const done = walk16(toLedger15({ ch15: ch15('clients', 'visibility') }), [
    'begin-predator',
    'case-set',
    'aim-wound',
    'inside-julian',
    'inside-done',
    'outside-switch',
    'first-clients',
    'held-none',
    'wear-black',
    'clasp-alone',
    'arrive-front',
  ]);
  expect(text(done)).toContain('open Helix like a coat and show them the knife');
  expect(text(done)).toContain('three photographers');
  expect(text(done)).toContain('Behind you, Julian');
  expect(text(done)).toContain('leave it exactly where it is, empty, beside her, all night');
  expect([done.choices['act4.inside'], done.choices['act4.seen']]).toEqual(['julian', 'yes']);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('walks away with Helix, arriving as the company in Julian’s car', () => {
  const s = toLedger15({ ch15: ch15('nell', 'ally') });
  const want = walk16(s, ['begin-predator', 'case-set']);
  expect(ids(want)).toEqual(['aim-seat', 'aim-wound', 'aim-helix', 'aim-nell']);
  const done = walk16(want, ['aim-helix', 'inside-none', 'outside-switch', 'first-nell', 'held-page', 'wear-blue', 'clasp-alone', 'arrive-helix']);
  expect(text(done)).toContain('She is about to find out that Helix is leaving.');
  expect([done.choices['act4.aim'], done.choices['act4.arrive']]).toEqual(['helix', 'helix']);
  // Pryce was the ally spent in Chapter 15: no kerb for him tonight.
  expect(ids(walk16(want, ['aim-helix', 'inside-none']))).toEqual(['outside-switch']);
});

it('leaves anyone spent in Chapter 15 out of the room', () => {
  const s = toLedger15({ ch15: ch15('clients', 'relationship') });
  const beside = walk16(s, ['begin-predator', 'case-set', 'aim-wound']);
  expect(ids(beside)).not.toContain('inside-julian');
  const door = walk16(beside, ['inside-none', 'outside-switch', 'first-page', 'held-none', 'wear-black']);
  expect(ids(door)).not.toContain('clasp-julian');
  expect(ids(c16(door, 'clasp-alone'))).toEqual(['arrive-front', 'arrive-car']);
});
