import type { GameState } from '../state/schema';
import production from './approved-scene-art.json';
import { homeSceneArt } from './home-scene-art';
import { apartmentEndingArt5, chapter5ReadingBeats } from './chapter5-beats';

export type ArtIssue =
  | 'SHOT_WITHOUT_APPROVED_ASSET'
  | 'ASSET_WITHOUT_VALID_SHOT'
  | 'WARDROBE_MISMATCH'
  | 'PROP_CUSTODY_MISMATCH'
  | 'LOCATION_MISMATCH'
  | 'FUTURE_STATE_VISUAL';
export type SceneShot = {
  shotId: string;
  assetId?: string;
  alt: string;
  kind?: 'home' | 'chapter5';
};
export type SceneArt = SceneShot & { asset: (typeof production)[number] };
const assets = new Map(production.map((a) => [a.id, a]));

// Explicit authoring bindings. Asset names are not searched, guessed or constructed at runtime.
export const homeBindings = {
  'pre-glasshouse': {
    executive: 'apartment-pre-glasshouse-executive-v1-production',
    socialite: 'apartment-pre-glasshouse-socialite-v1-production',
    shadow: 'apartment-pre-glasshouse-shadow-v1-production',
  },
  'post-glasshouse': {
    executive: 'apartment-post-glasshouse-executive-v1-production',
    socialite: 'apartment-post-glasshouse-socialite-v1-production',
    shadow: 'apartment-post-glasshouse-shadow-v1-production',
  },
} as const;
export const shotBindings: Record<string, { assetId: string; location: string }> = {
  'opening.apartment.shot01': {
    assetId: 'opening-apartment-master-v2-production',
    location: 'apartment',
  },
  'opening.apartment.inspect-lease': {
    assetId: 'opening-apartment-housing-notice-v1-production',
    location: 'apartment',
  },
  'opening.apartment.inspect-medical': {
    assetId: 'opening-apartment-medical-package-v1-production',
    location: 'apartment',
  },
  'c05.s01.shot01': {
    assetId: 'c5-s01-daytime-apartment-anchor-v5-production',
    location: 'apartment',
  },
  'clinic.wardrobe.shot01': { assetId: 'eve-bg-wardrobe-continuity-v2', location: 'wardrobe' },
  'evening.lantern.shot01': { assetId: 'eve-scene-maya-evening-continuity-v2', location: 'bar' },
  'c05.s06.shot01-preview': {
    assetId: 'c5-h1-arrival-composite-v3-production',
    location: 'harbour',
  },
  'c05.s06.shot12-entrance': {
    assetId: 'c5-harbour-evelynn-julian-composite-v2-production',
    location: 'harbour',
  },
  'c05.s06.shot15-departed': {
    assetId: 'c5-harbour-julian-departed-composite-v1-production',
    location: 'harbour',
  },
  'c05.s06.shot13-return': {
    assetId: 'c5-h2-coffee-return-composite-v1-production',
    location: 'harbour',
  },
  'c05.s07.shot03-arrival': {
    assetId: 'c5-s07-aster-arrival-composite-v2-production',
    location: 'aster-studio',
  },
  'c05.s12.shot05-phone': {
    assetId: 'c5-s12-shot05-phone-composite-v2-production',
    location: 'apartment',
  },
};
for (const [moment, outfits] of Object.entries(homeBindings)) {
  for (const [outfit, assetId] of Object.entries(outfits))
    shotBindings[`home.${moment}.shot01-${outfit}`] = { assetId, location: 'apartment' };
}

export function unboundProductionAssets() {
  const bound = new Set(Object.values(shotBindings).map((b) => b.assetId));
  return production
    .filter((a) => !bound.has(a.id))
    .map((a) => ({
      assetId: a.id,
      issue: 'ASSET_WITHOUT_VALID_SHOT' as const,
    }));
}

