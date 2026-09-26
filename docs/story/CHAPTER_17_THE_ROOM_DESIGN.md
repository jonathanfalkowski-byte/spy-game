# Chapter 17 — "The Room" (design)

**Act IV · shared operation, route-flavoured (Celebrity / own-power built first) · NEW**
**Budget: 0.8h / ~8k words on one path** ([BEAT_MAP.md](BEAT_MAP.md), 12–15 hour plan).
Design authority: [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §1 (the truth), §4 (Sloane's motive resolves),
§7 (`confront`), §8 (doctrine: one truth, autonomy, no intimacy-as-trap, noir ambiguity: Meridian wounded, not
toppled; Celeste and Sloane end as people in the machine, not defeated bosses), [BEAT_MAP.md](BEAT_MAP.md) (Act IV),
[CONTENT_DIRECTION.md](CONTENT_DIRECTION.md), [CAMPAIGN_PACING_PLAN.md](CAMPAIGN_PACING_PLAN.md).
Status: **approved (owner, 2026-09-26: all seven decisions as recommended) and built, pass 1** — script:
[scripts/CHAPTER_17_THE_ROOM_SCRIPT.md](scripts/CHAPTER_17_THE_ROOM_SCRIPT.md), code: `src/content/chapter17.ts`.
~1.9–2.0k words on the golden paths. Gated like Chapters 6–16 (`VITE_EVE_CHAPTER17`, content revision
≥ 19), entered from an own-power `chapter16.complete`.

---

## 1. The chapter's job

Chapter 16 ended with Evelynn in the long room and Celeste standing. Chapter 17 is **the room**: one hour at the
board table, the confrontation the whole game has been walking towards.

By the end of the chapter the player must:

1. **Have laid the case on the table** in the order she chose (`act4.first`), and argued the ORACLE defect in
   front of the people who signed it: the maker knew the product was defective and sold it anyway (ENDGAME §1.4).
2. **See Sloane's motive resolve** in front of the board: an officer handed a product her vendor had already scored
   uncontrollable, "priced in", made to carry the blame (§4). On this lane, Evelynn decides what Sloane is to her in
   that room.
3. **Face Celeste's last move**, the offer, and play the card held back (`act4.held`) at the moment Celeste thinks she
   has won.
4. **Hear the truth about Nell** from the one person who knows it, and, if it is her aim, make Celeste say her name.
5. **Watch the board decide:** Meridian wounded, not toppled. What it costs Celeste is scaled by what Evelynn
   brought (`act4.case`, who is in the room, who is outside).
6. **Have one last minute alone with Celeste.** Chapter 18 is what Evelynn does with what she walks out holding.

What it must not do: resolve the ending (Ch18 turns the aim into a position); topple Meridian; make Celeste a
monster or a pantomime (noir ambiguity); punish any consent choice (no intimacy-as-trap); gate the name or the
action behind any ally (autonomy law: the free-agent core, alone and thin, still gets the room, the truth and the
walk out; it gets less of the terms).

**Why it is thrilling, erotic and fun:** it is a courtroom scene with no judge and a boardroom heist with no
safe: the thrill of the order of the cards, the one held back, and the moment it lands. The erotic charge is the
one the game has always had between these two women: attention, appraisal, being looked at by the person who
knows you best and least; nothing sexual, all of it charged. The fun is watching Celeste read her own signature
in front of her own board, and the doorman's "Good luck" paying off.

---

## 2. What it reads (inputs)

| Input | From | What Chapter 17 does with it |
|---|---|---|
| `act4.case` (thin → overwhelming) | Ch16 | How far the board moves: the scale of Celeste's loss and of the terms |
| `act4.aim` (expose / terms / nell / out) | Ch16 | What Evelynn asks the board for; what Ch18 turns into a position |
| `act4.inside`, `act4.outside` | Ch16 | Who speaks in the room (Sloane, Nora, Marsh, Maya, Iris, Julian); who is waiting at seven (Theo, Pryce, Maya, the switch) |
| `act4.first`, `act4.held` | Ch16 | The first card, and the one that lands at the turn |
| `act4.wear`, `act4.seen`, `act4.arrive` | Ch16 | Celeste's first line; whether the street outside is a clock ticking for them |
| `act3.sloane`, `act3.maya-status`, `act3.adrian`, `act3.switch`, `act3.celeste-afraid`, `c15.cost` | Ch10–15 | What Celeste can still threaten (almost nothing), and what she knows Evelynn spent |
| `act3.nell`, `act3.nell-order`, `act3.ally.nora` | Ch12, Ch15 | Whether Nell's name, the order and her sister are in the room |
| `c11.iris`, `c13.answer`, `c14.answer` | Ch11–14 | What Celeste can say Evelynn did for her (the room hears it; Evelynn owns it) |

---

## 3. Shape

`opening` → `defect` → `sloane` → `turn` → `nell` → `vote` → `complete`

| # | Phase | Title · place | Words | Choices |
|---|---|---|---|---|
| 1 | `opening` | The Product · 18:00 · THE LONG ROOM | ~1,200 | How she opens (to the room, or to Celeste) |
| 2 | `defect` | The Defect · 18:15 | ~1,300 | How she presses the verdict |
| 3 | `sloane` | The Officer of Record · 18:25 | ~1,000 | What Sloane is to her, in that room |
| 4 | `turn` | The Offer · 18:40 | ~1,300 | Her answer; the held card lands |
| 5 | `nell` | Eleanor · 18:50 | ~1,300 | How the name is said |
| 6 | `vote` | The Board · 19:00 | ~1,000 | None (the board decides from what is on the table) → continue |
| | `complete` | One Minute · 19:10 | ~700 | Her last words to Celeste |
| | | **Total** | **~7,800** | |

One shared spine: everything happens in one room, in one hour, for every road. The inputs change who speaks and what
lands, not which scenes she reads.

---

## 4. Scene by scene

### 4.1 The Product (`opening`)

Celeste speaks first, of course: to the board, warmly, about the product. The reissue, performing beyond forecast;
the public profile; the controllability characteristic "which we priced in, as you will recall, Anton". She
introduces Evelynn as the evening's exhibit, by her catalogue number. Her first line to Evelynn reads the dress
(`act4.wear`): "The green. You kept it." / "Black. You did dare." / "Iris's grey. How very loyal."

**How she opens** (`act4.open`): **open-room** (speak to the board, not to Celeste: "I'm the product. I'd like to
read you the warranty.") · **open-celeste** (speak only to Celeste, and make the board listen in) · **open-silent**
(say nothing; put the first card on the table and let it speak). The first card lands (`act4.first`), and each has a
first effect: the verdict (Soames reaches for her glasses), Nell's order (Deverell looks at Celeste for the first
time), the cards (the young man with the laptop goes white), page seven (the missing page, back in the room), the
black phone (Celeste's own words, read out), Adrian's file (the room learns what the product is made of).

### 4.2 The Defect (`defect`)

The ORACLE verdict on the table: voluntary adoption high, durable control low, and the board's sign-off with three
signatures. If Evelynn holds only a reconstruction, Soames asks for the signed original, and Celeste smiles; and
then, if Sloane or Marsh is in the room, the original comes out of a banker's box.

**How she presses** (`act4.press`): **press-fraud** (the client was sold a defect: Axiom's board will want to know,
and so will its lawyers) · **press-every** (every product in the collection carries the same characteristic: every
drawer at sixteen degrees is a liability) · **press-cost** (what the defect cost the people who carried it: Iris,
Nell, a girl who was nineteen). Deverell's first question is not to Evelynn. It is to Celeste: "Did we know?"

### 4.3 The Officer of Record (`sloane`)

Sloane's motive resolves in front of the board (ENDGAME §4). If she is inside, she stands up and says it herself,
in the order she once briefed rooms: the file, the assessment attached, the objection in writing, "priced in", the
officer of record who takes the blame. If she is not, Evelynn reads Sloane's objection aloud from the verdict's own
annexe, and Celeste says, lightly, "Poor Victoria. She always did want to be the one who was right."

**What Sloane is to her, in that room** (`act4.sloane`), the door not taken, resolved from the outside:
- **sloane-vouch** · "She raised it. You buried it." Clear her, in front of the people who can.
- **sloane-stand** · let her stand on her own record. Not an ally; not an enemy. A person in the machine.
- **sloane-use** · make her the proof: the officer who delivered a product she knew was defective. True, and cold,
  and it will cost Sloane everything she has left.

### 4.4 The Offer (`turn`)

Celeste's last move, and the best she has ever made. Not a threat: there is nothing left to threaten with (the leash
is broken, the switch is armed, and she knows it). An offer, to Evelynn, in front of the board: **a seat at this
table.** "You understand the product better than anyone in this room. You are the product. Sit with us, darling.
Nobody would ever place you again. You would do the placing." The board, frightened, is half ready to agree.

**Her answer** (`act4.offer`): **offer-refuse** ("I didn't come for a chair.") · **offer-draw** (pretend to consider
it, long enough for Celeste to say what a seat would cost somebody else) · **offer-laugh** (laugh, the real laugh,
the one nobody in this room has ever heard from her). Then, at the moment Celeste thinks she has won or at least
drawn: **the held card lands** (`act4.held`), each with its own blow: the verdict's original; Nell's order, signed
C.; the 1109 cards ("Every client at this table is on one"); the black phone read aloud; Adrian's file laid down as
"the product's receipt"; Ashby's voice from a Singapore bar; or, with nothing held back, her own hands, flat on the
table, and "I'm still here."

### 4.5 Eleanor (`nell`)

The personal turn. Evelynn and Celeste, across the table, and the board as witnesses. Celeste on Nell: the balcony
every night, Lisbon, the orchids, "the only one I ever minded ending". And the thing the game has held open since
Singapore: **what happened on the harbour wall** (§10.4). Celeste's account: the Jakarta order was hers. On the
Saturday night she sent a car to take Nell to her sister's, to bring her home; Nell would not get into it, and walked
the harbour wall in the dark with the bad leg, and the driver watched her fall and did not stop. He rang Celeste at
six. Celeste rang Nora at seven. Responsibility, not a push; the truth, and not the whole of anyone's guilt.

**How the name is said** (`act4.named`): **named-ask** (ask her to say it) · **named-nora** (if Nora is in the room:
Nora puts the photograph on the table, face up, and says nothing) · **named-wait** (say nothing, and wait, as Adrian
learned to). If the aim was Nell's name, this is the moment the aim is won or not: Celeste says *Eleanor*, or she
says *Evie*, and the difference is the whole chapter.

### 4.6 The Board (`vote`)

Deverell moves, not to punish Celeste but to save Meridian: the firm must be seen to have acted. What the board
does is read from what is on the table (`act4.case`), who is in the room, and who is outside (the street, Theo's
camera at seven, the switch):
- **overwhelming / strong** · Celeste is asked to resign her seat, tonight, and does. The board grants Evelynn's aim
  as terms (a written undertaking: Maya, Adrian's name, Sloane, page seven, the collection closed to her) and asks,
  very politely, what else she wants. Meridian stands; its board is one fewer.
- **supported** · Celeste keeps her seat and loses the room: no longer the one who speaks for the board. Terms in
  part; the rest held by the switch.
- **thin** · the board closes ranks. Evelynn walks out with what she carried in, the switch armed, and the slow,
  public road ahead (autonomy law: still solvable, only costlier). Celeste keeps her seat, and knows it will not last.

`act4.board` (resigned | diminished | closed) and `act4.terms` (full | partial | none) are written here.

### 4.7 One Minute (`complete`)

The board files out. For one minute, the two of them alone in the long room under the empty frames. Celeste asks the
question she has wanted to ask since the breakfast: *Did you ever like being her?* And holds out the white orchid.

**Her last words** (`act4.last`): **last-yes** ("Yes. More than I ever liked being him.") · **last-no** ("I liked
being me. It took me a long time to find out who that was.") · **last-orchid** (take the orchid, and put it in the
water jug on the board table, and leave it there). Celeste's reply, and the door.

**Last line:** *I walked out of the Vesper by the front door, and nobody opened it for me. I opened it myself.*

---

## 5. Flags written (for Chapter 18)

`act4.open` · `act4.press` · `act4.sloane` (vouch | stand | use) · `act4.offer` (refuse | draw | laugh) ·
`act4.held-landed` · `act4.named` (ask | nora | wait) · `act4.nell-said` (eleanor | evie | no) · `act4.board`
(resigned | diminished | closed) · `act4.terms` (full | partial | none) · `act4.last` (yes | no | orchid).

---

## 6. Content checklist (CONTENT_DIRECTION §11)

1. Nothing sexual on screen. The charge between Evelynn and Celeste is attention, not contact. ✔
2. No coercion: the offer is an offer, refusable at no cost. ✔
3–5. No threats to Maya (Celeste has none left to make). ✔
6. Everything on the table is sourced; the board reacts to what was actually brought. ✔
7. The clinic is untouched; Adrian's file is laid down, never opened on screen. ✔
8. Nell's death is told, not shown; no violence on screen. ✔

---

## 7. Art (dark noir band)

1. The long room as a boardroom: the table under the empty frames, six seated, one standing.
2. A document on a table under a lamp: three signatures (no readable faces).
3. A photograph laid face up on a table, a woman's hand withdrawing from it.
4. Two women at opposite ends of an empty board table, a white orchid in a water jug.

---

## 8. Build plan (after approval)

1. **Script:** `scripts/CHAPTER_17_THE_ROOM_SCRIPT.md`.
2. **Engine:** `src/content/chapter17.ts` (gated `VITE_EVE_CHAPTER17`), seven phase nodes, `act4.*` keys, the board's
   decision derived from `act4.case` plus who is present; wiring as Ch16.
3. **Board:** `leverage.ts` records what the board granted.
4. **Tests:** every aim × case strength × held card reaches `complete`; the free-agent core (thin, alone) still gets
   the truth and the walk out; nothing sexual on screen; Meridian is never toppled (`act4.board` never "dissolved");
   goldens from the Ch16 goldens.
5. **Art:** the four frames, luminance-gated, owner approval before promotion.

---

## 9. What it sets up

- **Ch18 The Position:** the aim becomes the position, scaled by the terms; Maya, Julian, Sebastian, Theo or Owen
  resolved; Sloane's and Celeste's last places in the world; who she is now (Adrian, Evelyn, or someone new).

---

## 10. Decisions for the owner (recommendations first)

1. **One room, one hour, six beats** (the product, the defect, Sloane, the offer and the held card, Nell, the vote),
   one shared spine for every road. *Recommended: yes.*
2. **The board's decision scales with what she brought:** strong or overwhelming, Celeste resigns her seat and the
   aim is granted as terms; supported, she is diminished and terms are partial; thin, the board closes ranks and
   Evelynn walks out with the switch and the public road. Meridian always stands. *Recommended: yes* (wound, don't
   topple; autonomy law).
3. **Celeste's last move is an offer: a seat at the table,** refusable (refuse, draw her out, or laugh), not
   acceptable on this route. *Recommended: yes*: accepting would be capture, which the own-power ending must not be;
   the Predator route can own that door later.
4. **Nell's death, resolved:** the Jakarta order was Celeste's; on the Saturday she sent a car to bring Nell home, Nell
   refused it and walked the harbour wall with the bad leg; the driver watched her fall and did not stop; he rang
   Celeste at six, Celeste rang Nora at seven. Responsibility, not a push. *Recommended: yes*: it keeps Celeste a
   person in the machine rather than a murderer, and makes the Sunday phone call land. Alternatives: Celeste had her
   killed (darker, flattens her); a pure accident (lets her off).
5. **Sloane resolves in front of the board,** and Evelynn chooses what she is to her there: vouch for her, let her
   stand on her own record, or use her as proof. *Recommended: yes* (ENDGAME §4, own-power: the door not taken,
   resolved from the outside).
6. **The held card lands at Celeste's offer,** each with its own blow, including "nothing held back": her hands flat
   on the table. *Recommended: yes*: the payoff of Chapter 16's choice.
7. **One minute alone at the end:** "Did you ever like being her?" and the white orchid, and Evelynn's answer.
   *Recommended: yes*: the two of them, not a boss defeated.
