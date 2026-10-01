# Outside · Chapter 11: "Unclaimed" (design)

**Act III · Outside route (lane id `outside`) · the shared "The Asset" Vesper spine, with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4, "11 · The Asset": the catalogue (canon). Rafe's price: a
  photograph of one page he has never seen, **E.V. (I)**, the first Evelyn's, marked RETIRED. Celeste's second order: pass
  the sender a page she has written herself.
- §2 rules: his price is always information; the skeptic is never punished; he never makes her Nell; the sender's name and
  Nell's are not given before Ch14; Sloane is a target or a trade.
- [CHAPTER_11_THE_ASSET_DESIGN.md](CHAPTER_11_THE_ASSET_DESIGN.md), the shared canon: the Vesper's first Thursday, the empty
  frames lit as if full; Iris Moreau, a working legend whose page says *ending*; *The Autumn Collection* on its lectern and
  her own page, **available for placement from the first Thursday of next month** (Ch13's placement, set on every road and
  never moved as a punishment); nothing sexual on screen that isn't chosen.
- [INSTITUTIONAL_CHAPTER_11_THE_RECEIPT_DESIGN.md](INSTITUTIONAL_CHAPTER_11_THE_RECEIPT_DESIGN.md) and
  [EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md](EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md), the lane-variant pattern.

**Continuity it must honour:** Ch10's order and her answer (`out.give10`), and the invitation "do bring your source"; Ch7's
rules (`out.rules`); Ch8's retired page in the leads hub (a trace of the first Evelyn, never a photograph); Ch14 (built):
Rafe's reckoning gains callbacks to the face and the page.

**Status: APPROVED (owner, 2026-10-01: "yes", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_11_SCRIPT.md](scripts/OUTSIDE_CHAPTER_11_SCRIPT.md); code: `src/content/chapter11-outside.ts`. Entered from
an Outside `chapter10.complete`; hands on to the Ch14 bridge. ~1.52–1.88k words on one path.

---

## 1. The chapter's job

On the Institutional road the Vesper is the night Axiom walks into the shop it has bought from. On this road it is the night
**a woman nobody has claimed walks into the shop that made her, to look at a page for a man who has never seen the woman
on it.** Her own page reads UNCLAIMED, which is the one thing Celeste cannot price.

By the end of the chapter the player must:

1. **Hear his price** on the 02:40 phone the night before: what a courier knows of the Vesper's layout (the river-side
   service door, the kitchen stair, the panelled door, the lectern) for a photograph of the first Evelyn's page, because she
   never allowed a photograph of herself. **photograph it** / **learn it by heart** / **refuse** (she goes in blind).
2. **Arrive alone** ("I did say bring your source"), hear Celeste's version of what she did last month, and meet **Iris**,
   ending: **warn** / **open** ("I'm off the books") / **quiet**.
3. **Find the book:** her own page, E. V. (II) · REISSUED · UNCLAIMED · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF
   NEXT MONTH; Iris's page; and, one leaf back, **E. V. (I) · FOUR YEARS · RETIRED · SINGAPORE**, a face that could have been
   hers. **photograph the page** / **learn it by heart** / **turn the page**.
4. **Receive the second order on the landing:** a cream envelope, a page in Celeste's own hand for the sender.
   **take it unopened** / **open it first** ("You were never going to be on the ferry. I'm sorry about that. — C.") /
   **burn it** (refusal costs the source, never her body).
5. **Make the 02:40 call** on a bench on the Embankment: **everything** / **the face only** / **nothing yet**.
6. **Choose the night:** a partner from before (heat 3, consent flow, fades), Maya, or alone.
7. **Pin the card:** THE VESPER. UNCLAIMED. AVAILABLE FROM THE FIRST THURSDAY.

**What it must not do:** give his name or Nell's; show Nell's death; move the placement date as a punishment; make Celeste
afraid (Ch14); make any cost sexual; punish the skeptic.

**Why it is thrilling, erotic and fun:** the thrill is a hidden phone in a shoe in a house that bags phones, and a face on a
lectern; the erotic charge is Celeste's appraisal and a night she chooses; the fun is a woman with no client in a room full
of buyers, and Iris.

## 2. Shape (phases)

`layout → lobby → shelf → stairs → river → dawn → complete`

The names avoid the shared Ch11 phases (`arrival / viewing / upstairs / order / ending / after`), Predator's (`dress /
longroom / book / powder / terrace / cloak / late / ledger`), Executive's (`frames / pages / pen / signing / drive`) and
Institutional's (`threshold / catalogue / receipt / countersign / ride`).

## 3. Keys

`out.price11` (photo / heart / refuse), `out.layout11`, `out.iris11` (warned / open / quiet), `out.photo11` (photo / heart /
turned), `out.slip11` (passed / read / burned), `out.told11`, `c11.o-*`; facts `c11.o-price`, `c11.o-slip`, `c11.o-face`,
`c11.o-evening-consent`.

## 4. Decisions (all taken as recommended)

1. **Title "Unclaimed";** her page has no client, and that is the one thing Celeste cannot price.
2. **His price is a photograph** of the first Evelyn's page, for the Vesper's layout; she may photograph, learn it by heart,
   or refuse, and refusing costs only the layout.
3. **She arrives alone** ("bring your source"), and Celeste's greeting reads what she did in Ch10.
4. **The catalogue:** her page reads UNCLAIMED; the first Evelyn's page is a face, FOUR YEARS · RETIRED · SINGAPORE, with
   no cause and no name.
5. **Celeste's second order is a page for the sender,** with a hook in it (the ferry line, which pays off in Ch14);
   pass / read / burn; the cost of burning falls on the source.
6. **The 02:40 call after:** everything / the face only / nothing yet.
7. **The night:** a partner from before, Maya, or alone (heat 3, consent-gated, fades).
8. **Build shape:** entered from an Outside `chapter10.complete`; the Ch14 interim bridge moves to Ch11's end; Ch14's
   reckoning gains callbacks to the face and the page; goldens (photograph + pass + all; heart + read + all; refuse + turn
   + burn + nothing) and a real-save authentication test.

## 5. Art impact

Reuses the Vesper's long room, reading room and landing (Celebrity Ch11) and the room over the water. New inserts: the first
Evelyn's catalogue page (the face, a woman looking straight into the lens); the cream envelope with one line of green ink;
a cheap phone in a shoe. These go on the consolidated art list after the deepening passes.
