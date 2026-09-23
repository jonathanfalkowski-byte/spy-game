import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { GameState } from '../../src/state/schema';
import { get6 } from '../../src/content/chapter6-model';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { sceneById } from '../../src/content/scenes';
import { c6, chapter5Complete, ids, text, walk, type Setup } from '../chapter6-helpers';

beforeEach(() => vi.stubEnv('VITE_EVE_CHAPTER6', '1'));
afterEach(() => vi.unstubAllEnvs());

const julian = { 'c5.service': 'julian' };
const enter = (opts: Setup = {}) => c6(chapter5Complete(opts), 'begin');
const toFriction = (opts: Setup = {}) => {
  const s = c6(enter(opts), 'benefit-accept');
  return c6(s, ids(s).includes('expect-selfnote') ? 'expect-selfnote' : 'expect-clarify');
};

it('shows the arrangement in use and offers the self-funded path only its own framing', () => {
  const self = enter();
  expect(get6(self, 'exit-arrangement')).toBe('self-funded');
  expect(text(self)).toContain('nobody’s name is on your day but yours');
  expect(ids(self)).toEqual(['benefit-who', 'benefit-accept']);
  const workroom = enter({ flags: julian });
  expect(text(workroom)).toContain('Helix workroom with the card that still works');
  expect(ids(workroom)).toEqual(['benefit-who', 'benefit-workaround', 'benefit-accept']);
  expect(ids(enter({ flags: { ...julian, 'c5.obligation-provider': 'Helix office' } }))).toContain('benefit-leverage');
  expect(ids(enter({ flags: { ...julian, 'c5.offer': 'accepted' } }))).toContain('benefit-leverage');
  expect(get6(c6(workroom, 'benefit-workaround'), 'benefit-response')).toBe('alternative-priced');
  expect(sceneById['chapter6.benefit'].place).toBe('A WEEK LATER · 08:30');
});

it('names the first ask by arrangement; self-funded only notes it', () => {
  const self = c6(enter(), 'benefit-accept');
  expect(ids(self)).toEqual(['expect-selfnote']);
  expect(get6(c6(self, 'expect-selfnote'), 'expectation-response')).toBe('noted');
  const workroom = c6(enter({ flags: julian }), 'benefit-accept');
  expect(text(workroom)).toContain('There’s a dinner Thursday');
  expect(ids(workroom)).toEqual(['expect-clarify', 'expect-narrow', 'expect-negotiate', 'expect-refuse', 'expect-redirect']);
  const sloane = c6(enter({ flags: { 'c5.message-sloane': 'yes' } }), 'benefit-accept');
  expect(text(sloane)).toContain('the review of your file is closed and cooperative');
});

it('softens the decisive demand when a refusal was allowed to stand', () => {
  const demandAfter = (response: string) => {
    let s = walk(enter({ flags: julian }), ['benefit-accept', 'expect-' + response, 'counter-skip', 'friction-done', 'exit-hold', 'proof-decline']);
    return text(s);
  };
  expect(demandAfter('refuse')).toContain('I mentioned it once. You said no.');
  expect(demandAfter('refuse')).not.toContain('The room is only free until you say no to something.');
  expect(demandAfter('clarify')).toContain('The room is only free until you say no to something.');
});

it('arranges the Counter clean only with the personal number; monitored exposes Maya to Sloane', () => {
  expect(ids(toFriction())).toEqual(['counter-monitored', 'counter-skip']);
  const withLine = toFriction({ flags: { 'c5.maya-clean-line': 'yes' } });
  expect(ids(withLine)).toEqual(['counter-clean', 'counter-monitored', 'counter-skip']);
  const clean = c6(withLine, 'counter-clean');
  expect(get6(clean, 'maya-exposed')).toBe('no');
  expect(currentPlace(clean, 'x')).toBe('22:00 · THE COUNTER NEAR COMPLIANCE');
  const sloaneBefore = withLine.npcs.sloane.known.length;
  const monitored = c6(withLine, 'counter-monitored');
  expect(get6(monitored, 'maya-exposed')).toBe('yes');
  expect(monitored.npcs.sloane.known).toHaveLength(sloaneBefore + 1);
  const skipped = c6(withLine, 'counter-skip');
  expect([skipped.phase, get6(skipped, 'maya')]).toEqual(['friction', 'deferred']);
  expect(ids(skipped)).toEqual(['friction-done']);
});

