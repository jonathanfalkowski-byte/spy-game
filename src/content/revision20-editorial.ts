import type { Block } from './schema';

/**
 * Revision-20 presentation (2026-09-24 playthrough review, Group 3; Julian at heat 3).
 * Like revision 18, this never touches state, history, NPC knowledge, the ledger or saves:
 * it rewrites what a revision-20 reader sees, matched on the originating node and the text
 * already on screen (after revision-18 copy and the existing reading polish). Older saves never
 * reach it, so they read exactly as before; revision-20 saves stay valid because replay is untouched.
 */
const p = (text: string): Block => ({ kind: 'narrative', text });
const q = (speaker: string, text: string): Block => ({ kind: 'speech', speaker, text });
const t = (text: string): Block => ({ kind: 'thought', text });

type Match = string | ((b: Block) => boolean);
type Swap = [Match, Block[] | ((b: Block) => Block[])];
const starts = (m: Match, b: Block) => (typeof m === 'string' ? b.text.startsWith(m) : m(b));

function swap(blocks: Block[], rules: Swap[]): Block[] {
  return blocks.flatMap((b) => {
    const rule = rules.find(([m]) => starts(m, b));
    if (!rule) return [b];
    const to = rule[1];
    return typeof to === 'function' ? to(b) : to;
  });
}
const keep = (...after: Block[]) => (b: Block) => [b, ...after];

// ---------------------------------------------------------------------------------------------
// Text-level rewrites: applied to every string shown for the node (reading blocks, choice labels
// and hints, scene titles and places). Keys are exact on-screen fragments; values never contain
// their own key, so applying them twice is harmless.
// ---------------------------------------------------------------------------------------------
const TEXT: Record<string, [string, string][]> = {
  'maya.promotion': [['Maya is the closest thing I have to family inside Axiom. ', '']],
  'evening.disclosure': [
    [' I can tell her about the appointment, explain the detention, or try to pass it off as work.', ''],
  ],
  'evening.closure': [
    [
      'She has given me another chance to trust her. I can give her a way to check on me, tell her about Evelynn, or ask her to stop. None of those choices will make her unhear what I have already said.',
      'She has given me another chance to trust her. Nothing I say next will make her unhear what I have already said.',
    ],
  ],
  'clinic.mirror': [
    ['I do not know.', 'I don’t know what I’m looking at.'],
    ['Pass the mirror without looking', 'Look away'],
    ['Private interpretation. This is not spoken to anyone.', 'Only you hear this.'],
  ],
  'mission.car': [
    [' You have either come down from the apartment or waited with the driver away from the arrival queue.', ''],
  ],
  'chapter3.nightComplete': [[' It has not happened yet.', '']],
  'chapter3.executiveWork': [[' No case detail comes from your Axiom work.', '']],
  'chapter3.calendar': [
    ['The river path is a place to walk, not a secure channel.', 'The river path is quieter than the apartment. It is not safer.'],
  ],
  'chapter4.consequences': [[' Check the times before putting the phone away.', ''], ['Check the times before putting the phone away.', '']],
  'chapter4.assessment': [
    [
      'The completed fixed-fee report earns $900; Helix accounts pays it and issues a receipt. Later social or intimate refusal cannot reverse it.',
      'Received $900 from Helix accounts.',
    ],
  ],
  'chapter4.intimacy': [
    ['Explore private time from personal interest', 'Admit you want him'],
    ['Explore private time with an instrumental motive', 'Want what he can open for you'],
    ['Acknowledge mixed personal and instrumental motives', 'Both: him, and what he opens'],
    ['Record your private motive only. It gives Julian no knowledge or permission.', 'Only you will know why.'],
    ['Agree to physical intimacy without sex', 'Tell him: close, but not sex'],
    ['Agree to voluntary sexual intimacy, shown non-graphically', 'Tell him yes, tonight'],
  ],
  'chapter4.handoff': [
    ['The agreed boundary', 'Room 914'],
    ['20:30 · Before private time', '20:30 · Hotel beside Helix'],
    ['Withdraw before the encounter', 'Change your mind'],
    ['Revoke authorization. No intimate outcome occurs.', 'You can still leave. He will let you.'],
    ['Continue within the agreed scope · fade to black', 'Go in'],
    ['The scene fades without graphic detail. The agreed limits remain in effect.', 'What you agreed, and nothing more. The scene cuts away.'],
  ],
  'chapter5.room': [[' Later, you hang your selected outfit for the morning.', '']],
  'chapter5.offer': [
    [
      'At home the next morning, you dress in yesterday’s selected outfit again, with the same heels, your hair pinned up, makeup finished, no added jewellery, then open the brief you requested—or the same public call you saved.',
      'The next morning you open Aster’s brief over coffee.',
    ],
    [' in the same selected outfit', ''],
    ['After reading back the scope, the editor asks', 'Before the camera comes out, the editor asks'],
  ],
  'chapter5.want': [
    ['Ask Julian whether he wants private time tonight', 'Ask Julian if he wants to see you tonight'],
    ['Agree to physical closeness without sex', 'Tell him: close, but not sex'],
    ['Agree to voluntary sexual intimacy · non-graphic', 'Tell him yes, tonight'],
    ['Current authorization only. No payment, benefit or future-work condition.', 'Nothing owed for it, before or after.'],
    ['You know why you are considering it. You still have to say what you are agreeing to.', 'You know why you want it. Now you have to tell him what it is.'],
    [
      'You agree on a guest room at the hotel beside Helix. Julian covers the room, with no work or future condition.',
      'He books a room at the hotel beside Helix and pays for it himself. Nothing about tomorrow is attached.',
    ],
  ],
  'chapter5.handoff': [
    ['Continue within the agreed scope · fade to black', 'Go in'],
    ['Non-graphic. This commits only the currently authorized outcome.', 'What you agreed, and nothing more. The scene cuts away.'],
  ],
  'chapter5.return': [
    [', still in the outfit you chose this morning', ''],
    ['After the purchases and completed payments, ', 'After everything, '],
    [
      'You can leave one thing differently tonight without clearing the room of everything else.',
      'You could change one thing tonight.',
    ],
  ],
};

