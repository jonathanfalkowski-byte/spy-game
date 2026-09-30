/** Chapter 13 (Institutional route, lane id `institutional`) · Through Channels:
 * tasking → dread → channel → reply → corridor → smallhours → weekend → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_13_THROUGH_CHANNELS_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_13_SCRIPT.md. The game's reserved sexual-coercion beat on
 * this road, following CONTENT_DIRECTION §2 exactly as the other roads do: the order, the choice, getting ready, the walk
 * to the door and the door closing are on screen; everything behind the door is off screen, never described and never
 * framed as arousing; the aftermath is on screen without graphic detail; refusal never costs her body; every threat is
 * non-sexual. A content notice opens the chapter, and the comply lead-in honours the reader's "Fade coercion scenes"
 * (fadeInstitutional13, called from fadeCoercion13). The placement arrives as a forged Axiom tasking in Sloane's capitals,
 * routed by Benton, with BACKUP: — left blank (Sloane never knew about the placements: Ch14 canon). The week (Marsh as a
 * person; Maya / Daniel / alone). The channel (to Sloane: "I never wrote this."; over her head to Benton, who confirms it;
 * nobody). The reply (comply / refuse, in writing under the scope term or at a hearing, with Maya's file as Meridian's cost
 * (a withdrawn promotion and a warning, never her safety) / counterplay: turn Marsh, a staged scene both in on it, heat 2; or swap the camera's card with Iris). The recovery step
 * on the comply path (Daniel if he knows, being held, nothing more; Maya; Sloane on the floor of the hall, not touching
 * her, only if she took the tasking to her; the wall; alone). The card. Ch14 follows directly. Writes the shared Act III
 * keys; `inst.*`, `c13.i-*`; ids carry `i13-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C13Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get13 = (s: GameState, k: string) => s.choices['c13.' + k];
const set13 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c13.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C13Choice['apply']): C13Choice => ({ id: 'chapter13.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get13(s, 'rec.' + k) !== undefined) return;
  set13(s, 'rec.' + k, String(s.history.length));
  set13(s, 'event.' + k, String(s.revision));
  set13(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c13.' + k);
  s.knowledge.push('c13.' + k);
}

export const INSTITUTIONAL_PHASES13 = ['tasking', 'dread', 'channel', 'reply', 'corridor', 'smallhours', 'weekend'] as const;
export const isInstitutional13 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase13 = (s: GameState) => isInstitutional13(s) && ((INSTITUTIONAL_PHASES13 as readonly string[]).includes(s.phase) || s.phase === 'complete');

// ── Player comfort (CONTENT_DIRECTION §6) ──

export const I_CONTENT_NOTICE13 = 'Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath. You can shorten the coercion scenes in Settings: “Fade coercion scenes”.';
/** The first line of the Institutional comply lead-in: fadeCoercion13 recognises the entry by it. */
export const I_COMPLY_OPENING13 = 'You get ready the way Adrian was trained to get ready for a tasking he did not agree with: by the checklist, and without thinking about anything that is not on it.';
export const I_CORRIDOR13 = 'The corridor on the eleventh floor of the Claremont is long and quiet';
export const I_FADED_LEAD13 = 'Faded, at your request: she gets ready, is driven to the Claremont, sits with Owen Marsh at the bar until a quarter past eleven, and takes him up to the eleventh floor.';
/** Presentation only: with the reader's fade on, the Institutional comply lead-in becomes one line; the corridor, the door
 * and the choice stay. The save and the ledger are never touched. */
export function fadeInstitutional13(blocks: Block[]): Block[] {
  if (blocks[0]?.text !== I_COMPLY_OPENING13) return blocks;
  const door = blocks.findIndex((b) => b.text.startsWith(I_CORRIDOR13));
  return [{ kind: 'notice', text: I_FADED_LEAD13 }, ...(door >= 0 ? blocks.slice(door) : [])];
}

