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
const toHill = (s: GameState) => walk(s, ['begin', 'cover-quiet', 'first-sleep']);
const toFlat = (s: GameState) => walk(toHill(s), ['tan-listen']);
const toStraits = (s: GameState, search = 'search-desk', caught = 'caught-hide') => walk(toFlat(s), [search, 'bed-mirror', caught]);
const toNight = (s: GameState, nora = 'nora-kind') => walk(toStraits(s), ['bar-cool', 'ashby-evie', nora, ...(nora === 'nora-go' ? [] : ['boy-nora'])]);
const prefer = ['cover-quiet', 'first-sleep', 'tan-listen', 'search-desk', 'bed-mirror', 'caught-hide', 'bar-cool', 'ashby-evie', 'nora-kind', 'boy-nora', 'harbour-quiet', 'night-alone'];
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
  expect(paid.phase).toBe('departure');
  expect(ids(paid)).toEqual(['first-hawker', 'first-salon', 'first-sleep']);
  expect([paid.choices['c12.cover'], paid.choices['own.campaign-location']]).toEqual(['campaign', 'singapore']);
  expect(text(paid)).toContain('People always say yes to money they’ve already spent.');
  expect(text(paid)).toContain('Do give my love to Mrs Tan.');
  // A man she chose can come with her.
  const julian = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const flew = walk(start(julian), ['begin', 'cover-julian']);
  expect([flew.choices['c12.cover'], flew.choices['c12.with']]).toEqual(['with', 'julian']);
  expect(text(flew)).toContain('I will ask where you’d like dinner');
});

it('lets the city keep her tab and her Friday, or lets her sleep', () => {
  const landed = walk(start({ 'c9.rent': 'paid' }), ['begin', 'cover-quiet']);
  expect(text(landed)).toContain('a hotel with a ship on its roof');
  const coffee = c12(landed, 'first-hawker');
  expect([coffee.phase, coffee.choices['c12.first'], coffee.facts.includes('c12.tab')]).toEqual(['emerald', 'hawker', true]);
  expect(text(coffee)).toContain('Every month she come, she pay one hundred dollars on your tab.');
  const hair = c12(landed, 'first-salon');
  expect(hair.facts).toContain('c12.salon');
  expect(text(hair)).toContain('Madame Laurent chose this, you know.');
  expect(text(hair)).toContain('It pays the rent on the flat that watches mine in London');
  expect(text(c12(withFlags(landed, { 'c9.rent': undefined }), 'first-salon'))).toContain('I already know whose initial is in it.');
  expect(text(c12(landed, 'first-sleep'))).toContain('Emerald Hill. Before I lose my nerve.');
});

it('lets Mrs Tan greet her by what happened on the phone, and gives her the key', () => {
  const greet = (call: string | undefined) => text(toHill(start({ 'c8.call': call })));
  expect(greet('evie')).toContain('You came. I said come and see them, and you came.');
  expect(greet('ask')).toContain('You rang me back. You asked me when they came.');
  expect(greet('down')).toContain('You put the phone down on me.');
  expect(greet(undefined)).toContain('Evie? No. Evie?');
  const hill = toHill(start());
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
  expect(text(desk)).not.toContain('a key in the lock');
  expect(ids(desk)).toEqual(['bed-lie', 'bed-drawer', 'bed-mirror']);
  const drawer = c12(desk, 'bed-drawer');
  expect([drawer.choices['c12.bed'], drawer.facts.includes('c12.note')]).toEqual(['drawer', true]);
  expect(text(drawer)).toContain('Not even for her. Especially not for her.');
  expect(leverageBoard(drawer).holds.map((a) => a.id)).toContain('note');
  expect(text(c12(desk, 'bed-lie'))).toContain('green and bitter, like a stem snapped off');
  const mirror = c12(desk, 'bed-mirror');
  expect(text(mirror)).toContain('I have been wearing a dead woman’s mouth for two months');
  expect(text(mirror)).toContain('And then, in the quiet, a key in the lock.');
  expect(ids(mirror)).toEqual(['caught-hide', 'caught-evie', 'caught-own']);
  expect(text(c12(flat, 'search-wardrobe'))).toContain('an unused boarding pass for Penang');
  expect(text(c12(flat, 'search-balcony'))).toContain('a single white orchid in a pot');
  const hid = c12(mirror, 'caught-hide');
  expect([hid.phase, hid.choices['act3.singapore']]).toEqual(['straits', 'key']);
  expect(text(hid)).toContain('STRAITS PROPERTY SERVICES · THE MARLOWE HOTEL, 4TH FLOOR');
  const tenant = c12(mirror, 'caught-evie');
  expect(tenant.choices['act3.singapore']).toBe('moved-in');
  expect(text(tenant)).toContain('She’s moved in.');
  const own = c12(mirror, 'caught-own');
  expect([own.choices['act3.singapore'], own.facts.includes('c12.nine')]).toEqual(['everything', true]);
});

