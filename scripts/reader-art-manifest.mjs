// Offline only: never bundle generation receipts or staging catalogs into the reader.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
import {
  assertValidRuntimeEligibility,
  isRuntimeApprovedProductionRecord,
} from './runtime-eligibility.mjs';
const records = ['apartment', 'continuity', 'chapter5', 'opening', 'gap-scenes'].flatMap((group) =>
  JSON.parse(readFileSync(`art/production/${group}/records.json`, 'utf8')),
);
for (const record of records) assertValidRuntimeEligibility(record);
const assets = records
  .filter(isRuntimeApprovedProductionRecord)
  .map((r) => {
    if (!r.file.startsWith('art/production/') || r.file.includes('..'))
      throw Error('Unsafe asset path');
    const bytes = readFileSync(r.file);
    if (createHash('sha256').update(bytes).digest('hex') !== r.sha256.toLowerCase())
      throw Error(`Hash mismatch: ${r.spec.assetId}`);
    const src = r.file.replace('art/production/', 'art/');
    if (!process.argv.includes('--check')) {
      mkdirSync(dirname(`public/${src}`), { recursive: true });
      copyFileSync(r.file, `public/${src}`);
    }
    return {
      id: r.spec.assetId,
      src,
      location: r.spec.locationId,
      width: r.spec.dimensions.width,
      height: r.spec.dimensions.height,
      sha256: r.sha256,
    };
  });
const output = JSON.stringify(assets, null, 2) + '\n';
const target = 'src/ui/approved-scene-art.json';
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output)
    throw Error('Reader manifest differs from approved PASS production records');
  for (const r of assets)
    if (
      createHash('sha256')
        .update(readFileSync(`public/${r.src}`))
        .digest('hex') !== r.sha256.toLowerCase()
    )
      throw Error(`Public asset mismatch: ${r.id}`);
} else writeFileSync(target, output);
console.log(
  `${assets.length} approved PASS records; ${records.length - assets.length} conflicting/nonpassing records excluded.`,
);
