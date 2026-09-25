/** Chapter 11 (Act III, own-power played as the Celebrity route) · The Asset:
 * arrival → viewing → upstairs → order → ending → after → complete.
 * Design: docs/story/CHAPTER_11_THE_ASSET_DESIGN.md (owner-approved 2026-09-25, all six decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_11_THE_ASSET_SCRIPT.md. Gated behind chapter11Playable(), reached from an
 * own-power Chapter 10 ending. The first Thursday at the Vesper Gallery, Meridian's showroom: the evening is a viewing,
 * Evelynn is on the catalogue ("available for placement from the first Thursday of next month"), and the second order
 * is to burn Iris Moreau, another Meridian legend. Coercion follows docs/story/CONTENT_DIRECTION.md §3: comply /
 * refuse / counterplay, each with a real cost; refusal lands on the named, non-sexual threat (Maya's clearance,
 * escalated). The dance is chosen and hers to lead; the only intimacy is the optional chosen evening (heat 3,
 * consent-gated, fades).
 * Deepening pass (2026-09-25): every scene written as a set piece, plus two moments: Celeste's "Do you like being
 * looked at?" in the viewing (c11.looked = yes | turn | silent), and two board members in the corridor upstairs
 * (c11.hide = curtain | brazen | down), and the last minutes with Iris before the cloakroom (c11.walk = name | laugh |
 * quiet; she was Helen, before), and the way home (c11.way = car | walk: Mr Pryce at the bridge). Maya's Monday and
 * Iris's word move to the close, after the night. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { eveningPartners10, get10, julianInPlay10, theoInPlay10 } from './chapter10';

export type C11Scene = { title: string; place: string; blocks: Block[] };
export type C11Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get11 = (s: GameState, k: string) => s.choices['c11.' + k];
export const set11 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c11.' + k] = v;
};
const offer11 = (id: string, label: string, hint: string, next: string, apply?: C11Choice['apply']): C11Choice => ({
  id: 'chapter11.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter11Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER11 === '1';

function note11(s: GameState, key: string, text: string, source: string) {
  if (get11(s, 'rec.' + key) !== undefined) return;
  set11(s, 'rec.' + key, String(s.history.length));
  set11(s, 'event.' + key, String(s.revision));
  set11(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c11.' + key);
  s.knowledge.push('c11.' + key);
}

export const chapter11Definitions: Record<string, C11Scene> = {
  arrival: { title: 'The First Thursday', place: '20:00 · THE VESPER GALLERY', blocks: [] },
  viewing: { title: 'The Viewing', place: '20:30 · THE LONG ROOM', blocks: [] },
  upstairs: { title: 'Upstairs', place: '21:40 · THE PRIVATE FLOOR', blocks: [] },
  order: { title: 'The Second Order', place: '22:15 · THE TERRACE', blocks: [] },
  ending: { title: 'Ending', place: '22:40 · THE CLOAKROOM', blocks: [] },
  after: { title: 'What the Clients Saw', place: 'MIDNIGHT · AFTERWARDS', blocks: [] },
  complete: { title: 'A Date', place: '· LATER', blocks: [] },
};
export const chapter11Scenes = Object.entries(chapter11Definitions).map(([phase, scene]) => ({
  id: `chapter11.${phase}` as NodeId,
  ...scene,
}));

// ── What Chapters 5–10 left her ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const famous = (s: GameState) => !!get5(s, 'published');
const pryceKnown = (s: GameState) => !!c(s, 'c8.pryce');
const mayaPrior = (s: GameState) => getKey(s, 'act3.maya-clearance');
/** Theo comes as her companion ("bring nobody") only if he is in play and was not the one she betrayed. */
const theoCompanion = (s: GameState) => theoInPlay10(s) && get10(s, 'betrayed') !== 'theo';
/** The third way needs something she built: a strong case, Celeste surprised once already, the poisoned notes, the
 * catalogue photographed, Theo in the room, or Julian as an ally. */
export const counterReady11 = (s: GameState) =>
  c(s, 'case.strength') === 'strong' ||
  !!getKey(s, 'act3.celeste-surprised') ||
  !!get10(s, 'poison') ||
  get11(s, 'catalogue') === 'photo' ||
  get11(s, 'entry') === 'defy' ||
  (getKey(s, 'act3.ally.julian') === 'in' && julianInPlay10(s));

/** Scene-specific place lines (display only). */
export function place11(s: GameState): string | undefined {
  if (s.scene !== 'chapter11') return;
  if (s.phase === 'arrival' && get10(s, 'invitation') === 'pending' && !get11(s, 'entry')) return '19:30 · The car she booked';
  const evening = get11(s, 'evening-open');
  if (s.phase === 'after' && evening)
    return evening.startsWith('julian') ? 'Late · Julian’s apartment' : evening.startsWith('theo') ? 'Late · Theo’s flat above the studio' : 'Late · Harbour, after the last set';
}

// ── The First Thursday ──

function arrivalBlocks(s: GameState): Block[] {
  const green = get10(s, 'green');
  return [
    p('The first Thursday comes the way the invitation said it would, whether you answered it or not.'),
    p(
      green === 'own'
        ? 'You wear the green you wore to the Harbour gala. It fits the way it did the night you asked a room full of people who owned Meridian. Tonight you are walking into the answer.'
        : green === 'odile'
          ? 'You wear Odile’s green. It fits as if it had been cut for you, because it was, and her card is still in the box: they will all be looking.'
          : green === 'buy'
            ? 'You wear the green you bought yourself on the hill, the one that looks least like anybody’s idea of you.'
            : green === 'black'
              ? 'You wear the black. Not the green. She will notice. You want her to.'
              : 'You wear the green.',
    ),
    ...(c(s, 'c9.tailor') === 'alter'
      ? [p('Mr Anand took it in at the shoulder yesterday, a centimetre, without being asked twice, so that tonight nothing you wear fits you the way it fitted her.')]
      : []),
    p('You dress slowly, the way you would load something. Stockings. The dress. The zip you can only just reach on your own. The good earrings, and then not the good earrings: nothing at the ears, nothing at the throat, so that there is nothing on you anybody else chose.'),
    p('Hair up and pinned hard. The face finished, and then finished again. In the wardrobe mirror a woman you are still learning looks back at you, and for once you let her look.'),
    t('Every woman in that room tonight will have been dressed by somebody. I would like, just once, to be the only one who knows who dressed me.'),
    ...(get10(s, 'invitation') === 'pending'
      ? pryceKnown(s)
        ? [
            p('At half past seven the car she booked is at the kerb with its engine running. Mr Pryce is holding the rear door, in a chauffeur’s cap that does not suit him, looking at the pavement.'),
            q('Pryce', 'Ms Laurent’s compliments.'),
          ]
        : [p('At half past seven the car she booked is at the kerb with its engine running. The driver holds the rear door, says Ms Laurent’s compliments, and nothing else the whole way.')]
      : [p('You take a taxi, on your own money, because it is the one part of the evening she has not arranged.')]),
    p(
      get10(s, 'invitation') === 'pending'
        ? 'The car smells of leather and, faintly, of her. There is a single white orchid in the bud vase by the window. You look at it all the way across the river.'
        : 'The driver takes the embankment the long way and you let him, and watch the river go by black and fast, and count the bridges, the way Adrian used to count the floors in a lift when he was frightened.',
    ),
    p('The Vesper Gallery is a black glass front on the embankment with no name on the door. You have walked past it a dozen times. There has always been one painting in the window, changed every month, never for sale. Tonight the window is empty.'),
    p('There is no bell. The door opens as you reach it, held by a young man in a black suit who does not ask your name, because he already knows it.'),
    q('Doorman', 'Good evening, Ms Vale. They’re expecting you.'),
    t('They. Not she.'),
    p('Inside, the long room is lit like a museum after hours: warm light on dark walls, and on the walls, frames. Twenty of them, gilt and black, each one lit from above as carefully as if it held something. None of them does.'),
    p('Under each empty frame, on the wall, is a small brass plate, the kind that would give a title and a year. You read the nearest one as you pass. It gives only a number.'),
    ...(c(s, 'c9.auction')
      ? [
          p('Except one. At the far end, over the fireplace, in the best light in the room, hangs the Aster portrait: you. The only full frame in the gallery.'),
          t('She bought me at a charity auction and hung me in her showroom.'),
        ]
      : []),
    t('Empty frames, and forty people in evening dress standing in front of them. I understand the joke before I understand what it is a joke about.'),
  ];
}

