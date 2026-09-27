/** Chapter 13 (Predator route, lane id `predator`) · The Mirror:
 * reading → delphine → midnight → monitor → late → friday → ledger (its own end; the Celebrity `complete` is 'A Knock').
 * Design: docs/story/PREDATOR_CHAPTER_13_THE_MIRROR_DESIGN.md (owner-approved 2026-09-27, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_13_SCRIPT.md. The Predator road's one sexual-coercion beat,
 * kept to docs/story/CONTENT_DIRECTION.md §2–§5: Meridian asks the client's new favourite to *run* a placement (Owen
 * Marsh, for Halvorsen, suite 1109). The placed woman is "Delphine" (Ana), 29, an adult Meridian legend leveraged as
 * Evelynn was. Comply runs it by the book: there is no option to pressure Delphine, and the feed is cut at the door;
 * nothing behind it is shown or described, then or later. Refuse costs Evelynn's standing, non-sexually. Counter turns
 * Marsh or frees Delphine, each spending something she built. The comply lead-in can be faded by the reader
 * (fadeCoercion13 recognises it by P_COMPLY_OPENING13). Entry: from the Predator `chapter12.ledger` (The Counterparty),
 * with a short bridge ("The winter"); the temporary entry from Chapter 9 moved to Chapter 12 on 2026-09-27. Local helpers mirror chapter13.ts (c13.* keys,
 * chapter13.* ids) to avoid a circular import.
 * Deepening pass (2026-09-27): the week between Delphine and midnight (c13.p-week = marcus | julian | maya | alone:
 * Marcus knows, and says "do it well, or don't do it", because Celeste is testing her for his desk; Julian, the one
 * person who tells her no; Maya, the voice she does not call); Delphine and each road's Thursday at greater length;
 * and, after the comply night, a recovery step (her real name in a sealed envelope, for the day it can be used). */
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

export const PREDATOR_PHASES13 = ['reading', 'delphine', 'midnight', 'monitor', 'late', 'friday', 'ledger'] as const;
export const isPredator13 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase13 = (s: GameState) => isPredator13(s) && (PREDATOR_PHASES13 as readonly string[]).includes(s.phase);
const mirror = (s: GameState) => get13(s, 'p-mirror') as 'complied' | 'refused' | 'turned' | 'freed' | undefined;
const cash = (s: GameState) => Number(key(s, 'own.cash') ?? 0);
/** Chapter 11's counter was the first time Celeste was surprised; without it, this is the first. */
const tally13 = (s: GameState) => (key(s, 'pred.celeste-count') ? 'Twice now, darling. I have started keeping count too.' : 'Once now, darling. I have started keeping count.');
/** What she has built that a counter can spend (design §4). */
export function counterSpend13(s: GameState): string | undefined {
  if (key(s, 'pred.hollis') === 'owned') return 'hollis';
  if (key(s, 'pred.lever8.counsel') === 'spare') return 'counsel';
  if (['use', 'hold'].includes(key(s, 'pred.lever8.archive') ?? '')) return 'archive';
  if (key(s, 'pred.clause.exit')) return 'exit';
  return undefined;
}

// ── Player comfort ──

export const P_CONTENT_NOTICE13 = 'Content notice: sexual coercion (implied, never shown), blackmail, and their aftermath. You can shorten the coercion scenes in Settings: “Fade coercion scenes”.';
/** The first line of the Predator comply lead-in: fadeCoercion13 recognises the entry by it. */
export const P_COMPLY_OPENING13 = 'The monitor room is a cupboard behind the mirror of 1109, and it smells of warm electronics and somebody else’s aftershave.';
export const P_DOOR13 = 'On the corridor screen, two figures walk toward the door of 1109.';
export const P_FADED_LEAD13 = 'Faded, at your request: she sits behind the mirror through the evening and watches the bar, the lift and the corridor on the screens.';
export function fadePredator13(blocks: Block[]): Block[] {
  if (blocks[0]?.text !== P_COMPLY_OPENING13) return blocks;
  const door = blocks.findIndex((b) => b.text.startsWith(P_DOOR13));
  return [{ kind: 'notice', text: P_FADED_LEAD13 }, ...(door >= 0 ? blocks.slice(door) : [])];
}

