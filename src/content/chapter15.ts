/** Chapter 15 (Act III finale, own-power played as the Celebrity route) · Breaking the Leash:
 * crew → plan → vesper → archive → leash → phone → complete.
 * Design: docs/story/CHAPTER_15_BREAKING_THE_LEASH_DESIGN.md (owner-approved 2026-09-25, all seven decisions as
 * recommended); flow and flags: docs/story/scripts/CHAPTER_15_BREAKING_THE_LEASH_SCRIPT.md. Gated behind
 * chapter15Playable(), reached from an own-power Chapter 14 ending. The month before the board meets: Evelynn takes
 * the leverage away by breaking into the Vesper's archive ("I keep everything, darling"). One shared heist spine for
 * all three Chapter 14 roads (countered: Celeste's pause; complied: Sloane lost; refused: hunted, homeless). She always
 * takes Maya's forged file and her own page, and one thing more (c15.took = adrian | cards | nell | verdict); the holds
 * are broken one by one (Maya cleared; Adrian's name taken back or defused with Benton; a dead man's switch); she
 * chooses a cost Act IV remembers (c15.cost = ally | visibility | money | relationship); and the black phone ends with
 * her first message on it, "No more orders". No order, no coercion: it ends by breaking it. The optional chosen
 * evening is heat 3, consent-gated, and fades.
 * Deepening pass (2026-09-26): the crew at the table before the way in (c15.table = toast | rules | quiet); a sound on
 * the stairs in the archive, before the one thing more (c15.stairs = still | face | lamp: the young man with the laptop,
 * working late, who will nod to her at the end of the board); and more of the heist and the week after. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { eveningPartners14 } from './chapter14';

export type C15Scene = { title: string; place: string; blocks: Block[] };
export type C15Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get15 = (s: GameState, k: string) => s.choices['c15.' + k];
export const set15 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c15.' + k] = v;
};
const offer15 = (id: string, label: string, hint: string, next: string, apply?: C15Choice['apply']): C15Choice => ({
  id: 'chapter15.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter15Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER15 === '1';

function note15(s: GameState, key: string, text: string, source: string) {
  if (get15(s, 'rec.' + key) !== undefined) return;
  set15(s, 'rec.' + key, String(s.history.length));
  set15(s, 'event.' + key, String(s.revision));
  set15(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c15.' + key);
  s.knowledge.push('c15.' + key);
}

export const chapter15Definitions: Record<string, C15Scene> = {
  crew: { title: 'The Crew', place: 'THE WEEK AFTER · A BORROWED ROOM', blocks: [] },
  plan: { title: 'The Plan', place: 'WEDNESDAY · THE WALL', blocks: [] },
  vesper: { title: 'The Vesper at Night', place: 'THURSDAY · 02:00 · THE EMBANKMENT', blocks: [] },
  archive: { title: 'Everything', place: '02:40 · THE ARCHIVE', blocks: [] },
  leash: { title: 'Breaking the Leash', place: 'THE WEEK AFTER', blocks: [] },
  phone: { title: 'The Black Phone', place: 'WEDNESDAY · NIGHT', blocks: [] },
  complete: { title: 'Act III', place: 'THE WALL', blocks: [] },
};
export const chapter15Scenes = Object.entries(chapter15Definitions).map(([phase, scene]) => ({
  id: `chapter15.${phase}` as NodeId,
  ...scene,
}));

// ── What Act III left her ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const famous = (s: GameState) => !!get5(s, 'published');
const road = (s: GameState) => c(s, 'c14.answer') as 'countered' | 'complied' | 'refused' | undefined;
const irisAlly = (s: GameState) => getKey(s, 'act3.ally.iris') === 'in';
const pryceKnown = (s: GameState) => !!c(s, 'c8.pryce');
const sloaneReachable = (s: GameState) => getKey(s, 'act3.sloane') !== 'shut';
const mayaStayed = (s: GameState) => getKey(s, 'act3.maya-choice') === 'stay';
const marshAlly = (s: GameState) => getKey(s, 'act3.ally.marsh') === 'in';
const theoAlly = (s: GameState) => getKey(s, 'act3.ally.theo') === 'in' || getKey(s, 'act3.honeypot') === 'burned';
const onCrew = (s: GameState, who: string) => get15(s, 'crew.' + who) === 'yes';

/** Where the evidence goes, so that it outlives her: people in play who do not know each other. */
export function switchHolders15(s: GameState): string[] {
  const out: string[] = [];
  if (marshAlly(s)) out.push('Owen Marsh');
  if (theoAlly(s)) out.push('Theo Marr');
  if (getKey(s, 'act3.ally.nora') === 'in') out.push('Nora Linden');
  if (c(s, 'c9.lawyer') === 'retain') out.push('Nadia Brandt');
  for (const filler of ['a safe-deposit box in your own name, with a letter to open', 'a solicitor in Leeds who has never heard of Meridian', 'an old friend of Adrian’s who owes him a favour from six years ago'])
    if (out.length < 3) out.push(filler);
  return out.slice(0, 3);
}

/** Scene-specific place lines (display only). */
export function place15(s: GameState): string | undefined {
  if (s.scene !== 'chapter15') return;
  if (s.phase === 'crew' && road(s) === 'refused') return marshAlly(s) ? 'THE WEEK AFTER · A FLAT IN KENNINGTON' : 'THE WEEK AFTER · A HOTEL, UNDER ANOTHER NAME';
  if (s.phase === 'crew' && road(s) !== 'refused') return 'THE WEEK AFTER · THE FLAT';
  if (s.phase === 'vesper' && get15(s, 'way') === 'invited') return 'WEDNESDAY · 23:30 · THE VESPER';
  const evening = get15(s, 'evening-open');
  if (s.phase === 'phone' && evening)
    return evening.startsWith('julian')
      ? 'Late · Julian’s apartment'
      : evening.startsWith('theo')
        ? 'Late · Theo’s flat above the studio'
        : evening.startsWith('marsh')
          ? 'Late · A flat in Kennington'
          : 'Late · Sebastian’s hotel';
}

// ── The Crew ──

