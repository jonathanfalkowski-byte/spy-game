/** Chapter 17 (Predator route, lane id `predator`) · Sit With Us:
 * sit → market → marcus → offer → eleanor → hands → minute (its own end; the Celebrity `complete` is 'The Front Door').
 * Design: docs/story/PREDATOR_CHAPTER_17_SIT_WITH_US_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_17_SCRIPT.md. The shared hour at the board, framed as a
 * succession: Celeste introduces her as Helix's counterparty "and my successor, if she'll have it". The market (the
 * client ledger, clause 14.3, the nine flats) in place of the defect; Marcus in place of Sloane; the offer is the seat,
 * and accepting is a real answer (accept / refuse / laugh), with the held card as a blow or as her price; Nell as shared
 * canon (the car, the harbour wall, the driver, six and seven o'clock), with the phone's N and the watch; the board
 * (succeeded, or by the case: resigned / diminished / closed; Meridian always stands); one minute, and the key.
 * Entered from the Predator `chapter16.room`; the road stops at `chapter17.minute` until the Predator Chapter 18 exists.
 * Writes the act4.* keys Chapter 18 reads (act4.marcus in place of act4.sloane). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { cards16 } from './chapter16-predator';

type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C17Choice['apply']): C17Choice => ({ id: 'chapter17.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (key(s, 'c17.rec.' + k) !== undefined) return;
  setKey(s, 'c17.rec.' + k, String(s.history.length));
  setKey(s, 'c17.event.' + k, String(s.revision));
  setKey(s, 'c17.layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c17.' + k);
  s.knowledge.push('c17.' + k);
}

export const PREDATOR_PHASES17 = ['sit', 'market', 'marcus', 'offer', 'eleanor', 'hands', 'minute'] as const;
export const isPredator17 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase17 = (s: GameState) => isPredator17(s) && (PREDATOR_PHASES17 as readonly string[]).includes(s.phase);

const inside = (s: GameState) => (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
const isIn = (s: GameState, who: string) => inside(s).includes(who);
const accepted = (s: GameState) => key(s, 'act4.offer') === 'accept';

/** The board, as the Predator road decides it (design §4, §5.6). */
export function board17p(s: GameState): { board: 'succeeded' | 'resigned' | 'diminished' | 'closed'; terms: 'full' | 'partial' | 'none' } {
  if (accepted(s)) return { board: 'succeeded', terms: 'full' };
  const order = ['thin', 'supported', 'strong', 'overwhelming'];
  let level = order.indexOf(key(s, 'act4.case') ?? 'thin');
  if (key(s, 'act4.seen') === 'yes' && level < 2) level += 1;
  if (key(s, 'act4.marcus') === 'use' && level < 3) level += 1;
  if (level >= 2) return { board: 'resigned', terms: 'full' };
  if (level === 1) return { board: 'diminished', terms: 'partial' };
  return { board: 'closed', terms: 'none' };
}
export const nellSaid17p = (s: GameState): 'eleanor' | 'evie' => {
  const named = key(s, 'act4.named');
  if (named === 'nora' || named === 'wait') return 'eleanor';
  return ['strong', 'overwhelming'].includes(key(s, 'act4.case') ?? '') ? 'eleanor' : 'evie';
};

