import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import plan from '../../tools/visual/zencreator/cast-scenes-plan.json';
import { VisualAssetSpecSchema, VisualAssetRecordSchema } from '../../src/visual/schema';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';
import openingProduction from '../../art/production/opening/records.json';
import productionManifest from '../../src/ui/approved-scene-art.json';
import { isRuntimeApprovedProductionRecord } from '../../scripts/runtime-eligibility.mjs';
import {
  buildPackRequest,
  buildTextCastRequest,
  stagePackCandidate,
  type PackEntry,
} from '../../tools/visual/zencreator/pack.mjs';
const uuid = '3cefac6d-fb4f-47a4-a2d8-d0a43f9971b6';
it('keeps imported opening provenance sources pending and outside runtime authority', () => {
  for (const id of ['axiom-security-lobby-v1', 'axiom-approach-v1-provider-original', 'axiom-office-clean-structural-conditioning-plate']) {
    const source = visualCatalog.find((record) => record.spec.assetId === id)!;
    expect(source.role).toBe('staging');
    expect(source.approvalStatus).toBe('pending');
    expect(source.approval).toBeUndefined();
    expect(source.runtimeEligibility).toBeUndefined();
    expect(isRuntimeApprovedProductionRecord(source)).toBe(false);
    expect(() => canonicalReference(id)).toThrow();
    expect(createHash('sha256').update(readFileSync(source.file!)).digest('hex')).toBe(source.sha256);
  }
});
const entries = plan.map((e) => ({
  ...e,
  spec: VisualAssetSpecSchema.parse(e.spec),
})) as PackEntry[];
// The shared prompt-version label also appears on two standalone Adrian jobs.
// Preserve their actual custom receipts; they were never cast-pack plan entries.
const standaloneReceiptHashes: Record<string, string> = {
  'adrian-opening-full-body-v1': '60d3e2cee68b183b213f156d9910c9b092dc25045bb6c0161345d05f5122a595',
  'adrian-opening-full-body-v2-outpaint': '666216a1789de3a5a03748f3a60e513b1b7bfb36b6631f000b9f63d2581bae4a',
};
const adrianReceipts: Array<{ spec: { assetId: string }; generation: unknown }> = JSON.parse(
  readFileSync(new URL('../../art/staging/adrian/records.json', import.meta.url), 'utf8'),
);

it('models M5 as an approved production component rather than runtime scene art', () => {
  const m5 = openingProduction.find(
    (record) => record.spec.assetId === 'axiom-opening-office-master-v1-production',
  )!;
  const parsed = VisualAssetRecordSchema.parse(m5);
  expect(parsed.role).toBe('production');
  expect(parsed.approvalStatus).toBe('approved');
  expect(parsed.runtimeEligibility).toBe('component-only');
  expect(isRuntimeApprovedProductionRecord(parsed)).toBe(false);
  expect(productionManifest.map((asset) => asset.id)).not.toContain(parsed.spec.assetId);
  expect(visualCatalog.find((asset) => asset.spec.assetId === parsed.spec.assetId)).toEqual(parsed);
});

it('validates scoped cast, locations and scene specs without registering proposed story IDs', () => {
  expect(entries).toHaveLength(65);
  expect(new Set(entries.map((e) => e.spec.assetId)).size).toBe(65);
  for (const entry of entries) {
    if (entry.concept) expect(entry.spec.sceneId).toBeUndefined();
    for (const id of entry.spec.stagingReferences ?? [])
      expect(entries.some((source) => source.spec.assetId === id)).toBe(true);
  }
  expect(entries.find((e) => e.key === 'cast-executive')!.spec.subjects).toBeUndefined();
  const wardrobe = entries.filter((e) => e.key.startsWith('scene-wardrobe'));
  expect(wardrobe.map((e) => e.spec.presentationVariant).sort()).toEqual([
    'executive',
    'shadow',
    'socialite',
  ]);
  for (const entry of wardrobe) {
    expect(entry.spec.sceneId).toBe('clinic.wardrobe');
    expect(entry.guard).toContain('outfitDraft ' + entry.spec.presentationVariant);
  }
});

