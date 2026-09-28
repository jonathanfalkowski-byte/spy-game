/** Chapter 18 (Predator route, lane id `predator`) · Paid in Full:
 * papers → hold → owes → called → year → last (its own end; the Celebrity `complete` is 'The End').
 * Design: docs/story/PREDATOR_CHAPTER_18_PAID_IN_FULL_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_18_SCRIPT.md. The last chapter of the Predator road: the
 * ledger that began in Chapter 8 on a page headed OWES closes, every line answered. The morning after by the board (on
 * the seat road: archive boxes, "Good morning, Madame", "Don't change the lock. C."); the seat as a real ending (keep the
 * shop, the darkest; change it; or close the book from the chair), or the wound, Helix or Nell by the terms; the switch
 * on every road (on the seat road, aimed at herself); OWES read back, and who she goes home to; who she is now; a year
 * later, a chosen last night (heat 3, consent-gated, fades) or a quiet one; the last card (AVAILABLE, her own page, on
 * the darkest road). Entered from the Predator `chapter17.minute`. Writes the shared end.* keys.
 * Deepening pass (2026-09-28): one debt paid in person after OWES (end.visit = leeds | coast | norfolk | cab | none:
 * tea with Marcus's mother, who thinks you are in insurance too; Ana across a street on a coast; Hollis's garden; Pryce's
 * cab, and the fare he will not take), and Celeste one last time, a year later (end.celeste = visit | write | none: at the
 * clients' end of your own table, on a balcony in Lisbon, or in her reading room; or one line back on a postcard, "Paid
 * in full."). The boxes, OWES, the year later and the last card at greater length. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C18Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C18Choice['apply']): C18Choice => ({ id: 'chapter18.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (key(s, 'c18.rec.' + k) !== undefined) return;
  setKey(s, 'c18.rec.' + k, String(s.history.length));
  setKey(s, 'c18.event.' + k, String(s.revision));
  setKey(s, 'c18.layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c18.' + k);
  s.knowledge.push('c18.' + k);
}

export const PREDATOR_PHASES18 = ['papers', 'hold', 'owes', 'called', 'year', 'last'] as const;
export const isPredator18 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase18 = (s: GameState) => isPredator18(s) && (PREDATOR_PHASES18 as readonly string[]).includes(s.phase);

const board = (s: GameState) => key(s, 'act4.board') as 'succeeded' | 'resigned' | 'diminished' | 'closed' | undefined;
const aim = (s: GameState) => key(s, 'act4.aim') as 'seat' | 'wound' | 'helix' | 'nell' | undefined;
const seated = (s: GameState) => board(s) === 'succeeded';
const spent = (s: GameState) => (['ally', 'relationship'].includes(key(s, 'act3.cost') ?? '') ? key(s, 'c15.cost-who') : undefined);
const marcusNear = (s: GameState) => (key(s, 'pred.ally.marcus') === 'in' || key(s, 'pred.mercy') === 'name') && spent(s) !== 'Marcus';

// ── Friday ──

export function beginPredator18(): C18Choice {
  return offer('begin-predator', 'Friday', 'The morning after.', 'papers');
}

function papersBlocks(s: GameState): Block[] {
  const b = board(s);
  return b === 'succeeded'
    ? [
        p('There is nothing in the papers. Meridian is private, and a private firm’s board is nobody’s business but its own. That was always the point of it.'),
        p('At nine, two men in grey coats carry four archive boxes up your stairs and stack them in your hall without being asked where, and go. Each box is labelled in the green hand, and then, underneath, in a clerk’s: TRANSFERRED.'),
        p('You open one box. Every page in it is a person: the ones you read at the Vesper, and the ones you never saw, and near the top, soft with handling, a woman with your haircut and your initials. Your own page is not in any of them. Somebody has taken it out already, carefully, and left the space.'),
        p('At noon you walk past the Vesper on your way to nowhere in particular, and the doorman, who has never once spoken first, touches his hat.'),
        q('The doorman', 'Good morning, Madame.'),
        p('At four, a postcard, already, from Lisbon: a tram on a hill, and on the back, in green ink, four words.'),
        q('C.', 'Don’t change the lock.'),
        t('Madame. He has called one other woman that, for thirty years. I heard it and I did not correct him.'),
      ]
    : b === 'resigned'
      ? [
          p('A line in the business pages, below the fold: MERIDIAN DIRECTOR STEPS DOWN. No photograph. “For personal reasons.” You have read that phrase before, on a letter with a man’s signature at the bottom, and you know exactly what it costs.'),
          p('Deverell’s undertaking is in your bag, on the back of their own paper, in his own pen.'),
          p('At four, a postcard from Lisbon: a tram on a hill, and on the back, in green ink.'),
          q('C.', 'You were worth it.'),
        ]
      : b === 'diminished'
        ? [
            p('Nothing in the papers. At eleven a typed letter from Marguerite Soames, courteous, two paragraphs, conceding half of what you asked for and promising to “consider” the rest. Soames signs her letters in blue. Nobody at Meridian has signed anything in blue for thirty years.'),
            p('At four, on your mat, a white orchid in a pot, with no card.'),
          ]
        : [
            p('Nothing in the papers. Nothing in the post. Nothing on the mat. The switch, and the street, and you.'),
            t('They have closed ranks. Let them. A closed door is only a door, and I have opened hers once already.'),
          ];
}

function papersChoices(s: GameState): C18Choice[] {
  const m = (id: string, label: string, hint: string, body: Block[]) =>
    offer('papers-' + id, label, hint, 'hold', (x) => {
      setKey(x, 'end.morning', id);
      return body;
    });
  return [
    m('read', 'Read everything, twice', 'Every word, every line.', [p('You read everything, twice, at the kitchen table, the way Adrian read a judgment: slowly, for what it did not say.')]),
    m('sleep', 'Sleep until two', 'The first unguarded sleep in a year.', [p('You sleep until two in the afternoon, the first sleep in a year with nobody’s phone in the drawer waiting for you, and wake with the light on the ceiling and no idea, for one whole minute, whose flat you are in. It is yours.')]),
    ...(marcusNear(s)
      ? [
          m('marcus', 'Ring Leeds', 'Marcus answers on the first ring.', [
            p('Marcus answers on the first ring, from a kitchen with a radio on.'),
            q('Marcus Chen', seated(s) ? 'I heard. Of course I heard. Madame Vale. God help all of us. Come up at the weekend. My mother wants to meet the woman who took my job, and I have told her you are in insurance.' : 'I heard. Of course I heard. Come up at the weekend. My mother wants to meet the woman who took my job, and I have told her you are in insurance.'),
          ]),
        ]
      : []),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          m('maya', 'Breakfast with Maya', 'The whole story, slowly, with wine at eleven, as promised.', [
            p('Maya comes round at ten with croissants, and you tell her all of it, slowly, from the car in the rain to the seventh chair, with a bottle of wine open at eleven in the morning, as promised. She does not interrupt once. At the end she puts her glass down.'),
            q('Maya', 'Right. Well. I’m going to need a much bigger bottle.'),
          ]),
        ]
      : []),
  ];
}

// ── The position ──

const aimLine: Record<string, string> = {
  wound: 'Within the month three of Meridian’s clients have moved their money elsewhere, quietly, the way money moves when it has read the minutes. A fourth rings you to ask, very politely, what it would take for his name to be left out of anything you might one day write. Meridian bleeds, and stands. You did not come to topple it. You came to make everyone at that table afraid of the one next to them, and they are.',
  helix: 'Helix is yours. Clause 14.3 is gone from every file by Monday. The letterhead is gone by Wednesday. By the end of the month the fund’s money is a schedule of repayments on your own desk, in your own hand, and the only claim on Helix is the one on the door of the corner office, which says your name.',
  nell: 'Nora gets the file, entire, with the pages that were taken out of it, by courier, in a box with no return address. She rings you at two in the morning her time and reads you the first page, and then neither of you says anything for a long time, which is also a conversation.',
  seat: 'They gave you nothing. You came for the chair and turned it down, and the board did not know what to give a woman who refused the only thing it had to offer. You find you do not mind. You still have everything you walked in with.',
};

/** When the board granted nothing: the same aim, held by the switch and the slow road alone. */
const aimLineNone: Record<string, string> = {
  wound: 'Nobody leaves the fund. Not yet. But every one of them read the ledger across that table, and you can see it at the opera, at the races, in the way they no longer sit together. It will take a year. You have a year.',
  helix: 'Helix is still yours, and still the fund’s: clause 14.3 stands in every file. Nobody enforces it. The switch is the only reason, and everybody at that table knows exactly where it is.',
  nell: 'The file stays in the archive. Nora reopens the inquest herself, in Singapore, with a lawyer and your statement and Nell’s watch in an evidence bag, and it takes a year, and she does not mind.',
  seat: 'They gave you nothing. You came for the chair and turned it down, and the board did not know what to give a woman who refused the only thing it had to offer. You find you do not mind. You still have everything you walked in with.',
};