/** Reader cuts are transient UI state and always derive from the reached immutable snapshot. */
type ReadingSequence = NonNullable<ReturnType<typeof chapter5ReadingBeats>>;
const readingCache = new WeakMap<GameState, ReadingSequence | undefined>();
export function currentReadingBeats(state: GameState) {
  if (readingCache.has(state)) return readingCache.get(state);
  const sequence = chapter5ReadingBeats(state);
  readingCache.set(state, sequence);
  return sequence;
}

/** Independent guard checks also used by the development inspector and authoring tests. */
export function validateSceneShot(state: GameState, shot: SceneShot): ArtIssue[] {
  const binding = shotBindings[shot.shotId];
  const asset = shot.assetId ? assets.get(shot.assetId) : undefined;
  const issues: ArtIssue[] = [];
  if (!binding || (shot.assetId && binding.assetId !== shot.assetId))
    issues.push('ASSET_WITHOUT_VALID_SHOT');
  if (!asset) issues.push('SHOT_WITHOUT_APPROVED_ASSET');
  if (asset && binding && asset.location !== binding.location) issues.push('LOCATION_MISMATCH');
  const node = state.scene + '.' + state.phase;
  if (shot.shotId.startsWith('home.')) {
    if (
      ![
        'mission.home',
        'mission.homePresentation',
        'mission.homeContact',
        'chapter3.home',
      ].includes(node)
    )
      issues.push('LOCATION_MISMATCH');
    if (!shot.shotId.endsWith('-' + state.clinic.outfit)) issues.push('WARDROBE_MISMATCH');
    if (!homeSceneArt(state)) issues.push('FUTURE_STATE_VISUAL');
    const expectedMoment = state.scene === 'chapter3' ? 'post-glasshouse' : 'pre-glasshouse';
    if (!shot.shotId.includes(expectedMoment)) issues.push('FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.wardrobe.shot01') {
    if (node !== 'clinic.wardrobe') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'evening.lantern.shot01') {
    if (state.day.evening !== 'meet' || !['evening.disclosure', 'evening.closure'].includes(node))
      issues.push('LOCATION_MISMATCH');
    if (state.clinic.stage !== 'unchanged') issues.push('FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.apartment.shot01') {
    if (!['apartment.bond', 'apartment.reply', 'apartment.departure'].includes(node))
      issues.push('LOCATION_MISMATCH');
    if (state.ledger.some((entry) => entry.action.type === 'INSPECT_APARTMENT'))
      issues.push('PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (
    shot.shotId === 'opening.apartment.inspect-lease' ||
    shot.shotId === 'opening.apartment.inspect-medical'
  ) {
    const expectedId = shot.shotId.endsWith('lease') ? 'lease' : 'medical';
    const latestAction = state.ledger[state.ledger.length - 1]?.action;
    if (!['apartment.bond', 'apartment.reply'].includes(node)) issues.push('LOCATION_MISMATCH');
    if (latestAction?.type !== 'INSPECT_APARTMENT' || latestAction.id !== expectedId)
      issues.push('PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId.startsWith('c05.')) {
    if (
      state.choices['c5.wardrobe'] !== 'c05.professional' ||
      state.choices['c5.presentation'] !== 'professional'
    )
      issues.push('WARDROBE_MISMATCH');
    if (shot.shotId === 'c05.s12.shot05-phone') {
      if (node !== 'chapter5.complete') issues.push('LOCATION_MISMATCH');
      if (!apartmentEndingArt5(state)) issues.push('PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
    } else {
      const reading = currentReadingBeats(state);
      const asterArrival = shot.shotId === 'c05.s07.shot03-arrival';
      if (node !== (asterArrival ? 'chapter5.proof' : 'chapter5.room'))
        issues.push('LOCATION_MISMATCH');
      // Exact reached-beat validation prevents later flags or sibling branches from fabricating an asset.
      if (!reading?.beats.some((b) => b.shotId === shot.shotId && b.file))
        issues.push('PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
    }
  }
  return [...new Set(issues)];
}

function openingShot(state: GameState): SceneShot | undefined {
  const node = state.scene + '.' + state.phase;
  if (state.scene === 'apartment') {
    const action = state.ledger[state.ledger.length - 1]?.action;
    const shotId =
      action?.type === 'INSPECT_APARTMENT'
        ? `opening.apartment.inspect-${action.id}`
        : 'opening.apartment.shot01';
    return { shotId, assetId: shotBindings[shotId]?.assetId, alt: '' };
  }
  const ids: Record<string, string> = {
    'commute.arrival': 'opening.axiom.shot04-desk',
    'office.daniel': 'opening.office.shot01-daniel',
    'office.benton': 'opening.office.shot02-benton',
    'office.departure': 'opening.office.shot03-file',
    'helix.brief': 'opening.helix.shot01-brief',
    'helix.documents': 'opening.helix.shot02-documents',
    'helix.analysis': 'opening.helix.shot02-documents',
    'helix.review': 'opening.helix.shot03-review',
    'helix.submitted': 'opening.helix.shot04-submitted',
    'maya.promotion': 'opening.maya.shot01-coffee',
    'maya.invitation': 'opening.maya.shot01-coffee',
    'maya.case': 'opening.maya.shot01-coffee',
    'maya.goodbye': 'opening.maya.shot02-departure',
    'ending.complete': 'opening.office.shot04-alone',
  };
  return ids[node] ? { shotId: ids[node], assetId: shotBindings[ids[node]]?.assetId, alt: '' } : undefined;
}

/** Cursor is transient UI state. No change to GameState, ledger, content revision or saved bytes. */
export function resolveSceneArt(state: GameState, readingPosition = 0) {
  const reading = currentReadingBeats(state);
  let shot: SceneShot | undefined;
  const beat = reading?.beats[readingPosition];
  if (reading) {
    if (beat)
      shot = {
        shotId: beat.shotId,
        assetId: beat.file ? shotBindings[beat.shotId]?.assetId : undefined,
        alt: beat.alt,
        kind: 'chapter5',
      };
  } else {
    const home = homeSceneArt(state);
    const ending = apartmentEndingArt5(state);
    if (home) {
      const moment = state.scene === 'chapter3' ? 'post-glasshouse' : 'pre-glasshouse';
      const shotId = `home.${moment}.shot01-${state.clinic.outfit}`;
      shot = { shotId, assetId: shotBindings[shotId]?.assetId, alt: home.alt, kind: 'home' };
    } else if (ending)
      shot = {
        shotId: ending.shotId,
        assetId: shotBindings[ending.shotId].assetId,
        alt: ending.alt,
        kind: 'chapter5',
      };
    else if (state.scene === 'clinic' && state.phase === 'wardrobe')
      shot = {
        shotId: 'clinic.wardrobe.shot01',
        assetId: shotBindings['clinic.wardrobe.shot01'].assetId,
        alt: 'A tailored suit, long evening gown and understated cocktail dress hang beside the preparation-suite mirror and vanity.',
      };
    else if (
      state.scene === 'evening' &&
      ['disclosure', 'closure'].includes(state.phase) &&
      state.day.evening === 'meet'
    )
      shot = {
        shotId: 'evening.lantern.shot01',
        assetId: shotBindings['evening.lantern.shot01'].assetId,
        alt: 'Adrian and Maya sit opposite each other in a warmly lit Lantern booth, their hands on their own sides of the table.',
      };
    else shot = openingShot(state);
  }
  const issues = shot
    ? validateSceneShot(state, shot).filter(
        (i) => i !== 'ASSET_WITHOUT_VALID_SHOT' || !!shot.assetId,
      )
    : [];
  const asset = shot?.assetId ? assets.get(shot.assetId) : undefined;
  const art: SceneArt | undefined =
    shot && asset && issues.length === 0 ? { ...shot, asset } : undefined;
  return { shot, art, issues, reading };
}
