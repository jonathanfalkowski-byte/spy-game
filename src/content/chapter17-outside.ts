/** Chapter 17 (Outside route, lane id `outside`) · Return to Sender:
 * bearing → provenance → postman → terms → saturday → verdict → quiet → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_17_RETURN_TO_SENDER_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_17_SCRIPT.md. The shared room ("The Room") in Outside framing:
 * a woman who has signed every page, in front of a board that was sent them unsigned. Celeste introduces the product by its
 * catalogue number and reads the clothes (and, if Rafe is in the room, names the post: "Mr Lim."); the first card lands; a
 * place card reading UNCLAIMED. The defect becomes a question of provenance: Soames asks who gave her the pages, and
 * Celeste calls them a courier's, unsigned; how she presses (every page signed / own the flawed page first / the cost). The
 * postman beat resolves the source in front of the board (act4.rafe-beat = vouch | stand | use). Celeste's last move is a
 * buyer's offer, refusable at no cost: buy it all, strike her name from every catalogue, keep the courier safe; refuse /
 * draw / laugh; then the held card lands (the Rotterdam slip lands hardest). Nell, told not shown, as canon (the Jakarta
 * order, the car she would not get into, the harbour wall, the driver who did not stop, the call at six and at seven), with
 * the Outside addition that the courier was sent to Rotterdam that same Saturday so nobody would be on the ferry with her;
 * Rafe, in the room, hears it with everyone else, and is the one voice that can ask for the name (act4.named = ask | nora |
 * rafe | wait; act4.nell-said = eleanor | evie | no). The board decides (resigned / diminished / closed) from the case,
 * who is in the room, the offer drawn out and the provenance owned, and the aim becomes terms. One minute alone: "Did you
 * ever like being her?" Nothing sexual on screen; Rafe never makes her Nell; the offer is refusable at no cost. Entered from
 * an Outside `chapter16.complete`; ends at a Chapter 18 in-development stop, having written the shared act4.* keys for
 * Ch17. Choice ids carry `o17-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';

type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C17Choice['apply']): C17Choice => ({ id: 'chapter17.' + id, label, hint, next, apply });

export const OUTSIDE_PHASES17 = ['bearing', 'provenance', 'postman', 'terms', 'saturday', 'verdict', 'quiet'] as const;
export const isOutside17 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase17 = (s: GameState) => isOutside17(s) && ((OUTSIDE_PHASES17 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const inside = (s: GameState) => (key(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
const isIn = (s: GameState, who: string) => inside(s).includes(who);
const aim = (s: GameState) => key(s, 'act4.aim') as 'expose' | 'trade' | 'cut' | 'nell' | undefined;
const rafeSeat = (s: GameState) => key(s, 'act4.rafe') as 'room' | 'door' | 'absent' | undefined;
const inRoom = (s: GameState) => rafeSeat(s) === 'room';
const verified = (s: GameState) => Number(key(s, 'out.verified') ?? 0);
const caseScore = (s: GameState) => ({ thin: 0, supported: 1, strong: 2, overwhelming: 3 })[key(s, 'act4.case') as 'thin'] ?? 0;
const slipShown = (s: GameState) => key(s, 'out.slip15') === 'gave';

/** What the board does (design §4): the case, plus a witness in the room, plus the buyer's offer drawn out in her own
 * words, plus the provenance owned. 3 or more resigns her, 1–2 diminishes her, 0 closes ranks. Meridian stands. */
export function board17o(s: GameState): { board: 'resigned' | 'diminished' | 'closed'; terms: 'full' | 'partial' | 'none' } {
  const press = key(s, 'act4.press');
  const pts =
    caseScore(s) +
    (['marsh', 'maya', 'rafe', 'nora', 'iris'].some((w) => isIn(s, w)) ? 1 : 0) +
    (key(s, 'act4.offer') === 'draw' ? 1 : 0) +
    (press === 'flaw' || (press === 'signed' && verified(s) >= 3) ? 1 : 0);
  return pts >= 3 ? { board: 'resigned', terms: 'full' } : pts >= 1 ? { board: 'diminished', terms: 'partial' } : { board: 'closed', terms: 'none' };
}

