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
