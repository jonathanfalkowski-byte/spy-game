# Executive · Chapter 18: "Read Twice" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_18_READ_TWICE_DESIGN.md](../EXECUTIVE_CHAPTER_18_READ_TWICE_DESIGN.md) (approved
2026-09-29, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_18_THE_POSITION_DESIGN.md](../CHAPTER_18_THE_POSITION_DESIGN.md).

- **Code:** `src/content/chapter18-executive.ts`. It is wired through:
  - `src/content/chapter18.ts`: phase definitions, blocks, choices, and the begin from an Executive `chapter17.complete`;
  - `chapter17-executive.ts`: its "[Chapter 18 · executive road — in development]" line shows only when Ch18 is off;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER18`.
- **Entry:** `chapter18.begin-executive` ("Friday") at an Executive `chapter17.complete` (the front door).
- **End:** `read`, the last card, "The end of the Executive route." Nothing is offered after it. **The Executive road
  is complete, Chapters 7 to 18.**
- **Naming:** phases are `friday → settle → keys → dinner → signed → page → read`. Choice ids carry `x18-`.
- **Keys:** the shared `end.*` keys (`morning`, `position`, `switch`, `switch-to`, `with`, `name`, `later`,
  `later-open`, `consent`) plus the Executive `end.keys`, `end.photo`, `end.answer`, `end.page`, `end.term`, and
  `c18.x-dinner`; fact `c18.x-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **friday** | By the board: resigned (the business pages; Lisbon, "You were worth it. C."), diminished (Soames's letter; an orchid, no card), closed (nothing). Julian at seven: "I read it twice…" (if he read the minute), "Well?" (if waiting), or terrible coffee. | **x18-friday-julian** (the steps; "Well?" "Well.") · **-sleep** · **-nora** (if Nora is an ally; "Then I'll sleep tonight.") | `end.morning` |
| **settle** | The position by aim and terms: **term** (full: 14.3 struck, the office next door with her name, Director, Counterparties; partial: ACTING; none: the slow public refinancing), **exit** (the door term, on one month's notice; references or not), **spent** (Julian released; the smaller flat), **nell** (the minute; the harbour wall with Nora). The switch. | First the lift (deepening): **x18-lift-julian** (his little finger against hers on the rail; "After you.") · **-hold** (a girl running late, who reads the directory first) · **-count** (neutral; the floors, the way Adrian counted them). Then **x18-switch-armed** · **-handed-{who}** (only if someone other than the solicitor holds a key) · **-disarmed** | `c18.x-lift`, `end.switch`, `end.switch-to`, `end.position` (aim-terms) |
| **keys** | What of his she still holds (the flat key, the black card, the car, the dress), unless she gave it all back in Ch15 or never took it. | **x18-keys-keep** ("I like it here. I chose it.") · **-return** ("You didn't have to." "I know. That's why.") · **-buy** (an invoice from facilities) · or **-none** (her own keys) | `end.keys` |
| **dinner** | Seven o'clock, the wardrobe mirror (deepening), then Pimlico, his choice, her bill; the silver frame face down by the bread: "I said I'd tell you sitting down." | First the dress: **x18-wear-his** (if she still has it) · **-new** (oxblood, bought herself; "Oh,") · **-black** (neutral; "You look like the first morning"). Then **x18-dinner-photo** (the woman at the summer party; the first 14.3 the week she left; then **x18-photo-up** / **-down** / **-his**) · **-terms** ("Read. … And learn to cook.") · **-quiet**. Then the answer, in ink (THE TRUTH, if `exec.told13 = never`, told at dinner: "I know. … I was waiting to be told."; WHATEVER I CHOOSE, if she kept it; NOTHING otherwise). Then **x18-home-julian** (a partner, not a keeper) · **-maya** (if close) · **-none** | `c18.x-wear`, `c18.x-dinner`, `end.photo`, `end.answer`, `end.with` |
| **signed** | The wardrobe door, the last time: the people, one line each (Marsh, Sloane's "Square.", Iris's ENDED, Nora's wall, Hal, Clare Adeyemi, the minute). | First the card kept out (deepening): **x18-card-first** (in her purse) · **-nell** (inside the coffee cupboard) · **-none** (neutral; the pin holes like stars). Then **x18-name-adrian** · **-evelyn** · **-new** | `c18.x-card`, `end.name` |
| **page** | A year later, by position; a blank page, ADDITIONAL TERMS. | With Julian: **x18-page-write** (his three), then hers: **x18-term-stay** / **-door** / **-files**; then **x18-later-invite** (→ **x18-later-no-sex** / **-sex** (nightOk) / **-goodnight**; then **x18-later-stop** / **-close**) or **x18-later-quiet**. Alone: **x18-page-own**, then **x18-later-maya** (if with Maya) / **-quiet** | `end.page`, `end.term`, `end.later-open`, `end.consent`, `end.later`; fact `c18.x-evening-consent` |
| **read** | The last card under the first: the answer in ink; the last line by name. | — (the end of the route) | — |

**Content:**
- Julian is never a trap, a reward or a price, and never the only good road; going home alone is complete.
- Keeping, returning or paying for the kept life is never punished.
- The last night is chosen, heat 3 at most, consent in character (scope, then stop / stay), and fades. The sex scope
  is offered only where a night with Julian was chosen before (`c6.friction-julian = warmed`, or an earlier intimate
  outcome).
- The photograph is his ordinary grief, nothing to do with Meridian.

**Tests:**
- `tests/state/executive-ch18.test.ts`, a real save through Executive Ch7–17:
  - the entry;
  - **term, in full, with Julian:** the office next door, the photograph face up, the page written by both, a
    chosen night (no-sex); authenticates;
  - **exit, partial, alone:** the door term, everything already given back, a page of her own;
  - **Nell, closed:** the harbour wall, the kept life kept, the door written first;
  - the answer by the kept life when she told him before (state override);
  - the night offered only where chosen before, and stop honoured (state override).

  The real saves all reach dinner with `exec.told13 = never` and no night chosen earlier. The last two tests set
  flags on the save.
- `chapter18.test.ts` now checks that a closed road (institutional) stays closed and that Executive gets its own entry.

**Deepening pass (2026-09-29):** three moments, each with a neutral pick (the lift, the dress, the card kept out), and
more of Friday and the year. Tests use a `NEUTRAL18` walker (`x18-lift-count`, `x18-wear-black`, `x18-card-none`).

**Size (honest):** ~0.95k (quiet) to ~1.33k (engaged) at pass 1; ~1.27k to ~1.79k after deepening, against the ~3.5k
target.
