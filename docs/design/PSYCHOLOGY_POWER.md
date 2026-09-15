# Psychology and power: first read-only consequence slice

Status: implemented architecture only. Save schema **5**, content **9**, no migration.
Ruleset: `helix-consequences-v1`. Nothing in this module is imported by the gameplay reducer or narrative renderer. Existing choices, prose, outcomes, saves and identity contracts remain authoritative.

## Pipeline and authority

Committed ledger event → exact authored rule → sourced consequence → directional relationship/power view → optional bounded visible beat.

`deriveConsequences` authenticates the input through the existing save/replay pipeline, then evaluates rules against consecutive replay frames up to the requested revision. It never uses the final snapshot to fill an earlier view. Results are detached, disposable projections; they must never be written back to saves. Rule changes require review and ruleset versioning, not rewriting historical gameplay.

Every effect identifies its event, rule, actor, affected character, kind and supporting records. IDs are deterministic event/rule/slot IDs. No text classifier or generic action-category psychology exists. Exact authored keys and source records gate these rules.

## Exact rules

| Rule ID                         | Existing trigger and source                                                                          | Consequence                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `maya.voss-disclosure.trust`    | `disclosure.voss`, Maya's received personnel match                                                   | Maya → player-character trust **delta +1**                         |
| `maya.checkin-kept.trust`       | `morning.answer` for the arranged 06:30 call, delivered call record                                  | Maya → player-character trust **delta +1**                         |
| `maya.checkin-missed.trust`     | `morning.miss` for that arranged call, Maya's attempted check-in                                     | Maya → player-character trust **delta −1**                         |
| `maya.withheld.concern`         | `disclosure.nothing`, existing attributed belief about withholding concern                           | Maya → player-character suspicion **signal**, no intensity         |
| `sloane.warning.leverage`       | First Sloane introduction response, delivered warning incident record and Sloane's sourced knowledge | Sloane-held leverage concerning Maya, directed at player-character |
| `sloane.voss_lookup.leverage`   | Same introduction exchange, displayed 12:14 lookup log and Sloane's sourced knowledge                | Independent Sloane-held lookup leverage concerning Maya            |
| `sloane.retained-file.callback` | Identity attention choice enters `sloane.offer`; existing retained-file callback                     | References earlier threat; no new exercise or psychological effect |

Only the three selected changes in legacy `mayaTrust` are mapped. Each rule verifies the exact source delta. Their sum is **mapped change**, not the legacy total and not an absolute relationship level. Morning replies, promotion responses, invitation acceptance and other trust increments remain unmapped in this slice. Credibility, Voss trust, mission scrutiny, relationship interpretation and private reactions remain unmapped. They do not silently become suspicion, loyalty, attraction or identity acceptance.

The value contract explicitly distinguishes `delta-only` from `absolute`. No current rule authors an absolute value. Unspecified dimensions and baselines remain absent; there is no midpoint or reverse relationship. The schema reserves bounded absolute levels without assigning them. A signal is a sourced observation, not an absolute or delta intensity.

Example: disclosing the personnel match produces one +1 effect with the action and Maya's received knowledge as sources. The view is Maya → player-character, trust `{mode: 'delta-only', mappedChange: 1}`. Nothing establishes player-character → Maya trust or either person's attraction.

## Power, provenance and knowledge

Leverage records identify holder, subject, related character, supporting information, validity, transitions and separately sourced knowledge. The basis describes the information's significance: an intercepted warning involving Maya or her directory lookup. Both are observed incident records, **not proof of wrongdoing**. These records are authoritative within this derived ruleset; there is no leverage meter.

Statuses are `available`, `disclosed`, `threatened`, `exercised`, `exhausted`, `invalidated`. Creation means only available information. It initializes no knowledge recipients. Explicit knowledge effects and status effects supply subsequent facts. This slice's authored office exchange establishes possession, disclosure and threat together, so their separate transitions share one event. There is no invented earlier Sloane possession interval.

Example: the delivered warning creates exposure in Security's log. That alone creates no Sloane leverage. When her office exchange displays the log and threatens investigation, the derived record gains available → disclosed → threatened transitions, plus separate Sloane/player-character knowledge effects. Maya knows her received warning, not automatically Sloane's threat. The later retained-file callback references this record. Mission acceptance, refusal and treatment stops do not prove that this particular threat was exercised, exhausted or invalidated.

The lookup's fictional 12:14 timestamp does not backdate player knowledge: its source event is the office reveal. No other route inherits this source just because Maya exists or Adrian privately cares about her.

## Character, persona and information firewall

Endpoints are stable **character IDs**, never names or persona IDs. The subject `player-character` persists while Evelynn Vale is presented; legacy persona ID `evelyn` remains unchanged. That permits Evelynn's playable character to remain the affected subject without converting appearance into identity acceptance. Marcus recognizing the Evelynn persona does not authorize access to the underlying binding or these relationship records. There is no global name lookup.

Canonical derived view: Sloane holds a sourced, threatened incident record; explicit recipients know about it.

Beat projection: an engine grant names the exact current node/revision, NPC and at most three approved consequence IDs. Only the authored concern, displayed-threat and retained-file callback beats are eligible at their designated nodes. Private quantitative trust, ownership-only effects and arbitrary prose are not eligible.

Narrator context: for the retained-file callback, only “The incident material concerning Maya remains in Sloane’s file.” is passed through the existing bounded projector. No leverage record, numerical change, supporting record, hidden motive or player/persona binding is copied. Normal narrator context remains empty of consequences unless an explicit grant is provided. Empty grants add no beats. Malformed, duplicate, oversized, stale, wrong-character or unsupported grants fall back to authored behavior. This helper is not wired into runtime rendering and accepts no model-authored effects.

## Future interaction semantics — documentation only

- Consent: specific affirmative authorization within an interaction's scope; not inferred from silence or presentation.
- Refusal: rejection of the proposed interaction; distinct from emotional dislike.
- Compliance: observable cooperation, which does not establish willingness or consent.
- Pressure: an influence attempt with an identifiable source and circumstances.
- Coercion: threats or constrained alternatives; compliance under coercion must not be recast as freely given agreement.
- Willingness: a separate internal disposition, unknown unless appropriately established; never inferred from attraction or outward performance.

No structures or mechanics implementing these semantics exist in this slice. No compromise, corruption, romance, consent/compliance, AI or visual-generation system has been added.

## Verification and deliberate limits

Tests cover directional changes, unspecified dimensions, delta-only semantics, source paths, rejected actions/rereading, exact review-save replay, provenance, separate leverage knowledge, threat versus exercise, earlier prefixes, malformed snapshots, bounded grants and normal-context exclusion. Existing identity tests cover persona recognition without binding disclosure. Full state/route, browser, TypeScript, build and frozen/reference checks remain release gates.

This is a selected mapping, not a complete psychological model. Canon does not establish absolute trust, suspicion intensity, whether Maya learned the office threat, or whether Sloane later enforced that specific threat. No such gaps are filled. Supporting records establish what was received/displayed, not the truth of Sloane's allegations. The full view is engine-private; callers must use the bounded projection rather than serializing it to a narrator.
