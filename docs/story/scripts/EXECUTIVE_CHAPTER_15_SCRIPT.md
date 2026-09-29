# Executive · Chapter 15: "By Appointment" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_15_BY_APPOINTMENT_DESIGN.md](../EXECUTIVE_CHAPTER_15_BY_APPOINTMENT_DESIGN.md) (approved
2026-09-29, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md).

- **Code:** `src/content/chapter15-executive.ts`. It is wired through:
  - `src/content/chapter15.ts`: phase definitions, `place15`, blocks, choices, and the begin from `chapter14.complete`;
  - `chapter14-executive.ts`: its "[Chapter 15 · in development]" line now shows only when Ch15 is off;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER15`.
- **Entry:** `chapter15.begin-executive` ("The week before the board") at an Executive `chapter14.complete`.
- **End:** the shared `complete`, with Executive blocks, and "[Chapters 16–18 · executive road — in development]" until
  the Executive Act IV variants exist.
- **Naming:** phases are `allies → entry → stacks → holds → last`. Choice ids carry `x15-`; keys live under `exec.*` and
  `c15.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **allies** | The road in, by Ch14's way (enforced: a week's pause; spent: nobody's chief of staff, Axiom asking; fell: an office with nobody in it). "Clients may review their own records there, by appointment." | One or two from `available15`: **x15-ally-julian** (credentials: julian) · **-iris** (warned in Ch11) · **-sloane** (Ch14 debt taken) · **-hal** (the car, Ch8) · **-maya** (if she is back) · **-marsh** (outside, the switch). Then **x15-allies-done**, or **x15-allies-none** | `exec.crew15` |
| **entry** | The night before (deepening): **x15-plan-floor** (his carpet and the Vesper's fire plan, if Julian is coming: "That isn't a cupboard. The walls are too thick.") · **x15-plan-walk** (past the Vesper at midnight; the doorman's cigarette, eleven minutes) · **x15-plan-sleep** (neutral). Then the plan: four ways into one room. | **x15-way-appointment** (credentials: julian, Julian comes; a daylight con) · **x15-way-card** (credentials: card; alone) · **x15-way-stair** (Iris or Sloane on the crew; 2 a.m.) · **x15-way-invited** (always; the meeting is the cover). Then the snag (Celeste in the doorway / the phone call to Helix, answered by Hal or Julian / the doorman / Celeste early): **x15-snag-talk** · **-hide** · **-bold** | `c15.x-plan`, `exec.way15`, `c15.x-snag` |
| **stacks** | The archive. Her page torn out. MERCER, J.: eleven signatures, eleven page thirty-ones, a photograph of a boy of nineteen, and "Collateral, in the person of J.M. Kind. Will not survive us." With Julian: "She's right about the first part." Sloane's file, if promised. | First the first Evelynn's drawer (deepening), VALE, E. (I): **x15-first-read** ("She hated orchids. I never learned." in pencil in the looping hand) · **x15-first-hand** (his hand, between the cabinets, if he is there) · **x15-first-away** (neutral). Then one thing more: **x15-took-adrian** · **x15-took-cards** (only if the 1109 card isn't already hers) · **x15-took-nell** (the Jakarta order, signed C.) | `c15.x-first`, `exec.took15`, `exec.julian-file`, `exec.sloane-file`; fact `c15.x-julian-file` |
| **holds** | The week after, like a list: his signatures back; Adrian's name (Benton stands down on the spend way with Adrian's file); the switch (Marsh, Nora, Iris, Sloane, Maya, or a solicitor); Sloane's file handed over. | First the Collateral card (deepening): **x15-cardj-give** (if he wasn't there: "I'd like to prove her wrong about the second.") · **x15-cardj-burn** (together, in the sink on forty-one, if he was) · **x15-cardj-keep** (neutral). Then the cost: **x15-cost-ally** (Iris's cover, Marsh early, or Sloane's keys) · **x15-cost-kept** (only if something was his: "I know. That's why.") · **x15-cost-money** · **x15-cost-julian** (on the record at the Markets Authority, by his own choice) | `exec.cost15`; `c15.cost` / `c15.cost-who`; `act3.leash = broken`, `act3.switch`, `act3.ally.*` |
| **last** | "No more orders." / "I shall be there as myself." | **x15-phone-return** · **-river** · **-keep**; then **x15-night-julian** → the scope **x15-julian-no-sex** / **x15-julian-sex** (if Ch6 warmed things or she has stayed with him before) / **x15-leave** → **x15-stop** / **x15-stay** (fades); or **x15-night-alone** | `c15.x-phone`, `act3.black-phone`, `c15.x-night*`; fact `c15.x-evening-consent` |
| **complete** | The wall: every card across to her side, MERCER, J. in the middle, except THE BOARD MEETS. With the *kept* cost: under JULIAN MERCER, the question from the first day answered, NOTHING. | — (Act IV Executive in development) | — |

**Content:**
- Julian is never a trap; his drawer is a record of what was done to him.
- The *kept* cost is offered, never imposed.
- No sexual coercion; the night is chosen, heat 3, consent-gated, and fades.

**Tests:**
- `tests/state/executive-ch15.test.ts`, a real save through Executive Ch7–14:
  - the entry (and Ch14 no longer says Ch15 is in development);
  - **by appointment with Julian** (enforced): authenticates;
  - **his card alone** (spent): Adrian's file, the *kept* cost;
  - **her own way** (fell): Hal, invited, the 1109 safe.
- `chapter15.test.ts` now checks that a closed road (institutional) stays closed and that Executive gets its own entry.

**Deepening pass (2026-09-29):** three moments, each with a neutral pick (the night before, the first Evelynn's
drawer, the Collateral card). The wall remembers the margin line and the burned card. Tests use a `NEUTRAL15` walker
(`x15-plan-sleep`, `x15-first-away`, `x15-cardj-keep`).

**Size (honest):** ~0.75k (quiet) to ~0.96k (engaged) at pass 1; ~0.81k to ~1.23k after deepening, against the ~4.5k
target.
