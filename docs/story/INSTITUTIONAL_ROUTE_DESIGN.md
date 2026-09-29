# The Institutional route: design (for owner approval)

**Status: APPROVED (owner, 2026-09-29: all eight decisions as recommended).** No lane-split change is needed. Each
chapter gets its own design doc before build, starting with Ch7, "Level 71". Written 2026-09-29 as the next route after
Executive (Celebrity, Predator and Executive are complete, Ch7–18).

**Authority:**
- [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md), the Institutional row:
  - reached through Sloane ties (`c5.message-sloane`, `service = axiom`), the institutional exit arrangement, and a
    Ch6 `challenge-Sloane` or `enforce` that engages the arrangement rather than breaking it;
  - it offers operational infrastructure, formal authority and real backup;
  - it costs monitoring, scope disputes and loyalty expectations;
  - its exits are to refuse a directive, leak a scope breach, or walk with what you know.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md):
  - §3: institutional players reach Celeste **through Sloane's cover**;
  - §4: on this lane **Sloane can become a bounded ally against Meridian**. She has the most to gain from exposing
    the ORACLE defect that framed her, and the player can hold that fact over her to force it;
  - §7: the position is to **force terms from inside**, with Sloane as a bounded ally. Adrian keeps institutional
    protection, but is known.
- The canon cast (`src/content/characters.ts`):
  - **Victoria Sloane**, Director of Executive Intelligence, Level 71;
  - **Elias Benton**, Adrian's supervisor for four years;
  - **Daniel Kessler**, two desks over from Adrian for four years;
  - **Maya Reyes**, compliance, a decade of bad coffee;
  - Axiom is **Meridian's client**, and Sloane is the client's officer of record for Project Eve.
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) and [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md), the
  pattern: unique chapters where the route is itself, shared spines elsewhere with route framing, and a variant
  module per chapter.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): Mature 17+, heat 3, consent in character, fades. The reserved
  coercion beat stays Ch13 (shared, off screen). Partners are mostly men.

---

## 1. The route in one paragraph

On the Celebrity road Evelynn builds a life outside every machine. On the Executive road she is given Helix's rooms.
On the **Institutional** road she **goes back inside the machine that made her.** Axiom, where Adrian Vale was a
senior analyst for eleven years, takes her onto its books as Sloane's operative: a file number, a handler, formal
authority, real backup, and a watched flat. She walks the same corridors Adrian walked, past the desk that was his,
two desks from Daniel Kessler, who sat beside Adrian for four years and does not know who she is. The route asks
whether you can take a machine apart from inside it, and what it costs to be protected by the people who own you.
Its weapon is **authority**: channels, clearances, a warrant card, the power to open a door because the paperwork
says so. Its pressure is **the leash**: every protection is also a record of where she is. The test the owner set for
every scene applies: **thrilling, erotic, fun**.

---

## 2. Content rules (restated, because this route leans on them)

- **Sloane is a person caught in the machine, never a defeated boss** (ENDGAME §4). She is an officer handed a product
  her vendor's own system had scored as uncontrollable. On this road she is Evelynn's handler, rival and, if earned,
  bounded ally. Her charge with Evelynn is **attention and power**, like Celeste's: nothing touched, never a romance
  (partners are mostly men).
- **Monitoring is never sexualised.** Axiom watches the flat, the phone and the cover. It never watches the bedroom on
  screen, and nobody ever uses intimacy as surveillance. Sloane's own rule, said out loud in Ch7: "We don't watch that.
  I'm not that kind of officer, and neither will you be."
- **Daniel Kessler is never deceived into intimacy.** He can become a chosen partner only after Evelynn has told him
  who she was. If she never tells him, he stays a friend, and that is complete. The telling is the scene.
- **Orders on this road are non-sexual and come through channels:** a tasking, a scope, a directive she can refuse,
  a report she can shade. Refusing a directive has an institutional cost (a hearing, a reassignment, the flat), never
  a sexual one.
- **Heat 3, consent in character** (the scope choice, then stop / stay), fading at the act. The reserved coercion beat
  stays Ch13 (shared, off screen). On this road the Honeypot comes **as an Axiom tasking**, and the choice is what she
  does with the channel.

---

## 3. How the lane is reached

**No change to the lane split.** Institutional already exists in `deriveRoute6`:
- the primary signal is the Ch6 `resolve-challenge` action, or `resolve-enforce` on the `sloane-institutional`
  arrangement;
- the seeds are `c5.message-sloane` (+2), `service = axiom` (+1), and a monitored photo custody or counter-arrangement
  (+1); a doubted Sloane counts −1.

Today an Institutional player confirms the lane in Ch7 and hits "[Chapter 7 · institutional route — in
development]". This route replaces that stop.

---

## 4. Shape and budget (~5h unique, ~50k words; the rest variant text on built spines)

