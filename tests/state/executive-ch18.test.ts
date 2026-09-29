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
import { chapter18Choices } from '../../src/content/chapter18';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const once17 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER17_CHOOSE', id: 'chapter17.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids17(s).join(', '));
  return next;
};
/** The deepening pass's moments (the chair, the recess, the pen): take the neutral pick when it is in the way. */
const NEUTRAL17 = ['x17-chair-stand', 'x17-recess-table', 'x17-pen-leave'];
const c17 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids17(y).includes(id); i++) {
    const n = NEUTRAL17.find((d) => ids17(y).includes(d));
    if (!n) break;
    y = once17(y, n);
  }
  return once17(y, id);
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
/** Ch17 paths, played to the front door. */
const TERM17 = ['begin-executive', 'x17-open-room', 'x17-press-collateral', 'x17-sloane-vouch', 'x17-recess-julian', 'x17-gift-refuse', 'x17-named-ask', 'x17-pen-julian', 'x17-tally-on', 'x17-last-orchid'];
const EXIT17 = ['begin-executive', 'x17-open-silent', 'x17-press-cost', 'x17-gift-laugh', 'x17-named-wait', 'x17-tally-on', 'x17-last-no'];
const NELL17 = ['begin-executive', 'x17-open-celeste', 'x17-press-clause', 'x17-gift-refuse', 'x17-named-wait', 'x17-tally-on', 'x17-last-yes'];
const termEighteen = () => walk17(toSeventeen({ ch8: TRUSTED8 }, ENFORCE14, APPT15, TERM16), TERM17);
const exitEighteen = () => walk17(withCase(toSeventeen({ key: 'key-accept', ch8: KEPT8 }, SPEND14, CARD15, EXIT16), 'supported'), EXIT17);
const nellEighteen = () => walk17(withCase(toSeventeen({ ch8: KEPT8 }, FALL14, OWN15, NELL16), 'thin'), NELL17);

const ids18 = (s: GameState) => chapter18Choices(s).map((c) => c.id.replace(/^chapter18\./, ''));
const c18 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER18_CHOOSE', id: 'chapter18.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids18(s).join(', '));
  return next;
};
const walk18 = (s: GameState, path: string[]) => path.reduce(c18, s);
const ch18 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter18.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');

const withFlags = (s: GameState, flags: Record<string, string>) => {
  const x = structuredClone(s);
  Object.assign(x.choices, flags);
  return x;
};
const EXPLICIT = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters Read Twice from the Executive front door; Ch17 no longer says Chapter 18 is in development', () => {
  const s = termEighteen();
  expect(`${s.scene}.${s.phase}`).toBe('chapter17.complete');
  expect(text(s)).not.toContain('[Chapter 18 · executive road — in development]');
  expect(ids18(s)).toEqual(['begin-executive']);
  const friday = c18(s, 'begin-executive');
  expect(`${friday.scene}.${friday.phase}`).toBe('chapter18.friday');
  expect(ch18(friday)).toContain('You were worth it. C.');
  expect(ch18(friday)).toContain('I read it twice. I’m going to do that for the rest of my life.');
  expect(ids18(friday)).toEqual(['x18-friday-julian', 'x18-friday-sleep']);
});