// ── The entry ──

export function beginOutside17(): C17Choice {
  return offer('begin-outside', 'The room', 'Six people, one hour, and Celeste standing.', 'bearing');
}

// ── The bearing ──

const firstLands: Record<string, string> = {
  ledger: 'Your ledger goes down first, ruled in your own hand, every page with the column on the right filled in or marked TAKEN ON TRUST. Soames reaches for it before anybody else can.',
  nell: 'The Jakarta order goes down first: one sheet, a name given to the wrong people, and one initial. Deverell looks at Celeste for the first time since you came in.',
  slip: 'The Rotterdam slip goes down first, the colour of weak tea, four lines typed, and a brass pin still through the corner. The youngest of the three unnamed men reads it upside down and goes still.',
  cards: 'The 1109 cards go down first, in their little labelled envelopes, and the youngest of the three unnamed men goes white.',
  page: 'Page seven goes down first, folded, then unfolded: the missing page, back in the room it was torn from.',
  lim: 'A thin file goes down first, LIM, R. on the cover, three years of handoffs in his own hand, and a pencilled note on the cover that Deverell turns toward the light.',
};

function bearingBlocks(s: GameState): Block[] {
  const wear = key(s, 'act4.wear');
  return [
    p('Celeste speaks first, of course: to the board, warmly, about the product. The reissue, performing beyond forecast. She introduces you to the table by your catalogue number.'),
    q('Celeste Laurent', 'E. V. (II). Unclaimed, as you see. Available for placement.'),
    q('Celeste Laurent', wear === 'grey' ? 'And in my grey. Oh, darling. Worn back at me. How rude. How right.' : wear === 'plain' ? 'Flat shoes. A plain coat. Whom are we being this evening?' : 'Black. You did dare.'),
    ...(wear === 'plain' ? [p('She looks at your shoes a second longer than a woman looks at shoes. For one moment she looks at them the way she must once have looked at somebody else’s. Then she doesn’t.')] : []),
    ...(inRoom(s)
      ? [
          p('Her eyes go along the wall, to the man under the empty frame with his hat in his hands, and stay.'),
          q('Celeste Laurent', 'And the post, I see. Do sit, Mr Lim. There isn’t a chair for the post. There never was.'),
          p('It is the first time anyone in this house has used his name. He does not sit. He does not say anything. He holds his hat very still.'),
        ]
      : []),
    p('At the foot of the table, the seventh chair, a water glass already poured, and a place card, cream, engraved, the way the Vesper does its dinners: E. V. (II) · UNCLAIMED.'),
  ];
}

function placeCardChoices(): C17Choice[] {
  const c = (id: 'name' | 'pocket' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('o17-card-' + id, label, hint, 'bearing', (x) => {
      setKey(x, 'c17.o-card', id);
      return body;
    });
  return [
    c('name', 'Claim it', 'Your own name over UNCLAIMED. In ink.', [p('You take a pen out of your jacket, uncap it, and draw a line through UNCLAIMED, neatly, the way a catalogue strikes a withdrawn lot, and write above it, in capitals, your own name. Then you stand the card back up, facing Celeste.'), q('Celeste Laurent', 'Oh, darling. Signed, too.')]),
    c('pocket', 'Put it in your pocket', 'A souvenir. Nobody else gets it.', [p('You pick the card up and put it in your inside pocket, beside whatever else is there. It is the last time anybody will print that word next to your face. You would like to have the last copy.')]),
    c('leave', 'Leave it where it is', 'Let them read it all evening.', [p('You leave it where it is, facing the table, and sit down behind it. Let them read it all evening: UNCLAIMED, and then your face, and the arithmetic.')]),
  ];
}

function bearingChoices(s: GameState): C17Choice[] {
  if (!key(s, 'c17.o-card')) return placeCardChoices();
  const o = (id: 'room' | 'celeste' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('o17-open-' + id, label, hint, 'provenance', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, p(firstLands[key(x, 'act4.first') ?? 'page'] ?? firstLands.page)];
    });
  return [
    o('room', 'Speak to the board', '“I’m the product. I’ve come to tell you where I came from.”', [q('You', 'I’m the product. I’ve come to tell you where I came from.')]),
    o('celeste', 'Speak only to her', 'And make the board listen in.', [q('You', 'You told me once you keep everything. So did the man at the wall. Shall we compare?')]),
    o('silent', 'Say nothing', 'Put the first card down and let it speak.', [p('You say nothing at all. You put the first card on the table, square it to the edge, and sit back.')]),
  ];
}

