# Institutional · Chapter 16: "Reasonable Notice" (design)

**Act IV · Institutional route (lane id `institutional`) · the shared approach ("The Approach"), with Institutional
framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md) §4 ("IV · 16–18: shared, Institutional-flavoured")
  and §5, the Institutional positions:
  - **terms from inside:** Axiom, as Meridian's client, terminates the Project Eve contract for defect, with the
    ORACLE verdict in the file and Sloane as the officer who raised it. Evelynn keeps Axiom's protection, a desk and a
    rank, and **is known**. The strongest ending; it needs Sloane as an ally;
  - **through channels:** the whistle. Maya's compliance wing and a regulator, the slow formal way. Meridian is
    wounded in writing; Axiom survives by being the one that reported it. She keeps her protection and loses her rank;
  - **walk with what you know:** she refuses the last directive and walks out of Axiom with the file in her head,
    unprotected and free;
  - **Nell's name** (shared across routes).
- §2 rules: Sloane is never a romance (her charge is attention and power); monitoring is never sexualised; Daniel is
  never deceived into intimacy and is a partner only after he has been told (`inst.daniel-told`).
- [CHAPTER_16_THE_APPROACH_DESIGN.md](CHAPTER_16_THE_APPROACH_DESIGN.md), the shared spine and its canon: Thursday
  from first light to the Vesper's door; the case reviewed honestly as `act4.case`; **the aim**, which Chapter 18
  turns into her position; who comes (two inside, one outside); the first card and **the one held back**; armour
  (heat 1–2 at most, chosen); the arrival; the doorman's "Good luck, Ms Vale"; the long room, where Celeste stands "as
  herself".
