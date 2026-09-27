/** Chapter 11 (Predator route, lane id `predator`) · The Catalogue:
 * dress → longroom → book → powder → terrace → cloak → late → ledger (its own end; the Celebrity `complete` is 'A Date').
 * Design: docs/story/PREDATOR_CHAPTER_11_THE_CATALOGUE_DESIGN.md (owner-approved 2026-09-27, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_11_SCRIPT.md. The shared Vesper set from the client side:
 * the first Thursday of December, on Marcus's arm. The catalogue on its lectern gives her own page, TRANSFERRED: AXIOM
 * → HELIX · AT CLIENT REQUEST (M. CHEN): her Helix job was brokered. Iris Moreau, wary of a client's woman. The second
 * order is Celeste's favour to Halvorsen, with the line Chapter 13 remembers ("I thought the new one might like to learn
 * how it is done"): comply / refuse / counter (warn Iris, or turn it on Halvorsen); a counter is the first time
 * Celeste is surprised (pred.celeste-count). The threat is non-sexual and lands on Helix and her standing. What she
 * does with Marcus now she knows; a chosen dance and an optional chosen evening (heat 3, consent-gated, fades).
 * Temporary entry: from a Predator `chapter9.complete` until the Predator Chapter 10 exists; Chapter 12 now enters
 * from `chapter11.ledger`. Local helpers mirror chapter11.ts (c11.* keys, chapter11.* ids) to avoid a circular import.
 * Deepening pass (2026-09-27): a second beat in the long room, which every path passes through (c11.p-guest = gulf |
 * julian | celeste | none: the quiet man from the Gulf fund, "You are not on my list"; Julian by the empty frames;
 * a turn of the room on Celeste's arm, "He always asks for exactly what he wants"; or an empty frame), and the back
 * pages of the catalogue after her own (pred.book = first | clients | closed: the first Evelyn's page, FIRST ISSUE ·
 * SINGAPORE · WITHDRAWN (JAKARTA), which Geneva remembers; or Marcus's client line, TRANSFERS: 3, two of them
 * CONCLUDED). Getting ready, the long room, the terrace and the ledger at greater length. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

type C11Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get11 = (s: GameState, k: string) => s.choices['c11.' + k];
const set11 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c11.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C11Choice['apply']): C11Choice => ({ id: 'chapter11.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get11(s, 'rec.' + k) !== undefined) return;
  set11(s, 'rec.' + k, String(s.history.length));
  set11(s, 'event.' + k, String(s.revision));
  set11(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c11.' + k);
  s.knowledge.push('c11.' + k);
}

export const PREDATOR_PHASES11 = ['dress', 'longroom', 'book', 'powder', 'terrace', 'cloak', 'late', 'ledger'] as const;
export const isPredator11 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase11 = (s: GameState) => isPredator11(s) && (PREDATOR_PHASES11 as readonly string[]).includes(s.phase);

type Answer = 'complied' | 'refused' | 'warned' | 'turned';
const answer = (s: GameState) => get11(s, 'p-answer') as Answer | undefined;
const clause = (s: GameState, id: string) => !!key(s, 'pred.clause.' + id);
const julian = (s: GameState) => key(s, 'pred.julian') as 'ally' | 'rival' | 'casualty' | undefined;
const cash = (s: GameState) => Number(key(s, 'own.cash') ?? 0);
/** What she has built that a counter can stand on (design §4). */
export function counterSpend11(s: GameState): string | undefined {
  if (key(s, 'pred.hollis') === 'owned') return 'hollis';
  if (key(s, 'pred.lever8.counsel') === 'spare') return 'counsel';
  if (['use', 'hold'].includes(key(s, 'pred.lever8.archive') ?? '')) return 'archive';
  if (clause(s, 'exit')) return 'exit';
  if (key(s, 'case.strength') === 'strong') return 'case';
  return undefined;
}
/** Turning the favour on Halvorsen needs the fund's own paper in her hands (Hollis's letter or the archive schedule). */
export const canTurn11 = (s: GameState) => key(s, 'pred.lsf') === 'wire';

export function placePredator11(s: GameState): string | undefined {
  if (s.phase === 'longroom' && get11(s, 'p-room')) return '20:40 · Under the empty frames';
  if (s.phase === 'book' && get11(s, 'p-page')) return '21:10 · The client room, the back pages';
  if (s.phase === 'late' && get11(s, 'p-car')) {
    const evening = get11(s, 'p-evening-open');
    if (evening) return evening.startsWith('marcus') ? 'Late · Marcus’s apartment, above the river' : 'Late · Julian’s apartment, the forty-first floor';
    return '23:40 · Home, the kerb';
  }
  if (s.phase === 'cloak' && answer(s) === 'refused') return '22:40 · The bridge over the canal';
  if (s.phase === 'cloak' && answer(s) === 'warned') return '22:40 · The Vesper kitchens';
}

