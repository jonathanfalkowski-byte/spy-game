# Chapter 3 — Second Skin

**Status: approved Chapter 3 dark-power design, with Marcus's sophisticated interpretation replacing the earlier definitive-agreement claim. New treatment details remain subject to review; nothing here changes runtime canon.**

Prepared against the frozen vertical-slice baseline at `52284a1`, on the separate `story/chapter-3-design` branch. The external-playtest build and its pending feedback infrastructure are untouched. Save schema remains 5; content version remains 9. This proposal contains no implementation, migration, new system, or approved production schedule.

Primary authority: [GDD v0.2](../../reference/EVE_Vertical_Slice_GDD_v0.2.docx), especially sections 4–5, 9, 12–13. Subsequent approved identity and bounded-ending decisions remain authoritative. See [future trajectories](../design/FUTURE_TRAJECTORIES.md) and [slice audit](../design/VERTICAL_SLICE_AUDIT.md). The newer request permits Chapter 3 design while the GDD's implementation/playtest gate remains in place.

New display prose uses **Evelynn Vale**. Stable persona ID `evelyn` is unchanged. Adrian and Evelynn do not become separate playable people. Presentation, personal identification, another person's recognition, and historical biography remain separate concepts.

## A. Synopsis

The first operation is over. Sloane has the result she can obtain, the unknown sender has challenged its meaning, and Adrian is sitting in the waiting car beneath the Glass House. Chapter 3 begins with the cost and usefulness of that result, not another explanation of the test.

At home, the familiar room provides no instructions for what to do next. A conversation with Maya can restore contact without restoring everything that was withheld. Voss can explain practical options without promising that medical authority solves institutional coercion. The unknown sender then offers a specific way to verify that Sloane's decision preceded the breach by far more than a night.

Helix makes a different kind of approach. Its people saw someone worth understanding at the Glass House: potentially useful, potentially troublesome, and able to behave independently under scrutiny. A senior executive offers a bounded commercial conversation, with an opportunity to earn access on terms the player can question. Neither sincerity nor a hidden trap is pre-decided by the narrator.

The chapter's action is choosing who receives which part of the truth, then testing whether a personal boundary survives contact with a real opportunity. Axiom demonstrates that private life is still visible to it. Helix offers a public association worth wanting. Finally, a written overstatement by Marcus gives Evelynn power over someone else's professional standing. Its climax pairs negotiation with the choice of how to use that power. The preferred ending is accepting a limited next engagement because the player wants something it offers. Declining remains a complete, respected outcome.

The shift is from **“What are they doing to me?”** toward **“What can I do with what they made?”** This does not require accepting Evelynn as a private identity. Other people can value that public person while the player remains uncertain about her.

## B–D. Scene flow, decisions, and existing state

Nine substantial sequences, with short optional exchanges inside them. Suggested chronology: day-one evening after the existing 19:28 garage ending, a completed night at home, day-two morning follow-up, and an afternoon Helix appointment. Exact later times are proposals, not retroactive changes. No overnight instant recovery or unearned professional expertise.

Only a completed Glass House route is eligible. Cautious withdrawal, walk-away and clinic-stop endpoints remain complete. Do not converge them onto a body or mission they never experienced.

### 1. The ride after the test

**Opening:** Continue inside the waiting car. The driver asks whether the registered residential destination is correct. The player confirms the journey; Sloane does not materialize in the vehicle. Her remote channel can reconnect only after a visible incoming request, since the mission channel is closed.

**Interaction:** Sloane addresses one outstanding practical issue from the actual capture. With substantive audio she controls the clean recording and offers a restricted review, not a personal copy. With a photograph she asks for the existing image and acknowledges what the frame misses. With a token she requests a supervised handover; possession remains useful and incomplete. With fragments, contact-only photography or no capture she needs a statement distinguishing observation from conclusion.

**Decision:** Agree to a later review/handover, ask for written terms before agreeing, or decline immediate discussion and return home. If the player offers an account, they can qualify uncertainty rather than retrospectively improve their reasoning. No item is silently transferred in a car conversation.

**Immediate consequence:** Cooperation establishes an appointment, negotiation establishes a specific outstanding request, and deferral leaves Sloane waiting for an answer. Her reply changes accordingly. None restores employment or makes a personal copy of her recording. She can argue that outside movement will now draw attention without claiming omniscient control of it.

**Transition:** The channel ends. Show the journey, residential badge check and entry into the apartment. The driver departs; there is no implied new detention.

**Existing inputs:** `mission.capture`, `method`, `source`, `reasoning`, `timing`, `token`, `debrief`, `channel`, `outcome`; `day.phone`, `badge`, `employment`, `housing`, `refusedOnce`; relevant `npcs.sloane.known` and history. Source assessment is available to Sloane through the submitted report, not to Helix.

### 2. A room without instructions

**Opening:** The tower is still visible from the original apartment. The jacket is familiar; the fit and movement are not. Let the player put down the phone before deciding what receives attention.

**Interaction:** Optional observations revisit the mirror, clothing, messages and actual retained objects. The token is present only if still personally held. The phone can display a retained photograph; audio owners cannot inspect a nonexistent clean copy. There is no newly issued wardrobe waiting at home: the gala clothes, old clothes and carried belongings are what exist.

**Decisions:** Keep wearing the chosen presentation for a while or change for comfort; look in the mirror or leave it covered by darkness; examine an earned item or put it away. The player may enjoy a detail, dislike it, find it strange, or decline to name the feeling. These are private interpretations, not messages to Sloane.

**Immediate consequence:** Give one tactile or practical response to each action. Saving a photograph locally does not remove Axiom monitoring. Putting the token away does not authenticate it. Enjoyment does not buy loyalty or resolve identity.

**Transition:** Decide whether to contact Maya tonight or rest and leave a morning opportunity. Finish changing/preparing for sleep before moving time forward.

