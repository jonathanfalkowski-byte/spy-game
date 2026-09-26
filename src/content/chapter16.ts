/** Chapter 16 (Act IV opens, own-power played as the Celebrity route) · The Approach:
 * dawn → aim → crew → table → dress → arrive → complete.
 * Design: docs/story/CHAPTER_16_THE_APPROACH_DESIGN.md (owner-approved 2026-09-25, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_16_THE_APPROACH_SCRIPT.md. Gated behind chapter16Playable(), reached from
 * an own-power Chapter 15 ending. Thursday, from first light to the Vesper's door: the endgame's `approach`
 * (ENDGAME_RECONVERGENCE §7), reading the entry contract (§5) and never rewriting it. The case reviewed as one honest,
 * sourced strength (act4.case, derived by case16 from what Act III left); the aim she will walk out with
 * (act4.aim = expose | terms | nell | out), which Chapter 18 turns into her position; who comes (up to two inside, one
 * outside, or nobody: the free-agent core can still walk in, it only costs more); the order of the cards and one held
 * back; getting dressed as armour (a chosen moment at heat 1–2 at most); and an arrival that reacts to her exposure.
 * One shared spine: the choices change what she carries and who stands beside her, not which scenes she reads.
 * Deepening pass (2026-09-26): each crew member's scene at greater length; a rehearsal after the cards are ordered
 * (act4.rehearse = mirror | aloud | none: saying it to the mirror, or to whoever is there, or not at all); and a moment
 * on the embankment before the door (act4.walk = bench | rail | on: one minute on the bench from the first Thursday,
 * Adrian's old Axiom pass dropped off the rail, or walking on). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { get10, julianInPlay10 } from './chapter10';
import { eveningPartners14 } from './chapter14';

export type C16Scene = { title: string; place: string; blocks: Block[] };
export type C16Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get16 = (s: GameState, k: string) => s.choices['c16.' + k];
export const set16 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c16.' + k] = v;
};
const offer16 = (id: string, label: string, hint: string, next: string, apply?: C16Choice['apply']): C16Choice => ({
  id: 'chapter16.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter16Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER16 === '1';

export const chapter16Definitions: Record<string, C16Scene> = {
  dawn: { title: 'Thursday', place: '05:00 · THE WALL', blocks: [] },
  aim: { title: 'What She Wants', place: '06:00 · THE KITCHEN TABLE', blocks: [] },
  crew: { title: 'Who Comes', place: 'MORNING', blocks: [] },
  table: { title: 'The Order of Things', place: 'NOON', blocks: [] },
  dress: { title: 'Armour', place: '16:00 · THE MIRROR', blocks: [] },
  arrive: { title: 'The Embankment', place: '17:45 · THE VESPER', blocks: [] },
  complete: { title: 'The Long Room', place: '18:00 · THE BOARD', blocks: [] },
};
export const chapter16Scenes = Object.entries(chapter16Definitions).map(([phase, scene]) => ({
  id: `chapter16.${phase}` as NodeId,
  ...scene,
}));

// ── The entry contract (ENDGAME §5), own-power values ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const spent = (s: GameState) => (c(s, 'c15.cost') === 'ally' || c(s, 'c15.cost') === 'relationship' ? (c(s, 'c15.cost-who') ?? '').toLowerCase() : '');
/** Public: Meridian sees her coming; the street is a shield at the front and a trap at the back. */
export const public16 = (s: GameState) => !!get5(s, 'published') || getKey(s, 'act3.exposed') === 'yes' || c(s, 'c15.cost') === 'visibility';
const hasVerdict = (s: GameState) => getKey(s, 'act3.verdict') === 'retaken' || (c(s, 'c14.file') === 'yes' && c(s, 'c14.copy') !== 'no');
const hasCards = (s: GameState) => getKey(s, 'act3.cards') === 'taken' || c(s, 'c13.card') === 'taken';

type Item = 'verdict' | 'nell' | 'cards' | 'page' | 'phone' | 'adrian' | 'ashby';
/** What she can put on the table, from what Act III actually left her. Page seven is always hers. */
export function items16(s: GameState): Item[] {
  const out: Item[] = [];
  if (hasVerdict(s)) out.push('verdict');
  if (getKey(s, 'act3.nell-order') === 'taken') out.push('nell');
  if (hasCards(s)) out.push('cards');
  out.push('page');
  if (getKey(s, 'act3.black-phone') === 'keep') out.push('phone');
  if (getKey(s, 'act3.adrian') === 'hers') out.push('adrian');
  if (c(s, 'c12.statement') === 'recorded') out.push('ashby');
  return out;
}
const itemName: Record<Item, string> = {
  verdict: 'the signed ORACLE verdict',
  nell: 'Nell’s Jakarta order, signed C.',
  cards: 'the 1109 cards',
  page: 'page seven, torn out',
  phone: 'the black phone, every message',
  adrian: 'Adrian Vale’s file',
  ashby: 'Ashby, on the record',
};

