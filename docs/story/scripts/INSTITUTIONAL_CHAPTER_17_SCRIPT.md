# Institutional · Chapter 17: "Fit for Purpose" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_17_FIT_FOR_PURPOSE_DESIGN.md](../INSTITUTIONAL_CHAPTER_17_FIT_FOR_PURPOSE_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_17_THE_ROOM_DESIGN.md](../CHAPTER_17_THE_ROOM_DESIGN.md).

- **Code:** `src/content/chapter17-institutional.ts`, wired through `src/content/chapter17.ts` (definitions, blocks,
  choices, and the begin from an Institutional `chapter16.complete`), titles (FIT FOR PURPOSE), masters and node ids;
  `tests/state/chapter17.test.ts` now expects Institutional's own entry.
- **Gate:** `VITE_EVE_CHAPTER17`. **Entry:** `chapter17.begin-institutional`. **End:** the shared `complete` (the front
  door), with "[Chapter 18 · institutional road — in development]" while Ch18 is off.
- **Naming:** phases `exhibit → warranty → record → leash → harbour → ruling → aside`; ids carry `i17-`.
- **Keys:** the shared `act4.open`, `act4.press` (receipts / forgery / cost), `act4.sloane`, `act4.offer`,
  `act4.held-landed`, `act4.named`, `act4.nell-said`, `act4.board`, `act4.terms`, `act4.last`; Institutional
  `act4.benton-beat` (box / celeste / ignore).
- **The board (`board17i`):** the case (thin 0 to overwhelming 3), plus 1 for an officer, the inquiry or the regulator
  at the table (Sloane, Maya or Marsh inside), plus 1 for drawing Celeste out. **3 or more resigns her**, 1–2 diminishes
  her, 0 closes ranks. Build note: one higher than the Executive bar, because this road's formal backing makes an officer
  in the room easy.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **exhibit** | "E. V. (II). Axiom's, for the moment."; her clothes read. If Benton was walked out in Ch14: "Where is Mr Benton?" "Suspended, I'm told. So careless." | **i17-open-room** ("I've come about the warranty.") · **-celeste** · **-silent**; the first card lands | `act4.open` |
| **warranty** | Not fit for purpose: Sloane ("I was the officer who took delivery of her. I'm here to return her." / "I declined."), or Maya reads the finding, or Evelynn. "Did we know about 9C?" | **i17-press-receipts** · **-forgery** (the sevens, if she has the proof; otherwise her word, and she says so) · **-cost** | `act4.press` |
| **record** | Only with Sloane inside, the proof road, or her countersignature on 9C; and/or Benton at the table. | **i17-sloane-vouch** · **-stand** · **-use**; then **i17-benton-box** (torch: "Where is it, Director?") · **-celeste** ("Elias is ours, darling. He always was.") · **-ignore** | `act4.sloane`, `act4.benton-beat` |
| **leash** | The gift: the officer's chair, and 9C to hold. Sloane (inside): "It was round my neck." | **i17-leash-refuse** ("I came to return one.") · **-draw** · **-laugh**; then the held card lands | `act4.offer`, `act4.held-landed` |
| **harbour** | Nell, canon, told. | **i17-named-ask** · **-nora** · **-wait** | `act4.named`, `act4.nell-said` |
| **ruling** | The board, by aim and terms; Soames's line about Mr E. Benton if he was exposed in the room. | **i17-ruling-on** | `act4.board`, `act4.terms` |
| **aside** | One minute: "Victoria survived us." / "You didn't let Victoria survive us." / "Victoria resigned rather than survive us." | **i17-last-yes** · **-no** · **-orchid** | `act4.last` |
| **complete** | The front door; Sloane's "Debrief. Tomorrow. Ten o'clock. Bring coffee." if she was inside. | — | — |

**Size (honest), pass 1:** ~1.0k to ~1.17k on one path, against the ~4.5k target. Nothing sexual on screen.
