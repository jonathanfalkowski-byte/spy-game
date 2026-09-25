/** Chapter 9 (shared bridge) · Assembling the Case: arrive → assemble (hub) → resolve → complete.
 * Additive in revision 19 after a lane's Chapter 8 ending (own-power is the live feeder; the other lanes reach
 * arrive through the Chapter 7 in-development placeholder), gated behind chapter9Playable(). Wording and flags:
 * docs/story/scripts/CHAPTER_9_ASSEMBLING_THE_CASE_SCRIPT.md with the Phase 0 decisions in
 * docs/handoffs/2026-09-23-code-chapter9-assembling-the-case.md. case.strength derives at resolve from the
 * c9.took.* count; the name is never missable (the resolve floor). No intimacy in this chapter.
 * Deepening pass 2 (2026-09-24): the witness has a second beat (Celeste asks whether she likes being her; Marcus asks
 * what she took from his party) and the name has a quiet beat of its own (the photographs, the dark, her building).
 * Both are held in c9.open and add no case weight.
 * Set pieces (2026-09-24): every hub move is a scene with a moment of its own, held in c9.open and adding no case
 * weight: the ORACLE page (score yourself / close the file), the chain (split it / keep it together), the sender's
 * last page (ask who they are / call it square), the reporter (her name / a source), Maya before her shift
 * (are you in danger?), the borrowed door (tell them / keep it). The morning, the floor, the name and the orchid
 * at midnight play as scenes too.
 * New scenes (2026-09-24), own-power, before the hub opens (held in c9.open): the Usual Table (Castellane keeps a
 * standing Thursday table for two in her name, settled by the Laurent fund; c9.table = sit | ask | cancel), then,
 * if the Aster piece ran, the Harbour auction where the Laurent fund buys Lot 14, which is her (c9.auction). Neither
 * adds case weight; both put Celeste in the room before the name.
 * New scenes, round 2 (2026-09-24): the tailor (own-power, before Castellane: the man who made her charcoal finds his
 * chalk mark and a centimetre's difference; c9.tailor = alter | ask | leave), and the lawyer (every road, at resolve:
 * Nadia Brandt, "Are you ready to be Exhibit A?"; c9.lawyer = retain | exhibit | thank). Neither adds case weight.
 * New scenes, round 3 (2026-09-24), own-power: the Straits Club (arrive: a lapsed subscription, a condolence book, and
 * C.'s entry in green ink, "Not missing. Mislaid."; c9.club = photo | ask | close), and Sloane at the café table
 * (resolve, before the lawyer: "it will not want to be found by you"; c9.sloane = nothing | page | afraid).
 * Sequence (2026-09-25), "The Watcher's Rent" (own-power, resolve, before Sloane; the band is already fixed): who pays
 * for the flat with the binoculars (Chapter 8's fire escape). The letting agent, the post boxes, or a knock on the door,
 * where the man from the lift answers (c9.rent = agent | post | knock); every way finds L.S.F. Facilities, care of
 * the Laurent Sovereign Fund (a fact). Then the window that evening (c9.window = wave | sign | dark), and in the
 * morning Sloane at the watchers' table.
 * Sequence (2026-09-25), "The Eleven Names" (own-power, arrive, after the club): the condolence book's eleven names,
 * worked through at the kitchen table, lead to Ruth Adair, who worked beside the first Evelynn in Singapore. How she
 * approaches her (c9.ruth-how = letter | class | door); what she asks (c9.ruth-ask = burned | c | you); Ruth's
 * question back, "Was it quick?" (c9.ruth = truth | kind | silent). Ruth knows a reissue when she sees one; the burn
 * in Jakarta is a fact. Held in c9.names-open (how → ask → end); no case weight. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { get6 } from './chapter6-model';
import { canCompare6 } from './chapter6-proof';
import { getKey, setKey } from './chapter7-model';
import { sloaneDoubts } from './sloane-standing';

export type C9Scene = { title: string; place: string; blocks: Block[] };
export type C9Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get9 = (s: GameState, k: string) => s.choices['c9.' + k];
export const set9 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c9.' + k] = v;
};
const offer9 = (id: string, label: string, hint: string, next: string, apply?: C9Choice['apply']): C9Choice => ({
  id: 'chapter9.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter9Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER9 === '1';

function note9(s: GameState, key: string, text: string, source: string) {
  if (get9(s, 'rec.' + key) !== undefined) return;
  set9(s, 'rec.' + key, String(s.history.length));
  set9(s, 'event.' + key, String(s.revision));
  set9(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c9.' + key);
  s.knowledge.push('c9.' + key);
}

export const ORACLE_FEE = 60;
const cash = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const crossover = (s: GameState) => getKey(s, 'own.crossover');
const borrowedDoor = (s: GameState) => ['executive', 'institutional'].includes(crossover(s) ?? '');
const SENDER = 'Unknown sender';

// ── The strength budget: one weight per hub move taken, banded at resolve ──

export const weights9 = (s: GameState) => Object.keys(s.choices).filter((k) => k.startsWith('c9.took.')).length;
export const band9 = (n: number): 'thin' | 'supported' | 'strong' => (n >= 3 ? 'strong' : n === 2 ? 'supported' : 'thin');
const took = (s: GameState, move: string) => get9(s, 'took.' + move) !== undefined;
const take = (s: GameState, move: string) => set9(s, 'took.' + move);

// ── Gate predicates (Phase 0) ──

/** Celeste is the Ch6 corroborator when she confirmed the leaf; Marcus's Glass House memory is the fallback. */
export function witness9(s: GameState): 'celeste' | 'marcus' | undefined {
  if (get6(s, 'celeste') === 'let-be' || get6(s, 'celeste') === 'pressed') return 'celeste';
  if (!get6(s, 'celeste') && s.day.records.some((r) => r.key === 'mission.marcus-memory')) return 'marcus';
  return undefined;
}
export function lever9(s: GameState): 'oracle' | 'oracle-inferred' | undefined {
  if (get6(s, 'oracle-seen') === 'yes') return 'oracle';
  return get6(s, 'proof-opened') ? 'oracle-inferred' : undefined;
}
export const evidence9 = (s: GameState) => get6(s, 'photo-custody') === 'phone' || canCompare6(s);
export function allies9(s: GameState): ('rook' | 'editor' | 'maya' | 'crossover')[] {
  const out: ('rook' | 'editor' | 'maya' | 'crossover')[] = [];
  if (getKey(s, 'own.alliance.rook') === 'owed') out.push('rook');
  if (get5(s, 'editor-contact') && getKey(s, 'own.alliance.editor') !== 'spent') out.push('editor');
  if (get6(s, 'maya') === 'restored' && !getKey(s, 'own.alliance.maya')) out.push('maya');
  if (borrowedDoor(s)) out.push('crossover');
  return out;
}
/** How the name was reached, first match wins: the editor's filing, a borrowed door, the sender's page, else public. */
export function nameRoad9(s: GameState): 'editor' | 'crossover' | 'rook' | 'public' {
  if (getKey(s, 'own.alliance.editor') === 'spent') return 'editor';
  if (borrowedDoor(s)) return 'crossover';
  if (getKey(s, 'own.alliance.rook') === 'spent') return 'rook';
  return 'public';
}

export const chapter9Definitions: Record<string, C9Scene> = {
  arrive: { title: 'The Same Wall', place: 'THE NEXT MORNING', blocks: [] },
  assemble: { title: 'Assembling the Case', place: '· WHAT YOU HOLD', blocks: [] },
  resolve: { title: 'What You Can Carry', place: '· THE CASE', blocks: [] },
  complete: { title: 'The Room Ahead', place: '· THAT NIGHT', blocks: [] },
};
export const chapter9Scenes = Object.entries(chapter9Definitions).map(([phase, scene]) => ({
  id: `chapter9.${phase}` as NodeId,
  ...scene,
}));

// ── Blocks ──

