import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import type { GameEvent } from '../../src/state/actions';
import { optionalNpc, type GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices, adjacent7, opposite7, suggested7 } from '../../src/content/chapter7';
import { eveningPartners7 } from '../../src/content/chapter7-own';
import { currentPlace } from '../../src/ui/chapter4-presentation';
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
  const lead = walk(broke, ['pursue-records', 'records-pay', 'pursue-stop']);
  expect([lead.phase, lead.choices['c7.finding'], lead.choices['c7.fee'], lead.choices['own.cash']]).toEqual(['close', 'lead', 'unpaid', '0']);
  expect(text(lead)).toContain('Meridian Holdings');
  const paid = walk(withFlags(c7(standing(), 'standing-begin'), { 'own.cash': '500' }), ['pursue-records', 'records-pay']);
  expect([paid.choices['c7.fee'], paid.choices['own.cash']]).toEqual(['paid', '460']);
  const nothing = c7(c7(standing(), 'standing-begin'), 'pursue-stop');
  expect([nothing.choices['c7.finding'], text(nothing).includes('So is the money you kept.')]).toEqual(['none', true]);
});

it('closes on the second piece with the shape, and sets the Chapter 8 hooks', () => {
  const hub = withFlags(c7(standing(), 'standing-begin'), { 'c5.published': 'yes', 'c6.proof-opened': 'yes', 'own.cash': '500' });
  const sloaneBefore = hub.npcs.sloane.known.length;
  const exposed = walk(hub, ['pursue-audience', 'plant-subtle', 'exit-crowd', 'pursue-records', 'records-pay']);
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
  let s = walk(standing(), ['standing-begin', 'pursue-records', 'records-pay']);
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

// ── Heat-and-danger pass: each hub door is a scene with its own choice, resolving to the same piece ──

const richHub = () =>
  withFlags(c7(standing(), 'standing-begin'), { 'c5.published': 'yes', 'c6.proof-opened': 'yes', 'c6.maya': 'restored', 'own.cash': '500' });

it('opens each hub door as a scene with its own choice and place, and resolves to the same piece', () => {
  const hub = richHub();
  expect(text(hub)).toContain('You write the ways in on the back of an envelope');
  const records = c7(hub, 'pursue-records');
  expect([records.phase, ids(records)]).toEqual(['pursue', ['records-charm', 'records-pay']]);
  expect(currentPlace(records, 'x')).toBe('23:10 · Municipal registry · Night desk');
  const charmed = c7(records, 'records-charm');
  expect([charmed.choices['c7.fee'], charmed.choices['own.cash'], charmed.choices['own.piece.records']]).toEqual(['waived', '500', 'meridian']);
  expect(text(charmed)).toContain('scored through so hard the pen went through the card');
  expect(currentPlace(charmed, 'x')).toBe('x');
  for (const [pick, knows] of [['maya-truth', 'more'], ['maya-shield', 'little']] as const) {
    const maya = c7(c7(hub, 'pursue-maya'), pick);
    expect([maya.choices['own.maya-knows'], maya.choices['own.piece.maya'], maya.choices['c7.maya-photographed']]).toEqual([knows, 'directorate', 'yes']);
    expect(text(maya)).toContain('Whatever comes for you now knows her face.');
  }
  const rook = c7(hub, 'pursue-rook');
  expect(currentPlace(rook, 'x')).toBe('02:00 · The old ferry terminal');
  expect(text(c7(rook, 'rook-trade-debt'))).toContain('The woman under the timetable isn’t mine.');
});

it('plays the interview: three ways to plant the question, two ways home, the same warning', () => {
  const studio = c7(richHub(), 'pursue-audience');
  expect(ids(studio)).toEqual(['plant-subtle', 'plant-bold', 'plant-theo']);
  expect(text(studio)).toContain('The woman nobody can place.');
  expect(currentPlace(studio, 'x')).toBe('Evening · A studio on the river');
  const modes: [string, string, string, string | undefined][] = [
    ['plant-subtle', 'subtle', 'yes', undefined],
    ['plant-bold', 'bold', 'yes-deep', undefined],
    ['plant-theo', 'theo', 'yes', 'curious'],
  ];
  for (const [pick, mode, exposed, theo] of modes) {
    const planted = c7(studio, pick);
    expect([planted.choices['c7.audience-mode'], planted.choices['own.exposed'], planted.choices['c7.theo']]).toEqual([mode, exposed, theo]);
    expect(ids(planted)).toEqual(['exit-crowd', 'exit-river']);
    expect(text(planted)).toContain('You stand like someone taught you to stand quite recently.');
  }
  for (const exit of ['exit-crowd', 'exit-river']) {
    const home = c7(c7(studio, 'plant-subtle'), exit);
    expect([home.phase, home.choices['c7.exit'], home.choices['own.piece.audience']]).toEqual(['pursue', exit.slice(5), 'adjacent']);
    expect(text(home)).toContain('You’re asking the right question about the wrong person.');
  }
});

it('offers a chosen evening only with a partner she already chose, consent-gated, and it fades', () => {
  const romance = { 'c5.sebastian-outcome': undefined, 'c5.mutual-interest': undefined, 'c4.mutual-interest': undefined, 'c5.intimacy': undefined, 'c5.want-target': undefined };
  const atClose = walk(richHub(), ['pursue-records', 'records-pay', 'pursue-stop']);
  const alone = withFlags(atClose, romance);
  expect(eveningPartners7(alone)).toEqual([]);
  expect(chapter7Choices(alone).map((c) => c.label)).toEqual(['Carry it into tomorrow']);
  const both = withFlags(atClose, { ...romance, 'c5.sebastian-outcome': 'walk', 'c4.mutual-interest': 'yes' });
  expect(ids(both)).toEqual(['evening-julian', 'evening-sebastian', 'close-end']);
  expect(chapter7Choices(both).at(-1)?.label).toBe('Stay in tonight');
  for (const partner of ['julian', 'sebastian'] as const) {
    const invited = c7(both, 'evening-' + partner);
    expect(invited.phase).toBe('close');
    expect(ids(invited)).toEqual([`evening-${partner}-no-sex`, `evening-${partner}-sex`, 'evening-leave']);
    expect(currentPlace(invited, 'x')).toBe(partner === 'julian' ? 'Late · Julian’s apartment' : 'Late · Harbour, after the last set');
    const agreed = c7(invited, `evening-${partner}-sex`);
    expect(ids(agreed)).toEqual(['evening-stop', 'evening-stay']);
    expect(text(agreed)).toMatch(/stop, it stops|says stop, and it stops/);
    const stopped = c7(agreed, 'evening-stop');
    expect([stopped.phase, stopped.choices['c7.evening-outcome']]).toEqual(['complete', 'withdrawn']);
    const stayed = c7(agreed, 'evening-stay');
    expect([stayed.phase, stayed.choices['c7.evening-outcome']]).toEqual(['complete', 'intimate-sex']);
    expect(text(stayed)).toContain('The scene fades.');
    const soft = c7(c7(invited, `evening-${partner}-no-sex`), 'evening-stay');
    expect(soft.choices['c7.evening-outcome']).toBe('intimate-no-sex');
    expect(text(soft)).not.toContain('The scene fades.');
    const left = c7(invited, 'evening-leave');
    expect([left.phase, left.choices['c7.evening-outcome']]).toEqual(['complete', 'declined']);
    // Firewall: the evening changes nothing the investigation reads.
    for (const key of ['c7.finding', 'own.piece.records', 'own.exposed', 'own.cash', 'own.alliance.rook'])
      expect(stayed.choices[key], key).toBe(both.choices[key]);
  }
});
