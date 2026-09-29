/** Chapter 13 (Executive route, lane id `executive`) · Held:
 * placement → days → wednesday → claremont → twoam → saturday → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_13_HELD_DESIGN.md (owner-approved 2026-09-29, all eight decisions as recommended);
 * script: docs/story/scripts/EXECUTIVE_CHAPTER_13_SCRIPT.md. The shared placement ("The Honeypot") in Executive framing.
 * This is the road's reserved sexual-coercion beat, and it follows CONTENT_DIRECTION §2 to the letter: a content notice
 * opens it; on the comply path the order, getting ready, the walk and the door closing are on screen and everything
 * behind the door is off screen, never described and never framed as arousing; the aftermath is on screen without
 * detail; the comply lead-in honours the reader's "Fade coercion scenes" (fadeExecutive13, called from fadeCoercion13).
 * Refusal never costs her body: the non-sexual cost is Julian's standing (his eleven signatures to Helix's audit
 * committee). Owen Marsh's open inquiry is into 14.3. The Executive choice is what she tells Julian, and when (before /
 * after / never); before, he asks what she needs him to be on Thursday (the lobby / the phone / nowhere) and is it. His
 * refuge after compliance is being held, nothing more (canon). Counterplay: turn Marsh (a staged scene for the camera,
 * both in on it, both clothed, heat 2: the only erotic scene here, because it is chosen), or swap the camera's card (if
 * Iris is free). Entered from an Executive `chapter12.complete`; Ch14 follows from `chapter13.complete`. Local helpers
 * mirror chapter13.ts (c13.* keys, chapter13.* ids); choice ids carry `x13-`. */
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

export const EXECUTIVE_PHASES13 = ['placement', 'days', 'wednesday', 'claremont', 'twoam', 'saturday'] as const;
export const isExecutive13 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase13 = (s: GameState) => isExecutive13(s) && ((EXECUTIVE_PHASES13 as readonly string[]).includes(s.phase) || s.phase === 'complete');

// ── Player comfort (CONTENT_DIRECTION §6) ──

export const X_CONTENT_NOTICE13 = 'Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath. You can shorten the coercion scenes in Settings: “Fade coercion scenes”.';
/** The first line of the Executive comply lead-in: fadeCoercion13 recognises the entry by it. */
export const X_COMPLY_OPENING13 = 'You get ready the way you would put on a coat in the rain: quickly, and without looking in the mirror longer than you have to.';
export const X_CORRIDOR13 = 'The corridor on the eleventh floor of the Claremont is long and quiet';
export const X_FADED_LEAD13 = 'Faded, at your request: she gets ready, is driven to the Claremont, sits with Owen Marsh at the bar until a quarter past eleven, and takes him up to the eleventh floor.';
/** Presentation only: with the reader's fade on, the Executive comply lead-in becomes one line; the corridor, the door and
 * the choice stay. The save and the ledger are never touched. */
export function fadeExecutive13(blocks: Block[]): Block[] {
  if (blocks[0]?.text !== X_COMPLY_OPENING13) return blocks;
  const door = blocks.findIndex((b) => b.text.startsWith(X_CORRIDOR13));
  return [{ kind: 'notice', text: X_FADED_LEAD13 }, ...(door >= 0 ? blocks.slice(door) : [])];
}

const answer = (s: GameState) => get13(s, 'x-answer') as 'complied' | 'refused' | 'turn' | 'swap' | undefined;
const toldBefore = (s: GameState) => key(s, 'exec.told13') === 'before';
const need = (s: GameState) => get13(s, 'x-need') as 'lobby' | 'phone' | 'nowhere' | undefined;
const proof = (s: GameState): string | undefined =>
  key(s, 'exec.file') === 'kept'
    ? 'page thirty-one, photographed on Julian’s tray'
    : key(s, 'exec.file') === 'pulled'
      ? 'the Rotterdam facility, unsigned, with Marcus Chen’s routing notes'
      : key(s, 'c12.rec.x-schedule') !== undefined
        ? 'the maintenance schedule for Number 9, Emerald Hill'
        : key(s, 'c12.rec.x-ashby') !== undefined
          ? 'Colin Ashby’s words, written down in the taxi'
          : undefined;

