# Predator · Chapter 18: "Paid in Full" (design)

**Act IV close · Predator route (lane id `predator`) · the shared "Position" spine, with Predator framing**
**Budget: 0.5h / ~5k words across the chapter, ~3.5k on one path.**

**Authority:**
- [PREDATOR_ROUTE_DESIGN.md](PREDATOR_ROUTE_DESIGN.md) §5, Ch16–18, and decision 5: the positions are Predator's
  own:
  - **the seat accepted:** she becomes Celeste, eyes open; the darkest ending, and a real one;
  - **the seat refused**, and Meridian wounded from inside Helix;
  - **walking away with Helix**, Meridian kept at arm's length.
- [CHAPTER_18_THE_POSITION_DESIGN.md](CHAPTER_18_THE_POSITION_DESIGN.md), the Celebrity spine, for the shared canon:
  - the ending is a position, not a verdict, and no ending leaves her holding less than she came in with;
  - the morning after, by the board;
  - Celeste's last word: a postcard from Lisbon, an orchid, or nothing;
  - the switch, kept armed, handed on, or disarmed;
  - the people, and who she goes home to;
  - who she is now (Adrian / Evelyn / a new name, none punished);
  - a year later, and the last card.
- [ENDGAME_RECONVERGENCE.md](ENDGAME_RECONVERGENCE.md) §7–8: wound, don't topple. Meridian always stands.
- The built Predator chapters, above all **Ch17**: `act4.board = succeeded | resigned | diminished | closed`,
  `act4.offer`, `act4.marcus`, `act4.nell-said`, `act4.last`, `pred.key17`. Also **Ch8**, where the Predator ledger
  began on "a page headed OWES, in capitals, and four names on it with a question mark after each".
- [CONTENT_DIRECTION.md](CONTENT_DIRECTION.md). The last night is chosen, heat 3, and fades. No identity or
  consent choice is punished.

**Status: DESIGN for owner approval.** Nothing is built.

---

## 1. The chapter's job

The Predator road began with a page in the back of a notebook headed **OWES**, and question marks. It ends with
**every line on that page answered**, including the ones about herself.

By the end of the chapter the player must:

1. **See what the board bought:** the morning after, by `act4.board`.
2. **Hold her position:**
   - **the seat**, if she took it: what she does with the shop now that it is hers;
   - otherwise **the wound**, **Helix** or **Nell**, scaled by the terms.
3. **Decide the switch:** kept armed, handed on, or disarmed. On the seat road it is aimed at **herself**.
4. **Settle OWES:** the people she owed and who owed her (Marcus, Lucien, Iris, Halvorsen, Pryce, Julian, Nora,
   Marsh, Ana, Hollis, Varga), with Chapter 15's cost coming back, and who she goes home to.
5. **Answer who she is now:** Adrian, Evelyn, or a new name.
6. **Close on a year later:** a chosen last night, or a quiet one, and the last card.

**What it must not do:**
- topple Meridian;
- punish the seat, or any consent or identity choice;
- contradict the one truth (ENDGAME §8).

Celeste and Marcus end as people in the machine.

**Why it is thrilling, erotic and fun:**
- **Thrilling:** holding the shop, or the switch, and deciding calmly what to do with the most dangerous thing she
  has ever owned.
- **Erotic:** a chosen night a year on, with the man she chose, or none.
- **Fun:** the reckoning of the whole road, read back to her line by line off a page headed OWES.

---

## 2. What it reads (inputs)

| Input | From | Use |
|---|---|---|
| `act4.board`, `act4.terms`, `act4.aim`, `act4.offer` | Ch16–17 | The position, and how much of it the world granted |
| `act4.marcus`, `pred.ally.marcus`, `pred.mercy`, `pred.marcus` | Ch14–17 | Marcus's line on OWES (Leeds, his mother, his name or not) |
| `act4.nell-said`, `pred.nora`, `pred.watch`, `act3.nell-order` | Ch12–17 | Nora's line, and the watch |
| `act4.last`, `pred.key17` | Ch17 | What Celeste carried away; the key kept or returned |
| `act3.switch`, `act3.black-phone`, `act3.cost`, `c15.cost-who` | Ch15 | What she holds that nobody can revoke; the price, come back |
| `pred.delphine`, `pred.ally.iris`, `pred.ally.morel`, `pred.halvorsen`, `pred.ally.marsh`, `c8.p-night`, `pred.lever8.*` | Ch8–13 | The rest of OWES: Ana, Iris, Lucien, Halvorsen, Marsh, Pryce, Hollis, Varga |
| `pred.julian`, `pred.mercy`, `pred.ally.morel`, `c6.maya` | Ch6–15 | Who she can go home to |
| `pred.want`, `own.cash`, `pred.account` | Ch7–15 | What the money, the title or the desk turned into |

---

## 3. Shape (phases)

`papers → hold → owes → called → year → last`

