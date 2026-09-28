# Executive · Chapter 12: "Whose Face" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_12_WHOSE_FACE_DESIGN.md](../EXECUTIVE_CHAPTER_12_WHOSE_FACE_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).
Shared spine: [../CHAPTER_12_SINGAPORE_DESIGN.md](../CHAPTER_12_SINGAPORE_DESIGN.md).

- **Code:** `src/content/chapter12-executive.ts`. It is wired through:
  - `src/content/chapter12.ts`: phase definitions, place lines, blocks, choices, and the begin from `chapter11.complete`;
  - `src/content/chapter14.ts`: the bridge now starts at `chapter12.complete`, or at the last playable of Chapters
    9–12;
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER12`.
- **Entry:** `chapter12.begin-executive` ("Singapore") at an Executive `chapter11.complete`.
- **End:** the shared `complete`, with Executive blocks, then `chapter14.begin-executive` ("[Chapter 13 · executive
  road — in development]") until Executive Ch13 exists.
- **Naming:** phases are `changi → tan → number9 → punkah → nora → suite → harbour`. Choice ids carry `x12-`; keys live
  under `exec.*` and `c12.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **changi** | Business class on Helix, and the heat. C.: "Do give my love to Mrs Tan" (in the tone of Ch11's `exec.celeste11`). Julian: "The evenings are yours if you want them, and mine if you'll let me have them." With the coat: the transit card's last journey ends at Somerset, fourteen months ago. | **x12-changi-go** | — |
| **tan** | Mrs Tan: "Evie! Evie." The last night, the note, the tall lady, the men in white gloves, the key under the orchids. | **x12-tan-evie** · **x12-tan-truth** ("No. You stand wrong.") · **x12-tan-listen** | `c12.x-tan` |
| **number9** | The flat kept dressed, new clothes in her size. Then the caretaker. | Where she looks: **x12-search-desk** (the schedule, "sister: N. Linden"; fact `c12.x-schedule`) · **x12-search-wardrobe** (the Penang boarding pass) · **x12-search-balcony** (the orchid across the lane). Then **x12-caught-hide** (his report and number) · **x12-caught-evie** ("The Marlowe, good evening.") · **x12-caught-own** (the number) | `c12.x-search`, `c12.x-caught` |
| **punkah** | Ashby, by Iris's stampless card (if she warned Iris in Ch11) or the caretaker's number. "From a friend of hers." The white orchids. "She takes a man's company the way she took Nell's name. By being kind to him first." (and "I was the kind part." if she signed in Ch11) | **x12-ashby-nell** · **x12-ashby-press** (only with the schedule or the number from the caretaker) · **x12-ashby-truth** | `c12.x-ashby`; fact `c12.x-ashby` |
| **nora** | Holland Village; Nora holds the door frame. | **x12-nora-truth** ("She walked like our father. You don't.") · **x12-nora-kind** · **x12-nora-go** (the wrong house; no facts). Truth or kind: Nell's cinnamon, the Saturday call, the Sunday-morning call from the tall friend (fact `c12.x-nora`), the receipt read ("The black was always her friend's") if she has the coat, and the photograph on the harbour wall. | `exec.nora12` |
| **suite** | The Straits, dinner, and C.'s photograph of the two of them: "Does he know whose face he's kissing? Somebody ought to tell him. It oughtn't to be me." With `exec.calendar = gave`: "You sent it." | **x12-tell-told** ("Is the woman who wrote her own terms into my contract real?" "Yes." "Then that's who I know."; fact `c12.x-told`) · **x12-tell-partly** ("I'm not going anywhere.") · **x12-tell-not** (the phone face down, like his photograph) | `exec.told12` (told / partly / not) |
| **harbour** | Midnight, where Nell went in. | **x12-harbour-name** · **x12-harbour-photo** (if Nora gave her the photograph) · **x12-harbour-quiet**. Then **x12-night-julian**, the scope **x12-julian-no-sex** / **x12-julian-sex** (if Ch6 warmed things or she has stayed with him before) / **x12-leave**, then **x12-stop** / **x12-stay** (fades). **x12-night-alone** (the hotel roof) | `c12.x-harbour`, `c12.x-night*`; fact `c12.x-evening-consent` |
| **complete** | The flight home. NELL. ELEANOR LINDEN. "SHE HATED ORCHIDS." Under JULIAN MERCER: HE KNOWS WHO I AM. HE ASKED ONE QUESTION. / HE KNOWS SOMEBODY IS SELLING ME. / HE DOESN'T KNOW. SHE COULD TELL HIM. SHE WON'T. I SHOULD. | — (on to the Ch14 bridge) | — |

**Content:**
- Nell is not alive, and Celeste's guilt stays a seed.
- Celeste never tells him.
- Julian is never a trap, and his answer is never a verdict.
- The night is chosen, consent-gated, heat 3, and fades.

**Tests:**
- `tests/state/executive-ch12.test.ts`, a real save through Executive Ch7–11:
  - the entry;
  - **told:** Mrs Tan's truth, the schedule, Iris's card, press, Nora and the cinnamon; authenticates, and goes on to
    the bridge;
  - **partly:** the caretaker's number; no press without evidence;
  - **not:** the wrong house; no photo at the harbour.
- `chapter12.test.ts` now checks that a closed road (institutional) stays closed and that Executive gets its own
  entry.
- `executive-ch11.test.ts` switches Ch12 off to test the bridge fallback.
- `executive-ch14.test.ts` plays Ch12 (not telling) on its way.

**Size (honest), pass 1:** ~1.2k (quiet) to ~1.65k (engaged), against the ~4.5k target.
