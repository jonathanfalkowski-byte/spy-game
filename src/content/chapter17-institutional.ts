/** Chapter 17 (Institutional route, lane id `institutional`) · Fit for Purpose:
 * exhibit → warranty → record (only with Sloane, her countersignature or Benton in the room) → leash → harbour → ruling →
 * aside → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_17_FIT_FOR_PURPOSE_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_17_SCRIPT.md. The shared room ("The Room") in
 * Institutional framing: a client returning a product. Celeste introduces the exhibit, E. V. (II), and reads her clothes;
 * the first card lands. The defect beat becomes a client's complaint, not fit for purpose: Sloane, if inside, "I was the
 * officer who took delivery of her. I'm here to return her." / "I declined."; or Maya reads the inquiry's finding; or
 * Evelynn reads it herself. "Did we know about 9C?" How she presses (the receipts / the forgery / the cost). The record:
 * Sloane (vouch / stand / use) and, if he walked her in, Benton (the empty box / let Celeste burn him / ignore him).
 * Celeste's last move is the leash as a gift, the officer's chair and 9C to hold: refuse / draw / laugh, with Sloane's one
 * line, "It was round my neck.", and then the held card lands. Nell, told not shown, as canon: ask / Nora / wait. The
 * board decides (resigned / diminished / closed) from the case, an officer, the inquiry or the regulator in the room, and
 * Celeste drawn out; the aim becomes terms. One minute alone: "Did you ever like being her?"; "Victoria survived us."
 * Nothing sexual on screen; Sloane is never a romance; the offer is refusable at no cost. Entered from an Institutional
 * `chapter16.complete`; ends at a Chapter 18 in-development stop, having written the shared act4.* keys for Ch17. Choice
 * ids carry `i17-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';

type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C17Choice['apply']): C17Choice => ({ id: 'chapter17.' + id, label, hint, next, apply });

export const INSTITUTIONAL_PHASES17 = ['exhibit', 'warranty', 'record', 'leash', 'harbour', 'ruling', 'aside'] as const;
export const isInstitutional17 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase17 = (s: GameState) => isInstitutional17(s) && ((INSTITUTIONAL_PHASES17 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const inside = (s: GameState) => (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
const isIn = (s: GameState, who: string) => inside(s).includes(who);
const aim = (s: GameState) => key(s, 'act4.aim') as 'inside' | 'channels' | 'walk' | 'nell' | undefined;
const sloaneBeat = (s: GameState) => isIn(s, 'sloane') || key(s, 'inst.pen11') === 'signed' || key(s, 'inst.way14') === 'proof';
const bentonHere = (s: GameState) => key(s, 'act4.benton') === 'escort';
const emptyBox = (s: GameState) => key(s, 'c8.i-dark') === 'torch';
const caseScore = (s: GameState) => ({ thin: 0, supported: 1, strong: 2, overwhelming: 3 })[key(s, 'act4.case') as 'thin'] ?? 0;
const recordNeeded = (s: GameState) => (sloaneBeat(s) && !key(s, 'act4.sloane')) || (bentonHere(s) && !key(s, 'act4.benton-beat'));

/** What the board does (design §4): the case, plus an officer of record, the inquiry or the regulator at the table, plus
 * Celeste's gift priced aloud in her own words. 3 or more resigns her, 1–2 diminishes her, 0 closes ranks (one higher
 * than the Executive road's bar, because this road's formal backing makes an officer in the room easy). Meridian stands. */
export function board17i(s: GameState): { board: 'resigned' | 'diminished' | 'closed'; terms: 'full' | 'partial' | 'none' } {
  const pts = caseScore(s) + (['sloane', 'maya', 'marsh'].some((w) => isIn(s, w)) ? 1 : 0) + (key(s, 'act4.offer') === 'draw' ? 1 : 0);
  return pts >= 3 ? { board: 'resigned', terms: 'full' } : pts >= 1 ? { board: 'diminished', terms: 'partial' } : { board: 'closed', terms: 'none' };
}

// ── The entry ──

export function beginInstitutional17(): C17Choice {
  return offer('begin-institutional', 'The room', 'Six people, one hour, and Celeste standing.', 'exhibit');
}

// ── The exhibit ──

