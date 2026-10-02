/** Chapter 13 (Outside route, lane id `outside`) · The Price:
 * terms → watch → dusk → door → hours → morrow → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_13_THE_PRICE_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_13_SCRIPT.md. The shared placement ("The Honeypot") in Outside
 * framing. THIS IS THE GAME'S RESERVED SEXUAL-COERCION BEAT ON THIS ROAD and follows docs/story/CONTENT_DIRECTION.md §2 to the
 * letter: on screen, the order, the choice, getting ready, the walk to the door and the door closing; off screen, everything
 * behind the door, never described as it happens and never framed as arousing; the aftermath on screen without graphic
 * detail; refusal never leads to sexual punishment and every threat is non-sexual (here the threat is to the sender, a man on
 * a river, and to Maya's career); a content notice opens the chapter and the comply lead-in honours the reader's "Fade
 * coercion scenes" setting (fadeOutside13, called from fadeCoercion13). The placement arrives as Celeste's price for not
 * finding the sender. Owen Marsh is a person first. The Outside choice: comply (off screen, as canon), refuse (the cost falls
 * on the source: they find his lodgings, and he goes to ground), or turn it (Rafe's ledger, or a page she verified herself,
 * to Marsh in the lift; a staged scene both in on it, clothed, charged and fake, heat 2). The recovery step on the comply path
 * is a refuge and never sexual: Maya; the wall ("Done to me. Not by me."); the 02:40 phone, a man reading her the shipping
 * forecast; or alone. The placement date is never moved as a punishment. Entered from an Outside `chapter12.complete`; Ch14
 * follows directly. Writes the shared Act III keys (c13.answer, act3.honeypot, act3.ally.marsh); `out.*`, `c13.o-*`; ids carry
 * `o13-`.
 * Deepening pass (2026-10-02): three moments, each with a neutral pick that changes no flag, none inside or beside the
 * coercion beat: the content notice, the comply lead-in, the fade, the door and the recovery are untouched. The price on the
 * black phone, before the week (c13.o-msg = wall | book | face: the facts put on the wall; each fact checked in the exercise
 * book, and true; or the phone turned face down). Marsh as a person, before she chooses who to tell (c13.o-see = bike |
 * paper | none: his bicycle and his good morning to the guard; his own published talks; or not looking at all). The Sunday
 * after, whichever way the week went, before the card (c13.o-sunday = walk | letter | stove: a long walk to the end of the
 * river; a letter to Maya, not sent; or the stove lit and the Vesper's ribbon burned). */
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
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES13 = ['terms', 'watch', 'dusk', 'door', 'hours', 'morrow'] as const;
export const isOutside13 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase13 = (s: GameState) => isOutside13(s) && ((OUTSIDE_PHASES13 as readonly string[]).includes(s.phase) || s.phase === 'complete');

// ── Player comfort (CONTENT_DIRECTION §6) ──

export const O_CONTENT_NOTICE13 = 'Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath. You can shorten the coercion scenes in Settings: “Fade coercion scenes”.';
/** The first line of the Outside comply lead-in: fadeCoercion13 recognises the entry by it. */
export const O_COMPLY_OPENING13 = 'You get ready the way you pack for a journey you did not choose: methodically, and with nothing in the bag that you would miss.';
export const O_CORRIDOR13 = 'The corridor on the eleventh floor of the Claremont is long and quiet';
export const O_FADED_LEAD13 = 'Faded, at your request: she gets ready, is driven to the Claremont, sits with Owen Marsh at the bar until a quarter past eleven, and takes him up to the eleventh floor.';
/** Presentation only: with the reader's fade on, the Outside comply lead-in becomes one line; the corridor, the door and the
 * choice stay. The save and the ledger are never touched. */
export function fadeOutside13(blocks: Block[]): Block[] {
  if (blocks[0]?.text !== O_COMPLY_OPENING13) return blocks;
  const door = blocks.findIndex((b) => b.text.startsWith(O_CORRIDOR13));
  return [{ kind: 'notice', text: O_FADED_LEAD13 }, ...(door >= 0 ? blocks.slice(door) : [])];
}

