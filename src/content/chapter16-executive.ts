/** Chapter 16 (Executive route, lane id `executive`) · The Term:
 * layout → purpose → company → sequence → clasp → embankment → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_16_THE_TERM_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_16_SCRIPT.md. The shared approach ("The Approach") in
 * Executive framing: the morning of the board. The case laid out honestly (act4.case; Julian's file counts for most).
 * The aim is the Executive position (act4.aim): the term enforced (needs Julian at Helix or on the record), exit with
 * rights intact (always; the door term makes it cheaper, and the more of his she holds the more she leaves behind,
 * said honestly, never as a punishment), status spent (needs him at risk), or Nell (always); closed aims say why. Who
 * comes (two inside, one outside; Julian as Helix, as a witness, or outside: act4.julian). The first card and the one
 * held back. Armour (the dress on his card unless she gave it back, her own black, the grey silk; Julian at the clasp,
 * "Come back.", Maya, or nobody; heat 1–2). The way in (Helix's appointment in Helix's car, the front door, the service
 * door, Celeste's car); "Good luck, Ms Vale." The long room; Celeste stands, as herself. Entered from an Executive
 * `chapter15.complete`; ends at the Chapters 17–18 in-development stop, having set the shared act4.* contract. Local
 * helpers mirror chapter16.ts; choice ids carry `x16-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

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

export const EXECUTIVE_PHASES16 = ['layout', 'purpose', 'company', 'sequence', 'clasp', 'embankment'] as const;
export const isExecutive16 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase16 = (s: GameState) => isExecutive16(s) && ((EXECUTIVE_PHASES16 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const sig = (s: GameState) => key(s, 'exec.signature') as 'enforced' | 'spent' | 'fell' | undefined;
const cost15 = (s: GameState) => key(s, 'exec.cost15');
const spentAlly = (s: GameState, who: string) => cost15(s) === 'ally' && key(s, 'c15.cost-who') === who;
const nellOrder = (s: GameState) => key(s, 'exec.took15') === 'nell';
const cards1109 = (s: GameState) => key(s, 'exec.took15') === 'cards' || !!key(s, 'exec.card13');
const onRecord = (s: GameState) => cost15(s) === 'julian';
/** Julian's standing at the board: a seat at the table as Helix, or a witness with his own file. */
export const julianRole16 = (s: GameState): 'helix' | 'witness' => ((sig(s) === 'enforced' || sig(s) === 'spent') && !onRecord(s) ? 'helix' : 'witness');
export const termOpen16 = (s: GameState) => sig(s) === 'enforced' || sig(s) === 'spent' || onRecord(s);
export const spentOpen16 = (s: GameState) => sig(s) === 'spent' || sig(s) === 'fell' || onRecord(s);
const keptCount = (s: GameState) => (cost15(s) === 'kept' ? 0 : Number(key(s, 'exec.kept') ?? 0) + (key(s, 'exec.flat') === 'accepted' ? 1 : 0));
const public16 = (s: GameState) => !!get5(s, 'published') || onRecord(s);

/** The case, stated honestly (design §2): points and the reasons behind them. */
export function case16x(s: GameState): { strength: 'thin' | 'supported' | 'strong' | 'overwhelming'; reasons: string[] } {
  const r: [boolean, number, string][] = [
    [!!key(s, 'exec.julian-file'), 2, 'MERCER, J.: eleven signatures, eleven page thirty-ones, and her card calling him collateral'],
    [['kept', 'pulled'].includes(key(s, 'exec.file') ?? ''), 1, 'page thirty-one, from the tray, before the Vesper ever knew'],
    [nellOrder(s), 1, 'the Jakarta order, signed C.'],
    [cards1109(s), 1, 'the 1109 cards: every placement filmed'],
    [termOpen16(s), 1, 'Julian, who will say it himself'],
    [key(s, 'exec.marsh13') === 'ally' && !spentAlly(s, 'marsh'), 1, 'Owen Marsh and his inquiry'],
    [['truth', 'kind'].includes(key(s, 'exec.nora12') ?? ''), 1, 'Nora Linden'],
    [!!key(s, 'exec.sloane-file') || key(s, 'act3.sloane') === 'allied', 1, 'Sloane, and her file'],
    [key(s, 'c12.rec.x-ashby') !== undefined, 1, 'Colin Ashby: “a friend of hers”'],
  ];
  const got = r.filter(([ok]) => ok);
  const pts = got.reduce((a, [, n]) => a + n, 0);
  return { strength: pts >= 7 ? 'overwhelming' : pts >= 5 ? 'strong' : pts >= 3 ? 'supported' : 'thin', reasons: got.map(([, , why]) => why) };
}

