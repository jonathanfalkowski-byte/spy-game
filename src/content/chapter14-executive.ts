/** Chapter 14 (Executive route, lane id `executive`) · The Signature:
 * called → silence → truth → ways → boardroom → night → complete.
 * Design: docs/story/EXECUTIVE_CHAPTER_14_THE_SIGNATURE_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_14_SCRIPT.md. The fund calls in clause 14.3 on every
 * facility Julian signed (the Vesper deal, if she brought him to sign it in Ch11); Celeste's last order on this road is
 * his silence (refusal burns Adrian's name to Axiom: non-sexual, the shared canon cost); what she tells him (all / the
 * order / nothing: "Were you ever ordered to love me?" "No."); three ways: enforce the term with him (needs him knowing,
 * trust 3+, and her Ch8 evidence), spend her status for him (always), or let him fall and keep the room (always), each
 * setting c14.answer (countered / refused / complied) for Ch15; Sloane collects the Ch8 debt at the board ("take my
 * file out too"); the kept ledger comes due honestly (what was Helix's follows Helix; what she paid for stays hers); a
 * chosen night (heat 3, consent-gated, fades); the card and the Vesper credentials. Julian is never a trap.
 * Until the Executive framing of Chapters 10–13 exists, it is entered from an Executive `chapter9.complete` through an
 * in-development bridge, and the planned keys (exec.calendar, exec.sign11, exec.told12, exec.told13) read their
 * defaults. Local helpers mirror chapter14.ts (c14.* keys, chapter14.* ids); choice ids carry `x14-`.
 * Deepening pass (2026-09-28): three moments, each with a neutral pick. Marcus in her doorway on Tuesday morning, before
 * the truth (c14.x-marcus = no | maybe | quiet: "Come and sit next to me after."); the tie on Thursday night as its own
 * moment (c14.x-tie = rehearse | kiss | go); and the box on Friday afternoon, by way (c14.x-box = word | hand | silence:
 * Marcus's box in the lift, her own box carried down by Julian, or his books with the photograph on top). The Monday
 * ledger moves to an epilogue after the card. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

type C14Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get14 = (s: GameState, k: string) => s.choices['c14.' + k];
const set14 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c14.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C14Choice['apply']): C14Choice => ({ id: 'chapter14.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get14(s, 'rec.' + k) !== undefined) return;
  set14(s, 'rec.' + k, String(s.history.length));
  set14(s, 'event.' + k, String(s.revision));
  set14(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c14.' + k);
  s.knowledge.push('c14.' + k);
}

export const EXECUTIVE_PHASES14 = ['called', 'silence', 'truth', 'ways', 'boardroom', 'night'] as const;
export const isExecutive14 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase14 = (s: GameState) => isExecutive14(s) && ((EXECUTIVE_PHASES14 as readonly string[]).includes(s.phase) || s.phase === 'complete');

// ── What the road left her (Ch7–8 built; Ch10–13 planned keys with defaults) ──

const file = (s: GameState) => key(s, 'exec.file') as 'told' | 'kept' | 'pulled' | undefined;
const signed11 = (s: GameState) => key(s, 'exec.sign11') === 'signed';
const warned11 = (s: GameState) => key(s, 'exec.sign11') === 'warned';
const gaveCalendar = (s: GameState) => ['gave', 'doctored'].includes(key(s, 'exec.calendar') ?? '');
const told12 = (s: GameState) => key(s, 'exec.told12') === 'told';
const told13 = (s: GameState) => ['before', 'after'].includes(key(s, 'exec.told13') ?? '');
const truth = (s: GameState) => key(s, 'exec.truth14') as 'all' | 'order' | 'none' | undefined;
const way = (s: GameState) => key(s, 'exec.signature') as 'enforced' | 'spent' | 'fell' | undefined;

/** Trust, used only as a gate and never shown (design §4). */
export function trust14(s: GameState): number {
  return Number(key(s, 'exec.trust') ?? 0) + (told12(s) ? 1 : 0) + (told13(s) ? 1 : 0) + (truth(s) === 'all' ? 2 : truth(s) === 'order' ? 1 : 0);
}
/** Julian knows about 14.3: she told him in Ch8, warned him in Ch11, or told him everything now. */
export const knows14 = (s: GameState) => file(s) === 'told' || warned11(s) || truth(s) === 'all';
export const enforceOpen14 = (s: GameState) => knows14(s) && trust14(s) >= 3 && !!file(s);
/** He knew why he was asked to go quietly. */
const knewWhy = (s: GameState) => truth(s) === 'all' || truth(s) === 'order';
const sloaneAsks = (s: GameState) => !!key(s, 'exec.owes-sloane') || ['civil', 'deal'].includes(key(s, 'exec.sloane8') ?? '');
const nightOk = (s: GameState) =>
  key(s, 'c6.friction-julian') === 'warmed' || !!key(s, 'c7.x-evening-outcome')?.startsWith('intimate') || !!key(s, 'c8.x-late-outcome')?.startsWith('intimate');

