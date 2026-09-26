/** Chapter 17 (Act IV, own-power played as the Celebrity route) · The Room:
 * opening → defect → sloane → turn → nell → vote → complete.
 * Design: docs/story/CHAPTER_17_THE_ROOM_DESIGN.md (owner-approved 2026-09-26, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_17_THE_ROOM_SCRIPT.md. Gated behind chapter17Playable(), reached from an
 * own-power Chapter 16 ending (the long room, Celeste standing). The endgame's `confront` (ENDGAME_RECONVERGENCE §7):
 * one room, one hour at the Meridian board table. Celeste presents the product; the first card lands (act4.first); the
 * ORACLE defect argued in front of its signatories (act4.press); Sloane's motive resolved in front of the board, and
 * what she is to Evelynn there (act4.sloane = vouch | stand | use); Celeste's last move, an offer of a seat at the
 * table (refusable, never acceptable on this route), and the held card landing on it (act4.held); Nell's death told
 * (the Jakarta order hers; the car Nell would not get into; the harbour wall; the driver who did not stop; the call to
 * Nora at seven) and her name said or not (act4.nell-said); the board's decision scaled by the case (board17: Meridian
 * wounded, never toppled); and one minute alone with Celeste and a white orchid (act4.last). Nothing sexual on screen;
 * no coercion; the free-agent core, thin and alone, still gets the room, the truth and the walk out.
 * Deepening pass (2026-09-26): the board members given voices (the heavy man, the woman in pearls, Deverell at length);
 * Marguerite Soames's one question after the defect (act4.soames = yes | no | brief: "Did you choose it?"); the crew
 * speaking in the room after the offer, or held back, or, alone, standing up (act4.crew-beat = speak | hold | stand);
 * and a slower last minute. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { getKey, setKey } from './chapter7-model';

export type C17Scene = { title: string; place: string; blocks: Block[] };
export type C17Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const offer17 = (id: string, label: string, hint: string, next: string, apply?: C17Choice['apply']): C17Choice => ({
  id: 'chapter17.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter17Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER17 === '1';

export const chapter17Definitions: Record<string, C17Scene> = {
  opening: { title: 'The Product', place: '18:00 · THE LONG ROOM', blocks: [] },
  defect: { title: 'The Defect', place: '18:15 · THE BOARD TABLE', blocks: [] },
  sloane: { title: 'The Officer of Record', place: '18:25 · THE BOARD TABLE', blocks: [] },
  turn: { title: 'The Offer', place: '18:40 · THE BOARD TABLE', blocks: [] },
  nell: { title: 'Eleanor', place: '18:50 · THE BOARD TABLE', blocks: [] },
  vote: { title: 'The Board', place: '19:00 · THE LONG ROOM', blocks: [] },
  complete: { title: 'The Front Door', place: '19:10 · THE EMBANKMENT', blocks: [] },
};
export const chapter17Scenes = Object.entries(chapter17Definitions).map(([phase, scene]) => ({
  id: `chapter17.${phase}` as NodeId,
  ...scene,
}));

// ── What she walked in with ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const inside = (s: GameState) => (getKey(s, 'act4.inside') ?? '').split(',').filter((x) => x && x !== 'none');
const isIn = (s: GameState, who: string) => inside(s).includes(who);
const hasVerdict = (s: GameState) => getKey(s, 'act3.verdict') === 'retaken' || (c(s, 'c14.file') === 'yes' && c(s, 'c14.copy') !== 'no');
const caseOf = (s: GameState) => (getKey(s, 'act4.case') ?? 'thin') as 'thin' | 'supported' | 'strong' | 'overwhelming';

/** The board's decision, from what is on the table and who is watching. Meridian always stands (ENDGAME §8). */
export function board17(s: GameState): { board: 'resigned' | 'diminished' | 'closed'; terms: 'full' | 'partial' | 'none' } {
  const order = ['thin', 'supported', 'strong', 'overwhelming'];
  let level = order.indexOf(caseOf(s));
  // Pressure from outside the room: a camera at the door, or a street that saw her go in.
  if ((getKey(s, 'act4.outside') === 'theo' || getKey(s, 'act4.seen') === 'yes') && level < 2) level += 1;
  // Sloane made the proof, in front of them, moves the room.
  if (getKey(s, 'act4.sloane') === 'use' && level < 3) level += 1;
  if (level >= 2) return { board: 'resigned', terms: 'full' };
  if (level === 1) return { board: 'diminished', terms: 'partial' };
  return { board: 'closed', terms: 'none' };
}

