# EVE continuity and next design record

2026-09-22. Companion to the scene audit, reviewed editorial package and implementation validation report.

## Addressed in the reviewed revision-18 package

- Remove selected development milestones from immersive narration while retaining honest terminal controls.
- Shorten introductory dossiers and procedural explanations without deleting information needed to choose or investigate.
- Make Daniel, Benton and Maya's existing behavior carry the opening's humiliation and support. Preserve each relationship variant.
- Ground the post-Glass House apartment and surveillance passages in existing objects and established badge-log knowledge.
- Give Julian's invitations and replies more natural language while preserving consent, scope, refusal, withdrawal, eligibility and fade outcomes.
- Remove the shared Chapter 5 response that assigns reluctance to end a call regardless of the chosen motive. Instrumental, mixed and personal motives remain distinct.
- Keep pleasure and presentation choices from automatically implying shame, allegiance or dependency. No new intimate encounter is added.

These are presentation corrections and editorial choices. They do not create new story events or evidence.

## Remaining confirmed semantic issues

| Issue | Current evidence | Decision needed |
|---|---|---|
| Maya's assignment knowledge | The reducer assigns `helix_assignment` knowledge after she sees the report header. The scene establishes visible company names, which may not establish the complete assignment. | **Decided by the owner, 2026-09-23: client names only.** `helix_assignment` for Maya means she saw the Helix and Novagen names on a Strategic Intelligence report and knows Strategic Intelligence has the file (her own line asks why Benton put it there). It does not mean the assignment's content, any finding, or any link to Evelynn. Implement as a label and semantics change in revision 19; no new dialogue. |
| Benton's reading knowledge | Report submission assigns `read_*` document knowledge although the immediate event establishes delivery/attachment. | Distinguish receipt from demonstrated reading in future state design. Preserve current IDs and historical outcomes here. |

Earlier reports about the Rook-date callback, uncorrected medical excuse and Aster concept revisit were rechecked against revision 17 and are not being reported as newly unresolved defects. Canonical Evelynn display spelling is already handled; raw historic text and stable IDs are preserved.

## Deliberate decisions and limits

- Preserve the existing institutional pressure and moral ambiguity without treating femininity or voluntary intimacy as corruption.
- Keep actionable limits in choices, hints and notices even when they are less lyrical than dialogue.
- Keep intimate outcomes private and preserve current fade transitions.
- Review the three pilots before releasing the expanded package. The design task approved the 86-entry package; this does not imply owner review of every line.
- The scene inventory covers 175 authored definitions in 33 sequences. Mechanical traversal and editorial reading are different evidence; the final validation report lists both and their unread branches.
- Opening coverage remains incomplete after the authorized art correction failed. See the separate residual-art record for the eight screens and actual spend.

## Next design package — proposals only

1. **A non-Julian social lane.** ✅ **Designed and shipped in revision 19** (Sebastian Okoro): [NON_JULIAN_SOCIAL_LANE.md](NON_JULIAN_SOCIAL_LANE.md). Invitation, uncertainty, refusal, a non-intimate outcome and a remembering aftermath, with no access or punishment tied to intimacy.
2. **Chapter 6 proof.** ✅ **Designed, pending owner sign-off:** [CHAPTER_6_PROOF_AND_COUNTERPOWER.md](CHAPTER_6_PROOF_AND_COUNTERPOWER.md) §2–4. The Meridian ledger leaf (Singapore-era courier-log page held by Rook), its provenance/custody/authentication, what it proves vs infers, and the corroborator's (Celeste/Marcus) firsthand scope.
3. **Chapter 6 exit costs.** ✅ **Designed, pending sign-off:** same doc §6. A per-entry-state arrangement (Julian workroom, public artifact, Sloane institutional, self-funded, Maya line), each with timing, what is lost and what remains. No dependency score.
4. **Recovery and counterplay.** ✅ **Designed, pending sign-off:** same doc §6–7. A recovery route for every costly exit, plus the ORACLE-based counterpower and the end-position choices.
5. **Opening pose recovery.** Rework the pose-control method locally so both feet are visibly grounded and facing is correct before proposing another paid attempt. The remaining budget does not authorize retrying the failed bounded correction automatically.

No social route, Chapter 6 scene, proof artifact, witness identity or new recurring obligation is implemented or silently made canon by this backlog.