const answer = (s: GameState) => get13(s, 'o-answer') as 'complied' | 'refused' | 'turn' | undefined;
const give10 = (s: GameState) => key(s, 'out.give10') as 'gave' | 'doctored' | 'refused' | undefined;
/** What she can put in front of Marsh: Rafe's ledger if she told him; otherwise a page she verified herself. */
const proof = (s: GameState): string | undefined =>
  key(s, 'out.ledger13')
    ? 'a courier’s ledger, three years of handoffs in his own hand, dates and names and who received'
    : Number(key(s, 'out.verified') ?? 0) >= 1
      ? 'a page you verified yourself: the Project Eve board, one name cross-checked against the public filings'
      : undefined;

export function placeOutside13(s: GameState): string | undefined {
  if (s.phase === 'door' && answer(s) === 'refused') return '21:00 · The room over the water';
  if (s.phase === 'hours' && answer(s) === 'complied' && get13(s, 'o-recover') === 'phone') return '02:40 · The room over the water';
}

// ── The entry ──

export function beginOutside13(): C13Choice {
  return offer('begin-outside', 'The first Thursday of next month', 'The black phone. ' + O_CONTENT_NOTICE13.replace('. You can shorten', '. Shorten').replace(' in Settings: “Fade coercion scenes”', ' in Settings'), 'terms', () => [
    p('The winter comes in grey over the river. In the room over the water the damp has found the corner by the stove, and on the wall, under a card that says UNCLAIMED, a date in your own hand. It is next week.'),
  ]);
}

// ── The terms ──

function termsBlocks(s: GameState): Block[] {
  const g = give10(s);
  return [
    { kind: 'notice', text: O_CONTENT_NOTICE13 },
    p('Monday, a little after nine. The black phone, which has been quiet for a month, lights on the table.'),
    q('C.', 'Darling. I have been so patient about your friend. ' + (g === 'gave' ? 'You gave me a place and an hour, and I have been kind with them. ' : g === 'doctored' ? 'You gave me Pier Nine, and I have not forgotten it. ' : 'You would not give him up, and I have been decent about that. ') + 'A man in a courier’s jacket leaves a trail like a snail on a stone.'),
    q('C.', 'On the first Thursday I should like you at the Claremont at nine. He drinks one whisky at the bar, alone. His name is Owen Marsh. He is a deputy director of enforcement at the Markets Authority, and he has become a nuisance. Suite 1109 is ours. There is a camera behind the mirror. After Thursday he is ours, and so is his inquiry.'),
    q('C.', 'And so, I think, is your friend’s peace of mind. I should hate for a man like that to be found. They do get found, you know. It is only a question of by whom.'),
    q('C.', 'And do think of Maya. There is a file with her name on it, about a journalist and some client data. It is only paper. Paper is what you make it.'),
    t('A price. Not for a name: for a man’s silence in a suite on the eleventh floor. And the threat is not to me. It is to a man on a river, and to a woman in compliance, and it is exactly as cheap as it sounds.'),
  ];
}

function msgChoices(): C13Choice[] {
  const k = (id: 'wall' | 'book' | 'face', label: string, hint: string, body: Block[]) =>
    offer('o13-msg-' + id, label, hint, 'terms', (x) => {
      set13(x, 'o-msg', id);
      return body;
    });
  return [
    k('wall', 'Put the facts on the wall', 'Names, a place, a date. Nothing else.', [p('You write it on the wall in pencil, in four lines, and nothing else: THE CLAREMONT. THE FIRST THURSDAY. NINE. OWEN MARSH. No adjectives. No verbs. A wall that reads like a docket is a wall you can look at without it looking back.')]),
    k('book', 'Check what she said in the exercise book', 'Every fact, in the column.', [p('You open the exercise book and check what she said the way you check anything: that there is a Claremont, that there is a bar, that a man called Owen Marsh is a deputy director of enforcement and drinks one whisky on Thursdays. You tick each one in the right-hand column. All true. You have never hated a column so much.')]),
    k('face', 'Turn the phone face down', 'And sit with your hands beside it.', [p('You turn the black phone face down on the table, and put your hands flat on either side of it, and sit like that until the light on its back has gone out. It is not an answer. It is a thing a person can do with her hands while she is deciding not to be hurried.')]),
  ];
}

