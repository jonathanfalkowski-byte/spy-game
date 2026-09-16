import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import plan from '../../tools/visual/zencreator/cast-scenes-plan.json';
import { VisualAssetSpecSchema, VisualAssetRecordSchema } from '../../src/visual/schema';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';
import {
  buildPackRequest,
  buildTextCastRequest,
  stagePackCandidate,
  type PackEntry,
} from '../../tools/visual/zencreator/pack.mjs';
const uuid = '3cefac6d-fb4f-47a4-a2d8-d0a43f9971b6';
const entries = plan.map((e) => ({
  ...e,
  spec: VisualAssetSpecSchema.parse(e.spec),
})) as PackEntry[];

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
    const entry = entries.find((e) => e.spec.assetId === record.spec.assetId)!;
    expect(entry).toBeDefined();
    const request =
      record.generation!.tool === 'by_prompt'
        ? buildTextCastRequest(entry)
        : buildPackRequest(entry, record.generation!.sourceReferences);
    expect(request.inputs.prompt ?? request.inputs.positive_prompt).toBe(record.generation!.prompt);
    expect(request.settings).toEqual(record.generation!.settings);
    expect(
      createHash('sha256')
        .update(readFileSync(new URL('../../' + record.file, import.meta.url)))
        .digest('hex'),
    ).toBe(record.sha256!.toLowerCase());
    expect(record.role).toBe('staging');
    expect(record.approval).toBeUndefined();
  }
});
