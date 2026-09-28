# Executive · Chapter 14: "The Signature" (design)

**Act III · Executive route (lane id `executive`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md), approved 2026-09-28. §4 "14 · The Signature": Meridian moves
  on Julian. 14.3 is called in, Marcus is positioned to replace him, and his signature is the proof against him. She
  protects him, spends her status for him, or lets him fall and keeps the room. This is the payoff of trust on the
  route.
- §2 rules:
  - Julian is never a trap.
  - Orders target his trust, never his body (the last order is **his silence**).
  - The kept overlay is honest and never punished.
- §5, the endings this chapter opens: the term enforced (with Julian, trust intact); exit with rights intact; status
  spent.
- The built Executive chapters: [Ch7](EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md) and
  [Ch8](EXECUTIVE_CHAPTER_8_THE_TERMS_DESIGN.md).
- Shared canon:
  - [CHAPTER_14_SLOANES_TURN_DESIGN.md](CHAPTER_14_SLOANES_TURN_DESIGN.md): refusal burns Adrian's name to Axiom
    (non-sexual); counterplay makes Celeste afraid and wins a pause until the board meets.
  - [CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md): the Vesper archive, which
    Helix may attend by appointment.
  - [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md).
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): Mature 17+, heat 3, and consent in character. The reserved coercion
  beat was Ch13 (shared, off screen). Every threat here is non-sexual.

**Status: APPROVED (owner, 2026-09-28: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_14_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_14_SCRIPT.md); code: `src/content/chapter14-executive.ts`.
It is entered through the interim bridge from an Executive `chapter9.complete` (§6, decision 8). It ran ~1.0–1.2k words
on one path at pass 1, deepened 2026-09-28 to ~1.2–1.5k with three moments: Marcus's offer, the tie, and the box.

**One refinement made in the build:** telling him everything counts +2 toward trust, and the order alone +1, not the
flat +1 in §4 below. That way honesty can open the enforce way on its own; Chapter 8's favours then decide how much
help it needs.

---

## 1. The chapter's job

Chapter 8 put clause 14.3 under her thumb. Chapters 10–13 are where Celeste sets her orders (his calendar, his
signature at the Vesper) and where she decides what to tell him about Singapore and the placement. Chapter 14 is
**the bill**. The fund calls in 14.3, Helix's own building becomes the fund's collateral, and the board wants a head.
Julian's is the one with his signature on it.

It is the Executive mirror of Predator Ch14:
- there, she takes Marcus down with levers;
- here, she has to decide what Julian is worth to her, and whether she will let him see her while she decides.

By the end of the chapter the player must:

1. **See 14.3 called in:** a financed deal fails, L.S.F. Advisory claims first charge on Helix's assets, and the
   board meets on Friday. Marcus is "the man who can talk to the fund".
2. **Receive Celeste's last order on this road:** his silence. Ask him to resign quietly on Friday and not to
   contest. The threat, if she refuses, is non-sexual: Adrian's name goes to Axiom, and Julian goes down in the
   papers as the man who signed the building away.
3. **Decide what to tell Julian:** everything (Celeste, the order, her own part, who she is), the order only, or
   nothing. His answer is a person's, not a verdict.
4. **Choose the way** (§4):
   - **enforce the term** with him;
   - **spend her status** for him;
   - **let him fall** and keep the room.
5. **Play Friday's board:** the vote, Marcus, and Sloane in the observer's chair, collecting what she is owed.
6. **Pay the kept ledger honestly:** what she took from him changes what she keeps when the ground moves.
7. **Pin the card** that carries her into the Vesper: with Julian's client credentials, or without.

**What it must not do:**
- make Julian a trap, or his fall a verdict on having loved him;
- make any threat sexual, or make refusal cost her body;
- punish kept: the flat, the car and the card leave or stay according to whose they were, and the game says so
  without a sermon;
- let any single way be the only way (the autonomy law): **letting him fall is always available**, and so is
  spending her status.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a boardroom where the building itself is the stake, Marcus across the table, and her own
  fingerprints possibly on the clause.
