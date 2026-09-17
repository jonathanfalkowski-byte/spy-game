import type { GameState } from './schema';
import { availableDayChoices, dayBlocks } from '../content/day';
import type { NodeId } from '../content/schema';

export function applyDayChoice(state: GameState, s: GameState, id: string): boolean {
  const c = availableDayChoices(state).find((c) => c.id === id);
  if (!c) return false;
  const d = s.day;
  const add = (xs: string[], v: string) => {
    if (!xs.includes(v)) xs.push(v);
  };
  const know = (npc: keyof GameState['npcs'], key: string, source: string, belief = false) => {
    const list = belief ? s.npcs[npc].beliefs : s.npcs[npc].known;
    if (!list.some((x) => x.key === key && x.source === source))
      list.push({ key, source, event: s.revision });
  };
  const record = (key: string, layer: 'fact' | 'claim', text: string, source: string) => {
    if (d.records.some((x) => x.key === key)) return;
    d.records.push({ key, layer, text, source, event: s.revision });
    add(s.knowledge, key);
    add(layer === 'fact' ? s.facts : s.claims, key);
  };
  const exposure = (key: string, source: string) => {
    if (!d.exposure.some((x) => x.key === key)) d.exposure.push({ key, source, event: s.revision });
  };
  const maya = (key: string, source: string) => {
    know('maya', key, source);
    if (d.evening === 'call') {
      exposure('call_' + key, 'Axiom recording of the returned-phone call');
      record(
        'monitor_' + key,
        'fact',
        'The returned-phone call carries this disclosure: ' + key,
        'Axiom-monitored call, with monitoring warning given to Maya',
      );
    }
  };
  if (!c.repeat) add(d.completed, id);
  s.history.push({
    node: (state.scene + '.' + state.phase) as NodeId,
    blocks: [{ kind: 'notice', text: 'Your choice: ' + c.label }],
  });
  const value = id.split('.')[1];
  if (id === 'day.begin')
    record(
      'anomaly',
      'fact',
      'EV_7A_BLACKGLASS appeared in Adrian’s workspace without his input.',
      'Adrian’s terminal at 12:17',
    );
  if (['file.report', 'file.delete', 'file.trace'].includes(id)) {
    d.fileActions.push(value as 'report' | 'delete' | 'trace');
    const text =
      id === 'file.report'
        ? 'Security’s automated response says no anomaly exists. The object remains visible.'
        : id === 'file.delete'
          ? 'The terminal reports FILE DELETED, then FILE RESTORED. The object returns before the audit completes.'
          : 'The origin field resolves to ADRIAN VALE. Adrian did not place the file; the field does not establish who did.';
    record(id, 'fact', text, 'Observed system response to ' + value);
    s.feedback = text;
  }
  if (id === 'file.open') {
    d.directorySeen = true;
    record(
      'directory',
      'fact',
      'The exposed directory lists ORACLE, PROJECT EVE, Lena Voss in Adaptive Medicine and Adrian Vale as Candidate 7A.',
      'Visible restricted-directory identifiers',
    );
  }
  if (id === 'file.authorize') {
    d.biometric = true;
    record(
      'biometric_access',
      'fact',
      'Adrian authorized the reader; the terminal locked before the candidate image resolved.',
      'Palm reader and terminal response',
    );
  }
  if (id === 'security.turn') {
    d.badge = 'suspended';
    d.employment = 'suspended';
    record(
      'security_arrival',
      'fact',
      'Two officers disconnected the terminal and took Adrian’s badge.',
      'Adrian’s desk',
    );
  }
  if (['security.comply', 'security.reason', 'security.maya'].includes(id)) {
    d.security = value as 'comply' | 'reason' | 'maya';
    d.phone = 'confiscated';
    know(
      'maya',
      'Security escorted Adrian from his desk',
      'Maya witnessed the escort through the compliance partition',
    );
    record(
      'device_taken',
      'fact',
      'Security confiscated Adrian’s phone and escorted him to Level 71.',
      'Officers’ actions and elevator display',
    );
    record(
      'suspension',
      'fact',
      'Work access is suspended pending executive review. This is not yet an employment termination.',
      'Elevator access-status announcement',
    );
    if (value === 'maya') {
      const msg = 'SECURITY HAS ME. THEY ARE TAKING ME TO EXECUTIVE INTELLIGENCE.';
      know('maya', msg, 'Delivered warning before phone surrender');
      exposure(
        'warning',
        'Officers record the delivered warning and recipient in the incident log',
      );
      record(
        'maya_warning',
        'fact',
        'Maya received the warning that Security was taking Adrian to Executive Intelligence.',
        'Phone delivery receipt witnessed by officers',
      );
    }
  }
  if (id.startsWith('intro.')) {
    d.intro = value as typeof d.intro;
    know('sloane', c.label, 'Adrian’s observed response in Sloane’s office');
    know('sloane', 'biometric_access', 'Candidate 7A biometric audit');
    record(
      'allegation',
      'claim',
      'Sloane says the access audit supports termination and an espionage referral. The audit establishes access, not espionage intent.',
      'Sloane’s allegation and displayed audit',
    );
    if (s.choices.disclosure === 'disclosure.voss') {
      exposure('voss_lookup', '12:14 personnel-directory access log: Maya queried Voss');
      record(
        'maya_lookup',
        'fact',
        'Sloane displayed a timestamped record of Maya querying Voss’s personnel directory at 12:14.',
        'Displayed personnel access log',
      );
      know(
        'maya',
        'voss_directory_queried',
        'Maya’s own 12:14 lookup after her promise over coffee',
      );
    }
    for (const e of d.exposure) know('sloane', e.key, e.source);
  }
  if (id.startsWith('leverage.')) {
    d.leverage = value as typeof d.leverage;
    know('sloane', c.label, 'Adrian’s reply to the allegation');
    if (value === 'maya')
      know(
        'sloane',
        'Adrian wants Maya protected',
        'Adrian explicitly asks to leave Maya out',
        true,
      );
    record(
      'glasshouse_claim',
      'claim',
      'Sloane says Marcus will meet an Axiom source at the Glass House tomorrow night.',
      'Sloane’s operation briefing',
    );
  }
  if (id.startsWith('question.')) {
    d.questions.push(value as 'insider' | 'why');
    know('sloane', c.label, 'Adrian’s briefing question');
    record(
      id,
      'claim',
      value === 'insider'
        ? 'Sloane implies she does not know the source’s identity. This is her account, not independently established.'
        : 'Sloane says Helix knows her operatives but not Adrian, and values his analytical ability.',
      'Sloane’s answer to Adrian',
    );
  }
  if (id === 'brief.mission') {
    record(
      'evelyn_package',
      'claim',
      'Sloane presents Evelyn Vale as an existing identity with Glass House access, Singapore records and claimed biometric compatibility. She says the identity was made from Adrian.',
      'Axiom identity package and Sloane’s explanation',
    );
    record(
      'mission',
      'claim',
      'Sloane wants Adrian to enter as Evelyn, identify Marcus’s source and return with proof.',
      'Sloane’s proposed assignment',
    );
  }
  if (id.startsWith('attention.')) {
    d.attention = value as typeof d.attention;
    know('sloane', 'Adrian looked at ' + value, 'Visible gaze during identity presentation');
    record(
      'offer',
      'claim',
      'Sloane offers Stage One at 07:00, calls it mostly reversible, and promises to erase the breach after the operation. Refusal brings job loss, referral, and a thirty-day housing-subsidy notice.',
      'Sloane’s stated terms',
    );
  }
  if (id === 'offer.refuse') {
    d.operation = 'refused';
    d.refusedOnce = true;
    d.phone = 'returned';
    d.badge = 'retained';
    d.employment = 'terminated';
    d.housing = 'notice30';
    know('sloane', 'Adrian refused', 'Adrian’s explicit refusal');
    know(
      'maya',
      'Adrian is under internal investigation',
      'Internal security alert Maya cites in her message',
    );
    record(
      'termination',
      'fact',
      'Employment ended and the badge was retained. The phone was returned. Housing subsidy expires in thirty days, not immediately.',
      'Lobby handover and employment/housing notices',
    );
  }
  if (id === 'offer.accept' || id === 'return.accept') {
    d.operation = 'accepted';
    d.phone = 'monitored';
    d.badge = 'restricted';
    know(
      'sloane',
      'Adrian accepted under the stated threat',
      'Explicit acceptance of operation terms',
    );
    record(
      'accepted',
      'fact',
      'Adrian accepted the proposed operation under coercion. He has a restricted badge and his phone; no procedure has occurred.',
      'Explicit acceptance and executive release',
    );
    record(
      'appointment',
      'claim',
      'Sloane instructs Adrian to attend Sublevel 17 at 07:00.',
      'Release instructions',
    );
    record(
      'monitoring',
      'claim',
      'Sloane warns Adrian to assume every call on the returned phone is monitored.',
      'Sloane’s warning',
    );
  }
  if (id === 'refusal.walk' || id === 'return.leave') {
    d.outcome = 'walkaway';
    know(
      'maya',
      'Adrian refused Sloane’s operation, lost employment and is leaving Axiom',
      'Adrian’s answered call outside the gates',
    );
    record(
      'walkaway',
      'fact',
      'Adrian refused, called Maya and continued away from Axiom. She acknowledged hearing him.',
      'Completed call and physical departure',
    );
  }
  if (id === 'file.leave' || id === 'file.withdraw') d.outcome = 'cautious';
  if (id.startsWith('evening.') && ['meet', 'call', 'avoid'].includes(value)) {
    d.evening = value as typeof d.evening;
    know(
      'maya',
      value === 'meet'
        ? 'Adrian confirmed eight at The Lantern'
        : value === 'call'
          ? 'Adrian called instead of meeting'
          : 'Adrian cancelled tonight, saying work exploded',
      'Adrian’s evening contact',
    );
    if (value === 'call')
      know(
        'maya',
        'Adrian says Axiom may record this call',
        'Adrian warns Maya before the conversation',
      );
    if (value === 'avoid') {
      exposure('cancellation', 'Outgoing message on the returned phone');
      record(
        'evening_cancelled',
        'fact',
        'Adrian sent an excuse and stayed home. Maya replied asking him to let her know he was all right.',
        'Evening message exchange',
      );
    }
  }
  if (id.startsWith('disclose.')) {
    d.disclosure = value as typeof d.disclosure;
    maya(
      value === 'medical'
        ? 'Adaptive Medicine appointment at seven tomorrow'
        : value === 'security'
          ? 'Security took Adrian’s phone; Sloane issued restricted access and sent him home'
          : 'Adrian says he is tired from Benton’s assignment',
      d.evening === 'call'
        ? 'Adrian’s monitored video call'
        : 'Adrian’s spoken disclosure at The Lantern',
    );
    if (value === 'lie')
      know(
        'maya',
        'Adrian may be withholding the reason for his distress',
        'His work excuse and visible distress',
        true,
      );
    record(
      'evening_disclosure',
      'fact',
      'Adrian told Maya: ' + c.label,
      d.evening === 'call' ? 'Monitored call' : 'In-person conversation',
    );
  }
  if (id.startsWith('closure.')) {
    d.closure = value as typeof d.closure;
    if (value === 'checkin')
      maya(
        'Maya will call Adrian at 06:30; look for Sublevel 17 if he does not answer',
        'Adrian’s explicit check-in request',
      );
    if (value === 'evelyn')
      maya(
        'Sloane proposes changing Adrian’s body tomorrow to match a woman’s identity named Evelyn Vale, which she claims was made from him',
        'Adrian’s explicit explanation of Evelyn',
      );
    if (value === 'distance')
      maya('Adrian asks not to involve Maya further', 'Adrian’s boundary request');
    record(
      'evening_closure',
      'fact',
      'Adrian told Maya: ' + c.label,
      d.evening === 'call' ? 'Monitored call' : 'In-person conversation',
    );
  }
  const warnings: Record<string, string> = {
    'warning.begin': 'DON’T GO TO SUBLEVEL 17.',
    'warning.next': 'AND DON’T TRUST THE WOMAN IN THE PHOTOGRAPH.',
    'warning.last': 'SHE ISN’T YOU.',
  };
  if (warnings[id])
    record(id, 'claim', warnings[id], 'Unknown sender; identity and accuracy unverified');
  if (id === 'warning.end') d.outcome = 'accepted';
  const [scene, phase] = c.next.split('.');
  s.scene = scene as GameState['scene'];
  s.phase = phase;
  if (!s.feedback) s.feedback = 'Recorded: ' + c.label;
  if (c.next === state.scene + '.' + state.phase) {
    if (id.startsWith('question.')) {
      const all = dayBlocks(s);
      let start = all.length - 1;
      while (start >= 0 && !(all[start].kind === 'speech' && all[start].speaker === 'Adrian'))
        start--;
      s.history.push({ node: c.next, blocks: all.slice(start, start + (value === 'why' ? 3 : 2)) });
    } else if (id.startsWith('file.')) {
      s.history.push({
        node: c.next,
        blocks: [
          { kind: 'notice', text: d.records.find((r) => r.key === id)!.text },
          ...dayBlocks(s).slice(-1),
        ],
      });
    }
  } else s.history.push({ node: c.next, blocks: dayBlocks(s) });
  return true;
}
