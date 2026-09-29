# Executive · Chapter 13: "Held" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_13_HELD_DESIGN.md](../EXECUTIVE_CHAPTER_13_HELD_DESIGN.md) (approved 2026-09-29, all eight
decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md). Shared spine:
[../CHAPTER_13_THE_HONEYPOT_DESIGN.md](../CHAPTER_13_THE_HONEYPOT_DESIGN.md).

> **The road's reserved sexual-coercion beat.** It follows CONTENT_DIRECTION §2:
> - a content notice opens it (on the begin choice and at the top of `placement`);
> - on the comply path, getting ready, the car, the bar, the lift, the corridor and the door are on screen, and "The
>   door closes behind you." is the cut. Nothing behind the door is written;
> - the aftermath is on screen without detail;
> - refusal costs Julian's standing, never her body;
> - the comply lead-in honours the reader's **Fade coercion scenes** (`fadeExecutive13`, called from
>   `fadeCoercion13`: presentation only; the save and the ledger are never touched).

- **Code:** `src/content/chapter13-executive.ts`. It is wired through:
  - `src/content/chapter13.ts`: phase definitions, `place13`, blocks, choices, the begin from `chapter12.complete`,
    and the fade;
  - `src/content/chapter14.ts` and `chapter14-executive.ts`: Ch14 is entered from `chapter13.complete` ("Monday"),
    and the bridge is only a fallback;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER13`.
- **Naming:** phases are `placement → days → wednesday → claremont → twoam → saturday`. Choice ids carry `x13-`; keys
  live under `exec.*` and `c13.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **placement** | The notice. The Vesper by day, the book at her page. Owen Marsh; the Claremont; 1109; the camera behind the mirror. His inquiry is 14.3: "so, frankly, is Julian's future." The named cost of refusal: "the eleven signatures". With `exec.sign11 = signed`: "He signed for you at the Vesper." | **x13-placement-go** | — |
