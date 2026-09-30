# Institutional · Chapter 8: "Scope" (design)

**Act II · Institutional route (lane id `institutional`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4–4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md), approved 2026-09-29:
  - §4 "8 · Scope": three weeks on Axiom's books, played as a hub of **taskings**, each a scope dispute, a report
    she can shade, a line between protection and ownership; Benton, who holds Adrian's name; Maya in compliance;
    Daniel; the first Meridian name in an Axiom file Sloane handles herself;
  - §2 rules: Sloane is never a romance; monitoring is never sexualised; Daniel is never deceived into intimacy;
    orders come through channels and are non-sexual; refusing a directive has an institutional cost, never a sexual
    one.
- [INSTITUTIONAL_CHAPTER_7_LEVEL_71_DESIGN.md](INSTITUTIONAL_CHAPTER_7_LEVEL_71_DESIGN.md) (built and deepened).
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §3–4: institutional players reach the truth **through
  Sloane's cover**; the prior Evelyn was "burned then inventoried".
- The cast: **Rook** is the "Unknown sender" (`characters.ts`), an anonymous source who reaches her with selective,
  unrequested information.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): heat 3, consent in character, fades; partners mostly men.

**Canon it stands on:**
- The Ch7 scope terms she wrote (`inst.scope.*`: refusal, record, name, backup, people), with Sloane's pencil.
- Benton at his door (`inst.benton`: cool / adrian / silent), Adrian's desk kept or moved (`inst.desk`), Daniel's
  first morning (`inst.daniel`: warm / tie / work).
- The file number AX-7A, and the first message, "Welcome home, 7A." (`c7.i-message`), sender unknown.
- The woman in the ivory jacket, "someone the vendor told us was retired" (`c7.i-photo`).

**Status: DESIGN for owner approval.** Nothing is built yet.

---

## 1. The chapter's job

Chapter 7 put her on Axiom's books. Chapter 8 is **three weeks of being an operative**: the rota, the taskings, the
monthly file, and the slow discovery that every scope term she wrote is going to be tested, one by one, by people who
read it too. It is the institutional mirror of Executive Ch8's favours: there, a good man hands her things; here, a
machine hands her work, and each tasking asks **how much of herself she reports**.

By the end of the chapter the player must:

1. **Learn the rhythm:** 07:40 at the gate, the broken coffee machine, Daniel's terrible ties, the grey envelopes
   from seventy-one. And the second message from the unknown number: "Ask Records for E.V. (I)."
2. **Work three of five taskings** (§4), one a week. Each has three answers, and each scope term she wrote changes at
   least one of them.
3. **Pull the Project Eve file from Records**, on Sloane's order, with Sloane herself outside as backup, and find
   the first Meridian name: **MERIDIAN HOLDINGS · VENDOR**, and a delivery note, **LEGEND E.V. (II). PRIOR INSTANCE
   RETIRED · SINGAPORE.** What she does with it is the chapter's big choice.
4. **Sit in the back of Sloane's car** while Sloane reads it under the reading light, and hear the one true thing
   Sloane knows: "You're the second. I didn't know there was a first until the week I met you."
5. **Choose the evening:** Daniel (and, if she wants, the telling), Maya, a partner from before, or alone with what
   she kept.
6. **Pin the second card:** TASKED / DONE / REFUSED, and **MERIDIAN · E.V. (I) · RETIRED**, the thread to Chapter 9.

**What it must not do:**
- make a tasking sexual, or put her body on the scope. Every tasking is paper, people, or a room with backup outside;
- punish the refusal term: a refused tasking costs a note on her file and a cold week from Benton, never her safety;
- reveal Celeste. Only Meridian's name, and the word "retired";
- let Daniel be taken to bed under a false name. If she tells him, he asks for a day, and gets it.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** Records at ten at night with the lights on timers, a file with her face in it, and her handler
  parked outside with the engine running.
- **Erotic:** Sloane under a car's reading light, a hand's width away, reading about the woman sitting beside her;
  Daniel at the Feathers, closer every week, not knowing why; a night she chooses with someone from before.