export function placeExecutive14(s: GameState): string | undefined {
  if (s.phase === 'truth' && get14(s, 'x-marcus')) return 'Tuesday · late · The forty-first floor';
  if (s.phase === 'truth') return 'Tuesday · 08:00 · Your doorway, forty-one';
  if (s.phase === 'ways' && key(s, 'exec.signature')) return 'Thursday night · Julian’s apartment, the forty-first floor';
  if (s.phase === 'night' && !get14(s, 'x-box')) return 'Friday · 14:00 · Forty-one';
  const open = get14(s, 'x-night-open');
  if (s.phase === 'night' && open) return open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The bridge (until Executive Chapters 10–13 exist) ──

export function beginExecutive14(): C14Choice {
  return offer('begin-executive', 'Go on to the signature', 'This road’s Act III chapters are in development.', 'called', () => [
    p('[Chapters 10–13 · executive road — in development] The months pass the way months do on forty-one: fast, and then all at once. Celeste Laurent’s name, which you found at the end of the bridge, is on L.S.F. Advisory’s letterhead in very small type. Julian has signed what Marcus gave him. The clause is still there.'),
  ]);
}

// ── Called ──

function calledBlocks(s: GameState): Block[] {
  const f = file(s);
  return [
    p('Monday, ten past six. Forty-one is dark but for his office, and Julian is at the window in yesterday’s shirt, with the city coming up grey below him and a single sheet of paper in his hand.'),
    p(
      signed11(s)
        ? 'Over the weekend the Vesper deal failed: the one he signed in the long room, with the good pen, because you brought him the page and stood beside him while he did it.'
        : 'Over the weekend one of Marcus’s deals failed: a logistics company in Antwerp, eighteen months old, one of the eleven.',
    ),
    q('Julian Mercer', 'L.S.F. Advisory has invoked clause 14.3. On every facility I’ve signed. First charge on Helix itself. This building. The board meets on Friday, and Marcus has already spoken to the fund. He’s the man who can talk to them, apparently.'),
    q(
      'Julian Mercer',
      f === 'told'
        ? 'You told me. Months ago, on the phone at midnight, and I stopped signing. It turns out eleven was enough.'
        : warned11(s)
          ? 'You warned me at the Vesper. I didn’t sign. It turns out the ones before were enough.'
          : 'Eleven signatures. Twelve. I never read one of them. I told you that once, in a lift, as if saying it made it better.',
    ),
    ...(signed11(s) ? [t('The good pen. My hand on his shoulder. Celeste asked for his signature, and I brought it to her, and now she is cashing it.')] : []),
    ...(f === 'kept' ? [t('Page thirty-one is in my phone. It has been in my phone since the night of the tray.')] : f === 'pulled' ? [t('The Rotterdam original is in my drawer, unsigned, with Marcus’s routing notes in the margin. He has been looking for it ever since.')] : []),
  ];
}

function calledChoices(): C14Choice[] {
  const c = (id: string, label: string, hint: string, body: Block[]) =>
    offer('x14-' + id, label, hint, 'silence', (x) => {
      set14(x, 'x-called', id);
      return body;
    });
  return [
    c('to-him', 'Go to him', 'Stand at the window with him.', [p('You stand beside him at the window, close enough that your shoulder touches his arm, and say nothing, and after a while he breathes out as if he had been holding it since Saturday.')]),
    c('to-file', 'Go to the file', 'Read the notice, all of it, before anybody else does.', [p('You take the sheet out of his hand and read it twice, the way he taught himself to read your terms, and then sit down at his desk and start a list. He watches you do it, and for the first time since the weekend he smiles.')]),
    c('to-window', 'Go to your own window', 'You need a minute. Take it.', [p('You go next door, to your own office and your own window, and stand there with the light on for a full minute, and then go back to him with two coffees.')]),
  ];
}

// ── Silence ──

function silenceBlocks(s: GameState): Block[] {
  return [
    p('Monday night. A long car at the kerb outside Helix, engine running, Mr Pryce holding the rear door with his eyes on the middle distance. Inside, in grey cashmere, with the reading light on, Celeste Laurent.'),
    q('Celeste Laurent', 'Sit, darling. It’s cold, and this won’t take long.'),
    ...(gaveCalendar(s) ? [q('Celeste Laurent', 'Thank you for his calendar, by the way. I knew about Friday before he did.')] : []),
    q('Celeste Laurent', 'He’s a lovely man. He will never survive us. So help him not to try. Ask him to go quietly on Friday: resign, and don’t contest. Marcus takes the chair, the fund is patient, Helix lives, and so does Julian, somewhere pleasant, with a good pension and his books.'),
    q('Celeste Laurent', 'He’ll do it if you ask. That’s rather the point of you.'),
    q('Celeste Laurent', 'And if you don’t, I shall let the fund have the building, and the papers will have the man who signed it away, and Axiom will have Adrian Vale’s name by the weekend. I’d so much rather not. Nobody needs to be unkind.'),
    t('His calendar. His signature. Now his silence. She has never once asked me for his body. She doesn’t need it. She wants the thing he gave me for nothing.'),
  ];
}

function silenceChoices(): C14Choice[] {
  const c = (id: string, label: string, hint: string, body: Block[]) =>
    offer('x14-celeste-' + id, label, hint, 'truth', (x) => {
      set14(x, 'x-celeste', id);
      return body;
    });
  return [
    c('think', '“I’ll think about it.”', 'Give her nothing yet.', [q('You', 'I’ll think about it.'), q('Celeste Laurent', 'Do. Thinking is so becoming. Friday, darling.')]),
    c('doubt', '“He won’t agree.”', 'See what she knows about him.', [q('You', 'He won’t agree. He isn’t that kind of man.'), q('Celeste Laurent', 'He’s exactly that kind of man. He’ll agree for you. That’s what frightens you.')]),
    c('silent', 'Get out of the car', 'Say nothing at all.', [p('You get out of the car without a word and stand on the pavement while it pulls away. Mr Pryce, closing the door, meets your eyes for exactly one second, and it might be sympathy.')]),
  ];
}

// ── The truth ──

function truthBlocks(s: GameState): Block[] {
  return [
    p('Tuesday morning. Marcus Chen in your doorway at eight, freshly shaved, jacket over his shoulder, as if the building already belonged to him and he was only checking the fittings.'),
    q('Marcus Chen', key(s, 'exec.marcus8') === 'open' ? 'You took a file off his tray last spring. I never found out why. I’m not going to ask now. I’m going to make you an offer instead.' : 'Friday will go one of two ways. In one of them I’m in his chair by lunchtime. I’d like you on the right side of the glass when it happens.'),
    q('Marcus Chen', 'Come and work for me after. Same office. Same title. The chair next to mine instead of next to his. I don’t leave lights on for people. I don’t need to. They don’t leave.'),
  ];
}

const marcusChoices = (): C14Choice[] => {
  const m = (id: 'no' | 'maybe' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('x14-marcus-' + id, label, hint, 'truth', (x) => {
      set14(x, 'x-marcus', id);
      return [...body, ...flatLead];
    });
  return [
    m('no', '“No.”', 'One word. Let him hear all of it.', [q('You', 'No.'), p('He smiles as if you had said something charming in a language he is learning, and goes.')]),
    m('maybe', '“Ask me on Friday afternoon.”', 'Keep him guessing.', [q('You', 'Ask me again on Friday afternoon, Mr Chen. We’ll both know more.'), p('He looks at you for a long moment with real appreciation, and taps the door frame twice, and goes.')]),
    m('quiet', 'Say nothing', 'Go back to your screen.', [p('You go back to your screen without a word. After a while he goes too. You do not look up until the lift has closed.')]),
  ];
};

const flatLead: Block[] = [
    p('Tuesday, late. His flat on the forty-first floor, the city laid out below, no dinner, two glasses nobody has touched. He has taken his glasses off and put them on the table between you, which is what he does when he wants to be seen without them.'),
    q('Julian Mercer', 'You’ve been somewhere since last night. I can see it. You don’t have to tell me where. But if it’s about Friday, I’d rather know.'),
];

function truthChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'x-marcus')) return marcusChoices();
  const all: Block[] = [
    p('You tell him everything. Celeste in the car. The order: his silence. ' + (gaveCalendar(s) ? 'His calendar, which you gave her. ' : '') + (signed11(s) ? 'The Vesper, the good pen, and whose hand was on his shoulder. ' : '') + (told12(s) ? '' : 'And your name: the one you were born with, and the one you are wearing, and the woman who wore it before you. ') + 'It takes an hour. He does not interrupt once.'),
    p('When you have finished he sits for a long time with his hands flat on the table.'),
    q('Julian Mercer', 'One question. Were you ever ordered to love me?'),
    q('You', 'No. Never. Not once. His calendar, and his pen, and his silence. Never that.'),
    p('He looks at you for a long moment, and believes you, because it is true.'),
    q('Julian Mercer', 'Then we have a board to prepare for.'),
  ];
  const t14 = (id: 'all' | 'order' | 'none', label: string, hint: string, body: Block[]) =>
    offer('x14-truth-' + id, label, hint, 'ways', (x) => {
      setKey(x, 'exec.truth14', id);
      if (id === 'all') note(x, 'x-truth', 'Evelynn told Julian Mercer everything: Celeste Laurent’s orders on this road (his calendar, his signature, his silence), her own part in them, and who she is. She was never ordered to love him.', 'Evelynn, to Julian Mercer, the forty-first floor');
      return body;
    });
  return [
    t14('all', 'Tell him everything', 'Celeste, the order, your part in it, and who you are.', all),
    t14('order', 'Tell him the order, not your part in it', 'Celeste wants his silence. That much he should know.', [
      q('You', 'Somebody wants you to resign on Friday, quietly, and not fight. Somebody who can make that happen. They asked me to ask you.'),
      q('Julian Mercer', 'And you’re telling me instead of asking. Thank you. I don’t know who, and I’m not going to make you say. I’m frightened, and I find I’d rather be frightened with you than without.'),
    ]),
    t14('none', 'Tell him nothing', 'Kiss him, and let Friday come.', [
      q('You', 'It’s nothing. It’s just Friday.'),
      p('He lets it go, because you asked him to, and holds you on the sofa with the rain on the glass, and you lie awake long after he has fallen asleep beside you, carrying all of it.'),
    ]),
  ];
}

