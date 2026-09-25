import type { GameEvent, Intent } from '../src/state/actions';
import type { GameState } from '../src/state/schema';
import { act, initialState } from '../src/state/reducer';
import { chapter7Choices } from '../src/content/chapter7';
import { chapter8Choices } from '../src/content/chapter8';
import { chapter9Choices } from '../src/content/chapter9';
import { chapter10Choices } from '../src/content/chapter10';

/**
 * Neutral picks for beats added to the gated chapters after their goldens were captured (Chapter 7
 * deepening, 2026-09-24): let the watcher watch, refuse the campaign, keep the letter, wait in the
 * dark, let the photographer go, leave by the river side, hide the notes in the old jacket. None of them spends money or opens a lane.
 */
export const GATED_DEFAULTS = [
  'chapter7.watcher-ignore',
  'chapter7.campaign-refuse',
  'chapter7.card-keep',
  'chapter7.dark-wait',
  'chapter7.photo-let',
  'chapter7.woman-river',
  'chapter7.notes-hide',
  // New scene, the Old Flat: walk on.
  'chapter7.flat-go',
  // Chapter 8 pass 2: report the break-in, let the week's bills run.
  'chapter8.breakin-report',
  'chapter8.money-owing',
  // Chapter 8 set pieces: sleep, the night after.
  'chapter8.night-sleep',
  // New scenes: let the work answer, leave the account where it is.
  'chapter8.work-hold',
  'chapter8.bank-leave',
  // Chapter 9 pass 2: thank Celeste and go, deflect Marcus, sit with the name in the dark.
  'chapter9.terrace-leave',
  'chapter9.marcus-deflect',
  'chapter9.name-dark',
  // Chapter 9 set pieces: close the ORACLE file, keep the chain together, call it square, stay a source,
  // tell Maya you're fine, keep the room to yourself.
  'chapter9.oracle-close',
  'chapter9.chain-one',
  'chapter9.rook-square',
  'chapter9.clara-source',
  'chapter9.maya-fine',
  'chapter9.door-keep',
  // New scenes: sit at the usual table, leave the auction before she reaches you.
  'chapter9.table-sit',
  'chapter9.auction-leave',
  // Chapter 10 pass 2: ask what happened to her, stay in, the first lie, let the phone ring, keep the name
  // back, hand over the only copy, move the date.
  'chapter10.ask-happened',
  'chapter10.door-stay',
  'chapter10.job-lie',
  'chapter10.job-ignore',
  'chapter10.job-withhold',
  'chapter10.job-clean',
  'chapter10.job-date',
  // …tell her the truth about the dream, and wear black.
  'chapter10.dream-true',
  'chapter10.green-black',
  'chapter10.close-end',
  // The breakfast set piece: let her order.
  'chapter10.menu-let',
  // The job set pieces' second moments: slip out unseen, thank Theo, say nothing in the car, stay beside Julian, "she'll know".
  'chapter10.seen-hood',
  'chapter10.seen-no',
  'chapter10.bay-thank',
  'chapter10.car-silent',
  'chapter10.round-stay',
  'chapter10.doorman-none',
  // The remaining scenes as set pieces: close the wardrobe door on the wall.
  'chapter10.wall-close',
];

/** Moves a later pass replaced outright: the old move becomes its closest new equivalent. */
export const GATED_RENAMED: Record<string, string> = {
  // Chapter 8 pass 2: "Take stock" became the client-list choice; reading every line is the old stock-take.
  'chapter8.advance-continue': 'chapter8.list-read',
};

/**
 * Replays a gated-chapter golden ledger, inserting a GATED_DEFAULTS pick wherever the old next move is
 * refused because a new beat now stands in front of it. Throws if a refusal has no default, so a
 * real divergence cannot be papered over.
 */
export function migrateGated(ledger: GameEvent[], revision: number): GameEvent[] {
  let s: GameState = initialState(revision);
  for (const event of ledger) {
    const { expectedRevision: _ignored, ...original } = event.action;
    const renamed = 'id' in original ? GATED_RENAMED[(original as { id: string }).id] : undefined;
    const intent = renamed ? { ...original, id: renamed } : original;
    for (let inserted = 0; ; inserted++) {
      const next = act(s, intent as Intent);
      if (next !== s) {
        s = next;
        break;
      }
      const filled = fillDefault(s);
      if (!filled || inserted > 8) throw new Error(`Refused ${JSON.stringify(intent)} at ${s.scene}.${s.phase} (event ${event.sequence}) with no default`);
      s = filled;
    }
  }
  // A ledger that ended on a chapter's last move may now stop short of it (a beat was added after that
  // move): finish it on the neutral picks, so a captured "complete" stays complete.
  for (let tail = 0; tail < 8 && s.phase !== 'complete'; tail++) {
    const filled = fillDefault(s);
    if (!filled) break;
    s = filled;
  }
  return s.ledger;
}

function fillDefault(s: GameState): GameState | undefined {
  const fill = [...chapter7Choices(s), ...chapter8Choices(s), ...chapter9Choices(s), ...chapter10Choices(s)].find((c) => GATED_DEFAULTS.includes(c.id));
  if (!fill) return undefined;
  const type = ({ chapter7: 'CHAPTER7_CHOOSE', chapter8: 'CHAPTER8_CHOOSE', chapter9: 'CHAPTER9_CHOOSE', chapter10: 'CHAPTER10_CHOOSE' } as const)[fill.id.split('.')[0] as 'chapter7'];
  return act(s, { type, id: fill.id } as Intent);
}
