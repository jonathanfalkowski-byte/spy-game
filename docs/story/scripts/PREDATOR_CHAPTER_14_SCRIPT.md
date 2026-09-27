# Predator · Chapter 14: "Marcus Falls" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_14_MARCUS_FALLS_DESIGN.md](../PREDATOR_CHAPTER_14_MARCUS_FALLS_DESIGN.md) (approved
2026-09-27, all eight decisions as recommended).

- **Code:** `src/content/chapter14-predator.ts`, wired through `src/content/chapter14.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER14`.
- **Entry:** `chapter14.begin-predator` ("Marcus next") from the Predator `chapter13.ledger`.
- **End:** its own phase, `ledger` (the Celebrity `complete` is "The Board"). The Predator road stops here, in
  development, until its Act IV variants exist.

Phases: `dawn → case → safe (only if Pryce told her) → room → last → desk → evening → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **dawn** | 05:00, the wardrobe door. Every card: the Ch8 levers with their deals, L.S.F. ADVISORY, the Ch13 card, and MARCUS CHEN in the middle. "He hired me to be frightening." | **dawn-today** | — |
| **case** | Her office, three sheets of paper. The board (the hands she owns, counted by name), the press, the letter (always). | **way-board** (only if she owns enough hands) · **way-press** (only if Ch5 published her, and she used the press lever or has the private clause) · **way-letter** (always) | `c14.p-way`, `pred.way` |
| **safe** | Only if `c8.p-night = pryce`. Pryce at midnight: a key card, and "the number is his mother's birthday". The horse. Eleven years of copies, the fund's letters with a green C., and her own folder: the pencilled contract, and one item by her Ch13 road (the Claremont receipt with her name as operator / "V. declined. Reassign Stuttgart. Watch." / "Twice. Watch her." — "I am."). | **safe-her** · **safe-letters** · **safe-horse** (take nothing; leave it crooked) | `c14.p-safe`, `pred.safe` |
| **room** | **Board:** 08:00, the fortieth floor. Hollis moves; Varga confirms (used or spared, it reads differently); the audit chair reads the fund's schedule; the letters, if taken; Julian votes with her, against her in the open, or with her because she holds him. The report clause means none of them has ever seen her work. "Eleven minutes, by a show of hands." **Press:** the lift, HELIX'S HIDDEN FUND, her face on her terms, Marsh on the record if he is an ally. **Letter:** 19:00, three lines on Helix paper, the Novagen file, the letters if taken, the indemnity thought, and his pen. | Board: **room-watch** / **room-river**. Press: **room-lift** ("It's a good photograph.") / **room-desk** ("You look very well."). Letter: **room-wait** / **room-pen**. | `c14.p-room` |
| **last** | His office. His tie and watch on the desk; the chair from Leeds; the safe noticed (crooked horse / his copy of her / "She will know by lunch"). "She'll do this to you." A partnership against Celeste. | **last-refuse** · **last-take** (Marcus in exile, an Act IV ally) · **last-laugh** ("I already have the letters") | `pred.marcus` (refused / ally / laughed), `pred.ally.marcus`; the money want pays $20,000 |
| **desk** | The floor stands up. Her want paid: his bonus pool / his title on her door / his desk. Julian: coffee (ally), a fair fight (rival), or the page from Marcus's files with his own name on it (casualty). HR asks what the departing director keeps. | Casualty first: **julian14-keep** / **julian14-out** (he resigns from the executive committee). Then **mercy-none** · **mercy-chair** (the chair addressed to a council flat in Leeds) · **mercy-name** ("personal reasons") | `pred.julian14`, `pred.mercy`; fact `c14.p-fall` |
| **evening** | Night; nowhere she has to be. | **p14-evening-julian** (ally, not cooled) · **p14-evening-marcus** (only if he kept his name) · **p14-evening-alone**. Then the consent flow: no-sex / sex / leave, then stop / stay. It fades. | `c14.p-evening*`; fact `c14.p14-evening-consent` |
| **ledger** | His card comes down, with what he kept written on the back. A new card: MERIDIAN — THE BOARD. Celeste at midnight, by way ("Eleven minutes, darling. I timed it." / "Every front page in London" / "Marcus has resigned, darling. Personal reasons."), plus "Marcus tells me you laughed" and "do bring my letters". On a quiet letter road, Celeste does not know it was her. | — | — |

**The board's hands** (`boardVotes14`):
- Hollis if owned;
- Varga if the counsel lever was used or spared;
- the audit chair if she pulled the archive (the fund's schedule);
- Julian if he is an ally, or a casualty she kept.

Two are needed, or three against a rival Julian.

**Content:**
- The fall is financial, professional and public. A test scans the safe, room and last scenes for anything sexual.
- The evening is chosen, consent-gated, heat 3, and fades.

**Tests:** `tests/state/predator-ch14.test.ts`. Each runs from a real save through Ch6–9 and Ch13:
- the entry;
- the board (with the money paid and Julian's evening, replayed and authenticated);
- the safe and the letter (replayed);
- the quiet letter;
- a rival's extra hand, and a casualty's page;
- the press, with Marsh.

**Size (honest), pass 1:** ~1.1k (quiet letter), ~1.2k (quiet board), ~1.4k (board with Julian's evening) and
~1.7k (safe, letter and Marcus's evening), against the ~4.5k target. The next lift would be a deepening pass: the
night before the fall on every road, Marcus at greater length in his last scene, and the desk day.