const answer = (s: GameState) => get13(s, 'i-answer') as 'complied' | 'refused' | 'turn' | 'swap' | undefined;
const channel = (s: GameState) => key(s, 'inst.channel13') as 'sloane' | 'benton' | 'nobody' | undefined;
const backup = (s: GameState) => key(s, 'inst.backup13') === 'sloane';
const told = (s: GameState) => !!key(s, 'inst.daniel-told');
const get11 = (s: GameState, k: string) => s.choices['c11.' + k];
const irisFree = (s: GameState) => get11(s, 'i-cloak') === 'number' || key(s, 'inst.iris11') === 'warned';
const proof = (s: GameState): string | undefined =>
  key(s, 'inst.file') === 'note'
    ? 'the delivery note from Records: LEGEND E.V. (II), PRIOR INSTANCE RETIRED'
    : key(s, 'inst.file') === 'copy'
      ? 'forty-one pages of the Project Eve procurement file, photographed in Records'
      : key(s, 'c12.rec.i-ashby') !== undefined
        ? 'Colin Ashby’s account of how the last one was burned, written up in room 811'
        : key(s, 'c12.rec.i-schedule') !== undefined
          ? 'the maintenance schedule for Number 9, Emerald Hill'
          : undefined;

export function placeInstitutional13(s: GameState): string | undefined {
  if (s.phase === 'corridor' && answer(s) === 'swap') return '20:10 · The Claremont, the service corridor';
  if (s.phase === 'corridor' && answer(s) === 'refused') return '21:00 · Home';
}

// ── The entry ──

export function beginInstitutional13(): C13Choice {
  return offer('begin-institutional', 'The first Thursday of next month', 'A grey envelope. ' + I_CONTENT_NOTICE13.replace('. You can shorten', '. Shorten').replace(' in Settings: “Fade coercion scenes”', ' in Settings'), 'tasking', () => [
    p('The winter comes in grey over the river. Axiom has its Christmas tree up in the lobby, and Terry has a tinsel crown. On your wardrobe door the card that says THE VESPER, and under it, in the same neat type as everything else in that book, a date. It is next week.'),
  ]);
}

// ── The tasking ──

function taskingBlocks(): Block[] {
  return [
    { kind: 'notice', text: I_CONTENT_NOTICE13 },
    p('Monday, nine o’clock. On your desk, where they always are, a grey envelope, AX-7A on the front in small upright capitals. Inside, a single sheet, a tasking, in the same capitals as every other:'),
    q('The tasking', 'TASKING · THE CLAREMONT · THURSDAY 21:00 · SUBJECT: O. MARSH, MARKETS AUTHORITY · ESTABLISH A RELATIONSHIP · SUITE 1109 · BACKUP: —'),
    p('You read it three times. The last line is blank, a dash where Sloane has written the same word on every tasking since Level 71. Mine.'),
    p('At ten past nine the black phone.'),
    q('C.', 'Victoria has sent you something, darling. Do read it carefully. He drinks one whisky at the Claremont on Thursdays, alone. Suite 1109 is ours, and there is a camera behind the mirror. After Thursday he is ours, and so is his inquiry.'),
    q('C.', 'And do think of Maya. There is a file with her name on it, about a journalist and some client data. It is only paper. Paper is what you make it.'),
    t('It came through the channel. In her hand. With a suite number on it.'),
  ];
}

function taskingChoices(): C13Choice[] {
  return [offer('i13-tasking-on', 'The week', 'Six days.', 'dread')];
}

// ── The week ──

function dreadBlocks(): Block[] {
  return [
    p('The week as dread. You find out who he is, because you cannot not: Owen Marsh, forty-four, deputy director of enforcement at the Markets Authority, divorced, a daughter at university. He cycles to work in all weathers. He is funny with the woman at the till in the café by his office. His inquiry is into a fund whose clients’ money moves through Halvorsen’s ships. He is the only one in London doing his job.'),
  ];
}

