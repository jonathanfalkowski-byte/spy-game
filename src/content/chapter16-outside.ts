/** Chapter 16 (Outside route, lane id `outside`) · Her Own Hand:
 * sheet → stand → retinue → spread → coat → steps → complete (the shared end, with Outside blocks).
 * Design: docs/story/OUTSIDE_CHAPTER_16_HER_OWN_HAND_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_16_SCRIPT.md. The shared approach ("The Approach") in Outside
 * framing: the morning of the board. The case laid out as a ledger with a column for who checked each page (act4.case; the
 * pages she verified herself count for most). The aim is the Outside position (act4.aim = expose | trade | cut | nell):
 * expose with provenance owned (only if she can sign what she holds), trade quietly, cut the source, or Nell's name; each
 * with a one-line notice to the board (act4.notice). Who comes (two inside, one outside); Rafe, unless she cut him, asks
 * where he stands: in the room, or at the door (act4.rafe = room | door | absent), which Chapter 17 reads. The first card
 * and the one held back (her signed ledger, the Jakarta order, the Rotterdam slip, the 1109 cards, page seven, Rafe's file).
 * Armour (black; Celeste's grey, worn back at her; flat shoes like a photograph; Rafe, Maya, Iris or alone; heat 1–2). One
 * last look at the wall. The way in (the river door with Rafe, the front, Celeste's car, Marsh's notice). The long room;
 * Celeste stands, as herself. Rafe never makes her Nell; how Nell died is not told here (Chapter 17). Entered from an
 * Outside `chapter15.complete`; ends at the Chapters 17–18 in-development stop, having set the shared act4.* contract.
 * Choice ids carry `o16-`.
 * Deepening pass (2026-10-02): three moments, each with a neutral pick that changes no flag. The pages taken on trust, before
 * the ledger is signed (c16.o-trust = sign | apart | count: her name put to them all the same; set apart in a clip at the back;
 * or counted, and the count written in the margin). The notice leaving at seven, before the retinue is chosen (c16.o-hand =
 * girl | rafe | self: handed to a girl on a moped with a docket to be signed for; carried by Rafe, if he is not cut; or taken
 * to the Vesper's door herself). The last minute on the Embankment, before the way in (c16.o-last = tide | windows | pockets:
 * the tide, the same tide as the terminal; the lit windows counted; or what is in her pockets, touched one by one). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C16Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get16 = (s: GameState, k: string) => s.choices['c16.' + k];
const set16 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c16.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C16Choice['apply']): C16Choice => ({ id: 'chapter16.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get16(s, 'rec.' + k) !== undefined) return;
  set16(s, 'rec.' + k, String(s.history.length));
  set16(s, 'event.' + k, String(s.revision));
  set16(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c16.' + k);
  s.knowledge.push('c16.' + k);
}

export const OUTSIDE_PHASES16 = ['sheet', 'stand', 'retinue', 'spread', 'coat', 'steps'] as const;
export const isOutside16 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase16 = (s: GameState) => isOutside16(s) && ((OUTSIDE_PHASES16 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const way14 = (s: GameState) => key(s, 'out.way14') as 'keep' | 'cut' | 'trust' | undefined;
const cost15 = (s: GameState) => key(s, 'out.cost15');
const spentAlly = (s: GameState, who: string) => cost15(s) === 'ally' && key(s, 'c15.cost-who') === who;
/** Rafe can come unless she cut him. */
export const rafeComes16 = (s: GameState) => way14(s) !== 'cut';
const marshIn = (s: GameState) => key(s, 'act3.ally.marsh') === 'in' && !spentAlly(s, 'marsh');
const irisIn = (s: GameState) => key(s, 'act3.ally.iris') === 'in' && !spentAlly(s, 'iris');
const noraIn = (s: GameState) => key(s, 'act3.ally.nora') === 'in';
const mayaIn = (s: GameState) => key(s, 'c6.maya') === 'restored';
const took = (s: GameState) => key(s, 'out.took15');
const verified = (s: GameState) => Number(key(s, 'out.verified') ?? 0);
const chosenNight = (s: GameState) =>
  (key(s, 'c14.o-evening') === 'rafe' && !!key(s, 'c14.o-evening-outcome')?.startsWith('intimate')) || (key(s, 'c15.o-night') === 'rafe' && !!key(s, 'c15.o-night-outcome')?.startsWith('intimate'));
/** Expose, with her own signature on every page, needs pages she checked herself, or the drawer. */
export const exposeOpen16 = (s: GameState) => verified(s) >= 2 || !!key(s, 'out.linden15');