/** What Celeste says, when the name is asked for. */
export const nellSaid17 = (s: GameState): 'eleanor' | 'evie' => {
  const named = getKey(s, 'act4.named');
  if (named === 'nora' || named === 'wait') return 'eleanor';
  return ['strong', 'overwhelming'].includes(caseOf(s)) ? 'eleanor' : 'evie';
};

// ── The Product ──

function openingBlocks(s: GameState): Block[] {
  const wear = getKey(s, 'act4.wear');
  return [
    p('Celeste speaks first. Of course she does. She stays standing, one hand resting on the closed catalogue with the orchid across it, and turns to the board, and speaks to them warmly, the way she spoke to a room of clients on the first Thursday, as if she were showing them a painting she had been lucky enough to find.'),
    q('Celeste', 'Anton. Marguerite. Gentlemen. You will remember the Eve product: the reissue, the public profile, the Aster campaign. You will remember that the controllability characteristic was noted at acquisition, and priced in. I am happy to tell you it has performed beyond every forecast. It has performed so well, in fact, that it has asked to address the board.'),
    p('She turns to you, and smiles, and says your catalogue number, and then, as if correcting a small slip, your name.'),
    q(
      'Celeste',
      wear === 'black' ? 'Black. You did dare.' : wear === 'grey' ? 'Iris’s grey. How very loyal of you.' : 'The green. You kept it. I knew you would.',
    ),
    p('Six faces turn to you. Deverell’s, closed as a ledger. Soames’s, over the top of her glasses, already reading. The heavy man with the signet ring, the woman in pearls with her empty notebook, the young man with the laptop who looks as if he would like to be anywhere else on earth.'),
    q('The heavy man', 'Is this strictly necessary, Celeste? I have a car at seven.'),
    q('Celeste', 'Everything I do is strictly necessary, Hugo. That is why you pay me.'),
    p('The woman in pearls writes the date at the top of her empty page, very neatly, and underlines it, and waits.'),
    ...(inside(s).length
      ? [p(`Behind you, on the two chairs by the wall, ${inside(s).map((w) => ({ sloane: 'Sloane', nora: 'Nora', marsh: 'Owen', maya: 'Maya', iris: 'Iris', julian: 'Julian' })[w as 'sloane']).join(' and ')}. You do not look round. You can feel them there, the way you feel a wall at your back in the dark.`)]
      : [p('Behind you, nobody. The two chairs by the wall are empty. You chose that. You can feel it at your back, the way you feel a draught.')]),
    t('The case under my arm. The card against my ribs. The first thing I put down tells them who I am.'),
  ];
}

const firstLands: Record<string, Block[]> = {
  verdict: [
    p('You put the verdict on the table in front of Deverell, turned so that he can read it: the two numbers, and under them the sign-off, and the three signatures. Marguerite Soames reaches for her glasses before he has touched it.'),
  ],
  nell: [
    p('You put Nell’s order on the table: cream paper, the Meridian mark, a release of a true name to named parties in Jakarta, and one signature. C. Deverell reads it, and then, for the first time since you came in, he looks at Celeste.'),
  ],
  cards: [
    p('You put a housekeeping bag on the table and tip it out: small labelled envelopes, dozens of them, memory cards, sliding across the polished wood. The young man with the laptop goes white before anybody has said what they are. He knows. He has catalogued them.'),
  ],
  page: [
    p('You put page seven on the table, torn along the spine: your own face, and “available for placement from the first Thursday of next month”. Then you move the orchid off the catalogue in front of Celeste, and open it, and lay the page back in the gap where it came from. It fits exactly.'),
  ],
  phone: [
    p('You put the black phone on the table and switch it on, and read out the first message it ever received, and then the second, and then one from after the Claremont, in her own words, to her own board, in a flat clear voice, until Deverell holds up his hand.'),
  ],
  adrian: [
    p('You put a thick folder on the table, and do not open it, and say what is in it: a man. Thirty-four. Eleven years at Axiom. A clinic, a fitting, a receipt. The room learns, all at once, what its product is made of.'),
  ],
  ashby: [
    p('You put your phone on the table and play eleven seconds of a tired man in a bar full of fans in Singapore: “It came down from upstairs. From a friend of hers.” Nobody at the table asks who Ashby is. They all know.'),
  ],
};