function crewBlocks(s: GameState): Block[] {
  const r = road(s);
  return [
    ...(r === 'refused'
      ? [
          p(
            marshAlly(s)
              ? 'Owen Marsh’s flat in Kennington, which is mostly a bicycle and a thousand pages of inquiry, and a spare room with a single bed and a desk he has cleared for you without being asked. The wall is on the other side of London behind a new lock.'
              : 'A hotel room near the station under a name you made up at the desk, a kettle, a view of a wall. The wall is on the other side of London behind a new lock.',
          ),
          p('So you make another. You buy index cards and a box of pins from the newsagent downstairs and you rebuild it from memory on the wardrobe door, card by card, in order, in your own hand. It takes you all night. When it is finished it is exactly the same, except that every card is new, and all of them are yours.'),
        ]
      : [p('The flat, the wall, the kettle. The card at the top that says THE BOARD MEETS. THE FIRST THURSDAY, and under it, four weeks of nothing yet.')]),
    ...(r === 'countered'
      ? [
          p('Celeste has kept her word for eight days. No orders. No black phone. No white orchids at the door. It is the longest silence since the breakfast, and it frightens you more than anything she has ever sent.'),
          ...(irisAlly(s)
            ? [q('Iris · message', 'She’s moving things, darling. Men with boxes at the Vesper, at night, twice this week. She will keep her word exactly until what she keeps is somewhere you can’t reach it. You have a week. Perhaps less.')]
            : [q('Sloane · message', 'She’s moving things. Boxes out of the Vesper at night. Her word lasts until they’re gone. You have a week.')]),
        ]
      : r === 'complied'
        ? [
            p('Sloane has not answered her phone for eight days. Her directorate says she is on leave. Her building says she has gone away. Somebody at Axiom who owes Adrian a favour from six years ago tells you, in a car park, that her passport has been taken into safe keeping, and that nobody will say by whom.'),
            p('And Celeste is kind to you. Flowers on Tuesday. A card on Thursday: So proud of you, darling. It is the kindness of a woman who thinks she has won, and it is the most dangerous thing she has ever sent.'),
          ]
        : [
            p('Axiom is looking for Adrian Vale. There has been a man in a car outside the hotel twice. Your bank card worked on Monday and did not work on Wednesday. You have a coat, a phone, the money in your purse, and a wall on a wardrobe door.'),
          ]),
    p('On the wall, in the middle, a card you wrote at three in the morning, when it came to you whole: I KEEP EVERYTHING, DARLING. She said it to you after the Claremont. She meant it as a threat. It is also an address.'),
    t('Everything she holds over me, she holds somewhere. On paper, because she likes paper. In a room, because she likes rooms. At the Vesper, because she likes to be near it. She has never once in her life needed to hide anything. That is the whole of my plan.'),
    t('I can’t do it alone. I have done everything alone. Who do I ask?'),
  ];
}

const crewAsk: Record<'iris' | 'sloane' | 'maya' | 'pryce', (s: GameState) => Block[]> = {
  iris: () => [
    p('Iris answers from the phone box with the sea behind it, and listens, and laughs, a real laugh, low and delighted.'),
    q('Iris', 'The archive. Behind the reading room. Oh, darling, I know where the safe is. I was the one who stocked it. Four years of Halvorsen’s cards, filed by page number, with my own hands.'),
    q('Iris', 'I’ll come up on the Tuesday train. Don’t tell me the plan on the phone. And buy me a pair of flat shoes, size five. I am not doing this in heels again.'),
  ],
  sloane: (s) =>
    getKey(s, 'act3.sloane') === 'handed'
      ? [
          p('It takes you two days to find her: a rented cottage on the coast, three hours from London, a car you don’t recognise in the drive. She opens the door in a jumper with the sleeves pulled over her hands and looks at you for a long time without saying anything at all.'),
          q('You', 'I need you. I know what I did. I need you anyway.'),
          q('Sloane', 'You handed me over like a parcel. I would have done the same. I told you that on the stairs. I didn’t say I’d forgive it.'),
          p('She stands in the doorway with the wind off the sea in her hair, and you watch her decide.'),
          q('Sloane', 'I’ll come. Not for you. Because she has my passport in a drawer in that building, and I would like it back, and I would like to watch her face when she finds out who took it.'),
        ]
      : [
          p('Sloane answers on the first ring, as if she had been holding the phone.'),
          q('Sloane', 'I wondered when you’d ring. The archive. Yes. I’ve never seen it. I’ve seen the invoices for its air-conditioning. It’s on the second floor, behind the reading room, and it is kept at sixteen degrees, which tells you everything about what’s in it.'),
          q('Sloane', 'I’m in. On one condition. When it’s done, you tell me what ORACLE was right about. I want to hear it from you.'),
        ],
  maya: () => [
    p('Maya comes round on the Sunday with a bag of groceries and a legal pad, and reads the wall for an hour while you cook, and at the end of it she puts her pen down.'),
    q('Maya', 'A building full of paper, run by a woman who thinks nobody will ever audit her. I’ve audited worse buildings than that one. I’ve audited Axiom.'),
    q('Maya', 'I’m coming. Don’t argue. You don’t get to protect me by leaving me outside. I’ve been outside. It’s awful.'),
  ],
  pryce: (s) => [
    p('You don’t ring Mr Pryce. You walk across the gap to the flat opposite and knock on the door he has watched yours from for two months. He opens it in his shirtsleeves, with a mug of tea, and the binoculars on the table behind him, and does not pretend.'),
    q('You', 'You have keys to the Vesper.'),
    p('He looks at you for a long time. Then he steps back and lets you in, and puts the kettle back on, and sits down at his table across from you like a man at an interview he has been expecting for years.'),
    q('Pryce', 'I drive. I don’t do the endings. I told you that. Eleven years I’ve told myself that.'),
    q(
      'Pryce',
      (c(s, 'c9.kessler') === 'follow' ? 'I drove Miss Kessler home, once. ' : '') +
        'And the one before you, the tall girl from Singapore, I drove her to the airport once, and she made me stop at a coffee stall on the way. Two sugars and cinnamon. I don’t know why that’s the thing.',
    ),
    p('He puts a ring of keys on the table between you. Old keys, brass and steel, on a loop of green ribbon.'),
    q('Pryce', 'I suppose tonight I also open doors.'),
  ],
};

function crewChoices(s: GameState): C15Choice[] {
  const asked = ['iris', 'sloane', 'maya', 'pryce'].filter((w) => onCrew(s, w));
  const second = asked.length > 0;
  const available: ('iris' | 'sloane' | 'maya' | 'pryce')[] = [];
  if (irisAlly(s) && !onCrew(s, 'iris')) available.push('iris');
  if (sloaneReachable(s) && !onCrew(s, 'sloane')) available.push('sloane');
  if (mayaStayed(s) && !onCrew(s, 'maya')) available.push('maya');
  if (pryceKnown(s) && !onCrew(s, 'pryce')) available.push('pryce');
  const labels: Record<(typeof available)[number], [string, string]> = {
    iris: ['Ask Iris', 'She knows the Vesper from the service stair up.'],
    sloane: getKey(s, 'act3.sloane') === 'handed' ? ['Go and find Sloane', 'You handed her over. Ask her anyway.'] : ['Ask Sloane', 'The officer of record. She has her own reasons.'],
    maya: ['Ask Maya', 'She stayed. She meant it.'],
    pryce: ['Knock on Mr Pryce’s door', 'The flat across the gap. He has the keys.'],
  };
  return [
    ...available.map((who) =>
      offer15('crew-' + who, labels[who][0], labels[who][1], second ? 'plan' : 'crew', (x) => {
        set15(x, 'crew.' + who);
        set15(x, 'crew', [...asked, who].join(','));
        return crewAsk[who](x);
      }),
    ),
    second
      ? offer15('crew-done', 'That’s enough', 'Two people who know is already two too many.', 'plan')
      : offer15('crew-alone', 'Ask nobody', 'You have always done it alone. Do it alone once more.', 'plan', (x) => {
          set15(x, 'crew', 'alone');
          return [t('Nobody. Everybody I ask becomes someone she can hold. I will not give her one more name.')];
        }),
  ];
}

// ── The Plan ──

