# Chapter 11 — "The Asset" (design)

**Act III · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 0.7h / ~7k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [BEAT_MAP.md](BEAT_MAP.md) (Act III), [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md)
§3 (coercion framework) and §11 (checklist), [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md)
(canon), [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md) (the test: thrilling, erotic, fun).
Status: **approved (owner, 2026-09-25: all six decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_11_THE_ASSET_SCRIPT.md](scripts/CHAPTER_11_THE_ASSET_SCRIPT.md), code: `src/content/chapter11.ts`.
Gated like Chapters 6–10 (`VITE_EVE_CHAPTER11`, content revision ≥ 19). Deepened 2026-09-25: ~3.5–3.6k words on the golden paths, ~3.8–4k engaged.

---

## 1. The chapter's job

Chapter 10 claimed Evelynn in public and gave her a first order. Chapter 11 is the first night she
is **run as an asset**: the first Thursday, the Vesper Gallery, Meridian's clients.

By the end of the chapter the player must:

1. **Have played a real field op**, Glass House scale: working a room, going where she should not,
   taking something out. The spy game of Act III.
2. **Know what the Vesper is:** Meridian's showroom. The evening is a *viewing*, and she is on the
   catalogue, "available for placement from the first Thursday of next month" (Chapter 13's
   placement).
3. **Have met someone else Meridian owns,** Iris Moreau, a working legend, who trusts her within
   the hour.
4. **Have answered a second order that costs more than the first:** to be the one who burns Iris.
   Comply / refuse / counterplay, each with a real cost.
5. **Leave with something on the board:** the catalogue, an ally, or a debt.

What it must not do: confront Celeste with the case (Act IV), make Celeste afraid (Ch14), or put
anything sexual on screen that is not chosen. The viewing is about *placement* (espionage use), and
nobody lays a hand on her.

**Why it is thrilling, erotic and fun:** the thrill is the op and the order; the erotic charge is
the green dress in a room built for looking, desire she chooses (a dance she uses, Julian watching
her be shown, an evening afterwards with a man she wants); the fun is that she is *very good at
this*, and gets to win something back from Celeste in her own house.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 11 does with it |
|---|---|---|
| `c10.green` (own / odile / buy / black) | Ch10 | Celeste's first look: pleased, amused, or "Black. How brave." Black makes her conspicuous |
| `c10.invitation` (accepted / pending) | Ch10 | Accepted: she arrives on her terms. Pending: the car Celeste booked is at the kerb, and Pryce opens the door |
| `c10.answer`, `act3.celeste-surprised` | Ch10 | How Celeste handles her: a pet (complied), a disappointment (refused), a player (countered) |
| `act3.maya-clearance` (renewed / suspended) | Ch10 | The named threat escalates: renewed → suspended; suspended → revoked |
| `act3.ally.theo`, `act3.ally.julian`, `c10.betrayed` | Ch10 | An ally can be in the room (counterplay); a betrayed partner can be too, and knows |
| `c10.poison`, `c10.kept-copy` | Ch10 | Counterplay material: a swapped memo, a paper trail |
| `act3.board-day` | Ch10 breakfast | The board is upstairs tonight |
| `case.strength` | Ch9 | A strong case opens a counterplay |
| `c9.auction`, `c9.tailor`, `c9.kessler` | Ch9 | Her portrait is on the Vesper's wall tonight; the charcoal or green fits by a centimetre; Iris knew Anna Kessler |
| `c7.robe = coats` (ticket 41) | Ch7 | The Vesper cloakroom still holds the first Evelynn's coat, fourteen months on |
| `c8.pryce` | Ch8 | Pryce drives, or holds the service door |
| Julian in play (`julian5` / Ch7 evening / crossover) | Ch4–8 | Helix is a Meridian client: Julian is a guest, and sees her shown |

---

## 3. Shape

Phases (new gated nodes, each a scene with its own title and place):

`arrival` → `viewing` → `upstairs` → `order` → `ending` → `after` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `arrival` | The First Thursday · 20:00 THE VESPER GALLERY | ~900 | How she walks in |
| 2 | `viewing` | The Viewing · 20:30 THE LONG ROOM | ~1,500 | How she works the room; Iris |
| 3 | `upstairs` | Upstairs · 21:40 THE PRIVATE FLOOR | ~1,400 | How she gets up; what she takes |
| 4 | `order` | The Second Order · 22:15 THE TERRACE | ~700 | Comply / refuse / counterplay |
| 5 | `ending` | Ending · 22:40 THE CLOAKROOM | ~1,300 | A moment inside the job |
| 6 | `after` | What the Clients Saw · MIDNIGHT | ~900 (+~500 evening) | One reply; an optional chosen evening |
| | | **Total** | **~6,700 (+500)** | |

---

## 4. Scene by scene

### 4.1 The First Thursday (`arrival`)

