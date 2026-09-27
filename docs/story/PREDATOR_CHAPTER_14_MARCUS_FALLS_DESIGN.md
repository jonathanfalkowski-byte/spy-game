# Predator · Chapter 14: "Marcus Falls" (design)

**Act III · Predator route (lane id `predator`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §5, "Ch14 · Marcus Falls": the payoff of every lever. How
  she takes him: the board, the press (a Celebrity crossover), or a quiet resignation letter he signs in her
  presence. Julian's stance is set by Ch7–8: ally, rival or casualty.
- The built Predator chapters 7, 8 and 13.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). Her weapons are secrets, leverage and charm. She never sexually
  coerces anyone; the fall is financial, professional and public, never sexual.

**Status: APPROVED (owner, 2026-09-27: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_14_SCRIPT.md](scripts/PREDATOR_CHAPTER_14_SCRIPT.md); code: `src/content/chapter14-predator.ts`.
It is entered from `chapter13.ledger`. It ran ~1.1–1.7k words on one path at pass 1, and was deepened 2026-09-27 to ~1.3–2.1k.

**Two refinements made in the build:**
- Varga's hand counts whether the counsel lever was used or spared. Either way, Legal is hers.
- The audit committee's chair is a fourth possible hand, given by the fund's schedule from the archive. This makes
  the board way reachable against a rival Julian (three hands) without the safe, which comes after the choice.

---

## 1. The chapter's job

Chapter 7 asked "What do you want?". Chapter 14 **pays it**. Everything she kept on the floor goes on the table at
once, and the man who hired her to be frightening finds out how frightening she is.

By the end of the chapter the player must:

1. **Assemble the fall:** choose **how** to take Marcus. Each way is gated by what she built, and one is always
   available (the autonomy law: she can finish alone and thin).
2. **Optionally crack his safe:** if Pryce told her about the painting of the horse (Ch8), the copies Marcus keeps
   of everything are hers for one night. Among them is his copy of her own Thursday.
3. **Face him:** Marcus's last move. He tells her Celeste will do to her exactly this, and offers a partnership
   against Celeste instead.
4. **Decide what he keeps:** everything taken, the chair and his pension, or his name.
5. **Get what she asked for:** the money, the title, or **his desk**.
6. **Settle Julian:** he stands beside her, votes against her, or finds out what she kept on him.
7. **Receive Celeste's invitation:** the board of Meridian would like to meet Helix's new counterparty. That is Act
   IV.

**What it must not do:**
- make the fall sexual or cruel for its own sake;
- turn Marcus into a cartoon (he came up from a council flat in Leeds, and she knows it);
- let any way be the only way.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** the safe at night, and a boardroom where every vote is a lever she pulled.
- **Erotic:** the charge between two predators at the end of their game. An optional, chosen evening follows, with
  Julian, or with a Marcus she spared (mutual, heat 3, consent-gated, fading).
