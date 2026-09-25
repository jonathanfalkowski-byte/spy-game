# Chapter 9 — "Assembling the Case" script (shared bridge)

Source of wording and flags for EVE Code. The **convergent bridge**: every route lane arrives
here and assembles, from what the route actually gave them, a case they can act on — and finds
the name. Design authority: [ENDGAME_RECONVERGENCE.md](../ENDGAME_RECONVERGENCE.md) (§6 + settled
decisions §10), [CAMPAIGN_ROUTE_MAP.md](../CAMPAIGN_ROUTE_MAP.md) (reconvergence doctrine),
[CHAPTER_6_PROOF_AND_COUNTERPOWER.md](../CHAPTER_6_PROOF_AND_COUNTERPOWER.md) (Celeste/Marcus
firsthand scope, ORACLE, the ledger leaf).

Format as the Ch7/Ch8 scripts. New gated content revision (additive, `VITE_EVE_CHAPTER9`).
Reachable from a route lane's Chapter 8 `complete`. **Own-power is the live feeder** (Ch8
own-power is built); other lanes reach the same bridge as their Ch8-equivalents ship — the
`arrive` frame already branches on `route.lane`, and a lane with no Ch8 yet routes through the
dev-gated placeholder to `arrive` cleanly (the Ch7-confirm placeholder pattern).

Phases: `arrive` → `assemble` (hub) → `resolve` → `complete`.

Driving job (settled): **assemble a case from what the route holds, and reach the one name on
Meridian's board you have already met.** That name is **Celeste Laurent** (endgame canon; the
confrontation itself is Act IV (~Ch17, see ../BEAT_MAP.md), not here — Chapter 9 reaches and *sources* the name).

---

## Phase `arrive` — the bridge frame

### Entry frame — by `route.lane` + `own.crossover`

The shape is one shape; the road that reached it differs. Own-power is written live; the other
three are stubbed here (one line each) until their Ch8-equivalents ship.

- **own-power (live):**
  > p: You came this far the hardest way — a desk you pay for, a phone that answers only to you,
  > and a truth you pulled out of a closed shell with no clearance and no one's permission. You
  > know what Meridian is now: not a company that keeps secrets, a company that *makes* them —
  > that builds people out of other people's lives and sells them. You are one of its products.
  > So is the woman whose name you wear.
  > *(own.crossover = executive/institutional:)* p: You did not do all of it alone, and you have
  > not forgotten whose door you borrowed to get here.
  > *(own.crossover = none:)* p: And you did it without borrowing a single door. Whatever you
  > build next, no one gets to say they handed it to you.
