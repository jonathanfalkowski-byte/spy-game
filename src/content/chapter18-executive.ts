/** Chapter 18 (Executive route, lane id `executive`) · Read Twice:
 * friday → settle → keys → dinner → signed → page → read.
 * Design: docs/story/EXECUTIVE_CHAPTER_18_READ_TWICE_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_18_SCRIPT.md. The Executive road's close, on the shared
 * "Position" spine. The morning after, by the board (Celeste's canon last word: Lisbon, an orchid, or nothing), and
 * Julian's (end.morning = julian | sleep | nora). The position, by aim and terms (end.position: the office next door
 * with the light on; the door term; the smaller flat; Nell's wall), and the switch (end.switch = armed | handed |
 * disarmed). The kept life settled and never punished (end.keys = keep | return | buy | none). The dinner Julian
 * promised in Ch14, the photograph face up if she asks (end.photo = up | down | his), and the pencil card from Ch7,
 * WHAT DO I OWE HIM?, answered in ink (end.answer = nothing | choose | truth); who she goes home to (end.with = julian |
 * maya | none). Who she is now (end.name = adrian | evelyn | new, none punished). A year later, a blank page headed
 * ADDITIONAL TERMS, written by both and read twice (end.page = together | own; end.term = stay | door | files), a chosen
 * night (heat 3, consent in character, fades) or a quiet one (end.later), and the last card. Entered from an Executive
 * `chapter17.complete`; the last chapter of the route: nothing is offered after `read`. Julian is never a trap, never
 * the price, and never the only good road. Choice ids carry `x18-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

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

export const EXECUTIVE_PHASES18 = ['friday', 'settle', 'keys', 'dinner', 'signed', 'page', 'read'] as const;
export const isExecutive18 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase18 = (s: GameState) => isExecutive18(s) && (EXECUTIVE_PHASES18 as readonly string[]).includes(s.phase);

const board = (s: GameState) => (key(s, 'act4.board') ?? 'closed') as 'resigned' | 'diminished' | 'closed';
const terms = (s: GameState) => (key(s, 'act4.terms') ?? 'none') as 'full' | 'partial' | 'none';
const aim = (s: GameState) => (key(s, 'act4.aim') ?? 'exit') as 'term' | 'exit' | 'spent' | 'nell';
const noraAlly = (s: GameState) => key(s, 'act3.ally.nora') === 'in';
const mayaClose = (s: GameState) => key(s, 'c6.maya') === 'restored' && key(s, 'c15.cost-who') !== 'maya';
const holders = (s: GameState) => (key(s, 'act3.switch') ?? '').split(',').filter((x) => x && x !== 'solicitor');
const holderName: Record<string, string> = { marsh: 'Owen Marsh', nora: 'Nora', iris: 'Iris', sloane: 'Sloane' };
const nightOk = (s: GameState) =>
  key(s, 'c6.friction-julian') === 'warmed' ||
  ['c7.x-evening-outcome', 'c8.x-late-outcome', 'c10.x-night-outcome', 'c11.x-night-outcome', 'c12.x-night-outcome', 'c14.x-night-outcome', 'c15.x-night-outcome'].some((k) => !!key(s, k)?.startsWith('intimate'));

/** What of his she still holds, laid out on the counter (none if she gave it all back in Ch15). */
function holdings(s: GameState): string[] {
  if (key(s, 'exec.cost15') === 'kept') return [];
  return [
    key(s, 'exec.flat') === 'accepted' && 'the key to the flat on the river',
    key(s, 'exec.fav.card') === 'take' && 'the black card',
    key(s, 'exec.fav.car') === 'take' && 'Hal’s number, and the car that comes when you ring it',
    key(s, 'act4.wear') === 'his' && 'the dress from the window on Sloane Street',
  ].filter((x): x is string => !!x);
}

// ── The entry ──

export function beginExecutive18(): C18Choice {
  return offer('begin-executive', 'Friday', 'The morning after.', 'friday');
}

// ── Friday ──

