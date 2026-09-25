import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden11 from '../fixtures/rev19-chapter11-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter12Choices } from '../../src/content/chapter12';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter12Choices(s).map((c) => c.id.replace(/^chapter12\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c12 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER12_CHOOSE', id: 'chapter12.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c12, s);
const complete11 = (name: string) => replay(golden11.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** The comply-quiet Chapter 11 ending, adjusted per case. */
const start = (flags: Record<string, string | undefined> = {}) => withFlags(complete11('comply-quiet'), flags);
const toFlat = (s: GameState) => walk(s, ['begin', 'cover-quiet', 'tan-listen']);
const toStraits = (s: GameState, search = 'search-desk', caught = 'caught-hide') => walk(toFlat(s), [search, caught]);
const toNight = (s: GameState, nora = 'nora-kind') => walk(toStraits(s), ['ashby-evie', nora]);
const prefer = ['cover-quiet', 'tan-listen', 'search-desk', 'caught-hide', 'ashby-evie', 'nora-kind', 'harbour-quiet', 'night-alone'];
/** Neutral picks to the end of the chapter. */
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c12(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};

it('opens after an own-power Chapter 11 ending, and stays closed in production', () => {
  expect(ids(start())).toEqual(['begin']);
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER12', '');
  expect(chapter12Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER12');
});

it('decides at the kitchen table, and Celeste is waiting at Changi', () => {
  const table = c12(start({ 'c7.robe': 'drawer' }), 'begin');
  expect(table.phase).toBe('departure');
  expect(text(table)).toContain('Three in the morning, and the kitchen table, and the wall.');
  expect(text(table)).toContain('the left one worn down at the heel');
  expect(currentPlace(table, 'x')).toBe('03:00 · The kitchen table, London');
  expect(ids(table)).toContain('cover-quiet');
  expect(ids(c12(start({ 'own.campaign': undefined }), 'begin'))).not.toContain('cover-campaign');
  // Laurent's campaign pays for the trip.
  const paid = walk(start({ 'own.campaign': 'taken' }), ['begin', 'cover-campaign']);
  expect(paid.phase).toBe('emerald');
  expect([paid.choices['c12.cover'], paid.choices['own.campaign-location']]).toEqual(['campaign', 'singapore']);
  expect(text(paid)).toContain('People always say yes to money they’ve already spent.');
  expect(text(paid)).toContain('Do give my love to Mrs Tan.');
  // A man she chose can come with her.
  const julian = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const flew = walk(start(julian), ['begin', 'cover-julian']);
  expect([flew.choices['c12.cover'], flew.choices['c12.with']]).toEqual(['with', 'julian']);
  expect(text(flew)).toContain('I will ask where you’d like dinner');
});

it('lets Mrs Tan greet her by what happened on the phone, and gives her the key', () => {
  const greet = (call: string | undefined) => text(walk(start({ 'c8.call': call }), ['begin', 'cover-quiet']));
  expect(greet('evie')).toContain('You came. I said come and see them, and you came.');
  expect(greet('ask')).toContain('You rang me back. You asked me when they came.');
  expect(greet('down')).toContain('You put the phone down on me.');
  expect(greet(undefined)).toContain('Evie? No. Evie?');
  const hill = walk(start(), ['begin', 'cover-quiet']);
  expect(ids(hill)).toEqual(['tan-evie', 'tan-truth', 'tan-listen']);
  const told = c12(hill, 'tan-truth');
  expect(told.phase).toBe('flat');
  expect(text(told)).toContain('You stand wrong. You stand straight.');
  expect(text(told)).toContain('If a tall lady comes and asks, I have gone to Penang.');
  expect(text(told)).toContain('a key on a loop of green ribbon');
  expect(told.facts).toContain('c12.last-night');
});

it('opens number 9 on a set kept dressed for her, and lets the caretaker walk in', () => {
  const flat = toFlat(start({ 'c7.lotte': 'hug' }));
  expect(text(flat)).toContain('the ivory jacket');
  expect(text(flat)).toContain('They kept the shape. Ruth said that.');
  expect(text(flat)).toContain('you and C., on the balcony, every night');
  expect(ids(flat)).toEqual(['search-desk', 'search-wardrobe', 'search-balcony']);
  const desk = c12(flat, 'search-desk');
  expect([desk.phase, desk.facts.includes('c12.schedule')]).toEqual(['flat', true]);
  expect(text(desk)).toContain('Family contact (sister): N. Linden');
  expect(text(desk)).toContain('And then, in the quiet, a key in the lock.');
  expect(ids(desk)).toEqual(['caught-hide', 'caught-evie', 'caught-own']);
  expect(text(c12(flat, 'search-wardrobe'))).toContain('an unused boarding pass for Penang');
  expect(text(c12(flat, 'search-balcony'))).toContain('a single white orchid in a pot');
  const hid = c12(desk, 'caught-hide');
  expect([hid.phase, hid.choices['act3.singapore']]).toEqual(['straits', 'key']);
  expect(text(hid)).toContain('STRAITS PROPERTY SERVICES · THE MARLOWE HOTEL, 4TH FLOOR');
  const tenant = c12(desk, 'caught-evie');
  expect(tenant.choices['act3.singapore']).toBe('moved-in');
  expect(text(tenant)).toContain('She’s moved in.');
  const own = c12(desk, 'caught-own');
  expect([own.choices['act3.singapore'], own.facts.includes('c12.nine')]).toEqual(['everything', true]);
});

it('brings every road to the Marlowe, and lets Ashby say "a friend of hers"', () => {
  const roads = toStraits(start({ 'act3.ally.iris': 'in', 'c7.robe': 'coats', 'c9.names-open': 'end' }));
  expect(text(roads)).toContain('His name is Ashby. Tell him I sent you');
  expect(text(roads)).toContain('the matchbook from the pocket of her coat');
  expect(text(roads)).toContain('somebody gave her name to the wrong people');
  expect(ids(roads)).toEqual(['ashby-evie', 'ashby-press', 'ashby-truth']);
  // Nothing to lay on the bar: no pressing him.
  const bare = { 'c11.catalogue': 'leave', 'c8.list': undefined };
  expect(ids(toStraits(start(bare), 'search-desk', 'caught-evie'))).toEqual(['ashby-evie', 'ashby-truth']);
  const pressed = c12(roads, 'ashby-press');
  expect([pressed.phase, pressed.choices['c12.statement']]).toEqual(['sister', 'recorded']);
  expect(text(pressed)).toContain('My name is Colin Ashby.');
  expect(text(pressed)).toContain('It came down from upstairs. From a friend of hers.');
  expect(text(pressed)).toContain('White orchids. She hated orchids.');
  const ghost = c12(roads, 'ashby-evie');
  expect([ghost.choices['c12.statement'], ghost.facts.includes('c12.ashby')]).toEqual([undefined, true]);
  expect(text(c12(toStraits(start({ 'c9.kessler': 'follow' })), 'ashby-truth'))).toContain('Another one who liked boats.');
});

it('puts her at Nora’s door, and every answer carries the seed', () => {
  const door = walk(toStraits(start()), ['ashby-evie']);
  expect(text(door)).toContain('Nell?');
  expect(ids(door)).toEqual(['nora-truth', 'nora-kind', 'nora-go']);
  for (const id of ['nora-truth', 'nora-kind', 'nora-go']) {
    const after = c12(door, id);
    expect(after.phase).toBe('night');
    expect([after.choices['act3.nell'], after.choices['act3.celeste-knew']]).toEqual(['known', 'seeded']);
    expect(after.facts).toEqual(expect.arrayContaining(['c12.nell', 'c12.sunday-call']));
    expect(text(after)).toMatch(/so (terribly )?sorry/);
  }
  const truth = c12(door, 'nora-truth');
  expect(truth.choices['act3.ally.nora']).toBe('in');
  expect(text(truth)).toContain('I want to be in the room.');
  expect(text(truth)).toContain('The black was always her friend’s.');
  expect(c12(door, 'nora-kind').choices['act3.ally.nora']).toBeUndefined();
  expect(text(c12(door, 'nora-go'))).toContain('Whoever sent you, tell them I know.');
});

it('sends Maya from London to the harbour, and ends alone unless a man came', () => {
  const night = toNight(start({ 'c4.mutual-interest': undefined }));
  expect(text(night)).toContain('You’ve met Nora. Such a sweet girl.');
  expect(text(night)).toContain('London misses you.');
  expect(text(toNight(start(), 'nora-go'))).toContain('You went to Nora’s.');
  expect(ids(night)).toEqual(['harbour-name', 'harbour-coffee', 'harbour-quiet']);
  const coffee = c12(night, 'harbour-coffee');
  expect(text(coffee)).toContain('The black was always her friend’s. Tonight it’s mine.');
  expect(ids(coffee)).toEqual(['night-alone']);
  const done = c12(coffee, 'night-alone');
  expect(done.phase).toBe('complete');
  expect(text(done)).not.toMatch(/undress|draws? him down/);
});

it('keeps the Singapore evening chosen, consented and stoppable', () => {
  const julian = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const came = walk(start(julian), ['begin', 'cover-julian', 'tan-listen', 'search-desk', 'caught-hide', 'ashby-evie', 'nora-kind', 'harbour-quiet']);
  expect(ids(came)).toEqual(['evening-julian', 'night-alone']);
  const invited = c12(came, 'evening-julian');
  expect(currentPlace(invited, 'x')).toBe('Late · A suite on the Straits');
  expect(ids(invited)).toEqual(['evening-julian-no-sex', 'evening-julian-sex', 'evening-leave']);
  const chose = c12(invited, 'evening-julian-sex');
  expect(chose.facts).toContain('c12.evening-consent');
  expect(ids(chose)).toEqual(['evening-stop', 'evening-stay']);
  const stopped = c12(chose, 'evening-stop');
  expect([stopped.phase, stopped.choices['c12.evening-outcome']]).toEqual(['complete', 'withdrawn']);
  const stayed = c12(chose, 'evening-stay');
  expect(stayed.choices['c12.evening-outcome']).toBe('intimate-sex');
  expect(text(stayed)).toContain('The scene fades.');
  expect(c12(invited, 'evening-leave').choices['c12.evening-outcome']).toBe('declined');
});

it('brings her home to an orchid, a name on the wall, and a fuller board', () => {
  const tenant = finish(toStraits(start({ 'c8.pryce': 'chain' }), 'search-desk', 'caught-evie'));
  expect(`${tenant.scene}.${tenant.phase}`).toBe('chapter12.complete');
  expect(text(tenant)).toContain('She thought you’d be tired.');
  expect(text(tenant)).toContain('So glad you found the flat comfortable.');
  expect(text(tenant)).toContain('Eleanor Linden. Nell.');
  const counted = finish(toStraits(start(), 'search-desk', 'caught-own'));
  expect(text(counted)).toContain('Nine, darling. Do count them properly next time.');
  const truth = finish(walk(toStraits(start()), ['ashby-press', 'nora-truth']));
  const board = leverageBoard(truth);
  expect(board.holds.map((a) => a.id)).toEqual(expect.arrayContaining(['schedule', 'site-report', 'ashby', 'nora', 'nell']));
  expect(board.held[0].holds).toEqual(expect.arrayContaining(['Singapore: where you went, and whom you saw', 'A photograph of Maya leaving work, taken from across the road']));
  expect(text(truth)).toContain('Beside it you pin Nora’s photograph');
  expect(decodeSave(encodeSave(truth))).toEqual(truth);
});

it('reaches the end from every option in every scene', () => {
  const s0 = start({ 'own.campaign': 'taken', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined });
  const prefixes: string[][] = [
    ['begin', 'cover-campaign'],
    ['begin', 'cover-julian'],
    ...['tan-evie', 'tan-truth', 'tan-listen'].map((t) => ['begin', 'cover-quiet', t]),
    ...['search-desk', 'search-wardrobe', 'search-balcony'].flatMap((a) => ['caught-hide', 'caught-evie', 'caught-own'].map((b) => ['begin', 'cover-quiet', 'tan-listen', a, b])),
    ...['ashby-evie', 'ashby-press', 'ashby-truth'].flatMap((a) => ['nora-truth', 'nora-kind', 'nora-go'].flatMap((b) => ['harbour-name', 'harbour-coffee', 'harbour-quiet'].map((h) => ['begin', 'cover-quiet', 'tan-listen', 'search-desk', 'caught-hide', a, b, h]))),
  ];
  for (const path of prefixes) {
    const end = finish(walk(s0, path));
    expect(`${end.scene}.${end.phase}`).toBe('chapter12.complete');
  }
}, 120_000);
