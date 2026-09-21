# EVE QA M2.1G frozen historical issue disposition

Status: **CALIBRATION COMPLETE — HUMAN REVIEW REQUIRED FOR FUTURE FINDINGS**

This QA-only registry closes the opening `LOGIC` calibration loop without changing story prose, reducer behavior, save schema, or authenticated history. A reviewer classification answers whether a finding was correct. A disposition answers what work, if any, is allowed afterward.

## Route authority

Every selected route and narrative context includes `routeId`, `contentRevision`, and explicit authority metadata derived from runtime state:

- `AUTHENTICATED_FROZEN`: authenticated revisions 13–16; historical content and replay are immutable.
- `CURRENT_AUTHORING`: revision 17; current authoring copy is tested deterministically.

The QA layer never infers authority from prose.

## Calibration records

The four human-reviewed opening `LOGIC` records are preserved in `src/qa/m2-calibration.ts`:

| Record | Classification | Cause | Disposition | Revision |
| --- | --- | --- | --- | ---: |
| #1 | `FALSE_POSITIVE` | `MISSING_TRANSITION_CONTEXT` | `RESOLVED_CURRENT` | 17 |
| #2 | `USEFUL_WARNING` | `ACTION_SEMANTICS_AMBIGUITY` | `RESOLVED_CURRENT` | 17 |
| #3 | `TRUE_ISSUE` | `COPY_MECHANICS_MISMATCH` | `RESOLVED_CURRENT` | 17 |
| #4 | `TRUE_ISSUE` | `COPY_MECHANICS_MISMATCH` | `KNOWN_FROZEN_HISTORICAL` | 16 |

Calibration #4 retains its finding, evidence, reviewer classification, historical revision, and no-retroactive-fix reason. Its transcript and context digests are `3b142bdb19dc2d3be7b17768b357cc078019f937fd5611a3da2c00cb37547931` and `068a0bfe66317bccf0b8c78b0c048b3fd356424a04bab19cae6a9eb3c35ad991`. The current-authoring resolution is the corrected sentence: “the records you reviewed and the connections you recorded.”

Calibration #3 remains marked as actionable at the time of review, while its current bug status is now false because the revision-17 authoring copy was corrected.

Frozen findings are not suppressed. A future finding is never automatically treated as this known issue merely because it resembles it; a human disposition record is required.

## Remaining pilot selection

The original ten-call pilot is now represented as one completed calibration call plus nine prepared selections:

1. `opening-bad-assessment` — `KNOWLEDGE`
2. `opening-bad-assessment` — `INVESTIGATION`
3. `chapter5-no-intimacy` — `CONTINUITY`
4. `chapter5-no-intimacy` — `AGENCY_POWER`
5. `chapter5-no-intimacy` — `ADULT_THRILLER`
6. `chapter5-no-intimacy` — `ROUTE_COHESION`
7. `chapter5-public-visibility` — `CONTINUITY`
8. `chapter5-public-visibility` — `ADULT_THRILLER`
9. `chapter5-public-visibility` — `ROUTE_COHESION`

This is a selection artifact only. No provider call was made and no spend was incurred.
