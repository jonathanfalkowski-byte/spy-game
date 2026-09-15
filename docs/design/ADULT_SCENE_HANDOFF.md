# Offline adult-scene presentation contract

Implemented scope: production metadata and pure validation only. No production encounter, prose generator, provider, runtime selection, image generation or game-state transition is installed. `productionOutcomes` is empty. Save schema remains **5** and content version remains **9**. No migration is needed.

## Authority and reuse

The game owns truth. A writer supplies presentation only. The pipeline is:

Authenticated committed state → trusted authored outcome and projection policy → immutable AdultSceneSpec → external draft intake → local editorial review → approved presentation asset → future authored aftermath.

The final runtime integration is deliberately absent. Importing, reviewing, publishing metadata and rereading text never execute a reducer action. Future integration must select already-approved assets and enter aftermath through the existing guarded authored engine. Reading or skipping an asset must not duplicate consequences.

The contract reuses the existing character/persona IDs, character-canon adulthood test, save/replay authentication, sourced NPC observations, narrative projector and read-only consequence rules/views. Node IDs retain the existing closed scene registry. Offline outcome/asset IDs are separate production identifiers; adding one does not register a playable scene. Visual IDs are optional metadata references only; this module neither resolves nor generates images.

## Trusted outcome and entry/exit references

`OutcomeContract` contains canonicalOutcomeId, outcomeVersion, sceneId, sceneVariantId, entryNode, aftermathId, participants, authoredFacts, sources, entryState, exitState, requiredBeats, requiredFacts, informationDisclosures and presentation delivery plans.

`sources` maps bounded local reference IDs to:

- A committed ledger event.
- An exact sourced NPC knowledge/belief observation.
- A player knowledge key and its verified first acquisition event (zero means initial knowledge).
- An existing derived leverage or consequence record.
- An existing authored consequence-rule ID.
- An explicit fact in this trusted authored outcome contract.

Event, knowledge, leverage and consequence references are checked against authenticated replay. Unknown references and future knowledge events fail. Authored future agency/disclosure facts are explicit authoring declarations, not discoveries in the current save. Rule references identify existing rules; they neither invoke rules nor assert that effects already occurred. Entry/exit arrays are reference IDs, not editable state paths. The game must eventually supply the real authored transition before any production scene can be integrated.

The entire normalized outcome is hashed using deterministic key ordering and SHA-256 and then recursively frozen. Its version and hash identify the exact approved canonical outcome. No arbitrary prose is parsed to extract effects.

## AdultSceneSpec

Required fields:

- contractVersion, sceneId, sceneVariantId, specificationVersion, specificationHash.
- canonicalOutcomeId, outcomeVersion, outcomeHash.
- Authenticated node, revision and ledger hash binding.
- Participants with stable character IDs, optional presented persona IDs, display names and verified adulthood.
- WriterPermittedContext and separately selected ParticipantKnowledge.
- Ordered AgencyContext per beat and required beat directions.
- Required fact/disclosure references, entry/exit reference boundaries and aftermathId.
- Mandatory forbidden changes, doNotReveal directives, presentation delivery plan and language.

Optional fields: location, time, tone, scenePurpose, styleBibleVersion, writerNotes, continuityReferences, visualAssetSpecIds, sceneIllustrationIds, expressionIds and wardrobeIds. These remain bounded and subject to review.

The specification has a 96,000 UTF-8 byte limit. All schemas reject unsupported fields. A workspace pins an authenticated state, trusted outcome and policy; its verifier compares against the exact specification it issued. Self-recomputing a tampered specification hash does not make it acceptable. To validate against updated canon or policy, the editor must use a workspace constructed from the **current trusted inputs**, not keep using a superseded workspace. There is no global registry update service in this slice.

## Identity and adult eligibility

Participants use stable character IDs. A presented persona does not create another relationship subject. `player-character`, persona `evelyn`, display name **Evelynn Vale** remain distinct concepts. Presentation is permitted only when established by the existing player presentation selector. There is no global name-to-person resolver.

Every participant must resolve to exactly one trusted canonical character with established adulthood. Unknown age, a presented/cover age, missing character data or a minor blocks handoff creation. Writer input cannot establish adulthood. The exported eligibility receipt confirms the check without automatically copying biography. Age eligibility establishes neither willingness nor authorization.

The minimal character/persona presentation pair is a production direction, not proof of historical identity ownership, private acceptance or another participant's knowledge of that association. Biography, historical records and NPC observations are never automatically exported because a persona is present.

## Writer context versus participant knowledge

WriterPermittedContext contains explicit selected facts, the existing bounded narrator projections and visible power directions. Fact visibility distinguishes `writer-only` from `may-reveal`. A private fact may guide portrayal without being revealed in prose. Prefer behavioral direction over hidden motivations. Do not automatically copy leverage records, relationship meters, canon secrets or objectives.

ParticipantKnowledge is a bounded **entry snapshot**, selected per character. It only accepts that character's exact sourced observations, or verified player knowledge acquisitions for player-character. Beliefs retain their belief layer. Writer facts cannot be inserted into participant knowledge. Omitted records mean unexported/unspecified, not that the character knows nothing.

Authored informationDisclosures separately identify sender, recipients, beat, fact reference and fact-versus-attributed-claim status. They describe planned knowledge delivery inside this outcome; they do not change current participant knowledge or saves. Future engine logic must own those updates.

Backing source references stay inside the authoring workspace, except expressly granted participant knowledge records. Entry, exit, agency and writer fact IDs refer to local aliases, not exported complete power records. Authors must choose non-revealing aliases. Context filtering checks grants and sources, not the literary meaning of an author's direction.

