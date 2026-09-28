import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter14Choices } from '../../src/content/chapter14';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER14_CHOOSE';
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

type Build = { terms?: string[]; key?: string; ch8: string[]; flags?: Record<string, string> };
/** A real save (the maximal-julian golden) through Chapter 6 on the Julian workroom, Executive Chapters 7 and 8, and the
 * Chapter 9 bridge, to its end. `flags` stand in for the planned Executive Chapter 10–13 keys (not replayable). */
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
  if (b.flags) s = Object.assign(structuredClone(s), { choices: { ...s.choices, ...b.flags } });
  return s;
}

/** Ch8: holds his diary, puts her name on the paper, takes the car once, civil with Sloane, tells him about 14.3. */
const TRUSTED8 = ['x8-light-on', 'x8-fav-diary', 'x8-diary-hold', 'x8-fav-paper', 'x8-paper-mine', 'x8-fav-car', 'x8-car-once', 'x8-sloane-civil', 'x8-file-tell', 'x8-late-alone'];
/** Ch8: takes the car, the card and the call; cold with Sloane; keeps a copy of page thirty-one. */
const KEPT8 = ['x8-light-off', 'x8-fav-car', 'x8-car-take', 'x8-fav-card', 'x8-card-take', 'x8-fav-fixer', 'x8-fixer-take', 'x8-sloane-cold', 'x8-file-keep', 'x8-late-alone'];

it('bridges from the Executive Chapter 9 to The Signature while Chapters 10–13 are in development', () => {
  const s = toBridge({ ch8: TRUSTED8 });
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(chapter10Choices(s)).toEqual([]);
  expect(ids(s)).toEqual(['begin-executive']);
  const called = c14(s, 'begin-executive');
  expect(called.phase).toBe('called');
  expect(text(called)).toContain('[Chapters 10–13 · executive road — in development]');
  expect(text(called)).toContain('L.S.F. Advisory has invoked clause 14.3.');
  expect(text(called)).toContain('You told me. Months ago, on the phone at midnight');
  const silence = c14(called, 'x14-to-him');
  expect(text(silence)).toContain('Ask him to go quietly on Friday');
  expect(text(silence)).not.toContain('Thank you for his calendar');
});

