# Institutional · Chapter 7: "Level 71" (design)

**Act II · Institutional route (lane id `institutional`) · NEW**
**Budget: 0.8h / ~8k words across the chapter, ~4.5k on one path.** This is the Chapter 7 budget on every road.

**Authority:**
- [INSTITUTIONAL_ROUTE_DESIGN.md](INSTITUTIONAL_ROUTE_DESIGN.md), approved 2026-09-29:
  - §4 "7 · Level 71";
  - §2: Sloane is never a romance; monitoring is never sexualised; Daniel is never deceived into intimacy; orders
    come through channels and are non-sexual.
- [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md), the Institutional row: formal authority and real backup, at the cost
  of monitoring, scope disputes and loyalty expectations. The exits are to refuse a directive, leak a scope breach,
  or walk.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §4: Sloane is an officer who was handed a product her vendor's
  own system scored as uncontrollable.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): Mature 17+, heat 3, consent in character, fades; partners mostly men.

**Status: DESIGN for owner approval.** Nothing is built yet.

---

## 1. The chapter's job

Chapter 6 ended with Evelynn turning the Sloane arrangement back on Sloane, or holding it to its exact words. Chapter
7 **makes the arrangement official**, and puts her back where Adrian started: on Axiom's books, on Axiom's floor, at
Axiom's desk. It opens the route's question: **can you take a machine apart from inside it, when the machine is
watching?**

By the end of the chapter the player must:

1. **Walk into Axiom Tower as Evelyn**, through the gate Adrian badged through for eleven years.
2. **Be offered the job on Level 71**, by Sloane at her window. The offer is her answer to Chapter 6:
   - if Evelynn challenged her with the ORACLE assessment: "It says I can't hold you. So I won't try. I'll hire you.";
   - if Evelynn held her to her own words: "You read my terms back to me. Good. Let's write better ones."

   It is an operative's contract: a file number, a handler (Sloane), real backup, and the flat and its monitoring
   made official. And Sloane's rule, said out loud: "We don't watch that. I'm not that kind of officer, and neither
   will you be."
3. **Write her scope**: three of five terms, in her own words, each paying off later on the road (§4).
4. **Cross the Strategic Intelligence floor** at Sloane's side, past Benton's smoked-glass office. Benton comes to his
   door and looks at her face for a long time: "Ms Vale. I believe we've met." He holds Adrian's name, and he was the
   man in the room at the Glass House. **How she answers him.**
5. **Sit down at her desk. It is Adrian's.** Two desks from Daniel Kessler, who comes over to say hello to a stranger
   in a terrible tie. **How she meets him.**
6. **Choose the evening** in the flat that Axiom now watches officially: Daniel (a drink, as colleagues; nothing more,
   because he does not know yet), Maya, a chosen partner from before (heat 3, the consent flow, at his place), or
   nobody.
7. **Pin the first card:** VICTORIA SLOANE. HANDLER. Under it, in pencil: WHO IS WATCHING HER?

**What it must not do:**
- make Sloane a romance, or a boss the story defeats. She is an officer with a leash around her own neck;
- sexualise the monitoring, or put the bedroom on camera;
- let Daniel be seduced under a false name. In Ch7 he is a colleague and a friend, and the pull is there, unspoken;
- punish a refusal: she can refuse a term, the desk, Benton and the evening, and keep the job.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** walking past the man who holds Adrian's name, in the building where she was made, with a badge that
  says somebody else.
- **Erotic:** Sloane's long appraising attention, and a woman who returns it; Daniel not knowing why he can't stop
  looking at her; an evening she sets the edges of, in a flat she knows is listening.
- **Fun:** sitting at your own old desk, next to the man who used to steal your pens, and hearing what he really
  thought of you.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `c6.resolve-action` (`resolve-challenge` / `resolve-enforce`), `c6.exit-arrangement = sloane-institutional` | Ch6 | How Sloane opens the offer: the ORACLE fact she knows Evelynn holds, or her own terms read back to her |
| `c6.friction-sloane` (corrected / unanswered) | Ch6 | Whether Sloane trusts the narrow version Evelynn gave her, or is still guessing |
| `sloaneDoubts` (Benton named on a guess at the Glass House) | Ch2–3 | Sloane raises it again: "I don't build on luck." One scope term costs more |
| `c6.counter-arranged = monitored`, `c5.message-sloane`, `c5.service` | Ch5–6 | What Sloane has already seen (the meeting with Maya off-hours; the workspace note) |
| `mission.source`, `mission.reasoning` | Ch2–3 | Benton at the Glass House: what Evelynn knows about the man at the smoked-glass door |
| `c6.maya`, `c5.published` | Ch5–6 | Maya as the evening's other option; whether Daniel recognises her face from a magazine |
| the shared evening-partner check (Ch4–6 warmed or intimate outcomes) | Ch4–6 | Whether a chosen night with someone from before is on offer |

---

## 3. Shape (phases)

`gate → window → scope → crossing → desk → watched → card`

