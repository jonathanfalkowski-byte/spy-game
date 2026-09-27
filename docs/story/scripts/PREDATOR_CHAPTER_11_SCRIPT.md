# Predator · Chapter 11: "The Catalogue" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_11_THE_CATALOGUE_DESIGN.md](../PREDATOR_CHAPTER_11_THE_CATALOGUE_DESIGN.md) (approved
2026-09-27, all eight decisions as recommended).

- **Code:** `src/content/chapter11-predator.ts`, wired through `src/content/chapter11.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER11`.
- **Temporary entry:** `chapter11.begin-predator` ("The first Thursday") from a Predator `chapter9.complete`, until
  the Predator Chapter 10 exists.
- **End:** its own phase, `ledger`.
- **Chapter 12's entry moved here:** `chapter12.begin-predator` ("Follow the money") is now offered from
  `chapter11.ledger`. The road runs 9 → 11 → 12 → 13 → 14.

Phases: `dress → longroom → book → powder → terrace → cloak → late → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **dress** | Marcus's card ("You'll be the best thing in the room. That's rather the point."); a midnight-blue dress from a shop that does not deliver; Marcus at her door himself, in black tie; Pryce and the polished handle (if Pryce drove her in Ch8). | **dress-gift** · **dress-own** ("Of course. Of course you did.") | `c11.p-dress` |
| **longroom** | The empty frames; the guests are the exhibition. Celeste: "Marcus, darling. And your acquisition." The private clause refuses the camera. Halvorsen: "And which one are you here for?" Julian by stance: an ally watches who watches her; a rival watches like a man who lost the lot; a casualty keeps to the far side. | **room-dazzle** (Halvorsen: "the book … the only honest thing in the building") · **room-listen** ("Helix bought well") · **room-dance** (with Marcus, her lead: "Which one do you want?" "The one with the book behind it.") | `c11.p-room` |
| **book** | The client room, a fire, a lectern: *The Winter Collection*. I. M. · ENDING. Page forty: E. V. · REISSUED · TRANSFERRED: AXIOM → HELIX · AT CLIENT REQUEST (M. CHEN). Her thought depends on what she wanted in Ch7 (desk / title / money). | **page-tear** · **page-photo** (her page and Iris's) · **page-read** | `pred.transfer` (torn / photographed / read); fact `c11.p11-transfer` |
| **powder** | Iris Moreau in grey silk at the mirror: "You're Marcus Chen's. The new one. Which of us are you here for?" | **iris-truth** ("I'm on page forty. Same book."; the unlit cigarette on the terrace) · **iris-client** · **iris-nothing** | `c11.p-iris` |
| **terrace** | Celeste's envelope: the forged memo; "A small favour for a client … she is ending, and Mr Halvorsen would like it to be tonight." **"I thought the new one might like to learn how it is done."** | **order-comply** · **order-refuse** · **order-warn** (needs something built: Hollis owned, Varga spared, the archive used or held, the exit clause, or a strong case) · **order-turn** (the same, plus the fund's paper: `pred.lsf = wire`) | `pred.answer11`, `pred.iris` (retired / ended-by-another / free / kept), `pred.halvorsen` (owes-helix / hostile / owes-her), `pred.ally.iris`, `pred.celeste-count = 1` (on a counter) |
| **cloak** | **Comply:** the lining; "You know about linings."; Iris looks back and knows. **Refuse:** the memo in eight pieces in the canal; "Pity. I did so hope."; somebody else had a copy. **Warn:** the kitchens, the bins, a taxi, "I'll find you. When I have a name that's mine." **Turn:** Halvorsen in the cloakroom, "On reflection, my dear, I think I shall keep my chief of staff … I believe I owe you a lunch." | **cloak-celeste** (her line, by answer; on a counter, "for one sentence … as if she had not seen you before") · **cloak-wait** | `c11.p-cloak` |
| **late** | The car along the river; "Well? Did you like the collection?" | First **car-ask** ("I asked for you. By name. The morning after the Glass House … I'd do it again. I thought that was why you asked for my desk.") · **car-keep** · **car-use** ("You bought me … So you'll understand when I send the bill."; a transfer fee, backdated, +$10,000). Then **late-marcus** (the flat above the river) · **late-julian** (ally, not cooled) · **late-alone**, and the consent flow; it fades. | `pred.marcus11` (asked / kept / used); fact `c11.p11-evening-consent` |
| **ledger** | Two cards. IRIS MOREAU, by answer (RETIRED. I PUT IT IN HER BAG. / ENDED. NOT BY ME. NOT SAVED BY ME EITHER. / OUT THROUGH THE KITCHENS. / KEPT. HALVORSEN OWES ME.). E. V. TRANSFERRED … (THE PAGE IS IN MY BAG. / PHOTOGRAPHED.), pinned overlapping Marcus's. Celeste by answer; "We have copies" if torn. | — (Chapter 12 enters from here) | — |

**Follow-ups (built):**
- **Chapter 13:** Celeste's count comes from this chapter. On the turn and free roads she says "Twice now …" if Ch11
  was countered, otherwise "Once now, darling. I have started keeping count." If Iris was kept, the reading-room
  thought becomes "the night she tried to end Iris".
- **Chapter 14:** the dawn thought counts the same way. In his last scene Marcus says: "I bought you. Page forty. At
  client request. I'd do it again. You were worth every penny, and you've cost me all of them."

**Content:**
- The threat is non-sexual: it lands on Helix (the shipping contract) and her standing.
- The dance is chosen and hers to lead. The evening is chosen, consent-gated, heat 3, and fades.
- She never coerces anyone. Turning Halvorsen is leverage over his fund's paper.

**Tests:**
- `tests/state/predator-ch11.test.ts`:
  - the entry (Ch12 no longer offered from Ch9);
  - comply, with the page torn and the bill sent (authenticates);
  - refuse, where Marcus admits he asked for her;
  - warn, the first surprise;
  - turn, carried through Geneva to Ch13's "tried to end Iris".
- `predator-ch12`, `ch13` and `ch14` now walk through the Catalogue on its quiet picks. Ch13 asserts "Once now".

**Size (honest), pass 1:** ~1.4k (refuse, quiet), ~1.4k (turn) and ~1.7k (comply, engaged), against the ~4.5k
target.

## Deepening pass (2026-09-27)

- **A second beat in the long room** (`longroom`, after how she works it, before the book). Every path passes
  through it (`c11.p-guest`):
  - **guest-gulf**: the quiet man from the Gulf fund. "You are not on my list, Ms Vale … When you are tired of being
    bought, ring me. I do not buy. I rent."
  - **guest-julian** (ally or rival): by the largest empty frame. An ally: "don't let him see your face when you
    read it". A rival: "He's showing you off … somebody in this room noticed, and minded."
  - **guest-celeste**: a turn of the room on Celeste's arm. "It's very well hung." "Everything here is, darling.
    Including the guests. Marcus … always asks for exactly what he wants. It is his great charm, and it will be the
    end of him."
  - **guest-none** (neutral): an empty frame, "waiting for somebody to" ask what she costs.
- **The back pages** (`book`, after her own page, before Iris) (`pred.book`):
  - **back-first**: the front of the book, soft with handling. A woman with her haircut and her initials: E. V. ·
    First issue. · Singapore. · WITHDRAWN (JAKARTA). Fact `c11.p11-first`. **Geneva remembers it:** at Lucien's
    "You're the second one", she thinks "I know. I saw her page at the Vesper …"
  - **back-clients**: the client ledger. M. CHEN · HELIX · CLIENT, ELEVEN YEARS · TRANSFERS: 3, and two earlier
    initials marked CONCLUDED.
  - **back-close** (neutral).
- **More prose:** her face done twice before the wardrobe mirror; the brass plates under the empty frames (a date
  and a number); the river from the terrace, and Marcus's late laugh through the glass. On the ledger, a third
  pencilled card (WHO WAS SHE? / WHAT DOES CONCLUDED MEAN?).
- **Place lines:** "Under the empty frames" and "The client room, the back pages".

The tests walk the new moments on their neutral picks (`NEUTRAL11 = guest-none, back-close`), and the Ch12–14
builders take the same picks.

**Size (honest) after the deepening pass:** ~1.6k (refuse, quiet), ~1.8k (turn) and ~2.1k (comply, engaged). The
next lift would be a longer Iris scene before the order, and the car at greater length.
