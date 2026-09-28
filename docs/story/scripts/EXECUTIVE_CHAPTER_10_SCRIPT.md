# Executive · Chapter 10: "A Lovely Man" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_10_A_LOVELY_MAN_DESIGN.md](../EXECUTIVE_CHAPTER_10_A_LOVELY_MAN_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_10_SHE_KNOWS_DESIGN.md](../CHAPTER_10_SHE_KNOWS_DESIGN.md).

- **Code:** `src/content/chapter10-executive.ts`. It is wired through:
  - `src/content/chapter10.ts`: phase definitions, place lines, blocks, choices, and the begin from `chapter9.complete`;
  - `src/content/chapter14.ts`: the bridge now starts at `chapter10.complete`;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER10`. With it off, the Ch14 bridge still starts at `chapter9.complete`.
- **Entry:** `chapter10.begin-executive` ("Monday") at an Executive `chapter9.complete`.
- **End:** the shared `complete`, with Executive blocks, then `chapter14.begin-executive` ("[Chapters 11–13 ·
  executive road — in development]") until Executive Ch11 exists.
- **Naming:** phases are `orchid → lindqvist → calendar → paper → week → night`. Choice ids carry `x10-`; keys live
  under `exec.*` and `c10.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **orchid** | Monday 07:10: a white orchid on her desk on forty-one, and *Breakfast? Wednesday. The Lindqvist, seven. — C.* Nobody saw it arrive. | **x10-go** · **x10-summon** ("Forty-one. Nine o'clock. — E.") | `c10.x-went` (went / summoned) |
| **lindqvist** | The Lindqvist, or Celeste at Julian's reception with half the floor walking past. The inventory: a term quoted exactly (files, firewall or name), the flat, the tray (told: "Somebody taught him to read"; pulled: "Marcus has been looking for a document since April"; **kept: nothing**, and she knows it), Clare's folder, the office floor at two, the debt to Sloane. Then "Eat your eggs, Adrian." | **x10-adrian-composed** · **x10-adrian-ask** ("Only to help.") · **x10-adrian-walk** ("One more thing, darling. It's about him.") | `c10.x-adrian` |
| **calendar** | "He's a lovely man… He'll never survive us. Unless you help me." The black phone, one contact: C. His week, every Friday. | **x10-calendar-give** · **x10-calendar-doctor** · **x10-calendar-refuse** (she tucks the phone into her coat anyway) | `exec.calendar` (gave / doctored / refused), `exec.celeste10` (trusted / fooled / refused); fact `c10.x-order` |
| **paper** | Noon, the City pages: OLD MONEY, NEW BLOOD. Julian in her doorway: "You didn't tell me you knew Celeste Laurent." With `exec.file = told`: "Laurent." | **x10-paper-old** · **x10-paper-work** · **x10-paper-quiet**. None tells him the order. | `exec.paper10` |
| **week** | **gave:** his week in four seconds, "Thank you, darling." **doctored:** Thursday's Morel call moved in the copy, and Marcus outside the wrong room. **refused:** Gdańsk called early, a week of his life, "That was a small one, darling. Friday?" Then the Vesper invitation in his diary: *do bring your chief of staff. C.L.* | **x10-week-yes** | fact `c10.x-vesper` |
| **night** | Friday night. | **x10-night-julian** (on the give path, the black phone buzzes in her bag at his table), then the scope: **x10-julian-no-sex**, **x10-julian-sex** (if Ch6 warmed things or she stayed with him in Ch7 or Ch8), **x10-leave**; then **x10-stop** / **x10-stay** (fades). **x10-night-maya** (if she is back: "Whose leash is that?") · **x10-night-alone** (the phone face down, like his photograph) | `c10.x-night*`; fact `c10.x-evening-consent` |
| **complete** | The top of the wardrobe door: CELESTE LAURENT. "HE'S A LOVELY MAN." Under it, the answer: GIVEN. EVERY FRIDAY. FOUR SECONDS. / DOCTORED. MARCUS OUTSIDE THE WRONG ROOM. / REFUSED. GDAŃSK. HE NEVER KNEW. | — (on to the Ch14 bridge) | — |

**Ch14 follow-ups made in the build:**
- the bridge text now reads "Chapters 11–13";
- Celeste's line in the car becomes "I told you at breakfast, darling. He's a lovely man…";
- `exec.calendar` is now set by play, and Ch14's "Thank you for his calendar" follows it.

**Content:**
- Julian is never a trap.
- The order is where he will be, never his body.
- The refusal cost is his week (non-sexual). Adrian's name is kept for Ch14.
- The night is chosen, consent-gated, heat 3, and fades.

**Tests:**
- `tests/state/executive-ch10.test.ts`, a real save through Executive Ch7, Ch8 and the Ch9 bridge:
  - the entry, rather than the Ch14 bridge;
  - **give:** the told-tray inventory, Clare and the floor at two, four seconds, the phone at his table; authenticates;
  - **doctor:** summoned to forty-one, the kept copy secret, Marcus outside the wrong room;
  - **refuse:** walks out, Gdańsk, and Ch14 remembers breakfast.
- `executive-ch14.test.ts` now plays Ch10 (refusing) on its way to the bridge.

**Size (honest), pass 1:** ~0.95k (quiet) to ~1.2k (engaged), against the ~4.5k target. First in line for deepening,
alongside Ch14.
