# Chapter 6 — movements 1–4 script: benefit, expectation, friction, exit

Source of wording and flags for EVE Code's `benefit → expectation → friction → exit`
phases (the front half, before `proof`). Design authority:
[CHAPTER_6_THE_CAGE_YOU_CHOOSE.md](../CHAPTER_6_THE_CAGE_YOU_CHOOSE.md) (the six movements),
[CHAPTER_6_PROOF_AND_COUNTERPOWER.md](../CHAPTER_6_PROOF_AND_COUNTERPOWER.md) §6,
[MAYA_FRIENDSHIP_LANE.md](../MAYA_FRIENDSHIP_LANE.md) (the Counter, in movement 3).

Format as before. These four movements read the derived `c6.exit-arrangement` and the
Chapter 3–5 carry-forward, and set up the position that `proof` (5) and `counterpower` (6)
pay off. Per-arrangement blocks branch on `julian-workroom | public-artifact |
sloane-institutional | self-funded`. Design principle held throughout: a benefit is not a
debt; the cost exists only where it is actually used again or a term is actually accepted.

---

## Movement 1 — `benefit`: the convenience, used again

`chapter6.begin` has already derived `c6.exit-arrangement`. This phase shows the
arrangement being **used once more** — the repeated reliance the design requires before any
cost is legible — and lets the player read it clearly before anyone asks for anything.

### Entry frame (shared)

> p: The morning is ordinary, which is the point. Whatever you built in the last weeks is simply *there* now, part of how the day works. You use it without thinking. Then you catch yourself thinking about it.

### The arrangement in use — by `c6.exit-arrangement`

- **julian-workroom:**
  > p: You let yourself into the Helix workroom with the card that still works. Good light, quiet, a door that closes. The entry logs your name, the way it always has. It is the easiest place in the city to do your work, and it is not yours.
- **public-artifact:**
  > p: The Aster issue is still circulating, and a message waits from someone who read it — a small opportunity, attached to your name because your name is now attached to a face and a page. The visibility you released is still working for you. It is also still working.
- **sloane-institutional:**
  > p: The apartment is warm, the phone is charged, the arrangement that keeps you housed and legible runs in the background like weather. None of it is in your name. All of it is easy, and easy is a thing someone else is providing.
- **self-funded:**
  > p: You pay for the desk you use and the phone in your bag, and nobody's name is on your day but yours. It is more expensive and more work and slightly lonelier, and it is entirely yours. There is nothing here to be used against you, because you never handed anyone the other end.

### Player power (sets `c6.benefit-response`)

- **benefit-who** · Ask who this actually serves · *Name the provider and what they get.*
  > t: Someone provides this, and provision is never free of interest. Not a trap — a fact. You would rather know whose convenience you are also serving by taking your own.
  > Sets `benefit-response = examined`.
