# Institutional · Chapter 12: "Her City" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_12_HER_CITY_DESIGN.md](../INSTITUTIONAL_CHAPTER_12_HER_CITY_DESIGN.md) (approved
2026-09-30, all eight decisions as recommended). Shared spine: [../CHAPTER_12_SINGAPORE_DESIGN.md](../CHAPTER_12_SINGAPORE_DESIGN.md).

- **Code:** `src/content/chapter12-institutional.ts`. It is wired through:
  - `src/content/chapter12.ts`: phase definitions, `place12`, blocks, choices, and the begin from an Institutional
    `chapter11.complete`;
  - `src/content/chapter14.ts`: `institutionalBridgeFrom14` enters Ch14 from `chapter12.complete` ("[Chapter 13 ·
    institutional road — in development]"), or from the last playable of Ch9–11;
  - `chapter14-institutional.ts`: Sloane's confession adds "And you gave me Nell, in room 811." when
    `inst.report12 = all`;
  - titles in `src/ui/App.tsx` (HER CITY), masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`;
  - `tests/state/chapter12.test.ts` now expects Institutional's own entry at an Institutional Ch11 end.
- **Gate:** `VITE_EVE_CHAPTER12`.
- **Entry:** `chapter12.begin-institutional` ("Singapore").
- **Naming:** phases are `wheels → landing → site → marlowe → village → report → wall`. Choice ids carry `i12-`.
- **Keys:** `inst.cover12`, `inst.tan12`, `inst.search12`, `inst.caretaker12`, `inst.ashby12`, `inst.nora12`,
  `act3.nell = known`, `inst.report12`; sub-state `c12.i-search`, `c12.i-wall`; facts `c12.i-schedule`, `c12.i-ashby`,
  `c12.i-nora`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **wheels** | Changi, different flights; the tasking: SINGAPORE · SITE SG/EH-9 · ESTABLISH WHAT BECAME OF E.V. (I) · BACKUP: V.S. · THE FULLERTON, ROOM 811. "Welcome home, darling. Do give my love to Mrs Tan." | **i12-cover-axiom** (logged) · **-taxi** (cash, unlogged) · **-mrt** | `inst.cover12` |
| **landing** | Mrs Tan: "Evie! … So thin." Then the last night, the tall lady, the men in white gloves, the key under the orchids. | **i12-tan-evie** · **-truth** ("You stand wrong.") · **-listen** | `inst.tan12` |
| **site** | Number 9, kept lived-in. | First the hawker centre (deepening; Monday night, Sloane turns up: "Your handler is checking on her operative. … I wrote the manual."): **i12-hawker-sit** (chilli crab, "surgical precision and no dignity at all") · **-away** ("Backup waits in room 811.") · **-alone** (neutral). Then **i12-search-desk** (the schedule: "sister: N. Linden, cooperative") · **-wardrobe** (the Penang boarding pass) · **-balcony** (the orchid across the lane); then the caretaker: **i12-caretaker-hide** · **-card** ("Axiom. Routine inspection." It works horribly well.) · **-who** (the agency's number) | `c12.i-hawker`, `c12.i-search`, `inst.search12`, `inst.caretaker12`; fact `c12.i-schedule` |
| **marlowe** | The Punkah Bar: Ashby (canon: Jakarta, "a friend of hers", the orchids; and "They bought the reissue, love. … The original was never theirs.") | **i12-ashby-nell** · **-bar** (the tasking sheet: "They've sent the reissue to audit the original.") · **-reissue** | `inst.ashby12`; fact `c12.i-ashby` |
| **village** | Nora, canon (the cinnamon; the Saturday call; the tall friend's Sunday call before the police; the photograph). | First Wednesday morning (deepening): **i12-morning-swim** (the rooftop pool at six; BREAKFAST 7.30. V.S.) · **-breakfast** (Sloane asks nothing) · **-desk** (neutral; the notes, one page torn out). Then **i12-nora-truth** · **-kind** · **-go** (nothing given) | `c12.i-morning`, `inst.nora12`, `act3.nell`; fact `c12.i-nora` |
| **report** | Room 811, Sloane with her shoes off: "Report." | First the minibar (deepening): **i12-minibar-drink** ("I ran in this city once.") · **-ask** ("Why Axiom?" "Because they asked me first.") · **-water** (neutral). Then **i12-report-all** (Sloane's pen stops at "the tall friend with the beautiful voice"; "That goes in my own file, not Axiom's.") · **-shaded** ("Her people. As written. I won't ask.") · **-site** ("That's a very thin week, Ms Vale.") | `c12.i-minibar`, `inst.report12` |
| **wall** | Midnight, the harbour. | **i12-wall-name** ("Eleanor. Eleanor Linden.") · **-orchid** · **-daniel** (if told; "Talk to me about the coffee machine.") · **-stand** | `c12.i-wall` |
| **complete** | NELL. ELEANOR LINDEN. HER CITY. REPORT: ALL OF IT. / SHADED. NORA IS MINE. / THE SITE ONLY. THE REST IS MINE. (The photograph.) | — (Ch14 bridge) | — |

**Tests:** `tests/state/institutional-ch12.test.ts`, on real golden saves through Institutional Ch7–11: the entry; **all
of it** (on the books, the warrant card, Nora told the truth, Daniel on the phone, then Ch14 with the room-811 line;
authenticates); **shaded** (off the books, be Nell, the kind lie); **the site only** (the wrong house).

**Deepening pass (2026-09-30):** three moments, each with a neutral pick (the hawker centre, the morning, the minibar).
Tests use a `NEUTRAL12` walker (`i12-hawker-alone`, `i12-morning-desk`, `i12-minibar-water`).

**Size (honest):** ~1.07k (quiet) to ~1.35k (engaged) at pass 1; ~1.33k to ~1.71k after deepening, against the ~4.5k
target.
