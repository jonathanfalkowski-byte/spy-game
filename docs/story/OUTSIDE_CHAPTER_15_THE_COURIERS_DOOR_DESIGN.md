# Outside · Chapter 15: "The Courier's Door" (design)

**Act IV · Outside route (lane id `outside`) · the shared archive heist ("Breaking the Leash"), with Outside framing**
**Budget: 0.7h / ~7k words across the chapter, ~4.5k on one path.**

**Authority:**
- [OUTSIDE_ROUTE_DESIGN.md](OUTSIDE_ROUTE_DESIGN.md) §4, "15 · The Archive": the Vesper archive entered by the courier's door; the
  drawer that matters on this road is **LINDEN, E.**
- §2 rules: the sender is already named (Ch14); **how Nell died stays for Ch17**; his price is always information; Rafe never makes
  her Nell; the skeptic is never punished; cutting the source stays open; Rafe intimacy only after he told her (Ch14) and not if cut.
- [CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md](CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md), the shared canon: the archive, her own page, one
  thing more, the holds broken, one cost, "No more orders." / "I shall be there as myself.", the black phone, the night.
- [INSTITUTIONAL_CHAPTER_15_THE_AUDIT_DESIGN.md](INSTITUTIONAL_CHAPTER_15_THE_AUDIT_DESIGN.md) and the Executive equivalent: the
  lane-variant pattern.

**Status: APPROVED (owner, 2026-10-01: "ok do your next recommendation", design and build as recommended) and BUILT, pass 1.** Script:
[scripts/OUTSIDE_CHAPTER_15_SCRIPT.md](scripts/OUTSIDE_CHAPTER_15_SCRIPT.md); code: `src/content/chapter15-outside.ts`.

---

## 1. The chapter's job

On the other roads the archive is a place to break into. On this road it is **a man's ten years of Tuesdays**: Rafe delivered to the
Vesper's river door every week, never saw the room open, and knows the minute the alarm lets go of the lock.

By the end of the chapter the player must:

1. **Chart the week:** a crew of up to two from the people she has earned (Rafe unless she cut him; Maya if restored; Marsh if turned
   in Ch13; Iris if warned in Ch11), or nobody.
2. **Choose the way in:** the courier's door at ten to five with the florists (needs Rafe on the crew); the kitchen stair at two in the
   morning (needs the layout from Ch11 or Iris); or **by invitation**, a meeting with Celeste as cover, always open. A snag: **talk /
   hide / bold**.
3. **Open the drawer LINDEN, E.:** the Jakarta order signed C. (proof of the burn, not of the harbour) and a booking slip clipped to it,
   ROTTERDAM · COURIER · R. L. · SATURDAY · NON-REFUSABLE · AUTH. C.: Celeste sent him away. **Show it to Rafe now** (if he is on the
   crew) or **keep it back for the room**.
4. **Take one thing more:** Adrian Vale's file / the 1109 cards / LIM, R. (his own file, only if he is not cut).
5. **Break the holds and pay one cost:** an ally (Iris's cover, or Marsh's inquiry), her face (the papers have it), money, or **Rafe on
   the record** (only if he told her and she did not cut him).
6. **Send "No more orders."** and hear "I shall be there as myself."; settle the black phone (return / river / keep); and a chosen
   night (Rafe if told and not cut; Julian; Sebastian; Maya; alone) with the consent flow and the fade.
7. **Pin the card:** LINDEN, E. / ROTTERDAM. SATURDAY. AUTH. C. HE KNOWS (or HE DOESN'T KNOW YET) / THE BOARD MEETS.

**What it must not do:** tell how Nell died; make Rafe call her Nell; punish refusing the crew; make the night a reward or a cure;
make any partner's intimacy unstoppable.

**Why it is thrilling, erotic and fun:** the thrill is the blind minute with a crate of lilies; the fun is Rafe carrying a heist like a
delivery; the heat is a chosen night, heat 3 at most, faded, and Rafe's "tell me what you want tonight, and that's what happens".

## 2. Shape (phases)

`chart → approach → shelves → reckon → vigil → complete`

The names avoid the shared Ch15 phases (`crew / plan / vesper / archive / leash / phone`), Predator's (`gift / people / hour / drawers /
week / line / ledger`), Executive's (`allies / entry / stacks / holds / last`) and Institutional's (`warrant / audit / cabinets /
aftermath / eve`).

## 3. Keys

`out.crew15` (comma list of who came), `out.way15` courier / stair / invited, `out.linden15`, `out.slip15` gave / held, `out.took15`
adrian / cards / lim, `out.cost15` ally / face / money / rafe; shared Act III/IV keys written: `act3.nell-order = taken`, `act3.leash =
broken`, `act3.switch` (holders), `act3.ally.marsh / iris / nora = in` when applicable, `act3.black-phone`, `c15.cost` (+ `cost-who`);
`c15.o-*` for the snag, drawer, night and consent facts (`c15.o-linden`, `c15.o-evening-consent`).

## 4. Decisions (all taken as recommended)

1. **Title "The Courier's Door".**
2. **The drawer is LINDEN, E.:** it carries the proof of the burn and the slip that shows Celeste sent Rafe away; it does **not** tell
   how Nell died.
3. **The slip is shown or held,** never forced. Showing it costs her nothing and gives him something; holding it keeps it for the room.
4. **Rafe steps forward on the record** is one of four costs, offered only if he told her and she did not cut him.
5. **Always a way in** (by invitation), and always a way to do it alone.
6. **Night:** Rafe only after he told her (Ch14) and not cut; consent in character; fades.
7. **Stop line:** "[Chapters 16–18 · outside road — in development]" at the end; Ch14's old stop line is removed.
8. **Build shape:** entered from an Outside `chapter14.complete`; goldens on the real Outside golden played through Ch10–14.

## 4a. Deepening pass 1 (2026-10-02)

Three optional moments, each with a neutral pick (no flag the later chapters read changes):

| Moment | Where | Choices (`c15.o-…`) |
|---|---|---|
| **The floor-plan** | before the crew (`chart`) | **o15-plan-trace** (his lines marked HIS / YOURS / TAKEN ON TRUST; if cut, from memory with SEEN / GUESS) · **-walk** (ten to five on the bench opposite, the blind minute counted herself) · **-leave** (pinned as it is) |
| **The page beside hers** | before the drawer (`shelves`) | **o15-page-take** (E. V. (I), RETIRED, SINGAPORE) · **-back** (not hers to take) · **-mark** (SEEN., in pencil) |
| **The copies** | before the price (`reckon`) | **o15-post-self** (carried across the river herself) · **-rafe** (he signs for each on a grey docket and gives her the top copy; not offered if cut; an echo of Ch18's SIGNED FOR BY docket) · **-mail** (a pillar box) |

Pass-1 length about 1.48k words, deepened to about 1.68k on the Rafe + Marsh path; the target is still ~4.5k, so further passes remain.

## 5. Art impact

Reuses the Vesper's lobby and the archive (shared set) and the room over the water. New: the river door at ten to five with the
florists' van; the grey cabinet marked L; the slip clipped with a brass pin. These go on the consolidated art list after the deepening
passes.
