# Chapter 12 — "Singapore" (script: flow and flags)

Design: [../CHAPTER_12_SINGAPORE_DESIGN.md](../CHAPTER_12_SINGAPORE_DESIGN.md) (approved 2026-09-25, all seven
decisions as recommended). Code: `src/content/chapter12.ts` (the wording lives there), `src/content/leverage.ts`
(the board), `src/ui/Chapter12work.tsx`. Gated behind `VITE_EVE_CHAPTER12` (content revision ≥ 19), entered from
an own-power `chapter11.complete` with **begin** ("Singapore").

Phases, each a scene with its own title and place:

`departure` → `emerald` → `flat` → `straits` → `sister` → `night` → `complete`

Written as set pieces from the first pass. No order this chapter: the pressure is Celeste at a distance.

## `departure` — Welcome Home (03:00 · THE KITCHEN TABLE → 06:10 · CHANGI)

The wall at three in the morning; Nell's flat shoes by the door if `c7.robe = drawer`; the decision.

**How she goes** (`c12.cover`): **cover-campaign** (if `own.campaign` is taken or terms: Odile moves
Laurent's autumn campaign to Singapore, so Celeste pays; `own.campaign-location = singapore`; the society
photographer at arrivals if famous) · **cover-quiet** (neutral; her own money, economy) · **cover-julian /
cover-theo / cover-sebastian** (one per `eveningPartners11`; `c12.cover = with`, `c12.with = partner`: Helix
business, a Singapore special, a tour date).

Changi: the white orchids at immigration, "Welcome back, Ms Vale", the heat. C.: "Do give my love to Mrs
Tan." She has told nobody about Mrs Tan.

## `emerald` — Mrs Tan's Orchids (NOON · EMERALD HILL)

The shophouses; her feet know the house; Mrs Tan's room of other people's orchids. The greeting reads
`c8.call`: **evie** ("Evie!" and both hands) · **ask** ("You rang me back… like a policeman") · **down** (the
chain: "You put the phone down on me") · none ("Evie? No. Evie?").

**Who she is to Mrs Tan** (`c12.tan`): **tan-evie** (noodles; "I am so good at this") · **tan-truth** ("You
stand wrong. You stand straight.") · **tan-listen** (neutral; tea with two sugars and cinnamon, a test or a
ghost).

All paths: the last night (late on a Saturday, limping, all the orchids on the mat, "going to my sister's",
"if a tall lady asks, Penang", down the stairs before light); the tall lady on the Monday with her own key;
the men in white gloves; a month later, everything brought back new and cleaned monthly "for the tenant". The
key under the white orchid. Fact `c12.last-night`.

## `flat` — Number 9 (AFTER DARK · EMERALD HILL)

The set: the room from the Axiom photographs, the ivory jacket on the chair, milk dated next week, a lipstick
with the cap off, white orchids. "They kept the shape." Lotte's balcony line if `c7.lotte`.

**Where she looks** (`c12.search`): **search-desk** (neutral; the maintenance schedule, *SITE SG/EH-9 … Family
contact (sister): N. Linden … do not disturb*; fact `c12.schedule`) · **search-wardrobe** (new clothes cut to
her measurements; the unused Penang boarding pass, a false trail; fact `c12.penang`) · **search-balcony** (two
chairs; across the lane, a window with a white orchid on the sill, watching; fact `c12.balcony`).

A key in the lock: the caretaker. **Who she is when he walks in** (`c12.caught`, sets `act3.singapore`):
**caught-hide** (neutral; the bathroom, his hand on the door; the clipboard: *STRAITS PROPERTY SERVICES · THE
MARLOWE HOTEL, 4TH FLOOR*; `key`; fact `c12.report`) · **caught-evie** (the tenant has moved in; Deshan's
call on the stairs; `moved-in`) · **caught-own** ("Who pays you?" Nine flats, nobody lives in any of them;
the number answers "the Marlowe"; `everything`; fact `c12.nine`).

## `straits` — The Punkah Bar (23:00 · THE MARLOWE HOTEL)

The roads in (any that apply): Iris free ("His name is Ashby. Tell him I sent you"), the matchbook
(`c7.robe = coats`), Ruth's word (`c9.names-open = end`); and on every path, the Marlowe from the caretaker.
The bar: teak, brass, cloth fans, the harbour through the shutters. Colin Ashby puts his glass down slowly.

