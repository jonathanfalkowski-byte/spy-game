# Predator · Chapter 12: "The Counterparty" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_12_THE_COUNTERPARTY_DESIGN.md](../PREDATOR_CHAPTER_12_THE_COUNTERPARTY_DESIGN.md)
(approved 2026-09-27, all eight decisions as recommended).

- **Code:** `src/content/chapter12-predator.ts`, wired through `src/content/chapter12.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER12`.
- **Temporary entry:** `chapter12.begin-predator` ("Follow the money") from a Predator `chapter9.complete`, until the
  Predator Chapters 10–11 exist.
- **End:** its own phase, `ledger`.
- **Chapter 13's entry moved here:** `chapter13.begin-predator` ("The winter") is now offered from
  `chapter12.ledger`, not from `chapter9.complete`.

Phases: `geneva → bank → morel → vault → lake → call → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **geneva** | Marcus's brief ("Sign what they put in front of you. And read it first. I never do."). The rain, the Quai, the fountain switched off for the winter. The report clause means nobody on the floor knows she is here. | **arrive-bar** (Robert Lyle, the CFO, with a man in grey who raises a glass to her; the thought changes if Julian gave her Lyle's calendar) · **arrive-julian** (an ally's one line: "Read the footnotes. Come back.") · **arrive-window** (neutral) | `c12.p-arrive` |
| **bank** | Morel & Cie: no name on the door, Maître Rochat, forty pages. The private clause means she declines the bank's camera. The archive schedule means she reads it fast. Clause 14.3: if the deal fails, L.S.F. Advisory takes first claim on Helix itself. | **sign-all** · **sign-amend** (strike 14.3; Lucien in the doorway: "Nobody has ever struck 14.3.") · **sign-copy** (keep page thirty-one) | `pred.sign` (all / amended / copied); fact `c12.p12-clause` |
| **morel** | The dining room under the skylight. Lucien: late thirties, grey eyes, four languages, writes nothing down. The sole and the Chasselas: "You're the second one." Her face in the papers "and before that, on somebody else" (if published). "You want the chair, not the cheque" (desk). | First **lunch-truth** ("I have something of hers") · **lunch-deny** · **lunch-turn** ("A boy who wanted to be a pianist … I play at night now"). Then the take: **take-ask** (only after the truth) · **take-trade** · **take-night** (always) | `c12.p-lunch`, `c12.p-take`, `pred.morel` (ally / trade / unaware), `pred.ally.morel` |
| **vault** | **Ask:** 20:00, two keys, the green ledger on a lectern, Nell's note "Close it. Send the rest to Nora. — E.L.", and "She asked me to help her disappear … I have been sorry for a year." **Trade:** 17:00, his office, the closed piano, a plain envelope, "Two professionals." **Night:** 05:00, the cleaners' tabard, the records room, a small red light. On every road, the list: nine flats, one of them hers; every order signed C.; Nell's account closed eight days after the harbour, its balance to Nora. | **list-nell** · **list-own** ("costs less a month than Marcus's car") · **list-close** | `pred.geneva = list`, `pred.nell = known`; fact `c12.p12-list` |
| **lake** | The last night. The card, face down: a number and a figure in pencil, "working capital". | First **account-take** (+$25,000; the fund's hook) · **account-decline** ("She said exactly the same thing. The first one.") · **account-move** (only with the indemnity clause or the archive schedule; to Zurich by seven, +$25,000). Then **lake-lucien** (his flat on the Quai; "Nothing you have asked me today … has anything to do with this") or **lake-alone**, then the consent flow (no-sex / sex / leave, then stop / stay). It fades. | `pred.account` (taken / declined / moved); fact `c12.p12-evening-consent` |
| **call** | Two in the morning; nine in Singapore; the Holland Village number. | **call-truth** (Nora: "She had a bad leg … She would never have walked the harbour wall. Remember that.") · **call-bank** ("Tell her friend the tall one that I spent it on my son.") · **call-none** (the number goes into Adrian's jacket) | `pred.nora` (told / lied / none); fact `c12.p12-leg` |
| **ledger** | Home, touching things. The card: ELEANOR LINDEN. NINE FLATS. C. And THIS FLAT. Celeste, by road: the tabard (night); "Lucien tells me you are charming" (an evening, not on the ask road); "Lucien has gone very quiet" (ask); "a hard bargain" (trade). The card kept, or Zurich. | — (Chapter 13 enters from here) | — |

**Chapter 14 follow-ups (built):**
- **Board way:** Legal reads clause 14.3 from Geneva.
- **Press way:** a fourth paragraph about Geneva.
- **Trade road:** Marcus's line, "Rotterdam's follow-on went to Morel's own house … It was you, of course."

**Content:**
- The evening is chosen, mutual and heat 3. It fades, and it is never tied to the list: Lucien says so before he
  asks.
- Nothing is coerced. Lucien's help on the ask road comes from his own regret, and she only asks.

**Tests:**
- `tests/state/predator-ch12.test.ts`: the entry (Ch13 no longer offered from Ch9), and the ask, trade and night
  roads. The ask road replays and authenticates; the trade and night roads replay.
- `predator-ch13` and `predator-ch14` now walk through Geneva on its quiet picks.

**Size (honest), pass 1:** ~1.5k (night, quiet), ~1.7k (trade) and ~1.8k (ask, engaged), against the ~4.5k target.
