# Revision 19 script — Sebastian lane and Maya number (Chapter 5)

Status: **design script for EVE Code to transcribe into `src/content`.** The design
authority is [NON_JULIAN_SOCIAL_LANE.md](../NON_JULIAN_SOCIAL_LANE.md) and
[MAYA_FRIENDSHIP_LANE.md](../MAYA_FRIENDSHIP_LANE.md).

Format per option: **id** · label · *hint line* · then the blocks it returns.
`p:` is a paragraph, `q(Name):` is speech and `t:` is a thought. Flags are listed under
each option. Keep the existing house conventions: second person, present tense,
curly quotes. Wording is final unless a line is marked *(alt)*.

---

## 1. Harbour `room`: the sound check (optional seed)

Available wherever the existing `room` attention options are offered. Uses 1 of the 2
`c5.attention` stops.

**attention-sebastian** · Follow the cello into the side room · *An open rehearsal. No introduction owed, no promise to attend.*

> p: Behind the programme wall a door stands half open. Someone is playing the same eight bars over and over, stopping each time in the same place. You step inside. A man sits alone with a cello in the middle of a stacked-chair room, sleeves pushed to the elbow, a pair of reading glasses hanging on a cord at his chest. He finishes the phrase before he looks up.
>
> q(Sebastian): Stay if you want. I'm arguing with the middle section and losing.
>
> p: He plays it through once more. It is beautiful, and then for about four bars it isn't. It wanders, as if it has forgotten where it was going.
>
> q(Sebastian): Be honest. Does it drag?

Sub-choice (sets `c5.sebastian-note`, then returns to `room`):

- **sebastian-honest** · "It loses its nerve in the middle." · *Say what you actually heard.*
  > q(Sebastian): *(he laughs, once, surprised)* Loses its nerve. Yes. That's exactly what it does.
  >
  > p: He writes something on the score in pencil without looking away from you.
- **sebastian-kind** · "It's lovely. Maybe a little long." · *Soften it.*
  > q(Sebastian): A little long. That's what people say when it's a lot long. Thank you for being gentle about it.
- **sebastian-silent** · Say nothing and listen to it again · *Give no verdict.*
  > p: You don't answer. He takes that as permission and plays it a third time. Neither of you says anything when it stops.

All three continue with:

> p: He sets the bow across his knee, reaches into the case and holds out a card: Harbour's rooftop music hour, tomorrow, twenty-thirty.
>
> q(Sebastian): I'm playing it properly tomorrow night. If you're free, come up. If not, not. I'm Sebastian.
>
> p: You take the card. His eyes stay on you a moment longer than the question needed. You notice. So does he, and he doesn't pretend otherwise.

Flags: `c5.sebastian-met = harbour`, `c5.sebastian-note = honest | kind | silent`, and
consume one `c5.attention`. Note: "Evelynn listened to a cellist's rehearsal at Harbour
and received the rooftop guest card from him. No obligation."

---

## 2. `people` (18:00–19:00): Maya's new number

Only offered if the personal-phone purchase happened in `spend`. Uses one of the two
`c5.messages` sends.

**maya-new-number** · Send Maya the new number, and nothing else · *From the personal phone. Axiom does not monitor this line. No explanation attached.*

> p: You type the number into a message on the new phone, delete the sentence you started after it, and send only the digits.
>
> p: It takes her four minutes.
>
> q(Maya · new number): Received. That's a new habit for you.
>
> p: You read it twice. It isn't a question, and it isn't nothing.

Flags: `c5.maya-clean-line`. Note: "Evelynn sent Maya a personal number from an
unmonitored phone. Maya saved it. No content disclosed."

---

## 3. `want` (20:00): the salon with Sebastian

In revision 19 the existing `want-salon` target leads here instead of to the old
motive choices. The salon **has no instrumental or mixed motive options**. Julian's
`want-julian` branch is unchanged.

### 3a. Choosing to go

`want-salon` keeps its id. New label and hint:

**want-salon** · Go up to the rooftop music hour · *A free guest hour. Nothing to purchase, publish or promise.*

> *met:* p: The card from yesterday is still in your bag. You turn it over once, and you already know you are going.
>
> *unmet:* p: The Harbour guest card says twenty-thirty, roof terrace. There is still time to get there.

### 3b. The set (on arrival, for both variants)