function planBlocks(s: GameState): Block[] {
  const crew = ['iris', 'sloane', 'maya', 'pryce'].filter((w) => onCrew(s, w));
  return [
    p('Wednesday. The wall, turned into a plan the way Adrian used to turn a filing into a timeline: left to right, hour by hour, who stands where and what they carry.'),
    p(
      crew.length
        ? `Round your table, or your borrowed one, the people who said yes: ${crew
            .map((w) => ({ iris: 'Iris in her new flat shoes', sloane: 'Sloane with a legal pad she does not write on', maya: 'Maya with a highlighter in each hand', pryce: 'Mr Pryce, very upright, with his keys in his pocket' })[w as 'iris'])
            .join('; ')}. Nobody has ever sat round a table with you and planned a crime before. It is, you are ashamed to find, the happiest you have been in months.`
        : 'Nobody round the table but you and the wall. You talk it through out loud, both halves of the conversation, the way Adrian used to rehearse a difficult meeting in the car.',
    ),
    p('What you know: the Vesper closes at eleven. The archive is behind the reading room, on the second floor, kept at sixteen degrees. Celeste goes home at midnight unless she has a reason not to. There is a doorman who sleeps in the cloakroom on weeknights because his landlord has changed the locks on him too.'),
    p('What you don’t know: what is in the archive. Which of it you can carry. How long you have once you are inside.'),
    t('The way in. Everything else follows from the way in.'),
  ];
}

/** The crew at the table (deepening pass), before the way in. */
function tableChoices(s: GameState): C15Choice[] {
  const crew = ['iris', 'sloane', 'maya', 'pryce'].filter((w) => onCrew(s, w));
  const t15 = (id: string, label: string, hint: string, body: Block[]) =>
    offer15('table-' + id, label, hint, 'plan', (x) => {
      set15(x, 'table', id);
      return body;
    });
  return [
    t15(
      'toast',
      crew.length ? 'Raise a glass' : 'Raise a glass to the wall',
      crew.length ? 'To a crime. The first one any of you has ever planned.' : 'To the cards. They have kept you company.',
      crew.length
        ? [
            p('You find a bottle nobody remembers buying at the back of the cupboard and pour it into whatever glasses there are: a tumbler, a mug, an egg cup.'),
            ...(onCrew(s, 'iris') ? [q('Iris', 'To the service stair. Every great house has one, and nobody ever looks at it.')] : []),
            ...(onCrew(s, 'pryce') ? [q('Pryce', 'To the front door. I’ve held it open for other people for eleven years.')] : []),
            ...(onCrew(s, 'maya') ? [q('Maya', 'To audits. May every building get the one it deserves.')] : []),
            ...(onCrew(s, 'sloane') ? [q('Sloane', 'To the officer of record. May she finally be on the right one.')] : []),
            p('You drink. It is terrible. Everybody laughs, and for a moment round the table it is not a plan at all but a party, the first one you have ever given that nobody was placed at.'),
          ]
        : [
            p('You pour yourself a glass of something from the back of the cupboard and raise it to the wall, to every card on it, to every name, and drink. It is terrible. You laugh out loud in the empty kitchen, and the laugh sounds like somebody you would like to know.'),
          ],
    ),
    t15('rules', 'Lay down the rules', 'If anyone is caught, the others walk. No heroics.', [
      q('You', crew.length ? 'Rules. If anyone is caught, the others walk. Nobody comes back for anybody. Nobody says anybody else’s name, ever. If it goes wrong, it went wrong for me alone.' : 'Rules. If I am caught, I say nothing. I walk out, or I am carried out, and either way I don’t give her one name. Not one.'),
      ...(crew.length ? [p('Nobody argues. You watch each of them agree to leave you behind, and understand it is the most loyal thing anyone has ever done for you.')] : []),
    ]),
    t15('quiet', 'Say nothing, and go over it once more', 'The plan, one last time, in silence.', [
      p('Nobody says anything clever. You go over it once more, all of it, in silence, the wall and the hours and the doors, until everyone knows it the way they know their own stairs in the dark.'),
    ]),
  ];
}

function planChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'table')) return tableChoices(s);
  const way = (id: string, label: string, hint: string, body: Block[]) =>
    offer15('way-' + id, label, hint, 'vesper', (x) => {
      set15(x, 'way', id);
      return body;
    });
  return [
    ...(onCrew(s, 'iris')
      ? [
          way('iris', 'Iris’s way: the service stair', 'Housekeeping keys, two in the morning, the back of the building.', [
            q('Iris', 'The service door on the alley. The housekeeping keys are on a hook inside it, because nobody at the Vesper has ever imagined that anybody would want to come in the back. Up the service stair, through the linen room, and the reading room is the second door on the left. I’ll go first. I have always gone first.'),
          ]),
        ]
      : []),
    ...(onCrew(s, 'pryce')
      ? [
          way('pryce', 'Pryce’s way: the front door', 'His keys, at two in the morning, as if you owned the place.', [
            q('Pryce', 'The front door. Nobody watches the front door at two in the morning, because nobody who means harm uses it. We walk up to it like we own it, I open it, and we go in. If anybody asks, I’ve been sent to collect something for Ms Laurent. I’ve been sent to collect something for Ms Laurent a hundred times.'),
          ]),
        ]
      : []),
    way('window', 'The back window, alone', 'The kitchen yard, a drainpipe, a first-floor window with a broken catch. In the rain.', [
      p('You have walked past the back of the Vesper eleven times this month, in eleven different coats. There is a kitchen yard, and a drainpipe, and a first-floor window over the bins whose catch has been broken since the second time you looked, because nobody at the Vesper has ever imagined that anybody would climb in over the bins.'),
      t('Down a fire escape in heels once already. Up a drainpipe is only the same thing backwards.'),
    ]),
    ...(['iris', 'sloane', 'maya', 'pryce'].some((w) => onCrew(s, w))
      ? [
    way('invited', 'Ask Celeste for a meeting', 'Midnight at the Vesper, “to discuss the board”. The meeting is the cover. The crew is the job.', [
      p('You write your second message ever on the black phone.'),
      q('You · to C.', 'I’d like to talk about the board before Thursday. The Vesper, tonight. Midnight. Just us.'),
      p('Three dots. A long time.'),
      q('C.', 'How very grown-up of you. Midnight, then. I shall open something.'),
      t('She will sit in the reading room and talk to me, and every minute she is talking to me, she is not somewhere else. That is the whole of the trick. The oldest one there is.'),
    ]),
        ]
      : []),
  ];
}

// ── The Vesper at Night ──

