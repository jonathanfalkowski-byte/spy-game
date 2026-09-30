# Institutional · Chapter 11: "The Receipt" (script: flow and flags)

Design: [../INSTITUTIONAL_CHAPTER_11_THE_RECEIPT_DESIGN.md](../INSTITUTIONAL_CHAPTER_11_THE_RECEIPT_DESIGN.md)
(approved 2026-09-30, all eight decisions as recommended). Shared spine:
[../CHAPTER_11_THE_ASSET_DESIGN.md](../CHAPTER_11_THE_ASSET_DESIGN.md).

- **Code:** `src/content/chapter11-institutional.ts`. It is wired through:
  - `src/content/chapter11.ts`: phase definitions, `place11`, blocks, choices, and the begin from an Institutional
    `chapter10.complete`;
  - `src/content/chapter14.ts`: `institutionalBridgeFrom14` enters Ch14 from the last playable of Ch9–11
    ("[Chapters 12–13 · institutional road — in development]" from Ch11);
  - `chapter14-institutional.ts`: Sloane's confession adds "And I signed 9C. In her house. Because you brought it."
    when `inst.pen11 = signed`;
  - titles in `src/ui/App.tsx` (THE RECEIPT), masters in `src/ui/environment-art.ts`, and node ids in
    `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER11`.
- **Entry:** `chapter11.begin-institutional` ("The first Thursday").
- **Naming:** phases are `threshold → catalogue → receipt → countersign → ride`. Choice ids carry `i11-`.
- **Keys:** `inst.pen11` (signed / warned / refused), `inst.iris11` (warned / told / quiet), `inst.book11` (seen /
  closed / turned), `inst.room11` (beside / work / watch), `inst.ride11` (shop / singapore / party); sub-state
  `c11.i-iris`, `c11.i-night*`; facts `c11.i-9c`, `c11.i-evening-consent`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **threshold** | Axiom's car; Sloane in black ("Like an officer at a party. Don't."). The Vesper: "Victoria. At last. Three years, and you never once came to see the shop." Celeste remembers Ch10 (restful Fridays / "Poor Elias stood in a corridor for forty minutes" / "Pity about your budget"). The clients discuss "the Axiom piece" in front of her. | First the car (deepening): **i11-car-why** ("invited to a funeral and hasn't been told whose") · **-well** ("Don't." … "Thank you.") · **-window** (neutral). Then **i11-room-beside** ("Thank you.") · **-work** (Halvorsen: the autumn collection in the anteroom) · **-watch** | `c11.i-car`, `inst.room11` |
| **catalogue** | The powder room: Iris Moreau, "They put you on the list too." Then the anteroom: *The Autumn Collection*, Iris's page and hers, E. V. (II) · AXIOM · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH. Sloane comes to find her. | First the dance (deepening): **i11-dance-accept** (a man who dances like he's counting money: "the good ones are extended") · **-decline** (neutral). Then **i11-iris-warned** · **-told** ("On the books. God. How honest of them.") · **-quiet**; then **i11-book-seen** ("Axiom didn't authorise that.") · **-closed** · **-turned** (Iris's page, ENDING) | `c11.i-dance`, `inst.iris11`, `inst.book11` |
| **receipt** | The balcony over the canal: the receipt for CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE, Priya. "She signs what you bring her now. Everybody's noticed." | **i11-pen-bring** · **-warn** ("Don't sign anything tonight.") · **-refuse** ("Get somebody else to carry it.") | `inst.pen11`; fact `c11.i-9c` |
| **countersign** | **signed:** V. SLOANE, OFFICER OF RECORD, because Evelynn brought it. **warned:** "Not tonight. Axiom doesn't sign for deliveries at parties." **refused:** Benton brings it; "Not for you, Elias."; Meridian's letter to Axiom's board on Monday (the seed of Ch14's inquiry). Then the cloakroom (deepening): Iris leaving on Halvorsen's arm. | **i11-cloak-number** (on a cloakroom ticket: "If you ever need out.") · **-coat** (her coat held, and one word: "Singapore.") · **-go** (neutral) | `c11.i-cloak` |
| **ride** | Axiom's car at midnight: "I have bought from that house for three years and never been inside it." Then Singapore: "Her city. Backup: me." Then the night. | **i11-ride-shop** · **-singapore** · **-party**; then **i11-night-daniel** (the Feathers; or, if told, his flat and the consent flow) · **-julian** / **-sebastian** · **-maya** ("Priya. She sits by the far window.") · **-alone**; **i11-{partner}-no-sex** / **-sex** / **i11-leave**, then **i11-stop** / **i11-stay** | `inst.ride11`, `c11.i-night*` |
| **complete** | THE VESPER. AVAILABLE FROM THE FIRST THURSDAY OF NEXT MONTH. 9C · PRIYA. SIGNED. HER NAME, MY HAND. / NOT TONIGHT. / REFUSED. THE LETTER GOES MONDAY. SINGAPORE. HER CITY. (IRIS HAS MY NUMBER.) | — (Ch14 bridge) | — |

**Tests:** `tests/state/institutional-ch11.test.ts`, on real golden saves through Institutional Ch7–10: the entry;
**bring** (the page seen, 9C countersigned, a night with Daniel who knows, then Ch14 with the confession line;
authenticates); **warn**; **refuse** (Benton, the letter).

**Deepening pass (2026-09-30):** three moments, each with a neutral pick (the car, the dance, the cloakroom). Tests
use a `NEUTRAL11` walker (`i11-car-window`, `i11-dance-decline`, `i11-cloak-go`).

**Size (honest):** ~1.03k (quiet) to ~1.14k (engaged) at pass 1; ~1.21k to ~1.42k after deepening, against the ~4.5k
target.
