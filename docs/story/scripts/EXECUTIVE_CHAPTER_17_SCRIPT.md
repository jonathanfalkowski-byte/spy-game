# Executive · Chapter 17: "Collateral" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_17_COLLATERAL_DESIGN.md](../EXECUTIVE_CHAPTER_17_COLLATERAL_DESIGN.md) (approved
2026-09-29, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_17_THE_ROOM_DESIGN.md](../CHAPTER_17_THE_ROOM_DESIGN.md).

- **Code:** `src/content/chapter17-executive.ts`. It is wired through:
  - `src/content/chapter17.ts`: phase definitions, blocks, choices, and the begin from an Executive `chapter16.complete`;
  - `chapter16-executive.ts`: its "[Chapters 17–18 · executive road — in development]" line shows only when Ch17 is off;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER17`.
- **Entry:** `chapter17.begin-executive` ("The room") at an Executive `chapter16.complete` (the long room).
- **End:** `complete` (the front door), with "[Chapter 18 · executive road — in development]".
- **Naming:** phases are `product → clause → officer → gift → wall → tally → alone`. Choice ids carry `x17-`.
- **Keys:** it writes the shared Ch17 `act4.*` keys: `open`, `press`, `sloane`, `offer`, `held-landed`, `named`,
  `nell-said`, `board`, `terms`, `last`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **product** | Celeste presents the product by catalogue number and reads the dress (his: "His dress. You kept it." / black: "Black. You did dare." / grey: "Iris's grey. How very loyal."). | **x17-open-room** ("I'm the product. I'd like to read you the warranty.") · **-celeste** · **-silent**; then the first card (`act4.first`) lands | `act4.open` |
| **clause** | 14.3. If Julian is inside (helix / witness), he stands and reads it into the minutes, eleven times; his dawn line if he rang at dawn. Otherwise she reads it in his name. Deverell to Celeste: "Did we know about 14.3?" | **x17-press-clause** ("You don't own Meridian. It owns you.") · **-collateral** (the card: kept, on the table; given, he takes it from his pocket; burned, "I remember every word") · **-cost** (Clare, Eleanor, Iris, Owen Marsh, the man who signed) | `act4.press` |
| **officer** | Only if Sloane is inside or `exec.sloane-file` is set. | **x17-sloane-vouch** · **-stand** · **-use** | `act4.sloane` |
| **gift** | Celeste's last move: the term as a present, if she stays. Julian inside: "Whatever you choose, don't choose it for me. I'm not the reason." Otherwise, a text. | **x17-gift-refuse** ("I came to enforce a term.") · **-draw** (Celeste prices it: Marsh's inquiry, Sloane's file, and her) · **-laugh**; then the held card lands (MERCER, J. "He survived." / Nell's order / the 1109 cards / page seven / nothing: "I'm still here.") | `act4.offer`, `act4.held-landed` |
| **wall** | Nell, told (canon): the Jakarta order; the car; the harbour wall; the driver; six and seven. Responsibility, not a push. | **x17-named-ask** (Eleanor if the case is at least supported, else Evie) · **-nora** (only if Nora is inside; Eleanor) · **-wait** (Eleanor if strong, else unsaid) | `act4.named`, `act4.nell-said` |
| **tally** | Seven o'clock. The board acts to save Meridian. Score = case (thin 0 … overwhelming 3) + Julian inside + the gift drawn: 2+ resigned/full, 1 diminished/partial, 0 closed/none. The grant is worded by aim (term / exit / spent / Nell). | **x17-tally-on** | `act4.board`, `act4.terms` |
| **alone** | One minute. "Did you ever like being her?" The orchid. "He's a lovely man. He survived us. I didn't expect that." | **x17-last-yes** · **-no** · **-orchid** (into the water jug) | `act4.last` |
| **complete** | The front door, opened by herself. Julian beside her (inside), at the kerb (outside), or a text: "Well?" | — (Chapter 18 in development) | — |

**Content:**
- Nothing sexual on screen; the charge between the two women is attention.
- The gift is refusable at no cost. Refusing never lowers the board.
- Julian is never a trap: his one line takes him off the scales.
- Meridian is wounded, never toppled; closed is still solvable.

**Tests:**
- `tests/state/executive-ch17.test.ts`, a real save through Executive Ch7–16:
  - the entry;
  - **term, resigned:** Julian reads 14.3, the card on the table, Sloane vouched for, the gift refused; authenticates;
  - **exit, diminished:** the clause in his name, the text from the kerb, partial terms;
  - **Nell, closed:** a thin case, the board closes ranks;
  - drawing Celeste out moves the board one step.

  The three real saves all arrive with a strong case. The diminished and closed goldens set `act4.case` on the save.
- `chapter17.test.ts` now checks that a closed road (institutional) stays closed and that Executive gets its own entry.

**Size (honest), pass 1:** ~0.65k (quiet) to ~0.73k (engaged), against the ~4.5k target. First in line for deepening.