type Person = 'sloane' | 'nora' | 'marsh' | 'maya' | 'iris' | 'julian';
/** Who is still standing, and could be in the room. */
export function insiders16(s: GameState): Person[] {
  const out: Person[] = [];
  const gone = spent(s);
  if (getKey(s, 'act3.sloane') !== 'shut' && gone !== 'sloane') out.push('sloane');
  if (getKey(s, 'act3.ally.nora') === 'in') out.push('nora');
  if (getKey(s, 'act3.ally.marsh') === 'in' && gone !== 'owen marsh' && gone !== 'owen') out.push('marsh');
  if (getKey(s, 'act3.maya-choice') === 'stay' && gone !== 'maya') out.push('maya');
  if (getKey(s, 'act3.ally.iris') === 'in' && gone !== 'iris') out.push('iris');
  if (julianInPlay10(s) && get10(s, 'betrayed') !== 'julian' && gone !== 'julian') out.push('julian');
  return out;
}

/** The case, stated honestly: points and reasons from sourced evidence, witnesses and the switch. Never hidden. */
export function case16(s: GameState): { strength: 'thin' | 'supported' | 'strong' | 'overwhelming'; reasons: string[] } {
  let points = 0;
  const reasons: string[] = [];
  const add = (n: number, why: string) => {
    points += n;
    reasons.push(why);
  };
  if (hasVerdict(s)) add(3, 'The ORACLE verdict, with the board’s signatures on it: they knew the product was defective, and sold it.');
  else if (c(s, 'c9.lever') || c(s, 'c6.oracle-seen') === 'yes') add(1, 'The ORACLE verdict, reconstructed: true, and without the signatures.');
  if (getKey(s, 'act3.nell-order') === 'taken') add(2, 'The order that burned Nell in Jakarta, signed C.');
  if (hasCards(s)) add(2, 'The 1109 cards: the product in use, on their own camera.');
  if (c(s, 'c12.statement') === 'recorded') add(1, 'Colin Ashby, on the record: “From a friend of hers.”');
  if (c(s, 'c11.catalogue') === 'photo') add(1, 'The Autumn Collection, photographed.');
  if (getKey(s, 'act3.page') === 'torn') add(1, 'Page seven, torn out: the placement date in their own type.');
  if (c(s, 'c15.maya-file') === 'yes') add(1, 'The drafts that framed Maya, with the writer’s name on every one.');
  if (getKey(s, 'act3.black-phone') === 'keep') add(1, 'The black phone: every message she ever sent.');
  const people = insiders16(s);
  if (people.includes('sloane')) add(1, 'Sloane, who signed for Axiom and can say what she was told.');
  if (people.includes('nora')) add(1, 'Nora Linden, who took a phone call on a Sunday morning before the police.');
  if (people.includes('marsh')) add(1, 'Owen Marsh, and the Markets Authority behind him.');
  if (getKey(s, 'act3.switch') === 'set') add(1, 'The dead man’s switch: three copies, with three people.');
  const strength = points < 4 ? 'thin' : points < 7 ? 'supported' : points < 10 ? 'strong' : 'overwhelming';
  return { strength, reasons };
}

/** Scene-specific place lines (display only). */
export function place16(s: GameState): string | undefined {
  if (s.scene !== 'chapter16') return;
  if (s.phase === 'dawn' && getKey(s, 'act3.home') === 'lost') return '05:00 · THE WARDROBE DOOR';
  if (s.phase === 'arrive' && getKey(s, 'act4.arrive') === 'car') return '17:30 · THE CAR SHE SENT';
}

// ── Thursday ──

function dawnBlocks(s: GameState): Block[] {
  const { strength, reasons } = case16(s);
  const home = getKey(s, 'act3.home') === 'lost';
  return [
    p('Five in the morning. The light not up yet, the street not awake, the kettle ticking as it cools.'),
    p('You slept, which surprises you: four hours, straight down, no dreams, and woke at a quarter to five with your heart already going, the way it used to on the mornings of Adrian’s hearings, before he had even remembered why. Then you remembered why.'),
    p('The city outside the window is the colour of a bruise going green. A milk float. A fox crossing the road in no hurry at all, looking up at your window as it passes, as if it knew. Somewhere across the river the Vesper is dark and locked and empty, and in thirteen hours six people will sit down at a table in it and wait for you.'),
    p(
      home
        ? 'You take every card down off the wardrobe door, one by one, and lay them out on the hotel carpet in the order they will matter.'
        : 'You take every card down off the wall, one by one, the way you pinned them, and lay them out on the floorboards in the order they will matter.',
    ),
    p('It is how Adrian laid out a filing the night before a hearing, on the floor of the old flat, in his socks: every exhibit, where it came from, whether it would stand up if someone who hated him read it slowly. You kneel among them in your dressing gown with a cup of coffee going cold on the floor beside you, and do the same.'),
    ...reasons.map((r) => p('· ' + r)),
    p(
      strength === 'overwhelming'
        ? 'When you have finished there is barely any floor left. You write one more card, the honest one, and put it at the top: OVERWHELMING. Not a feeling. A count.'
        : strength === 'strong'
          ? 'When you have finished you write one more card, the honest one, and put it at the top: STRONG. Enough to hurt them. Not enough to be careless.'
          : strength === 'supported'
            ? 'When you have finished you write one more card, the honest one, and put it at the top: SUPPORTED. True, and sourced, and not quite enough on its own. You will have to be the rest of it.'
            : 'When you have finished there are very few cards on the floor, and you write one more, the honest one, and put it at the top: THIN. True. Sourced. Thin. You will have to walk in and be most of the case yourself.',
    ),
    ...(getKey(s, 'act3.black-phone') === 'keep' ? [p('In the drawer, in its freezer bag, the black phone, switched off, holding every word she ever sent you.')] : []),
    p('You sit back on your heels among the cards and look at them for a long time. Eight months. A face, a flat, a wardrobe full of someone else’s coats, a black phone, a wall. And here, on the floor, in order, everything you have taken back from the people who gave you all of it.'),
    t('I shall be there as myself, she said. So shall I. Whoever that turns out to be by six o’clock.'),
  ];
}

