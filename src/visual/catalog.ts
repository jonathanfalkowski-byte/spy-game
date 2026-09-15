// Human-maintained production catalog, not a runtime manifest or approval service.
import { VisualAssetRecordSchema, type VisualAssetRecord } from './schema';

export const visualCatalog = VisualAssetRecordSchema.array().parse([
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
  return validated;
}
