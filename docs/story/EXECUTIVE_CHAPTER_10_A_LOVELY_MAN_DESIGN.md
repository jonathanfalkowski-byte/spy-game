# Executive · Chapter 10: "A Lovely Man" (design)

**Act III · Executive route (lane id `executive`) · the shared "She Knows" breakfast spine, with Executive framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4, "10 · She Knows" (shared spine, Executive framing).
  Celeste's breakfast knows about Julian: "He's a lovely man. He'll never survive us. Unless you help me." The first
  order: bring her Julian's calendar.
- §2 rules:
  - Julian is never a trap.
  - Orders target his trust, never his body.
  - Every threat is non-sexual.
- [CHAPTER_10_SHE_KNOWS_DESIGN.md](CHAPTER_10_SHE_KNOWS_DESIGN.md), the Celebrity spine, for the shared canon:
  - the Lindqvist, a club on the river whose curtains never open;
  - Celeste's warm inventory of the last weeks;
  - "Adrian": she knows the man under the face;
  - the public claim (a photograph in the papers);
  - the black phone with one contact, *C.*;
  - the Vesper invitation that opens Chapter 11.
- [PREDATOR_CHAPTER_10_LET_ME_HELP_DESIGN.md](PREDATOR_CHAPTER_10_LET_ME_HELP_DESIGN.md), the pattern for a lane
  variant of this spine.

**Continuity it must honour** (built Executive chapters):
- **Ch8:**
  - the diary is hers to run (`exec.fav.diary`);
  - the tray (`exec.file`): Celeste can know about **told** (Julian stopped signing) and **pulled** (Marcus has
    been hunting a missing facility), but **not kept**. The copy in her phone is her one true secret;
  - Clare's drawer (`c8.x-clare`);
  - her contract terms and the key (`exec.term.*`, `exec.flat`);
  - her debt to Sloane.
- **Ch14** (built, reading defaults until now):
  - `exec.calendar` (gave / doctored / refused) is the key this chapter must set;
  - "Thank you for his calendar. I knew about Friday before he did.";
  - Adrian's name to Axiom is **Ch14's** refusal cost, so it must not be spent here;
  - Ch14's "He's a lovely man. He will never survive us." becomes a callback to this breakfast.

**Status: APPROVED (owner, 2026-09-28: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_10_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_10_SCRIPT.md); code: `src/content/chapter10-executive.ts`.
It is entered from an Executive `chapter9.complete` and hands on to the Ch14 bridge. It ran ~0.95–1.2k words on one
path at pass 1, deepened 2026-09-28 to ~1.15–1.5k with three moments: Tuesday night, the hour after, and the middle of
the week.

---

## 1. The chapter's job

On the Celebrity road Celeste's breakfast is a threat; on the Predator road it is a seduction. On the Executive road
it is **a rescue offer for a man who doesn't know he's drowning.**

Celeste has watched Evelynn walk into Helix's best rooms on Julian Mercer's arm, write her own terms, and (if she
did) teach him to read what he signs. Celeste is not angry. She is interested, and she is kind about Julian in a
way that is worse than threats. The order sounds like protection: *tell me where he'll be, so I can stand there
before Marcus does.*

By the end of the chapter the player must:

1. **Be summoned:** a white orchid on her desk on forty-one, inside Helix, where nobody saw it arrive. She goes,
   or makes Celeste come to her.
2. **Hear the inventory, Executive edition:**
   - her terms, quoted word for word ("You read your own contract. How rare.");
   - the flat, and whether she pays for it;
   - the tray, but only what Celeste could know;
   - Clare.

   Then the turn: **"Adrian."** She knows the man under the face.
3. **Hear the line, and the order:** "He's a lovely man. He'll never survive us. Unless you help me." The order is
   his calendar, the week ahead, every Friday, on the black phone.
4. **Answer it:**
   - **give it** (comply);
   - **doctor it** (counterplay: a true-looking week with one lie in it);
   - **refuse** (the cost, non-sexual: a small fund facility called early, and Julian has a terrible week without
     knowing why).
5. **Be claimed in public:** by noon the City pages have the photograph. **Julian** holds it in her doorway: "You
   didn't tell me you knew Celeste Laurent."
