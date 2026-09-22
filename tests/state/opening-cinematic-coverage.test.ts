import { describe, expect, it } from 'vitest';
import { act, initialState } from '../../src/state/reducer';
import { resolveSceneArt, validateSceneShot } from '../../src/ui/scene-art';
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
    expect(report.runtimeApproved).toBe(14);
    expect(report.componentOnly).toBe(0);
    expect(report.staging).toBe(0);
    expect(report.missing).toBe(1);
    expect(report.complete).toBe(false);
    expect(report.missingShotIds).toEqual([
      'opening.maya.shot02-departure',
    ]);
    expect(report.incompleteShotIds).not.toContain('opening.axiom.shot03-office-arrival');
    const officeArrival = report.cuts.find(
      (cut) => cut.shotId === 'opening.axiom.shot03-office-arrival',
    );
    expect(officeArrival?.effectiveStatus).toBe('RUNTIME_APPROVED');
    expect(officeArrival?.boundAssetId).toBe('axiom-office-arrival-v1-production');
    const benton = report.cuts.find((cut) => cut.shotId === 'opening.office.shot02-benton');
    expect(benton?.effectiveStatus).toBe('RUNTIME_APPROVED');
    expect(benton?.boundAssetId).toBe('axiom-opening-office-shot02-benton-v1-production');
    const maya = report.cuts.find((cut) => cut.shotId === 'opening.maya.shot01-coffee');
    expect(maya?.effectiveStatus).toBe('RUNTIME_APPROVED');
    expect(maya?.boundAssetId).toBe('axiom-opening-office-shot01-maya-v1-production');
    const alone = report.cuts.find((cut) => cut.shotId === 'opening.office.shot04-alone');
    expect(alone?.effectiveStatus).toBe('RUNTIME_APPROVED');
    expect(alone?.boundAssetId).toBe('axiom-opening-office-shot04-alone-v1-production');
  });

  it('keeps fail-closed scene-art safety separate from the completeness gate', () => {
    const reply = choice(initialState(), 'bond.friend');
    const commute = advance(choice(reply, 'morning.yes'));
    const visual = resolveSceneArt(commute, 3);
    expect(visual.shot?.shotId).toBe('opening.office.shot01-daniel');
    expect(visual.art?.asset.id).toBe('axiom-opening-office-shot01-daniel-v1-production');
    expect(visual.issues).toEqual([]);
  });

  it('rejects a previous opening frame after a participant CUT while allowing Daniel in both arrival states', () => {
    const commute = advance(choice(choice(initialState(), 'bond.friend'), 'morning.yes'));
    const approach = {
      shotId: 'opening.axiom.shot01-approach',
      assetId: 'axiom-approach-v2-production',
      alt: '',
    };
    const daniel = advance(commute);
    expect(validateSceneShot(commute, approach)).not.toContain('LOCATION_MISMATCH');
    expect(validateSceneShot(daniel, approach)).toContain('LOCATION_MISMATCH');

    const danielShot = {
      shotId: 'opening.office.shot01-daniel',
      alt: '',
    };
    expect(validateSceneShot(commute, danielShot)).not.toContain('LOCATION_MISMATCH');
    expect(validateSceneShot(daniel, danielShot)).not.toContain('LOCATION_MISMATCH');
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
    expect(resolveSceneArt(benton).art?.asset.id).toBe('axiom-opening-office-shot02-benton-v1-production');
    expect(resolveSceneArt(benton).issues).toEqual([]);
    expect(resolveSceneArt(file).shot?.shotId).toBe('opening.office.shot03-file');
    expect(resolveSceneArt(brief).shot?.shotId).toBe('opening.helix.shot01-brief');
    expect(resolveSceneArt(documents).shot?.shotId).toBe('opening.helix.shot02-documents');
    expect(resolveSceneArt(analysis).shot?.shotId).toBe('opening.helix.shot02-documents');
    expect(resolveSceneArt(mayaPromotion).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaPromotion).art?.asset.id).toBe('axiom-opening-office-shot01-maya-v1-production');
    expect(resolveSceneArt(mayaPromotion).issues).toEqual([]);
    expect(resolveSceneArt(mayaInvitation).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaInvitation).art?.asset.id).toBe('axiom-opening-office-shot01-maya-v1-production');
    expect(resolveSceneArt(mayaCase).shot?.shotId).toBe('opening.maya.shot01-coffee');
    expect(resolveSceneArt(mayaCase).art?.asset.id).toBe('axiom-opening-office-shot01-maya-v1-production');
    expect(resolveSceneArt(mayaGoodbye).shot?.shotId).toBe('opening.maya.shot02-departure');
    expect(resolveSceneArt(ending).shot?.shotId).toBe('opening.office.shot04-alone');
    expect(resolveSceneArt(ending).art?.asset.id).toBe('axiom-opening-office-shot04-alone-v1-production');
    expect(resolveSceneArt(ending).issues).toEqual([]);

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
