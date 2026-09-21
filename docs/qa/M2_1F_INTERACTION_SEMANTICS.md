# QA M2.1F interaction semantics

M2.1F adds a compact QA registry that explains verified action meaning to M2 reviewers. The registry and Calibration #3 copy correction do not change the reducer, save schema, content revision, or gameplay mechanics. The runtime remains authoritative.

## Verified opening casework semantics

| Action | Runtime meaning | Explicit boundary |
| --- | --- | --- |
| `READ_DOCUMENT` | Adds a source record to `state.documents` and updates derived fact/claim/knowledge state. | Reading is not analytical selection, manual submission selection, proof, or endorsement. |
| `TOGGLE_EVIDENCE` | Adds/removes one already-read record in `state.selected`; at most two are selected. | This selects a pair for relationship testing. It does not control `report.documents`, exclude unselected records, or endorse a claim. |
| `CONNECT_EVIDENCE` | Adds an inference/connection for the selected pair and may add derived knowledge. | It does not prove the theory or change attachment state. |
| `REVIEW_ASSESSMENT` | Sets `state.draft` and enters `helix.review`. | Review is not submission, permanent locking, or objective truth. |
| `SUBMIT_ASSESSMENT` | Creates the report, sends it to Benton, records recipient observations, and enters `helix.submitted`. | The current reducer copies **all** `state.documents` to `report.documents` and all accumulated inferences to `report.connections`; there is no separate per-document attachment control. |

The distinction is structural:

`READ_DOCUMENT` ≠ `TOGGLE_EVIDENCE` (read versus select for connection)

`TOGGLE_EVIDENCE` ≠ attachment selection (analysis selection versus submission)

The context contains one definition per action type represented in the route. It does not include the unused global registry.

## Live calibration record #2

The latest `opening-bad-assessment → LOGIC v1` finding is retained as a human calibration record:

```json
{
  "classification": "USEFUL_WARNING",
  "cause": "ACTION_SEMANTICS_AMBIGUITY",
  "runtimeBug": false,
  "copyIssue": "possible",
  "copyIssueDetail": "The submitted-scene wording implies explicit attachment agency that the current runtime does not provide.",
  "route": "opening-bad-assessment",
  "reviewer": "LOGIC v1"
}
```

This finding is not silently deleted or treated as a runtime contradiction. The prior `FALSE_POSITIVE / MISSING_TRANSITION_CONTEXT` record remains in the M2.1D calibration history.

## Live calibration record #3

Runtime inspection confirmed that the opening route's `LOGIC v1` warning identified a real copy/mechanics mismatch. The reducer has no explicit attachment-selection action: submitting copies every reviewed record in `state.documents` and every recorded connection in `state.inferences`. The previous prose said the player chose what to attach, which overstated player agency.

```json
{
  "classification": "TRUE_ISSUE",
  "cause": "COPY_MECHANICS_MISMATCH",
  "reviewer": "LOGIC v1",
  "route": "opening-bad-assessment",
  "runtimeBug": false,
  "storyLogicBug": false,
  "copyBug": true,
  "confidence": "confirmed by runtime inspection"
}
```

The minimal prose correction now says: `Your selected conclusion remains in it, with the records you reviewed and the connections you recorded.` The assessment review labels likewise describe reviewed records and recorded connections included with submission. No control, action, reducer behavior, save field, schema, recipient rule, or attachment mechanic was added.

## Copy/mechanics regression coverage

- `tests/qa/m2-copy-mechanics.test.ts` drives the real opening reducer through reading all four records, selecting two for analysis, recording a connection, reviewing, and submitting. It asserts that `report.documents` equals all reviewed documents, `report.connections` equals all recorded inferences, analytical selection remains separate, and the submitted scene uses the factual wording without the former manual-attachment implication.
- `tests/browser/assessment-attention.spec.ts` checks the review dialog communicates `Reviewed records included:` and that recorded connections are included with submission.

## Semantic-misinterpretation fixture

The deterministic mock fixture claims: “Only selected evidence should be attached to the submitted report.” The fixture retains the finding and labels it `SEMANTIC_MISINTERPRETATION` when the supplied `TOGGLE_EVIDENCE` semantics explicitly say that selection does not control report attachment. This is a QA classification for calibration; it does not auto-classify live findings.

## LOGIC v1 calibration metrics

The first three human-reviewed findings were recorded as **3 reviewed**, **1 TRUE_ISSUE**, **1 USEFUL_WARNING**, **1 FALSE_POSITIVE**, and **0 INSUFFICIENT_EVIDENCE**. Calibration #4 is appended below; these are calibration counts only and no generic quality score is inferred.