function openingChoices(): C17Choice[] {
  const open = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('open-' + id, label, hint, 'defect', (x) => {
      setKey(x, 'act4.open', id);
      return [...body, ...(firstLands[getKey(x, 'act4.first') ?? 'page'] ?? firstLands.page)];
    });
  return [
    open('room', 'Speak to the board', '“I’m the product. I’d like to read you the warranty.”', [
      q('You', 'I’m the product. Ms Laurent is right about that. I’d like to read you the warranty.'),
      p('The heavy man with the signet ring laughs, once, before he can stop himself. Nobody else does. Celeste sits down, slowly, to listen, the way you would sit down in a theatre.'),
    ]),
    open('celeste', 'Speak only to Celeste', 'Make the board listen in.', [
      q('You', 'You said you would be here as yourself. So am I. I’m going to talk to you, Celeste. They can listen.'),
      p('She inclines her head, delighted, as if you had paid her a compliment, and sits down, and the six of them become an audience without being asked.'),
    ]),
    open('silent', 'Say nothing', 'Put the first card down and let it talk.', [
      p('You say nothing at all. You walk the length of the table in the heels you can run in, and the only sound in the long room is the heels, and you put the first card down.'),
    ]),
  ];
}

// ── The Defect ──

function defectBlocks(s: GameState): Block[] {
  const reconstructed = !hasVerdict(s);
  const original = reconstructed && (isIn(s, 'sloane') || isIn(s, 'marsh'));
  return [
    p('Then the verdict. Whatever went first, this is the card the whole case is built on: ORACLE’s assessment of the Eve product, before sale. Voluntary adoption: high. Durable control: low. And under it, the board’s sign-off approving the sale to Axiom regardless.'),
    ...(reconstructed
      ? original
        ? [
            p('You lay out the reconstruction: the numbers, the dates, the gap where the signatures should be. Soames looks at it over her glasses and says, very politely, that she would need to see the signed original. Celeste smiles.'),
            p(isIn(s, 'sloane') ? 'Behind you Sloane stands up, opens her handbag, and puts a single sheet on the table in front of Soames without a word. Her own copy. Carried for a year. Celeste stops smiling.' : 'Behind you Owen stands up with his banker’s box, and finds the right folder at the first attempt, and puts the Authority’s certified copy of the signed original on the table in front of Soames. Celeste stops smiling.'),
          ]
        : [
            p('You lay out the reconstruction: the numbers, the dates, the gap where the signatures should be. Soames looks at it over her glasses and says, very politely, that she would need to see the signed original. Celeste smiles.'),
            t('True, and without the signatures. It will have to be enough. I will have to be the rest.'),
          ]
      : [p('Marguerite Soames reads it twice, the way Celeste did, and then reads the signatures, and her own is the second of the three, and she takes her glasses off and holds them in her lap.')]),
    ...(isIn(s, 'julian') ? [p('At the far end of the table, in the client’s chair, Julian writes one word on his pad and turns it face down.')] : []),
    t('They knew. Every one of them knew, and signed, and sold me anyway. Now say it to them so that they have to hear it in a room with the door shut.'),
  ];
}

/** Marguerite Soames's one question (deepening pass). */
function soamesChoices(): C17Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('soames-' + id, label, hint, 'sloane', (x) => {
      setKey(x, 'act4.soames', id);
      return body;
    });
  return [
    answer('yes', '“Yes. Every day.”', 'That is the part they cannot sell.', [
      q('You', 'Yes. Every day. I chose it on the first morning and I have chosen it every morning since. That’s the part you can’t sell, Mrs Soames. You can sell the face. You can’t sell the choosing.'),
      p('Soames looks at you for a long moment. Then she writes a single word on her pad, and turns the pad face down, and you would give a great deal to know what it was.'),
    ]),
    answer('no', '“No. I chose what to do with it.”', 'The choosing came after.', [
      q('You', 'No. Nobody chooses to be sold. I chose what to do with it afterwards. That’s why I’m standing here and not sitting at the end of Mr Halvorsen’s table.'),
      p('Soames nods, slowly, as if you had confirmed something she had read in a footnote years ago and never quite believed.'),
    ]),
    answer('brief', '“Read page two.”', 'Let the paper answer her.', [
      q('You', 'Read page two, Mrs Soames. It’s all there. You signed page three.'),
      p('She reads page two. It takes her a long time. When she looks up she does not ask anything else.'),
    ]),
  ];
}

