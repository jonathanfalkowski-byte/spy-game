# Executive · Chapter 7: "The Room" (design)

**Act II · Executive route (lane id `executive`) · NEW**
**Budget: 0.8h / ~8k words across the chapter, ~4.5k on one path.** This is the Chapter 7 budget on every road.

**Authority:**
- [EXECUTIVE_ROUTE_DESIGN.md](EXECUTIVE_ROUTE_DESIGN.md) (approved 2026-09-28; §4 "7 · The Room", and §2: Julian is
  never a trap; orders target his trust, never his body; the kept overlay is honest and never punished);
- [CAMPAIGN_ROUTE_MAP.md](CAMPAIGN_ROUTE_MAP.md) (the Executive exits: enforce the exact term, **self-fund the
  benefit**, or exit with rights intact);
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) (Mature 17+, heat 3, consent in character, fade at the act; partners
  are men).

**Status: APPROVED (owner, 2026-09-28: all seven decisions as recommended) and BUILT, pass 1.** Script:
[scripts/EXECUTIVE_CHAPTER_7_SCRIPT.md](scripts/EXECUTIVE_CHAPTER_7_SCRIPT.md); code: `src/content/chapter7-executive.ts`.
It is entered from the Chapter 7 confirm beat when the road is `executive`, and runs ~1.2–1.4k words on one path.

---

## 1. The chapter's job

Chapter 6 ended with the Julian workroom arrangement held on her terms. Chapter 7 turns **the room into a job**,
and the job into a question the whole route asks: when a good man opens every door for you, what do you owe him,
and what does it cost to owe nothing?

By the end of the chapter the player must:

1. **Be offered the job** by Julian: chief of staff to the Group COO. He does not ask what she wants. He asks
   **"What would make this safe for you?"**
2. **Write the terms**: three of five, in her own words, which pay off later on the road (§4).
3. **Meet Marcus in the corridor**, the rival: "Julian's new favourite. He always did pick well. He never did keep
   them."
4. **Hear Julian's one honest confession:** as COO he signs what Marcus puts in front of him, and does not always
   read it. This is the first, human seed of clause 14.3 (Ch14). Not a trap: he tells her himself.
5. **Be offered a key:** a Helix flat on the river, furnished and paid for. Accept it, decline it, or accept it and
   **pay the rent herself** (self-fund the benefit). This is the kept overlay's first honest seed.
6. **Choose the evening:** Julian (chosen, heat 3, consent-gated; the first night if Ch4–6 warmed it, otherwise dinner
   and a line she sets), Maya, or nobody.
7. **Pin the first card:** JULIAN MERCER, and under it, in pencil, a question: WHAT DO I OWE HIM?

**What it must not do:**
- make Julian's help a hidden price, or his care a manipulation (autonomy law);
- punish a refusal: she can refuse the flat, the evening and even the job's comforts, and keep the job;
- turn the kept question into a lecture. It is a pressure she feels, not a verdict the game passes.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** writing her own terms into a Helix contract, with Marcus two doors down and a key on the table.
- **Erotic:** a man who asks what would make it safe, and means it; an evening she can set the edges of.
- **Fun:** being wanted, on her own wording, by somebody who is good at his job and better at listening.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `c6.arrangement = julian-workroom`, `c6.expectation-response` (clarified / narrowed / negotiated / refused) | Ch6 | How the offer opens: Julian remembers exactly how she answered the soft ask ("You made me say it out loud. I'm grateful.") |
| `c6.friction-julian` (warmed / cooled) | Ch6 | Whether the evening can be the first night, or is dinner with the door left open |
| `c6.exit-prep` | Ch6 | With it deepened, she already knows what walking out would cost, and the exit term is cheaper to ask for |
| `c5.service = julian`, `c5.want-target = julian`, `c4.mutual-interest`, `c4.julian-kept`, `c4.audit-paid` | Ch4–5 | The history in the room: favours given, paid back, and the thing between them nobody has named |
| `c5.published` | Ch5 | Helix's communications people already know her face; one of her terms can keep it hers |
| `own.cash` | Ch5 | Whether she can afford to pay the flat's rent herself |
| `c6.maya` | Ch6 | Maya as the evening's other option |

---

## 3. Shape (phases)

`morning → office → terms → corridor → key → evening → complete`