// ── The ways ──

function waysBlocks(s: GameState): Block[] {
  return [
    ...(key(s, 'exec.marcus8') === 'open'
      ? [
          p('Wednesday, nine o’clock: a memo from Marcus Chen to every member of the board, copied to you. “A Morel & Cie facility for Rotterdam was removed from the Group COO’s signature tray last spring and has not been seen since. The board may wish to ask by whom.”'),
          t('He has been waiting months to send that. He moved first. Fine. Then I know where he is standing.'),
        ]
      : []),
    p('Wednesday. Your office, the door shut, the light on, three sheets of paper on the desk, one for each way this can go.'),
    p(
      enforceOpen14(s)
        ? 'Enforce the term. He knows about 14.3, and he trusts you, and you have the paper: ' + ({ told: 'his own note on the tray, “Not until I understand it.”', kept: 'the copy of page thirty-one.', pulled: 'the Rotterdam original, with Marcus’s routing notes in the margin.' }[file(s)!]) + ' The clause was never put to the board. It could be struck.'
        : knows14(s)
          ? 'Enforce the term. He knows about 14.3, but he would need to trust you with everything to stand up in that room and say he never read it, and he doesn’t yet. Not like that.'
          : 'Enforce the term. He doesn’t know what you know. You cannot ask a man to stand up and confess to a clause he has never seen.',
    ),
    p('Spend yourself. Stand up in his place. It would cost you the job, and whatever came with it, and Celeste would send Adrian’s name to Axiom by the weekend.'),
    p('Or do what she asked. Let him fall, and keep the room.'),
  ];
}

