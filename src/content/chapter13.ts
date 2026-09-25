/** Chapter 13 (Act III, own-power played as the Celebrity route) · The Honeypot:
 * brief → week → answer → thursday → after → morning → complete.
 * Design: docs/story/CHAPTER_13_THE_HONEYPOT_DESIGN.md (owner-approved 2026-09-25, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_13_THE_HONEYPOT_SCRIPT.md. Gated behind chapter13Playable(), reached from
 * an own-power Chapter 12 ending. The placement date: Meridian places Evelynn for Halvorsen against Owen Marsh, the
 * one regulator investigating his fund, in suite 1109 at the Claremont, with a camera behind the mirror.
 * This is the game's reserved sexual-coercion beat, kept to docs/story/CONTENT_DIRECTION.md §2: the order, the choice,
 * getting ready, the walk and the door closing are on screen; nothing behind the door is shown or described, then or
 * later; the aftermath carries no graphic detail and ends on a recovery step (exploitation / recovery overlay). Refusal
 * lands on the named, non-sexual threat: Maya detained on a fabricated leak charge. Counterplay is earned (turn him and
 * stage it for the camera, both in on it; swap the camera's card with Iris; expose it first). The refuge after
 * compliance is being held, nothing more. The comply lead-in can be faded by the reader (fadeCoercion13, presentation
 * only: it never touches the save).
 * Deepening pass (2026-09-25): Celeste at greater length in the brief (placements, Nell's eleven, "the first time is
 * the only difficult one"); the week becomes two moves either side of Celeste's box (c13.box = keep | return | cut: the
 * dress for Thursday, which the comply path then wears or doesn't; c13.week2 / c13.told2, neutral week-rest); a vigil
 * at the police station on the refusal night (c13.vigil = no | silent: "It isn't too late. The car's outside."); the
 * counterplay ops at greater length; and Friday. The comply lead-in is not lengthened. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { get11, eveningPartners11 } from './chapter11';
import { get12 } from './chapter12';

export type C13Scene = { title: string; place: string; blocks: Block[] };
export type C13Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get13 = (s: GameState, k: string) => s.choices['c13.' + k];
export const set13 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c13.' + k] = v;
};
const offer13 = (id: string, label: string, hint: string, next: string, apply?: C13Choice['apply']): C13Choice => ({
  id: 'chapter13.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter13Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER13 === '1';

function note13(s: GameState, key: string, text: string, source: string) {
  if (get13(s, 'rec.' + key) !== undefined) return;
  set13(s, 'rec.' + key, String(s.history.length));
  set13(s, 'event.' + key, String(s.revision));
  set13(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c13.' + key);
  s.knowledge.push('c13.' + key);
}

export const chapter13Definitions: Record<string, C13Scene> = {
  brief: { title: 'The Placement', place: '11:00 · THE VESPER, READING ROOM', blocks: [] },
  week: { title: 'Six Days', place: 'THE WEEK · LONDON', blocks: [] },
  answer: { title: 'The Answer', place: 'WEDNESDAY · MIDNIGHT', blocks: [] },
  thursday: { title: 'The Claremont', place: 'THURSDAY · 21:00', blocks: [] },
  after: { title: 'Afterwards', place: '2 A.M.', blocks: [] },
  morning: { title: 'Friday', place: 'FRIDAY · MORNING', blocks: [] },
  complete: { title: 'A Knock', place: 'EVENING · THE LANDING', blocks: [] },
};
export const chapter13Scenes = Object.entries(chapter13Definitions).map(([phase, scene]) => ({
  id: `chapter13.${phase}` as NodeId,
  ...scene,
}));

// ── Player comfort: the content notice and the fade (CONTENT_DIRECTION §6) ──

export const CONTENT_NOTICE13 =
  'Content notice: this chapter contains sexual coercion (implied, never shown), blackmail, and their aftermath. You can shorten the coercion scenes in Settings: “Fade coercion scenes”.';
/** The first line of the comply lead-in: the fade recognises the entry by it. */
export const COMPLY_OPENING13 = 'You get ready the way you would get ready for a funeral you have been told to enjoy.';
const CORRIDOR13 = 'The corridor on the eleventh floor is long and quiet';
export const FADED_LEAD13 =
  'Faded, at your request: she gets ready, is driven to the Claremont, sits with Owen Marsh at the bar until a quarter past eleven, and takes him up to the eleventh floor.';
/** Presentation only: with the reader's fade on, the comply lead-in (getting ready, the car, the bar, the lift) becomes
 * one line; the corridor, the door and the choice stay. The save and the ledger are never touched. */
export function fadeCoercion13(blocks: Block[]): Block[] {
  if (blocks[0]?.text !== COMPLY_OPENING13) return blocks;
  const door = blocks.findIndex((b) => b.text.startsWith(CORRIDOR13));
  return [{ kind: 'notice', text: FADED_LEAD13 }, ...(door >= 0 ? blocks.slice(door) : [])];
}

// ── What Chapters 6–12 left her ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const famous = (s: GameState) => !!get5(s, 'published');
const pryceKnown = (s: GameState) => !!c(s, 'c8.pryce');
const mayaBack = (s: GameState) => c(s, 'c6.maya') === 'restored';
const irisAlly = (s: GameState) => getKey(s, 'act3.ally.iris') === 'in';
const theoAlly = (s: GameState) => getKey(s, 'act3.ally.theo') === 'in';
const julianAlly = (s: GameState) => getKey(s, 'act3.ally.julian') === 'in';
/** Something to put in front of Marsh so that he believes her. */
const proof13 = (s: GameState) =>
  get12(s, 'statement') === 'recorded' || get11(s, 'catalogue') === 'photo' || c(s, 'case.strength') === 'strong' || get12(s, 'bed') === 'drawer';

/** The ways out she has built by Wednesday (CONTENT_DIRECTION §3b: counterplay needs something she built). */
const told13 = (s: GameState, who: string) => get13(s, 'told') === who || get13(s, 'told2') === who;
const watched13 = (s: GameState) => get13(s, 'week') === 'marsh' || get13(s, 'week2') === 'marsh';
export function counterWays13(s: GameState): ('turn' | 'swap' | 'expose')[] {
  const out: ('turn' | 'swap' | 'expose')[] = [];
  if ((watched13(s) && proof13(s)) || told13(s, 'julian')) out.push('turn');
  if (told13(s, 'iris')) out.push('swap');
  if (told13(s, 'theo') || (watched13(s) && famous(s) && c(s, 'case.strength') === 'strong')) out.push('expose');
  return out;
}

type Partner13 = 'julian' | 'theo' | 'sebastian';
const name13: Record<Partner13, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian' };

/** Scene-specific place lines (display only). */
export function place13(s: GameState): string | undefined {
  if (s.scene !== 'chapter13') return;
  const answer = get13(s, 'answer');
  if (s.phase === 'thursday' && answer === 'refused') return '21:00 · Home, and then the police station';
  if (s.phase === 'after' && answer === 'refused') return '06:00 · Outside the station';
  if (s.phase === 'after' && answer === 'countered') return 'Late · Afterwards';
}

// ── The Placement ──

