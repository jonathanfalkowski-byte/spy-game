/** Chapter 7 (Executive route, lane id `executive`) · The Room:
 * table → fortyone → contract → hallway → key → tonight → complete (the shared end: 'Where It Points').
 * Design: docs/story/EXECUTIVE_CHAPTER_7_THE_ROOM_DESIGN.md (owner-approved 2026-09-28, all seven decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_7_SCRIPT.md. Route: docs/story/EXECUTIVE_ROUTE_DESIGN.md.
 * Entered from the Chapter 7 confirm beat when the road is `executive`; the road continues to the shared Chapter 9
 * bridge placeholder until Executive Chapter 8 exists. The workroom becomes a job: chief of staff to the Group COO, and
 * Julian asks "What would make this safe for you?". Three of five terms in her own words (the door, the firewall, her
 * own name, the veto, the files); Marcus in the hallway; Julian's honest confession that he signs what Marcus gives him
 * (the human seed of clause 14.3); a key to a Helix flat (accept / decline / pay the rent herself: the kept overlay's
 * first seed, never punished); a chosen evening (heat 3, consent-gated, fades); the first card, WHAT DO I OWE HIM?
 * Julian is never a trap (EXECUTIVE_ROUTE_DESIGN §2). Phase names differ from the Predator road's, which shares this
 * scene; keys live under `exec.*` and `c7.x-*`.
 * Deepening pass (2026-09-28): three moments, each with a neutral pick. Breakfast before the offer (c7.x-breakfast =
 * ask | hand | quiet: the clerk he was at nineteen; her hand over his, asked for and kept; or the honest coffee). The
 * photograph face down on his desk while he fetches the contract (exec.photo = ask | straighten | leave: "Somebody I
 * didn't keep"; "Clare used to do that"). The lift after his confession (exec.lift = thank | read | hand). The dinner on
 * forty-one and the stays at greater length; the first card remembers the hand. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { cash5, get5 } from './chapter5-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';

export const EXECUTIVE_PHASES7 = ['table', 'fortyone', 'contract', 'hallway', 'key', 'tonight'] as const;
export const isExecutive7 = (s: GameState) => getKey(s, 'route.lane') === 'executive';
export const executivePhase7 = (s: GameState) => isExecutive7(s) && ((EXECUTIVE_PHASES7 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const c = (s: GameState, k: string) => s.choices[k];
const warmed = (s: GameState) => c(s, 'c6.friction-julian') === 'warmed';
const cooled = (s: GameState) => c(s, 'c6.friction-julian') === 'cooled';
const RENT = 1200;

export function placeExecutive7(s: GameState): string | undefined {
  if (s.phase === 'hallway' && get7(s, 'x-lift-open')) return '12:05 · The lifts, forty-one';
  const open = get7(s, 'x-evening-open');
  if (s.phase === 'tonight' && open) return open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── Breakfast ──

function tableBlocks(): Block[] {
  return [
    p('A week after the room, at a quarter to seven, a message from Julian, the way he writes everything that matters: plainly, and before anybody else is awake.'),
    q('Julian Mercer', 'Breakfast? There’s a place on Carey Street nobody from Helix eats at, because the coffee is honest and the chairs are not. Half past seven. I want to ask you something properly, and I’d rather not do it in a building that belongs to anybody.'),
    t('He has never once asked me anything improperly. That is the most dangerous thing about him.'),
  ];
}

function tableChoices(s: GameState): C7Choice[] {
  if (get7(s, 'x-breakfast-open')) return breakfastChoices();
  const a = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('arrive-' + id, label, hint, 'table', (x) => {
      set7(x, 'x-arrive', id);
      set7(x, 'x-breakfast-open');
      return [...body, ...breakfastScene];
    });
  return [
    a('early', 'Be there first', 'Take the good chair. Watch him come in.', [p('You are there at twenty past, in the chair with its back to the wall, and you watch him come in out of the rain, and see him see you, and see the half-second in which he is simply glad, before he remembers to be anything else.')]),
    a('ontime', 'Arrive at half past exactly', 'He will already be there. He always is.', [p('He is there already, of course, at the table in the corner, with two coffees, one of them the way you take it. He stands up when you come in. Nobody in your life has stood up when you came in for a long time.')]),
    a('late', 'Be ten minutes late, on purpose', 'See what he does with the waiting.', [p('You are ten minutes late on purpose, and he has not looked at his phone once. He is reading the menu as if it were a contract, and when you sit down he says only “Good,” and pours your coffee from the pot he ordered for two.')]),
  ];
}

const breakfastScene: Block[] = [
  p('The table is too small for two people who are trying not to touch under it. Eggs, toast cut into triangles by somebody who cares, and the window steaming up from the inside so that Carey Street goes soft and gold behind him.'),
  q('Julian Mercer', 'I used to eat here at nineteen. I was a clerk in the building across the road, counting other people’s shipping containers, and this was the only place I could afford that had a tablecloth.'),
  p('He talks about Helix the way some men talk about a house they grew up in: which rooms were cold, which stair creaked, which door you never opened after dark. He does not once talk about himself on purpose, and you learn more about him in ten minutes than in the whole of the spring.'),
];

function breakfastChoices(): C7Choice[] {
  const b = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('breakfast-' + id, label, hint, 'fortyone', (x) => {
      set7(x, 'x-breakfast', id);
      delete x.choices['c7.x-breakfast-open'];
      return [...body, ...breakfast];
    });
  return [
    b('ask', 'Ask about the boy with the tablecloth', 'The clerk counting containers.', [
      q('You', 'What was he like? The nineteen-year-old.'),
      q('Julian Mercer', 'Earnest. Hungry. He had a boss who read every page of every manifest, and he promised himself he would do the same when he was important. He hasn’t, always. I’ll tell you about that one day.'),
      t('One day. He keeps promising me the parts of himself he isn’t proud of, as if they were gifts.'),
    ]),
    b('hand', 'Put your hand over his', 'When he reaches for the pot.', [
      p('He reaches for the coffee pot and you put your hand over his on the handle, and he goes completely still, the way people do when a bird lands on them.'),
      q('Julian Mercer', 'I’m going to ask you something properly in a minute. I’d like to ask it with your hand exactly where it is. If that’s all right.'),
      q('You', 'It’s all right.'),
      p('It stays there. The pot goes cold. Neither of you pours.'),
    ]),
    b('quiet', 'Drink the honest coffee, and let him talk', 'He is worth listening to.', [
      p('You drink the honest coffee and let him talk, and at some point you realise you have stopped listening for the catch.'),
    ]),
  ];
}

const breakfast: Block[] = [
  p('The coffee is honest. The chairs are not. Julian takes his glasses off and puts them on the table between you, which is a thing he does, you have learned, when he wants to be seen without them.'),
  q('Julian Mercer', 'Come and work for me. Properly. Chief of staff to the Group COO: everything that crosses my desk crosses yours first. Your own office, on forty-one, next to mine.'),
  q('Julian Mercer', 'Come up at ten, and I’ll show you. I wanted to ask here first, so that you could say no somewhere I don’t own the chairs.'),
];

// ── The forty-first floor ──

function fortyoneBlocks(s: GameState): Block[] {
  const r = c(s, 'c6.expectation-response');
  return [
    p('The forty-first floor at ten: a corner of glass, a desk kept clear, a wall of books he has actually read, and one photograph turned face down that he does not explain. The office next door is empty, and the light has been left on in it.'),
    q(
      'Julian Mercer',
      r === 'clarified'
        ? 'Last month you made me say it out loud, what I was asking. I was embarrassed for a day, and then grateful. I don’t want to ask you for anything I haven’t said out loud again.'
        : r === 'refused'
          ? 'Last month I asked you for something and you said no, and I kept the room open, and I want you to know that wasn’t kindness. It was the only way I knew to find out whether I was the kind of man I thought I was.'
          : r === 'negotiated'
            ? 'Last month you priced my favour, and you were right to. Nothing I give you should arrive without its price written on it. So let me write the price first.'
            : r === 'narrowed'
              ? 'Last month you said yes to the part you chose and no to the rest. I have thought about that more than I should admit.'
              : 'You held that room on your own wording for a month. I noticed. Everybody on forty-one noticed.',
    ),
    q('Julian Mercer', 'So I’m not going to ask what you want. People ask you that all the time, I expect. I’d like to ask something else. What would make this safe for you?'),
    t('Nobody has ever asked me that. Not Adrian’s bosses, not Axiom, not the clinic. They asked what I could do. He is asking what I need.'),
  ];
}

function fortyoneChoices(s: GameState): C7Choice[] {
  if (get7(s, 'x-photo-open')) return photoChoices();
  const f = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('safe-' + id, label, hint, 'fortyone', (x) => {
      set7(x, 'x-safe', id);
      set7(x, 'x-photo-open');
      return [...body, ...photoLead];
    });
  return [
    f('writing', '“Terms. In writing. Mine.”', 'The only safety you have ever trusted.', [q('You', 'Terms. In writing. In my words, not your lawyers’.'), q('Julian Mercer', 'I hoped you’d say that. I cleared the afternoon.')]),
    f('why', 'Ask him why you', 'Of everybody on the floor.', [
      q('You', 'Why me?'),
      q('Julian Mercer', 'Because you read everything, and you say what you read, and you don’t want my job. In this building those are three separate miracles.'),
    ]),
    f('quiet', 'Say nothing, and let him wait', 'He is good at waiting.', [p('You say nothing, and he lets you, for a long time, the way good men let a silence belong to the other person. In the end you nod once, and he pushes a pad and pen across the desk.')]),
  ];
}

// ── The photograph ──

const photoLead: Block[] = [
  p('He goes to the cabinet in the corner for the contract, and while his back is turned you look properly at his desk: clear, one pen, a glass of water, and the photograph in its plain silver frame, turned face down and squared exactly to the edge of the wood.'),
];

function photoChoices(): C7Choice[] {
  const ph = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('photo-' + id, label, hint, 'contract', (x) => {
      set7(x, 'x-photo', id);
      setKey(x, 'exec.photo', id);
      delete x.choices['c7.x-photo-open'];
      return [...body, ...contractLead];
    });
  return [
    ph('ask', '“Who’s in the photograph?”', 'Ask. He can say no.', [
      q('You', 'Who’s in the photograph?'),
      p('He does not turn round, and he does not pretend not to know which photograph.'),
      q('Julian Mercer', 'Somebody I didn’t keep. I’ll tell you one day. Not on your first morning.'),
    ]),
    ph('straighten', 'Square it to the edge', 'Leave it face down. Just straighter.', [
      p('You square it a millimetre further to the edge of the desk, still face down. When he turns round he sees what you have done, and laughs, suddenly and helplessly.'),
      q('Julian Mercer', 'Clare used to do that. My last chief of staff. You’ll hear about her.'),
    ]),
    ph('leave', 'Leave it alone', 'Some things face down are meant to be.', [
      p('You leave it exactly as it is. When he turns round with the contract he glances at the frame, and then at you, and sees that you have not touched it, and something in his shoulders lets go.'),
    ]),
  ];
}

// ── The contract ──

const contractLead: Block[] = [
  p('He pushes a contract across the desk: two pages of standard Helix, and a third, blank but for ADDITIONAL TERMS at the top and two lines for signatures at the bottom.'),
  q('Julian Mercer', 'Three. Whatever they are, I’ll sign them. And then I’ll read each one twice, because I want to understand what I’ve agreed to, which I realise is not how most people in this building do it.'),
];

const terms: [id: string, label: string, hint: string, text: string, reply: string][] = [
  ['door', 'The door: walk with notice and references, any time', 'Leaving is a decision, not a cliff.', 'The Employee may leave this post at any time, for any reason or none, on one month’s notice, with references unreserved.', 'Good. I’d never want you here because leaving was too expensive.'],
  ['firewall', 'The firewall: the work and the personal never pay each other', 'Nothing at work buys anything after six, and nothing after six buys anything at work.', 'No favour given in the course of this employment shall be owed, repaid or recalled outside it, and nothing outside it shall be owed, repaid or recalled within it.', 'I’ll read that one three times. And then I’ll keep it.'],
  ['name', 'Her own name: her salary, her address, her face', 'Helix pays you. Helix does not house or style you unless you ask.', 'The Employee’s salary, address and likeness are her own. Helix shall provide no housing, styling or public image on her behalf unless she asks for it in writing.', 'Your own name. Of course. I’m sorry it needs writing down.'],
  ['veto', 'The veto: nobody introduces you to a financier without your say', 'Not a client, not a fund, not a friend of the board.', 'The Employee shall not be introduced to any client, financier or associate of Helix without her prior consent.', 'Nobody. You have my word, and now you have my signature under it.'],
  ['files', 'The files: you read everything you are asked to act on', 'Including what he signs.', 'The Employee shall have full access to every document she is asked to act upon, including those signed by the Group COO.', 'Including what I sign. Yes. You may find that makes one of us nervous.'],
];

function contractChoices(s: GameState): C7Choice[] {
  const taken = Number(get7(s, 'x-terms') ?? 0);
  return terms
    .filter(([id]) => !getKey(s, 'exec.term.' + id))
    .map(([id, label, hint, text, reply]) =>
      offer7('term-' + id, label, hint, taken + 1 >= 3 ? 'hallway' : 'contract', (x) => {
        setKey(x, 'exec.term.' + id);
        set7(x, 'x-terms', String(taken + 1));
        const body: Block[] = [q('Term ' + (taken + 1), text), q('Julian Mercer', reply)];
        if (taken + 1 < 3) return body;
        note7(x, 'x-contract', `Evelynn signed with Helix as chief of staff to the Group COO, Julian Mercer, with three terms in her own words (${terms.filter(([k]) => getKey(x, 'exec.term.' + k)).map(([k]) => k).join(', ')}).`, 'The contract on Julian Mercer’s desk, signed by both');
        return [
          ...body,
          p('He signs all three pages, and then reads each of your terms twice, slowly, moving his lips very slightly on the second reading, like a man learning something by heart.'),
          q('Julian Mercer', 'There. Now I can’t make you do anything you didn’t write down. I find I’m relieved.'),
          t('He has just signed away every way he could have held me. On purpose. I have never seen anybody do that and mean it.'),
        ];
      }),
    );
}

// ── The hallway ──

function hallwayBlocks(): Block[] {
  return [
    p('At noon, in the long glass hallway between forty-one and the lifts, Marcus Chen is walking the other way with a folder under his arm and his jacket over his shoulder, and stops, and looks at you as if you were a painting somebody else had bought first.'),
    q('Marcus Chen', 'Julian’s new favourite. He always did pick well.'),
    p('A beat, perfectly timed, the smile arriving after his eyes.'),
    q('Marcus Chen', 'He never did keep them.'),
  ];
}

const confession: Block[] = [
  p('Julian walks you to the lift himself, and waits with you, and when the doors open he puts a hand on the edge of them to hold them, and says, without looking at you:'),
  q('Julian Mercer', 'You’ll find this out, so I want you to hear it from me. I sign what Marcus gives me. Deals, financing, the schedules behind them. He puts them on my desk at six o’clock and I sign them, and I don’t always read them. I’ve trusted him for eleven years. I’m not proud of it. It’s the one part of my job I’ve never done properly.'),
  t('He has just told me the most dangerous thing about himself, in a lift, because he did not want me to find it in a file. Nobody in this building does that.'),
];

function hallwayChoices(s: GameState): C7Choice[] {
  if (get7(s, 'x-lift-open')) return liftChoices(s);
  const h = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('marcus-' + id, label, hint, 'hallway', (x) => {
      set7(x, 'x-marcus', id);
      set7(x, 'x-lift-open');
      setKey(x, 'exec.marcus', id);
      return [...body, ...confession];
    });
  return [
    h('answer', '“He didn’t pick me. I picked the job.”', 'Put it on the record.', [q('You', 'He didn’t pick me, Mr Chen. I picked the job. You should read the contract. Julian has.'), p('Marcus laughs, genuinely, and walks on, and you can feel him deciding to find out what is in it.')]),
    h('smile', 'Smile, and say nothing', 'Let him wonder what you are.', [p('You smile at him, the Glass House smile, and say nothing, and walk past him close enough that he has to step aside. He does. He is still turning round to look when the lift doors close.')]),
    h('ask', '“What happened to the others?”', 'Make him say it.', [q('You', 'What happened to the others?'), q('Marcus Chen', 'They wanted things. From him. Julian can’t bear being wanted for things. Good luck.'), t('That was a warning dressed as a joke. Or a joke dressed as a warning. With Marcus, the costume is the point.')]),
  ];
}

function liftChoices(s: GameState): C7Choice[] {
  const l = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('lift-' + id, label, hint, 'key', (x) => {
      setKey(x, 'exec.lift', id);
      delete x.choices['c7.x-lift-open'];
      return body;
    });
  return [
    l('thank', '“Thank you for telling me.”', 'Mean it.', [
      q('You', 'Thank you for telling me.'),
      p('He takes his hand off the doors.'),
      q('Julian Mercer', 'Thank you for listening. Most people in this building would have written it down.'),
      p('The doors close on his face, and you ride forty-one floors down with the most dangerous thing about him in your keeping.'),
    ]),
    l('read', getKey(s, 'exec.term.files') ? '“I know. I wrote it into my contract.”' : '“Then let me read them first.”', 'From now on.', [
      q('You', getKey(s, 'exec.term.files') ? 'I know. I wrote it into my contract this morning, and you signed it. From now on I read them first.' : 'Then from now on, let me read them first.'),
      q('Julian Mercer', 'Yes. Please. God, yes.'),
      p('He says it the way a man says it when somebody has offered to carry the heaviest bag, and he has been carrying it so long he had forgotten it was heavy.'),
    ]),
    l('hand', 'Put your hand over his, on the door', 'Let the lift wait.', [
      p('You put your hand over his on the edge of the door. The doors try to close on both your hands, and give up, and try again, and the lift begins, very politely, to complain.'),
      q('Julian Mercer', 'Ms Vale.'),
      q('You', 'Mr Mercer.'),
      p('Then you step in, and he lets go, and the doors close between you, and you ride forty-one floors down with the back of your hand still warm.'),
    ]),
  ];
}

// ── The key ──

function keyBlocks(s: GameState): Block[] {
  return [
    p('At five, at your new desk on forty-one, with the light going amber on the river, a man from facilities puts an envelope on the corner of your desk and goes before you can thank him.'),
    p('Inside: a key on a plain ring, a brass fob with a number, and a card in Julian’s hand.'),
    q('The card', 'Helix keeps a flat on the river for people who work too late to go home. It is empty. It is beautiful. It is yours if you want it, and not if you don’t. No term attached, and none implied. — J.'),
    ...(getKey(s, 'exec.term.name') ? [t('My own name. My own address. I wrote that into the contract this morning, and he signed it, and now there is a key on my desk. He did not forget. He is asking.')] : [t('No term attached. He wrote that down because he knew I would look for one.')]),
  ];
}

function keyChoices(s: GameState): C7Choice[] {
  const money = cash5(s);
  const k = (id: string, label: string, hint: string, value: string, body: (x: GameState) => Block[]) =>
    offer7('key-' + id, label, hint, 'tonight', (x) => {
      set7(x, 'x-key', id);
      setKey(x, 'exec.flat', value);
      note7(x, 'x-flat', `Julian Mercer offered Evelynn the use of a Helix flat on the river, with no term attached. She ${value === 'accepted' ? 'accepted it' : value === 'declined' ? 'declined it' : 'accepted it and paid Helix the rent from her own salary'}.`, 'The key and the card, on her desk on forty-one');
      return body(x);
    });
  return [
    k('accept', 'Take the key', 'The flat, the view, the quiet. Nothing is owed, he said.', 'accepted', () => [
      p('You put the key in your pocket. That night, for an hour, you stand in the flat on the river with the lights off and the whole city lit below you like an open drawer: two rooms, a bed nobody has slept in, a view nobody could afford.'),
      t('Nothing is owed, he said. He meant it. I am going to have to decide, every morning, whether I believe it.'),
    ]),
    k('decline', 'Give it back', '“I have a flat.”', 'declined', () => [
      p('You walk the envelope back to his office yourself and put it on his clear desk.'),
      q('You', 'I have a flat.'),
      q('Julian Mercer', 'Of course you do. It was a stupid thing to do with a key. I’m glad you told me.'),
      p('He means it. He puts the key in a drawer and does not mention it again, then or ever.'),
    ]),
    ...(money >= RENT
      ? [
          k('rent', 'Take it, and pay the rent yourself', 'Keep the view. Owe nothing. It will cost most of the month.', 'paid', (x) => {
            setKey(x, 'own.cash', String(Math.max(0, cash5(x) - RENT)));
            return [
              p('You walk down to facilities and ask, very politely, what Helix would charge anybody else for the flat on the river, and write a standing order for that figure, from your own account, before you have taken off your coat.'),
              q('Julian Mercer', 'You paid for it.'),
              q('You', 'I did. It’s a lovely flat. It’s mine.'),
              p('He looks at you for a long moment with an expression you will spend a week trying to name, and in the end decide was respect, and something a little like relief.'),
            ];
          }),
        ]
      : []),
  ];
}

// ── Tonight ──

const scopeReply: Record<'no-sex' | 'sex', string> = {
  'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it. I’d stay on my side of it for a year.',
  sex: 'Yes. And you say stop, it stops. The same for me. That’s the only term I’ll ever ask you for.',
};
const stay: Record<'no-sex' | 'sex', Block[]> = {
  'no-sex': [
    p('He kisses you by the window with the city laid out below, slowly, as if he had been thinking about how for a very long time, and stops exactly where you said, and holds you there, his hand warm on the back of your neck, and does not ask a single question.'),
    p('You stay until the lights go out down there one district at a time, your head on his shoulder and his heart going under your palm, steadier than yours.'),
  ],
  sex: [
    p('He kisses you by the window first, for a long time, as if the kiss were the whole of what he had asked for and anything else would be a kindness he did not expect. Then he undoes the dress as carefully as he read your terms, one hook at a time, and says your name, the one you are wearing, as if it were a word he had only just learned.'),
    p('He asks once more, his mouth against your shoulder. You answer by pulling him toward the bedroom.'),
    p('What happens next stays on the forty-first floor. The scene fades.'),
  ],
};

function tonightChoices(s: GameState): C7Choice[] {
  const open = get7(s, 'x-evening-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer7('x-julian-' + id, label, hint, 'tonight', (x) => {
        set7(x, 'x-evening-open', 'julian-room');
        set7(x, 'x-evening-scope', id);
        note7(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(warmed(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer7('x-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c7.x-evening-open'];
        set7(x, 'x-evening-outcome', 'declined');
        return [p('You say goodnight at his door and mean it. He walks you down to the car himself, and stands on the pavement in his shirtsleeves in the rain until it turns the corner.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get7(s, 'x-evening-scope') as 'no-sex' | 'sex';
    return [
      offer7('x-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c7.x-evening-open'];
        set7(x, 'x-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and steps back, and says “Of course,” and means it.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer7('x-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c7.x-evening-open'];
        set7(x, 'x-evening-outcome', 'intimate-' + sc);
        return [...stay[sc], p('For a few hours nobody owes anybody anything. You wrote that down this morning, and he signed it.')];
      }),
    ];
  }
  return [
    ...(!cooled(s)
      ? [
          offer7('x-evening-julian', 'Go up to forty-one', warmed(s) ? 'He asked you to dinner. He meant more, and said so.' : 'Dinner. You set the line.', 'tonight', (x) => {
            set7(x, 'x-evening', 'julian');
            set7(x, 'x-evening-open', 'julian');
            return [
              p('At eight he cooks, badly and cheerfully, in the flat on the forty-first floor, with the city laid out below and his cuffs undone, and burns the first attempt, and laughs about it, and makes you an omelette instead.'),
              p('You eat it at the counter, sitting on the stools like students. He asks nothing about where you came from, or what you did before the spring. He asks what you read on trains, and whether you like the rain, and which of the lights down there you would switch off first if you could, and listens to every answer as if it were going to be on the exam.'),
              ...(get7(x, 'x-breakfast') === 'hand' || getKey(x, 'exec.lift') === 'hand' ? [p('At some point he takes your hand across the counter, the one you gave him this morning, and turns it over, and looks at it as if he were learning it.')] : []),
              q('Julian Mercer', warmed(s) ? 'I’m going to say this plainly, because I say everything plainly. I would like you to stay. And I would like you to tell me what you want tonight, and that’s what happens.' : 'I’m not going to ask for anything tonight that you haven’t offered. Tell me where the line is, and I’ll stand behind it.'),
            ];
          }),
        ]
      : []),
    ...(c(s, 'c6.maya') === 'restored'
      ? [
          offer7('x-evening-maya', 'Tell Maya', 'She will want to know if he is good to you.', 'complete', (x) => {
            set7(x, 'x-evening', 'maya');
            return [
              p('Maya’s kitchen, a bottle of something cheap and good, and her cat asleep on the tax return. You tell her about the job, and the terms, and the key.'),
              q('Maya', 'Is he good to you?'),
              q('You', 'He asked what would make it safe.'),
              p('Maya puts her glass down and looks at you for a long time.'),
              q('Maya', 'Then he’s either very good or very, very clever. Find out which before you give him your spare key.'),
            ];
          }),
        ]
      : []),
    offer7('x-evening-alone', 'Go home alone', 'Chapter 7 ends here.', 'complete', (x) => {
      set7(x, 'x-evening', 'alone');
      return [p(getKey(x, 'exec.flat') === 'declined' ? 'You go home to your own flat and your own kettle, and read the contract again in bed, your three terms first.' : 'You go home, and the key is in your pocket the whole way, heavier than a key has any right to be.')];
    }),
  ];
}

// ── The first card ──

function completeBlocks(s: GameState): Block[] {
  const flat = getKey(s, 'exec.flat');
  return [
    ...(get7(s, 'x-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep, and do not want to.')] : []),
    p('The wardrobe door, late. You pin the first card of a new road in the middle of it, in capitals.'),
    q('The card', 'JULIAN MERCER. CHIEF OF STAFF. ' + (flat === 'accepted' ? 'HIS KEY.' : flat === 'paid' ? 'MY RENT.' : 'MY OWN FLAT.')),
    p('And underneath it, in pencil, smaller, the question you have been asking yourself since breakfast:'),
    q('The card', 'WHAT DO I OWE HIM?'),
    ...(get7(s, 'x-breakfast') === 'hand' || getKey(s, 'exec.lift') === 'hand'
      ? [p('You stand there for a long time with your right hand closed, as if you were holding something in it.')]
      : getKey(s, 'exec.photo') === 'ask'
        ? [p('Somebody I didn’t keep, he said, about the photograph. And Marcus, in the hallway: He never did keep them. You write KEEP on the corner of the card, very small, and a question mark after it.')]
        : []),
    t(
      get5(s, 'published')
        ? 'Half of London knows my face and none of them know what I need. He asked. I do not yet know what that costs, and I have never wanted so much to find out.'
        : 'He asked what would make it safe. I do not yet know what that costs, and I have never wanted so much to find out.',
    ),
  ];
}

export function executiveBlocks7(s: GameState): Block[] {
  if (s.phase === 'table') return tableBlocks();
  if (s.phase === 'fortyone') return fortyoneBlocks(s);
  if (s.phase === 'contract') return [];
  if (s.phase === 'hallway') return hallwayBlocks();
  if (s.phase === 'key') return keyBlocks(s);
  if (s.phase === 'tonight') return [p('Seven o’clock. The floor empties from the lifts outward. Your office light is the last one on forty-one but his.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'table') return tableChoices(s);
  if (s.phase === 'fortyone') return fortyoneChoices(s);
  if (s.phase === 'contract') return contractChoices(s);
  if (s.phase === 'hallway') return hallwayChoices(s);
  if (s.phase === 'key') return keyChoices(s);
  if (s.phase === 'tonight') return tonightChoices(s);
  return [];
}