function waysChoices(s: GameState): C14Choice[] {
  const w = (id: 'enforced' | 'spent' | 'fell', label: string, hint: string, answer: string, body: Block[]) =>
    offer('x14-way-' + id.replace('enforced', 'enforce').replace('spent', 'spend').replace('fell', 'fall'), label, hint, 'ways', (x) => {
      setKey(x, 'exec.signature', id);
      set14(x, 'answer', answer);
      return [
        ...body,
        p('Thursday night, the forty-first floor. He is trying to knot a tie for the morning and making a mess of it, and you take it out of his hands and do it yourself, standing close, with the rain on the window behind him, and do not step back when you have finished.'),
        q('Julian Mercer', 'Whatever happens tomorrow.'),
        q('You', 'Whatever happens tomorrow.'),
      ];
    });
  if (way(s)) return tieChoices(s);
  return [
    ...(enforceOpen14(s)
      ? [w('enforced', 'Enforce the term, with him', 'He reads 14.3 into the minutes himself. You show whose it was.', 'countered', [p('You take the first sheet of paper across the corridor and put it on his desk, and he reads it twice, and nods.')])]
      : []),
    w('spent', 'Spend yourself for him', 'Stand up in his place. Resign in the room. Celeste will burn Adrian’s name.', 'refused', [p('You fold the second sheet of paper in half and put it in your jacket, next to your heart, which is a stupid place to keep a resignation, and the right one.')]),
    w('fell', 'Let him fall, and keep the room', 'Ask him to go quietly, as she asked.', 'complied', [
      ...(knewWhy(s)
        ? [q('You', 'I’m going to ask you to go quietly on Friday.'), q('Julian Mercer', 'Then I’ll go quietly. It’s the first decision about Helix I’ve made with my eyes open.')]
        : [q('You', 'Go quietly on Friday. Please. Don’t fight it. Trust me.'), p('He looks at you for a long time, and does not ask why, and says “All right,” and you will hear that “all right” for years.')]),
    ]),
  ];
}