function arrivalChoices(s: GameState): C11Choice[] {
  const enter = (id: string, label: string, hint: string, body: Block[]) =>
    offer11('arrive-' + id, label, hint, 'viewing', (x) => {
      set11(x, 'entry', id);
      return body;
    });
  return [
    enter('star', 'Walk in as the face they know', 'Let them look. People say things in front of a face they think they know.', [
      p(
        famous(s)
          ? 'You stop in the doorway and let them see you. It takes three seconds: a woman by the nearest frame, then the man she is talking to, then the room. Forty people who know your face from the side of a bus decide at once to look as if they had not noticed you, and fail.'
          : 'You stop in the doorway and let them see you. Forty people turn, not because they know your face but because she has told them to expect it.',
      ),
      p('The minister’s wife actually puts a hand to her throat. Halvorsen turns all the way round. Only one person in the room does not look at you at all, and that is how you find her: Celeste, at the far end, talking to a man with his back to you, entirely occupied, smiling slightly, the way you smile at a joke you told yourself.'),
      t('Being looked at is the one thing I know how to do better than any of them. Let them look.'),
    ]),
    enter('quiet', 'Come in on the edge, and watch', 'Fewer eyes. Better ears.', [
      p('You come in behind a couple arguing gently about a boat, take a glass from a tray and stand at the edge of the room by an empty frame, as if you were considering it. Nobody looks at you for almost a minute. It is the longest minute of freedom you have had in weeks.'),
      p('From the edge you can see how the room works. The clients drift; the staff do not. Every waiter who passes glances once at the doorway to the stairs. A woman in grey silk stands at a silver-haired man’s elbow and watches the room the way you are watching it, and once, across its whole length, her eyes meet yours, and hold, and let go.'),
      t('Watch first. Adrian always read the room before he read the file.'),
    ]),
    ...(theoCompanion(s)
      ? [
          enter('defy', 'Bring Theo', '“Bring nobody.” Bring somebody.', [
            p('You walk in on Theo Marr’s arm. He is in a dinner jacket that is not quite his size, and delighted with himself.'),
            q('Theo Marr', 'She said bring nobody. I’m nobody. Ask anyone at the network.'),
            p('Across the room Celeste sees the two of you and does not stop smiling. She lifts her glass to Theo, very slightly, the way you would acknowledge a move in a game you intend to win.'),
            p('Theo takes two glasses from a tray, hands you one, and murmurs without moving his lips, the way he must have learned to in a hundred green rooms:'),
            q('Theo Marr', 'Twenty frames, no pictures, forty people, and every one of them pretending not to count the exits. I have never been so happy.'),
            t('She will account for him. I know that. I wanted her to have to.'),
          ]),
        ]
      : []),
  ];
}

// ── The Viewing ──

function viewingBlocks(s: GameState): Block[] {
  const green = get10(s, 'green');
  const julian = julianInPlay10(s);
  return [
    p('Celeste finds you before you have finished your first sip, or lets you think she has only just seen you. She is in black silk, her hair cropped close to her head, no jewellery at all, which in this room is its own jewellery.'),
    q(
      'Celeste',
      green === 'black'
        ? 'Black. How brave. She would never have dared.'
        : green === 'own'
          ? 'The gala green. You kept it. I knew you would.'
          : green === 'odile'
            ? 'Odile’s green. She always did know exactly what I meant.'
            : 'You wore the green. Thank you, darling. It matters more than you think.',
    ),
    p('She takes your arm the way she did at the Glass House and walks you down the long room as if you were a hang she was showing a buyer: slowly, stopping at each frame, introducing you to the people standing in front of it.'),
    p('A shipping man called Halvorsen, silver-haired, with the tan of a man who owns the sea he tans on, and at his elbow a woman in grey silk who does not smile when he does. A minister’s wife who asks what you do, and does not wait for the answer. A quiet man from a Gulf fund who looks at you the way the tailor did, measuring.'),
    p('Halvorsen shakes your hand and keeps it a moment, looking at your face with a buyer’s frankness, and says he has heard great things. The minister’s wife adores your work, and when you ask which, laughs and says all of it. The man from the Gulf fund says nothing at all, only bows very slightly and looks at your hands, your shoulders, the way you stand, as if checking them against a list.'),
    ...(julian
      ? [
          p('And Julian. He is standing alone by an empty frame near the terrace doors with a glass he is not drinking, and when Celeste brings you to him he says “Ms Vale” as if you had met once at a conference, and his eyes do not leave your face.'),
          q('Celeste', 'Helix is one of our oldest clients. Julian likes to see what we have before anybody else does.'),
          t(
            get10(s, 'betrayed') === 'julian'
              ? 'He has not found out yet what I took from his wall. Or he has, and he came anyway.'
              : 'He knew what this room was before I did. He came anyway. I don’t know yet which of those I mind more.',
          ),
        ]
      : []),
    ...(get11(s, 'entry') === 'defy'
      ? [
          q('Celeste', 'And Mr Marr. How lovely. You must tell me what you’re working on. Everybody else is so afraid to.'),
          q('Theo Marr', 'A piece about empty frames, Ms Laurent.'),
          p('She laughs, delighted, and does not let go of your arm.'),
        ]
      : []),
    p('Halvorsen keeps you longer than the others. He is the kind of rich that likes to be liked, and he tells you about his ships and his grandchildren and a storm off the Cape in 1987, and then, lowering his voice as if it were a confession, about the woman in grey.'),
    q('Halvorsen', 'Iris reads everything before I do. Every contract, every letter. Four years. I would be lost without her. My wife says I’m in love with her, and my wife is wrong, but not by much.'),
    p('He laughs. Across the room the woman in grey is listening to the minister with her head tilted, and does not look at Halvorsen at all, and knows exactly where he is.'),
    p('The talk is all of one kind, and it takes you a quarter of an hour to hear it. Placements. Availability. A public profile. Our last one. The minister’s wife hears the autumn collection is very strong. Halvorsen has been very happy with his, and touches the arm of the woman in grey as he says it, and she does not move.'),
    t('It is not a party. It is a viewing. The frames are empty because we are the paintings, and she has walked me the length of the room so that everybody who might buy could see how I hang.'),
    p('Celeste’s hand is still on your arm. You feel her feel you understand it. Her fingers tighten, once, very slightly, the way a rider’s do on a rein.'),
  ];
}

