# Executive · Chapter 15: "By Appointment" (design)

**Act III finale · Executive route (lane id `executive`) · the shared archive-heist spine, with Executive framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4, "15 · The Leash" (shared heist spine): entered **with
  Julian's client credentials (Helix may attend the Vesper archive by appointment), or without them if she kept him
  out of it.**
- §2 rules: Julian is never a trap; the kept overlay is honest and never punished; every threat is non-sexual.
- [CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md), the Celebrity spine, and its
  canon:
  - the Vesper archive: "I keep everything, darling". Grey steel cabinets numbered by catalogue page, one lamp, cold
    as a church; the 1109 safe; the drawer "for the people round the people";
  - her own page torn out of *The Autumn Collection*;
  - one thing more, because there is time for one;
  - the dead man's switch;
  - one chosen cost (ally / visibility / money / relationship);
  - the last message, "No more orders.", and Celeste's reply, "I shall be there as myself".
- [PREDATOR_CHAPTER_15_THE_KEY_DESIGN.md](PREDATOR_CHAPTER_15_THE_KEY_DESIGN.md), the pattern for a lane variant of
  this spine.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). No sexual coercion (the reserved beat was Ch13). The evening is
  chosen, heat 3, consent-gated, and fades.

**Continuity it must honour** (built Executive chapters):
- **Ch14:**
  - `exec.signature` (enforced / spent / fell) and `c14.answer`;
  - `exec.credentials`: **julian** ("HIS CREDENTIALS. HE COMES."), **card** ("HIS APPOINTMENT CARD. BEFORE THEY TAKE
    IT OFF HIM."), or **none** ("NO WAY IN BUT MINE.");
  - `exec.sloane14 = accepted`: "take my file out too", and Sloane on her side (`act3.sloane = allied`);
  - on the spend way, Adrian's name went to Axiom.
- **Ch13:** `exec.marsh13 = ally`; `exec.card13` (the 1109 card already out, sewn into Adrian's jacket or kept by
  Iris); `exec.honeypot13`; `exec.told13`.
- **Ch12:** `exec.nora12` (Nora a witness on *truth* or *kind*); `exec.told12`.
- **Ch11:** `exec.iris11 = warn` (Iris free); `exec.coat11`.
- **Ch8:** `exec.fav.car` (Hal); `exec.kept`, `exec.flat` (the kept overlay).

**Status: APPROVED (owner, 2026-09-29: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_15_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_15_SCRIPT.md); code: `src/content/chapter15-executive.ts`.
It is entered from an Executive `chapter14.complete` and ends at the Act IV in-development stop. It ran ~0.75–0.96k words
on one path at pass 1, deepened 2026-09-29 to ~0.8–1.25k with three moments: the night before, the first Evelynn's
drawer, and the Collateral card.

---

## 1. The chapter's job

On the Celebrity road Evelynn breaks into the room where Celeste keeps everything. On the Predator road she is handed
the key. On the Executive road she **walks in by appointment**: Helix is a client, clients may review their own
records, and Julian Mercer's name opens the door, if she brought him with her.

The drawer that matters on this road is not hers. It is **his**:
- every signature he gave Marcus;
- every 14.3 pledge;
- and a card in Celeste's hand: *Collateral, in the person of J.M.*

By the end of the chapter the player must:

1. **Choose who comes**, one or two, never the whole cast:
   - **Julian** (if he has his credentials);
   - **Iris** (if free);
   - **Sloane** (if the debt was taken);
   - **Hal** (if she ever let him drive her);
   - **Maya** (if she is back);
   - **Marsh**, outside, holding the dead man's switch (if an ally);
   - or nobody.
2. **Go in, by the way Ch14 left her:**
   - **by appointment with Julian,** in daylight: Helix reviewing its own records;
   - **on his appointment card, alone,** before they take it off him;
   - **by her own way, at 2 a.m.:** Iris's service stair; Sloane's keys; or a meeting she asks Celeste for as cover,
     which is **always available**.
3. **Survive the snag**, one thing that goes wrong.
4. **Take what is hers and his:**
   - her page (always);
   - **Julian's drawer** (always);
   - Sloane's file, if she promised it;
   - **one thing more:** Adrian Vale's file; the 1109 safe (if the card isn't already out); or Nell's Jakarta order,
     signed C.