type Who = 'julian' | 'sloane' | 'marsh' | 'nora' | 'iris' | 'maya';
export function inside16(s: GameState): Who[] {
  const out: Who[] = ['julian'];
  if (key(s, 'act3.sloane') === 'allied' || key(s, 'exec.sloane14') === 'accepted') out.push('sloane');
  if (key(s, 'exec.marsh13') === 'ally' && !spentAlly(s, 'marsh')) out.push('marsh');
  if (['truth', 'kind'].includes(key(s, 'exec.nora12') ?? '')) out.push('nora');
  if (key(s, 'act3.ally.iris') === 'in' && !spentAlly(s, 'iris')) out.push('iris');
  if (key(s, 'c6.maya') === 'restored') out.push('maya');
  return out;
}
const inside = (s: GameState): Who[] => ((key(s, 'act4.inside') ?? '').split(',').filter(Boolean) as Who[]);

export function placeExecutive16(s: GameState): string | undefined {
  if (s.phase === 'company' && key(s, 'act4.inside-done')) return 'Morning · Outside';
  if (s.phase === 'sequence' && key(s, 'act4.first')) return 'Noon · The one you keep';
  if (s.phase === 'clasp' && key(s, 'act4.wear')) return '16:30 · The mirror';
}

// ── The entry ──

export function beginExecutive16(): C16Choice {
  return offer('begin-executive', 'Thursday', 'The board meets at six.', 'layout');
}

// ── Layout: the case ──

function layoutBlocks(s: GameState): Block[] {
  const c = case16x(s);
  return [
    p('Thursday, five in the morning. You take every card down from the wardrobe door, one by one, and lay them on the floor in the order they will matter, the way Adrian used to lay out a filing before a hearing.'),
    p('MERCER, J. in the middle, where his name has always been.'),
    p('What you hold: ' + (c.reasons.length ? c.reasons.join('; ') : 'less than you would like, and all of it yours') + '.'),
    q('The card', 'THE CASE: ' + c.strength.toUpperCase() + '.'),
    t(c.strength === 'thin' ? 'Thin. Then I walk in thin, and make up the rest with my face.' : c.strength === 'overwhelming' ? 'Overwhelming. She has never been overwhelmed in her life. I would like to be there when she finds out what it feels like.' : 'Enough to make her sit down. Not enough to make her stay down. Then I choose carefully.'),
  ];
}

function layoutChoices(): C16Choice[] {
  return [
    offer('x16-case-set', 'Pick up the cards', 'In order. You know the order now.', 'purpose', (x) => {
      setKey(x, 'act4.case', case16x(x).strength);
      return [p('You pick them up in order, square the edges on the floor, and put a rubber band round them, and they are a case. Something you can carry into a room.')];
    }),
  ];
}

// ── Purpose: the aim ──

function purposeBlocks(s: GameState): Block[] {
  return [
    p('Six o’clock, the kitchen table, the kettle, the cards in their rubber band. The real decision of the day is not what she will say. It is what you want his name to mean when you walk out of that room.'),
    ...(termOpen16(s) ? [] : [t('The term needs him in the room as Helix, or on the record. He isn’t, and he isn’t. I would be enforcing a term for a company that let him go.')]),
    ...(spentOpen16(s) ? [] : [t('Spending myself to keep him standing? He is standing. He won that on his own.')]),
  ];
}

