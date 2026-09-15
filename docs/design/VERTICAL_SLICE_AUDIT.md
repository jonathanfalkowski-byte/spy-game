# EVE — playable vertical-slice audit

Date: 2026-09-15. Audited source: `0f135f6ebfa6b6ea8d380c8098a196246bcfbf3d`. Save schema **5**, content **9**. This is a developer-facing audit with story spoilers, not player-facing narrative context. No gap-plan changes have been implemented.

## Assessment

**EVE already has a complete playable story from the apartment to the Glass House garage.** The work needed before a focused playtest is a small narrative and presentation pass, not another systems milestone. No missing main-route scene or progression blocker was found.

The strongest material is the contrast between ordinary relationships and institutional control: Maya's coffee and calls, Sloane's concrete leverage, Voss's limited medical authority, and strangers who remember the presented identity. The weakest areas are repeated explanatory framing, several transitions that describe an action before asking the player to perform it, and a final recap that describes the mission better than the person who survived it.

This is an editorial assessment, not evidence that an unfamiliar player will care, feel danger, or want to continue. Automated tests establish functioning branches. The author-informed walkthrough below establishes coherence on a played route. Neither establishes first-time comprehension or an acceptable reading duration.

## Evidence and validation

Primary specification: [EVE Vertical Slice GDD v0.2](../../reference/EVE_Vertical_Slice_GDD_v0.2.docx), read in full, including its tables. Subsequently approved milestone plans govern deliberate departures from the original specification. The prototype remains a preserved prose reference; it does not override the GDD or later approvals.

Other approved differences from the original GDD are the authored terminal presentation instead of a third-person camera treatment, separate production saves without prototype-save import, and the bounded cautious/clinic-stop endings. The GDD's playtest-instrumentation ambition has no telemetry implementation in this approved local build; use the existing manual walkthrough sheet for the present study. Production art and full voice are not completion requirements. The GDD's overall and section-level duration targets are not a measured runtime; later plans also expanded scene depth. Let a timed human run determine pacing rather than restoring an older target by cutting scenes.

Fresh validation before the handoff commit:

| Check | Result |
| --- | --- |
| Full state/route suite, including identity, context, consequence and adult-handoff contracts | **194 tests passed, 16 files** |
| Full browser suite | **55 tests passed** |
| TypeScript | Passed |
| Production build | Passed; existing large-chunk warning remains |
| Authenticated review saves | **All 13 replayed successfully** through the existing validation tests |
| Frozen content-8 manifest | **18 files unchanged** |
| Original GDD and prototype SHA-256 checks | Both unchanged |

Commands used: `npm.cmd test`, `npm.cmd run test:browser`, `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd run check:references`, and verification against `src/persistence/content-8-hashes.json`. Legacy authentication and migrations are also exercised by the state tests. This report does not claim that every historical version has a separate hash manifest.

The six approved handoff files were committed separately as `0f135f6ebfa6b6ea8d380c8098a196246bcfbf3d`, **feat: add offline adult scene presentation contracts**. Git was clean immediately after that commit. No push was performed. This audit and `FUTURE_TRAJECTORIES.md` are subsequent, uncommitted documentation changes.

### Running-build walkthrough

Audited the compiled production preview on `http://127.0.0.1:4174/`, using its own local save origin. The user's existing `4173` run was not changed.

Played one continuous route through every main story section: all apartment inspections; friend interpretation; morning acceptance; angry promotion response; questioning Benton; all four Helix documents; patent contradiction plus personnel research; bounded report; hurt response to Maya; evening acceptance and Voss disclosure; report/trace/open BLACKGLASS; explicit biometric authorization; warning Maya; challenging Sloane; both optional operation questions; acceptance; Lantern meeting and arranged check-in; all three warnings; answered morning call; corrected reception name; requested privacy and asked Voss's authority; calibration investigation and follow-up; stopping question; executive profile; full simulation and curiosity; explicit authorization; lower voice; beauty response; assisted steps; uncertain mirror response; Adrian name correction; explicit recovery disclosure; shadow outfit/minimal makeup; rehearsal limitations and Voss farewell; muted elevator channel; challenged Marcus and asked a follow-up; asked Celeste what she remembers; guest ledger then Celeste; supported Benton assessment; token theft; scrutiny-dependent extraction; risk challenge to Sloane; final warnings and garage ending.