// ── The entry, and getting ready ──

export function beginPredator11(): C11Choice {
  return offer('begin-predator', 'The first Thursday', 'The Vesper, on Marcus’s arm. Black tie.', 'dress', () => [
    p('The first Thursday of December. A card on your desk on the Monday, in Marcus’s large hand, clipped to a stiff white invitation with no name on it but a gallery’s: The Vesper. Eight o’clock. Black tie. Come as my guest. You’ll be the best thing in the room. That’s rather the point.'),
    t('The Vesper. The gallery with no name on its door, where Celeste Laurent receives her clients. And I am going as one of them.'),
  ]);
}

function dressBlocks(s: GameState): Block[] {
  return [
    p('At noon a box arrives from a shop that does not deliver: midnight-blue silk, cut close, with a card in his hand. For the best thing in the room. — M. It fits exactly, which means somebody measured you without asking, from a photograph, or from memory.'),
    p('You do your face twice, the way you did for the Glass House, the second time more slowly, and stand in front of the wardrobe mirror with the ledger behind you on the door, every card reflected backwards, and practise the face a client wears: interested, unhurried, owed.'),
    p('At half past seven Marcus comes to your door himself, not his driver, in black tie, with his hands in his pockets, and looks at you for one second longer than a man should look at somebody who works for him, and does not pretend he didn’t.'),
    ...(key(s, 'c8.p-night') === 'pryce' ? [p('Mr Pryce holds the car door, and does not look at either of you, and you notice that he has polished the handle.')] : []),
    t('He is taking me to Celeste’s house as his. I am going as mine. We will see which of us is right by midnight.'),
  ];
}

function dressChoices(): C11Choice[] {
  const d = (id: string, label: string, hint: string, body: Block[]) =>
    offer('dress-' + id, label, hint, 'longroom', (x) => {
      set11(x, 'p-dress', id);
      return body;
    });
  return [
    d('gift', 'Wear the midnight blue', 'His gift. Let him see it on you.', [
      p('You wear his dress. In the car he does not say anything about it at all, which from Marcus is a compliment so large it fills the back seat.'),
    ]),
    d('own', 'Wear your own black', 'Put his box back in the wardrobe.', [
      p('You wear your own black, and leave his box on the bed with the lid on. He sees it the moment you open the door, and smiles slowly, the smile that arrives after his eyes.'),
      q('Marcus Chen', 'Of course. Of course you did.'),
    ]),
  ];
}

// ── The long room ──

function longroomBlocks(s: GameState): Block[] {
  const j = julian(s);
  return [
    p('The Vesper has no name on its door and no painting in its window tonight. Inside, the long room is hung with empty frames, each one lit as if it held something, and between them the guests stand with their glasses, and after a minute you understand that the guests are the exhibition.'),
    p('The frames are gilt and very old and very good, and each has a small brass plate beneath it, engraved, as if for a title. You read one on the way past. It says nothing but a date, and a number.'),
    p('Celeste Laurent receives at the far end in green, tall and entirely made of edges, and holds out both hands to Marcus, and then to you, and does not let go of yours quite as soon as she lets go of his.'),
    q('Celeste', 'Marcus, darling. And your acquisition. How well she wears it.'),
    ...(clause(s, 'private') ? [p('A young man with a camera asks whether he might. You tell him your face is your own, in writing, and he goes away as if he had been told something about the weather.')] : []),
    p('A shipping man called Halvorsen, silver-haired, with the tan of a man who owns the sea he tans on, takes your hand, and keeps it, and asks you with a buyer’s frankness the question every client in this room asks every other: '),
    q('Halvorsen', 'And which one are you here for?'),
    ...(j === 'ally'
      ? [p('Across the room, Julian, here for Helix too, in black tie that looks borrowed on him and isn’t, lifts his glass to you an inch and does not come over. He is watching who watches you.')]
      : j === 'rival'
        ? [p('Across the room, Julian, here for Helix too, watches you on Marcus’s arm with an expression you have seen on men at auctions, when the lot they wanted has gone to somebody they despise.')]
        : j === 'casualty'
          ? [p('Julian is here too, for Helix. He keeps to the far side of the room all night, and never once lets himself be where you are.')]
          : []),
    t(get5(s, 'published') ? 'They know my face from the papers. They think that makes me one of the ones on show. Let them.' : 'Nobody here knows my face. They take me for what Marcus says I am. Let them.'),
  ];
}

