# EVE implementation and validation record

2026-09-22. Story integration is complete. Opening art stopped at the approved bounded-failure condition; the visual-completion gate remains incomplete.

## Result

The reviewed story package contains 86 editorial entries, covering the opening through Chapter 5. All 86 integrated entries match the design-approved package exactly. The static audit accounts for 175 authored scene definitions in 33 sequences. The three pilot sequences were reviewed before expansion.

Revision 18 provides the new wording at the presentation boundary. New games start on 18; authenticated older saves keep their version and existing continuation behavior. The raw story records and historical fixtures are retained. Save schema remains 5. No new encounters, social routes, Chapter 6 scenes, migrations or automatic upgrades are part of this pass.

Opening-art completion remains blocked at 12/20 visible screens. The one authorized Adrian pose correction failed review, so dependent art stopped as the approved plan required. This is not a 20/20 completion claim. Spend was 2 credits in this implementation attempt, 4/16 including the earlier attempt; 12 credits remain under the ceiling.

## Validation

| Check | Result |
|---|---|
| Source inventory and package comparison | PASS: 175 definitions mapped once; 86 reviewed entries match integration exactly. |
| Independent opening-to-Chapter-5 traversal | PASS: ten routes, 164–171 actions each, all reach `chapter5.complete` on revision 18. |
| Equivalent-choice mechanics | PASS on those routes: NPC knowledge and beliefs, relationships, proof, facts, claims, knowledge, choices, documents, report, day, clinic and mission state match historical counterparts. |
| Current-version replay and save/load | PASS on those routes at Chapter 4 and Chapter 5 endpoints. |
| Maya branch comparison | PASS: 36 relationship/invitation/disclosure combinations; branch-specific prose, revised response, unchanged mechanics and save/load. |
| Broad repository regression suite | Controlled run: 478/481 pass across 53 files; all timeout failures cleared. The remaining three stale art assertions were corrected against preserved approval records; both affected files then passed 8/8 tests. No unresolved failure remains from that run. |
| Desktop/mobile live player, historical 17, exact opening coverage | PASS: independent six-test run, then portable repository checks plus the corrected apartment-HOLD fixture, 7/7. Exact revised Daniel, home/surveillance, Julian Chapters 4–5, fade choices, positive old-17 wording, reload bytes and all 20 opening positions verified at 1440px and 390px. |
| References, typecheck, production build, diff check | PASS. Manifest: 24 approved PASS records; six conflicting/nonpassing records excluded. Original HTML/DOCX references unchanged. Final banner change also passed the desktop/mobile pilot pair, 2/2, after a fresh typecheck/build. |
| Dirty-work preservation and final Git status | No baseline file missing. Unrelated art/design files and the narrow journal screenshot retain their task-start hashes. Branch/HEAD unchanged; no commit, push, reset, stash or clean. |

The independent route set covers public/non-Julian play, professional access followed by fresh interest, personal intimacy, instrumental intimacy without sex, mixed motive, withdrawal, flirtation only, false-authority backfire, intimacy refusal and uncertainty. These are ten routes inside one independent test case, not ten separate test cases. A second test checks 36 Maya combinations: friend/love/colleague × yes/maybe/no invitation × Voss/contradiction/private/nothing disclosure, with the required personnel evidence actually reached. Results are saved in `eve-independent-route-validation.json` and `eve-maya-branch-validation.json`.

The default broad run initially produced 14 timeout failures; the controlled run used two workers and a 30-second test timeout and cleared all of them. The three remaining art expectations predated the story pass: HEAD already contained four Harbour approvals, the current coverage already listed seven records, and a negative canonical-reference fixture lacked the new production schema requirements. Tests now verify the existing exact shot states and reject an actual approved production asset as a canonical identity reference. Approval records and runtime art were not loosened or changed for the tests. The old apartment inspection test also expected an invented mirror shot ID while the resolver correctly held the room master; that assertion now names the actual master shot.

Additional local QA reported by EVE Code: self-check 13/13; fast/story passes with zero replay divergences or dead ends and 10/10 golden routes. These do not establish exhaustive branch coverage. The production build retains a large-chunk warning (about 10.11 MB minified / 3.33 MB gzip); this pass does not claim an optimized network-load budget.

Final screenshot review found a technical Chapter 3 continuation banner on fresh revision-18 runs. The banner is hidden only for that new version and exact message; the authenticated feedback and old-version behavior remain intact. The targeted desktop/mobile recheck passed 2/2, including unchanged raw save bytes after reload.

## Editorial read and limits

Complete selected sequences were read without skipping their intervening passages: the opening; Chapter 3 home, surveillance and evening contact; Chapter 4 invitation, private encounter and aftermath; and Chapter 5's personal route through the apartment ending. Instrumental and mixed-motive encounter/aftermath variants and the non-Julian ending were also compared in order. The three pilot packages were reviewed with their alternative responses in source.

This is not a claim of an uninterrupted read of every possible complete game. Unread in full combination: every initial Maya bond crossed with every invitation/disclosure/refusal; all clinic stop/profile/presentation paths; every Glass House lead, timing and capture permutation; all Chapter 3 appointment/opportunity/truth combinations; every Chapter 4 public/professional/interest arrangement; and all Chapter 5 spending, Aster licensing/proof, workspace, messages and presentation combinations. Automated route or state checks do not substitute for an editorial read of those combinations.

## Companion records

- `eve-scene-editorial-audit.md`: sequence purposes, knowledge, emotional turns, unresolved pressure, relevant choices and precise source inventory.
- `eve-editorial-change-record.md`: every approved before/after edit and reason.
- `eve-reviewed-editorial-package.json`: the reviewed 36-entry pilot and 50-entry expanded package.
- `eve-continuity-and-next-design.md`: fixed presentation issues, remaining knowledge semantics, deliberate decisions and the social/Chapter 6 backlog.
- `eve-opening-art-residual.md`: eight residual screens grouped into reusable compositions, failed-pose evidence and spend.

Canonical checkout: `C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design`. Baseline branch: `story/chapter-3-design`; baseline HEAD: `ba027c6597c22f006a24d2767a1d2d300c325f09`.
