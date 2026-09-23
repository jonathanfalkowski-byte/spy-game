# Explicit scene register

Every point in EVE where an explicit sexual body would go, so they can be found and
authored later. Kept current as lanes are added.

**Decisions (owner):** explicit sexual bodies and **explicit CGs are both in scope**
(2026-09-23); explicit CGs are generated in EVE's noir style. Division: design writes and
runs the explicit *prose* pipeline (local writer) and supplies image anchors/continuity;
the **owner** generates the explicit *images* and their prompts via the noir
owner-explicit-frames workflow. Claude does not generate explicit images or write
explicit-image prompts. Tasteful/implied bodies ship in the meantime for any point still
deferred. See [intimate/README.md](intimate/README.md) and
[../art/OWNER_EXPLICIT_FRAMES.md](../art/OWNER_EXPLICIT_FRAMES.md).

## Status legend

- **DEFERRED** — the choice exists; the explicit body is not written yet. A tasteful body ships in the meantime, or the path is gated off until authored.
- **FADE** — currently fade-to-black by design; a candidate point if the owner wants an explicit body there later.
- **FUTURE** — the scene is not in the engine yet (e.g. Chapter 6).

## Register

| # | Scene | Where (file · gate) | Status | Writer card | Art anchors |
|---|---|---|---|---|---|
| 1 | **Sebastian — hotel room, sex scope** (C5) | salon-room `handoff-continue`, scope = sex, `c5.sebastian-outcome = intimate-sex` (rev19 content, added by EVE Code job 4; script §3f) | **DEFERRED** — no-sex body ships; sex path gated off until the body is authored | [intimate/cards/c5-sebastian-night.md](intimate/cards/c5-sebastian-night.md) | F7 lead-in `1f4df211-70d8-43dc-a33e-1bdaffbdaa93`, F8 aftermath `f0382b59-4511-476e-9c9c-5c4dd68cd8e1` |
| 2 | Sebastian — hotel room, no-sex scope (C5) | salon-room `handoff-continue`, scope = no-sex, `intimate-no-sex` | **SHIPPING** (heat 2–3, implied; authored in script §3f) | n/a (non-explicit) | F7/F8 as above |
| 3 | **Julian — Chapter 4 intimacy, sex scope** | `src/content/chapter4-power.ts` — sex option :481, `planned-outcome` :493, `fade` :562 | **FADE** (non-graphic by design) — candidate explicit point | none yet | Julian refs; no dedicated frame yet |
| 4 | **Julian — Chapter 5 want, sex scope** | `src/content/chapter5-desire.ts` — `fade` :461, "scene fades" :482 | **FADE** — candidate explicit point | none yet | Julian refs; no dedicated frame yet |
| 5 | Sebastian — Chapter 6 goodbye (bounded) | Chapter 6 not in engine; fresh consent step, one meeting before Thursday | **FUTURE** | none yet | reuse Sebastian refs |

## Notes per point

- **#1 Sebastian sex body.** The local 8B writer could not produce a clean explicit take even segmented (off-register dialogue, POV slips, degeneration). Best raw segments are kept in `local/writer-out/c5-sebastian-night-seg/` (gitignored) for the owner's edit pass. Until an explicit body exists, EVE Code gates the `scope-sex` option OFF via a `SEBASTIAN_SEX_BODY_READY` constant (currently false); only `scope-no-sex` is offered. Flip the constant and insert the take when authored.
- **#3 / #4 Julian.** Both currently fade to black, which is the reviewed design. They are listed here only as candidate points if the owner later wants explicit bodies; changing them is a separate decision, not part of rev19.
- **#5 Chapter 6.** Bounded goodbye; if it becomes intimate it needs its own fresh-choice consent step and its own card and anchors.

## How to author an explicit body later (per point)

1. Prose: refine the writer card, run `tools/writer/write-scene.mjs <card>` (segment it — the model can't hold a long scene in one pass), cull, do the edit pass. Insert the chosen take where the code marks the placeholder.
2. Image: use the recorded art anchors as the base image in ZenCreator, per [OWNER_EXPLICIT_FRAMES.md](../art/OWNER_EXPLICIT_FRAMES.md). Stage in `art/staging/owner-explicit/`, then bind.
3. Flip the readiness gate for that point (e.g. `SEBASTIAN_SEX_BODY_READY = true`).
