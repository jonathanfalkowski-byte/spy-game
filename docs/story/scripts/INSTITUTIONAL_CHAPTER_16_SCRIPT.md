# Institutional · Chapter 16: "Reasonable Notice" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_16_REASONABLE_NOTICE_DESIGN.md](../INSTITUTIONAL_CHAPTER_16_REASONABLE_NOTICE_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_16_THE_APPROACH_DESIGN.md](../CHAPTER_16_THE_APPROACH_DESIGN.md).

- **Code:** `src/content/chapter16-institutional.ts`. It is wired through:
  - `src/content/chapter16.ts`: phase definitions, `place16`, blocks, choices, and the begin from an Institutional
    `chapter15.complete`;
  - `chapter15-institutional.ts`: its "[Chapters 16–18 · institutional road — in development]" line shows only when
    Ch16 is off;
  - titles in `src/ui/App.tsx` (REASONABLE NOTICE), masters in `src/ui/environment-art.ts`, node ids in
    `src/content/schema.ts`; `tests/state/chapter16.test.ts` now expects Institutional's own entry.
- **Gate:** `VITE_EVE_CHAPTER16`. **Entry:** `chapter16.begin-institutional` ("Thursday"). **End:** the shared
  `complete` (the long room), with "[Chapters 17–18 · institutional road — in development]" while Ch17 is off.
- **Naming:** phases `briefing → objective → detail → bundle → uniform → notice`; choice ids carry `i16-`.
- **Keys:** the shared `act4.aim` (inside / channels / walk / nell), `act4.case`, `act4.inside`, `act4.inside-done`,
  `act4.outside`, `act4.first`, `act4.held`, `act4.wear` (charcoal / black / lanyard), `act4.dressed-with`,
  `act4.arrive` (client / notice / escort / front / car); Institutional `act4.notice`, `act4.benton` (escort / refused /
  gone / absent); fact `c16.i-approach`.
- **The case (`case16i`):** the client file 2, and 1 each for 9C whole or Priya told, the ORACLE verdict on the
  inquiry's record (ally road), Nell's order, the 1109 cards, Adrian's file, the Records file, the full Singapore report,
  Sloane allied, Marsh, Nora, and the black phone kept. Bands: supported 4, strong 7, overwhelming 10. A torn 9C receipt
  is named on the wall as one receipt shorter, and why.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **briefing** | 05:00, the cards laid out like an Axiom briefing; the green light watching (unless the flat was lost); the case with its reasons. | First five past five (deepening): **i16-dawn-sloane** (not on the cut road: "Read me the first line.") · **-daniel** (told: the tie; "I love you" only after a chosen night with him) · **-nell** (Nora an ally) · **-quiet** (neutral). Then **i16-case-set** | `c16.i-dawn`, `act4.case` |
| **objective** | 06:00. Inside, when closed, says why (cut: "Victoria resigned on a Friday with a typed sheet."; proof: "I made her the proof, not the partner."). | **i16-aim-inside** (Sloane allied) · **-channels** · **-walk** · **-nell**. Each serves **the notice**, on Axiom paper if she still holds a commission, her own paper otherwise: "THE PRODUCT WILL ATTEND." / "…FILED WITH THE REGULATOR AT NINE TOMORROW…" / "I WILL NOT BE STAYING." / "ELEANOR LINDEN. SIX O'CLOCK." | `act4.aim`, `act4.notice` |
| **detail** | Who goes in with the principal. | Inside (up to two): **i16-inside-sloane** (allied) · **-maya** (always) · **-daniel** (told) · **-priya** (given her receipt) · **-marsh** (ally, unspent) · **-nora**; **-done** / **-none**. Outside: **i16-outside-sloane** (the van) · **-marsh** · **-iris** · **-switch** | `act4.inside`, `act4.outside` |
| **bundle** | Noon: Celeste's reply to the notice, "Received with thanks. Twenty-three hours would have been reasonable. C." | First the reply (deepening): **i16-reply-bin** · **-pin** (neutral) · **-file** (with the receipts: "Received. She taught me that word."). Then **i16-first-{client, nell, cards, page, box}**, then **i16-held-…** / **-none** (the empty box needs `c8.i-dark = torch`) | `c16.i-reply`, `act4.first`, `act4.held` |
| **uniform** | 16:00. | **i16-wear-charcoal** · **-black** · **-lanyard** (commissioned); then **i16-dressed-daniel** (told: the cuffs, "With footnotes.", a kiss at the door) · **-maya** · **-sloane** ("Collar.", never touching) · **-alone**; then the last look (deepening): **i16-leave-light** ("Back by nine. Log it.") · **-wardrobe** · **-go** (neutral) | `act4.wear`, `act4.dressed-with`, `c16.i-leave` |
| **notice** | 17:45. On the cut road, Benton at the kerb: "Axiom will escort its asset, Ms Vale." | **i16-arrive-client** (formal authority, or the inside aim) · **-notice** (Marsh) · **-escort** (Benton) · **-front** ("Shut the car door on him" on the cut road) · **-car**; "Good luck, Ms Vale." "They read it. Twice." | `act4.arrive`, `act4.benton`; fact `c16.i-approach` |
| **complete** | The long room; Sloane in the chair marked AXIOM, CLIENT; Benton by the door if he walked her in; Celeste stands ("It's a reunion."). | — | — |

**Tests:** `tests/state/institutional-act4.test.ts` (with Ch17–18), on real golden saves through Institutional Ch7–15.

**Deepening pass (2026-09-30):** three moments, each with a neutral pick; tests use a `NEUTRAL` walker (`i16-dawn-quiet`, `i16-reply-pin`, `i16-leave-go`).

**Size (honest):** ~0.83–1.09k at pass 1; ~0.97k (walk, alone) to ~1.35k (inside) after deepening, against the ~4.5k target.