**How she makes him talk** (`c12.ashby`): **ashby-evie** (neutral; sit down as her; off the record, fact
`c12.ashby`) · **ashby-press** (only with something to lay down: the catalogue, the client list, or the
caretaker's report or number; recorded, `c12.statement = recorded`, fact `c12.statement`) · **ashby-truth**
("I'm the reissue"; recorded).

All paths: the best he ever ran; Jakarta, her real name given to the wrong people; "Not my desk"; "It came down
from upstairs. From a friend of hers."; why: she wanted out ("Nobody leaves"), and a burned woman can't take
the legend anywhere ("They kept the shape"); the white orchids every day in the Jakarta hospital; Nora, Holland
Village, the frangipani. If `c9.kessler = follow`: "Another one who liked boats."

## `sister` — Nora (SUNDAY · HOLLAND VILLAGE)

The house at the end of the lane, the bicycle, LINDEN on a painted tile. Nora with a pen in her hand and her
sister's mouth, and yours. "Nell?"

**What she tells Nora** (`c12.nora`; every answer sets `act3.nell = known`, `act3.celeste-knew = seeded`,
facts `c12.nell` and `c12.sunday-call`): **nora-truth** ("She walked like our father. You don't."; the kitchen;
the photograph; "I want to be in the room."; `act3.ally.nora = in`) · **nora-kind** (neutral; "I knew her";
the kitchen; the photograph "for her friend") · **nora-go** ("the wrong house"; Nora catches her in the road
and tells her anyway: "Whoever sent you, tell them I know.").

The kitchen (truth and kind): two sugars and cinnamon ("The black was always her friend's"); Eleanor Linden,
Nell; Vale "for the clients"; Sunday lunches for eight years; she hated orchids, loved the harbour at night;
the Saturday call ("I'm out. I'm coming to you tomorrow. Make up the spare bed."); the harbour the next week,
misadventure, "Nell didn't drink"; and the seed: the tall friend rang on the Sunday morning, before the police.
"I have spent a year wondering how she knew."

## `night` — The Heat (MIDNIGHT · THE HARBOUR)

The sea wall where she went in. C.: "You've met Nora. Such a sweet girl." (or "You went to Nora's") Then a
photograph of Maya leaving Axiom at seven, taken from across the road: "London misses you."

**At the water** (`c12.harbour`): **harbour-name** · **harbour-coffee** (one black, one with two sugars and
cinnamon, left on the wall) · **harbour-quiet** (neutral).

**The evening** (only if a man came, `c12.with`): **evening-<p>** → **evening-<p>-no-sex** /
**evening-<p>-sex** / **evening-leave** → **evening-stop** / **evening-stay**. Heat 3, consent recorded
(`c12.evening-consent`), fades. Place lines: a suite on the Straits (Julian), the crew hotel (Theo), after the
concert (Sebastian). Or **night-alone** (neutral): the lit pool on the hotel roof until the sky goes grey.

## `complete` — A Name (MORNING · ARRIVALS, LONDON)

Pryce at arrivals if `c8.pryce` ("She thought you'd be tired." / "I met her sister."), or an unbooked driver.
The orchid on the kitchen table, by `act3.singapore`: `moved-in` "So glad you found the flat comfortable";
`everything` "Nine, darling. Do count them properly next time."; `key`, no card. The orchid goes out on the
landing. A new card beside the date, and Nora's photograph unless she walked away.

> t: Eleanor Linden. Nell. She took two sugars and cinnamon, and hated orchids, and was running when they
> caught her. I have her face and her flat and her coat. I am going to give her back her name, in a room full
> of the people who took it.

## Board, flags, tests

- Board: Celeste holds "Singapore: where you went, and whom you saw" and the Maya photograph. Evelynn holds, by
  path: the schedule, the Penang pass, the caretaker's report (or the nine flats), Ashby on the record, Nora, and
  Nell's name.
- Flags: `c12.cover`, `c12.with`, `c12.tan`, `c12.search`, `c12.caught`, `c12.ashby`, `c12.statement`,
  `c12.nora`, `c12.harbour`, `c12.evening*`; Act III keys `act3.singapore` (key | moved-in | everything),
  `act3.nell`, `act3.celeste-knew`, `act3.ally.nora`; `own.campaign-location`.
- Tests: `tests/state/chapter12.test.ts` (every option in every scene reaches `complete`); goldens
  `tests/fixtures/rev19-chapter12-golden.json` (truth-hidden, kind-tenant, walkaway-own; capture with
  `EVE_CAPTURE_CH12=1 npx vitest run tests/tools/capture-chapter12-golden.test.ts`).

## Deepening pass (2026-09-25)

Four moments, each with a neutral pick for the goldens (`GATED_DEFAULTS`), and the city on the taxi ride in:

- **The first hour** (`departure`, after the cover) (`c12.first`): **first-hawker** (Mr Goh's coffee stall off
  Chinatown keeps her tin of cinnamon, and her tab, paid a hundred dollars a month for fourteen months by "C.";
  fact `c12.tab`) · **first-salon** (Maison Lin keeps her standing Friday, paid by L.S.F.; "Madame Laurent chose
  this"; the L.S.F. line reads `c9.rent`; fact `c12.salon`) · **first-sleep** (neutral).
- **The bedroom** (`flat`, after the search, before the key in the lock) (`c12.bed`): **bed-lie** (Celeste's scent
  sprayed on the pillow) · **bed-drawer** (behind the drawer, Nell's unsent note to Nora: "If anybody comes with
  flowers, don't open the door. Not even for her. Especially not for her."; fact `c12.note`; a board asset) ·
  **bed-mirror** (neutral; the twin lipstick, her shade).
- **Kit Harlow** (`straits`, before Ashby) (`c12.bar`): **bar-flirt** (one drink, her lead, two fingers on her
  wrist: "Only her. The tall one. Laurent.", and at the end, "anybody with a boat"; fact `c12.kit`) · **bar-truth**
  ("the boat thing was never a joke to him") · **bar-cool** (neutral). Ashby sees her after.
- **Sam** (`sister`, after the kitchen on truth or kind; `nora-go` goes straight to the harbour) (`c12.boy`):
  "Auntie Nell?" **boy-hold** ("You smell different.") · **boy-friend** ("She was on her way.") · **boy-nora**
  (neutral). The photograph at the gate follows.
- At the harbour: Maya answers from a bus in the rain if she is back (`c6.maya = restored`).

## Size (honest)

Pass 1: ~3.7–4.1k words on the golden paths. After the deepening pass: **~4.3–4.8k on the golden (quiet)
paths**, roughly 500 more when the new moments are played engaged, against the 7k budget. Next lift, if wanted:
the campaign path's night shoot at the harbour, and Ashby and Nora at greater length.