// ── The provenance ──

function provenanceBlocks(s: GameState): Block[] {
  return [
    p('Marguerite Soames reads the first page, and the second, and takes her glasses off.'),
    q('Marguerite Soames', 'And these came to you how, Miss Vale? I find I need to know where a page has been before I believe what is written on it.'),
    q('Celeste Laurent', 'From a courier, Marguerite. A man who stole from his employer for the better part of a year, and sold what he stole to a girl with a grievance. Not one of these pages is signed by anyone who would have to answer for it.'),
    ...(inRoom(s) ? [p('By the wall the man with the hat does not move. A muscle in his jaw does.')] : []),
    p('It is the best attack there is, and she has been saving it. The defect is real. The order is real. All she has to say is that the road they came by is crooked, and the room will let itself be persuaded that the cargo is too.'),
    t(verified(s) >= 3 ? 'Every page of this I checked. Ask me about any of them.' : verified(s) >= 1 ? 'Some of this I checked, and some I took on trust. She is going to find which.' : 'I took it all on trust. She is going to find that out, and she is going to be right, and I had better say so first.'),
  ];
}

function provenanceChoices(s: GameState): C17Choice[] {
  const pr = (id: 'signed' | 'flaw' | 'cost', label: string, hint: string, body: Block[]) =>
    offer('o17-press-' + id, label, hint, 'postman', (x) => {
      setKey(x, 'act4.press', id);
      return body;
    });
  const v = verified(s);
  return [
    pr('signed', 'Every page is signed', v >= 3 ? 'And you checked them. Ask about any.' : 'You did not check them all. Say so, or be caught.', [
      q('You', 'Every page I have put in front of you carries my signature. Where I checked, my initials. Where I could not, my name all the same, because I chose to carry it. Pick any page. Ask me anything about it.'),
      ...(v >= 3
        ? [p('Soames picks a page at random, and asks. You answer, and she asks again, and you answer again, and she reaches the end of her questions before you reach the end of your answers. She writes something down, and underlines it.')]
        : [p('Soames picks a page at random. You answer. Then Celeste, very lightly, picks one herself, from the right-hand column, where it says TAKEN ON TRUST in your own small capitals, and asks where it came from, and you tell her the truth, which is that you do not know. The room hears that too. It is not the end of the matter. It does not help.')]),
    ]),
    pr('flaw', 'Own the flawed page first', 'The one he altered. Before she does.', [
      q('You', 'There is a page in this ledger that the man who sent it altered. Page eleven. He told me so himself, and I knew by the Thursday, and I have set it apart, marked, in the front. I tell you so before Mrs Laurent does, because a ledger that hides its worst page is not a ledger.'),
      p('Celeste, who had been about to say precisely that, does not say it. For the length of a breath she looks very tired of being right in advance. Soames writes: PROVENANCE: DISCLOSED.'),
      ...(inRoom(s) ? [p('By the wall, the man with the hat closes his eyes.')] : []),
    ]),
    pr('cost', 'The cost', 'The people. Not the paper.', [
      q('You', 'Eleanor Linden, who walked a harbour wall in the dark. Iris Moreau, who is ending. Adrian Vale, whose desk is two from the one I sat at. A man who carried your envelopes for ten years and was never once looked at. That is what your collection costs. I can sign every page and you can doubt every one, and it will still cost that.'),
      p('Nobody answers. Somebody at the end of the table puts down a pen.'),
    ]),
  ];
}

