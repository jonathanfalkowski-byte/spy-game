/** Chapter 17 (Executive route, lane id `executive`) · Collateral:
 * product → clause → officer (only with Sloane or her file) → gift → wall → tally → alone → complete.
 * Design: docs/story/EXECUTIVE_CHAPTER_17_COLLATERAL_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_17_SCRIPT.md. The shared room ("The Room") in Executive
 * framing: one hour at Meridian's board table. Celeste introduces the exhibit and reads the dress; the first card lands.
 * The defect beat becomes clause 14.3, read into the minutes by Julian if he is inside ("Did we know about 14.3?"); how
 * she presses (the clause / the Collateral card, kept, in his pocket, or from memory / the cost). Sloane (vouch / stand /
 * use) only if she or her file is in the room. Celeste's last move is the term itself as a gift, if she stays: refuse /
 * draw / laugh, with Julian's one line, "Don't choose it for me. I'm not the reason.", and then the held card lands. Nell,
 * told not shown, as canon (the order; the car; the harbour wall; responsibility, not a push): ask / Nora / wait. The
 * board decides (resigned / diminished / closed) from the case and who is in the room, and the aim becomes terms (full /
 * partial / none). One minute alone: "Did you ever like being her?"; "He survived us." Nothing sexual on screen; the offer
 * is refusable at no cost; Julian is never a trap. Entered from an Executive `chapter16.complete`; ends at a Chapter 18
 * in-development stop, having written the shared act4.* keys for Ch17. Choice ids carry `x17-`.
 * Deepening pass (2026-09-29): three moments, each with a neutral pick. Where she sits, before she opens (c17.x-chair =
 * foot | beside | stand: the full length of the table from Celeste; the chair at Celeste's right, close enough for
 * tuberose; or on her feet); Deverell's five-minute recess before the gift (c17.x-recess = celeste | julian | table:
 * Celeste follows her into the corridor, attention and nothing touched; Julian, if he is inside, and the clasp he
 * fastened that afternoon; or neither woman moves from the table); and the minute brought in for signing, with Celeste's
 * good pen (c17.x-pen = julian | sign | leave: "Read it first."; her own name, in her own hand; or the board's). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';

type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get17 = (s: GameState, k: string) => s.choices['c17.' + k];
const set17 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c17.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C17Choice['apply']): C17Choice => ({ id: 'chapter17.' + id, label, hint, next, apply });

export const EXECUTIVE_PHASES17 = ['product', 'clause', 'officer', 'gift', 'wall', 'tally', 'alone'] as const;
export const isExecutive17 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase17 = (s: GameState) => isExecutive17(s) && ((EXECUTIVE_PHASES17 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const inside = (s: GameState) => (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
const julianIn = (s: GameState) => inside(s).includes('julian');
const aim = (s: GameState) => key(s, 'act4.aim') as 'term' | 'exit' | 'spent' | 'nell' | undefined;
const sloaneHere = (s: GameState) => inside(s).includes('sloane') || !!key(s, 'exec.sloane-file');
const noraIn = (s: GameState) => inside(s).includes('nora');
const caseScore = (s: GameState) => ({ thin: 0, supported: 1, strong: 2, overwhelming: 3 })[key(s, 'act4.case') as 'thin'] ?? 0;

/** What the board does, read from what is on the table and who is in the room (design §4): the case, plus Julian at the
 * table (as Helix or as a witness), plus Celeste's gift priced aloud in her own words. Meridian always stands. */
export function board17x(s: GameState): { board: 'resigned' | 'diminished' | 'closed'; terms: 'full' | 'partial' | 'none' } {
  const pts = caseScore(s) + (julianIn(s) ? 1 : 0) + (key(s, 'act4.offer') === 'draw' ? 1 : 0);
  return pts >= 2 ? { board: 'resigned', terms: 'full' } : pts >= 1 ? { board: 'diminished', terms: 'partial' } : { board: 'closed', terms: 'none' };
}

