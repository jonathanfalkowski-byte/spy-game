# Chapter 17 — "The Room" (script: flow and flags)

Design: [../CHAPTER_17_THE_ROOM_DESIGN.md](../CHAPTER_17_THE_ROOM_DESIGN.md) (approved 2026-09-26, all seven decisions as
recommended). Code: `src/content/chapter17.ts` (the wording lives there), `src/content/leverage.ts`,
`src/ui/Chapter17work.tsx`. Gated behind `VITE_EVE_CHAPTER17` (content revision ≥ 19), entered from an own-power
`chapter16.complete` with **begin** ("The room"). The endgame's `confront` (ENDGAME_RECONVERGENCE §7).

Phases: `opening` → `defect` → `sloane` → `turn` → `nell` → `vote` → `complete`

One room, one hour, one shared spine. Nothing sexual on screen; no coercion.

## `opening` — The Product (18:00 · THE LONG ROOM)

Celeste presents the reissue to the board by catalogue number: "priced in", "performed beyond every forecast". Her line
by `act4.wear` ("The green. You kept it." / "Black. You did dare." / "Iris's grey. How very loyal of you."). The six
faces; the crew on the chairs by the wall, or two empty chairs. `act4.open`: **open-room** (neutral; "I'd like to
read you the warranty") · **open-celeste** · **open-silent**. Then the first card lands (`act4.first`), one effect
each: Soames's glasses (verdict), Deverell looking at Celeste (Nell's order), the young man going white (cards), the
page fitted back into the catalogue (page seven), the black phone read aloud, Adrian's file, Ashby's voice.

## `defect` — The Defect (18:15)

The verdict: signed (Soames's own signature second of three), or reconstructed (Soames asks for the original; Sloane's
own copy or Marsh's certified copy comes out if either is inside; otherwise "True, and without the signatures").
Julian writes one word if he is at the table. `act4.press`: **press-fraud** (neutral) · **press-every** (two hundred
drawers, every one a lawsuit) · **press-cost** (Iris, a girl who was nineteen, Nell). Deverell: "Celeste. Did we
know?" Celeste: "Of course we knew, Anton. You signed it. We always know. That is what we sell."

## `sloane` — The Officer of Record (18:25)

Inside: Sloane stands and says it in order (the fourth of March objection; "priced in"; the part of the product that
takes the blame). Not inside: the annexe read aloud; "Poor Victoria." `act4.sloane`: **sloane-vouch** ("She raised it.
You buried it.") · **sloane-stand** (neutral; her own record) · **sloane-use** (the proof; the room moves; it costs
Sloane everything).

## `turn` — The Offer (18:40)

Celeste's best move: "Sit with us, darling … You would do the placing." `act4.offer`: **offer-refuse** (neutral; "I
came for the table") · **offer-draw** ("Somebody always has to be on page seven.") · **offer-laugh** (the real
laugh). Then the held card lands (`act4.held-landed`): the verdict's original, Nell's order in front of her empty
place, the last envelope and a client's name, "page eight" in biro on her hand, the Wednesday message, the clinic's
itemised receipt, the rest of the Ashby tape; or with nothing held back, her hands flat on the table: "I'm still
here. That's the card."

## `nell` — Eleanor (18:50)

Celeste on Nell (the balcony, Lisbon, the orchids she sent anyway), then the rest: the Jakarta order was hers; the car
on the Saturday that Nell would not get into; the harbour wall in the dark with the leg; the driver who followed at
walking pace, watched her fall and did not stop; his call at six; hers to Nora at seven. `act4.named`: **named-ask**
· **named-nora** (if Nora is inside: the photograph face up on the table) · **named-wait** (neutral). `nellSaid17`:
"Eleanor. Her name was Eleanor Linden." (Nora, waiting, or a strong case) or "Evie. She was always Evie to me."
(`act4.nell-said`).

## `vote` — The Board (19:00)

Deverell: "This board will be seen to have acted." `board17`: the case, plus one step for a camera at the door or a
street that saw her go in (to at most strong), plus one for Sloane used as proof: **resigned** (Celeste resigns her
seat; Deverell writes the aim as terms in fountain pen on the back of the verdict; four signatures) · **diminished**
(Celeste keeps her seat and loses the room; terms in part) · **closed** (the board closes ranks; "They have only not
lost yet"). Meridian always stands. The board files out; the young man nods. One minute alone: "Did you ever like
being her?" and the white orchid. `act4.last` (sets `act4.board`, `act4.terms`): **last-yes** · **last-no** (neutral)
· **last-orchid** (into the water jug: "She used to do exactly that").

## `complete` — The Front Door (19:10)

The crew walks out with her, or nobody. No doorman. Outside by `act4.outside`: Theo putting his watch away, Pryce
opening the rear door unasked, Maya knocking the cake off the table, or three phones she will ring first. *I walked
out of the Vesper by the front door, and nobody opened it for me. I opened it myself.*

## Board, flags, tests

- Board: the undertaking ("in fountain pen, on the back of the verdict"), full or partial.
- Flags: `act4.open`, `act4.press`, `act4.sloane`, `act4.offer`, `act4.held-landed`, `act4.named`, `act4.nell-said`,
  `act4.last`, `act4.board` (resigned | diminished | closed), `act4.terms` (full | partial | none).
- Tests: `tests/state/chapter17.test.ts` (the board scales with the case and never topples Meridian; every held card
  lands; the free-agent core gets the room and the walk out; nothing sexual); goldens
  `tests/fixtures/rev19-chapter17-golden.json` (expose-room, terms-celeste, nell-silent; capture with
  `EVE_CAPTURE_CH17=1 npx vitest run tests/tools/capture-chapter17-golden.test.ts`).

## Size (honest)

Pass 1: **~1.9–2.0k words on the golden paths** against the 8k budget. Every beat, and every reading of what she
brought, is in; the scenes are lean. A deepening pass should give the board members voices (Soames and Deverell above
all), let the crew speak in the room, and slow the one minute alone.
