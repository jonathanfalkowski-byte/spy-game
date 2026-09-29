# Executive · Chapter 16: "The Term" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_16_THE_TERM_DESIGN.md](../EXECUTIVE_CHAPTER_16_THE_TERM_DESIGN.md) (approved 2026-09-29, all
eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md). Shared spine:
[../CHAPTER_16_THE_APPROACH_DESIGN.md](../CHAPTER_16_THE_APPROACH_DESIGN.md).

- **Code:** `src/content/chapter16-executive.ts`. It is wired through:
  - `src/content/chapter16.ts`: phase definitions, `place16`, blocks, choices, and the begin from `chapter15.complete`;
  - `chapter15-executive.ts`: its "[Chapters 16–18 · in development]" line shows only when Ch16 is off;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER16`.
- **Entry:** `chapter16.begin-executive` ("Thursday") at an Executive `chapter15.complete`.
- **End:** the shared `complete` (the long room), with Executive blocks, and "[Chapters 17–18 · executive road — in
  development]".
- **Naming:** phases are `layout → purpose → company → sequence → clasp → embankment`. Choice ids carry `x16-`.
- **Keys:** it writes the shared `act4.*` contract (`case`, `aim`, `inside`, `inside-done`, `outside`, `first`,
  `held`, `wear`, `dressed-with`, `arrive`, `seen`) plus `act4.julian` (helix / witness / outside / waiting).

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **layout** | Five in the morning, every card on the floor, MERCER, J. in the middle. What she holds, with reasons, and THE CASE (`case16x`: Julian's file counts 2; the page thirty-one copy or the Rotterdam original; Nell's order; the 1109 cards; Julian at the table or on the record; Marsh (unless spent); Nora; Sloane; Ashby). | **x16-case-set** | `act4.case` (thin / supported / strong / overwhelming) |
| **purpose** | The kitchen table. Closed aims say why ("a company that let him go"; "He won that on his own"). | **x16-aim-term** (only if Julian is at Helix, enforced or spent, or on the record) · **x16-aim-exit** (always; honest about what of his she still holds; the door term: "References unreserved.") · **x16-aim-spent** (only if he is at risk: spent, fell, or on the record) · **x16-aim-nell** (always) | `act4.aim` (term / exit / spent / nell) |
| **company** | Who comes. | Inside, up to two: **x16-inside-julian** (as Helix, a seat by the door; or as a witness, "As the man who signed them") · **-sloane** · **-marsh** (unless spent) · **-nora** · **-iris** · **-maya**; **x16-inside-done** / **x16-inside-none**. Then outside: **x16-outside-julian** (at the kerb; if not inside) · **-hal** · **-marsh** (if not inside) · **-switch** | `act4.inside`, `act4.outside`, `act4.julian` |
| **sequence** | Noon, the cards in a row. | First: **x16-first-julian** · **-nell** (with her order) · **-cards** (with the 1109 cards) · **-page**. Then held: **x16-held-…** (any other) or **x16-held-none** | `act4.first`, `act4.held` |
| **clasp** | Four o'clock, armour. | **x16-wear-his** (the dress on his card, unless given back in Ch15) · **-black** · **-grey** (Iris's colour). Then **x16-dressed-julian** (the clasp: "Come back." "I always do."; heat 1–2) · **-maya** (if she is back) · **-alone** | `act4.wear`, `act4.dressed-with` |
| **embankment** | A quarter to six; photographers if she is public (`c5.published`, or Julian on the record). | **x16-arrive-helix** (Julian as Helix, inside or at the kerb) · **-front** · **-quiet** · **-car** (Celeste's). Then the doorman: "They're expecting you. … Good luck, Ms Vale." | `act4.arrive`, `act4.seen`; fact `c16.x-approach` |
| **complete** | The long room: Deverell, Soames, three unnamed; Julian in the chair marked HELIX GROUP if he came as Helix; Celeste stands: "Darling. You came as yourself. So did I." A thought, by aim. | — (Chapters 17–18 in development) | — |

**Content:**
- The autonomy law: exit and Nell are always open, and she can walk in alone.
- Julian is never a trap.
- Kept is never punished; the exit aim is honest about what she leaves behind.
- The morning's intimacy is chosen and at heat 1–2.

**Tests:**
- `tests/state/executive-ch16.test.ts`, a real save through Executive Ch7–15:
  - the entry;
  - **term:** Julian as Helix, 14.3 first, the clasp, Helix's car; authenticates;
  - **exit:** after giving his things back;
  - **Nell:** the term closed after the fall, Julian as a witness, Celeste's car.
- `chapter16.test.ts` now checks that a closed road (institutional) stays closed and that Executive gets its own entry.

**Size (honest), pass 1:** ~0.59k (quiet) to ~0.68k (engaged), against the ~4.5k target. It is the thinnest first pass
on the road, and first in line for deepening.