export function placeExecutive13(s: GameState): string | undefined {
  if (s.phase === 'days' && get13(s, 'x-need-open')) return 'Tuesday · late · Forty-one';
  const a = answer(s);
  if (s.phase === 'claremont' && a === 'refused') return '21:00 · Home';
  if (s.phase === 'claremont' && a === 'swap') return '20:10 · The Claremont, the service corridor';
  if (s.phase === 'twoam' && a === 'complied') return '02:00 · The car, and home';
  if (s.phase === 'saturday') return toldBefore(s) || get13(s, 'x-told') ? 'Saturday · His flat' : 'Saturday · Forty-one';
}

// ── The entry ──

export function beginExecutive13(): C13Choice {
  return offer('begin-executive', 'The first Thursday of next month', 'Celeste asks for you. ' + X_CONTENT_NOTICE13.replace('. You can shorten', '. Shorten').replace(' in Settings: “Fade coercion scenes”', ' in Settings'), 'placement', () => [
    p('The winter comes in grey over the river. Forty-one has its Christmas tree up by the lifts. The card that says THE VESPER is still on your wardrobe door, and under it, in the same neat type as everything else in that book, a date. It is next week.'),
  ]);
}

// ── The placement ──

function placementBlocks(s: GameState): Block[] {
  return [
    { kind: 'notice', text: X_CONTENT_NOTICE13 },
    p('The Vesper by day, closed, the empty frames unlit, the long room smelling of floor polish. Celeste in the reading room, with The Autumn Collection open at your page. She is kind about it, which is the worst of it.'),
    q('Celeste Laurent', 'A man called Owen Marsh. Forty-four, deputy director of enforcement at the Markets Authority. Divorced, a daughter at university, cycles to work. He drinks one whisky at the Claremont on Thursdays, alone.'),
    q('Celeste Laurent', 'His inquiry is into the guarantees certain funds take over the companies they finance. You know the one, darling. You’ve read page thirty-one.'),
    q('Celeste Laurent', 'The Claremont bar at nine. You will be charming. He will take you upstairs. Suite 1109 is ours, and there is a camera behind the mirror. After Thursday he is ours, and so is his inquiry, and so, frankly, is Julian’s future.'),
    ...(key(s, 'exec.sign11') === 'signed' ? [q('Celeste Laurent', 'He signed for you at the Vesper. You can do this for him.')] : []),
    q('Celeste Laurent', 'And if you’d rather not: Helix’s audit committee has never seen the eleven signatures. Every one of them, in his hand, unread. It could. It’s only paper.'),
    p('She does not ask for an answer. She closes the book.'),
    q('Celeste Laurent', 'Thursday. Let me know by Wednesday.'),
  ];
}

function placementChoices(): C13Choice[] {
  return [offer('x13-placement-go', 'Six days', 'Find out who he is.', 'days')];
}

// ── Six days ──

function daysBlocks(): Block[] {
  return [
    p('You find out who he is, because you cannot not. He cycles to work along the river in a yellow jacket. He buys the same sandwich every day and is funny with the woman at the till, who is fond of him. His inquiry’s public notice is two paragraphs long and says, in careful civil-service English, that it will look at the guarantees certain funds take over the companies they finance. He is the only person in London doing his job.'),
    t('Owning him buries the one inquiry that could save Julian. Or sink him. She wants me to decide which, and to decide it with my body.'),
    p('Tuesday, late, forty-one. Julian’s light and yours, either side of the glass.'),
  ];
}

