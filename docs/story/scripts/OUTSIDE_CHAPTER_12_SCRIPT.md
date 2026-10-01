# Outside · Chapter 12: "His City" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_12_HIS_CITY_DESIGN.md](../OUTSIDE_CHAPTER_12_HIS_CITY_DESIGN.md) (approved 2026-10-01). Shared
spine: [../CHAPTER_12_SINGAPORE_DESIGN.md](../CHAPTER_12_SINGAPORE_DESIGN.md).

- **Code:** `src/content/chapter12-outside.ts`, wired through `src/content/chapter12.ts` (definitions, `place12`, blocks,
  choices, the begin from an Outside `chapter11.complete`); titles in `src/ui/App.tsx` (HIS CITY); masters in
  `src/ui/environment-art.ts`; node ids in `src/content/schema.ts`; `tests/state/chapter12.test.ts` now expects Outside's own
  entry. `outsideBridgeFrom14` now steps aside from Chapter 11 when Chapter 12 is playable and opens from Chapter 12's end.
- **Gate:** `VITE_EVE_CHAPTER12`. **Entry:** `chapter12.begin-outside` ("A ticket in an envelope"). **End:** the shared
  `complete`; the Ch14 bridge ("Chapter 13 · outside road — in development") follows.
- **Naming:** phases `ticket → arrivals → katong → hill → kitchen → quay`; choice ids carry `o12-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **ticket** | A ticket and cash on the third step; the sender: "I'm coming. Not as your source." He says "home" once. | **o12-ticket-together** (three rows back) · **-apart** (via Doha) | `c12.o-ticket`, `out.sg12` |
| **arrivals** | Changi at ten past six; he is in Arrivals in a courier's jacket; the pause before her name, understood. | **o12-arrivals-on** | — |
| **katong** | Mrs Wee: "Miss Evelyn! So long!"; Celeste keeps a table for two on the first Sunday of every month; a man in a linen suit leaves a note. | **o12-katong-along** · **-told** ("Then I know why she stop coming.") · **-silent** | `out.katong12`, `out.watched12`; fact `c12.o-table` |
| **hill** | Number 9, Emerald Hill; he will not climb the steps. | **o12-flat-alone** (the ivory jacket) · **-with** ("She hated orchids.") · **-leave** | `out.flat12` |
| **kitchen** | Holland Village; "Nell?"; Nora, the Postman, the Saturday and Sunday calls (shared canon). Then the trust question. | **o12-nora-with** (Nora has never seen his face) · **-gate**; then **o12-trust-ask** ("Were you the Postman?" "Before the first Thursday I'll tell you all of it.") · **-wait** · **-leave** | `out.nora12`, `act3.nell = known`, `out.asked12`; fact `c12.o-nora` |
| **quay** | Dusk, the harbour wall; he stands a yard back; no cause of death. | **o12-wall-beside** · **-leaf** (the margin, "C. will sulk") · **-alone** | `out.wall12` |
| **complete** | The card: SINGAPORE. HIS CITY.; MRS WEE. …; NORA LINDEN. NELL. THE POSTMAN.; BEFORE THE FIRST THURSDAY. HE SWORE. (on ask); THE FIRST THURSDAY. WHO IS WATCHING? | — | — |

**Ch14 callbacks:** the reckoning's Nell line adapts (she is already named); "You sat me at Nora's table…" / "I stood under her
frangipani…"; "You asked me at Nora's gate… This is me keeping it." / "You did not ask me…".

**Rules honoured:** the sender stays unnamed; no cause of death (a test asserts it); he never makes her Nell; the trust question
is his and is never forced; no sexual content.

**Tests:** `tests/state/outside-ch12.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–11: the entry (and
the Ch14 bridge stepping aside); the full path, which authenticates (replay + decode) and hands on to Chapter 14 with the
callbacks; apart + told + alone + gate + wait + leaf; silent + leave + gate + leave + alone. Played in the real UI on port 5181.

**Size (honest), pass 1:** ~2.26k (quiet) to ~2.50k (engaged) on one path, against the ~4.5k target.
