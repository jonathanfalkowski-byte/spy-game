# Chapter 13 — "The Honeypot" (script: flow and flags)

Design: [../CHAPTER_13_THE_HONEYPOT_DESIGN.md](../CHAPTER_13_THE_HONEYPOT_DESIGN.md) (approved 2026-09-25, all seven
decisions as recommended). Code: `src/content/chapter13.ts` (the wording lives there), `src/content/leverage.ts`
(the board), `src/ui/Chapter13work.tsx`, and the reader's fade (`src/ui/reader-preferences.ts`,
`src/ui/reader-context.ts`, `src/ui/Narrative.tsx`). Gated behind `VITE_EVE_CHAPTER13` (content revision ≥ 19),
entered from an own-power `chapter12.complete` with **begin** ("The placement"; its hint carries the content
notice).

Phases: `brief` → `week` → `answer` → `thursday` → `after` → `morning` → `complete`

**The reserved sexual-coercion beat.** On the comply path the order, the choice, getting ready, the car, the bar,
the lift, the corridor and the door are on screen; the door closes and the phase ends; `after` opens in the car at
two. Nothing behind the door is shown or described, then or later. `tests/state/chapter13.test.ts` scans every
coerced path (comply and refuse, all recovery steps) for sexual vocabulary and fails on any hit.

## Player comfort (CONTENT_DIRECTION §6, built here)

- **Content notice**: the first block of `brief`, and the `begin` hint.
- **"Fade coercion scenes"** (Settings, a per-reader preference `eve.reader.fade-coercion.v1`, outside the save):
  `fadeCoercion13` replaces the comply lead-in entry (recognised by its first line, `COMPLY_OPENING13`) with one
  line, keeping the corridor, the door and the choice. Presentation only: the save, the ledger and the goldens are
  never touched.

## `brief` — The Placement (11:00 · THE VESPER, READING ROOM)

The Vesper by day; Celeste with the grey folder. Singapore colours her opening (`act3.singapore`: moved-in "You
looked so at home there"; everything "Nine flats. You counted."). **The target:** Owen Marsh, deputy director of
enforcement at the Markets Authority; the one inquiry into Halvorsen's fund. **The client:** Halvorsen (by
`c11.iris`: lost Iris, or still has her). **The job:** the Claremont bar, Thursday, nine; suite 1109; the camera
behind the mirror. **The leverage:** Maya's file, *unauthorised disclosure … referred to the police*, dated Friday.
Twice surprised: "something you cannot be clever about".

**brief-ask** ("It is very restful, being owned.") · **brief-silent** (neutral; the cup on page seven).

## `week` — Six Days (THE WEEK · LONDON)

