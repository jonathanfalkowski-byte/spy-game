# Executive · Chapter 13: "Held" (design)

**Act III · Executive route (lane id `executive`) · the shared placement ("The Honeypot"), with Executive framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

> **This is the game's reserved sexual-coercion beat on this road** (one of at most two per playthrough). It follows
> [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §2 to the letter.
> - **On screen:** the order, the choice, getting ready, the walk to the door, and the door closing.
> - **Off screen:** everything behind the door, never described as it happens and never framed as arousing.
> - **The aftermath** is on screen, without graphic detail.
> - Refusal never leads to sexual punishment, and the threat is non-sexual.
> - A content notice opens the chapter, and the comply lead-in honours the reader's "Fade coercion scenes"
>   setting.

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) §4, "13 · The Honeypot" (shared spine, Executive framing):
  the placement against Owen Marsh (shared, off screen). **The Executive choice is what she tells Julian, and when:
  before, after, or never. His answer is a person's, not a verdict.** §6.6: his refuge is being held (canon).
- §2 rules: Julian is never a trap; every threat is non-sexual; kept is never punished.
- [CHAPTER_13_THE_HONEYPOT_DESIGN.md](CHAPTER_13_THE_HONEYPOT_DESIGN.md), the Celebrity spine, and its canon:
  - the brief at the Vesper by day;
  - **Owen Marsh**, forty-four, deputy director of enforcement at the Markets Authority, who cycles to work and
    drinks one whisky at the Claremont on Thursdays;
  - **the Claremont**, suite 1109, a camera behind the mirror;
  - **the cut** at the door, and the one moment before it (look at the mirror, or don't);
  - **the recovery step** (exploitation / recovery overlay);
  - **counterplay**: turn him (a staged scene for the camera, both in on it, charged and fake, heat 2), or swap the
    camera's card with Iris's help.
- `src/content/chapter13.ts`: `CONTENT_NOTICE13` and `fadeCoercion13`, the presentation-only fade.

**Continuity it must honour** (built Executive chapters):
- The placement date, "the first Thursday of next month", is on her catalogue page (Ch11). **It is set on every
  road, never moved as a punishment.**
- **Ch12:** `exec.told12`: whether Julian knows who she is. Facts `c12.x-ashby` and `c12.x-schedule`, and
  `exec.nora12`.
- **Ch8:** `exec.file`. On **kept** or **pulled**, she has 14.3 on paper, which is exactly Marsh's inquiry.
- **Ch11:** `exec.iris11 = warn`: Iris is free and knows where the camera's card is kept.
- **Ch14** (built): `exec.told13` (before / after / never) is the key this chapter must set, and it counts toward
  trust. **Ch14's truth scene** covers Celeste's orders; this chapter covers what was done to her.

**Status: APPROVED (owner, 2026-09-29: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_13_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_13_SCRIPT.md); code: `src/content/chapter13-executive.ts`.
It is entered from an Executive `chapter12.complete`, and Ch14 follows from its end with no bridge. It runs ~0.6–1.1k
words on one path.

---

## 1. The chapter's job

On every road the placement is the cost the game has been warning about since Chapter 10. On the Executive road there
is a man who would stand in front of it if she let him, and her choice is **whether to let him know, and when.**

It is the one chapter on this road where Julian cannot fix anything. He does not try to. He asks what she needs him
to be, and then he is that.

The Executive twist on the target: **Owen Marsh's open inquiry is into a fund's guarantees on the companies it
finances.** That means L.S.F., clause 14.3, and Helix. Owning Marsh buries the one inquiry that could save Julian or
sink him. Celeste says so, pleasantly.

By the end of the chapter the player must:

1. **Receive the placement** at the Vesper by day. A content notice opens it. Celeste is kind about it, which is the
   worst of it.
2. **Know Marsh as a person** in the week, and know that his inquiry is into 14.3.
3. **Decide whether to tell Julian before Thursday.** If she does, he asks what she needs him to be: in the lobby,
   at the other end of a phone, or nowhere. He does exactly that.
4. **Answer the order:**
   - **comply:** the door closes, and the scene cuts;
   - **refuse:** the cost falls on Julian, non-sexual. The audit committee receives his eleven signatures;
   - **counterplay:** turn Marsh (a staged scene, both in on it), or swap the camera's card (if Iris is free).
5. **Take a recovery step,** on the comply path, under the overlay. Julian's refuge is **being held, nothing more**
   (canon).
6. **Tell him after, or never,** if she did not tell him before. His answer is a person's.
7. **Pin the card:** THE CLAREMONT. 1109. And what he knows.

The road then runs straight into Ch14, with no bridge.

**What it must not do:**
- show, describe or eroticize anything behind the door on the comply path;
- make refusal cost her body. The cost is Julian's standing (a non-sexual threat, and the one this road has been
  escalating);
