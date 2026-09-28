import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter18Choices } from '../../src/content/chapter18';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = `CHAPTER${7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18}_CHOOSE`;
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter18Choices(s).map((c) => c.id.replace(/^chapter18\./, ''));
const c18 = (s: GameState, id: string) => choose(s, 'CHAPTER18_CHOOSE', 'chapter18.' + id);
const walk18 = (s: GameState, path: string[]) => path.reduce(c18, s);
const run = (s: GameState, n: 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17, path: string[]) => path.reduce((x, id) => choose(x, `CHAPTER${n}_CHOOSE`, `chapter${n}.` + id), s);

const QUIET = {
  ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'],
  ch13: ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', 'mirror-refuse', 'night-wait', 'late-on', 'friday-end'],
  ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'room-wait', 'ask-none', 'last-refuse', 'mercy-none', 'day-window', 'p14-evening-alone'],
  ch15: ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-clients', 'cost-money', 'phone-keep', 'ev-alone'],
  ch16: ['begin-predator', 'case-set', 'aim-wound', 'inside-none', 'outside-switch', 'first-clients', 'held-page', 'hour-sleep', 'wear-black', 'key-leave', 'clasp-alone', 'arrive-front'],
  ch17: ['begin-predator', 'open-stand', 'press-cost', 'marcus-stand', 'offer-refuse', 'named-wait', 'last-no'],
};
const ch16 = (aim: string, extra: string[], first: string, held: string, wear: string, key: string, arrive: string) => ['begin-predator', 'case-set', 'aim-' + aim, ...extra, 'outside-switch', 'first-' + first, 'held-' + held, 'hour-sleep', 'wear-' + wear, 'key-' + key, 'clasp-alone', 'arrive-' + arrive];
const ch15 = (took: string, cost: string) => ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'eve-sleep', 'snag-talk', 'read-none', 'took-' + took, 'cost-' + cost, 'phone-keep', 'ev-alone'];
type Build = { night?: string; ch12?: string[]; ch13?: string[]; ch14?: string[]; ch15?: string[]; ch16?: string[]; ch17?: string[] };
/** A real save (the maximal-julian golden) played through Chapter 6 and the whole Predator road, Chapters 7 to 14
 * 15, 16 and 17 (quiet picks unless a build says otherwise), to Chapter 18's entry. */
function toMinute17(b: Build = {}) {
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
  s = run(s, 17, b.ch17 ?? QUIET.ch17);
  return s;
}

const seatCh16 = ch16('seat', ['inside-julian', 'inside-done'], 'clients', 'page', 'green', 'throat', 'car');
const seatCh17 = ['begin-predator', 'open-chair', 'press-market', 'marcus-stand', 'offer-accept', 'named-wait', 'last-yes'];

it('enters from the Predator Chapter 17 minute: the morning after a refusal', () => {
  const s = toMinute17();
  expect(`${s.scene}.${s.phase}`).toBe('chapter17.minute');
  expect(ids(s)).toEqual(['begin-predator']);
  const papers = c18(s, 'begin-predator');
  expect(papers.phase).toBe('papers');
  expect(papers.choices['act4.board']).not.toBe('succeeded');
  expect(ids(papers)).toContain('papers-read');
  expect(ids(papers)).toContain('papers-sleep');
});

it('keeps the shop: Madame, the switch aimed at herself, Julian, and AVAILABLE', () => {
  const s = toMinute17({ ch16: seatCh16, ch17: seatCh17 });
  const papers = c18(s, 'begin-predator');
  expect(text(papers)).toContain('Good morning, Madame.');
  expect(text(papers)).toContain('Don’t change the lock.');
  const hold = c18(papers, 'papers-read');
  expect(text(hold)).toContain('The shop is mine.');
  expect(ids(hold)).toEqual(['shop-keep', 'shop-change', 'shop-close']);
  const sw = c18(hold, 'shop-keep');
  expect(sw.facts).toContain('c18.p18-shop');
  expect(text(sw)).toContain('the first note she has taken in thirty years');
  const owes = c18(sw, 'switch-armed');
  expect(text(owes)).toContain('or if I ever send a woman into a room she did not ask to walk into');
  expect(text(owes)).toContain('the page headed OWES');
  expect(text(owes)).toContain('MARCUS CHEN.');
  expect(ids(owes)).toContain('home-julian');
  const done = walk18(owes, ['home-julian', 'name-evelyn', 'year-close', 'year-sex', 'year-close']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter18.last');
  expect(text(done)).toContain('receiving them, in green, you');
  expect(text(done)).toContain('I bought the shop.');
  expect(text(done)).toContain('AVAILABLE.');
  expect([done.choices['end.shop'], done.choices['end.switch'], done.choices['end.with'], done.choices['end.name'], done.choices['end.consent']]).toEqual(['keep', 'armed', 'julian', 'evelyn', 'sex']);
  expect(ids(done)).toEqual([]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('closes the book from the chair, and the last card is not AVAILABLE', () => {
  const s = toMinute17({ ch16: seatCh16, ch17: seatCh17 });
  const done = walk18(s, ['begin-predator', 'papers-sleep', 'shop-close', 'switch-disarmed', 'home-none', 'name-adrian', 'year-quiet']);
  expect(text(done)).toContain('Item three. Declined.');
  expect(text(done)).toContain('I was bought once. Now I’m the only one who knows what I cost.');
  expect(text(done)).not.toContain('AVAILABLE.');
});

it('walks away with Helix, a year later in the corner office', () => {
  const s = toMinute17({
    ch15: ch15('nell', 'ally'),
    ch16: ch16('helix', ['inside-none'], 'nell', 'page', 'blue', 'leave', 'helix'),
    ch17: ['begin-predator', 'open-stand', 'press-claim', 'marcus-use', 'offer-refuse', 'named-ask', 'last-no'],
  });
  const done = walk18(s, ['begin-predator', 'papers-read', 'switch-handed', 'home-none', 'name-new', 'year-quiet']);
  expect(done.choices['act4.aim']).toBe('helix');
  expect(text(done)).toMatch(/Helix is yours|Helix is still yours/);
  expect(text(done)).toContain('The corner office above the river');
  expect(text(done)).toContain('drew a line through the word');
  expect(done.choices['end.switch']).toBe('handed');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('names Nell, and a year later, Holland Village', () => {
  const s = toMinute17({
    ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-watch', 'list-close', 'account-decline', 'lake-alone', 'call-truth', 'dawn-sleep'],
    ch15: ch15('nell', 'visibility'),
    ch16: ch16('nell', ['inside-nora', 'inside-done'], 'nell', 'page', 'black', 'leave', 'front'),
    ch17: ['begin-predator', 'open-card', 'press-cost', 'marcus-vouch', 'offer-refuse', 'named-nora', 'last-orchid'],
  });
  const done = walk18(s, ['begin-predator', 'papers-read', 'switch-armed', 'home-none', 'name-evelyn', 'year-quiet']);
  expect(text(done)).toContain('NORA LINDEN.');
  expect(text(done)).toContain('YOU. The woman who took Helix, on the record, forever.');
  expect(text(done)).toContain('Holland Village, a kitchen with a photograph on its wall');
  expect(text(done)).toContain('I bought her back.');
});