The phase names avoid the shared Ch7 names (`confirm / standing / held / street / lift / wardrobe / grey / pursue /
close / effects / night / summons / office / terms / corridor / floor / evening / complete`) and Executive's (`table /
fortyone / contract / hallway / key / tonight`).

| Phase | Place | Beat |
|---|---|---|
| **gate** | 07:40 · Axiom Tower, the staff entrance | A temporary badge at the desk in the name EVELYN VALE. The guard who said "Morning, Mr Vale" for eleven years says "Morning, madam." The lift she took three thousand times. |
| **window** | 08:00 · Level 71 | Sloane at the window, the city behind her. The offer, by Ch6 (§1.2), and what it is: a file number, a handler, backup, the flat made official. "We don't watch that." If `sloaneDoubts`: "You named Benton on a guess. You were right. I'm hiring the judgment, and I'll be watching for the luck." |
| **scope** | the contract | Three of five scope terms, in her own words (§4). Sloane signs each, and adds one line of her own to each, in the margin, in pencil. |
| **crossing** | 09:10 · Strategic Intelligence | The floor Adrian worked on. Benton at his smoked-glass door: "Ms Vale. I believe we've met." **benton-cool** ("I don't think so. I'd remember.") / **benton-adrian** (a phrase only Adrian used; he goes still) / **benton-silent** (let Sloane answer for her) |
| **desk** | 09:20 · the desk | Adrian's desk, cleared, with a plant somebody left. Sloane: "It's the only desk on the floor nobody wanted. And I wanted to see your face." Then Daniel, in a terrible tie: "Hi. Daniel. The last person at that desk read everything. No pressure." **daniel-warm** / **daniel-tie** ("That tie doesn't suit you." He goes still: somebody used to say that) / **daniel-work** (strictly professional) |
| **watched** | 19:00 · the flat | The flat, officially monitored now: a small camera in the hall with a green light, a new phone, a sealed envelope with her file number. The evening: **evening-daniel** (a drink, as colleagues; he talks about Adrian without knowing it; nothing more) / **evening-maya** (compliance, a decade of bad coffee; she is the one person in the building who might be on her side) / **evening-partner** (a chosen partner from Ch4–6, at his place, not hers; heat 3; the consent flow; fades) / **evening-alone** (she tapes over the hall camera's light and sits in the dark) |
| **card** | late · the wardrobe door | The first card of the road: VICTORIA SLOANE. HANDLER. In pencil beneath it: WHO IS WATCHING HER? |

---

## 4. The scope (with recommendations)

**The scope** (three of five; each pays off later; `inst.scope.*`):
- **the refusal:** she may refuse any single tasking, in writing, without penalty. It pays off in Ch13 (refuse the
  directive) and the "walk" ending. Sloane's pencil: *Once per tasking. Not once per career.*
- **the record:** she sees her own file, including the monitoring logs, every month. It pays off in Ch8 (a log that
  shows a night she was not told about) and Ch14. Sloane's pencil: *You'll wish you hadn't.*
- **the name:** Adrian Vale's file stays sealed, and nobody at Axiom is tasked against it. It pays off with Benton,
  who holds it, and in Ch15. Sloane's pencil: *I can seal it. I can't unread it for him.*
- **the backup:** every tasking has named backup, a number that answers. It pays off in Ch12 (Singapore) and Ch15
  (the van outside the Vesper). Sloane's pencil: *Mine. Always mine.*
- **her people:** nobody she loves is ever a tasking: not Maya, not Nora (later), not a partner. It pays off in Ch8
  and Ch13. Sloane's pencil: *Define "loves". No, don't. I'll take it as written.*

**The desk** is Adrian's, by Sloane's choice, and it is never punished if Evelynn asks for another: Sloane moves her
the next morning and says, "Fair."

**Benton** (`inst.benton`): **cool** / **adrian** / **silent**. The Adrian phrase is the most dangerous and the most
fun. Benton knows, and knows she knows he knows, and nobody says it.

**Daniel** (`inst.daniel`): **warm** / **tie** / **work**. The tie line is the one that nearly gives her away.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Level 71",** and the job: an operative's contract on Axiom's books with a file number, a handler, backup,
   and the flat's monitoring made official. Sloane's opening answers the Ch6 challenge or enforcement.
   *Recommended.*
2. **Sloane's rule, out loud: "We don't watch that."** Monitoring is never sexualised. *Recommended.*
3. **Three of five scope terms** (the refusal, the record, the name, the backup, her people), each with Sloane's
   pencilled line in the margin, each paying off later. *Recommended.*
4. **Benton at his door, "Ms Vale. I believe we've met."** He holds Adrian's name and was the man at the Glass House.
   She answers cool, as Adrian, or not at all. *Recommended.*
5. **Adrian's desk, two desks from Daniel.** Sloane chose it on purpose; she can ask for another, unpunished.
   *Recommended.*
6. **Daniel meets a stranger.** No romance yet (he doesn't know who she is); the tie line nearly gives her away.
   *Recommended.*
7. **The evening:** Daniel (a drink, as colleagues), Maya, a chosen partner from before (heat 3, consent flow, at his
   place, fades), or alone, taping over the camera light. *Recommended.*
8. **Build shape:**
   - entered from the Ch7 confirm when the road is `institutional`, replacing the in-development stop;
   - the road continues to the shared Ch9 bridge placeholder until Institutional Ch8 exists;
   - keys under `inst.*`; choice ids `i7-`;
   - goldens (challenged + the refusal term; enforced + the name term; doubted + the backup term), with neutral
     picks and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

New:
- Axiom Tower's staff gate at dawn, and the guard (a mirror of Ch1);
- Level 71, Sloane at the window, morning light (a new composition of an existing set);
- Adrian's desk as Evelynn's, with the plant;
- Daniel Kessler's cast sheet (a character entry, no art yet);
- the watched flat: the hall camera's green light.

Dark noir. These go on the consolidated art list after the deepening passes, per the standing rule.