| Act | Chapter | Shared or unique | Institutional content |
|---|---|---|---|
| II | 7 · **Level 71** | unique | Sloane's office at the window, and an offer made properly this time: an Axiom operative's contract, a file number, a handler, real backup, and the flat and its monitoring made official. **She writes her scope**, the way Ch4–6 taught her: what she will and won't be tasked with. The first walk across Axiom's floor as Evelynn, past Adrian's old desk. Daniel Kessler says hello to a stranger. |
| II | 8 · **Scope** | unique | Three weeks on Axiom's books, played as a hub of **taskings**: each one a scope dispute, a report she can shade, a line between protection and ownership. Benton, who holds Adrian's name. Maya in compliance, who might be the only person in the building on her side. Daniel at the coffee machine. The first Meridian name in an Axiom file Sloane handles herself. |
| II | 9 · Assembling the Case | **shared bridge** | Entered through Sloane's cover, as ENDGAME designs for this lane. |
| III | 10 · She Knows | shared spine, Institutional framing | Celeste's breakfast knows about Sloane: "Victoria is a very good officer. She'll never survive us. Unless you help me." The first order: bring her Sloane's tasking log. |
| III | 11 · The Asset | shared set (the Vesper) | She is on the catalogue (canon), and Sloane is in the room for Axiom, the client, watching her shown. The second order: have Sloane countersign the next legend's receipt, tonight. |
| III | 12 · Singapore | shared spine, Institutional framing | Singapore and Nell, as canon, **on an Axiom tasking with backup** (Axiom's Singapore desk). The trust question: what goes in her report, and what she keeps. |
| III | 13 · The Honeypot | shared spine, Institutional framing | The placement against Owen Marsh (shared, off screen) arrives **as an Axiom tasking signed by Sloane**. The Institutional choice is the channel: **comply** (off screen, as canon), **refuse the directive** and take the hearing, or **go over Sloane's head** to Benton. |
| III | 14 · **Officer of Record** | unique | Sloane's turn, from inside. An internal inquiry opens (Maya's wing), and Sloane is the officer of record for a defective product. She confesses to her own operative, and the ORACLE verdict is on the desk. **Bounded ally** (the fact held over her, to force it), **cut her loose**, or **make her the proof** in front of Benton. The route's payoff of authority. |
| III | 15 · The Leash | shared heist spine | Entered **with formal authority**: an Axiom client audit of the Vesper archive, on paper, with backup in a van outside. Or without it, if she went around the channel. |
| IV | 16–18 | shared, Institutional-flavoured | The board. The Institutional positions (§5). |

**Unique chapters: 7, 8, 14** (~21k words). **Shared with Institutional framing: 10–13 and 15–18** (~30k words of
variant text on built spines). **Fully shared: 9.** The same size as Executive, by design.

---

## 5. Endings (the Institutional positions, ENDGAME §7)

- **Terms from inside:** Axiom, as Meridian's client, terminates the Project Eve contract for defect, with the ORACLE
  verdict in the file and Sloane as the officer who raised it. Evelynn keeps Axiom's protection, a desk and a rank, and
  **is known**: Axiom knows exactly who she was, and has decided she is worth more than the scandal. The strongest
  institutional ending, and the one that needs Sloane as an ally.
- **Through channels:** the whistle. Maya's compliance wing and a regulator, the slow, formal way. Meridian is
  wounded in writing; Axiom survives by being the one that reported it. She keeps her protection and loses her rank.
- **Walk with what you know:** she refuses the last directive and walks out of Axiom with the file in her head,
  unprotected and free. The institutional exit the route map names.
- **Nell's name:** shared across routes.

In every ending Sloane ends as a person in the machine: promoted, reassigned, retired, or holding the pen on the
report that saved her, depending on what Evelynn made her.

---

## 6. Decisions for the owner (recommendation first)

1. **Institutional is the Axiom route: back inside the machine that made her,** as Sloane's operative, with formal
   authority, real backup and a watched flat. *Recommended.*
2. **Sloane is handler, rival and, if earned, bounded ally, never a romance.** Her charge with Evelynn is attention
   and power, like Celeste's. *Recommended* (partners mostly men).
3. **Daniel Kessler is the route's man:** Adrian's old deskmate, warm, a button short of the dress code. He can become
   a chosen partner **only after she tells him who she was**. If she never tells him, he stays a friend. *Recommended.*
   Alternative: no route romance; partners only from the shared cast (Julian, Sebastian, Theo, Marsh).
4. **Monitoring is never sexualised,** and Sloane says so in Ch7. *Recommended.*
5. **Unique chapters 7 (Level 71), 8 (Scope) and 14 (Officer of Record); shared framing for 10–13 and 15–18;**
   Ch9 fully shared. *Recommended.*
6. **Ch13 arrives as an Axiom tasking signed by Sloane.** The coercion beat stays shared and off screen; the
   Institutional choice is the channel (comply / refuse the directive / go over her head). *Recommended.*
7. **The endings:** terms from inside (known, protected, ranked), through channels (the whistle), walk with what you
   know, or Nell's name. *Recommended.*
8. **Build order:** Ch7, Ch8, Ch14 (the unique spine), then the shared variants in order, each chapter with its own
   design doc. No lane-split change is needed. *Recommended.*

---

## 7. What it reuses

- **Systems:** the favours hub (the Ch8 lever-hub pattern, as taskings), facts, the consent flow, the dead man's
  switch, `case.strength`, the route-confirm beat, the variant module per chapter, and the Ch6 Sloane arrangement.
- **Sets:** Axiom's floors and Level 71 (Ch1–3), the watched flat, the Vesper, Singapore. The art list's masters
  serve every route.
- **Cast:** Sloane (lead), Benton, Daniel Kessler, Maya, Celeste, Owen Marsh and Nora, with different relationships.
  Julian and Marcus appear only as the shared chapters need them.

---

## 8. Art impact

New:
- Axiom's operations floor, now seen as Evelynn (a mirror of Ch1's Adrian);
- Level 71 at night, Sloane at the window (a re-use with a new composition);
- Daniel Kessler's cast sheet (he has a character entry and no art);
- the Axiom audit van outside the Vesper (Ch15).

About 20 new frames, reusing the rest. These go on the consolidated art list after the deepening passes, per the
standing rule.
