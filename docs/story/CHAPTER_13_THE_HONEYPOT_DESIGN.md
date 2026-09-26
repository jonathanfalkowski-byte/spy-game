# Chapter 13 — "The Honeypot" (design)

**Act III · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 0.7h / ~7k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) (§2 what is on and off screen, §3 the
coercion framework, §5 hard lines, §6 player comfort, §11 checklist), [BEAT_MAP.md](BEAT_MAP.md) (Act III),
[CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md) (the exploitation / recovery overlay),
[ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) (canon), [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md).
Status: **approved (owner, 2026-09-25: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_13_THE_HONEYPOT_SCRIPT.md](scripts/CHAPTER_13_THE_HONEYPOT_SCRIPT.md), code: `src/content/chapter13.ts`.
~1.8–2.3k words on the golden paths at pass 1; deepened 2026-09-25 to ~2.9–3.1k and again 2026-09-26 to ~3.0–3.25k (the comply lead-in unchanged). The content notice and the "Fade coercion scenes"
setting are built. Gated like Chapters 6–12 (`VITE_EVE_CHAPTER13`, content
revision ≥ 19), entered from an own-power `chapter12.complete`.

> **This is the game's reserved sexual-coercion beat** (one of at most two per playthrough). It follows
> CONTENT_DIRECTION §2 to the letter: the order, the choice, getting ready, the walk to the door and the
> door closing are on screen; **everything behind the door is off screen**, never described as it
> happens and never framed as arousing; the aftermath is on screen without graphic detail. Refusal never
> leads to sexual punishment. The threat to Maya is non-sexual.

---

## 1. The chapter's job

Chapter 11 put a date on her: *available for placement from the first Thursday of next month*. Chapter 12
gave her Nell's name. Chapter 13 is the date. Meridian places her, and the placement is a **honeypot**:
seduce a named man in a suite with a camera behind the mirror, so that a client owns him.

By the end of the chapter the player must:

1. **Have faced the heaviest order in the game** and answered it: comply, refuse or counterplay, each
   with a real cost that the next two chapters carry.
2. **Understand what a placement is:** not a party, not a viewing: Meridian renting out a person, for a
   client, against a target. Nell was placed. Iris was placed. Now her.
3. **Know the target as a person,** so the cost is real whichever way she answers: Owen Marsh, the one
   official in London actually investigating a Meridian client.
4. **Have taken a recovery step** (exploitation / recovery overlay) if she complied, and carry the cost
   (Maya detained) if she refused.
5. **End with Sloane at her door:** the machine's own officer, who did not know Meridian did this,
   setting up Chapter 14.

What it must not do: show or describe the coerced act; make refusal sexual; make the chosen intimacy a
reward or a cure; resolve the leverage (Ch15); confront Celeste (Act IV).

**Why it is thrilling, erotic and fun (and where it is none of those on purpose):** the thrill is the
week of dread, the clock, and a counterplay op carried out under a camera; the erotic charge lives
**only in what she chooses**: on the counterplay path, a staged scene she and Marsh play for the camera,
both in on it, charged and fake; the fun is beating Celeste at her own staging. **The comply path is not
fun and not erotic, by design.** It is the cost the game has been warning about since Chapter 10, and it
should feel like one (CONTENT_DIRECTION §4).

---

## 2. What it reads (inputs)

