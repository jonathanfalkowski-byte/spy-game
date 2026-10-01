# Outside · Chapter 14: "The Source" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_14_THE_SOURCE_DESIGN.md](../OUTSIDE_CHAPTER_14_THE_SOURCE_DESIGN.md) (approved 2026-10-01, all
eight decisions as recommended). Route: [../OUTSIDE_ROUTE_DESIGN.md](../OUTSIDE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter14-outside.ts`, wired through `src/content/chapter14.ts` (definitions, `place14`, blocks,
  choices, and `outsideBridgeFrom14`); titles in `src/ui/App.tsx` (THE SOURCE); masters in `src/ui/environment-art.ts`;
  node ids in `src/content/schema.ts`; `tests/state/chapter14.test.ts` now expects Outside's own entry.
- **Gate:** `VITE_EVE_CHAPTER14`. **Entry:** `chapter14.begin-outside`, through an interim bridge from an Outside
  `chapter9.complete` (or the last of Chapters 9–13), because Outside Chapters 10–13 do not exist yet; their keys read at
  defaults. When those chapters are built, the bridge narrows to a fallback like Institutional's. **End:** the shared
  `complete`, with "[Chapters 15–18 · outside road — in development]" (Outside has no Ch15 yet, so the stop is unconditional).
- **Naming:** phases `seam → reckoning → verdict → source → water`; choice ids carry `o14-`. Keys under `out.*`, `act3.*`
  and `c14.*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **seam** | The ledger leaf beside the Jakarta handoff copy: a gap where the courier's initial should be. With the **verify** or **provenance** rule she catches it herself; otherwise he rings at 02:40 and confesses first. | **o14-seam-summon** ("Come to the room. Mine.") | `out.seam` (caught / told) |
| **reckoning** | 02:40, her room, no disguiser. He gives his name, **Rafe Lim**; the Jakarta list he carried unread; the Sunday ferry to Batam, two tickets; the Saturday Meridian sent him to Rotterdam; why he chose her; **that he does not know how Nell died.** | **o14-reck-finish** (say nothing) · **-press** (the lie first: "the worst reason I have ever heard") · **-verify** (stop and check the ferry tickets: "Good. Check me. She didn't, and look.") | `out.told`, `act3.nell = known`; fact `c14.o-rafe` |
| **verdict** | Sloane's file, hers (`out.file = bank`) or his (`burn`); or, if she left it, only spare. | **o14-sloane-burn-just** · **-burn-useful** · **-trade** (for the courier's safety) · **-spare** (the only option when the file was left) | `act3.sloane` (burned / traded / spared), `out.sloane` (burn / trade / spare), `out.burn` (just / useful) |
| **source** | What Rafe is now. | **o14-way-keep** (bounded; the Jakarta original in her keeping) · **-cut** (verify everything and walk) · **-trust** (once, with open eyes; he gives her the original) | `out.way14`; keep and trust set `act3.nell-order = taken`; trust squares `out.alliance.rook` |
| **water** | Before dawn. | **o14-evening-rafe** (only if he was not cut: "If I ever say her name when I mean yours, stop me."; the consent flow → `o14-rafe-no-sex` / `-sex` / `o14-leave`, then `o14-stop` / `o14-stay`; fades) · **o14-evening-{julian,sebastian}** (same flow) · **o14-evening-maya** (`c6.maya = restored`) · **o14-evening-alone** (NELL. RAFE. pencilled on the wall) | `c14.o-evening*`; fact `c14.o-evening-consent` |
| **complete** | The third card: THE SOURCE.; RAFE LIM. R. ON THE LEAF. (or, if cut, HIS NAME. I DON'T KEEP IT.); SLOANE · BURNED / TRADED / SPARED; THE VESPER · by the courier's door (together, or on her terms) or by the stair, alone; LINDEN, E. | — | — |

**Rules honoured:** Rafe never makes her Nell (the pre-scene promise; the repair is his); the night with him is open only
after he has told her who Nell was to him and she has not cut him; his price is information; the skeptic is never
punished (cut is a full position); **how Nell died is not told here** (Act IV, Ch17), and a test asserts it; Sloane is a
target or a trade, never a romance; nothing is sexual coercion.

**Tests:** `tests/state/outside-ch14.test.ts`, on the real Outside Chapter 9 golden: the entry through the bridge (and the
absence of an Outside Ch15 offer); caught + press the lie + spare Sloane + trust him + a chosen night that fades, which
authenticates (replay + decode); told first with the file banked: stop-and-verify, burn useful, cut him, alone; a file
left (only spare), a trade, keep him with the Jakarta original held, stop and stay no-sex; and a test that the cause of
Nell's death is absent. Also played in the real UI on port 5181 to the card.

**Size (honest), pass 1:** ~1.56k (quiet) to ~1.78k (engaged) on one path, against the ~4.5k target.
