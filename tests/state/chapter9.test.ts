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
const c9 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER9_CHOOSE', id: 'chapter9.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
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
  return walk(noMarcusNoItem(base), ['begin', 'arrive-begin']);
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
  const named = walk(hub({ 'c6.celeste': 'let-be' }), ['assemble-name']);
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
    for (let i = 0; i < 12 && ids(s).some((x) => x !== 'assemble-stop'); i++) s = c9(s, ids(s).find((x) => x !== 'assemble-stop')!);
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
