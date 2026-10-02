# Outside · Chapter 7: "The Sender" (design)

**Act II · Outside route (lane id `outside`) · NEW**
**Budget: 0.8h / ~8k words across the chapter, ~4.5k on one path.** This is the Chapter 7 budget on every road.

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md), approved 2026-09-30:
  - §0: **the sender is "R." on the Ch6 ledger leaf: Rafe Lim, 41, Nell's Meridian courier and the man she was
    leaving with, who never learned how she died and chose Evelynn to find out;**
  - §2: Rafe never makes her Nell; chosen intimacy opens only after he tells her who Nell was to him; his price is
    always information; the skeptic is never punished; cutting the source is always open;
  - §4 "7 · The Sender".
- [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md), the Outside row: actionable truth others cannot get, at the cost of
  dependence on a source who chooses which truths arrive, and provenance risk. The exits are to verify independently,
  or cut the source.
- [CHAPTER_6_PROOF_AND_COUNTERPOWER.md](CHAPTER_6_PROOF_AND_COUNTERPOWER.md) and the built `chapter6-proof.ts`: the
  Meridian ledger leaf, the 02:40 handoff, "R.", "missed the Katong breakfast for this. C. will sulk.", the ORACLE
  assessment, and the thought the chapter ends on: "I have proof they were there, and no proof of what they want."
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §4: on this lane Sloane is a target or a trade.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md): Mature 17+, heat 3, consent in character, fades; partners mostly men.

**Status: APPROVED (owner, 2026-09-30: "approved", all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_7_SCRIPT.md](scripts/OUTSIDE_CHAPTER_7_SCRIPT.md); code: `src/content/chapter7-outside.ts`.
Entered from the Chapter 7 confirm beat when the road is `outside`; the road continues to the shared Chapter 9 bridge
placeholder until Outside Chapter 8 exists. ~1.76–1.84k words on one path.

---

## 1. The chapter's job

Chapter 6 ended with Evelynn putting the sender's proof into play, or exposing the ORACLE fact: the first move,
as the chapter says, "that no institution authored". Chapter 7 **makes that permanent.** She leaves Axiom's watched
flat, cuts the last thread to Sloane, and takes a room the sender has paid for, by the old ferry terminal where the
leaf's 02:40 handoff happened a year before her assignment. It opens the route's question: **what is a truth worth,
when you can't see who is holding it?**

By the end of the chapter the player must:

1. **Leave the watched flat.** Hand back the phone, the key and the badge, on her own terms. The green light in the
   hall goes off when Axiom stops paying for it, and for the first time in a year nobody is looking.
2. **Take the room above the shut-down shop** by the ferry terminal, paid three months in advance, in cash, by a
   sender she has never seen. **How she reads the gift:** a kindness, a hook, or a room, and nothing more.
3. **Answer the 02:40 phone** — a cheap handset in the drawer, one contact, no name — and hear the disguised voice
   that pauses before "Evelynn", the way you pause before a word in a language you learned late.
4. **Write her rules of trade** (three of five, in her own words, each paying off later on the road: §4), the way
   Ch4–6 taught her to write terms. The sender does not agree to them. He reads them back, and keeps one.
5. **Take the first page, and pay the first price.** A real lead (by what she did in Ch6), and a price that is always
   information: a fact she holds, a question answered, or a debt owed. **She can refuse the price and keep the room;**
   she loses only the page.
6. **Choose the evening** in a room nobody watches: a partner from before (heat 3, the consent flow, at his place),
   Maya (who tracked her down), or alone at the window, watching the river side.
7. **Pin the first card:** THE SENDER. Under it, in pencil: WHO IS HOLDING THE PAGE?

**What it must not do:**
- make the sender Nell, or let the player think he is: he is a voice, "someone who knew her before you did", and no
  more this chapter;
- put a face or a name on Rafe yet — that is Ch8's 02:40 meeting and Ch12's Singapore;
- punish the skeptic: she can refuse every price, verify every page, and the road holds;
- let the room, or the gift, read as safe. It is paid for by somebody with an agenda she cannot see.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** cutting every institutional line at once, and standing in a bare room with one phone and one voice
  and no badge to hide behind.
- **Erotic:** the intimacy of the voice on the phone that knows her face and her city and will not show its own; a
  chosen night with someone real, in a room that finally isn't listening.
