# Chapter 8 (own-power) — "The Cost Bites" script

> **Deepened 2026-09-24 (heat-and-danger pass, Celebrity route).** Implemented wording lives in
> `src/content/chapter8.ts`. Everyone sees the apartment intrusion; an exposed player meets Sloane in person at
> her car. Each road over the wall is a scene with its own choice: the Harbour gala with Tobias Keel (dance or
> ask on the red carpet), the sender's debt paid by watching Sloane's office (report truthfully or lie), the
> reporter Clara Duvall (print or hold), Maya at the counter (send her away or keep her close), Julian's contracts
> room with security on the floor (photograph or only read), Sloane's car (ask why or watch her hands), and the
> night registry dig (find out who else is looking, or leave). The reveal adds that Helix is also a Meridian
> client. The sender now collects the debt (the review found it ran backwards).

Source of wording and flags for EVE Code. The second own-power development chapter, the
route's **temptation**. Design authority: [OWN_POWER_ROUTE.md](../routes/OWN_POWER_ROUTE.md)
§4, [CAMPAIGN_ROUTE_MAP.md](../CAMPAIGN_ROUTE_MAP.md) (crossover doctrine). Follows
[CHAPTER_7_OWN_POWER_SCRIPT.md](CHAPTER_7_OWN_POWER_SCRIPT.md).

Format as before. Reads `route.entry`, `c7.finding` (shape|lead|none), `own.exposed`,
`own.alliance.rook`, `own.cash`, `c5.published`, and the Julian/Sloane state. Phases:
`cost` → `leverage` (the crossover decision) → `advance` → `close`. New gated content
revision, continuous with Chapter 7.

The Chapter 8 turn (what she can learn here): **Meridian isn't Helix or Axiom.** It is a
private intelligence concern that contracts identities and operations to both — so Project
Eve is a *product*, and Sloane, even Axiom, are clients, not owners. And one name on
Meridian's board is someone Evelynn has already met. (Which name is held for the endgame.)

---

## Phase `cost` — the price comes due

### Entry frame — by `route.entry` + `own.cash`

- p: The thread from last week points somewhere you cannot follow on foot. The authorization sits above Sloane, at Meridian and whoever sits on its board — and Meridian is a closed shell with no public face and no door you can pay to open. *(low own.cash:)* You count your money again and it counts back shorter than it did. *(else:)* You have a little runway left, and a wall in front of it.
- t: This is the part they meant when they said independence was expensive. Not the money, or not only. It is that some rooms will not open for someone with no institution behind her, and you chose to be someone with no institution behind her.

### Sloane's notice — only if `own.exposed`

> p: The message is not from an account that deletes itself. It is from Sloane, on the record, unhurried.
>
> q(Sloane): You have been asking who authorized reusing her. I know, because you asked it where I could hear. I am not going to tell you to stop. I am going to tell you that you are about to walk into something with no cover, and that I could give you cover, and that you should think hard about why I would offer.
>
> t: Help, or a leash held out as help. From what you found last week, Sloane may be as much inside this as you are — which makes the offer either the truest thing anyone has said to you, or the most useful lie. You cannot yet tell. That is the trap of it.

*(if not own.exposed:)* p: No one has noticed you yet. That is its own kind of alone — no help offered, because no one knows to offer it. The wall is still there, and it is yours to get over quietly.

→ `leverage`.

## Phase `leverage` — how you get over the wall (the crossover decision)

The centre of the chapter. She needs inside Meridian's shape, and there are independent
roads (harder, keep the route hers) and crossover roads (easier, cost independence). Each
advances her, differently. This is a **single decision** — she picks one way over the wall —
not a hub.

### Independent roads

**leverage-audience** · Smoke them out in public · *Aim your visibility at a closed door. It opens a crack — and you are more seen than ever.* *(gated: `c5.published` / `own.audience`)*

> p: You make Meridian a question your readers start asking too — not an accusation, a curiosity, the kind that makes a quiet company's silence look like an answer. A closed shell hates being looked at. Someone connected to it moves, and the movement tells you something.
> Sets `own.crossover = none`; `own.exposed = true` (deeper); advances via audience.

