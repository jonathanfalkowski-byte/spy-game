# Cinematic reader UI pass

Review date: 2026-09-17. Branch: `story/chapter-3-design`. Starting HEAD: `6ef6f68ad1690d0ddaf9f94c5f152171b2491670`; revision-17 implementation baseline: `198feada20cc15aa47d6e64f37149079efe187a4`. Save schema remains **5**. Implementation is uncommitted; no push, generation, promotion, story change or Chapter 6 work.

## A. Original UI architecture

`App` owns the existing reader, local display preferences, saves, navigation and modal controls. `Narrative` formats narration, thoughts and dialogue. `ClinicConversation` presents accumulated exchanges across later chapters. The visual catalog under `src/visual` is an offline production/authoring system containing reference and staging records; it was deliberately unreachable from runtime imports.

Art was fragmented: six home images selected by `homeSceneArt`, two Harbour images embedded inside `Chapter5BeatSequence`, and the final apartment image rendered after the prose. Home selection constructed paths; Chapter 5 used carefully guarded helpers and authenticated historical prefixes, but no shared stage or catalog-derived runtime approval gate existed. Opening candidates were staging only. These findings were reported before implementation.

## B. Changes made

- Added `SceneArtStage`, one compact runtime approval manifest, explicit shot/asset bindings, and a state-aware resolver.
- Moved the current image between the time/location eyebrow and scene title. Preserved main/left-column architecture, fonts, choices, journal, history, preferences and save controls.
- Reused authored Chapter 5 reading beats and exact branch guards. Lifted their cursor to reader-local state so the stage and prose advance together.
- Separated the completed mission recap carried into the first illustrated Chapter 3 home scene into an expandable **Previous scene** disclosure. Other incoming entries remain visible because they may contain the action establishing the new shot, including Chapter 5 phone placement. Original text and history remain available; no prose is rewritten.
- Added two previously unbound, passing production assets where exact state permits: preparation-suite garment view and Maya/Adrian Lantern conversation.
- Added build-time manifest/hash validation, developer diagnostics, unit/browser regressions and an opening backfill audit.

## C. Scene-art stage behavior

The stage contains one image, with its authored shot ID and catalog asset ID exposed as data attributes for authoring tests. Intrinsic dimensions preserve the original ratio and reserve space while decoding. Images are never cropped, stretched, animated or made full-screen. A failed image request collapses the stage and leaves the story and choices usable. No production-status text or large blank frame is shown to players.

Typography, restrained dark styling and tap targets remain. The stage width follows the reading column; it has no fixed viewport height. The title is slightly smaller in illustrated scenes, with reduced spacing to keep image and prose together. Text-only scenes receive restrained eyebrow/spacing adjustments.

## D. Shot resolver and production bindings

`scripts/reader-art-manifest.mjs` reads only the three production record sets offline. It requires **production role + approved status + approval evidence + PASS review**, verifies original SHA-256 values, and exports a small `src/ui/approved-scene-art.json`. Static public copies are hash-checked by the build. Runtime never imports the full visual catalog, generator receipts, staging specs or provider code.

The resolver maps explicit authored IDs to explicit asset IDs. A filename is a published field of an eligible catalog record, not a search criterion. `homeSceneArt` is retained only as the established eligibility/alt-text helper; its constructed filename is not used by the new renderer. All current eligible shot assets are mapped; unbound or contradictory records fail closed:

| Production record(s) | Reader disposition | Exact state / reason |
|---|---|---|
| `apartment-post-glasshouse-executive-v1-production` | Bound to `home.post-glasshouse.shot01-executive` | Treatment complete, executive outfit, initial Chapter 3 home before its inspections/actions |
| Other five apartment production records | **Blocked by review-status conflict** | Older owner authorization explicitly accepts them despite retained REVISE notes. Latest UI instruction explicitly forbids rendering REVISE assets; approval/history metadata was not altered to bypass that rule. Exact branch bindings exist but return no image. |
| `eve-bg-wardrobe-continuity-v2` | Bound to `clinic.wardrobe.shot01` | Preparation-suite garment view before choosing/changing into an outfit; does not persist into makeup/dressing |
| `eve-scene-maya-evening-continuity-v2` | Bound to `evening.lantern.shot01` | In-person meeting only; hold through disclosure/closure dialogue. Excluded from apartment/video call and all goodbye/touch/departure variants. |
| `eve-bg-sloane-office-continuity-v2` | **ASSET_WITHOUT_VALID_SHOT** | Approved empty environment authority. The intro explicitly places Sloane at the window and Adrian beside the chair; an exact character composition is absent. Do not use an empty wide to stand in for that encounter. |
| `c5-harbour-evelynn-julian-composite-v2-production` | Bound to `c05.s06.shot12-entrance` | Authenticated professional preview/coffee route, after reading Julian's authored arrival |
| `c5-harbour-julian-departed-composite-v1-production` | Bound to `c05.s06.shot15-departed` | Same authentic route, after the authored departure; same approved environment and Evelynn/coffee state |
| `c5-s12-shot05-phone-composite-v2-production` | Bound to `c05.s12.shot05-phone` | Exact completed purchased-phone placement state, with existing exclusions intact |