function longroomChoices(): C11Choice[] {
  const r = (id: string, label: string, hint: string, body: Block[]) =>
    offer('room-' + id, label, hint, 'longroom', (x) => {
      set11(x, 'p-room', id);
      return body;
    });
  return [
    r('dazzle', 'Give them the show', 'A client among clients, and better at it.', [
      p('You give them the show: the laugh, the listening, the hand on an arm at the right moment. Within half an hour the minister’s wife has told you where her husband banks, and Halvorsen, delighted to be liked, tells you the thing you came for.'),
      q('Halvorsen', 'You must see the book, my dear. Next door. Everybody looks at the book. It is the only honest thing in the building.'),
    ]),
    r('listen', 'Stay quiet, and listen', 'Buyers talk freely to buyers.', [
      p('You stay at Marcus’s elbow and say very little, and the clients talk across you the way they talk across furniture: placements, availabilities, “our last one”, a transfer that went through in the spring, “Helix bought well”. Somebody laughs at that, and looks at you, and stops.'),
    ]),
    r('dance', 'Dance with Marcus', 'Your lead. A room built for looking.', [
      p('There is a quartet in the corner nobody is listening to. You take Marcus’s hand before he can offer his, and lead him out into the middle of the long room, among the empty frames, and he lets you lead, which is the most surprising thing he has done since you met him.'),
      p('His hand on your back is exactly where you put it. The room watches. His mouth close to your ear:'),
      q('Marcus Chen', 'Everybody in this room is looking at you, and you are looking at the door. Which one do you want?'),
      q('You', 'The one with the book behind it.'),
      p('He laughs, and turns you once, and brings you to rest by that door, as if it had been his idea.'),
    ]),
  ];
}

/** A second beat in the long room (deepening pass): every path passes through it. */
function guestChoices(s: GameState): C11Choice[] {
  const g = (id: string, label: string, hint: string, body: Block[]) =>
    offer('guest-' + id, label, hint, 'book', (x) => {
      set11(x, 'p-guest', id);
      return body;
    });
  const j = julian(s);
  return [
    g('gulf', 'Let the quiet man from the Gulf fund find you', 'He has been measuring you all evening.', [
      p('He finds you by the fireplace, a slight man in a perfect suit who has spoken to nobody all evening and looked at everybody, and bows very slightly.'),
      q('The man from the Gulf fund', 'You are not on my list, Ms Vale. Everyone else in this room is on somebody’s list. That is the most interesting thing I have seen all year.'),
      p('He gives you a card with nothing on it but a telephone number, engraved.'),
      q('The man from the Gulf fund', 'When you are tired of being bought, ring me. I do not buy. I rent, and I return things in the condition I found them.'),
      t('Being bought. He said it as if it were already true, and as if everybody here knew it but me.'),
    ]),
    ...(j === 'ally' || j === 'rival'
      ? [
          g('julian', 'Find Julian by the empty frames', 'He has been waiting for Marcus to look away.', [
            p('You find Julian under the emptiest frame in the room, the largest, as if he had chosen it on purpose, and stand beside him facing the room, the way people do who do not want to be seen talking.'),
            q(
              'Julian Mercer',
              j === 'ally'
                ? 'Whatever is in the room next door, don’t let him see your face when you read it. That’s all. That’s the whole of my advice.'
                : 'He’s showing you off, you know. Like a watch. I just wanted you to know that somebody in this room noticed, and minded.',
            ),
            p('He finishes his drink and goes, before Marcus turns round.'),
          ]),
        ]
      : []),
    g('celeste', 'Take a turn of the room on Celeste’s arm', 'She has been waiting to offer it.', [
      p('Celeste takes your arm as if you had always walked like this, the two of you, and turns you slowly down the long room under the empty frames, nodding to her clients as you pass, the way a woman walks a new dog she is proud of.'),
      q('Celeste', 'Do you like it? The collection?'),
      q('You', 'It’s very well hung.'),
      q('Celeste', 'Everything here is, darling. Including the guests. Marcus has excellent taste, you know. He always asks for exactly what he wants. It is his great charm, and it will be the end of him.'),
      t('He always asks for exactly what he wants. She is telling me something, and enjoying the fact that I do not know what yet.'),
    ]),
    g('none', 'Stand under an empty frame', 'Let the room look.', [
      p('You stand under an empty frame with a glass, and let the room look at you as if you were the painting. Nobody asks what you cost. You find that you are waiting for somebody to.'),
    ]),
  ];
}