function purposeChoices(s: GameState): C16Choice[] {
  const a = (id: 'term' | 'exit' | 'spent' | 'nell', label: string, hint: string, body: Block[]) =>
    offer('x16-aim-' + id, label, hint, 'company', (x) => {
      setKey(x, 'act4.aim', id);
      return body;
    });
  const kc = keptCount(s);
  return [
    ...(termOpen16(s)
      ? [a('term', 'The term, enforced', 'With him. Strike 14.3 from every Helix deal, and make Meridian let Helix go.', [t('Not revenge. A clause, struck. A company let go. A man who signed what he was given, standing up in a room and unsigning it, with me beside him.')])]
      : []),
    a('exit', 'Exit, with your rights intact', key(s, 'exec.term.door') ? 'Your own name, nothing owed. Your contract already says you can.' : 'Your own name, nothing owed.', [
      t(kc >= 2 ? 'Out of Helix, out of anything that was his. There is a lot of his still. I will leave it on the doorstep, and it will cost me, and it will be mine to have left.' : kc === 1 ? 'Out of Helix, out of anything that was his. There is one thing of his left. I will give it back.' : 'Out of Helix, and owing nobody. I made sure of that already.'),
      ...(key(s, 'exec.term.door') ? [t('The door, I wrote into my contract on the first day. Any time, for any reason or none. References unreserved.')] : []),
    ]),
    ...(spentOpen16(s)
      ? [a('spent', 'Spend yourself for him', 'Everything you hold, traded for his release from 14.3.', [t('Everything on the table for him. Whatever is left of me after, I will walk out with. Less, and cleaner.')])]
      : []),
    a('nell', 'Nell’s name', 'Said out loud in that room, by the woman who signed the order.', [t('Not justice. Nobody can give her that. Her name, out loud, in that room, from that mouth. That much I can do.')]),
  ];
}

// ── Company ──

const insideScene: Record<Who, (s: GameState) => [string, string, Block[]]> = {
  julian: (s) =>
    julianRole16(s) === 'helix'
      ? ['Julian, as Helix', 'A Meridian client with a seat at the table.', [p('Julian at your door at eight with a Helix appointment letter for six o’clock, on the good paper, and his glasses in his hand.'), q('Julian Mercer', 'Helix has a seat. I’m told it’s by the door. I’d like to use it.')]]
      : ['Julian, as a witness', 'His own file in his own hands.', [p('Julian at your door at eight in a suit he has not worn since he left, with MERCER, J. under his arm.'), q('Julian Mercer', 'Not as Helix. As the man who signed them. I’d like to say so to her face.')]],
  sloane: () => ['Sloane', 'Axiom’s officer of record.', [p('Sloane in her kitchen at seven, ironing a shirt she has not worn in a year.'), q('Sloane', 'I was handed you with a verdict already on you. I’d like to be in the room when somebody finally reads it out.')]],
  marsh: () => ['Owen Marsh', 'The Authority, with his bicycle clips.', [p('Marsh with a box of files and his bicycle clips still on.'), q('Owen Marsh', 'I’m not allowed in rooms like that. I’m coming anyway. Put me by the door.')]],
  nora: () => ['Nora Linden', 'Off the overnight flight.', [p('Nora off the overnight flight from Singapore with Nell’s photograph in her handbag and her face set.'), q('Nora Linden', 'I want to see her. That’s all. I want to see her face when somebody says it.')]],
  iris: () => ['Iris', 'She knows the long room.', [q('Iris Moreau', 'I stood in that long room for four years. I know where the chairs are. I know which one she sits in when she means it.')]],
  maya: () => ['Maya', 'Because you need somebody who isn’t in any of the files.', [q('Maya', 'I’m not in any of their files. That’s my whole qualification. I’ll take it.')]],
};