const firstLands: Record<string, string> = {
  client: 'The client file goes down first: three years of receipts on cream paper, fanned across the walnut like a hand of cards, E. V. (II) · DELIVERED on top. Soames reaches for it before anybody else can.',
  nell: 'The Jakarta order goes down first: one sheet, a name given to the wrong people, and one initial. Deverell looks at Celeste for the first time since you came in.',
  cards: 'The 1109 cards go down first, in their little labelled envelopes, and the youngest of the three unnamed men goes white.',
  page: 'Page seven goes down first, folded, then unfolded: the missing page, back in the room it was torn from.',
  box: 'A photograph goes down first: a grey archive box on a Records shelf at Axiom, aisle nine, labelled PROJECT EVE (I), open, and empty but for the outline of a file in the dust.',
};

function exhibitBlocks(s: GameState): Block[] {
  const wear = key(s, 'act4.wear');
  return [
    p('Celeste speaks first, of course: to the board, warmly, about the product. The reissue, performing beyond forecast. The client, “a very old friend of the house, as you know, Anton.” She introduces you to the table by your catalogue number.'),
    q('Celeste Laurent', 'E. V. (II). Axiom’s, for the moment.'),
    q('Celeste Laurent', wear === 'lanyard' ? 'And a lanyard, worn like pearls. Victoria taught you that.' : wear === 'charcoal' ? 'Axiom’s charcoal. How very corporate of you.' : 'Black. You did dare.'),
    p('She says it to the table, not to you, the way an auctioneer reads a provenance: pleasantly, for the record, so that everybody present can see what they are being asked to value. Soames writes something down. The heavy man in the middle looks at your shoes.'),
    ...(key(s, 'act4.benton') === 'gone' ? [q('Anton Deverell', 'Where is Mr Benton? I understood Axiom would send Mr Benton.'), q('Celeste Laurent', 'Suspended, I’m told. So careless.')] : []),
  ];
}

function exhibitChoices(): C17Choice[] {
  const o = (id: 'room' | 'celeste' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('i17-open-' + id, label, hint, 'warranty', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, p(firstLands[key(x, 'act4.first') ?? 'page'] ?? firstLands.page)];
    });
  return [
    o('room', 'Speak to the board', '“I’m the product. I’ve come about the warranty.”', [q('You', 'I’m the product. I’ve come about the warranty.')]),
    o('celeste', 'Speak only to her', 'And make the board listen in.', [q('You', 'You told me once you keep everything. So does your client, it turns out. Shall we compare?')]),
    o('silent', 'Say nothing', 'Put the first card down and let it speak.', [p('You say nothing at all. You put the first card on the table, square it to the edge, and sit back.')]),
  ];
}

// ── The warranty ──

function warrantyBlocks(s: GameState): Block[] {
  return [
    ...(isIn(s, 'sloane')
      ? [
          p('From the chair marked AXIOM, CLIENT, Victoria Sloane stands up, in graphite, and puts a single sheet on the table: the ORACLE verdict, the two numbers, the board’s sign-off, and three signatures, one of them in green.'),
          q('Sloane', 'Axiom, as client, finds the product supplied under the Project Eve contract not fit for purpose. It was scored uncontrollable before it was sold to us, and it was sold to us anyway. I was the officer who took delivery of her. I’m here to return her.'),
          q('You', 'I declined.'),
          p('Somebody at the table laughs, once, and turns it into a cough. It is Soames.'),
        ]
      : isIn(s, 'maya')
        ? [
            p('Maya opens the inquiry’s bundle on Meridian’s walnut, tabs in three colours, and reads the finding aloud in the voice she uses for people who have signed things they should not have: that the product was scored uncontrollable before it was sold, that the vendor knew, and that the client was not told.'),
            q('Maya', 'Not fit for purpose. That is the finding. I have brought copies. I always bring copies.'),
          ]
        : [p('You read it yourself, from the ORACLE verdict, the two numbers and the board’s sign-off: scored uncontrollable before it was sold, and sold anyway. Not fit for purpose. You read it the way Adrian read findings to rooms that did not want them, once, slowly, and then again.')]),
    p('Anton Deverell does not look at you. He looks at Celeste, and then at the client file, and the last receipt in it.'),
    q('Anton Deverell', 'Did we know about 9C?'),
    q('Celeste Laurent', 'Of course we knew, Anton. It’s in the schedule. You said the pipeline was the best thing about the account.'),
    p('Deverell’s face does something slow and unhappy, the face of a man remembering a lunch. Soames takes her glasses off, and cleans them, and puts them back on, and looks at the chairman instead of the product for the rest of the hour.'),
  ];
}