function holdBlocks(s: GameState): Block[] {
  if (seated(s))
    return [
      p('Your first Thursday at the head of the table. The long room, the empty frames, six people who stand when you come in, the client ledger in your own drawer, and Celeste at the clients’ end, in green, taking no notes.'),
      p('Deverell reads the agenda. Item three is the Spring Collection: four new pages, two reissues, and a placement for a client in Zurich on the first Thursday of next month.'),
      t('The shop is mine. Everything I took from it this year is mine. And now I have to decide what the shop is, because nobody else in this room ever will.'),
    ];
  const terms = key(s, 'act4.terms');
  return [
    p((terms === 'none' ? aimLineNone : aimLine)[aim(s) ?? 'wound']),
    ...(terms === 'none' ? [t('Nothing granted. Everything held. The slow road, then, the one that takes a year. I have a year.')] : []),
  ];
}

function shopChoices(): C18Choice[] {
  const sh = (id: string, label: string, hint: string, body: Block[]) =>
    offer('shop-' + id, label, hint, 'hold', (x) => {
      setKey(x, 'end.shop', id);
      note(x, 'p18-shop', `At the head of Meridian’s table, Evelynn decided the shop: ${id === 'keep' ? 'she kept it as it was' : id === 'change' ? 'she made every legend a volunteer, paid and free to leave' : 'she closed the book from the chair, one page at a time'}.`, 'The minutes of her first Thursday');
      return body;
    });
  return [
    sh('keep', 'Keep it as it was', 'Run it better. The darkest thing you could do, with your eyes open.', [
      q('You', 'Item three. Approved.'),
      p('Nobody at the table looks surprised. At the clients’ end, Celeste smiles, very slightly, and writes something in the margin of her agenda, the first note she has taken in thirty years.'),
      t('I know exactly what this is. That is the difference between us. It is not a very large difference. It is the only one I have.'),
    ]),
    sh('change', 'Change it', 'Every legend a volunteer. Paid. Free to leave. No mother’s house held.', [
      q('You', 'Item three. Approved, on terms. From tonight every page in that book asked to be in it, is paid for being in it, and can leave it, with a year’s money, whenever they like. Nobody’s mother’s house. Nobody’s name held back.'),
      p('Deverell writes it down. Soames looks at you for a long time over her glasses, and then, for the first time, nods.'),
      t('Still the shop. Still dark. A little less cruel. Whether that is better, I will not know for years, and I will never be sure.'),
    ]),
    sh('close', 'Close the book from the chair', 'One page at a time. The wound, from the top.', [
      q('You', 'Item three. Declined. And items four to forty, in due course.'),
      p('It takes a year. One page at a time, one client at a time, one Thursday at a time, you close the book from the chair they gave you to keep it open, and nobody at that table can stop you, because every one of them voted for you to sit in it.'),
    ]),
  ];
}

