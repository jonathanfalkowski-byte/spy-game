# Chapter 7 opening — route seed-weighting and the confirm-or-redirect beat

**Design draft for owner review.** Two things: (1) the **seed-weighting** that turns
accumulated state into a *suggested* route lane, and (2) the **Chapter 7 confirm beat**, the
in-play scene where the player confirms or redirects that lane. Together they satisfy the
autonomy law: no state silently selects a route — the derivation only proposes, the player
decides in play. Authorities: [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md),
[CHAPTER_6_COUNTERPOWER_SCRIPT.md](scripts/CHAPTER_6_COUNTERPOWER_SCRIPT.md),
[FUTURE_TRAJECTORIES.md](../design/FUTURE_TRAJECTORIES.md) (design law).

Lanes (enum): `institutional | outside | executive | own-power`. This is **not** a hidden
meter. It is a **pure, re-derivable function of sourced state** (`deriveRoute6(state)`),
and its output is a *default* the Chapter 7 beat can override. Nothing here persists a
score.

---

## 1. Seed-weighting — `deriveRoute6(state)` → suggested lane

A transparent tally over sourced records. Each contribution names its source; the function
is re-runnable at any time and never stored as a number. The lane with the highest total is
the **suggested** lane; the Chapter 7 beat is where it becomes real.

### 1a. Primary signal — the Chapter 6 end action (weight 3)

From `c6.exit-action` / `c6.resolve-action` (per the counterpower script):

| Resolve action | Adds +3 to |
|---|---|
| `resolve-challenge` | institutional |
| `resolve-trade` (expose or give) | outside |
| `resolve-break` / `resolve-hold` | own-power |
| `resolve-enforce` | executive if arrangement ∈ {julian-workroom, public-artifact}; institutional if sloane-institutional; own-power if self-funded |
| `resolve-protect` | **nothing** — lane-neutral by design; the seeds decide (per movement-6 C7 interim + this table) |

### 1b. Seeds — accumulated Chapter 3–5 (and proof) state

| Seed (sourced) | Adds |
|---|---|
| `c5.service === 'julian'` (Helix workroom used) | executive +2 |
| `c4.julian-kept && c4.audit-paid` | executive +1 |
| Julian intimacy outcome or `c5.mutual-interest` | executive +1 |
| `c5.published` (public artifact released) | own-power +2 |
| `c5.service ∈ {self, municipal}` (self-funded/public workspace) | own-power +2 |
| `c5.terms ∈ {self-funded, refused}` (refused a provider extension) | own-power +1 |
| `c5.message-sloane` (told Sloane the arrangement) | institutional +2 |
| `c5.service === 'axiom'` (kept the Axiom-cooperative version) | institutional +1 |
| a Sloane-visible record exists (`npcs.sloane.known` from Ch5/6 capture or meeting) | institutional +1 |
| `c6.rook-proof === 'supported'` | outside +2 |
| `c6.oracle-seen` | outside +1 |
| `c6.verify-method ∈ {prediction, comparison}` (engaged the proof) | outside +1 |
| Ch3 sender engagement (`c3.rook-window`, `c3.compared-date`) | outside +1 |
| a held Glass House item or `c3.verified-date` (own evidence) | own-power +1 |

### 1c. Resolution

- **Suggested lane = argmax** of the four totals.
- **Ties:** broken by the primary signal's lane (1a); if still tied (e.g. `resolve-protect` with balanced seeds), fixed priority **own-power > institutional > executive > outside** — an ambiguous player is most honestly read as independent, and own-power keeps the investigation solvable alone.
- The function returns the suggested lane **and** the ranked totals, so the Chapter 7 beat can speak to *why* (diegetically, not as numbers).

### 1d. Overlays (cause-driven, separate from the lane)

`deriveRoute6` also sets `route.overlay[]`, only where a **cause already exists in state** —
never from the lane tally:

- `kept` — a sequence of ≥2 accepted terms under one consolidating provider with a shrinking alternative (e.g. `c5.service=julian` + `exit-prep=deepened` + an accepted expectation). Recommend **at most one overlay** at a time.
- `exploitation` — a recorded threat/coercion cause with harm and no real alternative. Must never be set from chosen work, luxury, or a lane.
- `adult-work` — an accepted adult-work term (future content; none exists yet, so this stays empty for now).

Overlays modify a lane; they never replace it.

## 2. The Chapter 7 confirm-or-redirect beat

Chapter 7 opens on this scene. It reads the suggested lane, reflects the player's own
pattern back to them **diegetically**, and lets them **confirm or redirect**. The player's
choice here is what sets `route.lane` — the derivation was only the default. This is the
"chosen in play, not assigned" guarantee.

### Entry frame (shared)

