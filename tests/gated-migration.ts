import type { GameEvent, Intent } from '../src/state/actions';
import type { GameState } from '../src/state/schema';
import { act, initialState } from '../src/state/reducer';
import { chapter7Choices } from '../src/content/chapter7';
import { chapter8Choices } from '../src/content/chapter8';

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
  // Chapter 8 pass 2: report the break-in, let the week's bills run.
  'chapter8.breakin-report',
  'chapter8.money-owing',
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
      const fill = [...chapter7Choices(s), ...chapter8Choices(s)].find((c) => GATED_DEFAULTS.includes(c.id));
      if (!fill || inserted > 8) throw new Error(`Refused ${JSON.stringify(intent)} at ${s.scene}.${s.phase} (event ${event.sequence}) with no default`);
      s = act(s, { type: fill.id.startsWith('chapter8.') ? 'CHAPTER8_CHOOSE' : 'CHAPTER7_CHOOSE', id: fill.id } as Intent);
    }
  }
  return s.ledger;
}