/** The case, stated honestly (design §2): points and the reasons behind them. */
export function case16o(s: GameState): { strength: 'thin' | 'supported' | 'strong' | 'overwhelming'; reasons: string[] } {
  const v = verified(s);
  const r: [boolean, number, string][] = [
    [!!key(s, 'out.linden15'), 2, 'LINDEN, E.: the Jakarta order, signed C., from the Vesper’s own drawer'],
    [!!key(s, 'out.slip15'), 1, 'the Rotterdam slip: a man sent away, AUTH. C.'],
    [took(s) === 'cards', 1, 'the 1109 cards: every placement filmed'],
    [took(s) === 'adrian', 1, 'Adrian Vale’s file: the clinic’s own hand'],
    [took(s) === 'lim', 1, 'LIM, R.: ten years of Tuesdays, in Meridian’s own file'],
    [v >= 1, 1, 'pages you checked yourself, and will sign'],
    [v >= 3, 1, 'every page you would stake your name on, checked and initialled'],
    [!!key(s, 'out.ledger13'), 1, 'his ledger: every handoff, in his own hand'],
    [cost15(s) === 'rafe', 1, 'Rafe’s sworn statement, in his own name, at the Markets Authority'],
    [rafeComes16(s) && !!key(s, 'out.told'), 1, 'Rafe Lim, who carried the envelopes and will say so'],
    [key(s, 'act3.sloane') === 'burned', 1, 'Sloane’s file, delivered where it will matter'],
    [marshIn(s), 1, 'Owen Marsh and the Markets Authority'],
    [noraIn(s), 1, 'Nora Linden'],
    [irisIn(s), 1, 'Iris Moreau, who stood in that room for four years'],
    [key(s, 'act3.black-phone') === 'keep', 1, 'the black phone, every message'],
    [key(s, 'act3.leash') === 'broken', 1, 'the switch, in envelopes, with people Celeste has never met'],
  ];
  const got = r.filter(([ok]) => ok);
  const pts = got.reduce((a, [, n]) => a + n, 0);
  return { strength: pts >= 11 ? 'overwhelming' : pts >= 8 ? 'strong' : pts >= 5 ? 'supported' : 'thin', reasons: got.map(([, , why]) => why) };
}

type Who = 'rafe' | 'maya' | 'marsh' | 'nora' | 'iris';
export function inside16o(s: GameState): Who[] {
  return [rafeComes16(s) && 'rafe', mayaIn(s) && 'maya', marshIn(s) && 'marsh', noraIn(s) && 'nora', irisIn(s) && 'iris'].filter(Boolean) as Who[];
}
const inside = (s: GameState): Who[] => ((key(s, 'act4.inside') ?? '').split(',').filter(Boolean) as Who[]);

export function placeOutside16(s: GameState): string | undefined {
  if (s.phase === 'retinue' && key(s, 'act4.inside-done')) return 'Morning · Outside';
  if (s.phase === 'spread' && key(s, 'act4.first')) return 'Noon · The one you keep';
  if (s.phase === 'coat' && key(s, 'act4.wear')) return '16:30 · The mirror';
}

// ── The entry ──

export function beginOutside16(): C16Choice {
  return offer('begin-outside', 'Thursday', 'The board meets at six.', 'sheet');
}

// ── The sheet ──

function sheetBlocks(s: GameState): Block[] {
  const c = case16o(s);
  const v = verified(s);
  return [
    p('Thursday, five in the morning, the room over the water. You lay every page on the floor the way a ledger is ruled: the page, where it came from, and a column on the right headed CHECKED BY.'),
    p(v ? 'Against ' + (v >= 3 ? 'most' : 'some') + ' of them, in your own small hand, two initials. E.V. Against the rest, nothing, because the rest came in an envelope and you took it on trust. You look at the empty column for a long time.' : 'Against none of them, two initials, because you took everything on trust, and a ledger with an empty column is only a pile of paper. You look at it for a long time.'),
    p('In the middle, apart, the drawer: LINDEN, E. A flimsy the colour of weak tea. A name on a cabinet.'),
    p('What you hold: ' + (c.reasons.length ? c.reasons.join('; ') : 'less than you would like, and all of it yours') + '.'),
    q('The card', 'THE CASE: ' + c.strength.toUpperCase() + '.'),
    t(c.strength === 'thin' ? 'Thin. Then I walk in thin, and sign every word of it.' : c.strength === 'overwhelming' ? 'Overwhelming. She has kept everything for thirty years and never once been read back to herself.' : 'Enough to make her sit down. Not enough to make her stay down. So I choose carefully.'),
  ];
}