function defectChoices(s: GameState): C17Choice[] {
  if (getKey(s, 'act4.press')) return soamesChoices();
  const press = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('press-' + id, label, hint, 'defect', (x) => {
      setKey(x, 'act4.press', id);
      return [
        ...body,
        p('Deverell has not taken his eyes off the verdict. When he speaks, it is not to you.'),
        q('Deverell', 'Celeste. Did we know?'),
        p('Celeste looks at him for a long moment, and then, which you did not expect, she tells him the truth.'),
        q('Celeste', 'Of course we knew, Anton. You signed it. We always know. That is what we sell.'),
        p('Nobody says anything for a while. Then Marguerite Soames takes her glasses off, and folds them, and speaks to you, for the first time, as if you were a person and not an exhibit.'),
        q('Soames', 'Ms Vale. One question, for my own notes. The assessment says voluntary adoption: high. Did you choose it?'),
      ];
    });
  return [
    press('fraud', 'It was fraud on the client', 'Axiom bought a defect. Its board will want to know.', [
      q('You', 'You sold Axiom a product your own system told you would not hold, and you told them it would. That has a name. Axiom’s board will want to hear it, and so will Axiom’s lawyers, and so will everyone Axiom has ever been a client of.'),
    ]),
    press('every', 'Every product carries it', 'Every drawer at sixteen degrees is a liability.', [
      q('You', 'It isn’t just me. It’s every legend in that catalogue. Every one of them was assessed, and every one of them has a number like mine, and you sold every one. There are two hundred drawers in your archive. Every drawer is a lawsuit, waiting at sixteen degrees.'),
    ]),
    press('cost', 'What it cost the people who carried it', 'Iris. Nell. A girl who was nineteen.', [
      q('You', 'I want you to know what the defect cost. Not you. Them. Iris, four years at a rich man’s elbow and then an ending. A girl who was nineteen, on a card in your safe. A woman called Nell who walked into a harbour in the dark because she wanted to go home. That’s what “priced in” means. I thought somebody at this table should hear it said out loud.'),
    ]),
  ];
}

// ── The Officer of Record ──

function sloaneBlocks(s: GameState): Block[] {
  return isIn(s, 'sloane')
    ? [
        p('Sloane stands up. Nobody has asked her to. She stands the way she used to stand at the front of a briefing room, with nothing in her hands, and says it in order.'),
        q('Sloane', 'Victoria Sloane. Axiom. Officer of record for the Eve product. The file arrived from this board with the assessment attached. I objected in writing, on the fourth of March. I was told the characteristic was known, and priced in. I understood, a year later, that I was the part of the product that took the blame if it slipped. I am here to say that I objected, and to put my objection on this table, and to watch you read it.'),
        p('She puts it down beside the verdict: one page, dated, signed, the ink a little faded. Then she sits down again, and folds her hands, and waits.'),
      ]
    : [
        p('Sloane is not in the room. Her objection is: an annexe to the verdict, one page, dated, signed, the ink a little faded. You read it aloud. I object to the transfer of this product on the grounds stated in the assessment. The characteristic is not a feature. It is a failure waiting for a date.'),
        q('Celeste', 'Poor Victoria. She always did want to be the one who was right.'),
      ];
}

function sloaneChoices(): C17Choice[] {
  const as = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('sloane-' + id, label, hint, 'turn', (x) => {
      setKey(x, 'act4.sloane', id);
      return body;
    });
  return [
    as('vouch', 'Vouch for her', '“She raised it. You buried it.”', [
      q('You', 'She raised it. You buried it. Whatever this board decides about anyone tonight, it decides it knowing that the officer of record told you the truth, in writing, and you put her name on every page anyway so that it would be hers and not yours.'),
      p('Soames writes something down. It is the first thing she has written all evening.'),
    ]),
    as('stand', 'Let her stand on her own record', 'Not your ally. Not your enemy. A person in the machine.', [
      p('You say nothing about Sloane at all. You let the page lie there beside the verdict, and let them read it, and let it be exactly what it is: a woman in the machine who said no once, in writing, and then did her job. Not your friend. Not your enemy. Her own record, and nobody else’s.'),
    ]),
    as('use', 'Make her the proof', 'The officer who delivered a product she knew was defective. True, and cold.', [
      q('You', 'And there is the proof that Axiom knew too. Its own officer of record read the assessment, objected, and delivered the product anyway. Everyone in the chain knew. That is the whole case in one page, and she wrote it.'),
      p('The room moves. You feel it move. You also feel, at your back, somebody go very still, and you know without turning round what it has cost, and that you will be paying for it for a long time.'),
    ]),
  ];
}

// ── The Offer ──

function turnBlocks(): Block[] {
  return [
    p('Celeste lets the silence run. She has always been better at silence than anybody you know, including Adrian. Then she stands up again, and walks round the end of the table, and stops beside you, close, the green bitter smell of her, and speaks to the board with her hand resting lightly on the back of your chair.'),
    q('Celeste', 'You see what I mean. Look at her. Eight months ago she was a frightened man in a coat that was too big for him. Tonight she has walked into this room with our own archive under her arm and made Anton ask me a question he has not asked in thirty years.'),
    p('She turns to you.'),
    q('Celeste', 'Sit with us, darling. You understand the product better than anyone in this room. You are the product. Take my chair, if you like; I have kept it warm. Nobody would ever place you again. You would do the placing.'),
    p('And the terrible thing is that the board, frightened, is half ready to agree. You see it go round the table: relief. A way to make you theirs again, by making you one of them.'),
    t('She thinks she has won. She thinks this is the move nobody refuses. This is the moment. This is what the card in my pocket is for.'),
  ];
}

