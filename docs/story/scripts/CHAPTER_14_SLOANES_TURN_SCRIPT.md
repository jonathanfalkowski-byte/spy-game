# Chapter 14 — "Sloane's Turn" (script: flow and flags)

Design: [../CHAPTER_14_SLOANES_TURN_DESIGN.md](../CHAPTER_14_SLOANES_TURN_DESIGN.md) (approved 2026-09-25, all seven
decisions as recommended). Code: `src/content/chapter14.ts` (the wording lives there), `src/content/leverage.ts`,
`src/ui/Chapter14work.tsx`. Gated behind `VITE_EVE_CHAPTER14` (content revision ≥ 19), entered from an own-power
`chapter13.complete` with **begin** ("Let her in").

Phases: `door` → `order` → `maya` → `answer` → `sunday` → `after` → `complete`

## `door` — The Door Not Taken (FRIDAY · 19:00 · THE FLAT)

Sloane under the wall (the SLOANE card, and a question mark). Her account, in order: Project Eve came from
Meridian "finished, like a car"; she was officer of record; ORACLE's verdict was already attached (*Voluntary
adoption: high. Durable control: low.*), raised in writing, "priced in"; a slipping asset is the better product, and
she is "the part of the product that takes the blame". What told her (by `c13.answer`): the recording request, the
charge on her directorate's stamp, or the Authority's inquiry. `sloaneDoubts`: the Benton guess. The signed verdict:
three signatures, one of them C. Laurent's.

`c14.sloane` (sets `act3.sloane`): **sloane-hear** (neutral; a truce, the file, she sleeps on the sofa;
`c14.file`, fact `c14.verdict`) · **sloane-hold** ("You knew enough"; the file because she has to) ·
**sloane-shut** (take nothing; "Be careful this weekend") · **sloane-take** (only with
`own.crossover = institutional`: an alliance once, "Quits").

## `order` — The Last Order (SATURDAY · MORNING)

C.: "Bring her to the Vesper on Sunday at six, and bring what she carries." Then the threat she has kept since
Chapter 10: Axiom told where its missing analyst is, with the clinic's file; Sloane's own people sent to recover
him; the flat's keys back ("We own the building"). Pryce's curtain if `c8.pryce`.

`c14.tell`: **tell-now** (neutral; go to Maya today) · **tell-later** (after Sunday; Celeste gets there first:
Adrian's photograph on Maya's phone, "Ask her who this is.").

## `maya` — Maya (SATURDAY · MAYA'S KITCHEN, or YOUR DOORSTEP)

The kitchen (the empty charger; the sugar bowl on the letters if `act3.maya-status = detained`), or Maya on the
doorstep with the photograph. `mayaKnowsWho` decides whether the truth is Adrian, or the rest.

`c14.said`: **said-all** (Adrian if she didn't know, "You still bite the side of your thumb", and then everything)
· **said-enough** (neutral; Meridian, Celeste, the charge) · **said-go** (leave London). **Maya chooses**
(`act3.maya-choice`, derived, never picked over her): all + close → **stay**; all/enough otherwise → **witness**
(fact `c14.maya-witness`); go → **away**, or **stay** if she is close ("No.").

## `answer` — The Answer (SATURDAY · MIDNIGHT)

`c14.answer`: **order-comply** ("Six o'clock.") · **order-refuse** ("No." / "Monday, then.") · **order-counter**
(`counterReady14`: the verdict in hand, from Sloane's file, `c9.lever` or `c6.oracle-seen`, plus one of
`secondThings14`: Marsh, the 1109 card, the broadcast, Ashby on the record, Nora, a strong case).

## `sunday` — The Vesper, Sunday (SUNDAY · 18:00)

- **Comply:** dressed for a funeral she arranged; Sloane in the taxi (or on the steps if shut); on the stairs she
  understands: "I would have done the same." **comply-copy** (photograph every page in the taxi first) /
  **comply-clean** (neutral). The reading room: the file handed over; Celeste reads her own name twice and for one
  sentence forgets to say *darling*; Sloane walked out through the kitchens. `act3.sloane = handed`.
- **Refuse:** home at six; milk at seven; the key doesn't fit; the Meridian Property Services notice; Axiom
  security on the stairs; Pryce on the fire escape opposite, pointing. **escape-fire** (neutral; barefoot down four
  storeys of wet iron, laughing) / **escape-front** (if famous: sunglasses, "Excuse me", the photographers).
  `act3.adrian-burned`, `act3.home = lost`, fact `c14.burned`.
- **Counterplay:** the green; "Let me stand where she can see me." One **lay-** choice per thing she built
  (marsh | card | broadcast | ashby | nora | case). The verdict on top of page seven; Celeste reads it standing, and
  puts it down too carefully: **afraid**, for a sentence. Terms: Maya's charge withdrawn, Sloane out of the front
  door, no orders until the board has met. "You know exactly what it is worth, darling." `act3.celeste-afraid`,
  `act3.terms = agreed`, `act3.sloane = free`, `act3.maya-status = withdrawn` (if detained).

## `after` — Afterwards (SUNDAY NIGHT)

Comply: the river, "Thank you." with no *darling*. Refuse: a hotel under another name (Helen, if she learned it);
the late-news line; Sloane and Maya by message. Counterplay: the embankment with Sloane and an unlit cigarette:
"That was the defect … That you would turn round."

**The evening** (`eveningPartners14`: partners not betrayed, plus **Owen Marsh** if `act3.ally.marsh`): invite →
**evening-<p>-no-sex** / **-sex** / **evening-leave** → **evening-stop** / **evening-stay**. Heat 3, consent recorded
(`c14.evening-consent`), fades. On the refusal path each invite is shelter first. Or **after-alone** (neutral).

## `complete` — The Board

A card: THE BOARD MEETS. THE FIRST THURSDAY. Last line by answer: afraid "for a sentence"; "I handed her the woman
who showed it to me"; "They took the flat … Everything else I am taking with me."

## Board, flags, tests

- Board: Celeste wants "Victoria Sloane and her file, at the Vesper, Sunday at six"; threat "Adrian Vale's name, to
  Axiom; the flat". Evelynn holds the signed verdict (or its photograph), Sloane (free), Maya (stay or witness), and
  Celeste's word.
- Flags: `c14.sloane`, `c14.file`, `c14.tell`, `c14.said`, `c14.answer`, `c14.copy`, `c14.escape`, `c14.lay`,
  `c14.evening*`; Act III keys `act3.sloane`, `act3.maya-choice`, `act3.adrian-burned`, `act3.home`,
  `act3.celeste-afraid`, `act3.terms`, `act3.maya-status = withdrawn`.
- Tests: `tests/state/chapter14.test.ts` (every option reaches `complete`; counterplay only with the verdict and one
  more thing; Maya's choice derived; nothing sexual on the refusal path); goldens
  `tests/fixtures/rev19-chapter14-golden.json` (comply-hear, refuse-shut, counter-hold; capture with
  `EVE_CAPTURE_CH14=1 npx vitest run tests/tools/capture-chapter14-golden.test.ts`).

## Size (honest)

Pass 1: **~2.0–2.3k words on the golden paths** against the 7k budget. The set pieces are written, but they are
split across the branches, so any one path reads about a third of the chapter. A deepening pass should add a
second moment inside the door scene, more of Maya's kitchen, and more of Sunday on each path.