const numbers = ['', 'one thing', 'two things', 'three things', 'four things'];
/** The evidence chain names only what she actually holds (review 2026-09-24). */
function chainText9(s: GameState): string {
  const links = [
    ...(get6(s, 'photo-custody') === 'phone' ? ['the leaf’s dated handoff, photographed and kept'] : []),
    ...(s.choices['c3.verified-date'] ? ['the instruction date in your own clinical record'] : []),
    ...(s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn' ? ['what you carried out of the Glass House yourself'] : []),
    'the Blackglass Singapore location history you already hold',
    ...(took(s, 'witness') ? ['the witness’s confirmation'] : []),
  ];
  const list = links.length > 1 ? links.slice(0, -1).join(', ') + ' and ' + links.at(-1) : links[0];
  return `You build the chain the way it has to be built to survive contact with a lawyer: ${list}. ${
    links.length >= 3
      ? `${numbers[links.length] ?? 'Several things'}, captured independently, that could not have fed each other. Agreement across them is the closest thing to proof you can own.`
      : 'It is not much. It is sourced, and it is yours, and it points the same way.'
  }`;
}

/** What last week's choices cost this morning (Chapters 7 and 8, own-power). */
function morningAfter9(s: GameState): Block[] {
  const out: Block[] = [];
  if (s.choices['c8.gala'] === 'carpet' || s.choices['c8.press'] === 'run')
    out.push(p('The first thing through the door is a lawyer’s letter, hand-delivered, addressed to Evelynn Vale. It is two paragraphs long, courteous and very specific, on behalf of a client it does not name, about statements concerning a company it does not name either. You read it twice. It is the most frightened thing anyone has sent you.'));
  const theoNight = s.choices['c7.evening'] === 'theo' && s.choices['c7.evening-outcome']?.startsWith('intimate');
  if (theoNight)
    out.push(q('Theo Marr · voicemail', 'Evelynn. Theo. I promised myself I wouldn’t, and then I did a little digging anyway, because it’s what I am. You didn’t exist eighteen months ago. No school, no flat, no dentist. I don’t care. I’m telling you so you hear it from me first, and not from whoever else is digging. Call me.'));
  else if (s.choices['c7.theo'] === 'curious')
    out.push(q('Theo Marr · voicemail', 'Evelynn. Theo. I did a little digging, as one does. You are a very beautiful woman who did not exist eighteen months ago. No school, no flat, no dentist. Call me before I decide what that is. I would so much rather hear it from you.'));
  if (s.choices['c8.dig-rival'] === 'seen')
    out.push(p('At the café on the corner, the man in the good coat from the registry is reading a newspaper at the window table. He does not look up when you pass. He does not need to.'));
  if (s.choices['c8.rook-report'] === 'false')
    out.push(p('The unknown thread has been silent for three days. In all the time you have known the sender, it has never been silent for three days.'));
  return out;
}

/** Last night's list, still with her in the morning (Chapter 8's c8.list). */
function listMorning9(s: GameState): Block[] {
  const list = s.choices['c8.list'];
  if (list === 'read')
    return [
      p('You wake at six with the list still behind your eyes, the way a bright window stays when you close them: the plain type, the blank line, and under it the entry that was you. VALE, E. RETURNED TO INVENTORY. You lie still and let it fade, and it does not fade.'),
    ];
  if (list === 'copied')
    return [
      p('You wake at six. In the night the three lines on the inside of your wrist have smudged into something like a bruise. You copy them onto paper at the kitchen table before you shower, in capitals, and then you stand under the water and watch the last of the eyeliner go grey and run down the drain.'),
    ];
  return [];
}

function arriveBlocks(s: GameState): Block[] {
  const frame: Block[] = ownPower(s)
    ? [
        ...listMorning9(s),
        p('You came this far the hardest way, with no clearance and no one’s permission, and a truth you pulled out of a closed shell. You know what Meridian is now: not a company that keeps secrets, a company that makes them. You are one of its products. So is the woman whose name you wear.'),
        p(
          borrowedDoor(s)
            ? 'You did not do all of it alone, and you have not forgotten whose door you borrowed to get here.'
            : 'And you did it without borrowing a single door. Whatever you build next, no one gets to say they handed it to you.',
        ),
      ]
    : [p(`[Chapter 9 · ${getKey(s, 'route.lane') ?? 'unknown'} road into the bridge — in development] You arrive at the same wall the others do, carrying what your road gave you.`)];
  return [
    ...frame,
    ...(ownPower(s) ? morningAfter9(s) : []),
    p('And the authorization to reuse her legend — the real woman who lived it before you were fitted into it — was signed at Meridian’s board.'),
    p('You make coffee and drink it at the window. The bench across the road is empty. The bakery shutters go up at seven, the way they always do, and the girl who opens them looks up at your window, the way she has started to, and then away.'),
    t('I have the shape. What I do not have is a case — something sourced, something that holds when an institution tries to make it disappear — and I do not have the name. Before I decide anything, I find out who, and I build something I can carry into the room.'),
    ...(ownPower(s) && !get9(s, 'club') ? clubLead : []),
  ];
}

// ── The Straits Club (new scene, round 3) ──

const clubLead: Block[] = [
  p('The first envelope in the morning post is thick and cream and addressed to Ms E. Vale in a secretary’s round hand: the Straits Club, regretting that her subscription has lapsed, and hoping very much that she will call in at her convenience to renew.'),
  p('You have walked past the Straits Club a hundred times: a white stucco house on the square behind the cathedral, with a brass bell and a flag nobody can name. You go at eight, when it opens, in the charcoal.'),
  p('The secretary is a small, precise woman called Miss Loh, who looks up from her desk and puts her pen down very carefully, as if it might go off.'),
  q('Miss Loh', 'Ms Vale. We — you’ll forgive me. We were told you were missing.'),
  p('She recovers beautifully. She takes your renewal. And then, because she is kind, or because she has been waiting a long time to do it, she brings out the book.'),
  p('It is a condolence book, leather, with a ribbon. On the first page, in the secretary’s round hand: For Ms E. Vale, member, missing since the spring. Our thoughts are with her friends. Under it, eleven entries from people whose names mean nothing to you, and one near the bottom in green ink, in a confident, looping hand.'),
  q('The book', 'Not missing. Mislaid. She always comes back. — C.'),
  t('She wrote it in a book of condolences. She would not let anybody else grieve her.'),
];

function clubChoices(): C9Choice[] {
  const leave = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer9('club-' + id, label, hint, 'arrive', (x) => {
      set9(x, 'club', id);
      set9(x, 'names-open', 'how');
      after?.(x);
      return [...body, ...namesLead(x)];
    });
  return [
    leave('photo', 'Photograph the page', 'While Miss Loh pretends to look for a pen.', [
      p('You photograph it while Miss Loh pretends to look for a pen: the round hand, the eleven names, the green ink.'),
      t('Eleven people wanted her back. One of them knew she was coming.'),
    ], (x) => note9(x, 'club', 'The Straits Club kept a condolence book for the first Evelynn, missing since the spring. One entry, in green ink in C.’s looping hand, refuses to grieve: “Not missing. Mislaid. She always comes back.”', 'The Straits Club condolence book, photographed')),
    leave('ask', 'Ask Miss Loh who else came asking', 'Somebody reads a book like this more than once.', [
      q('You', 'Has anybody else asked after me?'),
      q('Miss Loh', 'Only one. A lady, every month, on the first Thursday, before her lunch. She reads the book, and has a glass of water, and goes. She has not missed a month.'),
      t('The first Thursday. Before her lunch. The table for two, and the glass of water, and the book. She has built a whole religion out of a woman who is sitting in front of me wearing my face.'),
    ]),
    leave('close', 'Close the book', 'Leave the dead their book.', [
      p('You close the book on its ribbon and slide it back across the desk. Miss Loh takes it without a word and puts it away in a drawer that she locks.'),
      q('Miss Loh', 'Welcome back, Ms Vale.'),
      t('Everybody in this city is so pleased to see her. I am the only one who knows she isn’t here.'),
    ]),
  ];
}

// ── The Eleven Names (sequence): the condolence book, and Ruth Adair ──

function namesLead(s: GameState): Block[] {
  return [
    p(
      get9(s, 'club') === 'photo'
        ? 'That night you work through the eleven names from the photograph, at the kitchen table, the way Adrian worked through a list of directors.'
        : 'You wrote the eleven names down on the steps outside the club from memory, the way Adrian memorised filings, and that night you work through them at the kitchen table.',
    ),
    p('It takes until two. A retired judge. Two men in shipping who have since died of the same kind of lunch. A dentist. A former consul and his wife, who signed together. Four club members who seem to sign everything anybody puts in front of them. And one entry near the top, in a small upright hand: Come home, E. — R. Adair.'),
    p('Ruth Adair is in the telephone book, which surprises you, and teaches Mandarin two evenings a week at the adult college by the old harbour, which does not.'),
  ];
}
const ruthMeets: Block[] = [
  p('Ruth Adair is somewhere near seventy, small and straight-backed, her grey hair cut short and practical, with the kind of stillness you have only ever seen in people who were trained to have it. She looks at your face for a long time, from very close, the way the tailor did.'),
  q('Ruth Adair', 'You’re not her. You’re very good. Better than the last one I saw. But you’re not her. She stood with her weight on the left foot, after Jakarta. You stand straight.'),
  t('Better than the last one she saw. There was a last one.'),
  q('Ruth Adair', 'Ask. I have one conversation in me about E., and I have been saving it. You may as well have it.'),
];
const ruthAsks: Block[] = [
  q('Ruth Adair', 'Now you tell me something. When they did it to you, whatever they did. Was it quick?'),
];
const RUTH_FACT = 'Ruth Adair, who worked beside the first Evelynn in Singapore, says she was burned in Jakarta (her name given to the wrong people) and cut loose, and that “they kept the shape”. Ruth knew Evelynn at once for a reissue.';

function namesChoices(s: GameState): C9Choice[] {
  const stage = get9(s, 'names-open');
  if (stage === 'how') {
    const how = (id: string, label: string, hint: string, body: Block[]) =>
      offer9('ruth-' + id, label, hint, 'arrive', (x) => {
        set9(x, 'ruth-how', id);
        set9(x, 'names-open', 'ask');
        return [...body, ...ruthMeets];
      });
    return [
      how('letter', 'Write to her', 'Three careful lines and an initial.', [
        p('You write three lines, careful, signed only with an initial: that you saw her entry in the book at the Straits Club, and would like very much to talk about E. The reply comes the next evening, by hand, under your door: a time, a bench on the harbour wall, and nothing else.'),
        p('She is there before you, in a navy coat, feeding nothing to the gulls.'),
      ]),
      how('class', 'Sit at the back of her evening class', 'Nine adults learning to order tea, and you.', [
        p('You sit at the back of her Tuesday class with a borrowed textbook, among nine adults learning to order tea and ask the way to the station. She teaches for an hour and a half without once looking at the back row.'),
        p('When the others have gone she caps her pen and says, without looking up:'),
        q('Ruth Adair', 'You can come down now. You always did sit at the back.'),
        p('Then she looks up, and stops.'),
      ]),
      how('door', 'Knock on her door', 'No warning. See her face when she sees yours.', [
        p('Her flat is on the third floor of a mansion block by the harbour, with a brass knocker in the shape of a hand. She opens the door, looks at you, and puts her own hand flat against the frame, as if the building had moved.'),
        p('Then she stands aside and lets you in, into a room of books and one good rug and a window full of cranes, and puts the kettle on without asking, the way you do for somebody you have been expecting for a long time.'),
      ]),
    ];
  }
  if (stage === 'ask') {
    const ask = (id: string, label: string, hint: string, body: Block[]) =>
      offer9('ruth-' + id, label, hint, 'arrive', (x) => {
        set9(x, 'ruth-ask', id);
        set9(x, 'names-open', 'end');
        note9(x, 'ruth', RUTH_FACT, 'Ruth Adair, in person');
        return [...body, ...ruthAsks];
      });
    return [
      ask('burned', 'Ask what happened in Jakarta', 'The weight on the left foot.', [
        q('Ruth Adair', 'Somebody gave her name to the wrong people. In our line that is called being burned, and it is exactly as final as it sounds. She came back with a limp, and nobody would work with her, and a burned woman is no use to anybody except as a shape. They kept the shape.'),
        q('Ruth Adair', 'Who lit the match? Nobody knows. Everybody has a theory. Mine is that it hardly matters who lit it, when the house was insured.'),
        t('Returned to inventory. The insurance paid out, and the insurance was me.'),
      ]),
      ask('c', 'Ask what C. did afterwards', 'The flat on Emerald Hill, the week after.', [
        q('Ruth Adair', 'C. sat in her flat for an afternoon with the door shut. I know, because I lived across the landing, and I heard her not crying. Then she went back to the office and signed the papers.'),
        q('Ruth Adair', 'She is very good at grief, C. She does it in an afternoon, and then she invoices.'),
        t('An afternoon of not crying, and then the papers. I will remember that, the next time she is warm to me.'),
      ]),
      ask('you', 'Ask what she thinks you are', 'She has seen this done before.', [
        q('Ruth Adair', 'You’re the reissue. The shape, with somebody new inside it. They’ve done it before, with less. What they have never done before, as far as I know, is put somebody inside it who asks questions.'),
        q('Ruth Adair', 'She never asked a question in her life she didn’t already know the answer to. That was what made her good. You ask real ones. It will either save you or be the end of you, and I am too old to guess which.'),
      ]),
    ];
  }
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer9('ruth-' + id, label, hint, 'arrive', (x) => {
      delete x.choices['c9.names-open'];
      set9(x, 'ruth', id);
      return [
        ...body,
        q('Ruth Adair', 'Go home, whoever you are. Don’t come here again, and don’t write my name down anywhere.'),
        p('On the way home you do not write her name down anywhere. You find you can remember everything she said without trying, the way you remember the few things in your life that were said to you and not to her.'),
      ];
    });
  return [
    answer('truth', 'Tell her no', 'She would know if you lied.', [
      q('You', 'No.'),
      p('She nods, slowly, as if you had confirmed a price.'),
      q('Ruth Adair', 'No. It never is.'),
    ]),
    answer('kind', 'Tell her yes', 'A kind lie, for somebody who loved her.', [
      q('You', 'Yes. Quick.'),
      p('She looks at you for a long moment, and knows you are lying, and is grateful anyway, and does not say so.'),
    ]),
    answer('silent', 'Say nothing', 'Let her read it in your face.', [
      p('You say nothing. After a while she puts her hand over yours for a moment, dry and light as paper, and takes it back.'),
    ]),
  ];
}

// ── The Watcher's Rent (sequence): who pays for the flat with the binoculars ──

const rentLead: Block[] = [
  p('That evening you do something you have been putting off since the fire escape. You stand at your own window with the lights off and look across the gap at the flat one floor up, where the blind is half down and the table is in the window.'),
  p('There is a board fixed to the railings of the building opposite, the kind letting agents leave up for years: TO LET, a number, a name. The flat above it has not been to let for months. Somebody is paying for it.'),
  t('A watcher is an expense. Somebody signs for it every month. Adrian would have gone looking for the invoice.'),
];
const rentFound = (s: GameState): Block[] => [
  p('L.S.F. You look it up anyway, at the kitchen table in the dark, and it takes four minutes: a facilities company, wholly owned by the Laurent Sovereign Fund, that rents flats and cars and keeps people in them.'),
  t(`She pays a man to sit in a window and look at mine. Not Meridian. Not the board. Her. The fund that keeps a table for two${get9(s, 'auction') ? ', and bought my picture' : ''}, and signs condolence books in green ink. This part is personal.`),
  p('Across the gap the blind goes up an inch. The table lamp comes on. He is at the window, and the binoculars are in his hands.'),
];
const RENT_FACT = 'The flat opposite Evelynn’s, where a man keeps binoculars on her window, is let to L.S.F. Facilities Ltd, a company wholly owned by the Laurent Sovereign Fund.';

function rentChoices(s: GameState): C9Choice[] {
  const pryce = s.choices['c7.grey-door'] === 'ring';
  const find = (id: string, label: string, hint: string, body: Block[], source: string) =>
    offer9('rent-' + id, label, hint, 'resolve', (x) => {
      set9(x, 'rent', id);
      note9(x, 'watcher-rent', RENT_FACT, source);
      return [...body, ...rentFound(x)];
    });
  return [
    find('agent', 'Ring the letting agent as a would-be tenant', 'Ask for that flat. Be disappointed. Ask who has it.', [
      q('Letting agent', 'The second-floor flat? I’m afraid that one’s taken, madam. Long let, corporate. Paid a year in advance.'),
      q('You', 'Which corporation? I like to know who my neighbours are.'),
      p('A pause, and keys, and the small sigh of somebody deciding it does no harm.'),
      q('Letting agent', 'L.S.F. Facilities. They take several of ours. Lovely clients. Never any trouble.'),
    ], 'The letting agent, on the telephone'),
    find('post', 'Read the post boxes in the lobby', 'Every flat gets post. Even that one.', [
      p('The street door opposite is on the latch, the way street doors are when too many people have keys. The post boxes are brass, numbered, most of them with a name on a card. The one for the second floor has no name, only a printed label, and the corner of an envelope showing at the slot.'),
      p('You ease it up with a fingernail far enough to read: L.S.F. FACILITIES LTD. And under it, smaller, the part you have been expecting all day without letting yourself expect it: c/o LAURENT SOVEREIGN FUND.'),
    ], 'The post boxes in the building opposite'),
    find('knock', 'Go up and knock', 'Ask the man himself.', [
      p('You climb two flights of stairs that smell of somebody else’s dinner and knock. After a long time the door opens on the chain.'),
      p(
        pryce
          ? 'It is Mr Pryce: the man from the lift, D.P. of the sticker on your window frame. Shirtsleeves, reading glasses, the grey coat on a hook behind him. On the table in the window, the binoculars, resting on a folded newspaper exactly as they were.'
          : 'It is the man from the lift. Shirtsleeves, reading glasses, the grey coat on a hook behind him. On the table in the window, the binoculars, resting on a folded newspaper exactly as they were.',
      ),
      q('Man from the lift', 'Ms Vale. I’m not supposed to have visitors.'),
      q('You', 'Who pays your rent?'),
      p('He looks at you over the chain for a long time. He looks, you think, very tired.'),
      q('Man from the lift', 'The same people who pay yours. I watch the building. I’m paid to see that nobody bothers you. That’s all it is.'),
      q('Man from the lift', 'L.S.F. Facilities. Look it up. And then, if you’ve any sense, stop looking.'),
      p('He closes the door gently, the way you close a door on somebody sleeping.'),
    ], 'The man in the flat opposite, at his own door'),
  ];
}

function windowChoices(): C9Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer9('window-' + id, label, hint, 'resolve', (x) => {
      set9(x, 'window', id);
      return [...body, ...sloaneLead(x)];
    });
  return [
    answer('wave', 'Turn your lamp on and wave', 'The way you would to a neighbour.', [
      p('You turn your own lamp on, so that he can see you properly, and lift a hand, the way you would to a neighbour. After a long moment the binoculars come down. He does not wave back. But he stays where he is, in the light, as if he has been told that he may be seen now.'),
      t('Good. Let her hear that I waved.'),
    ]),
    answer('sign', 'Write her a message in the window', 'Lipstick on cardboard. Capitals.', [
      p('You write it on the back of a cereal box in lipstick, in capitals, and prop it against the glass under the lamp: TELL HER I SAID GOOD MORNING.'),
      p('The binoculars stay up for a long time. Then the blind comes all the way down, the lamp goes off, and the window is only a window.'),
      t('She will have it by breakfast. I want her to.'),
    ]),
    answer('dark', 'Turn every light off and sit in the dark', 'Let him watch an empty room.', [
      p('You turn every light in the flat off and sit on the floor under the window, where he cannot see you, and listen to the building for an hour.'),
      t('Let him watch an empty room. Let him write down that she went dark. Let her wonder what I did in it.'),
    ]),
  ];
}