function dawnChoices(s: GameState): C16Choice[] {
  const d = (id: 'rafe' | 'phone' | 'nell' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('o16-dawn-' + id, label, hint, 'sheet', (x) => {
      set16(x, 'o-dawn', id);
      return body;
    });
  return [
    ...(rafeComes16(s)
      ? [d('rafe', 'Read Rafe’s message', 'He is awake too.', [
          q('Rafe', 'I’m on the Embankment. Not at the river door. On the bench opposite. I couldn’t sleep, and I know the minute, and I wanted to be somewhere I could see the building. You don’t have to answer.'),
          p('You read it twice, and put the phone on the floor beside the ledger, and do not answer yet. It is not that you have nothing to say. It is that you would like to say it properly.'),
        ])]
      : []),
    ...(key(s, 'act3.black-phone') === 'keep'
      ? [d('phone', 'Switch on the black phone', 'You kept it, as evidence.', [
          p('You switch it on, for the first time since the drawer. One message, timed 04:12.'),
          q('C.', 'You have been very busy, darling. I do hope you are sleeping. A board is no place to be tired.'),
          t('She knows I am awake. She is awake too. We are two women in two rooms on either side of a river, and neither of us has ever been so wide awake.'),
        ])]
      : []),
    ...(noraIn(s)
      ? [d('nell', 'Take the photograph off the wall', 'The one Nora gave you.', [p('You unpin the photograph Nora gave you, Nell on the harbour wall, in flat shoes, laughing at whoever is holding the camera, and look at it for a long time, and put it in the inside pocket of the jacket you will wear, where it will be in the room whether anybody says her name or not.')])]
      : []),
    d('quiet', 'Keep ruling the columns', 'In order. In silence.', [p('You keep ruling the columns in silence, and the river goes from black to grey to something you could call light, and the kettle clicks off, and you do not notice.')]),
  ];
}

function trustChoices(): C16Choice[] {
  const k = (id: 'sign' | 'apart' | 'count', label: string, hint: string, body: Block[]) =>
    offer('o16-trust-' + id, label, hint, 'sheet', (x) => {
      set16(x, 'o-trust', id);
      return body;
    });
  return [
    k('sign', 'Put your name to them all the same', 'Because you chose to carry them.', [p('You go down the pages you took on trust, the ones that will have to be marked, and decide that you will sign them anyway, under your own name, not as a pretence that you checked, but as a plain statement that you chose to carry them. It is a different thing to sign, and you can feel the difference in the pencil.')]),
    k('apart', 'Set them apart, in a clip', 'At the back. Marked.', [p('You take the pages you took on trust and clip them together at the back of the ledger with a black bulldog clip, so that nobody can mistake them for the others, and so that you cannot. They are not worthless. They are simply the part of the evidence that depends on somebody else.')]),
    k('count', 'Count them, and write the count', 'In the margin. In pencil.', [p('You count the pages you took on trust, once, slowly, without wanting to get a smaller number, and write the number in the margin of the first page in pencil, small, where anybody who looks will find it: how many, and no more. It is the most useful sentence in the book, and the one nobody else would have written.')]),
  ];
}

function sheetChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'o-dawn')) return dawnChoices(s);
  if (!get16(s, 'o-trust')) return trustChoices();
  return [
    offer('o16-case-set', 'Sign the ledger', 'Your initials, where they belong.', 'stand', (x) => {
      setKey(x, 'act4.case', case16o(x).strength);
      return [p('You go down the column with the pencil, and where you checked a page you initial it again, firmly, and where you did not you write beside it, small, TAKEN ON TRUST, and underline it. It is a case now. It is an honest one. Something you can carry into a room and put your name to.')];
    }),
  ];
}

// ── The stand: the aim and the notice ──

function standBlocks(s: GameState): Block[] {
  return [
    p('Six o’clock, the table under the wall, the ledger squared in front of you. The real decision of the day is not what she will say. It is what you want to have signed by the time you walk out of that room: a public accusation, a private bargain, a clean pair of hands, or a woman’s name.'),
    ...(exposeOpen16(s) ? [] : [t('To publish, with my own name under every page, I would need pages I had checked myself. I took too much on trust. I can’t sign what I haven’t read.')]),
  ];
}

const NOTICE: Record<'expose' | 'trade' | 'cut' | 'nell', string> = {
  expose: 'EVERY PAGE ENCLOSED IS SIGNED. EVERY SIGNATURE IS MINE. THE REST GOES TO THE PRESS AT NINE.',
  trade: 'I HAVE SOMETHING YOU WOULD RATHER NOT SEE PUBLISHED, AND AN OPEN MIND ABOUT ITS PRICE. SIX O’CLOCK.',
  cut: 'I AM COMING TO TELL YOU WHAT I CAN PROVE. THE REST I HAVE LEFT WHERE I FOUND IT.',
  nell: 'ELEANOR LINDEN. SIX O’CLOCK.',
};