function briefBlocks(s: GameState): Block[] {
  const singapore = getKey(s, 'act3.singapore');
  const iris = get11(s, 'iris');
  return [
    { kind: 'notice', text: CONTENT_NOTICE13 },
    p('The first Thursday of the month comes up grey and ordinary, with rain that cannot make up its mind, and a card under your door that was not there at midnight: the Vesper’s mark, and in green ink, Eleven o’clock. The reading room. C.'),
    p('The Vesper by daylight is a shop that has closed down. The window is still empty. The long room is dim, the lights over the frames switched off, and without them the frames are only frames, gilt and dust. A cleaner is hoovering under the quartet’s chairs. Nobody offers you champagne.'),
    p('The doorman takes you up by the front stairs, not the service stair, as if to say you are staff now and may use the good ones. The reading room has its blinds down. The Autumn Collection lies open on its lectern under the one lamp, at page seven, and beside it, in a leather chair, Celeste is reading a newspaper. She folds it when you come in, and smiles.'),
    q('Celeste', 'There you are. You look tired, darling. Singapore does that. Sit.'),
    ...(singapore === 'moved-in'
      ? [q('Celeste', 'You looked so at home there. I did hope you would. It makes this so much easier to say.')]
      : singapore === 'everything'
        ? [q('Celeste', 'Nine flats. You counted. I am glad somebody finally has.')]
        : []),
    p('You sit. She pours you coffee from a silver pot, black, and hands it to you, and you realise she has never once asked how you take it.'),
    q('Celeste', 'Today is your first placement. I wanted to tell you myself. Some of us have it done by letter, and I have always thought that unkind.'),
    p('She opens a thin grey folder on her knee and turns it round so that you can read it. Clipped inside the cover is a photograph of a man of about forty-five in a cycling jacket, a helmet under his arm, laughing at somebody out of frame. Tired eyes. A good face that has stopped expecting very much of itself.'),
    q('Celeste', 'Owen Marsh. Deputy director of enforcement at the Markets Authority. Divorced. A daughter at Edinburgh, reading medicine, whom he adores and cannot quite afford. He cycles to work. He has one whisky at the Claremont on Thursdays, at nine, on his own, because it is the one night his flat is too quiet to bear.'),
    q('Celeste', 'He also has an open inquiry into Mr Halvorsen’s fund. It is a very good inquiry. He is the only man in London who has read all of it.'),
    t(
      iris === 'burned'
        ? 'Halvorsen. The shipping man, with the grandchildren and the storm off the Cape. Who lost Iris, because I put a letter in her bag.'
        : iris === 'free'
          ? 'Halvorsen. The shipping man, with the grandchildren and the storm off the Cape. Who lost Iris through his own kitchens.'
          : 'Halvorsen. The shipping man, with the grandchildren and the storm off the Cape. Who still has Iris, because I tore up an envelope.',
    ),
    q(
      'Celeste',
      iris === 'spared'
        ? 'Mr Halvorsen is our client. He still has Iris, which is your doing, and Iris is not quite as useful to him as she was, which is also your doing. He needs a handle on Mr Marsh. You are going to be it.'
        : 'Mr Halvorsen is our client. He has lost a handle, as you know. He needs a new one on Mr Marsh. You are going to be it.',
    ),
    p('She says the next part the way a good doctor tells you what a procedure involves: kindly, clearly, and in order, so that there can be no misunderstanding afterwards.'),
    q('Celeste', 'Thursday next, the Claremont bar, nine o’clock. You will be charming; you cannot help it. He will want to talk to you, and then he will not want you to leave. There is a suite on the eleventh floor, 1109, which is ours. There is a camera behind the mirror. After that he is Mr Halvorsen’s, and so is his inquiry, and he keeps his job, and his daughter keeps her medicine, and nobody is hurt at all.'),
    p('You understand exactly what she is asking. She watches you understand it. She has always liked that part best, you think: not the asking. The understanding.'),
    p('Then she takes a second sheet from the folder and lays it on top of Owen Marsh’s photograph, face up, so that you can read it without touching it.'),
    q('The file', 'AXIOM INTERNAL · COMPLIANCE · M. REYES · Unauthorised disclosure of client data to a member of the press (three occasions). Referred to the police. Evidence attached.'),
    p('It is dated next Friday. The evidence is attached. You recognise the style of it, because Adrian used to write reports exactly like it, for real.'),
    q('Celeste', 'It is only paper, darling. Paper is what you make it. If you would rather I made it into nothing, you know how.'),
    p('She leaves the file where it is, on top of his face, and sits back and crosses her legs, and looks at you the way she looked at the empty frames on the first Thursday: as something she has hung, and is deciding whether she hung straight.'),
    q(
      'Celeste',
      getKey(s, 'act3.nell') === 'known'
        ? 'Everybody in the collection is placed, sooner or later. It is what the collection is for. Iris was placed with Mr Halvorsen for four years. Nell was placed eleven times in eight years, and never once came home without what she went for. She used to say it was the only honest work in the building, because at least everybody in the room wanted something.'
        : 'Everybody in the collection is placed, sooner or later. It is what the collection is for. Iris was placed with Mr Halvorsen for four years. The last one in your page was placed eleven times, and never once came home without what she went for.',
    ),
    ...(getKey(s, 'act3.nell') === 'known'
      ? [t('Nell. She says the name the way you would say the name of a dog you once had. As if she had not rung Nora at seven on a Sunday morning to say she was so terribly sorry.')]
      : []),
    q('Celeste', 'The first time is the only difficult one. After that it is simply work. I promise you, darling. I have watched a great many first times.'),
    t('Watched. She means it exactly. There is a camera behind the mirror, and she has sat in front of the screen.'),
    ...(getKey(s, 'act3.celeste-surprised') === 'twice'
      ? [q('Celeste', 'You have been clever twice. I have given you something you cannot be clever about. Humour me.')]
      : []),
    q('Celeste', 'I shan’t ask you now. Let me know by Wednesday.'),
  ];
}

function briefChoices(): C13Choice[] {
  const leaving = p('On the stairs going down you pass the doorman coming up with a tray: two clean cups, and a single white orchid in a glass.');
  return [
    offer13('brief-ask', 'Ask what happens to him afterwards', 'You want to hear her say it.', 'week', (x) => {
      set13(x, 'brief', 'ask');
      return [
        q('You', 'And afterwards? What happens to him?'),
        q('Celeste', 'Nothing happens to him. That is the beauty of it. He goes on exactly as before, except that every decision he makes, he makes for us. Most of them are grateful in the end. It is very restful, being owned.'),
        p('She looks at you over her cup, fondly.'),
        q('Celeste', 'You should know. You have been owned for months, and you have never looked better.'),
        leaving,
      ];
    }),
    offer13('brief-silent', 'Say nothing, and go', 'Give her nothing. Not even a face.', 'week', (x) => {
      set13(x, 'brief', 'silent');
      return [p('You say nothing. You put the coffee cup down on the lectern, on page seven, where it will leave a ring, and go.'), leaving];
    }),
  ];
}

// ── Six Days ──

function weekBlocks(): Block[] {
  return [
    p('Six days.'),
    p('You pin one card to the wall, above the date, and write on it only a room number: 1109. It is the only thing you write all week. Everything else you do in your head, walking, the way Adrian used to work a problem on the long way home: along the river to the bridges and back, in the rain, until your shoes are ruined and you have to buy new ones, and you do not care which.'),
    p('The city carries on around you with a cheerfulness you find obscene. The campaign posters go up at the station. A girl on the tube asks for a selfie, and you smile for it. Odile rings about a shoot. You say yes to all of it, and hear yourself saying it, from a long way off.'),
    p('On the second day there is a shoot for the campaign, in a white studio in Hackney, and you do it, because it was booked before Thursday existed. You stand in the lights in somebody else’s silk and do everything you are asked, and the photographer keeps stopping to look at the back of his camera, delighted.'),
    q('Photographer', 'Whatever you’re thinking about, keep thinking about it. You look haunted. The lens adores it.'),
    p('Odile rings afterwards, from a taxi.'),
    q('Odile Frayne', 'They’re calling the pictures the best of the year, darling. They say you look like a woman with a secret. I told them you have dozens. Are you eating? You don’t sound as if you’re eating.'),
    p('The black phone is quiet all week. That is how you know she is sure.'),
    t('Six days to decide what I am. She has already decided. She decided the day she hung me on page seven. All I get to choose is whether she was right.'),
  ];
}

