# EVE scene and editorial audit

2026-09-22. Baseline: story/chapter-3-design at ba027c6597c22f006a24d2767a1d2d300c325f09, with existing dirty work preserved.

## Review coverage

The static inventory accounts for all 175 authored scene definitions across 33 dramatic sequences. Empty static blocks are intentional where the runtime supplies a choice response or state-dependent passage. This is a source-level editorial audit, not a claim that every branch has been played. The three pilots were reviewed with their relevant choice/response alternatives before the expanded package was released. Full runtime route verification is recorded separately by EVE Code.

The accepted scope changes expression, not events, relationships, evidence, eligibility, resources or outcomes. Strong existing scenes are retained. Historical prose and authenticated state require preservation before integration.

## Findings

| ID | Classification | Finding and disposition |
|---|---|---|
| E1 | Confirmed presentation issue | Development milestones interrupt fiction in opening/day/clinic/mission/Chapter 3. Replace in new revision; actual terminal-route controls must remain honest. |
| E2 | Editorial recommendation | Dense introductions in the opening repeat dossier information. Shorten introductions; canonical records retain ages and identities. |
| E3 | Editorial recommendation | Several Julian invitations and replies sound administrative. Use natural explicit dialogue while preserving limits and emitted factual records. |
| E4 | Confirmed branch presentation mismatch | The Chapter 5 shared flirtation response assigns reluctance to end the call across motives. Revise the common response so an instrumental motive does not acquire unchosen desire. |
| E5 | Editorial recommendation | Generic introspection sometimes assigns shame/dependency or reads strangers as known. Replace only selected unconditional claims with observation or uncertainty. |
| E6 | Editorial recommendation | Casework tutorials compete with dramatic narration. Shorten without deleting retry/hint/inquiry limits; use notice presentation where compatible. |
| C1 | Existing unresolved knowledge semantics | Current reducer marks Maya helix_assignment known from the visible report header. Source supports observed companies, not necessarily the complete assignment. Preserve mechanics in this prose-only pass; separate versioned semantic decision remains. |
| C2 | Existing unresolved knowledge semantics | Submission gives Benton read_* document knowledge where the action establishes attachment/receipt. Do not invent a read event or rename historical keys in this pass. |
| C3 | Rechecked earlier fixes | Revision17 already guards the verified Rook-date callback, uncorrected medical-excuse callback and revisitable Aster concepts. Do not reopen them from an old audit. |
| C4 | Rechecked display compatibility | Canonical Evelynn spelling is already handled at the display boundary; raw historic Evelyn and stable evelyn IDs remain valid. |

## Sequence audit

### Opening home

Source: src/content/scenes.ts. States: apartment.bond, apartment.reply, apartment.departure.

**Purpose:** Establish Adrian’s ambition and a life outside Axiom.

**Knowledge:** Promotion expected, housing tied to job, Maya’s invitation.

**Emotional turn:** Routine carries dependence and expectation.

**Unresolved pressure:** Benton controls advancement.

**Relevant choices:** Friend/love/colleague and morning answer.

**Disposition:** Retain atmosphere and explicit relationship choice.

### Opening office

Source: src/content/scenes.ts. States: commute.arrival, office.daniel, office.benton, office.departure.

**Purpose:** Make access control and professional humiliation personal.

**Knowledge:** Daniel reports Priya’s promotion; Benton supplies Helix task.

**Emotional turn:** Anticipation becomes exclusion.

**Unresolved pressure:** A new deadline replaces the promised conversation.

**Relevant choices:** Promotion response and Benton challenge/acceptance.

**Disposition:** Pilot: trim dossier introductions, sharpen silences, preserve security/arrival cuts and slate handoff.

### Helix casework

Source: src/content/scenes.ts. States: helix.brief, helix.documents, helix.analysis, helix.review, helix.submitted.

**Purpose:** Teach evidence reasoning through an apparently routine task.

**Knowledge:** Only read records and supported relationships establish conclusions.

**Emotional turn:** Routine brief becomes suspicious through evidence.

**Unresolved pressure:** Deadline and Benton-only distribution.

**Relevant choices:** Read/connect/investigate/conclude/submit.

**Disposition:** Shorten instructions; retain retry, hint, one investigation and finality. Preserve submission truth.

### Maya at desk

Source: src/content/scenes.ts. States: maya.promotion, maya.invitation, maya.case, maya.goodbye, ending.complete.

**Purpose:** Personal recognition after institutional dismissal.

**Knowledge:** Maya knows Daniel’s news and visible header, plus explicit disclosure only.

**Emotional turn:** Support meets professional caution.

**Unresolved pressure:** Tonight’s invitation and investigation concern.

**Relevant choices:** Bond, morning reply, disclosure, refusal/acceptance.

**Disposition:** Pilot: preserve good Maya dialogue; branch-specific interiority. Remove development ending.