function standChoices(s: GameState): C16Choice[] {
  const rafe = rafeComes16(s);
  const a = (id: 'expose' | 'trade' | 'cut' | 'nell', label: string, hint: string, body: Block[]) =>
    offer('o16-aim-' + id, label, hint, 'retinue', (x) => {
      setKey(x, 'act4.aim', id);
      setKey(x, 'act4.notice', id);
      return [...body, p('Then the notice. One line, typed, on a plain sheet from the pad by the window, signed with your own name and nothing else, and couriered to the Vesper by seven, so that six people read it over breakfast:'), q('The notice', NOTICE[id]), t('Reasonable notice would be a day. I am giving them eleven hours. A courier would call that generous.')];
    });
  return [
    ...(exposeOpen16(s)
      ? [a('expose', 'Expose, with provenance owned', 'The defect, the catalogue, the order: published, every page signed by you.', [
          t('Not a leak. A publication, with my name under it, and a name under every page: the pages I checked, my initials; the pages I could not, my own signature all the same, because I chose to carry them. The strongest thing I can do, and the one thing nobody can later say I did not stand behind.'),
        ])]
      : []),
    a('trade', 'Trade, quietly', rafe ? 'Meridian’s written undertaking, Rafe’s safety, a name out of a catalogue. Nobody reads about it.' : 'Meridian’s written undertaking and a name out of a catalogue. Nobody reads about it.', [
      t('Not a surrender. A price. The defect for something concrete and private: a signed undertaking, a name taken out of every catalogue, and a safe river for a man who carried their paper for ten years. Nobody reads a word of it. The switch stays armed.'),
    ]),
    a('cut', 'Cut the source', rafe ? 'Say only what you can prove alone. Walk away from every page you could not check, and from him.' : 'Say only what you can prove alone, and walk away from every page you could not check.', [
      t('Everything I proved myself, and nothing else, said to their faces, and then out: no pages I could not check, no one’s truth but my own. A free agent. Owing nobody.'),
      ...(rafe ? [t('And him. I said I could do it. I would have to do it standing in the room.')] : []),
    ]),
    a('nell', 'Nell’s name', 'Said out loud in that room, by the woman who signed the order.', [t('Not justice. Nobody can give her that. Her name, out loud, in that room, from that mouth. That much I can do.')]),
  ];
}

// ── The retinue: who comes ──

const insideScene: Record<Who, [string, string, Block[]]> = {
  rafe: ['Rafe, in the room', 'He asks to hear it said. He knows the building. He will have to stand there.', [
    p('Rafe at the door at eight in his courier’s jacket with a clean collar under it, hat in both hands, and a look on his face like a man who has been rehearsing a sentence in a lift.'),
    q('Rafe', 'I’d like to be in the room when she says it. Whatever she says. I know that’s yours to decide. I’ll stand by the wall and I won’t say a word. I’ve been standing by that wall for ten years with a crate. I’m good at it.'),
  ]],
  maya: ['Maya', 'The inquiry, with its tabs.', [p('Maya at your door at half past seven with a box, three highlighters and a face like Christmas.'), q('Maya', 'I’ve waited my whole career to serve something on somebody who deserves it. I brought tabs. Nobody at that table has ever seen tabs like these.')]],
  marsh: ['Owen Marsh', 'His notice to produce, and his bicycle clips.', [p('Marsh with a box of files, a Markets Authority notice to produce signed at six, and his bicycle clips still on.'), q('Owen Marsh', 'I’m not strictly allowed in rooms like that. I have a piece of paper that says I am. We’ll see which of us is right.')]],
  nora: ['Nora Linden', 'Off the overnight flight.', [p('Nora off the overnight flight from Singapore with Nell’s photograph in her handbag and her face set.'), q('Nora Linden', 'I want to see her face when somebody says it. That’s all I want. I’ve wanted it for three years.')]],
  iris: ['Iris Moreau', 'She stood in that room for four years.', [p('Iris at the door at eight, in a coat that is not a house coat, with her hair down.'), q('Iris Moreau', 'I know which chair squeaks. I know which frame she looks at when she lies. Take me. It would be the first time I’ve walked into that room as somebody who could leave.')]],
};

function retinueBlocks(): Block[] {
  return [
    p('Morning. The ledger calls it a retinue: who goes in with the principal, and who waits outside with a phone and a number to ring.'),
    t('Two inside, at most. One outside. Or nobody, which is how I read my first page.'),
  ];
}

