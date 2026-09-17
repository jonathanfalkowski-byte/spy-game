import type { GameState } from '../state/schema';
import {
  pressureSource,
  mayaKnowsAdaptation,
  identityDisclosure,
  homeDisclosure,
} from '../state/chapter3-provenance';
import { paragraph as p, speech as q, thought as t, type NodeId } from './schema';

export const eveningScenes = [
  {
    id: 'chapter3.mayaContact' as const,
    title: 'What you can tell her',
    place: '20:08 · Apartment',
    blocks: [
      p(
        'Maya’s name is still in the phone. Calling would put the conversation on an Axiom-monitored device. Leaving it alone would not explain the day for you.',
      ),
    ],
  },
  {
    id: 'chapter3.mayaTalk' as const,
    title: 'The voice on the line',
    place: '20:10 · Monitored call',
    blocks: [p('The connection settles. You can hear a cup touch the surface beside her.')],
  },
  {
    id: 'chapter3.mayaClose' as const,
    title: 'An honest limit',
    place: '20:17 · Monitored call',
    blocks: [
      q('Maya', 'You can tell me you can’t explain. Don’t ask me to act as if you’ve explained.'),
    ],
  },
  {
    id: 'chapter3.pressure' as const,
    title: 'The extent of the record',
    place: '20:23 · Sloane’s message',
    blocks: [
      p(
        'The next vibration carries Sloane’s name. Her message is a new exchange; the previous check-in remains as you left it.',
      ),
    ],
  },
  {
    id: 'chapter3.mayaFollowup' as const,
    title: 'Before sending',
    place: '20:29 · Monitored message',
    blocks: [
      p(
        'Sloane’s exchange has ended. The message to Maya is still unsent. Read the exact words before deciding.',
      ),
    ],
  },
  {
    id: 'chapter3.rest' as const,
    title: 'The room after the calls',
    place: '21:05 · Apartment',
    blocks: [
      p(
        'You make something simple to eat. The phone rests beside the keys while the food cools. There is no call demanding another decision before you finish.',
      ),
    ],
  },
  {
    id: 'chapter3.nightComplete' as const,
    title: 'Morning without an answer yet',
    place: '06:15 · The following morning · Scene 2 complete',
    blocks: [
      p(
        'You wake before the building becomes busy. The clothes lie where you left them. Nothing in the night has authorized more treatment or settled the questions you want to ask Voss.',
      ),
      p('Scene 2 ends here. The clinical follow-up and later Chapter 3 scenes remain ahead.'),
    ],
  },
];
export interface EveningChoice {
  id: string;
  node: NodeId;
  next: NodeId;
  label: string;
  hint: string;
}
export function eveningChoices(s: GameState): EveningChoice[] {
  if (s.scene !== 'chapter3' || s.contentRevision !== 13) return [];
  const list: EveningChoice[] = [];
  const add = (id: string, next: string, label: string, hint: string) => {
    if (!s.day.completed.includes('chapter3.' + id))
      list.push({
        id: 'chapter3.' + id,
        node: ('chapter3.' + s.phase) as NodeId,
        next: ('chapter3.' + next) as NodeId,
        label,
        hint,
      });
  };
  if (s.phase === 'mayaContact') {
    add(
      'call',
      'mayaTalk',
      'Call Maya',
      'Start a monitored call. Identifying yourself as Adrian does not disclose the Evelynn cover identity.',
    );
    add(
      'no-contact',
      'pressure',
      'Do not call tonight',
      'Put the phone down. No message, promise or automatic relationship penalty.',
    );
  }
  if (s.phase === 'mayaTalk') {
    if (!mayaKnowsAdaptation(s))
      add(
        'tell-identity',
        'mayaClose',
        'Explain the adaptation',
        'Tell Maya: “' +
          identityDisclosure +
          '” Axiom can monitor these words; no Sloane receipt is established.',
      );
    add(
      'tell-home',
      'mayaClose',
      'Give one fact and a boundary',
      'Tell Maya: “' + homeDisclosure + '” This call is available to Axiom monitoring.',
    );
    add(
      'tell-boundary',
      'mayaClose',
      'Say you cannot explain more',
      'Tell Maya: “I can’t explain more tonight. I wanted to hear you, not ask you to investigate.” Delivered on the monitored call.',
    );
    if (s.npcs.maya.known.some((k) => k.key === 'Adrian did not answer the arranged 06:30 call'))
      add(
        'apologize',
        'mayaTalk',
        'Acknowledge the missed morning call',
        'Tell Maya: “I missed the 06:30 call we arranged. I’m sorry I left you waiting.” Monitored; acknowledgment is not automatic forgiveness.',
      );
    if (s.npcs.maya.known.some((k) => k.key === 'Adrian says he is tired from Benton’s assignment'))
      add(
        'correct-account',
        'mayaTalk',
        'Correct the earlier work excuse',
        'Tell Maya: “When I said I was only tired from Benton’s assignment, that wasn’t the whole truth. Security had taken my phone.” Monitored; the earlier account remains in the record.',
      );
  }
  if (s.phase === 'mayaClose') {
    add(
      'arrange-contact',
      'pressure',
      'Ask to call tomorrow at 06:45',
      'Say: “Can I call you tomorrow at 06:45? A short call, no investigation.” A commitment exists only if Maya accepts. Monitored.',
    );
    add(
      'close-call',
      'pressure',
      'Say goodnight without a promise',
      'Say: “Thank you for answering. Goodnight.” Close this call without scheduling another.',
    );
  }
  if (s.phase === 'pressure') {
    if (pressureSource(s) === 'access') {
      add(
        'access-scope',
        'rest',
        'Request the access status in writing',
        'Ask Sloane which existing restrictions remain. No new employment bargain.',
      );
      add(
        'access-challenge',
        'rest',
        'Challenge the access restriction',
        'Tell Sloane that the review has not justified indefinite restriction.',
      );
      add(
        'access-decline',
        'rest',
        'Decline additional reporting tonight',
        'Close this channel without changing your employment or housing record.',
      );
    } else {
      add(
        'pressure-challenge',
        'rest',
        'Challenge the use of Maya’s involvement',
        'Tell Sloane: “That record does not establish misconduct. Don’t use Maya to secure my cooperation.” She hears this objection, not private feelings.',
      );
      add(
        'pressure-scope',
        'rest',
        'Ask for the source and scope',
        'Request the existing incident reference and ask whether there is a separate disciplinary notice.',
      );
      add(
        'pressure-distance',
        'rest',
        'Withhold further disclosures tonight',
        'Tell Sloane: “I am giving you no further account of my personal contacts tonight.” This does not cancel an accepted check-in or tell Maya anything.',
      );
      add(
        'pressure-limited',
        'rest',
        'Give only a limited factual account',
        'Tell Sloane: “The contact described in that record occurred. That is the extent of my account.” No denial and no claim about the depth of the relationship.',
      );
      add(
        'pressure-warn',
        'mayaFollowup',
        'Review a warning to Maya',
        'Close Sloane’s exchange first. Review the exact source and her claim before sending on the monitored phone.',
      );
      if (!mayaKnowsAdaptation(s))
        add(
          'pressure-truth',
          'mayaFollowup',
          'Review an adaptation disclosure to Maya',
          'Close Sloane’s exchange first. Review the exact earned fact before sending on the monitored phone.',
        );
    }
  }
  if (s.phase === 'mayaFollowup') {
    add(
      'send-followup',
      'rest',
      'Send these words to Maya',
      '“' +
        followupText(s) +
        '” Axiom can monitor the message. This does not prove Sloane received it.',
    );
    add(
      'withhold-followup',
      'rest',
      'Leave the message unsent',
      'Maya learns nothing from the unsent draft. Any previously agreed call remains in place.',
    );
  }
  if (s.phase === 'rest')
    add(
      'sleep',
      'nightComplete',
      'Put the phone down and rest',
      'Eat, change and sleep. No new adaptation, obligation or deadline reset.',
    );
  return list;
}
export function followupText(s: GameState) {
  if (s.day.completed.includes('chapter3.pressure-truth')) return identityDisclosure;
  return pressureSource(s) === 'lookup'
    ? 'Sloane showed me the record of your Voss query. She says the review may ask why you made it. She says she has no separate disciplinary notice to show. That is her account, not a finding against you. This phone is monitored.'
    : 'The warning I sent you before Security took my phone is in the incident record. Sloane says you may be asked what I told you. She says she has no separate disciplinary notice to show. This phone is monitored.';
}
export function eveningBlocks(s: GameState) {
  const blocks = [...eveningScenes.find((x) => x.id === 'chapter3.' + s.phase)!.blocks];
  if (s.phase === 'mayaContact')
    blocks.push(
      t(
        s.relationships.bond === 'love'
          ? 'I want her voice in the room. Wanting that does not decide what I tell her.'
          : 'I turn the phone over once, then back. I can choose whether to call.',
      ),
    );
  if (s.phase === 'mayaTalk')
    blocks.push(
      q(
        'Maya',
        mayaKnowsAdaptation(s)
          ? 'How did the day end? Are you somewhere you can sit down?'
          : 'You sound different. I’m listening. What can you tell me?',
      ),
    );
  if (s.phase === 'pressure') {
    const tier = pressureSource(s);
    blocks.push(
      q(
        'Sloane',
        tier === 'lookup'
          ? 'The Voss query is in the access record. If the review asks why Reyes made it, someone will need to answer.'
          : tier === 'warning'
            ? 'Your warning put Reyes in the incident record. The review may ask what she was told. I cannot answer that on her behalf.'
            : 'Your office access remains suspended. The restricted badge still covers the authorized transit and residential route. The access review is pending.',
      ),
    );
    blocks.push(
      p(
        tier === 'lookup'
          ? 'She attaches the same personnel-directory entry she displayed in her office: one query at 12:14. It establishes a query, not misconduct.'
          : tier === 'warning'
            ? 'She references the original Security incident entry recording the warning and its recipient. It does not allege a directory lookup.'
            : 'Her topic is the existing access restriction. No new order or employment agreement accompanies the message.',
      ),
    );
  }
  if (s.phase === 'nightComplete' && s.day.completed.includes('chapter3.arrange-contact'))
    blocks.push(p('The 06:45 call Maya accepted is still ahead. It has not happened yet.'));
  return blocks;
}
