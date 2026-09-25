# Chapter 14 — "Sloane's Turn" (design)

**Act III · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 0.7h / ~7k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §4 (Sloane's motive: a client's officer
handed a product her vendor had already scored uncontrollable; on the own-power lane she is **the door not taken**),
[CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §3 and §11, [BEAT_MAP.md](BEAT_MAP.md) (Act III),
[CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md) (thrilling, erotic, fun).
Status: **approved (owner, 2026-09-25: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_14_SLOANES_TURN_SCRIPT.md](scripts/CHAPTER_14_SLOANES_TURN_SCRIPT.md), code: `src/content/chapter14.ts`.
~2.0–2.3k words on the golden paths at pass 1; deepened 2026-09-25 to ~2.6–2.8k. Gated like Chapters 6–13 (`VITE_EVE_CHAPTER14`, content revision
≥ 19), entered from an own-power `chapter13.complete`.

---

## 1. The chapter's job

Chapter 13 ended with Victoria Sloane on the landing: "I didn't know they did this." Chapter 14 is the weekend
that follows, and the turn of the act: **the leverage board starts to point the other way.**

By the end of the chapter the player must:

1. **Know Sloane's motive,** from her own mouth: she was handed Project Eve by Meridian with ORACLE's verdict
   already on it (*controllability: low*), told to deliver a usable asset anyway, and made the officer of record
   for it. If the product slips, she is the one who failed. Her leash was always partly round her own neck.
2. **Hold the ORACLE defect as a lever over Meridian**: the maker knew the product was defective and sold it to
   Axiom anyway. Evelynn may already hold it (Ch6, Ch9); Sloane can hand her the signed original.
3. **Answer the last order:** Celeste wants Sloane, and Sloane's file, delivered to the Vesper on Sunday.
   Comply, refuse or counterplay, each with a real cost, none of it sexual.
4. **Tell Maya the truth, or enough of it,** and let Maya choose what to do with it.
5. **See Celeste afraid for the first time,** plainly on the counterplay path, as a hairline crack on the others.

What it must not do: end the leverage (Ch15 does that), confront Celeste with the whole case (Act IV), or make
Sloane a full ally on this lane (she is the door not taken). No sexual coercion: the reserved beat was Ch13.

**Why it is thrilling, erotic and fun:** the thrill is a weekend with a clock on it, a betrayal on offer, and
(on the refusal path) a fire-escape exit from her own flat; the erotic charge is an optional chosen evening
afterwards, including, if she turned him, **Owen Marsh, for real this time**; the fun is walking into the Vesper
with the one document that frightens Celeste, and watching her read it.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 14 does with it |
|---|---|---|
| `c13.answer`, `act3.honeypot` | Ch13 | What Sloane's folder holds (the recording request, Maya's charge sheet, the Authority's notice) and how she speaks |
| `c9.lever`, `c6.oracle-seen` | Ch6, Ch9 | Evelynn already holds the ORACLE verdict (directly, or reconstructed); Sloane's copy adds the board's signature |
| `sloaneDoubts` (the Benton guess), `own.crossover` | Rev20, Ch7 | Sloane remembers the guess; an institutional crossover opens "take the door once" at a standing cost |
| `act3.maya-status`, `act3.maya-lawyer`, `c6.maya`, `mayaKnowsWho` | Ch6, Ch13 | Maya's position (detained, bailed; or untouched), what she already knows about Adrian, and how she hears the rest |
| `act3.ally.marsh`, `c13.card`, `act3.honeypot = burned`, `case.strength`, `c12.statement`, `act3.ally.nora` | Ch9–13 | What she can bring to the Vesper beside the verdict (counterplay) |
| `c8.pryce` | Ch8 | Pryce watched Sloane arrive; on the refusal night he is the one who warns her |
| `act3.celeste-surprised` | Ch10–13 | How Celeste phrases the order (a pet, a problem, a player) |
| Partners in play, `act3.ally.marsh` | Ch4–13 | The optional chosen evening |

---

## 3. Shape

`door` → `order` → `maya` → `answer` → `sunday` → `after` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `door` | The Door Not Taken · FRIDAY, 19:00 · THE FLAT | ~1,400 | What she does with Sloane |
| 2 | `order` | The Last Order · SATURDAY, MORNING | ~700 | Tell Maya first, or not |
| 3 | `maya` | Maya · SATURDAY · MAYA'S KITCHEN | ~1,200 | What she tells her; Maya chooses |
| 4 | `answer` | The Answer · SATURDAY, MIDNIGHT | ~400 | Comply / refuse / counterplay |
| 5 | `sunday` | The Vesper, Sunday · SUNDAY | ~1,500 | Inside each answer |
| 6 | `after` | Afterwards · SUNDAY NIGHT | ~800 (+~500 evening) | An optional chosen evening |
| | `complete` | The Board · LATER | ~200 | |
| | | **Total** | **~6,200 (+500)** | |

(Honest note: Chapters 10–13 have landed at 3–5k on their first passes. Write the set pieces full from the start:
Sloane's confession, Maya's kitchen and the Sunday scenes carry the chapter.)

---

## 4. Scene by scene

### 4.1 The Door Not Taken (`door`)

Sloane in the flat, still in the Glass House coat, not sitting down until she is asked twice. She looks at the
wall for a long time, and at her own name on it.

Her account, in order, without self-pity, which is how you know it is true:
- Project Eve came to Axiom **from Meridian**, as a product: a legend with a life already lived in it, and a
  candidate to fit. She was the officer of record.
- The file came with **ORACLE's verdict already on it**: adoption *willing*, controllability *low*. She raised
  it. She was told it was a known characteristic of the product and "priced in".
- She understood, too late, that a slipping asset that stays useful is **a better product** than a controlled one,
  and that if it slipped far enough, Meridian would have an officer to blame. Her.
- She did not know about placements. She did not know about 1109. She has a copy of the verdict with the board's
  signature on it (one signature she thinks Evelynn will recognise), and she has been carrying it for a year.
- If `sloaneDoubts`: "You guessed Benton. I never forgot that. It was the first time I thought you might be
  cleverer than the file."

**What she does with Sloane** (`c14.sloane`), the own-power lane's "door not taken":
- **sloane-hear** · hear her out, and take the file. A bounded truce: this weekend, nothing more.
  (`c14.file = yes`, `act3.sloane = truce`)
- **sloane-hold** · hold the ORACLE fact over her: "You knew enough." She hands the file over because she has
  to. Colder, and cleaner. (`c14.file = yes`, `act3.sloane = held`)
- **sloane-shut** · shut the door on her. Take nothing from the woman who built the cage. The verdict stays with
  Sloane unless Evelynn already holds it. (`act3.sloane = shut`)
- **sloane-take** (only if `own.crossover = institutional`) · take the door once: an alliance, at a standing cost
  that the endgame remembers. (`c14.file = yes`, `act3.sloane = allied`)

### 4.2 The Last Order (`order`)

Saturday morning, the black phone. Celeste knows Sloane came (Pryce saw her on the stairs).

> C.: You had a visitor. She has something of ours, darling, and she has been carrying it about like a
> handbag. Bring her to the Vesper on Sunday at six, and bring what she carries. After that I shan't ask you
> for anything for a long time.

**The threat is the one Celeste has held since Chapter 10 and never spent: Adrian Vale's name.** Refuse, and
Axiom is told that its missing analyst is Evelynn Vale, with the clinic file attached; Sloane's own directorate is
ordered to recover the asset; and the flat (Meridian owns the building) is taken back.

**Tell Maya first?** (`c14.tell`): **tell-now** (go to her today, before Celeste can) · **tell-later** (after
Sunday; Celeste gets there first, with a photograph of Adrian Vale on Maya's phone and one line: *Ask her who
this is.*).

### 4.3 Maya (`maya`)

Maya's kitchen on a Saturday afternoon (or Maya on Evelynn's doorstep, the photograph on her phone, if Celeste
got there first). Two versions of the same truth, by `mayaKnowsWho`:
- **If Maya already knows Evelynn was Adrian,** the truth is the rest: Meridian, Celeste, the placements, 1109,
  why her laptop is in an evidence bag, and what was asked on Thursday.
