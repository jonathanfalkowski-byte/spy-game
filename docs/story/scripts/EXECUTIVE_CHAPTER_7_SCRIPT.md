# Executive · Chapter 7: "The Room" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md](../EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md) (approved 2026-09-28,
all seven decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter7-executive.ts`, wired through `src/content/chapter7.ts` (phases, the confirm beat's
  `nextFor`, blocks, choices) and `chapter7-own.ts` (the place line), with titles in `src/ui/App.tsx` and masters in
  `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER7`.
- **Entry:** the Chapter 7 confirm beat. Any choice that sets the road to `executive` (confirm, pivot or break) now
  goes to `table` instead of straight to `complete`.
- **End:** the shared `complete` ("Where It Points"), with Executive blocks. The road then continues to the shared
  Chapter 9 bridge placeholder until Executive Chapter 8 exists.
- **Naming:** phases are `table → fortyone → contract → hallway → key → tonight`, because the Predator road uses
  `office`, `terms`, `corridor` and `evening` in the same scene. Keys live under `exec.*` and `c7.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **table** | 06:45, Julian's message: breakfast on Carey Street, "the coffee is honest and the chairs are not". Then the table (deepening): the clerk he was at nineteen, and Helix talked about like a house he grew up in. Then the offer: chief of staff to the Group COO, "so that you could say no somewhere I don't own the chairs". | **arrive-early** (the half-second in which he is simply glad) · **arrive-ontime** (he stands when she comes in) · **arrive-late** (he never looked at his phone); then the moment: **breakfast-ask** ("I'll tell you about that one day") · **breakfast-hand** ("I'd like to ask it with your hand exactly where it is") · **breakfast-quiet** (neutral) | `c7.x-arrive`, `c7.x-breakfast` |
| **fortyone** | The corner of glass, the books he has read, the photograph turned face down, the lit empty office next door. His opening, by Ch6's answer:<br>• **clarified:** "you made me say it out loud";<br>• **refused:** "I kept the room open … the only way I knew to find out whether I was the kind of man I thought I was";<br>• **negotiated:** "let me write the price first";<br>• **narrowed:** "you said yes to the part you chose".<br>Then: **"What would make this safe for you?"** | **safe-writing** ("Terms. In writing. Mine.") · **safe-why** ("three separate miracles") · **safe-quiet**; then, while he fetches the contract, the photograph face down (deepening): **photo-ask** ("Somebody I didn't keep") · **photo-straighten** ("Clare used to do that") · **photo-leave** (neutral) | `c7.x-safe`, `exec.photo` |
| **contract** | ADDITIONAL TERMS: "Three. Whatever they are, I'll sign them. And then I'll read each one twice." | Three of five: **term-door** · **term-firewall** · **term-name** · **term-veto** · **term-files** ("Including what I sign. Yes."). He reads each twice: "Now I can't make you do anything you didn't write down. I find I'm relieved." | `exec.term.<id>`; fact `c7.x-contract` |
| **hallway** | Marcus in the glass hallway: "Julian's new favourite. He always did pick well … He never did keep them." | **marcus-answer** ("I picked the job") · **marcus-smile** · **marcus-ask** ("They wanted things. From him. Julian can't bear being wanted for things."). Then the lift, and **Julian's confession:** "I sign what Marcus gives me … and I don't always read them … It's the one part of my job I've never done properly." Then the lift (deepening): **lift-thank** (neutral) · **lift-read** ("From now on I read them first"; with the files term, "I wrote it into my contract") · **lift-hand** ("Ms Vale." "Mr Mercer.") | `exec.marcus`, `exec.lift` |
| **key** | Five o'clock: an envelope, a key, a brass fob, and a card: "No term attached, and none implied. — J." The thought changes if she wrote "her own name" into the contract. | **key-accept** (the flat on the river, "like an open drawer") · **key-decline** ("It was a stupid thing to do with a key.") · **key-rent** (only with £1,200 to spare: a standing order from her own account; "It's a lovely flat. It's mine.") | `exec.flat` (accepted / declined / paid), `own.cash` on rent; fact `c7.x-flat` |
| **tonight** | Seven o'clock; the last lights on forty-one. | **x-evening-julian** (not if Ch6 cooled it): he cooks badly, then an omelette. If Ch6 warmed it: "I would like you to stay … tell me what you want tonight, and that's what happens." Otherwise: "Tell me where the line is, and I'll stand behind it." Then the scope: **x-julian-no-sex**, **x-julian-sex** (only if warmed), **x-leave**; then **x-stop** / **x-stay** (fades). **x-evening-maya** (if she is back: "Find out which before you give him your spare key.") · **x-evening-alone** | `c7.x-evening*`; fact `c7.x-evening-consent` |
| **complete** | The wardrobe door, the first card of a new road: JULIAN MERCER. CHIEF OF STAFF. HIS KEY. / MY RENT. / MY OWN FLAT. In pencil beneath: **WHAT DO I OWE HIM?** | — (on to the Ch9 bridge placeholder) | — |

**Content:**
- Julian is never a trap: his gift carries no hidden term, and his confession is volunteered.
- Refusing the key, the evening or anything else costs her nothing.
- The evening is chosen, consent-gated, heat 3, and fades. The first night is only offered when Chapter 6 warmed the
  friction.

**Tests:**
- `tests/state/executive-ch7.test.ts`: a real save (the maximal-julian golden, narrowing the Ch6 ask) onto the
  Executive road:
  - the entry and the question;
  - three terms, Marcus, the confession and the key (authenticates, and goes on to the Ch9 bridge);
  - the key accepted and the first night when warmed;
  - the line she sets when not warmed;
  - no Julian evening when cooled.
- `tests/state/chapter7.test.ts` now expects the Executive road to continue into `table`.

**Deepening pass (2026-09-28):**
- three moments, each with a neutral pick (breakfast, the photograph, the lift);
- the dinner on forty-one at greater length ("what you read on trains", and the hand she gave him that morning);
- both stays expanded;
- the first card remembers the hand, or marks KEEP? if she asked about the photograph.

Tests use a `NEUTRAL7` walker (`breakfast-quiet`, `photo-leave`, `lift-thank`), and the Ch8 and Ch14 builders take the
neutral picks.

**Size (honest):** ~1.2k (quiet) to ~1.4k (engaged) at pass 1; ~1.45k to ~1.85k after deepening, against the ~4.5k
target.
