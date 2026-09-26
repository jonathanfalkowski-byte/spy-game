import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden16 from '../fixtures/rev19-chapter16-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { board17, chapter17Choices, nellSaid17 } from '../../src/content/chapter17';
import { leverageBoard } from '../../src/content/leverage';

beforeEach(() => {
  for (const n of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter17Choices(s).map((c) => c.id.replace(/^chapter17\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const ch17 = (s: GameState) => s.history.filter((h) => h.node.startsWith('chapter17.')).flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const c17 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER17_CHOOSE', id: 'chapter17.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + ids(s).join(', '));
  return next;
};
/** The deepening pass's moments stand in front of later choices: take their neutral pick when one is in the way. */
const NEUTRAL = ['soames-brief', 'crew-hold', 'alone-stand'];
const walk = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c17(y, n);
    }
    return c17(y, id);
  }, s);
const complete16 = (name: string) => replay(golden16.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
const start = (flags: Record<string, string | undefined> = {}, from = 'expose-front') => withFlags(complete16(from), flags);
/** Alone, thin, unseen: the free-agent core walking in (ENDGAME §5 autonomy guard). */
const alone = { 'act4.inside': 'none', 'act4.case': 'thin', 'act4.outside': 'switch', 'act4.seen': 'no', 'act4.held': 'none', 'act4.first': 'page', 'c14.file': undefined, 'act3.verdict': undefined };
const prefer = ['open-room', 'press-fraud', 'soames-brief', 'sloane-stand', 'offer-refuse', 'crew-hold', 'alone-stand', 'named-wait', 'last-no'];
const finish = (s: GameState) => {
  let x = s;
  for (let i = 0; i < 20 && ids(x).length; i++) x = c17(x, prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
  return x;
};
const SEXUAL = /\b(undress\w*|naked|nude|kiss\w*|sex\w*|arous\w*|lust\w*)\b/i;

it('opens after an own-power Chapter 16 ending, and stays closed in production', () => {
  for (const from of ['expose-front', 'terms-car', 'nell-quiet']) expect(ids(start({}, from))).toEqual(['begin']);
  expect(ids(start({ 'route.lane': 'executive' }))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER17', '');
  expect(chapter17Choices(start())).toEqual([]);
  expect(JSON.stringify(availableIntents(start()))).not.toContain('CHAPTER17');
});

it('lets Celeste present the product, and lands the first card', () => {
  const room = c17(start({ 'act4.wear': 'black', 'act4.inside': 'iris,julian' }), 'begin');
  expect(ch17(room)).toContain('It has performed so well, in fact, that it has asked to address the board.');
  expect(ch17(room)).toContain('Black. You did dare.');
  expect(ch17(room)).toContain('I have a car at seven.');
  expect(ch17(room)).toContain('Iris and Julian');
  expect(ids(room)).toEqual(['open-room', 'open-celeste', 'open-silent']);
  expect(ch17(c17(room, 'open-room'))).toContain('I’d like to read you the warranty.');
  const cards = c17(withFlags(room, { 'act4.first': 'cards' }), 'open-silent');
  expect([cards.phase, cards.choices['act4.open']]).toEqual(['defect', 'silent']);
  expect(ch17(cards)).toContain('goes white before anybody has said what they are');
  expect(ch17(c17(withFlags(room, { 'act4.first': 'nell' }), 'open-celeste'))).toContain('for the first time since you came in, he looks at Celeste');
  expect(ch17(c17(start(alone), 'begin'))).toContain('The two chairs by the wall are empty.');
});

it('argues the defect, with the original produced if she only has a reconstruction and an ally has it', () => {
  const signed = walk(start(), ['begin', 'open-room']);
  expect(ch17(signed)).toContain('her own is the second of the three');
  const rebuilt = walk(start({ ...alone, 'act4.inside': 'sloane' }), ['begin', 'open-room']);
  expect(ch17(rebuilt)).toContain('Her own copy. Carried for a year. Celeste stops smiling.');
  expect(ch17(walk(start(alone), ['begin', 'open-room']))).toContain('True, and without the signatures.');
  expect(ids(signed)).toEqual(['press-fraud', 'press-every', 'press-cost']);
  const cost = c17(signed, 'press-cost');
  expect([cost.phase, cost.choices['act4.press']]).toEqual(['defect', 'cost']);
  expect(ch17(cost)).toContain('Did you choose it?');
  expect(ids(cost)).toEqual(['soames-yes', 'soames-no', 'soames-brief']);
  const chose = c17(cost, 'soames-yes');
  expect([chose.phase, chose.choices['act4.soames']]).toEqual(['sloane', 'yes']);
  expect(ch17(chose)).toContain('You can’t sell the choosing.');
  expect(ch17(cost)).toContain('Celeste. Did we know?');
  expect(ch17(cost)).toContain('Of course we knew, Anton. You signed it.');
});

it('resolves Sloane in front of the board, and lets Evelynn choose what she is there', () => {
  const inRoom = walk(start({ 'act4.inside': 'sloane' }), ['begin', 'open-room', 'press-fraud', 'soames-brief']);
  expect(ch17(inRoom)).toContain('I objected in writing, on the fourth of March.');
  const annexe = walk(start({ 'act4.inside': 'none' }), ['begin', 'open-room', 'press-fraud', 'soames-brief']);
  expect(ch17(annexe)).toContain('Poor Victoria. She always did want to be the one who was right.');
  expect(ids(inRoom)).toEqual(['sloane-vouch', 'sloane-stand', 'sloane-use']);
  expect(c17(inRoom, 'sloane-use').choices['act4.sloane']).toBe('use');
  expect(ch17(c17(inRoom, 'sloane-vouch'))).toContain('She raised it. You buried it.');
});

it('makes the offer, and lands the held card on it', () => {
  const turn = walk(start({ 'act4.held': 'nell' }), ['begin', 'open-room', 'press-fraud', 'sloane-stand']);
  expect(ch17(turn)).toContain('You would do the placing.');
  expect(ids(turn)).toEqual(['offer-refuse', 'offer-draw', 'offer-laugh']);
  const refused = c17(turn, 'offer-refuse');
  expect([refused.phase, refused.choices['act4.offer'], refused.choices['act4.held-landed']]).toEqual(['turn', 'refuse', 'nell']);
  // The crew speaks, or is held back; alone, she stands.
  const crew = c17(withFlags(refused, { 'act4.inside': 'marsh,julian' }), 'crew-speak');
  expect([crew.phase, crew.choices['act4.crew-beat']]).toEqual(['nell', 'speak']);
  expect(ch17(crew)).toContain('Spelled correctly.');
  expect(ch17(crew)).toContain('Helix will be taking its business elsewhere');
  expect(ids(refused)).toEqual(['crew-speak', 'crew-hold']);
  expect(ch17(refused)).toContain('Last time it was her.');
  expect(ch17(c17(turn, 'offer-draw'))).toContain('Somebody always has to be on page seven.');
  const hands = c17(walk(start(alone), ['begin', 'open-room', 'press-fraud', 'sloane-stand']), 'offer-laugh');
  expect(ch17(hands)).toContain('I’m still here. That’s the card.');
  expect(ids(hands)).toEqual(['alone-stand']);
  expect(ch17(c17(hands, 'alone-stand'))).toContain('It is the rudest thing anybody has ever done in that room.');
});

it('tells what happened to Nell, and whether Celeste says her name', () => {
  const nell = walk(start({ 'act4.inside': 'nora' }), ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'crew-hold']);
  expect(ch17(nell)).toContain('The Jakarta order was mine.');
  expect(ch17(nell)).toContain('He watched her fall. He did not stop.');
  expect(ch17(nell)).toContain('I rang her sister at seven.');
  expect(ids(nell)).toEqual(['named-ask', 'named-nora', 'named-wait']);
  const nora = c17(nell, 'named-nora');
  expect([nora.choices['act4.named'], nora.choices['act4.nell-said']]).toEqual(['nora', 'eleanor']);
  expect(ch17(nora)).toContain('Eleanor. Her name was Eleanor Linden.');
  expect(ids(walk(start({ 'act4.inside': 'none' }), ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'alone-stand']))).toEqual(['named-ask', 'named-wait']);
  // Asked for it, with a thin case, she keeps the legend's name.
  expect(nellSaid17(withFlags(nell, { 'act4.named': 'ask', 'act4.case': 'thin' }))).toBe('evie');
  expect(nellSaid17(withFlags(nell, { 'act4.named': 'ask', 'act4.case': 'strong' }))).toBe('eleanor');
});

it('scales the board’s decision by the case, and never topples Meridian', () => {
  expect(board17(start(alone))).toEqual({ board: 'closed', terms: 'none' });
  expect(board17(start({ ...alone, 'act4.outside': 'theo' }))).toEqual({ board: 'diminished', terms: 'partial' });
  expect(board17(start({ ...alone, 'act4.case': 'supported' }))).toEqual({ board: 'diminished', terms: 'partial' });
  expect(board17(start({ ...alone, 'act4.case': 'strong' }))).toEqual({ board: 'resigned', terms: 'full' });
  expect(board17(start({ ...alone, 'act4.case': 'supported', 'act4.sloane': 'use' }))).toEqual({ board: 'resigned', terms: 'full' });
  const closed = walk(start(alone), ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'named-wait']);
  expect(ch17(closed)).toContain('The board closes ranks');
  expect(ch17(closed)).toContain('I have sat on this board for thirty-one years.');
  expect(ch17(closed)).toContain('They have only not lost yet.');
  expect(ch17(closed)).toContain('Did you ever like being her?');
  const done = c17(closed, 'last-no');
  expect([done.phase, done.choices['act4.board'], done.choices['act4.terms']]).toEqual(['complete', 'closed', 'none']);
  expect(leverageBoard(done).holds.map((a) => a.id)).not.toContain('undertaking');
  const resigned = finish(start({ ...alone, 'act4.case': 'overwhelming', 'act4.aim': 'nell' }));
  expect(resigned.choices['act4.board']).toBe('resigned');
  expect(ch17(resigned)).toContain('Madame Laurent has offered her resignation from the board');
  expect(ch17(resigned)).toContain('released to her sister, entire');
  expect(leverageBoard(resigned).holds.map((a) => a.id)).toContain('undertaking');
  for (const s of [done, resigned]) expect(['resigned', 'diminished', 'closed']).toContain(s.choices['act4.board']);
});

