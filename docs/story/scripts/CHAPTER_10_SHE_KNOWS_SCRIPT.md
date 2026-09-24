# Chapter 10 — "She Knows" script (Act III opener)

Flow, choices, conditions and flags for Chapter 10. Design authority:
[../CHAPTER_10_SHE_KNOWS_DESIGN.md](../CHAPTER_10_SHE_KNOWS_DESIGN.md) (owner decisions §10, all
settled as recommended 2026-09-24). **The full wording lives in the code**
(`src/content/chapter10.ts`, like Chapters 7–9); this script is the map of it. For a readable
transcript of any golden path:

```
EVE_DUMP=<dir> npx vitest run tests/tools/transcript-dump.test.ts
```

Gated `VITE_EVE_CHAPTER10` (content revision ≥ 19, like Chapters 6–9). Reached from an own-power
(Celebrity) Chapter 9 `complete`; other lanes stop at Chapter 9 until their Act II ships.

Phases: `breakfast` → `claimed` → `wall` → `order` → `answer` → `invitation` → `complete`.
In-scene choices are held as sub-states (`c10.breakfast`, `c10.open`, `c10.evening-open`), the
Chapter 7–9 pattern.

---

## Entry (from `chapter9.complete`, own-power)

→ **begin** · *Answer the orchid* · Morning. She is expecting you. → `breakfast`

## `breakfast` — She Knows