// ── The bridge, and the reading room ──

export function beginPredator13(): C13Choice {
  return offer('begin-predator', 'The winter', 'Celeste asks for you. ' + P_CONTENT_NOTICE13.replace('. You can shorten', '. Shorten').replace(' in Settings: “Fade coercion scenes”', ' in Settings'), 'reading', () => [
    p('The winter comes in hard and grey over the river. Helix grows. So do you: a bigger office, a longer title, a name the floor lowers its voice for, and a fund on cream paper that has started, very politely, to ask for you by name.'),
    p('In the first week of February, a card arrives at the thirty-sixth floor, in a looping green hand. The Vesper. Eleven o’clock. The reading room. It is not an invitation. It is the first time she has ever written to you directly.'),
  ]);
}

function readingBlocks(s: GameState): Block[] {
  return [
    p('The reading room at the Vesper smells of beeswax and old paper. The curtains are open on the river. On the lectern under the one lamp, the green leather catalogue is open, and Celeste Laurent is standing beside it in green, with her reading glasses on a chain, as if she had been waiting for you for years and had not minded.'),
    q('Celeste', 'Darling. Marcus tells me you are the best thing that has ever happened to his floor. He is frightened of you. It is the first interesting thing he has been in a decade.'),
    p('She turns the catalogue toward you. A new page. A woman of twenty-nine with dark hair cut very short and a mouth that has learned not to move: D. · Eighteen months · Available.'),
    q('Celeste', 'Mr Halvorsen has a problem. His name is Owen Marsh, and he is the only man in London who has read all of the inquiry into Mr Halvorsen’s fund. Thursday, the Claremont, the eleventh floor. The room is 1109. There is a mirror.'),
    q('Celeste', 'I would like you to run it. Book the room, brief the girl, sit behind the glass. You do not have to do anything you would not do for Marcus on a Tuesday. I thought the new one might like to learn how it is done.'),
    t(
      key(s, 'pred.iris') === 'kept'
        ? 'The new one. She said that to me on the terrace at the Vesper, the night she tried to end Iris. She is saying it to me across a catalogue, with a woman’s face on the page between us, and she is smiling.'
        : 'The new one. She said that about Iris, the night she ended her. She is saying it to me across a catalogue, with a woman’s face on the page between us, and she is smiling.',
    ),
  ];
}

function readingChoices(): C13Choice[] {
  const r = (id: string, label: string, hint: string, body: Block[]) =>
    offer('reading-' + id, label, hint, 'delphine', (x) => {
      set13(x, 'p-reading', id);
      return body;
    });
  return [
    r('ask', 'Ask her why you', 'Of everybody she could have asked.', [
      q('You', 'Why me?'),
      q('Celeste', 'Because you have been on the other side of that mirror, darling. Not literally. Not yet. But in every other way. The ones who have stood where the girl is standing are always the best at running it. They know exactly where to put the lamps.'),
    ]),
    r('page', 'Look at the woman on the page', 'Longer than Celeste would like.', [
      p('You look at the page for a long time: the short dark hair, the mouth that does not move, the eyes that have been told where to look by a photographer and have gone, instead, very slightly to the left of the lens.'),
      t('She is looking at the door. Even in the photograph. I know that look. I wore it for a month.'),
    ]),
    r('silent', 'Close the catalogue', 'Say nothing yet.', [p('You close the catalogue, gently, on the woman’s face, and say nothing. Celeste smiles, as if that were an answer, and gives you the file.')]),
  ];
}

// ── Delphine ──

function delphineBlocks(): Block[] {
  return [
    p('Meridian keeps a flat for her in a mansion block behind the station: two rooms, beige, a sofa nobody chose, a kettle that works. She opens the door before you knock. In person she is smaller than the photograph and much more tired, in a grey jumper with the sleeves pulled over her hands, twenty-nine, eighteen months into somebody else’s name.'),
    q('Delphine', 'You’re the new one. They said you’d come. Do you want tea? I make very good tea. It’s the only thing in this flat that’s mine.'),
    p('The flat has one personal thing in it that you can see: a postcard of a hospital in Leeds, stuck to the fridge with a magnet shaped like a lemon. She sees you see it, and does not take it down.'),
    p('She makes it, and it is very good, and you sit at a table in a room that belongs to nobody, and look at each other like two people at a funeral who have realised they are wearing the same dress.'),
  ];
}

