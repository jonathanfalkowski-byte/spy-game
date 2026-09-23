# Code build plan — Chapter 7 (own-power): Standing Alone

Design canon: [scripts/CHAPTER_7_OWN_POWER_SCRIPT.md](../story/scripts/CHAPTER_7_OWN_POWER_SCRIPT.md),
[CHAPTER_7_ROUTE_CONFIRM.md](../story/CHAPTER_7_ROUTE_CONFIRM.md) (the confirm beat + seed
weighting), [routes/OWN_POWER_ROUTE.md](../story/routes/OWN_POWER_ROUTE.md). Same additive,
gated pattern as Chapter 6.

## Phase 0 — approach report (no code yet)

Report before building:
1. **Revision/gate.** Confirm additive-in-place (a new `CHAPTER7_CHOOSE` action, no existing ledger contains it, so all saves replay identically — the Chapter 6 model), plus a `VITE_EVE_CHAPTER7`-style gate so it ships nothing until the arc is done. Extend the golden-ledger guard to cover it.
2. **Entry + the confirm beat.** Chapter 7 is reachable only from `chapter6.complete`. Its **first phase is the confirm beat** (`CHAPTER_7_ROUTE_CONFIRM.md`): run `deriveRoute6(state)` for the suggested lane + mirror, then the player's choice **writes** `route.lane` (+ `route.entry` = built/partial/unbuilt). Recommend how to represent the beat's adjacency/pivot cost and where `route.entry` is set.
3. **Only own-power is built.** For a confirm choice of any other lane, route to a clearly-marked "this route is in development" placeholder that reaches `complete` cleanly (dev-gated, ships nothing). Only `route.lane = own-power` enters the `standing → pursue → close` content.
4. **New state fields** (all in `choices`, re-derivable, no schema change): `route.lane`, `route.entry`, `own.piece.{records,maya,rook,audience}`, `own.alliance.rook`, `own.exposed`, `own.cash` (seeded from `c5.cash`), `c7.finding` (shape|lead|none). Name any you'd shape differently and confirm `own.cash` can seed from the stored Chapter 5 cash deterministically.
5. Name every rev13-19/Chapter-6 test that would move.

## Structure (from the script)

- Phases: `confirm` → `standing` → `pursue` (hub) → `close` → `complete`.
- `standing`: entry frame by `route.entry`; the question surfaces; the money reality; `standing-begin` → `pursue`.
- `pursue`: the hub — `pursue-records` (always), `pursue-maya` (non-strained Maya), `pursue-rook` (any engaged `npcs.rook`, with the trade sub-choice fact/debt/refuse), `pursue-audience` (`c5.published`), each one-shot returning to the hub, plus `pursue-stop`. A **piece budget of two** auto-advances to `close`; `pursue-stop` goes early with fewer.
- `close`: the finding scales with pieces held (`c7.finding` = shape ≥2 / lead 1 / none 0); the cost register (exposure/cash) fires by flags; → `complete`.

## Guarantees to preserve

- **Autonomy:** `pursue-records` alone reaches a one-piece `lead` — the thread is always pullable with the free-agent core, no institution or intimacy required.
- `own.exposed` (audience used) and `own.alliance.rook = owed` (traded on debt) are the two hooks Chapter 8 reads — store them cleanly.
- No intimacy in this chapter.

## Tests

- New-game reaches Chapter 7 from Chapter 6 `complete`; the confirm beat writes `route.lane`/`route.entry`; non-own-power choices reach the placeholder `complete`.
- Each `pursue` gate offered/hidden by the right state; the two-piece budget advances; `pursue-stop` paths; `c7.finding` scales correctly (shape/lead/none).
- Records-only reaches `lead` (the autonomy guarantee).
- `own.exposed` and `own.alliance.rook` set on the right paths.
- Golden-ledger guard still green; rev13-19 + Chapter 6 replay stable; full suite + build green.

Report Phase 0, then I'll confirm and you build. No commits until a checkpoint. Chapter 8
("The Cost Bites") script is coming from me in parallel — it reads `own.exposed`,
`own.alliance.rook`, `c7.finding` and `route.entry`.
