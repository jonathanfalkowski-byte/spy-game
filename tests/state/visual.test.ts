import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { expect, it } from 'vitest';
import { VisualAssetSpecSchema, VisualAssetRecordSchema } from '../../src/visual/schema';
import { visualCatalog, canonicalReference, validateVisualCatalog } from '../../src/visual/catalog';
import { initialState, reducer } from '../../src/state/reducer';
import { encodeSave } from '../../src/persistence/saves';

const minimal = { assetId: 'candidate', assetType: 'background', styleBibleVersion: '1.0' } as const;

it('validates minimal and detailed production specs without fabricating optional information', () => {
  const spec = VisualAssetSpecSchema.parse(minimal);
  expect(spec).toEqual(minimal);
  expect(spec).not.toHaveProperty('subjects');
  expect(
    VisualAssetSpecSchema.parse({
      ...minimal,
      subjects: [{ characterId: 'player-character', identityId: 'evelyn' }],
      presentationVariant: 'restrained',
    }).subjects,
  ).toEqual([{ characterId: 'player-character', identityId: 'evelyn' }]);
  for (const extra of [
    { subjects: [{ characterId: 'evelyn' }] },
    { subjects: [{ characterId: 'player-character', identityId: 'invented' }] },
    { dimensions: { width: 0, height: 100 } },
    { styleBibleVersion: '' },
    { consent: true },
    { sceneId: 'invented' },
  ])
    expect(VisualAssetSpecSchema.safeParse({ ...minimal, ...extra }).success).toBe(false);
});

it('keeps staging/rejected/production assets distinct from approved canonical references', () => {
  const staging = VisualAssetRecordSchema.parse({
    spec: minimal,
    role: 'staging',
    approvalStatus: 'pending',
  });
  expect(() => canonicalReference('candidate', [staging])).toThrow('not an approved');
  expect(
    VisualAssetRecordSchema.safeParse({
      ...staging,
      role: 'canonical-reference',
      approvalStatus: 'approved',
    }).success,
  ).toBe(false);
  expect(
    VisualAssetRecordSchema.safeParse({ ...staging, approvalStatus: 'approved' }).success,
  ).toBe(false);
  const reference = canonicalReference('evelynn-helix-gala-v1');
  expect(() =>
    canonicalReference(reference.spec.assetId, [{ ...reference, role: 'production' }]),
  ).toThrow('not an approved');
  expect(
    VisualAssetRecordSchema.safeParse({
      spec: minimal,
      role: 'rejected',
      approvalStatus: 'rejected',
    }).success,
  ).toBe(true);
});

it('rejects path traversal and invalid canonical reference links', () => {
  const reference = canonicalReference('evelynn-helix-gala-v1');
  for (const file of [
    '../secret.png',
    'art/../secret.png',
    'C:/secret.png',
    'https://example.com/image.png',
    'art/%2e%2e/image.png',
  ])
    expect(VisualAssetRecordSchema.safeParse({ ...reference, file }).success).toBe(false);
  expect(() => validateVisualCatalog([reference, reference])).toThrow('Duplicate');
  expect(() =>
    validateVisualCatalog([
      {
        spec: { ...minimal, canonicalReferences: ['missing'] },
        role: 'staging',
        approvalStatus: 'pending',
      },
    ]),
  ).toThrow('Missing');
});

it('preserves the exact approved image, its measured dimensions, and separate identity references', () => {
  validateVisualCatalog();
  const record = visualCatalog[0];
  const bytes = readFileSync(new URL('../../' + record.file, import.meta.url));
  expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256!.toLowerCase());
  expect(record.spec.dimensions).toEqual({
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  });
  expect(record.spec.subjects).toEqual([{ characterId: 'player-character', identityId: 'evelyn' }]);
  expect(record.spec).not.toHaveProperty('identityAcceptance');
});

it('treats visual variants as metadata, never executable game actions or save state', () => {
  const state = initialState(),
    before = encodeSave(state);
  for (const presentationVariant of ['restrained', 'alternate']) {
    const spec = VisualAssetSpecSchema.parse({ ...minimal, presentationVariant });
    expect(reducer(state, spec)).toBe(state);
    expect(encodeSave(state)).toBe(before);
  }
  // The future production pipeline has no imports of mutable state or network APIs.
  for (const file of ['schema.ts', 'catalog.ts']) {
    const source = readFileSync(new URL('../../src/visual/' + file, import.meta.url), 'utf8');
    expect(source).not.toMatch(/from ['"].*state\/|fetch\(|localStorage|ComfyUIProvider/);
  }
});
