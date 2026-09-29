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
 * in-development stop, having written the shared act4.* keys for Ch17. Choice ids carry `x17-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';

type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
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
  ];
}

function productChoices(): C17Choice[] {
  const o = (id: 'room' | 'celeste' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('x17-open-' + id, label, hint, 'clause', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, p(firstLands[key(x, 'act4.first') ?? 'page'] ?? firstLands.page)];
    });
  return [
    o('room', 'Speak to the board', '“I’m the product. I’d like to read you the warranty.”', [q('You', 'I’m the product. I’d like to read you the warranty.')]),
    o('celeste', 'Speak only to her', 'And make the board listen in.', [q('You', 'You told me once you keep everything. So do I, now. Shall we go through it?')]),
    o('silent', 'Say nothing', 'Put the first card down and let it speak.', [p('You say nothing at all. You put the first card on the table, square it to the edge, and sit back.')]),
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

function giftBlocks(s: GameState): Block[] {
  return [
    p('Celeste waits for the room to be quiet. Then she makes her last move, and it is the best she has ever made: not a threat. There is nothing left to threaten with. A gift.'),
    q('Celeste Laurent', 'Sit with us, darling, and Helix is released tonight. 14.3 struck from every deal. Julian keeps his chair. You can have everything you came for, as a present. All you have to do is stay.'),
    p('The board, frightened, is half ready to agree. It is everything you came for, handed to you by the one person who owns you.'),
    ...(julianIn(s)
      ? [q('Julian Mercer', 'Whatever you choose, don’t choose it for me. I’m not the reason.')]
      : [p('In your pocket your phone buzzes once. You know who it is without looking. Don’t choose it for me.')]),
  ];
}

function giftChoices(): C17Choice[] {
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
  ];
}

function tallyChoices(): C17Choice[] {
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
    q('Celeste Laurent', 'Did you ever like being her?'),
    p('She holds out a white orchid, from nowhere, the way she always does.'),
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
    p('[Chapter 18 · executive road — in development]'),
  ];
}

export function executiveBlocks17(s: GameState): Block[] {
  if (s.phase === 'product') return productBlocks(s);
  if (s.phase === 'clause') return clauseBlocks(s);
  if (s.phase === 'officer') return officerBlocks(s);
  if (s.phase === 'gift') return giftBlocks(s);
  if (s.phase === 'wall') return wallBlocks();
  if (s.phase === 'tally') return tallyBlocks(s);
  if (s.phase === 'alone') return aloneBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices17(s: GameState): C17Choice[] {
  if (s.phase === 'product') return productChoices();
  if (s.phase === 'clause') return clauseChoices(s);
  if (s.phase === 'officer') return officerChoices();
  if (s.phase === 'gift') return giftChoices();
  if (s.phase === 'wall') return wallChoices(s);
  if (s.phase === 'tally') return tallyChoices();
  if (s.phase === 'alone') return aloneChoices();
  return [];
}