function dawnChoices(): C16Choice[] {
  return [
    offer16('case-set', 'Pick up the cards', 'In order. You know the order now.', 'aim', (x) => {
      const { strength } = case16(x);
      setKey(x, 'act4.case', strength);
      return [p('You pick them up in order and square the edges on the floor, the way you would a deck, and put the rubber band round them, and they are a case. Not a wall any more. Something you can carry into a room.')];
    }),
  ];
}

// ── What She Wants ──

function aimBlocks(): Block[] {
  return [
    p('You make fresh coffee, because the first cup went cold on the floor among the cards, and drink this one standing at the window, and watch the street wake up: the milk float going back the other way, a woman in a nurse’s uniform coming home from a night shift, a man opening the shutter of the newsagent’s with a pole.'),
    p('Six o’clock. The kitchen table, the case in its rubber band, and the question Adrian never let himself ask before a hearing, because the answer was always somebody else’s: what do I want to walk out of that room with?'),
    p('Not what is fair. Nothing is going to be fair. Not what she deserves; you have stopped keeping that list. What you want. What you will still want on Friday morning, and next year, and when you are old, if you get to be old.'),
    p('Adrian used to say, to the junior analysts, that the most dangerous person in any hearing is the one who does not know what they want. They talk too long. They take the first offer. They win the argument and lose the case. He was right about that, if about very little else.'),
    p('So you make yourself say each answer out loud, in the empty kitchen, to the case in its rubber band, and listen to how each one sounds in your mouth.'),
    t('Four answers. I have been circling them for a month. Today I have to land on one.'),
  ];
}

function aimChoices(s: GameState): C16Choice[] {
  const canLeave = c(s, 'c15.cost') !== 'money' || getKey(s, 'act3.ally.iris') === 'in' || (julianInPlay10(s) && get10(s, 'betrayed') !== 'julian');
  const aim = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('aim-' + id, label, hint, 'crew', (x) => {
      setKey(x, 'act4.aim', id);
      return body;
    });
  return [
    aim('expose', 'The truth, in public', 'Meridian named. The defect on every screen. Her signature in the papers.', [
      p('The truth, out loud, where it cannot be taken back. Meridian’s name on every screen in the country by Friday, the verdict in the papers with her signature on it, the collection’s pages read out in Parliament if you can manage it.'),
      t('The audience as a shield. They made me famous so they could sell me. Let them see what that buys them.'),
    ]),
    aim('terms', 'Terms nobody can revoke', 'Maya safe for good. Adrian retired. The catalogue closed. The switch kept armed.', [
      p('Terms. Written down, signed, witnessed: Maya left alone for the rest of her life. Adrian Vale’s name retired and never spent. Sloane cleared. Page seven closed, and every page after it that would ever have had your face on it. And the switch kept armed, so that every one of those terms stays true for exactly as long as you are alive to keep it.'),
      t('Wounded, quietly. Not toppled. Nobody can topple them. But I can make sure they never touch anything of mine again.'),
    ]),
    ...(getKey(s, 'act3.nell') === 'known'
      ? [
          aim('nell', 'Nell’s name, out loud', 'In that room, by the woman who signed the order. The truth, in front of witnesses.', [
            p('Her name. Eleanor Linden. Said out loud, in that room, by the woman who signed the order in Jakarta and rang her sister on a Sunday morning before the police. Not justice: nobody in that building can give Nell justice, and you know it. The truth, said by the one person who knows it, in front of people who cannot pretend afterwards that they didn’t hear.'),
            t('She took two sugars and cinnamon and hated orchids. I am going to make Celeste say her name.'),
          ]),
        ]
      : []),
    ...(canLeave
      ? [
          aim('out', 'A clean way out', 'Walk out with the leverage, and out of the life, and be nobody’s asset, anywhere.', [
            p('Out. Walk into that room, put enough on the table that nobody at it ever wants to find you again, and walk out of it, and out of London, and out of this life, with the leverage in your pocket and the switch armed behind you, and be nobody’s asset, anywhere, ever again.'),
            t('The one thing she never let Nell have. The door. I would like to walk through it for both of us.'),
          ]),
        ]
      : []),
  ];
}

