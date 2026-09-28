# Executive · Chapter 11: "The Good Pen" (design)

**Act III · Executive route (lane id `executive`) · the shared Vesper set ("The Asset"), with Executive framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4, "11 · The Asset" (a shared set, the Vesper): she is on
  the catalogue (Celebrity canon), and Julian is in the room for Helix, watching her shown. The second order: have
  Julian sign 14.3 on the next deal, at the Vesper, tonight.
- §2 rules:
  - Julian is never a trap.
  - Orders target his trust, never his body.
  - Every threat is non-sexual.
- [CHAPTER_11_THE_ASSET_DESIGN.md](CHAPTER_11_THE_ASSET_DESIGN.md), the Celebrity spine, for the shared canon:
  - the Vesper Gallery: black glass, no name, the walls hung with **empty frames**;
  - the long room, and Celeste's clients (Halvorsen the shipping man, a minister's wife, the quiet man from the Gulf
    fund);
  - the catalogue, *The Autumn Collection*, where every page is a person. Her page reads *E. V. · reissued · public
    profile · available for placement from the first Thursday of next month* (Ch13's date). Iris's reads *I. M. ·
    ending*;
  - **Iris Moreau**, a working legend four years inside Halvorsen's firm **as his chief of staff**;
  - Julian "sees her being shown and does not look away".
- [PREDATOR_CHAPTER_11_THE_CATALOGUE_DESIGN.md](PREDATOR_CHAPTER_11_THE_CATALOGUE_DESIGN.md), the pattern for a lane
  variant of this set.

**Continuity it must honour:**
- **Ch10** (built):
  - the Vesper invitation is in Julian's own diary ("do bring your chief of staff");
  - `exec.calendar` (gave / doctored / refused). A doctored Friday may be noticed here;
  - `exec.celeste10`, and the black phone.
- **Ch14** (built): `exec.sign11` (signed / warned / refused) is the key this chapter must set. On **signed**, the
  deal called in is "the one he signed in the long room, with the good pen, because you brought him the page and
  stood beside him", with "whose hand was on his shoulder". On **warned**, "You warned me at the Vesper. I didn't
  sign." On **refused**, the failed deal is another (Antwerp).
- **Ch8:** `exec.file` (told: he has stopped signing), `exec.fav.card` (the dress on his card), `exec.flat`.

**Status: DESIGN for owner approval.** Nothing is built yet.

---

## 1. The chapter's job

On the Celebrity road the Vesper is the first night she is run as an asset. On the Executive road it is also the
first night **Julian sees what she is for**, without knowing it: a room of rich people looking at the woman he loves
the way he looks at a balance sheet. And it is the night Celeste asks for **his pen**.

Iris Moreau is the chapter's mirror. She is a legend like Evelynn, and like Evelynn she is a chief of staff to a
powerful man. Her page in the book says *ending*.

By the end of the chapter the player must:

1. **Arrive on Julian's arm,** as Helix's guest, and be shown. The clients talk about "availability", and Julian
   hears it.
2. **Meet Iris,** Halvorsen's chief of staff, four years in and *ending*, and decide what to tell her.
3. **Find her own page** in *The Autumn Collection*, and decide whether Julian sees it.
4. **Receive the second order:** Marcus has brought a Morel & Cie facility to the party. "Bring it to him. Stand
   beside him. He signs what you bring him now. Everybody's noticed."
5. **Answer it:**
   - **sign:** bring him the page and the good pen, and he signs because she brought it;
   - **warn:** on the stairs, "Don't sign anything tonight. Not from Marcus, not from me.";
   - **refuse** Celeste outright. The cost is non-sexual and falls on Julian: Halvorsen's shipping line moves its
     mandate from Helix on Monday.
6. **Hear Julian in the car:** "What was that place?" And his invitation, which opens Ch12: Helix has business in
   Singapore next month, and he'd rather not go alone.
7. **Choose the night:** Julian (heat 3, consent-gated, fades), Maya, or alone.
8. **Pin the card:** THE VESPER. AVAILABLE FROM THE FIRST THURSDAY. Under it, whose pen it was: HIS / NOT TONIGHT /
   MARCUS'S.

**What it must not do:**
- make Julian a buyer, or complicit. He is a guest who is appalled, and not yet told;
- make any cost sexual. **The placement date is not moved as a punishment.** It is set on every road (Ch13's
  canon), and refusal costs Julian a client, never her body;
- make Celeste afraid (Ch14), or give Evelynn the whole truth to tell (Ch12–14).

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a facility with clause 14.3 inside it, in a gallery full of people who bought people, and the good
  pen in her hand.
- **Erotic:** a room built for looking, where she is the thing looked at and chooses whom she lets see her. Julian
  in black tie, watching her be shown and wanting her on her terms anyway. A chosen night after.
- **Fun:** Iris, the only other person in the room who knows exactly what the room is, and the two chiefs of staff
  finding each other in the powder room.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.calendar`, `exec.celeste10` | Ch10 | Celeste's greeting. **gave:** "You've been such a help." **doctored:** "One of your Fridays had a little mistake in it, darling. Thursday. Marcus was quite put out. Everybody makes one." (she noticed, pleasantly). **refused:** "Pity about Gdańsk." |
| `exec.file` | Ch8 | **told:** Julian has stopped signing, so Celeste says "He'll sign this. For you." |
| `exec.fav.card`, `exec.flat` | Ch7–8 | The dress: bought on his card, or her own. Hal collects her from the Helix flat, or from her own door |
| `exec.paper10` | Ch10 | What Julian thinks Celeste is to her ("She knew me before" makes him watch Celeste all night) |
| `c10.x-eve`, `c10.x-midweek` | Ch10 | If she took his hand in her doorway, he offers his arm at the door without thinking |
| `c6.friction-julian`, `c7`/`c8`/`c10` night outcomes | Ch6–10 | The night scope |
| `c6.maya` | Ch6 | Maya's night |

---

## 3. Shape (phases)

`frames → pages → pen → signing → drive → complete`

The phase names avoid the shared Ch11 names (`arrival / viewing / upstairs / order / ending / after`) and
Predator's (`dress / longroom / book / powder / terrace / cloak / late / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **frames** | the first Thursday, 20:00 · the Vesper, the long room | Hal and the car, Julian in black tie ("You look…" "Say it." "Like something I'd have to read twice."). The empty frames lit as if full. Celeste receives Helix: "Julian. At last." The clients talk of placements and availability over Evelynn's head, and Julian hears it and does not look away. A moment: **stay beside him** / **work the room** (Halvorsen lets slip "the autumn collection is in the anteroom") / **watch him watch them** (neutral). |
| **pages** | 21:15 · the powder room, then the anteroom | Iris Moreau in grey silk: "They put you in the green, too." She is Halvorsen's chief of staff, four years in. A moment: **warn her** / **"I'm his chief of staff too"** / **say nothing** (neutral). Then the book on its lectern, her page and Iris's, and Julian coming to find her. A moment: **let him see it** / **close the book** / **turn to another page** (neutral). |
| **pen** | 22:15 · the balcony over the canal | Celeste and a Morel & Cie facility in a cream folder, flagged on the last page. The order (§4). |
| **signing** | 22:40 · the long room | The answer, played (§4). |
| **drive** | midnight · Hal's car, then the night | "What was that place?" A moment: **"A shop. I was in the window."** / **"Ask me in Singapore."** / **"A party."** (neutral). Then Singapore: "Helix has a thing there next month. I'd rather not go alone." Then the night. |
| **complete** | late · the wardrobe door | The card. Until Executive Ch12 exists, the in-development bridge goes on to Ch14 ("Chapters 12–13"). |

---

## 4. The order, and what it costs (with recommendations)

Celeste, on the balcony, hands her a cream folder:

> Celeste: Marcus has brought a lovely little facility for Julian tonight. Morel & Cie, the usual. I'd like him to
> sign it here, in the long room, with a good pen, so that it feels like a celebration. Bring it to him. Stand beside
> him. He signs what you bring him now, darling. Everybody's noticed.

With `exec.file = told`: "He hasn't signed anything of ours since the spring. He'll sign this. For you."

**The answer** (`exec.sign11`):
- **sign** (comply): she carries the folder and the good pen across the long room, and puts her hand on his
  shoulder. He reads the first line, looks up at her, and says "If you've read it, that's enough for me." Then he
  signs. The clients applaud something none of them understand, and Celeste raises a glass. This is **the hardest
  beat on the road so far**, and Ch14 remembers the hand. `exec.celeste11 = pleased`.
- **warn** (counterplay): on the stairs, before Marcus reaches him: "Don't sign anything tonight. Not from Marcus,
  not from me. Trust me, and ask me why in the car." When Marcus arrives with the folder, Julian says "Not tonight,
  Marcus. I read things now." Celeste watches her across the room: "He's learned to say no. I wonder where."
  `exec.celeste11 = suspects`. Ch14's *warned* branch follows (he knows).
- **refuse** (to Celeste): "I won't bring it to him." "Pity, darling." Marcus carries it himself.
  - If Julian stopped signing in Ch8 (`exec.file = told`), he declines Marcus politely.
  - Otherwise he signs Marcus's page, the way he always has, and her hand is nowhere near it.

  **The cost** comes on Monday: Halvorsen's shipping line moves its whole mandate from Helix, forty million a year,
  without a reason given, and Julian has the worst Monday of his career (`exec.cost11 = halvorsen`).
  `exec.celeste11 = cold`.

**Iris** (`exec.iris11`), the mirror:
- **warn:** "Your page says *ending*." Iris looks at her for a long moment, then leaves through the kitchens before
  the speeches, out of her own legend. A card comes later, from somewhere with no stamp.
- **kin:** "I'm his chief of staff too." Iris: "Then you'll know how it ends. Unless you don't let it."
- **quiet:** she says nothing, and Iris leaves at eleven with Halvorsen's man a step behind her. Her fate is left
  open, as canon keeps it.

**The book** (`exec.book11`):
- **show:** Julian reads *available for placement from the first Thursday of next month* under a photograph of her,
  and goes white. "What is this?" "Later. I promise." It seeds the truth he's owed in Ch12.
- **close:** she closes it as he reaches her. "Nothing. A guest book."
- **turn:** she turns to another page (neutral), and he sees a stranger's face.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Good Pen"** (the shared Vesper set in Executive framing). *Recommended.*
2. **Julian brings her as Helix's guest,** hears her discussed as available, and does not look away. He is appalled
   and not yet told, never a buyer. *Recommended.*
3. **Iris is the mirror:** Halvorsen's chief of staff, four years in, *ending*. Warn her (she walks out through the
   kitchens), claim kinship, or say nothing (canon's open fate). *Recommended.*
4. **The book:** her page, in shared canon's words. Let Julian see it (it seeds Ch12's truth), close it, or turn the
   page. *Recommended.*
5. **The second order is his signature tonight:** she brings the page and the good pen and stands beside him. Sign,
   warn, or refuse. The **refusal cost is Julian's and non-sexual** (Halvorsen's mandate walks on Monday). **The
   placement date is never moved as a punishment.** *Recommended.*
6. **"What was that place?"** in Hal's car, and **Singapore:** Julian asks her to come with him next month, which is
   the thread to Ch12 (Singapore, Nell). *Recommended.*
7. **The night:** Julian, Maya, or alone (heat 3, consent-gated, fades). After **sign**, the night is still offered:
   she chose it, and the game lets her carry it without judging her. *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter10.complete`;
   - the Ch14 bridge moves to Ch11's end ("Chapters 12–13 in development");
   - Ch14's `exec.sign11` becomes real;
   - three goldens (sign, warn, refuse) with neutral picks, and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses:
- the Vesper set (Celebrity Ch11 masters): the long room with its empty frames, the anteroom lectern, the powder room;
- Hal's car (`car`), and the flat at night.

New candidates:
- **the balcony over the canal**, with Celeste and the cream folder;
- **the good pen on the signature page**, an insert;
- Julian in black tie, in the long room.

These go on the consolidated art list after the deepening passes, per the standing rule.
