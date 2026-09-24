import { beforeAll, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import production from '../../src/ui/approved-scene-art.json';
import homes from '../../art/production/apartment/records.json';
import continuity from '../../art/production/continuity/records.json';
import chapter5 from '../../art/production/chapter5/records.json';
import opening from '../../art/production/opening/records.json';
import gapScenes from '../../art/production/gap-scenes/records.json';
import { resolveSceneArt, validateSceneShot } from '../../src/ui/scene-art';

/** Exact shot art only: an empty-room environment fallback never counts as the refused asset. */
const exactArt = (result: ReturnType<typeof resolveSceneArt>) => (result.art?.kind === 'environment' ? undefined : result.art);
import { initialState, act } from '../../src/state/reducer';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { day, evening } from '../day-helpers';
import { traverse, clinic } from '../clinic-helpers';
import { mission, runMission, missionStart } from '../mission-helpers';
import { end4, walk5 } from '../chapter5-helpers';
import { departure, choose4 } from '../chapter4-helpers';
import { chapter4Choices } from '../../src/content/chapter4';
import { advance, choice, finish, toAnalysis, toMaya } from '../helpers';
import type { GameState } from '../../src/state/schema';
import { isRuntimeApprovedProductionRecord } from '../../scripts/runtime-eligibility.mjs';

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

it('small runtime manifest contains exactly explicit runtime-approved production records', () => {
  const records = [...homes, ...continuity, ...chapter5, ...opening, ...gapScenes];
  const eligible = records.filter(isRuntimeApprovedProductionRecord);
  expect(eligible).toHaveLength(130);
  expect(production.map((a) => a.id)).toEqual(eligible.map((r) => r.spec.assetId));
  expect(production.map((a) => a.id)).not.toContain('axiom-opening-office-master-v1-production');
  expect(
    isRuntimeApprovedProductionRecord(
      opening.find((r) => r.spec.assetId === 'axiom-opening-office-master-v1-production')!,
    ),
  ).toBe(false);
  for (const a of production) {
    expect(a.src).toMatch(/^art\/(apartment|chapter5|continuity|opening|gap-scenes)\/[\w-]+\.png$/);
    expect(
      createHash('sha256')
        .update(readFileSync('public/' + a.src))
        .digest('hex'),
    ).toBe(a.sha256);
  }
});

it('opening dialogue holds the approved master; unillustrated inspections hold that same room master', () => {
  const opening = initialState();
  const shot = resolveSceneArt(opening);
  expect(shot.shot?.shotId).toBe('opening.apartment.shot01-mirror');
  expect(shot.art?.asset.id).toBe('adrian-first-bathroom-mirror-apartment-v1-production');
  expect(shot.issues).toEqual([]);
  const reply = act(opening, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  expect(reply.phase).toBe('reply');
  expect(resolveSceneArt(reply).shot?.shotId).toBe(shot.shot?.shotId);
  expect(resolveSceneArt(reply).art?.asset.id).toBe(shot.art?.asset.id);
  const inspected = act(reply, { type: 'INSPECT_APARTMENT', id: 'mirror' });
  expect(resolveSceneArt(inspected).shot?.shotId).toBe('opening.apartment.shot01-mirror');
  expect(resolveSceneArt(inspected).art?.asset.id).toBe('adrian-first-bathroom-mirror-apartment-v1-production');
  expect(resolveSceneArt(inspected).issues).toEqual([]);
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
    'opening.apartment.shot01-mirror',
    'opening.apartment.inspect-lease',
    'opening.apartment.inspect-medical',
    'opening.apartment.shot01-mirror',
    'opening.axiom.shot01-approach',
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
    'adrian-first-bathroom-mirror-apartment-v1-production',
    'opening-apartment-housing-notice-v2-production',
    'opening-apartment-medical-package-v2-production',
  ]);
  for (const visual of openingShots.slice(0, 3)) expect(visual.issues).toEqual([]);
  expect(openingShots[3].art?.asset.id).toBe('adrian-first-bathroom-mirror-apartment-v1-production');
  expect(openingShots[3].issues).toEqual([]);
  expect(openingShots[4].art?.asset.id).toBe('axiom-exterior-approach-adrian-v2-production');
  expect(openingShots[4].issues).toEqual([]);
  expect(openingShots[5].art?.asset.id).toBe('axiom-opening-office-shot01-daniel-v3-transparent-production');
  expect(openingShots[5].issues).toEqual([]);
  expect(openingShots[6].art?.asset.id).toBe('axiom-opening-office-shot02-benton-v3-transparent-production');
  expect(openingShots[6].issues).toEqual([]);
  expect(openingShots[11].art?.asset.id).toBe('axiom-opening-office-shot01-maya-v3-transparent-production');
  expect(openingShots[12].art?.asset.id).toBe('axiom-opening-office-shot01-maya-v3-transparent-production');
  expect(openingShots[13].art?.asset.id).toBe('axiom-opening-office-shot01-maya-v3-transparent-production');
  for (const visual of openingShots.slice(11, 14)) expect(visual.issues).toEqual([]);
  expect(openingShots[15].art?.asset.id).toBe('axiom-opening-office-shot04-alone-v3-transparent-lift-production');
  expect(openingShots[15].issues).toEqual([]);
  expect(openingShots.slice(7, 11).map((visual) => visual.art?.asset.id)).toEqual([
    'axiom-opening-office-shot03-file-v3-transparent-production',
    'axiom-casework-brief-v2-lift-production',
    'axiom-casework-documents-v2-production',
    'axiom-casework-documents-v2-production',
  ]);
  for (const visual of openingShots.slice(7, 11)) expect(visual.issues).toEqual([]);
  expect(openingShots[14].art?.asset.id).toBe(
    'axiom-opening-office-shot02-maya-departure-v3-transparent-production',
  );
  expect(openingShots[14].issues).toEqual([]);
});

