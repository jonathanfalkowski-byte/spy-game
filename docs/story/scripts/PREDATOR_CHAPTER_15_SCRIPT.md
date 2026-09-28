# Predator · Chapter 15: "The Key" (script: flow and flags)

Design: [../PREDATOR_CHAPTER_15_THE_KEY_DESIGN.md](../PREDATOR_CHAPTER_15_THE_KEY_DESIGN.md) (approved 2026-09-27,
all eight decisions as recommended).

- **Code:** `src/content/chapter15-predator.ts`, wired through `src/content/chapter15.ts` (phases, place lines,
  blocks, choices), with titles in `src/ui/App.tsx` and masters in `src/ui/environment-art.ts`.
- **Gate:** `VITE_EVE_CHAPTER15`.
- **Entry:** `chapter15.begin-predator` ("The key") from the Predator `chapter14.ledger`.
- **End:** its own phase, `ledger`. The Predator road stops here, in development, until the Ch16 variant exists.

Phases: `gift → people → hour → drawers → week → line → ledger`

| Phase | Beat | Choices | Flags |
|---|---|---|---|
| **gift** | The reading room, ten days before the board. Celeste's framing depends on how Marcus fell in Ch14:<br>• the board: "Eleven minutes … I have told everybody";<br>• the press: Mrs Fenn knitting by the door, "I have had to be a little careful with you";<br>• the letter: "Helix's new representative. How nice to meet you properly", or "Marcus tells me you laughed" if she laughed.<br>The brass key on a green ribbon, the tag "Tuesday, 10:00": "Take what's yours, darling. Only what's yours." If she took the letters: "You may put them back in the drawer yourself." | **gift-thank** · **gift-ask** ("I don't, darling. I trust the key. It only opens what I let it.") · **gift-letters** (only with the letters: all of them on the lectern; "Honesty is only a question of which copy.") | `c15.p-gift`, `c15.p-letters` |
| **people** | Two nights later, the key on the kitchen table: "one is a mistake, and two is a war". First the crew, then the way in. | Crew, from what Predator built (`crewOptions15`): **crew-iris** · **crew-lucien** ("Chubb, 1911") · **crew-marcus** (a man in Clerkenwell) · **crew-marsh** (outside, the switch) · **crew-pryce** ("nineteen years … somebody who asks") · **crew-julian** (the street) · **crew-halvorsen** (keeps Celeste on the phone about his ships) · **crew-alone**. Then **way-hour** (always) · **way-night** (Pryce or Iris) · **way-copy** (Lucien or Marcus: hers back on her desk by nine) | `c15.crew`, `c15.way`, `pred.way15` |
| **hour** | **Hour:** Tuesday at ten, Mrs Fenn knitting outside the door without a handle, "Take your time, dear" (and Halvorsen's ships ringing upstairs, if he is the crew). **Night:** two in the morning, Pryce's car or Iris's stair; "Keys do not know what time it is." **Copy:** a warm new key at three; Lucien or Marcus waiting. Then the snag, by way: the knitting needles stop; a light under the reading-room door; the copy sticks. | **snag-talk** · **snag-hide** · **snag-bold** ("The best cover is the truth. I was given a key.") | `c15.snag` |
| **drawers** | The archive: grey steel, one lamp, drawers numbered by catalogue page. Page forty: the transfer order, Candidate 7A, the fitting, a photograph of Adrian Vale. Her reports on Marcus, if she sent any (true, initialled in green; or lies, the best lines underlined). MAYA REYES in the drawer for the people round the people. | Her file and Maya's are always taken; then one thing more: **took-nell** (the Jakarta order, signed C.; "Her watch is on my wrist") · **took-1109** (the Claremont drawer; on the comply road, the receipt "Operator: E. Vale.") · **took-clients** (Celeste's client ledger, bound in green: Marcus three times, Halvorsen twice, two ministers) · **took-account** (only if she kept the Geneva card) | `pred.took15`; shared `act3.adrian = hers`, `act3.page = torn`, `c15.maya-file`, `act3.nell-order` / `act3.cards`, `pred.clients15`, `pred.account = closed`; fact `c15.p15-took` |
| **week** | The holds, one by one:<br>• Maya's file burns in the sink;<br>• her reports go to Leeds with "I am sorry about the bar" (if true), or are kept (if lies);<br>• the account is closed, its money going to Delphine if freed, or to Nora;<br>• copies go to up to three switch-holders from her allies. | The cost: **cost-ally** (Lucien's bank named / Marsh early / Iris burned / Halvorsen's debt called / Pryce's statement) · **cost-visibility** ("the woman who took Helix", Meridian said twice) · **cost-money** (all of it, to Nadia Brandt and to Nora; `own.cash = 0`) · **cost-relationship** (Julian's deal / Marcus named / Maya leaves London) | `c15.cost`, `c15.cost-who`; shared `act3.cost`, `act3.leash = broken`, `act3.switch = set`; fact `c15.cost` |
| **line** | Wednesday night: "No more help." "Then Thursday. Come as whoever you like, darling. I should warn you that I shall be there as myself." | **phone-return** (in an orchid box, no card) · **phone-river** (the canal; "where the memo went in December" if Ch11 was refused) · **phone-keep** (evidence). Then **ev-julian** (ally) · **ev-marcus** (an ally in exile, or he kept his name: the last train to Leeds) · **ev-lucien** (if he was the crew) · **ev-alone**, and the consent flow; it fades. | shared `act3.black-phone`; fact `c15.p15-evening-consent` |
| **ledger** | Every card comes across the string to her side, except THE BOARD MEETS. THE FIRST THURSDAY. "She gave me the key to everything, because she was sure of me. I kept it. Thursday, she finds out what she was sure of." | — | — |

**Shared Act IV keys written** (so Ch16–18 can be shared spines): `act3.leash`, `act3.adrian`, `act3.page`,
`c15.maya-file`, `act3.nell-order` / `act3.cards`, `act3.switch`, `act3.cost`, `act3.black-phone`. Predator's own:
`pred.took15`, `pred.clients15`, `pred.way15`, `pred.account`.

**Content:**
- No sexual coercion (the reserved beat was Ch13).
- The evening is chosen, consent-gated, heat 3, and fades.

**Tests:** `tests/state/predator-ch15.test.ts`. A real save played through the whole Predator road, Ch6–14, with
configurable picks:
- the entry;
- the copy with Lucien, the letters returned, Nell's order and Lucien spent (authenticates);
- alone at the hour, under Mrs Fenn's eyes, with the money given back;
- two in the morning with Pryce on the comply road, where her operator's receipt comes out;
- the Geneva account closed clean.

**Size (honest), pass 1:** ~1.1k (quiet) to ~1.2k (engaged); more on the letters and ally roads. Against the ~4.5k
target, this is the leanest Predator first pass; a deepening pass is the obvious next step (the gift at greater
length, a scene with the crew the night before, and the archive itself).

## Deepening pass (2026-09-27)

- **The night before the job** (`people`, after the way in, before the hour). Every way passes through it
  (`c15.p-eve`):
  - **eve-plan**: walked through twice at the kitchen table, with the salt cellar for Mrs Fenn and the pepper for
    the door. With a crew: "And if she's there?" "Then I was invited." Alone, until she catches herself doing Mrs
    Fenn's voice.
  - **eve-dress**: for a courtesy (the grey silk, pearls, silent flat shoes) or for two in the morning (black, soft
    boots, the green ribbon in the pocket "because if anybody asks, you were given a key").
  - **eve-sleep** (neutral).
- **One thing read before the one thing taken** (`drawers`, after the snag) (`pred.read15`):
  - **read-adrian**: Celeste's assessment, in green, dated the spring before the Glass House. "Candidate 7A. Clever.
    Lonely. Careful with everybody but himself. Will be grateful. Will not look back."
  - **read-marcus**: page one of a much older catalogue. "M. CHEN. Recruited at twenty-nine. Placed: Helix. Loyal to
    whoever is above him. Review at forty-three." "I was the review. She wrote me into his drawer fourteen years
    before she met me."
  - **read-none** (neutral): the lamp, the clock, four minutes.
- **More prose:**
  - Celeste on the key: "My father had it made for the first archive, in 1911 … I have never had it copied. I have
    never needed to." This pays off Lucien's "Chubb, 1911" on the copy road.
  - A white orchid from nobody, left on the landing.
  - On the ledger, the key hangs on the top pin: the brass one on its ribbon, "On Thursday you will give it back to
    her", or the copy on red thread.
- **Place line:** "The night before · The kitchen table".

The tests walk the new moments on their neutral picks (`NEUTRAL15 = eve-sleep, read-none`).

**Size (honest) after the deepening pass:** ~1.2k (quiet) to ~1.4k (engaged), more on the ally roads. The next lift
would be the gift scene at greater length, and a second beat in the archive (Nell's drawer read, not taken).
