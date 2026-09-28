/** Chapter 16 (Predator route, lane id `predator`) · The Seventh Chair:
 * floor → want → beside → order → armour → door → room (its own end; the Celebrity `complete` is 'The Long Room').
 * Design: docs/story/PREDATOR_CHAPTER_16_THE_SEVENTH_CHAIR_DESIGN.md (owner-approved 2026-09-27, all eight decisions
 * as recommended); script: docs/story/scripts/PREDATOR_CHAPTER_16_SCRIPT.md. The shared Thursday, dawn to the door,
 * from the client side: she walks in as Helix's counterparty, and the seventh chair beside Celeste's is pulled out.
 * The case derived from what the Predator road left (act4.case, shown honestly); the Predator aims (act4.aim = seat |
 * wound | helix | nell; for the shared Ch17, wound ≈ expose, helix ≈ terms, nell = nell, seat is Predator's own); who
 * comes from the Predator cast, excluding anyone spent in Chapter 15; the first card and the one held back; Marcus's
 * midnight blue, the black, or Celeste's own green; the front door, Celeste's car, or Helix's. Chosen intimacy only,
 * heat 1–2 (a clasp). Entered from the Predator `chapter15.ledger`; the road stops at `chapter16.room` until the
 * Predator Chapter 17 exists. Writes the shared act4.* keys. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

type C16Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C16Choice['apply']): C16Choice => ({ id: 'chapter16.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (key(s, 'c16.rec.' + k) !== undefined) return;
  setKey(s, 'c16.rec.' + k, String(s.history.length));
  setKey(s, 'c16.event.' + k, String(s.revision));
  setKey(s, 'c16.layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c16.' + k);
  s.knowledge.push('c16.' + k);
}

export const PREDATOR_PHASES16 = ['floor', 'want', 'beside', 'order', 'armour', 'door', 'room'] as const;
export const isPredator16 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase16 = (s: GameState) => isPredator16(s) && (PREDATOR_PHASES16 as readonly string[]).includes(s.phase);

// ── What the Predator road left her ──

type Person = 'halvorsen' | 'marcus' | 'lucien' | 'julian' | 'marsh' | 'iris' | 'nora' | 'maya';
const personName: Record<Person, string> = { halvorsen: 'Halvorsen', marcus: 'Marcus', lucien: 'Lucien', julian: 'Julian', marsh: 'Owen Marsh', iris: 'Iris', nora: 'Nora', maya: 'Maya' };
/** Who Chapter 15's cost spent (c15.cost-who), as a person id. */
function spent16(s: GameState): Person | 'pryce' | undefined {
  if (!['ally', 'relationship'].includes(key(s, 'act3.cost') ?? '')) return;
  const who = key(s, 'c15.cost-who');
  return ({ Lucien: 'lucien', 'Owen Marsh': 'marsh', Iris: 'iris', Halvorsen: 'halvorsen', 'Mr Pryce': 'pryce', Julian: 'julian', Marcus: 'marcus', Maya: 'maya' } as Record<string, Person | 'pryce'>)[who ?? ''];
}
/** Who is still standing beside her (design §2), minus anyone spent. */
export function insiders16(s: GameState): Person[] {
  const out: Person[] = [];
  if (key(s, 'pred.halvorsen') === 'owes-her') out.push('halvorsen');
  if (key(s, 'pred.ally.marcus') === 'in') out.push('marcus');
  if (key(s, 'pred.ally.morel') === 'in') out.push('lucien');
  if (key(s, 'pred.julian') === 'ally') out.push('julian');
  if (key(s, 'pred.ally.marsh') === 'in') out.push('marsh');
  if (key(s, 'pred.ally.iris') === 'in') out.push('iris');
  if (key(s, 'pred.nora') === 'told') out.push('nora');
  if (key(s, 'c6.maya') === 'restored') out.push('maya');
  const gone = spent16(s);
  return out.filter((x) => x !== gone);
}

