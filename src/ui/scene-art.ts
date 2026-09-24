import type { GameState } from '../state/schema';
import production from './approved-scene-art.json';
import { homeSceneArt } from './home-scene-art';
import { apartmentEndingArt5, chapter5ReadingBeats } from './chapter5-beats';
import { openingReadingBeats } from './opening-beats';
import { openingCaseworkShots } from './opening-casework-art';
import { environmentShot } from './environment-art';

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
  kind?: 'home' | 'chapter5' | 'environment';
};
export type SceneArt = SceneShot & { asset: (typeof production)[number] };
const assets = new Map(production.map((a) => [a.id, a]));

// A previous frame may only be held while its authored scene/node is still
// active. This is separate from the asset binding: an approved image can be
// valid for one opening beat and still be wrong after the next participant
// enters.
const openingShotNodes: Record<string, readonly string[]> = {
  'opening.apartment.shot01-mirror': ['apartment.bond', 'apartment.reply'],
  'opening.axiom.shot01-approach': ['commute.arrival'],
  'opening.axiom.shot02-security': ['commute.arrival'],
  'opening.axiom.shot03-office-arrival': ['commute.arrival'],
  'opening.office.shot01-daniel': ['commute.arrival', 'office.daniel'],
  'opening.office.shot02-benton': ['office.benton'],
  'opening.office.shot03-file': ['office.departure'],
  'opening.helix.shot01-brief': ['helix.brief'],
  'opening.helix.shot02-documents': ['helix.documents', 'helix.analysis'],
  'opening.helix.shot03-review': ['helix.review'],
  'opening.helix.shot04-submitted': ['helix.submitted'],
  'opening.maya.shot01-coffee': ['maya.promotion', 'maya.invitation', 'maya.case'],
  'opening.maya.shot02-departure': ['maya.goodbye'],
  'opening.office.shot04-alone': ['ending.complete'],
  'opening.blackglass.shot01-arrival': ['file.arrival'],
  'opening.blackglass.shot02-directory': ['file.directory'],
  'opening.blackglass.shot03-authorized': ['file.authorized'],
  'opening.blackglass.shot04-security-intervention': ['security.intervention'],
  'opening.blackglass.shot05-security-escort': ['security.escort'],
  'opening.sloane.shot01-intro': ['sloane.intro'],
  'opening.sloane.shot02-allegation': ['sloane.allegation'],
  'opening.sloane.shot03-brief': ['sloane.brief'],
  'opening.sloane.shot04-identity': ['sloane.identity'],
  'opening.sloane.shot05-offer': ['sloane.offer'],
  'opening.refusal.shot01-lobby': ['refusal.lobby'],
  'opening.refusal.shot02-reconsider': ['refusal.reconsider'],
  'clinic.reception.shot01': ['clinic.reception', 'clinic.receptionReply'],
  'clinic.privacy.shot01': ['clinic.privacy'],
  'clinic.privacyReply.shot01-stay': ['clinic.privacyReply'],
  'clinic.privacyReply.shot01-private': ['clinic.privacyReply'],
  'clinic.exam.shot01-stay': ['clinic.exam'],
  'clinic.exam.shot01-private': ['clinic.exam'],
  'clinic.examResult.shot01-private': ['clinic.examResult'],
  'clinic.protocol.shot01': ['clinic.protocol'],
  'clinic.simulation.shot01': ['clinic.simulation', 'clinic.display'],
  'clinic.authorization.shot01': ['clinic.authorization'],
  'clinic.preparation.shot01': ['clinic.preparation'],
  'clinic.voice.shot01-private': ['clinic.voice', 'clinic.voiceReply'],
  'clinic.voicePause.shot01-stay': ['clinic.voicePause'],
  'clinic.face.shot01-stay': ['clinic.face', 'clinic.faceReply'],
  'clinic.facePause.shot01-stay': ['clinic.facePause'],
  'clinic.steps.shot01-stay': ['clinic.steps'],
  'clinic.mirror.shot01': ['clinic.mirror'],
  'clinic.mirror.shot01-look': ['clinic.name'],
  'clinic.name.shot01': ['clinic.name'],
  'clinic.rest.shot01': ['clinic.rest'],
  'clinic.recoveryContact.shot01': ['clinic.recoveryContact'],
  'clinic.makeup.shot01-executive': ['clinic.makeup'],
  'clinic.makeup.shot01-socialite': ['clinic.makeup'],
  'clinic.makeup.shot01-shadow': ['clinic.makeup'],
  'clinic.recoveryReply.shot01-quiet': ['clinic.recoveryReply'],
  'clinic.recoveryReply.shot01-sent': ['clinic.recoveryReply'],
  'clinic.presentationReview.shot01-executive': ['clinic.presentationReview'],
  'clinic.presentationReview.shot01-socialite': ['clinic.presentationReview'],
  'clinic.presentationReview.shot01-shadow': ['clinic.presentationReview'],
  'clinic.rehearsal.shot01-executive': ['clinic.rehearsal'],
  'clinic.rehearsal.shot01-socialite': ['clinic.rehearsal'],
  'clinic.rehearsal.shot01-shadow': ['clinic.rehearsal'],
  'clinic.briefing.shot01': ['clinic.briefing'],
  'clinic.profile.shot01': ['clinic.profile'],
  'clinic.farewell.shot01': ['clinic.farewell'],
  'mission.assessment': ['mission.assessment'],
  'mission.method': ['mission.method'],
  'chapter3.surveillance.shot01': ['chapter3.surveillance'],
  'chapter4.entry.shot01': ['chapter4.entry'],
  'chapter4.consequences.shot01': ['chapter4.consequences'],
  'chapter4.resource.shot01': ['chapter4.resource'],
  'chapter4.assignment.shot01': ['chapter4.assignment'],
  'c05.s03.shot01-no-purchase': ['chapter5.echo'],
  'c05.s03.shot01-phone': ['chapter5.echo'],
  'c05.s03.shot01-blouse': ['chapter5.echo'],
  'c05.s03.shot01-clasp': ['chapter5.echo'],
  'c05.s03.shot01-lunch': ['chapter5.echo'],
};

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
  ...openingCaseworkShots,
  'opening.apartment.shot01': {
    assetId: 'opening-apartment-master-v3-production',
    location: 'apartment',
  },
  'opening.apartment.shot01-mirror': {
    assetId: 'adrian-first-bathroom-mirror-apartment-v1-production',
    location: 'apartment',
  },
  'opening.apartment.inspect-lease': {
    assetId: 'opening-apartment-housing-notice-v2-production',
    location: 'apartment',
  },
  'opening.apartment.inspect-medical': {
    assetId: 'opening-apartment-medical-package-v2-production',
    location: 'apartment',
  },
  'opening.axiom.shot01-approach': {
    assetId: 'axiom-exterior-approach-adrian-v2-production',
    location: 'axiom-approach',
  },
  'opening.axiom.shot02-security': {
    assetId: 'axiom-security-gate-adrian-v2-production',
    location: 'axiom-security-lobby',
  },
  'opening.axiom.shot03-office-arrival': {
    assetId: 'axiom-office-approach-adrian-v3-transparent-production',
    location: 'axiom-office-arrival',
  },
  'opening.office.shot01-daniel': {
    assetId: 'axiom-opening-office-shot01-daniel-v3-transparent-production',
    location: 'axiom-strategic-intelligence',
  },
  'opening.office.shot02-benton': {
    assetId: 'axiom-opening-office-shot02-benton-v3-transparent-production',
    location: 'axiom-strategic-intelligence',
  },
  'opening.maya.shot01-coffee': {
    assetId: 'axiom-opening-office-shot01-maya-v3-transparent-production',
    location: 'axiom-strategic-intelligence',
  },
  'opening.maya.shot02-departure': {
    assetId: 'axiom-opening-office-shot02-maya-departure-v3-transparent-production',
    location: 'axiom-strategic-intelligence',
  },
  'opening.office.shot04-alone': {
    assetId: 'axiom-opening-office-shot04-alone-v3-transparent-production',
    location: 'axiom-strategic-intelligence',
  },
  'opening.blackglass.shot01-arrival': {
    assetId: 'blackglass-file-arrival-v1-production',
    location: 'axiom-casework',
  },
  'opening.blackglass.shot02-directory': {
    assetId: 'blackglass-directory-v1-production',
    location: 'axiom-casework',
  },
  'opening.blackglass.shot03-authorized': {
    assetId: 'blackglass-authorized-v1-production',
    location: 'axiom-casework',
  },
  'opening.blackglass.shot04-security-intervention': {
    assetId: 'blackglass-security-intervention-v1-production',
    location: 'axiom-internal-security',
  },
  'opening.blackglass.shot05-security-escort': {
    assetId: 'blackglass-security-escort-v1-production',
    location: 'axiom-secure-elevator',
  },
  'opening.sloane.shot01-intro': {
    assetId: 'sloane-intro-v1-production',
    location: 'axiom-executive-floor',
  },
  'opening.sloane.shot02-allegation': {
    assetId: 'sloane-allegation-v1-production',
    location: 'axiom-executive-floor',
  },
  'opening.sloane.shot03-brief': {
    assetId: 'sloane-brief-v1-production',
    location: 'axiom-executive-floor',
  },
  'opening.sloane.shot04-identity': {
    assetId: 'sloane-identity-v1-production',
    location: 'axiom-executive-floor',
  },
  'opening.sloane.shot05-offer': {
    assetId: 'sloane-offer-v1-production',
    location: 'axiom-executive-floor',
  },
  'opening.refusal.shot01-lobby': {
    assetId: 'refusal-lobby-v1-production',
    location: 'axiom-lobby',
  },
  'opening.refusal.shot02-reconsider': {
    assetId: 'refusal-reconsider-v1-production',
    location: 'axiom-executive-floor',
  },
  'clinic.reception.shot01': {
    assetId: 'clinic-reception-v1-production',
    location: 'clinic-reception',
  },
  'clinic.privacy.shot01': {
    assetId: 'clinic-privacy-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.privacyReply.shot01-stay': {
    assetId: 'clinic-privacy-stay-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.privacyReply.shot01-private': {
    assetId: 'clinic-privacy-private-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.exam.shot01-stay': {
    assetId: 'clinic-exam-stay-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.exam.shot01-private': {
    assetId: 'clinic-exam-private-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.examResult.shot01-private': {
    assetId: 'clinic-exam-result-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.protocol.shot01': {
    assetId: 'clinic-protocol-v1-production',
    location: 'clinic-consultation-area',
  },
  'clinic.simulation.shot01': {
    assetId: 'clinic-simulation-v1-production',
    location: 'clinic-consultation',
  },
  'clinic.authorization.shot01': {
    assetId: 'clinic-authorization-v1-production',
    location: 'clinic-consultation',
  },
  'clinic.preparation.shot01': {
    assetId: 'clinic-preparation-v1-production',
    location: 'clinic-preparation',
  },
  'clinic.voice.shot01-private': {
    assetId: 'clinic-voice-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.voicePause.shot01-stay': {
    assetId: 'clinic-voice-pause-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.face.shot01-stay': {
    assetId: 'clinic-face-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.facePause.shot01-stay': {
    assetId: 'clinic-face-pause-v1-production',
    location: 'clinic-examination-suite',
  },
  'clinic.steps.shot01-stay': {
    assetId: 'clinic-steps-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.mirror.shot01': {
    assetId: 'clinic-recovery-mirror-unlooked-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.mirror.shot01-look': {
    assetId: 'clinic-recovery-mirror-look-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.name.shot01': {
    assetId: 'clinic-name-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.rest.shot01': {
    assetId: 'clinic-rest-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.recoveryContact.shot01': {
    assetId: 'clinic-recovery-contact-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.makeup.shot01-executive': {
    assetId: 'clinic-makeup-executive-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.makeup.shot01-socialite': {
    assetId: 'clinic-makeup-socialite-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.makeup.shot01-shadow': {
    assetId: 'clinic-makeup-shadow-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.recoveryReply.shot01-quiet': {
    assetId: 'clinic-recovery-reply-quiet-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.recoveryReply.shot01-sent': {
    assetId: 'clinic-recovery-reply-sent-v1-production',
    location: 'clinic-recovery-suite',
  },
  'clinic.presentationReview.shot01-executive': {
    assetId: 'clinic-presentation-review-executive-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.presentationReview.shot01-socialite': {
    assetId: 'clinic-presentation-review-socialite-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.presentationReview.shot01-shadow': {
    assetId: 'clinic-presentation-review-shadow-v1-production',
    location: 'clinic-dressing-area',
  },
  'clinic.rehearsal.shot01-executive': {
    assetId: 'clinic-rehearsal-executive-v1-production',
    location: 'clinic-preparation-suite',
  },
  'clinic.rehearsal.shot01-socialite': {
    assetId: 'clinic-rehearsal-socialite-v1-production',
    location: 'clinic-preparation-suite',
  },
  'clinic.rehearsal.shot01-shadow': {
    assetId: 'clinic-rehearsal-shadow-v1-production',
    location: 'clinic-preparation-suite',
  },
  'clinic.briefing.shot01': {
    assetId: 'clinic-briefing-v1-production',
    location: 'clinic-preparation-suite',
  },
  'clinic.profile.shot01': {
    assetId: 'clinic-profile-v1-production',
    location: 'clinic-consultation',
  },
  'clinic.farewell.shot01': {
    assetId: 'clinic-farewell-v1-production',
    location: 'clinic-preparation-suite',
  },
  'mission.car': {
    assetId: 'car-rain-window-noir-v2-production',
    location: 'car',
  },
  'mission.arrival': {
    assetId: 'eve-bg-glass-entrance-noir-v2-production',
    location: 'glass-entrance',
  },
  'mission.reception': {
    assetId: 'glass-house-reception-v1-production',
    location: 'glass-lobby',
  },
  'mission.assessment': {
    assetId: 'glass-house-assessment-v1-production',
    location: 'glass-gallery',
  },
  'mission.method': {
    assetId: 'glass-house-method-v1-production',
    location: 'glass-gallery',
  },
  'chapter3.surveillance.shot01': {
    assetId: 'chapter3-surveillance-phone-v1-production',
    location: 'apartment',
  },
  'chapter4.entry.shot01': {
    assetId: 'chapter4-river-entry-v1-production',
    location: 'chapter4-river-path',
  },
  'chapter4.consequences.shot01': {
    assetId: 'chapter4-river-consequences-v1-production',
    location: 'chapter4-river-bench',
  },
  'chapter4.resource.shot01': {
    assetId: 'chapter4-public-records-noir-v2-production',
    location: 'municipal-records-reading-room',
  },
  'chapter4.assignment.shot01': {
    assetId: 'chapter4-assignment-index-noir-v2-production',
    location: 'municipal-records-reading-room',
  },
  'c05.s03.shot01-no-purchase': {
    assetId: 'chapter5-echo-no-purchase-v1-production',
    location: 'apartment',
  },
  'c05.s03.shot01-phone': {
    assetId: 'chapter5-echo-boxed-phone-v1-production',
    location: 'apartment',
  },
  'c05.s03.shot01-blouse': {
    assetId: 'chapter5-echo-blouse-v1-production',
    location: 'apartment',
  },
  'c05.s03.shot01-clasp': {
    assetId: 'chapter5-echo-clasp-v1-production',
    location: 'apartment',
  },
  'c05.s03.shot01-lunch': {
    assetId: 'chapter5-echo-lunch-v1-production',
    location: 'apartment',
  },
  'c05.s01.shot01': {
    assetId: 'c5-s01-daytime-apartment-anchor-v5-production',
    location: 'apartment',
  },
  'clinic.wardrobe.shot01': { assetId: 'clinic-wardrobe-choice-v1-production', location: 'wardrobe' },
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
  const sequence = openingReadingBeats(state) ?? chapter5ReadingBeats(state);
  readingCache.set(state, sequence);
  return sequence;
}

/** Independent guard checks also used by the development inspector and authoring tests. */
export function validateSceneShot(state: GameState, shot: SceneShot): ArtIssue[] {
  const binding = shotBindings[shot.shotId];
  const asset = shot.assetId ? assets.get(shot.assetId) : undefined;
  const apartmentInspectionFallback =
    shot.shotId.startsWith('opening.apartment.inspect-') &&
    !binding &&
    shot.assetId === shotBindings['opening.apartment.shot01'].assetId;
  const issues: ArtIssue[] = [];
  if ((!binding && !apartmentInspectionFallback) || (shot.assetId && binding && binding.assetId !== shot.assetId))
    issues.push('ASSET_WITHOUT_VALID_SHOT');
  if (!asset) issues.push('SHOT_WITHOUT_APPROVED_ASSET');
  if (asset && binding && asset.location !== binding.location) issues.push('LOCATION_MISMATCH');
  const node = state.scene + '.' + state.phase;
  const allowedOpeningNodes = openingShotNodes[shot.shotId];
  if (allowedOpeningNodes && !allowedOpeningNodes.includes(node)) issues.push('LOCATION_MISMATCH');
  const casework = openingCaseworkShots[shot.shotId];
  if (casework && !casework.nodes.includes(node))
    issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
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
  } else if (shot.shotId === 'mission.car') {
    if (node !== 'mission.car') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'mission.arrival') {
    if (node !== 'mission.arrival') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'mission.reception') {
    if (node !== 'mission.reception') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'mission.assessment') {
    if (node !== 'mission.assessment') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'mission.method') {
    if (node !== 'mission.method') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'chapter3.surveillance.shot01') {
    if (node !== 'chapter3.surveillance') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'chapter4.entry.shot01') {
    if (node !== 'chapter4.entry') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'chapter4.consequences.shot01') {
    if (node !== 'chapter4.consequences') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'chapter4.resource.shot01') {
    if (node !== 'chapter4.resource') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'chapter4.assignment.shot01') {
    if (node !== 'chapter4.assignment') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId.startsWith('c05.s03.shot01-')) {
    const purchaseByShot: Record<string, string[]> = {
      'c05.s03.shot01-no-purchase': ['save', 'nothing'],
      'c05.s03.shot01-phone': ['phone'],
      'c05.s03.shot01-blouse': ['wardrobe'],
      'c05.s03.shot01-clasp': ['accessory'],
      'c05.s03.shot01-lunch': ['dinner'],
    };
    if (node !== 'chapter5.echo' || !purchaseByShot[shot.shotId]?.includes(state.choices['c5.purchase'] || ''))
      issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
    const reading = currentReadingBeats(state);
    if (!reading?.beats.some((b) => b.shotId === shot.shotId && b.file))
      issues.push('PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.blackglass.shot01-arrival') {
    if (node !== 'file.arrival') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.blackglass.shot02-directory') {
    if (node !== 'file.directory' || !state.day.directorySeen) issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.blackglass.shot03-authorized') {
    if (node !== 'file.authorized' || !state.day.biometric) issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.blackglass.shot04-security-intervention') {
    if (node !== 'security.intervention' || !state.day.biometric || state.day.badge !== 'suspended')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.blackglass.shot05-security-escort') {
    if (node !== 'security.escort' || state.day.phone !== 'confiscated')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.sloane.shot01-intro') {
    if (node !== 'sloane.intro') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.sloane.shot02-allegation') {
    if (node !== 'sloane.allegation') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.sloane.shot03-brief') {
    if (node !== 'sloane.brief') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.sloane.shot04-identity') {
    if (node !== 'sloane.identity') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.sloane.shot05-offer') {
    if (node !== 'sloane.offer') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.refusal.shot01-lobby') {
    if (node !== 'refusal.lobby' || state.day.operation !== 'refused' || state.day.phone !== 'returned')
      issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'opening.refusal.shot02-reconsider') {
    if (node !== 'refusal.reconsider' || state.day.operation !== 'refused' || state.day.phone !== 'returned')
      issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.reception.shot01') {
    if (!['clinic.reception', 'clinic.receptionReply'].includes(node)) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.privacy.shot01') {
    if (node !== 'clinic.privacy' || !state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.privacyReply.shot01-stay') {
    if (node !== 'clinic.privacyReply' || !state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.privacyReply.shot01-private') {
    if (node !== 'clinic.privacyReply' || state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.exam.shot01-stay') {
    if (node !== 'clinic.exam' || !state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.exam.shot01-private') {
    if (node !== 'clinic.exam' || state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.examResult.shot01-private') {
    if (node !== 'clinic.examResult' || state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.protocol.shot01') {
    if (node !== 'clinic.protocol' || !state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.simulation.shot01') {
    if (!['clinic.simulation', 'clinic.display'].includes(node) || !state.clinic.sloanePresent)
      issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.authorization.shot01') {
    if (node !== 'clinic.authorization' || !state.clinic.sloanePresent || state.clinic.authorized)
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.preparation.shot01') {
    if (node !== 'clinic.preparation' || !state.clinic.authorized || state.clinic.stage !== 'unchanged')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.voice.shot01-private') {
    if (!['clinic.voice', 'clinic.voiceReply'].includes(node) || state.clinic.sloanePresent || state.clinic.stage !== 'voice')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.voicePause.shot01-stay') {
    if (node !== 'clinic.voicePause' || !state.clinic.sloanePresent || !state.clinic.paused)
      issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.face.shot01-stay') {
    if (!['clinic.face', 'clinic.faceReply'].includes(node) || !state.clinic.sloanePresent || state.clinic.stage !== 'face')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.facePause.shot01-stay') {
    if (node !== 'clinic.facePause' || !state.clinic.sloanePresent || !state.clinic.paused)
      issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.steps.shot01-stay') {
    if (node !== 'clinic.steps' || !state.clinic.sloanePresent || state.clinic.stage !== 'complete')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.mirror.shot01') {
    if (node !== 'clinic.mirror' || state.clinic.mirror !== null)
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.mirror.shot01-look') {
    if (node !== 'clinic.name' || state.clinic.mirror === null || state.clinic.mirror === 'skip')
      issues.push('LOCATION_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.name.shot01') {
    if (node !== 'clinic.name') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.rest.shot01') {
    if (node !== 'clinic.rest' || state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.recoveryContact.shot01') {
    if (node !== 'clinic.recoveryContact' || state.clinic.sloanePresent) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId.startsWith('clinic.makeup.shot01-')) {
    const outfit = shot.shotId.slice('clinic.makeup.shot01-'.length);
    if (node !== 'clinic.makeup' || state.clinic.outfitDraft !== outfit || state.clinic.makeupDraft !== null)
      issues.push('LOCATION_MISMATCH', 'WARDROBE_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.recoveryReply.shot01-quiet') {
    if (node !== 'clinic.recoveryReply' || state.clinic.contact !== 'quiet')
      issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH');
  } else if (shot.shotId === 'clinic.recoveryReply.shot01-sent') {
    if (node !== 'clinic.recoveryReply' || !['brief', 'identity'].includes(state.clinic.contact || ''))
      issues.push('LOCATION_MISMATCH', 'PROP_CUSTODY_MISMATCH');
  } else if (shot.shotId.startsWith('clinic.presentationReview.shot01-')) {
    const outfit = shot.shotId.slice('clinic.presentationReview.shot01-'.length);
    if (node !== 'clinic.presentationReview' || state.clinic.outfitDraft !== outfit || state.clinic.makeupDraft === null)
      issues.push('LOCATION_MISMATCH', 'WARDROBE_MISMATCH');
  } else if (shot.shotId.startsWith('clinic.rehearsal.shot01-')) {
    const outfit = shot.shotId.slice('clinic.rehearsal.shot01-'.length);
    if (node !== 'clinic.rehearsal' || state.clinic.outfit !== outfit)
      issues.push('LOCATION_MISMATCH', 'WARDROBE_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.briefing.shot01') {
    if (node !== 'clinic.briefing' || !state.clinic.outfit || !state.clinic.makeup)
      issues.push('LOCATION_MISMATCH', 'WARDROBE_MISMATCH', 'FUTURE_STATE_VISUAL');
  } else if (shot.shotId === 'clinic.profile.shot01') {
    if (node !== 'clinic.profile') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'clinic.farewell.shot01') {
    if (node !== 'clinic.farewell') issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.apartment.shot01') {
    if (!['apartment.bond', 'apartment.reply', 'apartment.departure'].includes(node))
      issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId === 'opening.apartment.shot01-mirror') {
    if (!['apartment.bond', 'apartment.reply'].includes(node)) issues.push('LOCATION_MISMATCH');
  } else if (shot.shotId.startsWith('opening.apartment.inspect-')) {
    const expectedId = shot.shotId.slice('opening.apartment.inspect-'.length);
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
    const inspectionShotId =
      action?.type === 'INSPECT_APARTMENT' ? `opening.apartment.inspect-${action.id}` : undefined;
    const shotId = inspectionShotId && shotBindings[inspectionShotId]
      ? inspectionShotId
      : ['apartment.bond', 'apartment.reply'].includes(node)
        ? 'opening.apartment.shot01-mirror'
        : 'opening.apartment.shot01';
    const assetId = shotBindings[shotId]?.assetId ?? shotBindings['opening.apartment.shot01'].assetId;
    return {
      shotId,
      assetId,
      alt: shotId === 'opening.apartment.shot01-mirror'
        ? 'Adrian studies his reflection in the bathroom mirror while the rainy apartment and lit phone remain visible beyond the doorway.'
        : '',
    };
  }
  if (state.scene === 'clinic') {
    const shotId =
      node === 'clinic.reception' || node === 'clinic.receptionReply'
        ? 'clinic.reception.shot01'
        : node === 'clinic.privacy'
          ? 'clinic.privacy.shot01'
          : node === 'clinic.privacyReply'
            ? state.clinic.sloanePresent
              ? 'clinic.privacyReply.shot01-stay'
              : 'clinic.privacyReply.shot01-private'
            : node === 'clinic.exam'
              ? state.clinic.sloanePresent
                ? 'clinic.exam.shot01-stay'
                : 'clinic.exam.shot01-private'
              : node === 'clinic.examResult'
                ? 'clinic.examResult.shot01-private'
                : node === 'clinic.protocol'
                  ? 'clinic.protocol.shot01'
                  : node === 'clinic.simulation' || node === 'clinic.display'
                    ? 'clinic.simulation.shot01'
                    : node === 'clinic.authorization'
                      ? 'clinic.authorization.shot01'
                      : node === 'clinic.preparation'
                        ? 'clinic.preparation.shot01'
                        : node === 'clinic.voice' || node === 'clinic.voiceReply'
                          ? 'clinic.voice.shot01-private'
                          : node === 'clinic.voicePause'
                            ? 'clinic.voicePause.shot01-stay'
                            : node === 'clinic.face' || node === 'clinic.faceReply'
                              ? 'clinic.face.shot01-stay'
                              : node === 'clinic.facePause'
                                ? 'clinic.facePause.shot01-stay'
                                : node === 'clinic.steps'
                                  ? 'clinic.steps.shot01-stay'
                                  : node === 'clinic.mirror'
                                    ? 'clinic.mirror.shot01'
                                    : node === 'clinic.name'
                                      ? state.clinic.mirror !== null && state.clinic.mirror !== 'skip'
                                        ? 'clinic.mirror.shot01-look'
                                        : 'clinic.name.shot01'
                                      : node === 'clinic.rest'
                                        ? 'clinic.rest.shot01'
                                        : node === 'clinic.recoveryContact'
                                          ? 'clinic.recoveryContact.shot01'
                                          : node === 'clinic.makeup'
                                            ? state.clinic.outfitDraft === 'executive'
                                              ? 'clinic.makeup.shot01-executive'
                                              : state.clinic.outfitDraft === 'socialite'
                                                ? 'clinic.makeup.shot01-socialite'
                                                : state.clinic.outfitDraft === 'shadow'
                                                  ? 'clinic.makeup.shot01-shadow'
                                                  : undefined
                                            : node === 'clinic.recoveryReply'
                                              ? state.clinic.contact === 'quiet'
                                                ? 'clinic.recoveryReply.shot01-quiet'
                                                : 'clinic.recoveryReply.shot01-sent'
                                             : node === 'clinic.presentationReview'
                                                 ? state.clinic.outfitDraft === 'executive'
                                                   ? 'clinic.presentationReview.shot01-executive'
                                                   : state.clinic.outfitDraft === 'socialite'
                                                     ? 'clinic.presentationReview.shot01-socialite'
                                                     : state.clinic.outfitDraft === 'shadow'
                                                       ? 'clinic.presentationReview.shot01-shadow'
                                                        : undefined
                                                : (node as string) === 'clinic.rehearsal'
                                                  ? state.clinic.outfit === 'executive'
                                                    ? 'clinic.rehearsal.shot01-executive'
                                                    : state.clinic.outfit === 'socialite'
                                                      ? 'clinic.rehearsal.shot01-socialite'
                                                      : state.clinic.outfit === 'shadow'
                                                        ? 'clinic.rehearsal.shot01-shadow'
                                                        : undefined
                                                : (node as string) === 'clinic.briefing'
                                                  ? 'clinic.briefing.shot01'
                                                  : (node as string) === 'clinic.profile'
                                                    ? 'clinic.profile.shot01'
                                                    : (node as string) === 'clinic.farewell'
                                                      ? 'clinic.farewell.shot01'
                                                      : undefined;
    const alt =
      shotId === 'clinic.reception.shot01'
        ? 'The Sublevel 17 reception desk and inner clinic door frame Adrian’s appointment.'
        : shotId === 'clinic.privacy.shot01'
          ? 'Adrian faces Voss in the examination suite while Sloane waits beside the simulated daylight window.'
          : shotId === 'clinic.privacyReply.shot01-stay'
            ? 'Adrian remains in the examination chair with Voss and Sloane present.'
            : shotId === 'clinic.privacyReply.shot01-private'
              ? 'Adrian and Voss continue the examination privately after Sloane leaves the room.'
              : shotId === 'clinic.exam.shot01-stay'
                ? 'The baseline scanner surrounds Adrian while Voss works and Sloane remains present.'
                : shotId === 'clinic.exam.shot01-private'
                  ? 'The baseline scanner surrounds Adrian while Voss works in the private examination room.'
                  : shotId === 'clinic.examResult.shot01-private'
                    ? 'Adrian and Voss review the baseline examination result before returning to consultation.'
                    : shotId === 'clinic.protocol.shot01'
                      ? 'Voss presents the Stage One protocol at the consultation table with Sloane present.'
                      : shotId === 'clinic.simulation.shot01'
                        ? 'The clinic display shows paired predictive Adrian and Evelyn renderings while Voss and Sloane observe.'
                        : shotId === 'clinic.authorization.shot01'
                          ? 'Adrian reaches toward the untouched Stage One authorization control while Voss and Sloane wait.'
                          : shotId === 'clinic.preparation.shot01'
                            ? 'Adrian rests in the preparation chair while Voss adjusts the support before the first procedure interval.'
                            : shotId === 'clinic.voice.shot01-private'
                              ? 'Voss monitors Adrian’s first voice checkpoint in the private examination suite.'
                              : shotId === 'clinic.voicePause.shot01-stay'
                                ? 'Voss pauses the voice sequence while Sloane remains beside the examination chair.'
                                : shotId === 'clinic.face.shot01-stay'
                                  ? 'The articulated mirror shows Adrian’s changing face while Voss and Sloane remain in the room.'
                                  : shotId === 'clinic.facePause.shot01-stay'
                                    ? 'Voss has turned the articulated mirror away while the face checkpoint is paused.'
                                    : shotId === 'clinic.steps.shot01-stay'
                                      ? 'Adrian takes a supervised first step as Voss waits beside the chair and Sloane moves toward the door.'
                                      : shotId === 'clinic.mirror.shot01'
                                        ? 'Adrian approaches the recovery-suite mirror without yet choosing to look.'
                                        : shotId === 'clinic.mirror.shot01-look'
                                          ? 'Adrian faces the recovery-suite mirror after choosing to look.'
                                        : shotId === 'clinic.name.shot01'
                                          ? 'Adrian reaches for the water while Voss and Sloane wait in the recovery suite.'
                                          : shotId === 'clinic.rest.shot01'
                                            ? 'A recovery nurse brings Adrian lunch while the completed Stage One checks continue.'
                                            : shotId === 'clinic.recoveryContact.shot01'
                                              ? 'Adrian holds the returned monitored phone in the recovery suite.'
                                              : shotId === 'clinic.makeup.shot01-executive'
                                                ? 'Adrian reviews the executive presentation at the preparation-suite vanity before choosing makeup.'
                                                : shotId === 'clinic.makeup.shot01-socialite'
                                                  ? 'Adrian reviews the socialite presentation at the preparation-suite vanity before choosing makeup.'
                                                  : shotId === 'clinic.makeup.shot01-shadow'
                                                  ? 'Adrian reviews the shadow presentation at the preparation-suite vanity before choosing makeup.'
                                                  : shotId === 'clinic.recoveryReply.shot01-quiet'
                                                    ? 'The monitored phone rests face down beside Adrian’s keys after he chooses not to send a recovery message.'
                                                    : shotId === 'clinic.recoveryReply.shot01-sent'
                                                      ? 'Adrian reviews unreadable message bubbles after sending a recovery update.'
                                                      : shotId === 'clinic.presentationReview.shot01-executive'
                                                        ? 'Adrian reviews the committed executive presentation before leaving the dressing area.'
                                                        : shotId === 'clinic.presentationReview.shot01-socialite'
                                                          ? 'Adrian reviews the committed socialite presentation before leaving the dressing area.'
                                                          : shotId === 'clinic.presentationReview.shot01-shadow'
                                                         ? 'Adrian reviews the committed shadow presentation before leaving the dressing area.'
                                                           : shotId === 'clinic.rehearsal.shot01-executive'
                                                             ? 'Sloane coaches Adrian through the executive presentation in the preparation suite.'
                                                             : shotId === 'clinic.rehearsal.shot01-socialite'
                                                               ? 'Sloane coaches Adrian through the socialite presentation in the preparation suite.'
                                                               : shotId === 'clinic.rehearsal.shot01-shadow'
                                                                 ? 'Sloane coaches Adrian through the shadow presentation in the preparation suite.'
                                                                 : shotId === 'clinic.briefing.shot01'
                                                                   ? 'The final preparation table holds Adrian’s monitored phone, restricted badge, invitation credentials and earpiece.'
                                                                   : shotId === 'clinic.profile.shot01'
                                                                     ? 'The clinic consultation display presents the authored profile variations while the team observes.'
                                                                     : shotId === 'clinic.farewell.shot01'
                                                                       ? 'The clinic preparation suite holds the final handover before Adrian’s departure.'
                                                                       : '';
    return shotId ? { shotId, assetId: shotBindings[shotId]?.assetId, alt } : undefined;
  }
  const ids: Record<string, string> = {
    'commute.arrival': 'opening.axiom.shot01-approach',
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
    'mission.car': 'mission.car',
    'mission.arrival': 'mission.arrival',
    'mission.reception': 'mission.reception',
    'mission.assessment': 'mission.assessment',
    'mission.method': 'mission.method',
    'chapter3.surveillance': 'chapter3.surveillance.shot01',
    'chapter4.entry': 'chapter4.entry.shot01',
    'chapter4.consequences': 'chapter4.consequences.shot01',
    'chapter4.resource': 'chapter4.resource.shot01',
    'chapter4.assignment': 'chapter4.assignment.shot01',
    'file.arrival': 'opening.blackglass.shot01-arrival',
    'file.directory': 'opening.blackglass.shot02-directory',
    'file.authorized': 'opening.blackglass.shot03-authorized',
    'security.intervention': 'opening.blackglass.shot04-security-intervention',
    'security.escort': 'opening.blackglass.shot05-security-escort',
    'sloane.intro': 'opening.sloane.shot01-intro',
    'sloane.allegation': 'opening.sloane.shot02-allegation',
    'sloane.brief': 'opening.sloane.shot03-brief',
    'sloane.identity': 'opening.sloane.shot04-identity',
    'sloane.offer': 'opening.sloane.shot05-offer',
    'refusal.lobby': 'opening.refusal.shot01-lobby',
    'refusal.reconsider': 'opening.refusal.shot02-reconsider',
  };
  const shotId = ids[node];
  const alt = shotId === 'mission.car'
    ? 'Rain beads across the car window as the city passes in the blue light.'
    : shotId === 'opening.axiom.shot01-approach'
      ? 'Adrian crosses the rain-darkened plaza toward Axiom headquarters.'
      : shotId === 'opening.axiom.shot02-security'
        ? 'Adrian badges through the controlled Axiom security gate with the elevator corridor beyond.'
        : shotId === 'opening.axiom.shot03-office-arrival'
          ? 'The elevator opens onto the Strategic Intelligence floor; Adrian approaches the fixed desk axis before Daniel enters.'
    : shotId === 'mission.arrival'
      ? 'Rain traces the glass canopy at the Glass House entrance; the revolving doors and waiting lane remain empty.'
      : shotId === 'mission.reception'
        ? 'From the guest viewpoint, a reception desk validates the invitation while a suited security attendant watches the marble lobby.'
        : shotId === 'mission.assessment'
          ? 'At the edge of the Glass House gathering, Marcus turns toward the gallery as the player prepares an assessment.'
        : shotId === 'mission.method'
            ? 'The monitored phone and live earpiece frame the Glass House gallery while Marcus crosses toward the transfer.'
        : shotId === 'chapter3.surveillance.shot01'
          ? 'The monitored phone lies lit on the apartment table after Adrian sets it down; its notification remains unreadable.'
        : shotId === 'chapter4.entry.shot01'
          ? 'A blank-glow phone frames the rain-dark river path at the foot of the building steps.'
        : shotId === 'chapter4.consequences.shot01'
          ? 'At a riverside bench, the monitored phone shows only abstract remaining-thread rows after the selected call or walk.'
        : shotId === 'chapter4.resource.shot01'
          ? 'A public records reading room waits with an unfilled folder and registration form before access is chosen.'
        : shotId === 'chapter4.assignment.shot01'
          ? 'The public PA-17 bundle lies open on the reading-room desk with names and figures redacted.'
        : shotId === 'opening.blackglass.shot01-arrival'
          ? 'Adrian sits at his desk as the Blackglass file appears on the monitor; its protected contents remain unreadable.'
        : shotId === 'opening.blackglass.shot02-directory'
          ? 'Adrian studies the Blackglass directory at the casework workstation before biometric authorization.'
        : shotId === 'opening.blackglass.shot03-authorized'
          ? 'Adrian’s hand rests on the palm reader as the terminal locks in security amber.'
        : shotId === 'opening.blackglass.shot04-security-intervention'
          ? 'Two Axiom security officers stand behind Adrian at the casework desk after the terminal lock.'
        : shotId === 'opening.blackglass.shot05-security-escort'
          ? 'Adrian is escorted through the secure elevator toward Executive Intelligence, coat over his arm.'
        : shotId === 'opening.sloane.shot01-intro'
          ? 'Victoria Sloane stands at the executive-floor window while Adrian remains at the threshold.'
        : shotId === 'opening.sloane.shot02-allegation'
          ? 'Victoria Sloane presents the access audit across the executive desk to Adrian.'
        : shotId === 'opening.sloane.shot03-brief'
          ? 'Adrian and Victoria Sloane sit across the executive desk as the Glass House operation is proposed.'
        : shotId === 'opening.sloane.shot04-identity'
          ? 'Victoria Sloane turns the identity-package display toward Adrian; Evelyn’s image remains on the tablet.'
        : shotId === 'opening.sloane.shot05-offer'
          ? 'Victoria Sloane holds the identity-package tablet while Adrian considers the operation offer.'
        : shotId === 'opening.refusal.shot01-lobby'
          ? 'Adrian stands outside Axiom’s controlled gates with his returned phone after refusing the operation.'
        : shotId === 'opening.refusal.shot02-reconsider'
          ? 'Adrian has returned to Victoria Sloane’s office with the phone in hand; the operation remains undecided.'
        : openingCaseworkShots[shotId ?? '']?.alt ?? '';
  return shotId ? { shotId, assetId: shotBindings[shotId]?.assetId, alt } : undefined;
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
        alt: 'Adrian reviews three unselected outfits with Voss and Sloane in the preparation suite.',
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
  let art: SceneArt | undefined =
    shot && asset && issues.length === 0 ? { ...shot, asset } : undefined;
  // Outside scripted reading sequences, a scene with no exact art shows its empty-room master.
  // The primary shot and its issues are still reported for the inspector and authoring checks.
  if (!art && !reading) {
    const environment = environmentShot(state);
    const master = environment ? assets.get(environment.assetId) : undefined;
    if (environment && master) art = { ...environment, kind: 'environment', asset: master };
  }
  return { shot, art, issues, reading };
}
