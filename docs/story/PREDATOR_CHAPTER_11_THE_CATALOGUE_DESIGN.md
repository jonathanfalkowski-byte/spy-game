# Predator · Chapter 11: "The Catalogue" (design)

**Act III · Predator route (lane id `predator`) · the shared Vesper set, with Predator framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §4, Ch11 on the shared Vesper set. She walks the viewing
  as a *buyer's* guest, on Marcus's arm, and sees the catalogue from the client side. The second order is to burn
  Iris, as a favour to a client.
- [CHAPTER_11_THE_ASSET_DESIGN.md](CHAPTER_11_THE_ASSET_DESIGN.md), the Celebrity spine, for the shared canon:
  - the Vesper on the first Thursday, empty frames, and the guests as the exhibition;
  - Celeste's clients: Halvorsen, the minister's wife, the quiet man from the Gulf fund;
  - Iris Moreau, a working legend four years inside Halvorsen's firm, and "ending";
  - the catalogue, where every page is a person;
  - the memo in Iris's bag.
- The built Predator chapters. Continuity it must honour:
  - **Ch13:** Celeste says "I thought the new one might like to learn how it is done", and Evelynn thinks "She
    said that about Iris, the night she ended her". So this chapter is where Celeste first says it.
  - **Ch13 counters:** Celeste says "Twice now, darling", so a first time must be possible here.
  - **Ch12** opens "the Friday before the New Year", so this chapter falls on the first Thursday of December.
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md) §3. The named threat is non-sexual. Nothing sexual is on screen that
  is not chosen. She never coerces anyone sexually.

**Status: APPROVED (owner, 2026-09-27: all eight decisions as recommended) and BUILT, pass 1.** Script:
[scripts/PREDATOR_CHAPTER_11_SCRIPT.md](scripts/PREDATOR_CHAPTER_11_SCRIPT.md); code: `src/content/chapter11-predator.ts`.
It runs ~1.4–1.7k words on one path. Chapter 12 now enters from `chapter11.ledger`.

---

## 1. The chapter's job

On the Celebrity road the Vesper is where Evelynn learns she is **for sale**. On the Predator road she walks in
**as a buyer's guest**, on Marcus Chen's arm, and learns something worse: **she has already been sold.**

By the end of the chapter the player must:

1. **Walk the viewing from the client side.** She stands among Celeste's clients as one of them. They talk to her
   frankly, as buyers talk to buyers ("Which one are you here for?").
2. **Read the catalogue on the lectern** in the client room, where clients browse. She finds her own page:
   E. V. · REISSUED · TRANSFERRED: AXIOM → HELIX · AT CLIENT REQUEST (M. CHEN). The job she thinks she took in
   Chapter 7 was brokered. Marcus asked for her, by name, after the Glass House.
3. **Meet Iris Moreau.** Iris is wary of a client's woman, until Evelynn tells her what she is.
4. **Answer the second order,** Celeste's favour to a client. Halvorsen would like his chief of staff "ended"
   tonight: the memo in Iris's bag. Celeste hands it over with the line Chapter 13 remembers: **"I thought the new
   one might like to learn how it is done."** Comply, refuse, or counter, each with a real cost.
5. **Decide what to do with Marcus,** now that she knows: that night, in his car, or later.
6. **Carry it home.** Cards go up for IRIS and for TRANSFERRED, and the stairs get one step taller.

**What it must not do:**
- make her a victim again. The transfer is a revelation she gets to **use**, and the chapter is about what she
  does with it;
- confront Celeste with the case (Act IV), or make Celeste afraid (that is Ch13–14 on this road);
- let the dance or the evening be anything but chosen.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** reading a catalogue of people over a client's shoulder, finding your own page, and the envelope on
  the terrace.
- **Erotic:** Marcus in black tie, proud of her, and a dance in a room built for looking, where for once she is
  the one choosing whom to look at. The evening is optional.