function daysChoices(s: GameState): C13Choice[] {
  if (get13(s, 'x-need-open')) {
    const n = (id: 'lobby' | 'phone' | 'nowhere', label: string, hint: string, body: Block[]) =>
      offer('x13-need-' + id, label, hint, 'wednesday', (x) => {
        set13(x, 'x-need', id);
        delete x.choices['c13.x-need-open'];
        return body;
      });
    return [
      n('lobby', '“In the lobby.”', 'Somewhere I can see when I come down.', [q('You', 'In the lobby. Somewhere I can see when I come down. Don’t come up. Don’t do anything.'), q('Julian Mercer', 'The lobby. Nothing else. I promise.')]),
      n('phone', '“At the other end of a phone.”', 'Answer on the first ring.', [q('You', 'At the other end of a phone. Whenever I ring. Whatever time.'), q('Julian Mercer', 'First ring. I won’t sleep.')]),
      n('nowhere', '“Nowhere. Go home.”', 'The hardest thing to ask him.', [q('You', 'Nowhere. Go home, and stay there, and don’t ring me. I need to do this without you in it.'), p('It is the hardest thing you have ever asked him for. He looks at you for a long time.'), q('Julian Mercer', 'All right. Home. I’ll be there after, if you want me. And if you don’t, I’ll still be there.')]),
    ];
  }
  return [
    offer('x13-tell-now', 'Tell Julian now', 'Knock on his glass.', 'days', (x) => {
      setKey(x, 'exec.told13', 'before');
      set13(x, 'x-need-open');
      return [
        p('You knock on his glass with one knuckle, the way he knocked on yours, and go in, and shut the door.'),
        ...(key(x, 'exec.told12') === 'told'
          ? []
          : [p('It does not make sense without the rest of it, so you tell him the rest of it first: Adrian, and a clinic, and a face fitted to a woman called Nell. He listens with his hands flat on the desk.')]),
        p('Then you tell him about Thursday. The Claremont, a man called Owen Marsh, a room with a mirror. You tell him what you are being asked to do, in plain words, because he deserves plain words.'),
        p('He does not argue. He does not offer to fix it. He goes very white and very still, and when he speaks his voice is completely level.'),
        q('Julian Mercer', 'What do you need me to be on Thursday? In the lobby, at the other end of a phone, or nowhere. Tell me, and I’ll be it.'),
      ];
    }),
    offer('x13-tell-notyet', 'Not yet', 'Go home. Carry it.', 'wednesday', () => [p('You turn your light off and go home, and his is still on when you look back up from the street.')]),
  ];
}

// ── Wednesday ──

function wednesdayBlocks(): Block[] {
  return [p('Wednesday, midnight. The black phone, face up on the kitchen table, one contact.'), q('C.', 'Thursday, darling?')];
}

function wednesdayChoices(s: GameState): C13Choice[] {
  const a = (id: string, value: 'complied' | 'refused' | 'turn' | 'swap', label: string, hint: string, body: Block[]) =>
    offer('x13-answer-' + id, label, hint, 'claremont', (x) => {
      set13(x, 'x-answer', value);
      setKey(x, 'exec.honeypot13', value);
      return body;
    });
  const pr = proof(s);
  return [
    a('comply', 'complied', '“Thursday.”', 'The order holds. Julian’s signatures stay in her drawer.', [q('You', 'Thursday.')]),
    a('refuse', 'refused', '“No. Not this. Not ever.”', 'She will send the audit committee his signatures. Your body stays yours.', [q('You', 'No. Not this. Not ever.'), q('C.', 'Pity, darling. It’s only paper. Remember that I said so.')]),
    ...(pr ? [a('turn', 'turn', '“Thursday.” And mean something else.', 'Tell Marsh the truth in the lift, with ' + pr + '.', [q('You', 'Thursday.'), t('Said exactly the way she wants it said. That is the point.')])] : []),
    ...(key(s, 'exec.iris11') === 'warn'
      ? [a('swap', 'swap', '“Thursday.” And ring Iris.', 'She knows where the camera’s card is kept.', [q('You', 'Thursday.'), p('Then you ring the number on the stampless card, and Iris answers on the second ring as if she had been waiting.')])]
      : []),
  ];
}

// ── The Claremont ──

function claremontBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p(X_COMPLY_OPENING13),
      p('A dress that is nobody’s: black, plain, bought for this and for nothing else. The face finished once and not again. No perfume. The things that are yours, the good earrings, his cufflink, the photograph of a woman on a harbour wall, go into a drawer, and you shut the drawer, as if that could keep them out of it.'),
      p('At half past eight a car you did not order is at the kerb. The driver holds the door and does not look at you, all the way along the Embankment.'),
      ...(need(s) === 'lobby' ? [p('In the lobby of the Claremont, at a small table by the pillar, a man in a grey suit with a newspaper he is not reading. He does not look up as you pass. He is exactly where you asked him to be, and nowhere else.')] : []),
      p('The Claremont bar: marble, low lamps, leather and oranges. Owen Marsh at the end of it, a whisky, a paperback he is not reading, his cycling clips in his jacket pocket.'),
      p('It is appallingly easy. He is funny, at his own expense. He talks about his daughter, and about his work, not what is in it, only that it is the first thing in years he thinks might matter. He asks about you, and listens to the answers, which are lies, as if they were the most interesting things he has heard all year.'),
      t('He is kind, and he is lonely, and he has no idea, and his inquiry is the only thing in London that could have saved the man in the lobby.'),
      p('At a quarter past eleven you say you have a room upstairs, because that is the line. The lift, mirrored on every side. The numbers.'),
      p(X_CORRIDOR13 + ', carpeted in a red that swallows your footsteps. 1109 is at the end. He takes the key card from your fingers, because your fingers are not quite steady, and he notices, and says gently, “Are you all right?”'),
      p('You say yes. It is the last lie of the evening that you will have to say out loud.'),
    ];
  if (a === 'refused')
    return [
      p('At nine o’clock on Thursday you are at home in your oldest jumper, on the floor, with your back against the wall, not going to the Claremont.'),
      p('Across the river a man is having one whisky at the end of a bar, and nobody is going to sit down two stools along. You think about him for a while. It helps, a little.'),
      p('At eleven the black phone lights.'),
      q('C.', 'He orders his second whisky at eleven. It isn’t too late, darling.'),
    ];
  if (a === 'turn')
    return [
      p('Thursday. You get ready the way you would for any job: carefully, and for yourself. Your own dress. The heels you can run in. Your hair pinned hard, and in the mirror a woman who looks exactly like a honeypot, and is not one.'),
      p('The bar, Marsh, the whisky, the paperback. You are charming for exactly as long as the room is watching, and then, in the lift, with the doors shut and the numbers climbing, you hold your phone up so that he can read it: ' + proof(s) + '.'),
      q('You', 'Mr Marsh. There’s a camera behind the mirror in the room we’re going to. Somebody wants to own you and your inquiry. I’m supposed to be how. I’d rather be the other thing.'),
      p('He reads it twice, the way Julian would. Then he looks at you, and at the numbers, and something in his tired face wakes up.'),
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

function claremontChoices(s: GameState): C13Choice[] {
  const a = answer(s);
  if (a === 'complied') {
    const door = (id: 'look' | 'away', label: string, hint: string, body: Block[]) =>
      offer('x13-door-' + id, label, hint, 'twoam', (x) => {
        set13(x, 'x-door', id);
        return [...body, p('The door closes behind you.')];
      });
    return [
      door('look', 'Look at the mirror as you go in', 'So that whoever is behind it knows you know.', [p('Inside, over the desk, there is a long mirror in a gilt frame. You look straight into it as you pass, into the dark behind the glass, so that whoever is watching knows that you know they are.')]),
      door('away', 'Don’t look', 'At anything but the mirror.', [p('You don’t look at the mirror. You look at the window, at the lights on the river, at anything else.')]),
    ];
  }
  if (a === 'refused')
    return [
      offer('x13-vigil-no', '“No.”', 'Type it. Send it.', 'twoam', (x) => {
        set13(x, 'x-vigil', 'no');
        return [q('You', 'No.'), p('You turn the phone face down and sit with your back against the wall until the clock says midnight, and then one, and nobody comes.')];
      }),
      offer('x13-vigil-silent', 'Turn the phone over', 'Say nothing at all.', 'twoam', (x) => {
        set13(x, 'x-vigil', 'silent');
        return [p('You turn the phone over and say nothing, and sit with your back against the wall until the clock says midnight, and then one, and nobody comes.')];
      }),
    ];
  return [
    offer('x13-thursday-on', a === 'turn' ? 'Let him walk you to a taxi' : 'Go home', 'It is done.', 'twoam', (x) => {
      if (a === 'turn') {
        setKey(x, 'exec.marsh13', 'ally');
        note(x, 'x-marsh', 'Owen Marsh, deputy director of enforcement at the Markets Authority, knows that Meridian tried to own him through Evelynn in suite 1109, and what 14.3 is. The footage shows a staged scene. He is an ally.', 'Owen Marsh, suite 1109, the Claremont');
      } else {
        setKey(x, 'exec.card13');
        note(x, 'x-card', 'The memory card from the camera behind the mirror in suite 1109 at the Claremont holds the metadata of every placement filmed there.', 'The monitor cupboard, 1108, the Claremont');
      }
      return [];
    }),
  ];
}

// ── 2 a.m. ──

function twoamBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p(need(s) === 'lobby' ? 'Julian drives you home himself, in his own car, which you did not know he had. He does not speak until you do, and you do not, and he does not seem to mind.' : 'The car home. A driver who does not look at you.'),
      p('The shower, as hot as it goes, for as long as it takes, which is a long time. You do not look at the drawer.'),
      p('The black phone, on the edge of the bath.'),
      q('C.', 'Lovely. You see how easy it is.'),
      ...(need(s) === 'phone' ? [p('Your own phone, beside it. You ring him. He answers on the first ring, and does not say anything, and does not need to, and stays on the line while you sit on the bathroom floor.')] : []),
    ];
  if (a === 'refused') return [p('Two in the morning. The flat, the wall, the black phone face down. Nothing has happened to you. That is how it works: they do not need to do anything to you. They will do it to him, on paper, on Tuesday, and let you watch.')];
  if (a === 'turn')
    return [
      p('Marsh walks you down the back stairs at two and puts you in a taxi, and leans in the window.'),
      q('Owen Marsh', 'Friday. Nine. My office. Bring the page. And Ms Vale: thank you. Nobody has ever warned me about anything.'),
    ];
  return [p('Iris, at two, in an all-night café on the Strand, with the glove on the table between you like a small dead bird.'), q('Iris Moreau', 'Every one of them. Every placement they ever filmed in that room. Do you understand what you’re holding?')];
}

