import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { it, vi } from 'vitest';
import golden from '../fixtures/rev19-golden-ledgers.json';
import golden6 from '../fixtures/rev19-chapter6-golden.json';
import golden7 from '../fixtures/rev19-chapter7-golden.json';
import golden8 from '../fixtures/rev19-chapter8-golden.json';
import golden9 from '../fixtures/rev19-chapter9-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { readingBlocks } from '../../src/ui/reading-presentation';

/** Editorial tool, skipped by default: EVE_DUMP=<dir> [EVE_DUMP_REV=19,20] npx vitest run tests/tools/transcript-dump.test.ts
 * writes the player-visible transcript of every golden route, one file per route and revision. */
const dir = process.env.EVE_DUMP;
const revisions = (process.env.EVE_DUMP_REV ?? '19,20').split(',').map(Number);

const transcript = (s: GameState) =>
  s.history
    .map((entry) => {
      const lines = readingBlocks(entry.blocks, entry.node, s.contentRevision).map((b) =>
        b.kind === 'thought' ? `(t) ${b.text}` : b.kind === 'speech' ? `(q ${b.speaker ?? '?'}) ${b.text}` : b.kind === 'notice' ? `[${b.text}]` : b.text,
      );
      return [`=== ${entry.node}`, ...lines].join('\n');
    })
    .join('\n\n');

it.skipIf(!dir)('dumps golden-route transcripts', () => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
  const out = resolve(dir!);
  mkdirSync(out, { recursive: true });
  const routes = [
    ...golden.routes.map((r) => ['ch1-5-' + r.name, r.ledger] as const),
    ...[golden6, golden7, golden8, golden9].flatMap((g, i) => g.routes.map((r) => [`ch${i + 6}-${r.name}`, r.ledger] as const)),
  ];
  for (const [name, ledger] of routes)
    for (const rev of revisions) {
      const safe = name.replace(/[^a-z0-9-]/gi, '_');
      writeFileSync(resolve(out, `${safe}.r${rev}.txt`), transcript(replay(ledger as GameEvent[], rev)) + '\n');
    }
  vi.unstubAllEnvs();
}, 300_000);