// ── Who Comes ──

const personLine: Record<Person, [string, string, Block[]]> = {
  sloane: ['Sloane', 'Axiom’s officer of record. The verdict is hers too.', [
    p('Sloane is ironing a white shirt in her kitchen when you ring, a shirt she has not worn since the day she was put on leave, and she does not stop ironing while you ask.'),
    q('Sloane', 'Of course I’m coming. I have been waiting a year to stand in a room with those people and say my own name. Six o’clock. I’ll wear the good shoes.'),
    p('A pause, the iron hissing, the sound of a woman deciding to say one more thing than she means to.'),
    q('Sloane', 'For what it’s worth. When I read ORACLE’s numbers, the first time, I thought: that is a person who will not stay where she is put. I was frightened of you before I ever met you. I still am. I would rather be frightened of you from your side of the table.'),
  ]],
  nora: ['Nora', 'Nell’s sister. She asked to be in the room.', [
    p('Nora is at arrivals at eleven, off the overnight flight from Singapore, with one small bag and Nell’s photograph in her handbag in a plastic sleeve, the way you would carry a passport.'),
    q('Nora', 'I said I wanted to be in the room. I meant it. I’m not going to say anything. I’m just going to be there, with her face, so that the woman who rang me on a Sunday morning has to look at both of us.'),
    p('In the taxi from the airport she holds your hand without seeming to notice she is doing it, and looks out at London in the rain, and says once, to the window, “She’d have loved this. She loved rain. She said it was the only weather that minded its own business.”'),
  ]],
  marsh: ['Owen', 'The Markets Authority, in a cycling jacket.', [
    p('Owen arrives at your door at ten with a banker’s box of files under one arm and his bicycle clips still on, and a tie he has plainly borrowed.'),
    q('Owen Marsh', 'I have a warrant for nothing and a mandate for less. I also have eleven years of knowing exactly which questions make people like that stop smiling. I’ll sit at the end and take notes. They hate it when someone takes notes.'),
    p('He looks at the case on your table, in its rubber band, and then at you, and for a moment he is not a regulator at all, only a tired man in a borrowed tie who did amateur dramatics at university.'),
    q('Owen Marsh', 'You know you don’t have to do this. You could post it. All of it. Tonight. Let the rest of us do the room.'),
    q('You', 'I know. I want them to see my face when they read it.'),
    q('Owen Marsh', 'Yes. I thought you might.'),
  ]],
  maya: ['Maya', 'She stayed. She meant it.', [
    p('Maya comes round with two coffees, the way she used to come across from the compliance wing, and puts one in your hand and sits on the arm of the sofa.'),
    q('Maya', 'I’m coming in. I’m going to sit next to you and not say a word, and if any of them looks at you the wrong way I’m going to write their name down very slowly where they can see me doing it.'),
  ]],
  iris: ['Iris', 'She knows how that room runs. She has sat in it.', [
    p('Iris rings from a hotel she will not name, in her own voice, the one under the legend, which is lower and slower and has a little of the north in it.'),
    q('Iris', 'I’ve sat at the end of that table taking minutes for Halvorsen. I know where they put their hands when they’re frightened. I’ll tell you when they’re lying. You’ll see me touch my earring.'),
  ]],
  julian: ['Julian', 'Helix is a Meridian client. He has a seat at that table.', [
    p('Julian does not wait to be asked. He rings at eight.'),
    q('Julian Mercer', 'Helix is a client. Clients may attend the Thursday board as observers, if they give notice. I gave notice last night. I would like to sit at that table and watch you take it apart. And if they try anything, I would like them to have to do it in front of a client.'),
  ]],
};

