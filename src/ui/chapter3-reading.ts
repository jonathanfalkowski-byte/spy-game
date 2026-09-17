import type { Block } from '../content/schema';
// Exact originating text only: no current-state lookup, retrospective knowledge,
// changed choices, or changes to frozen authored history/save authentication.
const edits: [string, string, string][] = [
  [
    'complete',
    'Scene 1 ends here. Maya, Voss and the next decision remain ahead. Your reply, your silence and the evidence you carried forward are recorded for the next scene.',
    'You can pause to review the evening, or continue to Maya’s contact.',
  ],
  [
    'nightComplete',
    'Scene 2 ends here. The clinical follow-up and later Chapter 3 scenes remain ahead.',
    'You can review the evening here, or open the morning follow-up notice.',
  ],
  [
    'nightComplete',
    'You wake before the building becomes busy. The clothes lie where you left them. Nothing in the night has authorized more treatment or settled the questions you want to ask Voss.',
    'You wake before the building becomes busy. No further treatment is booked. Your questions for Voss remain unanswered.',
  ],
  [
    'home',
    'Inside, the tower remains visible beyond the rain. The apartment has the same narrow rooms, the same chair by the window, the same jacket that once meant a day at the office. The phone is warm in your hand. Upstairs, Marcus and Celeste spoke to this face as though it came with a history you could recall.',
    'The chair is still by the window; your office jacket hangs where you left it. Marcus and Celeste spoke to this face as though you should remember them. Here, you know where everything belongs.',
  ],
  [
    'surveillance',
    'The reply field is empty. Beneath her message, the cursor waits.',
    'You open the reply field.',
  ],
  [
    'rest',
    'You make something simple to eat. The phone rests beside the keys while the food cools. There is no call demanding another decision before you finish.',
    'You make something simple to eat and finish it while the phone stays quiet.',
  ],
  [
    'rookReply',
    'The sender asks whether you checked. The patient-record request and this reply are separate transmissions. The monitored handset makes messages available to Axiom systems; it does not establish that Sloane personally read them.',
    'The sender asks whether you checked. You open the unknown-number thread on the monitored handset. There is no read receipt from Sloane.',
  ],
];
export function chapter3Reading(block: Block, node?: string): Block | undefined {
  const edit = edits.find(
    ([phase, original]) => node === 'chapter3.' + phase && block.text === original,
  );
  return edit ? { ...block, text: edit[2] } : undefined;
}
