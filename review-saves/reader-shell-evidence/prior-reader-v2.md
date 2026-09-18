# Cinematic Reader V2

2026-09-18. Review candidate; no commit or push. Story content revision 17 and save schema 5 remain unchanged. The prior reader work and Aster promotion were already dirty at the start and are preserved.

## Rationale and layout

Approved illustration now shares the reading surface with prose. Wide desktop uses a 228px navigation rail and a remaining art/story grid weighted 1.35:1, approximately 57/43 before the 30px gutter. Overall width caps at 1920px. The story keeps the existing Georgia/Inter hierarchy, time/location eyebrow, private thoughts, dialogue and choice cards; reading line length caps at 64ch for illustrated scenes and 68ch for text-only scenes. Choices remain below prose, never over the art.

At 1200px and above, navigation stays visible and independently scrollable beneath the header. At 900–1199px, navigation moves into the existing accessible modal while art and prose remain beside one another. Below 900px, the stage stacks above story and choices. Narrow screens use 18px side padding, no horizontal overflow and a Menu control in the header. Reading size, evidence journal, history, restore and restart remain available.

The art wrapper is sticky at 104px on desktop/medium, below the 76px header, while the document story scrolls. There is no second story scroll trap. On small screens it becomes static. Short scenes simply leave natural page space; missing art does not reserve a black stage.

## Art stage and movement

`SceneArtStage` receives only resolver-selected production art. Landscape and portrait images use intrinsic dimensions, `object-fit: contain`, a subdued matte and a viewport height cap. No cover crop, stretch, automatic pan, scale animation or floating choices. Full portraits remain visible inside the same stage.

A shot ID keys the image. Dialogue on the same shot retains the same DOM image and does not restart animation or request another asset. Changed shots use a 200ms fade; an outgoing image can crossfade only if it remains valid against current state and is not later than the current authored reading beat. Stepping backward does not ghost a future departure frame. Reduced-motion changes are immediate. Invalid/unavailable images collapse the whole art column rather than holding unrelated art.

For the existing four-beat Harbour reading sequence, previously read arrival/setup is available in expandable recaps. The current moment stays beside its resolved image. Original prose/history bytes are unchanged and remain accessible; this is presentation only. Choice availability and the authenticated event order are preserved.

## Resolver and approval boundary

The existing explicit resolver remains the authority: current immutable story state + transient reading position -> authored stable shot -> explicit binding -> approved production manifest -> independent branch/wardrobe/location/prop/timing guard. No filename search or similar-image substitution.

The small manifest contains 8 eligible production records and excludes 5 conflicting/nonpassing historical records. Eligible means production role, explicit owner approval and PASS review. The new H1 PASS candidate is still staging and is absent from the runtime manifest. Aster is production-approved for its exact arrival, but remains unbound until an arrival-only reading boundary is available; the sitting/proof result is not an acceptable substitute trigger.

Fallback rules are conservative. Existing explicitly guarded dialogue holds remain on the same asset. No blanket previous-image retention exists. No generic location-master fallback is currently authorized in the binding table; a shared room is insufficient. Missing/branch-invalid/future/staging art yields text-only. A network/decode failure collapses the layout; reloading can retry the source. The previous-image fade uses the same validation gate and chronological cursor guard.

## Performance

Only current-shot URL loading, plus at most the already-loaded outgoing image during the 200ms transition. No raster imports, whole-chapter prefetch or catalog bundling was added. Browser tests verify one initial art request where eligible and no new request on dialogue holds. Browser caching handles revisits. Reading position, media preferences and animation state do not enter save data.

The existing large JavaScript bundle warning remains: approximately 10.05MB minified /3.32MB gzip, largely the existing content/legacy replay graph. This task did not restructure authenticated historical content to address it. Production raster URLs remain outside that bundle.

## Accessibility

The skip link targets the main reader. Story focus order and latest-exchange focus remain intact. The existing native-dialog focus trap supports Menu, evidence journal, history, restore and restart, with Escape/close and focus restoration. Large reading settings persist separately from story. Alt text remains visible-state-only, not hidden intent or future plot. Outgoing crossfade image is decorative/aria-hidden; the current image supplies the accessible description. Reduced motion disables fades, and portrait content is never clipped.

## Opening and remaining art

[Opening visual backlog](../art/OPENING_VISUAL_BACKLOG.md) rechecked: 19 unique composition families, 0 approved, 5 staged guidance/candidates and 14 missing. Initial priorities are morning apartment, mirror, housing notice, medical package, closet jacket and departure toward Axiom. Maya text, thoughts and unchanged choices use intentional holds. No opening generation or promotion occurred; safe text-only remains honest until exact art is approved.

