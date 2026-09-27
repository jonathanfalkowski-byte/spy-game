# Chapters 4 and 5 deepening (2026-09-26)

Chapter 5 is released content (revision 19 saves, and revision 20 for new games), so this pass is **presentation only**. It lives in
`src/content/revision20-editorial.ts` (`DEEPEN5`), like the rest of the revision-20 editorial pass:

- It never touches state, history, the ledger or saves. Revision-19 saves never reach it, so they read exactly as
  before. Revision-20 saves stay valid because replay is unchanged. No golden fixture changed, and the Chapter 1–5
  fixture is byte-identical.
- It adds no new choices. A new choice in Chapter 5 would change revision-20 replay and break saves made mid-chapter.
  That would need a content revision 21: new games start at 21, and the choice is gated on it. That is an owner
  decision.

## What a revision-20 reader now sees

Each addition is appended after a line every golden route already shows (checked on all 8 Chapter 1–5 routes, once
each, and on no revision-19 transcript):

| Node | Added |
|---|---|
| home | The quiet flat, the grey light in bars. "I am learning to leave it empty and see what comes in." |
| spend | The first walk with money of her own; the woman in the window glass who wants the blouse too. |
| echo | "I would like to be photographed for what I do, not for what I look like." |
| invitation | The heavy cream card: nobody invited Adrian Vale to anything but leaving drinks. |
| presentation | Dressing is a sentence the room reads before she speaks. "What do I want them to read?" |
| room | Harbour at dusk; heads turning "like a draught under a door"; Adrian could leave a room unseen, and she never will again. |
| offer | "Somebody wants to pay me to be looked at … how much I want to say yes." |
| infrastructure | Adrian's audit mess on the table, regarded with private affection. |
| people | The names in the threads are Adrian's, in his order, all people who do not know her. |
| want | The rooftop card against the lamp. "Not what is useful tonight. Not what is safe. What do I want?" |
| return | Out: the hall in the dark, every choice written down by somebody. In: an evening that was nobody's but hers. |
| complete | Clothes hung where she will see them; a report being read across the city. "It is the first draft of it." |

Size at revision 20: **~2.1–3.0k words on the golden routes** (from ~1.4–2.3k), against the 7k budget.

## Chapter 4 (same terms: `DEEPEN4`, presentation only, revision 20)

Additions sit only on lines their road actually shows. Julian's look, the Helix room and the hotel café are anchored
on Helix-only lines (his line in the assessment, the Helix coordinator, the walk to the café), so the municipal road
never sees Julian where he is not.

| Node | Added |
|---|---|
| entry | Dusk on the embankment, Julian's voice waiting for her answer. "It turns out I like being waited for." |
| consequences | The cold bench, the river, a gull with an opinion. |
| resource | The first good sleep; the records room: green lamps, a radiator "like somebody wanting to be let in". |
| assignment | "Adrian did a hundred of these … This one is going to have mine." |
| room (Helix) | The fourteenth-floor review room, the river "like a sheet of steel". |
| assessment | Intent left white on purpose. On Helix: Julian's look, "for a moment longer than a client looks at a consultant". |
| outside (Helix) | The hotel café: low lamps, "a pianist nobody asked for", her reflection looking as if she belonged. |
| favor | "A place of my own until five … not yet sure that this one isn't [a test]." |
| notice | Sloane's silence, "like a hand resting on the back of a chair you are sitting in". |
| power (Helix) | The coordinator with bitten nails. |
| intimacy | An ordinary evening, the wrong scale on a piano across the courtyard, enjoyed enormously. |
| privateAccess | "Two days is all it takes … to become somebody the clerk nods to." |
| complete | The card in daylight, "a key to a door nobody else has". "Every piece of it has my name on." |

Size at revision 20: **~1.5–1.8k words on the golden routes** (from ~1.0k), against the 6k budget.
