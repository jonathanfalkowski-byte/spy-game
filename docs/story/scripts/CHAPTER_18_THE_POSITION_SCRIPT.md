# Chapter 18 — "The Position" (script: flow and flags)

Design: [../CHAPTER_18_THE_POSITION_DESIGN.md](../CHAPTER_18_THE_POSITION_DESIGN.md) (approved 2026-09-26, all seven
decisions as recommended). Code: `src/content/chapter18.ts` (the wording lives there), `src/content/leverage.ts`,
`src/ui/Chapter18work.tsx`. Gated behind `VITE_EVE_CHAPTER18` (content revision ≥ 19), entered from an own-power
`chapter17.complete` with **begin** ("Friday"). The endgame's `position` (ENDGAME_RECONVERGENCE §7). **The last
chapter of the Celebrity route:** nothing is offered after `complete`.

Phases: `morning` → `position` → `people` → `name` → `later` → `complete`

## `morning` — Friday (THE MORNING AFTER)

By `act4.board`: **resigned** (the front page with the signature circled in red if the aim was expose; otherwise
four sentences in the business pages, MERIDIAN DIRECTOR STEPS DOWN; the undertaking in her bag) · **diminished**
(Soames's typed letter conceding half) · **closed** (nothing, anywhere). Celeste's last word: a postcard from Lisbon
in green ink, "You were worth it. C." (resigned) · a white orchid with no card (diminished) · nothing, ever (closed).
Sloane by `act4.sloane`: cleared and the letter framed (vouch) · gone with a box and three hundred pages, "You were
right to. — V.S." (use) · on leave, two minutes every Sunday at ten (stand).

`end.morning`: **morning-papers** (neutral) · **morning-sleep** · **morning-maya** (if `mayaClose18`: breakfast, the
whole story, wine at eleven; "Adrian. It really was you." if she didn't know).

## `position` — The Position (THAT WEEK)

The aim as a life, scaled by `act4.terms`: **expose** (the documentary, the inquiry, Parliament: "famous is the one
thing you can't sell twice"; or, with no terms, publishing anyway over a year) · **terms** (the undertaking kept, the
flat across the gap let to a couple with a baby; or her own terms, "I hold the pen") · **nell** (the file to Nora,
"It's all here", or the inquest reopened; the harbour wall at dusk, two coffees, the sweet one left on the wall) ·
**out** (Julian's plane, Iris's boat, or trains and a ferry in cash; a coast; "The door she never let Nell have").
The cost of Chapter 15 comes back (broke; never private again).

**The switch** (`end.switch`, `end.switch-to`, `end.position`): **switch-armed** (neutral; every Sunday, "a kind of
prayer") · **switch-handed** (to `keeper18`: Maya, Sloane if vouched for, Nora, Owen, or Nadia Brandt; "Obviously")
· **switch-disarmed** (burned in the kitchen sink).

## `people` — The People (THAT MONTH)

Maya (the job and the lobster; back from Leeds with the dog; her name on an office door), Iris (a postcard with flat
shoes drawn on it), Pryce (his own cab, the heating up), Nora (Nell's photograph, Sam told the truth), Owen (his
inquiry back, or its conclusions with one line underlined twice), Joe the doorman (training to be a nurse), and the
one spent in Chapter 15. **Who she goes home to** (`end.with`, `partners18`: in play, not betrayed, not spent):
**with-julian** · **with-theo** · **with-sebastian** (Vienna, in the snow) · **with-marsh** ("No mirrors. I checked
again. Toast?") · **with-maya** (if close: the good blanket) · **with-alone** (neutral; "It is not the same as alone").

## `name` — A Name (THE WALL)

Every card into a shoebox, next to the flat shoes. One blank card. `end.name`: **name-adrian** (his name, carried
into this life) · **name-evelyn** (neutral; the legend made nobody's) · **name-new** (written, and turned to face the
wall). The transformation is not revisited.

## `later` — A Year Later

By aim: the coast, or London in the rain with two cups on a harbour wall in a photograph. The black phone in a
drawer, never switched on, or gone. The Spring Collection: no page seven, "six, eight". A postcard every first
Thursday of spring if Celeste resigned. `end.later`: with a partner, **later-<partner>** (the door, the rain, "Tell me
what you want tonight") → **later-no-sex** / **later-sex** (`end.consent`) / **later-goodnight** → **later-stop** /
**later-close** (heat 3 at most; fades); with Maya, **later-maya**; or **later-quiet** (neutral; coffee, black, at a
window).

## `complete` — The End

The last card on a wall that is hers. By name: *My name is Adrian Vale. I was a product once. Now I'm the only one who
knows what I'm worth.* · *My name is Evelyn Vale. They built her to be sold. I bought her back.* · *I wrote my name on
the last card and pinned it to the wall. It's nobody's business but mine. That's the whole point.* Then: "The end of
the Celebrity route."

## Board, flags, tests

- Board: the final switch ("armed, for the rest of your life" / "held for you by someone you trust" / "Nothing aimed
  at anyone").
- Flags: `end.morning`, `end.switch`, `end.switch-to`, `end.position` (aim:terms), `end.with`, `end.name`,
  `end.later`, `end.later-open`, `end.consent`.
- Tests: `tests/state/chapter18.test.ts` (every name ends cleanly with no further choices; the spent partner is not
  there to go home to; the year-later night is chosen, consented and stoppable); goldens
  `tests/fixtures/rev19-chapter18-golden.json` (expose-armed, terms-handed, nell-disarmed; capture with
  `EVE_CAPTURE_CH18=1 npx vitest run tests/tools/capture-chapter18-golden.test.ts`).

## Deepening pass (2026-09-26)

Three moments, each with a neutral pick for the goldens (`GATED_DEFAULTS`), and more of every scene:

- **The Vesper at noon** (`morning`, after the morning choice) (`end.walk`): **walk-past** (neutral) · **walk-look**
  (the window holds a painting again, "Not for sale": the Aster portrait if Celeste bought it, else a harbour at
  night) · **walk-in** (the frames coming down; the brass plate with her number, taken home: "Souvenir?").
- **The phone call about her face** (`position`, after the switch) (`end.fame`): **fame-yes** (a campaign in her own
  name, with a clause that the photographs are never sold on) · **fame-no** (the poster papered over with car
  insurance) · **fame-later** (neutral; "Not yet. Ask me next year.").
- **The shoebox** (`name`, before the last card) (`end.kept`): **keep-nell** (if `act3.nell`: in her purse, behind the
  bank card) · **keep-maya** (on the fridge under a lemon magnet) · **keep-none** (neutral).
- More prose: waking at six with nothing to do; the world's four days of opinions; everyone already knowing the one
  true thing; the shoebox on her knees; the brass plate on the windowsill a year on, the bus with her own campaign on
  it, or nobody looking twice; the lamp-post where Adrian waited ("It turned out all right. Not well. All right."); the
  last lamp off.

## Size (honest)

Pass 1: ~1.2–1.3k words on the golden paths. After the deepening pass: **~1.7–1.8k on the golden (quiet) paths**,
more when the new moments are played engaged, against the 5k budget. A full Celebrity playthrough, Chapters 3–18
as the transcript tool counts them, now reads about **45–47k words**. The route is complete and playable end to end;
Acts III and IV are lean throughout, and are where deepening passes will pay most.
