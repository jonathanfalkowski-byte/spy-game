import { beforeAll, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import production from '../../src/ui/approved-scene-art.json';
import homes from '../../art/production/apartment/records.json';
import continuity from '../../art/production/continuity/records.json';
import chapter5 from '../../art/production/chapter5/records.json';
import opening from '../../art/production/opening/records.json';
import { resolveSceneArt, validateSceneShot } from '../../src/ui/scene-art';
import { initialState, act } from '../../src/state/reducer';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { day, evening } from '../day-helpers';
import { traverse, clinic } from '../clinic-helpers';
import { runMission, missionStart } from '../mission-helpers';
import { end4, walk5 } from '../chapter5-helpers';
import { advance, choice, toAnalysis, toMaya } from '../helpers';
import type { GameState } from '../../src/state/schema';

let coffee: GameState, final: GameState, harbourArrival: GameState, asterArrival: GameState;
beforeAll(() => {
  harbourArrival = walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-attend',
    'look-professional',
  ]);
  coffee = walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'buy-phone',
    'echo-listing',
    'invitation-attend',
    'look-professional',
    'attention-coffee',
  ]);
  final = walk5(coffee, [
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-phone',
  ]);
  asterArrival = walk5(harbourArrival, [
    'leave-room',
    'concept-professional',
    'offer-accept-professional',
  ]);
}, 30000);

it('small runtime manifest contains exactly production + owner approval + PASS originals; no staging or review exceptions', () => {
  const records = [...homes, ...continuity, ...chapter5, ...opening];
  const eligible = records.filter(
    (r) =>
      r.role === 'production' &&
      r.approvalStatus === 'approved' &&
      r.approval &&
      r.review.decision === 'PASS',
  );
  expect(production.map((a) => a.id)).toEqual(eligible.map((r) => r.spec.assetId));
  for (const a of production) {
    expect(a.src).toMatch(/^art\/(apartment|chapter5|continuity|opening)\/[\w-]+\.png$/);
    expect(
      createHash('sha256')
        .update(readFileSync('public/' + a.src))
        .digest('hex'),
    ).toBe(a.sha256);
  }
});

