# Outside · Chapter 18: "Proof of Delivery" (script: flow and flags)

Design: [../OUTSIDE_CHAPTER_18_PROOF_OF_DELIVERY_DESIGN.md](../OUTSIDE_CHAPTER_18_PROOF_OF_DELIVERY_DESIGN.md) (approved 2026-10-01). Shared spine:
[../CHAPTER_18_THE_POSITION_DESIGN.md](../CHAPTER_18_THE_POSITION_DESIGN.md).

- **Code:** `src/content/chapter18-outside.ts`, wired through `src/content/chapter18.ts` (definitions, blocks, choices, the begin from an
  Outside `chapter17.complete`); titles in `src/ui/App.tsx` (PROOF OF DELIVERY); masters in `src/ui/environment-art.ts`; node ids in
  `src/content/schema.ts`.
- **Gate:** `VITE_EVE_CHAPTER18`. **Entry:** `chapter18.begin-outside` ("Friday"). **End:** `proof`, the terminal phase: nothing is offered
  after it, and the last notice reads "The end of the Outside route."
- **Naming:** phases `dispatch → delivery → consignee → docket → receipt → proof`; choice ids carry `o18-`.

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **dispatch** | The morning after, by `act4.board`; Celeste's postcard / orchid / nothing; Rafe at the stair (heard in the room) or on the cheap phone. | **o18-morning-papers / -rafe** (not cut) **/ -sleep** | `end.morning` |
| **delivery** | The position by aim and terms; Sloane's end (witness / gone / returned / sparing). | **o18-switch-armed / -handed / -disarmed** | `end.switch`, `end.switch-to`, `end.position`, `end.sloane` |
| **consignee** | Maya, Iris, Marsh, Nora, the Ch15 price; Rafe at the stair with Nell's file (or, if cut, the blank page). Then who she goes home to. | **o18-rafe-stay / -home** (not cut) · **o18-blank-keep / -post / -burn** (cut); **o18-home-rafe** (stays + chosen night) **/ -julian / -sebastian / -maya / -none** | `end.rafe`, `c18.o-blank`, `end.with` |
| **docket** | A grey carbon docket, SIGNED FOR BY. | **o18-name-adrian / -evelyn / -new** | `end.name` |
| **receipt** | A year later; Rafe's Tuesday knock or Singapore postcard; Meridian's catalogue; three rules of trade; a chosen night or a quiet one. | **o18-catalogue-look / -burn / -sealed**; **o18-rule-verify / -sign / -source / -people / -door / -name** (three); **o18-later-invite / -quiet** → **-no-sex / -sex / -goodnight** → **-stop / -close**; or **-maya / -own** | `end.catalogue`, `end.rules`, `end.later`, `end.later-open`, `end.consent`, fact `c18.o-evening-consent` |
| **proof** | The last wall: WHO IS HOLDING THE PAGE? / I AM.; THE SOURCE. / (by Rafe's end); PROOF OF DELIVERY.; the last line by name. | — | — |

**Deepening (2026-10-02):** `o18-minute-pin / -drawer / -ledger` (delivery, before the switch), `o18-say-aloud / -mirror / -none` (docket, before the name),
`o18-last-signed / -blank / -shelf` (receipt, before the catalogue). Facts `c18.o-minute`, `c18.o-say`, `c18.o-last`; no `end.*` key changes.

**Safety:** nothing sexual unless chosen, heat 3 at most, consent in character, and it fades; "stop" is honoured at once; Rafe never makes her
Nell; Sloane is never a romance; nothing new is told about Nell's death; no ending is capture or topples Meridian.

**Tests:** `tests/state/outside-ch18.test.ts`, on the real Outside Chapter 9 golden played through Chapters 10–17: the entry; Rafe in the room
and staying with a chosen night that fades (authenticates, ends at the terminal card, nothing in the word list); stopping honoured; Rafe going home
with Nell's file (no partner); Rafe cut and the blank page (no Rafe options; margins her own).

**Size (honest), pass 1:** to be measured against the ~4.5k target; deepening will add the letter, a last walk, the catalogue's page, Rafe's postcard.
