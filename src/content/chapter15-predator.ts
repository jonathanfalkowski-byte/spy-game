/** Chapter 15 (Predator route, lane id `predator`) · The Key:
 * gift → people → hour → drawers → week → line → ledger (its own end; the Celebrity `complete` is 'Act III').
 * Design: docs/story/PREDATOR_CHAPTER_15_THE_KEY_DESIGN.md (owner-approved 2026-09-27, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_15_SCRIPT.md. The shared archive heist from the client side:
 * a week before the board Celeste gives Helix's new counterparty a key to the Vesper archive ("Take what's yours. Only
 * what's yours."). Her own file (Adrian Vale, the transfer, her reports) and Maya's are hers; one thing more is not
 * (Nell's order / the 1109 recordings / Celeste's client ledger / her account's papers). The way in: the given hour,
 * two in the morning (Pryce or Iris), or a copy (Lucien or Marcus); a crew from what Predator built; one snag. The
 * week after breaks the leash, with one chosen cost; "No more help."; the black phone; an optional chosen evening (heat
 * 3, consent-gated, fades). Writes the shared Act IV keys (act3.leash, act3.adrian, act3.nell-order, act3.cards,
 * act3.switch, act3.cost, act3.black-phone, act3.page, c15.maya-file) so Chapters 16–18 can be shared spines. Entered
 * from the Predator `chapter14.ledger`. Local helpers mirror chapter15.ts (c15.* keys, chapter15.* ids) to avoid a
 * circular import.
 * Deepening pass (2026-09-27): the night before the job, which every way passes through (c15.p-eve = plan | dress |
 * sleep: walking it through with the crew, or alone with the salt cellar for Mrs Fenn; the clothes for a courtesy or
 * for two in the morning), and one thing read in the archive before the one thing taken (pred.read15 = adrian | marcus |
 * none: her assessment of Candidate 7A, "Will be grateful. Will not look back."; Marcus's drawer, "Review at
 * forty-three"). Celeste on the key ("I have never had it copied"), the week and the ledger at greater length. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C15Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get15 = (s: GameState, k: string) => s.choices['c15.' + k];
const set15 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c15.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C15Choice['apply']): C15Choice => ({ id: 'chapter15.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get15(s, 'rec.' + k) !== undefined) return;
  set15(s, 'rec.' + k, String(s.history.length));
  set15(s, 'event.' + k, String(s.revision));
  set15(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c15.' + k);
  s.knowledge.push('c15.' + k);
}

export const PREDATOR_PHASES15 = ['gift', 'people', 'hour', 'drawers', 'week', 'line', 'ledger'] as const;
export const isPredator15 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase15 = (s: GameState) => isPredator15(s) && (PREDATOR_PHASES15 as readonly string[]).includes(s.phase);

type Crew = 'iris' | 'lucien' | 'marcus' | 'marsh' | 'pryce' | 'julian' | 'halvorsen' | 'alone';
type Way = 'hour' | 'night' | 'copy';
const crew = (s: GameState) => get15(s, 'crew') as Crew | undefined;
const way = (s: GameState) => get15(s, 'way') as Way | undefined;
const hasLetters = (s: GameState) => key(s, 'pred.safe') === 'letters' && get15(s, 'p-letters') !== 'returned';
const keptAccount = (s: GameState) => ['taken', 'moved'].includes(key(s, 'pred.account') ?? '');

/** Who she can ask, from what the Predator road built (design §2). */
export function crewOptions15(s: GameState): Exclude<Crew, 'alone'>[] {
  const out: Exclude<Crew, 'alone'>[] = [];
  if (key(s, 'pred.ally.iris') === 'in') out.push('iris');
  if (key(s, 'pred.ally.morel') === 'in') out.push('lucien');
  if (key(s, 'pred.ally.marcus') === 'in') out.push('marcus');
  if (key(s, 'pred.ally.marsh') === 'in') out.push('marsh');
  if (key(s, 'c8.p-night') === 'pryce') out.push('pryce');
  if (key(s, 'pred.julian') === 'ally') out.push('julian');
  if (key(s, 'pred.halvorsen') === 'owes-her') out.push('halvorsen');
  return out;
}