/** Later, by the terrace doors: Celeste asks the question she asked on the terrace in Chapter 9, differently. */
const asideLead: Block[] = [
  p('Later, when the circle round you has broken up, Celeste finds you again by the terrace doors and stands at your shoulder looking out at the room, as if the two of you were admiring a view.'),
  q('Celeste', 'They adore you. I knew they would. Tell me something honestly, darling, since we are among friends. Do you like being looked at?'),
];

const irisMeets = (s: GameState): Block[] => [
  p('In the powder room a woman in grey silk is at the mirror, not fixing anything. It is the woman at Halvorsen’s elbow: forty, perhaps, beautifully finished, her hair in a low knot, and she is watching the door in the mirror the way you would watch it.'),
  q('Woman in grey', get10(s, 'green') === 'black' ? 'You’re new. They wanted you in the green, and you came in black. Good for you.' : 'You’re new. They put you in the green.'),
  p('She takes a cigarette from a silver case and does not light it.'),
  q('Woman in grey', 'Iris. Iris Moreau. Four years with Mr Halvorsen. Chief of staff, it says on the door. It says a great many things on a great many doors.'),
  p('She turns from the mirror and leans against the basin, and for a moment neither of you says anything. Outside, the quartet starts something you both pretend not to recognise.'),
  q('Iris', 'You’re very good. The chin. The shoulders. The way you keep your eyes on the room and your smile on the person. They taught you that fast.'),
  q('You', 'Nobody taught me.'),
  q('Iris', 'No. Nobody ever does. That’s the trick of it.'),
  t('She knows what I am. She knows because she is one.'),
];

function viewingChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'room')) {
    const work = (id: string, label: string, hint: string, body: Block[]) =>
      offer11('room-' + id, label, hint, 'viewing', (x) => {
        set11(x, 'room', id);
        return [...body, ...asideLead];
      });
    return [
      work('dazzle', 'Give them the show', 'Be the woman they came to see. People tell stars things.', [
        p('So you give it to them. You are funny about the Aster shoot and indiscreet about a television host and tender about the city, and by the second glass the circle round you is six deep and every one of them is trying to be the one who makes you laugh.'),
        p('Halvorsen, trying hardest, lowers his voice to tell you a secret as if it were a gift.'),
        q('Halvorsen', 'They keep us down here with the champagne till ten. The board likes to be upstairs while we drink. Makes them feel like the house.'),
        t('The board is upstairs. Tonight. While the clients drink.'),
      ]),
      work('listen', 'Be charming, and say nothing', 'Let them talk. Listen for the thing they didn’t mean to say.', [
        p('You smile and nod and ask one question for every ten minutes of answers, and let them fill the silence the way people always fill the silence round a beautiful woman who seems to be listening.'),
        p('The man from the Gulf fund, talking to someone behind you, says the word you have been waiting for: the catalogue. Upstairs, he says, in the reading room. You can look, but you can’t take it home.'),
        t('A catalogue. Of course there is a catalogue.'),
      ]),
      work('dance', 'Accept a dance from the man from the Gulf fund', 'Use it. Your lead. Step out the moment you have what you came for.', [
        p('There is a quartet in the corner nobody is listening to, and when the man from the Gulf fund asks you to dance you say yes, because he has watched you all evening the way a buyer watches, and because a man dancing with a woman he wants will tell her anything to keep her there.'),
        p('He dances well. His hand is warm on the bare small of your back and stays exactly where you let it. You lean in half an inch, no more, and his mouth is at your ear, and you let him think the half-inch was his idea.'),
        q('Man from the Gulf fund', 'You should see the catalogue. Upstairs, the reading room, the second door. You’re on page seven. I looked before you arrived.'),
        p('You step out of his arms at the end of the phrase, smiling, and thank him, and leave him standing in the middle of the floor holding the shape of you.'),
        t('Page seven. He looked before I arrived. I let a man hold me for three minutes to learn my own page number, and I enjoyed the three minutes more than I will ever admit.'),
      ]),
    ];
  }
  if (!get11(s, 'looked')) {
    const look = (id: string, label: string, hint: string, body: Block[]) =>
      offer11('look-' + id, label, hint, 'viewing', (x) => {
        set11(x, 'looked', id);
        return [...body, ...irisMeets(x)];
      });
    return [
      look('yes', 'Tell her the truth: yes', 'Give her something real. It is true.', [
        q('You', 'Yes.'),
        p('She turns her head and looks at you properly for the first time tonight, and whatever she sees makes her smile go somewhere private.'),
        q('Celeste', 'So did she. It was the only thing about her I never had to teach.'),
        t('It is true. I like it more than anything Adrian ever had. She knew before I said it, and she wanted to hear me say it anyway.'),
      ]),
      look('turn', 'Ask her whether she likes selling it', 'Turn it round.', [
        q('You', 'Do you like selling it?'),
        p('For a moment the noise of the room seems to drop away round the two of you.'),
        q('Celeste', 'I like placing things where they will be most appreciated. It is a kind of love, darling. You will see.'),
        p('She pats your arm and moves off into the room, and you feel, very precisely, where her fingers were.'),
      ]),
      look('silent', 'Say nothing', 'Let her read your face instead.', [
        p('You say nothing. You watch the room with her, and let her watch you watching it, and after a while she laughs softly.'),
        q('Celeste', 'Silence. That’s new too. I think I like it better.'),
      ]),
    ];
  }
  const ask = (id: string, label: string, hint: string, body: Block[]) =>
    offer11('iris-' + id, label, hint, 'upstairs', (x) => {
      set11(x, 'iris-met', id);
      return body;
    });
  return [
    ask('how', 'Ask her how she knew', 'What gave you away?', [
      q('You', 'How did you know?'),
      q('Iris', 'You hold your glass like you’re about to put it down in a hurry. We all do, the first year.'),
      p('She smiles, for the first time, and it is a real smile, and it makes her look very tired.'),
      p('Then she tells you three more things in two minutes: which of the clients is kind, which is not, and which of the waiters will carry a message anywhere for twenty pounds. Then she checks her face in the mirror, although there is nothing on it to check.'),
    ]),
    ...(c(s, 'c9.kessler') === 'follow'
      ? [
          ask('anna', 'Ask her about Anna Kessler', 'The last one. Six years ago.', [
            q('You', 'Did you know Anna Kessler?'),
            p('Something in the mirror goes very still.'),
            q('Iris', 'Anna used to stand exactly where you’re standing. She had the green too.'),
            q('Iris', 'She was better than me. One season, and then a boat, and then nothing. They told us it was an accident. They always do.'),
            p('She puts the unlit cigarette back in its case, carefully, as if it might break.'),
          ]),
        ]
      : []),
    ask('out', 'Ask her if she ever thinks about leaving', 'She has been here four years.', [
      q('You', 'Do you ever think about leaving?'),
      q('Iris', 'Every morning. Nobody leaves, darling. We’re ended. It’s a different verb.'),
      p('Then, lower, as the door opens behind you both:'),
      q('Iris', 'If you ever want to see how the house works, find me. I’ll show you the stairs.'),
      p('She takes the cigarette out of its case again, and this time she lights it, with a match from a book with a hotel’s name on it, and draws on it once, and looks at it as if surprised.'),
      q('Iris', 'Four years I’ve carried that case. That’s the first one I’ve lit. Don’t tell anyone.'),
    ]),
  ];
}

