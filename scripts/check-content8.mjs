import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../src/persistence/legacy-v8/', import.meta.url);
const expected = JSON.parse(
  readFileSync(
    new URL('../src/persistence/content-8-hashes.json', import.meta.url),
    'utf8',
  ).replace(/^\uFEFF/, ''),
);
const actualFiles = readdirSync(root, { recursive: true, withFileTypes: true }).filter((e) =>
  e.isFile(),
);
if (actualFiles.length !== expected.length) throw Error('Frozen content8 file count changed');
for (const entry of expected) {
  if (!/^(content|state)\/[a-zA-Z0-9.-]+\.ts$/.test(entry.file))
    throw Error('Invalid manifest path');
  const hash = createHash('sha256')
    .update(readFileSync(new URL(entry.file, root)))
    .digest('hex');
  if (hash !== entry.sha256) throw Error('Frozen content8 changed: ' + entry.file);
}
console.log('UNCHANGED frozen content8: ' + expected.length + ' files');
