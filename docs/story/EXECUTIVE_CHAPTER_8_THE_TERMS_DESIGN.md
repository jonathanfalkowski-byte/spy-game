# Executive · Chapter 8: "The Terms" (design)

**Act II · Executive route (lane id `executive`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4–4.5k on one path.**

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md), approved 2026-09-28.
  - §4 "8 · The Terms": three weeks in Julian's orbit, played as a hub of favours, each with a line between care and
    dependency. Marcus is the rival, Sloane sits across the table on the Axiom side, and the first Meridian name
    turns up in a Helix file Julian signs without reading.
  - §2 rules: Julian is never a trap; orders target his trust, never his body; the kept overlay is shown honestly
    and never punished.
- [EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md](EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md) (built, pass 1).
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) and [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md): executive
  players reach Chapter 9 through a Helix–Meridian counterparty document.

**Canon it stands on:**
- **Clause 14.3** (Predator Ch12): in Morel & Cie's term sheets, if a financed deal fails, L.S.F. Advisory takes
  first claim on Helix's own assets. Every Marcus Chen deal carried it.
- **L.S.F. Advisory** is the Laurent Sovereign Fund's vehicle and part-finances Marcus's acquisitions.
- **Julian's Ch7 confession:** he signs what Marcus gives him and doesn't always read it.
- **Ch7 details still open:** the empty office next door with its light left on; the photograph turned face down;
  Marcus's line "He never did keep them."

**Status: APPROVED (owner, 2026-09-28: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_8_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_8_SCRIPT.md); code: `src/content/chapter8-executive.ts`.
It is entered from an Executive `chapter7.complete`, hands on to the shared Chapter 9 bridge, and runs ~1.3–1.7k words
on one path.

---

## 1. The chapter's job

Chapter 7 gave her the job, three terms in her own words, and a key. Chapter 8 is **three weeks of being good at
it, next to a man who makes everything easy**. The route's question becomes a ledger: every favour he does her,
and every favour she does him, goes on it. The player keeps it, not the game.

It is the bright mirror of Predator Ch8:
- there, she pulls levers and a real person pays;
- here, she is handed things, and the only person who can pay is her.

By the end of the chapter the player must:

1. **Live three weeks in his orbit:** one favour a week, **three of five** (§4). Some are his to her, some hers to
   him, and each has three answers.
2. **See her terms at work.** Each of the five Ch7 terms changes at least one scene, so what she wrote now matters.
3. **Sit across from Sloane** at the Helix–Axiom dinner. It is the first time the woman who made her sees her
   wearing someone else's power. Marcus is at the table too.
4. **Find the first Meridian name:** clause 14.3 and L.S.F. Advisory, in a financing file on Julian's signature
   tray. What she does with it is the chapter's big choice, and the seed of Ch14.
5. **Choose the evening:** Julian, Maya, or alone with the ledger.
6. **Pin the second card:** what he has given, what she has paid for, and **L.S.F. ADVISORY · 14.3**, the thread to
   Chapter 9.

**What it must not do:**
- make a favour a hidden price. Julian's favours are exactly what they look like; the pressure is hers, not his;
- punish "kept": taking what he offers is a real, open choice, and the game never makes it a mistake;
- make Julian stupid. He signs unread because Marcus's paper is always clean and he trusts his own building. That is
  the flaw of a decent man, not a fool;
- reveal Celeste. Only the fund's name and its teeth.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** clause 14.3 under her thumb at midnight, with Marcus due at seven to collect the tray; and Sloane
  across a white tablecloth, smiling.
- **Erotic:** a man whose generosity is its own kind of seduction, and three weeks of wanting to say yes to all of
  it; an evening she can take further than Chapter 7 did, or not.
- **Fun:** she is running a Group COO's life, and she is brilliant at it.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.term.door` | Ch7 | Marcus's "people leave this floor" lands flat, and she can say so |
| `exec.term.firewall` | Ch7 | Adds a **work-only** answer to the card and the fixer favours: "That's the firewall." |
| `exec.term.name` | Ch7 | The card favour arrives as a question, not a parcel: Helix cannot style her unless she asks |
| `exec.term.veto` | Ch7 | At the dinner she chose how she is introduced to Axiom, so Sloane has to introduce herself |
| `exec.term.files` | Ch7 | She reads the tray by right and finds 14.3 herself. Without it she glimpses the tab as he signs, and has to ask |
| `exec.flat` (accepted / declined / paid) | Ch7 | Where she sleeps, where the car takes her, and the first line of the ledger |
| `exec.marcus` | Ch7 | How Marcus opens with her at the dinner |
| `c7.x-evening-outcome` | Ch7 | If she stayed with Julian, three weeks of being careful at work; and whether the night can go further (§5) |
| `c6.friction-julian` | Ch6 | As in Ch7 |
| `c5.published` | Ch5 | Which problem the fixer favour fixes (the press, or the landlord) |
| `c6.maya`, `own.cash` | Ch5–6 | Maya's evening; paying for things herself |
| `route.overlay` includes `kept` | Ch6 | The first line of the chapter admits it: she already knows she likes being looked after |