type Card = 'clients' | 'nell' | 'recordings' | 'flats' | 'clause' | 'page' | 'letters';
const firstLands: Record<Card, string> = {
  clients: 'The client ledger, bound in green, open at the first page. The heavy man with the signet ring finds his own name on it before you have finished turning it round, and puts his hand flat over it, as if that would help.',
  nell: 'One sheet, three lines, signed with a looping C. Deverell reads it upside down, and then, for the first time tonight, looks at Celeste.',
  recordings: 'A box of tapes and a ledger of rooms and dates. The young man with the laptop goes white. He knows what the Claremont is for. He has booked it.',
  flats: 'Nine standing orders from Morel & Cie, fanned out like a hand of cards. One of them pays the rent of the woman standing in front of them.',
  clause: 'Page thirty-one of a Geneva term sheet, clause 14.3 circled once, in pencil. Marguerite Soames reaches for her glasses, and reads it, and reads it again.',
  page: 'Page forty, torn along the spine: E. V. · TRANSFERRED · AT CLIENT REQUEST. The missing page, back in the room it was taken from.',
  letters: 'Cream envelopes, the green C. on every one. Celeste’s own letters to Marcus Chen, laid out on her own table.',
};
const heldBlow: Record<Card, string> = {
  clients: 'You take the client ledger out of your coat and put it on the table, open, and turn it slowly so that every person at that table can see their own name in it, and every other. “You each bought from this book. Now you each know who else did.”',
  nell: 'You take one sheet out of your coat and lay it on the table in front of Deverell: Jakarta, three lines, signed C. “And this is what it costs when one of them wants to leave.”',
  recordings: 'You put a single tape on the table, labelled in a clerk’s hand: 1109. “Every client at this table has a room like this one. I’d be very careful who you vote for.”',
  flats: 'You put nine standing orders on the table, one after another, like a man laying down a winning hand, and the last one is your own address.',
  clause: 'You put page thirty-one on the table and read clause 14.3 aloud, in full, slowly, the smallest type in the document, to the people whose companies it owns.',
  page: 'You put page forty on the table, and your own face looks up at them from it. “Transferred at client request. I’d like to know which of you signed for the next one.”',
  letters: 'You put her letters on the table, one at a time, and read the last line of the last one aloud, in her own voice, which you have learned perfectly.',
};
const heldPrice: Record<Card, string> = {
  clients: 'the client ledger stays in my drawer, not yours, and nobody at this table buys anybody again without my name on the page',
  nell: 'Eleanor Linden’s file goes to her sister tonight, entire, with the pages that were taken out of it',
  recordings: 'the Claremont drawer is emptied, and every tape in it is mine to keep or burn',
  flats: 'the nine flats are closed, and the women in them are told the truth, and paid',
  clause: 'clause 14.3 is struck from every agreement this fund has ever signed with Helix',
  page: 'page forty is burned in this room, tonight, in front of all of you',
  letters: 'her letters stay with me, and she never writes to anyone at Helix again',
};

// ── The entry, and the seventh chair ──

export function beginPredator17(): C17Choice {
  return offer('begin-predator', 'The room', 'Six people, one hour, and a chair pulled out.', 'sit');
}

function sitBlocks(s: GameState): Block[] {
  const wear = key(s, 'act4.wear');
  return [
    p('Celeste speaks first. Of course she does. She stays standing, one hand resting on the back of the seventh chair, and turns to the board, and speaks to them warmly, the way she spoke to a room of clients on the first Thursday of December.'),
    q('Celeste', 'Anton. Marguerite. Gentlemen. You all know Helix. You all know how well Helix has done this year, and why. May I present Helix’s new counterparty, Ms Evelynn Vale.'),
    p('A pause, exactly long enough.'),
    q('Celeste', 'And, you will forgive me, Anton, my successor. If she will have it.'),
    p('The heavy man with the signet ring puts his pen down. Soames looks at you over the top of her glasses and does not look away. Deverell, closed as a ledger, only nods, as if a date had been confirmed.'),
    q('Celeste', wear === 'green' ? 'My green. How flattering. Or how rude. I shall decide which by seven.' : wear === 'blue' ? 'Marcus’s blue. He always did have taste, whatever else he lacked.' : 'Black. Of course. You never did let me dress you.'),
    ...(key(s, 'pred.key16') === 'throat' ? [q('Celeste', 'And my key. Wear it by all means, darling. It suits you better than it ever suited me.')] : []),
    t('She has offered me her chair in the first two minutes, in front of all of them. It is the best opening I have ever seen. I have to do better than it.'),
  ];
}