const heldLands: Record<string, Block[]> = {
  verdict: [
    p('You take the signed original out of your inside pocket, where it has been against your ribs all evening, and lay it on top of everything, with Celeste’s signature uppermost.'),
    q('You', 'You can have a chair when every one of these is in a newspaper. That’s the only chair I want you to have.'),
  ],
  nell: [
    p('You take Nell’s order out of your inside pocket and lay it in front of Celeste’s empty place, where she will have to sit down in front of it.'),
    q('You', 'This is what a seat at this table costs. Somebody else pays it. Last time it was her.'),
  ],
  cards: [
    p('You take the last envelope out of your inside pocket, the one you did not tip out with the others, and read the label aloud: a date, a room number, and a client’s name. The heavy man with the signet ring stops turning his pen.'),
    q('You', 'Every client at this table is on one of these. I kept one back so that you’d know I know which.'),
  ],
  page: [
    p('You take your hand out of your pocket with nothing in it but a page number you have written on the back of your hand in biro: 8.'),
    q('You', 'Page eight. Whoever she is. She’s the chair I want. Close the catalogue, and nobody sits at this table on the strength of it again.'),
  ],
  phone: [
    p('You take the black phone out of your pocket and play the last message Celeste ever sent you, the one from Wednesday night, in her own voice: I shall be there as myself.'),
    q('You', 'You are. I wanted them to hear what you sound like when you mean it.'),
  ],
  adrian: [
    p('You take the last sheet of Adrian’s file out of your inside pocket: the clinic’s receipt, itemised, paid by this board.'),
    q('You', 'This is what my chair cost. Itemised. You bought a man and sold him to Axiom. I’m not going to sit down on him.'),
  ],
  ashby: [
    p('You play the rest of the Ashby tape, the part you did not play before: “When she was in the hospital in Jakarta, somebody sent flowers. Every day. White orchids.”'),
    p('You look at the orchid lying across the catalogue.'),
  ],
  none: [
    p('You have nothing in your pocket. You kept nothing back, because you had nothing to keep. So you put your hands flat on the table instead, both of them, where everyone can see them.'),
    q('You', 'I’m still here. That’s the card. I walked in with almost nothing and I am still here, and I will still be here next Thursday, and the one after that.'),
  ],
};

const crewLine: Record<string, Block[]> = {
  sloane: [
    p('Sloane does not stand this time. She speaks from her chair, quietly, to Deverell, as one professional to another.'),
    q('Sloane', 'Mr Deverell, I have sat at tables like this for twenty years, and I have never once heard anybody refuse that offer. I would like it minuted.'),
  ],
  nora: [
    p('Nora stands. She has Nell’s photograph in her hand in its plastic sleeve, and she does not put it on the table yet. She only holds it, facing the board, the way you would hold up a candle in a dark room, and sits down again without a word.'),
  ],
  marsh: [
    p('Owen clears his throat, and every head turns, because nobody has heard him speak.'),
    q('Owen Marsh', 'For the record, I am taking a note of every name at this table. Spelled correctly. I’m told that’s the part people like you hate.'),
  ],
  maya: [
    p('Maya writes, very slowly, where the heavy man can see her doing it, a name on her pad, and underlines it twice, and looks up at him, and smiles.'),
  ],
  iris: [
    p('Iris touches her earring. Once. Then, when you glance at her, she lets her eyes go to the woman in pearls, whose hands, you now see, are shaking under the table.'),
  ],
  julian: [
    p('Julian, in the client’s chair, puts down his pen.'),
    q('Julian Mercer', 'As a client of this firm, I would like to say that if Ms Vale sits down at this table, Helix will be taking its business elsewhere. And if she doesn’t, I suspect we will anyway.'),
  ],
};

