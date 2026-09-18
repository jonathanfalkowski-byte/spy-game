# Adult Scene Handoff Map

Current implementation update: Chapter 4 revision 15 now has an earned, optional Julian Mercer handoff. Julian is approved canon, age 49, Helix Group COO. See [Chapter 4 contracts](CHAPTER_4_HANDOFF_AND_ART.md). The design-only roadmap below is historical; its unassigned-executive and content-version-9 statements describe its original scope, not current runtime. Other future trajectories remain concepts.

**Design-only roadmap. No production encounters, external writing assignments or runtime changes.** Chapter 3 currently proposes **zero sexual-presentation handoffs**. Surveillance, authorized public association, sourced observations and usable leverage are approved dark-power direction. Marcus's leverage concerns a sophisticated interpretation of real discussions, not fabricated definitive acceptance. Future intimate milestones below have no fixed chapter placement. No explicit prose is included or requested by this document.

Authority: [offline presentation contract](../design/ADULT_SCENE_HANDOFF.md), [Second Skin proposal](CHAPTER_3_SECOND_SKIN.md), [future trajectories](../design/FUTURE_TRAJECTORIES.md), and existing `src/narrative/adult-scenes/` contracts. Save schema 5 and content version 9 are unchanged. The production outcome registry remains empty.

## Why and when a marker belongs

**Pacing correction:** earned intimacy does not mean postponing adult darkness. Escalate situations quickly and permanent loss of autonomy gradually. Chapter 3 includes an early sourced surveillance intrusion, selective information access, the approved public-association temptation and a proposed chance to exert leverage over Marcus. See [Dark Power Roadmap](DARK_POWER_ROADMAP.md). None needs a sexual handoff to count as a substantial dark situation.

The Price of Being Seen remains ordinary authored gameplay: legitimate paid meeting → optional smaller reception → defined introduction → separately optional photograph/publication → immediate visible access/exposure. Negotiation is honored and refusal preserves earned pay. Its persistent authorization/publication artifact may affect later recognition and opportunities through specific information paths; it grants no intimacy, loyalty, blanket image rights or private identity acceptance.

The executive may form sourced beliefs from accepting, narrowing, bargaining over or refusing these terms. Those observations can support later characterization but do not satisfy the agency/adulthood gates for an encounter. A future intimate scene must consume the actual relationship and power circumstances then, not reuse the reception's permission.

The same boundary applies to Marcus's note: discussing, considering, meeting or exploring does not authorize employment, exclusivity, public representation, a formal advisory role or intimacy. Letting an advantageous interpretation stand can preserve another actor's belief without creating the ungranted commitment. Any future handoff must use the actual agreement, never upgrade that belief to consent.

Every proposed encounter must answer: **Why does this happen in this story between these characters now?** Its nonsexual story purpose must survive a fade or omission of adult presentation. Attraction alone is insufficient. If an ordinary conversation fully serves the intended development and intimacy has not been earned, use that conversation.

Place an active `ADULT_SCENE_HANDOFF: <stable-id>` only at an authored entry boundary. The roadmap's IDs reserve concepts, not runtime IDs or approved scenes. A roadmap row is not an exportable `AdultSceneSpec`.

Status meanings: **concept** identifies a possible function; **possible** has supporting story conditions but unresolved gates; **earned** has established relationship and agency prerequisites; **authored** has complete approved-by-author chapter logic, not editorial asset approval; **approved** requires the applicable explicit canon/production approvals; **deferred** has a reason not to proceed; **rejected** should not occur in the named context. No row here is earned, authored or approved.

## Contract compatibility and identity boundaries

