# Predator · Chapter 10: "Let Me Help" (design)

**Act III · Predator route (lane id `predator`) · the shared breakfast spine, with Predator framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §4, Ch10 on the shared "She Knows" spine. Celeste's breakfast
  lands differently: she is *delighted*. "You're taking Helix. How marvellous. Let me help." The first order is an
  offer.
- [CHAPTER_10_SHE_KNOWS_DESIGN.md](CHAPTER_10_SHE_KNOWS_DESIGN.md), the Celebrity spine, for the shared canon:
  - the Lindqvist, a club on the river whose curtains never open;
  - Celeste's inventory of the last week;
  - "Adrian": she knows the man under the face;
  - the public claim (a photograph in the papers);
  - Maya's name from somebody who should not know it;
  - the black phone.
- The built Predator chapters. Continuity it must honour:
  - **Ch11** opens with Marcus's card inviting her to the Vesper, and Evelynn already knows Celeste receives her
    clients there. The black phone is already in her hand.
  - **Ch13:** Celeste's card "is the first time she has ever written to you directly", so this chapter's
    invitation must come **through Marcus**, not an orchid on the mat.
  - **Ch11's counter** is the first time Celeste is surprised (`pred.celeste-count`), so nothing here may surprise
    her in the open.
  - **Ch8:** Evelynn already keeps a ledger on her wardrobe door.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §3. The pressure is non-sexual. Nothing sexual is on screen that is not
  chosen.

**Status: APPROVED (owner, 2026-09-27: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_10_SCRIPT.md](scripts/PREDATOR_CHAPTER_10_SCRIPT.md); code: `src/content/chapter10-predator.ts`.
It ran ~1.2–1.4k words on one path at pass 1, and was deepened 2026-09-27 to ~1.4–1.8k. Chapter 11 now enters from `chapter10.ledger`, and the Predator road runs
without gaps from Chapter 7 to Chapter 14.

---

## 1. The chapter's job

On the Celebrity road Celeste's breakfast is a **threat**: she knows who Evelynn is, and claims her in public. On
the Predator road the same breakfast is a **seduction**. Celeste has watched Evelynn take three levers in three weeks
and follow the fund to its letterhead, and she is thrilled. She offers what a predator most wants: **help.**

By the end of the chapter the player must:

1. **Be summoned through Marcus.** "Celeste Laurent would like to have breakfast with you. She asked me to ask. She
   has never asked to meet anybody who works for me." She goes, or makes Celeste come to her.
2. **Hear Celeste's inventory.** Every lever by name (Hollis, Varga, Benton, the photograph), the fund's letterhead,
   and the ledger on her wardrobe door: "So did I, at your age." Then the turn: **she knows about Adrian**, and she
   finds it charming. "Adrian Vale would never have dared ask Marcus for his desk. I have been dying to meet whoever
   did."
3. **Be offered help, and answer.** Celeste will clear her path at Helix: the audit committee stops asking, and a
   door opens that Marcus cannot open. In exchange there is **one small thing**: tell her what Marcus says about
   the fund. Accept, decline, or accept and feed her nothing true.
4. **Take the black phone**, across the table: "So we can talk without Marcus listening."
5. **Be claimed in public.** By noon the City pages run the photograph: Celeste Laurent and Helix's rising star,
   laughing. Marcus holds the paper at her door: "What did she want?"
6. **Carry it home.** A card goes up for CELESTE LAURENT, above everything else. Its line reflects the answer.