it('returns to the approved opening master after an inspection is no longer the active state', () => {
  const reply = choice(initialState(), 'bond.friend');
  const inspected = act(reply, { type: 'INSPECT_APARTMENT', id: 'lease' });
  expect(resolveSceneArt(inspected).art?.asset.id).toBe(
    'opening-apartment-housing-notice-v2-production',
  );
  const departure = choice(inspected, 'morning.yes');
  expect(resolveSceneArt(departure).shot?.shotId).toBe('opening.apartment.shot01');
  expect(resolveSceneArt(departure).art?.asset.id).toBe('opening-apartment-master-v3-production');
  expect(resolveSceneArt(departure).issues).toEqual([]);
});

it('Lantern holds for dialogue only on the meeting route, then cuts for authored touch/exit', () => {
  const home = evening();
  const meet = day(home, 'evening.meet');
  const first = resolveSceneArt(meet);
  expect(first.art?.asset.id).toBe('eve-scene-maya-evening-continuity-v2');
  const disclosed = day(meet, 'disclose.medical');
  expect(resolveSceneArt(disclosed).art?.asset.id).toBe(first.art?.asset.id);
  expect(exactArt(resolveSceneArt(day(disclosed, 'closure.evelyn')))).toBeUndefined();
  expect(exactArt(resolveSceneArt(day(home, 'evening.call')))).toBeUndefined();
});

it('wardrobe establishes the rack before selection; dressing cuts instead of holding the old room', () => {
  const rack = traverse(undefined, {}, 'wardrobe');
  expect(resolveSceneArt(rack).art?.asset.id).toBe('clinic-wardrobe-choice-v1-production');
  expect(resolveSceneArt(clinic(rack, 'outfit.executive')).art?.asset.id).toBe('clinic-makeup-executive-v1-lift-production');
});

