# Chapter 6 — movement 5 script: proof, not confession

Source of wording and flags for EVE Code's `proof` phase. Design authority:
[CHAPTER_6_PROOF_AND_COUNTERPOWER.md](../CHAPTER_6_PROOF_AND_COUNTERPOWER.md) §2–5. Build
plan: [handoffs/2026-09-23-code-chapter6-build-plan.md](../../handoffs/2026-09-23-code-chapter6-build-plan.md).

Format: **id** · label · *hint* · then blocks. `p:` paragraph, `q(Name):` speech, `t:`
thought. Second person, present tense, curly quotes. Route-agnostic: this plays the same
on every route. Wording final unless marked *(alt)*.

The concrete details this script fixes (design's job, per the plan):
- **The leaf:** a single courier-log page from Operation Meridian, dated the night of **14 March**, recording a handoff logged at **02:40** to a courier by the initial **"R."**, with a margin note in the prior Evelyn's own hand: *"missed the Marikina breakfast for this. C. will sulk."*
- **Celeste's one confirmable fact:** that the prior Evelyn **vanished the whole of that night and never came to a breakfast Celeste had planned** — "You disappeared before breakfast" is the same memory, now dated.
- **The authentication:** the leaf's 02:40 handoff explains the disappearance; Celeste confirms the disappearance without knowing the leaf exists; Rook, to pass, must name the breakfast before Evelynn reveals it.

---

## Phase entry — `proof`

Reachable once the sender trail exists (`npcs.rook` backfilled at `chapter6.begin`). If
the player never engaged the sender, `proof` still opens but resolves quickly to *untested*.

> p: The message comes on the untraceable channel, the way they all have. No name, no header, only a line and an attachment held back behind it.
>
> q(Unknown sender): You keep asking who I am. I will do better than answer. I will show you where you come from. One page. You decide what it is worth.
>
> p: The attachment waits. You have learned what a claim is worth, and what a photograph is worth, and what "trust me" is worth. This is none of those yet.

Choices:

- **proof-open** · Open the page · *Look at what the sender actually has.* → the leaf (below).
- **proof-decline** · Refuse the contact tonight · *You do not have to look. Nothing is lost by waiting.*
  > p: You leave it unopened. Whatever it is, it will still be a claim in the morning, and you will still be the one deciding.
  > Flags: `c6.rook-proof = untested`, `c6.verify-method = refused`. → `counterpower` (the "your own hand" position; the sender stays a stranger).

## The leaf

> p: It is a single page, scanned clean: a courier log, ruled by hand, one night's entries in a column. Operation names you do not know. A date — 14 March, a year before your assignment. One line is circled: a handoff logged at 02:40, received by a courier entered only as "R."
>
> p: And in the margin, in a small, fast hand, a note that was never meant to be evidence: *"missed the Marikina breakfast for this. C. will sulk."*
>
> t: You have seen the Blackglass package. Age 31, Singapore location history, ninety-nine point nine seven percent compatibility. A specification. A thing they built and handed to you.
>
> t: This is a person's handwriting. Someone stayed up until two in the morning, and was annoyed about a breakfast, and wrote it down. Evelyn Vale was not a file. She was somebody, and somebody is still holding the paper.

Choices for handling (sets custody):

- **proof-view** · Read it where it sits, take nothing · *Compare it without custody. No copy on your phone.*
  > p: You read it twice and give it back to the screen. No copy reaches your phone; nothing of this is anywhere Sloane can pull it.
  > Flags: `c6.photo-custody = none`.
- **proof-photo** · Photograph the page on the Axiom phone · *A copy you keep — on the monitored device. Sloane's system can see what you capture.*
  > p: You photograph it before the sender can withdraw it. The image is yours now. It is also on the phone Axiom monitors; somewhere in Sloane's system, a record exists that you captured a Meridian page. You decided the copy was worth the trace.
  > Flags: `c6.photo-custody = phone`. Side effect: add a Sloane-visible entry to `npcs.sloane.known` — source "Axiom-monitored phone capture, Meridian courier page", with `mission.capture`-style limits wording (it shows you held the page, not what it proves).

Both continue to verification.

## Verification

The engine offers **comparison** only if the player holds a Glass House item
(`mission.capture.owner === 'Evelyn' || mission.token === 'evelyn'`) or `c3.verified-date`.
**Prediction** is always offered. **Refuse** is always offered.

**verify-compare** · Set the leaf against what you already kept · *Available because you kept your own dated evidence.*

> p: You put the leaf beside your own trail — the dated record you carried out yourself, the one thing in all of this you authenticated rather than were handed.
>
> *(consistent, the default):* p: The night lines up. 14 March, the small hours, a handoff that no summary in the Blackglass package spells out but that the location history cannot contradict. Two records, captured by two people who never met, agreeing on a night. That is not nothing. That is the first thing in this whole affair that holds.
>
> Flags: `c6.rook-proof = supported`, `c6.verify-method = comparison`. → Celeste (below), then ORACLE.
>
> *(contradiction branch — only if the player's retained record actually conflicts, e.g. a rejected/false verified-date):* p: The dates fight each other. Something here is wrong — the leaf, or your own record, or the sender. You cannot tell which, and that is the point: you will not take it on faith.
>
> Flags: `c6.rook-proof = broken`, `c6.verify-method = comparison`. → `counterpower` (own-hand; sender discredited on this).

**verify-predict** · Make the sender tell you something first · *Withhold what you know. If they can predict it, they were there.*

> p: You do not have a clean record of your own to lay against it. So you do the other thing. You know one fact the page implies and the sender does not know you know it — because it did not come from the sender. It came from a woman who touched your arm at the Glass House and said you disappeared before breakfast.
>
> q(You): The page says she missed a breakfast. Whose. Tell me the name before I tell you, or the page is paper.
>
> *(pass):* q(Unknown sender): The Marikina breakfast. Celeste Laurent's table. Evelyn was expected and did not come; she was making the 02:40 handoff instead, and she never explained it. Ask your friend. She has been sulking about it for a year.
>
> p: You did not give the sender Celeste's name, or the breakfast, or the sulk. The sender gave them to you. Whoever is holding that page was in Singapore that night, inside the identity you are wearing now.
>
> Flags: `c6.rook-proof = supported`, `c6.verify-method = prediction`. → Celeste (confirmation), then ORACLE.
>
> *(fail — the sender guesses wrong or hedges):* q(Unknown sender): A breakfast. A colleague. I do not have every name a year on.
>
> p: A person who lived that night would have the name. The sender does not. Either they were never there, or they will not spend the truth to earn your trust. Either way, the page stays a claim.
>
> Flags: `c6.rook-proof = broken`, `c6.verify-method = prediction`. → `counterpower` (own-hand).

**verify-refuse** · Decline to test it at all · *Let it stay a claim. You owe the sender nothing.*

> p: You close the channel. Maybe the page is real; maybe it is the best forgery you have seen. You decline to spend your own knowledge finding out. The sender stays exactly what it has always been: a voice with an agenda you cannot see.
>
> Flags: `c6.rook-proof = untested`, `c6.verify-method = refused`. → `counterpower` (own-hand).

## Celeste corroboration (only after a `supported` verification)

Celeste is reached through her existing contact; she confirms **one** thing within her
firsthand social scope and no more.

> p: You reach Celeste on the fund's line. You do not mention a courier log, or Axiom, or a sender. You ask her, lightly, about Singapore — about a breakfast.
>
> q(Celeste): The Marikina one. God, yes. I planned it for a week and she simply wasn't there. No message, no apology, and then she breezed back two days later as if I'd imagined the whole thing. I adored her and I could have killed her.
>
> p: She is talking about a woman she knew. Warmly. To your face. She has no idea she is describing you, or the person who came before you, or that a page exists with that exact morning written in its margin.
>
> t: She cannot tell you the courier's name, or what was in the handoff, or anything Axiom decided. She was never inside it. She only knew Evelyn — the real one — well enough to be hurt when she vanished. That is all she has, and it is enough.

- **celeste-let-be** · Thank her and change the subject · *Take the confirmation; leave her the version she loves.*
  > p: You let her keep the friend she remembers. You have what you needed, and she keeps what she has.
- **celeste-press** · Push her for more · *She does not have more, and pushing costs.*
  > q(Celeste): More? Darling, it was a breakfast. Why are you — is something wrong? You sound like a lawyer.
  > p: She does not have more; she only had the one true thing, and pressing her for a dossier she never held makes her wary of you instead. You get a guarded silence, flagged in your own notes as her limit, not a fact.
  > Flags: record a "pushed past scope → refusal" entry on `npcs.celeste`; no new fact.

Both → ORACLE.

## ORACLE escalation (only if `c6.rook-proof === 'supported'`)

> q(Unknown sender): Now you know the page is real, here is what it is a page of. Pull the ORACLE assessment for Project Eve. You were denied it. I was not.
>
> p: The attachment opens on a prediction, dated before your assignment. ORACLE ran the identity transfer and returned two numbers. High probability of voluntary adoption — that the candidate would come to live as Evelyn willingly, and call it a choice. Low probability of durable long-term control by the sponsoring directorate.
>
> t: They predicted you would choose it. They also predicted that once you had, Sloane would not be able to hold the leash for long. And Sloane read that, and signed, and proceeded anyway.
>
> q(Unknown sender): Sit with the second number. She was told she could not keep you. She did it regardless. Ask yourself what she wanted, if it was never control.

- **oracle-take** · Take the assessment · *Keep it. It changes what you can say to Sloane.* → `c6.oracle-seen = true`.
- **oracle-leave** · Refuse to carry it · *You believe the page; you do not need the sender's file to act.*
  > p: You do not take the file. The leaf was enough; the rest is the sender's to spend, not yours to hold. → `c6.oracle-seen = false` (still `rook-proof = supported`; own-hand and ORACLE-truth positions both remain open per the counterpower rules).

> t: The sender has not told you who they are. You have proof they were there, and no proof of what they want. That distance is the only thing you are sure of. → `counterpower`.

---

## Flags this script sets

`c6.rook-proof` (untested|broken|supported), `c6.verify-method` (comparison|prediction|refused),
`c6.photo-custody` (none|phone), `c6.oracle-seen` (bool), plus the Sloane-visible capture
entry on `proof-photo` and the Celeste scope-limit record on `celeste-press`. No route is
assigned here — that happens in movement 6 (the route branch), which reads these.

## Note for EVE Code

`verify-compare` is offered only when the retained-evidence guard is true; otherwise the
player sees `verify-predict` and `verify-refuse` only. The contradiction branch of
`verify-compare` fires only on a genuinely conflicting retained record (e.g. a rejected
`verified-date`); a clean record takes the consistent branch. Celeste corroboration runs
only after a `supported` result — a `broken`/`untested` player skips it and goes straight
to `counterpower`.

## Build resolutions (2026-09-23, after EVE Code's conflict report)

- **P1 (compare contradiction unreachable):** build `verify-compare` as always-consistent → `supported`. No current state produces a false/rejected `verified-date`, so keep the contradiction branch documented-dead until such a state exists. Approved.
- **P2a (predict pass/fail):** passes by default; **fails only if Evelynn earlier misled the sender** (`c3 misdirect-rook` or the equivalent record) — the sender won't spend the truth on someone who lied to it. Thematically right. Approved.
- **P2b (never heard Celeste):** gate `verify-predict` on the `mission.celeste-greeting` record (she must have heard the breakfast line to withhold it). If she has **no** Glass House item, **no** `c3.verified-date`, and **no** `celeste-greeting`, only `verify-refuse` is offered → `untested` → own-hand. Approved (the skeptic/own-hand ending is a valid strong outcome).
- **P3 (celeste-press data model):** `celeste-press` adds a `npcs.celeste` **belief** ("Evelynn pressed about the Singapore breakfast like a lawyer") plus a `note6` marking it as Celeste's limit, not a fact; `celeste-let-be` records the one confirmed fact as a `note6` fact. Approved.
- **P4 (Rook's demonstrated knowledge):** on a prediction pass, append to `npcs.rook.known`: "the Marikina breakfast, Celeste Laurent's table, the 02:40 handoff"; Evelynn's question is sent with send-style sourcing. Approved.
- **P5 (one flow):** every route has sender contact from Chapter 3, so use one flow for all; no empty-Rook branch. Approved.
- **P6 (structure):** the whole proof runs inside the `proof` phase, step-unlocked like the salon; `decline`/`broken`/`untested` go straight to `counterpower`; the photograph adds the Sloane-visible entry. Approved.