function tieChoices(s: GameState): C14Choice[] {
  const tc = (id: 'rehearse' | 'kiss' | 'go', label: string, hint: string, body: Block[]) =>
    offer('x14-tie-' + id, label, hint, 'boardroom', (x) => {
      set14(x, 'x-tie', id);
      return body;
    });
  return [
    tc('rehearse', 'Stay up and rehearse it', 'Every question they could ask. Until two.', [
      p('You sit up until two on his sofa with your shoes off and the board papers between you, and ask him every question they could possibly ask, in Marcus’s voice, and then in the chair’s, and then in Sloane’s, until he stops flinching at any of them.'),
      ...(way(s) === 'fell' ? [q('Julian Mercer', 'You know I’m not going to answer any of them tomorrow.'), q('You', 'I know. I wanted you to know you could have.')] : []),
    ]),
    tc('kiss', 'Kiss him, once, at the window', 'Only that. Then go.', [
      p('You kiss him once, at the window, with your hands still on the knot of his tie, and he goes very still and then kisses you back, carefully, as if he were signing something he had read twice. Then you step back, and pick up your coat, and go home, and neither of you says anything, because nothing needs saying.'),
    ]),
    tc('go', 'Go home and sleep', 'Tomorrow needs you awake.', [p('You go home and, to your own surprise, sleep: seven hours, without dreaming, like somebody who has already made up her mind.')]),
  ];
}

// ── The boardroom ──

function boardroomBlocks(s: GameState): Block[] {
  return [
    p('Friday, eight o’clock. The Helix boardroom on forty-four: one long table, one long window of rain, eleven chairs and the water jugs sweating. Marcus Chen at the far end, freshly shaved, with the fund’s letter in a clear folder in front of him like a winning hand. In the observer’s chair by the door, for Axiom, in charcoal: Sloane.'),
    ...(sloaneAsks(s)
      ? [
          p('Sloane catches you in the corridor on the way in, and walks beside you for exactly ten steps.'),
          q('Sloane', key(s, 'exec.owes-sloane') ? 'You owe me one. Here is what it is. When you go into the Vesper, and you will, take my file out too. Do that, and Axiom says what it knows in there. Refuse, and Axiom abstains.' : 'Axiom knows things about that clause that would help you. They cost something. When you go into the Vesper, and you will, take my file out too.'),
        ]
      : []),
  ];
}

function voteBlocks(s: GameState): Block[] {
  const sloane = key(s, 'exec.sloane14') === 'accepted';
  const w = way(s);
  if (w === 'enforced')
    return [
      p('Julian stands before the chair has finished the minutes of the last meeting, and reads clause 14.3 into the record himself, slowly, twice.'),
      q('Julian Mercer', 'I signed this eleven times without reading it. That is my failure, and I am not going to ask anybody in this room to carry it for me. But I would like the board to see whose clause it was.'),
      p('Then you stand, and show them: ' + ({ told: 'his own note from the tray, “Not until I understand it,” dated the night you rang him', kept: 'page thirty-one, photographed at twenty to midnight on his desk', pulled: 'the Rotterdam original, never signed, with Marcus Chen’s routing notes in the margin' }[file(s)!]) + ', and the minutes of every board meeting for six years, in none of which a guarantee of Helix’s own assets was ever put to a vote.' + (signed11(s) ? ' And you tell them, in a level voice, whose hand was on his shoulder at the Vesper.' : '')),
      ...(sloane ? [q('Sloane', 'For the record: Axiom was never told either. We would have objected. We object now.')] : []),
      p('It takes forty minutes. The board resolves that the guarantee was never authorised and binds nobody but the man who negotiated it. The fund’s charge on Helix fails. Marcus Chen is suspended pending review, and leaves the room with his clear folder under his arm and his face perfectly still.'),
      p('At noon a message on your phone, from a number with no name: “Well played, darling. We shall talk after my board meets.”'),
      t('She is afraid. She would never say so. She just did.'),
    ];
  if (w === 'spent')
    return [
      p('Marcus begins, beautifully: the fund, the clause, the Group COO’s signature, eleven times. Before he can reach the word “resignation”, you stand.'),
      q('You', key(s, 'exec.term.files') ? 'I read every one of those facilities, by right, under the terms of my contract. I should have stopped them. I didn’t. The failure is in this office’s process, and I run this office.' : 'I am the Group COO’s chief of staff. Everything that crosses his desk crosses mine first. I should have read them, and stopped them, and I didn’t. The failure is mine.'),
      q('You', 'I resign, from this meeting, effective today. Mr Mercer stays.'),
      ...(key(s, 'exec.fav.paper') === 'mine' || key(s, 'exec.fav.paper') === 'ours' ? [p('Two of the directors remember your paper. They look at you the way people look at something expensive being thrown away.')] : []),
      ...(get5(s, 'published') ? [p('By the afternoon, your face is on the business pages: the Aster girl who fell on her sword for Helix. You let them have it.')] : []),
      ...(sloane ? [q('Sloane', 'Axiom would like the minutes to note that Ms Vale’s account is accurate.')] : []),
      p('The board accepts your resignation' + (key(s, 'exec.term.door') ? ', with references unreserved, as your contract says' : '') + ', and does not accept Julian’s, because he does not offer it. He stays, smaller, with a clause to fight and a building still his to fight it from.'),
      p('At six a message from a number with no name: “Such a waste, darling. Axiom will have his name by Saturday.”'),
    ];
  return [
    p('Julian speaks for three minutes, without notes, and resigns as Group COO, effective today, and does not contest the fund’s claim or anything else. He does not look at you once while he does it, which is the kindest thing he could have done.'),
    p('Marcus Chen is appointed interim COO by a show of hands, and thanks the board, and says the fund has been very patient.'),
    ...(knewWhy(s) ? [p('On his way out, Julian stops by your chair and puts a hand on the back of it, just for a second, the way Sloane did at the Axiom dinner.')] : []),
    p('At noon a message from a number with no name: “You see? Nobody had to be unkind.”'),
    t('I kept the room. I am sitting in it. It is exactly as large as it was yesterday.'),
  ];
}