function switchChoices(s: GameState): C18Choice[] {
  const to = key(s, 'c6.maya') === 'restored' ? 'Maya' : key(s, 'pred.nora') === 'told' ? 'Nora' : key(s, 'pred.ally.marsh') === 'in' ? 'Owen Marsh' : key(s, 'pred.ally.morel') === 'in' ? 'Lucien' : 'Maya';
  const sw = (id: string, label: string, hint: string, body: Block[]) =>
    offer('switch-' + id, label, hint, 'owes', (x) => {
      setKey(x, 'end.switch', id);
      setKey(x, 'end.switch-to', id === 'handed' ? to : 'none');
      setKey(x, 'end.position', (aim(x) ?? 'wound') + ':' + (key(x, 'act4.terms') ?? 'none') + (seated(x) ? ':seat' : ''));
      return body;
    });
  return [
    sw('armed', 'Keep the switch armed', seated(s) ? 'Aimed at yourself now. If you ever become her entirely, it goes off.' : 'For the rest of your life.', [
      p(
        seated(s)
          ? 'You keep it armed, and change the instruction. The letters still say: if I stop answering, open it. And now one more line, in your own hand: or if I ever send a woman into a room she did not ask to walk into.'
          : 'You keep it armed. Three people who will never meet, each with a copy and a sentence, waiting for a phone that must keep ringing. You ring them on the first of every month. You always will.',
      ),
      ...(seated(s) ? [t('A gun to the head of the world. And now, also, to mine. It is the only honest way I know to sit in her chair.')] : []),
    ]),
    sw('handed', 'Hand it to ' + to, 'Somebody you trust to hold it.', [p(`You give it to ${to}, all of it, in one envelope, and a single instruction, and ${to} puts it somewhere you will never ask about.`)]),
    sw('disarmed', 'Disarm it', 'Take the letters back, and burn them.', [p('You take the letters back, one by one, from each of the people who held them, and burn them in the kitchen sink, and open the window, and decide that you do not need a gun to anybody’s head to be free.')]),
  ];
}

