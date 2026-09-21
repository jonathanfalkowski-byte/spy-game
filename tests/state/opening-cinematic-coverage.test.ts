import { describe, expect, it } from 'vitest';
import { act, initialState } from '../../src/state/reducer';
import { resolveSceneArt } from '../../src/ui/scene-art';
import {
  OPENING_CINEMATIC_CUTS,
  OPENING_CINEMATIC_HOLDS,
  formatOpeningCinematicCoverageReport,
  openingCinematicCoverageReport,
} from '../../src/ui/opening-cinematic-coverage';
import { advance, choice, toAnalysis, toMaya } from '../helpers';

describe('opening cinematic coverage contract', () => {
  it('reports incomplete runtime coverage without treating missing art as safe coverage', () => {
    const report = openingCinematicCoverageReport();
    console.info(`\n${formatOpeningCinematicCoverageReport(report)}\n`);
    expect(report.requiredShots).toBe(15);
    expect(report.runtimeApproved).toBe(2);
    expect(report.componentOnly).toBe(1);
    expect(report.staging).toBe(3);
    expect(report.missing).toBe(9);
    expect(report.complete).toBe(false);
    expect(report.missingShotIds).toEqual([
      'opening.axiom.shot01-approach',
      'opening.office.shot01-daniel',
      'opening.office.shot03-file',
      'opening.helix.shot01-brief',
      'opening.helix.shot02-documents',
      'opening.helix.shot03-review',
      'opening.helix.shot04-submitted',
      'opening.maya.shot02-departure',
      'opening.office.shot04-alone',
    ]);
    expect(report.incompleteShotIds).toContain('opening.axiom.shot03-office-arrival');
    const officeArrival = report.cuts.find(
      (cut) => cut.shotId === 'opening.axiom.shot03-office-arrival',
    );
    expect(officeArrival?.effectiveStatus).toBe('COMPONENT_ONLY');
    expect(officeArrival?.boundAssetId).toBeUndefined();
  });

  it('keeps fail-closed scene-art safety separate from the completeness gate', () => {
    const reply = choice(initialState(), 'bond.friend');
    const commute = advance(choice(reply, 'morning.yes'));
    const visual = resolveSceneArt(commute, 3);
    expect(visual.shot?.shotId).toBe('opening.office.shot01-daniel');
    expect(visual.art).toBeUndefined();
    expect(visual.issues).toEqual(['SHOT_WITHOUT_APPROVED_ASSET']);
  });

  it('cuts when Daniel, Benton and Maya become active and holds their dialogue shots', () => {
    const opening = initialState();
    const commute = advance(choice(choice(opening, 'bond.friend'), 'morning.yes'));
    const daniel = advance(commute);
    const benton = choice(daniel, 'promotion.professional');
    const file = choice(benton, 'benton.obey');
    const brief = advance(file);
    const documents = advance(brief);
    const analysis = toAnalysis();
    const mayaPromotion = toMaya();
    const mayaInvitation = choice(mayaPromotion, 'mayaPromotion.hurt');
    const mayaCase = choice(mayaInvitation, 'invitation.yes');
    const mayaGoodbye = choice(mayaCase, 'disclosure.private');
    const ending = advance(mayaGoodbye);

    expect(resolveSceneArt(commute, 3).shot?.shotId).toBe('opening.office.shot01-daniel');
    expect(resolveSceneArt(daniel).shot?.shotId).toBe('opening.office.shot01-daniel');
    expect(resolveSceneArt(benton).shot?.shotId).toBe('opening.office.shot02-benton');
    expect(resolveSceneArt(file).shot?.shotId).toBe('opening.office.shot03-file');
    expect(resolveSceneArt(brief).shot?.shotId).toBe('opening.helix.shot01-brief');
    expect(resolveSceneArt(documents).shot?.shotId).toBe('opening.helix.shot02-documents');
    expect(resolveSceneArt(analysis).shot?.shotId).toBe('opening.helix.shot02-documents');
    expect(resolveSceneArt(mayaPromotion).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaInvitation).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaCase).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaGoodbye).shot?.shotId).toBe('opening.maya.shot02-departure');
    expect(resolveSceneArt(ending).shot?.shotId).toBe('opening.office.shot04-alone');

    expect(OPENING_CINEMATIC_HOLDS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ shotId: 'opening.office.shot01-daniel' }),
        expect.objectContaining({ shotId: 'opening.office.shot02-benton' }),
        expect.objectContaining({ shotId: 'opening.maya.shot01-coffee' }),
      ]),
    );
  });

  it('keeps the contract field-complete for every authored cut', () => {
    expect(OPENING_CINEMATIC_CUTS).toHaveLength(15);
    for (const cut of OPENING_CINEMATIC_CUTS) {
      expect(cut.shotId).toBeTruthy();
      expect(cut.trigger).toBeTruthy();
      expect(cut.node).toBeTruthy();
      expect(cut.location).toBeTruthy();
      expect(cut.characters.length).toBeGreaterThan(0);
      expect(cut.reasonForCut).toBeTruthy();
      expect(['RUNTIME_APPROVED', 'COMPONENT_ONLY', 'STAGING', 'MISSING']).toContain(
        cut.requiredAssetStatus,
      );
    }
  });

  it('fails the release gate when enabled until every cut is runtime-approved', () => {
    if (process.env.EVE_OPENING_CINEMATIC_GATE !== '1') return;
    expect(openingCinematicCoverageReport().complete).toBe(true);
  });
});
