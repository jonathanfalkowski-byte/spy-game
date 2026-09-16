# EVE — A narrow assignment

A standalone, authored narrative from Adrian’s apartment through day zero, Sublevel 17, and the complete Glass House operation. GDD v0.2 governs continuity; the original prototype is preserved as reference. Each milestone has an explicit continuation: **Continue Adrian’s day**, **Begin the next morning**, and **Continue to the Glass House**. Loading an old save never starts the next milestone automatically.

Cautious withdrawal, refusal/departure, and clinic-stop routes remain complete endings. Completed clinic departures can continue through the party, investigation, capture attempt, extraction, remote debrief, and unknown warning. The vertical slice ends in the service garage, without Chapter 3 or a resolution of Evelyn’s earlier history. Reconsidering an earlier refusal does not undo employment termination.

## Final personal-review build

Save schema **5**, content **9**. Start with **FINAL-WALKTHROUGH.md**. **FINAL-ACCEPTANCE.md** maps the approved scope to implementation and checks; **FINAL-REVIEW-RESULTS.md** records the delivery results. Your uninterrupted walkthrough and acceptance remain pending; automated traversal is not a substitute for reading the story.

The journal opens on the current milestone, with **All milestones** and information-type filters. Optional questions append chronologically in Sloane’s day-zero briefing as well as the clinic and Glass House. Reading size persists separately from narrative decisions.

**Restore save backup** validates a local JSON file before showing its milestone and location. Nothing changes until you confirm replacement. Download your current run first. Invalid, unsupported, oversized, conflicting, or unwritable imports leave the current run untouched. After your first walkthrough, the **review-saves** folder supplies 13 labelled, replay-validated alternative endings.

Content 9 preserves the frozen content-8 engine, fixes car chronology and premature token-target wording, and adds short presentation reactions without repeating the investigation instructions. It adds no story branch or revelation.

## The Glass House

Ten scene groups contain 26 authored phases: journey and arrival; admission; Marcus’s greeting; Celeste’s reunion; room geography; four investigation leads; source assessment; capture choice; exchange and extraction; debrief and garage ending. Questions append after earlier dialogue and focus the newest exchange. Private attention does not become an identity preference or NPC knowledge.

You can investigate zero, one, or two distinct leads. A review states the opportunity cost before commitment; results appear immediately, and rereading is free. Every presentation can follow every lead. Naming Benton puts Evelyn in position even when the reasoning was weak; the saved reasoning is not upgraded by that outcome. Wrong or withheld names miss the clean window without ending progression.

Timely audio captures the agreement on Sloane’s recorder, with no independent clean copy for Evelyn. A timely photograph retains both participants and the transfer on the monitored phone, without proving the wafer’s contents. A stolen access token remains a useful asset and incomplete proof of espionage. Late audio is fragmentary, late photography shows contact, and late theft obtains nothing. The wafer always passes from Marcus to Benton; the token is a separate object. A grabbed wrist is resolved before extraction.

Sloane’s debrief and the unknown messages remain attributed statements. All three appearances reach the elevator through distinct authored departures. The earned ending summary identifies the assessment, capture limitations, custody, exposure, and unanswered questions.

## Sublevel 17

The ten scenes contain multiple player-controlled phases. Optional reflection and questions are free. The baseline examination offers one optional inspection; each source produces a distinct finding and follow-up. Profile and fitting previews can be revised without repeated rewards. Internal attention and mirror thoughts are separate from observable dialogue and sourced NPC beliefs.

Stage One requires explicit authorization. Voice and face checkpoints support pause, explicit resumption, or confirmed termination of further treatment. Stopping does not restore the starting body: the ending records whether treatment never began, reached voice adaptation, or reached facial adaptation. Voss completes a recovery handover; Sloane initiates the threatened administrative consequences. Existing housing notice dates are not restarted. Forced physical change is not a voluntary identity preference.

Maya’s 06:30 call occurs only if arranged. Answering, missing it, sending a departure message, recovery disclosure, and continued distance have distinct consequences. Messages on the monitored phone create exposure records; they do not automatically become Sloane’s personal knowledge. Private conversations with Voss do not leak to her.

## Run locally

Tested with Node.js 24.14.0 and npm 11.9 on Windows. From this directory:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Vite. Development includes a collapsed inspector. To play the production build without that inspector:

```powershell
npm.cmd run build
npm.cmd run preview -- --port 4173 --strictPort
```

## Verification