function fridayBlocks(s: GameState): Block[] {
  const b = board(s);
  const j = key(s, 'act4.julian');
  return [
    ...(b === 'resigned'
      ? [
          p('Friday. A line in the business pages, below the fold, between a shipping merger and a bank that has been fined: Meridian Holdings announces that Mme C. Laurent has stepped down from its board, with the board’s thanks for many years of service. Nothing else. Nothing ever is.'),
          p('On the Monday, a postcard. A tiled street going steeply down to a river, trams, sun. Lisbon. On the back, in green ink, in the looping hand, no address:'),
          q('The postcard', 'You were worth it. C.'),
        ]
      : b === 'diminished'
        ? [
            p('Friday. Nothing in the papers. At nine, a typed letter from Marguerite Soames, one paragraph, on Meridian’s heavy cream, which says without quite saying it that the board has read everything you put on its table, and will be reading it for some time.'),
            p('And on the mat, when you go down for the milk, a white orchid in a black pot. No card. There doesn’t need to be.'),
          ]
        : [p('Friday. Nothing. No papers, no letter, no orchid. The Vesper’s black glass front on the Embankment looks exactly as it did on Wednesday, and the doorman nods to people you do not know.')]),
    ...(key(s, 'c17.x-pen') === 'julian'
      ? [p('At seven your phone lights up. Julian: I read it twice. I’m going to do that for the rest of my life.')]
      : j === 'waiting'
        ? [p('At seven your phone lights up. Julian: Well?')]
        : [p('At seven your phone lights up. Julian: Awake? I’m told there’s a café on your corner that does terrible coffee.')]),
  ];
}

function fridayChoices(s: GameState): C18Choice[] {
  const f = (id: 'julian' | 'sleep' | 'nora', label: string, hint: string, body: Block[]) =>
    offer('x18-friday-' + id, label, hint, 'settle', (x) => {
      setKey(x, 'end.morning', id);
      return body;
    });
  return [
    f('julian', 'Coffee on the steps', 'Terrible coffee. Two of them.', [
      p('He is on your steps at eight with two paper cups of terrible coffee, in yesterday’s suit, unshaved, looking like a man who has slept for the first time in eleven years and is not sure yet whether he likes it.'),
      q('Julian Mercer', 'Well?'),
      q('You', 'Well.'),
      p('You sit on the step beside him, not quite touching, and drink the terrible coffee, and watch the street wake up, and for twenty minutes neither of you says anything that matters, and it is the best conversation you have had all year.'),
    ]),
    f('sleep', 'Sleep until noon', 'You have earned one morning.', [p('You turn the phone face down, and sleep until noon, the whole deep dreamless sleep of somebody who has nothing left in her pocket for anyone to find.')]),
    ...(noraAlly(s)
      ? [
          f('nora', 'Ring Holland Village', 'It is evening there. She will be awake.', [
            q('Nora Linden', 'Well?'),
            ...(key(s, 'act4.nell-said') === 'eleanor'
              ? [q('You', 'She said her name. Eleanor. Out loud, to her board.'), p('A long silence on the line, and the sound of a kettle, and a woman sitting down in her kitchen.'), q('Nora Linden', 'Then I’ll sleep tonight.')]
              : [q('You', 'She didn’t say it. But they heard. All of them.'), q('Nora Linden', 'Then that will have to do. It’s more than the police ever did.')]),
          ]),
        ]
      : []),
  ];
}

// ── The position ──

