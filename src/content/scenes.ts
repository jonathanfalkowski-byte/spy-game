import {
  SceneSchema,
  paragraph as p,
  thought as t,
  speech as s,
  type Block,
  type NodeId,
} from './schema';
import { sceneById as historicalSceneById } from '../persistence/legacy-v13/content/scenes';
import { choiceById } from './dialogue';
import type { GameState } from '../state/schema';
import { dayScenes, dayBlocks } from './day';
import { missionScenes, missionBlocks } from './mission';
import { missionPresentation } from './mission-presentation';
import { clinicScenes, clinicBlocks } from './clinic';
import { chapter5Blocks,chapter5Scenes } from './chapter5';
import { chapter6Blocks, chapter6Scenes } from './chapter6';
import { chapter7Blocks, chapter7Scenes } from './chapter7';
import { chapter8Blocks, chapter8Scenes } from './chapter8';
import { chapter9Blocks, chapter9Scenes } from './chapter9';
import { chapter10Blocks, chapter10Scenes } from './chapter10';
import { chapter11Blocks, chapter11Scenes } from './chapter11';
import { chapter12Blocks, chapter12Scenes } from './chapter12';
import { chapter4Blocks, chapter4Scenes } from './chapter4';
import { chapter3Blocks, chapter3Scenes } from './chapter3';
import { isCurrentAuthoringRevision } from './revision';

export const inspections = [
  {
    id: 'mirror',
    title: 'Bathroom mirror',
    text: 'Thirty-four. Eleven years at Axiom. Senior analyst for four of them. Still waiting for someone else to decide I am ready.',
  },
  {
    id: 'lease',
    title: 'Axiom housing notice',
    text: 'The apartment is subsidized through Axiom. Leave the company and the lease converts to market rate after thirty days. At least they cannot take it overnight.',
  },
  {
    id: 'medical',
    title: 'Medical package',
    text: 'Annual endocrine screening. Axiom calls it preventative care. I do not remember requesting the extended panel.',
  },
  {
    id: 'jacket',
    title: 'Jacket in the closet',
    text: 'I bought that jacket six months ago and have invented a reason not to wear it every morning since.',
  },
] as const;
const mayaIntro =
  'Maya Reyes. Corporate compliance investigator. We met during my first year at Axiom. A decade of bad coffee, sealed investigations and knowing when the other person is lying. She is not my boss. What she means to me is harder to name.';