| **days** | Marsh as a person: the yellow jacket, the sandwich, the notice. "He is the only person in London doing his job." Tuesday, late, forty-one. First the week (deepening): **x13-week-cafe** (Marsh on the phone to his daughter before her anatomy exam) · **x13-week-maya** (if she is back; not one true sentence) · **x13-week-list** (Helix Group plc on the inquiry's public list; fact `c13.x-list`) · **x13-week-wall** (neutral). Then **x13-tell-now** (and first the rest of it, if Ch12 wasn't *told*): "What do you need me to be on Thursday?" Then **x13-need-lobby** / **x13-need-phone** / **x13-need-nowhere**. Or **x13-tell-notyet** | `c13.x-week`, `exec.told13 = before`, `c13.x-need` |
| **wednesday** | Wednesday evening (deepening): Julian at her door with takeaway (told before), or in her doorway, "Somewhere with a tablecloth." Then midnight, and C.: "Thursday, darling?" | First **x13-eve-close** (his sofa, the door open; or dinner, where he knows and doesn't ask) · **x13-eve-walk** (the river, no talking) · **x13-eve-alone** (neutral). Then **x13-answer-comply** · **x13-answer-refuse** · **x13-answer-turn** (with proof: the copy of page thirty-one, the Rotterdam original, the Number 9 schedule, or Ashby's words) · **x13-answer-swap** (if Iris is free) | `c13.x-eve`, `c13.x-answer`, `exec.honeypot13` (complied / refused / turn / swap) |
| **claremont** | **Comply** (fade-aware lead-in): a dress that is nobody's; the car; Julian at a lobby table if asked; Marsh at the bar; the lift; the corridor; "Are you all right?" **Refuse:** home, and "He orders his second whisky at eleven. It isn't too late." **Turn:** the truth in the lift; the staged scene, both in on it, both clothed, "Is this all right?" off the microphone (heat 2). **Swap:** Iris, 1108's cupboard, the card in a glove; a handshake at the lift. | Comply: **x13-door-look** / **x13-door-away**, then "The door closes behind you." Refuse: **x13-vigil-no** / **x13-vigil-silent**. Turn / swap: **x13-thursday-on** | `c13.x-door`; `exec.marsh13 = ally` (fact `c13.x-marsh`) / `exec.card13` (fact `c13.x-card`) |
| **twoam** | **Comply:** the car (or Julian, driving, silent); the shower as time; "Lovely. You see how easy it is."; on the phone path, he answers on the first ring. **Refuse:** "They will do it to him, on paper." **Turn:** Marsh at the taxi: "Nobody has ever warned me about anything." **Swap:** Iris: "Every one of them." | Comply, the recovery step: **x13-recover-julian** (held, nothing more; "He has not left." if he was in the lobby) · **x13-recover-maya** (if she is back) · **x13-recover-wall** ("DONE TO ME. NOT BY ME.") · **x13-recover-alone**. Otherwise, 2 a.m. (deepening). **Refuse:** **x13-refuse-note** (an anonymous card to Marsh, left-handed: WATCH WHO SITS TWO STOOLS ALONG; `exec.warned-marsh`, and Celeste knows) or **x13-refuse-call** ("Are you awake?" "Always, it seems."). **Turn:** **x13-friday-page** (his office, a car park view: "I've been looking for this clause for two years."; `exec.marsh-page`) or **x13-friday-wait**. **Swap:** **x13-card-lining** (Adrian's jacket) or **x13-card-iris** ("Nobody searches a woman who has already disappeared."; `exec.card-where`). Or **x13-twoam-on** (neutral) | `c13.x-recover`, `c13.x-twoam` |
| **saturday** | C., by answer: "He will be very useful." / the audit committee letter goes out Monday / "Very convincing." / "Somebody has been in my cupboard." | Told before: **x13-saturday-on**. Otherwise **x13-told-after** (fact `c13.x-told`) / **x13-told-never**. His answer, by path: "You don't owe me the details. You never will." / "Good. Let them come." / "I'd like to meet him." / "Then she's frightened. Good." | `exec.told13` (before / after / never) |
| **complete** | THE CLAREMONT. 1109. Then THURSDAY. HELD, AFTER. (or DONE TO ME. NOT BY ME.) / I SAID NO. HE PAID. HE SAID GOOD. / OWEN MARSH. ALLY. / EVERY ONE OF THEM. IN A GLOVE. Then HE KNEW / HE KNOWS / HE DOESN'T KNOW. | — (on to Ch14, "Monday") | — |

**Ch14 follow-ups made in the build:**
- Ch14's begin from `chapter13.complete` is "Monday", with no in-development text;
- on refuse, the audit committee's letter is in front of every chair at the board;
- on turn, Owen Marsh is in the gallery on the enforce way.

**Tests:**
- `tests/state/executive-ch13.test.ts`, a real save through Executive Ch7–12:
  - the entry with its notice;
  - **comply, told before:** the lobby, the fade (presentation), the cut, held after, and "Monday"; authenticates;
  - **refuse:** told after, and the audit letter;
  - **turn:** the staged scene, and Marsh an ally;
  - **swap:** with Iris free.
- `chapter13.test.ts` and `chapter14.test.ts` now check that a closed road (institutional) stays closed and that
  Executive gets its own entry.
- `executive-ch12.test.ts` switches Ch13 off to test the bridge fallback.
- `executive-ch14.test.ts` plays Ch13 (refusing, never telling) and enters straight from it.

**Deepening pass (2026-09-29):** three moments, each with a neutral pick, none of them near the door (the week,
Wednesday evening, and 2 a.m. on the refusal and counterplay paths). Tests use a `NEUTRAL13` walker (`x13-week-wall`,
`x13-eve-alone`, `x13-twoam-on`), and the Ch14 builder takes the neutral picks.

**Size (honest):** at pass 1, ~0.63k (refuse), ~0.82k (turn) and ~1.1k (comply). After deepening, ~0.72k (refuse,
quiet), ~1.04k (turn) and ~1.31k (comply), against the ~4.5k target. It is still the thinnest chapter on the road.
