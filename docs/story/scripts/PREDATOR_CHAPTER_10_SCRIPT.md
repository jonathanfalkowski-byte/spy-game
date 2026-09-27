# Predator · Chapter 10: "Let Me Help" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_10_LET_ME_HELP_DESIGN.md](../PREDATOR_CHAPTER_10_LET_ME_HELP_DESIGN.md) (approved
2026-09-27, all eight decisions as recommended).

- **Code:** `src/content/chapter10-predator.ts`, wired through `src/content/chapter10.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER10`.
- **Entry:** `chapter10.begin-predator` ("Monday") from a Predator `chapter9.complete`, permanently.
- **End:** its own phase, `ledger`.
- **Chapter 11's entry moved here:** `chapter11.begin-predator` ("The first Thursday") is now offered from
  `chapter10.ledger`. There are no temporary entries left, and **the Predator road runs 7 → 8 → 9 → 10 → 11 → 12 →
  13 → 14.**

Phases: `ask → table → offer → floor → evening → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **ask** | Monday: Marcus in her doorway, not knowing what to do with his hands. "Celeste Laurent would like to have breakfast with you … She asked me to ask. She has never asked to meet anybody who works for me. Not in eleven years." | **ask-go** (Pryce at the kerb, if he drove her in Ch8: "Ms Laurent's compliments.") · **ask-wait** ("I should like very much to be there when she hears it.") | `c10.p-ask` |
| **table** | **Go:** the Lindqvist. **Wait:** Celeste walks the thirty-sixth floor in green with two coffees. The inventory, all of it said as praise:<br>• her Ch7 want ("Glorious" / "sentimental" / "Sensible");<br>• every lever by its deal ("You spared Ines Varga. That was the cleverest thing …");<br>• "Marcus writes everything down" (if she told him on Friday);<br>• the letterhead;<br>• "You keep a ledger on the back of your wardrobe door … So did I, at your age." | First **open-case** (lands with a supported or strong case; thin, she is corrected over eggs) · **open-flatter** ("The last woman who wore your name never once asked me for anything … You are going to ask me for everything.") · **open-ask**. Each ends on the turn: "Adrian Vale would never have dared ask Marcus for his desk. I have been dying to meet whoever did." (varied by want). Then **adrian-composed** · **adrian-laugh** ("He was a very dull man. I don't miss him." "Nobody does, darling. That's rather the point of you.") · **adrian-leave** (the black phone in her coat pocket from the doorman) | `c10.p-open`, `pred.adrian`; fact `c10.p10-adrian` |
| **offer** | At the coffee, or on the black phone at 23:00 if she left: "Let me help … one small thing. When Marcus talks about my fund … tell me what he says." The phone across the table: "So we can talk without Marcus listening." | **offer-accept** (the audit committee stops asking by Thursday) · **offer-decline** ("Then I shall watch. I do love to watch."; Maya's name, "Such a loyal girl") · **offer-feed** (only with the report clause or a supported or strong case: three untrue lines on Friday; "How very interesting. Thank you, darling.") | `pred.celeste10` (accepted / declined / fed), `pred.phone` |
| **floor** | The City pages: "Old money, new blood". The photograph was taken from a table at the Lindqvist, or through her own office glass. The floor looks at her like a woman seen with somebody they fear. An ally Julian: "Careful. She never has breakfast with anybody twice." Marcus in her office with the paper: "What did she want?" | **marcus-tell** (by answer: "And will you?" / "Nobody says no to her." "I just did.") · **marcus-lie** ("That's what she told me, too.") · **marcus-deflect** ("I did. She told me to ask you.") | `pred.marcus10` (told / lied / deflected) |
| **evening** | Seven, the floor empty, a circle drawn round her face on the paper on some desks. | **ev-marcus** ("I didn't think you'd come.") · **ev-julian** (ally, not cooled) · **ev-alone**; then the consent flow. It fades. | fact `c10.p10-evening-consent` |
| **ledger** | Every card on the door has been seen now. A new card at the very top: CELESTE LAURENT. LET ME HELP. I SAID YES / I SAID YES. I LIED. / I SAID NO. SHE IS WATCHING. At midnight: "The first Thursday of December, darling. The Vesper. Marcus will bring you. He doesn't know yet." | — (Chapter 11 enters from here) | — |

**Chapter 11 follow-ups (built):**
- Marcus's Vesper card gains a line if she told him ("She'll be there. Of course she will. Come anyway.") or
  deflected ("I asked her again. She told me to ask you again.").
- Celeste's greeting on a decline: "How well she wears her independence."

**Continuity kept:**
- Nothing here has Celeste write to her directly. The invitation comes through Marcus, and the offer is spoken, so
  Ch13's card stays the first.
- The feed is covert and sets no `pred.celeste-count`, so Ch11's counter stays the first surprise.
- The black phone Ch11 lights at one in the morning is this one.

**Content:**
- The pressure is non-sexual (the audit committee; Maya's name, as inventory, not a threat).
- The evening is chosen, consent-gated, heat 3, and fades.

**Tests:**
- `tests/state/predator-ch10.test.ts`:
  - the entry (Ch11 no longer offered from Ch9);
  - accept, with the whole inventory, the phone, and Ch11's card line (authenticates);
  - decline, from her office, with Maya's name;
  - leave and feed (no surprise counted);
  - the feed gated on the report clause or case.
- `predator-ch11` through `ch14` now walk Chapter 10 on its quiet picks.

**Size (honest), pass 1:** ~1.2k (decline, quiet), ~1.2k (feed) and ~1.4k (accept, engaged), against the ~4.5k
target.

## Deepening pass (2026-09-27)

- **Tuesday night** (`ask`, after her answer to Marcus, before the table). Every path passes through it
  (`c10.p-eve`):
  - **eve-marcus**: Marcus rings at eleven, which he never does. "Whatever it is, it will be exactly what you want.
    That's how you'll know it's her." Celeste offered him his desk eleven years ago, "at that same table", and he
    took it. "Goodnight, Evelynn."
  - **eve-cards**: she takes the three cards she would least like anybody to see off the wardrobe door, into Adrian's
    lining. Sets `pred.cards10 = hidden`. On Wednesday Celeste says: "You took three cards down on Tuesday night.
    Which three? No, don't tell me. I shall so enjoy guessing."
  - **eve-sleep** (neutral).
- **The hour after the offer** (`offer`, after her answer, before the floor) (`c10.p-after`):
  - **after-phone**: the black phone is not new. Its corners are worn in one pocket, and an N is scratched on the
    back. Sets `pred.phoneN = seen`. **Geneva remembers it:** at the Rue du Rhône, Nell's watch ("For N., from N.")
    brings the thought "N. Like the letter scratched into the back of the black phone."
  - **after-men** (only at the Lindqvist, and not on the walk-out road): the two men who did not eat, a camera case,
    two fingers to a hat that is not there. "She booked the table for it."
  - **after-walk** (neutral): the river walk to work, or "Go to bed" on the walk-out road.
- **More prose:**
  - Wednesday morning now opens the table (Pryce's "Ms Laurent's compliments" moved here), and Celeste has already
    ordered for both of them, with the two men's tea unpoured.
  - Dominic Ashe tells the journalists she is "very private".
  - On the ledger, the phone sits face down with the N facing her.
  - On the walk-out road the photograph now runs **the next morning** (a timing fix).
- **Place lines:** "Tuesday · 23:00 · The flat" and the hour after, by road.

The tests walk the new moments on their neutral picks (`NEUTRAL10 = eve-sleep, after-walk`); the Ch11–14 builders
take the same picks.

**Size (honest) after the deepening pass:** ~1.4k (decline, quiet), ~1.6k (feed) and ~1.8k (accept, engaged). The
next lift would be the breakfast itself at greater length (more of Celeste on Marcus at twenty-nine, and the prior
tenant), and a second beat on the floor.