// ── The postman ──

function postmanBlocks(s: GameState): Block[] {
  const seat = rafeSeat(s);
  if (seat === 'room')
    return [
      p('Anton Deverell turns in his chair, for the first time, to look at the wall.'),
      q('Anton Deverell', 'And who, exactly, is this gentleman?'),
      q('Celeste Laurent', 'Our courier, Anton. Rafe Lim. Ten years of Tuesdays, and never once late. He has been robbing us in my own post.'),
      p('The man with the hat takes one step forward from the wall, which is further than he has ever come into this room, and stops.'),
    ];
  return [
    p('Anton Deverell looks down the table at Celeste.'),
    q('Anton Deverell', 'This courier. Does he have a name?'),
    q('Celeste Laurent', 'Rafe Lim, Anton. Ten years of Tuesdays. He has been robbing us in my own post. He is, I understand, not far from here.'),
    ...(seat === 'door' ? [p('Behind the black glass, a long way down, a florist’s van with its back doors open, and a man in a courier’s jacket beside it, with a phone in his hand, who cannot hear a word of this and is listening anyway.')] : []),
  ];
}

function postmanChoices(s: GameState): C17Choice[] {
  const seat = rafeSeat(s);
  const pm = (id: 'vouch' | 'stand' | 'use', label: string, hint: string, body: Block[]) =>
    offer('o17-postman-' + id, label, hint, 'terms', (x) => {
      setKey(x, 'act4.rafe-beat', id);
      return body;
    });
  if (seat === 'room')
    return [
      pm('vouch', '“He carried it. I signed it.”', 'Clear him, in front of the people who can.', [
        q('You', 'He carried it to me. I signed it. If there is a theft in this room, Mr Deverell, it is mine, and it is on every page, with my name on it. Ask him nothing. Ask me.'),
        p('Rafe looks at you, and then at his hat, and puts it very carefully on the chair beside him, as if he has finally found a place to set it down.'),
      ]),
      pm('stand', 'Let him stand on his own record', 'Not a shield. Not a bargain. One line.', [
        p('You say nothing for him or against him, and let him stand there, in the light, in front of the people who have never once looked at him.'),
        q('Rafe', 'Ten years. Tuesdays. I never read one. I read the last one.'),
        p('That is all he says. It is, as these things go, a statement.'),
      ]),
      pm('use', 'Put him on the record', 'His ledger. His file. His name on every handoff.', [
        q('You', 'Then let him say it, and let it be minuted: every handoff, every Tuesday, in his own hand, and who received them. It is in the box. Ask him.'),
        p('Rafe says it. It takes four minutes. He has a clear, flat, unhurried voice, the voice of a man reading out a delivery note, and nobody at the table interrupts him once. When he has finished, he picks his hat up again, and he is no longer, for the first time in ten years, a man who can disappear.'),
      ]),
    ];
  return [
    pm('vouch', '“There is no courier. There are pages.”', 'Take it on yourself.', [q('You', 'There is no courier in this room, Mr Deverell. There are pages, and I signed every one. If there is a theft, it is mine, and it is on the paper with my name on it.'), p('Celeste smiles, a little. It is the smile she gives a good move on the other side of a board.')]),
    pm('stand', 'Say nothing', 'Let her name him, and let it be only a name.', [p('You say nothing at all. A name is only a name, and you have given the board nothing to put it to. After a moment Deverell looks away from it, and the name stays on the table, small and unconnected to anything, like a button.')]),
    pm('use', 'Put his record on the table', 'LIM, R. And his ledger. As evidence, and the price of his safety.', [
      q('You', 'Then the board should have his record. Ten years of handoffs, in his own hand, and who signed for every one. It is in the box. He will confirm it in writing. He is not here, and I would ask that it be minuted that he is to be protected.'),
      p('Soames takes the file, and reads the cover, and the pencilled note, and says nothing, and puts it very gently on her own side of the table.'),
    ]),
  ];
}

