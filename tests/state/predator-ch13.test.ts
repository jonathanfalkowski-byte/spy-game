import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter13Choices, fadeCoercion13 } from '../../src/content/chapter13';
import { P_COMPLY_OPENING13, P_FADED_LEAD13 } from '../../src/content/chapter13-predator';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER13_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
const c13 = (s: GameState, id: string) => choose(s, 'CHAPTER13_CHOOSE', 'chapter13.' + id);
/** The deepening pass's week stands between Delphine and midnight: take its neutral pick when it is in the way. */
const NEUTRAL13 = ['week-alone'];
const walk13 = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL13.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c13(y, n);
    }
    return c13(y, id);
  }, s);

/** A real save (the maximal-julian golden) played through Chapter 6 into Predator, Chapters 7 and 8, and the Chapter 9
 * bridge, to Chapter 13's temporary entry. `ch8` picks the levers (the counter needs something built). */
function toMirror(ch8: string[] = ['pull-hollis', 'hollis-hold', 'pull-counsel', 'counsel-hold'], flags: Record<string, string> = {}) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  for (const id of ['begin', 'route-confirm', 'car-quiet', 'view-sit', 'want-money', 'clause-access', 'clause-report', 'clause-private', 'julian-truth', 'lever-read', 'visit-busy', 'offer-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  for (const id of ['begin-predator', 'weeks-begin', ...ch8, 'night-home', 'friday-lie', 'julian8-thank', 'p8-evening-alone']) s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  // The shared bridge, on its quiet picks.
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  if (Object.keys(flags).length) {
    s = structuredClone(s);
    Object.assign(s.choices, flags);
  }
  return s;
}

it('enters from the Predator Chapter 9 through the winter, with the content notice', () => {
  const s = toMirror();
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(chapter13Choices(s).map((c) => c.id)).toEqual(['chapter13.begin-predator']);
  expect(chapter13Choices(s)[0].hint).toContain('sexual coercion (implied, never shown)');
  const reading = c13(s, 'begin-predator');
  expect(reading.phase).toBe('reading');
  expect(text(reading)).toContain('It is the first time she has ever written to you directly.');
  expect(text(reading)).toContain('D. · Eighteen months · Available.');
  expect(text(reading)).toContain('I thought the new one might like to learn how it is done.');
});

it('lets her meet Delphine, and ask her name or whether she wants it, never lean on her', () => {
  const del = walk13(toMirror(), ['begin-predator', 'reading-page']);
  expect(text(del)).toContain('twenty-nine, eighteen months into somebody else’s name');
  expect(ids(del)).toEqual(['delphine-name', 'delphine-want', 'delphine-work']);
  expect(text(c13(del, 'delphine-name'))).toContain('They have my mother’s house.');
  const week = c13(del, 'delphine-want');
  expect(text(week)).toContain('No. But I will.');
  expect(text(week)).toContain('a postcard of a hospital in Leeds');
  // The week between Delphine and midnight (deepening pass): Julian is offered as an ally from Ch7.
  expect(ids(week)).toEqual(['week-marcus', 'week-julian', 'week-alone']);
  expect(text(c13(week, 'week-marcus'))).toContain('The ones who do it badly are the ones she keeps.');
  expect(text(c13(week, 'week-julian'))).toContain('You came here to take a company, not to become the thing that owns it.');
  expect(ids(walk13(toMirror(undefined, { 'c6.maya': 'restored' }), ['begin-predator', 'reading-page', 'delphine-work']))).toContain('week-maya');
  const mid = c13(week, 'week-alone');
  // Nothing built to spend: comply or refuse only. There is never an option to pressure her.
  expect(ids(mid)).toEqual(['mirror-comply', 'mirror-refuse']);
  expect(ids(walk13(toMirror(['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-hold']), ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone']))).toEqual(['mirror-comply', 'mirror-refuse', 'mirror-turn', 'mirror-free']);
});

it('runs it by the book on comply, cuts at the door, shows nothing, and fades on request', () => {
  const monitor = walk13(toMirror(), ['begin-predator', 'reading-silent', 'delphine-work', 'mirror-comply']);
  expect([monitor.phase, monitor.choices['pred.mirror']]).toEqual(['monitor', 'complied']);
  const lead = monitor.history.at(-1)!.blocks;
  expect(lead[0].text).toBe(P_COMPLY_OPENING13);
  expect(ids(monitor)).toEqual(['feed-cut', 'feed-rule']);
  const faded = fadeCoercion13(lead);
  expect(faded[0]).toEqual({ kind: 'notice', text: P_FADED_LEAD13 });
  expect(faded.map((b) => b.text).join(' ')).toContain('two figures walk toward the door of 1109');
  const cut = c13(monitor, 'feed-cut');
  expect(text(cut)).toContain('all four screens go black at once');
  const done = walk13(cut, ['late-card', 'friday-end']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter13.ledger');
  expect(text(done)).toContain('DELPHINE (ANA). THURSDAY. 1109. I SENT HER.');
  expect(text(done)).toContain('Beautifully run, darling.');
  // The recovery step after the comply night (deepening pass).
  expect(text(done)).toContain('FOR THE DAY IT CAN BE USED');
  const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|kiss\w*|moan\w*|sex\w*|nipples?|arous\w*|lust\w*|orgasm\w*)\b/i;
  expect(done.history.filter((h) => h.node.startsWith('chapter13.')).flatMap((h) => h.blocks.map((b) => b.text)).join(' ')).not.toMatch(SEXUAL);
});

it('makes refusal cost her standing, not a person', () => {
  const done = walk13(toMirror(), ['begin-predator', 'reading-ask', 'delphine-work', 'mirror-refuse', 'night-wait', 'late-on', 'friday-end']);
  expect([done.choices['pred.standing'], done.choices['pred.delphine']]).toEqual(['fallen', 'placed-by-another']);
  expect(text(done)).toContain('Pity. I did so hope.');
  expect(text(done)).toContain('Marcus has been told why the Stuttgart deal is going to somebody else.');
  expect(text(done)).toContain('SOMEBODY ELSE SENT HER. I LET THEM.');
});

it('turns Marsh or frees Ana, spending what she built, and authenticates', () => {
  const at = walk13(toMirror(['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-hold']), ['begin-predator', 'reading-silent', 'delphine-name']);
  const turned = walk13(at, ['mirror-turn', 'turn-watch', 'late-on', 'friday-end']);
  expect([turned.choices['pred.spent'], turned.choices['pred.ally.marsh']]).toEqual(['hollis', 'in']);
  expect(text(turned)).toContain('On the monitor all night there is only a woman asleep in a lamp-lit room.');
  expect(text(turned)).toContain('Thank you. When you need the Markets Authority, ring me. — O.M.');
  const before = Number(at.choices['own.cash'] ?? 0);
  const freed = walk13(at, ['mirror-free', 'free-name', 'late-on', 'friday-end']);
  expect(freed.choices['pred.delphine']).toBe('free');
  expect(Number(freed.choices['own.cash'])).toBe(before - Math.min(before, 1500));
  expect(text(freed)).toContain('Ana Petrovic. From Leeds, of all places. I was a nurse.');
  expect(text(freed)).toContain('ANA. ON A TRAIN.');
  expect(replay(freed.ledger, 19)).toEqual(freed);
  expect(decodeSave(encodeSave(freed))).toEqual(freed);
});