Mandatory non-disclosure controls cover ungranted identity associations, undisclosed leverage sources, secret objectives and treating unverified history as biography. Authors may add restrictions but cannot remove the defaults. A specifically prohibited fact cannot also be an authored disclosure. Editorial review must enforce non-disclosure in the returned prose; schema validation cannot detect every implication or spoiler.

## Agency and interaction classification

Every ordered beat supplies a separate AgencyContext for each participant. Fields are:

- Willingness: unknown, willing, unwilling or conflicted.
- Authorization: unknown, not-granted, granted or revoked, with scope and source.
- Refusal and withdrawal: independently established or not established.
- Observable participation: unknown, none, observing, participating or compliance.
- Pressure sources: pressure, coercion, threat, blackmail, authority, leverage or dependency, with source and known recipients.
- Optional sourced-context fear and resistance descriptions; neither is inferred from participation.

Classification is authored per beat: unspecified, mutually-willing, pressured, compliance-under-leverage, refused, withdrawn or coercive. It is not a morality score, permanent character property or generated psychological inference. Authors and editors remain responsible for consistency between classification and context.

Current authorization cannot coexist with expressed refusal or withdrawal in the same beat. After revocation/refusal/withdrawal, renewed authorization requires a distinct authored source, including across intermediate unknown states. No field carries forward implicitly: every participant needs context at every beat. Compliance can coexist with unknown willingness; pressure creates no attraction or relationship consequence. This is an offline representation, not an interaction mechanic.

## Variants and essential information

The sceneVariantId chooses a canonical outcome. `fade_to_black`, `mature` and `explicit_external` choose presentation only. The last label enables no generator and contains no explicit sample content.

All presentation variants issued for an outcome share its hash, entry/exit references, disclosures, agency and aftermath. Each has its own specification hash and needs separate approval. Every disclosure requires one declared delivery route. If its scene beat is omitted, delivery must use surrounding dialogue, aftermath or an approved summary reference. It cannot point back into the omitted scene beat. The specification includes the authored fact summary needed to retain the information.

This structural check does not prove the prose actually includes that summary. Editorial review must check that a fade or localization has not changed or lost meaning.

## External draft intake

AdultSceneDraft accepts only sceneId, variantId, specificationHash, canonicalOutcomeHash, presentationVariant, prose, ordered beatCoverage assertions, writerMetadata, and optional warnings/continuityNotes. There is no approval or state-change field. Unknown nested fields are also rejected.

Draft intake is capped at 160,000 UTF-8 bytes and 120,000 prose characters. IDs, hashes and variant must match the current issued specification. Coverage must name every required beat once, in order. **Coverage is a writer/editor assertion, not verified semantic compliance.** Structurally valid prose can still be rejected for narrative contradictions.

Returned text is inert plain text. No Markdown/HTML execution, imports, tools, URLs, state paths or effect commands are interpreted. A future renderer must escape text; this slice does not render it.

## Editorial authority and approved assets

Intake returns `draft`. A separate local editorial desk submits it for `review`. An explicit reviewer decision changes that review to `approved` or `rejected`. Neither a draft nor a serialized receipt can approve itself. Publication checks the desk's own authoritative review registry, not a caller-supplied status string.

Approval binds exact UTF-8 prose hash, full draft hash, specification hash, outcome hash and outcome version. Editing prose, writer metadata, specification, outcome content or outcome version requires a new review. Asset ID/version pairs are immutable once published. Approved records include local text locator, source, language, variant, canonical outcome identity/version, specification hash, prose hash and approval ID.

Local paths are restricted to `narrative/approved/.../*.txt`; path traversal, arbitrary file extensions and remote URLs are rejected. These are metadata locators, not file-system writes or reads. Validated text must match the approved draft. No draft prose is placed in saves.

The editorial desk is an in-memory trusted local capability. It does not authenticate human identity over a network, cryptographically sign reviewers, or persist approvals across process restarts. A new desk rejects an old serialized asset/approval until an explicit trusted review workflow recreates approval. Durable editorial storage/import is a future toolchain step; accepting arbitrary approval JSON would bypass the boundary. Tests' reviewer identities are fixtures, not actual content approvals.

## Non-graphic example and test isolation

The automated fixture uses two fictional adult labels in an isolated catalog, reusing existing stable ID types solely to exercise the architecture. It is not an encounter for those production characters. Maya is not a participant. No new character ID or production fact is registered.

Example sequence: private conversation → non-graphic fade marker → authored withdrawal acknowledged → information/aftermath boundary. The test asserts an attributed statement about a fictional archive opening time. Fade delivery preserves that statement through an approved summary reference. No intimate actions or graphic prose are written. Additional classification checks alter structured test metadata only, not sample scenes.

The engine's existing source records are used to test exact reference authentication and non-export of hidden power records. Fixture agency and fictional intelligence are declared only in the test outcome. They create no production canon, relationship effects or save changes.

## Verification

Tests cover canon adulthood and persona-age rejection; writer/participant knowledge separation; sourced knowledge; hidden identity/power filtering; temporal withdrawal and distinct renewed authorization; compliance without willingness; pressure without attraction; presentation equivalence and omitted disclosure delivery; strict malformed/unknown/state-mutation payload rejection; stale specification and outcome changes; exact approval hash invalidation and forged approval rejection; state immutability across import/review/read; and exact replay of all review saves.

Full state/routes, browser tests, TypeScript/build, frozen content and original references remain validation gates. Runtime adult-scene selection, writer/provider integration, mature-content mechanics, image generation and production editorial content remain outside this implementation.
