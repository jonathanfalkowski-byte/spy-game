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
import { chapter17Choices } from '../../src/content/chapter17';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const once16 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER16_CHOOSE', id: 'chapter16.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids16(s).join(', '));
  return next;
};
/** The deepening pass's moments (dawn, the orchid at noon, the last minute): take the neutral pick when it is in the way. */
const NEUTRAL16 = ['x16-dawn-quiet', 'x16-orchid-leave', 'x16-minute-breathe'];
const c16 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids16(y).includes(id); i++) {
    const n = NEUTRAL16.find((d) => ids16(y).includes(d));
    if (!n) break;
    y = once16(y, n);
  }
  return once16(y, id);
};
const walk16 = (s: GameState, path: string[]) => path.reduce(c16, s);

/** Ch15 paths, played to Act III's end. */
const APPT15 = ['begin-executive', 'x15-ally-julian', 'x15-allies-done', 'x15-way-appointment', 'x15-snag-talk', 'x15-took-nell', 'x15-cost-money', 'x15-phone-keep', 'x15-night-alone'];
const CARD15 = ['begin-executive', 'x15-allies-none', 'x15-way-card', 'x15-snag-talk', 'x15-took-adrian', 'x15-cost-kept', 'x15-phone-river', 'x15-night-alone'];
const OWN15 = ['begin-executive', 'x15-allies-none', 'x15-way-invited', 'x15-snag-hide', 'x15-took-nell', 'x15-cost-money', 'x15-phone-return', 'x15-night-alone'];
const toSixteen = (b: Build, ch14: string[], ch15: string[]) => walk15(toFifteen(b, ch14), ch15);

/** Ch16 paths, played to the long room. */
const TERM16 = ['begin-executive', 'x16-dawn-julian', 'x16-case-set', 'x16-aim-term', 'x16-inside-julian', 'x16-inside-done', 'x16-outside-switch', 'x16-orchid-leave', 'x16-first-julian', 'x16-held-nell', 'x16-wear-black', 'x16-dressed-julian', 'x16-minute-hand', 'x16-arrive-helix'];
const EXIT16 = ['begin-executive', 'x16-case-set', 'x16-aim-exit', 'x16-inside-none', 'x16-outside-julian', 'x16-first-page', 'x16-held-none', 'x16-wear-grey', 'x16-dressed-alone', 'x16-arrive-front'];
const NELL16 = ['begin-executive', 'x16-case-set', 'x16-aim-nell', 'x16-inside-none', 'x16-outside-switch', 'x16-first-nell', 'x16-held-julian', 'x16-wear-black', 'x16-dressed-alone', 'x16-arrive-front'];
const toSeventeen = (b: Build, ch14: string[], ch15: string[], ch16: string[]) => walk16(toSixteen(b, ch14, ch15), ch16);

const ids17 = (s: GameState) => chapter17Choices(s).map((c) => c.id.replace(/^chapter17\./, ''));
const c17 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER17_CHOOSE', id: 'chapter17.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids17(s).join(', '));
  return next;
};
const walk17 = (s: GameState, path: string[]) => path.reduce(c17, s);
const ch17 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter17.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(undress\w*|naked|nude|kiss\w*|sex\w*|arous\w*|lust\w*)\b/i;

/** The same save with a different case on the table (the board reads the case; the real saves above all arrive strong). */
const withCase = (s: GameState, v: string) => {
  const x = structuredClone(s);
  x.choices['act4.case'] = v;
  return x;
};

it('enters Collateral from the Executive long room; Ch16 no longer says Chapter 17 is in development', () => {
  const s = toSeventeen({ ch8: TRUSTED8 }, ENFORCE14, APPT15, TERM16);
  expect(`${s.scene}.${s.phase}`).toBe('chapter16.complete');
  expect(text(s)).not.toContain('[Chapters 17–18 · executive road — in development]');
  expect(ids17(s)).toEqual(['begin-executive']);
  const product = c17(s, 'begin-executive');
  expect(`${product.scene}.${product.phase}`).toBe('chapter17.product');
  expect(ch17(product)).toContain('by your catalogue number');
  expect(ch17(product)).toContain('Black. You did dare.');
  expect(ids17(product)).toEqual(['x17-open-room', 'x17-open-celeste', 'x17-open-silent']);
});