function twoamChoices(s: GameState): C13Choice[] {
  if (answer(s) !== 'complied') return [offer('x13-twoam-on', 'Morning', 'Saturday.', 'saturday')];
  const r = (id: 'julian' | 'maya' | 'wall' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('x13-recover-' + id, label, hint, 'saturday', (x) => {
      set13(x, 'x-recover', id);
      return body;
    });
  return [
    r('julian', 'Go to him, and ask only to be held', 'Nothing else. He won’t ask for anything.', [
      p(need(s) === 'lobby' ? 'He has not left. When you come out of the bathroom he is on your sofa, awake, in his shirtsleeves, with the lamp off.' : toldBefore(s) ? 'He is awake, at his door, before you knock.' : 'You ring his bell at three in the morning, and he opens the door in a jumper, and looks at your face, and does not ask.'),
      q('You', 'Just hold me. That’s all. Please.'),
      p('He holds you. On the sofa, with the lights off and the city on, for the rest of the night. Nothing else happens, and he does not ask for anything, and he does not let go.'),
    ]),
    ...(key(s, 'c6.maya') === 'restored'
      ? [r('maya', 'Go to Maya’s', 'Ask to sleep on the sofa. Don’t say why.', [p('Maya’s, at a quarter to three. You ask to sleep on the sofa and do not say why. She does not ask. She makes up the sofa, and then sits on the floor beside it until you are asleep.')])]
      : []),
    r('wall', 'Write it on the wall', 'In your own hand.', [p('At the wardrobe door, in your own hand, on a card of its own: the date, 1109, and under it, DONE TO ME. NOT BY ME. You pin it where you will see it every morning, and it helps, a little, to have said it somewhere.')]),
    r('alone', 'Sit up until it gets light', 'In the dark.', [p('You sit up in the dark with a blanket round you until the window goes grey, and then a little longer.')]),
  ];
}

// ── Saturday ──

function saturdayBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    q(
      'C.',
      a === 'complied'
        ? 'You were beautiful. He will be very useful.'
        : a === 'refused'
          ? 'I did so hope. Helix’s audit committee meets on Tuesday. They’ll have such a lot to read.'
          : a === 'turn'
            ? 'Very pretty. Very convincing. You’ve a gift, darling.'
            : 'Somebody has been in my cupboard at the Claremont. How very brave of them.',
    ),
    ...(a === 'refused' ? [p('On Monday the letter goes to every member of Helix’s audit committee: eleven signatures, eleven facilities, one clause, and a covering note in no hand at all. The Group COO signs what he does not read.')] : []),
  ];
}