function vesperBlocks(s: GameState): Block[] {
  const way = get15(s, 'way');
  const crew = ['iris', 'sloane', 'maya', 'pryce'].filter((w) => onCrew(s, w));
  return [
    p('You do not sleep on Wednesday. You lie on top of the covers in the dark with your clothes laid out on the chair like a second person, and listen to the building settle, and at one you get up and make tea you do not drink, and at half past one you start to dress.'),
    p('You dress for it the way you would for any job: dark, close, nothing that catches the light. The heels you can run in, which have been down a fire escape and a service stair and have earned their keep. Your hair up and pinned hard. In the mirror a woman who looks exactly like what she is about to be: a thief, in her own showroom.'),
    p(
      way === 'invited'
        ? 'At half past eleven the Vesper is lit in one window only, on the second floor, and the black-glass front is dark all the way down, and the embankment is empty but for you and the rain.'
        : 'At two in the morning the Vesper is dark all the way up, the black-glass front giving back the street lamps and the river and the rain, and the embankment is empty but for you.',
    ),
    ...(way === 'window'
      ? [
          p('The kitchen yard smells of wet cardboard and old oil. The drainpipe is iron and cold and slippery with the rain, and you go up it with your heels in your coat pockets and your stockings ruined in the first metre, and the window with the broken catch opens inward onto a dark linen room that smells of starch and lavender, and you are in.'),
          p('The service stair, concrete and strip lights and the hum of the building’s machinery. You go up it alone, not breathing, the way you would go up the stairs of your own house at night after hearing something.'),
        ]
      : way === 'iris'
      ? [
          p('Iris is waiting at the service door in the alley in the flat shoes, size five, and a housekeeping tabard over a black jumper, with the keys already in her hand. The hook was exactly where she said. Of course it was. She put it there.'),
          p('The service stair is concrete and strip lights and the hum of the building’s machinery, the back of the house, the part the clients are never meant to imagine. You go up it in single file, Iris first, then you, not speaking, the way people go up stairs in a hospital at night.'),
        ]
      : way === 'pryce'
        ? [
            p('Mr Pryce walks you up to the front door as if he were delivering you to a party, and puts his key in the lock, and turns it, and the door that has always opened before you touched it opens because you have touched it, and that is somehow the most shocking thing about the whole night.'),
            p('The long room in the dark. The empty frames catch the street light from the embankment and hold it, twenty gilt rectangles of nothing, hung in a row, lit by the rain. You walk down the length of it between them and your heels are very loud on the floor.'),
          ]
        : [
            p('The doorman opens the door for you, the same young man in the same black suit, and says, “She’s upstairs,” and does not look at the woman walking twenty metres behind you along the embankment, or at the service door in the alley, where somebody you trust is waiting for the light in the reading room window to go from one lamp to two.'),
            p('Celeste is in the reading room with a bottle of something very old open on the lectern beside The Autumn Collection, and two glasses, and she stands when you come in, and kisses you on both cheeks, and smells of that green, bitter stem.'),
            q('Celeste', 'Sit, darling. Tell me what you would like to say to my board. I have been so looking forward to it.'),
          ]),
    ...(crew.length ? [] : [t('Alone. Every sound in this building is mine to answer for. Good. That is how I would have wanted it, if anybody had asked me.')]),
    p(
      way === 'invited'
        ? 'You talk. You talk about the board, and about Thursday, and about what you might be persuaded to say and not say, and she listens with her head on one side and her glass in her hand, delighted, and all the time you are counting in your head, the way Adrian counted floors: four minutes, five, six.'
        : 'The reading room. The blinds down, the lamp off. The lectern with The Autumn Collection on it, a shape in the dark. And behind it, where the panelling runs from the floor to the ceiling in long dark boards, one board that is a door, without a handle, that you would never have seen if you had not been looking for it for a month.',
    ),
    p(
      way === 'invited'
        ? 'At seven minutes Celeste puts her glass down, and looks at her watch, and says, “Do excuse me, darling, I have left something in the other room,” and stands, and turns towards the panelling behind the lectern.'
        : 'And then, from the stairs below, a sound: a door, and a man’s voice, thick with sleep, saying, “Hello? Who’s there?”',
    ),
  ];
}

function snagChoices(s: GameState): C15Choice[] {
  const invited = get15(s, 'way') === 'invited';
  const snag = (id: string, label: string, hint: string, body: Block[]) =>
    offer15('snag-' + id, label, hint, 'archive', (x) => {
      set15(x, 'snag', id);
      return body;
    });
  return [
    snag(
      'talk',
      invited ? 'Keep her talking' : 'Go down and talk to him',
      invited ? 'Ask her something she can’t resist answering.' : 'Charm him. You are very good at this.',
      invited
        ? [
            q('You', 'Before you go. The first one you ended. In Lisbon. Did he know?'),
            p('She stops with her hand on the panelling. She turns. It is the only question in the world she cannot leave unanswered, because it is about her.'),
            q('Celeste', 'He knew at the very end. They always do. It is the only moment of real intimacy in the whole business, darling, and nobody ever warns you how much you will miss it.'),
            p('She talks for eleven minutes. You let her. In the eleventh your phone buzzes once against your thigh, the signal that the alley door is unlocked and the hook is empty, and you stand, and thank her for the drink, and say you will see her on Thursday, and she kisses you on both cheeks again and never once goes back to the panelling.'),
            p('At midnight she goes home, as she always does. At two you come back in through the alley, and the panelling behind the lectern opens under your hand.'),
          ]
        : [
            p('You go down the stairs into the torch beam with your hands open and your best smile, the one from the station poster, and the doorman, in a vest and socks with a blanket round his shoulders, lowers the torch and stares.'),
            q('Doorman', 'Ms Vale?'),
            q('You', 'I left my earring in the reading room on Thursday. Ms Laurent said I could collect it. I’m so sorry to wake you. Go back to sleep. I’ll let myself out.'),
            p('He looks at you, and at the hour, and at the smile, and decides, as men have decided in front of that smile since long before it was yours, that it is none of his business. He goes back to the cloakroom. You hear him lie down among the coats.'),
          ],
    ),
    snag(
      'hide',
      invited ? 'Get there first' : 'Hide among the coats',
      invited ? 'Stand in front of the panelling. Make her go round you.' : 'The cloakroom. The rows of coats in the dark.',
      invited
        ? [
            p('You get up first, quickly, and cross the room and stand with your back to the panelling, as if you were looking at the lectern, and turn The Autumn Collection’s pages with one finger, and find page seven, and look at yourself.'),
            q('You', 'Do you ever look at them all? At night, when everyone’s gone?'),
            p('She comes and stands beside you to look, as you knew she would, and forgets the other room, and turns the pages with you one by one, telling you about each face, and you stand there with a woman you are robbing, reading her catalogue over her shoulder, until your phone buzzes against your thigh.'),
            p('At midnight she goes home, as she always does. At two you come back in through the alley, and the panelling behind the lectern opens under your hand.'),
          ]
        : [
            p('You go down the stairs the other way, into the cloakroom, and in among the coats, the long rows of them hanging in the dark, fur and wool and cashmere, and stand very still with somebody else’s sleeve against your face.'),
            ...(c(s, 'c7.robe') === 'coats'
              ? [p('Next to you, on a hook with a brass tag, number 41: her coat. The first one’s. You stand beside it in the dark, shoulder to shoulder, like two women waiting for a taxi, while the torch beam goes past the end of the row and comes back and goes away.')]
              : [p('The torch beam goes past the end of the row, and stops, and comes back, and goes away. You hear him grumble about foxes, and a door, and the creak of a camp bed.')]),
          ],
    ),
    snag(
      'bold',
      invited ? 'Let her go, and follow her' : 'Keep going, and let him see you',
      invited ? 'Whatever is behind that panel, you want to see her open it.' : 'You are not hiding in your own showroom.',
      invited
        ? [
            p('You let her go. She presses the panelling and it opens inward on a dark room and a breath of cold air, sixteen degrees, and she goes in and turns on a lamp, and you are behind her in the doorway before she has turned round.'),
            p('She sees you. For one second her face is entirely empty. Then it fills again, with something that might, in anybody else, be admiration.'),
            q('Celeste', 'Well. Now you have seen where I keep things. Nothing in there goes anywhere, darling. It is kept at sixteen degrees, and so am I.'),
            p('She shuts the panel on the cold and the lamp, and presses it once until it clicks, and you watch exactly where her hand goes. At midnight she goes home, as she always does. At two you come back in through the alley, and press the panelling exactly where she did.'),
          ]
        : [
            p('You don’t hide. You keep going up the stairs, into the reading room, and turn on the lamp, and let the light fall down the stairwell onto the doorman in his vest, and look down at him over the banister.'),
            q('You', 'Go back to bed, Tomasz. You never saw me. I never saw you sleeping on the job. We’re both going to need references.'),
            p('He looks up at you for a long moment. Then he nods, once, and goes back to bed. You did not know his name until you said it. You read it on a laundry tag on his blanket, upside down, in the dark.'),
          ],
    ),
  ];
}