function dreadChoices(s: GameState): C13Choice[] {
  const d = (id: 'maya' | 'daniel' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('i13-dread-' + id, label, hint, 'channel', (x) => {
      set13(x, 'i-dread', id);
      return body;
    });
  return [
    d('maya', 'See Maya', 'Dinner. You can’t say one true sentence.', [p('Dinner with Maya at the place by the canal. She talks about an inquiry she’s been asked to scope, and a promotion, and her cat. You cannot say one true sentence all evening, and you watch her notice, and not ask, which is worse.')]),
    ...(told(s)
      ? [d('daniel', 'Let Daniel see something is wrong', 'He knows who you are. Not this.', [p('Daniel finds you on the fire stairs on Wednesday, sitting on the concrete with your coat on.'), q('Daniel', 'Something’s wrong. You don’t have to tell me what. I just want you to know that I can tell.'), p('He sits down two steps below you and doesn’t say anything else, and stays there until you get up.')])]
      : []),
    d('alone', 'Tell nobody', 'Work it out on the wall.', [p('You tell nobody. You pin the tasking on the wardrobe door beside the Vesper card, and look at the blank line for a long time.')]),
  ];
}

// ── The channel ──

function channelBlocks(): Block[] {
  return [p('Tuesday. The tasking in your bag. The whole of Axiom is built for exactly this moment: an operative with a doubt about an order, and a channel to take it to.')];
}

function channelChoices(): C13Choice[] {
  const c = (id: 'sloane' | 'benton' | 'nobody', label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('i13-channel-' + id, label, hint, 'reply', (x) => {
      setKey(x, 'inst.channel13', id);
      after?.(x);
      return body;
    });
  return [
    c('sloane', 'Take it up to seventy-one', 'Put it on her desk. Watch her face.', [
      p('You take it up to seventy-one and put it on her desk, squared to the edge, the way she puts things down.'),
      p('She reads her own name on it. Then she reads it again, and goes very still, the stillness of a woman who has just found her own handwriting on a letter she never wrote.'),
      q('Sloane', 'I never wrote this. Look at the sevens. And I have never, in thirty years, left a backup line blank.'),
      q('You', 'Then who did?'),
      q('Sloane', 'Somebody with access to the post room and a very good eye. You know who. So do I.'),
      p('She cannot stop it officially. Stopping it officially means telling Meridian she knows, and Meridian owns the building she is sitting in. She looks at the tasking for a long time.'),
      q('Sloane', 'Whatever you decide, you will not be alone in that building on Thursday. That’s not an order. It’s the backup line.'),
      p('She writes one word on the blank line, in her own capitals, with the sevens uncrossed: MINE.'),
    ], (x) => {
      setKey(x, 'inst.backup13', 'sloane');
      note(x, 'i-forgery', 'The Claremont tasking in Victoria Sloane’s hand is a forgery: she never wrote it, and never leaves a backup line blank.', 'Victoria Sloane, Level 71');
    }),
    c('benton', 'Go over her head, to Benton', 'The director. The proper channel.', [
      p('You take it to the smoked-glass office instead, and put it in front of Elias Benton, and ask whether the directorate stands behind it.'),
      p('He reads it without surprise. He does not even look at the sevens.'),
      q('Benton', 'Victoria signs what the client needs, Ms Vale. So, in the end, do we all. Thursday at nine. I’m sure you’ll be very good at it.'),
      t('He didn’t read it. He didn’t have to. He sent it.'),
    ]),
    c('nobody', 'Take it to nobody', 'Keep it in your bag.', [p('You keep it in your bag. There is nobody in the building you are sure of, and on Tuesday that feels like the only true thing you know.')]),
  ];
}

// ── The reply ──

function replyBlocks(): Block[] {
  return [p('Wednesday, midnight. The black phone with its one contact, lit on the kitchen table. The tasking beside it.')];
}

function replyChoices(s: GameState): C13Choice[] {
  const a = (id: 'comply' | 'refuse' | 'turn' | 'swap', value: 'complied' | 'refused' | 'turn' | 'swap', label: string, hint: string, body: Block[]) =>
    offer('i13-reply-' + id, label, hint, 'corridor', (x) => {
      set13(x, 'i-answer', value);
      set13(x, 'answer', value === 'complied' ? 'complied' : value === 'refused' ? 'refused' : 'countered');
      setKey(x, 'act3.honeypot', value === 'complied' ? 'done' : value === 'refused' ? 'refused' : value === 'turn' ? 'staged' : 'pulled');
      if (value === 'refused') setKey(x, 'inst.maya13', 'warned');
      return body;
    });
  const pr = proof(s);
  return [
    a('comply', 'complied', '“Thursday.”', 'The order holds. Maya’s file stays in a drawer.', [q('You', 'Thursday.')]),
    a('refuse', 'refused', '“No. Not this. Not ever.”', key(s, 'inst.scope.refusal') ? 'Declined under scope: Axiom can’t touch you. Meridian can touch Maya’s career. Your body stays yours.' : 'A hearing at Axiom, and Maya’s file from Meridian. Your body stays yours.', [
      q('You', 'No. Not this. Not ever.'),
      q('C.', 'Pity, darling. It’s only paper. Remember that I said so.'),
      ...(key(s, 'inst.scope.refusal')
        ? [p('In the morning you write DECLINED UNDER SCOPE across the tasking, in ink, and send it back up to seventy-one through the internal post. It is the first time the clause you wrote in the spring has been used, and it holds: Axiom cannot touch you for it. It was never Axiom you were afraid of.')]
        : [p('In the morning you send the tasking back unworked. On Monday there will be a hearing, and an hour on the carpet, and a note on your file. That is Axiom’s price, and it is only paper too.')]),
    ]),
    ...(pr ? [a('turn', 'turn', '“Thursday.” And mean something else.', 'Tell Marsh the truth in the lift, with ' + pr + '.', [q('You', 'Thursday.'), t('Said exactly the way she wants it said. That is the point.')])] : []),
    ...(irisFree(s)
      ? [a('swap', 'swap', '“Thursday.” And ring Iris.', 'She knows where the camera’s card is kept.', [q('You', 'Thursday.'), p(get11(s, 'i-cloak') === 'number' ? 'Then your own phone rings, a number you don’t know, at ten past midnight, and it is Iris Moreau, from somewhere with traffic. “You gave me your number. I heard where you’re going on Thursday. I know that room.”' : 'Then you ring the Vesper’s cloakroom and leave a message for Ms Moreau, and at one in the morning she rings back from somewhere with traffic. “I know that room.”')])]
      : []),
  ];
}

// ── The corridor ──

function corridorBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p(I_COMPLY_OPENING13),
      p('A dress that is nobody’s: black, plain, bought for this and for nothing else. The face finished once and not again. No perfume. The things that are yours, the good earrings, the photograph of a woman on a harbour wall, the lanyard with a name that isn’t yours either, go into a drawer, and you shut the drawer.'),
      p('At half past eight a car you did not order is at the kerb. The driver holds the door and does not look at you.'),
      ...(backup(s) ? [p('In the lobby of the Claremont, at a small table by the pillar, a tall woman in graphite with a newspaper she is not reading. She does not look up as you pass. She is exactly where she said she would be. It does not make it better. It makes it not alone.')] : []),
      p('The Claremont bar: marble, low lamps, leather and oranges. Owen Marsh at the end of it, a whisky, a paperback he is not reading, his cycling clips in his jacket pocket.'),
      p('It is appallingly easy. He is funny, at his own expense. He talks about his daughter, and about his work, only that it is the first thing in years he thinks might matter. He asks about you, and listens to the answers, which are lies, as if they were the most interesting things he has heard all year.'),
      t('He is kind, and he is lonely, and he has no idea. And it came through the channel.'),
      p('At a quarter past eleven you say you have a room upstairs, because that is the line. The lift, mirrored on every side. The numbers.'),
      p(I_CORRIDOR13 + ', carpeted in a red that swallows your footsteps. 1109 is at the end. He takes the key card from your fingers, because your fingers are not quite steady, and he notices, and says gently, “Are you all right?”'),
      p('You say yes. It is the last lie of the evening that you will have to say out loud.'),
    ];
  if (a === 'refused')
    return [
      p('At nine o’clock on Thursday you are at home in your oldest jumper, on the floor, with your back against the wall under the green light in the hall, not going to the Claremont.'),
      p('Across the river a man is having one whisky at the end of a bar, and nobody is going to sit down two stools along. You think about him for a while. It helps, a little.'),
      q('C.', 'He orders his second whisky at eleven. It isn’t too late, darling.'),
    ];
  if (a === 'turn')
    return [
      p('Thursday. You get ready the way you would for any tasking you believe in: carefully, and for yourself. Your own dress. The heels you can run in. In the mirror a woman who looks exactly like a honeypot, and is not one.'),
      ...(backup(s) ? [p('In the lobby, by the pillar, Sloane with her newspaper. She does not look up.')] : []),
      p('The bar, Marsh, the whisky, the paperback. You are charming for exactly as long as the room is watching, and then, in the lift, with the doors shut and the numbers climbing, you hold your phone up so that he can read it: ' + (proof(s) ?? 'the proof') + '.'),
      q('You', 'Mr Marsh. There’s a camera behind the mirror in the room we’re going to. Somebody wants to own you and your inquiry. I was tasked to be how. I’d rather be the other thing.'),
      p('He reads it twice. Then he looks at you, and at the numbers, and something in his tired face wakes up.'),
      q('Owen Marsh', 'Then we’d better give them something to watch.'),
      p('Suite 1109. The mirror over the desk. You stage it for the camera, both of you in on it, both of you clothed: the light low, your hand in his hair, his mouth at your ear, and under the music, off the microphone, for real, “Is this all right?” “Yes. Keep going. Slower.” It is charged, and it is entirely fake, and it is the only thing in this whole business that you have chosen.'),
      p('At one you sit on the end of the bed a foot apart, with the lights off and the camera still running, and whisper, and plan, like two people on the same side of something for the first time in years.'),
    ];
  return [
    p('Ten past eight, the Claremont’s service corridor, behind the kitchens. Iris Moreau in a waiter’s black, with a room-service trolley and a pass she should not have.'),
    q('Iris Moreau', 'The monitor cupboard is behind the wardrobe in 1108. The card is in the recorder. Two minutes. I’ve done this before, for somebody else. It didn’t help her. It’ll help you.'),
    p('Ninety seconds in a cupboard that smells of warm electronics, and a memory card the size of a fingernail, which Iris takes from you and puts into a glove, and the glove into her pocket.'),
    p('Then the bar, and Marsh, and one whisky, and a conversation about his daughter, and at eleven a goodbye at the lift, a handshake, nothing else. He goes home on his bicycle, owned by nobody, and never knows how close it came.'),
  ];
}