function termsChoices(s: GameState): C13Choice[] {
  if (!get13(s, 'o-msg')) return msgChoices();
  return [offer('o13-terms-on', 'The week', 'Six days.', 'watch')];
}

// ── The week ──

function watchBlocks(): Block[] {
  return [
    p('The week as dread. You find out who he is, because you cannot not: Owen Marsh, forty-four, deputy director of enforcement at the Markets Authority, divorced, a daughter at university. He cycles to work in all weathers. He is funny with the woman at the till in the café by his office. His inquiry is into a fund whose clients’ money moves through Halvorsen’s ships. He is the only one in London doing his job.'),
    t('She is not threatening a man who has done anything. She is threatening a man who has not stopped.'),
    p('Thursday is four days off. You have, you decide, until midnight on Wednesday, and you spend the days finding out what you can bear to find out, and who you can bear to tell.'),
  ];
}

function seeChoices(): C13Choice[] {
  const k = (id: 'bike' | 'paper' | 'none', label: string, hint: string, body: Block[]) =>
    offer('o13-see-' + id, label, hint, 'watch', (x) => {
      set13(x, 'o-see', id);
      return body;
    });
  return [
    k('bike', 'See him arrive, once', 'From the café opposite the Authority.', [p('You are in the café opposite the Authority at ten to eight on Tuesday with a coffee you do not drink, and he comes up the road on a bicycle in the rain, in clips and a yellow cape, and locks it to the railings with two locks, properly, like a man who has had a bicycle stolen once. He says good morning to the guard by name, and asks after the guard’s knee. Then he goes in. It takes ninety seconds. You would not know him in a crowd, and that is what frightens you.')]),
    k('paper', 'Read what he has published', 'His talks. His own words.', [p('You find the talks he has given, three of them, on a regulator’s website, transcribed, and read them at the table under the lamp, and they are very dull and very careful, full of subordinate clauses and the word “proportionate”. In the third, in a paragraph nobody will ever quote, he says that the thing he minds most about his work is how often the people it protects never learn they were protected.')]),
    k('none', 'Don’t look at him at all', 'Know no more than you must.', [p('You do not go to the café. You do not read the talks. You know his name, his post and his whisky, and you decide to know no more than that, because every extra fact you learn about a man is one more thing you will have to carry, whatever happens on Thursday.')]),
  ];
}

function watchChoices(s: GameState): C13Choice[] {
  if (!get13(s, 'o-see')) return seeChoices();
  const m = (id: 'rafe' | 'maya' | 'alone', label: string, hint: string, body: Block[], extra?: (x: GameState) => void) =>
    offer('o13-move-' + id, label, hint, 'dusk', (x) => {
      set13(x, 'o-move', id);
      extra?.(x);
      return body;
    });
  return [
    m('rafe', 'Ring the 02:40 phone', 'Tell him the shape of it. He is the price.', [
      p('You ring it at noon, which you have never done, and tell him the shape, the order and the price and who the price is. You do not say what the order is. You say only that a man at the Markets Authority is to be owned by Thursday, and that he, the man on the river, is the thing she is paying with.'),
      p('There is a long silence on the line, the kind in which you can hear somebody sit down.'),
      q(SENDER, 'Then it’s me she’s paying with. All right. Listen. I will give you something to pay her back with.'),
      q(SENDER, 'My ledger. Every handoff I carried for her, three years of them: dates, names, who received, in my hand. It’s the one thing that could take his inquiry out of her reach and put it in his. If you take it to him, you’ll be telling him who the courier was. I’m telling you to take it.'),
      q('You', 'It has your hand on every page.'),
      q(SENDER, 'Yes. That’s why it’s worth anything.'),
      p('You find it on the third step on Tuesday morning, in a plain brown envelope, with nothing written on it at all.'),
    ], (x) => {
      setKey(x, 'out.ledger13');
      setKey(x, 'out.told13');
    }),
    ...(key(s, 'c6.maya') === 'restored'
      ? [m('maya', 'Maya, dinner', 'She can’t be told. She notices everything.', [
          p('A dinner on Tuesday, at the place near the river where Maya has eaten alone for ten years. She notices at once. You cannot say one true sentence, and the not-saying is so loud that she stops asking, and puts her hand over yours on the cloth, and leaves it there.'),
          q('Maya', 'You’re about to be handed something you didn’t ask for. I’ve seen that face on the day of every hearing I ever lost. Whatever it is, I’m on the other end of a phone. All night.'),
        ])]
      : []),
    m('alone', 'Stay in, alone', 'With the wall and the date.', [p('You stay in, and keep to yourself, and do the thing you have learned to do on the days before a thing: you do not think about it, with great concentration, for the whole of the week.')]),
  ];
}

