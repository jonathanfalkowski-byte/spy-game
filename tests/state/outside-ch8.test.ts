import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';
import { settle6, text, toProof, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const complete6 = (name: string) => replay(golden6.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);

const ids7 = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const once7 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER7_CHOOSE', id: 'chapter7.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids7(s).join(', ') + ')');
  return next;
};
const walk7 = (s: GameState, p: string[]) => p.reduce(once7, s);
function ontoOutside(s: GameState) {
  const x = once7(s, 'begin');
  if (deriveRoute6(x)?.lane === 'outside') return once7(x, 'route-confirm');
  if (ids7(x).includes('route-pivot-outside')) return once7(x, 'route-pivot-outside');
  return walk7(x, ['route-break', 'confirm-break']);
}
/** A real exposed-ORACLE save routed onto Outside, through Chapter 7 with the given rules. */
function ch7Outside(rules: string[], extra: Record<string, string> = {}) {
  const at = ontoOutside(walk(settle6(walk(toProof({ verified: true, flags: { 'c5.message-sloane': 'yes', ...extra } }), ['proof-open', 'proof-view'])), ['verify-compare', 'celeste-let-be', 'oracle-take', 'counterpower-decide', 'resolve-trade-expose']));
  return walk7(at, ['o7-flit-nothing', 'o7-room-room', ...rules, 'o7-page-verify', 'o7-price-refuse', 'o7-evening-alone']);
}

/** A real golden save (maximal-trade) routed onto Outside, through Chapter 7 with the given rules. Replayable. */
function ch7OutsideGolden(rules: string[]) {
  const at = ontoOutside(complete6('maximal-trade'));
  return walk7(at, ['o7-flit-nothing', 'o7-room-room', ...rules, 'o7-page-verify', 'o7-price-refuse', 'o7-evening-alone']);
}

const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const once8 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER8_CHOOSE', id: 'chapter8.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
const walk8 = (s: GameState, p: string[]) => p.reduce(once8, s);
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters Provenance from an Outside Chapter 7: the wall, the red thread, the 02:40 pages', () => {
  const s = ch7Outside(['o7-rule-verify', 'o7-rule-provenance', 'o7-rule-door']);
  expect([s.scene, s.phase, s.choices['route.lane']]).toEqual(['chapter7', 'complete', 'outside']);
  const b = once8(s, 'begin-outside');
  expect([b.scene, b.phase]).toEqual(['chapter8', 'settle']);
  expect(text(b)).toContain('the room over the water');
  expect(text(b)).toContain('I’d rather be doubted than believed');
  const leads = once8(b, 'o8-settle-on');
  expect(leads.phase).toBe('leads');
  expect(ids(leads)).toEqual(['o8-lead-manifest', 'o8-lead-board', 'o8-lead-retired', 'o8-lead-sloane', 'o8-lead-courier']);
});

it('the hub, three verified leads, catches the plant; MERIDIAN surfaces; the terminal; it authenticates', () => {
  const s = once8(ch7OutsideGolden(['o7-rule-verify', 'o7-rule-provenance', 'o7-rule-door']), 'begin-outside');
  const leads = once8(s, 'o8-settle-on');
  const m = walk8(leads, ['o8-lead-manifest', 'o8-manifest-verify']);
  expect(text(m)).toContain('broker’s name, in Rotterdam'); // provenance rule
  const bd = walk8(m, ['o8-lead-board', 'o8-board-verify']);
  expect(text(bd)).toContain('I do not write it down yet'); // verify rule
  const plant = walk8(bd, ['o8-lead-retired', 'o8-retired-verify']);
  expect(plant.phase).toBe('plant');
  expect(plant.choices['out.verified']).toBe('3');
  expect(text(plant)).toContain('MERIDIAN HOLDINGS · VENDOR');
  expect(text(plant)).toContain('a seam in it');
  const term = once8(plant, 'o8-plant-on');
  expect(term.choices['out.plant']).toBe('caught');
  expect(text(term)).toContain('The last one stopped checking');
  expect(term.phase).toBe('terminal');
  expect(text(term)).toContain('the half-beat before your name');
  expect(ids(term)).toEqual(['o8-met-hand', 'o8-met-dark', 'o8-met-light']);
  const done = walk8(term, ['o8-met-light', 'o8-evening-alone']);
  expect(done.phase).toBe('complete');
  expect(done.choices['out.met']).toBe('light');
  expect(done.facts).toContain('c8.o-vendor');
  expect(text(done)).toContain('MERIDIAN · THE VENDOR.');
  expect(text(done)).toContain('VERIFIED.');
  expect(text(done)).toContain('I CHECKED. IT SAVED ME.');
  expect(text(done)).not.toMatch(SEXUAL);
  // the shared Chapter 9 bridge now offers the outside "Follow the vendor"
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  const bridge = act(done, { type: 'CHAPTER9_CHOOSE', id: 'chapter9.begin-placeholder' } as never);
  expect(bridge.choices['c9.entered']).toBe('outside');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});

