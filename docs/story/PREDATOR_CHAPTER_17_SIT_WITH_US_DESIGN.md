# Predator · Chapter 17: "Sit With Us" (design)

**Act IV · Predator route (lane id `predator`) · the shared "Room" spine, with Predator framing**
**Budget: 0.8h / ~7.5k words across the chapter, ~5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §4–5 and decision 5: she sits at the table as a client's
  representative, and the last offer, a board seat, is **acceptable** on this route (the darkest ending, and a real
  one).
- [CHAPTER_17_THE_ROOM_DESIGN.md](CHAPTER_17_THE_ROOM_DESIGN.md), the Celebrity spine, for the shared canon:
  - one room, one hour, six beats;
  - the held card landing at the turn;
  - Celeste's account of Nell. The Jakarta order was hers. On the Saturday she sent a car to take Nell to her
    sister's. Nell refused it and walked the harbour wall with the bad leg. The driver watched her fall and did not
    stop, and rang Celeste at six; Celeste rang Nora at seven. **Responsibility, not a push;**
  - the board decides by what is on the table (Meridian always stands);
  - one minute alone, and "Did you ever like being her?".
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md): wound, don't topple.
- The built Predator chapters, above all **Ch16**: the aims (seat / wound / helix / nell), who is inside and
  outside, the first card and the held card (her price on the seat aim), the dress, the key at her throat, and
  the seventh chair pulled out beside Celeste's.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). No coercion (there is nothing left to coerce with). The charge
  between the two women is attention and appraisal, never sexual.

**Status: APPROVED (owner, 2026-09-28: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_17_SCRIPT.md](scripts/PREDATOR_CHAPTER_17_SCRIPT.md); code: `src/content/chapter17-predator.ts`.
It runs ~1.2–1.4k words on one path.

---

## 1. The chapter's job

On the Celebrity road the room is a **trial**: the product reads out the warranty, and the board decides what it
costs Celeste. On the Predator road the room is a **succession**. Celeste introduces Evelynn not as the product but
as Helix's counterparty, "and, you'll forgive me, Anton, my successor, if she'll have it". The hour is Evelynn
deciding, in front of the people who would serve under her, whether she will.

By the end of the chapter the player must:

1. **Open**: sit in the seventh chair, stay standing as Helix, or put the first card down before anyone speaks.
2. **Lay out the market**, the buying side the Predator road collected: the client ledger, the nine flats, clause
   14.3. Every client at this table bought from this book, and the fund holds a claim on every one of their
   companies.
3. **Resolve Marcus in that room**: the client who was bought here at twenty-nine and "reviewed at forty-three".
4. **Answer the offer.** Celeste: "Sit with us, darling. Nobody would ever place you again. You would do the
   placing." **Accept, refuse, or laugh.** The held card lands as a blow, or, on acceptance, as her price.
5. **Hear the truth about Nell** (shared canon), and whether Celeste says *Eleanor* or *Evie*.
6. **Watch the board decide.** If she accepts, Celeste steps down and Evelynn takes her seat. Otherwise the board
   acts by the strength of the case.
7. **Have one last minute alone with Celeste**, and the key.

**What it must not do:**
- make the seat a trap, a punishment or a fake choice;
- topple Meridian (it always stands);
- make Celeste a monster (noir ambiguity);
- gate the name or the action behind any ally (autonomy law).

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a boardroom coup in one hour, and the card in her pocket.
- **Erotic:** the charge between two predators who recognise each other, across a table, over a chair. Attention,
  never touch.
- **Fun:** watching six people who bought her realise she is choosing whether to buy them.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `act4.aim` (seat / wound / helix / nell) | Ch16 | What she came for. The offer answers it, or tests it |
| `act4.case` | Ch16 | How far the board moves if she refuses |
| `act4.inside`, `act4.outside` | Ch16 | Who speaks: Halvorsen (a client, "not buying tonight"), Marcus, Lucien, Julian, Marsh, Iris, Nora, Maya; who waits at seven: Pryce or the switch |
| `act4.first`, `act4.held` | Ch16 | The first card; the held card (a blow, or her price) |
| `act4.wear`, `pred.key16`, `act4.arrive`, `act4.seen` | Ch16 | Celeste's first line (Marcus's blue / black / "my green: how flattering, or how rude"); her eyes on the key; the street as a clock |
| `pred.clients15`, `pred.geneva`, `pred.sign`, `act3.nell-order`, `act3.cards` | Ch12–15 | What the market beat can lay down |
| `pred.read15 = marcus`, `pred.ally.marcus`, `pred.marcus`, `pred.mercy`, `pred.transfer` | Ch11–15 | Marcus's beat: his drawer, his fall, what he kept |
| `pred.mirror`, `pred.celeste10`, `pred.account` | Ch10–13 | What Celeste can say Evelynn already did for her (the room hears it, and Evelynn owns it) |
| `pred.watch`, `pred.phoneN`, `pred.nora` | Ch10–12 | The Nell beat's Predator echoes |

---

## 3. Shape (phases)

`sit → market → marcus → offer → eleanor → vote → minute`