function sitChoices(s: GameState): C17Choice[] {
  const first = key(s, 'act4.first') as Card;
  const o = (id: string, label: string, hint: string, body: Block[]) =>
    offer('open-' + id, label, hint, 'market', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, p(firstLands[first] ?? firstLands.page)];
    });
  return [
    o('chair', 'Sit in the seventh chair', 'First. Before anybody asks you to. Let them wonder what it means.', [
      p('You walk the length of the table and sit down in the seventh chair, beside her, before anybody has asked you to, and cross your legs, and put the first card on the table in front of you, face down, and turn it over.'),
      q('Celeste', 'Well. That answers one question.'),
      q('You', 'Does it?'),
    ]),
    o('stand', '“I’ll stand. I came as Helix.”', 'Leave the chair where it is.', [
      q('You', 'Thank you. I’ll stand. I came as Helix.'),
      p('You stay at the end of the table, where the clients sit, and leave the seventh chair exactly where it is, pulled out, empty, beside her, and put the first card down in front of you.'),
    ]),
    o('card', 'Put the first card down before anybody speaks again', 'Let it speak for you.', [
      p('You say nothing at all. You walk to the middle of the table, and put the first card down on it, face up, and step back, and let them read.'),
    ]),
  ];
}

// ── The market ──

function marketBlocks(s: GameState): Block[] {
  return [
    p('Then you tell them what the Predator road taught you, which is what every one of them already knows and has never once had to hear said aloud in this room: that Meridian is a shop, and they are its customers, and its customers are also its stock.'),
    ...(isIn(s, 'halvorsen') ? [p('At the end of the table, Halvorsen clears his throat and says, loudly, to nobody in particular: “I bought twice. From that book. I should like the minutes to show that I am not buying tonight.”')] : []),
    ...(isIn(s, 'lucien') ? [p('Lucien Morel sits very still beside Halvorsen and looks, one at a time, at the three people at the table whose accounts he keeps. Each of them looks away first.')] : []),
    ...(isIn(s, 'iris') ? [p('Iris, at the end, touches her earring. Somebody at the table has just lied, silently, by nodding.')] : []),
    ...(isIn(s, 'marsh') ? [p('Owen Marsh takes notes, in pencil, in a school exercise book. They hate it.')] : []),
  ];
}

function marketChoices(s: GameState): C17Choice[] {
  const cards = cards16(s);
  const pr = (id: string, label: string, hint: string, body: Block[]) =>
    offer('press-' + id, label, hint, 'marcus', (x) => {
      setKey(x, 'act4.press', id);
      return [...body, q('Deverell', 'Celeste. Did we know?'), p('It is the first question he has asked all evening, and it is not to you.')];
    });
  return [
    pr('market', 'Name every client to the others', '“You each bought from this book. Now you each know who else did.”', [
      p('You name them. Not all of them: the ones at this table, and the ones they dine with. Who bought whom, when, for how much. You watch each of them learn, for the first time, what the man beside them paid for.'),
    ]),
    ...(cards.includes('clause') || cards.includes('flats')
      ? [
          pr('claim', 'Read them clause 14.3', '“You don’t own Meridian. It owns you.”', [
            p('You read them clause 14.3, from memory, and then from the page. The fund’s first claim on every client’s company, deal by deal, in the smallest type in the document, for eleven years.'),
            q('You', 'You don’t own Meridian. You never did. It owns you. Every one of you signed it, and not one of you read it.'),
          ]),
        ]
      : []),
    pr('cost', 'Name the people it cost', 'Delphine. Iris. Nell. The woman on page forty.', [
      p('You name the people it cost, one at a time, and let each name sit on the table for a moment before the next: a woman called Delphine who was a nurse in Leeds; Iris, four years; Eleanor Linden; a man called Adrian Vale, who is standing in front of them wearing somebody else’s name.'),
    ]),
  ];
}

// ── Marcus ──