// ── The terms: the buyer's offer ──

const heldLands: Record<string, (s: GameState) => Block[]> = {
  ledger: () => [p('Then your ledger, from your pocket, laid on top of the others. Soames opens it to the right-hand column and reads it down, slowly.'), q('Marguerite Soames', 'CHECKED BY. And who is E. V.?'), q('You', 'I am.')],
  nell: () => [p('Then, from your pocket, one sheet: the Jakarta order, a name given to the wrong people, and one initial. C.')],
  slip: (s) => [
    p('Then, from your pocket, a flimsy the colour of weak tea, four lines typed, a brass pin through the corner.'),
    q('You', 'ROTTERDAM. COURIER. R. L. SATURDAY. NON-REFUSABLE. AUTH. C. Somebody sent a man out of the country on a Saturday, and signed for it in the same green ink.'),
    ...(inRoom(s)
      ? slipShown(s)
        ? [p('By the wall, Rafe has already seen it. He looks at Celeste, and does not look away, and she is the one who has to.')]
        : [p('By the wall, Rafe looks at the slip, which he has never seen. He reads it once. His hat goes quite still in his hands. He does not make a sound. It is the loudest thing in the room.')]
      : []),
  ],
  cards: () => [p('Then, from your pocket, the 1109 cards, and you fan them on the table like a hand of patience.'), q('You', 'Every client at this table is on one.')],
  page: () => [p('Then page seven, from your pocket, unfolded and laid flat, the missing page back in the room.')],
  lim: () => [p('Then, from your pocket, a thin file, LIM, R., and the pencilled note on the cover.'), q('Celeste Laurent', 'I wrote that, darling. “Will not survive.” I was wrong about one word.')],
  none: () => [p('You have nothing in your pocket. You put your hands flat on the table instead.'), q('You', 'I’m still here.')],
};

function termsBlocks(): Block[] {
  return [
    p('Deverell takes his glasses off and says, to nobody, that the board will take five minutes. Chairs go back. The three men with no names go out together to the corridor to make telephone calls they will not describe to their wives.'),
    p('The board comes back in. Celeste waits for the room to be quiet. Then she makes her last move, and it is the best she has ever made: not a threat. There is nothing left to threaten with. A purchase.'),
    q('Celeste Laurent', 'Let me buy it, darling. All of it: the file, the order, the slip, the cards. Your name struck out of every catalogue, in writing. A sum you may name. And the man at the wall kept safe, for as long as he lives, by the very people who sent him to Rotterdam. Nobody reads a word. Nobody needs to. You would never have to sign anything again.'),
    t('Everything I came for, bought, with a bow on it, and a clause I should be very careful to read twice. It is the best offer anyone has ever made me. That is exactly why it is the worst.'),
  ];
}

function termsChoices(s: GameState): C17Choice[] {
  const g = (id: 'refuse' | 'draw' | 'laugh', label: string, hint: string, body: Block[]) =>
    offer('o17-offer-' + id, label, hint, 'saturday', (x) => {
      setKey(x, 'act4.offer', id);
      const held = key(x, 'act4.held') ?? 'none';
      setKey(x, 'act4.held-landed', held);
      return [...body, ...(heldLands[held] ?? heldLands.none)(x)];
    });
  return [
    g('refuse', '“It isn’t for sale.”', '“I didn’t come to be paid.”', [q('You', 'It isn’t for sale. I didn’t come to be paid. I came to be read.'), p('Something changes in the faces round the table.')]),
    g('draw', 'Let her go on', 'Long enough to hear what it costs somebody else.', [
      q('You', 'And what would it cost? Tell them.'),
      q('Celeste Laurent', 'Very little. A courier’s record sealed. A girl in a catalogue struck out. Mr Marsh’s inquiry given to somebody safer. And you, darling, with a great deal of money and a very quiet life, and a drawer in a cabinet that nobody opens.'),
      p('You let the board hear her say it. Deverell writes something down.'),
    ]),
    g('laugh', 'Laugh', 'The real laugh.', [p('You laugh: the real laugh, the one nobody in this room has ever heard from you, and it goes on long enough that Soames, of all people, smiles.')]),
  ];
}