**leverage-alliance** · Spend an ally · *Call in the help you've actually earned. It costs the ally something.*
> - if `own.alliance.rook = owed`: **leverage-rook** · Call the debt with Rook · q(Unknown sender): You owe me one and I collect in kind. Here: Meridian's registered board meets offshore, and I can put one document in your hands. Read it fast; I was never here. *(unreliable, but concrete.)*
> - else if a records-deep editor/journalist contact exists (from `c5.published` path): **leverage-editor** · Put a real reporter on the corporate veil · a contact with subpoena-grade patience peels the shell over days — slow, clean, sourced.
> - else **leverage-maya-bounded** · Ask Maya what she can say in public scope · she can only confirm the *category* — that a concern like Meridian would be a private contractor, not a government or corporate arm — narrowing it without breaching her line.
> Sets `own.crossover = none`; advances via the spent ally (marks it `spent`/`strained` as appropriate).

### Crossover roads (the temptation — refusable, costs independence)

**leverage-executive** · Take Julian's access, once · *He can get you into a Helix room where Meridian's shape is visible. It works. It also puts you back inside a door someone else holds.* *(gated: Julian professional state, `julian5`-style)*

> p: Julian does not ask why. He gets you an hour in a room you could never have entered alone, where the contracts on the wall name their counterparties, and one of them is Meridian. It works exactly the way access always works — easily, and on someone else's sufferance.
> Sets `own.crossover = executive`; advances; records that she re-entered a provider's door (reconvergence + the Chapter 7 confirm's lane weighting read this — access changed, biography not: she is remembered as own-power who took one executive door, at a cost to standing).

**leverage-institutional** · Accept Sloane's cover · *She'll show you who's above her. Believe her at your peril.* *(gated: `own.exposed` — Sloane offered)*

