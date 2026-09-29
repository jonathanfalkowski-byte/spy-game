# Executive · Chapter 16: "The Term" (design)

**Act IV · Executive route (lane id `executive`) · the shared approach ("The Approach"), with Executive framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4 ("IV · 16–18: shared, Executive-flavoured") and §5, the
  Executive positions:
  - **the term enforced:** with Julian, through Helix and Axiom leverage, she strikes clause 14.3 and forces Meridian
    to release Helix; status kept; the strongest ending, needing trust intact;
  - **exit with rights intact:** out of Helix and his flat with her rights, her name and nothing owed; the kept
    overlay broken; Julian may come as a partner, not a keeper;
  - **status spent:** everything she built, spent to keep Julian standing; she walks away with less and cleaner hands;
  - **Nell's name** (shared across routes).
- §2 rules: Julian is never a trap; the kept overlay is honest and never punished.
- [CHAPTER_16_THE_APPROACH_DESIGN.md](CHAPTER_16_THE_APPROACH_DESIGN.md), the shared spine and its canon:
  - Thursday from first light to the Vesper's door;
  - the case reviewed honestly as `act4.case`;
  - **the aim**, which Chapter 18 turns into her position;
  - who comes (two inside, one outside);
  - the order of the cards and **the one held back**;
  - armour (getting dressed as power; heat 1–2 at most, chosen);
  - the arrival, which reacts to her exposure;
  - the doorman's "Good luck, Ms Vale";
  - the long room, where Celeste stands "as herself".
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §5 (the entry contract: logistics, not biography) and §7.
- The autonomy law: no aim, name or action is gated behind an ally or intimacy. The free-agent core can walk in alone;
  it only costs more.

**Continuity it must honour** (built Executive chapters):
- **Ch15:**
  - `exec.julian-file` (always), `exec.took15` (adrian / cards / nell), `exec.sloane-file`;
  - `exec.cost15` (ally / kept / money / julian: on the record at the Markets Authority);
  - `act3.leash = broken`, `act3.switch`, `act3.ally.*`, `act3.black-phone`, `exec.crew15`.
- **Ch14:**
  - `exec.signature`: whether Julian is still at Helix (enforced), smaller (spent), or gone (fell);
  - `exec.marsh13` / `exec.marsh-page` (Ch13): Marsh's inquiry.
- **Ch13:** `exec.honeypot13`, `exec.card13` (the 1109 card).
- **Ch12:** `exec.told12`, `exec.nora12`, facts `c12.x-ashby` / `c12.x-schedule`.
- **Ch8:** `exec.file` (the copy of page thirty-one, or the Rotterdam original); `exec.kept`, `exec.flat`.
- **Ch7:** her own terms (`exec.term.*`). The door term makes the exit aim cheaper.

**Status: APPROVED (owner, 2026-09-29: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_16_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_16_SCRIPT.md); code: `src/content/chapter16-executive.ts`.
It is entered from an Executive `chapter15.complete` and ends at the Chapters 17–18 in-development stop. It ran ~0.6–0.7k
words on one path at pass 1, deepened 2026-09-29 to ~0.8–0.9k with three moments: dawn, the orchid at noon, and the last
minute.

---

## 1. The chapter's job

On every road Chapter 16 is the morning of the board. On the Executive road it is the morning she decides **what she
wants Julian's name to mean when she walks out of that room.**
- **The term:** enforced, with him.
- **Exit:** her own name, owed to nobody, him beside her or not.
- **Spent:** spent for him.
- **Nell:** Nell's, said out loud.

By the end of the chapter the player must:

1. **Lay out what she holds** at five in the morning, card by card, as a single honest strength (`act4.case`).
2. **Choose the aim** (`act4.aim`), which Chapter 18 turns into her position (§4).
3. **Choose who comes:** up to two inside and one outside. Julian comes **as Helix**, a Meridian client with a seat at
   the table, if he is still standing; or **as a witness** with his own file, if he fell.
