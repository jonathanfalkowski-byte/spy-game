# QA M2.1E lossless route-aware context compression

M2.1E keeps the M2.1D transition-complete transcript as the source of truth and adds a deterministic wire representation for reviewer context. No story/runtime state, save schema, content revision, or art state is changed. No external provider was called.

## Redundancy profile

The M2.1D packet repeated cumulative knowledge/evidence arrays on every entry, duplicated flattened prose blocks beside `emittedHistory`, repeated NPC observations, relationships/resources and custody, and carried route action/milestone traces alongside the same action metadata in each transition. Assessment/report fields were also repeated when they changed. M2.1E removes the duplicate top-level state mirrors and route action trace while retaining the complete source transcript and every authored history record.

## Compression architecture

`compressionVersion` is `m2-context-delta-v1`. The compressed transcript contains:

- `initialState`: one full represented state snapshot.
- `transitions`: ordered `previousNode`, `action`, `nextNode`, every `emittedHistory` record, and only changed fields.
- `stateDelta`: additions/removals for knowledge, evidence, facts, claims and inferences; NPC knowledge/belief additions/removals; custody, relationship, resource, and assessment changes.
- `checkpoints`: initial, chapter/milestone/reconvergence metadata with a state digest. Full checkpoint snapshots are intentionally not duplicated; the deterministic rehydrator proves each digest.
- `finalState`: the authoritative compact represented state summary.

Action IDs, intents, source, node transitions, emitted history order, and authored text remain available for reproduction, selection and navigation. No prose is summarized or rewritten. Reviewer projections currently return the same lossless packet and cannot remove causal evidence.

`sourceTranscriptDigest` authenticates the complete M2.1D transcript. `compressedContextDigest` authenticates the compressed transcript. The source route ID remains attached to findings.

## Rehydration and regression proof

`rehydrateNarrativeTranscript` applies initial state plus ordered deltas and returns the final represented state. `rehydrateNarrativeCheckpoints` applies the same sequence and verifies each checkpoint digest. Tests cover unchanged state omission, NPC/knowledge/evidence additions, custody, relationships/resources, checkpoint proofs, stable digests, deterministic rebuilds, reviewer projections, and final-state equality.

The invitation regression still carries both records from `maya.invitation → invitation.yes → maya.case`: Adrian’s `“Eight o’clock.”` line and Maya’s response remain ordered in `emittedHistory`, while Maya’s resulting observation is represented in the NPC delta.

## Context measurements

The before column is the M2.1D transition-complete packet from the 14 prepared routes. After is the M2.1E sparse packet generated from the same runtime states.

| Route | M2.1D bytes | M2.1E bytes | Reduction | Reduction % |
| --- | ---: | ---: | ---: | ---: |
| chapter4-julian-professional | 446,574 | 213,104 | 233,470 | 52.28% |
| chapter5-eligible-intimacy | 532,461 | 245,733 | 286,728 | 53.85% |
| chapter5-no-intimacy | 520,329 | 240,350 | 279,979 | 53.81% |
| mission-cautious-investigation | 315,654 | 161,476 | 154,178 | 48.84% |
| opening-analytical-cautious | 42,307 | 30,475 | 11,832 | 27.97% |
| opening-bad-assessment | 40,193 | 28,888 | 11,305 | 28.13% |
| chapter3-home-contact | 345,713 | 173,769 | 171,944 | 49.74% |
| chapter4-independent-public | 484,719 | 226,882 | 257,837 | 53.19% |
| chapter5-public-visibility | 505,551 | 233,908 | 271,643 | 53.73% |
| clinic-privacy-autonomy | 238,731 | 126,361 | 112,370 | 47.07% |
| fuzz-seed-17 | 109,068 | 64,612 | 44,456 | 40.76% |
| fuzz-seed-29 | 56,740 | 36,826 | 19,914 | 35.10% |
| fuzz-seed-41 | 57,195 | 36,781 | 20,414 | 35.69% |
| fuzz-seed-53 | 54,669 | 35,437 | 19,232 | 35.18% |
| **Total** | **3,749,904** | **1,854,602** | **1,895,302** | **50.54%** |

The three requested pilot routes are: opening-bad-assessment `40,193 → 28,915` (28.06%), chapter5-no-intimacy `520,329 → 240,377` (53.80%), and chapter5-public-visibility `505,551 → 233,935` (53.72%) when the pilot risk-signal metadata is included. Chapter 5 exceeds the preferred 40% reduction. The opening route is 1.94 percentage points short of the 30% target; this is recorded as a readiness caveat rather than hidden by dropping evidence.

The compressed opening estimate is `ceil(28,915 / 4) = 7,229` input tokens. With the authorized official smoke ceiling of 3,000 output tokens and the recorded gpt-5.6-sol pricing (`$4/M` input, `$20/M` output), one LOGIC smoke call is estimated at **$0.088916**. The ten-call three-route pilot plan is approximately **$2.350076** in total input/output ceiling cost.

## Calibration preservation

The M2.1D false-positive calibration remains unchanged: `opening-bad-assessment` is `FALSE_POSITIVE` with cause `MISSING_TRANSITION_CONTEXT`; runtime and canon are unchanged. The new record is explicitly versioned:

```json
{
  "contextVersionBefore": "m2-context-expanded-v1",
  "contextVersionAfter": "m2-context-delta-v1",
  "classification": "FALSE_POSITIVE",
  "cause": "MISSING_TRANSITION_CONTEXT",
  "runtimeChanged": false
}
```

## Readiness gate

The compression implementation and offline regression suite are ready for human review. The real OpenAI pilot remains unrun and must receive fresh authorization. Because the opening route is below the requested 30% reduction target, the recommended next step is to approve the current lossless packet with that caveat or perform a bounded format-only optimization before any paid call. External calls: **0**. Spend: **$0**.