/** One preparation move (the first, or the second after the box). Allies set c13.told / c13.told2. */
function weekMoves(s: GameState, second: boolean): C13Choice[] {
  const first = get13(s, 'week');
  const firstTold = get13(s, 'told');
  const move = (id: string, label: string, hint: string, body: Block[]) =>
    offer13('week-' + id, label, hint, second ? 'answer' : 'week', (x) => {
      const ally = ['iris', 'theo', 'julian'].includes(id);
      set13(x, second ? 'week2' : 'week', ally ? 'ally' : id);
      if (ally) set13(x, second ? 'told2' : 'told', id);
      return second ? body : [...body, ...boxArrives];
    });
  const taken = (id: string) => second && (first === id || firstTold === id);
  return [
    ...(taken('marsh')
      ? []
      : [
          move('marsh', 'Find out who he is', 'Watch him. Read him. Know what you would be doing.', [
            p('Early one morning you are across the road from his flat in Kennington, in a coffee shop window, when he comes out with his bicycle, trouser clips on and a banana in his mouth, and has to go back in for his helmet.'),
            p('The next day you sit two tables behind him in a café by the Authority and listen to him make the woman at the till laugh about the weather, and leave her a tip he plainly can’t afford, and read a report with a red pen and a face like a man carrying something heavy up a long stair.'),
            p('That night you read everything the Markets Authority has ever published with his name on it. It is dull, and careful, and decent, and in eleven years he has never once let anybody off.'),
            t('He is the only one doing his job. That is why she wants him. That is the only reason.'),
          ]),
        ]),
    ...(taken('maya')
      ? []
      : [
          move(
            'maya',
            mayaBack(s) ? 'See Maya' : 'Go and look at Maya’s building',
            mayaBack(s) ? 'Dinner at the old place. One true sentence, if you can find one.' : 'You have no right to more than that.',
            mayaBack(s)
              ? [
                  p('Dinner at the Portuguese place near Axiom where you used to go after long audits, a lifetime ago, as somebody else. Maya orders for both of you without asking, and is right.'),
                  q('Maya', 'I’ve got an interview. For head of section. Friday week. Don’t say anything, I’ll jinx it.'),
                  p('You say nothing. You say nothing for two hours, beautifully, and laugh in the right places, and ask the right questions, and there is not one true sentence in any of it, and at the end she looks at you across the table with her chin on her hand.'),
                  q('Maya', 'You’re somewhere else. You’ve been somewhere else all night. You don’t have to tell me. I just want you to know I noticed.'),
                  t('Friday week. The file is dated Friday. She will not get to the interview. Unless I go up to 1109.'),
                ]
              : [
                  p('You stand across the road from Maya’s building at seven in the evening, in the rain, under a tree, the way Meridian’s people stand across the road from yours, and watch her light go on on the third floor.'),
                  p('She comes to the window once, with a mug, and looks out at the rain without seeing you. Then she draws the curtain.'),
                  t('The file is dated Friday. She has no idea there is a file. She has no idea there is a me.'),
                ],
          ),
        ]),
    ...(irisAlly(s) && !taken('iris')
      ? [
          move('iris', 'Tell Iris', 'She knows how placements are run. She has been one.', [
            p('Iris answers the number on the postcard from a phone box, by the sound of it, with the sea behind her.'),
            q('Iris', 'The Claremont. Eleven-oh-nine. Oh, darling. That room.'),
            q('Iris', 'There’s a cupboard behind that mirror, off the service corridor. A camera the size of a paperback, and a card in it. Nobody changes the card more than once a month, because nobody ever thinks anybody will look. I know, because for four years it was my job to collect it.'),
            q('Iris', 'I’m coming up to town on Thursday. Don’t argue. I owe you an ending.'),
          ]),
        ]
      : []),
    ...(theoAlly(s) && !taken('theo')
      ? [
          move('theo', 'Tell Theo', 'He wanted the story. Here is one that could end him, or make him.', [
            p('You tell Theo in the back of a taxi going round Parliament Square three times, because the driver is deaf and the rain is loud.'),
            p('He listens without interrupting, which you have never known him do. When you have finished he is quiet for the whole of the third circuit.'),
            q('Theo Marr', 'A private intelligence firm setting a honey trap for the one regulator investigating its client. With a camera. In a named hotel. I have waited twenty years for somebody to hand me that sentence.'),
            q('Theo Marr', 'I won’t use your name. I’ll need you to tell me I can use everything else.'),
          ]),
        ]
      : []),
    ...(julianAlly(s) && !taken('julian')
      ? [
          move('julian', 'Tell Julian', 'Helix has sat across a table from Marsh. Julian knows him.', [
            p('You tell Julian at his window, with the whole city under you both, and watch his face go very still.'),
            q('Julian Mercer', 'Owen Marsh took Helix apart for eighteen months over a pension scheme and was right about every line. I have hated him professionally for years. He is the only honest man in that building.'),
            q('Julian Mercer', 'He’ll listen to you. Tell him I said so. Tell him I said he was right about the pensions. He’ll know then that it’s serious.'),
          ]),
        ]
      : []),
    ...(second
      ? [
          move('rest', 'Sleep, or try to', 'Three days. Let them go by.', [
            p('You spend the rest of the week trying to sleep, and managing it in the afternoons, in snatches, like somebody on nights, with the curtains drawn against the posters of your own face at the bus stop outside.'),
            p('Once you wake at four in the afternoon with your heart going and no idea what day it is, and lie there counting backwards until you know. Tuesday. Wednesday tomorrow. Then Thursday.'),
          ]),
        ]
      : [
          move('alone', 'Tell nobody', 'Work it out on the wall.', [
            p('You tell nobody. You work it out on the wall, at night, the way you have worked out everything else.'),
            p('Three cards, side by side under 1109. On the first you write what happens if you go up. On the second, what happens to Maya if you don’t. On the third you write nothing at all, and look at it every night, waiting for something to appear on it.'),
            p('Nothing does. On the third night you take the empty card down, and put it in the drawer, and shut the drawer.'),
            t('Two cards. She made sure there would only be two. That is what the six days are for.'),
          ]),
        ]),
  ];
}

/** Midweek: Celeste's box, with the dress for Thursday in it. */
const boxArrives: Block[] = [
  p('In the middle of the week a box comes by courier, with the Vesper’s mark on the lid and a black ribbon round it. Inside, in tissue, is a dress: black, simple, beautifully cut, in your size to the centimetre. And a card, in green ink.'),
  q('The card', 'For Thursday. Something you can forget. C.'),
  t('She has chosen what I will wear to it. Of course she has. She chose what Nell wore to eleven of them.'),
];

function boxChoices(): C13Choice[] {
  const box = (id: string, label: string, hint: string, body: Block[]) =>
    offer13('box-' + id, label, hint, 'week', (x) => {
      set13(x, 'box', id);
      return [...body, p('Three days left.')];
    });
  return [
    box('keep', 'Hang it in the wardrobe', 'Don’t look at it. Don’t send it back.', [
      p('You hang it at the far end of the wardrobe, still in its tissue, behind everything else, and shut the door on it. All week you know exactly where it is, the way you know where a wasp is in a room.'),
    ]),
    box('return', 'Send it back unopened', 'You will choose what you wear.', [
      p('You tie the ribbon back the way it came, ring the courier, and send it back to the Vesper with nothing written on the card, and feel, for about an hour, enormous.'),
      t('One thing she doesn’t get to choose. It is a very small thing. I will take it.'),
    ]),
    box('cut', 'Cut it up', 'With the kitchen scissors. Slowly. Then post it back.', [
      p('You take the kitchen scissors to it on the table, slowly, seam by seam, the way Adrian used to shred a draft he was ashamed of, until it is a heap of beautiful black ribbons. Then you put the ribbons back in the tissue, and the tissue back in the box, and tie the bow, and send it back to the Vesper by the same courier.'),
      t('Childish. Completely. I feel better than I have in a week.'),
    ]),
  ];
}

function weekChoices(s: GameState): C13Choice[] {
  if (!get13(s, 'week')) return weekMoves(s, false);
  if (!get13(s, 'box')) return boxChoices();
  return weekMoves(s, true);
}

// ── The Answer ──