// ── The Saturday ──

function saturdayBlocks(s: GameState): Block[] {
  return [
    p('Then Celeste, across the table, and the board as witnesses, and the name the game has held open since Singapore.'),
    q('Celeste Laurent', 'The Jakarta order was mine. On the Saturday I sent a car to take her to her sister’s. To bring her home. She wouldn’t get into it. She walked the harbour wall in the dark with that leg, and the driver watched her fall, and didn’t stop. He rang me at six. I rang her sister at seven.'),
    q('Celeste Laurent', 'And I sent the post to Rotterdam that morning, Mr Lim, so that on the Sunday there would be nobody at the ferry for her to walk to. I wanted her to come home. I did not think she would walk.'),
    ...(inRoom(s)
      ? [p('Rafe does not move. He has stopped holding the hat. It has simply stopped being held, and rests in his hands the way a thing rests in the hands of a man who has forgotten he is carrying it.')]
      : [p('Somewhere on the river, a long way below this room, a man is waiting for a phone to ring, and does not know yet that the answer he has waited three years for has just been said aloud to six strangers.')]),
    t('Not a push. Worse and smaller. A car, a wall, a phone call, a morning in Rotterdam. Responsibility. The truth, and not the whole of anyone’s guilt.'),
  ];
}

function saturdayChoices(s: GameState): C17Choice[] {
  const sc = caseScore(s);
  const n = (id: 'ask' | 'nora' | 'rafe' | 'wait', label: string, hint: string, said: 'eleanor' | 'evie' | 'no', body: Block[]) =>
    offer('o17-named-' + id, label, hint, 'verdict', (x) => {
      setKey(x, 'act4.named', id);
      setKey(x, 'act4.nell-said', said);
      if (inRoom(x)) setKey(x, 'act4.rafe-heard', 'room');
      return [...body, ...(said === 'eleanor' ? [q('Celeste Laurent', 'Eleanor.'), p('She says it to the table, not to you, and for a moment she is not the head of anything.')] : said === 'evie' ? [q('Celeste Laurent', 'Evie.'), p('The difference between the two names is the whole of the evening.')] : [p('She does not say it. The silence says it for her, and the board hears that too.')])];
    });
  return [
    n('ask', 'Ask her to say it', 'Her name. Her real one.', sc >= 1 ? 'eleanor' : 'evie', [q('You', 'Say her name.')]),
    ...(isIn(s, 'nora') ? [n('nora', 'Let Nora put the photograph down', 'Face up. Saying nothing.', 'eleanor', [p('Nora puts the photograph on the table, face up, Nell on the harbour wall in flat shoes, and says nothing at all.')])] : []),
    ...(inRoom(s)
      ? [n('rafe', 'Let Rafe ask', 'He has waited three years. It is his to ask.', sc >= 1 ? 'eleanor' : 'evie', [
          p('You turn your head, very slightly, toward the wall, and that is all it takes. He does not come further forward. He does not raise his voice. It is the voice of a man reading a delivery note.'),
          q('Rafe', 'Say her name, Mrs Laurent. Her whole one. I’ve carried your post for ten years, and I’ve never asked you for a thing.'),
        ])]
      : []),
    n('wait', 'Wait', 'As Adrian learned to.', sc >= 2 ? 'eleanor' : 'no', [p('You say nothing, and wait, as Adrian learned to wait across a table from people who had lied to him.')]),
  ];
}

// ── The verdict ──