function corridorChoices(s: GameState): C13Choice[] {
  const a = answer(s);
  if (a === 'complied') {
    const door = (id: 'look' | 'away', label: string, hint: string, body: Block[]) =>
      offer('i13-door-' + id, label, hint, 'smallhours', (x) => {
        set13(x, 'i-door', id);
        return [...body, p('The door closes behind you.')];
      });
    return [
      door('look', 'Look at the mirror as you go in', 'So that whoever is behind it knows you know.', [p('Inside, over the desk, there is a long mirror in a gilt frame. You look straight into it as you pass, into the dark behind the glass, so that whoever is watching knows that you know they are.')]),
      door('away', 'Don’t look', 'At anything but the mirror.', [p('You don’t look at the mirror. You look at the window, at the lights on the river, at anything else.')]),
    ];
  }
  return [
    offer('i13-corridor-on', a === 'refused' ? 'Turn the phone over' : a === 'turn' ? 'Let him walk you to a taxi' : 'Go home', a === 'refused' ? 'Say nothing at all.' : 'It is done.', 'smallhours', (x) => {
      if (a === 'turn') {
        setKey(x, 'act3.ally.marsh', 'in');
        note(x, 'i-marsh', 'Owen Marsh, deputy director of enforcement at the Markets Authority, knows that Meridian tried to own him through Evelynn in suite 1109, on a forged Axiom tasking. The footage shows a staged scene. He is an ally.', 'Owen Marsh, suite 1109, the Claremont');
      } else if (a === 'swap') {
        set13(x, 'card', 'taken');
        note(x, 'i-card', 'The memory card from the camera behind the mirror in suite 1109 at the Claremont holds the metadata of every placement filmed there.', 'The monitor cupboard, 1108, the Claremont');
      }
      return a === 'refused' ? [p('You turn the phone over and sit with your back against the wall until the clock says midnight, and then one, and nobody comes.')] : [];
    }),
  ];
}