Then restored review saves through the normal confirmation UI and read cautious withdrawal, refusal/departure, all three clinic-stop stages, wrong accusation, unsupported correct guess, timely audio, timely photography, late photography and failed theft endings. The main played route covered timely theft; the wrong-accusation save covered fragmentary audio. This inspected all six capture-quality presentations, not every possible route combination manually. Automated tests cover the combinations, rereads, obsolete actions, restart, storage failure and browser reopening.

Optional questions were appended chronologically. The second Glass House investigation did not repeat the first approach tutorial. The final journal distinguished claims, observations, assessments and custody. A few browser-control clicks after restoring saves required refreshed controls/keyboard activation; restoration completed, and this did not establish an application progression defect.

## Scene-by-scene matrix

**IMPLEMENTED** means the required scene and its playable decision/result exist; it does not mean pacing has passed a player study. **PARTIAL** identifies a concrete presentation/consequence gap within an existing scene. **DIFFERS FROM GDD** below is an approved scope change, not a request to restore superseded design. No requested story section is wholly **MISSING**.

Source abbreviations: **O** = `src/content/scenes.ts`, `dialogue.ts`, `evidence.ts` and `src/state/reducer.ts`; **D** = `src/content/day.ts` and `src/state/day-engine.ts`; **C** = `src/content/clinic.ts` and `src/state/clinic-engine.ts`; **G** = `src/content/mission.ts` and `src/state/mission-engine.ts`; **J** = `src/ui/journal-entries.ts`, `Journal.tsx`, `Missionwork.tsx`, `App.tsx`. These are evidence locations, not new architectural recommendations.