it('opening dialogue holds the approved master; inspection switches to truthful fallback', () => {
  const opening = initialState();
  const shot = resolveSceneArt(opening);
  expect(shot.shot?.shotId).toBe('opening.apartment.shot01');
  expect(shot.art?.asset.id).toBe('opening-apartment-master-v2-production');
  expect(shot.issues).toEqual([]);
  const reply = act(opening, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  expect(reply.phase).toBe('reply');
  expect(resolveSceneArt(reply).shot?.shotId).toBe(shot.shot?.shotId);
  expect(resolveSceneArt(reply).art?.asset.id).toBe(shot.art?.asset.id);
  const inspected = act(reply, { type: 'INSPECT_APARTMENT', id: 'mirror' });
  expect(resolveSceneArt(inspected).shot?.shotId).toBe('opening.apartment.inspect-mirror');
  expect(resolveSceneArt(inspected).art).toBeUndefined();
});

it('binds each approved opening inspection only to its immediately reached apartment action', () => {
  const opening = initialState();
  const reply = choice(opening, 'bond.friend');
  const lease = act(reply, { type: 'INSPECT_APARTMENT', id: 'lease' });
  const medical = act(reply, { type: 'INSPECT_APARTMENT', id: 'medical' });
  const jacket = act(reply, { type: 'INSPECT_APARTMENT', id: 'jacket' });
  const departure = choice(reply, 'morning.yes');
  const commute = advance(departure);
  const desk = advance(commute);
  const benton = choice(desk, 'promotion.angry');
  const file = choice(benton, 'benton.push');
  const brief = advance(file);
  const documents = advance(brief);
  const analysis = toAnalysis();
  const mayaPromotion = toMaya();
  const mayaInvitation = choice(mayaPromotion, 'mayaPromotion.hurt');
  const mayaCase = choice(mayaInvitation, 'invitation.yes');
  const mayaGoodbye = choice(mayaCase, 'disclosure.private');
  const ending = advance(mayaGoodbye);
  const openingShots = [
    opening,
    lease,
    medical,
    jacket,
    commute,
    desk,
    benton,
    file,
    brief,
    documents,
    analysis,
    mayaPromotion,
    mayaInvitation,
    mayaCase,
    mayaGoodbye,
    ending,
  ].map((state) => resolveSceneArt(state));
  expect(openingShots.map((visual) => visual.shot?.shotId)).toEqual([
    'opening.apartment.shot01',
    'opening.apartment.inspect-lease',
    'opening.apartment.inspect-medical',
    'opening.apartment.inspect-jacket',
    'opening.axiom.shot04-desk',
    'opening.office.shot01-daniel',
    'opening.office.shot02-benton',
    'opening.office.shot03-file',
    'opening.helix.shot01-brief',
    'opening.helix.shot02-documents',
    'opening.helix.shot02-documents',
    'opening.maya.shot01-coffee',
    'opening.maya.shot01-coffee',
    'opening.maya.shot01-coffee',
    'opening.maya.shot02-departure',
    'opening.office.shot04-alone',
  ]);
  expect(openingShots.slice(0, 3).map((visual) => visual.art?.asset.id)).toEqual([
    'opening-apartment-master-v2-production',
    'opening-apartment-housing-notice-v1-production',
    'opening-apartment-medical-package-v1-production',
  ]);
  for (const visual of openingShots.slice(0, 3)) expect(visual.issues).toEqual([]);
  for (const visual of openingShots.slice(3)) {
    expect(visual.art).toBeUndefined();
    expect(visual.issues).toEqual(['SHOT_WITHOUT_APPROVED_ASSET']);
  }
});

it('returns to the unbound opening state after an inspection is no longer the latest action', () => {
  const reply = choice(initialState(), 'bond.friend');
  const inspected = act(reply, { type: 'INSPECT_APARTMENT', id: 'lease' });
  expect(resolveSceneArt(inspected).art?.asset.id).toBe(
    'opening-apartment-housing-notice-v1-production',
  );
  const departure = choice(inspected, 'morning.yes');
  expect(resolveSceneArt(departure).shot?.shotId).toBe('opening.apartment.shot01');
  expect(resolveSceneArt(departure).art).toBeUndefined();
  expect(resolveSceneArt(departure).issues).toEqual([
    'PROP_CUSTODY_MISMATCH',
    'FUTURE_STATE_VISUAL',
  ]);
});

it('Lantern holds for dialogue only on the meeting route, then cuts for authored touch/exit', () => {
  const home = evening();
  const meet = day(home, 'evening.meet');
  const first = resolveSceneArt(meet);
  expect(first.art?.asset.id).toBe('eve-scene-maya-evening-continuity-v2');
  const disclosed = day(meet, 'disclose.medical');
  expect(resolveSceneArt(disclosed).art?.asset.id).toBe(first.art?.asset.id);
  expect(resolveSceneArt(day(disclosed, 'closure.evelyn')).art).toBeUndefined();
  expect(resolveSceneArt(day(home, 'evening.call')).art).toBeUndefined();
});

it('wardrobe establishes the rack before selection; dressing cuts instead of holding the old room', () => {
  const rack = traverse(undefined, {}, 'wardrobe');
  expect(resolveSceneArt(rack).art?.asset.id).toBe('eve-bg-wardrobe-continuity-v2');
  expect(resolveSceneArt(clinic(rack, 'outfit.executive')).art).toBeUndefined();
});

it('home images require exact approved wardrobe, moment and no later inspection', () => {
  const home = act(runMission(), { type: 'CONTINUE_CHAPTER3' });
  expect(resolveSceneArt(home).art?.asset.id).toBe(
    'apartment-post-glasshouse-executive-v1-production',
  );
  expect(
    resolveSceneArt(act(home, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.mirror' })).art,
  ).toBeUndefined();
  for (const outfit of ['socialite', 'shadow']) {
    const other = act(runMission(missionStart(outfit)), { type: 'CONTINUE_CHAPTER3' });
    expect(resolveSceneArt(other).art).toBeUndefined();
  }
});

it('ordered Harbour cuts never anticipate Julian; cursor, malformed index and reload cannot modify saved bytes', () => {
  const saved = encodeSave(coffee);
  const cuts = [0, 1, 2, 3].map((i) => resolveSceneArt(coffee, i));
  expect(cuts.map((c) => c.shot?.shotId)).toEqual([
    'c05.s06.shot14-wait',
    'c05.s06.shot12-entrance',
    'c05.s06.shot15-departed',
    'c05.s06.shot13-return',
  ]);
  expect(cuts.map((c) => c.art?.asset.id)).toEqual([
    undefined,
    'c5-harbour-evelynn-julian-composite-v2-production',
    'c5-harbour-julian-departed-composite-v1-production',
    'c5-h2-coffee-return-composite-v1-production',
  ]);
  expect(resolveSceneArt(coffee, 99).art).toBeUndefined();
  expect(encodeSave(coffee)).toBe(saved);
  expect(resolveSceneArt(decodeSave(saved)).art).toBeUndefined();
  expect(resolveSceneArt(walk5(coffee, ['leave-room']), 1).art).toBeUndefined();
});

it('promoted H1, H2 and Aster arrival bind only to their exact reached action and survive reload', () => {
  expect(resolveSceneArt(harbourArrival).art?.asset.id).toBe(
    'c5-h1-arrival-composite-v3-production',
  );
  expect(resolveSceneArt(coffee, 3).art?.asset.id).toBe(
    'c5-h2-coffee-return-composite-v1-production',
  );
  expect(resolveSceneArt(asterArrival).art?.asset.id).toBe(
    'c5-s07-aster-arrival-composite-v2-production',
  );
  expect(resolveSceneArt(decodeSave(encodeSave(harbourArrival))).art?.asset.id).toBe(
    'c5-h1-arrival-composite-v3-production',
  );
  expect(resolveSceneArt(decodeSave(encodeSave(asterArrival))).art?.asset.id).toBe(
    'c5-s07-aster-arrival-composite-v2-production',
  );
  const minimal = walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-attend',
    'look-minimal',
  ]);
  expect(resolveSceneArt(minimal).art).toBeUndefined();
  expect(resolveSceneArt(walk5(harbourArrival, ['attention-enjoy'])).art).toBeUndefined();
  expect(resolveSceneArt(walk5(asterArrival, ['publish'])).art).toBeUndefined();
});

it('exact phone placement is selected; wardrobe, location, props, unearned rewards and forged timing fail closed', () => {
  const selected = resolveSceneArt(final);
  expect(selected.art?.asset.id).toBe('c5-s12-shot05-phone-composite-v2-production');
  const raw = encodeSave(final);
  for (const [key, value] of Object.entries({
    'c5.wardrobe': 'c05.glamorous',
    'c5.personal-location': 'bag',
    'c5.axiom-location': 'bag',
    'c5.old-jacket': 'chair',
    'c5.published': 'yes',
    'c5.event-photo': 'yes',
    'c5.intimacy': 'yes',
  }))
    expect(
      resolveSceneArt({ ...final, choices: { ...final.choices, [key]: value } }).art,
    ).toBeUndefined();
  const wrong = {
    ...final,
    scene: 'chapter4' as const,
    choices: { ...final.choices, 'c5.wardrobe': 'wrong' },
  };
  expect(validateSceneShot(wrong, selected.shot!)).toEqual(
    expect.arrayContaining([
      'WARDROBE_MISMATCH',
      'LOCATION_MISMATCH',
      'PROP_CUSTODY_MISMATCH',
      'FUTURE_STATE_VISUAL',
    ]),
  );
  expect(validateSceneShot(final, { ...selected.shot!, assetId: 'staging-candidate' })).toEqual(
    expect.arrayContaining(['ASSET_WITHOUT_VALID_SHOT', 'SHOT_WITHOUT_APPROVED_ASSET']),
  );
  expect(encodeSave(final)).toBe(raw);
  expect(resolveSceneArt(decodeSave(raw)).art?.asset.id).toBe(selected.art?.asset.id);
});
