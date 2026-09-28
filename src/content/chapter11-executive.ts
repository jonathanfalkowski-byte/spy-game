/** Chapter 11 (Executive route, lane id `executive`) · The Good Pen:
 * frames → pages → pen → signing → drive → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_11_THE_GOOD_PEN_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_11_SCRIPT.md. The shared Vesper set in Executive framing:
 * she arrives on Julian's arm as Helix's guest and is shown; the clients talk of availability and Julian hears it
 * (appalled, not yet told, never a buyer). Iris Moreau, Halvorsen's chief of staff, four years in and "ending", is the
 * mirror (warn / kin / quiet). The book, The Autumn Collection, and her page in shared canon's words (show him / close
 * it / turn the page). The second order: Marcus's Morel & Cie facility, signed tonight in the long room with the good
 * pen, because she brings it (sign / warn / refuse; refusal costs Julian Halvorsen's mandate on Monday, non-sexual; the
 * placement date is never moved as a punishment). "What was that place?" in Hal's car, and Singapore next month; a
 * chosen night (heat 3, consent-gated, fades). Entered from an Executive `chapter10.complete`; until Executive Ch12
 * exists the road goes on through the in-development bridge to Ch14, which reads exec.sign11. Local helpers mirror
 * chapter11.ts (c11.* keys, chapter11.* ids); choice ids carry `x11-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

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

export const EXECUTIVE_PHASES11 = ['frames', 'pages', 'pen', 'signing', 'drive'] as const;
export const isExecutive11 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase11 = (s: GameState) => isExecutive11(s) && ((EXECUTIVE_PHASES11 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const told8 = (s: GameState) => key(s, 'exec.file') === 'told';
const sign = (s: GameState) => key(s, 'exec.sign11') as 'signed' | 'warned' | 'refused' | undefined;
const nightOk = (s: GameState) =>
  key(s, 'c6.friction-julian') === 'warmed' || ['c7.x-evening-outcome', 'c8.x-late-outcome', 'c10.x-night-outcome'].some((k) => !!key(s, k)?.startsWith('intimate'));

export function placeExecutive11(s: GameState): string | undefined {
  if (s.phase === 'pages' && get11(s, 'x-iris')) return '21:30 · The anteroom, the lectern';
  const open = get11(s, 'x-night-open');
  if (s.phase === 'drive' && open) return open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · Julian’s apartment, the forty-first floor';
  if (s.phase === 'drive' && get11(s, 'x-drive')) return '00:30 · Forty-one';
}

// ── The entry ──

export function beginExecutive11(): C11Choice {
  return offer('begin-executive', 'The first Thursday', 'The Vesper, on Julian’s arm. Black tie.', 'frames');
}

// ── The frames ──

function framesBlocks(s: GameState): Block[] {
  const cal = key(s, 'exec.calendar');
  return [
    p(
      key(s, 'exec.fav.card') === 'take'
        ? 'The dress from the window on Sloane Street, bought on his card in the spring, and worn now for the second time, with your hair up and your face finished twice.'
        : 'Your own black dress, the one you have had taken in twice, with your hair up and your face finished twice.',
    ),
    p((key(s, 'exec.flat') === 'accepted' ? 'Hal collects you from the flat on the river at half past seven' : 'Hal collects you from your own front door at half past seven') + ', and Julian is in the back of the car in black tie, and looks at you, and for a moment forgets to say anything at all.'),
    q('Julian Mercer', 'You look…'),
    q('You', 'Say it.'),
    q('Julian Mercer', 'Like something I’d have to read twice.'),
    ...(key(s, 'c10.x-midweek') === 'hand' ? [p('At the kerb he offers you his arm without thinking, the way you took his hand on the doorframe, and you take it the same way.')] : []),
    p('The Vesper: black glass on a street by the canal, no name, no painting in the window. Inside, the long room, and every wall hung with empty frames, gilt and carved and lit from below as if they held something. The guests are the exhibition. You understand that before you have taken off your coat.'),
    q('Celeste Laurent', 'Julian. At last. Eleven years I’ve been meaning to have you here.'),
    q(
      'Celeste Laurent',
      cal === 'gave'
        ? 'And you, darling. You’ve been such a help.'
        : cal === 'doctored'
          ? 'And you, darling. One of your Fridays had a little mistake in it. Thursday. Marcus was quite put out. Everybody makes one.'
          : 'And you, darling. Pity about Gdańsk.',
    ),
    p('Then she walks you through her clients the way you would walk somebody through a hang: Halvorsen, a shipping man with a sailor’s hands; a minister’s wife in emerald; a quiet man from a Gulf fund who does not drink. They talk to Julian about Helix, and about you, over your head, in a vocabulary you learn a sentence at a time. Availability. Placement. The public profile. Our last one.'),
    p('Julian hears it. You watch him hear it. He does not look away from them, and he does not look away from you, and his hand at your back goes very still.'),
    ...(key(s, 'exec.paper10') === 'old' ? [t('She knew me before, I told him. He is watching her now the way I watch doors.')] : []),
  ];
}

function framesChoices(): C11Choice[] {
  const r = (id: 'stay' | 'work' | 'watch', label: string, hint: string, body: Block[]) =>
    offer('x11-room-' + id, label, hint, 'pages', (x) => {
      set11(x, 'x-room', id);
      return body;
    });
  return [
    r('stay', 'Stay beside him', 'Let them look at both of you.', [p('You stay at his side all through the champagne, your shoulder against his arm, and let them look at the two of you together, which is a different thing to look at, and they know it.')]),
    r('work', 'Work the room', 'Be very good at this.', [
      p('You leave him with the minister’s wife and give Halvorsen twenty minutes of your full attention, and he tells you about ships, and then, lower, pleased with himself, that the autumn collection is in the anteroom tonight, “if you know where to look”.'),
    ]),
    r('watch', 'Watch him watch them', 'He has never seen a room like this.', [p('You stand a step back and watch Julian learn the room, sentence by sentence, the way he learned your terms: slowly, twice, moving his lips very slightly on the second reading.')]),
  ];
}

// ── The pages ──

function pagesBlocks(): Block[] {
  return [
    p('The powder room: black marble, a single orchid, and a woman at the mirror in grey silk, forty, beautifully finished, watching the door in the glass the way you do.'),
    q('Iris Moreau', 'They put you in the green, too. Or near enough.'),
    p('Iris Moreau. Halvorsen’s chief of staff, four years. She says it the way you would say a rank. And she looks at you in the mirror, and you look at her, and neither of you says the other word, the one underneath.'),
  ];
}

function irisChoices(): C11Choice[] {
  const i = (id: 'warn' | 'kin' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('x11-iris-' + id, label, hint, 'pages', (x) => {
      set11(x, 'x-iris', id);
      setKey(x, 'exec.iris11', id);
      return [...body, ...bookLead];
    });
  return [
    i('warn', '“Your page says ending.”', 'You will see it in a minute. She should hear it first.', [
      q('You', 'Your page says ending. In the book in the anteroom. I think tonight.'),
      p('She looks at you in the mirror for a long moment. Then she caps her lipstick, and picks up her bag, and says “Thank you,” as if you had told her the time, and goes out through the door marked STAFF, toward the kitchens, and does not come back.'),
    ]),
    i('kin', '“I’m his chief of staff too.”', 'Say the rank. Let her hear the rest.', [
      q('You', 'I’m his chief of staff too. Julian Mercer’s.'),
      q('Iris Moreau', 'Then you’ll know how it ends. Unless you don’t let it.'),
    ]),
    i('quiet', 'Say nothing', 'Fix your face. Let her fix hers.', [p('You fix your face beside her in the glass, and she fixes hers, and at eleven she leaves with Halvorsen’s man a step behind her, and you will never be sure what you saw.')]),
  ];
}

const bookLead: Block[] = [
  p('The anteroom: a lectern under a picture light, and on it a leather book, open, turned for clients. THE AUTUMN COLLECTION, in gilt on the spine. Every page is a person.'),
  p('Iris’s page: a photograph, a line of code, and I. M. · ENDING.'),
  p('And yours, three pages on: the Aster photograph, and under it, in the same neat type as everybody else’s: E. V. · REISSUED · PUBLIC PROFILE · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH.'),
  p('Behind you, a step on the parquet you would know anywhere. Julian, come to find you.'),
];

function bookChoices(): C11Choice[] {
  const b = (id: 'show' | 'close' | 'turn', label: string, hint: string, body: Block[]) =>
    offer('x11-book-' + id, label, hint, 'pen', (x) => {
      setKey(x, 'exec.book11', id);
      return body;
    });
  return [
    b('show', 'Let him see it', 'Stand aside.', [
      p('You stand aside. He reads it the way he reads everything, twice, and goes white.'),
      q('Julian Mercer', 'What is this?'),
      q('You', 'Later. I promise. Not here.'),
      p('He looks at you, and at the page, and back at you, and nods once, and closes the book himself, very gently, as if it were somebody’s.'),
    ]),
    b('close', 'Close the book', 'Before he reaches you.', [p('You close it as he reaches you. “A guest book,” you say. He believes you, because you have never given him a reason not to, and you feel exactly how much that is worth.')]),
    b('turn', 'Turn to another page', 'Let him see a stranger.', [p('You turn back three pages as he reaches you, and he looks over your shoulder at a stranger’s face, a man in his fifties, and a line of code, and does not understand what he is looking at, and you let him not understand.')]),
  ];
}

// ── The pen ──

function penBlocks(s: GameState): Block[] {
  return [
    p('The balcony over the canal, a quarter past ten, the water black and slow below, the long room lit behind the glass. Celeste, in grey, with a cream folder under her arm.'),
    q('Celeste Laurent', 'Marcus has brought a lovely little facility for Julian tonight. Morel & Cie, the usual. I’d like him to sign it here, in the long room, with a good pen, so that it feels like a celebration.'),
    q('Celeste Laurent', 'Bring it to him. Stand beside him. He signs what you bring him now, darling. Everybody’s noticed.'),
    ...(told8(s) ? [q('Celeste Laurent', 'He hasn’t signed anything of ours since the spring. He’ll sign this. For you.')] : []),
    p('She opens the folder so you can see: sixty pages, flagged for signature on the last. You do not need to turn to page thirty-one. You know what is on it.'),
    t('Not his calendar now. His hand. And she wants mine on his shoulder while he does it.'),
  ];
}

function penChoices(): C11Choice[] {
  const c = (id: 'sign' | 'warn' | 'refuse', label: string, hint: string, value: 'signed' | 'warned' | 'refused', body: Block[]) =>
    offer('x11-pen-' + id, label, hint, 'signing', (x) => {
      setKey(x, 'exec.sign11', value);
      note(x, 'x-order', `Celeste Laurent asked Evelynn to bring Julian Mercer a Morel & Cie facility carrying clause 14.3 to sign at the Vesper, and to stand beside him while he did. She ${{ signed: 'did', warned: 'warned him not to sign anything that night', refused: 'refused' }[value]}.`, 'Celeste Laurent, on the balcony at the Vesper');
      return body;
    });
  return [
    c('sign', 'Take the folder', 'Bring it to him. Stand beside him.', 'signed', [p('You take the folder. It weighs nothing. Celeste hands you a pen from her own bag, black and gold and heavy, a good pen, and touches your elbow, once, as you go in.')]),
    c('warn', 'Take the folder, and go the long way', 'Find him first. On the stairs.', 'warned', [
      p('You take the folder, and say “Of course,” and go in by the far door, and down the half-flight of stairs where he has gone to take a call, and stop him with a hand flat on his chest.'),
      q('You', 'Don’t sign anything tonight. Not from Marcus, not from me. Trust me, and ask me why in the car.'),
      q('Julian Mercer', 'All right.'),
      p('He does not ask anything else. You leave the folder on the table by the stairs, where Marcus will find it.'),
    ]),
    c('refuse', '“I won’t bring it to him.”', 'Leave the folder in her hands.', 'refused', [q('You', 'I won’t bring it to him, Mrs Laurent.'), q('Celeste Laurent', 'Pity, darling.'), p('She does not raise her voice. She does not need to. She goes in, and a moment later you see Marcus take the folder from her through the glass.')]),
  ];
}

// ── The signing ──

function signingBlocks(s: GameState): Block[] {
  const a = sign(s);
  if (a === 'signed')
    return [
      p('Twenty to eleven, the long room. You cross it with the folder and the good pen, through the clients and the empty frames, and put the folder on the table in front of him, and your hand on his shoulder.'),
      p('He reads the first line. He looks up at you.'),
      q('Julian Mercer', 'If you’ve read it, that’s enough for me.'),
      p('And he signs, with the good pen, and your hand on his shoulder, and the clients who have gathered to watch applaud something none of them understand. Across the room Celeste raises her glass to you, half an inch.'),
      t(told8(s) ? 'Twelve. He stopped at eleven for me, and started again for me. I will carry this hand for the rest of my life.' : 'Twelve. And this one has my hand on it. I will carry this hand for the rest of my life.'),
    ];
  if (a === 'warned')
    return [
      p('Twenty to eleven, the long room. Marcus finds the folder where you left it, and brings it to Julian himself, with a good pen, smiling, in front of the clients.'),
      q('Julian Mercer', 'Not tonight, Marcus. I read things now.'),
      p('Marcus’s smile does not move. Across the room Celeste turns her head, very slightly, and looks at you for a long moment over the rim of her glass.'),
      q('Celeste Laurent', 'He’s learned to say no. I wonder where.'),
    ];
  return [
    p('Twenty to eleven, the long room. Marcus brings Julian the folder himself, with a good pen, smiling, in front of the clients.'),
    ...(told8(s)
      ? [q('Julian Mercer', 'Not tonight, Marcus. I read things now. Put it on my tray and I’ll read it on Monday.'), p('Marcus laughs as if it were a joke. Nobody else does.')]
      : [p('Julian signs it, the way he has signed everything Marcus has ever brought him, without turning the pages, and the clients applaud, and your hand is nowhere near it. You watch from the door. It does not feel like innocence.')]),
    p('On Monday Halvorsen’s shipping line moves its whole mandate from Helix, forty million a year, without a reason given, and Julian has the worst Monday of his career.'),
  ];
}

function signingChoices(s: GameState): C11Choice[] {
  return [
    offer('x11-signing-go', 'Get your coat', sign(s) === 'refused' ? 'Hal is waiting. Monday is coming.' : 'Hal is waiting.', 'drive', (x) => {
      setKey(x, 'exec.celeste11', { signed: 'pleased', warned: 'suspects', refused: 'cold' }[sign(x) ?? 'refused']);
      if (sign(x) === 'refused') setKey(x, 'exec.cost11', 'halvorsen');
      return [];
    }),
  ];
}

// ── The drive, and the night ──

function driveBlocks(s: GameState): Block[] {
  return [
    p('Midnight, Hal’s car, the city going by in the rain. Julian has loosened his tie and not taken it off, and is looking at his own hands.'),
    q('Julian Mercer', sign(s) === 'warned' ? 'You said to ask you why in the car. I’m asking something else first. What was that place?' : 'What was that place?'),
  ];
}

const singapore: Block[] = [
  p('Then, after a while, looking out of the window, as if it were a smaller subject:'),
  q('Julian Mercer', 'Helix has a thing in Singapore next month. A week. I was going to go alone. I’d rather not. I’d rather you came.'),
];

function driveChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'x-drive')) {
    const d = (id: 'shop' | 'singapore' | 'party', label: string, hint: string, body: Block[]) =>
      offer('x11-drive-' + id, label, hint, 'drive', (x) => {
        set11(x, 'x-drive', id);
        note(x, 'x-singapore', 'Julian Mercer asked Evelynn to come with him to Singapore next month, on Helix business.', 'Julian Mercer, in Hal’s car');
        return [...body, ...singapore];
      });
    return [
      d('shop', '“A shop. I was in the window.”', 'True. Not all of it.', [q('You', 'A shop. And I was in the window.'), p('He looks at you for a long time. Then he takes your hand across the seat and holds it, hard, and does not say anything, and does not let go.')]),
      d('singapore', '“Ask me in Singapore.”', 'Not here. Not in a car she booked.', [q('You', 'Ask me again somewhere far away. Not here.'), q('Julian Mercer', 'Then that’s easy.')]),
      d('party', '“A party.”', 'Let him have that, tonight.', [q('You', 'A party, Julian. A very expensive party.'), p('He nods, and does not believe you, and lets you have it, the way he always does.')]),
    ];
  }
  const open = get11(s, 'x-night-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x11-julian-' + id, label, hint, 'drive', (x) => {
        set11(x, 'x-night-open', 'julian-room');
        set11(x, 'x-night-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s tonight. I’ll stay on my side of it and be glad.')];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x11-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c11.x-night-open'];
        set11(x, 'x-night-outcome', 'declined');
        return [p('You say goodnight at his door. He holds on to your hand a moment longer than he needs to, and lets go.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get11(s, 'x-night-scope') as 'no-sex' | 'sex';
    return [
      offer('x11-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c11.x-night-open'];
        set11(x, 'x-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you by the window until you are ready to go.')];
      }),
      offer('x11-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c11.x-night-open'];
        set11(x, 'x-night-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [p('He takes the pins out of your hair one at a time, slowly, the way you would take a room apart looking for something you loved, and asks once more, and you answer by pulling him down.'), p('What happens next stays on the forty-first floor. The scene fades.')]
          : [p('He kisses you by the window in his undone tie for a very long time, and stops where you said, and holds you, and says, into your hair, “I don’t care what that place was. I care that you came home.”')];
      }),
    ];
  }
  return [
    offer('x11-night-julian', 'Go up with him', 'Forty-one. Neither of you wants to be alone.', 'drive', (x) => {
      set11(x, 'x-night', 'julian');
      set11(x, 'x-night-open', 'julian');
      return [p('Forty-one, the lights off, the city below. He stands at the window with his tie undone and says, without turning round:'), q('Julian Mercer', 'Tell me what you want tonight, and that’s what happens.')];
    }),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          offer('x11-night-maya', 'Go to Maya’s', 'You need somebody who will not ask the polite question.', 'complete', (x) => {
            set11(x, 'x-night', 'maya');
            return [p('Maya’s kitchen at one in the morning, in the dress, with your shoes in your hand.'), q('Maya', 'You look like you’ve been to a funeral in the nicest possible clothes.'), q('You', 'I have. I think it was mine.')];
          }),
        ]
      : []),
    offer('x11-night-alone', 'Go home alone', 'Chapter 11 ends here.', 'complete', (x) => {
      set11(x, 'x-night', 'alone');
      return [p('You go home alone and take the dress off in the dark and stand at the window in your slip for a long time, watching the rain.')];
    }),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = sign(s);
  return [
    ...(get11(s, 'x-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn with his cufflink in your evening bag, and do not remember how it got there.')] : []),
    p('The wardrobe door. Under CELESTE LAURENT, a new card:'),
    q('The card', 'THE VESPER. “AVAILABLE FROM THE FIRST THURSDAY OF NEXT MONTH.”'),
    p('And under it, whose pen it was:'),
    q('The card', a === 'signed' ? 'THE GOOD PEN: HIS. MY HAND ON HIS SHOULDER.' : a === 'warned' ? 'THE GOOD PEN: NOT TONIGHT. HE READS THINGS NOW.' : 'THE GOOD PEN: MARCUS’S. HALVORSEN, FORTY MILLION, MONDAY.'),
    ...(key(s, 'exec.iris11') === 'warn' ? [p('Beside it, small: IRIS. THROUGH THE KITCHENS.')] : []),
    p('And last, pinned to the edge of the door where it will not stay long, a card with one word on it: SINGAPORE.'),
    t('She has put a date on me. Then I have a date too.'),
  ];
}

export function executiveBlocks11(s: GameState): Block[] {
  if (s.phase === 'frames') return framesBlocks(s);
  if (s.phase === 'pages') return pagesBlocks();
  if (s.phase === 'pen') return penBlocks(s);
  if (s.phase === 'signing') return signingBlocks(s);
  if (s.phase === 'drive') return driveBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices11(s: GameState): C11Choice[] {
  if (s.phase === 'frames') return framesChoices();
  if (s.phase === 'pages') return get11(s, 'x-iris') ? bookChoices() : irisChoices();
  if (s.phase === 'pen') return penChoices();
  if (s.phase === 'signing') return signingChoices(s);
  if (s.phase === 'drive') return driveChoices(s);
  return [];
}