- Persistent participant: `player-character`; presented persona `evelyn` only when the existing presentation selector permits it; display **Evelynn Vale**. A persona is not another relationship subject. Cover age does not establish adulthood.
- The player-character's established age is 34. All other future participants are **unassigned**. The executive is a proposed role, with no stable character ID or confirmed canonical age. Do not substitute Marcus or another existing ID to pass validation. Canonical adult eligibility for every participant is a blocking gate.
- Current `CharacterIdSchema` and `NodeSchema` are closed registries. Future characters and chapter nodes cannot be exported through existing contracts until separately approved implementation registers them. Do not change those registries in this design task.
- `handoffId` is a documentation key; the contract binds `sceneId`, `sceneVariantId`, `canonicalOutcomeId`, versions and hashes. Keep that mapping explicit; do not add an unsupported `handoffId` field to serialized contracts.
- Entry/exit references resolve to authenticated events, sourced observations, player knowledge, existing derived consequence/leverage records, existing rule IDs or trusted authored facts. Roadmap goals are not existing effects. Never invent a rule ID, event sequence or source record to make a concept appear executable.
- Attraction, affection and loyalty have no automatic agency meaning. The current agency schema separately represents willingness, authorization, refusal, withdrawal, participation and pressure, with optional fear/resistance. Do not add inferred attraction or relationship properties to it. Relevant established attraction may be a separately sourced, explicitly permitted fact.
- Writer context and participant knowledge are separate grants. The writer may receive selected production directions without a participant learning them. Prefer visible behavior over hidden motives; do not export full saves, secret objectives, identity associations or leverage records by default.
- Disclosure schema supports `fact` and `attributed-claim`. In design, label verified fact, claim, inference, deception and partial truth distinctly. In eventual export, an inference or unverified assertion remains attributed; the fact that someone said it is not proof that its contents are true. Deception's hidden truth stays writer-only only if specifically necessary and granted. Never invent unsupported enum values or disclose the hidden truth through a summary.
- Equal presentation variants share one canonical outcome, agency sequence, disclosures, custody and aftermath. A withdrawal outcome and a continuing encounter are different outcomes, not “fade” versus “explicit.” Every omitted essential beat needs surrounding dialogue, aftermath or an approved summary delivery path.

## Executive / powerful-person trajectory

The proposed COO is not automatically a future romantic partner. A separately approved character may fill the role only if characterization earns it. The following progression is conditional, not a conveyor belt: mutual interest → private access → intimacy → favors → luxury → protection → obligations → expectations → possible dependency/control. Any step can be refused, renegotiated or absent. Several steps should remain ordinary authored conversations.

All rows use `player-character` and an **unassigned, canonically adult counterpart** if eventually earned. Their persona and knowledge of the player/persona association remain unspecified until sourced. No present eligibility receipt is claimed.

| handoffId | Chapter / trajectory | Story purpose | Agency classification | Power context | Proposed canonical consequence | Required prior state | Future impact | Presentation variants | Status |
|---|---|---|---|---|---|---|---|---|---|
| `future.executive.chosen-intimacy` | Chapter 4 or later; independent or mutual relationship | Deliberately change a relationship beyond professional access while preserving a limit | Unspecified now; mutually-willing only after separately authored willingness and scoped authorization for both | Status, access and unequal resources; no automatic coercion | An expressly stated relationship boundary becomes known; no exclusivity, loyalty or favor is implied | Approved adult character; mutual interest; prior respected refusals; professional opportunity independent of participation; viable departure | May support mutual relationship, strategic independence or companionship; no route lock | Fade and mature may be planned; external variant only after separate approval, same outcome | Deferred |
| `future.executive.terms-revisited` | Later companion relationship | Reconsider expectations after a gift or favor, rather than silently creating a debt | Unknown until the actual exchange; refusal/withdrawal remain separate outcomes | Gifts, access, economic differences | Only a specifically accepted obligation exists; otherwise the boundary or refusal is recorded | Existing relationship; sourced gift/favor and terms; no automatic obligation; independent options established | Continued autonomy, negotiated companionship or early warning of constraining expectations | Conversation first; adult variants only if a distinct encounter is earned and keeps the same agreed terms | Concept |
| `future.executive.mutual-boundary` | Later mutual relationship | Demonstrate that a powerful counterpart respects a limit during a vulnerable interaction | Mutually-willing only for authorized beats; withdrawn if withdrawal occurs | Status imbalance with actual alternatives | The stated limit is respected; no new leverage or promised loyalty | Established adults, ongoing willing relationship, specific boundary and response | Supports mutual agency; does not certify permanent safety or affection | Fade / mature; any external variant separately reviewed for the identical boundary and outcome | Concept |
| `future.executive.dependency-recognized` | Later dependency possibility | Make reduced options and conditional support legible | Authored pressure or compliance under leverage only where sourced; never recast as mutually willing by appearance | Specific housing, money, access or protection dependence | Player recognizes a concrete constraint and faces an authored decision about support | Accumulated sourced obligations; demonstrable narrowing of alternatives, not merely luxury or pleasure | May lead to renegotiation, restored independence or further constraint | Prefer non-graphic conversation and aftermath; no external explicit presentation proposed | Deferred |
| `future.executive.withdrawal-recovery` | Later exploitation / recovery possibility | Honor withdrawal and reconnect to choices about safety, support and resources | Refused/withdrawn; any coercion remains expressly identified | Actual leverage and practical exit limits | Further participation stops in the selected outcome; resulting support/exit problem remains authored | Established refusal or withdrawal, concrete power source, approved bounded aftermath | Recovery can restore options without dictating identity or repudiating the relationship's entire past | Non-graphic authored aftermath; no explicit variant proposed | Deferred |

