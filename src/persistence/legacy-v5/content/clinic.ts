import { z } from 'zod';
import {
  SceneSchema,
  NodeSchema,
  paragraph as p,
  thought as t,
  speech as q,
  type Block,
  type NodeId,
} from './schema';
import type { GameState } from '../state/schema';
const scene = (phase: string, title: string, place: string, blocks: Block[]) => ({
  id: ('clinic.' + phase) as NodeId,
  title,
  place,
  blocks,
});
export const clinicSections = [
  { label: 'Morning at home', phases: ['morning', 'contact', 'morningReply', 'travel'] },
  { label: 'Entrance controls', phases: ['entrance', 'screened', 'reception', 'receptionReply'] },
  { label: 'Voss and privacy', phases: ['privacy', 'privacyReply'] },
  { label: 'The examination', phases: ['exam', 'examResult'] },
  { label: 'Stage One explained', phases: ['protocol', 'profile', 'profileReview'] },
  {
    label: 'Simulation and authorization',
    phases: ['simulation', 'display', 'authorization', 'preparation'],
  },
  { label: 'The first voice', phases: ['voice', 'voiceReply', 'voicePause'] },
  { label: 'Face and first steps', phases: ['face', 'faceReply', 'facePause', 'steps'] },
  {
    label: 'Mirror and recovery',
    phases: ['mirror', 'name', 'rest', 'recoveryContact', 'recoveryReply'],
  },
  {
    label: 'Presentation and departure',
    phases: [
      'wardrobe',
      'makeup',
      'presentationReview',
      'rehearsal',
      'briefing',
      'farewell',
      'departure',
      'complete',
    ],
  },
];
export const clinicSection = (phase: string) =>
  clinicSections.findIndex((x) => x.phases.includes(phase));
