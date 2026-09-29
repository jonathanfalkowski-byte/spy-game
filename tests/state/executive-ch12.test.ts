import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter12Choices } from '../../src/content/chapter12';
import { chapter14Choices } from '../../src/content/chapter14';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER11_CHOOSE' | 'CHAPTER14_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
const once12 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER12_CHOOSE', id: 'chapter12.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
/** The deepening pass's moments (the first evening, the morning after Ashby, Sunday afternoon): the neutral pick when in the way. */
const NEUTRAL12 = ['x12-evening-hotel', 'x12-morning-errands', 'x12-afternoon-sleep'];
const c12 = (s: GameState, id: string) => {
  let y = s;
  for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
    const n = NEUTRAL12.find((d) => ids(y).includes(d));
    if (!n) break;
    y = once12(y, n);
  }
  return once12(y, id);
};
const walk12 = (s: GameState, path: string[]) => path.reduce(c12, s);

type Build = { key?: string; ch8: string[]; ch10?: string[]; ch11?: string[] };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, the
 * Chapter 9 bridge and Executive Chapters 10 and 11, to the start of Whose Face. */
function toTwelve(b: Build) {
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
  for (const id of ['begin-executive', ...(b.ch11 ?? ['x11-room-watch', 'x11-dance-no', 'x11-iris-quiet', 'x11-book-turn', 'x11-corridor-quiet', 'x11-pen-refuse', 'x11-signing-go', 'x11-drive-party', 'x11-night-alone'])])
    s = choose(s, 'CHAPTER11_CHOOSE', 'chapter11.' + id);
  return s;
}

