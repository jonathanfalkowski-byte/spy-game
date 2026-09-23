// Screen every saved take for a card and rank them.
// Usage: node tools/writer/screen-take.mjs <card-id>
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { OUT, loadCard, screen } from './card.mjs';

const card = loadCard(process.argv[2]);
const dir = join(OUT, card.id);
if (!existsSync(dir)) throw new Error(`no takes yet in ${dir}`);

const results = readdirSync(dir)
  .filter((f) => /^take\d+\.txt$/.test(f))
  .map((f) => ({ file: f, ...screen(readFileSync(join(dir, f), 'utf8'), card) }))
  .sort((a, b) => a.issues.length - b.issues.length || b.words - a.words);

for (const r of results) {
  console.log(`${r.file}  ${r.words}w  ${r.issues.length ? r.issues.join('; ') : 'clean'}`);
}
console.log('Read the top two in full: check openings, endings and continuity facts.');
