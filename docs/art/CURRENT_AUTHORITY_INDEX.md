# Current art authority — audit implementation

Date: 2026-09-17. Baseline: `7c91a242a1fc9bc4365dfbb7dccd20853bbccfd6`.
See [machine-readable asset/hash/role/scope index](CURRENT_AUTHORITY_INDEX.json).
This index supersedes stale status summaries, **not** historical generation receipts or owner decisions. It grants no new approval.

| Asset | Current authority | Latest controlling record |
|---|---|---|
| Apartment phone composite V2 | Production, only `c05.s12.shot05-phone`: professional look, owned phone placed beside Axiom, jacket inside wardrobe, editorial declined, no publication/event photo/new evening arrangement | `art/production/chapter5/approval.json` |
| Harbour pair V2 | Production, only `c05.s06.shot12-entrance`: evening preview, professional, Julian access and actual arrival, one Evelynn-held coffee, no touch | `art/production/chapter5/harbour-approvals.json` |
| Julian-departed V1 | Production, only `c05.s06.shot15-departed`: same background/Evelynn/cup; Julian absent after goodbye and before re-entry | Same Harbour approvals |
| Harbour master | Environment authority only | Owner authority split; immutable portable `harbour-components/harbour-master.png` |
| Wave2 pair V1 | Character/composition reference only; environment excluded | Owner authority split; final production superseded by Harbour V2 |
| Evelynn fresh V4 | PASS — wardrobe reference only | Canonical face remains front/three-quarter; dangling earring explicitly NONCANONICAL; footwear only a low-heel guide |
| Aster location master | PASS — environment authority only | Aster master review; no complete character scene promotion |
| Aster arrival composite V1 | REVISE, staging | [Wave A review](CHAPTER_5_WAVE_A_REVIEW.md): high heel silhouette, floor contact/shadows, editor shoe/chair tangency; supporting editor design not canonical |
| Older Chapter3 treatment scenes | Staging, not runtime eligible | Audit H3: remote Marcus incorrectly embodied, apartment geography drift, incompatible gown/suit/locations and incorrect ending location |
| Maya pilot | REJECT, no runtime eligibility | Identity bleed into Evelynn; later candidates do not silently approve this one |

The approved three Chapter5 composites are not identity, body, or universal wardrobe masters. Apartment LOW/POLISH heel exception, game-size earring assessment, contour-lighting acceptance and matte acceptance remain unchanged. Harbour LOW/POLISH edges remain unchanged. Historical rejects/revise versions remain unpromoted. Duplicate bytes in staging cannot supply a second approval or a new shot scope.

## Runtime scope and missing coverage

Three existing exact variants now have runtime presentation. Both revision16 and revision17 read the authenticated coffee event prefix, then show wait → arrival/dialogue → completed departure → re-entry in order. Reading navigation is local UI state, not new story events. On reload it safely starts that passage again. The approved departure image is **not** authorized for the earlier wait. Wait and re-entry have honest text fallback. Dialogue within the pair composition holds that image.

The final apartment image follows the completed `place-phone` action only. The current conservative guard requires the existing `want-none` route as the unambiguous no-new-arrangement state; other potentially compatible refusals/deferrals remain pending exact-state review. It holds at `complete` and never appears when merely offered as a choice.

Post-Glass-House home art remains an approved opening illustration. It now stops holding after mirror/clothing/evidence/phone actions and does not remain over the later surveillance/complete beats. Those missing object/pose variants are not supplied by the drifting treatment candidates. Pre-Glass-House outfit previews retain their existing approved scope.

Coffee acquired outside remains with Evelynn on re-entry and on later compatible table/editor/photo shots. Carry it visibly or frame it off-screen without suggesting disposal; never add a second cup or move it to Julian. No authored disposal exists.

Coverage remains **3/100 raster/artifact IDs**, each with only one approved exact variant. The 103-ID register also contains three reserved/fade entries. All retired IDs remain retired. The departed-to-wait reuse remains a candidate requiring scope approval. Aster arrival remains staged REVISE; missing raster, wardrobe, publication and branch variants remain missing.

## Unresolved canon / production blockers

- Chapter3 next-day clinical/Helix/records scenes and Chapter4 day-to-day outfits lack a complete authored wardrobe/change contract. Do not take a gown, suit or jewelry from a candidate as canon.
- Marcus record/leverage is correspondence, not an in-person meeting. Use a phone/document beat once commissioned; do not introduce Marcus physically.
- Chapter3 ending is the lift/riverside departure, not the staged interior. Chapter4 private locations need exact authored geographic anchoring; do not approve a generic hotel image as a universal room.
- Aster character scene requires footwear/grounding correction and owner review. This task has not changed its image or approved the proposed editor identity.
- Cup-carrying return/table/photo variants, alternate Harbour time/outfit variants, and other final apartment object/wardrobe/publication/evening variants are still absent.

## Reproduction and spend

Apartment input layers, original matte source, night/alpha settings and numeric composition are portable in `art/production/chapter5/apartment-components` and `apartment-evidence`. Tests reproduce the approved image and both derivatives by SHA256, and verify zero changed uncovered background pixels. Harbour already has the equivalent portable pair bundle. Technical components gain no character/reference authority by being packaged.

Current pilot spend: **14 credits**. This audit: **0 credits**, no generation, no promotion. Historical 12/13-credit receipts remain historical records.