type Card = 'clients' | 'nell' | 'recordings' | 'flats' | 'clause' | 'page' | 'letters';
const cardLabel: Record<Card, [string, string]> = {
  clients: ['Celeste’s client ledger', 'Bound in green. Who bought whom, and for how much.'],
  nell: ['Nell’s order', 'Jakarta, signed C. The burn, not the death.'],
  recordings: ['The Claremont recordings', 'The product in use.'],
  flats: ['The nine flats', 'Geneva: nine standing orders, signed C. One of them is yours.'],
  clause: ['Clause 14.3', 'The fund’s first claim on every client’s company.'],
  page: ['Page forty', 'Yourself. TRANSFERRED, AT CLIENT REQUEST.'],
  letters: ['Her letters', 'From Marcus’s safe. The green C. on every one.'],
};
export function cards16(s: GameState): Card[] {
  const out: Card[] = [];
  if (key(s, 'pred.clients15') === 'taken') out.push('clients');
  if (key(s, 'act3.nell-order') === 'taken') out.push('nell');
  if (key(s, 'act3.cards') === 'taken') out.push('recordings');
  if (key(s, 'pred.geneva')) out.push('flats');
  if (['copied', 'amended'].includes(key(s, 'pred.sign') ?? '')) out.push('clause');
  out.push('page');
  if (key(s, 'pred.safe') === 'letters') out.push('letters');
  return out;
}

/** The case, counted honestly (design §2): the ledger and Nell's order count most. */
export function case16(s: GameState): { strength: 'thin' | 'supported' | 'strong' | 'overwhelming'; reasons: string[] } {
  const reasons: string[] = [];
  let n = 0;
  const add = (w: number, why: string) => {
    n += w;
    reasons.push(why);
  };
  const c = cards16(s);
  if (c.includes('clients')) add(2, 'Celeste’s client ledger, in green: every client, every transfer, every price. Nobody at that table can say they did not know.');
  if (c.includes('nell')) add(2, 'Nell’s order: Jakarta, three lines, signed C. The burn, on paper.');
  if (c.includes('recordings')) add(1, 'The Claremont drawer: the product in use.' + (key(s, 'pred.mirror') === 'complied' ? ' And a receipt with your own name on it, as operator.' : ''));
  if (c.includes('flats')) add(1, 'The nine flats: nine standing orders at Morel & Cie, signed C. One of them pays your rent.');
  if (c.includes('clause')) add(1, 'Clause 14.3, from Geneva: the fund’s first claim on its own clients’ companies.');
  if (c.includes('letters')) add(1, 'Her letters from Marcus’s safe, or your photographs of every page.');
  if (key(s, 'pred.lever8.archive')) add(1, 'The fund’s financing schedule from the Helix vault: six years of it.');
  if (key(s, 'act3.black-phone') === 'keep') add(1, 'The black phone, switched off: every word she ever sent you.');
  const w = insiders16(s).slice(0, 3);
  for (const x of w) add(1, `${personName[x]}, still standing, who will say what they saw.`);
  const strength = n >= 9 ? 'overwhelming' : n >= 6 ? 'strong' : n >= 3 ? 'supported' : 'thin';
  return { strength, reasons };
}
const exposed16 = (s: GameState) => !!get5(s, 'published') || key(s, 'pred.way') === 'press' || key(s, 'act3.cost') === 'visibility';

export function placePredator16(s: GameState): string | undefined {
  if (s.phase === 'beside' && key(s, 'act4.inside-done') === 'yes') return 'Late morning · Outside';
  if (s.phase === 'order' && key(s, 'act4.first')) return 'Noon · The card held back';
  if (s.phase === 'armour' && key(s, 'act4.wear')) return '16:40 · The clasp';
  if (s.phase === 'door') return key(s, 'act4.arrive') === 'car' ? '17:30 · The car she sent' : undefined;
}

// ── The floor ──

