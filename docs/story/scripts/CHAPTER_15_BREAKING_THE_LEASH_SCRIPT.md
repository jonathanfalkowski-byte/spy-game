# Chapter 15 — "Breaking the Leash" (script: flow and flags)

Design: [../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](../CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md) (approved 2026-09-25, all
seven decisions as recommended). Code: `src/content/chapter15.ts` (the wording lives there), `src/content/leverage.ts`,
`src/ui/Chapter15work.tsx`. Gated behind `VITE_EVE_CHAPTER15` (content revision ≥ 19), entered from an own-power
`chapter14.complete` with **begin** ("The last month"). The Act III finale.

Phases: `crew` → `plan` → `vesper` → `archive` → `leash` → `phone` → `complete`

One shared heist spine for all three Chapter 14 roads (`c14.answer`: countered | complied | refused); the road
changes the framing and the stakes, not the scenes.

## `crew` — The Crew (THE WEEK AFTER · A BORROWED ROOM)

The road in: countered (Celeste's word, eight days; boxes moving out of the Vesper: "You have a week"), complied
(Sloane gone, passport taken; Celeste's kindness), refused (a hotel or Marsh's flat; the wall rebuilt from memory on
a wardrobe door). The card: I KEEP EVERYTHING, DARLING. "It is also an address."

**Who she asks** (`c15.crew`, `c15.crew.<who>`; one, then a second or **crew-done**): **crew-iris** (if an ally:
"I was the one who stocked it") · **crew-sloane** (unless shut; on the comply road she is found at a cottage on
the coast: "Not for you … my passport") · **crew-maya** (if she stayed: "I've audited worse buildings") ·
**crew-pryce** (if known: his flat across the gap, the keys on a green ribbon, "I suppose tonight I also open
doors") · or **crew-alone** (neutral).

## `plan` — The Plan (WEDNESDAY · THE WALL)

The table, the crew, what is known and not. **The way in** (`c15.way`): **way-iris** (the service stair, if Iris
came) · **way-pryce** (the front door, if Pryce came) · **way-window** (neutral; alone, a drainpipe over the bins) ·
**way-invited** (only with a crew: a midnight meeting with Celeste "to discuss the board" as cover; her second
message ever on the black phone).

## `vesper` — The Vesper at Night (THURSDAY · 02:00, or WEDNESDAY · 23:30 invited)

Dressed like a thief in her own showroom; the way in (the drainpipe; Iris's alley; Pryce's key in the front door;
Celeste and the old bottle). The reading room, and the board that is a door. **The snag** (`c15.snag`): the
doorman woken, or Celeste going to the panelling. **snag-talk** (neutral; the station-poster smile, or "the first
one you ended … Did he know?") · **snag-hide** (the coats, ticket 41 if `c7.robe = coats`; or reading the catalogue
over her shoulder) · **snag-bold** ("Go back to bed, Tomasz"; or following her to the panel: "It is kept at sixteen
degrees, and so am I"). Invited: at two she comes back in through the alley.

## `archive` — Everything (02:40 · THE ARCHIVE)

Steel cabinets, every drawer a catalogue page number, sixteen degrees. Page seven's drawer (the floor plan with the
fire escape in red; "Controllability: low. Delightful."). **Always:** Maya's forged drafts (fact `c15.maya-file`)
and page seven torn from The Autumn Collection (`act3.page = torn`). **One thing more** (`c15.took`):
**took-adrian** (`act3.adrian = hers`) · **took-cards** (the 1109 safe; `act3.cards`) · **took-nell** (neutral;
the Jakarta order signed C., the pages after it missing; `act3.nell-order`) · **took-verdict** (comply road only;
and Sloane's passport).

## `leash` — Breaking the Leash (THE WEEK AFTER)

A list: Maya (the drafts to Nadia Brandt, Marsh or her solicitor; charge withdrawn; clearance restored; her message
by `act3.maya-choice`); Adrian (refused road: Benton in a café, "The review is closed"; otherwise the file in a
bank, or the name still in Celeste's head); the dead man's switch (`switchHolders15`: three holders); Sloane.

**The cost** (`c15.cost`, `c15.cost-who`; sets `act3.leash = broken`, `act3.cost`, `act3.switch`, `act3.adrian`,
`act3.maya-status = cleared`): **cost-ally** (Iris burned / Marsh loses his inquiry / Sloane goes on the record) ·
**cost-visibility** ("Meridian" eleven times in seven minutes on air) · **cost-money** (neutral; broke, and free) ·
**cost-relationship** (Julian's deal, Theo's story, Owen's inquiry, or Maya sent to Leeds).

## `phone` — The Black Phone (WEDNESDAY · NIGHT)

Her first message: "No more orders." C.: "Then Thursday. Come as whoever you like, darling. I should warn you that
I shall be there as myself." **phone-return** (the orchid box) · **phone-river** (off the bridge, still lit) ·
**phone-keep** (neutral; switched off, in the drawer, evidence). Then the evening (`eveningPartners14`, minus the
relationship she spent; heat 3, consent recorded, fades) or **night-alone** (neutral; laughing in the kitchen at
four).

## `complete` — Act III (THE WALL)

Every card moved to her side, one by one; one left on Celeste's: THE BOARD MEETS. "Tomorrow." Last line of Act III:
*She held everything. Now I do. Thursday, I find out what that's worth.*

## Board, flags, tests

- Board: with `act3.leash = broken`, Celeste's column empties (Adrian's name "in her head" if still held; status
  countered); Evelynn holds Maya's drafts, page seven, the thing she took, and the switch.
- Flags: `c15.crew*`, `c15.way`, `c15.snag`, `c15.took`, `c15.maya-file`, `c15.passport`, `c15.cost`, `c15.cost-who`,
  `c15.phone`, `c15.evening*`; Act III keys `act3.leash`, `act3.cost`, `act3.switch`, `act3.adrian` (hers | defused |
  held), `act3.page`, `act3.cards`, `act3.nell-order`, `act3.verdict`, `act3.black-phone`, `act3.maya-status = cleared`.
- Tests: `tests/state/chapter15.test.ts`; goldens `tests/fixtures/rev19-chapter15-golden.json` (countered-iris,
  complied-sloane, refused-alone; capture with `EVE_CAPTURE_CH15=1 npx vitest run tests/tools/capture-chapter15-golden.test.ts`).

## Deepening pass (2026-09-26)

Two moments, each with a neutral pick for the goldens (`GATED_DEFAULTS`), and more of the heist:

- **The crew at the table** (`plan`, before the way in) (`c15.table`): **table-toast** (a terrible bottle from the back
  of the cupboard, a tumbler, a mug, an egg cup; a toast from each of the crew; alone, a toast to the wall) ·
  **table-rules** ("If anyone is caught, the others walk") · **table-quiet** (neutral).
- **A sound on the stairs** (`archive`, after Maya's file and page seven, before the one thing more) (`c15.stairs`):
  **stairs-still** (neutral; lamp off, counting) · **stairs-face** (the young man with the laptop, the archive's
  cataloguer, working late: "I was never up here"; in Chapter 17 his nod at the end of the board is now explicitly
  him) · **stairs-lamp** (the lamp swung at the door).
- More prose: the sleepless Wednesday before the heist; the wall, before the black phone, with more on her side of
  it than Celeste's for the first time.

## Size (honest)

Pass 1: ~2.3k words on the golden paths. After the deepening pass: **~2.5–2.6k on the golden (quiet) paths**, more
engaged, against the 7k budget. The shared spine worked (the three roads read
almost the same length, and most of the heist on each), but each scene is still lean. A deepening pass should give
the heist a second beat inside the archive (a sound on the stairs, the safe), a scene for the crew at the table, and
Thursday morning before the board.