it('gives them one minute alone, and a front door she opens herself', () => {
  const vote = walk(start({ 'act4.outside': 'pryce' }), ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'named-wait']);
  expect(ids(vote)).toEqual(['last-yes', 'last-no', 'last-orchid']);
  const orchid = c17(vote, 'last-orchid');
  expect(ch17(orchid)).toContain('She used to do exactly that. With every single one.');
  expect(ch17(orchid)).toContain('Mr Pryce getting out to open the rear door');
  expect(ch17(orchid)).toContain('I walked out of the Vesper by the front door, and nobody opened it for me. I opened it myself.');
  expect(ch17(orchid)).not.toMatch(SEXUAL);
});

it('reaches the end from every option in every scene', () => {
  const rich = { 'act4.inside': 'sloane,nora', 'act4.outside': 'theo', 'act4.held': 'cards' };
  const drive = (wants: string[]) => {
    let x = c17(start(rich), 'begin');
    for (let i = 0; i < 20 && ids(x).length; i++) x = c17(x, wants.find((w) => ids(x).includes(w)) ?? prefer.find((p) => ids(x).includes(p)) ?? ids(x)[0]);
    return x;
  };
  const every = [
    ['open-celeste', 'press-every', 'sloane-vouch', 'offer-draw', 'named-ask', 'last-yes'],
    ['open-silent', 'press-cost', 'sloane-use', 'offer-laugh', 'named-nora', 'last-orchid'],
    ['open-room', 'press-fraud', 'sloane-stand', 'offer-refuse', 'named-wait', 'last-no'],
    ['soames-yes', 'crew-speak'], ['soames-no', 'crew-hold'],
  ];
  for (const wants of every) {
    const end = drive(wants);
    expect(`${end.scene}.${end.phase}`).toBe('chapter17.complete');
    const taken = end.ledger.map((e) => (e.action as { id?: string }).id);
    for (const w of wants) expect(taken).toContain('chapter17.' + w);
  }
  for (const held of ['verdict', 'nell', 'cards', 'page', 'phone', 'adrian', 'ashby', 'none'])
    expect(ch17(walk(start({ 'act4.held': held }), ['begin', 'open-room', 'press-fraud', 'sloane-stand', 'offer-refuse'])).length).toBeGreaterThan(0);
}, 120_000);