it('lets a Maya who does not know hear all, part or none, then the ask and the ending', () => {
  const met = c6(toFriction(), 'counter-monitored');
  expect(text(met)).toContain('the way a compliance investigator watches anyone she did not invite');
  expect(ids(met)).toEqual(['counter-tell', 'counter-partial', 'counter-none']);
  const told = c6(met, 'counter-tell');
  expect(get6(told, 'maya-knows')).toBe('in-person');
  expect(ids(told)).toEqual(['counter-ask-bounded', 'counter-ask-restricted', 'counter-ask-none']);
  const restored = walk(told, ['counter-ask-bounded', 'counter-restored']);
  expect([restored.phase, get6(restored, 'maya'), get6(restored, 'counter-ask')]).toEqual(['friction', 'restored', 'bounded']);
  const strained = c6(c6(met, 'counter-partial'), 'counter-ask-restricted');
  expect([strained.phase, get6(strained, 'maya')]).toEqual(['friction', 'strained']);
  expect(strained.npcs.maya.beliefs.at(-1)?.key).toBe('Evelynn pushed her for restricted work material.');
  const careful = walk(met, ['counter-none', 'counter-ask-none', 'counter-careful']);
  expect(get6(careful, 'maya')).toBe('paused-by-maya');
});

it('lets a Maya who knows take up to two topics; her own life makes her protectable', () => {
  const met = c6(toFriction({ mayaKnows: true, love: true, flags: { 'c5.maya-clean-line': 'yes' } }), 'counter-clean');
  expect(text(met)).toContain('Give me a second. I’m allowed a second.');
  expect(ids(met)).toEqual(['counter-what-happened', 'counter-what-chose', 'counter-her-life', 'counter-adrian-loved']);
  const one = c6(met, 'counter-her-life');
  expect(get6(one, 'maya-exposed')).toBe('yes');
  expect(ids(one)).toEqual(['counter-what-happened', 'counter-what-chose', 'counter-adrian-loved', 'counter-ask-bounded', 'counter-ask-restricted', 'counter-ask-none']);
  const two = c6(one, 'counter-what-chose');
  expect(ids(two)).toEqual(['counter-ask-bounded', 'counter-ask-restricted', 'counter-ask-none']);
  const noLove = c6(toFriction({ mayaKnows: true, flags: { 'c5.maya-clean-line': 'yes' } }), 'counter-clean');
  expect(ids(noLove)).not.toContain('counter-adrian-loved');
  const protect = walk(two, ['counter-ask-none', 'counter-restored', 'friction-done', 'exit-hold', 'proof-decline', 'counterpower-decide']);
  expect(ids(protect)).toContain('resolve-protect');
  const done = c6(protect, 'resolve-protect');
  expect(text(done)).toContain('Don’t make a habit of it.');
});

it('offers exit preparation by arrangement and gates putting the term on record', () => {
  const exitFor = (opts: Setup, counter = ['counter-skip']) => walk(toFriction(opts), [...counter, 'friction-done']);
  expect(ids(exitFor({}))).toEqual(['exit-price', 'exit-hold']);
  expect(text(exitFor({}))).toContain('Your cost of leaving is only the leaving.');
  expect(ids(exitFor({ flags: julian }))).toEqual(['exit-price', 'exit-negotiate', 'exit-deepen', 'exit-hold']);
  expect(ids(exitFor({ flags: { ...julian, 'c5.published': 'yes' } }))).toContain('exit-expose');
  expect(ids(exitFor({ flags: julian }, ['counter-monitored', 'counter-none', 'counter-ask-bounded', 'counter-restored']))).toContain('exit-expose');
  const deepened = c6(exitFor({ flags: julian }), 'exit-deepen');
  expect([deepened.phase, get6(deepened, 'exit-prep')]).toEqual(['proof', 'deepened']);
});

