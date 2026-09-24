# Code build plan — Chapter 9 (shared bridge): Assembling the Case

Design canon: [scripts/CHAPTER_9_ASSEMBLING_THE_CASE_SCRIPT.md](../story/scripts/CHAPTER_9_ASSEMBLING_THE_CASE_SCRIPT.md),
[ENDGAME_RECONVERGENCE.md](../story/ENDGAME_RECONVERGENCE.md) (§5 entry contract, §6 bridge, §10
settled decisions). Same additive, gated pattern as Chapters 6–8. This is the **convergent
bridge** — the diamond's right-hand join — so it is written lane-general, with own-power as the
only live feeder for now.

## Phase 0 — approach report (no code yet)

Report before building:

1. **Revision/gate.** Confirm additive-in-place (a new `CHAPTER9_CHOOSE` action, no existing
   ledger contains it, so all saves replay identically — the Ch6–8 model), plus a
   `VITE_EVE_CHAPTER9`-style gate so it ships nothing until the endgame arc is done. Extend the
   golden-ledger guard to cover it.
2. **Entry + the lane branch.** Chapter 9 is reachable from a lane's Chapter 8 `complete`.
   Own-power Ch8 `complete` is the live feeder; the other three lanes route through the existing
   dev-gated "in development" placeholder into `arrive` (the Ch7-confirm non-own-power pattern).
   Confirm where you read `route.lane` / `own.crossover` for the `arrive` frame, and that a lane
   with no Ch8 yet still reaches `arrive` cleanly through the placeholder.
3. **The `assemble` hub + the strength budget.** Recommend how to represent `case.strength` as a
   **weight tally** (each contributing move = +1; bands thin 0–1 / supported 2 / strong 3+), with
   `assemble-name` and `assemble-stop` always present and the rest gated by biography. This
   mirrors the Ch7 `pursue` hub but with a *weight band* instead of a fixed two-piece budget —
   name any place you'd shape it differently.
4. **New state fields** (all in `choices`, re-derivable, no schema change): `case.strength`
   (thin|supported|strong — derived at `resolve`), `case.name` (unfound|celeste),
   `c9.witness` (confirmed), `c9.lever` (oracle|oracle-inferred), `c9.chain` (built),
   `c9.name-road` (public|rook|editor|crossover), `c9.entered` (Ch10 entry resolution), plus
   ally-spend updates to the existing `own.alliance.*`. Confirm these can all derive from stored
   Ch6–8 state deterministically, and flag any you'd name differently. **Watch the 80-char
   choice-value cap** (the Ch6 `c6.cons.*` bug) — keep these short codes, not sentences.
5. **Gate predicates** (from the script):
   - `assemble-witness` = Ch6 corroborator engaged (Celeste primary, Marcus fallback), firsthand-bounded.
   - `assemble-oracle` = `c6.oracle-seen`; else the `oracle-inferred` reconstruction sub-path.
   - `assemble-evidence` = ledger leaf / current-op evidence in custody.
   - `assemble-ally` = the specific ally is engaged and not spent (rook / editor from `c5.published`
     path / maya on `c6.maya = restored` / crossover-contact on `own.crossover ∈ {executive,
     institutional}`).
   - `assemble-name` = **always** (road differs by lane; own-power = slow public veil-peel).
   - `assemble-stop` = always.
   Confirm each predicate against existing fields, and confirm the ally sub-options resolve
   deterministically.
6. Name every rev13-19 / Chapter-6/7/8 test that would move.

## Structure (from the script)

- Phases: `arrive` → `assemble` (hub) → `resolve` → `complete`.
- `arrive`: lane/crossover entry frame (own-power live, others stubbed one line), the shared
  Meridian turn lands, states the job → `assemble`.
- `assemble`: the hub — `assemble-witness`, `assemble-oracle`, `assemble-evidence`,
  `assemble-ally` (with rook/editor/maya/crossover sub-options), `assemble-name` (always),
  `assemble-stop` (always). Each one-shot returns to the hub; each adds a strength weight.
- `resolve`: compute `case.strength`; state provable-vs-argued; the **name floor** guarantees
  `case.name = celeste` even if stopped early; cost register → `complete`.

## Guarantees to preserve (autonomy law)

- **The name is never missable.** `assemble-name` is always available (slow public road), and the
  `resolve` name-floor sets `case.name = celeste` even if the player took `assemble-stop` first.
  The *strength* scales with the route; the *name* and a thin case are reachable with the
  free-agent core alone.
