# Predator · Chapter 13: "The Mirror" (design)

**Act III · Predator route (lane id `predator`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §5 and decision 3 (approved: "she is asked to *run* a
  placement… comply is off screen, cut at the briefing. The cost lands on Evelynn… The route's moral centre");
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §2, §3 and §5. Sexual coercion is rare, reserved and heavy, and this is
  the Predator road's one such beat. It is never eroticized. The placed woman is an adult and reads as one.

**Canon it mirrors:** Celebrity Ch13, "The Honeypot": Owen Marsh (deputy director of enforcement at the Markets
Authority, the inquiry into Halvorsen's fund); suite 1109 at the Claremont; the camera behind the mirror.

**Status: DESIGN for owner approval.** Nothing is built.

---

## 1. The chapter's job

On the Celebrity road, Meridian placed Evelynn. Here, **Meridian asks her to place somebody else.** She is the
client's new favourite: Marcus's star, the woman who took three levers in three weeks. Celeste wants to see whether
she can run the machine from the operator's chair.

By the end of the chapter the player must:

1. **Be asked to run a placement** against Owen Marsh, for Halvorsen, in suite 1109. The ask comes from Celeste,
   warmly: "I thought the new one might like to learn how it is done", the line she used about Iris.
2. **Meet the woman she would be placing:** "Delphine", a Meridian legend, 29, eighteen months into it, leveraged
   the way Evelynn was. Her real name is Ana, and she gives it only if asked.
3. **Answer:** comply, refuse, or counter. Each has a real cost that lands on Evelynn.
4. **Sit behind the mirror** on Thursday, in the operator's room, or not.
5. **Carry what it cost:** the route's moral centre. What she does here is what Chapter 14 (Marcus falls) and the
   board scenes remember.

**What it must not do:**
- show or describe anything sexual. The feed is **cut at the door**, as on Celebrity, and nothing behind it is
  shown, then or later;
- let Evelynn pressure Delphine. **There is no option to lean on her.** Evelynn can run the logistics or refuse
  them; she never coerces anyone. The route rule holds;
- make the comply path a reward, or treat it as sexy;
- punish refusal with anything sexual.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** the view from the monitor room, and the counter-operations run under Celeste's nose.
- **The erotic charge is absent on purpose.** This is the one Predator chapter where the charge is the cost, not the
  pleasure (CONTENT_DIRECTION §4: "the coerced ones should feel like a cost"). A chosen evening afterwards is
  optional and is not tied to the placement.
- **Fun:** in the counter paths, she beats Meridian at its own game with its own equipment.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want`, `pred.clause.*` | Ch7 | The **exit** clause's ninety days' pay can buy Delphine's way out (counter) |
| `pred.lever8.*`, `pred.hollis`, `pred.lsf` | Ch8 | What she holds. Hollis owned, or Varga spared (Legal on her side), opens a counter |
| `pred.julian`, `pred.julian8` | Ch7–8 | Julian as the one person who will tell her no |
| `c6.maya` | Ch6 | Maya, if she is back, is the voice she does not call |
| `case.name`, `case.strength` | Ch9 (shared bridge) | Celeste is already known as the board member on this road |

---

## 3. Shape (phases)

`brief → delphine → answer → thursday → after → morning → complete`

| Phase | Place | Beat |
|---|---|---|
| **brief** | 11:00 · the Vesper, reading room | Celeste, the catalogue, a new page, and "I thought the new one might like to learn how it is done." The file: Owen Marsh, Halvorsen, 1109, Thursday. |
| **delphine** | afternoon · a flat Meridian keeps | Delphine: 29, very good at this, very tired. Evelynn can ask her name, ask whether she wants to do it, or keep it professional. Delphine tells the truth about being placed ("They have my mother's house"). |
| **answer** | Wednesday, midnight · the black phone | Comply / refuse / counter (§4). |
| **thursday** | the Claremont: the monitor room behind 1109's mirror, or not | Comply: the operator's view of the bar, the lift and the corridor; the feed goes to black at the door, by her own hand or Celeste's rule. Refuse: another operator runs it, and Evelynn is not told how it went. Counter: the operation she runs instead. |
| **after** | 2 a.m. | What she carries. |
| **morning** | Friday | Celeste's word. What Marcus heard. What Marsh knows. |
| **complete** | — | The ledger: a card for DELPHINE (ANA), and what it says under her name. |

---

## 4. The answer (with recommendations)

**comply: run it by the book.** Evelynn books the suite, times the bar and the lift, briefs Delphine on Marsh
(his daughter, his one whisky), and sits in the monitor room.
- She never pressures Delphine. The brief is logistics, and Delphine does the rest under Meridian's leverage, not
  Evelynn's.
- The feed goes to black at the door. There is **no option to keep watching**.
- **Cost:**
  - Marsh is compromised, and his inquiry is dropped by Monday.
  - Evelynn's standing with Celeste rises.
  - Delphine's face will be at the Vesper later (a callback in the shared chapters).
  - Her ledger gets a card she cannot take down.

**refuse.**
- Celeste: "Pity. I did so hope."
- **Cost:** Evelynn's position, not a person.
  - Marcus loses the fund's next deal, and knows why.
  - The board's audit committee receives her calendar after all.
  - Another operator runs the placement anyway. She learns the result from Marsh's resignation in the paper, or
    not at all.

  The threat is to her standing and non-sexual.

**counter** (needs one of: Hollis owned; Varga spared; the archive copy; or the exit clause). She picks one:
- **counter-turn:** she tells Marsh the truth at the bar, and together they stage nothing. Marsh leaves at
  eleven; Delphine sleeps in the suite alone. The monitor feed shows an empty room all night, and Meridian's camera
  records nothing it can use. Marsh becomes an ally.
- **counter-free:** she gives Delphine a way out: a train at 21:40, the ninety days' pay from her own exit clause
  (or cash), and a name at a coast town nobody can place. Delphine never arrives at the Claremont. Meridian loses an
  asset and suspects Evelynn without proof.

Both counters make Celeste afraid for the second time on this road, and both **cost Evelynn** something she built:
the clause money, or the lever she spent.

---

## 5. Decisions for the owner (recommendation first)

1. **Celeste asks, in the Vesper reading room,** with the Iris line. *Recommended.*
2. **The placed woman is "Delphine" (Ana), 29,** a Meridian legend leveraged the way Evelynn was, who tells the
   truth if asked. *Recommended.*
3. **Comply = run it by the book, with no pressure option and the feed cut at the door;** nothing sexual shown or
   described, then or later. The cost lands on Evelynn. *Recommended.* It keeps the route rule ("she never sexually
   coerces anyone") and the owner's approved "run a placement". **This is the chapter to read closely.**
4. **Refuse costs her standing,** not a person, and non-sexually. *Recommended.*
5. **Counter: turn Marsh, or free Delphine,** each spending something she built. *Recommended.*
6. **Content notice and the "fade coercion scenes" setting** apply, as on Celebrity Ch13 (the comply lead-in can
   be faded). *Recommended.*
7. **Temporary entry.** Until the Predator variants of Chapters 10–12 exist, Chapter 13 is entered from a Predator
   `chapter9.complete`, with a short bridge ("The winter"). It is removed when Chapter 12 (Geneva) lands.
   *Recommended*, so the unique spine (13–14) can be built and played now, in the approved order.
8. **Build shape:** three goldens (comply, refuse, counter-free), neutral picks, and a real-save authentication
   test. *Recommended.*
