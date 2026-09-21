# M2.1H Human Classification and Context Hardening

This checkpoint records the owner-approved human review of the completed M2.1
pilot report and the QA-only context changes that prevent scene metadata from
being mistaken for missing story transitions. It does not change story/runtime
behavior, save schema, frozen historical content, or approved art.

## Pilot accounting

The report contained nine planned and attempted calls. Eight completed and one
was incomplete. The incomplete call was `chapter5-public-visibility` /
`ROUTE_COHESION`, with `INCOMPLETE_RESPONSE` caused by `max_output_tokens`.
It used 57,544 input tokens, 3,000 output tokens, 1,350 reasoning tokens, and
60,544 total tokens, for an estimated `$0.290176`. It was not retried.

The raw completed findings are preserved in
`M2_REMAINING_PILOT_CLASSIFICATIONS`. There are nine findings, six
`TRUE_ISSUE`, three `FALSE_POSITIVE`, zero useful warnings, zero insufficient
evidence, five unique issue families, and four unique true-issue families.

| Family | Findings | Human disposition |
| --- | ---: | --- |
| `MAYA_BENTON_KNOWLEDGE` | 1 | `ACTIONABLE_CURRENT` |
| `BENTON_READ_SEMANTICS` | 1 | `NEEDS_DECISION` |
| `ATTACHMENT_COPY_MECHANICS` | 1 | `KNOWN_FROZEN_HISTORICAL`; deduplicates calibration-4 |
| `EVELYN_DISPLAY_NAME` | 3 | `NEEDS_DECISION` |
| `CHAPTER5_NEXT_DAY_CONTEXT` | 3 | false positive caused by missing scene-place metadata |

## Context correction

Narrative context now carries the entered scene title and place once per
transition, plus the current scene metadata. The authenticated revision-16
route therefore exposes both `15:00 · An invitation for tomorrow` and
`The following day · Apartment`. CONTINUITY and ROUTE_COHESION instructions
must inspect those fields before reporting a missing overnight or location
transition. The authenticated regression asserts both values and classifies a
mock missing-next-day report as `MISSING_CONTEXT_FALSE_POSITIVE`.

## Dependency audits

### Maya / Benton knowledge

The current reducer still records Maya's `helix_assignment` as `known` at the
existing observation point. A trial change to `belief` altered the authenticated
rev13 replay and failed the replay digest/state match, so it was reverted. The
current source search found no gameplay read that depends on
`maya.known.helix_assignment`; a safe correction therefore requires a
versioned/current-authoring compatibility design rather than a direct reducer
edit. No story change is made in this checkpoint.

### Benton `read_*` semantics

`read_<document>` is written when a document is read at the current document
reader and also when submission copies reviewed documents into Benton's report.
The latter action proves receipt/attachment, not that Benton read each record.
No current gameplay read of the literal Benton keys was found. Do not rename
historical keys until the owner chooses one semantic model: separate
`received_<document>`/`attached_<document>` keys, or a real authored read event.

### Evelyn / Evelynn display name

The stable identity id is `evelyn`; the current canonical renderer returns
`Evelynn Vale`, while authenticated historical prose and records still contain
`Evelyn Vale`. The three pilot findings are one display-name family. The safe
candidate is a display-only compatibility layer keyed by the stable id, with
frozen stored text, hashes, debug archives, and historical replay untouched.
It requires a focused string-matching audit before implementation. No rename is
made here.

## Pilot reporting hardening

The remaining-pilot summary now computes highest severity as `NONE` for an empty
finding set and otherwise returns the highest ranked finding. The official
OpenAI provider uses a 4,500-token ceiling only for `ROUTE_COHESION` calls whose
estimated input is at least 50,000 tokens; all other reviewers remain at 3,000.
The generic/offline provider remains unchanged. This is planning/request
hardening only; no provider call was made.

## Review boundary

No OpenAI call was made. No external call, credit, commit, or push occurred.
The existing pilot helper and all unrelated art/design/story work remain
uncommitted and unpushed for human review.
