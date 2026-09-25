/** Chapter 12 (Act III, own-power played as the Celebrity route) · Singapore:
 * departure → emerald → flat → straits → sister → night → complete.
 * Design: docs/story/CHAPTER_12_SINGAPORE_DESIGN.md (owner-approved 2026-09-25, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_12_SINGAPORE_SCRIPT.md. Gated behind chapter12Playable(), reached from an
 * own-power Chapter 11 ending. The three weeks before the placement date: Evelynn flies to Singapore, to the life she
 * is wearing. Mrs Tan and the key; number 9 on Emerald Hill, kept dressed for the reissue, and the caretaker who walks
 * in on her; Colin Ashby, who ran Meridian's Singapore station, at the Marlowe; and Nora Linden, the first Evelyn's
 * sister. The first Evelyn was Eleanor "Nell" Linden: burned in Jakarta, running the night she "disappeared before
 * breakfast", found in the harbour a week later. Two witnesses seed that Celeste burned her (proof waits for Act IV).
 * No order this chapter: pressure from a distance (Celeste's messages, a photograph of Maya). The only intimacy is the
 * optional chosen evening with a man who came to Singapore (heat 3, consent-gated, fades).
 * Deepening pass (2026-09-25): four moments, each with a neutral pick for the goldens. The first hour (c12.first =
 * hawker | salon | sleep: Mr Goh's coffee tab, paid monthly by "C."; Madame Lin's standing Friday, paid by L.S.F.);
 * the bedroom at number 9 after the search (c12.bed = lie | drawer | mirror: Celeste's scent on the pillow; Nell's
 * unsent note, "Not even for her"; her lipstick); Kit Harlow at the Punkah Bar before Ashby (c12.bar = flirt | truth |
 * cool: "Only her. The tall one", and a boat); and Nora's son, Sam, after the kitchen (c12.boy = hold | friend |
 * nora). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { eveningPartners11, get11 } from './chapter11';

export type C12Scene = { title: string; place: string; blocks: Block[] };
export type C12Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get12 = (s: GameState, k: string) => s.choices['c12.' + k];
export const set12 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c12.' + k] = v;
};
const offer12 = (id: string, label: string, hint: string, next: string, apply?: C12Choice['apply']): C12Choice => ({
  id: 'chapter12.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter12Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER12 === '1';

function note12(s: GameState, key: string, text: string, source: string) {
  if (get12(s, 'rec.' + key) !== undefined) return;
  set12(s, 'rec.' + key, String(s.history.length));
  set12(s, 'event.' + key, String(s.revision));
  set12(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c12.' + key);
  s.knowledge.push('c12.' + key);
}

export const chapter12Definitions: Record<string, C12Scene> = {
  departure: { title: 'Welcome Home', place: '06:10 · CHANGI', blocks: [] },
  emerald: { title: 'Mrs Tan’s Orchids', place: 'NOON · EMERALD HILL', blocks: [] },
  flat: { title: 'Number 9', place: 'AFTER DARK · EMERALD HILL', blocks: [] },
  straits: { title: 'The Punkah Bar', place: '23:00 · THE MARLOWE HOTEL', blocks: [] },
  sister: { title: 'Nora', place: 'SUNDAY · HOLLAND VILLAGE', blocks: [] },
  night: { title: 'The Heat', place: 'MIDNIGHT · THE HARBOUR', blocks: [] },
  complete: { title: 'A Name', place: 'MORNING · ARRIVALS, LONDON', blocks: [] },
};
export const chapter12Scenes = Object.entries(chapter12Definitions).map(([phase, scene]) => ({
  id: `chapter12.${phase}` as NodeId,
  ...scene,
}));

// ── What Chapters 7–11 left her ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const famous = (s: GameState) => !!get5(s, 'published');
const pryceKnown = (s: GameState) => !!c(s, 'c8.pryce');
const hasCampaign = (s: GameState) => ['taken', 'terms'].includes(getKey(s, 'own.campaign') ?? '');
const irisFree = (s: GameState) => getKey(s, 'act3.ally.iris') === 'in';
const coatFound = (s: GameState) => c(s, 'c7.robe') === 'coats';
const shoesFound = (s: GameState) => c(s, 'c7.robe') === 'drawer';
const ruthTold = (s: GameState) => c(s, 'c9.names-open') === 'end';
const kessler = (s: GameState) => c(s, 'c9.kessler') === 'follow';
const lotteMet = (s: GameState) => !!c(s, 'c7.lotte');

type Partner12 = 'julian' | 'theo' | 'sebastian';
const who12: Record<Partner12, string> = { julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian' };
const name12: Record<Partner12, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian' };
/** The man who came to Singapore with her (c12.cover = with, c12.with = partner), if any. */
const companion = (s: GameState) => (get12(s, 'cover') === 'with' ? (get12(s, 'with') as Partner12 | undefined) : undefined);
/** Something to lay on Ashby's bar: the catalogue, the client list, or the caretaker's report or number. */
export const pressReady12 = (s: GameState) =>
  ['photo', 'page'].includes(get11(s, 'catalogue') ?? '') ||
  ['read', 'copied'].includes(c(s, 'c8.list') ?? '') ||
  ['hide', 'own'].includes(get12(s, 'caught') ?? '');

/** Scene-specific place lines (display only). */
export function place12(s: GameState): string | undefined {
  if (s.scene !== 'chapter12') return;
  if (s.phase === 'departure' && !get12(s, 'cover')) return '03:00 · The kitchen table, London';
  const evening = get12(s, 'evening-open');
  if (s.phase === 'night' && evening)
    return evening.startsWith('julian') ? 'Late · A suite on the Straits' : evening.startsWith('theo') ? 'Late · The crew hotel, Marina' : 'Late · After the concert';
}

// ── Welcome Home ──

function departureBlocks(s: GameState): Block[] {
  return [
    p('Three in the morning, and the kitchen table, and the wall.'),
    p('The new card is at the top, pinned above Celeste’s, with nothing on it but a date: the first Thursday of next month. You have looked at it so often in the last two days that the pin has started to worry a hole in the plaster.'),
    ...(shoesFound(s)
      ? [p('Her flat shoes are by the door where you left them, the left one worn down at the heel. You have not been able to put them away, and you have not been able to wear them.')]
      : []),
    p('Everything on the wall comes from somewhere. A café receipt. A card in green ink. A voice on a landline at three in the morning, saying Evie. A catalogue page that says reissued. Every one of them, if you follow the string far enough, goes back to the same place: a row of old houses on a hill in Singapore, and a woman who lived in one of them and does not any more.'),
    t('Three weeks until she places me. I have spent two months learning to be Evelyn Vale. I have not spent one hour finding out who she was.'),
    p('You open the laptop and look at flights, and the fares go up while you watch, as if the airline knew you were going to go anyway.'),
  ];
}

function arrivalBlocks(s: GameState): Block[] {
  return [
    p('Changi at dawn is cool and bright and smells of orchids, which somebody has arranged in towers by the immigration desks: white ones, hundreds of them. You walk past them with your face very still.'),
    p('The officer looks at your passport and at you and at the passport again, and says, “Welcome back, Ms Vale,” and stamps it, and you understand that as far as this country is concerned you have simply come home.'),
    p('Then the doors open onto the pavement, and the heat comes in like a hand laid flat on the back of your neck, and does not take itself away.'),
    p('The black phone lights before you have found the taxi rank.'),
    q('C.', 'Welcome home, darling. Emerald Hill is lovely at this time of year. Do give my love to Mrs Tan.'),
    t('I have not told anybody about Mrs Tan. Not the wall. Not Maya. Not the pillow.'),
    p('You stand on the pavement in the heat with the phone in your hand and people going round you on both sides, and think, very clearly: she is not going to stop me. She is going to watch. She wants to see what I do with it.'),
    t('Then let her watch.'),
    p('The taxi runs in along the coast road with the windows up and the air-conditioning roaring: palms, a sea full of ships at anchor as far as you can see, and then the city standing up out of the heat all at once, towers and cranes and a hotel with a ship on its roof, like a place somebody built to impress a child.'),
    t('She lived here eight years. I have been here an hour, and it already knows my face.'),
  ];
}