> p: The roof is quieter than the city under it. Forty chairs, perhaps half of them taken. Glass balustrades, the towers lit behind them, a warm strip of light along the parapet. A cellist walks out without an introduction, sits, and begins.
>
> *met:* p: It is the piece from the side room. When he reaches the middle section he does something different. Where it used to wander, he holds one long note until the whole roof leans towards it, then turns the corner as if it had never had any doubt. He finds you in the second row at the end of the phrase. It was your note.
>
> *unmet:* p: The playing is unhurried and very exact. Halfway through, he slows one passage almost to stopping, and the roof goes so still you can hear the traffic forty floors down. You realise you have been holding your breath.
>
> p: For an hour nobody asks you for anything. When it ends, the applause is small and real. People drift towards the stairs.

### 3c. After the set

**salon-talk** · Stay and talk to him · *An ordinary conversation. Nothing is owed after it.*

> *met:* q(Sebastian): You came. And you were right, it had lost its nerve. Did I fix it, or did I just make it louder?
>
> *unmet:* q(Sebastian): You were the one not checking your phone. Thank you for that. Most people listen like they're waiting for their turn.
>
> p: He packs the cello without hurrying and sits on the edge of the low stage, one arm across his knee.
>
> q(Sebastian): Tell me one thing that's true about you. Not your job. Something you'd be annoyed to have got wrong.

Sub-choice (sets `c5.sebastian-talk`):

- **talk-true** · Tell him something true · *Something real about you, nothing about the case.*
  > p: You tell him you've only recently started choosing your own clothes, and that you are better at it than you expected. It's the truest thing you've said aloud in days.
  >
  > q(Sebastian): Then you're ahead of most people in this building. They're still wearing what someone chose for them.
- **talk-deflect** · Turn the question back on him · *Keep your own counsel.*
  > q(Sebastian): Fair. Mine, then. I've been avoiding my brother for a month because he wants to sell our mother's house, and he's right. There. Now you owe me nothing.
- **talk-lie** · Give him a light, pleasant fiction · *He cannot check it. It costs you nothing tonight.*
  > p: You tell him you grew up by the sea. He takes it at face value, visibly, as a gift, and asks what the water sounded like in winter. You invent that too. It is easier than it should be.

**salon-request** · Ask him to play something for you · *Your choice of music, for no one else's reasons.*

> q(Sebastian): Name it.
>
> p: You say the first piece that comes to you. Not something Evelyn Vale should like, not something that would suit a dossier. Something you want to hear.
>
> p: He takes the cello back out. Most of the roof has gone. He plays it for you, and he doesn't look at the instrument once.

(`salon-request` sets `c5.sebastian-played`. It can be taken before or after
`salon-talk`. After either, the offer below is available.)

**salon-leave** · Leave while the music is still in your head · *A complete ending. Nothing is lost.*

> p: You stand. He sees it and nods, no disappointment in it, only acknowledgement.
>
> q(Sebastian): Goodnight. Thank you for listening properly.
>
> p: You take the stairs down with the last phrase still going round, and it stays with you all the way home.

Flags: `c5.sebastian-outcome = left` → `return`.

### 3d. The offer (after talk or request)

> q(Sebastian): I'm walking back along the water. Come if you want to. You don't owe me a reason either way.

**sebastian-decline** · Say goodnight here · *A full answer. He means what he said.*

> q(Sebastian): Then goodnight, and thank you. It was a better hour for having you in it.
>
> p: He shoulders the case and goes. There's nothing unfinished in it.

`c5.sebastian-outcome = declined` → `return`.

**sebastian-walk** · Walk with him, as company · *Conversation and the water. Nothing more is proposed.*

> p: The promenade is lit low and the tide is in. He carries the cello on his back and talks about the four cities on the tour, and which hall he dreads. You tell him which one you'd dread, and why. At his hotel he stops under the entrance light.
>
> q(Sebastian): I'll send you the middle section when it's finished. If you want it.
>
> p: You say you want it. He says goodnight like a man who has enjoyed exactly what happened and wanted nothing else from it.

`c5.sebastian-outcome = walk` → `return`.

**sebastian-open** · Tell him you don't know yet · *Leave it open. No answer is owed tonight.*

> q(Sebastian): That's allowed.
>
> p: He writes a number and four city names on the back of the programme.
>
> q(Sebastian): I'm here until Thursday. That's not a deadline. It's just the train.

`c5.sebastian-outcome = open` → `return`.

**sebastian-want** · Tell him you want him · *Your desire, said plainly. Nothing is agreed until you choose what you want tonight.*

> p: You say it without dressing it up. His answer comes just as plainly.
>
> q(Sebastian): I want you too. I have since you told me it lost its nerve. *(unmet: since you stopped breathing in the slow part.)* So tell me what you'd like tonight, and we'll start there.

`c5.desire = wanted`, `c5.want-target = sebastian` → 3e.