- make Julian's refuge sexual, or a cure, or a reward. On the comply path the night after is being held;
- make his answer a verdict on her, on any path;
- move the placement date.

**Why it is thrilling, erotic and fun (and where it is none of those on purpose):**
- **Thrilling:** the week of dread, the clock, and a counterplay carried out under a camera.
- **Erotic:** **only in what she chooses.** On the counterplay path, a staged scene she and Marsh play for the
  camera, both in on it, charged and fake. Nothing else in this chapter is written to be erotic.
- **Fun:** beating Celeste in her own suite.
- **The comply path is not fun and not erotic, by design** (CONTENT_DIRECTION §4). It is the cost, and it should
  feel like one.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `exec.told12` (told / partly / not) | Ch12 | Whether telling him before means telling him everything, or only this |
| `exec.file` (kept / pulled), facts `c12.x-ashby` / `c12.x-schedule` | Ch8, Ch12 | Proof to put in front of Marsh (the turn counterplay) |
| `exec.iris11 = warn` | Ch11 | Iris is free, and knows where the camera's card is kept (the swap counterplay) |
| `exec.sign11`, `exec.cost11` | Ch11 | Celeste's brief: "He signed for you at the Vesper; he'll sit in front of the audit committee for you too." |
| `exec.celeste11` | Ch11 | Celeste's tone |
| `c6.maya` | Ch6 | Maya as a recovery step |
| `exec.flat` | Ch7 | Where she goes home to afterwards: the flat on the river (his), or her own |

---

## 3. Shape (phases)

`placement → days → wednesday → claremont → twoam → saturday → complete`

The phase names avoid the shared Ch13 names (`brief / week / answer / thursday / after / morning`) and Predator's
(`reading / delphine / midnight / monitor / late / friday / ledger`).

| Phase | Place | Beat |
|---|---|---|
| **placement** | the Vesper by day, the reading room | **Content notice.** The empty frames unlit; *The Autumn Collection* open at her page. The brief: Owen Marsh; the Claremont at nine; suite 1109; the camera behind the mirror. "His inquiry is into a fund's guarantees on the companies it finances. You know the one. After Thursday he is ours, and so is his inquiry, and so, frankly, is Julian's future." Refusal is named: "Helix's audit committee has never seen the eleven signatures. It could." |
| **days** | the week | Marsh as a person: he cycles to work and is funny with the woman at the till. Then **the first telling:** **tell Julian now** / **not yet** (neutral). If she tells him: "What do you need me to be on Thursday? In the lobby, at the other end of a phone, or nowhere. Tell me, and I'll be it." |
| **wednesday** | midnight · the black phone | The answer: **comply** / **refuse** / **counterplay** (turn, or swap if Iris is free). |
| **claremont** | Thursday | **Comply:** getting ready as armour; the bar; the lift; the corridor; 1109; **door-look** / **door-away**; the door closes; **the scene cuts** (fade-aware). **Refuse:** at home; the audit committee's letter to Julian at nine the next morning. **Turn:** the truth in the lift, 14.3 on her phone, and the staged scene (both clothed, "is this all right?" off the microphone; heat 2). **Swap:** Iris and the service corridor; the card out of the camera; a drink and a goodbye at the lift. |
| **twoam** | 2 a.m. | **Comply:** the car; the shower, written as time; then the recovery step: **Julian** (being held, nothing more) / **Maya** (if back) / **the wall** ("Done to me. Not by me.") / **alone** (neutral). **Refuse / counterplay:** the relief and the danger. |
| **saturday** | Saturday · forty-one, or his flat | Celeste's word, by answer. Then, if she did not tell him before: **tell him** / **never** (neutral). His answer, by path. |
| **complete** | late · the wardrobe door | THE CLAREMONT. 1109. Then **straight on to Ch14**, "The Signature". |