/** The first hour (deepening pass): the city still keeps her tab and her hair appointment, or lets her sleep. */
function firstChoices(s: GameState): C12Choice[] {
  const first = (id: string, label: string, hint: string, body: Block[], fact?: [string, string, string]) =>
    offer12('first-' + id, label, hint, 'emerald', (x) => {
      set12(x, 'first', id);
      if (fact) note12(x, fact[0], fact[1], fact[2]);
      return body;
    });
  return [
    first(
      'hawker',
      'Breakfast where she ate',
      'Let your feet choose. They seem to know.',
      [
        p('You tell the driver to stop somewhere you have never been, and your mouth gives him the name: a hawker centre off Chinatown, at seven in the morning, under a roof like a railway station, two hundred stalls opening their shutters one by one in a haze of charcoal and steam.'),
        p('Your feet take you past the noodle stalls and the fish-ball stalls and a man frying carrot cake in a wok the size of a bath, to a coffee stall in the far corner with a hand-painted sign and an old man in a vest behind the counter, pouring coffee through a cloth sock from one tin jug to another, a metre high, without spilling a drop.'),
        p('He sees you, and stops pouring.'),
        q('Mr Goh', 'Aiyo. Miss Evie. Long time.'),
        p('He does not ask what you want. He makes it, thick and sweet, two sugars, and slides it across on a saucer with a small dented tin beside it that you know, before you open it, has cinnamon in it.'),
        q('Mr Goh', 'Your tin. I keep it for you. Nobody else touch.'),
        p('You drink it standing at the counter. It is exactly right. When you reach for your purse he waves the purse away.'),
        q('Mr Goh', 'No need. Your friend pay already. Tall lady. Every month she come, she pay one hundred dollars on your tab. For when Evie come back, she says. Fourteen months. One hundred, every month.'),
        p('He taps a school exercise book by the till: a column of dates in his careful hand, and beside every one the same initial. C.'),
        t('She has been paying for Nell’s coffee for fourteen months, for when she comes back. She knew she was never coming back. She was paying for mine.'),
      ],
      ['tab', 'A coffee stall off Chinatown keeps the first Evelyn’s tab. Every month for fourteen months a tall lady has paid a hundred dollars on it, “for when Evie comes back”, initialled C.', 'Mr Goh’s exercise book'],
    ),
    first(
      'salon',
      'Keep her appointment',
      'A message at the hotel desk: your standing Friday, confirmed.',
      [
        p('At the hotel desk a message is waiting for Ms Vale on a card with a gold edge: Maison Lin confirms your standing appointment, Friday, eleven o’clock. We look forward to seeing you again.'),
        p('Standing, the clerk says, when you ask. The salon has rung every Thursday to confirm, for as long as he has worked here.'),
        p('Maison Lin is on the fourth floor of an old arcade off Orchard Road: white orchids at the door, of course, and a woman of fifty in black who takes both your hands, turns you to the light, and sighs.'),
        q('Madame Lin', 'Fourteen months. Fourteen months you let somebody else cut this. Sit.'),
        p('You sit. She cuts it the way it used to be without asking, her scissors quick and cold at the nape of your neck, and talks the whole time, about the heat, about a minister’s daughter, about you. In the mirror you watch the woman in the chair become, strand by strand, the woman in the photographs.'),
        q('Madame Lin', 'Madame Laurent chose this, you know. The first time. She sat where my girl is sitting and said, shorter at the back, she has a beautiful neck, it is a crime to hide it. She was right. She is always right, that one.'),
        q('Madame Lin', 'The account is still open. The fund pays, every Friday, whether you come or not. L.S.F.'),
        ...(c(s, 'c9.rent')
          ? [t('L.S.F. Facilities. The Laurent fund’s own company. It pays the rent on the flat that watches mine in London, and it has paid for her hair in Singapore every Friday for fourteen months.')]
          : [t('L.S.F. I will find out what that stands for. I already know whose initial is in it.')]),
        p('You tip her far too much, with your own money, and walk out into the heat with your neck bare, the way somebody else decided it should be, and you like it. That is the worst part. You like it.'),
      ],
      ['salon', 'Maison Lin off Orchard Road keeps the first Evelyn’s standing Friday appointment, paid every week for fourteen months by L.S.F. Celeste chose the cut.', 'Madame Lin'],
    ),
    first('sleep', 'Sleep first', 'Draw the curtains on the city. It will keep.', [
      p('You go to the hotel and draw the curtains on the city and sleep face down in your clothes for five hours, the way Adrian used to sleep after a night filing: without dreams, like falling down a well.'),
      p('When you wake it is noon. The room is full of thick gold light at the edges of the curtains, the air-conditioning is roaring, and somewhere far below a thousand car horns are having an argument. For a moment you do not know which city, or which body. Then you do, and get up, and dress, and go.'),
      t('Emerald Hill. Before I lose my nerve.'),
    ]),
  ];
}

function departureChoices(s: GameState): C12Choice[] {
  if (get12(s, 'cover')) return firstChoices(s);
  const go = (id: string, label: string, hint: string, body: (x: GameState) => Block[], partner?: Partner12) =>
    offer12('cover-' + id, label, hint, 'departure', (x) => {
      set12(x, 'cover', partner ? 'with' : id);
      if (partner) set12(x, 'with', partner);
      return [...body(x), ...arrivalBlocks(x)];
    });
  const withPartner: Record<Partner12, [string, string, Block[]]> = {
    julian: [
      'Fly out with Julian',
      'Helix has business in Singapore. He has a seat, and no questions.',
      [
        p('Julian has a meeting in Singapore that has been moved twice and can be moved once more. He says so on the phone at four in the morning without asking why you are awake.'),
        q('Julian Mercer', 'There’s a seat. I won’t ask what you’re going for. I will ask where you’d like dinner, on the night you want it.'),
        p('He sleeps most of the flight, or pretends to, so that you can sit in the dark with the window blind up an inch and watch the whole of Asia go by underneath, lit and then unlit.'),
      ],
    ],
    theo: [
      'Fly out with Theo',
      'His show wants a Singapore special. He wants to know why you do.',
      [
        p('Theo’s producers have wanted a Singapore special for a year. He tells them it’s happening this week, and then tells you.'),
        q('Theo Marr', 'I’ll do the city. You do whatever it is you’re doing. I promise not to follow you with a camera. I don’t promise not to follow you.'),
        p('He talks for the first three hours of the flight and sleeps for the next ten with his reading glasses on, and you take them off him somewhere over the Bay of Bengal and he does not wake.'),
      ],
    ],
    sebastian: [
      'Go where Sebastian is playing',
      'His tour has a Singapore date. Tell him, or don’t.',
      [
        p('His autumn tour has a Singapore date. You knew that. You have known it for a month without letting yourself look at why.'),
        p('You send him one line: “Singapore. Friday. Not for the concert.” He sends back: “Come to the concert anyway. After that, whatever you want.”'),
      ],
    ],
  };
  return [
    ...(hasCampaign(s)
      ? [
          go('campaign', 'Ring Odile: “Shoot it in Singapore”', 'Laurent’s autumn campaign, paid in advance. Let Celeste pay for the trip.', (x) => {
            setKey(x, 'own.campaign-location', 'singapore');
            return [
              q('Odile Frayne', 'Singapore? Darling, it’s a perfume. It could be shot in a car park.'),
              q('You', 'Singapore. The harbour at night. Tell them it’s where she was happiest. They’ll like that.'),
              p('There is a long pause full of pins.'),
              q('Odile Frayne', 'I’ll tell them. They’ll say yes. People always say yes to money they’ve already spent.'),
              p('Laurent’s people say yes by breakfast. They send a car to the airport and put you in the front of the plane, where the seats turn into beds and a steward asks, with real concern, whether you would like your pillow warmed.'),
              ...(famous(x)
                ? [p('At arrivals there is a photographer from a Singapore society magazine who shot “you” three years ago at a charity polo match, and who stops dead in front of you and says you haven’t aged a day. You tell him it’s the light. He takes eleven pictures.')]
                : []),
              t('Celeste is paying for me to go and look for the woman she threw away. I would like to be there when she realises.'),
            ];
          }),
        ]
      : []),
    go('quiet', 'Go quietly, on your own money', 'Economy. Sunglasses. A hotel on the wrong side of the river.', () => [
      p('You book it yourself, on your own card: economy, the aisle, a hotel on the far side of the river that nobody you know would stay in. You pack one bag. You wear sunglasses through the airport like a woman in a film who does not want to be recognised, and are recognised twice.'),
      p('Thirteen hours, a baby two rows back, a man beside you who watches three films about submarines. It is the most ordinary day you have had in two months, and you are grateful for every minute of it.'),
    ]),
    ...eveningPartners11(s).map((partner) => go(partner, withPartner[partner][0], withPartner[partner][1], () => withPartner[partner][2], partner)),
  ];
}

// ── Mrs Tan's Orchids ──