// ── Upstairs ──

function upstairsBlocks(s: GameState): Block[] {
  return [
    p('At twenty to ten the quartet stops for a break and the room gets louder, the way rooms do when the music that was covering them goes. Celeste has gone. Nobody saw her leave. Nobody ever does.'),
    t(
      getKey(s, 'act3.board-day')
        ? 'The first Thursday. The board meets tonight. She told me so at breakfast, the way you would mention the weather.'
        : 'She has gone upstairs. Everybody who matters in this building has gone upstairs.',
    ),
    p('You stand by an empty frame with an empty glass and give it a slow count of sixty, the way you would let a meeting settle before you said the thing you came to say. Nobody is looking at you. It is the first time all evening that nobody has been looking at you, and you do not trust it.'),
    p('There are three ways up that you can see: the service stair behind the cloakroom, the main staircase with a man at the foot of it, and anybody here with a key.'),
  ];
}

const corridor: Block[] = [
  p('The private floor is a corridor of closed doors and thick carpet that eats your footsteps. Halfway along, one door stands an inch open on a line of light and voices: men’s voices, and one woman’s, unhurried, that you would know anywhere.'),
  q('Celeste (through the door)', 'The product is performing. The defect, as you call it, is an asset in a public placement. Nobody controls a star. That is exactly what makes her useful.'),
  q('A man’s voice (through the door)', 'And the Reyes woman? The friend?'),
  q('Celeste (through the door)', 'A handle. Every product comes with one. Hers is unusually good.'),
  q('Another voice (through the door)', 'And Moreau?'),
  q('Celeste (through the door)', 'Tonight. Halvorsen has had four good years and he is beginning to trust her, which is always the moment. I thought the new one might like to learn how it is done.'),
  p('Somebody laughs. Somebody pours something. A chair creaks as a man leans back in it, pleased with the evening.'),
  t('The defect. ORACLE’s verdict, that I could not be held. She is selling it as a feature. And Maya is a handle.'),
  p('The second door is the reading room. It smells of beeswax and old paper. There is a chair nobody sits in, a window over the river with the curtains open, and a lectern under one lamp like an altar, with one book on it, bound in dark green leather. The Autumn Collection.'),
  p('Every page is a person. A photograph, initials, a line of type. A woman in Lisbon, placed eight years. A man in a harbour town you have never heard of, available. A young man who cannot be twenty-five, in preparation. You stop turning pages there for a moment, and then you make yourself go on.'),
  p('Page seven: the Aster photograph, the one they printed, and under it, in the same plain type as the client list:'),
  q('The catalogue', 'E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month.'),
  p('Under the line, in smaller type, a paragraph of notes, the kind an estate agent writes about a house: Responds well to attention. Tolerates public exposure; seeks it. Controllability: low (see ORACLE). Recommended placement: high visibility, short term, client-facing.'),
  t('Tolerates public exposure; seeks it. It is the most accurate thing anybody has ever written about me, and it was written to sell me.'),
  p('Two pages on, a woman in grey silk with her hair in a low knot.'),
  q('The catalogue', 'I. M. · Four years · Ending.'),
  t('Available from the first Thursday of next month. She has put a date on me. And Iris is ending.'),
];

function upstairsChoices(s: GameState): C11Choice[] {
  if (get11(s, 'catalogue')) return hideChoices();
  if (!get11(s, 'up')) {
    const climb = (id: string, label: string, hint: string, body: Block[]) =>
      offer11('up-' + id, label, hint, 'upstairs', (x) => {
        set11(x, 'up', id);
        return [...body, ...corridor];
      });
    return [
      climb('stairs', 'Take the service stair', 'Stealth. Heels in your hand.', [
        p('You take your heels off at the cloakroom corner and go up the service stair in your stockings: two flights of bare concrete that smell of floor polish and cigarettes.'),
        ...(pryceKnown(s)
          ? [
              p('On the first landing Mr Pryce is sitting on a folding chair with a newspaper, like a man guarding nothing. He looks up. He looks at you for a long moment, and then down at his paper again, and turns a page.'),
              t('He let me past. I don’t know why. I don’t think he does either.'),
            ]
          : [p('On the first landing a folding chair stands empty beside an ashtray with one cigarette still burning in it. You go past it quickly.')]),
        p('At the top of the second flight there is a fire door with a push-bar, propped open an inch with a folded beer mat. Somebody uses this door a great deal and does not like the noise it makes.'),
      ]),
      climb('escort', 'Get a client to take you up', '“Show me the rest of the collection.”', [
        p('You find the minister’s wife by the terrace doors and tell her you would love to see the rest of the collection, and she is so delighted to be the one showing the new girl round that she takes you up the main staircase herself, past the man at the foot of it, talking all the way.'),
        q('Minister’s wife', 'Everyone says the upstairs rooms are the real collection. I’ve never been allowed further than the landing. You must tell me everything.'),
        p('At the top she waves you on down the corridor, says she must find her husband, and leaves you there.'),
      ]),
      ...(get11(s, 'iris-met') === 'out'
        ? [
            climb('iris', 'Find Iris', 'She said she’d show you the stairs.', [
              p('Iris is on the terrace with her unlit cigarette. She looks at you, and at the ceiling, and puts the cigarette away.'),
              q('Iris', 'Four years, and nobody has ever asked me to show them anything.'),
              p('She takes you up through a door in the panelling you would never have seen and a stair behind it, and leaves you at the top with a hand on your arm for a second.'),
              q('Iris', 'Reading room, second door. Don’t touch anything you can’t put back.'),
            ]),
          ]
        : []),
    ];
  }
  const take = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer11('cat-' + id, label, hint, 'upstairs', (x) => {
      set11(x, 'catalogue', id);
      after?.(x);
      return [...body, ...footsteps];
    });
  return [
    take('photo', 'Photograph both pages', 'Evidence. If they catch you with it, the evening is over.', [
      p('You photograph your page, and Iris’s, and the spine, and the lectern: four frames, the flash off, your hand steady. Voices in the corridor. You are behind the door with the phone against your chest before they pass.'),
    ], (x) => note11(x, 'catalogue', 'Meridian’s catalogue, The Autumn Collection, lists Evelynn as “E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month”, and Iris Moreau as “I. M. · Four years · Ending”.', 'The catalogue in the Vesper’s reading room, photographed')),
    take('page', 'Tear your own page out', 'Steal yourself back. She will know.', [
      p('You tear page seven out along the spine, slowly, so that it comes away clean, and fold it into the lining of your bag.'),
      t('She will know. I want her to know. Let her find a gap in her collection.'),
    ], (x) => note11(x, 'catalogue', 'Evelynn tore her own page from Meridian’s catalogue: “E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month.” Iris Moreau’s page reads “Ending”.', 'Page seven of The Autumn Collection, in Evelynn’s bag')),
    take('leave', 'Take nothing', 'Remember every line. Leave no mark.', [
      p('You take nothing. You read both pages twice, close the book exactly as it was, and go back down with every line of it in your head.'),
    ]),
  ];
}

