import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter13Choices } from '../../src/content/chapter13';
import { chapter14Choices } from '../../src/content/chapter14';
import { boardOpen14, boardVotes14 } from '../../src/content/chapter14-predator';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER13_CHOOSE' | 'CHAPTER14_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
const c14 = (s: GameState, id: string) => choose(s, 'CHAPTER14_CHOOSE', 'chapter14.' + id);
const walk14 = (s: GameState, path: string[]) => path.reduce(c14, s);
const cash = (s: GameState) => Number(s.choices['own.cash'] ?? 0);

type Build = { julian?: 'truth' | 'lie' | 'past'; want?: 'money' | 'title' | 'desk'; clauses?: string[]; ch8?: string[]; night?: string; ch13?: string[] };
/** A real save (the maximal-julian golden) through Chapter 6, the Predator Chapters 7 and 8, the Chapter 9 bridge and
 * the Predator Chapter 13, to its ledger. */
function toLedger13(b: Build = {}) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  const clauses = (b.clauses ?? ['access', 'report', 'private']).map((c) => 'clause-' + c);
  for (const id of ['begin', 'route-confirm', 'car-quiet', 'view-sit', 'want-' + (b.want ?? 'money'), ...clauses, 'julian-' + (b.julian ?? 'truth'), 'lever-read', 'visit-busy', 'offer-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  const julian8 = { truth: 'julian8-thank', lie: 'julian8-hold', past: 'julian8-shrug' }[b.julian ?? 'truth'];
  for (const id of ['begin-predator', 'weeks-begin', ...(b.ch8 ?? ['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-spare']), b.night ?? 'night-home', 'friday-lie', julian8, 'p8-evening-alone'])
    s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  for (const id of ['begin-predator', 'reading-silent', 'delphine-work', 'week-alone', ...(b.ch13 ?? ['mirror-refuse', 'night-wait', 'late-on']), 'friday-end'])
    s = choose(s, 'CHAPTER13_CHOOSE', 'chapter13.' + id);
  return s;
}

const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|kiss\w*|moan\w*|sex\w*|nipples?|arous\w*|lust\w*|orgasm\w*)\b/i;
const fallText = (s: GameState) =>
  s.history.filter((h) => ['chapter14.room', 'chapter14.last', 'chapter14.safe'].includes(h.node)).flatMap((h) => h.blocks.map((b) => b.text)).join(' ');

it('enters from the Predator Chapter 13 ledger, with every card on the door', () => {
  const s = toLedger13();
  expect(`${s.scene}.${s.phase}`).toBe('chapter13.ledger');
  expect(chapter13Choices(s)).toEqual([]);
  expect(ids(s)).toEqual(['begin-predator']);
  const dawn = c14(s, 'begin-predator');
  expect(dawn.phase).toBe('dawn');
  expect(text(dawn)).toContain('HOLLIS: USE. VARGA: SPARE.');
  expect(text(dawn)).toContain('DELPHINE. SOMEBODY ELSE SENT HER.');
  expect(text(dawn)).toContain('He hired me to be frightening.');
});