function handChoices(s: GameState): C16Choice[] {
  const k = (id: 'girl' | 'rafe' | 'self', label: string, hint: string, body: Block[]) =>
    offer('o16-hand-' + id, label, hint, 'retinue', (x) => {
      set16(x, 'o-hand', id);
      return body;
    });
  return [
    k('girl', 'Hand it to a girl on a moped', 'With a docket. Signed for.', [p('At seven the notice goes, in a plain envelope, to a girl on a moped in a yellow jacket, who has a grey carbon docket pad on a clip and asks you to sign for having handed it over. You sign. She tears off the top copy and gives it to you, and you put it in the ledger, at the back, under C. It is the first time you have ever signed for sending anything.')]),
    ...(rafeComes16(s)
      ? [k('rafe', 'Let Rafe carry it', 'He knows the door. He has never rung its bell.', [p('Rafe takes it from you on the iron stair at seven, and looks at the front of the envelope, and at the name of the house, and does not say anything for the length of a held breath. Then he puts it inside his jacket, against his chest, where the others have always gone, and says only: “I’ll ring the front bell. I’ve never rung the front bell.”')])]
      : []),
    k('self', 'Take it to the door yourself', 'And ring.', [p('You take it to the Embankment yourself at seven, in the grey, and climb the black steps of the Vesper in your own coat, and ring the bell, and hand it to a doorman who has to be told twice that you are not delivering a flower. “For Mrs Laurent,” you say. “From the product.”')]),
  ];
}

function retinueChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'o-hand')) return handChoices(s);
  if (!key(s, 'act4.inside-done')) {
    const chosen = inside(s);
    const n = chosen.length;
    const picks = inside16o(s)
      .filter((w) => !chosen.includes(w))
      .map((w) => {
        const [label, hint, body] = insideScene[w];
        return offer('o16-inside-' + w, label, hint, 'retinue', (x) => {
          setKey(x, 'act4.inside', [...chosen, w].join(','));
          if (w === 'rafe') setKey(x, 'act4.rafe', 'room');
          if (n + 1 >= 2) setKey(x, 'act4.inside-done');
          return body;
        });
      });
    return [
      ...picks,
      offer(n ? 'o16-inside-done' : 'o16-inside-none', n ? 'That’s enough' : 'Nobody inside', n ? 'Two is a retinue. More is a delegation.' : 'Alone into the room. Harder. Allowed.', 'retinue', (x) => {
        setKey(x, 'act4.inside-done');
        if (!n) setKey(x, 'act4.inside', '');
        return n ? [] : [t('Alone. She will like that. Let her.')];
      }),
    ];
  }
  const inn = inside(s);
  const o = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o16-outside-' + id, label, hint, 'spread', (x) => {
      setKey(x, 'act4.outside', id);
      if (rafeComes16(x) && !inn.includes('rafe')) setKey(x, 'act4.rafe', id === 'rafe' ? 'door' : 'absent');
      return body;
    });
  return [
    ...(rafeComes16(s) && !inn.includes('rafe')
      ? [o('rafe', 'Rafe, at the river door', 'The one door he knows. A crate of lilies, and a phone.', [
          p('You ring him, and he answers before it has finished ringing.'),
          q('Rafe', 'The river door. Six o’clock. If you haven’t rung me by seven, I’ll be in the street, and I won’t be quiet. I’d like to be quiet. I’ll manage.'),
        ])]
      : []),
    ...(marshIn(s) && !inn.includes('marsh') ? [o('marsh', 'Marsh, across the road', 'The minister’s number on his phone.', [q('Owen Marsh', 'Seven o’clock. If you haven’t rung, I ring the minister. I’d rather not. He says “going forward”.')])] : []),
    ...(irisIn(s) && !inn.includes('iris') ? [o('iris', 'Iris, from a station', 'The switch, wherever she is.', [q('Iris Moreau', 'I’m in a station you’ve never heard of with your envelope in my coat. Seven o’clock. Don’t make me open it. I hate paperwork.')])] : []),
    o('switch', 'The switch', 'A phone call at seven if you haven’t walked out.', [p('You ring each of the people who hold an envelope, and say the same eleven words, and hang up: “If you haven’t heard from me by seven, open it.”')]),
  ];
}

// ── The spread: the order of things ──

type Card = 'ledger' | 'nell' | 'slip' | 'cards' | 'page' | 'lim';
const cardName: Record<Card, string> = { ledger: 'your signed ledger', nell: 'the Jakarta order', slip: 'the Rotterdam slip', cards: 'the 1109 cards', page: 'page seven', lim: 'LIM, R.' };
const cardHint: Record<Card, string> = {
  ledger: 'Every page, and who checked it.',
  nell: 'The burn, signed C.',
  slip: 'A man sent away, in her own hand.',
  cards: 'The product, in use.',
  page: 'Yourself, torn out of their book.',
  lim: 'Ten years of Tuesdays. Reliable. Sentimental.',
};
const cardsHeld = (s: GameState): Card[] => [
  'ledger',
  ...(key(s, 'out.linden15') ? ['nell' as Card] : []),
  ...(key(s, 'out.slip15') ? ['slip' as Card] : []),
  ...(took(s) === 'cards' ? ['cards' as Card] : []),
  'page',
  ...(took(s) === 'lim' ? ['lim' as Card] : []),
];

