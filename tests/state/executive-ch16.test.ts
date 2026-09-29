import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter13Choices } from '../../src/content/chapter13';
import { chapter14Choices } from '../../src/content/chapter14';
import { chapter15Choices } from '../../src/content/chapter15';
import { chapter16Choices } from '../../src/content/chapter16';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER11_CHOOSE' | 'CHAPTER12_CHOOSE' | 'CHAPTER13_CHOOSE' | 'CHAPTER14_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
const once14 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
/** The deepening pass's moments (Marcus's offer, the tie, the box): take the neutral pick when it is in the way. */
const NEUTRAL14 = ['x14-marcus-quiet', 'x14-tie-go', 'x14-box-silence'];
const c14 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
    const n = NEUTRAL14.find((d) => ids(y).includes(d));
    if (!n) break;
    y = once14(y, n);
  }
  return once14(y, id);
};
const walk14 = (s: GameState, path: string[]) => path.reduce(c14, s);

type Build = { terms?: string[]; key?: string; ch8: string[]; ch10?: string[]; ch11?: string[]; ch12?: string[]; ch13?: string[]; flags?: Record<string, string> };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, the
 * Chapter 9 bridge, and Executive Chapters 10–13 (by default refusing the calendar, the pen and the placement, and never
 * telling him), to its end. `flags` override keys (not replayable). */
function toBridge(b: Build) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-narrow') ? 'expect-narrow' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.begin');
  s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + (deriveRoute6(s)?.lane === 'executive' ? 'route-confirm' : 'route-pivot-executive'));
  for (const id of ['arrive-ontime', 'breakfast-quiet', 'safe-writing', 'photo-leave', ...(b.terms ?? ['door', 'firewall', 'files']).map((t) => 'term-' + t), 'marcus-answer', 'lift-thank', b.key ?? 'key-decline', 'x-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  const ids8 = (x: GameState) => chapter8Choices(x).map((c) => c.id.replace(/^chapter8\./, ''));
  for (const id of ['begin-executive', ...b.ch8]) {
    // Chapter 8's deepening moments: take the neutral pick when it is in the way.
    for (let i = 0; i < 3 && !ids8(s).includes(id); i++) {
      const n = ['x8-clare-leave', 'x8-midnight-go', 'x8-table-quiet'].find((d) => ids8(s).includes(d));
      if (!n) break;
      s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + n);
    }
    s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  }
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  for (const id of ['begin-executive', ...(b.ch10 ?? ['x10-go', 'x10-eve-sleep', 'x10-adrian-composed', 'x10-calendar-refuse', 'x10-after-desk', 'x10-paper-quiet', 'x10-midweek-fine', 'x10-week-yes', 'x10-night-alone'])])
    s = choose(s, 'CHAPTER10_CHOOSE', 'chapter10.' + id);
  for (const id of ['begin-executive', ...(b.ch11 ?? ['x11-room-watch', 'x11-dance-no', 'x11-iris-quiet', 'x11-book-turn', 'x11-corridor-quiet', 'x11-pen-refuse', 'x11-signing-go', 'x11-drive-party', 'x11-night-alone'])])
    s = choose(s, 'CHAPTER11_CHOOSE', 'chapter11.' + id);
  for (const id of ['begin-executive', ...(b.ch12 ?? ['x12-changi-go', 'x12-tan-listen', 'x12-evening-hotel', 'x12-search-wardrobe', 'x12-caught-hide', 'x12-ashby-nell', 'x12-morning-errands', 'x12-nora-go', 'x12-afternoon-sleep', 'x12-tell-not', 'x12-harbour-quiet', 'x12-night-alone'])])
    s = choose(s, 'CHAPTER12_CHOOSE', 'chapter12.' + id);
  for (const id of ['begin-executive', ...(b.ch13 ?? ['x13-placement-go', 'x13-week-wall', 'x13-tell-notyet', 'x13-eve-alone', 'x13-answer-refuse', 'x13-vigil-silent', 'x13-twoam-on', 'x13-told-never'])])
    s = choose(s, 'CHAPTER13_CHOOSE', 'chapter13.' + id);
  if (b.flags) s = Object.assign(structuredClone(s), { choices: { ...s.choices, ...b.flags } });
  return s;
}