/** After the offer (deepening pass): the crew speaks, or is held back; alone, she stands. */
function crewBeatChoices(s: GameState): C17Choice[] {
  const crew = inside(s);
  const beat = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer17('crew-' + id, label, hint, 'nell', (x) => {
      setKey(x, 'act4.crew-beat', id);
      return body(x);
    });
  if (!crew.length)
    return [
      offer17('alone-stand', 'Stand up', 'Nobody at your back. Stand anyway.', 'nell', (x) => {
        setKey(x, 'act4.crew-beat', 'stand');
        return [
          p('Nobody behind you to turn to. So you stand up, and walk to the window, and stand with your back to the room and the black glass in front of you and the river beyond it, and let them look at you, the way they always have. The product. Standing with its back to them. It is the rudest thing anybody has ever done in that room.'),
        ];
      }),
    ];
  return [
    beat('speak', 'Let them speak', 'The people who came in with you.', (x) => inside(x).flatMap((w) => crewLine[w] ?? [])),
    beat('hold', 'Hold them back', 'A hand raised, behind you. Not yet.', () => [
      p('You raise one hand, a little, without looking round, and behind you nobody moves. You can feel them wanting to. It is enough, for now, that the board can see them wanting to.'),
    ]),
  ];
}

function turnChoices(s: GameState): C17Choice[] {
  if (getKey(s, 'act4.offer')) return crewBeatChoices(s);
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('offer-' + id, label, hint, 'turn', (x) => {
      setKey(x, 'act4.offer', id);
      setKey(x, 'act4.held-landed', getKey(x, 'act4.held') ?? 'none');
      return [...body, ...(heldLands[getKey(x, 'act4.held') ?? 'none'] ?? heldLands.none), p('Celeste takes her hand off the back of your chair.')];
    });
  return [
    answer('refuse', 'Refuse', '“I didn’t come for a chair.”', [q('You', 'I didn’t come for a chair, Celeste. I came for the table.')]),
    answer('draw', 'Pretend to consider it', 'Long enough for her to say what a seat would cost somebody else.', [
      q('You', 'And if I sat down. What would it cost?'),
      q('Celeste', 'Nothing, darling. Nothing at all. A few pages. There is always a new collection. Somebody always has to be on page seven.'),
      p('It is out before she can stop it, and every one of them heard it.'),
    ]),
    answer('laugh', 'Laugh', 'The real laugh. Nobody in this room has ever heard it.', [
      p('You laugh. Not the laugh from the station poster, not Evie’s laugh on a balcony in a photograph: yours, the real one, which you did not know you had until about a month ago, and which nobody in this room has ever heard. It goes on longer than you mean it to. The young man with the laptop, God help him, almost joins in.'),
    ]),
  ];
}

// ── Eleanor ──

function nellBlocks(s: GameState): Block[] {
  return [
    p('Celeste goes back to her place, and does not sit, and stands behind her chair with both hands on it.'),
    p('For a while she talks about Nell, as if the board were not there: the balcony every night; a woman who could make a room of liars tell the truth by the fish course; Lisbon, which Nell was the only person she ever told about. The orchids.'),
    q('Celeste', 'She hated them. I knew she hated them. I sent them anyway. It was the only thing I ever did for her that she couldn’t give back.'),
    p('Then, because she is Celeste, and has decided that if it is going to be said it will be said by her, and properly, she tells the rest.'),
    q('Celeste', 'The Jakarta order was mine. She was leaving us, and nobody leaves, and a burned woman cannot take a legend anywhere. I signed it. I would sign it again. That is the part you already know.'),
    q('Celeste', 'On the Saturday I sent a car. To take her to her sister’s. To bring her home, if you like. She would not get into it. She walked. Along the harbour wall, in the dark, with the leg. The driver followed her at walking pace for a mile. He watched her fall. He did not stop.'),
    q('Celeste', 'He rang me at six. I rang her sister at seven. I have never known why I did that. I think I wanted somebody to hear it from me.'),
    ...(isIn(s, 'nora') ? [p('Behind you, Nora makes no sound at all. You hear her not make it.')] : []),
    t('Not a push. A signature, and a car, and a man who didn’t stop. The truth, and not the whole of anybody’s guilt. It is the most honest thing she has ever said to me, and she said it to a room.'),
  ];
}