4. **Choose the first card and the one held back.**
5. **Dress for it:** the dress on his card (if she didn't give it back), her own black, or the grey silk. Chosen and
   quiet: Julian fastening a clasp at the back of her neck ("Come back."), or Maya doing her hair.
6. **Arrive:**
   - **by Helix's appointment**, in Helix's car, with Julian;
   - **by the front door**, the audience as shield if she is public;
   - **by the service door;**
   - or **in the car Celeste sends.**
7. **Walk into the long room,** where the board sits under the empty frames and Celeste stands up "as herself".
   Chapter 17 begins in that room.

**What it must not do:**
- hold the confrontation (Ch17) or the ending (Ch18);
- rewrite what she did (logistics, not biography);
- gate any aim behind Julian or intimacy. **Exit and Nell are always open.** The term needs Julian standing, or his
  testimony; spent needs him at risk. Where an aim is closed, the chapter says why, in a line;
- make the exit aim a punishment for having taken things. It costs more the more of his she holds, and says so
  honestly.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a heist-planner's morning with the stakes of a trial. Choosing which card goes down first in front of
  the woman who sold her.
- **Erotic:** chosen and quiet. His hands on a clasp at the back of her neck, and "Come back.", on the morning of the
  board.
- **Fun:** arriving in Helix's car, by appointment, as a client, at the building that catalogued her.

---

## 2. What it reads (the entry contract, Executive values)

| Contract field | Executive sources | Use |
|---|---|---|
| Evidence in custody | `exec.julian-file` (eleven signatures, eleven page thirty-ones, "Collateral…"); `exec.file` (the copy or the Rotterdam original); `exec.took15` (Adrian's file / the 1109 safe / Nell's order signed C.); `exec.card13`; `exec.sloane-file`; facts `c12.x-ashby`, `c12.x-schedule`, `c13.x-list`; `act3.black-phone = keep` | What can go on the table |
| Witnesses | Julian (by `exec.signature` and `exec.cost15 = julian`), `exec.marsh13` (unless spent in Ch15), `exec.nora12`, `act3.ally.iris`, Sloane (`act3.sloane = allied`), Maya (`c6.maya`) | Who can stand in the room |
| Exposure | `c5.published`, `exec.cost15 = julian` (his name already on the record) | Whether the embankment is a shield or empty |
| Kept | `exec.kept`, `exec.flat`, `exec.cost15 = kept` | What the exit aim will cost her; whether the dress on his card is still hers to wear |
| Act III | `act3.leash = broken`, `act3.switch` | The switch is live |

From these the chapter derives **`act4.case`** (thin / supported / strong / overwhelming), shown on the wall with its
reasons. Julian's file counts for most on this road: it is 14.3 in his own hand, and Celeste's card calling him
collateral.

---

## 3. Shape (phases)

`layout → purpose → company → sequence → clasp → embankment → complete`

The phase names avoid the shared Ch16 names (`dawn / aim / crew / table / dress / arrive`) and Predator's
(`floor / want / beside / order / armour / door / room`).

| Phase | Place | Beat |
|---|---|---|
| **layout** | Thursday 05:00 · the wall | Every card taken down and laid on the floor in the order it will matter. MERCER, J. in the middle. The case, honestly, as a card of its own. |
| **purpose** | 06:00 · the kitchen table | **The aim** (§4). |
| **company** | morning | Up to two inside and one outside. Short scenes: Julian with a Helix appointment letter; Sloane ironing a shirt; Nora off the overnight flight; Marsh with his bicycle clips; Hal polishing the car. Or nobody. |
| **sequence** | noon | **The first card** (Julian's file / Nell's order / the 1109 cards / page seven), and **the one held back**. |
| **clasp** | 16:00 | **What she wears**, and who, if anyone, is there (heat 1–2). |
| **embankment** | 17:45 | **The way in**, and the doorman: "Good luck, Ms Vale." |
| **complete** | 18:00 · the long room | The board under the empty frames. Celeste stands. Chapter 17 begins here (in development on this road until it is built). |

---

## 4. The aims (with recommendations)

`act4.aim`, which Chapter 18 turns into the Executive position:
- **aim-term** (*the term enforced*). With Julian, through Helix's seat at the table: strike 14.3 from every Helix
  facility and force Meridian to release Helix. It needs Julian standing (Ch14 enforced or spent) or on the record
  (Ch15 `cost = julian`). Trust is what makes it hold. Otherwise it is closed: "He isn't in the room as Helix any
  more. You'd be enforcing a term for a company that let him go."
- **aim-exit** (*exit with rights intact*). Walk out of the room, out of Helix and out of anything that was his, with
  her own name and nothing owed. **Always open.**
  - With the **door** term (Ch7): "references unreserved", and it costs less.
  - The more she still holds of his (`exec.kept`), the more she leaves behind. The chapter says so honestly, and
    never as a punishment.
  - Julian may come too, as a partner and not a keeper, or not.
- **aim-spent** (*status spent*). Spend what she holds to keep Julian standing: the evidence traded for his release
  from 14.3, her own name left on the table. It needs him at risk (Ch14 spent or fell, or `cost = julian`). She walks
  away with less, and cleaner hands.
- **aim-nell** (*Nell's name*, shared). Nell's name said out loud in that room, by the woman who signed the order.
  **Always open.** Nora in the room, if she came.

**Julian's role** (`act4.julian`): **helix** (a seat at the table, if standing), **witness** (his own file in his
hands, if he fell or went on the record), or **outside** (at the kerb with Hal). If she chooses nobody, he is at the
window on forty-one, or in his flat, waiting.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Term"**, the shared approach in Executive framing, echoing Ch8's "The Terms". *Recommended.*
2. **The case** is laid out honestly from the Executive road's evidence, as `act4.case`. Julian's file counts for
   most. *Recommended.*
3. **The aims are the Executive positions:** the term (needs Julian standing or on the record), exit (always), spent
   (needs him at risk), Nell (always). Closed aims say why. *Recommended.*
4. **Who comes:** up to two inside, one outside. Julian comes as Helix (a seat at the table), as a witness, or waits
   outside. *Recommended.*
5. **The first card and the one held back:** Julian's file, Nell's order, the 1109 cards, or page seven.
   *Recommended.*
6. **Armour:**
   - the dress on his card (unless she gave it back in Ch15), her own black, or the grey silk;
   - Julian fastening the clasp ("Come back."), Maya doing her hair, or nobody.

   Heat 1–2. *Recommended.*
7. **The way in:**
   - **Helix's appointment:** Helix's car, with Julian, as a client;
   - **the front door:** the audience as shield if public;
   - **the service door;**
   - **Celeste's car.**

   The doorman: "Good luck, Ms Vale." *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter15.complete`;
   - its Act IV stop moves to Ch16's end ("Chapters 17–18 in development");
   - sets the shared `act4.*` keys (`aim`, `case`, `inside`, `outside`, `first`, `held`, `wear`, `arrive`) plus
     `act4.julian`, so the Executive Ch17–18 framings read the same contract as the other roads;
   - three goldens (term, exit, Nell), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses the shared Ch16 set: the wall at dawn, the kitchen table, and the Embankment at 17:45.

New candidates:
- **Helix's car at the Vesper's door**, Hal holding it open;
- **Julian's hands at the clasp**, an insert.

These go on the consolidated art list after the deepening passes, per the standing rule.