- **If she doesn't,** it is Adrian. The oldest friend he has, finding him in a woman she has been having dinner
  with for weeks.

**What Evelynn tells her** (`c14.said`): **said-all** (everything, Adrian and 1109 included) · **said-enough**
(Meridian, Celeste and the charge; not the rest) · **said-go** (ask her to leave London for a while, and say as
little as possible).

**Maya chooses** (derived, recorded as `act3.maya-choice`, never a player pick over her):
- told all, and close (`c6.maya = restored`): **stay** ("I'm in it. Don't you dare do this without me.")
- told all or enough, not close, or charged (`act3.maya-status = detained`): **witness** (she will go on record
  with Nadia Brandt or Owen Marsh about the forged emails and who wrote them)
- asked to go: **away** (she goes to her sister's in Leeds, furious, and comes back in Act IV); if she is close,
  she refuses to go, and it becomes **stay**

### 4.4 The Answer (`answer`)

Saturday, midnight. Sloane asleep on the sofa (hear / hold / take), or gone (shut).

- **order-comply** · "Sunday. Six." She will bring Sloane to the Vesper.
- **order-refuse** · "No." Adrian's name goes to Axiom.
- **order-counter** (the ORACLE verdict in hand, from Sloane's file, `c9.lever` or `c6.oracle-seen`, **plus**
  one more thing: Marsh, the 1109 card, the broadcast, a strong case, Ashby on the record, or Nora) · "Sunday.
  Six." And she brings more than Sloane.

### 4.5 The Vesper, Sunday (`sunday`)

**Comply.** The Vesper at six, closed, the reading room. Sloane walks in beside her, and understands on the stairs,
and does not run. Celeste thanks Evelynn, and takes the file, and Sloane is walked out through the kitchens by two
men, the way Iris was, looking back once. Celeste, turning the pages of the verdict: a hairline crack; she reads
her own signature twice, and for one sentence forgets to say *darling*. (`act3.sloane = handed`)

**Refuse.** Evelynn does not go. At seven her key does not fit her own door; the locks are new. Downstairs, two
men from Axiom she half recognises, and a car. Pryce (if `c8.pryce`) on the fire escape of the flat opposite,
pointing down, once: the back way. **The fire escape, in the rain, in heels.** The first night as Adrian Vale's
wanted asset, in a hotel under a name she makes up on the spot. (`act3.adrian-burned`, `act3.home = lost`)

**Counterplay.** The reading room, six o'clock. Evelynn brings Sloane, and lays the verdict on the lectern on
top of *The Autumn Collection*: ORACLE's *controllability: low*, and the board's signature approving the sale
anyway. What she brought beside it (Marsh's inquiry, the 1109 card, Theo's producer on speed dial, Ashby's
voice) makes it clear the verdict can reach Axiom, the Authority and the press by Monday.

Celeste reads it. She is quiet for a long time. **For the first time since Evelynn has known her, she is afraid**,
and it shows in the smallest possible way: she puts the file down too carefully. Terms, bounded:
Maya's charge withdrawn; Sloane walks out of the front door; no more orders "until the board has met".
(`act3.celeste-afraid`, `act3.terms`, `act3.sloane = free`) Celeste's last line: "You have my word. You
know exactly what it is worth."

### 4.6 Afterwards (`after`)

By answer: the file gone and Sloane gone (comply: Evelynn walks home the long way and the black phone says
*Thank you*, without *darling*); a hotel room with no luggage (refuse: Maya's text, Sloane's text, the Axiom
alert on the news); or the embankment with Sloane, two women who built and wore the same cage, not friends,
sharing a cigarette neither smokes (counterplay).

**The evening** (optional, chosen, heat 3, consent recorded, fades): a partner in play and not betrayed
(Julian, Theo, Sebastian), or **Owen Marsh** if he was turned in Ch13: the man she staged it with, for real
this time, if they both want it. Never a reward; on the refusal path it is somewhere to sleep that isn't hers.

### 4.7 The Board (`complete`)

A card on the wall (or, on the refusal path, a card in a hotel notepad): *The board meets.* Iris's word, or
Sloane's, or Celeste's own: the Meridian board sits on the first Thursday of next month, at the Vesper, and
Celeste will have to explain the verdict to it.

**Last line:** *She was afraid. Only for a sentence. I am going to live in that sentence until the board meets.*
(Comply: *She read her own name twice. I saw it. I handed her the woman who showed it to me.* Refuse: *They took
the flat. They can have it. It was hers.*)

---

## 5. Flags written (for Chapters 15–17)

`c14.sloane` (hear | hold | shut | take) · `c14.file` · `c14.tell` (now | later) · `c14.said` (all | enough |
go) · `c14.answer` (complied | refused | countered) · `c14.evening*`. Act III keys: `act3.sloane` (truce | held |
shut | allied → handed | free), `act3.maya-choice` (stay | witness | away), `act3.adrian-burned`, `act3.home`
(lost), `act3.celeste-afraid`, `act3.terms`, `act3.board` (the date).

Leverage board: Celeste wants "Victoria Sloane and her file, at the Vesper, Sunday"; threat "Adrian Vale's name,
to Axiom; the flat". Evelynn gains the signed verdict (the ORACLE defect with the board's signature), Sloane (a
truce, or free), and Maya as a witness.

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: the optional evening only (consent recorded, fades). ✔
2. No sexual coercion (the reserved beat was Ch13). ✔
3. The order offers comply / refuse / counterplay, each with a real cost (Sloane; Adrian's name and the flat;
   exposure of what she holds). ✔