function emeraldBlocks(s: GameState): Block[] {
  const call = c(s, 'c8.call');
  return [
    p('Emerald Hill is a short street that climbs away from the shopping road as if it would rather not be seen with it: two rows of old shophouses, painted the colours of sugared almonds, with carved doors and green shutters and tiles set into the walls. The traffic stops at the bottom of the hill. The quiet starts halfway up.'),
    p('You know which house before you see the number. Your feet know. It is the sensation you have had on the stairs at home since the first night, of a body that has done this ten thousand times while you were not in it.'),
    t('She walked up this hill. Every evening. In these shoes, or ones like them.'),
    p('The street door is open for the heat. On the first landing, across from a dark green door with a brass 9 on it, is another door propped open with a watering can, and through it a room full of orchids: on the sill, on the table, on the floor, on shelves put up for them, fifty plants at least, purple and yellow and white.'),
    p('A small woman of seventy in a flowered housecoat is watering them one by one with a teapot.'),
    ...(call === 'evie'
      ? [
          p('She looks up. The teapot stops.'),
          q('Mrs Tan', 'Evie!'),
          p('She puts the teapot down on the floor and comes across the room with both hands out, and takes both of yours, and holds them, and looks up at your face with her own face working.'),
          q('Mrs Tan', 'You came. I said come and see them, and you came. So thin! What are they feeding you in that cold place?'),
        ]
      : call === 'ask'
        ? [
            p('She looks up, and puts the teapot down very carefully.'),
            q('Mrs Tan', 'You rang me back. You asked me when they came. I thought, she is asking like a policeman. Now you come yourself.'),
            p('She looks at you a long time from across the room, and does not come any closer.'),
            q('Mrs Tan', 'Come in, then. Shoes off. Mind the white ones.'),
          ]
        : call === 'down'
          ? [
              p('She looks up, and her face closes. She comes to the door and puts it on the chain before she speaks.'),
              q('Mrs Tan', 'You put the phone down on me. Three in the morning I ring, and you put the phone down.'),
              q('You', 'I didn’t know what to say to you. I still don’t.'),
              p('She considers that through the gap for a long moment. Then the chain comes off.'),
              q('Mrs Tan', 'Shoes off.'),
            ]
          : [
              p('She looks up, and her hand goes to her mouth, and she comes to the door and looks at you through it as if you were weather.'),
              q('Mrs Tan', 'Evie? No. Evie?'),
            ]),
  ];
}

const tanStory: Block[] = [
  p('She tells it in order, the way people tell a thing they have told themselves every night for a year.'),
  q('Mrs Tan', 'Late. Very late, a Saturday, fourteen months. I hear her on the stairs. Slow, with the bad leg, since Jakarta she has the bad leg. I open my door. She has all the orchids in her arms, all of them, and she puts them down on my mat.'),
  q('Mrs Tan', 'She says, “Auntie, water them for me. I’m going to my sister’s.” She never liked orchids, you know. People kept sending. She gave them all to me. Only this time it is all of them at once.'),
  q('Mrs Tan', 'And she says, “If a tall lady comes and asks, I have gone to Penang.” Then she goes down the stairs with one small bag. Before it is light. I watch from the window. She does not look back.'),
  p('Mrs Tan puts the teapot down on the table between you.'),
  q('Mrs Tan', 'The tall lady comes on the Monday. She does not ask me anything. She has her own key. She sits in the flat all afternoon, by herself, with the door shut. Then the men come, in white gloves, and she stands in the door and tells them what to take. Everything. Even the spoons.'),
  q('Mrs Tan', 'And then, one month after, other men come, and they bring it all back. New. Same chair, same lamp, same place. Every month since then, they come and they clean. For who? Nobody lives there. I ask them, for who? They say, for the tenant.'),
  t('For the tenant. For me.'),
  p('She gets up and goes to the white orchids on the sill, and lifts the nearest pot, and there underneath it, where it has been for fourteen months, is a key on a loop of green ribbon.'),
  q('Mrs Tan', 'She left it under this one. I never used it. Not once. It was not my business.'),
  p('She holds it out to you.'),
];

function emeraldChoices(): C12Choice[] {
  const tan = (id: string, label: string, hint: string, body: Block[]) =>
    offer12('tan-' + id, label, hint, 'flat', (x) => {
      set12(x, 'tan', id);
      note12(x, 'last-night', 'The first Evelyn left Emerald Hill late on a Saturday night fourteen months ago, before light, limping, with one small bag, “going to my sister’s”. If a tall lady asked, she had gone to Penang. The tall lady came on the Monday, with her own key.', 'Mrs Tan, across the landing');
      return [...body, ...tanStory];
    });
  return [
    tan('evie', 'Be Evie for her', 'She kept the orchids. She has kept the question longer.', [
      q('You', 'Auntie. I’m sorry I didn’t write.'),
      p('It comes out in a voice that is not quite yours, lower, with a lift at the end, and Mrs Tan’s eyes fill at once.'),
      q('Mrs Tan', 'Sit. Sit! You eat first. Then you tell me where you went. No — I tell you. You tell me nothing, you never tell me anything.'),
      p('She puts a bowl of noodles in front of you that you did not ask for and watches you eat all of it. Then she starts to talk, and you understand that she has been waiting fourteen months for somebody to tell this to, and that it does not much matter to her who.'),
      t('I am good at this. God help me, I am so good at this.'),
    ]),
    tan('truth', 'Tell her the truth, gently', 'You are not Evie. She deserves to know it from you.', [
      q('You', 'Mrs Tan. I’m not Evie.'),
      p('She looks at you for a long time. At your face, and then down, at the way you are standing.'),
      q('Mrs Tan', 'No. You stand wrong. You stand straight. I thought, it is the tiredness.'),
      q('You', 'They gave me her life. Her flat, her name, her face. I didn’t ask for it. I’m trying to find out what happened to her.'),
      p('Mrs Tan sits down slowly on the only chair not covered in orchids. She does not ask who “they” are. She has lived across the landing from them for four years.'),
      q('Mrs Tan', 'Then you listen properly. Like a policeman. I tell you everything, and you find out.'),
    ]),
    tan('listen', 'Let her decide who you are', 'Say nothing. Let her talk.', [
      p('You say nothing at all. You take your shoes off at the door and step between the pots and sit where she points, and let her look at you.'),
      p('She never quite decides. Once she calls you Evie. Once she says “you people”. She makes tea and puts two sugars in it without asking, and a pinch of cinnamon from a jar on the shelf, and watches you drink it.'),
      t('Two sugars and cinnamon. The receipt in the coat. She knows how the first Evelyn took her tea, and she is testing me with it, or feeding a ghost. Both.'),
    ]),
  ];
}

// ── Number 9 ──

function flatBlocks(s: GameState): Block[] {
  return [
    p('You wait until dark, because it seems the right way to go into a dead woman’s home, and because Mrs Tan says the men come in the mornings.'),
    p('The key turns as if it had been oiled last week. It probably was.'),
    p('You stand in the doorway with your hand on the light switch and do not press it. The street lamp through the shutters lays the room out in bars: a long room with a high ceiling and a fan, a sofa, a low table, a bookcase, a dining table with two chairs, and a pair of glass doors onto a balcony over the lane.'),
    p('Then you press the switch, and see it properly, and your stomach turns over.'),
    p('It is the room from the photographs. The ones in the Axiom package, a lifetime ago, that Adrian read on a screen before he had ever heard of Emerald Hill: Evelyn Vale at home. The same sofa, the same lamp with the same crooked shade. On the back of the dining chair, exactly where it hung in the photograph, the ivory jacket.'),
    p('There is fresh milk in the fridge, dated next week. There is a lipstick by the bathroom mirror, the cap off, as if somebody had just used it. There are flowers on the table: white orchids, of course, three stems in a glass vase, the water changed.'),
    t('It is not a home. It is a set. They have kept it dressed, every month, for fourteen months, so that when anyone checks — a bank, a border, a man at a charity polo match — Evelyn Vale has somewhere to live.'),
    t('They kept the shape. Ruth said that. I thought she meant my body.'),
    ...(lotteMet(s) ? [p('Through the glass doors the balcony has two chairs and a little table between them. Lotte’s voice, on the bridge: you and C., on the balcony, every night.')] : []),
    p('You close the door behind you, very quietly, and start to look.'),
  ];
}