Inventory reconciliation: **12 production records = 6 usable bound assets + 5 review conflicts + 1 unbound location master**. Manifest contains the 7 approved/PASS records; it does not load their image bytes. No staging PASS result is treated as production approval. No Chapter 5 coverage is promoted or expanded.

## E. Branch safety and art/text synchronization

- Existing exact home/outfit, treatment and inspection exclusions remain. A different outfit never borrows the passing executive image.
- Harbour eligibility replays the authenticated prefix around the actual coffee action. Current/final flags cannot impersonate earlier Julian presence. Before arrival and after returning inside, missing shots collapse instead of holding a misleading exterior.
- Local reading order remains `shot14-wait → shot12-entrance → shot15-departed → shot13-return`. Reload safely starts at the first reading beat; the cursor is deliberately not saved. A different immutable story snapshot invalidates the cursor. Previous/next reading controls cannot mutate the story ledger.
- Final-apartment eligibility still requires professional presentation/outfit, purchased/unboxed personal phone on table, Axiom phone home/on table, jacket in wardrobe, offer declined and the authenticated `want-none` action. Publication, event photo, outing, authorization and intimacy states exclude this bounded composition.
- Optional opening inspections follow their actual action. Thought/dialogue choices hold the latest inspection; they do not invent a return-to-room movement. Major unillustrated transitions retain their authored IDs as backlog diagnostics.
- Developer inspector and testable validation expose **SHOT_WITHOUT_APPROVED_ASSET**, **ASSET_WITHOUT_VALID_SHOT**, **WARDROBE_MISMATCH**, **PROP_CUSTODY_MISMATCH**, **LOCATION_MISMATCH**, **FUTURE_STATE_VISUAL**. Diagnostics are authoring information, not player-facing failures.
- Some frozen prose nodes contain several actions. This pass does not invent new subcuts to disguise missing art; the opening backlog records the additional commitments. No broad location fallback or closest-looking image is permitted.

## F. Missing-art fallback

No eligible image means no stage element. Existing text remains readable with compact title/divider spacing. There is no generated placeholder, wrong branch, loading carousel or black rectangle. Opening art is still a production gap: the reader cannot honestly become an illustrated opening until appropriate art is approved. Five older apartment review conflicts likewise produce a text fallback instead of silently overriding the latest instruction.

## G. Desktop layout

Reviewed at 1440px. Original left rail, tools and reading column remain; no right column. Chapter 3 and Chapter 5 place the image above the title, with complete framing and no duplicate image below the prose. Previous-scene context is distinguishable from the scene pictured. Authored Harbour cuts bring the stage back into view rather than changing an image off-screen while leaving the reader at the controls.

## H. Mobile and tablet

Reviewed at 350, 375 and 390px; tablet at 820px. Art fills the content width with the original ratio, not the full viewport height. Choices and reader tools remain reachable, text wraps and there is no horizontal overflow. No image is cropped to manufacture a mobile portrait. Before/after mobile captures include the opening and approved Chapter 3/5 scenes.

## I. Accessibility

Every scene image has visible-state alt text, without hidden motives or future outcomes. Titles remain real headings; skip-to-story, keyboard controls, modal Escape/focus behavior and reading-size preferences remain. Reading cuts retain keyboard focus on the current scene region and move the current image into view. No new animation or automatic slideshow. The previous-scene disclosure uses native keyboard-accessible HTML. Image failure does not disable choices.

## J. Performance and loading

Only the current image is requested; no chapter-wide preload or history-image loading. Dialogue, reading-size changes and history modal use reuse the same image element/source and do not refetch it. Harbour authentication is cached with a WeakMap keyed by immutable state snapshots: changing the local reading cursor does not replay the entire route again. The weak cache is neither serialized nor retained as a growing run archive.

PNG files remain static public assets rather than JS imports. The **1,967-byte** manifest contains seven paths/dimensions/hashes, not generation metadata. The pre-existing large-bundle warning remains (final production JS approximately 10,053 kB, 3,318 kB gzip); restructuring frozen historical code was outside this pass.

## K. Opening backlog

See [OPENING_VISUAL_BACKLOG.md](../art/OPENING_VISUAL_BACKLOG.md): **19 required composition families, 0 approved (0%)**, 5 staging candidates/guidance, 14 missing exact compositions, plus 7 explicitly non-counted hold/reuse rows. It covers Promotion day through the first Opening milestone, including optional inspections, Axiom screening, Daniel/Benton, report work, Maya's coffees/departure and the retained coffee endpoint.

## L. Validation