it('takes him by the board, pays her want, and settles an ally in the room', () => {
  const at = walk14(toLedger13(), ['begin-predator', 'dawn-today']);
  expect(boardVotes14(at)).toEqual(['hollis', 'varga', 'julian']);
  expect(ids(at)).toContain('way-board');
  expect(ids(at)).toContain('way-letter');
  const room = c14(at, 'way-board');
  expect(room.phase).toBe('room');
  expect(text(room)).toContain('Every hand in the air is a lever you pulled.');
  expect(text(room)).toContain('Julian, in the Group COO’s chair, votes with you');
  expect(text(room)).toContain('None of them has ever seen your work.');
  const before = cash(room);
  const desk = walk14(room, ['room-watch', 'last-refuse']);
  expect(desk.phase).toBe('desk');
  expect(cash(desk)).toBe(before + 20000);
  expect(ids(desk)).toEqual(['mercy-none', 'mercy-chair', 'mercy-name']);
  const evening = c14(desk, 'mercy-chair');
  expect(evening.choices['c14.p-fall']).toBeUndefined();
  expect(evening.facts).toContain('c14.p-fall');
  expect(text(evening)).toContain('addressed to a council flat in Leeds');
  // Marcus is offered only if she let him keep his name.
  expect(ids(evening)).toEqual(['p14-evening-julian', 'p14-evening-alone']);
  const done = walk14(evening, ['p14-evening-julian', 'p14-julian-sex', 'p14-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter14.ledger');
  expect(ids(done)).toEqual([]);
  expect(text(done)).toContain('HIS PENSION, AND THE CHAIR');
  expect(text(done)).toContain('MERIDIAN — THE BOARD');
  expect(text(done)).toContain('Eleven minutes, darling. I timed it.');
  expect(fallText(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('opens the safe behind the horse if Pryce told her, and the letter is always there', () => {
  const at = walk14(toLedger13({ ch8: ['pull-hollis', 'hollis-hold', 'pull-counsel', 'counsel-hold'], night: 'night-pryce', want: 'desk' }), ['begin-predator', 'dawn-today']);
  expect(boardOpen14(at)).toBe(false);
  expect(ids(at)).not.toContain('way-board');
  const safe = c14(at, 'way-letter');
  expect(safe.phase).toBe('safe');
  expect(text(safe)).toContain('The number is his mother’s birthday.');
  expect(text(safe)).toContain('V. declined. Reassign Stuttgart. Watch.');
  expect(ids(safe)).toEqual(['safe-her', 'safe-letters', 'safe-horse']);
  const room = c14(safe, 'safe-letters');
  expect(text(room)).toContain('I resign as Director of Strategic Acquisitions with immediate effect');
  expect(text(room)).toContain('so that he can see the green C. on every one');
  const last = c14(room, 'room-pen');
  expect(text(last)).toContain('You took the fund’s letters. That was brave.');
  expect(text(last)).toContain('She’ll do this to you, you know. Celeste.');
  const desk = c14(last, 'last-laugh');
  expect(text(desk)).toContain('I took them out of your safe last night.');
  expect(text(desk)).toContain('sit down behind the enormous desk');
  const evening = c14(desk, 'mercy-name');
  expect(ids(evening)).toContain('p14-evening-marcus');
  const done = walk14(evening, ['p14-evening-marcus', 'p14-leave']);
  expect(done.choices['c14.p-evening-outcome']).toBe('declined');
  expect(text(done)).toContain('Marcus tells me you laughed.');
  expect(text(done)).toContain('And do bring my letters.');
  expect(fallText(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('keeps the letter quiet: Celeste does not know who did it', () => {
  const done = walk14(toLedger13({ ch8: ['pull-hollis', 'hollis-hold', 'pull-counsel', 'counsel-hold'], want: 'title' }), [
    'begin-predator',
    'dawn-today',
    'way-letter',
    'room-wait',
    'last-take',
    'mercy-none',
    'p14-evening-alone',
  ]);
  expect(done.choices['pred.ally.marcus']).toBe('in');
  expect(text(done)).toContain('Director of Strategic Acquisitions. They spell it right.');
  expect(text(done)).toContain('She does not know it was me.');
});

it('makes a rival Julian cost one more hand, and settles a casualty before the mercy', () => {
  const rival = walk14(toLedger13({ julian: 'past', ch8: ['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-use'] }), ['begin-predator', 'dawn-today']);
  expect(boardVotes14(rival)).toEqual(['hollis', 'varga']);
  expect(ids(rival)).not.toContain('way-board');
  const three = walk14(toLedger13({ julian: 'past', ch8: ['pull-archive', 'archive-hold', 'pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-use'] }), ['begin-predator', 'dawn-today']);
  expect(boardVotes14(three)).toEqual(['hollis', 'varga', 'chair']);
  const room = c14(three, 'way-board');
  expect(text(room)).toContain('Julian votes against.');
  expect(text(room)).toContain('a man in Surrey who sells garden benches');
  expect(ids(walk14(room, ['room-river', 'last-refuse', 'mercy-none']))).toEqual(['p14-evening-alone']);

  const desk = walk14(toLedger13({ julian: 'lie' }), ['begin-predator', 'dawn-today', 'way-letter', 'room-wait', 'last-refuse']);
  expect(ids(desk)).toEqual(['julian14-keep', 'julian14-out']);
  const out = c14(desk, 'julian14-out');
  expect(out.choices['pred.julian14']).toBe('out');
  expect(ids(out)).toEqual(['mercy-none', 'mercy-chair', 'mercy-name']);
});

it('runs the press, with her face on her terms and Marsh on the record', () => {
  const base = toLedger13({ ch13: ['mirror-turn', 'turn-leave', 'late-on'] });
  const s = base.choices['c5.published'] ? base : Object.assign(structuredClone(base), { choices: { ...base.choices, 'c5.published': 'yes' } });
  const at = walk14(s, ['begin-predator', 'dawn-today']);
  expect(ids(at)).toContain('way-press');
  const room = c14(at, 'way-press');
  expect(text(room)).toContain('HELIX’S HIDDEN FUND');
  expect(text(room)).toContain('confirming on the record that his inquiry into the fund has been reopened');
  expect(text(room)).toContain('your face is your own. You have just spent it on him.');
  const done = walk14(room, ['room-lift', 'last-refuse', 'mercy-name', 'p14-evening-alone']);
  expect(text(done)).toContain('It’s a good photograph.');
  expect(text(done)).toContain('Every front page in London, darling.');
});
