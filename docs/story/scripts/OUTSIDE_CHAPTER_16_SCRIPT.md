# Outside · Chapter 16: "Her Own Hand" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_16_HER_OWN_HAND_DESIGN.md](../OUTSIDE_CHAPTER_16_HER_OWN_HAND_DESIGN.md) (approved 2026-10-01). Shared spine:
[../CHAPTER_16_THE_APPROACH_DESIGN.md](../CHAPTER_16_THE_APPROACH_DESIGN.md).

- **Code:** `src/content/chapter16-outside.ts`, wired through `src/content/chapter16.ts` (definitions, place, blocks, choices, the begin
  from an Outside `chapter15.complete`); titles in `src/ui/App.tsx` (HER OWN HAND); masters in `src/ui/environment-art.ts`; node ids in
  `src/content/schema.ts`; Ch15's stop line removed.
- **Gate:** `VITE_EVE_CHAPTER16`. **Entry:** `chapter16.begin-outside` ("Thursday"). **End:** `complete`, with the stop line
  "[Chapters 17–18 · outside road — in development]" until `VITE_EVE_CHAPTER17` is on.
- **Naming:** phases `sheet → stand → retinue → spread → coat → steps`; choice ids carry `o16-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **sheet** | The ledger on the floor, CHECKED BY; THE CASE: THIN / SUPPORTED / STRONG / OVERWHELMING with reasons. A dawn moment. | **o16-dawn-rafe** (not cut) · **-phone** (kept) · **-nell** (Nora) · **-quiet**; then **o16-case-set** | `c16.o-dawn`, `act4.case` |
| **stand** | The position, with its one-line notice. | **o16-aim-expose** (verified ≥ 2 or the drawer) · **-trade** · **-cut** · **-nell** | `act4.aim`, `act4.notice` |
| **retinue** | Two inside at most; then one outside. | **o16-inside-rafe / -maya / -marsh / -nora / -iris**, **-done / -none**; outside **o16-outside-rafe** (not inside) · **-marsh** · **-iris** · **-switch** | `act4.inside`, `act4.inside-done`, `act4.outside`, `act4.rafe` = room / door / absent |
| **spread** | Celeste's reply ("How very like a bookkeeper, darling."); the order of the cards. | **o16-reply-bin / -pin / -file**; **o16-first-<card>**; **o16-held-<card> / -none** (ledger, nell, slip, cards, page, lim) | `c16.o-reply`, `act4.first`, `act4.held` |
| **coat** | Armour; one pair of hands; a last look at the wall. | **o16-wear-black / -grey / -plain**; **o16-dressed-rafe / -maya / -iris / -alone**; **o16-leave-take / -leave / -write** | `act4.wear`, `act4.dressed-with`, `c16.o-leave` |
| **steps** | The way in; "Good luck, miss." | **o16-arrive-river** (not cut) · **-notice** (Marsh) · **-front** · **-car** | `act4.arrive`, `act4.benton = absent`, fact `c16.o-approach` |
| **complete** | The long room. Rafe by the wall with nothing in his arms (room) or at the river door (door); Celeste stands: "How very like a bookkeeper." | — | — |

**Safety:** how Nell died is not told; Rafe never makes her Nell; the collar is a hand on a collar, and a kiss only if a night was
chosen earlier.

**Tests:** `tests/state/outside-ch16.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–15: the entry; Rafe in the
room with Marsh (expose, the slip held back, the grey, the collar, the river door), authenticated (replay + decode) with no cause of
death and nothing in the word list; Rafe at the door (trade); Rafe cut (no Rafe anywhere, no river door, no inside Rafe) and expose closed
when she can sign nothing.

**Size (honest), pass 1:** see the pass report; against the ~4.5k target.
