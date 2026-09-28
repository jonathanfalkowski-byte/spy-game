/** Chapter 8 (Executive route, lane id `executive`) · The Terms:
 * orbit → favours (three of five, one a week) → dinner → tray → late → complete.
 * Design: docs/story/EXECUTIVE_CHAPTER_8_THE_TERMS_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_8_SCRIPT.md. Entered from an Executive `chapter7.complete`;
 * hands on to the shared Chapter 9 bridge. The lit office next door was Clare Adeyemi's, driven out by Marcus; Julian
 * didn't keep her, and says so. Three weeks in his orbit as a hub of favours (the car, the card, the fixer: his to her;
 * the diary, the paper: hers to him), each take / halfway / refuse, and each Ch7 term changes at least one of them. The
 * kept ledger (exec.kept) is never a meter, only a list on the card. The Helix–Axiom dinner: Sloane across the table,
 * Marcus beside her, and an optional cloakroom deal (the fund's name a night early, for a debt to Sloane). The tray at
 * 23:40: clause 14.3 and L.S.F. Advisory in a Morel & Cie facility (tell him / keep it / pull the file). A chosen
 * evening (heat 3, consent-gated, fades). Julian is never a trap (EXECUTIVE_ROUTE_DESIGN §2). Local helpers mirror
 * chapter8.ts (c8.* keys, chapter8.* ids) to avoid a circular import; choice ids carry `x8-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { cash5, get5 } from './chapter5-model';

type C8Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get8 = (s: GameState, k: string) => s.choices['c8.' + k];
const set8 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c8.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C8Choice['apply']): C8Choice => ({ id: 'chapter8.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get8(s, 'rec.' + k) !== undefined) return;
  set8(s, 'rec.' + k, String(s.history.length));
  set8(s, 'event.' + k, String(s.revision));
  set8(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c8.' + k);
  s.knowledge.push('c8.' + k);
}

export const EXECUTIVE_PHASES8 = ['orbit', 'favours', 'dinner', 'tray', 'late'] as const;
export const isExecutive8 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase8 = (s: GameState) => isExecutive8(s) && ((EXECUTIVE_PHASES8 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const term = (s: GameState, id: string) => !!key(s, 'exec.term.' + id);
const cash = (s: GameState) => Number(key(s, 'own.cash') ?? cash5(s));
const DRESS = 400;
const bump = (s: GameState, k: string) => setKey(s, k, String(Number(key(s, k) ?? 0) + 1));

type Favour = 'car' | 'card' | 'fixer' | 'diary' | 'paper';
const FAVOURS: Favour[] = ['car', 'card', 'fixer', 'diary', 'paper'];
const weeks = (s: GameState) => Number(get8(s, 'x-weeks') ?? 0);
const WEEK = ['Week one', 'Week two', 'Week three'];

export function placeExecutive8(s: GameState): string | undefined {
  const open = get8(s, 'x-open');
  if (s.phase === 'favours' && open)
    return (
      WEEK[weeks(s)] +
      {
        car: ' · 01:10 · The kerb outside Helix',
        card: ' · Your office, forty-one',
        fixer: ' · Julian’s office, forty-one',
        diary: ' · Friday · Your desk, forty-one',
        paper: ' · 23:00 · Julian’s sofa, forty-one',
      }[open as Favour]
    );
  if (s.phase === 'dinner' && get8(s, 'x-cloak')) return '22:30 · The cloakroom';
  const late = get8(s, 'x-late-open');
  if (s.phase === 'late' && late) return late === 'maya' ? 'Late · Maya’s kitchen' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── His orbit ──

function orbitBlocks(s: GameState): Block[] {
  const stayed = key(s, 'c7.x-evening-outcome')?.startsWith('intimate');
  return [
    ...(key(s, 'route.overlay')?.includes('kept') ? [t('I already know I like being looked after. I found that out in the spring, and I did not like finding it out. Three weeks. Let’s see how much.')] : []),
    p('The office next door to his is yours now: a desk, a lamp, a window on the river, and the light, which was on when you first saw it and is still on when you arrive on the first morning, although nobody has been in.'),
    q('You', 'Why is the light always on in here?'),
    p('Julian stands in the doorway with two coffees and does not come in, as if the room were still somebody else’s.'),
    q('Julian Mercer', 'Clare Adeyemi. My last chief of staff. Eighteen months ago Marcus decided she was in his way, and he made every day of her job a little harder than the day before, very politely, until she walked out. I saw it happening, and I told myself it was just Marcus, and I didn’t stop it in time.'),
    q('Julian Mercer', 'I left the light on. It seemed the least I could do, which is exactly what it was. I didn’t keep her. I’m not going to make that mistake twice.'),
    t('He never did keep them, Marcus said. It was true, and it was Marcus who made it true, and Julian has just told me so without being asked. That is twice now.'),
    ...(stayed ? [p('At work he calls you Ms Vale, and holds doors for you exactly as he holds them for everybody, and only once, in the lift, alone, lets his hand rest for a second against the small of your back, and takes it away again before the doors open.')] : []),
  ];
}

function orbitChoices(): C8Choice[] {
  const l = (id: 'off' | 'on', label: string, hint: string, body: Block[]) =>
    offer('x8-light-' + id, label, hint, 'favours', (x) => {
      set8(x, 'x-light', id);
      return [
        ...body,
        p('Then the rhythm of it, fast, the way a new city becomes yours. The coffee at ten past seven. His diary, which is now your diary. The way the floor goes a little quieter when you walk through it, and a little straighter. Everything that crosses his desk crosses yours first, and a great deal crosses his desk.'),
        t('Three weeks. He is going to be kind to me, and I am going to be good at this, and somebody is going to have to keep count. It had better be me.'),
      ];
    });
  return [
    l('off', 'Turn the light off', 'It’s your office now.', [p('You reach past him and turn it off. He looks at the dark lamp for a moment, and then at you, and nods, as if you had signed something for him that he could not sign himself.')]),
    l('on', 'Leave it on', 'For her. And so that he remembers.', [q('You', 'Leave it. I’ll work under it.'), p('He looks at you in a way you will think about later, and goes to his own desk without a word.')]),
  ];
}

// ── The favours ──

const favourIntro: Record<Favour, (s: GameState) => Block[]> = {
  car: (s) => [
    p('Ten past one in the morning, after a deal closes on the third attempt, and you come out of the revolving door into rain with your shoes in your hand. At the kerb, engine warm, the long black Helix car, and a big grey-haired man holding the rear door.'),
    q('Hal', 'Hal, Ms Vale. Mr Mercer’s instructions. Any night you’re past eleven, I’m here.'),
    ...(key(s, 'exec.flat') === 'accepted'
      ? [q('Hal', 'The flat on the river, is it?'), t('He already knows the address. Of course he does. It is Helix’s address. It is only mine at night.')]
      : []),
  ],
  card: (s) => [
    p('The Helix–Axiom dinner is on Thursday, and it is black tie, and on Monday there is an envelope on your desk with a black card inside it and no limit printed anywhere on it.'),
    term(s, 'name')
      ? q('Julian’s note', 'For entertaining, and for whatever you’d like to wear to it, if you’d like Helix to. Your term says I have to ask. So: would you? — J.')
      : q('Julian’s note', 'For entertaining, and for what you’ll need to wear to it. Don’t look at the prices. That’s an order, the only one I’ll give you. — J.'),
    t('I know exactly the dress. I saw it in a window on Sloane Street on the way to the Glass House, a lifetime ago, and did the arithmetic, and walked on.'),
  ],
  fixer: (s) => [
    ...(get5(s, 'published')
      ? [
          p('On Wednesday a journalist from the Sunday Courier rings your office, very friendly, to say they are running a follow-up on “the Aster girl” and her new job, and would you like to comment on where the money came from.'),
        ]
      : [
          p('On Wednesday your landlord writes, very sorry, to say he is selling the building, and that you have a month to find somewhere else, in this city, in this market.'),
        ]),
    p('You mention it to Julian in passing, as a joke, and he does not laugh.'),
    q('Julian Mercer', 'I know a man. One call, and it goes away. I’d like to make it, if you’ll let me.'),
  ],
  diary: (s) => [
    p('Marcus wants thirty minutes in Julian’s diary on Friday “about Rotterdam”, and Julian, when you ask, looks at the ceiling for a long time.'),
    q('Julian Mercer', 'I don’t want to give them to him. I always do. You own the diary now. You decide.'),
    p('Marcus comes to your door himself on Thursday afternoon, leans on the frame, and smiles.'),
    q('Marcus Chen', 'Thirty minutes. It’s not much to ask. People who get in the way of thirty minutes don’t tend to last long on this floor. Ask Clare.'),
    ...(term(s, 'door')
      ? [q('You', 'I know. I can leave any time I like, with references. It’s in my contract. Julian read it twice.'), p('For the first time since you have known him, Marcus Chen has nothing to say for almost a second.')]
      : [t('That was a threat, delivered like a weather report. He is very good.')]),
  ],
  paper: () => [
    p('Julian’s board paper is due at nine in the morning, and at eleven at night it is wrong: not badly, but in the way that lets a board ask the one question he cannot answer.'),
    q('Julian Mercer', 'I can see it’s wrong. I can’t see how to make it right. I’ve been looking at it for four hours.'),
    p('You take off your shoes, sit on his sofa with the laptop on your knees, and rewrite it, while he makes tea nobody drinks and reads each page as you finish it, and says “Yes,” very quietly, every time. At four it is the best thing either of you has ever put in front of a board.'),
    q('Julian Mercer', 'Whose name goes on it?'),
  ],
};

type Answer = [id: string, label: string, hint: string, value: string, body: (x: GameState) => Block[]];

function favourAnswers(s: GameState, f: Favour): Answer[] {
  if (f === 'car')
    return [
      ['take', 'Get in. Every late night, for good', 'Hal, the warm car, and home in fifteen minutes.', 'take', () => [
        p('You get in. The seats are warm. There is a bottle of water in the door and a blanket folded on the seat beside you, and you are home in fifteen minutes, and you sleep better than you have in a year.'),
        t('Every late night, for good. I did not even have to ask.'),
      ]],
      ['once', '“Tonight. Not every night.”', 'Take it once, and say so.', 'once', () => [
        q('You', 'Tonight, Hal. Thank you. Not every night.'),
        q('Hal', 'Understood, Ms Vale. I’ll tell him you said so. He’ll like that.'),
      ]],
      ['refuse', 'Thank Hal, and take the night bus', 'Your feet, your fare, your city.', 'refuse', () => [
        p('You thank Hal and mean it, and walk to the night bus in the rain with your shoes in your hand, and sit on the top deck with the city going by, and feel, for no reason you can name, completely happy.'),
      ]],
    ];
  if (f === 'card') {
    const own = cash(s) >= DRESS;
    return [
      ['take', 'Buy the dress on his card', 'Don’t look at the prices. He said so.', 'take', () => [
        p('You buy the dress from the window on Sloane Street, and do not look at the price, and in the mirror in the fitting room you look extraordinary, and you know exactly whose card you look extraordinary on.'),
      ]],
      ...(term(s, 'firewall')
        ? ([['work', '“That’s the firewall.” The card pays for the dinner, not the dress', 'Your term. Your dress.', 'half', (x: GameState) => {
            if (own) setKey(x, 'own.cash', String(cash(x) - DRESS));
            return [
              q('You', 'The card pays for Axiom’s dinner. I’ll pay for my dress. That’s the firewall.'),
              q('Julian Mercer', 'So it is. I wrote it down myself. I’m glad one of us reads it.'),
              ...(own ? [] : [p('You wear the black dress you already own, and have it taken in, and it does the job beautifully.')]),
            ];
          }]] as Answer[])
        : []),
      ['refuse', own ? 'Give the card back, and buy your own' : 'Give the card back, and wear what you own', own ? `It will cost you £${DRESS}.` : 'The black dress, taken in. It will do.', 'refuse', (x) => {
        if (own) setKey(x, 'own.cash', String(cash(x) - DRESS));
        return [
          p('You put the card back in its envelope and the envelope back on his desk.'),
          own
            ? p('You buy a dress on your own account: not the one in the window, but close, and yours, and you walk out of the shop feeling every pound of it.')
            : p('You wear the black dress you already own, and have it taken in, and it does the job beautifully.'),
        ];
      }],
    ];
  }
  if (f === 'fixer') {
    const what = get5(s, 'published') ? 'The Courier drops the story' : 'The landlord finds he is not selling after all';
    return [
      ['take', '“Make the call.”', 'One call, and it goes away.', 'take', () => [
        q('You', 'Make the call.'),
        p(`He makes it in front of you, on speaker, in four sentences, and on Monday it has gone away. ${what}, and nobody ever explains why.`),
        t('One call. That is what he is. That is what I am standing next to.'),
      ]],
      ...(term(s, 'firewall')
        ? ([['advice', 'Take his lawyer’s name, and pay her yourself', 'Advice, at your own expense. The firewall.', 'half', () => [
            q('You', 'Give me your lawyer’s name, and I’ll pay her rate. The firewall.'),
            p('He writes it on a card without a word. She costs you a week’s salary for one letter, and the letter works, and it was yours.'),
          ]]] as Answer[])
        : []),
      ['refuse', '“Thank you. I’ll handle it.”', 'Worse, and slower, and yours.', 'refuse', () => [
        q('You', 'Thank you. No. I’ll handle it.'),
        p('You handle it: worse than he would have, and slower, with three phone calls and a letter you rewrite four times. It works in the end, mostly. It is yours.'),
      ]],
    ];
  }
  if (f === 'diary')
    return [
      ['hold', 'Hold the door', 'Marcus is refused, by you. He will remember.', 'hold', () => [
        q('You', 'Julian’s diary is full on Friday, Mr Chen. I’ll find you thirty minutes the week after next.'),
        p('Marcus looks at you with real interest, as if you were a price that had just moved.'),
        q('Marcus Chen', 'The week after next. Of course.'),
      ]],
      ['sit', 'Give him the time, and sit in', 'Thirty minutes, with you in the room taking notes.', 'sit', () => [
        p('You give Marcus his thirty minutes, and sit in the corner of Julian’s office with a notebook, and write down every word. Marcus speaks to Julian and watches you. Rotterdam, it turns out, is a company Julian nearly bought once, and Marcus would like to buy it now, “with the fund’s help”.'),
      ]],
      ['trade', 'Trade it: thirty minutes for the Rotterdam file, today', 'He gets his time. You see his paper first.', 'trade', () => [
        q('You', 'Thirty minutes on Friday, Mr Chen. And the Rotterdam file on my desk today, so that Julian has read it before you arrive.'),
        p('A long pause. Then Marcus laughs, and the file is on your desk by five, and it is very thin, and very clean, and the financing section says only “to follow”.'),
      ]],
    ];
  return [
    ['his', 'His name', 'It goes in as his. He knows.', 'his', () => [
      q('You', 'Yours. It’s your paper.'),
      q('Julian Mercer', 'It’s not, and we both know it. Thank you. I won’t forget which of us wrote it.'),
    ]],
    ['ours', '“Ours.” A footnote: with E. Vale', 'The board sees your name once, small.', 'ours', () => [
      q('You', 'Yours, with a footnote. “With E. Vale.”'),
      p('The board reads the footnote. Two of them ask Julian who E. Vale is. He tells them, at some length.'),
    ]],
    ['mine', '“Mine.”', 'It goes in under your name, and the board meets you.', 'mine', () => [
      q('You', 'Mine.'),
      q('Julian Mercer', 'Good. Then you present it.'),
      p('At nine you present it, to eleven people who have never heard of you, and at twenty past nine they have.'),
    ]],
  ];
}

const HIS: Favour[] = ['car', 'card', 'fixer'];
const favourLabel: Record<Favour, [string, string]> = {
  car: ['The car', 'After midnight, Hal at the kerb.'],
  card: ['The card', 'Something to wear to the Axiom dinner.'],
  fixer: ['The fixer', 'One call, and your problem goes away.'],
  diary: ['The diary', 'Marcus wants thirty minutes. You decide.'],
  paper: ['The paper', 'His board paper, wrong at eleven at night.'],
};

function favourChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'x-open') as Favour | undefined;
  if (!open)
    return FAVOURS.filter((f) => !key(s, 'exec.fav.' + f)).map((f) =>
      offer('x8-fav-' + f, favourLabel[f][0], favourLabel[f][1], 'favours', (x) => {
        set8(x, 'x-open', f);
        return favourIntro[f](x);
      }),
    );
  const n = weeks(s) + 1;
  return favourAnswers(s, open).map(([id, label, hint, value, body]) =>
    offer(`x8-${open}-${id}`, label, hint, n >= 3 ? 'dinner' : 'favours', (x) => {
      delete x.choices['c8.x-open'];
      set8(x, 'x-weeks', String(n));
      setKey(x, 'exec.fav.' + open, value);
      if (HIS.includes(open) && value === 'take') bump(x, 'exec.kept');
      if (!HIS.includes(open)) bump(x, 'exec.trust');
      return n < 3 ? [...body(x), ...weekLead(n)] : body(x);
    }),
  );
}

const favoursBlocks = (s: GameState): Block[] => weekLead(weeks(s));
function weekLead(n: number): Block[] {
  return [
    p(
      n === 0
        ? 'The first week. Everything is new, and he makes all of it easy.'
        : n === 1
          ? 'The second week. You have stopped being new. He has not stopped making things easy.'
          : 'The third week. The Axiom dinner is on Thursday. You catch yourself, some mornings, not remembering what it was like before.',
    ),
  ];
}

// ── The dinner ──

function dinnerBlocks(s: GameState): Block[] {
  const m = key(s, 'exec.marcus');
  return [
    p('Thursday. A private room above a restaurant Helix half owns, one long table, white cloth, candles, eight from Helix and six from Axiom. Julian at the head, easy, generous, remembering everybody’s children. Marcus takes the chair beside yours before the place cards can stop him.'),
    q('Marcus Chen', m === 'answer' ? 'I read your contract, you know. The one you picked. Lovely terms. Very tidy.' : m === 'ask' ? 'Still asking about the others? You’re sitting in one of their chairs.' : 'That smile again. I’ve been looking forward to it all week.'),
    p('And across the table, in charcoal, with her hair a little shorter than at the Glass House, Sloane.'),
    ...(term(s, 'veto')
      ? [
          p('Your term means nobody introduces you to Axiom without your say, and you have said nothing, so when the introductions go round the table they go round you, and Sloane has to do it herself. She visibly dislikes it.'),
          q('Sloane', 'We haven’t been introduced. Sloane. Axiom.'),
        ]
      : [p('Julian introduces you to the Axiom side, one by one, with real pride, and Sloane shakes your hand across the candles as if she had never seen it before.')]),
    q('Sloane', 'Chief of staff. Mr Mercer always did like people who used to be somebody else.'),
  ];
}

function dinnerChoices(s: GameState): C8Choice[] {
  if (get8(s, 'x-cloak') === 'open')
    return [
      offer('x8-cloak-take', 'Take it, and owe her', 'The fund’s name tonight. A debt to Sloane.', 'tray', (x) => {
        set8(x, 'x-cloak', 'took');
        setKey(x, 'exec.owes-sloane');
        return [
          q('Sloane', 'Helix’s money isn’t Helix’s. Every deal Marcus Chen has done for six years is part-financed by the same people. L.S.F. Advisory. Read the small print on the next one. Page thirty-something. You’ll know it when you see it.'),
          q('Sloane', 'And now you owe me. I’ll let you know what.'),
          p('She takes her coat and goes. You stand among the coats for a minute longer than you need to, holding a name.'),
        ];
      }),
      offer('x8-cloak-walk', 'Walk away', 'You owe enough people already.', 'tray', (x) => {
        set8(x, 'x-cloak', 'walked');
        return [q('You', 'I’ll find it myself.'), q('Sloane', 'I expect you will. That was always the trouble with you.'), p('You leave her among the coats.')];
      }),
    ];
  const d = (id: string, label: string, hint: string, next: string, body: Block[], after?: (x: GameState) => void) =>
    offer('x8-sloane-' + id, label, hint, next, (x) => {
      setKey(x, 'exec.sloane8', id);
      after?.(x);
      return body;
    });
  return [
    d('cold', '“We’ve met.”', 'Nothing more.', 'tray', [q('You', 'We’ve met.'), p('Sloane is amused, and then, for the rest of the evening, careful. You watch her be careful, and enjoy it more than you should.')]),
    d('civil', 'Perfect manners, all evening', 'Hold the room. Make her watch you hold it.', 'tray', [
      p('You are flawless all evening: the right question to the right Axiom director, the right laugh at Marcus’s story, the right silence when Julian speaks. In the cloakroom afterwards Sloane is putting on her coat beside you.'),
      q('Sloane', 'You’ve learned to hold a room. I wonder who taught you.'),
    ]),
    d('deal', 'Follow her to the cloakroom', 'She has something to say. It will cost.', 'dinner', [
      p('At half past ten Sloane gets up, and on the way past your chair touches the back of it, once. You give it a minute, and follow.'),
      q('Sloane', 'I can tell you something about Helix’s money that Mr Mercer doesn’t know. And then you’ll owe me. That’s the whole offer.'),
    ], (x) => set8(x, 'x-cloak', 'open')),
  ];
}

// ── The tray ──

function trayBlocks(s: GameState): Block[] {
  return [
    p('Twenty to midnight. The floor is dark but for his office, and his office is empty: he went home at ten, and asked you to go too. On his clear desk, the tray for the morning, the way it is every night. Marcus puts it there at six. Julian signs it at eight. Marcus collects it at nine.'),
    p('On top, a financing facility from Morel & Cie of Geneva, for Rotterdam, sixty pages, flagged for signature on the last.'),
    ...(term(s, 'files')
      ? [p('Your term says you read everything he signs, so you sit down in his chair and read it: all of it, the way Adrian would have, the boring parts slowest.')]
      : [
          p('You have no right to read it. You saw the tab this afternoon, as he initialled the Rotterdam term sheet without turning the pages: L.S.F. Now you sit down in his chair and read it anyway, with the door open, listening for the lift.'),
        ]),
    p('Page thirty-one. Clause 14.3, in the smallest type in the document. If the financed acquisition fails, L.S.F. Advisory takes first claim on the assets of Helix itself.'),
    ...(get8(s, 'x-cloak') === 'took' ? [t('Page thirty-something. You’ll know it when you see it. Sloane knew. Sloane has known for a long time.')] : []),
    t('Not Rotterdam’s assets. Helix’s. Every deal Marcus brings him, Julian signs away the building we are sitting in, as a guarantee, to a fund nobody here has ever met. And he doesn’t read it. He told me so himself.'),
  ];
}

function trayChoices(): C8Choice[] {
  const f = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('x8-file-' + id, label, hint, 'late', (x) => {
      setKey(x, 'exec.file', value);
      note(x, 'x-file', 'Clause 14.3 of Morel & Cie’s financing facilities gives L.S.F. Advisory first claim on Helix’s own assets if a financed deal fails. Julian Mercer signs them as Group COO; Marcus Chen negotiates them.', 'The Rotterdam facility, page thirty-one, on Julian Mercer’s signature tray');
      after?.(x);
      return body;
    });
  return [
    f('tell', 'Call him now', 'Wake him. Read it to him.', 'told', [
      p('He answers on the second ring, awake at once. You read him clause 14.3, slowly, twice. There is a very long silence on the line.'),
      q('Julian Mercer', 'I’ve signed this clause eleven times.'),
      q('Julian Mercer', 'Leave it on the desk. I’m not signing the twelfth. Thank you. Go home, please. I’d like to be frightened on my own for an hour.'),
      p('In the morning the Rotterdam facility is still on the tray, unsigned, with a note in his hand on top: “Not until I understand it. — J.” At nine Marcus comes to collect it, and reads the note, and looks through the glass at you for a long time.'),
    ], (x) => bump(x, 'exec.trust')),
    f('keep', 'Copy page thirty-one, and say nothing yet', 'Know whose fund it is before you hand him something that could sink him.', 'kept', [
      p('You photograph page thirty-one, and the signature page, and the schedule, and put the facility back on the tray exactly square, the way you found it.'),
      t('Not a secret. A card, held. When I know whose money this is, I will tell him everything, and he will have somewhere to stand.'),
      p('At eight he signs it without turning the pages. At nine Marcus collects it, and asks you pleasantly in the corridor, “Did he read it?”, and you say “He never does,” and hate how easily it comes.'),
    ]),
    f('pull', 'Take it off the tray', 'Into your own drawer. Let Marcus come looking.', 'pulled', [
      p('You take the facility off the tray and lock it in your own desk drawer, and go home, and sleep better than you expected.'),
      p('At nine Marcus comes for the tray, and finds it one file short, and stands in your doorway for a long time with his hands in his pockets.'),
      q('Marcus Chen', 'Something’s missing from Julian’s tray.'),
      q('You', 'Is it? You should ask him.'),
      p('He smiles. It is the first time he has smiled at you without meaning anything nice by it at all. Julian never knows the file was there.'),
    ], (x) => setKey(x, 'exec.marcus8', 'open')),
  ];
}

// ── Late ──

const nightOk = (s: GameState) => key(s, 'c6.friction-julian') === 'warmed' || !!key(s, 'c7.x-evening-outcome')?.startsWith('intimate');
const scopeReply: Record<'no-sex' | 'sex', string> = {
  'no-sex': 'Then that’s the evening. You set the edge. I’ll stay on my side of it and be glad of it.',
  sex: 'Yes. And you say stop, it stops. The same for me. That hasn’t changed and it won’t.',
};

function lateInvite(s: GameState): Block[] {
  const file = key(s, 'exec.file');
  return [
    p('The next night, at nine, a message from Julian: “Come up, if you’d like to. I’ll cook badly.”'),
    p('He does: the forty-first floor, the city laid out below, his cuffs undone, the second attempt edible.'),
    ...(file === 'told'
      ? [q('Julian Mercer', 'I’ve been frightened all day. I find I don’t mind it as much with you in the room. Tell me what you want tonight, and that’s what happens.')]
      : file === 'kept'
        ? [
            q('Julian Mercer', 'Tell me what you want tonight, and that’s what happens.'),
            t('Page thirty-one is in my phone, in my bag, on his sofa. I am going to carry it into whatever this is. I know that. I am choosing it anyway.'),
          ]
        : [q('Julian Mercer', 'Marcus was in a strange mood today. I don’t care. Tell me what you want tonight, and that’s what happens.')]),
  ];
}

function lateChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'x-late-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x8-julian-' + id, label, hint, 'late', (x) => {
        set8(x, 'x-late-open', 'julian-room');
        set8(x, 'x-late-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x8-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c8.x-late-open'];
        set8(x, 'x-late-outcome', 'declined');
        return [p('You say goodnight at his door, and he says goodnight back, and means it exactly as much as you do.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get8(s, 'x-late-scope') as 'no-sex' | 'sex';
    return [
      offer('x8-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c8.x-late-open'];
        set8(x, 'x-late-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and calls Hal, and walks you down.')];
      }),
      offer('x8-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c8.x-late-open'];
        set8(x, 'x-late-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [
              p('Three weeks of Ms Vale in corridors come undone with the dress. He is slower than you expect and surer than you expect, and asks once more, his mouth at your ear, and you answer by pulling him down.'),
              p('What happens next stays on the forty-first floor. The scene fades.'),
            ]
          : [p('He kisses you by the glass for a very long time, and stops exactly where you said, and you fall asleep on his sofa with your head on his chest and the city still on, and he does not move until morning.')];
      }),
    ];
  }
  return [
    offer('x8-late-julian', 'Go up to forty-one', nightOk(s) ? 'He asked. He meant more, and you both know it.' : 'Dinner. You set the line.', 'late', (x) => {
      set8(x, 'x-late', 'julian');
      set8(x, 'x-late-open', 'julian');
      return lateInvite(x);
    }),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          offer('x8-late-maya', 'Go to Maya’s', 'She asked you a question three weeks ago.', 'complete', (x) => {
            set8(x, 'x-late', 'maya');
            return [
              p('Maya’s kitchen, the cat, the cheap good wine.'),
              q('Maya', 'Well? Good, or clever?'),
              q('You', 'Good. It’s the rest of the building that’s clever.'),
              q('Maya', 'That’s worse, you know. Clever men can look after themselves.'),
            ];
          }),
        ]
      : []),
    offer('x8-late-alone', 'Stay in with the ledger', 'Chapter 8 ends here.', 'complete', (x) => {
      set8(x, 'x-late', 'alone');
      return [
        p(
          key(x, 'exec.flat') === 'accepted'
            ? 'The flat on the river, the lights off, the city below like an open drawer, and a notebook on your knee.'
            : 'Your own kitchen table, your own kettle, and a notebook open at a clean page.',
        ),
        p('You write two columns. What he gave. What I paid for. You are surprised by which is longer, and then not surprised at all.'),
      ];
    }),
  ];
}

// ── The second card ──

const ledgerLine: Record<Favour, Record<string, string>> = {
  car: { take: 'HAL, EVERY NIGHT', once: 'HAL, ONCE', refuse: 'THE NIGHT BUS' },
  card: { take: 'THE DRESS, ON HIS CARD', half: 'THE DRESS, MINE', refuse: 'THE DRESS, MINE' },
  fixer: { take: 'ONE CALL', half: 'HIS LAWYER, MY FEE', refuse: 'MY OWN PROBLEM' },
  diary: { hold: 'I HELD HIS DOOR', sit: 'I SAT IN', trade: 'ROTTERDAM, EARLY' },
  paper: { his: 'HIS PAPER', ours: 'OUR PAPER', mine: 'MY PAPER' },
};

function completeBlocks(s: GameState): Block[] {
  const flat = key(s, 'exec.flat');
  const lines = [
    flat === 'accepted' ? 'HIS FLAT' : flat === 'paid' ? 'MY RENT' : 'MY OWN FLAT',
    ...FAVOURS.filter((f) => key(s, 'exec.fav.' + f)).map((f) => ledgerLine[f][key(s, 'exec.fav.' + f)!]),
  ];
  const kept = Number(key(s, 'exec.kept') ?? 0) + (flat === 'accepted' ? 1 : 0);
  return [
    ...(get8(s, 'x-late-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and stand at the wardrobe in yesterday’s dress.')] : []),
    p('The wardrobe door. Under JULIAN MERCER and the question in pencil, a second card, in two columns, in your own hand:'),
    q('The card', lines.join('. ') + '.'),
    t(
      kept >= 3
        ? 'Most of the left-hand column is his. I chose every line of it with my eyes open, and I would choose most of it again. I just want to know that I could stop.'
        : kept === 0
          ? 'I owe him nothing. I paid for all of it. I am not sure yet whether that is freedom or just a very expensive way of keeping him at arm’s length.'
          : 'Some of it is his and some of it is mine. That seems honest. It seems like a life.',
    ),
    p('And above them both, at the top of the door, a card you write last and press flat with your thumb:'),
    q('The card', 'L.S.F. ADVISORY. 14.3. WHOSE MONEY?'),
    ...(key(s, 'exec.owes-sloane') ? [p('Beside it, smaller, a third: SLOANE. I OWE HER ONE.')] : []),
    ...(get8(s, 'x-light') === 'on' ? [p('At the office, the light next door to his is still on. Now you know whose it is. It is yours.')] : []),
  ];
}

export function executiveBlocks8(s: GameState): Block[] {
  if (s.phase === 'orbit') return orbitBlocks(s);
  if (s.phase === 'favours') return favoursBlocks(s);
  if (s.phase === 'dinner') return dinnerBlocks(s);
  if (s.phase === 'tray') return trayBlocks(s);
  if (s.phase === 'late') return [p('The day after the tray. By seven the floor is empty, and your light is the last one on forty-one but his.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices8(s: GameState): C8Choice[] {
  if (s.phase === 'orbit') return orbitChoices();
  if (s.phase === 'favours') return favourChoices(s);
  if (s.phase === 'dinner') return dinnerChoices(s);
  if (s.phase === 'tray') return trayChoices();
  if (s.phase === 'late') return lateChoices(s);
  return [];
}
