# EVE ART M1 — reconciliation, delivery and validation

20 September 2026. Branch `story/chapter-3-design`, HEAD `3d774d7f73a323f08886d4c34932284ff14029c3`. **Zero paid generation; zero credits; no production promotion, runtime binding, commit or push.**

M1 delivers the [Axiom office production package](AXIOM_OFFICE_PRODUCTION_PACKAGE.md), its [chronology](../../art/staging/opening/axiom-office-m1/chronology.csv), [shot matrix](../../art/staging/opening/axiom-office-m1/shot-family.csv), two local staging diagrams and the [current visual-status registry](ART_M1_VISUAL_STATUS.json). The registry is documentation, not a competing runtime manifest or an approval mechanism. Existing image bytes are unchanged.

## A. Current status reconciliation

| Measure | Current inspected records |
|---|---:|
| Owner-approved production records | 21 |
| PASS records eligible for current manifest | 16 |
| Explicit binding IDs, including excluded home assets | 18 |
| Manifest assets with a binding | 13 |
| Distinct assets with reachable exact states in the approved catch-up audit | 12 |
| Eligible assets without bindings | 3 |
| Bound asset blocked by current C5 predicates | 1 |

The 12-asset reachability count comes from the approved catch-up's legal-path audit, reconciled against unchanged art resolvers/manifest in M1. It is **not** a claim that a fresh full-game traversal passed after concurrent engineering changes. The later scene-art fixture failure below limits that verification. Original production approvals, source file hashes and binding identities were rechecked. This task introduces no new player-visible asset.

`ART_M1_VISUAL_STATUS.json` contains every production record's exact ID, classification, original approval, review notes, manifest inclusion, shot IDs, source path and checked hash. It also records the mirror, retired Adrian direction and diagnosed registry errors.

## B. Five excluded home images

All five are **PRODUCTION_ACCEPTED_WITH_KNOWN_POLISH_ISSUE** under the requested vocabulary. This describes the explicit existing owner acceptance, not a new PASS or runtime authorization. The 2026-09-16 approval in each record says “put them in the scenes” and expressly accepts all six displayed images despite retained review notes. Calling them unapproved would contradict that evidence.

| Exact production ID | Retained issue | Current runtime result |
|---|---|---|
| `apartment-pre-glasshouse-executive-v1-production` | Right shoe clipped; figure larger than post-return version | Excluded by REVISE filter |
| `apartment-pre-glasshouse-socialite-v1-production` | Scale/head height differs; closed pumps versus post-return sandals | Excluded by REVISE filter |
| `apartment-pre-glasshouse-shadow-v1-production` | Fitted skirt/prominent buckle versus later flared skirt/narrow belt | Excluded by REVISE filter |
| `apartment-post-glasshouse-socialite-v1-production` | Open-toe shoes and scale differ from pre-departure | Excluded by REVISE filter |
| `apartment-post-glasshouse-shadow-v1-production` | Flared skirt/narrow belt differ from pre-departure | Excluded by REVISE filter |

Some notes are continuity issues, not merely cosmetic. This classification does not waive them. Review decisions, approvals, manifest policy and image bytes remain untouched. A separately scoped policy/repair decision is needed before these can pass the current eligibility filter. The sixth, post-Glass-House Executive, remains **PRODUCTION_ACTIVE** for its exact initial state.

## C. Three unbound eligible assets

All three receive **INTENTIONALLY_UNBOUND** as the M1 disposition: preserve them without inventing an exact scene. This does not claim their historical omission was deliberately designed.

| Asset | Reason to retain without automatic binding |
|---|---|
| `eve-bg-sloane-office-continuity-v2` | Approved daytime environment, not a complete character/meeting-state composition; no exact shot binding exists |
| `c5-s02-shopping-street-master-v1-production` | Approval covers retail architecture, storefront/window, daylight, pavement and camera; does not establish selected appearance, purchases or people |
| `c5-people-night-apartment-master-v1-production` | Approval covers bounded night-lighting treatment; does not approve every occupant, outfit, possession or evening arrangement |

No replacement master should be commissioned before reviewing these scopes. No binding was added here.

## D. Bound but unreachable Chapter 5 entry

`c5-s01-daytime-apartment-anchor-v5-production` / `c05.s01.shot01`: **UNREACHABLE_BY_CURRENT_STATE**, not missing art or missing approval.

- `src/content/chapter5.ts:41–43`: `chapter5.begin` sets `c5.wardrobe=c05.daytime` and `c5.axiom-location=carried`.
- `src/ui/chapter5-beats.ts:15–24`: `homeReaderPacketBeats5` rejects any truthy `c5.axiom-location`, so the legal entry cannot select its reading beat.
- `src/ui/scene-art.ts` independently requires `c05.professional` and `c5.presentation=professional` for generic `c05.*` shots. Its non-Aster/non-phone location check expects `chapter5.room`, not `chapter5.home`.