it('home images require exact approved wardrobe, moment and no later inspection', () => {
  const home = act(runMission(), { type: 'CONTINUE_CHAPTER3' });
  expect(resolveSceneArt(home).art?.asset.id).toBe(
    'apartment-post-glasshouse-executive-noir-v2-production',
  );
  expect(
    exactArt(resolveSceneArt(act(home, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.mirror' }))),
  ).toBeUndefined();
  for (const outfit of ['socialite', 'shadow']) {
    const other = act(runMission(missionStart(outfit)), { type: 'CONTINUE_CHAPTER3' });
    expect(exactArt(resolveSceneArt(other))).toBeUndefined();
  }
});

it('binds only the approved environment holds for the mission car and Glass House entry', () => {
  const start = missionStart('executive');
  const car = mission(start, 'mission.begin');
  expect(car.scene).toBe('mission');
  expect(car.phase).toBe('car');
  expect(resolveSceneArt(car).shot?.shotId).toBe('mission.car');
  expect(resolveSceneArt(car).art?.asset.id).toBe('car-rain-window-noir-v2-lift-production');
  expect(resolveSceneArt(car).issues).toEqual([]);

  const arrival = mission(car, 'car.arrive');
  expect(resolveSceneArt(arrival).shot?.shotId).toBe('mission.arrival');
  expect(resolveSceneArt(arrival).art?.asset.id).toBe('eve-bg-glass-entrance-noir-v2-production');
  expect(resolveSceneArt(arrival).issues).toEqual([]);

  const reception = mission(arrival, 'arrival.enter');
  expect(resolveSceneArt(reception).shot?.shotId).toBe('mission.reception');
  expect(resolveSceneArt(reception).art?.asset.id).toBe('glass-house-reception-v1-production');
  expect(resolveSceneArt(reception).issues).toEqual([]);

  const wrong = { ...reception, phase: 'entry' as const };
  expect(exactArt(resolveSceneArt(wrong))).toBeUndefined();
});

it('binds the Glass House assessment and method cuts only to their authored nodes', () => {
  const assessment = runMission(missionStart(), {}, 'assessment');
  expect(assessment.scene).toBe('mission');
  expect(assessment.phase).toBe('assessment');
  expect(resolveSceneArt(assessment).shot?.shotId).toBe('mission.assessment');
  expect(resolveSceneArt(assessment).art?.asset.id).toBe('glass-house-assessment-v1-production');
  expect(resolveSceneArt(assessment).issues).toEqual([]);

  const method = runMission(missionStart(), {}, 'method');
  expect(method.phase).toBe('method');
  expect(resolveSceneArt(method).shot?.shotId).toBe('mission.method');
  expect(resolveSceneArt(method).art?.asset.id).toBe('glass-house-method-v1-production');
  expect(resolveSceneArt(method).issues).toEqual([]);
});

it('binds the Chapter 3 monitored-phone placement after the authored phone action', () => {
  const home = act(runMission(), { type: 'CONTINUE_CHAPTER3' });
  const surveillance = act(home, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.phone' });
  expect(surveillance.scene).toBe('chapter3');
  expect(surveillance.phase).toBe('surveillance');
  expect(resolveSceneArt(surveillance).shot?.shotId).toBe('chapter3.surveillance.shot01');
  expect(resolveSceneArt(surveillance).art?.asset.id).toBe('chapter3-surveillance-phone-v1-lift-production');
  expect(resolveSceneArt(surveillance).issues).toEqual([]);
});

it('binds the first Chapter 4 river and public-records cuts to exact nodes', () => {
  const entry = choose4(departure(), 'begin');
  expect(resolveSceneArt(entry).shot?.shotId).toBe('chapter4.entry.shot01');
  expect(resolveSceneArt(entry).art?.asset.id).toBe('chapter4-river-entry-v1-lift-production');
  expect(resolveSceneArt(entry).issues).toEqual([]);

  const consequences = choose4(entry, 'payoff');
  expect(resolveSceneArt(consequences).shot?.shotId).toBe('chapter4.consequences.shot01');
  expect(resolveSceneArt(consequences).art?.asset.id).toBe('chapter4-river-consequences-v1-lift-production');
  expect(resolveSceneArt(consequences).issues).toEqual([]);

  let resourceSource = consequences;
  for (let i = 0; i < 10 && resourceSource.phase === 'consequences'; i++) {
    const nextDay = chapter4Choices(resourceSource).find((choice) => choice.id === 'chapter4.next-day');
    if (nextDay) break;
    const resolve = chapter4Choices(resourceSource).find((choice) => choice.id.includes('.resolve-'));
    if (!resolve) throw new Error('No deterministic Chapter 4 resolution choice');
    resourceSource = choose4(resourceSource, resolve.id.slice('chapter4.'.length));
  }
  const resource = choose4(resourceSource, 'next-day');
  expect(resolveSceneArt(resource).shot?.shotId).toBe('chapter4.resource.shot01');
  expect(resolveSceneArt(resource).art?.asset.id).toBe('chapter4-public-records-noir-v2-production');
  expect(resolveSceneArt(resource).issues).toEqual([]);

  const assignment = choose4(resource, 'reader-pass');
  expect(resolveSceneArt(assignment).shot?.shotId).toBe('chapter4.assignment.shot01');
  expect(resolveSceneArt(assignment).art?.asset.id).toBe('chapter4-assignment-index-noir-v2-production');
  expect(resolveSceneArt(assignment).issues).toEqual([]);
});

it('binds the reviewed Blackglass sequence only to its exact reached nodes', () => {
  const arrival = day(finish(toMaya()), 'day.begin');
  const resolved = resolveSceneArt(arrival);
  expect(arrival.scene).toBe('file');
  expect(arrival.phase).toBe('arrival');
  expect(resolved.shot?.shotId).toBe('opening.blackglass.shot01-arrival');
  expect(resolved.art?.asset.id).toBe('blackglass-file-arrival-v1-lift-production');
  expect(resolved.issues).toEqual([]);

  const directory = day(arrival, 'file.open');
  expect(directory.phase).toBe('directory');
  expect(resolveSceneArt(directory).shot?.shotId).toBe('opening.blackglass.shot02-directory');
  expect(resolveSceneArt(directory).art?.asset.id).toBe('blackglass-directory-v1-lift-production');

  const authorized = day(directory, 'file.authorize');
  expect(resolveSceneArt(authorized).shot?.shotId).toBe('opening.blackglass.shot03-authorized');
  expect(resolveSceneArt(authorized).art?.asset.id).toBe('blackglass-authorized-v1-lift-production');

  const intervention = day(authorized, 'security.turn');
  expect(resolveSceneArt(intervention).shot?.shotId).toBe('opening.blackglass.shot04-security-intervention');
  expect(resolveSceneArt(intervention).art?.asset.id).toBe('blackglass-security-intervention-v1-lift-production');

  const escort = day(intervention, 'security.comply');
  expect(resolveSceneArt(escort).shot?.shotId).toBe('opening.blackglass.shot05-security-escort');
  expect(resolveSceneArt(escort).art?.asset.id).toBe('blackglass-security-escort-v1-lift-production');

  const intro = day(escort, 'security.enter');
  expect(resolveSceneArt(intro).art?.asset.id).toBe('sloane-intro-v1-production');
  const allegation = day(intro, 'intro.arrest');
  expect(resolveSceneArt(allegation).art?.asset.id).toBe('sloane-allegation-noir-v2-production');
  const brief = day(allegation, 'leverage.need');
  expect(resolveSceneArt(brief).art?.asset.id).toBe('sloane-brief-noir-v2-production');
  const identity = day(brief, 'brief.mission');
  expect(resolveSceneArt(identity).art?.asset.id).toBe('sloane-identity-v1-production');
  const offer = day(identity, 'attention.evelyn');
  expect(resolveSceneArt(offer).art?.asset.id).toBe('sloane-offer-v1-production');
  const lobby = day(offer, 'offer.refuse');
  expect(resolveSceneArt(lobby).art?.asset.id).toBe('refusal-lobby-v1-production');
  const reconsider = day(lobby, 'refusal.return');
  expect(resolveSceneArt(reconsider).art?.asset.id).toBe('refusal-reconsider-v1-production');

  expect(resolveSceneArt(directory, 0).art?.asset.id).toBe('blackglass-directory-v1-lift-production');
  expect(resolveSceneArt(escort).art?.asset.id).not.toBe('blackglass-directory-v1-lift-production');
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
    'c5-harbour-evelynn-julian-composite-v2-noir-production',
    'c5-harbour-julian-departed-composite-v1-noir-production',
    'c5-h2-coffee-return-composite-v1-noir-production',
  ]);
  expect(exactArt(resolveSceneArt(coffee, 99))).toBeUndefined();
  expect(encodeSave(coffee)).toBe(saved);
  expect(exactArt(resolveSceneArt(decodeSave(saved)))).toBeUndefined();
  expect(exactArt(resolveSceneArt(walk5(coffee, ['leave-room']), 1))).toBeUndefined();
});

it('promoted H1, H2 and Aster arrival bind only to their exact reached action and survive reload', () => {
  expect(resolveSceneArt(harbourArrival).art?.asset.id).toBe(
    'c5-h1-arrival-composite-v3-noir-production',
  );
  expect(resolveSceneArt(coffee, 3).art?.asset.id).toBe(
    'c5-h2-coffee-return-composite-v1-noir-production',
  );
  expect(resolveSceneArt(asterArrival).art?.asset.id).toBe(
    'c5-s07-aster-arrival-composite-v2-noir-production',
  );
  expect(resolveSceneArt(decodeSave(encodeSave(harbourArrival))).art?.asset.id).toBe(
    'c5-h1-arrival-composite-v3-noir-production',
  );
  expect(resolveSceneArt(decodeSave(encodeSave(asterArrival))).art?.asset.id).toBe(
    'c5-s07-aster-arrival-composite-v2-noir-production',
  );
  const minimal = walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-attend',
    'look-minimal',
  ]);
  expect(exactArt(resolveSceneArt(minimal))).toBeUndefined();
  expect(exactArt(resolveSceneArt(walk5(harbourArrival, ['attention-enjoy'])))).toBeUndefined();
  expect(exactArt(resolveSceneArt(walk5(asterArrival, ['publish'])))).toBeUndefined();
});