| Section | Status | Implementation evidence and remaining qualification |
| --- | --- | --- |
| Apartment | IMPLEMENTED | O: promotion morning, rain/tower, four optional inspections, three private bond interpretations, four morning responses and guarded departure. Gives Adrian a life before the trap. Inspection result is also repeated in the top status. |
| Axiom office | IMPLEMENTED | O: entrance screening, intelligence-floor arrival, full Daniel/Benton introductions, four promotion and three assignment responses, Daniel's exit and Benton's approach. Mostly local dialogue consequences. |
| Helix acquisition analysis | IMPLEMENTED | O: four sourced documents, two-record comparisons, all 24 pair/relationship combinations, one optional search, review and every report quality. Errors advance. Credibility is recorded but has no later authored reaction in this slice; see C/D below. |
| Maya conversation | IMPLEMENTED | O: promotion, invitation, gated disclosure and goodbye. Voss disclosure earns her promise to look; relationship interpretation remains private. No romance is required. |
| BLACKGLASS file | IMPLEMENTED | D: report/delete/trace/open each has its own result; opening and biometric authorization are separate. Names in the directory and Axiom labels are not verified biography. Cautious withdrawal is complete. |
| Security consequence | IMPLEMENTED | D: two officers, suspended badge, disconnected terminal, optional delivered warning, confiscation, elevator and Level 71 handover. Warning uses only information Adrian has. |
| Sloane confrontation | IMPLEMENTED | D: introduction, allegation, four opening responses, sourced Maya exposures, leverage exchange and optional questions. The audit proves an access event, not intent to commit espionage. |
| Accept route | IMPLEMENTED | D: explicit coercive acceptance, monitored phone return, temporary badge, exit controls and journey home. Acceptance does not authorize medical work. Reconsideration preserves termination and avoids returning the phone twice. |
| Refusal route | DIFFERS FROM GDD | D: physical departure, job/housing/security consequences, voluntary reconsideration or completed walk-away contact with Maya. The later approved plan deliberately replaces the GDD's fugitive/coerced-return continuation. Do not add a chase or force acceptance. |
| Evening / Maya callback | IMPLEMENTED | D: meet, call or avoid; invitation callbacks; three initial disclosures and three closing intentions; complete channel-specific partings. Monitoring and Maya's received knowledge remain distinct. |
| Rook warning | IMPLEMENTED | D: three player-advanced messages after the accepted evening. UI correctly says **Unknown sender**, not Rook. No warning on cautious/walk-away endings. |
| Sublevel 17 arrival | IMPLEMENTED | C: morning continuity, conditional check-in, transit, substantial entrance controls, returned phone, descent, reception hesitation and three name responses. |
| Voss privacy | IMPLEMENTED | C: full introduction, Sloane disagreement, four room-arrangement choices and private authority question. Sloane returns only after being asked to leave. Private exchange does not automatically reach her. |
| Clinic investigation | IMPLEMENTED | C: one optional source among terminal/equipment/historical scans, immediate finding and free earned follow-up. Calibration predates breach without solving the conspiracy. Consultation return is narrated before its continuation button; wording cleanup needed. |
| Simulation | PARTIAL | C: profile review, predictive rendering, five attention choices, separate outward response and explicit authorization. `display.curiosity` asks how close the result will be to the model, but the next scene does not directly answer. Full-body attention also summarizes an unspoken practical question rather than playing it. |
| Voice | IMPLEMENTED | C: waking sensory beat, lower/established register, free sample, pause, explicit resume or confirmed stop. Distinct local response; the selected register is not later used to change mission access or dialogue. No audio exists, as approved. |
| Face | IMPLEMENTED | C: checkpoint, four spoken reactions and replies, reversible-limit question, pause and stopping route. Beauty does not mean acceptance of identity or later treatment. |
| Body / presentation | IMPLEMENTED | C: early hand/throat changes, changed balance, garment fit, supervised standing choices, recovery walking and rehearsal. Description is selective rather than a full anatomical reveal. The body-inspection option is comparatively thin; see B. |
| Mirror | IMPLEMENTED | C: six private interpretations plus skipping, followed by Voss calling Adrian and Sloane using the persona name. Optional and not a route lock. A fuller reflected image before choosing an interpretation would make this less abstract. |
| Wardrobe | IMPLEMENTED | C/G: three outfit approaches, four makeup options, fitting/revision, commitment and rehearsal. Outfit affects admission, investigation scrutiny and extraction. Makeup/profile largely provide local authorship, not later social powers. |
| Glass House arrival | IMPLEMENTED | G: car, optional prior-message/brief review, driver farewell, reception verification, elevator and room introduction. The muted-channel restoration line refers to leaving the lift after the preceding scene has already cleared it. |
| Marcus | IMPLEMENTED | G: appearance, role, approach, Singapore recognition, four responses and optional follow-up. Challenge sharpens attention; it does not reveal Adrian. |
| Celeste | IMPLEMENTED | G: physical introduction, financial relationship, familiarity, four intentions, response, Marcus's departure and later availability. Recollections remain claims. Initial Halcyon mention does not grant the full lead. |
| Investigation opportunities | IMPLEMENTED | G: room geography, two distinct opportunities, all four developed leads, six pairs in either order, early assessment and free rereads. Every outfit retains every lead. Second approach repetition is fixed. |
| Source assessment | IMPLEMENTED | G: four options, review/revision, explicit submission, supported/contextual/unsupported/unresolved reasoning separate from timely/late positioning. Correct guessing does not become sound reasoning. |
| Proof selection | IMPLEMENTED | G: audio to Sloane, monitored-phone photo or separate token; limits and ownership stated before selection. Token is an asset, not authenticated espionage proof. |
| Extraction | IMPLEMENTED | G: timely/late transfer sequence, six capture outcomes, wrist release where applicable, three outfit methods and extra guard exchange with scrutiny. No failure screen. Successful theft's easy wrist release merits a tension/credibility playtest check. |
| Sloane debrief | IMPLEMENTED | G: probable source versus proof, capture-specific limitations, four replies, independent-judgment objective. Her claim of recoverability stays attributed. Same broad release across outcomes limits how different success and error feel emotionally. |
| Rook final callback | IMPLEMENTED | G: “BENTON WAS NOT THE REAL TEST” / “YOU WERE” / “SLOANE COULD HAVE STOPPED THE EXCHANGE”, player-controlled after debrief. Meets the specified hook; the immediately preceding debrief already explains much of it, reducing surprise. Sender remains unidentified. |
| Ending / dossier update | PARTIAL | G/J: completed garage/car arrival, reasoning, evidence, ownership, exposure and unresolved mystery; review/history/backup/restart work. Final summary omits a compact cross-slice account of Maya contact, chosen presentation and outstanding employment/access conditions; those remain scattered in earlier records/history. Some journal titles fall back to long source text. |

## Findings A–J

