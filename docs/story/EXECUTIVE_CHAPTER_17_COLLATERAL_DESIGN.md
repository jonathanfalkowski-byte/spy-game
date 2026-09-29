# Executive · Chapter 17: "Collateral" (design)

**Act IV · Executive route (lane id `executive`) · the shared confrontation ("The Room"), with Executive framing**
**Budget: 0.8h / ~8k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4–5: Act IV shared, Executive-flavoured; the positions (term
  enforced / exit with rights intact / status spent / Nell).
- §2 rules: Julian is never a trap; the kept overlay is honest and never punished.
- [CHAPTER_17_THE_ROOM_DESIGN.md](CHAPTER_17_THE_ROOM_DESIGN.md), the shared spine, and its canon:
  - one hour at the board table under the empty frames: Deverell (chair), Soames (reads everything), three unnamed;
  - the first card lands; the case pressed; Deverell's first question is to Celeste: "Did we know?";
  - **Celeste's last move is an offer, not a threat** (there is nothing left to threaten with), and the held card
    lands at the moment she thinks she has won;
  - **Nell, told, not shown:**
    - the Jakarta order was Celeste's;
    - on the Saturday she sent a car to bring Nell to her sister's;
    - Nell refused it and walked the harbour wall with the bad leg;
    - the driver watched her fall and did not stop, and rang Celeste at six;
    - Celeste rang Nora at seven;
    - responsibility, not a push;
  - **the board decides** from what is on the table: resigned / diminished / closed; Meridian wounded, never toppled;
  - **one minute alone:** "Did you ever like being her?", and the white orchid.
- [PREDATOR_CHAPTER_17_SIT_WITH_US_DESIGN.md](PREDATOR_CHAPTER_17_SIT_WITH_US_DESIGN.md), the pattern for a lane
  variant: the defect beat becomes the market, and **clause 14.3** is on the table ("Did we know about 14.3?").
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): nothing sexual on screen; the charge between the two women is
  attention, not contact; no coercion, and the offer is refusable at no cost.

**Continuity it must honour** (Executive Ch16):
- `act4.aim`, `act4.case`, `act4.inside`, `act4.outside`, `act4.first`, `act4.held`, `act4.wear`;
- `act4.julian` (helix / witness / outside / waiting), and Julian's first line from dawn, if he rang ("I signed eleven
  things I didn't read, and I would like the board to watch me read them now.");
- the Ch15 drawer: MERCER, J., and Celeste's card "Collateral, in the person of J.M. Kind. Will not survive us."
  (kept, given to him, or burned).

**Status: DESIGN for owner approval.** Nothing is built yet.

---

## 1. The chapter's job

On the Celebrity road the room is the ORACLE defect argued in front of the people who signed it. On the Executive road
it is **clause 14.3 read into Meridian's own minutes by the man who signed it eleven times**, and a card in Celeste's
own hand that calls him collateral.

**Celeste's last move is the most dangerous gift on the road: the term itself.**
- "Sit with us, darling, and Helix is released tonight. 14.3 struck from every deal. Julian keeps his chair. You can
  have everything you came for, as a present. All you have to do is stay."
- It is the kept overlay's final form: the thing she wanted, handed to her by the one who owns her.

By the end of the chapter the player must:

1. **Open**, and put the first card down. Celeste introduces her to the board by catalogue number, and reads her
   dress.
2. **Put 14.3 on the table.** If Julian is inside, he reads it into the minutes himself. If not, she reads his line,
   or the clause, in his name. Deverell to Celeste: "Did we know about 14.3?" Then **how she presses** (§4).
3. **Resolve Sloane**, only if Sloane is in the room or her file is: vouch / stand / use (shared canon).
4. **Face the gift:**
   - **refuse** ("I didn't come for a present. I came to enforce a term.");
   - **draw** (hear what it would cost somebody else);
   - **laugh.**

   If Julian is in the room, before she answers, he says the one thing a keeper never says: "Whatever you choose,
   don't choose it for me. I'm not the reason." Then **the held card lands.**
