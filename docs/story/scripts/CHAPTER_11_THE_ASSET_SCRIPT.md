# Chapter 11 — "The Asset" (script: flow and flags)

Design: [../CHAPTER_11_THE_ASSET_DESIGN.md](../CHAPTER_11_THE_ASSET_DESIGN.md) (approved 2026-09-25, all six
decisions as recommended). Code: `src/content/chapter11.ts` (the wording lives there), `src/content/leverage.ts`
(the board), `src/ui/Chapter11work.tsx`. Gated behind `VITE_EVE_CHAPTER11` (content revision ≥ 19), entered from
an own-power `chapter10.complete` with **begin** ("The first Thursday").

Phases, each a scene with its own title and place:

`arrival` → `viewing` → `upstairs` → `order` → `ending` → `after` → `complete`

## `arrival` — The First Thursday (20:00 · THE VESPER GALLERY)

Dressing by `c10.green` (the gala green, Odile's, her own, or the black); Mr Anand's centimetre if
`c9.tailor = alter`. *Pending* invitation: the car she booked, and Mr Pryce holding the door if
`c8.pryce` (place line 19:30 · The car she booked); *accepted*: a taxi on her own money. The Vesper:
the window empty tonight, the walls hung with lit, empty frames; if `c9.auction`, her portrait is
the one full frame.

**How she walks in** (`c11.entry`): **arrive-star** (the face they know) · **arrive-quiet** (the
edge; neutral) · **arrive-defy** (Theo on her arm, if he is in play and was not betrayed).

## `viewing` — The Viewing (20:30 · THE LONG ROOM)

Celeste in black silk; her line on the dress. The clients: Halvorsen, the woman in grey at his
elbow, a minister's wife, the man from the Gulf fund; Julian, for Helix, if he is in play; Theo, if
brought. The talk of placements: "It is not a party. It is a viewing."

**How she works the room** (`c11.room`): **room-dazzle** (Halvorsen: the board is upstairs) ·
**room-listen** (neutral; the catalogue, in the reading room) · **room-dance** (the man from the
Gulf fund; her lead; a hand on the small of her back; "You're on page seven").

**Iris** in the powder room: "You're new. They put you in the green." (`c11.iris-met`):
**iris-how** · **iris-anna** (if `c9.kessler = follow`) · **iris-out** (neutral; "Nobody leaves,
darling. We're ended… I'll show you the stairs.").

## `upstairs` — Upstairs (21:40 · THE PRIVATE FLOOR)

The quartet breaks; Celeste has gone up; the board sits tonight if `act3.board-day`.

**How she gets up** (`c11.up`): **up-stairs** (the service stair in stockings; Mr Pryce on the
landing turns a page) · **up-escort** (the minister's wife) · **up-iris** (only after
**iris-out**; neutral in the goldens is up-stairs).

The corridor: the board's door ajar ("The defect, as you call it, is an asset in a public
placement"); the reading room; *The Autumn Collection*: page seven, *E. V. · Reissued · Public
profile · Available for placement from the first Thursday of next month*; two pages on, *I. M. ·
Four years · Ending.*

**What she takes** (`c11.catalogue`): **cat-photo** (a fact; a board asset) · **cat-page** (a
fact; Celeste: "I shall have it bound in again, and keep the torn edge.") · **cat-leave** (neutral).

## `order` — The Second Order (22:15 · THE TERRACE)

The envelope with the Vesper's mark: "Put this in her bag before she leaves… I would like her to end
tonight, darling, and I would like you to be the one." Maya, escalated: *renewed* → "Renewals can be
reviewed." *suspended* → "A review can become a dismissal."

Answer (`c11.answer`, a fact; `act3.placement` set): **order-comply** (Maya's clearance → renewed,
restored if it was suspended) · **order-refuse** (renewed → suspended; suspended → revoked) ·
**order-counter** (only with something built: `case.strength = strong`, `act3.celeste-surprised`,
`c10.poison`, `c11.catalogue = photo`, Theo brought, or Julian an ally in play;
`act3.celeste-surprised` → once or twice).

## `ending` — Ending (22:40 · THE CLOAKROOM)

The hatch and the rows of coats; ticket 41 from her coat pocket (`c7.robe = coats`) brings out the
first Evelynn's coat, kept fourteen months.

- **Complied:** the bag, the lining. **plant-look** ("She looked at me as if I were the next page.")
  / **plant-away** ("I did it well."). `c11.iris = burned`.
- **Refused:** the envelope torn into the river. **refuse-tell** ("Do your own ending." / "Pity. I did
  so hope.") / **refuse-silent** (the black phone at midnight: "Pity."). `c11.iris = spared`.
- **Countered:** (with `c10.poison`, the memo re-forged to point at Halvorsen's own head of security)
  the envelope in Iris's hand. **free-go** (through the kitchens) / **free-stay** ("Now I know.
  That's worth four years. I owe you, new girl."). `c11.iris = free`, `act3.ally.iris = in`.

## `after` — What the Clients Saw (MIDNIGHT · AFTERWARDS)

Maya's Monday by answer and clearance; Iris after (the brass plate / "I know what you didn't do" / a
postcard with a number / a card: "When you want to see how the house works"); C. on the black phone
("Lovely." / "Twice now. I am starting to enjoy you."); a new card on the wall: a date.

**The evening** (optional, only with a partner not betrayed, `eveningPartners11`; plus Theo if
brought): **evening-julian** ("I have never once watched one from the wall before. I didn't like
it.") / **evening-theo** / **evening-sebastian** → **evening-<p>-no-sex** / **evening-<p>-sex** /
**evening-leave** → **evening-stop** / **evening-stay**. Heat 3, consent recorded
(`c11.evening-consent`), fades. Or **after-home**.

## `complete` — A Date

> t: Available from the first Thursday of next month. She has put a date on me. Then I have a date
> too.

## Board, flags, tests

- Board: Celeste's entry holds the placement date and wants "Iris Moreau, ended, by your hand" once
  the second order is answered; assets gain the catalogue (photo or page) and Iris (if free).
- Flags: `c11.entry`, `c11.room`, `c11.iris-met`, `c11.up`, `c11.catalogue`, `c11.answer`,
  `c11.moment`, `c11.iris`, `c11.evening*`; Act III keys `act3.maya-clearance`,
  `act3.celeste-surprised`, `act3.ally.iris`, `act3.placement`.
- Tests: `tests/state/chapter11.test.ts`; goldens `tests/fixtures/rev19-chapter11-golden.json`
  (refuse-escalated, comply-quiet, counter-surprised; capture with
  `EVE_CAPTURE_CH11=1 npx vitest run tests/tools/capture-chapter11-golden.test.ts`).

## Deepening pass (2026-09-25)

Every scene written as a set piece (the dressing, the doorman, the numbered brass plates;
Halvorsen on Iris; the board on Maya, "a handle", and on Iris, "Tonight"; the catalogue's notes,
"Tolerates public exposure; seeks it"; Celeste's first ending, in Lisbon; the room thinning), plus
four moments, each with a neutral pick for the goldens:

- **Celeste by the terrace doors** (`viewing`, after the room): "Do you like being looked at?"
  (`c11.looked`): **look-yes** ("So did she. It was the only thing about her I never had to
  teach.") · **look-turn** ("Do you like selling it?") · **look-silent** (neutral).
- **Two board members in the corridor** (`upstairs`, after the catalogue) (`c11.hide`):
  **hide-curtain** (neutral; "Page seven. Even better in person, I thought.") · **hide-brazen**
  ("The powder room is downstairs, Ms Vale. So is everything else you're looking for.") ·
  **hide-down**.
- **The last minutes with Iris** (`ending`, before the cloakroom): "Walk me out?" (`c11.walk`):
  **walk-name** (she was Helen) · **walk-laugh** · **walk-quiet** (neutral).
- **The way home** (`after`, before the evening) (`c11.way`): **way-car** (Mr Pryce: "I drive. I
  don't do the endings."; if Kessler was followed, "I drove Miss Kessler home, once.") ·
  **way-walk** (neutral). Celeste's word at midnight follows; Maya's Monday and Iris's word move to
  the close.

## Second deepening pass (2026-09-26)

Two moments every path passes through, each with a neutral pick for the goldens (`GATED_DEFAULTS`):

- **The board-room door** (`upstairs`, after the voices through the door, before the reading room; the corridor
  now pauses at "The door stands an inch open") (`c11.gap`):
  - **gap-look**: the board through an inch of light: the white-haired man with the fountain pen, the woman with
    glasses on a chain, the signet ring, the young man typing the minutes, Celeste at the window. The woman with the
    glasses looks straight at the gap and says nothing. This seeds Deverell, Soames and the cataloguer for Chapters
    15 and 17.
  - **gap-listen**: her price. "Two, the first year" becomes "Four. And not to the Gulf … somebody with a regulator
    in his way", which seeds Chapter 13. Then "I am fond of all of them, Marguerite".
  - **gap-pass** (neutral).
- **On the terrace** (`order`, after Celeste's speech, before the answer) (`c11.terrace`):
  - **terrace-ask**: the man in Lisbon's last words: "You look lovely in green … It is a tombstone, darling".
  - **terrace-glass**: she takes Celeste's glass and drinks from it. For once Celeste does not know what to do with
    her face; then "Careful, darling. That is exactly how it started with her."
  - **terrace-river** (neutral).

## Size (honest)

Pass 1: ~1.7k words on the golden paths. After the first deepening pass, ~3.5–3.6k. After the second:
**~3.6–3.7k on the golden (quiet) paths**, and ~4.1–4.4k when played engaged, against the 7k budget. The quiet
picks are short by design, so most of this pass's gain shows up only when the new options are chosen. What is left
is the evening.