/** Match against the spelling the reader sees (older scenes store "Evelyn"; the display shows "Evelynn"). */
const canon = (text: string) => text.replace(/\bEvelyn\b/g, 'Evelynn');

export function renderRevision20Text(raw: string, node?: string): string {
  const rules = node ? TEXT[node] : undefined;
  if (!rules) return raw;
  let out = canon(raw);
  for (const [from, to] of rules) if (out.includes(from)) out = out.split(from).join(to);
  return out;
}

// ---------------------------------------------------------------------------------------------
// Block-level rewrites: replace, drop or extend whole blocks.
// ---------------------------------------------------------------------------------------------
const MIRROR_LOOK = p(
  'You look properly this time. Dark hair, damp at the temples. Your eyes, in a face that has been rearranged around them. The robe sits wrong on her shoulders because it was folded for someone else. When you breathe, she breathes.',
);
const MIRROR_REACTIONS = [
  'I lift my hand. Of course she lifts hers.',
  'No. I say it in my head,',
  'I keep waiting for one feeling to settle.',
  'She is beautiful.',
  'They had the photograph ready yesterday.',
  'There is a word somewhere.',
];

const BLOCKS: Record<string, Swap[]> = {
  'security.intervention': [
    [
      'You can surrender the phone, demand an explanation, or send Maya one warning first.',
      [
        p(
          'The phone is warm in your hand. Maya is one message away, and the moment you send it the officers will know her name. The draft already reads: “SECURITY HAS ME. THEY ARE TAKING ME TO EXECUTIVE INTELLIGENCE.”',
        ),
      ],
    ],
  ],
  'clinic.profile': [
    [
      'You can retain the established profile or adjust it',
      [p('The controls wait under your hand. Looking costs nothing yet.')],
    ],
  ],
  'clinic.display': [
    ['Adrian remained silent after the simulation.', [p('You say nothing. Sloane waits. So does the face on the screen.')]],
  ],
  'clinic.mirror': [
    [
      'I could look now. I could sit down first.',
      [
        p('Something moves at the edge of the glass. It takes you a moment to understand that it is you.'),
        t('I could look properly. I could sit down first.'),
      ],
    ],
  ],
  'clinic.name': [[(b) => b.kind === 'thought' && MIRROR_REACTIONS.some((r) => b.text.startsWith(r)), (b) => [MIRROR_LOOK, b]]],
  'clinic.rehearsal': [
    ['You can practice the approach, ask about its limitations, or ask for a short pause', []],
  ],
  'mission.celesteReply': [
    [
      'Someone at the central table calls Marcus’s name. He gives the speaker a small raised finger',
      [p('Someone at the central table calls Marcus’s name again. This time he lets it pull him away, slowly, so that you notice.')],
    ],
    [(b) => b.text.includes('You can leave the conversation here or follow her when she turns toward the table.'), (b) => [
      { ...b, text: b.text.replace(' You can leave the conversation here or follow her when she turns toward the table.', '') },
    ]],
  ],
  'mission.method': [
    [
      'Audio goes directly to Sloane’s recorder',
      [
        p(
          'Audio goes straight to Sloane’s recorder: a clean exchange could prove what was agreed, but the only copy will be hers. A photograph stays on the monitored phone: it can place two people together and show something change hands, not what it is. Or you get close, close enough to take whatever the contact carries, and close enough to be caught.',
        ),
      ],
    ],
  ],
  'chapter3.surveillance': [
    ['The phone wakes with a single controlled vibration.', [p('The phone buzzes once. Sloane already knows the minute your badge opened the lobby door.')]],
    [
      '“Confirm you’re home.',
      [
        q('Victoria Sloane', '“Confirm you’re home.”'),
        t('Down to the minute. I have barely put my keys down.'),
        q(
          'Victoria Sloane',
          '“Benton went on leave an hour ago, pending my review. He does not know what you brought out. Neither does anyone else. Voss does not know her team was on the table. Do not be the one who tells her.”',
        ),
        q('Victoria Sloane', '“Your breach stays in my drawer. It disappears when I say the operation is finished. It is not finished.”'),
        t('She said the breach would disappear. She never said when.'),
      ],
    ],
    [(b) => b.kind === 'thought' && b.text === 'Down to the minute. I have barely put my keys down.', []],
    [
      'Executive Intelligence’s active-compromise review. I will not give you the individual recipients.',
      (b) => [{ ...b, text: 'My office. The names are not yours to have. I know when your door opens, not what you do behind it. Yet.' }],
    ],
  ],
  'chapter3.mayaTalk': [
    [
      'You sound different. I’m listening. What can you tell me?',
      [
        q('Maya', 'Say that again. Anything.'),
        p('You say her name. The silence afterwards is long enough that you check the call has not dropped.'),
        q('Maya', 'That is not a cold. I have known your voice for ten years, Adrian. What did they do to you?'),
        t('A few words, and she heard it. Voss said the voice would settle. She did not say the first person to hear it would be the one I cannot lie to.'),
        q('Maya', 'I’m listening. Tell me what you can.'),
      ],
    ],
  ],
  'chapter3.pressure': [
    [
      'Your office access remains suspended. The restricted badge still covers',
      (b) => [{ ...b, text: 'You are still suspended. The badge gets you home and to Voss. Nowhere else. Do not test that.' }],
    ],
    ['Her topic is the existing access restriction.', []],
    [
      'The existing restriction remains in place while the review is pending.',
      (b) => [{ ...b, text: 'Noted. Sleep. I will know if you don’t.' }],
    ],
  ],
  'chapter3.morningPlan': [
    [
      'The follow-up notice offers an 08:30 appointment with Voss',
      [p('Voss’s clinic has sent a follow-up: 08:30 this morning, if you want it. Nothing is booked beyond a conversation.')],
    ],
    [
      'You dress, pin up your hair, collect your belongings, travel to the clinic and check in.',
      [p('You dress, pin up your hair and take the train to the clinic. The desk writes down that you came, not why.')],
    ],
  ],
  'chapter3.voss': [
    [
      'Voss meets you alone in Consultation 3.',
      [
        p('Voss meets you alone in Consultation 3. No Sloane this time. She asks for the handset, locks it in a numbered locker outside, and only then sits down.'),
        q('Dr Lena Voss', 'I write notes. Axiom can read my notes. Tell me what you want me to write.'),
      ],
    ],
    [(b) => b.kind === 'speech' && b.text === 'Information about later proposals only, not authorization.', (b) => [{ ...b, text: 'Tell me what the later stages are. I am not agreeing to any of them.' }]],
    ['I will record that scope. It authorizes nothing beyond what you just asked.', (b) => [{ ...b, text: 'Then that is what I will write down. Asking is not agreeing.' }]],
  ],
  'chapter3.vossPlan': [
    [
      'Voss leaves the authorization section blank.',
      [p('Voss leaves the authorization box blank. Before you go she offers one more thing: an hour at two o’clock with your release summary, and the list of everyone it was sent to.')],
    ],
    ['The window remains available if you request it before committing elsewhere.', (b) => [{ ...b, text: 'Two o’clock is yours if you want it. Tell me before you promise it to someone else.' }]],
  ],
  'chapter3.rook': [
    ['I can release that portion of your record.', (b) => [{ ...b, text: 'I can give you that page. It says who, and when. It does not say why.' }]],
  ],
  'chapter3.rookCompare': [
    [
      'The authenticated patient-record extract names Adrian Vale',
      [
        p(
          'One page. Your name, the words PREPARE FOR EXISTING IDENTITY, and an approval stamp from Executive Intelligence. Voss puts her finger on the date. Nine weeks before the file ever reached your desk.',
        ),
      ],
    ],
    [
      'The approval predates the emergency that framed Sloane’s offer.',
      [
        p('You read the date three times. It does not change.'),
        t('Two months. While I was writing Benton’s risk notes and waiting on a promotion, Sloane already had my face on a schedule. The breach was not why she chose me. It was how she made me say yes.'),
        t('She will call it contingency planning. She will say it calmly. I would like to be watching her face when she does.'),
      ],
    ],
  ],
  'chapter3.rookReply': [
    ['You retain the thread. An optional 18:00–18:30 contact window arrives', [p('You keep the thread. The sender offers six o’clock. You do not answer yet.')]],
  ],
  'chapter3.informationEnd': [
    [
      'You close the thread. A clinical question and a date now have separate sources.',
      [p('You close the thread. A doctor and a stranger have each told you one true thing today. Neither has told you why.')],
    ],
    [
      'The forwarding note identifies the observed exchange as the reason to request a discussion.',
      [
        p('The forwarding note is from Marcus Chen’s office. It gives one reason for the introduction: he watched you at the Glass House and would like to know you better.'),
        t('Last night I left Marcus Chen’s party with his eyes on my back. This morning his company wants to pay for my judgment. Either Helix does not talk to itself, or this is how Marcus asks what I saw.'),
      ],
    ],
  ],
  'chapter3.invitation': [
    [
      'Helix has asked Axiom’s switchboard for Evelynn Vale.',
      [p('Helix has asked Axiom’s switchboard for Evelynn Vale by name. Your private number was not in the request. Sloane has said nothing about it, which is its own kind of message.')],
    ],
    [
      'Julian Mercer, our Group COO, requests a 14:00–14:45 exploratory advisory discussion.',
      (b) => [{ ...b, text: 'Julian Mercer, our Group COO, would like forty-five minutes of your judgment at two o’clock today. Six hundred dollars for the session, whatever you decide afterwards. May we send the brief?' }],
    ],
  ],
  'chapter3.verifyOffer': [
    ['The office will hold the 14:00 appointment until noon.', [p('The office will hold two o’clock until noon. There is time to ask two real questions before then.')]],
    [
      'Terms: $600 for a completed 45-minute advisory discussion',
      [
        p('The terms fit on one page: six hundred dollars for forty-five minutes on an invented acquisition case, paid by voucher at the end. Nothing from Axiom. Nothing owed afterwards.'),
        t('Two o’clock. Voss offered me the same hour. One of them is going to be disappointed.'),
      ],
    ],
    ['Helix confirms the appointment. You retain the terms and arrange your own journey.', [p('Helix confirms. You find your own way there.')]],
  ],
  'chapter3.executive': [
    [
      'Axiom isn’t the only place that can pay for your judgment.',
      (b) => [
        { ...b, text: 'Marcus tells me you left the Glass House early last night. He would like to know why.' },
        p('He lets that sit for exactly as long as it takes you not to answer.'),
        { ...b, text: 'I don’t care why. I’m paying for something else. Axiom isn’t the only place that can use your judgment.' },
      ],
    ],
    [
      'He puts the terms beside the case brief rather than beneath it.',
      [p('He puts the terms beside the case brief rather than under it. The only signature he wants is for the voucher. His attention stays on the page you are reading, and then, briefly, on you.')],
    ],
  ],
  'chapter3.executiveWork': [
    [
      'You spend the remainder of the session working through that limit.',
      [p('You spend the rest of the hour on that one missing date. At 14:45 his assistant brings the fee voucher. You sign for it and nothing else.')],
    ],
  ],
  'chapter3.reception': [
    [
      'A host waits beyond the meeting room.',
      [p('Outside the meeting room, Mercer offers to introduce you to two of his commercial directors. He even tells you the sentence he would use. A photographer waits by the window to hear whether she is needed.')],
    ],
    ['Your fee is settled. If you would like an introduction, let us agree on the wording first.', (b) => [{ ...b, text: 'The fee is yours either way. If you want the introduction, you choose the words.' }]],
    [(b) => b.kind === 'speech' && b.text === 'Evelynn Vale, here following an exploratory advisory discussion.', (b) => [{ ...b, text: 'This is Evelynn Vale. She has just taken apart a case I thought was simple.' }]],
    ['If useful, my office can hold 18:00–18:30 for a follow-up.', (b) => [{ ...b, text: 'My office can hold six o’clock if you want to keep talking. Nothing is booked until you say.' }]],
  ],
  'chapter3.photograph': [
    ['The photographer asks for one posed image and one publication', [p('The photographer wants one picture for Helix’s event page, and shows you the caption she would run under it:')]],
    ['Authorization here permits that image and caption', []],
  ],
  'chapter3.opportunityEnd': [
    ['The assistant identifies the material sent to Marcus:', [p('The assistant tells you what went to Marcus: that you accepted, and that you were paid. Nothing else.')]],
  ],
  'chapter3.marcusRecord': [
    [
      'The executive assistant routes your actual acceptance',
      [
        p('Within the hour Marcus has written a line about you for Mercer’s file: “Evelynn demonstrated willingness to explore an advisory relationship.” The assistant offers you a signed copy, circulation list included.'),
        t('Willingness. Marcus chose that word the way he chose to watch me leave last night.'),
      ],
    ],
  ],
  'chapter3.marcusLeverage': [
    ['The office supplies the note with its message identifier', [p('The copy comes with its delivery receipt. Two recipients: Mercer and his assistant. Your own narrower acceptance sits beside his wording.')]],
  ],
  'chapter3.truths': [
    ['There is time to compose four deliberate messages', [p('There is time for four careful messages before evening, or for none. Whatever you send, someone at Axiom can read.')]],
    ['I request an 18:00 status call.', (b) => [{ ...b, text: 'Six o’clock. Call me. I would rather hear what you did today from you.' }]],
    ['I can offer 18:00–18:30. Reply to confirm or ask for another time.', (b) => [{ ...b, text: 'Mr Mercer is free at six, if you would like to continue the conversation.' }]],
    ['The six o’clock window is available. You have not confirmed.', (b) => [{ ...b, text: 'Six o’clock. You have not answered.' }]],
  ],
  'chapter3.calendar': [
    ['The invitations below each ask for 18:00–18:30.', [p('Everyone wants the same half hour. Only one of them can have it.')]],
    [
      'The phone remains monitored. The apartment does not become private because you plan to leave it.',
      [p('Whoever you choose, it is Sloane’s phone you will be holding. Say yes to two of them and one will find out the hard way.')],
    ],
  ],
  'chapter4.resource': [
    [
      'A name. A signature. You look for the employer’s countersignature',
      [p('A name, a signature, no employer’s countersignature. For the first time since the clinic, a card with your new name on it belongs only to you.')],
    ],
    ['The pass is yours. The desk closes at five.', (b) => [{ ...b, text: 'The pass is yours. Desk closes at five. Public copies you keep; anything restricted stays here.' }]],
  ],
  'chapter4.power': [
    [
      'The release box is empty. You could explain why you need the copy',
      [p('The release box is empty. The coordinator waits to hear what you have to say about that.')],
    ],
  ],
  'chapter4.handoff': [
    [
      'At the door, Julian waits for you.',
      [
        p('Room 914. Julian opens the door in his shirtsleeves, tie gone, the jacket over a chair behind him. He looks at you as if the working day had been an elaborate way of arriving here.'),
        t('I can still turn around. He would let me. Knowing that makes the doorway easier to look at.'),
      ],
    ],
    [
      'For a while, the working day recedes.',
      [
        p('The curtains are half drawn over the river. Julian takes off his watch and sets it face down on the desk, as if the hour has stopped being his business.'),
        q('Julian Mercer', 'Still yes?'),
        q('You', 'Still yes.'),
        p('He kisses you slowly at first, like a man reading terms he means to keep. Your jacket goes over the chair with his. His hands find the zip at your back and wait there until you lean into them.'),
        t('Four days ago this body was a file I was learning to carry. Tonight it is simply mine, and I want this.'),
        p('The lamp goes off. The city stays on.'),
      ],
    ],
    [
      'You share the closeness you agreed to, without sex.',
      [
        p('The curtains are half drawn over the river. You keep your shoes on for the first ten minutes, which Julian notices and does not mention.'),
        p('Later you are lying on top of the covers with your head on his shoulder, his hand moving slowly along your spine and going no further than you said. It is harder than sex would have been, and better, and you do not tell him either.'),
        t('I set the line. He is keeping it as if it were his idea. I did not know how much I needed that.'),
      ],
    ],
    [
      'Later, you gather your things, say goodnight and head home.',
      [
        p('Near eleven you sit up. Julian finds your shoes before you do. He does not ask you to stay, and he does not pretend he would not like you to.'),
        q('Julian Mercer', 'Whatever this was, it was not part of the work.'),
        p('You take a taxi home with the river still on your skin. There is nothing from Sloane on the phone. You check twice.'),
      ],
    ],
  ],
  'chapter5.spend': [
    [
      'Available settled money:',
      keep(t('Adrian Vale’s accounts froze the afternoon Security walked him off the floor. Eleven years of salary, behind a suspension order. Whatever I spend now, I spend as her, and I have to have earned it.')),
    ],
  ],
  'chapter5.presentation': [
    [
      (b) => b.text.includes('You are wearing the fitted charcoal dress and black heels again. The delivered wardrobe holds your tailored suit and evening gown; any new purchase stays on the table. Your hair is pinned up, your makeup finished, and you leave jewellery off today.'),
      (b) => [{ ...b, text: b.text.replace('You are wearing the fitted charcoal dress and black heels again. The delivered wardrobe holds your tailored suit and evening gown; any new purchase stays on the table. Your hair is pinned up, your makeup finished, and you leave jewellery off today.', 'The wardrobe holds the tailored suit and the evening gown.') }],
    ],
  ],
  'chapter5.room': [
    ['You have time for two short conversations or stops before leaving; each brings you back here.', []],
    [
      (b) => b.text.includes(' You have time for two short conversations or stops before leaving; each brings you back here.'),
      (b) => [{ ...b, text: b.text.replace(' You have time for two short conversations or stops before leaving; each brings you back here.', ' There is time for two conversations before you go.') }],
    ],
  ],
  'chapter5.offer': [
    [
      'The standard license covers one issue for thirty days.',
      [p('One issue, thirty days, nothing else. The editor has left the name and the picture for you to decide.')],
    ],
    ['That direction works. I have put the fee and usage beside it in the proposal.', (b) => [{ ...b, text: 'Good. I have pencilled the fee beside it. What else do you want before you say yes?' }]],
    ['A private research sitting, one hundred. No public issue or future rights.', (b) => [{ ...b, text: 'A private sitting, then. One hundred, and nothing ever printed.' }]],
    ['You approve the exact caption and image. If you withhold publication, no public-use fee is due.', (b) => [{ ...b, text: 'You see the proof before anyone else does. If you pull it, we do not print and we do not pay. Fair?' }]],
  ],
  'chapter5.terms': [
    [
      'You turn to the cancellation line before deciding.',
      [p('You read the cancellation line first, from habit. Walking away costs you the extra weeks and nothing you already have.')],
    ],
    ['Harbour’s visitor bulletin includes the feedback-for-workspace offer.', []],
    ['The extension would start after the current seven-day booking.', []],
    ['Those are the terms I will book. I have left the other hours blank.', (b) => [{ ...b, text: 'Booked. The other hours are yours.' }]],
  ],
  'chapter5.handoff': [
    [
      'Julian meets you at the door.',
      keep(t('No report between us tonight. No case. Just the doorway, and whether I walk through it.')),
    ],
    [
      'The messages and arrangements fall quiet.',
      [
        p('Julian closes the door and stands with his back to it, and for a moment neither of you moves.'),
        q('Julian Mercer', 'Tell me again. I want to hear it in the room.'),
        q('You', 'I want you. Tonight.'),
        p('He crosses the space in two steps. The dress you chose this morning takes longer to undo than either of you expected; he laughs against your neck and you laugh with him, and then neither of you is laughing.'),
        t('I was given this face for a party I never asked to attend. This, I am choosing for no one but myself.'),
        p('The lamp stays on this time.'),
      ],
    ],
    [
      'The closeness stays within the limits you chose.',
      [
        p('Julian orders dinner to the room and you eat it on the floor by the window, shoes off, knees touching. When he kisses you it is unhurried, and when your hand stops on his chest, he stops too.'),
        p('You spend the rest of the evening close enough to feel his breathing change, and no closer. It is its own kind of heat.'),
      ],
    ],
    [
      'Later, dressed in the clothes you arrived in, you say goodnight and take your bag and phone.',
      [
        p('Near midnight you dress in the clothes you arrived in. He watches from the bed and asks nothing about Axiom. You notice that, and you file it.'),
        p('At the door he kisses you once more, briefly, and lets you go. You take your bag and phone.'),
      ],
    ],
  ],
};

