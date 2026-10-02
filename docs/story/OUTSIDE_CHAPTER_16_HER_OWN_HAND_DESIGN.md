# Outside · Chapter 16: "Her Own Hand" (design)

**Act IV · Outside route (lane id `outside`) · the shared approach ("The Approach"), with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4 ("16–18, the board; the Outside positions") and §5 (the endings): expose with
  provenance owned / trade quietly / cut the source / Nell's name; **Rafe is in the room, or at the door, when Celeste says it.**
- §2 rules: the sender is named; **how Nell died stays for Ch17**; Rafe never makes her Nell; the skeptic is never punished; cutting
  the source is always open.
- [CHAPTER_16_THE_APPROACH_DESIGN.md](CHAPTER_16_THE_APPROACH_DESIGN.md), the shared canon (the `act4.*` entry contract), and
  [INSTITUTIONAL_CHAPTER_16_REASONABLE_NOTICE_DESIGN.md](INSTITUTIONAL_CHAPTER_16_REASONABLE_NOTICE_DESIGN.md), the lane-variant pattern.

**Status: APPROVED (owner, 2026-10-01: "do it", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_16_SCRIPT.md](scripts/OUTSIDE_CHAPTER_16_SCRIPT.md); code: `src/content/chapter16-outside.ts`.

---

## 1. The chapter's job

The theme of the road is provenance, so the morning of the board is a ledger: every page she holds, where it came from, and a column
headed **CHECKED BY**. The question of the day is what she is willing to **sign**.

By the end of the chapter the player must:

1. **Read the case** as a ledger (`act4.case`, thin / supported / strong / overwhelming, with the reasons stated), and take one dawn
   moment: Rafe's message from the bench opposite / the black phone's 04:12 message from Celeste / Nell's photograph into her pocket /
   or the columns. Then **sign the ledger**.
2. **Choose the position** (`act4.aim`) with a one-line notice to the board (`act4.notice`): **expose, with provenance owned** (open
   only if she checked two pages herself or holds the drawer); **trade, quietly**; **cut the source**; **Nell's name**.
3. **Choose who comes:** two inside at most, one outside. **Rafe, unless she cut him, is on the list twice**: in the room
   (`act4.rafe = room`) or at the river door (`door`); otherwise `absent`. This is the key Ch17 reads for "Rafe is in the room, or at
   the door".
4. **Take Celeste's reply** ("So you have signed everything. How very like a bookkeeper, darling.") and **order the cards**: first on
   the table, and one held back (her signed ledger, the Jakarta order, the Rotterdam slip, the 1109 cards, page seven, LIM, R.).
5. **Dress** (her own black / Celeste's grey worn back at her / flat shoes and a plain coat), with **one pair of hands** (Rafe, Maya,
   Iris, or alone) and a last look at the wall (take LINDEN, E. / leave it / write SIGNED under it).
6. **Arrive** (the river door with Rafe, with Marsh's notice, the front door alone, or Celeste's car), and hear "They read it. Twice.
   Nobody's ever signed anything in this house before."
7. **Walk into the long room:** seven chairs, the board, Celeste standing, as herself.

**What it must not do:** tell how Nell died; make Rafe call her Nell; make Rafe's collar-scene a reward or a cure (it is a hand on a
collar, and a kiss only if the two of them chose a night in Ch14/15); punish cutting the source.

**Why it is thrilling, erotic and fun:** the thrill is a woman who has taken everything on trust deciding what she will put her name
to; the fun is Celeste's one non-threat ("how very like a bookkeeper"), Marsh chaining his bicycle to the Vesper's railings, Rafe at the
wall with nothing in his arms; the heat is a collar and, if chosen, one kiss (heat 1–2).

## 2. Shape (phases)

`sheet → stand → retinue → spread → coat → steps → complete`

The names avoid the shared Ch16 phases (`dawn / aim / crew / table / dress / arrive`), Predator's (`floor / want / beside / order /
armour / door / room`), Executive's (`layout / purpose / company / sequence / clasp / embankment`) and Institutional's (`briefing /
objective / detail / bundle / uniform / notice`).

## 3. Keys

Written (the shared contract): `act4.case`, `act4.aim` (expose | trade | cut | nell), `act4.notice`, `act4.inside`, `act4.inside-done`,
`act4.outside`, `act4.first`, `act4.held`, `act4.wear`, `act4.dressed-with`, `act4.arrive` (river | notice | front | car),
`act4.benton = absent`; Outside: **`act4.rafe` = room | door | absent**; `c16.o-dawn`, `c16.o-reply`, `c16.o-leave`; fact `c16.o-approach`.
Read: `out.verified`, `out.linden15`, `out.slip15`, `out.took15`, `out.cost15` (+ `c15.cost-who`), `out.ledger13`, `out.told`, `out.way14`,
`act3.sloane`, `act3.ally.*`, `act3.black-phone`, `act3.leash`.

## 4. Decisions (all taken as recommended)

1. **Title "Her Own Hand":** the road's theme is provenance; the ledger's column is what she will sign.
2. **The case is a ledger** with a CHECKED BY column; pages she verified herself count for most.
3. **Expose is gated on being able to sign it** (two pages checked herself, or the drawer); a closed aim says why.
4. **Rafe chooses where he stands** (room / door), as the Outside road's version of "who comes"; never forced; cut means absent.
5. **Celeste's reply to the notice is "How very like a bookkeeper"**, a non-threat that tells her she was read.
6. **Armour includes the plain coat and flat shoes,** a way to walk in as the woman in the photograph.
7. **Arrival through the river door** is the Outside signature, with Rafe; always alternatives.
8. **Build shape:** entered from an Outside `chapter15.complete`; Ch15's stop line removed; goldens on the real Outside golden played
   through Ch10–15; the old "[Chapters 17–18 in development]" stop line follows until Ch17 is built.

## 4a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no `act4.*` key changes):

| Moment | Where | Choices (`c16.o-…`) |
|---|---|---|
| **The pages taken on trust** | before the ledger is signed (`sheet`) | **o16-trust-sign** (her name to them all the same) · **-apart** (a black clip at the back) · **-count** (the number in the margin, in pencil) |
| **The notice leaves** | before the retinue (`retinue`) | **o16-hand-girl** (a girl on a moped; a grey docket to sign, top copy kept, under C.) · **-rafe** (he carries it; not offered if cut; "I've never rung the front bell") · **-self** ("For Mrs Laurent. From the product.") |
| **The last minute** | before the way in (`steps`) | **o16-last-tide** (the same tide as the terminal) · **-windows** (eleven lit, fifteen reflection) · **-pockets** (the small inventory) |

The docket (girl) and Rafe's bell echo Ch18's SIGNED FOR BY; the trust moment continues the Ch8 exercise book. No golden recapture is needed.

## 5. Art impact

Reuses the room over the water, the Embankment and the Vesper's front (shared set). New: the ledger laid out on the floor with its
CHECKED BY column; Rafe on the bench opposite; the evening florists' van at the river door. These go on the consolidated art list
after the deepening passes.
