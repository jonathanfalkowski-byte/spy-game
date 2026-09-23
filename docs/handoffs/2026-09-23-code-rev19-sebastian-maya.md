# Code job 4 — revision 19 content: Sebastian lane and Maya number (2026-09-23)

Rides in the same revision 19 as job 3 (wardrobe sweep and Maya knowledge semantics).

- Script (the source of truth for wording and flags): `docs/story/scripts/REV19_SEBASTIAN_MAYA_SCRIPT.md`
- Design: `docs/story/NON_JULIAN_SOCIAL_LANE.md` and `docs/story/MAYA_FRIENDSHIP_LANE.md` (all owner-approved)

Scope:
1. Add a new NPC `sebastian`, age 38, to the character registry and `NpcIdSchema`.
2. Harbour `room`: add `attention-sebastian` and its three sub-choices, using the existing attention budget.
3. `people`: add `maya-new-number`. It requires the `spend` personal-phone purchase and costs a send.
4. `want`: the salon branch (3a–3f) replaces the old salon motive choices in revision 19 only. Reuse the `intimate5` consent and withdrawal machinery with a partner id. Julian's branch is untouched.
5. `return`: the remembering lines, and the carry-forward flags for the Chapter 6 entry state.
6. The sex-scope explicit body: leave the marked placeholder. Design will send the chosen writer take as a separate file, and it should be inserted verbatim.
7. The tests listed at the end of the script.

Before building, report anything in the script that conflicts with the engine (phase names, how sub-choices work inside `room`, or budget counters), and propose the minimal adjustment. Don't rewrite prose. Send wording questions to design. No commits.
