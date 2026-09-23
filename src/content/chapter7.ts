/** Chapter 7 · The Road You Choose. Additive inside revision 19 (reached only through CHAPTER7_CHOOSE) and gated
 * behind chapter7Playable() until the route arcs ship. Wording: docs/story/CHAPTER_7_ROUTE_CONFIRM.md (the confirm
 * beat) and docs/story/scripts/CHAPTER_7_OWN_POWER_SCRIPT.md (own-power). Only own-power has route content so far;
 * the other lanes reach a marked in-development ending. */
import type { GameState } from '../state/schema';
import { paragraph as p, thought as t, type Block, type NodeId } from './schema';
import { type C7Scene, type C7Choice, chapter7Playable, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';
import { cash5 } from './chapter5-model';
import { deriveRoute6, type RouteLane6 } from './chapter6-counterpower';
import { ownBlocks7, ownChoices7, enterClose7 } from './chapter7-own';

export const chapter7Definitions: Record<string, C7Scene> = {
  confirm: { title: 'The Road You Choose', place: 'ONE WEEK LATER', blocks: [] },
  standing: { title: 'Standing Alone', place: 'MORNING · ON YOUR OWN', blocks: [] },
  pursue: { title: 'Pulling the Thread', place: '· THE PATIENT WAY', blocks: [] },
  close: { title: 'The First Edge', place: '· WHAT YOU FOUND', blocks: [] },
  complete: { title: 'Where It Points', place: '· THAT NIGHT', blocks: [] },
};
export const chapter7Scenes = Object.entries(chapter7Definitions).map(([phase, scene]) => ({
  id: `chapter7.${phase}` as NodeId,
  ...scene,
}));

// ── The confirm-or-redirect beat ──

/** Adjacency ring: own-power ↔ executive ↔ institutional ↔ outside ↔ own-power. */
const ring: readonly RouteLane6[] = ['own-power', 'executive', 'institutional', 'outside'];
export const adjacent7 = (lane: RouteLane6): RouteLane6[] => {
  const i = ring.indexOf(lane);
  return [ring[(i + 3) % 4], ring[(i + 1) % 4]];
};
export const opposite7 = (lane: RouteLane6): RouteLane6 => ring[(ring.indexOf(lane) + 2) % 4];
const descriptor: Record<RouteLane6, string> = {
  'own-power': 'the quiet you built yourself, that no one holds but you',
  institutional: 'the machine you already know from the inside',
  executive: 'the rooms that open when the right person walks you in',
  outside: 'the ones who trade in what the institutions bury',
};
const mirror: Record<RouteLane6, string> = {
  institutional: 'Look at the last months honestly. You stayed inside the machine — you told Sloane what you were doing, you kept the apartment and the cover, you learned to hold a position from within the walls rather than outside them. It is not weakness. It is a place to stand, and you know its corridors now.',
  outside: 'Look honestly. You went to the one source no institution authored, spent your own knowledge to test it, and came away holding a truth the people in charge would rather you did not have. You have been becoming someone who trades in what others hide.',
  executive: 'Look honestly. You have been building access — the room, the dinners, the man who opens doors and means it, terms written where they favour you. You have learned that proximity to power, held on your own wording, is itself a kind of power.',
  'own-power': 'Look honestly. You paid your own way, released your own image, kept your own evidence, and refused the extensions that would have made you easier to hold. You have been building a base that is small and slow and entirely yours.',
};
export const suggested7 = (s: GameState): RouteLane6 =>
  deriveRoute6(s)?.lane ?? ((s.choices['c6.route-lane'] as RouteLane6 | undefined) ?? 'own-power');

const closeLine = p('You have chosen the road, which is more than anyone let you do with the last one. Where it goes, who is on it, and what it costs to stay — that is the rest of the story, and you are, at last, the one writing it.');

/** Writes the chosen road; own-power continues into its chapter, every other lane is not built yet. */
function choose(x: GameState, lane: RouteLane6, entry: 'built' | 'partial' | 'unbuilt') {
  setKey(x, 'route.lane', lane);
  setKey(x, 'route.entry', entry);
  setKey(x, 'route.overlay', (deriveRoute6(x)?.overlay ?? []).join(','));
  set7(x, 'suggested', suggested7(x));
  if (lane === 'own-power') setKey(x, 'own.cash', String(Math.max(0, cash5(x))));
  note7(x, 'route', `Evelynn chose the ${lane} road (${entry}). The suggestion was ${suggested7(x)}.`, 'Explicit player choice at the Chapter 7 confirm beat');
}
const nextFor = (lane: RouteLane6) => (lane === 'own-power' ? 'standing' : 'complete');

function confirmChoices(s: GameState): C7Choice[] {
  const suggested = suggested7(s);
  const opposite = opposite7(suggested);
  if (get7(s, 'break-pending'))
    return [
      offer7('confirm-break', 'Turn against everything you built', 'You’ll start this road nearly from nothing.', nextFor(opposite), (x) => {
        delete x.choices['c7.break-pending'];
        choose(x, opposite, 'unbuilt');
        return [
          p('You choose the thing your last months point away from. It is allowed — you are not a prediction, and the road you walked does not own you. But you walk into this one almost unbuilt: the allies, the resources, the standing are on the road you left. You will make them here from the beginning, and it will be harder, and it will be yours in a way nothing inherited ever is.'),
          closeLine,
        ];
      }),
      offer7('step-back', 'Stay the road you’re on', 'Keep what you built.', 'confirm', (x) => {
        delete x.choices['c7.break-pending'];
        return [];
      }),
    ];
  return [
    offer7('route-confirm', 'Keep going the way you’ve been going', 'Continue on the road you built. You start it with everything you’ve earned on it.', nextFor(suggested), (x) => {
      choose(x, suggested, 'built');
      return [
        p('You do not turn. You go on as the person your choices already made, and you carry every ally, every resource, every piece of standing you built into what comes next.'),
        closeLine,
      ];
    }),
    ...adjacent7(suggested).map((lane) =>
      offer7('route-pivot-' + lane, `Turn toward ${descriptor[lane]}`, 'A real change, affordable because it’s close to where you are.', nextFor(lane), (x) => {
        choose(x, lane, 'partial');
        return [
          p('You turn — not against everything, but toward something next to it. What you built still counts for something here; you begin the new road with part of your footing, and part of it to earn.'),
          closeLine,
        ];
      }),
    ),
    offer7('route-break', 'Turn hard, against your own history', `The opposite road: ${descriptor[opposite]}. Possible, but you start it nearly from nothing.`, 'confirm', (x) => {
      set7(x, 'break-pending');
      return [];
    }),
  ];
}

export function chapter7Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter7') return [];
  if (s.phase === 'confirm')
    return [
      p('A week after the night everything moved, the city has not changed and you have. You wake in whatever life your last months built, and for once nothing is demanding a decision before breakfast. Which means the decision is yours to make first, unprompted, about how you intend to go on.'),
      t('Nobody handed you this the way the file was handed to you. You can see the shape of the road you have actually been walking. You can keep walking it. You can also, now, choose to turn.'),
      p(mirror[suggested7(s)]),
      p('That is where you have been going. The question is only whether you meant it, and whether you still do.'),
    ];
  if (s.phase === 'complete' && getKey(s, 'route.lane') !== 'own-power')
    return [p(`[Chapter 7 · ${getKey(s, 'route.lane')} route — in development]`)];
  return ownBlocks7(s);
}

export function chapter7Choices(s: GameState): C7Choice[] {
  if (!chapter7Playable(s)) return [];
  if (s.scene === 'chapter6' && s.phase === 'complete')
    return [offer7('begin', 'Go on', 'A week later. Decide how you mean to continue.', 'confirm')];
  if (s.scene !== 'chapter7') return [];
  if (s.phase === 'confirm') return confirmChoices(s);
  return ownChoices7(s);
}

export function applyChapter7Choice(state: GameState, id: string): GameState {
  const choice = chapter7Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter7';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'close' && state.phase !== 'close') enterClose7(s);
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter7.${s.phase}` as NodeId, blocks: chapter7Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER7_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
