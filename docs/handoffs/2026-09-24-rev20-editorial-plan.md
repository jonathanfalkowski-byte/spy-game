# Content revision 20: editorial pass on Chapters 1–5 and Julian at heat 3 (plan)

Why a new revision: Chapters 1–5 are in players' saves (revisions 17–19). Their text is replayed from
the ledger, and the golden fixtures prove old saves reproduce byte for byte. Changing that text in
place would change existing saves. Revision 20 lets **new games** get the revised text while **old
saves replay exactly** as they do today.

Sources: [../story/PLAYTHROUGH_REVIEW_2026-09-24.md](../story/PLAYTHROUGH_REVIEW_2026-09-24.md)
(Group 3), [../story/CONTENT_DIRECTION.md](../story/CONTENT_DIRECTION.md) (heat 3),
[../story/BEAT_MAP.md](../story/BEAT_MAP.md).

## Approach: two commits

### Commit 1: plumbing only, zero text changes
- New games start at `contentRevision: 20`. Revisions 17–19 keep their current behaviour.
- Treat revision 20 as a *current* engine revision alongside 19, not a frozen one. The ~19 routing
  checks (`contentRevision === 19` / `!== 19` in `reducer.ts`, `revision.ts`, `chapter5-model.ts`,
  `chapter5-sebastian.ts`, `App.tsx`, `Chapter3work.tsx`, `Chapter5work.tsx`) become
  "19 or later" where they mean the current engine.
- Save schema: accept 20.
- Proof: every existing golden (revisions 13–19, Chapters 1–9) replays byte for byte; a new
  revision-20 game plays through Chapters 1–9 identically to revision 19 (same choices, same text),
  captured as a new revision-20 golden.

### Commit 2: the editorial pass, behind `contentRevision >= 20`
Each change is a revision-conditional branch (`rev20(s) ? new : old`), so revision-19 saves keep the
old wording. Scope, from the review's Group 3:
- **Tone:** cut the term-sheet notices and contract prose to one telling detail per offer; Sloane
  and Voss speak with menace or warmth, not compliance language; stop narrating the choice menu;
  remove milestone and development text ("Vertical slice complete", "Scene 1 ends here",
  "Adrian remained silent after the simulation"); replace covering-every-path phrasing.
- **Dropped threads:** a Sloane debrief after the Glass House (Benton's fate, the promise "the
  breach disappears" broken or kept); Helix's approach acknowledges the gallery chase (Marcus is
  probing); Maya reacts properly to Adrian's changed voice; the Chapter 3 date reveal gets a
  reaction.
- **Logic:** an evidence-free Benton guess costs something (weaker proof or Sloane's trust); the
  Evelyn/Evelynn spelling becomes a legible beat (she chooses her spelling at the Helix invitation);
  explain the $0 balance (frozen accounts) or seed the account; collapse the Aster negotiation to two
  choices; say the wardrobe once; Sloane reacts to her officer taking a Helix room.
- **Small fixes:** duplicated rehearsal paragraph and Marcus "raised finger"; "closest thing to
  family" twice; "Upstairs, Marcus and Celeste" at home; wafer/token named before they appear; the
  mirror beat actually looks.
- **Julian at heat 3** (Content Direction decision; "add implied sex scenes to the other
  chapters"): Chapter 4 private time and Chapter 5 want/handoff become written scenes with lead-in,
  consent in character, a cut at the act and a real aftermath, replacing the audit notices.

## Risk and verification
- The only real risk is old saves. Commit 1 isolates it and proves it before any text changes.
- Every commit: build, both opening gates, full suite, and the golden replay of revisions 13–19
  unchanged. Commit 2 adds revision-20 transcripts reviewed end to end, like the 2026-09-24 review.

## Size
Commit 1: small but careful (about half a day). Commit 2: large (the text pass across
Chapters 3–5 plus two Julian scenes); best done chapter by chapter with a checkpoint after each.

## Status (2026-09-24)

**Commit 1 done** (93c40bf): new games start at revision 20; revisions 13–19 replay unchanged; all
25 golden routes replay identically at 19 and 20.

**Commit 2 done**, built as a *presentation layer* like revision 18
([src/content/revision20-editorial.ts](../../src/content/revision20-editorial.ts)), not as branches in
the content files. Rewrites apply only when the save's revision is 20, at the reading boundary
(reading blocks, choice labels and hints, scene titles). State, history, the ledger and replay are
untouched, so revision-19 saves read exactly as before **and** revision-20 saves stay valid. One
engine change: Sloane's debrief when Benton is named without evidence (`mission.ts`,
`debriefEvidence`, gated on `hasRevision20`; `mission.debrief` is in `REWRITTEN`).

Done: menu narration and milestone text; covering-every-path phrasing; Chapter 3 legal speech
(Sloane, Voss, Helix, Marcus) rewritten in voice; Sloane's debrief (Benton on leave pending review,
Voss's team, "the breach stays in my drawer"); Helix/Julian acknowledge the Glass House exit
(Marcus probing); Maya hears the voice; the date reveal gets a reaction; Benton guess costs Sloane's
confidence; frozen accounts explain the $0; wardrobe said once; Sloane on the Helix room; duplicate
rehearsal, raised finger and "family" lines; the mirror is looked into (except "Look away"); Chapter
4–5 term-sheet, consent-clause and duplicate notices hidden (choices and money stay); Julian's Chapter 4
and Chapter 5 evenings written at heat 3 for both scopes (lead-in, consent in character, cut at the
act, aftermath).

Already fine on screen, no change: the Evelyn/Evelynn spelling (the display shows "Evelynn"
throughout; the review read raw transcripts); "the the" (fixed at display earlier).

**Deferred:**
- Collapsing the Aster negotiation to two choices is a gameplay change (choice set and flags read
  later), not presentation. The replies are rewritten and the term sheets hidden; the menu is still
  long.
- The Benton cost is Sloane's words only; a trust or proof penalty would need state later chapters read.
- Chapter 6 "She thanks the stranger" friction (gated chapter, fix in place later).

Tools: `EVE_DUMP=<dir> npx vitest run tests/tools/transcript-dump.test.ts` writes revision-19 and 20
reading transcripts for every golden route. Tests: `tests/state/revision20-editorial.test.ts`.