function crewChoices(s: GameState): C16Choice[] {
  const inside = (getKey(s, 'act4.inside') ?? '').split(',').filter(Boolean);
  if (getKey(s, 'act4.inside-done') !== 'yes') {
    const available = insiders16(s).filter((pp) => !inside.includes(pp));
    return [
      ...(inside.length < 2
        ? available.map((who) =>
            offer16('inside-' + who, `Bring ${personLine[who][0]}`, personLine[who][1], 'crew', (x) => {
              const next = [...inside, who];
              setKey(x, 'act4.inside', next.join(','));
              if (next.length >= 2) setKey(x, 'act4.inside-done', 'yes');
              return personLine[who][2];
            }),
          )
        : []),
      inside.length
        ? offer16('inside-done', 'That’s everyone inside', 'Nobody else in the room.', 'crew', (x) => {
            setKey(x, 'act4.inside-done', 'yes');
            return [];
          })
        : offer16('inside-none', 'Go in alone', 'Nobody in the room but you. Harder. Allowed.', 'crew', (x) => {
            setKey(x, 'act4.inside', 'none');
            setKey(x, 'act4.inside-done', 'yes');
            return [t('Alone. The way I came into all of this. If it costs more, I will pay it myself.')];
          }),
    ];
  }
  const out = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('outside-' + id, label, hint, 'table', (x) => {
      setKey(x, 'act4.outside', id);
      return body;
    });
  const gone = spent(s);
  return [
    ...((getKey(s, 'act3.ally.theo') === 'in' || getKey(s, 'act3.honeypot') === 'burned') && gone !== 'theo'
      ? [
          out('theo', 'Theo, with a camera on the embankment', 'If you are not out by seven, he goes live.', [
            q('Theo Marr', 'A crew in a van across the road, a camera on the Vesper’s front door from six o’clock, and a producer with her finger on the button. If you’re not out by seven, we go live, and I say every word you gave me. If you are out by seven, I buy you a very large drink.'),
          ]),
        ]
      : []),
    ...(c(s, 'c8.pryce')
      ? [
          out('pryce', 'Mr Pryce, at the kerb', 'The engine running, for as long as it takes.', [
            q('Pryce', 'I’ll be at the kerb with the engine running. However long it takes. I’ve waited outside that door for eleven years for other people. I can wait for you.'),
          ]),
        ]
      : []),
    ...(['stay', 'witness'].includes(getKey(s, 'act4.inside')?.includes('maya') ? '' : getKey(s, 'act3.maya-choice') ?? '') && gone !== 'maya'
      ? [
          out('maya', 'Maya, at the café across the road', 'Watching the door. With your lawyer’s number.', [
            q('Maya', 'The café across the road. Window seat. Your lawyer’s number on speed dial and a very large cake I am not going to eat. If you’re not out by seven I start ringing people, and I’m very annoying on the phone.'),
          ]),
        ]
      : []),
    out('switch', 'The switch', 'A call at seven to three people who don’t know each other. If you don’t make it, they open the letters.', [
      p('You ring the three holders of the switch, one after another, from the kitchen, and say the same sentence to each: If I don’t ring you again by seven tonight, open the letter. Three people who have never met, in three parts of the country, each of them now waiting for a phone to ring.'),
    ]),
  ];
}

// ── The Order of Things ──

function tableBlocks(s: GameState): Block[] {
  const has = items16(s);
  return [
    p('Noon. The case on the kitchen table, out of its rubber band, and beside it the things themselves: ' + has.map((i) => itemName[i]).join('; ') + '.'),
    p('Adrian learned it in his second year, from a barrister who smoked in the corridor and had never lost a regulatory hearing: it is not what you have, it is the order you put it down in. The first thing sets the room. The last thing ends it. And you never, ever put everything on the table at once.'),
    p('He had told Adrian the rest of it too, in that corridor, with the smoke going up past the portraits of dead judges: the first thing you put down tells them who you are. The thing you keep back tells them nothing at all, until the moment you need them to know everything.'),
    p('You lay them out on the table in a line, and move them, and move them back. The verdict. The page. The things that came out of the archive at three in the morning with your stockings ruined. They look very small on a kitchen table. So does a match.'),
    t('The first card, and the one I keep in my pocket. Everything else goes in between.'),
  ];
}