// ── OWES ──

function owesBlocks(s: GameState): Block[] {
  const lines: string[] = [];
  const cost = key(s, 'act3.cost');
  const who = key(s, 'c15.cost-who');
  if (key(s, 'pred.ally.marcus') === 'in' || key(s, 'pred.mercy') === 'name') lines.push('MARCUS CHEN. Leeds, the good suit, and a mother who thinks he is in insurance and is delighted he is home.');
  else lines.push('MARCUS CHEN. Somewhere. He kept ' + ({ none: 'nothing', chair: 'his pension and a chair', name: 'his name' }[key(s, 'pred.mercy') as 'none' | 'chair' | 'name'] ?? 'nothing') + '. You find, a year on, that you hope he is all right.');
  if (key(s, 'pred.ally.morel') === 'in') lines.push(who === 'Lucien' ? 'LUCIEN MOREL. His bank named, on your account. He plays at night in a flat in Lausanne now, and sends you a recording every Christmas, out of tune.' : 'LUCIEN MOREL. Still in Geneva, still writing nothing down, still the only man in the game as good at this as you are.');
  if (key(s, 'pred.ally.iris') === 'in') lines.push('IRIS MOREAU. A postcard with no stamp, from a coast: FREE.');
  if (key(s, 'pred.halvorsen') === 'owes-her') lines.push('HALVORSEN. The lunch, at last, on a boat, and he talks about the storm off the Cape and does not buy anything.');
  if (key(s, 'c8.p-night') === 'pryce') lines.push(who === 'Mr Pryce' ? 'MR PRYCE. Let go by the fund. He drives his own cab now, and will not take your money, ever.' : 'MR PRYCE. He drives his own cab now. He will not take your money.');
  if (key(s, 'pred.lever8.hollis') === 'spare') lines.push('ANTHONY HOLLIS. The cottage in Norfolk. The garden. He winks at you in a photograph.');
  if (key(s, 'pred.lever8.counsel') === 'spare') lines.push('INES VARGA. Her door, still open.');
  if (key(s, 'pred.delphine') === 'free') lines.push('ANA PETROVIC. A nurse, on a coast. No postcard. That is how you know.');
  else if (key(s, 'pred.delphine')) lines.push('DELPHINE (ANA). A line you cannot take down. You leave it up. It is the one that keeps you honest.');
  if (key(s, 'pred.nora') === 'told') lines.push('NORA LINDEN. Nell’s photograph on her kitchen wall, and yours beside it.');
  if (key(s, 'pred.ally.marsh') === 'in') lines.push(who === 'Owen Marsh' ? 'OWEN MARSH. His inquiry taken from him, his box of files on his own kitchen table, and the look of a man who would do it again.' : 'OWEN MARSH. His inquiry, reopened, and the Markets Authority on the telephone to Meridian every Thursday.');
  if (key(s, 'pred.julian') === 'ally') lines.push(cost === 'relationship' && who === 'Julian' ? 'JULIAN MERCER. His deal, dead. He rang, in the end. He always does.' : 'JULIAN MERCER. The forty-first floor, and a man who never once asked what you took.');
  return [
    p('You find the old notebook in the drawer with Adrian’s things, and open it at the back, at the page headed OWES, in capitals, with four names on it and a question mark after each, from the tenth day at Helix.'),
    p('The four names from the tenth day are there in your own capitals: HOLLIS, the question mark after it gone grey; the others, and the question marks you drew so hard they went through the paper. You write the answers in, one line at a time, in the same pen, which is Marcus’s, which you kept.'),
    ...lines.map((l) => p('· ' + l)),
    ...(cost === 'money' ? [p('· YOU. Everything the road ever paid you, given back. You have less money than you had the morning the car came. It is the only line on the page you are proud of without reservation.')] : cost === 'visibility' ? [p('· YOU. The woman who took Helix, on the record, forever. Your face is nobody’s secret now, least of all yours.')] : []),
  ];
}