Opens at dawn: the orchid on the table, a 06:00 message ("The Lindqvist. Seven. They will know
your name at the door."), *She is not asking whether I will come.*

**1. Do you go?** (`c10.breakfast`)
- **breakfast-go** · Go to the Lindqvist → `went`. The breakfast room whose curtains never open;
  the two men who do not eat. Place: *07:00 · THE LINDQVIST*.
- **breakfast-stay** · Don't go → `ambushed`. She comes to the bakery on your street with two
  coffees, in front of the queue. Place: *09:10 · THE BAKERY ON YOUR STREET*. Worse: public.

**Celeste's openers** (all that apply, in order): the card (`c7.card` kept/studied, or burned) ·
the terrace (`c9.terrace` turn/truth) · the name beat (`c9.name-beat` walk, or photos: she slides
the ninth frame across) · the station poster (`own.campaign = taken`) · Theo (in play) · else a
generic line. Then: *She waits for you to begin, chin on her hand.*

**2. How do you open?** (`c10.open`)
- **open-case** · Put the case on the table. `case.strength` supported/strong: she stops smiling
  for one sentence ("I hate having breakfast with people who haven't done the reading"). Thin:
  "It was a Thursday, darling, not the Wednesday."
- **open-evelyn** · Play the woman she knew. Evelyn's chair; she hated orchids and Celeste kept sending them;
  "I kept the last one." Record `c10.orchids`.
- **open-silent** · Eat, and let her talk. She lets slip that the board meets on the first Thursday.
  Sets `act3.board-day = first-thursday`.

Each ends on a bridge: *"Ask me something, darling."*

**2b. Ask her something** (`c10.asked`, pass 2)
- **ask-happened** · "She stopped being useful, darling, and then she stopped being anywhere." /
  "I read almost none of them. That was the one I read twice."
- **ask-like** · Impossible, late for everything; she stole the sugar cubes; Celeste sets two by your cup.
- **ask-meridian** · "So few products get to read their own specifications."

**2c. Her question back** (`c10.dream`, pass 2): *"When you dream, darling, are you him or are you her?"*
- **dream-true** · "I wake up before I find out." (pity) · **dream-lie** · "Her. Always." ("Not yet.")
  · **dream-refuse** · "That one's mine."

All end on the turn: **"Eat your eggs, Adrian. You never did look after yourself."**

**3. How do you take it?** (`c10.adrian`) → `claimed`
- **adrian-composed** · Don't flinch. "There you are. I did hope you would be good at this."
- **adrian-asked** · Ask her what she wants. "Nothing yet, darling. That's the lovely thing about
  owning something."
- **adrian-walked** · Walk out first. "Same time next week?"

## `claimed` — Old Friends

The society-page photograph (Lindqvist or bakery); caption *Old friends. Evelynn Vale and Celeste
Laurent, reunited.*; the article ("rarely photographed and never interviewed"; the two women "go back
years"). Then the calls.

**Who you answer first** (`c10.first-call`); the rest go to voicemail:
- **call-sloane** (always) · "Laurent is not a friend of this directorate." (+ "Or is this another
  guess?" if `sloaneDoubts`.)
- **call-maya** (`c6.maya = restored`) · "People like that don't have friends. They have holdings."
- **call-theo** (Theo in play) · "I'm not letting it go."
- **call-odile** (`own.campaign`) · Laurent's people want her for the autumn campaign, paid in
  advance: Celeste becoming the hand that feeds her.

**The doorstep** (`c10.doorstep`, pass 2) → `wall`: photographers by four.
- **door-face** · "Celeste is a very old friend. Of a friend." · **door-back** · the service door, and
  her man in the alley anyway · **door-stay** · curtains; one watcher who is not a photographer.

## `wall` — The Wall

The mirror comes off the wardrobe door; index cards, red thread, pins.

→ **wall-build** · Put it all on the wall → `order`. Sets `c10.wall = built` (the leverage board
opens in Records) and fixes `c10.target`. Lists one card per holder from
`src/content/leverage.ts` and her own column.

## `order` — One Small Thing

The courier at 23:00; a black phone with one contact, **C.**: *"Maya Reyes. Compliance, level three.
Her clearance renews in nine days…"* Then the ask, by target (`target10`):

| Target | When | The ask | Counterplay needs |
|---|---|---|---|
| `tape` | Theo in play (`c7.theo = curious`, `c7.exit = theo`, or his evening) | Theo's raw tape, uncut | Theo's trust: `c7.exit = theo` or an intimate Theo evening |
| `workroom` | else Julian in play (`julian5`, Julian's evening, `own.crossover = executive`) | The contract page on Julian's wall | Julian's trust: intimacy or mutual interest with Julian, or `own.crossover = executive` |
| `notes` | otherwise | Her notes on paper (+ Maya's copy if `c7.notes = maya`) | `case.strength` supported/strong, or `c7.notes = burn` |

Without the counterplay requirement, a thought names the missing asset ("If Theo trusted me…").

**The answer** (`c10.answer`) → a moment inside the job (`c10.job`, pass 2), then `answer`:
- Tape comply: Theo on the archive stair — **job-lie** (the scarf; he decides not to see) /
  **job-hide** (lamp off; "Goodnight, then."; `c10.theo-suspects`).
- Workroom comply: Julian back early — **job-lie** (the view) / **job-cover** (kiss him first).
- Notes comply: with Maya's copy, "Are you in trouble?" — **job-lie** / **job-half**; otherwise
  **job-clean** / **job-copy** (a photograph of every page: `c10.kept-copy`, a board asset).
- Any refusal: the black phone at 03:00 — **job-answer** ("Tell Maya I'm sorry.") / **job-ignore**
  ("Nine days, darling. Eight, now.").
- Counterplay, tape/workroom: "Who is she to you?" — **job-name** (`act3.theo-knows` /
  `act3.julian-knows = celeste`) / **job-withhold**. Notes: **job-date** / **job-letter**.

The answers:
- **order-comply** · complied. `act3.maya-clearance = renewed`; `c10.betrayed = theo | julian | maya
  | none`. Tape: the archive, with his key if she slept with him. Workroom: the page while Julian
  takes a call. Notes: two in the morning at the kitchen table; if Maya holds a copy, the lie to
  get it back.
- **order-refuse** · refused. `act3.maya-clearance = suspended`. She walks away; the phone lights
  at two, and at three.
- **order-counter** (when available) · countered. `act3.maya-clearance = renewed`,
  `act3.celeste-surprised = once`. Tape: Theo cuts the question and sends it himself
  (`act3.ally.theo = in`). Workroom: Julian drafts a decoy schedule (`act3.ally.julian = in`).
  Notes: one poisoned detail she chooses (`c10.poison = date | letter`).

## `answer` — What It Cost

- **refused:** Maya calls ("Somebody pulled my clearance this morning") or, if she is not close
  (`own.maya-distance = away` or not restored), Daniel tells you at noon.
  Replies (`c10.maya-told`): **maya-truth** (if Maya knows who you are) · **maya-part** ·
  **maya-nothing**; or, when she kept you out, **maya-call** · **maya-leave**.
- **complied:** the renewal comes early; a second orchid, "Lovely."; the betrayed partner doesn't
  know yet. → **wall-move** · Move Celeste's card closer to the middle.
- **countered:** the renewal comes on the ninth day; C.: "You edit well, darling. So does he." /
  "Julian always did draft beautiful fictions." / "Such a tidy hand. Such a tired one."
  Replies (`c10.reply`): **reply-silence** · **reply-orchid** ("Breakfast was lovely. — E.").

All → `invitation`.

## `invitation` — The First Thursday

The card: *"The first Thursday. The Vesper Gallery, eight o'clock. Some of our clients would love to
meet you. Wear the green. Bring nobody. — C."* (Ch11's field op.) If `act3.board-day` is known:
the board's own day.

- **invite-accept** ("I know.") / **invite-wait** (`c10.invitation = accepted | pending`).
- **Wear the green** (`c10.green`, pass 2; Chapter 11 reads it): **green-own** (the gala green, if
  `c8.gala`) · **green-odile** (if the campaign: `own.odile = owed`) · **green-buy** ($150) ·
  **green-black** (refuse the colour).
- Then, only with a partner she already chose **and did not betray this chapter**
  (`eveningPartners10`): **evening-julian / evening-theo / evening-sebastian** →
  **evening-<p>-no-sex** / **evening-<p>-sex** / **evening-leave** → **evening-stop** /
  **evening-stay**. Heat 3, consent in character, fades at the act. A counterplay ally's invitation
  knows she is owned and asks her anyway. `c10.evening-outcome`.
- **close-end** · Stay in tonight.

## `complete`

(After a chosen night: *The orchid has opened another flower in the night.*)

> t: She knows my name. Both of them. And for the first time since the clinic I know exactly what
> I am being asked to be. That, at least, is something to push against.

---

## Content checklist (CONTENT_DIRECTION §11)

Chosen intimacy only, heat 3, fades · no coerced sexual content (Ch13 holds the reserved beat) ·
comply / refuse / counterplay each with a cost · refusal lands on Maya's clearance only (tested) ·
the threat to Maya is non-sexual · the leverage is specific and recorded (the board) · the clinic is
untouched.

## Tests

`tests/state/chapter10.test.ts` (every target × answer, the evening firewall, the board);
`tests/state/chapter10-golden.test.ts` with `tests/fixtures/rev19-chapter10-golden.json`
(refuse-notes, comply-workroom, counter-workroom; recapture:
`EVE_CAPTURE_CH10=1 npx vitest run tests/tools/capture-chapter10-golden.test.ts`).

## Size (honest)

Pass 1 builds every scene, branch and consequence in the design. Measured on full paths:
**~1.5–1.9k words**, against the 12.5k budget. Pass 2 (2026-09-24) adds the question
about Evelyn, Celeste's question back, the article, the doorstep, a moment inside every job, fuller
aftermaths and the green: **~2.3–2.7k words** on full paths. Deepening passes follow (the breakfast conversation,
the job scenes and the calls are the biggest lifts), as with Chapters 7–9.
