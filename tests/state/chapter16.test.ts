import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden15 from '../fixtures/rev19-chapter15-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { case16, chapter16Choices, insiders16, items16 } from '../../src/content/chapter16';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter16Choices(s).map((c) => c.id.replace(/^chapter16\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c16 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER16_CHOOSE', id: 'chapter16.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
/** The deepening pass's moments stand in front of later choices: take their neutral pick when one is in the way. */
const NEUTRAL = ['rehearse-none', 'walk-on'];
const walk = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c16(y, n);
    }
    return c16(y, id);
  }, s);
const complete15 = (name: string) => replay(golden15.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** The countered-iris Chapter 15 ending, adjusted per case. */
const start = (flags: Record<string, string | undefined> = {}, from = 'countered-iris') => withFlags(complete15(from), flags);
/** Nobody left standing and almost nothing in hand: the free-agent core (ENDGAME §5 autonomy guard). */
const bare = {
  'act3.sloane': 'shut',
  'act3.ally.nora': undefined,
  'act3.ally.marsh': undefined,
  'act3.ally.iris': undefined,
  'act3.ally.theo': undefined,
  'act3.honeypot': 'done',
  'act3.maya-choice': 'away',
  'c4.mutual-interest': undefined,
  'c7.evening': undefined,
  'own.crossover': undefined,
  'c14.file': undefined,
  'act3.verdict': undefined,
  'act3.cards': undefined,
  'c13.card': undefined,
  'act3.nell-order': undefined,
  'c12.statement': undefined,
  'c11.catalogue': 'leave',
  'c15.maya-file': undefined,
  'act3.black-phone': 'river',
  'act3.adrian': 'held',
  'act3.switch': undefined,
  'c9.lever': undefined,
  'c6.oracle-seen': undefined,
  'c8.pryce': undefined,
};
const prefer = ['case-set', 'aim-terms', 'inside-none', 'inside-done', 'outside-switch', 'first-page', 'held-none', 'rehearse-none', 'wear-green', 'dress-alone', 'walk-on', 'arrive-front'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c16(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};

it('opens after an own-power Chapter 15 ending, and stays closed in production', () => {
  for (const from of ['countered-iris', 'complied-sloane', 'refused-alone']) expect(ids(start({}, from))).toEqual(['begin']);
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER16', '');
  expect(chapter16Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER16');
});

it('reviews the case honestly at dawn, and stores it', () => {
  const thin = case16(start(bare));
  expect(thin.strength).toBe('thin');
  expect(thin.reasons).toEqual(['Page seven, torn out: the placement date in their own type.']);
  const rich = case16(start());
  expect(['strong', 'overwhelming']).toContain(rich.strength);
  expect(rich.reasons[0]).toContain('The ORACLE verdict, with the board’s signatures on it');
  const dawn = c16(start(bare), 'begin');
  expect(text(dawn)).toContain('THIN. True. Sourced. Thin.');
  expect(ids(dawn)).toEqual(['case-set']);
  expect(c16(dawn, 'case-set').choices['act4.case']).toBe('thin');
  expect(currentPlace(c16(start({ 'act3.home': 'lost' }), 'begin'), 'x')).toBe('05:00 · THE WARDROBE DOOR');
});

it('lets her choose the aim, with Nell only if she knows the name and out only if she can pay for it', () => {
  const aim = walk(start(), ['begin', 'case-set']);
  expect(ids(aim)).toEqual(['aim-expose', 'aim-terms', 'aim-nell', 'aim-out']);
  expect(ids(walk(start({ 'act3.nell': undefined }), ['begin', 'case-set']))).not.toContain('aim-nell');
  expect(ids(walk(start({ ...bare, 'c15.cost': 'money', 'c10.betrayed': 'julian' }), ['begin', 'case-set']))).not.toContain('aim-out');
  const nell = c16(aim, 'aim-nell');
  expect([nell.phase, nell.choices['act4.aim']]).toEqual(['crew', 'nell']);
  expect(text(nell)).toContain('I am going to make Celeste say her name.');
});

it('brings up to two inside and one outside, from who is still standing, or nobody', () => {
  const full = { 'act3.sloane': 'free', 'act3.ally.nora': 'in', 'act3.ally.marsh': 'in', 'act3.ally.iris': 'in', 'act3.maya-choice': 'stay', 'c15.cost': 'money', 'c8.pryce': 'chain', 'act3.ally.theo': 'in' };
  const s0 = walk(start(full), ['begin', 'case-set', 'aim-terms']);
  expect(insiders16(s0)).toEqual(['sloane', 'nora', 'marsh', 'maya', 'iris', 'julian']);
  expect(ids(s0)).toEqual(['inside-sloane', 'inside-nora', 'inside-marsh', 'inside-maya', 'inside-iris', 'inside-julian', 'inside-none']);
  const one = c16(s0, 'inside-nora');
  expect(text(one)).toContain('Nell’s photograph in her handbag');
  expect(text(one)).toContain('the only weather that minded its own business');
  expect(ids(one)).toEqual(['inside-sloane', 'inside-marsh', 'inside-maya', 'inside-iris', 'inside-julian', 'inside-done']);
  const two = c16(one, 'inside-sloane');
  expect([two.choices['act4.inside'], two.choices['act4.inside-done']]).toEqual(['nora,sloane', 'yes']);
  expect(ids(two)).toEqual(['outside-theo', 'outside-pryce', 'outside-maya', 'outside-switch']);
  expect(text(c16(two, 'outside-theo'))).toContain('If you’re not out by seven, we go live');
  // The one she spent in Chapter 15 cannot come.
  expect(insiders16(start({ ...full, 'c15.cost': 'ally', 'c15.cost-who': 'Iris' }))).not.toContain('iris');
  const alone = c16(walk(start(bare), ['begin', 'case-set', 'aim-terms']), 'inside-none');
  expect([alone.choices['act4.inside'], text(alone).includes('The way I came into all of this.')]).toEqual(['none', true]);
  expect(ids(alone)).toEqual(['outside-switch']);
});

it('puts the cards in order, and keeps one back', () => {
  const table = walk(start(), ['begin', 'case-set', 'aim-expose', 'inside-none', 'outside-switch']);
  expect(table.phase).toBe('table');
  const has = items16(table);
  expect(has).toEqual(expect.arrayContaining(['verdict', 'cards', 'page']));
  expect(ids(table)).toEqual(has.map((i) => 'first-' + i));
  const first = c16(table, 'first-verdict');
  expect(first.choices['act4.first']).toBe('verdict');
  expect(ids(first)).toEqual(has.filter((i) => i !== 'verdict').map((i) => 'held-' + i));
  const held = c16(first, 'held-cards');
  expect([held.phase, held.choices['act4.held']]).toEqual(['table', 'cards']);
  expect(text(held)).toContain('like a second heartbeat');
  expect(ids(held)).toEqual(['rehearse-mirror', 'rehearse-none']);
  const mirror = c16(held, 'rehearse-mirror');
  expect([mirror.phase, mirror.choices['act4.rehearse']]).toEqual(['dress', 'mirror']);
  expect(text(mirror)).toContain('She was always the better barrister.');
  const aloud = walk(start({ 'act3.ally.marsh': 'in' }), ['begin', 'case-set', 'aim-expose', 'inside-marsh', 'inside-done', 'outside-switch', 'first-verdict', 'held-cards']);
  expect(ids(aloud)).toEqual(['rehearse-mirror', 'rehearse-aloud', 'rehearse-none']);
  expect(text(c16(aloud, 'rehearse-aloud'))).toContain('Say that slower.');
  expect(items16(start(bare))).toEqual(['page']);
});

it('dresses her as armour, with a quiet chosen moment if she wants one', () => {
  const partner = { 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'act3.maya-choice': 'stay' };
  const dress = walk(start(partner), ['begin', 'case-set', 'aim-terms', 'inside-none', 'outside-switch', 'first-page']);
  const wear = c16(c16(dress, ids(dress)[0]), 'rehearse-none');
  expect(ids(wear)).toEqual(['wear-green', 'wear-black', 'wear-grey']);
  const black = c16(wear, 'wear-black');
  expect(text(black)).toContain('Black. How brave.');
  expect(ids(black)).toEqual(['dress-julian', 'dress-marsh', 'dress-maya', 'dress-alone']);
  const clasp = c16(black, 'dress-julian');
  expect([clasp.phase, clasp.choices['act4.dressed-with']]).toEqual(['arrive', 'julian']);
  expect(text(clasp)).toContain('Come back.');
  const ch16 = clasp.history.filter((h) => h.node.startsWith('chapter16.')).flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
  expect(ch16).not.toMatch(/\b(undress\w*|naked|sex\w*)\b/i);
  expect(text(c16(black, 'dress-maya'))).toContain('Go and take a building apart.');
  // A relationship spent in Chapter 15 is not at the mirror.
  const spent = walk(start({ ...partner, 'c15.cost': 'relationship', 'c15.cost-who': 'julian' }), ['begin', 'case-set', 'aim-terms', 'inside-none', 'outside-switch', 'first-page']);
  expect(ids(c16(c16(c16(spent, ids(spent)[0]), 'rehearse-none'), 'wear-green'))).not.toContain('dress-julian');
});

it('reacts to her exposure at the Vesper, and the doorman wishes her luck', () => {
  const to = (flags: Record<string, string | undefined>) => walk(start({ ...bare, ...flags }), ['begin', 'case-set', 'aim-terms', 'inside-none', 'outside-switch', 'first-page', 'held-none', 'wear-green', 'dress-alone']);
  const publicEyes = to({ 'c5.published': 'yes' });
  expect(text(publicEyes)).toContain('They have seen you coming.');
  expect(ids(publicEyes)).toEqual(['walk-bench', 'walk-rail', 'walk-on']);
  const rail = c16(publicEyes, 'walk-rail');
  expect([rail.phase, rail.choices['act4.walk']]).toEqual(['arrive', 'rail']);
  expect(text(rail)).toContain('Adrian’s Axiom pass');
  const quiet = walk(publicEyes, ['arrive-quiet']);
  expect([quiet.choices['act4.arrive'], quiet.choices['act4.seen']]).toEqual(['quiet', 'yes']);
  expect(text(quiet)).toContain('two men on the service stair');
  expect(text(quiet)).toContain('Good luck, Ms Vale.');
  const privately = to({ 'c5.published': undefined, 'act3.exposed': undefined, 'c15.cost': 'money' });
  expect(text(privately)).toContain('The embankment is empty.');
  expect(walk(privately, ['arrive-front']).choices['act4.seen']).toBe('no');
  const car = walk(to({ 'c8.pryce': 'chain' }), ['arrive-car']);
  expect(text(car)).toContain('“And mine.”');
  expect(text(car)).toContain('kept pace with you along the embankment');
});

it('ends in the long room, with Celeste standing, even for the free-agent core alone', () => {
  const done = finish(start(bare));
  expect(`${done.scene}.${done.phase}`).toBe('chapter16.complete');
  expect(done.choices['act4.case']).toBe('thin');
  expect(text(done)).toContain('Anton Deverell, at Celeste’s right hand, the chair');
  expect(text(done)).toContain('She has never once stood up for me before.');
  const julian = finish(walk(start({ 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined }), ['begin', 'case-set', 'aim-expose', 'inside-julian', 'inside-done']));
  expect(text(julian)).toContain('in the observer’s chair a client may take with notice, Julian');
  expect(leverageBoard(julian).holds.map((a) => a.id)).toEqual(expect.arrayContaining(['aim', 'crew']));
});

it('reaches the end from every option in every scene', () => {
  const rich = { 'act3.sloane': 'free', 'act3.ally.nora': 'in', 'act3.ally.marsh': 'in', 'act3.maya-choice': 'stay', 'c8.pryce': 'chain', 'act3.ally.theo': 'in', 'act3.black-phone': 'keep', 'act3.adrian': 'hers', 'c12.statement': 'recorded', 'act3.nell-order': 'taken', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined, 'c5.published': 'yes' };
  const drive = (wants: string[]) => {
    let x = c16(start(rich), 'begin');
    for (let i = 0; i < 25 && ids(x).length; i++) x = c16(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['aim-expose', 'inside-sloane', 'inside-nora', 'outside-theo', 'first-nell', 'held-phone', 'wear-grey', 'dress-julian', 'arrive-quiet'],
    ['aim-out', 'inside-marsh', 'inside-done', 'outside-pryce', 'first-ashby', 'held-adrian', 'wear-black', 'dress-maya', 'arrive-car'],
    ['aim-nell', 'inside-iris', 'inside-maya', 'outside-switch', 'first-phone', 'held-nell', 'wear-green', 'dress-alone', 'arrive-front'],
    ['aim-terms', 'inside-julian', 'inside-done', 'first-adrian', 'held-ashby'],
    ['inside-marsh', 'inside-done', 'rehearse-aloud', 'walk-bench'], ['rehearse-mirror', 'walk-rail'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter16.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter16.' + w);
  }
}, 120_000);