const answerBlocks: Record<'complied' | 'refused' | 'turn' | 'swap', Block[]> = {
  complied: [q('Julian Mercer', 'You don’t owe me the details. You never will. I’d like to be there for the rest of it, if you’ll let me.')],
  refused: [q('Julian Mercer', 'So that’s what the audit committee is about. Good. Let them come. I’ve been meaning to explain myself to somebody for eleven years.')],
  turn: [p('He is quiet for a long time.'), q('Julian Mercer', 'You made a man at the Markets Authority an ally in a hotel suite with a camera in the wall.'), q('Julian Mercer', 'I’d like to meet him. I think I’d like him.')],
  swap: [q('Julian Mercer', 'Every one?'), q('You', 'Every one.'), q('Julian Mercer', 'Then she’s frightened. Good.')],
};

function saturdayChoices(s: GameState): C13Choice[] {
  const a = answer(s) ?? 'complied';
  if (toldBefore(s))
    return [
      offer('x13-saturday-on', 'Saturday, with him', 'He already knows.', 'complete', (x) => {
        set13(x, 'x-told', 'before');
        return [p('Saturday, his flat, the curtains open, rain. He already knows, and he asks nothing, and then, over coffee, says the thing he has been holding since Thursday.'), ...answerBlocks[a]];
      }),
    ];
  return [
    offer('x13-told-after', 'Tell him', 'All of it that is yours to tell.', 'complete', (x) => {
      setKey(x, 'exec.told13', 'after');
      set13(x, 'x-told', 'after');
      note(x, 'x-told', 'Evelynn told Julian Mercer about the placement at the Claremont, after it.', 'Evelynn, to Julian Mercer');
      return [
        p('Saturday, forty-one, empty, rain on the glass. You close his door and tell him. The Vesper by day, a man called Owen Marsh, a room with a mirror, and what you chose, and why.'),
        ...(key(x, 'exec.told12') === 'told' ? [] : [p('And, because none of it makes sense without it, the rest: Adrian, and a clinic, and a woman called Nell.')]),
        p('He listens with his hands flat on the desk, and does not interrupt once.'),
        ...answerBlocks[a],
      ];
    }),
    offer('x13-told-never', 'Never', 'Carry it.', 'complete', (x) => {
      setKey(x, 'exec.told13', 'never');
      set13(x, 'x-told', 'never');
      return [p('You do not tell him. On Saturday he brings you coffee at your desk and asks nothing, and is kind, and never knows why you stand at the window for so long.')];
    }),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  const tl = key(s, 'exec.told13');
  return [
    p('The wardrobe door. Beside NELL, a new card:'),
    q('The card', 'THE CLAREMONT. 1109.'),
    q(
      'The card',
      a === 'complied'
        ? get13(s, 'x-recover') === 'wall'
          ? 'DONE TO ME. NOT BY ME.'
          : 'THURSDAY. HELD, AFTER.'
        : a === 'refused'
          ? 'I SAID NO. HE PAID. HE SAID GOOD.'
          : a === 'turn'
            ? 'OWEN MARSH. ALLY. PAGE THIRTY-ONE ON HIS DESK.'
            : 'EVERY ONE OF THEM. IN A GLOVE.',
    ),
    q('The card', tl === 'before' ? 'HE KNEW. HE WAS WHERE I ASKED.' : tl === 'after' ? 'HE KNOWS.' : 'HE DOESN’T KNOW.'),
    t(a === 'complied' ? 'It happened. It was done to me. I am still here, and so is the wall, and so is the clause.' : 'She tried to buy the only man in London who could save him. She will not stop at a man.'),
  ];
}

export function executiveBlocks13(s: GameState): Block[] {
  if (s.phase === 'placement') return placementBlocks(s);
  if (s.phase === 'days') return daysBlocks();
  if (s.phase === 'wednesday') return wednesdayBlocks();
  if (s.phase === 'claremont') return claremontBlocks(s);
  if (s.phase === 'twoam') return twoamBlocks(s);
  if (s.phase === 'saturday') return saturdayBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices13(s: GameState): C13Choice[] {
  if (s.phase === 'placement') return placementChoices();
  if (s.phase === 'days') return daysChoices(s);
  if (s.phase === 'wednesday') return wednesdayChoices(s);
  if (s.phase === 'claremont') return claremontChoices(s);
  if (s.phase === 'twoam') return twoamChoices(s);
  if (s.phase === 'saturday') return saturdayChoices(s);
  return [];
}
