# Predator · Chapter 8: "The Floor" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_8_THE_FLOOR_DESIGN.md](../PREDATOR_CHAPTER_8_THE_FLOOR_DESIGN.md) (approved 2026-09-27, all
seven decisions as recommended).

- **Code:** `src/content/chapter8-predator.ts`, wired through `src/content/chapter8.ts` (phases, blocks, choices,
  `place8`), plus `src/ui/environment-art.ts` (Helix masters).
- **Gate:** `VITE_EVE_CHAPTER8`.
- **Entry:** `chapter8.begin-predator` from a Predator `chapter7.complete`.
- **Exit:** `chapter9.begin-placeholder` ("Follow the fund") from `chapter8.complete`. With Chapter 8 disabled,
  Predator still goes from Chapter 7 straight to the bridge.

Phases: `weeks → hub → friday → julian → evening → complete`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **weeks** | The first ten days: the 7:40 lift, whose calls go unanswered, Hollis laughing a beat late, Pryce polishing Marcus's car. A thought by `pred.want`. The page headed OWES. | **weeks-begin** | — |
| **hub** | Two of four levers. **pull-hollis** (warm, hot or cold by `pred.hollis`: the board-seat letter on L.S.F. Advisory paper) · **pull-counsel** (Ines Varga and the CFO Robert Lyle on level B2; Pryce sees her see them) · **pull-archive** (Harland Strategic, Benton's brother-in-law, eleven months of "consulting"; every Marcus deal part-financed by L.S.F.; free with the **access** clause) · **pull-press** (only with `c5.published`: THE NEW HELIX?; the **private** clause makes it hers). Each then **use / hold / spare**. The second counted pull triggers the clock: Marcus alone with the **report** clause, otherwise the audit committee. **hub-stop** after one pull. | `pred.lever8.<id>`, `c8.p-pulls`, `c8.p-open`, `pred.hollis` (owned), `pred.lsf` (wire); facts `c8.p8-hollis`, `-counsel`, `-archive`, `-press` |
| **friday** | The bar at the top of the building. "So. What have you found?" **friday-tell** · **friday-lie** · **friday-trade** (the fund and its size) · **friday-walk** (only with the **exit** clause: "Stay, would you? I'd miss the view"). If no wire was found, Marcus boasts the name anyway: L.S.F. Advisory, "a woman in London who likes to own things quietly". | `pred.friday`, `pred.lsf` (boast) |
| **julian** | By `pred.julian`. **Ally:** julian8-take (the CFO's private calendar, four L.S.F. meetings; fact `c8.p8-lyle`) / julian8-thank. **Casualty:** julian8-use / hold / spare (the favour he lied to Marcus about). **Rival:** julian8-confront / shrug (he warned Hollis and Varga). | `pred.julian8` |
| **evening** | **p8-evening-marcus** (the council flat in Leeds, his mother who cleaned offices like this one) · **p8-evening-julian** (unless cooled in Ch6, or a casualty she used) · **p8-evening-alone**. Scope (no-sex / sex / leave), then stop / stay; fact `c8.p8-evening-consent`; heat 3; fades. | `c8.p-evening*` |
| **complete** | The ledger grows (each lever and what she did with it). At the top: **L.S.F. ADVISORY**. "The stairs go on." | — |

**Content:** the counsel's secret is an affair. Using it is non-sexual blackmail shown on screen, with its cost (the
husband, the children). Sparing her is written as the stronger move ("not because you could make me"). No victim
deserves it, and each lever has a spare.

**Tests:** `tests/state/predator-ch8.test.ts`:
- the entry;
- the four levers, the free archive and the clock;
- Friday on every path (the name reaches all of them), and the walk;
- Julian by stance;
- the consent flow and the ending;
- a real save that replays and authenticates.

## Deepening pass (2026-09-27)

- **Thursday night** (`hub`, after the hub closes on the second pull or on hub-stop, before Friday) (`c8.p-night`):
  - **night-pryce**: Marcus is in Zurich, and Pryce drives her home in the rain. Marcus keeps a copy of everything
    in a safe behind a painting of a horse he doesn't like, and "the fund keeps a copy of his copy. It's the fund
    he's afraid of. Not you. Not yet."
  - **night-maya** (only if Maya is back): "Keep one thing in your life that isn't a lever. Keep me." / "You're not
    on the page, Maya. You're the reason there is one."
  - **night-home** (neutral).
- **The price** (the opening of Friday): every lever she pulled comes back in a line, used or spared:
  - Mrs Hollis's white roses, or the cottage in Norfolk;
  - Varga in the lift not looking at her, or a coffee on her desk with no note;
  - Graham Harland ringing from a garden centre, or Benton "stepping back for family reasons";
  - her face twelve feet high in the lobby, or a question mark on a mood board.

  "Every lever has a person on the other end … they would keep turning up at the lifts."
- **Friday drinks at greater length:**
  - Marcus's tie and watch laid on the bar like a gun, drinking faster;
  - the cleaners vacuuming round his desk far below;
  - the first company he took apart, and its chair, which is the one she sits in.

**Size (honest):** pass 1 ran ~1.2k quiet, ~1.4k clean and ~1.8k ruthless. After the deepening pass: **~1.3k quiet,
~1.8k clean, ~2.2k ruthless**, against the ~4–4.5k target. The quiet path stays thin by design, because holding
levers is quiet. The next lift is a scene per victim (a visit, not a line), and Marcus's safe as a setup for Ch14.
