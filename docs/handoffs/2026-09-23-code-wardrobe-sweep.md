# Code job 3 — Evelynn wardrobe prose sweep (2026-09-23)

Owner rule (see "Evelynn's presentation" in `docs/art/EVE_STYLE_LOCK.md`): Evelynn is
always styled. Hair is done (the updo or a deliberate styled look), she wears heels,
her clothes are fitted, and her makeup is finished. The wardrobe line (Executive,
Socialite, Shadow) changes the kind of sexy, never whether she is.

**Exceptions the owner approved**, which must stay unstyled: clinic recovery, the first
mirror look, and any beat where the prose makes her unstyled state the point. The
prose returns to styled immediately afterwards.

**Phase 1: report only. Don't edit yet.**

1. Search the current-revision content in `src/content/**` for Evelynn's wardrobe and grooming after the clinic: low heels, flats, trainers or sneakers, bare feet out of doors, hair down, messy or tied back, no makeup, loose or baggy clothes, "whatever was clean", and similar. Include describer text used by art prompts, if any.
2. For each hit, give the file:line, the scene or state key, the exact phrase, and whether it is **exception** (keep), **change**, or **ambiguous**. Propose the replacement words for each change (e.g. "black low heels" → "black heels").
3. Say what a prose change implies mechanically:
   - Does it need a content revision 19 for new games?
   - Which freeze or snapshot tests move?
   - Do authenticated older saves keep their revision text?
4. Send the report to EVE design overview. The phase 2 edit happens after I review the list.

No commits.
