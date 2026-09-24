import type { GameState } from '../state/schema';
import { hasRevision20 } from './revision';

/** Benton named at the Glass House with nothing that placed him in the room (right name, no finding). */
export const guessedBenton = (s: GameState) => s.mission.source === 'benton' && s.mission.reasoning === 'unsupported';

/**
 * Revision 20 (review 2026-09-24): an evidence-free correct guess is not rewarded in full. Sloane
 * remembers it, it costs her lane a seed in the Chapter 6 route tally, and she raises it when she
 * next has leverage (Chapter 6 friction, Chapter 8 car). Derived from the mission record already in
 * every save, so there is no new score to drift; older revisions never see it.
 */
export const sloaneDoubts = (s: GameState) => hasRevision20(s.contentRevision) && guessedBenton(s);

export const SLOANE_DOUBT_BELIEF = 'Evelynn named Benton before anything placed him in the room';
