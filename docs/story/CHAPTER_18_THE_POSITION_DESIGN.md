# Chapter 18 — "The Position" (design)

**Act IV finale · the endings (Celebrity / own-power built first) · NEW**
**Budget: 0.5h / ~5k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §7 (`position`: own-power "hold the proof no one
can revoke; audience as shield; Adrian ends beholden to no door"; every position is "increased agency, not capture")
and §8 (doctrine), [BEAT_MAP.md](BEAT_MAP.md) (Act IV: "Maya, Julian, Sebastian or Theo resolved. An epilogue beat
(heat 3 at most if chosen). Who she is now: Adrian, Evelyn, or someone new"), [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md),
[CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md).
Status: **approved (owner, 2026-09-26: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_18_THE_POSITION_SCRIPT.md](scripts/CHAPTER_18_THE_POSITION_SCRIPT.md), code: `src/content/chapter18.ts`.
~1.2–1.3k words on the golden paths. Gated like Chapters 6–17 (`VITE_EVE_CHAPTER18`, content revision
≥ 19), entered from an own-power `chapter17.complete`. **The last chapter of the Celebrity route.**

---

## 1. The chapter's job

Chapter 17 ended with Evelynn opening the Vesper's front door herself. Chapter 18 is **what she does with what she is
holding**: the ending, as a position (ENDGAME §7), not a verdict.

By the end of the chapter the player must:

1. **See what the board's decision bought** (`act4.board`, `act4.terms`): the morning after, in the papers or not;
   Celeste's fate; Sloane's.
2. **Hold her position:** the aim chosen on Thursday morning (`act4.aim`: expose, terms, Nell, out) becomes a life,
   scaled by what the board granted. Every version leaves her holding more than she came in with (§7: "no ending
   strands Adrian with less than they came in holding"); the differences are what kind of power, and at what cost.
3. **Decide the switch:** the last lever in her hand, kept armed, handed on, or disarmed.
4. **Resolve the people:** Maya, and whoever she chose (Julian, Theo, Sebastian, Owen), or nobody; and the ones who
   helped (Sloane, Iris, Pryce, Nora).
5. **Answer who she is now:** Adrian, Evelyn, or someone new. No answer is punished.
6. **Close on a year later:** an epilogue beat, chosen, heat 3 at most, and the last card on the last wall.

What it must not do: topple Meridian, turn any ending into capture, punish a consent or identity choice, or reveal
anything that contradicts the one truth (§8). Celeste and Sloane end as people in the machine.

**Why it is thrilling, erotic and fun:** the thrill is the switch in her hand, the last lever and the only one she
gets to decide about calmly; the erotic charge is a chosen night a year on, with the man she chose, or none; the fun
is the reckoning of everything she did, read back to her by the world: the headline, the postcard, the doorman.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 18 does with it |
|---|---|---|
| `act4.aim` (expose / terms / nell / out) | Ch16 | The shape of her position |
| `act4.board` (resigned / diminished / closed), `act4.terms` (full / partial / none) | Ch17 | How much of the aim the world gave her, and how much she holds by herself |
| `act4.nell-said`, `act4.sloane`, `act4.last`, `act4.inside`, `act4.outside` | Ch17 | Nora's ending; Sloane's; what Celeste carries away; who walked out beside her |
| `act3.switch`, `act3.black-phone`, `act3.adrian`, `act3.page`, `act3.cards`, `act3.nell-order` | Ch15 | What she holds that nobody can revoke |
| `c15.cost` (ally / visibility / money / relationship), `c15.cost-who` | Ch15 | The price, come back as part of who she is |
| `act3.maya-choice`, `c6.maya`, `mayaKnowsWho` | Ch6, Ch14 | Maya's ending |
| Partners in play and not spent (`eveningPartners14`), `act3.ally.marsh` | Ch4–15 | Who she can go home to |
| `c5.published`, `act3.exposed`, `own.campaign` | Ch5–15 | Her public life: the face from the station, or not |

---

## 3. Shape

`morning` → `position` → `people` → `name` → `later` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `morning` | Friday · THE MORNING AFTER | ~900 | How she spends it |
| 2 | `position` | The Position · THAT WEEK | ~1,100 | The switch |
| 3 | `people` | The People · THAT MONTH | ~1,000 | Who she goes home to |
| 4 | `name` | A Name · THE WALL | ~700 | Who she is now |
| 5 | `later` | A Year Later · SOMEWHERE | ~900 (+~300 chosen) | The last night, chosen or quiet |
| | `complete` | The End | ~200 | |
| | | **Total** | **~4,800 (+300)** | |

One shared spine again: the aim and the board change what she reads in each scene, not which scenes.

---

## 4. Scene by scene

### 4.1 Friday (`morning`)

The morning after, by the board's decision:
- **resigned** · the papers: a line in the business pages (MERIDIAN DIRECTOR STEPS DOWN) or, if the aim was expose, the
  front page with the verdict on it and Celeste's signature circled. Deverell's undertaking in her bag.
- **diminished** · nothing in the papers; a letter from Soames, typed, courteous, conceding half of what she asked.
- **closed** · nothing anywhere. The switch, and the street, and her.

Celeste's last word arrives, by `act4.board`: a postcard in green ink from Lisbon (resigned: *You were worth it. C.*),
a white orchid with no card (diminished), or nothing at all, ever (closed). Sloane's by `act4.sloane`: cleared and back
at her desk (vouch), on leave and writing a report nobody asked for (stand), or gone from Axiom with a box and her good
shoes (use).

**How she spends it** (`end.morning`): **morning-papers** (read every word, twice) · **morning-sleep** (sleep until two,
the first unguarded sleep in eight months) · **morning-maya** (if Maya is close: breakfast, and the whole story, slowly,
with wine at eleven in the morning, as promised).

### 4.2 The Position (`position`)

The aim, becoming a life (§7, own-power), scaled by the terms:
- **expose** · the story runs, and runs: Theo's documentary, the Authority's inquiry reopened, questions in Parliament;
  she is the most recognised woman in the country, and nobody can place her again, because everyone is watching. The
  audience as shield. (With no terms: she publishes anyway, the slow public road, and it takes a year.)
- **terms** · the undertaking kept, the quiet life: Maya untouched, Adrian's name retired, page seven closed. Nobody in
  London outside a handful of people knows what happened in that room. That is the point.
- **nell** · Nell's file released to Nora, entire (full), or Nora's own inquest reopened (partial/none); the harbour wall
  with Nora at dusk, the two of them, and two coffees, one with two sugars and cinnamon.
- **out** · the leverage in her pocket and the life behind her: a car at the kerb, a boat Kit Harlow always said he'd
  find, a plane Julian doesn't ask about; a coast she has never seen.

**The switch** (`end.switch`), the last lever and the only one she decides calmly: **switch-armed** (kept armed for
the rest of her life: three people who will never meet, waiting for a phone that must keep ringing) · **switch-handed**
(given to someone she trusts to hold it: Maya, Sloane, Nora or Owen) · **switch-disarmed** (the letters taken back and
burned: she decides she does not need a gun to the head of the world to be free). The own-power ending: all three are
"holding the proof no one can revoke"; they differ in what kind of freedom.

### 4.3 The People (`people`)

Short vignettes, by state: Maya (by her Chapter 14 choice and whether she knows who Evelynn was: the dinner she was
promised; Leeds and the return; the interview she gets); Sloane; Iris (a postcard with no message, from a coast);
Pryce (driving a cab now, his own, who will not take her money); Nora (with Nell's photograph on her kitchen wall);
Marsh (his inquiry, or his cardboard box); the doorman at the Vesper, who writes to her. The cost of Chapter 15
comes back here: the ally spent, the relationship given up, the money gone.

**Who she goes home to** (`end.with`): a partner in play and not spent (Julian, Theo, Sebastian, Owen), each resolved on
her terms (Julian: "Tell me what you want, and that's what happens", for good; Theo: the story ran and he stayed;
Sebastian: a city on the tour she chooses; Owen: toast at one in the morning, and the bicycle on the wall); or Maya,
as the family she chose; or **nobody**, which is also a whole answer.

### 4.4 A Name (`name`)

The wall, the last time. She takes every card down. There is one left to write.

**Who she is now** (`end.name`), none punished, none framed as the right answer:
- **name-adrian** · she takes his name back, and keeps this life: Adrian, in the body she has, on her own terms. The
  name on the letter to the bank, and on the card.
- **name-evelyn** · she keeps the name they gave her, and makes it hers by what she did with it. Evelyn Vale, who is
  nobody's legend now.
- **name-new** · a new name, one nobody gave her, which she writes on the last card and does not show us.

The clinic and the transformation are not revisited; the question is a name and a life, not a body.

### 4.5 A Year Later (`later`)

A year on, somewhere (by aim: London in the rain; Holland Village; a coast). What she holds, by the switch. The black
phone, if kept, in a drawer, never switched on. Meridian's new catalogue, which a friend of Iris's sends her, has no
page seven and never will. Celeste, by board, in Lisbon, or in her chair, or not mentioned.

**The last night** (`end.later`), chosen: **later-close** (with whoever she went home to: a chosen night, heat 3 at most,
consent in character, fades; or with Maya, a kitchen, and a laugh), or **later-quiet** (alone, at a window, with a cup
of coffee, black).

### 4.6 The End (`complete`)

The last card, pinned to a wall that is hers, in her own hand, by the name she chose. The last line, by name:
- Adrian: *My name is Adrian Vale. I was a product once. Now I'm the only one who knows what I'm worth.*
- Evelyn: *My name is Evelyn Vale. They built her to be sold. I bought her back.*
- New: *I wrote my name on the last card and pinned it to the wall. It's nobody's business but mine. That's the whole point.*

---

## 5. Flags written

`end.morning` · `end.switch` (armed | handed | disarmed, with `end.switch-to`) · `end.with` (julian | theo | sebastian |
marsh | maya | alone) · `end.name` (adrian | evelyn | new) · `end.later` (close | quiet) · `end.position` (the aim, as
lived: expose | terms | nell | out, with the terms level). The final save carries the whole ledger; a future "your
story" recap reads it.

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content only if chosen, heat 3 at most, consent in character, fades. ✔
2. No coercion. ✔
3–5. Maya ends safe on every path. ✔
6. Everything she holds is sourced and shown. ✔
7. The clinic and the transformation are not revisited; the name question is a name and a life. ✔
8. No ending is capture; none strands her with less than she walked in holding. ✔

---

## 7. Art (dark noir band)

1. A newspaper on a café table, a circled signature (no readable faces).
2. Three envelopes on a kitchen table, one match.
3. A harbour wall at dusk, two coffee cups on it (the Nell position).
4. A window at night, a woman's back, a city (the year later).
5. A wall with one card on it.

---

## 8. Build plan (after approval)

1. **Script:** `scripts/CHAPTER_18_THE_POSITION_SCRIPT.md`.
2. **Engine:** `src/content/chapter18.ts` (gated `VITE_EVE_CHAPTER18`), six phase nodes, `end.*` keys; wiring as Ch17;
   an "ending" state that stops the story cleanly (no further chapter offered).
3. **Board:** `leverage.ts` shows the final position: what she holds, and the switch.
4. **Tests:** every aim × board × switch × name reaches `complete`; no ending leaves her holding less than she walked
   in with; Maya is safe on every path; the chosen night is chosen and fades; goldens from the Ch17 goldens.
5. **Art:** the five frames, luminance-gated, owner approval before promotion.

---

## 9. What it sets up

The Celebrity route is complete, end to end. Then: deepening passes (Act III and IV are lean), the other routes built
on this template (Predator next, per the route map), and art.

---

## 10. Decisions for the owner (recommendations first)

1. **Six short scenes:** the morning after, the position, the people, the name, a year later, the end. *Recommended:
   yes*, one shared spine.
2. **The aim becomes the position, scaled by the board's terms,** and every version leaves her holding more than she
   walked in with (a closed board still leaves her the switch and the public road). *Recommended: yes* (§7).
3. **The final lever is the switch:** keep it armed, hand it to someone she trusts, or disarm it. *Recommended: yes*:
   the one decision she makes calmly, and it defines what kind of freedom she has.
4. **Who she is now: Adrian, Evelyn, or a new name she keeps to herself,** none punished, and the transformation not
   revisited (a name and a life, not a body). *Recommended: yes.*
5. **She chooses who she goes home to,** from partners in play and not spent, or Maya, or nobody; each resolved on her
   terms. *Recommended: yes.*
6. **A year later, an optional chosen night** (heat 3 at most, fades), or a quiet one. *Recommended: yes.*
7. **Celeste's last word:** a postcard in green ink from Lisbon if she resigned, a white orchid with no card if
   diminished, nothing at all if the board closed ranks. *Recommended: yes*: a person in the machine, to the end.
