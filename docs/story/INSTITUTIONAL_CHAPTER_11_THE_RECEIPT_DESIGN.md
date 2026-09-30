# Institutional · Chapter 11: "The Receipt" (design)

**Act III · Institutional route (lane id `institutional`) · the shared "The Asset" Vesper spine, with Institutional
framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md) §4, "11 · The Asset": she is on the catalogue (canon),
  and Sloane is in the room for Axiom, the client, watching her shown. The second order: have Sloane countersign the
  next legend's receipt, tonight.
- [CHAPTER_11_THE_ASSET_DESIGN.md](CHAPTER_11_THE_ASSET_DESIGN.md), the shared canon: the Vesper's first Thursday, the
  empty frames lit as if full; the clients talking of placement and availability; Iris Moreau, Halvorsen's chief of
  staff, a working legend whose page says *ending*; *The Autumn Collection* on its lectern, and her own page:
  **available for placement from the first Thursday of next month** (Ch13's placement, set on every road and never moved
  as a punishment); nothing sexual on screen that isn't chosen.
- [EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md](EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md), the lane-variant pattern:
  the order is a signature, delivered by the one person the signer trusts (sign / warn / refuse), and the refusal cost
  falls on the person she protects.

**Continuity it must honour:**
- **Ch10:** the order and the answer (`inst.log10`); Sloane told or not (`inst.told10`); the Vesper invitation "do bring
  your operative"; the dress at breakfast (`c10.i-dress`).
- **Ch8:** Records, and what she kept (`inst.file`); Benton as Meridian's man (Ch14 canon).
- **Ch14** (built): the inquiry. A refusal here plants its seed (Celeste's letter to Axiom's board); a countersignature
  here is one more thing Sloane will confess.

**Status: APPROVED (owner, 2026-09-30: "do your recommendations for chapter 11", all eight decisions as recommended)
and BUILT, pass 1.** Script: [scripts/INSTITUTIONAL_CHAPTER_11_SCRIPT.md](scripts/INSTITUTIONAL_CHAPTER_11_SCRIPT.md);
code: `src/content/chapter11-institutional.ts`. Entered from an Institutional `chapter10.complete`; hands on to the Ch14
bridge; ~1.03–1.14k words on one path. Canon adopted: Axiom's next candidate is Priya (CANDIDATE 9C).

---

## 1. The chapter's job

On the Executive road the Vesper is the night Celeste asks for Julian's pen. On this road it is the night **Axiom, the
client, walks into the shop it has been buying from for three years**, and its officer of record sees the catalogue
with her own operative's page in it. And Celeste asks for Sloane's signature on the next receipt.

**The next product is Axiom's again:** CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE, and the photograph is **Priya**,
the analyst who got Adrian's promotion. The machine is already choosing the next one, from the same floor.

By the end of the chapter the player must:

1. **Arrive with Sloane,** in Axiom's car, Sloane in black for once ("Like an officer at a party. Don't."), and watch
   the clients discuss availability in front of the woman who pays for it.
2. **Meet Iris,** Halvorsen's chief of staff, four years in and *ending*, and decide what to tell her.
3. **Find her own page:** E.V. (II) · AXIOM · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY, and decide whether Sloane
   sees it. If she does: "Axiom didn't authorise that."
4. **Receive the order on the balcony:** a cream folder, the receipt for CANDIDATE 9C, and "Bring it to her. She signs
   what you bring her now. Everybody's noticed."
5. **Answer it:** **bring it** (Sloane countersigns, because Evelynn brought it) / **warn her** on the stairs ("Don't sign
   anything tonight.") / **refuse** Celeste (Benton brings the folder instead; Sloane won't sign it for him; the cost:
   Celeste's letter to Axiom's board about irregularities in Executive Intelligence, which is where Ch14's inquiry
   begins).
6. **Ride home in Axiom's car:** "I have bought from that house for three years and never been inside it." And the
   Singapore tasking, which opens Ch12: the first Evelyn's city, backup Sloane.
7. **Choose the night:** Daniel, Maya, a partner from before, or alone.
8. **Pin the card:** THE VESPER. AVAILABLE FROM THE FIRST THURSDAY. And under it: 9C · PRIYA, and SIGNED / NOT TONIGHT /
   REFUSED.

**What it must not do:** make Sloane a buyer who knew (she didn't, until tonight), or a romance; make any cost sexual; move
the placement date; make Celeste afraid (Ch14).

**Why it is thrilling, erotic and fun:** the thrill is a receipt for a person, in a folder, with a good pen, in a gallery
full of people who bought people; the erotic charge is a room built for looking, where Evelynn chooses who sees her, and
Sloane in black at her side; the fun is Iris, and two women from Axiom's own floor finding each other in Celeste's
powder room.

---

## 2. Shape (phases)

`threshold → catalogue → receipt → countersign → ride → complete`

The names avoid the shared Ch11 phases (`arrival / viewing / upstairs / order / ending / after`), Predator's (`dress /
longroom / book / powder / terrace / cloak / late / ledger`) and Executive's (`frames / pages / pen / signing / drive`).

## 3. Keys

`inst.pen11` (signed / warned / refused), `inst.iris11` (warned / told / quiet), `inst.book11` (seen / closed /
turned), `inst.room11` (beside / work / watch), `inst.ride11`, `c11.i-*`; facts `c11.i-9c`, `c11.i-evening-consent`.

## 4. Decisions (all taken as recommended)

1. **Title "The Receipt";** the Vesper as the shop Axiom has been buying from.
2. **Sloane in the room for Axiom,** in black for once; the clients discuss availability in front of her.
3. **Iris,** as canon: warn her / tell her "I'm an operative too" / say nothing.
4. **The book, and Sloane seeing Evelynn's page:** "Axiom didn't authorise that." (let her see / close it / turn the
   page).
5. **The next candidate is Priya,** from Adrian's own floor, the analyst who got his promotion: CANDIDATE 9C.
6. **The order:** bring Sloane the receipt / warn her / refuse (the cost is Celeste's letter to Axiom's board, seeding
   Ch14's inquiry). The placement date is never moved.
7. **The ride home, and Singapore as an Axiom tasking** with Sloane as backup; the night (Daniel if he knows, Maya, a
   partner from before, alone; heat 3, consent-gated, fades).
8. **Build shape:** entered from an Institutional `chapter10.complete`; the Ch14 interim bridge moves to Ch11's end
   ("Chapters 12–13 in development"); Ch14's confession remembers a countersignature; three goldens and an
   authentication test.

## 5. Art impact

Reuses the Vesper long room, the anteroom and the book (Celebrity Ch11). New: Sloane in black at the Vesper; the
receipt insert (CANDIDATE 9C, with Priya's photograph never shown clearly). These go on the consolidated art list after
the deepening passes.
