import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter13Choices, fadeCoercion13 } from '../../src/content/chapter13';
import { chapter14Choices } from '../../src/content/chapter14';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER11_CHOOSE' | 'CHAPTER12_CHOOSE' | 'CHAPTER14_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
const c13 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER13_CHOOSE', id: 'chapter13.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk13 = (s: GameState, path: string[]) => path.reduce(c13, s);

type Build = { key?: string; ch8: string[]; ch10?: string[]; ch11?: string[]; ch12?: string[] };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, the
 * Chapter 9 bridge and Executive Chapters 10, 11 and 12, to the start of Held. */
function toThirteen(b: Build) {
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
  for (const id of ['begin-executive', ...(b.ch12 ?? ['x12-changi-go', 'x12-tan-listen', 'x12-evening-hotel', 'x12-search-wardrobe', 'x12-caught-hide', 'x12-ashby-nell', 'x12-morning-errands', 'x12-nora-go', 'x12-afternoon-sleep', 'x12-tell-not', 'x12-harbour-quiet', 'x12-night-alone'])])
    s = choose(s, 'CHAPTER12_CHOOSE', 'chapter12.' + id);
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

/** Ch12: told him who she is. */
const TOLD12 = ['x12-changi-go', 'x12-tan-truth', 'x12-evening-hotel', 'x12-search-desk', 'x12-caught-own', 'x12-ashby-truth', 'x12-morning-errands', 'x12-nora-truth', 'x12-afternoon-sleep', 'x12-tell-told', 'x12-harbour-quiet', 'x12-night-alone'];
/** Ch11: warned Iris (she is free). */
const IRIS11 = ['x11-room-watch', 'x11-dance-no', 'x11-iris-warn', 'x11-book-turn', 'x11-corridor-quiet', 'x11-pen-refuse', 'x11-signing-go', 'x11-drive-party', 'x11-night-alone'];

it('enters Held from the Executive Chapter 12 with a content notice, and the brief names 14.3', () => {
  const s = toThirteen({ ch8: TOLD8, ch12: TOLD12 });
  expect(`${s.scene}.${s.phase}`).toBe('chapter12.complete');
  expect(ids(s)).toEqual(['begin-executive']);
  expect(chapter13Choices(s)[0].hint).toContain('Content notice: sexual coercion (implied, never shown)');
  expect(chapter14Choices(s)).toEqual([]);
  const placement = c13(s, 'begin-executive');
  expect(placement.phase).toBe('placement');
  expect(text(placement)).toContain('Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath.');
  expect(text(placement)).toContain('You’ve read page thirty-one.');
  expect(text(placement)).toContain('so, frankly, is Julian’s future.');
  expect(text(placement)).toContain('Helix’s audit committee has never seen the eleven signatures.');
});

it('complies, having told him before: the lobby, the cut at the door, the fade, held after; it authenticates', () => {
  const days = walk13(toThirteen({ ch8: TOLD8, ch12: TOLD12 }), ['begin-executive', 'x13-placement-go']);
  expect(text(days)).toContain('He is the only person in London doing his job.');
  expect(ids(days)).toEqual(['x13-tell-now', 'x13-tell-notyet']);
  const need = c13(days, 'x13-tell-now');
  expect(need.choices['exec.told13']).toBe('before');
  expect(text(need)).toContain('What do you need me to be on Thursday?');
  expect(text(need)).not.toContain('Adrian, and a clinic');
  expect(ids(need)).toEqual(['x13-need-lobby', 'x13-need-phone', 'x13-need-nowhere']);
  const wed = c13(need, 'x13-need-lobby');
  expect(ids(wed)).toEqual(['x13-answer-comply', 'x13-answer-refuse', 'x13-answer-turn']);
  const claremont = c13(wed, 'x13-answer-comply');
  expect(claremont.choices['exec.honeypot13']).toBe('complied');
  expect(text(claremont)).toContain('He is exactly where you asked him to be, and nowhere else.');
  expect(text(claremont)).toContain('Are you all right?');
  // The comply lead-in honours the reader's fade: presentation only.
  const lead = claremont.history.filter((h) => h.node === 'chapter13.claremont').at(-1)!.blocks;
  const faded = fadeCoercion13(lead);
  expect(faded[0].text).toContain('Faded, at your request');
  expect(faded[1].text).toContain('The corridor on the eleventh floor of the Claremont');
  expect(ids(claremont)).toEqual(['x13-door-look', 'x13-door-away']);
  const twoam = c13(claremont, 'x13-door-look');
  expect(text(twoam)).toContain('The door closes behind you.');
  expect(text(twoam)).toContain('Lovely. You see how easy it is.');
  expect(ids(twoam)).toEqual(['x13-recover-julian', 'x13-recover-wall', 'x13-recover-alone']);
  const sat = c13(twoam, 'x13-recover-julian');
  expect(text(sat)).toContain('Nothing else happens, and he does not ask for anything');
  expect(text(sat)).toContain('He has not left.');
  expect(ids(sat)).toEqual(['x13-saturday-on']);
  const done = c13(sat, 'x13-saturday-on');
  expect(`${done.scene}.${done.phase}`).toBe('chapter13.complete');
  expect(text(done)).toContain('You don’t owe me the details. You never will.');
  expect(text(done)).toContain('THURSDAY. HELD, AFTER.');
  expect(text(done)).toContain('HE KNEW. HE WAS WHERE I ASKED.');
  expect(chapter14Choices(done).map((c) => [c.id, c.label])).toEqual([['chapter14.begin-executive', 'Monday']]);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('refuses: nothing happens to her body; the audit committee gets his signatures; she tells him after', () => {
  const done = walk13(toThirteen({ ch8: KEPT8 }), ['begin-executive', 'x13-placement-go', 'x13-tell-notyet', 'x13-answer-refuse', 'x13-vigil-no', 'x13-twoam-on', 'x13-told-after']);
  expect(done.choices['exec.honeypot13']).toBe('refused');
  expect(done.choices['exec.told13']).toBe('after');
  expect(text(done)).toContain('He orders his second whisky at eleven. It isn’t too late, darling.');
  expect(text(done)).toContain('The Group COO signs what he does not read.');
  expect(text(done)).toContain('And, because none of it makes sense without it, the rest');
  expect(text(done)).toContain('Good. Let them come.');
  expect(text(done)).toContain('I SAID NO. HE PAID. HE SAID GOOD.');
  const called = choose(done, 'CHAPTER14_CHOOSE', 'chapter14.begin-executive');
  expect(text(called)).not.toContain('· executive road — in development]');
});

it('turns Marsh: a staged scene, both in on it; an ally, and in the gallery at the board', () => {
  const claremont = walk13(toThirteen({ ch8: KEPT8 }), ['begin-executive', 'x13-placement-go', 'x13-tell-notyet', 'x13-answer-turn']);
  expect(text(claremont)).toContain('page thirty-one, photographed on Julian’s tray');
  expect(text(claremont)).toContain('both of you in on it, both of you clothed');
  expect(text(claremont)).toContain('“Is this all right?”');
  const done = walk13(claremont, ['x13-thursday-on', 'x13-twoam-on', 'x13-told-never']);
  expect(done.choices['exec.marsh13']).toBe('ally');
  expect(done.facts).toContain('c13.x-marsh');
  expect(text(done)).toContain('OWEN MARSH. ALLY.');
  expect(text(done)).toContain('HE DOESN’T KNOW.');
});

it('swaps the card with Iris, when she is free', () => {
  const wed = walk13(toThirteen({ ch8: KEPT8, ch11: IRIS11 }), ['begin-executive', 'x13-placement-go', 'x13-tell-notyet']);
  expect(ids(wed)).toContain('x13-answer-swap');
  const done = walk13(wed, ['x13-answer-swap', 'x13-thursday-on', 'x13-twoam-on', 'x13-told-after']);
  expect(done.choices['exec.card13']).toBe('yes');
  expect(text(done)).toContain('Every one of them. Every placement they ever filmed in that room.');
  expect(text(done)).toContain('Then she’s frightened. Good.');
});
