import { AdultSceneDraftSchema } from './schema';
import { hashContract, hashText, immutable, type HandoffWorkspace } from './handoff';

export const MAX_DRAFT_BYTES = 160000;

/** Structure and declarations only. This cannot certify the literary meaning of prose. */
export function validateDraft(input: unknown, specInput: unknown, workspace: HandoffWorkspace) {
  const raw = typeof input === 'string' ? input : JSON.stringify(input);
  if (typeof raw !== 'string' || Buffer.byteLength(raw, 'utf8') > MAX_DRAFT_BYTES)
    throw Error('Draft exceeds byte budget or is not JSON');
  const draft = AdultSceneDraftSchema.parse(typeof input === 'string' ? JSON.parse(raw) : input);
  const spec = workspace.verify(specInput);
  if (
    draft.sceneId !== spec.sceneId ||
    draft.variantId !== spec.sceneVariantId ||
    draft.specificationHash !== spec.specificationHash ||
    draft.canonicalOutcomeHash !== spec.outcomeHash ||
    draft.presentationVariant !== spec.presentation.variant
  )
    throw Error('Draft does not match the current specification and outcome');
  const required = spec.requiredBeats.map((b) => b.id);
  if (
    draft.beatCoverage.length !== required.length ||
    draft.beatCoverage.some((b, index) => b.beatId !== required[index])
  )
    throw Error('Beat coverage must declare each required beat in order');
  return immutable({
    status: 'draft' as const,
    draft,
    proseHash: hashText(draft.prose),
    draftHash: hashContract(draft),
  });
}
