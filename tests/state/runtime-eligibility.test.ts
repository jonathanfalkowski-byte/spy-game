import { expect, it } from 'vitest';
import apartment from '../../art/production/apartment/records.json';
import continuity from '../../art/production/continuity/records.json';
import chapter5 from '../../art/production/chapter5/records.json';
import opening from '../../art/production/opening/records.json';
import manifest from '../../src/ui/approved-scene-art.json';
import { VisualAssetRecordSchema } from '../../src/visual/schema';
import {
  assertValidRuntimeEligibility,
  isRuntimeApprovedProductionRecord,
} from '../../scripts/runtime-eligibility.mjs';

const records = [...apartment, ...continuity, ...chapter5, ...opening];
const m5 = opening.find((record) => record.spec.assetId === 'axiom-opening-office-master-v1-production')!;

it('requires every production record to declare runtime eligibility', () => {
  for (const record of records) {
    expect(VisualAssetRecordSchema.parse(record).runtimeEligibility).toBeDefined();
    expect(() => assertValidRuntimeEligibility(record)).not.toThrow();
  }
  const validProduction = {
    spec: { assetId: 'runtime-boundary-test', assetType: 'background', styleBibleVersion: '1.0' },
    role: 'production' as const,
    approvalStatus: 'approved' as const,
    file: 'art/production/test.png',
    sha256: 'a'.repeat(64),
    review: { decision: 'PASS' as const, reviewer: 'QA', date: '2026-09-21', reasons: ['Pass'] },
    approval: { reviewer: 'Owner', source: 'Test approval', date: '2026-09-21' },
  };
  expect(VisualAssetRecordSchema.safeParse(validProduction).success).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({ ...validProduction, runtimeEligibility: 'runtime-approved' })
      .success,
  ).toBe(true);
  expect(
    VisualAssetRecordSchema.safeParse({ ...validProduction, runtimeEligibility: 'component-only' })
      .success,
  ).toBe(true);
  const bounded = {
    ...validProduction,
    runtimeEligibility: 'runtime-approved',
    review: { ...validProduction.review, limitations: ['Medium frame only'] },
  };
  expect(VisualAssetRecordSchema.parse(bounded).review?.limitations).toEqual(['Medium frame only']);
  expect(VisualAssetRecordSchema.safeParse({
    ...bounded,
    review: { ...bounded.review, limitations: [true] },
  }).success).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({
      ...validProduction,
      runtimeEligibility: 'runtime-approved',
      review: { ...validProduction.review, decision: 'REVISE' },
    }).success,
  ).toBe(false);
});

it('keeps M5 as a passing production component outside the runtime manifest', () => {
  const parsed = VisualAssetRecordSchema.parse(m5);
  expect(parsed.role).toBe('production');
  expect(parsed.approvalStatus).toBe('approved');
  expect(parsed.runtimeEligibility).toBe('component-only');
  expect(parsed.spec.sceneId).toBeUndefined();
  expect(isRuntimeApprovedProductionRecord(parsed)).toBe(false);
  expect(manifest.map((asset) => asset.id)).not.toContain(parsed.spec.assetId);
});

it('admits only explicitly runtime-approved records to the current runtime manifest', () => {
  const eligible = records.filter(isRuntimeApprovedProductionRecord);
  expect(eligible).toHaveLength(109);
  expect(eligible.map((record) => record.spec.assetId)).toEqual(manifest.map((asset) => asset.id));
  const revise = apartment.find(
    (record) => record.spec.assetId === 'apartment-pre-glasshouse-executive-v1-production',
  )!;
  expect(revise.review.decision).toBe('REVISE');
  expect(revise.runtimeEligibility).toBe('not-runtime');
  expect(isRuntimeApprovedProductionRecord(revise)).toBe(false);
});
