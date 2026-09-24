# Chapter 10 — "She Knows" (design)

**Act III opener · route chapter (Celebrity / own-power built first) · NEW**
**Budget: 1.25h / ~12.5k words on one path** ([BEAT_MAP.md](BEAT_MAP.md)).
Design authority: [BEAT_MAP.md](BEAT_MAP.md) (Act III), [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md)
§3 (coercion framework) and §11 (checklist), [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md)
(canon), [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md). Status: **design, for owner review.**
A wording script (`scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md`) and the build follow approval.

---

## 1. The chapter's job

Act II ended on the midpoint: Evelynn found Celeste's name, and an orchid on her mat said
*Breakfast? — C.* Chapter 10 turns the game from **investigation** into **counteroffensive**.

By the end of the chapter the player must:

1. **Know that Celeste knows** — not only that Evelynn found her, but who is under the face.
2. **Have been claimed in public.** Celeste's first move is warm, visible and unmistakable:
   anyone who wants Celeste must now go through Evelynn, and anyone Evelynn accuses her to
   will have seen them laughing together.
3. **Have a leverage board** — the screen that turns Act III's blackmail into something the
   player plans against.
4. **Have heard Maya's name from someone who should not know it.**
5. **Have answered a first order** (comply / refuse / counterplay) and felt its cost.
6. **Hold an invitation** to a Meridian client evening, which is Chapter 11's field op.

What it must not do: resolve anything. Celeste is not afraid yet (that is Ch14). Evelynn does
not confront her with the case (that is Act IV). This chapter is Celeste winning the opening
move, beautifully.

---

## 2. What it reads (inputs from Chapters 5–9)

Chapter 10 is where the player's earlier choices come due. Everything below already exists in
the save; no chapter before 10 changes.

| Input | Where it comes from | What Chapter 10 does with it |
|---|---|---|
| `case.name`, `case.strength` | Ch9 resolve | Whether Evelynn can put a case on the breakfast table and make it land; gates one counterplay |
| `c9.terrace` (truth / turn / leave) | Ch9 witness beat | Celeste's opening line ("You asked if I liked looking at her…") |
| `c9.name-beat` (photos / dark / walk) | Ch9 name beat | *walk:* "You walked past my building on Tuesday." *photos:* she has the same photograph |
| `c7.card` (kept / studied / burned) | Ch7 letter | *kept/studied:* "You kept my card. She never kept anything." *burned:* "You burned it. Good. It was hers." |
| `c7.notes` (hide / burn / maya) | Ch7 notes | The "own notes" order target; *maya:* Celeste knows Maya holds a copy |
| Theo: `c7.theo`, `c7.exit`, `c7.evening` | Ch7 interview, evening | The **tape** order target; Theo's trust gates its counterplay |
| Julian: `julian5`, `c7.evening`, `own.crossover` | Ch4–8 | The **workroom page** order target; Julian's trust gates its counterplay |
| `own.campaign`, `own.odile` | Ch7 Odile, Ch8 money | Celeste has seen the station poster; Odile appears on the board if owed |
| `own.marcus`, `own.alliance.rook` | Ch9, Ch7–8 | Debts shown on the board |
| `sloaneDoubts`, Sloane's drawer | Ch2 (rev 20), Ch3 | Sloane's entry on the board |
| `c8.list` (read) | Ch8 | Evelynn holds the inventory line: her own column on the board |
| `c6.maya`, `own.maya-distance`, `c6.maya-knows` | Ch6–8 | How Maya takes the threat, and what she can be told |
| `publicImage7`, `own.exposed` | Ch5, Ch7 | How public the public move is; who calls afterwards |

---

## 3. Shape

Phases (new gated nodes, `VITE_EVE_CHAPTER10`, content revision 20):

`breakfast` → `claimed` → `wall` → `order` → `answer` → `invitation` → `complete`