/** The week (deepening pass): between Delphine and midnight. */
function weekChoices(s: GameState): C13Choice[] {
  const w = (id: string, label: string, hint: string, body: Block[]) =>
    offer('week-' + id, label, hint, 'midnight', (x) => {
      set13(x, 'p-week', id);
      return body;
    });
  return [
    w('marcus', 'Let Marcus find you', 'He will know already. He always knows.', [
      p('On Tuesday Marcus stops at your door on his way past and, for once, comes in, and shuts it, and sits on the edge of your desk with his hands in his pockets.'),
      q('Marcus Chen', 'She’s asked you to run one. Don’t look surprised; she asked me once, eleven years ago. I did it. I have a very good chair because I did it.'),
      q('Marcus Chen', 'She isn’t testing whether you can. She knows you can. She’s testing whether you’re the kind who does. Because that’s the kind she gives my desk to, when she’s finished with me.'),
      p('He gets up, and at the door he says, without turning round:'),
      q('Marcus Chen', 'Do it well, or don’t do it. The ones who do it badly are the ones she keeps.'),
      t('He has just told me she is going to replace him with me. He has told me how. And he has told me he was in my chair once, eleven years ago, and said yes.'),
    ]),
    ...(key(s, 'pred.julian') === 'ally' || key(s, 'pred.julian8') === 'take'
      ? [
          w('julian', 'Tell Julian', 'The one person who will tell you no.', [
            p('You tell Julian on Wednesday, at a table at the back of a restaurant he chose because nobody from Helix eats there, not all of it, enough.'),
            p('He listens without interrupting, and when you have finished he takes his glasses off, and puts them on the table between you, and looks at you with nothing between you at all.'),
            q('Julian Mercer', 'No. That’s my advice, and it’s the only advice I have. No. You came here to take a company, not to become the thing that owns it. Don’t.'),
            t('The one person in London who will tell me no without wanting something for it. I did not know how much I needed to hear it said out loud.'),
          ]),
        ]
      : []),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          w('maya', 'Nearly call Maya', 'The voice you do not call.', [
            p('On Wednesday night you type Maya’s name into the phone and look at it for eleven minutes. You write: Can I ask you something, and it’s about a job. You write: If you knew somebody was going to be hurt and you could stop it by losing something. You delete both.'),
            p('You write: Thinking of you. She answers inside a minute: a photograph of her cat asleep on a spreadsheet. You look at it for a long time.'),
            t('I cannot ask her. If I ask her, she will tell me, and then I will have to be the person she thinks I am.'),
          ]),
        ]
      : []),
    w('alone', 'Keep it to yourself', 'The week goes by.', [
      p('The week goes by. You keep it to yourself, the way Adrian kept everything, and go to work, and come home, and look at the file every night until you could draw the floor plan of the eleventh floor of the Claremont from memory.'),
    ]),
  ];
}

function delphineChoices(): C13Choice[] {
  const d = (id: string, label: string, hint: string, body: Block[]) =>
    offer('delphine-' + id, label, hint, 'delphine', (x) => {
      set13(x, 'p-delphine', id);
      return body;
    });
  return [
    d('name', 'Ask her real name', 'The one under the legend.', [
      q('You', 'What’s your name? Your real one.'),
      p('She looks at you for a very long time over the cup.'),
      q('Delphine', 'Ana. Nobody’s asked in a year and a half. They have my mother’s house. It was in my name. It isn’t now. If I do what they want for another eighteen months, it goes back into hers.'),
      t('Ana. I will not write it on the page. I will write it somewhere else.'),
    ]),
    d('want', 'Ask her whether she wants to do it', 'You already know. Ask anyway.', [
      q('You', 'Do you want to do this?'),
      q('Delphine', 'Nobody has asked me that. Ever. Not once.'),
      p('She puts the cup down very carefully, as if it might go off.'),
      q('Delphine', 'No. But I will. That’s the whole job, isn’t it? No, but I will. You know. You’ve got the look.'),
    ]),
    d('work', 'Keep it professional', 'The file, the times, the room.', [
      p('You keep it to the file: the bar, the times, the man. She listens the way a professional listens, and asks the right questions, and at the door, when you are leaving, she says “Thank you for not pretending,” and shuts it before you can answer.'),
    ]),
  ];
}