- **benefit-workaround** · Note the independent way to do the same thing · *Price the alternative before you need it.*
  > t: The public desk exists. The Harbour week you can pay for exists. You do not take them today, but you learn what they cost, so that leaving is a decision you could make and not a cliff you would fall off.
  > Sets `benefit-response = alternative-priced` (this makes movement 4's exit cheaper to read and the break cleaner).
- **benefit-accept** · Take the convenience and get on with the day · *Use it. A benefit is not a debt.*
  > t: You use the good thing because it is good, and you refuse to pretend that using it is the same as owing for it. It is not. Not yet, and maybe not ever.
  > Sets `benefit-response = accepted`.
- **benefit-leverage** · Remember what you were promised · *A prior promise is a card, not just a comfort.* *(gated: an enforceable term / prior promise exists — `c5.obligation-provider`, or julian-window / editorial term records)*
  > t: When they set this up, they said words you can hold them to. You file those words where you can reach them. If this ever tightens, you will not be arguing from nothing.
  > Sets `benefit-response = leverage-noted`.

Self-funded note: only `benefit-who` and `benefit-accept` carry the arrangement's own
framing; the workaround/leverage options read as "already independent" and simply confirm
it. → `expectation`.

## Movement 2 — `expectation`: the first ask, named

The provider makes a **concrete request tied to a real prior term** — the first, softer ask
(movement 6's demand is the escalation of this). It is not a threat; it is an assumption.

### The request — by `c6.exit-arrangement`

- **julian-workroom:**
  > q(Julian): There's a dinner Thursday — people worth your knowing, and one who asked about you by name. Come as my guest. It isn't work. I'd just like you there.
- **public-artifact:**
  > q(Aster editor): The first piece did numbers. I want a follow-up while the attention's warm — a little more of you, a little less clothed, entirely your call on where the line is. Same rights conversation as before.
- **sloane-institutional:**
  > q(Sloane): A small thing. When Compliance asks — and they will — you tell them the review of your file is closed and cooperative. It is true enough. It keeps everyone's paperwork quiet, including yours.
- **self-funded:**
  > p: No one asks you for anything, because no one is holding a thing you need. The only expectation on you today is the one you set yourself. It is a strange, light feeling, and you notice how unused to it you are.

### Player power (sets `c6.expectation-response`; self-funded skips to a single "note it and move on")

- **expect-clarify** · Ask exactly what is being requested · *Make the soft ask a specific one.*
  > p: You ask them to say the actual thing — the scope, the ask under the ask. Made specific, it is smaller than it felt, and now it is on the record as a request and not an assumption.
  > Sets `expectation-response = clarified`.
- **expect-narrow** · Agree to a strict, smaller version · *Comply only with the part you actually choose.*
  > p: You say yes to a narrow slice of it and no to the rest, in plain words, and you let the narrowness stand. The favour is honoured; the drift is not.
  > Sets `expectation-response = narrowed`.
- **expect-negotiate** · Ask for a real consideration in return · *If it is an exchange, price it.*
  > p: You treat it as the transaction it is and name your side of it. Either it becomes a fair exchange with your terms in it, or it stops being an exchange and goes back to being a favour, which is fine too.
  > Sets `expectation-response = negotiated`.
- **expect-refuse** · Decline it · *No. The benefit does not require this.*
  > p: You decline, warmly and completely. You watch to see whether the benefit was ever really free — whether "no" costs you the room, the page, the quiet. What they do next tells you what the arrangement actually was.
  > Sets `expectation-response = refused`.
- **expect-redirect** · Offer a different thing instead · *Give them a real yes that isn't this one.*
  > p: You offer something you are actually glad to give in place of the thing you are not, and you mean it. A relationship that can absorb a redirection is a different animal from one that cannot.
  > Sets `expectation-response = redirected`.

→ `friction`.

## Movement 3 — `friction`: the people, and the Counter

People react to what they actually received, not to what Evelynn feels. The centerpiece is
**the Counter** — Maya, in person, for the first time since the clinic. Lighter friction
beats for Sloane, Julian or a public contact follow, gated on whether a real delivered fact
gives them something to react to.

### The Counter (Maya) — full sub-scene

Per [MAYA_FRIENDSHIP_LANE.md](../MAYA_FRIENDSHIP_LANE.md). Arranging it comes first.

**Arranging — how Evelynn reaches Maya:**

- **counter-clean** · Arrange it on the personal number · *Private. Off the monitored line.* *(gated: `c5.maya-clean-line`)*
  > p: You use the number she saved and nothing else. A place, a time, no explanation. She names the counter — the late one near Compliance, where she and Adrian used to eat after audits.
  > Sets `c6.maya-exposed = false`.
- **counter-monitored** · Arrange it on the Axiom phone · *Possible — but Sloane can see you did.* *(gated: no clean line, or player chooses it anyway)*
  > p: You only have the monitored line to reach her on. You use it, knowing the arrangement itself becomes a thing Sloane's system can read: that you met Maya, off the books, by choice. You tell Maya the line is watched. She agrees anyway.
  > Sets `c6.maya-exposed = true`; add a Sloane-visible entry (you arranged an off-record meeting with Maya).
- **counter-skip** · Don't arrange it · *Leave it for now. A respected choice.*
  > p: You leave her number where it is. Not tonight. The lane pauses without a wound; she is not owed a meeting and you are not owed her forgiveness for the silence.
  > Sets `c6.maya = deferred`. → skip to the other-actor friction beats.

**Arrival — branches on `mayaKnowsAdaptation(s)`:**

- *(Maya knows — she got the clinic disclosure or the Chapter 3 identity disclosure):*
  > p: She is already at her usual seat when you come in. She looks for Adrian in your face and does not hide that she is looking.
  > q(Maya): Give me a second. I'm allowed a second.
- *(Maya does not know — a woman she's never met asked for her by name):*
  > p: She is at her seat, and she watches you cross to her the way a compliance investigator watches anyone she did not invite. Polite. Guarded. You know her order before she gives it, and you have to not know it out loud.

**The central choice.**

*If Maya does NOT know* — this is the first unmonitored chance to tell her (sets `c6.maya-knows`):

- **counter-tell** · Tell her, here, all of it · *The full truth, in your own words, no one listening.*
  > p: You tell her who you are. She asks one question only Adrian could answer — the name of the bar you both hated, the year of the audit that nearly broke you — and you answer it, and she stops asking.
  > q(Maya): Okay. Okay. I'm not going to cry in the noodle place. Give me the second again.
  > `c6.maya-knows = in-person`.
- **counter-partial** · Tell her only what protects her · *"I knew Adrian. Watch the 12:14 lookup." True, bounded.*
  > p: You give her the warning and not the person: that you knew Adrian, that he would want her careful about the lookup she was never meant to see. It is true, and it is a wall, and holding it costs you more than she will ever know.
  > `c6.maya-knows = partial`.
- **counter-none** · Stay a stranger with a warning · *Give her the caution; keep yourself out of it.*
  > p: You are a woman she has never met, with a warning she takes seriously and a self she does not get to see. She thanks the stranger. It is the loneliest thing you have done since the mirror.
  > `c6.maya-knows = none`.

*If Maya DOES know* — the hour is about what the player picks (at most two topics; each a short exchange):

- **counter-what-happened** · What happened to you · *The body, the voice, what the clinic did that you can say.*
- **counter-what-chose** · What you chose · *Something you wanted — a dress, a night, a person — as far as you like.*
  > q(Maya): Tell me one good thing. Not a thing that happened to you. A thing you wanted and went and got. I need to know there's been one.
- **counter-her-life** · Her review, and the lookup · *Ask, and actually listen.* → this is the topic that establishes her exposure.
  > q(Maya): Someone ran me at 12:14 and I wasn't supposed to know, and now there's a "routine review" with my name on it and no one will say by whom. I'm scared, Evelynn. I haven't said that to anyone. Don't make me regret saying it to you.
  > Reaching this topic sets `c6.maya-exposed = true` **as a protectable vulnerability** (distinct from the monitored-line exposure above; either can set the flag for `resolve-protect`).
- **counter-adrian-loved** · What Adrian felt · *Only if `bond = love`.*
  > q(Maya): I loved you too. Not like that. I needed you to be the one person who never wanted anything from me. Don't be the person who wanted something now.

**What Evelynn can ask of her** (Maya's Chapter 4 line holds — "My work files stay at work"):

- **counter-ask-bounded** · Ask for a public-file opinion only · *She'll give a bounded read, nothing restricted.* → she helps within scope; no loss.
- **counter-ask-restricted** · Push her for restricted material · *She refuses; pushing costs.*
  > q(Maya): No. That's the thing I don't do, and you knew that, and you asked anyway. *(she stands, pays for both bowls)* I'll see you, Evelynn.
  > Sets `c6.maya = strained`; overrides the ending below. The lane's one real loss, caused by using her.

**Endings** (if not strained):

- **counter-restored** · Agree how to reach each other, and what neither will ask · `c6.maya = restored`.
- **counter-careful** · She asks for distance until the review clears, for her own safety · `c6.maya = paused-by-maya` (framed as her good choice).

### Other-actor friction beats (brief; each gated on a delivered fact)

- **friction-sloane** *(gated: a `c5.message-sloane` or a Sloane-visible record exists):* Sloane references, precisely, only what reached her — the workspace message, the meeting arrangement, the photo capture if it happened. She is right about the risk and wrong to assume the motive; the player can correct the record or let it stand.
- **friction-julian** *(gated: Julian professional/personal state):* Julian reacts to an actual prior interaction — the kept window, the intimacy outcome, the refused/narrowed expectation — never to an assumed one. The player can hold the boundary, warm it, or cool it.
- **friction-public** *(gated: `c5.published`):* a public contact reacts to the released artifact within its exact scope; the player restricts, corrects, or uses it.

Each sets a small `c6.friction-*` record; none assigns a route. → `exit`.

## Movement 4 — `exit`: the cost becomes concrete

Now the arrangement's cost of leaving is made legible — *because* it was used again
(movement 1) and, where relevant, an expectation was accepted (movement 2). This is a
**preparatory** choice before the proof and the decisive move: the player sets their stance
toward the exit, which shapes movement 6.

### The cost, made real — by `c6.exit-arrangement`

- **julian-workroom:** the booked days and the open channel are worth real money and real access to replace; leaving means a self-paid week or the public desk, and Julian noticing.
- **public-artifact:** the audience is an asset that also watches; leaving the follow-on means the first piece keeps circulating on its exact terms and no more.
- **sloane-institutional:** the housing and legibility are not in your name; leaving the "cooperative" version means accepting exposure you currently don't carry.
- **self-funded:** there is nothing to leave. The scene names this honestly: your cost was paid up front, in money and effort and solitude, and there is no bill waiting. This profile's "cost of exit" is a **comparison**, not a trap.

### Player power (sets `c6.exit-prep`)

- **exit-price** · Build the off-ramp now · *Secure the independent alternative before you need it.* *(strengthened if `benefit-response = alternative-priced`)*
  > p: You quietly put the fallback in place — the paid week, the public desk, the number that isn't theirs. You do not leave yet. You make leaving a door instead of a leap, so that when the moment comes you are choosing, not trapped.
  > `exit-prep = off-ramp` (makes movement 6's `resolve-break` clean and low-cost).
- **exit-negotiate** · Renegotiate the term while you still hold the benefit · *Fix the wording from inside.*
  > p: You reopen the term while you are still useful to them and rewrite the part that could tighten. Better wording now is cheaper than an argument later.
  > `exit-prep = renegotiated`.
- **exit-expose** · Put the term on the record where others can see it · *Make the arrangement legible to more than you and them.* *(gated: a public or third-party channel exists — `c5.published`, a bounded Maya opinion, a records path)*
  > p: You make the shape of the arrangement visible to someone other than its two parties. A term nobody else can see is a term that can be quietly changed; a term on the record cannot.
  > `exit-prep = exposed-term`.
- **exit-deepen** · Take more of it, knowingly · *Accept a deeper reliance with your eyes open.*
  > p: You take more, not less — the longer booking, the bigger piece, the deeper cover — and you do it deliberately, because the benefit is worth it to you and you refuse to be ashamed of a choice you are making on purpose. It costs more to leave now. You have decided that is acceptable.
  > `exit-prep = deepened` (raises movement 6's break cost, and can strengthen `resolve-enforce`/knowing-deepen framing).
- **exit-hold** · Leave it unexamined tonight · *Not every night is a decision.*
  > p: You let it be, for now. The cost is real and you have looked at it and you choose not to move yet. That is also a choice, and an honest one.
  > `exit-prep = held`.

→ `proof` (movement 5).

---

## Flags this script sets

`c6.benefit-response`, `c6.expectation-response`, `c6.exit-prep`; the Counter's
`c6.maya-knows` (in-person|partial|none), `c6.maya` (restored|paused-by-maya|strained|deferred),
and `c6.maya-exposed` (bool — set by the monitored-line arrangement or by reaching Maya's
review topic); plus small `c6.friction-*` records. These feed movement 6: `c6.exit-prep`
shapes the break cost and enforce framing; `c6.maya-exposed` gates `resolve-protect`;
`c6.expectation-response = refused` colours the movement-6 demand (a provider who let a
refusal stand asks more gently).

## Notes for EVE Code

- Per-arrangement blocks: `self-funded` is deliberately the light path in movements 1, 2 and 4 (no provider, no debt, the "comparison not trap" profile). Do not invent a provider for it.
- The Counter is the large sub-scene; `counter-skip` bypasses it to the other-actor friction beats and sets `c6.maya = deferred` (so `resolve-protect` stays unavailable unless another exposed-person condition applies).
- `c6.maya-exposed` can be set by **either** the monitored-line arrangement **or** reaching `counter-her-life`; both make Maya a protectable vulnerability for `resolve-protect`.
- Movement 4's `exit-prep` is preparatory, not the exit itself; the decisive leave/pay/enforce is movement 6. Keep them distinct — movement 4 never resolves the arrangement.
- Gating: each friction beat and each gated player option appears only when its delivered-fact/state condition holds; a player with none simply moves on. No route is assigned in movements 1–4.

## Wording fill and build decisions (2026-09-23, after EVE Code's 1–4 conflict report)

### Place strings (movements 1–4 run on one day, "a week after"; proof onward the next night)
- benefit: `A WEEK LATER · 08:30`
- expectation: `MIDDAY · THE FIRST ASK`
- friction: `EVENING · PEOPLE WHO KNEW YOU` — when the Counter runs, use `22:00 · THE COUNTER NEAR COMPLIANCE`
- exit: `LATE · THE COST OF LEAVING`
- proof: `THE NEXT NIGHT · THE UNKNOWN SENDER`
- counterpower: `· WHAT YOU HOLD`
- resolve: `· THE DECISION`
- complete: `· WHERE IT TURNS`

### Labels
- self-funded expectation single option — **expect-selfnote** · "Note it and move on" · *No one is asking you for anything.*
- Counter "no ask" — **counter-ask-none** · "Ask her for nothing" · *Keep it to the two of you.*

### W1 — Counter prose

**counter-what-happened:**
> q(Maya): Can I ask what they actually did? You don't have to. I just keep imagining it, and I'd rather know than imagine.
> p: You tell her what is yours to give — the body that is yours now, the voice, the weeks of learning to stand — and not the clinical detail that is still Axiom's. She listens the way she used to read a case file, without flinching, and at the end she nods once, like something has finally been filed correctly.

**counter-what-chose** (add before Maya's existing line):
> p: You tell her about one thing you wanted and went and got — a dress, an evening, a person — because it was yours to choose. Her face does something complicated, and lands on relief.

**counter-her-life** (add after Maya's existing line):
> p: You do not fix it and you do not promise to. You let her be frightened out loud to the one person who will not repeat it. It is the most you have been a friend to anyone since the mirror.

**counter-adrian-loved** (add after Maya's existing line):
> p: It is not a rejection and does not feel like one. It feels like being handed back a true thing about yourself, undamaged.

**counter-ask-bounded:**
> q(You): There's a public filing I can't read cleanly. Not your work — the public part. Would you look?
> q(Maya): The public part, yes. Send it. And thank you for asking me the version I can say yes to.
> p: She gives you a bounded, careful read — exactly what a compliance investigator gives a friend and not a gram more. It helps, and it costs her nothing.

**counter-restored:**
> p: You settle it plainly: how you'll reach each other, what neither of you will ask the other to carry. Not the friendship you had — that one belonged to Adrian. A newer one, smaller and more careful and real, that belongs to whoever you are now.
> q(Maya): Same counter, then. When you can. I'll be the one pretending to read the menu.

**counter-careful:**
> q(Maya): Don't contact me until the review's done. Not because of you — because I can't afford one more thing on my file I'd have to explain. Give me that, and when it's over I'll find you.
> p: It is her choice, and a good one, and you honor it without making her manage your disappointment. You leave first, so she doesn't have to watch you go.

Evelynn's side on the topic beats is her narration line above plus Maya's line — build as-is;
no separate Evelynn dialogue needed.

### W3 — Movement 4 "cost, made real" as second-person prose
- **julian-workroom:** p: You add it up honestly. The room and the open channel are worth real money and real access to replace — a self-paid Harbour week, or the public desk and its queue, and Julian noticing the day you stop needing him. Leaving is not a cliff. It is a bill, and you can read the number.
- **public-artifact:** p: You add it up. The audience is an asset that also watches; the follow-on is an ask you can refuse. Leaving means the first piece keeps circulating on exactly the terms you set, and nothing more grows from it — a smaller footprint, wholly yours.
- **sloane-institutional:** p: You add it up, and the number is not money. The housing, the legibility, the cooperative version of events — none of it is in your name, and leaving the easy version means carrying an exposure you don't currently carry. It is the most expensive door in the building, and you are standing in front of it.
- **self-funded:** p: You add it up and there is nothing to add. You paid as you went — in money, in effort, in the quiet of doing it alone — and no bill is waiting. Your cost of leaving is only the leaving. It is the strangest luxury you own.

### Gate / flow decisions (EVE Code's proposals, confirmed)
- **F1 Counter flow:** approved as proposed (arrange → arrival → tell/partial/none OR 1–2 topics with an "enough" step → single ask stage {bounded, restricted, none} → restored/careful, unless restricted → strained). The "no ask" label is above.
- **F2 benefit-leverage gate:** approved — `c5.obligation-provider || c5.offer === 'accepted' || (c4 julian-kept && c3.helix-window === 'offered')`.
- **F3 self-funded options:** approved — movement 1: benefit-who + benefit-accept; movement 2: expect-selfnote; movement 4: exit-price + exit-hold only.
- **F4 exit-expose gate:** approved — `c5.published || counter-ask-bounded taken || c5.service === 'municipal'`.
- **F6 friction-julian gate:** use `julian5(s)`.
- **F7 details:** all confirmed as you listed.
- **Three small calls (A):** all approved — stage directions as their own paragraphs; the "Decide what to do with it" / "Choose one action. It sets your course." step label; the shared "Put the proof in play" trade label with the two split hints. The executive-lane closing is fixed in the counterpower script to be arrangement-agnostic (no "he").

### F5 — knock-on variants
Store the flags now (their only effect this pass is being recorded + feeding the route
weighting), and add variant lines in a follow-up. One set is ready now — the **gentler
movement-6 demand** when `c6.expectation-response === 'refused'` (a provider who let a
refusal stand asks more gently):
- julian: q(Julian): I mentioned it once. You said no. That's an answer, and I'm not going to make it expensive. The room's still yours.
- public: q(Aster editor): You passed. The door stays open; I won't push it. First piece holds on its terms.
- sloane: q(Sloane): As you like. I won't lean on it tonight. *(from her, either patience or a longer game — you cannot tell which, and that is the point.)*
The `exit-prep` variants (off-ramp/deepened changing `resolve-break`/`resolve-enforce`) come
in a later polish note; store `c6.exit-prep` now.

### W2 / friction beats (Sloane / Julian / public)
Build the Counter now; leave `friction-sloane`/`friction-julian`/`friction-public` as
marked placeholders. I'll script those three short beats in a follow-up. A player who skips
the Counter (`counter-skip`) goes straight to `exit`.

## Friction beats — full text (2026-09-23)

Replaces the three placeholders in movement 3. Flow: after the Counter resolves (or after
`counter-skip`), the `friction` phase offers whichever of these three beats is unlocked by a
delivered fact, each playable once and returning to the friction step, plus **friction-done**
· "Leave it there for tonight" · *Enough people for one night.* → `exit`. Each beat reacts
only to what actually reached the actor; none assigns a route. Each sets a small
`c6.friction-*` record.

### friction-sloane · What Sloane can see · *(gated: `c5.message-sloane` OR a Sloane-visible record on `npcs.sloane.known`)*

> q(Sloane): I have your note about the Harbour workroom, and a line saying you met Ms Reyes off-hours. *(if a phone capture exists:)* And a Meridian page flagged on your phone. I am not asking you to explain any of it. I am telling you I can see the parts you let me see, and I would like you to remember that before you decide I can see all of it.
>
> t: She is right about the risk and wrong about the reason, and she cannot tell the difference from where she sits. That gap is the only privacy you have.

- **friction-sloane-correct** · Bound each thing precisely · *Say exactly what each was — no more, no less.*
  > q(You): A workspace I pay for. A friend I've known ten years. A page a stranger sent me. Each is exactly what it is, and none of it is what you're worried it might be.
  > p: You put the true, narrow version on the record before she can build a wider one on top of it. It does not remove her concern. It removes her excuse for guessing.
  > Sets `c6.friction-sloane = corrected`.
- **friction-sloane-let** · Let her assumption sit · *Say nothing. Let her wonder what it means.*
  > p: You thank her for her concern and explain nothing. Let her hold a shape she can't fill in. A woman who thinks she might not see everything is more careful than one you've reassured.
  > Sets `c6.friction-sloane = unanswered`.

### friction-julian · The same door · *(gated: `julian5(s)`)*

> q(Julian): You've been a little further away since the audit. I'm not asking why — that's yours. I'd just like to know it's the same door: that if you want the room, or the conversation, it's there, and that I haven't misread where we stand.
>
> t: He is not pushing. He is checking. There is a difference, and the fact that he knows there's a difference is most of what you've ever liked about him.

- **friction-julian-hold** · Keep it exactly professional · *Clear, warm, no more than that.*
  > q(You): The same door. Professional, and real, and I mean both words. I'd tell you if that changed.
  > Sets `c6.friction-julian = professional`.
- **friction-julian-warm** · Let the personal stand · *Acknowledge there's more than work here.*
  > q(You): You haven't misread it. I've been further away because a lot has been further away. Not you.
  > Sets `c6.friction-julian = warmed`.
- **friction-julian-cool** · Step back deliberately · *Put more space in, on purpose.*
  > q(You): The professional door stays open. The rest — I need it quieter for a while. That's not about you either, but it's real.
  > Sets `c6.friction-julian = cooled`.

### friction-public · The attention answers back · *(gated: `c5.published`)*

> p: A message from someone who saw the Aster piece — a real offer, small and paid, your face in a bigger room. The image you released, doing what a released image does: finding you the next thing, whether or not you asked it to.
>
> t: This is the part they don't tell you about being seen. It doesn't stop when you're done being seen. It becomes a door other people feel entitled to open.

- **friction-public-restrict** · Hold it to what you released · *Decline the expansion; keep the first piece's exact scope.*
  > p: You decline, and you restate the scope you actually agreed to, so the first piece stays the first piece and grows nothing you didn't plant. The attention is a tool. You decline to be one.
  > Sets `c6.friction-public = restricted`.
- **friction-public-correct** · Fix what they got wrong · *A claim about you needs correcting.* *(alt if a misstatement exists)*
  > p: They have you slightly wrong — a title, an implication, a caption doing more than you licensed. You correct it, precisely, in writing, before the wrong version becomes the remembered one.
  > Sets `c6.friction-public = corrected`.
- **friction-public-use** · Aim it at something you want · *Turn the attention toward your own end.*
  > p: You say yes, on your terms, because a bigger room is a bigger room and you have things you would like heard in it. Visibility you steer is not the same as visibility that steers you.
  > Sets `c6.friction-public = used`.

### Note for EVE Code
- The `friction` phase is a small hub: Counter first (or skip), then the unlocked beats in any order, then `friction-done` → `exit`. Each beat is one-shot.
- `friction-sloane`'s capture clause fires only when `c6.photo-custody === 'phone'` would exist — but note the photo is captured in movement 5 (`proof`), *after* friction. So in the movement-3 timeline reference only the workspace message and the Maya meeting; drop the "Meridian page flagged" clause here (it can't have happened yet). Keep the two-option structure. *(Correction to the block above: the capture line is out of sequence — omit it in `friction`.)*
- These set `c6.friction-*` records for flavour and the route weighting's Sloane/executive/public reads; none forces a lane.