- **Fun:** being very good at the client side, better than the clients, and taking something of Celeste's out of
  her own house.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `pred.want` | Ch7 | What the page does to her: money ("I was a line item"), title ("my name, on somebody else's page"), desk ("he bought the woman who wants his chair") |
| `pred.clause.*` | Ch7 | **private**: the Vesper's photographer is refused, in writing; **report**: nobody at Helix knows she is here but Marcus; **exit**: she could walk tonight, with ninety days' pay, and she knows it |
| `pred.julian`, `pred.julian8` | Ch7–8 | Julian is also a Helix guest. An ally sees her page over her shoulder. A rival watches her on Marcus's arm. A casualty keeps away |
| `pred.lever8.*`, `pred.hollis`, `pred.lsf` | Ch8 | What she has built: a counter needs something (below). The L.S.F. paper is on the Vesper's price list |
| `case.name`, `case.strength` | Ch9 | She already suspects Celeste. A strong case opens a counter on its own |
| `c8.p-night` (pryce) | Ch8 | Pryce drives them. He looks at her in the mirror on the way home, once |
| `c5.published` | Ch5 | The clients know her face, which makes her a better guest and a worse secret |
| Predator Ch10 (future) | Ch10 | Celeste's "Let me help" at breakfast. Read if present; the chapter plays without it |

---

## 3. Shape (phases)

`dress → longroom → book → powder → terrace → cloak → late → ledger`

| Phase | Place | Beat |
|---|---|---|
| **dress** | 19:30 · her flat, then Marcus's car | Getting ready is a scene. Marcus in black tie at her door, not his driver: "You'll be the best thing in the room. That's rather the point." A moment: the dress (his gift / her own / the black). |
| **longroom** | 20:00 · the Vesper, the long room | The empty frames; the clients; Celeste receiving them both: "Marcus, darling. And your acquisition." How she works the room: **dazzle** / **listen** / **dance** (with Marcus, chosen, her lead). |
| **book** | 21:00 · the client room | The catalogue on a lectern, turned for clients. Halvorsen's page, Iris's (I. M. · ENDING), and hers: TRANSFERRED … AT CLIENT REQUEST (M. CHEN). What she does with the page: **tear** / **photograph** / **leave it and remember**. |
| **powder** | 21:30 · the powder room, then the terrace | Iris in grey silk: "Which one are you here for?" What Evelynn tells her: **truth** ("I'm on page forty") / **client** (play the buyer) / **nothing**. |
| **terrace** | 22:15 · the terrace | Celeste, the gallery envelope, the memo, and "I thought the new one might like to learn how it is done." **comply** / **refuse** / **counter** (§4). |
| **cloak** | 22:40 · the cloakroom | A moment inside the answer: the bag's lining, the canal, or the kitchens. |
| **late** | 23:30 · Marcus's car, then night | Pryce drives. What she does with what she knows about Marcus: **ask him** ("I asked for you. By name. After the Glass House. I'd do it again.") / **keep it** (a card, not a question) / **use it** (tonight, in the car: "You bought me. So you'll understand when I send the bill."). Then the optional evening: Marcus, Julian (if an ally), or nobody. |
| **ledger** | late · the wardrobe door | Cards for IRIS (by outcome) and TRANSFERRED: AT CLIENT REQUEST. Celeste on the black phone. |

---

## 4. The second order (with recommendations)

Celeste, on the terrace, gives her a gallery envelope. Inside is a memo in a hand that will be read as Iris's: a
chief of staff selling her employer's positions to a rival. Halvorsen has been told Iris is "ending", and would like
it to be tonight.

> C.: A small favour for a client, darling. Put this in Iris's bag before she leaves. She has done beautifully for
> four years, and she is ending. I thought the new one might like to learn how it is done.

The threat is non-sexual and lands on **Helix and on Evelynn's standing**, not on Maya, because on this road Helix
is what she has built.