6. **Receive the Vesper invitation, through his diary:** Helix is invited to the first Thursday, and a line in
   Celeste's hand says *do bring your chief of staff.* That opens Chapter 11, "The Asset".
7. **Choose the night:** Julian (heat 3, consent-gated, fades), Maya, or alone.
8. **Pin the card:** CELESTE LAURENT. And under it the answer, GIVEN / DOCTORED / REFUSED, in her hand.

**What it must not do:**
- make Julian a trap, or Celeste's kindness about him a clue that he is hers. He is not;
- spend Adrian's name (Ch14's price), or make Celeste afraid (Ch14);
- let the order touch his body. She wants **where he will be**, not what he does there;
- resolve whether Evelynn tells him. That is Ch12–14's question, so this chapter's answers to the photograph hold
  the truth back.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** the orchid on her desk, and the black phone buzzing in her bag at his dinner table on a Friday
  night.
- **Erotic:** Celeste's appraisal across the silver domes, which is not a pass and is worse than one; and a chosen
  night with the man whose week she has just handed over, or refused to.
- **Fun:** doctoring a Group COO's diary so perfectly that the most dangerous woman in London believes it.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.term.*` | Ch7 | Celeste quotes one of them exactly: files ("including those signed by the Group COO"), firewall, or name |
| `exec.flat` | Ch7 | "You took his flat" / "You pay rent on a view. How moral." / "You kept your own little flat. I liked that." |
| `exec.file` | Ch8 | **told:** "He hasn't signed anything of ours since the spring. Somebody taught him to read." **pulled:** "Marcus has been looking for a document since April." **kept:** nothing, and a thought that she doesn't know |
| `exec.fav.diary`, `c8.x-clare`, `c8.x-midnight` | Ch8 | "You kept Marcus out of his diary." Clare's folder. The office floor at two in the morning ("How sweet. The cleaners talk.") |
| `exec.owes-sloane` | Ch8 | "You owe Sloane a favour. Everybody does, eventually." |
| `case.name`, `case.strength` | Ch9 | Whether she can put Celeste's own name on the table and make it land (the *case* opening) |
| `c6.friction-julian`, `c7.x-evening-outcome`, `c8.x-late-outcome` | Ch6–8 | The night scope |
| `c6.maya` | Ch6 | Maya's night |

---

## 3. Shape (phases)

`orchid → lindqvist → calendar → paper → week → night → complete`

The phase names avoid the shared Ch10 names (`breakfast / claimed / wall / order / answer / invitation`) and
Predator's (`ask / table / offer / floor / evening / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **orchid** | Monday · her desk, forty-one | A white orchid in a black pot, and a card: *Breakfast? Wednesday. The Lindqvist, seven. — C.* Facilities never saw it arrive. **go** / **make her come to forty-one** (Celeste arrives at Julian's reception at nine, in front of everyone, including Julian). |
| **lindqvist** | Wednesday 07:00 · the Lindqvist, or forty-one | The inventory (§2). Then, signing for breakfast: "Eat your eggs, Adrian." A moment: **composed** / **ask what she wants** / **walk out**. |
| **calendar** | the same table | "He's a lovely man. He'll never survive us. Unless you help me." The order and the black phone. The answer (§4). |
| **paper** | Wednesday noon · her doorway | The City pages: CELESTE LAURENT AND HELIX'S NEW CHIEF OF STAFF. Julian with the paper: "You didn't tell me you knew Celeste Laurent." (§4) |
| **week** | the week after | The answer plays out: the first Friday photograph; one moved meeting; or Gdańsk called early. At the end of the week, the Vesper invitation in his diary, in her hand. |
| **night** | Friday night | Julian, Maya, or alone. |
| **complete** | late · the wardrobe door | The card. Until Executive Ch11 exists, the road goes on through the in-development bridge to Ch14. |

---

## 4. The choices (with recommendations)

**The answer** (`exec.calendar`):
- **give:** every Friday at six she photographs his week and sends it to *C.* Celeste: "Thank you, darling. You've
  no idea how much trouble this will save him." It is the easiest thing she has ever done, and she hates how easy.
  Celeste's trust rises (`exec.celeste10 = trusted`).
