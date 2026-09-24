import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden7 from '../fixtures/rev19-chapter7-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { resolveSceneArt } from '../../src/ui/scene-art';

beforeEach(() => {
  for (const n of [6, 7, 8]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c8 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER8_CHOOSE', id: 'chapter8.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c8, s);
const complete7 = (name: string) => replay(golden7.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** A clean leverage decision: no audience, ally, Julian access or Sloane contact unless a case adds one. */
const clean = {
  'c5.published': undefined, 'own.alliance.rook': undefined, 'c5.editor-contact': undefined, 'c6.maya': undefined,
  'c4.audit-paid': undefined, 'own.exposed': undefined,
};
const leverage = (flags: Record<string, string | undefined> = {}) =>
  walk(withFlags(complete7('own-records-stop'), { ...clean, ...flags }), ['begin', 'cost-continue']);

it('opens only after an own-power Chapter 7 ending, and stays closed in production', () => {
  expect(ids(complete7('own-records-stop'))).toEqual(['begin']);
  expect(ids(complete7('outside-placeholder'))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER8', '');
  expect(chapter8Choices(complete7('own-records-stop'))).toEqual([]);
  expect(JSON.stringify(availableIntents(complete7('own-records-stop')))).not.toContain('CHAPTER8');
});

it('names Meridian at the wall only if she found it, and brings in Sloane only if she was seen', () => {
  const found = c8(complete7('own-records-stop'), 'begin');
  expect(text(found)).toContain('at Meridian and whoever sits on its board');
  expect(text(found)).toContain('No one has noticed you yet.');
  const unnamed = c8(complete7('own-maya-nothing'), 'begin');
  expect(text(unnamed)).toContain('something you cannot name yet');
  expect(text(unnamed)).not.toContain('Meridian');
  const seen = c8(withFlags(complete7('own-records-stop'), { 'own.exposed': 'yes' }), 'begin');
  expect(text(seen)).toContain('I could give you cover');
  const broke = c8(withFlags(complete7('own-records-stop'), { 'own.cash': '20' }), 'begin');
  expect(text(broke)).toContain('it counts back shorter than it did');
  expect(resolveSceneArt(found).art?.kind).toBe('environment');
});

it('offers one way over the wall per road, with the refusal always there', () => {
  expect(ids(leverage())).toEqual(['leverage-refuse-cross']);
  expect(ids(leverage({ 'c5.published': 'yes' }))).toContain('leverage-audience');
  expect(ids(leverage({ 'own.exposed': 'yes' }))).toContain('leverage-institutional');
  // One ally, by priority: the sender's debt, then the editor, then Maya.
  expect(ids(leverage({ 'own.alliance.rook': 'owed', 'c5.editor-contact': 'yes', 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-rook']);
  expect(ids(leverage({ 'c5.editor-contact': 'yes', 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-editor']);
  expect(ids(leverage({ 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-maya']);
  expect(ids(leverage({ 'c6.maya': 'paused-by-maya' }))).not.toContain('leverage-maya');
});

it('reaches the same core turn by every road, recording the road and any crossover', () => {
  const cases: [Record<string, string>, string, string, string][] = [
    [{ 'c5.published': 'yes' }, 'leverage-audience', 'audience', 'none'],
    [{ 'own.alliance.rook': 'owed' }, 'leverage-rook', 'rook', 'none'],
    [{ 'c5.editor-contact': 'yes' }, 'leverage-editor', 'editor', 'none'],
    [{ 'c6.maya': 'restored' }, 'leverage-maya', 'maya', 'none'],
    [{ 'own.exposed': 'yes' }, 'leverage-institutional', 'institutional', 'institutional'],
    [{}, 'leverage-refuse-cross', 'dig', 'none'],
  ];
  for (const [flags, road, entered, crossover] of cases) {
    const s = c8(leverage(flags), road);
    expect(s.phase, road).toBe('advance');
    expect([s.choices['c8.meridian'], s.choices['c8.entered'], s.choices['own.crossover']], road).toEqual(['product', entered, crossover]);
    expect(text(s)).toContain('Project Eve is a product. Axiom is a client.');
    expect(text(s)).toContain(crossover === 'none' ? 'you would not let anyone open the door for you' : 'someone opened a door for you');
    expect(s.choices['route.lane']).toBe('own-power');
    expect(() => encodeSave(s)).not.toThrow();
  }
  const rook = c8(leverage({ 'own.alliance.rook': 'owed' }), 'leverage-rook');
  expect(rook.choices['own.alliance.rook']).toBe('spent');
  expect(text(rook)).toContain('a marker called, a patience spent');
  const maya = c8(leverage({ 'c6.maya': 'restored' }), 'leverage-maya');
  expect(maya.choices['own.alliance.maya']).toBe('used');
  expect(text(maya)).not.toContain('a marker called, a patience spent');
  const loud = c8(leverage({ 'c5.published': 'yes' }), 'leverage-audience');
  expect(loud.choices['own.exposed']).toBe('yes-deep');
});

it('keeps the hard way open at any budget: the dig costs $120 or is recorded unpaid', () => {
  const paid = c8(leverage({ 'own.cash': '300' }), 'leverage-refuse-cross');
  expect([paid.choices['c8.dig-fee'], paid.choices['own.cash']]).toEqual(['paid', '180']);
  const unpaid = c8(leverage({ 'own.cash': '50' }), 'leverage-refuse-cross');
  expect([unpaid.choices['c8.dig-fee'], unpaid.choices['own.cash']]).toEqual(['unpaid', '0']);
});

it('plays a real own-power Chapter 8 to complete, and the save authenticates', () => {
  let s = walk(complete7('pivot-own-rook-debt'), ['begin', 'cost-continue']);
  expect(ids(s)).toContain('leverage-rook');
  s = walk(s, ['leverage-rook', 'advance-continue']);
  expect(text(s)).toContain('The next room is the one with the name in it');
  expect(text(s)).not.toContain('Except you did not stand entirely alone this time');
  s = c8(s, 'close-end');
  expect(`${s.scene}.${s.phase}`).toBe('chapter8.complete');
  expect(chapter8Choices(s)).toEqual([]);
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter8.cost', 'chapter8.leverage', 'chapter8.advance', 'chapter8.close', 'chapter8.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});

it('lets her borrow Julian’s door once, remembered as a crossover without changing her road', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.method': undefined, 'c4.personal-withdrawn': undefined };
  expect(ids(leverage(julian))).toContain('leverage-executive');
  const s = walk(leverage(julian), ['leverage-executive', 'advance-continue']);
  expect([s.choices['own.crossover'], s.choices['c8.entered'], s.choices['route.lane']]).toEqual(['executive', 'executive', 'own-power']);
  expect(text(s)).toContain('someone opened a door for you');
  expect(text(s)).toContain('Except you did not stand entirely alone this time, and you know it.');
});