### A. Missing gameplay

No absent main-route gameplay loop was found. The existing sequence includes evidence interpretation, scarce investigations, guarded commitments, stopping routes, mistakes with partial results and all planned endpoints.

The original GDD's broader presentation pillar mentions voice as a contributor to access/scrutiny. In this bounded build, outfit is the operational loadout; voice/profile/makeup mostly produce immediate authorship and records. That is a limited implementation of the broader ambition, not a reason to add a social-simulation system now. The subsequently approved clinic plan explicitly avoids granting competence from cosmetics.

### B. Missing or underdeveloped narrative beats

1. **Simulation accuracy answer:** the player asks a concrete question through `display.curiosity`; Voss moves to authorization. Answer it in the existing exchange using already-established uncertainty, without a new guarantee or revelation.
2. **Full-simulation attention:** “Voss answers a practical question about movement” leaves the actual question and answer absent. This is one of the few places where the authored choice promises more interaction than it delivers. Develop that existing beat with familiar/unfamiliar movement, not new procedure mechanics.
3. **Mirror image before interpretation:** the room and seam are described; the player then selects a feeling. Add a brief neutral whole-person observation before the existing interpretations, preserving the skip path and avoiding an imposed reaction.
4. **Small chronology repairs:** examination text has already returned to consultation before “Return to the consultation area”; entrance screening has already returned the phone/selected the lift before “Take the phone and descend”; muted-channel text restores the earpiece “before leaving the elevator” after entry text already stepped clear. These are duplicated or misplaced transitions, not missing locations.
5. **Development checkpoint language:** “save this run for the next milestone” and “this milestone ends in transit” remain in the continuous finished slice. Keep explicit continuation and legacy checkpoints, but present them as pauses rather than unavailable future content.

### C. Missing consequence callbacks

Existing strong callbacks already exceed the minimum of two: Maya's invitation follows the morning reply; a disclosed Voss lead becomes her sourced lookup and Sloane's threat; a kept/missed check-in changes later contact; recovery disclosure changes the car's message review; outfit changes staff attention, leads and extraction; assessment changes capture quality.

Weaker carry-through:

- The Helix report's credibility consequence is visible in its review/result and stored as Benton's belief, but does not later change a spoken response. Do not fix this by giving Sloane an unseen report or making Benton recognize Adrian at the party.
- Privacy changes the room and available question, but accumulated `vossTrust` does not shape her later farewell. That counter is not a demonstrated relationship arc.
- Profile, voice and makeup are recorded, yet the garage recap does little to remind the player of their voluntary choices. A compact player-facing recap can provide continuity without inventing NPC knowledge or relationship effects.
- The unknown warning repeats the personal-test implication of the debrief. The missing effect is emotional emphasis, not another secret. Test whether the existing final claim lands before adding or rearranging any reveal.

### D. Choices that do not currently matter later

These are not all defects. An expressive choice can earn its value through its immediate reply; not every private thought should alter a later outcome.

| Choice/state | Current reach | Completion recommendation |
| --- | --- | --- |
| Daniel promotion and Benton assignment tone | Distinct immediate replies and sourced records; no later route branch | Keep as characterization. Do not promise a campaign payoff. |
| Helix credibility | Submission feedback, stored counter and Benton belief; no later conditional scene | Clarify in retrospective review if needed; do not add an information leak to manufacture a callback. |
| `mayaTrust`, `vossTrust`, clinic `investment` totals | Stored changes/read-only architecture; no threshold-driven later story | Do not present these as working long-term psychology. Retain authored event callbacks instead. |
| Operational profile | Different preview, confirmation and preparation record | Consider one later descriptive callback, without competence or identity inference. |
| Voice register | Different local spoken sample and adjustment; later dialogue not conditioned on register | A brief existing-scene vocal callback is enough if players forget their choice. No live audio or voice system needed. |
| Makeup | Fitting choice, record and clinic summary; mission varies by outfit | Keep cosmetic authorship honest. Do not advertise access benefits it does not supply. |
| Mirror interpretation | Private reaction and read-only player view; no mission branch | Correctly private. Never translate it into Sloane knowledge or permanent identity acceptance. |
| Some rehearsal/farewell/elevator preparation options | Immediate acknowledgement/history; same next scene | Valid small expressive beats. Trim repetitive hints rather than multiplying branches. |