function searchChoices(): C12Choice[] {
  const look = (id: string, label: string, hint: string, body: Block[], fact?: [string, string, string]) =>
    offer12('search-' + id, label, hint, 'flat', (x) => {
      set12(x, 'search', id);
      if (fact) note12(x, fact[0], fact[1], fact[2]);
      return body;
    });
  return [
    look(
      'desk',
      'The bureau by the window',
      'Every set has paperwork somewhere.',
      [
        p('The bureau is locked, with the kind of lock Adrian could open with a hairpin at twenty-two and you can open with one now. Inside: bills, all paid, all in her name. Bank statements, a modest balance, steady. A diary with lunches in it, a year ago, in a hand that is not quite hers: somebody has been writing her life for her.'),
        p('And under the diary, in a clear plastic sleeve, a single typed sheet on heavy cream paper with a small grey mark at the top that you have seen before, on a catalogue in a reading room.'),
        q('The schedule', 'SITE SG/EH-9 · Maintenance: monthly · Keep lived-in (post, perishables, flowers, lights on timer) · Tenant: reissue pending · Family contact (sister): N. Linden, Holland Village, cooperative — do not disturb.'),
        p('You read the last line four times.'),
        t('Sister. She had a sister. Somebody’s job is to make sure the sister is not disturbed.'),
        p('You photograph it, both sides, and put it back in its sleeve exactly as it was.'),
      ],
      ['schedule', 'A Meridian maintenance schedule for “Site SG/EH-9”, the Emerald Hill flat: kept lived-in monthly for a reissue, with a family contact, a sister, N. Linden, “cooperative — do not disturb”.', 'The bureau at number 9, photographed'],
    ),
    look(
      'wardrobe',
      'The wardrobe',
      'You know about wardrobes. You know about linings.',
      [
        p('The wardrobe is full. You run your hand along the rail and it is like running your hand along your own: the cuts you wear, the colours you have learned to choose, the silks and the good wool. Then you look at a label, and another, and your hand stops.'),
        p('They are new. All of them. Bought this year, in this year’s cloth, and cut not to her measurements but to yours: a centimetre narrower at the shoulder, longer in the arm. Somebody has had your measurements sent from London and dressed the set for its next tenant.'),
        p('Right at the back of the top shelf, behind the new hatboxes, is one old one, pushed into the corner where a man in white gloves reaching up would have missed it. In it, under tissue, an unused boarding pass for Penang, printed fourteen months ago for a flight at seven in the morning, and never scanned.'),
        t('Penang. “If a tall lady asks.” She printed a ticket she was never going to use, and hid it where they would find it only if they were thorough. She was running. She was laying a false trail on her way out of the door.'),
      ],
      ['penang', 'The first Evelyn printed a boarding pass for Penang the night she left and never used it: a false trail. She was running.', 'A hatbox at the back of the wardrobe at number 9'],
    ),
    look(
      'balcony',
      'The balcony',
      'Where Lotte saw them, every night.',
      [
        p('The glass doors are stiff. The balcony is narrow and hot, and hangs over the lane like a box at the opera: two cane chairs, a small iron table, a single ashtray, washed.'),
        p('You sit down in the left-hand chair without thinking, and it fits you, and you get up again at once.'),
        p('Across the lane, one floor up, is a window exactly level with this one. Its blind is half down. On its sill, in the only light in the house, stands a single white orchid in a pot, like a lamp left on for somebody.'),
        p('You look at it for a long time. Nobody moves behind the blind. But the orchid is watered, and turned towards the light, and the window is exactly where you would put a window if you wanted to watch a woman on a balcony every night.'),
        t('The balcony, every night, with C. And a window across the lane, every night, watching the balcony.'),
      ],
      ['balcony', 'Across the lane from number 9’s balcony, a window exactly level with it keeps a single white orchid on the sill, watered and turned to the light.', 'The balcony at number 9'],
    ),
  ];
}

const keyInLock: Block[] = [
  p('And then, in the quiet, a key in the lock.'),
  p('Not a knock. A key, and the unhurried sound of somebody who expects the flat to be empty, and a man’s voice on the landing saying something to Mrs Tan’s shut door, and laughing at his own joke.'),
];

/** The bedroom (deepening pass): her bed, the drawer, or her mirror, before the caretaker's key. */
function bedChoices(): C12Choice[] {
  const bed = (id: string, label: string, hint: string, body: Block[], fact?: [string, string, string]) =>
    offer12('bed-' + id, label, hint, 'flat', (x) => {
      set12(x, 'bed', id);
      if (fact) note12(x, fact[0], fact[1], fact[2]);
      return [...body, ...keyInLock];
    });
  return [
    bed('lie', 'Lie down on her bed', 'Just for a minute. It is your bed, apparently.', [
      p('The bedroom is at the back, away from the lane: a wide low bed made up tight, white sheets, one pillow dented as if somebody had slept on it last night. Somebody has dented it on purpose.'),
      p('You lie down on it in your clothes. The ceiling fan turns. The sheets are cool and smell of starch and, underneath the starch, very faintly, of a perfume you know: green and bitter, like a stem snapped off. You have smelled it in the back of a car, and across a breakfast table, and on a terrace over the river, close enough to touch.'),
      t('They spray it on the pillow. Not hers. Celeste’s. Every month, on the schedule, so that the bed smells of the one person who ever lay in it with her.'),
      p('You lie there longer than you mean to, with your eyes closed, in the scent of the woman who burned her, in a bed that was made up for you. It is the most intimate thing that has happened to you in weeks, and nobody touched you.'),
    ]),
    bed(
      'drawer',
      'The bedside drawer',
      'The set dresser’s job ended at the surface.',
      [
        p('The bedside drawer holds what a set dresser thinks a woman keeps by her bed: a new paperback, spine uncracked, a sleep mask still in its packet, a tube of hand cream. Props.'),
        p('But the drawer is a hand’s breadth shorter than the table. You have been looking for false backs since the night of the wardrobe. You take the drawer right out and reach into the dark behind it, and your fingers find paper, folded small and pushed to the back, where only somebody who had lived with this table would know there was a space.'),
        p('It is a page torn from a notebook, written in pencil, in a hand that slopes the way yours has started to slope:'),
        q('The note', 'N. — If anybody comes with flowers, don’t open the door. Not even for her. Especially not for her. Sunday. Spare bed. I’ll explain everything. E.'),
        t('Not even for her. Especially not for her. She knew. She wrote it down, and never got to send it.'),
        p('You fold it along its old folds and put it inside your bra, against your skin, where nobody in white gloves is ever going to find it.'),
      ],
      ['note', 'Behind the bedside drawer at number 9, an unsent note in the first Evelyn’s hand to her sister: “If anybody comes with flowers, don’t open the door. Not even for her. Especially not for her.”', 'Her own pencil, behind the drawer'],
    ),
    bed('mirror', 'The dressing table', 'Her lipstick, the cap off. Your shade.', [
      p('The dressing table faces the window, with a round mirror and a little stool. On it lies a second lipstick, the twin of the one by the bathroom mirror, its cap off too: a dark red worn to a slant.'),
      p('You sit. You pick it up. It is your shade: the one you have bought three times in London without once asking yourself why that one. You put it on the way you have learned to, two strokes and a blot, and look up.'),
      p('The woman in the round mirror is sitting in her own bedroom, at her own table, in her own colour, in the light from her own window. She looks entirely at home.'),
      t('They chose my lipstick because she chose it first. I have been wearing a dead woman’s mouth for two months, and it suits me.'),
    ]),
  ];
}

