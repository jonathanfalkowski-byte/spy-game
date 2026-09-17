import type { GameState } from './schema';

/** An explicit semantic boundary, never a save migration or historical rewrite. */
export function canContinueAudit(s: GameState) {
  return (
    (s.contentRevision === 13 && s.scene === 'chapter3' && s.phase === 'nightComplete') ||
    (s.contentRevision === 14 && s.scene === 'chapter3') ||
    (s.contentRevision === 15 && s.scene === 'chapter4') ||
    (s.contentRevision === 16 && s.scene === 'chapter5' && s.phase !== 'complete')
  );
}
