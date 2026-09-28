# Predator · Chapter 16: "The Seventh Chair" (design)

**Act IV · Predator route (lane id `predator`) · the shared Thursday spine, with Predator framing**
**Budget: 0.6h / ~6k words across the chapter, ~4k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §4–5, Ch16–18: the board scenes are shared, and she enters
  **as a client's representative, not as the product**. The positions are Predator's own:
  - **the seat accepted:** she becomes Celeste, eyes open; the darkest ending, and a real one (decision 5);
  - **the seat refused**, and Meridian wounded from inside Helix;
  - **walking away with Helix**, Meridian kept at arm's length.
- [CHAPTER_16_THE_APPROACH_DESIGN.md](CHAPTER_16_THE_APPROACH_DESIGN.md), the Celebrity spine:
  - Thursday from first light to the Vesper's door;
  - the case reviewed honestly as one strength (`act4.case`);
  - the aim, which Chapter 18 turns into her position;
  - up to two inside and one outside;
  - what goes on the table first, and one card held back;
  - getting dressed as power;
  - an arrival that reacts to her exposure;
  - Celeste standing when she comes in.
- The built Predator chapters, above all **Ch15** (the key, the one thing more, the cost, "I shall be there as
  myself") and **Ch14** (Celeste's invitation to "Helix's new counterparty").
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). There is no order left, so no coercion. Intimacy is chosen and quiet
  (heat 1–2) on the morning of the board.

**Status: APPROVED (owner, 2026-09-27: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_16_SCRIPT.md](scripts/PREDATOR_CHAPTER_16_SCRIPT.md); code: `src/content/chapter16-predator.ts`.
It runs ~1.0–1.1k words on one path.

---

## 1. The chapter's job

On the Celebrity road Evelynn walks into the long room **as the product** the board once bought. On the Predator
road she walks in **as a buyer**: Helix's counterparty, invited, with a place laid for her. The question the day asks
is not whether she can survive the room. It is **what she wants from it**, because on this road one of the answers
is the room itself.

By the end of the chapter the player must:

1. **Know what she holds:** every card on the floor at five in the morning, stated honestly as one strength
   (`act4.case`), from what the Predator road actually left her.
2. **Choose the aim**, which Chapter 18 turns into her position (§4):
   - **the seat:** go in to take what Celeste will offer;
   - **the wound:** refuse it, and use Helix to hurt Meridian from inside;
   - **Helix:** walk away with the company, the fund's claim cut, and Meridian at arm's length;
   - **Nell:** her name said aloud in that room, by the woman who signed the order.
3. **Choose who comes:** up to two inside and one outside, from who is still standing and was not spent in Ch15.
4. **Choose the order of things:** what goes on the table first, and the one card held back.
5. **Dress, and arrive**, in a way that reacts to her exposure.
6. **Walk into the long room**, where the board sits under the empty frames, and Celeste stands. There are seven
   chairs and six people, and the seventh chair, beside Celeste's, is pulled out.

**What it must not do:**
- hold the confrontation (Ch17) or the ending (Ch18);
- make the seat a trap or a punishment. It is a real ending, chosen with open eyes;
- gate the action behind any ally or intimacy (autonomy law: she can walk in alone; it costs more).

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a heist-planner's morning with the stakes of a coronation.
- **Erotic:** getting dressed for power, and, if she wants, a partner's hands on a clasp at the back of her neck.
- **Fun:** choosing which of her cards to lay down first in front of the people who taught her to keep them.

---

## 2. What it reads (the entry contract, Predator values)

| Contract field | Predator sources | Use |
|---|---|---|
| Evidence in custody | `act3.nell-order`, `act3.cards` (and her own receipt on the comply road), `pred.clients15` (Celeste's client ledger), `pred.geneva` (the nine flats), `pred.sign = copied / amended` (clause 14.3), `pred.transfer` (page forty), `pred.safe = letters` (and her copies if she returned them), `pred.lever8.archive` (the fund's schedule), `act3.black-phone = keep`, `c13` FOR THE DAY IT CAN BE USED | What can go on the table |
| Witnesses | `pred.ally.marsh`, `pred.ally.morel`, `pred.ally.iris`, `pred.ally.marcus`, `pred.nora = told`, `pred.halvorsen = owes-her`, `c8.p-night = pryce`, `pred.julian = ally`, `c6.maya` | Who can stand in the room. Anyone named in `c15.cost-who` is spent and cannot |
| Public exposure | `c5.published`, `pred.way = press`, `act3.cost = visibility` | Whether Meridian sees her coming |
| Resources | `own.cash`, `pred.account`, `act3.cost = money` | Whether "Helix" can be paid for |
| Standing | `pred.standing`, `pred.celeste-count`, `pred.celeste10` | How Celeste expects her: an heir, a problem, or a guest |

From these the chapter derives **`act4.case`** (thin / supported / strong / overwhelming), shown on the wardrobe door
as a card of its own with its reasons, never as a hidden score. The client ledger and Nell's order count for most;
then the recordings, the Geneva list, clause 14.3, and each witness in the room.

