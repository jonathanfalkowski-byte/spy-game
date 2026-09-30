# Institutional · Chapter 14: "Officer of Record" (design)

**Act III · Institutional route (lane id `institutional`) · NEW (unique)**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md), approved 2026-09-29:
  - §4 "14 · Officer of Record": Sloane's turn, from inside; an internal inquiry opens in Maya's wing, and Sloane is
    the officer of record for a defective product; she confesses to her own operative, with the ORACLE verdict on
    the desk; **bounded ally**, **cut her loose**, or **make her the proof**; the route's payoff of authority;
  - §2 rules: Sloane is never a romance; monitoring is never sexualised; Daniel is never deceived into intimacy;
    orders are non-sexual; refusing has an institutional cost, never a sexual one.
- [CHAPTER_14_SLOANES_TURN_DESIGN.md](CHAPTER_14_SLOANES_TURN_DESIGN.md), the shared canon: Sloane's motive in her own
  words (handed Project Eve by Meridian with ORACLE's verdict already on it, "priced in", made the officer who would
  be blamed); Celeste's last order, with **Adrian Vale's name** as the threat she has held since Ch10; the three
  answers (`c14.answer = complied | refused | countered`) and the Act III keys Ch15 reads.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §4: on this lane Sloane can become a **bounded ally against
  Meridian**; she has the most to gain from exposing the defect that framed her, and the player can hold the ORACLE
  fact over her to force it.
- [EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md](EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md), the pattern: a unique
  Act III payoff built before its road's Ch10–13 variants, entered through an interim bridge, with three ways gated
  by what she built.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): heat 3, consent in character, fades; no sexual coercion (the reserved
  beat is Ch13).

**Canon it stands on (Institutional Ch7–8):**
- Her scope terms (`inst.scope.*`), Benton at his door (`inst.benton`), the desk and Daniel (`inst.desk`,
  `inst.daniel`, `inst.daniel-told`).
- Three weeks of taskings (`inst.task.*`, `inst.trust`, `inst.kept`, `inst.hearing`).
- Records: MERIDIAN HOLDINGS · VENDOR, and LEGEND E.V. (II) · PRIOR INSTANCE RETIRED · SINGAPORE (`inst.file`:
  intact / copy / note); the empty PROJECT EVE (I) box (`c8.i-dark = torch`); Benton reading Adrian's sealed file
  three times; the man under the street lamp.

**Status: DESIGN for owner approval.** Nothing is built yet.

---

## 1. The chapter's job

On the Celebrity road, Sloane turns up at Evelynn's door in the Glass House coat, the door not taken. On this road
**there is no door**: Sloane is Evelynn's handler, and the machine turns on both of them at once. An internal inquiry
opens into the Project Eve procurement, run from **Maya's compliance wing**, and the officer of record is suspended
overnight. Evelynn's grey envelopes stop. For the first time since Level 71 she has no handler, and Celeste has an
order for her: **give the inquiry Victoria Sloane.**

By the end of the chapter the player must:

1. **Hear the notice**, and lose her handler: Sloane suspended pending inquiry, her office sealed, the backup number
   ringing out.
2. **Hear Sloane's confession, as her operative** (shared canon, told on this road across a desk, not a doorway),
   with the ORACLE verdict and the board's signature on it. **What she does with Sloane:** hear her out, hold the
   ORACLE fact over her, or shut her out.
3. **Answer Celeste's last order:** tell the inquiry that Sloane knew about the placements. Take her chair by
   Christmas. Refuse, and **Adrian Vale's name** goes to the inquiry, the regulator and the press by Friday; Axiom
   will have no choice but to disown its operative; the flat goes.
4. **Face Maya across a table.** Maya is running the inquiry. With the *her people* term, nobody can task Evelynn
   against her, and nobody can task Maya against Evelynn; they meet as two professionals who have known each other
   for ten years in two bodies.
5. **Choose the way (§4)** and play it at the hearing on Friday, with Benton in the room.
6. **Choose the evening**, and pin the card: OFFICER OF RECORD, and how she goes into the Vesper next (Ch15): **with
   Axiom's formal authority, or without it.**

**What it must not do:**
- make Sloane a romance or a villain; she ends as a person in the machine, whichever way it goes;
- make any order or cost sexual. Adrian's name, the flat, the rank and the cover are the stakes;
- punish any way: each is a real position, and each keeps the road solvable;
- confront Celeste with the whole case (Act IV does that).

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a formal inquiry with a clock on it, her handler suspended, her friend in the chair, and Benton
  across the table, who has been reading her old name for a month.
- **Erotic:** the charge between two women who have watched each other since Level 71, now with nothing between them
  but a desk and the truth (attention, never touched); and a chosen night after, with Daniel if he knows, or someone
  from before.
- **Fun:** walking into an Axiom hearing room and putting the vendor's own verdict on the record, in triplicate,
  through the proper channel.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `inst.file` (intact / copy / note), `c6.oracle-seen`, `c9.lever`, `case.strength` | Ch6–9 | What she can put on the record: the ORACLE verdict, the delivery note, the procurement copy |