- **Fun:** watching three weeks of question marks become answers, in order, in a room full of men who thought she
  was new.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want` (money / title / desk) | Ch7 | The payoff: his bonus pool, his title, or his office |
| `pred.clause.*` | Ch7 | **report**: Marcus's own board has never seen her work (surprise); **indemnity**: the letter way costs her nothing; **private**: the press way uses her face on her terms; **exit**: the walk-out threat; **access**: the archive in evidence |
| `pred.lever8.*`, `pred.hollis` (owned), `pred.lsf` | Ch8 | Hollis's vote, Varga's Legal (if spared), Benton's line, the press plan |
| `c8.p-night` (pryce) | Ch8 | The safe behind the horse |
| `c7.p-lever` (return) | Ch7 | Marcus planted the Novagen file, and she handed it back, so he thinks he owns her discretion |
| `pred.julian`, `pred.julian8` | Ch7–8 | Julian's stance in the room |
| `pred.mirror`, `pred.delphine`, `pred.ally.marsh`, `pred.standing` | Ch13 | Marcus's verdict on her Thursday; Marsh as an outside ally for the press way; how much Celeste trusts her |
| `c5.published` | Ch5 | The press way |

---

## 3. Shape (phases)

`dawn → case → safe (optional) → room → last → desk → evening → ledger`

| Phase | Place | Beat |
|---|---|---|
| **dawn** | 05:00 · the wardrobe door | The ledger, every card. She decides it is today. |
| **case** | morning · her office | The ways (§4). She chooses one, and the chapter is shaped around it. |
| **safe** | 01:00 · Marcus's flat, behind the horse | Only if Pryce told her. His copies of everything, including a folder with her name on it and a copy of the Claremont tape request. She takes one thing: **his copy of her** / **the L.S.F. letters** / **nothing, and leaves the horse crooked on purpose**. |
| **room** | the way she chose | The fall itself (§4). |
| **last** | his office, after | Marcus's last move: "She'll do this to you." A partnership offer against Celeste. |
| **desk** | the next morning | The payoff of her Ch7 want, and what he keeps. |
| **evening** | night | Optional: Julian (ally), or Marcus if spared (mutual), or nobody. Heat 3, consent flow, fades. |
| **ledger** | late | Marcus's card comes down. One card goes up: MERIDIAN — THE BOARD. Celeste's invitation. |

---

## 4. The ways (with recommendations)

| Way | Needs | The scene | Cost |
|---|---|---|---|
| **The board** | Two votes she owns: Hollis owned; or Varga spared; or Julian as an ally | A special meeting of the Helix board at eight in the morning. Hollis moves. Legal confirms. The chair reads the L.S.F. letters into the minutes. Marcus is removed in eleven minutes by a show of hands, and every hand is a lever she pulled. | The levers are spent: Hollis and Varga are hers no longer |
| **The press** | `c5.published` and either the press lever used or the **private** clause; Marsh as an ally strengthens it | Her face on a front page she approved: HELIX'S HIDDEN FUND. The Laurent money in the second paragraph, Marsh's inquiry reopened in the third. Marcus reads it on his own phone in the lift. | She becomes the story. Celeste's trust falls, and the public face is hers for good |
| **The letter** | **Always available:** the Chapter 7 Novagen file (Hollis's early ink, Benton's line) is enough, and the safe makes it overwhelming | His office at seven in the evening. A resignation letter she wrote, on his paper, with his pen, the one he gave her. She waits while he reads it, and while he signs it. | Quiet. Nobody outside the room knows who did it, including Celeste, and so nobody fears her for it |

**Marcus's last move** (`p14.last`), in his office after the fall:
- **last-refuse**: he offers a partnership against Celeste, and she turns it down. He goes alone.
- **last-take**: she takes it. Marcus in exile becomes an ally for Act IV: a man who knows where the fund keeps its
  secrets.
- **last-laugh**: she laughs, and tells him she already has the letters. The most fun, and the most dangerous.

**What he keeps** (`p14.mercy`):
- **mercy-none**: everything taken;
- **mercy-chair**: his pension, and the chair from his first company, delivered to Leeds;
- **mercy-name**: he resigns "for personal reasons" and keeps his name. Only this last one lets him be her evening.

---

## 5. Decisions for the owner (recommendation first)

1. **Three ways (board / press / letter),** each gated by what she built, with the **letter always available**
   from the Ch7 Novagen file (autonomy law). *Recommended.*
2. **The safe** behind the horse, only if Pryce told her in Ch8: one thing taken from his copies, including his
   copy of her. *Recommended.*
3. **Marcus's last move:** he warns her Celeste will do the same to her, and offers a partnership she can refuse,
   take, or laugh at. *Recommended.*
4. **What he keeps:** nothing, the chair and his pension, or his name. *Recommended.* It is the route's measure of
   what she is becoming.
5. **The payoff of her Ch7 want:** the money (his bonus pool), the title (his, with her name), or his desk (the
   corner office, the chair from Leeds gone). *Recommended.*
6. **Julian in the room:** an ally stands beside her; a rival votes against her (the board way needs one more
   vote); for a casualty she kept, she decides whether his favour comes out with Marcus's. *Recommended.*
7. **Evening:** Julian if he is an ally, or Marcus only if she let him keep his name (mutual, heat 3,
   consent-gated, fades), or nobody. *Recommended.*
8. **The end:** Celeste's invitation to Meridian's board ("Helix's new counterparty"). The Predator road then
   reaches the in-development stop until its Act IV variants exist. Three goldens, one per way, with neutral picks.
   *Recommended.*
