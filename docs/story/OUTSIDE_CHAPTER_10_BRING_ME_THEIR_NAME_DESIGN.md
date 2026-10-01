# Outside · Chapter 10: "Bring Me Their Name" (design)

**Act III · Outside route (lane id `outside`) · the shared "She Knows" breakfast spine, with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4, "10 · She Knows": Celeste's breakfast knows somebody is feeding
  her: "Someone is sending you pages, darling. Bring me their name." The first order: **give up the source.**
- §2 rules: his price is always information; the skeptic is never punished; cutting the source is always open; he never
  makes her Nell; Sloane is a target or a trade.
- [CHAPTER_10_SHE_KNOWS_DESIGN.md](CHAPTER_10_SHE_KNOWS_DESIGN.md), the shared canon: the Lindqvist; Celeste's warm
  inventory; "Adrian" (she knows the man under the face); the public claim in the papers; the black phone with one contact,
  *C.*; the Vesper invitation that opens Chapter 11.
- [INSTITUTIONAL_CHAPTER_10_A_VERY_GOOD_OFFICER_DESIGN.md](INSTITUTIONAL_CHAPTER_10_A_VERY_GOOD_OFFICER_DESIGN.md), the
  lane-variant pattern (give / doctor / refuse; the refusal cost falls on the person she is protecting, and Adrian's name
  is kept for Ch14).

**Continuity it must honour:**
- **Ch7:** the room above the shut chandler's shop by the ferry terminal, paid in cash by the sender; the cheap phone's one
  contact; her rules of trade (`out.rules`), especially **the source** ("I never give up who you are. To anyone. For
  anything."), which this chapter tests.
- **Ch8:** the sender in person at the terminal (unnamed); the plant; MERIDIAN as the vendor.
- **Ch14** (built, reading defaults until now): Rafe's reckoning gains a callback to what she did at this breakfast; his
  name is Ch14's, so it must not be given here; Nell is not named here.

**Status: APPROVED (owner, 2026-10-01: "do your recommendation", all eight decisions as recommended) and BUILT, pass 1.**
Script: [scripts/OUTSIDE_CHAPTER_10_SCRIPT.md](scripts/OUTSIDE_CHAPTER_10_SCRIPT.md); code:
`src/content/chapter10-outside.ts`. Entered from an Outside `chapter9.complete`; hands on to the Ch14 interim bridge. ~1.34–1.45k
words on one path.

---

## 1. The chapter's job

On the Institutional road Celeste's breakfast is kind about Victoria Sloane. On this road it is **kind about a lonely man**,
which is the threat. She has found the room that was supposed to be nobody's, and she does not have his name, which is
the whole point of the meal.

By the end of the chapter the player must:

1. **Be summoned** by a black Vesper box on the third step of the iron stair, where the key once waited: *Breakfast?
   Wednesday. The Lindqvist, seven. — C.* **go** / **ring the sender first** ("Don't tell me what she says. Tell me what she
   doesn't.") / **don't go** (Celeste comes to the foot of the stair with pastries).
2. **Hear the inventory, Outside edition:** Evelynn left Axiom with a holdall; the chandler's by the dead ferry; the
   envelope of cash, three months paid by a man nobody has seen; one of her rules quoted word for word. Never his name.
   Then **"Adrian."** She dresses for it (a coat bought with his envelope, what she came out of Axiom in, or black).
3. **Hear the order:** "Somebody has been sending you pages, darling. Bring me his name. Failing that, a place and an
   hour, on this, on Fridays." The black phone, one contact, *C.*
4. **Answer it:** **give** (the hour and the place, 02:40, the old ferry terminal) / **doctor** (Pier Nine, ten past
   three, wrong on purpose) / **refuse** ("I don't give people"; the cost falls on the source, not her body: the 02:40
   phone goes silent for a week).
5. **Be claimed in public** by noon (page seven), and hear the **sender ring at an hour he never rings**:
   **old** ("She knew the woman I'm wearing.") / **work** ("A business breakfast.") / **report** (tell him what she asked:
   this road's honest answer).
6. **Watch the week play out:** the empty terminal; Meridian's man on the wrong pier; or a week of silence. Then the
   **Vesper invitation**, on a number only the sender had: *do bring your source. I should so like to meet him.*
7. **Choose the night:** a partner from before (heat 3, the consent flow, fades), Maya, or alone.
8. **Pin the card:** CELESTE LAURENT, GIVEN / DOCTORED / REFUSED.

**What it must not do:** name the sender or Nell; spend Adrian's name (Ch14); make Celeste afraid (Ch14); let any order or
cost touch anybody's body; punish the skeptic.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a rule she wrote at the table, alone, quoted back to her over eggs; a man on a dead pier in the rain.
- **Erotic:** Celeste's appraisal across the silver domes, and the returned look; a chosen night.
- **Fun:** Meridian's man standing for three hours on the wrong pier with a flask, holding the last of the tea.

---

## 2. Shape (phases)

`slip → cafe → source → press → weeks → hours → complete`

The names avoid the shared Ch10 phases (`breakfast / claimed / wall / order / answer / invitation`), Predator's (`ask /
table / offer / floor / evening / ledger`), Executive's (`orchid / lindqvist / calendar / paper / week / night`) and
Institutional's (`card / club / log / pages / fridays / nightfall`).

## 3. Keys

`out.give10` (gave / doctored / refused), `out.celeste10` (trusted / fooled / refused), `out.card10` (go / sender / door),
`out.pages10` (old / work / report), `out.told10` (yes, on report), `c10.o-*`; facts `c10.o-order`, `c10.o-evening-consent`.

## 4. Decisions (all taken as recommended)

1. **Title "Bring Me Their Name";** Celeste is kind about a lonely man.
2. **The summons is a black Vesper box on the third step** where the key once was: go / ring the sender / don't go.
3. **The Outside inventory:** the holdall, the chandler's, the cash, one of her rules quoted; never his name. Then "Adrian".
4. **The order is his name, or a place and an hour,** weekly: give / doctor / refuse; the refusal cost is the source's.
5. **Doctoring is the counterplay:** Meridian's man waits on Pier Nine in the rain.
6. **The sender rings at noon** after the City pages: old / work / **report** (telling him is this road's honest answer).
7. **The Vesper invitation arrives on the sender's own number** ("do bring your source"); the night is a partner from
   before, Maya, or alone (heat 3, consent-gated, fades).
8. **Build shape:** entered from an Outside `chapter9.complete`; the Ch14 interim bridge moves to Ch10's end ("Chapters
   11–13 in development"), and steps aside from Ch9 when Ch10 is playable; Ch14's reckoning calls back to the breakfast;
   goldens (give, doctor, refuse) and a real-save authentication test.

## 5. Art impact

Reuses the Lindqvist (Celebrity Ch10) and the room over the water. New inserts: the black Vesper box on the iron stair; the
City-pages photograph; the dead pier in the rain. These go on the consolidated art list after the deepening passes.
