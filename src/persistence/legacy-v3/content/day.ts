import { z } from 'zod';
import {
  SceneSchema,
  NodeSchema,
  paragraph as p,
  thought as t,
  speech as s,
  type NodeId,
  type Block,
} from './schema';
import type { GameState } from '../state/schema';

const scene = (id: NodeId, title: string, place: string, blocks: Block[]) => ({
  id,
  title,
  place,
  blocks,
});
export const dayScenes = SceneSchema.array().parse([
  scene('file.arrival', 'Something impossible', '12:17 · Security exception', [
    p(
      'Six minutes after Maya leaves, the Helix report minimizes without input. A different case appears in its place. You did not put it there, and its access classification is higher than yours.',
    ),
    t(
      'Files do not wander into Axiom Intelligence by accident. Someone placed this in my queue. I do not yet know who, or why.',
    ),
    p(
      'EV_7A_BLACKGLASS. Origin: unresolved. Owner: A. Vale. Status: present in your workspace. The ownership field is a system label, not an explanation.',
    ),
    p(
      'You can examine the anomaly without authorizing the candidate record. Reporting, deleting and tracing each leave a record. You may also leave the object untouched and end this route.',
    ),
  ]),
  scene('file.directory', 'The file knows your name', '12:18 · EV 7A BLACKGLASS', [
    p('Most of the directory is encrypted. Four identifiers remain visible.'),
    p(
      'ORACLE — predictive system; clearance denied. PROJECT EVE — adaptive identity program; status active. VOSS, LENA — Axiom Adaptive Medicine. VALE, ADRIAN — Candidate 7A; identity package ready.',
    ),
    t('My name is not on an assignment. It is on a candidate record.'),
    p(
      'The Adrian Vale record requests biometric authorization. You should not possess clearance, but the palm reader is waiting. Authorizing would attach your biometric signature to an attempt to open the restricted record. Closing the directory gives no such authorization.',
    ),
  ]),
  scene('file.authorized', 'Access granted', '12:19 · Candidate 7A', [
    p(
      'You place your palm on the reader. ACCESS GRANTED. CANDIDATE 7A — ACTIVE. E.VALE IDENTITY PACKAGE — READY.',
    ),
    p(
      'The record begins to open. Before the image resolves, your terminal locks. The office lights shift from white to security amber. Conversations stop behind you.',
    ),
    s('Axiom Security', '“Mr Vale, take your hand off the reader. Leave your badge on the desk.”'),
  ]),
  scene('security.intervention', 'They were already waiting', '12:20 · Axiom internal security', [
    p(
      'Two officers stand behind your chair. The nearer one is a broad-shouldered woman in her forties, copper-brown hair clipped close and a matte security badge fixed precisely beneath her collarbone. Her younger partner has a narrow face, pale lashes and both hands visible at his sides. Neither reaches for a weapon. She takes your badge while he disconnects the terminal.',
    ),
    t(
      'I have never seen either of them on this floor. Familiar faces might invite negotiation. Fear arrives first, cold and physical. Anger follows quickly enough to let me speak.',
    ),
    s(
      'Senior security officer',
      '“Mr Vale, you are being escorted to Executive Intelligence. You are not under arrest.”',
    ),
    s('Adrian', '“That sentence usually ends well.”'),
    p(
      'The senior officer holds out a steady hand for your phone. Beyond the glass partition, Maya has stopped in the compliance corridor. You cannot tell how much she has seen.',
    ),
    p(
      'You can surrender the phone, demand an explanation, or send Maya one warning first. Sending it would identify her to the officers as someone you are involving. The message will say only: “SECURITY HAS ME. THEY ARE TAKING ME TO EXECUTIVE INTELLIGENCE.”',
    ),
  ]),
  scene('security.escort', 'Level 71', '12:23 · Secure elevator', [
    p(
      'The younger officer brings your coat from the back of your chair. You take it before the officers escort you off the floor. The elevator display changes to EXECUTIVE INTELLIGENCE — LEVEL 71. It ignores every floor in between.',
    ),
    s('Axiom system', '“Employee access status: suspended pending executive review.”'),
    t(
      'My apartment, medical coverage and corporate accounts all use that identity. Suspension is not termination. It is enough to show me how much of my life is behind their gates.',
    ),
    p(
      'At Level 71, the senior officer delivers your phone in a sealed pouch to an executive aide. You hear the aide confirm receipt for Director Sloane. The officers lead you to her door.',
    ),
  ]),
  scene('sloane.intro', 'Victoria Sloane', '12:28 · Executive level 71', [
    p(
      'Victoria Sloane stands at the window with the city spread beneath her. She is in her late forties, tall and spare, with bronze skin, black hair cut cleanly at the jaw and a single silver streak at her right temple. Her graphite suit carries no department pin or visible rank. It does not need one. She pours herself water, turns, and leaves you standing.',
    ),
    p(
      'The office is beautiful without being comfortable: dark wood, pale stone, no family photographs. No interrogation lights. No recording equipment you can see.',
    ),
    t(
      'I have never met Sloane. Everyone in Strategic Intelligence knows her name: Director of Executive Intelligence, sealed operations, careers ended by unsigned reviews. I expected menace. Her calm is worse. I am afraid—and angry that she can probably see it.',
    ),
    s(
      'Victoria Sloane',
      '“Do you know what disappoints me about you, Adrian? You are very good at discovering things. You are remarkably bad at understanding why you were allowed to discover them.”',
    ),
  ]),
  scene('sloane.allegation', 'She shows you the cage', '12:32 · The allegation', [
    p(
      'Sloane slides an access audit across the desk. It records your biometric authorization, the restricted directory identifiers and the attempted opening of Candidate 7A.',
    ),
    s(
      'Victoria Sloane',
      '“This supports immediate termination and referral for corporate espionage.”',
    ),
    t(
      'It records that I opened the record. It does not prove I put the file there or intended to steal anything. A public allegation could still end my career before a tribunal decided the difference.',
    ),
  ]),
  scene('sloane.brief', 'A problem inside Axiom', '12:38 · The proposed operation', [
    s(
      'Victoria Sloane',
      '“Helix has an intelligence source inside this company. Marcus Chen, their director of strategic acquisitions, will meet that source tomorrow night at the Glass House.”',
    ),
    t(
      'Marcus Chen—the Helix executive sponsoring the Novagen acquisition. This morning he was a reputation attached to a file. Sloane is describing him as an active intelligence threat.',
    ),
    p(
      'You have her account of a planned meeting. You have not seen independent evidence for it. You may question her before asking for the assignment.',
    ),
  ]),
  scene('sloane.identity', 'Someone else already has access', '12:44 · The identity package', [
    s(
      'Victoria Sloane',
      '“Enter the Glass House. Identify Marcus’s source. Return with proof. You cannot attend as Adrian Vale.”',
    ),
    s('Adrian', '“Then this conversation is over.”'),
    s('Victoria Sloane', '“Evelyn Vale already has an invitation.”'),
    t(
      'E.VALE. The identity package in the file. I assumed it was another operative. Sloane says the name as if I should recognize it.',
    ),
    p(
      'She opens the record where Security interrupted it. A woman appears beside a government identity, eight years of financial records, an Axiom employment history and photographs labelled Singapore.',
    ),
    p(
      'Evelyn looks thirty-one: shoulder-length dark hair swept behind one ear, an ivory jacket cut with severe elegance, and a composed expression that suggests the photographer has interrupted something more important. The face is feminine but not alien. She has your eyes, the line of your cheekbones and the slight asymmetry at one corner of your mouth.',
    ),
    t(
      'I recognize myself in her before the overlay appears. The first feeling is violation. The second is harder to name. I do not trust Sloane enough to show her either.',
    ),
    p(
      'AXIOM IDENTITY PACKAGE: EVELYN VALE. Age 31. Strategic Acquisitions. Glass House clearance. Singapore location history. Status active. The overlay claims 99.97 percent compatibility across facial structure and projected biometrics. These are Axiom’s records and calculations; you have no way to authenticate them here.',
    ),
    s('Adrian', '“You made her from me.”'),
    s('Victoria Sloane', '“Yes.”'),
    s('Adrian', '“Who is she?”'),
    s('Victoria Sloane', '“You are.”'),
  ]),
  scene('sloane.offer', 'Become Evelyn for the operation', '12:52 · The offer', [
    p(
      'At 07:00 tomorrow, Axiom Adaptive Medicine would begin a Stage One physical adaptation to make you pass as Evelyn at the Glass House.',
    ),
    s(
      'Victoria Sloane',
      '“Stage One is mostly reversible. Dr Lena Voss will explain the medical limits before the procedure. You will identify the source and obtain proof of the exchange.”',
    ),
    s('Adrian', '“And if I say no?”'),
    s(
      'Victoria Sloane',
      '“I send the audit to Corporate Security. You lose your position today. Your lease subsidy ends in thirty days. They decide whether to prosecute. Complete the operation, and the breach disappears.”',
    ),
    s('Adrian', '“That is blackmail.”'),
    s('Victoria Sloane', '“Yes.”'),
    t(
      'Accepting would buy time under her terms. It would not make those terms voluntary. Refusing would let me leave this room, not erase the allegation.',
    ),
  ]),
  scene('refusal.lobby', 'Refusal works', '13:06 · Axiom lobby', [
    p(
      'You refuse. Sloane opens the door, and you leave. At the lobby checkpoint, the senior officer returns your phone but retains your badge. You step beyond the controlled gates.',
    ),
    p(
      'Your employment account closes. An internal notice names you as the subject of an espionage investigation. A housing message confirms the subsidy ends in thirty days; it does not evict you today.',
    ),
    s('Maya · message', '“Adrian, your name just hit an internal security alert. What happened?”'),
    s('Executive Intelligence · message', 'THE OFFER REMAINS OPEN FOR SIX HOURS.'),
    t(
      'I can go back knowing what her refusal costs. Or I can call Maya and keep moving. Neither choice will undo the last hour.',
    ),
  ]),
  scene('refusal.reconsider', 'Returning is another decision', '13:14 · Executive level 71', [
    p(
      'You ask the checkpoint officer to contact Executive Intelligence. An escort takes you upstairs. Your phone stays in your hand. Sloane lets you finish speaking before she answers.',
    ),
    s(
      'Victoria Sloane',
      '“The operation remains available. Your employment does not simply reappear because you returned. I can authorize transit, residential access and tomorrow’s appointment.”',
    ),
    p(
      'The same Stage One adaptation and Glass House assignment remain on offer. You can explicitly accept under those terms or leave again. No decision has been made for you.',
    ),
  ]),
  scene('release.departure', 'What you are allowed to keep', 'Afternoon · Executive level 71', [
    s(
      'Victoria Sloane',
      '“Assume every call made on that phone is monitored. Your temporary badge will take you home and bring you back tomorrow. Sublevel 17. Seven o’clock.”',
    ),
    s('Adrian', '“And until then?”'),
    s('Victoria Sloane', '“That is your problem to solve.”'),
    t(
      'The phone feels familiar. It no longer feels private. Maya’s name is still in it. So is every unfinished promise I made this morning.',
    ),
    p(
      'An aide escorts you to the elevator. Downstairs, a guard checks the restriction stripe against the exit reader before releasing you through the outer gate. Outside, you pull on your coat and join the afternoon traffic toward home.',
    ),
  ]),
  scene('release.home', 'Home, with conditions', 'Afternoon · Adrian’s apartment', [
    p(
      'Your temporary badge admits you to the residential building. The door closes behind you. You set the phone on the counter, then move it farther away.',
    ),
    p(
      'For a while you stand where you watched the tower this morning. You eat without tasting much. The rain stops. Afternoon becomes evening without making the appointment feel any less real.',
    ),
  ]),
  scene('evening.plan', 'The hours between', '18:47 · Adrian’s apartment', [
    p(
      'Axiom Tower remains framed in the windows, every lit floor reflected faintly in the glass. You have taken off your coat but not your shoes. Evelyn’s photograph is still open behind your eyes.',
    ),
    t(
      'Tomorrow morning. Not now. Twelve hours in which I am still Adrian Vale, with no idea what to do with them. The phone can reach Maya. Sloane told me to assume it also lets Axiom listen.',
    ),
  ]),
  scene(
    'evening.disclosure',
    'Maya knows something is wrong',
    'Evening · A conversation with Maya',
    [
      s(
        'Maya',
        '“You look like somebody explained your life to you and got all the important parts wrong. What happened?”',
      ),
      t(
        'I trust her. The question is how much danger arrives with the answer. I can tell her about the appointment, explain the detention, or try to pass it off as work.',
      ),
    ],
  ),
  scene('evening.closure', 'Another chance to trust her', 'Evening · What you share', [
    t(
      'She has given me another chance to trust her. I can give her a way to check on me, tell her about Evelyn, or ask her to stop. None of those choices will make her unhear what I have already said.',
    ),
  ]),
  scene('evening.goodbye', 'The conversation ends', 'Evening · Parting', []),
  scene('evening.home', 'The apartment after', '22:40 · Adrian’s apartment', [
    p(
      'The evening is over. You are alone in the apartment again. The phone lies face-down on the kitchen counter. There is an appointment you have agreed to attend, and no guarantee beyond Sloane’s word about what follows.',
    ),
  ]),
  scene('warning.first', 'A sound that should not occur', '22:41 · Unknown channel', [
    p(
      'Notifications are muted. The phone’s Axiom filter says unidentified senders are blocked. It chimes anyway: two clean electronic notes, high then low. You start hard enough to strike your knee against the counter. The screen wakes by itself.',
    ),
    t(
      'For one irrational second I expect Sloane’s name. There is no name—only a sender field filled with static.',
    ),
    s('Unknown sender', 'DON’T GO TO SUBLEVEL 17.'),
  ]),
  scene('warning.second', 'The second warning', '22:41 · Unknown channel', [
    p(
      'Three seconds pass. The phone gives the same two-note chime, quieter now that it is in your hand. A second line appears without a typing indicator.',
    ),
    s('Unknown sender', 'AND DON’T TRUST THE WOMAN IN THE PHOTOGRAPH.'),
    t(
      'Evelyn? Whoever sent this appears to know about the appointment and a photograph. Are they trying to save me, or redirect me?',
    ),
  ]),
  scene('warning.third', 'She isn’t you', '22:42 · Unknown channel', [
    p('No chime accompanies the third message. The words simply appear beneath the others.'),
    s('Unknown sender', 'SHE ISN’T YOU.'),
    t(
      'Sloane said Evelyn is me. This stranger insists she is not. I have a claim from each of them, and no way to test either tonight. I lock the phone, then unlock it immediately, as if the words might change.',
    ),
  ]),
  scene('dayend.cautious', 'A boundary you kept', 'Day zero · Cautious withdrawal', [
    p(
      'You close the workspace without authorizing the candidate record and step away from the terminal. The anomaly remains unresolved. You have not given it your biometric signature.',
    ),
    t(
      'I do not know whether walking away ends this. I know that the next click would have been mine.',
    ),
    p(
      'This route ends at that decision. Your earlier evening plans remain intentions, not events that have already happened. Your findings and choices are available in the journal and history.',
    ),
  ]),
  scene('dayend.walkaway', 'Beyond the gates', 'Day zero · Refusal and departure', [
    p('Outside the controlled entrance, you call Maya. When she answers, you keep walking.'),
    s(
      'Adrian',
      '“Sloane offered to make the allegation disappear if I took an operation. I refused. They have ended my employment. I’m outside Axiom, and I’m leaving.”',
    ),
    s(
      'Maya',
      '“I heard you. Keep moving. We can decide what to do next when you’re somewhere you can talk.”',
    ),
    p(
      'You pass the last building carrying Axiom’s name. Maya is still on the line. You have no plan for an escape, no promise of safety, and you have not accepted the operation.',
    ),
    p(
      'This route ends with your departure. An independent path may continue later; you are not being sent back to Sloane now.',
    ),
  ]),
  scene('dayend.accepted', 'Seven o’clock remains', 'Day zero · Complete', [
    p(
      'The three messages remain on the phone. You do not know who sent them. The appointment is still set for 07:00, Sublevel 17.',
    ),
    t('Morning is close. I have agreed to go. That is not the same as knowing whom to believe.'),
    p(
      'Adrian’s day ends here, before the clinic. Review the information you earned and the choices you made, or save this run for the next milestone.',
    ),
  ]),
]);