function positionLines(s: GameState): Block[] {
  const a = aim(s);
  const tm = terms(s);
  if (a === 'term')
    return tm === 'full'
      ? [
          p('That month, by resolution, clause 14.3 comes out of every Helix facility, all eleven, and Helix is released. Julian keeps his chair. The newspapers call it a refinancing, which is what newspapers call things when nobody will tell them what happened.'),
          p('And on the forty-first floor, the office next door to his, the empty one with the light left on since your first morning, has a name on the door at last. Yours. Director, Counterparties. You read every facility before anybody at Helix signs anything, and the board, which is a little afraid of you, calls that prudence.'),
          t('He left the light on for a year. I thought it was carelessness. It was an invitation.'),
        ]
      : tm === 'partial'
        ? [
            p('That month, 14.3 comes out of the next facility, and not the last eleven. The rest will be a year’s slow work, with Marsh’s inquiry and the switch behind you, a clause at a time.'),
            p('The office next door has your name on it, and under it, on a strip of card, ACTING. You leave the card where it is. It is honest.'),
          ]
        : [
            p('The board gave nothing. So Helix refinances away from Meridian over a year, one facility at a time, in public, with the inquiry reading every page. It is slower, and costlier, and it works.'),
            p('The office next door stays dark for now. You work at the end of his desk, and nobody at Helix pretends not to know why.'),
          ];
  if (a === 'exit')
    return [
      p(
        tm === 'none'
          ? 'That month you walk out of Helix anyway. It was always in the contract.'
          : key(s, 'exec.term.door')
            ? 'That month you resign, on one month’s notice, exactly as the first of your three terms said, a year ago, on a blank page he asked you to fill.'
            : 'That month you resign, on one month’s notice, under an undertaking Meridian signed and Helix honours.',
      ),
      p(tm === 'full' ? 'References unreserved. Julian writes them himself, and reads them twice, and they are the kindest thing anybody has ever written about you that was also true.' : 'Without the references. You find you don’t need them.'),
      t('I walked in with a contract I wrote. I walked out with it, still in force. Nobody in that building has ever done that.'),
    ];
  if (a === 'spent')
    return [
      p(tm === 'full' ? 'That month Julian is released from every signature, and it costs you everything you built: the title, the savings, the name on the door. You spent it on purpose, and would again.' : tm === 'partial' ? 'That month Julian is released from the last signature and not the first ten. You go on paying for the rest, quietly, out of what is left.' : 'He stands anyway, on the public record, because you read it into the minutes where nobody can take it out.'),
      p('A smaller flat, your own name on the lease, a window that looks at another window. Cleaner hands.'),
    ];
  return [
    p(key(s, 'act4.nell-said') === 'eleanor' ? 'That month, a copy of the minute arrives, with one name in it underlined in pencil by somebody who is not you: Eleanor Linden.' : 'That month, nothing arrives. The minute says what the board discussed, and not whom.'),
    p('You fly to Singapore at the end of it, and Nora meets you at the airport, and at dusk you walk the harbour wall together, slowly, at the pace of a woman with a bad leg, and neither of you says why.'),
  ];
}

function settleBlocks(s: GameState): Block[] {
  return [
    ...positionLines(s),
    p('And in a drawer, the switch: the letters, the copies, the people with keys to it. Everything that could still take Meridian apart, if anybody ever came for you again.'),
  ];
}

function settleChoices(s: GameState): C18Choice[] {
  const sw = (id: 'armed' | 'handed' | 'disarmed', label: string, hint: string, to: string, body: Block[]) =>
    offer('x18-switch-' + id + (to ? '-' + to : ''), label, hint, 'keys', (x) => {
      setKey(x, 'end.switch', id);
      if (to) setKey(x, 'end.switch-to', to);
      setKey(x, 'end.position', aim(x) + '-' + terms(x));
      return body;
    });
  const h = holders(s)[0];
  return [
    sw('armed', 'Keep it armed', 'For the rest of your life.', '', [p('You leave it armed, and write the date on the envelope, and put it back in the drawer, and go on with your life knowing it is there, the way you know where the fire exits are.')]),
    ...(h ? [sw('handed', 'Hand it to ' + (holderName[h] ?? h), 'Somebody who will not need to be asked twice.', h, [p('You give the keys to ' + (holderName[h] ?? h) + ', in a café, in an envelope, with one instruction. “If I stop ringing.” And you never have to explain what that means.')])] : []),
    sw('disarmed', 'Disarm it', 'Take the letters back, and burn them.', '', [p('You take the letters back, one by one, from the people who held them, and burn them in the sink, and open the window. It is the most frightening thing you have done all year. It is also the freest.')]),
  ];
}