/** A rehearsal (deepening pass): to the mirror, aloud to whoever is there, or not at all. */
function rehearseChoices(s: GameState): C16Choice[] {
  const inside = (getKey(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
  const who = inside.length ? { sloane: 'Sloane', nora: 'Nora', marsh: 'Owen', maya: 'Maya', iris: 'Iris', julian: 'Julian' }[inside[0] as 'sloane'] : undefined;
  const r = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('rehearse-' + id, label, hint, 'dress', (x) => {
      setKey(x, 'act4.rehearse', id);
      return body;
    });
  return [
    r('mirror', 'Say it to the mirror', 'Once, all the way through, the way Adrian did in the car.', [
      p('You stand in front of the wardrobe mirror in your dressing gown and say it, all of it, from the first card to the last, to the woman in the glass, the way Adrian used to rehearse in the car park before a hearing with the engine off.'),
      p('Halfway through, she stops you. Not in words: in the face. You watch yourself say “priced in” and see what it does to your mouth, and you take it out, and say it again without it, and it is better.'),
      t('She was always the better barrister. I only had to let her talk.'),
    ]),
    ...(who
      ? [
          r('aloud', `Say it aloud to ${who}`, 'Let someone who will be in the room hear it first.', [
            p(`You say it to ${who}, at the kitchen table, over coffee, from the first card to the last. ${who} does not interrupt once. At the end there is a long silence.`),
            q(who === 'Owen' ? 'Owen Marsh' : who === 'Julian' ? 'Julian Mercer' : who, 'Don’t change a word. Except the bit about the chair. Say that slower. You’ll want to watch her face.'),
          ]),
        ]
      : []),
    r('none', 'Don’t rehearse', 'You know it. Rehearsing would only make it sound rehearsed.', [
      p('You don’t rehearse. You know it the way you know the stairs in the dark. Rehearsing would only make it sound like something you had practised, and it is not that. It is the only true thing you will say in that building.'),
    ]),
  ];
}

function tableChoices(s: GameState): C16Choice[] {
  if (getKey(s, 'act4.held')) return rehearseChoices(s);
  const has = items16(s);
  const first = getKey(s, 'act4.first') as Item | undefined;
  const label: Record<Item, [string, string]> = {
    verdict: ['The signed verdict', 'The defect. They knew, and sold it.'],
    nell: ['Nell’s order', 'The burn, signed C.'],
    cards: ['The 1109 cards', 'The product, in use, on their own camera.'],
    page: ['Page seven', 'Herself. Their type, their date, her face.'],
    phone: ['The black phone', 'Every message, in her own words.'],
    adrian: ['Adrian’s file', 'The man they made into her.'],
    ashby: ['Ashby’s voice', '“From a friend of hers.”'],
  };
  if (!first)
    return has.map((i) =>
      offer16('first-' + i, `First: ${label[i][0]}`, label[i][1], 'table', (x) => {
        setKey(x, 'act4.first', i);
        return [p(`You put ${itemName[i]} on top of the pile. Whatever else happens in that room, that is the first thing they will see.`)];
      }),
    );
  const rest = has.filter((i) => i !== first);
  if (!rest.length)
    return [
      offer16('held-none', 'Keep nothing back', 'There is nothing else. You are the rest of the case.', 'table', (x) => {
        setKey(x, 'act4.held', 'none');
        return [t('Nothing in my pocket but my hands. Then my hands will have to do.')];
      }),
    ];
  return rest
    .map((i) =>
      offer16('held-' + i, `Keep back: ${label[i][0]}`, 'In your pocket, for the moment she thinks she has won.', 'table', (x) => {
        setKey(x, 'act4.held', i);
        return [p(`You take ${itemName[i]} out of the pile and put it somewhere nobody will look: the inside pocket of your coat, against your ribs. You will feel it there all evening, like a second heartbeat.`)];
      }),
    );
}

// ── Armour ──

function dressBlocks(): Block[] {
  return [
    p('Four o’clock. The bath, and then the long careful business of it, the way you have learned it these eight months: not decoration. Armour. Every piece put on for a reason, and every reason yours.'),
    p('You took eight months to learn this. The first week you could not do up a zip at your own back; the second you cried in a department store changing room because a sleeve would not sit right and you did not know why. Now your hands know it the way Adrian’s hands knew a keyboard: without asking you, faster than you could explain.'),
    p('Stockings. The heels you can run in, polished last night on the kitchen table. Your hair up and pinned hard, so that nothing moves when you turn your head. The face finished once, and then finished again, until the woman in the mirror looks exactly like somebody who has never once been afraid in her life, which is the whole point of a face.'),
  ];
}

function dressChoices(s: GameState): C16Choice[] {
  if (!getKey(s, 'act4.wear')) {
    const wear = (id: string, label: string, hint: string, body: Block[]) =>
      offer16('wear-' + id, label, hint, 'dress', (x) => {
        setKey(x, 'act4.wear', id);
        return body;
      });
    return [
      wear('green', 'The green', 'The colour she chose for you. Worn as yours now.', [p('The green. She chose it for you at a breakfast table, and dressed you in it for her showroom, and it is yours now, the way a name becomes yours by being called by it long enough. You do up the zip and it fits like a decision.')]),
      wear('black', 'The black', 'The colour she would never have dared put you in.', [p('The black. Plain, close, nothing at the throat. “Black. How brave. She would never have dared.” You would like Celeste to remember saying that, when you walk in.')]),
      wear('grey', 'The grey silk', 'Iris’s colour. The legends’ colour.', [p('Grey silk, like Iris on the first Thursday, like a woman at a rich man’s elbow reading every contract before he does. The legends’ colour. You wear it for all of them: for Iris, and Nell, and a girl who was nineteen, and whoever is on page eight.')]),
    ];
  }
  const gone = spent(s);
  const partners = eveningPartners14(s).filter((pt) => (pt === 'marsh' ? 'owen' : pt) !== gone);
  const name = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian', marsh: 'Owen' };
  const who = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('dress-' + id, label, hint, 'arrive', (x) => {
      setKey(x, 'act4.dressed-with', id);
      return body;
    });
  return [
    ...partners.map((pt) =>
      who(pt, `Let ${name[pt]} fasten the clasp`, 'His hands at the back of your neck. A word. Nothing more, today.', [
        p(`${name[pt]} is standing behind you at the mirror before you have asked, and you let him: his fingers at the back of your neck, warm, slow, finding the clasp of the necklace you nearly didn’t wear, and fastening it, and staying there a moment longer than they need to.`),
        p('His mouth near your ear, in the mirror, where you can watch him say it.'),
        q({ julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian', marsh: 'Owen Marsh' }[pt], 'Come back.'),
        p('You turn your head a centimetre, so that your cheek is against his for one breath. Then you step away, and pick up your coat, and he lets you go.'),
      ]),
    ),
    ...(['stay', 'witness'].includes(getKey(s, 'act3.maya-choice') ?? '') && gone !== 'maya'
      ? [
          who('maya', 'Let Maya do your hair', 'The way she did before Adrian’s first hearing.', [
            p('Maya does your hair at the bathroom mirror with a mouthful of pins, the way she did Adrian’s tie before his first hearing, badly, and then again properly, and then stands back.'),
            q('Maya', 'There. You look like you’re going to take a building apart. Go and take a building apart.'),
          ]),
        ]
      : []),
    who('alone', 'Finish it alone', 'Your own hands. The last thing she did not arrange.', [
      p('You finish it alone. Your own hands at the clasp, your own eyes in the mirror, nobody in the flat but you and the case in its rubber band by the door.'),
    ]),
  ];
}

// ── The Embankment ──

function arriveBlocks(s: GameState): Block[] {
  const inside = (getKey(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
  return [
    p('Quarter to six. The embankment in the last of the light, the river high and fast and the colour of a knife, and a long way down it, the Vesper: black glass, no name on the door, the window empty.'),
    p(
      inside.length
        ? `Beside you, ${inside.map((w) => personLine[w as Person][0]).join(' and ')}. Nobody is talking. There is nothing left to say that the next hour won’t say better.`
        : 'Nobody beside you. The case under your arm, the held card against your ribs, the heels on the paving stones, and the river going the other way.',
    ),
    p(
      public16(s)
        ? 'And outside the Vesper, a crowd: photographers, a van with a dish on its roof, a dozen people with their phones up who have seen your face six metres high and want to know why it is walking towards a building with no name. They have seen you coming. So has everyone inside.'
        : 'The embankment is empty. A man walking a dog. A cyclist. Nobody outside the Vesper at all. Nobody inside knows yet which door you will use, or whether you will come.',
    ),
    p('You walk it slowly, because you can. Past the bench where you sat after the first Thursday with your shoes in your hand. Past the place at the rail where the envelope went into the water. Past the lamp-post where, eight months ago, Adrian Vale stood in a coat that was too big for him now, waiting for a car, not knowing yet whose car it was, or where it went.'),
    t('The front, the back, or the car she sent. Every door in this building is one she thinks she owns.'),
  ];
}

/** On the embankment (deepening pass): the bench, the rail, or walking on. */
function walkChoices(): C16Choice[] {
  const w = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('walk-' + id, label, hint, 'arrive', (x) => {
      setKey(x, 'act4.walk', id);
      return body;
    });
  return [
    w('bench', 'Sit on the bench, one minute', 'Where you sat with your shoes in your hand after the first Thursday.', [
      p('You sit on the bench for one minute exactly, by the watch on your wrist, where you sat after the first Thursday with your shoes in your hand and your stockings ruined. The wood is wet. You do not care. A gull lands on the rail, looks at you, decides you are not food, and leaves.'),
      t('One minute. The last one that belongs to nobody but me before the room.'),
    ]),
    w('rail', 'Drop something off the rail', 'Adrian’s old Axiom pass has been in your coat pocket for eight months.', [
      p('At the rail where the envelope went into the water on the first Thursday, you take out of your coat pocket something that has been in it for eight months without your ever quite deciding to keep it: Adrian’s Axiom pass. His photograph. His name. The magnetic strip worn pale by eleven years of doors.'),
      p('You hold it over the water for a moment. Then you let it go, and it turns once in the air, catching the light, and is gone into the river without a sound.'),
      t('He opened a lot of doors with that. Tonight I open one without it.'),
    ]),
    w('on', 'Walk on', 'Don’t stop. Stopping is for afterwards.', [p('You don’t stop. Stopping is for afterwards. You walk on, at the same pace, the heels even on the wet stone, and the Vesper gets bigger in front of you one lamp-post at a time.')]),
  ];
}

function arriveChoices(s: GameState): C16Choice[] {
  if (!getKey(s, 'act4.walk')) return walkChoices();
  const seen = public16(s);
  const arrive = (id: string, label: string, hint: string, body: Block[]) =>
    offer16('arrive-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.arrive', id);
      setKey(x, 'act4.seen', seen ? 'yes' : 'no');
      return [
        ...body,
        p('The door opens before you touch it. The young man in the black suit, the one who has opened it for you every time, as if you were expected, as if you were property being delivered.'),
        q('Doorman', 'They’re expecting you.'),
        p('And then, for the first time, looking you in the eye:'),
        q('Doorman', 'Good luck, Ms Vale.'),
      ];
    });
  return [
    arrive('front', 'The front door', seen ? 'Through the cameras. They cannot turn you away in front of them.' : 'Straight up the embankment and in.', seen
      ? [p('You walk through them. The flashes go off in your face, and somebody shouts your name, the one on the poster, and you stop at the top of the steps and turn and give them the smile, once, the whole of it, so that there is a photograph of you walking into that building in every paper by morning. Whatever happens inside, they cannot make it quiet now.')]
      : [p('You walk up the embankment and up the three black steps as if you had an appointment, which you do, and the empty street watches you go in and says nothing, because it does not know yet what it is watching.')]),
    arrive('quiet', 'The service door', seen ? 'The alley. They will expect you quiet.' : 'The alley. Nobody will be there.', seen
      ? [
          p('The alley. And two men on the service stair, in good coats, waiting, exactly where somebody expected a woman with a face like yours to try to come in quietly.'),
          p('You look at them. They look at you. Then you say, pleasantly, “I think I’d rather use the front,” and turn round, and walk back up the alley and round to the steps, through the cameras after all, and they do not follow you out into the light.'),
        ]
      : [p('The alley, the service door, the hook where the keys hang. Nobody on the stair. Nobody anywhere. You go up the back way one last time, the way the staff go, and come out into the long room through the door the waiters use, and that is how they first see you: coming out of the wall.')]),
    arrive('car', 'The car she sent', 'Arrive as her guest. The one thing she won’t expect you to use.', [
      p(c(s, 'c8.pryce') ? 'The car she sent has kept pace with you along the embankment since the bridge. It stops. Mr Pryce holds the door, and says, “Ms Laurent’s compliments,” and then, very quietly, as you get in, “And mine.”' : 'The car she sent has kept pace with you along the embankment since the bridge, as it has every first Thursday. It stops. The driver holds the door and says Ms Laurent’s compliments.'),
      p('You ride the last two hundred yards in her car, on her leather, with her white orchid in the bud vase by the window, and when it draws up at the Vesper you get out of it the way a guest does, unhurried, and let the driver close the door behind you. She sent it so that you would arrive as hers. You arrive in it as nobody’s.'),
    ]),
  ];
}

// ── The Long Room ──

function completeBlocks(s: GameState): Block[] {
  const inside = (getKey(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
  return [
    p('The long room has been reset for the board. The empty frames are still on the walls, twenty gilt rectangles of nothing, lit from above as if they held something; and under them, down the middle of the room where the clients drank, a long dark table with six chairs, and six people in them.'),
    p('Two of them you know from the verdict’s signatures. Anton Deverell, at Celeste’s right hand, the chair: seventy, silver, shipping and insurance, a face like a closed ledger. Marguerite Soames, halfway down, with reading glasses on a chain and a pile of papers squared in front of her: the one who reads everything, and who is already, you notice, reading you.'),
    ...(inside.includes('julian') ? [p('At the far end, in the observer’s chair a client may take with notice, Julian, in a dark suit, not looking at you at all, which is how you know he is watching everything.')] : []),
    ...(inside.length ? [p(`Behind you, ${inside.filter((w) => w !== 'julian').map((w) => personLine[w as Person][0]).join(' and ') || 'nobody'}, taking the two chairs by the wall that somebody has had the grace, or the foresight, to put there.`)] : []),
    p('The other three you do not know, and they do not look at you, which is how you know they have been told to: a heavy man with a signet ring and a tan who is turning a pen end over end; a woman in her sixties in pearls, with a notebook open and nothing written in it; a young man with very good hair and a laptop, who is the only one in the room plainly frightened of all of them.'),
    p('On the table in front of Celeste’s place, closed, squared, with a white orchid laid across it: The Autumn Collection, with a page missing.'),
    p('And at the head of the table, in black, no jewellery, her hair cropped close to her head: Celeste.'),
    p('She stands up when you come in.'),
    t('She stood up when I came in. She has never once stood up for me before.'),
  ];
}

// ── Blocks and choices ──

export function chapter16Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter16') return [];
  if (s.phase === 'dawn') return dawnBlocks(s);
  if (s.phase === 'aim') return aimBlocks();
  if (s.phase === 'crew')
    return [
      p('Morning. The hard part: not who you want beside you, but who you are willing to spend. Everybody who walks into that room with you walks out of it known.'),
      p('You make a list on the back of an envelope and cross names off it and write them back on. Anyone at that table can be followed home. Anyone at that table can be looked up, and priced, and filed in a drawer at sixteen degrees. You know exactly what it costs to be in Celeste’s archive. You are deciding, this morning, who you are prepared to put there.'),
      p('And the other list, shorter: who stands outside, with a phone, with a camera, with an engine running, so that if you don’t come out, somebody knows, and says so, loudly, to people who can’t be bought.'),
      t('Two inside, at most. One outside. Or nobody, which is how I began.'),
    ];
  if (s.phase === 'table') return tableBlocks(s);
  if (s.phase === 'dress') return dressBlocks();
  if (s.phase === 'arrive') return arriveBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter16Choices(s: GameState): C16Choice[] {
  if (!chapter16Playable(s)) return [];
  if (s.scene === 'chapter15' && s.phase === 'complete' && ownPower(s))
    return [offer16('begin', 'Thursday', 'The board meets at six.', 'dawn')];
  if (s.scene !== 'chapter16') return [];
  if (s.phase === 'dawn') return dawnChoices();
  if (s.phase === 'aim') return aimChoices(s);
  if (s.phase === 'crew') return crewChoices(s);
  if (s.phase === 'table') return tableChoices(s);
  if (s.phase === 'dress') return dressChoices(s);
  if (s.phase === 'arrive') return arriveChoices(s);
  return [];
}

export function applyChapter16Choice(state: GameState, id: string): GameState {
  const choice = chapter16Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter16';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter16.${s.phase}` as NodeId, blocks: chapter16Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER16_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
