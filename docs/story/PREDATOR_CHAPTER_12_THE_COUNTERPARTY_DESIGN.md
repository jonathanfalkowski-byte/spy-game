# Predator · Chapter 12: "The Counterparty" (design)

**Act III · Predator route (lane id `predator`) · NEW (replaces Singapore on this route)**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §5, "Ch12 · The Counterparty": Geneva in the rain; the
  Helix–Meridian fund's private bank; a banker called Lucien Morel, the only man in the game as good at this as she
  is; a heat-3 evening, mutual and dangerous. Nell's trail runs from the money side: nine flats, nine accounts, one
  signature, C.
- Decision 2 (approved): Geneva and the money trail, not Singapore.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) and Celebrity Ch12 canon:
  - Eleanor "Nell" Linden, the first Evelyn: burned in Jakarta, gone "before breakfast", taken out of the harbour a
    week later;
  - her sister Nora Linden, in Holland Village;
  - the Emerald Hill flat, a kept legend site, one of nine.

  Proof of Celeste's part waits for Act IV.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). Her weapons are secrets, leverage and charm. She never sexually
  coerces anyone. The evening is chosen and never payment for anything.

**Status: DESIGN for owner approval.** Nothing is built.

---

## 1. The chapter's job

On the Celebrity road Evelynn goes to Singapore and finds Nell through the people who loved her. On the Predator road
she goes to **Geneva as Helix's representative**, a client in the room and not the product, and finds Nell **through
the money**: what it cost to keep a woman's life furnished, and who signed for it.

By the end of the chapter the player must:

1. **Sit across the table as a counterparty.** Marcus sends her to sign the fund's financing for Helix's next deal
   at Morel & Cie, the fund's private bank. It is her first time on the buying side of Meridian.
2. **Meet Lucien Morel**, who reads her as fast as she reads him, and who says, over lunch, **"You're the second
   one."** He knew the first Evelyn: she sat in that chair and ordered the same thing.
3. **Get the list**, one of three ways (§4): nine accounts, nine flats, one signature, C. Eleanor Linden's account
   was closed the week after the harbour. Its last payment went to Nora Linden, Holland Village. **One of the nine
   flats is her own.**
4. **Be offered an account of her own,** a numbered one at Morel & Cie, seeded by the fund, "as every client's
   representative has". She takes it, or doesn't. It is the first hook of the board-seat ending.
5. **Optionally spend the evening with Lucien:** mutual, dangerous, heat 3, consent-gated. It fades.
6. **Ring Nora Linden** from the hotel, or not.
7. **Carry it home.** A card for ELEANOR LINDEN goes on the wardrobe door, and the winter (Chapter 13) begins.

**What it must not do:**
- resurrect Nell, or prove what happened in the harbour (canon; Act IV);
- make Lucien's help, or the list, the price of the evening. The evening is never a transaction;
- let her coerce Lucien sexually, or at all. His lever, if she finds it, is his own guilt, and she can only ask.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a private bank with no names on its doors; the cleaners' lift at five in the morning; the list,
  with her own address on it.
- **Erotic:** Lucien, the only man who plays her game as well as she does, and a lake at night. The charge is two
  people who both know the other is lying, and both choose anyway.
