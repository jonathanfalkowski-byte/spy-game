import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import manifest from '../../src/persistence/legacy-v16/SOURCE.json';

it('proves revision16 semantic files came from the audited commit, with import rebasing only', () => {
  for (const [file, hash] of Object.entries(manifest.sourceSha256)) {
    const source = execFileSync('git', ['show', manifest.commit + ':' + file], {
      maxBuffer: 4 * 1024 * 1024,
    });
    expect(createHash('sha256').update(source).digest('hex'), file).toBe(hash);
    const frozen = readFileSync(file.replace('src/', 'src/persistence/legacy-v16/'), 'utf8')
      .replaceAll("'../../../state/", file.startsWith('src/state/') ? "'./" : "'../state/")
      .replaceAll('\r\n', '\n');
    expect(frozen, file).toBe(source.toString('utf8').replaceAll('\r\n', '\n'));
  }
}, 30000);
