# Chapter 6 — movement 6 script: counterpower and the route branch

Source of wording and flags for EVE Code's `counterpower → resolve → complete` phases.
Design authority: [CHAPTER_6_PROOF_AND_COUNTERPOWER.md](../CHAPTER_6_PROOF_AND_COUNTERPOWER.md)
§6–7 and [CAMPAIGN_ROUTE_MAP.md](../CAMPAIGN_ROUTE_MAP.md). Follows the
[proof script](CHAPTER_6_PROOF_SCRIPT.md).

Format as before. This movement reads: `c6.rook-proof`, `c6.oracle-seen`,
`c6.exit-arrangement`, `ownHandLeverage6()`, and derives `c6.end-position`,
`c6.exit-action`, and the **route signal** `route.lane` (+ any `route.overlay`) that
Chapter 7 confirms. Nothing here is a terminal ending — it is the branch into the campaign
diamond.

---

## Phase `counterpower` — the position

The provider/institution behind the selected `c6.exit-arrangement` makes its decisive move
(the expectation from movement 2 becomes a demand), and Evelynn meets it with whatever she
now holds.

### Entry frame (shared)

> p: It comes to a point the way these things do — not a threat, a request, made by someone who assumes the answer is yes because it has always been yes. What is different tonight is you. You are not the same person who accepted the first favour.

### The demand — by `c6.exit-arrangement` (one block)

- **julian-workroom:**
  > p: The workroom is booked through the month, the calls are on the calendar, and Julian's message is warm and reasonable: a name he'd like you to meet, an evening that would help you both. Nothing is stated as a price. It does not have to be. The room is only free until you say no to something.
- **public-artifact:**
  > p: The issue is out, and it worked. Now the request: an appearance, a second piece, your face somewhere larger, on terms drafted to sound like an opportunity. The image you released is doing what images do — becoming a reason for the next ask.
- **sloane-institutional:**
  > q(Sloane): I have kept a great deal off your record, Evelynn. The apartment, the monitoring, the version of events that has you cooperative. I am asking for very little in return. I would like you to keep being easy to protect.
- **self-funded:**
  > p: No one is waiting on your answer, because you never let anyone hold the other end. There is no room to lose, no issue to withhold, no favour to call in. The cost of walking away is only the walking. That is what you bought when you paid your own way.

### Your hand — by `c6.end-position` (one block)

- **oracle-truth:**
  > t: You know something now that changes the arithmetic. Their own system said you would take the identity willingly and that Sloane would not be able to hold you. She read that and proceeded. Whatever this is, it was never about keeping you. That is a crack, and you are standing in it.
- **own-hand:**
  > t: You did not need the sender in the end. You have your own: a thing you kept, a statement you can correct, an audience you can aim, a term written down in your favour. It is not a revelation. It is better — it is yours, and no one can un-give it to you.
- **both:**
  > t: You have the truth the sender sold you and the leverage you built yourself. One tells you what they wanted; the other lets you act on it. You are, for the first time since the file appeared under your name, not the one being moved.
- **none:**
  > t: You have no proof and no held card — you spent nothing, trusted no one, kept clean. It leaves you lighter than you expected. You cannot force the outcome. You can still choose your own part in it, and refuse to pretend the choice was made for you.

> p: You know what you have. Now you decide what to do with it. → `resolve`.

## Phase `resolve` — the six actions

Each sets `c6.exit-action`, writes one sourced consequence record (`c6.cons.*`), and
contributes the primary signal to `route.lane`. **One action per playthrough.** Gates in
italics; when a gate fails, the action is not offered.

**resolve-enforce** · Hold them to the exact words · *Make the arrangement obey its own terms, no more.* *(available when an enforceable term exists: `c5.terms ∈ {accept,narrow,backup}` with `obligation-provider`, or the arrangement is julian-workroom/public-artifact)*

> p: You do not refuse and you do not comply. You quote the agreement back at them — the scope you actually accepted, the line they wrote themselves — and you hold it there. The favour stays a favour. The ask has to become a real, named offer or disappear.
>
> *(with oracle-truth/own-hand, add:)* p: They can hear that you would spend what you know if they pushed. They do not push.

`c6.exit-action = negotiated`. Lane signal: **executive** (julian/public) or **institutional** (sloane). Consequence: benefit retained, term enforced, no new obligation.

**resolve-challenge** · Turn it back on Sloane · *Use what you know to change the terms from strength.* *(available when `c6.oracle-seen` or a real Sloane leverage record exists)*