// ── Sloane at the café table (new scene, round 3) ──

function sloaneLead(s: GameState): Block[] {
  return [
    p('In the morning Sloane is sitting at the café table outside your building, the one under the awning where the watchers usually sit, with two coffees in front of her and her coat still buttoned. She does not wave. She waits until you have seen her, and then pushes the second cup an inch toward the empty chair.'),
    q('Sloane', 'You have been busy. I would like to know how busy.'),
    p('She looks older in daylight than she does in her car. There is a grey thread in her hair you have not noticed before, and her hands around the cup are very still, the way hands are when somebody is making them be still.'),
    ...(sloaneDoubts(s) ? [q('Sloane', 'And before you answer: no guesses. Not with me. Not any more.')] : []),
    q('Sloane', 'Whatever you have found at the top, it will not want to be found by you. It did not want to be found by me.'),
  ];
}

function sloaneChoices(): C9Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer9('sloane-' + id, label, hint, 'resolve', (x) => {
      set9(x, 'sloane', id);
      return [...body, ...lawyerLead];
    });
  return [
    answer('nothing', 'Tell her nothing', 'Sit down, drink her coffee, give her nothing.', [
      p('You sit down and drink her coffee.'),
      q('You', 'I’ve been shopping.'),
      p('Sloane almost smiles. She finishes her own cup, stands, puts a coin on the table for both, and buttons a coat that is already buttoned.'),
      q('Sloane', 'Then shop carefully.'),
    ]),
    answer('page', 'Show her one page', 'The least dangerous one. Watch her read it.', [
      p('You take one page out of the envelope, the least dangerous one, and lay it on the table between the cups. Sloane reads it without touching it. Her face does nothing at all. Then she turns it face down with one finger.'),
      q('Sloane', 'Put that away. And never show it to anyone at a table on a street again. Including me.'),
      t('She was frightened for me. Or of what I had. For a second it was impossible to tell the difference, and I think that is the truth about Sloane.'),
    ]),
    answer('afraid', 'Ask her what she is afraid of', 'She has never answered a direct question. Ask one anyway.', [
      q('You', 'What are you afraid of, Sloane?'),
      p('A long silence. A bus goes past. Somewhere across the road the bakery shutters go up.'),
      q('Sloane', 'Being right about you.'),
      p('She stands, and leaves the money, and goes, and does not look back, and you sit with two cups going cold until you understand that it was the kindest thing she knows how to say.'),
    ]),
  ];
}

