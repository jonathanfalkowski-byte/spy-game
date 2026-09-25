import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden13 from '../fixtures/rev19-chapter13-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { chapter14Choices, counterReady14, secondThings14 } from '../../src/content/chapter14';
import { leverageBoard } from '../../src/content/leverage';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter14Choices(s).map((c) => c.id.replace(/^chapter14\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c14 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER14_CHOOSE', id: 'chapter14.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
const walk = (s: GameState, path: string[]) => path.reduce(c14, s);
const complete13 = (name: string) => replay(golden13.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** The comply-alone Chapter 13 ending, with nothing built beyond it, adjusted per case. */
const bare = {
  'act3.ally.marsh': undefined,
  'c13.card': undefined,
  'act3.honeypot': 'done',
  'c12.statement': undefined,
  'act3.ally.nora': undefined,
  'case.strength': 'thin',
  'c9.lever': undefined,
  'c6.oracle-seen': undefined,
  'own.crossover': undefined,
};
const start = (flags: Record<string, string | undefined> = {}) => withFlags(complete13('comply-alone'), { ...bare, ...flags });
const toAnswer = (s: GameState, sloane = 'sloane-hear', said = 'said-enough') => walk(s, ['begin', sloane, 'tell-now', said]);
const prefer = ['sloane-hear', 'tell-now', 'said-enough', 'comply-clean', 'escape-fire', 'after-alone'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c14(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};
const SEXUAL = /\b(undress\w*|naked|nude|breasts?|thighs?|kiss\w*|moan\w*|sex\w*|nipples?|arous\w*|lust\w*|orgasm\w*)\b/i;

it('opens after an own-power Chapter 13 ending, and stays closed in production', () => {
  expect(ids(start())).toEqual(['begin']);
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER14', '');
  expect(chapter14Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER14');
});

it('lets Sloane confess, and gives her the door not taken', () => {
  const door = c14(start(), 'begin');
  const words = text(door);
  expect(words).toContain('Voluntary adoption: high. Durable control: low.');
  expect(words).toContain('I am the part of the product that takes the blame.');
  expect(words).toContain('a copy of Thursday’s recording');
  expect(words).toContain('C. Laurent.');
  expect(text(c14(start({ 'c13.answer': 'refused' }), 'begin'))).toContain('Somebody used my stamp.');
  expect(ids(door)).toEqual(['sloane-hear', 'sloane-hold', 'sloane-shut']);
  expect(ids(c14(start({ 'own.crossover': 'institutional' }), 'begin'))).toEqual(['sloane-hear', 'sloane-hold', 'sloane-shut', 'sloane-take']);
  const heard = c14(door, 'sloane-hear');
  expect([heard.choices['c14.file'], heard.choices['act3.sloane'], heard.facts.includes('c14.verdict')]).toEqual(['yes', 'truce', true]);
  const held = c14(door, 'sloane-hold');
  expect([held.choices['c14.file'], held.choices['act3.sloane']]).toEqual(['yes', 'held']);
  const shut = c14(door, 'sloane-shut');
  expect([shut.choices['c14.file'], shut.choices['act3.sloane']]).toEqual([undefined, 'shut']);
  expect(text(shut)).toContain('Be careful this weekend.');
});

it('gives the last order, with Adrian’s name as the price, and Maya before or after', () => {
  const order = walk(start({ 'c8.pryce': 'chain' }), ['begin', 'sloane-hear']);
  expect(order.phase).toBe('order');
  expect(text(order)).toContain('Bring her to the Vesper on Sunday at six, and bring what she carries.');
  expect(text(order)).toContain('Axiom will be told where its missing analyst is');
  expect(text(order)).toContain('Mr Pryce saw Sloane on the stairs last night.');
  expect(ids(order)).toEqual(['tell-now', 'tell-later']);
  const later = c14(order, 'tell-later');
  expect(currentPlace(later, 'x')).toBe('SATURDAY NIGHT · YOUR DOORSTEP');
  expect(text(later)).toContain('Ask her who this is.');
  const knew = c14(withFlags(order, { 'c6.maya-knows': 'in-person' }), 'tell-later');
  expect(text(knew)).toContain('I know who that is. You know I know.');
});

it('tells Maya, and lets her choose for herself', () => {
  const kitchen = (flags: Record<string, string | undefined>) => walk(start(flags), ['begin', 'sloane-hear', 'tell-now']);
  const close = kitchen({ 'c6.maya': 'restored' });
  expect(ids(close)).toEqual(['said-all', 'said-enough', 'said-go']);
  expect(c14(close, 'said-all').choices['act3.maya-choice']).toBe('stay');
  expect(text(c14(close, 'said-all'))).toContain('I’m in it. Don’t argue with me.');
  expect(c14(close, 'said-enough').choices['act3.maya-choice']).toBe('witness');
  expect(c14(close, 'said-go').choices['act3.maya-choice']).toBe('stay');
  const distant = kitchen({ 'c6.maya': 'strained', 'act3.maya-status': 'detained' });
  expect(text(distant)).toContain('She has put the sugar bowl on top of both of them');
  const all = c14(distant, 'said-all');
  expect([all.choices['act3.maya-choice'], all.facts.includes('c14.maya-witness')]).toEqual(['witness', true]);
  expect(c14(distant, 'said-go').choices['act3.maya-choice']).toBe('away');
  expect(leverageBoard(all).holds.map((a) => a.id)).toContain('maya');
});

it('offers counterplay only with the verdict and one more thing', () => {
  expect(ids(toAnswer(start()))).toEqual(['order-comply', 'order-refuse']);
  expect(ids(toAnswer(start({ 'act3.ally.marsh': 'in' }), 'sloane-shut'))).toEqual(['order-comply', 'order-refuse']);
  const ready = toAnswer(start({ 'act3.ally.marsh': 'in' }));
  expect([counterReady14(ready), secondThings14(ready)]).toEqual([true, ['marsh']]);
  expect(ids(ready)).toEqual(['order-comply', 'order-refuse', 'order-counter']);
  expect(ids(toAnswer(start({ 'c9.lever': 'oracle', 'c13.card': 'taken' }), 'sloane-shut'))).toContain('order-counter');
});

it('hands Sloane over on the comply path, and Celeste forgets to say darling', () => {
  const sunday = c14(toAnswer(start()), 'order-comply');
  expect(sunday.phase).toBe('sunday');
  expect(text(sunday)).toContain('I would have done the same.');
  expect(ids(sunday)).toEqual(['comply-copy', 'comply-clean']);
  const copy = c14(sunday, 'comply-copy');
  expect([copy.phase, copy.choices['act3.sloane'], copy.choices['c14.copy']]).toEqual(['after', 'handed', 'yes']);
  expect(text(copy)).toContain('For one sentence, when she speaks, she forgets to say darling.');
  expect(leverageBoard(copy).holds.find((a) => a.id === 'verdict')?.label).toContain('photograph');
  const clean = c14(sunday, 'comply-clean');
  expect(leverageBoard(clean).holds.map((a) => a.id)).not.toContain('verdict');
  expect(text(finish(clean))).toContain('I handed her the woman who showed it to me.');
  expect(leverageBoard(clean).held[0].wants).toBe('Victoria Sloane and her file, at the Vesper, Sunday at six');
});

it('spends Adrian’s name on refusal: the new lock, the men on the stairs, the fire escape', () => {
  const sunday = c14(toAnswer(start({ 'c8.pryce': 'chain', 'c5.published': undefined })), 'order-refuse');
  expect(currentPlace(sunday, 'x')).toBe('SUNDAY · 19:00 · HOME, AND THE FIRE ESCAPE');
  expect(text(sunday)).toContain('your key does not fit your own door');
  expect(text(sunday)).toContain('Pointing me out of mine.');
  expect(ids(sunday)).toEqual(['escape-fire']);
  const out = c14(sunday, 'escape-fire');
  expect([out.choices['act3.adrian-burned'], out.choices['act3.home'], out.facts.includes('c14.burned')]).toEqual(['yes', 'lost', true]);
  expect(text(out)).toContain('AXIOM CONFIRMS SECURITY REVIEW');
  expect(ids(c14(toAnswer(start({ 'c5.published': 'yes' })), 'order-refuse'))).toEqual(['escape-fire', 'escape-front']);
  const done = finish(out);
  expect(text(done)).toContain('They took the flat. They can have it. It was hers.');
  expect(done.history.filter((h) => h.node.startsWith('chapter14.')).flatMap((h) => h.blocks.map((b) => b.text)).join('\n')).not.toMatch(SEXUAL);
});

it('makes Celeste afraid on the counterplay path, and wins bounded terms', () => {
  const ready = toAnswer(start({ 'act3.ally.marsh': 'in', 'c13.card': 'taken', 'act3.maya-status': 'detained' }), 'sloane-hold');
  const sunday = c14(ready, 'order-counter');
  expect(ids(sunday)).toEqual(['lay-marsh', 'lay-card']);
  const laid = c14(sunday, 'lay-marsh');
  expect([laid.choices['act3.celeste-afraid'], laid.choices['act3.terms'], laid.choices['act3.sloane'], laid.choices['act3.maya-status']]).toEqual(['yes', 'agreed', 'free', 'withdrawn']);
  expect(text(laid)).toContain('She does it too carefully');
  expect(text(laid)).toContain('You know exactly what it is worth, darling.');
  expect(text(laid)).toContain('That you would turn round.');
  expect(leverageBoard(laid).holds.map((a) => a.id)).toEqual(expect.arrayContaining(['verdict', 'sloane', 'terms']));
  expect(text(finish(laid))).toContain('I am going to live in that sentence until the board meets.');
});

it('keeps the evening chosen, and lets Owen Marsh into it if she turned him', () => {
  const after = walk(toAnswer(start({ 'act3.ally.marsh': 'in', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined })), ['order-counter', 'lay-marsh']);
  expect(ids(after)).toEqual(['evening-julian', 'evening-marsh', 'after-alone']);
  const invited = c14(after, 'evening-marsh');
  expect(currentPlace(invited, 'x')).toBe('Late · A flat in Kennington');
  expect(ids(invited)).toEqual(['evening-marsh-no-sex', 'evening-marsh-sex', 'evening-leave']);
  const chose = c14(invited, 'evening-marsh-sex');
  expect(chose.facts).toContain('c14.evening-consent');
  expect(ids(chose)).toEqual(['evening-stop', 'evening-stay']);
  const stayed = c14(chose, 'evening-stay');
  expect([stayed.phase, stayed.choices['c14.evening-outcome']]).toEqual(['complete', 'intimate-sex']);
  expect(text(stayed)).toContain('for once nobody is filming it. The scene fades.');
  expect(c14(chose, 'evening-stop').choices['c14.evening-outcome']).toBe('withdrawn');
  expect(text(c14(invited, 'evening-leave'))).toContain('he lets you go without a word of argument');
  const refuged = c14(walk(toAnswer(start({ 'act3.ally.marsh': 'in' })), ['order-refuse', 'escape-fire']), 'evening-marsh');
  expect(text(refuged)).toContain('if what you need tonight is a sofa');
});

it('reaches the end from every option in every scene', () => {
  const s0 = start({ 'act3.ally.marsh': 'in', 'c13.card': 'taken', 'act3.honeypot': 'burned', 'c12.statement': 'recorded', 'act3.ally.nora': 'in', 'case.strength': 'strong', 'c9.lever': 'oracle', 'own.crossover': 'institutional', 'c5.published': 'yes', 'c6.maya': 'restored', 'c4.mutual-interest': 'yes', 'c10.betrayed': undefined });
  const drive = (wants: string[]) => {
    let x = c14(s0, 'begin');
    for (let i = 0; i < 25 && ids(x).length; i++) x = c14(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['sloane-hold'], ['sloane-shut', 'order-counter', 'lay-case'], ['sloane-take', 'order-counter', 'lay-nora'],
    ['tell-later', 'said-all'], ['said-go'], ['order-comply', 'comply-copy'], ['order-refuse', 'escape-front', 'evening-marsh', 'evening-leave'],
    ['order-counter', 'lay-card'], ['order-counter', 'lay-broadcast'], ['order-counter', 'lay-ashby', 'evening-julian', 'evening-julian-no-sex', 'evening-stay'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter14.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter14.' + w);
  }
}, 120_000);
