# Predator · Chapter 7: "The Offer" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_7_THE_OFFER_DESIGN.md](../PREDATOR_CHAPTER_7_THE_OFFER_DESIGN.md) (approved 2026-09-27, all
seven decisions as recommended). Route: [../PREDATOR_ROUTE_DESIGN.md](../PREDATOR_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter7-predator.ts`, wired through `src/content/chapter7.ts` (phases, blocks, choices), with
  place lines in `place7` and environment masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER7` (revision ≥ 19).
- **Entry:** the Chapter 7 confirm beat when the road is `predator` (confirm, pivot or break). The chapter then hands
  on to the shared Chapter 9 bridge (`chapter9.begin-placeholder`), as the other Act II roads do until their own
  chapters are built.

Phases: `summons → office → terms → corridor → floor → evening → complete`

| Phase | Place | Choices | Flags |
|---|---|---|---|
| **summons** | 08:30 · the kerb | **car-ask** (Pryce: "a fund that keeps a few of us on its books") · **car-read** (her own terms copied in pencil on the back of the card) · **car-quiet** | `c7.p-car` |
| **office** | 09:00 · Helix, the 38th floor | Marcus reads `c3.memo`, the Glass House capture and `c5.published`, then "What do you want?": **want-money** · **want-title** · **want-desk** ("Yours.") | `c7.p-want`, `pred.want` |
| **terms** | 10:15 · Marcus's desk | Three of five clauses, in her words: **clause-exit** · **clause-access** · **clause-report** · **clause-indemnity** · **clause-private**. On the third he signs, and a signing advance lands ($3,000 for want-money, else $1,500); fact `c7.p-contract` | `pred.clause.<id>`, `c7.p-clauses`, `own.cash` |
| **corridor** | 11:00 · the executive floor | Julian, by `c6.friction-julian`: **julian-truth** ("Then take it well"; ally, or rival if cooled) · **julian-lie** (casualty) · **julian-past** (rival) | `c7.p-julian`, `pred.julian` |
| **floor** | afternoon · her office, 36th floor | The first lever: the Ch1 Novagen note under E. BENTON, countersigned by a Helix director eleven days before compliance cleared it. **lever-read** (the different ink) · **lever-copy** · **lever-return** (HR: it came up from Mr Chen's office, personally). Fact `c7.p-novagen` | `c7.p-lever`, `pred.lever` |
| **evening** | 19:00 · her flat | **offer-evening-marcus** (always) · **offer-evening-julian** (only if not cooled in Ch6 and not lied to) · **offer-evening-alone** (the contract read like a love letter). Partners go scope (**no-sex / sex / leave**), then **stop / stay**; fact `c7.p-evening-consent`; heat 3; fades | `c7.p-evening*` |
| **complete** | late | The ledger on the wardrobe door: Marcus, what he owes, the lever, Julian. "Then we will see whose desk it is." | — |

**Content:** she never sexually coerces anyone. Marcus's evening is mutual appetite, and he says "I don't buy this"
before anything happens. Both evenings are consent-gated and fade at the act.

**Tests:**
- `tests/state/predator-ch7.test.ts`: every scene; clause selection; Julian eligibility; the lever facts; the consent
  flow; the hand-off to Chapter 9. A real save (the `maximal-julian` golden, played through Chapter 6 into Predator)
  replays and authenticates.
- `tests/state/predator-lane.test.ts`: the lane.
- No golden ledger reaches this road, so there is no migration.

**Size (honest):** pass 1 is **~1.8–2.2k words on one path**, after the shared confirm beat, against the ~4.5–5k
design target. It sits where the Celebrity chapters' first passes did. A deepening pass would give the office more of
Marcus, the floor a second beat, and the evening more room.