// ── The lawyer (new scene, round 2): what the case makes of her ──

const lawyerLead: Block[] = [
  p('Before you decide anything, you do what Adrian would have done: you get an opinion. Nadia Brandt is seventy, retired from the bar in the sense that she no longer wears the wig, and gives three free hours a month in a flat full of books above a locksmith’s. You find her the way you find everything now: a name that comes up three times in three places.'),
  p('She gives you forty minutes and a cup of very strong tea. She reads everything you have, fast, with a pencil she never uses, and then she takes her glasses off.'),
  q('Nadia Brandt', 'It’s a case. Of a sort. Here is your difficulty. Every one of these documents is about a woman who, legally, is you. The moment you put this in front of anybody who matters, you stop being the person bringing the case and start being the evidence in it.'),
  q('Nadia Brandt', 'They will want your history. Your records. Your medical file, very possibly. Are you ready to be Exhibit A, Ms Vale?'),
];

function lawyerChoices(): C9Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer9('lawyer-' + id, label, hint, 'resolve', (x) => {
      set9(x, 'lawyer', id);
      return body;
    });
  return [
    answer('retain', 'Ask her to act for you', 'When it comes to it. She will want to know you mean it.', [
      q('You', 'When it comes to it, will you act for me?'),
      q('Nadia Brandt', 'I’m seventy. I have exactly one more fight in me, and I was saving it for something with a better villain. Fine. When you are ready, and not a day before.'),
      t('A lawyer who knows. The first person on my side who will be paid, when it comes, to be on it.'),
    ]),
    answer('exhibit', 'Tell her you are ready to be the evidence', 'You have been evidence since the day you woke in this face.', [
      q('You', 'I have been evidence since the day I woke up in this face. I would rather be evidence I chose.'),
      p('She looks at you for a long time, and then laughs, one short dry bark, and pours you more tea you did not ask for.'),
      q('Nadia Brandt', 'Well. That’s the first answer anyone has given me in ten years that I couldn’t have written for them.'),
    ]),
    answer('thank', 'Thank her, and keep it yourself', 'Not yet. Not anybody.', [
      p('You thank her and fold everything back into its envelope. On the stairs down past the locksmith’s you stop for a moment, because your hands are not quite steady.'),
      t('Exhibit A. I knew that. I had not heard anybody say it out loud.'),
    ]),
  ];
}

function resolveBlocks(s: GameState): Block[] {
  const blocks: Block[] = [
    p('You put it back together into one pile on the floor and sit with your back against the bed and read it through from the beginning, the way a stranger would: a lawyer, a reporter, a board. Slowly. Looking for the place where it gives.'),
  ];
  if (get9(s, 'name-road') === 'floor')
    blocks.push(t('I already have the last piece. I have been refusing to say it: the face on the board is one I have met, and when I let myself, I know it. Celeste.'));
  const strength = getKey(s, 'case.strength');
  blocks.push(
    p(
      strength === 'strong'
        ? `It holds. A named board member who knew the original${get9(s, 'chain') ? ', a chain of records that agree' : ''}${get9(s, 'lever') ? ', a system that flagged the defect before it was sold' : ''}. Not a rumour — a case from more than one direction, that would survive someone trying to make it vanish. You can walk into the next room and put it on the table.`
        : strength === 'supported'
          ? 'It holds up, mostly. Enough to force a conversation, not yet enough to force a hand. You have the name and one clean corroboration; the rest you will have to argue.'
          : 'It is thin. A name you are sure of and not much you can prove around it. It is enough to walk in knowing who you are looking at. It is not enough to make them afraid. That, too, is a place you can start from — and it is entirely yours.',
    ),
  );
  const spent = ['rook', 'editor', 'maya', 'crossover'].some((a) => took(s, a));
  const seen = !!getKey(s, 'own.exposed') || get9(s, 'name-road') === 'public';
  blocks.push(
    p(
      [
        spent ? 'You are lighter an ally or two than you were; help was not free, and you chose which kind.' : '',
        seen ? 'You are more visible for having gone looking, and Meridian is a thing that looks back.' : '',
        'And you are still the only person holding what you assembled.',
      ]
        .filter(Boolean)
        .join(' '),
    ),
    t('Adrian would have called it a first draft. He would also have been frightened of it, and he would have been right to be.'),
  );
  if (ownPower(s) && !get9(s, 'rent')) blocks.push(...rentLead);
  else if (ownPower(s) && !get9(s, 'sloane')) blocks.push(...sloaneLead(s));
  else if (!get9(s, 'lawyer')) blocks.push(...lawyerLead);
  return blocks;
}

export function chapter9Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter9') return [];
  if (s.phase === 'arrive') return arriveBlocks(s);
  if (s.phase === 'assemble')
    return [
      p('You spread it all out and sort it: what is sourced, what is only argued, and the one name you still have to reach.'),
      p('The kitchen table is too small, so you use the floor: three piles on the boards under the window, the way Adrian sorted an acquisition before he let anyone else see it. Sourced. Argued. Missing. The third pile is a single blank card.'),
      t('A case is not what I know. It is what I can make somebody else unable to deny.'),
      ...(get9(s, 'open') === 'tailor' ? [...tableMessage, ...tailorLead] : []),
    ];
  if (s.phase === 'resolve') return resolveBlocks(s);
  if (s.phase === 'complete')
    return [
      t('I have the name, and a case the size of my road. I went looking for a face on that board and found one I had already met, which means she has already met mine. Celeste has seen my face too. She saw it first, across a room at the Glass House, and she smiled.'),
      p('You make tea you do not drink. You put the case into one stiff envelope and the envelope into the bag that goes everywhere with you. At eleven you turn the lights off and sit at the window, the way you have every night this week, and watch the bench.'),
      p('Near midnight there is a knock. When you open the door there is nobody in the corridor: only a single white orchid in a black pot on the mat, and a card tucked into the moss in a confident, looping hand.'),
      p('You stand in the doorway in your stockinged feet and look up and down the corridor for a long time. The lift is on the ground floor. The stairwell door is still swinging, very slightly, on its closer.'),
      p('“Breakfast? — C.”'),
      // Chapter 7's forwarded letter: the same hand, fourteen months on.
      ...(['kept', 'studied'].includes(s.choices['c7.card'] ?? '')
        ? [t('The same looping hand as the card from Singapore. For E., who always comes back. She waited fourteen months for Evelyn to come home to breakfast. Now she has decided I will do.')]
        : s.choices['c7.card'] === 'burned'
          ? [t('I burned the last one. It turns out she writes more than once.')]
          : []),
      p('You carry the orchid in and put it on the kitchen table, because you cannot think where else it would go. Then you sit down across from it, as if it were a guest, and you do not sleep.'),
    ];
  return [];
}

