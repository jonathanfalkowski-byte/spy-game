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

**The menu** (`c10.menu`, the set piece): at the Lindqvist, *"Shall I order for you? I know what you
like."* — **menu-let** (Evelyn's eggs, which Celeste used to eat for her) / **menu-own** (Adrian's
black coffee and dry toast: "That's new."). At the bakery, the too-sweet coffee she brought
(two sugars and cinnamon: Evelyn's) / buying your own.

**Celeste's reading of your week** (all that apply, in order): the card (`c7.card` kept/studied, or burned) ·
the terrace (`c9.terrace` turn/truth) · the name beat (`c9.name-beat` walk, or photos: she slides
the ninth frame across) · the station poster (`own.campaign = taken`) · Theo (in play) · else a
generic line; plus the talc trap (`c8.breakin = trap`: the woman's print was hers), notes hidden
in a coat (`c7.notes = hide`: "So did she."), Julian's view or Sebastian's train (an intimate Ch7
evening). Then: *She waits for you to begin, chin on her hand.*

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

Follow-ups: where the first Evelyn is now ("Somewhere dry"), whether she loved her ("very fond… it
lasts longer"), what Celeste is at Meridian ("Quality control.").

All end on the build and the turn: Celeste's "nothing" (Priya's promotion, Benton's slate, the
crease in the sofa), her rules ("I won't threaten you, darling… Things will simply happen"), then
**"Eat your eggs / Eat your toast / Drink your coffee, Adrian. You never did look after yourself."**
(whichever is on the table). Every way out ends on the flinch afterwards (the taxi, or the tap).

Set piece length (2026-09-24): **~1.7–2.2k words** on one path, from dawn to the flinch.

**3. How do you take it?** (`c10.adrian`) → `claimed`
- **adrian-composed** · Don't flinch. "There you are. I did hope you would be good at this."
- **adrian-asked** · Ask her what she wants. "Nothing yet, darling. That's the lovely thing about
  owning something."
- **adrian-walked** · Walk out first. "Same time next week?"

## `claimed` — Old Friends

Noon, the newsagent's queue: a stranger's phone, then the society-page photograph (Lindqvist or
bakery), taken from a table inside the room; caption *Old friends. Evelynn Vale and Celeste
Laurent, reunited.*; the article ("rarely photographed and never interviewed"; the two women "go back
years"); the comments ("Nobody you will ever meet."). Then the phone, four numbers taking turns.

Each call is a short scene (set pieces, 2026-09-24): Sloane ("I don't make offers on open lines"),
Maya from the stairwell (the break-room joke, "Adrian's friend from the magazine"), Theo (two
photographs of Laurent in twenty years; "People like her are never photographed by accident"),
Odile from a fitting ("When somebody pays in advance, it is never for the face").

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

The mirror comes off the wardrobe door; Adrian did this once before, on a kitchen door; index
cards, red thread, pins.

→ **wall-build** · Put it all on the wall (stays in `wall`). Sets `c10.wall = built` (the leverage
board opens in Records) and fixes `c10.target`. Celeste's card first, at eye height; one card per
holder from `src/content/leverage.ts`; her own column; the thread runs out and she finishes in black.

**Where she keeps it** (`c10.wall-kept`, set pieces; Chapter 11 reads it) → `order`:
**wall-close** (close the wardrobe on it) · **wall-photo** (photograph it, take it down each morning,
the pins stay in the wood) · **wall-open** (leave it facing the bed: let them read it).

## `order` — One Small Thing

The courier at 23:00 (gone before the concierge rings; the envelope squared to the door frame); a
black phone with one contact, **C.**, that lights in her hand: *"Maya Reyes. Compliance, level three.
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

**Second moments** (`c10.job-after`, the job set pieces): after the first moment settles the
answer, five jobs hold one more before `answer`:
- Tape comply, leaving: with his key, the guard in the booth — **seen-wave** / **seen-hood**;
  otherwise the night producer's "picture for my sister" — **seen-photo** (time-stamped 00:31: an
  alibi and evidence in one frame) / **seen-no**. `c10.seen = guard | photo | none`.
- Tape counter, the loading bay at four — **bay-kiss** / **bay-thank** ("Thank me when she's
  sorry."). `c10.theo-bay`.
- Workroom comply, the car ("Whatever you were looking for up there, I hope you found it.") —
  **car-true** / **car-silent**. `c10.julian-car`.
- Workroom counter, the guard's torch again — **round-stay** / **round-photo**. `c10.julian-round`.
- Notes counter, the doorman ("Shall I say who it's from, madam?") — **doorman-e** /
  **doorman-none** ("She generally does."). `c10.doorman`.

Refusals share one night: what she walked away from, the arithmetic in the dark, Maya's card, the
phone at three, and the morning (dressed properly; the empty bench).

Set piece lengths (2026-09-24): ~390–820 words per job on one path; a full Chapter 10 path
~3.5–4.0k words.

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

- **refused:** Maya calls ("Somebody pulled my clearance this morning"; the pavement, the cactus),
  then the counter at one, as a set piece: the lanyard with nothing on the end of it, the guard who
  does the crossword with her at Christmas, the review room without a window and its three
  questions, "It hasn't felt like a few weeks for a while." If she is not close
  (`own.maya-distance = away` or not restored), Daniel rings at noon ("She's Maya.").
  Replies (`c10.maya-told`): **maya-truth** (if Maya knows who you are) · **maya-part** ·
  **maya-nothing**; or, when she kept you out, **maya-call** · **maya-leave**.
- **complied:** the renewal comes early (Maya's baffled message, if she is back); a second orchid,
  "Lovely."; the betrayed partner doesn't know yet. → **wall-move** · Move Celeste's card closer to
  the middle, or **wall-card** · pin "Lovely." under her name, a receipt (`c10.reply = move | card`).
- **countered:** the renewal comes on the ninth day; eight days of silence from the black phone;
  then, at midnight, C.: "You edit well, darling. So does he." /
  "Julian always did draft beautiful fictions." / "Such a tidy hand. Such a tired one."
  Replies (`c10.reply`): **reply-silence** · **reply-orchid** ("Breakfast was lovely. — E.").

All → `invitation`.

## `invitation` — The First Thursday

The card: *"The first Thursday. The Vesper Gallery, eight o'clock. Some of our clients would love to
meet you. Wear the green. Bring nobody. — C."* (Ch11's field op.) If `act3.board-day` is known:
the board's own day.

- The card arrives by the concierge's hand; the Vesper Gallery, black glass, one painting, never
  for sale. **invite-accept** ("I know." / "They are all so like you.") / **invite-wait** (a car is
  booked in her name anyway) (`c10.invitation = accepted | pending`).
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

(After a chosen night: *The orchid has opened another flower in the night.* Otherwise, the orchid
in the street light.) Then the wall, by answer: Maya pinned back inside the thread; the tighter
thread; the inch of bare wood.

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

Set pieces (2026-09-24): the breakfast, then every job, then the remaining scenes (the photograph and
the calls, the doorstep, the wall and where she keeps it, the courier, Maya's counter scene and every
aftermath, the invitation, the evenings, the close). Measured on the golden paths: **~4.6–4.8k
words**; engaged paths with a second job moment and an evening run longer.

## Payoffs of Chapters 7–9 (2026-09-25)

Each reads the save and says nothing when its flag is absent. The refusal's cost is still only
Maya's clearance.

| Where | Pays off | What happens |
|---|---|---|
| Breakfast, Celeste's reading of the week | Pryce's reports (`c9.window`, then two of `c9.ruth`, `c9.kessler`, `c9.auction`, `c9.table`, `c8.photos`, `c9.tailor`) | "I got your message… in a plastic sleeve. Good morning to you too." / "Mr Pryce tells me you waved." / "You sat in the dark for an hour"; "Give Ruth my love. She never takes it."; "Poor Anna. She never did learn to sail."; the portrait in her hall; Henri at Castellane; "Lotte gave you the balcony… I took it"; Mr Anand's centimetre |
| The coffee | `c7.robe = coats` | two sugars and cinnamon meets the receipt in the coat: "It did not take long." |
| Noon | `c8.lotte-meet`, `c8.hack` | Lotte: "That's C."; the Courier ran her line, or Collis rings about Meridian's lawyers |
| The doorstep | `c8.neighbour`, `c8.pryce` | Mrs Kowalczyk: "Your friend! The one with the key!"; the man in the alley is Mr Pryce |
| The wall | `c9.ruth` and the board | no card for Ruth, as promised; the board gains Mr Pryce (D.P.) as a holder, and the watcher's rent, the HELD card, the photographs, Kessler and the lawyer as assets |
| The black phone | `c10.wall-kept` with `c8.pryce` | "Mr Pryce says you finished it in black." / "a door full of pinholes" / "your wardrobe door is shut" |
| Refusal | `c8.wake`, `c7.daniel = tie` | Maya: "I took his mug to the Anchor… I saw you."; Daniel remembers the tie |
| The invitation | `c9.table` + `c9.club`, `c9.rail` | her whole first Thursday, with Evelynn at the end of it; Sloane's "before the first Thursday" |
| The green, bought | `c8.bank` | notes from the flour jar, the building-society card, or the card somebody watches |
| The close | `c9.kessler = follow` | "Anna Kessler had one season… I intend to have a great deal more than a season." |

Golden paths: Chapter 10 now ~4.9–5.1k words.