- **Celeste stays firsthand-bounded** in `assemble-witness` (Ch6 rule): she confirms the leaf
  *fits the woman she knew*, never supplies the ORACLE plan / Axiom internals / Adrian's clinic
  history. The reveal is reached in `assemble-name`, not from her mouth.
- `case.strength`, `case.name`, `c9.name-road` and the ally/exposure updates are the Chapter 10
  entry contract (endgame doc §5) — store them cleanly and re-derivably.
- No intimacy in this chapter.

## Tests

- New-game reaches Chapter 9 from own-power Chapter 8 `complete`; non-own-power lanes reach
  `arrive` through the placeholder.
- Each `assemble` gate offered/hidden by the right state; the strength budget bands correctly
  (thin/supported/strong); `assemble-stop` paths.
- **Autonomy:** a records-only own-power run (no allies, no ORACLE) still reaches `case.name =
  celeste` and a `thin` case — via `assemble-name` and via the `resolve` name-floor after an early
  stop.
- `c9.name-road` set correctly by which road reached the name; `c9.witness`/`c9.lever`/`c9.chain`
  set on the right paths; `own.alliance.*` spend marks correct.
- Golden-ledger guard still green; rev13-19 + Ch6/7/8 replay byte-stable; full suite + build green.

## Sequencing note

Chapter 9 is the shared bridge and unblocks the most, so it is built before the Chapter 10
own-power endgame operation (which I'll design next, once Ch9 checkpoints). Keep it gated;
it ships nothing until the endgame arc is whole. Report Phase 0, then I'll confirm and you build.
No commits until a checkpoint.

## Phase 0 decisions (2026-09-23, after EVE Code's report)

Approach accepted as reported (additive in rev 19, `CHAPTER9_CHOOSE`, scene `chapter9`, gate
`VITE_EVE_CHAPTER9`, new Ch8 + Ch9 golden fixtures, the 5181-only launch flag, placeholder
entry from `chapter7.complete` for the non-own-power lanes, `case.strength` derived at resolve
from the `c9.took.*` count). Decisions:

- **D1 — Marcus fallback: accepted.** Source = the Glass House claim record
  `mission.marcus-memory` present AND `c6.celeste` unset → `c9.witness = confirmed-pro`. Ch6
  never built a Marcus witness, so this is the honest firsthand source. Prose (professional
  scope, no more than his record supports):
  > q(Marcus): She left the gathering before the speeches. I noticed because we were meant to
  > close something that night, and we closed it without her. That's what I can give you: where
  > she was, and when she stopped being there. Not why.
  > p: Professional memory, not friendship: a date, an absence, a deal that went on without her.
  > It fits the record. It proves nothing about why.
- **D2 — `c6.celeste = pressed` still confirms, cooler:**
  > q(Celeste): You pushed me once already. Fine. Show me the date.
  > p: She reads it the way you'd check a bill. *"That's her. That's the week she vanished."* She
  > doesn't touch your arm this time.
- **D3 — inferred ORACLE:** gated on `c6.proof-opened` (agreed, or it's free for everyone).
  Cost **$60** `own.cash`, never blocking (clamp at 0, note unpaid, like the Ch7 fee and Ch8
  dig). No cash cost on non-own-power lanes.
- **assemble-evidence reading: confirmed.** `c6.photo-custody = phone` OR `canCompare6` (Glass
  House item or `c3.verified-date`).
- **D4 — Maya: one use in total.** If Ch8 used her, she isn't offered in Ch9. When Ch9 is her
  first use, set `own.alliance.maya = used` (no `spent`; a public-scope read is within her
  line, not a strain, per Ch8 D3b).
- **D5 — name-road order accepted:** editor → crossover → rook → public, first match wins. The
  resolve floor records **`floor`** so Ch10 can tell a named case from a floored one.
- **D6 — multiple allies: yes.** Each qualifying ally is its own option ("spend who's left"),
  each spend costs that ally, band caps at strong.
- **D7 — witness after the name (design catch).** Celeste is both the witness and the board
  member. If the player takes `assemble-name` **before** `assemble-witness` (Celeste path), the
  witness move stays available with a variant, still firsthand-bounded, still +1 weight:
  > q(Celeste): So you know. *(a pause)* That's her. That's the week she vanished. Now you know I
  > knew her. Ask yourself why I'm still telling you the truth.
  > p: She confirms it anyway, and it is the most frightening thing she has done. She is not
  > afraid of what you hold. Not yet.
  The Marcus variant is unaffected (he isn't the reveal). No new flag; branch on `case.name`
  being set when the witness move is taken.
- **Art:** chapter9 on the existing dark apartment/phone masters is fine. No new rooms now.