// ── The hub ──

function witnessBlocks(s: GameState, who: 'celeste' | 'marcus'): Block[] {
  return [witnessSetting(s, who), ...witnessWords(s, who)];
}
function witnessSetting(s: GameState, who: 'celeste' | 'marcus'): Block {
  if (who === 'marcus')
    return p('Marcus meets you in a hotel bar that closes to the public at six, because men like Marcus do not meet anyone anywhere that stays open. The barman sets down two glasses without being asked and goes to polish something at the far end. Marcus watches you cross the room the way he did at the Glass House, and this time you let him watch.');
  if (get6(s, 'celeste') === 'pressed')
    return p('Celeste gives you twenty minutes on the terrace of her fund, above the river, with the heaters on and nobody at the other tables. She does not stand when you arrive.');
  return p('Celeste gives you lunch on the terrace of her fund, above the river, with the heaters on and nobody at the other tables. She kisses you on both cheeks, holds your hands a moment too long, and orders for you without asking. It is warm and generous, and it makes the back of your neck prickle.');
}
function witnessWords(s: GameState, who: 'celeste' | 'marcus'): Block[] {
  if (who === 'marcus')
    return [
      q('Marcus', 'She left the gathering before the speeches. I noticed because we were meant to close something that night, and we closed it without her. That’s what I can give you: where she was, and when she stopped being there. Not why.'),
      p('Professional memory, not friendship: a date, an absence, a deal that went on without her. It fits the record. It proves nothing about why.'),
    ];
  if (getKey(s, 'case.name'))
    return [
      q('Celeste', 'So you know. … That’s her. That’s the week she vanished. Now you know I knew her. Ask yourself why I’m still telling you the truth.'),
      p('She confirms it anyway, and it is the most frightening thing she has done. She is not afraid of what you hold. Not yet.'),
    ];
  if (get6(s, 'celeste') === 'pressed')
    return [
      q('Celeste', 'You pushed me once already. Fine. Show me the date.'),
      p('She reads it the way you’d check a bill. “That’s her. That’s the week she vanished.” She doesn’t touch your arm this time.'),
    ];
  return [
    q('Celeste', 'I knew her. Not the file of her — her, the way you know someone you had breakfast with. If you show me a date and a handoff and it matches the woman I knew, I’ll tell you it matches. I won’t tell you it was a crime, because I don’t know that it was. I’ll tell you it was her.'),
    p('She confirms the ledger leaf fits the person she knew — the date, the habit, the absence. No more than that; she is not pushed past it. It is firsthand, and it is clean.'),
  ];
}

function nameBlocks(s: GameState, road: ReturnType<typeof nameRoad9>): Block[] {
  return [
    p(
      `You go at the board itself.${
        ownPower(s)
          ? get5(s, 'published')
            ? ' You use the one instrument you own — attention — to make Meridian’s silence expensive, and you read what moves when a closed thing is looked at.'
            : ' You use the only instruments you have — patience, paper and the public record — and you read what moves when someone keeps asking.'
          : ''
      } ${
        road === 'public'
          ? 'It is slow, self-funded, and entirely yours.'
          : road === 'editor'
            ? 'The reporter’s filing names the board faster and cleaner than you could alone.'
            : road === 'rook'
              ? 'The sender’s offshore page names the board faster, if not cleaner.'
              : 'The door you borrowed shows you the board faster and cleaner than you could alone.'
      }`,
    ),
    p('It takes most of the day. You work it the way Adrian worked a due diligence: every director, every filing, every company that shares an address with another company. By four in the afternoon the board has seven seats, and six of them are names that mean nothing: nominees, accountants, a lawyer in Jersey who sits on four hundred boards and has never attended one.'),
    p('And the seventh name surfaces, and you go still. You know it. Not from a file — from an evening. A hand on your arm and “You disappeared before breakfast.” She was not greeting an old friend she mistook you for. She was reading the fit of a legend she had helped sign away.'),
    t('Celeste. The warmth was the appraisal. Someone who knew the woman I am wearing — knew her the way you know a person — sat on the board that spent her, and then touched my arm.'),
    ...(took(s, 'witness') && witness9(s) === 'celeste'
      ? [p('And she is the one who confirmed the leaf for you. Her own words are in your case now: she knew the woman, she knew the week she vanished. A board member’s firsthand account, freely given, of the life her board reused. She did not help you. She testified.')]
      : []),
  ];
}

// ── Second beats (held in c9.open; no case weight) ──

function witnessAfterChoices(who: 'celeste' | 'marcus'): C9Choice[] {
  const after = (id: string, label: string, hint: string, key: string, body: Block[], extra?: (x: GameState) => void) =>
    offer9(id, label, hint, 'assemble', (x) => {
      delete x.choices['c9.open'];
      set9(x, key, id.replace(/^(terrace|marcus)-/, ''));
      extra?.(x);
      return body;
    });
  if (who === 'marcus')
    return [
      after('marcus-deflect', 'Tell him he gave everything away himself', 'Charm, and a closed door.', 'marcus', [
        q('You', 'Nothing you didn’t hand me yourself, Marcus. You were very generous that night.'),
        p('He laughs, once, and it is almost real. He finishes his drink and stands, and buttons his jacket, and looks at you for a moment as if he is pricing you.'),
        q('Marcus', 'One day you’ll want something from Helix you can’t charm out of it. Come and see me then.'),
      ]),
      after('marcus-debt', 'Owe him one', 'He’ll want it back. Men like Marcus always collect.', 'marcus', [
        q('You', 'I’ll owe you. Not tonight.'),
        p('Something in his face settles, the way it does in men who have just been handed a thing they know how to use. He writes a number on the back of a bar bill and slides it across the table without looking at it.'),
        q('Marcus', 'Then we understand each other. I always collect, Ms Vale. I’m told it’s my best quality.'),
        t('A debt to Marcus Chen. It is a leash. It is also, if I am careful, a door into Helix that nobody else has.'),
      ], (x) => setKey(x, 'own.marcus', 'owed')),
    ];
  return [
    after('terrace-truth', 'Tell her the truth: some days you do', 'Give her something real. See what she does with it.', 'terrace', [
      q('You', 'Some days. More than I expected to.'),
      p('Celeste smiles, and for once the smile reaches her eyes, and that is the worst thing you have seen all week.'),
      q('Celeste', 'She did too. Some days. That was always the trouble with her.'),
      t('She talks about her the way you talk about someone who is still in the next room.'),
    ]),
    after('terrace-turn', 'Turn it back on her', '“Do you like looking at her?”', 'terrace', [
      q('You', 'Do you like looking at her?'),
      p('For a moment the terrace is very quiet. Then Celeste laughs, lightly, signals for the bill and pays it, and on her way past touches your cheek with cool fingers, the way you would straighten a painting.'),
      q('Celeste', 'Very much, darling. That’s rather the point.'),
      t('She did not deny it. She did not need to.'),
    ]),
    after('terrace-leave', 'Thank her and go', 'Take what she gave you and get out of range.', 'terrace', [
      p('You thank her for her time, and she lets you, and you feel her watching you all the way to the lift. The doors close on her raising her glass to you, very slightly, as if to a private joke.'),
      t('I came for a witness. I am leaving with the feeling of having been inspected.'),
    ]),
  ];
}

function nameAfterChoices(): C9Choice[] {
  const sit = (id: string, label: string, hint: string, body: Block[]) =>
    offer9(id, label, hint, 'assemble', (x) => {
      delete x.choices['c9.open'];
      set9(x, 'name-beat', id.replace(/^name-/, ''));
      return body;
    });
  return [
    sit('name-photos', 'Find her in the Glass House photographs', 'You were in the same room. There will be pictures.', [
      p('The society pages kept the Glass House: forty photographs of people being seen, and you in eleven of them. You go through them slowly with the lights off. In the ninth, you are laughing at something Marcus said. In the background, out of focus, Celeste is standing by the window with a glass she is not drinking from.'),
      p('She is not looking at the camera. She is not looking at Marcus. She is looking at you, the way you would look at a coat you had once owned, being worn by somebody else in the street.'),
      t('She was looking at me in every frame she is in. I just never looked at the background.'),
    ]),
    sit('name-dark', 'Sit with it in the dark', 'Don’t do anything yet. Let it be true.', [
      p('You do nothing. You sit at the window with the lights off and the name in your mouth, and let it be true for a while before you make it useful.'),
      p('You disappeared before breakfast. You had heard it as an old friend’s reproach. It was an inventory check. She was confirming the stock had come back to the shelf, and noting, with interest, that it walked differently now.'),
      t('Somebody knew her. Loved her, maybe, in whatever way people like that love. And signed her away anyway, and then came to a party to see how the new fitting took.'),
    ]),
    sit('name-walk', 'Walk past her building', 'See where she lives. Let her see you, if she’s looking.', [
      p('Her fund keeps the top three floors of a glass tower on the river, and the terrace is lit even at midnight. You walk past on the far pavement in a dark coat, not hurrying, not looking up more than a woman walking home would look up.'),
      p('On the terrace, a figure stands at the rail with a glass. It does not wave. It does not move. It stays at the rail exactly as long as it takes you to reach the corner, and then it is gone.'),
      t('If that was her, she knows where I walk now. If it was not, somebody she pays does.'),
    ]),
  ];
}