// ── The entry ──

export function beginExecutive17(): C17Choice {
  return offer('begin-executive', 'The room', 'Six people, one hour, and Celeste standing.', 'product');
}

// ── The product ──

const firstLands: Record<string, string> = {
  julian: 'MERCER, J. goes down first: eleven signatures in a fan across the table, and on top of them a small card in a looping green hand. Deverell reads the top one upside down, and then turns it round.',
  nell: 'The Jakarta order goes down first: one sheet, a name given to the wrong people, and one initial. Deverell looks at Celeste for the first time since you came in.',
  cards: 'The 1109 cards go down first, in their little labelled envelopes, and the youngest of the three unnamed men goes white.',
  page: 'Page seven goes down first, folded, then unfolded: the missing page, back in the room it was torn from.',
};

function productBlocks(s: GameState): Block[] {
  const wear = key(s, 'act4.wear');
  return [
    p('Celeste speaks first, of course: to the board, warmly, about the product. The reissue, performing beyond forecast. The public profile. The characteristic “which we priced in, as you will recall, Anton.” She introduces you to the table by your catalogue number.'),
    q('Celeste Laurent', wear === 'his' ? 'His dress. You kept it.' : wear === 'grey' ? 'Iris’s grey. How very loyal.' : 'Black. You did dare.'),
    p('She says it to the table, not to you, the way an auctioneer reads a provenance: pleasantly, for the record, so that everybody present can see what they are being asked to value. Soames writes something down. The heavy man in the middle looks at your shoes.'),
    p('There are seven chairs and six people. The seventh is at the foot of the table, the full length of it from Celeste, with a water glass already poured. And Celeste, still standing, rests one hand on the back of the empty chair at her own right, and smiles, and waits to see which you take.'),
  ];
}

function chairChoices(): C17Choice[] {
  const c = (id: 'foot' | 'beside' | 'stand', label: string, hint: string, body: Block[]) =>
    offer('x17-chair-' + id, label, hint, 'product', (x) => {
      set17(x, 'x-chair', id);
      return body;
    });
  return [
    c('foot', 'Take the chair at the foot', 'The full length of the table from her.', [
      p('You take the chair at the foot, the one they set for you, and move the water glass an inch to the left, because it was put there for you, and sit down across the whole length of the table from her, like the other side of a negotiation.'),
      q('Celeste Laurent', 'Opposite. Of course. You always did like to be looked at from a distance.'),
    ]),
    c('beside', 'Take the chair at her right', 'Close enough to smell the tuberose.', [
      p('You walk the length of the table, past Deverell, past Soames and the three men with no names, and take the chair at her right, and she sits down beside you as if it had been her idea.'),
      p('Close enough for tuberose, the same scent for twelve years. Close enough to see the powder at the corner of her mouth and the one grey hair she has let stay. She looks at you the way she looked at you the first time, in a room with better light: slowly, all of you, pricing it. You look back the same way, and for the first time in your life she looks away first.'),
      q('Celeste Laurent', 'Darling. How brave.'),
    ]),
    c('stand', 'Stay on your feet', 'Let her be the one who sits.', [
      p('You do not sit. You stand behind the chair at the foot with your hands on its back, and after a moment Celeste, who has stood in this room for twenty years while other people sat, sits down.'),
    ]),
  ];
}

function productChoices(s: GameState): C17Choice[] {
  if (!get17(s, 'x-chair')) return chairChoices();
  const o = (id: 'room' | 'celeste' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('x17-open-' + id, label, hint, 'clause', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, p(firstLands[key(x, 'act4.first') ?? 'page'] ?? firstLands.page)];
    });
  return [
    o('room', 'Speak to the board', '“I’m the product. I’d like to read you the warranty.”', [q('You', 'I’m the product. I’d like to read you the warranty.')]),
    o('celeste', 'Speak only to her', 'And make the board listen in.', [q('You', 'You told me once you keep everything. So do I, now. Shall we go through it?')]),
    o('silent', 'Say nothing', 'Put the first card down and let it speak.', [p(key(s, 'c17.x-chair') === 'stand' ? 'You say nothing at all. You put the first card on the table, square it to the edge, and straighten, and wait.' : 'You say nothing at all. You put the first card on the table, square it to the edge, and sit back.')]),
  ];
}

