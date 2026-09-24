import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter10Choices, counterReady10, eveningPartners10, target10 } from '../../src/content/chapter10';
import { leverageBoard, leverageBoardOpen } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter10Choices(s).map((c) => c.id.replace(/^chapter10\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c10 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER10_CHOOSE', id: 'chapter10.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c10, s);
const complete9 = (name: string) => replay(golden9.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** No Theo, no Julian: the notes target, unless a case adds one. */
const plain = {
  'c7.theo': undefined, 'c7.exit': undefined, 'c7.evening': undefined, 'c7.evening-outcome': undefined,
  'c5.intimacy': undefined, 'c5.want-target': undefined, 'c5.mutual-interest': undefined, 'c4.mutual-interest': undefined,
  'c4.audit-paid': undefined, 'c4.julian-kept': undefined, 'own.crossover': undefined, 'c3.helix-window': undefined,
};
const start = (flags: Record<string, string | undefined> = {}) => withFlags(complete9('records-name-thin'), { ...plain, ...flags });
/** Through breakfast, the calls and the wall to the order. */
const toOrder = (s: GameState) => walk(s, ['begin', 'breakfast-go', 'open-silent', 'adrian-composed', 'call-sloane', 'wall-build']);

it('opens only after an own-power Chapter 9, and stays closed in production', () => {
  expect(ids(start())).toEqual(['begin']);
  expect(ids(complete9('outside-placeholder-all'))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER10', '');
  expect(chapter10Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER10');
});

it('plays breakfast on her ground or yours, reads last week back, and ends on "Adrian"', () => {
  const morning = c10(start({ 'c7.card': 'kept', 'c9.name-beat': 'walk' }), 'begin');
  expect(ids(morning)).toEqual(['breakfast-go', 'breakfast-stay']);
  expect(currentPlace(morning, 'x')).toBe('DAWN · APARTMENT');
  const went = c10(morning, 'breakfast-go');
  expect(currentPlace(went, 'x')).toBe('07:00 · THE LINDQVIST');
  expect(text(went)).toContain('You kept my card. She never kept anything.');
  expect(text(went)).toContain('You walked past my building on Tuesday.');
  expect(ids(went)).toEqual(['open-case', 'open-evelyn', 'open-silent']);
  const ambushed = c10(morning, 'breakfast-stay');
  expect(currentPlace(ambushed, 'x')).toBe('09:10 · THE BAKERY ON YOUR STREET');
  expect(text(ambushed)).toContain('It is so much more public than my club.');
  for (const open of ['open-case', 'open-evelyn', 'open-silent']) {
    const turned = c10(went, open);
    expect(text(turned)).toContain('Eat your eggs, Adrian.');
    expect(ids(turned)).toEqual(['adrian-composed', 'adrian-asked', 'adrian-walked']);
  }
  // A thin case is corrected, gently; a supported one lands.
  expect(text(c10(went, 'open-case'))).toContain('It was a Thursday, darling');
  expect(text(c10(c10(c10(start({ 'case.strength': 'strong' }), 'begin'), 'breakfast-go'), 'open-case'))).toContain('Celeste stops smiling');
  expect(c10(went, 'open-silent').choices['act3.board-day']).toBe('first-thursday');
});

it('claims her in public, and lets her choose whose call to take first', () => {
  const noon = walk(start({ 'c6.maya': 'restored', 'own.campaign': 'taken', 'c7.theo': 'curious' }), ['begin', 'breakfast-go', 'open-silent', 'adrian-composed']);
  expect(noon.phase).toBe('claimed');
  expect(text(noon)).toContain('Old friends. Evelynn Vale and Celeste Laurent, reunited.');
  expect(ids(noon)).toEqual(['call-sloane', 'call-maya', 'call-theo', 'call-odile']);
  const odile = c10(noon, 'call-odile');
  expect(text(odile)).toContain('Celeste has found my agent.');
  expect(text(odile)).toContain('Call me back. That is not a request.');
  expect(ids(start()).length).toBe(1);
});

it('builds the wall from the debts already in the save, and opens the leverage board', () => {
  const debts = start({ 'own.alliance.rook': 'owed', 'own.marcus': 'owed', 'own.odile': 'owed', 'c8.list': 'read' });
  const wall = walk(debts, ['begin', 'breakfast-go', 'open-silent', 'adrian-composed', 'call-sloane']);
  expect(leverageBoardOpen(wall)).toBe(false);
  const built = c10(wall, 'wall-build');
  expect(leverageBoardOpen(built)).toBe(true);
  const { held, holds } = leverageBoard(built);
  expect(held.map((e) => e.holder)).toEqual(['Celeste Laurent', 'Victoria Sloane', 'The sender', 'Odile Frayne', 'Marcus Chen']);
  expect(holds.map((a) => a.id)).toContain('inventory');
  expect(text(built)).toContain('VALE, E. · RETURNED TO INVENTORY · REISSUED');
  expect(text(built)).toContain('The leverage board is now in your Records.');
});

it('names Maya, and aims the order at the relationship she built', () => {
  const order = toOrder(start());
  expect(text(order)).toContain('Maya Reyes. Compliance, level three.');
  expect(target10(order)).toBe('notes');
  expect(target10(start({ 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered' }))).toBe('workroom');
  expect(target10(start({ 'c7.theo': 'curious', 'c4.audit-paid': '900', 'c4.julian-kept': 'yes' }))).toBe('tape');
  // The third way needs something she built.
  expect(ids(order)).toEqual(['order-comply', 'order-refuse']);
  expect(text(order)).toContain('If I had a case she could not laugh at');
  expect(ids(toOrder(start({ 'case.strength': 'supported' })))).toEqual(['order-comply', 'order-refuse', 'order-counter']);
  expect(counterReady10(start({ 'c7.theo': 'curious' }))).toBe(false);
  expect(counterReady10(start({ 'c7.exit': 'theo' }))).toBe(true);
});

const cases: [string, Record<string, string>][] = [
  ['tape', { 'c7.exit': 'theo' }],
  ['workroom', { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.mutual-interest': 'yes' }],
  ['notes', { 'case.strength': 'strong', 'c7.notes': 'maya', 'c6.maya': 'restored' }],
];
it.each(cases)('plays the %s order through every answer, each with its own cost', (target, flags) => {
  const order = toOrder(start(flags));
  expect(target10(order)).toBe(target);
  expect(ids(order)).toEqual(['order-comply', 'order-refuse', 'order-counter']);

  const complied = c10(order, 'order-comply');
  expect([complied.choices['c10.answer'], complied.choices['act3.maya-clearance']]).toEqual(['complied', 'renewed']);
  expect(complied.choices['c10.betrayed']).toBe(target === 'tape' ? 'theo' : target === 'workroom' ? 'julian' : 'maya');
  expect(text(complied)).toContain('The leverage held.');

  const refused = c10(order, 'order-refuse');
  expect([refused.choices['c10.answer'], refused.choices['act3.maya-clearance']]).toEqual(['refused', 'suspended']);
  expect(text(refused)).toMatch(/Somebody pulled my clearance this morning|Maya’s clearance was suspended this morning/);
  // Refusal lands on the named threat, and nothing else: no evening, no betrayal.
  expect(refused.choices['c10.betrayed']).toBeUndefined();

  const countered = c10(order, 'order-counter');
  expect([countered.choices['c10.answer'], countered.choices['act3.celeste-surprised'], countered.choices['act3.maya-clearance']]).toEqual(['countered', 'once', 'renewed']);
  expect(text(countered)).toContain('She has stopped looking at me as something she owns');

  for (const s of [complied, refused, countered]) {
    const next = c10(s, ids(s)[0]);
    expect(next.phase).toBe('invitation');
    expect(text(next)).toContain('The first Thursday. The Vesper Gallery, eight o’clock.');
    const done = walk(next, ['invite-accept', ...(ids(c10(next, 'invite-accept')).includes('close-end') ? ['close-end'] : [])]);
    expect(done.phase).toBe('complete');
    expect(text(done)).toContain('That, at least, is something to push against.');
  }
});

it('plays a real Chapter 10 on an untouched save, and the save authenticates', () => {
  let s = walk(complete9('records-name-thin'), ['begin', 'breakfast-stay', 'open-evelyn', 'adrian-walked']);
  s = c10(s, ids(s)[0]);
  s = walk(s, ['wall-build', 'order-refuse']);
  s = c10(s, ids(s)[0]);
  s = c10(s, 'invite-wait');
  if (s.phase === 'invitation') s = c10(s, 'close-end');
  expect(`${s.scene}.${s.phase}`).toBe('chapter10.complete');
  expect(chapter10Choices(s)).toEqual([]);
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter10.breakfast', 'chapter10.claimed', 'chapter10.wall', 'chapter10.order', 'chapter10.answer', 'chapter10.invitation', 'chapter10.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});

it('lets her tell Maya as much as Maya can carry after a refusal', () => {
  const refused = c10(toOrder(start({ 'c6.maya': 'restored', 'c6.maya-knows': 'in-person' })), 'order-refuse');
  expect(ids(refused)).toEqual(['maya-truth', 'maya-part', 'maya-nothing']);
  expect(text(c10(refused, 'maya-truth'))).toContain('She is not angry. She is enlisting.');
  const distant = c10(toOrder(start({ 'c6.maya': 'restored', 'own.maya-distance': 'away' })), 'order-refuse');
  expect(text(distant)).toContain('You hear it at noon from Daniel');
  expect(ids(distant)).toEqual(['maya-call', 'maya-leave']);
});

it('offers a chosen evening only with a partner she did not betray, consent-gated, and it fades', () => {
  const theo = { 'c7.exit': 'theo' };
  const countered = walk(toOrder(start(theo)), ['order-counter', 'reply-silence', 'invite-accept']);
  expect(eveningPartners10(countered)).toEqual(['theo']);
  expect(ids(countered)).toEqual(['evening-theo', 'close-end']);
  const invited = c10(countered, 'evening-theo');
  expect(text(invited)).toContain('helped you lie to a very dangerous woman');
  expect(currentPlace(invited, 'x')).toBe('LATE · THEO’S FLAT ABOVE THE STUDIO');
  expect(ids(invited)).toEqual(['evening-theo-no-sex', 'evening-theo-sex', 'evening-leave']);
  const stayed = walk(invited, ['evening-theo-sex', 'evening-stay']);
  expect([stayed.phase, stayed.choices['c10.evening-outcome']]).toEqual(['complete', 'intimate-sex']);
  expect(text(stayed)).toContain('The scene fades.');
  expect(c10(c10(invited, 'evening-theo-sex'), 'evening-stop').choices['c10.evening-outcome']).toBe('withdrawn');
  // The evening changes nothing the leverage board or Act III reads.
  for (const key of ['act3.maya-clearance', 'act3.celeste-surprised', 'c10.answer'])
    expect(stayed.choices[key], key).toBe(countered.choices[key]);
  // Betrayed this chapter: no evening with him.
  const complied = walk(toOrder(start(theo)), ['order-comply', 'wall-move']);
  expect(eveningPartners10(complied)).toEqual([]);
  expect(c10(complied, 'invite-accept').phase).toBe('complete');
});

it('keeps the leverage board current with the answer', () => {
  const order = toOrder(start({ 'case.strength': 'strong' }));
  const [celeste] = leverageBoard(order).held;
  expect([celeste.status, celeste.wants]).toEqual(['open', 'Everything you found, on paper']);
  expect(leverageBoard(c10(order, 'order-refuse')).held[0].status).toBe('refused');
  const poisoned = c10(order, 'order-counter');
  expect(leverageBoard(poisoned).held[0].status).toBe('countered');
  expect(leverageBoard(poisoned).holds.map((a) => a.id)).toContain('poison');
});