export const clinicScenes = SceneSchema.array().parse([
  scene('morning', 'Before the appointment', '06:15 · Apartment', [
    p(
      'The alarm finds you awake. Rain has thinned to a pale mist across the window, and Axiom Tower has begun exchanging its night lights for the colder light of occupied offices. For several seconds you watch a floor illuminate without remembering which part of yesterday should frighten you first.',
    ),
    p(
      'The phone lies face down beside the bed. You turn it over. The three messages are still there; reading them in daylight has not supplied a sender or an explanation. Beneath them, the appointment remains fixed at 07:00.',
    ),
    t('I can decide what to do with a warning. I cannot make it true by needing it to be true.'),
    p(
      'Your jacket hangs where you left it. In its pocket, the temporary badge presses a narrow rectangle into the lining. The familiar weight of your keys is beside it. You wash, dress, and leave the apartment door closed while you gather yourself. There is still a little time before six-thirty.',
    ),
  ]),
  scene('contact', 'Six-thirty', '06:30 · Apartment', []),
  scene('morningReply', 'A voice before the door', '06:33 · Apartment', []),
  scene('travel', 'Back through the rain', '06:36 · Journey to Axiom', [
    p(
      'You check the stove although you have not used it, then collect the phone, keys, and restricted badge. Your hand stays on the apartment door after the lock engages. Tonight you may come back through it differently. The corridor gives you no place to put that thought.',
    ),
    p(
      'Downstairs, you join the morning transit queue. Nobody knows where your appointment is. A woman beside you balances a takeaway cup over her bag; two analysts argue softly about a meeting. You recognize the relief of having a small problem and feel briefly ashamed of envying them.',
    ),
    p(
      'The tower grows wider between the buildings. At its entrance you straighten your jacket, an old habit surviving the loss of the access it once suggested.',
    ),
  ]),
  scene('entrance', 'The permitted entrance', '06:49 · Axiom entrance controls', [
    p(
      'The lobby is already busy. Beyond the doors, three security lanes divide staff from visitors. Cameras follow each approach before anyone reaches a reader. You put the temporary badge against the glass and watch the employee lane remain closed.',
    ),
    q('Entrance officer', 'Appointment access. Adaptive Medicine. Use the staffed lane, please.'),
    p(
      'The officer is broad through the middle, with close-cropped grey hair and a patient expression that does not invite familiarity. You have passed this desk for years without needing his attention. Today he compares your face with a terminal image, checks the appointment, and asks you to place the phone in a shallow tray.',
    ),
    q('Adrian', 'Does this get me back to my floor?'),
    q(
      'Entrance officer',
      'Transit and residential access. The appointment adds one escorted destination. Your office is not on it.',
    ),
    t(
      'He says it as though he is reading the weather. There is nothing here I can argue with that will change the reader.',
    ),
  ]),
  scene('screened', 'One authorized destination', '06:52 · Security lane', [
    p(
      'The scanner carries the phone beneath a dark cover. A second display compares the device identifier with the one registered to your badge. You can see the phone throughout; the few seconds still feel like another confiscation.',
    ),
    q(
      'Entrance officer',
      'Take your phone. Elevator four will accept the appointment. It will not offer you another floor.',
    ),
    p(
      'You check the familiar nick at the edge of the case before putting it away. The officer returns the temporary badge and opens the pedestrian gate. You pass through only after the indicator turns green.',
    ),
    p(
      'Elevator four has no ordinary floor menu for you. ADAPTIVE MEDICINE appears above a single confirmation field. You select it, and the doors close on the working day upstairs.',
    ),
  ]),
  scene('reception', 'A name ahead of you', '06:57 · Sublevel 17 reception', [
    p(
      'The elevator opens onto white stone, warm wood, and light designed to resemble morning. Nothing smells medical. Water moves quietly behind a wall of ribbed glass. Someone has worked very hard to prevent the place from feeling underground.',
    ),
    p(
      'The receptionist wears a cream uniform and has a silver pen fastened neatly inside her sleeve. She looks up with a practiced welcome, sees your badge, and pauses.',
    ),
    q('Receptionist', 'Good morning, Mr Vale. Dr Voss is expecting you.'),
    p(
      'Her terminal turns slightly as she reaches for a pass. You read PATIENT: VALE, EVELYN before she straightens it.',
    ),
    t(
      'Yesterday it was a photograph. Here it is a patient waiting to be admitted. I am the person they have to fit into the record.',
    ),
  ]),
  scene('receptionReply', 'Through the inner door', '06:59 · Examination suite entrance', []),
  scene('privacy', 'Who controls the room?', '07:00 · Examination suite', [
    p(
      'Dr Lena Voss waits beside an examination chair. She is slight and sharp-featured, in her mid-forties, with silver threading the dark hair at her temples. A charcoal blouse shows beneath her open medical coat. She closes a record before greeting you, then looks at your face rather than your badge.',
    ),
    t(
      'She looks tired. I want that to mean there is a conscience keeping her awake. Exhaustion can belong to anyone.',
    ),
    p(
      'Sloane stands beside a window that displays a convincing imitation of daylight. Her clothes look as immaculate as they did yesterday. You have spent the intervening hours trying to sleep; she gives no sign that the interval mattered.',
    ),
    q('Voss', 'You told him?'),
    q('Sloane', 'Enough.'),
    q('Voss', 'That was not my question.'),
    p('Voss turns toward the chair but does not ask you to sit yet.'),
    q('Voss', 'I need to assess my patient. Privately.'),
    p(
      'Sloane remains beside the window. Both women wait, and the room becomes yours in one very limited respect: someone expects you to say who may remain in it.',
    ),
  ]),
  scene('privacyReply', 'The boundary you asked for', '07:02 · Examination suite', []),
  scene('exam', 'While Voss works', '07:04 · Baseline examination', [
    p(
      'The chair adjusts beneath you with a series of almost inaudible movements. Voss tells you where to put your hands before the scanner approaches. Its ring passes slowly around your shoulders, close enough that you have to resist drawing them inward.',
    ),
    q(
      'Voss',
      'This is measurement. No adaptation has started. Tell me if the position becomes uncomfortable.',
    ),
    p(
      'Columns move on her terminal: tissue density, endocrine response, skeletal tolerances. She reads them quickly, then returns to a number you cannot see. You try to read her hesitation and remember that you are an analyst attempting to assess a doctor by the angle of her head.',
    ),
    p(
      'Three details are within reach of your attention: the reflected procedure record, a calibration seal on the array, and your historical scan data. The scan gives you time to inspect one. You may also let it finish without investigating.',
    ),
    {
      kind: 'notice',
      text: 'Optional examination opportunity: 1. Inspect one source; its result will appear immediately. Rereading and follow-up questions are free.',
    },
  ]),
  scene('examResult', 'What the scan leaves behind', '07:09 · Examination result', []),
  scene('protocol', 'What “mostly” leaves out', '07:12 · Consultation area', [
    p(
      'Voss lowers the wall display until its labels sit at eye level. The model is clinical rather than theatrical: a sequence of tissue, endocrine, skeletal, and voice adaptations grouped under STAGE ONE. Later stages remain separately locked.',
    ),
    q(
      'Voss',
      'Today is intended to produce social and biometric viability. The full program would take months. I am not authorizing that program today.',
    ),
    q('Adrian', 'Victoria said mostly reversible.'),
    q(
      'Voss',
      'Most of the soft-tissue changes can be reversed through further treatment. Your endocrine baseline will not reset on command. Recovery has its own demands. And I cannot remove your memory of the experience.',
    ),
    p(
      'She lets the last sentence remain in the room. Sloane looks at the schedule on her own display.',
    ),
    q('Adrian', 'You have an evening planned for me before you have even started.'),
    q(
      'Voss',
      'She has an operation planned. I still have a patient to assess. Those are different responsibilities.',
    ),
    t(
      'Yesterday “mostly” was a word Sloane moved past. Voss has put it on the table. I am not sure whether that makes her safer or simply more exact.',
    ),
  ]),
  scene('profile', 'The limits of the design', '07:18 · Profile selection', [
    p(
      'Four versions of the same face replace the medical model. The differences are restrained: emphasis, line, presentation. The eyes and the asymmetry at one corner of the mouth persist. None offers the possibility of becoming an unrelated person.',
    ),
    q('Sloane', 'The existing Evelyn already has an invitation.'),
    q(
      'Voss',
      'The optional parameters stay within that identity’s recognition tolerances. He can choose them.',
    ),
    p(
      'Sloane touches the original, then takes her hand away. Voss turns the controls toward you. For the first time the interface is arranged for your reach rather than someone else’s.',
    ),
    t(
      'A choice within a design I did not commission. Small is not the same as meaningless. It is also not the same as freedom.',
    ),
    p(
      'You can retain the established profile or adjust it toward executive authority, social warmth, or an understated operative presentation. Reviewing a profile does not commit it.',
    ),
  ]),
  scene('profileReview', 'A choice inside the frame', '07:20 · Profile review', []),
  scene('simulation', 'Adrian beside Evelyn', '07:22 · Predictive rendering', [
    p(
      'The display places a live image of you beside the predicted result. Both figures shift when you breathe. Evelyn does not move like a recording; she waits with your impatience, holding her shoulders in the position you have held since entering the room.',
    ),
    p(
      'The resemblance refuses to stay in one category. Your eyes are familiar until the surrounding face changes how you read them. A small movement of the mouth carries an expression you recognize from photographs you dislike.',
    ),
    t(
      'I can look at a prediction without promising to want it. I need to remember that before someone writes down the length of my attention.',
    ),
    q(
      'Voss',
      'This is a model. There will be variation during recovery. Tell me what you need to understand.',
    ),
    p('Sloane says nothing. The rendering lights her face as well as yours.'),
  ]),
  scene('display', 'What you allow her to see', '07:24 · Consultation area', []),
  scene('authorization', 'The first authorization', '07:27 · Stage One review', [
    q(
      'Voss',
      'Before I begin, I need your authorization for Stage One. Your agreement to an operation is not permission for me to start a procedure.',
    ),
    q('Adrian', 'And if I refuse here?'),
    q(
      'Sloane',
      'The arrangement ends. The referral and employment consequences we discussed proceed.',
    ),
    q(
      'Voss',
      'And I do not begin. If you ask me to stop after we have begun, I stop further adaptation and assess what is needed to stabilize you. That will not mean I can return you to your starting condition today.',
    ),
    p(
      'Voss places the authorization control within your reach. There is no countdown. Beside it, the selected profile and the limits you have discussed remain available for review.',
    ),
    t(
      'The threat has not disappeared because someone has explained the procedure carefully. But the hand that starts it must still be mine.',
    ),
    {
      kind: 'notice',
      text: 'Stage One only. Mostly reversible through further treatment, not an immediate reset. Later irreversible stages require separate affirmative authorization. You may review, authorize, or refuse.',
    },
  ]),
  scene('preparation', 'Before the lights soften', '07:31 · Procedure preparation', [
    p(
      'Voss waits until the authorization appears on her own display. Then she asks you to place your phone, badge, keys, and jacket in the belongings locker. She gives you its numbered claim band. You check that the phone is inside before the door closes.',
    ),
    p(
      'Behind a screen you change into a plain clinic garment. The fabric is soft, almost aggressively comfortable. Voss knocks before returning. She explains the supports at your wrists and shoulders and checks that you can ask for help without moving.',
    ),
    q(
      'Voss',
      'I will wake you for the voice assessment. After that, we evaluate the face and your balance. If you need me to pause, say so.',
    ),
    q('Adrian', 'You will hear me?'),
    q('Voss', 'I will be here.'),
    p(
      'She adjusts one support that presses against your wrist. It is a small correction, performed without asking Sloane. You watch her do it until the overhead panels soften and the count she asked you to follow loses its place.',
    ),
  ]),
  scene('voice', 'A voice arriving', '08:03 · First adaptation checkpoint', [
    p(
      'Time returns in pieces: the edge of a ceiling panel, Voss moving beside the chair, a cool sensation at the base of your throat. Your hands rest against the supports. They look subtly narrower. You turn one as far as the padding permits and watch the tendons move.',
    ),
    q('Adrian', 'How long was I under?'),
    p(
      'The sentence stops your attention before its meaning does. It came from your chest, followed the rhythm you intended, and arrived in a lighter register you have never heard answer for you.',
    ),
    q(
      'Voss',
      'Twenty-seven minutes since sedation took effect. Your vocal tissue has adapted. I need a longer sample before we settle the register.',
    ),
    t(
      'I know what I was about to sound like. The half-second between expecting and hearing is the part I cannot prepare for.',
    ),
    q(
      'Voss',
      'We can lower it within the stable range or use Evelyn’s established voice. You can hear another sample first. You can also ask me to stop.',
    ),
  ]),
  scene('voiceReply', 'Hearing your own words', '08:07 · Voice assessment', []),
  scene('voicePause', 'The sequence is suspended', '08:07 · Procedure paused', [
    p(
      'Voss touches the pause control immediately. The soft pulses behind the chair cease. She moves where you can see her without turning your head. Sloane starts to speak; Voss raises a hand and keeps her attention on you.',
    ),
    q(
      'Voss',
      'Further adaptation is suspended. Your voice and some early tissue changes have already occurred. I cannot restore the exact starting state today. I can explain the options without continuing.',
    ),
    p(
      'She checks your breathing and gives you time to hear it. The room has not become free of pressure, but the equipment has stopped. That difference is real.',
    ),
    q(
      'Voss',
      'You can resume from this assessment, or end further treatment and move to recovery. I need you to tell me which.',
    ),
  ]),
  scene('face', 'A face in progress', '08:41 · Second adaptation checkpoint', [
    p(
      'The next interval passes with Voss checking the same questions at regular points: discomfort, orientation, whether you can hear her. When she brings the mirror into position, she asks before clearing its surface.',
    ),
    p(
      'Your jaw is softer, the mouth fuller, the shape around the eyes unfamiliar. The face is coherent. That almost makes it harder: there is no unfinished mask to imagine lifting away. The resemblance to the profile now holds even when you move.',
    ),
    t(
      'I recognize the movement before the person making it. I have spent a lifetime taking that recognition for granted.',
    ),
    p(
      'Voss waits beside the monitor. Sloane has moved closer, but she stays outside the space Voss needs to work. You can speak about the face, ask for an explanation, or stop further adaptation.',
    ),
  ]),
  scene('faceReply', 'An answer in the mirror', '08:44 · Face assessment', []),
  scene('facePause', 'No further change for the moment', '08:45 · Procedure paused', [
    p(
      'Voss suspends the next sequence and turns the mirror away at your request. The face you have seen does not vanish with it. You can feel your mouth form the question before you hear the changed voice.',
    ),
    q('Adrian', 'What happens if this is where I stop?'),
    q(
      'Voss',
      'We stabilize you in your present condition. You have undergone voice and facial adaptation, with associated tissue and endocrine changes. Ending further adaptation is not an immediate reversal. I would keep you in recovery while we arrange continuing care.',
    ),
    q('Sloane', 'There would be no operation.'),
    q('Voss', 'That is a separate consequence. I am answering a medical question.'),
    p(
      'You have time to ask Voss to explain that distinction again. The decision remains yours to state.',
    ),
  ]),
  scene('steps', 'Stand', '09:26 · Stage One complete', [
    p(
      'The last supports withdraw in an orderly sequence. Voss names each movement before it happens. When the chair rises, the clinic garment settles differently across your body, and your feet search for the floor before you quite trust its distance.',
    ),
    q(
      'Voss',
      'Slowly. Your balance needs practice. This is not a test you pass by pretending you do not need help.',
    ),
    p(
      'You sit upright. The shift of weight is slight enough to tempt you into ignoring it and distinct enough that you cannot. Sloane steps aside, leaving the route to the recovery door clear.',
    ),
    t(
      'I have been spoken about as a result all morning. There is a floor in front of me. I would like the first thing I do on it to belong to me.',
    ),
  ]),
  scene('mirror', 'Evelyn looks back', '09:29 · Recovery suite', [
    p(
      'The recovery room is warmer than the procedure suite. A chair, a robe, a glass of water, and a floor-length mirror wait under ordinary lights. Voss tells you where the handrail is, then steps back.',
    ),
    p(
      'The mirror is no longer a medical display. You can approach it, pass it, or leave the feeling unnamed. Nobody asks for an interpretation.',
    ),
    t('For once, the next thing I think does not need to be useful to anyone else.'),
  ]),
  scene('name', 'A name used as an instruction', '09:34 · Recovery suite', [
    q('Voss', 'Adrian?'),
    q('Adrian', 'I heard you.'),
    p(
      'The answer comes in the voice settled at the earlier checkpoint. Voss nods toward the water. Sloane, standing at the door, studies the result for a moment before speaking.',
    ),
    q('Sloane', 'Evelyn.'),
    p(
      'You can answer the operational name, correct her, or ask her to leave that conversation until later. Whatever you say will be heard; what you thought at the mirror remains yours.',
    ),
  ]),
  scene('rest', 'The hours needed to inhabit a body', 'Late morning · Recovery suite', [
    p(
      'Sloane leaves to arrange the afternoon briefing. Voss stays long enough to see you finish the water, then introduces a recovery nurse and explains the next checks in your hearing. You are not passed between staff as though you have ceased to be present.',
    ),
    p(
      'The nurse is a broad-faced man with quiet hands and a habit of asking before adjusting anything. He brings a tray and waits while you find a comfortable way to sit. Hunger is an ordinary sensation. You are grateful for it, then irritated by how much gratitude such a small thing can produce.',
    ),
    p(
      'The morning is measured in practical repetitions: walking to the door and back, reading a paragraph aloud, sitting without calculating the movement first. Nobody applauds. When something feels strange, you are allowed to say so.',
    ),
    p(
      'After lunch, Voss checks the claim band and opens your locker in front of you. Jacket, keys, restricted badge, phone. Your thumb finds the old nick in its case. Everything you brought here is accounted for, even if the hand holding it has changed.',
    ),
    t(
      'Maya exists outside this room. So does the apartment. It takes effort to remember that the rest of the city has continued while I have been learning to stand.',
    ),
  ]),
  scene('recoveryContact', 'The phone in your hand', '13:10 · Recovery suite', [
    p(
      'Voss gives you a few minutes before the next assessment. The phone can reach Maya. Its monitoring has not disappeared because the clinic returned it.',
    ),
    p(
      'You can send a brief update, explicitly tell her what has happened to your body and the name Evelyn, or leave the conversation untouched. A small message need not tell her everything; it must still mean what it says.',
    ),
  ]),
  scene('recoveryReply', 'Beyond the screen', '13:14 · Recovery suite', []),
  scene('wardrobe', 'Presentation is a loadout', '15:20 · Preparation suite', [
    p(
      'The hours after lunch include more rest and an orientation check. Voss asks you to describe the appointment, your present condition, and what comes next. She corrects Sloane when “ready” threatens to stand in for a medical assessment.',
    ),
    q(
      'Voss',
      'Stable enough to continue preparation. That is an assessment of how you are now, not a promise about the evening. Tell the handler if anything changes.',
    ),
    p(
      'She walks with you to a preparation suite. Three outfits wait beneath soft display lights: a dark suit, an evening dress, and an understated cocktail outfit. Beside them is a dressing area with a door you can close.',
    ),
    q(
      'Sloane',
      'You need to reach people who can choose not to speak to you. How you arrive will help them decide what they think you want.',
    ),
    p(
      'Executive presentation invites professional engagement and professional questions. Socialite presentation invites attention and closer scrutiny. Shadow presentation makes movement less conspicuous, but gives strangers less reason to include you. None guarantees access.',
    ),
  ]),
  scene('makeup', 'The details within reach', '15:45 · Dressing area', [
    p(
      'The fitting leaves time to move, sit, and change your mind. You inspect the seams and the reach of the sleeves with an analyst’s attention to practical failure. Feeling unfamiliar in the clothes does not tell you whether you chose badly.',
    ),
    p(
      'The cosmetic display offers four presets. Corporate is Sloane’s recommendation. Minimal reduces emphasis; evening deliberately increases it; custom lets you adjust colour and balance within the prepared materials.',
    ),
    t(
      'This does not settle who I am. It settles what I will put on before leaving the room. For the moment, a decision of that size is manageable.',
    ),
  ]),
  scene('presentationReview', 'Before you commit the presentation', '16:00 · Fitting review', []),
  scene('rehearsal', 'Practice before an audience', '16:10 · Preparation suite', []),
  scene('briefing', 'The work beneath the clothes', '17:10 · Final preparation', [
    p(
      'The rehearsal gives way to cover preparation. You read the identity’s professional details, repeat its name until you can say it without a pause, and practice redirecting a question you cannot answer. Sloane corrects facts rather than inventing memories for you.',
    ),
    q('Adrian', 'Knowing what a file says is not remembering having lived it.'),
    q('Sloane', 'Then do not offer stories you cannot sustain. Listen before you fill a silence.'),
    p(
      'She confirms Marcus Chen’s role at Helix and the task already given to you: identify his Axiom source and obtain actionable proof. No name is supplied for that source. Nothing in this briefing turns yesterday’s Helix assessment into proof of tonight’s exchange.',
    ),
    p(
      'On the table are your monitored phone, the temporary restricted badge, invitation credentials issued for Evelyn Vale, and an earpiece. Each has a different purpose. The invitation admits a guest; the badge remains an Axiom transit and residential credential.',
    ),
    q(
      'Sloane',
      'The earpiece connects to me. Your phone remains monitored. Neither is a private line.',
    ),
  ]),
  scene('farewell', 'Leaving the clinic', '18:05 · Sublevel 17', [
    p(
      'The earpiece test is brief. You hear Sloane from across the room with the tiny delay of the channel, answer, then remove it while Voss completes her last check. The invitation credentials are confirmed without replacing the badge you still need to get home.',
    ),
    q(
      'Voss',
      'If your balance changes, if your voice becomes difficult, if something feels wrong, tell her. You do not owe anyone a convincing performance of being well.',
    ),
    q('Adrian', 'Will you be here?'),
    q('Voss', 'I will be reachable through the medical desk. Ask for me by name.'),
    p(
      'You thank her, ask her to remember that promise, or keep the farewell brief. She has helped you through something she also helped make possible. The day has not supplied a simple category for that.',
    ),
  ]),
  scene('departure', 'Through the doors again', '18:20 · Axiom departure', [
    p(
      'You retrieve the jacket and check the keys and phone before leaving the suite. The officer at the lift verifies the escorted departure against the clinic release. The badge is still restricted; the appointment has not restored a place on your former floor.',
    ),
    p(
      'Upstairs, the evening entrance staff check the updated identity authorization attached to the escort. Their comparison takes a second longer than you want it to. Then the gate opens. No one asks you what the extra second felt like.',
    ),
    p(
      'The air outside is cool and damp. A waiting car holds the reflection of the tower along its dark flank. You enter, settle the unfamiliar clothes, and check that the door has closed before placing the phone beside you.',
    ),
    p(
      'Sloane confirms the destination with the driver, then closes your door from outside. She remains at the curb as the car pulls away from Axiom. You watch the entrance disappear behind rain on the glass. The clinic is no longer the next thing that will happen to you.',
    ),
  ]),
  scene('complete', 'Sublevel 17 complete — en route to the Glass House', '18:22 · In transit', [
    p(
      'The city moves beside the car. Your voice, your balance, and the face reflected faintly in the window are no longer predictions. Neither are they an answer you have to give tonight.',
    ),
    p(
      'The mission remains ahead: enter as Evelyn Vale, identify Marcus Chen’s Axiom source, and obtain proof. The car has not reached the Glass House.',
    ),
    t('I have made decisions inside their plan. I need to keep track of which ones were mine.'),
    p(
      'This milestone ends in transit. Your choices, earned information, and the limits you asserted remain available in the journal and conversation history.',
    ),
  ]),
  scene('stopConfirm', 'End further adaptation?', 'Clinic · Decision review', [
    p(
      'Voss keeps the procedure inactive while you consider the decision. Sloane states that ending treatment ends the mission arrangement: the security referral proceeds, employment is terminated if it has not already been, and the housing subsidy moves to the threatened thirty-day notice. A notice already issued does not start again.',
    ),
    q(
      'Voss',
      'Those consequences do not authorize further treatment. If you end it, I arrange recovery and continuing care for your actual condition.',
    ),
    p(
      'Confirming ends this clinic route. Going back returns to the authorization or paused checkpoint; it does not restart treatment.',
    ),
  ]),
  scene('stopped', 'Treatment stopped', 'Clinic · Recovery handover', [
    p('Voss confirms the stop on her terminal before turning to Sloane.'),
    q('Voss', 'There will be no further adaptation. I am transferring care to recovery.'),
    q('Sloane', 'Then the operation arrangement is withdrawn. The referral proceeds.'),
    p(
      'Sloane leaves after recording the administrative instruction. Voss calls the recovery nurse, explains your condition in your presence, and asks you to correct anything that does not match what you are feeling. The nurse brings a chair alongside yours.',
    ),
    p(
      'The recovery handover includes an administrative notice confirming employment termination and the housing subsidy change. If a thirty-day notice was already issued, its original deadline remains. No appointment or route back to the operation is imposed. You remain in clinical recovery, with continuing care and discharge arrangements pending.',
    ),
  ]),
]);
const ChoiceSchema = z
  .object({
    id: z.string(),
    node: NodeSchema,
    next: NodeSchema,
    label: z.string(),
    hint: z.string(),
    repeat: z.boolean().optional(),
  })
  .strict();