Chapter 5 approved coverage remains 4/95(4.21%), not all-branch coverage. [Harbour review](../art/HARBOUR_READER_V2_REVIEW.md): H1 PASS/LOW-POLISH in staging, H2 blocked on a natural coffee grip, H3/H4 unchanged approved. Frozen 15:00 salon history is excluded from evening-only art; applying new evening-only canon needs a separately authorized versioned continuation.

## Review evidence

Open [the screenshot gallery](../../review-saves/cinematic-reader-v2-review.html).

- Opening desktop/mobile: `review-saves/reader-v2-opening-desktop.png`, `reader-v2-opening-mobile.png`.
- Chapter3 production art desktop/mobile/medium: `reader-v2-chapter3-desktop.png`, `reader-v2-chapter3-mobile.png`, `reader-v2-chapter3-medium.png`.
- Chapter5 Harbour: `reader-v2-harbour-no-preference.png` and `reader-v2-harbour-reduce.png`.
- Chapter5 apartment: `reader-v2-chapter5-desktop.png`, `reader-v2-chapter5-mobile.png`.
- Portrait contain fixture: `reader-v2-portrait-fixture.png`, a test-only synthetic border image served at an approved URL to exercise layout. It is not production artwork or an asset approval.

Manual screenshots confirm hierarchy, readable line lengths, primary art surface and compact missing-art state. Browser assertions measure sticky position while scrolling, mobile order, aspect ratio, image request count and no overflow. Screenshots use isolated authenticated test saves, not the user's active browser save.

## Validation

Final command results are recorded below after the review run. Agent-browser CLI was attempted immediately after starting Vite but its daemon returned EOF after connection retries; direct Playwright smoke verified the heading, interactive controls and zero page errors. The project's Playwright suite supplies the full browser evidence.

## Files and remaining UI work

Main implementation: `src/ui/App.tsx`, `SceneArtStage.tsx`, `useMediaQuery.ts`, `ClinicConversation.tsx`, `styles.css`. Existing `scene-art.ts`, approval manifest and ordered beat presenter are reused. Browser tests now open mobile navigation explicitly; their story/save assertions remain. The offline visual catalog adds a pending staging record, not a reader binding.

Remaining work: explicit owner review of UI/H1; H2 pose layer; exact Aster arrival boundary; opening art production; wider approved branch coverage; separately scoped bundle reduction. No Chapter 6, save schema change, historical content rewrite, automatic promotion, commit or push.

## Final validation results

- `npm test -- --maxWorkers=2`: **436/436 tests, 44 files passed**. The first unrestricted concurrent run hit 8 timing limits while browser work competed for CPU; bounded rerun passed without changing timeouts, assertions or historical expectations.
- After staging catalog registration: visual contracts, scene-art resolver, art registry and Chapter 5 promotion guards: **17/17 passed**.
- Full Playwright run: **97/98 passed**; the sole failure was an old mobile `.rail` assertion. It was updated to verify the same chapter navigation through Menu. Chapter 4 plus Reader V2 rerun: **16/16 passed**, including the added 1000px intermediate layout. The suite now contains 99 distinct cases; all have passing coverage across the full run and focused rerun.
- Screenshot captures fast-forward finite fades so the gallery shows settled artwork, while motion behavior is separately asserted. Final screenshot/reader run: **14/14 passed**, with settled screenshots manually reviewed.
- Build/typecheck passed, including approval-manifest check: 8 eligible production records; 5 conflicting/nonpassing records excluded. Existing large-bundle warning remains.
- `git diff --check`: passed. `git diff --name-only -- src/content src/state src/persistence`: empty. Branch remains `story/chapter-3-design`, HEAD remains `6ef6f68ad1690d0ddaf9f94c5f152171b2491670`. Runtime baseline remains `198feada20cc15aa47d6e64f37149079efe187a4`, revision 17/schema 5.
- Background verification: source unchanged; 1,934,876 uncovered pixels compared, 0 changed; deterministic repeat SHA equal. No art promotion or new reader binding.

Working tree is intentionally dirty with the pre-existing Aster/art/reader work plus this bounded pass. Nothing committed or pushed. Generated screenshots are local review evidence; PNGs under `review-saves` follow the repository's existing ignore policy. The review gallery and documentation link them directly.