5. **Break the holds** in the week after:
   - Julian's signatures stop being Celeste's to spend;
   - Adrian's name is taken back, or defused, if it was burned;
   - copies go to the dead man's switch (Marsh, Nora, Iris, Sloane, by who is in play).
6. **Pay one cost, chosen:**
   - **ally:** Iris's cover burned, or Marsh going public early;
   - **kept:** walk out of everything that was his;
   - **money;**
   - **Julian:** he goes on record at the Markets Authority about 14.3 and loses Helix, by his own choice, never a
     trap.
7. **Send the last message:** "No more orders." Celeste replies: "I shall be there as myself." Then decide what
   becomes of the black phone.
8. **Choose the night:** Julian or alone, the first night in months with nobody holding anything over her.
9. **Pin the card:** THE BOARD MEETS.

**What it must not do:**
- make Julian a trap, or his drawer a revelation that he was ever Celeste's creature. It is a record of what was done
  **to** him;
- punish kept. The *kept* cost is a choice to walk out of what was his, offered, never imposed;
- topple Meridian, or resolve Nell's death (Act IV);
- put anything sexual on screen that is not chosen.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a heist at the Vesper. By appointment it becomes a daylight con, with Celeste's assistant bringing
  coffee while they empty her drawers.
- **Erotic:** the archive in the dark with the man whose file is in it, and the first night with nothing owed.
- **Fun:** walking out of Celeste Laurent's building with Julian Mercer's collateral in a Helix document box, signed
  for at reception.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.credentials` (julian / card / none) | Ch14 | The ways open (§4) |
| `exec.signature`, `c14.answer` | Ch14 | The road in: Julian standing (enforced), Julian standing but smaller and her job gone (spent), Julian gone and her in the room (fell) |
| `exec.sloane14 = accepted` | Ch14 | Sloane on the crew with her keys, and her file to take |
| `exec.marsh13 = ally`, `exec.marsh-page` | Ch13 | Marsh outside, holding the switch; his inquiry as the place the copies go |
| `exec.card13`, `exec.card-where` | Ch13 | The 1109 card already out. "One thing more" is then Adrian's file or Nell's order |
| `exec.iris11 = warn` | Ch11 | Iris free, on the crew: "I stocked that archive for four years." |
| `exec.nora12` (truth / kind) | Ch12 | Nora as a switch holder |
| `exec.fav.car` (take / once) | Ch8 | Hal drives: "I drive, Ms Vale. Tonight I also wait." |
| `exec.kept`, `exec.flat` | Ch7–8 | The *kept* cost: what walking out of his things means for her |
| `c6.maya`, `c5.published` | Ch5–6 | Maya on the crew; the visibility cost if her face is public |

---

## 3. Shape (phases)

`allies → entry → stacks → holds → last → complete`

The phase names avoid the shared Ch15 names (`crew / plan / vesper / archive / leash / phone`) and Predator's
(`gift / people / hour / drawers / week / line / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **allies** | the week before the board · her flat, or his | The road in, stated plainly by Ch14's way. **Who she asks** (one or two): each a short scene with its own line. |
| **entry** | the Vesper | **The way in** (§4), then **the snag**: **talk** / **hide** / **bold**. |
| **stacks** | the archive | Grey steel, one lamp. Her page, Julian's drawer, Sloane's file if promised, and **one thing more**. With Julian beside her, the archive is **his** reckoning: he reads his own card. |
| **holds** | the week after | The holds broken, fast, like a list. Then **the cost** (§4). |
| **last** | Wednesday night, the eve of the board | "No more orders." Celeste's reply. **The phone:** return / river / keep. Then **the night:** Julian or alone. |
| **complete** | the wall | Everything on Celeste's side of the door moved to hers, except one card: THE BOARD MEETS. Act IV (Executive) is in development until its chapters exist. |

---

## 4. The ways in, the drawer, and the cost (with recommendations)

