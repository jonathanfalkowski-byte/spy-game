# Chapter 7 (own-power) — "Standing Alone" script

> **Deepened 2026-09-24 (heat-and-danger pass, Celebrity route).** The implemented wording now lives in
> `src/content/chapter7-own.ts`: the celebrity morning; each hub door as a scene with its own choice (the
> registry night desk: charm or pay; drinks with Maya: truth or shield; the ferry-terminal dead drop; the
> live interview, per [CHAPTER_7_CELEBRITY_SAMPLE_INTERVIEW.md](CHAPTER_7_CELEBRITY_SAMPLE_INTERVIEW.md));
> and an optional chosen evening with Julian or Sebastian (consent-gated, heat 3, fades). The pieces and
> hooks below are unchanged. "No intimacy in this chapter" is superseded by the chosen evening.

Source of wording and flags for EVE Code. The first own-power development chapter. Design
authority: [OWN_POWER_ROUTE.md](../routes/OWN_POWER_ROUTE.md),
[CHAPTER_7_ROUTE_CONFIRM.md](../CHAPTER_7_ROUTE_CONFIRM.md) (the confirm beat that precedes
this), [CAMPAIGN_ROUTE_MAP.md](../CAMPAIGN_ROUTE_MAP.md).

Format as before. This chapter plays only when `route.lane = own-power`. Driving question
(settled): **who authorized reusing the Evelyn identity for Candidate 7A** — the seam
between ORACLE's prediction and Sloane's decision. Phases: `confirm` (shared) → `standing`
→ `pursue` (hub) → `close`.

Implementation note: this is a **new gated content revision** (like Chapter 6, additive,
behind a `VITE_EVE_CHAPTER7`-style gate). Reachable only from Chapter 6 `complete` with
`route.lane = own-power`.

---

## Phase `confirm` — the route beat (already scripted)

Plays the confirm-or-redirect beat from `CHAPTER_7_ROUTE_CONFIRM.md`, which sets
`route.lane` and `route.entry`. When the chosen lane is **own-power**, continue to
`standing`. (Other lanes route to their own chapters — not built yet.)

## Phase `standing` — Standing Alone

### Entry frame — by `route.entry`

- **built:**
  > p: You wake in a life with your name on all of it and no one else's. The desk you pay for, the phone that answers only to you, the small stubborn independence you spent real money to keep. It is quieter than the lives you were offered. This morning you find out what quiet is worth.
- **partial:**
  > p: You turned toward this a week ago and you are still learning the footing. Some of what you built still holds; some of it you are building now, in the open, with your own hands. It is slower this way. You knew that when you chose it.
- **unbuilt:**
  > p: A week ago you walked out of the arrangement that made everything easy, and into this — a room you pay for that is barely furnished, a budget you can count, a quiet that is mostly just alone. You chose it against everything that pointed the other way. Now you have to make it into something before it makes you regret it.

### The question surfaces

> p: You keep circling the same seam. ORACLE predicted you would take the identity willingly and that Sloane could not hold you — and Sloane proceeded anyway. But Sloane did not build the Evelyn identity. She was handed it, the way you were. Someone, above her or before her, decided a real operative's whole life could be pulled off a shelf and fitted to Adrian Vale.
>
> t: Who signed that. Not who ran it — who *authorized* reusing her. That name is the start of the real shape of this, and you have no clearance to ask for it. Which means you do it the only way left to you. Yourself.

### The money reality (own.cash, seeded from c5.cash)

> p: You count what you have. *(built/partial:)* Enough to work with, if you are careful and the work is quick. *(unbuilt:)* Barely enough, if nothing goes wrong. Every road from here costs something — money, time, or being seen — and you are the one who pays.

→ **standing-begin** · Start pulling the thread · *No clearance, no cover. Your tools only.* → `pursue`.

## Phase `pursue` — the hub (own-power tools)

A hub: each unlocked approach is playable once and returns here; each yields **one piece** of
the answer and exacts its own cost. Take **two** pieces to reach the finding (a `pursue-stop`
option lets her stop with one, or none, and carry a thinner case to Chapter 8). Options are
gated by what she actually has — a player missing an audience or a Rook line simply doesn't
see that door.

**pursue-records** · Dig the public record yourself · *Slow, legal, entirely yours. Costs time and a small fee.* *(always available — the free-agent core)*

> p: You do it the patient way: corporate registries, property filings, the procurement trail a cover identity leaves when someone has to pay for it. Hours of it, and a records fee you feel.
>
> p: The apartment you live in, and the accounts that dress the Evelyn identity, trace to a single holding company — **Meridian Holdings**. The same word that was on the courier page. Its only named officer is an initial, and a registered agent that exists to have no face.
>
> t: Meridian. Whoever reused her, reused her *name for the operation too*. That is not tidiness. That is someone who was there the first time.
>
> Sets `own.piece.records = meridian`; deducts a small `own.cash`.

