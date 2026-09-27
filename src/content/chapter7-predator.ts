/** Chapter 7 (Predator route, lane id `predator`) · The Offer:
 * summons → office → terms → corridor → floor → evening → complete.
 * Design: docs/story/PREDATOR_CHAPTER_7_THE_OFFER_DESIGN.md (owner-approved 2026-09-27, all seven decisions as
 * recommended); route: docs/story/PREDATOR_ROUTE_DESIGN.md; script: docs/story/scripts/PREDATOR_CHAPTER_7_SCRIPT.md.
 * Reached from the Chapter 7 confirm beat when the road is `predator`; the chapter then hands on to the shared Chapter 9
 * bridge like the other unbuilt Act II roads. Marcus Chen sends for her with Mr Pryce at the wheel (a driver "a fund
 * lends out": the Helix–Meridian link is seeded, never stated). What she wants (money | title | his desk), the three
 * clauses she writes into her own contract (each a later lever), Julian in the corridor, the first lever (the
 * Chapter 1 Novagen report with Benton's name on her work and a director's early countersignature, left in her pack
 * by Marcus to see what she would do), and a chosen evening (Marcus or Julian, heat 3, consent-gated, fades), or the
 * contract alone. She never sexually coerces anyone; her weapons are secrets, leverage and charm.
 * Deepening pass (2026-09-27): a beat in Marcus's office before "What do you want?" (c7.p-view = window | notes | sit:
 * the buildings Helix owns and the man who cried; his pencil in the margin, "She will want more. Give it to her
 * slowly."), and a second beat on her floor after the lever (c7.p-visit = charm | ink | busy: Anthony Hollis, the
 * director whose countersignature is in the different ink, comes to welcome her; pred.hollis), with more of the
 * morning, the floor and the evening. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get5 } from './chapter5-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';

export const PREDATOR_PHASES7 = ['summons', 'office', 'terms', 'corridor', 'floor', 'evening'] as const;
export const isPredator7 = (s: GameState) => getKey(s, 'route.lane') === 'predator';
export const predatorPhase7 = (s: GameState) => isPredator7(s) && ((PREDATOR_PHASES7 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const c = (s: GameState, k: string) => s.choices[k];
const cash = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);
type Partner = 'marcus' | 'julian';
const who: Record<Partner, string> = { marcus: 'Marcus Chen', julian: 'Julian Mercer' };
const julianOpen = (s: GameState) => c(s, 'c6.friction-julian') !== 'cooled' && get7(s, 'p-julian') !== 'lie';

/** Display-only place lines for the open evening. */
export function placePredator7(s: GameState): string | undefined {
  const open = get7(s, 'p-evening-open');
  if (s.phase === 'evening' && open) return open.startsWith('marcus') ? 'Late · Marcus’s apartment, above the river' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The summons ──

function summonsBlocks(s: GameState): Block[] {
  return [
    p('A week after the room, at half past eight in the morning, a car is waiting at the kerb that you did not order: long, black, the engine running, rain beading on the roof. The driver is standing beside the rear door with an umbrella he is not using for himself.'),
    p('You had dressed before the car came, without deciding to: the fitted black, the heels you can walk fast in, your hair up and pinned hard. You notice that now, on the pavement, and understand that some part of you knew there would be somebody to dress for.'),
    p('He is fifty or so, in a grey coat, with the patient stillness of a man who has waited outside a great many buildings. He holds out a card between two fingers, the way you would hand somebody a ticket.'),
    q('The card', 'Nine o’clock. Helix, the thirty-eighth floor. Come as you like. — M.C.'),
    q('Driver', 'Mr Chen’s compliments, Ms Vale. Pryce. I’m to take you whenever you’re ready, and to wait if you’re not.'),
    t(
      c(s, 'c3.memo') === 'retain'
        ? 'Marcus Chen. I kept his note about my “willingness” in a drawer instead of correcting it. I wondered when he would notice that I had. It seems he has.'
        : 'Marcus Chen. The man who watched me leave the Glass House as if he were memorising the way I walked. He has sent a car. Men like Marcus do not send cars for people they intend to ignore.',
    ),
  ];
}

function summonsChoices(): C7Choice[] {
  const ride = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('car-' + id, label, hint, 'office', (x) => {
      set7(x, 'p-car', id);
      return [...body, ...officeArrival];
    });
  return [
    ride('ask', 'Ask the driver who he works for', 'Before you are in anyone’s office.', [
      p('You get in. The car smells of leather and, very faintly, of somebody else’s perfume: something green and expensive.'),
      q('You', 'Do you work for Mr Chen, Mr Pryce?'),
      p('His eyes find yours in the mirror, and go back to the road.'),
      q('Pryce', 'This week, Ms Vale. I’m lent out. There’s a fund that keeps a few of us on its books, and lends us where we’re useful. I go where the fund sends me. It generally sends me to interesting people.'),
      t('A fund that lends out drivers. I will remember that. I am beginning to remember everything.'),
    ]),
    ride('read', 'Read the card again', 'There is something on the back.', [
      p('You get in and turn the card over. On the back, in pencil, in a small, fast, slanting hand, somebody has copied out one line of the terms you held Julian’s room to a week ago, word for word, and underlined it twice.'),
      t('He has read my terms. He has read them closely enough to quote them to me. Either this is a compliment, or it is a warning, and with Marcus Chen I suspect the difference is only one of timing.'),
    ]),
    ride('quiet', 'Get in and say nothing', 'Let the city go by.', [
      p('You get in and say nothing, and the city goes by in the rain, grey and gold and indifferent, and you let it.'),
    ]),
  ];
}

// ── The office ──

const officeArrival: Block[] = [
  p('Helix’s thirty-eighth floor is quieter than the rest of the building, the way money is quieter than the rest of the world. Thick carpet, pale wood, a receptionist who stands when you come out of the lift and does not ask your name.'),
];

function officeBlocks(s: GameState): Block[] {
  const memo = c(s, 'c3.memo');
  return [
    p('Marcus Chen’s office is a corner of glass above the river, with a desk too large to be anything but a statement and nothing on it but a single folder and a fountain pen. He is standing at the window when you come in: lean, early forties, silver at both temples, shirtsleeves rolled twice, as if he has been working since six and would like you to know it without saying so.'),
    p('He turns, and looks at you for exactly as long as he looked at you across the room at the Glass House, and then he smiles, and the smile arrives a moment after his eyes have finished.'),
    q(
      'Marcus Chen',
      memo === 'retain'
        ? 'You never corrected my note. “Willingness to explore an advisory relationship.” Everyone corrects my notes. You put it in a drawer. I noticed.'
        : memo === 'allow'
          ? 'You let my note stand. “Willingness to explore an advisory relationship.” Most people argue with my wording. You let it sit there and do its work.'
          : memo === 'correct'
            ? 'You corrected my note. Precisely, and in writing, to both recipients. Nobody corrects me in writing. I had it framed. Not really. I thought about it.'
            : 'We have not properly met. You left my party early and my company’s money in your pocket. I have been curious ever since.',
    ),
    ...(s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn'
      ? [q('Marcus Chen', 'And you walked out of the Glass House with something that did not belong to you. I don’t know what. I know the shape of the gap it left. I rather admired it.')]
      : []),
    ...(get5(s, 'published') ? [q('Marcus Chen', 'I have seen your face on the side of a bus. It is an asset. I would like it on my side of the table.')] : []),
    p('He opens the folder. Inside are the terms you held Julian’s workroom to, a week ago, printed out, annotated in the same small slanting pencil, with more notes in the margins than there are lines of text.'),
    q('Marcus Chen', 'You took Julian’s room and made it obey its own paperwork, and then you took more of it, on purpose, and let him watch you do it. Julian thinks that was trust. I know what it was. I would like to hire it.'),
    q('Marcus Chen', 'Special projects. Reporting to me. Access to anything I can see, which is most things. A salary you will not have to ask for twice.'),
    p('He lets the offer sit on the desk between you, and goes back to the window, and waits, the way a man waits who has never once in his life been the first to speak after naming a price.'),
  ];
}

const wantPrompt: Block[] = [
  p('He sits down behind the enormous desk, and puts the pen down on the folder between you, and leans back.'),
  q('Marcus Chen', 'So. Before we talk about the paperwork. What do you want?'),
  t('Nobody has asked me that since the clinic. Nobody has ever asked Adrian that at all. He is watching my face while I decide, and he is enjoying it.'),
];

/** Before the question (deepening pass): the window, his margin notes, or the chair. */
function viewChoices(): C7Choice[] {
  const v = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('view-' + id, label, hint, 'office', (x) => {
      set7(x, 'p-view', id);
      return [...body, ...wantPrompt];
    });
  return [
    v('window', 'Join him at the window', 'Stand beside him. See what he sees.', [
      p('You get up and go and stand beside him at the glass, close enough that your sleeves almost touch, and look down at the river and the city on either side of it.'),
      q('Marcus Chen', 'That one. With the green roof. Helix bought it from a man who built it with his father and cried in this office when he signed. I gave him a handkerchief. He kept it. That one, with the cranes, we are buying from people who do not know yet that they are selling. And that one, by the bridge, I would like very much, and cannot have, which is the only reason I still get up in the morning.'),
      p('He says all of it without looking at you, and then, at the end, he does, sideways, as if checking whether you had flinched. You had not.'),
      t('He is showing me his collection. He wants to know whether I want to be in it, or whether I want the key to the cabinet.'),
    ]),
    v('notes', 'Read his margin notes, upside down', 'He is not the only one who can.', [
      p('You stay where you are and read the folder upside down while his back is turned: the pencil notes in the margins of your own terms, small and slanting and fast. Clever. Too clever for Julian. And against your clause about the deepening, underlined once: She will want more. Give it to her slowly.'),
      p('When he turns round from the window, you are looking at the view, and he looks at the folder, and at you, and you watch him understand exactly what you have just done.'),
      q('Marcus Chen', 'Upside down. Of course you can.'),
      t('Give it to her slowly. He has a plan for my appetite. So do I.'),
    ]),
    v('sit', 'Sit, and let him wait', 'Two people who never speak first.', [
      p('You sit, and cross your legs, and say nothing at all. The silence goes on long enough for a lift to arrive and leave somewhere behind the wall. In the end it is Marcus who turns round, and he is smiling.'),
    ]),
  ];
}

function officeChoices(): C7Choice[] {
  const want = (id: 'money' | 'title' | 'desk', label: string, hint: string, body: Block[]) =>
    offer7('want-' + id, label, hint, 'terms', (x) => {
      set7(x, 'p-want', id);
      setKey(x, 'pred.want', id);
      return [...body, ...termsLead];
    });
  return [
    want('money', '“Enough money that nobody can starve me into anything again.”', 'The honest answer. He will respect it.', [
      q('You', 'Money. Enough that nobody can starve me into anything again. Not you, not Axiom, not anybody.'),
      p('He nods slowly, as if you had named a wine he approved of.'),
      q('Marcus Chen', 'Good. People who want money are the easiest people in the world to trust, because they always tell you their price. Let’s make yours a number.'),
    ]),
    want('title', '“A name on a door. Mine.”', 'Standing. The thing Adrian never got.', [
      q('You', 'A title. A name on a door, and it has to be mine. Not borrowed, not on loan from a fund, not written under somebody else’s.'),
      p('Something moves in his face: not amusement. Recognition.'),
      q('Marcus Chen', 'I had a boss once who took my name off everything I wrote for six years. I have his office now. Doors are very achievable. I’ll put you on one by Christmas.'),
      t('Benton. Thirty-eight reports. He cannot know that. He knows the shape of it, the way he knew the shape of the gap at the Glass House.'),
    ]),
    want('desk', '“Yours.”', 'The most dangerous answer in the room. And the most fun.', [
      q('You', 'Yours.'),
      p('For one second the office is completely silent. Then Marcus Chen laughs: a real laugh, surprised out of him, the first thing you have seen him do that he did not plan.'),
      q('Marcus Chen', 'Nobody has ever said that to my face. They think it. They say it in lifts. God, I’m going to enjoy this.'),
      p('He does not say no. You notice that he does not say no.'),
      q('Marcus Chen', 'Then you had better be very good, because I intend to keep it. Let’s write you a contract you can climb.'),
    ]),
  ];
}

// ── The terms ──

const termsLead: Block[] = [
  p('He pushes a contract across the desk: two pages of standard Helix paperwork, and a third page, completely blank except for the words ADDITIONAL TERMS at the top and a line for two signatures at the bottom.'),
  q('Marcus Chen', 'Three clauses. Your words, not my lawyers’. I’ll sign the first three you give me, whatever they are, so choose them the way you’d choose weapons. I would.'),
  t('He is giving me the pen and the page. He is also watching which three I choose, and he will learn more about me from them than from anything I could say. Fine. Let him learn.'),
];

const clauses: [id: string, label: string, hint: string, text: string, reply: string][] = [
  ['exit', 'The door: walk with ninety days’ pay', 'No questions, no references withheld. A way out you do not have to ask for.', 'The Employee may terminate this agreement at any time, for any reason or none, with ninety days’ salary in lieu of notice, and Helix shall neither question the decision nor withhold references.', 'A woman who writes her exit first. You’ve been trapped before. Signed.'],
  ['access', 'The archive: Novagen and every legacy acquisition', '“For context.” Everything Helix has bought, and how.', 'The Employee shall have unrestricted read access to the Novagen file and to the records of every legacy acquisition, for context.', '“For context.” That word is doing a great deal of lifting. Signed, with admiration.'],
  ['report', 'The line: report to Marcus alone', 'Not to his board. Not to his friends.', 'The Employee reports to M. Chen alone, and not to the Helix board, its committees, or any associate of either.', 'Just me. You want to be my secret. Or you want me to be yours. Signed. We’ll find out which.'],
  ['indemnity', 'The shield: Helix covers what you do for it', 'Anything done in good faith on the company’s behalf.', 'Helix shall indemnify the Employee against any claim arising from acts done in good faith on the company’s behalf.', 'You intend to do things that need indemnifying. How wonderful. Signed.'],
  ['private', 'The line he cannot cross: your life and your face are yours', 'No exclusivity. Your evenings, your image, your own.', 'The Employee’s private life, image and likeness remain her own, and nothing in this agreement grants Helix any claim upon them.', 'Your face stays yours. Of course it does. Signed, and I mean it.'],
];

function termsChoices(s: GameState): C7Choice[] {
  const taken = Number(get7(s, 'p-clauses') ?? 0);
  return clauses
    .filter(([id]) => !getKey(s, 'pred.clause.' + id))
    .map(([id, label, hint, text, reply]) =>
      offer7('clause-' + id, label, hint, taken + 1 >= 3 ? 'corridor' : 'terms', (x) => {
        setKey(x, 'pred.clause.' + id);
        set7(x, 'p-clauses', String(taken + 1));
        const body: Block[] = [
          p(taken === 0 ? 'You uncap the pen. You write slowly, in capitals, the way Adrian wrote the things he wanted to be able to read at three in the morning.' : 'The second line goes down faster than the first. You are getting a taste for this.'),
          q('Clause ' + (taken + 1), text),
          p('Marcus reads it upside down as you write it, which is a skill you did not expect him to have, and which you file away.'),
          q('Marcus Chen', reply),
        ];
        if (taken + 1 < 3) return body;
        const advance = get7(x, 'p-want') === 'money' ? 3000 : 1500;
        setKey(x, 'own.cash', String(cash(x) + advance));
        note7(x, 'p-contract', `Evelynn signed with Helix: special projects, reporting to Marcus Chen, with three clauses in her own words (${clauses.filter(([k]) => getKey(x, 'pred.clause.' + k)).map(([k]) => k).join(', ')}). Signing advance $${advance}.`, 'The contract on Marcus Chen’s desk, signed by both');
        return [
          ...body,
          p('He signs all three pages without reading the first two, in a hand that is much larger than the pencil in the margins, and slides the contract back to you, and then, after a moment, the pen as well.'),
          q('Marcus Chen', 'Keep it. You’ll want to sign things.'),
          p('HR sends a signing advance to your account before you have reached the lift. You watch the number arrive on your phone and find that your hand is perfectly steady.'),
          t('Three clauses. Three knives in the table. He saw every one of them go in, and he signed them anyway, which means he thinks he is holding the handle. We will see.'),
        ];
      }),
    );
}

// ── The corridor ──

function corridorBlocks(s: GameState): Block[] {
  const julian = c(s, 'c6.friction-julian');
  return [
    p('The executive corridor is long and glass on one side, the river below it the colour of old pewter. Halfway along it, walking the other way with a folder under his arm, turning one cufflink the way he does when a meeting has gone badly, is Julian Mercer.'),
    p('He sees you. He sees where you have come from. He sees the contract in your hand, and the pen, which is not your pen, and something in his face goes very quiet.'),
    q(
      'Julian Mercer',
      julian === 'warmed'
        ? 'I thought, when you took the room, that you were taking it from me. I didn’t mind. I thought it meant something. Marcus’s pen, though. That I mind.'
        : julian === 'cooled'
          ? 'You asked me for quiet. I gave it to you. I didn’t realise you wanted it so you could hear Marcus better.'
          : 'Marcus found you, then. Or you found him. With the two of you I don’t suppose it matters which.',
    ),
    q('Julian Mercer', 'Do you know what he does with people like you? He buys them, and keeps what’s useful, and sells the rest. He’ll eat you.'),
  ];
}

function corridorChoices(s: GameState): C7Choice[] {
  const cooled = c(s, 'c6.friction-julian') === 'cooled';
  const answer = (id: 'truth' | 'lie' | 'past', label: string, hint: string, stance: string, body: Block[]) =>
    offer7('julian-' + id, label, hint, 'floor', (x) => {
      set7(x, 'p-julian', id);
      setKey(x, 'pred.julian', stance);
      return body;
    });
  return [
    answer('truth', '“He’ll try. I’m going to take his company.”', 'The truth, to the one man who might understand it.', cooled ? 'rival' : 'ally', [
      q('You', 'He’ll try. I’m going to take his company, Julian.'),
      p('Julian looks at you for a long time. Then, very slowly, he lets go of the cufflink, as if he had finally decided what the meeting was about.'),
      q('Julian Mercer', cooled ? 'Then I hope you’re as good as you think you are. Because I won’t be standing between you and him when he finds out.' : 'Then take it well. And when you have it, remember who told you he eats people.'),
      t(cooled ? 'He will not help me. He will not stop me either. That is more than most people get from Julian Mercer.' : 'He is on my side. I do not know yet whether that is the best thing that has happened to me this week or the most dangerous.'),
    ]),
    answer('lie', '“It’s a job, Julian.”', 'Keep him out of it. He will find out.', 'casualty', [
      q('You', 'It’s a job, Julian. That’s all it is.'),
      p('He nods, the way a man nods at a figure he knows has been fiddled and has decided, for now, not to query.'),
      q('Julian Mercer', 'Of course it is.'),
      p('He goes on down the corridor. He does not look back, which with Julian is how you know he is thinking about you.'),
      t('That was a lie, and he knew it, and he let me tell it. He will remember that he let me.'),
    ]),
    answer('past', 'Walk past him', 'Say nothing. Let the pen say it.', 'rival', [
      p('You walk past him without a word, close enough that your sleeve almost brushes his, with Marcus’s pen in your hand where he can see it.'),
      p('Behind you, after a long moment, you hear his footsteps go on down the corridor, slower than they were.'),
      t('I did not need to say anything. The pen said it. I wonder how long it will take him to forgive me, and whether I will want him to.'),
    ]),
  ];
}

// ── The floor, and the first lever ──

function floorBlocks(s: GameState): Block[] {
  return [
    p('Special projects turns out to be a corner office of your own on the thirty-sixth floor, two below Marcus: glass on two sides, a desk nobody has used, a plant somebody has watered, and a lanyard on the desk with your photograph already printed on it and a title under your name that did not exist yesterday.'),
    ...(get7(s, 'p-want') === 'title' ? [t('A name on a door. It took him four hours, not until Christmas. I would like to know who was sitting here yesterday.')] : []),
    p('You stand in the doorway for a moment before you go in. Through the glass the whole floor is working: heads down, phones, somebody laughing too loudly at something a senior person said. Three of them look up at you. One of them looks away too fast. You file her.'),
    p('The onboarding pack is a black leather folder: policies, passwords, a map of the building that is mostly out of date, and a welcome letter from HR that uses your name three times as if to convince itself.'),
    p('And, at the back, behind the fire regulations, a file that should not be there at all.'),
    p('You know it before you have finished opening it. You wrote it. The Novagen acquisition risk note, the one Benton carried to your desk on the morning of the promotion that went to Priya. Your analysis, your conclusion, your careful paragraph about the missing renewal date. And across the top, where your name should be, in the Axiom distribution line: E. BENTON, DIRECTOR.'),
    p('Below it, on the Helix side, a countersignature. A Helix director, approving the acquisition in principle, dated eleven days before Maya’s compliance team cleared it as routine.'),
    t('My work, with his name on it. And a Helix director who signed before he was allowed to. Somebody put this in my pack on my first day. Somebody wanted to see what I would do with it.'),
  ];
}

/** The visitor (deepening pass): the director whose countersignature is in the different ink. */
function visitChoices(): C7Choice[] {
  const v = (id: string, label: string, hint: string, stance: string, body: Block[]) =>
    offer7('visit-' + id, label, hint, 'evening', (x) => {
      set7(x, 'p-visit', id);
      setKey(x, 'pred.hollis', stance);
      return body;
    });
  return [
    v('charm', 'Charm him', 'Let him think he is welcoming you.', 'charmed', [
      p('You give him the smile, the Glass House one, and ask him about the photograph on his lanyard, which is of a sailing boat, and he tells you about the boat for four minutes, and then, because you have let him, about Marcus.'),
      q('Anthony Hollis', 'He likes to test people, you know. First week. Leaves something lying about to see what they do with it. I failed mine. I’ve been here nine years anyway. Don’t take it personally.'),
      t('He failed his. I wonder what they left lying about for him, and whether it was his own signature.'),
    ]),
    v('ink', 'Mention the ink, lightly', 'Watch what happens to his face.', 'warned', [
      q('You', 'I was reading the Novagen file. Someone’s countersignature is in a different ink from the rest of the page. Isn’t that funny? As if they’d gone back and added it.'),
      p('Anthony Hollis does not stop smiling. That is how you know. The smile simply stays on his face, exactly where it was, while the rest of him goes somewhere else entirely, and his hand on the door frame goes white at the knuckles.'),
      q('Anthony Hollis', 'Is it? How odd. Well. Welcome to Helix.'),
      p('He goes. He does not look back. You count to ten, and then you hear, two offices down, a door shut rather harder than doors shut on this floor.'),
      t('That was a lever. I have just pulled it an inch to see if it moves. It moves. Now he knows I have it, which is dangerous, and he knows I am willing, which is better.'),
    ]),
    v('busy', 'Tell him you’re settling in', 'Polite. Busy. Let him go.', 'unaware', [
      p('You thank him, and say you are still settling in, and he says of course, of course, and goes.'),
    ]),
  ];
}

const visitLead: Block[] = [
  p('At four there is a knock on the glass. A man of sixty in a very good suit and a regimental tie, silver-haired and pink-cheeked, with the easy manners of somebody who has been welcoming people to this floor for a long time.'),
  q('Anthony Hollis', 'Anthony Hollis. Commercial. Thought I’d say hello to the new blood. Marcus says you’re frightening. I said good, we could use some.'),
  p('You know his initials before he has finished saying his name. You have been looking at them all afternoon, in a different ink.'),
];

function floorChoices(): C7Choice[] {
  const lever = (id: 'read' | 'copy' | 'return', label: string, hint: string, body: Block[]) =>
    offer7('lever-' + id, label, hint, 'floor', (x) => {
      set7(x, 'p-lever', id);
      setKey(x, 'pred.lever', id);
      note7(
        x,
        'p-novagen',
        id === 'return'
          ? 'Evelynn’s first-day pack held the Chapter 1 Novagen risk note, her work under E. Benton’s name, countersigned by a Helix director eleven days before Axiom compliance cleared the deal. She returned it to HR, who said it came from Marcus Chen’s office.'
          : 'Evelynn’s first-day pack held the Chapter 1 Novagen risk note, her work under E. Benton’s name, countersigned by a Helix director eleven days before Axiom compliance cleared the deal.' + (id === 'copy' ? ' She photographed it.' : ''),
        'The black onboarding folder, Helix, 36th floor',
      );
      return [...body, ...visitLead];
    });
  return [
    lever('read', 'Read it, twice', 'Every line. The one somebody hoped nobody would read twice.', [
      p('You read it twice, the way you always did, and on the second pass you find it: the director’s countersignature is in a different ink from the rest of the Helix page, as if it had been added later, to a document that was already finished.'),
      t('Somebody signed early and then went back to make it look as if they had signed on time. That is not a mistake. That is a habit.'),
    ]),
    lever('copy', 'Photograph it', 'Every page, on your own phone.', [
      p('You photograph every page on your own phone, not the monitored one, with your back to the glass wall, and then put the file back behind the fire regulations exactly as you found it.'),
      t('A lever is only a lever if you can still hold it tomorrow.'),
    ]),
    lever('return', 'Take it back to HR', 'Hand it in. See who put it there.', [
      p('You take the whole folder down to HR and put the file on the counter and say, pleasantly, that it seems to have been included by mistake.'),
      p('The woman at the counter looks at it, and at the routing slip clipped to the back, and goes a little pink.'),
      q('HR', 'Oh. It came up from Mr Chen’s office this morning. Personally. I assumed you’d asked for it.'),
      t('Marcus. He put my own work in my pack, with a crime stapled to it, on my first day, to see whether I would read it, use it, or give it back. I have just given him his answer. I am not sure yet whether it was the right one, and neither, I think, is he.'),
    ]),
  ];
}

// ── The evening ──

const invite: Record<Partner, Block[]> = {
  marcus: [
    p('At eight a message arrives on your own phone, the private one, which you did not give him: “Dinner. No business. I’m told I’m tolerable company when I’m not buying anything. — M.”'),
    p('He cooks, which you did not expect: badly and with great confidence, in a kitchen with a view of the whole river, sleeves rolled, talking the entire time about a company in Rotterdam he nearly bought and is glad he didn’t. He pours you a glass of something very old and very good and does not tell you what it cost, which is how you know it cost a great deal.'),
    p('Later, by the window, with the city laid out below like a balance sheet, he stops talking. You have not seen him stop talking before.'),
    q('Marcus Chen', 'I want to be very clear, because I like clarity. You work for me. That has nothing to do with this, and if you walk out of that door now it will have nothing to do with tomorrow. I don’t buy this. I never have. Tell me what you want tonight, and that’s what happens.'),
    t('Two people who both know exactly what the other is. It is the most honest room I have been in since the clinic.'),
  ],
  julian: [
    p('At nine a message from Julian: “I was unkind in the corridor. I’d like to be kind instead, if you’ll let me. No business. No Marcus.”'),
    p('The apartment on the forty-first floor. He opens the door with his tie off and his cuffs undone, and looks at you for a long moment, a man who knows exactly whose pen you were carrying this morning and has asked you here anyway.'),
    q('Julian Mercer', 'Tell me what you want tonight. Only tonight. Tomorrow you can go back to taking over the world.'),
  ],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  marcus: { 'no-sex': 'Then that is the evening, and I will enjoy every minute of it. You say stop, I stop.', sex: 'Yes. And you say stop, it stops. The same rule applies to me, and I will use it if I need to.' },
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
};
const stay: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  marcus: {
    'no-sex': [p('He kisses you by the window, slowly, as if he were reading terms he meant to keep, and stops exactly where you told him to, and holds you there with the whole river behind you, and laughs quietly against your hair when you tell him he is a terrible cook.')],
    sex: [
      p('He undoes the dress slowly, the way he reads a contract, and says out loud what he likes about what he finds, and asks once more, with his mouth at your shoulder, whether you are sure. You answer by drawing him toward the bedroom.'),
      p('What happens next is yours and his, two people who both like to win, and it stays above the river. The scene fades.'),
    ],
  },
  julian: {
    'no-sex': [p('He kisses you against the glass with the whole city behind you and stops exactly where you tell him to, and holds you there, his hand warm on your back, for a very long time, and does not say Marcus’s name once.')],
    sex: [
      p('The dress goes, and his shirt, and the corridor this morning goes with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'),
      p('What happens next stays on the forty-first floor. The scene fades.'),
    ],
  },
};