function marcusBlocks(s: GameState): Block[] {
  return isIn(s, 'marcus')
    ? [
        p('Marcus stands up at the end of the table, in the good suit, and buttons the jacket, the way he did before a board, and speaks to Deverell, not to Celeste.'),
        q('Marcus Chen', 'I was bought in this room. I was twenty-nine. That chair, at the end. She wrote in my drawer that I was loyal to whoever was above me, and that I should be reviewed at forty-three. I was forty-three this spring. She sent me my review. It is standing next to you.'),
      ]
    : [
        p('Then you tell them about Marcus Chen, who is not in the room.'),
        q('You', key(s, 'pred.read15') === 'marcus' ? 'Page one of your oldest catalogue. Recruited at twenty-nine. Placed: Helix. “Review at forty-three.” I was the review. You wrote me into his drawer fourteen years before you met me.' : 'M. Chen. Client, eleven years. Transfers, three. The last one was me. And the one after me would have been his replacement.'),
      ];
}

function marcusChoices(): C17Choice[] {
  const m = (id: string, label: string, hint: string, body: Block[]) =>
    offer('marcus-' + id, label, hint, 'offer', (x) => {
      setKey(x, 'act4.marcus', id);
      return body;
    });
  return [
    m('vouch', 'Clear him', '“He was a product too.”', [q('You', 'He was a product too. Bought at twenty-nine, placed, reviewed. Whatever he did at Helix, he did from a drawer in this building.'), p('Deverell writes something down.')]),
    m('stand', 'Let him stand on his own record', 'Not an ally. Not an enemy.', [p('You say nothing more about him. Marcus Chen can stand on his own record, which is long, and mixed, and entirely his.')]),
    m('use', 'Make him the proof', 'The client who pledged his own company. True, and cold.', [
      q('You', 'And this is what your clients do for you. Marcus Chen pledged his own company to this fund, deal by deal, for eleven years, and never read a word of it. He is the proof. He is what this shop makes of the people who buy from it.'),
      t('True. Cold. It will cost him the last of his name. It moves the room.'),
    ]),
  ];
}

// ── The offer ──

function offerBlocks(s: GameState): Block[] {
  return [
    p('Celeste lets them talk among themselves for a minute, the way you let a room settle after a fall, and then she stands, and walks round the table, and puts one hand on the back of the seventh chair.'),
    q('Celeste', 'Darling. You understand the shop better than anybody at this table. You have been every part of it: the stock, the buyer, the operator, the thief. Sit with us. Nobody would ever place you again. You would do the placing.'),
    p('Nobody at the table says anything. You can see, in their faces, that half of them would vote for it now, this minute, to make the evening stop.'),
    ...(key(s, 'act4.aim') === 'seat' ? [t('This is what I came for. It is being offered to me by the one person who knows exactly what it costs. I should like to know why that frightens me more than the thought of refusing it.')] : [t('The chair. Offered, in front of all of them, as if it were a gift and not a price. Everything I did this year was to not be what sits in it.')]),
  ];
}

function offerChoices(s: GameState): C17Choice[] {
  const held = key(s, 'act4.held') as Card | 'none' | undefined;
  const hasHeld = held && held !== 'none';
  const a = (id: string, label: string, hint: string, body: Block[]) =>
    offer('offer-' + id, label, hint, 'eleanor', (x) => {
      setKey(x, 'act4.offer', id);
      setKey(x, 'act4.held-landed', held ?? 'none');
      note(x, 'p17-offer', `At the Meridian board, Celeste Laurent offered Evelynn her seat. Evelynn ${id === 'accept' ? 'accepted' : id === 'refuse' ? 'refused' : 'laughed, and refused'}.`, 'The long room, the Vesper');
      return body;
    });
  return [
    a('accept', '“Yes.”', 'Sit with them. Run the table. The held card becomes your price.', [
      q('You', 'Yes.'),
      p(key(s, 'act4.open') === 'chair' ? 'You are already sitting in it. You have been since six o’clock. You look at her, and she understands that you have been deciding the terms since six o’clock too.' : 'You walk round the table and sit down in the seventh chair, beside her, and it is exactly as comfortable as you knew it would be.'),
      ...(hasHeld ? [q('You', `On one condition, which is my first act as one of you: ${heldPrice[held as Card]}.`), q('Celeste', 'Of course. You see? You are already better at this than I was.')] : [q('Celeste', 'No conditions? Oh, darling. That is the first mistake you have made all year. I shall treasure it.')]),
    ]),
    a('refuse', '“I didn’t come for a chair.”', 'The held card lands as a blow.', [
      q('You', 'I didn’t come for a chair.'),
      ...(hasHeld ? [p(heldBlow[held as Card])] : [p('You put your hands flat on the table, empty, and look at each of them in turn. “I’m still here. That’s all I brought. It turns out to be enough.”')]),
    ]),
    a('laugh', 'Laugh', 'The real laugh. Then the card, harder.', [
      p('You laugh. The real laugh, the one that came out of you in Marcus’s office the day you said “Yours”: surprised, and delighted, and entirely without fear. Nobody at that table has ever heard anybody laugh at Celeste Laurent. Celeste, for one second, laughs too.'),
      ...(hasHeld ? [p(heldBlow[held as Card]), t('Harder, for the laugh. They will remember the laugh longer than the card.')] : [p('You put your hands flat on the table, empty. “I’m still here.”')]),
    ]),
  ];
}