// ── New scenes: the Usual Table, then the auction (before the hub; no case weight) ──

const tableMessage: Block[] = [
  p('At noon your phone lights with a message from a number you don’t know, in the courteous grammar of expensive places: “Castellane is delighted to confirm your table for two this Thursday, as always. We have missed you, Madame Vale.”'),
  p('You have never been to Castellane. You know of it: a long low room on the river with white cloths and no prices on the menu, where people go to be seen not being seen.'),
  t('As always.'),
];

// ── The tailor (new scene, round 2): the charcoal, and a centimetre ──

const tailorLead: Block[] = [
  p('The charcoal, when you take it out for Thursday, is loose at the shoulder. It always has been, a little; you had stopped noticing. Now you notice. You take it to the tailor above the dry cleaner on the hill, an old man called Mr Anand who works in his waistcoat under a bare bulb with the radio on low.'),
  p('He turns the dress inside out on his table and runs his thumb down the side seam, and stops. There is a small chalk mark inside it: a triangle and a number. He looks at it for a long time. Then he looks at you.'),
  q('Mr Anand', 'I made this. For you. Two years ago, perhaps more. You stood exactly there.'),
  p('He takes the tape from round his neck and measures you without asking, shoulder, back, waist, the way a doctor takes a pulse, and writes the numbers down, and compares them with a card from a drawer, and frowns.'),
  q('Mr Anand', 'A centimetre at the shoulder. Less at the waist. Nobody would ever see it. I see it.'),
  t('A centimetre. That is how close they got. That is how far I am.'),
];

function tailorChoices(): C9Choice[] {
  const fit = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer9('tailor-' + id, label, hint, 'assemble', (x) => {
      set9(x, 'tailor', id);
      set9(x, 'open', 'table');
      after?.(x);
      return [...body, ...tableLead];
    });
  return [
    fit('alter', 'Let him take it in to fit you', 'Make it yours, a centimetre at a time.', [
      q('You', 'Take it in. To fit me now.'),
      p('He pins it on you, humming with the radio, and has it ready by Wednesday. When you put it on in his little curtained corner it fits like something that was always yours.'),
      t('The first thing of hers I have made mine.'),
    ]),
    fit('ask', 'Ask who brought her in', '“Did I come alone, that time?”', [
      q('You', 'Did I come alone, that time?'),
      q('Mr Anand', 'No. A lady brought you. Tall. She chose the cloth, and the colour, and stood where I am standing and told me where it should fall. She paid. You never once looked at the price, I remember. You looked at her.'),
      t('She dressed her. Of course she did. She is still dressing me.'),
    ], (x) => note9(x, 'tailor', 'Mr Anand made the charcoal dress for the first Evelynn about two years ago. A tall woman brought her in, chose the cloth and the colour, and paid.', 'Mr Anand, the tailor on the hill')),
    fit('leave', 'Take it as it is', 'Wear her shape to her table.', [
      q('You', 'Leave it. It’s fine as it is.'),
      p('He folds it into tissue without a word and gives it back, and does not charge you for the pressing, and at the door he says to your back: “It was a very good fit, before.”'),
      t('Her shape, then. I will wear it to her table and see who notices the centimetre.'),
    ]),
  ];
}

const tableLead: Block[] = [
  p('You go on Thursday at one, dressed for it: the charcoal, the heels, hair up and pinned, the face finished twice. The maître d’ is an old man with a white moustache who sees you at the door and stops, and for a moment his whole face is open, like a door somebody forgot to shut.'),
  q('Maître d’', 'Madame. Madame Vale. Welcome back.'),
  p('He takes you, without asking, to a table in the corner window, half hidden by a pillar, with the river on one side and the whole room on the other. Two places are laid. He pulls out the chair with its back to the wall for you, the one that sees the door, and leaves the other empty.'),
  q('Maître d’', 'The sole, madame? No sauce. And the Chablis you never finish.'),
  p('The booking is standing, he says, when you ask, as if it were the most natural thing in the world. The first Thursday of every month, for two. It has never once been cancelled. The account is settled quarterly. He lowers his voice.'),
  q('Maître d’', 'By the Laurent fund, madame. As it always was.'),
];

function tableChoices(): C9Choice[] {
  const sit = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer9('table-' + id, label, hint, 'assemble', (x) => {
      set9(x, 'table', id);
      after?.(x);
      // The auction follows only if her face (or her words) went out into the world.
      if (get5(x, 'published')) {
        set9(x, 'open', 'auction');
        return [...body, ...auctionLead(x)];
      }
      delete x.choices['c9.open'];
      return body;
    });
  return [
    sit('sit', 'Sit, and eat what she ate', 'Let the room watch her come back.', [
      p('You sit. The sole comes, no sauce, and it is exactly what you would have ordered, which frightens you more than anything he has said. You eat all of it. You leave the Chablis a third full, because that, it seems, is what you do.'),
      p('Across the room two women you have never seen raise their glasses to you, very slightly. You raise yours back. You have no idea who they are. They know exactly who you are, or who they think you are.'),
      t('Fourteen months of Thursdays, and the table was kept. Somebody wanted her to be able to come back and find her chair still warm.'),
    ]),
    sit('ask', 'Ask who sat across from you', 'The other chair has been empty a long time.', [
      q('You', 'The other chair. Who used to sit there?'),
      p('He looks at you with something like pity, as if you had asked him your own mother’s name.'),
      q('Maître d’', 'Madame Laurent, of course. Every first Thursday, for years. Since the spring she has come alone. She sits where you are sitting, and orders for you both, and sends the second plate back untouched.'),
      p('He pauses, and straightens a fork that was already straight.'),
      q('Maître d’', 'She will be so glad.'),
      t('She has been having lunch with an empty chair for fourteen months. Now the chair has somebody in it again, and the man who pours the wine is going to tell her so.'),
    ], (x) => note9(x, 'table', 'Castellane keeps a standing table for two, the first Thursday of every month, settled quarterly by the Laurent fund. Celeste Laurent kept it through the fourteen months the first Evelynn was gone, eating alone.', 'Castellane’s maître d’')),
    sit('cancel', 'Cancel the booking', 'End it. It isn’t yours.', [
      q('You', 'I’d like to cancel the standing booking.'),
      p('For the first time his moustache moves in something that is not quite a smile.'),
      q('Maître d’', 'I’m afraid it is not yours to cancel, madame. It was never in your name. Only in your honour.'),
      p('He pours the Chablis anyway. You leave it untouched and walk out past a room of people pretending not to watch you, and on the pavement you find that your hands are cold.'),
    ]),
  ];
}

function auctionLead(s: GameState): Block[] {
  const lot =
    get5(s, 'image-use') === 'none'
      ? 'the proof pages of the Aster piece, with your corrections down the margin in your own hand'
      : get5(s, 'concept') === 'provocative'
        ? 'a signed print of the Aster portrait: the famous back'
        : 'a signed print of the Aster portrait';
  return [
    p('That evening is the Harbour spring auction for the children’s library fund, and you are in it. Aster donated the lot weeks ago, before any of this, and you said yes and forgot. Three hundred people on gilt chairs, a string trio, an auctioneer with a voice like a well-kept lawn.'),
    p(`Lot fourteen is you: ${lot}. They put it on an easel under a light, and three hundred people look from it to you in the third row, and back.`),
    p('It opens at two hundred. Four paddles, then two: a man by the window who deals in photographs, and a young woman at the telephone table at the side, bidding for somebody who is not in the room. At three thousand the man by the window shakes his head. At three thousand five hundred the gavel comes down.'),
    p('The young woman on the telephone says, very clearly, “For the Laurent Sovereign Fund,” and the whole room turns to look at the back.'),
    p('Celeste is standing at the back, out of the light, where the photographers are not: tall, in grey silk, her hair cropped close to her head, a glass in her hand she has not drunk from. She lifts it to you, very slightly, across three hundred people.'),
    p('Then she starts toward you, unhurried, the way she crossed the room at the Glass House.'),
    q('Celeste', 'I simply had to have it, darling. It will hang in my hall, where I can see it every morning.'),
  ];
}

function auctionChoices(): C9Choice[] {
  return [
    moment9('auction-thank', 'Thank her', 'Graciously, in front of everyone. Give the room its picture.', 'auction', () => [
      q('You', 'How generous. The children will be so grateful.'),
      q('Celeste', 'The children. Yes.'),
      p('She kisses you on both cheeks, amused, and keeps her face turned from the cameras while she does it, so that the photograph in the morning will be of you, and of the back of a woman’s head.'),
      t('Even her kindness is arranged for the light.'),
    ]),
    moment9('auction-ask', 'Ask her why', '“Why this, Celeste?”', 'auction', () => [
      q('You', 'Why?'),
      q('Celeste', 'Because it’s a very good likeness, darling. Of someone.'),
      p('She touches your wrist, briefly, with cool fingers, and is gone into the crowd before you can ask her of whom.'),
    ]),
    moment9('auction-leave', 'Leave before she reaches you', 'Let her buy the picture. Not the woman.', 'auction', () => [
      p('You are through the side door before she has crossed half the room. In the service corridor a waiter flattens himself against the wall to let you pass, and behind you, through the door, you hear her laugh once, delighted, as if you had done exactly what she hoped.'),
      t('Let her have the picture. If she wants the rest of me, she will have to ask.'),
    ]),
  ];
}