- **doctor:** a true-looking week with one lie in it. She moves one meeting in the copy and not in the diary,
  Thursday's Morel & Cie call. On Thursday Marcus is waiting outside the wrong room, which is **the most fun beat in
  the chapter**. Celeste does not notice, or pretends not to (Ch11 can pay it off). `exec.celeste10 = fooled`. Ch14
  treats doctored like gave for "I knew about Friday", because a board date cannot be hidden.
- **refuse:** "His calendar is his." Celeste: "Of course, darling." Then the demonstration: within the week, a small
  L.S.F. facility on a shipping line in Gdańsk is called early. Julian loses a week of sleep and never learns why.
  Evelynn knows. A text from *C.*: "That was a small one. Friday?" The door stays open, and the cost is his, which
  is the point. `exec.celeste10 = refused`.

**The photograph** (`exec.paper10`). None of these tell him the order; that truth waits for Ch12–14.
- **paper-old:** "She knew me before. Before all this." True, and it frightens him a little, for you.
- **paper-work:** "She wanted to meet Helix's new chief of staff. Everyone does." He laughs, and believes it, and you
  watch him believe it.
- **paper-quiet:** "It was breakfast." He nods, and does not ask again. That is worse.

If `exec.file = told`, he adds, quietly: "Laurent." He doesn't say *Laurent Sovereign Fund*. He doesn't have to.

**The Vesper invitation** arrives on the Friday of the week, in his diary, which she runs: *Helix Group. The Vesper.
The first Thursday. — and do bring your chief of staff. C.L.* Julian: "I've never been asked before. Apparently I am
now." It is the thread to Ch11, where she is on the catalogue and he is in the room.

**The night** (the consent flow as on this road):
- **Julian:** the night scope if Ch6 warmed things or she has stayed with him before; otherwise no-sex or leave.
  With **give**, the black phone buzzes in her bag at six on his dinner table, and she lets it; the game lets her
  feel that without judging it.
- **Maya** (if back): she clocks the black phone at once. "That's not your phone. Whose leash is that?"
- **Alone:** the phone on the kitchen table, face down, like his photograph.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "A Lovely Man"** (the shared "She Knows" breakfast in Executive framing). Celeste is kind about Julian,
   which is the threat. *Recommended.*
2. **The summons is a white orchid on her desk on forty-one,** inside Helix, delivered by nobody. She goes, or makes
   Celeste come to Julian's floor, which is public and in front of him. *Recommended.*
3. **The Executive inventory:** her terms quoted exactly, the flat, what Celeste can know of the tray (told or
   pulled, **never kept**), Clare, and the office floor at two. Then "Adrian". *Recommended:* keeping *kept* secret
   makes Ch8's quiet choice her strongest card.
4. **The order is his calendar,** weekly, framed as protection ("so I can stand where Marcus would"): give, doctor,
   or refuse. The **refusal cost is Julian's**, non-sexual: a small facility in Gdańsk called early. Adrian's name is
   kept for Ch14. *Recommended.*
5. **Doctoring is the counterplay:** one moved meeting, and Marcus waiting outside the wrong room. Celeste may or may
   not have noticed (Ch11). *Recommended.*
6. **Julian with the City pages:** "You didn't tell me you knew Celeste Laurent." Three answers, none revealing the
   order; the truth waits for Ch12–14. *Recommended.*
7. **The Vesper invitation arrives in Julian's own diary** ("do bring your chief of staff"), and the night is
   Julian, Maya or alone (heat 3, consent-gated, fades). *Recommended.*
8. **Build shape:**
   - Ch10 is entered from an Executive `chapter9.complete`, replacing the Ch14 bridge there.
   - The Ch14 bridge moves to Ch10's end, reading "Chapters 11–13 in development".
   - Ch14's `exec.calendar` stops being a default and becomes real, and its "lovely man" line becomes a callback
     ("I told you at breakfast").
   - Three goldens (give, doctor, refuse), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

It reuses:
- the Lindqvist (Celebrity Ch10) and forty-one;
- the black phone insert, and the City-pages photograph insert (Predator Ch10) with new people in it.

New candidates:
- the white orchid on her desk at dawn (an insert);
- Celeste at Julian's reception, on the summoned path.

These go on the consolidated art list after the deepening passes, per the standing rule.