---

## 3. Shape (phases)

`orbit → favours → dinner → tray → late → complete`

The phase names avoid the Predator (`weeks / hub / friday / julian / evening`) and own-power names in the same scene.

| Phase | Place | Beat |
|---|---|---|
| **orbit** | the first days · forty-one | The lit empty office next door is hers now. She learns why the light was on: Julian left it on for eighteen months after his last chief of staff, **Clare Adeyemi**, walked out. Marcus made her job impossible, and Julian did not stop him in time. He says so plainly: "I didn't keep her. I'm not going to make that mistake twice." This answers Marcus's line honestly. Then the rhythm of the job: the 7:10 coffee, his diary, the way the floor goes quiet when she walks through it. |
| **favours** | weeks one to three | The hub: **three of five favours** (§4), one a week. Each is a short scene with three answers. |
| **dinner** | Thursday of week three · a private room | The Helix–Axiom dinner. Julian hosts, Axiom's delegation includes Sloane, and Marcus seats himself beside Evelynn. Sloane: "Chief of staff. Mr Mercer always did like people who used to be somebody else." One choice (§5). |
| **tray** | that night, 23:40 · Julian's desk | The signature tray: a Morel & Cie financing facility for a Marcus acquisition. Page thirty-one, clause 14.3, L.S.F. Advisory. The chapter's big choice (§5). At seven Marcus collects the tray: "Did he read it?" |
| **late** | the next night | Julian (consent-gated, heat 3, fades), Maya, or the ledger alone (§5). |
| **complete** | late · the wardrobe door | The second card, and the thread to Chapter 9. |

---

## 4. The five favours (the hub; three of five, one a week)

Each favour is a scene of about 300 words. The three answers are always **take it / meet it halfway / refuse it**,
worded to the scene. Taking one of *his* favours adds a line to the kept ledger; paying for it or refusing it adds
nothing. Doing one of *hers* adds to trust (`exec.trust`). Nothing is punished, and every answer is written as a
real choice with its own pleasure.

| # | Favour | Whose | The scene | Take / halfway / refuse | Terms that change it |
|---|---|---|---|---|---|
| 1 | **The car** | his → her | 01:10, after a deal closes. Hal, Julian's driver, is waiting at the kerb with the engine warm: "Mr Mercer's instructions. Any night you're past eleven." | **take** (the car, every late night, for good) / **once** ("Tonight. Not every night.") / **refuse** (the night bus, her feet killing her, and a strange happiness) | With `exec.flat = accepted`, Hal already knows the address, which is its own small shock |
| 2 | **The card** | his → her | The Axiom dinner is Thursday. A black Helix card, "for entertaining, and for what you'll need to wear to it." No limit is printed. | **take** (the dress, bought on his card; she looks extraordinary and knows whose she looks) / **work-only** (only with the firewall term: "That's the firewall." The card pays for the dinner, and she pays for the dress) / **refuse** (she buys her own; it costs her, from `own.cash`) | **name:** it arrives as a question, "Would you like Helix to…?", because her term says so |
| 3 | **The fixer** | his → her | Her problem, made to go away. With `c5.published`, the Sunday Courier is running a follow-up on "the Aster girl"; otherwise her landlord is selling and she has a month's notice. Julian: "I know a man. One call." | **take** (one call, and the problem is gone by Monday) / **his lawyer's name** (only with the firewall: advice, at her own expense) / **refuse** (she handles it herself, worse and slower, and it is hers) | **firewall** |
| 4 | **The diary** | her → him | Marcus wants thirty minutes in Julian's diary on Friday, "about Rotterdam", and Julian does not want to give them. She owns the diary now. | **hold the door** (Marcus is refused, by her; he remembers) / **give it, and sit in** (Marcus gets his thirty minutes with her in the room, taking notes) / **trade it** (thirty minutes for the Rotterdam file, a day early) | **door:** Marcus's "people leave this floor" gets "I know. It's in my contract." This seeds the Ch10 order (Celeste will want this diary) |
| 5 | **The paper** | her → him | His board paper is due at nine and is wrong at eleven. She rewrites it overnight on his sofa, in his shirt-sleeved company, and it is the best thing either of them has put in front of the board. | **his name** (it goes in as his; he knows) / **ours** (a footnote: "with E. Vale") / **mine** (it goes in under her name, and the board meets her) | — |

**The ledger.** `exec.kept` counts what she has taken unpaid across Ch7–8: the flat if accepted, plus the car, the
card and the fixer if taken. It is never a meter on screen. It appears only on the card at the end, as a list in
her hand: what he gave, and what she paid for. Later chapters read it honestly. The exit ending costs more to walk
away from if she has more of his; that is a cost, not a punishment.

---

## 5. The choices beyond the hub (with recommendations)