function answerBlocks(s: GameState): Block[] {
  return [
    p(
      get12(s, 'nora') === 'go'
        ? 'Wednesday, a minute to midnight. The kitchen table, the black phone with its one contact, and beside it the card with Nell’s name on it, which you took down off the wall to look at. You have no photograph of her. You have a name, and her sister barefoot in a hot road, and that will have to do.'
        : 'Wednesday, a minute to midnight. The kitchen table, the black phone with its one contact, and beside it, because you took it off the wall to look at, Nora’s photograph of Nell on the harbour wall, laughing, in flat shoes.',
    ),
    p('You have been sitting here since ten. You have written three messages and deleted them. One was long, and explained everything, and would have made her laugh. One was a single word. One was Nell’s name, and nothing else, and your thumb stayed over it for a long time.'),
    p('Outside, a bus goes by, lit and empty. In the flat across the gap, the one that watches yours, a light goes on and off again, as if somebody over there were waiting up too.'),
    p('You pick the phone up. The screen lights your face from below, the way a torch does in a ghost story.'),
    t('She was placed. Nell was placed, eight years, and when she tried to stop being placed, they put her in the harbour. Whatever I type now, I am typing it with her sitting across the table.'),
  ];
}

function answerChoices(s: GameState): C13Choice[] {
  const say = (id: 'comply' | 'refuse' | 'counter', label: string, hint: string, body: Block[], after: (x: GameState) => void) =>
    offer13('order-' + id, label, hint, 'thursday', (x) => {
      after(x);
      return body;
    });
  const ways = counterWays13(s);
  return [
    say('comply', 'Type “Thursday.”', 'Maya’s file stays in the drawer. You go up to 1109.', [
      q('You · to C.', 'Thursday.'),
      q('C.', get13(s, 'box') === 'keep' ? 'Thank you, darling. Wear the dress.' : 'Thank you, darling. Wear whatever you like. It won’t matter in the least.'),
      p('You put the phone face down on the table and sit with your hands flat on either side of it, until the kitchen clock has gone round once.'),
    ], (x) => {
      set13(x, 'answer', 'complied');
      setKey(x, 'act3.honeypot', 'done');
    }),
    say('refuse', 'Type “No.”', 'Not this. Not ever. And Maya pays for it on Friday.', [
      q('You · to C.', 'No. Not this. Not ever.'),
      p('A minute. Two. The kitchen clock.'),
      q('C.', 'Then it will be Thursday night, not Friday. I am sorry, darling. I did so hope.'),
      ...(getKey(s, 'act3.nell') === 'known' ? [t('Nell. I could have typed her name. I didn’t. I will say it to her face, when it costs her something.')] : []),
    ], (x) => {
      set13(x, 'answer', 'refused');
      setKey(x, 'act3.honeypot', 'refused');
      setKey(x, 'act3.maya-status', 'detained');
    }),
    ...(ways.length
      ? [
          say('counter', 'Type “Thursday,” and mean something else', 'The same word as yes. That is the point.', [
            q('You · to C.', 'Thursday.'),
            q('C.', get13(s, 'box') === 'keep' ? 'Thank you, darling. Wear the dress.' : 'Thank you, darling. Wear whatever you like. It won’t matter in the least.'),
            t('Thursday. She will get a Thursday. Just not the one she ordered.'),
          ], (x) => {
            set13(x, 'answer', 'countered');
          }),
        ]
      : []),
  ];
}

// ── The Claremont ──

function thursdayBlocks(s: GameState): Block[] {
  const answer = get13(s, 'answer');
  if (answer === 'complied')
    return [
      p(COMPLY_OPENING13),
      p(
        get13(s, 'box') === 'keep'
          ? 'Her dress, out of its tissue at last: black, simple, cut to the centimetre. You have never worn anything that fitted so well and belonged to you less. The face, finished once and not finished again. No perfume. You leave off the good earrings, and the green, and everything that is yours, and put them all in a drawer, and shut the drawer, as if that could keep them out of it.'
          : 'A dress that is nobody’s: black, plain, nothing on it you have ever worn for anyone you chose. You will never wear it again, and you know it as you do up the zip. The face, finished once and not finished again. No perfume. You leave off the good earrings, and the green, and everything that is yours, and put them all in a drawer, and shut the drawer, as if that could keep them out of it.',
      ),
      t('Whatever she has placed tonight, it is not going to be me. I am leaving me in the drawer.'),
      pryceKnown(s)
        ? p('At half past eight the car is at the kerb. Mr Pryce holds the door, and does not say Ms Laurent’s compliments, and does not look at you, and all the way along the Embankment he says nothing at all. At the lights on the Strand he turns the heating up, though it is not cold, and you understand that it is the only thing he has to give you.')
        : p('At half past eight a car you did not order is at the kerb. The driver holds the door and does not look at you, all the way along the Embankment.'),
      p('The Claremont is old money pretending to be new: marble, low lamps, a bar that smells of leather and oranges. He is where the file said he would be. The end of the bar, a whisky, a paperback he is not reading, his cycling clips in his jacket pocket.'),
      p('It is appallingly easy. You sit two stools along. You ask the barman something he can’t answer and Marsh can. He is funny, drily, at his own expense. He talks about his daughter, who is going to be a better doctor than he is a regulator, and about his work, not what is in it, only that it is the first thing in years he thinks might matter. He asks about you, and listens to the answers, which are lies, as if they were the most interesting things he has heard all year.'),
      t('He is kind. That is what the file left out. He is kind, and he is lonely, and he has no idea, and I am the worst thing that is ever going to happen to him.'),
      p('Every charming thing you say costs you something, and you keep count, the way Adrian used to count the floors in a lift when he was frightened: one, and another, and another.'),
      p('At eleven he says he should go, and doesn’t. At a quarter past you say you have a room upstairs, because that is the line, and he looks at you for a long moment as if you had handed him something he was afraid to drop.'),
      p('The lift. Mirrored walls, and in them, from every side, a woman in a black dress standing very straight beside a tired man, both of them watching the numbers.'),
      p(CORRIDOR13 + ', carpeted in a red that swallows your footsteps. 1109 is at the end. He takes the key card from your fingers, because your fingers are not quite steady, and he notices, and says gently, “Are you all right?”'),
      p('You say yes. It is the last lie of the evening that you will have to say out loud.'),
    ];
  if (answer === 'refused')
    return [
      p('At nine o’clock on Thursday you are at home in your oldest jumper, on the floor, with your back against the wall, not going to the Claremont.'),
      p('Across the river a man is having one whisky at the end of a bar, on his own, and nobody is going to sit down two stools along. You think about him for a while. It helps, a little.'),
      ...(mayaBack(s)
        ? [
            p('At twenty past nine your phone rings. Maya.'),
            q('Maya', 'I’m in the back of a car. There are two men from security and a policeman and they’ve got my laptop in a bag. They’re searching the flat. They said leaking. They said a journalist. I’ve never spoken to a journalist in my life. What is this? Is this about you?'),
            q('You', 'Don’t say anything to anyone. I’m coming.'),
          ]
        : [
            p('At twenty past nine the black phone lights. No message: a photograph. Maya in the back of a car at night, between two men, her face turned to the rain on the window. No caption. It does not need one.'),
          ]),
      p('You are out of the door before you have decided to go, in the jumper, with your coat over it and your hair not done, and for once in two months nobody on the street looks at you twice.'),
      p('You are at the station by ten. They will not tell you anything, because on paper you are nobody to her. You sit on a plastic chair in a waiting room that smells of bleach and wet coats, under a poster about pickpockets, with the black phone in your lap, and wait.'),
      p('There are other people waiting. A woman in a nurse’s tunic with her coat on over it, holding a carrier bag of clean clothes for somebody. An old man asleep with his mouth open. A boy of seventeen in a football shirt who keeps going to the desk to ask about his brother and being told to sit down. Every time the inner door opens, all of you look up, and every time it is not for you, all of you look down again, together, like a congregation.'),
      p('Nobody touches you. Nobody asks anything of you at all. That is how it works, you understand, sitting there under the strip light: they do not have to do anything to you. They only have to do it to her, and let you watch.'),
      p(
        pryceKnown(s)
          ? 'At half past ten the door from the street opens and lets in the rain and Mr Pryce, without his cap, who looks round the waiting room once and sits down in the chair beside yours, as if the room were full.'
          : 'At half past ten the door from the street opens and lets in the rain and a man in a good coat, who looks round the waiting room once and sits down in the chair beside yours, as if the room were full.',
      ),
      q(pryceKnown(s) ? 'Pryce' : 'Man in a good coat', 'Ms Laurent asks me to say it isn’t too late. The car’s outside. He orders his second whisky at eleven. He always does.'),
      t('Still time. She wants me to know that I could make this stop. That I am choosing it, every minute I sit on this chair.'),
    ];
  return [
    p('Thursday. You get ready the way you would for any job: carefully, and for yourself.'),
    p('The green, because it is yours now, whatever she meant by it. The good earrings. The heels you can run in, which you have tested on the stairs. Your hair up and pinned hard, the face finished and then finished again, and in the wardrobe mirror a woman who looks exactly like a honeypot, and is not one.'),
    t('She has dressed me for months. Tonight I dressed myself, and she will watch it on her own camera, and think it was her idea.'),
  ];
}

