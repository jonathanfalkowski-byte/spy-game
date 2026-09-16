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
import type { Lead } from '../state/mission-schema';

export const missionSections = [
  { label: 'Home in another skin', phases: ['home', 'homePresentation', 'homeContact'] },
  { label: 'The journey', phases: ['car', 'arrival'] },
  { label: 'Admitted as Evelyn', phases: ['reception', 'elevator', 'entry'] },
  { label: 'Marcus remembers', phases: ['marcus', 'marcusReply'] },
  { label: 'Celeste’s reunion', phases: ['celeste', 'celesteReply', 'cover'] },
  { label: 'The room', phases: ['hub', 'leadReview'] },
  { label: 'Following the leads', phases: ['leadResult', 'leadRead'] },
  { label: 'Giving Sloane a name', phases: ['assessment', 'assessmentReview'] },
  { label: 'What to capture', phases: ['method'] },
  { label: 'The exchange', phases: ['exchange', 'confrontation', 'escape'] },
  {
    label: 'The way out',
    phases: ['debrief', 'debriefReply', 'warning1', 'warning2', 'warning3', 'garage', 'complete'],
  },
];
export const missionSection = (phase: string, includeHome = true) => {
  const index = missionSections.findIndex((s) => s.phases.includes(phase));
  return includeHome || index < 1 ? index : index - 1;
};
const scene = (phase: string, title: string, place: string, blocks: Block[]) =>
  SceneSchema.parse({ id: 'mission.' + phase, title, place, blocks });