function eveningBlocks(): Block[] {
  return [
    p('By seven you are home, with the contract on the kitchen table and Marcus’s pen beside it, and the city going dark outside the window, one lit floor at a time.'),
    p('You kick your shoes off in the hall and stand in the kitchen in your stockings with a glass of wine you have not tasted yet, and find that your whole body is humming, the way it did at the Glass House: not fear. Something with fear inside it, like a stone in a peach.'),
    t('This morning I was a woman with a week-old decision and a car she did not order. Tonight I have a salary, an office, three knives in a contract and a crime in a folder. It has been a very productive day.'),
  ];
}

function eveningChoices(s: GameState): C7Choice[] {
  const open = get7(s, 'p-evening-open');
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer7(`offer-${partner}-${id}`, label, hint, 'evening', (x) => {
          set7(x, 'p-evening-open', partner + '-room');
          set7(x, 'p-evening-scope', id);
          note7(x, 'p-evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who[partner], scopeReply[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer7('offer-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c7.p-evening-open'];
          set7(x, 'p-evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get7(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer7('offer-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c7.p-evening-open'];
        set7(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car and walks you down to it and does not ask why, and you respect him more for it than for anything he said in his office.')];
      }),
      offer7('offer-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c7.p-evening-open'];
        set7(x, 'p-evening-outcome', 'intimate-' + scope);
        return [...stay[partner][scope], p('For a few hours nobody is holding anything over anybody. You chose that too.')];
      }),
    ];
  }
  const go = (partner: Partner, label: string, hint: string) =>
    offer7('offer-evening-' + partner, label, hint, 'evening', (x) => {
      set7(x, 'p-evening', partner);
      set7(x, 'p-evening-open', partner);
      return invite[partner];
    });
  return [
    go('marcus', 'Have dinner with Marcus', 'Two predators, no business. His words.'),
    ...(julianOpen(s) ? [go('julian', 'Go to Julian', 'The rival door. The man who warned you.')] : []),
    offer7('offer-evening-alone', 'Stay in with the contract', 'Read it like a love letter. Chapter 7 ends here.', 'complete', (x) => {
      set7(x, 'p-evening', 'alone');
      return [
        p('You stay in. You read the contract three times at the kitchen table with a glass of wine, the way other people read letters from somebody they are in love with, and on the third time through you start to laugh, alone, in the lamplight, and cannot stop for a while.'),
      ];
    }),
  ];
}