// ── The book ──

function bookBlocks(s: GameState): Block[] {
  const want = key(s, 'pred.want');
  return [
    p('The client room is small and panelled and warm, with a fire, and a lectern under a single lamp, and on the lectern, turned so that a client can read it standing with a glass in the other hand, a book bound in green leather. On its spine, in gold: The Winter Collection.'),
    p('Every page is a person. A photograph, initials, a line of history in plain type, and a status. You turn them slowly, the way the man beside you is turning them, with the same face.'),
    p('I. M. · Chief of staff, Halvorsen & Co. · Four years. · ENDING.'),
    p('And on page forty, the Aster photograph, the one that was yours before it was anybody’s:'),
    q('The page', 'E. V. · Reissued. · TRANSFERRED: AXIOM → HELIX · AT CLIENT REQUEST (M. CHEN) · Special projects.'),
    t(
      want === 'desk'
        ? 'He bought the woman who wants his chair. He asked for her by name. He is going to find out what he paid for.'
        : want === 'title'
          ? 'My name on my door. My name, on somebody else’s page, first. Transferred, like a lease.'
          : 'I was a line item. I thought I walked into his office. I was delivered to it.',
    ),
  ];
}

function bookChoices(): C11Choice[] {
  const b = (id: string, label: string, hint: string, value: string, body: Block[]) =>
    offer('page-' + id, label, hint, 'book', (x) => {
      set11(x, 'p-page', id);
      setKey(x, 'pred.transfer', value);
      note(x, 'p11-transfer', 'Meridian’s client catalogue, The Winter Collection, records Evelynn as reissued and TRANSFERRED from Axiom to Helix at the request of the client, M. Chen. Her Helix job was brokered.', 'The Vesper client room, the catalogue, page forty');
      return body;
    });
  return [
    b('tear', 'Tear your page out', 'Take yourself back. Celeste will know, and be delighted.', 'torn', [
      p('You wait until the man beside you has turned away to find his glass, and put your hand flat on page forty, and tear it out along the spine in one clean movement, the way you would take a plaster off, and fold it into your bag.'),
      t('I am not in her book any more. I am in my handbag.'),
    ]),
    b('photo', 'Photograph it, and Iris’s page', 'Evidence. Two pages of it.', 'photographed', [
      p('You photograph your page, and Iris’s, and the spine, with the phone held low against the lectern like a woman checking her messages, and close the book on the fire’s warmth.'),
    ]),
    b('read', 'Read it twice, and remember every line', 'Take nothing. Leave nothing.', 'read', [
      p('You read it twice, every line, until you could type it out at three in the morning, and turn the page back to where the last client left it, and leave the room with your glass exactly as full as when you came in.'),
    ]),
  ];
}

/** The back pages (deepening pass), after her own page and before Iris. */
function backChoices(): C11Choice[] {
  const b = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('back-' + id, label, hint, 'powder', (x) => {
      set11(x, 'p-back', id);
      setKey(x, 'pred.book', value);
      after?.(x);
      return body;
    });
  return [
    b('first', 'Turn back through the older pages', 'The book is older than tonight.', 'first', [
      p('Near the front the pages are soft with handling, and the photographs older, and the plain type a little different, as if the machine that printed them had since been replaced by a better one.'),
      p('And one of them stops your hand before your eyes have caught up with it: a woman with dark hair cut the way yours is cut, laughing at something off the edge of the photograph, and your initials.'),
      q('The page', 'E. V. · First issue. · Singapore. · WITHDRAWN (JAKARTA).'),
      t('There was one before me. With my name. Withdrawn, like a product with a fault. Nobody in this room would look twice at that word. I cannot stop looking at it.'),
    ], (x) => note(x, 'p11-first', 'Meridian’s catalogue carries an earlier page for the same initials: E. V. · first issue · Singapore · withdrawn (Jakarta). Evelynn is the second issue of the legend she wears.', 'The Vesper client room, the catalogue, the front pages')),
    b('clients', 'Read the client ledger at the back', 'Whose book is it, really?', 'clients', [
      p('At the back of the book, after the last person, a ledger of clients in the same plain type, a line each. You find his without looking for it.'),
      q('The ledger', 'M. CHEN · HELIX · CLIENT, ELEVEN YEARS · TRANSFERS: 3.'),
      p('Above yours, two other sets of initials, one from six years ago and one from three, and against each of them the same word: CONCLUDED.'),
      t('I am the third thing he has bought from this book. I would like very much to know what happened to the first two, and what the word means, and whether he knows.'),
    ]),
    b('close', 'Close the book', 'You have read enough.', 'closed', [p('You close the book, gently, as if somebody were asleep in it.')]),
  ];
}

