/** Chapter 11 (Institutional route, lane id `institutional`) · The Receipt:
 * threshold → catalogue → receipt → countersign → ride → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_11_THE_RECEIPT_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_11_SCRIPT.md. The shared "The Asset" Vesper night in
 * Institutional framing: Axiom, the client, walks into the shop it has bought from for three years, and its officer of
 * record sees the catalogue with her own operative's page in it. Arrival with Sloane in black (stay beside / work the
 * room / watch her watch them). Iris Moreau, ending (warn / "I'm an operative too" / quiet). The book: E.V. (II) · AXIOM ·
 * AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY (let Sloane see / close / turn the page); "Axiom didn't authorise that."
 * The order on the balcony: the receipt for CANDIDATE 9C (Priya, from Adrian's floor), for Sloane to countersign (bring
 * it / warn her / refuse; refusal costs Celeste's letter to Axiom's board, the seed of Ch14's inquiry). The placement date
 * is never moved. The ride home; Singapore as an Axiom tasking. The night. Entered from an Institutional
 * `chapter10.complete`; hands on to the Ch14 bridge. Keys `inst.*`, `c11.i-*`; ids carry `i11-`.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. The car there (c11.i-car = why | well | window:
 * "Because Axiom has been invited to a funeral and hasn't been told whose."; "Don't. … Thank you."; or the window). A
 * dance on the floor before the powder room (c11.i-dance = accept | decline: a client who dances like a man counting
 * money, and what she learns about "the good ones being extended"; or no). The cloakroom after the signing, Iris leaving
 * on Halvorsen's arm (c11.i-cloak = number | coat | go: her number on the back of a cloakroom ticket, "if you ever need
 * out"; Iris's coat held for her, and a whispered name; or let her go). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C11Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get11 = (s: GameState, k: string) => s.choices['c11.' + k];
const set11 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c11.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C11Choice['apply']): C11Choice => ({ id: 'chapter11.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get11(s, 'rec.' + k) !== undefined) return;
  set11(s, 'rec.' + k, String(s.history.length));
  set11(s, 'event.' + k, String(s.revision));
  set11(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c11.' + k);
  s.knowledge.push('c11.' + k);
}

export const INSTITUTIONAL_PHASES11 = ['threshold', 'catalogue', 'receipt', 'countersign', 'ride'] as const;
export const isInstitutional11 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase11 = (s: GameState) => isInstitutional11(s) && ((INSTITUTIONAL_PHASES11 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const pen = (s: GameState) => key(s, 'inst.pen11') as 'signed' | 'warned' | 'refused' | undefined;
const told = (s: GameState) => !!key(s, 'inst.daniel-told');
type Partner = 'julian' | 'sebastian' | 'daniel';
const partners = (s: GameState): Partner[] => [
  ...(told(s) ? (['daniel'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian', daniel: 'Daniel' };

export function placeInstitutional11(s: GameState): string | undefined {
  if (s.phase === 'catalogue' && get11(s, 'i-iris')) return '21:40 · The anteroom';
  const open = get11(s, 'i-night-open');
  if (s.phase === 'ride' && open) return open.startsWith('daniel') ? 'Late · Daniel’s flat, above the launderette' : open.startsWith('julian') ? 'Late · Julian’s apartment' : open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · A hotel round the corner from the Harbour';
}

// ── The entry ──

export function beginInstitutional11(): C11Choice {
  return offer('begin-institutional', 'The first Thursday', 'Axiom has been invited. Bring your operative.', 'threshold');
}

// ── The threshold ──

function thresholdBlocks(): Block[] {
  return [
    p('The first Thursday, eight o’clock. Axiom’s car, the long black one the directorate keeps for funerals and ministers, with Sloane already in the back of it. She is in black. You have never seen her in anything but graphite.'),
    q('You', 'You look —'),
    q('Sloane', 'Like an officer at a party. Don’t.'),
  ];
}

function carChoices(): C11Choice[] {
  const c = (id: 'why' | 'well' | 'window', label: string, hint: string, body: Block[]) =>
    offer('i11-car-' + id, label, hint, 'threshold', (x) => {
      set11(x, 'i-car', id);
      return [...body, ...arrivalBlocks(x)];
    });
  return [
    c('why', '“Why black?”', 'She has never once worn it.', [q('You', 'Why black?'), q('Sloane', 'Because Axiom has been invited to a funeral and hasn’t been told whose. I thought one of us should dress for it.')]),
    c('well', '“You look well.”', 'Say it anyway.', [q('You', 'You look well. In black. I’m saying it anyway.'), p('She looks out of the window for the length of a street.'), q('Sloane', 'Don’t.'), p('And then, at the next lights, without turning her head:'), q('Sloane', 'Thank you.')]),
    c('window', 'Watch the river', 'Say nothing the whole way.', [p('You watch the river go by, black and slow, the whole length of the Embankment, and neither of you says anything, and it is not uncomfortable, which is its own kind of problem.')]),
  ];
}

function arrivalBlocks(s: GameState): Block[] {
  const log = key(s, 'inst.log10');
  return [
    p('The Vesper on the Embankment: the black glass front with no name on it, the doorman who says “Good evening, Director,” as if he has been saying it for years, and the long room beyond, where the frames on the walls are empty and lit as if they held something worth looking at.'),
    p('Celeste receives Axiom at the top of the room, in cream, with both hands.'),
    q('Celeste Laurent', 'Victoria. At last. Three years, and you never once came to see the shop. And you brought her.'),
    ...(log === 'gave' ? [q('Celeste Laurent', 'You’ve been such a help, darling. Fridays have never been so restful.')] : log === 'doctored' ? [q('Celeste Laurent', 'One of your Fridays had a little mistake in it, darling. Tuesday. Poor Elias stood in a corridor for forty minutes. Everybody makes one.')] : log === 'refused' ? [q('Celeste Laurent', 'Pity about your budget, Victoria. These things happen.')] : []),
    p('And then the clients, in their black ties and their good jewellery, talking pleasantly over your head about placements and seasons and availability, about a reissue that has performed beyond forecast, about “the Axiom piece”, in front of the woman who pays for it. Sloane hears every word. Her face does not move. Her hand, on the stem of her glass, has gone white at the knuckles.'),
  ];
}

function thresholdChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'i-car')) return carChoices();
  const r = (id: 'beside' | 'work' | 'watch', label: string, hint: string, body: Block[]) =>
    offer('i11-room-' + id, label, hint, 'catalogue', (x) => {
      setKey(x, 'inst.room11', id);
      return [...body, ...danceLead];
    });
  return [
    r('beside', 'Stay beside her', 'Let them say it to both of you.', [p('You stay at her shoulder all through the first hour, not touching, a hand’s width away, and every time a client says “the Axiom piece” you look at him until he stops, and after the third one Sloane says, very quietly, without turning her head, “Thank you.”')]),
    r('work', 'Work the room', 'Adrian was good at rooms. So are you.', [p('You leave her and work the room, the way Adrian worked a conference: a question here, a laugh there, a glass refilled. A shipping man called Halvorsen, pink and pleased with himself, tells you that the autumn collection is in the anteroom, “if you want to see yourself in print,” and winks.')]),
    r('watch', 'Watch her watch them', 'From across the room.', [p('You go to the far wall, under an empty frame, and watch Sloane watch them: the officer of record in a room full of the product’s buyers, taking notes in her head, every name, every face, and never once letting them see her do it.')]),
  ];
}

// ── The catalogue ──

const danceLead: Block[] = [
  p('At nine a quartet in the corner starts something slow, and a man with a shipping fortune and a signet ring comes across the floor to you with his hand already out, as if the answer were in the catalogue.'),
];

function danceChoices(): C11Choice[] {
  const d = (id: 'accept' | 'decline', label: string, hint: string, body: Block[]) =>
    offer('i11-dance-' + id, label, hint, 'catalogue', (x) => {
      set11(x, 'i-dance', id);
      return [...body, ...powderBlocks];
    });
  return [
    d('accept', 'Dance with him', 'Let him lead. Listen.', [
      p('You let him lead, for a song. He dances like a man counting money, beautifully and without pleasure, and tells you, his mouth near your ear, in the tone of a man recommending a restaurant, that placements are usually for a season, “and the good ones are extended.”'),
      p('Over his shoulder, across the room, Sloane is watching the two of you with no expression at all, which on her is the loudest expression there is.'),
      t('The good ones are extended. I am learning the vocabulary of my own sale, one song at a time.'),
    ]),
    d('decline', 'Decline', '“I don’t dance at work.”', [q('You', 'I don’t dance at work.'), p('He laughs, as if you had said something charming, and goes to find somebody who does.')]),
  ];
}

const powderBlocks: Block[] = [
  p('At a quarter past nine, in the powder room, a woman at the next mirror in grey silk, perhaps thirty-five, very still, meets your eyes in the glass.'),
  q('Iris Moreau', 'They put you on the list too. I can always tell.'),
  p('Iris Moreau. Halvorsen’s chief of staff, four years. She says it the way you would say a rank. And she looks at you in the mirror, and you look at her, and neither of you says the other word, the one underneath.'),
];

function catalogueChoices(s: GameState): C11Choice[] {
  if (!get11(s, 'i-dance')) return danceChoices();
  if (!get11(s, 'i-iris')) {
    const i = (id: 'warned' | 'told' | 'quiet', label: string, hint: string, body: Block[]) =>
      offer('i11-iris-' + id, label, hint, 'catalogue', (x) => {
        set11(x, 'i-iris', id);
        setKey(x, 'inst.iris11', id);
        return [...body, ...bookBlocks];
      });
    return [
      i('warned', '“Your page says ending.”', 'She should hear it first.', [q('You', 'I haven’t seen the book yet. But I think your page says ending. You should hear it from somebody first.'), p('She closes her eyes for a count of three, and opens them, and finishes her lipstick with a hand that does not shake.'), q('Iris Moreau', 'Thank you. Nobody ever tells you first.')]),
      i('told', '“I’m an operative too.”', 'Axiom’s. On the books.', [q('You', 'I’m an operative. Axiom’s. On the books, with a file number and a handler.'), q('Iris Moreau', 'On the books. God. How honest of them.'), p('She laughs, the real laugh, and for a moment the two of you are just two women from two machines in a powder room, and it is almost friendship.')]),
      i('quiet', 'Say nothing', 'Let the mirror say it.', [p('You say nothing. She says nothing. In the mirror you are two women in good dresses, and the mirror says the rest.')]),
    ];
  }
  const b = (id: 'seen' | 'closed' | 'turned', label: string, hint: string, body: Block[]) =>
    offer('i11-book-' + id, label, hint, 'receipt', (x) => {
      setKey(x, 'inst.book11', id);
      return body;
    });
  return [
    b('seen', 'Let her see it', 'Your own page, and whose client you are.', [
      p('You don’t close it. Sloane stands beside you and reads your page, all of it, twice, the way she reads everything.'),
      q('Sloane', 'Available for placement. Axiom didn’t authorise that.'),
      q('You', 'I know.'),
      q('Sloane', 'We own the product. That’s what the contract says. That is what I signed.'),
      p('She says it to the page, not to you, and her voice does something you have never heard it do: it goes quiet in the wrong place.'),
    ]),
    b('closed', 'Close the book', 'Not in front of her. Not yet.', [p('You close the book before she reaches it. She looks at your hand flat on the cover, and at your face, and does not ask, and you know she will ask later, in a car, with the reading light on.')]),
    b('turned', 'Turn to another page', 'Iris’s. Let her read that instead.', [p('You turn the page before she reaches you, to Iris’s: I. M. · HALVORSEN · FOUR YEARS · ENDING. Sloane reads it over your shoulder, and her mouth goes thin, and she says nothing, and you stand there together looking at a word that means a person.')]),
  ];
}

const bookBlocks: Block[] = [
  p('The anteroom, after. On a lectern under a single lamp, a book bound in grey cloth: The Autumn Collection. Pages of photographs and neat type, the way a gallery catalogues a sale.'),
  p('Iris’s page. And yours, three pages on: the photograph from your file, and under it, in the same neat type as everybody else’s: E. V. (II) · AXIOM · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH.'),
  p('Behind you, a footstep you know. Sloane has come to find you.'),
];

// ── The receipt ──

function receiptBlocks(): Block[] {
  return [
    p('Quarter past ten. The balcony over the canal, the water black and slow below, and Celeste with a cream folder under her arm, flagged in green on the last page.'),
    q('Celeste Laurent', 'A small thing, darling. Axiom is taking delivery of something new. It’s been in the works since the spring. Victoria needs to countersign the receipt, tonight, in my house, so that it feels like an occasion.'),
    p('You open it. A receipt, on Meridian’s cream paper, for a product. CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE. A photograph of a woman in her late twenties with a careful fringe and a lanyard, whom you know, because you walked past her desk by the far window every morning for three years, and because she got Adrian’s promotion.'),
    p('Priya.'),
    q('Celeste Laurent', 'Bring it to her. Stand beside her. She signs what you bring her now. Everybody’s noticed.'),
    t('The machine has already chosen the next one. From my floor. From the desk by the far window. And it wants my handler’s signature on her, in my hand.'),
  ];
}

function receiptChoices(): C11Choice[] {
  const r = (id: 'signed' | 'warned' | 'refused', label: string, hint: string, body: Block[]) =>
    offer('i11-pen-' + ({ signed: 'bring', warned: 'warn', refused: 'refuse' } as const)[id], label, hint, 'countersign', (x) => {
      setKey(x, 'inst.pen11', id);
      note(x, 'i-9c', 'Meridian’s next product for Axiom is CANDIDATE 9C: Priya, an analyst in Strategic Intelligence. Celeste Laurent asked Evelynn to bring Victoria Sloane the receipt to countersign at the Vesper.', 'The receipt in the cream folder, on the Vesper balcony');
      return body;
    });
  return [
    r('signed', 'Take the folder', 'Bring it to her. Stand beside her.', [p('You take the folder. It weighs nothing. Celeste hands you a pen from her own bag, black and gold and heavy, a good pen, and touches your elbow, once, as you go in.')]),
    r('warned', 'Take the folder, and warn her on the stairs', '“Don’t sign anything tonight.”', [p('You take the folder and the good pen, and go in the long way, by the back stairs, where Sloane has gone to stand by an open window for air.'), q('You', 'Don’t sign anything tonight. Not from Celeste. Not from me. Not from anybody.'), p('Sloane looks at the folder under your arm, and at your face, and nods, once.')]),
    r('refused', 'Hand the folder back', '“Get somebody else to carry it.”', [q('You', 'Get somebody else to carry it.'), q('Celeste Laurent', 'Of course, darling. Elias is here somewhere. He’s always here somewhere.'), p('She takes the folder back without the slightest sign of disappointment, and you know from that exactly how much it will cost, and whom.')]),
  ];
}

// ── The countersignature ──

function countersignBlocks(s: GameState): Block[] {
  const pn = pen(s);
  if (pn === 'signed')
    return [
      p('Twenty to eleven, the long room. You cross it with the folder and the good pen, through the clients and the empty frames, and put the folder on the little table in front of Sloane, and stand beside her.'),
      p('She looks at the photograph for a long time. Then at you. Then she takes the pen, and signs, V. SLOANE, OFFICER OF RECORD, in the neat upright hand you know from a hundred margins, because you brought it, and because it has been in the works since the spring, and because, you will understand later, she thinks that if it is going to happen anyway she would rather it happened under her name, where she can watch it.'),
      p('Across the room Celeste raises her glass to you both, half an inch.'),
      ...cloakLead,
    ];
  if (pn === 'warned')
    return [
      p('Twenty to eleven, the long room. You put the folder on the little table in front of Sloane, and the good pen beside it, and stand beside her.'),
      p('She reads it, all of it, and closes it, and puts the pen on top of it, capped.'),
      q('Sloane', 'Not tonight. Axiom doesn’t sign for deliveries at parties. Send it to my office, Celeste. I’ll read it twice.'),
      p('Across the room Celeste smiles, and lifts her glass an inch, and you cannot tell whether she is angry, or delighted, or both, and neither, you suspect, can she.'),
      ...cloakLead,
    ];
  return [
    p('Twenty to eleven, the long room. Benton finds the folder where Celeste left it, and brings it to Sloane himself, with a good pen, smiling, in front of the clients.'),
    p('She looks at the photograph, and at him, for a long time.'),
    q('Sloane', 'Not for you, Elias. Not tonight. Not ever, I think.'),
    p('Benton smiles and takes the folder away. On Monday a letter goes from Meridian to the chair of Axiom’s board, regretting certain irregularities it has observed in the conduct of Executive Intelligence, and wondering whether a formal review might be in everybody’s interest.'),
    t('She didn’t sign it. She paid for that, and so will I. The inquiry has a start date now. It just doesn’t know it yet.'),
    ...cloakLead,
  ];
}

const cloakLead: Block[] = [
  p('Half past eleven, the cloakroom. Iris Moreau is there before you, in a long grey coat, with Halvorsen at the door checking his phone, and she is looking at nothing, very steadily, the way you look at nothing when you have just read a word about yourself.'),
];

function countersignChoices(): C11Choice[] {
  const c = (id: 'number' | 'coat' | 'go', label: string, hint: string, body: Block[]) =>
    offer('i11-cloak-' + id, label, hint, 'ride', (x) => {
      set11(x, 'i-cloak', id);
      return body;
    });
  return [
    c('number', 'Give her your number', 'On the back of a cloakroom ticket.', [p('You write your own number, the real one, on the back of your cloakroom ticket, and fold it into her hand when you pass her.'), q('You', 'If you ever need out. Any hour. It answers.'), p('She closes her hand on it without looking down, and follows Halvorsen out into the rain, and at the door she looks back, once.')]),
    c('coat', 'Hold her coat for her', 'And say one word, low.', [p('You take her coat from the attendant before she can, and hold it for her, and as she puts her arms into it you say, very low, by her ear, a single word: “Singapore.”'), p('She goes still inside the coat for a heartbeat. Then she buttons it, and thanks you, as if you had done nothing but hold a coat.')]),
    c('go', 'Let her go', 'It isn’t yours to stop.', [p('You let her go. She passes you in the doorway with Halvorsen’s hand at her back, and does not look at you, and you understand that she is protecting you, or herself, and that it comes to the same thing tonight.')]),
  ];
}

// ── The ride ──

function rideBlocks(): Block[] {
  return [
    p('Midnight. Axiom’s car, the black one, the Embankment going by. Sloane sits with her hands in her lap and does not turn on the reading light.'),
    q('Sloane', 'I have bought from that house for three years and never been inside it. I thought it was a vendor. It’s a shop. And I’m a customer. And you were in the window.'),
  ];
}

function rideChoices(s: GameState): C11Choice[] {
  if (!key(s, 'inst.ride11')) {
    const r = (id: 'shop' | 'singapore' | 'party', label: string, hint: string, body: Block[]) =>
      offer('i11-ride-' + id, label, hint, 'ride', (x) => {
        setKey(x, 'inst.ride11', id);
        return [...body, q('Sloane', 'Singapore wants you next month. Axiom’s desk there. A tasking I’ll write myself, about the first one. Her city. Backup: me.'), t('Her city. The woman in the ivory jacket. Retired.')];
      });
    return [
      r('shop', '“A shop. I was in the window.”', 'Say it plainly.', [q('You', 'A shop. I was in the window. So was Iris. So, next month, is Priya.'), p('She closes her eyes for a moment.')]),
      r('singapore', '“Ask me in Singapore.”', 'Not here. Not yet.', [q('You', 'Ask me in Singapore.'), q('Sloane', 'How did you know about Singapore?'), q('You', 'I didn’t. I do now.')]),
      r('party', '“A party.”', 'Let it be a party for one more night.', [q('You', 'A party.'), p('She almost laughs. It isn’t quite a laugh. It is close enough that you both hear it.')]),
    ];
  }
  const open = get11(s, 'i-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i11-night-' + id, label, hint, 'complete', (x) => {
      set11(x, 'i-night', id);
      return body;
    });
  if (open && !open.endsWith('-room') && open !== 'maya') {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('i11-' + pt + '-' + id, label, hint, 'ride', (x) => {
        set11(x, 'i-night-open', pt + '-room');
        set11(x, 'i-night-scope', id);
        note(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s tonight. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('i11-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c11.i-night-open'];
        set11(x, 'i-night-outcome', 'declined');
        return [p('You say goodnight at his door and mean it, and he lets you go without a question.')];
      }),
    ];
  }
  if (open && open.endsWith('-room')) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get11(s, 'i-night-scope') as 'no-sex' | 'sex';
    return [
      offer('i11-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c11.i-night-open'];
        set11(x, 'i-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead.')];
      }),
      offer('i11-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c11.i-night-open'];
        set11(x, 'i-night-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p(pt === 'daniel' ? 'He undoes the dress you wore to be looked at, slowly, and looks at you as if nobody ever has, and asks once more. You answer by pulling him down with you.' : 'He undoes the dress you wore to be looked at, and asks once more, low, at your shoulder. You answer by pulling him down with you.'), p('What happens next is chosen, and nobody’s catalogue. The scene fades.')]
          : [p('He kisses you by the window and stops exactly where you said, and holds you there, in a dress somebody else chose for a room full of buyers, until it is only a dress again.')];
      }),
    ];
  }
  return [
    ...(told(s) ? [] : [done('daniel', 'The Feathers', 'Last orders. Daniel is still there.', [p('You get out of Axiom’s car at the Feathers at ten to midnight, in a dress worth more than the pub, and Daniel is at the corner table with the last of a pint, and stands up so fast he knocks it over.'), q('Daniel', 'Where have you been? No. Don’t tell me. Sit down. I’ll get another.'), p('You don’t tell him. You tell him about Priya, instead, as a colleague, as much as you can, and he goes very still.')])]),
    ...partners(s).map((pt) =>
      offer('i11-night-' + pt, pt === 'daniel' ? 'Daniel' : pt === 'julian' ? 'Julian' : 'Sebastian', pt === 'daniel' ? 'He knows exactly who you are.' : 'His place.', 'ride', (x) => {
        set11(x, 'i-night', pt);
        set11(x, 'i-night-open', pt);
        return pt === 'daniel'
          ? [p('Daniel’s flat above the launderette at half past twelve, and Daniel in the doorway in a jumper, looking at the dress.'), q('Daniel', 'You look like somebody tried to sell you. Come in. Tell me what you want tonight. Nobody’s buying anything.')]
          : [q(partnerName[pt], 'You look like you’ve been somewhere nobody should go. Come in. Tell me what you want tonight, and that’s what happens.')];
      }),
    ),
    ...(key(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Maya', 'Compliance should know about 9C.', [p('Maya’s kitchen at one in the morning. You tell her about the receipt, and the photograph, and she puts her glass down very carefully.'), q('Maya', 'Priya. She sits by the far window. She brought me a birthday card. I’m going to need to think about who I tell, and in what order, and what I can prove.')])]
      : []),
    done('alone', 'Home, alone', 'The dress on the chair.', [p('You take the dress off and put it over the back of a chair, and sit on the floor in your slip under the green light in the hall, and think about a woman by a window who doesn’t know yet.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const pn = pen(s);
  return [
    ...(get11(s, 'i-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The dress is somewhere you did not leave it. You find you do not care.')] : []),
    p('The wardrobe door. A new card, in capitals:'),
    q('The card', 'THE VESPER. AVAILABLE FROM THE FIRST THURSDAY OF NEXT MONTH.'),
    p('And under it:'),
    q('The card', '9C · PRIYA. ' + (pn === 'signed' ? 'SIGNED. HER NAME, MY HAND.' : pn === 'warned' ? 'NOT TONIGHT.' : 'REFUSED. THE LETTER GOES MONDAY.')),
    p('And beside it, a third: SINGAPORE. HER CITY.'),
    ...(get11(s, 'i-cloak') === 'number' ? [p('And in the corner, very small: IRIS HAS MY NUMBER.')] : []),
    t('I have been in the window. Now I have seen who is next in it. That changes what I am for.'),
  ];
}

export function institutionalBlocks11(s: GameState): Block[] {
  if (s.phase === 'threshold') return thresholdBlocks();
  if (s.phase === 'catalogue') return [];
  if (s.phase === 'receipt') return receiptBlocks();
  if (s.phase === 'countersign') return countersignBlocks(s);
  if (s.phase === 'ride') return rideBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices11(s: GameState): C11Choice[] {
  if (s.phase === 'threshold') return thresholdChoices(s);
  if (s.phase === 'catalogue') return catalogueChoices(s);
  if (s.phase === 'receipt') return receiptChoices();
  if (s.phase === 'countersign') return countersignChoices();
  if (s.phase === 'ride') return rideChoices(s);
  return [];
}
