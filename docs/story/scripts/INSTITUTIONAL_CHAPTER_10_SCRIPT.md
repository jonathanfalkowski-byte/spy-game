# Institutional · Chapter 10: "A Very Good Officer" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_10_A_VERY_GOOD_OFFICER_DESIGN.md](../INSTITUTIONAL_CHAPTER_10_A_VERY_GOOD_OFFICER_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_10_SHE_KNOWS_DESIGN.md](../CHAPTER_10_SHE_KNOWS_DESIGN.md).

- **Code:** `src/content/chapter10-institutional.ts`. It is wired through:
  - `src/content/chapter10.ts`: phase definitions, `place10`, blocks, choices, and the begin from an Institutional
    `chapter9.complete`;
  - `src/content/chapter14.ts`: the Institutional Ch14 bridge now starts from `chapter10.complete` when Ch10 is enabled
    ("[Chapters 11–13 · institutional road — in development]"), and from `chapter9.complete` only when it is not;
  - `chapter14-institutional.ts`: Celeste's Tuesday call opens "I told you at breakfast, darling. A very good officer."
    when `inst.log10` is set;
  - titles in `src/ui/App.tsx` (A VERY GOOD OFFICER), masters in `src/ui/environment-art.ts`, and node ids in
    `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER10`.
- **Entry:** `chapter10.begin-institutional` ("Monday").
- **End:** the shared `complete`, with Institutional blocks; then Ch14's `begin-institutional`.
- **Naming:** phases are `card → club → log → pages → fridays → nightfall`. Choice ids carry `i10-`.
- **Keys:** `inst.log10` (gave / doctored / refused), `inst.celeste10` (trusted / fooled / refused), `inst.pages10`
  (old / work / report), `inst.told10`; sub-state `c10.i-card`, `c10.i-adrian`, `c10.i-night*`; facts `c10.i-order`,
  `c10.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **card** | A grey Axiom envelope, AX-7A, in capitals like Sloane's, with crossed sevens: *Breakfast? Wednesday. The Lindqvist, seven. — C.* | **i10-card-go** · **-sloane** ("That isn't my hand. It's very good.") · **-gate** (Terry: "A lady for you, madam. She's brought pastries.") | `c10.i-card` |
| **club** | The Lindqvist, or the pavement outside the staff gate. The inventory: AX-7A; one scope term quoted exactly; Records with Victoria in the car ("Elias tells me everything"); never the copy or the note; Daniel. "Eat your eggs, Adrian." | **i10-adrian-composed** · **-ask** · **-walk** | `c10.i-adrian` |
| **log** | "Victoria is a very good officer. … She'll never survive us. … Unless you help me." The log, every Friday; the black phone. Benton's Ch8 log remembered (Sloane's version: "wrong in eleven places"; hers: "those three very well chosen"; refused: "He was quite hurt"). | **i10-log-give** · **-doctor** · **-refuse** | `inst.log10`, `inst.celeste10`; fact `c10.i-order` |
| **pages** | Page seven: CELESTE LAURENT AT BREAKFAST WITH AXIOM'S NEW ANALYST. Sloane at her desk: "You didn't tell me you knew Celeste Laurent." | **i10-pages-old** · **-work** · **-report** (by answer: "thank you for telling me after" / "Let me choose the lie on Fridays" / "I'd rather pay than be sold") | `inst.pages10`, `inst.told10` |
| **fridays** | The week: the Friday photograph; Benton outside room 412 for a debrief that doesn't exist; or Sloane's budget cut by a third and "That was a small one. Friday?". The Vesper invitation in Sloane's in-tray: *do bring your operative. C.L.* | **i10-fridays-on** | — |
| **nightfall** | Friday night. | **i10-night-daniel** (as a colleague at the Feathers; or, if told, at his place with the consent flow) · **-julian** / **-sebastian** (if available) · **-maya** (if restored: "Whose leash is that?") · **-alone**; **i10-{partner}-no-sex** / **-sex** / **i10-leave**, then **i10-stop** / **i10-stay** | `c10.i-night*`; fact `c10.i-evening-consent` |
| **complete** | CELESTE LAURENT. GIVEN / DOCTORED / REFUSED. (SLOANE KNOWS.) The Vesper invitation pinned beside it. | — (Ch14 bridge) | — |

**Tests:** `tests/state/institutional-ch10.test.ts`, on real golden saves through Institutional Ch7–8 and the shared
Ch9: the entry; **give** (reported to Sloane, a night with Daniel who knows, then Ch14 with the breakfast callback;
authenticates); **doctor** (shown to Sloane first, Elias's pretty log, room 412); **refuse** (Celeste at the gate, the
budget cut).

**Size (honest), pass 1:** ~0.85k (quiet) to ~1.04k (engaged), against the ~4.5k target.