// ── The keys ──

function keysBlocks(s: GameState): Block[] {
  const h = holdings(s);
  if (!h.length)
    return [
      p('A Saturday. You lay out on the kitchen counter everything of his you still hold, and there is nothing on it but your own keys.'),
      t(key(s, 'exec.cost15') === 'kept' ? 'I gave it all back in the spring, before anybody asked. It turns out that was the easy part.' : 'I never took any of it. I paid my own rent from the first morning. I thought it would feel like winning. It feels like my kitchen.'),
    ];
  return [
    p('A Saturday. You lay out on the kitchen counter everything of his you still hold: ' + h.join('; ') + '.'),
    p('Nobody has asked for any of it back. Nobody will. That is the whole point of him.'),
    t('The left-hand column of the ledger. I chose every line of it with my eyes open. Now I choose again.'),
  ];
}

function keysChoices(s: GameState): C18Choice[] {
  const k = (id: 'keep' | 'return' | 'buy' | 'none', label: string, hint: string, body: Block[]) =>
    offer('x18-keys-' + id, label, hint, 'dinner', (x) => {
      setKey(x, 'end.keys', id);
      return body;
    });
  if (!holdings(s).length) return [k('none', 'Pocket your own keys', 'And go out.', [p('You put your own keys in your own pocket and go out, and lock your own door behind you.')])];
  return [
    k('keep', 'Keep it', 'Chosen, with open eyes.', [p('You put it all back where it lives. The key on your ring. The dress in the wardrobe.'), t('I like it here. I chose it. Nobody is holding it over me, and nobody ever was, and if that ever changes I know exactly where the door is. I wrote it into the contract.')]),
    k('return', 'Give it back', 'Not because anybody asked.', [p('You put it all in an envelope, to facilities, with a note to Hal, and hang the dress on the back of his office door on Monday, dry-cleaned, in its bag.'), q('Julian Mercer', 'You didn’t have to.'), q('You', 'I know. That’s why.')]),
    k('buy', 'Pay for it', 'From your own salary. At the going rate.', [p('You ring facilities on Monday and ask what it all costs, at the going rate, and they are so confused that they put you through to Julian, who laughs, properly, for the first time in weeks, and tells them to send you an invoice.'), t('Now it’s mine. Receipts and all.')]),
  ];
}

// ── The dinner ──

function dinnerBlocks(): Block[] {
  return [
    p('Saturday night. A small restaurant in Pimlico, his choice, eight tables and a waiter who has known him for years. Your bill: you booked it yourself, and told the waiter so on the telephone, and the waiter, who has clearly never been told that about Mr Mercer’s table, sounded delighted.'),
    p('He arrives with something flat in his coat pocket, and when he sits down he takes it out and puts it on the tablecloth by the bread: a plain silver frame, face down, squared to the edge of the table.'),
    q('Julian Mercer', 'I said I’d tell you sitting down. I’m sitting down.'),
  ];
}

function answer(s: GameState): 'nothing' | 'choose' | 'truth' {
  if (key(s, 'exec.told13') === 'never') return 'truth';
  return key(s, 'end.keys') === 'keep' ? 'choose' : 'nothing';
}

function answerBlocks(s: GameState): Block[] {
  const a = answer(s);
  setKey(s, 'end.answer', a);
  return [
    ...(a === 'truth'
      ? [
          p('And before the coffee, because it is the last thing still in your pocket, you tell him about that week. Owen Marsh. The placement. What you were sent to do, and what you did, and what you didn’t tell him.'),
          p('He listens the whole way through, the way he reads a contract, and does not look away once.'),
          q('Julian Mercer', 'I know. I’ve known for a long time. I was waiting to be told. Thank you for telling me.'),
        ]
      : []),
    p('Home, late, you take the card down from the wardrobe door, the first one, with the question on it in pencil from a year ago, and you write the answer underneath it, in ink.'),
    q('The card', a === 'truth' ? 'WHAT DO I OWE HIM? THE TRUTH. PAID.' : a === 'choose' ? 'WHAT DO I OWE HIM? WHATEVER I CHOOSE.' : 'WHAT DO I OWE HIM? NOTHING.'),
    t(a === 'choose' ? 'Which turns out to be a great deal, and all of it given.' : a === 'truth' ? 'The only debt I ever really had. It was never money.' : 'Nothing. And I would still have dinner with him on Saturday. That is the whole of the answer.'),
  ];
}

