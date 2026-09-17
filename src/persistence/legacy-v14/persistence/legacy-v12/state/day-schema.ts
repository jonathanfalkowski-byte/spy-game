import { z } from 'zod';
export const DayRecordSchema = z
  .object({
    key: z.string(),
    layer: z.enum(['fact', 'claim']),
    text: z.string(),
    source: z.string(),
    event: z.number().int().nonnegative(),
  })
  .strict();
export const DayStateSchema = z
  .object({
    fileActions: z.array(z.enum(['report', 'delete', 'trace'])).max(3),
    directorySeen: z.boolean(),
    biometric: z.boolean(),
    phone: z.enum(['personal', 'confiscated', 'returned', 'monitored']),
    badge: z.enum(['employee', 'suspended', 'retained', 'restricted']),
    employment: z.enum(['active', 'suspended', 'terminated']),
    housing: z.enum(['subsidized', 'notice30']),
    records: z.array(DayRecordSchema).max(100),
    exposure: z
      .array(
        z
          .object({ key: z.string(), source: z.string(), event: z.number().int().positive() })
          .strict(),
      )
      .max(50),
    completed: z.array(z.string()).max(100),
    security: z.enum(['comply', 'reason', 'maya']).nullable(),
    intro: z.enum(['arrest', 'planted', 'counsel', 'silent']).nullable(),
    leverage: z.enum(['need', 'fight', 'maya']).nullable(),
    questions: z.array(z.enum(['insider', 'why'])).max(2),
    attention: z.enum(['evelyn', 'sloane', 'exit']).nullable(),
    operation: z.enum(['accepted', 'refused']).nullable(),
    refusedOnce: z.boolean(),
    evening: z.enum(['meet', 'call', 'avoid']).nullable(),
    disclosure: z.enum(['medical', 'security', 'lie']).nullable(),
    closure: z.enum(['checkin', 'evelyn', 'distance']).nullable(),
    outcome: z.enum(['cautious', 'walkaway', 'accepted']).nullable(),
  })
  .strict();
export const initialDay = (): z.infer<typeof DayStateSchema> => ({
  fileActions: [],
  directorySeen: false,
  biometric: false,
  phone: 'personal',
  badge: 'employee',
  employment: 'active',
  housing: 'subsidized',
  records: [],
  exposure: [],
  completed: [],
  security: null,
  intro: null,
  leverage: null,
  questions: [],
  attention: null,
  operation: null,
  refusedOnce: false,
  evening: null,
  disclosure: null,
  closure: null,
  outcome: null,
});