> p: You take the cover. Sloane is as good as her word and that is the frightening part: she shows you the board, or enough of it, and she does not flinch at what it means for her. Either she is genuinely as trapped as you, or she is walking you exactly where she wants you.
> Sets `own.crossover = institutional`; advances; records the dependency (reconvergence reads it; Sloane's motive stays unresolved).

**leverage-refuse-cross** · Refuse the shortcut; find the hard way · *No borrowed doors. It costs you more and it stays yours.* *(always available; routes to the best independent road she has, or a slow self-funded dig if she has none)*

> p: You do not take the easy door. You do it the long way — more money, more time, more risk of the wall simply winning — because the whole point of you, now, is that no one gets to hold the door you walk through. It is harder. It is also the only version of this you can live in.
> Sets `own.crossover = none`; advances via a slow self-funded dig (`own.cash` cost), reaching a thinner but wholly-owned version of the finding.

## Phase `advance` — what the wall was hiding

The finding scales with the road; every road reaches the core turn, at different resolution
and cost.

> p: However you got over it, the same shape is on the other side, and it is bigger than you feared and smaller than you hoped. Meridian Holdings is not Helix. It is not Axiom. It is a private concern that builds operations — identities, legends, whole manufactured people — and sells them to whoever can pay. Project Eve is a product. Axiom is a client. Sloane is a client's officer.
>
> t: You were never Axiom's asset, or Sloane's. You are Meridian's product, sold on. The person who authorized reusing her authorized it as a *vendor reusing stock*. That is the coldest thing you have learned yet, and you learned it yourself.
>
> *(crossover = executive/institutional:)* p: You know it because someone opened a door for you. You will not forget who, or that you needed them to. *(crossover = none:)* p: You know it because you would not let anyone open the door for you. It cost you, and no one can take it back or hold it over you.
>
> *(Rook debt spent / an ally strained:)* p: And it cost the ally, too — a marker called, a patience spent. Help is not free either; you only chose which kind of not-free.

Sets `c8.meridian = product` (the core turn learned), `own.crossover`, and updates the spent
ally records.

## Phase `close`

> p: You have the shape now: a private maker of people, a board above Sloane, one name on it you are almost sure you have met. What you do not have is the name, or the why, or a single institution you can trust to hold any of this but yourself.
>
> t: Standing alone got you here — to a truth an institution would have buried, held by no one but you. *(crossover != none:)* Except you did not stand entirely alone this time, and you know it. The next room is the one with the name in it, and you will decide then whose door you walk through to reach it. → Chapter 8 `complete`, into Chapter 9 ("Assembling the Case").

---

## Flags this chapter sets

`own.crossover` (none|executive|institutional), `c8.meridian` (product), updates to
`own.alliance.*` (spent/strained), further `own.cash`/`own.exposed`, and a `c8.entered`
resolution for Chapter 9. All sourced/re-derivable.

## Notes for EVE Code

- `leverage` is a single decision, not a hub: pick one road over the wall. `leverage-refuse-cross` is always available so the crossover is never forced; a player with no audience/ally still reaches the finding by the slow self-funded dig (autonomy guarantee, at a real `own.cash` cost).
- `own.crossover` is the key new carry: it does NOT switch `route.lane` (crossover changes access, not biography, per the route map) but the Chapter 7 confirm's `deriveRoute6` weighting and reconvergence both read it — an own-power player who took a crossover is remembered as own-power-who-borrowed-a-door, with the standing cost.
- Sloane's `leverage-institutional` is offered only when `own.exposed` (she made contact in `cost`). Julian's `leverage-executive` only on the Julian-available state.
- The specific board name is deliberately withheld here (endgame material); `c8.meridian = product` is the turn.
- No intimacy in this chapter.

## Phase 0 decisions and wording fill (2026-09-23, after EVE Code's report)

### 1. Meridian-may-be-unknown (the key catch — do NOT require records)
The `cost` frame branches on `own.piece.records`:
- **has Meridian** (`own.piece.records`): keep the existing frame ("at Meridian and whoever sits on its board… Meridian is a closed shell").
- **!own.piece.records** variant:
  > p: The thread from last week points up, past Sloane, to something you cannot name yet — a signature you never found, an authority above the woman you've been fearing. You know it is there. You do not know what it is called. That is the wall.
`advance` names Meridian for **everyone** (its text reveals "Meridian Holdings is not Helix…"), so a !records player first hears the name there — no autonomy break. `c7.finding` needs no mechanical branch; optionally one flavour line at `cost` (shape: "you have its edges"; lead/none: "you have less than you'd like"), but it's not required.

### 2. Transitions + titles (approved)
- Transition choices as you proposed: cost "Look for a way over the wall" · *Every way costs something.*; advance "Take stock of what you have" · *The shape, and what it cost.*; close "Carry it into the next room" · *Chapter 8 ends here.*
- Chapter eyebrow/wordmark: **"The Cost Bites"**.
- Scene titles · places:
  - cost: "The Cost Bites" · `DAYS LATER · ON YOUR OWN`
  - leverage: "Over the Wall" · `· THE CHOICE`
  - advance: "What It Was Hiding" · `· THE SHAPE`
  - close: "Whose Door" · `· THAT NIGHT`
  - complete: "The Next Room" · `· LATER`

### 3. leverage-alliance
(a) Prose:
- **leverage-editor:**
  > p: You put a real reporter on it — a contact with the patience for a corporate veil and the standing to file for what's sealed. It takes days you'd rather not spend, and comes back clean and sourced: the shell peeled one layer, a real counterparty underneath.
  > q(Editor): It's a strange little company you've found. It doesn't sell anything you can buy. Give me a week and I'll tell you who it sells to.
- **leverage-maya-bounded:**
  > q(Maya): I can't touch it, but I can tell you what it isn't. No public products, an offshore board — that's not a government arm and not a normal corporate subsidiary. It's a private contractor. Someone builds things and sells them quietly. That's as far as I go.
  > p: She's narrowed the category without breaching her line: private, contracted, deniable. Enough to know what you're looking at.
(b) Marks: `own.alliance.rook = spent`, `own.alliance.editor = spent`, **`own.alliance.maya = used`** (a public-scope category read is within her line, not a strain).
(c) Yes — the label names who pays: "Spend an ally · call the debt with the sender" / "· put a reporter on it" / "· ask Maya what she can say".

### 4. leverage-refuse-cross (the dig)
Always does the dig (approved). Cost **$120**, never blocked — clamp at 0, note unpaid (same rule as the Ch7 fee, autonomy guarantee). `c8.entered = 'dig'`; no extra prose (advance's shared text covers it).

### 5. own.crossover weight
Leave `deriveRoute6` unchanged for now; store `own.crossover` cleanly; add its weight with the reconvergence design. Approved.

### 6. Gates — all approved as proposed
`leverage-audience` = `c5.published` (set `own.exposed = 'yes-deep'`); `leverage-executive` = `julian5`; `leverage-institutional` = `own.exposed`; `leverage-refuse-cross` always; cost low-cash uses the $100 threshold; `c8.meridian = 'product'` on `advance`; `c8.entered ∈ {audience, rook, editor, maya, executive, institutional, dig}`.

### 7. Art — approved
Environment masters as you mapped: cost = day apartment; leverage = phone (Sloane message / rook call) or day apartment; advance/close/complete = night apartment. The executive road's Helix room is on EVE Art's gap list; advance keeps the apartment until that master is bound.

## Set pieces (2026-09-24)

The wording lives in `src/content/chapter8.ts`. Played as scenes:

- **The break-in**, walked room by room (every dress facing the same way; she sits on the bed in
  her coat). Each answer plays through: the locksmith ("Keys are for people who ask first."), the
  trap and the sounds of the building, the concierge's green ledger.
- **The money**: the bank-machine queue with her face on page nine; the gown on a faceless
  mannequin; the phone company's two letters.
- **Every road's choice** carries on past its decision: Keel kissing her hand and the town's name
  repeated so it cannot fall out; the red circle round her face at 2 a.m.; what the sender's
  honest or false report cost her; the editor's first copy off the press, or Clara's "until I
  can't"; Maya kept close or sent away; Julian in the lift ("Next time, tell me first.") or the
  breath in the empty room; Sloane's long way home, or her thumb on the tablet; the man at the
  registry lifting a hand goodnight.
- **The list** arrives as a single page; read, it also holds RETIRED three times and one CLOSED.
- **The night after** (`c8.night`, a moment before `close-end`): **night-watch** (the car, the
  dog walker) · **night-walk** (Meridian's brass plate, and the camera that turns to her) ·
  **night-sleep** (the dress hung the wrong way, on purpose). Neutral pick for the goldens:
  night-sleep.

## New scenes: the work and the bank (2026-09-24)

In `cost`, after the money and before `cost-continue`:

- **The work** (`c8.work = give | hold`, `c8.work-kind`). With the campaign (`own.campaign = taken
  | terms`): Odile's shoot in the tram sheds; Lior the photographer; a tall woman in a camel coat
  with cropped hair at the back, "Madame Laurent's office. The money likes to see what it's
  buying." The ask: one frame of the face (terms), the famous back (the provocative portrait), or
  without the jacket. **work-give** (her light, her stop) / **work-hold** (Odile backs her; "It
  makes them curious", which sets up Laurent's call in Chapter 10). Without it: a due-diligence
  reading at Pell & Rourke; she finds the resigned director's signature in eight minutes; "Our
  biggest client is a fund on the river." **work-give** (the passport's Singapore history) /
  **work-hold** ("Does it matter?").
- **The bank** (`c8.bank`): the card declined in the café queue; the manager in the cardigan; her
  account is a sub-account under a corporate relationship she never opened (Meridian's agent, if
  she found the records). **bank-cash** (one envelope, split three ways at home) · **bank-new** (a
  building society across the river: the first thing she signed for herself) · **bank-leave**
  (a tripwire). Money is unchanged.

Neutral picks: work-hold, bank-leave.

## New scenes, round 2 (2026-09-24)

- **The neighbour** (`cost`, after the break-in, before the week): Mrs Kowalczyk, eighty-one, and
  Bishop the cat: "Your friend came… she had a key." `c8.neighbour`: **neighbour-ask** (tall, hair
  cropped like a boy's, asked after the cat by name; a fact: Celeste's shape before her name) ·
  **neighbour-warn** · **neighbour-thank** (neutral).
- **The Sunday reporter** (`close`, before the night, only if Chapter 5 published): Rafe Collis of
  the Sunday Courier, "women who appear from nowhere". `c8.hack`: **hack-line** ("I just didn't bring
  it with me") · **hack-meridian** (point him at Meridian) · **hack-door** (neutral).

## New scenes, round 3 (2026-09-24)

- **Bishop on the fire escape** (`cost`, after the bank): the neighbour's cat; from the iron landing,
  binoculars on a folded newspaper in the flat opposite, pointed at her window. `c8.bishop`:
  **bishop-stare** · **bishop-photo** (a face and a street number; a fact) · **bishop-cat** (neutral).
- **The landline at 3 a.m.** (`close`, after the night choice; the reporter now knocks "late as it
  is"): Mrs Tan from Emerald Hill, who kept Evie's orchids; the flat emptied by men in white gloves.
  `c8.call`: **call-evie** ("They flower every spring. I tell them you're coming.") · **call-ask** (a
  tall, elegant lady sat alone in the flat all afternoon, then directed the men, and kept the white
  orchid; a fact) · **call-down** (neutral; in the morning, no dial tone).