**Early control interruption — approved direction:** After residential entry, Sloane sends the exact access timestamp and asks for an arrival confirmation. Show the source: the restricted badge's residential access record was forwarded to Executive Intelligence's active-compromise review. The log records entry, not what happens inside the apartment. Sloane argues that accounting for an operative after extraction is necessary. Evelynn can confirm arrival only, ask who sees residential movements, challenge the scope, or leave the message unanswered. The private threshold has become an operational checkpoint; no new GPS, room microphone or private thought is invented. Do not narrate that the player forgot monitoring or felt surprised: let them respond with surprise, anger, recognition or silence. Sloane knows a fact Evelynn never chose to report to her, even if a cautious player anticipated the possibility. A requested confirmation is not a previously agreed reporting duty.

**Existing inputs:** `inspected`, apartment history; `clinic.stage`, `voice`, `profile`, `outfit`, `makeup`, `mirror`, `belongings`; `mission.capture.owner`, `quality`, `token`; `day.phone`, `housing`. Past private mirror choices may contextualize memory, never prescribe tonight's feeling. Do not use `clinic.investment` as an identity verdict.

### 3. Someone who knew the room before

**Opening:** Maya answers a player-initiated call or a clearly authored reply to a message. If the player chooses distance, complete the unsent message or brief boundary exchange without automatically arranging a meeting. Do not invent an outstanding post-party check-in: the established arranged call was at 06:30 and its result already occurred.

**Interaction:** Maya's first concern follows her last received information. If she knows only Security took Adrian, she cannot ask how the transformation went. If she received an explicit identity disclosure, she can ask how Adrian wants to be addressed privately. That question grants no identity acceptance and does not rewrite the selected historical name response.

**Decisions:** Describe one concrete thing that happened, acknowledge an earlier omission without supplying more, or ask for ordinary company and retain a boundary. A player who missed the arranged morning call can apologize, explain, or decline to explain. A player who previously claimed an ordinary evening can correct that account. None of these obliges Maya to forgive immediately.

**Immediate consequence:** Maya responds to the actual words. A bounded disclosure may gain practical help; another evasion may leave her unwilling to investigate on the player's behalf. She can remain caring while declining to become an intelligence resource. Concealed love stays private unless newly expressed; no romance scene is proposed.

**Transition:** Finish the goodbye and the night. If a future contact is proposed, show its exact time and acceptance rather than treating a vague wish as a promise.

**Existing inputs:** `choices.morning`, `choices.invitation`, `choices.disclosure`; `relationships.bond` for private framing only; `day.security`, `evening`, `disclosure`, `closure`, `exposure`; `clinic.morning`, `contact`; `npcs.maya.known`, `npcs.sloane.known`, sourced history. Trust may shape warmth, but the spoken callback must cite a real event rather than a numerical diagnosis.

### 4. What tomorrow can and cannot undo

**Opening:** Proposed day-two medical follow-up, offered as continuity of care rather than a new compulsory stage. Start with scheduling and entrance controls if attended; refusal or postponement receives practical written advice and leaves unanswered questions pending. Device screening and any locker use must be completed explicitly.

**Interaction:** Voss asks about fatigue, movement and the selected voice. This is a fictional clinical follow-up, not another transformation scene. She explains that Stage One's partial reversibility requires further treatment; recovery and endocrine changes cannot be reset on command. Asking about reversal is not authorizing it. Asking about continuation is not authorizing Stage Two.

**Decisions:** Ask for a reversal assessment, ask how to live with the present result, ask about later-stage limits, or request only immediate aftercare. Select which concern to discuss privately. Today's room occupancy is newly established: yesterday's privacy request does not magically remove Sloane today.

**Immediate consequence:** Voss gives an actual answer and a bounded next medical option. She states that no further adaptation is scheduled through this conversation. Employment and security decisions remain outside her authority. If she is asked about a prior examination finding, use only the finding actually inspected.

**Transition:** Complete the examination or remote advice, return belongings if stored, and establish where the player receives the next contact. No forced Stage Two decision.

**Existing inputs:** `clinic.privacy`, `sloanePresent` as historical occupancy only, `exam`, `completed`, `stage`, `authorized`, `voice`, `face`, `profile`; `day.records`, `knowledge`, `npcs.voss.known`; employment/device/badge state. Voss knows her clinical work, not Maya's private exchanges or the sender's messages unless told.

### 5. A date that can be checked

**Opening:** The unknown sender contacts the monitored phone. The interface still says **Unknown sender**. A message arriving there is not evidence of a secure channel.

**Interaction:** Proposed message points to one narrow record: the dated clinical instruction authorizing preparation for Adrian to assume the existing identity, approved by Sloane approximately two months before the breach. It directs the player to request the date and approving office from Voss's patient-record extract, not to trust an attached screenshot.

**Decisions:** Request the limited extract from Voss, ask the sender why verification matters, defer, or refuse further contact. The sender does not receive a copy of the record by default. Requesting it on an Axiom channel is a visible inquiry, with that exposure stated first.

**Immediate consequence:** If requested, Voss supplies the limited dated instruction through an authored follow-up. The player can compare the breach date and the earlier instruction. This verifies a pre-breach decision, not the sender's identity, moral purpose, explanation of ORACLE or account of the Glass House exchange. If declined, it remains an unverified claim and later dialogue says so.

**Novelty safeguard:** Equipment research already showed calibration twenty-three days earlier. A player who found it receives “this goes back further, and names the approving office,” not a second discovery of premeditation. Other examination paths still obtain the same verification opportunity. Only the verification is optional; the meaningful offer of evidence occurs for every route.

**Transition:** Complete Voss's reply and any selected response to the sender. The player closes the message with a new question: what did Sloane decide before she needed a remedy for the breach?

**Existing inputs:** `clinic.exam`; `day.records` for earned warning and preparation records; `day.biometric`; ledger chronology and Voss knowledge. The two-month decision is GDD authorial truth, not an existing player-known fact. The extract and its release are proposed new information paths, not existing save fields.

### 6. An invitation that did not come from Sloane

**Opening:** A Helix executive office sends a specific invitation to Evelynn Vale. Proposed delivery path: Glass House reception relays the invitation through its event contact channel and asks permission to pass contact details onward. This avoids assuming Marcus has Adrian's private number. Reception access to an invitation does not expose the player/persona binding.