Glass House validation covers every mission choice and phase, all six lead pairs in both orders, all source/capture/presentation combinations, early assessment, repeat-click guards, custody, information boundaries, and authenticated legacy migration. The prose follow-up adds checks for repeated investigation advice, returned-room descriptions, conditional debriefs, accurate late-capture wording, and content-v7 saves. Latest results are recorded in `FINAL-REVIEW-RESULTS.md`; coverage totals also include frozen legacy engines.

The day-zero extension adds coverage for all 16 ordered subsets of anomaly checks, 192 Security/Sloane/attention combinations, 342 evening combinations, every authored day choice, all new phase save round-trips, and both earlier production save versions. Browser flows cover cautious withdrawal, refusal with/without reconsideration, accepted meet/call/avoid, Maya exposure gates, checkpoint migration, storage failure, restart confirmation, narrow layouts and a real browser process reopening the evening save. Unit coverage measures state/content/persistence code; browser interaction coverage is reported separately, not as React line coverage.

```powershell
npm.cmd run check:references
node scripts/check-content8.mjs
npm.cmd run typecheck
npm.cmd test
npm.cmd run test:coverage -- --maxWorkers=1 --testTimeout=30000
npx.cmd playwright install chromium
npm.cmd run test:browser -- --workers=1
npm.cmd run build
```

Playwright builds and starts its own production preview on port 4173. Keep that port free. Its suite covers report quality outcomes, the three investigation actions, earned disclosures, keyboard focus, responsive layouts, invalid saves, storage failures, conflicting tabs, and an actual browser process close/reopen. Browser screenshots and failure traces are written to `test-results/`. Coverage reports are written to `coverage/`.

The state and route suites cover all 24 evidence relationships, all 12 Daniel/Benton combinations, 576 Maya choice combinations, phase save round-trips, deterministic replay, guards, NPC information boundaries, and reachable-route/dead-end checks. These tests validate implemented contracts; an unfamiliar player’s walkthrough is still required to assess narrative comprehension and emotional pacing. Chromium is the automated browser target; Firefox, Safari, and assistive-technology testing remain future work.

## Structure

- `src/content`: Zod-validated scenes, dialogue, characters, inspections, evidence, and authored feedback.
- `src/state`: strict state/action schemas, deterministic reducer, ordered event ledger, eligibility rules, and replay.
- `src/persistence`: versioned saves, explicit migration, replay validation, and storage-conflict handling.
- `src/ui`: read-only narrative presentation, choices, casework, journal/history, focus management, and recovery.
- `tests/state`, `tests/routes`, `tests/browser`: contract, graph/branch, and real-browser verification.
- `reference`: unchanged original source files. No prototype code is imported by the production app.

## Narrative and information contracts

Facts, attributed claims, inferences, actionable proof, protagonist knowledge, NPC knowledge/beliefs, relationships, choices, opportunities, and scene/phase are separate fields. NPC information and belief updates carry an explicit source; private thoughts do not disclose anything. The Helix report goes to Benton alone. Sloane receives only information through authored audit, incident-log, and direct-conversation paths. A Voss-directory log can expose Maya; her private bond with Adrian cannot.

New day-zero records distinguish Axiom claims from observations. Monitoring records are separate from Sloane’s personal knowledge: a phone call may be recorded without magically telling her every line immediately. In-person evening disclosures do not create assumed eavesdropping. Refusal does not count as acceptance; imposed identity changes do not count as voluntary preference. The sender of the night warning remains unidentified.

Players may submit supported, weak, incorrect, or unresolved work and continue. Feedback distinguishes a problem with Benton’s explanation from proof of Helix’s actual motive. Supporting links are accepted on their own merits. Hints and retries are free, and one optional investigation is available independently of assessment. The authenticated filing establishes a five-year restriction agreed six months earlier; follow-up text uses that same duration.

The initial bond describes Adrian’s present feelings, not a permanent romance route. Maya’s invitation acknowledges the morning response. Secret disclosures remain absent until earned. The ending and journal summarize only earned information. Hidden relationship/credibility values are not shown in the production interface.

## Saves and recovery

New runs use schema version **5**, content version **12**, and an explicit `contentRevision: 12` state marker. Existing saves retain their historical behavior through the frozen content-11 engine in `src/persistence/legacy-v11`; its dependency hashes are checked against reviewed commit `41d4030`. Earlier envelopes first authenticate against their original frozen engines, then use the unchanged legacy migration path. Content 10/11 snapshots and ledgers are not rewritten into content 12. The envelope and snapshot revision must agree; loading never writes or advances a save. To experience the continuity corrections, start a new run while retaining a downloaded old-save backup.