/** Ch8: holds his diary, puts her name on the paper, takes the car once, civil with Sloane, tells him about 14.3. */
const TRUSTED8 = ['x8-light-on', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-mine', 'x8-fav-car', 'x8-car-once', 'x8-sloane-civil', 'x8-file-tell', 'x8-late-alone'];
/** Ch8: takes the car, the card and the call; cold with Sloane; keeps a copy of page thirty-one. */
const KEPT8 = ['x8-light-off', 'x8-fav-car', 'x8-car-take', 'x8-fav-card', 'x8-card-take', 'x8-fav-fixer', 'x8-fixer-take', 'x8-sloane-cold', 'x8-file-keep', 'x8-late-alone'];

const ids15 = (s: GameState) => chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
const once15 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids15(s).join(', '));
  return next;
};
/** The deepening pass's moments (the night before, the first Evelynn's drawer, the Collateral card): the neutral pick when in the way. */
const NEUTRAL15 = ['x15-plan-sleep', 'x15-first-away', 'x15-cardj-keep'];
const c15 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids15(y).includes(id); i++) {
    const n = NEUTRAL15.find((d) => ids15(y).includes(d));
    if (!n) break;
    y = once15(y, n);
  }
  return once15(y, id);
};
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);

/** Ch14 ways, played to the end of The Signature. */
const ENFORCE14 = ['begin-executive', 'x14-to-file', 'x14-celeste-think', 'x14-truth-all', 'x14-way-enforce', 'x14-sloane-accept', 'x14-night-alone'];
const SPEND14 = ['begin-executive', 'x14-to-window', 'x14-celeste-doubt', 'x14-truth-order', 'x14-way-spend', 'x14-board-go', 'x14-night-alone'];
const FALL14 = ['begin-executive', 'x14-to-him', 'x14-celeste-silent', 'x14-truth-none', 'x14-way-fall', 'x14-board-go', 'x14-night-alone'];
const toFifteen = (b: Build, ch14: string[]) => walk14(toBridge(b), ch14);

const ids16 = (s: GameState) => chapter16Choices(s).map((c) => c.id.replace(/^chapter16\./, ''));
const c16 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER16_CHOOSE', id: 'chapter16.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids16(s).join(', '));
  return next;
};
const walk16 = (s: GameState, path: string[]) => path.reduce(c16, s);

/** Ch15 paths, played to Act III's end. */
const APPT15 = ['begin-executive', 'x15-ally-julian', 'x15-allies-done', 'x15-way-appointment', 'x15-snag-talk', 'x15-took-nell', 'x15-cost-money', 'x15-phone-keep', 'x15-night-alone'];
const CARD15 = ['begin-executive', 'x15-allies-none', 'x15-way-card', 'x15-snag-talk', 'x15-took-adrian', 'x15-cost-kept', 'x15-phone-river', 'x15-night-alone'];
const OWN15 = ['begin-executive', 'x15-allies-none', 'x15-way-invited', 'x15-snag-hide', 'x15-took-nell', 'x15-cost-money', 'x15-phone-return', 'x15-night-alone'];
const toSixteen = (b: Build, ch14: string[], ch15: string[]) => walk15(toFifteen(b, ch14), ch15);

it('enters The Term from the Executive Chapter 15; Ch15 no longer says Act IV is in development', () => {
  const s = toSixteen({ ch8: TRUSTED8 }, ENFORCE14, APPT15);
  expect(`${s.scene}.${s.phase}`).toBe('chapter15.complete');
  expect(text(s)).not.toContain('[Chapters 16–18 · executive road — in development]');
  expect(ids16(s)).toEqual(['begin-executive']);
  const layout = c16(s, 'begin-executive');
  expect(layout.phase).toBe('layout');
  expect(text(layout)).toContain('MERCER, J. in the middle');
  expect(text(layout)).toContain('MERCER, J.: eleven signatures');
  expect(text(layout)).toMatch(/THE CASE: (SUPPORTED|STRONG|OVERWHELMING)\./);
});