type Choice = z.infer<typeof ChoiceSchema>;
const choices: Choice[] = [];
const add = (
  phase: string,
  id: string,
  next: string,
  label: string,
  hint: string,
  repeat = false,
) =>
  choices.push({
    id,
    node: ('clinic.' + phase) as NodeId,
    next: ('clinic.' + next) as NodeId,
    label,
    hint,
    repeat,
  });
const go = (phase: string, next: string, label: string, hint = 'Continue when you are ready.') =>
  add(phase, 'c.' + phase, next, label, hint);
choices.push({
  id: 'clinic.begin',
  node: 'dayend.accepted',
  next: 'clinic.morning',
  label: 'Begin the next morning',
  hint: 'Continue to the 07:00 appointment. No procedure is authorized by continuing.',
});
for (const [id, label] of [
  ['warning', 'Read the warning again'],
  ['prepare', 'Check the phone, badge, and keys'],
  ['room', 'Look around the apartment'],
])
  add('morning', 'reflect.' + id, 'morning', label, 'Optional private reflection.');
go('morning', 'contact', 'Let six-thirty arrive');
for (const [id, label] of [
  ['answer', 'Answer Maya’s call'],
  ['miss', 'Let the arranged call go unanswered'],
  ['message', 'Send a brief departure message'],
  ['quiet', 'Leave without contacting Maya'],
])
  add(
    'contact',
    'morning.' + id,
    'morningReply',
    label,
    id === 'answer'
      ? 'The phone is monitored. Tell Maya before speaking.'
      : id === 'miss'
        ? 'Break the check-in arrangement; no rescue is assumed.'
        : 'A message discloses only that you are leaving for Axiom.',
  );