// ── Everything ──

function archiveBlocks(s: GameState): Block[] {
  return [
    p('The archive is a narrow room, longer than it is wide, lit by one lamp on a steel desk at the end, and cold as a church: sixteen degrees exactly, Sloane was right. On both sides, from the floor to the ceiling, grey steel cabinets, every drawer with a small brass frame on the front and a card in it, and on every card a number.'),
    p('Page numbers. From The Autumn Collection, and the collections before it: spring, summer, autumn, winter, going back years. A drawer for every face that was ever on a page.'),
    t('I keep everything, darling. She does. Every life in the collection, and every lever on every life, in drawers, in order, kept cold.'),
    p('You open one at random. A woman’s face, a photograph clipped to a folder: a placement in Geneva, four years, a note in green ink about her mother’s care home and who pays for it. You close it, very gently, the way you would close a door on somebody sleeping.'),
    p('Page seven has its own drawer. Inside it: everything. The Aster photograph. The breakfast. Every message on the black phone, printed and dated. A floor plan of your flat, with the fire escape marked in red, and the date it was marked, which is the week you moved in. A card with a single line in the green hand: Controllability: low. Delightful.'),
    p('And at the very back of page seven’s drawer, in its own folder, the people round the person: MAYA REYES. The forged emails, in drafts, with the tracked changes still on: somebody practising Maya’s phrases, Maya’s sign-off, getting her voice right over three weeks. The name of the man who wrote them is on every draft, because Meridian keeps everything, even that.'),
    p('You take Maya’s folder. You take page seven: you go out to the lectern in the dark and tear your own page out of The Autumn Collection, slowly, along the spine, the way you would take a splinter out of a child’s hand, and fold it into your pocket.'),
    t('There is time for one thing more. Only one. The clock in my head says so, and I have learned to believe it.'),
    p('And then, below, on the stairs: a sound.'),
  ];
}

/** A sound on the stairs (deepening pass), before the one thing more. */
function stairsChoices(): C15Choice[] {
  const st = (id: string, label: string, hint: string, body: Block[]) =>
    offer15('stairs-' + id, label, hint, 'archive', (x) => {
      set15(x, 'stairs', id);
      return body;
    });
  return [
    st('still', 'Lamp off. Don’t move.', 'Stand in the dark between the cabinets and wait.', [
      p('You turn off the lamp and stand in the dark between two cabinets with your back against cold steel and your hand over your own mouth.'),
      p('Footsteps on the stairs. A torch beam under the panelling, a line of light across the floor. It stops. It stays. You count, the way Adrian counted floors in a lift: eleven, twelve, thirteen. Then it moves on, and the footsteps go back down, and you breathe out for what feels like the first time in a minute.'),
    ]),
    st('face', 'Face whoever it is', 'Lamp on. Let them see you.', [
      p('You leave the lamp on and turn round and wait, and the panelling opens, and it is not a guard. It is a young man with very good hair and a laptop under his arm, in shirtsleeves at three in the morning, who has plainly come up to fetch something and plainly never expected to find anybody here.'),
      p('He looks at you. He looks at the open drawers, and the torn catalogue, and the folder under your arm. You watch him recognise your face from page seven.'),
      q('The young man', 'I catalogue them. That’s my job. Four years. I’ve never once met one.'),
      p('He stands there a long time. Then he takes one step back, out of the doorway, and says, very quietly, “I was never up here,” and goes back down the stairs, and you hear him not running.'),
      t('Somebody in this building has been reading the pages. I wonder what it has cost him.'),
    ]),
    st('lamp', 'Turn the lamp on the door', 'Blind them, and be gone behind it.', [
      p('You swing the desk lamp round on its arm so that it points straight at the panelling, and when it opens, whoever it is walks into a wall of white light and throws up an arm, and says “Jesus,” and you are already past them, flat against the wall of the stairwell in the dark, and they never see anything but the lamp.'),
      p('By the time they have found the switch, you are back inside, and they have decided it was the timer, and gone.'),
    ]),
  ];
}

function archiveChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'stairs')) return stairsChoices();
  const took = (id: string, label: string, hint: string, body: Block[], after: (x: GameState) => void) =>
    offer15('took-' + id, label, hint, 'leash', (x) => {
      set15(x, 'took', id);
      setKey(x, 'act3.page', 'torn');
      set15(x, 'maya-file', 'yes');
      note15(x, 'maya-file', 'The Meridian archive held the drafts of the emails used to charge Maya Reyes, with tracked changes and the writer’s name on every draft.', 'The archive at the Vesper, page seven’s drawer');
      after(x);
      return body;
    });
  return [
    took('adrian', 'Adrian’s file', 'The clinic, the fitting, the name. Nobody spends it again.', [
      p('A drawer of its own, behind page seven’s, with no number on it, only a name typed on the card: VALE, A. The clinic’s records. The fitting. The before and the after, in photographs you do not look at. Every document that could ever be put on a desk in front of Axiom, or a newspaper, or Maya, to say who you were.'),
      p('You take all of it. It is heavier than you expected. A whole man, in a folder, under your arm.'),
      t('Nobody spends Adrian again. Not her, not Axiom, not me.'),
    ], (x) => {
      setKey(x, 'act3.adrian', 'hers');
      note15(x, 'adrian-file', 'Evelynn took Adrian Vale’s file out of the Meridian archive: the clinic’s records and every document that ties the name to her.', 'The archive at the Vesper');
    }),
    took('cards', 'The 1109 safe', 'Every placement filmed in that room, for Marsh and the Authority.', [
      p('The safe is in the corner, set into the wall, a heavy old thing with a dial. ' + (onCrew(s, 'iris') ? 'Iris opens it in forty seconds with her eyes closed. “Halvorsen’s birthday,” she says. “He never knew she used it.”' : 'The combination is on a card taped to the underside of the desk, in green ink, because Celeste has never once imagined anybody in this room but herself.')),
      p('Inside, in rows, in small labelled envelopes: memory cards. Months of 1109. Years of it. Every placement filmed behind that mirror, and everybody they were placed with.'),
      p('You empty it into a housekeeping bag. It weighs almost nothing. It is the heaviest thing you have ever carried.'),
    ], (x) => {
      setKey(x, 'act3.cards', 'taken');
      note15(x, 'cards', 'Evelynn emptied the archive safe: years of memory cards from the camera behind the mirror in suite 1109.', 'The archive at the Vesper');
    }),
    took('nell', 'Nell’s file', 'The first one. Whatever they kept.', [
      p('Nell has a drawer. Of course she has. Page seven, the spring collection, four years ago, and a card with a line through the number and a word written over it in green ink: returned.'),
      p('Inside, eight years of a life, in placements. And near the back, on Meridian’s cream paper, a single order, dated fourteen months ago: the release of E. L.’s true name to named parties in Jakarta, authorised at board level, with one signature. C.'),
      p('There is nothing about the harbour. Nothing about the week after. Only a gap in the file where the next page would be, and the faint ghost of a staple.'),
      t('The burn, signed. Not the death. The death, somebody took out of this drawer. Somebody who knew what I would be looking for.'),
    ], (x) => {
      setKey(x, 'act3.nell-order', 'taken');
      note15(x, 'nell-order', 'Nell’s archive file holds the order releasing her true name to named parties in Jakarta, authorised at board level with one signature: C. The pages after it are missing.', 'The archive at the Vesper');
    }),
    ...(road(s) === 'complied'
      ? [
          took('verdict', 'The verdict, back', 'The paper Sloane carried for a year, and you handed over.', [
            p('It is on the steel desk, in the folder you gave her, under a paperweight shaped like an orchid. She has not even put it away. She did not think she needed to.'),
            p('You take it back. You take Sloane’s passport too, from the drawer marked with no number and a single word: Victoria.'),
          ], (x) => {
            setKey(x, 'act3.verdict', 'retaken');
            set15(x, 'passport', 'yes');
          }),
        ]
      : []),
  ];
}