| `inst.trust`, `inst.kept`, `inst.task.*` | Ch8 | How Sloane speaks to her; whether Sloane trusts her enough to be an ally |
| `inst.car` (press / ask / out) | Ch8 | Whether the confession is the second half of a conversation begun in the car |
| `inst.scope.*` | Ch7 | **people:** Maya can't be tasked against her; **name:** Adrian's file is sealed (Celeste's threat bypasses the seal: it goes to the regulator, not to Axiom); **refusal:** refusing Celeste costs her rank but not her standing; **record:** she has seen Benton's three reads; **backup:** the backup number rings out, and she notices whose it was |
| `inst.benton`, `c8.i-dark = torch` | Ch7–8 | How Benton behaves at the hearing; the empty PROJECT EVE (I) box, and who took it (§5) |
| `inst.daniel-told`, `inst.daniel` | Ch7–8 | Daniel at the hearing and in the evening |
| `c6.maya` | Ch6 | How Maya sits across the table: a friend, or only a professional |
| `sloaneDoubts` | Ch2–3 | Sloane: "You guessed Benton. You were right. You're about to find out how right." |
| Ch10–13 Institutional keys (planned) | Ch10–13 | Read with defaults until those chapters exist (the interim bridge; §6) |

---

## 3. Shape (phases)

`notice → confession → wire → channels → hearing → dusk → complete`

The phase names avoid the shared Ch14 names (`door / order / maya / answer / sunday / after / complete`), the
Executive road's (`called / silence / truth / ways / boardroom / night`) and Predator's in the same scene.

| Phase | Place | Beat |
|---|---|---|
| **notice** | Monday, 08:05 · Strategic Intelligence | The floor goes quiet. An all-staff notice: a formal inquiry into the procurement of PROJECT EVE, led by Compliance (M. Reyes); the officer of record suspended pending. No grey envelope. The backup number rings out. A moment, how she hears it: **Maya in the stairwell**, off the record, for thirty seconds / **Daniel**, who reads it over her shoulder / **the screen**, alone (neutral). |
| **confession** | Monday, 22:00 · Level 71, Sloane's office, sealed with tape she steps over | Sloane packing nothing, because she is not allowed to touch anything. Her account (shared canon), across her own desk, to her own operative. The ORACLE verdict with the board's signature. If Evelynn kept the delivery note: Sloane knows, and says so. **hear / hold / shut** (§4). |
| **wire** | Tuesday · the black phone | Celeste's last order: give the inquiry Victoria. "Say she knew about the placements. She didn't, poor thing, but nobody will believe that of an officer of record. You'll have her chair by Christmas." The threat: Adrian Vale's name to the inquiry, the regulator and the press by Friday. |
| **channels** | Wednesday · Compliance, a glass room | Maya across the table, formal, with a recorder she switches on in front of Evelynn. Then the three ways (§4), each gated by what she built, with two always available. |
| **hearing** | Friday, 10:00 · the inquiry room, Level 12 | Maya in the chair. Sloane at the end of the table, in graphite, alone. Benton as the directorate's witness. Daniel, called about "the analyst who sat at that desk". The way plays out. |
| **dusk** | Friday night | The cost comes due (§5), and the evening: Daniel (if he knows: the consent flow, at his place), Maya (off the record at last), a partner from before, or alone. |
| **complete** | late · the wardrobe door | The card: OFFICER OF RECORD, and the Vesper next, with Axiom's authority or without. |

---

## 4. The choices (with recommendations)

**What she does with Sloane** (`act3.sloane`, `c14.file`), in the sealed office:
- **hear:** she hears her out, and takes the verdict. A bounded truce: this week, nothing more. (`truce`; file yes)
- **hold:** she holds the ORACLE fact over her: "You read that I'd slip, and you signed for me anyway. You'll sign
  for the truth now." Sloane hands it over because she has to. (`held`; file yes)
- **shut:** she takes nothing from the woman who built the cage. The verdict stays with Sloane unless Evelynn already
  holds it (`inst.file` copy / note, or `c6.oracle-seen`). (`shut`)

**The way** (`inst.way14`, `c14.answer`), chosen in the glass room and played at the hearing:

| Way | Gate | At the hearing | Cost / answer |
|---|---|---|---|
| **The bounded ally** (the proof, with her) | Sloane **heard or held**, **and** evidence: the verdict (`c14.file`), the procurement copy or the note (`inst.file`), or ORACLE (`c6.oracle-seen`) | Sloane testifies that the defect was raised and "priced in" by the vendor, and Evelynn puts the verdict and the delivery note on the record through the proper channel. Maya enters them. The vendor knew. Then, if Evelynn found the empty box (`c8.i-dark = torch`), she asks the directorate's witness where the PROJECT EVE (I) file is; Benton cannot answer, and Maya sends two people to his office, who come back with it (§5). | Celeste is afraid for the first time, and says so, her way: a pause until her board meets. No burn. Sloane is cleared and reinstated, **bounded**: she owes Evelynn, and both of them know it. **Ch15 with Axiom's formal authority** (an audit of the Vesper archive, on paper). `countered`, `act3.sloane = allied` |
| **The proof** (herself) | **Always available** | No ally. Evelynn stands up in the inquiry room and says, for the record: "I am Project Eve. I was Adrian Vale. Ask me what the vendor sold you." She is the evidence. Sloane is cleared by it whether she likes it or not. Daniel, called about the analyst who sat at that desk, looks at her and says: "Yes. That's him." (Only if he knows; otherwise he says he can't be sure, and looks at her a long time.) | She refused the order, and spent Adrian's name herself, before Celeste could: the inquiry, the regulator and Axiom all have it (`act3.adrian-burned`, her own hand). Axiom keeps her, known, as the witness; the flat is withdrawn (`act3.home = lost`). **Ch15 without Axiom's authority**, but with a regulator's interest. `refused`, `act3.sloane = handed` |
| **Cut her loose** (the order) | **Always available** | Evelynn tells the inquiry what Celeste asked: that the officer of record knew. Sloane does not look at her once. She resigns in the room, before Maya can rule. Benton, satisfied, becomes Evelynn's handler of record. | Celeste is pleased: "You see? Nobody had to be unkind." Evelynn keeps her cover, her name, the flat, and the chair on seventy-one by Christmas, with Benton above her. **Ch15 with Axiom's authority, Benton's version.** `complied`, `act3.sloane = shut` |

**Maya** (`c14.maya-room`) in the glass room: **on the record** (she tells Maya the truth into the recorder) /
**off the record** (she asks Maya to switch it off; Maya does, once, and says "Thirty seconds") / **nothing** (she
answers only what is asked). With *her people*, Maya can't be tasked against her, and says so first: "Nobody gave me
you. I asked for this file myself."

---

## 5. The costs, and one reveal

**The PROJECT EVE (I) file** (on the ally way, if she found the empty box): it is in Benton's locked drawer. He has
been Meridian's man inside Axiom since before the Glass House (the meeting with Marcus that Sloane recorded), and he
took the first Evelyn's file the week Evelynn arrived, and read Adrian's three times, for the same people. Recommended
as canon: **Benton is Meridian's man inside Axiom.** He is suspended, not destroyed (Meridian is wounded, never
toppled).

**The cost table:**
- **ally:** nothing burned. Sloane owes her. Benton goes.
- **proof:** Adrian's name spent by her own hand; the flat; Axiom keeps her as a known witness, not an operative.
- **cut:** Sloane goes. Evelynn rises, under Benton. The road stays solvable, and colder.

---

## 6. Decisions for the owner (recommendation first)

1. **Title "Officer of Record":** an internal inquiry, run by Maya, with Sloane suspended and Evelynn without a handler.
   *Recommended.*
2. **Sloane's confession across her own sealed desk,** to her own operative (shared canon), with the ORACLE verdict:
   hear / hold / shut. *Recommended.*
3. **Celeste's last order: give the inquiry Victoria** ("say she knew about the placements"), with Adrian's name as the
   threat. *Recommended.*
4. **Maya runs the inquiry,** and meets Evelynn across a glass table: on the record, off it for thirty seconds, or
   nothing. *Recommended.*
5. **The three ways:** the bounded ally (gated: Sloane heard or held, plus evidence), the proof (herself: "I am
   Project Eve"), or cut her loose (the order). Each opens a different Ch15 entry (with authority, without, or with
   Benton's). *Recommended.*
6. **Benton is Meridian's man inside Axiom,** and he took the first Evelyn's file; revealed on the ally way if she
   found the empty box. *Recommended.* **Canon check:** on the Celebrity road's Ch15, Benton meets Adrian in a café
   and closes Axiom's review ("Nobody at Axiom is looking for anybody"). Under this reading that is self-interest,
   not kindness: he buries the trail that leads to him. It needs no rewrite, but it does fix how that scene reads.
   Alternative: leave who took the file open until Act IV, and Benton only a man who read a sealed file.
7. **Daniel at the hearing,** called about the analyst who sat at that desk: "Yes. That's him." if he knows; and a
   chosen night after (heat 3, the consent flow, at his place) only if he knows. *Recommended.*
8. **Build shape:**
   - Ch10–13 Institutional variants don't exist yet, so an **interim bridge** from an Institutional
     `chapter9.complete` ("This road's Act III chapters are in development") leads into Ch14, with Ch10–13 keys
     read at their defaults, exactly as Executive did;
   - writes the shared Act III keys Ch15 reads (`c14.answer`, `act3.sloane`, `c14.file`, `act3.adrian-burned`,
     `act3.home`, `act3.celeste-afraid`), plus `inst.way14`, `inst.authority`, `c14.i-*`;
   - three goldens (ally, proof, cut), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 7. Art impact

New:
- the inquiry room on Level 12 (a new master: a long table, a recorder, a window with the blinds half down);
- Sloane's sealed office at night, the tape across the door (a variant of Level 71);
- the glass room in Compliance, Maya with the recorder;
- an insert: the PROJECT EVE (I) file, recovered.

Dark noir. These go on the consolidated art list after the deepening passes, per the standing rule.
