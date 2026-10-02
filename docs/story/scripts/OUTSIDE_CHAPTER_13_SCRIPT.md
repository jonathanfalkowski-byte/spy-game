# Outside · Chapter 13: "The Price" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_13_THE_PRICE_DESIGN.md](../OUTSIDE_CHAPTER_13_THE_PRICE_DESIGN.md) (approved 2026-10-01). Shared
spine: [../CHAPTER_13_THE_HONEYPOT_DESIGN.md](../CHAPTER_13_THE_HONEYPOT_DESIGN.md).

> **Reserved sexual-coercion beat.** Content notice first; the comply lead-in honours "Fade coercion scenes"; the door closes
> and the scene cuts; nothing behind the door is described; every threat and refusal cost is non-sexual.

- **Code:** `src/content/chapter13-outside.ts`, wired through `src/content/chapter13.ts` (definitions, `place13`, blocks, choices,
  the begin from an Outside `chapter12.complete`, and the fade dispatch in `fadeCoercion13`); titles in `src/ui/App.tsx` (THE
  PRICE); masters in `src/ui/environment-art.ts`; node ids in `src/content/schema.ts`; `tests/state/chapter13.test.ts` now expects
  Outside's own entry. `outsideBridgeFrom14` in `chapter14.ts`: Ch14 now follows directly from `chapter13.complete`; the bridge is
  only a fallback when an earlier Outside chapter is not playable.
- **Gate:** `VITE_EVE_CHAPTER13`. **Entry:** `chapter13.begin-outside` ("The first Thursday of next month", with the content notice).
  **End:** the shared `complete`; Ch14 follows directly.
- **Naming:** phases `terms → watch → dusk → door → hours → morrow`; choice ids carry `o13-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **terms** | **Content notice.** The black phone: the Claremont, Marsh, suite 1109, the camera behind the mirror; "I should hate for a man like that to be found"; Maya's file. | **o13-terms-on** | — |
| **watch** | Marsh as a person (shared canon). One move. | **o13-move-rafe** (he offers his ledger; it arrives in a brown envelope on the third step) · **-maya** (dinner) · **-alone** | `c13.o-move`; `out.ledger13`, `out.told13` on rafe |
| **dusk** | Wednesday midnight, the black phone. | **o13-reply-comply** · **-refuse** · **-turn** (only with proof: Rafe's ledger, or `out.verified ≥ 1`) | `c13.o-answer`, `c13.answer`, `act3.honeypot`; `out.rafe13 = hiding` on refuse |
| **door** | **Comply:** getting ready (fade-aware), the car, the bar, the lift, the corridor; "Are you all right?". **Refuse:** home on the floor. **Turn:** the proof in the lift; "Then we'd better give them something to watch."; a staged scene, both clothed and in on it, "Is this all right?" "Yes. Keep going. Slower." (heat 2). | Comply: **o13-door-look** · **-away**, then "The door closes behind you."; otherwise **o13-door-on** | `c13.o-door`; on turn `act3.ally.marsh = in`; facts `c13.o-marsh`, `c13.o-evening-consent` |
| **hours** | **Comply:** the car home, the shower as time, "Lovely. You see how easy it is." **Refuse / turn:** the relief and the danger; Marsh and a taxi ("Friday. Nine."). | Comply: **o13-recover-maya** (a hand held, nothing more) · **-wall** (DONE TO ME. NOT BY ME.) · **-phone** (the 02:40 call: he reads her the shipping forecast) · **-alone**; otherwise **o13-hours-on** | `c13.o-recover` |
| **morrow** | **Comply:** "I've called off my dogs, darling, for now"; the inquiry "restructured". **Refuse:** they found his lodging; he was in a launderette; "Don't ring this number." **Turn:** Marsh's office, "Thank you for being something to find"; he keeps the courier's name off every page. | **o13-morrow-on** | — |
| **complete** | The card: THE CLAREMONT. 1109. DONE. / REFUSED. THEY FOUND HIS LODGING. / STAGED. MARSH IS OURS.; DONE TO ME. NOT BY ME. (on the wall); HIS LEDGER. HIS HAND. MARSH KEEPS HIS NAME. | — | — |

**Deepening (2026-10-02):** `o13-msg-wall / -book / -face` (terms, after the notice), `o13-see-bike / -paper / -none` (watch, before the move),
`o13-sunday-walk / -letter / -stove` (morrow, before the card). Facts `c13.o-msg`, `c13.o-see`, `c13.o-sunday`. None is inside or beside the coercion beat; nothing reads them as flags.

**Ch14 callbacks:** the reckoning gains a line by `c13.answer` (complied: "I read you the shipping forecast and I did not ask."; refused: "I
have never been so glad of a launderette."; countered: "You took my ledger to Marsh.").

**Tests:** `tests/state/outside-ch13.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–12: the entry with the
content notice (and the Ch14 bridge stepping aside); **comply** (the fade collapses the lead-in and keeps the corridor; the very next
thing after the door closes is the car home, with no word from the content-safety list in between; the recovery is a refuge),
which authenticates (replay + decode) and runs straight into Chapter 14; **refuse** (his lodging, never her body); **turn** on his
ledger (Marsh keeps his name off the page) and on a page she verified herself; and no turn offered without proof. Played in the
real UI on port 5181, including the fade setting (reset to 'no' afterwards).

**Size (honest), pass 1:** ~0.87k (refuse), ~1.22k (turn), ~1.31k (comply), against the ~4.5k target.
