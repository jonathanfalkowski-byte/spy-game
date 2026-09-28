# Executive · Chapter 12: "Whose Face" (design)

**Act III · Executive route (lane id `executive`) · the shared Singapore spine, with Julian beside her**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4, "12 · Singapore": shared spine, Executive framing.
  Singapore and Nell as canon, **with Julian beside her** (he comes). The route's trust question: **does she tell
  him who she is?** Singapore stays the shared Ch12 (decision 4).
- §2 rules: Julian is never a trap, his care is real in every branch, and every threat is non-sexual.
- [CHAPTER_12_SINGAPORE_DESIGN.md](CHAPTER_12_SINGAPORE_DESIGN.md), the Celebrity spine, and the canon it holds:
  - **Nell**, Eleanor Linden, the first Evelyn: burned in Jakarta; ran the night she "disappeared before
    breakfast"; found in the harbour a week later (misadventure). **Not alive.**
  - **Mrs Tan** across the landing on Emerald Hill, with the key under the orchids.
  - **Number 9**, kept furnished for the reissue by men in white gloves, with the maintenance schedule ("Family
    contact (sister): N. Linden…"), the unused Penang boarding pass, and the caretaker.
  - **Colin Ashby** at the Punkah Bar of the Marlowe Hotel: the order to burn her "came down from upstairs. From a
    friend of hers."; the white orchids at her Jakarta hospital bed; "She hated orchids."
  - **Nora Linden** in Holland Village: the cinnamon was Nell's and the black coffee her friend's; the tall friend
    rang Nora on the Sunday morning, before the police. **A seed, not proof.**
  - Celeste's reach at a distance, on the black phone.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md): Celeste's guilt is proved only in Act IV.

**Continuity it must honour** (built Executive chapters):
- **Ch11:**
  - `exec.coat11 = take`: the first Evelynn's camel coat, with a Singapore transit card and a receipt from a café on
    Emerald Hill for two coffees in the pocket;
  - `exec.book11 = show`: Julian saw her page and was promised "later", and "You said later. It's later." has
    already been asked once;
  - `exec.iris11 = warn`: Iris walked out, and a card will come "from somewhere with no stamp";
  - `exec.sign11`, `exec.celeste11`.
- **Ch10:** `exec.calendar`. On **gave**, Celeste has his Singapore week because Evelynn sent it.
- **Ch14** (built): `exec.told12` (told / not) is the key this chapter must set. On **told**, Ch14's "everything"
  does not need to include her name, and trust is +1.

**Status: APPROVED (owner, 2026-09-28: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_12_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_12_SCRIPT.md); code: `src/content/chapter12-executive.ts`.
It is entered from an Executive `chapter11.complete`, hands on to the Ch14 bridge, and runs ~1.2–1.65k words on one path.

---

## 1. The chapter's job

On the Celebrity road Singapore is where she finds the woman whose life she is wearing. On the Executive road she
finds her **with the man who loves the life she is wearing** in the next room. Every day she learns who Nell was,
and every night Julian holds a woman he thinks he knows.

Celeste does not give an order this chapter. She does something worse: she makes it plain that **she can tell him
first.**

By the end of the chapter the player must:

1. **Fly out with Julian** on Helix business. His days are meetings, and her days are Nell. "The evenings are yours
   if you want them, and mine if you'll let me have them."
2. **Walk the shared spine:** Mrs Tan and the key; Number 9 and the caretaker; Ashby at the Punkah Bar; Nora in
   Holland Village. Nell's name, her flat shoes, her cinnamon, and the tall friend who rang first.
3. **Hear what Ashby knows about Helix:** "Julian Mercer's Helix? She takes a man's company the way she took Nell's
   name. By being kind to him first."
4. **Receive Celeste's pressure:** a photograph of Evelynn and Julian at dinner on the Straits, taken tonight. "You
   make a lovely couple, darling. Does he know whose face he's kissing? Somebody ought to tell him. It oughtn't to be
   me." The threat is to tell him, which is non-sexual and aimed at his trust.
5. **Decide what to tell him, in his suite with the windows open on the Straits:**
   - **who she is**: Adrian, the reissue, Nell;
   - **part of it**: "Somebody is selling me. I'm finding out who.";
   - **not yet**.

   His answer is a person's, never a verdict.
6. **Stand at the harbour** where Nell went into the water, and choose the night.
7. **Pin the card:** NELL, ELEANOR LINDEN. "SHE HATED ORCHIDS." Under it, what he knows now.

**What it must not do:**
- resurrect Nell, or prove Celeste's guilt (Act IV);
- make Julian a trap, or make his answer a punishment. If she tells him, he stays a person. If she doesn't, he
  stays kind, and the not-telling is hers to carry;
- have Celeste actually tell him. She prefers the leverage, and never does;
- put anything sexual on screen that is not chosen.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** caught in her own flat by the man who keeps it, and a photograph of her own dinner arriving on the
  black phone before dessert.
- **Erotic:** Singapore heat at night, a suite with the windows open on the Straits, and a man who wants whoever
  she turns out to be.
- **Fun:** being Evie for Mrs Tan, playing a ghost for Ashby, and letting Helix pay for the trip.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.coat11` | Ch11 | **take:** the transit card is Nell's (the last stop on it is Somerset, for Emerald Hill), and **Nora reads the receipt**: "Two coffees. The cinnamon was hers. The black was always her friend's." |
| `exec.book11` | Ch11 | **show:** the promise of "later" hangs over the suite; telling him keeps it |
| `exec.iris11` | Ch11 | **warn:** a card from Iris with no stamp and one name on it, Colin Ashby, and the Marlowe. Otherwise Ashby is reached by the caretaker's number (the always-available road) |
| `exec.sign11` | Ch11 | **signed:** Ashby's Helix line lands on her like a verdict ("By being kind to him first") |
| `exec.calendar` | Ch10 | **gave:** "I know where he'll be all week, darling. You sent it." |
| `exec.celeste11` | Ch11 | Celeste's tone on the black phone (pleased / suspects / cold) |
| `c6.friction-julian`, earlier night outcomes | Ch6–11 | The night scope |

---

## 3. Shape (phases)

`changi → tan → number9 → punkah → nora → suite → harbour → complete`

The phase names avoid the shared Ch12 names (`departure / emerald / flat / straits / sister / night`) and
Predator's (`geneva / bank / morel / vault / lake / call / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **changi** | Monday 06:10 · Changi | Business class on Helix, Julian asleep over a board pack, the heat like a hand at the doors. The black phone: "Welcome home, darling. Do give my love to Mrs Tan." Julian: "I have meetings until six every day…" |
| **tan** | Emerald Hill | Mrs Tan and her orchids: "Evie!" **Be Evie** / **tell her the truth** / **let her decide**. The last night, the note ("I'm going to my sister's"), the tall lady, and the men in white gloves. The key under the orchids. |
| **number9** | Emerald Hill, after dark | The flat kept dressed, with new clothes in *her* size. **Where she looks:** desk (the maintenance schedule: "sister: N. Linden, cooperative") / wardrobe (the Penang boarding pass) / balcony (the orchid across the lane). Then **the caretaker**: **hide** / **play the tenant** / **"Who pays you?"** (the number). |
| **punkah** | Tuesday night · the Punkah Bar, the Marlowe | Ashby, by Iris's card or the caretaker's number. **Be Nell** / **lay it on the bar** / **"I'm the reissue."** Jakarta, "a friend of hers", the white orchids. And Helix: "She takes a man's company the way she took Nell's name. By being kind to him first." |
| **nora** | Sunday · Holland Village | Nora opens the door on her sister's face. **The truth** / **the kind lie** / **the wrong house**. The cinnamon and the black; the Sunday-morning call from the tall friend. A photograph of Nell on the harbour wall in flat shoes. |
| **suite** | Sunday night · Julian's suite, the windows open on the Straits | Dinner, and the black phone before dessert: the photograph and "Does he know whose face he's kissing?" Then the choice (§4). |
| **harbour** | midnight · the harbour | Where Nell went in. **Say her name** / **the orchid** / **stand there**. Then the night: Julian (consent-gated, heat 3, fades) or alone. |
| **complete** | the flight home · the wardrobe door | The card. Until Executive Ch13 exists, the in-development bridge goes on to Ch14 ("Chapter 13 in development"). |

---

## 4. The telling (with recommendations)

In the suite, the windows open, the Straits black and full of ships' lights, and Celeste's photograph face up on
the table between them. He has seen it, because she let him. He doesn't know who sent it.

**What she tells him** (`exec.told12`):
- **told:** everything about who she is: Adrian Vale; the clinic; the reissue; Nell, whose name, flat and life she
  is wearing; and the book page ("available for placement"). Not Celeste's orders; those belong to Ch14's truth.
  He listens with his hands flat on the table and asks one question: "Is the woman who wrote her own terms into my
  contract real?" "Yes." "Then that's who I know." It is the route's biggest trust beat before Ch14, and it costs
  her nothing but the telling. (`exec.told12 = told`, trust +1 in Ch14.)
- **partly:** "Somebody is selling me. I'm finding out who. I'll tell you the rest when I know it." True, and not
  all. He takes it: "Then tell me when you can. I'm not going anywhere." (`exec.told12 = partly`, which Ch14 reads as
  not told.)
- **not:** "Not tonight." She puts the photograph face down, like his, and he lets her. The not-telling is hers to
  carry, and the game lets her feel it without punishing it. (`exec.told12 = not`)

Celeste **never** tells him on any road. The threat is the leverage, and she prefers to keep it.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Whose Face"** (the shared Singapore spine with Julian beside her). *Recommended.*
2. **Julian comes on Helix business:** his days are meetings, her days are Nell, and the nights are shared if she
   chooses. He is in the city, not in the investigation. *Recommended* (shared canon's "cover-with").
3. **The shared spine as canon, compressed:** Mrs Tan, Number 9 and the caretaker, Ashby, Nora. Each keeps its
   three-way choice and its canon facts. *Recommended.*
4. **Ashby names Helix:** "She takes a man's company the way she took Nell's name. By being kind to him first."
   *Recommended.* It ties Nell to 14.3 without proving anything.
5. **Celeste's pressure is the threat to tell him first**, with a photograph of their dinner. It is non-sexual,
   aimed at his trust, and never carried out. *Recommended.*
6. **The telling:** who she is / part of it / not yet. His question is "Is the woman who wrote her own terms into
   my contract real?", answered yes. Ch14 reads `exec.told12`. *Recommended.*
7. **The harbour, and the night:** Julian in the suite (heat 3, consent-gated, fades) or alone. After *told*, he
   wants whoever she turns out to be, and the game says so. *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter11.complete`;
   - the Ch14 bridge moves to Ch12's end ("Chapter 13 in development");
   - Ch14's `exec.told12` becomes real;
   - three goldens (told, partly, not) with neutral picks, and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses the Singapore set (Celebrity Ch12 masters): Changi, Emerald Hill, Number 9, the Punkah Bar, Holland
Village, and the harbour at night.

New candidates:
- **Julian's suite**, with the windows open on the Straits;
- **Celeste's photograph** of the two of them at dinner, an insert.

These go on the consolidated art list after the deepening passes, per the standing rule.
