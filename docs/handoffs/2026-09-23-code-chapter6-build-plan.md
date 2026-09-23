# Code build plan — Chapter 6: proof and counterpower

Design authority (settled canon): [CHAPTER_6_PROOF_AND_COUNTERPOWER.md](../story/CHAPTER_6_PROOF_AND_COUNTERPOWER.md),
[CHAPTER_6_THE_CAGE_YOU_CHOOSE.md](../story/CHAPTER_6_THE_CAGE_YOU_CHOOSE.md) (structure),
[CHAPTER_6_ENTRY_STATE_MATRIX.md](../story/CHAPTER_6_ENTRY_STATE_MATRIX.md) (carry-forward).
Lanes: [LANES.md](../LANES.md).

This is a large chapter. Build it in the phases below, and **do Phase 0 (approach report)
before writing any code** — same as the job-4 conflict report. Design supplies the scene
prose as per-movement scripts (like `REV19_SEBASTIAN_MAYA_SCRIPT.md`); you build the
scaffolding, guards, state machine, wiring and tests, with prose placeholders until each
script lands.

## Revision and freeze model

Chapter 6 is new content, so it follows the revision-19 pattern:

- **Content revision 20.** Freeze revision 19 to `src/persistence/legacy-v19/` (snapshot + `SOURCE.json` + an `audit-frozen19` test), exactly as v18 was frozen. Revisions 13–19 route to their frozen engines; the live engine becomes revision 20 = revision-19 content **unchanged** + Chapter 6 appended.
- **Additive only.** Chapter 6 must not alter any revision-13–19 scene prose or state. It adds a new `scene = 'chapter6'`, new phases/nodes, and new `c6.*` keys in `choices` (a `z.record`, so no `SaveSchema` shape change; `StateSchema`/`SaveSchema` accept 20).
- **Entry transition.** Mirror the Chapter 4→5 pattern: when `isCurrentAuthoringRevision(s.contentRevision)` and `s.scene === 'chapter5' && s.phase === 'complete'`, advance to `scene = 'chapter6'`, first phase `benefit`. Frozen revision-19 saves therefore stop at Chapter 5 complete and never see Chapter 6 — the accepted consequence of the content-revision model. Flag this for the owner; a migration path for in-progress rev19 saves is a separate decision, not in scope here.

## Phase 0 — approach report (no code yet)

Report to EVE design overview before building:
1. Confirm the revision-20 + freeze-v19 approach, or propose a lighter additive alternative if Chapter 6 truly changes nothing reachable by rev19 saves (and prove replay stability either way).
2. **Rook representation.** Rook is currently the "Unknown sender" via phases (`chapter3-next.ts` rook/rookCompare/rookReply) and delivery records, not an NPC. Recommend whether Chapter 6 adds a `rook` entry to `NpcIdSchema` (so the sender can hold sourced known-facts and be corroborated), or keeps the scene/message mechanism. Design's lean: add `rook` as an NPC id so the proof chain can record what Rook demonstrated knowing — but you own the call on cost/replay.
3. **Exit-arrangement derivation.** Confirm you can derive `c6.exit-arrangement` purely from stored Chapter 5 flags (see §"Exit cost") without new persisted state at Chapter 5, so older saves entering Chapter 6 resolve deterministically.
4. Name every new state field and its schema location; confirm no rev13–19 test moves except the expected identity/count ones.

## State fields (design-only names; you finalize)

In `choices` under the `c6.` prefix unless noted:

- `c6.exit-arrangement` — derived at Chapter 6 entry from Chapter 5 state: `julian-workroom | public-artifact | sloane-institutional | self-funded | maya-line` (selection rule below).
- `c6.rook-proof` — `untested | broken | supported`.
- `c6.verify-method` — `comparison | prediction | refused`.
- `c6.oracle-seen` — boolean.
- `c6.exit-action` — `paid | negotiated | public | exposed | protected | declined | deepened`.
- `c6.end-position` — `oracle-truth | own-hand | both | none` (derived, for the ending prose).
- A sourced consequence record per the matrix's design-only ledger: benefit, provider, term, accepted obligation, alternative cost, actor knowledge, request, response, recovery. **No dependency score.**

## The six movements → phases

Each movement is one or more phases. Entry guards read Chapter 5 state; design delivers the prose script per movement. Build the guards and choice structure; leave prose as placeholders keyed to the script section.

| Movement | Phase(s) | Entry guard (from stored state) | Design script |
|---|---|---|---|
| 1. Benefit connected | `benefit` | Always; selects `c6.exit-arrangement` from Chapter 5 flags | §6 table of the design |
| 2. Expectation named | `expectation` | The selected arrangement's provider makes a request tied to its real term | per-arrangement |
| 3. Friction among people | `friction` | Reads `npcs.*.known`, delivered messages, `c5.maya-clean-line` | per-actor |
| 4. Cost of exit | `exit` | The arrangement was used ≥ once / a term accepted | §6 recovery routes |
| 5. Proof, not confession | `proof` | Rook/sender trail exists (`c3.verified-date`, sender records) | §2–4 (below) |
| 6. Counterpower | `counterpower` → `resolve` → `complete` | Proof outcome + selected arrangement | §7 endings |