export function beginPredator16(): C16Choice {
  return offer('begin-predator', 'Thursday', 'The board meets at six. A chair has been laid for you.', 'floor');
}

function floorBlocks(s: GameState): Block[] {
  const { strength, reasons } = case16(s);
  return [
    p('You wake at a quarter to five with your heart already going, and lie in the dark for a minute deciding whether it is fear. It isn’t. It is the other thing, the thing you felt in Marcus’s office the day you said “Yours”.'),
    p('You take every card down off the wardrobe door, one by one, and lay them out on the floorboards in the order they will matter, the way Adrian laid out a filing the night before a hearing, in his socks.'),
    ...reasons.map((r) => p('· ' + r)),
    p(
      strength === 'overwhelming'
        ? 'When you have finished there is barely any floor left. You write the honest card and put it at the top: OVERWHELMING. Not a feeling. A count.'
        : strength === 'strong'
          ? 'When you have finished you write the honest card and put it at the top: STRONG. Enough to hurt them. Not enough to be careless.'
          : strength === 'supported'
            ? 'When you have finished you write the honest card and put it at the top: SUPPORTED. True, sourced, and not quite enough on its own. You will have to be the rest of it.'
            : 'When you have finished there are very few cards on the floor, and you write the honest one: THIN. You will have to walk in and be most of the case yourself.',
    ),
    p(key(s, 'pred.way15') === 'copy' ? 'At the top of the door, on its red thread, the copy of her key.' : 'At the top of the door, on its green ribbon, her key. You are giving it back to her tonight.'),
    t('I shall be there as myself, she said. She has laid a place for me. I have to decide, before six, which of me is going to sit in it.'),
  ];
}

// ── What she wants ──

function wantBlocks(s: GameState): Block[] {
  return [
    p('Six o’clock. The kitchen table, the case in its rubber band, and the question Adrian never let himself ask before a hearing: what do I want to walk out of that room with?'),
    p('On this road there is an answer Adrian could never have imagined, and it is sitting in the middle of the table like a fifth card. She has laid a chair for you. Not at the end, where the clients sit. Beside her.'),
    ...(key(s, 'pred.account') === 'taken' || key(s, 'pred.mirror') === 'complied' ? [t('I kept her card. I ran her Thursday. It would not be a leap. It would be a step.')] : [t('Everything I did this year was to not be what sits in that chair. That is exactly why she wants me in it.')]),
  ];
}

function wantChoices(s: GameState): C16Choice[] {
  const helixOpen = key(s, 'act3.cost') !== 'money' || key(s, 'pred.ally.morel') === 'in' || key(s, 'pred.halvorsen') === 'owes-her';
  const nellOpen = key(s, 'act3.nell-order') === 'taken' || key(s, 'pred.nell') === 'known';
  const a = (id: string, label: string, hint: string, body: Block[]) =>
    offer('aim-' + id, label, hint, 'beside', (x) => {
      setKey(x, 'act4.aim', id);
      return body;
    });
  return [
    a('seat', 'Take the seat', 'Go in to accept what she offers. Become what sits at that table, and run it better.', [
      p('The seat. Walk in, sit down beside her, and accept. Not as her creature: as her successor. Run the table the way she ran it, better, with your eyes open and your own ledger in the lining of your coat.'),
      t('The darkest thing I could do tonight is also the most honest. I have been climbing toward that chair since the first morning. Let me at least admit it, and sit down in it on purpose.'),
    ]),
    a('wound', 'Refuse it, and wound them from inside Helix', 'The client ledger and clause 14.3 on the table. Every client named.', [
      p('Refuse the chair, in front of all of them, and then open Helix like a coat and show them the knife: every client in her ledger named to the others, and the fund’s first claim on every client’s company, in the smallest type, read aloud.'),
      t('They cannot sue. They cannot go to the police. They can only look at each other across the table, knowing what each of them bought. That is a wound that does not close.'),
    ]),
    ...(helixOpen
      ? [
          a('helix', 'Walk away with Helix', 'The fund’s claim cut. The company yours. Meridian at arm’s length, the switch armed.', [
            p('Helix. The company Marcus bought her with, cut loose: clause 14.3 struck from every deal, the fund’s money repaid or written off, the letterhead gone from every file. Hers, clean, with the switch armed so that it stays that way.'),
            t('I did not come all this way for a chair in her house. I came for the one Marcus kept for eleven years.'),
          ]),
        ]
      : []),
    ...(nellOpen
      ? [
          a('nell', 'Nell’s name, out loud', 'In that room, by the woman who signed the order.', [
            p('Her name. Eleanor Linden. Said out loud, in that room, by the woman who signed the order in Jakarta. Not justice; nobody in that building can give Nell justice. The truth, in front of people who cannot pretend afterwards that they did not hear it.'),
            ...(key(s, 'pred.watch') ? [t('Her watch is on my wrist. I wound it this morning. She never did.')] : []),
          ]),
        ]
      : []),
  ];
}

