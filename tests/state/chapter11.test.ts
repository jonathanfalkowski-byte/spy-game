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
/** The second pass's moments stand in front of later choices: take their neutral pick when one is in the way. */
const NEUTRAL = ['gap-pass', 'terrace-river'];
const walk = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c11(y, n);
    }
    return c11(y, id);
  }, s);
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
const toOrder = (s: GameState) => walk(s, ['begin', 'arrive-quiet', 'room-listen', 'look-silent', 'iris-how', 'up-escort', 'cat-leave', 'hide-curtain', 'terrace-river']);

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
  // Celeste's question by the terrace doors, then Iris.
  expect(text(danced)).toContain('Do you like being looked at?');
  expect(ids(danced)).toEqual(['look-yes', 'look-turn', 'look-silent']);
  const yes = c11(danced, 'look-yes');
  expect([yes.choices['c11.looked'], text(yes).includes('It was the only thing about her I never had to teach.')]).toEqual(['yes', true]);
  expect(text(yes)).toContain('Iris. Iris Moreau.');
  expect(ids(yes)).toEqual(['iris-how', 'iris-out']);
  expect(ids(walk(withFlags(room, { 'c9.kessler': 'follow' }), ['room-listen', 'look-silent']))).toEqual(['iris-how', 'iris-anna', 'iris-out']);
});