- **Fun:** haggling with a ghost. Writing rules for a man who won't sign them, and watching which one he pockets.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `c6.resolve-action` (`resolve-trade-expose` / `resolve-trade-give`) | Ch6 | How she left it: the ORACLE fact loose in rooms she isn't in, or the proof handed to an actor who wanted it |
| `c6.rook-proof` (supported / broken / untested), `c6.verify-method` (comparison / prediction) | Ch6 | How much she trusts the page, and how she earned it: the investigator's compare, or the gambler's prediction |
| `c6.oracle-seen` | Ch6 | Whether she has read the ORACLE assessment, or only heard of it |
| `c3.misdirect-rook` | Ch3 | Whether she once lied to the sender. He remembers. The first price costs more |
| `photo-custody` (phone / none) | Ch6 | Whether a Meridian page is already on a device Axiom could still pull; the reason to cut the flat clean |
| `c5.published`, `c6.maya` | Ch5–6 | Whether Maya can find her; whether the sender already knows her public face |
| the shared evening-partner check (Ch4–6 warmed or intimate outcomes) | Ch4–6 | Whether a chosen night with someone from before is on offer |

---

## 3. Shape (phases)

`flit → room → rules → page → price → dusk → card`

The phase names avoid the shared Ch7 names (`confirm / standing / held / street / lift / wardrobe / grey / pursue /
close / effects / night / complete`), Predator's (`summons / office / terms / corridor / floor / evening`), Executive's
(`table / fortyone / contract / hallway / key / tonight`) and Institutional's (`gate / window / scope / crossing / desk
/ watched`).

| Phase | Place | Beat |
|---|---|---|
| **flit** | 08:00 · the watched flat, one last time | The bag by the door. The phone, the key, the badge on the counter. The green light in the hall, and the moment it goes off. **How she leaves it:** a note for Sloane, the camera taped a last time, or nothing at all. |
| **room** | 11:00 · above the shop, by the ferry terminal | A room paid three months up, in cash, by the sender. A bed, a table, a window over the water, a kettle that works. On the table, an envelope of cash for "expenses", and the cheap phone. **How she reads the gift:** kindness / hook / just a room. |
| **rules** | noon · the table | The 02:40 phone rings at noon, because he knows she's arrived. The voice, disguised, the pause before her name. **She writes her rules of trade** (three of five; §4). He reads them back, and keeps one for himself. |
| **page** | afternoon · the first lead | The first page, chosen by Ch6 (§4): the ORACLE assessment in full, a Meridian board name, or a thinner thing if she trusts him least. She may **verify it** (slow, certain), **use it raw** (fast, risky), or **set it aside**. |
| **price** | · what it costs | The price, always information: **a fact she holds** (it's his now), **a question answered** (about her, about the Glass House), or **a debt owed** (he'll call it). **refuse** keeps the room and loses the page. If `c3.misdirect-rook`, he names the lie first, and the price is one step steeper. |
| **dusk** | 19:00 · the room over the water | A room nobody watches. **evening-partner** (a chosen partner from Ch4–6, at his place; heat 3; consent flow; fades) / **evening-maya** (she found the room; "You're off every system I have. That's how I knew where to look.") / **evening-alone** (the window, the river side, the phone face down on the table). |
| **card** | late · the wall over the table | The first card of the road: THE SENDER. In pencil beneath it: WHO IS HOLDING THE PAGE? |

---

## 4. The rules, the page, the price (with recommendations)

**The rules of trade** (three of five; each pays off later; `out.rule.*`):
- **verify:** she acts on nothing she hasn't checked herself. Pays off in Ch8 (the plant) and the "expose, provenance
  owned" ending. His line back: *Then you'll be slow. Slow is how the last one stayed alive. For a while.*
- **provenance:** every page comes with where he got it, or she doesn't take it. Pays off in Ch11 and Ch14 (the false
  page he knew was false). His line: *You want the chain of custody. I want you not to ask. One of us will give.*
- **the source:** she never gives up who he is, to anyone, for anything. Pays off in Ch10 and Ch13 (Celeste's price
  for his name). His line: *You don't know who I am. That's the only reason you can promise that. Keep not knowing.*
- **no people:** she'll trade facts, never a person: not Maya, not Nora, not a name that gets someone hurt. Pays off in
  Ch13. His line: *Good. I traded a person once. I'm still paying.* (The first crack of Nell, unnamed.)
- **the door:** she can cut him off, any time, and keep everything he's already sent. Pays off in the "cut the source"
  ending. His line: *Yes. You can. She couldn't, at the end. I'd like you to be able to.*

He **keeps one rule for himself**, chosen to mirror hers: if she wrote *no people*, he writes *and I'll never ask you
to be her*; if she wrote *the door*, he writes *and I'll take mine too, one day*. This is the route's first fence, set
in Ch7 and honoured for eighteen.

**The first page** (`out.page1`), by Ch6:
- if `oracle-seen`: the full ORACLE assessment, both numbers, the directorate's sign-off;
- else if `rook-proof = supported`: the Meridian board name, "one you've already met" (Celeste, unconfirmed);
- else: a thinner page — a shipping manifest, real but hard to use — because she trusts him least, and he's testing
  what she does with a small true thing.

**The price** (`out.price1`): **fact** / **answer** / **debt**, or **refuse**. Refusing is never punished; it costs
the page, nothing else. The `c3.misdirect-rook` surcharge is a line, not a wall: *You lied to me once, about the date.
I sent the page anyway. The difference is I'll be watching what you do with this one.*

**The evening** is chosen and never gated behind him: a partner from before, Maya, or alone.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Sender",** and the job: off Axiom's books, into a room the sender paid for, living on the pages he
   chooses to send. *Recommended.*
2. **The sender stays a voice this chapter** — the pause before her name, "someone who knew her before you did" — with
   no face and no name until Ch8. *Recommended.*
3. **Her rules of trade** (three of five: verify, provenance, the source, no people, the door), each with his line
   back, each paying off later; he keeps one rule of his own. *Recommended.*
4. **The first page by Ch6** (ORACLE in full / a board name / a thin true page), and **the first price is always
   information** (fact / answer / debt), refusable at the cost of the page only. *Recommended.*
5. **The `c3.misdirect-rook` surcharge** is a line and a watchfulness, never a lock-out. The skeptic and the liar both
   reach a strong end. *Recommended.*
6. **The evening:** a chosen partner from before (heat 3, consent flow, at his place, fades), Maya, or alone at the
   window. *Recommended.*
7. **The room and the gift are never safe:** paid for by somebody with an agenda, and the game says so. *Recommended.*
8. **Build shape:**
   - entered from the Ch7 confirm when the road is `outside`, replacing the in-development stop;
   - the road continues to the shared Ch9 bridge placeholder until Outside Ch8 exists;
   - keys under `out.*`; choice ids `o7-`;
   - goldens (traded-expose + oracle-seen + verify; traded-give + supported + the source rule; a low-trust save +
     the thin page + refuse the price), with neutral picks and a real-save authentication test.

   *Recommended.*

---

## 5a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no flag the later chapters read changes):

| Moment | Where | Choices (`c7.o-…`) |
|---|---|---|
| **The hand** | before she decides what the gift is (`room`) | **o7-hand-compare** (every block hand she knows; the R in EXPENSES has a long straight leg and a small careful bowl) · **-keep** (the envelope pinned to the wall) · **-burn** |
| **The voice** | before she writes her rules (`rules`) | **o7-voice-record** (the call taken down in shorthand) · **-listen** (a ferry horn and a washing machine behind the voice) · **-pauses** (eleven half-beats before her name in six minutes; he never says the other name) |
| **The cheap phone** | before the evening (`dusk`) | **o7-phone-drawer / -sill / -pocket** (it rings at twenty to three whichever she picks) |

The hand's R and the washing machine are quiet plants for the reveal of Rafe (Ch8, Ch14) and the launderette (Ch13); nothing reads them as flags.
Because the moments are required steps, the two Outside goldens (`rev19-chapter7-golden.json` `outside-placeholder`, `rev19-chapter9-golden.json`
`outside-placeholder-all`) were recaptured with the same decisions plus the three neutral picks, and `rev20-golden-ledgers.json` was regenerated;
`rev19-golden-ledgers.json` (Ch1–5) is unchanged.

## 6. Art impact

Reuses the old ferry terminal and the embankment (Celebrity Ch7). New: the room above the shut-down shop (her base
for the road); the cheap phone on the table with its one contact; the envelope of cash. The sender's cast sheet and
Katong wait for Ch8 and Ch12. Dark noir. These go on the consolidated art list after the deepening passes, per the
standing rule.
