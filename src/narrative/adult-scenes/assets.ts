import { z } from 'zod';
import { Id, Hash, PresentationVariantSchema } from './schema';
import { hashContract, immutable, type HandoffWorkspace } from './handoff';
import { validateDraft } from './validation';

const reviewerSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    source: z.string().trim().min(1).max(1000),
    date: z.iso.date(),
  })
  .strict();
const assetMetadata = z
  .object({
    assetId: Id,
    version: z.number().int().positive(),
    file: z
      .string()
      .max(240)
      .regex(/^narrative\/approved\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.txt$/),
  })
  .strict();
export const NarrativePresentationAssetSchema = assetMetadata
  .extend({
    sceneId: Id,
    variantId: Id,
    approvalStatus: z.literal('approved'),
    approvalId: Hash,
    specificationHash: Hash,
    canonicalOutcomeId: Id,
    outcomeHash: Hash,
    outcomeVersion: z.number().int().positive(),
    proseHash: Hash,
    source: z.string().min(1).max(2000),
    presentationVariant: PresentationVariantSchema,
    language: z.string().min(2).max(40),
  })
  .strict();
export type NarrativePresentationAsset = z.infer<typeof NarrativePresentationAssetSchema>;
type Review = {
  reviewId: string;
  status: 'review' | 'approved' | 'rejected';
  proseHash: string;
  draftHash: string;
  specificationHash: string;
  outcomeHash: string;
  outcomeVersion: number;
  reviewer?: z.infer<typeof reviewerSchema>;
};

/** Local editorial authority, never supplied by an external writer. No automatic approval,
 * persistence, provider calls or rendering. A new desk cannot trust a serialized receipt. */
export function createEditorialDesk() {
  const reviews = new Map<string, Review>();
  const published = new Map<string, NarrativePresentationAsset>();
  let sequence = 0;
  function check(
    reviewId: string,
    draftInput: unknown,
    specInput: unknown,
    workspace: HandoffWorkspace,
  ) {
    const review = reviews.get(reviewId);
    if (!review || review.status !== 'approved' || !review.reviewer)
      throw Error('Missing trusted editorial approval');
    const spec = workspace.verify(specInput);
    const value = validateDraft(draftInput, spec, workspace);
    if (
      review.proseHash !== value.proseHash ||
      review.draftHash !== value.draftHash ||
      review.specificationHash !== spec.specificationHash ||
      review.outcomeHash !== spec.outcomeHash ||
      review.outcomeVersion !== spec.outcomeVersion
    )
      throw Error('Editorial approval no longer matches prose, specification or outcome');
    return { spec, value };
  }
  function validateAsset(
    input: unknown,
    draft: unknown,
    spec: unknown,
    workspace: HandoffWorkspace,
  ) {
    const asset = NarrativePresentationAssetSchema.parse(input);
    check(asset.approvalId, draft, spec, workspace);
    const original = published.get(`${asset.assetId}:${asset.version}`);
    if (!original || hashContract(original) !== hashContract(asset))
      throw Error('Unregistered or altered approved asset');
    return original;
  }
  return Object.freeze({
    submitForReview(draft: unknown, specInput: unknown, workspace: HandoffWorkspace) {
      const spec = workspace.verify(specInput);
      const value = validateDraft(draft, spec, workspace);
      const reviewId = hashContract({ draftHash: value.draftHash, sequence: ++sequence });
      const record: Review = immutable({
        reviewId,
        status: 'review',
        proseHash: value.proseHash,
        draftHash: value.draftHash,
        specificationHash: spec.specificationHash,
        outcomeHash: spec.outcomeHash,
        outcomeVersion: spec.outcomeVersion,
      });
      reviews.set(reviewId, record);
      return record;
    },
    recordDecision(reviewId: string, decisionInput: unknown) {
      const decision = z
        .object({ status: z.enum(['approved', 'rejected']), reviewer: reviewerSchema })
        .strict()
        .parse(decisionInput);
      const current = reviews.get(reviewId);
      if (!current || current.status !== 'review')
        throw Error('Decision requires a pending local review');
      const record: Review = immutable({ ...current, ...decision });
      reviews.set(reviewId, record);
      return record;
    },
    publish(
      reviewId: string,
      metadataInput: unknown,
      draft: unknown,
      specInput: unknown,
      workspace: HandoffWorkspace,
    ) {
      const { spec, value } = check(reviewId, draft, specInput, workspace);
      const metadata = assetMetadata.parse(metadataInput);
      const asset = immutable(
        NarrativePresentationAssetSchema.parse({
          ...metadata,
          sceneId: spec.sceneId,
          variantId: spec.sceneVariantId,
          approvalStatus: 'approved',
          approvalId: reviewId,
          specificationHash: spec.specificationHash,
          canonicalOutcomeId: spec.canonicalOutcomeId,
          outcomeHash: spec.outcomeHash,
          outcomeVersion: spec.outcomeVersion,
          proseHash: value.proseHash,
          source: value.draft.writerMetadata.source,
          presentationVariant: spec.presentation.variant,
          language: spec.language,
        }),
      );
      const key = `${asset.assetId}:${asset.version}`;
      const previous = published.get(key);
      if (previous && hashContract(previous) !== hashContract(asset))
        throw Error('Asset revision is immutable; choose a new version');
      published.set(key, asset);
      return asset;
    },
    validateAsset,
    readApprovedText(asset: unknown, draft: unknown, spec: unknown, workspace: HandoffWorkspace) {
      validateAsset(asset, draft, spec, workspace);
      return validateDraft(draft, spec, workspace).draft.prose;
    },
  });
}
