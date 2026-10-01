/** Chapter 18 (Outside route, lane id `outside`) · Proof of Delivery:
 * dispatch → delivery → consignee → docket → receipt → proof.
 * Design: docs/story/OUTSIDE_CHAPTER_18_PROOF_OF_DELIVERY_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_18_SCRIPT.md. The Outside road's close, on the shared "Position"
 * spine. The morning after, by the board (Celeste's canon last word: Lisbon, an orchid, or nothing), and Rafe's, if he heard
 * it in the room (end.morning = papers | rafe | sleep). The position, by aim and terms (end.position), and where Sloane ends,
 * a person in the machine (end.sloane = witness | returned | sparing | gone); the switch (end.switch = armed | handed |
 * disarmed). The people: Maya, Iris, Marsh, Nora, the cost of Chapter 15 come back; Rafe's own ending, by what she made him
 * (end.rafe = stays | home | blank): he stays and rings at 02:40 to say nothing is wrong; he takes Nell's file home to Nora;
 * or, cut, he sends one last page, blank. Who she goes home to (end.with = rafe | julian | sebastian | maya | none; Rafe only
 * if he stays and a night with him was chosen). Who she is now, on a delivery docket marked SIGNED FOR BY (end.name = adrian |
 * evelyn | new, none punished, never Nell). A year later: Meridian's new catalogue, without page seven (end.catalogue); a
 * page of three rules of trade, answering Ch7's, margins in Rafe's hand or her own (end.rules); a chosen night (heat 3,
 * consent in character, fades) or a quiet one (end.later). The two cards, WHO IS HOLDING THE PAGE? and THE SOURCE.; the last
 * line. `proof` is the terminal phase: nothing is offered after it. Sloane is never a romance; Rafe never makes her Nell; a
 * night is chosen and stoppable. Entered from an Outside `chapter17.complete`. Choice ids carry `o18-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C18Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C18Choice['apply']): C18Choice => ({ id: 'chapter18.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (key(s, 'c18.rec.' + k) !== undefined) return;
  setKey(s, 'c18.rec.' + k, String(s.history.length));
  setKey(s, 'c18.event.' + k, String(s.revision));
  setKey(s, 'c18.layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c18.' + k);
  s.knowledge.push('c18.' + k);
}

export const OUTSIDE_PHASES18 = ['dispatch', 'delivery', 'consignee', 'docket', 'receipt', 'proof'] as const;
export const isOutside18 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase18 = (s: GameState) => isOutside18(s) && (OUTSIDE_PHASES18 as readonly string[]).includes(s.phase);

const board = (s: GameState) => (key(s, 'act4.board') ?? 'closed') as 'resigned' | 'diminished' | 'closed';
const terms = (s: GameState) => (key(s, 'act4.terms') ?? 'none') as 'full' | 'partial' | 'none';
const aim = (s: GameState) => (key(s, 'act4.aim') ?? 'cut') as 'expose' | 'trade' | 'cut' | 'nell';
const way14 = (s: GameState) => key(s, 'out.way14') as 'keep' | 'cut' | 'trust' | undefined;
const rafeCut = (s: GameState) => way14(s) === 'cut';
const heardInRoom = (s: GameState) => key(s, 'act4.rafe-heard') === 'room';
const cost15 = (s: GameState) => key(s, 'out.cost15');
const marshIn = (s: GameState) => key(s, 'act3.ally.marsh') === 'in' && !(cost15(s) === 'ally' && key(s, 'c15.cost-who') === 'marsh');
const irisIn = (s: GameState) => key(s, 'act3.ally.iris') === 'in' && !(cost15(s) === 'ally' && key(s, 'c15.cost-who') === 'iris');
const noraIn = (s: GameState) => key(s, 'act3.ally.nora') === 'in';
const mayaIn = (s: GameState) => key(s, 'c6.maya') === 'restored';
const holders = (s: GameState) => (key(s, 'act3.switch') ?? '').split(',').filter((x) => x && x !== 'solicitor');
const holderName: Record<string, string> = { rafe: 'Rafe', marsh: 'Owen Marsh', nora: 'Nora', iris: 'Iris', maya: 'Maya' };
type Partner = 'rafe' | 'julian' | 'sebastian';
const partnerName: Record<Partner, string> = { rafe: 'Rafe', julian: 'Julian Mercer', sebastian: 'Sebastian' };
/** A chosen night with him before, in any Outside chapter: then a night of the fuller scope is on offer again. */
const nightOk = (s: GameState, pt: Partner) =>
  [
    ['c7.o-evening', 'c7.o-evening-outcome'],
    ['c8.o-evening', 'c8.o-evening-outcome'],
    ['c10.o-night', 'c10.o-night-outcome'],
    ['c11.o-night', 'c11.o-night-outcome'],
    ['c14.o-evening', 'c14.o-evening-outcome'],
    ['c15.o-night', 'c15.o-night-outcome'],
  ].some(([who, out]) => key(s, who) === pt && !!key(s, out)?.startsWith('intimate'));

