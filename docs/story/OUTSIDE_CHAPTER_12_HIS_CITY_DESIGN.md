# Outside · Chapter 12: "His City" (design)

**Act III · Outside route (lane id `outside`) · the shared Singapore spine, with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4, "12 · Singapore": **his city.** He meets her at the airport. Katong,
  the breakfast place, the table Nell never came to. Emerald Hill, Nora (who knew his name and never his face). The trust
  question becomes his: he tells her who Nell was to him, or he doesn't.
- §2 rules: his price is always information; he never makes her Nell; he is still unnamed (his name is Ch14's); the
  skeptic is never punished; **how Nell died stays for Act IV (Ch17)**.
- [CHAPTER_12_SINGAPORE_DESIGN.md](CHAPTER_12_SINGAPORE_DESIGN.md) and the built shared chapter, the canon: number 9 Emerald
  Hill, a kept legend site dressed every month, with the ivory jacket on the dining chair; **Nora Linden**, Holland Village,
  the frangipani, "Nell?", two sugars and cinnamon; Eleanor "Nell" Linden, burned in Jakarta, who rang her sister on the
  Saturday ("I'm out. I'm coming to you tomorrow. Make up the spare bed."), was found in the harbour the next week
  (misadventure; the wall is low), and whose friend, the tall one with the beautiful voice, rang on the Sunday morning
  before the police.
- [INSTITUTIONAL_CHAPTER_12_HER_CITY_DESIGN.md](INSTITUTIONAL_CHAPTER_12_HER_CITY_DESIGN.md), the lane-variant pattern.

**Continuity it must honour:** Ch10's answer (`out.give10`) and Ch11's face and page (`out.photo11`, `out.slip11`); Ch8's
courier route (the 02:40, the terminal) and the retired page; Ch14 (built): the reckoning gains callbacks to Nora's table and
the gate, and Nell is already named by her sister on this road.

**Status: APPROVED (owner, 2026-10-01: "do your recommendation", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_12_SCRIPT.md](scripts/OUTSIDE_CHAPTER_12_SCRIPT.md); code: `src/content/chapter12-outside.ts`. Entered
from an Outside `chapter11.complete`; hands on to the Ch14 bridge. ~2.26–2.50k words on one path.

---

## 1. The chapter's job

On the Institutional road Singapore is an Axiom tasking with backup in room 811. On this road it is **the sender's city**:
the one place he is any use, and the one place he cannot walk into a room. The chapter is the two of them in it.

By the end of the chapter the player must:

1. **Take the ticket** from the third step, and decide how to fly: **together** (three rows back) or **apart**. He insists on
   coming: "it's my city, and it's the only place I'm any use." He says "home" once.
2. **Land at Changi** and meet him in the heat, in a jacket twenty degrees wrong. The pause before her name is not
   a language learned late: it is a man stopping himself from saying a different word.
3. **Sit at the table in Katong:** Mrs Wee takes her for the woman who stopped coming, and says that the tall one, Celeste,
   still comes the first Sunday of every month and sits an hour with two cups. **play along** / **tell her** / **say nothing**.
   A man in a linen suit puts a note under his saucer and goes.
4. **Stand at number 9, Emerald Hill:** he carried things to this door for three years and never went in.
   **go in alone** / **ask him in** / **don't go in**.
5. **Go to Holland Village:** Nora, who has never seen the Postman's face. **bring him in** / **leave him at the gate**;
   Nora names Nell, tells the Saturday call and the Sunday call. Then the trust question, which is his: **ask him** ("Were
   you the Postman?"; "Before the first Thursday I'll tell you all of it") / **wait** / **leave it**.
6. **Stand at the harbour wall at dusk:** **stand beside him** / **read him her hand** (the leaf's margin, "C. will sulk") /
   **leave him alone with it**.
7. **Pin the card:** SINGAPORE. HIS CITY.

**What it must not do:** name the sender (Ch14); tell how Nell died (Ch17); make him make her Nell; punish the skeptic; make
anything sexual (no night here: he is not yet told, and the partners are in London).

**Why it is thrilling, erotic and fun:** the thrill is a man in a linen suit and a table that is kept; the charge is the two of
them in a city that remembers one of them, with one yard of stone between; the fun is Mrs Wee, who orders for a ghost.

## 2. Shape (phases)

`ticket → arrivals → katong → hill → kitchen → quay → complete`

The names avoid the shared Ch12 phases (`departure / emerald / flat / straits / sister / night`), Predator's (`geneva / bank /
morel / vault / lake / call / ledger`), Executive's (`changi / tan / number9 / punkah / nora / suite / harbour`) and
Institutional's (`wheels / landing / site / marlowe / village / report / wall`).

## 3. Keys

`out.sg12` (together / apart), `out.katong12` (along / told / silent), `out.watched12`, `out.flat12` (alone / with / leave),
`out.nora12` (with / gate), `out.asked12` (ask / wait / leave), `out.wall12` (beside / leaf / alone), `act3.nell = known`;
facts `c12.o-table`, `c12.o-nora`.

## 4. Decisions (all taken as recommended)

1. **Title "His City";** the mirror of Institutional's "Her City".
2. **He sends the ticket and insists on coming:** together or apart.
3. **Mrs Wee, and a table kept for two:** Celeste keeps it on the first Sunday of every month.
4. **Number 9:** he never went in; she can take him over the threshold or leave it.
5. **Nora names Nell** and calls him the Postman; Nora has never seen his face. The trust question is his, asked at the gate,
   and answered with a promise for before the first Thursday.
6. **The harbour wall at dusk:** the leaf's margin read aloud, or a silence; no cause of death.
7. **No night in this chapter:** he is not yet told, and a chosen night with him opens only after Ch14.
8. **Build shape:** entered from an Outside `chapter11.complete`; the Ch14 interim bridge moves to Ch12's end ("Chapter 13 in
   development"); Ch14's reckoning gains callbacks to Nora and the gate; goldens (together + along + with + ask + beside;
   apart + told + alone + gate + wait + leaf; silent + leave + gate + leave + alone) and a real-save authentication test.

## 5. Art impact

Reuses Changi, Emerald Hill, Holland Village and the harbour wall (shared Ch12 set). New: the Katong coffee shop (marble
tables, a ceiling fan, a table laid for two); the man in the linen suit at the corner table. These go on the consolidated art
list after the deepening passes.
