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
const toOrder = (s: GameState) => walk(s, ['begin', 'breakfast-go', 'menu-let', 'open-silent', 'ask-happened', 'dream-true', 'adrian-composed', 'call-sloane', 'door-stay', 'wall-build']);
/** An answer to the order, played through its moments (the first choice offered at each). */
const answer = (order: GameState, id: string) => {
  let s = c10(order, id);
  while (s.phase === 'order') s = c10(s, ids(s)[0]);
  return s;
};

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
  const arrived = c10(morning, 'breakfast-go');
  expect(currentPlace(arrived, 'x')).toBe('07:00 · THE LINDQVIST');
  expect(text(arrived)).toContain('Shall I order for you? I know what you like.');
  expect(ids(arrived)).toEqual(['menu-let', 'menu-own']);
  expect(text(c10(arrived, 'menu-own'))).toContain('That’s new.');
  const went = c10(arrived, 'menu-let');
  expect(text(went)).toContain('I used to eat them for her.');
  expect(text(went)).toContain('You kept my card. She never kept anything.');
  expect(text(went)).toContain('You walked past my building on Tuesday.');
  expect(ids(went)).toEqual(['open-case', 'open-evelyn', 'open-silent']);
  const ambushed = c10(morning, 'breakfast-stay');
  expect(currentPlace(ambushed, 'x')).toBe('09:10 · THE BAKERY ON YOUR STREET');
  expect(text(ambushed)).toContain('It is so much more public than my club.');
  expect(ids(ambushed)).toEqual(['menu-let', 'menu-own']);
  // At the bakery she brought the coffee, and the line that ends breakfast follows what is on the table.
  const bakeryAdrian = walk(ambushed, ['menu-let', 'open-silent', 'ask-happened', 'dream-true']);
  expect(text(bakeryAdrian)).toContain('Two sugars and cinnamon.');
  expect(text(bakeryAdrian)).toContain('Drink your coffee, Adrian.');
  expect(text(walk(arrived, ['menu-own', 'open-silent', 'ask-happened', 'dream-true']))).toContain('Eat your toast, Adrian.');
  for (const open of ['open-case', 'open-evelyn', 'open-silent']) {
    const asked = c10(went, open);
    expect(text(asked)).toContain('Ask me something, darling.');
    expect(ids(asked)).toEqual(['ask-happened', 'ask-like', 'ask-meridian']);
    const dreamt = c10(asked, 'ask-happened');
    expect(text(dreamt)).toContain('That was the one I read twice.');
    expect(ids(dreamt)).toEqual(['dream-true', 'dream-lie', 'dream-refuse']);
    const turned = c10(dreamt, 'dream-lie');
    expect(text(turned)).toContain('She knew the original.');
    expect(text(turned)).toContain('Eat your eggs, Adrian.');
    expect(ids(turned)).toEqual(['adrian-composed', 'adrian-asked', 'adrian-walked']);
  }
  // A thin case is corrected, gently; a supported one lands.
  expect(text(c10(went, 'open-case'))).toContain('It was a Thursday, darling');
  expect(text(walk(start({ 'case.strength': 'strong' }), ['begin', 'breakfast-go', 'menu-let', 'open-case']))).toContain('Celeste stops smiling');
  expect(c10(went, 'open-silent').choices['act3.board-day']).toBe('first-thursday');
});

it('claims her in public, and lets her choose whose call to take first', () => {
  const noon = walk(start({ 'c6.maya': 'restored', 'own.campaign': 'taken', 'c7.theo': 'curious' }), ['begin', 'breakfast-go', 'menu-let', 'open-silent', 'ask-like', 'dream-refuse', 'adrian-composed']);
  expect(noon.phase).toBe('claimed');
  expect(text(noon)).toContain('the two women “go back years”');
  expect(text(noon)).toContain('Old friends. Evelynn Vale and Celeste Laurent, reunited.');
  expect(ids(noon)).toEqual(['call-sloane', 'call-maya', 'call-theo', 'call-odile']);
  const odile = c10(noon, 'call-odile');
  expect(text(odile)).toContain('Celeste has found my agent.');
  expect(text(odile)).toContain('Call me back. That is not a request.');
  expect(ids(odile)).toEqual(['door-face', 'door-back', 'door-stay']);
  expect(text(c10(odile, 'door-back'))).toContain('Ms Laurent’s car is at the corner');
  expect(c10(odile, 'door-face').phase).toBe('wall');
  expect(ids(start()).length).toBe(1);
});