// ── Iris ──

function powderBlocks(): Block[] {
  return [
    p('In the powder room, at the long mirror, a woman in grey silk is fixing a lipstick that does not need fixing. Forty, perhaps, beautifully finished, with the stillness of somebody who has spent years being looked at by people who are paying for it. She watches you come in, in the mirror, the way you watched the room.'),
    q('Iris Moreau', 'You’re Marcus Chen’s. The new one. Which of us are you here for?'),
    t('I. M. Four years. Ending. She does not know yet. Or she knows, and is fixing her lipstick anyway.'),
  ];
}

function powderChoices(): C11Choice[] {
  const i = (id: string, label: string, hint: string, body: Block[]) =>
    offer('iris-' + id, label, hint, 'terrace', (x) => {
      set11(x, 'p-iris', id);
      return body;
    });
  return [
    i('truth', '“None of you. I’m on page forty.”', 'The truth. Same book.', [
      q('You', 'None of you. I’m on page forty. Same book.'),
      p('She looks at you in the mirror for a long time, and then at you, without the mirror, which is different.'),
      q('Iris Moreau', 'Then you’ll know what ending means. It means they’ve found somebody cheaper. Come outside. I don’t smoke, but I like to hold one.'),
      p('On the terrace she holds an unlit cigarette and you stand beside her in the cold, not talking, like two women waiting for the same car.'),
    ]),
    i('client', 'Play the buyer', '“I’m here for the view.”', [
      q('You', 'I’m here for the view.'),
      q('Iris Moreau', 'Aren’t we all.'),
      p('She caps the lipstick, and goes, and at the door looks back at you once, as if memorising a face for later.'),
    ]),
    i('nothing', 'Say nothing', 'Fix your own face. Let her go.', [p('You say nothing, and fix your own face in the mirror beside hers, and after a moment she goes, and you find that your hands are not perfectly steady.')]),
  ];
}

// ── The terrace: the second order ──

function terraceBlocks(): Block[] {
  return [
    p('At a quarter past ten Celeste finds you on the terrace, alone, with the river below and the city lit up behind it like a stage set, and gives you, the way another woman might give you her card, a small gallery envelope.'),
    p('Inside, a folded memo in a hand that anyone would take for Iris’s: a chief of staff offering her employer’s positions to a rival, with dates. And a note, on the Vesper’s paper, in green:'),
    q('C.', 'A small favour for a client, darling. Put this in Iris’s bag before she leaves. She has done beautifully for four years, and she is ending, and Mr Halvorsen would like it to be tonight.'),
    q('Celeste', 'I thought the new one might like to learn how it is done.'),
    p('Below you the river goes on being black and going somewhere. Behind you, through the glass, the clients are laughing at something, and Marcus’s laugh is among them, arriving late.'),
    p('She kisses the air beside your cheek, and goes back inside, and leaves you on the terrace with the envelope and the river.'),
    t('The new one. Transferred at client request. And now a favour for a client. She is showing me the whole machine, one gear at a time, to see which one I pick up.'),
  ];
}

function terraceChoices(s: GameState): C11Choice[] {
  const spend = counterSpend11(s);
  const a = (id: string, label: string, hint: string, value: Answer, after: (x: GameState) => void) =>
    offer('order-' + id, label, hint, 'cloak', (x) => {
      set11(x, 'p-answer', value);
      setKey(x, 'pred.answer11', value);
      after(x);
      return [];
    });
  return [
    a('comply', 'Put it in her bag', 'The favour, done well. Halvorsen will owe Helix.', 'complied', (x) => {
      setKey(x, 'pred.iris', 'retired');
      setKey(x, 'pred.halvorsen', 'owes-helix');
    }),
    a('refuse', 'Put it in your own bag, and keep it there', 'Not this. Helix will pay for it, and somebody else will do it.', 'refused', (x) => {
      setKey(x, 'pred.iris', 'ended-by-another');
      setKey(x, 'pred.halvorsen', 'hostile');
    }),
    ...(spend
      ? [
          a('warn', 'Give Iris the memo', 'Tell her, and let her walk out of it tonight.', 'warned', (x) => {
            setKey(x, 'pred.iris', 'free');
            setKey(x, 'pred.ally.iris', 'in');
            setKey(x, 'pred.celeste-count', '1');
          }),
          ...(canTurn11(s)
            ? [
                a('turn', 'Turn the favour on the client', 'You hold the fund’s paper. Make Halvorsen think again, and owe you.', 'turned', (x) => {
                  setKey(x, 'pred.iris', 'kept');
                  setKey(x, 'pred.halvorsen', 'owes-her');
                  setKey(x, 'pred.celeste-count', '1');
                }),
              ]
            : []),
        ]
      : []),
  ];
}