function warrantyChoices(s: GameState): C17Choice[] {
  const proof = key(s, 'inst.channel13') === 'sloane' || ['copy', 'note'].includes(key(s, 'inst.file') ?? '');
  const pr = (id: 'receipts' | 'forgery' | 'cost', label: string, hint: string, body: Block[]) =>
    offer('i17-press-' + id, label, hint, recordNeeded(s) ? 'record' : 'leash', (x) => {
      setKey(x, 'act4.press', id);
      return body;
    });
  return [
    pr('receipts', 'The receipts', 'Every one of them a person from a client’s own floor.', [q('You', 'E. V. (II), delivered. 9C, pending. Every one of these is a person from your client’s own floor. You didn’t sell Axiom intelligence. You sold it its own staff back.'), p('Marguerite Soames puts her glasses on, and reads the receipts one by one, and does not stop.')]),
    pr('forgery', 'The forgery', proof ? 'The sevens. BACKUP: left blank.' : 'Your word. Say so.', [
      q('You', 'Six weeks ago I was sent to Owen Marsh on a tasking in my handler’s name. She never wrote it. ' + (proof ? 'Look at the sevens. And the line for backup, left blank, so that nobody would be there.' : 'I can’t prove who did. I’m telling you anyway, so that it’s in your minutes that somebody said it.')),
      p(proof ? 'You put the tasking on the table. Soames turns it round, and looks at the sevens, and looks at Deverell.' : 'Nobody at the table answers. Somebody writes it down.'),
    ]),
    pr('cost', 'The cost', 'The people.', [q('You', 'Eleanor Linden, who fell. Iris Moreau, who is ending. Adrian Vale, whose desk is two from the one I sit at. A woman by a window on seventy-one, with a careful fringe, who was going to be delivered on Thursday. And a man at the Markets Authority who lends his newspaper to strangers. That is what the account costs.')]),
  ];
}

// ── The record ──

function recordBlocks(s: GameState): Block[] {
  if (!sloaneBeat(s)) return [p('Deverell looks along the table to the chair by the door, where Axiom’s escort is sitting with his slate on his knee.')];
  return isIn(s, 'sloane')
    ? [p('Celeste turns, very slowly, to the chair by the door.'), q('Celeste Laurent', 'Victoria took delivery, Anton. Victoria countersigned. Victoria had the verdict on her desk for three years. Do ask her why she’s only returning it now.')]
    : key(s, 'inst.way14') === 'proof'
      ? [p('The inquiry’s transcript is in the bundle, and Celeste has read it, of course. She turns a page with one finger.'), q('Celeste Laurent', 'Poor Victoria. Cleared by her own product, on the record. I don’t suppose she’ll ever forgive you.')]
      : [p('Celeste lays one finger on the 9C receipt, on the countersignature.'), q('Celeste Laurent', 'V. Sloane. Her hand, darling, not mine. She signs what you bring her. Everybody noticed.')];
}