**The ways in** (`exec.way15`):
- **appointment** (credentials: julian). Tuesday at eleven, by appointment, Helix Group plc reviewing its own records.
  Celeste's assistant brings coffee and leaves them the key to the reading room and its panelled door "for as long
  as you need, Mr Mercer." The daylight con. The snag: Celeste herself, early, in the doorway with a glass of
  something.
- **card** (credentials: card). The same appointment, alone, on his card, the day before they take it off him. The
  assistant looks at the card, and at her, for a moment too long. The snag: a phone call to Helix to check, which is
  answered by Hal, or by Julian, or by nobody.
- **stair** (Iris free, or Sloane with her keys). 2 a.m., the service stair or the front door, as in canon. The snag:
  the doorman asleep in the cloakroom.
- **invited** (**always**). She asks Celeste for a meeting at the Vesper "to discuss the board", and uses it as
  cover while the crew does the job. The snag: Celeste is early.

**Julian's drawer** (always taken; `exec.julian-file`): eleven signatures; eleven 14.3 pledges; a photograph of
Julian at nineteen, counting containers across the road from a café with honest coffee; and a card in Celeste's hand:
*Collateral, in the person of J.M. Kind. Will not survive us.*
- With Julian beside her, he reads the card twice and puts it in his pocket: "She's right about the first part."
- Without him, she takes it home, and decides later whether he ever sees it.

**One thing more** (`exec.took15`):
- **adrian:** Adrian Vale's file. Nobody can spend the name again. If it was burned to Axiom (spend), this is how
  it's defused.
- **cards:** the 1109 safe, every placement filmed. Only if `exec.card13` isn't already hers.
- **nell:** Nell's file: the Jakarta order, signed C. Proof of the burn, not the death.

**The cost** (`exec.cost15`, recorded for Act IV):
- **ally:** Iris's cover burned to open the safe, or Marsh goes public early and loses his inquiry to his minister.
- **kept:** she walks out of everything that was his: the flat keys, the card, the car, even the dress. Offered,
  never imposed; the exit ending remembers. Only if `exec.kept` > 0 or the flat is his.
- **money:** everything she had, spent on lawyers and couriers and silence. Broke, and free.
- **julian:** he goes on record at the Markets Authority about 14.3, in his own name. He loses Helix whatever the
  board did, and he chooses it: "I've been meaning to explain myself to somebody for eleven years." Never a trap.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "By Appointment"** (the shared heist spine in Executive framing). *Recommended.*
2. **The way in follows Ch14:** appointment with Julian (a daylight con), his card alone, the service stair (Iris or
   Sloane), or a meeting she asks Celeste for as cover (always available). *Recommended.*
3. **The crew is one or two:** Julian, Iris, Sloane, Hal, Maya, or Marsh outside with the switch, by who is in play.
   *Recommended.*
4. **Julian's drawer is always taken:** his signatures, his pledges, and "Collateral, in the person of J.M." A record
   of what was done to him, never of what he was. *Recommended.*
5. **One thing more:** Adrian's file, the 1109 safe, or Nell's Jakarta order. Plus Sloane's file, if she promised it.
   *Recommended.*
6. **The cost:** ally / kept (walk out of his things) / money / Julian (he goes on record, by his own choice).
   *Recommended.*
7. **The last message and the night:** "No more orders."; the phone returned, into the river, or kept; Julian or
   alone (heat 3, consent-gated, fades). *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter14.complete`, replacing its "[Chapter 15 · in development]" line;
   - ends at an Act IV in-development stop until the Executive Ch16–18 variants exist;
   - sets the Act III keys the Executive Act IV will read (`act3.leash`, `act3.switch`, `c15.cost`, allies);
   - three goldens (appointment, card, invited), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses the shared Ch15 set: the Vesper front, the long room dark, and the archive with its steel cabinets and one
lamp.

New candidates:
- **the Vesper reading room by day**, a Helix document box on the table and Celeste's assistant at the door;
- **Julian in the archive** with a card in his hand;
- the black phone on the river wall.

These go on the consolidated art list after the deepening passes, per the standing rule.