function spreadBlocks(): Block[] {
  return [
    p('Noon. A courier at the door, a girl on a moped, with a black envelope, Vesper stock, and inside it a single card in the looping green hand: her reply to your notice.'),
    q('The card', 'Received with thanks. So you have signed everything. How very like a bookkeeper, darling. C.'),
    t('She has read it. Every word. And she has found, of all things to say, the one word that is not a threat.'),
  ];
}

const cardsLine = p('Then the cards on the table in a row. What goes down first, in front of the woman who sold her. And which one you keep in your pocket, for the moment she thinks she has won.');

function replyChoices(): C16Choice[] {
  const r = (id: 'bin' | 'pin' | 'file', label: string, hint: string, body: Block[]) =>
    offer('o16-reply-' + id, label, hint, 'spread', (x) => {
      set16(x, 'o-reply', id);
      return [...body, cardsLine];
    });
  return [
    r('bin', 'In the bin', 'With the tea bags.', [p('You put it in the bin with this morning’s tea bags, green ink down, and wash your hands, which is childish, and helps.')]),
    r('pin', 'Pin it to the wall', 'With the others.', [p('You pin it to the wall with the others, in the corner, where it can watch you get dressed. Let her. It is the last time.')]),
    r('file', 'File it in the ledger', 'Under “C.”, with the rest.', [p('You file it in the ledger under C., in date order, with the Jakarta order and a slip the colour of weak tea. One more piece of paper in her hand.'), t('Received. She taught me that word. I’m keeping it.')]),
  ];
}

function spreadChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'o-reply')) return replyChoices();
  const first = key(s, 'act4.first') as Card | undefined;
  if (!first)
    return cardsHeld(s).map((c) =>
      offer('o16-first-' + c, 'First: ' + cardName[c], cardHint[c], 'spread', (x) => {
        setKey(x, 'act4.first', c);
        return [p('You put ' + cardName[c] + ' on top of the pile.')];
      }),
    );
  return [
    ...cardsHeld(s)
      .filter((c) => c !== first)
      .map((c) =>
        offer('o16-held-' + c, 'Keep back: ' + cardName[c], c === 'slip' ? 'For the moment she thinks she has won. And for whoever else is in the room.' : 'In your pocket, for the moment she thinks she has won.', 'coat', (x) => {
          setKey(x, 'act4.held', c);
          return [p('You fold ' + cardName[c] + ' into the inside pocket of your jacket, where you will feel it all evening, against your ribs.')];
        }),
      ),
    offer('o16-held-none', 'Keep nothing back', 'Everything on the table.', 'coat', (x) => {
      setKey(x, 'act4.held', 'none');
      return [t('Nothing held back. She will be looking for the card in my pocket. There isn’t one. Let her look.')];
    }),
  ];
}

// ── The coat: armour ──

function coatBlocks(): Block[] {
  return [p('Four o’clock. Getting dressed as a woman with something to sign: finished, fitted, shoes you can walk out in.')];
}

function leaveChoices(): C16Choice[] {
  const l = (id: 'take' | 'leave' | 'write', label: string, hint: string, body: Block[]) =>
    offer('o16-leave-' + id, label, hint, 'steps', (x) => {
      set16(x, 'o-leave', id);
      return body;
    });
  return [
    l('take', 'Take the card off the wall', 'LINDEN, E. For your pocket.', [p('At the door you go back, and take the card off the wall, LINDEN, E., in your own capitals, and put it in your pocket with the photograph, the slip and the pencil. Whatever happens at six, it goes with you.')]),
    l('leave', 'Leave it where it is', 'It lives here. It will be here.', [p('You leave the card on the wall, where it has been for a week, under the others, and look at it once, from the door. Whatever happens at six, there will be a room over the water with a wall in it, and a name on the wall, and a door that locks from inside.')]),
    l('write', 'Write one line under it', 'A pencil, a minute, a sentence.', [p('You take the pencil from the table and write, under LINDEN, E., in small capitals: SIGNED. Then you put the pencil down, and go.')]),
  ];
}

