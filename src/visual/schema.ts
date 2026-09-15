// Offline production contracts. Never imported by the running game's UI/engine.
import { z } from 'zod';
import { CharacterIdSchema, IdentityIdSchema } from '../content/character-schema';
import { NodeSchema } from '../content/schema';

const id = z.string().regex(/^[a-z0-9][a-z0-9._-]{0,99}$/);
const text = z.string().trim().min(1).max(2000);
export const VisualAssetSpecSchema = z
  .object({
    assetId: id,
    assetType: z.enum([
      'portrait',
      'full-body',
      'character-sheet',
      'expression-sheet',
      'wardrobe-reference',
      'environment',
      'scene-cg',
      'dialogue-portrait',
      'background',
      'marketing-illustration',
    ]),
    styleBibleVersion: z.string().regex(/^\d+\.\d+$/),
    // Pair person and optional depicted persona, never resolve private acceptance.
    subjects: z
      .array(
        z
          .object({ characterId: CharacterIdSchema, identityId: IdentityIdSchema.optional() })
          .strict(),
      )
      .max(8)
      .optional(),
    locationId: id.optional(),
    sceneId: NodeSchema.optional(),
    wardrobeId: id.optional(),
    expression: text.optional(),
    pose: text.optional(),
    cameraFraming: text.optional(),
    cameraAngle: text.optional(),
    lighting: text.optional(),
    mood: text.optional(),
    timeOfDay: text.optional(),
    environment: text.optional(),
    intendedUse: text.optional(),
    presentationVariant: id.optional(),
    continuityRequirements: z.array(text).max(20).optional(),
    canonicalReferences: z.array(id).max(12).optional(),
    dimensions: z
      .object({
        width: z.number().int().min(1).max(16384),
        height: z.number().int().min(1).max(16384),
      })
      .strict()
      .optional(),
    notes: text.optional(),
  })
  .strict();
export type VisualAssetSpec = z.infer<typeof VisualAssetSpecSchema>;

const localArtPath = z
  .string()
  .max(240)
  .regex(/^art\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)$/);
export const VisualAssetRecordSchema = z
  .object({
    spec: VisualAssetSpecSchema,
    role: z.enum(['canonical-reference', 'production', 'staging', 'rejected']),
    approvalStatus: z.enum(['pending', 'approved', 'rejected']),
    file: localArtPath.optional(),
    sha256: z
      .string()
      .regex(/^[a-fA-F0-9]{64}$/)
      .optional(),
    approval: z.object({ reviewer: text, source: text, date: z.iso.date() }).strict().optional(),
  })
  .strict()
  .superRefine((asset, ctx) => {
    const approved = asset.role === 'canonical-reference' || asset.role === 'production';
    const expected = approved ? 'approved' : asset.role === 'staging' ? 'pending' : 'rejected';
    if (asset.approvalStatus !== expected)
      ctx.addIssue({ code: 'custom', message: 'Asset role and approval status differ' });
    if (approved && (!asset.approval || !asset.file || !asset.sha256))
      ctx.addIssue({
        code: 'custom',
        message: 'Approved assets require explicit review, file and hash',
      });
    if (!approved && asset.approval)
      ctx.addIssue({ code: 'custom', message: 'Unapproved asset cannot carry an approval' });
  });
export type VisualAssetRecord = z.infer<typeof VisualAssetRecordSchema>;