The records remain:

1. `FALSE_POSITIVE / MISSING_TRANSITION_CONTEXT` (Calibration #1)
2. `USEFUL_WARNING / ACTION_SEMANTICS_AMBIGUITY` (Calibration #2)
3. `TRUE_ISSUE / COPY_MECHANICS_MISMATCH` (Calibration #3)

## Human classification metrics

`summarizeHumanClassifications` tracks, by reviewer, only:

- `reviewedFindings`
- `trueIssues`
- `usefulWarnings`
- `falsePositives`
- `insufficientEvidence`

No aggregate story score is calculated, and no classification is inferred automatically.

## Future design observation

**NOT IMPLEMENTED — OWNER DESIGN DECISION REQUIRED LATER:** explicit attachment selection could create meaningful information control, omission, disclosure, recipient-knowledge, leverage, deception, and custody consequences. It would also add UI/state complexity, save-schema implications, branch testing, and recipient-knowledge complexity. Current behavior remains all-read-documents attached.

## Context-size check

The interaction definitions are included only for action types used by a route. The opening casework route therefore receives the five definitions above; routes without those actions receive an empty object. After the copy correction, the opening pilot packet measures **40,193 → 31,662 bytes** relative to the M2.1D expanded baseline, a **−8,531-byte / 21.23%** delta, or **7,916 estimated input tokens**. Compared with the M2.1E pilot packet (28,915 bytes), the semantics and corrected copy add 2,747 bytes (9.50%) while preserving the complete transition evidence. The current three-route pilot plan measures `chapter5-no-intimacy` at **520,329 → 243,114 bytes** and `chapter5-public-visibility` at **505,551 → 236,672 bytes**. The ten-call plan is **1,777,428 context bytes / 444,359 estimated input tokens**, with a one-call LOGIC ceiling of **$0.091652** and a ten-call maximum of **$2.377436** at the recorded planning rates. These remain materially below the expanded packets while retaining all authored transition history. Refresh these deterministic measurements if registry wording changes.

External calls: **0**. Spend: **$0**. This work remains uncommitted and unpushed for human review.

## Frozen historical disposition (Calibration #4)

The fourth opening `LOGIC` calibration is retained as a human-reviewed finding:

```json
{
  "classification": "TRUE_ISSUE",
  "cause": "COPY_MECHANICS_MISMATCH",
  "disposition": "KNOWN_FROZEN_HISTORICAL",
  "actionableCurrentBug": false,
  "legacyIssue": true,
  "historicalContentMutable": false,
  "currentAuthoringFixExists": true,
  "contentRevision": 16,
  "transcriptDigest": "3b142bdb19dc2d3be7b17768b357cc078019f937fd5611a3da2c00cb37547931",
  "contextDigest": "068a0bfe66317bccf0b8c78b0c048b3fd356424a04bab19cae6a9eb3c35ad991"
}
```

The identical transcript and context digests prove that this run exercised the authenticated frozen opening content. The finding, evidence, classification, historical revision, and reason for the no-retroactive-fix decision remain visible. The reporting disposition prevents it from being counted as unresolved current-authoring work; it does not suppress provider findings and does not auto-match future findings.

The four-record calibration registry is `src/qa/m2-calibration.ts`. Classification and disposition are separate dimensions. Current metrics are **4 reviewed**, **2 TRUE_ISSUE**, **1 USEFUL_WARNING**, **1 FALSE_POSITIVE**, **0 INSUFFICIENT_EVIDENCE**, with **1 KNOWN_FROZEN_HISTORICAL** disposition. No reviewer quality score is calculated.

Narrative contexts and selected-route report metadata now carry explicit route authority derived from runtime `contentRevision`: revisions through 16 are `AUTHENTICATED_FROZEN`, while revision 17 is `CURRENT_AUTHORING`. This is route metadata, not an inference from prose. The current-authoring copy regression remains deterministic and asserts `the records you reviewed and the connections you recorded`.

The opening-bad-assessment → `LOGIC` calibration is **COMPLETE**. The remaining pilot selection is prepared but not run: opening `KNOWLEDGE` and `INVESTIGATION`; chapter5-no-intimacy `CONTINUITY`, `AGENCY_POWER`, `ADULT_THRILLER`, and `ROUTE_COHESION`; chapter5-public-visibility `CONTINUITY`, `ADULT_THRILLER`, and `ROUTE_COHESION` (nine calls).
