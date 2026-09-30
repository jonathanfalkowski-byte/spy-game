# Institutional · Chapter 15: "The Audit" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_15_THE_AUDIT_DESIGN.md](../INSTITUTIONAL_CHAPTER_15_THE_AUDIT_DESIGN.md) (approved
2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md).

- **Code:** `src/content/chapter15-institutional.ts`. It is wired through:
  - `src/content/chapter15.ts`: phase definitions, `place15`, blocks, choices, and the begin from an Institutional
    `chapter14.complete`;
  - `chapter14-institutional.ts`: its "[Chapters 15–18 · institutional road — in development]" line shows only when
    Ch15 is off;
  - titles in `src/ui/App.tsx` (THE AUDIT), masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`;
  - `tests/state/chapter15.test.ts` now expects Institutional's own entry.
- **Gate:** `VITE_EVE_CHAPTER15`.
- **Entry:** `chapter15.begin-institutional` ("The week before the board").
- **End:** the shared `complete`, with "[Chapters 16–18 · institutional road — in development]".
- **Naming:** phases are `warrant → audit → cabinets → aftermath → eve`. Choice ids carry `i15-`.
- **Keys:** the shared Act III keys `act3.leash = broken`, `act3.switch`, `act3.ally.*`, `c15.cost` (+ `cost-who`),
  `act3.black-phone`; Institutional `inst.crew15`, `inst.way15`, `inst.priya15`, `inst.took15`, `inst.cost15`,
  `inst.client-file`; sub-state `c15.i-snag`, `c15.i-night*`; facts `c15.i-client`, `c15.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **warrant** | The week before the board, by Ch14's way: clause 22 ("I gave them twenty-three."), no badge that opens anything, or Benton's leash. | The crew, one or two: **i15-crew-sloane** (if allied) · **-daniel** (if told) · **-iris** (if free) · **-maya** (if restored) · **-marsh** (outside, the switch); **i15-crew-done** / **-none** | `inst.crew15` |
| **audit** | Monday night; tomorrow, the Vesper. | First Monday night (deepening): **i15-mon-plan** (if a crew: the kitchen table, a line each; "I am not coming in to get you out of the cold store."; G, FOR GOOD LUCK) · **-suit** (the long mirror; "She dressed me for a year. Tomorrow I dress for her.") · **-sleep** (neutral). Then the way: **i15-way-audit** (formal) · **-notice** (regulator, with Marsh an ally) · **-escort** (Benton) · **-stair** (Iris free or Sloane allied) · **-invited** (always). Then the snag (Celeste early; the lawyer; Benton's slate; the doorman): **i15-snag-talk** · **-hide** · **-bold** | `c15.i-mon`, `inst.way15`, `c15.i-snag` |
| **cabinets** | Her page on the lectern (deepening, before the drawer): **i15-page-read** (the back: "Takes direction beautifully. Resents it beautifully. Will be worth more angry. — C.") · **-others** (forty years of catalogues; a name reissued (III)) · **-tear** (neutral). Then AXIOM · CLIENT: E.V. (II) delivered; CANDIDATE 9C (Priya), countersigned or pending. | **i15-priya-tear** · **-keep** · **-give** ("Ask me again next week whether I mean it."); then one thing more: **i15-took-adrian** · **-cards** (unless the card is out) · **-nell** | `c15.i-page`, `inst.priya15`, `inst.client-file`, `inst.took15`; fact `c15.i-client` |
| **aftermath** | The holds broken: Maya's warning withdrawn (if given); Adrian's name defused; copies to the switch holders. Friday: a black orchid, "You took my favourite page. I shall miss it more than you know. — C." | First the orchid (deepening): **i15-orchid-chute** · **-sill** (neutral) · **-received** (RECEIVED, on the back of her card). Then the cost: **i15-cost-ally** (Iris's cover / Marsh early) · **-badge** (her commission, handed to Terry: "Mind the step, madam.") · **-money** · **-sloane** (if allied: on the record, her directorate lost) | `c15.i-orchid`, `inst.cost15`, `c15.cost`, `c15.cost-who`, `act3.leash`, `act3.switch`, `act3.ally.*` |
| **eve** | "No more orders." "I shall be there as myself." | The phone: **i15-phone-return** · **-river** · **-keep**; then the night: **i15-night-daniel** (if told) · **-julian** / **-sebastian** · **-alone**; **i15-{partner}-no-sex** / **-sex** / **i15-leave**, then **i15-stop** / **i15-stay** | `act3.black-phone`, `c15.i-night*` |
| **complete** | Everything on her side of the door; Priya's receipt (four pieces / a thank-you card / whole); THE BOARD MEETS. | — (Ch16–18 in development) | — |

**Tests:** `tests/state/institutional-ch15.test.ts`, on real golden saves through Institutional Ch7–14: the entry; **the
audit** with Sloane and Daniel (9C torn up, Adrian's file, Sloane on the record, a night with Daniel; authenticates);
**Benton's escort** with Marsh outside (9C kept, the 1109 safe, Marsh early); **after the proof** by invitation (Priya
told, Nell's order, the badge).

**Deepening pass (2026-09-30):** three moments, each with a neutral pick (Monday night, her page, Friday's orchid), and
fuller nights: each partner gets his own lead-in (Daniel says both her names; Julian's pins on the piano; Sebastian's hand
at the small of her back) and his own line inside the chosen scope, still fading at the act. Tests use a `NEUTRAL15`
walker (`i15-mon-sleep`, `i15-page-tear`, `i15-orchid-sill`) and add a fifth test: the chute, and a chosen night with Daniel.

**Size (honest):** ~0.71k (quiet) to ~0.86k (engaged) at pass 1; ~0.96k (quiet) to ~1.41k (engaged) after deepening,
against the ~4.5k target.
