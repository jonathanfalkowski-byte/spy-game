import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter12Choices } from '../../src/content/chapter12';
import { chapter13Choices } from '../../src/content/chapter13';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 12, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER12_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
const c12 = (s: GameState, id: string) => choose(s, 'CHAPTER12_CHOOSE', 'chapter12.' + id);
const walk12 = (s: GameState, path: string[]) => path.reduce(c12, s);
const cash = (s: GameState) => Number(s.choices['own.cash'] ?? 0);

/** A real save (the maximal-julian golden) through Chapter 6, the Predator Chapters 7 and 8, and the Chapter 9 bridge,
 * to Chapter 12's temporary entry. */
function toBridge9(ch8: string[] = ['pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-spare']) {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  for (const id of ['begin', 'route-confirm', 'car-quiet', 'view-sit', 'want-money', 'clause-access', 'clause-report', 'clause-private', 'julian-truth', 'lever-read', 'visit-busy', 'offer-evening-alone'])
    s = choose(s, 'CHAPTER7_CHOOSE', 'chapter7.' + id);
  for (const id of ['begin-predator', 'weeks-begin', ...ch8, 'night-home', 'friday-lie', 'julian8-thank', 'p8-evening-alone']) s = choose(s, 'CHAPTER8_CHOOSE', 'chapter8.' + id);
  const prefer = ['begin-placeholder', 'arrive-begin', 'assemble-stop', 'lawyer-thank', 'resolve-end'];
  for (let i = 0; i < 20 && !(s.scene === 'chapter9' && s.phase === 'complete'); i++) {
    const offered = chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
    s = choose(s, 'CHAPTER9_CHOOSE', 'chapter9.' + (prefer.find((p) => offered.includes(p)) ?? offered[0]));
  }
  return s;
}

it('enters from the Predator Chapter 9, and Chapter 13 now waits for Geneva', () => {
  const s = toBridge9();
  expect(`${s.scene}.${s.phase}`).toBe('chapter9.complete');
  expect(ids(s)).toEqual(['begin-predator']);
  expect(chapter13Choices(s)).toEqual([]);
  const geneva = c12(s, 'begin-predator');
  expect(geneva.phase).toBe('geneva');
  expect(text(geneva)).toContain('Sign what they put in front of you. And read it first.');
  expect(text(geneva)).toContain('Geneva in January is a city made of rain.');
  expect(ids(geneva)).toEqual(['arrive-bar', 'arrive-julian', 'arrive-window']);
  expect(text(c12(geneva, 'arrive-bar'))).toContain('Robert Lyle, the Helix CFO');
});

it('asks Lucien the truth: Nell’s last instruction, an ally, Nora, and on to the winter', () => {
  const bank = walk12(toBridge9(), ['begin-predator', 'arrive-window']);
  expect(text(bank)).toContain('clause 14.3');
  const morel = c12(bank, 'sign-amend');
  expect(text(morel)).toContain('Nobody has ever struck 14.3.');
  expect(text(morel)).toContain('The second Evelyn Vale to sit in that chair.');
  const lunch = c12(morel, 'lunch-truth');
  expect(ids(lunch)).toEqual(['take-ask', 'take-trade', 'take-night']);
  const vault = c12(lunch, 'take-ask');
  expect(vault.phase).toBe('vault');
  expect(text(vault)).toContain('Close it. Send the rest to Nora. — E.L.');
  expect(text(vault)).toContain('a flat in London, on your own street, at your own number');
  const lake = c12(vault, 'list-nell');
  expect(lake.facts).toContain('c12.p12-list');
  expect([lake.choices['pred.ally.morel'], lake.choices['pred.nell']]).toEqual(['in', 'known']);
  // No indemnity clause and no archive schedule: the account cannot be moved.
  expect(ids(lake)).toEqual(['account-take', 'account-decline']);
  const declined = c12(lake, 'account-decline');
  expect(text(declined)).toContain('She said exactly the same thing. The first one.');
  expect(ids(declined)).toEqual(['lake-lucien', 'lake-alone']);
  const call = walk12(declined, ['lake-lucien', 'p12-lucien-sex', 'p12-stay']);
  expect(call.facts).toContain('c12.p12-evening-consent');
  expect(call.phase).toBe('call');
  const done = c12(call, 'call-truth');
  expect(`${done.scene}.${done.phase}`).toBe('chapter12.ledger');
  expect(text(done)).toContain('She would never have walked the harbour wall.');
  expect(text(done)).toContain('ELEANOR LINDEN. NINE FLATS. C.');
  expect(text(done)).toContain('THIS FLAT');
  // On the ask road Lucien keeps the evening to himself.
  expect(text(done)).toContain('Lucien has gone very quiet.');
  expect(chapter13Choices(done).map((c) => c.id)).toEqual(['chapter13.begin-predator']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('trades Helix’s next deal for the list, keeps the card, and Lucien reports the evening', () => {
  const lunch = walk12(toBridge9(), ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny']);
  expect(ids(lunch)).toEqual(['take-trade', 'take-night']);
  const lake = walk12(lunch, ['take-trade', 'list-own']);
  expect(lake.choices['pred.morel']).toBe('trade');
  const before = cash(lake);
  const kept = c12(lake, 'account-take');
  expect(cash(kept)).toBe(before + 25000);
  const done = walk12(kept, ['lake-lucien', 'p12-lucien-no-sex', 'p12-stay', 'call-bank']);
  expect(text(done)).toContain('Tell her friend the tall one that I spent it on my son.');
  expect(text(done)).toContain('Lucien tells me you are charming.');
  expect(text(done)).toContain('I’m so glad you kept the card.');
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('goes in with the cleaners at five, and moves the fund’s money to Zurich', () => {
  const lunch = walk12(toBridge9(['pull-archive', 'archive-hold', 'pull-hollis', 'hollis-use', 'pull-counsel', 'counsel-spare']), ['begin-predator', 'arrive-window', 'sign-copy', 'lunch-turn']);
  expect(text(lunch)).toContain('I play at night now.');
  const vault = c12(lunch, 'take-night');
  expect(text(vault)).toContain('The cleaners come in by the goods entrance');
  expect(text(vault)).not.toContain('E.L.');
  const lake = c12(vault, 'list-close');
  expect(ids(lake)).toEqual(['account-take', 'account-decline', 'account-move']);
  const done = walk12(lake, ['account-move', 'lake-alone', 'call-none']);
  expect(done.choices['pred.account']).toBe('moved');
  expect(text(done)).toContain('somebody borrowed a tabard at five in the morning');
  expect(text(done)).toContain('Zurich. How very unsentimental.');
  expect(replay(done.ledger, 19)).toEqual(done);
});