function thursdayChoices(s: GameState): C13Choice[] {
  const answer = get13(s, 'answer');
  if (answer === 'complied') {
    const door = (id: string, label: string, hint: string, body: Block[]) =>
      offer13('door-' + id, label, hint, 'after', (x) => {
        set13(x, 'door', id);
        return [...body, p('The door closes behind you.')];
      });
    return [
      door('look', 'Look at the mirror as you go in', 'So that whoever is behind it knows you know.', [
        p('Inside, over the desk, there is a long mirror in a gilt frame. You look straight into it as you pass, into the dark behind the glass, so that whoever is watching knows that you know they are.'),
      ]),
      door('away', 'Don’t look', 'At anything but the mirror.', [p('You don’t look at the mirror. You look at the window, at the lights on the river, at anything else.')]),
    ];
  }
  if (answer === 'refused' && !get13(s, 'vigil'))
    return [
      offer13('vigil-no', 'Tell him no', 'Out loud, so the desk sergeant hears.', 'thursday', (x) => {
        set13(x, 'vigil', 'no');
        return [
          q('You', 'No. Tell her no. Tell her I’m waiting for my friend.'),
          p('The desk sergeant looks up. The man beside you looks at you for a long moment, then nods, and gets up, and buttons his coat.'),
          ...(pryceKnown(x)
            ? [p('At the door, without turning round, he says, “For what it’s worth, Ms Vale, I’d have said the same,” and goes out into the rain.')]
            : [p('At the door he says, to nobody, “She did say you would,” and goes out into the rain.')]),
        ];
      }),
      offer13('vigil-silent', 'Don’t look at him', 'Look at the poster. Wait for him to go.', 'thursday', (x) => {
        set13(x, 'vigil', 'silent');
        return [p('You don’t look at him. You look at the poster about pickpockets until you could draw it from memory. After a while the chair beside you creaks, and the street door lets in the rain again, and he is gone.')];
      }),
    ];
  if (answer === 'refused')
    return [
      offer13('station-wait', 'Wait all night', 'The plastic chair. The strip light. Her.', 'after', (x) => {
        set13(x, 'station', 'wait');
        return [
          p('You wait. At two a cleaner mops round your feet. At four a boy in a football shirt is sick in the corridor, and a sergeant brings you a tea you did not ask for, which is the kindest thing anybody does all night.'),
          p('At five the black phone lights once, and you do not look at it.'),
        ];
      }),
      ...(c(s, 'c9.lawyer') === 'retain'
        ? [
            offer13('station-lawyer', 'Ring Nadia Brandt', 'You kept her for when you were ready. You are.', 'after', (x) => {
              set13(x, 'station', 'lawyer');
              setKey(x, 'act3.maya-lawyer', 'brandt');
              return [
                p('Nadia Brandt answers on the second ring, as if she had been sitting up waiting for exactly this.'),
                q('Nadia Brandt', 'Which station? Don’t say a word to anybody. I’m coming.'),
                p('She arrives at half past one in a raincoat over something that is plainly pyjamas, with a briefcase and the expression of a woman who has been waiting years for somebody to be this stupid in front of her. She goes through the door marked Private without knocking.'),
                p('At four she comes out, and sits down beside you, and takes off her shoes.'),
                q('Nadia Brandt', 'Their evidence is very good. It’s far too good. Nobody who leaks is this tidy. They’ll bail her at six, and I’ll have it in front of a judge by Christmas. Whoever wrote this has never had to defend anything.'),
              ];
            }),
          ]
        : []),
    ];
  const ways = counterWays13(s);
  const way = (id: 'turn' | 'swap' | 'expose', label: string, hint: string, body: (x: GameState) => Block[], after: (x: GameState) => void) =>
    offer13('counter-' + id, label, hint, 'after', (x) => {
      set13(x, 'counter', id);
      after(x);
      const surprised = getKey(x, 'act3.celeste-surprised');
      setKey(x, 'act3.celeste-surprised', surprised === 'twice' || surprised === 'thrice' ? 'thrice' : surprised === 'once' ? 'twice' : 'once');
      return body(x);
    });
  return [
    ...(ways.includes('turn')
      ? [
          way('turn', 'Tell Marsh the truth, and stage it for the camera', 'Both of you in on it. The only thing in that room will be what you choose.', (x) => [
            p('The bar, nine o’clock, the end stool, the whisky, the paperback. You sit down beside him, not two stools along, and put your phone on the bar between you, face down.'),
            q('You', 'Mr Marsh. My name is Evelyn Vale. In about two hours I am supposed to take you up to suite 1109, where there is a camera behind the mirror, so that Mr Halvorsen owns you and your inquiry by Monday. I would rather not. I would like your help.'),
            p('He looks at you for a long time. He does not reach for his coat. That is when you know you chose right.'),
            q('Owen Marsh', 'Go on.'),
            get12(x, 'statement') === 'recorded'
              ? p('You turn the phone over and play him eleven seconds of a man in a Singapore bar saying, “It came down from upstairs. From a friend of hers.”')
              : get11(x, 'catalogue') === 'photo'
                ? p('You turn the phone over and show him page seven of The Autumn Collection: your own face, and “available for placement from the first Thursday of next month”.')
                : get13(x, 'told') === 'julian'
                  ? p('You tell him Julian Mercer says he was right about the pensions. He puts his glass down.')
                  : p('You tell him about the Vesper, and page seven, and a woman in a grey dress who ended, and a woman in the harbour who did not get to.'),
            p('He listens to all of it without interrupting, the way good investigators do, and at the end he orders two more whiskies and thinks for the length of the first one.'),
            q('Owen Marsh', 'If you don’t go up, they know you warned me. If you go up and nothing happens, they know that too.'),
            q('You', 'So something has to happen. For the camera.'),
            p('He is quiet for a moment. Then, to your surprise, he laughs, low, the first real laugh of the evening.'),
            q('Owen Marsh', 'I did amateur dramatics at university. I was a very bad Benedick.'),
            p('In the lift you rehearse in whispers, like two people planning a surprise party: where the mirror is, where the camera will be looking, what it will need to see. He is terrible at it. He keeps asking what his motivation is. By the eleventh floor you are both trying not to laugh, and that, you realise, is exactly how you will look to the camera: like two people who can hardly wait.'),
            p('In 1109 the lamps are low and the mirror over the desk is long and dark, and you both know exactly where it is. You stage it like a scene in a play: his jacket over the chair, your shoes kicked off by the bed, your hair coming down, his tie in your hand. You kiss him where the camera can see, slow and convincing, and it is not entirely acting, and you can feel that it is not entirely acting for him either.'),
            p('His mouth by your ear, under the sound of the shower you have left running in the next room, off the microphone:'),
            q('Owen Marsh', 'Is this all right?'),
            q('You', 'Yes. Keep going. Slower. They’ll want to believe it.'),
            p('You pull him down onto the bed, both of you still dressed, and reach over and turn off the lamp, and in the dark you lie side by side on top of the covers with your hearts going like teenagers’, his hand in yours, and you both start, very quietly, to laugh.'),
            p('At one, as agreed, he gets up and puts his jacket on in the light from the bathroom door, like a man who has done something he will regret, and at the door he turns and gives the mirror a long, guilty, haunted look that would have got him cast as Benedick at last.'),
            t('The only thing that happened in this room tonight is the thing we chose. Let her watch that.'),
          ], (x) => {
            setKey(x, 'act3.honeypot', 'staged');
            setKey(x, 'act3.ally.marsh', 'in');
            note13(x, 'marsh', 'Owen Marsh, deputy director of enforcement at the Markets Authority, knows he was Meridian’s target for Halvorsen, and staged the evening in suite 1109 with Evelynn for Meridian’s camera.', 'Marsh himself, at the Claremont');
          }),
        ]
      : []),
    ...(ways.includes('swap')
      ? [
          way('swap', 'Let Iris take you behind the mirror', 'Take the camera’s card before he ever arrives.', () => [
            p('Iris meets you at eight at the Claremont’s staff entrance in a housekeeping tabard over her grey silk, with a trolley of towels and a lanyard that belongs to somebody called Precious.'),
            q('Iris', 'Four years with Halvorsen, darling. You learn where everybody keeps their cameras.'),
            p('The service corridor behind the eleventh floor is bare concrete and strip lights and the hum of machinery, the back of the hotel, the part the guests are never meant to imagine. Behind 1109 there is a cupboard with a cheap lock that Iris opens with a hairgrip faster than you could have. Inside, on a shelf, a black box the size of a paperback with a lens pressed to the back of the glass, and a small green light, patiently on.'),
            p('Iris ejects the card and slides in a blank one, and holds the real one up between two fingers in the strip light, like a woman holding up a bad tooth.'),
            p('Footsteps at the far end of the corridor: a security man on his round, torch in hand, whistling. Iris does not hurry. She shuts the cupboard with her hip, turns the trolley across the corridor so that he has to stop, and holds out a stack of towels to him as if he were late.'),
            q('Iris', 'Eleven-oh-four, love. They’ve rung down twice. You couldn’t, could you? My back.'),
            p('He takes the towels. He takes them all the way to 1104, and knocks, and argues with whoever answers, and by the time he comes back the corridor is empty and the trolley is by the service lift with nobody near it.'),
            q('Iris', 'Once a month, nobody changes it more than that. So this is a month of that room. And the one before is in a safe in the Vesper, and the one before that. Six years of 1109, darling. Everybody who was ever placed there, and everybody they were placed with.'),
            p('At nine you go down to the bar and sit two stools along from Owen Marsh and have one drink with him, and he is funny and kind and tired. At half past ten you say you have an early start, and shake his hand at the lift, and watch the doors close on a man who will never know what didn’t happen to him.'),
            t('One drink, and a handshake, and a month of Meridian’s own tape in Iris’s glove. She will know by the morning. I want her to.'),
          ], (x) => {
            setKey(x, 'act3.honeypot', 'pulled');
            set13(x, 'card', 'taken');
            note13(x, 'card', 'The memory card from the camera behind the mirror in suite 1109 at the Claremont: a month of Meridian placements in that room. Iris says the earlier cards are in a safe at the Vesper.', 'Iris, in the Claremont’s service corridor');
          }),
        ]
      : []),
    ...(ways.includes('expose')
      ? [
          way('expose', 'Burn it in public first', get13(s, 'told') === 'theo' ? 'Theo’s show goes out at seven.' : 'The Courier. Your name nowhere, your voice everywhere.', (x) => [
            ...(get13(x, 'told') === 'theo'
              ? [
                  p('At seven Theo’s show opens not with a guest but with Theo alone at the desk, in his good suit, with his glasses on, looking straight down the camera.'),
                  q('Theo Marr', 'Tonight a senior official at the Markets Authority was to be the target of a sexual entrapment operation run by a private intelligence firm, on behalf of a client he is investigating. The hotel is the Claremont. The room is 1109. We know this because somebody who was asked to do it told us, and refused.'),
                ]
              : [
                  p('At seven the Courier’s website runs it across the top of the page, with a photograph of the Claremont’s front door: REGULATOR TARGETED IN HONEY TRAP FOR FUND UNDER INVESTIGATION. The source is “a woman approached to carry it out”. The room number is in the second paragraph.'),
                ]),
            p('At five past seven the black phone rings. It has never rung before; it has only ever lit. It rings eleven times, and stops, and does not ring again.'),
            p('By eight the Claremont’s lobby is full of photographers. By half past, Owen Marsh has been rung by his minister, and by the Authority’s chairman, and by his daughter, and is on the pavement outside his flat in Kennington telling a camera, in his cycling jacket, that he has no comment, and that his inquiry continues.'),
            p('At nine, because you want to, you walk into the Claremont bar in the green, through the photographers, and sit on the end stool, the one he would have been on, and order a whisky, and lift it once, very slightly, towards the lifts and the eleventh floor.'),
            t('Everybody in London is going to try to guess who the woman was. Some of them are going to guess right. It was worth it. Ask me again in a month.'),
          ], (x) => {
            setKey(x, 'act3.honeypot', 'burned');
            setKey(x, 'act3.exposed', 'yes');
          }),
        ]
      : []),
  ];
}

