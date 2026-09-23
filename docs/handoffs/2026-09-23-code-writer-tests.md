# Code job 1 — writer tooling tests (2026-09-23)

New offline tooling landed in `tools/writer/` (`card.mjs`, `write-scene.mjs`, `screen-take.mjs`); see `docs/story/intimate/README.md`. It is not imported by the game.

1. Read `docs/LANES.md`. You now own `tools/writer/*.mjs` as code.
2. Add vitest coverage for `tools/writer/card.mjs` in the existing test setup:
   - `checkId` rejects `../x`, uppercase, spaces, empty.
   - `loadCard` parses header (speakers/required/forbidden/words) and returns only the text below the first `---` as the prompt; errors when the separator is missing. Use a temp dir or fixture card, do not add cards under `docs/story/intimate/cards/`.
   - `screen` flags: first-person narration (but not "I" inside quotes), "we/us/our" narration, "Evelynn" in narration, too short/long, square brackets, forbidden multi-word phrase, missing whole-word required token, repeated sentence, run-on paragraph > 600 chars.
   - `toBlocks` emits `q('Speaker', '...')` for `Name "..."` lines of listed speakers, `p('...')` otherwise, and cannot break out of the string literal (quotes and backslashes).
3. Run `npm run typecheck` and the new tests; report results to **EVE design overview**. Do not commit.

`CARDS`/`OUT` are module constants; if testing needs injectable paths, a small refactor (optional dir argument) is fine.