// ── The clause ──

function clauseBlocks(s: GameState): Block[] {
  const role = key(s, 'act4.julian');
  return [
    ...(julianIn(s)
      ? [
          p(role === 'helix' ? 'From the chair marked HELIX GROUP, Julian Mercer stands up, puts his glasses on, and takes eleven pages out of a folder.' : 'Julian Mercer stands up at the end of the table, a man with no company behind him and eleven pages in his hand.'),
          q('Julian Mercer', key(s, 'c16.x-dawn') === 'julian' ? 'I signed eleven things I didn’t read, and I would like the board to watch me read them now.' : 'I signed these without reading them. I’d like to read them now, into your minutes, if the chair will allow.'),
          p('And he reads clause 14.3, eleven times, slowly, in the voice of a man learning something by heart. Nobody stops him.'),
        ]
      : [p('You read clause 14.3 into the minutes yourself, from page thirty-one, in his name: the fund takes first charge on the assets of the company it finances. You read it once, slowly, and then again.')]),
    p('Anton Deverell does not look at you. He looks at Celeste.'),
    q('Anton Deverell', 'Did we know about 14.3?'),
    q('Celeste Laurent', 'Of course we knew, Anton. You initialled the template. You said it was elegant.'),
    p('Deverell’s face does something slow and unhappy, the face of a man remembering a lunch. Soames takes her glasses off, and cleans them, and puts them back on, and looks at the chairman instead of the product for the rest of the hour.'),
  ];
}

function clauseChoices(s: GameState): C17Choice[] {
  const cardj = key(s, 'c15.x-cardj');
  const next = sloaneHere(s) ? 'officer' : 'gift';
  const pr = (id: 'clause' | 'collateral' | 'cost', label: string, hint: string, body: Block[]) =>
    offer('x17-press-' + id, label, hint, next, (x) => {
      setKey(x, 'act4.press', id);
      return body;
    });
  return [
    pr('clause', 'The clause', 'Every chair at this table has signed one somewhere.', [q('You', 'Every one of you has a 14.3 somewhere. The fund takes first charge on the companies it finances. You don’t own Meridian. It owns you.'), p('Marguerite Soames puts her glasses on.')]),
    pr('collateral', 'The card', 'Her own words about him.', [
      ...(cardj === 'give'
        ? [p('Julian takes the card out of his inside pocket himself and puts it on the table face up.')]
        : cardj === 'burn'
          ? [q('You', 'I burned it. But I remember every word.')]
          : [p('You put the small card on the table, face up, beside the eleven pages.')]),
      q('You', '“Collateral, in the person of J.M. Kind. Will not survive us.” Her hand. Her words. About a man she has watched for eleven years.'),
      ...(julianIn(s) ? [p('Julian, very quietly, to the table: “She’s right about the first part.”')] : []),
    ]),
    pr('cost', 'The cost', 'The people.', [q('You', 'Clare Adeyemi, who walked. Eleanor Linden, who fell. Iris Moreau, who is ending. Owen Marsh, who cycles to work. And the man who signed. That is what 14.3 costs.')]),
  ];
}

// ── The officer ──

function officerBlocks(s: GameState): Block[] {
  return inside(s).includes('sloane')
    ? [p('Sloane stands, in the shirt she ironed this morning, and says it the way she once briefed rooms: the file, the assessment attached, her objection in writing, “priced in”, and the officer of record who takes the blame.')]
    : [p('Sloane’s file on the table, the Axiom crest, and inside it her objection, in writing, dated, ignored. Celeste, lightly: “Poor Victoria. She always did want to be the one who was right.”')];
}

