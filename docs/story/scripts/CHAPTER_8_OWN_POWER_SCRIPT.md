# Chapter 8 (own-power) — "The Cost Bites" script

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