// ── The small hours ──

function smallhoursBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p(backup(s) ? 'Sloane drives you home herself, in her own car, which smells of nothing at all. She does not speak until you do, and you do not, and she does not seem to mind.' : 'The car home. A driver who does not look at you.'),
      p('The shower, as hot as it goes, for as long as it takes, which is a long time. You do not look at the drawer.'),
      p('The black phone, on the edge of the bath.'),
      q('C.', 'Lovely. You see how easy it is.'),
    ];
  if (a === 'refused') return [p('Two in the morning. The flat, the wall, the black phone face down. Nothing has happened to you. That is how it works: they do not need to do anything to you. They will do it to Maya, on paper, on Friday, and let you watch.')];
  if (a === 'turn')
    return [p('Marsh walks you down the back stairs at two and puts you in a taxi, and leans in the window.'), q('Owen Marsh', 'Friday. Nine. My office. Bring what you have. And Ms Vale: thank you. Nobody has ever warned me about anything.')];
  return [p('Iris, at two, in an all-night café on the Strand, with the glove on the table between you like a small dead bird.'), q('Iris Moreau', 'Every one of them. Every placement they ever filmed in that room. Do you understand what you’re holding?')];
}

function smallhoursChoices(s: GameState): C13Choice[] {
  if (answer(s) !== 'complied') return [offer('i13-smallhours-on', 'Morning', 'Saturday.', 'weekend')];
  const r = (id: 'daniel' | 'maya' | 'sloane' | 'wall' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('i13-recover-' + id, label, hint, 'weekend', (x) => {
      set13(x, 'i-recover', id);
      return body;
    });
  return [
    ...(told(s)
      ? [r('daniel', 'Go to Daniel, and ask only to be held', 'He knows who you are. He won’t ask for anything.', [p('Daniel’s flat above the launderette at three in the morning. He opens the door in a jumper, and looks at your face, and does not ask.'), q('You', 'Just hold me. That’s all. Please.'), p('He holds you, on the sofa, with the lights off and the dryers silent downstairs, for the rest of the night. Nothing else happens, and he does not ask for anything, and he does not let go.')])]
      : []),
    ...(key(s, 'c6.maya') === 'restored'
      ? [r('maya', 'Go to Maya’s', 'Ask to sleep on the sofa. Don’t say why.', [p('Maya’s, at a quarter to three. You ask to sleep on the sofa and do not say why. She does not ask. She makes up the sofa, and then sits on the floor beside it until you are asleep.')])]
      : []),
    ...(backup(s)
      ? [r('sloane', 'Let Sloane stay', 'She hasn’t left. She won’t touch you.', [p('She hasn’t left. When you come out of the bathroom, Victoria Sloane is sitting on the floor of the hall with her back against the wall, under the green light, her shoes beside her, in the one place in the flat that is logged.'), q('Sloane', 'I’m not going to touch you. I’m not going to say anything. I’m going to sit here until it’s light, and it’s going to be on the record that I did.'), p('You sit down on the floor at the other end of the hall. Neither of you says anything. At seven the window goes grey, and she puts her shoes on, and goes, and on Monday the log says: 03:10 – 07:02 · V.S. PRESENT. NO ACTION.')])]
      : []),
    r('wall', 'Write it on the wall', 'In your own hand.', [p('At the wardrobe door, in your own hand, on a card of its own: the date, 1109, and under it, DONE TO ME. NOT BY ME. You pin it where you will see it every morning, and it helps, a little, to have said it somewhere.')]),
    r('alone', 'Sit up until it gets light', 'In the dark.', [p('You sit up in the dark with a blanket round you until the window goes grey, and then a little longer.')]),
  ];
}

// ── The weekend ──

function weekendBlocks(s: GameState): Block[] {
  const a = answer(s);
  const c = channel(s);
  return [
    ...(a === 'refused'
      ? [
          p('On Friday at eleven a file reaches Axiom’s board about a compliance investigator, a journalist, and some client data. By four, Maya Reyes’s promotion has been withdrawn, and a formal warning sits on her record about a journalist she has never met. She keeps her desk. She loses the thing she wanted most, and nobody will tell her why.'),
          p('You watch her through the glass of the compliance wing at five, packing nothing, sitting very straight, reading the letter a third time. It is only paper.'),
          q('C.', 'I did say, darling.'),
        ]
      : a === 'complied'
        ? [q('C.', 'Thank you, darling. He’s ours now. Maya’s file is back in its drawer. You see how simple it is when everybody does their job.')]
        : a === 'turn'
          ? [q('C.', 'Lovely footage, darling. Very convincing. I’m told he’s been quite distracted since.'), t('She thinks she owns him. He is at his desk on Friday at nine, reading what I brought him, with the door shut.')]
          : [q('C.', 'The Claremont says there was a fault with the equipment on Thursday. How very modern of it.'), t('Every placement they ever filmed in that room. In a glove. In Iris’s coat.')]),
    ...(c === 'sloane' ? [p('On Saturday Sloane rings, once, on the backup line. “I’ve taken the tasking to the chair of the board myself. As a forgery in my name. They’ll open something on Monday. It will probably be about me. Let it.”')] : c === 'benton' ? [p('On Saturday, a grey envelope on your mat at the flat, hand-delivered, AX-7A, in Benton’s own neat hand this time: a single line. THANK YOU FOR YOUR SERVICE. — E.B.')] : []),
  ];
}
function weekendChoices(): C13Choice[] {
  return [offer('i13-weekend-card', 'The wardrobe door', 'Pin it.', 'complete')];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  const c = channel(s);
  return [
    p('The wardrobe door. A new card, beside the Vesper, in capitals:'),
    q('The card', 'THE CLAREMONT. 1109. ' + (a === 'complied' ? 'DONE.' : a === 'refused' ? 'REFUSED. MAYA.' : a === 'turn' ? 'STAGED. MARSH IS OURS. MINE.' : 'THE CARD IS OUT.')),
    q('The card', c === 'sloane' ? 'SHE NEVER WROTE IT.' : c === 'benton' ? 'BENTON CONFIRMED IT.' : 'NOBODY KNOWS.'),
    t(c === 'sloane' ? 'It came through the channel. I took it back up the channel, and the channel held. That is the only reason I can still stand in that building.' : 'It came through the channel. The channel is theirs. I am going to have to build another one.'),
  ];
}

export function institutionalBlocks13(s: GameState): Block[] {
  if (s.phase === 'tasking') return taskingBlocks();
  if (s.phase === 'dread') return dreadBlocks();
  if (s.phase === 'channel') return channelBlocks();
  if (s.phase === 'reply') return replyBlocks();
  if (s.phase === 'corridor') return corridorBlocks(s);
  if (s.phase === 'smallhours') return smallhoursBlocks(s);
  if (s.phase === 'weekend') return weekendBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices13(s: GameState): C13Choice[] {
  if (s.phase === 'tasking') return taskingChoices();
  if (s.phase === 'dread') return dreadChoices(s);
  if (s.phase === 'channel') return channelChoices();
  if (s.phase === 'reply') return replyChoices(s);
  if (s.phase === 'corridor') return corridorChoices(s);
  if (s.phase === 'smallhours') return smallhoursChoices(s);
  if (s.phase === 'weekend') return weekendChoices();
  return [];
}