function officerChoices(): C17Choice[] {
  const o = (id: 'vouch' | 'stand' | 'use', label: string, hint: string, body: Block[]) =>
    offer('x17-sloane-' + id, label, hint, 'gift', (x) => {
      setKey(x, 'act4.sloane', id);
      return body;
    });
  return [
    o('vouch', '“She raised it. You buried it.”', 'Clear her, in front of the people who can.', [q('You', 'She raised it. You buried it.')]),
    o('stand', 'Let her stand on her own record', 'Not an ally. Not an enemy.', [p('You say nothing for her or against her, and let her record stand on the table where everybody can read it.')]),
    o('use', 'Make her the proof', 'True, and cold.', [q('You', 'She delivered a product she knew was defective. So did you. The difference is that she wrote it down.'), p('Sloane looks at you for a long moment, and nods, once, as if a debt had been called in and paid.')]),
  ];
}

// ── The gift ──

const heldLands: Record<string, Block[]> = {
  julian: [p('Then MERCER, J., the last card, from your pocket: the eleven signatures, and her card on top.'), q('You', 'Kind. Will not survive us. He survived.')],
  nell: [p('Then, from your pocket, one sheet: the Jakarta order, a name given to the wrong people, and one initial. C.')],
  cards: [p('Then, from your pocket, the 1109 cards, and you fan them on the table like a hand of patience.'), q('You', 'Every client at this table is on one.')],
  page: [p('Then page seven, from your pocket, unfolded and laid flat, the missing page back in the room.')],
  none: [p('You have nothing in your pocket. You put your hands flat on the table instead.'), q('You', 'I’m still here.')],
};

function giftBlocks(): Block[] {
  return [
    p('Deverell takes his glasses off and puts them on the table, and says, to nobody, that the board will take five minutes. Chairs go back. The three men with no names go out together to the corridor to make telephone calls they will not describe to their wives.'),
    t('Five minutes. She will use them. So will I.'),
  ];
}

function recessChoices(s: GameState): C17Choice[] {
  const r = (id: 'celeste' | 'julian' | 'table', label: string, hint: string, body: Block[]) =>
    offer('x17-recess-' + id, label, hint, 'gift', (x) => {
      set17(x, 'x-recess', id);
      return [...body, ...offerBlocks(x)];
    });
  return [
    r('celeste', 'Go out to the corridor', 'She will follow. She always did.', [
      p('You go out into the corridor, to the tall black window at the end of it, and she follows, as you knew she would, and stands beside you, a hand’s width away, not touching, the two of you in the glass like one woman and her reflection twelve years apart.'),
      q('Celeste Laurent', 'You’ve learned to stand still. I taught you that.'),
      q('You', 'You taught me to be looked at. I taught myself to look back.'),
      p('She does look, then: your mouth, your throat, the pulse there, your eyes, the long appraising look she has given a hundred girls on a hundred first evenings, and you let her, and give it back, and it is the most intimate thing that has ever passed between you, and neither of you moves an inch.'),
      q('Celeste Laurent', 'He’ll bore you inside a year.'),
      q('You', 'Then I’ll have been bored by somebody kind. You should try it.'),
    ]),
    ...(julianIn(s)
      ? [
          r('julian', 'Find Julian by the window', 'Five minutes. His.', [
            p('Julian is at the window on the landing with his glasses in his hand, looking at the river as if it had been explained to him badly.'),
            ...(key(s, 'act4.dressed-with') === 'julian'
              ? [p('Without a word he turns you by the shoulder, gently, and finds the clasp at the nape of your neck, the one he fastened at four, which has come loose, and does it up again, his fingers cold and steady against your skin, and leaves his hand there one second longer than the clasp needs.'), q('Julian Mercer', 'Come back.'), q('You', 'I’m only in the next room.')]
              : [p('He does not say anything clever. He puts his hand flat at the small of your back, once, the way you steady somebody on a boat, and takes it away.'), q('Julian Mercer', 'You’re doing it.'), q('You', 'We are.')]),
          ]),
        ]
      : []),
    r('table', 'Stay at the table', 'Neither of you gets up.', [
      p('You stay where you are. So does Celeste. For five minutes the two of you are the only people in the long room, not speaking, the water jug between you, while the empty frames look down and the river goes by in the black glass. She pours herself a glass of water, and then, after a moment, one for you, and slides it the length of the table, and you let it stand there untouched until the board comes back.'),
    ]),
  ];
}