The proof phase (5) is reachable independently of the exit arrangement; a player can run
it, refuse it, or never engage the sender. It is not a gate on reaching the ending.

## Exit-cost selection rule (movement 1)

Derive `c6.exit-arrangement` at Chapter 6 entry, first match wins, all from stored flags:

1. `c5.service === 'julian'` → `julian-workroom`
2. else `c5.published` truthy → `public-artifact`
3. else a real Sloane institutional tie in `npcs.sloane.known` / `c5.message-sloane` → `sloane-institutional`
4. else `c5.service === 'self'` or a self-funded/public workspace record → `self-funded`
5. else `c5.maya-clean-line` present and nothing above → `maya-line`

Each arrangement's expectation (2), exit cost (4) and recovery route come verbatim from
design §6; you wire the guard + choices, design writes the lines. `self-funded` is the
"cost comparison, not a trap" profile — its exit is a decline, not a loss.

## Proof chain (movement 5) — the state machine

Phase `proof`:

- **The artifact:** the Operation Meridian ledger leaf (Singapore courier-log page in the prior Evelyn's hand), presented by Rook. Custody mirrors the Glass House items: Evelynn may view it, photograph it on the monitored phone (**side effect: adds a Sloane-visible record**, like `mission.ts:203`), or compare without taking custody. No route yields a silent clean copy.
- **Verification, offered by what the player kept:**
  - `comparison` — available if the player holds a Glass House item or `c3.verified-date`. Compare the leaf's date against the retained trail. Consistency → supports; contradiction → `broken`.
  - `prediction` — always available. Withhold Celeste's confirmed detail; make Rook state it first. Match → supports; miss → `broken`.
  - `refused` — decline both; `c6.rook-proof = untested`, ORACLE unavailable, ending routes to `own-hand`.
- **Corroborator: Celeste** (Marcus fallback). She confirms exactly one plausibly-known Singapore fact; she cannot exceed her firsthand social scope, and pushing her yields a refusal or a flagged guess, never a convenient reveal. Represent her knowledge through her NPC record.
- Set `c6.rook-proof` and `c6.verify-method` from the outcome.

Phase gate to ORACLE: only if `c6.rook-proof === 'supported'`, offer the ORACLE assessment
(`c6.oracle-seen = true`): it predicted high voluntary adoption and low long-term Sloane
control, and Sloane proceeded knowing it. Boundaries: no Sloane motive, no omniscience, no
prediction-as-causation. Sloane's motive stays unresolved (Chapter 7).

## Counterpower and endings (movement 6)

Derive `c6.end-position`:
- `oracle-truth` if `oracle-seen`
- `own-hand` if not, but the player holds current-operation leverage (a Glass House item, a correctable false statement `c3`/`c4` record, `c5.published` audience, or an enforceable accepted term)
- `both` if both; `none` only if the player has neither proof nor any retained leverage (still a valid, quieter ending — not a failure)

The `resolve` phase offers the six end actions (each records `c6.exit-action` + the sourced
consequence): enforce a term, challenge Sloane, break the arrangement (pay the §6 cost, take
the recovery route), protect someone (spend leverage to shield Maya/another), trade or
expose the proof, or decline to use it. `complete` writes the carry-forward for Chapter 7
and ends with agency, not capture.

**Optional intimacy:** none is required. If design later adds a changed-dynamic Julian beat
or the bounded Sebastian goodbye, gate each behind its own `*_READY` constant like the
Sebastian sex scope, with a non-intimate alternative always present. Do not build an
AdultSceneSpec for Chapter 6 in this pass.

## Division of labor

- **Design (EVE design overview):** delivers the Chapter 6 scene script(s) per movement (prose, choice labels/hints, exact flags), the Meridian leaf's specific dated detail, and Celeste's one corroborating fact. Writes them as `docs/story/scripts/CHAPTER_6_*.md` like the rev19 script.
- **Code (you):** the revision-20 scaffolding and freeze, all phase/guard/state-machine logic, the exit-arrangement derivation, wiring, and tests. No local writer is needed — the spine is non-explicit and design authors its prose.
- **Art:** deferred; a shot map comes after the prose is stable.

## Tests

- New-game rev20 reaches Chapter 6 from Chapter 5 complete; rev13–19 saves stop at Chapter 5 complete and still authenticate.
- Each `c6.exit-arrangement` is selected correctly from representative Chapter 5 states, including the self-funded "no trap" case and the refused-everything case.
- Proof: comparison and prediction each reach `supported` and `broken` from the right inputs; refusal reaches `untested`; the photograph side effect records a Sloane-visible entry; Celeste cannot be pushed past scope.
- ORACLE offered only when `supported`; never reveals motive.
- Every end action records `c6.exit-action` + a sourced consequence, and `own-hand` produces a strong ending with no Rook trust.
- Frozen-19 replay byte/authentication stable; full suite + build green on a quiet box.

## Sequencing

1. Phase 0 report → approve.
2. Scaffolding + freeze + entry transition + entry-state derivation (Phase 1), with an empty Chapter 6 that reaches `complete`. Commit checkpoint.
3. Design delivers movement scripts; you wire movements 1–4, then 5 (proof), then 6 (endings), each with tests.
4. Full read-through (browser) before the chapter is called done.

Report engine conflicts before building, as with rev19. No commits until a checkpoint is agreed.