/** Where Sloane ends, a person in the machine, by what Evelynn made her (Ch14 sloane, Ch17). */
export function sloaneEnd18(s: GameState): 'witness' | 'returned' | 'sparing' | 'gone' {
  const sl = key(s, 'act3.sloane');
  if (sl === 'burned') return aim(s) === 'expose' && terms(s) !== 'none' ? 'witness' : 'gone';
  if (sl === 'traded') return 'returned';
  return 'sparing';
}

// ── The entry ──

export function beginOutside18(): C18Choice {
  return offer('begin-outside', 'Friday', 'The morning after.', 'dispatch');
}

// ── The dispatch ──

function dispatchBlocks(s: GameState): Block[] {
  const b = board(s);
  const front = aim(s) === 'expose' && terms(s) !== 'none';
  return [
    ...(b === 'resigned'
      ? [
          front
            ? p('Friday. The front page of a paper that matters, below the fold and across three columns: the ORACLE verdict, the catalogue, a Jakarta order with one initial circled. Beside it, in a box, in your own hand reproduced at the size of a postage stamp, a column headed CHECKED BY.')
            : p('Friday. A paragraph in the business pages, below the fold: a non-executive director of Meridian Holdings has stood down “to pursue other interests”. No photograph.'),
          p('And in the afternoon post, a postcard from Lisbon: yellow trams, a hill, a view of the river. On the back, in the looping green hand:'),
          q('The postcard', 'You were worth it. C.'),
        ]
      : b === 'diminished'
        ? [p('Friday. Nothing in the papers. In the post, a typed letter from Marguerite Soames, two lines, which does not apologise and does not need to. And on the doormat, a white orchid in a black pot, with no card at all.')]
        : [p('Friday. Nothing in the papers. Nothing in the post. Nothing on the black phone, or anywhere. Meridian has closed its ranks and its mouth, and the switch is still armed in envelopes.')]),
    ...(rafeCut(s)
      ? [p('At seven, Maya, if she is in your life, on the phone: “It’s filed. Go back to sleep.” If she is not, the phone is quiet, and so, for the first time since the spring, is the room.')]
      : heardInRoom(s)
        ? [p('At seven, a knock at the iron stair. Not a crate. Not an envelope. A man in a courier’s jacket with two coffees in a cardboard tray, who has not slept, and is not asking you for anything.')]
        : [p('At seven the cheap phone, the one in the drawer, rings once and stops. A number you know and no name. It rings again, and you answer it.'), q('Rafe', 'Is it done? Tell me properly. I’d rather hear it than guess.')]),
  ];
}

