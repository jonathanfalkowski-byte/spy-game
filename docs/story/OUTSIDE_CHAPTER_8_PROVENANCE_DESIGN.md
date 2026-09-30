# Outside · Chapter 8: "Provenance" (design)

**Act II · Outside route (lane id `outside`) · NEW**
**Budget: 0.7h / ~7k words across the chapter, ~4–4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md), approved 2026-09-30:
  - §4 "8 · Provenance": three weeks off the books, played as a hub of **leads**, each a page she can **verify**
    (slow, costly, certain), **use raw** (fast, risky) or **sell on** (money, and a trail); one lead is a Meridian
    plant, testing whether the new Evelyn checks; Sloane's own file surfaces (target or trade begins); at the end,
    02:40 at the old terminal, **the sender in person for the first time**;
  - §0: the sender is "R." on the ledger leaf, Nell's courier; he stays a voice with, now, a face, and no name until
    Ch12/Ch14;
  - §2 rules: his price is always information; the skeptic is never punished; cutting the source is always open;
    Sloane is a target or a trade, never a romance; he never makes her Nell.
- [OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md](OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md) (built, pass 1).
- [INSTITUTIONAL_CHAPTER_8_SCOPE_DESIGN.md](INSTITUTIONAL_CHAPTER_8_SCOPE_DESIGN.md), the pattern for a unique Ch8: a
  three-week hub with three of five scenes, each with three answers, gated by the terms written in Ch7.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §4: on this lane Sloane is a target or a trade.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): heat 3, consent in character, fades; partners mostly men.

**Canon it stands on:**
- The Ch7 rules of trade she wrote (`out.rules`: verify, provenance, the source, no people, the door), and his one
  matching rule.
- The first page (`out.page1`: oracle / board / thin) and the first price (`out.price1`: fact / answer / debt /
  refuse), `out.gave-fact`, `out.alliance.rook = owed`, `out.refused-price`.
- The room over the water, the 02:40 phone, the sender as a disguised voice that pauses before her name.
- `c6.rook-proof` (supported / broken / untested), `c6.oracle-seen`, `c3.misdirect-rook` (he remembers the lie).

**Status: APPROVED (owner, 2026-09-30: "approved", all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_8_SCRIPT.md](scripts/OUTSIDE_CHAPTER_8_SCRIPT.md); code: `src/content/chapter8-outside.ts`.
Entered from an Outside `chapter7.complete`; hands on to the shared Chapter 9 bridge ("Follow the vendor"). ~1.63–1.73k
words on one path.

---

## 1. The chapter's job

Chapter 7 put her in a room with one phone and a set of rules. Chapter 8 is **three weeks of being a free agent**:
the sender sends pages, and each page asks the only question that matters off the books — **can you prove it?** It is
the outside mirror of Institutional Ch8's taskings. There, a machine hands her work and each tasking asks how much
she reports. Here, a source hands her truth and each lead asks how much she can stand behind. The chapter ends with
the voice made flesh: at two-forty in the morning, at the dead terminal, the sender comes in person for the first
time, and she finally sees the man who has been paying her rent.

By the end of the chapter the player must:

1. **Learn the rhythm:** three weeks in the room over the water, the phone at 02:40, the wall filling with pages and
   the red thread she runs between the ones that agree. And her own discipline: a ledger of what she has actually
   verified, which is shorter than the wall.
2. **Work three of five leads** (§4), each a page from the sender, each with three answers: **verify** / **use raw**
   / **sell on**. The rules she wrote in Ch7 change at least one answer each.
3. **Catch, or be caught by, the plant** (§5): one lead is Meridian's, seeded to see whether the new Evelyn acts on
   a page she hasn't checked. Verified, she catches it, and it surfaces **MERIDIAN HOLDINGS** and the fact that
   somebody is testing her. Used raw, it bites: she acts on a lie, and Meridian learns she doesn't check.
4. **Decide what Sloane's file is for** (§5): the sender sends Victoria Sloane's Axiom file, unasked. **Bank it**
   (leverage, kept), **burn it to the sender** (a trade, and a debt), or **leave it** (the "no people" rule, honoured).
5. **Meet the sender** (§5): 02:40, the old ferry terminal, a man in a courier's jacket with a good watch on a worn
   strap, who says "Evelynn" and pauses before it, and proves he is the "R." on the ledger leaf. **How she meets
   him:** take his hand / stay in the dark / turn a light on him. He gives her MERIDIAN, the thread to Chapter 9, and
   not his name.
6. **Choose the evening:** a partner from before, Maya, or alone with the wall.
7. **Pin the second card:** VERIFIED / MOVED / SOLD, and **MERIDIAN · THE VENDOR**, the thread to Chapter 9.

**What it must not do:**
- make a lead sexual, or put her body on the trade. Every lead is paper, a place, or a meeting she controls;
- punish the skeptic: verifying is always possible, refusing a lead costs only the lead, and the plant is caught by
  anyone who checks;
