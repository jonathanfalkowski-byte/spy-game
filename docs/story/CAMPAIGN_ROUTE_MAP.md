# Campaign route map — the diamond from Chapter 6 forward (draft)

**Design draft for owner review.** No runtime, chapters, state or art are implemented by
this. It makes the existing route architecture concrete: how one ~15–20h playthrough is
shaped, how Chapter 6's counterpower assigns a route, where routes diverge, and where they
reconverge. Builds directly on
[FULL_GAME_ROUTE_ARCHITECTURE.md](FULL_GAME_ROUTE_ARCHITECTURE.md) (budget + doctrine),
[FUTURE_TRAJECTORIES.md](../design/FUTURE_TRAJECTORIES.md) (the eight families),
[CHAPTER_6_PROOF_AND_COUNTERPOWER.md](CHAPTER_6_PROOF_AND_COUNTERPOWER.md) (the hinge), and
the [Master GDD](../design/EVE_MASTER_GDD.md) autonomy law.

## The shape of one playthrough (~15–20h)

A single player's run is a **diamond**: a shared start, a divergence into one route, then a
reconvergence into a shared endgame that *remembers* the route. This is model (a) the owner
confirmed — ~20h is one journey, not 20h of unique content per route.

```
        SHARED SPINE  (~6–7h, already built)
   Opening → Blackglass/Sloane → Clinic/Glass House
        → Ch3 Second Skin → Ch4 Private Access → Ch5 Beautiful Life
                          │
                 CHAPTER 6 — the hinge  (~1–2h, in build)
             proof + counterpower → sets end-position + route signal
                          │
        ┌──────────┬──────┴──────┬───────────┐      ROUTE DEVELOPMENT
   Institutional  Outside     Executive     Own-power        (~6–8h, Ch7–9)
     (Sloane)   intel (Rook)  (Julian)   (public/independent)
        └──────────┴──────┬──────┴───────────┘
                          │   crossover allowed between adjacent lanes
              CONVERGENT ENDGAME  (~3–5h, Ch10+)
        the ORACLE / Project Eve operation — routes reconverge,
        Sloane's motive resolves, each route brings its own evidence/allies/exits
```

The investigation is solvable on **every** route (autonomy law). Overlays — exploitation/
recovery, kept/dependency, chosen adult work — are *caused by specific acts and can sit on
any route*; they are never a route by themselves and never the default of luxury, public
work or femininity.

## The four route lanes (consolidated from the eight families)

The eight trajectory families collapse into four playable **lanes** for the diamond, plus
three **overlays** that modify any lane. This keeps the branch buildable while preserving
the families' distinctions.

| Lane | Trajectory families it carries | What opens it (accumulated + Ch6 signal) | Its distinct power | Its distinct cost | Its exit |
|---|---|---|---|---|---|
| **Institutional (Sloane)** | Sloane Operative | Sloane ties (`c5.message-sloane`, `service=axiom`), institutional exit-arrangement, and a Ch6 `challenge-Sloane` or `enforce` action that engages rather than breaks the arrangement | Operational infrastructure, formal authority, real backup | Monitoring, scope disputes, loyalty expectations | Refuse a directive, leak a scope breach, or walk with what you know |
| **Outside intelligence (Rook)** | (Rook alignment; free-agent-adjacent) | `c6.rook-proof = supported` + `oracle-seen`, and a Ch6 `trade/expose the proof` action | Actionable truth others cannot get | Dependence on a source who chooses which truths arrive; provenance risk | Verify independently, or cut the source |
| **Executive (Julian/Helix)** | Corporate Predator, Executive Companion | Julian professional + personal state, `julian-workroom` arrangement, and a Ch6 `enforce a term` or knowing-deepen action | Access to decisions, status, genuine useful help | Conflicts between professional terms, private care and influence | Enforce the exact term, self-fund the benefit, or exit with rights intact |
| **Own-power (public / independent)** | Free Agent, Celebrity Power | Self-funding, public artifacts (`c5.published`), refusal of provider extensions, and a Ch6 `own-hand` end-position | Control of evidence, audience as leverage, selective alliances | Less money, slower access, personal exposure | Pay/wait, restrict use, correct a claim, or use attention to protect someone |

Overlays (cause-driven, on top of any lane):
- **Exploitation / recovery** — a named threat, a constrained alternative, harm, then a recovery step. Never a re-description of chosen work.
- **Kept / dependency** — emerges only from a *sequence* of accepted terms under a consolidating provider, with shrinking alternatives. Never inferred from a luxury or a chosen intimacy.
- **Chosen adult professional work** — a future offer with real terms, rights, representation, payment, distribution and exit. Not a corruption route.

