# Outside · Chapter 7: "The Sender" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md](../OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md) (approved 2026-09-30, all
eight decisions as recommended). Route: [../OUTSIDE_ROUTE_DESIGN.md](../OUTSIDE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter7-outside.ts`, wired through `src/content/chapter7.ts` (definitions, blocks, choices,
  and the entry from the Chapter 7 confirm beat when the road is `outside`, via `nextFor` → `flit`); `place7` in
  `chapter7-own.ts`; titles in `src/ui/App.tsx` (THE SENDER); masters in `src/ui/environment-art.ts`; node ids in
  `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER7`. **Entry:** the confirm beat's `route-confirm` / `route-pivot-outside` /
  `route-break → confirm-break`, which sets `route.lane = outside` and lands on `flit`. **End:** the shared `complete`
  ("Where It Points"); the road continues to the shared Chapter 9 bridge placeholder until Outside Chapter 8 exists.
- **Naming:** phases `flit → room → rules → page → price → dusk`; choice ids carry `o7-`. Keys under `out.*` and
  `c7.o-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **flit** | 08:00, the watched flat one last time; the green light goes dark on its own in an hour. | **o7-flit-note** ("YOU WATCHED THE WRONG PERSON. — 7A") · **-tape** (the last strip over the light) · **-nothing** | `c7.o-flit` |
| **room** | 11:00, above the shut chandler's shop by the ferry terminal; a room the sender paid three months up, in cash. | **o7-room-kindness** · **-hook** · **-room** | `c7.o-gift` |
| **rules** | Noon, the 02:40 phone rings; the disguised voice pauses before her name. She writes her rules of trade, three of five. | **o7-rule-verify** · **-provenance** · **-source** · **-people** ("I traded a person once. I'm still paying.") · **-door**. The third pick lands on `page`. He keeps one rule of his own, mirrored to hers (people → "I will never ask you to be her."; door → "I'll take my door too, one day."; source → "I'll never send you at a person."; else → "everything I send you is true, or marked where it isn't."). | `out.rules`; fact `c7.o-rules` |
| **page** | Afternoon; the first page by Ch6: `c6.oracle-seen` → the full ORACLE assessment; else `c6.rook-proof = supported` → a Project Eve board name; else → a year-old shipping manifest (the thin true page for the doubter). | **o7-page-verify** (slow, certain) · **-raw** (fast, risky) · **-aside** (take it, watch him) | `out.page1` (oracle / board / thin), `c7.o-page` |
| **price** | Always information, never money, never her; refusable. The `c3.misdirect-rook` surcharge is a line, not a wall. | **o7-price-fact** (a detail she holds; sets `out.gave-fact`) · **-answer** ("Did you say yes, or only stop saying no?") · **-debt** (sets `out.alliance.rook = owed`) · **-refuse** (keeps the room, loses the page; sets `out.refused-price`) | `out.price1`, `out.gave-fact` / `out.alliance.rook` / `out.refused-price` |
| **dusk** | 19:00, a room nobody watches; no green light. | **o7-evening-{julian,sebastian}** (from before; the consent flow → `-no-sex` / `-sex` / `o7-leave`, then `o7-stop` / `o7-stay`; fades) · **o7-evening-maya** (`c6.maya = restored`; "You can't hide from a woman in compliance by disappearing.") · **o7-evening-alone** (the window, the river side) | `c7.o-evening*`; fact `c7.o-evening-consent` |
| **complete** | The wall over the table: THE SENDER. / WHO IS HOLDING THE PAGE? plus a corner line by the price (I OWE HIM ONE / I SAID NO AND HE STAYED) and, if `no people` was chosen, HE TRADED A PERSON ONCE. | — | — |

**Deepening (2026-10-02):** `o7-hand-compare / -keep / -burn` (room, before the gift), `o7-voice-record / -listen / -pauses` (rules, before the first
rule), `o7-phone-drawer / -sill / -pocket` (dusk, before the evening). Facts `c7.o-hand`, `c7.o-voice`, `c7.o-phone`; nothing reads them as flags.

**Tests:** `tests/state/outside-ch7.test.ts`, on real Chapter 6 saves routed onto the Outside lane: the entry; the rules
(three of five, his matching rule) with the ORACLE page verified and a fact paid; the lie surcharge, the board page, a
debt owed, and a chosen night that fades; the thin page for the doubter, refused at no cost. A fifth authenticates on
the `maximal-trade` golden routed onto Outside (replay + decode). Also played in the real UI on port 5181 to the card.

**Golden note:** building Outside retired the last in-development stand-in. The `outside-placeholder` (Chapter 7 golden)
and `outside-placeholder-all` (Chapter 9 golden) routes, which previously stopped at the Chapter 7 in-development line,
were recaptured to play through the built Chapter 7 to `complete`; `rev20-golden-ledgers.json` was regenerated from
them. The protected `rev19-golden-ledgers.json` (Chapters 1–5) is unchanged.

**Size (honest), pass 1:** ~1.76k (quiet) to ~1.84k (engaged) on one path, against the ~4.5k target.
