import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden10 from '../fixtures/rev19-chapter10-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter11Choices, counterReady11 } from '../../src/content/chapter11';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter11Choices(s).map((c) => c.id.replace(/^chapter11\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c11 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER11_CHOOSE', id: 'chapter11.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c11, s);
const complete10 = (name: string) => replay(golden10.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** The comply-workroom Chapter 10 ending, adjusted per case. */
const start = (flags: Record<string, string | undefined> = {}) => withFlags(complete10('comply-workroom'), flags);
/** Into the Vesper, through the room and upstairs, to the order. */
const toOrder = (s: GameState) => walk(s, ['begin', 'arrive-quiet', 'room-listen', 'iris-how', 'up-escort', 'cat-leave']);

it('opens after an own-power Chapter 10 ending, and stays closed in production', () => {
  expect(ids(start())).toEqual(['begin']);
  vi.stubEnv('VITE_EVE_CHAPTER11', '');
  expect(chapter11Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER11');
});

it('dresses her, sends the car she booked, and opens the Vesper on empty frames', () => {
  const arrived = c11(start({ 'c10.invitation': 'pending', 'c8.pryce': 'chain', 'c10.green': 'black', 'c9.auction': 'thank' }), 'begin');
  expect(arrived.phase).toBe('arrival');
  expect(text(arrived)).toContain('You wear the black. Not the green.');
  expect(text(arrived)).toContain('Mr Pryce is holding the rear door');
  expect(text(arrived)).toContain('Tonight the window is empty.');
  expect(text(arrived)).toContain('The only full frame in the gallery.');
  expect(currentPlace(arrived, 'x')).toBe('19:30 · The car she booked');
  expect(ids(arrived)).toEqual(['arrive-star', 'arrive-quiet']);
  expect(ids(c11(start({ 'c7.exit': 'theo', 'c10.betrayed': undefined }), 'begin'))).toContain('arrive-defy');
});

it('makes the evening a viewing, and puts Iris in the powder room', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c10.betrayed': undefined };
  const room = walk(start({ ...julian, 'c10.green': 'own' }), ['begin', 'arrive-star']);
  expect(room.phase).toBe('viewing');
  expect(text(room)).toContain('The gala green. You kept it.');
  expect(text(room)).toContain('Julian likes to see what we have before anybody else does.');
  expect(text(room)).toContain('It is not a party. It is a viewing.');
  expect(ids(room)).toEqual(['room-dazzle', 'room-listen', 'room-dance']);
  const danced = c11(room, 'room-dance');
  expect(text(danced)).toContain('You’re on page seven.');
  expect(text(danced)).toContain('Iris. Iris Moreau.');
  expect(ids(danced)).toEqual(['iris-how', 'iris-out']);
  expect(ids(c11(withFlags(room, { 'c9.kessler': 'follow' }), 'room-listen'))).toEqual(['iris-how', 'iris-anna', 'iris-out']);
});

it('takes her upstairs to the board and the catalogue, and records what she takes', () => {
  const up = walk(start({ 'c8.pryce': 'chain' }), ['begin', 'arrive-quiet', 'room-dazzle', 'iris-out']);
  expect(up.phase).toBe('upstairs');
  expect(ids(up)).toEqual(['up-stairs', 'up-escort', 'up-iris']);
  const stairs = c11(up, 'up-stairs');
  expect(text(stairs)).toContain('On the first landing Mr Pryce is sitting on a folding chair');
  expect(text(stairs)).toContain('The defect, as you call it, is an asset in a public placement.');
  expect(text(stairs)).toContain('E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month.');
  expect(text(stairs)).toContain('I. M. · Four years · Ending.');
  expect(ids(stairs)).toEqual(['cat-photo', 'cat-page', 'cat-leave']);
  const photo = c11(stairs, 'cat-photo');
  expect([photo.phase, photo.facts.includes('c11.catalogue')]).toEqual(['order', true]);
  expect(leverageBoard(photo).holds.map((a) => a.id)).toContain('catalogue');
  expect(ids(c11(up, 'up-escort'))).toEqual(['cat-photo', 'cat-page', 'cat-leave']);
  expect(ids(walk(start(), ['begin', 'arrive-quiet', 'room-dazzle', 'iris-how']))).not.toContain('up-iris');
  expect(text(c11(stairs, 'cat-page'))).toContain('You tore out page seven.');
});

it('gives the second order with the threat to Maya escalated, and the third way only if she built one', () => {
  const plain = toOrder(start({ 'case.strength': 'thin', 'act3.celeste-surprised': undefined, 'c10.poison': undefined, 'act3.ally.julian': undefined }));
  expect(plain.phase).toBe('order');
  expect(text(plain)).toContain('I would like her to end tonight, darling, and I would like you to be the one.');
  expect(text(plain)).toContain('Renewals can be reviewed.');
  expect(ids(plain)).toEqual(['order-comply', 'order-refuse']);
  expect(counterReady11(plain)).toBe(false);
  const suspended = toOrder(start({ 'act3.maya-clearance': 'suspended' }));
  expect(text(suspended)).toContain('A review can become a dismissal.');
  expect(ids(toOrder(start({ 'act3.celeste-surprised': 'once' })))).toContain('order-counter');
});

it('plays every answer through the cloakroom, with its cost', () => {
  const order = toOrder(start({ 'act3.celeste-surprised': 'once', 'act3.maya-clearance': 'renewed', 'c7.robe': 'coats' }));
  const complied = c11(order, 'order-comply');
  expect([complied.phase, complied.choices['c11.answer']]).toEqual(['ending', 'complied']);
  expect(text(complied)).toContain('number 41, fourteen months old');
  expect(text(complied)).toContain('You have always known about linings.');
  expect(ids(complied)).toEqual(['plant-look', 'plant-away']);
  const burned = c11(complied, 'plant-look');
  expect([burned.phase, burned.choices['c11.iris']]).toEqual(['after', 'burned']);
  expect(text(burned)).toContain('She looked at me as if I were the next page.');
  expect(text(burned)).toContain('Lovely. You see how easy it is.');

  const refused = c11(order, 'order-refuse');
  expect(refused.choices['act3.maya-clearance']).toBe('suspended');
  const told = c11(refused, 'refuse-tell');
  expect([told.choices['c11.iris'], text(told).includes('Do your own ending.')]).toEqual(['spared', true]);
  expect(text(told)).toContain('Maya’s renewal is pulled for review');
  // Refusal lands on Maya's clearance and nothing else: no evening forced, no sexual consequence.
  expect(told.choices['c11.evening-open']).toBeUndefined();
  const revoked = c11(c11(toOrder(start({ 'act3.maya-clearance': 'suspended' })), 'order-refuse'), 'refuse-silent');
  expect(revoked.choices['act3.maya-clearance']).toBe('revoked');
  expect(text(revoked)).toContain('the review becomes a dismissal');

  const countered = c11(order, 'order-counter');
  expect(countered.choices['act3.celeste-surprised']).toBe('twice');
  expect(text(countered)).toContain('This was meant for your bag.');
  const free = c11(countered, 'free-stay');
  expect([free.choices['c11.iris'], free.choices['act3.ally.iris']]).toEqual(['free', 'in']);
  expect(text(free)).toContain('Twice now. I am starting to enjoy you.');
  expect(leverageBoard(free).holds.map((a) => a.id)).toContain('iris');
  expect(leverageBoard(free).held[0].wants).toBe('Iris Moreau, ended, by your hand');
  const poisoned = c11(toOrder(start({ 'c10.poison': 'date' })), 'order-counter');
  expect(text(poisoned)).toContain('Halvorsen’s own head of security');
});

it('offers a chosen evening only with a partner she did not betray, consent-gated, and it fades', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const after = c11(c11(toOrder(start(julian)), 'order-comply'), 'plant-away');
  expect(ids(after)).toEqual(['evening-julian', 'after-home']);
  const invited = c11(after, 'evening-julian');
  expect(text(invited)).toContain('I have never once watched one from the wall before.');
  expect(currentPlace(invited, 'x')).toBe('Late · Julian’s apartment');
  expect(ids(invited)).toEqual(['evening-julian-no-sex', 'evening-julian-sex', 'evening-leave']);
  const scoped = c11(invited, 'evening-julian-sex');
  expect(scoped.facts).toContain('c11.evening-consent');
  const stayed = c11(scoped, 'evening-stay');
  expect([stayed.phase, stayed.choices['c11.evening-outcome']]).toEqual(['complete', 'intimate-sex']);
  expect(text(stayed)).toContain('The scene fades.');
  expect(c11(scoped, 'evening-stop').choices['c11.evening-outcome']).toBe('withdrawn');
  expect(ids(c11(c11(toOrder(start({ ...julian, 'c10.betrayed': 'julian' })), 'order-comply'), 'plant-away'))).toEqual(['after-home']);
});

it('plays a real Chapter 11 on an untouched save, and the save authenticates', () => {
  let s = walk(complete10('refuse-notes'), ['begin', 'arrive-star', 'room-dance', 'iris-out', 'up-iris', 'cat-page']);
  s = walk(s, ['order-refuse', 'refuse-tell']);
  s = c11(s, ids(s).includes('after-home') ? 'after-home' : ids(s)[0]);
  while (s.phase !== 'complete') s = c11(s, ids(s)[0]);
  expect(`${s.scene}.${s.phase}`).toBe('chapter11.complete');
  expect(chapter11Choices(s)).toEqual([]);
  expect(text(s)).toContain('She has put a date on me. Then I have a date too.');
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter11.arrival', 'chapter11.viewing', 'chapter11.upstairs', 'chapter11.order', 'chapter11.ending', 'chapter11.after', 'chapter11.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});