go('morningReply', 'travel', 'Leave the apartment');
go('travel', 'entrance', 'Enter Axiom');
go('entrance', 'screened', 'Place the phone in the screening tray');
go('screened', 'reception', 'Take the phone and descend');
for (const [id, label] of [
  ['correct', '“My name is Adrian.”'],
  ['ask', '“Why is the patient record under Evelyn?”'],
  ['conceal', 'Accept the pass without mentioning the screen'],
])
  add(
    'reception',
    'reception.' + id,
    'receptionReply',
    label,
    'Choose what the receptionist hears.',
  );
go('receptionReply', 'privacy', 'Enter the examination suite');
for (const [id, label] of [
  ['stay', '“She can stay.”'],
  ['ask', '“I would prefer medical privacy.”'],
  ['demand', '“Leave, Sloane.”'],
  ['silent', 'Let Voss and Sloane decide'],
])
  add('privacy', 'privacy.' + id, 'privacyReply', label, 'Set who remains during the examination.');
add(
  'privacyReply',
  'private.stop',
  'privacyReply',
  '“Can you actually stop this?”',
  'Ask Voss privately about the limits of her authority.',
);
go(
  'privacyReply',
  'exam',
  'Begin the baseline examination',
  'Measurement only. Adaptation has not begun.',
);
for (const [id, label] of [
  ['terminal', 'Inspect the reflected procedure record'],
  ['equipment', 'Read the equipment calibration seal'],
  ['scan', 'Study the historical scan data'],
  ['skip', 'Let the scan finish without investigating'],
])
  add(
    'exam',
    'exam.' + id,
    'examResult',
    label,
    id === 'skip'
      ? 'Leave the optional opportunity unused.'
      : 'Cost: 1 examination opportunity. Remaining afterward: 0.',
  );