it('the term, resigned: Julian reads 14.3 into the minutes, Sloane is vouched for, the gift refused; it authenticates', () => {
  const clause = walk17(toSeventeen({ ch8: TRUSTED8 }, ENFORCE14, APPT15, TERM16), ['begin-executive', 'x17-open-room']);
  expect(clause.choices['act4.open']).toBe('room');
  expect(ch17(clause)).toContain('MERCER, J. goes down first');
  expect(ch17(clause)).toContain('I signed eleven things I didn’t read, and I would like the board to watch me read them now.');
  expect(ch17(clause)).toContain('Did we know about 14.3?');
  expect(ids17(clause)).toEqual(['x17-press-clause', 'x17-press-collateral', 'x17-press-cost']);
  const officer = c17(clause, 'x17-press-collateral');
  expect(officer.phase).toBe('officer');
  expect(ch17(officer)).toContain('You put the small card on the table, face up');
  expect(ch17(officer)).toContain('Kind. Will not survive us.');
  expect(ch17(officer)).toContain('She’s right about the first part.');
  const gift = c17(officer, 'x17-sloane-vouch');
  expect(gift.choices['act4.sloane']).toBe('vouch');
  expect(ch17(gift)).toContain('All you have to do is stay.');
  expect(ch17(gift)).toContain('Whatever you choose, don’t choose it for me. I’m not the reason.');
  const wall = c17(gift, 'x17-gift-refuse');
  expect([wall.choices['act4.offer'], wall.choices['act4.held-landed']]).toEqual(['refuse', 'nell']);
  expect(ch17(wall)).toContain('I came to enforce a term.');
  expect(ch17(wall)).toContain('one initial. C.');
  expect(ch17(wall)).toContain('He rang me at six. I rang her sister at seven.');
  expect(ids17(wall)).toEqual(['x17-named-ask', 'x17-named-wait']);
  const tally = c17(wall, 'x17-named-ask');
  expect(tally.choices['act4.nell-said']).toBe('eleanor');
  expect(ch17(tally)).toContain('Celeste is asked to resign her seat, tonight');
  expect(ch17(tally)).toContain('Clause 14.3 struck from every Helix facility, tonight');
  const alone = c17(tally, 'x17-tally-on');
  expect([alone.choices['act4.board'], alone.choices['act4.terms']]).toEqual(['resigned', 'full']);
  expect(ch17(alone)).toContain('Did you ever like being her?');
  expect(ch17(alone)).toContain('He survived us. I didn’t expect that.');
  const done = c17(alone, 'x17-last-orchid');
  expect(`${done.scene}.${done.phase}`).toBe('chapter17.complete');
  expect(done.choices['act4.last']).toBe('orchid');
  expect(ch17(done)).toContain('Julian walks out beside you');
  expect(ch17(done)).toContain('[Chapter 18 · executive road — in development]');
  expect(ch17(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('exit, diminished: she reads the clause in his name, he texts from the kerb, and the terms are partial', () => {
  const s = withCase(toSeventeen({ key: 'key-accept', ch8: KEPT8 }, SPEND14, CARD15, EXIT16), 'supported');
  const clause = walk17(s, ['begin-executive', 'x17-open-silent']);
  expect(ch17(clause)).toContain('Iris’s grey. How very loyal.');
  expect(ch17(clause)).toContain('in his name');
  expect(ch17(clause)).not.toContain('Julian Mercer stands up');
  const gift = c17(clause, 'x17-press-cost');
  expect(gift.phase).toBe('gift');
  expect(ch17(gift)).toContain('Owen Marsh, who cycles to work.');
  expect(ch17(gift)).toContain('Don’t choose it for me.');
  const wall = c17(gift, 'x17-gift-laugh');
  expect(ch17(wall)).toContain('I’m still here.');
  const done = walk17(wall, ['x17-named-wait', 'x17-tally-on', 'x17-last-no']);
  expect([done.choices['act4.board'], done.choices['act4.terms'], done.choices['act4.nell-said']]).toEqual(['diminished', 'partial', 'no']);
  expect(ch17(done)).toContain('Celeste keeps her seat, and loses the room.');
  expect(ch17(done)).toContain('without the references');
  expect(ch17(done)).toContain('Julian is at the kerb');
});

it('Nell, closed: the board closes ranks on a thin case, and the road stays open', () => {
  const s = withCase(toSeventeen({ ch8: KEPT8 }, FALL14, OWN15, NELL16), 'thin');
  const done = walk17(s, ['begin-executive', 'x17-open-celeste', 'x17-press-clause', 'x17-gift-refuse', 'x17-named-wait', 'x17-tally-on', 'x17-last-yes']);
  expect([done.choices['act4.board'], done.choices['act4.terms'], done.choices['act4.held-landed']]).toEqual(['closed', 'none', 'julian']);
  expect(ch17(done)).toContain('Kind. Will not survive us. He survived.');
  expect(ch17(done)).toContain('She does not say it.');
  expect(ch17(done)).toContain('The board closes ranks.');
  expect(ch17(done)).toContain('Still solvable. Costlier.');
  expect(ch17(done)).toContain('Well?');
});

it('drawing Celeste out prices the gift in her own words, and moves the board', () => {
  const s = withCase(toSeventeen({ ch8: KEPT8 }, FALL14, OWN15, NELL16), 'thin');
  const done = walk17(s, ['begin-executive', 'x17-open-room', 'x17-press-clause', 'x17-gift-draw', 'x17-named-ask', 'x17-tally-on']);
  expect(ch17(done)).toContain('Mr Marsh’s inquiry, closed.');
  expect(done.choices['act4.board']).toBe('diminished');
  expect(done.choices['act4.nell-said']).toBe('evie');
});