**Interaction:** The invitation offers a short, paid, non-exclusive discussion of acquisition due-diligence practice. No Axiom records are requested. Fee, length, right to decline further work and confidentiality limits are supplied before attendance. Exact currency/amount remains a production-writing decision requiring an economic context, not an invented existing price.

**Decisions:** Verify the sender through Helix reception; ask why they want this meeting; negotiate public/common reception rather than private hospitality; accept; or decline. No meeting is secretly accepted by reading the terms.

**Immediate consequence:** The office can explain which introduction led to contact. Interest has different temperatures: an appreciative Celeste referral, a cautious Marcus referral, or a formal invitation after security attention. Every path offers something real, but not every path offers the same trust, access or hospitality. See K for the knowledge gates.

**Transition:** Establish whether and when the appointment exists, and what the player has authorized reception to share. Sloane did not initiate it. The player may still choose to tell her.

**Existing inputs:** `mission.marcus`, `celeste`, `scrutiny`, `extraction`, `wrist`; `clinic.outfit`; `mission.completed` for spoken follow-ups; sourced Marcus/Celeste observations. Private reasoning, hidden confidence scores and evidence custody are not invitation inputs without a new explicit disclosure.

### 7. Who gets which truth

**Opening:** Before answering the appointment finally or leaving home, review earned messages and custody. This is a set of conversations, not a faction menu or allocation meter.

**Decisions:** Tell Sloane about the invitation, give a limited account, or withhold it; tell the sender that the date was verified, share less, or stop replying; tell Helix only what is necessary for scheduling, ask a pointed question, or disclose an earned observation deliberately. Maya contact remains a separate personal choice, not a mandatory fourth intelligence report.

**Immediate consequence:** Sloane can offer support with explicit reporting expectations if told. The sender may request a detail the player has reason to withhold. Helix can answer the question it actually receives. Show the proposed words and attachments before sending. Do not silently forward a dossier, record, photograph or token details.

**Exposure rule:** Withholding from Sloane in conversation is not guaranteed concealment from Axiom on a monitored phone. Distinguish “not told by you,” “available to monitoring,” and “Sloane demonstrably received it.” A later Sloane reaction requires a specified monitoring report or direct communication. An in-person conversation has no automatic recording.

**Transition:** Finish each chosen exchange. If attending, collect the actual belongings, confirm transport and reach Helix reception. If declining, complete the refusal and move to the alternative ending in scene 9; do not punish refusal with a forced abduction or appointment.

**Existing inputs:** `facts`, `claims`, `inferences`, `proof`, `knowledge`, `day.records`, `day.exposure`, relevant `npcs.*.known`; `mission.capture`, `token`; `day.phone`, `employment`, `housing`. New disclosures consume only earned material. Unsupported accusations stay attributed judgments.

### 8. The Price of Being Seen

**Opening:** Helix reception checks the accepted appointment and directs Evelynn to a meeting room. Introduce the executive physically, spatially and professionally. Proposed presence: a senior operator who gives the player full attention and allows an uncomfortable silence to remain. Detailed face, age, name and visual design are unapproved; do not smuggle new art canon into this outline.

**Interaction:** The executive explains a genuine problem: commercial decisions made from incomplete reporting. Offer a brief, explicitly hypothetical case with a missing assumption. The player may question that assumption, request evidence, make a qualified recommendation or decline unpaid speculative work. A small exchange proves what the role would involve; it does not require a new investigation system or secretly test memories of Singapore.

**Approved set-piece structure:** After the legitimate paid meeting, the executive offers entry to a smaller high-status reception. The benefit is a direct introduction to the decision-maker for a possible paid advisory engagement. The price is a defined association with Helix: a spoken introduction as a prospective adviser, with a separately optional photograph and publication on Helix's public event page. No work agreement, testimonial or endorsement is implied by the word “prospective.” The exact caption, audience, placement and authorized use are reviewed before acceptance. No blanket image authorization, exclusivity or intimacy is included. The completed meeting's payment is unaffected by refusal.

**Four approaches:** Embrace the defined introduction and optionally authorize the photograph; negotiate a narrower introduction and no photograph; exploit the opportunity by asking for a specified useful introduction in exchange for a defined association; or refuse the reception and retain the original professional arrangement. Asking for access is not automatically successful: the executive names what he can actually arrange, and the player then accepts or declines those terms. Photography and caption approval are never inferred from attendance.

**Immediate consequence:** Accepted terms are performed on screen. The player crosses the threshold, receives the agreed introduction and can ask the introduced person one relevant professional question. If publication is authorized, show the approved image/caption artifact and confirmed publication. If photography is declined, the executive tells the photographer not to include Evelynn; the narrower introduction is honored. Refusal completes payment/meeting closure and physical departure while the reception continues. Only genuinely missed access is lost. Every approach gives the executive a sourced observation, not a universal psychological score. See Dark Power Escalation for persistent records and reversals.

**Evidence variant:** The player may bring up Glass House evidence only through an explicit choice. No clean audio exists to trade if Sloane owns it. A photograph can demonstrate contact or handover according to its quality. A token is not the wafer and not a confession. Recommend keeping physical transfer outside this first meeting: mentioning possession is already a meaningful disclosure. Helix learns only what is shown or said.

**Transition:** End the meeting and optional reception, retain or reject written terms, and recover screened belongings if any. Before final departure, a request concerning Marcus's referral creates the last power decision. A player who declined the appointment entirely receives the same request through the authorized event relay instead of being forced to attend. The executive does not demand intimacy, exclusivity, future medical changes or a fabricated Singapore performance.

**Existing inputs:** actual offered disclosures from scene 7; `mission.capture.quality`, `owner`, `token`; known historical claims from Marcus/Celeste; visible `clinic.outfit` only if still worn. Previous loadout does not compel today's clothes. Analytical experience can contextualize a question but does not automatically solve the hypothetical or grant business competence.

### 9. The next appointment belongs to you

**Opening:** In the public reception area, the written offer is now concrete. The player can read it away from the executive's immediate presence. A waiting message from Sloane reflects only the information she received; it cannot quote a private meeting automatically.