function recordChoices(s: GameState): C17Choice[] {
  if (sloaneBeat(s) && !key(s, 'act4.sloane')) {
    const next = bentonHere(s) ? 'record' : 'leash';
    const o = (id: 'vouch' | 'stand' | 'use', label: string, hint: string, body: Block[]) =>
      offer('i17-sloane-' + id, label, hint, next, (x) => {
        setKey(x, 'act4.sloane', id);
        return [...body, ...(bentonHere(x) ? [p('And Deverell looks along the table to the chair by the door, where Axiom’s escort is sitting with his slate on his knee.')] : [])];
      });
    return [
      o('vouch', '“She raised it. You buried it.”', 'Clear her, in front of the people who can.', [q('You', 'She raised it. In writing, dated, three years ago. You buried it.'), p(isIn(s, 'sloane') ? 'Sloane does not look at you. She looks at the table, and something in her shoulders comes down half an inch, for the first time in a year.' : 'Soames writes it down, and underlines it.')]),
      o('stand', 'Let her stand on her own record', 'Not an ally. Not an enemy. A person in the machine.', [p('You say nothing for her or against her, and let her record lie on the table where everybody can read it: the objection, the countersignature, the three years. A person in the machine. Let them look.')]),
      o('use', 'Make her the proof', 'True, and cold.', [q('You', 'She took delivery of a product she knew was defective, and countersigned the next one. So did you. The difference is that she wrote it down.'), p(isIn(s, 'sloane') ? 'Sloane looks at you for a long moment, and nods, once, as if a debt had been called in and paid, and you both know exactly which one.' : 'It is true, and it is cold, and it lands.')]),
    ];
  }
  const b = (id: 'box' | 'celeste' | 'ignore', label: string, hint: string, body: Block[]) =>
    offer('i17-benton-' + id, label, hint, 'leash', (x) => {
      setKey(x, 'act4.benton-beat', id);
      return body;
    });
  return [
    ...(emptyBox(s)
      ? [b('box', '“Where is it, Director?”', 'The empty box. PROJECT EVE (I).', [
          p('You put the photograph in front of him: aisle nine, the grey box, PROJECT EVE (I), empty, and the outline of a file in the dust.'),
          q('You', 'Somebody took the first Evelyn’s file out of Axiom’s Records the week I came back. Where is it, Director?'),
          p('Benton does not answer. He looks at his slate, as if the answer might be on it. Soames writes his name down, slowly, in capitals.'),
        ])]
      : []),
    b('celeste', 'Let Celeste do it', 'She will. Watch the board watch her.', [
      p('You look at Benton, and then at Celeste, and wait. She doesn’t make you wait long.'),
      q('Celeste Laurent', 'Oh, Elias is ours, darling. He always was. I’m told you’d like him. Have him.'),
      p('Benton goes a colour you have never seen on him. The board watches Meridian throw its own man off the sledge to lighten it, and every one of them is thinking the same thing: which of us is next.'),
    ]),
    b('ignore', 'Don’t look at him once', 'He leaves at the recess.', [p('You don’t look at him once. At the first pause he gets up, and nobody asks him to stay, and he does not come back.')]),
  ];
}

// ── The leash ──

const heldLands: Record<string, Block[]> = {
  client: [p('Then the last receipt, from your pocket, laid on top of the others: CANDIDATE 9C.'), q('You', 'She’s not coming.')],
  nell: [p('Then, from your pocket, one sheet: the Jakarta order, a name given to the wrong people, and one initial. C.')],
  cards: [p('Then, from your pocket, the 1109 cards, and you fan them on the table like a hand of patience.'), q('You', 'Every client at this table is on one.')],
  page: [p('Then page seven, from your pocket, unfolded and laid flat, the missing page back in the room.')],
  box: [p('Then, from your pocket, a photograph: an Axiom Records box, PROJECT EVE (I), empty, and the outline of a file in the dust.'), q('You', 'Your client’s building. Your man in it. The first one’s file, gone the week I came back.')],
  none: [p('You have nothing in your pocket. You put your hands flat on the table instead.'), q('You', 'I’m still here.')],
};

function leashBlocks(s: GameState): Block[] {
  return [
    p('Celeste waits for the room to be quiet. Then she makes her last move, and it is the best she has ever made: not a threat. There is nothing left to threaten with. A gift.'),
    q('Celeste Laurent', 'Sit with us, darling. Not as the product. As the client. Axiom will need a new officer for Project Eve, and 9C needs somebody kind to hold her. You’d be kinder than Victoria. You’d be kinder than me.'),
    p('The board, frightened, is half ready to agree. It is the one thing this road has taught you to want: authority. Handed to you as a leash, with your hand on the other end, and a woman with a careful fringe on the end of it.'),
    ...(isIn(s, 'sloane') ? [q('Sloane', 'I held it for three years. It was never in my hand. It was round my neck.')] : []),
  ];
}

