# Predator · Chapter 18: "Paid in Full" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_18_PAID_IN_FULL_DESIGN.md](../PREDATOR_CHAPTER_18_PAID_IN_FULL_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended).

- **Code:** `src/content/chapter18-predator.ts`, wired through `src/content/chapter18.ts` (phases, blocks, choices),
  with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER18`.
- **Entry:** `chapter18.begin-predator` ("Friday") from the Predator `chapter17.minute`.
- **End:** `last`. **The Predator road is complete, Chapters 7 to 18.**

Phases: `papers → hold → owes → called → year → last`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **papers** | By `act4.board`:<br>• **succeeded:** no papers ("Meridian is private"); four archive boxes labelled TRANSFERRED; the doorman's "Good morning, Madame."; "Don't change the lock. C.";<br>• **resigned:** MERIDIAN DIRECTOR STEPS DOWN, Deverell's undertaking, "You were worth it. C.";<br>• **diminished:** Soames's letter in blue, and a white orchid with no card;<br>• **closed:** nothing. | **papers-read** · **papers-sleep** · **papers-marcus** (an ally, or he kept his name: "I have told her you are in insurance") · **papers-maya** (if close: "I'm going to need a much bigger bottle") | `end.morning` |
| **hold** | **Succeeded:** her first Thursday at the head of the table, item three the Spring Collection, "The shop is mine." **Otherwise, by aim:**<br>• **wound:** three clients leave the fund;<br>• **helix:** clause 14.3 gone, the letterhead gone, her name on the door;<br>• **nell:** the file to Nora, read aloud at two in the morning;<br>• **seat refused:** nothing granted.<br>With no terms, each aim is held by the switch and the slow road instead. | Seat road first: **shop-keep** ("Item three. Approved."; Celeste's first note in thirty years) · **shop-change** (volunteers, paid, free to leave, "no mother's house") · **shop-close** ("Item three. Declined. And items four to forty"). Then every road: **switch-armed** (on the seat road, with one more line: "or if I ever send a woman into a room she did not ask to walk into") · **switch-handed** (to Maya, Nora, Marsh or Lucien) · **switch-disarmed**. | `end.shop`, `end.switch`, `end.switch-to`, `end.position`; fact `c18.p18-shop` |
| **owes** | The notebook, the page headed OWES from the tenth day at Helix, the answers written in, line by line, by state: Marcus; Lucien; Iris (FREE); Halvorsen; Pryce; Hollis; Varga; Ana, or Delphine ("the one that keeps you honest"); Nora; Marsh; Julian. The Ch15 cost comes back on its line, and on a YOU line for money or visibility. | **home-julian** · **home-marcus** · **home-lucien** · **home-maya** (each only if not spent in Ch15) · **home-none** | `end.with` |
| **called** | The wardrobe door, the last time; every card in a box, one left to write. | **name-adrian** · **name-evelyn** · **name-new** (face down) | `end.name` |
| **year** | A year later, by position:<br>• the seat: the first Thursday of December, receiving clients in green, and with the shop kept, "which one are you here for?";<br>• Helix: the corner office (the chair from Leeds gone, if sent home);<br>• Nell: Holland Village;<br>• the wound: a café across from a smaller table.<br>The black phone with the N; the Lisbon postcard. | **year-close** (a partner: **year-no-sex** / **year-sex** / **year-goodnight**, then **year-stop** / **year-close**; with Maya, a kitchen and a laugh) · **year-quiet** | `end.later`, `end.later-open`, `end.consent` |
| **last** | The last card, by name:<br>• Adrian: "I was bought once. Now I'm the only one who knows what I cost.";<br>• Evelyn: "They built her to be sold. I bought the shop." on the seat road, otherwise "I bought her back.";<br>• a new name: "under a page headed OWES, and drew a line through the word".<br>On the seat road with the shop kept, one more card in green: **AVAILABLE.** "It is your own page." | — | — |

**Content:**
- The last night is chosen, consent-gated, heat 3, and fades.
- No identity choice is punished, and the body is not revisited.
- Meridian always stands, and the seat is a real ending.

**Tests:** `tests/state/predator-ch18.test.ts`. A real save through the whole Predator road (Ch6–17):
- the entry after a refusal;
- the shop kept, with the switch aimed at herself, Julian, and AVAILABLE (authenticates);
- the book closed from the chair (no AVAILABLE);
- Helix, a year later in the corner office;
- Nell, with Nora and Holland Village.

**Size (honest), pass 1:** ~0.6k (quiet) to ~0.9k (the seat, engaged), against the ~3.5k target. The leanest pass
on the road; a deepening pass would give OWES and the year later their full weight.

## Deepening pass (2026-09-28)

- **One debt paid in person** (`owes`, after the page, before who she goes home to) (`end.visit`):
  - **visit-leeds** (Marcus near): tea with Mrs Chen, eighty-two: "And you're in insurance too, he says … You don't
    look dull."
  - **visit-coast** (Ana freed): a nurse laughing in a surgery window; she does not go in.
  - **visit-norfolk** (Hollis spared): the garden, and "I did. Because of you."
  - **visit-cab** (Pryce known): an hour along the river in his own cab, the fare refused.
  - **visit-none** (neutral): the rest by post.
- **Celeste, one last time** (`year`, before the last night) (`end.celeste`):
  - **celeste-visit**, by board:
    - Lisbon, a balcony: "The view is exactly as good as I told her it was. She never came. I am so glad you did.";
    - her car after your Thursday: "You run it better than I did … I did not know I would mind.";
    - the reading room: "I think that is what they call a draw."
  - **celeste-write**: a postcard of the river: "Paid in full. E."
  - **celeste-none** (neutral).
- **More prose:** in the archive boxes, her own page already taken out, "and left the space". OWES written in
  Marcus's pen, which she kept. The last card over the closed notebook, the pen capped on top.

The tests walk the new moments on their neutral picks (`NEUTRAL18 = visit-none, celeste-none`).

**Size (honest) after the deepening pass:** ~0.7k (quiet) to ~1.2k (the seat, engaged). The next lift would be the
position month at greater length on each aim.