**Final stretch — Marcus's advantageous interpretation:** The executive office supplies a limited authenticated routing note attributed to Marcus so Evelynn can confirm its scope. For a player who agreed to explore a meeting, its wording may be “Vale has indicated willingness to explore an advisory relationship,” routed internally as an active prospect. It is grounded in a real exchange, but frames willingness to discuss as more settled institutional interest than she authorized. The wording and timestamp must match what actually occurred: a request for information is not assent, and a clear refusal must not become willingness. Marcus confirms authorship and defends the distinction: “I described a conversation worth continuing. I did not say you worked for us.” The record verifies his representation and recipients, not a lie, formal commitment or hidden motive. His credibility depends on the real interaction supporting his formulation.

**Power decision:** Correct the interpretation, demand that Marcus qualify it, let the favorable ambiguity stand deliberately, retain it quietly, share the complete context with Sloane or the unknown sender, negotiate access, privately pressure Marcus, or trade discretion for a concrete concession. Distinguish a fair bargain from a conditional threat. Marcus can amend the note himself, defend it, refuse, restrict a future discretionary introduction or forward Evelynn's actual demand. The question is who controls the interpretation of incomplete information. No automatic capitulation, formal employment or guaranteed dismissal follows; see Evelynn Uses Power.

**Decision/climax:** Accept one bounded next engagement under the original terms, accept the negotiated version, request time to consider, or decline. Separately choose whether to tell Sloane or the unknown sender. Attending a commercial meeting is not a faction oath, personal identity verdict or permanent career selection.

**Immediate consequence:** Acceptance produces a confirmed appointment and the agreed level of access, plus the specific obligation accepted. Negotiation preserves its actual limits. Deferral leaves an offer pending without pretending acceptance. Refusal closes this opportunity and leaves other relationships intact, subject to what was actually disclosed.

**Ending:** On the preferred route, Evelynn leaves with an appointment Sloane did not arrange, something she wants from it, and a boundary another powerful person has honored. On the refusal/defer route, finish with the deliberate decision and its lost or pending opportunity. Do not require enthusiasm or shame the player for declining.

**Hook:** The next engagement would place Evelynn inside Helix by invitation rather than covert assignment. Sloane, Helix and the sender each have an incomplete account of why she might go. The unresolved question is whether the player can preserve the chosen terms when they become valuable. No new omniscient warning, prior-performer reveal or automatic Chapter 4 transition is needed.

**Existing inputs:** original employment/housing/device restrictions; earned evidence custody; earlier disclosure records and NPC knowledge. Chapter-local appointment/terms/disclosure decisions are proposed authored events only; this document does not define or modify a save schema.

## E–F. Proposed facts, canon, claims and mysteries

| Item | Authority/status | What the player may establish | What remains withheld |
|---|---|---|---|
| Sloane decided Adrian would assume the identity two months before play | Existing hidden GDD truth, section 4 | Proposed extract verifies the earlier decision and approving office | ORACLE selection, predicted adoption/control and Sloane's reason |
| Voss can release a limited dated clinical instruction | **New proposed canon** | A specific authenticated patient-record extract, obtained from Voss rather than the sender | No unrestricted personnel archive or anonymous file treated as proof |
| Sender can direct the player to that instruction | **New proposed event**, consistent with existing Rook knowledge | Sender knows a checkable EVE detail | How the sender obtained it; identity, agenda and trustworthiness |
| Sloane withheld this decision when presenting the breach as the immediate problem | Supported comparison after verification | The offered explanation omitted meaningful preplanning | Whether every detail of the breach or operation was prearranged |
| Helix executive office seeks an independent meeting | **New proposed canon/event** | Source of invitation, stated terms, actual delivery and response | Every private reason Helix considers the meeting useful |
| Residential badge entry reaches Sloane's compromise review | **Approved Chapter 3 direction** | Exact access event and report destination; no interior surveillance | Private actions, calls and thoughts not present in that source |
| Defined reception introduction and optional public photograph | **Approved scene direction; specific artifact details proposed** | Actual terms, introduction, publication and recipients | No blanket image rights, loyalty or private identity acceptance |
| Marcus frames an actual discussion as advanced advisory interest | **Approved revised direction; conditional wording to be authored** | Authenticated representation, real source exchange and recipients | No definitive employment/representation assent; ambiguity is not proven fraud |
| Event reception can relay invitations without exposing private contact data | **New proposed logistical fact** | A visible relay and explicit consent to onward contact | No assumption that the guest registry verifies Adrian's biography |
| Marcus/Celeste pass specific observations to the executive office | **New proposed information paths**, variant by encounter | Referral's disclosed source and quoted observation | Their claims do not become objective personality labels |
| Helix honors the agreed attribution limit at this meeting | **New proposed observable behavior** | One useful boundary was respected | Permanent benevolence or guaranteed future autonomy |
| Helix considers Evelynn useful | New belief expressed by its representatives | Actual offers and observed conduct support interest | Interest does not authenticate the prior persona's history |
| Unknown sender was the prior performer | Existing authorial GDD truth | **Not revealed in this chapter** | Prior operative/EVA 0 details and disappearance account |
| Sloane could have stopped the exchange | Existing sender claim | May be questioned, not newly proven here | Operational counterfactual and the full purpose of the evaluation |

Approval should distinguish the new record-access mechanism, invitation/referrals, executive role and commercial opportunity from established facts. The two-month decision is not invented to close a mystery; its proposed reveal is new. No new canonical secrets about Maya are required.

## G. Maya's arc

Maya represents continuity with a person, not a route reward. Her scene asks whether Adrian can remain in a relationship while controlling disclosure. Three equally legitimate directions remain available: rebuilding candor, accepting limited but honest contact, and maintaining distance with a real cost in availability.

Her concern must not make her infinitely available or willing to risk her job. An earlier exposed Voss lookup is a specific reason to set a professional boundary. A missed call is grounds to ask what happened, not evidence of betrayal. A changed voice requires explicit explanation before she understands the underlying identity relationship. An affectionate interpretation inside the protagonist never becomes Maya's attraction.

## H. Voss's arc

