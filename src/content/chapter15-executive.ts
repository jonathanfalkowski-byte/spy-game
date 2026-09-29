/** Chapter 15 (Executive route, lane id `executive`) · By Appointment:
 * allies → entry → stacks → holds → last → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_15_BY_APPOINTMENT_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_15_SCRIPT.md. The shared archive heist in Executive framing:
 * she walks into the Vesper by appointment. One or two allies (Julian with his credentials, Iris if free, Sloane if the
 * debt was taken, Hal if he ever drove her, Maya if she is back, Marsh outside with the switch). The way in follows Ch14
 * (appointment with Julian, his card alone, the service stair with Iris or Sloane, or a meeting she asks Celeste for as
 * cover, always available), then the snag. The archive: her page and Julian's drawer, always ("Collateral, in the person
 * of J.M."; a record of what was done to him, never of what he was); Sloane's file if promised; one thing more (Adrian's
 * file, the 1109 safe, or Nell's Jakarta order signed C.). The holds broken, and one chosen cost (ally / kept: walk out of
 * what was his, offered never imposed / money / Julian: on the record at the Markets Authority, by his own choice). "No
 * more orders." "I shall be there as myself." The phone; a chosen night (heat 3, consent-gated, fades). Entered from an
 * Executive `chapter14.complete`; ends at an Act IV in-development stop, having set the Act III keys the Executive Act IV
 * will read. Local helpers mirror chapter15.ts (c15.* keys, chapter15.* ids); choice ids carry `x15-`.
 * Deepening pass (2026-09-29): three moments, each with a neutral pick. The night before (c15.x-plan = floor | walk |
 * sleep: on his carpet at forty-one with the Vesper's fire plan, if Julian is coming; or past the Vesper at midnight,
 * counting windows); the first Evelynn's drawer in the archive (c15.x-first = read | hand | away: VALE, E. (I), and a
 * line in pencil in the looping hand, "She hated orchids. I never learned."; or his hand between the cabinets); and the
 * Collateral card in the week after (c15.x-cardj = give | burn | keep). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C15Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get15 = (s: GameState, k: string) => s.choices['c15.' + k];
const set15 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c15.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C15Choice['apply']): C15Choice => ({ id: 'chapter15.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get15(s, 'rec.' + k) !== undefined) return;
  set15(s, 'rec.' + k, String(s.history.length));
  set15(s, 'event.' + k, String(s.revision));
  set15(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c15.' + k);
  s.knowledge.push('c15.' + k);
}

export const EXECUTIVE_PHASES15 = ['allies', 'entry', 'stacks', 'holds', 'last'] as const;
export const isExecutive15 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase15 = (s: GameState) => isExecutive15(s) && ((EXECUTIVE_PHASES15 as readonly string[]).includes(s.phase) || s.phase === 'complete');

type Ally = 'julian' | 'iris' | 'sloane' | 'hal' | 'maya' | 'marsh';
const crew = (s: GameState): Ally[] => ((key(s, 'exec.crew15') ?? '').split(',').filter(Boolean) as Ally[]);
const has = (s: GameState, a: Ally) => crew(s).includes(a);
const way = (s: GameState) => key(s, 'exec.way15') as 'appointment' | 'card' | 'stair' | 'invited' | undefined;
const sig = (s: GameState) => key(s, 'exec.signature') as 'enforced' | 'spent' | 'fell' | undefined;
const cred = (s: GameState) => key(s, 'exec.credentials') as 'julian' | 'card' | 'none' | undefined;
const julianThere = (s: GameState) => has(s, 'julian') || way(s) === 'appointment';
const keptSome = (s: GameState) => Number(key(s, 'exec.kept') ?? 0) > 0 || key(s, 'exec.flat') === 'accepted';

export function available15(s: GameState): Ally[] {
  const out: Ally[] = [];
  if (cred(s) === 'julian') out.push('julian');
  if (key(s, 'exec.iris11') === 'warn') out.push('iris');
  if (key(s, 'exec.sloane14') === 'accepted') out.push('sloane');
  if (['take', 'once'].includes(key(s, 'exec.fav.car') ?? '')) out.push('hal');
  if (key(s, 'c6.maya') === 'restored') out.push('maya');
  if (key(s, 'exec.marsh13') === 'ally') out.push('marsh');
  return out;
}

export function placeExecutive15(s: GameState): string | undefined {
  if (s.phase === 'entry' && !way(s) && !get15(s, 'x-plan')) return 'The night before · Midnight';
  if (s.phase === 'holds' && !get15(s, 'x-cardj')) return 'The week after · Forty-one';
  if (s.phase === 'entry' && way(s)) return { appointment: '11:00 · The Vesper, the reading room', card: '11:00 · The Vesper, the front desk', stair: '02:00 · The Vesper, the service stair', invited: '22:00 · The Vesper, the long room' }[way(s)!];
  const open = get15(s, 'x-night-open');
  if (s.phase === 'last' && open) return 'Late · Julian’s apartment';
}

// ── The entry ──

export function beginExecutive15(): C15Choice {
  return offer('begin-executive', 'The week before the board', 'Helix may attend the Vesper archive by appointment.', 'allies');
}

// ── Allies ──

function alliesBlocks(s: GameState): Block[] {
  const road =
    sig(s) === 'enforced'
      ? 'Julian is still Group COO, the clause is struck, Marcus is on gardening leave, and Celeste has promised a pause “until my board has met”. The pause will last exactly as long as it takes her to move what she keeps somewhere you can’t reach. There is a week.'
      : sig(s) === 'spent'
        ? 'You are nobody’s chief of staff now. Julian is still at Helix, smaller, with a clause to fight. Axiom has Adrian Vale’s name and is asking about it, politely, for now. There is a week before the board, and after that there is nothing left to protect.'
        : 'Julian has gone from Helix. Marcus has his chair. You are chief of staff to an office with nobody in it, inside the room, near the levers, and Celeste is kind to you, which means she thinks she has won. There is a week.';
  return [
    p('The week before Meridian’s board meets. The wall on your wardrobe door, every card on it, and at the top, beside CELESTE LAURENT, the one you have not been able to take down: THE VESPER.'),
    p(road),
    p('Helix Group plc is a client of the Vesper. Clients may review their own records there, by appointment. Everything you have learned in a year comes to that sentence.'),
    t('I keep everything, darling, she told somebody once. Then everything is in one room. Who do I take into it?'),
  ];
}

const allyScene: Record<Ally, [string, string, Block[]]> = {
  julian: ['Julian', 'His credentials. He comes.', [q('Julian Mercer', 'Helix may attend by appointment. I’ve never used it. I’ve never wanted to know what’s in there with my name on it. I find I want to now.')]],
  iris: ['Iris', 'She stocked that archive for four years.', [p('The number on the stampless card. She answers on the first ring.'), q('Iris Moreau', 'I stocked that archive for four years. I know where the safe is, and which drawer sticks. When?')]],
  sloane: ['Sloane', 'You took her deal. Her file too.', [q('Sloane', 'I have keys that still work, for another week, until somebody notices. My file first. Then yours. Then whatever you like.')]],
  hal: ['Hal', 'He drove you. He can drive again.', [q('Hal', 'I drive, Ms Vale. Tonight I suppose I also wait. Engine running. I’ve done it before, for worse people.')]],
  maya: ['Maya', 'She audits buildings.', [q('Maya', 'I’ve audited worse buildings than that one. What am I looking for?')]],
  marsh: ['Owen Marsh, outside', 'The dead man’s switch.', [q('Owen Marsh', 'I don’t go in. I can’t, and still be what I am. I sit outside with everything you’ve given me, and if you don’t come out, it goes to the minister at nine.')]],
};

function alliesChoices(s: GameState): C15Choice[] {
  const chosen = crew(s);
  const n = chosen.length;
  const pick = available15(s)
    .filter((a) => !chosen.includes(a))
    .map((a) =>
      offer('x15-ally-' + a, allyScene[a][0], allyScene[a][1], n + 1 >= 2 ? 'entry' : 'allies', (x) => {
        setKey(x, 'exec.crew15', [...chosen, a].join(','));
        return allyScene[a][2];
      }),
    );
  return [
    ...pick,
    offer(n ? 'x15-allies-done' : 'x15-allies-none', n ? 'That’s enough' : 'Nobody', n ? 'One is enough. Go.' : 'Alone. The plan will feel it.', 'entry', (x) => (n ? [] : (setKey(x, 'exec.crew15', ''), [t('Nobody. Everybody I would ask has already paid for knowing me.')]))),
  ];
}

// ── Entry ──

function entryBlocks(): Block[] {
  return [p('The wall, turned into a plan the way Adrian used to turn a filing into a timeline. Four ways into one room.')];
}

const snagLead: Record<'appointment' | 'card' | 'stair' | 'invited', Block[]> = {
  appointment: [p('Half an hour in, with a Helix document box half full on the reading-room table, the panelled door opens behind you, and Celeste Laurent is in it, in grey, with a glass of something at eleven in the morning.'), q('Celeste Laurent', 'Julian. Darling. Nobody told me you were coming.')],
  card: [p('The assistant looks at the card, and at you, for a moment too long, and says she will just ring Helix to confirm. She dials. You listen to it ring.')],
  stair: [p('Two in the morning, the service stair, the housekeeping keys. On the landing by the cloakroom, the night doorman, asleep in a chair with his cap over his eyes, and one of his eyes not quite shut.')],
  invited: [p('You ask Celeste for a meeting at the Vesper at ten, “to discuss the board”. She says yes at once. You arrive at ten. She is already there, at nine forty, in the long room, with two glasses poured.')],
};

function planChoices(s: GameState): C15Choice[] {
  const pl = (id: 'floor' | 'walk' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('x15-plan-' + id, label, hint, 'entry', (x) => {
      set15(x, 'x-plan', id);
      return body;
    });
  return [
    ...(has(s, 'julian') || cred(s) === 'julian'
      ? [pl('floor', 'His carpet, and the Vesper’s fire plan', 'Helix’s insurers have one. Of course they do.', [
          p('Midnight on forty-one, on the carpet of his office with your shoes off and the Vesper’s fire-safety plan spread between you, which Helix’s insurers have, because Helix’s insurers have everything. He learns it the way he learns anything: twice, moving his lips very slightly on the second reading. At one he puts his finger on a small grey rectangle behind the reading room.'),
          q('Julian Mercer', 'That isn’t a cupboard. The walls are too thick.'),
          p('At two he falls asleep with his head on the reading room, and you leave him there, and put your jacket over him.'),
        ])]
      : []),
    pl('walk', 'Walk past the Vesper at midnight', 'Count the windows. Time the doorman.', [p('You walk past the Vesper at midnight on the other side of the canal, twice, and count the windows, and time the doorman’s cigarette, eleven minutes, and watch the one light on the second floor go off at twenty past, and on again at half past, as if somebody had come back for something.')]),
    pl('sleep', 'Sleep', 'You will need it.', [p('You sleep. You did not expect to. You dream of nothing, and wake at six, clear as glass.')]),
  ];
}

function entryChoices(s: GameState): C15Choice[] {
  if (!way(s) && !get15(s, 'x-plan')) return planChoices(s);
  if (way(s)) {
    const sn = (id: 'talk' | 'hide' | 'bold', label: string, hint: string, body: Block[]) =>
      offer('x15-snag-' + id, label, hint, 'stacks', (x) => {
        set15(x, 'x-snag', id);
        return body;
      });
    const w = way(s)!;
    return [
      sn('talk', 'Talk your way through it', 'You are very good at this.', [
        p(
          w === 'appointment'
            ? 'You stand up and kiss her on both cheeks and tell her Helix is doing its own housekeeping before the auditors do it for us, and Julian, God bless him, says “Quite,” and she laughs, and finishes her drink, and leaves you the room.'
            : w === 'card'
              ? (key(s, 'exec.fav.car') ? 'Hal answers the phone at Helix. “Ms Vale? Yes. Mr Mercer sent her. With the card.” The assistant hands it back with an apology.' : 'Julian answers the phone at Helix himself, on the second ring. “Ms Vale is there on my behalf. Please give her whatever she needs.” The assistant hands the card back with an apology.')
              : w === 'stair'
                ? 'You wake the doorman yourself, gently, and tell him you’re from housekeeping and you’ve left your phone, and he is so embarrassed to have been asleep that he opens the door for you.'
                : 'You sit, and drink, and talk about the board for forty minutes, brilliantly, while three floors down the people you brought do what you came for.',
        ),
      ]),
      sn('hide', 'Wait it out', 'Somewhere she won’t look.', [p(w === 'stair' ? 'You wait in the cloakroom among somebody else’s coats until the doorman’s breathing changes back, and then go past him on your toes.' : 'You wait, very still, with your hands flat on the table, and let the moment go past you like a car on a wet road.')]),
      sn('bold', 'Keep going, and let her see you', 'Nothing to hide. Not any more.', [p(w === 'appointment' || w === 'invited' ? 'You keep going. You let her see you doing it. She watches you for a long moment over the glass, and then, very slightly, raises it.' : 'You keep going, straight past, and let it see you, as if you had every right to be here, which by morning you will have taken.')]),
    ];
  }
  const ways: C15Choice[] = [];
  const go = (id: 'appointment' | 'card' | 'stair' | 'invited', label: string, hint: string, body: Block[]) =>
    offer('x15-way-' + id, label, hint, 'entry', (x) => {
      setKey(x, 'exec.way15', id);
      if (id === 'appointment' && !has(x, 'julian')) setKey(x, 'exec.crew15', [...crew(x), 'julian'].join(','));
      return [...body, ...snagLead[id]];
    });
  if (cred(s) === 'julian')
    ways.push(go('appointment', 'By appointment, with Julian', 'Helix reviewing its own records. In daylight.', [p('Tuesday at eleven. Helix Group plc, by appointment, reviewing its own records. Celeste’s assistant brings coffee, and a key to the reading room, and to the panelled door behind it, “for as long as you need, Mr Mercer.”')]));
  if (cred(s) === 'card')
    ways.push(go('card', 'On his appointment card, alone', 'The day before they take it off him.', [p('Tuesday at eleven, alone, with his appointment card in your glove and a Helix document box under your arm, the day before they take the card off him.')]));
  if (has(s, 'iris') || has(s, 'sloane'))
    ways.push(go('stair', has(s, 'iris') ? 'The service stair, with Iris' : 'The front door, on Sloane’s keys', '2 a.m.', [p(has(s, 'iris') ? 'Two in the morning. Iris at the service door with the housekeeping keys she never gave back.' : 'Two in the morning. Sloane at the front door with keys that still work, for another week.')]));
  ways.push(go('invited', 'Ask Celeste for a meeting there', 'The meeting is the cover. The crew is the job.', [p('The boldest one. You will walk in through the front door because she has asked you to.')]));
  return ways;
}

// ── The stacks ──

function stacksBlocks(s: GameState): Block[] {
  const j = julianThere(s);
  return [
    p('The archive: a narrow room behind the reading-room panelling, grey steel cabinets floor to ceiling, one lamp, cold as a church. Every drawer labelled with a page number from the catalogue. She keeps everything. She does.'),
    p('Page seven: you. You tear your own page out of The Autumn Collection, the photograph and the neat type and the date, and fold it into your pocket.'),
    p('And a drawer that is not a page number. A name. MERCER, J.'),
    p('Eleven signatures, eleven facilities, eleven copies of page thirty-one. A photograph of a boy of nineteen at a café window, counting containers across the road. And a card, in the looping green hand:'),
    q('The card', 'Collateral, in the person of J.M. Kind. Will not survive us.'),
    ...(j
      ? [p('Julian reads it twice, the way he reads everything, and puts it in his inside pocket.'), q('Julian Mercer', 'She’s right about the first part.')]
      : [t('A record of what she did to him. Not of what he was. I’ll decide later whether he ever reads it.')]),
    ...(key(s, 'exec.sloane14') === 'accepted' ? [p('Sloane’s file, as promised: a slim grey folder with an Axiom crest, which you put on top of his without opening it.')] : []),
    p('Three drawers down from page seven, a drawer with your name on it that is not yours: VALE, E. (I).'),
  ];
}

function firstChoices(s: GameState): C15Choice[] {
  const f = (id: 'read' | 'hand' | 'away', label: string, hint: string, body: Block[]) =>
    offer('x15-first-' + id, label, hint, 'stacks', (x) => {
      set15(x, 'x-first', id);
      return [...body, p('And there is time for one thing more.')];
    });
  return [
    f('read', 'Open it', 'The first one.', [
      p('Her page, the first issue: the same photograph as yours, near enough, in a harder light. E. V. (I) · SINGAPORE · JAKARTA · BURNED · RETURNED TO INVENTORY.'),
      p('And under it, in pencil, in the looping green hand, small, as if it had been written a long time after the rest:'),
      q('The page', 'She hated orchids. I never learned.'),
      t('Not proof. A woman writing in the margin of a life she sold. I will carry it anyway.'),
    ]),
    ...(julianThere(s)
      ? [f('hand', 'Take his hand', 'Between the cabinets, in the dark.', [p('You do not open it. You reach back without looking, between the grey cabinets in the one-lamp dark, and find his hand, and he holds on, hard, and neither of you says anything, and the archive is very quiet around the two of you.')])]
      : []),
    f('away', 'Leave it shut', 'She had enough people reading her.', [p('You leave it shut. She had enough people reading her.')]),
  ];
}

function stacksChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'x-first')) return firstChoices(s);
  const tk = (id: 'adrian' | 'cards' | 'nell', label: string, hint: string, body: Block[]) =>
    offer('x15-took-' + id, label, hint, 'holds', (x) => {
      setKey(x, 'exec.took15', id);
      setKey(x, 'exec.julian-file');
      if (key(x, 'exec.sloane14') === 'accepted') setKey(x, 'exec.sloane-file');
      note(x, 'x-julian-file', 'The Vesper archive held a drawer marked MERCER, J.: eleven 14.3 signatures and a card in Celeste Laurent’s hand, “Collateral, in the person of J.M.” Evelynn took it.', 'The Vesper archive');
      return body;
    });
  return [
    tk('adrian', 'Adrian Vale’s file', 'The clinic, the fitting, the name. Nobody spends it again.', [p('A thick file, the clinic’s crest, a name that was yours. You do not open it. You put it in the box.')]),
    ...(!key(s, 'exec.card13') ? [tk('cards', 'The 1109 safe', 'Every placement filmed in that room.', [p('The safe behind the last cabinet, which opens to the date on your catalogue page. Inside, rows of memory cards in little labelled envelopes, every one of them a person in a room with a mirror.')])] : []),
    tk('nell', 'Nell’s file', 'The Jakarta order, signed C.', [p('LINDEN, E. A thin file. On top, a single sheet, the Jakarta order, a name given to the wrong people, and at the bottom, in the looping green hand, one initial. C.'), t('Proof of the burn. Not of the harbour. Not yet.')]),
  ];
}

// ── The holds ──

function holdsBlocks(s: GameState): Block[] {
  const holders = [
    ...(key(s, 'exec.marsh13') === 'ally' ? ['Owen Marsh'] : []),
    ...(['truth', 'kind'].includes(key(s, 'exec.nora12') ?? '') ? ['Nora Linden'] : []),
    ...(has(s, 'iris') || key(s, 'exec.card-where') === 'iris' ? ['Iris'] : []),
    ...(has(s, 'sloane') || key(s, 'exec.sloane14') === 'accepted' ? ['Sloane'] : []),
    ...(has(s, 'maya') ? ['Maya'] : []),
  ];
  const took = key(s, 'exec.took15');
  return [
    p('The week after, the holds broken one by one, fast, like a list.'),
    p('Julian’s signatures: eleven facilities, back in the hands of the man who signed them, and in yours. Whatever she meant to spend them on, she cannot now.'),
    p(
      sig(s) === 'spent'
        ? took === 'adrian'
          ? 'Adrian’s name: Axiom has been asking. You meet Benton in a café with the clinic’s file on the table between you, and he looks at it for a long time, and stands his people down rather than explain it to his own board.'
          : 'Adrian’s name: Axiom still has it, and is still asking, politely. You have everything else. That will have to be enough for Thursday.'
        : took === 'adrian'
          ? 'Adrian’s name: the clinic’s file in the lining of a coat. Nobody can spend it again.'
          : 'Adrian’s name: still hers to spend, and she knows it, and so do you.',
    ),
    p(holders.length ? 'The evidence, copied three times, to people who do not know each other: ' + holders.join(', ') + '. Instructions for the day you stop answering.' : 'The evidence, copied, and left with a solicitor you have never met, with instructions for the day you stop answering. It is thin. It is something.'),
    ...(key(s, 'exec.sloane-file') ? [p('Sloane’s file, handed to her in the back of her car without a word. She holds it in her lap all the way to the river.')] : []),
  ];
}

function cardChoices(s: GameState): C15Choice[] {
  const c = (id: 'give' | 'burn' | 'keep', label: string, hint: string, body: Block[]) =>
    offer('x15-cardj-' + id, label, hint, 'holds', (x) => {
      set15(x, 'x-cardj', id);
      return body;
    });
  const there = julianThere(s);
  return [
    ...(!there
      ? [c('give', 'Give him the card', 'Collateral, in the person of J.M. He should read it.', [
          p(sig(s) === 'fell' ? 'You give it to him in his flat, among the boxes of books, without a word. He reads it twice.' : 'You give it to him on forty-one, at his desk, without a word. He reads it twice.'),
          q('Julian Mercer', 'She’s right about the first part. I’d like to prove her wrong about the second.'),
        ])]
      : []),
    c('burn', there ? 'Burn it, together' : 'Burn it', there ? 'In the sink on forty-one. He holds the lighter.' : 'She doesn’t get to have written it.', [
      p(there ? 'In the little kitchen on forty-one, at midnight, he holds the lighter and you hold the card, and it curls up black from the corner in, KIND going last, and he runs the tap over the ash and says, “There.”' : 'You burn it in your own sink, at midnight, KIND going last, and run the tap over the ash.'),
    ]),
    c('keep', 'Keep it', 'In the box. Evidence.', [p('You keep it, with everything else, in the Helix document box. Evidence. Thursday might want it.')]),
  ];
}

function holdsChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'x-cardj')) return cardChoices(s);
  const c = (id: 'ally' | 'kept' | 'money' | 'julian', label: string, hint: string, shared: string, who: string, body: Block[]) =>
    offer('x15-cost-' + id, label, hint, 'last', (x) => {
      setKey(x, 'exec.cost15', id);
      set15(x, 'cost', shared);
      if (who) set15(x, 'cost-who', who);
      setKey(x, 'act3.leash', 'broken');
      const switchers = [key(x, 'exec.marsh13') === 'ally' && 'marsh', ['truth', 'kind'].includes(key(x, 'exec.nora12') ?? '') && 'nora', has(x, 'iris') && 'iris', has(x, 'sloane') && 'sloane'].filter(Boolean);
      setKey(x, 'act3.switch', switchers.join(',') || 'solicitor');
      if (key(x, 'exec.marsh13') === 'ally') setKey(x, 'act3.ally.marsh', 'in');
      if (has(x, 'iris')) setKey(x, 'act3.ally.iris', 'in');
      if (['truth', 'kind'].includes(key(x, 'exec.nora12') ?? '')) setKey(x, 'act3.ally.nora', 'in');
      return body;
    });
  const allyWho = has(s, 'iris') ? 'iris' : key(s, 'exec.marsh13') === 'ally' ? 'marsh' : has(s, 'sloane') ? 'sloane' : '';
  return [
    ...(allyWho
      ? [c('ally', 'Spend an ally', allyWho === 'iris' ? 'Iris’s cover, burned to open the last door.' : allyWho === 'marsh' ? 'Marsh goes public early, and loses his inquiry.' : 'Sloane’s keys, noticed.', 'ally', allyWho, [
          p(allyWho === 'iris' ? 'Iris’s cover goes, the last of it: a photograph of her at the Vesper’s service door, in a paper that matters. She rings you from a station you do not recognise. “Worth it. Don’t you dare say sorry.”' : allyWho === 'marsh' ? 'Marsh goes to the minister a week early, with everything, and the minister takes his inquiry off him by lunchtime, and gives it to somebody safer. He rings you from his bicycle. “Worth it. They can’t un-read it.”' : 'Sloane’s keys are noticed. Axiom recalls her by Friday. She sends you one line: “Square.”'),
        ])]
      : []),
    ...(keptSome(s)
      ? [c('kept', 'Walk out of everything that was his', 'The flat, the card, the car. Offered, not owed.', 'relationship', 'kept', [
          p('You give it all back, and nobody asked you to: the key to the flat on the river, in an envelope, to facilities; the black card, cut in half; a note to Hal. Even the dress, dry-cleaned, in its bag, on the back of Julian’s office door.'),
          q('Julian Mercer', 'You didn’t have to.'),
          q('You', 'I know. That’s why.'),
        ])]
      : []),
    c('money', 'Spend everything you have', 'Lawyers, couriers, silence.', 'money', '', [p('Everything in your account, and the rent deposit, and the good earrings: on a solicitor who does not ask questions, three couriers, and a locked box in a bank under another name. Broke, and free.')]),
    c('julian', 'Let Julian go on the record', 'At the Markets Authority, in his own name. He chooses it.', 'relationship', 'julian', [
      q('Julian Mercer', 'I’m going to the Markets Authority on Monday, on the record, in my own name, about every one of those eleven signatures. Whatever the board did. I’ll lose Helix. I’ve been meaning to explain myself to somebody for eleven years.'),
      q('You', 'You don’t have to.'),
      q('Julian Mercer', 'No. I want to. It’s the first thing about Helix I’ll have done entirely on purpose.'),
    ]),
  ];
}

// ── The last message, and the night ──

function lastBlocks(): Block[] {
  return [
    p('Wednesday night, the eve of the board. The black phone, face up on the kitchen table, one contact. For the first time in a year you write first.'),
    q('You · to C.', 'No more orders.'),
    p('A long time. The kettle boils and goes cold. Then:'),
    q('C.', 'Then Thursday. Come as whoever you like, darling. I should warn you that I shall be there as myself.'),
  ];
}

function lastChoices(s: GameState): C15Choice[] {
  if (!get15(s, 'x-phone')) {
    const ph = (id: 'return' | 'river' | 'keep', label: string, hint: string, body: Block[]) =>
      offer('x15-phone-' + id, label, hint, 'last', (x) => {
        set15(x, 'x-phone', id);
        setKey(x, 'act3.black-phone', id);
        return body;
      });
    return [
      ph('return', 'Send it back', 'In a Vesper orchid box. No card.', [p('In the morning you send it back by courier, in a black Vesper orchid box, with nothing written on the card.')]),
      ph('river', 'The river', 'Off the wall.', [p('You walk to the river at one in the morning and drop it off the wall, and it makes almost no sound at all.')]),
      ph('keep', 'Keep it', 'Switched off, in a drawer. Evidence.', [p('You switch it off and put it in a drawer with Adrian’s old jacket. Evidence. Thursday might want it.')]),
    ];
  }
  const open = get15(s, 'x-night-open');
  const nightOk = key(s, 'c6.friction-julian') === 'warmed' || ['c7.x-evening-outcome', 'c8.x-late-outcome', 'c10.x-night-outcome', 'c11.x-night-outcome', 'c12.x-night-outcome'].some((k) => !!key(s, k)?.startsWith('intimate'));
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x15-julian-' + id, label, hint, 'last', (x) => {
        set15(x, 'x-night-open', 'julian-room');
        set15(x, 'x-night-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', id === 'sex' ? 'Yes. And you say stop, it stops. The same for me. Nobody else in the room tonight.' : 'Then that’s tonight. Nobody else in the room. Just the edge you set.')];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x15-leave', 'Say goodnight', 'Tomorrow is the board.', 'complete', (x) => {
        delete x.choices['c15.x-night-open'];
        set15(x, 'x-night-outcome', 'declined');
        return [p('You say goodnight at his door. He holds your face in both hands, and lets you go, and says, “Thursday.”')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get15(s, 'x-night-scope') as 'no-sex' | 'sex';
    return [
      offer('x15-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c15.x-night-open'];
        set15(x, 'x-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you at the window until you are ready to go.')];
      }),
      offer('x15-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c15.x-night-open'];
        set15(x, 'x-night-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [p('The first night in a year with nobody holding anything over either of you. He says your name, whichever one you gave him, and asks once more, and you answer by pulling him down, and nothing in the room is owed to anybody.'), p('What happens next is yours and his. The scene fades.')]
          : [p('He kisses you by the window for a long time, and stops where you said, and you fall asleep against him with the city on, owing nobody anything, for the first time in a year.')];
      }),
    ];
  }
  return [
    offer('x15-night-julian', 'Go to him', 'The first night in a year with nothing owed.', 'last', (x) => {
      set15(x, 'x-night', 'julian');
      set15(x, 'x-night-open', 'julian');
      return [p('His flat, the night before the board, the lights low. He has not made dinner. He has made two cups of tea and let them go cold.'), q('Julian Mercer', 'Tell me what you want tonight, and that’s what happens. Nobody else gets a say. Not tonight.')];
    }),
    offer('x15-night-alone', 'Alone', 'Act III ends here.', 'complete', (x) => {
      set15(x, 'x-night', 'alone');
      return [p('You sit up alone, the wall in front of you, a glass of wine you do not drink, and the first quiet in a year that belongs to nobody but you.')];
    }),
  ];
}

// ── Act III ──

function completeBlocks(s: GameState): Block[] {
  const cost = key(s, 'exec.cost15');
  return [
    ...(get15(s, 'x-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep, and do not need to.')] : []),
    p('The wall. One by one, every card on Celeste’s side of the door comes across to yours: THE VESPER, THE CLAREMONT, HIS CALENDAR, THE GOOD PEN, NELL, the black phone’s card, your own page, folded. MERCER, J. goes in the middle, where his name has always been.'),
    p('Except one, at the top, which you leave exactly where it is:'),
    q('The card', 'THE BOARD MEETS.'),
    ...(cost === 'kept' ? [p('Under JULIAN MERCER, in pencil, the question from the first day, and under it, at last, an answer: NOTHING.')] : []),
    ...(get15(s, 'x-first') === 'read' ? [p('And beside NELL, in your own hand, copied from a margin: SHE HATED ORCHIDS. I NEVER LEARNED. — C.')] : []),
    ...(get15(s, 'x-cardj') === 'burn' ? [p('Where the Collateral card would have gone, a clean square of wood, and a smell of smoke that has not quite left your hands.')] : []),
    t('She held everything. Now I do. Thursday, I find out what that’s worth.'),
    p('[Chapters 16–18 · executive road — in development]'),
  ];
}

export function executiveBlocks15(s: GameState): Block[] {
  if (s.phase === 'allies') return alliesBlocks(s);
  if (s.phase === 'entry') return entryBlocks();
  if (s.phase === 'stacks') return stacksBlocks(s);
  if (s.phase === 'holds') return holdsBlocks(s);
  if (s.phase === 'last') return lastBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices15(s: GameState): C15Choice[] {
  if (s.phase === 'allies') return alliesChoices(s);
  if (s.phase === 'entry') return entryChoices(s);
  if (s.phase === 'stacks') return stacksChoices(s);
  if (s.phase === 'holds') return holdsChoices(s);
  if (s.phase === 'last') return lastChoices(s);
  return [];
}

