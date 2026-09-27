import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter9Choices } from '../../src/content/chapter9';
import { chapter11Choices } from '../../src/content/chapter11';
import { chapter12Choices } from '../../src/content/chapter12';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

type Kind = 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE' | 'CHAPTER9_CHOOSE' | 'CHAPTER10_CHOOSE' | 'CHAPTER11_CHOOSE' | 'CHAPTER12_CHOOSE' | 'CHAPTER13_CHOOSE';
const choose = (s: GameState, kind: Kind, id: string) => {
  const next = act(s, { type: kind, id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase);
  return next;
};
const ids = (s: GameState) => chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
const c11 = (s: GameState, id: string) => choose(s, 'CHAPTER11_CHOOSE', 'chapter11.' + id);
/** The deepening pass's moments (the second beat, the back pages): take the neutral pick when it is in the way. */
const NEUTRAL11 = ['guest-none', 'back-close'];
const walk11 = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL11.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c11(y, n);
    }
    return c11(y, id);
  }, s);
const cash = (s: GameState) => Number(s.choices['own.cash'] ?? 0);

/** A real save (the maximal-julian golden) through Chapter 6, the Predator Chapters 7 and 8, and the Chapter 9 bridge,
 * and the Predator Chapter 10 (Let Me Help, on its quiet picks), to Chapter 11's entry. */
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
  // Let Me Help (Predator Chapter 10), on its quiet picks.
  for (const id of ['begin-predator', 'ask-go', 'open-flatter', 'adrian-composed', 'offer-decline', 'marcus-lie', 'ev-alone'])
    s = choose(s, 'CHAPTER10_CHOOSE', 'chapter10.' + id);
  return s;
}

it('enters from the Predator Chapter 10, and Chapter 12 waits for the Vesper', () => {
  const s = toBridge9();
  expect(`${s.scene}.${s.phase}`).toBe('chapter10.ledger');
  expect(ids(s)).toEqual(['begin-predator']);
  expect(chapter12Choices(s)).toEqual([]);
  const dress = c11(s, 'begin-predator');
  expect(dress.phase).toBe('dress');
  expect(text(dress)).toContain('You’ll be the best thing in the room. That’s rather the point.');
  expect(ids(dress)).toEqual(['dress-gift', 'dress-own']);
});