it('brings every road to the Marlowe, and lets Ashby say "a friend of hers"', () => {
  const roads = toStraits(start({ 'act3.ally.iris': 'in', 'c7.robe': 'coats', 'c9.names-open': 'end' }));
  expect(text(roads)).toContain('His name is Ashby. Tell him I sent you');
  expect(text(roads)).toContain('the matchbook from the pocket of her coat');
  expect(text(roads)).toContain('somebody gave her name to the wrong people');
  expect(text(roads)).toContain('Evie. Jesus. Evie Vale.');
  expect(ids(roads)).toEqual(['bar-flirt', 'bar-truth', 'bar-cool']);
  const kit = c12(roads, 'bar-flirt');
  expect([kit.phase, kit.facts.includes('c12.kit')]).toEqual(['straits', true]);
  expect(text(kit)).toContain('asked me if I knew anybody with a boat');
  expect(text(kit)).toContain('He puts his glass down on the table very slowly');
  expect(text(c12(roads, 'bar-truth'))).toContain('the boat thing was never a joke to him');
  const past = c12(roads, 'bar-cool');
  expect(ids(past)).toEqual(['ashby-evie', 'ashby-press', 'ashby-truth']);
  // Nothing to lay on the bar: no pressing him.
  const bare = { 'c11.catalogue': 'leave', 'c8.list': undefined };
  expect(ids(c12(toStraits(start(bare), 'search-desk', 'caught-evie'), 'bar-cool'))).toEqual(['ashby-evie', 'ashby-truth']);
  const pressed = c12(past, 'ashby-press');
  expect([pressed.phase, pressed.choices['c12.statement']]).toEqual(['sister', 'recorded']);
  expect(text(pressed)).toContain('My name is Colin Ashby.');
  expect(text(pressed)).toContain('It came down from upstairs. From a friend of hers.');
  expect(text(pressed)).toContain('White orchids. She hated orchids.');
  const ghost = c12(past, 'ashby-evie');
  expect([ghost.choices['c12.statement'], ghost.facts.includes('c12.ashby')]).toEqual([undefined, true]);
  expect(text(walk(toStraits(start({ 'c9.kessler': 'follow' })), ['bar-cool', 'ashby-truth']))).toContain('Another one who liked boats.');
});

it('puts her at Nora’s door, and every answer carries the seed', () => {
  const door = walk(toStraits(start()), ['bar-cool', 'ashby-evie']);
  expect(text(door)).toContain('Nell?');
  expect(ids(door)).toEqual(['nora-truth', 'nora-kind', 'nora-go']);
  for (const id of ['nora-truth', 'nora-kind', 'nora-go']) {
    const after = c12(door, id);
    expect(after.phase).toBe(id === 'nora-go' ? 'night' : 'sister');
    expect([after.choices['act3.nell'], after.choices['act3.celeste-knew']]).toEqual(['known', 'seeded']);
    expect(after.facts).toEqual(expect.arrayContaining(['c12.nell', 'c12.sunday-call']));
    expect(text(after)).toMatch(/so (terribly )?sorry/);
  }
  const truth = c12(door, 'nora-truth');
  expect(truth.choices['act3.ally.nora']).toBe('in');
  expect(text(truth)).toContain('The black was always her friend’s.');
  expect(text(truth)).toContain('Auntie Nell?');
  expect(ids(truth)).toEqual(['boy-hold', 'boy-friend', 'boy-nora']);
  const told = c12(truth, 'boy-friend');
  expect([told.phase, told.choices['c12.boy']]).toEqual(['night', 'friend']);
  expect(text(told)).toContain('She was on her way.');
  expect(text(told)).toContain('I want to be in the room.');
  expect(text(c12(truth, 'boy-hold'))).toContain('You smell different.');
  expect(text(c12(c12(door, 'nora-kind'), 'boy-nora'))).toContain('I lied to her in her own kitchen');
  expect(c12(door, 'nora-kind').choices['act3.ally.nora']).toBeUndefined();
  expect(text(c12(door, 'nora-go'))).toContain('Whoever sent you, tell them I know.');
});

it('sends Maya from London to the harbour, and ends alone unless a man came', () => {
  const night = toNight(start({ 'c4.mutual-interest': undefined }));
  expect(text(night)).toContain('You’ve met Nora. Such a sweet girl.');
  expect(text(night)).toContain('London misses you.');
  expect(text(toNight(start({ 'c6.maya': 'restored' })))).toContain('A TAXI? who are you.');
  expect(text(toNight(start({ 'c6.maya': 'distant' })))).toContain('You do not have the right to write to Maya.');
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
  const came = walk(start(julian), ['begin', 'cover-julian', 'first-sleep', 'tan-listen', 'search-desk', 'bed-mirror', 'caught-hide', 'bar-cool', 'ashby-evie', 'nora-kind', 'boy-nora', 'harbour-quiet']);
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
  const truth = finish(walk(toStraits(start()), ['bar-cool', 'ashby-press', 'nora-truth']));
  const board = leverageBoard(truth);
  expect(board.holds.map((a) => a.id)).toEqual(expect.arrayContaining(['schedule', 'site-report', 'ashby', 'nora', 'nell']));
  expect(board.held[0].holds).toEqual(expect.arrayContaining(['Singapore: where you went, and whom you saw', 'A photograph of Maya leaving work, taken from across the road']));
  expect(text(truth)).toContain('Beside it you pin Nora’s photograph');
  expect(decodeSave(encodeSave(truth))).toEqual(truth);
});

it('reaches the end from every option in every scene', () => {
  const s0 = start({ 'own.campaign': 'taken', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined });
  const drive = (wants: string[]) => {
    let x = c12(s0, 'begin');
    for (let i = 0; i < 25 && ids(x).length; i++) x = c12(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['cover-campaign'], ['cover-julian', 'evening-julian', 'evening-julian-no-sex', 'evening-stay'], ['cover-julian', 'evening-julian', 'evening-leave'],
    ['first-hawker'], ['first-salon'], ['tan-evie'], ['tan-truth'], ['search-wardrobe'], ['search-balcony'], ['bed-lie'], ['bed-drawer'],
    ['caught-evie'], ['caught-own'], ['bar-flirt'], ['bar-truth'], ['ashby-press'], ['ashby-truth'],
    ['nora-truth', 'boy-hold'], ['nora-truth', 'boy-friend'], ['nora-kind', 'boy-hold'], ['nora-go'], ['harbour-name'], ['harbour-coffee'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter12.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter12.' + w);
  }
}, 120_000);
