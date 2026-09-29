# Institutional · Chapter 7: "Level 71" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_7_LEVEL_71_DESIGN.md](../INSTITUTIONAL_CHAPTER_7_LEVEL_71_DESIGN.md) (approved
2026-09-29, all eight decisions as recommended). Route: [../INSTITUTIONAL_ROUTE_DESIGN.md](../INSTITUTIONAL_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter7-institutional.ts`. It is wired through:
  - `src/content/chapter7.ts`: phase definitions, `nextFor` (`institutional` → `gate`, replacing the in-development
    stop), blocks and choices;
  - `chapter7-own.ts`: `place7` → `placeInstitutional7`;
  - titles in `src/ui/App.tsx` (LEVEL 71 / "Level 71."), masters in `src/ui/environment-art.ts`, and node ids in
    `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER7`.
- **Entry:** the Chapter 7 confirm beat when the road is `institutional` (confirm, pivot, or the hard turn).
- **End:** the shared `complete` ("Where It Points"), with Institutional blocks. The road then goes to the shared
  Ch9 bridge placeholder until Institutional Ch8 exists.
- **Naming:** phases are `gate → window → scope → crossing → desk → watched`, then `complete` (the design's `card`
  beat). Choice ids carry `i7-`.
- **Keys:** `inst.scope.*`, `inst.benton`, `inst.desk`, `inst.daniel`; sub-state `c7.i-gate`, `c7.i-offer`,
  `c7.i-scope`, `c7.i-desk`, `c7.i-evening`, `c7.i-evening-open`, `c7.i-evening-scope`, `c7.i-evening-outcome`; facts
  `c7.i-contract`, `c7.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **gate** | 07:40, Axiom Tower, the staff entrance. A temporary badge, EVELYN VALE. Terry: "Morning, madam. … Mind the step." | **i7-gate-step** (over the bad step without looking) · **-team** (how did they do on Saturday) · **-lift** | `c7.i-gate` |
| **window** | Level 71. Sloane's opening by Ch6: challenged ("It says I can't hold you. … I'll hire you."), enforced ("Let's write better ones."), protected ("stop doing it off the books"), or otherwise ("You came to me."); her line on the Ch6 friction; the Benton guess (if `sloaneDoubts`). The contract: a file number, handler V. SLOANE, backup, the flat made official. "We don't watch that." | **i7-offer-cost** · **-above** ("people I don't meet") · **-pen** ("Good.") | `c7.i-offer` |
| **scope** | SCOPE OF TASKING. Three of five, each signed, each pencilled. | **i7-scope-refusal** ("Once per tasking. Not once per career.") · **-record** ("You'll wish you hadn't.") · **-name** ("I can seal it. I can't unread it for him.") · **-backup** ("Mine. Always mine.") · **-people** ("Define 'loves'.") | `inst.scope.*`, `c7.i-scope`; fact `c7.i-contract` |
| **crossing** | Strategic Intelligence, at Sloane's side. Benton at his smoked-glass door: "Ms Vale. I believe we've met." | **i7-benton-cool** · **-adrian** ("Is this development feedback, Elias?") · **-silent** (Sloane: "Ms Vale is mine, Elias.") | `inst.benton` |
| **desk** | Adrian's desk, with a plant. Sloane: "It's the only desk on the floor nobody wanted. And I wanted to see your face." | **i7-desk-keep** · **-move** ("Fair."). Then Daniel ("The last person at that desk read everything. No pressure."): **i7-daniel-warm** (the biscuits behind the fire procedures) · **-tie** (he nearly sees) · **-work** | `c7.i-desk`, `inst.desk`, `inst.daniel` |
| **watched** | The flat, officially monitored: the hall camera's green light; the file number AX-7A (Candidate 7A). | **i7-evening-daniel** (the Feathers; as colleagues; nothing more) · **-maya** (if `c6.maya = restored`) · **-julian** / **-sebastian** (if available from Ch4–6; at his place; **i7-{partner}-no-sex** / **-sex** / **i7-leave**, then **i7-stop** / **i7-stay**; fades) · **-alone** (tape over the green light) | `c7.i-evening*`; fact `c7.i-evening-consent` |
| **complete** | The wardrobe door: VICTORIA SLOANE. HANDLER. AX-7A. In pencil: WHO IS WATCHING HER? (plus BENTON KNOWS; plus DANIEL, rubbed out) | — (to the shared Ch9 bridge placeholder) | — |

**Content:**
- Sloane is never a romance: the charge is her appraisal and Evelynn's returned look.
- Monitoring is never sexualised: "We don't watch that", and the partner evening happens at his place.
- Daniel is a colleague in Ch7: "If he is ever going to kiss me, he is going to know whose mouth it is first."
- Refusing a term, the desk, Benton or the evening is never punished.

**Tests:** `tests/state/institutional-ch7.test.ts`:
- the entry (`maximal-trade`, a pivot from outside);
- **challenged** (a Ch6 ORACLE-challenge save): three terms, "development feedback", Adrian's desk, the tie, a drink
  with Daniel, then the Ch9 placeholder;
- **protected** (the `phone-counter-protect` golden, the hard turn from own-power): backup / her people / record,
  Sloane answers Benton, another desk, a night alone; authenticates;
- the partner evening: consent note, stop honoured, the fade; and Maya.

**Size (honest), pass 1:** ~1.5k (quiet) to ~1.7k (engaged), against the ~4.5k target.