---

## 4. The telling, and his answers (with recommendations)

**When** (`exec.told13`):
- **before:** in the week. He does not argue, and he does not offer to fix it. "What do you need me to be on
  Thursday?"
  - **in the lobby:** he is there, at a table, with a newspaper he does not read;
  - **at the other end of a phone:** he answers on the first ring at 2 a.m.;
  - **nowhere:** he goes home and stays there, which is the hardest thing she ever asks him for.

  If she hasn't told him who she is (Ch12 not *told*), telling him this means telling him that, and the game
  says so.
- **after:** on Saturday. He listens, and does not ask for anything she doesn't offer.
- **never:** she carries it. He is kind anyway, and never knows why she stays at the window.

**His answer, by path** (a person's, never a verdict):
- **comply:** "You don't owe me the details. You never will. I'd like to be there for the rest of it, if you'll let
  me." If he was in the lobby, he drove her home and did not speak until she did.
- **refuse:** "So that's what the audit committee is about. Good. Let them come. I've been meaning to explain
  myself to someone for eleven years."
- **turn:** "You made a man at the Markets Authority an ally in a hotel suite with a camera in the wall." A long
  pause. "I'd like to meet him. I think I'd like him."
- **swap:** "Every one?" "Every one." "Then she's frightened. Good."

**The costs:**
- **refuse:** Helix's audit committee receives the eleven signatures, and Julian spends a month in front of it
  (`exec.cost13 = audit`). Ch14's board sits with that in the minutes.
- **turn:** Marsh becomes an ally (`exec.marsh13 = ally`). His inquiry takes 14.3 seriously, which helps Ch14's
  enforce way. The risk: Celeste's people review the footage, and it is very convincing.
- **swap:** the card holds the metadata of every placement filmed in 1109 (`exec.card13`), a Meridian asset of the
  first order, for Act IV.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Held"**, the shared placement in Executive framing, for the one thing Julian can give her.
   *Recommended.*
2. **Marsh's inquiry is into 14.3:** owning him buries the inquiry that could save Julian, and Celeste says so.
   *Recommended.* It ties the placement to the road without changing its canon.
3. **The comply path follows CONTENT_DIRECTION §2 exactly:** the notice, the door, the cut, the fade, and the
   aftermath without detail. *Recommended.* This is non-negotiable canon, restated.
4. **The refusal cost is Julian's standing:** the eleven signatures go to the audit committee. It is non-sexual,
   and it escalates this road's pattern (his week, his client, now his job). *Recommended.* The shared road's Maya
   charge stays the Celebrity road's.
5. **Counterplay:**
   - **turn** Marsh with proof (the copy or original of 14.3, Ashby's words, or the schedule); a staged scene, both
     in on it, heat 2, the only erotic scene in the chapter because it is chosen;
   - **swap** the camera's card, only if Iris is free.

   *Recommended.*
6. **When she tells him:**
   - **before:** he asks what she needs him to be, and is it;
   - **after:** Saturday;
   - **never.**

   His answers are a person's on every path. His refuge after compliance is **being held, nothing more** (canon).
   Ch14 reads `exec.told13`. *Recommended.*
7. **The recovery step** on the comply path: Julian, Maya, the wall, or alone. Never framed as a cure or a reward.
   *Recommended.*
8. **Build shape:**
   - entered from an Executive `chapter12.complete`;
   - **Ch14 enters from `chapter13.complete`, and the in-development bridge is removed**, so the Executive road runs
     from Ch7 to Ch14 without a gap;
   - `fadeCoercion13` learns the Executive comply lead-in;
   - three goldens (comply, refuse, turn), with neutral picks and a real-save authentication test;
   - small Ch14 follow-ups: a line for Marsh's inquiry on the enforce way, and the audit letter in the minutes.

   *Recommended.*

---

## 6. Art impact

It reuses the shared Ch13 set: the Vesper by day, the Claremont bar, the eleventh-floor corridor, and the door of
1109 (never the room).

New candidates:
- Julian at a lobby table with a newspaper he isn't reading;
- the wall card, "Done to me. Not by me.", an insert.

The dark noir rules apply. These go on the consolidated art list after the deepening passes, per the standing rule.
