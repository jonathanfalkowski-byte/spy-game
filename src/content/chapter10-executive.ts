/** Chapter 10 (Executive route, lane id `executive`) · A Lovely Man:
 * orchid → lindqvist → calendar → paper → week → night → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_10_A_LOVELY_MAN_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_10_SCRIPT.md. The shared "She Knows" breakfast in Executive
 * framing: Celeste is kind about Julian, and that is the threat. A white orchid on her desk on forty-one; the Lindqvist,
 * or Celeste at Julian's reception. The inventory (her terms quoted exactly, the flat, what Celeste can know of the tray:
 * told or pulled, never kept; Clare; the office floor at two), then "Adrian". "He's a lovely man. He'll never survive
 * us. Unless you help me.": his calendar, every Friday, on the black phone (give / doctor / refuse; refusal costs Julian a
 * week, non-sexual: a small facility in Gdańsk called early; Adrian's name is kept for Ch14). Julian with the City pages
 * ("You didn't tell me you knew Celeste Laurent"; the truth waits for Ch12–14); the Vesper invitation in his own diary
 * ("do bring your chief of staff"); a chosen night (heat 3, consent-gated, fades). Entered from an Executive
 * `chapter9.complete`; until Executive Ch11 exists the road goes on through the in-development bridge to Ch14. Local
 * helpers mirror chapter10.ts (c10.* keys, chapter10.* ids); choice ids carry `x10-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C10Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get10 = (s: GameState, k: string) => s.choices['c10.' + k];
const set10 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c10.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C10Choice['apply']): C10Choice => ({ id: 'chapter10.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get10(s, 'rec.' + k) !== undefined) return;
  set10(s, 'rec.' + k, String(s.history.length));
  set10(s, 'event.' + k, String(s.revision));
  set10(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c10.' + k);
  s.knowledge.push('c10.' + k);
}

export const EXECUTIVE_PHASES10 = ['orchid', 'lindqvist', 'calendar', 'paper', 'week', 'night'] as const;
export const isExecutive10 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase10 = (s: GameState) => isExecutive10(s) && ((EXECUTIVE_PHASES10 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const summoned = (s: GameState) => get10(s, 'x-went') === 'summoned';
const walked = (s: GameState) => get10(s, 'x-adrian') === 'walk';
const answer = (s: GameState) => key(s, 'exec.calendar') as 'gave' | 'doctored' | 'refused' | undefined;
const nightOk = (s: GameState) =>
  key(s, 'c6.friction-julian') === 'warmed' || !!key(s, 'c7.x-evening-outcome')?.startsWith('intimate') || !!key(s, 'c8.x-late-outcome')?.startsWith('intimate');

export function placeExecutive10(s: GameState): string | undefined {
  if (s.phase === 'lindqvist' || (s.phase === 'calendar' && !walked(s))) return summoned(s) ? '09:00 · Julian’s reception, forty-one' : '07:00 · The Lindqvist';
  if (s.phase === 'calendar') return summoned(s) ? '09:40 · The lifts, forty-one' : '07:50 · The Lindqvist, the door';
  const open = get10(s, 'x-night-open');
  if (s.phase === 'night' && open) return open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The entry: the orchid ──

export function beginExecutive10(): C10Choice {
  return offer('begin-executive', 'Monday', 'Something is on your desk that nobody put there.', 'orchid');
}

function orchidBlocks(): Block[] {
  return [
    p('Monday, ten past seven, forty-one. The floor is dark but for the lamp on your desk, which you did not leave on, and under it, in a black pot, a white orchid: three flowers open, one still closed, all turned very slightly toward your chair.'),
    p('A card propped against the pot, in a hand you have seen before at the bottom of a letter in small type:'),
    q('The card', 'Breakfast? Wednesday. The Lindqvist, seven. — C.'),
    p('Facilities has no record of a delivery. Security has no record of a visitor. The night guard, when you ask, says nobody came up after nine except the cleaners, and he would know.'),
    t('Inside Helix. On his floor. On my desk. She wanted me to know that she could, before she wanted anything else.'),
  ];
}

function orchidChoices(): C10Choice[] {
  return [
    offer('x10-go', 'Go to the Lindqvist', 'She asked. Answering is the first thing you control.', 'lindqvist', (x) => (set10(x, 'x-went', 'went'), [])),
    offer('x10-summon', 'Let her come to you', 'Send the card back with a line: forty-one, nine o’clock.', 'lindqvist', (x) => {
      set10(x, 'x-went', 'summoned');
      return [p('You write on the back of her card, “Forty-one. Nine o’clock. — E.”, and leave it in the pot, and on Wednesday morning you find out what that means.')];
    }),
  ];
}

// ── The Lindqvist: the inventory ──

function termLine(s: GameState): string {
  if (key(s, 'exec.term.files')) return '“Full access to every document she is asked to act upon, including those signed by the Group COO.” You read your own contract. How rare. Hardly anybody does, in that building.';
  if (key(s, 'exec.term.firewall')) return '“No favour given in the course of this employment shall be owed, repaid or recalled outside it.” A firewall. How sensible. They never hold, of course, but it was sweet of you to build one.';
  if (key(s, 'exec.term.name')) return '“The Employee’s salary, address and likeness are her own.” Your own name. I did enjoy that one.';
  return 'You wrote your own terms. Three of them. I read all three, twice, the way he does.';
}

function lindqvistBlocks(s: GameState): Block[] {
  const flat = key(s, 'exec.flat');
  const file = key(s, 'exec.file');
  return [
    ...(summoned(s)
      ? [
          p('At nine on Wednesday the lift opens on forty-one and Celeste Laurent steps out of it into Julian’s reception in grey cashmere, as if she had been coming here for years, and asks his assistant, very pleasantly, for two coffees and the small table by the window. Half the floor finds a reason to walk past. Julian, through the glass, stands up at his desk, and then, after a moment, sits down again.'),
          q('Celeste Laurent', 'Your floor, darling. I do like to be asked. Sit.'),
        ]
      : [
          p('The Lindqvist has no sign: a black door between a bank and a jeweller, a doorman who opens it before you reach it, and a breakfast room on the river whose curtains are never opened. Lamps, dark wood, silver domes. Two men at the far table who do not eat.'),
          p('Celeste Laurent is already there, in grey cashmere, with the pot poured and your coffee made the way you take it, which nobody in this city should know.'),
          q('Celeste Laurent', 'You came. She never came. I used to breakfast alone for weeks. Sit.'),
        ]),
    p('And then, warmly, generously, between the eggs and the toast, she tells you your own life.'),
    q('Celeste Laurent', termLine(s)),
    q(
      'Celeste Laurent',
      flat === 'accepted'
        ? 'You took his flat. The river one. It has the best view in London and the worst radiators.'
        : flat === 'paid'
          ? 'You pay rent on a view. A standing order, from your own account. How moral. I had to read that twice.'
          : 'You kept your own little flat, with the kettle. I liked that very much.',
    ),
    ...(file === 'told'
      ? [q('Celeste Laurent', 'He hasn’t signed anything of ours since the spring. Not a page. Somebody taught him to read.')]
      : file === 'pulled'
        ? [q('Celeste Laurent', 'Marcus has been looking for a document since April. He’s been quite unbearable about it.')]
        : []),
    ...(file === 'kept' ? [t('She doesn’t know about page thirty-one. She knows everything else, and she doesn’t know that. Keep it.')] : []),
    ...(key(s, 'c8.x-clare') && key(s, 'c8.x-clare') !== 'leave' ? [q('Celeste Laurent', 'You found Clare’s folder. She was very fond of him too. It didn’t help her.')] : []),
    ...(key(s, 'c8.x-midnight') === 'stay' ? [q('Celeste Laurent', 'And the office floor at two in the morning, with the noodles. How sweet. The cleaners talk. Everybody’s cleaners talk.')] : []),
    ...(key(s, 'exec.owes-sloane') ? [q('Celeste Laurent', 'You owe Sloane a favour. Everybody does, eventually.')] : []),
    p('She signs for breakfast without looking at the bill, and caps her pen, and says, in exactly the voice she has used for everything else:'),
    q('Celeste Laurent', 'Eat your eggs, Adrian. You never did look after yourself.'),
    p('She says it the way you would say a name in a crowded room to see who turns round. You do not turn round. It doesn’t matter. She was not asking.'),
  ];
}

function lindqvistChoices(): C10Choice[] {
  const a = (id: 'composed' | 'ask' | 'walk', label: string, hint: string, body: Block[]) =>
    offer('x10-adrian-' + id, label, hint, 'calendar', (x) => {
      set10(x, 'x-adrian', id);
      return body;
    });
  return [
    a('composed', 'Don’t flinch', 'Give her nothing.', [p('You eat your eggs. Every one of them. She watches you do it with real approval, as if you had passed something.')]),
    a('ask', '“What do you want?”', 'Make her say it.', [q('You', 'What do you want, Mrs Laurent?'), q('Celeste Laurent', 'Oh, darling. Only to help.')]),
    a('walk', 'Walk out', 'Leave her with the bill.', [
      p('You fold your napkin, put it beside the plate, and stand, and walk. She lets you get almost to the door.'),
      q('Celeste Laurent', 'One more thing, darling. It’s about him.'),
      p('You stop. You hate that you stop.'),
    ]),
  ];
}

// ── The order ──

function calendarBlocks(s: GameState): Block[] {
  return [
    ...(walked(s) ? [p('She comes and stands beside you at the door, close, as if the two of you were waiting for the same taxi.')] : []),
    q('Celeste Laurent', 'He’s a lovely man. He really is. I’ve watched him for eleven years. He reads books, and he means it when he asks how you are, and he signs what Marcus gives him.'),
    q('Celeste Laurent', 'He’ll never survive us. Unless you help me.'),
    p('She puts a slim black phone on the tablecloth between you, or in your hand at the door: no case, no name, one contact. C.'),
    q('Celeste Laurent', 'His calendar. The week ahead, every Friday, on that. That’s all. If I know where he’ll be, I can stand there before Marcus does. You’d be amazed what can be prevented by simply being in the right room first.'),
    t('She wants where he will be. Not what he knows, not what he signs, not him. Where. It is the smallest thing anybody has ever asked me for, and I know exactly how big it is.'),
  ];
}

function calendarChoices(): C10Choice[] {
  const c = (id: 'give' | 'doctor' | 'refuse', label: string, hint: string, value: 'gave' | 'doctored' | 'refused', body: Block[]) =>
    offer('x10-calendar-' + id, label, hint, 'paper', (x) => {
      setKey(x, 'exec.calendar', value);
      setKey(x, 'exec.celeste10', { gave: 'trusted', doctored: 'fooled', refused: 'refused' }[value]);
      note(x, 'x-order', `Celeste Laurent asked Evelynn for Julian Mercer’s calendar, the week ahead, every Friday, on a black phone with one contact. She ${{ gave: 'agreed', doctored: 'agreed, and meant to send a week with one lie in it', refused: 'refused' }[value]}.`, 'Celeste Laurent, in person');
      return body;
    });
  return [
    c('give', 'Take the phone. Say yes.', 'His week, every Friday. It is only a diary.', 'gave', [
      p('You pick up the phone and put it in your bag, and say yes, and she touches the back of your hand, once, lightly, the way you would thank a waiter who had been very good.'),
      q('Celeste Laurent', 'Thank you, darling. You’ve no idea how much trouble this will save him.'),
    ]),
    c('doctor', 'Take the phone. Say yes. Mean something else.', 'A true-looking week with one lie in it.', 'doctored', [
      p('You pick up the phone and say yes, and let her see you hesitate first, a little, the way she would expect a woman to hesitate who was about to give her a man’s week.'),
      t('She shall have his week. Every Friday. Perfect in every particular but one.'),
    ]),
    c('refuse', '“His calendar is his.”', 'Leave the phone on the table.', 'refused', [
      q('You', 'His calendar is his, Mrs Laurent.'),
      q('Celeste Laurent', 'Of course it is, darling.'),
      p('She puts the phone in your coat pocket anyway, as you go, the way you would tuck a scarf into a child’s collar. You find it there at noon.'),
    ]),
  ];
}

// ── The paper ──

function paperBlocks(s: GameState): Block[] {
  return [
    p('By noon the City pages have it: a photograph, taken from somewhere you never saw a camera, of the two of you ' + (summoned(s) ? 'at the small table by the window on forty-one' : 'at the Lindqvist, under the lamps') + ', her hand on your wrist, both of you laughing at something neither of you said. The caption: OLD MONEY, NEW BLOOD. CELESTE LAURENT AND HELIX’S NEW CHIEF OF STAFF.'),
    t('She has put her arm round me in front of the whole city. Anybody I tell now will have seen this first.'),
    p('At ten past twelve Julian is in your doorway with the paper folded to the photograph, and his glasses off.'),
    q('Julian Mercer', 'You didn’t tell me you knew Celeste Laurent.'),
    ...(key(s, 'exec.file') === 'told' ? [p('And then, quietly, to the photograph more than to you: “Laurent.” He doesn’t say Laurent Sovereign Fund. He doesn’t have to.')] : []),
  ];
}

function paperChoices(): C10Choice[] {
  const pc = (id: 'old' | 'work' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('x10-paper-' + id, label, hint, 'week', (x) => {
      setKey(x, 'exec.paper10', id);
      return body;
    });
  return [
    pc('old', '“She knew me before. Before all this.”', 'True, as far as it goes.', [
      q('You', 'She knew me before. Before all this.'),
      p('It is true, and it frightens him a little, you can see it: not of you. For you.'),
      q('Julian Mercer', 'Then be careful. Everybody I know is afraid of her, and not one of them can tell me why.'),
    ]),
    pc('work', '“She wanted to meet Helix’s new chief of staff.”', 'Everyone does.', [
      q('You', 'She wanted to meet Helix’s new chief of staff. Everyone does, apparently.'),
      p('He laughs, and believes it, and you watch him believe it, and it is one of the worst things you have ever watched.'),
    ]),
    pc('quiet', '“It was breakfast.”', 'Nothing more.', [q('You', 'It was breakfast.'), p('He nods, and does not ask again, and goes back to his office. That is worse.')]),
  ];
}

// ── The week ──

function weekBlocks(s: GameState): Block[] {
  const a = answer(s);
  const week: Block[] =
    a === 'gave'
      ? [
          p('Friday, six o’clock. His week, open on your screen: the board prep, the Morel & Cie call on Thursday, the dentist he keeps cancelling, lunch with a man from the Treasury he likes and pretends not to. You photograph it with the black phone, and send it, and it takes four seconds.'),
          q('C.', 'Thank you, darling.'),
          t('Four seconds. I timed it without meaning to.'),
        ]
      : a === 'doctored'
        ? [
            p('Friday, six o’clock. His week, open on your screen. You copy it, perfectly, every meeting and every room, and move one thing in the copy and not in the diary: Thursday’s call with Morel & Cie, from the small boardroom at ten to the large one at eleven. You photograph the copy with the black phone, and send it.'),
            q('C.', 'Thank you, darling.'),
            p('On Thursday at five to eleven, walking back from the small boardroom with Julian and a finished call, you pass the large one, and Marcus Chen is outside it, alone, with a folder under his arm, checking his watch.'),
            t('Well. Now I know which of them reads her Fridays.'),
          ]
        : [
            p('On Tuesday a small L.S.F. facility on a shipping line in Gdańsk is called in early, for no reason anybody can find. It is nothing to Helix. It is a week of Julian’s life: calls at midnight, a flight at dawn, a lawyer in Warsaw, his tie in his pocket.'),
            p('He never learns why. You know exactly why.'),
            q('C.', 'That was a small one, darling. Friday?'),
          ];
  return [
    ...week,
    p('And on the Friday, in his diary, which is yours to run, an entry you did not make, in a hand you know now:'),
    q('His diary', 'Helix Group. The Vesper. The first Thursday. — and do bring your chief of staff. C.L.'),
    q('Julian Mercer', 'I’ve never been asked to the Vesper before. Eleven years. Apparently I am now. Will you come?'),
  ];
}

function weekChoices(): C10Choice[] {
  return [
    offer('x10-week-yes', '“I’ll come.”', 'The first Thursday.', 'night', (x) => {
      note(x, 'x-vesper', 'Helix Group, and Evelynn by name as “your chief of staff”, are invited to the Vesper on the first Thursday, by C.L., in Julian Mercer’s own diary.', 'Julian Mercer’s diary');
      return [q('You', 'I’ll come.'), q('Julian Mercer', 'Good. I’d rather not walk into that room on my own. I don’t know why. I think I do.')];
    }),
  ];
}

// ── The night ──

const scopeReply: Record<'no-sex' | 'sex', string> = {
  'no-sex': 'Then that’s tonight. You set the edge. I’m glad of whatever side of it I’m on.',
  sex: 'Yes. And you say stop, it stops. The same for me. Still the only term I have.',
};

function nightChoices(s: GameState): C10Choice[] {
  const open = get10(s, 'x-night-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x10-julian-' + id, label, hint, 'night', (x) => {
        set10(x, 'x-night-open', 'julian-room');
        set10(x, 'x-night-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x10-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c10.x-night-open'];
        set10(x, 'x-night-outcome', 'declined');
        return [p('You say goodnight at his door, and he says it back, and you both mean it, and you go home with the black phone in your bag like a stone.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get10(s, 'x-night-scope') as 'no-sex' | 'sex';
    return [
      offer('x10-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c10.x-night-open'];
        set10(x, 'x-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and calls Hal, and walks you down.')];
      }),
      offer('x10-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c10.x-night-open'];
        set10(x, 'x-night-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [p('He undresses you as if he had been thinking about the order of it all week, and says your name, and asks once more, and you answer by pulling him down onto the bed, and for a few hours the only diary either of you keeps is each other.'), p('What happens next stays on the forty-first floor. The scene fades.')]
          : [p('He kisses you on the sofa with the city on, for a long time, and stops exactly where you said, and falls asleep with his hand in your hair, and you lie awake and listen to him breathe, and to the black phone not ringing.')];
      }),
    ];
  }
  return [
    offer('x10-night-julian', 'Go up to him', 'Friday night, forty-one.', 'night', (x) => {
      set10(x, 'x-night', 'julian');
      set10(x, 'x-night-open', 'julian');
      return [
        p('Friday night, the forty-first floor. He cooks, badly, and talks about the Vesper as if it were a school he had never been allowed into.'),
        ...(answer(x) === 'gave' ? [p('At six minutes past seven, in your bag on the chair by his table, the black phone buzzes once. He doesn’t hear it. You do. You let it.')] : []),
        q('Julian Mercer', 'Tell me what you want tonight, and that’s what happens.'),
      ];
    }),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          offer('x10-night-maya', 'Go to Maya’s', 'She will see the phone before you sit down.', 'complete', (x) => {
            set10(x, 'x-night', 'maya');
            return [
              p('Maya’s kitchen, the cat, the cheap good wine. She sees the black phone the moment you put your bag down.'),
              q('Maya', 'That’s not your phone. Whose leash is that?'),
              p('You tell her some of it. She listens to all of it, including the parts you leave out.'),
            ];
          }),
        ]
      : []),
    offer('x10-night-alone', 'Go home alone', 'Chapter 10 ends here.', 'complete', (x) => {
      set10(x, 'x-night', 'alone');
      return [p('You go home, and put the black phone on the kitchen table face down, like his photograph, and sit looking at the back of it for a long time.')];
    }),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(get10(s, 'x-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The orchid on your desk on forty-one will have opened its last flower by now. You find you do not want to see it.')] : []),
    p('The wardrobe door. Above JULIAN MERCER, above the question in pencil and the two columns, you pin a new card, at the very top, and have to stand on the bed to do it.'),
    q('The card', 'CELESTE LAURENT. “HE’S A LOVELY MAN.”'),
    p('And under it, smaller, in your hand:'),
    q('The card', a === 'gave' ? 'HIS CALENDAR: GIVEN. EVERY FRIDAY. FOUR SECONDS.' : a === 'doctored' ? 'HIS CALENDAR: DOCTORED. MARCUS OUTSIDE THE WRONG ROOM.' : 'HIS CALENDAR: REFUSED. GDAŃSK. HE NEVER KNEW.'),
    t(
      a === 'refused'
        ? 'She made him pay for my no, and made sure I watched. That was the lesson. I learned it. I am not sure it is the one she meant.'
        : 'She wanted where he will be. I gave her where he will be. Every Friday I will have to decide again whether that is all I gave her.',
    ),
  ];
}

export function executiveBlocks10(s: GameState): Block[] {
  if (s.phase === 'orchid') return orchidBlocks();
  if (s.phase === 'lindqvist') return lindqvistBlocks(s);
  if (s.phase === 'calendar') return calendarBlocks(s);
  if (s.phase === 'paper') return paperBlocks(s);
  if (s.phase === 'week') return weekBlocks(s);
  if (s.phase === 'night') return [p('Friday night. Forty-one empties from the lifts outward.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices10(s: GameState): C10Choice[] {
  if (s.phase === 'orchid') return orchidChoices();
  if (s.phase === 'lindqvist') return lindqvistChoices();
  if (s.phase === 'calendar') return calendarChoices();
  if (s.phase === 'paper') return paperChoices();
  if (s.phase === 'week') return weekChoices();
  if (s.phase === 'night') return nightChoices(s);
  return [];
}