// ── Midnight: the answer ──

function midnightBlocks(): Block[] {
  return [
    p('Wednesday, a minute to midnight. The kitchen table, the black phone, the file, and the ledger on the wardrobe door behind you with a space on it you have not decided how to fill.'),
    p('The phone lights.'),
    q('C.', 'Thursday, darling? The girl is ready. Mr Halvorsen is so looking forward to Friday.'),
    t('Book the room. Brief the girl. Sit behind the glass. Everything I have learned to do on that floor, pointed at a man with a bicycle and a woman with somebody else’s name. And if I say no, Marcus falls with me, and Celeste finds somebody who says yes.'),
  ];
}

function midnightChoices(s: GameState): C13Choice[] {
  const spend = counterSpend13(s);
  const a = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('mirror-' + id, label, hint, 'monitor', (x) => {
      set13(x, 'p-mirror', value);
      setKey(x, 'pred.mirror', value);
      after?.(x);
      return body;
    });
  return [
    a('comply', 'Type “Thursday.”', 'Run it by the book. You will not lean on her. You will not have to.', 'complied', [q('You · to C.', 'Thursday.'), q('C.', 'Lovely. I knew you would.')], (x) => {
      setKey(x, 'pred.delphine', 'placed');
      setKey(x, 'pred.standing', 'risen');
    }),
    a('refuse', 'Type “No.”', 'Not this. Your standing pays, and somebody else runs it.', 'refused', [q('You · to C.', 'No. Not this. Find somebody else.'), q('C.', 'Pity. I did so hope.')], (x) => {
      setKey(x, 'pred.standing', 'fallen');
      setKey(x, 'pred.delphine', 'placed-by-another');
    }),
    ...(spend
      ? [
          a('turn', 'Type “Thursday,” and mean Marsh', 'Tell him the truth at the bar. Leave the camera an empty room.', 'turned', [q('You · to C.', 'Thursday.'), q('C.', 'Lovely. I knew you would.'), t('She will get a Thursday. She will get an empty room on it.')], (x) => {
            setKey(x, 'pred.spent', spend);
            setKey(x, 'pred.delphine', 'spared');
            setKey(x, 'pred.ally.marsh', 'in');
          }),
          a('free', 'Type “Thursday,” and mean Ana', 'Get her out before it starts. It will cost you.', 'freed', [q('You · to C.', 'Thursday.'), q('C.', 'Lovely. I knew you would.'), t('And on Thursday at twenty to ten, the girl will be on a train.')], (x) => {
            const paid = Math.min(cash(x), 1500);
            setKey(x, 'own.cash', String(cash(x) - paid));
            setKey(x, 'pred.spent', 'money-' + paid);
            setKey(x, 'pred.delphine', 'free');
          }),
        ]
      : []),
  ];
}

// ── Thursday ──

