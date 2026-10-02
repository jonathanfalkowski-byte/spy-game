# Outside · Chapter 14: "The Source" (design)

**Act III · Outside route (lane id `outside`) · NEW (unique)**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md), approved 2026-09-30:
  - §0: the sender is "R." on the ledger leaf, **Rafe Lim**, 41, Nell's Meridian courier and the man she was leaving
    with, who never learned how she died and chose Evelynn to find out; he is the sender until he gives her a name,
    and then he is **Rafe**;
  - §4 "14 · The Source": Rafe's turn; the provenance crisis (one of his pages was false, and he knew); he confesses
    (the Jakarta list, the ferry, the Saturday he was sent away, why he chose her); then Sloane, whose file he has had
    all along (**burn her** / **trade her** / **spare her**); and him (**keep him** bounded / **verify everything and
    cut him** / **trust him** once, with open eyes);
  - §2 rules: Rafe never makes her Nell; chosen intimacy with him opens only after he tells her who Nell was to him;
    his price is always information; the skeptic is never punished; cutting the source is always open; Sloane is a
    target or a trade, never a romance.
- [OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md](OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md) and
  [OUTSIDE_CHAPTER_8_PROVENANCE_DESIGN.md](OUTSIDE_CHAPTER_8_PROVENANCE_DESIGN.md) (built, pass 1).
- [INSTITUTIONAL_CHAPTER_14_OFFICER_OF_RECORD_DESIGN.md](INSTITUTIONAL_CHAPTER_14_OFFICER_OF_RECORD_DESIGN.md) and
  [EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md](EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md), the pattern: a unique
  Act III payoff built before its road's Ch10–13 variants, entered through an interim bridge from a `chapter9.complete`,
  with the source-figure's turn and three ways gated by what she built.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md): the prior Evelyn was **Eleanor "Nell" Linden**, burned in
  Jakarta because she wanted out, who ran the night she "disappeared before breakfast"; **how she died stays open
  until Act IV** (Ch17: Celeste's car, the harbour wall, the driver who did not stop). Rafe must not know the how —
  that is what he wants, and what Act IV gives him.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): heat 3, consent in character, fades; no sexual coercion.

**Canon it stands on (Outside Ch7–8):**
- Her rules of trade (`out.rules`: verify, provenance, the source, no people, the door), and his one matching rule.
- The first page and price (`out.page1`, `out.price1`, `out.gave-fact`, `out.alliance.rook`, `out.refused-price`).
- The leads hub (`out.lead.*`, `out.verified` / `out.raw` / `out.sold`, `out.trail`), **Sloane's file** (`out.file`:
  bank / burn / leave), the plant (`out.plant`: caught / bit), the vendor (`out.vendor = meridian`), and the terminal
  meeting (`out.met`: hand / dark / light).

**Status: APPROVED (owner, 2026-10-01: "do your recommendations", all eight decisions as recommended) and BUILT, pass 1.**
Script: [scripts/OUTSIDE_CHAPTER_14_SCRIPT.md](scripts/OUTSIDE_CHAPTER_14_SCRIPT.md); code:
`src/content/chapter14-outside.ts`. Entered through an interim bridge from an Outside `chapter9.complete` and ends at the
Chapters 15–18 in-development stop. ~1.56–1.78k words on one path.

---

## 1. The chapter's job

On the Institutional road, the machine turns on Sloane and her handler at once. On the Executive road, Julian's
signature comes due. On the Outside road, **the source turns out to be a person with a wound, and a lie.** For a year
Rafe has sent her true pages — and one that wasn't. Chapter 14 is where she catches it, where he stops being a voice
and becomes a man with a name and a grief, and where she decides what he is to her now, and what Victoria Sloane is
to the both of them. It is the route's payoff: **not authority, like the others, but the truth about the man who has
been handing her the truth.**

By the end of the chapter the player must:

1. **Find the seam** (§4): one page he sent was shaded, and he knew. On the Jakarta handoff copy he removed the
   courier's initial — his own, "R." — so that she would not connect him to it before he was ready. She catches it
   herself if she wrote the verify or provenance rule; he tells her first if she didn't. Either way, the trust cracks.
