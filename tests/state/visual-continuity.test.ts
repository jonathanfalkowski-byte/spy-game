import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { it, expect } from 'vitest';
import proposal from '../../art/staging/cast-scenes/continuity-proposed-batch.json';
import receipt from '../../art/staging/cast-scenes/continuity-batch-receipt.json';
import originals from '../../art/staging/cast-scenes/continuity-reviewed-originals.json';
import { canonicalReference, validateVisualCatalog, visualCatalog } from '../../src/visual/catalog';

it('executes exactly the four quoted inputs at the quoted total with one output each', () => {
  expect(receipt.task.inputs).toEqual(proposal.jobs.map((j) => j.params));
  expect(receipt.task.status).toBe('completed');
  expect(receipt.task.total).toBe(4);
  expect(receipt.task.done).toBe(4);
  expect(receipt.quotes.map((q) => q.price)).toEqual([1, 1, 1, 1]);
  expect(originals).toHaveLength(4);
  for (const original of originals) {
    const job = proposal.jobs.find((j) => j.outputAssetId === original.spec.assetId)!;
    expect(original.generation.prompt).toBe(job.params.prompt);
    expect(original.generation.sourceReferences[0].assetId).toBe(job.sourceAssetId);
    expect(original.generation.outputDimensions).toEqual({ width: 1920, height: 1080 });
    expect(original.generation.taskId).toBe(receipt.task.id);
    const bytes = readFileSync(original.file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(original.sha256);
    expect(bytes.readUInt32BE(16)).toBe(1920);
    expect(bytes.readUInt32BE(20)).toBe(1080);
  }
});
it('promotes only the three reviewed originals, unchanged, without canonical approval', () => {
  validateVisualCatalog();
  const corrections = visualCatalog.filter(
    (r) => r.generation?.promptVersion === 'eve-continuity-v2',
  );
  expect(corrections.filter((r) => r.role === 'production')).toHaveLength(3);
  for (const record of corrections) {
    const original = originals.find((r) => r.spec.assetId === record.spec.assetId)!;
    expect(readFileSync(record.file!).equals(readFileSync(original.file))).toBe(true);
    expect(() => canonicalReference(record.spec.assetId)).toThrow('not an approved');
    if (record.spec.assetId === 'eve-scene-sloane-continuity-v2') {
      expect(record.role).toBe('staging');
      expect(record.review!.decision).toBe('REVISE');
      expect(record.approval).toBeUndefined();
    } else {
      expect(record.review!.decision).toBe('PASS');
      expect(record.approvalStatus).toBe('approved');
      expect(record.review!.reviewer).toContain('Codex');
      expect(record.approval!.reviewer).toContain('delegated');
    }
  }
});
it('rejects missing and cyclic correction sources without making them canonical', () => {
  const a = {
    spec: {
      assetId: 'a',
      assetType: 'background' as const,
      styleBibleVersion: '1.0',
      editSources: ['b'],
    },
    role: 'staging' as const,
    approvalStatus: 'pending' as const,
  };
  const b = { ...a, spec: { ...a.spec, assetId: 'b', editSources: ['a'] } };
  expect(() => validateVisualCatalog([a])).toThrow('Missing correction source');
  expect(() => validateVisualCatalog([a, b])).toThrow('Cyclic');
});