- **Erotic:** the night before the board, fixing his tie at the window, both of them afraid, and a chosen night
  after (heat 3, consent-gated, fades).
- **Fun:** a decent man and a woman with three names walk into a room full of people who thought they were finished.

---

## 2. What it reads (inputs)

**From the built chapters (real keys):**

| Input | From | Use |
|---|---|---|
| `exec.file` (told / kept / pulled), fact `c8.x-file` | Ch8 | The evidence. **Told:** Julian has known for months and signed nothing since. **Kept:** she holds the copy of page thirty-one and must choose when to show him. **Pulled:** she holds the unsigned Rotterdam original with Marcus's routing notes, and Marcus knows someone took it |
| `exec.trust` | Ch8 | The base of trust (§4) |
| `exec.fav.paper` (his / ours / mine) | Ch8 | Whether the board knows her voice (**ours** or **mine**), which makes the spend way land harder |
| `exec.fav.diary`, `exec.marcus8 = open`, `exec.marcus` | Ch7–8 | How long Marcus has been planning for her: an open war means he moves on Wednesday, not Friday |
| `exec.owes-sloane`, `exec.sloane8` | Ch8 | Sloane collects at the board, or can be asked |
| `exec.kept`, `exec.flat` (accepted / declined / paid), `exec.fav.car`, `exec.fav.card` | Ch7–8 | The honest ledger when he falls or she resigns (§5) |
| `exec.term.door`, `exec.term.files` | Ch7 | **door:** she can resign cleanly, with references, which makes the spend way cheaper for her. **files:** she read the facilities by right, so the board cannot say she hid them |
| `c6.friction-julian`, `c7.x-evening-outcome`, `c8.x-late-outcome` | Ch6–8 | The night scope |
| `c5.published` | Ch5 | Her public face, which the spend way can put on the line |
| `c6.maya` | Ch6 | Maya's evening |

**From the Executive framing of Chapters 10–13 (planned; not built yet).** This chapter defines the contract those
chapters must set, and reads each key with a default when it is absent:

| Key (planned) | Chapter | Values | Default | Use here |
|---|---|---|---|---|
| `exec.calendar` | Ch10 order ("bring me his calendar") | gave / doctored / refused | refused | **gave:** Celeste knew the board date before he did |
| `exec.sign11` | Ch11 order ("have him sign 14.3 at the Vesper, tonight") | signed / warned / refused | refused | **signed:** the deal called in is *that one*, the twelfth signature, and her own hand is in his fall. **Warned:** he already knows |
| `exec.told12` | Ch12 Singapore ("does she tell him who she is?") | told / not | not | Trust, and whether "everything" includes her name |
| `exec.told13` | Ch13 (what she tells him about the placement, and when) | before / after / never | never | Trust; he held her after (canon), and that shapes what he can hear now |

---

## 3. Shape (phases)

`called → silence → truth → ways → boardroom → night → complete`