// ── The cloakroom ──

function cloakBlocks(s: GameState): Block[] {
  const a = answer(s);
  if (a === 'complied')
    return [
      p('The cloakroom at twenty to eleven. Iris’s bag is on the shelf behind the counter with her coat, a small grey clutch with a torn lining, because every bag has a torn lining if you know where to feel.'),
      p('It takes four seconds. You know about linings.'),
      p('At the door Halvorsen’s man takes Iris gently by the elbow and says something close to her ear, and she stops, and turns, and looks back down the whole length of the hall, past everybody, at you. And knows.'),
      t('I did not touch her. I put a piece of paper in a lining. That is all it ever takes. That is what she wanted me to learn.'),
    ];
  if (a === 'refused')
    return [
      p('You walk out onto the little bridge over the canal behind the Vesper, and take the memo out of your bag, and tear it into eight, and let the pieces go into the black water one at a time.'),
      p('When you come back, Celeste is by the door with Marcus, and looks at your face, and knows.'),
      q('Celeste', 'Pity. I did so hope.'),
      p('At a quarter to eleven Halvorsen’s man takes Iris gently by the elbow at the door. Somebody else had a copy. Somebody always has a copy. Iris does not look back; she does not know there was anybody to look back at.'),
      t('My hands are clean. It changed nothing for her, and it is going to cost Helix a shipping contract. I would do it again. I am not sure that is a virtue.'),
    ];
  if (a === 'warned')
    return [
      p('You find Iris on the terrace, still holding the unlit cigarette, and put the envelope in her hand, and say nothing at all. She reads it in the light from the long room, and reads it again, and folds it very small.'),
      q('Iris Moreau', 'Four years. They were going to do it with a piece of paper.'),
      p('You take her through the kitchens, where nobody looks at two women in evening dresses walking fast, and out by the bins into the lane, and she hails a taxi like somebody who has been rehearsing it for four years, and at the last moment grips your wrist.'),
      q('Iris Moreau', 'I’ll find you. When I have a name that’s mine.'),
    ];
  return [
    p('In the cloakroom you find Halvorsen waiting for his coat, alone, and you stand beside him, and say, pleasantly, that you have been reading about his fund’s financing, on some very old cream paper, and that you would hate for anything to happen tonight that made you want to read it aloud.'),
    p('He looks at you for a long time, with a buyer’s frankness, and you watch him work out the price.'),
    q('Halvorsen', 'On reflection, my dear, I think I shall keep my chief of staff. She has done beautifully. And I believe I owe you a lunch.'),
    t('He owes me. Not Helix. Not Celeste. Me. And Iris goes home tonight to the flat they pay for, still somebody, for a while longer, and never knows why.'),
  ];
}

function cloakChoices(s: GameState): C11Choice[] {
  const a = answer(s);
  const c = (id: string, label: string, hint: string, body: Block[]) =>
    offer('cloak-' + id, label, hint, 'late', (x) => {
      set11(x, 'p-cloak', id);
      return body;
    });
  return [
    c('celeste', 'Find Celeste before you go', 'Let her say it to your face.', [
      q(
        'Celeste',
        a === 'complied'
          ? 'Lovely, darling. You see how easy it is. It is only ever difficult the first time.'
          : a === 'refused'
            ? 'I shan’t hold it against you, darling. I shall simply remember it. It comes to the same thing, in the end.'
            : a === 'warned'
              ? 'Iris seems to have gone home early. Through the kitchens, somebody said. How very unlike her.'
              : 'Mr Halvorsen has changed his mind. He never changes his mind. I wonder who could have changed it for him.',
      ),
      ...(a === 'warned' || a === 'turned' ? [p('For one sentence, and only one, she looks at you as if she had not seen you before. Then the smile comes back, and it is a different smile.')] : []),
    ]),
    c('wait', 'Wait for Marcus at the door', 'Get your coat. Go.', [p('You collect your coat and wait for Marcus at the door, under the empty frames, and let the clients go past you into the cold, and do not look at any of them.')]),
  ];
}

// ── The car, and the evening ──