| Phase | Place | Beat |
|---|---|---|
| **papers** | Friday · the morning after | By the board:<br>• **succeeded:** no papers, because Meridian is private. At nine, four archive boxes delivered to her flat by men in grey coats. At the Vesper's door, the doorman: "Good morning, Madame." Celeste's postcard from Lisbon: "Don't change the lock. C.";<br>• **resigned:** a line in the business pages, and the postcard, "You were worth it. C.";<br>• **diminished:** Soames's typed letter, and a white orchid with no card;<br>• **closed:** nothing, anywhere.<br>How she spends it: **papers-read** / **papers-sleep** / **papers-marcus** (a call to Leeds; if an ally, or he kept his name) / **papers-maya** (if she is close). |
| **hold** | That month | **The seat** (succeeded): her first Thursday at the head of the table, with the client ledger in her own drawer and **the shop** to decide: **shop-keep** / **shop-change** / **shop-close** (§4). **Otherwise, by aim:** **wound** (three clients leave the fund, Meridian bleeding, standing); **helix** (Helix hers, clause 14.3 gone, the corner office, and the chair from Leeds, or its absence); **nell** (Nora, the file, the harbour wall at dusk); **seat refused** (nothing granted but what she carried). Then **the switch** on every road: **armed** / **handed** / **disarmed**. On the seat road it is aimed at herself: "if I ever become her entirely, it goes off." |
| **owes** | That year | The page headed OWES, read back line by line (short vignettes by state): Marcus in Leeds with his mother; Lucien's bank; Iris's postcard, FREE; Halvorsen's lunch at last; Pryce in his own cab; Hollis's cottage in Norfolk; Varga's open door; Ana on the coast; Nora's kitchen wall; Marsh's inquiry. The Ch15 cost comes back on its line. **Who she goes home to:** **home-julian** (ally) / **home-marcus** (ally, or he kept his name) / **home-lucien** (ally) / **home-maya** / **home-none**. |
| **called** | The wardrobe door, the last time | Every card down. **name-adrian** / **name-evelyn** / **name-new** (none punished; the body is not revisited). |
| **year** | A year later | By position: **the seat:** the first Thursday of December at the Vesper, receiving clients in green, the mirror of the first Thursday she walked into; **helix:** her corner office, rain on the river; **wound:** a café across from the Vesper, watching a smaller table through the black glass; **nell:** Holland Village, with Nora. The last night: **year-close** (with whoever she went home to: heat 3, the consent flow, fades) / **year-quiet** (a window, black coffee). |
| **last** | The end | The last card, and the last line, by name and position (§4). |

---

## 4. The seat, the switch, and the last line (with recommendations)

**The shop** (the seat road, `end.shop`); none is punished, and all are positions:
- **shop-keep:** she runs it as it was, better. The catalogue, the placements, the Thursdays. **The darkest ending:
  she becomes Celeste, with her eyes open,** and the last card knows it.
- **shop-change:** she runs it, and makes every legend a volunteer: paid, free to leave, no mother's house held.
  Still the shop, still dark, and a little less cruel. Whether that is better is left to the player.
- **shop-close:** she keeps the chair and closes the book from inside, one page at a time, over a year. The wound,
  from the top.

**The switch** (`end.switch`):
- **armed** (for the rest of her life; on the seat road, aimed at herself);
- **handed** (to Maya, Nora, Marsh or Lucien);
- **disarmed** (the letters taken back and burned).

**The last line**, by name and position:
- **Adrian:** *My name is Adrian Vale. I was bought once. Now I'm the only one who knows what I cost.*
- **Evelyn:** *My name is Evelyn Vale. They built her to be sold.* Then, on the seat road: *I bought the shop.*
  Otherwise: *I bought her back.*
- **New:** *I wrote my name on the last card, under a page headed OWES, and drew a line through the word. It's
  nobody's business but mine.*
- **Seat and shop-keep, any name:** after the line, one more card on the door, in green: *AVAILABLE.* It is her own
  page.

---

## 5. Decisions for the owner (recommendation first)

1. **Title "Paid in Full".** The Predator ledger that began in Ch8 on a page headed OWES closes, every line answered.
   *Recommended.*
2. **The morning after, by the board.** On the seat road there are no papers: archive boxes, "Good morning,
   Madame", and Celeste's "Don't change the lock." Otherwise, as on Celebrity: the Lisbon postcard, the orchid, or
   nothing. *Recommended.*
3. **The seat is a real ending:** keep the shop as it was (the darkest; she becomes Celeste, eyes open), change it
   (volunteers, paid, free to leave), or close the book from the chair. None is punished. *Recommended* (route
   decision 5).
4. **The other positions by aim and terms:** the wound (clients leave; Meridian bleeds and stands), Helix (hers,
   clause 14.3 gone), Nell (Nora and the wall), or a refused seat with nothing granted. *Recommended.*
5. **The switch on every road,** with the seat twist: aimed at herself. *Recommended.*
6. **OWES, read back:** the people, the Ch15 cost, and who she goes home to (Julian, Marcus, Lucien, Maya, or
   nobody). *Recommended.*
7. **Who she is now** (Adrian / Evelyn / a new name), then a year later and a chosen last night or a quiet one. On
   the darkest road the last card reads AVAILABLE, and it is her own page. *Recommended.*
8. **Entry and build shape:**
   - entered from the Predator `chapter17.minute`; **the Predator road is complete, Chapters 7 to 18**;
   - writes `end.*` (shop, switch, with, name, later) alongside the Celebrity keys;
   - three goldens (the seat kept, Helix, Nell) with neutral picks, and a real-save authentication test;
   - route docs and memory updated to "Predator complete".

   *Recommended.*

---

## 6. Art impact

Reuses the flat, the Vesper, the long room, the Helix corner office, and Holland Village (Celebrity Ch12). New:
- the four archive boxes (an insert);
- Evelynn receiving clients in green on the first Thursday (a costume and composition mirror of Ch11);
- the last card, AVAILABLE, in green (an insert).

Dark noir. These go on ALL_CHAPTERS_ART_LIST.md when the design is approved.
