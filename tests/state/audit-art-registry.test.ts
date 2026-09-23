import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import coverage from '../../docs/art/CHAPTER_5_COVERAGE_AUDIT.json';
import production from '../../art/production/chapter5/coverage.json';
import records from '../../art/production/chapter5/records.json';
import authority from '../../docs/art/CURRENT_AUTHORITY_INDEX.json';
import { shotBindings } from '../../src/ui/scene-art';

it('keeps every runtime shot in the active registry and an existing explicit approval', () => {
  const registry = new Map(coverage.shots.map((s) => [s.shotId, s]));
  expect(registry.size).toBe(coverage.shots.length);
  const source = readFileSync('src/ui/chapter5-beats.ts', 'utf8');
  const ids = [...new Set(source.match(/c05\.s\d+\.shot[\w-]+/g))];
  for (const id of ids) expect(registry.has(id), id).toBe(true);
  for (const shot of production.productionShots) {
    expect(registry.get(shot.shotId)?.status).toBe('PRODUCTION');
    const record = records.find((r) => r.spec.assetId === shot.assetId)!;
    expect(record.approvalStatus).toBe('approved');
    expect(record.role).toBe('production');
    expect(shotBindings[shot.shotId]?.assetId).toBe(shot.assetId);
    expect(shot.runtimeBound).toBe(true);
    expect(registry.get(shot.shotId)?.runtimeBound).toBe(true);
    const bytes = readFileSync(record.file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
    expect(bytes.equals(readFileSync(record.file.replace('art/production/', 'public/art/')))).toBe(
      true,
    );
  }
  const boundIds = Object.keys(shotBindings).filter((id) => id.startsWith('c05.')).sort();
  expect(production.productionShots.map((s) => s.shotId).sort()).toEqual(boundIds);
  expect(boundIds).toHaveLength(12);
  expect(shotBindings['c05.s03.shot01']).toBeUndefined();
  expect(production.productionShots.filter((shot) => shot.variantOf === 'c05.s03.shot01')).toHaveLength(5);
  expect(coverage.summary.runtimeBoundShots).toBe(boundIds.length);
  const approvedFamilies = new Set(production.productionShots.map((shot) => shot.variantOf ?? shot.shotId));
  expect(coverage.summary.productionShotIdsWithAtLeastOneApprovedVariant).toBe(approvedFamilies.size);
  expect(coverage.summary.productionIndexCoveragePercent).toBe(
    (approvedFamilies.size / coverage.summary.rasterOrArtifactBeatIds) * 100,
  );
  // Authored binding is not proof of reachability; home is still guard-blocked.
  expect(coverage.currentRuntimeStatus.unreachableShotIds).toEqual(['c05.s01.shot01']);
  expect(coverage.currentRuntimeStatus.reachableDistinctAssets).toBe(11);
  expect(registry.get('c05.s06.shot14-wait')?.status).toBe('REUSE');
  expect(registry.get('c05.s07.shot03-arrival')?.status).toBe('PRODUCTION');
});
it('current authority does not promote rejected/candidate art or expand bounded references', () => {
  const aster = authority.assets.find((a) => a.assetId === 'C5-WAVE-A-ASTER-ARRIVAL-COMPOSITE-V1')!;
  expect(aster.status).toBe('REVISE');
  expect(aster.role).toBe('staging');
  const wardrobe = authority.assets.find(
    (a) => a.assetId === 'C5-PILOT-02-professional-master-fresh-v4',
  )!;
  expect(wardrobe.role).toBe('wardrobe-reference');
  expect(wardrobe.scope).toContain('NONCANONICAL');
  for (const item of authority.assets.filter((a) => a.assetId.startsWith('eve-c3-')))
    expect(item.role).not.toBe('production');
  for (const item of authority.assets)
    if (item.file?.startsWith('art/') && item.sha256) {
      expect(createHash('sha256').update(readFileSync(item.file)).digest('hex'), item.assetId).toBe(
        item.sha256,
      );
    }
});