### Anomaly and escort

Source: src/content/day.ts. States: file.arrival, file.directory, file.authorized, security.intervention, security.escort.

**Purpose:** Turn curiosity into accountable exposure.

**Knowledge:** Visible directory is not protected content; palm authorization matters.

**Emotional turn:** An analyst becomes a subject.

**Unresolved pressure:** Suspended access and monitored contact.

**Relevant choices:** Open/report/delete/trace/walk away; message Maya.

**Disposition:** Retain decision cost and sequence; tighten security description.

### Sloane confrontation

Source: src/content/day.ts. States: sloane.intro, sloane.allegation, sloane.brief, sloane.identity, sloane.offer.

**Purpose:** Establish coercive power and identity mystery.

**Knowledge:** Audit proves access; Sloane’s operational account is a claim.

**Emotional turn:** Professional puzzle becomes a bodily demand.

**Unresolved pressure:** Job, referral and lease leverage.

**Relevant choices:** Questions and acceptance/refusal.

**Disposition:** Preserve blackmail as blackmail. Reduce introductory dossier and unchosen emotional interpretation.

### Refusal and release

Source: src/content/day.ts. States: refusal.lobby, refusal.reconsider, release.departure, release.home, dayend.cautious, dayend.walkaway.

**Purpose:** Make refusal actionable with real costs.

**Knowledge:** Termination/subsidy consequences, no instant eviction; re-entry does not undo them.

**Emotional turn:** Outside the gates is different, not magically safe.

**Unresolved pressure:** An unresolved accusation.

**Relevant choices:** Refuse, return under terms, or leave.

**Disposition:** Keep endpoints truthful; no invented independent continuation. Remove development copy.

### First evening

Source: src/content/day.ts. States: evening.plan, evening.disclosure, evening.closure, evening.goodbye, evening.home, warning.first, warning.second, warning.third, dayend.accepted.

**Purpose:** Let fear coexist with an existing relationship and contradictory warnings.

**Knowledge:** Maya knows only disclosures; sender unidentified.

**Emotional turn:** Private evening becomes another monitored uncertainty.

**Unresolved pressure:** 07:00 appointment.

**Relevant choices:** Evening plans, disclosure, boundaries.

**Disposition:** Retain strongest relational and warning prose; replace milestone footer.

### Clinic arrival

Source: src/content/clinic.ts. States: morning, contact, morningReply, travel, entrance, screened, reception, receptionReply.

**Purpose:** Re-enter a familiar institution as a restricted patient.

**Knowledge:** Appointment grants one destination; displayed identity is institutional data.

**Emotional turn:** Routine access no longer belongs to Adrian.

**Unresolved pressure:** A name prepared before arrival.

**Relevant choices:** Earlier Maya contact and reception response.

**Disposition:** Remove imposed shame/omniscience; preserve checks, wardrobe and belongings.

### Clinical privacy and assessment

Source: src/content/clinic.ts. States: privacy, privacyReply, exam, examResult, protocol.

**Purpose:** Separate clinical care from operational authority.

**Knowledge:** Measured data and limited examination opportunity; procedure not started.

**Emotional turn:** Small practical agency inside pressure.

**Unresolved pressure:** Medical uncertainty and Sloane’s schedule.

**Relevant choices:** Privacy selection, one examination observation, questions.

**Disposition:** Retain strong Voss/Sloane conflict; precise care information is essential, not boilerplate.

### Profile and decision

Source: src/content/clinic.ts. States: profile, profileReview, simulation, display, authorization, preparation.

**Purpose:** Make identity design tangible without deciding how the player feels.

**Knowledge:** Recognition tolerances, recovery limits, Stage One scope.

**Emotional turn:** Prediction becomes an imminent choice.

**Unresolved pressure:** Coercion persists alongside a clinical stop.

**Relevant choices:** Profile/review/authorize/refuse.

**Disposition:** Retain explicit limits and non-immediate reversal. Make simulation thought a question, not desire.

### Adaptation and recovery

Source: src/content/clinic.ts. States: voice, voiceReply, voicePause, face, faceReply, facePause, steps, mirror, name, rest, recoveryContact, recoveryReply.

**Purpose:** Experience changed voice/body through specific actions and uncertain self-recognition.

**Knowledge:** Only completed adaptation; monitored handset remains monitored.

**Emotional turn:** Familiar gestures produce unfamiliar sensations.

**Unresolved pressure:** Sloane names the operational identity.

**Relevant choices:** Voice/face response, pauses, mirror, disclosure.

**Disposition:** Retain vivid source prose and all pause/refusal branches. No newly sexualized medical events.

### Preparation and departure

Source: src/content/clinic.ts. States: wardrobe, makeup, presentationReview, rehearsal, briefing, farewell, departure, complete.

