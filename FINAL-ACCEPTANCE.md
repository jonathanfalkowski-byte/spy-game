# EVE — final review acceptance map

Authority: preserved GDD v0.2 for story truth; the subsequently approved opening, day-zero, Sublevel 17, Glass House, and final-review plans for implementation scope. The approved authored terminal presentation supersedes the original visual-production ambitions. The extraction/debrief endpoint remains fixed. No Chapter 3, later procedure, sender identity, or Evelyn resolution is added.

## Requirement evidence

| Area | Implementation evidence | Verification / remaining task |
| --- | --- | --- |
| Apartment and Axiom | `content/scenes.ts`, `dialogue.ts`: inspections, private bond, morning response, entrance controls, Daniel, Benton, brief | `routes/opening.test.ts`: office combinations, all Maya choices and exits |
| Helix tutorial | `content/evidence.ts`, `state/reducer.ts`, `ui/Casework.tsx`: 24 relationships, one investigation, review/submission | `state/engine.test.ts`: support, weak, incorrect, unresolved work all progress |
| Complete Maya office exchange | `scenes.ts`, `dialogue.ts`: coffee, invitation callbacks, gated disclosures, departure | Opening route and browser suites; no forbidden-file auto-advance |
| Anomaly and access | `content/day.ts`, `state/day-engine.ts`: report/delete/trace, directory, explicit biometric action, cautious exit | `state/day.test.ts`: ordered subsets, reopening, guards |
| Security and Sloane | Physical escort, device custody, sourced threats, coercive offer | Day state/browser suites: exposure/no exposure, refusal/reconsideration |
| Evening and warning | Meet/call/avoid, invitation callbacks, explicit disclosures, goodbye, unidentified messages | Day/prose tests: channel-specific knowledge and all evening combinations |
| Ten clinic scenes | `content/clinic.ts`, `state/clinic-engine.ts`: privacy, examination, explicit Stage One authorization, checkpoints, recovery, presentation | `state/clinic.test.ts`: all choices/phases, privacy/exam combinations, 80 profile-attention-display combinations, stop stages, presentation variants |
| Ten Glass House scenes | `content/mission.ts`, `state/mission-engine.ts`: complete introductions, two leads, assessment, capture, extraction/debrief | Mission tests: all lead pairs in both orders, source/method/outfit combinations, every phase and choice |
| Prose continuity | Content 9 fixes car chronology and repeated departure; neutral token intent before contact identification; removes unintroduced glass; softer missed-call passage | Mission prose / final-review regressions; owner comprehension and pacing pending |
| Chronological questions | Day engine now appends a selected exchange once. Existing clinic/mission chronological rendering extended through day zero | `state/final-review.test.ts`, `browser/final-review.spec.ts`: both question orders, reload, newest-exchange focus |
| Rereading | Documents use native details; mission reread guards preserve findings and opportunities | Engine/mission tests; no added rewards or new observations |
| Journal | `ui/journal-entries.ts`, `Journal.tsx`: earned records, current milestone, All milestones, type filters, sources and capture ownership | Final-review tests; no secret lead or NPC-score rendering |
| Callbacks | Matrix below; lead-specific presentation reactions make scrutiny visible without numeric scores | Existing branch tests plus whole-route UI traversal; owner perception pending |
| Endings | Actual location and stage in narrative; summaries retain report/capture limits; journal/history/backup and confirmed restart available | Browser suites for every ending category; 13 replay-validated review saves |
| Reading and focus | Separate bounded reading preference; guarded storage access; native dialog trap/Escape/opener focus; reduced motion retained | Browser narrow/large text/keyboard tests; final-review preference failure and modal return checks |
| Restore | `RestoreBackup.tsx`: size check before reading, strict decode/replay, preview, backup, explicit confirmation, write-before-state replacement | Browser invalid/unsupported/oversize/conflict/write failure cases; current run unchanged on rejection |
| Historical saves | Frozen `legacy-v1`–`legacy-v8`, content8 hash manifest; schema5/content9 decoder | Original-engine replay before migration, unchanged ledgers, exact resume; loading never writes |
| Review package | Source, lockfile, build, references, tests/scripts, review saves and Windows README | Package inventory/hash and clean-copy build; no dependencies or test caches included |
| Personal acceptance | `FINAL-WALKTHROUGH.md` | **Pending your uninterrupted run, notes, and acceptance** |

Paths in the implementation column are relative to `src/`; test paths are relative to `tests/`.

## Callback matrix

| Earlier choice | Later visible response | Information boundary |
| --- | --- | --- |
| Morning yes/work/day/ignore | Maya explicitly recalls the answer when renewing the office invitation | She received a reply or noticed its absence; she cannot read the private bond |
| Invitation yes/maybe/no | Evening message retains the promise/open question/decline; meeting after decline acknowledges a changed mind | No automatic acceptance |
| Voss disclosure | Maya promises a lookup; the later timestamped access log can expose her to Sloane | Private relationship interpretation alone creates no exposure |
| Security warning | Maya acknowledges the actual warning; Sloane sees the incident log | No early Level 71 or Sloane name in the warning |
| Check-in arranged and answered/missed | Only arranged calls ring at 06:30; recovery update acknowledges a missed promise | No assumed rescue or fresh arrangement |
| Recovery identity/brief/quiet | Maya answers the actual message; car review recalls earlier messages | Monitored phone remains monitored; no imagined reply to silence |
| Clinic privacy | Sloane leaves or stays, Voss’s private-authority question is gated, protocol arrival changes | Private questions do not enter Sloane’s knowledge |
| Profile and voice | Profile review, simulation and voice sample reflect confirmed choices | Customization does not imply consent to later stages or permanent identity preference |
| Presentation | Distinct admission, each lead’s visible reaction, tailored rehearsal and extraction | Every outfit retains access to every lead; no automatic competence or new clue |
| Source assessment | Operational positioning changes; debrief distinguishes supporting evidence from a lucky name | A name is not called correct before the exchange is observed |
| Capture method/timing | Six outcomes distinguish agreement, fragment, transfer, contact, token, or nothing | Wafer and token remain separate; ownership and limits remain explicit |

## Scope and remaining issues

Implementation and automated verification can establish route, storage, and UI contracts. They cannot establish your pacing acceptance. The only planned human gate is your personal walkthrough and any fixes resulting from it. Outside-player validation remains a later, separate task. Build/test status and measured timings belong in `FINAL-REVIEW-RESULTS.md`.
