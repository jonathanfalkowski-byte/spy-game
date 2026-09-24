import { readdirSync, readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { sebastianNpc, type GameState } from '../../src/state/schema';
import { availableIntents, replay } from '../../src/state/reducer';
import { chapter5Choices } from '../../src/content/chapter5';
import { get5 } from '../../src/content/chapter5-model';
import { SEBASTIAN_SEX_SCOPE_OFFERED } from '../../src/content/chapter5-sebastian';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { readingBlocks } from '../../src/ui/reading-presentation';
import { c5, end4 } from '../chapter5-helpers';

const ids = (s: GameState) => chapter5Choices(s).map((c) => c.id.replace(/^chapter5\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const lastText = (s: GameState) => s.history.slice(-3).flatMap((h) => h.blocks.map((b) => b.text)).join('\n');

/** Follow preferred choices, otherwise the first available one that is not avoided. */
function drive(s: GameState, done: (s: GameState) => boolean, prefer: string[] = [], avoid: string[] = []) {
  for (let i = 0; i < 120 && !done(s); i++) {
    const open = ids(s);
    const pick = prefer.find((id) => open.includes(id)) ?? open.find((id) => !avoid.includes(id) && !id.startsWith('sebastian-') && id !== 'attention-sebastian');
    if (!pick) throw Error('No choice at ' + s.phase);
    s = c5(s, pick);
  }
  if (!done(s)) throw Error('Did not arrive; stopped at ' + s.phase);
  return s;
}

/** A revision-19 Chapter 5 run from any Chapter 4 ending. */
function start19(base = end4(), phone = true) {
  const s = replay(base.ledger, 19);
  expect(s.contentRevision).toBe(19);
  return drive(c5(s, 'begin'), (x) => x.phase === 'room', [...(phone ? ['buy-phone'] : []), 'invitation-attend', 'look-minimal'], ['buy-wardrobe', 'buy-accessory', 'buy-dinner', 'buy-phone']);
}
const toWant = (s: GameState, prefer: string[] = []) =>
  drive(s, (x) => x.phase === 'want', [...prefer, 'leave-room', 'people-finish'], ['message-maya', 'maya-new-number']);
const meet = (s: GameState, note = 'honest') => c5(c5(s, 'attention-sebastian'), 'sebastian-' + note);
const toSalon = (s: GameState) => c5(toWant(s), 'want-salon');

it('offers the sound check as a Harbour attention stop and holds the room until he is answered', () => {
  const room = start19();
  expect(ids(room)).toContain('attention-sebastian');
  const asked = c5(room, 'attention-sebastian');
  expect(get5(asked, 'attention')).toBe('1');
  expect(ids(asked).sort()).toEqual(['sebastian-honest', 'sebastian-kind', 'sebastian-silent']);
  const answered = c5(asked, 'sebastian-honest');
  expect(answered.phase).toBe('room');
  expect(get5(answered, 'sebastian-met')).toBe('harbour');
  expect(get5(answered, 'sebastian-note')).toBe('honest');
  expect(ids(answered)).toContain('leave-room');
  expect(ids(answered)).not.toContain('attention-sebastian');
  expect(sebastianNpc(answered)?.known.map((k) => k.key)).toEqual(['It loses its nerve in the middle.']);
  expect(sebastianNpc(meet(room, 'silent'))?.known).toEqual([]);
});

it('keeps revision 18 free of every Sebastian and Maya-number option', () => {
  const room19 = start19();
  const room18 = replay(room19.ledger, 18);
  expect(room18.contentRevision).toBe(18);
  const intents = JSON.stringify(availableIntents(room18));
  expect(intents).not.toContain('sebastian');
  expect(Object.hasOwn(room18.npcs, 'sebastian')).toBe(false);
  expect(decodeSave(encodeSave(room18))).toEqual(room18);
});

it('reaches the salon met and unmet from every Chapter 4 ending, with no salon motive options', () => {
  for (const base of [end4('public'), end4('professional'), end4('intimate', 'personal', 'sex'), end4('intimate', 'instrumental', 'no-sex')]) {
    for (const met of [true, false]) {
      let s = start19(base, false);
      if (met) s = meet(s);
      const want = toWant(s);
      expect(ids(want)).toContain('want-salon');
      const julianBefore = Object.entries(want.choices).filter(([k]) => /julian|mutual/.test(k));
      const salon = c5(want, 'want-salon');
      expect(salon.phase).toBe('salon');
      expect(lastText(salon)).toContain(met ? 'It was your note.' : 'You realise you have been holding your breath.');
      for (const id of ['desire-instrumental', 'desire-mixed', 'desire-personal']) expect(ids(salon)).not.toContain(id);
      expect(ids(salon).sort()).toEqual(['salon-leave', 'salon-request', 'salon-talk']);
      expect(Object.entries(salon.choices).filter(([k]) => /julian|mutual/.test(k))).toEqual(julianBefore);
    }
  }
}, 60_000);

it('ends leave, decline, open and walk at return with their remembered line and place', () => {
  const salon = toSalon(meet(start19()));
  const cases = [
    [['salon-leave'], 'left', 'It’s yours to keep', '22:05 · Adrian’s apartment'],
    [['salon-request', 'sebastian-decline'], 'declined', 'It’s yours to keep', '22:05 · Adrian’s apartment'],
    [['salon-talk', 'talk-deflect', 'sebastian-open'], 'open', 'Thursday is three days away.', '22:05 · Adrian’s apartment'],
    [['salon-talk', 'talk-true', 'sebastian-walk'], 'walk', 'four city names is in your bag', 'After midnight · Adrian’s apartment'],
  ] as const;
  for (const [path, outcome, line, place] of cases) {
    const end = path.reduce(c5, salon);
    expect(end.phase).toBe('return');
    expect(get5(end, 'sebastian-outcome')).toBe(outcome);
    expect(lastText(end)).toContain(line);
    expect(currentPlace(end, '22:30 · Adrian’s apartment')).toBe(place);
  }
});

it('speaks the walk-back offer once, after talk or request', () => {
  const salon = toSalon(start19());
  const talked = c5(c5(salon, 'salon-talk'), 'talk-true');
  expect(ids(talked)).toEqual(expect.arrayContaining(['salon-request', 'sebastian-decline', 'sebastian-walk', 'sebastian-open', 'sebastian-want']));
  const both = c5(talked, 'salon-request');
  expect(text(both).split('I’m walking back along the water.').length - 1).toBe(1);
  expect(ids(both)).not.toContain('salon-leave');
});

it('honours withdrawal at scope and in his room, and records only what Evelynn said', () => {
  const wanting = c5(c5(c5(toSalon(meet(start19())), 'salon-talk'), 'talk-lie'), 'sebastian-want');
  expect(get5(wanting, 'want-target')).toBe('sebastian');
  expect(ids(wanting).sort()).toEqual(['scope-back', 'scope-no-sex', 'scope-sex']);
  const back = c5(wanting, 'scope-back');
  expect(back.phase).toBe('return');
  expect(get5(back, 'sebastian-outcome')).toBe('withdrawn');
  expect(currentPlace(back, 'x')).toBe('22:05 · Adrian’s apartment');
  expect(lastText(back)).toContain('The sea. You wonder');
  const room = c5(wanting, 'scope-no-sex');
  expect(room.phase).toBe('salon-room');
  expect(ids(room).sort()).toEqual(['handoff-continue', 'handoff-withdraw']);
  const stopped = c5(room, 'handoff-withdraw');
  expect(get5(stopped, 'sebastian-outcome')).toBe('withdrawn');
  expect(get5(stopped, 'intimacy')).toBe('withdrawn');
  expect(lastText(stopped)).toContain('You stopped when you wanted to stop');
  expect(currentPlace(stopped, 'x')).toBe('After midnight · Adrian’s apartment');
  expect(sebastianNpc(stopped)?.known.map((k) => k.key)).toEqual([
    'It loses its nerve in the middle.',
    'She grew up by the sea.',
    'I want you.',
    'Go back with him, but not sex tonight.',
    'Stop.',
  ]);
});

it('offers the sex scope as a heat-3 fade: consent restated, stop still honoured, nothing explicit', () => {
  expect(SEBASTIAN_SEX_SCOPE_OFFERED).toBe(true);
  const wanting = c5(c5(toSalon(start19()), 'salon-request'), 'sebastian-want');
  expect(ids(wanting)).toEqual(expect.arrayContaining(['scope-no-sex', 'scope-sex', 'scope-back']));
  const agreed = c5(wanting, 'scope-sex');
  expect(get5(agreed, 'scope')).toBe('sex');
  expect(get5(agreed, 'authorization')).toBe('granted');
  expect(lastText(agreed)).toContain('either of us says stop, and it stops');
  expect(ids(agreed)).toEqual(expect.arrayContaining(['handoff-withdraw', 'handoff-continue']));
  const stopped = c5(agreed, 'handoff-withdraw');
  expect(get5(stopped, 'sebastian-outcome')).toBe('withdrawn');
  const room = c5(agreed, 'handoff-continue');
  expect(get5(room, 'sebastian-outcome')).toBe('intimate-sex');
  expect(get5(room, 'intimacy')).toBe('intimate-sex');
  expect(text(room)).toContain('whether you are sure');
  expect(text(room)).toContain('The scene fades.');
  expect(text(room)).not.toContain('explicit body');
  expect(lastText(room)).toContain('hair still down');
  for (const h of room.history) expect(() => readingBlocks(h.blocks, h.node, room.contentRevision)).not.toThrow();
  const complete = drive(room, (x) => x.phase === 'complete');
  expect(get5(complete, 'sebastian-outcome')).toBe('intimate-sex');
  expect(decodeSave(encodeSave(complete))).toEqual(complete);
});

it('completes the no-sex scope and carries the flags forward', () => {
  const wanting = c5(c5(toSalon(start19()), 'salon-request'), 'sebastian-want');
  const room = c5(c5(wanting, 'scope-no-sex'), 'handoff-continue');
  expect(get5(room, 'sebastian-outcome')).toBe('intimate-no-sex');
  expect(get5(room, 'intimacy')).toBe('intimate-no-sex');
  expect(text(room)).toContain('that’s where tonight stops');
  expect(text(room)).not.toContain('explicit body');
  expect(lastText(room)).toContain('hair still down');
  expect(currentPlace(room, 'x')).toBe('After midnight · Adrian’s apartment');
  for (const h of room.history) expect(() => readingBlocks(h.blocks, h.node, room.contentRevision)).not.toThrow();
  const complete = drive(room, (x) => x.phase === 'complete');
  for (const key of ['sebastian-outcome', 'sebastian-played']) expect(get5(complete, key)).toBeDefined();
  expect(complete.history.some((h) => h.node === 'chapter5.salon-room')).toBe(true);
  expect(decodeSave(encodeSave(complete))).toEqual(complete);
});

it('offers Maya the new number only with the personal phone, as one of the two sends', () => {
  const people = (phone: boolean) => drive(start19(end4('professional'), phone), (x) => x.phase === 'people', ['leave-room']);
  expect(ids(people(false))).not.toContain('maya-new-number');
  const s = people(true);
  expect(ids(s)).toContain('maya-new-number');
  const sent = c5(s, 'maya-new-number');
  expect(get5(sent, 'messages')).toBe('1');
  expect(get5(sent, 'maya-clean-line')).toBe('yes');
  expect(lastText(sent)).toContain('Received. That’s a new habit for you.');
  const both = c5(sent, 'message-maya');
  expect(get5(both, 'messages')).toBe('2');
  expect(ids(both)).not.toContain('maya-new-number');
  const home = drive(c5(both, 'people-finish'), (x) => x.phase === 'return', ['want-none']);
  expect(lastText(home)).toContain('its box open and folded flat');
  expect(lastText(home)).not.toContain('still boxed');
  expect(chapter5Choices(home).find((c) => c.id === 'chapter5.place-phone')?.label).toBe('Set the new phone beside the old one');
  expect(get5(home, 'maya-clean-line')).toBe('yes');
  expect(currentPlace(home, '22:30 · Adrian’s apartment')).toBe('22:30 · Adrian’s apartment');
  const boxed = drive(c5(people(true), 'people-finish'), (x) => x.phase === 'return', ['want-none']);
  expect(lastText(boxed)).toContain('still boxed');
  expect(chapter5Choices(boxed).find((c) => c.id === 'chapter5.place-phone')?.label).toBe('Place the personal phone beside the Axiom handset');
}, 30_000);

it('keeps every c5.sebastian flag out of the investigation', () => {
  const allowed = new Set(['chapter5-sebastian.ts']);
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = dir + '/' + entry.name;
      if (entry.isDirectory()) {
        if (entry.name !== 'persistence') walk(path);
      } else if (/\.(ts|tsx)$/.test(entry.name) && !allowed.has(entry.name) && /['"`]sebastian-/.test(readFileSync(path, 'utf8')))
        offenders.push(path);
    }
  };
  walk('src');
  expect(offenders).toEqual([]);
});