**Branches remain distinct:** high autonomy means maintained options, not performative defiance; mutual relationship means both retain agency despite unequal resources; executive companionship may be chosen for status or comfort; ornamental dependency requires actual closure of alternatives; exploitation/recovery requires specific coercion or harm and an authored response. Neither a gift nor an intimate encounter establishes any of these by itself.

Protection is not a blanket license. Payment, gifts, continuing employment and earlier participation do not establish current authorization. A shift from a willing relationship to coercive circumstances requires a new, sourced agency sequence; do not reuse romantic directions unchanged.

## Voluntary adult-entertainment trajectory

This is a chosen profession, not a failure route. Public exposure, income, image rights, ambition, privacy and espionage anonymity are distinct decisions. Participating in one production does not authorize later work, distribution, other participants or unlimited use of a persona.

Participants in the rows below: `player-character` plus **unassigned canonically adult participants as required by the actual future scene**. Producers, representatives and distributors are not automatically intimate participants. Every depicted participant needs an independent adulthood check; no names, ages, preferences or relationship facts are invented here.

| handoffId | Chapter / trajectory | Story purpose | Agency classification | Power context | Proposed canonical consequence | Required prior state | Future impact | Presentation variants | Status |
|---|---|---|---|---|---|---|---|---|---|
| `future.career.first-chosen-work` | Unscheduled voluntary career | Give a chosen professional commitment a complete before/after consequence | Unspecified now; willing and specifically authorized only when established for each participant | Compensation, ownership, distribution and public identity | Only approved work/rights commitments and delivered disclosures are recorded; exposure follows actual distribution | Chosen career; adult eligibility; known participants and terms; meaningful ability to refuse; independent approval of participation and distribution | Income and professional opportunity may coexist with reduced anonymity, without moral judgment | Fade / mature may be considered; external variant separately approved, same work/rights outcome | Concept |
| `future.career.scope-renegotiated` | Later voluntary career | Show a professional limit remaining meaningful when a request changes | Original authorization does not cover new scope; refusal or renewed authorization separately authored | Contract, bargaining strength, deadline and reputation | Accepted revision or honored refusal; no silent expansion of rights | An existing commitment; exact changed request; available refusal; sourced ownership and terms | Business authorship, professional relationships and opportunity costs | Negotiation is ordinary gameplay; any later presentation binds only the selected outcome | Concept |
| `future.career.public-identity-choice` | Later visibility / fame | Decide how chosen work intersects with a public persona and intelligence access | Distribution authorization distinct from encounter participation | Platform reach, recognition, representation | Chosen attribution/publication becomes known only to actual recipients/audience | Existing approved work; ownership rights; informed visibility choice; established identity presentation | Fame/access may rise while anonymity decreases; no automatic disclosure of Adrian's identity binding | Normally no adult handoff: authored release/aftermath; no extra presentation needed | Deferred |

## Exploitation / forced commercial sexuality — separate track

These concepts are not escalations automatically caused by the voluntary-career rows. Debt, coercive terms, blackmail and inability to leave require independently authored events and sources. Prior enthusiasm or occupation does not authorize abuse. Keep treatment non-graphic and centered on loss of choice, consequences and restoration of agency; no explicit presentation is proposed for these concepts.