The Glass House prose pass shows outfit advice only before the first investigation. Results begin with the investigation itself, and returning after one or two leads gets a short contextual transition. The debrief accounts for the other lift passengers leaving, invokes the earlier insider question only if asked, and gives a natural response for each capture result. Token hand placement, the returning driver, and the unknown sender’s assertion now have consistent descriptions.

The focused prose revision gives the voice, first steps, mirror, dressing, and departure more physical detail and less explanatory inner monologue. Voss speaks more naturally outside formal medical decisions. Wardrobe descriptions respond to the selected outfit. The chronological question-and-answer display is preserved, with replies appended below earlier conversation. No gameplay effects or routes changed.

The prose pass gives the file, Sloane’s proposal, refusal, and Maya’s evening more physical and emotional follow-through. It removes pre-open candidate-record spoilers, gives Security’s permitted warning message an explicit context, preserves the earlier invitation beneath Maya’s security concerns, and bridges the quieter time before parting. It adds no route, procedure, or mystery revelation.

Every committed action attempts an autosave to `eve.production.opening`. Saves include schema version, phase, full state, and ledger. Loading validates structure and replays the ledger to verify the snapshot. Internal event-only schema-v1 saves are also validated and migrated to the current defaults. This is not a prototype-save importer.

Storage is local to the browser profile **and origin**. Development port 5173 and preview port 4173 therefore have separate saves. There is no server account, cross-device sync, or prototype-save import. Clearing browser data can remove saves. The download control provides a JSON backup. Restore save backup imports it through the same version validation and replay pipeline, with a preview and explicit replacement confirmation.

Invalid saves stay untouched until an explicitly confirmed restart or validated backup restoration; the recovery screen can download their original data. Storage failures display “Not saved,” keep the current run in memory, and provide retry/download actions. Concurrent tabs cannot silently overwrite newer stored decisions. Saves are bounded to 2 MB. Restart requires confirmation and offers a backup first. Reading size persists under the separate `eve.production.reading-size` key and does not change narrative saves. Preference-storage failure leaves the selected size active for the session without interrupting play.

## Reference integrity

Both files were read before porting. `check:references` checks their SHA-256 hashes:

| File                               | SHA-256                                                            |
| ---------------------------------- | ------------------------------------------------------------------ |
| `EVE_M0_Helix_Prototype.html`      | `a7b377fbc69d5bd64114767ce4d364378fb25ce2fa48e228e9b1a5417b7f9888` |
| `EVE_Vertical_Slice_GDD_v0.2.docx` | `0cf138658912a0822fce23f490c7059b972e48688f6f25d8fb72836e24b91099` |

No runtime LLM, runtime-generated dialogue, commissioned art, voice acting, deployment, combat, or later irreversible procedure is included. The clinic’s medical technology is authored speculative fiction. Chapter 3, the independent route’s reconnection, and the larger mystery remain for later planning. This delivery directory is outside a Git repository; no commit or push is included.

The clinic adds state tests for all 80 profile/attention/display combinations, 16 privacy/inspection combinations, all 12 presentations, every authored choice and reachable phase, all three stop stages, private-information boundaries, free sampling/revisions, and authenticated content-v4 migration. Browser tests cover a complete clinic traversal with reload at every phase, each stop endpoint, immediate answers, pauses, fitting, keyboard/mobile layouts, prior saves, storage failure, confirmed restart, and browser-process reopening while paused. On this Windows host, use `npm.cmd run test:browser -- --workers=1` for predictable browser resource use.

The 30–40 minute clinic pacing target is not yet validated by an unfamiliar player. Automated tests establish functionality, not whether the emotional pacing or coercion is understood. Recovery and the afternoon bridge are authored; there is no simulation clock or reading timer. Historical save engines increase the production bundle size; they are retained to authenticate earlier decisions rather than trusting an old snapshot.

## Reproduce the review artifacts

Use the included lockfile: `npm.cmd ci` gives a clean dependency installation. The package also supports the familiar `npm.cmd install` workflow above. Do not open dist/index.html directly; use the local preview server.

With dependencies installed, `node scripts/prepare-review.mjs` regenerates the alternate saves and validates each one. With the production preview running on 4173, `node scripts/measure-review.mjs` measures seven isolated-browser samples per timing metric and performs one automated apartment-to-garage route. It never opens or replaces your real browser profile. Stop other test runs first for comparable measurements. Results are local JSON; no telemetry is sent.

Historical delivery documents describe earlier milestones. The final results document supersedes their test counts. This workspace is not a Git repository: no commit, push, or deployment is claimed.
