# Institutional · Chapter 18: "No Further Action" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_18_NO_FURTHER_ACTION_DESIGN.md](../INSTITUTIONAL_CHAPTER_18_NO_FURTHER_ACTION_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_18_THE_POSITION_DESIGN.md](../CHAPTER_18_THE_POSITION_DESIGN.md).

- **Code:** `src/content/chapter18-institutional.ts`, wired through `src/content/chapter18.ts` (definitions, blocks,
  choices, and the begin from an Institutional `chapter17.complete`), titles (NO FURTHER ACTION), masters and node ids;
  `tests/state/chapter18.test.ts` now expects Institutional's own entry.
- **Gate:** `VITE_EVE_CHAPTER18`. **Entry:** `chapter18.begin-institutional` ("Friday"). **End:** `nfa`, a seventh
  phase added in the build for the two cards and the last line; nothing is offered after it. **The Institutional road is
  complete, Chapters 7 to 18.**
- **Naming:** phases `debrief → disposition → light → floor → particulars → scope → nfa`; ids carry `i18-`.
- **Keys:** the shared `end.position` (aim-terms), `end.switch`, `end.switch-to`, `end.with`, `end.name`, `end.later`,
  `end.consent`; Institutional `end.morning`, `end.sloane` (promoted / pen / reassigned / retired, from `sloaneEnd18`),
  `end.light` (down / form / tape / checked), `end.daniel` (hello / told-now / never), `end.scope` (three of refusal /
  record / name / backup / people / leave); fact `c18.i-evening-consent`.
- **Where Sloane ends (`sloaneEnd18`):** cut loose in Ch14 → retired; used in Ch17 → reassigned; vouched for → promoted;
  inside granted with Sloane allied (and not spent on the record in Ch15) → promoted; the proof road → reassigned;
  otherwise the pen.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **debrief** | The board's canon last word (Lisbon / Soames and an orchid / nothing). "Debrief. 10:00. Bring coffee. V.S.", or on the cut road Maya's "It's filed. Go back to sleep." | **i18-morning-sloane** ("You were not fit for purpose. I'd like that minuted." "Whose purpose?" "Exactly.") · **-daniel** (told) · **-sleep** | `end.morning` |
| **disposition** | The position by aim and terms (inside full: Officer, Client Assurance). Sloane's end: promoted / the pen / Records, aisle nine / Pimlico, "NO FURTHER ACTION. V." | First Maya's letter (deepening), IN RESPECT OF THE OPERATIVE: NO FURTHER ACTION., "Told you. M.": **i18-letter-frame** (the loo) · **-pin** · **-file** (neutral). Then **i18-switch-armed** · **-handed** (to the first holder, or the solicitor) · **-disarmed** | `c18.i-letter`, `end.switch`, `end.position`, `end.sloane` |
| **light** | The green light, in daylight, on its own. | **i18-light-down** ("It weighs nothing. It weighed everything.") · **-form** (REASON: NO FURTHER ACTION) · **-tape** (leave the Ch7 tape, or tape it now); on the proof road's new flat, **i18-light-checked** | `end.light` |
| **floor** | Terry (the badge back with a new number, on inside with `cost15 = badge`); Priya, by her receipt; Daniel's "Hi. Daniel." answered ("Hello, you.") or said to a stranger. | Not told: **i18-daniel-told-now** ("I knew the coffee machine. I didn't know I knew you."; no night attached) · **-never**. Then one last walk (deepening): **i18-desk-adrian** (the mug, nine across) · **-machine** (Daniel: "A paperclip and a threat.") · **-lift** (neutral). Then **i18-home-daniel** (told before Ch18) · **-julian** / **-sebastian** · **-maya** · **-none** | `end.daniel`, `c18.i-desk`, `end.with`, `inst.daniel-told = late` |
| **particulars** | The NAME box: Axiom's new contract / the regulator's witness statement / her own form. | **i18-name-adrian** · **-evelyn** · **-new** | `end.name` |
| **scope** | A year later, by position. The page headed SCOPE; three terms, Sloane's pencil answering Ch7 ("Yours now."; "Countersigned. V.S.", or retired, "I can't sign this. I've pencilled it anyway. V."). | First her own file, as requested (deepening): **i18-file-read** (the last log entry: "CAMERA REMOVED BY SUBJECT. SUBJECT SMILED." or its equivalent) · **-sloane** (not retired: "FIT FOR NO PURPOSE BUT HER OWN. V.S.") · **-unopened** (neutral). Then **i18-scope-…** ×3. With a partner: **i18-later-invite** → **-no-sex** / **-sex** (only if a chosen night with him before) / **-goodnight**, then **-stop** / **-close** (fades), or **-quiet**. Alone: **-own**. Maya: **-maya** | `c18.i-file`, `end.scope`, `end.later`, `end.consent` |
| **nfa** | WHO IS WATCHING HER? (I AM. / SHE IS. SHE ALWAYS WAS. / NOBODY. GOOD.); WHO IS WATCHING ME? (NOBODY. THE LIGHT IS OFF. / NOBODY. I KEPT THE TAPE. / NOBODY. I CHECKED.); NO FURTHER ACTION.; the last line by name. | — | — |

**Tests:** `tests/state/institutional-act4.test.ts`:
- the entry;
- **inside:** Sloane and Maya, Benton suspended; vouch; resigned; Officer, Client Assurance; a chosen night with
  Daniel; I AM.; authenticates;
- **channels on the cut road:** Benton's escort, the empty box, Sloane retired, NOBODY. GOOD.;
- **walk after the proof:** her own paper, Sloane used and reassigned, the new flat;
- **Daniel never told:** told now, not a partner that night, the board short of resigned.

Also played in the real UI on port 5181, from the long room to NO FURTHER ACTION, with no console errors.

**Deepening pass (2026-09-30):** three moments, each with a neutral pick (`i18-letter-file`, `i18-desk-lift`, `i18-file-unopened`); a sixth test covers the non-neutral picks across Ch16–18.

**Size (honest):** ~0.86–1.21k at pass 1; ~1.07k (walk, alone) to ~1.47k (inside, with Daniel) after deepening, against the ~3.5k target.