// ── Afterwards ──

function afterBlocks(s: GameState): Block[] {
  const answer = get13(s, 'answer');
  if (answer === 'complied')
    return [
      pryceKnown(s)
        ? p('The car is waiting at the side entrance at two, engine running, as if it had never left. Mr Pryce does not get out. He leans across and opens the rear door from inside, and does not look in the mirror once all the way home, and when you get out he says to the steering wheel, “Goodnight, Ms Vale,” in a voice you have not heard him use before.')
        : p('The car is waiting at the side entrance at two, engine running, as if it had never left. The driver does not look at you, all the way home.'),
      p('At home you lock the door and put the chain on and stand in the hall with your back against it, for a length of time you do not measure.'),
      p('Then the shower. You stand under it until the hot water runs out, and then under the cold, and you do not look down, and you do not look in the mirror when you get out. You put the black dress in a bin bag and the bin bag outside the door. None of that is the part that matters, and all of it is.'),
      p('The black phone lights once, on the kitchen table.'),
      q('C.', 'Received. Thank you.'),
      p('Your own phone lights a minute later. Maya. It rings out. It rings again. You watch it ring the way you would watch weather through a window.'),
      t('I can’t tell her. I can’t tell anyone. That is the other thing they buy with a room like that: not the man. The silence afterwards.'),
      t('I did what she ordered. It was done to me. Both of those are true, and I am going to have to carry both of them to the end.'),
    ];
  if (answer === 'refused')
    return [
      p('At six they let her go.'),
      p('Released on bail. Suspended from Axiom pending investigation. Charged with nothing, yet. The sergeant who brought you the tea tells you, off the record, at the door, because he has seen you sitting there all night and has decided you are allowed to know.'),
      ...(mayaBack(s)
        ? [
            p('Maya comes out through the double doors in yesterday’s clothes, with her laptop gone and her face grey, and sees you, and stops.'),
            q('Maya', 'You were here all night.'),
            q('You', 'Yes.'),
            q('Maya', 'It was about you. Wasn’t it. Somebody wanted something from you, and you said no, and they did this to me instead.'),
            p('It is not a question, and she does not wait for an answer. She stands on the station steps in the grey light with her arms folded over her chest, shaking, not from the cold.'),
            q('Maya', 'They had printouts. Emails I never sent, to a man at the Courier I’ve never met, from an account I’ve never heard of, and they were perfect. They had my phrases in them. My sign-off. Somebody has been reading everything I’ve written for months.'),
          ]
        : [
            p('Maya comes out through the double doors in yesterday’s clothes, grey in the face, and looks at the stranger in the raincoat who has been sitting in the waiting room all night. She does not know you. She nods once, not knowing why, and walks past you into the rain.'),
            t('She will never know it was me. She will never know it was for her. That is the whole of the price, and I agreed to it at midnight on Wednesday.'),
            p('You watch her go down the street to the bus stop, and stand there in the rain with her arms round herself, and get on the first bus that comes without looking at the number.'),
          ]),
    ];
  const counter = get13(s, 'counter');
  return counter === 'turn'
    ? [
        p('At one you go down in the lift separately, a floor apart, like lovers in a farce. He is waiting for you by the revolving doors with his cycling clips back on.'),
        q('Owen Marsh', 'I have spent eleven years investigating people like that and never once got inside the room. Whatever this is, I’m in it now.'),
        q('Owen Marsh', 'When you need the Markets Authority, ring me. It turns out that, on a Thursday night, I’m most of it.'),
        p('He writes a number on the back of a Claremont coaster, his own, not the office’s, and gives it to you, and then stands in the rain with his bicycle helmet in his hand, looking up at the eleventh floor as if he were trying to remember it for evidence.'),
      ]
    : counter === 'swap'
      ? [
          p('At midnight you meet Iris in an all-night café near the station, among the cab drivers. She has the card in the finger of a housekeeping glove, and she puts the glove on the table between you like a dead mouse.'),
          q('Iris', 'Halvorsen’s on it, you know. From before. And a minister. And a girl who was nineteen, the month I started collecting it. I never looked. I’m going to look now.'),
          p('She pushes the glove across to you, and then, when you reach for it, puts her hand over yours and holds it there for a moment, hard.'),
          q('Iris', 'You keep it. I’d only lose my nerve. I lost it for four years.'),
        ]
      : [
          p('By midnight it is everywhere. Your phone does not stop. Odile rings four times. The Courier’s follow-up has a photograph of a woman in green lifting a glass in the Claremont bar, taken through the window, too dark to be sure of.'),
          p('Maya sends a link to it, and one line: “Is this you???” And then, a minute later: “Don’t answer that. Whoever she is, good for her.”'),
        ];
}

