# Outside · Chapter 17: "Return to Sender" (design)

**Act IV · Outside route (lane id `outside`) · the shared room ("The Room"), with Outside framing**
**Budget: 0.9h / ~8k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4 and §5: the Outside positions (expose with provenance owned / trade quietly /
  cut the source / Nell's name) and **Rafe hears, in Ch17, how Nell died; he is in the room, or at the door, when Celeste says it.**
- [CHAPTER_17_THE_ROOM_DESIGN.md](CHAPTER_17_THE_ROOM_DESIGN.md), the shared canon: one room, one hour; the board's decision scaled by the
  case; Nell's death told, not shown (the Jakarta order was Celeste's; on the Saturday she sent a car; Nell would not get into it and
  walked the harbour wall in the dark with the bad leg; the driver watched her fall and did not stop; he rang Celeste at six; Celeste
  rang Nora at seven: responsibility, not a push).
- [INSTITUTIONAL_CHAPTER_17_FIT_FOR_PURPOSE_DESIGN.md](INSTITUTIONAL_CHAPTER_17_FIT_FOR_PURPOSE_DESIGN.md), the lane-variant pattern.

**Status: APPROVED (owner, 2026-10-01: "do next recommendation", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_17_SCRIPT.md](scripts/OUTSIDE_CHAPTER_17_SCRIPT.md); code: `src/content/chapter17-outside.ts`.

---

## 1. The chapter's job

The shared room is a boardroom with no judge. On this road Celeste's best weapon is **provenance**: the pages came by a crooked road, from
a courier, unsigned, so the cargo must be crooked too. The answer was built in Ch16: she signed every page. And the room is where
**Rafe hears how Nell died**, with everyone else, in the one place Celeste can't stop it.

By the end of the chapter the player must:

1. **Face the exhibit.** Celeste introduces her by catalogue number ("E. V. (II). Unclaimed."), reads the clothes, and, if Rafe is in the
   room, names the post: "Do sit, Mr Lim. There isn't a chair for the post." A place card reading UNCLAIMED (claim it / pocket it /
   leave it), then how she opens (to the room / to Celeste / silent) and the first card lands (`act4.first`).
2. **Answer the provenance attack** (`act4.press`): **every page is signed** (holds if she checked ≥ 3 pages; otherwise Celeste finds the
   one marked TAKEN ON TRUST) / **own the flawed page first** (the one Rafe altered; always honest, always helps) / **the cost** (the
   people).
3. **Resolve the source in front of the board** (`act4.rafe-beat` = vouch | stand | use): "He carried it. I signed it." / let him stand
   on his own record (one line: "Ten years. Tuesdays. I never read one. I read the last one.") / put him on the record (his ledger, his
   name on every handoff: he can never disappear again). If he is not in the room the same three options are about his name.
4. **Take Celeste's last move,** a purchase: buy it all, strike her name from every catalogue, and keep the courier safe. Refusable at no
   cost: **refuse / draw her out / laugh**. Then **the held card lands** (the Rotterdam slip hardest: Rafe, by the wall, reads it).
5. **Hear the Saturday.** The canon account of Nell, plus the Outside addition: **Celeste sent the courier to Rotterdam that morning so
   nobody would be on the ferry for Nell to walk to.** Then the name (`act4.named` = ask / nora / **rafe** / wait; `act4.nell-said` =
   eleanor / evie / no). If Rafe is in the room, he can be the one to ask, "Say her name, Mrs Laurent. Her whole one."
6. **The board decides** (`act4.board` = resigned / diminished / closed; `act4.terms` = full / partial / none) and the aim becomes terms
   (expose: referral and publication; trade: a written undertaking, with **no action against R. Lim**; cut: an undertaking; Nell: the
   minute records her name). A pen: **Rafe signs the minute** (R. LIM, COURIER) / she signs as witness / the board signs its own.
7. **One minute alone** with Celeste: "Did you ever like being her?" and the orchid.
8. **The front door.** Rafe on the top step (room) saying *Eleanor*, or at the river door taking off his cap.

**What it must not do:** show Nell's death; sexualise anything; make Rafe call her Nell; punish refusing the offer; topple Meridian.

**Why it is thrilling, erotic and fun:** the thrill is Celeste's best attack, provenance, answered by one honest page; the fun is a courier
being named in the room that never looked at him, signing his own name; the charge is the long appraisal between the two women, nothing
touched.

## 2. Shape (phases)

`bearing → provenance → postman → terms → saturday → verdict → quiet → complete`

The names avoid the shared Ch17 phases (`opening / defect / sloane / turn / nell / vote`), Predator's (`sit / market / marcus / offer /
eleanor / hands / minute`), Executive's (`product / clause / officer / gift / wall / tally / alone`) and Institutional's (`exhibit / warranty /
record / leash / harbour / ruling / aside`).

## 3. Keys

Written (the shared Ch18 contract): `act4.open`, `act4.press` (signed | flaw | cost), `act4.offer` (refuse | draw | laugh), `act4.held-landed`,
`act4.named`, `act4.nell-said`, `act4.board`, `act4.terms`, `act4.last`; Outside: `act4.rafe-beat` (vouch | stand | use), `act4.rafe-heard = room`
(unset when he hears later); `c17.o-card`, `c17.o-minute`. Read: `act4.*` from Ch16, `act4.rafe`, `out.slip15`, `out.verified`.

## 4. Decisions (all taken as recommended)

1. **Title "Return to Sender":** the courier is returned to the room that never looked at him, and the offer is a purchase.
2. **Celeste's attack is provenance;** the defence is an honest ledger, not a perfect one. Owning the flawed page always helps.
3. **Rafe is named in the room** ("Mr Lim") and chooses nothing: Evelynn chooses what he is (vouch / stand / use).
4. **Celeste's last move is a buyer's offer** (the trade ending), refusable at no cost; drawing her out helps the board.
5. **The Saturday adds Rotterdam:** she sent the courier away so Nell would have nobody to walk to. Responsibility, not a push; death told,
   never shown.
6. **Rafe may ask for the name** if he is in the room; if he is at the door or absent, he hears it from Evelynn in Ch18.
7. **Rafe signs the minute** if present: the first time anyone has watched him write his own name in that house.
8. **Build shape:** entered from an Outside `chapter16.complete`; goldens on the real Outside golden played through Ch10–16; Ch18 follows.

## 4a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no `act4.*` key changes; nothing sexual; the offer stays refusable at no cost):

| Moment | Where | Choices (`c17.o-…`) |
|---|---|---|
| **Her hands** | after the place card, before she opens (`bearing`) | **o17-hands-ledger** (a palm on the closed ledger) · **-pencil** (held ready to initial) · **-still** (folded in her lap) |
| **The recess** | before Celeste's offer (`terms`; the offer now follows the pick) | **o17-recess-corridor** (Celeste follows to the black window: attention, nothing touched) · **-wall** (Rafe, only if he is in the room: "Whatever she offers, don't take it for me. I'd rather be found.") · **-table** (neither moves; the water jug) |
| **The look** | after the Saturday is told, before the name (`saturday`) | **o17-hear-look** (at Celeste, until she looks down first) · **-rafe** (at Rafe by the wall; at the river in the glass if he is at the door) · **-down** (at the walnut) |

The recess moves the offer behind the pick (`offerBlocks`), so the offer text appears after she chooses. No golden recapture is needed.

## 5. Art impact

Reuses the long room as a boardroom (shared set). New: Rafe by the wall with his hat; the slip on the walnut with its brass pin; Rafe's
hand signing a minute; the evening florists' van from above. These go on the consolidated art list after the deepening passes.