Getting ready is a scene: the green (or the black), the charcoal taken in a centimetre (if
`c9.tailor = alter`), the face finished twice. *Pending* invitation: the booked car at half past
seven, and Mr Pryce holding the door ("Ms Laurent's compliments."). The Vesper: black glass, no
name, and tonight **no painting in the window**. Inside, the walls are hung with **empty frames**,
lit as if they held something. The guests are the exhibition.

If Celeste bought her portrait (`c9.auction`), it is the one frame that is full.

**How she walks in** (`c11.entry`):
- **arrive-star** · walk in as the face everybody knows (Celebrity): every head turns; the clients
  talk more freely to a star than to a stranger.
- **arrive-quiet** · come in on the edge, watch first: fewer eyes, better ears.
- **arrive-defy** (if an ally from Ch10 or a chosen partner is open) · "Bring nobody": bring
  somebody. Celeste's smile does not change; her next order will account for him.

### 4.2 The Viewing (`viewing`)

Celeste receives her in the long room ("Wear the green": pleased / amused / "Black. How brave.").
She walks Evelynn through her clients as if through a hang: a shipping man called Halvorsen, a
minister's wife, a quiet man from a Gulf fund, and, if Julian is in play, **Julian**, for Helix,
who sees her being shown and does not look away. The talk is of "placements", "availability",
"our last one", "the public profile". Evelynn understands, a sentence at a time, that the evening
is a **viewing**, and that she is on offer.

**How she works the room** (`c11.room`):
- **room-dazzle** · give them the show: they fall over themselves, and Halvorsen lets slip that
  the board sits *upstairs* while the clients drink.
- **room-listen** · charming and silent: she hears the word *catalogue*, and where it is kept.
- **room-dance** · accept a dance from the Gulf-fund man and use it: a hand on her back she
  allows, his mouth at her ear, and what he tells her about the private floor. Chosen, brief, her
  lead; she steps out of it the moment she has what she came for.

**Iris** (all paths): in the powder room, a woman in grey silk, forty, beautifully finished,
watching the room the way Evelynn does. "You're new. They put you in the green." Iris Moreau is a
working legend, four years inside Halvorsen's firm as his chief of staff. A cigarette on the
terrace she does not smoke; a kinship neither of them says out loud. If `c9.kessler = follow`:
"Anna used to stand exactly where you're standing."

### 4.3 Upstairs (`upstairs`)

The board meets on the first Thursday (`act3.board-day`) on the private floor. The op:

**How she gets up** (`c11.up`):
- **up-stairs** · the service stairs: stealth, and Pryce on the landing (if `c8.pryce`) looking the
  other way for exactly as long as it takes. She does not know why.
- **up-escort** · charm a client into "showing her the rest of the collection".
- **up-iris** (if she talked to Iris) · Iris shows her the way: "Four years, and nobody has ever
  asked me to show them anything."