function companyChoices(s: GameState): C16Choice[] {
  if (!key(s, 'act4.inside-done')) {
    const chosen = inside(s);
    const n = chosen.length;
    const picks = inside16(s)
      .filter((w) => !chosen.includes(w))
      .map((w) => {
        const [label, hint, body] = insideScene[w](s);
        return offer('x16-inside-' + w, label, hint, 'company', (x) => {
          setKey(x, 'act4.inside', [...chosen, w].join(','));
          if (w === 'julian') setKey(x, 'act4.julian', julianRole16(x));
          if (n + 1 >= 2) setKey(x, 'act4.inside-done');
          return body;
        });
      });
    return [
      ...picks,
      offer(n ? 'x16-inside-done' : 'x16-inside-none', n ? 'That’s enough' : 'Nobody inside', n ? 'Two is plenty. One may be.' : 'Alone into the room. Harder. Allowed.', 'company', (x) => {
        setKey(x, 'act4.inside-done');
        if (!n) setKey(x, 'act4.inside', '');
        return n ? [] : [t('Alone. She will like that. Let her.')];
      }),
    ];
  }
  const inn = inside(s);
  const o = (id: string, label: string, hint: string, body: Block[]) =>
    offer('x16-outside-' + id, label, hint, 'sequence', (x) => {
      setKey(x, 'act4.outside', id);
      if (id === 'julian') setKey(x, 'act4.julian', 'outside');
      if (!key(x, 'act4.julian')) setKey(x, 'act4.julian', 'waiting');
      return body;
    });
  return [
    ...(!inn.includes('julian') ? [o('julian', 'Julian, at the kerb', 'Outside, with Hal and the engine running.', [q('Julian Mercer', 'I’ll be outside. If you come out and want to go, we go. If you come out and want to stay, I’ll wait.')])] : []),
    ...(['take', 'once'].includes(key(s, 'exec.fav.car') ?? '') ? [o('hal', 'Hal, and the car', 'Engine running.', [q('Hal', 'Engine running, Ms Vale. As long as it takes.')])] : []),
    ...(key(s, 'exec.marsh13') === 'ally' && !inn.includes('marsh') ? [o('marsh', 'Marsh, across the road', 'The minister’s number on his phone.', [q('Owen Marsh', 'Seven o’clock. If you haven’t rung, I ring the minister.')])] : []),
    o('switch', 'The switch', 'A phone call at seven if you haven’t walked out.', [p('You ring each of them, and say the same eleven words, and hang up: “If you haven’t heard from me by seven, open it.”')]),
  ];
}

// ── Sequence: the order of things ──

type Card = 'julian' | 'nell' | 'cards' | 'page';
const cardName: Record<Card, string> = { julian: 'MERCER, J.', nell: 'the Jakarta order', cards: 'the 1109 cards', page: 'page seven' };
const cardsHeld = (s: GameState): Card[] => ['julian', ...(nellOrder(s) ? ['nell' as Card] : []), ...(cards1109(s) ? ['cards' as Card] : []), 'page'];

function sequenceBlocks(): Block[] {
  return [p('Noon. The cards on the table in a row. What goes down first, in front of the woman who sold you. And which one you keep in your pocket, for the moment she thinks she has won.')];
}