function monitorBlocks(s: GameState): Block[] {
  const m = mirror(s);
  if (m === 'complied')
    return [
      p(P_COMPLY_OPENING13),
      p('Four screens: the bar, the lift, the corridor, and the room itself, lit low, the lamps exactly where you told the housekeeper to put them. A chair. A switch on the desk under a plastic cover, marked FEED. A headset you do not put on.'),
      p('At nine Owen Marsh comes into the bar with his cycling clips in his jacket pocket and a paperback he will not read, and sits on the end stool, and orders his one whisky. At ten past, Delphine sits two stools along, in the dress you chose for her from the rail at the flat because it was the one she hated least.'),
      p('The room behind the glass is lit for the camera, and you lit it. You told the housekeeper where the lamps should go on Tuesday, and she did exactly what you said, and did not ask why, and you did not tell her.'),
      p('She is very good. You watch her be very good for two hours, on a screen, with the sound off, and find that you are counting, the way Adrian counted floors in a lift when he was frightened.'),
      p('At a quarter past eleven, on the lift screen, two people stand side by side and watch the numbers. On the eleventh floor the doors open.'),
      p(P_DOOR13),
    ];
  if (m === 'refused')
    return [
      p('Thursday night you are at home, not at the Claremont. Somebody else is in the cupboard behind the mirror tonight: a man Meridian keeps for this, who has never once asked a woman her name.'),
      p('At nine you know Marsh will be sitting down at the end of the bar with his one whisky. At ten past, somebody will sit two stools along. You look at the clock on the cooker every few minutes and hate it for being accurate.'),
      p('You sit on the kitchen floor with your back against the cupboards and the black phone face down beside you, and think about a man with a bicycle and a woman with a very good cup of tea, and do nothing, because you chose to do nothing, and it is the hardest thing you have done since the clinic.'),
    ];
  if (m === 'turned')
    return [
      p('The bar at nine. The end stool. The whisky, the paperback, the cycling clips. You sit down beside him, not two stools along, and put your phone face down on the bar between you.'),
      q('You', 'Mr Marsh. My name is Evelynn Vale. I work for Helix, and tonight I also work for a fund that would like you to go up to room 1109 with a woman who has been told to take you there, because there is a camera behind the mirror and Mr Halvorsen would like to own you by Monday. I would rather he didn’t.'),
      p('He looks at you for a long time. He does not reach for his coat.'),
      q('Owen Marsh', 'Why are you telling me?'),
      q('You', 'Because I was asked to run it, and I find I don’t want to be the kind of person who does.'),
      p('He does not ask whether you are lying. He asks for the room number, and the name of the client, and the date the inquiry opened, and writes nothing down, the way good investigators never do in front of the person they are talking to.'),
      q('Owen Marsh', 'Then we give them nothing. Not a staged anything. Nothing at all. I have a daughter who would never forgive me for being on anybody’s tape, even a fake one.'),
      p('At eleven, as agreed, he finishes his whisky and puts on his cycling clips and leaves by the front door, alone, in full view of every camera in the lobby. Upstairs, Delphine lets herself into 1109, alone, and takes her shoes off, and lies down on top of the covers, and sleeps. On the monitor all night there is only a woman asleep in a lamp-lit room.'),
    ];
  return [
    p('Thursday at twenty past nine you are on the platform at the station behind the mansion block, in your coat, with an envelope. Ana comes down the steps with one bag and her own coat, not Delphine’s, and her hair under a hat.'),
    p('She is early, and so are you, and for ten minutes you stand side by side on the platform like two women waiting for the same late train, not talking, watching the board.'),
    p('In the envelope: a ticket to a coast town nobody can place, a room in a guest house under a name that is neither of hers, and what the fund paid you to sign in the first place, in notes.'),
    q('Ana', 'They’ll know it was you.'),
    q('You', 'They’ll suspect it was me. That isn’t the same thing, in my line of work.'),
  ];
}

function monitorChoices(s: GameState): C13Choice[] {
  const m = mirror(s);
  const go = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer(id, label, hint, 'late', (x) => {
      set13(x, 'p-thursday', id);
      after?.(x);
      return body;
    });
  if (m === 'complied')
    return [
      go('feed-cut', 'Cut the feed yourself', 'Your hand on the switch, at the door.', [
        p('You lift the plastic cover and press the switch, and all four screens go black at once, and the cupboard is completely dark except for the small red light on the recorder, which is not yours to turn off.'),
        t('I cut it. I will tell myself that for the rest of my life. It is true, and it is not enough.'),
      ]),
      go('feed-rule', 'Let Celeste’s rule cut it', 'The recorder goes on. The screens go dark at the door by her own instruction.', [
        p('At the door the screens go black by themselves, on a timer Celeste set, because Celeste, it turns out, does not like to watch either. The recorder goes on recording, somewhere, for somebody.'),
      ]),
    ];
  if (m === 'refused') return [go('night-wait', 'Wait for the morning', 'There is nothing else to do.', [p('You wait for the morning. It comes, eventually, the way mornings do, grey and indifferent and on time.')])];
  if (m === 'turned')
    return [
      go('turn-watch', 'Go up and look at the monitor', 'See what the camera got for its money.', [
        p('At two in the morning you let yourself into the cupboard behind the mirror with the housekeeper’s key and look at the screen: a woman asleep on top of the covers, one arm over her eyes, alone, safe, for six hours on Meridian’s own tape.'),
        t('That is what their camera got tonight. That, and nothing else.'),
      ]),
      go('turn-leave', 'Go home', 'Let the camera have its empty room.', [p('You go home. The camera can have its empty room.')]),
    ];
  return [
    go('free-name', 'Ask her to say her name out loud', 'Once, before the train.', [
      q('Ana', 'Ana Petrovic. From Leeds, of all places. I was a nurse.'),
      p('The doors beep. She gets on. At the window she presses her hand flat on the glass, once, the way children do, and then the train takes her away along the river.'),
    ]),
    go('free-go', 'Just put her on the train', 'No names. No speeches.', [p('You put her on the train. No names, no speeches. At the window she lifts her hand, and then the train takes her away along the river, and you stand on the platform until its lights have gone.')]),
  ];
}