function offerBlocks(s: GameState): Block[] {
  return [
    p('The board comes back in. Celeste waits for the room to be quiet. Then she makes her last move, and it is the best she has ever made: not a threat. There is nothing left to threaten with. A gift.'),
    q('Celeste Laurent', 'Sit with us, darling, and Helix is released tonight. 14.3 struck from every deal. Julian keeps his chair. You can have everything you came for, as a present. All you have to do is stay.'),
    p('The board, frightened, is half ready to agree. It is everything you came for, handed to you by the one person who owns you.'),
    ...(julianIn(s)
      ? [q('Julian Mercer', 'Whatever you choose, don’t choose it for me. I’m not the reason.')]
      : [p('In your pocket your phone buzzes once. You know who it is without looking. Don’t choose it for me.')]),
  ];
}

function giftChoices(s: GameState): C17Choice[] {
  if (!get17(s, 'x-recess')) return recessChoices(s);
  const g = (id: 'refuse' | 'draw' | 'laugh', label: string, hint: string, body: Block[]) =>
    offer('x17-gift-' + id, label, hint, 'wall', (x) => {
      setKey(x, 'act4.offer', id);
      const held = key(x, 'act4.held') ?? 'none';
      setKey(x, 'act4.held-landed', held);
      return [...body, ...(heldLands[held] ?? heldLands.none)];
    });
  return [
    g('refuse', '“I didn’t come for a present.”', '“I came to enforce a term.”', [q('You', 'I didn’t come for a present. I came to enforce a term.'), p('Something changes in the faces round the table.')]),
    g('draw', 'Let her go on', 'Long enough to hear what it costs somebody else.', [
      q('You', 'And what would it cost? Tell them.'),
      q('Celeste Laurent', 'Very little. Mr Marsh’s inquiry, closed. Sloane’s file, returned to us. And you, darling, at this table, forever.'),
      p('You let the board hear her say it. Deverell writes something down.'),
    ]),
    g('laugh', 'Laugh', 'The real laugh.', [p('You laugh: the real laugh, the one nobody in this room has ever heard from you, and it goes on long enough that Soames, of all people, smiles.')]),
  ];
}

// ── The wall ──

function wallBlocks(): Block[] {
  return [
    p('Then Celeste, across the table, and the board as witnesses, and the name the game has held open since Singapore.'),
    q('Celeste Laurent', 'The Jakarta order was mine. On the Saturday I sent a car to take her to her sister’s. To bring her home. She wouldn’t get into it. She walked the harbour wall in the dark with that leg, and the driver watched her fall, and didn’t stop. He rang me at six. I rang her sister at seven.'),
    t('Not a push. Worse and smaller. Responsibility. The truth, and not the whole of anyone’s guilt.'),
  ];
}