**What it must not do:**
- make Celeste afraid, or surprised (Ch11 and Ch13–14 on this road);
- have Celeste write to her directly (Ch13's card is the first);
- turn the offer into a sexual price. Celeste wants **information about Marcus**, nothing else.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** breakfast with the woman at the top of the stairs, who knows everything, including the name under
  the face.
- **Erotic:** Celeste's attention, which is its own kind of heat: being wanted by the most powerful person in the
  room, and choosing what to give. The evening is optional: Marcus, who has just been shown he is not the top of the
  stairs; Julian, if he is an ally; or nobody.
- **Fun:** being admired for exactly the thing she thought she was hiding, and deciding whether to take the help or
  lie to its face.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want` | Ch7 | Celeste's first compliment: the money ("sensible"), the title ("sentimental"), the desk ("glorious") |
| `pred.lever8.*`, `pred.hollis`, `pred.lsf` | Ch8 | Celeste's inventory, by name and deal ("You spared Ines Varga. That was the cleverest thing anybody has done in that building for years.") |
| `pred.friday` (tell / lie / trade / walk) | Ch8 | What Marcus has already told her ("He writes everything down, darling. And I read everything he writes.") |
| `pred.clause.report` | Ch7 | With the report clause, nobody but Marcus sees her work, so she can **feed** Celeste unverifiable reports |
| `case.strength`, `case.name` | Ch9 | Opening with the case: supported or strong, and Celeste is *pleased*; thin, and she corrects a detail, gently |
| `c6.maya` | Ch6 | Maya's name from somebody who should not know it ("Ms Reyes. The one at the paper.") |
| `c8.p-night` (pryce) | Ch8 | Pryce drives her to the Lindqvist: "Ms Laurent's compliments." |
| `pred.julian` | Ch7–8 | The evening; and an ally's one line after the photograph |

---

## 3. Shape (phases)

`ask → table → offer → floor → evening → ledger`

| Phase | Place | Beat |
|---|---|---|
| **ask** | Monday · Marcus's doorway | Marcus, uneasy for the first time: "She has never asked to meet anybody who works for me." **go** (the Lindqvist, Wednesday at seven) / **wait** (make her come to you: at eight on Wednesday she walks across the thirty-sixth floor to your glass office, in front of everybody, with two coffees; public from the first minute, and worse). |
| **table** | 07:00 · the Lindqvist (or your office) | The inventory. How she opens: **case** (say "Meridian" first) / **flatter** (let Celeste lead, and learn the most) / **ask** ("What do you want?"). Then the turn, "Adrian Vale would never have dared …", and how she takes it: **composed** / **laugh** (laugh with her) / **leave** (the bill, and the door). |
| **offer** | the coffee | "Let me help." What she offers, and the one small thing she wants. The black phone slides across the table. **accept** / **decline** / **feed** (accept, and send nothing true; needs the report clause or a supported case) (§4). |
| **floor** | noon · Helix, the thirty-sixth floor | The photograph in the City pages, and the floor looking at her differently. Marcus in her doorway with the paper: "What did she want?" **tell** (the truth: "She wants me to tell her what you say about the fund.") / **lie** ("She wanted to meet your acquisition.") / **deflect** ("Ask her."). |
| **evening** | night | Optional, chosen: Marcus (he needs, for once, to be told he is still wanted), Julian (if an ally), or nobody. Heat 3, the consent flow, fades. |
| **ledger** | late · the wardrobe door | CELESTE LAURENT, above Marcus, above the fund, with its line by answer. At midnight the black phone's first message: "The first Thursday of December, darling. The Vesper. Marcus will bring you. He doesn't know yet." |

---

## 4. The offer (with recommendations)

> Celeste: Let me help. Marcus is a very good man to climb, darling, but he is not the top of anything. The audit
> committee has been asking for your calendar. I can make them stop. There is a door on the thirty-eighth floor
> Marcus has never been through. I can open it. All I should like in return is one small thing. When Marcus talks
> about my fund, and he will, tell me what he says. Nothing else. I am terribly easy to please.

- **accept:** "Yes."
  - The audit committee stops asking, that week (`pred.celeste10 = accepted`).
  - She reports on Marcus through the black phone, and the first report is due on Friday.
  - The cost is Marcus: every confidence he gives her now has two readers.
  - Seeds the board-seat ending.
- **decline:** "Thank you. I'd rather climb on my own."
  - Celeste, amused: "Then I shall watch. I do love to watch."
  - The audit committee keeps asking (`pred.celeste10 = declined`). Her standing with Celeste is cooler, and there
    is no threat yet.
  - Maya's name is mentioned, lightly, on the way out, as something Celeste knows. That is the only pressure.
- **feed** (needs the report clause, so that nobody else sees her work, or a supported/strong case):
  - She says yes, and on Friday sends Celeste a report that is beautifully written and entirely untrue.
  - Celeste does not know (`pred.celeste10 = fed`), so it is **not** a surprise. That stays Ch11's.
  - The most Predator answer, and the most dangerous if she is caught (a seed for Act IV).

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Let Me Help"** (the shared "She Knows" breakfast in Predator framing): Celeste is delighted, not
   threatening. *Recommended.*
2. **The invitation comes through Marcus**, not an orchid, which keeps Ch13's "first time she has ever written to
   you directly" true. She goes, or makes Celeste come to the thirty-sixth floor, which is public and worse.
   *Recommended.*
3. **Celeste's inventory includes the wardrobe ledger and Adrian,** delivered as admiration ("Adrian Vale would
   never have dared"). *Recommended.* She knows the man under the face on this road too (canon). Here it is flattery,
   not a threat.
4. **The first order is an offer:** help (the audit committee called off, a door Marcus has never been through) for
   reports on Marcus. Accept, decline, or feed her nothing true (report clause or a supported case). The feed stays
   covert and is not a surprise. *Recommended.*
5. **The black phone is handed over at breakfast**, and the public claim is a photograph in the City pages by noon.
   *Recommended.*
6. **Marcus asks "What did she want?"** Tell him the truth, lie, or deflect. *Recommended.* It sets the tone of his
   invitation in Ch11 and of his last scene in Ch14.
7. **The evening:** Marcus, Julian (if an ally), or nobody. Heat 3, consent-gated, fades. *Recommended.*
8. **Entry and build shape:**
   - Ch10 is entered from a Predator `chapter9.complete`, now permanently. Ch11's temporary entry moves to
     `chapter10.ledger`, and **the Predator road is continuous from Ch7 to Ch14.**
   - Three goldens (accept, decline, feed) with neutral picks, and a real-save authentication test.
   - Follow-ups: Celeste's Vesper greeting in Ch11 reflects the answer ("How well she wears her independence" on
     decline). Ch11's opening line on Marcus's card reflects what she told him.

   *Recommended.*

---

## 6. Art impact

Reuses the Lindqvist (Celebrity Ch10), Marcus's doorway and the Helix floor, and the black phone insert. New: the
City-pages photograph of Celeste and Evelynn laughing (an insert). It goes on ALL_CHAPTERS_ART_LIST.md when the design
is approved.
