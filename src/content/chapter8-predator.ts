/** Chapter 8 (Predator route, lane id `predator`) · The Floor:
 * weeks → hub (two of four levers) → friday → julian → evening → complete.
 * Design: docs/story/PREDATOR_CHAPTER_8_THE_FLOOR_DESIGN.md (owner-approved 2026-09-27, all seven decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_8_SCRIPT.md. Entered from a Predator `chapter7.complete`;
 * hands on to the shared Chapter 9 bridge. Three weeks inside Helix played as a hub: two of four levers (Hollis's ink,
 * the general counsel, the archive, the press), each use / hold / spare, with a real person on the other end; the
 * archive is free with the Ch7 access clause; the second pull is noticed (only by Marcus with the report clause).
 * Friday drinks with Marcus ("So. What have you found?"); Julian's Ch7 stance comes due; a chosen evening (heat 3,
 * consent-gated, fades); the first Meridian name, L.S.F. Advisory (the Laurent Sovereign Fund), on every path. The
 * counsel's secret is an affair: using it is non-sexual blackmail and hurts innocent people, and sparing her is written
 * as the stronger move. Local helpers mirror chapter8.ts (c8.* keys, chapter8.* ids) to avoid a circular import. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

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

export const PREDATOR_PHASES8 = ['weeks', 'hub', 'friday', 'julian', 'evening'] as const;
export const isPredator8 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase8 = (s: GameState) => isPredator8(s) && ((PREDATOR_PHASES8 as readonly string[]).includes(s.phase) || s.phase === 'complete');
const clause = (s: GameState, id: string) => !!key(s, 'pred.clause.' + id);

type Lever = 'hollis' | 'counsel' | 'archive' | 'press';
type Deal = 'use' | 'hold' | 'spare';
const pulls = (s: GameState) => Number(get8(s, 'p-pulls') ?? 0);
const done = (s: GameState, l: Lever) => !!key(s, 'pred.lever8.' + l);

export function placePredator8(s: GameState): string | undefined {
  const open = get8(s, 'p-open');
  if (s.phase === 'hub' && open)
    return {
      hollis: 'Day 11 · Hollis’s office, the thirty-eighth floor',
      counsel: 'Day 13 · 21:10 · The Helix garage, level B2',
      archive: 'Day 15 · The records vault, sub-basement',
      press: 'Day 17 · Communications, the thirty-fifth floor',
    }[open];
  const evening = get8(s, 'p-evening-open');
  if (s.phase === 'evening' && evening) return evening.startsWith('marcus') ? 'Late · Marcus’s apartment, above the river' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The ten days ──

function weeksBlocks(s: GameState): Block[] {
  const want = key(s, 'pred.want');
  return [
    p('The first ten days you learn the floor the way Adrian learned a set of accounts: slowly, then all at once.'),
    p('The same six people in the 7:40 lift, every morning, in the same order, and the one who always holds the door is the one nobody listens to in meetings. Which calls go unanswered, and from whom. Which assistant knows everything and has never once been asked. That the CFO eats lunch at his desk and the general counsel never eats at all. That Anthony Hollis laughs a beat too late at Marcus’s jokes, every time, like a man counting.'),
    p('In the garage on the third morning, Mr Pryce is polishing the long black car beside the lift doors, and nods to you over its roof, one professional to another. He is driving Marcus now. He was driving you a week ago. He does not seem to see any difference.'),
    t(
      want === 'desk'
        ? 'His desk. Two floors up, a corner of glass, and a man who has not stopped smiling at me since I asked for it. Every name I learn is a step on the stairs.'
        : want === 'title'
          ? 'My name is on my door. It took him four hours. I want to know what else he can do in four hours, and to whom.'
          : 'The money arrives on the twenty-fifth. I checked twice. It is the first time since the clinic that I have not done the arithmetic before I bought a coffee.',
    ),
    p('By the tenth day you have a page in the back of your notebook headed OWES, in capitals, and four names on it with a question mark after each. The floor has started to go a little quieter when you walk across it. You like that more than you should.'),
    t('Two of them, before somebody notices me pulling. Choose well.'),
  ];
}

// ── The hub: the levers ──

const scenes: Record<Lever, (s: GameState) => Block[]> = {
  hollis: (s) => [
    p(
      key(s, 'pred.hollis') === 'warned'
        ? 'Hollis has been avoiding you for a week. You catch him in his own doorway at seven in the evening, when the floor is empty, and he goes the colour of his regimental tie.'
        : key(s, 'pred.hollis') === 'charmed'
          ? 'Hollis asks you to lunch on the eleventh day, to tell you more about the boat. You let him, and then you ask him about the ink, very gently, over the coffee, as if it were the boat.'
          : 'Hollis has no idea who you are. You knock on his door at seven with two coffees, the way Maya used to knock on Adrian’s, and sit down before he has decided whether to ask you to.',
    ),
    q('Anthony Hollis', 'It was a seat. That’s all. On the buyer’s board, after the deal. Marcus said the paperwork would be quicker if I signed first and the compliance people caught up. He put it in writing. He puts everything in writing.'),
    p('He shows you, because he has been waiting nine years for somebody to show it to: a letter, two paragraphs, promising a directorship, signed M. Chen. The letterhead is not Helix’s. It is cream, heavy, and very simple: L.S.F. ADVISORY, and under it, smaller, a London address and the words a Laurent Sovereign Fund company.'),
    q('Anthony Hollis', 'The seat never came. I have a wife who thinks I’m going to retire next year, and a pension that says I can. If this comes out, neither of those is true.'),
    t('A signature in the wrong ink, a promise on a fund’s paper, and a man who has been frightened for nine years. He is not a villain. He is a lever. The difference is going to be up to me.'),
  ],
  counsel: () => [
    p('You find it by accident, the way the best ones are found. Level B2 of the Helix garage, ten past nine at night, your own car keys in your hand, and two people standing between two pillars who should not be standing that close: Ines Varga, the general counsel, who never eats, and Robert Lyle, the chief financial officer, who eats at his desk. His hand is on the back of her neck. Hers is flat on his chest, not pushing.'),
    p('They do not see you. Mr Pryce, sitting in the long black car at the end of the row with the engine off, does. He looks at you in his mirror for a long moment, and then down at his newspaper, and turns a page.'),
    p('In the morning you look it up the way Adrian would have: the calendars. Two years of the same Tuesday, blocked out on both of theirs as “external”. Three people on the floor know. Now four.'),
    p('Ines Varga has two children and a husband who teaches music. You have seen his photograph on her desk: a kind face, a piano, a cardigan.'),
    t('Legal would do anything I asked, for the rest of my time here. And a man in a cardigan would find out why, one day, the way people always do. That is the price, and it is not mine to pay.'),
  ],
  archive: (s) => [
    p(
      clause(s, 'access')
        ? 'Your clause gets you into the records vault without anybody asking why. The archivist reads it off her screen, raises her eyebrows at “for context”, and gives you a key card and a chair.'
        : 'Without the clause, getting into the records vault costs you a favour and a lie, and the archivist writes your name down in a book, in ink, which you do not like at all.',
    ),
    p('The Novagen file from the inside: the acquisition, the diligence, the payments. And in the payments, a line that should not be there. Harland Strategic Ltd, “consulting”, a monthly retainer, for the eleven months before the Glass House, stopping the week after.'),
    p('Harland Strategic is registered to a Graham Harland at an address in Surrey. You look him up. He is Elias Benton’s brother-in-law. He sells garden furniture. He has never consulted for anybody in his life.'),
    p('And under the Novagen money, in the financing schedule, the name again: L.S.F. Advisory. Not one deal. Every one of Marcus’s acquisitions for six years, part-financed by the same fund, on the same cream paper.'),
    t('The wafer at the Glass House, paid for monthly, through a man who sells garden benches. Benton, owned. And the money behind all of it is somebody else’s. Whose?'),
  ],
  press: (s) => [
    p('Dominic Ashe, the communications director, has a mood board on his wall, and you are in the middle of it: the Aster photograph, cut out and pinned, and under it, in marker, THE NEW HELIX?'),
    q('Dominic Ashe', 'Marcus’s idea. The annual report, the website, the lot. A face people already trust. You didn’t know? He said you’d be thrilled.'),
    t(
      clause(s, 'private')
        ? 'My face is my own. It says so, in my handwriting, in a contract he signed. He knows it does. He wanted to see whether I would read my own clause out loud.'
        : 'He did not ask. He did not need to ask. I did not write it down, so he did not have to.',
    ),
  ],
};

const deals: Record<Lever, Record<Deal, [string, string, (s: GameState) => Block[]]>> = {
  hollis: {
    use: ['Make him yours', 'His vote, his files. His wife and his pension are what he is afraid of.', () => [
      q('You', 'Nobody needs to see the letter, Anthony. I would just like to know that when I need a vote, or a file, I can come to you first.'),
      p('He looks at you for a long time. Then he nods, once, the way a man signs a document he has not read because he already knows what it says.'),
      t('That was easy. It should not have been that easy. I will remember his face while he nodded.'),
    ]],
    hold: ['Keep it, and say nothing', 'He will know you know. That is enough, for now.', () => [
      p('You thank him for his honesty, and take nothing, and leave him with the letter and the knowledge that you have read it. It sits between you in every meeting from then on, like a third person at the table.'),
    ]],
    spare: ['Give him the letter back, and advice', '“Burn it. And retire next year.”', () => [
      q('You', 'Burn it, Anthony. Tonight. And retire next year, like your wife thinks you will.'),
      p('He stares at you. Then, for the first time since you met him, he laughs at exactly the right moment.'),
      q('Anthony Hollis', 'You’re a very strange person to have working for Marcus.'),
    ]],
  },
  counsel: {
    use: ['Tell her what you saw, and what you would like', 'Legal, on your side, for the rest of your time here.', () => [
      p('You ask Ines Varga for ten minutes, and close her door, and tell her about level B2 in a level voice, and then about the kind of help you might need from Legal from time to time.'),
      p('She does not cry. She does not argue. She writes something on a pad, tears the sheet off, folds it, and puts it in her pocket. Then she says “Of course” in a voice with nothing left in it at all.'),
      t('It worked. It will go on working. And somewhere a man in a cardigan is teaching a child to play the piano, and has no idea I have just made him a lever too.'),
    ]],
    hold: ['Say nothing to anyone', 'It sits in your ledger. It will not stay quiet forever.', () => [
      p('You say nothing. You write two initials and a Tuesday in the back of the notebook, and look at them for a long time, and close it.'),
    ]],
    spare: ['Tell her you know, and that you will never use it', 'The strongest move on the board.', () => [
      p('You ask Ines Varga for ten minutes, and close her door, and tell her about level B2, and before her face can finish changing, you tell her the rest.'),
      q('You', 'I will never use it. I will never tell anyone. I wanted you to know that someone knows, and that it is safe with them.'),
      p('She looks at you for a long time. Then she puts both hands flat on the desk, the way people do when the floor has moved, and breathes out.'),
      q('Ines Varga', 'Nobody in this building has ever done anything for me without sending the bill. If you ever need Legal, you will not have to ask twice. And not because you could make me.'),
      t('That is worth more than the threat would have been, and it will last longer. Adrian would never have understood that. I think Evelyn did.'),
    ]],
  },
  archive: {
    use: ['Let Benton know what you have', 'Benton, owned. Axiom’s director, with him.', () => [
      p('You send Elias Benton a single line from a new address: the words Harland Strategic, and a date. Nothing else.'),
      p('He rings you within four minutes, from a number you do not have. You let it ring out. He rings again. You answer on the third call and say nothing, and listen to him breathe.'),
      q('Elias Benton', 'What do you want?'),
      t('Everybody asks me that now. It is the most beautiful question in the world. And Graham Harland, who sells garden benches, is about to find out what his brother-in-law did with his name.'),
    ]],
    hold: ['Copy it, and keep it', 'The file, the line, the fund. In the lining of the old jacket.', () => [
      p('You copy every page, the payments, the schedule, the cream paper, and put the copies in the lining of Adrian’s old jacket, where they have always gone.'),
    ]],
    spare: ['Leave Benton to Sloane', 'He is Axiom’s problem. You have a bigger one.', () => [
      p('You copy the fund’s schedule and leave Benton’s line alone. He is Axiom’s rot, and Sloane’s to cut out. The cream paper is yours.'),
      t('Let him sleep. The thing I want is not in Surrey. It is on that letterhead.'),
    ]],
  },
  press: {
    use: ['Let it run, on your terms', 'Your face, and your price.', (s) => [
      q('You', 'Run it. My words under it, my photograph, my approval on every use, and a fee that makes your finance director cry.'),
      q('Dominic Ashe', 'Marcus said you’d say that. He said to say yes to anything.'),
      t(clause(s, 'private') ? 'My face, on his building, on my terms. He thinks it makes me his. It makes his building mine.' : 'My face, on his building. I set the price. He did not ask first. I will make him pay for that later.'),
    ]],
    hold: ['Take it off his wall, politely', 'Not yet. Maybe not ever.', () => [
      p('You unpin the photograph from Dominic Ashe’s wall, very politely, and fold it, and put it in your bag.'),
      q('You', 'Not yet. I’ll let Marcus know when.'),
    ]],
    spare: ['Tell Ashe it was never going to happen', 'And tell Marcus you know.', () => [
      p('You tell Dominic Ashe, kindly, that it was never going to happen, and that it is not his fault, and then you go up two floors and put the photograph on Marcus’s empty desk, face up, where he will find it in the morning.'),
    ]],
  },
};
const leverLabels: Record<Lever, [string, string]> = {
  hollis: ['Hollis’s ink', 'Why a careful man signed early.'],
  counsel: ['The general counsel', 'What you saw in the garage.'],
  archive: ['The archive', 'The Novagen money, from the inside.'],
  press: ['The press', 'What Marcus plans to do with your face.'],
};
const facts: Partial<Record<Lever, [string, string, string]>> = {
  hollis: ['p8-hollis', 'Anthony Hollis countersigned Novagen early on Marcus Chen’s written promise of a buyer’s-board seat, on L.S.F. Advisory letterhead (a Laurent Sovereign Fund company).', 'Hollis’s letter, shown to Evelynn'],
  counsel: ['p8-counsel', 'The Helix general counsel, Ines Varga, and the CFO, Robert Lyle, are having an affair: two years of the same Tuesday. Three people on the floor knew before Evelynn.', 'Evelynn, level B2 of the Helix garage, and their calendars'],
  archive: ['p8-archive', 'Helix paid Harland Strategic Ltd, registered to Elias Benton’s brother-in-law, a monthly “consulting” retainer for the eleven months before the Glass House. Every Marcus Chen acquisition for six years was part-financed by L.S.F. Advisory, a Laurent Sovereign Fund company.', 'The Novagen payment and financing schedules, Helix records vault'],
  press: ['p8-press', 'Marcus Chen planned to make Evelynn’s Aster photograph “the new Helix” in the annual report without asking her.', 'Dominic Ashe’s mood board, Communications'],
};

const clockLines = (s: GameState): Block[] =>
  clause(s, 'report')
    ? [p('The next morning Marcus stops at your door on his way past, and does not come in, and says only: “Two in a fortnight. Most people take a year.” Nobody else on the floor seems to have noticed anything. Your clause is working.')]
    : [
        p('The next morning an email arrives from the chair of the board’s audit committee, copied to nobody, asking whether you might share your calendar for the last three weeks, “to help with onboarding”.'),
        t('Somebody noticed me pulling. Two levers, and the floor has started watching the watcher. Good. Now I know who else is on the stairs.'),
      ];

function hubChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'p-open') as Lever | undefined;
  if (open) {
    const free = open === 'archive' && clause(s, 'access');
    const counted = pulls(s) + (free ? 0 : 1);
    return (['use', 'hold', 'spare'] as Deal[]).map((deal) => {
      const [label, hint, body] = deals[open][deal];
      return offer(`${open}-${deal}`, label, hint, counted >= 2 ? 'friday' : 'hub', (x) => {
        delete x.choices['c8.p-open'];
        setKey(x, 'pred.lever8.' + open, deal);
        set8(x, 'p-pulls', String(counted));
        if (open === 'hollis' && deal === 'use') setKey(x, 'pred.hollis', 'owned');
        if (open === 'archive' || open === 'hollis') setKey(x, 'pred.lsf', 'wire');
        return [...body(x), ...(counted >= 2 ? clockLines(x) : [])];
      });
    });
  }
  const levers = (['hollis', 'counsel', 'archive', 'press'] as Lever[]).filter((l) => !done(s, l) && (l !== 'press' || !!get5(s, 'published')));
  return [
    ...levers.map((l) =>
      offer('pull-' + l, leverLabels[l][0], l === 'archive' && clause(s, 'access') ? leverLabels[l][1] + ' Your access clause makes it free.' : leverLabels[l][1], 'hub', (x) => {
        set8(x, 'p-open', l);
        const f = facts[l];
        const body = scenes[l](x);
        if (f) note(x, f[0], f[1], f[2]);
        return body;
      }),
    ),
    ...(pulls(s) >= 1
      ? [
          offer('hub-stop', 'Leave the rest alone', 'One lever is enough for three weeks. Friday is coming.', 'friday', () => [
            p('You leave the rest alone. One lever in three weeks is patience, not weakness. The page headed OWES still has names on it with question marks after them. They will keep.'),
          ]),
        ]
      : []),
  ];
}

// ── Friday drinks ──

function fridayBlocks(s: GameState): Block[] {
  return [
    p('Friday at seven Marcus takes you up to the bar at the top of the building, which is not on any floor plan and has one barman, eleven stools, and the whole city on three sides. He orders two whiskies without asking what you drink, and gets it right.'),
    p('He sits with his back to the view, which is a thing you have noticed powerful men do, and looks at you over the glass for a long moment, the way he looked at you at the Glass House, and in his office, and every morning since across the floor.'),
    q('Marcus Chen', 'Three weeks. Half the floor has started lowering its voice when you walk past. Hollis has aged a year. Legal is being unusually helpful to everybody. I’ve been having a wonderful time watching.'),
    q('Marcus Chen', 'So. What have you found?'),
    ...(key(s, 'pred.lsf') ? [] : [t('I have not found the money yet. I have a feeling he is about to tell me where it is, because he cannot help himself.')]),
  ];
}

function fridayChoices(s: GameState): C8Choice[] {
  const f = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('friday-' + id, label, hint, 'julian', (x) => {
      set8(x, 'p-friday', id);
      setKey(x, 'pred.friday', id);
      const out = body(x);
      if (!key(x, 'pred.lsf')) {
        setKey(x, 'pred.lsf', 'boast');
        out.push(
          q('Marcus Chen', 'I’ll tell you something for nothing, since you’re so good. Every deal I have ever done, somebody else paid half. A fund. L.S.F. Advisory. Cream paper, very old money, a woman in London who likes to own things quietly. When you want to know who really runs Helix, don’t look at my desk. Look at their letterhead.'),
          t('L.S.F. He said it to show off. He has just given me the first name that is bigger than he is.'),
        );
      }
      return out;
    });
  return [
    f('tell', 'Tell him the truth', 'What you found, and what you kept. He will love it. He will keep a copy.', () => [
      p('You tell him. All of it: what you found, whom you found it on, what you did with each. He listens without interrupting, turning the glass, and at the end he laughs, low and delighted, and a little frightened, which he hides almost well enough.'),
      q('Marcus Chen', 'I hired the right woman. God help me. I hired exactly the right woman.'),
      t('He will write it all down tonight. So will I.'),
    ]),
    f('lie', '“Nothing much yet.”', 'He will know you are lying, and respect it.', () => [
      q('You', 'Nothing much yet. I’m still learning the lifts.'),
      p('He looks at you over his glass for a long, long moment, and smiles the smile that arrives after his eyes.'),
      q('Marcus Chen', 'Of course you are.'),
    ]),
    f('trade', 'Offer a trade', 'One of yours for one of his.', () => [
      q('You', 'I’ll give you one of mine if you give me one of yours.'),
      p('He puts the glass down. Nobody has offered Marcus Chen a trade in his own bar before. You can see him deciding how much it will cost him to enjoy it.'),
      q('Marcus Chen', 'Go on, then.'),
      p('You give him the smallest one, well-wrapped, so that it looks larger than it is. He gives you, in return, a name and a number: L.S.F. Advisory, and the size of the fund behind it, which is a figure so large you have to ask him to say it twice.'),
      t('He thinks he got the better of that. He always will, right up until the morning he doesn’t.'),
    ]),
    ...(clause(s, 'exit')
      ? [
          f('walk', 'Remind him you can walk', 'Ninety days’ pay, whenever you like. Your words.', () => [
            q('You', 'I found enough to know I could walk out of here on Monday with ninety days’ pay and no questions, Marcus. Your signature. My words. I just wanted you to remember that, while you were having a wonderful time watching.'),
            p('For a second the bar is very quiet. Then he raises his glass to you, slowly, the way you would salute somebody across a battlefield.'),
            q('Marcus Chen', 'Noted. Stay, would you? I’d miss the view.'),
          ]),
        ]
      : []),
  ];
}

// ── Julian ──

function julianBlocks(s: GameState): Block[] {
  const stance = key(s, 'pred.julian');
  return [
    p('On Monday Julian Mercer is waiting by the lifts on the thirty-sixth floor, which is not his floor.'),
    ...(stance === 'ally'
      ? [q('Julian Mercer', 'You said you were going to take his company. I thought you might like some help with the parts of it you can’t reach from here.')]
      : stance === 'casualty'
        ? [
            q('Julian Mercer', 'Marcus asked me on Friday whether I’d ever done you a favour. Off the books. I said no. I lied. I’m telling you so you know I did.'),
            t('The workroom. The terms he bent for me in the spring. Marcus would call it a breach. Julian has just handed me a lever with his own name on it, and he knows it.'),
          ]
        : [q('Julian Mercer', 'I had lunch with Hollis on Thursday, and a coffee with Ines Varga on Friday. I told them both to be careful of the new woman on thirty-six. I thought you should hear it from me.')]),
  ];
}

function julianChoices(s: GameState): C8Choice[] {
  const stance = key(s, 'pred.julian');
  const j = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('julian8-' + id, label, hint, 'evening', (x) => {
      set8(x, 'p-julian', id);
      setKey(x, 'pred.julian8', id);
      after?.(x);
      return body;
    });
  if (stance === 'ally')
    return [
      j('take', 'Take his help', 'The CFO’s calendar. The one thing you could not reach.', [
        p('He gives you a printout, folded twice: Robert Lyle’s calendar for the quarter, the real one, with every meeting the CFO did not want on the shared system. Four of them are with L.S.F. Advisory.'),
        q('Julian Mercer', 'I don’t know what you’re going to do with it. I find I trust you to do something interesting.'),
      ], (x) => note(x, 'p8-lyle', 'The Helix CFO’s private calendar shows four meetings this quarter with L.S.F. Advisory.', 'Julian Mercer, a printout')),
      j('thank', 'Thank him, and keep him out of it', 'He is the one clean thing you have.', [
        q('You', 'Thank you. No. Keep your hands clean, Julian. I may need somebody who can say they never helped me.'),
        p('He looks at you for a moment as if you had said something much kinder than you meant to, and goes back to his own floor.'),
      ]),
    ];
  if (stance === 'casualty')
    return [
      j('use', 'Keep it, and let him know you will', 'He lied for you. Now he is yours.', [
        q('You', 'Thank you for telling me, Julian. I’ll remember that you did.'),
        p('He understands exactly what you mean. You watch him understand it. He goes back to his floor slower than he came.'),
      ]),
      j('hold', 'Say nothing', 'Let him wonder.', [p('You say nothing at all. He waits for a long time, and then goes.')]),
      j('spare', 'Tell him to tell Marcus the truth', 'Before Marcus finds out. You will back him.', [
        q('You', 'Go and tell Marcus the truth this afternoon, before he finds it. Tell him it was for me. I’ll back you.'),
        p('He stares at you. Then, for the first time since the corridor, he smiles.'),
      ]),
    ];
  return [
    j('confront', 'Tell him he is too late', 'You got there first.', [
      q('You', 'You’re a week too late, Julian. But thank you for telling me which way you’re facing.'),
      p('He nods slowly, as if confirming a figure he had hoped was wrong.'),
    ]),
    j('shrug', 'Shrug', 'Let him think it worked.', [p('You shrug, and smile, and let him think it worked. It is easier to walk past a man who believes he has already stopped you.')]),
  ];
}

// ── The evening ──

const invite: Record<'marcus' | 'julian', Block[]> = {
  marcus: [
    p('At nine a message, on your private phone: “Come and tell me the rest. No business. You know the rule.”'),
    p('He does not cook this time. He has had something sent up from a restaurant that does not deliver, and he eats it with his fingers at the window, and talks about the fund, and then, for the first time, about himself: a council flat in Leeds, a mother who cleaned offices like this one at night, the first building he ever bought.'),
    q('Marcus Chen', 'Same rule as before. You work for me; that has nothing to do with this. Tell me what you want tonight.'),
  ],
  julian: [
    p('At nine a message from Julian: “I’m not going to ask what you’re doing. I’d just like an evening with you in it.”'),
    p('The forty-first floor, the city laid out below, his cuffs undone. He does not mention Marcus once, which with Julian is a kind of declaration.'),
    q('Julian Mercer', 'Tell me what you want tonight. Only tonight.'),
  ],
};
const scopeReply: Record<'marcus' | 'julian', Record<'no-sex' | 'sex', string>> = {
  marcus: { 'no-sex': 'Then that is the evening. You say stop, I stop.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
};
const stay: Record<'marcus' | 'julian', Record<'no-sex' | 'sex', Block[]>> = {
  marcus: {
    'no-sex': [p('He kisses you with the city on three sides, slowly, and stops exactly where you said, and holds you there while he tells you about the first building, the one in Leeds, and you realise he has never told anybody else.')],
    sex: [p('He undoes the dress slowly and says out loud what he likes about what he finds, and asks once more whether you are sure. You answer by drawing him toward the bedroom.'), p('What happens next is yours and his, two people who both like to win, and it stays above the river. The scene fades.')],
  },
  julian: {
    'no-sex': [p('He kisses you against the glass and stops exactly where you tell him to, and holds you there for a very long time, his hand warm on your back, and does not ask a single question.')],
    sex: [p('The dress goes, and his shirt, and the three weeks go with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next stays on the forty-first floor. The scene fades.')],
  },
};

function eveningChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'p-evening-open');
  if (open) {
    const partner = open.replace('-room', '') as 'marcus' | 'julian';
    const name = partner === 'marcus' ? 'Marcus Chen' : 'Julian Mercer';
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer(`p8-${partner}-${id}`, label, hint, 'evening', (x) => {
          set8(x, 'p-evening-open', partner + '-room');
          set8(x, 'p-evening-scope', id);
          note(x, 'p8-evening-consent', `Evelynn chose the evening’s scope (${id}); ${name} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(name, scopeReply[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer('p8-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c8.p-evening-open'];
          set8(x, 'p-evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const sc = get8(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p8-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c8.p-evening-open'];
        set8(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer('p8-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c8.p-evening-open'];
        set8(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[partner][sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  const go = (partner: 'marcus' | 'julian', label: string, hint: string) =>
    offer('p8-evening-' + partner, label, hint, 'evening', (x) => {
      set8(x, 'p-evening', partner);
      set8(x, 'p-evening-open', partner);
      return invite[partner];
    });
  const julianOk = key(s, 'pred.julian') !== 'casualty' || key(s, 'pred.julian8') !== 'use';
  return [
    go('marcus', 'Go and tell Marcus the rest', 'His rule: no business.'),
    ...(julianOk && key(s, 'c6.friction-julian') !== 'cooled' ? [go('julian', 'Go to Julian', 'An evening with nothing to take.')] : []),
    offer('p8-evening-alone', 'Stay in with the ledger', 'Chapter 8 ends here.', 'complete', (x) => {
      set8(x, 'p-evening', 'alone');
      return [p('You stay in with the notebook and a glass of wine, and move the question marks on the page headed OWES, one by one, into answers.')];
    }),
  ];
}

// ── The ledger ──

function completeBlocks(s: GameState): Block[] {
  const lines = (['hollis', 'counsel', 'archive', 'press'] as Lever[])
    .filter((l) => done(s, l))
    .map((l) => ({ hollis: 'HOLLIS', counsel: 'VARGA', archive: 'BENTON (HARLAND)', press: 'MY FACE' })[l] + ': ' + key(s, 'pred.lever8.' + l)!.toUpperCase());
  return [
    ...(get8(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn and do not sleep.')] : []),
    p('The wardrobe door, late. The ledger has grown: ' + (lines.length ? lines.join('. ') + '.' : 'nothing yet but question marks.') + (key(s, 'pred.friday') === 'walk' ? ' And MARCUS: REMEMBERS I CAN WALK.' : '')),
    p('At the top, above Marcus, above all of it, you pin a new card and write on it the only name on the page that is bigger than he is: L.S.F. ADVISORY. Cream paper. Old money. A woman in London who likes to own things quietly.'),
    t('Everybody on that floor owes Marcus. Marcus owes them. I thought his desk was the top of the stairs. It turns out the stairs go on.'),
  ];
}

export function predatorBlocks8(s: GameState): Block[] {
  if (s.phase === 'weeks') return weeksBlocks(s);
  if (s.phase === 'friday') return fridayBlocks(s);
  if (s.phase === 'julian') return julianBlocks(s);
  if (s.phase === 'evening') return [p('By seven the floor is empty. You sit in your glass office with the lights off and the city coming on outside, and let the three weeks settle.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function predatorChoices8(s: GameState): C8Choice[] {
  if (s.phase === 'weeks') return [offer('weeks-begin', 'Start pulling', 'Two levers, before somebody notices.', 'hub')];
  if (s.phase === 'hub') return hubChoices(s);
  if (s.phase === 'friday') return fridayChoices(s);
  if (s.phase === 'julian') return julianChoices(s);
  if (s.phase === 'evening') return eveningChoices(s);
  return [];
}
