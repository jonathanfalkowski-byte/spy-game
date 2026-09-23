import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden from '../fixtures/rev19-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import { optionalNpc, type GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter6Choices } from '../../src/content/chapter6';
import { endPosition6, exitArrangement6, get6, ownHandLeverage6, rookBackfill6 } from '../../src/content/chapter6-model';
import { deliver } from '../../src/content/chapter3-next-model';
import { send4 } from '../../src/content/chapter4-model';
import { send5 } from '../../src/content/chapter5-model';

const route = (name: string) => golden.routes.find((r) => r.name === name)!;
const complete19 = (name: string) => replay(route(name).ledger as GameEvent[], 19);
const c6 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER6_CHOOSE', id: 'chapter6.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
const withChoices = (s: GameState, choices: Record<string, string>) => {
  const x = structuredClone(s);
  for (const k of Object.keys(x.choices)) if (/^c5\.(service|published|message-sloane|terms|obligation-provider)$/.test(k)) delete x.choices[k];
  Object.assign(x.choices, choices);
  return x;
};

beforeEach(() => vi.stubEnv('VITE_EVE_CHAPTER6', '1'));
afterEach(() => vi.unstubAllEnvs());

it('stays closed in production: no Chapter 6 option while the build gate is off', () => {
  vi.stubEnv('VITE_EVE_CHAPTER6', '');
  const s = complete19('public-want-none');
  expect(chapter6Choices(s)).toEqual([]);
  expect(JSON.stringify(availableIntents(s))).not.toContain('CHAPTER6');
});

it('offers Chapter 6 only at revision-19 Chapter 5 complete, never to frozen revisions', () => {
  const s = complete19('public-want-none');
  expect(chapter6Choices(s).map((c) => c.id)).toEqual(['chapter6.begin']);
  const r18 = replay(route('public-want-none').ledger as GameEvent[], 18);
  expect(r18.contentRevision).toBe(18);
  expect(act(r18, { type: 'CHAPTER6_CHOOSE', id: 'chapter6.begin' })).toBe(r18);
  expect(decodeSave(encodeSave(r18))).toEqual(r18);
});

it('walks the empty Chapter 6 to complete, and the save authenticates at revision 19', () => {
  let s = c6(complete19('maximal-julian'), 'begin');
  expect(s.scene).toBe('chapter6');
  expect(s.phase).toBe('benefit');
  expect(s.contentRevision).toBe(19);
  for (const phase of ['benefit', 'expectation', 'friction', 'exit', 'proof', 'counterpower', 'resolve']) s = c6(s, phase + '-continue');
  expect(`${s.scene}.${s.phase}`).toBe('chapter6.complete');
  expect(chapter6Choices(s)).toEqual([]);
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});

it('derives the exit arrangement once from stored Chapter 5 flags, first match wins', () => {
  const base = complete19('public-want-none');
  const cases: [Record<string, string>, string, string][] = [
    [{ 'c5.service': 'julian', 'c5.published': 'yes' }, 'julian-workroom', 'c5.service = julian'],
    [{ 'c5.published': 'yes', 'c5.message-sloane': 'yes' }, 'public-artifact', 'c5.published'],
    [{ 'c5.message-sloane': 'yes', 'c5.service': 'self' }, 'sloane-institutional', 'c5.message-sloane'],
    [{ 'c5.service': 'axiom' }, 'sloane-institutional', 'c5.service = axiom'],
    [{ 'c5.service': 'self' }, 'self-funded', 'c5.service = self'],
    [{ 'c5.service': 'municipal' }, 'self-funded', 'c5.service = municipal'],
    [{ 'c5.terms': 'self-funded' }, 'self-funded', 'c5.terms = self-funded'],
    [{}, 'self-funded', 'default (no provider debt)'],
  ];
  for (const [flags, arrangement, basis] of cases) expect(exitArrangement6(withChoices(base, flags))).toEqual({ arrangement, basis });
  expect(exitArrangement6(complete19('maximal-julian')).arrangement).toBe('julian-workroom');
  const entered = c6(complete19('maximal-julian'), 'begin');
  expect(get6(entered, 'exit-arrangement')).toBe('julian-workroom');
  expect(get6(entered, 'exit-arrangement')).toBe(get6(replay(entered.ledger, 19), 'exit-arrangement'));
});

it('creates Rook only at Chapter 6 entry, backfilled from every earlier delivery with its source', () => {
  const s = complete19('sebastian-walk');
  expect(optionalNpc(s, 'rook')).toBeUndefined();
  const sent = structuredClone(s);
  deliver(sent, 'rook', 'draft-instruction', 'The instruction came from Sloane.', 'Chapter 3 reply');
  send4(sent, 'rook', 'I will not send the fee terms.', 'Chapter 4 message');
  send5(sent, 'rook', 'I am considering public attention.', 'Chapter 5 message');
  expect(optionalNpc(sent, 'rook')).toBeUndefined();
  expect(rookBackfill6(sent).map((o) => [o.key, o.source])).toEqual([
    ['The instruction came from Sloane.', 'Chapter 3 reply'],
    ['I will not send the fee terms.', 'Chapter 4 message'],
    ['I am considering public attention.', 'Chapter 5 message'],
  ]);
  const entered = c6(s, 'begin');
  expect(optionalNpc(entered, 'rook')).toEqual({ known: rookBackfill6(s), beliefs: [] });
});

it('derives own-hand leverage and the end position without any Rook trust', () => {
  const base = complete19('public-want-none');
  expect(ownHandLeverage6(withChoices(base, { 'c5.published': 'yes' }))).toContain('c5.published');
  expect(ownHandLeverage6(withChoices(base, { 'c5.terms': 'backup', 'c5.obligation-provider': 'Helix office' }))).toContain('enforceable-term');
  expect(ownHandLeverage6(withChoices(base, { 'c5.terms': 'backup' }))).not.toContain('enforceable-term');
  const none = withChoices(base, {});
  none.mission = { ...none.mission, capture: null, token: 'benton' };
  delete none.choices['c3.verified-date'];
  expect(endPosition6(none)).toBe('none');
  expect(endPosition6(withChoices(base, { 'c5.published': 'yes' }))).toBe('own-hand');
  expect(endPosition6(withChoices(base, { 'c5.published': 'yes', 'c6.oracle-seen': 'yes' }))).toBe('both');
});