| handoffId | Chapter / trajectory | Participants | Story purpose | Agency classification | Power context | Proposed canonical consequence | Required prior state | Future impact | Presentation variants | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| `future.exploitation.constraint-exposed` | Unscheduled exploitation possibility | Player plus unassigned adults; roles must be authored | Reveal that a specific threat or condition has removed a meaningful option | Pressured / compliance-under-leverage / coercive only as explicitly established; not willing by default | Sourced debt, blackmail, controlled resources or threats | A particular constraint becomes known; next decision addresses it, not a generic corruption increment | Approved non-graphic storyline; real leverage holder, subject, evidence, validity and known recipients | Resistance, support-seeking or other authored responses; no automatic descent | Non-graphic account and aftermath only | Deferred |
| `future.exploitation.agency-restored` | Unscheduled recovery | Player and chosen support figures, all roles separately approved | Restore a concrete option without support purchasing intimacy | Refusal/withdrawal or independently chosen support; never automatic loyalty | Control of resources, safety, documents and assistance | One specified restriction is relieved, or a recovery step becomes available; no instant total rescue | Identified constraint, credible support, explicit player choice and sourced result | Leaving or continuing a voluntary profession may both remain possible | Authored conversation/aftermath; normally no adult-content handoff | Deferred |

These rows are reminders to plan consequences and boundaries, not instructions to stage explicit coercive encounters. The eventual story may reject them entirely. Recovery does not require repudiating femininity, pleasure, public work or a chosen identity.

## Handoff dossier required before authoring

For every concept promoted into an actual chapter candidate, complete all fields below. Unresolved fields keep it deferred. This is a documentation format, not a parallel runtime schema.

1. **Identity:** `handoffId`; actual `sceneId`; `canonicalOutcomeId` and outcome variant; participants' registered stable character IDs; permitted presented persona IDs/display names; canonical adult-eligibility sources for every participant. Unassigned participants or unknown age block export. Explain identity association grants independently of public names.
2. **Story purpose:** explain why these people encounter this decision now, what it changes and why an ordinary conversation would be insufficient. State the nonsexual purpose that remains when presentation fades.
3. **Entry state:** list bounded source aliases for committed events, exact NPC observations, player knowledge, existing consequence/leverage records, actual custody, obligations, mission objectives and presentation. Mark future authored facts as proposals, never existing save facts. No unrestricted save dump or invented rule IDs.
4. **Agency / participation:** for each participant at every ordered beat, record separately sourced willingness, authorization with scope, refusal, withdrawal, observable participation, pressures and their known recipients, fear and resistance where established. Attraction, affection and loyalty remain separate facts or unknown. No implicit carry-forward; renewed authorization after withdrawal needs a new authored source. Unequal status alone proves neither coercion nor freedom from coercion.
5. **Power:** identify the actual holder, affected person, source, validity and exposure of relevant authority, obligation, dependency or leverage. A gift does not silently become a debt. Prefer selected behavioral directions to exporting sensitive records wholesale.
6. **Writer-permitted context:** enumerate exactly what may guide portrayal, distinguishing writer-only from may-reveal facts and visible beat directions. State forbidden identity/motive/biography disclosures. Writer access is neither a character's knowledge nor permission to add dialogue revealing it.
7. **Participant knowledge:** separate sourced entry snapshots for each character. Omitted knowledge is unspecified, not erased. Proposed disclosures during the encounter belong in the disclosure plan, not preloaded entry knowledge.
8. **Required beats:** ordered commitments, stated boundaries, responses, information exchanges and stop/aftermath transitions. The writer can dramatize them but cannot choose whether participation continues or whether a boundary is honored. Different canonical decisions require different outcome contracts.
9. **Forbidden changes:** preserve agency, consent scope, objectives, mission result, custody, obligation and leverage; prohibit invented secrets, unearned knowledge, prior-history authentication, resolved Evelynn identity acceptance and revealed Rook identity. Do not convert pressure into romance or a payment into affection.
10. **Disclosures:** for each exchange, name sender, recipients, beat, source/fact alias and design classification: verified fact, claim, inference, deception or partial truth. Preserve the distinction when mapping to supported contract epistemic statuses. If none occur, say none; intimacy itself transmits no hidden facts.
11. **Exit state:** list exact canonical source references and separately approved authored changes, with actual existing consequence-rule IDs only where applicable. State what stays unchanged. Prose, asset approval and reading intensity do not create effects.
12. **Aftermath:** name the authored return point and the next playable decision: conversation, reflection, evidence handling, boundary, obligation or recovery. Explain refusal/withdrawal outcomes without silently resuming participation. Every major presentation reconnects to gameplay.
13. **Presentation variants:** identify proposed `fade_to_black`, `mature` and, only where appropriate and separately approved, `explicit_external` assets for the **same** outcome. All preserve agency, disclosures, custody, mission consequence, leverage and aftermath. Map every essential omitted disclosure to surrounding dialogue, aftermath or an approved summary; do not hide required information inside an omitted beat. A placeholder is sufficient; no explicit draft belongs here.
14. **Approval / assets:** name unresolved canon gates, exact outcome/specification version/hash binding, editorial review requirements and approved asset references only when they exist. A roadmap status is not a hash-bound approval. Test fixtures are not character canon or approved production scenes.