/** Julian's evening: the no-sex scene gets its own aftermath. Decided before the swaps, which rewrite
 * the scope line the decision reads. */
function handoffAftermath(blocks: Block[], node: string): Block[] {
  if (node !== 'chapter5.handoff' && node !== 'chapter4.handoff') return blocks;
  const noSex = blocks.some((b) => b.text.startsWith('You share the closeness') || b.text.startsWith('The closeness stays within'));
  if (!noSex) return blocks;
  return blocks.map((b) =>
    b.text.startsWith('Later, dressed in the clothes you arrived in')
      ? p('Near eleven you dress in the clothes you arrived in, say goodnight and take your bag and phone. He walks you to the lift and does not ask when.')
      : b.text.startsWith('Later, you gather your things, say goodnight and head home.')
        ? p('Near eleven you sit up. He finds your shoes, kisses you once at the door and lets you go. You take a taxi home and do not check the phone until you are inside.')
        : b,
  );
}

/** The repeated rehearsal replays the same setup paragraph and line; show the repetition only. */
function rehearsalRepeat(blocks: Block[], node: string): Block[] {
  if (node !== 'clinic.rehearsal' || !blocks[0]?.text.startsWith('You repeat the exercise')) return blocks;
  return [
    blocks[0],
    ...blocks.slice(1).filter((b) => !b.text.startsWith('Sloane plays a guest') && !b.text.startsWith('Authority invites a test.')),
    q('Sloane', 'Better. Again tonight, with someone who is not pretending.'),
  ];
}

