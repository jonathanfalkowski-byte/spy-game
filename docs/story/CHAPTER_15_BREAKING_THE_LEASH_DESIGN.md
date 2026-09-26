# Chapter 15 — "Breaking the Leash" (design)

**Act III finale · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 0.7h / ~7k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [BEAT_MAP.md](BEAT_MAP.md) (Act III: "The coercion ends here: by breaking it, not by obeying"),
[CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §3 and §11, [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) (§5, the
entry contract Act IV reads), [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md) (thrilling, erotic, fun).
Status: **approved (owner, 2026-09-25: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_15_BREAKING_THE_LEASH_SCRIPT.md](scripts/CHAPTER_15_BREAKING_THE_LEASH_SCRIPT.md), code: `src/content/chapter15.ts`.
~2.3k words on the golden paths at pass 1; deepened 2026-09-26 to ~2.5–2.6k. Gated like Chapters 6–14 (`VITE_EVE_CHAPTER15`, content revision
≥ 19), entered from an own-power `chapter14.complete`.

---

## 1. The chapter's job

Chapter 14 left a card on the wall: *THE BOARD MEETS. THE FIRST THURSDAY.* Chapter 15 is the month before it, and
the end of Act III: **Evelynn takes the leverage away.** Not by obeying, and not by one more clever answer to one
more order, but by going into the place where Celeste keeps it and taking it out.

By the end of the chapter the player must:

1. **Have run the counter-operation**: a break-in at the Vesper's archive, where Celeste "keeps everything":
   every life in the collection, and every lever on every life.
2. **Have broken each hold on the board**: Maya (the forged file proved forged, the charge dropped), Adrian's name
   (taken back, or defused with Axiom), the placement (her page out of the catalogue), and the black phone itself.
3. **Have paid for it:** one real cost, chosen, that Act IV remembers: an ally, her visibility, her money, or a
   relationship.
4. **Leave Celeste knowing the next meeting is the last.** The board sits on Thursday; Celeste has lost control and
   says so, in her own way.

What it must not do: confront Celeste with the whole case (that is Ch17, The Room), topple Meridian (canon: wound,
don't topple), or resolve Nell's death (open until Act IV). No sexual coercion (the reserved beat was Ch13).

**Why it is thrilling, erotic and fun:** a heist at the Vesper at night is the thrill of the act, and the most fun
the game has had since the Glass House: a crew she chose, a plan, a snag, and her own face on page seven to tear
out; the erotic charge is the optional chosen evening after, the first night in months with nobody holding anything
over her; and the ending is the black phone, going quiet for good.

**Structure note (the lesson of Chapters 13 and 14):** the heist is **one shared spine** that every road runs
through. The three Chapter 14 outcomes change the framing and the stakes, not the scenes, so any one path reads
most of the chapter.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 15 does with it |
|---|---|---|
| `c14.answer` (complied / refused / countered) | Ch14 | The road in: Celeste's pause she will break (countered), Sloane lost and the verdict gone (complied), or hunted with no home (refused) |
| `act3.sloane` (free / truce / held / allied / shut / handed) | Ch14 | Whether Sloane is on the crew, a witness who has to be asked, or someone to get back |
| `act3.maya-choice` (stay / witness / away), `act3.maya-status` | Ch14 | Maya on the crew (stay), on the record (witness), or in Leeds (away); whether the charge still stands |
| `act3.adrian-burned`, `act3.home` | Ch14 | Axiom hunting her; where she plans from (a borrowed room) |
| `act3.ally.iris`, `c13.card` | Ch11, Ch13 | Iris knows the Vesper's service stair and the safe; the 1109 card already out |
| `c8.pryce` | Ch8 | Pryce has the Vesper's keys, and a last chance to do an ending |
| `act3.ally.marsh`, `act3.honeypot = burned` (Theo), `act3.ally.nora`, `c12.statement` | Ch12–13 | Where the evidence goes after (the dead man's switch) |
| `c9.lawyer = retain` (Nadia Brandt), `act3.maya-lawyer` | Ch9, Ch13 | Who gets Maya's charge thrown out |
| `c14.file`, `c14.copy`, `c9.lever`, `c6.oracle-seen` | Ch6–14 | The ORACLE verdict: in hand, photographed, or back in Celeste's archive (to take again) |
| Partners in play, `act3.ally.marsh` | Ch4–14 | The optional chosen evening |

---

## 3. Shape

`crew` → `plan` → `vesper` → `archive` → `leash` → `phone` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `crew` | The Crew · THE WEEK AFTER · A BORROWED ROOM | ~1,000 | Who she asks (one or two) |
| 2 | `plan` | The Plan · WEDNESDAY | ~800 | The way in |
| 3 | `vesper` | The Vesper at Night · THURSDAY, 02:00 | ~1,500 | The snag |
| 4 | `archive` | Everything · THE ARCHIVE | ~1,200 | What else she takes |
| 5 | `leash` | Breaking the Leash · THE WEEK AFTER | ~1,200 | The cost |
| 6 | `phone` | The Black Phone · WEDNESDAY NIGHT | ~800 (+~500 evening) | What she does with it; an optional chosen evening |
| | `complete` | Act III · THE WALL | ~300 | |
| | | **Total** | **~6,800 (+500)** | |

---

## 4. Scene by scene

### 4.1 The Crew (`crew`)

A borrowed room, by road: her own flat (countered, complied), or, on the refusal road, Julian's spare room,
Marsh's flat in Kennington, Maya's sofa or a hotel under another name. The wall, remade from memory on the refusal
road, card by card, on a hotel wardrobe door.

The road in, stated plainly:
- **Countered:** Celeste gave her word to pause "until the board has met". Iris (or Sloane) warns her it will last
  exactly until Celeste has moved what she keeps somewhere Evelynn can't reach. There is a week.
- **Complied:** Sloane is gone: suspended from Axiom, passport held, not answering. The verdict is back in the
  Vesper. Celeste is kind to her, which means she thinks she has won.
- **Refused:** Axiom is looking for Adrian Vale. She has a coat, a phone, and the card that says THE BOARD MEETS.

**Who she asks** (`c15.crew`, one or two, each a short scene, never the whole cast): Iris (if an ally: "I know
where the safe is. I was the one who stocked it."), Sloane (if free, in a truce, held or allied; or, on the comply
road, the scene where she has to go and ask, and Sloane says yes for her own reasons), Maya (if she stayed: "I've
audited worse buildings than that one."), Pryce (if known: the long conversation in the car, and his answer), Theo or
Marsh (outside the building: the dead man's switch). Or nobody: alone, which the plan will feel.

### 4.2 The Plan (`plan`)

The wall, turned into a plan the way Adrian turned a filing into a timeline. **The way in** (`c15.way`), gated by
the crew:
- **way-iris** (Iris on the crew) · the service stair and the housekeeping keys; the archive is behind the
  reading room.
- **way-pryce** (Pryce on the crew) · the front door, with his keys, at two in the morning, as if they owned it:
  "I drive. I suppose tonight I also open doors."
- **way-invited** (always) · she asks Celeste for a meeting at the Vesper "to discuss the board", and uses it:
  the meeting is the cover, the crew is the job. The boldest and the most fun.

### 4.3 The Vesper at Night (`vesper`)

The shared set piece. The black-glass front on the embankment at two in the morning; the long room dark, the empty
frames catching the street light; the service stair; the reading room; the lectern with *The Autumn Collection*,
and behind the reading room's panelling, a door without a handle.

**The snag** (`c15.snag`), one thing that goes wrong, by way in: the doorman sleeping in the cloakroom (Iris, Pryce),
or Celeste arriving early for the meeting with a glass of wine (invited). **snag-talk** (charm it; Evelynn is very
good at this) · **snag-hide** (the cloakroom, the coats, ticket 41 if `c7.robe = coats`) · **snag-bold** (keep
going, and let it see you).

### 4.4 Everything (`archive`)

The archive: a narrow room of grey steel cabinets, lit by one lamp, cold as a church, and every drawer labelled
with a page number from the catalogue. "I keep everything, darling." She does: page seven (Evelynn), Iris, Nell, a
hundred others; 1109's cards in a safe; and a drawer marked for the people round the people: MAYA REYES, with the
forged emails' drafts, the metadata, the name of the writer.

She takes **Maya's file** (always) and **her own page** (always: she tears page seven out of *The Autumn
Collection*, whatever Chapter 11 did). And **one thing more** (`c15.took`), because there is time for one:
- **took-adrian** · Adrian Vale's file: the clinic's records, the fitting, the name. Nobody can spend it again.
- **took-cards** · the 1109 safe: every placement filmed, for Marsh and the Authority.
- **took-nell** · Nell's file: the Jakarta order, signed C. Proof of the burn, not the death (that stays open).
- **took-verdict** (complied road only) · the ORACLE verdict, taken back.

### 4.5 Breaking the Leash (`leash`)

The week after, the holds broken one by one, fast, a montage with the prose of a list:
- **Maya:** the forged file and its writer to Nadia Brandt (or Marsh); the charge dropped; her clearance restored;
  her interview rescheduled. Maya's line depends on her choice in Ch14.
- **Adrian's name:** refused road, a meeting with Benton in a café: the verdict on the table, Axiom sold a product
  its maker knew was defective; Benton stands his people down rather than explain it to his own board. Other roads:
  the file is hers now (took-adrian), or the name is still Celeste's to spend, and she knows it.
- **The evidence:** copies to three people who don't know each other (Marsh, Theo, Nora, Nadia, by who is in play),
  with instructions for the day she stops answering. The dead man's switch.
- **Sloane:** free and useful; or back from the cold on the comply road, as a witness, not a friend.

**The cost** (`c15.cost`), chosen, recorded for Act IV (it will come back):
- **cost-ally** · spend an ally: Iris's cover is burned to get the safe open, or Marsh goes public early and loses
  his inquiry to his minister.
- **cost-visibility** · go on Theo's show (or any show) as Evelyn Vale, the face from the station, and say the word
  Meridian on air. Public, protected, and never private again.
- **cost-money** · everything: Nadia's fees, Odile's advance repaid, the campaign walked away from. Broke, and free.
- **cost-relationship** · the one that hurts: Julian's deal with Helix (a Meridian client) dies with this, and he
  knew it would; or Maya has to leave London to be safe; or Theo has to choose his story over her.

### 4.6 The Black Phone (`phone`)

Wednesday night, the eve of the board. She writes the last message, the first one she has ever started:

> You · to C.: No more orders.

Celeste's reply, after a long time: *Then Thursday. Come as whoever you like, darling. I should warn you that I
shall be there as myself.* She knows the next meeting is the last.

**What she does with the black phone** (`c15.phone`): **phone-return** (in the Vesper's own orchid box, by
courier, with nothing written on the card) · **phone-river** (off the bridge, where the envelope went in Chapter
11) · **phone-keep** (switched off, in a drawer, as evidence: Act IV can use it).

**The evening** (optional, chosen, heat 3, consent recorded, fades): a partner in play, or Marsh; the first night in
months with nobody holding anything over her. Or alone, which is also freedom.

### 4.7 Act III (`complete`)

The wall. Every card on Celeste's side of the door moved to hers, one by one, except one, at the top: THE BOARD
MEETS.

**Last line of Act III:** *She held everything. Now I do. Thursday, I find out what that's worth.*

---

## 5. Flags written (for Act IV: Chapters 16–18)

`c15.crew` (a list) · `c15.way` (iris | pryce | invited) · `c15.snag` (talk | hide | bold) · `c15.took` (adrian |
cards | nell | verdict) · `c15.cost` (ally | visibility | money | relationship, with `c15.cost-who`) · `c15.phone`
(return | river | keep) · `c15.evening*`. Act III keys, resolved: `act3.leash = broken`, `act3.maya-status =
cleared`, `act3.adrian` (hers | defused | exposed), `act3.switch` (the dead man's switch holders), `act3.cost`,
`act3.sloane` (updated), `act3.pryce` (if he came). Entry contract for Act IV (ENDGAME §5): evidence in custody,
witnesses, exposure, allies and debts, resources.

Leverage board: Celeste's column empties; Evelynn's fills: Maya's file, page seven, the chosen thing, the switch.

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: the optional evening only. ✔
2. No sexual coercion (the reserved beat was Ch13). ✔
3. No order this chapter: the coercion ends by breaking it. The cost is chosen, not imposed. ✔
4–5. Maya is protected; every threat to her in the chapter is non-sexual and ends here. ✔
6. The leverage is specific and recorded, and taken off the board item by item. ✔
7. The clinic is untouched; Adrian's clinic *file* is taken back, never shown. ✔

---

## 7. Art (dark noir band)

1. A hotel wardrobe door covered in cards (the refusal road), or the wall at home.
2. The Vesper's black-glass front at 2 a.m., one figure at the service door.
3. The long room in the dark, empty frames catching the street light.
4. The archive: grey steel cabinets, one lamp, a drawer open.
5. The black phone on the bridge rail over the river at night.

---

## 8. Build plan (after approval)

1. **Script:** `scripts/CHAPTER_15_BREAKING_THE_LEASH_SCRIPT.md`.
2. **Engine:** `src/content/chapter15.ts` (gated `VITE_EVE_CHAPTER15`), seven phase nodes, `c15.*`, wiring and art
   stand-ins as Ch14; entry from `chapter14.complete` on the own-power road.
3. **Board:** `leverage.ts` empties Celeste's column as holds are broken and fills Evelynn's.
4. **Tests:** every road × way × took × cost reaches `complete`; the crew gates the ways; Maya's charge is cleared
   on every road; nothing sexual outside the chosen evening; goldens from the Ch14 goldens (one per road).
5. **Art:** the five frames, luminance-gated, owner approval before promotion.

---

## 9. What it sets up (Act IV)

- **Ch16 The Approach:** the plan for the board meeting, from what is in custody (the switch, the thing she took,
  the verdict), who is still standing beside her, and what she spent.
- **Ch17 The Room:** the Vesper on the first Thursday; Celeste "as herself"; the ORACLE verdict and Nell's name on
  the table.
- **Ch18 The Position:** the cost comes back as part of who she is at the end.

---

## 10. Decisions for the owner (recommendations first)

1. **The counter-operation is a break-in at the Vesper's archive** the week before the board meets: "I keep
   everything, darling." *Recommended: yes.* It is the heist of the act, and it takes the leverage from where it
   lives instead of answering one more order.
2. **One shared heist for all three roads,** framed differently by Chapter 14's outcome. *Recommended: yes*, so
   every path reads most of the chapter (Chapters 13 and 14 lost two-thirds of their prose to branching).
3. **She takes Maya's file and her own page always, and one thing more** (Adrian's file, the 1109 cards, Nell's
   Jakarta order, or on the comply road the verdict back). *Recommended: yes*, a real choice with Act IV weight.
   Nell's file proves the burn, not the death; that stays open.
4. **The cost is chosen from four** (an ally, her visibility, her money, a relationship) and recorded for Act IV.
   *Recommended: yes.* "Visibility" is the Celebrity route's own weapon: saying *Meridian* on air as the face from
   the station.
5. **On the refusal road, Axiom stands down after a meeting with Benton** (the verdict proves Axiom was sold a
   defective product; hunting her would expose them). *Recommended: yes.* Adrian's name is defused, not unsaid.
6. **Pryce can open the door** if he is known: "I suppose tonight I also open doors." *Recommended: yes*: the man
   who never did an ending does one.
7. **The coercion ends with the black phone:** her first message ever, "No more orders", then return it, drop it in
   the river, or keep it switched off as evidence. *Recommended: yes.*