it('builds the wall from the debts already in the save, and opens the leverage board', () => {
  const debts = start({ 'own.alliance.rook': 'owed', 'own.marcus': 'owed', 'own.odile': 'owed', 'c8.list': 'read' });
  const wall = walk(debts, ['begin', 'breakfast-go', 'menu-let', 'open-silent', 'ask-meridian', 'dream-true', 'adrian-composed', 'call-sloane', 'door-stay']);
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

  const complied = answer(order, 'order-comply');
  expect([complied.choices['c10.answer'], complied.choices['act3.maya-clearance']]).toEqual(['complied', 'renewed']);
  expect(complied.choices['c10.betrayed']).toBe(target === 'tape' ? 'theo' : target === 'workroom' ? 'julian' : 'maya');
  expect(text(complied)).toContain('The leverage held.');

  const refused = answer(order, 'order-refuse');
  expect([refused.choices['c10.answer'], refused.choices['act3.maya-clearance']]).toEqual(['refused', 'suspended']);
  expect(text(refused)).toMatch(/Somebody pulled my clearance this morning|Maya’s clearance was suspended this morning/);
  // Refusal lands on the named threat, and nothing else: no evening, no betrayal.
  expect(refused.choices['c10.betrayed']).toBeUndefined();

  const countered = answer(order, 'order-counter');
  expect([countered.choices['c10.answer'], countered.choices['act3.celeste-surprised'], countered.choices['act3.maya-clearance']]).toEqual(['countered', 'once', 'renewed']);
  expect(text(countered)).toContain('She has stopped looking at me as something she owns');

  for (const s of [complied, refused, countered]) {
    const next = c10(s, ids(s)[0]);
    expect(next.phase).toBe('invitation');
    expect(text(next)).toContain('The first Thursday. The Vesper Gallery, eight o’clock.');
    const dressed = walk(next, ['invite-accept', 'green-black']);
    const done = dressed.phase === 'invitation' ? c10(dressed, 'close-end') : dressed;
    expect(done.phase).toBe('complete');
    expect(text(done)).toContain('That, at least, is something to push against.');
  }
});

it('plays a real Chapter 10 on an untouched save, and the save authenticates', () => {
  let s = walk(complete9('records-name-thin'), ['begin', 'breakfast-stay', 'menu-own', 'open-evelyn', 'ask-like', 'dream-true', 'adrian-walked']);
  s = c10(s, ids(s)[0]);
  s = walk(s, ['door-face', 'wall-build', 'order-refuse', 'job-answer']);
  s = c10(s, ids(s)[0]);
  s = walk(s, ['invite-wait', 'green-buy']);
  if (s.phase === 'invitation') s = c10(s, 'close-end');
  expect(`${s.scene}.${s.phase}`).toBe('chapter10.complete');
  expect(chapter10Choices(s)).toEqual([]);
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter10.breakfast', 'chapter10.claimed', 'chapter10.wall', 'chapter10.order', 'chapter10.answer', 'chapter10.invitation', 'chapter10.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});

it('lets her tell Maya as much as Maya can carry after a refusal', () => {
  const refused = answer(toOrder(start({ 'c6.maya': 'restored', 'c6.maya-knows': 'in-person' })), 'order-refuse');
  expect(ids(refused)).toEqual(['maya-truth', 'maya-part', 'maya-nothing']);
  expect(text(c10(refused, 'maya-truth'))).toContain('She is not angry. She is enlisting.');
  const distant = answer(toOrder(start({ 'c6.maya': 'restored', 'own.maya-distance': 'away' })), 'order-refuse');
  expect(text(distant)).toContain('You hear it at noon from Daniel');
  expect(ids(distant)).toEqual(['maya-call', 'maya-leave']);
});