function afterChoices(s: GameState): C13Choice[] {
  const answer = get13(s, 'answer');
  if (answer === 'complied') {
    const recover = (id: string, label: string, hint: string, body: Block[]) =>
      offer13('recover-' + id, label, hint, 'morning', (x) => {
        set13(x, 'recover', ['julian', 'theo', 'sebastian'].includes(id) ? 'refuge' : id);
        if (['julian', 'theo', 'sebastian'].includes(id)) set13(x, 'refuge', id);
        return body;
      });
    const refuge: Record<Partner13, Block[]> = {
      julian: [
        p('You go to Julian at three. He opens the door himself, in a jumper, awake, as if he had been expecting somebody and had not let himself hope it would be you.'),
        p('You ask him only to hold you. He does: on top of the covers, in his clothes, his arms round you and his chin on your hair, the city going on below the window. He does not ask what happened. He does not ask for anything. In the morning he makes coffee and does not ask then either.'),
      ],
      theo: [
        p('You go to Theo at three. He opens the door above the studio with his glasses on his head and one look at your face takes them off.'),
        p('You ask him only to hold you. For once in his life he asks no questions at all. He holds you on the sofa under a blanket that smells of the studio, in his clothes, until it is light, and nothing else happens, and he does not want it to.'),
      ],
      sebastian: [
        p('You go to Sebastian at three. He opens the door in a T-shirt, sees your face, and simply steps back to let you in.'),
        p('You ask him only to hold you. He does, on top of the covers, in his clothes, one big warm arm across you, humming something under his breath that you realise after a while is the slow movement he played for you once. Nothing else happens. He does not ask for anything, and in the morning he does not ask then either.'),
      ],
    };
    return [
      ...(mayaBack(s)
        ? [
            recover('maya', 'Go to Maya’s', 'Ask to sleep on her sofa. Don’t say why.', [
              p('At half past two you are on Maya’s doorstep in a coat over whatever you had on, and she opens the door in a T-shirt with her glasses on and looks at your face once.'),
              q('Maya', 'I’m not going to ask.'),
              p('She doesn’t. She makes up the sofa with the good blanket and a hot-water bottle, and when you are lying down she sits on the floor beside it with her back against it, the way the two of you used to sit on the archive room floor at Axiom at the end of a long audit, and she stays there, saying nothing at all, until you are asleep.'),
              t('She will never know what she did tonight. She did it anyway.'),
            ]),
          ]
        : []),
      ...(eveningPartners11(s) as Partner13[]).map((partner) =>
        recover(partner, `Go to ${name13[partner]}`, 'Ask him only to hold you. Nothing else.', refuge[partner]),
      ),
      recover('wall', 'Write it on the wall', 'In your own hand. The date, the room, and whose it was.', [
        p('You take a card from the drawer and write on it in capitals, in your own hand, pressing hard enough to dent the card beneath:'),
        q('The card', 'THURSDAY. 1109. DONE TO ME. NOT BY ME.'),
        p('You pin it to the wall beside Nell’s name, and stand back, and look at the two of them together until the pins stop shaking.'),
        t('She kept a ledger of me. Now I keep one of her.'),
      ]),
      recover('alone', 'Sit up until it is light', 'Just get to the morning.', [
        p('You sit on the kitchen floor with your back against the cupboards until the window goes grey, and then blue, and then it is morning, and you are still here.'),
        t('Still here. That will have to be enough for today.'),
      ]),
    ];
  }
  if (answer === 'refused')
    return mayaBack(s)
      ? [
          offer13('maya-tell', 'Tell her one true thing', '“Someone is using you to get to me. I am going to end it.”', 'morning', (x) => {
            set13(x, 'maya', 'tell');
            return [
              q('You', 'Somebody is using you to get to me. I said no to them. This is what no costs. I am going to end it, Maya. I promise you I am going to end it.'),
              p('She looks at you for a long time in the grey light outside the station, with the traffic starting up behind her.'),
              q('Maya', 'Then end it. And when you have, you are going to tell me all of it, over a very expensive dinner, and you are paying.'),
              p('She takes your arm to walk to the taxi rank, and does not let go of it.'),
            ];
          }),
          offer13('maya-quiet', 'Say nothing, and get her a taxi', 'She has had enough of the night.', 'morning', (x) => {
            set13(x, 'maya', 'quiet');
            return [
              p('You say nothing. You walk her to the taxi rank and put her in the first cab and give the driver her address and a twenty, and she lets you, and at the last moment, with the door open, she grips your hand very hard, once.'),
              t('She knows. She does not know what she knows. That is worse, and it is mine.'),
            ];
          }),
        ]
      : [offer13('after-home', 'Go home', 'Friday is coming whether you are ready or not.', 'morning')];
  const counter = get13(s, 'counter');
  const ally = counter === 'turn' ? 'Marsh' : counter === 'swap' ? 'Iris' : 'Theo';
  return [
    offer13('after-drink', counter === 'expose' && get13(s, 'told') !== 'theo' ? 'Have one drink, alone, and let the city talk' : `Have one drink with ${ally}`, 'You won one. Let yourself have it for an hour.', 'morning', (x) => {
      set13(x, 'drink', 'yes');
      return counter === 'turn'
        ? [
            p('He walks you to an all-night bar in Covent Garden and you have one drink each, standing up, and he tells you about his daughter’s first dissection and you tell him nothing true at all except your name, and at the door he shakes your hand, and then, after a moment, kisses you once on the cheek, very carefully, like a man signing something.'),
          ]
        : counter === 'swap'
          ? [p('Iris orders two brandies from a café that does not sell brandy, and gets them, and you drink to a girl who was nineteen, and to Nell, and to Helen, until the cab drivers start looking at you both with respect.')]
          : get13(x, 'told') === 'theo'
            ? [p('Theo comes off air at eleven, finds you in the green room with your shoes off, and pours two whiskies from a bottle a cabinet minister gave him in 2019. You drink to Owen Marsh’s cycling jacket. He does not ask a single question, which is how you know he is happy.')]
            : [p('You have one whisky at the end of the Claremont bar, alone, while the photographers give up outside one by one, and the barman gives you the second on the house without being asked.')];
    }),
    offer13('after-home', 'Go home', 'Friday is coming.', 'morning'),
  ];
}

