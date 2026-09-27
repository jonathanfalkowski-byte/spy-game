# Predator · Chapter 13: "The Mirror" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_13_THE_MIRROR_DESIGN.md](../PREDATOR_CHAPTER_13_THE_MIRROR_DESIGN.md) (approved 2026-09-27,
all eight decisions as recommended).

- **Code:** `src/content/chapter13-predator.ts`, wired through `src/content/chapter13.ts` (phases, blocks, choices,
  `fadeCoercion13`), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER13`.
- **Temporary entry:** `chapter13.begin-predator` ("The winter", with the content notice in its hint) from a Predator
  `chapter9.complete`. It is removed when the Predator Chapter 12 (Geneva) lands.
- **End:** its own phase, `ledger` (the Celebrity `complete` is "A Knock"). Chapter 14 (Marcus Falls) will enter
  from `chapter13.ledger`.

Phases: `reading → delphine → midnight → monitor → late → friday → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **reading** | The Vesper reading room; Celeste in green; the catalogue's new page, "D. · Eighteen months · Available"; Marsh, Halvorsen, 1109, Thursday; "I thought the new one might like to learn how it is done." | **reading-ask** ("the ones who have stood where the girl is standing … know exactly where to put the lamps") · **reading-page** (her eyes go to the door) · **reading-silent** | `c13.p-reading` |
| **delphine** | A beige Meridian flat; Delphine, 29, eighteen months in; very good tea. | **delphine-name** (Ana; "They have my mother's house") · **delphine-want** ("No. But I will.") · **delphine-work**. There is **no option to pressure her.** | `c13.p-delphine` |
| **midnight** | The black phone: "Thursday, darling?" | **mirror-comply** · **mirror-refuse** · **mirror-turn** / **mirror-free** (only with something built: Hollis owned, Varga spared, the archive used or held, or the exit clause) | `pred.mirror` (complied / refused / turned / freed), `pred.delphine`, `pred.standing`, `pred.spent`, `pred.ally.marsh`, `own.cash` (free spends up to $1,500) |
| **monitor** | **Comply:** the cupboard behind the mirror, four screens, the bar, the lift, then "two figures walk toward the door of 1109"; **feed-cut** (her hand) / **feed-rule** (Celeste's timer). Both cut at the door, and nothing behind it is shown. **Refuse:** the kitchen floor; another operator; **night-wait**. **Turn:** the truth to Marsh at the bar; he leaves at eleven; Delphine sleeps alone; **turn-watch** / **turn-leave**. **Free:** the 21:40 platform; **free-name** ("Ana Petrovic. From Leeds … I was a nurse") / **free-go**. | `c13.p-thursday` |
| **late** | Comply: the walk home, the hall, "that I did not have to". **late-card** (DELPHINE (ANA). THURSDAY. 1109. I SENT HER.) · **late-julian** (held only; if he is an ally) · **late-dark**. Other roads: **late-on**. | `c13.p-late` |
| **friday** | Celeste's word by road ("Beautifully run" / Stuttgart lost, and the audit committee / "Six hours of a girl asleep" / "The girl has gone missing"); Marsh's message if turned. **friday-end**, fact `c13.p-mirror`. | — |
| **ledger** | The card at the very top, above Marcus and the fund. "Marcus next." | — |

**Content** (CONTENT_DIRECTION §2–§5):
- Delphine is 29, an adult who reads as one.
- Nothing sexual is shown or described on any road, and a test scans the whole chapter for it.
- The comply lead-in (`P_COMPLY_OPENING13` to `P_DOOR13`) fades to one line with the reader's setting.
- Refusal's cost is her standing and is non-sexual.

**Tests:** `tests/state/predator-ch13.test.ts`: the entry from a real save through Ch6–9; Delphine; comply with the
cut and the fade; refusal; the two counters. The freed path replays and authenticates.

**Size (honest):** pass 1 is **~0.9–1.1k words on one path** against the ~4.5k target, the leanest first pass on the
route. The scene structure is complete and the prose is spare. The next lift:
- the week between the brief and midnight (Delphine at greater length; Marcus's view);
- the operator's evening at greater length on each road;
- the aftermath's recovery step.
