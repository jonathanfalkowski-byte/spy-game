import { z } from 'zod';
import { DocIdSchema, RelationSchema, SearchSchema, AssessmentSchema } from '../content/schema';
const revision = { expectedRevision: z.number().int().nonnegative() };
export const ActionSchema = z.discriminatedUnion('type', [
  z.object({ ...revision, type: z.literal('CHAPTER5_CHOOSE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('CHAPTER4_CHOOSE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('MISSION_CHOOSE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('CLINIC_CHOOSE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('DAY_CHOOSE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('CHOOSE_DIALOGUE'), id: z.string().max(80) }).strict(),
  z.object({ ...revision, type: z.literal('CONTINUE') }).strict(),
  z.object({ ...revision, type: z.literal('CONTINUE_CHAPTER3') }).strict(),
  z.object({ ...revision, type: z.literal('CONTINUE_CHAPTER3_SCENE2') }).strict(),
  z.object({ ...revision, type: z.literal('CHAPTER3_CHOOSE'), id: z.string().max(80) }).strict(),
  z
    .object({
      ...revision,
      type: z.literal('INSPECT_APARTMENT'),
      id: z.enum(['mirror', 'lease', 'medical', 'jacket']),
    })
    .strict(),
  z.object({ ...revision, type: z.literal('READ_DOCUMENT'), id: DocIdSchema }).strict(),
  z.object({ ...revision, type: z.literal('TOGGLE_EVIDENCE'), id: DocIdSchema }).strict(),
  z.object({ ...revision, type: z.literal('CONNECT_EVIDENCE'), relation: RelationSchema }).strict(),
  z.object({ ...revision, type: z.literal('REQUEST_HINT') }).strict(),
  z.object({ ...revision, type: z.literal('SPEND_INVESTIGATION'), id: SearchSchema }).strict(),
  z.object({ ...revision, type: z.literal('REVIEW_ASSESSMENT'), id: AssessmentSchema }).strict(),
  z.object({ ...revision, type: z.literal('REVISE_ASSESSMENT') }).strict(),
  z.object({ ...revision, type: z.literal('SUBMIT_ASSESSMENT') }).strict(),
]);
export type Action = z.infer<typeof ActionSchema>;
export type Intent = Action extends infer A
  ? A extends Action
    ? Omit<A, 'expectedRevision'>
    : never
  : never;
export const EventSchema = z
  .object({ sequence: z.number().int().positive(), action: ActionSchema })
  .strict();
export type GameEvent = z.infer<typeof EventSchema>;