function lateBlocks(s: GameState): Block[] {
  return [
    p(key(s, 'c8.p-night') === 'pryce' ? 'Mr Pryce drives. At the lights by the bridge he looks at you in the mirror, once, the way he did in the rain, and then back at the road.' : 'The car goes along the river in the dark. The glass between you and the driver is up.'),
    p('Marcus loosens his tie, and leans back, and looks at you in the dark of the back seat, pleased with the evening, pleased with you, pleased with himself.'),
    q('Marcus Chen', 'Well? Did you like the collection?'),
    t('Page forty. At client request. He is sitting a foot away from me, and he has no idea that I have read my own bill of sale.'),
  ];
}

function carChoices(): C11Choice[] {
  const c = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('car-' + id, label, hint, 'late', (x) => {
      set11(x, 'p-car', id);
      setKey(x, 'pred.marcus11', value);
      after?.(x);
      return body;
    });
  return [
    c('ask', 'Ask him', '“Did you ask for me?”', 'asked', [
      q('You', 'Did you ask for me? By name?'),
      p('He does not pretend not to understand. He never has, with you.'),
      q('Marcus Chen', 'I asked for you. By name. The morning after the Glass House. I watched you work that room, and I rang Celeste before breakfast, and I said, that one. I’d do it again.'),
      q('Marcus Chen', 'I thought you knew. I thought that was why you asked for my desk.'),
    ]),
    c('keep', 'Keep it', 'A card, not a question.', 'kept', [
      q('You', 'I liked it very much.'),
      p('He smiles in the dark and closes his eyes, and you watch the river go past behind his head, and keep it, the way you keep everything now: for the day it can be used.'),
    ]),
    c('use', 'Use it, tonight', '“You bought me. So you’ll understand when I send the bill.”', 'used', [
      q('You', 'You bought me, Marcus. Page forty. At client request. So you’ll understand when I send the bill.'),
      p('For a moment the car is completely silent. Then he laughs, the real laugh, surprised out of him, and takes out his phone, and types something with one thumb.'),
      q('Marcus Chen', 'A transfer fee. Backdated. Don’t tell HR. God, you’re expensive.'),
      t('He paid. He paid in the car, with one thumb, laughing. He thinks it makes us even. It makes him a man who pays when I ask.'),
    ], (x) => setKey(x, 'own.cash', String(cash(x) + 10000))),
  ];
}

type Partner = 'marcus' | 'julian';
const who: Record<Partner, string> = { marcus: 'Marcus Chen', julian: 'Julian Mercer' };
const invite: Record<Partner, Block[]> = {
  marcus: [
    p('At the kerb outside your building he does not open the door for you. He says, looking straight ahead: “Come up to the river. No business. You know the rule.”'),
    p('The flat above the water, the city on three sides, the horse on the wall that he does not like. He takes your coat himself.'),
    q('Marcus Chen', 'Tell me what you want tonight. Only what you want.'),
  ],
  julian: [
    p('At the kerb your phone lights: Julian. “I watched you read that book. I don’t know what was in it. Come up, if you want to. No questions.”'),
    p('The forty-first floor, his tie already off, two glasses poured and one of them untouched, waiting for you.'),
    q('Julian Mercer', 'Tell me what you want tonight. Only tonight.'),
  ],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  marcus: { 'no-sex': 'Then that is the evening. You say stop, I stop.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
};
const stay: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  marcus: {
    'no-sex': [p('He kisses you by the window with the river below, slowly, and stops exactly where you said, and you stand there in the dark with his forehead against yours, two people who have each just found out something about the other and have decided, for tonight, to keep it.')],
    sex: [p('He undoes the dress as if he had been thinking about it all evening, which he has, and asks once more whether you are sure. You answer by drawing him toward the bedroom.'), p('What happens next is two people who both like to win, deciding for one night not to keep score. The scene fades.')],
  },
  julian: {
    'no-sex': [p('He kisses you against the glass and stops exactly where you tell him to, and holds you there, and does not ask what was in the book, and you find that you would have told him if he had.')],
    sex: [p('The dress goes, and his shirt, and the Vesper goes with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next stays on the forty-first floor. The scene fades.')],
  },
};

