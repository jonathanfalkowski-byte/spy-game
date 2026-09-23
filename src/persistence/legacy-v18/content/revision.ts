export const CURRENT_AUTHORING_REVISIONS = [17, 18] as const;
export type CurrentAuthoringRevision = (typeof CURRENT_AUTHORING_REVISIONS)[number];

export function isCurrentAuthoringRevision(revision: number | undefined): revision is CurrentAuthoringRevision {
  return revision === 17 || revision === 18;
}

export function isRevision18(revision: number | undefined): revision is 18 {
  return revision === 18;
}