it('the term, in full, with Julian: the office next door, the photograph, the page written by both; it authenticates', () => {
  const settle = walk18(termEighteen(), ['begin-executive', 'x18-friday-julian']);
  expect(ch18(settle)).toContain('Well.');
  expect(ch18(settle)).toContain('Director, Counterparties');
  expect(ids18(settle)).toEqual(['x18-switch-armed', 'x18-switch-disarmed']);
  const keys = c18(settle, 'x18-switch-armed');
  expect([keys.choices['end.switch'], keys.choices['end.position']]).toEqual(['armed', 'term-full']);
  expect(ch18(keys)).toContain('I never took any of it.');
  const dinner = c18(keys, 'x18-keys-none');
  expect(ch18(dinner)).toContain('I said I’d tell you sitting down.');
  const photo = c18(dinner, 'x18-dinner-photo');
  expect(ch18(photo)).toContain('I signed the first 14.3 the week she went.');
  expect(ids18(photo)).toEqual(['x18-photo-up', 'x18-photo-down', 'x18-photo-his']);
  const home = c18(photo, 'x18-photo-up');
  expect([home.choices['end.photo'], home.choices['end.answer']]).toEqual(['up', 'truth']);
  expect(ch18(home)).toContain('I was waiting to be told.');
  expect(ch18(home)).toContain('WHAT DO I OWE HIM? THE TRUTH. PAID.');
  expect(ids18(home)).toEqual(['x18-home-julian', 'x18-home-none']);
  const page = walk18(home, ['x18-home-julian', 'x18-name-evelyn']);
  expect(page.phase).toBe('page');
  expect(ch18(page)).toContain('The office next door, the light on, your name on the door.');
  expect(ids18(page)).toEqual(['x18-page-write']);
  const term = c18(page, 'x18-page-write');
  expect(ch18(term)).toContain('I read everything she asks me to, twice.');
  const night = walk18(term, ['x18-term-stay', 'x18-later-invite']);
  expect(ch18(night)).toContain('I may stay. That is mine to decide, every morning');
  expect(ids18(night)).toEqual(['x18-later-no-sex', 'x18-later-goodnight']);
  const done = walk18(night, ['x18-later-no-sex', 'x18-later-close']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter18.read');
  expect([done.choices['end.with'], done.choices['end.name'], done.choices['end.page'], done.choices['end.term'], done.choices['end.consent'], done.choices['end.later']]).toEqual(['julian', 'evelyn', 'together', 'stay', 'no-sex', 'close']);
  expect(done.facts).toContain('c18.x-evening-consent');
  expect(ch18(done)).toContain('My name is Evelyn Vale. I was sold on a signature. I wrote my own terms, and somebody read them twice.');
  expect(ch18(done)).toContain('The end of the Executive route.');
  expect(ids18(done)).toEqual([]);
  expect(ch18(done)).not.toMatch(EXPLICIT);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('exit, partial, alone: the door term, everything already given back, a page of her own', () => {
  const done = walk18(exitEighteen(), ['begin-executive', 'x18-friday-sleep', 'x18-switch-disarmed', 'x18-keys-none', 'x18-dinner-quiet', 'x18-home-none', 'x18-name-new', 'x18-page-own', 'x18-later-quiet']);
  expect(done.choices['end.position']).toBe('exit-partial');
  expect(ch18(done)).toContain('exactly as the first of your three terms said');
  expect(ch18(done)).toContain('Without the references.');
  expect(ch18(done)).toContain('I gave it all back in the spring');
  expect(ch18(done)).toContain('burn them in the sink');
  expect(ch18(done)).toContain('I may leave anything, at any time');
  expect(ch18(done)).toContain('Nobody else needs to read it.');
  expect(ids18(done)).toEqual([]);
});

it('Nell, closed: the harbour wall with Nora, what of his she kept, and the page with the door first', () => {
  const keys = walk18(nellEighteen(), ['begin-executive', 'x18-friday-julian', 'x18-switch-armed']);
  expect(ch18(keys)).toContain('Nothing. No papers, no letter, no orchid.');
  expect(ch18(keys)).toContain('walk the harbour wall together');
  expect(ch18(keys)).toContain('the black card');
  expect(ids18(keys)).toEqual(['x18-keys-keep', 'x18-keys-return', 'x18-keys-buy']);
  const done = walk18(keys, ['x18-keys-keep', 'x18-dinner-terms', 'x18-home-julian', 'x18-name-adrian', 'x18-page-write', 'x18-term-door', 'x18-later-quiet']);
  expect([done.choices['end.position'], done.choices['end.keys'], done.choices['end.term']]).toEqual(['nell-none', 'keep', 'door']);
  expect(ch18(done)).toContain('I like it here. I chose it.');
  expect(ch18(done)).toContain('learn to cook');
  expect(ch18(done)).toContain('Holland Village, Nora’s kitchen');
  expect(ch18(done)).toContain('My name is Adrian Vale. I read everything twice now.');
});

it('the answer to WHAT DO I OWE HIM? follows the kept life, when she told him the truth already', () => {
  const told = (k: string) => walk18(withFlags(nellEighteen(), { 'exec.told13': 'before' }), ['begin-executive', 'x18-friday-sleep', 'x18-switch-armed', k, 'x18-dinner-quiet']);
  expect(ch18(told('x18-keys-keep'))).toContain('WHAT DO I OWE HIM? WHATEVER I CHOOSE.');
  expect(ch18(told('x18-keys-return'))).toContain('WHAT DO I OWE HIM? NOTHING.');
  expect(ch18(told('x18-keys-return'))).toContain('I know. That’s why.');
  expect(ch18(told('x18-keys-buy'))).toContain('send you an invoice');
  expect(ch18(told('x18-keys-buy'))).not.toContain('I was waiting to be told.');
});

it('the chosen night: offered only where it was chosen before, and stop is honoured', () => {
  const page = (flags: Record<string, string>) => walk18(withFlags(termEighteen(), flags), ['begin-executive', 'x18-friday-sleep', 'x18-switch-armed', 'x18-keys-none', 'x18-dinner-quiet', 'x18-home-julian', 'x18-name-new', 'x18-page-write', 'x18-term-files', 'x18-later-invite']);
  expect(ids18(page({}))).not.toContain('x18-later-sex');
  const warm = page({ 'c6.friction-julian': 'warmed' });
  expect(ids18(warm)).toEqual(['x18-later-no-sex', 'x18-later-sex', 'x18-later-goodnight']);
  const stopped = walk18(warm, ['x18-later-sex', 'x18-later-stop']);
  expect([stopped.choices['end.consent'], stopped.choices['end.later']]).toEqual(['sex', 'stop']);
  expect(ch18(stopped)).toContain('he stops at once');
  const faded = walk18(warm, ['x18-later-sex', 'x18-later-close']);
  expect(ch18(faded)).toContain('The scene fades.');
  expect(ch18(walk18(warm, ['x18-later-goodnight']))).toContain('he says “Saturday,” and goes');
});
