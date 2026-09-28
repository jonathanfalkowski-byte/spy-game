import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter17Choices } from '../../src/content/chapter17';
import { board17p } from '../../src/content/chapter17-predator';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = `CHAPTER${7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17}_CHOOSE`;
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter17Choices(s).map((c) => c.id.replace(/^chapter17\./, ''));
const c17 = (s: GameState, id: string) => choose(s, 'CHAPTER17_CHOOSE', 'chapter17.' + id);
/** The deepening pass's moments (the heavy man, the recess): take the neutral pick when it is in the way. */
const NEUTRAL17 = ['heavy-watch', 'recess-sit'];
const walk17 = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL17.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c17(y, n);
    }
    return c17(y, id);
  }, s);
const run = (s: GameState, n: 10 | 11 | 12 | 13 | 14 | 15 | 16, path: string[]) => path.reduce((x, id) => choose(x, `CHAPTER${n}_CHOOSE`, `chapter${n}.` + id), s);

const QUIET = {
  ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'],
  ch13: ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', 'mirror-refuse', 'night-wait', 'late-on', 'friday-end'],
  ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'room-wait', 'ask-none', 'last-refuse', 'mercy-none', 'day-window', 'p14-evening-alone'],
  ch15: ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-clients', 'cost-money', 'phone-keep', 'ev-alone'],
  ch16: ['begin-predator', 'case-set', 'aim-wound', 'inside-none', 'outside-switch', 'first-clients', 'held-page', 'hour-sleep', 'wear-black', 'key-leave', 'clasp-alone', 'arrive-front'],
};
const ch16 = (aim: string, extra: string[], first: string, held: string, wear: string, key: string, arrive: string) => ['begin-predator', 'case-set', 'aim-' + aim, ...extra, 'outside-switch', 'first-' + first, 'held-' + held, 'hour-sleep', 'wear-' + wear, 'key-' + key, 'clasp-alone', 'arrive-' + arrive];
const ch15 = (took: string, cost: string) => ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-' + took, 'cost-' + cost, 'phone-keep', 'ev-alone'];
type Build = { night?: string; ch12?: string[]; ch13?: string[]; ch14?: string[]; ch15?: string[]; ch16?: string[] };
/** A real save (the maximal-julian golden) played through Chapter 6 and the whole Predator road, Chapters 7 to 14
 * 15 and 16 (quiet picks unless a build says otherwise), to Chapter 17's entry. */
function toRoom16(b: Build = {}) {
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
  s = run(s, 16, b.ch16 ?? QUIET.ch16);
  return s;
}

it('enters from the Predator Chapter 16 room: the succession, in front of them', () => {
  const s = toRoom16();
  expect(`${s.scene}.${s.phase}`).toBe('chapter16.room');
  expect(ids(s)).toEqual(['begin-predator']);
  const sit = c17(s, 'begin-predator');
  expect(sit.phase).toBe('sit');
  expect(text(sit)).toContain('And, you will forgive me, Anton, my successor. If she will have it.');
  expect(text(sit)).toContain('Black. Of course.');
  expect(ids(sit)).toEqual(['open-chair', 'open-stand', 'open-card']);
});