// ── Wednesday midnight ──

const midnight: Block[] = [p('Midnight. The black phone with its one contact, lit on the table. The room over the water, the stove ticking as it cools.')];

function duskBlocks(): Block[] {
  return midnight;
}

function duskChoices(s: GameState): C13Choice[] {
  const a = (id: 'comply' | 'refuse' | 'turn', value: 'complied' | 'refused' | 'turn', label: string, hint: string, body: Block[]) =>
    offer('o13-reply-' + id, label, hint, 'door', (x) => {
      set13(x, 'o-answer', value);
      set13(x, 'answer', value === 'complied' ? 'complied' : value === 'refused' ? 'refused' : 'countered');
      setKey(x, 'act3.honeypot', value === 'complied' ? 'done' : value === 'refused' ? 'refused' : 'staged');
      if (value === 'refused') setKey(x, 'out.rafe13', 'hiding');
      return body;
    });
  const pr = proof(s);
  return [
    a('comply', 'complied', '“Thursday.”', 'The order holds. The man on the river stays unfound.', [q('You', 'Thursday.')]),
    a('refuse', 'refused', '“No. Not this. Not ever.”', 'Your body stays yours. The cost falls on the man on the river.', [
      q('You', 'No. Not this. Not ever.'),
      q('C.', 'Pity, darling. It is only paper. Remember I said so.'),
      p('You turn the phone face down on the table and sit with your hands flat on either side of it until the stove has gone cold.'),
    ]),
    ...(pr ? [a('turn', 'turn', '“Thursday.” And mean something else.', 'Put ' + pr + ' in front of Marsh in the lift.', [q('You', 'Thursday.'), t('Said exactly the way she wants it said. That is the point.')])] : []),
  ];
}

// ── Thursday ──

function doorBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p(O_COMPLY_OPENING13),
      p('A dress that is nobody’s: black, plain, bought for this and for nothing else. The face finished once and not again. No perfume. The things that are yours, the cheap phone with its one contact, the photograph of a woman on a harbour wall if you have one, the earrings, go into the drawer by the bed, and you shut the drawer.'),
      p('At half past eight a car you did not order is at the foot of the iron stair. The driver holds the door and does not look at you.'),
      p('The Claremont bar: marble, low lamps, leather and oranges. Owen Marsh at the end of it, a whisky, a paperback he is not reading, his cycling clips in his jacket pocket.'),
      p('It is appallingly easy. He is funny, at his own expense. He talks about his daughter, and about his work, only that it is the first thing in years he thinks might matter. He asks about you, and listens to the answers, which are lies, as if they were the most interesting things he has heard all year.'),
      t('He is kind, and he is lonely, and he has no idea. And the price is a man on a river.'),
      p('At a quarter past eleven you say you have a room upstairs, because that is the line. The lift, mirrored on every side. The numbers.'),
      p(O_CORRIDOR13 + ', carpeted in a red that swallows your footsteps. 1109 is at the end. He takes the key card from your fingers, because your fingers are not quite steady, and he notices, and says gently, “Are you all right?”'),
      p('You say yes. It is the last lie of the evening that you will have to say out loud.'),
    ];
  if (a === 'refused')
    return [
      p('At nine o’clock on Thursday you are in the room over the water in your oldest jumper, on the floor with your back against the wall, not going to the Claremont.'),
      p('Across the river a man is having one whisky at the end of a bar, and nobody is going to sit down two stools along. You think about him for a while. It helps, a little.'),
      q('C.', 'He orders his second whisky at eleven. It isn’t too late, darling.'),
    ];
  return [
    p('Thursday. You get ready the way you would for any errand you believed in: carefully, and for yourself. Your own dress. The heels you can run in. In the mirror a woman who looks exactly like a honeypot, and is not one.'),
    p('The bar, Marsh, the whisky, the paperback. You are charming for exactly as long as the room is watching, and then, in the lift, with the doors shut and the numbers climbing, you hold your phone up so that he can read it: ' + (proof(s) ?? 'the proof') + '.'),
    q('You', 'Mr Marsh. There’s a camera behind the mirror in the room we’re going to. Somebody wants to own you and your inquiry. I was sent to be how. I’d rather be the other thing.'),
    p('He reads it twice. Then he looks at you, and at the numbers, and something in his tired face wakes up.'),
    q('Owen Marsh', 'Then we’d better give them something to watch.'),
    p('Suite 1109. The mirror over the desk. You stage it for the camera, both of you in on it, both of you clothed: the light low, your hand in his hair, his mouth at your ear, and under the music, off the microphone, for real, “Is this all right?” “Yes. Keep going. Slower.” It is charged, and it is entirely fake, and it is the only thing in this whole business that you have chosen.'),
    p('At one you sit on the end of the bed a foot apart, with the lights off and the camera still running, and whisper, and plan, like two people on the same side of something for the first time in years.'),
  ];
}

function doorChoices(s: GameState): C13Choice[] {
  const a = answer(s);
  if (a === 'complied') {
    const d = (id: 'look' | 'away', label: string, hint: string, body: Block[]) =>
      offer('o13-door-' + id, label, hint, 'hours', (x) => {
        set13(x, 'o-door', id);
        return [...body, p('The door closes behind you.')];
      });
    return [
      d('look', 'Look at the mirror as you go in', 'So that whoever is behind it knows you know.', [p('Inside, over the desk, there is a long mirror in a gilt frame. You look straight into it as you pass, into the dark behind the glass, so that whoever is watching knows that you know they are.')]),
      d('away', 'Don’t look', 'At anything but the mirror.', [p('You don’t look at the mirror. You look at the window, at the lights on the river, at anything else.')]),
    ];
  }
  return [
    offer('o13-door-on', a === 'refused' ? 'Turn the phone over' : 'Let him walk you to a taxi', a === 'refused' ? 'Say nothing at all.' : 'It is done.', 'hours', (x) => {
      if (a === 'turn') {
        setKey(x, 'act3.ally.marsh', 'in');
        note(x, 'o-marsh', 'Owen Marsh, deputy director of enforcement at the Markets Authority, knows that Meridian tried to own him through Evelynn in suite 1109. The footage shows a staged scene. He is an ally.', 'Owen Marsh, suite 1109, the Claremont');
        note(x, 'o-evening-consent', 'Evelynn and Owen Marsh agreed to stage a scene for the camera, both clothed and both in on it; either could stop at any time.', 'Evelynn’s stated choice and his explicit agreement');
      }
      return a === 'refused' ? [p('You turn the phone over and sit with your back against the wall until the clock says midnight, and then one, and nobody comes.')] : [];
    }),
  ];
}

// ── Two in the morning ──

function hoursBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p('The car home. A driver who does not look at you.'),
      p('The shower, as hot as it goes, for as long as it takes, which is a long time. You do not look at the drawer.'),
      p('The black phone, on the edge of the bath.'),
      q('C.', 'Lovely. You see how easy it is.'),
    ];
  if (a === 'refused') return [p('Two in the morning. The room over the water, the wall, the black phone face down, the cheap phone beside it. Nothing has happened to you. That is how it works: they do not need to do anything to you. They will do it to a man on a river, and let you hear about it.')];
  return [p('Marsh walks you down the back stairs at two and puts you in a taxi, and leans in the window.'), q('Owen Marsh', 'Friday. Nine. My office. Bring what you have. And Ms Vale: thank you. Nobody has ever warned me about anything.')];
}

function hoursChoices(s: GameState): C13Choice[] {
  const a = answer(s);
  if (a !== 'complied') return [offer('o13-hours-on', 'Morning', 'Saturday.', 'morrow')];
  const r = (id: 'maya' | 'wall' | 'phone' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('o13-recover-' + id, label, hint, 'morrow', (x) => {
      set13(x, 'o-recover', id);
      return body;
    });
  return [
    ...(key(s, 'c6.maya') === 'restored'
      ? [r('maya', 'Ring Maya', 'She said: on the other end of a phone, all night.', [
          p('You ring the number. She is there in twenty minutes, in a coat over her pyjamas, with a flask, and does not ask one question. She sits on the end of the bed with her feet up, and after a while takes your hand, and holds it, and that is all it is. At four you fall asleep with it still in yours.'),
        ])]
      : []),
    r('wall', 'The wall', 'Pencil. Four words.', [p('You go to the wall, with the lamp on, and take the pencil, and under the date write, in capitals, four words, and look at them for a long time: DONE TO ME. NOT BY ME.')]),
    r('phone', 'The 02:40 phone', 'It rings. You let it.', [
      p('At 02:40 the cheap phone rings, as it always does, and you pick it up and say nothing at all. He says nothing either, for a moment.'),
      q(SENDER, 'You don’t have to say anything. I’ll read you the shipping forecast. It’s all I know that doesn’t hurt.'),
      p('He reads it, for an hour, in his flat shaved voice: Dogger, Fisher, German Bight; south-westerly, five to seven, occasionally gale eight later; rain then showers; moderate or good. He does not ask what happened. You do not say. At three you are lying on the bed with the phone on the pillow beside you, and somewhere in Viking he stops, and you can hear him breathing, and neither of you hangs up.'),
    ]),
    r('alone', 'Alone', 'The phones face down.', [p('You sit up on the bed with the lamp off and both phones face down on the table across the room, and the river going by outside, and nobody to answer to, and you let the dark be what it is.')]),
  ];
}

// ── Saturday ──

function morrowBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p('Saturday. The black phone.'),
      q('C.', 'He was so very easy to like, wasn’t he. I do hope you didn’t. I’ve called off my dogs, darling, for now. A man with a coffee in Wapping may drink it in peace.'),
      p('Marsh’s inquiry, you read in Monday’s paper, has been “restructured”. A new team. A new lead. A statement of full confidence in the process. You are not told what was done with the footage. You are told, in the way she tells you everything, that it exists.'),
    ];
  if (a === 'refused')
    return [
      p('On Friday morning nothing happens. On Saturday at 02:40 the cheap phone rings from a number you do not know, and it is him, not flat, not shaved, out of breath.'),
      q(SENDER, 'They found the lodging. Two men with a clipboard and a letter from a shipping line, at seven on Friday. I wasn’t there. I was in a launderette on the other side of the river, at the dryers, reading a paper. I’m out. I’m alive. Don’t ring this number. I’ll find you.'),
      p('The line goes dead. You sit with it in your hand for a long time. You said no, and it cost a man a flat and a year’s pages, and you would say it again, and that is two true things that can sit in the same room.'),
      q('C.', 'That was a small one, darling. I wonder what the next one is.'),
    ];
  return [
    p('Friday, nine o’clock. His office at the Markets Authority is a small room with a view of a car park and a photograph of his daughter. You put ' + (proof(s) ?? 'what you have') + ' on his desk. He reads it twice.'),
    q('Owen Marsh', 'I have spent two years being told there was nothing to find. Thank you for being something to find.'),
    ...(key(s, 'out.ledger13')
      ? [q('Owen Marsh', 'This ledger. It’s in a courier’s hand. Does he know you’ve brought it to me?'), q('You', 'He told me to.'), q('Owen Marsh', 'Then he is a braver man than I am. I’ll keep his name off every page until the day he tells me otherwise.')]
      : []),
    p('Then Saturday, and a black phone, which you do not answer.'),
  ];
}

