import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter15Choices } from '../../src/content/chapter15';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = `CHAPTER${7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15}_CHOOSE`;
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
const c15 = (s: GameState, id: string) => choose(s, 'CHAPTER15_CHOOSE', 'chapter15.' + id);
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);
const run = (s: GameState, n: 10 | 11 | 12 | 13 | 14, path: string[]) => path.reduce((x, id) => choose(x, `CHAPTER${n}_CHOOSE`, `chapter${n}.` + id), s);

const QUIET = {
  ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'],
  ch13: ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', 'mirror-refuse', 'night-wait', 'late-on', 'friday-end'],
  ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'room-wait', 'ask-none', 'last-refuse', 'mercy-none', 'day-window', 'p14-evening-alone'],
};
type Build = { night?: string; ch12?: string[]; ch13?: string[]; ch14?: string[] };
/** A real save (the maximal-julian golden) played through Chapter 6 and the whole Predator road, Chapters 7 to 14
 * (quiet picks unless a build says otherwise), to Chapter 15's entry. */
function toLedger14(b: Build = {}) {
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
  return s;
}

it('enters from the Predator Chapter 14 ledger: the key, as a courtesy', () => {
  const s = toLedger14();
  expect(`${s.scene}.${s.phase}`).toBe('chapter14.ledger');
  expect(ids(s)).toEqual(['begin-predator']);
  const gift = c15(s, 'begin-predator');
  expect(gift.phase).toBe('gift');
  expect(text(gift)).toContain('Helix’s new representative. How nice to meet you properly.');
  expect(text(gift)).toContain('Take what’s yours, darling. Only what’s yours.');
  expect(ids(gift)).toEqual(['gift-thank', 'gift-ask']);
});

it('copies the key with Lucien, takes Nell’s order, spends him, and writes the Act IV keys', () => {
  const s = toLedger14({
    night: 'night-pryce',
    ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-truth', 'take-ask', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'],
    ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'safe-letters', 'room-wait', 'ask-none', 'last-laugh', 'mercy-name', 'day-window', 'p14-evening-alone'],
  });
  const gift = c15(s, 'begin-predator');
  expect(text(gift)).toContain('Marcus tells me you laughed.');
  expect(text(gift)).toContain('And my letters. You may put them back in the drawer yourself.');
  expect(ids(gift)).toEqual(['gift-thank', 'gift-ask', 'gift-letters']);
  const people = c15(gift, 'gift-letters');
  expect(text(people)).toContain('Honesty is only a question of which copy.');
  expect(ids(people)).toEqual(['crew-lucien', 'crew-pryce', 'crew-julian', 'crew-alone']);
  const ways = c15(people, 'crew-lucien');
  expect(text(ways)).toContain('Chubb, 1911.');
  expect(ids(ways)).toEqual(['way-hour', 'way-copy']);
  const drawers = walk15(ways, ['way-copy', 'snag-bold']);
  expect(text(drawers)).toContain('the copy sticks in the lock');
  expect(text(drawers)).toContain('MAYA REYES');
  expect(text(drawers)).toContain('Candidate 7A');
  const week = c15(drawers, 'took-nell');
  expect([week.choices['act3.nell-order'], week.choices['act3.adrian'], week.choices['c15.maya-file'], week.choices['act3.page']]).toEqual(['taken', 'hers', 'yes', 'torn']);
  expect(week.facts).toContain('c15.p15-took');
  expect(text(week)).toContain('Lucien Morel');
  const line = c15(week, 'cost-ally');
  expect(text(line)).toContain('It was always going to be one of us.');
  expect([line.choices['act3.cost'], line.choices['act3.leash'], line.choices['act3.switch']]).toEqual(['ally', 'broken', 'set']);
  expect(text(line)).toContain('No more help.');
  expect(text(line)).toContain('I should warn you that I shall be there as myself.');
  const evening = c15(line, 'phone-keep');
  expect(evening.choices['act3.black-phone']).toBe('keep');
  expect(ids(evening)).toEqual(['ev-julian', 'ev-marcus', 'ev-lucien', 'ev-alone']);
  const done = walk15(evening, ['ev-lucien', 'p15-lucien-sex', 'p15-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter15.ledger');
  expect(done.facts).toContain('c15.p15-evening-consent');
  expect(text(done)).toContain('THE BOARD MEETS. THE FIRST THURSDAY.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('goes alone at the hour she was given, under Mrs Fenn’s eyes, and gives back the money', () => {
  const people = walk15(toLedger14(), ['begin-predator', 'gift-ask']);
  expect(text(people)).toContain('I trust the key. It only opens what I let it.');
  expect(ids(people)).toEqual(['crew-julian', 'crew-alone']);
  const ways = c15(people, 'crew-alone');
  expect(ids(ways)).toEqual(['way-hour']);
  const done = walk15(ways, ['way-hour', 'snag-talk', 'took-1109', 'cost-money', 'phone-river', 'ev-alone']);
  expect(text(done)).toContain('Take your time, dear. Mrs Laurent said you’d want to read.');
  expect(text(done)).toContain('the knitting needles stop');
  expect(text(done)).not.toContain('Operator: E. Vale');
  // Chapter 11 was refused on this save: the memo went into the canal.
  expect(text(done)).toContain('where the memo went in December');
  expect([done.choices['act3.cards'], done.choices['own.cash']]).toEqual(['taken', '0']);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('goes in at two with Pryce on the comply road, and her own operator’s receipt comes out with the tapes', () => {
  const s = toLedger14({
    night: 'night-pryce',
    ch13: ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', 'mirror-comply', 'feed-cut', 'late-dark', 'friday-end'],
    ch14: ['begin-predator', 'dawn-today', 'way-letter', 'eve-sleep', 'safe-horse', 'room-wait', 'ask-none', 'last-refuse', 'mercy-none', 'day-window', 'p14-evening-alone'],
  });
  const done = walk15(s, ['begin-predator', 'gift-thank', 'crew-pryce', 'way-night', 'snag-hide', 'took-1109', 'cost-visibility', 'phone-return', 'ev-alone']);
  expect(text(done)).toContain('Pryce brings the car to the embankment');
  expect(text(done)).toContain('Operator: E. Vale.');
  expect(text(done)).toContain('the woman who took Helix');
  expect([done.choices['act3.cost'], done.choices['act3.black-phone']]).toEqual(['visibility', 'return']);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('closes the Geneva account clean if she kept the card', () => {
  const s = toLedger14({ ch12: ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-take', 'lake-alone', 'call-none', 'dawn-sleep'] });
  const drawers = walk15(s, ['begin-predator', 'gift-thank', 'crew-alone', 'way-hour', 'snag-bold']);
  expect(ids(drawers)).toEqual(['took-nell', 'took-1109', 'took-clients', 'took-account']);
  const week = c15(drawers, 'took-account');
  expect(week.choices['pred.account']).toBe('closed');
  expect(text(week)).toContain('to a woman who was paid once already for her sister');
});