function dispatchChoices(s: GameState): C18Choice[] {
  const m = (id: 'papers' | 'rafe' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('o18-morning-' + id, label, hint, 'delivery', (x) => {
      setKey(x, 'end.morning', id);
      return body;
    });
  return [
    m('papers', 'Read every word, twice', 'In order. With a pencil.', [p('You read every word of it, at the table under the wall, with a pencil, the way the sender once taught you to read a page: where it came from, who checked it, what it cost. Then you read it again, for the pleasure of it.')]),
    ...(!rafeCut(s)
      ? [m('rafe', heardInRoom(s) ? 'Drink the coffee with Rafe' : 'Tell him properly', heardInRoom(s) ? 'On the iron stair. Nobody has to say anything.' : 'On the cheap phone. All of it. In order.', [
          heardInRoom(s)
            ? p('You sit on the iron stair in the cold with him and drink the coffee, which is terrible, and neither of you says very much. After a while he says the name once, to nobody, quietly, and then he laughs, which surprises both of you.')
            : p('You tell him properly, on the cheap phone, at the table under the wall, all of it, in order, with footnotes: the room, the offer, the name said aloud, the Saturday. He listens without a word for twenty minutes. At the end there is a long pause on the line, and then, very quietly: “Thank you for not making me guess.”'),
        ])]
      : []),
    m('sleep', 'Go back to sleep', 'For once, do as you’re told.', [p('You go back to sleep, for once doing exactly as you are told, and sleep until two in the afternoon, and nobody rings, and nobody signs for it.')]),
  ];
}

// ── The delivery ──

const SLOANE_END: Record<ReturnType<typeof sloaneEnd18>, Block[]> = {
  witness: [p('Sloane: at the inquiry, in graphite, at the witness table, reading the pages out loud into the record, every one, in the flat clear voice she once used to brief rooms, and not once looking at you. When she reaches the end she folds her hands. It is the best thing she has ever done with her file.'), q('Sloane', 'For the record. I am not sorry. I am accurate.')],
  gone: [p('Sloane: gone from Axiom with a box and her good shoes, to a flat in Pimlico with a view of nothing and a garden the size of a desk. In the post one morning a postcard with no picture on it at all, just five words, typed.'), q('The postcard', 'FOR THE RECORD. NO REGRETS. V.')],
  returned: [p('Sloane: at her desk on seventy-one, exactly as before, because you sold her back, and she knows precisely what you got for her, and she has not said a word about it in six months. Once, in the post, a single line in pencil.'), q('Sloane', 'You traded me for a man’s safety. It was a good trade. I’d have done it myself.')],
  sparing: [p('Sloane: still on seventy-one, still the officer of record, still reading everything twice. You spared her, and you never mentioned it, and neither did she. Once a year, a card arrives with nothing on it but a file number and a pencilled word.'), q('The card', 'ACKNOWLEDGED. V.S.')],
};

function positionLines(s: GameState): Block[] {
  const a = aim(s);
  const tm = terms(s);
  if (a === 'expose')
    return tm === 'full'
      ? [p('The ORACLE defect, the catalogue and the Jakarta order, published through channels nobody controls, with your signature on every page. Meridian referred to the Markets Authority by its own board, first, at nine on Friday, as promised. Meridian wounded in public, and standing. You own the risk, and you signed it. Nobody can say you did not stand behind a word.')]
      : tm === 'partial'
        ? [p('The ledger published at nine, every page signed, whether the board liked it or not. The regulator slow, and careful, and in no hurry. Meridian wounded, a little. You own the risk, and you signed it.')]
        : [p('You publish it yourself, the slow way, through Marsh, a form at a time, and it takes a year, and every page carries your name. Solvable. Costlier. Yours.')];
  if (a === 'trade')
    return tm === 'full'
      ? [p('The undertaking, signed by six people: your name never placed, catalogued or sold again, by anyone, and no action of any kind against R. Lim for ten years of Tuesdays. Nobody reads a word of it. The switch stays armed. It is the quietest thing you have ever done, and it holds.')]
      : tm === 'partial'
        ? [p('An undertaking, unsigned, and a verbal assurance about a courier that you will have to take on trust. You take it, and you check, every month, and every month it holds.')]
        : [p('No undertaking at all. You sold nothing and were sold nothing. You walk out with what you carried in, and the switch armed, and the slow road ahead. Solvable. Costlier.')];
  if (a === 'cut')
    return [
      p(tm === 'full' ? 'The undertaking, signed by six people: your name never placed, catalogued or sold again, by anyone. You asked for nothing else.' : tm === 'partial' ? 'The undertaking, unsigned. You don’t need the signatures.' : 'No undertaking at all. You walk anyway. It was always the one thing you could prove alone.'),
      p('Everything you could check, said to their faces, and nothing else. No source is owed your silence. You are nobody’s consignee, and nobody’s courier.'),
    ];
  return [p('The minute records her name' + (key(s, 'act4.nell-said') === 'eleanor' ? ': Eleanor Linden.' : '.') + ' And in the spring, Holland Village, Nora’s kitchen, and the harbour wall at dusk, walked slowly, in flat shoes' + (!rafeCut(s) ? ', with a man a pace behind who does not speak' : '') + '.')];
}

function deliveryBlocks(s: GameState): Block[] {
  return [p('That month.'), ...positionLines(s), ...SLOANE_END[sloaneEnd18(s)]];
}

function deliveryChoices(s: GameState): C18Choice[] {
  const h = holders(s);
  const sw = (id: 'armed' | 'handed' | 'disarmed', label: string, hint: string, body: Block[]) =>
    offer('o18-switch-' + id, label, hint, 'consignee', (x) => {
      setKey(x, 'end.switch', id);
      if (id === 'handed') setKey(x, 'end.switch-to', h[0] ?? 'solicitor');
      setKey(x, 'end.position', aim(x) + '-' + terms(x));
      setKey(x, 'end.sloane', sloaneEnd18(x));
      return body;
    });
  return [
    sw('armed', 'Keep it armed', 'Ring every month. Forever, if you have to.', [p('You keep it armed. On the first of every month you ring each of them and say you are still here, and they say good, and that is all. It is a very small price for a very large silence.')]),
    sw('handed', h.length ? 'Hand it to ' + holderName[h[0]] : 'Hand it to the solicitor', 'Somebody else’s to hold.', [p(h.length ? 'You give ' + holderName[h[0]] + ' the other keys, and the list, and the date, and they take it the way you would take somebody’s child for an afternoon: carefully, and without asking why.' : 'You give the solicitor in Holborn the other keys, and he files them without reading them, which is exactly what you pay him for.')]),
    sw('disarmed', 'Disarm it', 'Burn the envelopes. You don’t need them now.', [p('You collect the envelopes, one by one, and burn them in the sink, and open the window, and the room over the water smells of smoke and paper for a day. You don’t need them now. That is the point of them.')]),
  ];
}

// ── The consignee: the people ──

function consigneeBlocks(s: GameState): Block[] {
  const cost = cost15(s);
  return [
    p('That season. The people, in the order they come to the door.'),
    ...(mayaIn(s) ? [p('Maya, the dinner she was promised, with wine at eleven in the morning, and her tabs, and the whole story told slowly, in order, from the beginning, and at the end she says only: “I’d have verified it. You did. I’m proud of the ledger.”')] : []),
    ...(irisIn(s) ? [p('Iris: a postcard with no message, from a coast you have never seen, a single word on it in felt-tip: SIGNED.')] : cost === 'ally' && key(s, 'c15.cost-who') === 'iris' ? [p('Iris, whose cover you spent, rings once from a station you don’t recognise. “Worth it,” she says, and means it, and neither of you says anything for a long time.')] : []),
    ...(marshIn(s) ? [p('Owen Marsh: his inquiry, reopened, with a box of files and a bicycle clip taped to the lid, and a note in his hand: “Going forward, you were right.”')] : cost === 'ally' && key(s, 'c15.cost-who') === 'marsh' ? [p('Owen Marsh, who lost his inquiry the week you spent him, and found it again, slowly, from a smaller office. “Worth it,” he says, on the phone, from his bicycle. “They can’t un-read it.”')] : []),
    ...(noraIn(s) ? [p('Nora, in Holland Village, with Nell’s photograph on the kitchen wall, and a second chair at the table that is always, by now, for you.')] : []),
    ...(cost === 'face' ? [p('Your face, in a paper that matters, with a caption that did not know your name. It was a week, and then it was a different week.')] : cost === 'money' ? [p('The money, spent, on lawyers and couriers and a locksmith. You are broke, and free, and the best bargain you ever made keeps its terms.')] : []),
    ...(rafeCut(s)
      ? [
          p('And on the iron stair, one morning, on the third step, in a plain envelope, a single sheet, folded once. You open it. It is blank. A sheet of ordinary paper, with nothing on it at all: no initial, no list, no price.'),
          t('The last page he will ever send me. The only one with nothing on it that I need to check.'),
        ]
      : [p('And Rafe, on the iron stair, with his hat in his hands, and a brown envelope held against his chest the way he has always held them.'), q('Rafe', 'I’ve got her file. The whole of the Jakarta business, a copy, from your drawer, the one you gave me. Nora asked me to bring it home. I’d like to take it, if you’ll let me. I’d also like to stay. I can’t do both, not properly, not yet. Tell me which, and I’ll know it was yours to say and not mine.')]),
  ];
}

function blankChoices(): C18Choice[] {
  const b = (id: 'keep' | 'post' | 'burn', label: string, hint: string, body: Block[]) =>
    offer('o18-blank-' + id, label, hint, 'consignee', (x) => {
      setKey(x, 'end.rafe', 'blank');
      setKey(x, 'c18.o-blank', id);
      return body;
    });
  return [
    b('keep', 'Keep it', 'In the ledger, under “R.”, with nothing to check.', [p('You file it in the ledger under R., at the back, in date order, the only page in it with the column on the right left empty on purpose.')]),
    b('post', 'Post it back, blank', 'To the number you no longer ring.', [p('You post it back to him, to the address you never learned, in a plain envelope, the sheet still blank, folded once. No note. It is the only reply either of you needed to send.')]),
    b('burn', 'Burn it', 'A page nobody needs to read.', [p('You burn it in the sink with a match, a page with nothing on it, and watch it curl and go, and open the window.')]),
  ];
}

function consigneeChoices(s: GameState): C18Choice[] {
  if (rafeCut(s)) {
    if (!key(s, 'end.rafe')) return blankChoices();
  } else if (!key(s, 'end.rafe')) {
    return [
      offer('o18-rafe-stay', 'Ask him to stay', 'The iron stair on Tuesdays. No crate.', 'consignee', (x) => {
        setKey(x, 'end.rafe', 'stays');
        return [
          q('You', 'Stay. Give her file to Nora in the post, and stay.'),
          p('He is silent for a long moment. Then he puts the hat on the step beside him, and the envelope on top of it, and sits down on the stair, with his back against the rail, like a man setting down something he has carried a great distance.'),
          q('Rafe', 'I’ll ring at 02:40. Every night I’m not here. Just to say nothing’s wrong. It’s the one thing I’m sure I can promise.'),
        ];
      }),
      offer('o18-rafe-home', 'Give him the file, and a ticket', 'Home to Nora. The Sunday ferry, a different Sunday.', 'consignee', (x) => {
        setKey(x, 'end.rafe', 'home');
        return [
          q('You', 'Take it home. It should have been taken years ago. I’ll buy the ticket.'),
          p('He looks at you for a long time, and nods, once, like a man receiving something rather than being sent. On the Sunday you see him to the ferry, a different ferry, a different Sunday, and he goes up the gangway with a brown envelope held to his chest, and at the top he turns, and takes his cap off, and does not put it back.'),
          q('Rafe', 'I’ll ring at 02:40. Once a month. Just to say nothing’s wrong.'),
        ];
      }),
    ];
  }
  const partners = eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian');
  const h = (id: 'rafe' | 'julian' | 'sebastian' | 'maya' | 'none', label: string, hint: string, body: Block[]) =>
    offer('o18-home-' + id, label, hint, 'docket', (x) => {
      setKey(x, 'end.with', id);
      return body;
    });
  return [
    ...(key(s, 'end.rafe') === 'stays' && nightOk(s, 'rafe') ? [h('rafe', 'Rafe', 'Who told you, and stayed, and never once made you her.', [p('You go home with Rafe, some nights, and the iron stair has two people on it on Tuesdays, and it is not a secret from anybody, least of all the river.')])] : []),
    ...partners.map((pt) => h(pt, pt === 'julian' ? 'Julian' : 'Sebastian', 'From before. As a partner, not a keeper.', [p(pt === 'julian' ? 'You go home to Julian’s, some nights, and to your own, others, and he never once asks which it will be.' : 'You go home with Sebastian, some nights, and he never asks what you do all day, and you never tell him, and it suits you both.')])),
    ...(mayaIn(s) ? [h('maya', 'Maya', 'Who was there before any of it.', [p('You go round to Maya’s on Fridays, and stay till Sunday, and the cat sleeps on your coat, and nobody in the flat has ever been a consignee.')])] : []),
    h('none', 'Nobody', 'Your own door, your own key.', [p('You go home to your own door, with your own key, and nobody waiting, and you find that you like the sound of the lock very much.')]),
  ];
}

// ── The docket: who she is now ──

function docketBlocks(): Block[] {
  return [
    p('The table under the wall, the last time. One grey carbon docket left in the drawer, the kind he carried, the kind that is signed when a thing is handed over: DELIVERED TO. And a box, at the foot: SIGNED FOR BY.'),
    t('Every page I have ever been handed had somebody else’s name in that box. This one is mine.'),
  ];
}

function docketChoices(): C18Choice[] {
  const n = (id: 'adrian' | 'evelyn' | 'new', label: string, hint: string, body: Block[]) =>
    offer('o18-name-' + id, label, hint, 'receipt', (x) => {
      setKey(x, 'end.name', id);
      return body;
    });
  return [
    n('adrian', 'Adrian Vale', 'The one before the catalogue.', [p('You write ADRIAN VALE in the box, in capitals, the way it was on the desk fourth from the end, and it looks, for the first time, like a name and not a file.')]),
    n('evelyn', 'Evelyn Vale', 'The one they sold. Yours now.', [p('You write EVELYN VALE in the box. They made it. You wore it. It is yours now, by use, the way a road becomes a right of way.')]),
    n('new', 'A new name', 'Yours. Nobody else needs to know it.', [p('You write a name in the box that nobody at Meridian, or Axiom, or anywhere else, has ever seen. It is short. You chose it yourself. Nobody else needs to know it.')]),
  ];
}

// ── The receipt: a year later ──

const RULES: [id: string, label: string, text: string, margin: string][] = [
  ['verify', 'Verify', 'I check before I act, and I say which pages I did not.', 'Checked. R.'],
  ['sign', 'Sign', 'I put my name to what I carry, and I carry only what I can put it to.', 'As promised.'],
  ['source', 'The source', 'No source is owed my silence, and none is owed my suspicion.', 'Fair. More than fair.'],
  ['people', 'The people', 'Nobody’s name is ever a price.', 'I’ll hold you to it. You’ll hold me.'],
  ['door', 'The door', 'I may leave at any time, and it will not be called desertion.', 'Took you long enough.'],
  ['name', 'The name', 'Nobody sells who I was.', 'Sealed. This time I didn’t read it.'],
];
const rulesTaken = (s: GameState) => (key(s, 'end.rules') ?? '').split(',').filter(Boolean);

function receiptBlocks(s: GameState): Block[] {
  const a = aim(s);
  const r = key(s, 'end.rafe');
  return [
    p(
      a === 'expose'
        ? 'A year later. The regulator’s report, published in the spring, two hundred pages and a very dull title, with your ledger in an appendix, every page signed. Meridian wounded in writing, and standing. You, with a desk of your own over a small shop that reads sources for people who cannot afford to doubt them.'
        : a === 'trade'
          ? 'A year later. A quiet life, a good flat above a shut-down shop, and in a drawer a signed undertaking nobody has ever asked to see. You have not had to use it once. That is how you know it works.'
          : a === 'cut'
            ? 'A year later. A desk of your own, three streets from the river, and a short list of things you can prove alone. It is a very short list. It is entirely yours.'
            : 'A year later. Holland Village, Nora’s kitchen, Nell’s photograph on the wall, and two sugars and cinnamon in your coffee, because somebody should go on taking it that way.',
    ),
    p(
      r === 'stays'
        ? 'At the foot of the iron stair, on a Tuesday, a knock. A man with no crate, and a paper bag of something from the good bakery, who does not ask whether he may come up.'
        : r === 'home'
          ? 'On the doormat, a postcard from Singapore: a hill, a kitchen window, a harbour wall at dusk. On the back, in a clear upright hand, a single line. “Nell’s file is in the kitchen drawer. Nora puts the kettle on at the wrong times. Nothing’s wrong. R.” And at 02:40 that night, the cheap phone, once, and stops.'
          : 'No postcard, no knock, no cheap phone. A man you cut loose, somewhere, living the life he has chosen. The room over the water keeps its own counsel, and so do you.',
    ),
    p('And a parcel, from a friend of Iris’s, in plain brown paper: Meridian’s new catalogue, the Autumn collection, glossy, a hundred and four pages. You look for the page where you were.'),
  ];
}

function catalogueChoices(): C18Choice[] {
  const c = (id: 'look' | 'burn' | 'sealed', label: string, hint: string, body: Block[]) =>
    offer('o18-catalogue-' + id, label, hint, 'receipt', (x) => {
      setKey(x, 'end.catalogue', id);
      return [...body, p('Then the evening, and a single sheet of paper, and the question of what a life’s rules are, now that the trade is over.')];
    });
  return [
    c('look', 'Look for page seven', 'Between six and eight.', [p('You turn to it. Page six, and then, without the least fuss, page eight. There is no page seven. There never will be. The binding, if you hold it to the light, has a very slight gap where it was.')]),
    c('burn', 'Burn it, unopened', 'You know what is not in it.', [p('You burn it in the sink, unopened, a hundred and four pages of glossy paper that burns badly and smells of perfume, and open the window.')]),
    c('sealed', 'Leave it in its paper', 'Nobody needs to look.', [p('You leave it in its brown paper on the kitchen table, unopened. You know what is not in it. That is the difference now: you don’t need them to tell you.')]),
  ];
}

function receiptChoices(s: GameState): C18Choice[] {
  if (!key(s, 'end.catalogue')) return catalogueChoices();
  const taken = rulesTaken(s);
  const r = key(s, 'end.rafe');
  const margins = r === 'blank';
  if (taken.length < 3)
    return RULES.filter(([id]) => !taken.includes(id)).map(([id, label, text, margin]) =>
      offer('o18-rule-' + id, label, text, 'receipt', (x) => {
        const next = [...rulesTaken(x), id];
        setKey(x, 'end.rules', next.join(','));
        const body: Block[] = [q('The page', text), q('The margin', margins ? 'Countersigned. E.V.' : margin)];
        if (next.length < 3) return body;
        return [...body, p(margins ? 'You write the last line yourself, along the foot of the page, in pencil, in your own small hand:' : 'You send it by the cheap phone’s one number, photographed, and by morning it comes back, pencilled in the margin by every line in a clear upright hand, and at the bottom:'), q('The margin', margins ? 'Signed. I checked.' : 'Countersigned. R.')];
      }),
    );
  const w = key(s, 'end.with') as Partner | 'maya' | 'none' | undefined;
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o18-later-' + id, label, hint, 'proof', (x) => {
      setKey(x, 'end.later', id);
      return body;
    });
  if (w === 'rafe' || w === 'julian' || w === 'sebastian') {
    const nm = partnerName[w];
    const open = key(s, 'end.later-open');
    if (open === 'invited')
      return [
        offer('o18-later-no-sex', 'Stay close, but not sex tonight', 'Kissing, touch, and stopping where you choose.', 'receipt', (x) => {
          setKey(x, 'end.later-open', 'no-sex');
          setKey(x, 'end.consent', 'no-sex');
          note(x, 'o-evening-consent', `Evelynn chose the night’s scope (no-sex); ${nm} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(nm, 'Then that’s tonight. You say stop, I stop. It’s on the page.')];
        }),
        ...(nightOk(s, w)
          ? [
              offer('o18-later-sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.', 'receipt', (x) => {
                setKey(x, 'end.later-open', 'sex');
                setKey(x, 'end.consent', 'sex');
                note(x, 'o-evening-consent', `Evelynn chose the night’s scope (sex); ${nm} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
                return [q(nm, 'Yes. And you say stop, it stops. Same for me. It’s on the page.')];
              }),
            ]
          : []),
        done('goodnight', 'Say goodnight', 'Leaving is complete and respected.', [p('You kiss him once at the door, and say goodnight, and he goes, and you stand at the window with the page in your hand and read it again.')]),
      ];
    if (open)
      return [
        done('stop', 'Stop here', 'Honoured immediately, without argument.', [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead, and the page lies on the table between the glasses.')]),
        done('close', 'Stay', 'Continue within what you chose.', open === 'sex'
          ? [p(w === 'rafe' ? 'He says your name, the one you wrote in the box, as if he has been practising it, and nothing else, and undoes your buttons one at a time, careful, and then, when you laugh at him for it, not careful at all, and asks once more, low, at your shoulder.' : 'He undoes your dress slowly enough that you could stop him at every inch, and asks once more, low, at your shoulder.'), p('You answer by pulling him down with you, in a room over the water that nobody has ever watched, and nothing in it owed to anybody. What happens next is yours and his. The scene fades.')]
          : [p('He kisses you by the window for a long time, and stops exactly where you said, and you stand there together in the dark, a year on, with the page on the table and nobody watching, and nothing owed in either direction.')]),
      ];
    return [
      offer('o18-later-invite', 'Tonight, with him', 'A chosen night. Heat 3, consent in character, fades.', 'receipt', (x) => {
        setKey(x, 'end.later-open', 'invited');
        return [q(nm, 'Tell me what you want tonight. That’s the only scope that matters in this room.')];
      }),
      done('quiet', 'The page, and the river', 'Sit up, and read it again.', [p('You sit up together with the page on the table between you and the river going by outside, and read it again, both of you, out loud, and laugh at the same line.')]),
    ];
  }
  return [
    ...(w === 'maya' ? [done('maya', 'Take it round to Maya’s', 'She will want to witness it.', [p('You take it round to Maya’s, and she witnesses it at the kitchen table in eyeliner pencil, and adds a tab, and the cat sits on it.')])] : []),
    done('own', 'The window, and black coffee', 'Nobody watching back.', [p('You pin the page to the wall and stand at the window with a cup of coffee, black, and watch the river, and nobody is watching you back.')]),
  ];
}