- **Fun:** being the client for once, being very good at it, and making Celeste's banker like her more than he
  likes Celeste.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want` (money / title / desk) | Ch7 | The account tempts her most on money. On desk, Lucien sees it: "You want the chair, not the cheque." |
| `pred.clause.*` | Ch7 | **private**: the bank photographs its clients, and she declines the camera; **indemnity**: Helix covers the signature; **report**: nobody but Marcus knows she is in Geneva |
| `pred.lsf` (wire / boast), `pred.lever8.archive` | Ch8 | She already knows the fund's paper. With the archive schedule she can read the term sheet faster than the bank's own lawyer |
| `c8.p8-lyle` (Julian's printout) | Ch8 | Lyle's four L.S.F. meetings were in Geneva. Lucien confirms it with his eyebrows |
| `c5.published` | Ch5 | Lucien has seen her face before, in a newspaper, "and before that, on somebody else" |
| `case.name`, `case.strength` | Ch9 | What she already suspects about Celeste. Strength decides how much of the list she can read at a glance |
| `pred.julian` | Ch7–8 | An ally texts her one line while she is there. A rival is also in Geneva, at another bank |

---

## 3. Shape (phases)

`geneva → bank → morel → vault → lake → call → ledger`

| Phase | Place | Beat |
|---|---|---|
| **geneva** | January · the airport, and the rain | Marcus's brief, "sign what they put in front of you, and read it first", and the car the bank sends. A moment: the hotel window, the rain on the lake. |
| **bank** | 10:00 · Morel & Cie, the Rue de la Corraterie | No name on the door. The signing: the term sheet, the fund's paper, and a clause nobody expected her to read (it guarantees the fund first claim on Helix if a deal fails). She signs, amends it, or refuses the clause and signs the rest. |
| **morel** | 13:00 · the bank's dining room | Lucien Morel: late thirties, fourth generation, grey eyes, four languages, writes nothing down. The game between them. "You're the second one. She sat in that chair. She ordered the same thing." What she tells him (§4 sets up the take). |
| **vault** | the way she chose | The take (§4): the list. Eleanor Linden. The nine flats, one of them her own. |
| **lake** | night · the hotel, or his flat on the Quai | The account offer, in his hand, and the optional evening. |
| **call** | 02:00 · the hotel room | A number in Holland Village, and whether to ring it. |
| **ledger** | home · the wardrobe door | A card: ELEANOR LINDEN. NINE FLATS. C. And a message from Celeste: "Lucien tells me you're charming. He never tells me that." |

---

## 4. The take (with recommendations)

| Way | Needs | The scene | Cost |
|---|---|---|---|
| **ask** | That she told him the truth at lunch ("I'm the second one. Tell me about the first.") | He shows her himself, after hours, in the vault: the nine accounts, and Nell's last instruction in her own hand ("Close it. Send the rest to Nora."). "She asked me to help her disappear. I said no. I've been sorry for a year." | Lucien is exposed to Celeste, and becomes an ally (`pred.ally.morel`) |
| **trade** | Always offered once she is a counterparty | Helix's next deal comes to Morel & Cie instead of the fund's usual house, and in exchange the list crosses the table in a plain envelope. Two professionals. | Marcus's pipeline: he will notice in Ch14 (a line in his last scene). Lucien keeps his distance |
| **night** | **Always available** (autonomy law) | Five in the morning, the cleaners' lift, a borrowed tabard, and the records room: she photographs the list herself. Marcus's mother cleaned offices like this one (a callback, if Ch14 is played after). | She gets the list but not Nell's last instruction. The bank's camera has her, and Celeste will know by Friday |

**The list:** nine accounts at Morel & Cie, each paying the running costs of a kept legend site: Emerald Hill
(Singapore), Lisbon, Vienna, Montreal, two in Paris, Cape Town, Buenos Aires, **and her own flat in London**. Every
standing order is signed with a looping C. Eleanor Linden's personal account was closed eight days after the harbour,
and its balance went to Nora Linden, Holland Village.

**The account** (`pred.account`), in the lake phase, before the evening:
- **account-take:** a numbered account, seeded with a sum the fund calls "working capital". Her want is paid early
  on money. Celeste has a hook in her, and it seeds the board-seat ending.
- **account-decline:** "I'll open my own, thank you." Lucien likes her more for it.
- **account-take-and-move:** take it, and move it out by morning to a bank the fund does not own. Only with the
  **indemnity** clause or the archive schedule. The most fun, and noticed.

**The evening:** Lucien, or nobody. It is chosen, mutual and heat 3: the scope choice, then stop or stay, and it
fades. It is **not tied to the take**. On the ask road he is hers, and does not report the evening. Otherwise he
does, and the ledger message proves it.

**The call:** Nora Linden, at 9 a.m. her time.
- **call-truth:** "I'm wearing your sister's name. I'd like to know who she was." Nora is silent for a long time,
  then gives her one thing: "She had a bad leg. She'd never have walked the harbour wall. Remember that."
- **call-bank:** she says she is from the bank, about the transfer. Nora hangs up on her.
- **call-none:** she does not ring (neutral).

---

## 5. Decisions for the owner (recommendation first)

1. **The chapter is "The Counterparty", Geneva in January.** Marcus sends her to sign the fund's financing as
   Helix's representative: a client, not the product. *Recommended.*
2. **Lucien Morel knew Nell** ("You're the second one"). The trail runs from the money: nine accounts, nine flats
   (one of them hers), one signature C., and Nell's closed account paying out to Nora. *Recommended.* It reveals
   the legend business from the buying side without proving the harbour (Act IV keeps that).
3. **The take:**
   - **ask:** he becomes an ally, exposed to Celeste;
   - **trade:** Helix's next deal; Marcus notices in Ch14;
   - **night:** the cleaners at five; always available; the camera has her.

   *Recommended.*
4. **The account:** take it, decline it, or take it and move it (with the indemnity or the schedule). *Recommended.*
   It is the route's first real temptation toward the seat.
5. **The evening with Lucien:** chosen, mutual, heat 3, consent-gated, fades, and never the price of the list.
   He reports it to Celeste unless she asked him the truth. *Recommended.*
6. **Nora by phone at the end of Ch12, not Ch14.** The route design put her call in Ch14, but the built Ch14 does
   not have it, and the call belongs with the list. *Recommended.* It also plants the bad leg for Act IV
   (Ch17 canon).
7. **Temporary entry:** Ch12 is entered from a Predator `chapter9.complete` ("Follow the money") until the Ch10–11
   Predator variants exist. **Chapter 13's temporary entry moves from `chapter9.complete` to `chapter12.ledger`**,
   and its bridge ("The winter") stays as written. *Recommended.*
8. **Build shape:**
   - three goldens (ask, trade, night) with neutral picks, and a real-save authentication test;
   - a small Ch14 follow-up: the Geneva list counts as proof in the board and press ways (a paragraph each), and
     the trade road gets Marcus's line about his pipeline.

   *Recommended.*

---

## 6. Art impact

The route design already lists these masters:
- Morel & Cie (a panelled private bank, no name on the door);
- the hotel room over the lake in the rain;
- Lucien's flat on the Quai.

New cast: Lucien Morel. They are added to ALL_CHAPTERS_ART_LIST.md when this design is approved. Dark noir (mean
luminance 45–70, ≥40% near-black): Geneva at night, lamp-lit.