function dinnerChoices(s: GameState): C18Choice[] {
  const d = key(s, 'c18.x-dinner');
  if (d === 'photo' && !key(s, 'end.photo')) {
    const ph = (id: 'up' | 'down' | 'his', label: string, hint: string, body: Block[]) =>
      offer('x18-photo-' + id, label, hint, 'dinner', (x) => {
        setKey(x, 'end.photo', id);
        return [...body, ...answerBlocks(x)];
      });
    return [
      ph('up', 'Leave it face up', 'On the tablecloth, between you.', [p('You leave it face up on the tablecloth, between the bread and the wine, and she laughs at whatever is off the edge of the picture for the rest of the dinner, and he looks at her twice, and then at you, and then only at you.')]),
      ph('down', 'Turn it back over, for him', 'Gently. It’s his to turn.', [p('You turn it back over, gently, and square it to the edge of the table, exactly as he keeps it, and he puts his hand over yours on the back of the frame and leaves it there.')]),
      ph('his', 'Let him keep deciding', 'Every morning, as he always has.', [p('You push it back across the tablecloth to him, and he puts it in his coat pocket, face down, and you both know he will turn it over one morning soon, and that it will be his morning, and nobody else’s.')]),
    ];
  }
  if (d) {
    const home = (id: 'julian' | 'maya' | 'none', label: string, hint: string, body: Block[]) =>
      offer('x18-home-' + id, label, hint, 'signed', (x) => {
        setKey(x, 'end.with', id);
        return body;
      });
    return [
      home('julian', 'Go home with Julian', 'As a partner. Not a keeper.', [p('You go home with him, and it is your home as much as his, because you have both said so out loud, and written it down. He holds the door. You hold the next one.')]),
      ...(mayaClose(s) ? [home('maya', 'Go home to Maya', 'The kitchen, the cat, the whole of it.', [p('You go home to Maya, and tell her everything over a bottle at the kitchen table, and she says “I knew it,” about eleven separate things, and is right about nine.')])] : []),
      home('none', 'Go home alone', 'Your own door. Your own key.', [p('You go home alone, and it is not lonely. It is yours. You turn your own key in your own door and do not have to tell anybody where you have been.')]),
    ];
  }
  const dn = (id: 'photo' | 'terms' | 'quiet', label: string, hint: string, body: Block[], ends: boolean) =>
    offer('x18-dinner-' + id, label, hint, 'dinner', (x) => {
      setKey(x, 'c18.x-dinner', id);
      return ends ? [...body, ...answerBlocks(x)] : body;
    });
  return [
    dn('photo', 'Ask about the photograph', 'He brought it to be asked.', [
      q('You', 'Tell me.'),
      p('He turns it face up on the tablecloth. A woman at a Helix summer party eleven years ago, in a pale dress on a lawn, laughing at something off the edge of the picture.'),
      q('Julian Mercer', 'We were going to be married. She left the month I became COO, because I never read anything. Contracts, letters, her. My own life. I signed the first 14.3 the week she went. I wasn’t reading anything that year.'),
      p('He tells you her name, and you keep it.'),
      q('Julian Mercer', 'Somebody I didn’t keep. I keep her face down so that I have to decide, every morning, whether to turn her over. I never have. Until now.'),
      t('Not a secret. Not a trap. A decent man’s ordinary grief, and the reason he reads everything twice.'),
    ], false),
    dn('terms', 'Ask what he’ll do now', 'Whatever now turns out to be.', [
      q('You', 'What will you do now?'),
      q('Julian Mercer', 'Read. Everything I sign, twice, for the rest of my life. And learn to cook, which I have never had the time for. You would have to eat it. That’s a term, by the way. I’d like it in writing.'),
      p('He leaves the frame face down by the bread all evening, and neither of you mentions it, and that seems right too.'),
    ], true),
    dn('quiet', 'Talk about nothing', 'The best hour of the year.', [p('You talk about nothing at all: the waiter’s moustache, a film neither of you has seen, whether Hal has a first name. The frame stays face down by the bread. It is the best hour of the year, and you know it while it is happening, which almost never happens.')], true),
  ];
}

