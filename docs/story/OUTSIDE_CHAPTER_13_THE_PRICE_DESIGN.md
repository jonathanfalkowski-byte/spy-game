# Outside · Chapter 13: "The Price" (design)

**Act III · Outside route (lane id `outside`) · the shared placement ("The Honeypot"), with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

> **This is the game's reserved sexual-coercion beat on this road** (one of at most two per playthrough). It follows
> [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §2 to the letter, exactly as the Celebrity, Predator, Executive and
> Institutional chapters do:
> - **On screen:** the order, the choice, getting ready, the walk to the door, and the door closing.
> - **Off screen:** everything behind the door, never described as it happens and never framed as arousing.
> - **The aftermath** is on screen, without graphic detail.
> - Refusal never leads to sexual punishment, and every threat is non-sexual (here: to the sender, and to Maya's career).
> - A content notice opens the chapter, and the comply lead-in honours the reader's "Fade coercion scenes" setting.

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4, "13 · The Honeypot": the placement against Owen Marsh (shared, off
  screen) arrives as **Celeste's price for not finding the sender.** The Outside choice: **comply** (off screen, as canon),
  **refuse** and let them find Rafe, or **turn it**: Rafe's ledger to Marsh, a staged scene both in on it.
- §2 rules: his price is always information; the skeptic is never punished; he never makes her Nell; the sender stays unnamed
  until Ch14; **how Nell died stays for Act IV**; Sloane is a target or a trade.
- [CHAPTER_13_THE_HONEYPOT_DESIGN.md](CHAPTER_13_THE_HONEYPOT_DESIGN.md), the shared canon: Owen Marsh, forty-four, deputy
  director of enforcement at the Markets Authority, who cycles to work and drinks one whisky at the Claremont on
  Thursdays; suite 1109, a camera behind the mirror; the cut at the door, and the one moment before it (look at the mirror,
  or don't); the recovery step; counterplay (a staged scene, both in on it, charged and fake, heat 2); the leverage on Maya
  (a file, non-sexual); `CONTENT_NOTICE13` and the presentation-only fade.
- [INSTITUTIONAL_CHAPTER_13_THROUGH_CHANNELS_DESIGN.md](INSTITUTIONAL_CHAPTER_13_THROUGH_CHANNELS_DESIGN.md) and
  [EXECUTIVE_CHAPTER_13_HELD_DESIGN.md](EXECUTIVE_CHAPTER_13_HELD_DESIGN.md), the lane-variant pattern.

**Continuity it must honour:** the placement date, the first Thursday of next month, on her catalogue page (Ch11), **never
moved as a punishment**; Ch10's answer (`out.give10`), Ch11's face and page, Ch12's Singapore (the man in the linen suit is why
Celeste knows how to look); Ch14 (built): Rafe's reckoning remembers the Thursday, and the road now runs **straight into
Ch14**.

**Status: APPROVED (owner, 2026-10-01: "do your recommendation", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_13_SCRIPT.md](scripts/OUTSIDE_CHAPTER_13_SCRIPT.md); code: `src/content/chapter13-outside.ts`. Entered
from an Outside `chapter12.complete`; Ch14 follows directly. ~0.87–1.31k words on one path.

---

## 1. The chapter's job

On the other roads the placement comes from Celeste, or on paper, or through a handler. On this road it comes **as a price for
a man's life**: she has not found the sender, and she is very patient about it, and she could stop being. The threat is not to
Evelynn. It is to a man on a river.

By the end of the chapter the player must:

1. **Receive the price** on the black phone. A content notice opens the chapter. *On the first Thursday I should like you at
   the Claremont at nine... Suite 1109 is ours. There is a camera behind the mirror.* And: *I should hate for a man like that
   to be found. It is only a question of by whom.* And Maya's file.
2. **Know Marsh as a person** in the week (shared canon), and make one move: **ring the 02:40 phone** (he offers his ledger:
   "Every handoff I carried for her, in my hand. It's the one thing that could take his inquiry out of her reach.") / **dinner
   with Maya** / **alone**.
3. **Answer the order** at midnight on Wednesday: **comply** / **refuse** / **turn** (only with proof: Rafe's ledger, or a page
   she verified herself).
4. **Play Thursday:** comply: getting ready, the car, the bar, the lift, the corridor, the door (**look at the mirror / don't**);
   refuse: home on the floor; turn: the lift, the proof, a staged scene both clothed and in on it.
5. **Take a recovery step** on the comply path, a refuge and never sexual: **Maya** (a hand held, nothing more) / **the wall**
   ("DONE TO ME. NOT BY ME.") / **the 02:40 phone** (he reads her the shipping forecast, and does not ask) / **alone**.
6. **See the costs on Saturday:** comply: Celeste calls off her dogs "for now"; refuse: they find his lodging, he was in a
   launderette, he goes to ground; turn: Marsh an ally, who keeps the courier's name off every page.
7. **Pin the card:** THE CLAREMONT. 1109. and DONE. / REFUSED. THEY FOUND HIS LODGING. / STAGED. MARSH IS OURS.

**What it must not do:** show, describe or eroticize anything behind the door on the comply path; make any refusal cost her
body; make Rafe's refuge sexual, a cure or a reward; move the placement date; name the sender or tell how Nell died.

**Why it is thrilling, erotic and fun (and where it is none of those on purpose):** the thrill is a price set against a man she
has never been allowed to meet properly, and one week to decide whom to trust with it; the charge is only in what she chooses
(the staged scene with Marsh, clothed, charged and fake); the fun is in Marsh, keeping a courier's name off every page. **The
comply path is not fun and not erotic, by design. It is the cost.**

## 2. Shape (phases)

`terms → watch → dusk → door → hours → morrow → complete`

The names avoid the shared Ch13 phases (`brief / week / answer / thursday / after / morning`), Predator's (`reading / delphine /
midnight / monitor / late / friday / ledger`), Executive's (`placement / days / wednesday / claremont / twoam / saturday`) and
Institutional's (`tasking / dread / channel / reply / corridor / smallhours / weekend`).

## 3. Keys

The shared Act III keys Ch14 reads: `c13.answer` (complied / refused / countered), `act3.honeypot` (done / refused / staged),
`act3.ally.marsh = in` (turn). Outside: `out.ledger13`, `out.told13` (rang the sender), `out.rafe13 = hiding` (refuse),
`c13.o-*` (answer, move, door, recover); facts `c13.o-marsh`, `c13.o-evening-consent` (the staged scene's scope).

## 4. Decisions (all taken as recommended)

1. **Title "The Price":** the placement is the price for the sender's safety.
2. **The threat is to the sender and to Maya, never sexual.**
3. **Marsh is a person first,** as in every road; one move in the week (the sender / Maya / alone).
4. **The sender offers his ledger,** at the cost of his own name on every page, as the proof for the turn.
5. **Comply is off screen,** with the content notice, the fade, the one moment at the mirror, and a recovery step that is a
   refuge: the wall, Maya, the shipping forecast, or alone.
6. **Refuse costs the source, never her body:** they find his lodging; he goes to ground.
7. **Turn is a staged scene,** both clothed and in on it, with Marsh keeping the courier's name off the page.
8. **Build shape:** entered from an Outside `chapter12.complete`; Ch14 follows directly (the interim bridge becomes a fallback);
   goldens (comply; refuse; turn on the ledger; turn on a verified page), a test that nothing is described after the door
   closes, the fade, and a real-save authentication test.

## 4a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no flag the later chapters read changes). **None is inside or beside the coercion beat:** the content notice,
the comply lead-in, the fade, the door and the recovery step are untouched, and the existing tests that nothing is described after "The door closes behind you."
and that the next thing on screen is "The car home." still pass.

| Moment | Where | Choices (`c13.o-…`) |
|---|---|---|
| **The price on the phone** | before the week (`terms`, after the notice) | **o13-msg-wall** (four lines of facts, no adjectives) · **-book** (each fact checked in the exercise book, all true; does not add to `out.verified`) · **-face** (the phone turned face down) |
| **Marsh as a person** | before she chooses who to tell (`watch`) | **o13-see-bike** (two locks, good morning to the guard by name) · **-paper** (his own talks: "proportionate") · **-none** (no more than she must) |
| **The Sunday after** | before the card (`morrow`, every path) | **o13-sunday-walk** · **-letter** (to Maya, not sent) · **-stove** (the Vesper's ribbon burned) |

No golden recapture is needed.

## 5. Art impact

Reuses the Claremont's bar, lift and corridor (shared Ch13 set) and the room over the water. New: the black phone's price at
night; Marsh in the bar with his cycling clips; the brown envelope on the third step. These go on the consolidated art list
after the deepening passes; nothing behind the door is ever drawn.