function nellChoices(s: GameState): C17Choice[] {
  const name = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('named-' + id, label, hint, 'vote', (x) => {
      setKey(x, 'act4.named', id);
      const said = nellSaid17(x);
      setKey(x, 'act4.nell-said', said);
      return [
        ...body,
        ...(said === 'eleanor'
          ? [q('Celeste', 'Eleanor. Her name was Eleanor Linden.'), p('She says it quietly, and exactly, the way you would put something down that you had been carrying for a long time. Somebody at the table writes it down.')]
          : [q('Celeste', 'Evie. She was always Evie to me.'), p('Not the name. The legend’s name. The one she gave her. You watch her choose it, and you understand that it is the one thing she is going to keep.')]),
      ];
    });
  return [
    name('ask', 'Ask her to say it', 'Her real name. In front of them.', [q('You', 'Say her name. Not the one you gave her. Hers.')]),
    ...(isIn(s, 'nora')
      ? [
          name('nora', 'Let Nora answer', 'She puts the photograph on the table.', [
            p('Nora stands up behind you, and walks to the table, and puts the photograph down on it, face up, in front of Celeste: Nell on the harbour wall at night, laughing, in flat shoes. Then she goes back to her chair and sits down, and says nothing, and looks at Celeste, and does not stop looking.'),
          ]),
        ]
      : []),
    name('wait', 'Say nothing, and wait', 'The way Adrian learned to.', [
      p('You say nothing. You wait, the way Adrian learned to in interviews, until the other person cannot bear it. The clock on the wall behind the frames. The rain on the black glass. Nobody at the table moves.'),
    ]),
  ];
}

// ── The Board ──

function voteBlocks(s: GameState): Block[] {
  const { board, terms } = board17(s);
  const aim = getKey(s, 'act4.aim');
  const aimTerms: Record<string, string> = {
    expose: 'that nothing in this room, and nothing in that archive, will be denied when it is published',
    terms: 'a written undertaking: Maya Reyes left alone for good; Adrian Vale’s name retired and never spent; Victoria Sloane cleared; page seven closed, and every page after it that would have had your face on it',
    nell: 'that Eleanor Linden’s file is released to her sister, entire, with the pages that were taken out of it',
    out: 'that nobody at this table, or employed by it, ever looks for you again, anywhere',
  };
  return [
    p('Deverell stands. He is not a man who stands often; you can see that in how he does it. He does not look at Celeste.'),
    q('Deverell', 'I have sat on this board for thirty-one years. I have signed a great many things. I have never, until tonight, had one of them read aloud to me by the thing it was signed about.'),
    q('Deverell', 'This board will be seen to have acted. Tonight. I move that we do so.'),
    ...(board === 'resigned'
      ? [
          p('It takes eleven minutes. Nobody raises their voice. At the end of it Marguerite Soames reads out, in a clear dry voice, that Madame Laurent has offered her resignation from the board, effective immediately, and that the board has accepted it with regret.'),
          p('Celeste does not argue. She inclines her head, as if she had been told the time.'),
          q('Deverell', 'And you, Ms Vale. What does Meridian owe you?'),
          p(`You tell him. He writes it down himself, in fountain pen, on the back of the verdict: ${aimTerms[aim ?? 'terms']}. He signs it. Soames signs it. The heavy man signs it, not looking at anyone. It is not justice. It is a piece of paper with four signatures on it, which is exactly what they used to sell you, and it is yours.`),
          t('Wounded. Not toppled. Nobody topples them. But she is not on this board tonight, and I have their signatures, in their own ink, on the back of their own sin.'),
        ]
      : board === 'diminished'
        ? [
            p('It takes twenty minutes, and it is uglier. At the end of it Celeste keeps her seat, and loses the room: Soames, not Celeste, will speak for the board on the Eve product from tonight, and on anything to do with you.'),
            p(`Some of what you asked for, they give: ${terms === 'partial' ? 'Maya, and Adrian’s name, in writing' : ''}. The rest, Deverell says, “the board will consider”, and you both know that the dead man’s switch is the only reason it will.`),
            t('A crack, not a fall. She sits at the table with her hands in her lap for the first time in thirty years, and somebody else speaks for her. It will have to be enough, for tonight.'),
          ]
        : [
            p('It takes four minutes. The board closes ranks, the way boards do: no motion, no minute, nothing written down. Deverell thanks you for your time. Soames takes her glasses off and does not look at you.'),
            p('Celeste keeps her seat. She knows it will not last; you can see her knowing it. But tonight, in this room, with what you brought, they can still pretend.'),
            t('Thin. I knew it would be thin. I walked in alone with almost nothing, and I walk out with everything I walked in with, and the switch, and the street, and the slow road. They have not beaten me. They have only not lost yet.'),
          ]),
    p(
      c(s, 'c15.stairs') === 'face'
        ? 'Then they file out, the six of them, past the empty frames, not looking at each other. The young man with the laptop is the last to go, and at the door he stops, and looks back at you, and nods, once: the man on the archive stairs at three in the morning, who was never up there.'
        : 'Then they file out, the six of them, past the empty frames, not looking at each other. The young man with the laptop is the last to go, and at the door he stops, and looks back at you, and nods, once, as if to somebody on the same side.',
    ),
    p('And then there are two of you in the long room, under twenty gilt frames of nothing.'),
    p('The long room is very quiet. Somebody has left the lamp on over the lectern. The rain has stopped against the black glass, and you can hear the river, which you have never once heard from in here, going by outside at the foot of the embankment.'),
    p('Celeste comes down the length of the table. She stops an arm’s length away. She looks at you for a long time, the way she looked at you across a breakfast table eight months ago: appraising the fit. And then, for the first time, not.'),
    q('Celeste', 'Tell me one thing, and then you can go. Did you ever like being her?'),
    p('She waits. She has always been good at waiting. For once, so are you.'),
    p('She holds out the white orchid.'),
  ];
}