function caughtChoices(): C12Choice[] {
  const caught = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer12('caught-' + id, label, hint, 'straits', (x) => {
      set12(x, 'caught', id);
      after?.(x);
      return body;
    });
  return [
    caught(
      'hide',
      'Hide',
      'The bathroom. The door not quite shut. Don’t breathe.',
      [
        p('You are in the bathroom with the light off and the door an inch open before the front door has finished opening. You stand in the dark between the bath and the basin with your back flat against the tiles, and the lipstick with its cap off by your hand.'),
        p('He is young, in a grey polo shirt with a logo on the breast, and a clipboard, and earbuds in, humming. He does not turn the main light on; the timer lamps are enough for him. He goes round the room with the ease of a man who has done this forty times. He checks the milk. He waters the orchids. He waters a fern by the window that you realise, watching, is plastic.'),
        p('Then he photographs the room from each corner, for a report, and comes down the short passage towards the bathroom, and puts his hand flat on its door.'),
        p('You watch his fingers through the gap. They rest on the paint for a long second.'),
        p('His phone buzzes. He takes his hand away to answer it, and laughs at whatever is said, and goes out talking, and locks the door behind him, and you hear him on the stairs all the way down.'),
        p('On the table by the door he has left the clipboard while he found his keys, and forgotten it for four seconds. You were watching for exactly that. The top sheet is headed with a company name and an address: STRAITS PROPERTY SERVICES · THE MARLOWE HOTEL, 4TH FLOOR. Below it, a line for tonight: Site SG/EH-9 · all in order.'),
        t('All in order. Except the tenant, standing in the dark in her bathroom, with her heart going like a bird against a window.'),
      ],
      (x) => {
        setKey(x, 'act3.singapore', 'key');
        note12(x, 'report', 'The Emerald Hill flat is kept by Straits Property Services, reporting to the fourth floor of the Marlowe Hotel. Tonight’s report: “Site SG/EH-9 · all in order.”', 'The caretaker’s clipboard, read through a bathroom door');
      },
    ),
    caught(
      'evie',
      'Be the tenant',
      'Walk out of the bedroom as if you lived here. You do.',
      [
        p('You step out of the bedroom as the light goes on, barefoot, a hand to your hair, the way you would if you had been lying down and heard a stranger in your flat.'),
        q('You', 'Oh — hello. Thank you. I’ll be staying a while, so you needn’t come for a bit.'),
        p('He goes white from the collar up. He looks at your face, and then at the photograph on his clipboard, and then at your face.'),
        q('Caretaker', 'Ms Vale. I’m so sorry. Nobody said the tenant was — I’m so sorry, ma’am. I’ll go.'),
        p('He backs out with the watering can still in his hand. On the stairs, not quietly enough, you hear him make a call.'),
        q('Caretaker', 'The Marlowe? Fourth floor, yes. It’s Deshan, at Emerald Hill. The tenant’s in. The tenant. She’s moved in. No, nobody told me.'),
        t('The tenant has moved in. By morning, Celeste will know. She will be enchanted.'),
      ],
      (x) => {
        setKey(x, 'act3.singapore', 'moved-in');
      },
    ),
    caught(
      'own',
      'Be yourself, and ask the questions',
      '“My name is Evelyn Vale. Who pays you?”',
      [
        p('You are standing by the bureau with the light on when he comes in, and you do not move.'),
        q('You', 'My name is Evelyn Vale. This is my flat, apparently. Who pays you to keep it?'),
        p('He stops with the key still in his hand. He is perhaps twenty-four, and frightened, and after a moment he is also honest, because he does not know enough to be anything else.'),
        q('Caretaker', 'I don’t know, ma’am. Honestly. Straits Property Services. I get a list of flats. I clean them and I water the plants and I send photographs. Nine flats. Nobody lives in any of them.'),
        q('You', 'Nine.'),
        q('Caretaker', 'I report to a number. Sometimes a man rings back. That’s all I know. Please, I need this job.'),
        p('He writes the number on the back of his hand, and then, when you look at it, on a page of his clipboard, and tears it off for you.'),
        t('Nine flats. Nobody lives in any of them. Nine sets, kept dressed. I am not the only one.'),
        p('When you ring it from the street, a hotel switchboard answers: “Good evening, the Marlowe.”'),
      ],
      (x) => {
        setKey(x, 'act3.singapore', 'everything');
        note12(x, 'nine', 'Straits Property Services keeps nine flats in Singapore “lived-in” for tenants who never come, reporting to a number answered by the Marlowe Hotel. Emerald Hill is one of them.', 'The caretaker, in the doorway of number 9');
      },
    ),
  ];
}

// ── The Punkah Bar ──

function straitsBlocks(s: GameState): Block[] {
  const roads: Block[] = [];
  if (irisFree(s)) roads.push(p('Iris’s number answers on the first ring. “The Marlowe,” she says, before you have finished the question. “He ran Singapore for nine years. He drinks in the Punkah Bar every night from eleven, because it is the only thing they left him. His name is Ashby. Tell him I sent you, and watch his face.”'));
  if (coatFound(s)) roads.push(p('In your purse is the matchbook from the pocket of her coat, the one you have carried since that night in the wardrobe: the Punkah Bar, the Marlowe Hotel, and a crest of a fan.'));
  if (ruthTold(s)) roads.push(p('Ruth’s voice, at the club: somebody gave her name to the wrong people. The man who ran her, Ruth said, still drank in the same hotel, because nobody had told him to stop.'));
  return [
    ...roads,
    p('And all of it, every road, comes to the same door: the Marlowe, a white colonial hotel on the edge of the Straits, where the caretaker sends his photographs, on the fourth floor, and where on the top floor there is a bar.'),
    p('The Punkah Bar is the last room of its kind in the city. Long, dim, teak and brass, with the old cloth fans still hanging from the ceiling on their ropes, and electric fans turning above them to do the real work. The shutters stand open on the harbour: a thousand lights on black water, and ships at anchor as far as you can see, each lit like a small town.'),
    p('A pianist plays to nobody. A barman polishes a glass that is already clean. At the far end, at the last table by the shutters, sits a man of sixty in a linen suit that was very good twenty years ago, with a glass in front of him and three more in him.'),
    t('Colin Ashby. Meridian’s man in Singapore for nine years. He has not seen me yet.'),
    p('Between you and him is the whole length of the bar, and on the last stool, turning to watch you come in the way men in bars have turned to watch women come in since there were bars, is a man who stops turning halfway, and stares.'),
    p('Forty, tanned, a beautiful shirt, and the pale band of a wedding ring he has taken off and not quite hidden. He is up off the stool before you have taken three steps.'),
    q('Kit Harlow', 'Evie. Jesus. Evie Vale. They said you’d gone back to London for good.'),
  ];
}

const ashbySees: Block[] = [
  p('Across the room the man in the linen suit has seen you now. He puts his glass down on the table very slowly, as if it might go off.'),
  t('He knows my face, because he knew hers.'),
];

/** Kit Harlow at the bar (deepening pass): a man who wanted Evie, before Ashby. */
function barChoices(): C12Choice[] {
  const bar = (id: string, label: string, hint: string, body: Block[], fact?: [string, string, string]) =>
    offer12('bar-' + id, label, hint, 'straits', (x) => {
      set12(x, 'bar', id);
      if (fact) note12(x, fact[0], fact[1], fact[2]);
      return [...body, ...ashbySees];
    });
  return [
    bar(
      'flirt',
      'Let Kit buy you a drink',
      'He wants Evie. Let him think he has her, for one drink. Your lead.',
      [
        p('You let him. You let him order for you, a gin sling, “like always”, and you let that stand, and you sit on the stool beside his with your knee almost touching his and let him look at you, because he so plainly wants to, and because it costs you nothing you are not choosing to spend.'),
        q('Kit Harlow', 'God, you look well. You look happier. London suits you.'),
        p('He puts two fingers on the inside of your wrist, lightly, where the pulse is, as if he had done it before and been told off for it. You leave them there. You lean in, so that he has to lower his voice.'),
        q('You', 'Tell me what you remember. About me. The last few months.'),
        q('Kit Harlow', 'You want the truth? You never once went home with anybody from this bar. Not me, God knows, and I tried for a year. Only her.'),
        q('Kit Harlow', 'The tall one. Laurent. You’d leave together at one in the morning, and you’d look — I used to hate her, for how you looked.'),
        p('He takes his fingers off your wrist and looks at them.'),
        q('Kit Harlow', 'And then at the end you stopped leaving with her. You sat at the end of the bar on your own and asked me if I knew anybody with a boat. I thought you were joking.'),
        t('A boat. She was looking for a way out that didn’t go through an airport. And the only man who noticed thought she was flirting.'),
        p('You put your hand on his cheek, once, lightly, and leave him the drink.'),
        q('You', 'Thank you, Kit. Go home to your wife.'),
      ],
      ['kit', 'A regular at the Punkah Bar says the first Evelyn only ever left with “the tall one, Laurent”, until the last months, when she sat alone and asked him if he knew anybody with a boat.', 'Kit Harlow, at the bar'],
    ),
    bar('truth', 'Tell him he’s mistaken', 'Kindly. You are not who he thinks.', [
      q('You', 'I’m sorry. I think you have me mixed up with somebody.'),
      p('He looks at you for a long moment, the way they all do in the end: at your face, and then at the way you stand. Something goes out of his shoulders.'),
      q('Kit Harlow', 'No. You’re right. Evie would have let me buy the drink, and then made me feel a fool for it. It was the best part of my week.'),
      q('Kit Harlow', 'If you ever see her. Tell her Kit said the boat thing was never a joke to him. He’d have found her one.'),
      p('He goes back to his stool and his glass, and does not look round again.'),
      t('A boat. She was trying to get out by water.'),
    ]),
    bar('cool', 'Smile, and keep walking', 'He is not who you came for.', [
      p('You give him the smile, her smile, you realise, the one that promises a great deal later, and keep walking, and feel him watch you all the way down the bar.'),
      q('Kit Harlow', 'Still breaking hearts, Evie.'),
      p('Behind you the barman says something to him, low, and he laughs without meaning it.'),
    ]),
  ];
}