- name the sender, or say Nell. He has a face now, and a proof he is "R.", and nothing more this chapter;
- reveal Celeste. Only Meridian's name, and the blacked-out shape of one board member she has already met.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** a wall of pages, a red thread, a plant in the pile, and a two-forty meeting with a man you have
  trusted for a year and never seen.
- **Erotic:** the charge of the voice finally in the room; a night she chooses with someone real, off every grid.
- **Fun:** being right. Catching the bait because you read the small print. Turning a torch on the man who thought
  he was the one in the dark.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `out.rules` (verify / provenance / source / people / door) | Ch7 | Each rule changes at least one lead's answers (§4) and the plant (§5) |
| `out.page1` (oracle / board / thin), `out.gave-fact`, `out.alliance.rook`, `out.refused-price` | Ch7 | Which leads are on the wall already; whether she owes him; how the sender opens |
| `c6.rook-proof`, `c6.oracle-seen` | Ch6 | How much she trusts him coming in; whether the ORACLE page is hers to build on |
| `c3.misdirect-rook` | Ch3 | He watches what she does with the plant more closely if she has lied before |
| `c6.maya`, the shared evening-partner check | Ch4–7 | The evening options |

---

## 3. Shape (phases)

`settle → leads → plant → terminal → after → complete`

The phase names avoid the shared Ch8 names (`cost / work / maintenance / fireescape / leverage / advance / emerald /
wake / close / call`), Predator's (`weeks / hub / friday / julian / evening`), Executive's (`orbit / favours / dinner /
tray / late`) and Institutional's (`rota / tasked / records / backseat / afterhours`).

| Phase | Place | Beat |
|---|---|---|
| **settle** | week one · the room over the water | The rhythm off the books: the wall, the red thread, the 02:40 calls, her verify-ledger. The first lead of the three arrives. |
| **leads** | weeks one to three | The hub: **three of five leads** (§4), each verify / use raw / sell on. |
| **plant** | Thursday of week three | One lead was Meridian's. Caught (verified) or biting (used raw). MERIDIAN HOLDINGS surfaces; somebody is testing the new Evelyn. |
| **terminal** | 02:40 · the old ferry terminal | The sender in person: a man in a courier's jacket, "Evelynn", the pause, the proof he is "R." **take his hand / stay in the dark / turn a light on him.** He gives her the vendor, and not his name. |
| **after** | that night · the room | The evening: a partner from before (heat 3, consent flow, at his place, fades), Maya, or alone with the wall. |
| **complete** | late · the wall over the table | The second card, and the thread to Chapter 9: MERIDIAN · THE VENDOR. |

---

## 4. The five leads (the hub; three of five, one a week)

Each is a scene of about 300 words, with three answers: **verify** (slow, certain; builds `out.verified`, the count
the "expose, provenance owned" ending reads), **use raw** (fast, risky; builds `out.raw`), **sell on** (money and a
trail; builds `out.sold`). Nothing is punished beyond the named costs.

| # | Lead | The page | Verify / use raw / sell on | Rule that changes it |
|---|---|---|---|---|
| 1 | **The manifest** | The container out of Singapore (Ch7's thin page, or a new one): a consignment to a warehouse. | **verify** (days of cross-checking; it is a legend-supply shipment — wardrobe, papers, a watch, for a reissued identity) / **use raw** (move on the warehouse tonight) / **sell** (a rival importer pays well for a competitor's manifest) | **provenance:** she makes him say where he got it before she takes it; a broker's name, which is itself a lead |
| 2 | **The board list** | The Project Eve board, one name blacked out but for its shape — a shape she knows (Celeste, unconfirmed). | **verify** (one name cross-checked against public filings; the shape holds) / **use raw** (act on the guess; it could be wrong, and he warns her) / **sell** (trade the list to a journalist, or to Sloane) | **verify:** with the rule, she will not name the shape even to herself until it is checked |
| 3 | **E.V. (I)** | A page about the prior instance, marked RETIRED · SINGAPORE. The first solid trace of the first Evelyn. | **verify** (the date matches the leaf; the woman was real, and is gone) / **use raw** (carry it as a weapon before you know what it weighs) / **sell** (refuse; some pages are not for selling) | **no people:** the sell option is closed, and the game says why: "This one has a person in it." |
| 4 | **Sloane's file** | Victoria Sloane's Axiom file, sent unasked. Target or trade (§5). | (handled in `plant`/§5: bank / burn / leave) | **no people:** the "leave it" answer is offered and honoured |
| 5 | **The courier route** | A page that, followed, leads back toward the sender himself: a courier's movements, a route, a terminal at 02:40. | **verify** (turn provenance on the source; it is how she earns the terminal meeting) / **use raw** (confront him on the phone now; he goes quiet) / **sell** (you have nobody to sell a ghost to; refuse) | **the source:** with the rule, she will not hand this page to anyone; it is the one she keeps |