**Purpose:** Turn presentation into a usable but incomplete cover.

**Knowledge:** Confirmed wardrobe, credentials, earpiece and mission target.

**Emotional turn:** Private rehearsal approaches public exposure.

**Unresolved pressure:** People may remember the identity.

**Relevant choices:** Presentation and rehearsal choices; home stop.

**Disposition:** Retain equipment/wardrobe continuity; remove milestone narration.

### Clinical stop

Source: src/content/clinic.ts. States: stopConfirm, stopped.

**Purpose:** Honor ending treatment without inventing recovery or an instant reset.

**Knowledge:** Actual treatment state governs care and consequences.

**Emotional turn:** Operation ends; care continues.

**Unresolved pressure:** Referral, subsidy notice, discharge pending.

**Relevant choices:** Confirm stop or return to paused checkpoint.

**Disposition:** Retain material consequences and clinical handover; no punishment beyond established terms.

### Before Glass House

Source: src/content/mission.ts. States: home, homePresentation, homeContact, car, arrival, reception, elevator, entry.

**Purpose:** Contrast familiar home, chosen presentation and elite access.

**Knowledge:** Confirmed clothes, own messages, valid reception-only invitation.

**Emotional turn:** A manufactured identity opens a real door.

**Unresolved pressure:** Monitored channel and recognition risk.

**Relevant choices:** Home stop, presentation, Maya update.

**Disposition:** Retain strong physical atmosphere; tighten contact explanation.

### Recognition and cover

Source: src/content/mission.ts. States: marcus, marcusReply, celeste, celesteReply, cover.

**Purpose:** Turn others’ remembered intimacy into uncertainty.

**Knowledge:** Singapore/Blue Orchid are attributed claims, not player memories.

**Emotional turn:** Social attention becomes a test.

**Unresolved pressure:** Marcus can hear the cover response.

**Relevant choices:** Question, contradiction, redirect, chosen presentation response.

**Disposition:** Strengthen Marcus transition; preserve Celeste contact as authored without inventing mutual desire.

### Mission evidence

Source: src/content/mission.ts. States: hub, leadReview, leadResult, leadRead, assessment, assessmentReview, method, exchange, confrontation, escape.

**Purpose:** Make investigation and capture consequential.

**Knowledge:** Only selected leads establish evidence; token/photo/audio have distinct limits and custody.

**Emotional turn:** A name becomes a risky action.

**Unresolved pressure:** Time, scrutiny and incomplete proof.

**Relevant choices:** Two inquiries, named assessment/uncertainty, capture method.

**Disposition:** Retain source qualifications and branch-specific outcomes. No all-branch transcript claim.

### Mission aftermath

Source: src/content/mission.ts. States: debrief, debriefReply, warning1, warning2, warning3, garage, complete.

**Purpose:** Reveal Sloane’s withheld suspicion without proving the stranger’s larger claims.

**Knowledge:** Probable insider is not prior certainty; sender’s assertions unverified.

**Emotional turn:** Task success leaves another question.

**Unresolved pressure:** Why people remember Evelynn.

**Relevant choices:** Actual capture and debrief response.

**Disposition:** Retain strongest twist; replace development ending.

### Home after Glass House

Source: src/content/chapter3.ts. States: chapter3.home, chapter3.surveillance, chapter3.complete.

**Purpose:** Bring public identity pressure into private rooms.

**Knowledge:** Only retained evidence; badge log proves arrival, not apartment activity.

**Emotional turn:** Home becomes a recorded location.

**Unresolved pressure:** Sloane requests confirmation.

**Relevant choices:** Inspect/clothing/evidence; confirm/question/challenge/silence.

**Disposition:** Pilot: strengthen familiar objects and surveillance contrast without new intrusion facts.

### Chapter 3 evening

Source: src/content/chapter3-evening.ts. States: chapter3.mayaContact, chapter3.mayaTalk, chapter3.mayaClose, chapter3.pressure, chapter3.mayaFollowup, chapter3.rest, chapter3.nightComplete.

**Purpose:** Let Maya have boundaries independent of Sloane.

**Knowledge:** Messages and receipts govern who knows what.

**Emotional turn:** Connection provides warmth without resolving the day.

**Unresolved pressure:** A monitored phone and questions for Voss.

**Relevant choices:** Call/disclose/withhold; follow-up and rest.

**Disposition:** Retain Maya’s strong boundary line; remove development milestones and repeated authorization summary.

### Voss and the date

Source: src/content/chapter3-next.ts. States: morningPlan, voss, vossPlan, rook, rookCompare, rookReply, informationEnd.

**Purpose:** Test the sender through a bounded medical record.

**Knowledge:** Verified instruction date only if obtained; not the full program.

**Emotional turn:** An allegation acquires a source.

**Unresolved pressure:** Purpose of pre-breach preparation remains unknown.