/** Two board members in the corridor (deepening pass): where she is when they reach the reading room. */
const footsteps: Block[] = [
  p('Then voices in the corridor: the board-room door opening all the way, and two men coming out in no hurry, lighting cigarettes, walking your way.'),
  q('A man in the corridor', '…and she wants the new one to do it herself. The Moreau woman, tonight. Laurent always did like to watch them learn.'),
];

function hideChoices(): C11Choice[] {
  const hide = (id: string, label: string, hint: string, body: Block[]) =>
    offer11('hide-' + id, label, hint, 'order', (x) => {
      set11(x, 'hide', id);
      return body;
    });
  return [
    hide('curtain', 'Behind the curtain, in the window bay', 'Hold your breath. Hold very still.', [
      p('You step into the window bay, draw the curtain across in one movement, and stand against the cold glass with the river forty feet below, not breathing. The men come in. One of them turns a page of the catalogue idly, the way you would leaf through a menu.'),
      q('A man in the reading room', 'Page seven. Even better in person, I thought.'),
      p('They smoke for two minutes that last an hour. You can see the tip of one man’s shoe under the hem of the curtain, and smell his cigarette, and hear him breathe. Then they go out again, and leave the door open behind them.'),
      p('You stay behind the curtain a full minute more with your forehead against the cold glass and the river going past below, black and fast, the lights of the tour boats smeared across it.'),
      t('Even better in person. I have been reviewed.'),
    ]),
    hide('brazen', 'Step out and meet them', 'You are a guest who got lost. Be one.', [
      p('You step out into the corridor with your empty glass, a little unsteady: a woman who has had one champagne more than she meant to and is looking for the powder room. The men stop. The older one looks at you for a long moment with frank pleasure, the way you would look at a painting you had just bought.'),
      q('An old man in the corridor', 'The powder room is downstairs, Ms Vale. So is everything else you’re looking for.'),
      p('He stands aside to let you pass, and does not stop looking, and you walk down the main staircase past the man at the foot of it with your back very straight.'),
      t('He knew my name. They all know my name. That is what page seven is for.'),
    ]),
    hide('down', 'Back down the stair before they reach you', 'Leave now. Nobody sees you here.', [
      p('You are through the door in the panelling before the men reach the corner, and down the stair in your stockings two steps at a time, and back in the long room with your shoes in your hand. Nobody sees you but a waiter, who looks at your feet and then very carefully at the ceiling.'),
    ]),
  ];
}

// ── The Second Order ──

function orderBlocks(s: GameState): Block[] {
  const suspended = mayaPrior(s) === 'suspended';
  return [
    p('Celeste finds you on the terrace, of course. The river is black and fast below it and the city is lit along both banks, and she stands beside you at the balustrade as if the two of you had come out here together to look at it.'),
    ...(get11(s, 'catalogue') === 'page'
      ? [q('Celeste', 'You tore out page seven. Nobody has ever done that. I shall have it bound in again, and keep the torn edge.')]
      : []),
    p('She takes an envelope from her bag, cream, the Vesper’s mark on the flap, and holds it out to you between two fingers.'),
    q('Celeste', 'Iris has been ours for four years, and she has done beautifully, and she is ending. Put this in her bag before she leaves. It is in her hand. Halvorsen will find it tonight, and that will be that.'),
    q('Celeste', 'I would like her to end tonight, darling, and I would like you to be the one.'),
    q('Celeste', suspended ? 'Maya is still suspended, I think. A review can become a dismissal. They so often do.' : 'Maya’s renewal came through so nicely. Renewals can be reviewed.'),
    q('Celeste', 'You think I am asking you to hurt her. I’m not. She is finished either way, tonight or next month, by your hand or somebody else’s. I am asking you to learn how it is done, from the inside, while it is still somebody else.'),
    q('Celeste', 'The first one I ended was a man in Lisbon who had been kind to me for three years. I wore green that night too. I have never regretted it, and I have never forgotten a single thing he said to me.'),
    p('Below you a tour boat goes past with its lights on and music playing, and a girl on the top deck waves up at the terrace, at two elegant women in evening dress, and Celeste lifts her glass and waves back.'),
    t(
      counterReady11(s)
        ? 'There is another way. There usually is, if you have built anything worth spending.'
        : 'If I had a case she could not laugh at, or somebody in this room on my side, there might be a third way. There isn’t. Not tonight.',
    ),
  ];
}

function orderChoices(s: GameState): C11Choice[] {
  const answer = (id: 'comply' | 'refuse' | 'counter', label: string, hint: string) =>
    offer11('order-' + id, label, hint, 'ending', (x) => {
      const prior = mayaPrior(x);
      set11(x, 'answer', id === 'comply' ? 'complied' : id === 'refuse' ? 'refused' : 'countered');
      if (id === 'comply') setKey(x, 'act3.maya-clearance', 'renewed');
      if (id === 'refuse') setKey(x, 'act3.maya-clearance', prior === 'suspended' || prior === 'revoked' ? 'revoked' : 'suspended');
      if (id === 'counter') setKey(x, 'act3.celeste-surprised', getKey(x, 'act3.celeste-surprised') ? 'twice' : 'once');
      setKey(x, 'act3.placement', 'next-first-thursday');
      const said: Block[] =
        id === 'comply'
          ? [p('You take the envelope. It is lighter than it ought to be.'), q('Celeste', 'Thank you, darling. I knew you would.')]
          : id === 'refuse'
            ? [q('You', 'No.'), p('Celeste does not take the envelope back. She tucks it into your hand, and closes your fingers on it with hers, cool and dry.'), q('Celeste', 'Keep it. In case you change your mind before the cloakroom.')]
            : [p('You take the envelope, and smile, and thank her.'), t('I know exactly what I am going to do with it. For once, so does nobody else.')];
      note11(
        x,
        'order',
        `Celeste’s second order: burn Iris Moreau. Evelynn ${id === 'comply' ? 'complied' : id === 'refuse' ? 'refused' : 'found a third way'}. The named threat was Maya’s clearance, escalated.`,
        'Celeste, on the Vesper terrace',
      );
      return said;
    });
  return [
    answer('comply', 'Take the envelope, and do it', 'Maya stays safe. Iris ends, by your hand.'),
    answer('refuse', 'Refuse', 'Iris walks out tonight. Maya pays.'),
    ...(counterReady11(s)
      ? [answer('counter', 'Take the envelope, and turn it', get10(s, 'poison') ? 'Change what it says. Warn her. Let it point somewhere else.' : 'Warn Iris. Give her what nobody gave Anna Kessler: a head start.')]
      : []),
  ];
}