// ── Proof of delivery ──

function proofBlocks(s: GameState): Block[] {
  const name = key(s, 'end.name');
  const r = key(s, 'end.rafe');
  const line =
    name === 'adrian'
      ? 'My name is Adrian Vale. I carried a lie once, because somebody sent it. This time every page was signed, and one of them was me.'
      : name === 'evelyn'
        ? 'My name is Evelyn Vale. I was sent out unclaimed. I signed for myself.'
        : 'I wrote a name in the box marked SIGNED FOR BY, and pinned the docket to the wall. It is nobody’s business but mine. That is the whole point.';
  return [
    p('The wall over the table, the last time. The first card of this road is still in the middle of it: THE SENDER. And under it, in pencil, the question you pinned there on your first night off the books.'),
    q('The card', 'WHO IS HOLDING THE PAGE?'),
    p('You answer it in ink, underneath.'),
    q('The card', 'I AM.'),
    p('And beside it, the second card, in the same hand:'),
    q('The card', 'THE SOURCE.'),
    q('The card', r === 'stays' ? 'RAFE LIM. ON THE STAIR, TUESDAYS.' : r === 'home' ? 'RAFE LIM. HOME.' : 'NOBODY. A BLANK PAGE.'),
    p('At the bottom, across both of them, the way a courier closes a docket, you write three words and a date.'),
    q('The card', 'PROOF OF DELIVERY.'),
    t(line),
    { kind: 'notice', text: 'The end of the Outside route.' },
  ];
}

export function outsideBlocks18(s: GameState): Block[] {
  if (s.phase === 'dispatch') return dispatchBlocks(s);
  if (s.phase === 'delivery') return deliveryBlocks(s);
  if (s.phase === 'consignee') return consigneeBlocks(s);
  if (s.phase === 'docket') return docketBlocks();
  if (s.phase === 'receipt') return receiptBlocks(s);
  if (s.phase === 'proof') return proofBlocks(s);
  return [];
}

export function outsideChoices18(s: GameState): C18Choice[] {
  if (s.phase === 'dispatch') return dispatchChoices(s);
  if (s.phase === 'delivery') return deliveryChoices(s);
  if (s.phase === 'consignee') return consigneeChoices(s);
  if (s.phase === 'docket') return docketChoices();
  if (s.phase === 'receipt') return receiptChoices(s);
  return [];
}