it('takes the seat: the chair first, the page as her price, and Celeste to the clients’ end', () => {
  const s = toRoom16({ ch16: ch16('seat', ['inside-julian', 'inside-done'], 'clients', 'page', 'green', 'throat', 'car') });
  const sit = c17(s, 'begin-predator');
  expect(text(sit)).toContain('My green. How flattering. Or how rude.');
  expect(text(sit)).toContain('And my key.');
  const market = c17(sit, 'open-chair');
  expect(text(market)).toContain('finds his own name on it');
  // Every Predator road reaches Geneva's list, so clause 14.3 can always be read.
  expect(ids(market)).toEqual(['press-market', 'press-claim', 'press-cost']);
  const heavy = c17(market, 'press-market');
  expect(ids(heavy)).toEqual(['heavy-stop', 'heavy-let', 'heavy-watch']);
  const marcus = c17(heavy, 'heavy-stop');
  expect(text(marcus)).toContain('Your name is on page nine of her ledger');
  const recess = c17(marcus, 'marcus-stand');
  expect(ids(recess)).toEqual(['recess-window', 'recess-soames', 'recess-sit']);
  const offer = c17(recess, 'recess-soames');
  expect(text(offer)).toContain('Who paid for your flat?');
  expect(text(offer)).toContain('The year of the key.');
  expect(text(offer)).toContain('Sit with us. Nobody would ever place you again. You would do the placing.');
  expect(text(offer)).toContain('This is what I came for.');
  const eleanor = c17(offer, 'offer-accept');
  expect(text(eleanor)).toContain('You are already sitting in it.');
  expect(text(eleanor)).toContain('page forty is burned in this room, tonight');
  expect([eleanor.choices['act4.offer'], eleanor.choices['act4.held-landed']]).toEqual(['accept', 'page']);
  const hands = c17(eleanor, 'named-wait');
  expect(hands.choices['act4.nell-said']).toBe('eleanor');
  expect(text(hands)).toContain('Eleanor. Her name was Eleanor Linden.');
  expect(text(hands)).toContain('walks the length of the table to the end, where the clients sit');
  expect(text(hands)).toContain('Now you will find out what I liked.');
  expect(ids(hands)).toEqual(['last-yes', 'last-no', 'last-orchid', 'last-key']);
  const done = c17(hands, 'last-key');
  expect(`${done.scene}.${done.phase}`).toBe('chapter17.minute');
  expect(text(done)).toContain('Keep it, darling. It’s yours now.');
  expect(text(done)).toContain('I did not walk out of the Vesper. I stayed.');
  expect([done.choices['act4.board'], done.choices['act4.terms'], done.choices['act4.last'], done.choices['pred.key17']]).toEqual(['succeeded', 'full', 'key', 'returned']);
  expect(done.facts).toContain('c17.p17-board');
  expect(ids(done)).toEqual([]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('refuses the chair, lands the page, and the board acts by the case', () => {
  const s = toRoom16();
  const done = walk17(s, ['begin-predator', 'open-stand', 'press-cost', 'marcus-use', 'offer-refuse', 'named-ask', 'last-no']);
  expect(text(done)).toContain('I’ll stand. I came as Helix.');
  expect(text(done)).toContain('He is the proof.');
  expect(text(done)).toContain('I didn’t come for a chair.');
  expect(text(done)).toContain('Transferred at client request. I’d like to know which of you signed for the next one.');
  const { board } = board17p(done);
  expect(done.choices['act4.board']).toBe(board);
  expect(board).not.toBe('succeeded');
  expect(text(done)).toContain('I opened it myself.');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('laughs, with nothing held back, and Nora answers for her sister', () => {
  const s = toRoom16({
    ch12: ['begin-predator', 'arrive-window', 'sign-copy', 'lunch-deny', 'take-night', 'afternoon-watch', 'list-close', 'account-decline', 'lake-alone', 'call-truth', 'dawn-sleep'],
    ch16: ch16('nell', ['inside-nora', 'inside-done'], 'clients', 'none', 'blue', 'pocket', 'front'),
  });
  const done = walk17(s, ['begin-predator', 'open-card', 'press-claim', 'marcus-vouch', 'offer-laugh', 'named-nora', 'last-orchid']);
  expect(text(done)).toContain('Marcus’s blue.');
  expect(text(done)).toContain('You don’t own Meridian.');
  expect(text(done)).toContain('Nobody at that table has ever heard anybody laugh at Celeste Laurent.');
  expect(text(done)).toContain('I’m still here.');
  expect(text(done)).toContain('She never wound it. I used to wind it for her, at breakfast.');
  expect(text(done)).toContain('Nell on the harbour wall at night, laughing, in flat shoes.');
  expect([done.choices['act4.named'], done.choices['act4.nell-said'], done.choices['act4.held-landed']]).toEqual(['nora', 'eleanor', 'none']);
  expect(replay(done.ledger, 19)).toEqual(done);
});