// ── Ending ──

function endingBlocks(s: GameState): Block[] {
  return [
    p('At half past ten the room begins to thin, the way good parties do, all at once and without anybody saying so. The quartet packs up. The minister’s wife kisses you on both cheeks and says you must come to lunch. The man from the Gulf fund does not say goodbye, but you feel him watch you all the way across the room.'),
    ...(julianInPlay10(s) ? [p('Julian is at the terrace doors with his coat over his arm. He does not come over. He only looks at you across the thinning room, once, for a long time, and then goes out onto the terrace, where you cannot see him.')] : []),
    p('Iris finds you by the terrace doors with her wrap over her arm.'),
    q('Iris', 'Walk me out? I hate the last ten minutes of these. Everybody says the thing they came to say.'),
  ];
}

/** The last minutes with Iris (deepening pass): how Evelynn spends them, before whatever she has decided to do. */
function walkChoices(): C11Choice[] {
  const walk = (id: string, label: string, hint: string, body: Block[]) =>
    offer11('walk-' + id, label, hint, 'ending', (x) => {
      set11(x, 'walk', id);
      return [...body, ...answerEnding(x)];
    });
  return [
    walk('name', 'Ask her real name', 'Before. The one they took.', [
      q('You', 'What was your name? Before.'),
      p('Iris stops walking.'),
      q('Iris', 'Nobody has asked me that in four years.'),
      p('She looks along the empty frames as if one of them might have it in it.'),
      q('Iris', 'Helen. It was Helen. It was a terrible name. I was very glad to give it back.'),
      t('Helen. Whatever happens in the next ten minutes, I will remember Helen.'),
    ]),
    walk('laugh', 'Make her laugh', 'She hasn’t, properly, all night.', [
      p('You tell her about the minister’s wife’s hand going to her throat when you walked in, and the man from the Gulf fund, who dances like a filing cabinet being moved very carefully, and she laughs properly, out loud, for the first time all night, and two men by the door turn round to look.'),
      q('Iris', 'God. I needed that. Thank you, new girl.'),
    ]),
    walk('quiet', 'Walk beside her and say nothing', 'Some things are better unsaid, tonight.', [
      p('You walk the length of the long room beside her without saying anything, past the empty frames and their numbered brass plates, and once she lets her arm touch yours, briefly, the way you would touch the arm of somebody at a funeral.'),
    ]),
  ];
}

function answerEnding(s: GameState): Block[] {
  const answer = get11(s, 'answer');
  const cloak: Block[] = [
    p('The cloakroom is a hatch in the panelling by the front door, a girl in black behind it, and behind her a long dark room of coats hung in rows like people waiting.'),
    ...(c(s, 'c7.robe') === 'coats'
      ? [
          p('You hand the girl the old ticket from the coat pocket, number 41, fourteen months old, to see what she will do. She looks at it, and at you, and goes into the back without a word, and comes out with a camel coat over her arm: the pair of the one in your wardrobe. Somebody has paid to keep it fourteen months.'),
          t('She left a coat here the last night she was here. It has been waiting for her, the way everything in this city has been waiting for her.'),
        ]
      : []),
  ];
  if (answer === 'complied')
    return [
      ...cloak,
      p('Iris is at the hatch signing for her wrap, laughing at something the girl has said. She puts her bag down on the ledge to take the pen. She has trusted this room for four years. She has no reason, tonight, to start doubting it.'),
      p('The bag is small, grey, the clasp open. It takes you two seconds. You have always known about linings.'),
    ];
  if (answer === 'refused')
    return [
      p('You see her to the door and into a taxi at the kerb, and watch its lights go away along the embankment.'),
      p('You keep the envelope in your hand until you are outside, on the bridge beyond the embankment. Then you tear it across twice and drop it in the river, and watch the pieces go under the black water without a sound.'),
      p('The wind off the river takes them away downstream. You stand at the rail for a long time with your hands empty, the way you stood at the Anchor’s window once, watching somebody else’s life go on inside.'),
      t('Maya pays for this. I chose that. I will have to look at it every morning on the wall.'),
    ];
  return [
    ...cloak,
    ...(get10(s, 'poison')
      ? [p('In the corner by the hatch you open the envelope: four lines in a good forgery of Iris’s hand, naming a date and a buyer. You change the date to the one you poisoned your notes with, and the buyer to Halvorsen’s own head of security, in your own careful forgery of hers, and put it in his coat instead of her bag.')]
      : []),
    p('At the hatch, while she signs for her wrap, you put the envelope into her hand and close her fingers on it.'),
    q('You', 'This was meant for your bag. Halvorsen was meant to find it tonight.'),
    p('She does not open it. She does not need to.'),
  ];
}

function endingChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'walk')) return walkChoices();
  const answer = get11(s, 'answer');
  const moment = (id: string, label: string, hint: string, iris: string, body: Block[]) =>
    offer11(id, label, hint, 'after', (x) => {
      set11(x, 'moment', id);
      set11(x, 'iris', iris);
      if (iris === 'free') setKey(x, 'act3.ally.iris', 'in');
      return body;
    });
  if (answer === 'complied')
    return [
      moment('plant-look', 'Meet her eyes when they take her', 'You did it. Watch it happen.', 'burned', [
        p('Halvorsen’s man is at her elbow before she reaches the door, a hand under her arm, polite, and she goes with him. At the door she turns and looks back along the room, straight at you. She knows. She knew before she turned.'),
        t('She looked at me as if I were the next page.'),
      ]),
      moment('plant-away', 'Look at the coats', 'Don’t watch.', 'burned', [
        p('You look at the coats. You hear it happen behind you: a man’s voice, polite, her name, the door. When you turn round the ledge is empty, and her unlit cigarette is lying on it.'),
        t('I did it well. That is the part I keep coming back to.'),
      ]),
    ];
  if (answer === 'refused')
    return [
      moment('refuse-tell', 'Go back in and tell her yourself', 'To her face.', 'spared', [
        p('You go back in. Celeste is by the door, saying goodnight to the minister’s wife.'),
        q('You', 'Do your own ending.'),
        q('Celeste', 'Pity. I did so hope.'),
        p('She says it gently, the way you would say it about rain spoiling a picnic. Behind her the cloakroom girl is already turning out the lights, one bank at a time, over the rows of coats.'),
      ]),
      moment('refuse-silent', 'Go home and let her find out', 'She will know by midnight.', 'spared', [
        p('You do not go back in. Let her find it out from the cloakroom girl, and from the river.'),
      ]),
    ];
  return [
    moment('free-go', 'Tell her to go, now', 'Through the kitchens. Don’t go home.', 'free', [
      q('You', 'There’s a door through the kitchens. Go now. Don’t go home.'),
      p('Iris looks at you for one long second. Then she is gone, not towards the front door but through the service door behind the hatch, in her grey silk, with her unlit cigarette and nothing else: walking out of four years in the time it takes to leave a coat behind.'),
    ]),
    moment('free-stay', 'Let her decide', 'It’s her ending. Give it back to her.', 'free', [
      q('You', 'It’s your ending. You decide.'),
      p('Iris weighs the envelope in her hand. Then she tucks it into her own bag, smiles her real smile, and goes back into the long room to Halvorsen’s elbow as if nothing had happened.'),
      q('Iris', 'Now I know. That’s worth four years. I owe you, new girl.'),
    ]),
  ];
}