it('builds ordered provisional references and hardcodes staging rather than trusting provider authority', () => {
  const entry = entries.find((e) => e.key === 'scene-marcus')!;
  const references = entry.references.map((r) => ({ assetId: r.assetId, providerAssetId: uuid }));
  const request = buildPackRequest(entry, references);
  expect(request.settings).toMatchObject({ width: 1920, height: 1080, ratio: '16:9' });
  const record = VisualAssetRecordSchema.parse(
    stagePackCandidate(entry, request, {
      taskId: uuid,
      callId: uuid,
      providerAssetId: uuid,
      mediaType: 'image/png',
      sha256: 'a'.repeat(64),
      createdAt: '2026-09-16T00:00:00Z',
      estimatedCredits: 1,
      outputDimensions: { width: 1920, height: 1080 },
    }),
  );
  expect(record.role).toBe('staging');
  expect(record.approvalStatus).toBe('pending');
  expect(() => canonicalReference(entry.spec.assetId, [record])).toThrow();
  expect(() => buildPackRequest(entry, [...references].reverse())).toThrow('order');
  expect(() => buildPackRequest(entry, references.slice(1))).toThrow('Incomplete');
});

it('rejects missing, rejected and cyclic provisional references', () => {
  const base = { assetType: 'background' as const, styleBibleVersion: '1.0' };
  const source = {
    spec: { ...base, assetId: 'draft' },
    role: 'staging' as const,
    approvalStatus: 'pending' as const,
    review: {
      decision: 'PASS' as const,
      reviewer: 'QA',
      date: '2026-09-16',
      reasons: ['Usable provisional reference'],
    },
  };
  const dependent = {
    spec: { ...base, assetId: 'scene', stagingReferences: ['draft'] },
    role: 'staging' as const,
    approvalStatus: 'pending' as const,
  };
  expect(() => validateVisualCatalog([dependent])).toThrow('Provisional');
  expect(() =>
    validateVisualCatalog([
      { ...source, review: { ...source.review, decision: 'REJECT' } },
      dependent,
    ]),
  ).toThrow('Provisional');
  expect(() => validateVisualCatalog([source, dependent])).not.toThrow();
  expect(() =>
    validateVisualCatalog([{ ...source, spec: { ...source.spec, stagingReferences: ['draft'] } }]),
  ).toThrow('Cyclic');
});

it('checks staged pack provenance and original file hashes without promoting reusable candidates', () => {
  validateVisualCatalog();
  for (const record of visualCatalog.filter(
    (r) => r.generation?.promptVersion === 'eve-cast-scenes-v1',
  )) {
    const entry = entries.find((e) => e.spec.assetId === record.spec.assetId);
    if (entry) {
      const request =
        record.generation!.tool === 'by_prompt'
          ? buildTextCastRequest(entry)
          : buildPackRequest(entry, record.generation!.sourceReferences);
      expect(request.inputs.prompt ?? request.inputs.positive_prompt).toBe(record.generation!.prompt);
      expect(request.settings).toEqual(record.generation!.settings);
    } else {
      // Unknown jobs still fail; no blanket exemption by directory or tool.
      expect(standaloneReceiptHashes[record.spec.assetId], record.spec.assetId).toBeDefined();
      expect(record.generation!.tool).toBe('image_editor');
      const original = adrianReceipts.find((r) => r.spec.assetId === record.spec.assetId)!;
      expect(original).toBeDefined();
      expect(VisualAssetRecordSchema.parse(original)).toEqual(record);
      // Hash the preserved raw receipt, before schema parsing reorders its keys.
      expect(createHash('sha256').update(JSON.stringify(original.generation)).digest('hex')).toBe(
        standaloneReceiptHashes[record.spec.assetId],
      );
    }
    expect(
      createHash('sha256')
        .update(readFileSync(new URL('../../' + record.file, import.meta.url)))
        .digest('hex'),
    ).toBe(record.sha256!.toLowerCase());
    expect(record.role).toBe('staging');
    expect(record.approval).toBeUndefined();
  }
  const receipts = visualCatalog.filter((r) => r.generation?.promptVersion === 'eve-cast-scenes-v1');
  expect(receipts.map((r) => r.spec.assetId).sort()).toEqual(
    [...entries.map((e) => e.spec.assetId), ...Object.keys(standaloneReceiptHashes)].sort(),
  );
});
