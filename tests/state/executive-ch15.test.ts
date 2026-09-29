import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter13Choices } from '../../src/content/chapter13';
import { chapter14Choices } from '../../src/content/chapter14';
import { chapter15Choices } from '../../src/content/chapter15';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
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
const c15 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids15(s).join(', '));
  return next;
};
const walk15 = (s: GameState, path: string[]) => path.reduce(c15, s);

/** Ch14 ways, played to the end of The Signature. */
const ENFORCE14 = ['begin-executive', 'x14-to-file', 'x14-celeste-think', 'x14-truth-all', 'x14-way-enforce', 'x14-sloane-accept', 'x14-night-alone'];
const SPEND14 = ['begin-executive', 'x14-to-window', 'x14-celeste-doubt', 'x14-truth-order', 'x14-way-spend', 'x14-board-go', 'x14-night-alone'];
const FALL14 = ['begin-executive', 'x14-to-him', 'x14-celeste-silent', 'x14-truth-none', 'x14-way-fall', 'x14-board-go', 'x14-night-alone'];
const toFifteen = (b: Build, ch14: string[]) => walk14(toBridge(b), ch14);

it('enters By Appointment from the Executive Chapter 14; Ch14 no longer says Chapter 15 is in development', () => {
  const s = toFifteen({ ch8: TRUSTED8 }, ENFORCE14);
  expect(`${s.scene}.${s.phase}`).toBe('chapter14.complete');
  expect(text(s)).not.toContain('[Chapter 15 · executive road — in development]');
  expect(ids15(s)).toEqual(['begin-executive']);
  const allies = c15(s, 'begin-executive');
  expect(allies.phase).toBe('allies');
  expect(text(allies)).toContain('Clients may review their own records there, by appointment.');
  expect(ids15(allies)).toContain('x15-ally-julian');
  expect(ids15(allies)).toContain('x15-ally-sloane');
  expect(ids15(allies)).toContain('x15-allies-none');
});

it('by appointment, with Julian: his drawer, "She’s right about the first part", and he goes on the record; it authenticates', () => {
  const entry = walk15(toFifteen({ ch8: TRUSTED8 }, ENFORCE14), ['begin-executive', 'x15-ally-julian', 'x15-allies-done']);
  expect(entry.phase).toBe('entry');
  expect(ids15(entry)).toEqual(['x15-way-appointment', 'x15-way-invited']);
  const snag = c15(entry, 'x15-way-appointment');
  expect(text(snag)).toContain('Julian. Darling. Nobody told me you were coming.');
  expect(ids15(snag)).toEqual(['x15-snag-talk', 'x15-snag-hide', 'x15-snag-bold']);
  const stacks = c15(snag, 'x15-snag-talk');
  expect(text(stacks)).toContain('Collateral, in the person of J.M. Kind. Will not survive us.');
  expect(text(stacks)).toContain('She’s right about the first part.');
  expect(text(stacks)).toContain('Sloane’s file, as promised');
  const holds = c15(stacks, 'x15-took-nell');
  expect(holds.facts).toContain('c15.x-julian-file');
  expect(text(holds)).toContain('Sloane');
  const last = c15(holds, 'x15-cost-julian');
  expect(last.choices['act3.leash']).toBe('broken');
  expect(last.choices['c15.cost']).toBe('relationship');
  expect(text(last)).toContain('It’s the first thing about Helix I’ll have done entirely on purpose.');
  expect(text(last)).toContain('I shall be there as myself.');
  const done = walk15(last, ['x15-phone-keep', 'x15-night-julian', 'x15-julian-no-sex', 'x15-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter15.complete');
  expect(done.choices['act3.black-phone']).toBe('keep');
  expect(done.facts).toContain('c15.x-evening-consent');
  expect(text(done)).toContain('THE BOARD MEETS.');
  expect(text(done)).toContain('[Chapters 16–18 · executive road — in development]');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('on his card, alone: Hal answers Helix’s phone, Adrian’s file defuses Axiom, and she walks out of everything that was his', () => {
  const entry = walk15(toFifteen({ key: 'key-accept', ch8: KEPT8 }, SPEND14), ['begin-executive', 'x15-allies-none']);
  expect(ids15(entry)).toEqual(['x15-way-card', 'x15-way-invited']);
  const stacks = walk15(entry, ['x15-way-card', 'x15-snag-talk']);
  expect(text(stacks)).toContain('Hal answers the phone at Helix.');
  expect(text(stacks)).toContain('I’ll decide later whether he ever reads it.');
  const holds = c15(stacks, 'x15-took-adrian');
  expect(text(holds)).toContain('stands his people down');
  expect(ids15(holds)).toContain('x15-cost-kept');
  const done = walk15(holds, ['x15-cost-kept', 'x15-phone-river', 'x15-night-alone']);
  expect(done.choices['exec.cost15']).toBe('kept');
  expect(text(done)).toContain('I know. That’s why.');
  expect(text(done)).toContain('an answer: NOTHING.');
});

it('by her own way: Hal drives, the meeting she asked for is the cover, and the 1109 safe', () => {
  const allies = walk15(toFifteen({ ch8: KEPT8 }, FALL14), ['begin-executive']);
  expect(ids15(allies)).not.toContain('x15-ally-julian');
  const entry = walk15(allies, ['x15-ally-hal', 'x15-allies-done']);
  expect(ids15(entry)).toEqual(['x15-way-invited']);
  const stacks = walk15(entry, ['x15-way-invited', 'x15-snag-bold']);
  expect(text(stacks)).toContain('She is already there, at nine forty');
  expect(ids15(stacks)).toContain('x15-took-cards');
  const done = walk15(stacks, ['x15-took-cards', 'x15-cost-money', 'x15-phone-return', 'x15-night-alone']);
  expect(done.choices['exec.took15']).toBe('cards');
  expect(text(done)).toContain('Broke, and free.');
  expect(text(done)).toContain('THE BOARD MEETS.');
});
