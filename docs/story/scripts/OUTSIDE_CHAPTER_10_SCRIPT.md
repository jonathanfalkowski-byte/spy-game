# Outside · Chapter 10: "Bring Me Their Name" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_10_BRING_ME_THEIR_NAME_DESIGN.md](../OUTSIDE_CHAPTER_10_BRING_ME_THEIR_NAME_DESIGN.md)
(approved 2026-10-01, all eight decisions as recommended). Shared spine:
[../CHAPTER_10_SHE_KNOWS_DESIGN.md](../CHAPTER_10_SHE_KNOWS_DESIGN.md).

- **Code:** `src/content/chapter10-outside.ts`, wired through `src/content/chapter10.ts` (definitions, `place10`, blocks,
  choices, the begin from an Outside `chapter9.complete`); titles in `src/ui/App.tsx` (BRING ME THEIR NAME); masters in
  `src/ui/environment-art.ts`; node ids in `src/content/schema.ts`. `outsideBridgeFrom14` in `chapter14.ts` now steps
  aside from Chapter 9 when Chapter 10 is playable, and opens from Chapter 10's end.
- **Gate:** `VITE_EVE_CHAPTER10`. **Entry:** `chapter10.begin-outside` ("The third step"). **End:** the shared `complete`; the
  Ch14 bridge ("Chapters 11–13 · outside road — in development") follows.
- **Naming:** phases `slip → cafe → source → press → weeks → hours`; choice ids carry `o10-`. Keys under `out.*` and
  `c10.o-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **slip** | A black Vesper box on the third step of the iron stair: *Breakfast? Wednesday. The Lindqvist, seven. — C.* | **o10-slip-go** · **-sender** (rings the 02:40 phone; "Don't tell me what she says. Tell me what she doesn't.") · **-door** (Celeste at the foot of the stair with pastries) | `c10.o-card`, `out.card10` |
| **cafe** | Dressing for the woman who designed her, then the Lindqvist: the holdall, the chandler's by the dead ferry, the envelope of cash, one of her rules quoted word for word (source / verify / people / provenance / door); never his name; "Eat your eggs, Adrian." | **o10-dress-cash** (a coat bought with his envelope) · **-own** · **-black**; then **o10-adrian-composed** · **-ask** · **-walk** | `c10.o-dress`, `c10.o-adrian` |
| **source** | "Somebody has been sending you pages, darling. Bring me his name. Failing that, a place and an hour." The black phone, one contact, C. | **o10-order-give** (02:40, the old ferry terminal) · **-doctor** (Pier Nine, ten past three) · **-refuse** ("I don't give people") | `out.give10`, `out.celeste10`; fact `c10.o-order` |
| **press** | Page seven by noon; the sender rings at an hour he never rings. | **o10-press-old** · **-work** · **-report** (tell him; on gave: "I moved the night before you told me.") | `out.pages10`, `out.told10` on report |
| **weeks** | **gave:** the empty terminal, "He wasn't there. Careless of him." **doctored:** a thin man in a long coat on the wrong pier for three hours, "He was shy. Next Friday?" **refused:** the 02:40 phone silent; men from a shipping line asking at the shop. Then the invitation, on the sender's own number: *do bring your source.* | **o10-week-on** | — |
| **hours** | Sunday night. | **o10-night-{julian,sebastian}** (consent flow → `-no-sex` / `-sex` / `o10-leave`, then `o10-stop` / `o10-stay`; fades) · **o10-night-maya** (→ `o10-maya-stay`) · **o10-night-alone** (both phones face down) | `c10.o-night*`; fact `c10.o-evening-consent` |
| **complete** | The card: CELESTE LAURENT. GIVEN. / DOCTORED. / REFUSED.; HE KNOWS. (on report); THE VESPER. THE FIRST THURSDAY. BRING YOUR SOURCE. | — | — |

**Rules honoured:** the order is non-sexual; the refusal cost falls on the source, never on her body; the skeptic is never
punished; Adrian's name is kept for Ch14; neither the sender's name nor Nell's is given.

**Ch14 callback:** the reckoning gains a line by what she did here (gave: "I moved the same night."; doctored: "Somebody
stood on Pier Nine in the rain for three hours with a flask."; refused: "Nobody has ever not given me up before.").

**Tests:** `tests/state/outside-ch10.test.ts`, on the real Outside Chapter 9 golden: the entry (and the Ch14 bridge
stepping aside); go + give + report, which authenticates (replay + decode) and hands on to Chapter 14; the source rule
quoted, the doctored pier, the sender rung first; the door, the refusal, and a chosen night that fades. Also played in the
real UI on port 5181 to the card.

**Size (honest), pass 1:** ~1.34k (quiet) to ~1.45k (engaged) on one path, against the ~4.5k target.
