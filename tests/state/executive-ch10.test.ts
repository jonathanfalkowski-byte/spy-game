import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter14Choices } from '../../src/content/chapter14';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
const c10 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER10_CHOOSE', id: 'chapter10.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk10 = (s: GameState, path: string[]) => path.reduce(c10, s);

type Build = { key?: string; ch8: string[] };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, and the
 * Chapter 9 bridge, to the start of A Lovely Man. */
function toTen(b: Build) {
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
  return s;
}

/** Ch8: told him about 14.3, read Clare's notes, stayed on the office floor at two. */
const TOLD8 = ['x8-light-on', 'x8-clare-read', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-mine', 'x8-midnight-stay', 'x8-fav-car', 'x8-car-once', 'x8-sloane-civil', 'x8-file-tell', 'x8-late-alone'];
/** Ch8: took the car, the card and the call; kept a copy of page thirty-one. */
const KEPT8 = ['x8-light-off', 'x8-fav-car', 'x8-car-take', 'x8-fav-card', 'x8-card-take', 'x8-fav-fixer', 'x8-fixer-take', 'x8-sloane-cold', 'x8-file-keep', 'x8-late-alone'];

it('enters A Lovely Man from the Executive Chapter 9, not the Chapter 14 bridge: an orchid on her desk', () => {
  const s = toTen({ ch8: TOLD8 });
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(ids(s)).toEqual(['begin-executive']);
  expect(chapter14Choices(s)).toEqual([]);
  const orchid = c10(s, 'begin-executive');
  expect(orchid.phase).toBe('orchid');
  expect(text(orchid)).toContain('Breakfast? Wednesday. The Lindqvist, seven. — C.');
  expect(ids(orchid)).toEqual(['x10-go', 'x10-summon']);
});

it('gives his calendar: the inventory knows the tray he told, Clare and the floor at two; four seconds on Friday', () => {
  const lind = walk10(toTen({ ch8: TOLD8 }), ['begin-executive', 'x10-go']);
  expect(currentPlace(lind, 'x')).toBe('07:00 · The Lindqvist');
  expect(text(lind)).toContain('including those signed by the Group COO');
  expect(text(lind)).toContain('Somebody taught him to read.');
  expect(text(lind)).toContain('You found Clare’s folder.');
  expect(text(lind)).toContain('The cleaners talk.');
  expect(text(lind)).toContain('Eat your eggs, Adrian.');
  expect(ids(lind)).toEqual(['x10-adrian-composed', 'x10-adrian-ask', 'x10-adrian-walk']);
  const order = c10(lind, 'x10-adrian-ask');
  expect(text(order)).toContain('He’ll never survive us. Unless you help me.');
  expect(ids(order)).toEqual(['x10-calendar-give', 'x10-calendar-doctor', 'x10-calendar-refuse']);
  const paper = c10(order, 'x10-calendar-give');
  expect(paper.choices['exec.calendar']).toBe('gave');
  expect(paper.facts).toContain('c10.x-order');
  expect(text(paper)).toContain('You didn’t tell me you knew Celeste Laurent.');
  expect(text(paper)).toContain('He doesn’t say Laurent Sovereign Fund.');
  const week = c10(paper, 'x10-paper-work');
  expect(text(week)).toContain('it takes four seconds');
  expect(text(week)).toContain('— and do bring your chief of staff. C.L.');
  const night = c10(week, 'x10-week-yes');
  expect(night.facts).toContain('c10.x-vesper');
  const scope = c10(night, 'x10-night-julian');
  expect(text(scope)).toContain('the black phone buzzes once');
  expect(ids(scope)).toEqual(['x10-julian-no-sex', 'x10-leave']);
  const done = walk10(scope, ['x10-julian-no-sex', 'x10-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter10.complete');
  expect(text(done)).toContain('CELESTE LAURENT. “HE’S A LOVELY MAN.”');
  expect(text(done)).toContain('HIS CALENDAR: GIVEN. EVERY FRIDAY. FOUR SECONDS.');
  expect(chapter14Choices(done).map((c) => c.id)).toEqual(['chapter14.begin-executive']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('doctors his calendar: Celeste comes to forty-one, the kept copy stays secret, and Marcus waits outside the wrong room', () => {
  const lind = walk10(toTen({ key: 'key-accept', ch8: KEPT8 }), ['begin-executive', 'x10-summon']);
  expect(currentPlace(lind, 'x')).toBe('09:00 · Julian’s reception, forty-one');
  expect(text(lind)).toContain('You took his flat.');
  expect(text(lind)).toContain('She doesn’t know about page thirty-one.');
  expect(text(lind)).not.toContain('Somebody taught him to read.');
  const done = walk10(lind, ['x10-adrian-composed', 'x10-calendar-doctor', 'x10-paper-old', 'x10-week-yes', 'x10-night-alone']);
  expect(done.choices['exec.calendar']).toBe('doctored');
  expect(done.choices['exec.celeste10']).toBe('fooled');
  expect(text(done)).toContain('Marcus Chen is outside it, alone');
  expect(text(done)).toContain('HIS CALENDAR: DOCTORED. MARCUS OUTSIDE THE WRONG ROOM.');
});

it('refuses: she walks out, Julian pays with a week in Gdańsk, and Chapter 14 remembers breakfast', () => {
  const order = walk10(toTen({ ch8: KEPT8 }), ['begin-executive', 'x10-go', 'x10-adrian-walk']);
  expect(currentPlace(order, 'x')).toBe('07:50 · The Lindqvist, the door');
  expect(text(order)).toContain('One more thing, darling. It’s about him.');
  const done = walk10(order, ['x10-calendar-refuse', 'x10-paper-quiet', 'x10-week-yes', 'x10-night-alone']);
  expect(done.choices['exec.calendar']).toBe('refused');
  expect(text(done)).toContain('a shipping line in Gdańsk is called in early');
  expect(text(done)).toContain('That was a small one, darling. Friday?');
  expect(text(done)).toContain('HIS CALENDAR: REFUSED. GDAŃSK. HE NEVER KNEW.');
  const called = act(done, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.begin-executive' } as never);
  expect(text(called)).toContain('[Chapters 11–13 · executive road — in development]');
  const silence = act(called, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.x14-to-him' } as never);
  expect(text(silence)).toContain('I told you at breakfast, darling. He’s a lovely man.');
  expect(text(silence)).not.toContain('Thank you for his calendar');
});