**Relevant choices:** Care mode, verify/defer, reply/disclose.

**Disposition:** Keep revision17 conditional-date correction. Tighten Voss voice; no new Rook certainty.

### Julian’s professional offer

Source: src/content/chapter3-opportunity.ts. States: invitation, verifyOffer, executive, executiveWork, reception, photograph, opportunityEnd.

**Purpose:** Offer real reward and outside recognition with inspectable terms.

**Knowledge:** Sourced referral; fictional case; independent publicity choice.

**Emotional turn:** Useful attention creates a plausible alternative.

**Unresolved pressure:** Appointment conflict and public association.

**Relevant choices:** Inquiries, accept/decline, analysis, reception/photo.

**Disposition:** Shorten relay explanation and improve Julian voice; preserve every material term.

### Competing records

Source: src/content/chapter3-autonomy.ts. States: marcusRecord, marcusLeverage, institutional, reviewQualification.

**Purpose:** Make framing and clinical qualification forms of power.

**Knowledge:** Marcus’s words have limited circulation; Voss distinguishes clinical/operational records.

**Emotional turn:** A precise statement can still serve someone else.

**Unresolved pressure:** Who will rely on a record.

**Relevant choices:** Challenge/correct/retain; qualification/formal review.

**Disposition:** Sharpen Marcus’s defensive voice; retain source and rights details.

### Disclosure and calendar

Source: src/content/chapter3-autonomy.ts. States: truths, disclosure, calendar, departure.

**Purpose:** Turn owned information and limited time into decisions.

**Knowledge:** Drafts, recipients, exact attachments and overlapping times.

**Emotional turn:** Private facts can become obligations or leverage.

**Unresolved pressure:** Four-message budget and conflicting calls.

**Relevant choices:** Full/limited/misleading/withhold; confirm/reschedule/cancel/leave.

**Disposition:** Tighten opening paragraph; preserve mechanics and false-excuse consequences.

### Chapter 4 contact and independence

Source: src/content/chapter4-entry.ts. States: entry, consequences, resource.

**Purpose:** Carry prior promises forward and establish independent public access.

**Knowledge:** Actual calls/disclosures and existing calendar commitments.

**Emotional turn:** A free pass changes who must grant permission.

**Unresolved pressure:** Unresolved calls and practical costs.

**Relevant choices:** Contact/correction/walk; public pass.

**Disposition:** Improve public-pass beat; retain sourced callbacks and chronological transition.

### Chapter 4 investigation

Source: src/content/chapter4-case.ts. States: assignment, room, assessment.

**Purpose:** Give professional and independent routes substantive evidence work.

**Knowledge:** PA-17 complaint, manifest/template/witness distinctions.

**Emotional turn:** A hypothesis becomes a supported or limited report.

**Unresolved pressure:** Three inquiries and restricted annex.

**Relevant choices:** Client route, inquiries, assessment.

**Disposition:** Retain strong white-space image and evidence limits; no new finding.

### Interest outside work

Source: src/content/chapter4-case.ts. States: interest, outside.

**Purpose:** Let personal possibility emerge after the report.

**Knowledge:** Earned professional encounter, no implied attraction on ineligible routes.

**Emotional turn:** The next sentence may be personal.

**Unresolved pressure:** Uncertain mutual interest.

**Relevant choices:** Professional boundary or explicit attraction.

**Disposition:** Pilot extension: natural explicit attraction question, same disclosure and response.

### Chapter 4 favors and integrity

Source: src/content/chapter4-power.ts. States: favor, notice, power.

**Purpose:** Make a useful favor and dishonest claim produce distinct responses.

**Knowledge:** Actual publicly delivered facts; approval must be real.

**Emotional turn:** Convenience meets a limit.

**Unresolved pressure:** False authority loses expedited access/personal invitation.

**Relevant choices:** Accept/narrow/decline; honest/protect/exploit.

**Disposition:** Retain sourced Sloane knowledge; make withdrawal of invitation personal without new penalties.

### Chapter 4 private encounter

Source: src/content/chapter4-power.ts. States: intimacy, handoff, privateAccess, complete.

**Purpose:** Offer optional adult closeness and return to self-directed work.

**Knowledge:** Eligibility, selected motive, current agreement and outcome remain distinct.

**Emotional turn:** Anticipation, decision, private aftermath.

**Unresolved pressure:** Either can withdraw; future relationship unsettled.

**Relevant choices:** Quiet/decline/flirt, motive, no-sex/sex, withdraw/fade.

**Disposition:** Pilot: natural dialogue, willingness not forced desire; same fade and next-morning packet.

### Chapter 5 reward

Source: src/content/chapter5-reward.ts. States: home, spend, echo, invitation.

**Purpose:** Make earned resources and an unassigned day feel worthwhile.