// ── Signed ──

function signedBlocks(s: GameState): Block[] {
  const lines: string[] = [
    key(s, 'exec.marsh13') === 'ally'
      ? key(s, 'c15.cost-who') === 'marsh'
        ? 'Owen Marsh lost his inquiry, and kept his bicycle, and writes about the City now for a paper that matters. He sends you the first column. “They can’t un-read it.”'
        : 'Owen Marsh’s inquiry reports in the spring. Page forty-one names a clause, and a fund, and nobody. He rings you from his bicycle to read it to you.'
      : 'A man at the Markets Authority cycles to work, as he always did, and will never know how close he came.',
    ...(key(s, 'exec.sloane14') === 'accepted' ? ['Sloane sends one line at Christmas, on Axiom paper, unsigned: “Square.”'] : []),
    ...(key(s, 'act3.ally.iris') === 'in' ? ['Iris sends a postcard from somewhere warm: a beach, and one word, ENDED.'] : []),
    ...(noraAlly(s) ? ['Nora’s kitchen wall in Holland Village has a new photograph on it, and a white space where the orchids used to go.'] : []),
    ...(key(s, 'exec.fav.car') ? ['Hal drives somebody else now, and still calls you Ms Vale, and still keeps the engine running.'] : []),
    'Clare Adeyemi writes once, from a new job, two lines: “I heard. Thank you.”',
    'And somewhere in a cabinet in a black glass building on the Embankment, a minute, typed while you talked, with the date on it.',
  ];
  return [
    p('The wardrobe door, the last time. You take every card down, one by one, and read each one before it goes in the shoebox.'),
    ...lines.map((l) => p(l)),
    p('Last of all, the one at the top, with nothing on it yet. The name.'),
  ];
}

function signedChoices(): C18Choice[] {
  const n = (id: 'adrian' | 'evelyn' | 'new', label: string, hint: string, body: Block[]) =>
    offer('x18-name-' + id, label, hint, 'page', (x) => {
      setKey(x, 'end.name', id);
      return body;
    });
  return [
    n('adrian', 'Adrian', 'The name you were born with.', [p('You write ADRIAN VALE, and look at it for a long time, and it looks back.')]),
    n('evelyn', 'Evelyn', 'The name you were sold under, and bought back.', [p('You write EVELYN VALE, in your own hand, and it is not the catalogue’s hand, and never was.')]),
    n('new', 'A new name', 'Yours. Nobody else needs to know it.', [p('You write a name nobody has ever called you, and pin it face down, and smile.')]),
  ];
}

// ── The page ──

function pageBlocks(s: GameState): Block[] {
  const a = aim(s);
  const with_ = key(s, 'end.with');
  return [
    p(
      a === 'term'
        ? 'A year later. The office next door, the light on, your name on the door. On the desk, a facility from a fund in Zurich, forty pages, and you are reading it for the second time.'
        : a === 'exit'
          ? 'A year later. A desk of your own, three streets from the river, and a brass plate with your own name on it, over a small practice that reads contracts for people who cannot afford to have them read.'
          : a === 'spent'
            ? 'A year later. The smaller flat, the window that looks at another window, a job nobody placed you in, and a plant on the sill that, against every expectation, is alive.'
            : 'A year later. Holland Village, Nora’s kitchen, Nell’s photograph on the wall, and two sugars and cinnamon in your coffee, because somebody should go on taking it that way.',
    ),
    p(with_ === 'julian' ? 'Julian comes round at eight with a bottle of wine and a single sheet of paper, and puts the paper on the table between you. Across the top, in his careful hand: ADDITIONAL TERMS.' : 'At eight you sit down at the table with a single sheet of paper and write across the top of it, in your own hand: ADDITIONAL TERMS.'),
  ];
}

