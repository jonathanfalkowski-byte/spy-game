export const CURRENT_AUTHORING_REVISIONS = [17, 18, 19, 20] as const;
export type CurrentAuthoringRevision = (typeof CURRENT_AUTHORING_REVISIONS)[number];

export function isCurrentAuthoringRevision(revision: number | undefined): revision is CurrentAuthoringRevision {
  return revision === 17 || revision === 18 || revision === 19 || revision === 20;
}

export function isRevision18(revision: number | undefined): revision is 18 {
  return revision === 18;
}

/** Revision 18's editorial presentation (and its reading UI) carries forward into revisions 19 and 20. */
export function hasRevision18Presentation(revision: number | undefined): revision is 18 | 19 | 20 {
  return revision === 18 || revision === 19 || revision === 20;
}

/** Revisions that run on the live engine (earlier ones delegate to the frozen revision-18 engine).
 * Revision 20 plays exactly like 19 except where text is branched on hasRevision20(). */
export function isEngineRevision(revision: number | undefined): revision is 19 | 20 {
  return revision === 19 || revision === 20;
}

/** Revision 20 (2026-09-24): the Chapter 1-5 editorial pass and Julian at heat 3 apply from here.
 * Older saves keep their original wording because their revision is fixed in the save. */
export function hasRevision20(revision: number | undefined): boolean {
  return (revision ?? 0) >= 20;
}