type Home = 'julian' | 'marcus' | 'lucien' | 'maya' | 'none';
/** One debt paid in person (deepening pass), before who she goes home to. */
function visitChoices(s: GameState): C18Choice[] {
  const v = (id: string, label: string, hint: string, body: Block[]) =>
    offer('visit-' + id, label, hint, 'owes', (x) => {
      setKey(x, 'end.visit', id);
      return body;
    });
  return [
    ...(marcusNear(s)
      ? [
          v('leeds', 'Tea in Leeds', 'Marcus’s mother. She thinks you are in insurance too.', [
            p('A terraced house in Leeds with net curtains and a very good biscuit tin. Marcus’s mother is eighty-two, small and sharp, and pours the tea herself, and tells you that Marcus was always a clever boy and never once did his homework anywhere but under a desk.'),
            q('Mrs Chen', 'And you’re in insurance too, he says. It must be very dull. You don’t look dull.'),
            q('You', 'It has its moments.'),
            p('Marcus, in the doorway, in a jumper, does not laugh. It is the hardest you have ever seen him not laugh.'),
          ]),
        ]
      : []),
    ...(key(s, 'pred.delphine') === 'free'
      ? [
          v('coast', 'A coast town nobody can place', 'Ana. From across the street. Do not go in.', [
            p('A coast town nobody can place, out of season, the sea the colour of a filing cabinet. On the corner by the harbour a small surgery with its lights on, and through the window, in a blue uniform, with her hair grown out, a nurse laughing at something a patient has said.'),
            p('You do not go in. You stand across the street for as long as it takes to be sure, and then you walk back to the station.'),
            t('Ana. On a train, the card said. Off it now. That line is paid, and she will never know who paid it, and that is the whole point.'),
          ]),
        ]
      : []),
    ...(key(s, 'pred.lever8.hollis') === 'spare'
      ? [
          v('norfolk', 'A garden in Norfolk', 'Hollis. The cottage. He winks.', [
            p('Anthony Hollis, in a cardigan, in a garden in Norfolk full of things he has planted badly and loves anyway, shows you every one of them by name, and then, at the gate, without warning, takes both your hands.'),
            q('Anthony Hollis', 'You gave me my letter back. Nobody in that building had ever given anybody anything back. My wife thinks I retired. I did. Because of you.'),
          ]),
        ]
      : []),
    ...(key(s, 'c8.p-night') === 'pryce'
      ? [
          v('cab', 'Hail Pryce’s cab', 'He will not take the fare.', [
            p('You hail a black cab on the Strand in the rain, and it is his: Mr Pryce, in his own cab, with his own licence on the dashboard and no fund’s name anywhere.'),
            q('Pryce', 'Where to, Ms Vale?'),
            q('You', 'Wherever you like, Mr Pryce. For once.'),
            p('He drives you along the river for an hour, the long way, and at the end of it will not take your money, and waits until your light goes on, the way he always did, whoever he was driving for.'),
          ]),
        ]
      : []),
    v('none', 'Post the rest', 'Every other line, by letter.', [p('You write the rest by letter, one a night for a week, in Marcus’s pen, and post them from different boxes, out of habit, and then laugh at yourself for the habit.')]),
  ];
}