const ashbyStory = (s: GameState): Block[] => [
  q('Ashby', 'She was the best I ever ran. You should know that. Whatever you are. Eight years, and she never once came back without what she went for. She could walk into a room of men who had been lying for a living since before she was born and have them telling her the truth by the fish course.'),
  q('Ashby', 'Then Jakarta.'),
  p('He turns the glass round on the table, a quarter turn, and another.'),
  q('Ashby', 'Somebody gave her name to the wrong people in Jakarta. Her real name. The one under the legend. In our line that is called being burned, and there is no coming back from it. They broke her leg, among other things. She was very lucky, and she didn’t think so.'),
  q('You', 'Who gave them her name?'),
  q('Ashby', 'Not my desk. I want you to know that. I have had fourteen months to want somebody to know that.'),
  p('He drinks. The pianist moves into something slow.'),
  q('Ashby', 'It came down from upstairs. From a friend of hers. That’s all I’m going to say, and it’s more than I should, and you already know, or you wouldn’t be sitting there in her face.'),
  q('You', 'Why?'),
  q('Ashby', 'Because she wanted out. That was the real sin, you see. Not anything she did in Jakarta. She had told somebody she trusted that it was her last job. She was going to walk out of her own legend and take it with her, eight years of it, lived in, worth more than this hotel. Nobody leaves. You’ll have heard that said.'),
  q('Ashby', 'A burned woman can’t take anything anywhere. Nobody will work with her, nobody will hide her. And the legend stays on the shelf, as good as new. They kept the shape.'),
  q('Ashby', 'When she was in the hospital in Jakarta, somebody sent flowers. Every day for three weeks. White orchids. She hated orchids. She used to give them to the nurses.'),
  ...(kessler(s) ? [q('Ashby', 'Anna Kessler. Yes, I knew Anna. Another one who liked boats. Don’t follow that one any further than you have. I mean it kindly.')] : []),
  q('Ashby', 'She had a sister. Nora. Holland Village, a house with a frangipani. Go and see her before you go home. Somebody should, who knows.'),
  p('He finishes the glass, and does not order another, which you think is the only compliment he has paid anybody in a year.'),
];

function straitsChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'bar')) return barChoices();
  const talk = (id: string, label: string, hint: string, body: Block[], record: boolean) =>
    offer12('ashby-' + id, label, hint, 'sister', (x) => {
      set12(x, 'ashby', id);
      if (record) {
        set12(x, 'statement', 'recorded');
        note12(x, 'statement', 'Colin Ashby, Meridian’s Singapore station head for nine years, on the record: the first Evelyn was burned in Jakarta on an order that “came down from upstairs, from a friend of hers”, because she wanted out; somebody sent white orchids to her hospital bed every day.', 'Ashby, recorded on your phone at the Punkah Bar');
      } else note12(x, 'ashby', 'Colin Ashby says the order to burn the first Evelyn in Jakarta “came down from upstairs, from a friend of hers”, because she wanted out; somebody sent white orchids to her hospital bed every day.', 'Ashby, at the Punkah Bar, off the record');
      return [...body, ...ashbyStory(x)];
    });
  return [
    talk('evie', 'Sit down as her', 'Let him talk to a ghost. He has been waiting to.', [
      p('You cross the room the way she would have crossed it, with the weight on the left foot, and sit down opposite him without being asked, and take a cigarette from his packet on the table, and do not light it.'),
      q('You', 'Hello, Colin.'),
      p('He closes his eyes. When he opens them they are wet, and he is angry about it.'),
      q('Ashby', 'Don’t. Please. I know what you are. I read the file. It doesn’t help, in this light.'),
      p('But he talks to her anyway, the way people talk to a grave: fast, and to the point, and with nothing held back that he can bear to say.'),
      t('I am good at this, and it is a terrible thing to be good at.'),
    ], false),
    ...(pressReady12(s)
      ? [
          talk('press', 'Lay what you have on the bar', 'The catalogue, the list, the caretaker’s report. And a phone, recording.', [
            p('You sit down opposite him and put your phone on the table between you, screen up, recording, and then beside it, one by one, everything you have brought from London and from Emerald Hill, every page with Meridian’s grey mark or the Marlowe’s own address on it.'),
            p('Ashby reads it all. Slowly. His hand does not shake until the end.'),
            q('Ashby', 'Well. Look at you. They sent a reissue, and it came back with more than I got in nine years.'),
            p('He looks at the phone, and the little red light on it, for a long moment. Then he leans towards it, very slightly, like a man at a microphone.'),
            q('Ashby', 'My name is Colin Ashby. For nine years I ran the Singapore station for Meridian Holdings. Ask me something.'),
          ], true),
        ]
      : []),
    talk('truth', 'Tell him what you are', '“I’m the reissue. They fitted me to her.”', [
      p('You sit down opposite him.'),
      q('You', 'I’m not her. I’m the reissue. They fitted me to her. I’d like to know what I’m wearing.'),
      p('He looks at your face for a long time, feature by feature, the way a man looks at a house he used to live in.'),
      q('Ashby', 'They did a good job. God help them. They always did.'),
      p('He signals to the barman for two more, and when they come he pushes one across to you, and when you put your phone on the table he looks at it, and nods, and does not ask you to put it away.'),
      q('Ashby', 'All right. For her. Not for you. You understand.'),
    ], true),
  ];
}

// ── Nora ──

function sisterBlocks(): Block[] {
  return [
    p('Holland Village on a Sunday afternoon: low white houses behind hedges, a hawker centre smelling of charcoal and lime, children on bicycles, the heat sitting on everything like a cat.'),
    p('The house is at the end of a lane. A frangipani in the yard, dropping its flowers on a child’s bicycle lying on its side. A porch with a fan. A door with a name on a little painted tile: LINDEN.'),
    p('You stand at the gate for a long time. You rehearsed this on the flight, and in the taxi, and in the bathroom at the hotel with the tap running. You have nothing.'),
    t('I am about to show a woman her dead sister’s face. There is no good way to do it. There is only the way I choose.'),
    p('You ring the bell.'),
    p('The woman who opens the door is forty, in a faded cotton dress, with reading glasses pushed up into grey-streaked hair and a pen still in her hand. She has marking to do; there is a pile of exercise books on the hall table behind her. She has her sister’s mouth. She has, you realise with a lurch, your mouth.'),
    p('She looks at you, and the pen falls out of her hand, and she takes hold of the door frame with both hands as if the house were moving.'),
    q('Nora', 'Nell?'),
  ];
}

const noraStory: Block[] = [
  p('The kitchen is small and bright and full of her son’s drawings. Nora makes coffee without asking, and puts two sugars and a pinch of cinnamon in yours, and then stops with the spoon in her hand, and looks at it, and at you.'),
  q('Nora', 'That was hers. Two sugars and cinnamon. Our mother made it like that. The black was always her friend’s.'),
  q('You', 'Tell me about her.'),
  p('And she does, for an hour. Eleanor Linden, Nell to everyone who mattered, two years older, the clever one, the one who could talk to anybody. A job in a family office that paid for everything and could not be described. A second name for work, Vale, that she said was “for the clients”, and a little laugh when she said it. Nora followed her out here eight years ago, and they had lunch every Sunday, and Nell never missed one, not once, until the one she missed.'),
  q('Nora', 'She hated orchids. She loved the harbour at night. She walked like our father, even after the leg. She could not keep a plant alive to save her life.'),
  q('Nora', 'She rang me on the Saturday. Late. She said, “I’m out. I’m coming to you tomorrow. Make up the spare bed.” She sounded — happy. Frightened, and happy. I made the bed.'),
  p('Nora looks at her hands on the table.'),
  q('Nora', 'She didn’t come. They found her in the harbour the next week. Misadventure, the coroner said. She had a bad leg, it was dark, the wall by the water is low there. She had been drinking, they said. Nell didn’t drink.'),
  p('Then she looks up, and says the thing she has plainly said to nobody else, because there has been nobody to say it to.'),
  q('Nora', 'Her friend rang me. On the Sunday morning, early, before the police, before anybody knew anything. The tall one, with the beautiful voice. She said she was so sorry. So terribly sorry. And then she rang off.'),
  q('Nora', 'I have spent a year wondering how she knew.'),
];

const samArrives: Block[] = [
  p('The screen door bangs. Feet on the tiles, fast, and a boy of seven comes into the kitchen at a run with a football under his arm and grass on both knees, talking before he is through the door.'),
  q('Sam', 'Mum, Mum, Ravi’s dad says —'),
  p('He sees you, and stops dead in the middle of the floor, and the football rolls away under the table.'),
  q('Sam', 'Auntie Nell?'),
];

/** Leaving Nora's (after Sam): the photograph at the gate. */
function parting(s: GameState): Block[] {
  return get12(s, 'nora') === 'truth'
    ? [
        p('It is dark when you leave. At the gate Nora puts a photograph into your hand: Nell on the harbour wall at night, laughing at whoever is holding the camera, in flat shoes, the left one worn down at the heel. It is your face. It is somebody else.'),
        q('Nora', 'Whoever did this to her. When you find them. I want to be in the room.'),
      ]
    : [
        p('At the gate she presses a photograph on you, “for her friend”: Nell on the harbour wall at night, laughing, in flat shoes. Your face. Somebody else.'),
        t('I lied to her in her own kitchen, in her sister’s face, and she thanked me for it. I will have to put that on the wall too.'),
      ];
}