export const missionScenes = [
  scene('home', 'Home in another skin', '18:02 · Adrian’s apartment', [
    p(
      'The car leaves you at the residential entrance with a little time before the Glass House. Sloane calls it a reset window. The building calls it a familiar address. Neither description accounts for the way your body meets the lift, the key, or the quiet beyond the door.',
    ),
    p(
      'The apartment has not been cleared for a new life. Adrian’s jacket is still where it was left, the old chair still faces the rain, and the tower still fills the window. Your shoulders sit narrower beneath the shirt; the waist draws inward, and your hips and thighs carry a balance you have not learned yet. A turn between the chair and the window takes a small correction. The jacket’s old line no longer falls where you expect. A sealed garment case waits beside the wardrobe with the three presentation options Axiom prepared for tonight.',
    ),
    p(
      'The residential reader accepts the restricted badge under Evelynn Vale. The display gives the presented name without explaining the person who used to live here. You do not know who arranged the delivery or whether anyone entered the rooms. The phone remains monitored in your hand.',
    ),
    p(
      'The familiar rooms offer no instructions. You can look, handle what remains or try a routine. The garment case can wait until you are ready to prepare.',
    ),
  ]),
  scene('homePresentation', 'What nobody required', '18:09 · Adrian’s apartment', [
    p('The garment case opens onto the three presentations prepared for the Glass House. The tailored jacket changes the line of your shoulders; the evening dress asks you to adjust your stance; the shadow look leaves your new outline less announced, not less real. The choice is yours to revise before departure. Sloane will hear which one you confirm, not what you thought while trying it.'),
    p('A small personal detail is optional. Nothing in the operation requires an accessory, jewellery or a cosmetics change.'),
  ]),
  scene('homeContact', 'Before the car arrives', '18:16 · Adrian’s apartment', [
    p('The phone still carries the earlier conversation with Maya. You can review it, send one bounded update, or leave it untouched. No new check-in has been arranged.'),
    p('If you send a message, the screen will show exactly what she receives. Axiom may have access to the monitored device; that does not mean Sloane personally reads it.'),
  ]),
  scene('car', 'The city goes on', '18:23 · In the car', [
    p(
      'The car slows at another junction. For a moment it is quiet enough to hear the seat leather settle beneath you. Then the driver indicates, a delivery van lets him in, and Axiom disappears behind the buildings.',
    ),
    p(
      'There are people waiting for a bus with shopping bags between their feet. Someone runs across the crossing with a coat over their head. Yesterday you could have been any one of them. Your phone rests against your thigh, heavier than it ought to feel.',
    ),
    q(
      'Sloane · earpiece',
      'I am staying at Axiom. You will hear me on this channel. Your invitation is on the phone; your residential badge is not a Glass House credential.',
    ),
    t(
      'I can still ask the driver an ordinary question. How long the journey takes. Whether this rain is supposed to stop. I am not sure which voice I expect him to answer.',
    ),
  ]),
  scene('arrival', 'A door held open', '18:48 · Glass House entrance', [
    p(
      'The car turns beneath a glass canopy. Rain traces the roof above a line of waiting vehicles, each polished enough to hold the light. The driver brakes gently, checks the mirror, then steps outside.',
    ),
    q(
      'Driver',
      'This is your entrance, Ms Vale. Reception will direct you upstairs. Good evening.',
    ),
    p(
      'He holds the door while you find the pavement with both feet. The air is cooler than the car. You thank him; he closes the door only once your clothes are clear of it. By the time you reach the revolving doors, his taillights have joined the queue.',
    ),
  ]),
  scene('reception', 'A name that opens doors', '18:51 · Reception', [
    p(
      'A woman behind a low stone desk asks for your invitation. There is no turnstile, but a man in a dark suit stands where he can see both your hands. You hold the phone over the reader, then pass it to the receptionist. The invitation opens to Evelyn’s name and photograph.',
    ),
    q('Receptionist', 'Ms Vale. Please look toward the lens.'),
    p(
      'The pause is short enough to pass for efficiency. It still gives you time to feel the muscles around your mouth. The receptionist compares the result with the guest record and returns the phone across the desk.',
    ),
    q(
      'Receptionist',
      'Thank you. Your invitation is valid for the reception floor and the east elevators. The galleries are on that floor; staff areas remain restricted.',
    ),
    p('The man steps aside. He has not stopped watching, but he has stopped blocking the way.'),
  ]),
  scene('elevator', 'Before the doors open', '18:56 · East elevator', [
    p(
      'The attendant scans the invitation once more and selects the reception floor. He stays outside. The mirrored doors close on him, leaving you alone with a narrow copy of yourself.',
    ),
    q('Sloane · earpiece', 'Identify Marcus Chen’s source. Bring me proof. Nothing else.'),
    p(
      'The floor numbers rise. Somewhere above you, people have already begun an evening for which they needed only to get dressed. You shift your weight and feel the small correction you practised with Voss.',
    ),
  ]),
  scene('entry', 'The Glass House', '18:58 · Reception floor', [
    p(
      'The doors part onto a penthouse suspended above the city. Rain crosses windows three storeys high. A quartet plays beneath a living tree; its leaves barely move in the conditioned air. The floor catches gold light from lamps placed low enough to flatter everyone.',
    ),
    p(
      'At the far windows, men and women lean toward one another in little arrangements that open for some arrivals and close for others. Servers cross between them with practiced turns of the wrist. Two people in tailored black have no drinks and no apparent interest in the view.',
    ),
    p(
      'You step clear of the elevator before it closes. The invitation has done its work. Now someone has to speak.',
    ),
  ]),
  scene('marcus', 'The woman Marcus remembers', '19:01 · Near the windows', [
    p(
      'Marcus Chen stands by the windows with a small group that seems to be waiting for his opinion. He is lean, in his early forties, with silver at both temples and a black dinner jacket without a visible label. His smile remains with the group for a moment after his eyes have found you.',
    ),
    p(
      'He excuses himself and crosses the room. You know his title from the Helix brief: director of strategic acquisitions. Until now it was possible to imagine him as the name at the bottom of a document.',
    ),
    q('Marcus', 'Ms Vale. I was beginning to think Singapore had frightened you away.'),
    q('Sloane · earpiece', 'Do not react.'),
    t('There were photographs. That is all I have. He has an evening he expects me to remember.'),
  ]),
  scene('marcusReply', 'The space after an answer', '19:02 · Near the windows', [
    p(
      'A server offers a tray between you. Marcus declines without looking away. You have a moment in which to ask something, or let the conversation move on before he asks it for you.',
    ),
  ]),
  scene('celeste', 'An interrupted reunion', '19:04 · The gathering', [
    p(
      'A woman in a silver gown approaches from the central table. She is tall, dark-skinned, with close-cropped hair and a stillness that makes other people finish moving around her. Her expression changes when she sees your face.',
    ),
    q(
      'Marcus',
      'Celeste Laurent. The Laurent Sovereign Fund financed two of my acquisitions. I was just discovering whether Ms Vale intends to admit she remembers us.',
    ),
    p(
      'Celeste ignores the introduction and touches your arm as though returning to a conversation interrupted a few minutes ago. The easy contact is more difficult to answer than the security camera downstairs.',
    ),
    q('Celeste', 'Evelyn. You disappeared before breakfast.'),
    q('Marcus', 'Apparently Singapore left different impressions on all of us.'),
  ]),
scene('celesteReply', 'What she leaves unsaid', '19:06 · The gathering', [
    p(
      'Someone at the central table calls Marcus’s name. He gives the speaker a small raised finger, buying himself one last moment with you.',
    ),
    q('Marcus', 'We should finish this later.'),
    p(
      'He straightens his cuff and walks away. Celeste follows him with her eyes, then draws her hand back from your arm. She remains by the window. You could find her again without asking anyone where she went.',
    ),
  ]),
  scene('cover', 'A detail that should be familiar', '19:07 · Beside the central table', [
    p(
      'Celeste looks toward the windows, then back at you. The room has begun to close around its next arrangement; Marcus is close enough to hear if either of you raises a voice.',
    ),
    q('Celeste', 'You once told me the Blue Orchid was where we settled it. Or am I putting the wrong night together?'),
    p(
      'You have no memory to compare with hers. Her confidence may be care, performance or a test. You can offer a detail you know is wrong, ask her to explain, turn the conversation toward the event, or use your presentation to make the interruption public and ordinary. Marcus is close enough to hear; other guests may notice the pause.',
    ),
  ]),
  scene('hub', 'People do not stay in their files', '19:08–19:20 · The reception floor', [
    p(
      'From the edge of the gathering, the room becomes easier to read. Reception lies behind the quartet. Beyond the central table, a narrow opening leads to a service corridor. A smoked-glass partition separates that corridor from a gallery with a private table. You can see movement there without seeing everything it hides.',
    ),
    q(
      'Sloane · earpiece',
      'You have time for two lines of inquiry at most. Reception, the corridor, Laurent, or Chen himself. You can give me an assessment sooner.',
    ),
    p(
      'Guests shift as the music changes. Whatever you choose to follow, something else will happen while your back is turned.',
    ),
  ]),
  scene('leadReview', 'Before you cross the room', 'During the reception · Choose an approach', []),
  scene('leadResult', 'What you found', 'During the reception · Investigation', []),
  scene('leadRead', 'Hold the detail still', 'During the reception · Review your notes', []),
  scene('assessment', 'Giving Sloane a name', '19:21 · At the edge of the gathering', [
    p(
      'The quartet begins its last movement before dinner. Marcus leaves a conversation unfinished and turns toward the gallery. You move close enough to a column to answer Sloane without appearing to address the room.',
    ),
    q('Sloane · earpiece', 'Who is he meeting?'),
    p(
      'Benton is your supervisor. Priya Nadir is the colleague Daniel said had received the promotion; that news says nothing about this meeting. Celeste finances Marcus’s acquisitions and claims to know Evelyn. You can name one of them, or say you cannot yet justify a name.',
    ),
  ]),
  scene('assessmentReview', 'The name you will send', '19:21 · Private assessment review', [
    p(
      'Your answer is still yours to change. Once you speak, you will move on it. Nothing in the room will wait for you to be certain.',
    ),
  ]),
  scene('method', 'What can you bring back?', '19:22 · Before the transfer', [
    p(
      'The phone is in your hand. The earpiece is live. A physical approach would bring you close enough to touch someone who has no reason to let you. Each method leaves you with something different.',
    ),
    p(
      'Audio goes directly to Sloane’s recorder: a clear exchange could establish what was agreed, but you keep no independent clean copy. A photograph stays on the monitored phone: it can show participants and a transfer, not what the wafer contains. You could instead approach the contact and try to take an access token if one is within reach. That would put you close enough to be caught. The token would be a separate asset; possession alone would not prove espionage.',
    ),
  ]),
  scene('exchange', 'The exchange moves', '19:22 · Service gallery', []),
  scene('confrontation', 'Close enough to be seen', '19:23 · Beside the gallery', []),
  scene('escape', 'The distance to the elevator', '19:24 · East elevator bank', []),
  scene('debrief', 'The other objective', '19:25 · Descending elevator', [
    p(
      'You say nothing while the lift carries the other guests to the lower reception lobby. They step out, still talking about dinner. You select the service garage and wait for the doors to close again. Only then do you answer the voice in your ear.',
    ),
    q(
      'Sloane · earpiece',
      'Benton was my probable source. Suspicion was not enough to move against a director. I also wanted to see what you would decide before I supplied the name.',
    ),
    t(
      'Yesterday she said that if she knew the insider, she would not need me. Probable. There is room inside that word for everything she left out.',
    ),
  ]),
  scene('debriefReply', 'What she chose to risk', '19:26 · Descending elevator', [
    p(
      'The floor display drops below the reception levels. A little vibration travels through the soles of your shoes. Sloane is a voice in your ear again. You cannot tell what else she can see from Axiom.',
    ),
  ]),
  scene('warning1', 'An unlisted number', '19:27 · Descending elevator', [
    p(
      'The phone vibrates against your fingers. There is no name attached to the message. You tilt it away from your own reflection to read.',
    ),
    q('Unknown sender', 'BENTON WAS NOT THE REAL TEST.'),
  ]),
  scene('warning2', 'Another line', '19:27 · Descending elevator', [
    q('Unknown sender', 'YOU WERE.'),
    p(
      'The second line offers no explanation of how the sender knows about tonight. You keep reading without answering.',
    ),
  ]),
  scene('warning3', 'A question to carry', '19:27 · Descending elevator', [
    q('Unknown sender', 'SLOANE COULD HAVE STOPPED THE EXCHANGE.'),
    t('Could she? The sender sounds certain. I have only their word for it.'),
  ]),
  scene('garage', 'Below the glass', '19:28 · Service garage', [
    p(
      'The elevator opens onto painted concrete. A ventilation fan replaces the quartet. You put the phone away and step over the door track before the lift can carry you anywhere else.',
    ),
    p(
      'A car waits beyond the marked pedestrian strip. Its driver lowers the window. It is the man who brought you here; he recognizes you and steps out. He opens the rear door. For a moment you stand beside it, breathing air that smells faintly of wet tyres.',
    ),
  ]),
  scene('complete', 'The Glass House is behind you', 'Vertical slice complete · Service garage', [
    p(
      'You sit in the waiting car. The driver closes the door and waits for you to settle. Above the garage ceiling, the reception is still going on.',
    ),
    p(
      'You have an account of tonight. You also have gaps in it. Neither Sloane nor the stranger has explained why people remember Evelyn from before this morning.',
    ),
    p(
      'This part of the story ends here. Your decisions, conversations, and the evidence you actually obtained remain available to review.',
    ),
  ]),
];