Evidence: current uses in `reducer.ts`, `clinic-engine.ts`, `mission-engine.ts`, `clinicBlocks`, `missionBlocks`, `MissionSummary`, and `state/player.ts`. The new consequence slice reads existing events; it has not secretly added route effects.

### E. Premature information

No confirmed player-facing mystery leak was found in the played route, inspected endpoints or tested disclosure boundaries. In particular:

- Sloane's Maya threat has a delivered warning/access-log source; private feelings do not expose Maya.
- Personnel research gates Voss recognition. The patent disclosure requires its inference.
- Calibration proves earlier preparation, not who planted BLACKGLASS or who the sender is.
- Marcus/Celeste recognition is attributed familiarity with the persona, not proof that they know Adrian is presenting it.
- Source review does not tell the player Benton is correct before commitment.
- A photo is not private from Axiom; token possession is not proof; Sloane owns the clean audio.
- Rook's author-side identity, ORACLE predictions and Sloane's larger motives do not appear in normal play.

Do not interpret omniscient design-document facts as permission to add them to the journal. Remaining disclosure combinations are supported by tests/source review, not a claim that every branch was manually played in this audit.

### F. Prose and current canon

The primary visible mismatch is **Evelyn** throughout legacy runtime prose versus approved new display metadata **Evelynn Vale**. It is a spelling/presentation mismatch, not evidence for two different current playable characters. A future scoped display edit must preserve internal `evelyn`, historical engines and save authentication.

No contradiction was found in the five-year patent restriction agreed six months earlier, the twenty-three-day calibration, next-day appointment, phone/badge custody, or prior operative mystery. Sloane saying “You are” and a stranger saying “She isn't you” are deliberately opposing claims, not conflicting authoritative narration. Body change is not treated as gender acceptance.

The Art Bible is production direction, not runtime truth. Its gala reference should not silently replace the different clinical identity-package photograph or verify a historical Singapore memory.

### G. Adrian / Evelynn identity handling

The architecture correctly separates the stable `player-character`, persona IDs `adrian`/`evelyn`, NPC observations, attributed historical records, and the player's private mirror/name choices. `playerView` does not infer an accepted identity from a body, profile, outfit or voice. Persona recognition by Marcus or Celeste does not resolve a canonical bearer association for that NPC.

The main readability gap is naming, not the binding architecture: legacy scene titles, claims and custody strings use Evelyn while new metadata uses Evelynn. `ADRIAN · PRIVATE THOUGHT` continues during the operation; that can clearly identify the continuing viewpoint, and should not be globally replaced as though presentation settled self-understanding. A spoken “Adrian, for now” must remain a chosen boundary.

The identity package's stated age 31 is an attributed persona claim; Adrian's established age is 34. This distinction should remain. No rewrite should turn eight years of displayed records into verified lived biography.

### H. Useful applications of the existing consequence architecture

Use it, if approved, only to make existing outcomes easier to find: a sourced reminder that Maya received a disclosure, that a check-in was kept/missed, or that Sloane exhibited a specific leverage record. Keep such a recap player-facing and bounded by earned information. No score display, new psychology, generic campaign engine or additional effect rules are required to complete the slice.

Mission reasoning, timing and ownership already have clear dedicated records and summaries. Do not route them through a new abstraction just for consistency. Do not infer suspicion, attraction, consent or identity acceptance from a descriptive callback.

### I. Art / visual placeholders for playtesting

**No new artwork is required for a narrative/mechanics pilot.** The terminal layout, choice controls and journal support the complete run. Tests cover keyboard, focus, narrow layouts and large text. Human readability still needs a first-time reader.

If visual comprehension is part of the next test, label that as a separate question. The first useful aids would be a stable reference of the presented persona, a simple reception/gallery orientation aid, and clearly differentiated evidence artifacts. These are optional presentation aids, not required new systems or permission to generate assets. Use only approved art at a contextually appropriate location. The existing approved gala reference is in `art/reference/evelynn/`; it is not yet an in-game portrait pipeline.

No runtime voice samples or transformation illustrations exist. The current voice and mirror scenes must therefore succeed through prose. Do not advertise a fully illustrated or voiced build to testers.

### J. Complete-playthrough blockers