it('opens only the friction beats a delivered fact unlocks, each once, then moves on', () => {
  const quiet = c6(toFriction(), 'counter-skip');
  expect(ids(quiet)).toEqual(['friction-done']);
  const busy = c6(toFriction({ flags: { 'c5.message-sloane': 'yes', 'c5.service': 'self', 'c5.published': 'yes' } }), 'counter-skip');
  expect(ids(busy)).toEqual(['friction-sloane', 'friction-public', 'friction-done']);
  const sloane = c6(busy, 'friction-sloane');
  expect(text(sloane)).toContain('I have your note that you’re paying for your own Harbour room. I am not asking you to explain');
  expect(text(sloane)).not.toContain('Meridian');
  expect(ids(sloane)).toEqual(['friction-sloane-correct', 'friction-sloane-let']);
  const corrected = c6(sloane, 'friction-sloane-correct');
  expect(get6(corrected, 'friction-sloane')).toBe('corrected');
  expect(corrected.npcs.sloane.known.at(-1)?.source).toBe('Evelynn’s direct reply to Sloane');
  expect(ids(corrected)).toEqual(['friction-public', 'friction-done']);
  const used = walk(corrected, ['friction-public', 'friction-public-use']);
  expect(get6(used, 'friction-public')).toBe('used');
  expect(ids(used)).toEqual(['friction-done']);
  expect(c6(used, 'friction-done').phase).toBe('exit');
  const met = walk(toFriction(), ['counter-monitored', 'counter-none', 'counter-ask-none', 'counter-restored', 'friction-sloane']);
  expect(text(met)).toContain('I have a line saying you met Ms Reyes off-hours.');
});

it('matches Sloane’s workspace line and Evelynn’s correction to what the message named', () => {
  const beat = (flags: Record<string, string>, counter = ['counter-skip']) => walk(toFriction({ flags }), [...counter, 'friction-sloane']);
  const cases: [string, string, string][] = [
    ['julian', 'you took the Helix workroom Julian keeps open', 'A workroom Helix lets me use, on the terms we wrote down.'],
    ['self', 'you’re paying for your own Harbour room', 'A workspace I pay for myself.'],
    ['municipal', 'you’re using the public reading desk', 'A public desk anyone can use.'],
    ['axiom', 'you kept the workspace in the flat', 'The desk in the flat, same as it’s always been.'],
  ];
  for (const [service, seen, reply] of cases) {
    const opened = beat({ 'c5.message-sloane': 'yes', 'c5.service': service });
    expect(text(opened)).toContain(`I have your note that ${seen}. I am not asking`);
    const said = c6(opened, 'friction-sloane-correct');
    expect(text(said)).toContain(`${reply} Each is exactly what it is`);
    expect(text(said)).not.toContain('A friend I’ve known ten years.');
  }
  const both = beat({ 'c5.message-sloane': 'yes', 'c5.service': 'julian' }, ['counter-monitored', 'counter-none', 'counter-ask-none', 'counter-restored']);
  expect(text(both)).toContain('I have your note that you took the Helix workroom Julian keeps open, and a line saying you met Ms Reyes off-hours.');
  expect(text(c6(both, 'friction-sloane-correct'))).toContain('A workroom Helix lets me use, on the terms we wrote down. A friend I’ve known ten years. Each is');
  const meetingOnly = c6(beat({}, ['counter-monitored', 'counter-none', 'counter-ask-none', 'counter-restored']), 'friction-sloane-correct');
  const reply = meetingOnly.history.flatMap((h) => h.blocks).filter((b) => b.speaker === 'You').at(-1)?.text;
  expect(reply).toBe('A friend I’ve known ten years. Each is exactly what it is, and none of it is what you’re worried it might be.');
  expect(ids(c6(toFriction({ flags: { 'c5.message-sloane': 'yes' } }), 'counter-skip'))).toEqual(['friction-done']);
});
