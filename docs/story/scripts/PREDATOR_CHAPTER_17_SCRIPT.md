# Predator · Chapter 17: "Sit With Us" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_17_SIT_WITH_US_DESIGN.md](../PREDATOR_CHAPTER_17_SIT_WITH_US_DESIGN.md) (approved
2026-09-28, all eight decisions as recommended).

- **Code:** `src/content/chapter17-predator.ts`, wired through `src/content/chapter17.ts` (phases, blocks, choices),
  with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER17`.
- **Entry:** `chapter17.begin-predator` ("The room") from the Predator `chapter16.room`.
- **End:** its own phase, `minute`. The Predator road stops here, in development, until the Ch18 variant exists.
- **Naming:** the board phase is named `hands`, because the Celebrity road already uses `vote`.

Phases: `sit → market → marcus → offer → eleanor → hands → minute`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **sit** | Celeste, one hand on the seventh chair: "May I present Helix's new counterparty … And, you will forgive me, Anton, my successor. If she will have it." Her line by dress ("My green. How flattering. Or how rude." / "Marcus's blue …" / "Black. Of course."), and "And my key …" if she wears it at her throat. | **open-chair** (sit first; "Well. That answers one question." "Does it?") · **open-stand** ("I'll stand. I came as Helix.") · **open-card**. The first card lands, with its own effect (the heavy man's hand over his own name; Deverell's first look at Celeste; the young man who has booked the Claremont; Soames's glasses …). | `act4.open` |
| **market** | "Meridian is a shop, and they are its customers, and its customers are also its stock." Her people speak by who is inside: Halvorsen ("I should like the minutes to show that I am not buying tonight"); Lucien, looking at the three whose accounts he keeps; Iris's earring; Marsh's exercise book. | **press-market** · **press-claim** ("You don't own Meridian … It owns you."; always open on this road, with Geneva's list) · **press-cost** (Delphine, Iris, Eleanor Linden, Adrian Vale). Then Deverell, to Celeste: "Did we know?" | `act4.press` |
| **marcus** | If Marcus is inside, he stands: "I was bought in this room. I was twenty-nine … She sent me my review. It is standing next to you." Otherwise she says his drawer aloud. | **marcus-vouch** ("He was a product too.") · **marcus-stand** · **marcus-use** ("He is the proof." Moves the room by one band.) | `act4.marcus` |
| **offer** | "Sit with us. Nobody would ever place you again. You would do the placing." Half the board would vote for it now. | **offer-accept** ("Yes."; with a held card: "On one condition, which is my first act as one of you: …", her price) · **offer-refuse** ("I didn't come for a chair."; the held card as a blow) · **offer-laugh** (the real laugh; the card, harder). With nothing held: "I'm still here." | `act4.offer`, `act4.held-landed`; fact `c17.p17-offer` |
| **eleanor** | Celeste on Nell (shared canon: the order, the car, the wall, the driver, six and seven o'clock), with the Predator echoes: the N scratched with a hairpin in Jakarta ("I never had it wiped"), and the watch she used to wind for her at breakfast. | **named-ask** · **named-nora** (if Nora is inside: the photograph, face up) · **named-wait** | `act4.named`, `act4.nell-said` (Nora or waiting always gets *Eleanor*; asking gets it with a strong or overwhelming case, otherwise *Evie*) |
| **hands** | Deverell: "This board will be seen to have acted."<br>• **Succeeded** (she accepted): Celeste resigns, the hands go up, and she pulls the seventh chair out a little further and walks to the clients' end.<br>• Otherwise, by the case (+1 if seen, +1 if Marcus was made the proof): **resigned** (terms by aim, in Deverell's own pen), **diminished** (partial), **closed**.<br>Then alone: "Did you ever like being her?" ("Now you will find out what I liked", if she succeeded). The orchid. | **last-yes** ("It was the loveliest thing I ever made.") · **last-no** · **last-orchid** · **last-key** (if she brought the key: on the table between them; "Keep it, darling. It's yours now." if she succeeded, or "I suppose I shall have to change the lock.") | `act4.last`, `act4.board` (succeeded / resigned / diminished / closed), `act4.terms`, `pred.key17`; fact `c17.p17-board` |
| **minute** | **Succeeded:** Celeste goes out by the front door, and Evelynn sits at the head of the table with the client ledger. "I did not walk out of the Vesper. I stayed." **Otherwise:** the hall with no doorman. "I walked out of the Vesper by the front door, and nobody opened it for me. I opened it myself." | — | — |

**Terms by aim** (on resigned or diminished):
- **wound:** every client named in the minutes, with a copy to each.
- **helix:** clause 14.3 struck from every Helix agreement, the fund's money repaid over five years, and the
  letterhead gone by Monday.
- **nell:** Eleanor Linden's file to her sister, entire.
- **seat** (refused): nothing, "because she came for the chair and turned it down".

**Content:**
- No coercion, and nothing sexual.
- The seat is a real, chosen ending.
- Meridian always stands.

**Tests:** `tests/state/predator-ch17.test.ts`. A real save through the whole Predator road (Ch6–16):
- the entry;
- the seat, taken with the chair first, the page as her price and the key kept (authenticates);
- a refusal, with Marcus made the proof and the board by the case;
- a laugh with nothing held back, and Nora answering for her sister.

**Size (honest), pass 1:** ~1.2k (refuse) to ~1.4k (the seat), against the ~5k target.

## Deepening pass (2026-09-28)

- **A client breaks** (`market`, after the press, before Marcus) (`c17.p-heavy`). The heavy man with the signet ring
  stands: "I did not come here to be read my own accounts by a woman from Helix."
  - **heavy-stop**: "Sit down. Your name is on page nine of her ledger, and page nine is in my coat." He sits.
    **This moves the board by one band** (up to strong), like being seen arriving.
  - **heavy-let**: he walks to the door, stops, and comes back to the clients' end. "They always come back to the
    table. That is the whole of what she built."
  - **heavy-watch** (neutral): Deverell: "Sit down."
- **The recess** (`marcus`, after Marcus, before the offer) (`c17.p-recess`). Deverell calls five minutes:
  - **recess-window**: the black glass beside Celeste, sleeves touching. "I did not know it would be at my expense. I
    find I don't mind as much as I should."
  - **recess-soames**: "One question, Ms Vale, off the record. Who paid for your flat?" "You did." "I have read that
    standing order every month for a year. I wanted to hear somebody say it."
  - **recess-sit** (neutral).
- **More prose:**
  - over the fireplace, the one frame not empty: the Vesper's own door on its opening night, 1911, "the year of the
    key";
  - Celeste: "You are nothing like her … She wanted out. You want in. That is why I wanted you.";
  - the minute: the door "closed from the inside by somebody other than her" (the seat), or Pryce at the kerb, or the
    switch holders rung back at a minute to seven: "I'm out."

The tests walk the new moments on their neutral picks (`NEUTRAL17 = heavy-watch, recess-sit`); the Ch18 builder's
Ch17 paths take the same picks.

**Size (honest) after the deepening pass:** ~1.4k (refuse, quiet) to ~1.7k (the seat, engaged).