function homeChoices(s: GameState): C18Choice[] {
  const h = (id: Home, label: string, hint: string, body: Block[]) =>
    offer('home-' + id, label, hint, 'called', (x) => {
      setKey(x, 'end.with', id);
      return body;
    });
  const gone = spent(s);
  return [
    ...(key(s, 'pred.julian') === 'ally' && gone !== 'Julian'
      ? [h('julian', 'Julian', 'The one who told you no, and stayed.', [q('Julian Mercer', 'Tell me what you want, and that’s what happens. I meant it the first time. I mean it for good.')])]
      : []),
    ...(marcusNear(s)
      ? [h('marcus', 'Marcus', 'Two predators who have stopped keeping score.', [q('Marcus Chen', seated(s) ? 'You have my old job, my old enemy’s chair, and my good suit on your floor most weekends. I suppose that makes us even.' : 'You have my old job and my good suit on your floor most weekends. I suppose that makes us even.')])]
      : []),
    ...(key(s, 'pred.ally.morel') === 'in' && gone !== 'Lucien'
      ? [h('lucien', 'Lucien', 'The only man as good at this as you are.', [q('Lucien Morel', 'I have never told a client the truth. I have never had to. You are not my client.')])]
      : []),
    ...(key(s, 'c6.maya') === 'restored' && gone !== 'Maya' ? [h('maya', 'Maya', 'The family you chose.', [p('Maya, a kitchen, a cat asleep on a spreadsheet, and the only person who knew you before any of it.')])] : []),
    h('none', 'Nobody', 'A whole answer.', [p('Nobody. A flat that is yours, and a key that is yours, and evenings that belong to nobody else. It is a whole answer, and you give it without apology.')]),
  ];
}

// ── A name ──

function calledBlocks(): Block[] {
  return [
    p('The wardrobe door, the last time. You take every card down, the way you pinned them, and lay them in a box, and put the box in the drawer with Adrian’s things. There is one card left to write.'),
  ];
}

function calledChoices(): C18Choice[] {
  const n = (id: string, label: string, hint: string, body: Block[]) =>
    offer('name-' + id, label, hint, 'year', (x) => {
      setKey(x, 'end.name', id);
      return body;
    });
  return [
    n('adrian', 'Adrian', 'His name back, and this life, on your terms.', [p('You write his name. Adrian Vale. It looks smaller than you remember, and it fits.')]),
    n('evelyn', 'Evelyn', 'The name they gave you, made yours by what you did with it.', [p('You write the name they gave you, the one they built to be sold, and it is yours now, because of everything you did with it.')]),
    n('new', 'A new name', 'One nobody gave you. You do not show it to us.', [p('You write a name nobody gave you, and turn the card face down before anyone could read it, even you, twice.')]),
  ];
}

// ── A year later ──