Fixing only the first predicate is insufficient. Do not clear actual custody, counterfeit a saved choice or weaken the generic checks. A future integration repair needs a separately bounded home-shot predicate with positive legal entry and negative later-state cases. No runtime or save change was made here.

## E. Mirror normalized status and provenance

| Property | Recorded status |
|---|---|
| Existing M2 staging composition | **OWNER APPROVED** |
| Framing concept, camera relationship, reflection blocking concept | Approved for planning/staging only |
| Final bathroom environment / plate | **NOT APPROVED** |
| Final Adrian layer | **NOT PRODUCED / NOT APPROVED** |
| Final mirror composite / runtime asset | **NOT APPROVED / NOT BOUND** |
| Production promotion | Not authorized or performed |

The owner explicitly confirmed prior human approval of the displayed existing composition. The [receipt](../../art/staging/opening/mirror-blocking-v1/receipt.json) records that source, the date this clarification was recorded, the former pending status/scope and original receipt hash. It does not invent a date for the prior human review. Original diagram, method, source hashes, dimensions and spend remain unchanged. `role=staging-diagram` remains; this is **REFERENCE_ONLY** planning authority.

The separate final-art candidate `apartment-opening-insert-mirror-v1` remains staging/pending, with no generated file or approval. Its disposition is **REVISE_BEFORE_RUNTIME**, because final environment/layer/composite work is still required. Spec, opening plan/backlog, Adrian authority and both current authority indexes now distinguish concept approval from final-art approval. Earlier dated snapshots are labeled historical rather than rewritten into production approval.

## F. Original failing tests: causes and corrections

**Registry accounting — REGISTRY_ERROR, corrected.** `CHAPTER_5_COVERAGE_AUDIT.json` marked `c05.s01.shot01` MISSING despite an approved production record. Its totals reflected six production shot IDs and three runtime bindings; the test expected an even older four/three/4% snapshot. Current data has **seven approved exact shot IDs**, **seven authored bindings**, and **six reachable assets**. The two environment-only C5 records are not seven additional exact shots.

Updated the current registry and `art/production/chapter5/coverage.json` binding metadata only. Prior summary/status/binding values are retained in named M1 historical snapshots. The existing 100 raster/artifact-ID denominator yields **7% of indexed IDs with at least one approved exact variant**, not all-branch coverage and not 7% of playtime. This denominator is a legacy index measure, not a complete unique-image budget. No asset approval, public image, manifest, runtime source or state was changed.

The registry test now matches the real `shotBindings`, requires all seven approved records, checks original image hashes/public copies, derives the indexed percentage, and explicitly distinguishes the blocked home shot from six reachable states. It does not remove the approval/hash requirements or count unbound masters as exact shots.

**Standalone Adrian provenance — REGISTRY_ERROR in test membership, corrected.** The original `adrian-opening-full-body-v1` and `adrian-opening-full-body-v2-outpaint` receipts both use `promptVersion=eve-cast-scenes-v1`, but they are custom `image_editor` jobs, not entries in the 65-member cast pack. `buildPackRequest` rejects their Adrian IDs and cannot reconstruct their standalone prompts from that plan. Adding fake historical pack entries or relabeling the receipts would misrepresent provenance.

The test still reconstructs prompts/settings for every one of the **65 real pack members**, checks original file hashes and staging/no-approval status, and rejects unknown outsiders. For exactly the two standalone IDs, it compares catalog parsing to the preserved raw receipt and pins a SHA-256 fingerprint of the entire generation object as decoded by the existing JavaScript UTF-8 reader (prompt, settings, sources, model, task/call/asset IDs and cost included). Their image hashes remain checked. The source receipt file was independently confirmed byte-identical to the pre-M1 baseline; no encoding cleanup, prompt modification or fabricated regeneration occurred. These fingerprints protect the preserved evidence; they are not independent proof of a provider-side charge.

The assets themselves remain retired staging references and are not approved body, identity or framing authority. `adrian-canon-identity-v1` is **SUPERSEDED** for new direction; V2 controls Adrian's bounded face authority.

## G–Q. Office package delivery

The [package](AXIOM_OFFICE_PRODUCTION_PACKAGE.md) contains all requested physical chronology, geometry, character/prop layers, investigation support, Maya continuity, shot-by-shot reuse, cost assumptions and coverage arithmetic. Key corrections to the older backlog:

- Adrian is standing for Daniel and Benton's arrival, not already seated.
- The first file wakes on the deposited **slate**, not the terminal; transmission later uses the terminal.
- The elevator endpoint does not establish Adrian already standing at his desk.
- Maya's visit final state divides two cups between desk and hand. Deflect moves only Adrian's cup; Maya leaves with hers.
- Reviewed records and recorded connections accompany the submitted conclusion; current UI does not offer a separate attachment picker.

One physical camera supports A desk wide and B workstation crop; no office C angle is required. Proposed directions/dimensions are not canon. Six character pose sources plus one empty environment yield **seven minimum likely paid outputs**, with three named optional contingencies rather than automatic retries. No live cost quote, model commitment, authorized output or generation exists.

Nine potential office states collapse 11 mapped IDs through holds. After future approval and integration, a normal opening could see **10** distinct states, **10–12** with optional apartment inspections, plus one optional deflect prop-state change. These are conditional planning counts, not current coverage. Intermediate multi-action node cuts remain excluded. Full scene generations planned: zero.

## R. Validation and preservation

- Initial check reproduced the two reported failures: **24 passed, 2 failed** across five art test files.
- After correction: **16 passed** across `audit-art-registry`, `visual-pack`, `visual`, and `visual-production` tests. Both original failing tests now pass.
- `scene-art.test.ts` subsequently failed during fixture setup at **Invalid evening choice begin-followup at nightComplete**. After additional concurrent frozen-content edits, the final five-file run advances farther but fails at **Unavailable Chapter4 choice begin at departure**, through `tests/chapter4-helpers.ts:65–70` / `tests/chapter5-helpers.ts:31`. Final result: **16 passed, 10 skipped, one failed suite**; its 10 scene-art tests do not run. This is not suppressed, counted as a pass or repaired by this art task. Do not claim a clean full art suite or fresh full-path validation.
- Reference check: **PASS**; both frozen reference source files unchanged.
- Canonical manifest check: **PASS**, 16 approved PASS records / five excluded. No manifest generation mode used.
- Typecheck: **PASS** after the two test updates. No integration or save types changed.
- `git diff --check`: **PASS**; new text artifacts checked separately as untracked files.
- Local diagrams inspected visually as planning boards. No production-resolution character/composite review is claimed. No browser/build or paid smoke run was performed.
- Preservation check compares pre-edit tracked/untracked hashes; original image bytes, all production `records.json`, standalone Adrian receipts, manifest, art resolvers, save/schema files and smoke helper remain unchanged by M1. New package/source hashes and output receipt hashes are verified.

Concurrent external edits detected during M1 include `src/content/scenes.ts`, `src/ui/Casework.tsx`, the `src/persistence/legacy-v13`, `legacy-v14` and `legacy-v15` `content/scenes.ts` files, `tests/browser/assessment-attention.spec.ts`, `docs/qa/M2_1F_INTERACTION_SEMANTICS.md`, `docs/qa/M2_1_REAL_REVIEW_PILOT_PLAN.md` and `tests/qa/m2-interaction-semantics.test.ts`, plus new `tests/qa/m2-copy-mechanics.test.ts`. They were preserved, not authored or staged here. The two opening submission wording changes were incorporated into this package's current-source chronology. No attribution of the fixture failure to a specific concurrent edit has been proven.

### Files changed by M1

Existing art files: mirror diagram receipt; mirror staging spec; opening staging record; Adrian authority; current authority Markdown/JSON; opening plan/backlog; Chapter 5 coverage audit and production coverage metadata. Existing tests: `tests/state/audit-art-registry.test.ts`, `tests/state/visual-pack.test.ts`.

New art files: this report; `ART_M1_VISUAL_STATUS.json`; `AXIOM_OFFICE_PRODUCTION_PACKAGE.md`; `art/staging/opening/axiom-office-m1/` (chronology, shot matrix, structured spec, two diagrams, deterministic renderer and receipt). Review-only baseline/verification evidence lives outside the implementation checkout under the task's `review-results/art-m1-2026-09-20` directory.

## S–T. Human review and next asset

Review the proposed office geometry/camera and authority limits first. Cast portraits remain pending reference choices; coat/posture visibility must be resolved if later framing exposes them. After approval, obtain a current quote for **one empty `axiom-opening-office-master-v1` candidate**, preserving a usable B crop and no branch-sensitive props. Review the plate before any character layer.

Existing home filter acceptance, C5 home reachability, and the new fixture setup failure remain separately bounded integration/engineering issues, not reasons to buy replacement art. Roadmap remains opening spine → C4 shared spine → C4 variants → C5 non-Professional equity → C6+.

**Stopped for human review. No commit or push.**
