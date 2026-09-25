import { z } from 'zod';
import {
  BlockSchema,
  DocIdSchema,
  RelationSchema,
  SearchSchema,
  AssessmentSchema,
  NodeSchema,
} from '../content/schema';
import { EventSchema } from './actions';
import { DayStateSchema } from './day-schema';
import { MissionSchema } from './mission-schema';
import { ClinicSchema } from './clinic-schema';
const strings = z.array(z.string().max(500)).max(500);
const observation = z
  .object({
    key: z.string().max(500),
    source: z.string().max(500),
    event: z.number().int().nonnegative(),
  })
  .strict();
const npc = z
  .object({ known: z.array(observation).max(500), beliefs: z.array(observation).max(500) })
  .strict();
export const InferenceSchema = z
  .object({
    pair: z.string(),
    relation: RelationSchema,
    result: z.enum(['supported', 'uncertain', 'rejected']),
    text: z.string().max(3000),
    event: z.number().int().positive(),
  })
  .strict();
export const QualitySchema = z.enum(['supported', 'weak', 'incorrect', 'unresolved']);
export const ReportSchema = z
  .object({
    assessment: AssessmentSchema,
    quality: QualitySchema,
    text: z.string(),
    feedback: z.string(),
    documents: z.array(DocIdSchema),
    connections: z.array(InferenceSchema),
    search: SearchSchema.nullable(),
    recipient: z.literal('benton'),
    event: z.number().int().positive(),
  })
  .strict();
export const StateSchema = z
  .object({
    contentRevision: z.union([z.literal(12), z.literal(13), z.literal(14), z.literal(15), z.literal(16), z.literal(17), z.literal(18), z.literal(19), z.literal(20)]).optional(),
    scene: z.enum([
      'apartment',
      'commute',
      'office',
      'helix',
      'maya',
      'ending',
      'file',
      'security',
      'sloane',
      'refusal',
      'release',
      'evening',
      'warning',
      'dayend',
      'clinic',
      'mission',
      'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9', 'chapter10', 'chapter11',
    ]),
    day: DayStateSchema,
    clinic: ClinicSchema,
    mission: MissionSchema,
    phase: z.string().max(30),
    revision: z.number().int().nonnegative(),
    choices: z.record(z.string().max(40), z.string().max(80)),
    inspected: strings,
    documents: z.array(DocIdSchema).max(4),
    facts: strings,
    claims: strings,
    inferences: z.array(InferenceSchema).max(1000),
    proof: z
      .array(z.object({ key: z.string(), source: z.string(), owner: z.string() }).strict())
      .max(50),
    knowledge: strings,
    npcs: z
      .object({
        daniel: npc,
        benton: npc,
        maya: npc,
        sloane: npc,
        marcus: npc,
        voss: npc,
        celeste: npc,
        // Revision 19 onward; older saves have no Sebastian record.
        sebastian: npc.optional(),
        // Created only at chapter6.begin (never earlier: Chapter 3-5 sends must not record into it).
        rook: npc.optional(),
      })
      .strict(),
    relationships: z
      .object({
        mayaTrust: z.number().int(),
        credibility: z.number().int(),
        bond: z.enum(['friend', 'love', 'colleague']).nullable(),
      })
      .strict(),
    opportunities: z.number().int().min(0).max(1),
    investigation: SearchSchema.nullable(),
    selected: z.array(DocIdSchema).max(2),
    feedback: z.string().max(4000),
    hintUsed: z.boolean(),
    draft: AssessmentSchema.nullable(),
    report: ReportSchema.nullable(),
    history: z
      .array(z.object({ node: NodeSchema, blocks: z.array(BlockSchema) }).strict())
      .max(1000),
    ledger: z.array(EventSchema).max(10000),
  })
  .strict()
  .superRefine((s, ctx) => {
    if (!NodeSchema.safeParse(`${s.scene}.${s.phase}`).success)
      ctx.addIssue({ code: 'custom', message: 'Unknown scene phase' });
    if (s.revision !== s.ledger.length)
      ctx.addIssue({ code: 'custom', message: 'Revision and ledger length differ' });
    for (const list of [s.documents, s.selected, s.facts, s.claims, s.knowledge, s.inspected])
      if (new Set(list).size !== list.length)
        ctx.addIssue({ code: 'custom', message: 'Duplicate state entry' });
    if (s.selected.some((id) => !s.documents.includes(id)))
      ctx.addIssue({ code: 'custom', message: 'Unread evidence selected' });
  });
type ParsedState = z.infer<typeof StateSchema>;
export type NpcRecord = z.infer<typeof npc>;
/** Sebastian (revision 19) and Rook (Chapter 6) are optional at runtime and deliberately absent
 * from the typed NPC keys, so existing keyed NPC code (including frozen engines) is unchanged.
 * Reach them only through optionalNpc(). */
export type OptionalNpcId = 'sebastian' | 'rook';
export type GameState = Omit<ParsedState, 'npcs'> & { npcs: Omit<ParsedState['npcs'], OptionalNpcId> };
export const optionalNpc = (s: GameState, id: OptionalNpcId): NpcRecord | undefined =>
  (s.npcs as ParsedState['npcs'])[id];
export const sebastianNpc = (s: GameState) => optionalNpc(s, 'sebastian');
