// Offline review publication: no network, scripts in HTML, runtime edits or promotion.
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stagePackCandidate } from './pack.mjs';
const root = fileURLToPath(new URL('../../../', import.meta.url));
const dir = path.join(root, 'art/staging/cast-scenes');
const run = JSON.parse(fs.readFileSync(path.join(dir, 'generation-run.json'), 'utf8'));
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
for (const item of run.items) {
  if (!/^art\/staging\/cast-scenes\/eve-[a-z0-9-]+\.png$/.test(item.file))
    throw Error('Invalid local image path');
  const bytes = fs.readFileSync(path.join(root, item.file));
  if (createHash('sha256').update(bytes).digest('hex') !== item.receipt.sha256.toLowerCase())
    throw Error('Image hash mismatch: ' + item.file);
}
const selected = run.items.filter((x) => !x.excluded);
if (selected.length !== 65 || new Set(selected.map((x) => x.entry.spec.assetId)).size !== 65)
  throw Error('Incomplete pack');
const records = selected.map((x) => ({
  ...stagePackCandidate(x.entry, x.request, x.receipt),
  review: x.review,
}));
fs.writeFileSync(path.join(dir, 'records.json'), JSON.stringify(records, null, 2) + '\n');
const groups = [
  ['Cast designs', (x) => x.entry.kind === 'cast'],
  ['Empty locations', (x) => x.entry.kind === 'background'],
  ['Playable story keyframes', (x) => x.entry.kind === 'scene' && !x.entry.concept],
  ['Future Chapter 3 concepts', (x) => x.entry.kind === 'scene' && x.entry.concept],
  ['Archived candidates', (x) => x.excluded],
];
const groupsData = groups.map(([title, filter], i) => ({
  title,
  id: 'group-' + i,
  items: run.items.filter((x) => (i === 4 ? x.excluded : !x.excluded && filter(x))),
}));
const summary =
  '65 selected PNG images: 9 cast designs, 20 empty locations, 21 playable-story keyframes including three wardrobe choices, and 15 future Chapter 3 concepts. ' +
  run.items.filter((x) => x.excluded).length +
  ' earlier candidates retained for audit. Total task charges: ' +
  run.actualTaskCharges +
  ' ZenCreator credits.';
const status =
  'All new artwork remains staging / pending owner review. PASS is a visual QA recommendation, not canonical or production approval. Future concepts illustrate treatment proposals, not implemented story events. Coverage is a planning map, not a runtime binding.';
const card = (x) =>
  '<article><a href="' +
  escape(path.basename(x.file)) +
  '"><img loading="lazy" src="' +
  escape(path.basename(x.file)) +
  '" alt="' +
  escape(x.entry.title) +
  '"></a><div class="body"><p class="badge">' +
  escape(x.review.decision) +
  (x.entry.concept ? ' · CONCEPT' : '') +
  '</p><h3>' +
  escape(x.entry.title) +
  '</h3><p>' +
  escape(x.review.reasons.join(' ')) +
  '</p><details><summary>Scene restrictions and provenance</summary><p>' +
  escape(x.entry.guard) +
  '</p><p>' +
  escape(x.entry.direction) +
  '</p><p>' +
  escape(x.entry.sources.join('; ')) +
  '</p><code>' +
  escape(x.entry.spec.assetId) +
  '</code><p>' +
  escape(x.receipt.outputDimensions.width + ' × ' + x.receipt.outputDimensions.height + ' · PNG') +
  '</p></details></div></article>';
const html =
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src \'self\' data:; style-src \'unsafe-inline\'; base-uri \'none\'; form-action \'none\'"><title>EVE — Cast and Scene Review</title><style>body{margin:0;background:#101217;color:#edf0f5;font:16px/1.6 system-ui,sans-serif}header,main{max-width:1440px;margin:auto;padding:32px}h1{font-size:42px;margin:0}h2{margin-top:48px}h3{margin:6px 0}a{color:#dfbc79}nav{display:flex;gap:20px;flex-wrap:wrap}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:24px}article{background:#1d222b;border:1px solid #343b48;border-radius:12px;overflow:hidden}img{display:block;width:100%;height:auto}.body{padding:20px}.badge{font-size:12px;letter-spacing:1px;color:#dfbc79}details{font-size:14px;color:#b6c0d0}code{overflow-wrap:anywhere}.notice{border-left:3px solid #dfbc79;padding-left:18px;color:#c5cdda}</style></head><body><header><p class="badge">EVE · VISUAL DEVELOPMENT · 16 SEPTEMBER 2026</p><h1>Cast &amp; Scene Review</h1><p>' +
  escape(summary) +
  '</p><p class="notice">' +
  escape(status) +
  '</p><p><a href="REVIEW.md">Detailed review</a> · <a href="generation-run.json">Generation provenance</a> · <a href="coverage.json">Playable coverage plan</a></p><nav>' +
  groupsData.map((g) => '<a href="#' + g.id + '">' + escape(g.title) + '</a>').join('') +
  '</nav></header><main>' +
  groupsData
    .map(
      (g) =>
        '<section id="' +
        g.id +
        '"><h2>' +
        escape(g.title) +
        ' <small>(' +
        g.items.length +
        ')</small></h2><div class="grid">' +
        g.items.map(card).join('') +
        '</div></section>',
    )
    .join('') +
  '</main></body></html>';
fs.writeFileSync(path.join(dir, 'gallery.html'), html);
const report = [
  '# EVE cast and scene review',
  '',
  summary,
  '',
  status,
  '',
  '## Review limitations',
  '',
  '- All images were inspected as provider previews; original PNG dimensions and SHA-256 hashes were verified locally.',
  '- Apartment day/night geography differs. Reconcile layout before runtime use.',
  '- Background detail is stronger than portrait detail in some locations; review scene styling as a set.',
  '- Cast designs, business/casual wardrobes, and the unnamed executive remain provisional. Confirm Sloane temple streak placement and Voss styling before final approval.',
  '- Generic security staff, driver, guests and photographer are supporting figures within scenes; they do not establish new named characters.',
  '- Any REVISE or REJECT recommendation below should be resolved before production use. No automatic replacement generations were submitted after review.',
  '',
  ...groupsData.flatMap((g) => [
    '## ' + g.title,
    '',
    ...g.items.flatMap((x) => [
      '### ' + x.entry.title + ' — ' + x.review.decision,
      '',
      '[Original PNG](' + path.basename(x.file) + ') · ' + x.entry.spec.assetId,
      '',
      x.review.reasons.join(' '),
      '',
      '**Scope / branch restriction:** ' + x.entry.guard,
      '',
      '**Source:** ' + x.entry.sources.join('; '),
      '',
    ]),
  ]),
].join('\n');
fs.writeFileSync(path.join(dir, 'REVIEW.md'), report);
console.log(
  JSON.stringify({
    selected: records.length,
    images: run.items.length,
    gallery: 'art/staging/cast-scenes/gallery.html',
  }),
);
