# Outside · Chapter 8: "Provenance" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_8_PROVENANCE_DESIGN.md](../OUTSIDE_CHAPTER_8_PROVENANCE_DESIGN.md) (approved 2026-09-30, all
eight decisions as recommended). Route: [../OUTSIDE_ROUTE_DESIGN.md](../OUTSIDE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter8-outside.ts`, wired through `src/content/chapter8.ts` (definitions, blocks, choices,
  the begin from an Outside `chapter7.complete`, `place8`); titles in `src/ui/App.tsx` (PROVENANCE); masters in
  `src/ui/environment-art.ts`; node ids in `src/content/schema.ts`.
- **Ch9 bridge:** `chapter9.ts` — `predatorFloor` now includes `outside`, so Outside plays its own Chapter 8 before the
  bridge, and a new Outside entry offers `begin-placeholder` ("Follow the vendor") from an Outside `chapter8.complete`,
  setting `c9.entered = outside`.
- **Gate:** `VITE_EVE_CHAPTER8`. **Entry:** `chapter8.begin-outside` ("Three weeks off the books"). **End:** the shared
  `complete` ("The Next Room").
- **Naming:** phases `settle → leads → plant → terminal → after`; choice ids carry `o8-`. Keys under `out.*` and
  `c8.o-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **settle** | Three weeks in the room over the water; the wall, the red thread, the verify-ledger; the 02:40 pages; "I'd rather be doubted than believed." | **o8-settle-on** | — |
| **leads** | The hub: three of five, one a week. Each verify (`out.verified`) / use raw (`out.raw`) / sell on (`out.sold` + `out.trail`). | **o8-lead-{manifest, board, retired, sloane, courier}**, then per lead: **-verify** · **-raw** · **-sell** (retired's sell closed by the **no people** rule; courier's sell closed by the **source** rule). Sloane's file: **o8-sloane-bank** · **-burn** · **-leave** (leave is the **no people** answer). The third lead lands on `plant`. Rules change a beat each: provenance (manifest: a Rotterdam broker's name), verify (board: won't name the shape until checked). | `out.lead.*`, `out.verified` / `out.raw` / `out.sold` / `out.trail`, `out.file`, `out.alliance.rook` |
| **plant** | One lead was Meridian's. **Caught** (the verify rule, or ≥1 verified lead): traces the seam to a cut-out for MERIDIAN HOLDINGS; "The last one stopped checking." **Bit** (otherwise): acted on a lie; Meridian has its answer. | **o8-plant-on** | `out.plant` (caught / bit), `out.vendor = meridian`; fact `c8.o-vendor` |
| **terminal** | 02:40, the ferry terminal; the sender in person, a courier's jacket, the pause before her name, the proof he is "R." on the leaf. | **o8-met-hand** (cross to him) · **-dark** (stay a source; "Don't trust the face.") · **-light** (a torch; "Follow the vendor. Meridian.") | `out.met`; fact `c8.o-met` |
| **after** | A room nobody watches. | **o8-evening-{julian,sebastian}** (consent flow → `-no-sex` / `-sex` / `o8-leave`, then `o8-stop` / `o8-stay`; fades) · **o8-evening-maya** (`c6.maya = restored`) · **o8-evening-alone** (the wall, the three stones) | `c8.o-evening*`; fact `c8.o-evening-consent` |
| **complete** | The second card: VERIFIED / MOVED / SOLD (by the counts) and MERIDIAN · THE VENDOR, plus a corner line by the plant (I CHECKED. IT SAVED ME. / I DIDN'T CHECK. THEY KNOW.) and, if she crossed, I CROSSED THE BARRIER. | — | — |

**Deepening (2026-10-02):** `o8-book-checked / -source / -plain` (settle, before the first page), `o8-seam-keep / -burn / -file` (plant, before she tells
the sender), `o8-walk-watch / -home / -tide` (after, before the evening). Facts `c8.o-book`, `c8.o-seam`, `c8.o-walk`; nothing reads them as flags.

**Tests:** `tests/state/outside-ch8.test.ts`, on real Outside Chapter 7 saves: the entry; the hub (three verified leads
catching the plant, MERIDIAN surfacing, the terminal, and the shared Ch9 bridge's outside "Follow the vendor"), which
authenticates on the `maximal-trade` golden routed onto Outside (replay + decode); the plant biting with the no-people
and source rules closing the sells; a trail and a banked Sloane file with a chosen night that fades. Also played in the
real UI on port 5181 to the card.

**Golden note:** wiring Outside's Chapter 8 retired the Chapter 7 → Chapter 9 placeholder for the outside lane (it now
plays Chapter 8 first, like the other roads). The `outside-placeholder-all` Chapter 9 golden was recaptured through the
built Chapter 8; `rev20-golden-ledgers.json` was regenerated; and the shared bridge tests (chapter8/9/10) were updated
to reach the Outside bridge from a `chapter8.complete` save. The protected `rev19-golden-ledgers.json` (Chapters 1–5) is
unchanged.

**Size (honest), pass 1:** ~1.63k (quiet) to ~1.73k (engaged) on one path, against the ~4–4.5k target.