function voteChoices(): C17Choice[] {
  const last = (id: string, label: string, hint: string, body: Block[]) =>
    offer17('last-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.last', id);
      const { board, terms } = board17(x);
      setKey(x, 'act4.board', board);
      setKey(x, 'act4.terms', terms);
      return body;
    });
  return [
    last('yes', '“Yes.”', 'More than you ever liked being him.', [
      q('You', 'Yes. More than I ever liked being him. That’s the part you got right, and the part you’ll never be forgiven for.'),
      q('Celeste', 'Good. Then it wasn’t wasted. Nothing I ever did for you was wasted, darling. Not even this.'),
    ]),
    last('no', '“I liked being me.”', 'It took a long time to find out who that was.', [
      q('You', 'I liked being me. It took me a long time to find out who that was. You were in the way for most of it.'),
      q('Celeste', 'Then I suppose I have done you a service after all. Nobody ever thanks me for those.'),
    ]),
    last('orchid', 'Take the orchid, and put it in the water jug', 'Leave it on their table.', [
      p('You take the orchid from her. You look at it. Then you walk to the board table and put it in the water jug in the middle, among the ice, and leave it there, where the cleaners will find it in the morning.'),
      q('Celeste', 'She used to do exactly that. With every single one.'),
      p('It is the only time you have ever heard her voice go wrong.'),
    ]),
  ];
}

// ── The Front Door ──

function completeBlocks(s: GameState): Block[] {
  const out = getKey(s, 'act4.outside');
  return [
    p('You walk out down the long room, past the frames, past the chairs by the wall. ' + (inside(s).length ? 'The people who came in with you get up and come with you, without a word.' : 'Nobody gets up to come with you, because nobody came, and you find you do not mind.')),
    p('At the top of the stairs you stop, and look back, once. Celeste is standing where you left her, alone at the far end of the long room under the empty frames, with the lamp behind her, very straight. She does not wave. Neither do you.'),
    p('The doorman is not at the door. For the first time since the first Thursday, nobody is there to open it before you touch it.'),
    p(
      out === 'theo'
        ? 'Outside, across the road, the van with the dish on its roof, and Theo standing beside it with his watch in his hand, looking at it and then at you, and putting it away, grinning like a boy.'
        : out === 'pryce'
          ? 'Outside, at the kerb, the car, with its engine running, and Mr Pryce getting out to open the rear door, not because he has been told to.'
          : out === 'maya'
            ? 'Outside, across the road, in the café window, Maya standing up so fast she knocks the cake off the table.'
            : 'Outside, the embankment, the rain, and three phones in three parts of the country that are not going to ring tonight, because you are going to ring them first.',
    ),
    t('I walked out of the Vesper by the front door, and nobody opened it for me. I opened it myself.'),
  ];
}

// ── Blocks and choices ──

export function chapter17Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter17') return [];
  if (s.phase === 'opening') return openingBlocks(s);
  if (s.phase === 'defect') return defectBlocks(s);
  if (s.phase === 'sloane') return sloaneBlocks(s);
  if (s.phase === 'turn') return turnBlocks();
  if (s.phase === 'nell') return nellBlocks(s);
  if (s.phase === 'vote') return voteBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter17Choices(s: GameState): C17Choice[] {
  if (!chapter17Playable(s)) return [];
  if (s.scene === 'chapter16' && s.phase === 'complete' && ownPower(s))
    return [offer17('begin', 'The room', 'Six people, one hour, and Celeste standing.', 'opening')];
  if (s.scene !== 'chapter17') return [];
  if (s.phase === 'opening') return openingChoices();
  if (s.phase === 'defect') return defectChoices(s);
  if (s.phase === 'sloane') return sloaneChoices();
  if (s.phase === 'turn') return turnChoices(s);
  if (s.phase === 'nell') return nellChoices(s);
  if (s.phase === 'vote') return voteChoices();
  return [];
}

export function applyChapter17Choice(state: GameState, id: string): GameState {
  const choice = chapter17Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter17';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter17.${s.phase}` as NodeId, blocks: chapter17Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER17_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