export const DayChoiceSchema = z
  .object({
    id: z.string(),
    node: NodeSchema,
    next: NodeSchema,
    label: z.string(),
    hint: z.string(),
    repeat: z.boolean().optional(),
  })
  .strict();
const c = (
  id: string,
  node: NodeId,
  next: NodeId,
  label: string,
  hint: string,
  repeat = false,
) => ({ id, node, next, label, hint, repeat });
export const dayChoices = DayChoiceSchema.array().parse([
  c(
    'day.begin',
    'ending.complete',
    'file.arrival',
    'Continue Adrian’s day',
    'Return to the terminal after Maya’s departure.',
  ),
  c(
    'file.report',
    'file.arrival',
    'file.arrival',
    'Report the anomaly',
    'Ask Security to quarantine it. Does not authorize access.',
  ),
  c(
    'file.delete',
    'file.arrival',
    'file.arrival',
    'Delete the file',
    'Attempt removal without opening the directory.',
  ),
  c(
    'file.trace',
    'file.arrival',
    'file.arrival',
    'Trace its origin',
    'Inspect the recorded origin; do not open the candidate record.',
  ),
  c(
    'file.open',
    'file.arrival',
    'file.directory',
    'Open the directory',
    'View exposed identifiers. The candidate record requires a separate biometric decision.',
    true,
  ),
  c(
    'file.leave',
    'file.arrival',
    'dayend.cautious',
    'Leave without authorizing access',
    'End this route without biometric authorization.',
  ),
  c(
    'file.close',
    'file.directory',
    'file.arrival',
    'Close the directory',
    'Return to the anomaly without authorizing access.',
    true,
  ),
  c(
    'file.withdraw',
    'file.directory',
    'dayend.cautious',
    'Leave without authorizing',
    'End this route; keep only the identifiers you have already seen.',
  ),
  c(
    'file.authorize',
    'file.directory',
    'file.authorized',
    'Authorize with palm reader',
    'Your biometric signature will be recorded against restricted access.',
  ),
  c(
    'security.turn',
    'file.authorized',
    'security.intervention',
    'Turn around',
    'Face the officers behind you.',
  ),
  c(
    'security.comply',
    'security.intervention',
    'security.escort',
    'Give them the phone and cooperate',
    'Surrender the device without sending a message.',
  ),
  c(
    'security.reason',
    'security.intervention',
    'security.escort',
    '“Why am I being detained?”',
    'Make Security state its reason before it takes the phone.',
  ),
  c(
    'security.maya',
    'security.intervention',
    'security.escort',
    'Send Maya the warning, then surrender the phone',
    'The officers can see the recipient and message. This exposes Maya as a contact.',
  ),
  c(
    'security.enter',
    'security.escort',
    'sloane.intro',
    'Enter Sloane’s office',
    'The escort ends at the executive director’s door.',
  ),
  ...[
    ['arrest', '“Am I under arrest?”', 'Ask what authority she claims.'],
    ['planted', '“You planted the file.”', 'Accuse her; you do not yet have proof.'],
    ['counsel', '“I want counsel present.”', 'Request representation.'],
    ['silent', 'Say nothing.', 'Let her show what she wants.'],
  ].map(([v, l, h]) => c('intro.' + v, 'sloane.intro', 'sloane.allegation', l, h)),
  ...[
    ['need', '“If the evidence is enough, why am I here?”', 'Ask why she needs you.'],
    [
      'fight',
      '“Send it to Security. I will contest it.”',
      'Challenge the allegation; hear the proposed alternative before deciding.',
    ],
    ['maya', '“Leave Maya out of this.”', 'Respond to the specific exposure Sloane has shown.'],
  ].map(([v, l, h]) => c('leverage.' + v, 'sloane.allegation', 'sloane.brief', l, h)),
  c(
    'question.insider',
    'sloane.brief',
    'sloane.brief',
    '“Who is the insider?”',
    'Ask what Sloane claims to know.',
  ),
  c(
    'question.why',
    'sloane.brief',
    'sloane.brief',
    '“Why use me?”',
    'Challenge sending an analyst into the field.',
  ),
  c(
    'brief.mission',
    'sloane.brief',
    'sloane.identity',
    '“What exactly do you want me to do?”',
    'Hear the mission and identity proposal.',
  ),
  ...[
    [
      'evelyn',
      'Keep looking at Evelyn',
      'Choose to study the image; Sloane can see your gaze, not its meaning.',
    ],
    ['sloane', 'Watch Sloane instead', 'Observe what she is watching.'],
    ['exit', 'Look at the unlocked door', 'Consider whether you can leave.'],
  ].map(([v, l, h]) => c('attention.' + v, 'sloane.identity', 'sloane.offer', l, h)),
  c(
    'offer.accept',
    'sloane.offer',
    'release.departure',
    'Accept the operation',
    'Agree under coercion to tomorrow’s Stage One appointment and Glass House assignment.',
  ),
  c(
    'offer.refuse',
    'sloane.offer',
    'refusal.lobby',
    'Refuse and walk out',
    'Leave the office; face job loss and the security allegation.',
  ),
  c(
    'refusal.return',
    'refusal.lobby',
    'refusal.reconsider',
    'Return to discuss the offer',
    'Going back does not accept it yet.',
  ),
  c(
    'refusal.walk',
    'refusal.lobby',
    'dayend.walkaway',
    'Call Maya and keep moving',
    'Tell her about the refusal and job loss; end this route outside Axiom.',
  ),
  c(
    'return.accept',
    'refusal.reconsider',
    'release.departure',
    'Accept under these terms',
    'Accept explicitly. Employment termination remains on the record.',
  ),
  c(
    'return.leave',
    'refusal.reconsider',
    'dayend.walkaway',
    'Leave again and call Maya',
    'An escort takes you outside; you still refuse the operation.',
  ),
  c(
    'release.home',
    'release.departure',
    'release.home',
    'Go home',
    'Use the temporary residential access.',
  ),
  c(
    'release.evening',
    'release.home',
    'evening.plan',
    'Let the hours pass',
    'Reach the evening without skipping the journey home.',
  ),
  c(
    'evening.meet',
    'evening.plan',
    'evening.disclosure',
    'Meet Maya at The Lantern',
    'Confirm eight o’clock. Talk in person; no eavesdropping is assumed.',
  ),
  c(
    'evening.call',
    'evening.plan',
    'evening.disclosure',
    'Call Maya from the apartment',
    'Axiom can record this call. Tell Maya before discussing anything sensitive.',
  ),
  c(
    'evening.avoid',
    'evening.plan',
    'evening.home',
    'Tell her work exploded and stay home',
    'Send an excuse and resolve the invitation without meeting or calling.',
  ),
  c(
    'disclose.medical',
    'evening.disclosure',
    'evening.closure',
    '“Axiom ordered me to Adaptive Medicine at seven tomorrow.”',
    'Share the appointment, not Evelyn.',
  ),
  c(
    'disclose.security',
    'evening.disclosure',
    'evening.closure',
    '“Security took my phone. Sloane gave me restricted access and sent me home.”',
    'Explain detention and restrictions, not Evelyn.',
  ),
  c(
    'disclose.lie',
    'evening.disclosure',
    'evening.closure',
    '“Benton buried me in another assignment. I’m just tired.”',
    'Offer an excuse. Maya can doubt it without knowing the truth.',
  ),
  c(
    'closure.checkin',
    'evening.closure',
    'evening.goodbye',
    '“Call me at 06:30. If I don’t answer, look for Sublevel 17.”',
    'Give Maya a check-in time and the location.',
  ),
  c(
    'closure.evelyn',
    'evening.closure',
    'evening.goodbye',
    '“Sloane wants to change my body tomorrow to match a woman’s identity she says was made from me. Evelyn Vale.”',
    'Share Sloane’s role, the proposed adaptation and Evelyn’s name, but not the mission target.',
  ),
  c(
    'closure.distance',
    'evening.closure',
    'evening.goodbye',
    '“I cannot involve you further. Please let this go.”',
    'Ask for distance; information already shared remains known.',
  ),
  c(
    'evening.end',
    'evening.goodbye',
    'evening.home',
    'Finish the evening',
    'Complete the parting and settle at home.',
  ),
  c(
    'warning.begin',
    'evening.home',
    'warning.first',
    'Set the phone down',
    'The evening has resolved.',
  ),
  c(
    'warning.next',
    'warning.first',
    'warning.second',
    'Keep reading',
    'Read the next message when ready.',
  ),
  c(
    'warning.last',
    'warning.second',
    'warning.third',
    'Wait for the sender',
    'There is no reading timer.',
  ),
  c(
    'warning.end',
    'warning.third',
    'dayend.accepted',
    'End Adrian’s day',
    'Save with the appointment still ahead.',
  ),
]);