function credentials(x: GameState) {
  const w = way(x);
  setKey(x, 'exec.credentials', w === 'enforced' ? 'julian' : w === 'spent' || knewWhy(x) ? 'card' : 'none');
}

function boardroomChoices(s: GameState): C14Choice[] {
  const go = (id: string, label: string, hint: string, after?: (x: GameState) => Block[]) =>
    offer('x14-' + id, label, hint, 'night', (x) => {
      const pre = after?.(x) ?? [];
      credentials(x);
      note(x, 'x-board', { enforced: 'The Helix board resolved that clause 14.3 was never authorised and binds only the man who negotiated it; the fund’s charge on Helix failed; Marcus Chen was suspended.', spent: 'Evelynn resigned from Helix in the boardroom, taking the negligence on herself; Julian Mercer stayed as Group COO.', fell: 'Julian Mercer resigned as Group COO without contest; Marcus Chen was appointed interim COO.' }[way(x)!], 'The minutes of the Helix board, forty-four');
      return [...pre, ...voteBlocks(x)];
    });
  if (sloaneAsks(s))
    return [
      go('sloane-accept', 'Agree: her file too', 'Axiom speaks in the room. Sloane rides into the Vesper.', (x) => {
        setKey(x, 'exec.sloane14', 'accepted');
        setKey(x, 'act3.sloane', 'allied');
        return [q('You', 'Her file too. Agreed.'), p('Sloane nods once and takes the observer’s chair as if nothing had been said.')];
      }),
      go('sloane-refuse', 'Refuse', 'Axiom abstains. You owe nobody anything new.', (x) => {
        setKey(x, 'exec.sloane14', 'refused');
        return [q('You', 'No.'), q('Sloane', 'Then Axiom abstains. The debt stands.'), p('She goes in ahead of you.')];
      }),
    ];
  return [go('board-go', 'Go in', 'Eleven chairs, one window of rain.')];
}

// ── The night: the ledger comes due ──

function ledgerDue(s: GameState): Block[] {
  const w = way(s);
  if (w === 'enforced') return [p('The flat, the car, the card: nothing moves. Helix is still his, and whatever you took from it is exactly where you left it.')];
  const flat = key(s, 'exec.flat');
  const out: Block[] = [];
  if (flat === 'accepted')
    out.push(p(w === 'spent' ? 'On Monday facilities rings, very politely, about the key to the flat on the river. You put it in an envelope and walk it down yourself.' : 'On Monday a man from facilities, Marcus’s facilities now, asks for the key to the flat on the river. You give it to him in the lift.'));
  if (flat === 'paid') out.push(p('On Monday facilities rings about the flat on the river. You remind them, pleasantly, of the standing order. “It’s mine. I paid for it.” The lease holds.'));
  if (key(s, 'exec.fav.car') === 'take')
    out.push(p(w === 'spent' ? 'Hal drives you home one last time on Friday night, unasked, off the clock, and will not take anything for it.' : 'Hal is Marcus’s driver now. He nods to you in the garage, one professional to another, and looks sorry.'));
  if (key(s, 'exec.fav.card') === 'take') out.push(p('The black card is cancelled on Monday. The dress is still in your wardrobe. It was always going to be yours.'));
  return out;
}