function wallChoices(s: GameState): C17Choice[] {
  const sc = caseScore(s);
  const n = (id: 'ask' | 'nora' | 'wait', label: string, hint: string, said: 'eleanor' | 'evie' | 'no', body: Block[]) =>
    offer('x17-named-' + id, label, hint, 'tally', (x) => {
      setKey(x, 'act4.named', id);
      setKey(x, 'act4.nell-said', said);
      return [...body, ...(said === 'eleanor' ? [q('Celeste Laurent', 'Eleanor.'), p('She says it to the table, not to you, and for a moment she is not the head of anything.')] : said === 'evie' ? [q('Celeste Laurent', 'Evie.'), p('The difference between the two names is the whole of the evening.')] : [p('She does not say it. The silence says it for her, and the board hears that too.')])];
    });
  return [
    n('ask', 'Ask her to say it', 'Her name. Her real one.', sc >= 1 ? 'eleanor' : 'evie', [q('You', 'Say her name.')]),
    ...(noraIn(s) ? [n('nora', 'Let Nora put the photograph down', 'Face up. Saying nothing.', 'eleanor', [p('Nora puts the photograph on the table, face up, Nell on the harbour wall in flat shoes, and says nothing at all.')])] : []),
    n('wait', 'Wait', 'As Adrian learned to.', sc >= 2 ? 'eleanor' : 'no', [p('You say nothing, and wait, as Adrian learned to wait across a table from people who had lied to him.')]),
  ];
}

// ── The tally ──

function tallyBlocks(s: GameState): Block[] {
  const b = board17x(s);
  const a = aim(s);
  const grant =
    b.board === 'closed'
      ? 'The board closes ranks. You walk out with what you carried in, and the switch armed, and the slow public road ahead of you. Still solvable. Costlier.'
      : a === 'term'
        ? b.terms === 'full'
          ? 'Clause 14.3 struck from every Helix facility, tonight, by resolution. Helix released.'
          : '14.3 struck from the next facility, not the last eleven. The rest held by the switch.'
        : a === 'exit'
          ? b.terms === 'full'
            ? 'A written undertaking: your name never placed again, and Helix no claim on you, ever.'
            : 'An undertaking, grudging, without the references. The rest held by the switch.'
          : a === 'spent'
            ? b.terms === 'full'
              ? 'Julian released from every signature, in exchange for everything you brought, which stays on the table and is theirs to bury.'
              : 'Julian released from the last signature and not the first ten, and what you brought kept, as a guarantee.'
            : 'The minute records her name. Eleanor Linden. For whatever a minute is worth.';
  return [
    p('Seven o’clock. Deverell moves, not to punish Celeste but to save Meridian: the firm must be seen to have acted.'),
    p(b.board === 'resigned' ? 'Celeste is asked to resign her seat, tonight, and does, standing, with her hands folded, as if accepting a small award.' : b.board === 'diminished' ? 'Celeste keeps her seat, and loses the room. She will not speak for this board again, and everybody at the table knows it, including her.' : 'Celeste keeps her seat, and knows it will not last.'),
    p(grant),
    p('Deverell’s secretary brings the minute in, one page, typed in the next room while you talked. And Celeste, without being asked, takes a pen out of her bag and lays it across the page: black and gold and heavy. A good pen.'),
    ...(key(s, 'exec.sign11') === 'signed' ? [t('The same pen. I carried it across this room to him once, with my hand on his shoulder, and watched him sign with it.')] : []),
  ];
}