function leashChoices(): C17Choice[] {
  const g = (id: 'refuse' | 'draw' | 'laugh', label: string, hint: string, body: Block[]) =>
    offer('i17-leash-' + id, label, hint, 'harbour', (x) => {
      setKey(x, 'act4.offer', id);
      const held = key(x, 'act4.held') ?? 'none';
      setKey(x, 'act4.held-landed', held);
      return [...body, ...(heldLands[held] ?? heldLands.none)];
    });
  return [
    g('refuse', '“I didn’t come for a leash.”', '“I came to return one.”', [q('You', 'I didn’t come for a leash. I came to return one.'), p('Something changes in the faces round the table.')]),
    g('draw', 'Let her go on', 'Long enough to hear what it costs somebody else.', [
      q('You', 'And what would it cost? Tell them.'),
      q('Celeste Laurent', 'Very little. 9C delivered on Thursday, as planned, to your desk. Victoria’s file closed. Mr Marsh’s inquiry given to somebody safer. And you, darling, holding the other end, forever.'),
      p('You let the board hear her say it. Deverell writes something down.'),
    ]),
    g('laugh', 'Laugh', 'The real laugh.', [p('You laugh: the real laugh, the one nobody in this room has ever heard from you, and it goes on long enough that Soames, of all people, smiles.')]),
  ];
}

// ── The harbour ──

function harbourBlocks(): Block[] {
  return [
    p('Then Celeste, across the table, and the board as witnesses, and the name the game has held open since Singapore.'),
    q('Celeste Laurent', 'The Jakarta order was mine. On the Saturday I sent a car to take her to her sister’s. To bring her home. She wouldn’t get into it. She walked the harbour wall in the dark with that leg, and the driver watched her fall, and didn’t stop. He rang me at six. I rang her sister at seven.'),
    t('Not a push. Worse and smaller. Responsibility. The truth, and not the whole of anyone’s guilt.'),
  ];
}

function harbourChoices(s: GameState): C17Choice[] {
  const sc = caseScore(s);
  const n = (id: 'ask' | 'nora' | 'wait', label: string, hint: string, said: 'eleanor' | 'evie' | 'no', body: Block[]) =>
    offer('i17-named-' + id, label, hint, 'ruling', (x) => {
      setKey(x, 'act4.named', id);
      setKey(x, 'act4.nell-said', said);
      return [...body, ...(said === 'eleanor' ? [q('Celeste Laurent', 'Eleanor.'), p('She says it to the table, not to you, and for a moment she is not the head of anything.')] : said === 'evie' ? [q('Celeste Laurent', 'Evie.'), p('The difference between the two names is the whole of the evening.')] : [p('She does not say it. The silence says it for her, and the board hears that too.')])];
    });
  return [
    n('ask', 'Ask her to say it', 'Her name. Her real one.', sc >= 1 ? 'eleanor' : 'evie', [q('You', 'Say her name.')]),
    ...(isIn(s, 'nora') ? [n('nora', 'Let Nora put the photograph down', 'Face up. Saying nothing.', 'eleanor', [p('Nora puts the photograph on the table, face up, Nell on the harbour wall in flat shoes, and says nothing at all.')])] : []),
    n('wait', 'Wait', 'As Adrian learned to.', sc >= 2 ? 'eleanor' : 'no', [p('You say nothing, and wait, as Adrian learned to wait across a table from people who had lied to him.')]),
  ];
}

// ── The ruling ──

function rulingBlocks(s: GameState): Block[] {
  const b = board17i(s);
  const a = aim(s);
  const grant =
    b.board === 'closed'
      ? 'The board closes ranks. You walk out with what you carried in, and the switch armed, and the slow public road ahead of you. Still solvable. Costlier.'
      : a === 'inside'
        ? b.terms === 'full'
          ? 'The Project Eve contract terminated for defect, in the minutes, on the client’s terms. 9C withdrawn. Axiom indemnified.'
          : 'The contract suspended pending review. 9C “deferred”. The rest held by the switch.'
        : a === 'channels'
          ? b.terms === 'full'
            ? 'The board will refer itself to the regulator before nine tomorrow, to be first. The inquiry’s findings accepted in full.'
            : 'The findings noted, not accepted. The regulator will have to ask. The rest held by the switch.'
          : a === 'walk'
            ? b.terms === 'full'
              ? 'A written undertaking: your name never placed, catalogued or sold again, by anyone.'
              : 'An undertaking, grudging, without the signatures. The rest held by the switch.'
            : 'The minute records her name. Eleanor Linden. For whatever a minute is worth.';
  return [
    p('Seven o’clock. Deverell moves, not to punish Celeste but to save Meridian: the firm must be seen to have acted.'),
    p(b.board === 'resigned' ? 'Celeste is asked to resign her seat, tonight, and does, standing, with her hands folded, as if accepting a small award.' : b.board === 'diminished' ? 'Celeste keeps her seat, and loses the room. She will not speak for this board again, and everybody at the table knows it, including her.' : 'Celeste keeps her seat, and knows it will not last.'),
    p(grant),
    ...(key(s, 'act4.benton-beat') && key(s, 'act4.benton-beat') !== 'ignore' ? [p('And a line at the bottom of the minute, added in Soames’s hand: the client to be informed, in writing, of the position of Mr E. Benton.')] : []),
  ];
}