/** Sloane on her officer taking a Helix room: she does not budget, she marks the owner. */
function sloaneOnHelixRoom(blocks: Block[], node: string): Block[] {
  if (node !== 'chapter5.people') return blocks;
  const helixRoom = blocks.some((b) => b.text.includes('a seven-day Helix workroom'));
  return blocks.flatMap((b) =>
    b.kind === 'speech' && b.text.startsWith('Read the end date as carefully as the opening hours.')
      ? helixRoom
        ? [
            { ...b, text: 'A Helix room. Booked by Julian Mercer’s office, logged by Julian Mercer’s front desk.' },
            { ...b, text: 'Enjoy the view. Remember whose it is.' },
            t('She did not tell me to give it back. That is worse.'),
          ]
        : [{ ...b, text: 'Read the end date as carefully as the opening hours. Nothing stays free for long.' }]
      : [b],
  );
}

/** Chapters 4–5 notices that restate a choice, a reply or a term sheet. Money moving, and the choice
 * itself, stay visible; everything else is said in the scene. */
function hiddenNotice20(b: Block, node: string): boolean {
  if (b.kind !== 'notice') return false;
  if (!node.startsWith('chapter4.') && !node.startsWith('chapter5.')) return false;
  return !/^(Your choice: |Received \$|Spent \$)/.test(b.text);
}

export function revision20Blocks(blocks: Block[], node?: string): Block[] {
  if (!node) return blocks;
  const texted = blocks.map((b) => ({ ...b, text: renderRevision20Text(canon(b.text), node) }));
  const rules = BLOCKS[node];
  const prepared = sloaneOnHelixRoom(rehearsalRepeat(handoffAftermath(texted, node), node), node);
  return (rules ? swap(prepared, rules) : prepared).filter((b) => !hiddenNotice20(b, node));
}
