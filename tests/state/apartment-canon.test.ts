import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { expect, it } from 'vitest';
import records from '../../art/staging/apartment/records.json';
import inspection from '../../art/staging/apartment/inspection.json';
import plan from '../../tools/visual/zencreator/apartment-plan.json';
import { VisualAssetRecordSchema } from '../../src/visual/schema';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';

it('keeps stable apartment specs and real candidates pending without approval', () => {
  expect(records.map(r => r.spec.assetId)).toEqual(expect.arrayContaining([
    'apartment-layout-canon-v1', 'apartment-anchor-entry-v1', 'apartment-anchor-mirror-v1',
    'apartment-anchor-couch-v1', 'apartment-anchor-transition-v1', 'apartment-day-v1',
    'apartment-evening-v1', 'apartment-night-v1', 'apartment-post-clinic-v1',
    'apartment-post-glasshouse-v1',
  ]));
  validateVisualCatalog();
  for (const raw of records) {
    const r = VisualAssetRecordSchema.parse(raw);
    expect(r.role).toBe('staging'); expect(r.approvalStatus).toBe('pending');
    expect(r.approval).toBeUndefined();
    if (r.generation) {
      const bytes = readFileSync(r.file!);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(r.sha256);
      expect(r.generation.outputDimensions).toEqual({width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)});
      expect(['PASS','REVISE','REJECT']).toContain(r.review?.decision);
    } else {
      expect(r.file).toBeUndefined(); expect(r.sha256).toBeUndefined();
    }
    expect(r.spec.locationId).toBe('apartment');
    expect(r.spec.dimensions).toEqual({width:1920,height:1080});
    expect(() => canonicalReference(r.spec.assetId)).toThrow('not an approved');
    expect(visualCatalog.filter(c => c.spec.assetId === r.spec.assetId)).toHaveLength(1);
  }
});

it('preserves the historical apartment source inventory without approving old PASS reviews', () => {
  const existing = visualCatalog.filter(r => !r.spec.assetId.startsWith('apartment-') &&
    // This proposal snapshot predates the separately tested shot-specific Chapter 5 promotion.
    !r.file?.startsWith('art/production/chapter5/') &&
    !r.file?.startsWith('art/production/opening/') &&
    (r.spec.locationId?.includes('apartment') || r.spec.environment?.includes('apartment')));
  expect(inspection.assets.map(a => a.assetId).sort()).toEqual(existing.map(a => a.spec.assetId).sort());
  expect(inspection.assets).toHaveLength(12);
  expect(inspection.approvedWholeLayout).toBeNull();
  for (const asset of inspection.assets) {
    expect(createHash('sha256').update(readFileSync(asset.file)).digest('hex')).toBe(asset.sha256);
    const original = visualCatalog.find(r => r.spec.assetId === asset.assetId)!;
    expect(original.role).toBe('staging'); expect(original.approval).toBeUndefined();
    expect(original.review).toEqual(asset.historicalReview);
    expect(asset.apartmentReview.reasons.length).toBeGreaterThan(0);
  }
});

it('records generation and the owner acceptance that superseded the background hold', () => {
  expect(plan.status).toBe('outfit-images-generated-awaiting-review'); expect(plan.submitted).toBe(true);
  expect(plan.actualCreditsSpent).toBe(9);
  expect(plan.outfitGenerationSubmitted).toBe(true);
  expect(plan.backgroundOwnerAcceptance.assetId).toBe('apartment-evening-v1');
  expect(plan.completedOutputCount).toBe(records.filter(r => 'generation' in r).length);
  const source = inspection.assets.find(a => a.assetId === plan.sourceAssetId)!;
  expect(plan.sourceSha256).toBe(source.sha256);
  expect(plan.firstRequest.params.image_assets).toEqual([source.providerAssetId]);
  expect(plan.firstRequest.outputAssetId).toBe('apartment-layout-canon-v1');
  expect(plan.firstRequest.tool_name).toBe('image_editor');
  expect(plan.firstRequest.params).toMatchObject({model:'SEEDREAM_5',ratio:'16:9',width:1920,height:1080,number_of_images:1,batch_mode:false,sequential_generation:false,rewrite_prompt:false});
  expect(plan.firstRequest.params.prompt).toContain('two-column window');
  expect(plan.firstRequest.params.prompt).toContain('No duplicate jacket');
  expect(plan.sequence).toHaveLength(3); expect(plan.conditionalReuse).toHaveLength(2);
  for (const entry of [...plan.sequence, ...plan.conditionalReuse]) expect(records.some(r=>r.spec.assetId===entry.assetId)).toBe(true);
});

it('stores three generated wardrobe branches for each home beat with real provenance', () => {
  for (const sceneId of ['mission.homeContact', 'chapter3.home']) {
    const variants = records.map(r => VisualAssetRecordSchema.parse(r)).filter(r => r.spec.sceneId === sceneId);
    expect(variants.map(r => r.spec.wardrobeId).sort()).toEqual(['executive','shadow','socialite']);
    expect(new Set(variants.map(r => r.spec.cameraFraming)).size).toBe(1);
    for (const r of variants) {
      expect(r.spec.subjects).toEqual([{characterId:'player-character',identityId:'evelyn'}]);
      expect(r.file).toBe(`art/staging/apartment/${r.spec.assetId}.png`);
      expect(r.generation?.sourceReferences.map(s=>s.assetId)).toEqual(['apartment-evening-v1','evelynn-canon-three-quarter-v1']);
      expect(r.generation?.providerAssetId).toBeTruthy();
      expect(r.spec.canonicalReferences).toEqual(['evelynn-canon-three-quarter-v1']);
    }
  }
});

it('keeps the package and provider tooling outside runtime imports', () => {
  function visit(dir: URL) {
    for (const entry of readdirSync(dir, {withFileTypes:true})) {
      if (entry.name === 'visual') continue;
      const file = new URL(entry.name + (entry.isDirectory()?'/':''),dir);
      if(entry.isDirectory()) visit(file);
      else if(/\.[jt]sx?$/.test(entry.name)) expect(readFileSync(file,'utf8')).not.toMatch(/(?:from\s*|import\s*\()['"][^'"]*(?:art\/staging\/apartment|zencreator|visual\/catalog)/);
    }
  }
  visit(new URL('../../src/',import.meta.url));
});
