import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { optionalNpc, type GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices, adjacent7, opposite7, suggested7 } from '../../src/content/chapter7';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { resolveSceneArt } from '../../src/ui/scene-art';

beforeEach(() => {
  vi.stubEnv('VITE_EVE_CHAPTER6', '1');
  vi.stubEnv('VITE_EVE_CHAPTER7', '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c7, s);
const complete6 = (name: string) => replay(golden6.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
/** The own-power road on a real save (its suggestion is own-power, so confirm keeps it). */
const standing = () => walk(complete6('public-decline-hold'), ['begin', 'route-confirm']);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};

it('stays closed in production and never reaches older revisions', () => {
  vi.stubEnv('VITE_EVE_CHAPTER7', '');
  const done = complete6('public-decline-hold');
  expect(chapter7Choices(done)).toEqual([]);
  expect(JSON.stringify(availableIntents(done))).not.toContain('CHAPTER7');
});

it('opens on the confirm beat with the suggested road, two pivots and a break', () => {
  const s = c7(complete6('maximal-trade'), 'begin');
  expect(`${s.scene}.${s.phase}`).toBe('chapter7.confirm');
  const lane = suggested7(s);
  expect(lane).toBe(deriveRoute6(s)!.lane);
  expect(lane).toBe('outside');
  expect(text(s)).toContain('You went to the one source no institution authored');
  expect(ids(s)).toEqual(['route-confirm', ...adjacent7(lane).map((l) => 'route-pivot-' + l), 'route-break']);
  expect(adjacent7('outside').sort()).toEqual(['institutional', 'own-power']);
  expect(opposite7('outside')).toBe('executive');
  expect(resolveSceneArt(s).art?.kind).toBe('environment');
});

it('writes route.lane and route.entry from the choice; only own-power continues', () => {
  const confirm = c7(c7(complete6('maximal-trade'), 'begin'), 'route-confirm');
  expect([confirm.choices['route.lane'], confirm.choices['route.entry'], `${confirm.scene}.${confirm.phase}`]).toEqual(['outside', 'built', 'chapter7.complete']);
  expect(text(confirm)).toContain('[Chapter 7 · outside route — in development]');
  const pivot = c7(c7(complete6('maximal-trade'), 'begin'), 'route-pivot-own-power');
  expect([pivot.choices['route.lane'], pivot.choices['route.entry'], pivot.phase]).toEqual(['own-power', 'partial', 'standing']);
  const asked = c7(c7(complete6('maximal-trade'), 'begin'), 'route-break');
  expect(ids(asked)).toEqual(['confirm-break', 'step-back']);
  expect(ids(c7(asked, 'step-back'))).toContain('route-confirm');
  const broke = c7(asked, 'confirm-break');
  expect([broke.choices['route.lane'], broke.choices['route.entry'], broke.phase]).toEqual(['executive', 'unbuilt', 'complete']);
  for (const s of [confirm, pivot, broke]) expect(decodeSave(encodeSave(s))).toEqual(s);
});

it('weights seeds over the primary signal and breaks ties by the primary lane, then own-power first', () => {
  const base = withFlags(complete6('public-decline-hold'), {
    'c5.service': undefined, 'c5.published': undefined, 'c5.terms': undefined, 'c5.message-sloane': undefined,
    'c6.rook-proof': undefined, 'c6.oracle-seen': undefined, 'c6.verify-method': undefined, 'c6.photo-custody': undefined,
    'c6.counter-arranged': undefined, 'c3.rook-window': undefined, 'c3.compared-date': undefined, 'c3.verified-date': undefined,
  });
  base.mission = { ...base.mission, capture: null, token: 'benton' };
  const lane = (flags: Record<string, string | undefined>) => deriveRoute6(withFlags(base, flags))!.lane;
  expect(lane({ 'c6.resolve-action': 'resolve-challenge' })).toBe('institutional');
  expect(lane({ 'c6.resolve-action': 'resolve-hold', 'c6.rook-proof': 'supported', 'c6.oracle-seen': 'yes', 'c6.verify-method': 'prediction' })).toBe('outside');
  // Tie at 3: the primary signal's lane wins.
  expect(lane({ 'c6.resolve-action': 'resolve-challenge', 'c5.published': 'yes', 'c5.terms': 'refused' })).toBe('institutional');
  // Protect is lane-neutral: a 2–2 tie falls to the fixed order (own-power first).
  expect(lane({ 'c6.resolve-action': 'resolve-protect', 'c5.message-sloane': 'yes', 'c5.published': 'yes' })).toBe('own-power');
  expect(lane({ 'c6.resolve-action': 'resolve-protect', 'c5.message-sloane': 'yes', 'c5.service': 'julian' })).toBe('institutional');
  expect(deriveRoute6(withFlags(base, { 'c6.resolve-action': 'resolve-enforce', 'c6.exit-arrangement': 'julian-workroom', 'c5.service': 'julian', 'c6.exit-prep': 'deepened', 'c6.expectation-response': 'narrowed' }))!.overlay).toEqual(['kept']);
  expect(deriveRoute6(withFlags(base, { 'c6.resolve-action': 'resolve-enforce', 'c5.service': 'julian', 'c6.exit-prep': 'deepened', 'c6.expectation-response': 'refused' }))!.overlay).toEqual([]);
});

it('stands alone with money that follows actual cash', () => {
  const s = standing();
  expect([s.phase, s.choices['route.entry']]).toEqual(['standing', 'built']);
  expect(text(s)).toContain('You wake in a life with your name on all of it');
  expect(text(s)).toContain(Number(s.choices['own.cash']) >= 100 ? 'Enough to work with' : 'Barely enough, if nothing goes wrong.');
  expect(ids(s)).toEqual(['standing-begin']);
});

it('offers each pursuit only when she has the means', () => {
  const hub = c7(standing(), 'standing-begin');
  const offered = (flags: Record<string, string | undefined>) => ids(withFlags(hub, flags));
  const none = { 'c6.maya': undefined, 'c6.proof-opened': undefined, 'c5.published': undefined };
  expect(offered(none)).toEqual(['pursue-records', 'pursue-stop']);
  expect(offered({ ...none, 'c6.maya': 'restored' })).toContain('pursue-maya');
  expect(offered({ ...none, 'c6.maya': 'paused-by-maya' })).not.toContain('pursue-maya');
  expect(offered({ ...none, 'c6.proof-opened': 'yes' })).toContain('pursue-rook');
  expect(offered({ ...none, 'c5.published': 'yes' })).toContain('pursue-audience');
});

it('keeps the thread pullable alone: records only reaches a lead, even at $0 with the fee unpaid', () => {
  const broke = withFlags(c7(standing(), 'standing-begin'), { 'own.cash': '0' });
  const lead = walk(broke, ['pursue-records', 'pursue-stop']);
  expect([lead.phase, lead.choices['c7.finding'], lead.choices['c7.fee'], lead.choices['own.cash']]).toEqual(['close', 'lead', 'unpaid', '0']);
  expect(text(lead)).toContain('Meridian Holdings');
  const paid = walk(withFlags(c7(standing(), 'standing-begin'), { 'own.cash': '500' }), ['pursue-records']);
  expect([paid.choices['c7.fee'], paid.choices['own.cash']]).toEqual(['paid', '460']);
  const nothing = c7(c7(standing(), 'standing-begin'), 'pursue-stop');
  expect([nothing.choices['c7.finding'], text(nothing).includes('So is the money you kept.')]).toEqual(['none', true]);
});

it('closes on the second piece with the shape, and sets the Chapter 8 hooks', () => {
  const hub = withFlags(c7(standing(), 'standing-begin'), { 'c5.published': 'yes', 'c6.proof-opened': 'yes', 'own.cash': '500' });
  const sloaneBefore = hub.npcs.sloane.known.length;
  const exposed = walk(hub, ['pursue-audience', 'pursue-records']);
  expect([exposed.phase, exposed.choices['c7.finding'], exposed.choices['own.exposed']]).toEqual(['close', 'shape', 'yes']);
  expect(exposed.npcs.sloane.known).toHaveLength(sloaneBefore + 1);
  expect(text(exposed)).toContain('Sloane’s directorate knows the independent one is asking.');
  const owed = walk(hub, ['pursue-rook', 'rook-trade-debt']);
  expect([owed.phase, owed.choices['own.alliance.rook'], owed.choices['own.piece.rook'], owed.choices['own.piece.rook-verified']]).toEqual(['pursue', 'owed', 'board', 'no']);
  const traded = walk(hub, ['pursue-rook', 'rook-trade-fact']);
  expect(optionalNpc(traded, 'rook')?.known.at(-1)?.key).toBe('Evelynn gave the sender one held evidence detail.');
  const refused = walk(hub, ['pursue-rook', 'rook-refuse-trade']);
  expect([refused.phase, refused.choices['own.piece.rook']]).toEqual(['pursue', undefined]);
  expect(ids(refused)).not.toContain('pursue-rook');
});

it('plays a real own-power chapter to complete, and the save authenticates', () => {
  let s = walk(standing(), ['standing-begin', 'pursue-records']);
  s = c7(s, ids(s).includes('pursue-rook') ? 'pursue-rook' : 'pursue-stop');
  if (s.phase === 'pursue') s = c7(s, 'rook-trade-debt');
  s = c7(s, 'close-end');
  expect(`${s.scene}.${s.phase}`).toBe('chapter7.complete');
  expect(chapter7Choices(s)).toEqual([]);
  expect(text(s)).toContain('You know more than you did this morning, and you found it alone.');
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter7.confirm', 'chapter7.standing', 'chapter7.pursue', 'chapter7.close', 'chapter7.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});
