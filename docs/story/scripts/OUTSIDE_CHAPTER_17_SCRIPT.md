# Outside · Chapter 17: "Return to Sender" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_17_RETURN_TO_SENDER_DESIGN.md](../OUTSIDE_CHAPTER_17_RETURN_TO_SENDER_DESIGN.md) (approved 2026-10-01). Shared spine:
[../CHAPTER_17_THE_ROOM_DESIGN.md](../CHAPTER_17_THE_ROOM_DESIGN.md).

- **Code:** `src/content/chapter17-outside.ts`, wired through `src/content/chapter17.ts` (definitions, blocks, choices, the begin from an
  Outside `chapter16.complete`); titles in `src/ui/App.tsx` (RETURN TO SENDER); masters in `src/ui/environment-art.ts`; node ids in
  `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER17`. **Entry:** `chapter17.begin-outside` ("The room"). **End:** `complete`, with the stop line
  "[Chapter 18 · outside road — in development]" until `VITE_EVE_CHAPTER18` is on.
- **Naming:** phases `bearing → provenance → postman → terms → saturday → verdict → quiet`; choice ids carry `o17-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **bearing** | "E. V. (II). Unclaimed."; the clothes read; Rafe named if in the room; the UNCLAIMED place card. | **o17-card-name / -pocket / -leave**; **o17-open-room / -celeste / -silent** | `c17.o-card`, `act4.open` |
| **provenance** | Soames asks where the pages came from; Celeste: a courier's, unsigned. | **o17-press-signed** (holds if verified ≥ 3) · **-flaw** · **-cost** | `act4.press` |
| **postman** | Deverell asks who the courier is; Celeste names Rafe Lim. | **o17-postman-vouch / -stand / -use** | `act4.rafe-beat` |
| **terms** | A five-minute recess; Celeste's offer: buy it all, strike her name, keep the courier safe. The held card lands. | **o17-offer-refuse / -draw / -laugh** | `act4.offer`, `act4.held-landed` |
| **saturday** | Nell told, not shown (canon) plus the Rotterdam morning; the name. | **o17-named-ask** · **-nora** (Nora inside) · **-rafe** (Rafe in the room) · **-wait** | `act4.named`, `act4.nell-said`, `act4.rafe-heard = room` |
| **verdict** | Deverell moves; the aim as terms; the minute and the pen. | **o17-minute-rafe** (in the room) / **-sign** / **-leave**; then **o17-verdict-on** | `c17.o-minute`, `act4.board`, `act4.terms` |
| **quiet** | "Did you ever like being her?"; the orchid. | **o17-last-yes / -no / -orchid** | `act4.last` |
| **complete** | The front door; Rafe on the top step ("Eleanor.") or at the river door taking off his cap. | — | — |

**Board (`board17o`):** case strength (thin 0 … overwhelming 3) + a witness in the room (Marsh, Maya, Rafe, Nora or Iris) + the offer
drawn out + provenance owned (flaw, or signed with ≥ 3 checked pages). 3+ resigned/full; 1–2 diminished/partial; 0 closed/none.

**Safety:** nothing sexual; Nell's death is told by Celeste in two sentences and never shown; Rafe never makes her Nell; the offer costs
nothing to refuse; Meridian stands.

**Tests:** `tests/state/outside-ch17.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–16: the entry (and "Mr Lim");
Rafe in the room (flaw owned, on the record, the slip lands, he asks for the name, signs the minute; resigned/full; authenticates, no
Ch18 yet); Rafe at the river door (he hears later; no "Eleanor" from him); Rafe cut and alone in plain clothes; a thin case closes ranks.

**Size (honest), pass 1:** to be measured against the ~4.5k target.