---

## 3. Shape (phases)

`floor → want → beside → order → armour → door → room`

| Phase | Place | Beat |
|---|---|---|
| **floor** | Thursday · 05:00 · the wardrobe door | Every card down and laid on the floor in the order it will matter. The case, stated honestly (`act4.case`). The key on its ribbon, or the copy on its thread; the black phone, if she kept it. |
| **want** | 06:00 · the kitchen table | **The aim** (§4). |
| **beside** | morning | Up to two inside, one outside, each a short scene. Halvorsen, a client, can take a client's chair and owe her in public. Marcus can walk back into the room where he was bought. Lucien can arrive as the bank. Or nobody. |
| **order** | noon | What goes first (the client ledger, Nell's order, the recordings, the nine flats, clause 14.3, page forty) and the one card held back. |
| **armour** | 16:00 · the mirror | The midnight blue (Marcus's gift), the black, or **Celeste's own green**, worn to her table. Optional, heat 1–2: a clasp fastened by a partner, "Come back"; or Maya at the mirror. |
| **door** | 17:45 · the embankment | The way in: the **front door** (as a counterparty; photographers if she is public); **Celeste's car** at half past five (Pryce driving, arriving as the guest she is expected to be); or **Helix's car** with Julian (if an ally): arriving as the company. The doorman: "They're expecting you. Good luck, Ms Vale." |
| **room** | 18:00 · the long room | The board under the empty frames: Deverell (chair), Marguerite Soames, three others, and Celeste in black at the head, who stands when she comes in. Seven chairs, six people, and the seventh, beside Celeste's, pulled out. |

---

## 4. The aim (with recommendations)

The aim (`act4.aim`, with Predator values) becomes the Chapter 18 position:

- **aim-seat:** go in to take the seat Celeste will offer. Eyes open: she will become what sits at that table, and
  run it better. **The darkest ending, and a real one** (route decision 5). The card held back becomes the price she
  sets, not a weapon. With the account kept (Ch12) or Ch13 complied, it reads as the road's natural end. Otherwise
  it reads as a choice made against everything she did.
- **aim-wound:** refuse the seat, and use Helix to hurt Meridian from inside. She lays the client ledger and clause
  14.3 on the table: every client named, and the fund's claims on its own clients' companies. Meridian wounded,
  publicly among the people who matter, and it cannot sue.
- **aim-helix:** walk away with Helix. The fund's claim is cut (clause 14.3 struck from every deal, the L.S.F. money
  repaid or written off), Helix stays hers, and Meridian is kept at arm's length with the switch armed. Needs
  resources or leverage: the account, the money, or Halvorsen and Lucien at the table.
- **aim-nell:** shared with Celebrity. Nell's name said out loud, in that room, by the woman who signed the order.
  Stronger with Nora inside, or the watch on her wrist.

For the shared Chapter 17 the Predator values map as: wound ≈ expose, helix ≈ terms, nell = nell, and **seat is
Predator's own.** The Predator Chapter 17 variant reads them directly.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Seventh Chair".** The shared Thursday, dawn to the door, but she walks in as Helix's counterparty,
   and a chair is pulled out for her beside Celeste's. *Recommended.*
2. **The Predator aims: seat, wound, Helix, Nell.** They become the Ch18 positions, and the seat is a real,
   chosen, darkest ending. *Recommended.*
3. **The case is derived from what the Predator road left** (the client ledger, Nell's order, the recordings, the
   nine flats, clause 14.3, the letters, witnesses), with allies spent in Ch15 excluded, and shown honestly as
   `act4.case`. *Recommended.*
4. **Who comes, from the Predator cast:**
   - Halvorsen in a client's chair;
   - Marcus back in the room where he was bought;
   - Lucien as the bank;
   - Julian as Helix;
   - Marsh, Iris, Nora or Maya;
   - Pryce outside.

   Up to two inside and one outside, or alone. *Recommended.*
5. **The order of things:** the first card, and one held back. On the seat aim, the held card becomes her price.
   *Recommended.*
6. **Armour:** Marcus's midnight blue, the black, or Celeste's own green. An optional clasp, heat 1–2.
   *Recommended.*
7. **The way in:**
   - the front door;
   - Celeste's car, with Pryce;
   - Helix's car, with Julian.

   Each reacts to her exposure. The doorman's "Good luck" is kept from the shared spine. *Recommended.*
8. **Entry and build shape:**
   - entered from the Predator `chapter15.ledger`; the road stops at `chapter16.room` until the Predator Ch17
     variant exists;
   - writes `act4.*` (case, aim, inside, outside, first, held, wear, arrive, seen) with Predator aim values, mapped
     for Ch17 as above;
   - three goldens (seat, wound, Helix) with neutral picks, and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

Reuses the wardrobe door, the flat, the embankment, and the long room reset for the board (Celebrity Ch16–17). New:
- the seventh chair, pulled out beside Celeste's (a composition note for the board master);
- Evelynn in Celeste's green (a costume).

Dark noir. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