function verdictBlocks(s: GameState): Block[] {
  const b = board17o(s);
  const a = aim(s);
  const grant =
    b.board === 'closed'
      ? 'The board closes ranks. You walk out with what you carried in, and the switch armed, and the slow public road ahead of you. Still solvable. Costlier.'
      : a === 'expose'
        ? b.terms === 'full'
          ? 'The board will refer itself to the Markets Authority before nine tomorrow, to be first. The ORACLE finding accepted in full. The catalogue withdrawn. The ledger, with your signature on every page, entered into the minutes as the form in which the evidence was received.'
          : 'The findings noted, not accepted. The regulator will have to ask. The press will not: your ledger goes out at nine, every page signed, and the room knows it.'
        : a === 'trade'
          ? b.terms === 'full'
            ? 'A written undertaking, signed by the board and countersigned by Soames: your name never placed, catalogued or sold again, and no action of any kind against R. Lim, employed or otherwise, for ten years of Tuesdays. The rest held by the switch.'
            : 'An undertaking, grudging, without the signatures, and a verbal assurance about a courier that you will have to take on trust. The rest held by the switch.'
          : a === 'cut'
            ? b.terms === 'full'
              ? 'A written undertaking: your name never placed, catalogued or sold again, by anyone. You asked for nothing else, and you leave with nothing else.'
              : 'An undertaking, grudging, without the signatures. You asked for nothing else.'
            : 'The minute records her name. Eleanor Linden. For whatever a minute is worth.';
  return [
    p('Seven o’clock. Deverell moves, not to punish Celeste but to save Meridian: the firm must be seen to have acted.'),
    p(b.board === 'resigned' ? 'Celeste is asked to resign her seat, tonight, and does, standing, with her hands folded, as if accepting a small award.' : b.board === 'diminished' ? 'Celeste keeps her seat, and loses the room. She will not speak for this board again, and everybody at the table knows it, including her.' : 'Celeste keeps her seat, and knows it will not last.'),
    p(grant),
    p('Deverell’s secretary brings the minute in, one page, typed in the next room while you talked, and lays it on the table with a pen: Meridian’s pen, black and heavy, the kind the Vesper keeps for signatures that matter.'),
  ];
}

