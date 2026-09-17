import { z } from 'zod';
import { BlockSchema, NodeSchema, paragraph as p, thought as t, speech as s } from './schema';

export const Chapter3ChoiceSchema = z.object({
  id: z.string().regex(/^chapter3\.[a-z0-9-]+$/),
  node: z.enum(['chapter3.home', 'chapter3.surveillance']),
  next: NodeSchema,
  label: z.string().min(1),
  hint: z.string().min(1),
  repeat: z.boolean().optional(),
}).strict();
export type Chapter3Choice = z.infer<typeof Chapter3ChoiceSchema>;
export const chapter3Choices = Chapter3ChoiceSchema.array().parse([
  { id: 'chapter3.mirror', node: 'chapter3.home', next: 'chapter3.home', label: 'Look in the mirror', hint: 'Notice the presentation you chose without deciding what it means.' },
  { id: 'chapter3.clothing', node: 'chapter3.home', next: 'chapter3.home', label: 'Handle the clothes', hint: 'Separate mission requirements from the choices you made beyond them.' },
  { id: 'chapter3.evidence', node: 'chapter3.home', next: 'chapter3.home', label: 'Check what came back with you', hint: 'Review only evidence you actually retained.' },
  { id: 'chapter3.phone', node: 'chapter3.home', next: 'chapter3.surveillance', label: 'Set the monitored phone down', hint: 'The apartment is quiet. The device is not private.' },
  { id: 'chapter3.confirm', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Confirm you are home', hint: 'Give Sloane the smallest answer that closes the check-in.' },
  { id: 'chapter3.scope', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Ask who receives the entry record', hint: 'Request the reporting path before deciding what to say.' },
  { id: 'chapter3.challenge', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Challenge the monitoring', hint: 'Question the institutional justification without inventing a threat.' },
  { id: 'chapter3.withhold', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Leave the message unanswered', hint: 'Silence leaves the check-in unresolved.' },
]);

export const chapter3Scenes = [
  { id: 'chapter3.home' as const, title: 'Home after Glass House', place: '19:52 · Adrian’s apartment', blocks: [
    p('The driver waits until you have settled before asking for the residential address. He knows the route, not what happened upstairs. At the building, the restricted badge opens the lobby reader after a longer pause than it used to require.'),
    p('Inside, the tower remains visible beyond the rain. The apartment has the same narrow rooms, the same chair by the window, the same jacket that once meant a day at the office. The difference is what your body and belongings now make each room ask.'),
    t('No one is giving me the next instruction. For a few minutes, that feels like freedom. Then I notice the phone, and the feeling acquires a limit.'),
    p('You can look at what you brought back, notice the presentation you selected, or put the monitored phone down. These observations record what you do; they do not decide what Evelynn means to you.'),
  ] },
  { id: 'chapter3.surveillance' as const, title: 'The door was recorded', place: '19:59 · Residential entry', blocks: [
    p('The phone wakes with a single controlled vibration. Sloane’s message contains the time your restricted badge entered the residence. The source is named: the residential access record was forwarded to Executive Intelligence’s active-compromise review.'),
    s('Victoria Sloane', '“Confirm that you are home. The access record closes the movement log; it does not tell me what you do inside.”'),
    t('She has a reason for knowing this. I still hate that she knows it.'),
    p('You can confirm arrival, ask who receives the record, challenge the scope, or leave the request unanswered. Nothing in the message establishes knowledge of your thoughts, private conversations, or what you chose to examine.'),
  ] },
  { id: 'chapter3.complete' as const, title: 'A room with a boundary', place: '20:04 · Scene 1 complete', blocks: [
    p('The message thread closes without becoming an explanation. Axiom knows when you crossed the threshold. The room remains yours to occupy, even while the infrastructure around it reports that you arrived.'),
    p('Scene 1 ends here. Maya, Voss and the next decision remain ahead. Your reply, your silence and the evidence you carried forward are recorded for the next scene.'),
  ] },
];
export const chapter3SceneById = Object.fromEntries(chapter3Scenes.map((s) => [s.id, s]));