export function placePredator15(s: GameState): string | undefined {
  if (s.phase === 'people' && way(s)) return 'The night before · The kitchen table';
  if (s.phase === 'hour') return { hour: 'Tuesday · 10:00 · The Vesper archive', night: 'Thursday · 02:00 · The Vesper archive', copy: 'Thursday · 03:00 · The Vesper archive' }[way(s) ?? 'hour'];
  if (s.phase === 'drawers') return way(s) === 'hour' ? '10:20 · The archive, one lamp' : '03:20 · The archive, one lamp';
  const evening = get15(s, 'p-evening-open');
  if (s.phase === 'line' && evening)
    return evening.startsWith('marcus') ? 'Late · A borrowed flat in Leeds, by the last train' : evening.startsWith('lucien') ? 'Late · Lucien’s hotel, the river' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The key ──

export function beginPredator15(): C15Choice {
  return offer('begin-predator', 'The key', 'A week before the board. Celeste has something for you.', 'gift');
}

function giftBlocks(s: GameState): Block[] {
  const w = key(s, 'pred.way');
  const laughed = key(s, 'pred.marcus') === 'laughed';
  return [
    p('The reading room at the Vesper, ten days before the first Thursday. Beeswax and old paper, the curtains open on the river, the lectern under the one lamp, and no book on it today.'),
    ...(w === 'board'
      ? [q('Celeste', 'Eleven minutes, darling. I have told everybody. The board is so looking forward to you.')]
      : w === 'press'
        ? [p('Celeste is not alone. A woman of sixty in a cardigan sits by the door with her knitting, and does not look up.'), q('Celeste', 'Mrs Fenn keeps my archive. You were on every front page in London. I have had to be a little careful with you since.')]
        : laughed
          ? [q('Celeste', 'Marcus tells me you laughed. I still haven’t heard it. Perhaps on Thursday.')]
          : [q('Celeste', 'Helix’s new representative. How nice to meet you properly. Poor Marcus. Personal reasons. So sudden.')]),
    p('She puts something small on the lectern between you: a brass key, old and plain, on a green silk ribbon, with a luggage tag tied to it. On the tag, in the green hand: Tuesday, 10:00.'),
    q('Celeste', 'My father had it made for the first archive, in 1911, when the family was still a little ashamed of what it kept. I have never had it copied. I have never needed to.'),
    q('Celeste', 'Every representative who sits at my table reads their own file first. It is a courtesy. Take what’s yours, darling. Only what’s yours.'),
    ...(hasLetters(s) ? [q('Celeste', 'And my letters. You may put them back in the drawer yourself. That is rather what the key is for.')] : []),
    t('She is giving me the key to the room where she keeps everything. She is that sure of me. The only question is what I do with a woman who is that sure.'),
  ];
}

function giftChoices(s: GameState): C15Choice[] {
  const g = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('gift-' + id, label, hint, 'people', (x) => {
      set15(x, 'p-gift', id);
      after?.(x);
      return body;
    });
  return [
    g('thank', 'Take the key, and thank her', 'Gracefully. It is a courtesy.', [p('You take the key by its ribbon, and thank her, and put it in your bag, and she watches your hand all the way there.')]),
    g('ask', 'Ask why she trusts you', 'Make her say it.', [
      q('You', 'Why do you trust me with this?'),
      q('Celeste', 'I don’t, darling. I trust the key. It only opens what I let it.'),
      t('Keys open locks. That is all a key has ever known how to do. She has forgotten that, because nobody has ever used one of hers against her.'),
    ]),
    ...(hasLetters(s)
      ? [
          g('letters', 'Put her letters on the lectern', 'Now, in front of her. Keep your copies.', [
            p('You take the cream envelopes out of your bag and lay them on the lectern beside the key, one by one, so that she can count them. She does, with her eyes, and smiles.'),
            q('Celeste', 'All of them. How honest.'),
            t('All of them. I photographed every page in the car on the way here. Honesty is only a question of which copy.'),
          ], (x) => set15(x, 'p-letters', 'returned')),
        ]
      : []),
  ];
}

// ── The people ──

function peopleBlocks(): Block[] {
  return [
    p('Two nights later, the flat, the wardrobe door, the brass key on its ribbon on the kitchen table like a small animal that has fallen asleep there.'),
    t('Take what’s mine. Only what’s mine. And one thing more, because she will count the files, and one is a mistake, and two is a war.'),
  ];
}

const crewScene: Record<Exclude<Crew, 'alone'>, [string, string, Block[]]> = {
  iris: ['Ask Iris', 'She stocked those drawers for four years.', [
    p('Iris rings back from a number with a foreign code, from a life with her own name in it.'),
    q('Iris Moreau', 'I stocked those drawers for four years. The cabinets are numbered by catalogue page, and Mrs Fenn keeps the Claremont drawer locked with a second key she wears on a chain. The service stair comes up behind the reading room. I’ll be on it.'),
  ]],
  lucien: ['Ask Lucien', 'The only man in the game as good at this as you are.', [
    p('Lucien arrives from Geneva on the last flight on Sunday, in a coat too thin for London, and turns the brass key over in his fingers at your kitchen table.'),
    q('Lucien Morel', 'My grandfather made locks before the family made money. This is Chubb, 1911. I can have a copy by the morning, and the original back on her desk with its ribbon by nine. She will never know it left the building.'),
  ]],
  marcus: ['Ask Marcus', 'He knows that archive. He has a drawer in it.', [
    p('Marcus comes down from Leeds on the train, in a jumper, carrying a sandwich in a paper bag, and looks at the key for a long time.'),
    q('Marcus Chen', 'I have a drawer in there. Everybody who ever sat at her table has a drawer in there. I know a man in Clerkenwell who copies keys and never asks whose. Give it to me tonight. You’ll have it back before she’s had breakfast.'),
  ]],
  marsh: ['Ask Owen Marsh', 'Outside the building. The switch.', [
    q('Owen Marsh', 'I won’t go in. I can’t. But I’ll be outside in a car with a phone, and if you’re not out by four, the Authority opens an inquiry into the Vesper by eight, whatever I have to tell my minister.'),
  ]],
  pryce: ['Ask Mr Pryce', 'The car, at two in the morning.', [
    p('You find him on level B2 of the Helix garage, polishing a car that belongs to a fund, and ask him, and he goes on polishing for a long time.'),
    q('Pryce', 'I drive, Ms Vale. I suppose on Thursday I also wait with the engine running. I have been waiting with the engine running for Mrs Laurent for nineteen years. It would make a change to do it for somebody who asks.'),
  ]],
  julian: ['Ask Julian', 'He will not like it. He will come.', [
    q('Julian Mercer', 'I don’t like it. I’ll watch the street. If anybody comes who shouldn’t, I’ll ring you once and hang up. That’s all I’m good for, in a burglary. It turns out that’s enough.'),
  ]],
  halvorsen: ['Call in Halvorsen’s lunch', 'He owes you. He is a client. Clients keep Celeste talking.', [
    q('Halvorsen', 'A lunch, my dear, I said, and I meant it. Tuesday at ten? I shall keep Mrs Laurent on the telephone about my ships for as long as you like. She adores talking about my ships. Nobody else does.'),
  ]],
};

const crewName: Record<Crew, string> = { iris: 'Iris', lucien: 'Lucien', marcus: 'Marcus', marsh: 'Owen Marsh', pryce: 'Mr Pryce', julian: 'Julian', halvorsen: 'Halvorsen', alone: '' };

/** The night before the job (deepening pass): every way passes through it. */
function eveChoices(s: GameState): C15Choice[] {
  const c = crew(s) ?? 'alone';
  const night = way(s) !== 'hour';
  const e = (id: string, label: string, hint: string, body: Block[]) =>
    offer('eve-' + id, label, hint, 'hour', (x) => {
      set15(x, 'p-eve', id);
      return body;
    });
  return [
    e('plan', c === 'alone' ? 'Walk it through on the kitchen table' : 'Walk it through with ' + crewName[c], 'Twice. Out loud.', [
      c === 'alone'
        ? p('You walk it through on the kitchen table, alone, twice, out loud, with the salt cellar for Mrs Fenn and the pepper for the door and the brass key for the key, until you catch yourself doing Mrs Fenn’s voice, and stop.')
        : p(`${crewName[c]} goes through it with you at the kitchen table, twice, with the salt cellar for Mrs Fenn and the pepper for the door, and on the second time round asks the only question that matters.`),
      ...(c === 'alone' ? [t('And if she’s there? Then I was invited. That is the whole plan. It is a very good plan, as long as nobody counts.')] : [q(crewName[c], 'And if she’s there?'), q('You', 'Then I was invited.')]),
    ]),
    e('dress', night ? 'Dress for two in the morning' : 'Dress for a courtesy', 'You always dress for the room.', [
      p(
        night
          ? 'Black, close, the soft boots, your hair pinned so that nothing falls into a drawer. And in the pocket, the green ribbon, because if anybody asks, you were given a key.'
          : 'A guest’s clothes: the grey silk, pearls, flat shoes that make no sound on a steel floor, because a guest should never sound as if she is in a hurry.',
      ),
    ]),
    e('sleep', 'Go to bed', 'Tomorrow is early, or late.', [p('You go to bed, and sleep, which surprises you, and dream about nothing at all.')]),
  ];
}

function peopleChoices(s: GameState): C15Choice[] {
  const c = crew(s);
  if (c && way(s)) return eveChoices(s);
  if (c) {
    const w = (id: Way, label: string, hint: string, body: Block[]) =>
      offer('way-' + id, label, hint, 'people', (x) => {
        set15(x, 'way', id);
        setKey(x, 'pred.way15', id);
        return body;
      });
    return [
      w('hour', 'Use it at the hour she gave you', 'Tuesday at ten, under the archivist’s eyes. The boldest.', [t('Tuesday at ten, exactly as the tag says. A guest, reading her own file, taking her time.')]),
      ...(c === 'pryce' || c === 'iris' ? [w('night', 'Use it at two in the morning', 'An hour it was never meant for.', [t('Two in the morning. The same key. A different courtesy.')])] : []),
      ...(c === 'lucien' || c === 'marcus' ? [w('copy', 'Copy it, and give hers back untouched', 'A key that does not officially exist.', [t('Hers goes back on her desk by nine, ribbon and all. Mine opens the same door at three in the morning.')])] : []),
    ];
  }
  const ask = (who: Exclude<Crew, 'alone'>) => {
    const [label, hint, body] = crewScene[who];
    return offer('crew-' + who, label, hint, 'people', (x) => {
      set15(x, 'crew', who);
      return body;
    });
  };
  return [
    ...crewOptions15(s).map(ask),
    offer('crew-alone', 'Ask nobody', 'Alone. The plan will feel it.', 'people', (x) => {
      set15(x, 'crew', 'alone');
      return [t('Nobody. Everybody I could ask is somebody she could ask about me.')];
    }),
  ];
}

// ── The hour, and the snag ──

function hourBlocks(s: GameState): Block[] {
  const w = way(s) ?? 'hour';
  const c = crew(s);
  const lead: Block[] =
    w === 'hour'
      ? [
          p('Tuesday at ten. The Vesper in daylight is only a building: a gallery with no name, a cleaner on the stair, somebody’s coffee cooling on the cloakroom counter.'),
          p('Mrs Fenn sits at a small desk outside a door without a handle, knitting something long and grey. She reads the tag on your ribbon through her half-moon glasses, and nods, and goes back to her knitting.'),
          q('Mrs Fenn', 'Take your time, dear. Mrs Laurent said you’d want to read.'),
          ...(c === 'halvorsen' ? [p('Somewhere upstairs a telephone rings, and goes on being answered. Halvorsen, talking about his ships.')] : []),
        ]
      : w === 'night'
        ? [
            c === 'pryce'
              ? p('Two in the morning. Pryce brings the car to the embankment with the lights off and the engine running, and does not look at the building. “I’ll be here,” he says. “I always am.”')
              : p('Two in the morning. Iris is on the service stair behind the reading room, in black, with a torch the size of a lipstick, exactly where she said.'),
            p('The key turns in the lock at an hour it was never meant for, as easily as it would have turned at ten. Keys do not know what time it is.'),
          ]
        : [
            p('At nine that morning the brass key was back on Celeste’s desk, on its ribbon, in the exact position it had left. At three the next morning a new key, still warm from somebody’s pocket, turns in the same lock.'),
            c === 'lucien' ? p('Lucien stands at the foot of the service stair with his hands in his pockets, as if waiting for a lift. “1911,” he says. “They made them to last.”') : p('Marcus is in the lane behind the Vesper in his jumper, eating the second half of the sandwich. “I used to have a key to this building,” he says. “She took it back the day she gave me my desk.”'),
          ];
  const snag =
    w === 'hour'
      ? p('Twenty minutes in, the knitting needles stop. Mrs Fenn is standing in the doorway, with the long grey knitting over her arm, looking at the drawer you are standing in front of, which is not yours.')
      : w === 'night'
        ? p('Twenty minutes in, a light comes on under the reading-room door. Somebody is up. Somebody with a glass, from the sound of it, humming.')
        : p('Twenty minutes in, on the way back out, the copy sticks in the lock, halfway, and will not turn either way.');
  return [...lead, snag];
}

function snagChoices(): C15Choice[] {
  const n = (id: string, label: string, hint: string, body: Block[]) =>
    offer('snag-' + id, label, hint, 'drawers', (x) => {
      set15(x, 'snag', id);
      return body;
    });
  return [
    n('talk', 'Talk your way through it', 'You are very good at this.', [
      p('You talk. Warmly, easily, about nothing, the way you talked to the clients in the long room, until whoever it is has forgotten what they came to see, and remembers only that they liked you.'),
    ]),
    n('hide', 'Get out of sight', 'The cabinets are tall and the lamp is small.', [
      p('You step back between two cabinets into the dark the one lamp does not reach, and wait, and breathe through your mouth, and after a very long minute it goes away again.'),
    ]),
    n('bold', 'Keep going, and let it see you', 'Guests do not hide.', [
      p('You do not stop. You do not hide. You go on reading with your back to it, as a guest does, as somebody entitled to be exactly where she is, and whoever it is decides that you must be.'),
      t('The best cover is the truth. I was given a key. Everything after that is only a question of which drawer.'),
    ]),
  ];
}

// ── The drawers ──

function drawersBlocks(s: GameState): Block[] {
  const r = key(s, 'pred.celeste10');
  return [
    p('The archive is a narrow room of grey steel cabinets, lit by one lamp, cold as a church, and every drawer is labelled with a page number from the catalogue. I keep everything, darling. She does.'),
    p('Page forty is yours. Inside: the order, TRANSFERRED: AXIOM → HELIX, AT CLIENT REQUEST (M. CHEN). A clinic’s records for a Candidate 7A. The fitting. A photograph of a man called Adrian Vale in a suit that did not fit him, taken from across a street.'),
    ...(r === 'accepted' ? [p('And, in a folder marked MARCUS, every report you sent on the black phone, printed, filed, each one initialled in green. Every confidence he gave you, and the second reader.')] : r === 'fed' ? [p('And, in a folder marked MARCUS, every report you sent on the black phone, printed and filed. Not one of them true. She has underlined the best lines in green.')] : []),
    p('In the drawer for the people round the people, a folder with a name you know better than your own: MAYA REYES. Drafts of emails Maya never wrote, prepared and never used. For the day they were needed.'),
    q('Your file', 'Take what’s yours. Only what’s yours.'),
    t('Mine. And Maya’s, which is mine, because I am the reason it exists. And one thing more, because she will count, and I want her to count to a number that is wrong.'),
  ];
}

/** One thing read before the one thing taken (deepening pass). */
function readChoices(): C15Choice[] {
  const r = (id: string, label: string, hint: string, body: Block[]) =>
    offer('read-' + id, label, hint, 'drawers', (x) => {
      set15(x, 'p-read', id);
      setKey(x, 'pred.read15', id);
      return body;
    });
  return [
    r('adrian', 'Read what she wrote about Adrian', 'One sheet, in green, behind the clinic’s records.', [
      p('Behind the clinic’s records, one sheet of cream paper in the green hand, dated the spring before the Glass House. An assessment.'),
      q('The assessment', 'Candidate 7A. Clever. Lonely. Careful with everybody but himself. Will be grateful. Will not look back.'),
      t('Will be grateful. She was right about the first month. She has been wrong about every month since.'),
    ]),
    r('marcus', 'Open Marcus’s drawer', 'Page one of a much older book.', [
      p('Marcus’s drawer is near the very front, page one of a much older catalogue, the photograph of a young man in a suit bought for a funeral.'),
      q('The drawer', 'M. CHEN. Recruited at twenty-nine. Placed: Helix. Loyal to whoever is above him. Review at forty-three.'),
      t('Review at forty-three. He was forty-three this spring. I was the review. She wrote me into his drawer fourteen years before she met me.'),
    ]),
    r('none', 'Keep to the job', 'The lamp, the clock, four minutes.', [p('You read nothing that is not on your list. The lamp, the clock, four minutes. You have always been good at lists.')]),
  ];
}

function tookChoices(s: GameState): C15Choice[] {
  const k = (id: string, label: string, hint: string, body: Block[], after: (x: GameState) => void) =>
    offer('took-' + id, label, hint, 'week', (x) => {
      set15(x, 'took', id);
      setKey(x, 'pred.took15', id);
      setKey(x, 'act3.adrian', 'hers');
      setKey(x, 'act3.page', 'torn');
      set15(x, 'maya-file', 'yes');
      after(x);
      note(x, 'p15-took', `With the key Celeste gave her, Evelynn took her own file (Adrian Vale, the transfer order), Maya Reyes’s file, and one thing more: ${label.toLowerCase()}.`, 'The Vesper archive, by her own hand');
      return body;
    });
  return [
    k('nell', 'Nell’s drawer', 'The Jakarta order, signed C.', [
      p('Nell’s drawer is near the front, the metal soft at the handle with use. The Jakarta order is one sheet, typed, three lines, with a looping C. at the foot of it. It proves the burn. It does not say what happened at the harbour. You fold it into your own file, behind Adrian.'),
      ...(key(s, 'pred.watch') ? [t('Her watch is on my wrist. Her order is in my file. She is coming out of this building with me, one way or another.')] : []),
    ], (x) => setKey(x, 'act3.nell-order', 'taken')),
    k('1109', 'The Claremont drawer', 'Every placement filmed. Mrs Fenn’s second key.', [
      p('The Claremont drawer has its own lock, and the lock gives, the way old locks give to somebody who has been told where the second key hangs. Tapes, cards, a ledger of rooms and dates.'),
      ...(key(s, 'pred.mirror') === 'complied' ? [p('And a receipt, on cream paper: for services at the Claremont, 1109. Operator: E. Vale. You put it with the rest. It is evidence. It is also you.')] : []),
    ], (x) => setKey(x, 'act3.cards', 'taken')),
    k('clients', 'Celeste’s client ledger', 'The buying side. Who bought whom.', [
      p('The client ledger is the thickest thing in the room, and the only thing bound in green. Every client, every transfer, every price. Marcus, three times. Halvorsen, twice. The quiet man from the Gulf fund, once, crossed out. A minister. Two ministers.'),
      t('On Thursday, not one of them will be able to say they did not know what they were buying.'),
    ], (x) => setKey(x, 'pred.clients15', 'taken')),
    ...(keptAccount(s)
      ? [
          k('account', 'Your own account’s papers', 'The card from Geneva. Cut the hook.', [
            p('Behind your transfer order, a slim file from Morel & Cie: the numbered account, the fund’s seed, the date you turned the card over and kept it. You take it. With it, the account can be closed clean, and nobody can ever say the fund paid you.'),
          ], (x) => setKey(x, 'pred.account', 'closed')),
        ]
      : []),
  ];
}

// ── The week after: the leash, and the cost ──

function holders(s: GameState): string[] {
  const out: string[] = [];
  if (key(s, 'pred.ally.marsh') === 'in') out.push('Owen Marsh');
  if (key(s, 'pred.ally.morel') === 'in') out.push('Lucien Morel');
  if (key(s, 'pred.ally.iris') === 'in') out.push('Iris Moreau');
  if (key(s, 'pred.nora') === 'told') out.push('Nora Linden');
  if (key(s, 'pred.ally.marcus') === 'in') out.push('Marcus Chen');
  if (key(s, 'pred.julian') === 'ally') out.push('Julian Mercer');
  if (key(s, 'c6.maya') === 'restored') out.push('Maya');
  return out.length ? out : ['a solicitor in Holborn who has never met you', 'a safe-deposit box in your own name'];
}

function weekBlocks(s: GameState): Block[] {
  const r = key(s, 'pred.celeste10');
  const h = holders(s).slice(0, 3);
  return [
    p('The week after, the holds come off one by one, fast, the way you would take pins out of a card.'),
    p('Maya’s file burns in the kitchen sink, page by page, and she never knows it existed.'),
    p('On Monday a florist delivers a white orchid to the flat, from nobody. You leave it on the landing for the neighbours, who have always admired your flowers.'),
    ...(r === 'accepted' ? [p('Your reports on Marcus, the true ones, go to Leeds by post, with a note in your own hand: So you know what I told her. I am sorry about the bar.')] : r === 'fed' ? [p('Your reports on Marcus, the lies, you keep. Celeste underlined the best lines. One day that will be very funny.')] : []),
    ...(key(s, 'pred.account') === 'closed' ? [p(key(s, 'pred.delphine') === 'free' ? 'The account at Morel & Cie is closed by Thursday, and what was in it goes, anonymously, to a guest house in a coast town nobody can place, to a nurse who used to be called Delphine.' : 'The account at Morel & Cie is closed by Thursday, and what was in it goes, anonymously, to Holland Village, to a woman who was paid once already for her sister.')] : keptAccount(s) ? [p('The account at Morel & Cie is still open. You leave it open. You tell yourself it is evidence.')] : []),
    p('Copies of everything go to ' + h.join(', ').replace(/, ([^,]*)$/, ' and $1') + ', none of whom knows about the others, with one instruction: if I stop answering, open it.'),
    t('And one line on the list I have not ticked. What this costs. Nothing like this comes free, and she taught me that. I am going to pay it myself, on purpose, before she can send me the bill.'),
  ];
}

function costChoices(s: GameState): C15Choice[] {
  const ally = key(s, 'pred.ally.morel') === 'in' ? 'Lucien' : key(s, 'pred.ally.marsh') === 'in' ? 'Owen Marsh' : key(s, 'pred.ally.iris') === 'in' ? 'Iris' : key(s, 'pred.halvorsen') === 'owes-her' ? 'Halvorsen' : 'Mr Pryce';
  const rel = key(s, 'pred.julian') === 'ally' ? 'Julian' : key(s, 'pred.ally.marcus') === 'in' ? 'Marcus' : 'Maya';
  const c = (id: string, label: string, hint: string, who: string, body: Block[], after?: (x: GameState) => void) =>
    offer('cost-' + id, label, hint, 'line', (x) => {
      set15(x, 'cost', id);
      set15(x, 'cost-who', who);
      setKey(x, 'act3.cost', id);
      setKey(x, 'act3.leash', 'broken');
      setKey(x, 'act3.switch', 'set');
      after?.(x);
      note(x, 'cost', `What breaking the leash cost Evelynn: ${label.toLowerCase()}.`, 'Her own choice, the week before the board');
      return body;
    });
  return [
    c('ally', 'Spend ' + ally, 'An ally, used up, so the rest can be safe.', ally, [
      p(
        ally === 'Lucien'
          ? 'Lucien’s bank is named, on the record, as the house that kept the nine flats. He rings you the next morning, very calm, from a Geneva that no longer returns his calls. “It was always going to be one of us. I’m glad it was the one who knew it.”'
          : ally === 'Owen Marsh'
            ? 'Marsh goes public early, before the board, and his minister takes his inquiry away from him by lunchtime. He sends you one line: “Worth it. — O.M.”'
            : ally === 'Iris'
              ? 'Iris’s cover is burned to prove the archive exists: her four years, on the record. She sends a postcard with no stamp and one word on it: FREE.'
              : ally === 'Halvorsen'
                ? 'You call in Halvorsen’s debt, all of it, in one morning: a statement, on the record, about what he was sold. He gives it. He will never speak to you again.'
                : 'Mr Pryce gives a statement: nineteen years of driving, every address, every hour. The fund lets him go the same day. He drives himself home, for once.',
      ),
    ]),
    c('visibility', 'Go on the record', '“The woman who took Helix”, saying the word Meridian.', 'the city', [
      p('You go on the record, on camera, in the black, as the woman who took Helix, and say the word Meridian out loud, twice, slowly, so that nobody can say later that they misheard. By evening your face is the story again. It will be, now, for good. It is also the safest place in London to stand.'),
    ]),
    c('money', 'Give back what you wanted', 'The money. All of it. To Nadia Brandt’s fees, and to Nora.', 'the money', [
      p('The bonus pool, the transfer fee, the advance, everything the Predator road ever paid you: Nadia Brandt’s fees, and a transfer to Holland Village with no name on it. By Friday you have less money than you had the morning the car came for you.'),
      t('Enough money that nobody can starve me into anything again. I have just given it away, so that nobody can say it bought me.'),
    ], (x) => setKey(x, 'own.cash', '0')),
    c('relationship', 'Pay with ' + rel, 'The one that hurts.', rel, [
      p(
        rel === 'Julian'
          ? 'Julian’s deal with Helix dies with this, the one he built for two years, and he knew it would when he said yes to watching the street. He does not ring. You find you are waiting for him to.'
          : rel === 'Marcus'
            ? 'Marcus is named in the files you send, as a client, three times over, and Leeds is not far enough away. He rings once, at midnight. “I know,” he says. “I’d have done the same.” He hangs up before you can tell him you know he would.'
            : 'Maya has to leave London to be safe, for a while, and does, and on the platform says: “When this is over, you are going to tell me all of it. The real one.”',
      ),
    ]),
  ];
}

// ── The last line, the black phone, the evening ──

function lineBlocks(s: GameState): Block[] {
  return [
    p('Wednesday night, the eve of the board. The kitchen table, the black phone' + (key(s, 'pred.phoneN') ? ', the N on its back facing you,' : ',') + ' and a message you have never once started. You write it slowly, in the phone’s small type, and send it before you can admire it.'),
    q('You · to C.', 'No more help.'),
    p('A long time. Long enough for the kettle, and the tea, and the tea going cold. Then:'),
    q('C.', 'Then Thursday. Come as whoever you like, darling. I should warn you that I shall be there as myself.'),
  ];
}

function phoneChoices(s: GameState): C15Choice[] {
  const ph = (id: 'return' | 'river' | 'keep', label: string, hint: string, body: Block[]) =>
    offer('phone-' + id, label, hint, 'line', (x) => {
      set15(x, 'phone', id);
      setKey(x, 'act3.black-phone', id);
      return body;
    });
  return [
    ph('return', 'Send it back to her', 'In the Vesper’s own orchid box, by courier. No card.', [p('It goes back to the Vesper at nine in the morning in one of its own orchid boxes, by courier, with nothing written on the card.')]),
    ph('river', 'Drop it off the bridge', 'The canal behind the Vesper.', [p('You walk to the bridge over the canal behind the Vesper' + (key(s, 'pred.answer11') === 'refused' ? ', where the memo went in December,' : ',') + ' and drop it, and it goes into the black water without a sound' + (key(s, 'pred.phoneN') ? ', N and all.' : '.'))]),
    ph('keep', 'Switch it off and keep it', 'Evidence. Thursday may want it.', [p('You switch it off, and wrap it in a silk scarf, and put it in the drawer with Adrian’s things. Evidence. Thursday may want it.')]),
  ];
}

type Partner = 'julian' | 'marcus' | 'lucien';
const who: Record<Partner, string> = { julian: 'Julian Mercer', marcus: 'Marcus Chen', lucien: 'Lucien Morel' };
const invite: Record<Partner, Block[]> = {
  julian: [p('At ten, Julian, one line: “Whatever you took, I don’t want to know. Come up.”'), p('The forty-first floor, the city laid out below, his cuffs undone.'), q('Julian Mercer', 'Tell me what you want tonight. Only tonight.')],
  marcus: [p('At ten you take the last train north, which you did not know you were going to do until you were on it. Marcus opens the door of a borrowed flat in Leeds in his jumper, and does not look surprised.'), q('Marcus Chen', 'No business. There isn’t any. Tell me what you want tonight.')],
  lucien: [p('At ten Lucien rings from his hotel on the river, his last night in London. “I have a piano in the lobby and nobody to play it for. Come and tell me I was right about the lock.”'), q('Lucien Morel', 'Nothing we did this week has anything to do with tonight. Tell me what you want.')],
};
const scopeReply: Record<'no-sex' | 'sex', string> = { 'no-sex': 'Then that is the evening. You say stop, I stop.', sex: 'Yes. And you say stop, it stops. The same for me.' };
const stay: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the glass and stops exactly where you tell him to, and holds you, and for the first time in months nobody is holding anything else.')],
    sex: [p('The dress goes, and his shirt, and the whole long month with them. He asks once more, and you answer by pulling him toward the bedroom.'), p('What happens next stays on the forty-first floor. The scene fades.')],
  },
  marcus: {
    'no-sex': [p('He kisses you in a stranger’s kitchen with the rain on the window, slowly, and stops where you said, and you sit up until three talking about his mother, who is delighted he is home.')],
    sex: [p('He undoes the dress in a borrowed room as if he had all the time in the world, which for once he has, and asks once more. You answer by drawing him toward the bed.'), p('What happens next is two people with nothing left to take from each other. The scene fades.')],
  },
  lucien: {
    'no-sex': [p('He plays for you in an empty hotel lobby at midnight, one piece, and then kisses you by the dark window over the river and stops exactly where you said, as he said he would.')],
    sex: [p('He undresses you as if reading something he means to remember, slowly, and asks once more, and you answer by pulling him toward the lift.'), p('What happens next is two people who have stopped lying to each other, for one night. The scene fades.')],
  },
};