function sequenceChoices(s: GameState): C16Choice[] {
  const first = key(s, 'act4.first') as Card | undefined;
  if (!first)
    return cardsHeld(s).map((c) =>
      offer('x16-first-' + c, 'First: ' + cardName[c], c === 'julian' ? '14.3, in his hand. The collateral card.' : c === 'nell' ? 'The burn, signed C.' : c === 'cards' ? 'The product, in use.' : 'Yourself.', 'sequence', (x) => {
        setKey(x, 'act4.first', c);
        return [p('You put ' + cardName[c] + ' on top of the pile.')];
      }),
    );
  return [
    ...cardsHeld(s)
      .filter((c) => c !== first)
      .map((c) =>
        offer('x16-held-' + c, 'Keep back: ' + cardName[c], 'In your pocket, for the moment she thinks she has won.', 'clasp', (x) => {
          setKey(x, 'act4.held', c);
          return [p('You fold ' + cardName[c] + ' into the inside pocket of your jacket, where you will feel it all evening, against your ribs.')];
        }),
      ),
    offer('x16-held-none', 'Keep nothing back', 'Everything on the table.', 'clasp', (x) => {
      setKey(x, 'act4.held', 'none');
      return [t('Nothing held back. She will be looking for the card in my pocket. There isn’t one. Let her look.')];
    }),
  ];
}

// ── Clasp: armour ──

function claspBlocks(): Block[] {
  return [p('Four o’clock. Getting dressed as power, not display: finished, fitted, heels you can walk out in.')];
}

function claspChoices(s: GameState): C16Choice[] {
  if (!key(s, 'act4.wear')) {
    const w = (id: 'his' | 'black' | 'grey', label: string, hint: string, body: Block[]) =>
      offer('x16-wear-' + id, label, hint, 'clasp', (x) => {
        setKey(x, 'act4.wear', id);
        return body;
      });
    return [
      ...(key(s, 'exec.fav.card') === 'take' && cost15(s) !== 'kept'
        ? [w('his', 'The dress on his card', 'From the window on Sloane Street. Worn as yours now.', [p('The dress from the window on Sloane Street, bought on his card in the spring. You have worn it to the Vesper once as something he gave you. Tonight you wear it as something you chose.')])]
        : []),
      w('black', 'Your own black', 'Bought with your own money. Nobody else’s.', [p('Your own black, the one you have had taken in twice, bought with your own money. Nothing on you tonight belongs to anybody else.')]),
      w('grey', 'The grey silk', 'Iris’s colour. The legends’ colour.', [p('Grey silk. Iris’s colour. The colour the legends wear when they are not being shown. Celeste will know exactly what it means.')]),
    ];
  }
  const d = (id: 'julian' | 'maya' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('x16-dressed-' + id, label, hint, 'embankment', (x) => {
      setKey(x, 'act4.dressed-with', id);
      return body;
    });
  return [
    d('julian', 'Let Julian do the clasp', 'At the back of your neck.', [
      p('He comes at half past four, and stands behind you at the mirror, and does up the clasp at the back of your neck with fingers that are not quite steady, and does not step back when he has finished. His mouth near your ear.'),
      q('Julian Mercer', 'Come back.'),
      q('You', 'I always do.'),
    ]),
    ...(key(s, 'c6.maya') === 'restored' ? [d('maya', 'Let Maya do your hair', 'The way she did before Adrian’s first hearing.', [p('Maya at the bathroom mirror with a mouthful of pins, doing your hair the way she did before Adrian’s first hearing, and not saying anything, and then, at the end, “There. Now go and ruin her.”')])] : []),
    d('alone', 'Alone', 'Nobody’s hands but yours.', [p('Alone. The clasp takes you three goes. You get it on the third.')]),
  ];
}

// ── The embankment ──

function embankmentBlocks(s: GameState): Block[] {
  return [
    p('A quarter to six. The Embankment in the last of the light, the river the colour of a knife, and the Vesper’s black glass front with no name on it.'),
    ...(public16(s) ? [p('There are photographers on the pavement. Somebody has told somebody something. Whatever happens in there, it will happen in front of them.')] : [p('The pavement is empty. Nobody knows you are here but the people who matter.')]),
  ];
}

function embankmentChoices(s: GameState): C16Choice[] {
  const arr = (id: 'helix' | 'front' | 'quiet' | 'car', label: string, hint: string, body: Block[]) =>
    offer('x16-arrive-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.arrive', id);
      setKey(x, 'act4.seen', public16(x) ? 'yes' : 'no');
      note(x, 'x-approach', `Evelynn arrived at the Vesper for Meridian’s board with the aim “${key(x, 'act4.aim')}”, the case ${key(x, 'act4.case')}, first card ${key(x, 'act4.first')}, and ${key(x, 'act4.held') === 'none' ? 'nothing held back' : key(x, 'act4.held') + ' held back'}.`, 'The approach');
      return [...body, q('The doorman', 'They’re expecting you.'), p('And then, for the first time, he adds, very quietly:'), q('The doorman', 'Good luck, Ms Vale.')];
    });
  const helixOk = julianRole16(s) === 'helix' && (inside(s).includes('julian') || key(s, 'act4.julian') === 'outside');
  return [
    ...(helixOk
      ? [arr('helix', 'In Helix’s car, by appointment', 'As a client. At the building that catalogued you.', [p('Helix’s car at the kerb, Hal holding the door, and you get out as Helix’s guest, by appointment, a client of the house, at the building that once had your photograph in a book.')])]
      : []),
    arr('front', 'The front door', public16(s) ? 'Through the photographers. The audience as shield.' : 'The door simply opens.', [p(public16(s) ? 'Through the photographers, who call your name, the one you are wearing, and the doorman cannot turn you away in front of them. The audience as shield.' : 'Up the steps, and the door simply opens.')]),
    arr('quiet', 'The service door', 'The alley.', [p(public16(s) ? 'The alley. Two men on the service stair, who expected you quiet, and step aside, because they were told to let you in and not told what to do if you looked at them like that.' : 'The alley, and the service stair, and nobody there at all.')]),
    arr('car', 'In the car she sends', 'As her guest. The one thing she won’t expect you to use.', [p('Celeste’s car at half past five, a driver who does not look at you, and you arrive as her guest, which is exactly what she expects, and the one thing she will not expect you to use.')]),
  ];
}

