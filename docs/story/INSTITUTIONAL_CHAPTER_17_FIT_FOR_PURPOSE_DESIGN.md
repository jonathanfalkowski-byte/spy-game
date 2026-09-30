# Institutional · Chapter 17: "Fit for Purpose" (design)

**Act IV · Institutional route (lane id `institutional`) · the shared confrontation ("The Room"), with Institutional
framing**
**Budget: 0.8h / ~8k words across the chapter, ~4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md) §4–5: Act IV shared, Institutional-flavoured; the
  positions (terms from inside / through channels / walk with what you know / Nell). "In every ending Sloane ends as a
  person in the machine."
- §2 rules: Sloane is never a romance; monitoring is never sexualised; nothing sexual on screen in this chapter.
- [CHAPTER_17_THE_ROOM_DESIGN.md](CHAPTER_17_THE_ROOM_DESIGN.md), the shared spine, and its canon:
  - one hour at the board table under the empty frames: Deverell (chair), Soames (reads everything), three unnamed;
  - the first card lands; the case pressed; Deverell's first question is to Celeste: "Did we know?";
  - **Sloane resolves in front of the board** (vouch / stand / use);
  - **Celeste's last move is an offer, not a threat**, and the held card lands at the moment she thinks she has won;
  - **Nell, told, not shown** (the Jakarta order was Celeste's; the car on the Saturday; Nell refused it and walked
    the harbour wall with the bad leg; the driver watched her fall and did not stop, and rang Celeste at six; Celeste
    rang Nora at seven; responsibility, not a push), and how the name is said (ask / Nora / wait; Eleanor or Evie);
  - **the board decides** from what is on the table: resigned / diminished / closed; Meridian wounded, never toppled;
  - **one minute alone:** "Did you ever like being her?", and the white orchid.
- [EXECUTIVE_CHAPTER_17_COLLATERAL_DESIGN.md](EXECUTIVE_CHAPTER_17_COLLATERAL_DESIGN.md), the lane-variant pattern
  (the defect beat becomes the road's own instrument; the offer becomes the road's own temptation).
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md): Sloane's leash "was around her own neck too"; the ORACLE
  controllability defect is the lever that works on every lane.

**Continuity it must honour** (Institutional Ch16, and the road):
- `act4.aim` (inside / channels / walk / nell), `act4.case`, `act4.inside`, `act4.outside`, `act4.first`, `act4.held`,
  `act4.wear`, `act4.arrive`, `act4.notice`, `act4.benton` (escort / refused / gone);
- `inst.client-file`, `inst.priya15`, `inst.pen11` (whether 9C is countersigned V. SLOANE), `inst.way14`,
  `inst.benton-exposed`, `inst.cost15`, `c8.i-dark = torch` (the empty box);
- Ch10's canon line from Celeste's breakfast: "Victoria is a very good officer. She'll never survive us. Unless you
  help me."

**Status: APPROVED (owner, 2026-09-30: "approved", all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/INSTITUTIONAL_CHAPTER_17_SCRIPT.md](scripts/INSTITUTIONAL_CHAPTER_17_SCRIPT.md); code:
`src/content/chapter17-institutional.ts`. Entered from an Institutional `chapter16.complete`; Ch18 follows directly.
It ran ~1.0–1.17k words on one path at pass 1, deepened 2026-09-30 to ~1.31–1.56k with three moments: the place card, the recess, and the minute. Build note: the board resigns Celeste at 3 points or more, not 2 (§5.8), because an
officer, the inquiry or the regulator is in the room on almost every Institutional path; "Where is Mr Benton?"
"Suspended, I'm told. So careless." is added when Benton was walked out in Ch14.

---

## 1. The chapter's job

On the Celebrity road the room is the ORACLE defect argued in front of the people who signed it. On the Executive road
it is clause 14.3. On the Institutional road it is **a client returning a product.** Axiom bought Project Eve under a
contract with a warranty in it, and the product has come to the board meeting to say, in the vendor's own minutes, that
it was **not fit for purpose**: scored uncontrollable before it was sold, and sold anyway.

