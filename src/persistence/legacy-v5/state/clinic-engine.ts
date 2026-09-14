import type { GameState } from './schema';
import {
  availableClinicChoices,
  clinicBlocks,
  examination,
  answers,
  recoveryMessage,
  rehearsal,
} from '../content/clinic';
import {
  paragraph as p,
  thought as t,
  speech as q,
  type Block,
  type NodeId,
} from '../content/schema';
export function applyClinicChoice(state: GameState, s: GameState, id: string): boolean {
  const choice = availableClinicChoices(state).find((x) => x.id === id);
  if (!choice) return false;
  const c = s.clinic;
  const value = id.split('.')[1];
  let next = choice.next;
  const response: Block[] = [];
  const add = (xs: string[], v: string) => {
    if (!xs.includes(v)) xs.push(v);
  };
  const know = (npc: keyof GameState['npcs'], key: string, source: string, belief = false) => {
    const xs = belief ? s.npcs[npc].beliefs : s.npcs[npc].known;
    if (!xs.some((x) => x.key === key && x.source === source))
      xs.push({ key, source, event: s.revision });
  };
  const record = (key: string, layer: 'fact' | 'claim', text: string, source: string) => {
    if (s.day.records.some((x) => x.key === key)) return;
    s.day.records.push({ key, layer, text, source, event: s.revision });
    add(s.knowledge, key);
    add(layer === 'fact' ? s.facts : s.claims, key);
  };
  const message = (text: string, source: string) => {
    know('maya', text, source);
    s.day.exposure.push({
      key: id,
      source: 'Axiom monitoring of the phone: ' + text,
      event: s.revision,
    });
    record(id + '.message', 'fact', text, source + '; delivered on the monitored phone');
  };
  if (!choice.repeat) add(c.completed, id);
  const original = (state.scene + '.' + state.phase) as NodeId;
  s.history.push({
    node: original,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }],
  });
  if (id.startsWith('reflect.'))
    response.push(
      t(
        value === 'warning'
          ? 'The messages claim that the photograph means something Sloane has not explained. A warning can be useful without being trustworthy. I have no name to attach to this one.'
          : value === 'prepare'
            ? 'Phone, badge, keys. The things I can account for fit in one hand. The phone is monitored; the badge does not reopen my office. Neither restriction has changed overnight.'
            : 'The room remembers yesterday’s arrangement better than I do. A jacket by the door, a mark on the table, the tower outside. I want to remember more than the fact that I left it.',
      ),
    );
  if (id.startsWith('morning.')) {
    c.morning = value;
    if (value === 'answer') {
      message(
        'Adrian is leaving for the 07:00 Sublevel 17 appointment. He cannot promise when he can next speak.',
        'Adrian’s answered 06:30 check-in, after stating the phone is monitored',
      );
      s.relationships.mayaTrust++;
    }
    if (value === 'miss') {
      know('maya', 'Adrian did not answer the arranged 06:30 call', 'Maya’s attempted check-in');
      s.relationships.mayaTrust--;
    }
    if (value === 'message')
      message(
        'Adrian is leaving for Axiom and may not be able to answer for a while. The phone is monitored.',
        'Adrian’s departure message',
      );
  }
  if (id === 'c.entrance') c.belongings = 'screening';
  if (id === 'c.screened') c.belongings = 'carried';
  if (id.startsWith('privacy.')) {
    c.privacy = value;
    c.sloanePresent = ['stay', 'silent'].includes(value);
    if (!c.sloanePresent) c.vossTrust++;
    know(
      'voss',
      'Examination privacy choice: ' + value,
      'Adrian’s response in the examination suite',
    );
    know(
      'sloane',
      'Examination privacy choice: ' + value,
      'Adrian’s response before Sloane leaves or remains',
    );
  }
  if (id === 'private.stop') {
    response.push(
      q('Adrian', 'Can you actually stop this?'),
      q(
        'Voss',
        'I can halt treatment and decide what medical care is necessary. I cannot reopen your account or make Victoria withdraw a referral. You should not have to confuse those powers just because they are being used in the same room.',
      ),
      p(
        'She holds your gaze until you acknowledge the distinction. It is a limit on her help, but she has stated it where Sloane cannot turn it into a promise of something else.',
      ),
    );
    know(
      'voss',
      'Adrian asked whether Voss can stop treatment',
      'Private examination conversation',
    );
    record(
      'clinic.privateAuthority',
      'claim',
      'Voss says she can halt treatment, but cannot cancel Sloane’s employment or security leverage.',
      'Voss, privately during the examination',
    );
  }
  if (id.startsWith('exam.') && value !== 'followup') {
    if (c.exam !== null || c.opportunity !== 1) return false;
    c.exam = value;
    if (value !== 'skip') {
      c.opportunity = 0;
      const x = examination[value as keyof typeof examination];
      record('clinic.exam.' + value, 'fact', x.text, x.source);
    }
  }
  if (id === 'exam.followup') {
    const x = examination[c.exam as keyof typeof examination];
    response.push(
      q(
        'Adrian',
        c.exam === 'equipment'
          ? 'This was calibrated for me twenty-three days ago?'
          : c.exam === 'scan'
            ? 'You used my employee screenings for this model?'
            : 'Who authorizes each stage?',
      ),
      q('Voss', x.reply),
    );
    know(
      'voss',
      'Adrian noticed the ' + c.exam + ' finding',
      'Adrian’s examination follow-up question',
    );
    if (c.sloanePresent)
      know(
        'sloane',
        'Adrian noticed the ' + c.exam + ' finding',
        'Present during Adrian’s examination follow-up',
      );
  }
  if (id === 'c.examResult') {
    // clinicBlocks uses the old presence flag to narrate the return; update after rendering below.
    record(
      'clinic.protocol',
      'claim',
      'Voss describes Stage One as mostly reversible through further treatment, with endocrine effects that cannot reset on demand. Later irreversible stages require separate affirmative authorization.',
      'Voss’s protocol explanation',
    );
  }
  if (id.startsWith('question.')) {
    response.push(q('Adrian', choice.label), q('Voss', answers[value]));
    know('voss', 'Adrian asked about ' + value, 'Protocol conversation');
    know('sloane', 'Adrian asked about ' + value, 'Protocol conversation after the examination');
  }
  if (id.startsWith('profile.') && !['confirm', 'revise'].includes(value)) c.profileDraft = value;
  if (id === 'profile.confirm') {
    if (!c.profileDraft) return false;
    c.profile = c.profileDraft;
    if (c.profile !== 'existing') c.investment++;
    know('voss', 'Selected operational profile: ' + c.profile, 'Confirmed profile controls');
    know('sloane', 'Selected operational profile: ' + c.profile, 'Observed profile confirmation');
    record(
      'clinic.profile',
      'fact',
      'Adrian confirmed the ' + c.profile + ' profile within the established Evelyn identity.',
      'Profile review controls',
    );
  }
  if (id.startsWith('attention.')) c.attention = value;
  if (id.startsWith('display.')) {
    c.displayed = value;
    const text = (
      {
        hostility:
          'If that is what the mission requires, do not mistake it for something I requested.',
        indifference: 'It is the operational profile. I have reviewed it.',
        curiosity: 'How close will the result be to this model?',
        silent: 'Adrian remained silent after the simulation.',
      } as Record<string, string>
    )[value];
    response.push(value === 'silent' ? p(text) : q('Adrian', text));
    know('sloane', text, 'Observed response after simulation');
    know(
      'sloane',
      'Interprets the displayed response as ' + value,
      'Sloane’s reading of observable behaviour, not access to private thought',
      true,
    );
    know('voss', text, 'Present for the response after simulation');
  }
  if (id === 'auth.review')
    response.push(
      p(
        'Your confirmed profile is ' +
          c.profile +
          '. Stage One authorization does not cover later irreversible stages. Stopping prevents further adaptation but cannot erase changes already made. Employment and security leverage remain in force. No authorization has been given by reviewing.',
      ),
    );
  if (id === 'auth.yes') {
    if (c.authorized || c.stage !== 'unchanged' || !c.profile) return false;
    c.authorized = true;
    c.belongings = 'locker';
    record(
      'clinic.authorized',
      'fact',
      'Adrian explicitly authorized Stage One under the existing coercion. This does not authorize later irreversible stages.',
      'Adrian’s Stage One authorization control',
    );
    know('voss', 'Stage One explicitly authorized', 'Adrian’s authorization');
    know('sloane', 'Stage One explicitly authorized', 'Witnessed authorization');
  }
  if (id === 'c.preparation') {
    if (!c.authorized || c.paused) return false;
    c.stage = 'voice';
    record(
      'clinic.voiceStage',
      'fact',
      'Adrian woke with a changed voice and early tissue changes.',
      'First waking checkpoint',
    );
  }
  if (id === 'voice.sample')
    response.push(
      q('Voss', 'Take your time. Say the same sentence once more.'),
      q('Adrian', 'I can hear you. I would like to hear myself again.'),
      p(
        'You repeat it slowly. The second sample makes the sound more familiar without making it the voice you remember. No register is finalized; Voss waits for your decision.',
      ),
    );
  if (id === 'voice.lower' || id === 'voice.evelyn') {
    if (c.stage !== 'voice' || c.paused || !c.authorized) return false;
    c.voice = value;
    if (value === 'evelyn') c.investment++;
    know('voss', 'Voice register chosen: ' + value, 'Adrian’s voice adjustment request');
    know(
      'sloane',
      'Voice register chosen: ' + value,
      'Present for Adrian’s voice adjustment request',
    );
  }
  if (id === 'voice.pause' || id === 'face.pause') {
    c.paused = true;
    c.vossTrust++;
    response.push(
      p(
        'Your request is heard. Voss suspends further adaptation before explaining the next decision.',
      ),
    );
  }
  if (id === 'voice.resume' || id === 'face.resume') {
    if (!c.paused) return false;
    c.paused = false;
    if (id === 'face.resume' && !c.face) next = 'clinic.face';
    response.push(
      q('Adrian', 'Resume from this checkpoint.'),
      q('Voss', 'Resumption recorded. We continue from the assessment, not past it.'),
    );
  }
  if (id === 'pause.explain')
    response.push(
      q(
        'Voss',
        'Further adaptation is paused. Your present changes remain. Resuming requires your explicit decision; ending means recovery and continuing care, not immediate reversal.',
      ),
    );
  if (id === 'c.voiceReply') {
    if (!c.authorized || !c.voice || c.paused) return false;
    c.stage = 'face';
    record(
      'clinic.faceStage',
      'fact',
      'Adrian reached the changed-face checkpoint while conscious and able to respond.',
      'Face assessment',
    );
  }
  if (id.startsWith('face.') && !['pause', 'resume'].includes(value)) {
    if (c.stage !== 'face' || c.paused) return false;
    c.face = value;
    know('voss', 'Face response: ' + choice.label, 'Spoken at the face checkpoint');
    know('sloane', 'Face response: ' + choice.label, 'Present at the face checkpoint');
  }
  if (id === 'c.faceReply') {
    if (!c.authorized || c.paused || !c.face) return false;
    c.stage = 'complete';
    record(
      'clinic.complete',
      'fact',
      'Stage One completed; Adrian began supervised standing and recovery.',
      'Voss’s completion assessment and Adrian’s first steps',
    );
  }
  if (id.startsWith('step.'))
    response.push(
      p(
        value === 'help'
          ? 'You take Voss’s hand. She supports your balance without pulling you forward. When you are steady, you release it and walk beside her to recovery.'
          : value === 'moment'
            ? 'Voss waits while you sit with both feet on the floor. When you tell her you are ready, she rises with you and stays at your side for the walk to recovery.'
            : 'You place a hand on the chair and stand under Voss’s supervision. She keeps within reach without touching you. You take the first step, then follow her slowly into recovery.',
      ),
    );
  if (id.startsWith('mirror.')) c.mirror = value;
  if (id.startsWith('name.')) {
    c.sloanePresent = false;
    c.belongings = 'returned';
    const text =
      value === 'answer'
        ? 'For the operation, yes.'
        : value === 'correct'
          ? 'Adrian, for now.'
          : 'We can discuss that later.';
    response.push(
      q('Adrian', text),
      q('Voss', 'All right.'),
      p(
        value === 'correct'
          ? 'Sloane acknowledges the correction without promising to use the name outside recovery.'
          : 'Sloane lets the answer stand. It supplies no permission to interpret the private moment that preceded it.',
      ),
    );
    know('voss', text, 'Adrian’s spoken response about the name');
    know('sloane', text, 'Adrian’s spoken response about the name');
  }
  if (id === 'c.rest') c.belongings = 'returned';
  if (id === 'c.recoveryReply') c.sloanePresent = true;
  if (id.startsWith('contact.')) {
    c.contact = value;
    if (value !== 'quiet')
      message(recoveryMessage(s), 'Adrian’s delivered recovery message to Maya');
  }
  if (id.startsWith('outfit.')) c.outfitDraft = value;
  if (id.startsWith('makeup.')) c.makeupDraft = value;
  if (id === 'fit.confirm') {
    if (!c.outfitDraft || !c.makeupDraft) return false;
    c.outfit = c.outfitDraft;
    c.makeup = c.makeupDraft;
    if (c.makeup !== 'corporate') c.investment++;
    record(
      'clinic.presentation',
      'fact',
      'Confirmed presentation: ' + c.outfit + ' outfit and ' + c.makeup + ' makeup.',
      'Adrian’s fitting confirmation',
    );
    know('sloane', 'Presentation: ' + c.outfit + ' / ' + c.makeup, 'Observed fitting confirmation');
  }
  if (id.startsWith('rehearse.')) {
    response.push(
      p(
        value === 'boundary'
          ? 'You ask for a pause. Sloane waits while you take a drink, then you try the exercise again at your own pace.'
          : value === 'question'
            ? 'You ask what to do when the opening fails. Sloane makes you practice ending a conversation cleanly rather than escalating an unsupported story.'
            : 'You repeat the exercise, correcting one rushed answer without pretending practice has removed uncertainty.',
      ),
      ...rehearsal(s),
    );
    record(
      'clinic.rehearsal',
      'claim',
      'Rehearsal feedback: ' +
        (c.outfit === 'executive'
          ? 'Authority invites detailed professional questions.'
          : c.outfit === 'socialite'
            ? 'Warmth draws attention and scrutiny.'
            : 'Low visibility makes initiating contact harder.'),
      'Sloane’s preparation exercise',
    );
  }
  if (id === 'c.briefing') {
    c.credentials = true;
    c.earpiece = true;
    record(
      'clinic.equipment',
      'fact',
      'Invitation credentials and a tested earpiece were issued. The phone remains monitored and the badge restricted.',
      'Final equipment check',
    );
  }
  if (id.startsWith('farewell.'))
    response.push(
      q(
        'Adrian',
        value === 'thanks'
          ? 'Thank you for staying with me.'
          : value === 'promise'
            ? 'Remember that promise when I call for you.'
            : 'Goodbye, Dr Voss.',
      ),
      q('Voss', value === 'promise' ? 'I will. Ask for me.' : 'Goodbye, Adrian.'),
      p('Voss finishes the handover before you leave the suite.'),
    );
  if (id === 'c.departure') {
    c.sloanePresent = false;
    c.outcome = 'departed';
    record(
      'clinic.departure',
      'fact',
      'Adrian left Axiom in the car for the Glass House after Stage One recovery. The party has not begun in this milestone.',
      '18:20 departure',
    );
  }
  if (id === 'stop.request') {
    c.paused = true;
  }
  if (id === 'stop.back')
    next =
      c.stage === 'unchanged'
        ? 'clinic.authorization'
        : c.stage === 'voice'
          ? 'clinic.voicePause'
          : 'clinic.facePause';
  if (id === 'stop.back' && c.stage === 'unchanged') c.paused = false;
  if (id === 'stop.confirm') {
    c.sloanePresent = false;
    c.outcome = 'stopped';
    c.paused = true;
    if (c.belongings === 'locker') c.belongings = 'returned';
    s.day.employment = 'terminated';
    s.day.housing = 'notice30';
    record(
      'clinic.stopped',
      'fact',
      'Adrian ended further adaptation at the ' +
        c.stage +
        ' stage. Voss transferred care to recovery; discharge arrangements remain pending.',
      'Confirmed stop and Voss’s recovery handover',
    );
    record(
      'clinic.referral',
      'claim',
      'Sloane withdrew the operation arrangement and initiated the threatened security referral and employment/housing consequences. Any existing thirty-day notice keeps its original deadline.',
      'Sloane’s stated administrative instruction after treatment stopped',
    );
    know('sloane', 'Adrian ended adaptation at ' + c.stage, 'Confirmed refusal at clinic');
    know('voss', 'Adrian ended adaptation at ' + c.stage, 'Confirmed stop and medical handover');
  }
  const same = next === original;
  c.response = response;
  if (response.length) s.history.push({ node: original, blocks: response });
  s.scene = 'clinic';
  s.phase = next.split('.')[1];
  if (!same) s.history.push({ node: next, blocks: clinicBlocks(s) });
  // Preserve the conditional arrival paragraph in history; later rendering uses the privacy choice.
  if (id === 'c.examResult') c.sloanePresent = true;
  s.feedback = 'Recorded: ' + choice.label;
  return true;
}
