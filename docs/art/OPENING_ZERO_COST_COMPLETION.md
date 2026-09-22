# EVE opening visual completion — 22 September 2026

**19/20 playable screens now illustrated; 1 remains blank. Zero provider calls, zero credits.** Five deterministic M5 desk composites fill six previously blank screens, and the approved Daniel, Benton, Maya and Adrian-alone exact-shot compositions now cover the opening through its final authored state.

The referenced conversation showed 5/20 visible. The actual checkout baseline was 6/20, including Office Arrival. The current checkout is 19/20. Required cinematic CUT coverage is **14 runtime-approved, 0 component-only, 0 staging, 1 missing**. Both completion gates remain red solely for the genuine residual gap.

## Remaining new-art groups

| Reusable group | Missing shot(s) | Playable screens | Minimum useful new material |
|---|---|---:|---|
| Maya visit and departure | `opening.maya.shot01-coffee`, `opening.maya.shot02-departure` | 4: promotion, invitation, case, goodbye | Maya conversation and departure poses with her own cup; one retained desk cup. Shared Adrian office layer. Conversation composite HOLDS for three screens; departure is a distinct CUT. |
| Adrian alone | `opening.office.shot04-alone` | 1 | Adrian sipping the retained cup after Maya leaves; reuse M5 and the cup design. No Maya or second cup. |

**Five final compositions, four reusable character packages, no new office environment required.** Share Adrian across the Daniel/Benton/Maya/alone composites; request only the necessary pose variants. Maya needs conversation and departure variants. Multi-pose source sheets may reduce generation jobs, but this is not a promise that four outputs will satisfy every pose. No generation has been requested or priced.

Why these cannot be truthfully filled with the present approved pixels: the approved opening apartment and M5 plates contain no figures; existing Daniel/Benton/Maya scenes are staging candidates, the standing Adrian V1 is REVISE for orientation, and the seated attempt is REJECT. Old Adrian references cannot restore superseded body/identity direction. Later Lantern and Chapter 5 production assets depict different locations, wardrobe, identities or props. A room HOLD across a new participant would violate the CUT contract; a silhouette or staging preview would not complete these shots.

## Audit of all 20 playable screens

| # | Reached state / reader beat | Mode | Runtime result |
|---:|---|---|---|
| 1 | apartment.bond | CUT | Approved apartment master |
| 2 | apartment.reply | HOLD | Same apartment master |
| 3 | apartment.departure | HOLD | Same apartment master |
| 4 | commute.arrival / approach | CUT | Approach V2 |
| 5 | commute.arrival / security | CUT | Security V2 |
| 6 | commute.arrival / office arrival | CUT | Office Arrival V1; live verified |
| 7 | commute.arrival / Daniel waiting | CUT | Approved Daniel shared-HOLD production composite |
| 8 | office.daniel | HOLD | Same approved Daniel shared-HOLD production composite |
| 9 | office.benton | CUT | Residual Benton composite |
| 10 | office.departure | CUT | New zero-cost file/desk composite |
| 11 | helix.brief | CUT | New zero-cost slate close-up |
| 12 | helix.documents | CUT | New zero-cost casework composite |
| 13 | helix.analysis | HOLD | Same casework composite |
| 14 | helix.review | CUT | New zero-cost review crop |
| 15 | helix.submitted | CUT | New zero-cost terminal crop |
| 16 | maya.promotion | CUT | Approved Maya coffee medium composition |
| 17 | maya.invitation | HOLD | Same approved Maya coffee medium composition |
| 18 | maya.case | HOLD | Same approved Maya coffee medium composition |
| 19 | maya.goodbye | CUT | Residual Maya departure composite |
| 20 | ending.complete | CUT | Approved Adrian-alone sip composition |

Optional lease/medical inserts remain approved and action-specific. Mirror/jacket inspection paths already HOLD the apartment master and are not blank screens in this 20-state denominator; no staging inspection artwork was promoted.

## Implemented zero-cost coverage

Production files: `art/production/opening/axiom-casework-{file,brief,documents,review,submitted}-v1-production.png`, with identical public copies. Each exact shot has a production record, manifest entry, descriptive alt text, and a reached-node guard. Documents/analysis share one image; the other four action transitions have distinct crops and hashes. Old casework frames are rejected at wrong nodes, including Maya entry and premature submission.

The source remains unchanged and component-only: `axiom-opening-office-master-v1-production`, SHA-256 `eae37d43e13e8e6203ffe59ec4c2c1dc047cce5149e6933e83a051bfa5388566`. Only new reviewed derivatives enter runtime. The current user's zero-cost completion instruction authorizes these composites; no separate human image review is claimed.

The neutral slate is a local polygon overlay; no generative fill, borrowed staging pixels, characters, coffee, readable evidence, result, clock, or recipient display is added. The game UI remains the source of case and submission information. These are object-focused coverage images, with limited fine detail from enlarged M5 crops, not new character scenes.