## Production boundary and review

Use the existing sequence only after a real chapter is approved: authenticated entry → trusted outcome and bounded policy → immutable specification → offline draft intake → editorial review → approved asset metadata → future authored aftermath. The current architecture does not perform runtime selection or transitions and does not persist an editorial approval service across restarts. This design does not claim those capabilities exist.

Check semantic equivalence as well as structural validation: a valid hash does not establish that prose preserves consent, avoids spoilers or delivers a required fact. Each presentation needs its own editorial approval; changes to canon, policy or text require renewed review. No writer may add state mutations or unsupported choices/effects.

**Current result:** zero Chapter 3 handoffs; later executive intimacy deferred; voluntary career and exploitation/recovery mapped separately; no new adult eligibility, attraction, relationship fact or canonical outcome approved. Do not code, commission explicit material, modify the frozen slice or implement future trajectories from this roadmap.


## Full-game handoff alignment — 2026-09-18

Authority: [EVE Master GDD](../design/EVE_MASTER_GDD.md) and [Adult Thriller Pacing Map](ADULT_THRILLER_PACING_MAP.md).

The full game may include significantly darker adult-life and relationship trajectories, including dependency, manipulation, coercion, abuse, public/adult careers, trophy-wife or kept-life states, and body/image pressure.

### Handoff boundary

AdultSceneSpec remains for **mutually authorized adult intimate outcomes** with fresh current eligibility.

Do **not** use a mutually-willing AdultSceneSpec to represent:
- coercion;
- forced compliance;
- abusive demands;
- blackmail-backed participation;
- lack of meaningful alternatives;
- a bodily or intimate act imposed by a controlling actor.

Those circumstances remain separate canonical story events, represented non-graphically in runtime, with their own evidence, harm, aftermath, leverage, recovery and counterpower state.

A character's desire, pleasure, affection, prior participation, profession, marriage, or financial support does not establish current consent.

### Public / celebrity / adult-career handoffs

Future career progression can include:
- editorial and luxury work;
- public celebrity;
- sensual professional presentation;
- adult-media professional opportunities;
- adult-entertainment career.

Every professional intimate outcome requires separate current authorization from:
- employment or representation terms;
- image/distribution rights;
- compensation;
- partner/participant identity;
- publication rights.

One project never authorizes the next project.

### Executive / spouse handoffs

Executive companionship may develop into:
- chosen relationship;
- strategic partnership;
- marriage;
- trophy-wife presentation;
- kept/dependent life;
- exploitative control.

Neither marriage nor prior intimacy creates blanket authorization. A later controlling or abusive circumstance requires its own authored power sequence and cannot reuse prior romance state as proof of willingness.

### Body-change boundary

Body modification is not itself an adult-scene handoff. Its authorship must preserve:
- who requested it;
- whether Evelynn wants it;
- pressure/cost of refusal;
- who pays;
- permanence;
- accepted scope.

A later intimate scene must not infer consent from a body change, and a body change must not infer sexual availability.