// ── The long room ──

function completeBlocks(s: GameState): Block[] {
  const aim = key(s, 'act4.aim');
  return [
    p('Six o’clock. The long room. The empty frames lit as if they held something. A table down the middle, seven chairs, and at it Meridian’s board: Anton Deverell in the chair, shipping and insurance; Marguerite Soames, who reads everything; three men whose names you have never been told.'),
    ...(key(s, 'act4.julian') === 'helix' && inside(s).includes('julian') ? [p('And by the door, in the chair marked HELIX GROUP, Julian Mercer, with his glasses on the table in front of him.')] : []),
    p('At the head of the table, in grey, Celeste Laurent stands up.'),
    q('Celeste Laurent', 'Darling. You came as yourself. So did I.'),
    t(aim === 'term' ? 'A clause. A company. A man. Let’s begin.' : aim === 'exit' ? 'I am going to walk out of this room owing nobody. First she is going to watch me do it.' : aim === 'spent' ? 'Everything I have, on the table, for him. Watch.' : 'Eleanor Linden. Say it. I am not leaving until you say it.'),
    p('[Chapters 17–18 · executive road — in development]'),
  ];
}

export function executiveBlocks16(s: GameState): Block[] {
  if (s.phase === 'layout') return layoutBlocks(s);
  if (s.phase === 'purpose') return purposeBlocks(s);
  if (s.phase === 'company') return [p('Morning. Who stands beside you, and who waits outside.')];
  if (s.phase === 'sequence') return sequenceBlocks();
  if (s.phase === 'clasp') return claspBlocks();
  if (s.phase === 'embankment') return embankmentBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices16(s: GameState): C16Choice[] {
  if (s.phase === 'layout') return layoutChoices();
  if (s.phase === 'purpose') return purposeChoices(s);
  if (s.phase === 'company') return companyChoices(s);
  if (s.phase === 'sequence') return sequenceChoices(s);
  if (s.phase === 'clasp') return claspChoices(s);
  if (s.phase === 'embankment') return embankmentChoices(s);
  return [];
}
