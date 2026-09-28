# Executive · Chapter 8: "The Terms" (script: flow and flags)

Design: [../EXECUTIVE_CHAPTER_8_THE_TERMS_DESIGN.md](../EXECUTIVE_CHAPTER_8_THE_TERMS_DESIGN.md) (approved 2026-09-28,
all eight decisions as recommended). Route: [../EXECUTIVE_ROUTE_DESIGN.md](../EXECUTIVE_ROUTE_DESIGN.md).

- **Code:** `src/content/chapter8-executive.ts`. It is wired through:
  - `src/content/chapter8.ts`: phase definitions, place lines, blocks, choices, and the begin from `chapter7.complete`;
  - `src/content/chapter9.ts`: the hand-off ("Follow the counterparty"; `c9.entered = executive`);
  - titles in `src/ui/App.tsx`, masters in `src/ui/environment-art.ts`, and node ids in `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER8`. With it off, the Executive road still jumps from Ch7 to the Ch9 placeholder.
- **Entry:** `chapter8.begin-executive` ("Three weeks in his orbit") from an Executive `chapter7.complete`.
- **End:** the shared `complete`, with Executive blocks, then `chapter9.begin-placeholder` ("Follow the
  counterparty").
- **Naming:** phases are `orbit → favours → dinner → tray → late`, which avoids the Predator and own-power phases in
  the same scene. Choice ids carry `x8-`; keys live under `exec.*` and `c8.x-*`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **orbit** | The lit office next door was Clare Adeyemi's. Marcus drove her out; "I didn't keep her. I'm not going to make that mistake twice." A line admits the kept overlay if Ch6 set it, and a touch in the lift if she stayed with him in Ch7. | **x8-light-off** ("It's your office now") · **x8-light-on** ("For her"); then Clare's drawer (deepening), HANDOVER. FOR WHOEVER IS NEXT.: **x8-clare-call** ("Watch his tray… don't let him be kind to you so much that you forget to count") · **x8-clare-read** ("Never let M. put anything on J.'s tray after six.") · **x8-clare-leave** (neutral) | `c8.x-light`, `c8.x-clare` |
| **favours** | Three of five, one a week. Each favour opens its scene (`c8.x-open`), then offers three answers. After the second week, the middle night (deepening): two lights on forty-one, "Go home… It's a plea." | See the favour table below. Middle night: **x8-midnight-stay** (the office floor, cold noodles, his head on her shoulder at two) · **x8-midnight-ask** (Clare, the real version: "She told me to watch my tray") · **x8-midnight-go** (neutral; he switches her light back on) | `exec.fav.<id>`, `c8.x-weeks`, `exec.kept` (+1 for each of *his* favours taken), `exec.trust` (+1 for each of *hers* done), `c8.x-midnight` |
| **dinner** | Helix–Axiom, black tie. Marcus opens according to Ch7's `exec.marcus`. With the **veto** term, Sloane has to introduce herself. Her line: "Mr Mercer always did like people who used to be somebody else." | First, Marcus at the table (deepening): **x8-table-needle** ("I could have it framed") · **x8-table-glass** (his glass raised half an inch down the table) · **x8-table-quiet** (neutral). Then **x8-sloane-cold** · **x8-sloane-civil** · **x8-sloane-deal**, which leads to the cloakroom: **x8-cloak-take** (L.S.F. a night early, and a debt to Sloane) / **x8-cloak-walk** | `exec.sloane8`, `c8.x-cloak`, `exec.owes-sloane` |
| **tray** | 23:40. The Morel & Cie facility for Rotterdam. With the **files** term she reads it by right; without it she reads it anyway, with the door open. Page thirty-one, clause 14.3. | **x8-file-tell** ("I've signed this clause eleven times"; he doesn't sign the twelfth; trust +1) · **x8-file-keep** (copies it; "He never does") · **x8-file-pull** (into her drawer; Marcus: "Something's missing from Julian's tray.") | `exec.file` (told / kept / pulled), `exec.marcus8 = open` on pull; fact `c8.x-file` |
| **late** | The next night. Julian's invitation changes with what she did with the file. | **x8-late-julian** (always offered), then the scope: **x8-julian-no-sex**, **x8-julian-sex** (only if Ch6 warmed things or she stayed with him in Ch7), **x8-leave**; then **x8-stop** / **x8-stay** (fades). **x8-late-maya** (if she is back: "Good, or clever?") · **x8-late-alone** (the ledger in two columns) | `c8.x-late*`; fact `c8.x-evening-consent` |
| **complete** | The second card: the ledger in her hand (flat, then each favour). A thought according to what she kept: three or more, some, or none. Then **L.S.F. ADVISORY. 14.3. WHOSE MONEY?**, plus SLOANE. I OWE HER ONE. if she took the deal, and the light if she left it on. | — (on to Ch9) | — |

**The favours:**

| Favour | Whose | Answers | Term |
|---|---|---|---|
| **car** | his | take / once / refuse | Hal knows the Helix flat's address if she took the key |
| **card** | his | take / **work** (firewall only: the card pays for the dinner, she pays for the dress) / refuse (buys her own for £400 if she can, else wears the black dress) | **name** makes it a question; **firewall** adds the halfway answer |
| **fixer** | his | take / **advice** (firewall only: his lawyer, at her own fee) / refuse | The problem is the Courier if `c5.published`, otherwise the landlord |
| **diary** | hers | hold / sit / trade (the Rotterdam file early) | **door**: "It's in my contract. Julian read it twice." |
| **paper** | hers | his / ours / mine | — |

**Content:**
- Julian's favours carry no hidden price, and his care is real on every path.
- Kept is a list on the card, never a meter, and never punished.
- Sloane's deal is optional, non-sexual and refusable.
- The evening is chosen, consent-gated, heat 3, and fades.

**Tests** (`tests/state/executive-ch8.test.ts`, a real save onto the Executive road through Ch7):
- the entry, and the lit office;
- **kept:** takes everything, tells him about the file, and stays the night;
- **owes nothing:** the firewall's halfway answers, the veto at dinner, keeps the copy, ends alone, and
  authenticates (replay, and the save round-trip);
- **rival:** the door term on the diary, Sloane's deal, pulls the file, and Marcus notices;
- **evening gating:** Julian is offered after a cooled Ch6, and the night opens after a Ch7 stay.

`executive-ch7.test.ts` now expects Ch7 to hand on to `chapter8.begin-executive`.

**Deepening pass (2026-09-28):**
- three moments, each with a neutral pick (Clare's drawer, the middle night, the table);
- the tray remembers Clare (her underlined line, or "Watch his tray");
- both stays expanded;
- the card keeps 2 A.M. NOODLES if she stayed.

Tests use a `NEUTRAL8` walker (`x8-clare-leave`, `x8-midnight-go`, `x8-table-quiet`), and the Ch14 builder takes the
neutral picks.

**Size (honest):** ~1.3k (quiet) to ~1.7k (engaged) at pass 1; ~1.55k to ~2.05k after deepening, against the ~4–4.5k
target.