| # | Scene | Words (one path) | Choices |
|---|---|---|---|
| 1 | **Breakfast** — the orchid kept (or refused) | ~3,000 | Go / don't go · how to open · how to take "Adrian" |
| 2 | **Claimed** — the photograph, the calls | ~1,300 | Who you answer first |
| 3 | **The wall** — the leverage board appears | ~900 (+ UI) | Build it (tutorial) |
| 4 | **The order** — Maya's name, and what Celeste wants | ~1,000 | (none; the order lands) |
| 5 | **The job** — doing it, refusing it, or turning it | ~3,000 | Comply / refuse / counterplay, then a beat inside |
| 6 | **What it cost** — Maya, the target, Celeste | ~1,700 | One reply |
| 7 | **The invitation** (+ optional chosen evening) | ~1,100 (+~500) | Accept / let it sit · evening if a partner is open |
| | **Total** | **~12,500** | |

---

## 4. Scene by scene

### 4.1 Breakfast (`breakfast`, ~3,000 words)

**Setting (dark noir):** the breakfast room of the Lindqvist, a members' club on the river whose
curtains never open. Seven in the morning, rain on the glass behind the drapes, lamps lit,
dark wood, silver domes. One other table occupied, by two men who do not eat.

**First choice — do you go?**
- **Go** (*She asked. Answering is the first thing you control.*) → the Lindqvist, on her ground.
- **Don't go** (*Let her come to you.*) → she does. At nine, at the bakery on your street, in
  front of the queue and the man who used to read the newspaper, Celeste sits down at your table
  with two coffees. **Worse:** it is public from the first minute, and it is on *your* street.
  (`c10.breakfast = went | ambushed`.)

**Celeste opens** with what she knows about the last week (the reads in §2): the card, the
terrace, the walk past her building, the poster at the station. She is warm, delighted,
generous, and every line is an inventory.

> Celeste: You kept my card. She never kept anything. I used to find my letters in hotel bins,
> unopened. You have better manners than she did. Or a better reason.

**Second choice — how do you open?**
- **Put the case on the table** — say her name back to her, the board, the week Evelyn vanished.
  Lands if `case.strength` is supported or strong (Celeste stops smiling for one sentence, and the
  player sees it); if thin, she corrects a detail you got wrong, gently, and it is humiliating.
- **Play Evelyn** — let her talk to the woman she knew; answer as her. You learn the most (a
  detail about the prior Evelyn: *she hated orchids, and Celeste kept sending them*), and it costs
  something private (a thought about how easy it was).
- **Eat, and let her talk** — say almost nothing. Celeste fills silence the way Theo does, and
  tells you one thing she didn't mean to: *the board meets on the first Thursday.* (Seeds Ch11.)

**The turn — "She Knows."** At the end, as she signs for breakfast:

> Celeste: Eat your eggs, Adrian. You never did look after yourself.
>
> p: She says it the way you would say a name in a crowded room to see who turns around. You do
> not turn around. It doesn't matter. She was not asking.

**Third choice — how do you take it?**
- **Don't flinch** (*Give her nothing.*) — she notes it, approvingly. Recorded as composure.
- **Ask what she wants** (*Make her say it.*) — she smiles and says "Nothing yet," and the order
  arrives that night (§4.4).
- **Walk out** (*Leave her with the bill.*) — she lets you. You feel her watching all the way to
  the door. The order still arrives; the leaving is remembered (her tone in Ch11 is cooler).

(`c10.open = case | evelyn | silent`, `c10.adrian = composed | asked | walked`.)

### 4.2 Claimed (`claimed`, ~1,300 words)

**The public move.** By noon, a society page runs the photograph: the two of you at the Lindqvist
(or at the bakery, worse, with the queue behind you), Celeste's hand on your wrist, both laughing.
Caption: *Old friends. Evelynn Vale and Celeste Laurent, reunited.*

> t: She has put her arm around me in front of the whole city. Anyone I tell now will have seen
> this picture first.

The calls come in, and **who you answer first** is the choice (all of them are heard; the first
one gets the real conversation, the others voicemail):
- **Odile** (if `own.campaign`): delighted. "Laurent is *money*, darling." A campaign extension
  is on the table — money now, and a leash.
