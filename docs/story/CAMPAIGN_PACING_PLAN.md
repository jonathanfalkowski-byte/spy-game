# Campaign pacing plan — reaching 20–25 hours

**Owner direction (2026-09-24):** EVE should be **20–25 hours** of play per playthrough. An endgame
at Chapter 10 is too early. This document is the reference for length and act structure. Every
chapter design and build plan should name its act and its hour budget from here.

Related: [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md) (the diamond, the four lanes),
[ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) (endgame canon: Celeste, Meridian, Sloane).
Those stay canon. This plan changes **when** things land and **how long** each part is.

## Where the game stands (measured 2026-09-24)

Prose words across **all** branches in `src/content/`:

| Part | Words | Status |
|---|---|---|
| Opening (day, mission, clinic) | ~23,000 | built |
| Chapter 3 | ~6,500 | built |
| Chapter 4 | ~4,900 | built |
| Chapter 5 | ~8,400 | built |
| Chapter 6 | ~6,600 | built, gated |
| Chapter 7 (own-power) | ~2,300 | built, gated |
| Chapter 8 (own-power) | ~1,800 | built, gated |
| Chapter 9 (shared bridge) | ~2,200 | built, gated |
| **Total** | **~55,800** | |

One playthrough reads roughly half of that (~25–30k words). At the usual visual-novel pace of
**~10,000 words per hour** (reading plus choices and investigation screens), **the game is
currently ~3 hours long.** (Corrected 2026-09-24: an earlier draft said 4–5 hours, which
didn't match its own arithmetic.) The chapter-by-chapter budgets are in
[BEAT_MAP.md](BEAT_MAP.md).

**Target:** 20–25 hours ≈ **200,000+ words on a single path**, about seven times what exists.

Two separate problems:
1. **Too few chapters.** The arc was planned to end around Chapter 10.
2. **Chapters too thin.** Chapters 7–9 are ~2k words each (~20 minutes). They are working
   skeletons, not full chapters.

## The four-act structure

The Celeste reveal becomes the **midpoint twist**, not the lead-in to the finale.

| Act | Chapters | Hours | Content |
|---|---|---|---|
| **I. Second Skin** | Opening–Ch5 (built) | ~5–6 | The identity, the job, the first life. Deepen what exists. |
| **II. The Road** | Ch6–Ch9 (built as skeletons) | ~5–6 | Proof, the route choice, the investigation. **Ends on the Celeste reveal: the midpoint.** |
| **III. The Counteroffensive** | ~Ch10–Ch15 (new) | ~7–8 | Celeste knows you know and plays you. Meridian pushes back. The burned Evelyn's trail in Singapore. Sloane's turn. The blackmail arc: Celeste's orders and the leverage board ([CONTENT_DIRECTION.md](CONTENT_DIRECTION.md)). Relationships deepen. |
| **IV. The Position** | ~Ch16–Ch18 | ~3–4 | The endgame operation: the confrontation with Celeste, Sloane's resolution, the endings as positions. |

Acts I and IV are **shared** by all four route lanes. Acts II–III are the **route-specific**
bulk, so each lane is a large build. **Own-power is built first** as the template (route-map
decision 4).

## What this changes

1. **The endgame moves to ~Chapter 16.** Everything settled in `ENDGAME_RECONVERGENCE.md` stays
   canon (Celeste on the board, Meridian sells lived-in legends, Sloane as a person in the
   machine, wound-not-topple). Only its timing changes. The "Ch10 = endgame" build order in that
   doc is superseded by this plan.
2. **Chapter 9's last beat changes.** It ends on "a room ahead with Celeste in it", pointing at an
   immediate confrontation. It should end on the realisation that **she has seen your face too**,
   opening Act III. One-line fix, pending.
3. **Chapters 7–9 get deepened** to about 3–4 times their length: more scenes per chapter, field
   operations and relationship beats (heat 3 at most). Otherwise Act II is a fast skim.
4. **Every new chapter carries a length budget** (target words / minutes) from the beat map, and
   build checkpoints report the chapter's word count against it.

## Rules of thumb for hitting length honestly

- Length comes from **play**, not padding: field operations, investigation screens, relationship
  scenes, consequences that come back. Never stretch a beat that has done its job.
- A full chapter is roughly **8–12k words on one path** (~1 hour), across several scenes, not one
  hub.
- Hubs (like Ch7 `pursue` and Ch9 `assemble`) are for *choice*. Each hub option should open a
  scene, not a paragraph.

## Next step

**Done:** the Acts I–IV beat map is [BEAT_MAP.md](BEAT_MAP.md), with its own ordered next steps.