/** A hub move's own moment: it closes c9.open, records its pick, and adds no case weight. */
function moment9(id: string, label: string, hint: string, key: string, body: (x: GameState) => Block[]): C9Choice {
  return offer9(id, label, hint, 'assemble', (x) => {
    delete x.choices['c9.open'];
    set9(x, key, id.replace(/^[a-z]+-/, ''));
    return body(x);
  });
}

function oracleAfterChoices(): C9Choice[] {
  return [
    moment9('oracle-score', 'Score yourself the way it scored you', 'Honestly. What would it predict now?', 'oracle-beat', () => [
      p('On the back of the page you write the questions it would have asked, and answer them the way it would have: will she go to the board, will she take a deal, will she run. You are honest. It takes an hour. When you read your own answers back, two of them surprise you.'),
      t('Predictable is a thing you can be used for. So is unpredictable, if you know which one they are counting on.'),
    ]),
    moment9('oracle-close', 'Close the file', 'You are not its product. Don’t read yourself like one.', 'oracle-beat', () => [
      p('You close the folder on the line and put your hand flat on it, the way you would hold a door shut against a draught. Then you walk down the hill in the cold and buy a coffee and drink it standing up, like a person.'),
      t('It predicted me. It doesn’t get to keep doing it.'),
    ]),
  ];
}

function chainAfterChoices(): C9Choice[] {
  return [
    moment9('chain-split', 'Split it three ways', 'The originals in one place, copies in two others. Nobody finds all of it.', 'chain-kept', () => [
      p('The originals go into a safe-deposit box at a bank on the far side of the river, rented in the name on your passport. A copy goes into the lining of the old jacket. The third you post to yourself, care of a poste restante counter that will hold it for a month and ask no questions.'),
      t('They would have to find all three. I have watched them find things. I am counting on them getting tired.'),
    ]),
    moment9('chain-one', 'Keep it together, with you', 'One envelope. Nothing to reassemble, nothing out of reach.', 'chain-kept', () => [
      p('You keep it together, in one stiff envelope, in the bag that goes everywhere you go. If they want it, they will have to take it from you in the street, and people like that do not like doing anything in the street.'),
      t('One envelope. Everything I can prove, weighing less than a paperback.'),
    ]),
  ];
}

function rookAfterChoices(): C9Choice[] {
  return [
    moment9('rook-ask', 'Ask who they are', 'You won’t get a name. You might get a voice.', 'rook-beat', () => [
      q('You', 'Who are you?'),
      p('Silence on the line, and then something that might be a laugh, or a breath let out through the nose.'),
      q(SENDER, 'Someone who knew her before you did. Leave by the river side.'),
      p('The line goes dead, and stays dead.'),
      t('Knew her. Everyone I meet knew her before I did.'),
    ]),
    moment9('rook-square', 'Agree you are square', 'Take the page. Owe nothing. Go.', 'rook-beat', () => [
      q('You', 'Square.'),
      p('You put the phone back in the locker and close the door on it, and leave by the river side without being told to, because you have learned.'),
    ]),
  ];
}

function claraAfterChoices(): C9Choice[] {
  return [
    moment9('clara-name', 'Let her use your name', 'On the record. Nobody can say you hid.', 'clara', () => [
      q('You', 'Use it.'),
      p('Clara writes it down, the name you wear, in a hand like a surgeon’s, and underlines it once.'),
      q('Clara Duvall', 'Brave. Or you know something I don’t. I’ll find out which.'),
    ]),
    moment9('clara-source', 'Stay a source', 'Unnamed. Safer, and smaller.', 'clara', () => [
      q('You', 'A source close to the matter.'),
      q('Clara Duvall', 'They always are.'),
      p('She closes the folder and pays for both coffees, and does not ask again.'),
    ]),
  ];
}

function mayaAfterChoices(): C9Choice[] {
  return [
    moment9('maya-honest', 'Tell her yes', 'She asked. She is owed the truth.', 'maya-beat', () => [
      q('You', 'Yes.'),
      p('She nods, as if you had told her the time. Then she reaches across and straightens your collar, which does not need straightening, and goes to work.'),
      t('She didn’t ask me to stop. She knows better. She only wanted to know how frightened to be.'),
    ]),
    moment9('maya-fine', 'Tell her you’re fine', 'She will know. She will let you.', 'maya-beat', () => [
      q('You', 'I’m fine.'),
      q('Maya', 'Everyone says that. You say it worse than most.'),
      p('She leaves first, the way she always does, and does not look back, and you sit with her empty cup until the steam stops.'),
    ]),
  ];
}

function doorAfterChoices(s: GameState): C9Choice[] {
  const julian = crossover(s) === 'executive';
  return [
    moment9('door-tell', 'Tell them what you found', 'Some of it. Enough to be owed.', 'door-beat', () =>
      julian
        ? [
            q('You', 'A board. And one name on it I have met.'),
            p('Julian is quiet for a moment. Then he nods, slowly, the way he nods at a number he had expected and hoped not to see.'),
            q('Julian Mercer', 'Then be careful which rooms you meet her in. Some of them are mine.'),
          ]
        : [
            q('You', 'A board. And one name on it I have met.'),
            p('Sloane does not ask which name. She looks out at the river for a long time, and when she speaks, it is to the window.'),
            q('Sloane', 'Then you know as much as I do. That has never once been a comfortable position for anybody.'),
          ],
    ),
    moment9('door-keep', 'Keep it to yourself', 'They opened the door. They don’t get the room.', 'door-beat', () =>
      julian
        ? [
            q('You', 'Enough to know what to ask next.'),
            q('Julian Mercer', 'That is a very good answer to a question I didn’t ask.'),
            p('He lets you out through the side of the building and does not ask again, and you think he likes you better for it, and you are not sure that is good.'),
          ]
        : [
            q('You', 'I haven’t decided.'),
            p('Sloane almost smiles. It is the first time you have seen her try.'),
            q('Sloane', 'Good. People who decide in cars decide badly.'),
          ],
    ),
  ];
}