- **institutional / outside / executive (stub until built):**
  > p: *(placeholder — this lane's road into the bridge is in development.)* You arrive at the same
  > wall the others do, carrying what your road gave you. → `arrive` continues shared.

### The turn lands (shared)

> p: Meridian Holdings. A private intelligence concern that manufactures operations — identities,
> legends, whole manufactured people — and sells them to whoever can pay. Project Eve is a
> product. Axiom is a client. Sloane is a client's officer. And the authorization to reuse *her*
> legend — the real woman who lived it before you were fitted into it — was signed at Meridian's
> board.
>
> t: You have the shape. What you do not have is a case — something sourced, something that holds
> when an institution tries to make it disappear — and you do not have the name. One person on
> that board you have already met, and did not expect. Before you can decide what to do, you find
> out who, and you build something you can carry into the room.

→ **arrive-begin** · Assemble what you have · *Every road left a different pile. Sort it into a case.* → `assemble`.

## Phase `assemble` — the hub

A hub: each move is playable once and returns here; each contributes a **sourced** piece toward
two outputs — **`case.strength`** (thin | supported | strong) and **`case.name`** (unfound →
celeste). Moves are gated by what the route actually holds; a player sees only the doors their
biography opened. An **autonomy floor** guarantees the name and a thin case are reachable with the
free-agent core alone (`assemble-name` always offers at least the slow public road).

**Case-strength budget:** each contributing move adds one weight. `thin` = 0–1, `supported` = 2,
`strong` = 3+. `assemble-stop` ends early with whatever is held. `assemble-name` is separate — it
sets `case.name`, and also adds one strength weight (a sourced name is itself evidence).

**assemble-witness** · Take the corroborator as far as they'll go · *Firsthand, and only as far as they really know.* *(gated: Ch6 corroborator engaged — Celeste, or Marcus fallback)*

> q(Celeste): I knew her. Not the file of her — *her*, the way you know someone you had breakfast
> with. If you show me a date and a handoff and it matches the woman I knew, I'll tell you it
> matches. I won't tell you it was a crime, because I don't know that it was. I'll tell you it
> was her.
> p: She confirms the ledger leaf *fits the person she knew* — the date, the habit, the absence.
> No more than that; she is not pushed past it. It is firsthand, and it is clean.
> Adds one strength weight; sets `c9.witness = confirmed`. (Marcus fallback: same, professional
> scope — "she handled that transaction," not "I knew her.")

**assemble-oracle** · Turn the prediction into a lever · *The maker knew the product was defective. That's the whole case.* *(gated: `c6.oracle-seen`; else a reconstruction sub-path at higher cost)*

> p: You lay out what ORACLE scored before any of this began: that you would take the identity
> willingly, that Sloane could not truly hold you — and that they proceeded anyway. It is not a
> confession. It is worse: it is a *specification*. They sold Axiom a controllable asset their own
> system had already marked uncontrollable.
> *(if !c6.oracle-seen:)* p: You never saw the assessment itself, so you rebuild its shape from
> the edges — slower, and you can only argue it, not wave it. It still points the same way.
> Adds one strength weight; sets `c9.lever = oracle` (or `oracle-inferred`).

**assemble-evidence** · Corroborate the paper into a chain · *Custody, dates, a handoff in her hand. Make it hold.* *(gated: ledger leaf / current-op evidence in custody)*

> p: You build the chain the way it has to be built to survive contact with a lawyer: the leaf's
> dated handoff, the Blackglass Singapore location history you already hold, and the witness's
> confirmation, three things captured independently that could not have fed each other. Agreement
> across all three is the closest thing to proof you can own.
> Adds one strength weight; sets `c9.chain = built`.

**assemble-ally** · Spend who's left · *Help isn't free. Choose which kind of not-free.* *(gated by remaining allies)*

> - **assemble-rook** *(if `own.alliance.rook` engaged and not spent):* the sender puts one more
>   offshore-board document in your hands — concrete, unsourceable, fast. Adds a weight; marks
>   `own.alliance.rook = spent`; flags the piece `unverified`.
> - **assemble-editor** *(if the `c5.published` editor line exists and not spent):* the reporter's
>   corporate-veil filing comes back — slow, clean, filing-grade. Adds a weight; marks the editor
>   `spent`.
> - **assemble-maya-bounded** *(if `c6.maya = restored` and not used-up):* public-scope only — she
>   confirms the *category and the floor* (a directorate-level or private-contractor sign-off),
>   never the answer. Adds a weight; marks `own.alliance.maya = used`.
> - **assemble-crossover-contact** *(if `own.crossover = executive|institutional`):* the door you
>   borrowed in Chapter 8 is still ajar — one more use, at a further standing cost. Adds a weight;
>   records the deepened dependency (reconvergence reads it).

**assemble-name** · Find the face on the board · *One name, and you have already met it.* *(always available — the road differs by lane; own-power = the slow public veil-peel)*

> p: You go at the board itself. *(own-power:)* You use the one instrument you own — attention —
> to make Meridian's silence expensive, and you read what moves when a closed thing is looked at.
> *(if a road-piece is held — Rook doc / editor filing / crossover access — it names the board
> faster and cleaner; otherwise it is slow, self-funded, and entirely yours.)*
> p: And the name surfaces, and you go still. You know it. Not from a file — from a morning. A
> hand on your arm and *"You disappeared before breakfast."* She was not greeting an old friend
> she mistook you for. She was reading the fit of a legend she had helped sign away.
> t: **Celeste.** The warmth was the appraisal. Someone who knew the woman you are wearing — knew
> her the way you know a person — sat on the board that spent her, and then touched your arm.
> Sets `case.name = celeste`; adds one strength weight; sets `c9.name-road ∈ {public, rook,
> editor, crossover}` (how she was reached — reconvergence/Ch10 read it).

**assemble-stop** · Move with what you have · *You don't have to find every piece to act.* → `resolve` (with however much is held; if `case.name` is still unfound, see the resolve floor).

## Phase `resolve` — what you can carry

Computes `case.strength` from the weights and states plainly what is provable vs argued, then
sets the endgame entry contract.

- **strong (3+):**
  > p: It holds. A named board member who knew the original, a legend proven reused, a system that
  > flagged the defect before it was sold. Not a rumor — a case, sourced three ways, that would
  > survive someone trying to make it vanish. You can walk into the next room and put it on the table.
- **supported (2):**
  > p: It holds up, mostly. Enough to force a conversation, not yet enough to force a hand. You
  > have the name and one clean corroboration; the rest you will have to argue.
- **thin (0–1):**
  > p: It is thin. A name you are sure of and not much you can prove around it. It is enough to
  > walk in knowing who you are looking at. It is not enough to make them afraid. That, too, is a
  > place you can start from — and it is entirely yours.

**Name floor (autonomy guarantee):** if the player reached `resolve` without `case.name`
(possible only by taking `assemble-stop` before `assemble-name`), the resolve text still surfaces
the name at the lowest resolution — *"You already have the last piece and have been refusing to
say it: the face on the board is one you've met, and when you let yourself, you know it. Celeste."*
So the name is **never** missable; the case around it is what scales. Sets `case.name = celeste`.

Cost register (shared):

> p: *(if allies spent:)* You are lighter an ally or two than you were; help was not free, and you
> chose which kind. *(if own.exposed / name-road = public:)* You are more visible for having gone
> looking, and Meridian is a thing that looks back. *(always:)* And you are still the only person
> holding what you assembled. → Chapter 9 `complete`.

> t: You have the name, and a case the size of your road. You went looking for a face on that
> board and found one you had already met, which means she has already met yours. Celeste has
> seen your face too. She saw it first, across a room at the Glass House, and she smiled.
> → sets up Chapter 10, "She Knows" (the Act III opener; see [../BEAT_MAP.md](../BEAT_MAP.md)).
>
> *(Revised 2026-09-24 for the four-act structure: Ch9 is the midpoint, not the lead-in to the
> endgame, so it ends on Celeste knowing rather than on a confrontation.)*

---

## Flags this chapter sets

`case.strength` (thin|supported|strong), `case.name` (unfound→celeste), `c9.witness`,
`c9.lever` (oracle|oracle-inferred), `c9.chain`, `c9.name-road` (public|rook|editor|crossover),
ally-spend updates (`own.alliance.*`), further `own.exposed`/`own.cash`, and a `c9.entered`
resolution for Chapter 10's entry contract. All sourced and re-derivable.

## Notes for EVE Code

- New gated content revision (additive, `VITE_EVE_CHAPTER9`), reachable from a lane's Chapter 8
  `complete`. Own-power Ch8 (`complete`) is the live feeder; other lanes route through the
  dev-gated placeholder into `arrive` until their Ch8-equivalents ship — same placeholder pattern
  as the Ch7 confirm beat's non-own-power lanes.
- `assemble` mirrors the Ch7 `pursue` hub: gated one-shot options returning to the hub, a stop
  option, and a strength budget rather than a fixed piece count. `assemble-name` and
  `assemble-stop` are always present; the rest are gated by biography.
- **Autonomy floor:** `case.name = celeste` is reachable by the always-available `assemble-name`
  (slow public road), and the `resolve` name-floor guarantees it even if the player stops early.
  The *strength* scales with the route; the *name* never gates behind a faction or intimacy.
- `case.strength` + `case.name` + `c9.name-road` + the ally/exposure updates are the entry
  contract Chapter 10 reads (endgame doc §5). Store them cleanly and re-derivably.
- Celeste stays firsthand-bounded in `assemble-witness` exactly as Ch6 — she confirms the leaf
  *fits the woman she knew*, never supplies the ORACLE plan, Axiom internals, or Adrian's clinic
  history. The board-member reveal is reached in `assemble-name` (the public/road piece), not from
  her mouth — she is the reveal's *subject*, not its source.
- No intimacy in this chapter.
- Design owns wording and which signals count; EVE Code owns the exact weighting, gate predicates,
  and how `case.strength` bands map. Report Phase 0 before building, as with Ch6–8.

## Set pieces (2026-09-24)

Every hub move is now a scene with a moment of its own, held in `c9.open` like the pass-2 witness
and name beats. **No moment adds case weight** (`case.strength` still counts `c9.took.*` only). The
wording lives in `src/content/chapter9.ts`.

| Move | Scene | Moment → flag |
|---|---|---|
| `assemble-oracle` | the library on the hill; one plain page; SUBJECT WILL ACCEPT THE IDENTITY WILLINGLY | **oracle-score** / **oracle-close** → `c9.oracle-beat` |
| `assemble-evidence` | the copy shop at seven; the chain in three forms | **chain-split** (bank box, jacket lining, poste restante) / **chain-one** (one envelope) → `c9.chain-kept` |
| `assemble-rook` | the ferry terminal, locker 41 ringing; a board page with one tick | **rook-ask** ("Someone who knew her before you did.") / **rook-square** → `c9.rook-beat` |
| `assemble-editor` | Clara Duvall at the café by the courts | **clara-name** / **clara-source** → `c9.clara` |
| `assemble-maya-bounded` | the counter at seven, before her shift; "Are you in danger?" | **maya-honest** / **maya-fine** → `c9.maya-beat` |
| `assemble-crossover-contact` | Julian's contracts room, or Sloane's car | **door-tell** / **door-keep** → `c9.door-beat` |

Also played as scenes: the morning (last night's list, read or on her wrist; the bakery girl who
looks up at her window), the floor (Sourced. Argued. Missing.), the day's work before the seventh
name surfaces, the stranger's reading at `resolve`, and the orchid at midnight (the stairwell door
still swinging; she carries it in and sits across from it, as if it were a guest).