4. Refusal leads to exposure and the loss of the flat, never to sexual punishment. ✔
5. The threat to Maya stays non-sexual (the charge; the photograph of Adrian). ✔
6. The leverage is specific and recorded. ✔
7. The clinic is untouched; the clinic *file* is the leverage, not the clinic. ✔
8. The evening is never a reward, and on the refusal path is shelter first. ✔

---

## 7. Art (dark noir band)

1. Sloane in the flat, in the grey coat, under the wall of cards (her back to us).
2. Maya's kitchen, late afternoon, two mugs, one untouched.
3. The Vesper reading room at six on a Sunday, the lectern, a file on top of *The Autumn Collection*.
4. A fire escape in the rain, a figure in heels halfway down (the refusal).
5. The embankment at night, two women and one unlit cigarette (the counterplay).

---

## 8. Build plan (after approval)

1. **Script:** `scripts/CHAPTER_14_SLOANES_TURN_SCRIPT.md`.
2. **Engine:** `src/content/chapter14.ts` (gated `VITE_EVE_CHAPTER14`), seven phase nodes, `c14.*`, wiring and
   art stand-ins as Ch13; entry from `chapter13.complete` on the own-power road.
3. **Board:** `leverage.ts` gains the last order, the signed verdict, Sloane and Maya.
4. **Tests:** every answer × Sloane choice reaches `complete`; counterplay only with the verdict and one more
   thing; Maya's choice derived, never picked over her; refusal touches nothing sexual; the evening is chosen and
   gated; goldens from the Ch13 goldens (one per answer).