| Phase | Place | Beat |
|---|---|---|
| **morning** | 07:30 · a restaurant nobody from Helix eats at | Julian's message, and breakfast. He says what he wants plainly, which is the thing about him. A moment: how she arrives (early / on time / late, on purpose). |
| **office** | 10:00 · the forty-first floor | The offer: chief of staff to the Group COO. "What would make this safe for you?" By Ch6: "You made me say it out loud" (clarified), "You said no, and I kept the room open" (refused), "You priced it" (negotiated), and so on. |
| **terms** | the contract | Three of five terms, in her own words (§4). Julian signs each without argument, and reads each twice. |
| **corridor** | the executive corridor | Marcus: "He always did pick well. He never did keep them." What she says back. Then Julian, walking her to the lift, the confession: "I sign what Marcus gives me. I don't always read it. I'm telling you because you'll find out, and I'd rather you heard it from me." |
| **key** | 17:00 · her new desk | An envelope from facilities: a key, and a card in Julian's hand. A Helix flat on the river. **accept** / **decline** / **pay the rent herself** (§4). |
| **evening** | night | Julian (his flat, the forty-first floor, the city laid out below), Maya, or nobody. The consent flow; it fades. |
| **complete** | late · the wardrobe door | The first card: JULIAN MERCER. In pencil beneath it: WHAT DO I OWE HIM? |

---

## 4. The terms and the key (with recommendations)

**The terms** (three of five; each pays off later):
- **the door:** she can walk, with notice and references, whenever she likes. It pays off in Ch14 and the exit
  ending.
- **the firewall:** the work and the personal never pay each other. No favour at work buys anything after six, and
  nothing after six buys anything at work. It pays off in the Ch8 favours hub; it is the kept overlay's
  counterweight.
- **her own name:** her salary, her address and her face are hers. Helix pays her; Helix does not house or style her
  unless she asks. It pays off with the key, and with the Ch11 catalogue.
- **the veto:** she is never introduced to a Helix client or financier without her say. It pays off in Ch10–11,
  when Celeste arrives through Helix.
- **the files:** she reads everything she is asked to act on, including what Julian signs. It pays off in Ch8 and
  Ch14 (clause 14.3).

**The key** (the kept overlay's first seed; `exec.flat`):
- **accept:** the flat on the river, furnished, paid, beautiful. The overlay leans kept; nothing is punished.
- **decline:** "I have a flat." Julian: "Of course you do. It was a stupid thing to do with a key." He means it.
- **pay the rent:** accept it and pay Helix the rent from her own salary. It needs the money and costs most of the
  first month's pay. **Self-funding the benefit** is the route map's own exit vocabulary. It keeps the view and
  owes nothing.

---

## 5. Decisions for the owner (recommendation first)

1. **The workroom becomes a job,** chief of staff to the Group COO, and Julian asks "What would make this safe for
   you?" instead of "What do you want?" (Marcus's question on Predator). *Recommended.*
2. **Three of five terms** (the door, the firewall, her own name, the veto, the files), each paying off later.
   *Recommended.*
3. **Marcus in the corridor as the rival:** "He always did pick well. He never did keep them." *Recommended.*
4. **Julian's confession:** he signs what Marcus gives him and doesn't always read it. He tells her himself, which
   seeds Ch14 honestly. *Recommended.* It keeps him a person in the machine, never a trap.
5. **The key:** accept, decline, or pay the rent herself. It is the kept overlay's first honest seed and is never
   punished. *Recommended.*
6. **The evening:** Julian (the first night if Ch6 warmed it; otherwise dinner and a line she sets; heat 3, the
   consent flow, fades), Maya, or nobody. *Recommended.*
7. **Build shape:**
   - entered from the Ch7 confirm when the road is `executive` (`nextFor` executive → `morning`);
   - the road continues to the shared Ch9 bridge placeholder until Executive Ch8 exists;
   - goldens: accept the flat; decline it; pay the rent. Neutral picks, and a real-save authentication test.

   *Recommended.*

---

## 6. Art impact

New:
- Julian's forty-first-floor office and flat (masters);
- the restaurant nobody from Helix eats at;
- the Helix flat on the river;
- Julian's cast sheet (the "executive" base in staging, on the review page).

Dark noir. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
