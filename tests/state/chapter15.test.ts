import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden14 from '../fixtures/rev19-chapter14-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { chapter15Choices, switchHolders15 } from '../../src/content/chapter15';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter15Choices(s).map((c) => c.id.replace(/^chapter15\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c15 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER15_CHOOSE', id: 'chapter15.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
/** The deepening pass's moments stand in front of later choices: take their neutral pick when one is in the way. */
const NEUTRAL = ['table-quiet', 'stairs-still'];
const walk = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c15(y, n);
    }
    return c15(y, id);
  }, s);
const complete14 = (name: string) => replay(golden14.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** Each road into Chapter 15, from its Chapter 14 golden, with no crew beyond what the flags give. */
const roads = { countered: 'counter-hold', complied: 'comply-hear', refused: 'refuse-shut' } as const;
const bare = { 'act3.ally.iris': undefined, 'c8.pryce': undefined, 'act3.maya-choice': 'witness' };
const start = (road: keyof typeof roads, flags: Record<string, string | undefined> = {}) => withFlags(complete14(roads[road]), { ...bare, ...flags });
const toArchive = (s: GameState) => walk(s, ['begin', 'crew-alone', 'way-window', 'snag-talk', 'stairs-still']);
const prefer = ['crew-alone', 'crew-done', 'table-quiet', 'way-window', 'snag-talk', 'stairs-still', 'took-nell', 'cost-money', 'phone-keep', 'night-alone'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c15(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};

it('opens after an own-power Chapter 14 ending on every road, and stays closed in production', () => {
  for (const road of ['countered', 'complied', 'refused'] as const) expect(ids(start(road))).toEqual(['begin']);
  expect(ids(start('countered', { 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER15', '');
  expect(chapter15Choices(start('countered'))).toEqual([]);
  expect(JSON.stringify(availableIntents(start('countered')))).not.toContain('CHAPTER15');
});

it('frames the crew by the road in, and asks one or two people', () => {
  const countered = c15(start('countered', { 'act3.ally.iris': 'in' }), 'begin');
  expect(text(countered)).toContain('Celeste has kept her word for eight days.');
  expect(text(countered)).toContain('She’s moving things, darling.');
  expect(text(countered)).toContain('I KEEP EVERYTHING, DARLING.');
  expect(currentPlace(countered, 'x')).toBe('THE WEEK AFTER · THE FLAT');
  const complied = c15(start('complied'), 'begin');
  expect(text(complied)).toContain('Sloane has not answered her phone for eight days.');
  const refused = c15(start('refused', { 'act3.ally.marsh': 'in' }), 'begin');
  expect(text(refused)).toContain('you rebuild it from memory on the wardrobe door');
  expect(currentPlace(refused, 'x')).toBe('THE WEEK AFTER · A FLAT IN KENNINGTON');
  // Who can be asked follows what Act III left.
  expect(ids(complied)).toEqual(['crew-sloane', 'crew-alone']);
  expect(ids(refused)).toEqual(['crew-alone']);
  const everyone = c15(start('countered', { 'act3.ally.iris': 'in', 'c8.pryce': 'chain', 'act3.maya-choice': 'stay' }), 'begin');
  expect(ids(everyone)).toEqual(['crew-iris', 'crew-sloane', 'crew-maya', 'crew-pryce', 'crew-alone']);
  const iris = c15(everyone, 'crew-iris');
  expect([iris.phase, iris.choices['c15.crew']]).toEqual(['crew', 'iris']);
  expect(text(iris)).toContain('I was the one who stocked it.');
  expect(ids(iris)).toEqual(['crew-sloane', 'crew-maya', 'crew-pryce', 'crew-done']);
  const two = c15(iris, 'crew-pryce');
  expect([two.phase, two.choices['c15.crew']]).toEqual(['plan', 'iris,pryce']);
  expect(text(two)).toContain('I suppose tonight I also open doors.');
  expect(text(c15(complied, 'crew-sloane'))).toContain('she has my passport in a drawer in that building');
});

it('gates the way in by the crew: the window alone, the cover only with someone outside', () => {
  const alone = walk(start('countered'), ['begin', 'crew-alone']);
  // The crew at the table first.
  expect(ids(alone)).toEqual(['table-toast', 'table-rules', 'table-quiet']);
  expect(text(c15(alone, 'table-toast'))).toContain('the laugh sounds like somebody you would like to know');
  expect(ids(c15(alone, 'table-quiet'))).toEqual(['way-window']);
  const table = walk(start('countered', { 'act3.ally.iris': 'in', 'c8.pryce': 'chain' }), ['begin', 'crew-iris', 'crew-pryce']);
  const toast = c15(table, 'table-toast');
  expect([toast.phase, toast.choices['c15.table']]).toEqual(['plan', 'toast']);
  expect(text(toast)).toContain('To the service stair.');
  expect(text(c15(table, 'table-rules'))).toContain('the most loyal thing anyone has ever done for you');
  const crew = c15(table, 'table-quiet');
  expect(ids(crew)).toEqual(['way-iris', 'way-pryce', 'way-window', 'way-invited']);
  const invited = c15(crew, 'way-invited');
  expect(text(invited)).toContain('How very grown-up of you. Midnight, then.');
  expect(currentPlace(invited, 'x')).toBe('WEDNESDAY · 23:30 · THE VESPER');
  expect(text(invited)).toContain('Tell me what you would like to say to my board.');
});

it('runs the heist with one snag, and every snag reaches the archive', () => {
  const vesper = walk(start('countered'), ['begin', 'crew-alone', 'way-window']);
  expect(text(vesper)).toContain('up it with your heels in your coat pockets');
  expect(text(vesper)).toContain('Hello? Who’s there?');
  expect(ids(vesper)).toEqual(['snag-talk', 'snag-hide', 'snag-bold']);
  for (const id of ids(vesper)) expect(c15(vesper, id).phase).toBe('archive');
  expect(text(c15(vesper, 'snag-bold'))).toContain('Go back to bed, Tomasz.');
  const coats = c15(withFlags(vesper, { 'c7.robe': 'coats' }), 'snag-hide');
  expect(text(coats)).toContain('number 41: her coat');
  const invited = walk(start('countered', { 'act3.ally.iris': 'in' }), ['begin', 'crew-iris', 'crew-done', 'way-invited']);
  expect(text(invited)).toContain('I have left something in the other room');
  expect(text(c15(invited, 'snag-talk'))).toContain('At two you come back in through the alley');
  expect(text(c15(invited, 'snag-bold'))).toContain('and so am I');
});

it('takes Maya’s file and page seven always, and one thing more', () => {
  const beforeStairs = walk(start('countered'), ['begin', 'crew-alone', 'way-window', 'snag-talk']);
  expect(text(beforeStairs)).toContain('And then, below, on the stairs: a sound.');
  expect(ids(beforeStairs)).toEqual(['stairs-still', 'stairs-face', 'stairs-lamp']);
  const faced = c15(beforeStairs, 'stairs-face');
  expect([faced.phase, faced.choices['c15.stairs']]).toEqual(['archive', 'face']);
  expect(text(faced)).toContain('I was never up here');
  const archive = toArchive(start('countered'));
  expect(text(archive)).toContain('I keep everything, darling. She does.');
  expect(text(archive)).toContain('tear your own page out of The Autumn Collection');
  expect(ids(archive)).toEqual(['took-adrian', 'took-cards', 'took-nell']);
  expect(ids(toArchive(start('complied')))).toEqual(['took-adrian', 'took-cards', 'took-nell', 'took-verdict']);
  const nell = c15(archive, 'took-nell');
  expect([nell.choices['c15.maya-file'], nell.choices['act3.page'], nell.choices['act3.nell-order']]).toEqual(['yes', 'torn', 'taken']);
  expect(nell.facts).toEqual(expect.arrayContaining(['c15.maya-file', 'c15.nell-order']));
  expect(text(nell)).toContain('The burn, signed. Not the death.');
  expect(c15(archive, 'took-adrian').choices['act3.adrian']).toBe('hers');
  expect(c15(archive, 'took-cards').choices['act3.cards']).toBe('taken');
  const verdict = c15(toArchive(start('complied')), 'took-verdict');
  expect([verdict.choices['act3.verdict'], verdict.choices['c15.passport']]).toEqual(['retaken', 'yes']);
});

it('breaks each hold: Maya cleared, Adrian’s name defused with Benton, the switch set, at a chosen cost', () => {
  const leash = c15(toArchive(start('refused', { 'act3.ally.marsh': 'in', 'c9.lawyer': 'retain', 'act3.ally.nora': undefined, 'act3.ally.theo': undefined })), 'took-nell');
  expect(leash.phase).toBe('leash');
  expect(text(leash)).toContain('Oh, this is beautiful');
  expect(text(leash)).toContain('The review is closed. Nobody at Axiom is looking for anybody.');
  expect(switchHolders15(leash)).toEqual(['Owen Marsh', 'Nadia Brandt', 'a safe-deposit box in your own name, with a letter to open']);
  expect(ids(leash)).toEqual(['cost-ally', 'cost-visibility', 'cost-money', 'cost-relationship']);
  const paid = c15(leash, 'cost-money');
  expect([paid.choices['act3.leash'], paid.choices['act3.cost'], paid.choices['act3.adrian'], paid.choices['act3.switch']]).toEqual(['broken', 'money', 'defused', 'set']);
  expect(text(paid)).toContain('Broke, and free.');
  const board = leverageBoard(paid);
  expect(board.held[0].holds).toEqual([]);
  expect(board.held[0].status).toBe('countered');
  expect(board.holds.map((a) => a.id)).toEqual(expect.arrayContaining(['maya-file', 'page-seven', 'nell-order', 'switch']));
  // On the countered road without Adrian's file, the name stays in Celeste's head.
  const held = walk(toArchive(start('countered')), ['took-cards', 'cost-visibility']);
  expect(held.choices['act3.adrian']).toBe('held');
  expect(leverageBoard(held).held[0].holds).toEqual(['Adrian Vale’s name, in her head if not in a drawer']);
  expect(text(held)).toContain('say Meridian eleven times in seven minutes');
  const ally = c15(c15(toArchive(start('countered', { 'act3.ally.iris': 'in' })), 'took-cards'), 'cost-ally');
  expect([ally.choices['c15.cost-who'], text(ally).includes('Worth it. Mostly.')]).toEqual(['Iris', true]);
});

it('ends the black phone with her first message, and keeps the evening chosen', () => {
  const partner = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const phone = walk(toArchive(start('countered', partner)), ['took-cards', 'cost-money']);
  expect(phone.phase).toBe('phone');
  expect(text(phone)).toContain('No more orders.');
  expect(text(phone)).toContain('I should warn you that I shall be there as myself.');
  expect(ids(phone)).toEqual(['phone-return', 'phone-river', 'phone-keep']);
  const river = c15(phone, 'phone-river');
  expect([river.phase, river.choices['act3.black-phone']]).toEqual(['phone', 'river']);
  expect(ids(river)).toContain('evening-julian');
  expect(ids(river).at(-1)).toBe('night-alone');
  const invited = c15(river, 'evening-julian');
  expect(currentPlace(invited, 'x')).toBe('Late · Julian’s apartment');
  const chose = c15(invited, 'evening-julian-sex');
  expect(chose.facts).toContain('c15.evening-consent');
  expect(c15(chose, 'evening-stop').choices['c15.evening-outcome']).toBe('withdrawn');
  expect(c15(chose, 'evening-stay').phase).toBe('complete');
  // The relationship she spent is not on offer that night.
  const spent = walk(toArchive(start('countered', partner)), ['took-cards', 'cost-relationship', 'phone-keep']);
  expect(spent.choices['c15.cost-who']).toBe('julian');
  expect(ids(spent)).not.toContain('evening-julian');
});

it('closes Act III on the wall', () => {
  const done = finish(toArchive(start('refused')));
  expect(`${done.scene}.${done.phase}`).toBe('chapter15.complete');
  expect(text(done)).toContain('The wardrobe door in the borrowed room.');
  expect(text(done)).toContain('She held everything. Now I do. Thursday, I find out what that’s worth.');
});

it('reaches the end from every option in every scene, on every road', () => {
  const rich = { 'act3.ally.iris': 'in', 'c8.pryce': 'chain', 'act3.maya-choice': 'stay', 'act3.ally.marsh': 'in', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined };
  const drive = (road: keyof typeof roads, wants: string[]) => {
    let x = c15(start(road, rich), 'begin');
    for (let i = 0; i < 25 && ids(x).length; i++) x = c15(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every: [keyof typeof roads, string[]][] = [
    ['countered', ['crew-iris', 'crew-maya', 'way-iris', 'snag-hide', 'took-adrian', 'cost-ally', 'phone-return']],
    ['countered', ['crew-pryce', 'crew-done', 'way-pryce', 'snag-bold', 'took-cards', 'cost-relationship', 'phone-river']],
    ['complied', ['crew-sloane', 'crew-iris', 'way-invited', 'snag-talk', 'took-verdict', 'cost-visibility', 'phone-keep', 'evening-marsh', 'evening-marsh-no-sex', 'evening-stay']],
    ['complied', ['crew-maya', 'crew-done', 'way-invited', 'snag-hide', 'took-nell', 'cost-money']],
    ['refused', ['crew-alone', 'way-window', 'snag-bold', 'took-adrian', 'cost-ally', 'evening-julian', 'evening-leave']],
    ['refused', ['crew-iris', 'crew-done', 'way-invited', 'snag-bold', 'took-cards', 'cost-relationship']],
  ];
  for (const [road, wants] of every) {
    const end = drive(road, wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter15.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter15.' + w);
  }
}, 120_000);