it('binds Chapter 5 echo apartment art to each exact purchase state and fails closed elsewhere', () => {
  const spend = walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
  ]);
  const variants = [
    ['spend-save', 'c05.s03.shot01-no-purchase', 'chapter5-echo-no-purchase-v1-production'],
    ['spend-nothing', 'c05.s03.shot01-no-purchase', 'chapter5-echo-no-purchase-v1-production'],
    ['buy-phone', 'c05.s03.shot01-phone', 'chapter5-echo-boxed-phone-v1-production'],
    ['buy-wardrobe', 'c05.s03.shot01-blouse', 'chapter5-echo-blouse-v1-production'],
    ['buy-accessory', 'c05.s03.shot01-clasp', 'chapter5-echo-clasp-v1-production'],
    ['buy-dinner', 'c05.s03.shot01-lunch', 'chapter5-echo-lunch-v1-production'],
  ] as const;
  for (const [action, shotId, assetId] of variants) {
    const echo = walk5(spend, [action]);
    const resolved = resolveSceneArt(echo);
    expect(resolved.shot?.shotId).toBe(shotId);
    expect(resolved.art?.asset.id).toBe(assetId);
    expect(resolved.issues).toEqual([]);
    expect(resolveSceneArt(decodeSave(encodeSave(echo))).art?.asset.id).toBe(assetId);
  }
  const unselected = spend;
  expect(exactArt(resolveSceneArt(unselected))).toBeUndefined();
  expect(resolveSceneArt(unselected).shot).toBeUndefined();
});

it('exact phone placement is selected; wardrobe, location, props, unearned rewards and forged timing fail closed', () => {
  const selected = resolveSceneArt(final);
  expect(selected.art?.asset.id).toBe('c5-s12-shot05-phone-composite-v2-noir-production');
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
      exactArt(resolveSceneArt({ ...final, choices: { ...final.choices, [key]: value } })),
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