function eveningChoices(s: GameState): C11Choice[] {
  const open = get11(s, 'p-evening-open');
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer(`p11-${partner}-${id}`, label, hint, 'late', (x) => {
        set11(x, 'p-evening-open', partner + '-room');
        set11(x, 'p-evening-scope', id);
        note(x, 'p11-evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(who[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('p11-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'ledger', (x) => {
        delete x.choices['c11.p-evening-open'];
        set11(x, 'p-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get11(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p11-stop', 'Stop here', 'Honoured immediately, without argument.', 'ledger', (x) => {
        delete x.choices['c11.p-evening-open'];
        set11(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer('p11-stay', 'Stay', 'Continue within what you chose.', 'ledger', (x) => {
        delete x.choices['c11.p-evening-open'];
        set11(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[partner][sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  const go = (partner: Partner, label: string, hint: string) =>
    offer('late-' + partner, label, hint, 'late', (x) => {
      set11(x, 'p-evening', partner);
      set11(x, 'p-evening-open', partner);
      return invite[partner];
    });
  return [
    go('marcus', 'Go up to the river with him', 'His rule: no business.'),
    ...(julian(s) === 'ally' && key(s, 'c6.friction-julian') !== 'cooled' ? [go('julian', 'Go to Julian', 'He watched you read the book. No questions.')] : []),
    offer('late-alone', 'Go up alone', 'Chapter 11 ends here.', 'ledger', (x) => {
      set11(x, 'p-evening', 'alone');
      return [p('You say goodnight at the kerb and go up alone, and do not turn the lamp on.')];
    }),
  ];
}

// ── The ledger ──

function ledgerBlocks(s: GameState): Block[] {
  const a = answer(s);
  const page = key(s, 'pred.transfer');
  return [
    ...(get11(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep.')] : []),
    p('The wardrobe door. Two new cards, in capitals.'),
    q('The card', a === 'complied' ? 'IRIS MOREAU. RETIRED. I PUT IT IN HER BAG.' : a === 'refused' ? 'IRIS MOREAU. ENDED. NOT BY ME. NOT SAVED BY ME EITHER.' : a === 'warned' ? 'IRIS MOREAU. OUT THROUGH THE KITCHENS.' : 'IRIS MOREAU. KEPT. HALVORSEN OWES ME.'),
    q('The card', 'E. V. TRANSFERRED: AXIOM → HELIX. AT CLIENT REQUEST (M. CHEN).' + (page === 'torn' ? ' (THE PAGE IS IN MY BAG.)' : page === 'photographed' ? ' (PHOTOGRAPHED.)' : '')),
    p('You pin the second one next to Marcus’s, touching it, so that the two cards overlap at the corner.'),
    ...(key(s, 'pred.book') === 'first' ? [p('And a third, smaller, in pencil, pinned under your own: E. V. FIRST ISSUE. WITHDRAWN. JAKARTA. WHO WAS SHE?')] : key(s, 'pred.book') === 'clients' ? [p('And under Marcus’s name, in pencil: TRANSFERS: 3. TWO CONCLUDED. WHAT DOES CONCLUDED MEAN?')] : []),
    p('At one the black phone lights.'),
    q('C.', a === 'complied' ? 'Beautifully done, darling. Mr Halvorsen is so grateful to Helix. You see? It is only ever difficult the first time.' : a === 'refused' ? 'Mr Halvorsen is taking his ships elsewhere, darling. Marcus has been told why. I did so hope.' : 'Well. I am starting to enjoy you. I have started keeping count.'),
    ...(page === 'torn' ? [q('C.', 'And do keep the page, darling. We have copies. We always have copies.')] : []),
    t('I thought I took his company from the inside. He bought me into it. Fine. Everything he paid for, I am going to spend.'),
  ];
}

export function predatorBlocks11(s: GameState): Block[] {
  if (s.phase === 'dress') return dressBlocks(s);
  if (s.phase === 'longroom') return longroomBlocks(s);
  if (s.phase === 'book') return bookBlocks(s);
  if (s.phase === 'powder') return powderBlocks();
  if (s.phase === 'terrace') return terraceBlocks();
  if (s.phase === 'cloak') return cloakBlocks(s);
  if (s.phase === 'late') return lateBlocks(s);
  if (s.phase === 'ledger') return ledgerBlocks(s);
  return [];
}

export function predatorChoices11(s: GameState): C11Choice[] {
  if (s.phase === 'dress') return dressChoices();
  if (s.phase === 'longroom') return get11(s, 'p-room') ? guestChoices(s) : longroomChoices();
  if (s.phase === 'book') return get11(s, 'p-page') ? backChoices() : bookChoices();
  if (s.phase === 'powder') return powderChoices();
  if (s.phase === 'terrace') return terraceChoices(s);
  if (s.phase === 'cloak') return cloakChoices(s);
  if (s.phase === 'late') return get11(s, 'p-car') ? eveningChoices(s) : carChoices();
  return [];
}
