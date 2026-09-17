import type { GameState } from '../state/schema';

const outfits = {
  executive: 'a tailored charcoal suit',
  socialite: 'a black evening gown',
  shadow: 'a plain charcoal dress',
} as const;

// Only owner-authorized home illustrations. Generation/catalog tooling stays offline.
export function homeSceneArt(state: GameState) {
  const outfit = state.clinic.outfit;
  if (state.clinic.stage !== 'complete' || (outfit !== 'executive' && outfit !== 'socialite' && outfit !== 'shadow')) return null;
  const moment = state.scene === 'mission' && ['home', 'homePresentation', 'homeContact'].includes(state.phase)
    ? 'pre-glasshouse'
    : state.scene === 'chapter3' && state.phase === 'home' && !state.day.completed.some(id => id.startsWith('chapter3.'))
      ? 'post-glasshouse'
      : null;
  if (!moment) return null;
  return {
    file: `art/apartment/apartment-${moment}-${outfit}-v1.png`,
    alt: `Evelynn in ${outfits[outfit]} in Adrian’s apartment, ${moment === 'pre-glasshouse' ? 'before' : 'after'} Glass House.`,
  };
}
