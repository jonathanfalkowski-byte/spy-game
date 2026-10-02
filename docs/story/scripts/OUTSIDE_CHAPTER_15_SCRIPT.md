# Outside · Chapter 15: "The Courier's Door" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_15_THE_COURIERS_DOOR_DESIGN.md](../OUTSIDE_CHAPTER_15_THE_COURIERS_DOOR_DESIGN.md) (approved 2026-10-01).
Shared spine: [../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md).

- **Code:** `src/content/chapter15-outside.ts`, wired through `src/content/chapter15.ts` (definitions, place, blocks, choices, the
  begin from an Outside `chapter14.complete`); titles in `src/ui/App.tsx` (THE COURIER'S DOOR); masters in `src/ui/environment-art.ts`;
  node ids in `src/content/schema.ts`; `tests/state/chapter15.test.ts` now expects Outside's own entry; Ch14's stop line removed.
- **Gate:** `VITE_EVE_CHAPTER15`. **Entry:** `chapter15.begin-outside` ("The week before the board"). **End:** `complete`, with the stop
  line "[Chapters 16–18 · outside road — in development]".
- **Naming:** phases `chart → approach → shelves → reckon → vigil`; choice ids carry `o15-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **chart** | "I keep everything, darling." Rafe's floor-plan on the iron stair (04:58, the blind minute) unless cut. Pick up to two. | **o15-crew-rafe / -maya / -marsh / -iris** (as available), **-done**, **-none** | `out.crew15` |
| **approach** | Choose the way in, then the snag. | Way: **o15-way-courier** (Rafe on crew) · **-stair** (layout or Iris) · **-invited** (always). Snag: **o15-snag-talk / -hide / -bold** | `out.way15`, `c15.o-snag` |
| **shelves** | Her own page torn out; the cabinet marked L. | **o15-drawer-open** → LINDEN, E.: the Jakarta order signed C. + the Rotterdam slip. **o15-slip-gave** (Rafe on crew) / **-held**. **o15-took-adrian / -cards / -lim** (lim only if he is not cut) | `out.linden15`, `act3.nell-order=taken`, `c15.o-linden`, `out.slip15`, `out.took15` |
| **reckon** | Copies to the switch holders; the price. | **o15-cost-ally** (Iris/Marsh) · **-face** · **-money** · **-rafe** (told, not cut) | `out.cost15`, `c15.cost`, `c15.cost-who`, `act3.leash=broken`, `act3.switch`, `act3.ally.*` |
| **vigil** | "No more orders." / "I shall be there as myself." The black phone; a chosen night. | **o15-phone-return / -river / -keep**; night: **o15-night-rafe / -julian / -sebastian / -maya / -alone**, then scope **o15-<who>-no-sex / -sex**, then **o15-stay / -stop / -leave** | `act3.black-phone`, `c15.o-night*`, `c15.o-evening-consent` |
| **complete** | The card: LINDEN, E. / ROTTERDAM. SATURDAY. AUTH. C. HE KNOWS (or HE DOESN'T KNOW YET) / THE BOARD MEETS. | — | — |

**Deepening (2026-10-02):** `o15-plan-trace / -walk / -leave` (before the crew), `o15-page-take / -back / -mark` (before the drawer),
`o15-post-self / -rafe / -mail` (before the price; `-rafe` not offered if he is cut). Facts `c15.o-plan`, `c15.o-page`, `c15.o-post`; none is read by
Ch16–18; the Rafe docket is a deliberate echo of Ch18's SIGNED FOR BY.

**Safety:** how Nell died is not told; Rafe never makes her Nell; the night is a chosen scope with a stop; the sexual scene fades; no
refusal costs her body.

**Tests:** `tests/state/outside-ch15.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–14: the entry (Ch14 no
longer says Act IV is in development); the full Rafe + Marsh courier's-door path to a faded chosen night, authenticated (replay +
decode), with no cause of death and nothing in the word list; the cut-Rafe, alone, invited, bold path (the slip can only be held; no
LIM file; no Rafe cost or night); and spend-an-ally with the night stopped or declined.

**Size (honest), pass 1:** ~1.48k words on the Rafe + Marsh path, against the ~4.5k target. Deepening will add the florists' van,
Marsh outside with the notice, Iris and Maya aboard, the snag talk, and more of the archive.
