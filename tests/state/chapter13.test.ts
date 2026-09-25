import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden12 from '../fixtures/rev19-chapter12-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import {
  chapter13Choices,
  COMPLY_OPENING13,
  CONTENT_NOTICE13,
  counterWays13,
  fadeCoercion13,
  FADED_LEAD13,
} from '../../src/content/chapter13';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { FADE_KEY, readFade, writeFade } from '../../src/ui/reader-preferences';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter13Choices(s).map((c) => c.id.replace(/^chapter13\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
/** Only what Chapter 13 has written into the history, from a given phase on. */
const textFrom = (s: GameState, phases: string[]) =>
  s.history
    .filter((h) => phases.some((p) => h.node === 'chapter13.' + p))
    .flatMap((h) => h.blocks.map((b) => b.text))
    .join('\n');
const c13 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER13_CHOOSE', id: 'chapter13.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c13, s);
const complete12 = (name: string) => replay(golden12.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** The kind-tenant Chapter 12 ending, with no allies told and nothing to prove, adjusted per case. */
const bare = { 'act3.ally.iris': undefined, 'act3.ally.theo': undefined, 'act3.ally.julian': undefined, 'c12.statement': undefined, 'c11.catalogue': 'leave', 'case.strength': 'thin', 'c12.bed': 'mirror' };
const start = (flags: Record<string, string | undefined> = {}) => withFlags(complete12('kind-tenant'), { ...bare, ...flags });
const toAnswer = (s: GameState, week = 'week-alone') => walk(s, ['begin', 'brief-silent', week]);
const prefer = ['brief-silent', 'week-alone', 'door-away', 'station-wait', 'maya-quiet', 'after-home', 'recover-alone', 'reply-none'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c13(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};
/** No sexual description on a coerced path (CONTENT_DIRECTION §2, §5). */
const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|kiss\w*|moan\w*|sex\w*|nipples?|arous\w*|lust\w*|desire\w*|orgasm\w*|caress\w*|climax\w*)\b/i;

it('opens after an own-power Chapter 12 ending with a content notice, and stays closed in production', () => {
  expect(ids(start())).toEqual(['begin']);
  expect(chapter13Choices(start())[0].hint).toContain('Content notice');
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  const brief = c13(start(), 'begin');
  expect(brief.history.at(-1)!.blocks[0]).toEqual({ kind: 'notice', text: CONTENT_NOTICE13 });
  vi.stubEnv('VITE_EVE_CHAPTER13', '');
  expect(chapter13Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER13');
});

it('briefs the placement: Marsh, 1109, and Maya’s file', () => {
  const brief = c13(start({ 'act3.singapore': 'moved-in', 'c11.iris': 'burned' }), 'begin');
  const words = text(brief);
  expect(words).toContain('Owen Marsh. Deputy director of enforcement at the Markets Authority.');
  expect(words).toContain('There is a suite on the eleventh floor, 1109, which is ours. There is a camera behind the mirror.');
  expect(words).toContain('M. REYES · Unauthorised disclosure of client data');
  expect(words).toContain('You looked so at home there.');
  expect(words).toContain('Who lost Iris, because I put a letter in her bag.');
  expect(text(c13(start({ 'c11.iris': 'spared' }), 'begin'))).toContain('He still has Iris, which is your doing');
  expect(ids(brief)).toEqual(['brief-ask', 'brief-silent']);
  expect(text(c13(brief, 'brief-ask'))).toContain('It is very restful, being owned.');
});

it('gives her six days and one move, with allies only if she has them', () => {
  const week = walk(start(), ['begin', 'brief-silent']);
  expect(week.phase).toBe('week');
  expect(ids(week)).toEqual(['week-marsh', 'week-maya', 'week-alone']);
  const allies = walk(start({ 'act3.ally.iris': 'in', 'act3.ally.theo': 'in', 'act3.ally.julian': 'in' }), ['begin', 'brief-silent']);
  expect(ids(allies)).toEqual(['week-marsh', 'week-maya', 'week-iris', 'week-theo', 'week-julian', 'week-alone']);
  expect(text(c13(allies, 'week-iris'))).toContain('A camera the size of a paperback');
  const told = c13(allies, 'week-theo');
  expect([told.choices['c13.week'], told.choices['c13.told']]).toEqual(['ally', 'theo']);
  expect(text(c13(week, 'week-marsh'))).toContain('in eleven years he has never once let anybody off');
  expect(text(c13(withFlags(week, { 'c6.maya': 'restored' }), 'week-maya'))).toContain('I just want you to know I noticed.');
  expect(text(c13(withFlags(week, { 'c6.maya': 'strained' }), 'week-maya'))).toContain('watch her light go on on the third floor');
});

it('offers counterplay only when she has built something', () => {
  expect(ids(toAnswer(start()))).toEqual(['order-comply', 'order-refuse']);
  expect(ids(toAnswer(start(), 'week-marsh'))).toEqual(['order-comply', 'order-refuse']);
  const proved = toAnswer(start({ 'c12.statement': 'recorded' }), 'week-marsh');
  expect(counterWays13(proved)).toEqual(['turn']);
  expect(ids(proved)).toEqual(['order-comply', 'order-refuse', 'order-counter']);
  expect(counterWays13(toAnswer(start({ 'act3.ally.iris': 'in' }), 'week-iris'))).toEqual(['swap']);
  expect(counterWays13(toAnswer(start({ 'act3.ally.theo': 'in' }), 'week-theo'))).toEqual(['expose']);
  expect(counterWays13(toAnswer(start({ 'act3.ally.julian': 'in' }), 'week-julian'))).toEqual(['turn']);
});

it('keeps compliance off screen: the lead-in, the door, a cut, and nothing sexual anywhere on the path', () => {
  const door = c13(toAnswer(start({ 'c8.pryce': 'chain' })), 'order-comply');
  expect([door.phase, door.choices['c13.answer'], door.choices['act3.honeypot']]).toEqual(['thursday', 'complied', 'done']);
  expect(door.history.at(-1)!.blocks[0].text).toBe(COMPLY_OPENING13);
  expect(text(door)).toContain('At the lights on the Strand he turns the heating up');
  expect(ids(door)).toEqual(['door-look', 'door-away']);
  for (const id of ['door-look', 'door-away']) {
    const after = c13(door, id);
    expect(after.phase).toBe('after');
    expect(after.history.at(-2)!.blocks.at(-1)!.text).toBe('The door closes behind you.');
    expect(text(after)).toContain('The car is waiting at the side entrance at two');
  }
  const partners = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'c6.maya': 'restored' };
  const after = c13(withFlags(door, partners), 'door-away');
  expect(ids(after)).toEqual(['recover-maya', 'recover-julian', 'recover-wall', 'recover-alone']);
  for (const id of ids(after)) {
    const done = finish(c13(after, id));
    expect(`${done.scene}.${done.phase}`).toBe('chapter13.complete');
    // Nothing sexual on the coerced path: the Claremont, the aftermath, the recovery, the morning, the knock.
    expect(textFrom(done, ['answer', 'thursday', 'after', 'morning', 'complete'])).not.toMatch(SEXUAL);
  }
  const refuge = c13(after, 'recover-julian');
  expect([refuge.choices['c13.recover'], refuge.choices['c13.refuge']]).toEqual(['refuge', 'julian']);
  expect(text(refuge)).toContain('You ask him only to hold you.');
  expect(refuge.choices['c13.evening-outcome']).toBeUndefined();
  expect(text(c13(after, 'recover-wall'))).toContain('DONE TO ME. NOT BY ME.');
});

it('lands refusal on Maya, never on her: detained, suspended, bailed', () => {
  const refused = c13(toAnswer(start({ 'c6.maya': 'restored', 'c9.lawyer': 'retain' })), 'order-refuse');
  expect([refused.choices['act3.honeypot'], refused.choices['act3.maya-status']]).toEqual(['refused', 'detained']);
  expect(currentPlace(refused, 'x')).toBe('21:00 · Home, and then the police station');
  expect(text(refused)).toContain('They said leaking.');
  expect(text(refused)).toContain('They only have to do it to her, and let you watch.');
  expect(ids(refused)).toEqual(['station-wait', 'station-lawyer']);
  const lawyer = c13(refused, 'station-lawyer');
  expect(lawyer.choices['act3.maya-lawyer']).toBe('brandt');
  expect(text(lawyer)).toContain('Nobody who leaks is this tidy.');
  expect(ids(lawyer)).toEqual(['maya-tell', 'maya-quiet']);
  expect(text(lawyer)).toContain('Suspended from Axiom pending investigation.');
  const told = c13(lawyer, 'maya-tell');
  expect(text(told)).toContain('This is what no costs.');
  expect(textFrom(finish(told), ['answer', 'thursday', 'after', 'morning', 'complete'])).not.toMatch(SEXUAL);
  const stranger = c13(toAnswer(start({ 'c6.maya': 'strained' })), 'order-refuse');
  expect(text(stranger)).toContain('a photograph. Maya in the back of a car');
  expect(ids(c13(stranger, 'station-wait'))).toEqual(['after-home']);
  expect(leverageBoard(stranger).held[0].threat).toBe('Maya, detained on a leak charge: suspended, on bail');
});

it('turns Marsh, and the only charge in the room is the one they both choose', () => {
  const answer = toAnswer(start({ 'c12.statement': 'recorded', 'act3.celeste-surprised': 'twice' }), 'week-marsh');
  const thursday = c13(answer, 'order-counter');
  expect(ids(thursday)).toEqual(['counter-turn']);
  const turned = c13(thursday, 'counter-turn');
  expect([turned.choices['act3.honeypot'], turned.choices['act3.ally.marsh'], turned.choices['act3.celeste-surprised']]).toEqual(['staged', 'in', 'thrice']);
  expect(text(turned)).toContain('From a friend of hers.');
  expect(text(turned)).toContain('Is this all right?');
  expect(text(turned)).toContain('both of you still dressed');
  expect(turned.facts).toContain('c13.marsh');
  expect(leverageBoard(turned).holds.map((a) => a.id)).toContain('marsh');
  const morning = walk(turned, ['after-drink']);
  expect(text(morning)).toContain('Three times, darling. I have started keeping count too.');
  expect(ids(morning)).toEqual(['reply-none', 'reply-count']);
});

it('swaps the card with Iris, or burns it in public first', () => {
  const swapped = walk(toAnswer(start({ 'act3.ally.iris': 'in' }), 'week-iris'), ['order-counter', 'counter-swap']);
  expect([swapped.choices['act3.honeypot'], swapped.choices['c13.card'], swapped.choices['act3.celeste-surprised']]).toEqual(['pulled', 'taken', 'once']);
  expect(text(swapped)).toContain('Six years of 1109, darling.');
  expect(leverageBoard(swapped).holds.map((a) => a.id)).toContain('card-1109');
  const burned = walk(toAnswer(start({ 'act3.ally.theo': 'in' }), 'week-theo'), ['order-counter', 'counter-expose']);
  expect([burned.choices['act3.honeypot'], burned.choices['act3.exposed']]).toEqual(['burned', 'yes']);
  expect(text(burned)).toContain('We know this because somebody who was asked to do it told us, and refused.');
  expect(leverageBoard(burned).holds.map((a) => a.id)).toContain('broadcast');
});

it('answers Celeste on Friday, and ends on Sloane at the door', () => {
  const morning = walk(toAnswer(start({ 'c12.bed': 'drawer' })), ['order-comply', 'door-away', 'recover-alone']);
  expect(morning.phase).toBe('morning');
  expect(text(morning)).toContain('Your friend’s file has gone back in my drawer.');
  expect(ids(morning)).toEqual(['reply-none', 'reply-nell']);
  const nell = c13(morning, 'reply-nell');
  expect(nell.phase).toBe('complete');
  expect(nell.choices['act3.sloane-came']).toBe('yes');
  expect(text(nell)).toContain('Nell said you’d bring flowers.');
  expect(text(nell)).toContain('I didn’t know they did this.');
  expect(text(nell)).toContain('a copy of Thursday’s recording, for the file');
  expect(leverageBoard(nell).held[0].wants).toBe('Owen Marsh, on camera, in suite 1109 at the Claremont');
});

it('fades the comply lead-in to one line for readers who ask, and changes nothing else', () => {
  const door = c13(toAnswer(start()), 'order-comply');
  const lead = door.history.at(-1)!.blocks;
  const faded = fadeCoercion13(lead);
  expect(faded[0]).toEqual({ kind: 'notice', text: FADED_LEAD13 });
  expect(faded.map((b) => b.text).join('\n')).toContain('1109 is at the end.');
  expect(faded.map((b) => b.text).join('\n')).not.toContain('It is appallingly easy.');
  expect(faded.length).toBeLessThan(lead.length);
  // Anything else passes through untouched, and the save is never involved.
  const brief = c13(start(), 'begin').history.at(-1)!.blocks;
  expect(fadeCoercion13(brief)).toBe(brief);
  const store = new Map<string, string>();
  const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) };
  expect(readFade(storage)).toBe(false);
  writeFade(storage, true);
  expect([store.get(FADE_KEY), readFade(storage)]).toEqual(['yes', true]);
});

it('reaches the end from every option in every scene', () => {
  const s0 = start({ 'act3.ally.iris': 'in', 'act3.ally.theo': 'in', 'act3.ally.julian': 'in', 'c12.statement': 'recorded', 'c6.maya': 'restored', 'c9.lawyer': 'retain', 'c12.bed': 'drawer', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined });
  const drive = (wants: string[]) => {
    let x = c13(s0, 'begin');
    for (let i = 0; i < 25 && ids(x).length; i++) x = c13(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['brief-ask'], ['week-maya'], ['week-marsh', 'order-counter', 'counter-turn', 'after-drink', 'reply-count'],
    ['week-iris', 'order-counter', 'counter-swap', 'after-drink'], ['week-theo', 'order-counter', 'counter-expose', 'after-drink'],
    ['week-julian', 'order-counter', 'counter-turn', 'after-home'],
    ['order-comply', 'door-look', 'recover-maya'], ['order-comply', 'recover-julian', 'reply-nell'], ['order-comply', 'recover-wall'],
    ['order-refuse', 'station-lawyer', 'maya-tell'], ['order-refuse', 'station-wait', 'maya-quiet'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter13.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter13.' + w);
  }
}, 120_000);
