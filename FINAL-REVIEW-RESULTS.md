# EVE — personal-review build results

**Ready for the owner’s walkthrough.** Save schema **5**, content **9**. Personal acceptance and pacing approval remain pending. No outside-player study has been conducted.

## Implemented

- Preserved all 18 content-8 engine/content files in `legacy-v8`, with a checked SHA-256 manifest. Historical saves authenticate against their original replay before migration to content 9. Loading alone does not write or advance.
- Extended chronological conversation through day zero. Questions retain selection order after reload and focus the newest exchange. New scenes begin at their heading. Journal/history dialogs return focus to their opener.
- Added earned-only journal milestone/type filters, readable record titles, source limitations, and capture ownership. Narrow screens stack the filters vertically.
- Added validated local backup restoration, location preview, current-run backup, explicit confirmation, and safe rejection of invalid/oversized/unsupported files. Conflicting-tab and write-failure tests preserve the current run.
- Persisted reading size separately from story saves. Preference-storage failure does not block play. Restart now explicitly means the whole story from the apartment.
- Corrected the car’s chronology and repeated departure; removed premature Benton identification from capture preparation; kept lucky-guess reasoning uncertain until observation; corrected the annual-screening reference; shortened the return to the closed anomaly. Added distinct lead/presentation reactions without changing clues or viability.
- Prepared 13 replay-validated alternative-ending saves, acceptance/callback matrices, and a personal walkthrough worksheet. The story still ends in the garage, without further revelations.

## Verification

| Check | Result |
| --- | --- |
| TypeScript and production build | Passed |
| Full Vitest state/content/route suite with coverage | **101 passed**, 10 files |
| Current state line / branch coverage | **99.03% / 94.40%** |
| Save/preferences line coverage | **98.82%** |
| Aggregate coverage, including historical engines and imported helpers | **83.80% lines**, 67.33% branches |
| Full Chromium browser suite | **55 passed** |
| Follow-up after final wording/restart cleanup | **13 state/prose checks and 9 browser checks passed** |
| Final narrow journal check | Passed; filters fit within the dialog at 390 px with extra-large text |
| Uninterrupted automated apartment-to-garage UI traversal | **107 actions**, persisted result exactly matches deterministic replay |
| Original prototype and GDD hashes | Unchanged |
| Frozen content-8 manifest | All **18 files unchanged** |
| Fresh dependency installation | `npm.cmd ci` succeeded in a separate clean source copy |
| Reproducible build | Clean-copy JavaScript output matches the working build byte for byte |

The full coverage run preceded the last wording-only corrections; affected migration/prose/browser checks were rerun afterward. Browser checks cover all endpoint categories, captured and incomplete evidence, keyboard/focus, narrow layouts, save failure, restart, and real browser process reopening. Coverage of React interactions is represented by browser checks, not the state-suite line percentage.

## Measured performance

Measured on this Windows machine: **Intel Core i9-14900K, approximately 64 GiB RAM**, Node 24.14.0, Chromium 153. Seven isolated browser contexts per metric, local production preview, no artificial CPU/network throttling. Navigation measurements include automation observation overhead. The small sample’s p95 is its largest observation.

| Measurement | Median | p95 |
| --- | ---: | ---: |
| Navigation to visible opening scene | 221 ms | 241 ms |
| Navigation and authenticated current completed-save load | 304 ms | 318 ms |
| Navigation and content-8 completed-save authentication/migration | 360 ms | 373 ms |
| Choice dispatch through new-scene render and two animation frames | 28 ms | 41 ms |

Raw samples, machine details, and method: `review-results/performance.json`. The automated route took approximately **4.1 seconds of scripted clicking**, with no reading pauses. That is a functional traversal time, **not** the game’s human runtime. Your walkthrough sheet records actual reading/play duration.

## Limitations and acceptance

Vite reports a large JavaScript chunk (approximately 1.55 MB, 504 KB gzip), substantially due to retained historical replay engines. Measured local response is recorded above; this is not a claim about low-end devices or remote hosting. Validation used Chromium on Windows, not a cross-browser or screen-reader study.

No known blocking progression, save-integrity, or earned-information defect remains from these checks. Your uninterrupted walkthrough may still identify narrative or pacing issues. Record those in `FINAL-WALKTHROUGH.md`; owner acceptance remains **pending**. The earlier test failures were stale expected content versions and a journal filter-label issue; both were corrected and rerun.

Git status: this directory is **not a Git repository**. No commit, push, or deployment was performed. The production preview is local at `http://127.0.0.1:4173/`; the actual player’s browser storage was not replaced by test fixtures.
