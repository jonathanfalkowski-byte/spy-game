import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';
import coverage from '../../art/production/chapter5/coverage.json';
import approval from '../../art/production/chapter5/approval.json';
import harbourApprovals from '../../art/production/chapter5/harbour-approvals.json';
import movement from '../../art/production/chapter5/harbour-evidence/movement-spec.json';

it('packages exact Harbour shots without expanding identity authority or branch coverage', () => {
  expect(harbourApprovals.map(a => a.shotId)).toEqual(['c05.s06.shot12-entrance', 'c05.s06.shot15-departed']);
  for (const approved of harbourApprovals) {
    const asset = visualCatalog.find(a => a.spec.assetId === approved.assetId)!;
    expect(asset.approvalStatus).toBe('approved');
    expect(asset.role).toBe('production');
    expect(() => canonicalReference(approved.assetId)).toThrow('not an approved canonical');
    for (const file of Object.values(approved.files)) {
      expect(createHash('sha256').update(readFileSync(file)).digest('hex')).toBe(approved.sha256);
    }
    expect(approved.requiredBeatState).toMatchObject({event:'attend',wardrobe:'c05.professional',julianAccess:true,attention:'coffee',coffeeCount:1,contact:false});
    expect(approved.runtimeBindingChanged).toBe(false);
    expect(approved.scope).toBe('SHOT-SPECIFIC / COMPOSITION-SPECIFIC');
  }
  expect(harbourApprovals[0].requiredBeatState.julianDeparted).toBe(false);
  expect(harbourApprovals[1].requiredBeatState.julianDeparted).toBe(true);
  expect(movement.julianNewPlacement).toBeNull();
  expect(movement.evelynnPlacement).toMatchObject({x:366.6,y:299.4,scale:0.8});
  expect(movement.costCredits).toBe(0);
});

it('promotes the exact owner-approved apartment PNG without making a character reference', () => {
  validateVisualCatalog();
  const asset = visualCatalog.find(a => a.spec.assetId === approval.assetId)!;
  expect(asset.role).toBe('production');
  expect(asset.approvalStatus).toBe('approved');
  expect(asset.approval?.reviewer).toBe('Project owner');
  expect(() => canonicalReference(approval.assetId)).toThrow('not an approved canonical');
  for (const file of Object.values(approval.files)) {
    const bytes = readFileSync(file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(approval.sha256);
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1920,1080]);
  }
  expect(asset.sha256).toBe(approval.sha256);
});

it('keeps production coverage bounded to the completed professional two-phone state', () => {
  expect(coverage.productionShots).toHaveLength(3);
  const shot=coverage.productionShots[0];
  expect(shot.shotId).toBe('c05.s12.shot05-phone');
  expect(shot.trigger).toBe('place-phone completed');
  expect(shot.requiredState).toEqual({
    'c5.presentation':'professional','c5.wardrobe':'c05.professional','c5.purchase':'phone',
    'c5.placement':'phone','c5.personal-location':'table-unboxed',
    'c5.axiom-location':'table-home','c5.offer':'declined',
  });
  expect(shot.excludedState).toEqual(['c5.published','c5.event-photo','new evening arrangement']);
  expect(shot.phones).toBe(2);
  expect(shot.jacket).toBe('inside-wardrobe');
  expect(shot.runtimeBound).toBe(false);
  expect(coverage.completeChapterCoverage).toBe(false);
  expect(approval.retainedNotes).toHaveLength(4);
  expect(approval.scope).toBe('SHOT-SPECIFIC ONLY');
});
