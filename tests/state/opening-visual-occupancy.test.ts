import { describe, expect, it } from 'vitest';
import { act, initialState } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';
import { resolveSceneArt } from '../../src/ui/scene-art';
import {
  formatOpeningVisualOccupancyReport,
  OPENING_VISUAL_SCREEN_SPECS,
  openingVisualOccupancyReport,
  resolveOpeningVisualOccupancy,
} from '../../src/ui/opening-visual-occupancy';
import { advance, choice } from '../helpers';

describe('opening visual occupancy contract', () => {
  it('reports every canonical opening screen and names every current blank', () => {
    const report = openingVisualOccupancyReport();
    console.info(`\n${formatOpeningVisualOccupancyReport(report)}\n`);
    const formatted = formatOpeningVisualOccupancyReport(report);
    expect(formatted).not.toContain(
      'commute.arrival / security -> requires opening.axiom.shot02-security',
    );
    expect(report.totalPlayableScreens).toBe(20);
    expect(report.totalReachableScreens).toBe(20);
    expect(report.screensWithRuntimeVisibleArt).toBe(20);
    expect(report.artVisible).toBe(20);
    expect(report.screensCurrentlyBlank).toBe(0);
    expect(report.blank).toBe(0);
    expect(report.uniqueRequiredCuts).toBe(15);
    expect(report.holdCoveredScreens).toBe(6);
    expect(report.complete).toBe(true);
    expect(report.blankScreens).toEqual([]);
  });

  it('keeps apartment inspection inserts truthful and returns to the approved base on departure', () => {
    const reply = choice(initialState(), 'bond.friend');
    const inspected = act(reply, { type: 'INSPECT_APARTMENT', id: 'lease' });
    const insert = resolveOpeningVisualOccupancy(inspected);
    expect(insert).toMatchObject({
      visualMode: 'CUT',
      resolvedVisualMode: 'CUT',
      resolvedShotId: 'opening.apartment.inspect-lease',
      artStatus: 'RUNTIME_APPROVED',
      requiredAssetStatus: 'RUNTIME_APPROVED',
      artVisible: true,
    });
    expect(resolveSceneArt(inspected).art?.asset.id).toBe(
      'opening-apartment-housing-notice-v1-production',
    );

    const unillustrated = act(reply, { type: 'INSPECT_APARTMENT', id: 'mirror' });
    expect(resolveOpeningVisualOccupancy(unillustrated)).toMatchObject({
      visualMode: 'HOLD',
      resolvedVisualMode: 'HOLD',
      resolvedShotId: 'opening.apartment.shot01-mirror',
      holdSource: 'opening.apartment.shot01-mirror',
      artStatus: 'RUNTIME_APPROVED',
      artVisible: true,
    });
    expect(resolveSceneArt(unillustrated).shot?.shotId).toBe('opening.apartment.shot01-mirror');

    const departure = choice(inspected, 'morning.yes');
    const hold = resolveOpeningVisualOccupancy(departure);
    expect(hold).toMatchObject({
      node: 'apartment.departure',
      visualMode: 'HOLD',
      resolvedShotId: 'opening.apartment.shot01',
      holdSource: 'opening.apartment.shot01',
      artStatus: 'RUNTIME_APPROVED',
      artVisible: true,
    });
    expect(resolveSceneArt(departure).art?.asset.id).toBe('opening-apartment-master-v2-production');
  });

  it('cuts for participant/location changes and holds only within the authored staging', () => {
    const holdScreens = OPENING_VISUAL_SCREEN_SPECS.filter((screen) => screen.visualMode === 'HOLD');
    for (const screen of holdScreens) {
      expect(screen.holdSource).toBe(screen.resolvedShotId);
      expect(screen.activeCharacters.length).toBeGreaterThan(0);
    }
    expect(OPENING_VISUAL_SCREEN_SPECS.find((screen) => screen.screenId.endsWith('04-daniel'))?.visualMode).toBe('CUT');
    expect(OPENING_VISUAL_SCREEN_SPECS.find((screen) => screen.screenId === 'opening.office.benton')?.visualMode).toBe('CUT');
    expect(OPENING_VISUAL_SCREEN_SPECS.find((screen) => screen.screenId === 'opening.maya.goodbye')?.visualMode).toBe('CUT');
    expect(OPENING_VISUAL_SCREEN_SPECS.find((screen) => screen.screenId === 'opening.ending.complete')?.visualMode).toBe('CUT');
  });

  it('keeps commute reading cursor movement visual-only and save-byte stable', () => {
    const reply = choice(initialState(), 'bond.friend');
    const commute = advance(choice(reply, 'morning.yes'));
    const raw = encodeSave(commute);
    const positions = [0, 1, 2, 3].map((position) => resolveOpeningVisualOccupancy(commute, position));
    expect(positions.map((screen) => screen?.resolvedShotId)).toEqual([
      'opening.axiom.shot01-approach',
      'opening.axiom.shot02-security',
      'opening.axiom.shot03-office-arrival',
      'opening.office.shot01-daniel',
    ]);
    expect(encodeSave(commute)).toBe(raw);
    expect(resolveSceneArt(commute, 99).art).toBeUndefined();
    expect(encodeSave(commute)).toBe(raw);
  });

  it('keeps security prose on the security CUT until the office-arrival CUT', () => {
    const commute = advance(choice(choice(initialState(), 'bond.friend'), 'morning.yes'));
    const security = resolveOpeningVisualOccupancy(commute, 1);
    const officeArrival = resolveOpeningVisualOccupancy(commute, 2);
    expect(security).toMatchObject({
      node: 'commute.arrival',
      readingBeat: 'security',
      visualMode: 'CUT',
      resolvedShotId: 'opening.axiom.shot02-security',
      runtimeStatus: 'RUNTIME_APPROVED',
      artVisible: true,
    });
    expect(officeArrival).toMatchObject({
      node: 'commute.arrival',
      readingBeat: 'office arrival',
      visualMode: 'CUT',
      resolvedShotId: 'opening.axiom.shot03-office-arrival',
      runtimeStatus: 'RUNTIME_APPROVED',
      artVisible: true,
    });
  });

  it('resolves the promoted approach art while later cuts remain fail-closed', () => {
    const reply = choice(initialState(), 'bond.friend');
    const commute = advance(choice(reply, 'morning.yes'));
    const occupancy = resolveOpeningVisualOccupancy(commute, 0);
    expect(occupancy?.visualMode).toBe('CUT');
    expect(occupancy?.resolvedShotId).toBe('opening.axiom.shot01-approach');
    expect(occupancy?.artVisible).toBe(true);
    expect(resolveSceneArt(commute, 0).art?.asset.id).toBe('axiom-exterior-approach-adrian-v2-production');
    expect(resolveSceneArt(commute, 0).issues).toEqual([]);
    expect(resolveSceneArt(commute, 2).art?.asset.id).toBe('axiom-office-approach-adrian-v3-transparent-production');
    expect(resolveSceneArt(commute, 2).issues).toEqual([]);
    expect(resolveSceneArt(commute, 3).art?.asset.id).toBe(
      'axiom-opening-office-shot01-daniel-v3-transparent-production',
    );
    expect(resolveSceneArt(commute, 3).issues).toEqual([]);
  });

  it('fails the release occupancy gate while any playable opening state is blank', () => {
    if (process.env.EVE_OPENING_VISUAL_GATE !== '1') return;
    expect(openingVisualOccupancyReport().complete).toBe(true);
  });
});