it('reads her own page, burns Iris, sends Marcus the bill, and authenticates', () => {
  const room = walk11(toBridge9(), ['begin-predator', 'dress-gift']);
  // She declined Celeste's offer in Chapter 10 on this save.
  expect(text(room)).toContain('Marcus, darling. And your acquisition. How well she wears her independence.');
  const beat = c11(room, 'room-dance');
  expect(text(beat)).toContain('Which one do you want?');
  // The second beat (deepening pass): Julian is an ally on this save.
  expect([beat.phase, ids(beat)]).toEqual(['longroom', ['guest-gulf', 'guest-julian', 'guest-celeste', 'guest-none']]);
  const book = c11(beat, 'guest-celeste');
  expect(text(book)).toContain('He always asks for exactly what he wants.');
  expect(text(book)).toContain('TRANSFERRED: AXIOM → HELIX · AT CLIENT REQUEST (M. CHEN)');
  expect(text(book)).toContain('I was a line item.');
  const back = c11(book, 'page-tear');
  expect(back.facts).toContain('c11.p11-transfer');
  expect(ids(back)).toEqual(['back-first', 'back-clients', 'back-close']);
  const powder = c11(back, 'back-clients');
  expect(text(powder)).toContain('M. CHEN · HELIX · CLIENT, ELEVEN YEARS · TRANSFERS: 3.');
  const terrace = c11(powder, 'iris-truth');
  expect(text(terrace)).toContain('I’m on page forty. Same book.');
  expect(text(terrace)).toContain('I thought the new one might like to learn how it is done.');
  // Hollis owned opens a counter; Hollis's letter on the fund's paper lets her turn it on the client.
  expect(ids(terrace)).toEqual(['order-comply', 'order-refuse', 'order-warn', 'order-turn']);
  const cloak = c11(terrace, 'order-comply');
  expect(text(cloak)).toContain('You know about linings.');
  expect([cloak.choices['pred.iris'], cloak.choices['pred.halvorsen']]).toEqual(['retired', 'owes-helix']);
  const late = c11(cloak, 'cloak-celeste');
  expect(text(late)).toContain('It is only ever difficult the first time.');
  const before = cash(late);
  const evening = c11(late, 'car-use');
  expect(cash(evening)).toBe(before + 10000);
  expect(ids(evening)).toEqual(['late-marcus', 'late-julian', 'late-alone']);
  const done = walk11(evening, ['late-marcus', 'p11-marcus-sex', 'p11-stay']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter11.ledger');
  expect(done.facts).toContain('c11.p11-evening-consent');
  expect(text(done)).toContain('IRIS MOREAU. RETIRED. I PUT IT IN HER BAG.');
  expect(text(done)).toContain('(THE PAGE IS IN MY BAG.)');
  expect(text(done)).toContain('TRANSFERS: 3. TWO CONCLUDED.');
  expect(text(done)).toContain('We have copies. We always have copies.');
  expect(chapter12Choices(done).map((c) => c.id)).toEqual(['chapter12.begin-predator']);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('refuses: the canal, Helix pays, somebody else does it, and Marcus admits he asked for her', () => {
  const done = walk11(toBridge9(), ['begin-predator', 'dress-own', 'room-listen', 'page-read', 'iris-nothing', 'order-refuse', 'cloak-wait', 'car-ask', 'late-alone']);
  expect(text(done)).toContain('Pity. I did so hope.');
  expect(text(done)).toContain('I asked for you. By name. The morning after the Glass House.');
  expect(text(done)).toContain('IRIS MOREAU. ENDED. NOT BY ME.');
  expect(text(done)).toContain('Mr Halvorsen is taking his ships elsewhere');
  expect([done.choices['pred.halvorsen'], done.choices['pred.celeste-count']]).toEqual(['hostile', undefined]);
  expect(replay(done.ledger, 19)).toEqual(done);
});

it('warns Iris out through the kitchens: the first time Celeste is surprised', () => {
  const done = walk11(toBridge9(), ['begin-predator', 'dress-own', 'room-listen', 'page-photo', 'iris-truth', 'order-warn', 'cloak-celeste', 'car-keep', 'late-alone']);
  expect(text(done)).toContain('I’ll find you. When I have a name that’s mine.');
  expect(text(done)).toContain('Through the kitchens, somebody said.');
  expect([done.choices['pred.iris'], done.choices['pred.ally.iris'], done.choices['pred.celeste-count']]).toEqual(['free', 'in', '1']);
  expect(text(done)).toContain('IRIS MOREAU. OUT THROUGH THE KITCHENS.');
  expect(text(done)).toContain('(PHOTOGRAPHED.)');
});

it('turns the favour on Halvorsen, and Chapter 13 remembers the night she tried', () => {
  const done = walk11(toBridge9(), ['begin-predator', 'dress-own', 'room-dazzle', 'guest-gulf', 'page-read', 'back-first', 'iris-client', 'order-turn', 'cloak-celeste', 'car-keep', 'late-alone']);
  expect(text(done)).toContain('You are not on my list, Ms Vale.');
  expect(text(done)).toContain('E. V. · First issue. · Singapore. · WITHDRAWN (JAKARTA).');
  expect(done.facts).toContain('c11.p11-first');
  expect(text(done)).toContain('On reflection, my dear, I think I shall keep my chief of staff.');
  expect(text(done)).toContain('I wonder who could have changed it for him.');
  expect([done.choices['pred.iris'], done.choices['pred.halvorsen']]).toEqual(['kept', 'owes-her']);
  expect(text(done)).toContain('IRIS MOREAU. KEPT. HALVORSEN OWES ME.');
  expect(replay(done.ledger, 19)).toEqual(done);
  // On through Geneva (quiet picks) to Chapter 13's reading room.
  let s = done;
  for (const id of ['begin-predator', 'arrive-window', 'sign-all', 'lunch-deny', 'take-night', 'afternoon-lake', 'list-close', 'account-decline', 'lake-alone', 'call-none', 'dawn-sleep'])
    s = choose(s, 'CHAPTER12_CHOOSE', 'chapter12.' + id);
  // Geneva remembers the first issue.
  expect(text(s)).toContain('I saw her page at the Vesper, soft with handling');
  const reading = choose(s, 'CHAPTER13_CHOOSE', 'chapter13.begin-predator');
  expect(text(reading)).toContain('the night she tried to end Iris');
});