function sundayChoices(): C13Choice[] {
  const k = (id: 'walk' | 'letter' | 'stove', label: string, hint: string, body: Block[]) =>
    offer('o13-sunday-' + id, label, hint, 'morrow', (x) => {
      set13(x, 'o-sunday', id);
      return body;
    });
  return [
    k('walk', 'Walk to the end of the river', 'As far as the road goes.', [p('On Sunday you walk. You go along the river as far as the road goes, past the old ferry terminal and the last of the chandlers, to a place where the pavement gives out and there is only a wall and a view of the estuary and a man with a dog who nods and does not say anything. You stand there for an hour. Then you walk back.')]),
    k('letter', 'Write Maya a letter, and keep it', 'Everything. Not sent.', [p('You write Maya a letter on three sheets of the pad by the window, everything, in order, plainly, without one adjective, and read it through once, and fold it, and put it in the drawer with the notes. You do not send it. It is enough, tonight, to know that it exists and that it is true and that it is hers when you can bear it.')]),
    k('stove', 'Light the stove', 'Burn the ribbon from the Vesper’s box.', [p('You light the stove, though it is not cold, and burn the white ribbon from the Vesper’s box a loop at a time, and the dried orchid, if you kept it, and then the room is warm and smells of smoke and wax, and you sit in front of it for as long as it lasts, with the window open an inch for the river.')]),
  ];
}

function morrowChoices(s: GameState): C13Choice[] {
  if (!get13(s, 'o-sunday')) return sundayChoices();
  return [offer('o13-morrow-on', 'The wall', 'The card.', 'complete')];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    p('The wall over the table. A new card, beside UNCLAIMED, in capitals.'),
    q('The card', 'THE CLAREMONT. 1109.'),
    q('The card', a === 'complied' ? 'DONE.' : a === 'refused' ? 'REFUSED. THEY FOUND HIS LODGING.' : 'STAGED. MARSH IS OURS.'),
    ...(a === 'complied' && get13(s, 'o-recover') === 'wall' ? [p('And under it, in pencil: DONE TO ME. NOT BY ME.')] : []),
    ...(key(s, 'out.ledger13') ? [p('And in the corner, smaller: HIS LEDGER. HIS HAND. MARSH KEEPS HIS NAME.')] : []),
    t(a === 'complied' ? 'It cost what it cost, and I am still standing in the room, and so is he. It is only paper, she said. It was never only paper.' : a === 'refused' ? 'I kept the one thing that is mine, and a man is in a launderette on the other side of the river because of it. I will carry both.' : 'She wanted to own him, and I handed him a way out and called it a date. For once the camera was the one being lied to.'),
  ];
}

export function outsideBlocks13(s: GameState): Block[] {
  if (s.phase === 'terms') return termsBlocks(s);
  if (s.phase === 'watch') return watchBlocks();
  if (s.phase === 'dusk') return duskBlocks();
  if (s.phase === 'door') return doorBlocks(s);
  if (s.phase === 'hours') return hoursBlocks(s);
  if (s.phase === 'morrow') return morrowBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices13(s: GameState): C13Choice[] {
  if (s.phase === 'terms') return termsChoices(s);
  if (s.phase === 'watch') return watchChoices(s);
  if (s.phase === 'dusk') return duskChoices(s);
  if (s.phase === 'door') return doorChoices(s);
  if (s.phase === 'hours') return hoursChoices(s);
  if (s.phase === 'morrow') return morrowChoices(s);
  return [];
}
