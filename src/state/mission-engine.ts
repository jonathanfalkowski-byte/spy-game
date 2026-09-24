import { missionPresentation } from '../content/mission-presentation';
import type { GameState } from './schema';
import type { Lead, MissionState } from './mission-schema';
import { SLOANE_DOUBT_BELIEF, sloaneDoubts } from '../content/sloane-standing';
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
  if (id === 'home.begin') {
    record(
      'mission.home.entry',
      'fact',
      'Evelynn returned to Adrian’s apartment after Stage One and before the Glass House.',
      'Residential entry and Sloane’s reset-window instruction',
    );
  }
  if (id === 'home.prepare') {
    record(
      'mission.home.delivery',
      'fact',
      'An Axiom-prepared garment case was present in the apartment before the Glass House. Who arranged access is unknown.',
      'Evelynn’s observation beside the wardrobe',
    );
  }
  if (id === 'home.mirror') {
    response.push(
      t(
        'The mirror catches my face, then the body beneath it: my shoulders set differently, my waist drawn in, my hips and thighs carrying a balance I have not learned to trust yet. When I turn, the change moves with me. I move the glass from one hand to the other and watch the reflection follow.',
      ),
    );
    record(
      'mission.home.mirror',
      'fact',
      'Evelynn inspected the apartment mirror after Stage One without selecting an identity interpretation.',
      'Evelynn’s private apartment observation',
    );
  }
  if (id === 'home.clothes') {
    response.push(
      p(
        'Adrian’s shirt is exactly where it was left. Across your changed shoulders it hangs loose; at the waist and hips it pulls against a shape the shirt was never cut to follow. You hold it there for a moment, then hang it back. The hanger knocks softly against the wardrobe door.',
      ),
    );
    record(
      'mission.home.clothes',
      'fact',
      'Evelynn handled Adrian’s clothing and observed the changed fit without treating the clothing as a verdict.',
      'Evelynn’s apartment observation',
    );
  }
  if (id === 'home.evidence') {
    response.push(p('You put the keys beside the restricted badge, then wake the phone. The Glass House invitation is still there. You check the time and slide the badge back into its holder.'));
    record('mission.home.evidence', 'fact', 'Evelynn checked the keys, restricted badge, monitored phone and invitation brought from the clinic.', 'Pre-mission belongings check at the apartment');
  }
  if (id === 'home.routine') {
    response.push(
      p(
        'You reach for the glass you always use. The movement is familiar; the angle of your wrist and the distance your voice carries in the small kitchen are not. You set the glass down carefully and watch the water settle against the side.',
      ),
    );
    record(
      'mission.home.routine',
      'fact',
      'Evelynn tried a familiar home routine and noticed a changed physical habit.',
      'Evelynn’s private apartment observation',
    );
  }
  if (id.startsWith('home.outfit.')) {
    const outfit = id.split('.')[2] as 'executive' | 'socialite' | 'shadow';
    s.clinic.outfit = outfit;
    const responseText = {
      executive: 'The tailored jacket sits cleanly across the shoulders. It gives the room an answer before anyone asks a question.',
      socialite: 'The evening fabric catches the apartment light differently from the clinic mirror. It will make an entrance easier to notice and harder to forget.',
      shadow: 'The clean dark lines leave fewer details to remember. They also make it less natural to begin a conversation without purpose.',
    }[outfit];
    response.push(t(responseText));
    add(m.completed, 'home.presentation.' + outfit);
    record(
      'mission.home.presentation.' + outfit,
      'fact',
      'Evelynn privately previewed the ' + outfit + ' presentation before confirming the Glass House outfit.',
      'Evelynn’s apartment preparation',
    );
  }
  if (id.startsWith('home.detail.')) {
    const detail = id.split('.')[2];
    const text =
      detail === 'watch'
        ? 'The old watch still fits. You fasten it over the altered wrist and feel its familiar weight settle there.'
        : detail === 'earrings'
          ? 'The black-stone earrings catch the light when you turn your head. No one asked you to add them.'
          : 'You leave the extra detail off. The case closes without requiring an explanation.';
    response.push(p(text));
    record(
      'mission.home.detail.' + detail,
      'fact',
      'Evelynn ' + (detail === 'none' ? 'left the optional accessory off' : 'chose the optional ' + detail + ' detail') + ' before the Glass House.',
      'Evelynn’s voluntary apartment preparation',
    );
  }
  if (id === 'home.presentationDone') {
    const outfit = s.clinic.outfit || 'shadow';
    response.push(
      q('You · earpiece', 'Final presentation: ' + outfit + '.'),
      q('Sloane · earpiece', 'Received. I will account for that approach. The invitation still controls where it gets you.'),
    );
    record(
      'mission.home.presentation.final',
      'fact',
      'Evelynn confirmed the ' + outfit + ' presentation for the Glass House.',
      'Evelynn’s explicit earpiece confirmation',
    );
    know('sloane', 'Final Glass House presentation: ' + outfit, 'Evelynn’s explicit earpiece confirmation');
  }
  if (id === 'home.maya') {
    const mayaText =
      s.day.closure === 'checkin'
        ? s.clinic.completed.includes('morning.answer')
          ? 'The 06:30 check-in happened before the appointment. You answered with a short warning that you would be hard to reach; there is no second call arranged. You can reread the exchange, send a bounded update, or leave the thread alone.'
          : 'The 06:30 check-in happened before the appointment, but you did not answer. No one arranged a second call. You can reread the thread, send a bounded update, or leave it alone.'
        : s.clinic.contact === 'identity'
          ? 'Your earlier recovery message already told Maya about the adaptation and the proposed identity. Reading it again does not give her a new fact or create a new promise.'
          : 'There is no new Maya arrangement to act on here. You can read the existing thread without turning silence into a message.';
    response.push(p(mayaText));
    record(
      'mission.home.maya',
      'fact',
      'Evelynn reviewed the existing Maya thread before the Glass House without inventing new knowledge for either person.',
      'Existing Maya conversation on the monitored phone',
    );
  }
  if (id === 'home.maya.send') {
    const text =
      s.clinic.contact === 'identity'
        ? 'Home is quieter than the clinic. I keep catching the new voice in the room. I may message again after the evening, but I cannot promise when.'
        : 'I made it home for a few minutes before the evening engagement. I may be hard to reach, but I wanted you to know I got back.';
    response.push(q('You · message to Maya', text), p('Sent from the monitored phone. Maya has not replied yet.'));
    know('maya', text, 'Evelynn’s sent message before the Glass House');
    s.day.exposure.push({ key: 'glass_house_home_message', source: 'Message sent on a monitored phone; whether anyone accessed it is unknown: ' + text, event: s.revision });
    record('mission.home.maya-message', 'fact', text, 'Evelynn’s delivered message to Maya through the monitored phone');
  }
  if (id === 'home.maya.skip')
    record(
      'mission.home.maya-silence',
      'fact',
      'Evelynn left Maya’s existing thread untouched before leaving for the Glass House.',
      'Evelynn’s choice not to send a new message',
    );
  if (id === 'home.leave') {
    const outfit = s.clinic.outfit || 'shadow';
    response.push(
      p('You collect the invitation, monitored phone and restricted badge. The old jacket remains in the apartment.'),
      p('You turn the key and check that it caught. The apartment is unchanged; the unfamiliar weight and balance leave with you.'),
    );
    record(
      'mission.home.departure',
      'fact',
      'Evelynn left Adrian’s apartment for the Glass House with the ' + outfit + ' presentation.',
      'Evelynn’s completed home preparation',
    );
  }
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
  if (id === 'marcus.detail') {
    response.push(
      q('You', 'Give me one detail only the two of us would know.'),
      q('Marcus', 'You left your gloves in my car and made me bring them back the next morning. You were angry that I remembered.'),
      p('It is specific enough to feel personal and ordinary enough to be true. You cannot verify it. Marcus waits to see what the memory does to your face.'),
    );
    m.scrutiny++;
    record('mission.marcus-detail', 'claim', 'Marcus claims Evelynn left gloves in his car after a Singapore evening and collected them the next morning.', 'Marcus’s specific recollection beside the windows');
    know('marcus', 'Evelynn asked for a private detail from Singapore', 'Her spoken question beside the windows');
    know('marcus', 'Evelynn is testing how much of his memory she can trust', 'Marcus interprets her request; not verified', true);
  }
  if (id === 'marcus.push') {
    response.push(
      q('You', 'Who else was there?'),
      q('Marcus', 'Enough people to make me careful now. I will not make them part of this conversation.'),
      p('He gives you no name. The refusal may protect someone, preserve his own position, or simply end a question he does not want to answer.'),
    );
    m.scrutiny += 2;
    record('mission.marcus-witness', 'claim', 'Marcus says other people were present in Singapore but refuses to identify them.', 'Marcus’s answer to Evelynn’s direct question');
    know('marcus', 'Evelynn asked who else was present in Singapore', 'Her spoken question beside the windows');
    know('marcus', 'Evelynn is pressing for names', 'Marcus interprets her follow-up; not verified', true);
  }
  if (['cover.test', 'cover.bluff', 'cover.partial', 'cover.redirect', 'cover.presentation'].includes(id)) {
    const coverReply: Record<string, string> = {
      test: 'No. The Blue Orchid. You corrected me when I called it the Marina Room.',
      bluff: 'You remember the name, at least. I thought you would deny knowing the place at all.',
      partial: 'It was about Halcyon. You asked who could use the foundation’s name without appearing on its invitations.',
      redirect: 'Tonight, then. Marcus wants everyone to believe the table is an ordinary part of the reception.',
    };
    const line = coverReply[value];
    if (value === 'test') {
      response.push(q('You', 'It was at the Marina Room.'), q('Celeste', line), p('She corrects the location without hesitation. She has kept to the place she named first. You still have no independent memory against which to check it.'));
      m.scrutiny++;
      record('mission.cover.correction', 'claim', 'Celeste corrected Evelynn’s deliberately conflicting Marina Room detail with the Blue Orchid.', 'Celeste’s direct correction during a public conversation');
      know('celeste', 'Evelynn offered a conflicting location to test her recollection', 'Celeste interprets the exchange; not verified', true);
    } else if (value === 'bluff') {
      response.push(q('You', 'The Blue Orchid. I remember.'), q('Celeste', line), p('The reply makes room for your claim without confirming what you remember. A guest close by notices your confidence, not the truth behind it.'));
      m.scrutiny++;
      record('mission.cover.bluff', 'fact', 'Evelynn said she remembered the Blue Orchid, though she has no independent memory of it.', 'Evelynn’s spoken claim to Celeste');
      know('celeste', 'Evelynn says she remembers the Blue Orchid', 'Evelynn’s spoken claim');
      know('celeste', 'Evelynn may be trying to preserve the appearance of shared memory', 'Celeste interprets the exchange; not verified', true);
    } else if (value === 'partial') {
      response.push(q('You', 'I have the name, not the conversation. What mattered to you?'), p('Celeste leans toward you and lowers her reply beneath the quartet. Marcus can see the exchange, but her words do not carry to him.'), q('Celeste', line), p('She offers the remembered subject, not proof that her phrasing is exact. Marcus remains near enough to see that the private conversation continued.'));
      record('mission.cover.halcyon', 'claim', 'Celeste says Evelynn asked about people using the Halcyon Foundation’s name outside its invitations.', 'Celeste’s account during the follow-up');
      know('celeste', 'Evelynn asked what Celeste remembers about Singapore', 'Evelynn’s spoken question');
      know('marcus', 'Evelynn continued a private conversation with Celeste', 'Visible proximity at the central table');
    } else if (value === 'redirect') {
      response.push(q('You', 'Then tell me whether tonight’s table is part of the reception.'), q('Celeste', line), p('She answers without offering access or a name. You return to the room with the question still open.'));
      record('mission.cover.redirect', 'fact', 'Evelynn redirected Celeste’s private question toward the event.', 'Evelynn’s spoken response in the gathering');
      record('mission.cover.redirect-table', 'claim', 'Celeste says Marcus wants guests to regard the private table as an ordinary part of the reception.', 'Celeste’s reply during the follow-up');
      know('celeste', 'Evelynn redirected the conversation toward tonight', 'Evelynn’s spoken question');
    } else if (value === 'presentation') {
      const visibleAction =
        s.clinic.outfit === 'executive'
          ? 'You make the question sound like a scheduling correction. Two nearby guests turn toward the exchange.'
          : s.clinic.outfit === 'socialite'
            ? 'You lift your glass and give the interruption the shape of a toast. Celeste accepts the graceful exit and follows your lead back toward the room.'
            : 'You step aside as a server passes and let the crowd close the space between you. Celeste sees the retreat, but does not follow.';
      response.push(q('You', 'We can leave it there.'), p(visibleAction), q('Celeste', 'All right. We can leave it there.'), p('The conversation ends in public, without either of you explaining what was left unsaid.'));
      if (s.clinic.outfit === 'executive') m.scrutiny++;
      know('celeste', 'Evelynn used the room’s attention to end the private subject', 'Celeste observes the public redirection', true);
      know('marcus', 'Evelynn and Celeste ended their private exchange in public', 'Visible exchange near the central table');
      record('mission.cover.presentation', 'fact', 'Evelynn used her presentation to redirect Celeste’s question.', 'Public interaction observed at the gathering');
    }
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
  if (id.startsWith('lead.') && ['guest', 'service', 'celeste', 'marcus', 'security', 'staff', 'restricted'].includes(value))
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
    if (lead === 'security' || lead === 'restricted') m.scrutiny += 2;
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
          : m.leads.some((x) => x === 'guest' || x === 'service' || x === 'security')
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
    if (sloaneDoubts(s))
      know('sloane', SLOANE_DOUBT_BELIEF, 'She heard the name before any finding; the right answer on a guess', true);
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
      timely
        ? 'You observed Marcus’s wafer pass to Benton. Benton pocketed it.'
        : 'You saw Benton pocket the wafer after turning toward the gallery. Your capture missed the handover.',
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
          'You keep your voice low enough that Benton has to choose whether to make the scene louder. He looks toward the gathering, then releases your wrist. The token is still in your palm. You step back before he can change his mind.',
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
          'I had grounds to suspect him. I did not have his agreement on record. I kept the name from you deliberately.',
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
          'You let the elevator’s faint vibration fill the pause. Sloane waits. You hear her draw a breath, then turn to the arrangements for leaving. Whatever she makes of it remains hers.',
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
        m.capture?.owner === 'Evelyn'
          ? 'The return car is in the service garage. Keep what you obtained intact. We will speak again.'
          : 'The return car is in the service garage. Go downstairs. We will speak again.',
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
  if (c.next !== original) s.history.push({ node: c.next, blocks: [...missionBlocks(s), ...missionPresentation(s)] });
  s.feedback = 'Recorded: ' + c.label;
  return true;
}
