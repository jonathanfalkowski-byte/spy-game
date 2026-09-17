import type { GameState } from '../state/schema';
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
  { id: 'chapter3.mirror', node: 'chapter3.home', next: 'chapter3.home', label: 'Look in the mirror', hint: 'Look at the face Marcus and Celeste claimed to recognize.' },
  { id: 'chapter3.clothing', node: 'chapter3.home', next: 'chapter3.home', label: 'Handle the clothes', hint: 'Notice what the evening left on the outfit you wore.' },
  { id: 'chapter3.evidence', node: 'chapter3.home', next: 'chapter3.home', label: 'Check what came back with you', hint: 'Review only evidence you actually retained.' },
  { id: 'chapter3.phone', node: 'chapter3.home', next: 'chapter3.surveillance', label: 'Set the monitored phone down', hint: 'The apartment is quiet. The device is not private.' },
  { id: 'chapter3.confirm', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Confirm you are home', hint: 'Give Sloane the smallest answer that closes the check-in.' },
  { id: 'chapter3.scope', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Ask who receives the entry record', hint: 'Request the reporting path before deciding what to say.' },
  { id: 'chapter3.challenge', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Challenge the monitoring', hint: 'Ask Sloane to account for using the residential log.' },
  { id: 'chapter3.withhold', node: 'chapter3.surveillance', next: 'chapter3.complete', label: 'Leave the message unanswered', hint: 'Silence leaves the check-in unresolved.' },
]);

export const chapter3Scenes = [
  { id: 'chapter3.home' as const, title: 'Home after Glass House', place: '19:52 · Adrian’s apartment', blocks: [
    p('The driver waits until you have settled before asking for the residential address. He knows the route, not what happened upstairs. At the building, the restricted badge opens the lobby reader after a longer pause than it used to require.'),
    p('Inside, the tower remains visible beyond the rain. The apartment has the same narrow rooms, the same chair by the window, the same jacket that once meant a day at the office. The phone is warm in your hand. Upstairs, Marcus and Celeste spoke to this face as though it came with a history you could recall.'),
    t('The lift is quiet now. I can still hear the quartet when I turn the key.'),
    p('You set the keys beside the window. The mirror catches the clothes you wore through the reception; the phone lights the edge of the glass.'),
  ] },
  { id: 'chapter3.surveillance' as const, title: 'The door was recorded', place: '19:59 · Residential entry', blocks: [
    p('The phone wakes with a single controlled vibration. Sloane’s message contains the time your restricted badge entered the residence. The source is named: the residential access record was forwarded to Executive Intelligence’s active-compromise review.'),
    s('Victoria Sloane', '“Confirm that you are home. The access record closes the movement log; it does not tell me what you do inside.”'),
    t('My entry time. Down to the minute. I read it again before touching the reply field.'),
    p('The reply field is empty. Beneath her message, the cursor waits.'),
  ] },
  { id: 'chapter3.complete' as const, title: 'A room with a boundary', place: '20:04 · Scene 1 complete', blocks: [
    p('The phone lies on the table. The access record remains, along with the questions it raised.'),
    p('Scene 1 ends here. Maya, Voss and the next decision remain ahead. Your reply, your silence and the evidence you carried forward are recorded for the next scene.'),
  ] },
];
export const chapter3SceneById = Object.fromEntries(chapter3Scenes.map((s) => [s.id, s]));

export function chapter3Blocks(state: GameState) {
  const scene = chapter3SceneById[('chapter3.' + state.phase) as keyof typeof chapter3SceneById];
  const blocks = [...scene.blocks];
  if (state.phase === 'complete') {
    blocks[0] = state.day.completed.includes('chapter3.withhold')
      ? p('The request remains unanswered on the screen. No follow-up arrives before you set the phone face down. The check-in is still open.')
      : state.day.completed.includes('chapter3.confirm')
        ? p('Sloane acknowledges the arrival. The check-in ends; the access record and your questions about it remain.')
        : p('Sloane has answered as far as she intends to. You have not sent the confirmation she requested. The thread remains open on the table.');
  }
  return blocks;
}
