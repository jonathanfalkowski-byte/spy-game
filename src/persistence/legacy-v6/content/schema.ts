import { z } from 'zod';

export const nodeIds = [
  'clinic.morning',
  'clinic.contact',
  'clinic.morningReply',
  'clinic.travel',
  'clinic.entrance',
  'clinic.screened',
  'clinic.reception',
  'clinic.receptionReply',
  'clinic.privacy',
  'clinic.privacyReply',
  'clinic.exam',
  'clinic.examResult',
  'clinic.protocol',
  'clinic.profile',
  'clinic.profileReview',
  'clinic.simulation',
  'clinic.display',
  'clinic.authorization',
  'clinic.preparation',
  'clinic.voice',
  'clinic.voiceReply',
  'clinic.voicePause',
  'clinic.face',
  'clinic.faceReply',
  'clinic.facePause',
  'clinic.steps',
  'clinic.mirror',
  'clinic.name',
  'clinic.rest',
  'clinic.recoveryContact',
  'clinic.recoveryReply',
  'clinic.wardrobe',
  'clinic.makeup',
  'clinic.presentationReview',
  'clinic.rehearsal',
  'clinic.briefing',
  'clinic.farewell',
  'clinic.departure',
  'clinic.complete',
  'clinic.stopConfirm',
  'clinic.stopped',
  'apartment.bond',
  'apartment.reply',
  'apartment.departure',
  'commute.arrival',
  'office.daniel',
  'office.benton',
  'office.departure',
  'helix.brief',
  'helix.documents',
  'helix.analysis',
  'helix.review',
  'helix.submitted',
  'maya.promotion',
  'maya.invitation',
  'maya.case',
  'maya.goodbye',
  'ending.complete',
  'file.arrival',
  'file.directory',
  'file.authorized',
  'security.intervention',
  'security.escort',
  'sloane.intro',
  'sloane.allegation',
  'sloane.brief',
  'sloane.identity',
  'sloane.offer',
  'refusal.lobby',
  'refusal.reconsider',
  'release.departure',
  'release.home',
  'evening.plan',
  'evening.disclosure',
  'evening.closure',
  'evening.goodbye',
  'evening.home',
  'warning.first',
  'warning.second',
  'warning.third',
  'dayend.cautious',
  'dayend.walkaway',
  'dayend.accepted',
] as const;
export const NodeSchema = z.enum(nodeIds);
export type NodeId = z.infer<typeof NodeSchema>;
export const DocIdSchema = z.enum(['email', 'finance', 'news', 'intel']);
export type DocId = z.infer<typeof DocIdSchema>;
export const RelationSchema = z.enum(['conflict', 'support', 'unrelated', 'uncertain']);
export type Relation = z.infer<typeof RelationSchema>;
export const SearchSchema = z.enum(['personnel', 'patents', 'payments']);
export type SearchId = z.infer<typeof SearchSchema>;
export const AssessmentSchema = z.enum(['bounded', 'personnel', 'data', 'fraud', 'insufficient']);
export type AssessmentId = z.infer<typeof AssessmentSchema>;
export const BlockSchema = z
  .object({
    kind: z.enum(['narrative', 'thought', 'speech', 'notice']),
    text: z.string().min(1),
    speaker: z.string().optional(),
  })
  .strict();
export type Block = z.infer<typeof BlockSchema>;
export const InspectionSchema = z
  .object({
    id: z.enum(['mirror', 'lease', 'medical', 'jacket']),
    title: z.string().min(1),
    text: z.string().min(1),
  })
  .strict();
export const SceneSchema = z
  .object({
    id: NodeSchema,
    title: z.string().min(1),
    place: z.string(),
    blocks: z.array(BlockSchema),
    next: NodeSchema.optional(),
    continueLabel: z.string().optional(),
  })
  .strict();
export type Scene = z.infer<typeof SceneSchema>;
export const ChoiceSchema = z
  .object({
    id: z.string().min(1),
    node: NodeSchema,
    slot: z.enum([
      'bond',
      'morning',
      'promotion',
      'benton',
      'mayaPromotion',
      'invitation',
      'disclosure',
    ]),
    value: z.string(),
    label: z.string().min(1),
    hint: z.string().min(1),
    next: NodeSchema,
    response: z.array(BlockSchema),
    requires: z.string().optional(),
  })
  .strict();
export type Choice = z.infer<typeof ChoiceSchema>;
export const CharacterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    arrival: z.string(),
    appearance: z.string(),
    history: z.string(),
    emotion: z.string(),
  })
  .strict();
export const DocumentSchema = z
  .object({
    id: DocIdSchema,
    title: z.string(),
    type: z.string(),
    source: z.string(),
    reliability: z.string(),
    body: z.string(),
    layer: z.enum(['fact', 'claim']),
    summary: z.string(),
    limits: z.string(),
  })
  .strict();
export const paragraph = (text: string): Block => ({ kind: 'narrative', text });
export const thought = (text: string): Block => ({ kind: 'thought', text });
export const speech = (speaker: string, text: string): Block => ({ kind: 'speech', speaker, text });