// ── Eleanor ──

function eleanorBlocks(s: GameState): Block[] {
  return [
    p('Celeste goes back to her place, and does not sit, and stands behind her chair with both hands on it.'),
    p('For a while she talks about Nell, as if the board were not there: the balcony every night; a woman who could make a room of liars tell the truth by the fish course; Lisbon; the orchids, which Nell hated.'),
    ...(key(s, 'pred.phoneN') ? [q('Celeste', 'You carried her phone, you know. You’ll have seen the N. She scratched it there with a hairpin in a hotel in Jakarta, the week before. I never had it wiped.')] : []),
    ...(key(s, 'pred.watch') ? [q('Celeste', 'And that is her watch. On your wrist. She never wound it. I used to wind it for her, at breakfast.')] : []),
    p('Then, because she is Celeste, and has decided that if it is going to be said it will be said by her, and properly, she tells the rest.'),
    q('Celeste', 'The Jakarta order was mine. She was leaving us, and nobody leaves. I signed it. I would sign it again.'),
    q('Celeste', 'On the Saturday I sent a car. To take her to her sister’s. To bring her home, if you like. She would not get into it. She walked, along the harbour wall, in the dark, with the leg. The driver followed her at walking pace for a mile. He watched her fall. He did not stop.'),
    q('Celeste', 'He rang me at six. I rang her sister at seven. I have never known why I did that.'),
    ...(isIn(s, 'nora') ? [p('Behind you, Nora makes no sound at all. You hear her not make it.')] : []),
    t('Not a push. A signature, and a car, and a man who didn’t stop. The truth, and not the whole of anybody’s guilt.'),
  ];
}

function eleanorChoices(s: GameState): C17Choice[] {
  const name = (id: string, label: string, hint: string, body: Block[]) =>
    offer('named-' + id, label, hint, 'hands', (x) => {
      setKey(x, 'act4.named', id);
      const said = nellSaid17p(x);
      setKey(x, 'act4.nell-said', said);
      return [
        ...body,
        ...(said === 'eleanor'
          ? [q('Celeste', 'Eleanor. Her name was Eleanor Linden.'), p('She says it quietly, and exactly, the way you would put something down you had been carrying for a long time. Somebody at the table writes it down.')]
          : [q('Celeste', 'Evie. She was always Evie to me.'), p('Not the name. The legend’s name. You watch her choose it, and you understand that it is the one thing she is going to keep.')]),
      ];
    });
  return [
    name('ask', 'Ask her to say it', 'Her real name. In front of them.', [q('You', 'Say her name. Not the one you gave her. Hers.')]),
    ...(isIn(s, 'nora')
      ? [name('nora', 'Let Nora answer', 'She puts the photograph on the table.', [p('Nora stands, and walks to the table, and puts the photograph down, face up, in front of Celeste: Nell on the harbour wall at night, laughing, in flat shoes. Then she goes back to her chair, and says nothing, and does not stop looking.')])]
      : []),
    name('wait', 'Say nothing, and wait', 'The way Adrian learned to.', [p('You say nothing. You wait, the way Adrian learned to, until the other person cannot bear it. The clock behind the frames. The river outside. Nobody at the table moves.')]),
  ];
}