function coatChoices(s: GameState): C16Choice[] {
  if (key(s, 'act4.dressed-with') && !get16(s, 'o-leave')) return leaveChoices();
  if (!key(s, 'act4.wear')) {
    const w = (id: 'black' | 'grey' | 'plain', label: string, hint: string, body: Block[]) =>
      offer('o16-wear-' + id, label, hint, 'coat', (x) => {
        setKey(x, 'act4.wear', id);
        return body;
      });
    return [
      w('black', 'Your own black', 'Bought with your own money. Nobody else’s.', [p('Your own black, the one you have had taken in twice, bought with your own money. Nothing on you tonight belongs to anybody else.')]),
      w('grey', 'Her grey, worn back at her', 'Her colour. Her house. Yours, tonight.', [p('Grey. A good grey, the soft expensive grey of every dress she has ever worn into a room, cut close, and you wear it exactly as she does: as if the room had been built to hold it. She taught you what it means. Tonight you are using it.')]),
      w('plain', 'Flat shoes and a plain coat', 'The way a woman in a photograph dressed.', [p('A plain dark coat, flat shoes, no jewellery but a pencil in your hair. The kind of woman who goes to a harbour wall on a Sunday and laughs at the person holding the camera. Nobody in that room has ever seen what it looks like to walk in as her.')]),
    ];
  }
  const d = (id: 'rafe' | 'maya' | 'iris' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('o16-dressed-' + id, label, hint, 'coat', (x) => {
      setKey(x, 'act4.dressed-with', id);
      return body;
    });
  return [
    ...(rafeComes16(s)
      ? [d('rafe', 'Let Rafe straighten your collar', 'He is on the stair with an envelope.', [
          p('He comes up the iron stair at half past four with a plain envelope held in both hands the way he has held ten years of them, and stops in front of you, and looks at your collar, and does not touch it until you nod.'),
          q('Rafe', 'It’s a thing I notice. I notice what’s out of place. It’s the job. Your collar’s a bit out of place.'),
          p(chosenNight(s) ? 'He sets it right with the backs of two fingers, and his hand stays against your neck a moment longer than a collar needs, and you let it, and then you kiss him once, because you choose to, and he lets you go first.' : 'He sets it right with the backs of two fingers, and takes his hand away at once, and puts the envelope in your coat pocket. “Deliver it yourself,” he says. It is a joke. It is also very nearly a prayer.'),
        ])]
      : []),
    ...(mayaIn(s) ? [d('maya', 'Let Maya do your hair', 'And a lecture on evidential chains.', [p('Maya at the bathroom mirror with a mouthful of pins, doing your hair the way she did before Adrian’s first hearing, and explaining the chain of custody for every document in the box while she does it, and at the end: “There. Now go and serve her.”')])] : []),
    ...(irisIn(s) ? [d('iris', 'Let Iris do your face', 'The house way. Then one eye wiped clean.', [p('Iris at the table with a roll of brushes, doing your face the way the Vesper does it, perfectly, for four minutes, and then taking a tissue and wiping one eye clean again.'), q('Iris Moreau', 'So that she sees what she made, and what you did with it. In the same face.')])] : []),
    d('alone', 'Alone', 'Nobody’s hands but yours.', [p('Alone, at the long mirror. The cuffs take you three goes. You get them on the third.')]),
  ];
}

// ── The steps: the way in ──

function stepsBlocks(): Block[] {
  return [p('A quarter to six. The Embankment in the last of the light, the river the colour of a knife, and the Vesper’s black glass front with no name on it. Round the side, the river door, shut, and nobody at it yet.')];
}

function lastChoices(): C16Choice[] {
  const k = (id: 'tide' | 'windows' | 'pockets', label: string, hint: string, body: Block[]) =>
    offer('o16-last-' + id, label, hint, 'steps', (x) => {
      set16(x, 'o-last', id);
      return body;
    });
  return [
    k('tide', 'Look at the tide', 'The same river as the terminal.', [p('You stop at the rail and look at the tide, coming up the river towards the old ferry terminal with the evening on its back, the same tide you watched come back over the mud on a night when nothing happened to you. It does not care. It is the most restful thing in London.')]),
    k('windows', 'Count the lit windows', 'On the Vesper’s front. Eleven.', [p('You count the lit windows on the black glass front, from the bottom, as you used to count the floors in the lift: eleven. Then you count the dark ones, the ones that are only reflection, and get fifteen, and understand that most of what the Vesper shows the street is the street.')]),
    k('pockets', 'Touch what is in your pockets', 'One by one.', [p('You touch what is in your pockets, one thing at a time, as a woman does before an examination: the ledger, folded small; a pencil with a chewed end; the slip, if you kept it, with its brass pin; the cheap phone, which will ring at twenty to three whatever happens in the next hour. It is a very small inventory. It is all yours.')]),
  ];
}

function stepsChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'o-last')) return lastChoices();
  const arr = (id: 'river' | 'notice' | 'front' | 'car', label: string, hint: string, body: Block[]) =>
    offer('o16-arrive-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.arrive', id);
      setKey(x, 'act4.benton', 'absent');
      if (!key(x, 'act4.rafe')) setKey(x, 'act4.rafe', 'absent');
      note(x, 'o-approach', `Evelynn arrived at the Vesper for Meridian’s board with the aim “${key(x, 'act4.aim')}”, notice served, the case ${key(x, 'act4.case')}, first card ${key(x, 'act4.first')}, and ${key(x, 'act4.held') === 'none' ? 'nothing held back' : key(x, 'act4.held') + ' held back'}.`, 'The approach');
      return [...body, q('The doorman', 'They’re expecting you.'), p('And then, for the first time, he adds, very quietly:'), q('The doorman', 'Good luck, miss.'), ...(key(x, 'act4.notice') ? [p('And, lower still, as he opens the door: “They read it. Twice. Nobody’s ever signed anything in this house before.”')] : [])];
    });
  return [
    ...(rafeComes16(s)
      ? [arr('river', 'By the river door, with Rafe', 'The evening delivery. The same blind minute.', [p('The river door at six minutes to six, the evening florists’ van with its back doors open, and a man in a courier’s jacket with a crate on his shoulder, who does not look at you and does not need to. The lock lets go. You walk through the service door of the house that sold you, behind a man carrying lilies, and he does not say a word until you are inside.'), q('Rafe', 'That’s my door, and I never once used it to go in. Walk in front of me. Please.')])]
      : []),
    ...(marshIn(s) ? [arr('notice', 'With Marsh’s notice', 'The Markets Authority’s car, which is his bicycle.', [p('Marsh locks his bicycle to the Vesper’s railings, which nobody has ever done, and takes his clips off, and holds the door for you with the notice to produce in his other hand. You arrived by taxi. He arrived by conscience.')])] : []),
    arr('front', 'The front door, alone', 'The door simply opens.', [p('Up the steps on your own, and the door simply opens.')]),
    arr('car', 'In the car she sends', 'As her guest. The one thing she won’t expect you to use.', [p('Celeste’s car at half past five, a driver who does not look at you, and you arrive as her guest, which is exactly what she expects, and the one thing she will not expect you to use.')]),
  ];
}