> q(You): You keep saying protect. Your own assessment said you couldn't hold me and you went ahead. So this was never protection. Tell me what it was, or stop pretending you're doing me a kindness.
>
> q(Sloane): *(a pause that is itself an answer)* You have been busy. All right. Not tonight, and not as a favour. We will talk as two people who know the same thing. That is more than you had this morning.
>
> p: You did not win. You moved the table. That is the whole of it, and it is a great deal.

`c6.exit-action = exposed` (challenge variant). Lane signal: **institutional**. Consequence: Sloane's demand withdrawn/renegotiated; her motive still unresolved (Chapter 7).

**resolve-break** · Walk, and pay the cost · *Leave the arrangement; take the recovery route.* *(always available)*

> p: You leave it. *(julian-workroom:)* You give back the booked days and take a Harbour week you pay for yourself, or the public desk; the room is gone and the work still gets done. *(public-artifact:)* You decline the second piece and hold the first to its exact released scope. *(sloane-institutional:)* You stop relying on the version that keeps you easy to protect, and you accept the exposure that comes with that. *(self-funded:)* There is nothing to break; you simply keep walking.
>
> p: It costs what it costs — money, a little slower, a little more alone. None of it costs you yourself.

`c6.exit-action = paid` (or `declined` for self-funded). Lane signal: **own-power**. Consequence: benefit released, recovery route taken, independence intact.

**resolve-protect** · Spend it on someone else · *Use your leverage to shield a person, not your position.* *(available when an exposed person exists — e.g. `c5.maya-clean-line`, or a Maya monitored-line exposure, or another at-risk contact)*

> p: You have one move and you do not spend it on yourself. Maya is under a review she did not earn, frightened of a lookup she was never supposed to see. Whatever you hold — the page, the file, the term, the audience — you point it at that, and you make her problem cost someone more than it costs her.
>
> q(Maya): *(on the clean line, if it exists)* You didn't have to do that. I know what it probably cost you. Don't make a habit of it. And — thank you.

`c6.exit-action = protected`. Lane signal: contributes to whichever lane the rest of the state favours; adds no route by itself. Consequence: the person shielded; Evelynn's own position spent, by choice.

**resolve-trade** · Put the proof in play · *Give the sender's proof to an actor, or expose the ORACLE fact.* *(available when `c6.rook-proof === 'supported'`)*

> p: Proof is only power while you hold it; you decide to spend it. *(expose:)* You put the ORACLE fact where it will be read — that they predicted they could not keep you and did it anyway — and you let it do its work in rooms you are not in. *(trade:)* You hand the sender's proof to someone who wants it more than you do, for something you want more than the proof. Either way, it is out of your hands now, and moving.
>
> t: You still do not know who the sender is, or what they wanted you to do with this. You did it anyway, with your eyes open. That is not the same as being used.

`c6.exit-action = exposed` (trade variant). Lane signal: **outside-intel**. Consequence: the proof released/traded; a new actor now holds it; provenance and the sender's aim still open.

**resolve-hold** · Keep it, unspent · *Take the knowing position; use nothing tonight.* *(always available)*

> p: You do nothing with it, and that is the point. You let them believe the answer is still yes, and you keep the truth folded up where only you can feel its weight. Not fear — patience. A card unplayed is still a card, and now you are the only one at the table who knows it is in your hand.

`c6.exit-action = declined`. Lane signal: **own-power** (independent). Consequence: nothing spent, everything retained, a knowing reserve carried into Chapter 7.

## Phase `complete` — the branch

Derive `route.lane` from `c6.exit-action` as the primary signal, weighted by the
accumulated Chapter 3–5 seeds (per the route map's "no single switch" rule; EVE Code owns
the exact weighting, design owns the signals). Set `route.overlay[]` only where a
cause-driven overlay condition is already met in state. Then a per-lane closing beat and
the Chapter 7 tease.

Closing beat — by derived `route.lane`:

- **institutional:**
  > p: You go home on the monitored phone, the way you always have, except that the line runs both ways now. Sloane knows you know. Whatever comes next, you are inside it as a person with a position, not a package with a location.
- **outside-intel:**
  > p: The proof is loose in the world and the sender is still a voice without a face. You have chosen to act on a truth you cannot fully source. It is a risk. It is also the first move you made that no institution authored.