const scopeReply: Record<'no-sex' | 'sex', string> = {
  'no-sex': 'Then that’s tonight. You set the edge. I’ve never wanted to be anywhere but my side of it.',
  sex: 'Yes. And you say stop, it stops. The same for me. That was the first term and it’s still the only one.',
};

function boxBlocks(s: GameState): Block[] {
  const w = way(s);
  if (w === 'enforced')
    return [
      p('Two o’clock. Marcus Chen is in the lift when the doors open on forty-one, with a cardboard box in his arms: a pen set, a whisky glass, a framed photograph of a council block in Leeds. He looks at you, and does not look away.'),
      q('Marcus Chen', 'She’ll do this to you one day. The same way. You know that.'),
    ];
  if (w === 'spent')
    return [
      p('Two o’clock. A cardboard box on your desk: the good pens from the drawer, Clare’s green folder, a mug. Julian comes in without knocking, for the first time ever, and picks it up before you can.'),
      q('Julian Mercer', 'I’m carrying this down. Don’t argue. It’s the only thing today I get to do for you.'),
    ];
  return [
    p('Two o’clock. His office is boxes: the books he has actually read, the good pen, and on top of the nearest box, still face down, the photograph in its silver frame.'),
    q('Julian Mercer', 'Eleven years, and it fits in six boxes. I thought there’d be more.'),
  ];
}

function boxChoices(s: GameState): C14Choice[] {
  const w = way(s);
  const b = (id: 'word' | 'hand' | 'silence', label: string, hint: string, body: Block[]) =>
    offer('x14-box-' + id, label, hint, 'night', (x) => {
      set14(x, 'x-box', id);
      return [...body, p('Friday night. Forty-one empties from the lifts outward, and the rain comes back.')];
    });
  if (w === 'enforced')
    return [
      b('word', '“Maybe. But not today.”', 'Let him have the last word, nearly.', [q('You', 'Maybe. But not today, Marcus.'), p('The doors close on him smiling, and you will never be sure what the smile meant.')]),
      b('hand', 'Hold the doors for him', 'He came up from nothing. Let him leave like somebody.', [p('You put your hand on the edge of the doors and hold them, and he steps out past you onto forty-one for the last time, and walks the whole glass hallway to the other lift, slowly, so that everybody sees him do it on his own feet.')]),
      b('silence', 'Let the doors close', 'Nothing to say.', [p('You say nothing. The doors close. The floor numbers count down to G.')]),
    ];
  if (w === 'spent')
    return [
      b('word', '“Thank you for asking what would make it safe.”', 'Say it now. You may not get another chance.', [q('You', 'Thank you. For asking, that first morning, what would make it safe.'), q('Julian Mercer', 'You answered. That was the whole of it. You answered, and I listened.')]),
      b('hand', 'Take one end of the box', 'Carry it down together.', [p('You take one end of the box and he takes the other, and you carry it down forty-one floors together like two people moving house, and in the lobby the security men stand up, and do not quite know why.')]),
      b('silence', 'Let him carry it', 'Walk beside him.', [p('You let him carry it. You walk beside him to the lift, and down, and out, and he holds the door, the way he always did.')]),
    ];
  return [
    b('word', 'Ask him about the photograph, one last time', 'Somebody he didn’t keep.', [
      q('You', 'Will you tell me now? Who’s in the photograph?'),
      ...(knewWhy(s)
        ? [q('Julian Mercer', 'Over dinner. If you’ll have dinner with an unemployed man. It’s a longer story than a box, and I’d like to tell it sitting down.')]
        : [q('Julian Mercer', 'Not today. One day. I seem to be running out of days on this floor.')]),
    ]),
    b('hand', 'Pick up the box with the photograph', 'Carry that one yourself.', [p('You pick up the box with the photograph on top and carry it to the lift yourself, and he lets you, and does not say anything, and in the lift he reaches over and puts his hand flat on the frame, just for a second, as if to keep it face down.')]),
    b('silence', 'Help him tape the boxes', 'Say nothing. Tape.', [p('You kneel on his carpet and help him tape the boxes shut, one by one, and neither of you says a word, and it is somehow the most intimate hour of the whole three months.')]),
  ];
}

function nightChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'x-box')) return boxChoices(s);
  const open = get14(s, 'x-night-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x14-julian-' + id, label, hint, 'night', (x) => {
        set14(x, 'x-night-open', 'julian-room');
        set14(x, 'x-night-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x14-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c14.x-night-open'];
        set14(x, 'x-night-outcome', 'declined');
        return [p('You say goodnight at his door. He holds your face in both hands for a moment, and lets you go.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get14(s, 'x-night-scope') as 'no-sex' | 'sex';
    return [
      offer('x14-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c14.x-night-open'];
        set14(x, 'x-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you by the window until you are ready to go.')];
      }),
      offer('x14-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c14.x-night-open'];
        set14(x, 'x-night-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [p('The tie you knotted this morning, undone by your own hand. He says your name, your real one if you gave it to him, and asks once more, and you answer by taking him to bed.'), p('What happens next stays on the forty-first floor. The scene fades.')]
          : [p('He kisses you by the rain on the glass for a very long time, and stops where you said, and you fall asleep on his sofa in his shirt, and nobody owes anybody anything.')];
      }),
    ];
  }
  const julianOk = way(s) !== 'fell' || knewWhy(s);
  return [
    ...(julianOk
      ? [
          offer('x14-night-julian', 'Go up to him', way(s) === 'fell' ? 'His last night on forty-one.' : 'Whatever happened today, it happened to both of you.', 'night', (x) => {
            set14(x, 'x-night', 'julian');
            set14(x, 'x-night-open', 'julian');
            return [
              p(way(x) === 'fell' ? 'His last night on forty-one. The books are in boxes. The photograph that was always face down is on top of the nearest one, still face down.' : 'The forty-first floor, the city laid out below, his tie over the back of a chair.'),
              q('Julian Mercer', 'Tell me what you want tonight, and that’s what happens. That hasn’t changed. I don’t think it ever will.'),
            ];
          }),
        ]
      : []),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          offer('x14-night-maya', 'Go to Maya’s', 'She will want to know if he is still good to you.', 'complete', (x) => {
            set14(x, 'x-night', 'maya');
            return [p('Maya’s kitchen, the cat, the cheap good wine, and all of it, told badly.'), q('Maya', 'Good, then. Not clever. I’m sorry. Clever would have survived it easier.')];
          }),
        ]
      : []),
    offer('x14-night-alone', 'Go home alone', 'Chapter 14 ends here.', 'complete', (x) => {
      set14(x, 'x-night', 'alone');
      return [p('You go home alone and sit at the wardrobe door with the lights off, and let the week settle, one card at a time.')];
    }),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const w = way(s);
  const kept = Number(key(s, 'exec.kept') ?? 0) + (key(s, 'exec.flat') === 'accepted' ? 1 : 0);
  const cred = key(s, 'exec.credentials');
  return [
    ...(get14(s, 'x-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn with the tie in your coat pocket.')] : []),
    p('The wardrobe door. Under JULIAN MERCER, and the question in pencil, and the two columns, a new card:'),
    q('The card', { enforced: 'THE SIGNATURE. HIS, STRUCK. WITH HIM.', spent: 'THE SIGNATURE. MINE, SPENT. HE STAYS.', fell: 'THE SIGNATURE. HIS, SILENT. I KEPT THE ROOM.' }[w ?? 'fell']),
    t(
      w === 'enforced' && kept > 0
        ? 'Everything he gave me is still where I left it. So is he. I find I do not need to count it tonight.'
        : kept >= 3
          ? 'I chose every line of the left-hand column. Now I find out which lines were mine.'
          : kept === 0
            ? 'I owe nobody anything. It turns out that is also a way of being alone.'
            : 'Some of it was his, and it will go back where it came from. Some of it was mine, and it will still be here.',
    ),
    p('And beside it, the next one, the one that goes somewhere:'),
    q('The card', 'THE VESPER. ' + (cred === 'julian' ? 'HIS CREDENTIALS. HE COMES.' : cred === 'card' ? 'HIS APPOINTMENT CARD. BEFORE THEY TAKE IT OFF HIM.' : 'NO WAY IN BUT MINE.') + (key(s, 'exec.sloane14') === 'accepted' ? ' SLOANE’S FILE TOO.' : '')),
    ...(ledgerDue(s).length && w !== 'enforced' ? [p('The Monday after.'), ...ledgerDue(s)] : []),
    p('[Chapter 15 · executive road — in development]'),
  ];
}

export function executiveBlocks14(s: GameState): Block[] {
  if (s.phase === 'called') return calledBlocks(s);
  if (s.phase === 'silence') return silenceBlocks(s);
  if (s.phase === 'truth') return truthBlocks(s);
  if (s.phase === 'ways') return waysBlocks(s);
  if (s.phase === 'boardroom') return boardroomBlocks(s);
  if (s.phase === 'night') return boxBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices14(s: GameState): C14Choice[] {
  if (s.phase === 'called') return calledChoices();
  if (s.phase === 'silence') return silenceChoices();
  if (s.phase === 'truth') return truthChoices(s);
  if (s.phase === 'ways') return waysChoices(s);
  if (s.phase === 'boardroom') return boardroomChoices(s);
  if (s.phase === 'night') return nightChoices(s);
  return [];
}