export const leadNames: Record<Lead, string> = {
  guest: 'The guest ledger',
  service: 'The service corridor',
  celeste: 'Celeste’s memory',
  marcus: 'Marcus’s behaviour',
  security: 'The admission trace',
  staff: 'A server’s account',
  restricted: 'The gallery attendant',
};
export const findings: Record<
  Lead,
  { layer: 'fact' | 'claim'; text: string; source: string; limits: string; blocks: Block[] }
> = {
  guest: {
    layer: 'fact',
    text: 'A concealed Halcyon credential in the reception ledger was authenticated through E. Benton.',
    source: 'A limited credential view shown by the reception attendant',
    limits:
      'The record links Benton to the concealed credential. It does not show what the guest came to do.',
    blocks: [
      p(
        'At reception, you ask whether the private table has been assigned a host. The attendant turns his display toward himself. Your invitation gets you an answer, not his terminal.',
      ),
      q(
        'Attendant',
        'I can check the credential associated with that table. I cannot give you the guest list.',
      ),
      p(
        'He opens one entry and angles the narrow confirmation pane toward you. The public name is blank. Below it: HALCYON FOUNDATION — AUTHENTICATED THROUGH E. BENTON. He closes the pane as soon as you have read it.',
      ),
      q('You', 'That is enough. Thank you.'),
      p(
        'You move away before he has to ask. The exact initials remain easy to remember. What they authorized is less clear.',
      ),
    ],
  },
  service: {
    layer: 'fact',
    text: 'A camera interruption coincided with Benton appearing in the reflection at the service entrance.',
    source: 'Your observation from the public side of the service corridor',
    limits: 'Benton was present. The interruption’s cause and any transfer remain unproven.',
    blocks: [
      p(
        'You approach the service opening from the gallery side. A server carries a tray through it and the door remains open for a moment. You stay on the public side of the threshold.',
      ),
      p(
        'The small camera indicator above the inner door goes dark. In the polished panel opposite, a compact silver-haired man steps across the entrance: Benton. You know the shape of his shoulders from years of watching him stand over your desk.',
      ),
      q('Server', 'Can I help you, madam?'),
      q('You', 'I was looking for the washrooms.'),
      p(
        'She points you back toward reception. You thank her and go that way. Behind you, the camera light returns. You saw a man enter. You did not see who arranged the interruption or what happened beyond the door.',
      ),
    ],
  },
  celeste: {
    layer: 'claim',
    text: 'Celeste recalls Evelyn asking about Halcyon and saying: “If a man tells you to keep it narrow, look at what he is protecting.”',
    source: 'Celeste’s account of a conversation in Singapore',
    limits:
      'Her recollection echoes Benton’s wording but does not place him at tonight’s exchange.',
    blocks: [
      p(
        'Celeste is still near the window, turning the stem of her glass between two fingers. She makes space beside her when you approach.',
      ),
      q(
        'You',
        'What did I ask you in Singapore? I need the words, not what Marcus thinks they meant.',
      ),
      q(
        'Celeste',
        'Halcyon. You wanted to know who could use the foundation’s name without appearing on its invitations.',
      ),
      p('She watches your reflection rather than your face when she says the next part.'),
      q(
        'Celeste',
        'You left me a warning. “If a man tells you to keep it narrow, look at what he is protecting.” That was your phrase. I thought you were being dramatic.',
      ),
      t('Benton said keep it narrow yesterday. An echo is something. It is not a witness.'),
      q('You', 'Thank you. I need to think about that.'),
      q('Celeste', 'You said that last time, too.'),
      p(
        'She lets you leave. Whether the memory is exact, mistaken, or offered for a reason, you cannot settle here.',
      ),
    ],
  },
  marcus: {
    layer: 'fact',
    text: 'Marcus broke off a conversation when a blank place card appeared at his private table, then checked the service opening.',
    source: 'Your observation of Marcus during the reception',
    limits: 'His behaviour suggests a concealed contact; it does not identify that person.',
    blocks: [
      p(
        'You take a place where the gathering hides your line of sight. Marcus lets people approach him, gives each enough attention to keep them waiting, and looks toward the service opening whenever the music changes.',
      ),
      p(
        'An attendant places an unmarked card at the private table. Marcus stops listening to a woman halfway through her sentence. He touches her elbow, offers an apology you cannot hear, and checks the opening again.',
      ),
      p(
        'The woman notices the interruption. For a moment she and you are looking at the same man for entirely different reasons.',
      ),
      q('Guest', 'Always another conversation, with Marcus.'),
      q('You', 'So it seems.'),
      p(
        'You leave her with the observation rather than explain your interest. No name was spoken. The blank card means more to Marcus than it does to you.',
      ),
    ],
  },
  security: {
    layer: 'fact',
    text: 'The host’s limited admission trace shows the gallery credential cleared under E. Benton’s authorization.',
    source: 'A host-facing confirmation shown briefly during the reception',
    limits: 'The trace supports Benton’s access to the gallery. It does not show what he did after admission.',
    blocks: [
      p('You ask the floor host whether the private gallery is still taking guests. The answer is a polite refusal to show the roster.'),
      q('Floor host', 'I can confirm a cleared credential. I cannot show you the guest record.'),
      p('The narrow confirmation names E. Benton as the approving authorization. The host closes the panel before you can ask for more.'),
      p('A second route places Benton at the gallery entrance. It still does not show the exchange or the wafer.'),
    ],
  },
  staff: {
    layer: 'claim',
    text: 'A server says the private table was reset after a late change to the guest count.',
    source: 'A brief conversation near the service opening',
    limits: 'The server does not know who requested the change or who arrived. This is hearsay, not placement.',
    blocks: [
      p('You wait until a server pauses with an empty tray and ask whether the gallery is still in use.'),
      q('Server', 'They changed the count after the room was set. We had to replace a place card.'),
      q('You', 'Did you see who it was for?'),
      q('Server', 'No. I was bringing glassware back.'),
      p('The detail fits the blank card you noticed. The server cannot connect it to a name.'),
    ],
  },
  restricted: {
    layer: 'claim',
    text: 'The gallery attendant confirms the private table requires separate host clearance beyond the public invitation, but refuses access to the roster.',
    source: 'A request made at the public edge of the gallery',
    limits: 'The restriction explains why the invitation is insufficient. It does not identify who entered or what the table is for.',
    blocks: [
      p('You stop at the public edge of the gallery and ask whether the table has been reserved for the evening.'),
      q('Gallery attendant', 'The invitation does not clear that threshold. A host must authorize the gallery separately. I cannot show you the roster.'),
      p('The refusal is firm and quiet. You are not admitted, and the attendant looks past you toward the gathering, making clear that a second request would be remembered.'),
    ],
  },
};
const ChoiceSchema = z
  .object({
    id: z.string(),
    node: NodeSchema,
    next: NodeSchema,
    label: z.string(),
    hint: z.string(),
    repeat: z.boolean(),
  })
  .strict();
