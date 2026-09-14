import type { GameState } from './schema';
import type { Lead, MissionState } from './mission-schema';
import { availableMissionChoices, missionBlocks, findings, sourceNames } from '../content/mission';
import {
  paragraph as p,
  thought as t,
  speech as q,
  type Block,
  type NodeId,
} from '../content/schema';

export function applyMissionChoice(state: GameState, s: GameState, id: string): boolean {
  const c = availableMissionChoices(state).find((c) => c.id === id);
  if (!c) return false;
  const m = s.mission,
    value = id.split('.')[1],
    original = (state.scene + '.' + state.phase) as NodeId;
  const response: Block[] = [];
  const add = (xs: string[], v: string) => {
    if (!xs.includes(v)) xs.push(v);
  };
  const record = (key: string, layer: 'fact' | 'claim', text: string, source: string) => {
    if (s.day.records.some((r) => r.key === key)) return;
    s.day.records.push({ key, layer, text, source, event: s.revision });
    add(s.knowledge, key);
    add(layer === 'fact' ? s.facts : s.claims, key);
  };
  const know = (npc: keyof GameState['npcs'], key: string, source: string, belief = false) => {
    const xs = belief ? s.npcs[npc].beliefs : s.npcs[npc].known;
    if (!xs.some((x) => x.key === key && x.source === source))
      xs.push({ key, source, event: s.revision });
  };
  if (!c.repeat) add(m.completed, id);
  s.history.push({ node: original, blocks: [{ kind: 'notice', text: 'Your choice: ' + c.label }] });
  if (id === 'review.brief')
    response.push(
      p(
        'Marcus Chen sponsors the Novagen acquisition for Helix. Sloane alleges he is meeting an Axiom source tonight. The brief supplies a face and a role, not proof that her account is complete.',
      ),
      t(
        'I have read sentences that made men like him seem inevitable. In a few minutes I will have to interrupt one.',
      ),
    );
  if (id === 'review.credentials')
    response.push(
      p(
        'Evelyn Vale. Axiom Strategic Acquisitions. The same invitation prepared before the clinic, carrying the identity you were shown. Your chosen presentation has not replaced its records. You check the reception address and close it without changing anything.',
      ),
    );
  if (id === 'review.maya') {
    const received = [
      ...new Set(
        state.history
          .flatMap((entry) => entry.blocks)
          .filter((block) => block.kind === 'speech' && block.speaker === 'Maya · message')
          .map((block) => block.text),
      ),
    ].slice(-2);
    response.push(
      p('You reopen the existing conversation. There are no new messages.'),
      p(
        s.clinic.contact === 'identity'
          ? 'Your recovery message explicitly told Maya about the adaptation and the female identity. Seeing the words again does not tell you what she is doing now.'
          : s.clinic.contact === 'brief'
            ? 'Your last recovery message told Maya you were through the medical appointment. You did not send the identity details in that message.'
            : 'You sent no recovery update. The conversation ends where you left it.',
      ),
      p(
        s.day.closure === 'checkin'
          ? 'The arranged morning check-in is already behind you. Reading it again does not make another arrangement.'
          : 'You have made no new check-in arrangement.',
      ),
      p('You close the conversation without writing. The phone remains monitored.'),
    );
    if (received.length)
      response.splice(
        response.length - 1,
        0,
        ...received.map((text) => q('Maya · earlier message', text)),
      );
  }
  if (id.startsWith('entry.') && id !== 'entry.enter') {
    m.entry = value as MissionState['entry'];
    if (value === 'mute') {
      m.channel = 'muted';
      response.push(
        p(
          'You mute the earpiece. The small absence of Sloane’s breathing is noticeable. The phone in your hand remains on Axiom’s monitored connection. You let the quiet last until the floor indicator slows.',
        ),
      );
    }
    if (value === 'marcus')
      response.push(
        t(
          'Silver at the temples. Helix acquisitions. I keep the face in mind and leave the brief’s conclusions where they belong.',
        ),
      );
    if (value === 'exits')
      response.push(
        p(
          'The lift display marks the east bank, reception, and the public gallery. You locate the route back. A line on a floor plan is useful; it is not a promise that the way will stay clear.',
        ),
      );
    if (value === 'reflection')
      response.push(
        t(
          'The face moves when I swallow. I try resting my mouth, then looking at the doors instead. I do not have to decide what this means before they open.',
        ),
      );
  }
  if (id === 'entry.enter') {
    if (m.channel === 'muted')
      response.push(
        p(
          'You restore the earpiece before leaving the elevator. Sloane confirms the channel is live. You do not tell her what you thought during the silence.',
        ),
      );
    m.channel = 'live';
  }
  if (id.startsWith('marcus.') && ['poised', 'challenge', 'warm', 'hand'].includes(value)) {
    m.marcus = value as MissionState['marcus'];
    if (value === 'challenge') m.scrutiny++;
    const replies: Record<string, Block[]> = {
      poised: [
        q('You', 'Only the forgettable parts.'),
        q('Marcus', 'Then we remember the same evening.'),
        p(
          'He inclines his head. The answer has given him very little, but he behaves as though that is a familiar courtesy.',
        ),
      ],
      challenge: [
        q('You', 'Your memory appears more complete than mine.'),
        q('Marcus', 'Memory is often a negotiation. I had not realized ours was still open.'),
        p(
          'His attention sharpens. He looks at your eyes, then waits to see whether you will explain. You let the pause remain.',
        ),
      ],
      warm: [
        q('You', 'And yet you remembered me.'),
        q('Marcus', 'Some people make forgetting feel discourteous.'),
        p(
          'He smiles more easily. You have moved him away from the detail for the moment; you have not learned what it was.',
        ),
      ],
      hand: [
        p(
          'You offer your hand without answering. Marcus takes it, his thumb pausing at your wrist for a beat before he releases you.',
        ),
        q('Marcus', 'Still careful.'),
        p('You lower your hand. He has supplied his own meaning for the silence.'),
      ],
    };
    response.push(...replies[value]);
    know('marcus', c.label, 'Evelyn’s greeting, heard or observed in person');
    know(
      'marcus',
      value === 'challenge'
        ? 'Evelyn is guarded about the shared memory'
        : 'Evelyn may prefer to leave Singapore unspoken',
      'Marcus interprets the greeting; not verified',
      true,
    );
    record(
      'mission.singapore',
      'claim',
      'Marcus says he remembers Evelyn from Singapore.',
      'Marcus’s greeting at the Glass House',
    );
  }
  if (id === 'marcus.question') {
    response.push(
      q('You', 'What did you expect me to remember?'),
      q(
        'Marcus',
        'That you left before anyone could persuade you to stay. I would prefer not to repeat the experience.',
      ),
      p(
        'He gives you the shape of an evening without offering a detail you could check. You thank him for the warning. His smile does not tell you whether he heard the irony.',
      ),
    );
    record(
      'mission.marcus-memory',
      'claim',
      'Marcus claims Evelyn left the Singapore gathering early.',
      'Marcus’s answer to your question',
    );
    know(
      'marcus',
      'Evelyn asked what he expected her to remember',
      'Her spoken question beside the windows',
    );
  }
  if (id.startsWith('celeste.') && value !== 'close') {
    m.celeste = value as MissionState['celeste'];
    if (value === 'memory' || value === 'redirect') m.scrutiny++;
    const replies: Record<string, Block[]> = {
      bluff: [
        q('You', 'You were asleep. I was working.'),
        q('Celeste', 'That does sound like you.'),
        p(
          'Her laugh is brief and unexpectedly warm. She accepts the invented rhythm because it appears to fit someone she remembers. You cannot tell how long that advantage will last.',
        ),
      ],
      redirect: [
        q('You', 'You never told Marcus what we discussed, did you?'),
        q('Celeste', 'Not the part about Halcyon.'),
        p(
          'Marcus’s pleasant expression becomes very still. Celeste notices and leaves the sentence there.',
        ),
      ],
      boundary: [
        q('You', 'Singapore is not a conversation for tonight.'),
        q('Celeste', 'Still compartmentalizing.'),
        p(
          'There is amusement in her voice, but she removes the pressure. Marcus looks between you, allowing the apparent history to stand.',
        ),
      ],
      memory: [
        q('You', 'Remind me what you remember.'),
        q('Celeste', 'The Halcyon question. The warning about the narrow man. Have you forgotten?'),
        q('You', 'I want to hear how you remember it.'),
        p('She studies you. With Marcus beside her, she does not supply the full conversation.'),
      ],
    };
    response.push(...replies[value]);
    for (const npc of ['celeste', 'marcus'] as const)
      know(npc, c.label, 'Evelyn’s spoken reply during the reunion');
    know(
      'celeste',
      value === 'memory'
        ? 'Evelyn may be withholding her recollection'
        : 'Evelyn is keeping the reunion guarded',
      'Celeste interprets the conversation',
      true,
    );
    record(
      'mission.celeste-greeting',
      'claim',
      'Celeste greets Evelyn as someone who left before breakfast in Singapore.',
      'Celeste at the reception; Marcus introduces her as his financier',
    );
    if (value === 'redirect' || value === 'memory')
      record(
        'mission.halcyon-mention',
        'claim',
        'Celeste mentions Halcyon without explaining the earlier conversation.',
        'Celeste’s interrupted reunion; not the full investigative recollection',
      );
  }
  if (id.startsWith('lead.') && ['guest', 'service', 'celeste', 'marcus'].includes(value))
    m.pending = value as Lead;
  if (id.startsWith('read.') && value !== 'return') m.pending = value as Lead;
  if (id === 'lead.confirm') {
    const lead = m.pending!,
      f = findings[lead];
    m.leads.push(lead);
    m.remaining--;
    const compatible =
      (s.clinic.outfit === 'executive' && lead === 'guest') ||
      (s.clinic.outfit === 'socialite' && lead === 'celeste') ||
      (s.clinic.outfit === 'shadow' && lead === 'service');
    if (!compatible) m.scrutiny++;
    record('mission.lead.' + lead, f.layer, f.text, f.source);
    if (lead === 'celeste')
      know(
        'celeste',
        'Evelyn requested the words of their Singapore conversation',
        'Private conversation by the window',
      );
  }
  if (['lead.return', 'read.return', 'lead.cancel'].includes(id)) m.pending = null;
  if (id.startsWith('source.') && !['confirm', 'revise'].includes(value))
    m.draft = value as MissionState['draft'];
  if (id === 'source.confirm') {
    m.source = m.draft;
    m.reasoning =
      m.source === 'insufficient'
        ? 'unresolved'
        : m.source !== 'benton'
          ? 'unsupported'
          : m.leads.some((x) => x === 'guest' || x === 'service')
            ? 'supported'
            : m.leads.includes('celeste')
              ? 'contextual'
              : 'unsupported';
    m.timing = m.source === 'benton' ? 'timely' : 'late';
    response.push(
      q(
        'You',
        m.source === 'insufficient'
          ? 'I cannot justify a name yet.'
          : 'My assessment is ' + sourceNames[m.source!] + '.',
      ),
      q('Sloane · earpiece', 'Understood. Choose your capture method.'),
    );
    know(
      'sloane',
      'Evelyn’s submitted source assessment: ' + sourceNames[m.source!],
      'Live earpiece assessment',
    );
    // Private lead findings are not automatically transmitted with the name.
  }
  if (id.startsWith('method.')) m.method = value as MissionState['method'];
  if (id === 'exchange.follow') {
    m.wafer = 'benton';
    const timely = m.timing === 'timely';
    if (m.method === 'audio')
      m.capture = {
        quality: timely ? 'substantive' : 'fragment',
        owner: 'Sloane',
        axiomAccess: 'Sloane controls the recording; Evelyn has no independent clean copy.',
        text: timely
          ? 'The recording captures Marcus offering the handover schedule and Benton describing the concealed personnel move.'
          : 'The recording contains only fragments of the exchange.',
        limits: timely
          ? 'Their recorded agreement supports action on the concealed arrangement. The wafer’s contents are not independently authenticated.'
          : 'The fragment does not establish the full offer or agreement.',
      };
    if (m.method === 'photo')
      m.capture = {
        quality: timely ? 'transfer' : 'contact',
        owner: 'Evelyn',
        axiomAccess: 'The image is on the monitored phone and is not secret from Axiom.',
        text: timely
          ? 'The photograph shows Marcus and Benton transferring the wafer.'
          : 'The photograph shows Marcus and Benton together after the transfer.',
        limits: timely
          ? 'The frame cannot independently establish the wafer’s contents or prove espionage.'
          : 'The frame establishes contact, not the transfer or its substance.',
      };
    if (m.method === 'token') {
      m.token = timely ? 'evelyn' : 'benton';
      m.wrist = timely ? 'held' : 'free';
      m.scrutiny += 2;
      m.capture = {
        quality: timely ? 'asset' : 'none',
        owner: timely ? 'Evelyn' : 'none',
        axiomAccess: timely
          ? 'Sloane has a spoken account; Evelyn retains physical custody.'
          : 'No captured asset.',
        text: timely
          ? 'Benton’s access token is in Evelyn’s possession.'
          : 'The attempt obtained no token; Benton retained it.',
        limits:
          'An access token is separate from the wafer. Possession alone is incomplete proof of espionage.',
      };
    }
    const cap = m.capture!;
    record(
      'mission.capture',
      'fact',
      cap.text + ' ' + cap.limits,
      cap.owner === 'Sloane'
        ? 'Live recorder confirmation and your hearing of the exchange'
        : cap.owner === 'Evelyn'
          ? 'Your captured image or physical possession'
          : 'Your unsuccessful approach',
    );
    record(
      'mission.transfer',
      'fact',
      'You observed Marcus’s wafer pass to Benton. Benton pocketed it.',
      'Your observation at the service gallery; a memory is not an independent recording',
    );
    know(
      'sloane',
      cap.text,
      m.method === 'audio'
        ? 'Sloane’s recorder receives the live microphone'
        : 'Evelyn explicitly reports the capture result over the earpiece',
    );
    know(
      'marcus',
      'Evelyn is watching the gallery',
      'Marcus observes Evelyn’s attention or approach',
      true,
    );
    if (m.method === 'token')
      know(
        'benton',
        timely ? 'Evelyn took my access token' : 'Evelyn approached within reach of my jacket',
        'Benton’s direct encounter in the gallery',
      );
    if (m.method === 'audio' && timely)
      s.proof.push({
        key: 'mission.recorded-agreement',
        source:
          'The live recording captures the concealed personnel agreement, not independently verified wafer contents.',
        owner: 'Sloane',
      });
  }
  if (id === 'confrontation.leave') {
    if (m.wrist === 'held') {
      response.push(
        q('You', 'Let go. People are watching.'),
        p(
          'You keep your voice low enough that Benton has to choose whether to make the scene louder. He looks toward the gathering, then releases your wrist. The token remains closed in your other hand. You step back before he can change his mind.',
        ),
        q('Benton', 'We will finish this.'),
        p(
          'You leave the table between you. Marcus’s security signal has brought a guard toward the gallery, but has not yet closed the public floor.',
        ),
      );
      m.wrist = 'released';
    } else
      response.push(
        q('You', 'Excuse me. My car is waiting.'),
        p(
          'You step away from the gallery without asking either man to agree. Marcus watches you find a gap in the gathering. The guard has to pass around the private table before following.',
        ),
      );
    m.extraction = s.clinic.outfit as MissionState['extraction'];
  }
  if (id === 'escape.descend') {
    know(
      'marcus',
      'Evelyn may be a threat to the concealed meeting',
      'Marcus saw her observe and leave after the exchange',
      true,
    );
    record(
      'mission.exposure',
      'fact',
      'Marcus noticed your interest in the gallery and signalled security. You reached the elevator.',
      'Your observation and completed departure',
    );
    record(
      'mission.sloane-test',
      'claim',
      'Sloane says Benton was her probable source and your independent judgment was another objective.',
      'Sloane’s remote debrief; her explanation remains attributed',
    );
  }
  if (id.startsWith('debrief.') && value !== 'end') {
    m.debrief = value as MissionState['debrief'];
    if (value !== 'silent') response.push(q('You', c.label.replace(/[“”]/g, '')));
    if (value === 'accuse')
      response.push(
        q(
          'Sloane · earpiece',
          'I knew Benton was the probable source. Suspicion was not enough to move against a director. I needed proof—and I needed to see what you would do before I supplied certainty.',
        ),
      );
    if (value === 'risk') {
      response.push(
        q(
          'Sloane · earpiece',
          'Yes. The exchange was recoverable. Your first unscripted decision as Evelyn was not reproducible.',
        ),
        t('Recoverable for whom? She has not given me a way to check that.'),
      );
      record(
        'mission.recoverable',
        'claim',
        'Sloane claims the exchange was recoverable.',
        'Sloane’s reply when challenged about the risk; unverified',
      );
    }
    if (value === 'test')
      response.push(
        q(
          'Sloane · earpiece',
          'Benton was the operation. You were the reason I designed it this way.',
        ),
      );
    if (value === 'silent')
      response.push(
        p(
          'You let the elevator’s faint vibration fill the pause. Sloane waits, then gives the garage instructions without commenting on the silence. Whatever she makes of it remains hers.',
        ),
      );
    know(
      'sloane',
      value === 'silent' ? 'Evelyn gave no reply to the debrief' : c.label,
      'What Sloane heard over the earpiece',
    );
  }
  if (id === 'debrief.end') {
    response.push(
      q(
        'Sloane · earpiece',
        'The return car is in the service garage. Keep what you obtained intact. We will speak again.',
      ),
      p('The channel closes. You have no confirmation that the phone’s monitoring has ended.'),
    );
    m.channel = 'closed';
  }
  if (['debrief.end', 'warning.next1', 'warning.next2'].includes(id)) {
    const texts = {
      'debrief.end': 'BENTON WAS NOT THE REAL TEST.',
      'warning.next1': 'YOU WERE.',
      'warning.next2': 'SLOANE COULD HAVE STOPPED THE EXCHANGE.',
    };
    record(
      'mission.' + id,
      'claim',
      texts[id as keyof typeof texts],
      'Unknown sender on the monitored phone; identity and assertions unverified',
    );
  }
  if (id === 'garage.finish') m.outcome = 'complete';
  if (response.length) s.history.push({ node: original, blocks: response });
  const [scene, phase] = c.next.split('.');
  s.scene = scene as GameState['scene'];
  s.phase = phase;
  if (c.next !== original) s.history.push({ node: c.next, blocks: missionBlocks(s) });
  s.feedback = 'Recorded: ' + c.label;
  return true;
}