// ── The ledger ──

function completeBlocks(s: GameState): Block[] {
  const lever = get7(s, 'p-lever');
  return [
    ...(get7(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, with the river still on your skin, and do not sleep.')] : []),
    p('Before bed you take an index card from the drawer and pin it to the back of the wardrobe door, where nobody who lets themselves in would think to look. Not a map. Not a question. A ledger.'),
    p(
      [
        'At the top, MARCUS CHEN, and under it what he owes you: a desk, a salary, three signed clauses.',
        lever === 'return' ? 'Under that, smaller: he planted the Novagen file, and he knows you know.' : 'Under that, smaller: a Helix director who signs early. Benton, whose name is on your work.',
        get7(s, 'p-visit') === 'ink' ? 'Beside it, HOLLIS, and a note in capitals: KNOWS I KNOW.' : get7(s, 'p-visit') === 'charm' ? 'Beside it, HOLLIS: failed his first-week test. What was it?' : 'Beside it, a pair of initials in a different ink.',
        get7(s, 'p-julian') === 'truth' ? 'To one side, JULIAN, and a question mark you are not ready to answer.' : 'To one side, JULIAN, and nothing yet.',
      ].join(' '),
    ),
    t('Everybody in that building owes somebody something. By the end of the month I intend to know who, and how much, and in which ink. Then we will see whose desk it is.'),
  ];
}

// ── Entry points ──

export function predatorBlocks7(s: GameState): Block[] {
  if (s.phase === 'summons') return summonsBlocks(s);
  if (s.phase === 'office') return officeBlocks(s);
  if (s.phase === 'terms') return [];
  if (s.phase === 'corridor') return corridorBlocks(s);
  if (s.phase === 'floor') return floorBlocks(s);
  if (s.phase === 'evening') return eveningBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function predatorChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'summons') return summonsChoices();
  if (s.phase === 'office') return get7(s, 'p-view') ? officeChoices() : viewChoices();
  if (s.phase === 'terms') return termsChoices(s);
  if (s.phase === 'corridor') return corridorChoices(s);
  if (s.phase === 'floor') return get7(s, 'p-lever') ? visitChoices() : floorChoices();
  if (s.phase === 'evening') return eveningChoices(s);
  return [];
}