2. **Hear the reckoning** (§4): she summons him, on her terms this time, to the room over the water. He gives it all
   up: **his name, Rafe Lim**; the Jakarta list he carried without reading; the Sunday ferry to Batam they were to
   take together; the Saturday Meridian sent him abroad on a job he could not refuse; and why he chose Evelynn — the
   one person Meridian would let into the rooms he cannot enter. **He does not know how Nell died.** That is the thing
   he wants, and the thing he cannot get without her. **How she takes it:** let him finish / press him on the lie /
   stop him and check every word first.
3. **Decide what Sloane is** (§4), now that she holds, or Rafe holds, the file: **burn her** (just, or useful),
   **trade her** (to Axiom, for Rafe's safety), or **spare her**. Gated by `out.file`.
4. **Decide what Rafe is** (§4): **keep him** (bounded: every page with its provenance now, and she holds the Jakarta
   original over him), **cut him** (verify everything herself, keep only what she proved, walk away from the source),
   or **trust him** once, with open eyes.
5. **Choose the night** (§5): with Rafe, **only if she has heard his truth and not cut him** (heat 3, the consent
   flow, fades; he never makes her Nell); a partner from before; Maya; or alone.
6. **Pin the card:** THE SOURCE, his name or its absence, Sloane's fate, and the thread to Chapter 15: **the courier's
   door** (Rafe's, if kept or trusted) or **the stair** (alone, if cut), and **LINDEN, E.**

**What it must not do:**
- make Rafe a villain, or the lie a betrayal past forgiving: it is a frightened man protecting the one card he had;
- make her Nell, or let the night run through that confusion; if he says the wrong name, the scene stops, and it is
  his to repair;
- tell how Nell died (Act IV / Ch17); Rafe genuinely does not know;
- make Sloane's fate, or Rafe's price, sexual;
- punish cutting the source: it is the route's own ending, and it keeps the road solvable.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** catching your own source in a lie, and making him give you everything, at two in the morning, on
  your turf for once.
- **Erotic:** a year of a voice, made flesh and told true, and a night that is chosen, after, in a room nobody
  watches — or the charge of turning him down and keeping the barrier.
- **Fun:** turning provenance on the provenance-man; holding the Jakarta original over the man who taught you what an
  original is worth.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `out.rules` (verify / provenance / source / no people / door) | Ch7 | Whether she catches the seam herself (verify/provenance) or he confesses first; whether "the source" rule shapes how she keeps him |
| `out.file` (bank / burn / leave) | Ch8 | Whether she or Rafe holds Sloane's file; which Sloane options open (§4) |
| `out.met` (hand / dark / light) | Ch8 | How near they already are; the register of the reckoning |
| `out.verified` / `out.raw` / `out.sold`, `out.plant` (caught / bit) | Ch8 | How much she can stand behind; whether he trusts that she checks (the reason the plant mattered) |
| `out.vendor = meridian`, `out.trail` | Ch8 | The thread she carries into Ch15; whether a trail of sold pages follows her |
| `out.alliance.rook` (owed / creditor / square) | Ch7–8 | The ledger between them, called or cancelled in the reckoning |
| `c6.oracle-seen`, `c6.rook-proof` | Ch6 | What she already knew coming in; how hard the lie lands |
| the shared evening-partner check (Ch4–8 warmed or intimate outcomes) | Ch4–8 | The night options |

Ch10–13 Outside variants don't exist yet, so those keys are read at their defaults (the interim bridge; §6).

---

## 3. Shape (phases)

`seam → reckoning → verdict → source → water → complete`

The phase names avoid every existing Chapter 14 id (shared `door / order / maya / answer / sunday / after`; Executive
`called / silence / truth / ways / boardroom / night`; Institutional `notice / confession / wire / channels / hearing /
dusk`; and `dawn / case / safe / room / last / desk / evening / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **seam** | the room over the water · late | The Jakarta handoff copy on the wall, and the seam in it: the courier's initial, removed. She catches it (verify/provenance rule), or he rings to confess before she does. The crack. |
| **reckoning** | 02:40 · the room, on her terms | She summons him. He comes. His name, Rafe Lim; the list; the ferry; the Saturday; why he chose her; that he does not know how she died. **let him finish / press the lie / stop and verify.** |
| **verdict** | after · the wall | Sloane's file, hers or his. **burn** (just / useful) · **trade** (to Axiom, for Rafe's safety) · **spare** (§4). |
| **source** | the same night | What Rafe is now. **keep** (bounded) · **cut** (verify everything, walk) · **trust** (once, open eyes). |
| **water** | before dawn | The night (§5): Rafe (if heard and not cut), a partner from before, Maya, or alone. |
| **complete** | late · the wall | THE SOURCE; his name or its absence; Sloane's fate; the thread to Ch15 (the courier's door, or the stair) and LINDEN, E. |

---

## 4. The choices (with recommendations)

**The seam** (`out.seam`), how the lie surfaces:
- if `out.rules` has **verify** or **provenance**: she catches it herself, cross-checking the Jakarta copy against the
  leaf, and finds the initial scraped out. "A page you shaded. You. After everything you said about believing the
  pages." She has him before he speaks.
- otherwise: at 02:40 he rings and tells her first, because he has decided he would rather she heard it from him than
  found it. "There's a page I doctored. One. I need to tell you why before you find it, because you will find it."

**The reckoning** (`out.told` = yes; `act3.nell = known`): Rafe's confession, told on this road across the room she
now holds. His name. The Jakarta list he carried without reading, "the one she missed her breakfast for". The Sunday
ferry to Batam, two tickets. The Saturday Meridian pulled him out of the country on a job he could not refuse. Nell
walking the harbour wall toward a meeting he never reached. **He does not know how she went into the water.** He chose
Evelynn because Meridian reissued the legend, and the new Evelyn would be let into the Vesper, the breakfast, the rooms
he cannot enter. **How she takes it:**
- **let him finish:** she hears all of it, and says nothing until he is done, the way he taught her to wait;
- **press the lie:** she makes him account for the doctored page first, before the grief. "Why that one. Why hide
  your own initial." "Because a name is the thing they take you apart with. Hers. Then mine. Then, if you weren't
  careful, yours.";
- **stop and verify:** she stops him, and checks the load-bearing claims — the ferry tickets, the job that pulled him
  out — against what she can, before she lets herself believe the wound. He waits. "Good. Check me. She didn't, and
  look."

**Sloane's fate** (`act3.sloane`, `out.sloane`), gated by `out.file`:

| Option | Gate | What it is | Key |
|---|---|---|---|
| **burn** (just / useful) | `out.file = bank` (she holds it) or `burn` (Rafe holds it) | The file goes where it does the most: to the inquiry, a regulator, or Meridian's own board — just, because Sloane signed, or useful, because a fire draws the eye off Rafe. Sloane falls. | `act3.sloane = burned`, `out.sloane = burn` |
| **trade** | `out.file = bank` or `burn` | The file traded to Axiom for one thing: call off whatever is hunting the courier. Sloane keeps her post; Rafe keeps his skin. | `act3.sloane = traded`, `out.sloane = trade` |
| **spare** | **always** | She leaves Victoria Sloane alone. A person in the machine, not her enemy. If she never took the file (`leave`), this is the only door, and the game says so kindly. | `act3.sloane = spared`, `out.sloane = spare` |

**What Rafe is** (`out.way14`, the route's Ch15/Act IV thread):
- **keep** (bounded): she goes on working with him, but on her terms now — every page with its provenance, and the
  Jakarta original in her keeping, held over him. "You get me into the rooms. I hold the one page that is you." Ch15
  **by the courier's door**, his knowledge, her leash. `out.way14 = keep`.
- **cut** (verify everything): she cuts the source. She keeps only what she has proved, and walks away from the man
  and every page she could not check. Ch15 **by the stair, alone.** The "cut the source" ending's seed.
  `out.way14 = cut`.
- **trust** (once, open eyes): she forgives the lie, once, knowing it is a choice and not a certainty. They go on as
  two people looking for the same answer. Ch15 **by the courier's door**, together. Opens the night (§5).
  `out.way14 = trust`.

---

## 5. The night (with recommendations)

`water`, chosen and never gated behind him:
- **Rafe** — **only if she heard his truth and did not cut him** (keep or trust). A year of a voice, made flesh and
  told true. Heat 3, the consent flow (the scope choice, then stop / stay), fades. **He never makes her Nell:** if he
  reaches for the wrong name, the scene stops, and it is his to repair, and the repair is the point. On **keep**, it
  is sharper and warier; on **trust**, it is the first easy thing either of them has had in a year.
- **a partner from before** (Julian or Sebastian): heat 3, the consent flow, fades.
- **Maya:** who came because she heard the terminal meeting go long.
- **alone:** with the wall, and a name on it at last.

---

## 6. Decisions for the owner (recommendation first)

1. **Title "The Source":** the source-figure's turn, the route's payoff — the truth about the man handing her the
   truth. *Recommended.*
2. **Rafe Lim named, and the confession:** the Jakarta list, the ferry, the Saturday, why he chose her, and that he
   does not know how she died. Let him finish / press the lie / stop and verify. *Recommended.*
3. **The seam:** one page he shaded (his own initial scraped off the Jakarta copy), caught by the verify/provenance
   rule or confessed first. *Recommended.*
4. **Sloane's fate:** burn (just / useful) / trade (for Rafe's safety) / spare, gated by `out.file`. Target or trade,
   never a romance. *Recommended.*
5. **What Rafe is:** keep (bounded, the Jakarta original held) / cut (verify and walk) / trust (open eyes). Each opens
   a different Ch15 entry (the courier's door, or the stair). *Recommended.*
6. **The night with Rafe only after the truth and not cut,** heat 3, consent flow, fades; he never makes her Nell.
   *Recommended.* Alternative: hold the Rafe night for Ch15.
7. **Nell's name is now known** (`act3.nell = known`), but **how she died stays for Act IV** (Ch17); Rafe genuinely
   does not know. *Recommended.*
8. **Build shape:**
   - Ch10–13 Outside variants don't exist yet, so an **interim bridge** from an Outside `chapter9.complete` ("This
     road's Act III chapters are in development") leads into Ch14, with Ch10–13 keys read at their defaults, exactly
     as Institutional and Executive did;
   - writes the shared Act III keys Act IV reads (`act3.sloane`, `act3.nell`, and `act3.nell-order` if she holds the
     Jakarta original), plus `out.way14`, `out.sloane`, `out.told`, `out.seam`, `c14.o-*`;
   - ends at the Chapters 15–18 in-development stop;
   - three goldens (keep + spare + let him finish; cut + burn + press the lie; trust + trade + stop and verify), with
     neutral picks and a real-save authentication test.

   *Recommended.*

---

## 6a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no flag the later chapters read changes). They pay off the quiet plants from the earlier deepening passes
(the R in the EXPENSES handwriting, the launderette, the exercise book's CHECKED BY column):

| Moment | Where | Choices (`c14.o-…`) |
|---|---|---|
| **The gap** | before she summons him (`seam`) | **o14-gap-hand** (the R from the EXPENSES envelope laid against the scraped place; recalled from memory if she burned the envelope in Ch7) · **-light** (the copy held to the lamp: blade marks, a breathed-on patch) · **-ledger** (SEAM written against the very first page in the CHECKED BY column) |
| **His name** | before the reckoning's three ways (`reckoning`) | **o14-name-say** ("Rafe", with no half-beat before it; if she watched him in the launderette in Ch8 she keeps that to herself) · **-write** (RAFE LIM on the wall under R.) · **-keep** (left unsaid for now) |
| **The cup** | before Sloane (`verdict`) | **o14-cup-tea** (two cups, his held in both hands, not drunk) · **-window** (the window opened an inch) · **-none** (the lamp, the table, the silence) |

No golden recapture is needed.

## 7. Art impact

New:
- the room over the water at 02:40, two figures, the wall behind them (a two-shot, the reckoning);
- Rafe seen close for the first time in full light (his cast sheet, deferred from Ch8);
- an insert: the Jakarta handoff copy, the courier's initial scraped out and, beside it, the leaf's "R." intact.

Katong and the Singapore sets stay with the shared Ch12 framing when it is built. Dark noir. These go on the
consolidated art list after the deepening passes, per the standing rule.