// ── What the Clients Saw (and a chosen evening) ──

function afterBlocks(s: GameState): Block[] {
  return [
    p(
      get11(s, 'moment') === 'refuse-silent'
        ? 'You walk on from the bridge, along an embankment that is wet and empty and very long, and do not let yourself think about anything at all.'
        : 'You leave by the front door, the doorman saying good night to you by name, and the embankment is wet and empty and very long. You walk the whole of it to the bridge before you let yourself think about anything at all.',
    ),
    p(
      pryceKnown(s)
        ? 'At the bridge a car draws up beside you and keeps pace at walking speed, the rear window already down. Mr Pryce is driving. He has taken the chauffeur’s cap off; it sits on the seat beside him like a small dead animal.'
        : 'At the bridge a black car draws up beside you and keeps pace at walking speed, the rear window already down. The driver does not look at you.',
    ),
    q(pryceKnown(s) ? 'Pryce' : 'Driver', 'It’s raining, Ms Vale. Ms Laurent would want you home dry.'),
  ];
}

/** The black phone at midnight: Celeste's word on the night (not after a refusal: she has said it already). */
function midnight11(s: GameState): Block[] {
  const answer = get11(s, 'answer');
  if (answer === 'refused')
    return get11(s, 'moment') === 'refuse-silent'
      ? [
          p('At midnight the black phone lights once.'),
          q('C.', 'Pity.'),
          p('Iris is home by then, in whatever flat four years of Mr Halvorsen have bought her, with no idea how close it came.'),
        ]
      : [];
  return [q('C.', answer === 'complied' ? 'Lovely. You see how easy it is.' : getKey(s, 'act3.celeste-surprised') === 'twice' ? 'Twice now. I am starting to enjoy you.' : 'Well. I am starting to enjoy you.')];
}

/** The way home (deepening pass): Mr Pryce's car, or her own feet (c11.way). */
function wayChoices(): C11Choice[] {
  const way = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer11('way-' + id, label, hint, 'after', (x) => {
      set11(x, 'way', id);
      return [...body(x), ...midnight11(x)];
    });
  return [
    way('car', 'Get in', 'Let him drive. Ask him something on the way.', (x) =>
      pryceKnown(x)
        ? [
            p('You get in. The car smells of leather and, faintly, of her. For a while neither of you says anything, and the wipers go, and the river goes past.'),
            q('You', 'Do you drive them all home, Mr Pryce? After?'),
            p('His eyes find yours in the mirror, and go back to the road.'),
            q('Pryce', 'I drive. I don’t do the endings. I’ve never done an ending in my life.'),
            p('A pause, long enough for two sets of lights.'),
            q(
              'Pryce',
              c(x, 'c9.kessler') === 'follow'
                ? 'I drove Miss Kessler home, once. She talked the whole way. Nice girl. Liked boats.'
                : 'I’ve driven a lot of young women home from that door, over the years. They all sat where you’re sitting. Most of them talked.',
            ),
            t('He is telling me something. I don’t know yet whether it is a warning or a confession, and I don’t think he knows either.'),
          ]
        : [p('You get in. The driver says nothing at all the whole way, drops you at your door, and waits until your light goes on.')],
    ),
    way('walk', 'Walk', 'Your own feet. Your own rain.', () => [
      p('You keep walking. The car keeps pace for a while, at walking speed, like a dog that has not been told to go home, and then it gives up and slides away along the embankment, and you are alone in the rain, and it is wonderful.'),
      t('The one thing tonight she did not arrange: me, wet, on foot.'),
    ]),
  ];
}

/** The days after (the close): Maya's Monday, Iris, and the date on the wall. */
function laterBlocks(s: GameState): Block[] {
  const answer = get11(s, 'answer');
  const clearance = getKey(s, 'act3.maya-clearance');
  const iris = get11(s, 'moment');
  return [
    p(
      answer === 'complied'
        ? 'Maya’s clearance stays exactly where it is, or comes back. She will never know it was paid for twice.'
        : answer === 'refused'
          ? clearance === 'revoked'
            ? 'On Monday the review becomes a dismissal. Maya is told in a room without a window, by a man she has never seen, that her services are no longer required. She rings you from the pavement. She does not cry. You wish she would.'
            : 'On Monday Maya’s renewal is pulled for review, without explanation. She rings you from the stairwell and says “Again?” in a voice you will hear for a long time.'
          : 'Maya’s clearance stays where it is. Nothing happens on Monday at all, which is how you know Celeste is thinking.',
    ),
    // Maya's own voice only if she is back in Evelynn's life (Chapter 6).
    ...(c(s, 'c6.maya') !== 'restored'
      ? []
      : answer === 'refused'
      ? [
          q('Maya', 'They asked me whether I knew you. Again. Same room, same jug of water. I said yes, I know her. I’m not going to keep saying I don’t.'),
          q('You', 'Maya —'),
          q('Maya', 'Don’t. Whatever it is, you did it for a reason, and one day you’ll tell me, and I’ll probably be furious. Just don’t say sorry on the phone. I hate that.'),
          t('She is paying for a woman she will never meet, and she does not even know the woman’s name. I will tell her one day. Iris Moreau. I owe Maya that much.'),
        ]
      : answer === 'complied'
        ? [
            q('Maya · message', 'Weird week. Everyone at work is being so NICE to me. Drinks Friday?'),
            t('Everyone at work is being so nice to her. I know why, and I know what it cost, and I know whose ending paid for it.'),
          ]
        : [
            q('Maya · message', 'Quiet Monday. Too quiet. Are you all right? Don’t say fine.'),
            q('You · to Maya', 'Better than fine. I’ll tell you on Friday.'),
          ]),
    p(
      answer === 'complied'
        ? 'Nobody at the Vesper mentions Iris again. By Monday the brass plate on Halvorsen’s chief of staff’s door has somebody else’s name on it.'
        : answer === 'refused'
          ? 'On Tuesday a card comes, no stamp, hand-delivered: I know what you didn’t do. — I.'
          : iris === 'free-go'
            ? 'A week later a postcard comes from a town on a coast you have never seen, with no message on it at all, and a telephone number written very small under the stamp.'
            : 'On Tuesday Iris is in the society pages at Halvorsen’s elbow, smiling her real smile. The next day a card arrives with no stamp: When you want to see how the house works, I’ll show you. — I.',
    ),
    p('You pin a new card to the wall, above Celeste’s, and write on it only a date: the first Thursday of next month.'),
  ];
}