// ── Who comes ──

const personScene: Record<Person, [string, Block[]]> = {
  halvorsen: ['A client’s chair. He owes you, in public.', [q('Halvorsen', 'A client may attend, my dear, and I am a client, God help me. I shall sit at the end with my ships and say nothing until you want me to say something, and then I shall say it very loudly. I owe you a lunch. This is the lunch.')]],
  marcus: ['Back into the room where he was bought.', [p('Marcus comes down from Leeds on the first train in the good suit, the one he bought with the first company he ever took apart.'), q('Marcus Chen', 'I was bought in that room. Eleven years ago, at that table, in that chair at the end. I would like very much to walk back into it on the arm of the woman who took my desk.')]],
  lucien: ['The bank, in the room.', [q('Lucien Morel', 'Morel & Cie is a counterparty to half the people at that table. A counterparty may attend. I shall sit very still and look at the ones whose accounts I know. They will know I know. That is all a banker ever has to do.')]],
  julian: ['Helix’s seat.', [q('Julian Mercer', 'Helix is a client. I gave notice last night. If they try anything, they will have to do it in front of the Group COO of a client, which they will not enjoy.')]],
  marsh: ['The Authority, taking notes.', [p('Owen Marsh arrives at ten with a banker’s box of files, his bicycle clips still on, and a tie he has plainly borrowed.'), q('Owen Marsh', 'I’ll sit at the end and take notes. They hate it when someone takes notes.')]],
  iris: ['She has taken minutes at that table.', [q('Iris Moreau', 'I took minutes at that table for four years. I know where they put their hands when they are frightened. I’ll touch my earring when one of them lies.')]],
  nora: ['Nell’s sister, off the overnight flight.', [p('Nora is at arrivals at eleven with one small bag and Nell’s photograph in her handbag in a plastic sleeve, the way you would carry a passport.'), q('Nora Linden', 'I’m not going to say anything. I’m just going to be there, with her face, so that the woman who rang me on a Sunday morning has to look at both of us.')]],
  maya: ['She is coming. She meant it.', [q('Maya', 'I’m coming in. I’m going to sit next to you and not say a word, and if any of them looks at you the wrong way I’m going to write their name down very slowly where they can see me doing it.')]],
};

function besideBlocks(): Block[] {
  return [
    p('Morning. The hard part: not who you want beside you, but who you are willing to put in that room, where everybody is looked at, and priced, and filed in a drawer at sixteen degrees.'),
    t('Two inside, at most. One outside. Or nobody, which is how I began.'),
  ];
}