- [EXECUTIVE_CHAPTER_16_THE_TERM_DESIGN.md](EXECUTIVE_CHAPTER_16_THE_TERM_DESIGN.md), the pattern for a lane variant.
- The autonomy law: no aim, name or action is gated behind an ally or intimacy except where the position itself is
  made of one (terms from inside is Sloane's report; that is what the route design says). **Walk and Nell are always
  open.** The free-agent core can walk in alone; it only costs more.

**Continuity it must honour** (built Institutional chapters):
- **Ch15:** `inst.client-file` (always: every receipt, E.V. (II) delivered, 9C pending); `inst.priya15` (tear / keep
  / give); `inst.took15` (adrian / cards / nell); `inst.cost15` (ally / **badge**: she resigned her commission and
  handed it to Terry / money / sloane: on the record, directorate lost); `inst.crew15`, `inst.way15`; `act3.leash =
  broken`, `act3.switch`, `act3.ally.*`, `act3.black-phone`; `c15.i-mon` (the charcoal suit), `c15.i-page`,
  `c15.i-orchid`.
- **Ch14:** `inst.way14` (ally: Sloane reinstated, bounded / proof: Adrian's name on the record by her own hand,
  Axiom's witness, not its operative / cut: Sloane resigned, **Benton her handler**); `inst.authority`
  (formal / regulator / benton); `inst.benton-exposed` (Benton walked out of the inquiry between two of Maya's people).
- **Ch13:** `inst.channel13`, `c13.answer`, `act3.ally.marsh`, `c13.card`, `inst.card-where13`, `inst.maya13`.
- **Ch12:** `inst.report12` (what went in her report), `inst.nora12`.
- **Ch11:** `inst.pen11` (whether Sloane countersigned 9C), `inst.iris11`.
- **Ch10:** `inst.log10` (Sloane's tasking log). **Ch8:** `inst.file` (the Records note or copy), `c8.i-dark`
  (the empty PROJECT EVE (I) box). **Ch7:** the scope (`inst.scope.*`), the green light in the hall, Terry, Daniel's
  "Hi. Daniel.", the first card: VICTORIA SLOANE. HANDLER. AX-7A. / WHO IS WATCHING HER?

**Status: APPROVED (owner, 2026-09-30: "approved", all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/INSTITUTIONAL_CHAPTER_16_SCRIPT.md](scripts/INSTITUTIONAL_CHAPTER_16_SCRIPT.md); code:
`src/content/chapter16-institutional.ts`. Entered from an Institutional `chapter15.complete`; Ch17 follows directly.
It ran ~0.83–1.09k words on one path at pass 1, deepened 2026-09-30 to ~0.97–1.35k with three moments: five past five, Celeste's reply to the notice, and the last look at the flat. Build note: the case bands are supported 4, strong 7, overwhelming 10 (the road's
evidence runs deep, and the lower Executive bands made nearly every save overwhelming).

---

## 1. The chapter's job

On every road Chapter 16 is the morning of the board. On the Institutional road it is the morning she decides **what
she wants Axiom to be when she walks out of that room:** the client that returns a defective product (inside), the
client that reports its vendor (channels), or nothing of hers at all (walk). Or none of that: a dead woman's name,
said out loud (Nell).

Its title is Sloane's line from Ch15, turned round: "Reasonable notice is twenty-four hours. I gave them twenty-three."
This time **Evelynn gives the notice**: at five in the morning, on Axiom paper or her own, she tells Meridian's board
that she is coming, and what for.

By the end of the chapter the player must:

1. **Lay out what she holds** at five in the morning, card by card, as a single honest strength (`act4.case`).
2. **Choose the aim** (`act4.aim`), which Chapter 18 turns into her position (§4).
3. **Give notice:** the one-line letter to the board, by the aim (§4), on Axiom paper (if she still has a commission)
   or her own.
4. **Choose who comes:** up to two inside and one outside (§5).
5. **Choose the first card and the one held back.**
6. **Dress for it** (heat 1–2, chosen and quiet).
7. **Arrive**, and walk into the long room, where the board sits under the empty frames and Celeste stands up "as
   herself". Chapter 17 begins in that room.

**What it must not do:** hold the confrontation (Ch17) or the ending (Ch18); rewrite what she did (logistics, not
biography); make Sloane a romance; put the green light, or anybody's watching, anywhere near the erotic; gate walk or
Nell behind anybody.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a formal notice served on the people who own you, at five in the morning, and a heist-planner's
  morning with the stakes of a trial.
- **Erotic:** chosen and quiet. Daniel (if he knows) doing up her cuffs with fingers that aren't quite steady, and
  "Come back and tell me everything. In order. With footnotes."
- **Fun:** walking up to the Vesper as **the client**, with a lanyard, a letter and a man from the Markets Authority
  in bicycle clips, at the building that catalogued her.

---

## 2. What it reads (the entry contract, Institutional values)

| Contract field | Institutional sources | Use |
|---|---|---|
| Evidence in custody | `inst.client-file` (always; the strongest card on this road: the vendor's own receipts, E.V. (II) delivered); `inst.priya15 = keep` (9C whole); `inst.took15` (Adrian's file / the 1109 safe / Nell's order signed C.); `c13.card`; `inst.file` (the Records note or copy); `inst.report12`; `inst.log10`; `act3.black-phone = keep` | What can go on the table |
| Witnesses | Sloane (`act3.sloane = allied`; after `cost15 = sloane`, on the record and without her directorate); Maya (always on this road: she chairs the inquiry since Ch14); Daniel (`inst.daniel-told`); Priya (`inst.priya15 = give`: told, and a witness if she chooses); Marsh (`act3.ally.marsh`); Nora (`act3.ally.nora`); Iris (`act3.ally.iris`) | Who can stand in the room |
| Authority | `inst.authority` (formal / regulator / benton); `inst.cost15 = badge` (no commission); `inst.benton-exposed` | Whose paper the notice is on; whether Benton comes with her |
| Act III | `act3.leash = broken`, `act3.switch` | The switch is live |

From these the chapter derives **`act4.case`** (thin / supported / strong / overwhelming), shown on the wall with its
reasons. On this road the client file is worth most: a client's receipts for the product, in the vendor's own
drawer. **Tearing 9C's receipt in Ch15 is honest in the count:** the file is one receipt shorter, and Priya is one
woman safer, and the wall says both.

---

## 3. Shape (phases)

`briefing → objective → detail → bundle → uniform → notice → complete`

The phase names avoid the shared Ch16 names (`dawn / aim / crew / table / dress / arrive`), Predator's (`floor / want /
beside / order / armour / door / room`) and Executive's (`layout / purpose / company / sequence / clasp /
embankment`).

| Phase | Place | Beat |
|---|---|---|
| **briefing** | Thursday 05:00 · the wall | Every card taken down and laid out on the floor like an Axiom briefing, in the order it will matter. The client file in the middle. The case, honestly, as a card of its own. The green light in the hall, if it is still on, watching her do it. |
| **objective** | 06:00 · the kitchen table | **The aim** (§4), and **the notice**: one line to the board, on whose paper she has. |
| **detail** | morning | Up to two inside, one outside (§5). Short scenes: Sloane on seventy-one with a lanyard in each hand; Maya with the inquiry's bundle and three highlighters; Daniel at the door with two coffees; Marsh with his clips; Priya with her careful fringe; Nora off the overnight flight; Iris from a station. Or nobody. |
| **bundle** | noon | **The first card** (the client file / Nell's order / the 1109 cards / page seven / on the cut road, the empty box), and **the one held back**. |
| **uniform** | 16:00 | **What she wears**, and who, if anyone, is there (heat 1–2). |
| **notice** | 17:45 | **The way in**, and the doorman: "Good luck, Ms Vale." |
| **complete** | 18:00 · the long room | The board under the empty frames. Celeste stands. Chapter 17 begins here. |

---

## 4. The aims (with recommendations)

`act4.aim`, which Chapter 18 turns into the Institutional position:

- **aim-inside** (*terms from inside*). Axiom, as the client, formally rejects the product as not fit for purpose,
  terminates the Project Eve contract for defect, and withdraws 9C. Sloane raises it as the officer of record, and
  Evelynn stays: protected, with a desk and a rank, and known. **Needs Sloane allied** (Ch14 ally). Otherwise closed,
  and the chapter says why in a line:
  - proof: "You made Victoria the proof, not the partner. She'll testify. She won't raise it.";
  - cut: "Victoria resigned on a Friday with a typed sheet. There's nobody on seventy-one who'd raise it."

  With `cost15 = badge`, inside still opens: the notice goes on her own paper, and the prize in Ch18 is her
  commission back, on terms she writes. With `cost15 = sloane`, Sloane raises it without her directorate, as a private
  officer on the record: the board finds that harder to ignore, not easier.
  - Notice: **"Axiom, as client, gives notice of a defect in the product supplied under the Project Eve contract. The
    product will attend."**
- **aim-channels** (*through channels*). The whistle: Maya's inquiry file to the board, and a regulator behind it.
  Meridian wounded in writing; Axiom survives by reporting first. **Always open on this road** (Maya's inquiry has
  existed since Ch14), and stronger with Marsh as an ally (the Markets Authority's notice to produce behind it).
  - Notice: **"Please find enclosed a copy of the inquiry's findings, which will be filed with the regulator at nine
    tomorrow. You may wish to read them first."**
- **aim-walk** (*walk with what you know*). She tells the board what she knows, refuses whatever it offers, and walks
  out of Axiom with the file in her head. **Always open.** It costs her Axiom's protection, and the chapter says so
  honestly. With `cost15 = badge`, it's already half done: "You handed Terry your badge a week ago. This is the other
  half."
  - Notice: **"I am coming to tell you what I know. I will not be staying."**
- **aim-nell** (*Nell's name*, shared). Nell's name said out loud in that room, by the woman who signed the order.
  **Always open.** Nora in the room, if she came.
  - Notice: **"Eleanor Linden. Six o'clock."**

---

## 5. Who comes (with recommendations)

Up to two **inside**, one **outside** (`act4.inside`, `act4.outside`):

- **Sloane** (allied): as the client's officer of record, "I have wanted to see the room upstairs for three years as
  well." After `cost15 = sloane`, as herself, without a directorate. **Never a romance:** the scene is two women who
  have watched each other for a year, one of them checking the other's collar from a doorway: "Collar." Evelynn fixes
  it herself.
- **Maya:** as the inquiry, with its bundle. "I've been waiting my whole career to serve a notice on somebody who
  deserves it."
- **Daniel** (told): as the man who said yes, that's him, in the inquiry (proof) or who knows (others). Inside, he
  carries the boxes.
- **Priya** (`priya15 = give`): only if Evelynn asks, and Priya may say no. If she comes: "Ask me next week whether I
  mean it" answered: "I've decided. I mean it."
- **Marsh** (ally): inside with his notice to produce, or outside with the switch.
- **Nora** (ally): off the overnight flight, for Nell.
- **Iris** (ally): outside, from a station, with the switch.
- **Benton** (the cut road, not exposed): he is not chosen. He **insists**, as her handler of record, on escorting
  "Axiom's asset" to the board, and she can accept (and use it: §6) or shut the door on him. This is Meridian's man
  walking her in, and she knows it.

If she chooses nobody, the chapter says it plainly: she goes alone, as she did into the Glass House.

---

## 6. The first card, the held card, armour, the way in (with recommendations)

**The cards** (`act4.first`, `act4.held`): **the client file** (always: "Did we know about 9C?" is its question);
**Nell's order** (took nell); **the 1109 cards** (took cards, or the card from Ch13); **page seven** (her own page, from
Ch15); **the empty box** (`c8.i-dark = torch`: PROJECT EVE (I), empty but for the outline of a file in the dust; the
card that lands on Benton if he is in the room). Or **nothing held**.

**Armour** (`act4.wear`): the charcoal suit (Ch15's mirror, if she dressed for the archive; otherwise first time); her
own black; or **the lanyard worn outside the coat**, like jewellery (only if she still has a commission). Who is
there, heat 1–2:
- **Daniel** (told): doing up her cuffs, fingers not quite steady. "Come back and tell me everything. In order. With
  footnotes." A kiss at the door if she chooses it; nothing more on the morning of the board;
- **Maya:** doing her hair, and a lecture on evidential chains while she does it;
- **Sloane:** from the doorway, "Collar." (never touching);
- **nobody:** the long mirror, and her own hands.

**The way in** (`act4.arrive`):
- **as the client** (formal authority, or inside aim): Axiom's car, the notice already served, the letter in her hand;
- **with a notice** (Marsh an ally): the Markets Authority's car, which is his bicycle, and hers is a taxi;
- **Benton's escort** (the cut road, if she accepts): his car, his slate, his pleasant silence, and her with the
  empty-box card in her coat;
- **the front door, alone:** always;
- **Celeste's car:** always; the shared canon's offer, sent at five.

The doorman: "Good luck, Ms Vale." On the notice path he adds, quietly, "They read it. Twice."

---

## 7. Decisions for the owner (recommendation first)

1. **Title "Reasonable Notice".** Sloane's clause 22 line turned round: this time Evelynn gives the notice.
   *Recommended.* Alternative: "The Client".
2. **The case** laid out honestly from the Institutional road's evidence, as `act4.case`; the client file counts for
   most; a torn 9C receipt is one card shorter and says why. *Recommended.*
3. **The aims are the Institutional positions:** inside (needs Sloane allied; closed aims say why), channels (always,
   stronger with Marsh), walk (always), Nell (always). Each comes with **a one-line notice** to the board.
   *Recommended.*
4. **Who comes:** up to two inside, one outside, from Sloane, Maya, Daniel (told), Priya (told, may refuse), Marsh,
   Nora, Iris. **Benton insists on the cut road** and can be accepted or refused. *Recommended.*
5. **The first card and the one held back:** the client file, Nell's order, the 1109 cards, page seven, or the empty
   box (from Ch8). *Recommended.*
6. **Armour:** the charcoal suit, her own black, or the lanyard worn like jewellery; Daniel at her cuffs ("With
   footnotes."), Maya at her hair, Sloane's "Collar." from the doorway, or nobody. Heat 1–2. *Recommended.*
7. **The way in:** as the client, with Marsh's notice, on Benton's escort (cut), the front door, or Celeste's car. The
   doorman: "Good luck, Ms Vale." *Recommended.*
8. **Build shape:**
   - entered from an Institutional `chapter15.complete`, with the Ch15 "[Chapters 16–18 …]" line gated on
     `VITE_EVE_CHAPTER16`;
   - its Act IV stop moves to Ch16's end ("Chapters 17–18 in development");
   - sets the shared `act4.*` keys (`aim`, `case`, `inside`, `outside`, `first`, `held`, `wear`, `arrive`) plus
     `act4.notice`, `act4.benton` (escort / refused / gone), so the Institutional Ch17–18 read the same contract as the
     other roads;
   - three goldens (inside with Sloane and Maya, channels with Marsh, walk alone on the cut road with Benton's escort
     refused), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 8. Art impact

It reuses the shared Ch16 set: the wall at dawn, the kitchen table, and the Embankment at 17:45. New candidates:
- **the notice**, an insert: one typed line on Axiom paper, and her signature;
- **Evelynn at the Vesper's door with a lanyard worn outside the coat**, Maya at her shoulder with the bundle.

Dark noir. These go on the consolidated art list after the deepening passes, per the standing rule.
