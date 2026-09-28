# Predator · Chapter 16: "The Seventh Chair" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_16_THE_SEVENTH_CHAIR_DESIGN.md](../PREDATOR_CHAPTER_16_THE_SEVENTH_CHAIR_DESIGN.md)
(approved 2026-09-27, all eight decisions as recommended).

- **Code:** `src/content/chapter16-predator.ts`, wired through `src/content/chapter16.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER16`.
- **Entry:** `chapter16.begin-predator` ("Thursday") from the Predator `chapter15.ledger`.
- **End:** its own phase, `room`. The Predator road stops here, in development, until the Ch17 variant exists.

Phases: `floor → want → beside → order → armour → door → room`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **floor** | A quarter to five: "not fear … the thing you felt in Marcus's office the day you said 'Yours'". Every card on the floorboards, and the reasons, counted by `case16`: the client ledger and Nell's order +2 each; the recordings (and her receipt), the nine flats, clause 14.3, the letters, the fund's schedule and the kept black phone +1 each; up to three standing witnesses +1 each. Bands: thin < 3 ≤ supported < 6 ≤ strong < 9 ≤ overwhelming. The honest card. The key on its ribbon ("You are giving it back to her tonight"), or the copy. | **case-set** | `act4.case` |
| **want** | Six o'clock: "She has laid a chair for you … Beside her." (With the account kept, or Ch13 complied: "It would not be a leap. It would be a step.") | **aim-seat** (as her successor, eyes open) · **aim-wound** ("open Helix like a coat and show them the knife") · **aim-helix** (only if the money wasn't spent in Ch15, or Lucien or Halvorsen is at hand) · **aim-nell** (Nell's order taken, or her name known; the watch, wound) | `act4.aim` (seat / wound / helix / nell) |
| **beside** | Who she is willing to put in that room. | Up to two inside, from `insiders16`, minus anyone spent in Ch15 (`c15.cost-who`):<br>• **inside-halvorsen** ("This is the lunch");<br>• **inside-marcus** (back into the room where he was bought);<br>• **inside-lucien** (the bank);<br>• **inside-julian** (Helix's seat);<br>• **inside-marsh**, **inside-iris**, **inside-nora**, **inside-maya**;<br>• then **inside-done**, or **inside-none**.<br>Then outside: **outside-pryce** (not spent) or **outside-switch**. | `act4.inside`, `act4.inside-done`, `act4.outside` |
| **order** | Noon: what goes first, and what stays in the pocket. | **first-*** from `cards16` (clients / nell / recordings / flats / clause / page / letters). Then **held-*** from the rest, or **held-none**. On the seat aim, the held card is labelled "Your price". | `act4.first`, `act4.held` |
| **armour** | Four o'clock, the mirror. | **wear-blue** (Marcus's midnight blue) · **wear-black** · **wear-green** (her colour, worn to her table). Then **clasp-julian** / **clasp-marcus** / **clasp-lucien** (each only if not spent; "Come back.") · **clasp-alone**. Heat 1–2. | `act4.wear`, `act4.dressed-with` |
| **door** | The embankment. Three photographers if she is public (Ch5, the press road in Ch14, or the Ch15 visibility cost), or an empty road. | **arrive-front** · **arrive-car** (Pryce; "Ms Laurent's compliments") · **arrive-helix** (with Julian, if an ally and not spent) | `act4.arrive`, `act4.seen`; fact `c16.p16-arrive` |
| **room** | "They're expecting you … Good luck, Ms Vale." Deverell in the chair, Marguerite Soames, three others from the ledger; her people at the end; Celeste in black, standing. "There are seven chairs at the table and six people. The seventh chair is beside hers, and it has been pulled out." The last thought is by aim. | — (Ch17 begins here) | — |

**Shared keys:** `act4.case`, `act4.aim` (Predator values; for the shared Ch17, wound ≈ expose, helix ≈ terms,
nell = nell, seat is Predator's own), `act4.inside`, `act4.outside`, `act4.first`, `act4.held`, `act4.wear`,
`act4.arrive`, `act4.seen`.

**Content:**
- No order, so no coercion.
- The seat is a real, chosen ending, never a trap.
- The clasp is chosen, heat 1–2.

**Tests:** `tests/state/predator-ch16.test.ts`. A real save played through the whole Predator road (Ch6–15):
- the entry and the honest count;
- the seat, with Julian at the clasp, the page as her price and Celeste's car (authenticates);
- the wound, in full view;
- Helix, in Julian's car, with Pryce spent;
- the spent ally left out of the room.

**Size (honest), pass 1:** ~1.0k (quiet) to ~1.1k (engaged), against the ~4k target. The leanest first pass on the
road; a deepening pass would give each person who comes a longer scene, and the floor at five in the morning more of
Adrian.