**The best line on the road belongs to Sloane, if she is in the room:** "I was the officer who took delivery of her.
I'm here to return her." And Evelynn: "I declined."

**Celeste's last move is the Institutional temptation: the leash itself.**
- "Sit with us, darling. Not as the product. As the client. Axiom will need a new officer for Project Eve, and 9C
  needs somebody kind to hold her. You'd be kinder than Victoria. You'd be kinder than me."
- It is the road's final form: the authority she spent eleven chapters learning to use, offered as the power to do to
  Priya what was done to her.

By the end of the chapter the player must:

1. **Open**, and put the first card down. Celeste introduces her to the board by catalogue number, E. V. (II), and
   reads her clothes.
2. **Put the defect on the table**, as a client's complaint: not fit for purpose. The ORACLE verdict (board-signed, C.
   Laurent among the signatures) and the receipts in the client file. Deverell to Celeste: **"Did we know about 9C?"**
   Then **how she presses** (§4).
3. **Resolve the record:** Sloane (vouch / stand / use), if Sloane or her countersignature is in the room; and
   **Benton**, if he walked her in (§4).
4. **Face the leash:** refuse / draw / laugh. If Sloane is in the room, before she answers, Sloane says the one true
   thing about it: "I held it for three years. It was never in my hand. It was round my neck." Then **the held card
   lands.**