**The dinner** (`exec.sloane8`). Sloane across the table, Marcus beside her. With the **veto** term, Evelynn chose
her own introduction, so Sloane has to introduce herself, which she visibly dislikes.
- **sloane-cold:** "We've met." Nothing more. Sloane is amused, and wary.
- **sloane-civil:** perfect manners, all evening. Sloane is impressed and says so in the cloakroom: "You've learned
  to hold a room. I wonder who taught you."
- **sloane-deal:** the cloakroom. Sloane offers to tell her something about Helix's money, "and you'll owe me."
  She can take it (the name **L.S.F.** arrives a night early, from Sloane, and she owes Sloane one: `exec.owes-sloane`)
  or walk away. This is the first taste of an order that targets Julian's trust, and refusing it costs nothing.

Marcus opens by Ch7's `exec.marcus`: he is needling if she answered him, charming if she smiled, and wary if she
asked about the others.

**The tray** (`exec.file`). This is the big choice. At 23:40 she is alone at his desk with tomorrow's tray. The
Morel & Cie facility is for Marcus's next acquisition. With the **files** term she reads it by right, down to page
thirty-one. Without it she sees the L.S.F. tab as he signs it that afternoon, and has to go back for it.
- **file-tell:** she wakes him with a phone call at midnight. He reads it on the phone, twice, and goes quiet: "I've
  signed this clause eleven times." He does not sign the twelfth. Trust up. The seed of the ending where she and
  Julian enforce the term together.
- **file-keep:** she copies page thirty-one and says nothing yet. It is not a betrayal but a card held: she wants to
  know whose fund it is before she hands him something that could sink him. He signs in the morning.
- **file-pull:** she takes the file off the tray and puts it in her own drawer. At seven Marcus comes for it, finds
  it missing, and looks at her for a long time. The rivalry is now open (`exec.marcus8 = open`). Julian never knows
  it was there.

On every path the note (fact `c8.x-file`) records clause 14.3 and L.S.F. Advisory.

**Late** (the consent flow as in Ch7):
- **Julian:** offered on every road, even if Ch6 cooled things: three weeks next to him is time enough. The
  "stay the night" scope is offered if Ch6 warmed things, **or** if she stayed with him in Ch7. Otherwise it is
  "not sex tonight" or leave. Then stop / stay; the scene fades.
  - If she told him about the file, he is tender and a little frightened.
  - If she kept it, she carries it into his bed, and the game lets her feel that, without judgment.
- **Maya** (if restored): "Well? Good, or clever?" "Good. It's the rest of the building that's clever."
- **Alone:** the kitchen table, or the flat on the river, and the ledger in her own hand.

---

## 6. Decisions for the owner (recommendation first)

1. **The hub is three of five favours, one a week.** Two are his to her (the car, the card), one is a fixer, and
   two are hers to him (the diary, the paper). Each is take / halfway / refuse. *Recommended.* It mirrors Predator's
   lever hub, turned inside out.
2. **The kept ledger (`exec.kept`) is never a meter on screen,** only a list on the card, and it is read honestly
   later (the exit ending costs more the more she holds), never punished. *Recommended.*
3. **Each Ch7 term pays off in at least one scene:**
   - door: the diary;
   - firewall: the card and the fixer;
   - name: the card;
   - veto: the dinner;
   - files: the tray.

   *Recommended.*
4. **The lit office was Clare Adeyemi's,** his last chief of staff, driven out by Marcus. Julian didn't keep her and
   says so. *Recommended:* it answers "He never did keep them" honestly, and makes Marcus the rival without making
   Julian a trap. The photograph stays turned face down for a later chapter.
5. **The first Meridian name is clause 14.3 and L.S.F. Advisory, on Julian's tray:** tell him, keep it, or pull the
   file. *Recommended:* tell him seeds the "term enforced" ending, keep it holds a card for Ch14, and pulling it opens
   the war with Marcus.
6. **Sloane's cloakroom deal** gives L.S.F. a night early in exchange for a debt to Sloane. It is optional,
   refusable, and non-sexual. *Recommended:* it is the first order that targets his trust, a whisper of Ch10.
7. **The Julian evening is offered even if Ch6 cooled things.** The night scope opens if Ch6 warmed things or she
   stayed with him in Ch7. Heat 3; the consent flow; it fades. *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter7.complete` ("Three weeks in his orbit");
   - hands on to the shared Chapter 9 ("Follow the counterparty": L.S.F. Advisory), as Predator Ch8 does;
   - three goldens:
     - **kept** (take all three, Julian, stay);
     - **owes nothing** (refuse or halfway, file-tell, alone);
     - **rival** (file-pull, sloane-deal, Maya);
   - neutral picks for migration.

   *Recommended.*

---

## 7. Art impact

It reuses:
- Julian's forty-first floor (`helixSuite`) and her office next door (`helixWorkroom`);
- the car (`car`), the private dinner (`privateDinner`) and the flat at night (`apartmentNight`).

New candidates:
- the signature tray at midnight (a desk close-up);
- Hal and the black car at 01:10;
- the dress on the card (Evelynn styled, dark noir).

Per the standing rule, these go on the consolidated art list only once the deepening passes are done.
