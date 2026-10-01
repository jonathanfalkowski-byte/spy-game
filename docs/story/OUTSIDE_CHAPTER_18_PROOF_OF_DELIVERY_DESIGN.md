# Outside · Chapter 18: "Proof of Delivery" (design)

**Act IV · Outside route (lane id `outside`) · the shared close ("The Position"), with Outside framing**
**Budget: 0.7h / ~6k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §5: the Outside positions (expose with provenance owned / trade quietly / cut the
  source / Nell's name), **Rafe's endings by what she made him** (he stays, a partner only if chosen after he told her, or a friend who
  rings at 02:40 to say nothing is wrong; he takes Nell's file home to Singapore and to Nora; or he is cut, and sends one last page,
  blank), and **Sloane ends as a person in the machine** (burned, traded, spared, or the one who reads the pages out loud).
- [CHAPTER_18_THE_POSITION_DESIGN.md](CHAPTER_18_THE_POSITION_DESIGN.md), the shared canon: no ending topples Meridian, none is capture,
  none leaves her holding less than she walked in with; the switch (armed / handed / disarmed); the name (none punished); a chosen night
  a year on, heat 3 at most; the last card on the last wall.
- [INSTITUTIONAL_CHAPTER_18_NO_FURTHER_ACTION_DESIGN.md](INSTITUTIONAL_CHAPTER_18_NO_FURTHER_ACTION_DESIGN.md), the lane-variant pattern.

**Status: APPROVED (owner, 2026-10-01: "do next recommendation", design and build as recommended) and BUILT, pass 1: the Outside road is
complete, Ch7–18.** Script: [scripts/OUTSIDE_CHAPTER_18_SCRIPT.md](scripts/OUTSIDE_CHAPTER_18_SCRIPT.md); code: `src/content/chapter18-outside.ts`.

---

## 1. The chapter's job

The theme of the road is provenance, so the ending is a **proof of delivery**: the grey carbon docket a courier has signed when a thing is
handed over, with a box at the foot, SIGNED FOR BY. The last card is hers.

By the end of the chapter the player must:

1. **See what the board bought** (`act4.board`, `act4.terms`): the morning after, in the papers (the front page and the circled initial, if
   she published) or not; Celeste's last word (Lisbon / an orchid / nothing); and how she spends it (`end.morning`): read every word twice /
   Rafe (coffee on the iron stair if he heard it in the room; "tell him properly" on the cheap phone if not) / sleep.
2. **Hold her position** (`end.position`, aim + terms) and see **where Sloane ends** (`end.sloane` = witness | returned | sparing | gone, from
   her Ch14 fate): the one who reads the pages out loud (burned, expose), gone with a box and a typed postcard, sold back and unrepentant, or
   spared and acknowledged. Then **the switch** (`end.switch`): armed / handed / disarmed.
3. **Meet the people** (Maya, Iris, Marsh, Nora, the price of Ch15 come back) and **decide Rafe** (`end.rafe`): **stay** / **go home** with
   Nell's file and a ticket; or, if she cut him, a **blank page** (keep / post back / burn). Then **who she goes home to** (`end.with`): Rafe
   (only if he stays and a night with him was chosen), Julian, Sebastian, Maya, or nobody.
4. **Sign the docket** (`end.name`): Adrian Vale / Evelyn Vale / a new name. None punished; never Nell.
5. **A year later:** Meridian's new catalogue, with no page seven (look / burn / leave it in its paper); three rules of trade rewritten for a
   life, answering Ch7's, with margins in Rafe's hand or her own (`end.rules`); a chosen night (heat 3, consent in character, fades) or a quiet one.
6. **The last wall:** WHO IS HOLDING THE PAGE? (I AM.) / THE SOURCE. (RAFE LIM. ON THE STAIR, TUESDAYS. / HOME. / NOBODY. A BLANK PAGE.) /
   **PROOF OF DELIVERY.**

**What it must not do:** topple Meridian; strand her with less than she walked in with; make any ending capture; punish a name or a
partner choice; have Rafe make her Nell; make Sloane a romance; tell any new fact about how Nell died.

**Why it is thrilling, erotic and fun:** the thrill is the switch, the one lever she decides about calmly; the fun is Sloane reading the
pages out loud, Iris's one-word postcard, the missing page seven, and the margins coming back in a courier's upright hand; the charge is a
chosen night a year on, or a coffee on a cold iron stair.

## 2. Shape (phases)

`dispatch → delivery → consignee → docket → receipt → proof` (terminal; nothing is offered after `proof`).

The names avoid the shared Ch18 phases (`morning / position / people / name / later / complete`), Predator's (`papers / hold / owes / called /
year / last`), Executive's (`friday / settle / keys / dinner / signed / page / read`) and Institutional's (`debrief / disposition / light / floor /
particulars / scope / nfa`).

## 3. Keys

Written: `end.morning` (papers | rafe | sleep), `end.switch` (+ `end.switch-to`), `end.position` (`<aim>-<terms>`), `end.sloane`, `end.rafe`
(stays | home | blank; `c18.o-blank` keep | post | burn), `end.with`, `end.name`, `end.catalogue`, `end.rules`, `end.later` (+ `end.later-open`,
`end.consent`); fact `c18.o-evening-consent`. Read: `act4.*`, `act4.rafe-heard`, `act3.sloane`, `act3.switch`, `out.way14`, `out.cost15`,
`act3.ally.*`.

## 4. Decisions (all taken as recommended)

1. **Title "Proof of Delivery":** the courier's docket, signed for by her.
2. **Rafe's ending is a choice** (stay or go home), not a verdict: both keep the 02:40 call, and the difference is a Tuesday knock or a
   postcard from Singapore. If she cut him, a blank page is his last word, and she decides what to do with it.
3. **Rafe is a partner only if he stays and a night with him was chosen earlier;** otherwise a friend who rings.
4. **Sloane's end follows Ch14's fate:** burned (a witness, or gone), traded (returned to her desk, unrepentant), spared (acknowledged).
5. **The switch:** armed / handed / disarmed, as on every road.
6. **The name:** Adrian / Evelyn / new, on a delivery docket (SIGNED FOR BY).
7. **A year later:** the rules of trade from Ch7 rewritten as a life, margins by Rafe (stays or home) or by her own hand (cut).
8. **Build shape:** entered from an Outside `chapter17.complete`; goldens on the real Outside golden played through Ch10–17; Ch17's stop
   line steps aside when Ch18 is built; the Outside road ends at `proof`.

## 5. Art impact

Reuses the room over the water, the wardrobe/wall (shared set). New: the front page with a column headed CHECKED BY; Rafe on the iron
stair with two coffees; the grey docket with SIGNED FOR BY; the catalogue with no page seven; the last wall. These go on the consolidated
art list after the deepening passes.
