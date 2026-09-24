import golden from './fixtures/rev19-golden-ledgers.json';
import golden6 from './fixtures/rev19-chapter6-golden.json';
import golden7 from './fixtures/rev19-chapter7-golden.json';
import golden8 from './fixtures/rev19-chapter8-golden.json';
import golden9 from './fixtures/rev19-chapter9-golden.json';
import golden10 from './fixtures/rev19-chapter10-golden.json';
import type { GameEvent, Intent } from '../src/state/actions';
import { act, initialState } from '../src/state/reducer';

/** Every revision-19 golden route (Chapters 1–10), as [name, ledger]. Chapters 6–10 need their gates open. */
export const rev19Routes: (readonly [string, GameEvent[]])[] = [
  ...golden.routes.map((r) => ['ch1-5 ' + r.name, r.ledger as GameEvent[]] as const),
  ...[golden6, golden7, golden8, golden9, golden10].flatMap((g, i) =>
    g.routes.map((r) => [`ch${i + 6} ${r.name}`, r.ledger as GameEvent[]] as const),
  ),
];

/** Aster moves revision 20 no longer offers: the concept previews, the approval and directory requests. */
const retired20 = /^chapter5\.(concept-(professional|glamorous|provocative|private)|negotiate-(approval|contact))$/;

/**
 * The same player decisions as a revision-19 ledger, made in a revision-20 game. The only menu that
 * differs is Aster's (review 2026-09-24): previews are dropped, and "credit E. Vale" plus "text only"
 * become the single privacy lever. Throws if any other move is refused, so a silent divergence
 * cannot pass for a translation.
 */
export function toRevision20(ledger: GameEvent[]): GameEvent[] {
  let s = initialState(20);
  for (const event of ledger) {
    const { expectedRevision: _ignored, ...intent } = event.action as GameEvent['action'] & { id?: string };
    const id = (intent as { id?: string }).id;
    if (id && retired20.test(id)) continue;
    let move = intent as Intent;
    if (id === 'chapter5.negotiate-name' || id === 'chapter5.negotiate-image') {
      if (s.choices['c5.negotiated-private']) continue;
      move = { ...(intent as Intent & { id: string }), id: 'chapter5.negotiate-private' } as Intent;
    }
    const next = act(s, move);
    if (next === s) throw new Error(`Revision 20 refused ${JSON.stringify(move)} (revision-19 event ${event.sequence})`);
    s = next;
  }
  return s.ledger;
}