// ── Breaking the Leash ──

function leashBlocks(s: GameState): Block[] {
  const r = road(s);
  const took = get15(s, 'took');
  const maya = getKey(s, 'act3.maya-choice');
  const holders = switchHolders15(s);
  return [
    p('The week after is a list. You do it the way Adrian did a close-out: one line at a time, in order, and you do not let yourself feel anything until every line is ticked.'),
    p('Maya. The drafts, with the tracked changes and the writer’s name, go to ' + (c(s, 'c9.lawyer') === 'retain' ? 'Nadia Brandt, who reads them in her office above the locksmith’s with her glasses pushed up into her hair and says, “Oh, this is beautiful,” as if you had brought her flowers.' : marshAlly(s) ? 'Owen Marsh’s office and to Maya’s own solicitor on the same morning.' : 'Maya’s solicitor and to the police officer who charged her, on the same morning, by hand.') + ' By Friday the charge is withdrawn. By the Monday after, Axiom has written to Maya, very carefully, to say that her clearance is restored and her interview rescheduled, and that they regret any distress.'),
    q(
      'Maya · message',
      maya === 'stay'
        ? '“Regret any distress.” I’m going to have it framed. Dinner. You’re paying. I’m ordering the lobster, and I don’t even like lobster.'
        : maya === 'away'
          ? 'Got the letter in Leeds. I sat on my sister’s stairs and cried like an idiot. Coming home Sunday. You owe me the whole story. The whole one.'
          : 'They withdrew it. All of it. I don’t know what you did. I know it was you. Thank you. I’m still angry. Both things.',
    ),
    ...(r === 'refused'
      ? [
          p('Adrian. You meet Elias Benton in a café near Axiom, at a table at the back, at eight in the morning. He comes alone, which surprises you, and looks at your face for a long time before he sits down, and does not say the name.'),
          p('You put the ORACLE verdict on the table between the cups: the product, the defect, the board that sold it to Axiom knowing. He reads it twice, the way Celeste did.'),
          q('Benton', 'If this is true, Axiom was sold something its maker knew wouldn’t hold. By a board that included the woman who has just told us where to find it.'),
          q('You', 'It’s true. And if Axiom hunts me, it has to explain to its own board why it bought me.'),
          p('He folds the paper and gives it back to you, and pays for both coffees, and stands.'),
          q('Benton', 'The review is closed. Nobody at Axiom is looking for anybody. Good luck on Thursday, whoever you are.'),
          ...(took === 'adrian' ? [] : [t('Defused, not unsaid. Axiom knows. It has decided not to have known. That is as good as a name gets, in this line of work.')]),
        ]
      : took === 'adrian'
        ? [p('Adrian. His file is in a safe-deposit box at a bank whose name you will not write down even on the wall. Nobody can put it on anybody’s desk again. For the first time since the clinic, the name is yours to spend, or never spend at all.')]
        : [p('Adrian. The name is still Celeste’s to spend. She has it in her head, if not in a drawer. You know that. You have decided you can live with one thing in her hand, for four more days.')]),
    p(`The evidence. Three copies of everything, to three people who do not know each other: ${holders.join('; ')}. Each with the same letter, in your own hand: If you have not heard from me by the Friday after the board, open this, and do what it says.`),
    ...(getKey(s, 'act3.sloane') === 'handed'
      ? [
          p(
            get15(s, 'passport') === 'yes'
              ? onCrew(s, 'sloane')
                ? 'Sloane. You put her passport into her hand in the alley behind the Vesper at three in the morning, still cold from the archive. She looks at it for a long time. She does not thank you. She says, “Thursday, then,” and that is better.'
                : 'Sloane. You drive to the coast yourself and put her passport into her hand on the doorstep. She looks at it for a long time. She does not thank you. She says, “Thursday, then,” and that is better.'
              : 'Sloane. She is back in London, on leave, in a flat you are not given the address of. She rings you once, late, and says only, “Thursday. I’ll be there. Not for you,” and rings off.',
          ),
        ]
      : [p('Sloane. She has her own copy of the verdict, and her own reasons, and her own seat on Thursday, if she wants it. She rings every night at ten, for exactly two minutes, like a woman checking a lock.')]),
    t('And one line on the list I have not ticked. What this costs. Nothing like this comes free, and she taught me that, and I am going to pay it myself, on purpose, before she can send me the bill.'),
  ];
}