- Full unit/state/routes suite: **436/436 passed across 44 files**, using `npm test -- --maxWorkers=4 --testTimeout=60000`.
- Full Chromium browser suite: **94/94 passed**. After the final narrowed recap/phone-placement correction, the focused reader/revision-17 suite also passed **13/13**, including the new visible-placement assertion and refreshed after screenshots.
- Typecheck and production build: **PASS**, including production manifest and original/public SHA-256 checks. Existing bundle-size warning remains.
- `git diff --check`: **PASS**.
- Protected-path diff (`src/content`, `src/state`, `src/persistence`): **empty**. Frozen historical fixtures and hash assertions were not modified.

Checks cover exact catalog/hash eligibility, staging/review exclusion, branch/wardrobe/custody/location/timing guards, dialogue holds, movement cuts, missing and failed-image fallbacks, responsive image ratio/overflow, current-image-only loading, keyboard/history/preferences, and unchanged authenticated saves. Initial default-timeout unit runs exceeded five seconds in existing Git-backed history guards (and under unrestricted worker contention); the final run allowed 60 seconds without changing assertions or expected hashes. The initial offline/runtime import guard also caught the manifest's original directory; moving the compact export into `src/ui` preserved that guard unchanged. All final unit checks pass.

Screenshot inspection also caught that a generic “previous scene” collapse would hide the Chapter 5 placement sentence: the collapse is now restricted to the previous mission recap at Chapter 3 home, and browser tests explicitly require the purchased-phone placement sentence to remain visible.

## M. Screenshots

[Before/after review gallery](../../review-saves/cinematic-reader-review.html). Captures were made against isolated test saves, never by replacing the user's live save. Local screenshot PNGs are ignored by the repository's existing `review-saves/*.png` rule.

| Scene | Before | After |
|---|---|---|
| Opening desktop | [Before](../../review-saves/reader-before-opening-desktop.png) | [After](../../review-saves/reader-after-opening-desktop.png) |
| Opening mobile 375px | [Before](../../review-saves/reader-before-opening-mobile.png) | [After](../../review-saves/reader-after-opening-mobile.png) |
| Opening tablet 820px | [Before](../../review-saves/reader-before-opening-tablet.png) | [After](../../review-saves/reader-after-opening-tablet.png) |
| Chapter 3 desktop | [Before](../../review-saves/reader-before-chapter3-desktop.png) | [After](../../review-saves/reader-after-chapter3-desktop.png) |
| Chapter 3 mobile 350px | [Before](../../review-saves/reader-before-chapter3-mobile.png) | [After](../../review-saves/reader-after-chapter3-mobile.png) |
| Chapter 5 desktop | [Before](../../review-saves/reader-before-chapter5-desktop.png) | [After](../../review-saves/reader-after-chapter5-desktop.png) |
| Chapter 5 mobile 390px | [Before](../../review-saves/reader-before-chapter5-mobile.png) | [After](../../review-saves/reader-after-chapter5-mobile.png) |

## N. Remaining risks and review decisions

1. Opening imagery remains unavailable under the production-only rule. This is an art approval/production dependency, not a reason to bind staging.
2. Five old home assets have contradictory approval/review metadata. The latest strict rule wins here; no art is removed from disk and no metadata is rewritten. Owner resolution is needed to re-enable those exact images.
3. Sloane's empty location master needs a valid authored establishing insert or character composite before use in that encounter.
4. A local reading cursor resets on reload. This preserves schema 5 and avoids displaying future sub-beats ahead of their prose, consistent with the previous reader.
5. Existing large JS bundle and full-resolution PNG payloads remain. This pass avoids catalog bundling and duplicate/eager art loading; alternate encoded derivatives need a separate production workflow.
6. Gallery PNGs are local ignored artifacts; the HTML/report references require retaining those captures or regenerating the test screenshots on another checkout.

## O. Next opening priorities

The numbered 15-item proposal in the opening backlog is the next work queue: apartment/Adrian master, mirror, jacket, housing notice, medical package, coat/phone departure, security queue, tray scan, cleared gate, Daniel master/departure, Benton master/departure, Maya arrival/departure. These are proposals only; no generation, promotion or spend is authorized by this UI implementation.

## Working tree and scope boundary

Pre-existing art work was preserved: `docs/art/CURRENT_AUTHORITY_INDEX.md`, `docs/art/CHAPTER_5_TARGETED_CORRECTION_REVIEW.md`, and `docs/art/CHAPTER_5_WAVE_B_P0_REVIEW.md`. New changes are reader presentation, its compact approval manifest/build check, copies of already-approved continuity PNGs, tests, this report/backlog and the review gallery. Story/content, reducers, persistence/schema and frozen legacy modules remain byte-unchanged. The browser suite overwrote its unrelated tracked journal screenshot; that test-only overwrite was restored to its clean starting version. Working tree is intentionally dirty with this pass and the pre-existing art documentation. HEAD/branch are unchanged. No commit or push performed.