- **executive:**
  > p: The arrangement holds, on your terms, in writing. You have decided access is worth keeping when you are the one holding the wording. It is still there in the morning — the room, the page, the door that opens — and whoever offered it now knows exactly where your line is. *(arrangement-agnostic: works for julian-workroom and public-artifact.)*
- **own-power:**
  > p: Nothing is holding the other end of you. No room, no issue, no favour, no file you had to borrow. It is quieter than the other lives on offer, and slower, and entirely yours. You will find out what that is worth.

Shared close:

> p: The file appeared under your name and made you its subject. Tonight, for the first time, you moved. What that becomes — who you take with you, who you refuse, what it costs to keep going — is not written yet. But it is yours to write now, and they know it.
>
> t: Sloane wanted the adoption, and got it, and lost the leash exactly as her own system said she would. Why is the only thing left she is still holding. You intend to take that too.

→ Chapter 6 `complete`. Carry forward for Chapter 7: `c6.exit-action`, `c6.end-position`,
`c6.rook-proof`, `c6.oracle-seen`, `c6.exit-arrangement`, `route.lane`, `route.overlay[]`,
and the full `c6.cons.*` record. Chapter 7 opens on the **confirm-or-redirect divergence
beat**, where the derived lane is offered to the player in play rather than assigned
silently.

---

## Notes for EVE Code

- `resolve` offers only the actions whose gates pass; `resolve-break` and `resolve-hold` are always available so no state is a dead end. `none` end-position still has both of those plus `resolve-protect` where an exposed person exists.
- `route.lane` is **derived, re-derivable and sourced** — never a hidden score. It reads `c6.exit-action` first, then the seeds (Julian reliance, `c5.published`, Sloane ties, `rook-proof`, self-funding, leverage records). Two players with the same action but different seeds can land in different lanes; that is intended. Design will supply the exact seed list and tie-breaks for the Chapter 7 beat as a separate note.
- Overlays: set `kept` only on a sequence of consolidating-provider terms already in state; `exploitation` only on a recorded threat/harm cause; `adult-work` only on an accepted adult-work term. Never from this movement's choices alone.
- No intimacy in this movement. Any optional Julian/Sebastian beat is gated separately (a `*_READY` constant) and is not part of the branch.

## Build resolutions (2026-09-23, after EVE Code's conflict report)

- **C1 (lane id):** the lane id is **`outside`** (display name "outside intelligence"). Enum: `institutional | outside | executive | own-power`. The route map's "outside-intel" is the same lane.
- **C2 (challenge gate):** gate `resolve-challenge` strictly on `c6.oracle-seen`. No non-ORACLE variant.
- **C3 (protect):** gate `resolve-protect` on `c6.maya-exposed` (set in movement 3); keep it unavailable until movement 3 is wired. Maya's reply uses the clean line when `c5.maya-clean-line` is set; otherwise the **monitored-line variant**: `q(Maya): "(guarded, on the Axiom line) Whatever you did, it landed. I won't ask on this line. Thank you."`
- **C4 (trade split):** split `resolve-trade` into **trade-expose** (gate `c6.oracle-seen`) and **trade-give** (gate `c6.rook-proof === 'supported'`). trade-give's recipient stays deliberately **unnamed** this pass — consequence "an unnamed actor now holds it"; the outside route development names them later.
- **C5 (action collision):** store `c6.resolve-action` = the chosen action id (+ trade sub-choice) so the self-funded `break` and `hold` stay distinguishable though both set `exit-action = declined`. Approved.
- **C6 (enforce on self-funded):** lane **own-power** (the enforced term is her own paid arrangement). Approved.
- **C7 (protect lane, interim):** until the seed weighting arrives, take the lane from the arrangement — julian/public → executive, sloane → institutional, self-funded → own-power. Approved as interim.
- **C8 (route storage):** store `c6.route-lane` and `c6.route-overlay` (comma-separated) via a pure `deriveRoute6(state)`; overlays empty this pass; no schema change. Approved — no top-level `route` field.
- **C9 (consequence fields):** fill from state where supported (provider, term, request, response, recovery, benefit, actor-knowledge); the rest `"n/a"`. Approved; no per-action table needed now.
- **C10 (break cost):** narrative-only this pass, no `money5` change. A real cash deduction (e.g. the Harbour self-pay price for breaking `julian-workroom`) is a later polish enhancement — design wants the cost real eventually, but not blocking this checkpoint.
- **C11:** approved as described.