5. **Hear the truth about Nell** (canon, told, not shown), and how the name is said: ask / Nora / wait.
6. **Watch the board decide:** resigned / diminished / closed, by what is on the table and who is in the room. The
   aim is granted as terms: full, partial, or none.
7. **Have one minute alone** with Celeste: "Did you ever like being her?"; the orchid. On this road, one more line
   from Celeste: "He's a lovely man. He survived us. I didn't expect that."

**What it must not do:**
- make Julian a trap, a prize, or a bargaining chip that is his to spend. The gift is Celeste's; the choice is
  Evelynn's; Julian's only line is to take himself off the scales;
- punish refusing the gift. Refusal costs her nothing that the board wasn't already deciding;
- topple Meridian, or make Celeste a monster (noir ambiguity);
- put anything sexual on screen.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** the man who signed without reading, reading, in front of the people he signed for; and a gift that is
  a cage.
- **Erotic:** the old charge between two women who know each other best and least. Attention, appraisal, nothing
  touched.
- **Fun:** her own card, "Kind. Will not survive us.", read aloud to her own board, while he sits there, surviving.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `act4.aim` (term / exit / spent / nell) | Ch16 | What she asks the board for; what Ch18 turns into a position |
| `act4.case` | Ch16 | How far the board moves |
| `act4.inside`, `act4.outside`, `act4.julian` | Ch16 | Who speaks; Julian reading the clause himself (helix / witness), or not; the switch at seven |
| `act4.first`, `act4.held` (julian / nell / cards / page / none) | Ch16 | The first card; the one that lands at the turn |
| `act4.wear` (his / black / grey) | Ch16 | Celeste's first line: "His dress. You kept it." / "Black. You did dare." / "Iris's grey. How very loyal." |
| `c16.x-dawn = julian` | Ch16 | His first line, which he says in the room if he is there |
| `c15.x-cardj` (give / burn / keep) | Ch15 | Whether the Collateral card is on the table (kept), in his pocket (given), or ash (burned; then she quotes it from memory) |
| `exec.sloane-file`, `act3.sloane` | Ch14–15 | Whether Sloane's beat happens |
| `exec.nora12`, `act4.inside` includes nora, `exec.took15 = nell` | Ch12–16 | The Nell beat: the order, the sister in the room |
| `exec.marsh13` (ally), `act4.outside` | Ch13–16 | Marsh at seven, the minister |

---

## 3. Shape (phases)

`product → clause → officer → gift → wall → tally → alone → complete`