add(
  'examResult',
  'exam.followup',
  'examResult',
  'Ask Voss about what you found',
  'Free. Ask only about the source you inspected.',
);
go('examResult', 'protocol', 'Return to the consultation area');
for (const [id, label] of [
  ['reverse', '“What would reversing this require?”'],
  ['stop', '“What happens if I stop midway?”'],
  ['later', '“What am I agreeing to beyond today?”'],
  ['ready', '“How can I be ready tonight?”'],
])
  add(
    'protocol',
    'question.' + id,
    'protocol',
    label,
    'Optional question. No cost; the answer remains in history.',
  );
go('protocol', 'profile', 'Review the operational profiles');
for (const id of ['existing', 'executive', 'socialite', 'operative'])
  add(
    'profile',
    'profile.' + id,
    'profileReview',
    id === 'existing' ? 'Review the existing Evelyn profile' : 'Review the ' + id + ' profile',
    'Preview only. Confirm on the next screen.',
    true,
  );
add(
  'profileReview',
  'profile.revise',
  'profile',
  'Revise the profile',
  'Return without committing.',
  true,
);
add(
  'profileReview',
  'profile.confirm',
  'simulation',
  'Confirm this profile',
  'Commit the presentation parameters, not authorization for treatment.',
);
for (const [id, label] of [
  ['face', 'Study Evelyn’s face'],
  ['body', 'Examine the full simulation'],
  ['technical', 'Read the medical tolerances'],
  ['sloane', 'Watch Sloane watching you'],
  ['away', 'Look away'],
])
  add(
    'simulation',
    'attention.' + id,
    'display',
    label,
    'Your attention is separate from your next spoken response.',
  );
for (const [id, label] of [
  ['hostility', 'Show hostility'],
  ['indifference', 'Keep the response level'],
  ['curiosity', 'Express curiosity'],
  ['silent', 'Remain silent'],
])
  add(
    'display',
    'display.' + id,
    'authorization',
    label,
    'Sloane can interpret the response; she cannot read your private thoughts.',
  );
add(
  'authorization',
  'auth.review',
  'authorization',
  'Review the limits again',
  'Free. Reviewing does not authorize treatment.',
  true,
);
add(
  'authorization',
  'auth.yes',
  'preparation',
  'Authorize Stage One',
  'Explicitly authorize this stage under the existing coercion.',
);
add(
  'authorization',
  'stop.request',
  'stopConfirm',
  'Refuse Stage One',
  'Review the consequences before confirming.',
  true,
);
go(
  'preparation',
  'voice',
  'Let the first procedure interval pass',
  'Authorization is already recorded. The next scene is the waking voice checkpoint.',
);
for (const [id, label] of [
  ['lower', 'Ask for a lower register'],
  ['evelyn', 'Use Evelyn’s established voice'],
  ['sample', 'Hear another sample'],
])
  add(
    'voice',
    'voice.' + id,
    id === 'sample' ? 'voice' : 'voiceReply',
    label,
    id === 'sample'
      ? 'Listen again before choosing a register. No adjustment is committed.'
      : 'Hear the selected voice before continuing.',
    id === 'sample',
  );
add(
  'voice',
  'voice.pause',
  'voicePause',
  'Ask Voss to stop',
  'Suspend further adaptation and hear your options.',
  true,
);
go('voiceReply', 'face', 'Continue to the face assessment');
add(
  'voicePause',
  'voice.resume',
  'voice',
  'Resume the voice assessment',
  'Explicit resumption. Return to the voice choices.',
  true,
);
add(
  'voicePause',
  'stop.request',
  'stopConfirm',
  'End further treatment',
  'Review the stop consequences.',
  true,
);
for (const [id, label] of [
  ['unfamiliar', '“That is not me.”'],
  ['temporary', '“How much is temporary?”'],
  ['beautiful', '“She is beautiful.”'],
  ['sloane', '“Is this what you expected?”'],
])
  add(
    'face',
    'face.' + id,
    'faceReply',
    label,
    'Speak about this moment without making a permanent identity choice.',
  );
add(
  'face',
  'face.pause',
  'facePause',
  'Pause before anything further',
  'Stop the sequence while Voss explains.',
  true,
);
go('faceReply', 'steps', 'Continue to the completion assessment');
add(
  'faceReply',
  'face.pause',
  'facePause',
  'Ask Voss to pause',
  'Your earlier reaction does not remove this choice.',
  true,
);
add(
  'facePause',
  'pause.explain',
  'facePause',
  'Ask Voss to explain the limits again',
  'Free; the sequence remains paused.',
  true,
);
add(
  'facePause',
  'face.resume',
  'faceReply',
  'Resume from the face checkpoint',
  'Explicitly resume; the completion choice remains ahead.',
  true,
);
add(
  'facePause',
  'stop.request',
  'stopConfirm',
  'End further treatment',
  'Review the stop consequences.',
  true,
);
for (const [id, label] of [
  ['help', 'Accept Voss’s hand'],
  ['moment', 'Ask for a moment before standing'],
  ['alone', 'Take a supervised first step independently'],
])
  add('steps', 'step.' + id, 'mirror', label, 'No skill test. Voss stays nearby.');