export const scenes = SceneSchema.array().parse([
  ...dayScenes,
  ...clinicScenes,
  ...missionScenes,
  ...chapter3Scenes,
  ...chapter4Scenes,
  ...chapter5Scenes,
  ...chapter6Scenes,
  ...chapter7Scenes,
  ...chapter8Scenes,
  ...chapter9Scenes,
  ...chapter10Scenes,
  ...chapter11Scenes,
  ...chapter12Scenes,
  {
    id: 'apartment.bond',
    title: 'Promotion day',
    place: '06:42 · Adrian’s apartment',
    blocks: [
      p(
        'Rain moves across the windows. Axiom Tower is visible from almost every room, which is either convenient or deliberate.',
      ),
      t(
        'Benton said the deputy director decision would be waiting this morning. For three years, I have done half the job without the title. Today is supposed to correct that.',
      ),
      p('Your phone lights up on the counter. Maya’s message waits beneath the time.'),
      s('Maya · message', 'Drinks tonight? And don’t tell me you’re working late. Again.'),
      t(mayaIntro),
    ],
  },
  {
    id: 'apartment.reply',
    title: 'A person outside the work',
    place: '06:44 · Adrian’s apartment',
    blocks: [
      s('Maya · message', 'Drinks tonight? And don’t tell me you’re working late. Again.'),
      p('The message is still waiting for an answer.'),
    ],
  },
  {
    id: 'apartment.departure',
    title: 'The tower is waiting',
    place: 'Morning · Adrian’s apartment',
    blocks: [
      p(
        'Your jacket waits in the closet. Beyond the windows, Axiom Tower remains framed by the rain.',
      ),
    ],
    next: 'commute.arrival',
    continueLabel: 'Leave for Axiom',
  },
  {
    id: 'commute.arrival',
    title: 'From home to Axiom',
    place: '08:10 · Axiom arrival',
    blocks: [
      p(
        'You pocket your phone and pull on your usual coat. Outside, rain gathers along the curb. Axiom Tower disappears behind the nearer buildings, then rises above you as you join the employees filing through its doors.',
      ),
      p(
        'Most of the lobby belongs to security. Glass partitions channel the morning queue into screening lanes beneath a bank of cameras. Uniformed guards watch the scanners; beyond them, a second line of locked gates separates the public entrance from the elevators.',
      ),
      p(
        'You set your phone and coat in a tray, pass your employee badge over the reader and wait on the floor marker while the camera checks your face. A guard watches your belongings move through the scanner. Only when both checks clear does the gate release.',
      ),
      t('Eleven years. I still wait for the green light before reaching for my things.'),
      p(
        'You collect your coat and phone, then badge through the inner gate. The elevator carries you to Strategic Intelligence. When its doors open, voices and the low hum of terminals reach you. Daniel is waiting beside your desk.',
      ),
    ],
    next: 'office.daniel',
    continueLabel: 'Approach your desk',
  },
  {
    id: 'office.daniel',
    title: 'Someone else’s promotion',
    place: '08:11 · Strategic Intelligence',
    blocks: [
      p(
        'Daniel Kessler is waiting beside your desk, making no effort to pretend the meeting is accidental. Thirty-two, long-limbed and permanently one button short of Axiom’s dress code, he has dark curls that resist corporate grooming and a face that usually gives away the joke before he tells it. There is no joke this morning.',
      ),
      s(
        'Daniel Kessler',
        'He lowers his voice. “They gave it to Priya. Benton says you’re too valuable where you are.”',
      ),
      t(
        'Daniel has worked two desks over from me for four years. Clever, indiscreet, kinder than he wants anyone to notice. I am grateful he told me himself—and angry that I am hearing it from him instead of Benton.',
      ),
    ],
  },
  {
    id: 'office.benton',
    title: 'The work remains',
    place: '08:14 · Adrian’s desk',
    blocks: [
      p(
        'Daniel pushes away from the desk divider and leaves you with the news. Before you can sit, the smoked-glass door of the director’s office opens. Elias Benton crosses the intelligence floor carrying a thin black data slate. Conversations soften as he passes.',
      ),
      p(
        'Benton is fifty-eight, compact and silver-haired, his charcoal suit so precisely fitted that it seems less like clothing than policy. He never hurries. He has built a career out of making everyone else adjust their pace to his.',
      ),
      s(
        'Director Elias Benton',
        'He stops at the edge of your desk rather than calling you into his office. “Vale. Helix is buying Novagen Bio. I need the acquisition logic and risk exposure before lunch. Keep it narrow.”',
      ),
      t(
        'Benton has supervised me for four years. He praises precision when it protects him and calls it overthinking when it does not. He has not mentioned the promotion, and his arrival makes disappointment harden into suspicion. He almost never brings an assignment to someone’s desk himself.',
      ),
    ],
  },
  {
    id: 'office.departure',
    title: 'What Benton leaves behind',
    place: '08:16 · Adrian’s desk',
    blocks: [
      p(
        'Benton returns across the floor to his office. The Helix acquisition file wakes on the slate. Deadline: 12:00. Distribution: Benton only.',
      ),
    ],
    next: 'helix.brief',
    continueLabel: 'Open the Helix brief',
  },
  {
    id: 'helix.brief',
    title: 'A routine acquisition',
    place: '08:18 · Axiom Strategic Intelligence',
    blocks: [
      p(
        'Helix Corporation is acquiring Novagen Bio. Benton’s brief gives a simple rationale: Helix wants its adaptive-cell patents. The deal sponsor is Marcus Chen, Helix Director of Strategic Acquisitions. Benton wants a narrow risk note before lunch.',
      ),
      t(
        'Marcus Chen buys distressed companies, keeps what Helix values and sells the remains. I know the reputation, not the man. His name alone does not make this unusual. Benton carrying the file to my desk does.',
      ),
      p(
        'Your task is to assess the acquisition logic. Establish what the records prove before deciding what they mean.',
      ),
    ],
    next: 'helix.documents',
    continueLabel: 'Open case records',
  },
  {
    id: 'helix.documents',
    title: 'Read the record',
    place: 'Casework · Source documents',
    blocks: [
      p(
        'Each source can establish a fact, repeat a claim or introduce uncertainty. Read at least two records before analysis. You can keep reviewing the documents while you work.',
      ),
    ],
    next: 'helix.analysis',
    continueLabel: 'Analyze the evidence',
  },
  {
    id: 'helix.analysis',
    title: 'What do the records support?',
    place: 'Casework · Analytical workspace',
    blocks: [
      p(
        'Select two records you have read, then describe their relationship. Experimenting is free. You can retry, ask for a hint, investigate once, or review an assessment for submission.',
      ),
      t(
        'Benton wants an answer, not a catalogue. But an answer built on the wrong relationship is worse than admitting I do not know.',
      ),
    ],
  },
  {
    id: 'helix.review',
    title: 'Before you send',
    place: '11:53 · Assessment review',
    blocks: [
      p(
        'The morning has narrowed to the minutes left before lunch. Review your conclusion and attachments below. Submitting sends them to Benton and closes this investigation. You can still revise before committing.',
      ),
    ],
  },
  {
    id: 'helix.submitted',
    title: 'Your judgment is on the record',
    place: '11:54 · Assessment submitted',
    blocks: [
      p(
        'The report leaves your terminal addressed to Benton only. Your selected conclusion remains in it, with the records you reviewed and the connections you recorded.',
      ),
    ],
    next: 'maya.promotion',
    continueLabel: 'Look up from the terminal',
  },
  {
    id: 'maya.promotion',
    title: 'Maya brings coffee',
    place: '12:06 · Axiom office floor',
    blocks: [
      p(
        'Maya Reyes crosses from the compliance wing carrying two paper cups. Thirty-three, with warm brown skin and watchful dark eyes, she wears her black hair in a loose knot and has turned back the cuffs of her navy suit. The small rebellion suits her. She sets one cup beside your terminal and keeps the other. No greeting. This is an old ritual.',
      ),
      s(
        'Maya Reyes',
        '“Daniel told me about Priya. And before you start defending everyone involved—how are you?”',
      ),
    ],
  },
  {
    id: 'maya.invitation',
    title: 'Tonight still exists',
    place: '12:08 · The conversation continues',
    blocks: [
      s(
        'Maya Reyes',
        '“Come out tonight. One drink. Try being a person instead of an Axiom function for an hour.”',
      ),
    ],
  },
  {
    id: 'maya.case',
    title: 'She notices the case',
    place: '12:10 · One more question',
    blocks: [
      p(
        'Her eyes catch the Helix and Novagen names on the report header. The details are not visible from where she stands.',
      ),
      s(
        'Maya Reyes',
        '“Helix and Novagen? Compliance cleared that as routine two weeks ago. Why is Benton putting Strategic Intelligence on it now?”',
      ),
      t(
        'That is Maya at work. She does not ask what I found. She asks why the system wanted me looking.',
      ),
    ],
  },
  {
    id: 'maya.goodbye',
    title: 'Before she goes',
    place: '12:11 · Conversation ending',
    blocks: [],
    next: 'ending.complete',
    continueLabel: 'Finish the opening',
  },
  {
    id: 'ending.complete',
    title: 'The morning stays with you',
    place: 'Opening milestone · Complete',
    blocks: [
      p(
        'The space beside your desk is quiet again. You take a sip of coffee. It is still warm. The Helix report has already left your hands.',
      ),
      p(
        'The first part of the opening is complete. Your decisions and the information you chose to share remain on the record. Review them here, or continue Adrian’s day when you are ready.',
      ),
    ],
  },
]);
export const sceneById = Object.fromEntries(scenes.map((s) => [s.id, s]));
const responseSlot: Partial<Record<NodeId, string>> = {
  'apartment.reply': 'bond',
  'apartment.departure': 'morning',
  'office.benton': 'promotion',
  'office.departure': 'benton',
  'maya.invitation': 'mayaPromotion',
  'maya.case': 'invitation',
  'maya.goodbye': 'disclosure',
};
export function sceneBlocks(state: GameState): Block[] {
  const node = `${state.scene}.${state.phase}` as NodeId;
  const authoredSceneById = isCurrentAuthoringRevision(state.contentRevision) ? sceneById : historicalSceneById;
  if (dayScenes.some((s) => s.id === node)) return dayBlocks(state);
  if (state.scene === 'chapter5') return chapter5Blocks(state);
  if (state.scene === 'chapter6') return chapter6Blocks(state);
  if (state.scene === 'chapter7') return chapter7Blocks(state);
  if (state.scene === 'chapter8') return chapter8Blocks(state);
  if (state.scene === 'chapter9') return chapter9Blocks(state);
  if (state.scene === 'chapter10') return chapter10Blocks(state);
  if (state.scene === 'chapter11') return chapter11Blocks(state);
  if (state.scene === 'chapter12') return chapter12Blocks(state);
  if (state.scene === 'chapter4') return chapter4Blocks(state);
  if (state.scene === 'chapter3') return chapter3Blocks(state);
  if (state.scene === 'mission')
    return (state.contentRevision ?? 0) >= 12 || state.mission.completed.includes('home.begin')
      ? [...missionBlocks(state), ...missionPresentation(state)]
      : missionBlocks(state);
  if (state.scene === 'clinic') {
    const content = clinicBlocks(state);
    if (node === 'clinic.face')
      content.splice(
        2,
        0,
        p(
          'The face is not the only thing that has changed. Beneath the clinic garment, your shoulders sit differently and your waist draws inward; the new balance runs through your hips and thighs. The fabric rests against a body that has been reshaped for the profile, and standing will mean learning those proportions instead of pretending they are a costume.',
        ),
      );
    return content;
  }
  const blocks: Block[] = [];
  const slot = responseSlot[node];
  const choice = slot ? choiceById[state.choices[slot]] : undefined;
  if (choice) blocks.push(...choice.response);
  if (node === 'maya.promotion') {
    const bonds: Record<string, string> = {
      friend:
        'Maya is the closest thing I have to family inside Axiom. She knows when I am lying before I decide to lie. Seeing her now loosens something in my chest I did not realize I was holding.',
      love: 'I know the exact moment friendship became something else. I have spent two years pretending I do not. Even now, hurt and angry, part of me is simply relieved that she came.',
      colleague:
        'Maya is the colleague I trust more than anyone in this building. Trust is not intimacy, even when she keeps testing the boundary. Her arrival makes me feel less alone—and that is already more dependence than I intended.',
    };
    const content = authoredSceneById[node].blocks;
    return [
      ...content.slice(0, 1),
      t(bonds[choiceById[state.choices.bond]?.value] ?? bonds.friend),
      ...content.slice(1),
    ];
  }
  if (node === 'maya.invitation') {
    const callbacks: Record<string, string> = {
      yes: '“You said absolutely this morning. I am checking that you still mean it.”',
      work: '“You said you were probably working. I am asking you to reconsider.”',
      day: '“You said it depended on how terrible the day was. I think we have our answer.”',
      ignore: '“You never answered this morning. I thought I would ask in person.”',
    };
    blocks.push(s('Maya', callbacks[choiceById[state.choices.morning]?.value] ?? callbacks.ignore));
  }
  blocks.push(...authoredSceneById[node].blocks);
  if (node === 'maya.goodbye') {
    const invitation = choiceById[state.choices.invitation]?.value;
    blocks.push(
      invitation === 'yes'
        ? s('Maya', 'She taps the desk twice. “Eight o’clock. Do not disappear.”')
        : invitation === 'maybe'
          ? p('The invitation remains open, without a promise.')
          : p('She does not press the invitation again.'),
    );
    const bond = choiceById[state.choices.bond]?.value;
    blocks.push(
      t(
        bond === 'love'
          ? 'I almost tell her. Not about the case. About the other thing. The moment passes.'
          : bond === 'friend'
            ? 'I am relieved she came. Whatever else the day has taken, it has not taken that.'
            : 'She deserves professional distance. Axiom has a way of punishing proximity.',
      ),
    );
    blocks.push(
      p(
        'Maya lifts her coffee and steps away from the desk. You watch her start back toward the compliance wing before returning to your terminal.',
      ),
    );
  }
  return blocks;
}
