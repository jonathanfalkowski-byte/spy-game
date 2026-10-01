import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter10Choices } from '../../src/content/chapter10';
import { chapter14Choices } from '../../src/content/chapter14';
import { text } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

/** A real Outside Chapter 9 complete save (Chapter 7: verify, provenance, door; Chapter 8: three verified leads). */
const nine = () => replay(golden9.routes.find((r) => r.name === 'outside-placeholder-all')!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) {
    if (v === undefined) delete x.choices[k];
    else x.choices[k] = v;
  }
  return x;
};
const ids = (s: GameState) => chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
const once = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER10_CHOOSE', id: 'chapter10.' + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.scene + '.' + s.phase + ' (offered: ' + ids(s).join(', ') + ')');
  return next;
};
const walk10 = (s: GameState, path: string[]) => path.reduce(once, s);
const ch10 = (s: GameState) => s.history.filter((h) => String(h.node).startsWith('chapter10.')).flatMap((h) => h.blocks).map((b) => ('text' in b ? String((b as { text: string }).text) : '')).join('\n');
const SEXUAL = /\b(naked|nude|arous\w*|lust\w*)\b/i;

it('enters Bring Me Their Name from an Outside Chapter 9: the box on the third step, and the Chapter 14 bridge steps aside', () => {
  const s = nine();
  expect(ids(s)).toEqual(['begin-outside']);
  // with Chapter 10 playable, the Chapter 14 bridge no longer opens from Chapter 9
  expect(chapter14Choices(s)).toEqual([]);
  const slip = once(s, 'begin-outside');
  expect(slip.phase).toBe('slip');
  expect(ch10(slip)).toContain('on the third step down, where the key once waited');
  expect(ids(slip)).toEqual(['o10-slip-go', 'o10-slip-sender', 'o10-slip-door']);
});

it('go, give her the hour, tell him after: the order, the week, the invitation; it authenticates', () => {
  const s = nine();
  const cafe = walk10(s, ['begin-outside', 'o10-slip-go']);
  expect(cafe.phase).toBe('cafe');
  expect(ids(cafe)).toEqual(['o10-dress-cash', 'o10-dress-own', 'o10-dress-black']);
  const table = once(cafe, 'o10-dress-cash');
  expect(ch10(table)).toContain('Out of Axiom with a holdall.');
  expect(ch10(table)).toContain('How very Adrian.'); // the verify rule, quoted
  expect(ch10(table)).toContain('Eat your eggs, Adrian.');
  const order = once(table, 'o10-adrian-composed');
  expect(order.phase).toBe('source');
  expect(ch10(order)).toContain('Bring me his name.');
  expect(ids(order)).toEqual(['o10-order-give', 'o10-order-doctor', 'o10-order-refuse']);
  const press = once(order, 'o10-order-give');
  expect([press.choices['out.give10'], press.choices['out.celeste10']]).toEqual(['gave', 'trusted']);
  expect(press.facts).toContain('c10.o-order');
  expect(ch10(press)).toContain('a place and an hour');
  const weeks = once(press, 'o10-press-report');
  expect(weeks.choices['out.pages10']).toBe('report');
  expect(weeks.choices['out.told10']).toBe('yes');
  expect(ch10(weeks)).toContain('I moved the night before you told me.');
  expect(ch10(weeks)).toContain('He wasn’t there. Careless of him.');
  expect(ch10(weeks)).toContain('do bring your source.');
  const done = walk10(weeks, ['o10-week-on', 'o10-night-alone']);
  expect(done.phase).toBe('complete');
  expect(ch10(done)).toContain('CELESTE LAURENT. GIVEN.');
  expect(ch10(done)).toContain('HE KNOWS.');
  expect(ch10(done)).toContain('BRING YOUR SOURCE.');
  expect(ch10(done)).not.toMatch(SEXUAL);
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
  // the Chapter 14 bridge now opens from Chapter 10's end, and Rafe remembers what she gave
  const bridge = once14(done);
  expect(bridge.phase).toBe('seam');
});
const once14 = (s: GameState) => act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.begin-outside' } as never);

it('doctored: Meridian’s man on the wrong pier; the source rule is quoted; Daniel is not on this road', () => {
  const s = withFlags(nine(), { 'out.rules': 'source,people,door' });
  const order = walk10(s, ['begin-outside', 'o10-slip-sender', 'o10-dress-black', 'o10-adrian-ask']);
  expect(ch10(order)).toContain('You wrote that down? They always do. It never holds.');
  expect(ch10(order)).toContain('That isn’t mine. It’s her hand; I’ve seen it on a list.');
  const weeks = walk10(order, ['o10-order-doctor', 'o10-press-work']);
  expect(weeks.choices['out.give10']).toBe('doctored');
  expect(ch10(weeks)).toContain('a thin man in a long coat');
  expect(ch10(weeks)).toContain('He was shy. Next Friday?');
  expect(weeks.choices['out.told10']).toBeUndefined();
  const done = walk10(weeks, ['o10-week-on', 'o10-night-alone']);
  expect(ch10(done)).toContain('CELESTE LAURENT. DOCTORED.');
  expect(ch10(done)).not.toContain('HE KNOWS.');
});

it('refused: the 02:40 phone goes silent (the cost falls on the source, never her body); a chosen night that fades', () => {
  const s = nine();
  const door = walk10(s, ['begin-outside', 'o10-slip-door']);
  expect(ch10(door)).toContain('She’s brought pastries');
  const order = walk10(door, ['o10-dress-own', 'o10-adrian-walk']);
  const weeks = walk10(order, ['o10-order-refuse', 'o10-press-old']);
  expect(weeks.choices['out.give10']).toBe('refused');
  expect(ch10(weeks)).toContain('The cheap phone does not ring at 02:40');
  expect(ch10(weeks)).toContain('That was a small one. Friday?');
  expect(ch10(weeks)).not.toMatch(SEXUAL);
  const hours = once(weeks, 'o10-week-on');
  if (ids(hours).some((x) => x === 'o10-night-julian' || x === 'o10-night-sebastian')) {
    const pt = ids(hours).includes('o10-night-julian') ? 'julian' : 'sebastian';
    const room = walk10(hours, ['o10-night-' + pt, 'o10-' + pt + '-sex', 'o10-stay']);
    expect(room.facts).toContain('c10.o-evening-consent');
    expect(ch10(room)).toContain('The scene fades.');
    expect(room.choices['c10.o-night-outcome']).toBe('intimate-sex');
    expect(ch10(room)).not.toMatch(SEXUAL);
  }
  const done = once(hours, 'o10-night-alone');
  expect(ch10(done)).toContain('CELESTE LAURENT. REFUSED.');
  expect(text(done)).toContain('THE VESPER. THE FIRST THURSDAY.');
});
