// Planning contract only. No production component imports or binds staging artwork.
export const visualDimensions = ['node', 'outfit', 'treatmentStage', 'participants', 'timing', 'evidence', 'phase', 'location'] as const;
export type VisualDimension = typeof visualDimensions[number];
export type VisualContext = Record<VisualDimension, string>;
export type VisualCandidate = {
  assetId: string;
  role: 'staging' | 'production';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  kind: 'keyframe' | 'neutral';
  // Every dimension must be explicitly reviewed. No implicit wildcard or guessed context.
  guards?: Partial<Record<VisualDimension, readonly string[]>>;
};
export function selectVisual(context: VisualContext, candidates: readonly VisualCandidate[]): string | null {
  const matches = (asset: VisualCandidate) => asset.role === 'production' && asset.approvalStatus === 'approved' &&
    visualDimensions.every(key => typeof context[key] === 'string' && context[key].length > 0 && asset.guards?.[key]?.includes(context[key]));
  return candidates.find(a => a.kind === 'keyframe' && matches(a))?.assetId ??
    candidates.find(a => a.kind === 'neutral' && matches(a))?.assetId ?? null;
}