it('takes her upstairs to the board and the catalogue, and records what she takes', () => {
  const up = walk(start({ 'c8.pryce': 'chain' }), ['begin', 'arrive-quiet', 'room-dazzle', 'look-silent', 'iris-out']);
  expect(up.phase).toBe('upstairs');
  expect(ids(up)).toEqual(['up-stairs', 'up-escort', 'up-iris']);
  const door = c11(up, 'up-stairs');
  expect(text(door)).toContain('On the first landing Mr Pryce is sitting on a folding chair');
  expect(text(door)).toContain('The defect, as you call it, is an asset in a public placement.');
  // The board-room door, an inch open, before the reading room.
  expect(ids(door)).toEqual(['gap-look', 'gap-listen', 'gap-pass']);
  expect(text(door)).not.toContain('E. V. · Reissued');
  const looked = c11(door, 'gap-look');
  expect([looked.phase, looked.choices['c11.gap']]).toEqual(['upstairs', 'look']);
  expect(text(looked)).toContain('She saw me. She said nothing.');
  expect(text(c11(door, 'gap-listen'))).toContain('I am fond of all of them, Marguerite.');
  const stairs = c11(door, 'gap-pass');
  expect(text(stairs)).toContain('E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month.');
  expect(text(stairs)).toContain('I. M. · Four years · Ending.');
  expect(ids(stairs)).toEqual(['cat-photo', 'cat-page', 'cat-leave']);
  expect(text(stairs)).toContain('A handle. Every product comes with one.');
  expect(text(stairs)).toContain('Tolerates public exposure; seeks it.');
  const photo = c11(stairs, 'cat-photo');
  expect([photo.phase, photo.facts.includes('c11.catalogue')]).toEqual(['upstairs', true]);
  // Two board members in the corridor.
  expect(text(photo)).toContain('Laurent always did like to watch them learn.');
  expect(ids(photo)).toEqual(['hide-curtain', 'hide-brazen', 'hide-down']);
  const brazen = c11(photo, 'hide-brazen');
  expect([brazen.phase, brazen.choices['c11.hide']]).toEqual(['order', 'brazen']);
  expect(text(brazen)).toContain('So is everything else you’re looking for.');
  expect(text(c11(photo, 'hide-curtain'))).toContain('Page seven. Even better in person, I thought.');
  expect(leverageBoard(photo).holds.map((a) => a.id)).toContain('catalogue');
  expect(ids(walk(up, ['up-escort', 'gap-pass']))).toEqual(['cat-photo', 'cat-page', 'cat-leave']);
  expect(ids(walk(start(), ['begin', 'arrive-quiet', 'room-dazzle', 'look-silent', 'iris-how']))).not.toContain('up-iris');
  expect(text(c11(c11(stairs, 'cat-page'), 'hide-down'))).toContain('You tore out page seven.');
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

it('gives a beat with Celeste on the terrace before the answer', () => {
  const terrace = walk(start(), ['begin', 'arrive-quiet', 'room-listen', 'look-silent', 'iris-how', 'up-escort', 'gap-pass', 'cat-leave', 'hide-curtain']);
  expect(terrace.phase).toBe('order');
  expect(ids(terrace)).toEqual(['terrace-ask', 'terrace-glass', 'terrace-river']);
  const asked = c11(terrace, 'terrace-ask');
  expect([asked.phase, asked.choices['c11.terrace']]).toEqual(['order', 'ask']);
  expect(text(asked)).toContain('You look lovely in green.');
  expect(ids(asked)).toContain('order-comply');
  expect(text(c11(terrace, 'terrace-glass'))).toContain('That is exactly how it started with her.');
});

it('plays every answer through the cloakroom, with its cost', () => {
  const order = toOrder(start({ 'act3.celeste-surprised': 'once', 'act3.maya-clearance': 'renewed', 'c7.robe': 'coats' }));
  const walking = c11(order, 'order-comply');
  // The last minutes with Iris before the cloakroom.
  expect(text(walking)).toContain('Walk me out? I hate the last ten minutes of these.');
  expect(ids(walking)).toEqual(['walk-name', 'walk-laugh', 'walk-quiet']);
  const complied = c11(walking, 'walk-name');
  expect(text(complied)).toContain('Helen. It was Helen.');
  expect([complied.phase, complied.choices['c11.answer']]).toEqual(['ending', 'complied']);
  expect(text(complied)).toContain('number 41, fourteen months old');
  expect(text(complied)).toContain('You have always known about linings.');
  expect(ids(complied)).toEqual(['plant-look', 'plant-away']);
  const burned = c11(complied, 'plant-look');
  expect([burned.phase, burned.choices['c11.iris']]).toEqual(['after', 'burned']);
  expect(text(burned)).toContain('She looked at me as if I were the next page.');
  // The way home: Mr Pryce's car, and Celeste's word at midnight.
  expect(ids(burned)).toEqual(['way-car', 'way-walk']);
  const driven = c11(burned, 'way-car');
  expect(driven.choices['c11.way']).toBe('car');
  expect(text(driven)).toContain('I don’t do the endings.');
  expect(text(driven)).toContain('Lovely. You see how easy it is.');

  const refused = c11(order, 'order-refuse');
  expect(refused.choices['act3.maya-clearance']).toBe('suspended');
  const told = c11(c11(refused, 'walk-quiet'), 'refuse-tell');
  expect([told.choices['c11.iris'], text(told).includes('Do your own ending.')]).toEqual(['spared', true]);
  // Maya's Monday belongs to the close, after the night.
  expect(text(walk(told, ['way-walk', 'after-home']))).toContain('Maya’s renewal is pulled for review');
  // Refusal lands on Maya's clearance and nothing else: no evening forced, no sexual consequence.
  expect(told.choices['c11.evening-open']).toBeUndefined();
  const revoked = walk(toOrder(start({ 'act3.maya-clearance': 'suspended' })), ['order-refuse', 'walk-quiet', 'refuse-silent']);
  expect(revoked.choices['act3.maya-clearance']).toBe('revoked');
  expect(text(walk(revoked, ['way-walk', 'after-home']))).toContain('the review becomes a dismissal');

  const countered = walk(order, ['order-counter', 'walk-laugh']);
  expect(countered.choices['act3.celeste-surprised']).toBe('twice');
  expect(text(countered)).toContain('This was meant for your bag.');
  const free = c11(countered, 'free-stay');
  expect([free.choices['c11.iris'], free.choices['act3.ally.iris']]).toEqual(['free', 'in']);
  expect(text(c11(free, 'way-walk'))).toContain('Twice now. I am starting to enjoy you.');
  expect(leverageBoard(free).holds.map((a) => a.id)).toContain('iris');
  expect(leverageBoard(free).held[0].wants).toBe('Iris Moreau, ended, by your hand');
  const poisoned = walk(toOrder(start({ 'c10.poison': 'date' })), ['order-counter', 'walk-quiet']);
  expect(text(poisoned)).toContain('Halvorsen’s own head of security');
});

it('offers a chosen evening only with a partner she did not betray, consent-gated, and it fades', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const after = walk(toOrder(start(julian)), ['order-comply', 'walk-quiet', 'plant-away', 'way-walk']);
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
  expect(ids(walk(toOrder(start({ ...julian, 'c10.betrayed': 'julian' })), ['order-comply', 'walk-quiet', 'plant-away', 'way-walk']))).toEqual(['after-home']);
});

it('plays a real Chapter 11 on an untouched save, and the save authenticates', () => {
  let s = walk(complete10('refuse-notes'), ['begin', 'arrive-star', 'room-dance', 'look-turn', 'iris-out', 'up-iris', 'cat-page', 'hide-brazen']);
  s = walk(s, ['order-refuse', 'walk-name', 'refuse-tell']);
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
