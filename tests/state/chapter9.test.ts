import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden7 from '../fixtures/rev19-chapter7-golden.json';
import golden8 from '../fixtures/rev19-chapter8-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { band9, chapter9Choices, ORACLE_FEE } from '../../src/content/chapter9';
import { resolveSceneArt } from '../../src/ui/scene-art';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter9Choices(s).map((c) => c.id.replace(/^chapter9\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
/** Only what the last choice added to the page. */
const added = (before: GameState, after: GameState) => text({ ...after, history: after.history.slice(before.history.length) });
const choose9 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER9_CHOOSE', id: 'chapter9.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
/** The second beats (witness, name, and every set piece's moment) settle on their neutral pick when a walk asks for a hub move instead. */
const settle9 = ['terrace-leave', 'marcus-deflect', 'name-dark', 'oracle-close', 'chain-one', 'rook-square', 'clara-source', 'maya-fine', 'door-keep', 'table-sit', 'auction-leave'];
const settled = (s: GameState, id?: string) => {
  let x = s;
  for (let i = 0; i < 4 && !(id && ids(x).includes(id)); i++) {
    const pending = ids(x).find((y) => settle9.includes(y));
    if (!pending) break;
    x = choose9(x, pending);
  }
  return x;
};
const c9 = (s: GameState, id: string) => choose9(settled(s, id), id);
const walk = (s: GameState, path: string[]) => path.reduce(c9, s);
const complete7 = (name: string) => replay(golden7.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const complete8 = (name: string) => replay(golden8.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** A bare own-power biography: no witness, lever, evidence or ally unless a case adds one. */
const bare = {
  'c6.celeste': undefined, 'c6.oracle-seen': undefined, 'c6.proof-opened': undefined, 'c6.photo-custody': undefined,
  'c3.verified-date': undefined, 'c5.editor-contact': undefined, 'c6.maya': undefined, 'own.alliance.rook': undefined,
  'own.alliance.editor': undefined, 'own.alliance.maya': undefined, 'own.crossover': 'none', 'own.exposed': undefined,
};
const noMarcusNoItem = (s: GameState) => {
  const x = structuredClone(s);
  x.day.records = x.day.records.filter((r) => r.key !== 'mission.marcus-memory');
  x.mission.capture = null;
  if (x.mission.token === 'evelyn') x.mission.token = undefined as never;
  return x;
};
const hub = (flags: Record<string, string | undefined> = {}) => {
  const base = withFlags(complete8('own-records-stop'), { ...bare, ...flags });
  // The new scenes before the hub (the Usual Table, the auction) settle on their neutral picks.
  return settled(walk(noMarcusNoItem(base), ['begin', 'arrive-begin']));
};

it('opens after an own-power Chapter 8 ending, or through the placeholder for other lanes, and stays closed in production', () => {
  expect(ids(complete8('own-records-stop'))).toEqual(['begin']);
  expect(ids(complete7('outside-placeholder'))).toEqual(['begin-placeholder']);
  expect(ids(complete7('own-records-stop'))).toEqual([]);
  const placeholder = walk(complete7('outside-placeholder'), ['begin-placeholder']);
  expect([`${placeholder.scene}.${placeholder.phase}`, placeholder.choices['c9.entered']]).toEqual(['chapter9.arrive', 'outside']);
  expect(text(placeholder)).toContain('in development');
  vi.stubEnv('VITE_EVE_CHAPTER9', '');
  expect(chapter9Choices(complete8('own-records-stop'))).toEqual([]);
  expect(JSON.stringify(availableIntents(complete8('own-records-stop')))).not.toContain('CHAPTER9');
});

it('frames the own-power arrival by whether she borrowed a door', () => {
  const alone = c9(withFlags(complete8('own-records-stop'), { 'own.crossover': 'none' }), 'begin');
  expect(text(alone)).toContain('without borrowing a single door');
  const borrowed = c9(withFlags(complete8('own-records-stop'), { 'own.crossover': 'executive' }), 'begin');
  expect(text(borrowed)).toContain('whose door you borrowed');
  expect(text(alone)).toContain('Project Eve is a product. Axiom is a client.');
  expect(resolveSceneArt(alone).art?.kind).toBe('environment');
});

it('gates each assemble move on what the route actually holds', () => {
  expect(ids(hub())).toEqual(['assemble-name', 'assemble-stop']);
  expect(ids(hub({ 'c6.celeste': 'let-be' }))).toContain('assemble-witness');
  expect(ids(hub({ 'c6.oracle-seen': 'yes' }))).toContain('assemble-oracle');
  expect(ids(hub({ 'c6.proof-opened': 'yes' }))).toContain('assemble-oracle');
  expect(ids(hub({ 'c6.photo-custody': 'phone' }))).toContain('assemble-evidence');
  expect(ids(hub({ 'c3.verified-date': 'yes' }))).toContain('assemble-evidence');
  expect(ids(hub({ 'own.alliance.rook': 'owed' }))).toContain('assemble-rook');
  expect(ids(hub({ 'own.alliance.rook': 'spent' }))).not.toContain('assemble-rook');
  expect(ids(hub({ 'c5.editor-contact': 'yes' }))).toContain('assemble-editor');
  expect(ids(hub({ 'c5.editor-contact': 'yes', 'own.alliance.editor': 'spent' }))).not.toContain('assemble-editor');
  expect(ids(hub({ 'c6.maya': 'restored' }))).toContain('assemble-maya-bounded');
  expect(ids(hub({ 'c6.maya': 'restored', 'own.alliance.maya': 'used' }))).not.toContain('assemble-maya-bounded');
  expect(ids(hub({ 'own.crossover': 'institutional' }))).toContain('assemble-crossover-contact');
  // Every qualifying ally is its own option.
  expect(ids(hub({ 'own.alliance.rook': 'owed', 'c5.editor-contact': 'yes', 'c6.maya': 'restored', 'own.crossover': 'executive' })).filter((x) => /rook|editor|maya|crossover/.test(x))).toEqual([
    'assemble-rook', 'assemble-editor', 'assemble-maya-bounded', 'assemble-crossover-contact',
  ]);
});

it('keeps the name and a thin case reachable on the free-agent core alone', () => {
  const named = walk(hub(), ['assemble-name', 'assemble-stop']);
  expect([named.choices['case.name'], named.choices['c9.name-road'], named.choices['case.strength']]).toEqual(['celeste', 'public', 'thin']);
  expect(text(named)).toContain('You disappeared before breakfast.');
  expect(named.choices['own.exposed']).toBe('yes');
  const floored = walk(hub(), ['assemble-stop']);
  expect([floored.choices['case.name'], floored.choices['c9.name-road'], floored.choices['case.strength']]).toEqual(['celeste', 'floor', 'thin']);
  expect(text(floored)).toContain('have been refusing to say it');
  expect(text(floored)).toContain('It is thin.');
});

it('bands the strength by weight: thin 0–1, supported 2, strong 3+', () => {
  expect([0, 1, 2, 3, 8].map(band9)).toEqual(['thin', 'thin', 'supported', 'strong', 'strong']);
  const two = walk(hub({ 'c6.oracle-seen': 'yes' }), ['assemble-oracle', 'assemble-name', 'assemble-stop']);
  expect(two.choices['case.strength']).toBe('supported');
  expect(text(two)).toContain('It holds up, mostly.');
  const three = walk(hub({ 'c6.oracle-seen': 'yes', 'c6.photo-custody': 'phone' }), ['assemble-oracle', 'assemble-evidence', 'assemble-name', 'assemble-stop']);
  expect([three.choices['case.strength'], three.choices['c9.lever'], three.choices['c9.chain']]).toEqual(['strong', 'oracle', 'built']);
  expect(text(three)).toContain('It holds. A named board member');
  // The floor never adds weight.
  expect(walk(hub({ 'c6.oracle-seen': 'yes' }), ['assemble-oracle', 'assemble-stop']).choices['case.strength']).toBe('thin');
});

it('keeps the witness firsthand-bounded, with the Marcus fallback and the cooler pressed line', () => {
  const celesteHub = hub({ 'c6.celeste': 'let-be' });
  const celeste = walk(celesteHub, ['assemble-witness']);
  expect(celeste.choices['c9.witness']).toBe('confirmed');
  expect(text(celeste)).toContain('I’ll tell you it was her.');
  expect(added(celesteHub, celeste)).not.toMatch(/ORACLE|clinic|Axiom/);
  const pressed = walk(hub({ 'c6.celeste': 'pressed' }), ['assemble-witness']);
  expect(text(pressed)).toContain('She doesn’t touch your arm this time.');
  const metMarcus = noMarcusNoItem(withFlags(complete8('own-records-stop'), bare));
  metMarcus.day.records.push({ key: 'mission.marcus-memory', layer: 'claim', text: 'Marcus claims Evelyn left the Singapore gathering early.', source: 'Marcus’s answer to your question', event: 1 });
  const marcus = walk(metMarcus, ['begin', 'arrive-begin', 'assemble-witness']);
  expect(marcus.choices['c9.witness']).toBe('confirmed-pro');
  expect(text(marcus)).toContain('Not why.');
  expect(ids(hub({}))).not.toContain('assemble-witness');
});

it('offers the Celeste witness after the name, with the variant line and still one weight (D7)', () => {
  const named = walk(hub({ 'c6.celeste': 'let-be' }), ['assemble-name', 'name-dark']);
  expect(ids(named)).toContain('assemble-witness');
  const after = walk(named, ['assemble-witness', 'assemble-stop']);
  expect(text(after)).toContain('Ask yourself why I’m still telling you the truth.');
  expect(text(after)).not.toContain('I’ll tell you it was her.');
  expect([after.choices['c9.witness'], after.choices['case.strength']]).toEqual(['confirmed', 'supported']);
});

it('charges the inferred ORACLE on the own-power road only, never blocking', () => {
  const paid = walk(hub({ 'c6.proof-opened': 'yes', 'own.cash': '100' }), ['assemble-oracle']);
  expect([paid.choices['c9.lever'], paid.choices['c9.oracle-fee'], paid.choices['own.cash']]).toEqual(['oracle-inferred', 'paid', String(100 - ORACLE_FEE)]);
  const unpaid = walk(hub({ 'c6.proof-opened': 'yes', 'own.cash': '20' }), ['assemble-oracle']);
  expect([unpaid.choices['c9.oracle-fee'], unpaid.choices['own.cash']]).toEqual(['unpaid', '0']);
  const seen = walk(hub({ 'c6.oracle-seen': 'yes', 'own.cash': '100' }), ['assemble-oracle']);
  expect([seen.choices['c9.lever'], seen.choices['own.cash']]).toEqual(['oracle', '100']);
  const outside = walk(withFlags(complete7('outside-placeholder'), { 'c6.oracle-seen': undefined, 'c6.proof-opened': 'yes', 'own.cash': '100' }), ['begin-placeholder', 'arrive-begin', 'assemble-oracle']);
  expect([outside.choices['c9.lever'], outside.choices['own.cash'], outside.choices['c9.oracle-fee']]).toEqual(['oracle-inferred', '100', undefined]);
});

it('spends each ally it uses and reads the name road editor → crossover → rook → public', () => {
  const rook = walk(hub({ 'own.alliance.rook': 'owed' }), ['assemble-rook', 'assemble-name']);
  expect([rook.choices['own.alliance.rook'], rook.choices['c9.rook-piece'], rook.choices['c9.name-road']]).toEqual(['spent', 'unverified', 'rook']);
  const editor = walk(hub({ 'c5.editor-contact': 'yes', 'own.alliance.rook': 'spent', 'own.crossover': 'executive' }), ['assemble-editor', 'assemble-name']);
  expect([editor.choices['own.alliance.editor'], editor.choices['c9.name-road']]).toEqual(['spent', 'editor']);
  const door = walk(hub({ 'own.crossover': 'institutional', 'own.alliance.rook': 'spent' }), ['assemble-crossover-contact', 'assemble-name']);
  expect([door.choices['c9.crossover'], door.choices['c9.name-road']]).toEqual(['deepened', 'crossover']);
  const maya = walk(hub({ 'c6.maya': 'restored' }), ['assemble-maya-bounded', 'assemble-stop']);
  expect(maya.choices['own.alliance.maya']).toBe('used');
  expect(text(maya)).toContain('lighter an ally or two');
  expect(text(maya)).not.toMatch(/Celeste on the board|Meridian’s board is/);
});

it('plays a real Chapter 9 to complete on every captured road, and every ending encodes', () => {
  for (const name of ['own-records-stop', 'pivot-own-rook-debt', 'own-maya-nothing']) {
    let s = walk(complete8(name), ['begin', 'arrive-begin']);
    for (let i = 0; i < 30 && ids(s).some((x) => x !== 'assemble-stop'); i++) s = c9(s, ids(s).find((x) => x !== 'assemble-stop')!);
    s = walk(s, ['assemble-stop', 'resolve-end']);
    expect(`${s.scene}.${s.phase}`, name).toBe('chapter9.complete');
    expect(chapter9Choices(s)).toEqual([]);
    expect(text(s)).toContain('Celeste has seen my face too');
    for (const [k, v] of Object.entries(s.choices)) if (/^(c9\.|case\.)/.test(k)) expect(v.length, k).toBeLessThanOrEqual(80);
    expect(replay(s.ledger, 19)).toEqual(s);
    expect(decodeSave(encodeSave(s))).toEqual(s);
  }
});

it('lands last week’s choices the next morning, sets the witness scene, and ends on the orchid', () => {
  const morning = (flags: Record<string, string | undefined>) => text(c9(withFlags(complete8('own-records-stop'), flags), 'begin'));
  expect(morning({ 'c8.gala': 'carpet' })).toContain('a lawyer’s letter, hand-delivered');
  expect(morning({ 'c8.press': 'run' })).toContain('a lawyer’s letter, hand-delivered');
  expect(morning({ 'c7.theo': 'curious' })).toContain('did not exist eighteen months ago');
  expect(morning({ 'c8.dig-rival': 'seen' })).toContain('the man in the good coat from the registry');
  expect(morning({ 'c8.rook-report': 'false' })).toContain('silent for three days');
  const quiet = morning({ 'c8.gala': undefined, 'c8.press': undefined, 'c7.theo': undefined, 'c8.dig-rival': undefined, 'c8.rook-report': undefined });
  expect(quiet).not.toMatch(/lawyer’s letter|eighteen months|good coat|silent for three days/);
  expect(text(walk(hub({ 'c6.celeste': 'let-be' }), ['assemble-witness']))).toContain('holds your hands a moment too long');
  expect(text(walk(hub({ 'c6.celeste': 'pressed' }), ['assemble-witness']))).toContain('She does not stand when you arrive.');
  const done = walk(hub(), ['assemble-name', 'assemble-stop', 'resolve-end']);
  expect(`${done.scene}.${done.phase}`).toBe('chapter9.complete');
  expect(text(done)).toContain('“Breakfast? — C.”');
});

// ── Deepening pass 2: second beats ──

it('gives the witness a second beat: Celeste asks, Marcus collects', () => {
  const asked = c9(hub({ 'c6.celeste': 'let-be' }), 'assemble-witness');
  expect(text(asked)).toContain('Do you like being her?');
  expect(ids(asked)).toEqual(['terrace-truth', 'terrace-turn', 'terrace-leave']);
  const turned = c9(asked, 'terrace-turn');
  expect([turned.choices['c9.terrace'], turned.choices['c9.open']]).toEqual(['turn', undefined]);
  expect(text(turned)).toContain('That’s rather the point.');
  expect(ids(turned)).toContain('assemble-name');
  // The second beat adds no case weight.
  expect(Object.keys(turned.choices).filter((k) => k.startsWith('c9.took.'))).toEqual(['c9.took.witness']);
});

it('gives the name its own quiet beat before the case goes on', () => {
  const named = c9(hub(), 'assemble-name');
  expect(ids(named)).toEqual(['name-photos', 'name-dark', 'name-walk']);
  const photos = c9(named, 'name-photos');
  expect([photos.choices['c9.name-beat'], photos.phase]).toEqual(['photos', 'assemble']);
  expect(text(photos)).toContain('She was looking at me in every frame she is in.');
  expect(ids(photos)).toEqual(['assemble-stop']);
});

it('lets her owe Marcus: a leash, and the Predator route’s first door into Helix', () => {
  const metMarcus = noMarcusNoItem(withFlags(complete8('own-records-stop'), bare));
  metMarcus.day.records.push({ key: 'mission.marcus-memory', layer: 'claim', text: 'Marcus claims Evelyn left the Singapore gathering early.', source: 'Marcus’s answer to your question', event: 1 });
  const asked = walk(metMarcus, ['begin', 'arrive-begin', 'assemble-witness']);
  expect(text(asked)).toContain('What did you take from my party, Ms Vale?');
  expect(ids(asked)).toEqual(['marcus-deflect', 'marcus-debt']);
  const owed = c9(asked, 'marcus-debt');
  expect([owed.choices['own.marcus'], owed.choices['c9.marcus']]).toEqual(['owed', 'debt']);
  expect(c9(asked, 'marcus-deflect').choices['own.marcus']).toBeUndefined();
});

it('has Theo’s voicemail tell her first, if she spent the night', () => {
  const night = walk(withFlags(complete8('own-records-stop'), { 'c7.evening': 'theo', 'c7.evening-outcome': 'intimate-no-sex' }), ['begin']);
  expect(text(night)).toContain('I’m telling you so you hear it from me first');
  expect(text(night)).not.toContain('Call me before I decide what that is.');
  const curious = walk(withFlags(complete8('own-records-stop'), { 'c7.theo': 'curious' }), ['begin']);
  expect(text(curious)).toContain('Call me before I decide what that is.');
});

it('plays every hub move as a set piece with a moment of its own, adding no case weight', () => {
  const oracle = choose9(hub({ 'c6.oracle-seen': 'yes' }), 'assemble-oracle');
  expect(text(oracle)).toContain('SUBJECT WILL ACCEPT THE IDENTITY WILLINGLY');
  expect(ids(oracle)).toEqual(['oracle-score', 'oracle-close']);
  expect(choose9(oracle, 'oracle-score').choices['c9.oracle-beat']).toBe('score');

  const chain = choose9(hub({ 'c6.photo-custody': 'phone' }), 'assemble-evidence');
  expect(text(chain)).toContain('the copy shop on the corner');
  const split = choose9(chain, 'chain-split');
  expect([split.choices['c9.chain-kept'], split.choices['c9.open']]).toEqual(['split', undefined]);

  const rook = choose9(hub({ 'own.alliance.rook': 'owed' }), 'assemble-rook');
  expect(text(rook)).toContain('a small neat tick');
  expect(text(choose9(rook, 'rook-ask'))).toContain('Someone who knew her before you did.');

  const clara = choose9(hub({ 'c5.editor-contact': 'yes' }), 'assemble-editor');
  expect(ids(clara)).toEqual(['clara-name', 'clara-source']);
  expect(choose9(clara, 'clara-name').choices['c9.clara']).toBe('name');

  const maya = choose9(hub({ 'c6.maya': 'restored' }), 'assemble-maya-bounded');
  expect(text(maya)).toContain('Are you in danger?');
  expect(text(choose9(maya, 'maya-fine'))).toContain('You say it worse than most.');

  const julian = choose9(hub({ 'own.crossover': 'executive' }), 'assemble-crossover-contact');
  expect(text(julian)).toContain('Did you find what you came for?');
  const sloane = choose9(hub({ 'own.crossover': 'institutional' }), 'assemble-crossover-contact');
  expect(text(choose9(sloane, 'door-keep'))).toContain('People who decide in cars decide badly.');

  // The moments add no weight: two moves with their moments still band as supported.
  const two = walk(hub({ 'c6.oracle-seen': 'yes', 'c6.maya': 'restored' }), ['assemble-oracle', 'oracle-score', 'assemble-maya-bounded', 'maya-honest', 'assemble-stop']);
  expect(two.choices['case.strength']).toBe('supported');
});

it('ends the day on the floor, the seventh name, and the orchid carried in', () => {
  const done = walk(hub(), ['assemble-name', 'assemble-stop', 'resolve-end']);
  expect(text(done)).toContain('Sourced. Argued. Missing.');
  expect(text(done)).toContain('And the seventh name surfaces');
  expect(text(done)).toContain('The stairwell door is still swinging');
  expect(text(done)).toContain('as if it were a guest');
});

it('sets the Usual Table before the hub, and the auction if the Aster piece ran', () => {
  const base = withFlags(complete8('own-records-stop'), { ...bare, 'c5.published': undefined });
  const table = walk(noMarcusNoItem(base), ['begin', 'arrive-begin']);
  expect(text(table)).toContain('By the Laurent fund, madame. As it always was.');
  expect(ids(table)).toEqual(['table-sit', 'table-ask', 'table-cancel']);
  const asked = choose9(table, 'table-ask');
  expect([asked.choices['c9.table'], asked.choices['c9.open']]).toEqual(['ask', undefined]);
  expect(asked.facts).toContain('c9.table');
  expect(ids(asked)).toContain('assemble-name');
  expect(text(choose9(table, 'table-cancel'))).toContain('Only in your honour.');

  const famous = walk(noMarcusNoItem(withFlags(complete8('own-records-stop'), { ...bare, 'c5.published': 'yes', 'c5.concept': 'provocative', 'c5.image-use': undefined })), ['begin', 'arrive-begin', 'table-sit']);
  expect(text(famous)).toContain('Lot fourteen is you: a signed print of the Aster portrait: the famous back.');
  expect(text(famous)).toContain('For the Laurent Sovereign Fund');
  expect(ids(famous)).toEqual(['auction-thank', 'auction-ask', 'auction-leave']);
  const thanked = choose9(famous, 'auction-thank');
  expect([thanked.choices['c9.auction'], thanked.choices['c9.open']]).toEqual(['thank', undefined]);
  expect(text(thanked)).toContain('the back of a woman’s head');
  // No case weight from either scene.
  expect(Object.keys(thanked.choices).filter((k) => k.startsWith('c9.took.'))).toEqual([]);

  // Other lanes reach the hub straight from arrive.
  const outside = walk(complete7('outside-placeholder'), ['begin-placeholder', 'arrive-begin']);
  expect(ids(outside)).not.toContain('table-sit');
});