**pursue-maya** · Ask Maya what a sign-off like that looks like · *Public-file scope only. She tells you where to look, not the answer.* *(gated: `c6.maya ∈ {restored, paused-by-maya}` and not strained; respects "my work files stay at work")*

> q(Maya): I can't pull it and I wouldn't. But I can tell you this much for free: a reuse authorization — taking a live legend off one operative and fitting it to another — never clears at Compliance. That's a directorate signature or higher. Someone with the authority to spend a person.
>
> p: She has not named anyone. She has drawn you a floor: this was signed at the level of a directorate — Executive Intelligence, or above it. Sloane's level, or over Sloane's head.
>
> Sets `own.piece.maya = directorate`; costs nothing but cannot be re-asked (her limit).

**pursue-rook** · Trade the sender for a name · *Fast, and you can't fully source it. A piece for a piece.* *(gated: `npcs.rook` engaged — proof opened, any outcome)*

> q(Unknown sender): You want the signature. I have it. It costs — not money, information. Tell me one thing you have not told anyone, and I will tell you who spent her.
>
> The trade (player picks what to give, each a real cost):
> - **rook-trade-fact** · Give a fact you hold · *(spends a held evidence detail into Rook's hands)*
> - **rook-trade-debt** · Owe them one instead · *(sets `own.alliance.rook = owed` — a marker Chapter 8 can call)*
> - **rook-refuse-trade** · Refuse; take nothing · → back to hub, no piece from Rook.
>
> *(on a trade):* q(Unknown sender): It was not Sloane's authority to give. She executed it. The signature is on the Project Eve board — and one name there you have already met, and did not expect.
>
> t: Or that is exactly what someone would say to point you away from Sloane and toward a door of their choosing. You cannot source it. You write it down with a mark next to it: unconfirmed, and convenient.
>
> Sets `own.piece.rook = board` (flagged unverified).

**pursue-audience** · Ask the question in public · *Your visibility surfaces a source — and tells Sloane you're looking.* *(gated: `c5.published` / `own.audience`)*

> p: You use the one megaphone you own. Not an accusation — a careful, deniable question, the kind that only means something to someone who already knows: a line about identities that outlive the people who wore them, placed where your readers are.
>
> p: Someone answers. A message from an account that deletes itself an hour later, from somebody who was adjacent to Project Eve and is frightened: *"You're asking the right question about the wrong person. She didn't authorize it. Stop looking where they want you to."*
>
> p: And the cost, immediately: your question was public. Somewhere in Sloane's directorate, a note is made that the independent one is asking who authorized the reuse.
>
> Sets `own.piece.audience = adjacent`; sets `own.exposed = true` (a Sloane-visible entry that Chapter 8 reads).

**pursue-stop** · Stop here; work with what you have · *You don't have to spend more to move.* → `close` (with however many pieces she has).

## Phase `close` — the first finding

The finding scales with the pieces held. Two or more that agree produce the real shape; one
produces a thinner lead; none produces only a resolve to keep looking.

- **Two or more pieces:**
  > p: You lay the pieces beside each other. Meridian — the operation's own name, reused. A signature that had to come from directorate level or above. And, from more than one direction, the same wrongness: *Sloane did not author this. She was handed it, the way you were.*
  > t: You went looking for who signed off on reusing her, and you found the first true edge of the shape: the person you have spent this whole affair fearing is not the top of it. Sloane executed a decision made over her head, by whoever controls Meridian and sits on the Project Eve board. That is who you are actually looking for. And you found the edge of it with no clearance, no cover, and no one's permission but your own.
- **One piece:**
  > p: One thread, not yet a shape — a name that is only an initial, or a floor without a face, or a warning you cannot source. It points somewhere above Sloane. It is not enough to act on. It is enough to know you are pulling the right thread.
- **No pieces (pursue-stop taken first):**
  > p: You did not spend what it would have cost, and you carry the question forward unanswered. That is a choice, not a failure. The thread is still there. So is the money you kept.

Cost register (shared close):

> p: *(if own.exposed:)* You are more visible than you were this morning; Sloane's directorate knows the independent one is asking. *(if own.cash spent:)* You are lighter in the pocket than you were, and there is no one to bill. *(always:)* And you are still the only person holding what you found. → Chapter 7 `complete`.

> t: Standing alone is slower, and it costs, and it is beginning to be seen. It is also, so far, working — and it is entirely yours. → sets up Chapter 8, "The Cost Bites."

---

## Flags this chapter sets

`own.piece.{records,maya,rook,audience}`, `own.alliance.rook` (owed, if traded on debt),
`own.exposed` (bool — audience used; Chapter 8 reads it as Sloane's notice), `own.cash`
deductions, and a `c7.finding ∈ {shape, lead, none}` derived at `close` for Chapter 8's
entry. All sourced and re-derivable.

## Notes for EVE Code

- New gated content revision (additive), reachable only from Chapter 6 `complete` with `route.lane = own-power`; the confirm beat (`CHAPTER_7_ROUTE_CONFIRM.md`) is its first phase and writes `route.lane`/`route.entry`.
- The `pursue` hub mirrors the Chapter 5 `room` / Chapter 6 `friction` pattern: gated one-shot options returning to the hub, a stop option, and a piece budget of two before `close` auto-advances.
- Gates: `pursue-records` always; `pursue-maya` on a non-strained Maya; `pursue-rook` on any engaged `npcs.rook`; `pursue-audience` on `c5.published`. A player with only records still reaches a one-piece lead — the autonomy guarantee (the thread is pullable with the free-agent core alone).
- `own.exposed` and `own.alliance.rook = owed` are the two hooks Chapter 8 ("The Cost Bites") reads; store them cleanly.
- No intimacy in this chapter.

## Set pieces (2026-09-24)

Prose only, no new choices or flags; the wording lives in `src/content/chapter7-own.ts`. Written as
scenes: the quiet morning (the bakery croissant, the old man's weather forecast), Odile's appraisal at
the Carlisle ("Somebody taught you to sit like that."), every answer to the watcher, the campaign and
the card, the envelope of ways in with its prices in pencil, the sender's voice pausing before her
name, the day between the doors (the errands, the cameras that do not point at the road), a close
with nothing or with one thread, and the night alone (the omelette, the make-up coming off in
layers, the two bells).

## New scene: the Old Flat (2026-09-24)

In `standing`, after the letter (every card answer leads into it), before the hub. She walks
without deciding to to Adrian's old street across the river: the launderette, number 14's green
door, yellow curtains in his window, and K. OKAFOR on masking tape over his name. `c7.old-flat`:
- **flat-ring** · the new tenant, Kemi Okafor, a night nurse; "the quiet one"; Adrian's post,
  including Axiom's letter that his personal effects "have now been collected in full". She never
  collected anything (a fact, `c7.old-flat`, for later chapters to answer).
- **flat-watch** · the launderette woman on the wall: he carried her baskets every Saturday for a
  year; a van took everything in an afternoon; "You're the first."
- **flat-go** (neutral pick) · the river path he ran every morning; the regular with the turned-out
  left foot who nodded to Adrian for six years and does not nod to her.

Adrian's official status stays open ("went away", "wasn't coming back"): nobody says he died.

## New scenes, round 2 (2026-09-24)

- **Evie** (`standing`, after the Old Flat): on the bridge home, Lotte from Emerald Hill hugs her as
  "Evie". `c7.lotte`: **evie-play** (take her number; a fact) · **evie-ask** ("You and C. out on the
  balcony every night, plotting"; a fact) · **evie-deny** (neutral; she looks back, unconvinced).
- **The night tram** (entering `close`, before the notes): Daniel, who worked across the corridor
  from Adrian for six years, in a terrible tie; they gave Adrian's desk away today. `c7.daniel`:
  **daniel-ask** ("You always think there'll be another Friday") · **daniel-tie** ("That tie doesn't
  suit you": Adrian's line; Daniel nearly sees him) · **daniel-quiet** (neutral; the chewed lid).

## New scenes, round 3 (2026-09-24)

- **The lift** (the hub opens on it; `standing-begin` sets `c7.pursue-open = lift`, and the envelope
  of ways in follows it): at seven, a man in a grey coat with dry shoulders, no button pressed,
  "Good evening, Ms Vale." `c7.lift`: **lift-speak** ("Mind the window. It sticks.": it does, and she
  told nobody) · **lift-out** (neutral; the stairs, and the lift already open on her floor) ·
  **lift-stare** (he gets out at eight).
- **A letter from Amy** (`close`, after the tram, only if Chapter 5 published): nineteen, started
  again somewhere nobody knew her; "you looked like somebody who had started again too and made it
  look like a choice." `c7.fan`: **fan-answer** · **fan-keep** (in the mirror frame) · **fan-away**
  (neutral).
- The tram now comes at the end of the close (a restless late ride out and back), just before its
  choice.

## Sequence: The Grey Coat (2026-09-25)

After the lift (held in `c7.pursue-open`: lift → grey → grey-door), before the envelope of ways in.
The next morning the man from the lift is on the bench by the bakery, shoulders dry on a wet day; at
half past eight she follows him across the river.
1. **How she follows** (`c7.grey`): **grey-close** (he knows by the second corner and leaves her a
   coffee, "Black, no sugar": "Adrian took milk") · **grey-far** (neutral; windows and a bus; she
   finds him by the only dry coat at the market) · **grey-ahead** (the return address on her tenancy
   letters; he nods at her through the café window). All end at a green door in a mews behind the
   old customs house: PROPERTY SERVICES.
2. **At the door** (`c7.grey-door`): **grey-ring** (a tenant with a sticking window; "Your
   building's one of Mr Pryce's"; the owner's office wants him to do all the maintenance on her flat
   personally; her key hook is empty; a fact) · **grey-watch** (he comes out with a tool bag and a key on a
   red tag, heading for her building) · **grey-home** (neutral; the long way, not home until dark).
3. **That evening**: the window slides up without a sound. Fresh screws, and a sticker: SERVICED, a
   date, D.P. "They fixed my window. It is the most frightening thing anyone has ever done for me."

Chapter 9's watcher's rent finds the same man.

## Sequence: His Things (2026-09-25)

In `close`, after the night tram and before Amy's letter and the notes (held in `c7.box-open`: open
→ face → letter). The night concierge has signed for Axiom's courier: PERSONAL EFFECTS — VALE, A. —
RELEASED TO NOMINATED PARTY: MS E. VALE.
1. **How she opens it** (`c7.box`): **box-now** (neutral; on her knees with the big knife) ·
   **box-dark** (curtains, the phone in the bread bin) · **box-wait** (she gives up at three).
2. **The contents**: the running watch stopped at twenty to seven, the sweatshirt with the hole, the
   reading glasses, the paperback two-thirds read; a leaving-do photograph. His face. (`c7.face`):
   **face-look** ("Goodbye, then.") · **face-down** (neutral) · **face-mirror** ("They kept the
   tiredness. I suppose it was load-bearing.").
3. **The jacket**, navy, shiny at the elbows; in the lining the spare key and a sealed envelope,
   "Re: Resignation." (`c7.letter`): **letter-read** ("what I am like when nobody is scoring me") ·
   **letter-keep** (neutral) · **letter-burn**.
4. The release slip: AUTHORISED, V. Sloane, Executive Intelligence. "Either it is a test… or it is
   the only apology she knows how to make." The jacket goes in her wardrobe; the notes and Chapter
   8's break-in use its lining.

## Sequence: The Post Room (2026-09-25)

In `standing`, after the letter from C. (every card answer leads down to it) and before the Old
Flat (held in `c7.post-open`: ask → bundle). The basement post room, Tomasz the porter, and a deeper
shelf marked HELD.
1. **How she gets at it** (`c7.post`): **post-ask** (neutral; "Everything held has a card") ·
   **post-charm** (the headphones; "Yours is the oldest in the box") · **post-wait** (his lunch
   break; nothing down here is locked).
2. **The card**: HOLD ALL ITEMS — MS E. VALE — UNTIL ADVISED. RELEASE ON INSTRUCTION ONLY. —
   Property Services, D.P. Dated fourteen months ago; a RELEASE slip from last Tuesday, same
   initials; the first Evelynn's bundle of post. (`c7.bundle`): **bundle-take** (she signs for it in
   her name) · **bundle-card** (photographed; a fact) · **bundle-leave** (neutral).
3. With the porter there: "He comes in on Thursdays, Mr P., from the agents… He always knows."

D.P. is Mr Pryce, the man from the lift: the initials arrive before the man does.

## Structure after the restructuring pass (2026-09-25)

Each sequence is its own phase, with its own title, place and art stand-in, and its lead-in is that
phase's opening. Choice ids did not change, so the goldens replay the same moves; only their hashes
moved.

| Phase | Title | Place | Holds |
|---|---|---|---|
| `standing` | Standing Alone | MORNING · ON YOUR OWN | the morning, the watcher, Odile, the letter, the card |
| `held` | Held | NOON · THE POST ROOM | the post room |
| `street` | His Street | AFTERNOON · ACROSS THE RIVER | the Old Flat, the bridge, then `standing-begin` |
| `lift` | The Lift | 19:00 · YOUR BUILDING | the lift |
| `grey` | The Grey Coat | MORNING · FOLLOWING HIM | the tail, the green door, the window fixed |
| `pursue` | Pulling the Thread | · THE PATIENT WAY | the envelope of ways in, the hub |
| `close` | The First Edge | · WHAT YOU FOUND | the finding, the night tram |
| `effects` | His Things | NIGHT · THE KITCHEN FLOOR | the box, Amy's letter |
| `night` | Tonight | LATE · YOUR FLAT | the notes, the evening, `close-end` |

`enterClose7` still fixes the finding on entering `close`. The evening's place lines now key on
`night`.