// ── Friday ──

function morningBlocks(s: GameState): Block[] {
  const answer = get13(s, 'answer');
  const counter = get13(s, 'counter');
  const count = getKey(s, 'act3.celeste-surprised');
  const tally = count === 'thrice' ? 'Three times, darling. I have started keeping count too.' : count === 'twice' ? 'Twice now.' : 'Once. I shall remember it.';
  return [
    p('Friday comes up bright, which feels like an insult. The kind of London morning people take photographs of: a hard blue sky, the river full of light, the posters of your face at the bus stop shining as if somebody had polished them in the night.'),
    p('You make coffee and do not drink it. You stand at the window and watch the street wake up, the man with the dog, the girl on the scooter, the delivery van double-parked, all of them going about their business as if nothing had happened anywhere to anyone.'),
    p('The black phone lights at eight.'),
    ...(answer === 'complied'
      ? [q('C.', 'You were beautiful. He will be very useful. Your friend’s file has gone back in my drawer. I keep everything, darling. You know that now.')]
      : answer === 'refused'
        ? [q('C.', 'Your friend is home, I hear. She will be quite all right, if you are sensible next time. There is always a next time.')]
        : counter === 'turn'
          ? [q('C.', 'Very pretty. Very clever. Do tell Mr Marsh he was a much better Benedick than he thinks.'), q('C.', tally)]
          : counter === 'swap'
            ? [q('C.', 'Somebody has been in my cupboard. A whole month of my cupboard. Well.'), q('C.', tally)]
            : [q('C.', 'On television. How vulgar, and how effective. Mr Halvorsen has withdrawn his interest, Mr Marsh is a hero, and you have become rather famous in a way I cannot use.'), q('C.', tally)]),
    ...(get13(s, 'box') === 'cut' ? [q('C.', 'You cut up my dress, I hear. How very dramatic. It was Nell’s size, you know. I had it let out for you.')] : []),
    ...(answer === 'complied' && mayaBack(s)
      ? [
          p('At ten, a message from Maya: “You didn’t answer last night. You don’t have to. Just send me a full stop so I know you’re alive.”'),
          p('You send her a full stop. She sends back a heart. You look at it for a long time.'),
        ]
      : answer === 'refused'
        ? [p('At eleven it is in the Courier’s business pages, low down, four lines: AXIOM INVESTIGATOR SUSPENDED IN LEAK INQUIRY. They spell her name right. Somebody made sure they would.')]
        : answer === 'countered'
          ? [p('At eleven Owen Marsh’s inquiry into Mr Halvorsen’s fund is on the Authority’s website, in the same dull careful type as always, with one new line at the end: the inquiry has been widened.')]
          : []),
    p(
      answer === 'complied'
        ? 'You look at the wall for a long time. The card that says 1109 is still there. You leave it there.'
        : answer === 'refused'
          ? 'On the wall, beside Maya’s name, you pin a new card: DETAINED. SUSPENDED. BAIL. And under it, smaller: reversible.'
          : 'On the wall you move the card that says 1109 from Celeste’s side of the door to yours.',
    ),
  ];
}

function morningChoices(s: GameState): C13Choice[] {
  const reply = (id: string, label: string, hint: string, body: Block[]) =>
    offer13('reply-' + id, label, hint, 'complete', (x) => {
      set13(x, 'reply', id);
      setKey(x, 'act3.sloane-came', 'yes');
      return body;
    });
  return [
    reply('none', 'Don’t answer', 'Let her wonder what the silence means.', [p('You put the phone face down and leave it there all day. Let her wonder.')]),
    ...(get12(s, 'bed') === 'drawer'
      ? [
          reply('nell', 'Answer with Nell’s note', '“Nell said you’d bring flowers.”', [
            q('You · to C.', 'Nell said you’d bring flowers.'),
            p('Nothing comes back. Nothing comes back all day, or all night, for the first time since the black phone arrived.'),
            t('The first time I have ever made her go quiet. I am going to remember what it cost me to find out how.'),
          ]),
        ]
      : []),
    ...(get13(s, 'answer') === 'countered'
      ? [
          reply('count', 'Answer her tally', '“So have I.”', [
            q('You · to C.', 'So have I.'),
            p('Three dots appear, and go away, and appear again, and go away.'),
          ]),
        ]
      : []),
  ];
}

// ── A Knock ──

function completeBlocks(s: GameState): Block[] {
  const answer = get13(s, 'answer');
  return [
    p('That evening, at seven, a knock.'),
    p('Not the black phone. Not the post. A knock at your own door, three times, the way somebody knocks who has made up her mind to do it before she can change it.'),
    p('You look through the spyhole first. Of course you do. You have learned to.'),
    p('The last time you saw her close to, she was on the other side of a desk with a tablet in her hand, telling a man called Adrian Vale what he was going to become. She had seemed very tall then, and very sure, and entirely made of edges.'),
    p('Victoria Sloane is on the landing in the grey coat she wore the night of the Glass House, with the rain still on its shoulders. She is holding a document folder against her chest with both arms, like a girl with her schoolbooks.'),
    p(
      answer === 'complied'
        ? 'In it, you will learn later, is a request from Meridian’s client services to her directorate, for “a copy of Thursday’s recording, for the file”.'
        : answer === 'refused'
          ? 'In it, you will learn later, is Maya Reyes’s charge sheet, with Sloane’s own directorate’s stamp on the referral. She did not authorise it. Somebody used her stamp.'
          : 'In it, you will learn later, is a notice from the Markets Authority, dated this morning, opening an inquiry into “the targeting of public officials by private intelligence concerns”, and a list of the concerns. Axiom is on it.',
    ),
    p('She looks smaller. She looks as if she has not slept either, and as if she has been standing on the stairs for some time, deciding.'),
    p('She looks, for the first time since you have known her, frightened.'),
    q('Sloane', 'I didn’t know they did this. I need you to believe that. And I need you to let me in.'),
    t('She came to me. The woman who built this cage came to my door to ask if she could come in.'),
  ];
}

// ── Blocks and choices ──

export function chapter13Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter13') return [];
  if (s.phase === 'brief') return briefBlocks(s);
  if (s.phase === 'week') return weekBlocks();
  if (s.phase === 'answer') return answerBlocks(s);
  if (s.phase === 'thursday') return thursdayBlocks(s);
  if (s.phase === 'after') return afterBlocks(s);
  if (s.phase === 'morning') return morningBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter13Choices(s: GameState): C13Choice[] {
  if (!chapter13Playable(s)) return [];
  if (s.scene === 'chapter12' && s.phase === 'complete' && ownPower(s))
    return [offer13('begin', 'The placement', 'The first Thursday. Content notice: sexual coercion (implied, never shown), blackmail.', 'brief')];
  if (s.scene !== 'chapter13') return [];
  if (s.phase === 'brief') return briefChoices();
  if (s.phase === 'week') return weekChoices(s);
  if (s.phase === 'answer') return answerChoices(s);
  if (s.phase === 'thursday') return thursdayChoices(s);
  if (s.phase === 'after') return afterChoices(s);
  if (s.phase === 'morning') return morningChoices(s);
  return [];
}

export function applyChapter13Choice(state: GameState, id: string): GameState {
  const choice = chapter13Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter13';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter13.${s.phase}` as NodeId, blocks: chapter13Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER13_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