it('used raw, the plant bites; the no-people rule closes the sells; the courier route is the one she keeps', () => {
  const s = once8(ch7Outside(['o7-rule-people', 'o7-rule-source', 'o7-rule-door']), 'begin-outside');
  const leads = once8(s, 'o8-settle-on');
  // E.V. (I): no-people closes the sell
  const retired = once8(leads, 'o8-lead-retired');
  expect(ids(retired)).toEqual(['o8-retired-verify', 'o8-retired-raw']);
  const r1 = once8(retired, 'o8-retired-raw');
  // Sloane's file: leave, honoured by no-people
  const sloane = once8(r1, 'o8-lead-sloane');
  expect(ids(sloane)).toEqual(['o8-sloane-bank', 'o8-sloane-burn', 'o8-sloane-leave']);
  const sv = once8(sloane, 'o8-sloane-leave');
  expect(sv.choices['out.file']).toBe('leave');
  expect(text(sv)).toContain('I trade facts. Not a woman’s file.');
  // courier: source rule closes the sell
  const courier = once8(sv, 'o8-lead-courier');
  expect(ids(courier)).toEqual(['o8-courier-verify', 'o8-courier-raw']);
  const plant = once8(courier, 'o8-courier-raw');
  expect(plant.phase).toBe('plant');
  expect(plant.choices['out.verified'] === undefined).toBe(true);
  expect(text(plant)).toContain('You moved on a lie');
  const term = once8(plant, 'o8-plant-on');
  expect(term.choices['out.plant']).toBe('bit');
  expect(text(term)).toContain('The last one I asked is dead');
  const done = walk8(term, ['o8-met-dark', 'o8-evening-alone']);
  expect(text(done)).toContain('I DIDN’T CHECK. THEY KNOW.');
  expect(text(done)).toContain('Don’t trust the face.');
  expect(done.choices['out.plant']).toBe('bit');
});

it('selling builds a trail; Sloane’s file banked; a chosen night that fades', () => {
  const s = once8(ch7Outside(['o7-rule-door', 'o7-rule-provenance', 'o7-rule-verify']), 'begin-outside');
  const leads = once8(s, 'o8-settle-on');
  const sold = walk8(leads, ['o8-lead-manifest', 'o8-manifest-sell', 'o8-lead-sloane', 'o8-sloane-bank']);
  expect(sold.choices['out.trail']).toBe('yes');
  expect(sold.choices['out.file']).toBe('bank');
  const plant = walk8(sold, ['o8-lead-board', 'o8-board-verify']);
  const term = once8(plant, 'o8-plant-on');
  const dusk = walk8(term, ['o8-met-hand']);
  if (ids(dusk).some((x) => x === 'o8-evening-julian' || x === 'o8-evening-sebastian')) {
    const pt = ids(dusk).includes('o8-evening-julian') ? 'julian' : 'sebastian';
    const room = walk8(dusk, ['o8-evening-' + pt, 'o8-' + pt + '-sex', 'o8-stay']);
    expect(room.facts).toContain('c8.o-evening-consent');
    expect(text(room)).toContain('The scene fades.');
    expect(room.choices['c8.o-evening-outcome']).toBe('intimate-sex');
    expect(text(room)).not.toMatch(SEXUAL);
  }
});