function yearBlocks(s: GameState): Block[] {
  const a = aim(s);
  return [
    p(
      seated(s)
        ? 'A year later. The first Thursday of December. The Vesper, the long room, the empty frames, and the guests arriving in black tie, and at the far end, receiving them, in green, you.'
        : a === 'helix'
          ? 'A year later. The corner office above the river, rain on the glass, the desk too large to be anything but a statement.'
          : a === 'nell'
            ? 'A year later. Holland Village, a kitchen with a photograph on its wall, two coffees, one with two sugars and cinnamon.'
            : 'A year later. A café across the road from the Vesper, a window seat, and through the black glass opposite, a table that is smaller than it was.',
    ),
    ...(seated(s) && key(s, 'end.shop') === 'keep' ? [p('A new client, a young man in a good suit, asks you, with a buyer’s frankness, which one you are here for. You smile, and do not answer, the way she never did.')] : []),
    ...(a === 'helix' && key(s, 'pred.mercy') === 'chair' ? [p('The chair from Leeds is not here. You bought your own. It is uncomfortable, and entirely yours.')] : []),
    ...(key(s, 'act3.black-phone') === 'keep' ? [p('In a drawer, the black phone with an N on its back. You have never switched it on. You never will. You have also never thrown it away.')] : []),
    ...(board(s) === 'resigned' || seated(s) ? [p('A postcard from Lisbon every year, on the first Thursday of spring. Green ink. Never a word. Just the initial.')] : []),
  ];
}

const partnerFull: Record<'julian' | 'marcus' | 'lucien', string> = { julian: 'Julian Mercer', marcus: 'Marcus Chen', lucien: 'Lucien Morel' };

/** Celeste one last time (deepening pass), a year later, before the last night. */
function celesteChoices(s: GameState): C18Choice[] {
  const b = board(s);
  const c = (id: string, label: string, hint: string, body: Block[]) =>
    offer('celeste-' + id, label, hint, 'year', (x) => {
      setKey(x, 'end.celeste', id);
      return body;
    });
  return [
    c('visit', b === 'resigned' ? 'Go to Lisbon' : b === 'succeeded' ? 'Walk her to her car' : 'Go to the reading room', 'See her once more. As yourself.', [
      ...(b === 'resigned'
        ? [
            p('Lisbon, a tram on a hill, a balcony above the river with a view of the bridge. Celeste in a linen dress, older by exactly one year and not a day more, with two glasses already poured.'),
            q('Celeste', 'The view is exactly as good as I told her it was. She never came. I am so glad you did.'),
          ]
        : b === 'succeeded'
          ? [
              p('After the Thursday board you walk her to her car, the long black one, at the kerb, with the engine running. She stops with her hand on the door.'),
              q('Celeste', 'You run it better than I did. I knew you would. I did not know I would mind.'),
            ]
          : [
              p('The reading room at the Vesper, a Tuesday morning. Celeste at the lectern with her glasses on their chain, reading a book that is not a catalogue. She does not look up when you come in. She knew you would.'),
              q('Celeste', 'Still here, darling. So are you. I think that is what they call a draw.'),
            ]),
      t('I came to see whether I would feel anything. I do. I am not going to tell her what.'),
    ]),
    c('write', 'Write back', 'One line, on a postcard of your own.', [
      p('You buy a postcard of the river, the one with the bridge and the rain, and write one line on it in black ink, and post it to an address in Lisbon you were never given and have always known.'),
      q('The card', 'Paid in full. E.'),
    ]),
    c('none', 'Let her go', 'Some lines you leave blank.', [p('You let her go. Some lines on the page you leave blank. Not because they are unanswered. Because the answer is nobody’s business, not even hers.')]),
  ];
}