function penChoices(s: GameState): C17Choice[] {
  const pn = (id: 'julian' | 'sign' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('x17-pen-' + id, label, hint, 'tally', (x) => {
      set17(x, 'x-pen', id);
      return body;
    });
  return [
    ...(julianIn(s)
      ? [
          pn('julian', 'Hand the pen to Julian', '“Read it first.”', [
            q('You', 'Read it first.'),
            p('He reads it. Then he reads it again, the whole page, slowly, with his glasses on, while the people who own a great deal of the world wait for him, and nobody hurries him, and he signs it at the bottom as a witness, in a hand that does not shake.'),
            q('Julian Mercer', 'I did. Twice.'),
          ]),
        ]
      : []),
    pn('sign', 'Sign it yourself', 'Your own name. Not the number.', [
      p('You take her pen, and sign as a witness at the bottom of the minute: not the catalogue number she introduced you by. Your own name, in your own hand, which has changed this year, and which Soames reads upside down, and nods at.'),
      p('Then you hand the good pen back to Celeste, cap first, the way she taught you to hand a gentleman anything sharp.'),
    ]),
    pn('leave', 'Let the board sign its own minute', 'Leave the pen where it lies.', [p('You leave the pen where it lies. It is their minute. Let them sign it, one after another, down the table, while you watch each of them read what they are signing, for once.')]),
  ];
}

function tallyChoices(s: GameState): C17Choice[] {
  if (!get17(s, 'x-pen')) return penChoices(s);
  return [
    offer('x17-tally-on', 'Let the board file out', 'One minute.', 'alone', (x) => {
      const b = board17x(x);
      setKey(x, 'act4.board', b.board);
      setKey(x, 'act4.terms', b.terms);
      return [];
    }),
  ];
}

// ── One minute ──

function aloneBlocks(): Block[] {
  return [
    p('The board files out. For one minute the two of you are alone in the long room under the empty frames.'),
    p('Celeste does not go to the window. She stays at the table, one hand on the back of a chair, and for a moment she looks her age, which nobody in this building has ever been allowed to see, and then she doesn’t.'),
    q('Celeste Laurent', 'Did you ever like being her?'),
    t('Her. The one in the catalogue. The one who laughed at his jokes in Singapore and wore what she was sent. The one Celeste made, out of a girl with good bones and nowhere to go.'),
    p('She holds out a white orchid, from nowhere, the way she always does, and it is only then that you see her hand is not quite steady.'),
    q('Celeste Laurent', 'He’s a lovely man. He survived us. I didn’t expect that.'),
  ];
}

function aloneChoices(): C17Choice[] {
  const l = (id: 'yes' | 'no' | 'orchid', label: string, hint: string, body: Block[]) =>
    offer('x17-last-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.last', id);
      return body;
    });
  return [
    l('yes', '“Yes. More than I ever liked being him.”', 'The truth.', [q('You', 'Yes. More than I ever liked being him.'), q('Celeste Laurent', 'I know, darling. That was always the trouble.')]),
    l('no', '“I liked being me.”', '“It took me a long time to find out who that was.”', [q('You', 'I liked being me. It took me a long time to find out who that was.'), q('Celeste Laurent', 'Then I did one thing right.')]),
    l('orchid', 'Take the orchid, and put it in the water jug', 'Leave it on the board table.', [p('You take the orchid and put it in the water jug on the board table, and leave it there, white, in the middle of the minutes.')]),
  ];
}

// ── The door ──

function completeBlocks(s: GameState): Block[] {
  const j = key(s, 'act4.julian');
  return [
    p('You walk out of the Vesper by the front door, and nobody opens it for you. You open it yourself.'),
    p(julianIn(s) ? 'Julian walks out beside you, not holding your arm, and on the steps he puts his glasses back in his pocket and breathes for what looks like the first time in a year.' : j === 'outside' ? 'Julian is at the kerb where he said he would be, with Hal and the engine running, and he does not ask anything. He opens the door.' : 'The Embankment, the river, the evening. Your phone, with one message on it, from him: Well?'),
    ...(import.meta.env.VITE_EVE_CHAPTER18 === '1' ? [] : [p('[Chapter 18 · executive road — in development]')]),
  ];
}

export function executiveBlocks17(s: GameState): Block[] {
  if (s.phase === 'product') return productBlocks(s);
  if (s.phase === 'clause') return clauseBlocks(s);
  if (s.phase === 'officer') return officerBlocks(s);
  if (s.phase === 'gift') return giftBlocks();
  if (s.phase === 'wall') return wallBlocks();
  if (s.phase === 'tally') return tallyBlocks(s);
  if (s.phase === 'alone') return aloneBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices17(s: GameState): C17Choice[] {
  if (s.phase === 'product') return productChoices(s);
  if (s.phase === 'clause') return clauseChoices(s);
  if (s.phase === 'officer') return officerChoices();
  if (s.phase === 'gift') return giftChoices(s);
  if (s.phase === 'wall') return wallChoices(s);
  if (s.phase === 'tally') return tallyChoices(s);
  if (s.phase === 'alone') return aloneChoices();
  return [];
}
