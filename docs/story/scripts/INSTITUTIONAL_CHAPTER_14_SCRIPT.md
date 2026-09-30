# Institutional · Chapter 14: "Officer of Record" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_14_OFFICER_OF_RECORD_DESIGN.md](../INSTITUTIONAL_CHAPTER_14_OFFICER_OF_RECORD_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Route: [../INSTITUTIONAL_ROUTE_DESIGN.md](../INSTITUTIONAL_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_14_SLOANES_TURN_DESIGN.md](../CHAPTER_14_SLOANES_TURN_DESIGN.md).

- **Code:** `src/content/chapter14-institutional.ts`. It is wired through:
  - `src/content/chapter14.ts`: phase definitions, `place14`, blocks, choices, and the begin from an Institutional
    `chapter9.complete` (the interim bridge);
  - titles in `src/ui/App.tsx` (OFFICER OF RECORD), masters in `src/ui/environment-art.ts`, and node ids in
    `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER14`.
- **Entry:** `chapter14.begin-institutional` ("Go on to the inquiry"), with a "[Chapters 10–13 · institutional road —
  in development]" bridge paragraph, until Institutional Ch10–13 exist.
- **End:** the shared `complete`, with Institutional blocks and "[Chapters 15–18 · institutional road — in
  development]".
- **Naming:** phases are `notice → confession → wire → channels → hearing → dusk`. Choice ids carry `i14-`.
- **Keys:** the shared Act III keys Ch15 reads: `c14.answer` (countered / refused / complied), `act3.sloane` (truce /
  held / shut → allied / handed / shut), `c14.file`, `act3.adrian-burned`, `act3.home`, `act3.celeste-afraid`,
  `act3.terms`; plus `inst.way14` (ally / proof / cut), `inst.authority` (formal / regulator / benton),
  `inst.benton-exposed`, `c14.maya-room`, `c14.i-*`; facts `c14.verdict`, `c14.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **notice** | Monday, 08:05. The all-staff notice: an inquiry into the procurement of PROJECT EVE, led by Compliance (M. Reyes); V. Sloane suspended. No grey envelope; the backup number rings out. | **i14-notice-maya** (the stairwell, thirty seconds: "Nobody gave me you.") · **-daniel** (his hand on the back of her chair) · **-screen** | `c14.i-notice` |
| **confession** | Monday, 22:00, Level 71, the tape across the door. Sloane's account (shared canon) across a desk she may not touch; the ORACLE verdict with C. Laurent's signature. With the note kept: "I counted the pages in the car." | **i14-sloane-hear** (truce; the sheet) · **-hold** ("You'll sign for the truth now.") · **-shut** (the sheet left on the desk) | `act3.sloane`, `c14.file`; fact `c14.verdict` |
| **wire** | Tuesday, the black phone: "Tell the inquiry she knew about the placements. … You'll have her chair by Christmas." Adrian's name, the regulator, the Courier, the flat. | **i14-wire-yes** ("Good girl.") · **-no** · **-silent** | `c14.i-wire` |
| **channels** | Wednesday, Compliance, the glass room; Maya switches the recorder on in front of her (with *her people*: "nobody can give you me"). | **i14-maya-on** · **-off** ("Thirty seconds.") · **-nothing**. Then the way: **i14-way-ally** (only if Sloane heard or held, with evidence) · **-proof** · **-cut** | `c14.maya-room`, `inst.way14`, `c14.answer`, `act3.*`, `inst.authority`, `inst.benton-exposed` (ally, if she found the empty box) |
| **hearing** | Friday, Level 12: Maya in the chair; Sloane alone; Benton; Daniel. **ally:** "Entered. The vendor knew."; Benton's drawer, the PROJECT EVE (I) file. **proof:** "I am Project Eve. I was Adrian Vale." Daniel: "Yes. That's him." (if told) or "I can't be sure."; a new lock on Saturday. **cut:** Sloane's resignation, dated that morning; Benton her handler; "Nobody had to be unkind." | **i14-hearing-out** | — |
| **dusk** | Friday night. | **i14-evening-daniel** (only if told; at his flat above the launderette; the consent flow) · **-julian** / **-sebastian** (if available) · **-maya** (off the record; if restored) · **-alone**; **i14-{partner}-no-sex** / **-sex** / **i14-leave**, then **i14-stop** / **i14-stay** | `c14.i-evening*`; fact `c14.i-evening-consent` |
| **complete** | The third card: OFFICER OF RECORD: CLEARED. SHE OWES ME. / CLEARED. I SAID IT MYSELF. / RESIGNED. BENTON ABOVE ME.; BENTON = MERIDIAN. E.V. (I) FOUND.; the Vesper next, with Axiom's authority, without it, or Benton's version. | — (Ch15–18 in development) | — |

**Content:**
- Sloane ends as a person in the machine on every way (reinstated and owing; cleared by Evelynn's testimony; resigned).
- Every order and cost is non-sexual: the name, the flat, the rank, the cover.
- Daniel is a partner here only if he was told in Ch8.

**Tests:** `tests/state/institutional-ch14.test.ts`, on real golden saves through Institutional Ch7–8 and the shared
Ch9:
- the entry through the bridge;
- **the ally** (the torch and the note in Ch8; Daniel told): the verdict, Benton's drawer, a chosen night with Daniel;
  authenticates;
- **the proof** (Sloane shut out, so the ally way is closed): the name spent, the flat lost;
- **cut her loose** (with *her people*: Maya's line): the resignation, Benton above her.

**Size (honest), pass 1:** ~1.05k (quiet) to ~1.42k (engaged), against the ~4.5k target.