// ── The hands ──

const aimTerms: Record<string, string> = {
  wound: 'the minutes will record, by name, every client at this table and what each of them bought, and a copy will go to each of them, so that none of them can ever again pretend to another that they did not know',
  helix: 'clause 14.3 is struck from every agreement this fund has signed with Helix, the fund’s money is repaid over five years, and the letterhead is gone from every Helix file by Monday',
  nell: 'Eleanor Linden’s file is released to her sister, entire, with the pages that were taken out of it',
  seat: 'nothing at all, because she came for the chair and turned it down, and the board does not know what to give a woman who has refused the only thing it had to offer',
};

function handsBlocks(s: GameState): Block[] {
  const { board, terms } = board17p(s);
  return [
    p('Deverell stands. He does not look at Celeste.'),
    q('Deverell', 'This board will be seen to have acted. Tonight. I move that we do so.'),
    ...(board === 'succeeded'
      ? [
          q('Deverell', 'I move that Madame Laurent’s resignation from this board be accepted, with the board’s thanks, and that Ms Vale take her seat.'),
          p('The hands go up. All of them. Not quickly, but all of them, and you count them the way you counted the hands at Helix when Marcus fell, and every hand in the air is somebody who is now afraid of you.'),
          p('Celeste does not argue. She stands, and pulls the seventh chair out a little further for you, the way you would for a guest, and walks the length of the table to the end, where the clients sit, and sits down there, and crosses her legs, and smiles.'),
          t('Her chair. Her table. Her board. Mine. I have been climbing toward this since the first morning, and it is exactly as high as I thought, and much colder.'),
        ]
      : board === 'resigned'
        ? [
            p('It takes eleven minutes. Nobody raises their voice. At the end of it Marguerite Soames reads out that Madame Laurent has offered her resignation from the board, effective immediately, and that the board has accepted it with regret. The seventh chair stays where it is, pulled out, empty.'),
            q('Deverell', 'And you, Ms Vale. What does Meridian owe you?'),
            p(`You tell him. He writes it down himself, in fountain pen: ${aimTerms[key(s, 'act4.aim') ?? 'wound']}. He signs it. Soames signs it. It is not justice. It is a piece of paper with signatures on it, which is exactly what they used to sell you, and it is yours.`),
            t('Wounded. Not toppled. Nobody topples them. But she is not on this board tonight, and the chair beside hers is empty, and I left it that way.'),
          ]
        : board === 'diminished'
          ? [
              p('It takes twenty minutes, and it is uglier. Celeste keeps her seat and loses the room: Soames, not Celeste, will speak for the board on anything to do with Helix, or with you.'),
              p(terms === 'partial' ? `Some of what you asked for, they give: ${aimTerms[key(s, 'act4.aim') ?? 'wound']}, “in principle”. The rest, Deverell says, the board will consider, and you both know the switch is the only reason it will.` : 'The rest, Deverell says, the board will consider.'),
              t('A crack, not a fall. She sits at her own table with her hands in her lap, and somebody else speaks for her.'),
            ]
          : [
              p('It takes four minutes. The board closes ranks, the way boards do: no motion, no minute, nothing written down. Deverell thanks you for your time.'),
              p('Celeste keeps her seat. She knows it will not last. But tonight, with what you brought, they can still pretend.'),
              t('Thin. I knew it would be. I walk out with everything I walked in with, and the switch, and the slow road. They have not beaten me. They have only not lost yet.'),
            ]),
    p('Then they file out, past the empty frames, not looking at each other.'),
    p('And then there are two of you in the long room, under twenty gilt frames of nothing, and the river going by outside at the foot of the embankment.'),
    q('Celeste', board === 'succeeded' ? 'Now you will find out what I liked. Tell me one thing first. Did you ever like being her?' : 'Tell me one thing, and then you can go. Did you ever like being her?'),
    p('She holds out a white orchid.'),
  ];
}

