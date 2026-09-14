import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const expected = {
  'EVE_M0_Helix_Prototype.html': 'a7b377fbc69d5bd64114767ce4d364378fb25ce2fa48e228e9b1a5417b7f9888',
  'EVE_Vertical_Slice_GDD_v0.2.docx':
    '0cf138658912a0822fce23f490c7059b972e48688f6f25d8fb72836e24b91099',
};
for (const [file, hash] of Object.entries(expected)) {
  const actual = createHash('sha256')
    .update(readFileSync(new URL('../reference/' + file, import.meta.url)))
    .digest('hex');
  if (actual !== hash) throw new Error('Reference changed: ' + file);
  console.log('UNCHANGED ' + file);
}