// ── Two in the morning ──

function lateBlocks(s: GameState): Block[] {
  const m = mirror(s);
  if (m === 'complied')
    return [
      p('At two you let yourself out of the cupboard by the service stairs, and walk home, all of it, in the dark, because you cannot be in a car.'),
      p('At home you do not turn the lamp on. You stand in the hall with your back against the door for a length of time you do not measure. Then you take a card from the drawer, and a pin.'),
      t('I did not touch her. I did not lean on her. I did not have to. That is the thing I will not be able to put down: that I did not have to.'),
    ];
  if (m === 'refused') return [p('At two you are still on the kitchen floor. At three you get up and make tea you do not drink. Somewhere across the river the man Meridian keeps for this is going home to bed, and you will never know his name either.')];
  if (m === 'turned') return [p('At two you are home, and awake, and laughing, a little, alone in the kitchen, in the way you laugh when you have just done something very dangerous and got away with it for one more night.')];
  return [p('At two you are home, and the envelope is gone, and so is most of your bank balance, and you sit at the kitchen table with a glass of wine and feel lighter than you have since the car came for you in the autumn.')];
}

function lateChoices(s: GameState): C13Choice[] {
  const m = mirror(s);
  const l = (id: string, label: string, hint: string, body: Block[]) =>
    offer('late-' + id, label, hint, 'friday', (x) => {
      set13(x, 'p-late', id);
      return body;
    });
  if (m !== 'complied') return [l('on', 'Go to bed', 'Friday is coming.', [p('You go to bed, eventually, and sleep, eventually.')])];
  return [
    l('card', 'Write her on the ledger', 'Her name. Both of them. And what you did.', [
      p('You write it in capitals, pressing hard enough to dent the card beneath, and pin it to the wardrobe door, and it goes up above Marcus, above everything, above the fund:'),
      q('The card', 'DELPHINE (ANA). THURSDAY. 1109. I SENT HER.'),
      t('She kept a ledger of me, Celeste. Now I have a card on mine that I wrote about myself.'),
    ]),
    ...(key(s, 'pred.julian') === 'ally' || key(s, 'pred.julian8') === 'take'
      ? [
          l('julian', 'Go to Julian and ask him only to hold you', 'Nothing else. He will know not to ask.', [
            p('You go to Julian at three. He opens the door in a jumper, awake, and looks at your face once, and steps back to let you in. You ask him only to hold you. He does: on top of the covers, in his clothes, until it is light, and he does not ask anything at all.'),
          ]),
        ]
      : []),
    l('dark', 'Sit in the dark until it is light', 'Just get to the morning.', [p('You sit on the kitchen floor in the dark until the window goes grey, and then blue, and it is morning, and you are still here, and so, you have to believe, is she.')]),
  ];
}

// ── Friday ──