for (const [id, label] of [
  ['me', 'That is me.'],
  ['notme', 'That is not me.'],
  ['unknown', 'I do not know.'],
  ['beautiful', 'She is beautiful.'],
  ['anger', 'What have they done to me?'],
  ['unnamed', 'Leave the feeling unnamed'],
  ['skip', 'Pass the mirror without looking'],
])
  add(
    'mirror',
    'mirror.' + id,
    'name',
    label,
    'Private interpretation. This is not spoken to anyone.',
  );
for (const [id, label] of [
  ['answer', 'Answer to Evelyn for the operation'],
  ['correct', '“Adrian, for now.”'],
  ['defer', '“We can discuss that later.”'],
])
  add('name', 'name.' + id, 'rest', label, 'Choose the response they hear.');
go('rest', 'recoveryContact', 'Let the recovery checks and lunch pass');
for (const [id, label] of [
  ['brief', 'Send Maya a brief recovery update'],
  ['identity', 'Tell Maya explicitly about the adaptation'],
  ['quiet', 'Keep the phone conversation untouched'],
])
  add(
    'recoveryContact',
    'contact.' + id,
    'recoveryReply',
    label,
    id === 'identity'
      ? 'Disclose your changed body and Evelyn’s name on the monitored phone.'
      : id === 'brief'
        ? 'Say you are recovering after treatment at Axiom, without describing the identity.'
        : 'No message is sent.',
  );
go('recoveryReply', 'wardrobe', 'Finish recovery and move to preparation');
for (const id of ['executive', 'socialite', 'shadow'])
  add(
    'wardrobe',
    'outfit.' + id,
    'makeup',
    'Try the ' + id + ' outfit',
    'Preview its fit before committing.',
    true,
  );
for (const id of ['corporate', 'minimal', 'evening', 'custom'])
  add(
    'makeup',
    'makeup.' + id,
    'presentationReview',
    'Try ' + id + ' makeup',
    'Review outfit and cosmetics together.',
    true,
  );
add(
  'presentationReview',
  'fit.revise',
  'wardrobe',
  'Revise the fitting',
  'Return to fitting before making your final choice.',
  true,
);
add(
  'presentationReview',
  'fit.confirm',
  'rehearsal',
  'Commit the presentation',
  'Record your chosen outfit and cosmetic approach once.',
);
for (const [id, label] of [
  ['practice', 'Work through the rehearsal'],
  ['question', 'Ask what to do when the approach fails'],
  ['boundary', 'Ask for a pause before trying again'],
])
  add(
    'rehearsal',
    'rehearse.' + id,
    'briefing',
    label,
    'Get feedback specific to the chosen presentation.',
  );
go('briefing', 'farewell', 'Check the credentials and test the earpiece');
for (const [id, label] of [
  ['thanks', 'Thank Voss'],
  ['promise', 'Ask her to remember her promise'],
  ['brief', 'Keep the farewell brief'],
])
  add('farewell', 'farewell.' + id, 'departure', label, 'Finish the conversation before leaving.');
go(
  'departure',
  'complete',
  'Settle into the car',
  'End this milestone in transit, before the Glass House.',
);
add(
  'stopConfirm',
  'stop.back',
  'authorization',
  'Return to the decision',
  'Return to the authorization or paused checkpoint without resuming.',
  true,
);
add(
  'stopConfirm',
  'stop.confirm',
  'stopped',
  'Confirm: end further adaptation',
  'End the operation arrangement and transfer to recovery.',
);
export const clinicChoices = ChoiceSchema.array().parse(choices);
export const availableClinicChoices = (s: GameState) =>
  clinicChoices.filter((c) => {
    if (c.node !== s.scene + '.' + s.phase || (!c.repeat && s.clinic.completed.includes(c.id)))
      return false;
    if (c.id === 'clinic.begin')
      return s.day.outcome === 'accepted' && s.day.operation === 'accepted';
    if (c.id.startsWith('morning.'))
      return (s.day.closure === 'checkin') === ['morning.answer', 'morning.miss'].includes(c.id);
    if (c.id === 'private.stop') return !s.clinic.sloanePresent;
    if (c.id === 'exam.followup') return !!s.clinic.exam && s.clinic.exam !== 'skip';
    return true;
  });