/** Ch8: told him about 14.3 (he stopped signing). */
const TOLD8 = ['x8-light-on', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-mine', 'x8-fav-car', 'x8-car-once', 'x8-sloane-civil', 'x8-file-tell', 'x8-late-alone'];
/** Ch8: took the car, the card and the call; kept a copy of page thirty-one (he still signs what Marcus brings). */
const KEPT8 = ['x8-light-off', 'x8-fav-car', 'x8-car-take', 'x8-fav-card', 'x8-card-take', 'x8-fav-fixer', 'x8-fixer-take', 'x8-sloane-cold', 'x8-file-keep', 'x8-late-alone'];
/** Ch10: gave his calendar. */
const GAVE10 = ['x10-go', 'x10-eve-sleep', 'x10-adrian-composed', 'x10-calendar-give', 'x10-after-desk', 'x10-paper-quiet', 'x10-midweek-hand', 'x10-week-yes', 'x10-night-alone'];

/** Ch11: warned Iris, showed him the book, brought him the pen, and took the first Evelynn's coat. */
const SIGNED11 = ['x11-room-work', 'x11-dance-julian', 'x11-iris-warn', 'x11-book-show', 'x11-corridor-quiet', 'x11-pen-sign', 'x11-coat-take', 'x11-drive-shop', 'x11-night-alone'];

it('enters Whose Face from the Executive Chapter 11: Changi, and Celeste already knows about Mrs Tan', () => {
  const s = toTwelve({ ch8: TOLD8, ch10: GAVE10, ch11: SIGNED11 });
  expect(`${s.scene}.${s.phase}`).toBe('chapter11.complete');
  expect(ids(s)).toEqual(['begin-executive']);
  expect(chapter14Choices(s)).toEqual([]);
  const changi = c12(s, 'begin-executive');
  expect(changi.phase).toBe('changi');
  expect(text(changi)).toContain('Do give my love to Mrs Tan.');
  expect(text(changi)).toContain('The evenings are yours if you want them, and mine if you’ll let me have them.');
  expect(text(changi)).toContain('The last journey on it ends at Somerset');
});

it('tells him who she is: Mrs Tan, the schedule, Ashby by Iris’s card, Nora and the cinnamon; it authenticates', () => {
  const tan = walk12(toTwelve({ ch8: TOLD8, ch10: GAVE10, ch11: SIGNED11 }), ['begin-executive', 'x12-changi-go']);
  expect(text(tan)).toContain('Evie! Evie.');
  expect(ids(tan)).toEqual(['x12-tan-evie', 'x12-tan-truth', 'x12-tan-listen']);
  const flat = walk12(tan, ['x12-tan-truth', 'x12-evening-hotel']);
  expect(text(flat)).toContain('No. You stand wrong.');
  expect(text(flat)).toContain('in your size, not hers');
  const caught = c12(flat, 'x12-search-desk');
  expect(caught.facts).toContain('c12.x-schedule');
  expect(text(caught)).toContain('Family contact (sister): N. Linden');
  expect(currentPlace(caught, 'x')).toBe('Emerald Hill · a key in the lock');
  const punkah = c12(caught, 'x12-caught-own');
  expect(text(punkah)).toContain('Colin Ashby. The Marlowe. Evenings. — I.');
  expect(ids(punkah)).toEqual(['x12-ashby-nell', 'x12-ashby-press', 'x12-ashby-truth']);
  const nora = c12(punkah, 'x12-ashby-press');
  expect(nora.facts).toContain('c12.x-ashby');
  expect(text(nora)).toContain('By being kind to him first.');
  expect(text(nora)).toContain('I was the kind part.');
  const suite = walk12(nora, ['x12-nora-truth', 'x12-afternoon-sleep']);
  expect(text(suite)).toContain('The cinnamon was hers. The black was always her friend’s.');
  expect(text(suite)).toContain('I have spent a year wondering how she knew.');
  expect(text(suite)).toContain('Does he know whose face he’s kissing?');
  expect(text(suite)).toContain('I know where he’ll be all week. You sent it.');
  expect(ids(suite)).toEqual(['x12-tell-told', 'x12-tell-partly', 'x12-tell-not']);
  const harbour = c12(suite, 'x12-tell-told');
  expect(harbour.choices['exec.told12']).toBe('told');
  expect(harbour.facts).toContain('c12.x-told');
  expect(text(harbour)).toContain('Is the woman who wrote her own terms into my contract real?');
  expect(ids(harbour)).toEqual(['x12-harbour-name', 'x12-harbour-photo', 'x12-harbour-quiet']);
  const night = c12(harbour, 'x12-harbour-photo');
  const done = walk12(night, ['x12-night-julian', 'x12-julian-no-sex', 'x12-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter12.complete');
  expect(done.facts).toContain('c12.x-evening-consent');
  expect(text(done)).toContain('NELL. ELEANOR LINDEN. “SHE HATED ORCHIDS.”');
  expect(text(done)).toContain('HE KNOWS WHO I AM. HE ASKED ONE QUESTION.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  // Chapter 14 (through its bridge while Chapter 13 is in development).
  vi.stubEnv('VITE_EVE_CHAPTER13', '0');
  const called = choose(done, 'CHAPTER14_CHOOSE', 'chapter14.begin-executive');
  expect(text(called)).toContain('[Chapter 13 · executive road — in development]');
});

it('tells him part of it: the caretaker’s number, no press without evidence, the kind lie to Nora', () => {
  const punkah = walk12(toTwelve({ ch8: KEPT8 }), ['begin-executive', 'x12-changi-go', 'x12-tan-evie', 'x12-search-balcony', 'x12-caught-evie']);
  expect(text(punkah)).toContain('The Marlowe, good evening.');
  expect(text(punkah)).toContain('It takes you one evening in the bar');
  expect(ids(punkah)).toEqual(['x12-ashby-nell', 'x12-ashby-truth']);
  const done = walk12(punkah, ['x12-ashby-truth', 'x12-nora-kind', 'x12-tell-partly', 'x12-harbour-name', 'x12-night-alone']);
  expect(done.choices['exec.told12']).toBe('partly');
  expect(text(done)).toContain('I’m not going anywhere.');
  expect(text(done)).toContain('HE KNOWS SOMEBODY IS SELLING ME.');
});

it('does not tell him: the wrong house, the photograph face down, and no photo at the harbour', () => {
  const suite = walk12(toTwelve({ ch8: KEPT8 }), ['begin-executive', 'x12-changi-go', 'x12-tan-listen', 'x12-search-wardrobe', 'x12-caught-hide', 'x12-ashby-nell', 'x12-nora-go']);
  expect(text(suite)).toContain('watching you go in her sister’s body');
  expect(suite.facts).not.toContain('c12.x-nora');
  const harbour = c12(suite, 'x12-tell-not');
  expect(ids(harbour)).toEqual(['x12-harbour-name', 'x12-harbour-quiet']);
  const done = walk12(harbour, ['x12-harbour-quiet', 'x12-night-alone']);
  expect(text(done)).toContain('HE DOESN’T KNOW. SHE COULD TELL HIM. SHE WON’T. I SHOULD.');
});

it('deepening: the first evening, the morning after Ashby, and Sunday afternoon, each with a neutral pick', () => {
  const tan = walk12(toTwelve({ ch8: TOLD8, ch10: GAVE10, ch11: SIGNED11 }), ['begin-executive', 'x12-changi-go', 'x12-tan-listen']);
  expect(tan.phase).toBe('tan');
  expect(ids(tan)).toEqual(['x12-evening-hawker', 'x12-evening-rain', 'x12-evening-hotel']);
  const flat = once12(tan, 'x12-evening-rain');
  expect(text(flat)).toContain('warm rain like a bath being emptied on you');
  expect(text(flat)).toContain('after midnight, while he sleeps');
  const morning = walk12(flat, ['x12-search-balcony', 'x12-caught-own', 'x12-ashby-truth']);
  expect(morning.phase).toBe('punkah');
  expect(ids(morning)).toEqual(['x12-morning-take', 'x12-morning-truthish', 'x12-morning-errands']);
  const nora = once12(morning, 'x12-morning-take');
  expect(nora.choices['exec.heard-evie']).toBe('yes');
  expect(text(nora)).toContain('Evie! And this is your man?');
  const afternoon = once12(nora, 'x12-nora-kind');
  expect(afternoon.phase).toBe('nora');
  expect(ids(afternoon)).toEqual(['x12-afternoon-opposite', 'x12-afternoon-pool', 'x12-afternoon-sleep']);
  const suite = once12(afternoon, 'x12-afternoon-opposite');
  expect(text(suite)).toContain('One chair, pulled up to the window, facing Number 9.');
  expect(text(suite)).toContain('Mrs Tan called you Evie. I didn’t ask. I’d like to be told.');
  const done = walk12(suite, ['x12-tell-told', 'x12-harbour-quiet', 'x12-night-alone']);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('deepening: chilli crab, and "To see where I used to live"', () => {
  const flat = walk12(toTwelve({ ch8: KEPT8 }), ['begin-executive', 'x12-changi-go', 'x12-tan-evie', 'x12-evening-hawker']);
  expect(text(flat)).toContain('going forward');
  const nora = walk12(flat, ['x12-search-wardrobe', 'x12-caught-hide', 'x12-ashby-nell', 'x12-morning-truthish']);
  expect(text(nora)).toContain('I didn’t know you’d lived here.');
  expect(text(nora)).toContain('Neither did I.');
});