**Knowledge:** Settled money versus voucher; existing possessions and callbacks.

**Emotional turn:** Life briefly has room beyond work.

**Unresolved pressure:** Public opportunities are optional.

**Relevant choices:** Inspect, purchase/none, inquiry, preview/salon.

**Disposition:** Retain real pleasure and independent options; sharpen quiet reward.

### Public self-presentation

Source: src/content/chapter5-public.ts. States: presentation, room, offer, proof.

**Purpose:** Give visibility a chosen form and tangible creative control.

**Knowledge:** Owned clothes, selected visit, exact proposal and image rights.

**Emotional turn:** A person becomes an image she can accept or refuse.

**Unresolved pressure:** Public use and editorial interpretation.

**Relevant choices:** Look, two stops, concept/terms, release/withhold.

**Disposition:** Add sensory detail only on chosen glamorous/sensual branches; preserve wardrobe and proof control.

### Convenience and people

Source: src/content/chapter5-benefit.ts. States: infrastructure, terms, people.

**Purpose:** Make benefits useful and relationships independent of providers.

**Knowledge:** Exact provider, cost, duration and received facts.

**Emotional turn:** More ease is possible without immediate entrapment.

**Unresolved pressure:** Future calls only if accepted; familiar contacts have limits.

**Relevant choices:** Provider, extension/refusal, two messages.

**Disposition:** Natural Julian speech; retain actual terms and non-Julian alternatives.

### Chapter 5 desire and home

Source: src/content/chapter5-desire.ts. States: want, handoff, return, complete.

**Purpose:** Offer chosen adult possibility and end with a self-authored room.

**Knowledge:** Eligibility, current motive/scope, actual possessions and placement.

**Emotional turn:** An evening can matter without a new commitment.

**Unresolved pressure:** What to carry into tomorrow remains open.

**Relevant choices:** Salon/Julian/home, motive, refusal/call/encounter, placement.

**Disposition:** Pilot: improve invitation and charged pauses; remove imposed reluctance from shared call.

## Complete authored-state index

Each definition is assigned exactly once. Line numbers refer to the pre-integration source inventory.