export const examination = {
  terminal: {
    text: 'The procedure record assigns Stage One medical authority to Voss. Later stages are locked behind separate affirmative authorization.',
    source: 'Procedure record reflected in Voss’s terminal',
    reply:
      '“Victoria can order an operation. She cannot enter a medical authorization in your place. Later irreversible stages require their own agreement. That does not make the pressure outside this room disappear.”',
  },
  equipment: {
    text: 'The array’s calibration seal names Adrian Vale’s biometric tolerances and a date twenty-three days before today.',
    source: 'Dated calibration seal on the reconstruction array',
    reply:
      '“The room was calibrated before yesterday. I will not tell you it was assembled overnight.” Voss leaves the timing intact even as she declines to explain who ordered it. Preparation predates the breach; the seal does not identify who placed the file.',
  },
  scan: {
    text: 'The compatibility model incorporates Adrian’s last three annual employee screenings, including an extended endocrine panel.',
    source: 'Historical datasets listed in Adrian’s scan',
    reply:
      '“Those datasets are in the model,” Voss says. “I cannot show you an authorization for their original reuse from this screen.” The record establishes reuse. It does not establish every purpose of the screening or who approved it.',
  },
};
export const answers: Record<string, string> = {
  reverse:
    '“Further treatment, monitoring, and recovery. Most soft-tissue changes are reversible; endocrine effects are less predictable on a schedule. Mostly is not a guarantee that tomorrow can be made identical to yesterday.”',
  stop: '“I suspend further adaptation, assess your current condition, and arrange recovery. Changes already made do not disappear when the machine stops. You will be asked explicitly before resuming.”',
  later:
    '“Stage One only. Later irreversible stages require separate affirmative authorization. I am not collecting that authorization today, and Victoria cannot supply it for you.”',
  ready:
    '“We reassess after recovery. A convincing face is not field experience, and medical stability is not a promise that an operation is safe. Tell me about symptoms instead of trying to satisfy a schedule.”',
};
export function clinicBlocks(s: GameState): Block[] {
  const c = s.clinic,
    phase = s.phase;
  const blocks = [...(clinicScenes.find((x) => x.id === s.scene + '.' + phase)?.blocks || [])];
  const done = (prefix: string) =>
    [...c.completed]
      .reverse()
      .find((x) => x.startsWith(prefix))
      ?.split('.')[1];
  if (phase === 'contact')
    blocks.push(
      ...(s.day.closure === 'checkin'
        ? [
            p(
              'At exactly six-thirty Maya’s name fills the screen. You asked her to make this call. Answering it would keep the promise; letting it ring would leave her with the uncertainty you agreed to spare her.',
            ),
            t(
              'Yesterday I wanted one person to know where I was going. Wanting that does not make the phone private.',
            ),
          ]
        : [
            p(
              'Six-thirty passes without a scheduled call. You did not arrange one. Maya’s name remains in the recent conversation, with the things you told her and the things you chose not to say.',
            ),
            p(
              'You can tell her you are leaving for Axiom, or carry the unfinished conversation into the morning.',
            ),
          ]),
    );
  if (phase === 'morningReply') {
    if (c.morning === 'answer')
      blocks.push(
        q('Adrian', 'Maya. I’m here. This phone is still monitored.'),
        q('Maya', 'I remember. Are you leaving for Sublevel 17?'),
        q('Adrian', 'Yes. The appointment is at seven. I wanted to answer before I went.'),
        p(
          'Her relief arrives as a breath before she finds the words. You hear the ordinary sounds of her morning behind it, and for a moment that is harder than the questions.',
        ),
        q('Maya', 'Then you kept this part of the promise. Tell me when you can speak again.'),
        q('Adrian', 'I will try. I can’t promise when.'),
        q('Maya', 'All right. Goodbye, Adrian.'),
        p('You say goodbye and wait until the call has ended before lowering the phone.'),
      );
    else if (c.morning === 'miss')
      blocks.push(
        p(
          'The phone rings until the call ends. You watch the missed-call marker replace Maya’s name. You could not make yourself answer; the silence still belongs to you.',
        ),
        p(
          'No rescue follows the missed call on this route. Maya has the unanswered arrangement and whatever you told her yesterday. You put the phone in your jacket.',
        ),
      );
    else if (c.morning === 'message')
      blocks.push(
        q(
          'Adrian · message',
          'I’m leaving for Axiom now. I may not be able to answer for a while. This phone is monitored.',
        ),
        p(
          'The message shows delivered. You wait a moment without inventing a reply, then put the phone away.',
        ),
      );
    else
      blocks.push(
        p(
          'You leave the conversation as it is. No message goes out. The lack of a new promise does not remove the older things between you.',
        ),
      );
  }
  if (phase === 'receptionReply')
    blocks.push(
      ...({
        correct: [
          q('Adrian', 'My name is Adrian.'),
          q(
            'Receptionist',
            'I understand, Mr Vale. I’ll note how you wish to be addressed. The clinical record is maintained by the treatment team.',
          ),
          p('She writes the note while you watch. The header does not change.'),
        ],
        ask: [
          q('Adrian', 'Why is the patient record under Evelyn?'),
          q(
            'Receptionist',
            'That is the linked treatment identity. Dr Voss will explain the appointment. I cannot amend the clinical record from reception.',
          ),
          p('Her answer gives the label a function without explaining its origin.'),
        ],
        conceal: [
          p(
            'You accept the pass without mentioning the screen. The receptionist relaxes into the sequence she knows: point out the inner door, confirm the doctor’s name, let the patient proceed.',
          ),
        ],
      }[done('reception.') || 'conceal'] || []),
      p(
        'The receptionist opens the inner door. You follow the lit passage to the examination suite, still carrying your phone and badge.',
      ),
    );
  if (phase === 'privacy')
    blocks.push(
      t(
        s.knowledge.includes('voss_connection') || s.investigation === 'personnel'
          ? 'Voss came from Novagen. I found the personnel link yesterday; now she is waiting to examine me. The connection is real. What it means is still not settled.'
          : 'Her name was in the directory, and Sloane named her as the doctor. This is the first time I have met the person behind it.',
      ),
    );
  if (phase === 'privacyReply')
    blocks.push(
      p(
        c.sloanePresent
          ? c.privacy === 'stay'
            ? 'You permit Sloane to remain. Voss confirms that choice with you before opening the baseline record. Sloane takes a chair where she can see the examination.'
            : 'You say nothing. Voss waits, then begins with Sloane still in the room. Silence has left the existing arrangement in place; it has authorized no treatment.'
          : c.privacy === 'demand'
            ? '“Leave, Sloane.” Your voice sounds steadier than your hands feel. She studies you, then steps outside. Voss waits for the door to close.'
            : '“I would prefer medical privacy.” Sloane pauses before stepping outside. Voss closes the door herself.',
      ),
      q('Voss', 'The baseline scan is measurement only. We will discuss adaptation afterward.'),
      p(
        c.sloanePresent
          ? 'Sloane is present for what you say next.'
          : 'You have a private interval with Voss. It does not make the rest of the appointment private.',
      ),
    );
  if (phase === 'examResult') {
    if (c.exam && c.exam !== 'skip') {
      const x = examination[c.exam as keyof typeof examination];
      blocks.push(
        { kind: 'notice', text: 'Examination opportunity remaining: 0.' },
        p(x.text),
        t(
          c.exam === 'equipment'
            ? 'Twenty-three days. Whatever yesterday changed, it did not create the need to prepare this room.'
            : c.exam === 'scan'
              ? 'They have made yesterday’s screenings part of today’s model. I need to keep what the record shows separate from what I suspect.'
              : 'There are two authorities on the page. That distinction may matter when they stop agreeing.',
        ),
        p(
          'You can reread this finding here or in the journal. The inspection cannot be spent again.',
        ),
      );
    } else
      blocks.push(
        p(
          'You let the scan finish without inspecting another source. Voss closes the baseline display. You have acquired no extra finding by declining the opportunity.',
        ),
      );
    blocks.push(
      q('Voss', 'Your compatibility is high. The adaptation should be stable.'),
      q('Adrian', 'How long have you known that?'),
      q('Voss', 'That is a better question for Victoria.'),
      p('She releases the chair and helps you return to the consultation area.'),
    );
  }
  if (phase === 'protocol')
    blocks.unshift(
      p(
        ['stay', 'silent'].includes(c.privacy || '')
          ? 'Sloane moves with you to the consultation table. She never left the examination.'
          : 'Voss opens the door and calls Sloane back. She returns before the protocol discussion begins.',
      ),
    );
  if (phase === 'profileReview')
    blocks.push(
      p('Selected preview: ' + c.profileDraft + '.'),
      p(
        c.profileDraft === 'existing'
          ? 'The original looks exactly like the photograph Sloane presented. Leaving it untouched can be a practical choice; the image does not get to explain your reason.'
          : c.profileDraft === 'executive'
            ? 'The adjustments emphasize controlled authority while retaining the established face. Voss shows the permitted boundaries before letting you compare it with the original.'
            : c.profileDraft === 'socialite'
              ? 'The model takes on a warmer, more conspicuous presentation. You study the difference between inviting attention and being required to enjoy it.'
              : 'You choose understatement within the same recognizable identity. Reducing emphasis does not remove the need to perform a cover.',
      ),
      p(
        'Nothing has been applied to your body. Confirm this profile or return to compare another.',
      ),
    );
  if (phase === 'display')
    blocks.push(
      p(
        c.attention === 'sloane'
          ? 'Sloane has been watching your breathing and the time you take to speak. Looking back makes her aware that you noticed her attention. It does not tell either of you what the other feels.'
          : c.attention === 'away'
            ? 'You turn away from the rendering. It remains on the wall; not looking has not made a decision about it. When you turn back toward the table, Sloane is waiting.'
            : c.attention === 'technical'
              ? 'You follow the tolerance ranges until Voss explains where the model is least certain. Numbers provide a question you know how to ask. They do not decide what you feel.'
              : c.attention === 'body'
                ? 'You study the predicted change in balance, shape, and posture. Voss answers a practical question about movement. The body on the display follows the small shift you make in the chair.'
                : 'You stay with the face long enough to notice the familiar asymmetry again. It does not resolve into simple recognition or rejection.',
      ),
      q('Sloane', 'Well?'),
      t(
        'She can hear what I choose to say. That is not the same as being entitled to the whole reaction.',
      ),
    );
  if (phase === 'authorization')
    blocks.push({
      kind: 'notice',
      text: 'Confirmed profile: ' + c.profile + '. Authorization status: not yet given.',
    });
  if (phase === 'voiceReply')
    blocks.push(
      p(
        c.voice === 'lower'
          ? 'Voss lowers the register within the stable range and asks you to repeat a neutral sentence. It sounds feminine, restrained, and closer to a region of your old voice without becoming the old voice itself.'
          : 'Voss applies the established Evelyn register. The next sentence is composed and warm at its edges; the timing of the words is still yours.',
      ),
      q('Adrian', 'I would like a glass of water when you can give me one.'),
      p(
        'The unremarkable request helps. It is something you meant, said to someone who can answer. Voss checks the waveform, then tells you when you can drink.',
      ),
      q('Voss', 'That register is recorded. We will check comfort again during recovery.'),
    );
  if (phase === 'faceReply')
    blocks.push(
      ...({
        unfamiliar: [
          q('Adrian', 'That is not me.'),
          q(
            'Voss',
            'It is your present face. You do not have to settle what it means to you while I am assessing it.',
          ),
        ],
        temporary: [
          q('Adrian', 'How much is temporary?'),
          q(
            'Voss',
            'Most soft-tissue changes can be reversed through further treatment. The endocrine effects are less obedient. I will not call this an instant disguise.',
          ),
        ],
        beautiful: [
          q('Adrian', 'She is beautiful.'),
          p(
            'The words leave you before you decide what else they might imply. Voss returns to the scan. Sloane watches your face.',
          ),
          q('Voss', 'You can notice that without making another decision.'),
        ],
        sloane: [
          q('Adrian', 'Is this what you expected?'),
          q('Sloane', 'You are adapting faster.'),
          p(
            'Voss looks sharply toward her, then checks the monitor. The exchange tells you they are comparing expectations; it supplies no hidden forecast.',
          ),
        ],
      }[c.face || 'unfamiliar'] || []),
      p(
        'Voss explains the remaining completion assessment. You can continue, or ask her to pause before it.',
      ),
    );
  if (phase === 'name')
    blocks.unshift(
      t(
        (
          {
            me: 'Recognition arrives without bringing a complete explanation.',
            notme:
              'The boundary around Adrian remains important to me. A reflection does not get to remove it.',
            unknown:
              'I do not know. It is an answer I can live with for longer than this room expects.',
            beautiful:
              'Beauty is something I notice. It need not stand in for everything else I feel.',
            anger:
              'The choice was constrained. Looking at the result does not make the constraint disappear.',
            unnamed: 'I can leave this feeling unnamed until I have room to understand it.',
            skip: 'I pass the mirror. There will be other moments to look.',
          } as Record<string, string>
        )[c.mirror || 'skip'],
      ),
    );
  if (phase === 'recoveryContact')
    blocks.push(
      p(
        c.morning === 'miss'
          ? 'The unanswered six-thirty call is still in the log. An update now will need to acknowledge that silence.'
          : c.morning === 'answer'
            ? 'You answered the promised call this morning. Maya asked to hear when you could speak again.'
            : 'Your last contact remains exactly what you chose to send. The phone does not turn silence into an explanation.',
      ),
    );
  if (phase === 'recoveryReply') {
    if (c.contact === 'quiet')
      blocks.push(
        p(
          'You lock the phone without sending anything. Maya receives no account of the procedure. Her earlier knowledge and any unanswered promise remain unchanged.',
        ),
        p('You put the phone beside the keys and wait for Voss’s next check.'),
      );
    else
      blocks.push(
        q('Adrian · message', recoveryMessage(s)),
        p(
          'Delivered. You wait with the screen in your hand. Her reply appears after a few minutes.',
        ),
        q(
          'Maya · message',
          c.contact === 'identity'
            ? 'You have actually been through it. Adrian, I’m here. You don’t have to explain what it means on this phone. Tell me when you can.'
            : c.morning === 'miss'
              ? 'I called when we agreed. I’m glad you answered now. Recover first. We still need to talk.'
              : 'Thank you for telling me. Recover first. Tell me when you can speak.',
        ),
        q('Adrian · message', 'I have another assessment now. I’ll leave it there for the moment.'),
        p(
          'The last message shows delivered. You end the exchange and put the phone away; her response has not made the channel private.',
        ),
      );
  }
  if (phase === 'presentationReview')
    blocks.push(
      p('Outfit: ' + c.outfitDraft + '. Makeup: ' + c.makeupDraft + '.'),
      p(
        'You walk to the end of the room, sit, and stand again. The fitting is a chance to revise the practical choice, not an examination of whether you have become the person in the clothes.',
      ),
      p(
        'Confirm both selections or return to fitting. Only the confirmed choices are recorded as your final presentation.',
      ),
    );
  if (phase === 'rehearsal')
    blocks.push(
      ...rehearsal(s),
      p(
        'You can practice the approach, ask about its limitations, or ask for a short pause before trying. The exercise provides experience with a method; it does not certify success at the party.',
      ),
    );
  if (phase === 'stopConfirm' || phase === 'stopped')
    blocks.push(
      {
        kind: 'notice',
        text:
          'Physical stage: ' +
          {
            unchanged: 'No adaptation begun.',
            voice: 'Voice and early tissue adaptation; not restored to baseline.',
            face: 'Voice and facial adaptation with associated tissue and endocrine changes.',
            complete: 'Stage One complete.',
          }[c.stage],
      },
      p(
        phase === 'stopped'
          ? c.belongings === 'returned'
            ? 'Voss returns the locker contents in your presence. Your phone, keys, jacket, and restricted badge are accounted for. No invitation credentials or earpiece are issued.'
            : 'Your phone, keys, jacket, and restricted badge remain with you. No invitation credentials or earpiece are issued.'
          : 'Going back does not restart the equipment.',
      ),
    );
  return blocks;
}
export function recoveryMessage(s: GameState) {
  const apology = s.clinic.morning === 'miss' ? 'I’m sorry I missed our call. ' : '';
  return (
    apology +
    (s.clinic.contact === 'identity'
      ? 'The treatment has changed my body to a woman’s appearance and voice for the operation. They call the identity Evelyn Vale. I’m recovering at Axiom. This phone is monitored.'
      : 'I have had treatment at Axiom and am in recovery. I can’t explain more on this monitored phone right now.')
  );
}
export function rehearsal(s: GameState): Block[] {
  return s.clinic.outfit === 'executive'
    ? [
        p(
          'Sloane plays a guest who asks what authority you represent. You practice a concise introduction, then hold a silence instead of filling it with invented credentials.',
        ),
        q(
          'Sloane',
          'Authority invites a test. Expect questions specific enough to reveal whether you know your work.',
        ),
      ]
    : s.clinic.outfit === 'socialite'
      ? [
          p(
            'You rehearse a warm introduction and a question that returns attention to the other person. The second attempt is less rushed; you let the answer finish before redirecting it.',
          ),
          q(
            'Sloane',
            'Attention buys the beginning of a conversation. It also gives people a reason to remember details you might prefer they missed.',
          ),
        ]
      : [
          p(
            'You practice crossing the preparation room without interrupting a conversation, then choosing a place from which to join it. Moving unobtrusively proves easier than finding a natural opening to speak.',
          ),
          q(
            'Sloane',
            'Being overlooked is useful until you need someone to include you. Plan an opening; do not expect invisibility to introduce you.',
          ),
        ];
}
