# Predator · Chapter 8: "The Floor" (design)

**Act II · Predator route (lane id `predator`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4–4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §5, "Ch8 · The Floor": three weeks inside Helix, a hub of
  levers, each with a price and a person on the other end. Mr Pryce drives Marcus. The first Meridian name appears in
  a Helix wire.
- [PREDATOR_CHAPTER_7_THE_OFFER_DESIGN.md](PREDATOR_CHAPTER_7_THE_OFFER_DESIGN.md) (built).
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) and [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §8.

**Canon it stands on:**
- Benton was Marcus's source inside Axiom: the wafer at the Glass House.
- Celeste finances Marcus's acquisitions (mission.ts).
- L.S.F. is the Laurent Sovereign Fund.

**Status: APPROVED (owner, 2026-09-27: all seven decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_8_SCRIPT.md](scripts/PREDATOR_CHAPTER_8_SCRIPT.md); code: `src/content/chapter8-predator.ts`.
It ran ~1.2–1.8k words on one path at pass 1, deepened 2026-09-27 to ~1.3–2.2k. The original plan follows: It would be gated like the other unreleased chapters and
entered from a Predator `chapter7.complete`. Chapter 8 then hands on to the shared Chapter 9 bridge in place of the
placeholder jump.

---

## 1. The chapter's job

Chapter 7 gave her a desk, a salary, three clauses and a crime in a folder. Chapter 8 is **three weeks of learning
who owes whom**, played as the route's first hub. It is the Predator mirror of the Celebrity Ch9 case hub: there she
assembles a case; here she assembles a **ledger**.

By the end of the chapter the player must:

1. **Work the floor:** pull **two of four levers** before somebody notices she is pulling them. Each lever is a scene
   with a person on the other end, and a choice of **use / hold / spare**.
2. **Feel the price of each lever:** a real person pays when she uses one. The game shows it without a lecture, and
   always lets her spare them.
3. **Survive Marcus's first-week test being turned round:** Friday drinks, where he asks what she has found. Tell,
   lie, or trade.
4. **Settle Julian:** her Ch7 corridor answer (ally / rival / casualty) comes due.
5. **Find the first Meridian name:** a wire, if she pulled the right lever, or a card on the ledger she cannot yet
   read. **L.S.F.**, the fund that finances Marcus's deals, is the thread to Chapter 9.

**What it must not do:**
- make a lever sexual. The general counsel's secret is an affair; using it is blackmail, non-sexual and on screen,
  and the game lets her refuse to touch it;
- make any victim deserve it;
- reveal Celeste or Meridian's purpose. Only a fund's name, and a first sense of its size.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** the hub's clock. Every lever she pulls makes the floor a little quieter around her.
- **Erotic:** Marcus's Friday drinks, where two predators compare notes and the air changes; and an optional chosen
  evening (heat 3, consent-gated, fades).
- **Fun:** she is extremely good at this, and the ledger fills up in her own hand.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want` (money / title / desk) | Ch7 | What Marcus dangles at Friday drinks; what she is climbing toward |
| `pred.clause.*` | Ch7 | **access** opens the archive lever free; **report** keeps the board from noticing one lever; **indemnity** covers one use; **exit** is a safety valve at Friday drinks; **private** stops Marcus using her face in the press lever |
| `pred.julian` (ally / rival / casualty) | Ch7 | Julian helps with a lever, blocks one, or is on the other side of one |
| `pred.lever` (read / copy / return), `pred.hollis` (charmed / warned / unaware) | Ch7 | Hollis's lever starts warm, hot, or cold |
| `c5.published`, `own.cash` | Ch5, Ch7 | The press lever; what money means now |
| Benton at the Glass House (`mission.*`), `c3.memo` | Ch2b–3 | The archive lever finds the man who carried the wafer |

---

## 3. Shape (phases)

`weeks → hub (two of four levers) → friday → julian → evening → complete`

| Phase | Place | Beat |
|---|---|---|
| **weeks** | the first ten days | Montage as scene: the 7:40 lift with the same six people, learning names, whose calls go unanswered, which assistant knows everything. Pryce drives Marcus and nods to her in the garage. The first sense that the floor is watching her back. |
| **hub** | Helix, days 10–18 | The four levers (§4). She can pull two, and then somebody notices. Each opens a scene with its own use / hold / spare choice. |
| **friday** | Friday 19:00 · Marcus's bar, the top of the building | Friday drinks: Marcus, whisky, the city, and "So. What have you found?" |
| **julian** | the following Monday | Julian, by his Ch7 stance. |
| **evening** | night | Optional: Marcus, Julian (if not casualty), or nobody. Heat 3, consent flow, fades. |
| **complete** | late | The ledger, fuller. One card she cannot read yet: **L.S.F.** |

---

## 4. The four levers (the hub)

Each lever is a scene with a person, a secret, and a choice. **Use** puts it to work: a real gain, and a real person
pays. **Hold** keeps it on the ledger, unspent. **Spare** gives it back or buries it: no gain, no victim, and someone
may remember the kindness.

| Lever | Person | What she finds | Use (gain / who pays) | Notes |
|---|---|---|---|---|
| **Hollis's ink** | Anthony Hollis, Commercial | Why he countersigned Novagen early: he was promised a seat on the buyer's board. The promise was made by Marcus, on a Laurent fund letterhead. | Hollis becomes hers: his vote, his files. His marriage and his pension are what he fears losing. | Warm if charmed, hot if warned, cold if unaware |
| **The counsel** | Ines Varga, general counsel | An affair with the CFO, known to three people and now four | Legal's cooperation on anything. Varga's family would pay. | **Spare is written as the strong choice**: she tells Varga she knows, and that she will never use it. Varga's gratitude outlasts any threat. |
| **The archive** | Benton, from the inside | The Novagen file re-read with the **access** clause: a Helix "consulting" line paid to a company registered to Elias Benton's brother-in-law, monthly, for the eleven months before the Glass House | Benton, owned, and Axiom's director with him. Benton pays; so does his brother-in-law, who knew nothing. | Free with the access clause; otherwise it costs the second lever |
| **The press** | the Helix comms director | Marcus is planning to use her Aster face as "the new Helix" in the annual report | Refuse and trade it, or let it run on her terms. Only with `c5.published`. | The **private** clause makes it hers outright |

**The wire.** The archive lever (and Hollis's, if used) turns up the same payment trail: Helix acquisitions financed
through **L.S.F. Advisory**, a vehicle of the Laurent Sovereign Fund. If she pulls neither, the name still reaches
her at Friday drinks, from Marcus, as a boast. This is the first Meridian name. It is **not** yet connected to
Celeste on this road.

**The clock.** After the second lever someone notices. The effect depends on her clauses:
- with the **report** clause, only Marcus;
- otherwise, the board's audit committee asks for her calendar.

---

## 5. The choices beyond the hub (with recommendations)

**Friday drinks.** "So. What have you found?" (`p8.friday`)
- **friday-tell**: the truth about what she found, and what she kept. He is delighted, and dangerous. Standing with
  him goes up, and he holds a copy.
- **friday-lie**: nothing much yet. He knows she is lying and respects it. Standing stays the same, and she keeps
  everything.
- **friday-trade**: one lever for one of his. He gives her the name of the fund, **L.S.F.**, with its size. The
  most fun.
- **friday-walk** (only with the **exit** clause): she reminds him she can leave with ninety days' pay whenever she
  likes. It is a power play, and it lands.

**Julian** (`p8.julian`), by his Ch7 stance:
- **ally**: he brings her the one thing on the floor she could not reach: the CFO's calendar, or Legal's file.
- **rival**: he warns Varga or Hollis before her, and one lever closes.
- **casualty**: she finds a lever with his name on it: a small Helix favour he did for her in Ch4–6, which Marcus
  would call a breach. **Use / hold / spare.**

**Evening** (consent flow as in Ch7):
- **Marcus** again;
- **Julian**, unless casualty and used;
- **nobody**: the ledger at the kitchen table.

---

## 6. Decisions for the owner (recommendation first)

1. **The hub: two of four levers, each use / hold / spare.** *Recommended.* It mirrors the Celebrity Ch9 hub and
   makes the cost of each lever a choice.
2. **The counsel's lever is an affair, and sparing it is written as the stronger move.** *Recommended.* Using it is
   non-sexual blackmail on screen and hurts innocent people, which is the route's moral weight.
3. **Benton was paid through a Helix consulting line to his brother-in-law's company.** *Recommended:* it closes the
   Glass House question from the inside.
4. **The first Meridian name is L.S.F. Advisory (the Laurent Sovereign Fund).** It reaches every path: from the
   wire, or from Marcus at Friday drinks. *Recommended:* it is the thread to the shared Chapter 9.
5. **The Ch7 clauses pay off here:** access (the archive free), report (the clock), indemnity (one use without a
   victim's comeback), exit (the Friday walk), private (the press lever). *Recommended.*
6. **Julian's Ch7 stance comes due** (ally helps / rival blocks / casualty becomes a lever). *Recommended.*
7. **Build shape:** three goldens.
   - **quiet**: two holds, friday-lie, julian, alone;
   - **ruthless**: two uses, friday-tell, Marcus;
   - **clean**: two spares, friday-trade.

   Neutral picks for migration. *Recommended.*