The phase names avoid the shared Ch17 names (`opening / defect / sloane / turn / nell / vote`) and Predator's (`sit /
market / marcus / offer / eleanor / hands / minute`).

| Phase | Place | Beat |
|---|---|---|
| **product** | 18:00 · the long room | Celeste introduces the exhibit by catalogue number and reads the dress. **How she opens** (to the room / to Celeste / silent), and the first card lands. |
| **clause** | 18:15 | 14.3, in his hand or his words. "Did we know about 14.3?" **How she presses:** the clause (the fund's first charge on its own clients' companies: "You don't own Meridian. It owns you.") / the collateral (Celeste's card, read aloud) / the cost (Clare, Nell, Iris, a man at the Markets Authority on a bicycle). |
| **officer** | 18:25 | Only if Sloane is in the room or her file is: **vouch / stand / use**. Otherwise skipped. |
| **gift** | 18:40 | Celeste's offer: the term, as a present, if she stays. Julian's one line, if he is there. **refuse / draw / laugh**, then the held card lands. |
| **wall** | 18:50 | Nell (canon, told). **ask / Nora / wait**; Eleanor or Evie. |
| **tally** | 19:00 | The board decides. The aim becomes terms. |
| **alone** | 19:10 | One minute. "Did you ever like being her?"; "He survived us." **yes / no / orchid**. |
| **complete** | the Embankment | The door. The Executive Ch18 is in development until it is built. |

---

## 4. The choices (with recommendations)

**How she presses** (`act4.press`):
- **press-clause:** the fund holds first charge on every client's company. Every chair at this table has signed a 14.3
  somewhere. Soames puts her glasses on.
- **press-collateral:** Celeste's card, read aloud: "Collateral, in the person of J.M. Kind. Will not survive us."
  With the card kept, it goes on the table. Given, Julian takes it out of his pocket himself. Burned, she says it from
  memory, "I burned it, but I remember every word."
- **press-cost:** the people. Clare Adeyemi, who walked; Nell, who fell; Iris, who is *ending*; Owen Marsh, who cycles
  to work; and the man who signed.

**The gift** (`act4.offer`):
- **refuse:** "I didn't come for a present. I came to enforce a term." The board's faces change.
- **draw:** she lets Celeste go on long enough to say what the gift costs somebody else. "Helix released, and Mr
  Marsh's inquiry closed, and Sloane's file returned to us." It is the fun one, and it hands the board the cost in
  Celeste's own words.
- **laugh:** the real laugh, the one nobody in that room has heard from her.

Julian (inside) before she answers: "Whatever you choose, don't choose it for me. I'm not the reason." (Outside or
waiting: the switch at seven, and a text, "Don't choose it for me.")

**The held card** (`act4.held-landed`):
- **MERCER, J.:** "He survived."
- **Nell's order, signed C.**
- **The 1109 cards:** "Every client at this table is on one."
- **Page seven:** the missing page, back in the room.
- **Nothing held:** her hands flat on the table, and "I'm still here."

**The board** (`act4.board`, `act4.terms`), read from `act4.case`, plus who is in the room (Julian as Helix counts; a
witness counts) and the switch outside:
- **resigned** (strong or overwhelming): Celeste resigns her seat tonight. The aim is granted in full:
  - **term:** 14.3 struck from every Helix facility, and Helix released;
  - **exit:** a written undertaking, her name never placed, Helix no claim on her;
  - **spent:** Julian released from every signature, in exchange for what she brought, which stays on the table;
  - **Nell:** Celeste says *Eleanor*.
- **diminished** (supported): Celeste keeps her seat and loses the room. The terms are partial: 14.3 struck on the
  next facility and not the last eleven; the undertaking without the references; the rest held by the switch.
- **closed** (thin): the board closes ranks. She walks out with what she brought, the switch armed, and the slow
  public road ahead. The autonomy law holds: it is still solvable, only costlier.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Collateral"** (the shared room in Executive framing), for Celeste's own word about him. *Recommended.*
2. **The defect beat becomes 14.3:** read into Meridian's minutes by Julian if he is inside, or in his words if not.
   "Did we know about 14.3?" *Recommended.*
3. **How she presses:** the clause / the collateral card (kept, in his pocket, or from memory if burned) / the cost
   (Clare, Nell, Iris, Marsh). *Recommended.*
4. **Sloane's beat only when Sloane or her file is in the room:** vouch / stand / use (shared canon). Otherwise it is
   skipped. *Recommended.*
5. **Celeste's last move is the term as a gift, if she stays:** refuse / draw / laugh, with Julian's one line, "Don't
   choose it for me. I'm not the reason.", and then the held card. *Recommended.* It is the kept overlay's final
   form, and the answer is hers.
6. **Nell, as canon,** told not shown: ask / Nora / wait; Eleanor or Evie. *Recommended.*
7. **The board** decides by the case and who is in the room (resigned / diminished / closed), and the aim becomes
   terms (full / partial / none). Then one minute alone, with "He survived us. I didn't expect that." *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter16.complete`;
   - ends at a Chapter 18 in-development stop;
   - writes the shared `act4.*` keys for Ch17 (`open`, `press`, `sloane`, `offer`, `held-landed`, `named`,
     `nell-said`, `board`, `terms`, `last`);
   - three goldens (term resigned, exit diminished, Nell closed), with neutral picks and a real-save authentication
     test.

   *Recommended.*

---

## 6. Art impact

It reuses the shared Ch17 set: the long room under the empty frames, the board table, and the water jug.

New candidates:
- **Julian standing at the board table** with eleven pages in front of him;
- **Celeste's card on the table**, an insert: "Collateral, in the person of J.M."

These go on the consolidated art list after the deepening passes, per the standing rule.
