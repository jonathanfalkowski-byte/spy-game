# Chapter 5 pre-edit inventory — 2026-09-17

Captured before this final pass made source edits. Existing dirty work is preserved.

Branch: story/chapter-3-design

HEAD: 999e6e5db4c4b0553589176f23090919ebef3473

Current content revision: 16. Save schema: 5. Frozen revision: 15. Exact frozen authentication is checked by chapter5-entry.test.ts before edits and in final validation.

## Starting status

```text
M docs/art/ART_REVIEW_CHECKLIST.md
 M docs/art/EVE_ART_BIBLE.md
 M src/content/scenes.ts
 M src/content/schema.ts
 M src/narrative/adult-scenes/handoff.ts
 M src/persistence/saves.ts
 M src/state/actions.ts
 M src/state/reducer.ts
 M src/state/schema.ts
 M src/ui/App.tsx
 M src/ui/chapter4-presentation.ts
 M src/ui/journal-entries.ts
 M tests/routes/opening.test.ts
 M tests/state/chapter4.test.ts
?? docs/art/CHAPTER_5_ART_REQUIREMENTS.md
?? docs/art/CHAPTER_5_SHOT_PLAN_REVIEW.md
?? docs/art/GLOBAL_CINEMATIC_ART_RULES.md
?? docs/art/SCENE_VISUAL_PLAN_TEMPLATE.md
?? docs/story/CHAPTER_5_ENTRY_STATE_MATRIX.md
?? docs/story/CHAPTER_5_IMPLEMENTATION_REPORT.md
?? docs/story/CHAPTER_5_THE_BEAUTIFUL_LIFE_TREATMENT.md
?? src/content/chapter5-benefit.ts
?? src/content/chapter5-desire.ts
?? src/content/chapter5-model.ts
?? src/content/chapter5-public.ts
?? src/content/chapter5-reward.ts
?? src/content/chapter5.ts
?? src/narrative/adult-scenes/chapter5.ts
?? src/persistence/legacy-v15/
?? src/ui/Chapter5work.tsx
?? tests/browser/chapter5.spec.ts
?? tests/chapter5-helpers.ts
?? tests/state/chapter5-benefit.test.ts
?? tests/state/chapter5-desire.test.ts
?? tests/state/chapter5-entry.test.ts
?? tests/state/chapter5-public.test.ts
```

## Runtime nodes

home, spend, echo, invitation, presentation, room, offer, proof, infrastructure, terms, people, want, handoff, return, complete.

## Stable IDs found before editing

- `c05.s01.shot01`
- `c05.s01.shot02-packet`
- `c05.s01.shot03-receipts`
- `c05.s01.shot04-threads`
- `c05.s01.shot05`
- `c05.s01.shot06-receipts`
- `c05.s01.shot07-expired`
- `c05.s02.shot01`
- `c05.s02.shot02-accounts`
- `c05.s02.shot03-return`
- `c05.s02.shot04-phone`
- `c05.s02.shot05-blouse`
- `c05.s02.shot06-clasp`
- `c05.s02.shot07-lunch`
- `c05.s02.shot08-clasp-box`
- `c05.s02.shot09`
- `c05.s03.shot01`
- `c05.s03.shot02-link`
- `c05.s03.shot03-intro`
- `c05.s03.shot04-listing`
- `c05.s04.shot01`
- `c05.s04.shot02-preview`
- `c05.s04.shot03-salon`
- `c05.s05.shot01`
- `c05.s05.shot02-professional`
- `c05.s05.shot03-glamorous`
- `c05.s05.shot04-provocative`
- `c05.s05.shot05-minimal`
- `c05.s06.shot01-preview`
- `c05.s06.shot02-salon`
- `c05.s06.shot03-editor`
- `c05.s06.shot04-host`
- `c05.s06.shot05-photo`
- `c05.s06.shot06-page`
- `c05.s06.shot07-message`
- `c05.s06.shot08-terrace`
- `c05.s06.shot09-thread`
- `c05.s06.shot10`
- `c05.s06.shot11-observe`
- `c05.s06.shot12-entrance`
- `c05.s06.shot13-return`
- `c05.s07.shot01`
- `c05.s07.shot02-contract`
- `c05.s07.shot03-arrival`
- `c05.s07.shot04-sitting`
- `c05.s07.shot04-text`
- `c05.s07.shot05-proof`
- `c05.s07.shot06-private`
- `c05.s07.shot07-text`
- `c05.s07.shot08-public`
- `c05.s07.shot09-withheld`
- `c05.s08.shot01`
- `c05.s08.shot02-call`
- `c05.s08.shot03-desk`
- `c05.s08.shot04-home`
- `c05.s08.shot05-counter`
- `c05.s08.shot06-home`
- `c05.s08.shot07-request`
- `c05.s08.shot08-table`
- `c05.s09.shot01`
- `c05.s09.shot02-two-calls`
- `c05.s09.shot03-one-call`
- `c05.s09.shot04-backup`
- `c05.s09.shot05-paid`
- `c05.s09.shot06-refused`
- `c05.s10.shot01-tea`
- `c05.s10.shot02-threads`
- `c05.s10.shot03-maya`
- `c05.s10.shot04-sloane`
- `c05.s10.shot05-sender`
- `c05.s10.shot06-voss`
- `c05.s10.shot07`
- `c05.s11.shot01`
- `c05.s11.shot02`
- `c05.s11.shot03-card`
- `c05.s11.shot04-roof`
- `c05.s11.shot04-short`
- `c05.s11.shot05-leave`
- `c05.s11.shot05-short`
- `c05.s11.shot06-home`
- `c05.s11.shot07-journey`
- `c05.s11.shot08-door`
- `c05.s11.shot09-withdraw`
- `c05.s11.shot10-no-sex`
- `c05.s11.shot11-encounter`
- `c05.s11.shot12-goodnight`
- `c05.s11.shot13-call`
- `c05.s12.shot01-return`
- `c05.s12.shot02-stay`
- `c05.s12.shot03-cup`
- `c05.s12.shot04-holdings`
- `c05.s12.shot05-phone`
- `c05.s12.shot06-clothes`
- `c05.s12.shot07-clasp`
- `c05.s12.shot08-visible`
- `c05.s12.shot09-private`
- `c05.s12.shot10-photo`
- `c05.s12.shot11-jacket`
- `c05.s12.shot12-unchanged`

Abbreviated IDs in grouped rows inherit their scene prefix; the full per-scene tables are authoritative. Retired IDs are preserved and never reused.
