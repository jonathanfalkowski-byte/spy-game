import { z } from 'zod';
export const LeadSchema = z.enum([
  'guest',
  'service',
  'celeste',
  'marcus',
  'security',
  'staff',
  'restricted',
]);
export type Lead = z.infer<typeof LeadSchema>;
export const SourceSchema = z.enum(['benton', 'priya', 'celeste', 'insufficient']);
export const MethodSchema = z.enum(['audio', 'photo', 'token']);
export const MissionSchema = z
  .object({
    completed: z.array(z.string().max(80)).max(100),
    entry: z.enum(['marcus', 'exits', 'mute', 'reflection']).nullable(),
    channel: z.enum(['live', 'muted', 'closed']),
    marcus: z.enum(['poised', 'challenge', 'warm', 'hand']).nullable(),
    celeste: z.enum(['bluff', 'redirect', 'boundary', 'memory']).nullable(),
    scrutiny: z.number().int().min(0).max(20),
    leads: z.array(LeadSchema).max(2),
    remaining: z.number().int().min(0).max(2),
    pending: LeadSchema.nullable(),
    draft: SourceSchema.nullable(),
    source: SourceSchema.nullable(),
    reasoning: z.enum(['supported', 'contextual', 'unsupported', 'unresolved']).nullable(),
    timing: z.enum(['timely', 'late']).nullable(),
    method: MethodSchema.nullable(),
    capture: z
      .object({
        quality: z.enum(['substantive', 'transfer', 'asset', 'fragment', 'contact', 'none']),
        owner: z.enum(['Sloane', 'Evelyn', 'none']),
        axiomAccess: z.string().max(500),
        text: z.string().max(1500),
        limits: z.string().max(1500),
      })
      .strict()
      .nullable(),
    wafer: z.enum(['marcus', 'benton']),
    token: z.enum(['benton', 'evelyn']),
    wrist: z.enum(['free', 'held', 'released']),
    extraction: z.enum(['executive', 'socialite', 'shadow']).nullable(),
    debrief: z.enum(['accuse', 'risk', 'test', 'silent']).nullable(),
    outcome: z.literal('complete').nullable(),
  })
  .strict()
  .superRefine((m, ctx) => {
    if (new Set(m.leads).size !== m.leads.length || m.remaining !== 2 - m.leads.length)
      ctx.addIssue({ code: 'custom', message: 'Investigation opportunity accounting differs' });
  });
export type MissionState = z.infer<typeof MissionSchema>;
export const initialMission = (): MissionState => ({
  completed: [],
  entry: null,
  channel: 'live',
  marcus: null,
  celeste: null,
  scrutiny: 0,
  leads: [],
  remaining: 2,
  pending: null,
  draft: null,
  source: null,
  reasoning: null,
  timing: null,
  method: null,
  capture: null,
  wafer: 'marcus',
  token: 'benton',
  wrist: 'free',
  extraction: null,
  debrief: null,
  outcome: null,
});
