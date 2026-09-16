// Human-maintained production catalog, not a runtime manifest or approval service.
import { VisualAssetRecordSchema, type VisualAssetRecord } from './schema';
import stagingRecords from '../../art/staging/evelynn/records.json';
import approvedPortraits from '../../art/reference/evelynn/approved-portraits.json';
import castSceneRecords from '../../art/staging/cast-scenes/records.json';
import correctionCandidates from '../../art/staging/cast-scenes/continuity-records.json';
import approvedCorrections from '../../art/production/continuity/records.json';

export const visualCatalog = VisualAssetRecordSchema.array().parse([
  // Generator receipts are always pending; human approval is a separate catalog edit.
  {
    spec: {
      assetId: 'evelynn-helix-gala-v1',
      assetType: 'scene-cg',
      styleBibleVersion: '1.0',
      subjects: [{ characterId: 'player-character', identityId: 'evelyn' }],
      intendedUse: 'Approved Evelynn Vale gala visual reference; not a runtime scene asset',
      dimensions: { width: 1122, height: 1402 },
    },
    role: 'canonical-reference',
    approvalStatus: 'approved',
    file: 'art/reference/evelynn/evelynn-helix-gala-v1.png',
    sha256: 'F4A6465602F1A9F77097322D4E2DBDB44CE71026B074D3ED38952B78013A2228',
    approval: {
      reviewer: 'Project owner',
      date: '2026-09-15',
      source:
        'Owner explicitly approved and supplied the Evelynn Helix gala illustration with Art Bible v1.0',
    },
  },
  ...approvedPortraits.map((record) => {
    const portrait = VisualAssetRecordSchema.parse(record);
    if (portrait.role !== 'canonical-reference' || portrait.approvalStatus !== 'approved')
      throw Error('Approved portrait records require explicit canonical approval');
    return portrait;
  }),
  ...approvedCorrections.map((record) => {
    const asset = VisualAssetRecordSchema.parse(record);
    if (asset.role !== 'production' || asset.approvalStatus !== 'approved' || asset.review?.decision !== 'PASS')
      throw Error('Production corrections require explicit passing review and owner authorization');
    return asset;
  }),
  ...[...stagingRecords, ...castSceneRecords, ...correctionCandidates].map((record) => {
    const candidate = VisualAssetRecordSchema.parse(record);
    if (candidate.role !== 'staging' || candidate.approvalStatus !== 'pending')
      throw Error('Staging receipts cannot approve or promote artwork');
    return candidate;
  }),
]);

export function canonicalReference(
  assetId: string,
  catalog: readonly VisualAssetRecord[] = visualCatalog,
) {
  const matches = catalog.filter((asset) => asset.spec.assetId === assetId);
  if (matches.length !== 1) throw Error('Missing or duplicate visual reference');
  const asset = VisualAssetRecordSchema.parse(matches[0]);
  if (asset.role !== 'canonical-reference')
    throw Error('Asset is not an approved canonical reference');
  return asset;
}

export function validateVisualCatalog(catalog: readonly VisualAssetRecord[] = visualCatalog) {
  const validated = VisualAssetRecordSchema.array().parse(catalog);
  if (new Set(validated.map((asset) => asset.spec.assetId)).size !== validated.length)
    throw Error('Duplicate visual asset ID');
  for (const asset of validated)
    for (const reference of asset.spec.canonicalReferences ?? []) {
      if (reference === asset.spec.assetId) throw Error('Asset cannot reference itself');
      canonicalReference(reference, validated);
    }
  const byId = new Map(validated.map((asset) => [asset.spec.assetId, asset]));
  const visiting = new Set<string>(),
    visited = new Set<string>();
  function visit(assetId: string) {
    if (visiting.has(assetId)) throw Error('Cyclic staging references');
    if (visited.has(assetId)) return;
    visiting.add(assetId);
    const asset = byId.get(assetId)!;
    for (const source of asset.spec.editSources ?? []) {
      if (!byId.has(source)) throw Error('Missing correction source');
      visit(source);
    }
    for (const reference of asset.spec.stagingReferences ?? []) {
      const source = byId.get(reference);
      if (
        !source ||
        source.role !== 'staging' ||
        source.approvalStatus !== 'pending' ||
        source.review?.decision !== 'PASS'
      )
        throw Error('Provisional reference must be a reviewed passing staging candidate');
      visit(reference);
    }
    visiting.delete(assetId);
    visited.add(assetId);
  }
  for (const asset of validated) visit(asset.spec.assetId);
  return validated;
}
