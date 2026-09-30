# Institutional · Chapter 10: "A Very Good Officer" (design)

**Act III · Institutional route (lane id `institutional`) · the shared "She Knows" breakfast spine, with Institutional
framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md) §4, "10 · She Knows": Celeste's breakfast knows about
  Sloane: "Victoria is a very good officer. She'll never survive us. Unless you help me." The first order: bring her
  Sloane's tasking log.
- §2 rules: Sloane is never a romance; monitoring is never sexualised; Daniel is never deceived into intimacy; orders
  are non-sexual.
- [CHAPTER_10_SHE_KNOWS_DESIGN.md](CHAPTER_10_SHE_KNOWS_DESIGN.md), the shared canon: the Lindqvist; Celeste's warm
  inventory; "Adrian" (she knows the man under the face); the public claim in the papers; the black phone with one
  contact, *C.*; the Vesper invitation that opens Chapter 11.
- [EXECUTIVE_CHAPTER_10_A_LOVELY_MAN_DESIGN.md](EXECUTIVE_CHAPTER_10_A_LOVELY_MAN_DESIGN.md), the lane-variant pattern
  (give / doctor / refuse; the refusal cost falls on the person she is protecting, and Adrian's name is kept for Ch14).

**Continuity it must honour:**
- **Ch8:** Benton's errand (`inst.task.benton`: refused / Sloane's doctored version / her own doctored copy), the seed
  of this order; the Records choice (`inst.file`): Celeste can know Evelynn went down to Records with Sloane outside
  (Benton is Meridian's man), but **not** that she kept a copy or the note; Daniel (`inst.daniel-told`).
- **Ch7:** her file number AX-7A; her scope terms; Benton at his door.
- **Ch14** (built, reading defaults until now): Celeste's "Poor Victoria" becomes a callback to this breakfast; Adrian's
  name is Ch14's price, so it must not be spent here.

**Status: APPROVED (owner, 2026-09-30: "ok do your recommendations", all eight decisions as recommended) and BUILT,
pass 1.** Script: [scripts/INSTITUTIONAL_CHAPTER_10_SCRIPT.md](scripts/INSTITUTIONAL_CHAPTER_10_SCRIPT.md); code:
`src/content/chapter10-institutional.ts`. Entered from an Institutional `chapter9.complete`; hands on to the Ch14 bridge;
~0.85–1.04k words on one path.

---

## 1. The chapter's job

On the Executive road Celeste's breakfast is a rescue offer for a man who doesn't know he's drowning. On this road it
is **an offer about a woman who knows exactly how deep the water is.** Celeste is kind about Victoria Sloane, which is
the threat.

By the end of the chapter the player must:

1. **Be summoned:** a grey Axiom envelope on her desk, AX-7A on the front in capitals so like Sloane's that it takes a
   second look. Inside: *Breakfast? Wednesday. The Lindqvist, seven. — C.* Celeste can reach into Axiom's internal
   post. **go** / **show Sloane first** ("That isn't my hand. It's very good.") / **don't go** (Celeste comes to the
   staff gate instead, and Terry rings up: "A lady for you, madam.").
2. **Hear the inventory, Institutional edition:** AX-7A ("They gave you his candidate number. How unkind."), one of
   her scope terms quoted exactly, Records with Victoria outside in the car (Benton told her), and Daniel ("the boy
   with the ties"). Never the copy or the note: those are Evelynn's secrets. Then **"Adrian."**
3. **Hear the line, and the order:** "Victoria is a very good officer. She'll never survive us. Unless you help me."
   The order is Sloane's tasking log, every Friday, on the black phone. If Benton brought Celeste a doctored log in Ch8,
   Celeste says so: "Elias brought me a very pretty log. It was wrong in eleven places. I'd like the real one."
4. **Answer it:** **give** / **doctor** (one false tasking in the copy) / **refuse** (the cost is Sloane's, and
   non-sexual: her directorate's budget line is cut by a client who suddenly has concerns, and Sloane has a very bad
   week without knowing why).
5. **Be claimed in public:** by noon the City pages have them laughing at the Lindqvist. **Sloane** holds the paper at
   Evelynn's desk: "You didn't tell me you knew Celeste Laurent." **old** / **work** / **report** (the institutional
   answer: tell her handler about the order).
6. **Watch the week play out:** the Friday photograph; Benton waiting at a hotel for a debrief that isn't happening;
   or Sloane grey at her desk. Then the **Vesper invitation, in Sloane's in-tray:** *Axiom. The first Thursday. — and
   do bring your operative. C.L.*
7. **Choose the night:** Daniel (as a colleague, or, if he knows, the consent flow at his place), Maya, a partner from
   before, or alone.
8. **Pin the card:** CELESTE LAURENT, and under it GIVEN / DOCTORED / REFUSED.

**What it must not do:** make Sloane a romance or Celeste's kindness a clue that Sloane is hers (she isn't); spend
Adrian's name (Ch14); make Celeste afraid (Ch14); let the order touch anyone's body.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** Celeste's envelope inside Axiom's own post, and the black phone buzzing on Friday in a building that
  logs everything.
- **Erotic:** Celeste's appraisal across the silver domes, and the returned look; a chosen night.
- **Fun:** Benton, Meridian's man, standing outside a hotel room at noon for a debrief that doesn't exist.

---

## 2. Shape (phases)

`card → club → log → pages → fridays → nightfall → complete`

The names avoid the shared Ch10 phases (`breakfast / claimed / wall / order / answer / invitation`), Predator's (`ask /
table / offer / floor / evening / ledger`) and Executive's (`orchid / lindqvist / calendar / paper / week / night`).

## 3. Keys

`inst.log10` (gave / doctored / refused), `inst.celeste10` (trusted / fooled / refused), `inst.pages10` (old / work /
report), `inst.told10` (yes, on report), `c10.i-*`; facts `c10.i-order`, `c10.i-evening-consent`.

## 4. Decisions (all taken as recommended)

1. **Title "A Very Good Officer";** Celeste is kind about Sloane.
2. **The summons is a grey Axiom envelope** in a hand like Sloane's: go / show Sloane / don't go (Celeste at the gate).
3. **The Institutional inventory:** AX-7A, a scope term, Records with Sloane outside (via Benton), Daniel; never the
   copy or the note. Then "Adrian".
4. **The order is Sloane's tasking log,** weekly: give / doctor / refuse; the refusal cost is Sloane's budget line.
5. **Doctoring is the counterplay:** Benton waits outside the wrong hotel room.
6. **Sloane with the City pages:** old / work / **report** (telling her handler is this road's honest answer).
7. **The Vesper invitation arrives in Sloane's in-tray** ("do bring your operative"); the night is Daniel, Maya, a
   partner from before, or alone (heat 3, consent-gated, fades).
8. **Build shape:** entered from an Institutional `chapter9.complete`; the Ch14 interim bridge moves to Ch10's end
   ("Chapters 11–13 in development"); Ch14's Celeste line calls back to the breakfast; three goldens (give, doctor,
   refuse) and a real-save authentication test.

## 5. Art impact

Reuses the Lindqvist (Celebrity Ch10), Strategic Intelligence and the black phone insert. New inserts: the forged grey
envelope; the City-pages photograph with new people in it. These go on the consolidated art list after the deepening
passes.