## How Chapter 6 assigns the lane (no single switch)

The lane is **not** one Chapter 6 choice — the autonomy law forbids a single outfit,
profession or interaction from selecting a route. It emerges from a **weighted read** of
accumulated state, with the Chapter 6 counterpower action as the strongest single signal:

- **Route seeds** accumulate from Chapter 3–5: Julian reliance, public artifacts, Sloane messages, Rook trust (`rook-proof`), self-funding vs provider benefit, false-statement/leverage records. These already exist in state.
- **The Chapter 6 counterpower action** (`c6.exit-action`) is the decisive recent signal: `enforce/deepen` leans executive or institutional; `challenge-Sloane` leans institutional; `trade/expose` leans outside-intel; `break/pay/protect/decline` with an `own-hand` position leans own-power.
- **`c6.end-position`** and `c6.exit-arrangement` weight it further.
- A player near a boundary is offered a **legible early divergence choice** in Chapter 7 (not a hidden assignment) that confirms or redirects the lane, so the route is chosen in play, not diagnosed.

Design-only field sketch: `route.lane` (institutional|outside|executive|own-power),
`route.overlay[]` (exploitation|kept|adult-work), both **derived and re-derivable** from
sourced records, never a hidden score. EVE Code owns the exact weighting; design owns which
signals count and the Chapter 7 confirm-or-redirect beat.

## Divergence — route development (Ch7–9, ~6–8h)

Each lane develops distinct **opportunities, relationships, costs, and evidence access**
(the budget doc's mandate). A lane is not a reskin: it must give the player something the
others cannot, and cost something the others do not. Per lane, the development chapters
supply:

- a distinct **evidence path** toward the shared endgame's questions (Sloane's motive, the full Project Eve plan) — each lane reaches the truth by a different road;
- distinct **allies/antagonists** (institutional handlers, Rook, Julian/Helix figures, public/editorial contacts, Marcus/Celeste as bounded witnesses);
- distinct **exposure and resources**;
- at least one **crossover** to an adjacent lane (a free agent can cross an executive operation; public visibility can reshape covert access) — crossovers change access, never erase biography.

Concrete per-lane development is a **later design pass** (one document per lane); this map
fixes the frame, not the scenes.

## Reconvergence — convergent endgame (Ch10+, ~3–5h)

All lanes funnel into **one shared operation**: the confrontation with the ORACLE / Project
Eve truth, where **Sloane's motive (deferred from Chapter 6) resolves.** Reconvergence
doctrine (from the architecture doc) is law here:

- Reconverge **plot logistics, not biography.** The same operation reacts differently to who arrived.
- What the endgame **reads from the route:** the evidence the player can bring, which witnesses will speak to them, their public exposure, their leverage over Sloane/Helix/Rook, their resources, and which exits are open.
- What must stay **route-specific and visible in play** (not a logged ending slide): a route-specific consequence, a relationship vocabulary, an available exit the other routes lack.
- The ending is **not** a single verdict: it is a position — what Evelynn now knows, holds, and can do — consistent with "increased agency, not capture."

## What every reconvergence must remember (the biography)

From the entry-state discipline: custody of evidence, money, public artifacts, actual
message recipients, false statements and their recipients, accepted obligations and
deadlines, honored or violated boundaries, and **who arrived** (the lane and any overlay,
with its causes). Reconvergence changes logistics; it never rewrites what the player did or
what it cost.

## Scope and sequencing (honest)

- This is a **multi-chapter arc** (Ch7 through the endgame). It is far larger than Chapter 6 and is the bulk of the remaining game. It should be built **one lane at a time**, each as its own design-then-build unit, after Chapter 6 ships.
- **Chapter 6's job for this map:** expose the route seeds as clean, sourced, re-derivable state and record the counterpower action — so the Chapter 7 divergence can read them. The Chapter 6 build already stores the needed signals; this map adds only the requirement that they stay legible.
- **Do not** manufacture routes by reskinning one scene, treat appearance as agency, gate required proof behind intimacy, or promise equal scene counts per lane.

## Open decisions for the owner

1. **Four lanes, or split "own-power" into public and independent as two?** Four keeps it buildable; splitting adds fidelity at real content cost.
2. **Where exactly the Chapter 7 confirm-or-redirect divergence beat sits**, and how strongly the Chapter 6 action weighs versus the older seeds.
3. **How many overlays can stack** on one run (recommend at most one at a time, cause-driven).
4. **Which lane is built first** after Chapter 6 (recommend own-power/independent — it depends least on the others and proves the investigation stays solvable alone).
5. Whether the reconverged endgame is one operation for all lanes (recommended) or a small number of endgame variants.
