# Cinematic Reader V2 — full-height layout experiment

2026-09-18. Review candidate; no commit or push. HEAD remains `6ef6f68ad1690d0ddaf9f94c5f152171b2491670` on `story/chapter-3-design`. Revision-17 runtime baseline `198feada20cc15aa47d6e64f37149079efe187a4`, schema 5. Pre-existing art/reader changes remain preserved.

## A. Previous problem

The prior reader left a short illustration above a tall empty column. Long assessment material competed with the scene. The new shell makes art full-height and prose independently scrollable. [Prior design and validation receipt](../../review-saves/reader-shell-evidence/prior-reader-v2.md) is preserved separately; its counts are not this experiment's test results.

## B. Principles

Navigation is utility. Art establishes the scene. Prose advances the scene. HOLD ON DIALOGUE. CUT ON ACTION. Existing typography, narration, thoughts, inspections and choices remain.

## C. Desktop geometry

96vw shell, maximum 1800px. Height is viewport minus 100px for header/margins. Expanded navigation: 228px. Story: 500px including padding and scrollbar gutter. Art: remaining width. At 1920×1080 the stage is approximately 1032×980px and the contained landscape image approximately 1030×579px. Navigation and prose scroll independently; the scene stays visible.

## D. Collapsed navigation

Rail contracts to 60px, adding 168px to art while story stays 500px. Expand and Menu controls remain available. The same toggle retains focus. Preference persists separately under `eve.reader.navigation-collapsed.v1`; blocked storage retains in-memory choice. No save-schema change.

## E. Medium layout

Illustrated scenes at 1200–1399px default to collapsed navigation unless explicitly overridden by the user's saved preference. Text-only scenes keep expanded navigation by default. At 900–1199px navigation moves into Menu. Story is 470px, reduced to 430px at 900–1099px. Art/story stay side by side. The 1280×900 capture has a roughly 664px stage. Below 900px the layout stacks.

## F. Mobile layout

Normal document flow: ART → STORY → CHOICES. No sticky art, no atmosphere layer. Intrinsic image ratio is retained with a 65dvh height cap. Menu contains reading settings, journal/history and save controls. The 390px captures show no horizontal overflow and retain comfortable choice targets.

## G. Art stage

The existing SceneArtStage remains the only stage. Sharp art uses object-fit: contain. A constrained desktop grid row prevents portrait intrinsic sizing from overflowing. Full source content remains visible. The existing 200ms transition runs only on authored shot changes; dialogue retains the image DOM node. Outgoing images still require branch/state/chronological validity. Reduced motion disables fades.

## H. Blur / matte

The same approved URL appears behind the sharp image as a decorative, enlarged, 32px-blurred, darkened/desaturated background at low opacity. The foreground remains unchanged. Screenshots show a subdued matte. Landscape art necessarily leaves balanced bands inside the taller stage; filling those with sharp art would crop content. Mobile disables the background.

## I. Resolver

Existing state → authored shot ID → explicit binding → approved production manifest and independent branch/wardrobe/prop/timing guards are unchanged. No filename matching or second selection system. Existing manifest: 8 eligible records, 5 conflicting/nonpassing records excluded. Eligibility alone does not create a binding. H1 remains staging; Aster remains unbound pending an exact arrival reading boundary.

## J. Missing-art fallback

Existing explicit intentional holds remain. No generic location fallback is authorized in the current bindings. Missing, invalid, future, staging or failed art collapses the stage, leaving centered prose up to 760px wide. Opening never substitutes unrelated night/staging art. Image load failure preserves text and decisions.

## K. Assessment disclosure

Mission assessment heading and short outcome remain visible. Native Review assessment disclosure reveals all existing capture, unresolved and personal recap content. Actions remain outside it. No information, evidence or game state is removed.

## L. Performance

Only current image URL plus an already-loaded outgoing frame during transition. Atmosphere shares the current URL; browser tests confirm one initial asset request and no reload on dialogue holds. No raster imports, chapter preload or new image library. The pre-existing large-bundle warning remains; authenticated historical-content restructuring is outside scope. Blur is disabled on small screens; older tablet GPU performance still deserves human review.

## M. Accessibility

Story text is a named, focusable region with native keyboard scrolling. Node changes reset its scroll and preserve existing heading/latest-exchange focus. Menu uses the existing native dialog with focus trap, Escape and return. Reading controls, save/journal/history and visible-state-only alt text remain. Decorative layers are aria-hidden. Reduced motion is respected.

## N. Screenshots / validation

[Open the before/after gallery](../../review-saves/cinematic-reader-shell-review.html).

- Home after Glass House: 1920×1080 baseline, expanded/collapsed and assessment-scrolled views.
- Approved Chapter 5 Harbour and final apartment: 1920×1080.
- Home at 1280×900; Opening and Chapter 5 apartment at 390×844, with full-page mobile capture.
- Test-only portrait fixture verifies containment without granting art authority.

Isolated authenticated test saves are used, not the active user's save. PNGs remain local under the existing ignore policy. [Validation receipt](CINEMATIC_READER_SHELL_VALIDATION.md) records results and scope integrity.

## O. Remaining issues / files

Human review is pending. Matte bands preserve full compositions. Opening remains 19 families, 0 approved, 5 staged and 14 missing; [backlog](../art/OPENING_VISUAL_BACKLOG.md) is updated without generation. Chapter 5 approved coverage stays 4/95 (4.21%). Existing H1/H2, Aster timing and Harbour canon gates remain separate work.

Implementation changed here: App.tsx, SceneArtStage.tsx, Missionwork.tsx, styles.css and new reader-preferences.ts. Tests changed: cinematic-reader, cinematic-shell, completion and reader-preferences. Documentation/evidence: this design, validation, Opening backlog and comparison gallery. No resolver, manifest, story, persistence, art, Chapter 6, commit or push changes in this experiment.

