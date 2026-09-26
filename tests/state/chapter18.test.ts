import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden17 from '../fixtures/rev19-chapter17-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { chapter18Choices, mayaClose18, partners18 } from '../../src/content/chapter18';
import { leverageBoard } from '../../src/content/leverage';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter18Choices(s).map((c) => c.id.replace(/^chapter18\./, ''));
const ch18 = (s: GameState) => s.history.filter((h) => h.node.startsWith('chapter18.')).flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c18 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER18_CHOOSE', id: 'chapter18.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c18, s);
const complete17 = (name: string) => replay(golden17.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
const start = (flags: Record<string, string | undefined> = {}, from = 'expose-room') => withFlags(complete17(from), flags);
/** Nobody to go home to but herself, and Maya far away. */
const solo = { 'c4.mutual-interest': undefined, 'c7.evening': undefined, 'c5.intimacy': undefined, 'act3.ally.marsh': undefined, 'act3.ally.theo': undefined, 'c7.theo': undefined, 'c7.exit': undefined, 'c6.maya': 'strained', 'act3.maya-choice': 'away' };
const prefer = ['morning-papers', 'walk-past', 'switch-armed', 'fame-later', 'with-alone', 'keep-none', 'name-evelyn', 'later-quiet'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c18(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};

it('opens after an own-power Chapter 17 ending, and stays closed in production', () => {
  for (const from of ['expose-room', 'terms-celeste', 'nell-silent']) expect(ids(start({}, from))).toEqual(['begin']);
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER18', '');
  expect(chapter18Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER18');
});

it('reads the morning after from the board, with Celeste’s last word and Sloane’s', () => {
  const front = c18(start({ 'act4.board': 'resigned', 'act4.aim': 'expose', 'act4.sloane': 'vouch' }), 'begin');
  expect(ch18(front)).toContain('a signature circled in red');
  expect(ch18(front)).toContain('You were worth it. C.');
  expect(ch18(front)).toContain('she has framed the letter');
  expect(ch18(c18(start({ 'act4.board': 'resigned', 'act4.aim': 'terms' }), 'begin'))).toContain('MERIDIAN DIRECTOR STEPS DOWN');
  const orchid = c18(start({ 'act4.board': 'diminished', 'act4.sloane': 'use' }), 'begin');
  expect(ch18(orchid)).toContain('a single white orchid in a pot, with no card at all');
  expect(ch18(orchid)).toContain('You were right to. — V.S.');
  expect(ch18(c18(start({ 'act4.board': 'closed' }), 'begin'))).toContain('From Celeste, nothing.');
  expect(ids(front)).toEqual(mayaClose18(front) ? ['morning-papers', 'morning-sleep', 'morning-maya'] : ['morning-papers', 'morning-sleep']);
  expect(ids(c18(start(solo), 'begin'))).toEqual(['morning-papers', 'morning-sleep']);
  const noon = c18(c18(start({ ...solo, 'c9.auction': 'thank' }), 'begin'), 'morning-papers');
  expect([noon.phase, ids(noon)]).toEqual(['morning', ['walk-past', 'walk-look', 'walk-in']]);
  expect(ch18(c18(noon, 'walk-look'))).toContain('the Aster portrait');
  const plate = c18(noon, 'walk-in');
  expect([plate.phase, plate.choices['end.walk']]).toEqual(['position', 'in']);
  expect(ch18(plate)).toContain('Souvenir?');
});

it('turns the aim into a position, scaled by the terms, and hands her the switch', () => {
  const to = (flags: Record<string, string | undefined>) => walk(start({ ...solo, ...flags }), ['begin', 'morning-sleep', 'walk-past']);
  expect(ch18(to({ 'act4.aim': 'expose', 'act4.terms': 'full' }))).toContain('famous is the one thing you can’t sell twice');
  expect(ch18(to({ 'act4.aim': 'expose', 'act4.terms': 'none' }))).toContain('You publish anyway.');
  expect(ch18(to({ 'act4.aim': 'terms', 'act4.terms': 'partial' }))).toContain('Half of it in writing');
  expect(ch18(to({ 'act4.aim': 'terms', 'act4.terms': 'none' }))).toContain('I wrote my own, and I hold the pen.');
  expect(ch18(to({ 'act4.aim': 'nell', 'act4.terms': 'full' }))).toContain('It’s all here.');
  expect(ch18(to({ 'act4.aim': 'nell', 'act4.terms': 'none' }))).toContain('the inquest into Eleanor Linden’s death has been reopened');
  expect(ch18(to({ 'act4.aim': 'out', 'act3.ally.iris': 'in' }))).toContain('The door she never let Nell have.');
  expect(ch18(to({ 'c15.cost': 'money' }))).toContain('very nearly broke');
  const sw = to({ 'act4.aim': 'terms', 'act4.terms': 'full', 'act3.ally.nora': 'in', 'act4.sloane': 'stand' });
  expect(ids(sw)).toEqual(['switch-armed', 'switch-handed', 'switch-disarmed']);
  expect(chapter18Choices(sw)[1].label).toBe('Hand it to Nora');
  const handed = c18(sw, 'switch-handed');
  expect([handed.phase, handed.choices['end.switch'], handed.choices['end.switch-to'], handed.choices['end.position']]).toEqual(['position', 'handed', 'nora', 'terms:full']);
  // The phone call about her face.
  expect(ids(handed)).toEqual(['fame-yes', 'fame-no', 'fame-later']);
  const own = c18(handed, 'fame-yes');
  expect([own.phase, own.choices['end.fame']]).toEqual(['people', 'yes']);
  expect(ch18(own)).toContain('the photographs are never sold on to anybody');
  expect(ch18(c18(handed, 'fame-no'))).toContain('advertisement for car insurance');
  expect(ch18(c18(sw, 'switch-disarmed'))).toContain('You burn them in the kitchen sink');
  expect(leverageBoard(handed).holds.map((a) => a.id)).toContain('switch-final');
});

it('resolves the people, and lets her choose who she goes home to, or nobody', () => {
  const people = walk(start({ 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'act3.ally.marsh': 'in', 'act3.maya-choice': 'stay', 'c8.pryce': 'chain', 'act3.ally.iris': 'in' }), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later']);
  expect(ch18(people)).toContain('Maya gets the head-of-section job.');
  expect(ch18(people)).toContain('a pair of flat shoes, size five');
  expect(ch18(people)).toContain('He turns the heating up.');
  expect(ch18(people)).toContain('whose name, it turns out, is Joe');
  expect(partners18(people)).toEqual(expect.arrayContaining(['julian', 'marsh']));
  expect(ids(people)).toEqual([...partners18(people).map((p) => 'with-' + p), 'with-maya', 'with-alone']);
  expect(ch18(c18(people, 'with-marsh'))).toContain('No mirrors. I checked again. Toast?');
  // The relationship spent in Chapter 15 is not there to go home to.
  const spent = walk(start({ 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'c15.cost': 'relationship', 'c15.cost-who': 'julian' }), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later']);
  expect(ids(spent)).not.toContain('with-julian');
  expect(ch18(spent)).toContain('I spent them on purpose, to make the rest hold.');
  const alone = c18(walk(start(solo), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later']), 'with-alone');
  expect([alone.phase, alone.choices['end.with']]).toEqual(['name', 'alone']);
});

it('asks who she is now, and punishes none of the answers', () => {
  const name = walk(start(solo), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later', 'with-alone', 'keep-none']);
  expect(ch18(name)).toContain('There is one card left in your hand.');
  expect(ids(name)).toEqual(['name-adrian', 'name-evelyn', 'name-new']);
  const box = walk(start(solo), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later', 'with-alone']);
  expect(ids(box)).toEqual(['keep-nell', 'keep-maya', 'keep-none']);
  expect(ch18(c18(box, 'keep-nell'))).toContain('behind your bank card');
  for (const [id, line] of [
    ['name-adrian', 'My name is Adrian Vale. I was a product once.'],
    ['name-evelyn', 'My name is Evelyn Vale. They built her to be sold. I bought her back.'],
    ['name-new', 'It’s nobody’s business but mine. That’s the whole point.'],
  ]) {
    const done = finish(c18(name, id));
    expect(`${done.scene}.${done.phase}`).toBe('chapter18.complete');
    expect(ch18(done)).toContain(line);
    expect(ch18(done)).toContain('The end of the Celebrity route.');
    expect(ids(done)).toEqual([]);
  }
});

it('keeps the year-later night chosen, consented and stoppable', () => {
  const later = walk(start({ 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined }), ['begin', 'morning-sleep', 'walk-past', 'switch-armed', 'fame-later', 'with-julian', 'keep-none', 'name-evelyn']);
  expect(ch18(later)).toContain('There is no page seven. The numbering goes six, eight.');
  expect(ids(later)).toEqual(['later-julian', 'later-quiet']);
  const invited = c18(later, 'later-julian');
  expect(ids(invited)).toEqual(['later-no-sex', 'later-sex', 'later-goodnight']);
  const chose = c18(invited, 'later-sex');
  expect(chose.choices['end.consent']).toBe('sex');
  expect(ids(chose)).toEqual(['later-stop', 'later-close']);
  expect(c18(chose, 'later-stop').choices['end.later']).toBe('stop');
  const stayed = c18(chose, 'later-close');
  expect([stayed.phase, stayed.choices['end.later']]).toEqual(['complete', 'close']);
  expect(ch18(stayed)).toContain('The scene fades.');
  const maya = walk(start({ ...solo, 'c6.maya': 'restored', 'act3.maya-choice': 'stay' }), ['begin', 'morning-maya', 'walk-past', 'switch-armed', 'fame-later', 'with-maya', 'keep-none', 'name-new']);
  expect(ids(maya)).toEqual(['later-maya', 'later-quiet']);
  expect(ch18(c18(maya, 'later-maya'))).toContain('magic tricks at parties');
});

it('reaches the end from every option in every scene', () => {
  const rich = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'act3.ally.marsh': 'in', 'act3.maya-choice': 'stay', 'c6.maya': 'restored' };
  const drive = (wants: string[]) => {
    let x = c18(start(rich), 'begin');
    for (let i = 0; i < 20 && ids(x).length; i++) x = c18(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['morning-maya', 'switch-handed', 'with-maya', 'name-adrian', 'later-maya'],
    ['morning-papers', 'switch-disarmed', 'with-marsh', 'name-new', 'later-marsh', 'later-no-sex', 'later-close'],
    ['morning-sleep', 'switch-armed', 'with-julian', 'name-evelyn', 'later-julian', 'later-goodnight'],
    ['with-alone', 'later-quiet'],
    ['walk-look', 'fame-yes', 'keep-nell'], ['walk-in', 'fame-no', 'keep-maya'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter18.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter18.' + w);
  }
}, 120_000);