- **Theo** (if Theo is in play): not delighted. "I asked you who hands out lives. Is it her?"
- **Maya** (if `c6.maya = restored`): "Who is Celeste Laurent, and why is she holding your
  wrist like she owns it?" Maya does not yet know the answer is *yes*.
- **Sloane** (always; she answers you): "Laurent is not a friend of this directorate. Or of yours.
  I assume you know that." If `sloaneDoubts`: "Is this another guess?"

### 4.3 The wall (`wall`, ~900 words + the leverage board UI)

That night Evelynn does what Adrian did with a hard case: she takes the mirror down and makes a
wall. Index cards, string, the back of the wardrobe door. **In the fiction, the leverage board is
her own wall**; in the UI it is a dossier screen that stays available from here on.

> p: You take the mirror off the wardrobe door and lean it face in against the wall. You do not
> need to see her while you work.

The player builds it (a short guided sequence: one card per holder), and **it fills itself from
the save** — every debt they already took on in Acts I–II appears:

- **Celeste** — holds: *Maya's clearance · Adrian Vale's name · the apartment*. Wants: *(the
  order, after §4.4)*. Threat named: *Maya's clearance.*
- **Sloane** — holds: *the breach audit, in her drawer* (revision 20 debrief). If `sloaneDoubts`:
  *and a guess she hasn't forgotten.*
- **The sender** — if `own.alliance.rook = owed`: *a debt, uncalled.*
- **Odile** — if `own.odile = owed`: *an advance, and your diary.*
- **Marcus** — if `own.marcus = owed`: *a debt. He always collects.*

And a column that is **hers**: what Evelynn holds — the case (and its strength), the ORACLE
defect (if `lever`), the inventory line (if `c8.list = read`), the leaf photograph, whatever she
carried out of the Glass House. The board is where the player sees, for the first time, that she
is not only held — she holds.

### 4.4 The order (`order`, ~1,000 words)

A slim black phone arrives by courier, no card; it has one contact, *C.* The order is warm,
specific and small, and it comes with Maya's name:

> C.: Maya Reyes. Compliance, level three. Her clearance renews in nine days; renewals are such a
> formality. I'd like one small thing from you, darling. Consider it a kindness to us both.

**The target** is the one relationship Evelynn built that Celeste can use, by priority:

1. **Theo's raw tape** (if Theo is in play: `c7.theo = curious`, `c7.exit = theo`, or his
   evening) — *"Your interview, uncut. Theo told my office no. He won't tell you no."*
   Ties back to Ch7: *somebody on a board wanted the raw tape.*
2. **A page from Julian's workroom** (if Julian is in play) — *"The contract you read on his wall.
   I'd like to see what you saw."* (The beat map's original order.)
3. **Her own notes** (otherwise) — *"Everything you found. On paper."* If `c7.notes = maya`:
   *"And the copy you sent Maya. Ask her for it back."* (Lying to Maya is the job.)

(`c10.target = tape | workroom | notes`.)

### 4.5 The job (`answer`, ~3,000 words)

One scene per target, each with **comply / refuse / counterplay** (CONTENT_DIRECTION §3b), then
one beat inside the chosen answer. Every answer has a real cost; none is a trap.

**Target: Theo's tape** — the studio archive on the river at midnight.
- **Comply** — copy the tape and leave it with the Lindqvist's doorman. If Theo gave you the key
  (his evening), it is a betrayal of a man you slept with or nearly did; the scene does not look
  away from that. Recorded: `c10.betrayed = theo`. Maya's renewal goes through, quietly.
- **Refuse** — walk out of the archive with nothing. The threat lands (§4.6).
- **Counterplay** — *requires Theo's trust* (`c7.exit = theo` or his evening). Tell Theo. He
  edits a "clean" copy with the question cut and a timecode seam only a professional would see,
  and sends it himself. Maya is safe *this time*. Cost: Theo is now inside the story, and wants
  it; Celeste receives the edit and is **amused** ("You edit well, darling. So does he.").