### 3e. Scope (fresh consent, reuses the `intimate5` machinery with partner `sebastian`)

**scope-no-sex** · Go back with him, but not sex tonight · *Kissing, touch, undressing, and stopping where you choose.*

> q(Sebastian): Good. I'd like that very much. You say stop and I stop, and I'll say it too if I need to.

**scope-sex** · Go back with him and have sex · *Your stated choice. Either of you can stop at any time.*

> q(Sebastian): Yes. And the same rule both ways: either of us says stop, and it stops.

**scope-back** · Change your mind and say goodnight · *Withdrawing now is complete and respected.*

> q(Sebastian): Then goodnight. Honestly, I'm glad you said it.

(`scope-back` sets `c5.sebastian-outcome = withdrawn` → `return`.)

### 3f. Handoff (his hotel room, lamp light, the cello case against the wall)

The lead-in is shared by both scopes:

> p: His room is small and warm. He switches on one lamp, not the overhead light, and props the cello case against the wall as if introducing it. He takes the rings off one by one and sets them on the dresser. You watch his hands do it.
>
> q(Sebastian): Come here.
>
> p: The first kiss is slow enough to be a question and certain enough to be an answer. His hand finds the pins in your hair and waits until you nod before taking them out.

**handoff-withdraw** · Stop here · *Honored immediately, without argument.*

> p: You put your hand flat on his chest. He stops at once and steps back half a pace, breathing hard, smiling a little.
>
> q(Sebastian): All right. Stay for a glass of water, or I'll walk you down. Either is fine.
>
> p: You take the water. He means it, and that is its own kind of pleasure.

`c5.sebastian-outcome = withdrawn`.

**handoff-continue** · Stay · *Continue within the scope you chose.*

- **no-sex scope** (write in full here, heat 2–3):
  > p: You let him undo the dress. He does it slowly and says out loud what he likes about what he finds, and every word of it lands. You pull his shirt over his head and learn the shape of him with your hands. At some point you are on the bed with his mouth at your throat and your heels kicked off somewhere in the dark, and it is very good, and when you say "that's where tonight stops", he laughs against your skin and stays exactly there with you.
  >
  > `c5.sebastian-outcome = intimate-no-sex`.
- **sex scope:** the **explicit body comes from the local writer card** `docs/story/intimate/cards/c5-sebastian-night.md`, written by design and drafted by the `writer` model. Code inserts the chosen take here. A placeholder until the take is chosen:
  > p: *(explicit body — writer card c5-sebastian-night)*
  >
  > `c5.sebastian-outcome = intimate-sex`.

Both continue with the aftermath:

> p: Later, the lamp is still on. He is drawing a slow line down your spine with one finger, humming the middle section, the new version.
>
> q(Sebastian): It holds its nerve now. I have you to blame for that.

→ `return`.

---

## 4. `return` (22:30) and later: lines that remember

Show one line, chosen by the highest-priority matching state:

| State | Line |
|---|---|
| intimate-sex / intimate-no-sex | p: You get home after midnight with your hair still down and the smell of his coat on your dress. You don't hurry to change. |
| withdrawn (at handoff) | p: You stopped when you wanted to stop, and he let it be simple. You're surprised by how much that stays with you. |
| walk | p: The programme with the four city names is in your bag. You don't take it out; you know where it is. |
| open | p: The number is on the back of the programme. Thursday is three days away. It is just a train. |
| declined / left | p: The last phrase is still in your head when you unlock the door. It's yours to keep; nobody gave it to you in exchange for anything. |
| talk-lie (add after any line above) | t: The sea. You wonder what the winter water really sounds like. |

For `complete` and the Chapter 6 entry state, carry `c5.sebastian-outcome`,
`c5.sebastian-talk`, `c5.sebastian-played`, `c5.sebastian-met` and
`c5.maya-clean-line`.

---

## Notes for EVE Code

- New NPC `sebastian`, age 38, bio from the lane doc. `npcs.sebastian.known` starts empty. Only what Evelynn says to him gets recorded.
- `salon-talk` and `salon-request` can both be taken, in either order. `salon-leave` is available alongside them.
- Nothing in the investigation, Helix, Axiom or Sloane may read any `c5.sebastian-*` flag.
- Keep `want-none`, `want-julian` and every Julian flag untouched. `want-salon` now leads to 3b instead of the old motive choices. The old choice ids stay valid in the frozen revision 18 only.
- Tests: salon reachable (met and unmet) with every Julian state; decline, leave, open and walk each reach `return` with their line; withdrawal works at scope and at handoff; no instrumental or mixed motive options appear for the salon; the Maya number option appears only with the personal phone and consumes a send.
