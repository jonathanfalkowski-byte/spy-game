# Institutional · Chapter 8: "Scope" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_8_SCOPE_DESIGN.md](../INSTITUTIONAL_CHAPTER_8_SCOPE_DESIGN.md) (approved 2026-09-29,
all eight decisions as recommended). Route: [../INSTITUTIONAL_ROUTE_DESIGN.md](../INSTITUTIONAL_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter8-institutional.ts`. It is wired through:
  - `src/content/chapter8.ts`: phase definitions, `place8`, blocks, choices, and the begin from an Institutional
    `chapter7.complete`;
  - `src/content/chapter9.ts`: Institutional now plays Ch8 first when it is enabled, and comes to the bridge from
    `chapter8.complete` ("Follow the vendor");
  - titles in `src/ui/App.tsx` (SCOPE / "Scope." / "Chapter 8 / Scope"), masters in `src/ui/environment-art.ts`, and
    node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER8`.
- **Entry:** `chapter8.begin-institutional` ("Three weeks on the books").
- **End:** the shared `complete`, with Institutional blocks; then Ch9's `begin-placeholder` ("Follow the vendor").
- **Naming:** phases are `rota → tasked → records → backseat → afterhours`. Choice ids carry `i8-`.
- **Keys:** `inst.task.*` (book / shade / refuse / scope), `inst.trust`, `inst.kept`, `inst.hearing`, `inst.file`
  (intact / copy / note), `inst.car` (press / ask / out), `inst.daniel-told`; sub-state `c8.i-message`,
  `c8.i-open`, `c8.i-weeks`, `c8.i-evening*`; facts `c8.i-vendor`, `c8.i-daniel-told`, `c8.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **rota** | Three weeks: 07:40, Terry, the coffee machine, Daniel's ties; the grey envelopes marked AX-7A. 23:02: "Ask Records for E.V. (I)." (Rook, the Unknown sender) | First the coffee machine (deepening): **i8-machine-kick** (low on the left, where Adrian did; "Who told you about that?") · **-show** ("Somebody taught me.") · **-cafe** (neutral). Then **i8-rota-reply** · **-sloane** ("Somebody wants you in Records. So do I, as it happens.") · **-leave** | `c8.i-machine`, `c8.i-message` |
| **tasked** | The hub: three of five, one a week. | **i8-task-debrief** (**-full** "Thorough." / **-shade** the drawing kept / **-refuse** walk him out) · **-compliance** (with her people term only **-page**, "As written."; otherwise **-tell** / **-shade** / **-refuse**) · **-benton** (**-no** / **-sloane** "I'll tell you which version." / **-doctor** "I'd have used the Thursday"; the name term bounces his trade) · **-report** (**-silent** "Somebody used to do this." / **-tell** / **-stand** "Development feedback") · **-file** (record term only: **-confront** "Seals are for keeping honest men honest." / **-margin** "Subject noticed." / **-quiet**). Refusal without the term costs a hearing (`inst.hearing`); with it, "Noted." After the second tasking (deepening), 02:00 and the hall camera's green light goes out for eleven minutes: **i8-light-look** (a man under the street lamp, counting floors) · **-ring** (Sloane: "Maintenance. A firmware push.") · **-sleep** (neutral) | `inst.task.*`, `inst.trust`, `inst.kept`, `inst.hearing`, `c8.i-light` |
| **records** | B2, the timers; Sloane on the line (backup term) or nobody. MERIDIAN HOLDINGS · VENDOR; the ORACLE page; LEGEND E.V. (II). PRIOR INSTANCE RETIRED · SINGAPORE. | First the dark (deepening; the timers go out in aisle nine): **i8-dark-torch** (PROJECT EVE (I), empty, a file's outline in the dust) · **-talk** (with the backup term; Sloane counts to twenty with her) · **-wait** (neutral). Then **i8-file-intact** · **-copy** (her own phone) · **-note** (into her coat) | `c8.i-dark`, `inst.file`; fact `c8.i-vendor` |
| **backseat** | The reading light, a hand's width apart. With the note held back: "Records loses things." "You're the second." | **i8-car-press** (if `c6.oracle-seen`) · **-ask** · **-out** | `inst.car` |
| **afterhours** | Friday. | **i8-evening-daniel** (then **i8-daniel-tell**: "I need a day." / **i8-daniel-notyet**) · **-maya** (if restored) · **-julian** / **-sebastian** (if available; the consent flow; **i8-stop** / **i8-stay**) · **-alone** | `c8.i-evening*`, `inst.daniel-told` |
| **complete** | The second card: DONE / SHADED / REFUSED; MERIDIAN · E.V. (I) · RETIRED; the note pinned face in; THE BOX WAS EMPTY. SOMEBODY GOT THERE FIRST.; DANIEL. KNOWS. | — (Ch9: "Follow the vendor") | — |

**Content:**
- Taskings are paper, people, and rooms with backup outside. Nothing is sexual, and nothing puts her body in scope.
- Refusal costs a note or a hearing, never safety.
- Daniel is told before anything happens, and asks for a day.
- Sloane's charge is attention only (a hand's width, the reading light, neither reaches across).

**Tests:** `tests/state/institutional-ch8.test.ts`, on real golden saves through Institutional Ch7:
- the entry;
- **by the book** (refusal / record / backup): the debrief, her file, the silent fix, Records with Sloane in her ear,
  the telling; to Ch9; authenticates;
- **her people and the name**: the compliance question withdrawn, Benton doctored, a copy kept;
- **no refusal, no backup**: the hearing, Records alone, the note held back;
- the partner evening: consent note, stop honoured, the fade.

`institutional-ch7.test.ts` now expects Ch7 to hand on to `chapter8.begin-institutional`.

**Deepening pass (2026-09-30):** three moments, each with a neutral pick (the machine, the green light, the dark).
Tests use a `NEUTRAL8` walker (`i8-machine-cafe`, `i8-light-sleep`, `i8-dark-wait`).

**Size (honest):** ~1.25k (quiet) to ~1.58k (engaged) at pass 1; ~1.59k to ~2.1k after deepening, against the
~4–4.5k target.