| Source | Authored ID | Title | Sequence |
|---|---|---|---|
| src/content/chapter3-autonomy.ts:6 | marcusRecord | What the office wrote down | Competing records |
| src/content/chapter3-autonomy.ts:15 | marcusLeverage | Interpretation is power | Competing records |
| src/content/chapter3-autonomy.ts:28 | institutional | The scope of a finding | Competing records |
| src/content/chapter3-autonomy.ts:37 | reviewQualification | A qualification in writing | Competing records |
| src/content/chapter3-autonomy.ts:50 | truths | Competing truths | Disclosure and calendar |
| src/content/chapter3-autonomy.ts:62 | disclosure | The words that leave | Disclosure and calendar |
| src/content/chapter3-autonomy.ts:71 | calendar | The calendar | Disclosure and calendar |
| src/content/chapter3-autonomy.ts:83 | departure | The door closes | Disclosure and calendar |
| src/content/chapter3-evening.ts:11 | chapter3.mayaContact | What you can tell her | Chapter 3 evening |
| src/content/chapter3-evening.ts:21 | chapter3.mayaTalk | The voice on the line | Chapter 3 evening |
| src/content/chapter3-evening.ts:27 | chapter3.mayaClose | An honest limit | Chapter 3 evening |
| src/content/chapter3-evening.ts:35 | chapter3.pressure | The extent of the record | Chapter 3 evening |
| src/content/chapter3-evening.ts:45 | chapter3.mayaFollowup | Before sending | Chapter 3 evening |
| src/content/chapter3-evening.ts:55 | chapter3.rest | The room after the calls | Chapter 3 evening |
| src/content/chapter3-evening.ts:65 | chapter3.nightComplete | Morning without an answer yet | Chapter 3 evening |
| src/content/chapter3-next.ts:16 | morningPlan | A question for the morning | Voss and the date |
| src/content/chapter3-next.ts:25 | voss | If I do nothing | Voss and the date |
| src/content/chapter3-next.ts:35 | vossPlan | A plan without another procedure | Voss and the date |
| src/content/chapter3-next.ts:44 | rook | A date, not an explanation | Voss and the date |
| src/content/chapter3-next.ts:55 | rookCompare | The date on the instruction | Voss and the date |
| src/content/chapter3-next.ts:64 | rookReply | What the sender gets back | Voss and the date |
| src/content/chapter3-next.ts:73 | informationEnd | The morning leaves a record | Voss and the date |
| src/content/chapter3-opportunity.ts:9 | invitation | An invitation addressed to Evelynn | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:22 | verifyOffer | Two checks before the deadline | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:34 | executive | Julian Mercer | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:50 | executiveWork | The work on the table | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:63 | reception | The price of being seen | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:76 | photograph | One photograph, one use | Julian’s professional offer |
| src/content/chapter3-opportunity.ts:89 | opportunityEnd | Outside the meeting | Julian’s professional offer |
| src/content/chapter3.ts:30 | chapter3.home | Home after Glass House | Home after Glass House |
| src/content/chapter3.ts:36 | chapter3.surveillance | The door was recorded | Home after Glass House |
| src/content/chapter3.ts:42 | chapter3.complete | A room with a boundary | Home after Glass House |
| src/content/chapter4-case.ts:16 | assignment | The disclosure problem | Chapter 4 investigation |
| src/content/chapter4-case.ts:28 | room | Work the room | Chapter 4 investigation |
| src/content/chapter4-case.ts:40 | assessment | What the records support | Chapter 4 investigation |
| src/content/chapter4-case.ts:49 | interest | Personal interest | Interest outside work |
| src/content/chapter4-case.ts:58 | outside | Outside the office | Interest outside work |
| src/content/chapter4-entry.ts:20 | entry | The choice you made | Chapter 4 contact and independence |
| src/content/chapter4-entry.ts:30 | consequences | Consequences arrive | Chapter 4 contact and independence |
| src/content/chapter4-entry.ts:40 | resource | An asset of her own | Chapter 4 contact and independence |
| src/content/chapter4-power.ts:20 | favor | The favor | Chapter 4 favors and integrity |
| src/content/chapter4-power.ts:29 | notice | What reaches Sloane | Chapter 4 favors and integrity |
| src/content/chapter4-power.ts:34 | power | The routing copy | Chapter 4 favors and integrity |
| src/content/chapter4-power.ts:46 | intimacy | Private time | Chapter 4 private encounter |
| src/content/chapter4-power.ts:55 | handoff | The agreed boundary | Chapter 4 private encounter |
| src/content/chapter4-power.ts:62 | privateAccess | Private access | Chapter 4 private encounter |
| src/content/chapter4-power.ts:74 | complete | The copy she keeps | Chapter 4 private encounter |
| src/content/chapter5-benefit.ts:20 | infrastructure | A little easier | Convenience and people |
| src/content/chapter5-benefit.ts:32 | terms | The workroom extension | Convenience and people |
| src/content/chapter5-benefit.ts:44 | people | People who knew Adrian | Convenience and people |
| src/content/chapter5-desire.ts:19 | want | Wanting something | Chapter 5 desire and home |
| src/content/chapter5-desire.ts:29 | handoff | The evening you agreed to | Chapter 5 desire and home |
| src/content/chapter5-desire.ts:36 | return | The life she built | Chapter 5 desire and home |
| src/content/chapter5-desire.ts:45 | complete | Where you leave it | Chapter 5 desire and home |
| src/content/chapter5-public.ts:16 | presentation | Dress for yourself | Public self-presentation |
| src/content/chapter5-public.ts:28 | room | The room wants Evelynn | Public self-presentation |
| src/content/chapter5-public.ts:33 | offer | The public offer | Public self-presentation |
| src/content/chapter5-public.ts:49 | proof | The proof is yours to release | Public self-presentation |
| src/content/chapter5-reward.ts:19 | home | What you brought home | Chapter 5 reward |
| src/content/chapter5-reward.ts:31 | spend | Spend it | Chapter 5 reward |
| src/content/chapter5-reward.ts:43 | echo | The echo | Chapter 5 reward |
| src/content/chapter5-reward.ts:55 | invitation | An invitation that is not a mission | Chapter 5 reward |
| src/content/clinic.ts:51 | morning | Before the appointment | Clinic arrival |
| src/content/clinic.ts:63 | contact | Six-thirty | Clinic arrival |
| src/content/clinic.ts:64 | morningReply | A voice before the door | Clinic arrival |
| src/content/clinic.ts:65 | travel | Back through the rain | Clinic arrival |
| src/content/clinic.ts:76 | entrance | The permitted entrance | Clinic arrival |
| src/content/clinic.ts:93 | screened | One authorized destination | Clinic arrival |
| src/content/clinic.ts:108 | reception | A name ahead of you | Clinic arrival |
| src/content/clinic.ts:123 | receptionReply | Through the inner door | Clinic arrival |
| src/content/clinic.ts:124 | privacy | Who controls the room? | Clinical privacy and assessment |
| src/content/clinic.ts:143 | privacyReply | The boundary you asked for | Clinical privacy and assessment |
| src/content/clinic.ts:144 | exam | While Voss works | Clinical privacy and assessment |
| src/content/clinic.ts:163 | examResult | What the scan leaves behind | Clinical privacy and assessment |
| src/content/clinic.ts:164 | protocol | What “mostly” leaves out | Clinical privacy and assessment |
| src/content/clinic.ts:189 | profile | The limits of the design | Profile and decision |
| src/content/clinic.ts:208 | profileReview | A choice inside the frame | Profile and decision |
| src/content/clinic.ts:209 | simulation | Adrian beside Evelyn | Profile and decision |
| src/content/clinic.ts:225 | display | What you allow her to see | Profile and decision |
| src/content/clinic.ts:226 | authorization | The first authorization | Profile and decision |
| src/content/clinic.ts:251 | preparation | Before the lights soften | Profile and decision |
| src/content/clinic.ts:268 | voice | A voice arriving | Adaptation and recovery |
| src/content/clinic.ts:288 | voiceReply | Hearing your own words | Adaptation and recovery |
| src/content/clinic.ts:289 | voicePause | The sequence is suspended | Adaptation and recovery |
| src/content/clinic.ts:305 | face | A face in progress | Adaptation and recovery |
| src/content/clinic.ts:319 | faceReply | An answer in the mirror | Adaptation and recovery |
| src/content/clinic.ts:320 | facePause | No further change for the moment | Adaptation and recovery |
| src/content/clinic.ts:335 | steps | Stand | Adaptation and recovery |
| src/content/clinic.ts:350 | mirror | Evelyn looks back | Adaptation and recovery |
| src/content/clinic.ts:359 | name | A name used as an instruction | Adaptation and recovery |
| src/content/clinic.ts:370 | rest | The hours needed to inhabit a body | Adaptation and recovery |
| src/content/clinic.ts:387 | recoveryContact | The phone in your hand | Adaptation and recovery |
| src/content/clinic.ts:395 | recoveryReply | Beyond the screen | Adaptation and recovery |
| src/content/clinic.ts:396 | wardrobe | What you wear into the room | Preparation and departure |
| src/content/clinic.ts:415 | makeup | The details within reach | Preparation and departure |
| src/content/clinic.ts:426 | presentationReview | One last look before you leave | Preparation and departure |
| src/content/clinic.ts:427 | rehearsal | Practice before an audience | Preparation and departure |
| src/content/clinic.ts:428 | briefing | The work beneath the clothes | Preparation and departure |
| src/content/clinic.ts:445 | farewell | Leaving the clinic | Preparation and departure |
| src/content/clinic.ts:459 | departure | Through the doors again | Preparation and departure |
| src/content/clinic.ts:473 | complete | Sublevel 17 complete — en route to the Glass House | Preparation and departure |
| src/content/clinic.ts:487 | stopConfirm | End further adaptation? | Clinical stop |
| src/content/clinic.ts:499 | stopped | Treatment stopped | Clinical stop |
| src/content/day.ts:20 | file.arrival | Something impossible | Anomaly and escort |
| src/content/day.ts:40 | file.directory | The file knows your name | Anomaly and escort |
| src/content/day.ts:56 | file.authorized | Access granted | Anomaly and escort |
| src/content/day.ts:68 | security.intervention | They were already waiting | Anomaly and escort |
| src/content/day.ts:97 | security.escort | Level 71 | Anomaly and escort |
| src/content/day.ts:112 | sloane.intro | Victoria Sloane | Sloane confrontation |
| src/content/day.ts:130 | sloane.allegation | She shows you the cage | Sloane confrontation |
| src/content/day.ts:156 | sloane.brief | A problem inside Axiom | Sloane confrontation |
| src/content/day.ts:174 | sloane.identity | Someone else already has access | Sloane confrontation |
| src/content/day.ts:213 | sloane.offer | Become Evelyn for the operation | Sloane confrontation |
| src/content/day.ts:240 | refusal.lobby | Refusal works | Refusal and release |
| src/content/day.ts:259 | refusal.reconsider | Returning is another decision | Refusal and release |
| src/content/day.ts:274 | release.departure | What you are allowed to keep | Refusal and release |
| src/content/day.ts:288 | release.home | Home, with conditions | Refusal and release |
| src/content/day.ts:302 | evening.plan | The hours between | First evening |
| src/content/day.ts:310 | evening.disclosure | Maya knows something is wrong | First evening |
| src/content/day.ts:324 | evening.closure | Another chance to trust her | First evening |
| src/content/day.ts:329 | evening.goodbye | The conversation ends | First evening |
| src/content/day.ts:330 | evening.home | The apartment after | First evening |
| src/content/day.ts:338 | warning.first | A sound that should not occur | First evening |
| src/content/day.ts:350 | warning.second | The second warning | First evening |
| src/content/day.ts:359 | warning.third | She isn’t you | First evening |
| src/content/day.ts:366 | dayend.cautious | A boundary you kept | Refusal and release |
| src/content/day.ts:380 | dayend.walkaway | Beyond the gates | Refusal and release |
| src/content/day.ts:400 | dayend.accepted | Seven o’clock remains | First evening |
| src/content/mission.ts:38 | home | Home in another skin | Before Glass House |
| src/content/mission.ts:52 | homePresentation | What nobody required | Before Glass House |
| src/content/mission.ts:56 | homeContact | Before the car arrives | Before Glass House |
| src/content/mission.ts:60 | car | The city goes on | Before Glass House |
| src/content/mission.ts:75 | arrival | A door held open | Before Glass House |
| src/content/mission.ts:87 | reception | A name that opens doors | Before Glass House |
| src/content/mission.ts:101 | elevator | Before the doors open | Before Glass House |
| src/content/mission.ts:110 | entry | The Glass House | Before Glass House |
| src/content/mission.ts:121 | marcus | The woman Marcus remembers | Recognition and cover |
| src/content/mission.ts:132 | marcusReply | The space after an answer | Recognition and cover |
| src/content/mission.ts:137 | celeste | An interrupted reunion | Recognition and cover |
| src/content/mission.ts:151 | celesteReply | What she leaves unsaid | Recognition and cover |
| src/content/mission.ts:160 | cover | A detail that should be familiar | Recognition and cover |
| src/content/mission.ts:169 | hub | People do not stay in their files | Mission evidence |
| src/content/mission.ts:181 | leadReview | Before you cross the room | Mission evidence |
| src/content/mission.ts:182 | leadResult | What you found | Mission evidence |
| src/content/mission.ts:183 | leadRead | Hold the detail still | Mission evidence |
| src/content/mission.ts:184 | assessment | Giving Sloane a name | Mission evidence |
| src/content/mission.ts:193 | assessmentReview | The name you will send | Mission evidence |
| src/content/mission.ts:198 | method | What can you bring back? | Mission evidence |
| src/content/mission.ts:206 | exchange | The exchange moves | Mission evidence |
| src/content/mission.ts:207 | confrontation | Close enough to be seen | Mission evidence |
| src/content/mission.ts:208 | escape | The distance to the elevator | Mission evidence |
| src/content/mission.ts:209 | debrief | The other objective | Mission aftermath |
| src/content/mission.ts:221 | debriefReply | What she chose to risk | Mission aftermath |
| src/content/mission.ts:226 | warning1 | An unlisted number | Mission aftermath |
| src/content/mission.ts:232 | warning2 | Another line | Mission aftermath |
| src/content/mission.ts:238 | warning3 | A question to carry | Mission aftermath |
| src/content/mission.ts:242 | garage | Below the glass | Mission aftermath |
| src/content/mission.ts:250 | complete | The Glass House is behind you | Mission aftermath |
| src/content/scenes.ts:51 | apartment.bond | Promotion day | Opening home |
| src/content/scenes.ts:67 | apartment.reply | A person outside the work | Opening home |
| src/content/scenes.ts:76 | apartment.departure | The tower is waiting | Opening home |
| src/content/scenes.ts:88 | commute.arrival | From home to Axiom | Opening office |
| src/content/scenes.ts:110 | office.daniel | Someone else’s promotion | Opening office |
| src/content/scenes.ts:127 | office.benton | The work remains | Opening office |
| src/content/scenes.ts:147 | office.departure | What Benton leaves behind | Opening office |
| src/content/scenes.ts:159 | helix.brief | A routine acquisition | Helix casework |
| src/content/scenes.ts:177 | helix.documents | Read the record | Helix casework |
| src/content/scenes.ts:189 | helix.analysis | What do the records support? | Helix casework |
| src/content/scenes.ts:202 | helix.review | Before you send | Helix casework |
| src/content/scenes.ts:212 | helix.submitted | Your judgment is on the record | Helix casework |
| src/content/scenes.ts:224 | maya.promotion | Maya brings coffee | Maya at desk |
| src/content/scenes.ts:238 | maya.invitation | Tonight still exists | Maya at desk |
| src/content/scenes.ts:249 | maya.case | She notices the case | Maya at desk |
| src/content/scenes.ts:266 | maya.goodbye | Before she goes | Maya at desk |
| src/content/scenes.ts:274 | ending.complete | The morning stays with you | Maya at desk |

## Deferred design work

No new social lane or Chapter 6 scene is introduced. Next design package: a non-Julian social sequence with independently authored supporting-character motives; Chapter 6 proof artifact and corroborating witness; an actual recurring benefit and exact exit cost; feasible recovery/counterpower routes. No new identity, institution or relationship becomes canon through this backlog.

## Unread branches and limits

Static definitions and changed local branches were inspected. Every combinatorial route across initial bond, disclosure, clinic choices, mission leads/capture, Chapter 3 appointments, Chapter 4 client/motive and Chapter 5 public/private choices has not been read uninterrupted. Only the explicit routes listed in the final validation record count as uninterrupted route review. No external narrative-review model was purchased for this pass.
