import { expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { encodeSave } from '../../src/persistence/saves';
import { resolveSceneArt, validateSceneShot } from '../../src/ui/scene-art';
import { openingCaseworkShots } from '../../src/ui/opening-casework-art';
import { OPENING_VISUAL_SCREEN_SPECS, resolveOpeningVisualOccupancy } from '../../src/ui/opening-visual-occupancy';
import { openingVisualFixtures } from '../opening-visual-fixtures';
import receipt from '../../art/production/opening/axiom-casework-zero-cost-receipt.json';

it('reaches all 20 screens and proves actual resolver occupancy and immutable saves', () => {
  const fixtures = openingVisualFixtures();
  expect(fixtures).toHaveLength(20);
  const expectedVisible = [true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, false, true];
  const images: (string | undefined)[] = [];
  fixtures.forEach(({ state, position }, index) => {
    const raw = encodeSave(state);
    const resolved = resolveSceneArt(state, position);
    const occupancy = resolveOpeningVisualOccupancy(state, position)!;
    expect(occupancy.screenId).toBe(OPENING_VISUAL_SCREEN_SPECS[index].screenId);
    expect(resolved.shot?.shotId).toBe(occupancy.resolvedShotId);
    expect(!!resolved.art).toBe(expectedVisible[index]);
    expect(occupancy.artVisible).toBe(!!resolved.art);
    expect(resolved.issues).toEqual(expectedVisible[index] ? [] : ['SHOT_WITHOUT_APPROVED_ASSET']);
    expect(encodeSave(state)).toBe(raw);
    images.push(resolved.art?.asset.id);
  });
  expect(images[11]).toBe(images[12]); // Analysis HOLD.
  expect(new Set([9, 10, 11, 13, 14].map((i) => images[i])).size).toBe(5); // Authored CUTs.
});

it('rejects every casework image outside its exact reached nodes, including future and past shots', () => {
  for (const [shotId, binding] of Object.entries(openingCaseworkShots)) {
    for (const { state } of openingVisualFixtures()) {
      const allowed = binding.nodes.includes(`${state.scene}.${state.phase}`);
      const issues = validateSceneShot(state, { shotId, assetId: binding.assetId, alt: binding.alt });
      expect(issues.length === 0).toBe(allowed);
      if (!allowed) expect(issues).toContain('FUTURE_STATE_VISUAL');
    }
  }
});

it('preserves approved source provenance and serves only exact production copies at zero cost', () => {
  const sha = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');
  expect(sha(receipt.source)).toBe(receipt.sourceSha256);
  expect(receipt.providerCalls).toBe(0);
  expect(receipt.credits).toBe(0);
  expect(new Set(receipt.outputs.map((row) => row.sha256)).size).toBe(5);
  for (const row of receipt.outputs) {
    expect(sha(`art/production/opening/${row.assetId}.png`)).toBe(row.sha256);
    expect(sha(`public/art/opening/${row.assetId}.png`)).toBe(row.sha256);
  }
});
