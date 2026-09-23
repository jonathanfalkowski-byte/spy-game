export const CURRENT_AUTHORING_REVISIONS = [17, 18, 19] as const;
export type CurrentAuthoringRevision = (typeof CURRENT_AUTHORING_REVISIONS)[number];

export function isCurrentAuthoringRevision(revision: number | undefined): revision is CurrentAuthoringRevision {
  return revision === 17 || revision === 18 || revision === 19;
}

export function isRevision18(revision: number | undefined): revision is 18 {
  return revision === 18;
}

/** Revision 18's editorial presentation (and its reading UI) carries forward into revision 19. */
export function hasRevision18Presentation(revision: number | undefined): revision is 18 | 19 {
  return revision === 18 || revision === 19;
}