Reproduction: `scripts/build-opening-casework.py` writes review outputs under `work/opening-casework-reproduction`; it does not overwrite production. Recipe, all source/output hashes, crop rectangles, polygons, authorization and review are in `art/production/opening/axiom-casework-zero-cost-receipt.json`.

Office Arrival production, public and staging-source bytes all match SHA-256 `38a7de40c13fc4547617db6b400d613d05c5c59e4868982b7f58a58f460f235d`. Exact binding: `opening.axiom.shot03-office-arrival`. It renders at 1920×1080, holds during rereading, and clears at Daniel.

The owner-approved Daniel-focused shared-HOLD composite is promoted for the exact `opening.office.shot01-daniel` shot and its `office.daniel` HOLD. Production and public bytes are identical at SHA-256 `f87f6f3e19fa1474012e5311744e284feb12f3775f0ec2e55e12026c0d0c2e49`; the approved crop keeps Adrian off-frame until `Approach your desk`. It is not a canonical Daniel or Adrian identity master.

The owner-approved bounded Benton medium composition is promoted only for `opening.office.shot02-benton`. Production and public bytes are identical at SHA-256 `31BF3790D753B7A5568A674F08E089CD44E8EDA092A1FABD00853C24D38E6481`; Benton holds the corrected blank slate, Daniel is absent, Adrian is off-screen, and the medium crop makes no full-figure or footwear claim. It does not bind the later file, Maya or ending beats.

The delegated design-approved bounded Maya medium composition is promoted only for `opening.maya.shot01-coffee` across `maya.promotion`, `maya.invitation` and `maya.case`. Production and public bytes are identical at SHA-256 `43863FC23F89DD0294C255163FD8AD4B9E5BFAC293B53D3B372F743D4295691B`; Maya faces off-screen Adrian, holds her own cup, and the retained slate and Adrian cup remain outside the crop. It does not bind Maya departure or the Adrian-alone ending.

The delegated design-approved bounded Adrian-alone sip composition is promoted only for `opening.office.shot04-alone` at `ending.complete`. Production and public bytes are identical at SHA-256 `CE5B367250DB5E0A0C32F1686999924168C23E208B9CB0F00F9C16DAB5366DE3`; Adrian holds the single retained cup at his lips, the slate remains on the desk, and no sitting or full-body authority is claimed. It does not bind Maya departure.

## Validation and preservation

- **39 focused tests / 8 files PASS:** resolver, runtime eligibility, opening coverage, occupancy, reading beats, all-20 genuine reducer-state checks, provenance, visual catalog and art registry.
- **5 browser tests PASS:** all 20 reached states; current/historical arrival traversal; live Approach → Security → Office Arrival → Daniel; loaded production images, no staging URLs, no page/HTTP errors, unchanged save bytes during reader navigation.
- **Manifest check, typecheck, production build and git diff --check PASS.** The existing large bundle warning remains.
- Both release completeness commands still fail exactly their intended incomplete-coverage assertion; other checks pass. No gate or story/save rule was relaxed.
- **Daniel/Benton/Maya/Adrian integration follow-up:** focused state and browser checks cover the Daniel HOLD → Benton CUT → file CUT path, Maya’s coffee CUT/HOLD family and the final Adrian-alone ending. The production/public bytes for all four exact-shot assets are hash-identical and load through the runtime manifest.
- Fixed two catalog validation defects encountered during required checks: M6 receipt-only metadata now stays outside the strict asset spec; three existing source files now have pending staging provenance entries so production edit-source references resolve. No source gained approval or runtime eligibility.
- Initial browser validation caught a transient root 404 while a simultaneous build replaced `dist`; rerunning against a completed build passed all states. The test now requires HTTP 200 and a visible scene heading before checking an intentionally absent art pane.
- Baseline hashes recorded before this pass's mutations. No baseline file was deleted. Changes were confined to this pass's listed files plus separately observed Office Arrival edits from the active visual task. Staging originals, receipts, M5, unrelated story/Chapter 5 work and dirty files were preserved; no reset, stash, clean, commit or push.

Canonical checkout: `C:\Users\Admin\Documents\Codex\2026-09-14\files-pasted-by-the-user-we\outputs\eve-chapter-3-design`.
Branch: `story/chapter-3-design`; HEAD: `ba027c6597c22f006a24d2767a1d2d300c325f09`; remote: `jonathanfalkowski-byte/spy-game`.

Changed/added by this pass: opening production registry and five images/public copies; zero-cost receipt/reproduction script; `src/ui/opening-casework-art.ts`, `src/ui/scene-art.ts`, approved manifest; `src/visual/catalog.ts`, staging source-records; opening test fixtures, coverage/browser config, focused resolver/eligibility/coverage/catalog tests; this report. Existing Office Arrival integration belongs to the concurrent visual task.

Screenshots are saved with the task report in C:/Users/Admin/Documents/Codex/2026-09-22/referenced-chatgpt-conversation-this-is-an-2/outputs/.