it('enforces the term with him: everything told, the board strikes 14.3, Sloane rides along, and it authenticates', () => {
  const ways = walk14(toBridge({ ch8: TRUSTED8 }), ['begin-executive', 'x14-to-file', 'x14-celeste-think', 'x14-truth-all']);
  expect(text(ways)).toContain('Were you ever ordered to love me?');
  expect(text(ways)).toContain('No. Never. Not once.');
  expect(ids(ways)).toEqual(['x14-way-enforce', 'x14-way-spend', 'x14-way-fall']);
  const board = walk14(ways, ['x14-way-enforce', 'x14-tie-go']);
  expect(board.choices['c14.answer']).toBe('countered');
  expect(text(board)).toContain('you take it out of his hands and do it yourself');
  expect(ids(board)).toEqual(['x14-sloane-accept', 'x14-sloane-refuse']);
  const night = c14(board, 'x14-sloane-accept');
  expect(text(night)).toContain('I signed this eleven times without reading it.');
  expect(text(night)).toContain('“Not until I understand it,”');
  expect(text(night)).toContain('Axiom was never told either.');
  expect(text(night)).toContain('We shall talk after my board meets.');
  expect(night.choices['act3.sloane']).toBe('allied');
  expect(ids(night)).toEqual(['x14-box-word', 'x14-box-hand', 'x14-box-silence']);
  const scope = c14(night, 'x14-night-julian');
  expect(ids(scope)).toEqual(['x14-julian-no-sex', 'x14-leave']);
  const done = walk14(scope, ['x14-julian-no-sex', 'x14-stay']);
  expect(done.facts).toContain('c14.x-evening-consent');
  expect(text(done)).toContain('THE SIGNATURE. HIS, STRUCK. WITH HIM.');
  expect(text(done)).toContain('THE VESPER. HIS CREDENTIALS. HE COMES. SLOANE’S FILE TOO.');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('spends her status for him: the kept ledger comes due honestly, and Adrian’s name is the price', () => {
  const ways = walk14(toBridge({ key: 'key-accept', ch8: KEPT8 }), ['begin-executive', 'x14-to-window', 'x14-celeste-doubt', 'x14-truth-order']);
  expect(ids(ways)).toEqual(['x14-way-spend', 'x14-way-fall']);
  expect(text(ways)).toContain('He doesn’t know what you know.');
  const board = walk14(ways, ['x14-way-spend', 'x14-tie-go']);
  expect(ids(board)).toEqual(['x14-board-go']);
  const night = c14(board, 'x14-board-go');
  expect(night.choices['c14.answer']).toBe('refused');
  expect(text(night)).toContain('I read every one of those facilities, by right');
  expect(text(night)).toContain('with references unreserved, as your contract says');
  expect(text(night)).toContain('Axiom will have his name by Saturday.');
  const done = c14(night, 'x14-night-alone');
  expect(text(done)).toContain('The Monday after.');
  expect(text(done)).toContain('You put it in an envelope and walk it down yourself.');
  expect(text(done)).toContain('Hal drives you home one last time');
  expect(text(done)).toContain('The black card is cancelled on Monday.');
  expect(text(done)).toContain('THE SIGNATURE. MINE, SPENT. HE STAYS.');
  expect(text(done)).toContain('Now I find out which lines were mine.');
  expect(text(done)).toContain('HIS APPOINTMENT CARD.');
});

it('lets him fall and keeps the room: told nothing, he goes because she asked, and there is no way in but hers', () => {
  const ways = walk14(toBridge({ key: 'key-accept', ch8: KEPT8 }), ['begin-executive', 'x14-to-him', 'x14-celeste-silent', 'x14-truth-none']);
  const board = c14(ways, 'x14-way-fall');
  expect(board.choices['c14.answer']).toBe('complied');
  expect(text(board)).toContain('and says “All right,”');
  const night = c14(board, 'x14-board-go');
  expect(text(night)).toContain('Nobody had to be unkind.');
  const evening = c14(night, 'x14-box-silence');
  expect(ids(evening)).not.toContain('x14-night-julian');
  const done = c14(evening, 'x14-night-alone');
  expect(text(done)).toContain('Marcus’s facilities now');
  expect(text(done)).toContain('Hal is Marcus’s driver now.');
  expect(text(done)).toContain('THE SIGNATURE. HIS, SILENT. I KEPT THE ROOM.');
  expect(text(done)).toContain('THE VESPER. NO WAY IN BUT MINE.');
});

it('reads the planned Chapter 10–13 keys: the Vesper signature, the calendar, and trust from Singapore', () => {
  const flags = { 'exec.sign11': 'signed', 'exec.calendar': 'gave' };
  const called = c14(toBridge({ ch8: KEPT8, flags }), 'begin-executive');
  expect(text(called)).toContain('the Vesper deal failed');
  const silence = c14(called, 'x14-to-him');
  expect(text(silence)).toContain('Thank you for his calendar');
  const ways = walk14(silence, ['x14-celeste-think', 'x14-truth-all']);
  expect(text(ways)).toContain('The Vesper, the good pen, and whose hand was on his shoulder.');
  // Trust from Ch8 alone is too thin to enforce, even with everything told …
  expect(ids(ways)).toEqual(['x14-way-spend', 'x14-way-fall']);
  // … but telling him who she is in Singapore tips it.
  const told = walk14(c14(toBridge({ ch8: KEPT8, flags: { ...flags, 'exec.told12': 'told' } }), 'begin-executive'), ['x14-to-him', 'x14-celeste-think', 'x14-truth-all']);
  expect(ids(told)).toEqual(['x14-way-enforce', 'x14-way-spend', 'x14-way-fall']);
  const night = walk14(told, ['x14-way-enforce', 'x14-board-go']);
  expect(text(night)).toContain('whose hand was on his shoulder at the Vesper');
  expect(text(night)).toContain('page thirty-one, photographed at twenty to midnight');
});

it('deepening: Marcus’s offer, the tie, and the box are moments of their own, each with a neutral pick', () => {
  const truth = walk14(toBridge({ ch8: TRUSTED8 }), ['begin-executive', 'x14-to-him', 'x14-celeste-think']);
  expect(text(truth)).toContain('Come and work for me after.');
  expect(ids(truth)).toEqual(['x14-marcus-no', 'x14-marcus-maybe', 'x14-marcus-quiet']);
  const flat = once14(truth, 'x14-marcus-maybe');
  expect(text(flat)).toContain('Ask me again on Friday afternoon');
  expect(ids(flat)).toEqual(['x14-truth-all', 'x14-truth-order', 'x14-truth-none']);
  const tie = walk14(flat, ['x14-truth-order', 'x14-way-fall']);
  expect(tie.phase).toBe('ways');
  expect(ids(tie)).toEqual(['x14-tie-rehearse', 'x14-tie-kiss', 'x14-tie-go']);
  const board = once14(tie, 'x14-tie-rehearse');
  expect(text(board)).toContain('You know I’m not going to answer any of them tomorrow.');
  const night = once14(board, 'x14-sloane-refuse');
  expect(text(night)).toContain('Eleven years, and it fits in six boxes.');
  const evening = once14(night, 'x14-box-word');
  expect(text(evening)).toContain('It’s a longer story than a box');
  expect(ids(evening)).toContain('x14-night-julian');
  const done = once14(evening, 'x14-night-alone');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('deepening: the box by way (Marcus in the lift; her own box carried down), and a kiss at the window', () => {
  const lift = walk14(toBridge({ ch8: TRUSTED8 }), ['begin-executive', 'x14-to-file', 'x14-celeste-think', 'x14-truth-all', 'x14-way-enforce', 'x14-tie-kiss']);
  expect(text(lift)).toContain('as if he were signing something he had read twice');
  const marcus = once14(lift, 'x14-sloane-refuse');
  expect(text(marcus)).toContain('She’ll do this to you one day.');
  expect(text(once14(marcus, 'x14-box-hand'))).toContain('on his own feet');
  const spent = walk14(toBridge({ key: 'key-accept', ch8: KEPT8 }), ['begin-executive', 'x14-to-him', 'x14-celeste-silent', 'x14-truth-none', 'x14-way-spend', 'x14-board-go']);
  expect(text(spent)).toContain('It’s the only thing today I get to do for you.');
  expect(text(once14(spent, 'x14-box-hand'))).toContain('like two people moving house');
});