type Choice = z.infer<typeof ChoiceSchema>;
const choices: Choice[] = [];
const add = (phase: string, id: string, next: string, label: string, hint = '', repeat = false) =>
  choices.push(
    ChoiceSchema.parse({
      id,
      node: phase.includes('.') ? phase : 'mission.' + phase,
      next: next.includes('.') ? next : 'mission.' + next,
      label,
      hint,
      repeat,
    }),
  );
add(
  'clinic.complete',
  'home.begin',
  'home',
  'Return home before the Glass House',
  'A short reset window. Your body, apartment and presentation are yours to notice.',
);
add(
  'clinic.complete',
  'mission.begin',
  'car',
  'Continue to the Glass House',
  'Begin the operation from the car.',
);
for (const [id, label, hint] of [
  ['mirror', 'Look in the apartment mirror', 'Notice the changed face and body without assigning it a verdict.'],
  ['clothes', 'Handle Adrian’s old clothes', 'The shirt and jacket remain. Compare their fit without declaring what they mean.'],
  ['evidence', 'Check what came back with you', 'Review only the evidence already in your custody.'],
  ['routine', 'Try one familiar routine', 'Notice a small physical change without turning it into a diagnosis.'],
])
  add('home', 'home.' + id, 'home', label, hint);
add('home', 'home.prepare', 'homePresentation', 'Open the garment case', 'Move from noticing the apartment to preparing for the operation.');
for (const [id, label] of [
  ['executive', 'Preview the Executive presentation'],
  ['socialite', 'Preview the Socialite presentation'],
  ['shadow', 'Preview the Shadow presentation'],
])
  add('homePresentation', 'home.outfit.' + id, 'homePresentation', label, 'Revise the operation outfit privately; Sloane will know only what you confirm on departure.', true);
for (const [id, label, hint] of [
  ['watch', 'Wear Adrian’s old watch', 'A personal detail, not an operational requirement.'],
  ['earrings', 'Add the black-stone earrings', 'A voluntary detail; no one reads it as a verdict.'],
  ['none', 'Add nothing', 'Leave the optional detail off or undecided.'],
])
  add('homePresentation', 'home.detail.' + id, 'homePresentation', label, hint);
add('homePresentation', 'home.presentationDone', 'homeContact', 'Finish getting ready', 'Confirm the presentation; the optional detail may remain undecided.');
add('homeContact', 'home.maya', 'homeContact', 'Review Maya’s existing thread', 'Read only what is already in the conversation.');
add('homeContact', 'home.maya.send', 'homeContact', 'Send Maya a brief update', 'The wording reflects only what she already knows. This phone remains monitored.');
add('homeContact', 'home.maya.skip', 'homeContact', 'Leave Maya’s thread untouched', 'No message is sent and no new arrangement is created.');
add('homeContact', 'home.leave', 'car', 'Leave for the Glass House', 'Collect the phone, badge and invitation before transport.');
for (const [id, label] of [
  ['brief', 'Review Marcus’s brief'],
  ['credentials', 'Check the invitation'],
  ['maya', 'Read the existing conversation with Maya'],
])
  add('car', 'review.' + id, 'car', label, 'Optional review. No message is sent.');
add('car', 'car.arrive', 'arrival', 'Watch the city until the car arrives');
add('arrival', 'arrival.enter', 'reception', 'Walk to reception');
add('reception', 'reception.enter', 'elevator', 'Thank her and follow the attendant');
for (const [id, label, hint] of [
  ['marcus', 'Review Marcus Chen', 'Recall the brief, not unearned secrets.'],
  ['exits', 'Study the floor plan', 'Locate the east elevator and public galleries.'],
  ['mute', 'Mute Sloane for a moment', 'Only the earpiece. The phone remains monitored.'],
  [
    'reflection',
    'Study the reflection',
    'A private moment; it does not define what this face means to you.',
  ],
])
  add('elevator', 'entry.' + id, 'entry', label, hint);