- **Fun:** she is better at Adrian's job than Adrian was, and everyone on the floor has started to notice.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `inst.scope.refusal` | Ch7 | A tasking can be declined "under scope", at no cost but a note. Without it, refusing a tasking needs a reason Sloane accepts, and costs a hearing |
| `inst.scope.record` | Ch7 | The monthly file review happens: she reads her own log, and finds entries she did not know about (§4) |
| `inst.scope.name` | Ch7 | Benton's errand bounces off the seal, and she can say so |
| `inst.scope.backup` | Ch7 | Records is done with Sloane outside, a number that answers; without it, Records is done alone |
| `inst.scope.people` | Ch7 | The Maya tasking arrives and is withdrawn "as written" |
| `inst.benton` | Ch7 | How Benton opens his errand: warily (cool), knowingly (adrian), or through Sloane (silent) |
| `inst.desk`, `inst.daniel` | Ch7 | Daniel's weeks: at Adrian's desk the report fix lands harder; the tie line has him watching her |
| `c7.i-message`, `c7.i-photo` | Ch7 | The second message; the ivory jacket; whether she already asked who the woman was |
| `c6.resolve-action`, `c6.oracle-seen` | Ch6 | Whether she can press Sloane with ORACLE in the car |
| `c6.maya`, the shared evening-partner check | Ch4–7 | The evening options |

---

## 3. Shape (phases)

`rota → tasked → records → backseat → afterhours → complete`

The phase names avoid the shared Ch8 names (`cost / work / maintenance / fireescape / leverage / advance / emerald /
wake / close / call / complete`), Predator's (`weeks / hub / friday / julian / evening`) and Executive's (`orbit /
favours / dinner / tray / late`).

| Phase | Place | Beat |
|---|---|---|
| **rota** | week one · Strategic Intelligence | The rhythm of the job. The first grey envelope from seventy-one. With the record term, the monthly file review (§4). Then, at 23:02, the unknown number again: **"Ask Records for E.V. (I)."** |
| **tasked** | weeks one to three | The hub: **three of five taskings** (§4), one a week, each with three answers. |
| **records** | Thursday of week three, 22:10 · Records, Level B2 | Sloane's own order: "Pull the Project Eve procurement file. I want to read what we bought." The lights on timers. With the backup term, Sloane is in the car outside, on the line. The file: MERIDIAN HOLDINGS · VENDOR; the ORACLE page; and a delivery note: LEGEND E.V. (II). PRIOR INSTANCE RETIRED · SINGAPORE. The big choice (§5). |
| **backseat** | 22:50 · the back of Sloane's car | Sloane reads it under the reading light, a hand's width away. "You're the second. I didn't know there was a first until the week I met you." One choice (§5). |
| **afterhours** | Friday night | Daniel at the Feathers (and the telling, if she chooses), Maya, a partner from before (heat 3, consent flow, at his place, fades), or alone with what she kept. |
| **complete** | late · the wardrobe door | The second card, and the thread to Chapter 9. |

---

## 4. The five taskings (the hub; three of five, one a week)

