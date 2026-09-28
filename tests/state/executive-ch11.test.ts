import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter11Choices } from '../../src/content/chapter11';
import { chapter14Choices } from '../../src/content/chapter14';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER14_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
const c11 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER11_CHOOSE', id: 'chapter11.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk11 = (s: GameState, path: string[]) => path.reduce(c11, s);

type Build = { key?: string; ch8: string[]; ch10?: string[] };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, the
 * Chapter 9 bridge and Executive Chapter 10, to the start of The Good Pen. */
function toEleven(b: Build) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-narrow') ? 'expect-narrow' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.begin');
  s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + (deriveRoute6(s)?.lane === 'executive' ? 'route-confirm' : 'route-pivot-executive'));
  for (const id of ['arrive-ontime', 'breakfast-quiet', 'safe-writing', 'photo-leave', 'term-door', 'term-firewall', 'term-files', 'marcus-answer', 'lift-thank', b.key ?? 'key-decline', 'x-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  const ids8 = (x: GameState) => chapter8Choices(x).map((c) => c.id.replace(/^chapter8\./, ''));
  for (const id of ['begin-executive', ...b.ch8]) {
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
  return s;
}

/** Ch8: told him about 14.3 (he stopped signing). */
const TOLD8 = ['x8-light-on', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-mine', 'x8-fav-car', 'x8-car-once', 'x8-sloane-civil', 'x8-file-tell', 'x8-late-alone'];
/** Ch8: took the car, the card and the call; kept a copy of page thirty-one (he still signs what Marcus brings). */
const KEPT8 = ['x8-light-off', 'x8-fav-car', 'x8-car-take', 'x8-fav-card', 'x8-card-take', 'x8-fav-fixer', 'x8-fixer-take', 'x8-sloane-cold', 'x8-file-keep', 'x8-late-alone'];
/** Ch10: gave his calendar. */
const GAVE10 = ['x10-go', 'x10-eve-sleep', 'x10-adrian-composed', 'x10-calendar-give', 'x10-after-desk', 'x10-paper-quiet', 'x10-midweek-hand', 'x10-week-yes', 'x10-night-alone'];

it('enters The Good Pen from the Executive Chapter 10: the empty frames, on his arm', () => {
  const s = toEleven({ ch8: TOLD8, ch10: GAVE10 });
  expect(`${s.scene}.${s.phase}`).toBe('chapter10.complete');
  expect(ids(s)).toEqual(['begin-executive']);
  expect(chapter14Choices(s)).toEqual([]);
  const frames = c11(s, 'begin-executive');
  expect(frames.phase).toBe('frames');
  expect(text(frames)).toContain('Like something I’d have to read twice.');
  expect(text(frames)).toContain('he offers you his arm without thinking');
  expect(text(frames)).toContain('You’ve been such a help.');
  expect(text(frames)).toContain('Availability. Placement.');
  expect(ids(frames)).toEqual(['x11-room-stay', 'x11-room-work', 'x11-room-watch']);
});

it('signs: Iris warned, the book shown, the good pen and her hand on his shoulder; it authenticates, and Ch14 remembers', () => {
  const pages = walk11(toEleven({ ch8: TOLD8, ch10: GAVE10 }), ['begin-executive', 'x11-room-work']);
  expect(text(pages)).toContain('the autumn collection is in the anteroom tonight');
  expect(ids(pages)).toEqual(['x11-iris-warn', 'x11-iris-kin', 'x11-iris-quiet']);
  const book = c11(pages, 'x11-iris-warn');
  expect(text(book)).toContain('AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH');
  expect(ids(book)).toEqual(['x11-book-show', 'x11-book-close', 'x11-book-turn']);
  const pen = c11(book, 'x11-book-show');
  expect(pen.choices['exec.book11']).toBe('show');
  expect(text(pen)).toContain('He signs what you bring him now, darling. Everybody’s noticed.');
  expect(text(pen)).toContain('He hasn’t signed anything of ours since the spring. He’ll sign this. For you.');
  const signing = c11(pen, 'x11-pen-sign');
  expect(signing.choices['exec.sign11']).toBe('signed');
  expect(signing.facts).toContain('c11.x-order');
  expect(text(signing)).toContain('If you’ve read it, that’s enough for me.');
  expect(text(signing)).toContain('He stopped at eleven for me, and started again for me.');
  const drive = c11(signing, 'x11-signing-go');
  expect(drive.choices['exec.celeste11']).toBe('pleased');
  expect(text(drive)).toContain('What was that place?');
  const night = c11(drive, 'x11-drive-shop');
  expect(night.facts).toContain('c11.x-singapore');
  expect(text(night)).toContain('Helix has a thing in Singapore next month.');
  const done = walk11(night, ['x11-night-julian', 'x11-julian-no-sex', 'x11-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter11.complete');
  expect(text(done)).toContain('THE GOOD PEN: HIS. MY HAND ON HIS SHOULDER.');
  expect(text(done)).toContain('IRIS. THROUGH THE KITCHENS.');
  expect(text(done)).toContain('SINGAPORE');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  const called = choose(done, 'CHAPTER14_CHOOSE', 'chapter14.begin-executive');
  expect(text(called)).toContain('[Chapters 12–13 · executive road — in development]');
  expect(text(called)).toContain('the Vesper deal failed');
});

it('warns: "Not tonight, Marcus. I read things now." Celeste wonders where he learned it', () => {
  const done = walk11(toEleven({ ch8: KEPT8 }), ['begin-executive', 'x11-room-stay', 'x11-iris-kin', 'x11-book-close', 'x11-pen-warn', 'x11-signing-go', 'x11-drive-singapore', 'x11-night-alone']);
  expect(done.choices['exec.sign11']).toBe('warned');
  expect(done.choices['exec.celeste11']).toBe('suspects');
  expect(text(done)).toContain('Pity about Gdańsk.');
  expect(text(done)).toContain('Then you’ll know how it ends.');
  expect(text(done)).toContain('Not tonight, Marcus. I read things now.');
  expect(text(done)).toContain('He’s learned to say no. I wonder where.');
  expect(text(done)).toContain('You said to ask you why in the car.');
  expect(text(done)).toContain('THE GOOD PEN: NOT TONIGHT. HE READS THINGS NOW.');
  const called = choose(done, 'CHAPTER14_CHOOSE', 'chapter14.begin-executive');
  expect(text(called)).toContain('You warned me at the Vesper. I didn’t sign.');
});

it('refuses: Marcus brings it, he signs it as he always has, and Halvorsen walks on Monday', () => {
  const done = walk11(toEleven({ ch8: KEPT8 }), ['begin-executive', 'x11-room-watch', 'x11-iris-quiet', 'x11-book-turn', 'x11-pen-refuse', 'x11-signing-go', 'x11-drive-party', 'x11-night-alone']);
  expect(done.choices['exec.sign11']).toBe('refused');
  expect(done.choices['exec.cost11']).toBe('halvorsen');
  expect(text(done)).toContain('Julian signs it, the way he has signed everything Marcus has ever brought him');
  expect(text(done)).toContain('forty million a year');
  expect(text(done)).toContain('THE GOOD PEN: MARCUS’S. HALVORSEN, FORTY MILLION, MONDAY.');
});

it('refuses after he stopped signing: he turns Marcus down himself', () => {
  const signing = walk11(toEleven({ ch8: TOLD8 }), ['begin-executive', 'x11-room-watch', 'x11-iris-quiet', 'x11-book-turn', 'x11-pen-refuse']);
  expect(text(signing)).toContain('Put it on my tray and I’ll read it on Monday.');
});