const HIS_TERMS: Block[] = [
  q('Julian Mercer', 'Mine first. I’ve had a year to think about them.'),
  q('The page', 'She may leave at any time, for any reason or none. Nothing I give her is owed back. I read everything she asks me to, twice.'),
];

function pageChoices(s: GameState): C18Choice[] {
  const pg = key(s, 'end.page');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('x18-later-' + id, label, hint, 'read', (x) => {
      setKey(x, 'end.later', id);
      return body;
    });
  if (!pg) {
    if (key(s, 'end.with') === 'julian')
      return [
        offer('x18-page-write', 'Write it together', 'Three terms each. Read twice.', 'page', (x) => {
          setKey(x, 'end.page', 'together');
          return [...HIS_TERMS, p('He reads them aloud twice, and signs, and turns the page round to you, and holds out the pen.')];
        }),
      ];
    return [
      offer('x18-page-own', 'Write your own', 'Three terms, for yourself.', 'page', (x) => {
        setKey(x, 'end.page', 'own');
        return [q('The page', 'I may leave anything, at any time, for any reason or none. Nothing I am given is owed back. I read everything, twice.'), p('You sign it at the bottom, and there is nobody else’s signature on it, and there doesn’t need to be.')];
      }),
    ];
  }
  if (pg === 'together' && !key(s, 'end.term')) {
    const tm = (id: 'stay' | 'door' | 'files', label: string, hint: string, text: string) =>
      offer('x18-term-' + id, label, hint, 'page', (x) => {
        setKey(x, 'end.term', id);
        return [q('The page', text), p('He reads it once, and then again, slowly, as if learning it by heart, and signs under your name.'), q('Julian Mercer', 'Twice. As promised.')];
      });
    return [
      tm('stay', 'The new one: I may stay', 'Every morning, hers to decide.', 'I may stay. That is mine to decide, every morning, and nobody else’s. The rest of it is the same as last time.'),
      tm('door', 'The door, again', 'Leaving is a decision, not a cliff.', 'I may leave at any time, for any reason or none. I am putting it first so that you can see I will not need it.'),
      tm('files', 'The files, again', 'Including what he signs. Including this.', 'I read everything, including what you sign, including this. And you read everything I ask you to, twice, and one thing I don’t.'),
    ];
  }
  const open = key(s, 'end.later-open');
  if (pg === 'together' && open === 'invited')
    return [
      offer('x18-later-no-sex', 'Stay close, but not sex tonight', 'Kissing, touch, and stopping where you choose.', 'page', (x) => {
        setKey(x, 'end.later-open', 'no-sex');
        setKey(x, 'end.consent', 'no-sex');
        note(x, 'x-evening-consent', 'Evelynn chose the night’s scope (no-sex); Julian Mercer agreed to the same scope. Either may stop at any time.', 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', 'Then that’s tonight. You say stop, I stop. That’s in writing now.')];
      }),
      ...(nightOk(s)
        ? [
            offer('x18-later-sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.', 'page', (x) => {
              setKey(x, 'end.later-open', 'sex');
              setKey(x, 'end.consent', 'sex');
              note(x, 'x-evening-consent', 'Evelynn chose the night’s scope (sex); Julian Mercer agreed to the same scope. Either may stop at any time.', 'Evelynn’s stated choice and his explicit agreement');
              return [q('Julian Mercer', 'Yes. And you say stop, it stops. Same for me. It’s on the page.')];
            }),
          ]
        : []),
      done('goodnight', 'Say goodnight', 'Leaving is complete and respected.', [p('You kiss him once at the door, and say goodnight, and he says “Saturday,” and goes, and you stand at the window with the page in your hand and read it again.')]),
    ];
  if (pg === 'together' && open)
    return [
      done('stop', 'Stop here', 'Honoured immediately, without argument.', [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead, and the page lies on the table between the glasses.')]),
      done('close', 'Stay', 'Continue within what you chose.', open === 'sex'
        ? [p('He undoes the dress slowly, reading you the way he reads everything now, twice, and asks once more, low, at your shoulder. You answer by pulling him down with you, and nothing in the room is owed to anybody.'), p('What happens next is yours and his. The scene fades.')]
        : [p('He kisses you by the window for a long time, and stops exactly where you said, and you stand there together in the dark, a year on, with the page on the table and nothing owed in either direction.')]),
    ];
  if (pg === 'together')
    return [
      offer('x18-later-invite', 'Tonight, with him', 'A chosen night. Heat 3, consent in character, fades.', 'page', (x) => {
        setKey(x, 'end.later-open', 'invited');
        return [q('Julian Mercer', 'Tell me what you want tonight. It’s the only question I ever asked you that I wanted the answer to more than the signature.')];
      }),
      done('quiet', 'The page, and the river', 'Sit up, and read it again.', [p('You sit up together with the page on the table between you and the river going by outside, and read it again, both of you, out loud, and laugh at the same line.')]),
    ];
  return [
    ...(key(s, 'end.with') === 'maya' ? [done('maya', 'Take it round to Maya’s', 'She will want to witness it.', [p('You take it round to Maya’s, and she witnesses it at the kitchen table in eyeliner pencil, and the cat sits on it, and the neighbour bangs on the wall because you are both laughing.')])] : []),
    done('quiet', 'The window, and black coffee', 'Nobody watching back.', [p('You pin the page to the wardrobe door and stand at the window with a cup of coffee, black, and watch the city, and nobody is watching you back.')]),
  ];
}

// ── Read twice ──

function readBlocks(s: GameState): Block[] {
  const name = key(s, 'end.name');
  const a = answer(s);
  const line =
    name === 'adrian'
      ? 'My name is Adrian Vale. I read everything twice now. Including the people who love me.'
      : name === 'evelyn'
        ? key(s, 'end.page') === 'together'
          ? 'My name is Evelyn Vale. I was sold on a signature. I wrote my own terms, and somebody read them twice.'
          : 'My name is Evelyn Vale. I was sold on a signature. I wrote my own terms, and read them twice myself.'
        : 'I wrote my name at the bottom of a blank page, under ADDITIONAL TERMS. Nobody else needs to read it.';
  return [
    p('The last card goes on the wardrobe door, under the first one: the question in pencil from a year ago, and under it, in ink, in your own hand, the answer.'),
    q('The card', a === 'truth' ? 'THE TRUTH. PAID.' : a === 'choose' ? 'WHATEVER I CHOOSE.' : 'NOTHING.'),
    t(line),
    { kind: 'notice', text: 'The end of the Executive route.' },
  ];
}

export function executiveBlocks18(s: GameState): Block[] {
  if (s.phase === 'friday') return fridayBlocks(s);
  if (s.phase === 'settle') return settleBlocks(s);
  if (s.phase === 'keys') return keysBlocks(s);
  if (s.phase === 'dinner') return dinnerBlocks();
  if (s.phase === 'signed') return signedBlocks(s);
  if (s.phase === 'page') return pageBlocks(s);
  if (s.phase === 'read') return readBlocks(s);
  return [];
}

export function executiveChoices18(s: GameState): C18Choice[] {
  if (s.phase === 'friday') return fridayChoices(s);
  if (s.phase === 'settle') return settleChoices(s);
  if (s.phase === 'keys') return keysChoices(s);
  if (s.phase === 'dinner') return dinnerChoices(s);
  if (s.phase === 'signed') return signedChoices();
  if (s.phase === 'page') return pageChoices(s);
  return [];
}
