import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { expect, it } from 'vitest';
import { evelynnSpecs } from '../../src/visual/evelynn-specs';
import { VisualAssetRecordSchema } from '../../src/visual/schema';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';
import { buildRequest, stageCandidate } from '../../tools/visual/zencreator/provider.mjs';

const uuid = '3cefac6d-fb4f-47a4-a2d8-d0a43f9971b6';
const receipt = {
  taskId: uuid,
  callId: uuid,
  providerAssetId: uuid,
  mediaType: 'image/png',
  sha256: 'a'.repeat(64),
  createdAt: '2026-09-16T17:00:00Z',
  estimatedCredits: 1,
  outputDimensions: { width: 1536, height: 2048 },
};

it('resolves only the two explicitly approved new portraits as canonical references', () => {
  for (const assetId of ['evelynn-canon-front-v1', 'evelynn-canon-three-quarter-v1']) {
    const record = canonicalReference(assetId);
    expect(record.approvalStatus).toBe('approved');
    expect(record.approval?.reviewer).toBe('Project owner');
    expect(record.approval?.date).toBe('2026-09-16');
    expect(record.file).toBe('art/reference/evelynn/' + assetId + '.png');
  }
  for (const assetId of ['evelynn-canon-profile-v1', 'evelynn-canon-fullbody-v1']) {
    expect(() => canonicalReference(assetId)).toThrow('not an approved');
    const record = visualCatalog.find((asset) => asset.spec.assetId === assetId)!;
    expect(record.role).toBe('staging');
    expect(record.approvalStatus).toBe('pending');
    expect(record.approval).toBeUndefined();
  }
});

it('validates nine specs but only permits the first four requests with declared person and source', () => {
  expect(evelynnSpecs).toHaveLength(9);
  expect(new Set(evelynnSpecs.map((s) => s.assetId)).size).toBe(9);
  for (const spec of evelynnSpecs.slice(0, 4)) {
    const request = buildRequest(spec, uuid);
    expect(request.inputs.image_assets).toEqual([uuid]);
    expect(request.inputs.model).toBe('SEEDREAM_5');
    expect(request.settings.height).toBe(spec.dimensions!.height);
    expect(canonicalReference(spec.canonicalReferences![0]).approvalStatus).toBe('approved');
  }
  for (const spec of evelynnSpecs.slice(4)) expect(() => buildRequest(spec, uuid)).toThrow('Only');
  expect(() => buildRequest(evelynnSpecs[0], '../secret')).toThrow();
  expect(() =>
    buildRequest({ ...evelynnSpecs[0], subjects: [{ characterId: 'maya' }] }, uuid),
  ).toThrow();
});

it('ingests only staging records and separates a PASS recommendation from approval', () => {
  const spec = evelynnSpecs[0],
    request = buildRequest(spec, uuid);
  const candidate = VisualAssetRecordSchema.parse(stageCandidate(spec, request, receipt));
  expect(candidate.role).toBe('staging');
  expect(candidate.approvalStatus).toBe('pending');
  const reviewed = VisualAssetRecordSchema.parse({
    ...candidate,
    review: {
      decision: 'PASS',
      reviewer: 'Visual QA',
      date: '2026-09-16',
      reasons: ['Eligible for human review only'],
    },
  });
  expect(() => canonicalReference(spec.assetId, [reviewed])).toThrow('not an approved');
  expect(
    VisualAssetRecordSchema.safeParse({
      ...reviewed,
      role: 'canonical-reference',
      approvalStatus: 'approved',
    }).success,
  ).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({ ...candidate, file: 'art/reference/stolen.png' }).success,
  ).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({
      ...candidate,
      generation: { ...candidate.generation, taskId: 'unstable' },
    }).success,
  ).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({
      ...candidate,
      generation: {
        ...candidate.generation,
        sourceReferences: [{ assetId: 'unapproved', providerAssetId: uuid }],
      },
    }).success,
  ).toBe(false);
  expect(() =>
    stageCandidate(
      spec,
      { ...request, inputs: { ...request.inputs, prompt: 'tampered' } },
      receipt,
    ),
  ).toThrow('does not match');
});

it('checks every downloaded original against its catalog hash and exact request provenance', () => {
  validateVisualCatalog();
  for (const record of visualCatalog.filter(
    (r) => r.generation?.promptVersion === 'eve-evelynn-v1',
  )) {
    const bytes = readFileSync(new URL('../../' + record.file, import.meta.url));
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256!.toLowerCase());
    const spec = evelynnSpecs.find((s) => s.assetId === record.spec.assetId)!;
    const request = buildRequest(spec, record.generation!.sourceReferences[0].providerAssetId);
    expect(record.generation!.prompt).toBe(request.inputs.prompt);
    expect(record.generation!.settings).toEqual(request.settings);
    expect(record.generation!.promptComponents).toEqual(request.components);
  }
});

it('keeps visual production unreachable from runtime source imports', () => {
  const root = new URL('../../src/', import.meta.url);
  function visit(dir: URL) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'visual') continue;
      const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) visit(file);
      else if (/\.[cm]?[jt]sx?$/.test(entry.name))
        expect(readFileSync(file, 'utf8')).not.toMatch(
          /(?:from\s*|import\s*\()['"][^'"]*(?:\/visual\/|zencreator)/i,
        );
    }
  }
  visit(root);
});
