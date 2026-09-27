# Predator · Chapter 15: "The Key" (design)

**Act III close · Predator route (lane id `predator`) · the shared archive-heist spine, with Predator framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §4, "15 · The Leash": the same heist, entered from the client
  side, **with a key she was given**.
- [CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md), the Celebrity spine, for the
  shared canon:
  - the Vesper archive, "I keep everything, darling", grey steel drawers numbered by catalogue page, one lamp;
  - Maya's file in the drawer "for the people round the people";
  - Nell's file (the Jakarta order, signed C.: proof of the burn, not the death);
  - the 1109 recordings;
  - the dead man's switch, and one chosen cost (ally / visibility / money / relationship);
  - the last message and Celeste's reply, "I shall be there as myself".
- The built Predator chapters:
  - **Ch14** ends on Celeste's invitation to Meridian's board ("Helix's new counterparty", the first Thursday), and
    on "do bring my letters" if she took them from Marcus's safe;
  - **Ch13 comply** left a receipt naming her as the Claremont's operator, and an envelope FOR THE DAY IT CAN BE
    USED;
  - **Ch12** gave her the account and the nine flats;
  - **Ch11** gave her the TRANSFERRED page;
  - **Ch10** gave her the black phone and the offer she answered.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). No sexual coercion (the reserved beat was Ch13). The evening is
  chosen, heat 3, consent-gated, and fades.

**Status: APPROVED (owner, 2026-09-27: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_15_SCRIPT.md](scripts/PREDATOR_CHAPTER_15_SCRIPT.md); code: `src/content/chapter15-predator.ts`.
It runs ~1.1–1.2k words on a quiet path, and more on the ally roads.

---

## 1. The chapter's job

On the Celebrity road Evelynn **breaks into** the archive where Celeste keeps her leverage. On the Predator road she
is **handed the key.** She is Helix's new counterparty, she has taken Marcus, and Celeste is so sure of her that she
gives her the run of the archive a week before the board: "Every representative who sits at my table reads their
own file first. Take what's yours. Only what's yours."

The heist is what she takes **beyond** what's hers, with a key that was a courtesy, under the nose of the woman who
gave it.

By the end of the chapter the player must:

1. **Be given the key.** Celeste gives it at the Vesper, warmly or warily according to how Marcus fell. If Evelynn
   took the letters from Marcus's safe: "My letters, darling. You may put them back in the drawer yourself. That's
   what the key is for."
2. **Choose a crew** from what the Predator road built, one or two: Iris, Lucien, Marsh, Marcus in exile, Pryce,
   Julian, or Halvorsen, who owes her. Or nobody.
3. **Use the key** at the hour she was given, at two in the morning, or not at all, through a copy.
4. **Take what's hers,** which Celeste is sure of enough to allow:
   - her own file, with Adrian Vale in it (the clinic, the fitting, the transfer);
   - Maya's file from the drawer for the people round the people.

   Then **one thing more**, which she is not allowed.
5. **Break the leash** in the week after: the black phone, the reports (if she said yes in Ch10), the account (if she
   kept the card), and the dead man's switch. Then **one chosen cost** that Act IV remembers.
6. **Send the last message.** On this road Celeste never gave orders, so it is **"No more help."** Her reply is the
   shared line: "Then Thursday. Come as whoever you like, darling. I should warn you that I shall be there as
   myself."

**What it must not do:**
- confront Celeste with the whole case (Ch17), topple Meridian (canon: wound, don't topple), or resolve Nell's death
  (Act IV);
- make the key a trap that removes her agency. Celeste is confident, not omniscient, and the one thing more can be
  taken clean.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a heist with a key. The terror is not being caught breaking in; it is being caught taking one file
  too many from a room you were invited into.
- **Erotic:** the optional evening after, the first night with nothing held over her, with a man she chose.
- **Fun:** Celeste's confidence, used against her. The best-dressed burglary in the game.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.way` (board / press / letter), `pred.marcus` (refused / ally / laughed) | Ch14 | How the key is given: warmly (board), with a chaperone (press: Celeste's trust fell), or as a courtesy to Helix's new representative (letter: Celeste doesn't know it was her, unless Marcus told her she laughed) |
| `pred.safe` (letters) | Ch14 | "My letters, darling. You may put them back yourself." She can, or not |
| `pred.ally.marcus`, `pred.ally.morel`, `pred.ally.marsh`, `pred.ally.iris`, `pred.halvorsen = owes-her`, `c8.p-night = pryce`, `pred.julian` | Ch8–14 | The crew |
| `pred.mirror` (complied) | Ch13 | The receipt with her name as operator is in the 1109 drawer. Taking the recordings takes it too |
| `pred.celeste10` (accepted / fed) | Ch10 | Her reports on Marcus are in her own file; true ones (accepted) or lies (fed) |
| `pred.account` (taken / moved) | Ch12 | The account's papers are in a drawer; with them she can close it clean |
| `pred.nora`, `pred.watch`, `pred.nell`, `pred.book = first` | Ch11–12 | Nell's drawer means more; Nora can hold the switch |
| `pred.transfer`, `pred.phoneN` | Ch10–11 | Her own file: the TRANSFERRED order; the black phone's previous owner |