- **comply:** she slides the memo into the lining. Halvorsen's man takes Iris aside at the door, and Iris looks back
  once and knows. Outcome: RETIRED.
  - Halvorsen owes Helix a favour, which becomes a lever (`pred.halvorsen = owes-helix`).
  - Celeste is pleased (`pred.standing` rises early).
- **refuse:** the memo goes into the canal from the bridge. Celeste: "Pity."
  - Halvorsen moves his shipping contract away from Helix, and Marcus is told why.
  - Somebody else puts the memo in the bag. Iris is ended by another.
- **counter** (needs one of: Hollis owned; Varga spared; the archive used or held; the exit clause; or a strong
  case). This is the first time Celeste is surprised (`pred.celeste-count = 1`, which is what makes Chapter 13's
  "Twice now" true). Two counters:
  - **counter-warn:** she gives Iris the memo. Iris walks out of her own legend that night, through the kitchens:
    ended, but free. A card arrives later with no stamp and a number (`pred.ally.iris`).
  - **counter-turn:** she turns the favour on the client. What she holds on the fund's paper (the L.S.F. schedule,
    Hollis's letter) makes Halvorsen withdraw the request, "on reflection". Iris stays in place, and Halvorsen owes
    **her** (`pred.halvorsen = owes-her`). The most Predator answer.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "The Catalogue"**, not "The Asset": on this road she is not the asset on show; she reads the book. Set on
   the first Thursday of December, on Marcus's arm. *Recommended.*
2. **Her page reads TRANSFERRED: AXIOM → HELIX · AT CLIENT REQUEST (M. CHEN).** Her Helix job was brokered by
   Meridian, because Marcus asked for her by name after the Glass House. *Recommended.* It is a revelation she uses:
   it sharpens Chapter 14 ("She'll do this to you") and makes Marcus's fall personal. The softer alternative is a
   page reading "independent · of interest to clients".
3. **What she does with the page:** tear it out, photograph it, or leave it and remember. Then, with Marcus: ask
   him, keep it, or use it that night. *Recommended.*
4. **Iris is met as a client's woman,** wary until Evelynn tells her the truth ("I'm on page forty").
   *Recommended.*
5. **The second order is Celeste's favour to Halvorsen**, with the line Chapter 13 remembers:
   - comply: RETIRED; Halvorsen owes Helix;
   - refuse: Helix loses the shipping contract; Iris is ended by another;
   - counter: warn Iris (free, and an ally), or turn it on Halvorsen (Iris kept; he owes her). Either is the first
     time Celeste is surprised.

   *Recommended.*
6. **The dance and the evening:** a dance with Marcus in the long room (chosen, her lead), and an optional evening
   with Marcus, or Julian if he is an ally (heat 3, consent-gated, fades), or nobody. *Recommended.*
7. **Temporary entry:** Ch11 is entered from a Predator `chapter9.complete` ("The first Thursday") until the
   Predator Ch10 exists. **Chapter 12's temporary entry moves to `chapter11.ledger`**, and its bridge ("Follow the
   money") stays as written. *Recommended*, so the road runs 9 → 11 → 12 → 13 → 14.
8. **Build shape:**
   - three goldens (comply, refuse, counter-turn) with neutral picks, and a real-save authentication test;
   - follow-ups: Chapter 13's "Twice now" becomes conditional on this chapter's counter (otherwise "Once now,
     darling. I have started keeping count"); Chapter 14's last scene gains one line from Marcus if she knows about
     the transfer ("I bought you. I'd do it again. You were worth every penny, and you've cost me all of them").

   *Recommended.*

---

## 6. Art impact

Reuses the Vesper set (the long room, the terrace, the cloakroom) and Marcus's car. New:
- the client room with the catalogue on its lectern;
- her page, TRANSFERRED (an insert);
- Marcus in black tie (a cast outfit).

Dark noir, lamp-lit. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