type Partner11 = 'julian' | 'theo' | 'sebastian';
const who11: Record<Partner11, string> = { julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian' };
/** A partner she already chose and did not betray; Theo also if she brought him tonight. */
export function eveningPartners11(s: GameState): Partner11[] {
  const out = eveningPartners10(s) as Partner11[];
  if (get11(s, 'entry') === 'defy' && !out.includes('theo')) out.push('theo');
  return out;
}
function eveningInvite11(partner: Partner11): Block[] {
  if (partner === 'julian')
    return [
      p('Julian is waiting outside your building when you get home, collar up, no car, the rain on his shoulders.'),
      q('Julian Mercer', 'I have been to a great many of these. I have never once watched one from the wall before. I didn’t like it.'),
      q('Julian Mercer', 'Come home with me. No business. Tell me what you want, and that’s what happens.'),
    ];
  if (partner === 'theo')
    return [
      p('Theo walks you along the river with his jacket round your shoulders, talking about anything but the evening, until at the bridge he stops talking.'),
      q('Theo Marr', 'Empty frames. I’m going to dream about empty frames. Come back to the studio. No cameras. Tell me what you want tonight.'),
    ];
  return [
    p('A message from a number saved under a single letter: “One night. Harbour, the late set. After whatever it is you’ve been doing that makes you look like that in the papers.”'),
    p('He plays the middle section to you and nobody else, and afterwards, in the corridor behind the stage, he takes your face in both hands and looks at it as if checking it is still yours.'),
    q('Sebastian', 'Tell me what you want tonight. Nobody gets to buy any of it.'),
  ];
}
const scopeReply11: Record<Partner11, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  theo: { 'no-sex': 'Then that’s what we do. I’m very good at wanting things I don’t get.', sex: 'Yes. And the moment you want to stop, we stop.' },
  sebastian: { 'no-sex': 'Good. I would like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stay11: Record<Partner11, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the glass with the whole city behind you and stops exactly where you tell him to, and holds you there, the dress half unzipped, his hand warm on your bare back, for a very long time.')],
    sex: [
      p('He undresses you slowly by the window, the dress first, and tells you what he thought when he saw you in it across that room, and asks once more with his mouth at your shoulder. You answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays on the forty-first floor. The scene fades.'),
    ],
  },
  theo: {
    'no-sex': [p('He kisses you slowly by the window with the river going past, and when you tell him where tonight stops he says “good” and means it, and you fall asleep across his unmade bed with your head on his shoulder and the dress on the floor.')],
    sex: [
      p('The careful manner goes all at once, and underneath it is someone hungrier and much less sure of himself, which you like better. He asks once more, low. You answer by pulling him down with you.'),
      p('What happens next is yours and his, and it stays above the studio. The scene fades.'),
    ],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says out loud what he likes about what he finds, and stays exactly on his side of the line you drew, and it is very, very good.')],
    sex: [
      p('He undoes the dress slowly and says out loud what he likes. The lamp stays on. When he asks once more whether you are sure, you answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
  },
};

function afterChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'way')) return wayChoices();
  const open = get11(s, 'evening-open');
  if (open) {
    const partner = open.replace('-room', '') as Partner11;
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer11(`evening-${partner}-${id}`, label, hint, 'after', (x) => {
          set11(x, 'evening-open', partner + '-room');
          set11(x, 'evening-scope', id);
          note11(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who11[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who11[partner], scopeReply11[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer11('evening-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c11.evening-open'];
          set11(x, 'evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get11(s, 'evening-scope') as 'no-sex' | 'sex';
    return [
      offer11('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c11.evening-open'];
        set11(x, 'evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He takes you home and walks you to your door and does not ask to come in, and you are more grateful for that than for anything else tonight.')];
      }),
      offer11('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c11.evening-open'];
        set11(x, 'evening-outcome', 'intimate-' + scope);
        return [...stay11[partner][scope], p('For a few hours nobody in the city is viewing you. You chose that too.')];
      }),
    ];
  }
  const name: Record<Partner11, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian' };
  return [
    ...eveningPartners11(s).map((partner) =>
      offer11('evening-' + partner, `Go with ${name[partner]}`, 'A night you choose, after an evening of being chosen.', 'after', (x) => {
        set11(x, 'evening', partner);
        set11(x, 'evening-open', partner);
        return eveningInvite11(partner);
      }),
    ),
    offer11('after-home', 'Go home alone', 'Chapter 11 ends here.', 'complete'),
  ];
}

// ── Blocks and choices ──

export function chapter11Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter11') return [];
  if (s.phase === 'arrival') return arrivalBlocks(s);
  if (s.phase === 'viewing') return viewingBlocks(s);
  if (s.phase === 'upstairs') return upstairsBlocks(s);
  if (s.phase === 'order') return orderBlocks(s);
  if (s.phase === 'ending') return endingBlocks(s);
  if (s.phase === 'after') return afterBlocks(s);
  if (s.phase === 'complete')
    return [
      p(get11(s, 'evening-outcome')?.startsWith('intimate') ? 'You get home at dawn. The orchid on the kitchen table has opened another flower in the night.' : 'You get home at one and do not turn the lamp on. The wall is pale in the light from the street, every card on it the colour of bone.'),
      p('You sit on the edge of the bed in the dress for a long time. Tolerates public exposure; seeks it. Controllability: low. You say it over to yourself in the dark, like somebody learning a part.'),
      ...laterBlocks(s),
      t('Available from the first Thursday of next month. She has put a date on me. Then I have a date too.'),
    ];
  return [];
}

export function chapter11Choices(s: GameState): C11Choice[] {
  if (!chapter11Playable(s)) return [];
  if (s.scene === 'chapter10' && s.phase === 'complete' && ownPower(s))
    return [offer11('begin', 'The first Thursday', 'The Vesper Gallery, eight o’clock. Wear the green.', 'arrival')];
  if (s.scene !== 'chapter11') return [];
  if (s.phase === 'arrival') return arrivalChoices(s);
  if (s.phase === 'viewing') return viewingChoices(s);
  if (s.phase === 'upstairs') return upstairsChoices(s);
  if (s.phase === 'order') return orderChoices(s);
  if (s.phase === 'ending') return endingChoices(s);
  if (s.phase === 'after') return afterChoices(s);
  return [];
}

export function applyChapter11Choice(state: GameState, id: string): GameState {
  const choice = chapter11Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter11';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter11.${s.phase}` as NodeId, blocks: chapter11Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER11_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