No known progression, save-replay, double-spend, authorization or mandatory-choice dead end blocked this audit. All planned bounded endings work; choosing one is a completed route, not a failure to reach the main ending. A player who declines treatment will intentionally not see Glass House.

Remaining validation blockers are **evidence**, not absent code: owner pacing acceptance and an unfamiliar player's uninterrupted run. There is no defensible playtime figure from this tool-assisted audit. It included source inspection and save restoration, so its elapsed time is not a reading-time measurement. The production chunk warning is a technical limitation to monitor on the intended test machine, not a demonstrated playthrough blocker here.

## Minimum completion plan — recommendation only

Do not implement these changes until the user approves the gap plan.

1. **Repair the few incomplete exchanges and transitions.** Answer the simulation-accuracy question; replace the summarized body-attention interaction with a short concrete exchange; align the three action/arrival lines identified above. Preserve existing choices, authorization gates, medical limits and mystery. Done when the scene reads correctly without supplying missing speech or repeating movement.
2. **Make the finished route read continuously.** Keep explicit checkpoint continuations and exact resume; replace obsolete future-milestone copy. Remove duplicated status prose and repeated generic hints where the new exchange already supplies the result. Give journal entries concise authored titles instead of source-string headings. Keep source/limit detail available. Do not cut developed scenes toward an arbitrary runtime.
3. **Make the ending remember the person.** Add a small earned recap of the chosen presentation, most recent Maya contact and outstanding access/employment conditions using existing records. Keep mission proof/ownership/uncertainty intact. Avoid implying Sloane heard private conversations or that the operation restored employment. Normalize current display spelling to Evelynn in a controlled display/prose pass, preserving all stable IDs and frozen references. Apply the existing content-authentication/version process if authored stored content changes; no new save-state schema is warranted for this plan.
4. **Validate the affected build and play it before adding anything else.** Re-run state/routes, browser, TypeScript/build, review saves and reference/frozen checks. Have an unfamiliar reader play one route without coaching and record duration/breaks and scene-specific confusion. If a deliberate stop ends the run, first ask whether that ending felt clear and chosen; inspect the accepted route afterward rather than overriding the player's decision. Use alternate saves only after the uninterrupted route.
5. **Change only what the playtest demonstrates.** Specifically assess the theft escape, success-versus-error emotional difference, optional mirror description and final warning's impact. A short callback or staging adjustment may be enough. No new routes, art pipeline or relationship system should be a prerequisite. Optional art and additional polish follow comprehension findings.

Steps 1–3 are a bounded finishing pass; the current build is already usable for an exploratory pilot if the user prefers to test before polishing. The minimum plan does not include Chapter 3 or expansion of any future trajectory.

## Questions for the actual player

Ask these after play, without supplying the desired answer first. Record their own words before explaining the design.

| Target | Current assessment | Evidence still needed |
| --- | --- | --- |
| Care about Adrian/Evelynn | Strong material: ordinary work hurt, Maya, familiar belongings and changed routines | What did the player want to protect, and when did that begin? |
| Sloane feels dangerous | Concrete housing/job/security and information leverage; strongest threat scene | Can the player explain what she controls? Did later predictable release weaken that danger? |
| Transformation offers agency under pressure | Explicit stage authorization and real stop endings; private reaction separated | Did the player understand when they could stop and what would remain changed? |
| Investigation feels like gameplay | Pair interpretation, scarce leads, assessment and capture limits work | Did they form a hypothesis or merely follow highlighted wording? |
| Voluntary decisions change Evelynn's experience | Outfit has observable operational differences; other choices are mostly local | Which self-authored choice did they remember? Was its effect enough? |
| Marcus/Celeste create uncertainty | Prior familiarity is vivid and carefully attributed | What does the player believe happened in Singapore, and how certain are they? |
| Glass House matters | Task and actionable-proof need are explicit before departure and capture | Can they state what Sloane wanted and what their evidence actually proves? |
| Errors create interesting consequences | Late captures, failed theft and debrief vary; every route extracts | Does an error feel like a different predicament or only a worse summary? |
| Want to continue after the final warning | Unresolved prior identity is a viable hook; warning overlaps debrief | What question would make them continue? Do not presume it is the one the author intended. |

Stop at this audit and recommendation. No completion edits, future-route implementation or further architecture work are authorized by this document.