it('offers a chosen evening only with a partner she did not betray, consent-gated, and it fades', () => {
  const theo = { 'c7.exit': 'theo' };
  const countered = walk(toOrder(start(theo)), ['order-counter', 'job-name', 'bay-kiss', 'reply-silence', 'invite-accept', 'green-black']);
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
  const complied = walk(toOrder(start(theo)), ['order-comply', 'job-hide', 'seen-no', 'wall-move']);
  expect(eveningPartners10(complied)).toEqual([]);
  expect(walk(complied, ['invite-accept', 'green-black']).phase).toBe('complete');
});

it('keeps the leverage board current with the answer', () => {
  const order = toOrder(start({ 'case.strength': 'strong' }));
  const [celeste] = leverageBoard(order).held;
  expect([celeste.status, celeste.wants]).toEqual(['open', 'Everything you found, on paper']);
  expect(leverageBoard(answer(order, 'order-refuse')).held[0].status).toBe('refused');
  const poisoned = answer(order, 'order-counter');
  expect(leverageBoard(poisoned).held[0].status).toBe('countered');
  expect(leverageBoard(poisoned).holds.map((a) => a.id)).toContain('poison');
});

// ── Deepening pass 2: each job has a moment inside it ──

it('plays each job in two halves around one moment', () => {
  const tape = c10(toOrder(start({ 'c7.exit': 'theo' })), 'order-comply');
  expect(tape.phase).toBe('order');
  expect(text(tape)).toContain('He has come back for the reading glasses he always forgets.');
  expect(ids(tape)).toEqual(['job-lie', 'job-hide']);
  const hid = c10(tape, 'job-hide');
  // The set piece's second moment: leaving the studio.
  expect([hid.phase, hid.choices['c10.theo-suspects'], hid.choices['c10.answer']]).toEqual(['order', 'yes', 'complied']);
  expect(text(hid)).toContain('Goodnight, then.');
  expect(text(hid)).toContain('could I get a picture? For my sister.');
  expect(ids(hid)).toEqual(['seen-photo', 'seen-no']);
  const snapped = c10(hid, 'seen-photo');
  expect([snapped.phase, snapped.choices['c10.seen']]).toEqual(['answer', 'photo']);
  expect(text(snapped)).toContain('time-stamped 00:31');
  expect(text(snapped)).toContain('I was good at it.');

  const named = walk(toOrder(start({ 'c7.exit': 'theo' })), ['order-counter', 'job-name']);
  expect(named.choices['act3.theo-knows']).toBe('celeste');

  const refused = c10(toOrder(start()), 'order-refuse');
  expect(ids(refused)).toEqual(['job-answer', 'job-ignore']);
  expect(text(c10(refused, 'job-answer'))).toContain('Tell Maya I’m sorry.');
  expect(text(c10(refused, 'job-ignore'))).toContain('Nine days, darling. Eight, now.');

  const copied = walk(toOrder(start()), ['order-comply', 'job-copy']);
  expect(leverageBoard(copied).holds.map((a) => a.id)).toContain('kept-copy');
  const lettered = walk(toOrder(start({ 'case.strength': 'strong' })), ['order-counter', 'job-letter']);
  expect(lettered.choices['c10.poison']).toBe('letter');
  // Nothing is decided until the moment ends, so the board still reads open inside it.
  expect(leverageBoard(c10(toOrder(start()), 'order-comply')).held[0].status).toBe('open');
});

it('deepens what it cost: Maya without her badge, Sloane noticing, the card moving', () => {
  const refused = answer(toOrder(start({ 'c6.maya': 'restored', 'own.maya-distance': undefined })), 'order-refuse');
  expect(text(refused)).toContain('the lanyard still round her neck and nothing on the end of it');
  const complied = answer(toOrder(start()), 'order-comply');
  expect(text(complied)).toContain('Laurent’s office asked Compliance to expedite a renewal');
  const countered = answer(toOrder(start({ 'case.strength': 'strong' })), 'order-counter');
  expect(text(countered)).toContain('the first time anything on the wall has moved away from you');
});