5. **Hear the truth about Nell** (canon, told, not shown), and how the name is said.
6. **Watch the board decide:** resigned / diminished / closed. The aim becomes terms: full, partial, or none.
7. **Have one minute alone** with Celeste: "Did you ever like being her?"; the orchid. On this road, one more line:
   "Victoria survived us. I didn't expect that." (Or, if Sloane was used as the proof, "You didn't let Victoria survive
   us. I thought you would.")

**What it must not do:**
- make Sloane a romance, or a trophy; her beat is a person in the machine being seen by the one person who knows the
  machine as well as she does;
- punish refusing the leash: refusal costs her nothing that the board wasn't already deciding;
- topple Meridian, or make Celeste a monster (noir ambiguity);
- put anything sexual on screen.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a product reading its own warranty claim into its maker's minutes; Meridian's man at the table being
  noticed; an offer that is a leash with her hand on the other end.
- **Erotic:** the old charge between two women who know each other best and least. Attention, appraisal, nothing
  touched. And a third woman at the table, Sloane, whose charge is power, watching both.
- **Fun:** "I'm here to return her." "I declined." And Maya's highlighters on Meridian's walnut.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `act4.aim` | Ch16 | What she asks the board for; what Ch18 turns into a position |
| `act4.case` | Ch16 | How far the board moves |
| `act4.inside`, `act4.outside` | Ch16 | Who speaks: Sloane (the return), Maya (the inquiry's findings), Marsh (the notice), Nora (Nell), Daniel (the boxes, and "That's him."), Priya (if she came: "I was 9C. I'm not coming.") |
| `act4.first`, `act4.held` | Ch16 | The first card; the one that lands at the turn |
| `act4.wear` | Ch16 | Celeste's first line: "Axiom's charcoal. How very corporate." / "Black. You did dare." / "A lanyard, like pearls. Victoria taught you that." |
| `act4.benton` | Ch16 | Benton at the table (escort), outside the door (refused), or suspended (gone: "Where is Mr Benton?" "Suspended, I'm told. So careless.") |
| `inst.pen11`, `act3.sloane`, `inst.cost15 = sloane`, `inst.way14` | Ch11–15 | Whether the Sloane beat happens, and what it is |
| `inst.priya15` | Ch15 | 9C's receipt whole on the table (keep), in four pieces in a saucer at home (tear: the 9C beat is her word against the drawer's), or Priya herself (give) |
| `act3.ally.nora`, `inst.took15 = nell`, `inst.nora12` | Ch12–16 | The Nell beat |
| `act3.ally.marsh`, `act4.outside` | Ch13–16 | Marsh at seven, the minister, the switch |

---

## 3. Shape (phases)

`exhibit → warranty → record → leash → harbour → ruling → aside → complete`

The phase names avoid the shared Ch17 names (`opening / defect / sloane / turn / nell / vote`), Predator's (`sit /
market / marcus / offer / eleanor / hands / minute`) and Executive's (`product / clause / officer / gift / wall / tally /
alone`).

| Phase | Place | Beat |
|---|---|---|
| **exhibit** | 18:00 · the long room | Celeste introduces the exhibit: "E. V. (II). Axiom's, for the moment." She reads the clothes. **How she opens** (to the room / to Celeste / silent), and the first card lands. |
| **warranty** | 18:15 | The defect, as a client's complaint. The ORACLE verdict and the receipts. Sloane, if inside: "I was the officer who took delivery of her. I'm here to return her." / "I declined." Or Maya reads the inquiry's finding; or Evelynn reads Axiom's letter herself. "Did we know about 9C?" **How she presses** (§4). |
| **record** | 18:25 | Sloane (vouch / stand / use), if she or her countersignature is in the room. Benton, if he is at the table (§4). Otherwise skipped. |
| **leash** | 18:40 | Celeste's offer: the officer's chair, and 9C to hold. Sloane's line, if she is there. **refuse / draw / laugh**, then the held card lands. |
| **harbour** | 18:50 | Nell (canon, told). **ask / Nora / wait**; Eleanor or Evie. |
| **ruling** | 19:00 | The board decides. The aim becomes terms. |
| **aside** | 19:10 | One minute. "Did you ever like being her?"; "Victoria survived us." **yes / no / orchid.** |
| **complete** | the Embankment | The door. Institutional Ch18 is in development until it is built. |

---

## 4. The choices (with recommendations)

**How she presses** (`act4.press`):
- **press-receipts:** the client file, read like a ledger. E. V. (II), delivered. 9C, pending (countersigned, or not).
  "Every one of these is a person from a client's own floor. You didn't sell Axiom intelligence. You sold it its own
  staff back." Soames puts her glasses on.
- **press-forgery:** the Ch13 tasking, the one with Sloane's name on it that she never wrote ("Look at the sevens"),
  and BACKUP: left blank. "Your man inside my client forged my handler's hand to send me to Owen Marsh." Available if
  she took the tasking to Sloane in Ch13 (`inst.channel13 = sloane`) or has the Records note; otherwise it is her word,
  and she says so.
- **press-cost:** the people. Nell, who fell; Iris, who is *ending*; Adrian, whose desk she sits two from; Priya, by the
  far window; a man at the Markets Authority who lends his newspaper to strangers.

**The record** (`act4.sloane`, `act4.benton-beat`):
- **Sloane**, if she is inside, or `inst.pen11 = signed` (her countersignature on 9C is on the table), or the proof
  road (she was the proof in Ch14):
  - **vouch:** "She raised it. You buried it." Clear her, in front of the people who can;
  - **stand:** let her stand on her own record. Not an ally; not an enemy. A person in the machine;
  - **use:** make her the proof: the officer who took delivery of a product she knew was defective, and countersigned
    the next. True, and cold. On the ally road it spends the alliance in the room, and Sloane knows it the moment it
    happens.
- **Benton**, if he walked her in (`act4.benton = escort`):
  - **benton-box:** the empty box, if she has it (`c8.i-dark = torch`): PROJECT EVE (I), and the outline of a file in
    the dust, and "Where is it, Director?" He doesn't answer. Soames writes his name down;
  - **benton-celeste:** let Celeste do it. She will: "Elias is ours, darling. He always was. I'm told you'd like him."
    Meridian throws its own man off the sledge to lighten it, and the board watches her do it (it counts for the
    board's read of Celeste, not against Evelynn);
  - **benton-ignore:** don't look at him once. He leaves at the recess and does not come back.

**The leash** (`act4.offer`):
- **refuse:** "I didn't come for a leash. I came to return one." The board's faces change.
- **draw:** she lets Celeste go on long enough to say what the chair would cost somebody else: "9C delivered on
  Thursday, as planned, to your desk; Victoria's file closed; Mr Marsh's inquiry given to somebody safer." It is the
  fun one: it hands the board the cost in Celeste's own words.
- **laugh:** the real laugh, the one nobody in that room has heard from her.

Sloane (inside) before she answers: "I held it for three years. It was never in my hand. It was round my neck."
(Outside or absent: nothing. Evelynn doesn't need telling.)

**The held card** (`act4.held-landed`):
- **The client file:** the last receipt, 9C, laid on top. "She's not coming."
- **Nell's order, signed C.**
- **The 1109 cards:** "Every client at this table is on one."
- **Page seven:** the missing page, back in the room, with the note on the back if she read it: "Worth more angry."
- **The empty box** (Benton at the table): it lands on him.
- **Nothing held:** her hands flat on the table, and "I'm still here."

**The board** (`act4.board`, `act4.terms`), read from `act4.case`, plus who is in the room (Sloane as the officer of
record counts; Maya's inquiry counts; Marsh's notice counts) and the switch outside:
- **resigned** (strong or overwhelming): Celeste resigns her seat tonight. The aim is granted in full:
  - **inside:** the Project Eve contract terminated for defect, in the minutes, on the client's terms; 9C withdrawn;
    Axiom indemnified;
  - **channels:** the board refers itself to the regulator before nine tomorrow, to be first; Maya's findings accepted
    in full;
  - **walk:** a written undertaking: her name never placed, catalogued or sold again, by anyone;
  - **Nell:** Celeste says *Eleanor*.
- **diminished** (supported): Celeste keeps her seat and loses the room. The terms are partial: the contract
  suspended pending review; 9C "deferred"; the undertaking without its signatures; the rest held by the switch.
- **closed** (thin): the board closes ranks. She walks out with what she brought, the switch armed, and the slow
  public road ahead. The autonomy law holds: it is still solvable, only costlier.

**One minute** (`act4.last`): yes / no / orchid (shared), with the Institutional line about Victoria.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Fit for Purpose"**, the contract's own warranty, and the question the whole road has been asking of her.
   *Recommended.* Alternative: "Returned".
2. **The defect beat becomes a client's complaint:** not fit for purpose, with the ORACLE verdict and the receipts;
   Sloane's "I'm here to return her." / "I declined." if she is inside. "Did we know about 9C?" *Recommended.*
3. **How she presses:** the receipts / the forgery (the Ch13 sevens) / the cost. *Recommended.*
4. **The record:** Sloane's beat (vouch / stand / use) when she or her countersignature is in the room; **Benton's**
   when he walked her in: the empty box, let Celeste burn him, or ignore him. *Recommended.*
5. **Celeste's last move is the leash as a gift:** the officer's chair and 9C to hold. Refuse / draw / laugh, with
   Sloane's one line, "It was round my neck.", then the held card. *Recommended.*
6. **Nell, as canon,** told not shown: ask / Nora / wait; Eleanor or Evie. *Recommended.*
7. **The board** decides by the case and who is in the room (resigned / diminished / closed), and the aim becomes terms
   (full / partial / none). Then one minute alone, with "Victoria survived us. I didn't expect that." *Recommended.*
8. **Build shape:**
   - entered from an Institutional `chapter16.complete`, ending at a Chapter 18 in-development stop;
   - writes the shared `act4.*` keys for Ch17 (`open`, `press`, `sloane`, `offer`, `held-landed`, `named`,
     `nell-said`, `board`, `terms`, `last`) plus `act4.benton-beat`;
   - the board scored as on the Executive road: the case (thin 0 to overwhelming 3), plus 1 for Sloane at the table as
     the officer of record (or Maya's findings, on channels), plus 1 for drawing Celeste out; 2 or more resigns her,
     1 diminishes her, 0 closes ranks;
   - three goldens (inside resigned, channels diminished with Benton burned by Celeste, walk closed), with neutral
     picks and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses the shared Ch17 set: the long room under the empty frames, the board table, and the water jug. New
candidates:
- **Sloane standing at the board table** with a receipt in her hand, Evelynn seated beside her;
- **the client file on Meridian's walnut**, an insert: E. V. (II) · DELIVERED; 9C on top.

Dark noir. These go on the consolidated art list after the deepening passes, per the standing rule.
