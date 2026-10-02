# Outside · Chapter 11: "Unclaimed" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_11_UNCLAIMED_DESIGN.md](../OUTSIDE_CHAPTER_11_UNCLAIMED_DESIGN.md) (approved 2026-10-01).
Shared spine: [../CHAPTER_11_THE_ASSET_DESIGN.md](../CHAPTER_11_THE_ASSET_DESIGN.md).

- **Code:** `src/content/chapter11-outside.ts`, wired through `src/content/chapter11.ts` (definitions, `place11`, blocks,
  choices, the begin from an Outside `chapter10.complete`); titles in `src/ui/App.tsx` (UNCLAIMED); masters in
  `src/ui/environment-art.ts`; node ids in `src/content/schema.ts`. `outsideBridgeFrom14` in `chapter14.ts` now steps
  aside from Chapter 10 when Chapter 11 is playable and opens from Chapter 11's end.
- **Gate:** `VITE_EVE_CHAPTER11`. **Entry:** `chapter11.begin-outside` ("Wednesday, 02:40"). **End:** the shared `complete`; the Ch14
  bridge ("Chapters 12–13 · outside road — in development") follows.
- **Naming:** phases `layout → lobby → shelf → stairs → river → dawn`; choice ids carry `o11-`. Keys under `out.*` and `c11.o-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **layout** | The sender's price: the Vesper's layout for a photograph of the first Evelyn's page (she never allowed one). | **o11-price-photo** · **-heart** · **-refuse** (go in blind) | `out.price11`, `out.layout11`; fact `c11.o-price` |
| **lobby** | The first Thursday; the black phone bagged at the door; Celeste: "Alone, darling. I did say bring your source." plus a line by her Ch10 answer; Iris in the powder room. | **o11-iris-warned** · **-open** · **-quiet** | `out.iris11` |
| **shelf** | The reading room, the book: her page (UNCLAIMED), Iris's (ENDING), and E. V. (I) · FOUR YEARS · RETIRED · SINGAPORE, a face. | **o11-page-photo** · **-heart** · **-turned** | `out.photo11` |
| **stairs** | The landing: a cream envelope, a page in Celeste's hand for the sender. | **o11-slip-passed** · **-read** ("You were never going to be on the ferry. I'm sorry about that. — C.") · **-burned** | `out.slip11`; fact `c11.o-slip` |
| **river** | 02:40, a bench on the Embankment; the sender rings. | **o11-river-all** · **-face** · **-nothing** | `out.told11` on all; fact `c11.o-face` |
| **dawn** | Before dawn. | **o11-night-{julian,sebastian}** (consent flow → `-no-sex` / `-sex` / `o11-leave`, then `o11-stop` / `o11-stay`; fades) · **o11-night-maya** (→ `o11-maya-stay`) · **o11-night-alone** (draws her from memory) | `c11.o-night*`; fact `c11.o-evening-consent` |
| **complete** | The card: THE VESPER. UNCLAIMED. AVAILABLE FROM THE FIRST THURSDAY.; E. V. (I). FOUR YEARS. RETIRED.; PASSED / the ferry line / BURNED; HE KNOWS. | — | — |

**Ch14 callbacks:** the reckoning gains a line by `out.photo11` ("You sent me her face." / "You told me about the eyebrow." /
"You turned the page. You were right to.") and by `out.slip11` (the ferry line recognised; "You passed me a page from her…";
"The page you burned… she sent it again, by post.").

**Rules honoured:** the page is not sexual; the refusal cost falls on the source; the skeptic is never punished; no cause of
death, no name for Nell or the sender.

**Deepening (2026-10-02):** `o11-clients-listen / -look / -speak` (lobby, before Iris), `o11-own-read / -trace / -close` (shelf, before the first
Evelyn's page), `o11-write-seen / -proved / -tomorrow` (dawn, before the night). Facts `c11.o-clients`, `c11.o-own`, `c11.o-write`; nothing reads them as flags.

**Tests:** `tests/state/outside-ch11.test.ts`, on the real Outside Chapter 9 golden played through Chapter 10: the entry (and
the Ch14 bridge stepping aside); photograph + pass + all, which authenticates (replay + decode) and hands on to Chapter 14
with Rafe's callbacks; heart + read + the ferry line; refuse + turn + burn + nothing, and a chosen night that fades. Also
played in the real UI on port 5181 to the card.

**Size (honest), pass 1:** ~1.52k (quiet) to ~1.88k (engaged) on one path, against the ~4.5k target.