it('lets her choose what to wear to the Vesper Gallery, at a cost that follows her', () => {
  const card = (flags: Record<string, string | undefined>) =>
    walk(toOrder(start(flags)), ['order-refuse', 'job-ignore', ids(answerOf(start(flags)))[0], 'invite-accept']);
  const answerOf = (s: GameState) => walk(toOrder(s), ['order-refuse', 'job-ignore']);
  expect(ids(card({ 'c8.gala': undefined }))).toEqual(['green-buy', 'green-black']);
  expect(ids(card({ 'c8.gala': 'dance', 'own.campaign': 'taken' }))).toEqual(['green-own', 'green-odile', 'green-buy', 'green-black']);
  const odile = c10(card({ 'own.campaign': 'taken' }), 'green-odile');
  expect([odile.choices['c10.green'], odile.choices['own.odile']]).toEqual(['odile', 'owed']);
  const bought = c10(card({ 'own.cash': '400' }), 'green-buy');
  expect([bought.choices['c10.green'], bought.choices['own.cash']]).toEqual(['buy', '250']);
  expect(text(c10(card({}), 'green-black'))).toContain('Let her notice.');
});

// ── The breakfast set piece ──

it('plays breakfast as one scene: the menu, her reading of your week, and the build to "Adrian"', () => {
  const reads = { 'c8.breakin': 'trap', 'c7.notes': 'hide', 'c7.evening': 'julian', 'c7.evening-outcome': 'intimate-sex' };
  const read = walk(start(reads), ['begin', 'breakfast-go', 'menu-let']);
  expect(text(read)).toContain('Talc on the floor, darling.');
  expect(text(read)).toContain('And you hide things in coats. So did she.');
  expect(text(read)).toContain('How is Julian’s view?');
  const turned = walk(read, ['open-silent', 'ask-happened', 'dream-true']);
  expect(text(turned)).toContain('Somewhere dry. Somewhere you can find it again');
  expect(text(turned)).toContain('Did they ever fix the crease in the sofa?');
  expect(text(turned)).toContain('I won’t threaten you, darling.');
  const left = c10(turned, 'adrian-composed');
  expect(text(left)).toContain('your hands finally start to shake');
  expect(text(c10(turned, 'adrian-walked'))).toContain('As if it were something she had given me.');
});

it('keeps Celeste as canon describes her: close-cropped hair, never pinned up', () => {
  const both = [c10(c10(start(), 'begin'), 'breakfast-go'), c10(c10(start(), 'begin'), 'breakfast-stay')];
  for (const s of both) {
    expect(text(s)).toContain('her hair cropped close to her head');
    expect(text(s)).not.toMatch(/Celeste[^.]*hair up/);
  }
});

// ── The job set pieces: a second moment where the scene has one ──

it('gives the job set pieces their second moments, each recorded', () => {
  const key = { 'c7.exit': 'theo', 'c7.evening': 'theo', 'c7.evening-outcome': 'intimate-sex' };
  const guard = walk(toOrder(start(key)), ['order-comply', 'job-lie']);
  expect(text(guard)).toContain('you could just ask me');
  expect(ids(guard)).toEqual(['seen-wave', 'seen-hood']);
  expect(c10(guard, 'seen-wave').choices['c10.seen']).toBe('guard');

  const bay = walk(toOrder(start({ 'c7.exit': 'theo' })), ['order-counter', 'job-withhold']);
  expect(text(bay)).toContain('That’s where you stop being a guest and start being a story.');
  expect(ids(bay)).toEqual(['bay-kiss', 'bay-thank']);
  expect(text(c10(bay, 'bay-thank'))).toContain('Thank me when she’s sorry.');

  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.mutual-interest': 'yes' };
  const car = walk(toOrder(start(julian)), ['order-comply', 'job-lie']);
  expect(text(car)).toContain('Whatever you were looking for up there, I hope you found it.');
  expect(c10(car, 'car-true').choices['c10.julian-car']).toBe('truth');
  const round = walk(toOrder(start(julian)), ['order-counter', 'job-name']);
  expect(text(round)).toContain('nothing handwritten can be traced to anything but a hand');
  expect(ids(round)).toEqual(['round-stay', 'round-photo']);
  expect(text(c10(round, 'round-stay'))).toContain('asks after his daughter');

  const notes = walk(toOrder(start({ 'case.strength': 'strong' })), ['order-counter', 'job-date']);
  expect(text(notes)).toContain('Shall I say who it’s from, madam?');
  const e = c10(notes, 'doorman-e');
  expect([e.phase, e.choices['c10.doorman'], e.choices['c10.poison']]).toEqual(['answer', 'e', 'date']);
});