function rulingChoices(): C17Choice[] {
  return [
    offer('i17-ruling-on', 'Let the board file out', 'One minute.', 'aside', (x) => {
      const b = board17i(x);
      setKey(x, 'act4.board', b.board);
      setKey(x, 'act4.terms', b.terms);
      return [];
    }),
  ];
}

// ── One minute ──

function asideBlocks(s: GameState): Block[] {
  return [
    p('The board files out. For one minute the two of you are alone in the long room under the empty frames.'),
    p('Celeste does not go to the window. She stays at the table, one hand on the back of a chair, and for a moment she looks her age, which nobody in this building has ever been allowed to see, and then she doesn’t.'),
    q('Celeste Laurent', 'Did you ever like being her?'),
    t('Her. The one in the catalogue. The one who took the tasking and wore what she was sent. The one Celeste made, out of a girl with good bones and a file number.'),
    p('She holds out a white orchid, from nowhere, the way she always does, and it is only then that you see her hand is not quite steady.'),
    q('Celeste Laurent', key(s, 'act4.sloane') === 'use' ? 'You didn’t let Victoria survive us. I thought you would.' : key(s, 'inst.way14') === 'cut' ? 'Victoria resigned rather than survive us. Very her. Very proper.' : 'Victoria survived us. I didn’t expect that.'),
  ];
}

function asideChoices(): C17Choice[] {
  const l = (id: 'yes' | 'no' | 'orchid', label: string, hint: string, body: Block[]) =>
    offer('i17-last-' + id, label, hint, 'complete', (x) => {
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
  const inn = inside(s);
  const out = key(s, 'act4.outside');
  return [
    p('You walk out of the Vesper by the front door, and nobody opens it for you. You open it yourself.'),
    ...(inn.includes('sloane') ? [p('Sloane walks out beside you, not touching, and stops on the top step, and looks at the river for a long time, like a woman reading something twice.'), q('Sloane', 'Debrief. Tomorrow. Ten o’clock. Bring coffee.')] : []),
    ...(inn.includes('maya') ? [p('Maya comes down the steps with the box on her hip and the tabs sticking out of it like feathers, and does not stop grinning until the taxi.')] : []),
    ...(inn.includes('daniel') ? [p('Daniel is at the bottom of the steps with the boxes, and he doesn’t ask. He just looks at your face, and puts the boxes down, and waits.')] : []),
    ...(out === 'sloane' ? [p('A grey van on the Embankment flashes its lights once, and pulls away.')] : out === 'marsh' ? [p('Across the road Marsh puts his phone away, un-rung, and gets on his bicycle, and waves, and wobbles.')] : []),
    p('The Embankment, the river, the evening. The green light in the hall at home will still be on. For now.'),
    ...(import.meta.env.VITE_EVE_CHAPTER18 === '1' ? [] : [p('[Chapter 18 · institutional road — in development]')]),
  ];
}

export function institutionalBlocks17(s: GameState): Block[] {
  if (s.phase === 'exhibit') return exhibitBlocks(s);
  if (s.phase === 'warranty') return warrantyBlocks(s);
  if (s.phase === 'record') return recordBlocks(s);
  if (s.phase === 'leash') return leashBlocks(s);
  if (s.phase === 'harbour') return harbourBlocks();
  if (s.phase === 'ruling') return rulingBlocks(s);
  if (s.phase === 'aside') return asideBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices17(s: GameState): C17Choice[] {
  if (s.phase === 'exhibit') return exhibitChoices();
  if (s.phase === 'warranty') return warrantyChoices(s);
  if (s.phase === 'record') return recordChoices(s);
  if (s.phase === 'leash') return leashChoices();
  if (s.phase === 'harbour') return harbourChoices(s);
  if (s.phase === 'ruling') return rulingChoices();
  if (s.phase === 'aside') return asideChoices();
  return [];
}