---

## 3. Shape (phases)

`gift → people → hour → drawers → week → line → ledger`

| Phase | Place | Beat |
|---|---|---|
| **gift** | the Vesper reading room, the week before the board | Celeste and the key: a small brass key on a green ribbon. "Every representative who sits at my table reads their own file first. Take what's yours. Only what's yours." Framed by Ch14 (warm / wary / courteous), and the letters if she has them. |
| **people** | the flat, two nights later | The crew (one or two), each a short scene. Or alone. |
| **hour** | by the way in | **way-hour:** Tuesday at ten, the hour on the ribbon's tag, with Celeste's archivist, Mrs Fenn, at a desk by the door, knitting. **way-night:** two in the morning, the key where it was never meant to be used, with Pryce's car or Iris's stair. **way-copy:** Lucien or Marcus has the key copied overnight, and the original goes back to Celeste untouched. Then **the snag**, one thing that goes wrong: **talk** / **hide** / **bold**. |
| **drawers** | the archive | Her drawer: the TRANSFERRED order, the clinic, the fitting, Adrian Vale, and her reports if she sent any. Maya's drawer. Then **the one thing more** (§4). |
| **week** | the week after | The leash, broken one hold at a time (the phone, the reports, the account, the switch), and **the cost** (§4). |
| **line** | Wednesday night, the eve of the board | "No more help." Celeste's reply. What she does with the black phone: **return** / **river** / **keep**. The optional evening. |
| **ledger** | late · the wardrobe door | Every card on Celeste's side moved to hers, except one at the top: THE BOARD MEETS. |

---

## 4. The one thing more, and the cost (with recommendations)

**The one thing more** (`pred.took15`), one only, because the key is a courtesy and courtesies are counted:
- **took-nell:** Nell's drawer: the Jakarta order, signed C. (the shared `act3.nell-order`). With `pred.watch` or
  `pred.book = first`, it is the woman she already knows.
- **took-1109:** the Claremont drawer: every placement filmed (the shared `act3.cards`). On the comply road her own
  operator's receipt comes with it.
- **took-clients:** Celeste's client ledger, the buying side: who bought whom, Marcus's three transfers, Halvorsen,
  and the man from the Gulf fund. **Predator's own.** Proof of the market, which the board cannot claim not to know.
- **took-account** (only if she kept the card in Ch12): the fund's papers on her own account. She closes it clean,
  and the hook is gone.

**The cost** (`act3.cost`, shared, with Predator detail):
- **ally:** spend one. Lucien's bank is named; Marsh goes public early; Iris's cover is burned; or Halvorsen's debt
  is called in and he never speaks to her again.
- **visibility:** go on the record as "the woman who took Helix", and say the word Meridian.
- **money:** give back what she wanted. The bonus pool, the transfer fee and the account all go to Nadia Brandt's
  fees and to Nora.
- **relationship:** the one that hurts. Julian's Helix deal dies with it, or Marcus in exile is named, or Maya has
  to leave London.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Key".** Celeste **gives** her a key to the archive a week before the board: "Take what's yours. Only
   what's yours." It keeps the shared heist and inverts it. *Recommended.*
2. **What's hers is hers to take:** her own file, with Adrian Vale's clinic records and the transfer order in it, so
   `act3.adrian = hers` on this road (Celeste is that sure of her); and Maya's file (shared canon). *Recommended.*
3. **The way in:**
   - the hour she was given, under the archivist's eyes;
   - two in the morning, with Pryce or Iris;
   - a copy (Lucien or Marcus), so the original goes back untouched.

   One snag each. *Recommended.*
4. **The one thing more:** Nell's order, the 1109 recordings (with her own receipt on the comply road), Celeste's
   client ledger, or her account's papers. *Recommended.*
5. **The crew comes from what Predator built,** one or two: Iris, Lucien, Marsh, Marcus in exile, Pryce, Julian, or
   Halvorsen who owes her. Or nobody. *Recommended.*
6. **The week after breaks the leash** (the phone, the reports, the account, the switch holders), with one chosen
   cost in Predator detail. *Recommended.*
7. **"No more help."** The last message fits this road. Celeste's reply is the shared line, so the shared Ch16 can
   follow. *Recommended.*
8. **Entry and build shape:**
   - entered from the Predator `chapter14.ledger`; the Predator road stops at `chapter15.ledger` until the Ch16
     variant exists;
   - writes the shared Act IV keys (`act3.leash`, `act3.adrian`, `act3.nell-order`, `act3.cards`, `act3.switch`,
     `act3.cost`, `act3.black-phone`, `c15.maya-file`, `act3.page`) so that Ch16–18 can be shared spines with
     Predator framing;
   - three goldens (hour, night, copy) with neutral picks, and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

Reuses the Vesper (the reading room, the archive, the service stair), the flat, and the bridge. New:
- the brass key on a green ribbon (an insert);
- Mrs Fenn knitting at the archive desk (cast, minor);
- the client ledger (an insert).

Dark noir, one lamp. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