**Selling** builds `out.trail`: money now, and a record somewhere that Evelynn Vale traded a page. It is never
punished in Ch8, but the trail is a thread others can pull later.

---

## 5. The choices beyond the hub (with recommendations)

**The plant** (`out.plant`), the chapter's spine:
- **caught** (she verified the lead it hid in, or wrote the verify rule): she finds the seam — a date that cannot be
  right, a letterhead a year too new — and traces it back to a cut-out company that is Meridian's. She now knows two
  things: **MERIDIAN HOLDINGS is the vendor**, and somebody inside it is testing whether the new Evelyn checks her
  sources. The sender, when she tells him, is quiet, and then: "Good. The last one stopped checking. That's a
  sentence, not a coincidence." (The second unnamed crack of Nell.)
- **bit** (she used the lead raw): she acted on a false page — moved on an empty warehouse, or named a wrong name —
  and Meridian now has its answer: the new one doesn't check. It costs her a week and a cold feeling, never her
  safety. The sender does not scold. He sends the true version, free, and says nothing, which is worse.

**Sloane's file** (`out.file`):
- **bank it:** she keeps it, unspent. Leverage over Sloane, held. (ENDGAME: target or trade begins.)
- **burn it to the sender:** she trades it to him for something she wants, and owes, or is owed, one. He will use it.
- **leave it:** with the **no people** rule, or by choice, she sends it back unread. "I trade facts. Not a woman's
  file." The sender: "Noted. You'll keep more of yourself that way than I did."

**The terminal** (`out.met`), 02:40, the sender in person:
- He is a man of about forty, a courier's jacket, a good watch on a worn strap, a face that has not slept properly in
  a year. He says "Evelynn", and pauses before it. He proves he is "R." on the leaf: he names the 02:40 handoff from
  the inside, a detail no one who only held the page could know.
- **take his hand:** she crosses the distance. He lets her. It is not romance — not yet, and not here — it is two
  people who have been alone with the same dead woman's paper for a year. Trust grows (`out.trust`).
- **stay in the dark:** she keeps to her side of the barrier, and keeps him a source. He respects it. "Good. Don't
  trust the face. Faces are the easiest thing to fake. I should know."
- **turn a light on him:** she turns her torch on him and asks the question her rules earned her — who are you, and
  what do you want. He does not give his name. He gives her the vendor — MERIDIAN — and one true thing: "I want what
  you want. To know what became of her. You just don't know yet that that's what you want." (The third crack, still
  unnamed.)

**The evening** (`c8.o-evening`): a partner from before (heat 3, consent flow, at his place, fades), Maya (who worries
about the terminal meeting), or alone with the wall.

---

## 6. Decisions for the owner (recommendation first)

1. **Title "Provenance":** three weeks of leads, the outside mirror of Institutional's taskings; the question is
   always "can you prove it?" *Recommended.*
2. **Five leads, three of five** (the manifest, the board list, E.V. (I), Sloane's file, the courier route), each
   verify / use raw / sell on, each touched by a rule. *Recommended.*
3. **The plant:** one lead is Meridian's, caught by anyone who checks, biting anyone who doesn't; it surfaces MERIDIAN
   and, softly, the second crack of Nell. The skeptic is rewarded, never the reverse. *Recommended.*
4. **Sloane's file** arrives unasked: bank / burn to the sender / leave (no people). Target or trade begins.
   *Recommended.*
5. **The sender in person at the terminal,** a face and a proof he is "R.", no name: take his hand / stay in the dark
   / turn a light on him. *Recommended.*
6. **Nell stays unnamed,** in three soft cracks (the last one stopped checking; "a woman's file"; "what became of
   her"). *Recommended.* Alternative: hold all three for Ch12.
7. **The evening:** a partner from before, Maya, or alone. *Recommended.*
8. **Build shape:**
   - entered from an Outside `chapter7.complete`;
   - hands on to the shared Ch9 bridge (a new outside entry, "Follow the vendor: Meridian Holdings.", gating the
     `predatorFloor` check in `chapter9.ts` to include `outside`);
   - keys under `out.*` and `c8.o-*`; choice ids `o8-`;
   - goldens (verify + caught + bank; use-raw + bit + burn; the source-rule path + leave + turn a light on him), with
     neutral picks and a real-save authentication test.

   *Recommended.*

---

## 7. Art impact

New:
- the room over the water by day, the wall of pages and the red thread (a new master, her base for the road);
- the old ferry terminal at 02:40, the sender seen for the first time (a re-use of the Celebrity Ch7 set with a
  figure in it, courier's jacket, face half-lit);
- inserts: the manifest, the blacked-out board list, the E.V. (I) · RETIRED page.

Katong and the sender's full cast sheet wait for Ch12. Dark noir. These go on the consolidated art list after the
deepening passes, per the standing rule.