Voss becomes useful through precise limits: what she can assess, what she can stop, what she will disclose and what she cannot cancel. Releasing the narrow instruction is a consequential act of clinical disclosure, not proof of innocence or defection. She need not know who prompted the question. Medical care is not conditional on praising the result or promising another stage.

Do not specify new biological procedures, durations of reversal or guarantees beyond established fiction without a separate canon decision. The chapter can end with a requested assessment, continued recovery or no new medical decision.

## I. Rook's arc

Use “Rook” only in author-facing design. The sender moves from assertions to a falsifiable lead, then risks losing the player's confidence by asking for something in return. Proposed small request: confirm whether the date was verified, not send the whole record. The player may refuse even after benefiting from the lead.

Verification earns credibility about one matter. It does not authenticate a complete account or create a debt. If the player does not investigate, Rook must not narrate successful verification. No safe-channel technology, public identity, gender revelation, full EVA 0 history or ORACLE exposition is proposed.

## J. Sloane's arc

Sloane negotiates from still-substantial leverage: monitoring, restricted access, employment history, institutional custody and withheld context. Her first response is practical, not a recap of why the player was the test. She can offer a restricted evidence review or logistical support while requiring an explicit return, such as a report.

If shown the dated instruction, she acknowledges that preparation preceded the breach and argues that preparation does not mean deployment was inevitable. That is her explanation, not a narrator-certified resolution. The player can accept its practical usefulness while distrusting it. She does not need to revoke every opportunity to remain dangerous; she can make dependence useful and alternatives costly without making refusal impossible.

## K. Helix's arc and information firewall

Interest is earned through observed presence and decisions, not only mission success. The executive's organization has a reason to talk to a composed guest, a difficult interlocutor, or a conspicuous observer. These reasons change the meeting's terms and tone rather than awarding identical praise on every route.

| Existing behavior | Proposed legitimate path | Invitation/meeting callback | Forbidden inference |
|---|---|---|---|
| Executive/socialite/shadow presentation | Reception observations, or a participant's direct sight | Professional agenda / personal referral / formal inquiry with less assumed familiarity | Clothing proves competence, attraction or consent |
| Marcus warmth or poised ambiguity | Marcus recounts what was said | More conversational opening, still probing Singapore boundaries | Player remembers Singapore or is loyal to Helix |
| Marcus challenge or silent hand | Marcus recounts a pointed exchange or unanswered greeting | Direct explanation of purpose; less flattering invitation | Awkwardness identifies Adrian |
| Celeste bluff/redirect | Celeste reports the spoken reply, uncertain whether it was evasive | A familiar referral or question about discretion | Bluff becomes authenticated biography |
| Celeste boundary/memory question | Celeste reports the limit or inquiry | Offer avoids presuming friendship; accepts a professional meeting | Executive automatically knows the prior performer secret |
| High scrutiny / conspicuous extraction | Authored event-security report of observed behavior | Meeting uses ordinary visitor controls and explicit agenda; no unsupervised hospitality | Numeric scrutiny is omniscient psychological knowledge |
| Audio, photo or token outcome | **No default Helix path**; actual new disclosure required | After disclosure, recipient reacts to the demonstrated item and its limits | Clean audio is player-owned; monitored photo is secret; token proves transfer contents |
| Supported/unsupported/unresolved source judgment | **Private submission to Sloane** | Can affect Sloane's scene; Helix hears a qualified account only if the player supplies it | Helix praises correct reasoning it never heard |

The referral must be authored with its source before the executive acts on it. Existing save fields are not themselves an information channel. “Confidence” means an attributed interpretation of specific outward behavior; no confidence meter is proposed.

Example of the three existing architectural layers: canonical event — Celeste reported that Evelynn set a conversational boundary; beat projection — the executive offers a written agenda and avoids assuming familiarity; narrator context — the executive places the agenda within reach and says the meeting can stay professional. The narrator does not need Celeste's undisclosed motives, the identity binding or the sender's secret.

## L. Executive recommendation

**Introduce a senior Helix executive, but defer a CEO and a permanent named character sheet.** Marcus is director of strategic acquisitions, so a proposed Group Chief Operating Officer can plausibly sit above him without replacing his role. That title and reporting relationship require approval; they are not established organization charts.

The character's immediate dramatic function is to offer institutional opportunity without demanding obedience to Sloane. Give them a real commercial problem, limited time and the ability to accept “no.” Their demonstrated respect is honoring one negotiated limit. Their danger is the scale of resources and obligations they can concentrate, not a predetermined intimate agenda.

The latest direction describes the executive as male; use he/him in this design without inferring attraction, sexual preferences, romance eligibility or an eventual dependency role. Name, canonical adulthood, visual design and registration remain unapproved. Marcus remains socially dangerous and relevant: a premature professional claim gives him a bounded vulnerability, not general incompetence. Celeste remains an independent sovereign-fund actor, not Helix staff.

## M–N. Climax and ending hook

The climax is the defined public-association offer in scene 8 followed by the Marcus referral decision in scene 9. First the player weighs the price of access; then she decides whether to charge someone else a price for discretion. These decisions do not morally cancel each other out. The player has enough information to negotiate while lacking certainty about the larger opportunity.

The preferred final image is the appointment confirmation beside a message from Sloane: two institutions now want time with the same person, but only one of those appointments was ordered. Do not select the player's reason. Money, information, influence, curiosity or the pleasure of being taken seriously can all be stated choices; none becomes a diagnosis.

For refusal, the final image is the declined offer and the next action the player elects to take. Preserve the lost introduction as a cost, not a failure screen. The hook remains the existence of an outside market for Evelynn's judgment, not a promise that every door stays open forever.

## O. Future trajectory seeds, without route assignment