| Input | From | What Chapter 13 does with it |
|---|---|---|
| `act3.placement` | Ch11 | The date. Tonight is the first Thursday |
| `c11.answer`, `act3.celeste-surprised` | Ch11 | How Celeste briefs her: a pet, a disappointment, a player |
| `act3.maya-clearance` (renewed / suspended / revoked) | Ch10–11 | The named threat escalates past clearance: Maya **detained** |
| `c11.iris` / `act3.ally.iris` | Ch11 | Iris free can swap the camera's card (counterplay). Iris burned: Halvorsen is placing a new handle because the old one "ended" |
| `act3.singapore` (key / moved-in / everything) | Ch12 | Moved in: a warmer, crueller brief ("You looked so at home"). Everything: Celeste is careful, and the brief is shorter |
| `c12.statement`, `c12.note`, `act3.ally.nora`, `act3.nell` | Ch12 | Proof for turning Marsh (Ashby on the record; Nell's note); Nell's name in her mouth when she refuses |
| `act3.ally.theo`, famous (`c5.published`) | Ch5–10 | Exposing it first: Theo's show, or her own public voice |
| `case.strength`, `c11.catalogue = photo` | Ch9, Ch11 | Proof that Meridian sells people, to put in front of Marsh |
| `c8.pryce` | Ch8 | Pryce drives her to the Claremont, and home |
| `c6.maya` | Ch6 | Whether Maya is in her life to see it, and to be told |
| Partners in play, not betrayed | Ch4–12 | Refuge after (non-sexual on the comply path, §10.5) |

---

## 3. Shape

Phases (new gated nodes, each a scene with its own title and place):

`brief` → `week` → `answer` → `thursday` → `after` → `morning` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `brief` | The Placement · THE VESPER, READING ROOM | ~1,000 | None (a content notice opens it) |
| 2 | `week` | Six Days · LONDON | ~1,300 | One move of preparation (a hub) |
| 3 | `answer` | The Answer · WEDNESDAY, MIDNIGHT | ~500 | Comply / refuse / counterplay |
| 4 | `thursday` | The Claremont · THURSDAY | ~1,400 | Inside each answer (below) |
| 5 | `after` | Afterwards · 2 A.M. | ~1,200 | The recovery step |
| 6 | `morning` | Friday · MORNING | ~900 | One reply |
| | `complete` | A Knock · LATER | ~200 | |
| | | **Total** | **~6,500** | |

---

## 4. Scene by scene

### 4.1 The Placement (`brief`)

A **content notice** opens the chapter (§10.6): *This chapter contains sexual coercion (implied, off
screen), blackmail and its aftermath.*

The Vesper by day, closed, the empty frames unlit. Celeste in the reading room with *The Autumn
Collection* open at page seven. She is kind about it, which is the worst of it.

The brief, as a placement is briefed: **the client** is Halvorsen, who has lost a handle (Iris,
whichever way Chapter 11 went) and needs another. **The target** is **Owen Marsh**, forty-four,
deputy director of enforcement at the Markets Authority (fictional), the one official in London with an
open inquiry into Halvorsen's fund. Divorced; a daughter at university; cycles to work; drinks one
whisky at the Claremont on Thursdays, alone. **The job:** the Claremont bar at nine; she will be
charming; he will take her upstairs; suite 1109 is Meridian's; there is a camera behind the mirror.
"After that he is ours, and so is his inquiry."

**The leverage, escalated:** not Maya's clearance this time. A file already written: Maya Reyes, Axiom
compliance, leaking client data to a journalist. Printed, dated, ready. "It is only paper, darling.
Paper is what you make it."

Celeste's last line reads the save: moved into Nell's flat: "You looked so at home in Singapore. This is
only another room." Twice surprised: "I am giving you something you cannot be clever about. Humour me."

She does not ask for an answer. "Thursday. Let me know by Wednesday."

### 4.2 Six Days (`week`)

The week as dread: the wall; the date card now today's date; Nell's photograph; the black phone quiet.
One move of preparation (`c13.week`), each opening something:

- **week-marsh** · find out who he is. Evelynn watches him cycle to work, sits behind him in a café,
  reads his inquiry's public notices. He is decent, tired, and funny with the woman at the till. He is
  the only one doing his job. (Opens *turn him*.)
- **week-maya** · see Maya. Dinner at their old place; Maya talks about a promotion interview; Evelynn
  cannot say one true sentence and has to watch Maya notice. (If `c6.maya` isn't restored: watching
  Maya's building from across the road, the way Meridian watches hers.) What she can't say to Maya is
  the scene.
- **week-ally** (if an ally is in play: Iris free, Theo, Julian as ally, Nora) · tell one person. Iris
  knows how placements run and where the camera's card is kept; Theo sees a story that would end his
  career or make it; Julian knows Halvorsen. (Opens *swap* or *expose*.)
- **week-alone** (neutral) · tell nobody; work it out on the wall.

### 4.3 The Answer (`answer`)

Wednesday, midnight, the black phone with its one contact. The three answers (`c13.answer`):

- **order-comply** · "Thursday." The leverage holds; Maya's file stays in a drawer.
- **order-refuse** · "No. Not this. Not ever." If she learned Nell's name (`act3.nell`), the refusal
  keeps it back: she thinks it, and does not say it. The seed stays hers until she chooses to spend it
  (§4.6).
- **order-counter** (only with something built: `c13.week = marsh` plus proof to show him; or an ally
  told in the week; or famous and willing to burn it) · "Thursday." Said the same way as comply, which
  is the point.

### 4.4 The Claremont (`thursday`)

**Comply.** Getting ready, written as armour, not display: the dress chosen like a uniform, the face put
on like a lock. Pryce drives (if `c8.pryce`), and says nothing until the lights on the Strand: "I drive.
I don't do the endings." The bar: Marsh is exactly who the week said he was, kind, funny, lonely, and
has no idea. Every charming thing she says costs her something, and the prose keeps count. The lift. The
corridor. Suite 1109. **The door closes. The scene cuts.**

A single moment inside the door is offered, before the cut, not after: **door-look** (she looks at the
mirror, knowing) or **door-away** (she doesn't). Neither changes what happens; it records who she is
while it does.

**Refuse.** The same night, at nine, while she is at home not going to the Claremont, Maya rings from the
back of a car: two men from Axiom security and a police officer, her flat being searched, her laptop in
a bag. Evelynn spends the night on a plastic chair at the police station, with the black phone in her
lap, and Maya is released at six in the morning, suspended, charged with nothing yet, on bail. Nothing
sexual happens to Evelynn. The threat named is the threat that lands.

**Counterplay**, by what she built (`c13.counter`):

- **turn** (week-marsh and proof) · at the bar she tells Marsh the truth in the lift, with Ashby's voice
  on her phone or the catalogue page in her bag. In 1109, **they stage it for the camera**: both
  clothed, a performance, the light low, her hand in his hair and his mouth near her ear saying "is this
  all right?" for real, off the microphone. It is the most erotic scene in the chapter because it is the
  only one she chooses, and it is entirely fake. Heat 2. Marsh becomes an ally (`act3.ally.marsh`). Risk:
  Celeste's people review the footage.
- **swap** (Iris) · Iris gets her into the Claremont's service corridor; Evelynn takes the card out of
  the camera behind the mirror before Marsh arrives, and plays the evening straight as a drink and a
  goodbye at the lift. The card holds the metadata of **every placement filmed in 1109**: a Meridian
  asset of the first order.
- **expose** (Theo, or her own fame) · she burns the op before Thursday: Theo's show runs a segment on a
  regulator being targeted, or she tells it herself on a late show, without naming herself. Halvorsen
  withdraws; Marsh is warned in public; the cost is her own exposure (`act3.exposed`, new) and Celeste
  knowing exactly who did it.

### 4.5 Afterwards (`after`)

**Comply**, under the exploitation / recovery overlay. The car home (Pryce silent, or a driver who does
not look at her). The shower, written as time, not detail: how long, how hot, what she does not look at.
The black phone: "Lovely. You see how easy it is." Maya's name on her own phone, ringing, and her not
answering it. Then **the recovery step** (`c13.recover`):

- **recover-maya** (if Maya is in her life) · go to Maya's at 2 a.m. and ask to sleep on the sofa without
  saying why. Maya doesn't ask. She makes up the sofa, and then sits on the floor beside it until Evelynn
  is asleep.
- **recover-refuge** (a partner in play, not betrayed) · go to him and ask only to be held. He holds her.
  Nothing else happens, and he does not ask for anything. Never framed as a cure or a reward.
- **recover-wall** · write it on the wall in her own hand: the date, 1109, and "Done to me. Not by me."
- **recover-alone** (neutral) · sit up in the dark until it gets light.

**Refuse:** the morning outside the station with Maya, who knows it was about Evelynn and does not yet
know how. What Maya says depends on `c6.maya`. The cost stands, reversible in Ch15.

**Counterplay:** the relief and the danger; Marsh (turned) walking her to a taxi; Iris (swap) with the
card in a glove; Theo (expose) on air at midnight.

### 4.6 Friday (`morning`)

Celeste's word, by answer: complied ("You were beautiful. He will be very useful."), refused ("I did so
hope. Your friend will be fine, if you are sensible next time."), countered (if the footage was staged
and reviewed: "Very pretty. Very clever. Three times, darling. I have started keeping count too.";
`act3.celeste-surprised` → thrice). The board updates.

One reply to her (`c13.reply`): **reply-none** (neutral) · **reply-nell** ("Nell said you'd bring
flowers.", only if `c12.note`; Celeste goes quiet for a day) · **reply-count** ("So have I.").

### 4.7 A Knock (`complete`)

That evening, a knock. Victoria Sloane on the landing, in the same coat as the Glass House night,
holding a copy of whichever file mattered (the footage request, Maya's charge sheet, or the Markets
Authority's warning), and looking, for the first time since Evelynn has known her, frightened.

> Sloane: I didn't know they did this. I need you to believe that, and I need you to let me in.

**Last line:** *She came to me. The woman who built this cage came to my door to ask if she could come
in.*

---

## 5. Flags written (for Chapters 14–17)

`c13.week` (marsh | maya | ally | alone) · `c13.answer` (complied | refused | countered) · `c13.door`
(look | away) · `c13.counter` (turn | swap | expose) · `c13.recover` (maya | refuge | wall | alone) ·
`c13.reply`. Act III keys: `act3.maya-status` (detained, on refusal), `act3.ally.marsh`,
`act3.celeste-surprised` (thrice), `act3.honeypot` (done | refused | staged | pulled | burned),
`act3.sloane-came`, `act3.exposed`.

Leverage board: Celeste's entry gains the honeypot order ("Owen Marsh, on camera, in suite 1109") and
the threat ("Maya, on a leak charge already written"); Evelynn's column gains, by path, Marsh (an
ally), the 1109 card (every placement filmed there), or the broadcast.

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: only the staged scene on the counterplay path (heat
   2, consensual between Evelynn and Marsh, both in on it). ✔
2. The coerced act is **off screen**: the order, the choice, getting ready, the walk and the door are on
   screen; the scene cuts at the door; nothing behind it is shown or described; the aftermath is not
   graphic; the exploitation / recovery overlay supplies the recovery step. ✔
3. The order offers comply / refuse / counterplay, each with a real cost. ✔
4. Refusal leads to Maya's detention (the named, non-sexual threat), never to sexual punishment. ✔
5. The threat to Maya is non-sexual (a fabricated charge, arrest, suspension). ✔
6. The leverage is specific and recorded (the board). ✔
7. The clinic is untouched. ✔
8. Non-consent is never eroticized: the comply path is written as cost; the bar scene there is dread,
   not flirtation; the chapter's only charge is the chosen, staged scene. ✔
9. The chosen intimacy is never a reward or a cure: refuge after compliance is being held, nothing
   more. ✔
10. Player comfort: the content notice, and the "fade the coercion beats" setting (§10.6). ✔

---

## 7. Art (dark noir band: mean 45–70, ≥40% near-black)

1. The Vesper reading room by day, closed: *The Autumn Collection* open on the lectern, blinds down.
2. The wall at 3 a.m., the date card and Nell's photograph.
3. The Claremont bar: a single man at the end of the bar with a whisky, seen from behind.
4. A hotel corridor, a door marked 1109, a line of light under it. **Never the room.**
5. The back of a car at night, rain on the window (the aftermath).
6. A police station waiting room at 5 a.m. (the refusal).
7. A landing, a knock, a woman in a grey coat (Sloane).

---

## 8. Build plan (after approval)

1. **Player comfort, first:** a chapter-open content notice, and the "fade the coercion beats" setting
   (a per-viewer preference outside the save, so it never changes the ledger or the goldens): when on, the
   comply path's lead-in (getting ready, the bar, the lift) shortens to a single line; the choice and
   the aftermath are unchanged.
2. **Script:** `scripts/CHAPTER_13_THE_HONEYPOT_SCRIPT.md` (flow and flags; wording in code).
3. **Engine:** `src/content/chapter13.ts` (gated `VITE_EVE_CHAPTER13`), seven phase nodes, `c13.*`,
   reducer/App routing, `place13`, art stand-ins, entry from `chapter12.complete` on the own-power road.
4. **Board:** `leverage.ts` gains the honeypot order and the threat, and Marsh / the card / the broadcast.
5. **Tests:** every answer × counterplay reaches `complete`; **a test that no coerced path contains
   sexual description** (a word list over the comply path's text); refusal touches nothing sexual; the
   refuge is non-sexual on the comply path; the fade setting changes no choice and no hash; goldens from
   the Ch12 goldens (one per answer).
6. **Art:** the seven frames above, luminance-gated, owner approval before promotion.

---

## 9. What it sets up

- **Ch14 Sloane's Turn:** Sloane at the door; what she did not know; the ORACLE defect as a lever
  Evelynn now holds over Meridian; Maya (detained, or told, or protected) learns the truth and chooses;
  the first time Celeste is afraid.
- **Ch15 Breaking the Leash:** Marsh's inquiry, the 1109 card or the broadcast is the counter-operation's
  spine; Maya's charge is dropped or it isn't.
- **Ch17 The Room:** 1109 is on the table.

---

## 10. Decisions for the owner (recommendations first)

1. **The target is Owen Marsh,** deputy director of enforcement at a fictional Markets Authority, the one
   official investigating Halvorsen's fund; **the client is Halvorsen.** *Recommended: yes.* Compromising
   the one honest man makes every answer cost something, and turning him gives Act IV an ally.
   Alternatives: the minister from the Vesper (political, but his wife was kind to her), or the Gulf-fund
   man (less at stake).
2. **Comply is fully off screen,** and I will write it that way: the order, the week, getting ready, the
   bar, the lift, the corridor, the door closing, **cut**, then the car home. Nothing behind the door is
   described, then or later. *Recommended: yes* (this is CONTENT_DIRECTION §2, and my own line).
3. **Refusal lands on Maya as detention:** a fabricated leak charge, arrest, a night in custody,
   suspension on bail; reversible in Ch15. *Recommended: yes.* It is the named threat escalated past her
   clearance, non-sexual, and heavy enough to make refusal a real choice.
4. **Three counterplays, each earned:** turn him (the staged scene, heat 2, chosen by both), swap the card
   (Iris), expose it first (Theo, or her own fame, at the cost of exposure). *Recommended: yes.*
5. **No chosen sex on the comply path in this chapter:** the refuge is being held, nothing more. The
   counterplay's staged scene is the chapter's only charge. *Recommended: yes*, so intimacy is never read
   as a reward or a cure (CONTENT_DIRECTION §3c).
6. **Build the player-comfort features now:** the content notice at the chapter's start and the "fade the
   coercion beats" setting (already approved on 2026-09-24, not yet built). *Recommended: yes.* This is
   the first chapter that needs them.
7. **End on Sloane at the door.** *Recommended: yes*: it hands Ch14 its opening and turns the machine's
   own officer toward her.
