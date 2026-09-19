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
    // Provisional conditioning references never become canonical by being reused.
    stagingReferences: z.array(id).max(12).optional(),
    // Correction targets are provenance, not approved conditioning references.
    editSources: z.array(id).max(12).optional(),
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
const EvelynnGenerationSchema = z
  .object({
    provider: z.literal('zencreator'),
    tool: z.literal('image_editor'),
    taskId: z.uuid(),
    callId: z.uuid(),
    providerAssetId: z.uuid(),
    model: z.literal('SEEDREAM_5'),
    sourceReferences: z.array(z.object({ assetId: id, providerAssetId: z.uuid() }).strict()).min(1),
    promptVersion: z.literal('eve-evelynn-v1'),
    promptComponents: z.record(
      z.enum([
        'EVE_STYLE',
        'EVELYNN_CANON',
        'REFERENCE_IMAGE',
        'ASSET_TYPE',
        'POSE',
        'CAMERA',
        'WARDROBE',
        'LIGHTING',
        'MOOD',
        'ENVIRONMENT',
      ]),
      text,
    ),
    prompt: z.string().min(1).max(20000),
    settings: z
      .object({
        ratio: z.enum(['3:4', '2:3']),
        width: z.literal(1536),
        height: z.union([z.literal(2048), z.literal(2304)]),
        number_of_images: z.literal(1),
        batch_mode: z.literal(false),
        sequential_generation: z.literal(false),
        rewrite_prompt: z.literal(false),
      })
      .strict(),
    createdAt: z.iso.datetime(),
    estimatedCredits: z.number().nonnegative(),
    mediaType: z.enum(['image/png', 'image/jpeg', 'image/webp']),
    outputDimensions: z
      .object({ width: z.number().int().positive(), height: z.number().int().positive() })
      .strict(),
  })
  .strict();
export const VisualGenerationSchema = z.union([
  EvelynnGenerationSchema,
  EvelynnGenerationSchema.extend({
    tool: z.enum(['image_editor', 'by_prompt']),
    sourceReferences: z.array(z.object({ assetId: id, providerAssetId: z.uuid() }).strict()),
    promptVersion: z.enum([
      'eve-cast-scenes-v1',
      'eve-continuity-v2',
      'eve-apartment-v1',
      'eve-opening-v1',
    ]),
    promptComponents: z
      .object({
        STYLE: text,
        SUBJECT: text,
        SCENE: text,
        CAMERA: text,
        LIGHTING: text,
        CONTINUITY: text,
      })
      .strict(),
    settings: z.union([
      z
        .object({
          ratio: z.literal('3:4'),
          width: z.literal(1536),
          height: z.literal(2048),
          batch_size: z.literal(1),
          mode: z.literal('quality'),
          rewrite_prompt: z.literal(false),
        })
        .strict(),
      z
        .object({
          ratio: z.enum(['3:4', '16:9']),
          width: z.union([z.literal(1536), z.literal(1920)]),
          height: z.union([z.literal(2048), z.literal(1080)]),
          number_of_images: z.literal(1),
          batch_mode: z.literal(false),
          sequential_generation: z.literal(false),
          rewrite_prompt: z.literal(false),
        })
        .strict()
        .refine(
          (s) =>
            s.ratio === '3:4'
              ? s.width === 1536 && s.height === 2048
              : s.width === 1920 && s.height === 1080,
          'Dimensions must match ratio',
        ),
    ]),
  }).superRefine((g, ctx) => {
    if (
      g.tool === 'by_prompt'
        ? g.sourceReferences.length !== 0 || !('batch_size' in g.settings)
        : g.sourceReferences.length === 0 || !('number_of_images' in g.settings)
    )
      ctx.addIssue({ code: 'custom', message: 'Provider tool and input provenance differ' });
  }),
]);
export const VisualAssetRecordSchema = z
  .object({
    spec: VisualAssetSpecSchema,
    role: z.enum(['canonical-reference', 'production', 'staging', 'rejected']),
    approvalStatus: z.enum(['pending', 'approved', 'rejected']),
    file: localArtPath.optional(),
    generation: VisualGenerationSchema.optional(),
    review: z
      .object({
        decision: z.enum(['PASS', 'REVISE', 'REJECT']),
        reviewer: text,
        date: z.iso.date(),
        reasons: z.array(text).min(1),
      })
      .strict()
      .optional(),
    sha256: z
      .string()
      .regex(/^[a-fA-F0-9]{64}$/)
      .optional(),
    approval: z.object({ reviewer: text, source: text, date: z.iso.date() }).strict().optional(),
  })
  .strict()
  .superRefine((asset, ctx) => {
    if (asset.role === 'staging' && asset.file && !asset.file.startsWith('art/staging/'))
      ctx.addIssue({ code: 'custom', message: 'Staging asset must remain under art/staging' });
    if (asset.generation) {
      const sources = asset.generation.sourceReferences.map((r) => r.assetId);
      if (
        !asset.file ||
        !asset.sha256 ||
        sources.some(
          (source) =>
            ![
              ...(asset.spec.canonicalReferences ?? []),
              ...(asset.spec.stagingReferences ?? []),
              ...(asset.spec.editSources ?? []),
            ].includes(source),
        )
      )
        ctx.addIssue({
          code: 'custom',
          message: 'Generated assets require file, hash and declared canonical source references',
        });
    }
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