1109 on the wall; the city carrying on; the black phone quiet. One move (`c13.week`; allies set `c13.told`):
**week-marsh** (Kennington, the café, eleven years of never letting anybody off) · **week-maya** (dinner and
"I noticed" if `c6.maya = restored`; otherwise her lit window across the road) · **week-iris** (if Iris is an
ally: the cupboard behind the mirror, the card) · **week-theo** (if Theo is an ally: "I have waited twenty years
for that sentence") · **week-julian** (if Julian is an ally: "right about the pensions") · **week-alone**
(neutral; two cards, and the empty third put in the drawer).

## `answer` — The Answer (WEDNESDAY · MIDNIGHT)

Nell's photograph on the table (or her name, if Evelynn walked away from Nora). `c13.answer`:
**order-comply** (`act3.honeypot = done`) · **order-refuse** (`act3.honeypot = refused`,
`act3.maya-status = detained`; if `act3.nell`, she keeps the name back) · **order-counter** (only with a way built,
`counterWays13`: *turn* = week-marsh plus proof (Ashby recorded, the catalogue photographed, a strong case, or
Nell's note) or Julian told; *swap* = Iris told; *expose* = Theo told, or week-marsh, famous and a strong case).

## `thursday` — The Claremont (THURSDAY · 21:00)

- **Comply:** getting ready as armour ("I am leaving me in the drawer"); Pryce turns the heating up on the Strand;
  Marsh at the bar, kind and lonely; the count; the lift; the corridor; "Are you all right?" **door-look** /
  **door-away** (neutral) → "The door closes behind you." End of phase.
- **Refuse:** home, not going; Maya's call from the car (or C.'s photograph of her); the station waiting room all
  night. "They only have to do it to her, and let you watch." **station-wait** (neutral) · **station-lawyer** (if
  `c9.lawyer = retain`: Nadia Brandt at half past one, "Nobody who leaks is this tidy"; `act3.maya-lawyer`).
- **Counterplay** (`c13.counter`; each raises `act3.celeste-surprised`): **counter-turn** (the truth at the bar,
  the proof; in 1109 they stage it for the camera, both in on it: "Is this all right?"; both still dressed, the lamp
  off, laughing; heat 2, chosen; `act3.ally.marsh`, `act3.honeypot = staged`, fact `c13.marsh`) ·
  **counter-swap** (Iris behind the mirror; the card: a month of 1109; one drink and a handshake at the lift;
  `c13.card`, `act3.honeypot = pulled`, fact `c13.card`) · **counter-expose** (Theo's show at seven, or the
  Courier; the lobby full of photographers; the whisky lifted to the eleventh floor; `act3.honeypot = burned`,
  `act3.exposed`).

## `after` — Afterwards (2 A.M.)

- **Comply** (exploitation / recovery overlay): the car (Pryce: "Goodnight, Ms Vale"); the chain on the door; the
  shower, as time and not detail; the dress in a bin bag; C.: "Received. Thank you."; Maya ringing, unanswered;
  "Done to me. Not by me." **The recovery step** (`c13.recover`): **recover-maya** (the sofa; she doesn't ask) ·
  **recover-julian / -theo / -sebastian** (`c13.refuge`: being held, in his clothes, nothing else) ·
  **recover-wall** (THURSDAY. 1109. DONE TO ME. NOT BY ME.) · **recover-alone** (neutral).
- **Refuse:** six o'clock; bail, suspension, no charge yet; Maya: "It was about you" (restored: **maya-tell** /
  **maya-quiet**), or she walks past a stranger (**after-home**).
- **Counterplay:** Marsh at the revolving doors ("I'm most of it"), Iris and the card in a glove, or the city
  talking. **after-drink** · **after-home** (neutral).

## `morning` — Friday (FRIDAY · MORNING)

C. by answer: complied ("Your friend's file has gone back in my drawer. I keep everything."), refused ("Your friend
is home, I hear … There is always a next time."), countered (Benedick / the cupboard / "How vulgar, and how
effective", then the tally: once, twice, three times). The wall moves. **reply-none** (neutral) · **reply-nell**
(if `c12.bed = drawer`: "Nell said you'd bring flowers"; silence all day) · **reply-count** (countered: "So have
I."). Every reply sets `act3.sloane-came`.

## `complete` — A Knock (EVENING · THE LANDING)

Sloane in the Glass House coat, the folder held like schoolbooks: the recording request, Maya's charge sheet with
her own directorate's stamp, or the Markets Authority's new inquiry with Axiom on the list. "I didn't know they did
this." Last line: *She came to me. The woman who built this cage came to my door to ask if she could come in.*

## Board, flags, tests

- Board: Celeste wants "Owen Marsh, on camera, in suite 1109 at the Claremont"; threat "Maya, on a leak charge
  already written" (or, refused, "detained … suspended, on bail"). Evelynn holds Marsh, the 1109 card, or the
  broadcast.
- Flags: `c13.brief`, `c13.week`, `c13.told`, `c13.answer`, `c13.door`, `c13.station`, `c13.counter`, `c13.card`,
  `c13.recover`, `c13.refuge`, `c13.maya`, `c13.drink`, `c13.reply`; Act III keys `act3.honeypot`,
  `act3.maya-status`, `act3.maya-lawyer`, `act3.ally.marsh`, `act3.exposed`, `act3.celeste-surprised` (thrice),
  `act3.sloane-came`.
- Tests: `tests/state/chapter13.test.ts` (the vocabulary scan over coerced paths; counterplay only when earned;
  every option reaches `complete`; the fade); goldens `tests/fixtures/rev19-chapter13-golden.json` (comply-alone,
  refuse-station, counter-turn; capture with `EVE_CAPTURE_CH13=1 npx vitest run tests/tools/capture-chapter13-golden.test.ts`).

## Deepening pass (2026-09-25)

The comply lead-in was **not** lengthened. Everything else was:

- **The brief:** Celeste on placements ("Nell was placed eleven times in eight years"; "The first time is the only
  difficult one … I have watched a great many first times").
- **The week, two moves either side of Celeste's box.** The first move (as before) is followed midweek by a box
  from the Vesper: the dress for Thursday, "Something you can forget. C." (`c13.box`): **box-keep** (neutral; the
  comply path then wears it: "fitted so well and belonged to you less"; Wednesday's reply is "Wear the dress.") ·
  **box-return** ("a dress that is nobody's") · **box-cut** (the kitchen scissors, posted back; on Friday Celeste:
  "It was Nell's size, you know. I had it let out for you."). Then a **second move** (`c13.week2`, `c13.told2`),
  never the same as the first, or **week-rest** (neutral). `counterWays13` reads both moves. Also the campaign shoot
  ("You look haunted. The lens adores it.") and Odile.
- **Midnight:** the three drafts she deletes, and the light in the flat across the gap.
- **The refusal night:** the waiting room's other people ("like a congregation"), and a **vigil** at half past ten
  (`c13.vigil`): Pryce without his cap, or a man in a good coat: "it isn't too late. The car's outside."
  **vigil-no** ("Tell her I'm waiting for my friend.") · **vigil-silent** (neutral). Refusal stays refusal either
  way. At six, Maya on the steps: the forged emails in her own phrases.
- **Counterplay:** the lift rehearsal ("He keeps asking what his motivation is") and Marsh's guilty look at the
  mirror; the security man and "Eleven-oh-four, love" in the service corridor; the black phone ringing eleven times
  at five past seven; Marsh's own number on a coaster; Iris: "You keep it. I'd only lose my nerve."
- **Friday:** the bright morning; Maya's full stop (complied), the Courier's four lines (refused), the widened
  inquiry (countered).
- **The knock:** the spyhole; Sloane smaller than she was across a desk.

## Second deepening pass (2026-09-26)

Two shared moments, each with a neutral pick for the goldens (`GATED_DEFAULTS`). The comply lead-in is still unchanged.

- **Three hours before her midnight** (`answer`, before the order choices; Wednesday now opens at nine) (`c13.eve`),
  each leading into the existing minute-to-midnight scene: **eve-look** (the Claremont from a doorway across the
  Strand; the fourth window on the eleventh floor, a lamp tested on and off; a man in the lobby who looks up once) ·
  **eve-maya** (only if Maya is back: her tax return, the man who microwaves fish, Keith who can dance; "You sound
  like you're standing on a ledge") · **eve-sit** (neutral).
- **Friday afternoon** (`morning`, after the reply to Celeste, before the knock) (`c13.friday`): **friday-walk** (out
  into the bright day; if famous, a girl under her own bus-shelter poster: "You look like someone who gets away with
  things"; yellow tulips, the least like anything Celeste would send; on the comply road she goes out because "the
  flat still has the night in it") · **friday-nora** (if Nora is an ally: Nell's name for them, *the florists*, and a
  biscuit tin of flower cards Nora has never opened) · **friday-sleep** (neutral).

## Size (honest)

Pass 1: ~1.8–2.3k words on the golden paths. After the first deepening pass, ~2.9–3.1k. After the second:
**~3.0–3.25k on the golden (quiet) paths**, and ~250–400 more when both new moments are played engaged, against the
7k budget. The comply lead-in stays as it is. What is left to deepen is in the counterplay ops and the week's second
move.