/** Nora's son (deepening pass): Sam, seven, who remembers his aunt. */
function samChoices(): C12Choice[] {
  const sam = (id: string, label: string, hint: string, body: Block[]) =>
    offer12('boy-' + id, label, hint, 'night', (x) => {
      set12(x, 'boy', id);
      return [...body, ...parting(x)];
    });
  return [
    sam('hold', 'Let him hold on', 'Just for a moment. He has been waiting fourteen months too.', [
      p('He hits you round the waist before anybody can stop him and holds on, his face pressed into your side, and you put your hand on his hot small head because there is nothing else in the world to do with it.'),
      q('Sam', 'You smell different.'),
      q('You', 'I’ve been away a long time.'),
      p('Over his head Nora is watching you with her hand over her mouth. She does not stop it. After a while she says his name very gently, and he lets go, and looks up at you, and runs out into the yard again as if the world had been put back the right way up.'),
      t('I will pay for that one. I don’t know yet how. I let him have it, and I would again.'),
    ]),
    sam('friend', 'Kneel down and tell him', '“I’m not your auntie. I’m her friend.”', [
      p('You get down on your knees on the kitchen tiles, so that your face is level with his.'),
      q('You', 'I’m not your auntie, Sam. I’m her friend. I look a bit like her. She told me all about you.'),
      p('He studies you with the terrible frankness of seven.'),
      q('Sam', 'Is she coming back?'),
      p('You look at Nora. Nora looks at the floor.'),
      q('You', 'No, sweetheart. She isn’t. But she wanted to. She was on her way.'),
      p('He thinks about that. Then he nods, as if it were a thing he had known for a while and only needed somebody to say out loud, and goes to get his football from under the table.'),
    ]),
    sam('nora', 'Let Nora answer', 'It’s her son. It was her sister.', [
      p('Nora is out of her chair before you can move. She catches him up under the arms, football and all, and turns him away from you towards the sink.'),
      q('Nora', 'This is Auntie’s friend, Sam. From London. Go and wash your knees.'),
      p('He goes, but slowly, walking backwards, looking at you over his shoulder all the way to the door, as if you might vanish if he took his eyes off you. You keep very still until he has gone.'),
      q('Nora', 'He was five. He remembers her better than I do, some days.'),
    ]),
  ];
}

function sisterChoices(): C12Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer12('nora-' + id, label, hint, id === 'go' ? 'night' : 'sister', (x) => {
      set12(x, 'nora', id);
      setKey(x, 'act3.nell', 'known');
      setKey(x, 'act3.celeste-knew', 'seeded');
      after?.(x);
      note12(x, 'nell', 'The first Evelyn was Eleanor “Nell” Linden. Burned in Jakarta, she rang her sister Nora on a Saturday night fourteen months ago: “I’m out. I’m coming to you tomorrow.” She never arrived. She was found in the harbour the next week; the coroner said misadventure.', 'Nora Linden, her sister');
      note12(x, 'sunday-call', 'On the Sunday morning, before the police or anybody knew anything, Nell’s tall friend with the beautiful voice rang Nora to say she was “so terribly sorry”.', 'Nora Linden');
      return body;
    });
  return [
    answer('truth', 'Tell her the truth', '“I’m not Nell. They gave me her life.” The hardest thing you will say this year.', [
      q('You', 'I’m not Nell. I’m so sorry. I’m not. They gave me her life. Her name, her flat, her face. I didn’t choose it. I came to find out who she was.'),
      p('Nora does not let go of the door frame. She looks at you for a long time, the way Mrs Tan did, the way Ruth did: down, at your feet, at the way you stand.'),
      q('Nora', 'No. You’re not. She walked like our father. You don’t.'),
      p('Then, to your astonishment, she steps back and holds the door open.'),
      q('Nora', 'Come in. You’d better come in. I don’t want the neighbours seeing her on my step, crying.'),
      p('You had not known you were crying.'),
      ...noraStory,
      ...samArrives,
    ], (x) => {
      setKey(x, 'act3.ally.nora', 'in');
    }),
    answer('kind', 'Tell her you knew Nell', 'A kindness that is also a lie. She wants it so badly.', [
      q('You', 'I’m not Nell. I knew her. People always said we looked alike. She talked about you all the time.'),
      p('It is the cruellest and the kindest thing you have ever said, and Nora wants it so badly that she takes it without looking at it. Her face breaks open.'),
      q('Nora', 'She did? What did she say? No — come in. Come in, please. Tell me everything she said.'),
      p('So you go in, and you make it up, and you make it up beautifully: Sunday lunches, a sister she was proud of, a spare bed she was looking forward to. Nora cries, and laughs, and gives you back more than you give her.'),
      ...noraStory,
      ...samArrives,
    ]),
    answer('go', 'Walk away', 'You can’t do this to her. Say it’s the wrong house.', [
      q('You', 'I’m so sorry. I have the wrong house.'),
      p('You turn and go down the path, past the bicycle and the fallen flowers, and do not run. Behind you the door does not close.'),
      p('You are at the end of the lane when she catches up with you, barefoot on the hot road, the pen still in her hand.'),
      q('Nora', 'You’re not her. I know you’re not. She walked like our father. You walk like somebody who was taught.'),
      p('She stands in front of you in the road, breathing hard, looking at your face the way you would look at a photograph of a house that burned down.'),
      q('Nora', 'Her name was Eleanor. Nell. They found her in the harbour. Misadventure. She had rung me the night before, to say she was coming. And on the Sunday morning, before anybody knew anything, her friend rang me. The tall one. To say she was so sorry.'),
      q('Nora', 'I’ve never told anybody that. I don’t know why I’m telling you. Yes I do. Whoever sent you, tell them I know.'),
      p('She turns and walks back up the lane to her house, and you stand in the road in the heat until a car hoots at you.'),
      t('I couldn’t do it to her, and she did it to me instead. She was braver than me by a mile.'),
    ]),
  ];
}

// ── The Heat ──

function nightBlocks(s: GameState): Block[] {
  return [
    p('The harbour at midnight. The heat has not broken; it never breaks here, it only changes its mind. The towers across the water are lit from top to bottom, gold and white and a blue that belongs to no natural thing, and the whole of it lies again upside down in the black water, shaking.'),
    p(
      (get12(s, 'nora') === 'go' ? 'You find the place without trying, the way your feet found Emerald Hill' : 'You find the place from Nora’s photograph without trying') +
        ': a stretch of the old sea wall below the promenade, where the railing stops and the wall is low enough to sit on. Couples sit on it now, with their shoes off, their feet over the water. A man sells cold coconuts from a cart. A tour boat goes by, playing music.',
    ),
    t('She went into the water here, in the dark, with a bad leg, on her way to her sister’s. A week later they took her out. She had been drinking, they said. Nell didn’t drink.'),
    p('The black phone lights in your hand.'),
    q(
      'C.',
      get12(s, 'nora') === 'go'
        ? 'You went to Nora’s. Such a sweet girl. She never could keep a plant alive either.'
        : 'You’ve met Nora. Such a sweet girl. She never could keep a plant alive either.',
    ),
    p('And then, a minute later, a photograph. A London street at seven in the evening, in the rain, taken from across the road through a car window: Maya, coming out of the Axiom building with her bag over her shoulder, looking at her phone, not knowing.'),
    q('C.', 'London misses you.'),
    t('Nothing about Nell. Nothing about the harbour. She knows exactly where I am standing, and she has sent me Maya, in the rain.'),
    ...(c(s, 'c6.maya') === 'restored'
      ? [
          p('You write three replies to Celeste and delete all three. Then you write one to Maya instead, on your own phone: “Thinking of you. Home soon. Take a taxi tonight, would you? Humour me.”'),
          p('She answers inside a minute, from a bus in the rain: “A TAXI? who are you. fine. bring me something.” And a row of hearts. You stand on the sea wall in the heat laughing, with your eyes stinging.'),
        ]
      : [p('You write three replies to Celeste and delete all three. You do not have the right to write to Maya. You look at the photograph until the phone goes dark by itself.')]),
  ];
}

function harbourChoices(): C12Choice[] {
  const at = (id: string, label: string, hint: string, body: Block[]) =>
    offer12('harbour-' + id, label, hint, 'night', (x) => {
      set12(x, 'harbour', id);
      return body;
    });
  return [
    at('name', 'Say her name to the water', 'Out loud. Once.', [
      p('You go down to the low wall and stand where the photograph was taken, and say it, not loudly, to the water.'),
      q('You', 'Nell.'),
      p('A woman sitting further along the wall looks round at you, and then away, politely, the way people look away from somebody at a grave.'),
      t('Eleanor Linden. Somebody has said it here, at least once, who knew what it meant.'),
    ]),
    at('coffee', 'Two coffees', 'One black. One with two sugars and cinnamon.', [
      p('There is an all-night coffee stall at the end of the promenade. You buy two: one black, one with two sugars and cinnamon, which the man has to go into the back to find.'),
      p('You put the sweet one on the wall where she sat in the photograph, and drink the black one standing beside it, looking at the water, until it is gone.'),
      t('The black was always her friend’s. Tonight it’s mine.'),
    ]),
    at('quiet', 'Stand there', 'Until the heat lets go of you.', [
      p('You stand at the railing and do not do anything at all. The boats go by. The couples go home. At some point, without deciding to, you put the black phone face down on the wall, and leave it there for an hour, lighting and lighting.'),
    ]),
  ];
}