it('the term, enforced: Julian as Helix, 14.3 first, his hands at the clasp, Helix’s car; it authenticates', () => {
  const purpose = walk16(toSixteen({ ch8: TRUSTED8 }, ENFORCE14, APPT15), ['begin-executive', 'x16-case-set']);
  expect(ids16(purpose)).toEqual(['x16-aim-term', 'x16-aim-exit', 'x16-aim-nell']);
  const company = c16(purpose, 'x16-aim-term');
  expect(company.choices['act4.aim']).toBe('term');
  expect(ids16(company)).toContain('x16-inside-julian');
  const inside = c16(company, 'x16-inside-julian');
  expect(inside.choices['act4.julian']).toBe('helix');
  expect(text(inside)).toContain('Helix has a seat. I’m told it’s by the door.');
  const seq = walk16(inside, ['x16-inside-done', 'x16-outside-switch']);
  expect(seq.phase).toBe('sequence');
  expect(ids16(seq)).toContain('x16-first-julian');
  const clasp = walk16(seq, ['x16-first-julian', 'x16-held-nell']);
  expect(clasp.choices['act4.held']).toBe('nell');
  const emb = walk16(clasp, ['x16-wear-black', 'x16-dressed-julian']);
  expect(text(emb)).toContain('Come back.');
  expect(ids16(emb)[0]).toBe('x16-arrive-helix');
  const done = c16(emb, 'x16-arrive-helix');
  expect(`${done.scene}.${done.phase}`).toBe('chapter16.complete');
  expect(text(done)).toContain('Good luck, Ms Vale.');
  expect(text(done)).toContain('in the chair marked HELIX GROUP, Julian Mercer');
  expect(text(done)).toContain('Darling. You came as yourself. So did I.');
  expect(text(done)).toContain('[Chapters 17–18 · executive road — in development]');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('exit, with rights intact: owing nobody after giving his things back; the front door', () => {
  const purpose = walk16(toSixteen({ key: 'key-accept', ch8: KEPT8 }, SPEND14, CARD15), ['begin-executive', 'x16-case-set']);
  expect(ids16(purpose)).toEqual(['x16-aim-term', 'x16-aim-exit', 'x16-aim-spent', 'x16-aim-nell']);
  const company = c16(purpose, 'x16-aim-exit');
  expect(text(company)).toContain('Out of Helix, and owing nobody. I made sure of that already.');
  expect(text(company)).toContain('References unreserved.');
  const clasp = walk16(company, ['x16-inside-none', 'x16-outside-julian', 'x16-first-page', 'x16-held-none']);
  expect(clasp.choices['act4.julian']).toBe('outside');
  expect(ids16(clasp)).not.toContain('x16-wear-his');
  const done = walk16(clasp, ['x16-wear-grey', 'x16-dressed-alone', 'x16-arrive-front']);
  expect(done.choices['act4.aim']).toBe('exit');
  expect(text(done)).toContain('I am going to walk out of this room owing nobody.');
});

it('Nell: the term is closed when he fell, and says why; Julian comes as a witness; Celeste’s car', () => {
  const purpose = walk16(toSixteen({ ch8: KEPT8 }, FALL14, OWN15), ['begin-executive', 'x16-case-set']);
  expect(text(purpose)).toContain('a company that let him go');
  expect(ids16(purpose)).toEqual(['x16-aim-exit', 'x16-aim-spent', 'x16-aim-nell']);
  const company = c16(purpose, 'x16-aim-nell');
  const inside = c16(company, 'x16-inside-julian');
  expect(inside.choices['act4.julian']).toBe('witness');
  expect(text(inside)).toContain('Not as Helix. As the man who signed them.');
  const done = walk16(inside, ['x16-inside-done', 'x16-outside-switch', 'x16-first-nell', 'x16-held-julian', 'x16-wear-black', 'x16-dressed-alone', 'x16-arrive-car']);
  expect(done.choices['act4.aim']).toBe('nell');
  expect(text(done)).toContain('Eleanor Linden. Say it.');
});
