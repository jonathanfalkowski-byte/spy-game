# Chapter 12 — "Singapore" (design)

**Act III · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 0.7h / ~7k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [BEAT_MAP.md](BEAT_MAP.md) (Act III), [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md)
(canon: the prior Evelyn was burned, then inventoried; not secretly alive; Celeste is the board
signatory), [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §3 and §11, [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md)
(the test: thrilling, erotic, fun).
Status: **approved (owner, 2026-09-25: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_12_SINGAPORE_SCRIPT.md](scripts/CHAPTER_12_SINGAPORE_SCRIPT.md), code: `src/content/chapter12.ts`.
~3.7–4.1k words on the golden paths. (The bar is the Punkah Bar at the Marlowe Hotel: "the Lantern" is
already a place in the game.) Gated like Chapters 6–11 (`VITE_EVE_CHAPTER12`, content
revision ≥ 19), entered from an own-power `chapter11.complete`.

---

## 1. The chapter's job

Chapter 11 put a date on her: *available for placement from the first Thursday of next month*.
Chapter 12 is the three weeks before that date, and the one thing she does with them: she goes to
**Singapore**, to the life she is wearing, and finds the woman who lived it.

By the end of the chapter the player must:

1. **Know who the first Evelyn was:** her real name, **Nell** (Eleanor Linden), what she was like,
   and that she had a sister.
2. **Know how she ended:** burned in Jakarta (her name given to the wrong people), cut loose, and
   running, the night she "disappeared before breakfast". A week later she was taken out of the
   harbour. The inquest said misadventure.
3. **Carry the seed that Celeste burned her:** two witnesses who do not know each other point at
   "her friend, the tall one". A seed, not proof: the proof is for Act IV.
4. **Have seen the product with her own eyes:** the Emerald Hill flat, kept furnished and ready
   for the reissue. *They kept the shape*, made literal.
5. **Feel Celeste's reach at a distance:** no order this chapter, only pressure. Celeste knows
   where she is, whom she has seen, and says so.
6. **Come home with something on the board:** a witness, a statement, photographs of the flat, or
   a name.

What it must not do: resurrect Nell (canon), prove Celeste's guilt (Act IV), or let anything
sexual on screen be anything but chosen.

**Why it is thrilling, erotic and fun:** the thrill is breaking into her own flat and being
caught in it by the man who keeps it; the erotic charge is the heat of Singapore at night, a city
where everybody remembers her body and she gets to choose who has it, and a chosen evening with a
man who came a long way; the fun is being Evie for people who loved her, being very good at it,
and taking Celeste's money to investigate Celeste.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 12 does with it |
|---|---|---|
| `own.campaign` (taken) | Ch10 | Laurent's autumn campaign is paying: she asks Odile to shoot it in Singapore, so Celeste pays for the trip |
| `act3.placement`, `c11.answer`, `act3.celeste-surprised` | Ch11 | The clock (three weeks), and how Celeste speaks to her from a distance: a pet, a disappointment, a player |
| `act3.maya-clearance` | Ch10–11 | The pressure while she is away: a photograph of Maya, taken today, in London |
| `c11.iris`, `act3.ally.iris` | Ch11 | Iris free knows who ran Singapore: she gives her Ashby's name. Iris burned: nobody does |
| `c11.catalogue` (photo / page) | Ch11 | Her catalogue page carries a site code, **SG/EH-9**: Emerald Hill, number 9 |
| `c8.call` (evie / ask / down) | Ch8 | How Mrs Tan greets her: "Evie!" / "You rang me, and asked. You came" / wary, a stranger |
| `c7.robe = coats` (ticket 41, the matchbook) | Ch7 | The matchbook from a hotel bar on the Straits: a lead to the Punkah Bar and Ashby |
| `c7.robe` receipt (two sugars and cinnamon), shoes worn on the left | Ch7 | Nora knows them both: the cinnamon was Nell's, the black coffee was Celeste's |
| `c9.names-open = end` (Ruth on Jakarta) | Ch9 | She knows the word "burned" before Ashby says it; Ruth gives her a line to open him with |
| `c7.street` (Lotte) · `c8.emerald` | Ch7–8 | Lotte's balcony, "every night", with C. |
| `c9.kessler = follow` | Ch9 | Ashby knew Anna Kessler: "Another one who liked boats." (only if Kessler stays in canon) |
| Partners in play, not betrayed (Julian, Sebastian, Theo) | Ch4–11 | The optional chosen evening (§4.6) |
| `c8.pryce` | Ch8 | Pryce collects her at the airport when she lands home |

---

## 3. Shape

Phases (new gated nodes, each a scene with its own title and place):

`departure` → `emerald` → `flat` → `straits` → `sister` → `night` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `departure` | Welcome Home · CHANGI, 06:10 | ~800 | How she goes |
| 2 | `emerald` | Mrs Tan's Orchids · EMERALD HILL | ~1,100 | Who she is to Mrs Tan |
| 3 | `flat` | Number 9 · EMERALD HILL, AFTER DARK | ~1,400 | Where she looks; who she is when he walks in |
| 4 | `straits` | The Punkah Bar · THE MARLOWE HOTEL | ~1,200 | How she makes Ashby talk |
| 5 | `sister` | Nora · SUNDAY, HOLLAND VILLAGE | ~1,500 | What she tells Nora |
| 6 | `night` | The Heat · THE HARBOUR, MIDNIGHT | ~800 (+~500 evening) | The harbour; an optional chosen evening |
| | `complete` | A Name · ARRIVALS, LONDON | ~200 | |
| | | **Total** | **~7,000 (+500)** | |

---

## 4. Scene by scene

### 4.1 Welcome Home (`departure`)

A short prologue in London: the new card on the wall (the date), Nell's shoes by the door, and the
decision made at the kitchen table at 3 a.m. Then Changi at dawn, the heat like a hand on the back
of her neck the moment the doors open.

**How she goes** (`c12.cover`):
- **cover-campaign** (if `own.campaign = taken`) · ring Odile: "Shoot it in Singapore." Laurent's
  money flies her out business class and books the hotel. A press call at arrivals; a photographer
  who shot "her" three years ago and says she hasn't aged a day. Public, watched, and protected by
  being watched. The fun one: Celeste pays for her own investigation.
- **cover-quiet** · her own money, economy, sunglasses, a hotel on the wrong side of the river.
  Fewer eyes. It makes no difference.
- **cover-with** (if Julian, Theo or Sebastian is in play and not betrayed) · she does not go
  alone: Julian has Helix business in Singapore and a seat on the plane; Theo's show wants a
  Singapore special; Sebastian's four-city tour has a Singapore date. He is in the city, not in the
  investigation: the chosen evening (§4.6) is with him.

Whichever way, the black phone lights before the seatbelt sign goes off:

> C.: Welcome home, darling. Emerald Hill is lovely at this time of year. Do give my love to Mrs Tan.

She has not told anybody about Mrs Tan.

### 4.2 Mrs Tan's Orchids (`emerald`)

A row of old shophouses on Emerald Hill, painted shutters, the smell of rain on hot stone. Mrs Tan
lives across the landing from number 9, in a flat full of other people's orchids, which she keeps
alive for them.

Mrs Tan's greeting reads `c8.call`: "Evie!" and both hands; or "You rang me back. You came."; or a
stranger at the door, and the door on the chain.

**Who she is to Mrs Tan** (`c12.tan`):
- **tan-evie** · be Evie for her. Mrs Tan feeds her, scolds her for being thin, and tells her about
  "your" last night without being asked.
- **tan-truth** · tell her, gently, that she is not Evie. Mrs Tan looks at her for a long time.
  "No. You stand wrong. I thought it was the tiredness." She tells her anyway, as a witness this
  time, and asks her to find out what happened.
- **tan-listen** · let Mrs Tan decide who she is. She does not decide. She talks.

What Mrs Tan knows (all paths): the last night, fourteen months ago, Evie came home late and
limping, left the orchids on Mrs Tan's mat with a note ("Water them for me, I'm going to my
sister's"), and went down the stairs with one small bag before it was light. If a tall lady
asked, Mrs Tan was to say Penang. Then the tall lady came, and sat in the flat all afternoon with
the door shut, and the men in white gloves came after her.

And: a key. Evie left it under the orchids. Mrs Tan has kept it with them. "They changed nothing.
The men come every month. They clean. For who?"

### 4.3 Number 9 (`flat`)

The key still fits. The flat is not empty. It is **furnished exactly as the photographs in the
Axiom package**: the ivory jacket on the chair, a lipstick by the mirror, fresh milk in the fridge.
It is a stage kept dressed for a reissue, and the clothes in the wardrobe are new, cut to *her*
measurements, not Nell's. The legend has a flat, and the flat is waiting for her.

**Where she looks** (`c12.search`):
- **search-desk** · the bureau: a maintenance schedule on Meridian-house paper. *Site SG/EH-9 ·
  monthly · keep lived-in · Family contact (sister): N. Linden, cooperative, do not disturb.* A
  name, and the first time she reads the word sister. Board asset: the schedule (photographed).
- **search-wardrobe** · the new clothes in her size, and at the back, missed by the men in white
  gloves, a man's shirt, and in its pocket a boarding pass to Penang, unused, for the morning Nell
  left. She was running.
- **search-balcony** · the balcony where Lotte saw them "every night": two chairs, one ashtray, and
  across the lane the window of a flat with a white orchid in it. Somebody kept watch on this
  balcony, and on her, from over the road.

Then a key in the lock. A young man in a polo shirt with a clipboard: **the caretaker**, a
contractor who keeps the site, and has never seen the tenant before.

**Who she is when he walks in** (`c12.caught`):
- **caught-hide** · the bathroom, the door not quite shut, the light on the landing going off. He
  does his list, waters a plant that is plastic, photographs every room for a report, and nearly
  opens the bathroom door. Board asset: she photographs his report on his clipboard as he leaves.
  Celeste learns only that somebody used the key.
- **caught-evie** · walk out of the bedroom as the tenant: "Thank you, I'll be staying a while."
  He goes white, apologises, and makes a phone call on the stairs. Celeste learns the reissue has
  moved in, and is delighted.
- **caught-own** · "My name is Evelyn Vale. Who pays you?" He tells her the truth, which is that
  he does not know, and gives her the number he reports to. Board asset: the number. Celeste
  learns exactly what she did.

### 4.4 The Punkah Bar (`straits`)

The lead to the man who ran Singapore comes by whatever road she has: Iris (free) gave her a name;
the matchbook from Nell's coat pocket (`c7.robe = coats`); Ruth's word for Jakarta; or, on every
path, the number the caretaker reports to, answered by a hotel switchboard on the Straits.
(Solvable alone: the fallback always exists.)

The Punkah Bar at the top of an old colonial hotel: fans turning, a pianist playing to nobody,
the harbour lights beyond the shutters. **Colin Ashby**, sixty, linen suit, the manners of a man
who used to be important, the drinking of a man who knows he no longer is. He ran Meridian's
Singapore station for nine years. He sees her from across the room and puts his glass down very
slowly.

**How she makes him talk** (`c12.ashby`):
- **ashby-evie** · sit down as Nell and let him talk to a ghost. He apologises to her. He tells her
  it wasn't his desk. It's the most useful thing he has said in a year, and he has no idea he said
  it.
- **ashby-press** (if she has the catalogue, the client list, or the caretaker's report) · lay it
  on the bar. He reads it, and understands that the reissue is holding things he never could.
- **ashby-truth** · "I'm the reissue. They fitted me to her." He looks at her face for a long time,
  and orders two more drinks, and tells her everything he is prepared to say, which is not quite
  everything.

What Ashby knows (all paths, more or less of it): Nell was the best he ever ran. After Jakarta she
wanted out: she was going to walk out of her own legend, and take it with her. "Nobody leaves,
Ms Vale." Her name went to the wrong people in Jakarta, and the order to give it "came down from
upstairs. From a friend of hers." He will not say the name. But: "When she was in hospital in
Jakarta, somebody sent white orchids. Every day. She hated orchids."

If `c9.kessler = follow`: "Anna Kessler. Another one who liked boats." Board asset (press or truth
path): **Ashby's statement**, if she records it.

### 4.5 Nora (`sister`)

The emotional core. Sunday, a low house in Holland Village with a frangipani in the yard and a
child's bicycle. **Nora Linden**, forty, a teacher at an international school, who moved to
Singapore eight years ago to be near her sister. She opens the door and sees her sister's face.
She holds on to the door frame.

**What she tells Nora** (`c12.nora`):
- **nora-truth** · "I'm not Nell. They gave me her life." The hardest thing in the chapter to
  say, and Nora already half knows: "She walked like our father. You don't." They sit in the
  kitchen until dark. Nora becomes a witness (`act3.ally.nora`): the living proof that Meridian
  sells people, and the people attached to them.
- **nora-kind** · "I knew her. She talked about you." A kindness that is also a lie, and Nora
  wants it so badly she takes it. She gives her Nell's things as if to a friend.
- **nora-go** · she cannot do it. She says she has the wrong house, and walks back to the road,
  and Nora stands in the doorway watching her go in her sister's body. (Nora writes to her later,
  in Ch14: she knew.)

What Nora gives (all paths): Nell's name, and what she was like. She took two sugars and cinnamon
in her coffee (the receipt in the coat; "the black was always her friend's"). She hated orchids.
She loved the harbour at night. She rang on the Saturday night, fourteen months ago: *I'm out,
I'm coming to you Sunday, make the spare bed*. She never came. The police found her in the harbour
the next week. Misadventure, they said; she had a bad leg; it was dark.

And the seed:

> Nora: Her friend rang me on the Sunday morning. The tall one, with the beautiful voice. Before
> the police, before anybody. She said she was so sorry. I have spent a year wondering how she
> knew.

On the truth or kind path, Nora gives her a photograph of Nell on the harbour wall, laughing, in
flat shoes: her own face, on someone else.

### 4.6 The Heat (`night`)

The harbour at midnight, where Nell went into the water. Lights on the black water, the heat that
does not break. The black phone:

> C.: You've met Nora. Such a sweet girl. She never could keep a plant alive either.

And a photograph: Maya, leaving the office in London at seven this evening, taken from across the
road, captioned *London misses you.* Non-sexual, specific, and on the board.

**At the water** (`c12.harbour`): **harbour-name** · say Nell's name out loud to the water.
**harbour-orchid** · the white orchid from the flat, dropped in (if she took it). **harbour-quiet**
(neutral) · stand there until the heat lets go of her.

**The evening** (optional, only with a partner in the city and not betrayed; heat 3, consent
recorded, fades): the man who came a long way. Julian, in a hotel suite with the windows open on the
Straits: he has never seen her like this, and wants her anyway, on her terms. Sebastian, after his
concert, still in his shirtsleeves: "You don't have to tell me what today was. Come here or don't."
Theo, off air, who for once does not ask a single question. Each is a stop / stay / leave, like
Chapters 10 and 11. Never framed as a reward; it is what she chooses to do with her own body in a
city that remembers somebody else's. Or **night-alone**: the hotel roof, the pool lit from below,
and the city that thinks it knows her.

### 4.7 A Name (`complete`)

Heathrow in grey morning. If `c8.pryce`, Mr Pryce at arrivals with the car: "Ms Laurent's
compliments. She thought you'd be tired." On the wall at home, a new card beside the date: a name.

> t: Eleanor Linden. Nell. She took two sugars and cinnamon, and hated orchids, and was running
> when they caught her. I have her face and her flat and her coat. I am going to give her back her
> name, in a room full of the people who took it.

---

## 5. Flags written (for Chapters 13–17)

`c12.cover` (campaign | quiet | with) · `c12.tan` (evie | truth | listen) · `c12.search` (desk |
wardrobe | balcony) · `c12.caught` (hide | evie | own) · `c12.ashby` (evie | press | truth) ·
`c12.nora` (truth | kind | go) · `c12.harbour` · `c12.evening*`. Act III keys: `act3.nell`
(her name known), `act3.ally.nora`, `act3.celeste-knew` (the seed: two witnesses), `act3.singapore`
(what Celeste learned: key | moved-in | everything).

Leverage board: Celeste's column gains "knows you went" and the Maya photograph; Evelynn's column
gains, by path, the maintenance schedule (the product, on paper), the caretaker's report or number,
Ashby's statement, Nora (a witness), and Nell's name.

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: the optional evening only, consent recorded,
   fades. ✔
2. Coerced sexual content: none. The reserved beat is Chapter 13. ✔
3. No order this chapter; the pressure is surveillance and a threat to Maya, and every choice
   has a cost in what Celeste learns. ✔
4. Refusal never leads to sexual punishment (there is nothing to refuse; nothing sexual is
   threatened). ✔
5. The threat to Maya is non-sexual (a photograph, her clearance). ✔
6. The leverage is specific and recorded (the board). ✔
7. The clinic is untouched. ✔
8. Nell's death is reported, not shown. How she went into the water stays open for Act IV. ✔

---

## 7. Art (dark noir band: mean 45–70, ≥40% near-black)

1. Changi at dawn through the glass, a lone figure in sunglasses (or the press call's flashes).
2. Emerald Hill at night: shophouse shutters, a lit landing, orchids on a mat.
3. Number 9 dressed and waiting: the ivory jacket on the chair, one lamp, no one home.
4. The Punkah Bar: ceiling fans, a piano, the harbour lights through the shutters.
5. Nora's doorway: frangipani, a porch light, a woman holding the door frame (no readable face).
6. The harbour at midnight: black water, the city's lights, a figure at the wall.

---

## 8. Build plan (after approval)

1. **Script:** `scripts/CHAPTER_12_SINGAPORE_SCRIPT.md` (flow and flags; wording in code, as Ch10–11).
2. **Engine:** `src/content/chapter12.ts` (gated `VITE_EVE_CHAPTER12`), seven phase nodes in the
   schema, sub-states in `c12.*`, reducer/App routing, `place12` and art stand-ins like Chapter 11;
   entry from `chapter11.complete` on the own-power road.
3. **Board:** `leverage.ts` gains the Singapore assets, the Maya photograph and Celeste's "knows you
   went".
4. **Tests:** every path reaches `complete`; the Ashby lead always exists (fallback); the evening
   is chosen and gated; neutral picks in `GATED_DEFAULTS`; goldens for Ch12 from the Ch11 goldens.
5. **Art:** the six frames, luminance-gated, owner approval before promotion.

Written as set pieces from the first pass this time (the lesson of Chapters 10 and 11), aiming at
~6k on the quiet path.

---

## 9. What it sets up

- **Ch13 The Honeypot:** the placement date arrives. What Celeste learned in Singapore
  (`act3.singapore`) colours the order: a player who moved into Nell's flat gets a warmer, crueller
  brief.
- **Ch14 Sloane's Turn:** Nora's letter; Sloane's file on the legend lists "family contact:
  cooperative", and Sloane never knew there was a sister either.
- **Ch15 Breaking the Leash:** Ashby's statement and the maintenance schedule are the proof that
  Meridian keeps legend sites; Nora is the witness.
- **Ch17 The Room:** "Who rang Nora on the Sunday morning?" The seed becomes the question Celeste
  cannot answer.

---

## 10. Decisions for the owner (recommendations first)

1. **She physically goes to Singapore,** not a remote investigation. On the Celebrity route she can
   make Laurent's campaign shoot there, so Celeste pays for it. *Recommended: yes.* A trip is the
   thrill of the chapter, and Celeste paying is the fun.
2. **The first Evelyn is dead:** she ran the night she "disappeared before breakfast", and was found
   in the harbour a week later (misadventure, fourteen months ago). How she went in stays open until
   Act IV. *Recommended: yes.* It follows the settled canon (burned, then inventoried; not secretly
   alive).
3. **Her real name is Eleanor "Nell" Linden, and her sister is Nora Linden,** a teacher in
   Singapore. Also new: **Colin Ashby** (Meridian's Singapore station head, retired to a bar) and
   an unnamed caretaker. *Recommended: yes.* The names are placeholders if you have others in mind.
4. **Seed, don't prove, that Celeste burned her:** Ashby ("from a friend of hers", the orchids in
   Jakarta) and Nora (the call on Sunday morning, before the police). Proof waits for Act IV.
   *Recommended: yes.*
5. **The Emerald Hill flat is a kept legend site,** furnished and cleaned monthly for the reissue,
   the new clothes cut to her measurements. *Recommended: yes.* It is the product, made physical.
6. **The chosen evening is with a man who came to Singapore** (Julian on Helix business, Sebastian
   on tour, Theo for a special), not a new partner. *Recommended: yes.* Say if you want a new man
   in Singapore instead.
7. **No order this chapter,** only pressure (Celeste's messages, the Maya photograph). *Recommended:
   yes.* Chapter 13 carries the heaviest order in the game; this chapter is the breath before it.
