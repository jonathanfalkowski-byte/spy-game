import { z } from 'zod';

export const nodeIds = [
 'chapter5.home','chapter5.spend','chapter5.echo','chapter5.invitation','chapter5.presentation','chapter5.room','chapter5.offer','chapter5.proof','chapter5.infrastructure','chapter5.terms','chapter5.people','chapter5.want','chapter5.handoff','chapter5.salon','chapter5.salon-room','chapter5.return','chapter5.complete','chapter6.benefit','chapter6.expectation','chapter6.friction','chapter6.exit','chapter6.proof','chapter6.counterpower','chapter6.resolve','chapter6.complete','chapter7.confirm','chapter7.standing','chapter7.held','chapter7.street','chapter7.lift','chapter7.wardrobe','chapter7.grey','chapter7.pursue','chapter7.close','chapter7.effects','chapter7.night','chapter7.complete','chapter8.cost','chapter8.work','chapter8.maintenance','chapter8.fireescape','chapter8.leverage','chapter8.advance','chapter8.emerald','chapter8.wake','chapter8.number14','chapter8.close','chapter8.call','chapter8.complete','chapter9.arrive','chapter9.names','chapter9.table','chapter9.auction','chapter9.assemble','chapter9.resolve','chapter9.cafe','chapter9.river','chapter9.archive','chapter9.counsel','chapter9.complete','chapter10.breakfast','chapter10.claimed','chapter10.wall','chapter10.order','chapter10.answer','chapter10.invitation','chapter10.complete','chapter11.arrival','chapter11.viewing','chapter11.upstairs','chapter11.order','chapter11.ending','chapter11.after','chapter11.complete','chapter12.departure','chapter12.emerald','chapter12.flat','chapter12.straits','chapter12.sister','chapter12.night','chapter12.complete','chapter13.brief','chapter13.week','chapter13.answer','chapter13.thursday','chapter13.after','chapter13.morning','chapter13.complete',
'chapter4.entry','chapter4.consequences','chapter4.resource','chapter4.assignment','chapter4.room','chapter4.assessment','chapter4.interest','chapter4.outside','chapter4.favor','chapter4.notice','chapter4.power','chapter4.intimacy','chapter4.handoff','chapter4.privateAccess','chapter4.complete',
  'chapter3.marcusRecord','chapter3.marcusLeverage','chapter3.institutional','chapter3.reviewQualification','chapter3.truths','chapter3.disclosure','chapter3.calendar','chapter3.departure',
  'chapter3.invitation', 'chapter3.verifyOffer', 'chapter3.executive', 'chapter3.executiveWork', 'chapter3.reception', 'chapter3.photograph', 'chapter3.opportunityEnd',
  'chapter3.morningPlan', 'chapter3.voss', 'chapter3.vossPlan', 'chapter3.rook', 'chapter3.rookCompare', 'chapter3.rookReply', 'chapter3.informationEnd',
  'mission.home',
  'mission.homePresentation',
  'mission.homeContact',
  'mission.cover',
  'mission.car',
  'mission.arrival',
  'mission.reception',
  'mission.elevator',
  'mission.entry',
  'mission.marcus',
  'mission.marcusReply',
  'mission.celeste',
  'mission.celesteReply',
  'mission.hub',
  'mission.leadReview',
  'mission.leadResult',
  'mission.leadRead',
  'mission.assessment',
  'mission.assessmentReview',
  'mission.method',
  'mission.exchange',
  'mission.confrontation',
  'mission.escape',
  'mission.debrief',
  'mission.debriefReply',
  'mission.warning1',
  'mission.warning2',
  'mission.warning3',
  'mission.garage',
  'mission.complete',
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
  'chapter3.home',
  'chapter3.surveillance',
  'chapter3.complete',
  'chapter3.mayaContact',
  'chapter3.mayaTalk',
  'chapter3.mayaClose',
  'chapter3.pressure',
  'chapter3.mayaFollowup',
  'chapter3.rest',
  'chapter3.nightComplete',
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
export { CharacterSchema } from './character-schema';
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
