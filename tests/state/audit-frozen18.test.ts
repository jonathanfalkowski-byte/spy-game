import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import manifest from '../../src/persistence/legacy-v18/SOURCE.json';

// Reverse the documented adaptations: import rebasing and the one type-only cast.
const unadapt = (text: string) =>
  text
    .replaceAll("'../../", "'../persistence/")
    .replaceAll("'../persistence/../../docs/", "'../../docs/")
    .replace(
      'applyFrozenChapter5(state as Parameters<typeof applyFrozenChapter5>[0],parsed.data.id) as GameState;',
      'applyFrozenChapter5(state,parsed.data.id);',
    )
    .replaceAll('\r\n', '\n');

it('proves the frozen revision-18 engine came from its source commit, with documented adaptations only', () => {
  const files = Object.keys(manifest.sourceSha256);
  expect(files).toHaveLength(50);
  const git = execFileSync('git', ['cat-file', '--batch'], {
    input: files.map((file) => manifest.commit + ':' + file).join('\n') + '\n',
    maxBuffer: 32 * 1024 * 1024,
  });
  let pos = 0;
  for (const [file, hash] of Object.entries(manifest.sourceSha256)) {
    const end = git.indexOf(10, pos),
      header = git.subarray(pos, end).toString().split(' '),
      size = Number(header[2]),
      source = git.subarray(end + 1, end + 1 + size);
    expect(header[1], file).toBe('blob');
    expect(createHash('sha256').update(source).digest('hex'), file).toBe(hash);
    const frozen = readFileSync(file.replace('src/', 'src/persistence/legacy-v18/'), 'utf8');
    expect(unadapt(frozen), file).toBe(source.toString('utf8').replaceAll('\r\n', '\n'));
    pos = end + size + 2;
  }
});