The phase names avoid the shared Ch14 names (`door / order / maya / answer / sunday / after`) and Predator's
(`dawn / case / safe / room / last / desk / evening / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **called** | Monday, 06:10 · forty-one | A deal fails over the weekend, and the fund invokes 14.3 on every facility Julian signed. With `exec.sign11 = signed`, it is the Vesper deal, and she knows the pen. Julian at the window, grey, still in yesterday's shirt: "Eleven signatures. Twelve. The board meets on Friday. Marcus has already spoken to the fund." What he knows depends on `exec.file` / `exec.sign11 = warned`. A moment: **go to him / go to the file / go to the window** (small, neutral). |
| **silence** | Monday night · the Vesper, or the black phone | Celeste, gently: "He's a lovely man. He'll never survive us. Help him not to try. Ask him to go quietly on Friday; Marcus takes the chair; the fund is patient; Helix lives, and so does he. Refuse, and I shall let the fund have the building, and Axiom will have Adrian Vale's name by the weekend." |
| **truth** | Tuesday, late · his flat or his office | What she tells Julian (§4, *the truth*). |
| **ways** | Wednesday · her office | The three ways (§4), each gated by what she built, with two always available. With `exec.marcus8 = open`, Marcus moves first: a Wednesday memo to the board about "a missing facility", and she has to answer it. |
| **boardroom** | Friday, 08:00 · the Helix boardroom, forty-four | The vote. Marcus. Sloane in Axiom's observer chair. The way plays out. |
| **night** | Friday night | The ledger comes due (§5), and a chosen evening: Julian, Maya, or alone. |
| **complete** | late · the wardrobe door | The card: THE SIGNATURE, and the Vesper, with his credentials or without. |

---

## 4. The truth, and the ways (with recommendations)

**Trust.** One number, used only as a gate and never shown:

`exec.trust` (Ch8) + 1 for `exec.told12 = told` + 1 for `exec.told13 = before / after` + 1 for any of `exec.file = told`,
`exec.sign11 = warned`, or telling him everything in *truth*.

**The truth** (`exec.truth14`):
- **truth-all:** Celeste, the order, the calendar if she gave it, the Vesper signature if it was hers, and her name
  if she hadn't told him. It is the hardest scene on the road. He listens with his hands flat on the desk, and asks
  one question: "Were you ever ordered to love me?" She answers: no, never, not once, only his calendar and his pen
  and his silence. He believes her, because it is true (the autonomy law, stated on screen).
- **truth-order:** only the order, not her part in it. He is grateful and frightened. Trust holds, but the enforce
  way needs everything on the table, so it stays shut unless trust is already high (3 or more).
- **truth-none:** she tells him nothing, and the fall way becomes the easy one.

**The ways** (`exec.signature`; `c14.answer` is set too, so that Ch15's shared spine has its road):

| Way | Needs | The board | Cost | `c14.answer` |
|---|---|---|---|---|
| **Enforce the term** (with him) | Julian knows about 14.3 (file told, sign11 warned, or truth-all) **and** trust ≥ 3, **and** evidence: the copy (kept), the Rotterdam original (pulled), or his own note (told) | Julian stands and reads 14.3 into the minutes himself: "I signed this without reading it. That is my failure. Here is whose it was." She shows that Marcus negotiated the clause and that it was never put to the board. The guarantee was unauthorised, so the fund's charge on Helix fails, and falls on Marcus's own deals. Marcus is suspended. Julian stays. With Sloane, Axiom's observer confirms it. | Celeste is afraid, and says so, in her own way: a pause until her board meets. No burn. The strongest road, with the most allies; the "term enforced" ending opens | countered |
| **Spend her status** (for him) | **Always available.** It is stronger with `exec.fav.paper = ours / mine` (the board knows her voice) or `c5.published` (her face) | She stands up in his place: the chief of staff read the facilities, and the process failed, not the man. She resigns in the room (with the **door** term: references unreserved), and her statement takes the negligence off his name. Julian stays, diminished. | She refused the order, so Adrian's name goes to Axiom (non-sexual). Her job, and anything that was Helix's, goes with it (§5). The "status spent" ending opens | refused |
| **Let him fall** (keep the room) | **Always available** | She asks him for his silence. If she told him why (truth-all or truth-order): "Then I'll go quietly. It's the first decision about Helix I've made with my eyes open." If she told him nothing, he goes because she asked, and never knows why. Marcus takes the COO's chair. She stays, chief of staff to an empty office, inside the room, near the levers. | Julian leaves Helix. Celeste is pleased: "You see? Nobody had to be unkind." The "exit with rights intact" and "status spent" endings stay reachable later | complied |

**Sloane at the board** (`exec.sloane14`):
- **With `exec.owes-sloane`**, she collects: "When you go into the Vesper, and you will, take my file out too."
  - Accept (Axiom's observer backs the enforce or spend way, and Sloane rides into Ch15);
  - or refuse (the debt stands, and Axiom abstains).
- **Without the debt**, she can be asked, at the same price, only if `exec.sloane8` was civil or deal.

**The Vesper credentials** (`exec.credentials`): Helix may attend the Vesper archive by appointment.
- **Enforce:** Julian's standing is intact, and he offers to come.
- **Spend:** he gives her his appointment card: "Use it before they take it off me."
- **Fall:** only if he knew why. Otherwise there are none, and Ch15 is done the hard way.

---

## 5. The ledger comes due (the kept overlay, honestly)

Whatever was Helix's follows Helix, never as a punishment, and always shown plainly:

| Item | Enforce | Spend (she resigns) | Fall (he leaves) |
|---|---|---|---|
| **The flat** (`exec.flat`) | Stays as it was | **accepted:** facilities asks for the key on Monday, politely. **paid:** "It's mine. I paid for it." The lease holds | **accepted:** Marcus's facilities man asks for the key. **paid:** it's still hers |
| **The car** (`exec.fav.car = take`) | Hal, as ever | Hal drives her home one last time, unasked, off the clock | Hal is Marcus's driver now, and nods to her in the garage |
| **The card** (`exec.fav.card = take`) | — | Cancelled on Monday; the dress is hers | Cancelled on Monday; the dress is hers |

The card's closing thought reads `exec.kept`:
- **most of it his:** "I chose every line of it. Now I find out which lines were mine."
- **none:** "I owe nobody anything. It turns out that's also a way of being alone."

---

## 6. Decisions for the owner (recommendation first)

1. **Celeste's last order on this road is his silence:** ask him to resign quietly and not contest. Refusal burns
   Adrian's name to Axiom, which is the shared canon cost and non-sexual. *Recommended.* It completes the route's
   three orders: calendar, signature, silence.
2. **If she got him to sign at the Vesper (Ch11), the deal called in is that one:** her hand is in his fall.
   *Recommended:* it makes Ch11's order pay off here, and the truth scene the hardest on the road.
3. **The truth scene:** everything, the order only, or nothing. His one question, "Were you ever ordered to love
   me?", is answered no, on screen, because it's true. *Recommended.* It is the autonomy law, spoken aloud.
4. **Three ways:**
   - **enforce the term** with him (needs trust ≥ 3, him knowing, and evidence);
   - **spend her status** for him (always available);
   - **let him fall** and keep the room (always available).

   Each sets `c14.answer` (countered / refused / complied) for Ch15. *Recommended.*
5. **Sloane collects the Ch8 debt at the board:** "take my file out too", which seeds the Vesper crew.
   *Recommended.*
6. **The kept ledger comes due honestly:** what was Helix's follows Helix, what she paid for stays hers, and it is
   never punished. *Recommended:* it is the overlay's first real payoff, and the paid rent from Ch7 finally matters.
7. **The night:** Julian (the night scope if warmed, or if she stayed with him in Ch7 or Ch8; after the fall way it
   is offered only if he knew why), Maya, or alone. Heat 3, the consent flow, fades. *Recommended.*
8. **Build shape:**
   - When they exist, this chapter is entered from an Executive `chapter13.complete`.
   - **Until then, an interim bridge:** at an Executive `chapter9.complete` (a dead end today), a placeholder, "This
     road's Act III chapters are in development", leads into Ch14. The Ch10–13 keys read their defaults.
   - At the end, an in-development stop until Executive Ch15 framing exists.
   - Three goldens, one per way. Neutral picks.

   *Recommended.* It keeps the road playable end to end now, as the Ch9 placeholder already does.

---

## 7. Art impact

It reuses:
- forty-one (`helixSuite`), her office (`helixWorkroom`) and the private dinner room;
- the Vesper (Ch11 masters) and the flat at night (`apartmentNight`).

New candidates:
- **the Helix boardroom on forty-four:** a long table, one window of rain, dark noir;
- Julian at the window at dawn, in yesterday's shirt;
- the tie at the window, the night before the board.

These go on the consolidated art list after the deepening passes, per the standing rule.
