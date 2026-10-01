/** Chapter 15 (Outside route, lane id `outside`) · The Courier's Door:
 * chart → approach → shelves → reckon → vigil → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_15_THE_COURIERS_DOOR_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_15_SCRIPT.md. The shared archive heist in Outside framing: the
 * Vesper archive entered by the courier's door. Rafe delivered to the Vesper for ten years, and knows the river-side service
 * door, the florists at five, the alarm's blind minute and which cabinet is hers. The crew (one or two: Rafe unless she cut him,
 * Maya, Marsh if turned, Iris if warned). The ways in (the courier's door; the kitchen stair, from the layout or from Iris;
 * a meeting with Celeste as cover, always). The snag. The archive: her page, and the drawer that matters on this road, LINDEN,
 * E.: the Jakarta order, signed C., which proves the burn and not the death, and clipped to it a booking slip: ROTTERDAM ·
 * COURIER · R. L. · SATURDAY · AUTH. C. (give it to Rafe now / hold it for the room); and one thing more (Adrian's file / the 1109
 * cards / LIM, R., his own file). The holds broken; one cost (an ally / her face / money / Rafe stepping forward on the record).
 * "No more orders." "I shall be there as myself." The phone; a chosen night (Rafe only if he has told her and she did not cut him;
 * a partner from before; Maya; alone). The cause of Nell's death is not told here (Act IV, Ch17). Entered from an Outside
 * `chapter14.complete`; ends at the Act IV in-development stop, having written the shared Act III keys. Keys `out.*`, `act3.*`,
 * `c15.*`; ids carry `o15-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C15Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get15 = (s: GameState, k: string) => s.choices['c15.' + k];
const set15 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c15.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C15Choice['apply']): C15Choice => ({ id: 'chapter15.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get15(s, 'rec.' + k) !== undefined) return;
  set15(s, 'rec.' + k, String(s.history.length));
  set15(s, 'event.' + k, String(s.revision));
  set15(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c15.' + k);
  s.knowledge.push('c15.' + k);
}

export const OUTSIDE_PHASES15 = ['chart', 'approach', 'shelves', 'reckon', 'vigil'] as const;
export const isOutside15 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase15 = (s: GameState) => isOutside15(s) && ((OUTSIDE_PHASES15 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const way14 = (s: GameState) => key(s, 'out.way14') as 'keep' | 'cut' | 'trust' | undefined;
const rafeIn = (s: GameState) => way14(s) !== 'cut' && !!key(s, 'out.told');
const toldNight = (s: GameState) => !!key(s, 'out.told') && way14(s) !== 'cut';
const marshIn = (s: GameState) => key(s, 'act3.ally.marsh') === 'in';
const irisFree = (s: GameState) => key(s, 'out.iris11') === 'warned';
const mayaIn = (s: GameState) => key(s, 'c6.maya') === 'restored';
const spentAlly = (s: GameState, who: string) => key(s, 'c15.cost') === 'ally' && key(s, 'c15.cost-who') === who;
type Who = 'rafe' | 'maya' | 'marsh' | 'iris';
const available = (s: GameState): Who[] =>
  [rafeIn(s) && 'rafe', mayaIn(s) && 'maya', marshIn(s) && !spentAlly(s, 'marsh') && 'marsh', irisFree(s) && 'iris'].filter(Boolean) as Who[];
const crew = (s: GameState): Who[] => ((key(s, 'out.crew15') ?? '').split(',').filter(Boolean) as Who[]);
const has = (s: GameState, w: Who) => crew(s).includes(w);
type Partner = 'rafe' | 'julian' | 'sebastian';
const partnerName: Record<Partner, string> = { rafe: 'Rafe', julian: 'Julian Mercer', sebastian: 'Sebastian' };
const partners = (s: GameState): Partner[] => [
  ...(toldNight(s) ? (['rafe'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];

export function placeOutside15(s: GameState): string | undefined {
  const w = key(s, 'out.way15');
  if (s.phase === 'approach' && w) return w === 'courier' ? '04:50 · The Vesper, the river-side service door' : w === 'stair' ? '02:00 · The Vesper, the kitchen stair' : '18:00 · The Vesper, the long room';
  if (s.phase === 'shelves' && get15(s, 'o-drawer')) return '05:10 · The archive, the cabinet marked L';
}

// ── The entry ──

export function beginOutside15(): C15Choice {
  return offer('begin-outside', 'The week before the board', 'I keep everything, she said.', 'chart');
}

// ── The chart ──

function chartBlocks(s: GameState): Block[] {
  const w = way14(s);
  return [
    p('The week before the board. The card on the wall says THE VESPER, and under it, in Celeste’s own words from a year ago, I keep everything, darling. You have never been in the room where she keeps it. You have been in the building, twice, and learned nothing about the part that matters.'),
    p(w === 'cut'
      ? 'You have only what you proved yourself, and a pencilled floor-plan of the Vesper that you drew from memory at the Lindqvist table. It is not much. It is yours. And you do not have the man who knew the building, because you cut him loose, and you will have to find your own way in.'
      : 'And you have, on the third step of the iron stair, in a plain envelope, a floor-plan of the Vesper in a courier’s hand: the river-side service door, the stair behind the kitchens, a pencilled cross on the second floor, and a time, 04:58, which is the minute the alarm lets go of the river door while the florists come in.'),
    ...(w === 'cut' ? [] : [q('Rafe', 'Ten years of deliveries. I know the minute. I know which cabinet is hers. I’ve carried a thin envelope to that room every Tuesday of my life and I have never once seen it open. Take me. I’d rather be the man at the door than the man who hears about it.')]),
  ];
}

const crewLine: Record<Who, [string, string, Block[]]> = {
  rafe: ['Rafe', 'The courier’s door. He knows the minute.', [q('Rafe', 'I’ll be at the river door at ten to five with a crate of lilies. Nobody looks at a man carrying lilies. It’s the one useful thing I’ve ever learned about people.')]],
  maya: ['Maya', 'She knows what a record is worth.', [q('Maya', 'A burglary? I spent a decade enforcing chains of custody. I’ve been waiting my whole career to break one for a reason. I’ll bring the bags.')]],
  marsh: ['Owen Marsh', 'The Authority, with his cycling clips.', [q('Owen Marsh', 'I’m not strictly allowed to be anywhere near a burglary. I’ll be outside with a notice to produce, in case anybody needs reminding that they can be made to. Try not to need it.')]],
  iris: ['Iris', 'She knows the kitchens.', [q('Iris Moreau', 'I stood in that long room for four years. I know which cabinet squeaks, and which stair the staff use to smoke. I’ll be there. It’s the first thing in four years that’s been mine.')]],
};

function chartChoices(s: GameState): C15Choice[] {
  const c = crew(s);
  const picks = available(s)
    .filter((w) => !c.includes(w))
    .map((w) =>
      offer('o15-crew-' + w, crewLine[w][0], crewLine[w][1], c.length >= 1 ? 'approach' : 'chart', (x) => {
        setKey(x, 'out.crew15', [...crew(x), w].join(','));
        return crewLine[w][2];
      }),
    );
  return [
    ...picks,
    c.length
      ? offer('o15-crew-done', 'That’s enough', 'Two is a crew. More is a party.', 'approach')
      : offer('o15-crew-none', 'Nobody', 'You’ll do it yourself.', 'approach', () => [t('Nobody. It’s my name in that room, on a page, and a name nobody has claimed. I’ll carry it out myself.')]),
  ];
}

// ── The approach ──

const wayText: Record<string, Block[]> = {
  courier: [
    p('Ten to five on a river morning, mist on the water, the Embankment empty but for a florist’s van with its back doors open and a man in a courier’s jacket, in a flat cap, carrying a crate of white lilies on his shoulder, who does not look at you and does not need to.'),
    q('Rafe', 'Two minutes. Behind me, and don’t hurry. Nobody looks at anything that isn’t in a hurry.'),
    p('The river door is a steel fire door painted the Vesper’s black, with no handle on the outside. It opens as the florist’s boy knocks, and holds, for the width of one breath, in the space where the alarm lets go of the lock, and you are through it with the smell of cold stone and lilies in your face.'),
  ],
  stair: [p('Two in the morning, the kitchen stair behind the Vesper’s kitchens, a door that is never locked because the bins go out at five. ' + 'You came the way you were told, or the way you worked out, with your heart going like a train.')],
  invited: [
    p('You ask Celeste for a meeting, “to discuss the board”, at six on Tuesday, and she says yes at once, because she has been waiting for you to ask for something. You sit with her in the long room under the empty frames and talk about nothing, beautifully, for an hour.'),
    p('Two floors down, your crew does the job. Or, with no crew, you excuse yourself at twenty past, to the powder room, and take the back stairs, and have nine minutes.'),
  ],
};

function approachBlocks(): Block[] {
  return [p('The Vesper on the Embankment, the black glass front with no name on it, and behind it everything Celeste Laurent has ever kept.')];
}

function approachChoices(s: GameState): C15Choice[] {
  if (!key(s, 'out.way15')) {
    const w = (id: 'courier' | 'stair' | 'invited', label: string, hint: string) =>
      offer('o15-way-' + id, label, hint, 'approach', (x) => {
        setKey(x, 'out.way15', id);
        return wayText[id];
      });
    return [
      ...(has(s, 'rafe') ? [w('courier', 'By the courier’s door', 'Ten to five, with the florists. The blind minute.')] : []),
      ...(key(s, 'out.layout11') || irisFree(s) ? [w('stair', 'By the kitchen stair', '2 a.m. From the layout, or from Iris.')] : []),
      w('invited', 'By invitation', 'A meeting with Celeste as cover. Always open.'),
    ];
  }
  const way = key(s, 'out.way15');
  const snag: Block[] =
    way === 'courier'
      ? [p('The snag: the florist’s boy, nineteen, with a trolley, who stops dead in the corridor and looks at you and at the man with the lilies and at the clock.')]
      : way === 'invited'
        ? [p('The snag: Celeste, early, in the reading-room doorway with a glass of something pale, looking at the open drawers with pleasure.'), q('Celeste Laurent', 'Darling. And I thought you had come to see me.')]
        : [p('The snag: the night doorman, asleep in the cloakroom, who wakes, and sits up, and looks straight at the stairs.')];
  const g = (id: 'talk' | 'hide' | 'bold', label: string, hint: string, body: Block[]) =>
    offer('o15-snag-' + id, label, hint, 'shelves', (x) => {
      set15(x, 'o-snag', id);
      return body;
    });
  return [
    g('talk', 'Talk your way through it', 'Smile. Be exactly as expected.', [...snag, p('You talk. You are exactly what they expect: charming, a little bored, entitled to be there. It works. It always works on people who think they know what you are.')]),
    g('hide', 'Stand still and let it pass', 'Say nothing. Be furniture.', [...snag, p('You stand very still between two cabinets and let it pass, the way a courier learns to stand in a corridor where he is not supposed to be, and it passes.')]),
    g('bold', 'Be bold', 'Do the thing you came to do, in front of them.', [...snag, p('You open the next drawer anyway, in front of them, slowly, and look up, and smile. Nobody stops you. Nobody in this building has ever been told what to do when an unclaimed piece walks into the archive.')]),
  ];
}

// ── The shelves ──

function shelvesBlocks(): Block[] {
  return [
    p('The archive. Grey steel cabinets numbered by catalogue page, one lamp, cold as a church. Everything Celeste Laurent has ever kept.'),
    p('Your own page first. The Autumn Collection on its lectern, and three pages after Iris’s, your photograph and the neat type: E. V. (II) · REISSUED · UNCLAIMED · AVAILABLE FOR PLACEMENT. One clean pull, folded, into your coat.'),
    p('Then the cabinet marked L, which is where he said it would be, with a pencilled cross on the floor-plan and a name on the drawer in the Vesper’s neat type: LINDEN, E.'),
  ];
}

const drawerBlocks: Block[] = [
  p('A thin file. On top, a single sheet: the Jakarta order, a list of names given to the wrong people, and at the bottom, in the looping green hand, one initial. C.'),
  t('Proof of the burn. Not of the harbour. Not yet.'),
  p('And, clipped to the corner with a brass pin, a flimsy the colour of weak tea, a booking slip. Four lines, typed:'),
  q('The slip', 'ROTTERDAM · COURIER · R. L. · SATURDAY, THREE DAYS · NON-REFUSABLE · AUTH. C.'),
  t('R. L. The Saturday. A job a man could not refuse, in a country he had never seen, booked, and authorised, in the same hand. Somebody sent him away.'),
];

function shelvesChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'o-drawer')) {
    return [
      offer('o15-drawer-open', 'Open the drawer', 'LINDEN, E.', 'shelves', (x) => {
        set15(x, 'o-drawer');
        setKey(x, 'out.linden15');
        setKey(x, 'act3.nell-order', 'taken');
        note(x, 'o-linden', 'Evelynn took Nell Linden’s archive file from the Vesper: the Jakarta order signed C., and a booking slip, ROTTERDAM · COURIER · R. L. · SATURDAY · AUTH. C.', 'The Vesper archive, the drawer marked LINDEN, E.');
        return drawerBlocks;
      }),
    ];
  }
  if (!key(s, 'out.slip15')) {
    const r = (id: 'gave' | 'held', label: string, hint: string, body: Block[]) =>
      offer('o15-slip-' + id, label, hint, 'shelves', (x) => {
        setKey(x, 'out.slip15', id);
        return [...body, p('And there is time for one thing more.')];
      });
    return [
      ...(has(s, 'rafe')
        ? [r('gave', 'Show it to Rafe, now', 'He is three feet away with a crate of lilies.', [
            p('You hold the slip out to him, in the lamplight, without a word. He reads it once. He reads it again. He does not make a sound; the crate of lilies in his arms tips, very slowly, and you take it from him before it falls.'),
            q('Rafe', 'Rotterdam. The man who knew exactly what I’d be leaving. That was her. It was never the firm. It was her, by name, in her own hand.'),
            q('Rafe', 'I knew it. I think I always knew it. It’s different on paper.'),
          ])]
        : []),
      r('held', 'Keep it back, for the room', 'Tell him with the rest, when she is across the table.', [p('You fold the slip into the lining of your coat, beside the Jakarta order, and say nothing, because some things are only worth saying once, to the person they are about, in front of the person who did it.')]),
    ];
  }
  const m = (id: 'adrian' | 'cards' | 'lim', label: string, hint: string, body: Block[]) =>
    offer('o15-took-' + id, label, hint, 'reckon', (x) => {
      setKey(x, 'out.took15', id);
      return body;
    });
  return [
    m('adrian', 'Adrian Vale’s file', 'The clinic, the fitting, the name. Nobody spends it again.', [p('A thick file, the clinic’s crest, a name that was yours. You do not open it. You put it in the box.')]),
    m('cards', 'The 1109 safe', 'Every placement filmed in that room.', [p('The safe behind the last cabinet, which opens to the date on your catalogue page. Inside, rows of memory cards in little labelled envelopes, every one of them a person in a room with a mirror.')]),
    ...(way14(s) !== 'cut' ? [m('lim', 'LIM, R.', 'His own file. A thin one.', [p('LIM, R. A thin file, three years of handoffs in his own hand, and on the cover a pencilled note, “Reliable. Sentimental. Will not survive.”, which you take, and fold, and put away where he will never read it unless he asks.')])] : []),
  ];
}

// ── The reckoning ──

function holders(s: GameState): string[] {
  return [
    way14(s) !== 'cut' && !!key(s, 'out.told') && 'rafe',
    marshIn(s) && !spentAlly(s, 'marsh') && 'marsh',
    irisFree(s) && !spentAlly(s, 'iris') && 'iris',
    mayaIn(s) && 'maya',
    !!key(s, 'out.nora12') && 'nora',
  ].filter(Boolean) as string[];
}
const holderName: Record<string, string> = { rafe: 'Rafe', marsh: 'Owen Marsh', iris: 'Iris Moreau', maya: 'Maya', nora: 'Nora Linden' };

function reckonBlocks(s: GameState): Block[] {
  const took = key(s, 'out.took15');
  return [
    p('The week after, fast, like a list.'),
    ...(took === 'adrian' ? [p('Adrian Vale’s name: in your box. Nobody spends it again.')] : took === 'lim' ? [p('A thin file with a courier’s name on it: in your box, and nowhere else. Meridian does not keep a record of him any longer that you have not read.')] : []),
    p('Copies of everything, in envelopes, carried across the river by a man who has carried envelopes all his life, to the people who hold the switch: ' + (holders(s).length ? holders(s).map((h) => holderName[h]).join(', ') : 'a solicitor in Holborn who has never met you and never will') + '. If you stop ringing, everything goes to everyone.'),
    p('And the price. There is always a price for the last door.'),
  ];
}

function reckonChoices(s: GameState): C15Choice[] {
  const allyWho = irisFree(s) ? 'iris' : marshIn(s) ? 'marsh' : '';
  const c = (id: 'ally' | 'face' | 'money' | 'rafe', label: string, hint: string, shared: string, who: string, body: Block[]) =>
    offer('o15-cost-' + id, label, hint, 'vigil', (x) => {
      setKey(x, 'out.cost15', id);
      set15(x, 'cost', shared);
      if (who) set15(x, 'cost-who', who);
      setKey(x, 'act3.leash', 'broken');
      setKey(x, 'act3.switch', holders(x).join(',') || 'solicitor');
      if (marshIn(x)) setKey(x, 'act3.ally.marsh', 'in');
      if (irisFree(x)) setKey(x, 'act3.ally.iris', 'in');
      if (key(x, 'out.nora12')) setKey(x, 'act3.ally.nora', 'in');
      return body;
    });
  return [
    ...(allyWho
      ? [c('ally', 'Spend an ally', allyWho === 'iris' ? 'Iris’s cover, burned to open the last door.' : 'Marsh goes public early, and loses his inquiry.', 'ally', allyWho, [p(allyWho === 'iris' ? 'Iris’s cover goes, the last of it: a photograph of her at the Vesper’s river door, in a paper that matters. She rings you from a station you do not recognise. “Worth it. Don’t you dare say sorry.”' : 'Marsh goes to the minister a week early, with everything, and the minister takes his inquiry off him by lunchtime, and gives it to somebody safer. He rings you from his bicycle. “Worth it. They can’t un-read it.”')])]
      : []),
    c('face', 'Spend your face', 'Unclaimed no longer. The papers will have it.', 'visibility', '', [p('A photograph of you, from the Embankment on the river morning, in a paper that matters, with a caption that does not know your name. The room over the water is a room that can be found now. You pack the holdall again, on Thursday, and leave the key under the third step for nobody.')]),
    c('money', 'Spend everything you have', 'Lawyers, couriers, silence.', 'money', '', [p('Everything you had goes on lawyers and couriers and a locksmith and a solicitor in Holborn, and what is left of his envelope marked EXPENSES goes with it. By Friday you are broke, and free, and it is the best bargain you have ever made.')]),
    ...(way14(s) !== 'cut' && key(s, 'out.told')
      ? [c('rafe', 'Let Rafe step forward', 'His name on the record. His choice. He can never disappear again.', 'relationship', 'rafe', [
          p('Rafe goes to the Markets Authority on Thursday, in daylight, in his own coat, and gives a sworn statement in his own name: ten years of handoffs, in his own hand, and who received them. Owen Marsh takes it from him across the desk, and does not shake his hand, because a handshake would be a thing a court could ask about, and says instead, very quietly, “Thank you for coming in.”'),
          q('Rafe', 'It turns out to have been me. All that time. I was keeping the door for somebody who wasn’t coming. It might as well have been the Markets Authority.'),
        ])]
      : []),
  ];
}

// ── The vigil ──

function vigilBlocks(): Block[] {
  return [
    p('Wednesday night, the eve of the board. You type it on the black phone with its one contact, and send it before you can think better of it.'),
    q('You', 'No more orders.'),
    p('The reply comes after four minutes, which for her is a very long time.'),
    q('C.', 'I shall be there as myself.'),
  ];
}

const inviteLines: Record<Partner, Block[]> = {
  rafe: [
    p('The room goes quiet in the way it does when the thing that stood between two people is gone. He is at the door with his cap in his hands. He has not come to ask for anything.'),
    q('Rafe', 'One thing first, as before. If I ever say her name when I mean yours, stop me. You’re not her. You never were, and you never had to be, and I have been so grateful for that I can’t say it.'),
    q('Rafe', 'Tell me what you want tonight, and that’s what happens.'),
  ],
  julian: [p('Julian’s flat, late, and his careful not-asking about where you have been at five in the morning.'), q('Julian Mercer', 'You look like somebody who’s about to do something very large. Stay. Tell me what you want tonight, and that’s what happens.')],
  sebastian: [p('Sebastian, after the late set, who takes one look at your face and does not play you anything sad.'), q('Sebastian', 'Tomorrow’s something, I can see it on you. The hotel’s round the corner, or I walk you to the water. You choose.')],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  rafe: { 'no-sex': 'Then that’s the night. You set the edge, and I stay on my side of it. And I’ll say your name, the one you’ve got.', sex: 'Yes. And you say stop, it stops. The same for me. And whichever name you give me tonight, I’ll use it, and only that.' },
  julian: { 'no-sex': 'Then that’s the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  sebastian: { 'no-sex': 'Good. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stayBody = (pt: Partner, sc: 'no-sex' | 'sex'): Block[] => {
  if (pt === 'rafe')
    return sc === 'sex'
      ? [p('He kisses you the way you open a letter you have read a hundred times: slowly, and then with a rush of relief that is almost funny, and he says your name, the one you gave him, and nothing else.'), p('What happens next is yours and his, in a room nobody has ever watched, with the river going grey at the window. The scene fades.')]
      : [p('He kisses you slowly by the window while the dark goes out of the river, and stops exactly where you said, and holds you there, and you stand like that, two people who have carried the same dead woman’s paper for a year and have, for a night, nothing to carry.')];
  const stay: Record<'julian' | 'sebastian', Record<'no-sex' | 'sex', Block[]>> = {
    julian: {
      'no-sex': [p('He kisses you slowly with the city behind you, and stops exactly where you said, and holds you there until the cold comes off you.')],
      sex: [p('He kisses you and the night goes off you like a coat, and he asks once more, his mouth at your shoulder, and you answer by drawing him toward the bedroom.'), p('What happens next is yours and his. Nobody is watching this one. The scene fades.')],
    },
    sebastian: {
      'no-sex': [p('He undoes the dress slowly and says what he likes, and when you say that is where tonight stops he laughs against your throat and stays there.')],
      sex: [p('He undoes the dress slowly, and when he asks once more whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room no one has ever watched. The scene fades.')],
    },
  };
  return stay[pt][sc];
};

function vigilChoices(s: GameState): C15Choice[] {
  if (!key(s, 'act3.black-phone')) {
    const ph = (id: 'return' | 'river' | 'keep', label: string, hint: string, body: Block[]) =>
      offer('o15-phone-' + id, label, hint, 'vigil', (x) => {
        setKey(x, 'act3.black-phone', id);
        return body;
      });
    return [
      ph('return', 'Send it back', 'In a Vesper orchid box. No card.', [p('In the morning you send it back by courier, in a black Vesper orchid box, with nothing written on the card. The courier is a girl on a moped. She does not know who he is, either.')]),
      ph('river', 'The river', 'Off the wall.', [p('You walk to the river at one in the morning and drop it off the wall, and it makes almost no sound at all. A little way along, under a lamp, a man in a courier’s jacket, who was not there, looks up, and nods, and is not there again.')]),
      ph('keep', 'Keep it', 'Switched off, in a drawer. Evidence.', [p('You switch it off and put it in the drawer with the Jakarta order and the slip. Evidence. Thursday might want it.')]),
    ];
  }
  const open = get15(s, 'o-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o15-night-' + id, label, hint, 'complete', (x) => {
      set15(x, 'o-night', id);
      return body;
    });
  if (open && !open.endsWith('-room') && open !== 'maya') {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('o15-' + pt + '-' + id, label, hint, 'vigil', (x) => {
        set15(x, 'o-night-open', pt + '-room');
        set15(x, 'o-night-scope', id);
        note(x, 'o-evening-consent', `Evelynn chose the night’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], scopeReply[pt][id])];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', pt === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('o15-leave', 'Say goodnight', 'Tomorrow is the board.', 'complete', (x) => {
        delete x.choices['c15.o-night-open'];
        set15(x, 'o-night-outcome', 'declined');
        return [p('You say goodnight at the door and mean it, and he nods, once, as though you had given him something rather than withheld it.')];
      }),
    ];
  }
  if (open === 'maya')
    return [
      offer('o15-maya-stay', 'Stay and talk it through', 'Half the truth, and a bottle.', 'complete', (x) => {
        set15(x, 'o-night-outcome', 'maya');
        delete x.choices['c15.o-night-open'];
        return [p('You tell her the half you can, and she pours, and nobody writes anything down. At two she falls asleep on the sofa, and you cover her with your coat.')];
      }),
    ];
  if (open) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get15(s, 'o-night-scope') as 'no-sex' | 'sex';
    return [
      offer('o15-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c15.o-night-open'];
        set15(x, 'o-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you at the window until you are ready.')];
      }),
      offer('o15-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c15.o-night-open'];
        set15(x, 'o-night-outcome', 'intimate-' + scp);
        return stayBody(pt, scp);
      }),
    ];
  }
  return [
    ...partners(s).map((pt) =>
      offer('o15-night-' + pt, pt === 'rafe' ? 'Rafe' : pt === 'julian' ? 'Julian' : 'Sebastian', pt === 'rafe' ? 'He never makes you her.' : 'His place. Off the grid.', 'vigil', (x) => {
        set15(x, 'o-night', pt);
        set15(x, 'o-night-open', pt);
        return inviteLines[pt];
      }),
    ),
    ...(mayaIn(s)
      ? [offer('o15-night-maya', 'Maya', 'She’ll want to see your face before Thursday.', 'vigil', (x) => {
          set15(x, 'o-night', 'maya');
          set15(x, 'o-night-open', 'maya');
          return [p('Maya’s kitchen at eleven, a bottle, the cat on the tax return.'), q('Maya', 'You’re going to walk into that room as yourself. I can’t think of anything more frightening. Sit down.')];
        })]
      : []),
    done('alone', 'Alone', 'Act III ends here.', [p('You sit up alone in the room over the water, the wall in front of you, a glass of wine you do not drink, and the first quiet in a year that belongs to nobody but you.')]),
  ];
}

// ── The wall ──

function completeBlocks(s: GameState): Block[] {
  const sl = key(s, 'out.slip15');
  return [
    ...(get15(s, 'o-night-outcome')?.startsWith('intimate') ? [p('You wake in the grey, in a room nobody has ever watched, and nothing has been logged.')] : []),
    p('The wall over the table. Everything on Celeste’s side of the door is on yours now: your page, the Jakarta order in a dead woman’s file, a slip with four lines on it, and the switch in envelopes carried over the river by hands you trust.'),
    q('The card', 'LINDEN, E.'),
    p(sl === 'gave' ? 'Under it, pinned: ROTTERDAM. SATURDAY. AUTH. C. HE KNOWS.' : 'Under it, pinned: ROTTERDAM. SATURDAY. AUTH. C. HE DOESN’T KNOW YET.'),
    p('One card left, in capitals:'),
    q('The card', 'THE BOARD MEETS.'),
    t('She held everything. Now I do. And a man who has carried envelopes all his life has carried me, across a river, in the dark, to the one drawer where she kept her. Thursday, I find out what that is worth.'),
  ];
}

export function outsideBlocks15(s: GameState): Block[] {
  if (s.phase === 'chart') return chartBlocks(s);
  if (s.phase === 'approach') return approachBlocks();
  if (s.phase === 'shelves') return shelvesBlocks();
  if (s.phase === 'reckon') return reckonBlocks(s);
  if (s.phase === 'vigil') return vigilBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices15(s: GameState): C15Choice[] {
  if (s.phase === 'chart') return chartChoices(s);
  if (s.phase === 'approach') return approachChoices(s);
  if (s.phase === 'shelves') return shelvesChoices(s);
  if (s.phase === 'reckon') return reckonChoices(s);
  if (s.phase === 'vigil') return vigilChoices(s);
  return [];
}
