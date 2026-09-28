# Executive · Chapter 14: "The Signature" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md](../EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter14-executive.ts`. It is wired through:
  - `src/content/chapter14.ts`: phase definitions, place lines, blocks, choices, and the bridge from Ch9;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER14`.
- **Entry (interim):** `chapter14.begin-executive` ("Go on to the signature: this road's Act III chapters are in
  development") at an Executive `chapter9.complete`, which used to be a dead end. When the Executive framing of
  Chapters 10–13 exists, the entry moves to an Executive `chapter13.complete`.
- **End:** the shared `complete`, with Executive blocks and a closing `[Chapter 15 · executive road — in
  development]`.
- **Naming:** phases are `called → silence → truth → ways → boardroom → night`. Choice ids carry `x14-`; keys live
  under `exec.*` and `c14.x-*`.

**Planned keys from Ch10–13, read with defaults:**

| Key | Values | Default |
|---|---|---|
| `exec.calendar` | gave / doctored / refused | refused |
| `exec.sign11` | signed / warned / refused | refused |
| `exec.told12` | told / not | not |
| `exec.told13` | before / after / never | never |

**Trust** (`trust14`) is `exec.trust`, plus 1 for `told12`, plus 1 for `told13` (before or after), plus 2 for
truth-all or 1 for truth-order. **He knows** (`knows14`) if `exec.file = told`, or `sign11 = warned`, or truth-all.
**Enforce opens** when he knows, trust is at least 3, and `exec.file` is set.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **called** | Monday 06:10. 14.3 is invoked on every facility he signed: the Vesper deal if `sign11 = signed`, otherwise Antwerp. What he says depends on `exec.file` / `sign11`. | **x14-to-him** · **x14-to-file** · **x14-to-window** (neutral) | `c14.x-called` |
| **silence** | Monday night: Celeste in the car, Mr Pryce at the door. "Thank you for his calendar" if she gave it. The order is his silence; refusal means the building, the papers, and Adrian's name to Axiom. | **x14-celeste-think** · **-doubt** · **-silent** (neutral) | `c14.x-celeste` |
| **truth** | Tuesday, his flat, his glasses on the table. | **x14-truth-all** (the order, the calendar, the Vesper pen, her name if untold; "Were you ever ordered to love me?" "No. Never. Not once."; fact `c14.x-truth`) · **x14-truth-order** · **x14-truth-none** | `exec.truth14` |
| **ways** | Wednesday. If `exec.marcus8 = open`, Marcus's memo about the missing facility. Three sheets of paper, each explaining whether it is open. | **x14-way-enforce** (gated) · **x14-way-spend** · **x14-way-fall**. Each ends with Thursday night: she fixes his tie at the window, "Whatever happens tomorrow." | `exec.signature` (enforced / spent / fell), `c14.answer` (countered / refused / complied) |
| **boardroom** | Friday 08:00, forty-four. Marcus with the fund's letter; Sloane in Axiom's chair. She collects if `exec.owes-sloane`, or asks at the same price if `exec.sloane8` was civil or deal. | **x14-sloane-accept** (`act3.sloane = allied`) / **x14-sloane-refuse**, or **x14-board-go**. Each plays the vote (below). | `exec.sloane14`, `exec.credentials`; fact `c14.x-board` |
| **night** | The ledger comes due (below). | **x14-night-julian** (not after the fall way unless he knew why), then the scope: **x14-julian-no-sex**, **x14-julian-sex** (if Ch6 warmed things, or she stayed with him in Ch7 or Ch8), **x14-leave**; then **x14-stop** / **x14-stay** (fades). **x14-night-maya** (if she is back) · **x14-night-alone** | `c14.x-night*`; fact `c14.x-evening-consent` |
| **complete** | The card: THE SIGNATURE. HIS, STRUCK. WITH HIM. / MINE, SPENT. HE STAYS. / HIS, SILENT. I KEPT THE ROOM. A kept thought by `exec.kept`. Then THE VESPER, with HIS CREDENTIALS. HE COMES., HIS APPOINTMENT CARD., or NO WAY IN BUT MINE., plus SLOANE'S FILE TOO. | — | — |

**The vote, by way:**
- **Enforced:** Julian reads 14.3 into the minutes himself. She shows the evidence (his tray note, the copy of page
  thirty-one, or the Rotterdam original), the minutes (the clause was never put to the board), and her own hand at
  the Vesper if it was there. Sloane: "Axiom was never told either." The guarantee binds only Marcus, the charge on
  Helix fails, and Marcus is suspended. Celeste: "We shall talk after my board meets."
- **Spent:** she takes it on herself (by right, with the files term) and resigns in the room (references
  unreserved, with the door term). Her paper and her face count if she has them. Julian stays, smaller. Celeste:
  "Axiom will have his name by Saturday."
- **Fell:** Julian resigns without contest and without looking at her. Marcus becomes interim COO. Celeste: "Nobody
  had to be unkind."

**The ledger** (spend or fall; nothing moves on enforce):
- **The flat:** if accepted, the key goes back. If paid: "It's mine. I paid for it." The lease holds.
- **The car:** if taken, Hal drives her home one last time (spend), or is Marcus's driver now (fall).
- **The card:** if taken, it is cancelled; the dress is hers.

**Content:**
- Julian is never a trap. His question is answered no, on screen.
- The orders are his calendar, his pen and his silence, never his body.
- Every threat is non-sexual.
- Kept is never punished: what was Helix's follows Helix, and what she paid for stays hers.
- The night is chosen, consent-gated, heat 3, and fades.

**Tests** (`tests/state/executive-ch14.test.ts`, a real save through Executive Ch7, Ch8 and the Ch9 bridge):
- the bridge;
- **enforce:** everything told, Sloane accepted, the night; replay and the save round-trip authenticate;
- **spend:** the kept ledger comes due, and Adrian's name is the price;
- **fall:** told nothing, no Julian evening, no way in but hers;
- **the planned Ch10–13 keys:** the Vesper signature and the calendar, with the trust gate tipped by Singapore.

**Size (honest), pass 1:** ~1.0k (quiet) to ~1.2k (engaged), against the ~4.5k target. It is the thinnest pass on the
road so far, and first in line for deepening.