5. **Art:** the five frames, luminance-gated, owner approval before promotion.

---

## 9. What it sets up

- **Ch15 Breaking the Leash:** the counter-operation before the board meets. Counterplay path: hold Celeste to
  her terms and take the rest. Comply path: get Sloane back. Refuse path: get the flat, the name and the story
  back, as a hunted woman. Maya's choice decides who stands beside her.
- **Ch17 The Room:** the signed verdict is the first thing on the table.

---

## 10. Decisions for the owner (recommendations first)

1. **The last order is to deliver Sloane and her file to the Vesper on Sunday.** *Recommended: yes.* It turns
   the woman who built the cage into the one Evelynn is asked to hand over, and puts the ORACLE verdict in
   Celeste's reach.
2. **Refusal spends Adrian Vale's name, to Axiom (not the press), and takes the flat.** *Recommended: yes.*
   It is the leverage Celeste has held since Ch10 and never used; going to Axiom rather than the press keeps the
   Celebrity route's public life intact while making her hunted. Alternative: the press (heavier; it would end
   her public identity before Act IV).
3. **Counterplay needs the ORACLE verdict plus one more thing,** and wins bounded terms (Maya's charge withdrawn,
   Sloane free, a pause "until the board has met"). *Recommended: yes*: the leash starts to turn here and breaks
   in Ch15.
4. **Sloane on this lane is the door not taken:** hear her (a truce), hold the verdict over her, or shut the door;
   a full alliance only through an institutional crossover, at a standing cost. *Recommended: yes* (ENDGAME §4).
5. **Maya learns the truth, and chooses for herself** (stay, witness or away), from what Evelynn tells her and
   how close they are. If Maya doesn't yet know about Adrian, this is where she learns. *Recommended: yes.*
6. **Celeste's fear is plain on the counterplay path, a hairline crack on the others.** *Recommended: yes*, so
   every player sees the turn.
7. **The chosen evening returns, and Owen Marsh can be in it** (if turned in Ch13, and only if both choose it).
   *Recommended: yes*: a new man for the erotic lane, earned by the chapter before.