// ── The long room ──

function completeBlocks(s: GameState): Block[] {
  const aim = key(s, 'act4.aim');
  const inn = inside(s);
  const rafe = key(s, 'act4.rafe');
  return [
    p('Six o’clock. The long room. The empty frames lit as if they held something. A table down the middle, seven chairs, and at it Meridian’s board: Anton Deverell in the chair, shipping and insurance; Marguerite Soames, who reads everything; three men whose names you have never been told. In front of each of them, squared, your notice.'),
    ...(rafe === 'room' ? [p('By the wall, under the empty frame nearest the door, a man in a courier’s jacket with his hat in both hands, standing exactly as he has stood for ten years, with nothing in his arms. Nobody at the table looks at him. They have never once looked at him.')] : rafe === 'door' ? [p('And in the street behind you, at the river door, a man you cannot see, with a crate of lilies, and a phone, and ten years of not being looked at.')] : []),
    ...(inn.includes('marsh') ? [p('Marsh in the corner with his box of files and his bicycle clips in his pocket, doing what he does best, which is looking like nobody in particular.')] : []),
    p('At the head of the table, in grey, Celeste Laurent stands up.'),
    q('Celeste Laurent', rafe === 'room' ? 'Darling. You came as yourself. And you brought the post. How very proper of you. It is a reunion.' : 'Darling. You came as yourself. So did I. And you have signed everything. How very like a bookkeeper.'),
    t(aim === 'expose' ? 'Every page, and my name under every page. Let her read me back to myself.' : aim === 'trade' ? 'A price. A signature. A name out of a catalogue. And then the whole room forgets I was ever here.' : aim === 'cut' ? 'What I can prove, said to her face, and then out. I owe nobody their truth, and nobody owes me theirs.' : 'Eleanor Linden. Say it. I am not leaving until you say it.'),
    ...(import.meta.env.VITE_EVE_CHAPTER17 === '1' ? [] : [p('[Chapters 17–18 · outside road — in development]')]),
  ];
}

export function outsideBlocks16(s: GameState): Block[] {
  if (s.phase === 'sheet') return sheetBlocks(s);
  if (s.phase === 'stand') return standBlocks(s);
  if (s.phase === 'retinue') return retinueBlocks();
  if (s.phase === 'spread') return spreadBlocks();
  if (s.phase === 'coat') return coatBlocks();
  if (s.phase === 'steps') return stepsBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices16(s: GameState): C16Choice[] {
  if (s.phase === 'sheet') return sheetChoices(s);
  if (s.phase === 'stand') return standChoices(s);
  if (s.phase === 'retinue') return retinueChoices(s);
  if (s.phase === 'spread') return spreadChoices(s);
  if (s.phase === 'coat') return coatChoices(s);
  if (s.phase === 'steps') return stepsChoices(s);
  return [];
}