add('entry', 'entry.enter', 'marcus', 'Step into the gathering', 'The earpiece will be live.');
for (const [id, label] of [
  ['poised', '“Only the forgettable parts.”'],
  ['challenge', '“Your memory appears more complete than mine.”'],
  ['warm', '“And yet you remembered me.”'],
  ['hand', 'Offer your hand without answering'],
])
  add('marcus', 'marcus.' + id, 'marcusReply', label);
add(
  'marcusReply',
  'marcus.question',
  'marcusReply',
  '“What did you expect me to remember?”',
  'Ask once; his answer remains an attributed recollection.',
);
add(
  'marcusReply',
  'marcus.detail',
  'marcusReply',
  'Ask for one detail only the two of you would know',
  'Hear a specific memory without treating it as verified.',
);
add(
  'marcusReply',
  'marcus.push',
  'marcusReply',
  'Ask who else was there',
  'Make Marcus name a witness or admit he will not.',
);
add('marcusReply', 'marcus.close', 'celeste', 'Let the subject rest');
for (const [id, label] of [
  ['bluff', '“You were asleep. I was working.”'],
  ['redirect', '“You never told Marcus what we discussed, did you?”'],
  ['boundary', '“Singapore is not a conversation for tonight.”'],
  ['memory', '“Remind me what you remember.”'],
])
  add('celeste', 'celeste.' + id, 'celesteReply', label);
add('celesteReply', 'celeste.close', 'hub', 'Give her a little space and look around');
add(
  'celesteReply',
  'cover.begin',
  'cover',
  'Stay with the detail she expects you to remember',
  'Test the account or manage the pressure before you investigate.',
);
for (const [id, label, hint] of [
  ['test', '“It was at the Marina Room.”', 'Deliberately offer a false location and see whether Celeste corrects you.'],
  ['bluff', 'Act as if you remember the Blue Orchid', 'A confident response may preserve the cover but creates a specific claim.'],
  ['partial', 'Admit the memory is incomplete', 'Ask her what mattered to her without claiming the same interpretation.'],
  ['redirect', 'Turn the conversation back to tonight', 'Decline the private test and keep the social exchange open.'],
  ['presentation', 'Use your presentation to change the room’s attention', 'Let your chosen approach alter who interrupts and what they assume.'],
])
  add('cover', 'cover.' + id, 'hub', label, hint);
for (const id of ['guest', 'service', 'celeste', 'marcus'] as Lead[]) {
  add(
    'hub',
    'lead.' + id,
    'leadReview',
    leadNames[id],
    'Review the approach before spending one opportunity.',
    true,
  );
  add(
    'hub',
    'read.' + id,
    'leadRead',
    'Reread: ' + leadNames[id],
    'No cost and no new observation.',
    true,
  );
}
for (const id of ['security', 'staff', 'restricted'] as Lead[]) {
  add(
    'hub',
    'lead.' + id,
    'leadReview',
    leadNames[id],
    'Review the approach, visibility and limits before spending one opportunity.',
    true,
  );
  add(
    'hub',
    'read.' + id,
    'leadRead',
    'Reread: ' + leadNames[id],
    'No cost and no new observation.',
    true,
  );
}
add(
  'leadReview',
  'lead.confirm',
  'leadResult',
  'Follow this lead',
  'Spend one investigation opportunity.',
  true,
);
add(
  'leadReview',
  'lead.cancel',
  'hub',
  'Choose a different direction',
  'No opportunity spent.',
  true,
);
add(
  'leadResult',
  'lead.return',
  'hub',
  'Return to the gathering',
  'Keep the finding in your journal.',
  true,
);
add('leadRead', 'read.return', 'hub', 'Return to the room', 'No opportunity spent.', true);
add(
  'hub',
  'assess.begin',
  'assessment',
  'Make an assessment now',
  'You may proceed with zero, one, or two investigations.',
  true,
);
for (const [id, label] of [
  ['benton', 'Director Elias Benton'],
  ['priya', 'Deputy Director Priya Nadir'],
  ['celeste', 'Celeste Laurent'],
  ['insufficient', 'Insufficient evidence'],
])
  add(
    'assessment',
    'source.' + id,
    'assessmentReview',
    label,
    'Review before speaking to Sloane.',
    true,
  );
add(
  'assessmentReview',
  'source.revise',
  'assessment',
  'Revise the assessment',
  'Nothing has been sent yet.',
  true,
);
add(
  'assessmentReview',
  'source.confirm',
  'method',
  'Give Sloane this assessment',
  'Commit the name or the decision to withhold one.',
);
for (const [id, label, hint] of [
  [
    'audio',
    'Route audio to Sloane',
    'A timely recording captures substance; Sloane holds the only clean copy.',
  ],
  [
    'photo',
    'Photograph the exchange',
    'Keep an image on the monitored phone; it cannot prove the wafer’s contents.',
  ],
  [
    'token',
    'Try to take the contact’s access token',
    'Greater personal risk. A useful physical asset is incomplete proof of espionage.',
  ],
])
  add('method', 'method.' + id, 'exchange', label, hint);
add(
  'exchange',
  'exchange.follow',
  'confrontation',
  'Follow the exchange',
  'Advance the authored moment. There is no reading timer.',
);
add(
  'confrontation',
  'confrontation.leave',
  'escape',
  'Make room to leave',
  'Resolve the encounter before crossing to the elevator.',
);
add('escape', 'escape.descend', 'debrief', 'Let the doors close');
for (const [id, label] of [
  ['accuse', '“You already knew it was Benton.”'],
  ['risk', '“Then you risked the exchange to test me.”'],
  ['test', '“Benton was never the whole test.”'],
  ['silent', 'Give her no reply'],
])
  add('debrief', 'debrief.' + id, 'debriefReply', label);