function assembleChoices(s: GameState): C9Choice[] {
  const open = get9(s, 'open');
  if (open === 'witness-celeste' || open === 'witness-marcus') return witnessAfterChoices(open === 'witness-celeste' ? 'celeste' : 'marcus');
  if (open === 'name') return nameAfterChoices();
  if (open === 'tailor') return tailorChoices();
  if (open === 'table') return tableChoices();
  if (open === 'auction') return auctionChoices();
  if (open === 'oracle') return oracleAfterChoices();
  if (open === 'chain') return chainAfterChoices();
  if (open === 'rook') return rookAfterChoices();
  if (open === 'editor') return claraAfterChoices();
  if (open === 'maya') return mayaAfterChoices();
  if (open === 'crossover') return doorAfterChoices(s);
  const c: C9Choice[] = [];
  const who = witness9(s);
  if (who && !took(s, 'witness'))
    c.push(
      offer9('assemble-witness', 'Take the corroborator as far as they’ll go', 'Firsthand, and only as far as they really know.', 'assemble', (x) => {
        take(x, 'witness');
        set9(x, 'witness', who === 'celeste' ? 'confirmed' : 'confirmed-pro');
        set9(x, 'open', 'witness-' + who);
        return [
          ...witnessBlocks(x, who),
          who === 'celeste'
            ? q('Celeste', 'May I ask you something, now that you have asked me so much? Do you like being her?')
            : q('Marcus', 'That’s my half. Now yours. What did you take from my party, Ms Vale?'),
        ];
      }),
    );
  const lever = lever9(s);
  if (lever && !took(s, 'oracle'))
    c.push(
      offer9('assemble-oracle', 'Turn the prediction into a lever', 'The maker knew the product was defective. That’s the whole case.', 'assemble', (x) => {
        take(x, 'oracle');
        set9(x, 'lever', lever);
        set9(x, 'open', 'oracle');
        const blocks = [
          p('You do it at the public library on the hill, in the long reading room with the green lamps, because it has good light and bad wifi and nobody there has ever heard of you.'),
          p('You lay out what ORACLE scored before any of this began: that you would take the identity willingly, that Sloane could not truly hold you — and that they proceeded anyway. It is not a confession. It is worse: it is a specification. They sold Axiom a controllable asset their own system had already marked uncontrollable.'),
        ];
        const page = [
          p('You write it out as a single page, the way Adrian wrote memos for people who would only read the first paragraph: what the system predicted, when, and what the company did next. When you have finished, the page is so plain that it frightens you.'),
          p('Near the bottom of your notes is the line you copied from the assessment, or rebuilt from its edges: SUBJECT WILL ACCEPT THE IDENTITY WILLINGLY. You look at it for a long time.'),
          t('It was right. That is the part nobody warns you about. The machine that said I could not be held also said I would want this, and I do.'),
        ];
        if (lever === 'oracle') return [...blocks, ...page];
        blocks.push(p('You never saw the assessment itself, so you rebuild its shape from the edges — slower, and you can only argue it, not wave it. It still points the same way.'));
        // Own-power pays for the reconstruction; never blocked, short of the fee it is recorded unpaid.
        if (ownPower(x)) {
          const before = cash(x);
          set9(x, 'oracle-fee', before >= ORACLE_FEE ? 'paid' : 'unpaid');
          setKey(x, 'own.cash', String(Math.max(0, before - ORACLE_FEE)));
          note9(x, 'oracle-fee', before >= ORACLE_FEE ? `Spent $${ORACLE_FEE} reconstructing the ORACLE assessment. Own cash: $${before - ORACLE_FEE}.` : `The $${ORACLE_FEE} reconstruction is unpaid; own cash was $${before}.`, 'Records, fees and time, paid by Evelynn');
        }
        return [...blocks, ...page];
      }),
    );
  if (evidence9(s) && !took(s, 'evidence'))
    c.push(
      offer9('assemble-evidence', 'Corroborate the paper into a chain', 'Custody, dates, a handoff in her hand. Make it hold.', 'assemble', (x) => {
        take(x, 'evidence');
        set9(x, 'chain', 'built');
        set9(x, 'open', 'chain');
        return [
          p('You build it at the copy shop on the corner, which opens at seven and has a machine that will scan anything and a boy behind the counter who never looks at what.'),
          p(chainText9(x)),
          p('By nine you have it in three forms: the paper, the scans, and the order in your own head, each link numbered, each with its source in the margin in small hard capitals. The boy rings it up without reading any of it, and wishes you a good day, and means it.'),
          t('Now it is a thing that exists outside me. That makes it stronger. It also makes it something that can be taken.'),
        ];
      }),
    );
  const allies = allies9(s);
  if (allies.includes('rook') && !took(s, 'rook'))
    c.push(
      offer9('assemble-rook', 'Spend an ally · the sender, one more time', 'Concrete, unsourceable, fast. It costs the ally something.', 'assemble', (x) => {
        take(x, 'rook');
        setKey(x, 'own.alliance.rook', 'spent');
        set9(x, 'rook-piece', 'unverified');
        note9(x, 'rook-piece', 'The sender supplied one more document from Meridian’s offshore board. Concrete, unsourced, unverified.', 'The sender, collecting the debt in kind');
        set9(x, 'open', 'rook');
        return [
          p('The message gives you the old ferry terminal again, and the same locker. The side door is on the latch. The departures board still flickers over the empty hall, announcing boats that stopped running before you were born. Before you were anybody.'),
          p('The phone in locker 41 is already ringing when you open the door.'),
          q(SENDER, 'One more page from the offshore board, and then we are square. Do not ask me where it came from.'),
          p('Under the phone is a single sheet in a plastic sleeve, folded once. A page of board minutes: a date, an offshore address, a column of initials down the left margin, and against one of them, in a different ink, a small neat tick.'),
          q(SENDER, 'We are square now. I would like you to remember that I said so.'),
        ];
      }),
    );
  if (allies.includes('editor') && !took(s, 'editor'))
    c.push(
      offer9('assemble-editor', 'Spend an ally · the reporter’s filing', 'Slow, clean, filing-grade. It costs the ally something.', 'assemble', (x) => {
        take(x, 'editor');
        setKey(x, 'own.alliance.editor', 'spent');
        set9(x, 'open', 'editor');
        return [
          p('Aster’s editor sends you to a café by the courts where the reporters drink, and to a small unhurried woman called Clara Duvall, who has spent twenty years filing for things people would rather stayed sealed. She has already done the work. She slides it across the table in a manila folder with a coffee ring on it.'),
          p('The reporter’s corporate-veil filing comes back: slow, clean, and filing-grade — another layer of the shell peeled, with a source attached to every line.'),
          q('Clara Duvall', 'Every line has a source. Some of the sources are going to be very unhappy that I found them. Before this runs anywhere, I’d like to know whether your name goes in it.'),
        ];
      }),
    );
  if (allies.includes('maya') && !took(s, 'maya'))
    c.push(
      offer9('assemble-maya-bounded', 'Spend an ally · what Maya can say', 'Public scope only: the category and the floor, never the answer.', 'assemble', (x) => {
        take(x, 'maya');
        setKey(x, 'own.alliance.maya', 'used');
        set9(x, 'open', 'maya');
        return [
          p('Maya meets you at the counter at seven, before her shift, with her coat buttoned to the throat and her badge already clipped on, which means she is going straight in afterwards and wants you to know it.'),
          q('Maya', 'I can tell you what level signs something like that. Directorate, or a private contractor with a board. Not who. That’s as far as I go.'),
          p('The category and the floor, within her line: a sign-off at that height is a board decision, not an officer’s.'),
          p('She says it to the steam, not to you. Then she drinks her tea in three swallows, too hot, and puts the cup down.'),
          q('Maya', 'Now you tell me something. Are you in danger?'),
        ];
      }),
    );
  if (allies.includes('crossover') && !took(s, 'crossover'))
    c.push(
      offer9('assemble-crossover-contact', 'Use the borrowed door once more', 'It is still ajar. Each use costs more standing.', 'assemble', (x) => {
        take(x, 'crossover');
        set9(x, 'crossover', 'deepened');
        set9(x, 'open', 'crossover');
        return [
          p(
            crossover(x) === 'executive'
              ? 'Julian lets you into the contracts room again, late, and this time he does not stay by the door. He sits on the edge of the long table with his jacket off and watches you read.'
              : crossover(x) === 'institutional'
                ? 'Sloane’s car again: the same dark leather, the same river. This time she has brought a second tablet, and a flask of coffee she does not offer you. She shows you the next layer down and watches you read it.'
                : 'The door you borrowed is still ajar, and whoever holds it watches you go through it again.',
          ),
          p('The door you borrowed to get over the wall is still ajar, and you use it again. It works. It also means you owe that door a little more than you did, and the people behind it know it.'),
          crossover(x) === 'executive' ? q('Julian Mercer', 'Did you find what you came for?') : q('Sloane', 'What will you do with it?'),
        ];
      }),
    );
  if (!getKey(s, 'case.name'))
    c.push(
      offer9('assemble-name', 'Find the face on the board', 'One name, and you have already met it.', 'assemble', (x) => {
        const road = nameRoad9(x);
        take(x, 'name');
        setKey(x, 'case.name', 'celeste');
        set9(x, 'name-road', road);
        if (road === 'public' && ownPower(x) && !getKey(x, 'own.exposed')) setKey(x, 'own.exposed', 'yes');
        set9(x, 'open', 'name');
        return nameBlocks(x, road);
      }),
    );
  c.push(offer9('assemble-stop', 'Move with what you have', 'You don’t have to find every piece to act.', 'resolve'));
  return c;
}

export function chapter9Choices(s: GameState): C9Choice[] {
  if (!chapter9Playable(s)) return [];
  if (s.scene === 'chapter8' && s.phase === 'complete' && ownPower(s))
    return [offer9('begin', 'Go on', 'The next morning. Go looking for the name.', 'arrive', (x) => (set9(x, 'entered', 'own-power'), []))];
  if (s.scene === 'chapter7' && s.phase === 'complete' && getKey(s, 'route.lane') && !ownPower(s))
    return [offer9('begin-placeholder', 'Go on to the bridge', 'This road’s middle chapters are in development.', 'arrive', (x) => (set9(x, 'entered', getKey(x, 'route.lane')!), []))];
  if (s.scene !== 'chapter9') return [];
  if (s.phase === 'arrive' && ownPower(s) && !get9(s, 'club')) return clubChoices();
  if (s.phase === 'arrive' && get9(s, 'names-open')) return namesChoices(s);
  if (s.phase === 'arrive')
    return [
      offer9('arrive-begin', 'Assemble what you have', 'Every road left a different pile. Sort it into a case.', 'assemble', (x) => {
        if (ownPower(x)) set9(x, 'open', 'tailor');
        return [];
      }),
    ];
  if (s.phase === 'assemble') return assembleChoices(s);
  if (s.phase === 'resolve') {
    if (ownPower(s) && !get9(s, 'rent')) return rentChoices(s);
    if (ownPower(s) && !get9(s, 'window')) return windowChoices();
    if (ownPower(s) && !get9(s, 'sloane')) return sloaneChoices();
    return get9(s, 'lawyer') ? [offer9('resolve-end', 'Carry it into the next room', 'Chapter 9 ends here.', 'complete')] : lawyerChoices();
  }
  return [];
}

/** Entering resolve: the name floor, then the band. Both derive from stored state only. */
function enterResolve9(s: GameState) {
  if (!getKey(s, 'case.name')) {
    setKey(s, 'case.name', 'celeste');
    set9(s, 'name-road', 'floor');
  }
  setKey(s, 'case.strength', band9(weights9(s)));
}

export function applyChapter9Choice(state: GameState, id: string): GameState {
  const choice = chapter9Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter9';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'resolve' && state.phase !== 'resolve') enterResolve9(s);
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter9.${s.phase}` as NodeId, blocks: chapter9Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER9_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