function leashChoices(s: GameState): C15Choice[] {
  const partners = eveningPartners14(s);
  const allyName = irisAlly(s) ? 'Iris' : marshAlly(s) ? 'Owen Marsh' : 'Sloane';
  const partnerName = partners.includes('julian') ? 'Julian' : partners.includes('theo') ? 'Theo' : partners.includes('marsh') ? 'Owen' : 'Maya';
  const cost = (id: string, label: string, hint: string, who: string, body: Block[]) =>
    offer15('cost-' + id, label, hint, 'phone', (x) => {
      set15(x, 'cost', id);
      set15(x, 'cost-who', who);
      setKey(x, 'act3.cost', id);
      setKey(x, 'act3.leash', 'broken');
      if (getKey(x, 'act3.maya-status')) setKey(x, 'act3.maya-status', 'cleared');
      if (road(x) === 'refused' && getKey(x, 'act3.adrian') !== 'hers') setKey(x, 'act3.adrian', 'defused');
      if (!getKey(x, 'act3.adrian')) setKey(x, 'act3.adrian', 'held');
      setKey(x, 'act3.switch', 'set');
      note15(x, 'cost', `What breaking the leash cost Evelynn: ${label.toLowerCase()}.`, 'Her own choice, the week before the board');
      return body;
    });
  return [
    cost('ally', `Spend an ally: ${allyName}`, 'Burn someone who stood beside you, to make the rest hold.', allyName, [
      p(
        allyName === 'Iris'
          ? 'Iris’s name goes on the evidence, as the source of the 1109 cards and the safe. It has to, or none of it will stand up. By Wednesday she is in every paper as Halvorsen’s former chief of staff, and by Thursday she has left the country, again, for good this time, with a postcard: Worth it. Mostly. — H.'
          : allyName === 'Owen Marsh'
            ? 'Owen Marsh takes the evidence public before his minister can stop him, because you ask him to, because it needs a name on it that people trust. By Wednesday his inquiry has been taken away from him and given to somebody safer, and he is on the pavement outside the Authority with his bicycle and a cardboard box, telling a camera that he has no regrets.'
            : 'Sloane goes on the record, under her own name, as Axiom’s officer of record for Project Eve. It will end her career, and she knows it, and she does it anyway, in a room at the Authority with a tape recorder and a glass of water, and afterwards rings you from the street and says, “There. Now we’re quits.”',
      ),
      t(`I spent ${allyName}. I will be paying it back for the rest of my life, and I would do it again, and both of those are true.`),
    ]),
    cost('visibility', 'Spend your privacy', famous(s) ? 'Say the word Meridian on air, as the face from the station.' : 'Say it in public, under your own name, and never be private again.', 'visibility', [
      p(theoAlly(s) ? 'Theo gives you the whole of Tuesday night’s show.' : 'A late show you have never done gives you seven minutes on Tuesday night, because your agent rings them and says the word exclusive.'),
      p('You sit under the lights in the green, with your hair up and your hands still in your lap, and look down the lens the way you looked down it for the station poster, six metres high, and say it: Meridian Holdings. A private company that sells people. That sold me. That is on your television now, and in your pension, and in your minister’s office.'),
      p('You do not say Adrian. You do not say Celeste. You say Meridian eleven times in seven minutes, and by midnight it is the most searched word in the country.'),
      t('Public, protected, and never private again. She made me famous so that she could sell me. Fine. Now everyone is looking.'),
    ]),
    cost('money', 'Spend everything you have', 'The lawyers, the advance, the campaign. Broke, and free.', 'money', [
      p((c(s, 'c9.lawyer') === 'retain' ? 'You pay Nadia Brandt, and the solicitor,' : 'You pay the solicitor,') + ' and the man who knows banks, and you pay Odile back every penny of the Laurent advance with a note that says only: Tell them I’m not for sale. You walk away from the campaign, and the next one, and the money that was coming in thirty days.'),
      p('On Wednesday morning you have four hundred pounds, a coat, a very good pair of heels, and nothing that anybody can take away from you, because there is nothing left to take.'),
      t('Broke, and free. Adrian never once in his life was both at the same time. It feels like flying.'),
    ]),
    cost('relationship', `Spend what you have with ${partnerName}`, 'The one that hurts.', partnerName.toLowerCase(), [
      p(
        partnerName === 'Julian'
          ? 'Helix is a Meridian client. You knew that. So did Julian. When the evidence goes to the Authority, Helix’s deal goes with it, eighteen months of his work, and he comes to your door on Tuesday night and stands in the rain and does not come in.'
          : partnerName === 'Theo'
            ? 'Theo has the story of his life on his desk, and your name is the only thing standing between it and the air. You ask him not to run it. He looks at you for a long time across the studio, and then he says, “I can’t not,” and you both know that is the end of something.'
            : partnerName === 'Owen'
              ? 'Owen can protect his inquiry, or he can protect you, and not both. You make him choose the inquiry. He hates you for it, a little, and he is right to.'
              : 'Maya can stay safe, or she can stay near you, and not both. You ask her to go to Leeds until it is over, and not to ring, and she goes, white-faced, without hugging you at the door.',
      ),
      q(
        partnerName === 'Julian' ? 'Julian Mercer' : partnerName === 'Theo' ? 'Theo Marr' : partnerName === 'Owen' ? 'Owen Marsh' : 'Maya',
        partnerName === 'Julian'
          ? 'I would have given it up for you. I would have liked to be asked. That is the whole of it.'
          : partnerName === 'Theo'
            ? 'I’ll keep your name out. I won’t keep the rest. I’m sorry. I think I’m sorrier than you are.'
            : partnerName === 'Owen'
              ? 'You were right. I know you were right. Give me a while to stop minding.'
              : 'Fine. Leeds. And when this is over you had better be alive to be forgiven, because I’m not doing it at a funeral.',
      ),
      t('The one that hurts. I chose it because it hurts. If it didn’t, it wouldn’t be a price.'),
    ]),
  ];
}

// ── The Black Phone ──

function phoneBlocks(): Block[] {
  return [
    p('Wednesday night. The eve of the board.'),
    p('A week of lists, ticked. The flat is very quiet. The wall has more on your side of it than hers, for the first time since you pinned the first card up. You stand in front of it for a long time with your arms folded, the way Adrian used to stand in front of a finished filing, not reading it, only looking at the shape of it.'),
    p('The black phone on the kitchen table, with its one contact, where it has sat every night since the breakfast, lighting when it chose and never once when you did. You pick it up. For the first time since it arrived, you write the first message.'),
    q('You · to C.', 'No more orders.'),
    p('Nothing, for a long time. The kitchen clock. The rain. A bus going by, lit and empty. Then three dots, and nothing, and three dots again.'),
    q('C.', 'Then Thursday. Come as whoever you like, darling. I should warn you that I shall be there as myself.'),
    p('You read it twice. It is the first message she has ever sent you that is not an order, or a threat, or a present. It is a woman telling you where she will be standing.'),
    t('She knows. The next time we are in a room together is the last time, and she knows it, and she has just told me so in the only language she has.'),
  ];
}