Neutral picks for the goldens (`tests/gated-migration.ts`): oracle-close, chain-one, rook-square,
clara-source, maya-fine, door-keep.

## New scenes: the Usual Table and the auction (2026-09-24)

Own-power only, before the hub (held in `c9.open`; no case weight; Celeste in the room before the
name):

- **The Usual Table** (`c9.table`): Castellane confirms "your table for two this Thursday, as
  always". A standing booking, first Thursdays, for two, never cancelled, settled quarterly "by the
  Laurent fund, madame. As it always was." (It sets up Chapter 10's first Thursday.) **table-sit**
  (the sole, no sauce; the Chablis a third full) · **table-ask** (Madame Laurent, alone since the
  spring, ordering for both and sending the second plate back; a fact) · **table-cancel** ("It was
  never in your name. Only in your honour.").
- **The auction** (only if the Aster piece ran; `c9.auction`): the Harbour spring auction for the
  children's library; Lot 14 is her (the print, the famous back, or the proof pages in her hand);
  bought "For the Laurent Sovereign Fund"; Celeste at the back out of the light: "It will hang in
  my hall." **auction-thank** (she keeps her face from the cameras: tomorrow's photograph is of the
  back of a woman's head) · **auction-ask** ("A very good likeness. Of someone.") ·
  **auction-leave** (her laugh through the door).

Neutral picks: table-sit, auction-leave.

## New scenes, round 2 (2026-09-24)

- **The tailor** (own-power, between Castellane's message and Thursday): Mr Anand above the dry
  cleaner finds his own chalk mark in the charcoal: "I made this. For you." A centimetre at the
  shoulder. `c9.tailor`: **tailor-alter** (make it hers) · **tailor-ask** (a tall lady chose the cloth
  and paid; "You looked at her"; a fact) · **tailor-leave** (neutral).
- **The lawyer** (every road, at `resolve`, before `resolve-end`; the band is already fixed):
  Nadia Brandt, seventy, above a locksmith's: "Are you ready to be Exhibit A, Ms Vale?" `c9.lawyer`:
  **lawyer-retain** ("when you are ready, and not a day before") · **lawyer-exhibit** ("evidence I
  chose") · **lawyer-thank** (neutral).

## New scenes, round 3 (2026-09-24)

Own-power only:
- **The Straits Club** (`arrive`, before `arrive-begin`): a lapsed subscription; Miss Loh ("We were
  told you were missing"); the condolence book, and C.'s entry in green ink: "Not missing. Mislaid.
  She always comes back." `c9.club`: **club-photo** (a fact) · **club-ask** (a lady, every first
  Thursday before her lunch, who has not missed a month) · **club-close** (neutral).
- **Sloane at the café table** (`resolve`, before the lawyer): two coffees, the watchers' table, a
  grey thread in her hair; "Whatever you have found at the top, it will not want to be found by
  you." `c9.sloane`: **sloane-nothing** (neutral; "Then shop carefully.") · **sloane-page** ("never
  show it to anyone at a table on a street again. Including me.") · **sloane-afraid** ("Being right
  about you.").

## Sequence: The Watcher's Rent (2026-09-25)

Own-power, at `resolve`, before Sloane (the band is already fixed; no case weight). Chapter 8's
binoculars across the gap; a TO LET board that has been lying for months. "A watcher is an expense."
1. **How she finds the payer** (`c9.rent`; every way is a fact, `c9.watcher-rent`): **rent-agent**
   (neutral; "Long let, corporate. Paid a year in advance… L.S.F. Facilities.") · **rent-post** (the
   envelope at the slot: c/o LAURENT SOVEREIGN FUND) · **rent-knock** (the man from the lift, or Mr
   Pryce if she rang at Property Services in Chapter 7: "The same people who pay yours… if you've any
   sense, stop looking.").
2. **L.S.F.**, looked up in four minutes: the fund's facilities company. "Not Meridian. Not the
   board. Her… This part is personal."
3. **The window that evening** (`c9.window`): **window-wave** · **window-sign** (lipstick on a
   cereal box: TELL HER I SAID GOOD MORNING) · **window-dark** (neutral).
4. In the morning, Sloane at the watchers' table.

## Sequence: The Eleven Names (2026-09-25)

Own-power, in `arrive`, after the Straits Club (held in `c9.names-open`: how → ask → end; no case
weight). The condolence book's eleven names, worked through by two in the morning, come down to one:
"Come home, E. — R. Adair," who teaches Mandarin two evenings a week by the old harbour.
1. **How she approaches** (`c9.ruth-how`): **ruth-letter** (neutral; a bench on the harbour wall) ·
   **ruth-class** ("You can come down now. You always did sit at the back.") · **ruth-door** (the
   kettle, as for somebody long expected).
2. **Ruth**, near seventy, trained stillness: "You're not her… Better than the last one I saw. She
   stood with her weight on the left foot, after Jakarta." (`c9.ruth-ask`; a fact either way):
   **ruth-burned** (burned in Jakarta, cut loose, "They kept the shape"; "it hardly matters who lit
   it, when the house was insured") · **ruth-c** (C. sat in the flat an afternoon "not crying", then
   signed the papers: "She does it in an afternoon, and then she invoices.") · **ruth-you** (neutral;
   "You're the reissue… You ask real ones.").
3. **Ruth's question**, "Was it quick?" (`c9.ruth`): **ruth-truth** ("No. It never is.") ·
   **ruth-kind** (a kind lie she is grateful for) · **ruth-silent** (neutral). "Don't write my name
   down anywhere."

Canon: consistent with the prior Evelyn being burned, then inventoried (docs/story/ENDGAME_RECONVERGENCE.md); her fate beyond
that is not stated.

## Sequence: The River Walk (2026-09-25)

Own-power, at `resolve`, after the café table and before the lawyer (held in `c9.walk-open`: why →
rail). Sloane comes back: "Walk with me. Not in a car. I am tired of cars." The embankment, hands
in her pockets so that you will not see what they are doing.
1. **What she asks** (`c9.walk`): **walk-box** ("they were going to be burned on a Tuesday… So I
   signed the other form"; "Everything is a test. That doesn't mean it wasn't also the other
   thing.") · **walk-leash** ("I was handed you, with a report attached that said you could not be
   held… I signed for you anyway") · **walk-adrian** (neutral; "the only analyst who ever told me I
   was wrong in writing… I kept the memos").
2. **At the rail**: "Whatever you are going to do with what you have, do it before the first
   Thursday." (`c9.rail`): **rail-trust** ("I can't… which is the most I have ever been able to do
   for anybody") · **rail-warn** ("you will be very surprised how much nothing can cost") ·
   **rail-quiet** (neutral; the gloves off and on; "Thank you.").
3. The car she is tired of, waiting.

Canon: Sloane as the person in the machine (docs/story/ENDGAME_RECONVERGENCE.md).

## Structure after the restructuring pass (2026-09-25)

Own-power:

| Phase | Title | Place | Holds |
|---|---|---|---|
| `arrive` | The Same Wall | THE NEXT MORNING | the morning, the Straits Club |
| `names` | The Eleven Names | EVENING · THE OLD HARBOUR | Ruth, then `arrive-begin` |
| `table` | The Usual Table | THURSDAY · CASTELLANE (MIDDAY · THE TAILOR ON THE HILL first) | the floor, the tailor, Castellane |
| `auction` | Lot Fourteen | EVENING · THE HARBOUR SPRING AUCTION | if the Aster piece ran |
| `assemble` | Assembling the Case | · WHAT YOU HOLD | the hub (a short opener when she came through Castellane) |
| `resolve` | What You Can Carry | · THE CASE | the band; the watcher's rent, the window |
| `cafe` | The Watchers' Table | MORNING · THE CAFÉ OUTSIDE | Sloane |
| `river` | The River Walk | MORNING · THE EMBANKMENT | the walk |
| `counsel` | Exhibit A | AFTERNOON · ABOVE THE LOCKSMITH'S | the lawyer, then `resolve-end` |

Other lanes keep arrive → assemble → resolve (the lawyer, then `resolve-end`) → complete.
`enterResolve9` still fixes the name floor and the band on entering `resolve`, so nothing after it
adds case weight. Choice ids are unchanged.

## Sequence: The Last One (2026-09-25)

Own-power, its own phase, `archive` (The Last One · AFTERNOON · THE PERIODICALS ROOM), between the
river and the lawyer. Ruth's "better than the last one I saw", followed to the library's microfiche.
1. **How she searches** (`c9.fiche`): **fiche-faces** (neutral) · **fiche-words** ("from nowhere,
   mysterious, nobody can place") · **fiche-ruth** (a younger Ruth at a trade dinner, and beside
   her…). All find **Anna Kessler**, "the woman nobody can place", one Harbour season six years ago:
   "very slightly wrong in every photograph, the way a translation is wrong", a tall woman with
   cropped hair out of focus at her shoulder.
2. **Follow her forward?** (`c9.kessler`): **kessler-follow** (two years later: a sailing accident,
   "Her body was not recovered. She had no family."; a fact) · **kessler-stop** (neutral; to the
   lawyer).
3. If followed (`c9.last`): **last-case** ("They make it heavier.") · **last-screen** (her
   reflection over Kessler's) · **last-leave**.

**For the owner's review:** Anna Kessler is an invention. She is an earlier reissue, which the canon
allows (Meridian sells lived-in legends; Ruth has seen "the last one"). Her fate is deliberately
open: RETIRED or CLOSED, with no body recovered. Say if she should change or go.