function fridayBlocks(s: GameState): Block[] {
  const m = mirror(s);
  return [
    p('Friday comes up bright, which feels like an insult.'),
    p('The black phone lights at eight.'),
    ...(m === 'complied'
      ? [
          q('C.', 'Beautifully run, darling. Mr Halvorsen is delighted. Mr Marsh’s inquiry will be quietly closed by Monday. You have a gift.'),
          p('At eleven the girl’s page in the green catalogue has a new line under it, you are told, in the same plain type: Available.'),
          p('At noon you do the only thing you can think of that is not nothing. You write her real name on a card, the one she gave you or the one you will find, and the date, and the room, and Halvorsen’s name, and Celeste’s, and put the card in an envelope, and seal it, and write on the front: FOR THE DAY IT CAN BE USED. It goes into the lining of Adrian’s old jacket, with everything else that matters.'),
          t('It is not a recovery. It is a receipt. One day I am going to hand it back to her with interest.'),
        ]
      : m === 'refused'
        ? [q('C.', 'It went perfectly well without you, darling. I thought you should know. Marcus has been told why the Stuttgart deal is going to somebody else.'), p('At noon the chair of the board’s audit committee asks for your calendar again, and this time Marcus does not stop him.')]
        : m === 'turned'
          ? [q('C.', 'Six hours of a girl asleep. Six hours. Mr Halvorsen is not delighted.'), q('C.', tally13(s)), p('At eleven a message on your private phone, from a number you do not have: “Thank you. When you need the Markets Authority, ring me. — O.M.”')]
          : [q('C.', 'The girl has gone missing. So careless of somebody. I don’t suppose you would know anything about it.'), q('C.', tally13(s))]),
    t(
      m === 'complied'
        ? 'Available. They will place her again. They will ask me to run it again. And I will have to decide again, and I know now how easy the first time was.'
        : m === 'refused'
          ? 'It cost me Stuttgart and the audit committee. It cost Marsh and Ana everything, and I only kept my hands clean. That is not nothing. It is not enough.'
          : 'Celeste is afraid of me. I did it with her own camera and her own money. I would like to be there when she works out how much of the rest of it I have.',
    ),
  ];
}

// ── The ledger ──

function completeBlocks(s: GameState): Block[] {
  const m = mirror(s);
  return [
    p('The wardrobe door, late. The ledger has a new card at the very top, above Marcus and above the fund, in your own hand.'),
    q(
      'The card',
      m === 'complied'
        ? 'DELPHINE (ANA). I SENT HER.'
        : m === 'refused'
          ? 'DELPHINE. SOMEBODY ELSE SENT HER. I LET THEM.'
          : m === 'turned'
            ? 'DELPHINE. ASLEEP. MARSH, ALLY.'
            : 'ANA. ON A TRAIN.',
    ),
    t('Marcus next. He is the one I came for. But I know now what the machine above him is for, and what it makes of the people who run it, and I am going to have to decide what I am going to be when I have his desk.'),
  ];
}

export function predatorBlocks13(s: GameState): Block[] {
  if (s.phase === 'reading') return readingBlocks(s);
  if (s.phase === 'delphine') return delphineBlocks();
  if (s.phase === 'midnight') return midnightBlocks();
  if (s.phase === 'monitor') return monitorBlocks(s);
  if (s.phase === 'late') return lateBlocks(s);
  if (s.phase === 'friday') return fridayBlocks(s);
  if (s.phase === 'ledger') return completeBlocks(s);
  return [];
}

export function predatorChoices13(s: GameState): C13Choice[] {
  if (s.phase === 'reading') return readingChoices();
  if (s.phase === 'delphine') return get13(s, 'p-delphine') ? weekChoices(s) : delphineChoices();
  if (s.phase === 'midnight') return midnightChoices(s);
  if (s.phase === 'monitor') return monitorChoices(s);
  if (s.phase === 'late') return lateChoices(s);
  if (s.phase === 'friday')
    return [
      offer('friday-end', 'Carry it forward', 'Marcus next.', 'ledger', (x) => {
        note(x, 'p-mirror', `Meridian asked Evelynn to run the placement of “Delphine” (Ana), 29, against Owen Marsh for Halvorsen in 1109. She ${mirror(x) === 'complied' ? 'ran it' : mirror(x) === 'refused' ? 'refused, and another operator ran it' : mirror(x) === 'turned' ? 'turned Marsh; the camera recorded an empty room' : 'put Ana on a train before it began'}.`, 'Evelynn’s own ledger');
        return [];
      }),
    ];
  return [];
}