function eveningInvite15(partner: 'julian' | 'theo' | 'sebastian' | 'marsh'): Block[] {
  if (partner === 'julian')
    return [
      p('Julian rings at ten, and says only, “The car is downstairs, if you want it. It is also fine if you don’t.”'),
      q('Julian Mercer', 'The night before, I always used to sit up alone. I would rather not, tonight. Tell me what you want, and that’s what happens.'),
    ];
  if (partner === 'theo')
    return [p('Theo sends a photograph of two glasses and a bottle, and one line: “No questions. Not one. Door’s open.”'), q('Theo Marr', 'Tell me what you want tonight.')];
  if (partner === 'sebastian')
    return [
      p('Sebastian is back for one night between cities, his message says, in the hotel with the piano nobody is allowed to play.'),
      q('Sebastian', 'Come and hear me not play it. Whatever you want tonight. Nobody gets to buy any of it.'),
    ];
  return [
    p('A message in the careful hand of a man who writes everything down: “Toast. One in the morning. Kennington. Only if you want to.”'),
    q('Owen Marsh', 'No mirrors in my flat. I checked.'),
  ];
}
const scope15: Record<'julian' | 'theo' | 'sebastian' | 'marsh', Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that is the night. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  theo: { 'no-sex': 'Then that’s what we do. I’m very good at wanting things I don’t get.', sex: 'Yes. And the moment you want to stop, we stop.' },
  sebastian: { 'no-sex': 'Good. I would like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
  marsh: { 'no-sex': 'Good. I would like that more than I can tell you. You say stop and I stop.', sex: 'Yes. Is this all right? I am still going to keep asking.' },
};
const stay15: Record<'julian' | 'theo' | 'sebastian' | 'marsh', Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He holds you by the window with the whole city lit below, his chin on your hair, and kisses you once, slowly, and stops exactly where you tell him to, and you stand there until the lights start going out across the river one by one.')],
    sex: [p('He undresses you slowly by the window, and asks once more, low, with his mouth at your shoulder. You answer by drawing him down with you.'), p('What happens next is yours and his, and nobody is holding anything over either of you. The scene fades.')],
  },
  theo: {
    'no-sex': [p('He kisses you on the sofa with the bottle between your feet, and when you tell him where tonight stops he says “good” and means it, and you fall asleep against him with his glasses still on.')],
    sex: [p('For once he says nothing clever at all. He asks once more, low. You answer by pulling him down with you.'), p('What happens next is yours and his. The scene fades.')],
  },
  sebastian: {
    'no-sex': [p('He undoes your dress slowly and says out loud what he likes about what he finds, and stays on his side of the line you drew, and at three in the morning plays the forbidden piano very quietly, just for you.')],
    sex: [p('He undoes your dress slowly and says out loud what he likes. The lamp stays on. When he asks once more whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his. The scene fades.')],
  },
  marsh: {
    'no-sex': [p('He kisses you in his tiny kitchen next to the bicycle on the wall, carefully, and stops exactly where you say, and makes toast at one in the morning, and you eat it sitting on his counter in your stockinged feet.')],
    sex: [p('In the flat in Kennington, with no mirror anywhere, he kisses you slowly and asks once more, off no microphone at all. You answer by pulling him down with you.'), p('What happens next is yours and his, and for once nobody is filming it. The scene fades.')],
  },
};

function phoneChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'phone')) {
    const done = (id: string, label: string, hint: string, body: Block[]) =>
      offer15('phone-' + id, label, hint, 'phone', (x) => {
        set15(x, 'phone', id);
        setKey(x, 'act3.black-phone', id);
        return body;
      });
    return [
      done('return', 'Send it back to her', 'In the Vesper’s own orchid box, with nothing written on the card.', [
        p('You put it in the box the orchids came in, the Vesper’s mark on the lid, and tie the black ribbon, and ring the courier, and write nothing on the card. It goes at seven in the morning. You watch the van all the way to the end of the street.'),
        t('Returned to inventory. Let her see how it feels.'),
      ]),
      done('river', 'Drop it in the river', 'From the bridge, where the envelope went.', [
        p('You walk to the bridge where you tore up the envelope on the first Thursday, and stand at the rail, and turn the black phone over in your hand one last time. It lights, as if it knew. You drop it. It goes into the black water without a sound, still lit, a small square of light going down and down and out.'),
        t('No more orders. Not even the ones I might have obeyed.'),
      ]),
      done('keep', 'Switch it off and keep it', 'In a drawer. Evidence. Every message she ever sent.', [
        p('You hold the button down until the screen goes black, and put it in a freezer bag, and the freezer bag in the drawer with Nell’s shoes and the café receipt and the cloakroom ticket, and shut the drawer.'),
        t('Every message she ever sent me, and one I sent her. Thursday, it goes on the table.'),
      ]),
    ];
  }
  const open = get15(s, 'evening-open') as string | undefined;
  if (open) {
    const partner = open.replace('-room', '') as 'julian' | 'theo' | 'sebastian' | 'marsh';
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer15(`evening-${partner}-${id}`, label, hint, 'phone', (x) => {
          set15(x, 'evening-open', partner + '-room');
          set15(x, 'evening-scope', id);
          note15(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); he agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q({ julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian', marsh: 'Owen Marsh' }[partner], scope15[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer15('evening-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c15.evening-open'];
          set15(x, 'evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and walk home alone through the rain the night before the board, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get15(s, 'evening-scope') as 'no-sex' | 'sex';
    return [
      offer15('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c15.evening-open'];
        set15(x, 'evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and sits up with you instead until it is light, and does not ask for anything.')];
      }),
      offer15('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c15.evening-open'];
        set15(x, 'evening-outcome', 'intimate-' + scope);
        return [...stay15[partner][scope], p('The first night in months with nobody holding anything over you. You chose how to spend it.')];
      }),
    ];
  }
  const name = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian', marsh: 'Owen' };
  const spent = get15(s, 'cost') === 'relationship' ? get15(s, 'cost-who') : undefined;
  return [
    ...eveningPartners14(s)
      .filter((pt) => name[pt].toLowerCase() !== spent)
      .map((partner) =>
        offer15('evening-' + partner, `Go to ${name[partner]}`, 'The night before. A night you choose.', 'phone', (x) => {
          set15(x, 'evening', partner);
          set15(x, 'evening-open', partner);
          return eveningInvite15(partner);
        }),
      ),
    offer15('night-alone', 'Spend the night alone', 'Chapter 15 ends here.', 'complete', () => [
      p('You spend the night alone, at the kitchen table, with the wall, and a pot of tea, and nothing lighting up anywhere. At four in the morning you realise you have been listening for the black phone for an hour, out of habit, and that it is never going to light again, and you laugh out loud in the empty kitchen.'),
    ]),
  ];
}

// ── Act III ──

function completeBlocks(s: GameState): Block[] {
  return [
    p(road(s) === 'refused' ? 'The wardrobe door in the borrowed room. The wall you rebuilt from memory.' : 'The wall.'),
    p('You move the cards one by one, the way you pinned them: slowly, in order. Maya’s clearance, from her side of the door to yours. The charge. Page seven, which you pin up for real now, the actual page, torn along the spine. The black phone. Adrian’s name, if it is yours to move. The placement date. Every card on Celeste’s side, across the gap, to Evelynn’s.'),
    p('When you have finished there is only one card left on her side. At the top, where it has been for a month, in your own capitals: THE BOARD MEETS. THE FIRST THURSDAY.'),
    p('Tomorrow.'),
    t('She held everything. Now I do. Thursday, I find out what that’s worth.'),
  ];
}

// ── Blocks and choices ──

export function chapter15Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter15') return [];
  if (s.phase === 'crew') return crewBlocks(s);
  if (s.phase === 'plan') return planBlocks(s);
  if (s.phase === 'vesper') return vesperBlocks(s);
  if (s.phase === 'archive') return archiveBlocks(s);
  if (s.phase === 'leash') return leashBlocks(s);
  if (s.phase === 'phone') return phoneBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter15Choices(s: GameState): C15Choice[] {
  if (!chapter15Playable(s)) return [];
  if (s.scene === 'chapter14' && s.phase === 'complete' && ownPower(s))
    return [offer15('begin', 'The last month', 'Four weeks until the board. Take it all back.', 'crew')];
  if (s.scene !== 'chapter15') return [];
  if (s.phase === 'crew') return crewChoices(s);
  if (s.phase === 'plan') return planChoices(s);
  if (s.phase === 'vesper') return snagChoices(s);
  if (s.phase === 'archive') return archiveChoices(s);
  if (s.phase === 'leash') return leashChoices(s);
  if (s.phase === 'phone') return phoneChoices(s);
  return [];
}

export function applyChapter15Choice(state: GameState, id: string): GameState {
  const choice = chapter15Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter15';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter15.${s.phase}` as NodeId, blocks: chapter15Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER15_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