add('debriefReply', 'debrief.end', 'warning1', 'Let the conversation end');
add('warning1', 'warning.next1', 'warning2', 'Read the next message');
add('warning2', 'warning.next2', 'warning3', 'Read the final message');
add('warning3', 'warning.finish', 'garage', 'Put the phone away and leave the lift');
add('garage', 'garage.finish', 'complete', 'Get into the waiting car');
export const missionChoices = choices;
export function availableMissionChoices(s: GameState) {
  const node = s.scene + '.' + s.phase,
    m = s.mission;
  return choices.filter(
    (c) =>
      c.node === node &&
      (c.repeat || !m.completed.includes(c.id)) &&
      (c.id !== 'mission.begin' || s.clinic.outcome === 'departed') &&
      (!c.id.startsWith('home.detail.') ||
        !m.completed.some((done) => done.startsWith('home.detail.'))) &&
      (!['home.maya.send', 'home.maya.skip'].includes(c.id) ||
        !m.completed.some((done) => ['home.maya.send', 'home.maya.skip'].includes(done))) &&
      (!c.id.startsWith('lead.') ||
        (!['guest', 'service', 'celeste', 'marcus', 'security', 'staff', 'restricted'].includes(c.id.split('.')[1])) ||
        (!['security', 'staff', 'restricted'].includes(c.id.split('.')[1]) || m.completed.includes('home.begin')) &&
        (m.remaining > 0 && !m.leads.includes(c.id.split('.')[1] as Lead))) &&
      (!c.id.startsWith('read.') ||
        c.id === 'read.return' ||
        m.leads.includes(c.id.split('.')[1] as Lead)) &&
      (!['marcus.detail', 'marcus.push', 'cover.begin'].includes(c.id) ||
        m.completed.includes('home.begin')) &&
      (!['marcus.question', 'marcus.detail', 'marcus.push'].includes(c.id) ||
        !m.completed.includes('home.begin') ||
        !m.completed.some((done) => ['marcus.question', 'marcus.detail', 'marcus.push'].includes(done))) &&
      (c.id !== 'lead.confirm' ||
        (m.pending !== null && m.remaining > 0 && !m.leads.includes(m.pending))) &&
      (c.id !== 'source.confirm' || m.draft !== null),
  );
}
export const sourceNames = {
  benton: 'Elias Benton',
  priya: 'Priya Nadir',
  celeste: 'Celeste Laurent',
  insufficient: 'Insufficient evidence',
};
export function reasoningText(s: GameState): string {
  const m = s.mission;
  if (!m.capture) {
    if (m.reasoning === 'supported')
      return m.leads.includes('security')
        ? 'The admission trace, credential or sighting supports this identification, without establishing what happened after entry or the purpose of the meeting.'
        : 'The credential or sighting supports this identification, without establishing the purpose of the meeting.';
    if (m.reasoning === 'contextual')
      return s.mission.completed.includes('cover.test')
        ? 'Celeste corrected the detail you deliberately misstated. That gives her recollection a stronger source footing, but it still does not place anyone at the meeting.'
        : 'Celeste’s recollection offers context, but does not place this person at the meeting.';
    if (m.reasoning === 'unsupported')
      return 'You have named someone without an observation that places them at the meeting.';
    return 'You have withheld a name because you cannot yet justify one.';
  }
  if (m.reasoning === 'supported')
    return m.leads.includes('security')
      ? 'The admission trace, credential or sighting supported naming Benton. It did not prove what happened after entry or what the meeting was for.'
      : 'Your observations supported naming Benton. A credential or a sighting did not yet prove what the meeting was for.';
  if (m.reasoning === 'contextual')
    return s.mission.completed.includes('cover.test')
      ? 'Celeste corrected the detail you deliberately misstated, improving the footing of her recollection. It still did not place Benton at the meeting; the correct name did not make your inference direct evidence.'
      : 'Celeste’s recollection offered context for Benton, but did not place him at the meeting. The correct name did not make that inference direct evidence.';
  if (m.reasoning === 'unsupported')
    return m.source === 'benton'
      ? 'You named Benton without evidence placing him there. Being right did not make the guess well supported.'
      : 'Your observations did not support accusing ' +
          sourceNames[m.source!] +
          '. Familiarity or a promotion did not establish involvement.';
  return 'You withheld a name. That preserved uncertainty and cost the clean capture window.';
}
export function missionBlocks(s: GameState): Block[] {
  const m = s.mission,
    phase = s.phase;
  const blocks = [...(missionScenes.find((x) => x.id === 'mission.' + phase)?.blocks || [])];
  if (phase === 'car')
    blocks.splice(
      1,
      0,
      p(
        s.clinic.outfit === 'executive'
          ? 'The suit catches slightly beneath your shoulders when you lean back. You pull it free and smooth the lapel, a small movement rehearsed this afternoon.'
          : s.clinic.outfit === 'socialite'
            ? 'The dress lies across the seat in a way you have to arrange deliberately. Streetlights move along the fabric, then across the face in the window.'
            : 'The understated clothes were chosen to draw little attention. In the window, even that intention has an unfamiliar face. You adjust the hem before the car turns.',
      ),
    );
  if (phase === 'reception')
    blocks.push(
      p(
        s.clinic.outfit === 'executive'
          ? 'The receptionist asks whether you are attending in a professional capacity. “As invited,” you answer. She accepts the answer and notes your arrival.'
          : s.clinic.outfit === 'socialite'
            ? 'She smiles toward the reception floor and offers to summon an escort. You thank her and say the elevator directions will do. The watching man studies you for a moment longer.'
            : 'She begins to direct you toward the general reception lane, then checks the invitation again. “East lift, Ms Vale.” You follow the corrected direction.',
      ),
    );
  if (phase === 'hub' && m.leads.length) {
    blocks.splice(
      0,
      blocks.length,
      p(
        m.remaining
          ? 'You pause at the edge of the gathering. There is still time to follow one more lead, or give Sloane your assessment now.'
          : 'The last movement is nearly over. You have followed both leads; it is time to decide what to tell Sloane.',
      ),
    );
  }
  if (phase === 'hub')
    blocks.push(
      p(
        'Investigation opportunities remaining: ' +
          m.remaining +
          '. Rereading a finding costs nothing.',
      ),
    );
  if ((phase === 'leadReview' || phase === 'leadResult' || phase === 'leadRead') && m.pending) {
    const f = findings[m.pending];
    if (phase === 'leadReview')
      blocks.push(
        p(
          leadNames[m.pending] +
            '. This will use one opportunity. You have ' +
            m.remaining +
            '; ' +
            (m.remaining - 1) +
            ' will remain.',
        ),
        ...(m.leads.length === 0 ? [p(approach(s, m.pending))] : []),
        ...(m.completed.includes('home.begin') ? [p(leadCost(m.pending))] : []),
      );
    else if (phase === 'leadResult')
      blocks.push(
        ...f.blocks,
        p(leadReaction(s, m.pending)),
        p('Remaining opportunities: ' + m.remaining + '.'),
        p(f.limits),
      );
    else
      blocks.push(
        p('You recall the detail already recorded; you do not follow the lead again.'),
        p(f.text),
        p(f.source + '. ' + f.limits),
      );
  }
  if (phase === 'assessment' || phase === 'assessmentReview') {
    blocks.push(...m.leads.map((id) => p(findings[id].text + ' ' + findings[id].limits)));
    if (!m.leads.length)
      blocks.push(
        p('You followed no investigation lead. The greetings alone did not identify a source.'),
      );
    if (phase === 'assessmentReview')
      blocks.push(p('Your proposed assessment: ' + sourceNames[m.draft!] + '.'));
  }
  if (phase === 'exchange')
    blocks.push(
      p(
        m.timing === 'timely'
          ? 'You take the gallery side of the gathering, where you can watch the entrance. Naming Benton has determined where you stand; whether you had enough reason to name him is another question.'
          : m.source === 'insufficient'
            ? 'You remain at the edge of the gathering, waiting for a clearer identification. Marcus is already moving out of your best line of sight.'
            : 'You keep your attention on ' +
              sourceNames[m.source!] +
              ' while Marcus crosses toward the gallery. The distance to that doorway grows.',
      ),
      p(
        m.method === 'audio'
          ? 'You open the directional microphone. Sloane confirms her recorder is receiving. There is no local recording on the phone.'
          : m.method === 'photo'
            ? 'You open the camera on the monitored phone and check the angle of the dark glass. A reflection may let you frame the table without pointing the lens directly at it.'
            : 'You free your hand and consider the gallery threshold. You will need to locate an access token on the contact before attempting to take it. It is separate from the wafer you expect Marcus to bring.',
      ),
    );
  if (phase === 'confrontation') blocks.push(...captureScene(s));
  if (phase === 'escape') blocks.push(...escapeScene(s));
  if (phase === 'debrief' && m.capture) {
    if (!s.day.questions.includes('insider'))
      blocks.splice(
        2,
        1,
        t(
          'Probable. She had a name before I entered the room. She let me find my own way to it—or past it.',
        ),
      );
    blocks.push(q('Sloane · earpiece', debriefEvidence(s)));
  }
  return blocks;
}
export function approach(s: GameState, id: Lead): string {
  const outfit = s.clinic.outfit;
  if (outfit === 'executive')
    return id === 'guest'
      ? 'You can ask reception a precise professional question. The suit makes it easier to begin; it also invites questions about your authority.'
      : id === 'security'
        ? 'At reception, a precise professional question can open a limited check. The suit makes it easier to begin; it also invites questions about your authority.'
        : 'The suit gives you a reason to move purposefully, but someone may expect you to explain what business brings you there.';
  if (outfit === 'socialite')
    return id === 'celeste'
      ? 'Joining Celeste will look like a continuation of the reunion. People already noticed it, and may notice how it ends.'
      : id === 'staff'
        ? 'A social opening lets you ask a server one ordinary question. The attention that makes the approach easy also gives the answer an audience.'
        : 'Conversation offers a way across the room. The attention that makes an introduction easy also makes your movements easier to remember.';
  return id === 'service' || id === 'restricted'
    ? 'The understated outfit will not announce the approach. It does not make you staff or give permission to cross a restricted threshold.'
    : id === 'security'
      ? 'You can ask about the public admission record, but the attendant can end the exchange and log that you asked.'
      : 'You can wait at the edge without drawing the whole room. You will have to speak up to start an exchange; being unobtrusive is not an introduction.';
}
function leadCost(id: Lead): string {
  if (id === 'security') return 'Visibility cost: high. The admission attendant may attach your invitation number to the restricted-table check.';
  if (id === 'restricted') return 'Visibility cost: high. The gallery attendant will remember the request, and the roster remains closed.';
  if (id === 'staff') return 'Visibility cost: moderate. A server may repeat your question without being able to verify what it means.';
  if (id === 'celeste') return 'Visibility cost: personal. Marcus can see that you returned to Celeste, even if he cannot hear the words.';
  if (id === 'marcus') return 'Visibility cost: low. You can observe from the gathering, but the blank card identifies no one.';
  if (id === 'service') return 'Visibility cost: moderate. You remain on the public side of the corridor; nearby staff may notice the detour.';
  return 'Visibility cost: moderate. The attendant controls what you can see and may record the question.';
}
function leadReaction(s: GameState, id: Lead): string {
  const reactions = {
    executive: {
      guest:
        'The attendant returns to his work. Your question gave him a task he could complete without explaining your presence.',
      service:
        'The server watches you return toward reception. In this suit, a wrong turn looks less accidental than you would like.',
      celeste:
        'Celeste glances at the severe line of your jacket. “Always working,” she says as you leave. Two nearby guests look up.',
      marcus:
        'The guest asks which firm you represent. You give the name on the invitation, thank her, and move on before the question becomes a conversation.',
      security:
        'The attendant closes the audit pane and notes your invitation number. Your question has created a record even though you saw only the public clearance field.',
      staff:
        'The server checks whether you are still listening, then returns to the table. She will remember that you asked her to interpret a colleague’s movements.',
      restricted:
        'The gallery attendant repeats that the roster is private. Your professional tone gets a clear answer, not a second look at the list.',
    },
    socialite: {
      guest:
        'The attendant looks past you toward the gathering before closing the record. Your interest in a credential has interrupted the evening he expected you to be having.',
      service:
        'A guest notices you returning from the corridor and lifts a hand in greeting. You acknowledge her; your detour has acquired a witness.',
      celeste:
        'Celeste lifts her glass slightly as you leave. From across the room, it could be the end of an ordinary reunion.',
      marcus:
        'The guest tries to draw you into her circle. Leaving takes a smile, an apology, and another moment in which Marcus could notice where you were looking.',
      security:
        'A nearby guest sees you speaking with the admission attendant. The conversation looks harmless, but it joins your face to the restricted table.',
      staff:
        'The server answers with a practiced smile, and a guest at her table hears part of your question. The story may travel farther than the fact.',
      restricted:
        'The attendant declines to discuss the gallery. A guest nearby assumes you were asking for directions and offers to walk you back.',
    },
    shadow: {
      guest:
        'The attendant asks you to repeat your name before you go. You show the invitation again. Being easy to overlook has not made the question anonymous.',
      service:
        'The server returns to her tray. You follow the direction she gave you and let the traffic through the doorway close behind your glance.',
      celeste:
        'Celeste raises her voice to catch you before you leave. “Evelyn.” You turn back long enough to acknowledge her, and several guests notice the name.',
      marcus:
        'The guest looks at you properly for the first time when you answer. You have to repeat the quiet remark before she lets the conversation end.',
      security:
        'The attendant asks you to repeat your name before closing the pane. The request is routine; the access trace is not anonymous.',
      staff:
        'The server asks you to speak up, then gives only the part she saw herself. She does not want to be quoted as an authority.',
      restricted:
        'The gallery attendant catches your invitation name and confirms the public pass does not clear the private threshold. She will remember that you asked.',
    },
  };
  return reactions[(s.clinic.outfit || 'shadow') as keyof typeof reactions][id];
}
function captureScene(s: GameState): Block[] {
  const m = s.mission;
  const first =
    m.timing === 'timely'
      ? [
          p(
            'Benton enters the gallery. Marcus draws a black data wafer from his pocket and places it on the table between them. Benton’s separate access token remains clipped inside his jacket.',
          ),
        ]
      : [
          p(
            'By the time Sloane says “Benton,” Marcus has already pushed a black wafer across the table. You turn and recognize your supervisor as he covers it with his hand. The beginning of the exchange is gone. His separate access token is still clipped inside his jacket.',
          ),
        ];
  if (m.method === 'audio')
    first.push(
      ...(m.timing === 'timely'
        ? [
            q(
              'Marcus · recorded',
              'The wafer contains the handover schedule. Novagen gives us the replacement team?',
            ),
            q(
              'Benton · recorded',
              'Voss’s replacement team. Axiom will never see the personnel move until it is complete.',
            ),
            p(
              'Benton takes the wafer. Sloane confirms that both voices reached the recorder. You heard an agreement; you have not opened the object it concerned.',
            ),
          ]
        : [
            p(
              'The microphone catches “replacement team,” then the scrape of a chair. The offer and the answer have already passed. Benton pockets the wafer while Sloane confirms she received only fragments.',
            ),
          ]),
    );
  if (m.method === 'photo')
    first.push(
      p(
        m.timing === 'timely'
          ? 'In the dark glass, your frame holds both faces and both hands as the wafer passes from Marcus to Benton. You take one photograph. Benton slips the wafer into an inner pocket. The image stays on the monitored phone; it cannot tell you what is stored inside the object.'
          : 'You bring the phone around too late for the wafer. The image shows Benton and Marcus together beside the table, just before they separate. It establishes contact. The transfer is outside the frame.',
      ),
    );
  if (m.method === 'token')
    first.push(
      p(
        m.timing === 'timely'
          ? 'You cross behind a server as Benton puts the wafer away. Your fingers close on the separate access token clipped inside the other side of his jacket. It comes free into your palm. Benton catches your wrist before you can step away.'
          : 'You reach the gallery after Benton has put the wafer away. His token remains clipped inside his jacket. He turns toward you before you can reach it. You stop short; there is no object in your hand and no plausible second attempt.',
      ),
    );
  if (m.method !== 'audio')
    first.push(
      q(
        'You',
        m.method === 'photo'
          ? m.timing === 'timely'
            ? 'I have a frame of the transfer. Both faces.'
            : 'I have a photograph of them together. I missed the transfer.'
          : m.timing === 'timely'
            ? 'I have his access token. He has my wrist.'
            : 'I could not take the token. He still has it.',
      ),
    );
  first.push(
    p(
      m.wrist === 'held'
        ? 'Benton’s grip is firm. He looks into your face without giving any sign he sees Adrian there. Across the table, Marcus lifts two fingers toward security.'
        : 'Marcus follows your attention back to the table. His gaze settles on you. He raises two fingers; one of the men in black begins to cross the gathering.',
    ),
    q('Sloane · earpiece', 'Leave the gallery. East elevator.'),
  );
  return first;
}
function escapeScene(s: GameState): Block[] {
  const outfit = s.clinic.outfit;
  const xs: Block[] = [
    p(
      'You are clear of the gallery, with the gathering between you and its entrance. The east elevator remains across the public floor. Nobody has opened it for you.',
    ),
  ];
  if (outfit === 'executive')
    xs.push(
      q('You', 'My car is downstairs. Please call the east lift.'),
      p(
        'You address the attendant rather than the approaching guard. He looks at the invitation you hold out, then presses the call button. You keep walking at the same measured pace.',
      ),
    );
  if (outfit === 'socialite')
    xs.push(
      p(
        'You turn toward a group leaving the central table and ask whether they are going down. One woman laughs that she has been trying to leave for twenty minutes. You join them, letting the conversation give your direction an ordinary explanation.',
      ),
      q('You', 'Then let us get as far as the lift before someone stops us again.'),
      p(
        'The woman takes the joke with her to the attendant. He calls the east elevator for the group.',
      ),
    );
  if (outfit === 'shadow')
    xs.push(
      p(
        'You wait for a server to pass, then move along the quiet edge of the public gallery. You stay outside the staff door. At the elevator, two guests are already waiting; you join them without inserting yourself into their conversation.',
      ),
      p(
        'The attendant glances at your invitation and lets the doors remain open while you step inside.',
      ),
    );
  xs.push(
    p(
      s.mission.scrutiny >= 3
        ? 'The guard reaches the bank in time to ask your name. You show the valid invitation. “Ms Vale. I am leaving.” The attendant confirms it. The guard reports the name into his sleeve while the guests hold the doorway; he does not have an instruction to detain you.'
        : 'The guard is still negotiating the gathering when the lift arrives. You do not turn your walk into a run.',
    ),
    p(
      'Across the room, Marcus raises his glass. You cannot tell whether it is an acknowledgment or a promise. The elevator doors begin to close.',
    ),
  );
  return xs;
}
export function debriefEvidence(s: GameState): string {
  const m = s.mission;
  const opening =
    m.source === 'benton'
      ? 'You named Benton and reached the gallery in time. '
      : m.source === 'insufficient'
        ? 'You withheld a name. By the time I directed you to Benton, we had lost the clean window. '
        : 'You named ' +
          sourceNames[m.source!] +
          '. Correcting that cost us the beginning of the exchange. ';
  const outcomes = {
    substantive:
      'I have their agreement on the recording. That gives me something to act on. It does not tell us whether the wafer contains what Marcus said it did. The recording stays with me.',
    fragment:
      'I have fragments, not the agreement. I can keep the recording, but I cannot make the missing words appear in it.',
    transfer:
      'You say the photograph caught both men and the transfer. Keep the image on the phone. It can show what changed hands, not what was inside it. Remember that Axiom monitors that device.',
    contact:
      'Your photograph places them together. It misses the transfer. Keep it, but do not describe it as more than it shows. The phone is still monitored.',
    asset:
      'You have his access token. Keep it intact. It may be useful, but holding his token does not prove what he agreed with Marcus. The wafer went with Benton.',
    none: 'You did not get the token. Benton left with it and the wafer. We have your account of the meeting, but no captured item or recording to support it.',
  };
  return opening + outcomes[m.capture!.quality];
}