function eveningChoices(s: GameState): C15Choice[] {
  const open = get15(s, 'p-evening-open');
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer(`p15-${partner}-${id}`, label, hint, 'line', (x) => {
        set15(x, 'p-evening-open', partner + '-room');
        set15(x, 'p-evening-scope', id);
        note(x, 'p15-evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(who[partner], scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('p15-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'ledger', (x) => {
        delete x.choices['c15.p-evening-open'];
        set15(x, 'p-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get15(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p15-stop', 'Stop here', 'Honoured immediately, without argument.', 'ledger', (x) => {
        delete x.choices['c15.p-evening-open'];
        set15(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer('p15-stay', 'Stay', 'Continue within what you chose.', 'ledger', (x) => {
        delete x.choices['c15.p-evening-open'];
        set15(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[partner][sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  const go = (partner: Partner, label: string, hint: string) =>
    offer('ev-' + partner, label, hint, 'line', (x) => {
      set15(x, 'p-evening', partner);
      set15(x, 'p-evening-open', partner);
      return invite[partner];
    });
  return [
    ...(key(s, 'pred.julian') === 'ally' && key(s, 'c6.friction-julian') !== 'cooled' ? [go('julian', 'Go to Julian', 'He will not ask what you took.')] : []),
    ...(key(s, 'pred.ally.marcus') === 'in' || key(s, 'pred.mercy') === 'name' ? [go('marcus', 'Take the last train to Leeds', 'Marcus, in a borrowed flat. No business.')] : []),
    ...(crew(s) === 'lucien' ? [go('lucien', 'Go to Lucien’s hotel', 'His last night in London.')] : []),
    offer('ev-alone', 'Stay in', 'Chapter 15 ends here.', 'ledger', (x) => {
      set15(x, 'p-evening', 'alone');
      return [p('You stay in, with the wardrobe door open and nothing on the kitchen table at all, which is its own kind of freedom.')];
    }),
  ];
}

// ── The ledger ──

function ledgerBlocks(s: GameState): Block[] {
  return [
    ...(get15(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep, and do not want to.')] : []),
    p('The wardrobe door. One by one, every card on her side of the string comes across to yours: HOLLIS, VARGA, THE FUND, THE NINE FLATS, IRIS, DELPHINE, MARCUS’S DESK, PAGE FORTY. It takes an hour. You do it slowly, the way you would take down a room you were leaving.'),
    p(way(s) === 'copy' ? 'The copy of the key hangs on the pin at the top of the door, on a length of red thread. The original is on her desk, where it has always been. She has never had it copied. She has never needed to.' : 'The brass key hangs on the pin at the top of the door, on its green ribbon. On Thursday you will give it back to her. On Thursday you will have finished with it.'),
    p('At the end there is one card left on her side, at the very top, where it has been since the Vesper:'),
    q('The card', 'THE BOARD MEETS. THE FIRST THURSDAY.'),
    t('She gave me the key to everything, because she was sure of me. I kept it. Thursday, she finds out what she was sure of.'),
  ];
}

export function predatorBlocks15(s: GameState): Block[] {
  if (s.phase === 'gift') return giftBlocks(s);
  if (s.phase === 'people') return peopleBlocks();
  if (s.phase === 'hour') return hourBlocks(s);
  if (s.phase === 'drawers') return drawersBlocks(s);
  if (s.phase === 'week') return weekBlocks(s);
  if (s.phase === 'line') return lineBlocks(s);
  if (s.phase === 'ledger') return ledgerBlocks(s);
  return [];
}

export function predatorChoices15(s: GameState): C15Choice[] {
  if (s.phase === 'gift') return giftChoices(s);
  if (s.phase === 'people') return peopleChoices(s);
  if (s.phase === 'hour') return snagChoices();
  if (s.phase === 'drawers') return get15(s, 'p-read') ? tookChoices(s) : readChoices();
  if (s.phase === 'week') return costChoices(s);
  if (s.phase === 'line') return get15(s, 'phone') ? eveningChoices(s) : phoneChoices(s);
  return [];
}