function handsChoices(s: GameState): C17Choice[] {
  const l = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('last-' + id, label, hint, 'minute', (x) => {
      setKey(x, 'act4.last', id);
      const { board, terms } = board17p(x);
      setKey(x, 'act4.board', board);
      setKey(x, 'act4.terms', terms);
      after?.(x);
      note(x, 'p17-board', `The Meridian board: ${board === 'succeeded' ? 'Celeste Laurent resigned, and Evelynn took her seat' : board === 'resigned' ? 'Celeste Laurent resigned her seat' : board === 'diminished' ? 'Celeste Laurent kept her seat and lost the room' : 'the board closed ranks'}. Terms: ${terms}.`, 'The minutes, such as they are');
      return body;
    });
  const keyAt = key(s, 'pred.key16');
  return [
    l('yes', '“Yes.”', 'More than you ever liked being him.', [q('You', 'Yes. More than I ever liked being him.'), q('Celeste', 'I know. I watched you. It was the loveliest thing I ever made.')]),
    l('no', '“I liked being me.”', 'It took a long time to find out who that was.', [q('You', 'I liked being me. It took me a long time to find out who that was.'), q('Celeste', 'Then I made something I could not keep. That has only ever happened once before.')]),
    l('orchid', 'Take the orchid, and put it in the water jug', 'Leave it on the board table.', [p('You take the orchid from her, and put it in the water jug on the board table, where the six of them left it, and leave it there, white, among the glasses.')]),
    ...(keyAt === 'throat' || keyAt === 'pocket'
      ? [
          l('key', 'Lay her key on the table between you', 'On its ribbon. Or keep it.', [
            p(`You take ${key(s, 'pred.way15') === 'copy' ? 'the copy of her key' : 'her key'} ${keyAt === 'throat' ? 'from your throat' : 'from your pocket'} and lay it on the table between you, on its ribbon, and neither of you picks it up.`),
            q('Celeste', accepted(s) ? 'Keep it, darling. It’s yours now. Everything it opens is yours.' : 'I never had it copied, you know. I never needed to. I suppose I shall have to change the lock.'),
          ], (x) => setKey(x, 'pred.key17', 'returned')),
        ]
      : []),
  ];
}

// ── The minute ──

function minuteBlocks(s: GameState): Block[] {
  return accepted(s)
    ? [
        p('Celeste goes, at last, by the front door, and the doorman opens it for her, the way he always has, and she does not look back.'),
        p('You sit alone at the head of the table in the long room, under the empty frames, with the client ledger open in front of you, and the lamp on over the lectern, and the river going by.'),
        t('I did not walk out of the Vesper. I stayed. Somebody else opened the door for her, and I let them.'),
      ]
    : [
        p('You go down the long room, past the empty frames, and out into the hall, and the doorman is not at the door. For the first time, nobody is.'),
        t('I walked out of the Vesper by the front door, and nobody opened it for me. I opened it myself.'),
      ];
}

export function predatorBlocks17(s: GameState): Block[] {
  if (s.phase === 'sit') return sitBlocks(s);
  if (s.phase === 'market') return marketBlocks(s);
  if (s.phase === 'marcus') return marcusBlocks(s);
  if (s.phase === 'offer') return offerBlocks(s);
  if (s.phase === 'eleanor') return eleanorBlocks(s);
  if (s.phase === 'hands') return handsBlocks(s);
  if (s.phase === 'minute') return minuteBlocks(s);
  return [];
}

export function predatorChoices17(s: GameState): C17Choice[] {
  if (s.phase === 'sit') return sitChoices(s);
  if (s.phase === 'market') return marketChoices(s);
  if (s.phase === 'marcus') return marcusChoices();
  if (s.phase === 'offer') return offerChoices(s);
  if (s.phase === 'eleanor') return eleanorChoices(s);
  if (s.phase === 'hands') return handsChoices(s);
  return [];
}

