# Executive · Chapter 11: "The Good Pen" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md](../EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared set: [../CHAPTER_11_THE_ASSET_DESIGN.md](../CHAPTER_11_THE_ASSET_DESIGN.md).

- **Code:** `src/content/chapter11-executive.ts`. It is wired through:
  - `src/content/chapter11.ts`: phase definitions, place lines, blocks, choices, and the begin from `chapter10.complete`;
  - `src/content/chapter14.ts`: the bridge now starts at `chapter11.complete`, or at the last playable of Chapters
    9–11 (`executiveBridgeFrom14`);
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER11`.
- **Entry:** `chapter11.begin-executive` ("The first Thursday") at an Executive `chapter10.complete`.
- **End:** the shared `complete`, with Executive blocks, then `chapter14.begin-executive` ("[Chapters 12–13 ·
  executive road — in development]") until Executive Ch12 exists.
- **Naming:** phases are `frames → pages → pen → signing → drive`. Choice ids carry `x11-`; keys live under `exec.*`
  and `c11.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **frames** | The dress (bought on his card if she took it in Ch8, or her own), Hal, Julian in black tie: "Like something I'd have to read twice." The empty frames. Celeste: "Julian. At last." Then, by Ch10's answer: "You've been such a help." / "One of your Fridays had a little mistake in it… Everybody makes one." / "Pity about Gdańsk." The clients: availability, placement. Julian hears it. | **x11-room-stay** · **x11-room-work** (Halvorsen: "the autumn collection is in the anteroom tonight") · **x11-room-watch**; then the dance (deepening, a quarter to nine): **x11-dance-gulf** ("placements are usually for a season") · **x11-dance-julian** (badly, in front of every client; "you watch them revise their prices") · **x11-dance-no** (neutral) | `c11.x-room`, `c11.x-dance` |
| **pages** | The powder room: Iris Moreau, Halvorsen's chief of staff, four years in. | **x11-iris-warn** (she leaves through the kitchens) · **x11-iris-kin** ("Then you'll know how it ends. Unless you don't let it.") · **x11-iris-quiet** | `exec.iris11` |
| | The anteroom and THE AUTUMN COLLECTION: I. M. · ENDING, and E. V. · REISSUED · PUBLIC PROFILE · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH. Julian comes to find her. | **x11-book-show** ("What is this?" "Later. I promise.") · **x11-book-close** ("A guest book.") · **x11-book-turn**; then the corridor (deepening): Marcus with the cream folder, "I bet her a case of something I can't pronounce": **x11-corridor-bet** ("She never loses. I wanted, just once, to see her face when she did.") · **x11-corridor-past** · **x11-corridor-quiet** (neutral) | `exec.book11`, `c11.x-corridor` |
| **pen** | The balcony over the canal: Marcus's Morel & Cie facility. "Bring it to him. Stand beside him. He signs what you bring him now, darling. Everybody's noticed." With `exec.file = told`: "He'll sign this. For you." | **x11-pen-sign** (Celeste's own good pen) · **x11-pen-warn** (the stairs: "Don't sign anything tonight. Not from Marcus, not from me.") · **x11-pen-refuse** | `exec.sign11` (signed / warned / refused); fact `c11.x-order` |
| **signing** | **signed:** her hand on his shoulder, "If you've read it, that's enough for me." Applause, and Celeste's glass. **warned:** "Not tonight, Marcus. I read things now." / "He's learned to say no. I wonder where." **refused:** Marcus brings it. He signs as he always has, or, if he stopped signing in Ch8, "Put it on my tray and I'll read it on Monday." Monday: Halvorsen's mandate walks, forty million a year. | The cloakroom (deepening): the first Evelynn's camel coat, kept fourteen months, "We kept it for you, Miss Vale." **x11-coat-take** (in the pocket, a Singapore transit card and a receipt from a café on Emerald Hill; fact `c11.x-coat`) · **x11-coat-ask** ("You never came back for it." "Keep it for her.") · **x11-signing-go** (her own ticket; neutral) | `exec.celeste11` (pleased / suspects / cold), `exec.cost11 = halvorsen` on refuse, `exec.coat11` |
| **drive** | Hal's car: "What was that place?" | **x11-drive-shop** ("A shop. And I was in the window.") · **x11-drive-singapore** ("Ask me again somewhere far away.") · **x11-drive-party**, then Singapore: "I'd rather you came." Then the night: **x11-night-julian**, then the scope **x11-julian-no-sex** / **x11-julian-sex** (if Ch6 warmed things or she has stayed with him before) / **x11-leave**, then **x11-stop** / **x11-stay** (fades). **x11-night-maya** ("I think it was mine.") · **x11-night-alone** | `c11.x-drive`, `c11.x-night*`; facts `c11.x-singapore`, `c11.x-evening-consent` |
| **complete** | THE VESPER. "AVAILABLE FROM THE FIRST THURSDAY OF NEXT MONTH." Then THE GOOD PEN: HIS. MY HAND ON HIS SHOULDER. / NOT TONIGHT. HE READS THINGS NOW. / MARCUS'S. HALVORSEN, FORTY MILLION, MONDAY. Plus IRIS. THROUGH THE KITCHENS. if she warned Iris, and SINGAPORE. | — (on to the Ch14 bridge) | — |

**Content:**
- Julian is appalled and not yet told, never a buyer.
- The order is his hand, never his body.
- The refusal cost is his client, not her body. **The placement date is never moved as a punishment.**
- The night is chosen, consent-gated, heat 3, and fades.

**Tests:**
- `tests/state/executive-ch11.test.ts`, a real save through Executive Ch7, 8, 9 and 10:
  - the entry;
  - **sign:** Iris warned, the book shown, his hand, and Singapore; authenticates, and Ch14 remembers the Vesper deal;
  - **warn:** and Ch14's "You warned me at the Vesper";
  - **refuse:** Halvorsen;
  - **refuse after he stopped signing:** he turns Marcus down himself.
- `executive-ch10.test.ts` now expects Ch10 to hand on to Ch11. Its Ch14 check switches Ch11 off to test the bridge
  fallback.
- `executive-ch14.test.ts` plays Ch10 and Ch11 (refusing both) on its way.

**Deepening pass (2026-09-28):**
- three moments, each with a neutral pick (the dance, the corridor, the cloakroom);
- the drive remembers the book ("You said later. It's later.") and the coat.

Tests use a `NEUTRAL11` walker (`x11-dance-no`, `x11-corridor-quiet`, `x11-signing-go`), and the Ch14 builder takes the
neutral picks.

**Size (honest):** ~1.0k (quiet) to ~1.2k (engaged) at pass 1; ~1.25k to ~1.6k after deepening, against the ~4.5k
target.