Upstairs: a corridor of closed doors, one ajar on the board (Celeste's voice among others: "the
product is performing; the defect is an asset in a public placement"). And the **catalogue**: a
leather book, *The Autumn Collection*. Every page is a person. Her page: the Aster photograph, *E.
V. · reissued · public profile · available for placement from the first Thursday of next month.*
Iris's page: *I. M. · ending.*

**What she takes** (`c11.catalogue`):
- **cat-photo** · photograph her page and Iris's: evidence, a board asset. Risky.
- **cat-page** · tear her own page out: steal herself back. Celeste will know, and be delighted.
- **cat-leave** · take nothing; remember every line.

### 4.4 The Second Order (`order`)

On the terrace, Celeste gives her a gallery envelope. Inside, a folded memo in a hand that will be
read as Iris's.

> C.: Put this in Iris's bag before she leaves. She has been ours for four years, and she has done
> beautifully, and she is ending. I would like her to end tonight, and I would like you to be the
> one.

The named threat is still **Maya**, escalated: *renewed* → "Renewals can be reviewed." *Suspended*
→ "A review can become a dismissal." Counterplay needs something built: a strong case, Celeste
surprised once already, an ally in the room, the catalogue photographed, or the poisoned notes.

### 4.5 Ending (`ending`)

A moment inside each answer, as in Chapter 10:
- **Comply:** the cloakroom, the bag, the memo slid into the lining (she knows about linings).
  Halvorsen's man takes Iris aside at the door; Iris looks back at Evelynn, and knows. Her fate is
  left open: RETIRED.
- **Refuse:** the memo goes into the canal from the bridge. Celeste, by the door: "Pity." Iris
  leaves in a taxi, not knowing how close it came. Maya pays.
- **Counterplay:** warn Iris and give her the memo. Iris walks out of her own legend that night,
  through the kitchens. Or, with poisoned notes, swap the memo for one that points at Halvorsen's
  own man. Either way, Celeste is surprised twice.

If `c7.robe = coats`, the cloakroom attendant takes ticket 41, goes into the back, and brings out
the first Evelynn's coat, kept fourteen months.

### 4.6 What the Clients Saw (`after`)

- Maya (by answer and clearance): complied, her renewal holds; refused, suspended or revoked, still
  reversible in Ch14–15; countered, held.
- Iris: gone (complied), a note ("I know what you didn't do", refused), or a card from somewhere
  with no stamp, and a number (countered: `act3.ally.iris`, the first counterplay seed of the act:
  she knows how products are run).
- Celeste's reply on the black phone; the board updates (placement date, the catalogue, Iris).
- **Optional chosen evening** (only with a partner not betrayed in Ch10 or 11; heat 3,
  consent-gated, fades): Julian (who watched her shown, and wants her anyway, on her terms), Theo,
  or Sebastian. Never framed as a reward.

**Last line:** *Available from the first Thursday of next month. She has put a date on me. Then I
have a date too.*

---

## 5. Flags written (for Chapters 12–13)

`c11.entry` (star | quiet | defy) · `c11.room` (dazzle | listen | dance) · `c11.iris-met` ·
`c11.up` (stairs | escort | iris) · `c11.catalogue` (photo | page | leave) · `c11.answer`
(complied | refused | countered) · `c11.iris` (burned | spared | free) · `c11.reply` ·
`c11.evening-*`. Act III keys: `act3.maya-clearance` (renewed | suspended | revoked),
`act3.celeste-surprised` (once | twice), `act3.ally.iris`, `act3.placement` (next first
Thursday: Chapter 13's placement).

Leverage board: Celeste's entry gains the second order and the placement date; Evelynn's column
gains the catalogue (photo or page) and Iris (if free).

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: the dance (her lead, brief), the optional
   evening (fades). ✔
2. Coerced sexual content: none. The viewing is placement, not sex; nobody touches her without
   her choosing. The reserved beat is Ch13. ✔
3. The order offers comply / refuse / counterplay, each with a real cost. ✔
4. Refusal never leads to sexual punishment: Maya's clearance, escalated. ✔
5. The threat to Maya is non-sexual (clearance, job). ✔
6. The leverage is specific and recorded (the board). ✔
7. The clinic is untouched. ✔
8. Iris's fate (complied) happens off screen and stays open. ✔

---

## 7. Art (dark noir band: mean 45–70, ≥40% near-black)

1. The Vesper exterior: black glass on the embankment, the empty window, rain.
2. The long room: empty frames lit on dark walls; figures in evening dress in silhouette.
3. The terrace over the river at night (Iris's cigarette; later the order).
4. The private-floor corridor: closed doors, one ajar, a line of light.
5. *The Autumn Collection* open on a lectern under one lamp (in-fiction; no readable faces).
6. The cloakroom: a hatch, numbered tickets, coats in the dark behind.

---

## 8. Build plan (after approval)

1. **Script** — `scripts/CHAPTER_11_THE_ASSET_SCRIPT.md` (flow and flags; wording in code, as
   Ch10).
2. **Engine** — `src/content/chapter11.ts` (gated `VITE_EVE_CHAPTER11`), phases in the node
   schema, sub-states in `c11.*`, reducer/App routing and art stand-ins like Chapter 10; entry from
   `chapter10.complete` on the own-power road.
3. **Board** — `leverage.ts` gains the second order, the placement date, the catalogue and Iris.
4. **Tests** — every answer × counterplay source reaches `complete`; refusal touches nothing
   sexual; the dance and evening are chosen and gated; goldens for Ch11 from the Ch10 goldens.
5. **Art** — the six frames, luminance-gated, owner approval before promotion.

---

## 9. What it sets up

- **Ch12 Singapore:** the catalogue's code for her page matches Emerald Hill; Iris (if free) knows
  who ran Singapore.
- **Ch13 The Honeypot:** the placement date is the order. The reserved beat has its date and its
  client, chosen from tonight's room.
- **Ch14 Sloane's Turn / Ch15 Breaking the Leash:** the catalogue is the counter-operation's proof
  that Meridian sells people; Iris is the witness who was sold.

---

## 10. Decisions for the owner (recommendations first)

1. **The second order's target is Iris Moreau,** a new character: another Meridian legend,
   met and trusted within the chapter, rather than a partner from before (Ch10 already did that).
   *Recommended: yes.* It is the beat map's "someone who trusted her" and "someone else Meridian
   burned" in one person, and it shows what "ending" means before it can happen to Evelynn.
2. **The Vesper is Meridian's showroom, and she finds her own catalogue page** ("available for
   placement from the first Thursday of next month"). *Recommended: yes.* It turns Chapter 13's
   honeypot from an order out of nowhere into a date she has seen coming.
3. **Refusing escalates Maya:** renewed → suspended; already suspended → revoked (a dismissal),
   still reversible in Ch14–15. *Recommended: yes.*
4. **Julian is a guest** (Helix is a Meridian client) when he is in play, and watches her being
   shown. *Recommended: yes*: the erotic tension of the chapter, and it colours his evening.
5. **The dance** (`room-dance`) is a chosen use of her allure as cover: brief, her lead, no more
   than a hand on her back and a whisper. *Recommended: yes.* Say if you want it warmer or cut.
6. **Iris's fate on compliance** stays open and off screen (RETIRED). If Anna Kessler stays in
   canon (Ch9 review), Iris knew her. *Recommended: yes.*