function minuteChoices(s: GameState): C17Choice[] {
  const m = (id: 'rafe' | 'sign' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('o17-minute-' + id, label, hint, 'verdict', (x) => {
      setKey(x, 'c17.o-minute', id);
      return body;
    });
  return [
    ...(inRoom(s)
      ? [m('rafe', 'Hold the pen out to Rafe', 'He has never signed anything in this house.', [
          p('You pick up the pen and hold it out across the table, not to Deverell, but to the man by the wall.'),
          q('You', 'The courier should sign. It was his post.'),
          p('Rafe comes the rest of the way to the table. He reads the minute, the whole page, while the people who own a great deal of the world wait for him, and signs at the bottom, in a clear, upright, unhurried hand: R. LIM, COURIER. It is the first time in ten years that anyone in this house has watched him write his own name.'),
        ])]
      : []),
    m('sign', 'Sign it yourself', 'As a witness. Your own name.', [p('You take the pen and sign as a witness at the bottom of the minute: not a number, not a catalogue entry. Your own name, in your own hand, which Soames reads upside down, and nods at, and initials beside, which nobody asked her to do.')]),
    m('leave', 'Let the board sign its own minute', 'Leave the pen where it lies.', [p('You leave the pen where it lies. It is their minute. Let them sign it, one after another, down the table, while you watch each of them read what they are signing, for once.')]),
  ];
}

function verdictChoices(s: GameState): C17Choice[] {
  if (!key(s, 'c17.o-minute')) return minuteChoices(s);
  return [
    offer('o17-verdict-on', 'Let the board file out', 'One minute.', 'quiet', (x) => {
      const b = board17o(x);
      setKey(x, 'act4.board', b.board);
      setKey(x, 'act4.terms', b.terms);
      return [];
    }),
  ];
}

// ── One minute ──

function quietBlocks(s: GameState): Block[] {
  return [
    p('The board files out. For one minute the two of you are alone in the long room under the empty frames' + (inRoom(s) ? ', and the man with the hat has gone out with the others, and stands on the other side of the door, which he has closed behind him, very quietly, like a courier.' : '.')),
    p('Celeste does not go to the window. She stays at the table, one hand on the back of a chair, and for a moment she looks her age, which nobody in this building has ever been allowed to see, and then she doesn’t.'),
    q('Celeste Laurent', 'Did you ever like being her?'),
    t('Her. The one in the catalogue. The one who wore what she was sent. The one Celeste made, out of a girl with good bones and a file number.'),
    p('She holds out a white orchid, from nowhere, the way she always does, and it is only then that you see her hand is not quite steady.'),
    q('Celeste Laurent', key(s, 'act4.rafe-beat') === 'use' ? 'You put him on the record. He will never be able to disappear again. I wonder whether he knows that is what he was given.' : key(s, 'act4.rafe-beat') === 'vouch' ? 'You put your name on a courier. Do be careful, darling. Names stay.' : 'He was the only one of us who never read what he carried. I did respect that.'),
  ];
}

function quietChoices(): C17Choice[] {
  const l = (id: 'yes' | 'no' | 'orchid', label: string, hint: string, body: Block[]) =>
    offer('o17-last-' + id, label, hint, 'complete', (x) => {
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
  const seat = rafeSeat(s);
  return [
    p('You walk out of the Vesper by the front door, and nobody opens it for you. You open it yourself.'),
    ...(seat === 'room'
      ? [p('Rafe is on the top step with his hat on, and then, as you come out, with his hat off again. He has not spoken since the table. He looks at the river, and then, for a long time, at nothing, and when he does speak it is not to you; it is to the water.'), q('Rafe', 'Eleanor. All that time I only knew the name on the ferry list. Eleanor.')]
      : seat === 'door'
        ? [p('Round the side, at the river door, a florist’s van with its back doors open, and a man beside it in a courier’s jacket who has been standing very still for an hour. He sees you. He does not ask. He only takes his cap off.')]
        : []),
    ...(inn.includes('maya') ? [p('Maya comes down the steps with the box on her hip and the tabs sticking out of it like feathers, and does not stop grinning until the taxi.')] : []),
    ...(inn.includes('nora') ? [p('Nora comes down last, with Nell’s photograph in both hands, and stops on the step, and holds it up to the river as if it might like to see it.')] : []),
    ...(out === 'marsh' ? [p('Across the road Marsh puts his phone away, un-rung, and gets on his bicycle, and waves, and wobbles.')] : out === 'iris' ? [p('Your phone buzzes once in your pocket: a station you have never heard of, and a single word from Iris. “Burn it.” She means the envelope. You hope she means the envelope.')] : []),
    p('The Embankment, the river, the evening. The black phone, wherever you put it, will be quiet.'),
    ...(import.meta.env.VITE_EVE_CHAPTER18 === '1' ? [] : [p('[Chapter 18 · outside road — in development]')]),
  ];
}

export function outsideBlocks17(s: GameState): Block[] {
  if (s.phase === 'bearing') return bearingBlocks(s);
  if (s.phase === 'provenance') return provenanceBlocks(s);
  if (s.phase === 'postman') return postmanBlocks(s);
  if (s.phase === 'terms') return termsBlocks();
  if (s.phase === 'saturday') return saturdayBlocks(s);
  if (s.phase === 'verdict') return verdictBlocks(s);
  if (s.phase === 'quiet') return quietBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices17(s: GameState): C17Choice[] {
  if (s.phase === 'bearing') return bearingChoices(s);
  if (s.phase === 'provenance') return provenanceChoices(s);
  if (s.phase === 'postman') return postmanChoices(s);
  if (s.phase === 'terms') return termsChoices(s);
  if (s.phase === 'saturday') return saturdayChoices(s);
  if (s.phase === 'verdict') return verdictChoices(s);
  if (s.phase === 'quiet') return quietChoices();
  return [];
}