function eveningInvite12(partner: Partner12): Block[] {
  if (partner === 'julian')
    return [
      p('Julian has been standing at the top of the steps for ten minutes, deciding whether to come down. You knew. You let him decide.'),
      q('Julian Mercer', 'I didn’t follow you. I followed the only woman in Singapore who looked the way I felt.'),
      q('Julian Mercer', 'Come back with me. The windows open on the Straits. No business. Tell me what you want, and that’s what happens.'),
    ];
  if (partner === 'theo')
    return [
      p('Theo is sitting on the wall twenty yards along with two coconuts and no crew, and his reading glasses on, pretending to read the harbour.'),
      q('Theo Marr', 'I wrapped at ten. I haven’t asked you a single question all week. It is killing me. I’m not going to start now.'),
      q('Theo Marr', 'Come back to the hotel. No cameras. Tell me what you want tonight.'),
    ];
  return [
    p('The concert finished an hour ago. He finds you at the wall still in his concert shirt, the sleeves pushed up, the cello left at the hall with a promise to come back for it.'),
    q('Sebastian', 'You don’t have to tell me what today was. I can see it on you.'),
    q('Sebastian', 'Come here, or don’t. Whatever you want tonight. Nobody gets to buy any of it.'),
  ];
}
const scopeReply12: Record<Partner12, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that is the night. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  theo: { 'no-sex': 'Then that’s what we do. I’m very good at wanting things I don’t get.', sex: 'Yes. And the moment you want to stop, we stop.' },
  sebastian: { 'no-sex': 'Good. I would like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stay12: Record<Partner12, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you in front of the open windows with the ships lit up all the way to the horizon behind you, and stops exactly where you tell him to, and holds you there, your dress damp with the heat, his hand flat and warm on your back, until the fan has turned a thousand times.')],
    sex: [
      p('He undresses you slowly with the windows open and the night coming in, hot and loud and smelling of the sea, and tells you that you have never once looked like anybody but yourself to him, and asks once more with his mouth at your throat. You answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays in that room above the Straits. The scene fades.'),
    ],
  },
  theo: {
    'no-sex': [p('He kisses you slowly on the balcony of the crew hotel with the city roaring below, and when you tell him where tonight stops he says “good” and means it, and you fall asleep in the heat on top of the sheets, your head on his shoulder, his glasses still on.')],
    sex: [
      p('For once he says nothing clever at all. Underneath the charm is somebody hungrier and less sure of himself, which you like better. He asks once more, low. You answer by pulling him down with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
  },
  sebastian: {
    'no-sex': [p('In his hotel room he undoes your dress slowly and says out loud what he likes about what he finds, and stays exactly on his side of the line you drew, with the air-conditioning off and the windows open on the heat, and it is very, very good.')],
    sex: [
      p('In his hotel room he undoes your dress slowly and says out loud what he likes. The lamp stays on. The windows stay open. When he asks once more whether you are sure, you answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
  },
};

function nightChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'harbour')) return harbourChoices();
  const partner = companion(s);
  const open = get12(s, 'evening-open');
  if (partner && open) {
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer12(`evening-${partner}-${id}`, label, hint, 'night', (x) => {
          set12(x, 'evening-open', partner + '-room');
          set12(x, 'evening-scope', id);
          note12(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who12[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who12[partner], scopeReply12[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer12('evening-leave', 'Say goodnight and go back alone', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c12.evening-open'];
          set12(x, 'evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go back to your own hotel alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get12(s, 'evening-scope') as 'no-sex' | 'sex';
    return [
      offer12('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c12.evening-open'];
        set12(x, 'evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He puts you in a taxi and does not ask to come with you, and you are more grateful for that than for anything else today.')];
      }),
      offer12('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c12.evening-open'];
        set12(x, 'evening-outcome', 'intimate-' + scope);
        return [...stay12[partner][scope], p('In a city that remembers somebody else’s body, you chose what to do with your own.')];
      }),
    ];
  }
  return [
    ...(partner && !get12(s, 'evening')
      ? [
          offer12('evening-' + partner, `Go with ${name12[partner]}`, 'A night you choose, in a city that thinks it knows you.', 'night', (x) => {
            set12(x, 'evening', partner);
            set12(x, 'evening-open', partner);
            return eveningInvite12(partner);
          }),
        ]
      : []),
    offer12('night-alone', 'Go up to the roof alone', 'Chapter 12 ends here.', 'complete', () => [
      p('The hotel roof has a pool lit from underneath, empty at this hour, the water perfectly still and blue and warm as a bath. You sit on the edge with your feet in it and your shoes beside you, and look at the city that thinks it knows you, until the sky over the ships goes grey.'),
    ]),
  ];
}

// ── A Name ──

function completeBlocks(s: GameState): Block[] {
  const singapore = getKey(s, 'act3.singapore');
  return [
    p('Heathrow in grey morning rain, cold after the heat like a slap you were expecting.'),
    ...(pryceKnown(s)
      ? [
          p('Mr Pryce is at arrivals, in the chauffeur’s cap, holding a card with nothing on it but a V.'),
          q('Pryce', 'Ms Laurent’s compliments. She thought you’d be tired.'),
          p('He takes your bag. In the car, at the first set of lights, without looking in the mirror, he says:'),
          q('Pryce', 'Good trip?'),
          q('You', 'I met her sister.'),
          p('His hands move once on the wheel, and are still.'),
        ]
      : [p('At arrivals there is a driver holding a card that says only VALE, whom you did not book. You walk past him to the taxi rank. He does not follow. He does not need to.')]),
    ...(singapore === 'moved-in'
      ? [p('On the kitchen table at home, when you let yourself in, is a single white orchid in a pot, and a card: “So glad you found the flat comfortable. It will always be there for you. C.”')]
      : singapore === 'everything'
        ? [p('On the kitchen table at home, when you let yourself in, is a single white orchid in a pot, and a card: “Nine, darling. Do count them properly next time. C.”')]
        : [p('On the kitchen table at home, when you let yourself in, is a single white orchid in a pot, and no card at all.')]),
    p(c(s, 'c8.neighbour') ? 'You put the orchid outside on the landing for Mrs Kowalczyk, who will keep it alive.' : 'You put the orchid outside on the landing for whoever wants it. Somebody will. Somebody always keeps them alive.'),
    p('Then you take a new card from the drawer, and write on it in capitals, and pin it to the wall beside the date, where you will see the two of them together every morning.'),
    ...(get12(s, 'nora') !== 'go' ? [p('Beside it you pin Nora’s photograph: Nell on the harbour wall, laughing, in flat shoes.')] : []),
    t('Eleanor Linden. Nell. She took two sugars and cinnamon, and hated orchids, and was running when they caught her. I have her face and her flat and her coat. I am going to give her back her name, in a room full of the people who took it.'),
  ];
}

// ── Blocks and choices ──

export function chapter12Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter12') return [];
  if (s.phase === 'departure') return departureBlocks(s);
  if (s.phase === 'emerald') return emeraldBlocks(s);
  if (s.phase === 'flat') return flatBlocks(s);
  if (s.phase === 'straits') return straitsBlocks(s);
  if (s.phase === 'sister') return sisterBlocks();
  if (s.phase === 'night') return nightBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter12Choices(s: GameState): C12Choice[] {
  if (!chapter12Playable(s)) return [];
  if (s.scene === 'chapter11' && s.phase === 'complete' && ownPower(s))
    return [offer12('begin', 'Singapore', 'Three weeks until the first Thursday. Go and find her.', 'departure')];
  if (s.scene !== 'chapter12') return [];
  if (s.phase === 'departure') return departureChoices(s);
  if (s.phase === 'emerald') return emeraldChoices();
  if (s.phase === 'flat') return !get12(s, 'search') ? searchChoices() : !get12(s, 'bed') ? bedChoices() : caughtChoices();
  if (s.phase === 'straits') return straitsChoices(s);
  if (s.phase === 'sister') return get12(s, 'nora') ? samChoices() : sisterChoices();
  if (s.phase === 'night') return nightChoices(s);
  return [];
}

export function applyChapter12Choice(state: GameState, id: string): GameState {
  const choice = chapter12Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter12';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter12.${s.phase}` as NodeId, blocks: chapter12Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER12_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