| Direction | Appropriate Chapter 3 seed | Boundary |
|---|---|---|
| Free Agent | Negotiate terms and retain independent information | One refusal does not establish independence |
| Sloane Operative | Seek support and accept a specific reporting obligation | Cooperation does not establish devotion |
| Rook alignment | Verify a claim, then choose a bounded reply | Learning from Rook does not confer allegiance |
| Corporate Predator | Ask who decides, who pays and who owns the work | Ambition does not imply harming others |
| Celebrity Power | Approve or restrict a defined public association | A public photograph is an enduring artifact, not instant fame or unrestricted publicity rights |
| Adult Entertainment Career | **No direct career seed recommended here**; preserve control of presentation and public image | Do not force an unrelated profession into a commercial scene |
| Executive Companion | Experience valued proximity and a respected boundary | No intimate proposition, attraction fact or dependency commitment |
| Ornamental Dependency | Notice an optional convenience being offered with terms | Enjoying hospitality is not loss of autonomy; no kept-life branch |
| Exploitation / Recovery | Preserve alternatives, question obligations, obtain practical help | No new exploitation incident is required to seed recovery capacity |

Access may later lead to favors, luxury, protection, obligations, expectations, dependency and control. Chapter 3 should demonstrate only the early offer and the player's ability to negotiate it. That sequence is a possible accumulation, never an inevitable escalator. Sexual expression, femininity, fame, luxury and voluntary adult work remain morally distinct from coercion and loss of options.

## P. Continuity conflicts and approval gates

1. **Frozen scope:** GDD v0.2 defers Chapter 3 until slice validation. This request authorizes design, not implementation or a claim that outside testing passed. No baseline changes follow from this document.
2. **Opening location:** The current ending is seated in the waiting car at 19:28, not still upstairs or already home. Debrief and three warnings have finished. Do not replay them.
3. **Employment/housing:** Reconsidered refusal retains termination and the original thirty-day notice. Current state does not store a calendar deadline; future writing must calculate continuity from the original event, not reset it or fabricate an existing deadline field.
4. **Partial endpoints:** No completed adaptation or Glass House performance exists on clinic-stop, cautious or walk-away routes. They receive no automatic Chapter 3 continuation in this proposal.
5. **Custody:** Wafer remains with Benton; token is a separate asset. Audio belongs to Sloane; phone photographs remain monitored. New appointments never transfer an item silently.
6. **Revelation scope:** Two-month preparation is canonical authorial history. A patient extract and Voss's permission to release it are new proposals requiring approval. If rejected, redesign the verification event; do not downgrade an anonymous claim into proof to preserve the scene.
7. **Persona continuity:** Prior Singapore familiarity is not the current player's memory. Marcus/Celeste can know Evelynn without knowing Adrian's binding to the persona. The narrator must not refer to their recollections as “your past.”
8. **Private interpretation:** Home reflection, clinic attention and mirror choices do not become NPC knowledge. Today's outward confidence cannot be derived from hidden investment or identity acceptance.
9. **Medical scope:** Stage One is complete on this route, recovery continues, and later authorization is absent. No new irreversible procedure or instant reversal is implied.
10. **Invitation provenance:** Existing content has no established executive referral, relay permission or Helix access to private reports. Those must be approved and authored as new events before any callback uses them.
11. **Independent interest:** The invitation must actually originate within Helix. Sloane may learn of it and exploit it; secretly making her its original author would invalidate the chapter's central opportunity.
12. **Powerful executive:** Marcus's role allows a superior, but neither COO title nor reporting line exists in current canon. Approve the role before naming, casting or promising a romance trajectory.
13. **New choices versus existing state:** Prior fields support contextual callbacks, not automatic future commitments. Record new terms, disclosures and appointments only in a separately approved implementation; no schema design is included here.
14. **Pacing:** Nine developed sequences are not a promised runtime. Keep optional questions chronological and transitions complete. External slice feedback may change the chapter's emphasis before implementation.

## Dark Power Escalation

**Pacing law: escalate situations quickly; escalate permanent loss of autonomy gradually.** The early badge-log intrusion, middle medical/information boundaries, later Helix reception and final referral decision are spread across the chapter. There is no requirement to make all of them sexual, or to make refusal cost every relationship.

### Controlled — the residential timestamp (scene 2)

- **Participants/power:** Evelynn and Sloane remotely; Axiom controls the restricted access infrastructure. Sloane has the entry timestamp through the newly proposed report path, not room surveillance.
- **Wants, temptation and pressure:** Evelynn wants home to be private and access to remain workable. Sloane wants a completed post-operation accountability record. Convenient institutional support carries invasive oversight. Sloane's rationale is plausible without making every use of the log necessary or justified.
- **Agency and refusal:** Confirm only arrival, question recipients/retention, object, or decline to answer. Refusal leaves an unanswered check-in and a later clarification request; it does not generate a new housing eviction or retroactively revoke the badge. Leaving Axiom's support is not a frictionless option, but staying in the apartment authorizes no new intimate or identity decision.
- **Gain/cost:** Confirmation closes the check-in; it does not newly authorize all surveillance. Asking obtains a precise account of the proposed reporting scope. Neither response erases monitoring already established.
- **Persistent state:** Source access event → report delivery → Sloane knowledge; player reply; any explicit requested limit and actual institutional answer. No agreed ongoing obligation unless the player accepts one. Existing housing dependence remains, without a new arbitrary dependency increment.
- **Future consequence/reversal:** Sloane can later cite the actual reply. Evelynn can retain the scope statement and confront an inconsistent later use; having the statement is not automatically enforceable legal leverage. Seeds Free Agent/Sloane Operative and a concern with who controls records. The character revelation is competent institutional intrusion, not villainous mind-reading.

### Information as a dependency risk — Voss and the sender (scenes 4–5)

- **Participants/power:** Voss controls a bounded clinical disclosure; the sender has selective foreknowledge. The player wants actionable understanding rather than another instruction.
- **Temptation/pressure:** One verifiable date is valuable. The sender asks whether it was confirmed while withholding why that particular fact was chosen. Voss explains the release's limits, not an omniscient conspiracy.
- **Agency:** Request and verify, challenge the sender, share only confirmation, withhold, or defer. Refusal costs this information exchange or leaves the claim unverified; medical care is not withdrawn and Maya is not made collateral.
- **Persistent state:** Extract requested/released, verified or still claimed, actual recipients, any explicit promise to report back. Receipt creates no automatic debt. A promise not made cannot be enforced as a canonical obligation.
- **Reversal/seeds:** The player may ask the sender to explain an omission rather than continue supplying information. Repeated reliance could seed informational dependency; Rook alignment is not morally superior to institutional support. No new sender identity disclosure.