Each is a scene of about 300 words, with three answers, always some version of **by the book / shade it / refuse
it**. Reporting everything builds Sloane's trust (`inst.trust`); shading builds Evelynn's own file (`inst.kept`,
what she knows and they don't); refusing uses the scope. Nothing is punished beyond the institutional costs named.

| # | Tasking | The scene | By the book / shade / refuse | Terms that change it |
|---|---|---|---|---|
| 1 | **The debrief** | A frightened junior analyst from a rival firm wants to sell a file. A hotel room at noon, Evelynn across a small table, backup in the corridor. He has a daughter's drawing in his wallet and hands that shake. | **full report** (everything, including the daughter; Sloane: "Thorough.") / **shade it** (the file goes up; the daughter doesn't) / **refuse** (she walks him out and tells him to go home) | **backup:** a named man in the corridor, a knock that means "time" |
| 2 | **The compliance question** | "Compliance is asking about my department. Tell me what Maya Reyes is asking about." | **tell Sloane** (what Maya is asking; Maya never knows) / **shade it** (the shape, not the names) / **refuse** | **people:** the tasking is withdrawn the moment she points at the page. Sloane: "As written." It costs nothing, and Sloane respects it |
| 3 | **Benton's errand** | Benton, off scope, at her desk with his slate: a copy of Sloane's tasking log, "for the review". The first loyalty test, and the seed of the Ch10 order (Celeste will want the same log). | **refuse him** (he remembers) / **tell Sloane** (Sloane: "Give him what he asked for. I'll tell you which version.") / **feed him a doctored copy** (dangerous, delicious, and Sloane finds out and says nothing) | **name:** he tries to trade it for a look at Adrian's file; the seal holds, and she can tell him so |
| 4 | **Daniel's report** | 23:00, Daniel's Novagen risk note is wrong and due at nine. She can see exactly where, because Adrian used to fix it. | **fix it silently** (the way Adrian did; he comes in at eight and stares at it) / **fix it and tell him** ("Your renewal date. Page four.") / **let it stand** (it's his work; Benton sends it back) | **desk:** at Adrian's own desk the silent fix is the one that nearly gives her away: "Somebody used to do this." |
| 5 | **The monthly file** | Her own file, the log of her own life, on the first working day. Entries she knew about, and two she didn't: "22:14 · subject taped hall camera. Logged. No action. — V.S." and "Personnel file A. VALE · accessed · E. BENTON · 3×." | **confront Sloane** (about Benton) / **log it back** (she writes her own entry in the margin: "Subject noticed.") / **say nothing** (and remember) | **record:** only offered with the record term. Without it she hears about the Benton access from Maya, over coffee, a week late |

**Refusal without the term:** refusing a tasking needs a reason Sloane accepts, and costs a hearing on Level 71: an
hour on the carpet, a note on the file, a week of silence. It is institutional, and never threatens her body, her
cover or her people.

---

## 5. The choices beyond the hub (with recommendations)

**Records** (`inst.file`), the chapter's big choice:
- **intact:** she hands Sloane the file untouched. Sloane's trust, and Sloane's knowledge; nothing kept.
- **copy:** she photographs every page first, on the phone Axiom gave her, which logs it, or on her own, which
  doesn't. She keeps what they keep.
- **hold back the note:** she takes the delivery note, E.V. (II) · PRIOR INSTANCE RETIRED, out of the file and into
  her coat. Sloane will notice a page missing. The question is when.

**The back seat** (`inst.car`):
- **press:** with ORACLE (`c6.oracle-seen`): "You read that I'd slip, and you signed for me anyway." Sloane: "I read
  that the vendor's system thought so. I've been wrong less often than their system." The first crack in her.
- **ask:** "Who was the first?" Sloane: "Someone the vendor told us was retired. Now I've read the word twice, and I
  don't like it any better."
- **get out:** she gets out at the lights, a street early, and walks. Sloane lets her.

**The evening** (`c8.i-evening`):
- **Daniel:** the Feathers, the third Friday. He tells her somebody fixed his report in the night the way a man he
  used to sit beside did. Then the choice:
  - **tell him** (who she was). He goes very quiet, and asks for a day, and she gives it. Nothing happens tonight.
    This opens Daniel as a partner from Ch10 on (`inst.daniel-told`);
  - **not yet.** They walk to the tram. He doesn't lean in. She wishes he had.
- **Maya:** what Benton is doing with Adrian's file.
- **a partner from before:** at his place; heat 3; the consent flow; fades.
- **alone:** with the copy, or the note, or nothing.

**The Rook thread** (`c7.i-message`, `c8.i-message`): the second message, "Ask Records for E.V. (I).", is from the same
unknown number. It is Rook (the Unknown sender), reaching into the Institutional road the way Rook reaches every road.
If she forwarded the first to Sloane, Sloane now says: "Still not us. Somebody wants you in Records. So do I. That's
what worries me."

---

## 6. Decisions for the owner (recommendation first)

1. **Title "Scope":** three weeks of taskings, the institutional mirror of Executive's favours. *Recommended.*
2. **Five taskings, three of five** (the debrief, the compliance question, Benton's errand, Daniel's report, the
   monthly file), each testing a scope term. *Recommended.*
3. **Refusal without the term costs a hearing, never safety;** with it, a note. *Recommended.*
4. **The first Meridian name in Records,** on Sloane's order, with Sloane as backup outside: MERIDIAN HOLDINGS ·
   VENDOR, and LEGEND E.V. (II) · PRIOR INSTANCE RETIRED · SINGAPORE. Intact / copy / hold back the note.
   *Recommended.*
5. **The back seat:** Sloane reads it a hand's width away; "You're the second." Press / ask / get out. *Recommended.*
6. **The unknown number is Rook** ("Ask Records for E.V. (I)."), threading the Outside route's source through this
   one. *Recommended.* Alternative: keep the sender unnamed on this road.
7. **Daniel's telling is available from Ch8,** at the Feathers. He asks for a day; nothing happens that night; it
   opens him as a partner from Ch10. *Recommended.* Alternative: hold the telling for its own scene in Ch10.
8. **Build shape:**
   - entered from an Institutional `chapter7.complete`;
   - hands on to the shared Ch9 bridge ("Follow the vendor: Meridian Holdings.");
   - keys under `inst.*` and `c8.i-*`; choice ids `i8-`;
   - goldens (by the book + intact; shaded + copy; refusals + the note held back), with neutral picks and a real-save
     authentication test.

   *Recommended.*

---

## 7. Art impact

New:
- Records, Level B2, at night, the lights on timers (a new master);
- the back of Sloane's car under the reading light (an intimate two-shot, nothing touched);
- the Feathers, the Axiom pub across the road;
- inserts: the delivery note, LEGEND E.V. (II), and the monthly log with "22:14 · subject taped hall camera".

Dark noir. These go on the consolidated art list after the deepening passes, per the standing rule.
