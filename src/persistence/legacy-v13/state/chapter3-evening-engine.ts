import type { GameState } from './schema';
import { eveningChoices, eveningBlocks, followupText } from '../content/chapter3-evening';
import {
  pressureSource,
  identityDisclosure,
  homeDisclosure,
  mayaKnowsAdaptation,
} from './chapter3-provenance';
import { paragraph as p, speech as q, type Block, type NodeId } from '../content/schema';

export function applyEveningChoice(state: GameState, s: GameState, id: string): boolean {
  const choice = eveningChoices(state).find((c) => c.id === id);
  if (!choice) return false;
  const response: Block[] = [];
  const record = (key: string, text: string, source: string, layer: 'fact' | 'claim' = 'fact') => {
    s.day.records.push({ key: 'chapter3.' + key, text, source, layer, event: s.revision });
    s.knowledge.push('chapter3.' + key);
    (layer === 'fact' ? s.facts : s.claims).push('chapter3.' + key);
  };
  const know = (npc: 'maya' | 'sloane', text: string, source: string) =>
    s.npcs[npc].known.push({ key: text, source, event: s.revision });
  const maya = (text: string, message = false) => {
    const source =
      'Evelynn’s delivered Scene 2 ' + (message ? 'message' : 'call') + ' on the monitored phone';
    response.push(q(message ? 'You · message' : 'You', text));
    know('maya', text, source);
    s.day.exposure.push({
      key: id,
      source: 'Axiom monitoring of the phone: ' + text,
      event: s.revision,
    });
    record(id.split('.')[1], text, source);
  };
  const sloane = (text: string) => {
    response.push(q('You · message', text));
    know('sloane', text, 'Evelynn’s delivered Scene 2 response');
    record(id.split('.')[1], text, 'Delivered response to Sloane');
  };
  s.day.completed.push(id);
  switch (id) {
    case 'chapter3.call':
      maya('It’s Adrian. This phone is monitored. Can you talk for a few minutes?');
      response.push(
        q(
          'Maya',
          mayaKnowsAdaptation(state)
            ? 'Yes. I read your message. Give me a moment to put this down.'
            : 'Adrian? All right. Give me a moment.',
        ),
      );
      break;
    case 'chapter3.no-contact':
      record(
        'no-contact',
        'Evelynn chose not to call Maya tonight. No message or new arrangement was delivered.',
        'Private contact decision',
      );
      response.push(p('You close the contact without placing the call. The room remains quiet.'));
      break;
    case 'chapter3.apologize':
      maya('I missed the 06:30 call we arranged. I’m sorry I left you waiting.');
      response.push(
        q(
          'Maya',
          'I was worried. Thank you for saying it. I don’t want another time unless you mean to keep it.',
        ),
      );
      break;
    case 'chapter3.correct-account':
      maya(
        'When I said I was only tired from Benton’s assignment, that wasn’t the whole truth. Security had taken my phone.',
      );
      response.push(
        q(
          'Maya',
          'Then say there are things you won’t tell me. I can work with a limit. I can’t make decisions around an explanation you know is false.',
        ),
      );
      break;
    case 'chapter3.tell-identity':
      maya(identityDisclosure);
      response.push(
        q(
          'Maya',
          'You’re telling me this happened to you, today. I heard you. I’m not going to pretend I know what it felt like.',
        ),
      );
      break;
    case 'chapter3.tell-home':
      maya(homeDisclosure);
      response.push(q('Maya', 'All right. Home is something I can understand. Have you eaten?'));
      break;
    case 'chapter3.tell-boundary':
      maya('I can’t explain more tonight. I wanted to hear you, not ask you to investigate.');
      response.push(q('Maya', 'Then we can have a few minutes without making it an assignment.'));
      break;
    case 'chapter3.arrange-contact':
      maya('Can I call you tomorrow at 06:45? A short call, no investigation.');
      response.push(
        q(
          'Maya',
          'Yes. Call me at 06:45 tomorrow. Just the call. I’m not agreeing to look anything up.',
        ),
        q('You', '06:45. Goodnight.'),
        q('Maya', 'Goodnight.'),
      );
      know(
        'maya',
        'Agreed: Evelynn will call Maya tomorrow at 06:45, with no investigation requested.',
        'Explicit proposal and Maya’s spoken acceptance',
      );
      record(
        'next-contact',
        'Maya explicitly accepted Evelynn’s proposal to call tomorrow at 06:45; no investigation promised.',
        'Both participants’ spoken agreement on the monitored call',
      );
      record(
        'call-closed',
        'The call with Maya ended with a goodbye.',
        'Both participants’ spoken goodbye',
      );
      break;
    case 'chapter3.close-call':
      maya('Thank you for answering. Goodnight.');
      response.push(q('Maya', 'Goodnight. Get something to eat.'));
      record(
        'call-closed',
        'The call ended without a new arrangement.',
        'Both participants’ spoken goodbye',
      );
      break;
    case 'chapter3.pressure-challenge':
      sloane('That record does not establish misconduct. Don’t use Maya to secure my cooperation.');
      break;
    case 'chapter3.pressure-scope':
      sloane(
        'Give me the source and scope of that claim. Is there a separate disciplinary notice?',
      );
      break;
    case 'chapter3.pressure-distance':
      sloane('I am giving you no further account of my personal contacts tonight.');
      break;
    case 'chapter3.pressure-limited':
      sloane('The contact described in that record occurred. That is the extent of my account.');
      break;
    case 'chapter3.pressure-warn':
    case 'chapter3.pressure-truth':
      sloane('I have read the reference. I am closing this exchange now.');
      break;
    case 'chapter3.access-scope':
      sloane('Please put the current access status and scope in writing.');
      break;
    case 'chapter3.access-challenge':
      sloane('A pending review does not justify leaving my access restricted indefinitely.');
      break;
    case 'chapter3.access-decline':
      sloane('I am making no additional report tonight.');
      break;
    case 'chapter3.send-followup':
      maya(followupText(state), true);
      response.push(
        q(
          'Maya · message',
          state.day.completed.includes('chapter3.pressure-truth')
            ? 'I read that. I won’t pretend it is a small thing. You don’t have to explain the rest tonight.'
            : 'I’ll decide how to answer if someone asks me. I’m not doing voluntary lookups for you. That doesn’t mean I won’t talk to you.',
        ),
      );
      record(
        'followup-closed',
        'Maya acknowledged the message. No new contact time or promise of investigative help was agreed.',
        'Maya’s delivered reply',
      );
      break;
    case 'chapter3.withhold-followup':
      record(
        'followup-withheld',
        'Evelynn left the follow-up unsent. Any existing agreement remains unchanged.',
        'Private decision; no delivery',
      );
      response.push(p('You close the draft. No sent mark appears beside it.'));
      break;
    case 'chapter3.sleep':
      record(
        'overnight',
        'Evelynn ate, changed and rested at home. No further treatment or new agreement occurred.',
        'Overnight actions',
      );
      response.push(
        p(
          'You wash the plate, change out of the reception clothes and set the phone where you can reach it. Sleep arrives unevenly, then stays.',
        ),
      );
      break;
    default:
      return false;
  }
  if (state.phase === 'pressure') {
    const tier = pressureSource(state);
    if (tier === 'access') {
      const text =
        'The existing restriction remains in place while the review is pending. This message does not change your employment or housing status. I am closing the channel for tonight.';
      response.push(q('Sloane · message', text));
      record('access-status', text, 'Sloane’s written status response', 'claim');
    } else {
      const text =
        (tier === 'lookup'
          ? 'The reference is the 12:14 personnel-directory entry already displayed in the incident review.'
          : 'The reference is the Security incident entry recording your delivered warning and its recipient.') +
        ' I have no separate disciplinary notice for Reyes to show you. I cannot promise what questions the review will ask. That is all for tonight.';
      response.push(q('Sloane · message', text));
      record(
        'pressure-limit',
        text,
        'Sloane’s written scope response; not a guarantee of immunity',
        'claim',
      );
    }
    record(
      'sloane-closed',
      'Sloane’s Scene 2 exchange ended. No new disciplinary action, employment bargain or housing deadline was established.',
      'Completed message exchange',
    );
  }
  s.history.push({
    node: choice.node,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }, ...response],
  });
  s.phase = choice.next.split('.')[1];
  if (choice.next !== choice.node) s.history.push({ node: choice.next, blocks: eveningBlocks(s) });
  if (s.phase === 'pressure') {
    const tier = pressureSource(s);
    record(
      'pressure-source',
      tier === 'lookup'
        ? 'Sloane cited the original 12:14 Voss query.'
        : tier === 'warning'
          ? 'Sloane cited the delivered Security warning.'
          : 'Sloane discussed Evelynn’s existing restricted access.',
      'Sloane’s delivered Scene 2 message',
    );
    if (tier !== 'access')
      record(
        'pressure-claim',
        tier === 'lookup'
          ? 'Sloane says the review may ask why Maya queried Voss.'
          : 'Sloane says the review may ask Maya what she was told.',
        'Sloane’s assessment, not a misconduct finding',
        'claim',
      );
  }
  s.feedback = 'Your response is recorded.';
  return true;
}