> p: A week after the night everything moved, the city has not changed and you have. You wake in whatever life your last months built, and for once nothing is demanding a decision before breakfast. Which means the decision is yours to make first, unprompted, about how you intend to go on.
>
> t: Nobody handed you this the way the file was handed to you. You can see the shape of the road you have actually been walking. You can keep walking it. You can also, now, choose to turn.

### The mirror — by suggested lane (diegetic reflection, no labels)

One block, naming the pattern the state actually shows, without a route name:

- **institutional:** p: Look at the last months honestly. You stayed inside the machine — you told Sloane what you were doing, you kept the apartment and the cover, you learned to hold a position from within the walls rather than outside them. It is not weakness. It is a place to stand, and you know its corridors now.
- **outside:** p: Look honestly. You went to the one source no institution authored, spent your own knowledge to test it, and came away holding a truth the people in charge would rather you did not have. You have been becoming someone who trades in what others hide.
- **executive:** p: Look honestly. You have been building access — the room, the dinners, the man who opens doors and means it, terms written where they favour you. You have learned that proximity to power, held on your own wording, is itself a kind of power.
- **own-power:** p: Look honestly. You paid your own way, released your own image, kept your own evidence, and refused the extensions that would have made you easier to hold. You have been building a base that is small and slow and entirely yours.

> p: That is where you have been going. The question is only whether you meant it, and whether you still do.

### The choice (sets `route.lane` — this overrides the derivation)

Offer the **suggested lane** as the natural continuation, the **two adjacent lanes** as real
pivots, and the **opposite lane** as a hard break. Adjacency ring:
`own-power ↔ executive ↔ institutional ↔ outside ↔ own-power` (opposites: own-power/institutional,
executive/outside).

- **route-confirm** · Keep going the way you've been going · *Continue on the road you built. You start it with everything you've earned on it.*
  > p: You do not turn. You go on as the person your choices already made, and you carry every ally, every resource, every piece of standing you built into what comes next. → `route.lane = <suggested>`, entered **built** (full accumulated position).

- **route-pivot** · Turn toward an adjacent road · *A real change, affordable because it's close to where you are.* (two options, the two adjacent lanes)
  > p: You turn — not against everything, but toward something next to it. What you built still counts for something here; you begin the new road with part of your footing, and part of it to earn. → `route.lane = <chosen adjacent>`, entered **partial** (some carried standing, some to build).

- **route-break** · Turn hard, against your own history · *The opposite road. Possible, but you start it nearly from nothing.*
  > p: You choose the thing your last months point away from. It is allowed — you are not a prediction, and the road you walked does not own you. But you walk into this one almost unbuilt: the allies, the resources, the standing are on the road you left. You will make them here from the beginning, and it will be harder, and it will be yours in a way nothing inherited ever is.
  > → `route.lane = <opposite>`, entered **unbuilt** (minimal carried standing; the route development opens on the cost of the pivot). Gated behind a confirmation beat so it is never a mis-tap.

`route.entry ∈ {built, partial, unbuilt}` records how much accumulated standing carries into
route development — the honest consequence of confirming vs. redirecting. It is not a
penalty score; it is the concrete state of "you are new here."

### Close

> p: You have chosen the road, which is more than anyone let you do with the last one. Where it goes, who is on it, and what it costs to stay — that is the rest of the story, and you are, at last, the one writing it.
>
> → Chapter 7 route development opens on the chosen `route.lane`, coloured by `route.entry`.

## 3. Why this satisfies the autonomy law

- No outfit, profession or single interaction selects a route: the derivation is a *pattern* of many sourced records, and even it does not decide — the player does, here, in play.
- The reflection is honest (it shows what the state really is) but never a label or a verdict, and the player can refuse it outright with `route-break`.
- The cost of redirecting is diegetic and concrete (`route.entry`), not a hidden penalty: turning to a road you didn't build means building it now.
- The lane and overlays stay re-derivable from sourced state; nothing is a persistent meter.

## 4. Notes for EVE Code

- `deriveRoute6(state)` is a pure function returning `{ lane, totals }`. Run it at the Chapter 6 `complete` phase to stub `route.lane` (the suggested lane) and again at the Chapter 7 beat to drive the mirror. The Chapter 7 choice **writes** `route.lane` (+ `route.entry`) — overriding the stub — via a `CHAPTER7_CHOOSE` action, the same additive pattern as Chapter 6.
- Store `route.lane`, `route.entry`, `route.overlay` in `choices` (string values); no schema change. Overlays computed by the same function from causes; empty for now except where a `kept`/`exploitation` cause already exists.
- `route-break` needs a confirmation sub-step (it's the costly one) so it is deliberate.
- This adds Chapter 7's *opening beat only*. The route development that follows is the per-lane design pass (one doc per lane), still to be written, and gated the same way Chapter 6 is until scripted.
- Weights in §1 are design's; if a cleaner integer scheme derives the same orderings, that's fine — the **orderings and tie-breaks** are what design owns, not the literal numbers.