function yearChoices(s: GameState): C18Choice[] {
  if (!key(s, 'end.celeste')) return celesteChoices(s);
  const w = key(s, 'end.with') as Home | undefined;
  const partner = w === 'julian' || w === 'marcus' || w === 'lucien' ? w : undefined;
  const open = key(s, 'end.later-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('year-' + id, label, hint, 'last', (x) => {
      setKey(x, 'end.later', id);
      return body;
    });
  if (partner && open === 'invited')
    return [
      offer('year-no-sex', 'Stay close, but not sex tonight', 'Kissing, touch, and stopping where you choose.', 'year', (x) => {
        setKey(x, 'end.later-open', 'no-sex');
        setKey(x, 'end.consent', 'no-sex');
        return [q(partnerFull[partner], 'Then that’s the night. You say stop, I stop. That hasn’t changed.')];
      }),
      offer('year-sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.', 'year', (x) => {
        setKey(x, 'end.later-open', 'sex');
        setKey(x, 'end.consent', 'sex');
        return [q(partnerFull[partner], 'Yes. And you say stop, it stops. It isn’t going to change.')];
      }),
      done('goodnight', 'Say goodnight', 'Leaving is complete and respected.', [p('You kiss him once, and say goodnight, and go to the window with a cup of coffee, black, and he lets you.')]),
    ];
  if (partner && open)
    return [
      done('stop', 'Stop here', 'Honoured immediately, without argument.', [p('You put a hand flat on his chest and he stops at once, and holds you instead, and the city goes on outside the window.')]),
      done('close', 'Stay', 'Continue within what you chose.', open === 'sex'
        ? [p('He undoes the dress slowly, the way he did the first time, and asks once more, low, at your shoulder. You answer by drawing him down with you.'), p('What happens next is two people with nothing left to take from each other. The scene fades.')]
        : [p('He kisses you by the window and stops exactly where you said, and you stand there together in the dark, a year on, with nothing owed in either direction.')]),
    ];
  return [
    ...(partner
      ? [
          offer('year-close', 'Tonight, with him', 'A chosen night. Heat 3, consent in character, fades.', 'year', (x) => {
            setKey(x, 'end.later-open', 'invited');
            return [q(partnerFull[partner], 'Tell me what you want tonight. It’s the only question I’ve ever asked you that I wanted the answer to.')];
          }),
        ]
      : w === 'maya'
        ? [done('close', 'Tonight, with Maya', 'A kitchen, and a laugh.', [p('Maya’s kitchen, a bottle, the cat, and a laugh at one in the morning so loud the neighbour bangs on the wall, and you both laugh harder.')])]
        : []),
    done('quiet', 'Tonight, alone', 'A window, and black coffee.', [p('You stand at the window with a cup of coffee, black, and watch the city, and nobody is watching you back.')]),
  ];
}

// ── The last card ──

function lastBlocks(s: GameState): Block[] {
  const name = key(s, 'end.name');
  const line =
    name === 'adrian'
      ? 'My name is Adrian Vale. I was bought once. Now I’m the only one who knows what I cost.'
      : name === 'evelyn'
        ? seated(s)
          ? 'My name is Evelyn Vale. They built her to be sold. I bought the shop.'
          : 'My name is Evelyn Vale. They built her to be sold. I bought her back.'
        : 'I wrote my name on the last card, under a page headed OWES, and drew a line through the word. It’s nobody’s business but mine.';
  return [
    p('The last card, pinned to a wall that is yours, in your own hand. Under it, in the drawer, the notebook, closed at the page headed OWES, every line answered, and Marcus’s pen on top of it, capped.'),
    t(line),
    ...(seated(s) && key(s, 'end.shop') === 'keep'
      ? [p('And beneath it, one more card, in green ink, in a hand that has become very like hers:'), q('The card', 'AVAILABLE.'), p('It is your own page.')]
      : []),
  ];
}

export function predatorBlocks18(s: GameState): Block[] {
  if (s.phase === 'papers') return papersBlocks(s);
  if (s.phase === 'hold') return holdBlocks(s);
  if (s.phase === 'owes') return owesBlocks(s);
  if (s.phase === 'called') return calledBlocks();
  if (s.phase === 'year') return yearBlocks(s);
  if (s.phase === 'last') return lastBlocks(s);
  return [];
}

export function predatorChoices18(s: GameState): C18Choice[] {
  if (s.phase === 'papers') return papersChoices(s);
  if (s.phase === 'hold') return seated(s) && !key(s, 'end.shop') ? shopChoices() : switchChoices(s);
  if (s.phase === 'owes') return key(s, 'end.visit') ? homeChoices(s) : visitChoices(s);
  if (s.phase === 'called') return calledChoices();
  if (s.phase === 'year') return yearChoices(s);
  return [];
}