**Target: Julian's page** — the Helix contracts room after hours.
- **Comply** — take the page while Julian steps out to take a call. `c10.betrayed = julian`.
- **Refuse** — as above.
- **Counterplay** — *requires Julian's trust* (Ch5 intimacy with Julian, `c4/c5 mutual-interest`,
  or `own.crossover = executive`). Tell Julian. He lets you photograph a page he has already had
  amended — a decoy counterparty. Cost: Julian now knows you are owned, and by whom; his interest
  becomes *interest* (Executive leverage for later).

**Target: her own notes** — the apartment, then Maya (if she holds a copy).
- **Comply** — hand over the notes. If Maya holds a copy, lie to Maya to get it back. The lie is
  on screen, and Maya believes you, which is worse.
- **Refuse** — as above.
- **Counterplay** — *requires* `case.strength` supported or strong, **or** `c7.notes = burn`
  (it's all in your head). Give her notes rewritten from memory with two poisoned details that
  will show you who she passes them to. Cost: a week of your nights, and if she catches the
  poison later, she will know you can lie to her face.

### 4.6 What it cost (`answer`, ~1,700 words)

- **If she refused:** Maya's clearance is suspended pending review the next morning. Maya calls
  (or, if `own.maya-distance = away`, does *not* call, and Evelynn hears it from Daniel, which is
  worse). "Somebody pulled my clearance this morning. They asked me about you." The harm is her
  job, her standing, her fear. **Non-sexual, reversible later** (Ch14–15 counterplay can restore
  it). Evelynn can tell Maya the truth, part of it, or nothing (`c10.maya-told`).
- **If she complied:** Maya's renewal comes through. Nobody thanks Evelynn. A second orchid, and
  the thought that the leverage holds and Celeste will ask for more. If the target was Theo or
  Julian, a short beat of them not knowing yet.
- **If she countered:** Maya is safe, for now. Celeste's reply is the first time she treats Evelynn
  as a **player** rather than a product: interested, not afraid. The next order (Ch11) will cost
  more. The board updates: *Celeste — surprised once.*

### 4.7 The invitation (`invitation`, ~1,100 words) and an optional evening (~500)

Whatever the answer, a card arrives with the next orchid:

> *The first Thursday. The Vesper Gallery, eight o'clock. Some of our clients would love to
> meet you. Wear the green. Bring nobody. — C.*

This is Chapter 11's field op (a Meridian client evening, Glass House scale).

**Optional chosen evening** (only with a partner who was **not** betrayed this chapter; heat 3,
consent-gated, fades, and never framed as a reward): Julian, Sebastian (if in town) or Theo. The
charge is the contrast: a night she chooses, in a week where everything else was chosen for her.
If the partner was the counterplay ally (Theo edited the tape; Julian made the decoy), the evening
carries that: they know she is owned, and they came anyway.

**Last line** (all paths):

> t: She knows my name. Both of them. And for the first time since the clinic, I know exactly what
> I am being asked to be. That, at least, is something to push against.

---

## 5. The leverage board (mechanic and build)

**Principle:** derived, not stored — like `sloane-standing.ts`. The board reads the save and
shows who holds what; it adds no score. Ch10 adds only the explicit records Celeste creates.

**Data (`src/content/leverage.ts`):** `leverageBoard(s): { held: Entry[]; holds: Asset[] }`
- `Entry { holder, holds: string[], wants?: string, threat?: string, status: 'open' | 'complied'
  | 'refused' | 'countered', source }` — derived from existing flags (§4.3) plus Ch10's
  `c10.*` order record.
- `Asset { id, label, strength?, source }` — what Evelynn holds (case, ORACLE, inventory line,
  leaf photo, Glass House item, any `c10` poisoned notes).

**UI (`src/ui/LeverageBoard.tsx`):** a dossier panel beside the journal: cards per holder
(holds / wants / threatened / status), Evelynn's column, source on hover. Dark noir: index
cards on a black board, string in dull red. Opens from the menu from Chapter 10 on; the Ch10
`wall` scene introduces it.

**Why it matters for Act III:** every later order (Ch11–14) is an entry; every counterplay
spends an asset from her column. Ch15 ("Breaking the Leash") is the player clearing the board.

---

## 6. Flags written (for Chapter 11)

`c10.breakfast` (went | ambushed) · `c10.open` (case | evelyn | silent) · `c10.adrian`
(composed | asked | walked) · `c10.first-call` · `c10.target` (tape | workroom | notes) ·
`c10.answer` (complied | refused | countered) · `c10.betrayed` (theo | julian | maya | —) ·
`c10.maya-clearance` (renewed | suspended) · `c10.maya-told` · `c10.poison` (notes counterplay)
· `c10.invitation` (accepted | pending) · `c10.evening-*` (as Ch7). Keys Act III reads by name:
`act3.celeste-surprised`, `act3.maya-clearance`.

---

## 7. Content checklist (CONTENT_DIRECTION §11)

1. Sexual content on screen is chosen and ≤ heat 3: only the optional evening. ✔
2. Coerced sexual content: none in this chapter (the reserved beat is Ch13). ✔
3. The coercion beat offers comply / refuse / counterplay, each with a real cost. ✔ (§4.5–4.6)
4. Refusal never leads to sexual punishment: the named threat (Maya's clearance) lands. ✔
5. The threat to Maya is non-sexual (her clearance, job, fear). ✔
6. The leverage is specific and recorded (the board; sourced). ✔
7. The clinic is untouched. ✔

---

## 8. Art (dark noir band: mean 45–70, ≥40% near-black)

1. The Lindqvist breakfast room — drapes shut, lamps, rain behind velvet, Celeste at the far end.
2. The bakery ambush — morning, but the street under a black rain sky; two coffees.
3. The society-page photograph (in-fiction image: grainy, flash, the hand on the wrist).
4. The wall — index cards and red string on the back of the wardrobe door, the mirror turned in.
5. The black phone on the table, one contact: *C.*
6. The studio archive at midnight (tape shelves, one work lamp) / the Helix contracts room
   (reuse the Ch8 room) / the apartment table with notes (reuse).
7. The invitation card and the orchid.

---

## 9. Build plan (after approval)

1. **Script** — `scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md` with full wording (Ch9 format).
2. **Engine** — `src/content/chapter10.ts` (gated `VITE_EVE_CHAPTER10`, content revision 20),
   phases added to the node schema, sub-states for the in-scene choices (the Ch7–9 pattern),
   reducer/App routing like Chapter 9.
3. **Leverage board** — `src/content/leverage.ts` (derived) and `src/ui/LeverageBoard.tsx`.
4. **Tests** — every target × every answer reaches `complete`; refusal never touches anything
   sexual; the board derives the right entries from each Ch7–9 golden; goldens for Ch10.
5. **Art** — the seven frames above, luminance-gated, owner approval before promotion.

Rough size: the script is the big job (~12.5k words on one path, ~20k written across the three
targets and answers); engine and board are about a day each.

---

## 10. Decisions for the owner (recommendations first)

1. **Celeste says "Adrian" at breakfast** — she knows the man under the face, and says so, softly.
   *Recommended: yes.* It is the chapter's title and the whole weight of Act III's blackmail.
2. **The first order's target follows the player's relationships** — Theo's tape, then Julian's
   page, then her own notes. *Recommended: yes* (the beat map's Julian order only fits Julian
   players; Theo's tape pays off Ch7's "a board wanted the raw tape").
3. **The leverage board is Evelynn's own wall** in the fiction (not a phone Celeste gives her);
   Celeste's orders arrive on a separate black phone. *Recommended: yes* — the board is the
   player's tool; Celeste should not own it.
4. **Refusing costs Maya her clearance** (suspended pending review), reversible in Ch14–15.
   *Recommended: yes* — real, non-sexual, and it gives Act III something to win back.
5. **Skipping breakfast is allowed** and is worse (Celeste comes to your street, in public).
   *Recommended: yes.*