### Tempted — The Price of Being Seen (scene 8)

- **Participants/power:** Evelynn, the proposed male executive, reception staff and a photographer. Helix controls invitations and publication; Evelynn controls approval of her defined participation. Support staff are not new intimate participants.
- **Wants:** Evelynn can want useful access, compensation, recognition or bargaining room outside Axiom. The executive wants an association that makes her interest visible. Do not select the player's motive from a menu approach.
- **Why not walk away:** The offer has real professional value. Walking away is possible; the loss is this reception's introduction, not already earned pay, housing or medical care.
- **Agency/pressure:** A status asymmetry and an attractive conditional offer exist. No sexual threat, involuntary photograph, humiliating refusal or coerced identity adoption is added. The player reviews and can narrow the terms before deciding.
- **Obligation:** If accepted, complete only the agreed appearance/introduction and any separately accepted follow-up. Photo publication needs its own affirmative choice. The executive's feeling that he deserves future loyalty is a belief, not an agreed debt.
- **Persistent artifact proposal:** Record the original authorization event; persona/display name used; exact introduction and caption; permitted image/use; publisher; intended audience; actual publication event/reference; and any limits on reuse. Record delivered introduction separately from approved-but-not-yet-published media. A public association fact exists only after publication; a private/no-photo appearance has a narrower witnessed-event record. No new runtime fields are implemented here.
- **Continuing consequences:** Helix staff who witnessed the event may recognize her. Axiom or Maya learns of a public item only through an authored discovery or disclosure, with its source recorded. They do not automatically learn the underlying identity binding. Approval for one event does not authorize reposts, future campaigns, intimacy or exclusivity. Removing a later publication cannot erase already observed exposure.
- **Reversal:** A retained copy of the agreed limits lets Evelynn challenge misuse. Public recognition can give her independent leverage, while also making discreet work harder. A public association is potential material for future leverage, not automatically a leverage record or proof of wrongdoing.

| Approach | Executive's sourced observation | Possible attributed belief, not universal truth | Immediate response |
|---|---|---|---|
| Embrace | She accepts these specific terms, with photo decision recorded separately | This offer's visibility may be valuable to her | Deliver the agreed access and approved publicity; do not infer limitless appetite |
| Negotiate | She states a named limit and accepts the revised scope | She attends closely to boundaries and control of presentation | Honor the limit visibly, including instructing the photographer |
| Exploit the opportunity | She asks for a particular introduction in return | She is willing to bargain access for access in this instance | Offer a feasible contact or decline it; seek a fresh acceptance of revised terms |
| Refuse | She declines this offer and retains the original meeting terms | This price may exceed what she wants now; reason unknown unless spoken | Close the paid meeting respectfully; the reception opportunity passes |

No response proves attraction, independence as a permanent trait, willingness for intimacy, private identity acceptance or universal ambition. Beliefs cite the observed words/actions and can later be revised.

## Evelynn Uses Power

**Scene 9: Evelynn can control how Marcus's interpretation is received.** His authenticated internal account of a real discussion gives her a bounded opportunity to clarify, endorse or contest it. Marcus wants his assessment of a promising contact to stand; he has a defensible reading of her words, not a fabricated appointment. Evelynn may want access, accurate scope, discretion or an advantage to hold. Her ability to sustain or puncture the useful ambiguity is power beyond self-defense.

The record does not depend on successful Glass House capture. It does depend on an actual Chapter 3 exchange. For an agreed meeting, distinguish discussion from advisory assent; for information-only inquiry, preserve that limited interest. If the player declines or never engages, do not fabricate willingness: a limited routing clarification can record the refusal, with no equivalent leverage guaranteed. The player can request that clarification through the authorized relay without granting Helix a new private address. Such short routes sacrifice the stronger bargaining opportunity rather than being forced into a conversation.

| Player act | Immediate result | Persisting consequence and possible reversal |
|---|---|---|
| Correct / require qualification | Marcus qualifies the note as discussion only, or defends his original wording before agreeing to attach her clarification | Both versions remain attributable; discretion is observable, not proof of loyalty. |
| Let stand | Evelynn deliberately declines to narrow a useful impression, without accepting a formal role | Others may retain the prospect belief; later expectations can require correction. No silent contractual commitment. |
| Disclose accurately | Office, Sloane or the unknown sender receives the selected excerpt with its actual source context | Recipient may interpret it differently; no automatic proof of dishonesty or espionage. Marcus knows only if notified. |
| Trade openly | Offer a legitimate next conversation/introduction while requiring correction regardless | Only mutually accepted terms become an obligation. Marcus can offer a specific meeting; fulfillment and limits are shown. |
| Pressure | State that the accurate discrepancy will be raised unless he provides a particular introduction | Threatened leverage, his actual response, and possible resentment. He can refuse and forward the demand, creating a sourced risk to Evelynn's reputation. No guaranteed compliance. |
| Retain | Keep the note without a demand; optionally clarify only that no commitment exists | Potential leverage remains limited by Marcus's defensible wording. Lost immediate access is a real opportunity cost. |

**Record distinction:** potential leverage = holder, subject, excerpt, authorship source, narrow significance/validity and known recipients; disclosed leverage = target is told what is held; threatened leverage = an explicit conditional disclosure; exercised leverage = the demand/disclosure actually occurs and its result is recorded. Holding the excerpt alone is not a threat. Protective correction creates neither affection nor an enforceable favor. Trading is not automatically blackmail, and a pressure choice is not disguised as ordinary negotiation.

Neither the narrator nor a morality meter labels these choices good or evil. Marcus's words and subsequent willingness to help can express the consequence. If he forwards a coercive demand, the record of Evelynn's own conduct can become another person's leverage. That reversal must use the actual words, not reinterpret a reasonable request as a threat.

## Control Escalation Map