function besideChoices(s: GameState): C16Choice[] {
  const inside = (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
  if (key(s, 'act4.inside-done') !== 'yes') {
    const available = insiders16(s).filter((x) => !inside.includes(x));
    return [
      ...(inside.length < 2
        ? available.map((who) =>
            offer('inside-' + who, 'Bring ' + personName[who], personScene[who][0], 'beside', (x) => {
              const next = [...inside, who];
              setKey(x, 'act4.inside', next.join(','));
              if (next.length >= 2) setKey(x, 'act4.inside-done', 'yes');
              return personScene[who][1];
            }),
          )
        : []),
      inside.length
        ? offer('inside-done', 'That’s everyone inside', 'Nobody else in the room.', 'beside', (x) => {
            setKey(x, 'act4.inside-done', 'yes');
            return [];
          })
        : offer('inside-none', 'Go in alone', 'Nobody in the room but you. Harder. Allowed.', 'beside', (x) => {
            setKey(x, 'act4.inside', 'none');
            setKey(x, 'act4.inside-done', 'yes');
            return [t('Alone. The way I came into all of this. If it costs more, I will pay it myself.')];
          }),
    ];
  }
  const out = (id: string, label: string, hint: string, body: Block[]) =>
    offer('outside-' + id, label, hint, 'order', (x) => {
      setKey(x, 'act4.outside', id);
      return body;
    });
  return [
    ...(key(s, 'c8.p-night') === 'pryce' && spent16(s) !== 'pryce'
      ? [out('pryce', 'Mr Pryce, at the kerb', 'Engine running. For once, for somebody who asked.', [q('Pryce', 'I’ll be at the kerb from half past five, Ms Vale, with the engine running. Whoever comes out of that door first, I shall drive them wherever they like. I hope it’s you.')])]
      : []),
    out('switch', 'The switch holders', 'If you are not out by seven, everything opens.', [p('You ring each of them in turn, the people who hold a copy, and say the same sentence to each: if I have not rung you by seven, open it. None of them asks why. All of them say yes.')]),
  ];
}

// ── The order of things ──

function orderBlocks(): Block[] {
  return [
    p('Noon. The case on the kitchen table, out of its rubber band, and the only decision a good advocate ever really makes: what goes first, so that everything after it is read in its light, and what stays in your pocket until the moment somebody thinks they have won.'),
  ];
}

function orderChoices(s: GameState): C16Choice[] {
  const cards = cards16(s);
  const first = key(s, 'act4.first') as Card | undefined;
  if (!first)
    return cards.map((c) =>
      offer('first-' + c, 'First: ' + cardLabel[c][0], cardLabel[c][1], 'order', (x) => {
        setKey(x, 'act4.first', c);
        return [p(`${cardLabel[c][0]} goes on top of the pile, face down, where your right hand will find it first.`)];
      }),
    );
  const seat = key(s, 'act4.aim') === 'seat';
  return [
    ...cards
      .filter((c) => c !== first)
      .map((c) =>
        offer('held-' + c, (seat ? 'Your price: ' : 'Hold back: ') + cardLabel[c][0], seat ? 'The thing she will pay to keep quiet, when you sit down.' : 'In your pocket, for the moment she thinks she has won.', 'armour', (x) => {
          setKey(x, 'act4.held', c);
          return [p(seat ? `${cardLabel[c][0]} goes in the inside pocket of your coat, alone. Not a weapon tonight. A price.` : `${cardLabel[c][0]} goes in the inside pocket of your coat, alone, where nobody at that table will think to look for it.`)];
        }),
      ),
    offer('held-none', 'Hold nothing back', 'Everything on the table. No tricks.', 'armour', (x) => {
      setKey(x, 'act4.held', 'none');
      return [t('Everything on the table. She keeps things back. I am not going to be her tonight, whatever happens to the chair.')];
    }),
  ];
}

// ── Armour ──

function armourBlocks(): Block[] {
  return [
    p('Four o’clock. The mirror. Getting dressed the way you would load a weapon: slowly, in order, checking each thing twice.'),
  ];
}

type Partner = 'julian' | 'marcus' | 'lucien';
const clasper = (s: GameState): Partner[] => {
  const gone = spent16(s);
  const out: Partner[] = [];
  if (key(s, 'pred.julian') === 'ally' && gone !== 'julian') out.push('julian');
  if ((key(s, 'pred.ally.marcus') === 'in' || key(s, 'pred.mercy') === 'name') && gone !== 'marcus') out.push('marcus');
  if (key(s, 'pred.ally.morel') === 'in' && gone !== 'lucien') out.push('lucien');
  return out;
};

function armourChoices(s: GameState): C16Choice[] {
  if (!key(s, 'act4.wear')) {
    const w = (id: string, label: string, hint: string, body: Block[]) =>
      offer('wear-' + id, label, hint, 'armour', (x) => {
        setKey(x, 'act4.wear', id);
        return body;
      });
    return [
      w('blue', 'The midnight blue', 'Marcus’s gift, from the Vesper in December.', [p('The midnight blue, from the shop that does not deliver. It still fits exactly. Somebody measured you once without asking. Tonight you are wearing the measurement back into the room it was taken for.')]),
      w('black', 'The black', 'Your own. Plain. Final.', [p('Your own black: plain, high at the neck, the dress you would choose for a funeral you intended to enjoy.')]),
      w('green', 'Her green', 'Celeste’s colour, worn to her table.', [p('Green. Her colour, the colour she has worn at every table you have ever seen her at. You have never once worn it. Tonight you are going to walk into her house in it, and see which of you it suits.'), t('If I am going to sit beside her, I will match. If I am going to refuse her, I will match while I do it.')]),
    ];
  }
  const c = (id: string, label: string, hint: string, body: Block[]) =>
    offer('clasp-' + id, label, hint, 'door', (x) => {
      setKey(x, 'act4.dressed-with', id);
      return body;
    });
  const line: Record<Partner, [string, string]> = {
    julian: ['Let Julian fasten the clasp', 'He came early. He will not ask.'],
    marcus: ['Let Marcus fasten the clasp', 'He knows exactly how this dress closes.'],
    lucien: ['Let Lucien fasten the clasp', 'A banker’s hands, very steady.'],
  };
  return [
    ...clasper(s).map((pp) =>
      c(pp, line[pp][0], line[pp][1], [
        p(`${pp === 'julian' ? 'Julian' : pp === 'marcus' ? 'Marcus' : 'Lucien'} stands behind you at the mirror and fastens the clasp at the back of your neck, slowly, his fingers warm, his mouth near your ear.`),
        q(pp === 'julian' ? 'Julian Mercer' : pp === 'marcus' ? 'Marcus Chen' : 'Lucien Morel', pp === 'marcus' ? 'Whatever you decide in there. Come back and tell me.' : 'Come back.'),
      ]),
    ),
    c('alone', 'Fasten it yourself', 'You have always been able to.', [p('You fasten it yourself, by feel, the way you have fastened everything this year, and look at the woman in the mirror until she looks back.')]),
  ];
}

// ── The door ──

function doorBlocks(s: GameState): Block[] {
  return [
    p('Quarter to six. The embankment, the river black and high, the Vesper’s black glass with no painting in the window and no name on the door.'),
    ...(exposed16(s) ? [p('On the pavement opposite, three photographers, one of them already raising his camera. They know your face. Tonight that is not a weakness.')] : [p('The embankment is empty. Nobody knows you are here but the people you told.')]),
  ];
}

function doorChoices(s: GameState): C16Choice[] {
  const a = (id: string, label: string, hint: string, seen: boolean, body: Block[]) =>
    offer('arrive-' + id, label, hint, 'room', (x) => {
      setKey(x, 'act4.arrive', id);
      setKey(x, 'act4.seen', seen ? 'yes' : 'no');
      note(x, 'p16-arrive', `On the Thursday of the board Evelynn arrived at the Vesper ${id === 'front' ? 'by the front door' : id === 'car' ? 'in the car Celeste sent' : 'in Helix’s car, as the company'}, with a case she counted as ${key(x, 'act4.case')}.`, 'Her own ledger');
      return body;
    });
  return [
    a('front', 'The front door', 'As a counterparty. In full view.', exposed16(s), [
      p(exposed16(s) ? 'You walk across the road into the cameras, and let them have you, every step, so that nobody inside can pretend tomorrow that you did not arrive.' : 'You walk across the empty road to the front door as if you had been doing it for years.'),
    ]),
    a('car', 'The car she sent', 'Arrive as the guest she expects. Pryce driving.', true, [
      p('At half past five the long black car is at your kerb, and Mr Pryce holds the door. “Ms Laurent’s compliments.” You ride to the Vesper as the guest she expects, which is the one thing she will not expect you to use.'),
    ]),
    ...(key(s, 'pred.julian') === 'ally' && spent16(s) !== 'julian'
      ? [
          a('helix', 'Helix’s car, with Julian', 'Arrive as the company.', exposed16(s), [
            p('Helix’s car, with the company’s name on nothing and Julian in the back beside you, in the good suit. You arrive as the client, not the guest. The doorman has to open the door for both of you.'),
          ]),
        ]
      : []),
  ];
}

// ── The long room ──

function roomBlocks(s: GameState): Block[] {
  const aim = key(s, 'act4.aim');
  const inside = (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none') as Person[];
  return [
    q('The doorman', 'They’re expecting you.'),
    p('And then, for the first time since you have known him, he adds, very quietly:'),
    q('The doorman', 'Good luck, Ms Vale.'),
    p('The long room is reset for the board: the empty frames on the walls, a long table under them, and people at it. Anton Deverell in the chair, shipping and insurance, silver and courteous. Marguerite Soames, who reads everything. Three others you know from the ledger, not the newspapers.'),
    ...(inside.length ? [p('Behind you, ' + inside.map((x) => personName[x]).join(' and ') + ', taking the chairs at the end where the clients sit.')] : []),
    p('And at the head of the table, in black, no jewellery, Celeste Laurent, who stands when you come in.'),
    p('There are seven chairs at the table and six people. The seventh chair is beside hers, and it has been pulled out.'),
    t(
      aim === 'seat'
        ? 'She stood up when I came in. She has pulled out a chair for me. I am going to sit in it. The only question left is on whose terms.'
        : aim === 'wound'
          ? 'She stood up when I came in, and pulled out a chair for me. I am going to leave it exactly where it is, empty, beside her, all night.'
          : aim === 'helix'
            ? 'She stood up for Helix’s counterparty. She is about to find out that Helix is leaving.'
            : 'She stood up when I came in. She has never once stood up for me before. Tonight she is going to say a name.',
    ),
  ];
}

export function predatorBlocks16(s: GameState): Block[] {
  if (s.phase === 'floor') return floorBlocks(s);
  if (s.phase === 'want') return wantBlocks(s);
  if (s.phase === 'beside') return besideBlocks();
  if (s.phase === 'order') return orderBlocks();
  if (s.phase === 'armour') return armourBlocks();
  if (s.phase === 'door') return doorBlocks(s);
  if (s.phase === 'room') return roomBlocks(s);
  return [];
}

export function predatorChoices16(s: GameState): C16Choice[] {
  if (s.phase === 'floor')
    return [
      offer('case-set', 'Pick up the cards', 'In order. You know the order now.', 'want', (x) => {
        setKey(x, 'act4.case', case16(x).strength);
        return [p('You pick them up in order and square the edges on the floor, and put the rubber band round them, and they are a case. Not a wardrobe door any more. Something you can carry into a room.')];
      }),
    ];
  if (s.phase === 'want') return wantChoices(s);
  if (s.phase === 'beside') return besideChoices(s);
  if (s.phase === 'order') return orderChoices(s);
  if (s.phase === 'armour') return armourChoices(s);
  if (s.phase === 'door') return doorChoices(s);
  return [];
}