| Phase | Place | Beat |
|---|---|---|
| **sit** | 18:00 · the long room | Celeste introduces her: "Helix's new counterparty. And, you'll forgive me, Anton, my successor, if she'll have it." Her first line reads the dress, and her eyes find the key. **open-chair** (sit in the seventh chair, first) / **open-stand** ("I'll stand. I came as Helix.") / **open-card** (the first card down before anyone speaks). The first card lands. |
| **market** | 18:15 | The buying side. **press-market** (every client named to the others: "You each bought from this book. Now you each know who else did.") / **press-claim** (clause 14.3: the fund holds first claim on every client's company; "You don't own Meridian. It owns you.") / **press-cost** (the people: Delphine, Iris, Nell, the woman on page forty). Deverell's first question is to Celeste: "Did we know about 14.3?" |
| **marcus** | 18:25 | If Marcus is inside, he stands: "I was bought in this room." If not, she reads his drawer: "Review at forty-three." **marcus-vouch** (he was a product too) / **marcus-stand** (his own record) / **marcus-use** (the client who pledged his own company: true, cold, and his last reputation). |
| **offer** | 18:40 | "Sit with us, darling. Nobody would ever place you again. You would do the placing." **offer-accept** / **offer-refuse** ("I didn't come for a chair.") / **offer-laugh**. Then the held card: a blow on refuse or laugh; **her price** on accept (the client ledger stays in her drawer, not Celeste's; Marcus's drawer emptied; Nell's order to Nora; page forty burned). |
| **eleanor** | 18:50 | Celeste on Nell, and the harbour wall (shared canon), with the Predator echoes: "You carried her phone. You'll have seen the N." / "That's her watch. She never wound it." **named-ask** / **named-nora** (if Nora is inside) / **named-wait**. *Eleanor* or *Evie*. |
| **vote** | 19:00 | **Accepted:** Deverell moves that Mrs Laurent's resignation be accepted, and that Ms Vale take her seat, and the hands go up. Celeste stands, and pulls the seventh chair out a little further, and goes to sit at the end, where the clients sit. **Refused or laughed**, by the case: **resigned** (strong or overwhelming), **diminished** (supported), **closed** (thin). The aim adds its terms: the wound splits the table (clients who now know each other), Helix is freed (14.3 struck from every Helix deal), and Nell is named. |
| **minute** | 19:10 | Alone, under the empty frames. Celeste: "Did you ever like being her?" On the accepted road, first: "Now you'll find out what I liked." Her last words: **last-yes** / **last-no** / **last-orchid** / **last-key** (the key on its ribbon, laid on the table between them, or kept). |

---

## 4. The offer (with recommendations)

The seat is the Predator road's own ending, so the offer is **not** a trick to be refused:

- **offer-accept:** "Yes." She sits in the seventh chair. The held card becomes her price, the first thing she
  asks the board for as one of them. `act4.board = succeeded`: Celeste steps down to the clients' end of the table,
  and Evelynn has her seat. Ch18 makes it a position: she runs the table, with her eyes open. It is available on
  every aim, and it is strongest on **seat**. On **wound**, **helix** or **nell** it reads as a turn she did not
  plan, and Ch18 remembers that.
- **offer-refuse:** "I didn't come for a chair." The held card lands as a blow. The board decides by the case
  (`resigned` / `diminished` / `closed`) and grants the aim as terms, in full or in part.
- **offer-laugh:** the real laugh, the one from Marcus's office. The held card lands harder. The board result is the
  same as refusal, and Celeste's last minute is warmer and more dangerous.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Sit With Us".** The shared hour at the board, six beats, framed as a succession: Celeste introduces
   her as "my successor, if she'll have it". *Recommended.*
2. **The defect beat becomes the market** (the client ledger, clause 14.3, the nine flats), because the ORACLE
   verdict and Sloane were never central on this road. *Recommended.*
3. **Sloane's beat becomes Marcus's:** the client bought in this room and "reviewed at forty-three". Vouch,
   stand, or use. *Recommended.*
4. **The offer is the seat, and accepting it is a real answer.** Accept, refuse or laugh. The held card lands as a
   blow, or as her price. *Recommended* (route decision 5).
5. **Nell is shared canon** (the car, the wall, the driver, six and seven o'clock), with the Predator echoes of the
   phone's N and the watch. *Eleanor* or *Evie*. *Recommended.*
6. **The board:**
   - accepted: Celeste steps down and Evelynn takes her seat (`succeeded`);
   - otherwise, by the strength of the case: resigned, diminished, or closed ranks;
   - the aim sets the terms: the wound splits the table, Helix is freed, or Nell is named.

   Meridian always stands. *Recommended.*
7. **One minute:** "Did you ever like being her?" ("Now you'll find out what I liked", if she accepted). Her last
   words, or the key laid down, or kept. *Recommended.*
8. **Entry and build shape:**
   - entered from the Predator `chapter16.room`; the road stops at `chapter17.minute` until the Ch18 variant exists;
   - writes `act4.open`, `act4.press`, **`act4.marcus`** (in place of `act4.sloane`), `act4.offer` (accept / refuse /
     laugh), `act4.held-landed`, `act4.named`, `act4.nell-said`, `act4.board` (**succeeded** / resigned /
     diminished / closed), `act4.terms`, `act4.last`;
   - three goldens (accept on the seat aim; refuse with a strong case; laugh with a thin one) with neutral picks,
     and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

Reuses the long room reset for the board (Celebrity Ch16–17). New:
- Evelynn in the seventh chair, beside Celeste;
- Celeste at the clients' end of the table (the accepted road);
- the key on its ribbon on the board table.

Dark noir, lamp-lit. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