| Dimension | Chapter 3 seed | Possible later escalation | Boundary / reversal |
|---|---|---|---|
| Surveillance | Residential access report reaches Sloane | More explicitly authorized or contested monitoring paths | No omniscience; recorded reporting scope can be challenged |
| Obligation | Specific appearance or follow-up accepted | Repeated favors concentrate access | Gratitude/another person's expectations are not agreed obligations |
| Social control | Negotiation over introduction/image use | Requests about appearance, schedule or companions | A suggestion is not coercion; acceptance has a defined scope |
| Dependency | Useful institutional or Helix support | Alternatives narrow through concrete commitments | No permanent dependency from one reception or gift |
| Information control | Sender selects one checkable truth | Player relies on one gatekeeper for answers | Independent verification and refusing to report back remain possible |
| Isolation | Maintaining Maya contact may expose a relationship through actual disclosures | Competing demands make time/privacy costly | Maya remains an independent person; no automatic threat or removal |
| Corruption opportunities / use of power | Player can pressure Marcus for a benefit | Repeated threats may control others and invite retaliation | Assess acts and harm separately from femininity, luxury, sexuality or identity |

Chapter 3 satisfies the rhythm through one verification problem, the Sloane/Voss/Helix power encounters, the memorable public-association offer, prior Maya and mission callbacks, and a costly outside opportunity. The approved set-piece is the strongest temptation; it is not asked to supply every form of darkness. Permanent loss of autonomy, sexual encounters and broad institutional capture remain unimplemented and unpresumed.

## Adult Scene Opportunities

**Proposed sexual-presentation handoffs: zero; significant dark-power situations: three primary beats plus information-control pressure.** No `ADULT_SCENE_HANDOFF` marker is active in these nine scenes. This is not a delay of adult themes: the chapter now delivers sourced intrusion, tempting public exposure and the player's ability to pressure another person. The approved Price of Being Seen does not require sexual presentation. Its commercial offer remains valuable without sexual participation.

Scenes 2–3 establish private interpretation and relationship boundaries; scenes 6–9 establish independent opportunity and the executive's willingness to honor a limit. Those are useful foundations, not missing adult scenes. None presently establishes the other participant's attraction, willingness, scoped authorization or confirmed eligibility for an encounter. No external presentation is commissioned by this proposal.

If later approved chapter writing earns a handoff, place `ADULT_SCENE_HANDOFF: <stable-id>` immediately after its authored entry commitment and before its authored aftermath. Use the complete dossier in [Adult Scene Handoff Map](ADULT_SCENE_HANDOFF_MAP.md#handoff-dossier-required-before-authoring). A marker must identify one canonical outcome, not grant an external writer permission to select consequences. Refusal or withdrawal with a different outcome requires its own authored outcome; presentation intensity cannot choose it.

Every dossier must specify identity and eligibility, story purpose, referenced entry state, agency per participant and beat, power context, writer-permitted context, separate participant knowledge, required beats, forbidden changes, disclosures, referenced exit state, aftermath and equivalent presentation variants. No dossier is fabricated for Chapter 3 because no encounter is proposed. Later roadmap IDs are reservations for design discussion, not registered production outcomes.

## Rejected / Deferred Adult Opportunities

| Location | Decision | Reason and later gate |
|---|---|---|
| Scene 2: home, mirror and clothing | Rejected as a Chapter 3 adult handoff | Private embodiment already serves the story. Do not reinterpret physical unfamiliarity or enjoyment as sexual intent. The current contract also requires at least two participants; do not invent a partner or extend it for this scene. |
| Scene 3: Maya continuity | Rejected for this chapter; any later relationship development requires separate story approval | Established friendship, private concealed love and professional intimacy do not establish Maya's attraction or willingness. A truthful conversation is sufficient; support must not purchase intimacy. |
| Scenes 1 and 7: Sloane's leverage | Rejected for this chapter | Operational bargaining and institutional pressure are not a romantic invitation. Do not convert cooperation, fear or compliance into consent. |
| Scenes 4–5: Voss and verification | Rejected | Medical care and disclosure must not become contingent on intimate access. Existing characterization provides no such relationship. |
| Scene 5: unknown sender | Rejected | A credible fact does not establish a relationship, safe contact or trust. Do not reveal the sender's identity to manufacture familiarity. |
| Scenes 6–9: executive invitation and meeting | Deferred to Chapter 4 or later, with no promised chapter placement | First establish the executive as a character, canon adulthood, repeated boundary-respecting behavior, genuine mutual interest and meaningful alternatives. The commercial offer and fee cannot depend on intimate participation. See `future.executive.chosen-intimacy`. |
| Marcus or Celeste referrals | Deferred indefinitely | Social recognition and remembered Singapore familiarity belong to attributed history. They cannot authorize intimacy with the current playable character or establish that character's memories. |
| Adult-entertainment career | Deferred beyond Chapter 3 | No professional opportunity, counterpart or chosen career exists in this chapter. A commercial due-diligence meeting is not a pretext to insert one. |

These decisions preserve the main question: what can Evelynn do with opportunity outside Sloane's control? They do not prohibit a later earned relationship, nor reserve any existing NPC for one.

## Q. Do not implement yet

- Any scene, action, gameplay branch, migration, content-version change or runtime state from this proposal.
- New psychology, relationship, reputation, economy, faction, dependency or campaign systems.
- Stage Two, irreversible treatment, reversal gameplay or a new medical simulation.
- Romance, intimacy, adult entertainment, executive companionship or exploitation routes.
- Live AI, image generation, new art canon, voice, telemetry or a distribution package.
- Full ORACLE purpose, its percentages, prior-operative identity, complete EVA 0 history or Sloane's ultimate motive.
- Chapter 4, a new espionage mission inside Helix, or a retroactive explanation that makes every apparent opportunity Sloane's plan.

**Approval boundary:** The residential surveillance beat, Price of Being Seen, authorized persistent publicity, sourced executive beliefs, selective-truth Rook, exposure-dependent Maya vulnerability and usable leverage are approved Chapter 3 direction. Marcus's leverage is interpretation of actual discussions, never fabricated definitive acceptance. Detailed treatment branches, limited patient-record release and executive registration remain design work; no gameplay, new schema or content release is authorized here.
