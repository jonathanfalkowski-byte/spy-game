/** Chapter 11 (Act III, own-power played as the Celebrity route) · The Asset:
 * arrival → viewing → upstairs → order → ending → after → complete.
 * Design: docs/story/CHAPTER_11_THE_ASSET_DESIGN.md (owner-approved 2026-09-25, all six decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_11_THE_ASSET_SCRIPT.md. Gated behind chapter11Playable(), reached from an
 * own-power Chapter 10 ending. The first Thursday at the Vesper Gallery, Meridian's showroom: the evening is a viewing,
 * Evelynn is on the catalogue ("available for placement from the first Thursday of next month"), and the second order
 * is to burn Iris Moreau, another Meridian legend. Coercion follows docs/story/CONTENT_DIRECTION.md §3: comply /
 * refuse / counterplay, each with a real cost; refusal lands on the named, non-sexual threat (Maya's clearance,
 * escalated). The dance is chosen and hers to lead; the only intimacy is the optional chosen evening (heat 3,
 * consent-gated, fades). */
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
    p('Hair up and pinned hard. The face finished, and then finished again. In the wardrobe mirror a woman you are still learning looks back at you, and for once you let her look.'),
    ...(get10(s, 'invitation') === 'pending'
      ? pryceKnown(s)
        ? [
            p('At half past seven the car she booked is at the kerb with its engine running. Mr Pryce is holding the rear door, in a chauffeur’s cap that does not suit him, looking at the pavement.'),
            q('Pryce', 'Ms Laurent’s compliments.'),
          ]
        : [p('At half past seven the car she booked is at the kerb with its engine running. The driver holds the rear door, says Ms Laurent’s compliments, and nothing else the whole way.')]
      : [p('You take a taxi, on your own money, because it is the one part of the evening she has not arranged.')]),
    p('The Vesper Gallery is a black glass front on the embankment with no name on the door. You have walked past it a dozen times. There has always been one painting in the window, changed every month, never for sale. Tonight the window is empty.'),
    p('Inside, the long room is lit like a museum after hours: warm light on dark walls, and on the walls, frames. Twenty of them, gilt and black, each one lit from above as carefully as if it held something. None of them does.'),
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
      t('Being looked at is the one thing I know how to do better than any of them. Let them look.'),
    ]),
    enter('quiet', 'Come in on the edge, and watch', 'Fewer eyes. Better ears.', [
      p('You come in behind a couple arguing gently about a boat, take a glass from a tray and stand at the edge of the room by an empty frame, as if you were considering it. Nobody looks at you for almost a minute. It is the longest minute of freedom you have had in weeks.'),
      t('Watch first. Adrian always read the room before he read the file.'),
    ]),
    ...(theoCompanion(s)
      ? [
          enter('defy', 'Bring Theo', '“Bring nobody.” Bring somebody.', [
            p('You walk in on Theo Marr’s arm. He is in a dinner jacket that is not quite his size, and delighted with himself.'),
            q('Theo Marr', 'She said bring nobody. I’m nobody. Ask anyone at the network.'),
            p('Across the room Celeste sees the two of you and does not stop smiling. She lifts her glass to Theo, very slightly, the way you would acknowledge a move in a game you intend to win.'),
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
    p('The talk is all of one kind, and it takes you a quarter of an hour to hear it. Placements. Availability. A public profile. Our last one. The minister’s wife hears the autumn collection is very strong. Halvorsen has been very happy with his, and touches the arm of the woman in grey as he says it, and she does not move.'),
    t('It is not a party. It is a viewing. The frames are empty because we are the paintings, and she has walked me the length of the room so that everybody who might buy could see how I hang.'),
  ];
}

const irisMeets = (s: GameState): Block[] => [
  p('In the powder room a woman in grey silk is at the mirror, not fixing anything. It is the woman at Halvorsen’s elbow: forty, perhaps, beautifully finished, her hair in a low knot, and she is watching the door in the mirror the way you would watch it.'),
  q('Woman in grey', get10(s, 'green') === 'black' ? 'You’re new. They wanted you in the green, and you came in black. Good for you.' : 'You’re new. They put you in the green.'),
  p('She takes a cigarette from a silver case and does not light it.'),
  q('Woman in grey', 'Iris. Iris Moreau. Four years with Mr Halvorsen. Chief of staff, it says on the door. It says a great many things on a great many doors.'),
  t('She knows what I am. She knows because she is one.'),
];

function viewingChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'room')) {
    const work = (id: string, label: string, hint: string, body: Block[]) =>
      offer11('room-' + id, label, hint, 'viewing', (x) => {
        set11(x, 'room', id);
        return [...body, ...irisMeets(x)];
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
    ]),
    ...(c(s, 'c9.kessler') === 'follow'
      ? [
          ask('anna', 'Ask her about Anna Kessler', 'The last one. Six years ago.', [
            q('You', 'Did you know Anna Kessler?'),
            p('Something in the mirror goes very still.'),
            q('Iris', 'Anna used to stand exactly where you’re standing. She had the green too.'),
            p('She puts the unlit cigarette back in its case, carefully, as if it might break.'),
          ]),
        ]
      : []),
    ask('out', 'Ask her if she ever thinks about leaving', 'She has been here four years.', [
      q('You', 'Do you ever think about leaving?'),
      q('Iris', 'Every morning. Nobody leaves, darling. We’re ended. It’s a different verb.'),
      p('Then, lower, as the door opens behind you both:'),
      q('Iris', 'If you ever want to see how the house works, find me. I’ll show you the stairs.'),
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
    p('There are three ways up that you can see: the service stair behind the cloakroom, the main staircase with a man at the foot of it, and anybody here with a key.'),
  ];
}

const corridor: Block[] = [
  p('The private floor is a corridor of closed doors and thick carpet that eats your footsteps. Halfway along, one door stands an inch open on a line of light and voices: men’s voices, and one woman’s, unhurried, that you would know anywhere.'),
  q('Celeste (through the door)', 'The product is performing. The defect, as you call it, is an asset in a public placement. Nobody controls a star. That is exactly what makes her useful.'),
  t('The defect. ORACLE’s verdict, that I could not be held. She is selling it as a feature.'),
  p('The second door is the reading room: one lamp, one lectern, one book bound in dark green leather. The Autumn Collection.'),
  p('Every page is a person. A photograph, initials, a line of type. A woman in Lisbon. A man in a harbour town you have never heard of. And page seven: the Aster photograph, the one they printed, and under it, in the same plain type as the client list:'),
  q('The catalogue', 'E. V. · Reissued · Public profile · Available for placement from the first Thursday of next month.'),
  p('Two pages on, a woman in grey silk with her hair in a low knot.'),
  q('The catalogue', 'I. M. · Four years · Ending.'),
  t('Available from the first Thursday of next month. She has put a date on me. And Iris is ending.'),
];

function upstairsChoices(s: GameState): C11Choice[] {
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
      ]),
      climb('escort', 'Get a client to take you up', '“Show me the rest of the collection.”', [
        p('You find the minister’s wife by the terrace doors and tell her you would love to see the rest of the collection, and she is so delighted to be the one showing the new girl round that she takes you up the main staircase herself, past the man at the foot of it, talking all the way.'),
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
    offer11('cat-' + id, label, hint, 'order', (x) => {
      set11(x, 'catalogue', id);
      after?.(x);
      return body;
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
      note11(
        x,
        'order',
        `Celeste’s second order: burn Iris Moreau. Evelynn ${id === 'comply' ? 'complied' : id === 'refuse' ? 'refused' : 'found a third way'}. The named threat was Maya’s clearance, escalated.`,
        'Celeste, on the Vesper terrace',
      );
      return [];
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
    return [...cloak, p('Iris’s bag is on the ledge while she signs for her wrap: small, grey, the clasp open. It takes you two seconds. You have always known about linings.')];
  if (answer === 'refused')
    return [p('You keep the envelope in your hand until you are outside, on the bridge beyond the embankment. Then you tear it across twice and drop it in the river, and watch the pieces go under the black water without a sound.')];
  return [
    ...cloak,
    ...(get10(s, 'poison')
      ? [p('In the corner by the hatch you open the envelope: four lines in a good forgery of Iris’s hand, naming a date and a buyer. You change the date to the one you poisoned your notes with, and the buyer to Halvorsen’s own head of security, in your own careful forgery of hers, and put it in his coat instead of her bag.')]
      : []),
    p('Then you find Iris at the hatch signing for her wrap, put the envelope into her hand, and close her fingers on it.'),
    q('You', 'This was meant for your bag. Halvorsen was meant to find it tonight.'),
    p('She does not open it. She does not need to.'),
  ];
}

function endingChoices(s: GameState): C11Choice[] {
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
        p('She says it gently, the way you would say it about rain spoiling a picnic. Behind her Iris is laughing at something Halvorsen has said, and has no idea.'),
      ]),
      moment('refuse-silent', 'Go home and let her find out', 'She will know by midnight.', 'spared', [
        p('You go home without going back in. At midnight the black phone lights once.'),
        q('C.', 'Pity.'),
        p('Iris is home by then, in whatever flat four years of Mr Halvorsen has bought her, with no idea how close it came.'),
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
    p(
      answer === 'complied'
        ? 'Nobody at the Vesper mentions Iris again. By Monday the brass plate on Halvorsen’s chief of staff’s door has somebody else’s name on it.'
        : answer === 'refused'
          ? 'On Tuesday a card comes, no stamp, hand-delivered: I know what you didn’t do. — I.'
          : iris === 'free-go'
            ? 'A week later a postcard comes from a town on a coast you have never seen, with no message on it at all, and a telephone number written very small under the stamp.'
            : 'On Tuesday Iris is in the society pages at Halvorsen’s elbow, smiling her real smile. The next day a card arrives with no stamp: When you want to see how the house works, I’ll show you. — I.',
    ),
    ...(answer === 'refused'
      ? []
      : [q('C.', answer === 'complied' ? 'Lovely. You see how easy it is.' : answer === 'refused' ? 'Pity.' : getKey(s, 'act3.celeste-surprised') === 'twice' ? 'Twice now. I am starting to enjoy you.' : 'Well. I am starting to enjoy you.')]),
    p('At home you pin a new card to the wall, above Celeste’s, and write on it only a date: the first Thursday of next month.'),
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
      p('Julian is waiting on the embankment when you come out, collar up, no car.'),
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
      p(get11(s, 'evening-outcome')?.startsWith('intimate') ? 'You get home at dawn. The orchid on the kitchen table has opened another flower in the night.' : 'You get home at one and do not turn the lamp on. The new card on the wall is pale in the light from the street.'),
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