export function availableDayChoices(state: GameState) {
  const node = state.scene + '.' + state.phase;
  return dayChoices.filter(
    (c) =>
      c.node === node &&
      (c.repeat || !state.day.completed.includes(c.id)) &&
      (c.id !== 'leverage.maya' || state.day.exposure.length > 0),
  );
}
export function dayBlocks(state: GameState): Block[] {
  const node = state.scene + '.' + state.phase,
    d = state.day;
  const base = [...(dayScenes.find((x) => x.id === node)?.blocks ?? [])];
  const prepend: Block[] = [];
  if (node === 'file.directory')
    base.push(
      t(
        state.knowledge.includes('voss_connection')
          ? 'Voss—the former Novagen director I found in the personnel search. This places her name beside mine, but does not explain why.'
          : 'Voss is listed in Adaptive Medicine. I have no earlier personnel connection to compare with this directory.',
      ),
    );
  if (node === 'security.escort')
    prepend.push(
      ...(d.security === 'maya'
        ? [
            p(
              'You send the warning. DELIVERED appears beneath Maya’s name. The senior officer reads the recipient and the visible text, then takes the phone. Her partner records the message in the incident log.',
            ),
          ]
        : d.security === 'reason'
          ? [
              s(
                'Senior security officer',
                '“Classified systems breach. Your biometric signature opened an executive compartment.”',
              ),
              p('She takes the phone from your hand.'),
            ]
          : [
              p(
                'You surrender the phone. You send Maya nothing. She watches from the corridor as the officers lead you away.',
              ),
            ]),
    );
  if (node === 'sloane.allegation') {
    prepend.push(
      s(
        'Sloane',
        {
          arrest: '“Not yet. Whether this becomes a criminal matter depends on what happens next.”',
          planted:
            '“A useful accusation requires evidence. At present, the evidence says you opened it.”',
          counsel:
            '“I am not offering an interview. I am telling you what I intend to send to Corporate Security.”',
          silent: '“Your access audit,” she says, sliding it closer.',
        }[d.intro!],
      ),
    );
    if (d.exposure.some((e) => e.key === 'warning'))
      base.push(
        p(
          'Sloane opens the officers’ incident log. It reproduces your warning to Maya, with its delivery time and recipient.',
        ),
        s(
          'Sloane',
          '“You chose to involve Ms Reyes. Security will ask what you expected her to do.”',
        ),
      );
    if (d.exposure.some((e) => e.key === 'voss_lookup'))
      base.push(
        p(
          'A second record shows Maya Reyes querying the Voss personnel directory at 12:14, after telling you she would look from her side. Sloane has an access log, not a transcript of your coffee conversation.',
        ),
        s(
          'Sloane',
          '“Ms Reyes accessed this directory before your breach. I will ask Security whether the two are connected.”',
        ),
      );
  }
  if (node === 'sloane.brief') {
    prepend.push(
      s(
        'Sloane',
        {
          need: '“Because I need you working.”',
          fight: '“You could fight it. You might even win. Several years from now.”',
          maya: '“Then give me a reason to leave her out.”',
        }[d.leverage!],
      ),
    );
    for (const q of d.questions)
      base.push(
        s(
          'Adrian',
          q === 'insider'
            ? '“Who is the insider?”'
            : '“Why use an analyst with no field experience?”',
        ),
        s(
          'Sloane',
          q === 'insider'
            ? '“If I knew that, you would not be in this office.”'
            : '“Helix knows my operatives. It does not know you. And you see inconsistencies trained agents overlook.”',
        ),
      );
  }
  if (node === 'sloane.offer') {
    prepend.push(
      p(
        d.attention === 'evelyn'
          ? 'You keep looking at the photograph. Sloane watches your gaze; you have not told her what it means.'
          : d.attention === 'sloane'
            ? 'Sloane is watching you, not the profile. You hold her gaze.'
            : 'The door is unlocked. You look at it long enough for Sloane to notice.',
      ),
    );
    if (d.exposure.length)
      base.push(
        p(
          'The incident material concerning Maya remains in Sloane’s file. She has not promised to remove it.',
        ),
      );
  }
  if (node === 'release.departure')
    prepend.push(
      p(
        d.refusedOnce
          ? 'You explicitly accept. Sloane issues a temporary badge with a red restriction stripe. Your phone has remained with you since the lobby. Your employment remains terminated.'
          : 'You accept. Sloane opens the sealed pouch delivered by the aide and places your confiscated phone beside a temporary badge with a red restriction stripe. Your ordinary work access remains suspended.',
      ),
    );
  if (node === 'evening.plan') {
    base.push(
      s(
        'Maya · message',
        state.choices.invitation === 'invitation.yes'
          ? '“Eight o’clock. The Lantern. Are we still on?”'
          : state.choices.invitation === 'invitation.maybe'
            ? '“Did Benton release you, or do I need to file a rescue request?”'
            : '“I know you said not tonight. You sounded wrong. Are you okay?”',
      ),
    );
    base.push(
      t(
        state.relationships.bond === 'love'
          ? 'I wanted to see her this morning. Now I would be sitting across from her with Evelyn’s photograph in my head.'
          : state.relationships.bond === 'friend'
            ? 'Maya is the person I call when the world stops making sense. I am afraid of what calling her might cost.'
            : 'Maya could help me think. I would also be giving her information she has not asked to carry.',
      ),
    );
  }
  if (node === 'evening.disclosure') {
    prepend.push(
      p(
        d.evening === 'meet'
          ? 'You confirm eight with Maya, put on your coat and take a cab beyond the Axiom district. At 19:58 you enter The Lantern: amber light, scarred wooden tables and no corporate screens. Maya waits in the back booth, a black sweater replacing her suit. She looks up as you sit.'
          : 'At 19:03, you call from the apartment. Maya answers on the second tone. Her hair is down and the light behind her is warm. You warn her that Axiom may record the call. “Then I should know that before you speak,” she says.',
      ),
    );
    if (d.evening === 'meet' && state.choices.invitation === 'invitation.no')
      prepend.push(s('Maya', '“I’m glad you changed your mind.”'));
  }
  if (node === 'evening.closure')
    prepend.push(
      s(
        'Maya',
        d.disclosure === 'medical'
          ? '“Adaptive Medicine does not usually summon analysts before sunrise. What are they planning to do to you?”'
          : d.disclosure === 'security'
            ? '“They detained you, restricted your access and sent you home. They still need something. What did Sloane ask you to do?”'
            : '“You do not have to tell me. But please do not pretend this is only overtime.”',
      ),
    );
  if (node === 'evening.goodbye') {
    if (d.closure === 'checkin')
      base.push(
        p('Maya sets an alarm for 06:29.'),
        s('Maya', '“If you miss that call, I start with Sublevel 17 and work outward.”'),
        t(
          'Relief comes with guilt. I have given her a way to find me, and a reason to go looking.',
        ),
      );
    else if (d.closure === 'evelyn')
      base.push(
        s('Maya', '“A woman. An identity made from you.”'),
        p(
          d.evening === 'meet'
            ? 'She reaches across the table and takes your hand.'
            : 'She leans toward the camera.',
        ),
        s(
          'Maya',
          '“Whatever happens tomorrow, do not let Sloane be the only person who tells you what this means.”',
        ),
        t(
          'Maya looks frightened for me—not of me. I had not known how badly I needed that distinction.',
        ),
      );
    else
      base.push(
        s('Maya', '“You do not get to call isolation protection. But I cannot stop you.”'),
        t('I asked for distance. It feels less like safety now that she has agreed.'),
      );
    base.push(
      p(
        d.evening === 'meet'
          ? 'At 21:26 you leave the bar together. The pavement still shines from the rain. Maya waits until you enter the cab before turning away. You ride home and let yourself in with the restricted badge.'
          : 'At 19:18 you say goodbye. The call ends. Your own reflection remains where Maya’s face had been. You are still in your apartment.',
      ),
    );
  }
  if (node === 'evening.home') {
    if (d.evening === 'avoid')
      prepend.push(
        p(
          state.choices.invitation === 'invitation.yes'
            ? 'You send: “I’m sorry. Work exploded. I won’t make eight.” The promise is broken by your message, not silently forgotten.'
            : 'You send: “Work exploded. I’m staying home tonight.”',
        ),
        s('Maya · message', '“Fine. Let me know you’re all right.”'),
        p(
          'You send nothing further. Hours pass as you move between rooms without completing anything.',
        ),
      );
    else if (d.closure === 'checkin')
      prepend.push(
        p('Maya is expecting a call at 06:30. Your promise gives the morning another deadline.'),
      );
    else if (d.closure === 'evelyn')
      prepend.push(p('Maya knows Evelyn’s name and what Axiom proposes to do. You said it aloud.'));
    else
      prepend.push(
        p(
          'You asked Maya not to become more involved. The silence now is partly of your own making.',
        ),
      );
  }
  if (node === 'dayend.walkaway' && d.completed.includes('return.leave'))
    prepend.push(
      p(
        'An escort takes you back through the lobby. Your phone stays with you. At the outer gate the officer steps aside, and you leave a second time.',
      ),
    );
  return [...prepend, ...base];
}
