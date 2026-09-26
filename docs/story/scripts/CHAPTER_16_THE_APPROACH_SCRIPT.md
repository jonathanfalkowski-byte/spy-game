# Chapter 16 — "The Approach" (script: flow and flags)

Design: [../CHAPTER_16_THE_APPROACH_DESIGN.md](../CHAPTER_16_THE_APPROACH_DESIGN.md) (approved 2026-09-25, all seven
decisions as recommended). Code: `src/content/chapter16.ts` (the wording lives there), `src/content/leverage.ts`,
`src/ui/Chapter16work.tsx`. Gated behind `VITE_EVE_CHAPTER16` (content revision ≥ 19), entered from an own-power
`chapter15.complete` with **begin** ("Thursday"). Act IV opens: the endgame's `approach` (ENDGAME_RECONVERGENCE §7),
reading the entry contract (§5).

Phases: `dawn` → `aim` → `crew` → `table` → `dress` → `arrive` → `complete`

One shared spine: the choices change what she carries and who stands beside her, not which scenes she reads.

## `dawn` — Thursday (05:00 · THE WALL, or THE WARDROBE DOOR)

Four hours' sleep; the city before light. Every card off the wall and onto the floor in the order it will matter,
the way Adrian laid out a filing. **The case**, stated honestly (`case16`): one line per sourced reason (the signed
verdict 3, or reconstructed 1; Nell's order 2; the 1109 cards 2; Ashby 1; the catalogue photographed 1; page seven 1;
Maya's drafts 1; the black phone kept 1; Sloane, Nora, Marsh standing 1 each; the switch 1) and a card at the top:
THIN (<4) · SUPPORTED (<7) · STRONG (<10) · OVERWHELMING. **case-set** stores `act4.case`.

## `aim` — What She Wants (06:00)

The kitchen table; "the most dangerous person in any hearing is the one who does not know what they want."
`act4.aim`: **aim-expose** (the truth in public; the audience as shield) · **aim-terms** (neutral; Maya safe for
good, Adrian retired, Sloane cleared, page seven closed, the switch kept armed) · **aim-nell** (if `act3.nell`: "I
am going to make Celeste say her name") · **aim-out** (unless the money is spent and she has no door: Iris, or
Julian; "The one thing she never let Nell have. The door.").

## `crew` — Who Comes (MORNING)

"Everybody who walks into that room with you walks out of it known." **Inside** (`act4.inside`, up to two;
`insiders16`: who is still standing and not spent in Ch15): **inside-sloane** (ironing the shirt) · **inside-nora**
(off the overnight flight, Nell's photograph in a plastic sleeve) · **inside-marsh** (a banker's box and his bicycle
clips) · **inside-maya** · **inside-iris** (the earring signal) · **inside-julian** (a client's observer seat, notice
given) · **inside-done**, or **inside-none** (neutral; alone, allowed, harder). **Outside** (`act4.outside`):
**outside-theo** (live at seven) · **outside-pryce** (the engine running) · **outside-maya** (the café window) ·
**outside-switch** (neutral; three phone calls).

## `table` — The Order of Things (NOON)

The barrister in the corridor: the first thing sets the room, the last ends it, never everything at once.
`items16`: the verdict, Nell's order, the 1109 cards, page seven (always), the black phone (if kept), Adrian's file
(if hers), Ashby. **first-<item>** (`act4.first`), then **held-<item>** (`act4.held`, "like a second heartbeat"), or
**held-none** when page seven is all she has ("Then my hands will have to do").

## `dress` — Armour (16:00 · THE MIRROR)

Eight months of learning it. **wear-green** · **wear-black** ("Black. How brave.") · **wear-grey** (the legends'
colour) (`act4.wear`). Then (`act4.dressed-with`): **dress-<partner>** (a partner in play, not spent: the clasp at
the back of her neck, "Come back.", her cheek against his for one breath; heat 1–2) · **dress-maya** (her hair,
"Go and take a building apart") · **dress-alone** (neutral).

## `arrive` — The Embankment (17:45)

The walk past the bench, the rail, the lamp-post where Adrian waited for the first car. `public16` (published,
exposed, or the visibility cost): photographers and a van, "They have seen you coming", or an empty embankment.
`act4.arrive` / `act4.seen`: **arrive-front** (neutral; through the cameras, the whole smile once; or up the steps
unwatched) · **arrive-quiet** (public: two men on the service stair, and back round to the front; private: out of
the wall by the waiters' door) · **arrive-car** (Celeste's car; Pryce: "And mine."). The doorman: "Good luck, Ms
Vale."

## `complete` — The Long Room (18:00 · THE BOARD)

The frames; a table under them; six people. Anton Deverell (the chair) and Marguerite Soames (the one who reads
everything) from the verdict's signatures; three she does not know; Julian in the observer's chair if he came; the
crew on the chairs by the wall; The Autumn Collection on the table with an orchid across it and a page missing.
Celeste stands. *She stood up when I came in. She has never once stood up for me before.*

## Board, flags, tests

- Board: an Act IV view: what she wants from the room (`act4.aim`), and who is in it with her.
- Flags: `act4.case`, `act4.aim`, `act4.inside`, `act4.inside-done`, `act4.outside`, `act4.first`, `act4.held`,
  `act4.wear`, `act4.dressed-with`, `act4.arrive`, `act4.seen`.
- Tests: `tests/state/chapter16.test.ts` (the case derives the same from the same save; the free-agent core, thin and
  alone, still reaches the door; the spent ally cannot come; the chosen moment stays under heat 2); goldens
  `tests/fixtures/rev19-chapter16-golden.json` (expose-front, terms-car, nell-quiet; capture with
  `EVE_CAPTURE_CH16=1 npx vitest run tests/tools/capture-chapter16-golden.test.ts`).

## Deepening pass (2026-09-26)

Two moments, each with a neutral pick for the goldens (`GATED_DEFAULTS`), and the crew at greater length:

- **A rehearsal** (`table`, after the held card) (`act4.rehearse`): **rehearse-mirror** (the woman in the glass takes
  "priced in" out: "She was always the better barrister") · **rehearse-aloud** (if anyone is coming inside: to the first
  of them, "Say that slower. You'll want to watch her face.") · **rehearse-none** (neutral).
- **On the embankment** (`arrive`, before the way in) (`act4.walk`): **walk-bench** (one minute on the bench from the
  first Thursday) · **walk-rail** (Adrian's Axiom pass dropped into the river: "Tonight I open one without it") ·
  **walk-on** (neutral). Celeste's car now keeps pace along the embankment rather than waiting at the kerb.
- The crew at greater length: Sloane, frightened of her "before I ever met you"; Nora on rain, "the only weather that
  minded its own business"; Owen offering to "do the room" for her. More of the dawn (the second coffee, the street
  waking).

## Size (honest)

Pass 1: ~2.1k words on the golden paths. After the deepening pass: **~2.2–2.4k on the golden (quiet) paths**, more
engaged, against the 7k budget. Every scene, choice and entry-contract read is
in; the prose is lean. A deepening pass would give each crew member a longer scene, the table a rehearsal, and the
walk along the embankment more of the city.
