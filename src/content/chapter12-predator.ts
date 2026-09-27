/** Chapter 12 (Predator route, lane id `predator`) · The Counterparty:
 * geneva → bank → morel → vault → lake → call → ledger (its own end; the Celebrity `complete` is 'A Name').
 * Design: docs/story/PREDATOR_CHAPTER_12_THE_COUNTERPARTY_DESIGN.md (owner-approved 2026-09-27, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_12_SCRIPT.md. Replaces Singapore on this route. Geneva in
 * January: Evelynn signs the fund's financing at Morel & Cie as Helix's representative, a client and not the product.
 * Lucien Morel knew the first Evelyn ("You're the second one"). The take (ask, if she told him the truth; trade
 * Helix's next deal; or the cleaners' lift at five, always open) gives the list: nine accounts paying nine kept
 * legend sites, one of them her own flat, every standing order signed C.; Eleanor Linden's account closed eight days
 * after the harbour, its balance to Nora Linden. An account of her own (take / decline / take and move). An optional
 * chosen evening with Lucien (heat 3, consent-gated, fades), never the price of anything. Nora by phone. Entry: from
 * the Predator `chapter11.ledger` (The Catalogue; until 2026-09-27, temporarily from `chapter9.complete`); Chapter 13
 * enters from `chapter12.ledger`. Local helpers mirror chapter12.ts (c12.* keys, chapter12.* ids) to avoid a circular import.
 * Deepening pass (2026-09-27): the afternoon before the take, which every road passes through (c12.p-afternoon =
 * watch | marcus | lake: a jeweller on the Rue du Rhône who greets her as Mademoiselle Vale and gives her Nell's watch,
 * uncollected for fourteen months, "For N., from N."; Marcus on the phone about what she did with 14.3; or the lake),
 * and the dawn after the call (c12.p-dawn = fountain | lucien | sleep: the jetty and the fountain switched off;
 * Lucien's note under the door, by road; or two hours' sleep). Lunch, the list, the lake and the ledger at greater
 * length; Nora hears about the watch. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';

type C12Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get12 = (s: GameState, k: string) => s.choices['c12.' + k];
const set12 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c12.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C12Choice['apply']): C12Choice => ({ id: 'chapter12.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get12(s, 'rec.' + k) !== undefined) return;
  set12(s, 'rec.' + k, String(s.history.length));
  set12(s, 'event.' + k, String(s.revision));
  set12(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c12.' + k);
  s.knowledge.push('c12.' + k);
}

export const PREDATOR_PHASES12 = ['geneva', 'bank', 'morel', 'vault', 'lake', 'call', 'ledger'] as const;
export const isPredator12 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase12 = (s: GameState) => isPredator12(s) && (PREDATOR_PHASES12 as readonly string[]).includes(s.phase);

type Take = 'ask' | 'trade' | 'night';
const take = (s: GameState) => get12(s, 'p-take') as Take | undefined;
const clause = (s: GameState, id: string) => !!key(s, 'pred.clause.' + id);
const cash = (s: GameState) => Number(key(s, 'own.cash') ?? 0);
const lylePrintout = (s: GameState) => key(s, 'pred.julian8') === 'take';
const schedule = (s: GameState) => !!key(s, 'pred.lever8.archive');
/** The account can be moved out by morning with the indemnity clause or the fund's schedule (design §4). */
export const canMove12 = (s: GameState) => clause(s, 'indemnity') || schedule(s);

export function placePredator12(s: GameState): string | undefined {
  if (s.phase === 'morel' && get12(s, 'p-take')) return 'Afternoon · The Rue du Rhône';
  if (s.phase === 'morel' && get12(s, 'p-lunch')) return '15:00 · The bank’s dining room, the coffee';
  if (s.phase === 'call' && get12(s, 'p-call')) return 'Dawn · The Quai';
  if (s.phase === 'vault')
    return { ask: '20:00 · The vault, Morel & Cie', trade: '17:00 · Lucien Morel’s office', night: '05:00 · The cleaners’ lift, Morel & Cie' }[take(s) ?? 'night'];
  const evening = get12(s, 'p-evening-open');
  if (s.phase === 'lake' && evening) return 'Late · Lucien’s flat on the Quai';
}

// ── The entry, and Geneva ──

export function beginPredator12(): C12Choice {
  return offer('begin-predator', 'Follow the money', 'Geneva. The fund’s bank. Sign for Helix, and read it first.', 'geneva', () => [
    p('The Friday before the New Year, Marcus stops at your door on his way past, and puts a train of papers on your desk, and does not sit down.'),
    q('Marcus Chen', 'Geneva, the second week of January. The fund’s bank is financing Rotterdam, and somebody from Helix has to sign. It’s usually me. This year it’s you.'),
    q('Marcus Chen', 'Sign what they put in front of you. And read it first. I never do. That’s what I pay you for.'),
    t('He is sending me to the fund’s own bank with his signature in my pocket. Either he trusts me, or he wants to see what I do with it. With Marcus, it is always both.'),
  ]);
}

function genevaBlocks(s: GameState): Block[] {
  return [
    p('Geneva in January is a city made of rain. It comes off the lake sideways and finds the gap between your collar and your neck, and the car the bank has sent is waiting at the kerb with its engine running and a driver holding an umbrella that does not need your permission.'),
    p('The hotel is on the Quai, old and cream and discreet, with a lift boy who is sixty and a room on the fifth floor that looks straight out across the water at nothing: a grey lake, grey mountains you are told are there, and the long white plume of the fountain, switched off for the winter, as if the city had stopped showing off for the season.'),
    ...(clause(s, 'report') ? [p('Nobody on the Helix floor knows you are here. Your clause. You report to Marcus alone, and Marcus has told nobody, which you find you like very much.')] : []),
    t('For once I am not the thing in the catalogue. I am the client. I have wanted to know, for months, what it feels like to sit on that side of the table.'),
  ];
}

function genevaChoices(s: GameState): C12Choice[] {
  const g = (id: string, label: string, hint: string, body: Block[]) =>
    offer('arrive-' + id, label, hint, 'bank', (x) => {
      set12(x, 'p-arrive', id);
      return body;
    });
  return [
    g('bar', 'Go down to the hotel bar', 'Money meets in hotel bars.', [
      p('The bar is dark wood and one pianist who is not playing. At the table in the corner, with his back to the room: Robert Lyle, the Helix CFO, who eats at his desk and never travels, and across from him a man in a very good grey suit, turning a glass.'),
      p('The man in grey looks up past Lyle’s shoulder, straight at you, and raises the glass an inch, as if you had already been introduced. Lyle does not turn round.'),
      t(lylePrintout(s) ? 'Four meetings with L.S.F. this quarter, on Julian’s printout. This is one of them. And the man across from him knows who I am before I have told anybody I am here.' : 'The CFO, in Geneva, in a hotel bar, with a man who knows my face. I should go upstairs. I stay for one drink, in the other corner, so that he knows I saw.'),
    ]),
    ...(key(s, 'pred.julian') === 'ally'
      ? [
          g('julian', 'Read Julian’s message', 'One line. It arrived as you landed.', [
            p('Julian’s message arrived as the plane touched down, one line, in the way he writes everything that matters: Morel & Cie is not a bank. It is a filing cabinet with a lake view. Read the footnotes. Come back.'),
            t('Come back. He did not have to write that. He wrote it anyway, and then did not delete it.'),
          ]),
        ]
      : []),
    g('window', 'Stand at the window and watch the rain', 'Tomorrow is early.', [
      p('You stand at the window in the hotel’s dressing gown with the lights off, and watch the rain come across the lake in long grey curtains, one after another, until you feel ready for it.'),
    ]),
  ];
}

// ── The bank ──

function bankBlocks(s: GameState): Block[] {
  return [
    p('Morel & Cie has no name on its door. On the Rue de la Corraterie there is a brass plate with a number on it and nothing else, and a door that opens before you touch it, and a hall panelled in something dark that has been polished by the same family for two hundred years.'),
    p('The signing room is on the second floor: a table, two chairs, a window onto the rain, and Maître Rochat, the bank’s lawyer, with a term sheet forty pages long and a fountain pen laid across it like a knife on a napkin.'),
    ...(clause(s, 'private') ? [p('A young man asks, very politely, whether the bank may photograph its clients’ representatives “for the file”. You tell him, as politely, that your face is your own, in writing. He puts the camera away and makes a note, in ink.')] : []),
    p(
      schedule(s)
        ? 'You read it faster than Rochat expects, because you have read the fund’s paper before, in a vault in London, and you know where it keeps its teeth. On page thirty-one, clause 14.3, in the smallest type in the document: if Rotterdam fails, L.S.F. Advisory takes first claim on the assets of Helix itself.'
        : 'You read it all, while Rochat watches the clock. On page thirty-one, clause 14.3, in the smallest type in the document: if Rotterdam fails, L.S.F. Advisory takes first claim on the assets of Helix itself.',
    ),
    t('Every deal Marcus ever signed. Every one of them, with a clause like this. He never reads them. He has been pledging his own company to the fund, one footnote at a time, and never noticed. Or he noticed, and signed anyway.'),
  ];
}

function bankChoices(): C12Choice[] {
  const b = (id: string, label: string, hint: string, value: string, body: Block[]) =>
    offer('sign-' + id, label, hint, 'morel', (x) => {
      set12(x, 'p-sign', id);
      setKey(x, 'pred.sign', value);
      note(x, 'p12-clause', 'Clause 14.3 of Morel & Cie’s term sheets gives L.S.F. Advisory first claim on Helix’s own assets if a financed deal fails. Every Marcus Chen deal carried it.', 'The Rotterdam term sheet, Morel & Cie, Geneva');
      return body;
    });
  return [
    b('all', 'Sign it as it stands', 'Marcus’s instruction. The clause stays.', 'all', [
      p('You sign it as it stands, every page, with Marcus’s authority and your own name, and Rochat blots each signature as if he were drying a tear.'),
      t('I read it first. That is all he asked. What I do with what I read is mine.'),
    ]),
    b('amend', 'Strike 14.3, initial it, and sign', 'Nobody strikes 14.3.', 'amended', [
      p('You draw a single line through clause 14.3, initial it in the margin, and sign the rest. Rochat looks at the line for a long moment, the way a man looks at a crack in a windscreen.'),
      p('Behind you, somebody laughs, softly, in the doorway. The man in the grey suit from the hotel bar, or a man very like him, leaning on the frame with his hands in his pockets.'),
      q('Lucien Morel', 'Nobody has ever struck 14.3. Not in eleven years. Rochat, give her lunch. I’ll do it myself.'),
    ]),
    b('copy', 'Sign, and keep a copy of 14.3 for yourself', 'The fund’s claim on Helix, in your handbag.', 'copied', [
      p('You sign as it stands, and then ask, very sweetly, for a copy of the whole term sheet for Helix’s files, and put page thirty-one in your handbag, separately, folded once.'),
      t('Marcus pledged Helix to the fund in his own ink. One day a room full of people is going to want to read that page.'),
    ]),
  ];
}

// ── Lucien Morel ──

function morelBlocks(s: GameState): Block[] {
  const want = key(s, 'pred.want');
  return [
    p('The bank’s dining room is on the top floor, a single table under a skylight streaming with rain, laid for two.'),
    p('Lucien Morel is late thirties and looks, at first, like nobody: a grey suit, grey eyes, a face that has been trained since childhood to give nothing away across a table. Fourth generation. Four languages. He writes nothing down, and he looks at you as if he were reading a page he has read before and liked.'),
    p('You order the sole, and a glass of Chasselas. He goes very still.'),
    q('Lucien Morel', 'You’re the second one.'),
    q('You', 'The second what?'),
    q('Lucien Morel', 'The second Evelyn Vale to sit in that chair. The first one ordered the sole, and a glass of Chasselas. She held the glass the way you are holding it, by the foot, as if it might go off.'),
    ...(get5(s, 'published') ? [q('Lucien Morel', 'I have seen your face in the newspapers, of course. And before that, on somebody else.')] : []),
    p('For the rest of the fish you play the game properly, the two of you, the way it is played at tables like this one. He tells you three things about himself: that he has never left Switzerland for longer than a month, that he hates the fountain, and that he has never once lied to a client. You find the lie by the coffee, and tell him which one, and he laughs, for the first time, as if something had given way.'),
    ...(want === 'desk' ? [q('Lucien Morel', 'She wanted out. You don’t. You want the chair, not the cheque. I can see it from here.')] : []),
    t('He knew her. He sat across this table from the woman whose name I am wearing, and he has just told me so over a fish, as if he were remarking on the weather.'),
  ];
}

function lunchChoices(): C12Choice[] {
  const l = (id: string, label: string, hint: string, body: Block[]) =>
    offer('lunch-' + id, label, hint, 'morel', (x) => {
      set12(x, 'p-lunch', id);
      return body;
    });
  return [
    l('truth', '“I’m the second one. Tell me about the first.”', 'The truth, to a man who already knows it.', [
      q('You', 'I’m the second one. Tell me about the first.'),
      p('He puts down his fork. For a moment the face that was trained to give nothing away gives something away, and then takes it back.'),
      q('Lucien Morel', 'Not here. The walls in this building have been listening to my family for two hundred years. Tonight, if you like. I have something of hers.'),
    ]),
    l('deny', 'Tell him he is mistaken', 'The professional lie. He will enjoy it.', [
      q('You', 'You’re mistaken, Monsieur Morel. I have always ordered the sole.'),
      p('He smiles, slowly, the first real smile of the lunch, and lifts his glass to you, by the foot.'),
      q('Lucien Morel', 'Of course. Forgive me. It must have been somebody else.'),
    ]),
    l('turn', 'Turn it back on him', '“And you? Who were you before the bank?”', [
      q('You', 'And you? Who were you before you were the bank?'),
      p('Nobody has asked him that, you can tell. He considers it, and the rain, and you.'),
      q('Lucien Morel', 'A boy who wanted to be a pianist, and was told that Morels do not play in public. I play at night now. Nobody listens. It is the most honest hour of my day.'),
    ]),
  ];
}

function takeChoices(s: GameState): C12Choice[] {
  const k = (id: Take, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('take-' + id, label, hint, 'morel', (x) => {
      set12(x, 'p-take', id);
      setKey(x, 'pred.morel', { ask: 'ally', trade: 'trade', night: 'unaware' }[id]);
      if (id === 'ask') setKey(x, 'pred.ally.morel', 'in');
      return body(x);
    });
  return [
    ...(get12(s, 'p-lunch') === 'truth'
      ? [k('ask', 'Ask him to show you', 'He offered. He will be exposed for it.', () => [q('You', 'Show me. Tonight.'), q('Lucien Morel', 'Eight o’clock. The side door. Come alone, and do not wear anything that makes a noise.')])]
      : []),
    k('trade', 'Offer him a trade', 'Helix’s next deal to his house, for the list. Marcus will notice.', () => [
      q('You', 'Helix has a deal after Rotterdam. The fund’s usual house expects it. I could send it here instead.'),
      q('Lucien Morel', 'And in exchange?'),
      q('You', 'Every account the fund keeps with you that pays for a flat.'),
      p('He looks at you for a long time over the coffee, and then laughs, very quietly, the way people laugh in churches.'),
      q('Lucien Morel', 'Five o’clock. My office. Two professionals.'),
    ]),
    k('night', 'Say nothing, and come back at five in the morning', 'The cleaners’ lift. Alone. The camera will have you.', () => [
      p('You thank him for lunch, and say nothing about anything, and on the way out you watch where the cleaners’ trolleys are kept, and which lift they use, and what time the night porter changes over.'),
      t('I do not need anybody to show me anything. I only need to know when the building is asleep.'),
    ]),
  ];
}

/** The afternoon before the take (deepening pass): every road passes through it. */
function afternoonChoices(s: GameState): C12Choice[] {
  const a = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('afternoon-' + id, label, hint, 'vault', (x) => {
      set12(x, 'p-afternoon', id);
      after?.(x);
      return body;
    });
  const sign = key(s, 'pred.sign');
  return [
    a('watch', 'Walk along the Rue du Rhône', 'The jewellers’ street. Somebody may know your face.', [
      p('The Rue du Rhône is a street of jewellers, each window lit like a small altar, and you walk it slowly in the thin afternoon, the way a woman walks who has nowhere to be.'),
      p('Halfway along, a door opens and an old man in a waistcoat comes out onto the pavement without his coat, into the cold, and says, delighted: “Mademoiselle Vale! Your watch! We had quite given up.”'),
      p('Inside, from a drawer with a ticket on it dated fourteen months ago, he takes a small gold watch on a worn leather strap, cleaned, repaired, uncollected for fourteen months. You turn it over. On the back, engraved in a small plain hand: For N., from N.'),
      q('The jeweller', 'Forty francs, for the repair. And you look very well, if I may say. Much better than the last time.'),
      p('You pay him forty francs, and put her watch on your own wrist, and it fits.'),
      t('Much better than the last time. She came in here with her bad leg, fourteen months ago, and left her watch to be mended, and never came back for it. She meant to. People always mean to.'),
    ], (x) => setKey(x, 'pred.watch', 'kept')),
    a('marcus', 'Ring Marcus', 'He will want to know what you signed.', [
      q('Marcus Chen', 'Well?'),
      ...(sign === 'amended'
        ? [q('Marcus Chen', 'Rochat rang me before you’d finished your fish. You struck 14.3. Nobody strikes 14.3. I’m not sure whether to fire you or promote you.'), q('You', 'Read your own term sheets, Marcus. Then decide.')]
        : sign === 'copied'
          ? [q('Marcus Chen', 'Rochat tells me you asked for a copy of the whole thing. What for?'), q('You', 'For context.'), p('A silence on the line, and then his laugh, the real one.'), q('Marcus Chen', 'I signed that word into your contract myself. God help me.')]
          : [q('Marcus Chen', 'Did you read it?'), q('You', 'Every page.'), q('Marcus Chen', 'And?'), q('You', 'And I signed it. As instructed.'), t('He did not ask what I found. He has never once wanted to know what is in the small print. That is going to be the whole of his problem.')]),
    ]),
    a('lake', 'Walk by the lake', 'Kill the afternoon.', [p('You walk the length of the Quai and back in the thin afternoon light, past the swans and the shut ice-cream kiosks and the fountain with nothing coming out of it, and wait for the building to be ready for you.')]),
  ];
}

// ── The vault ──

const LIST12 = [
  'Nine accounts, each paying the running costs of a flat: Emerald Hill, Singapore; Lisbon; Vienna; Montreal; two in Paris; Cape Town; Buenos Aires; and a flat in London, on your own street, at your own number.',
  'Every standing order is signed the same way, in green, with a looping C.',
  'And a personal account in the name of LINDEN, ELEANOR: closed eight days after a date you know from somewhere, a date in a harbour. The balance went, in one transfer, to Nora Linden, Holland Village, Singapore.',
];

function vaultBlocks(s: GameState): Block[] {
  const k = take(s) ?? 'night';
  const lead: Block[] =
    k === 'ask'
      ? [
          p('Eight o’clock. The side door opens before you touch it. Lucien is in his shirtsleeves, and takes you down two flights of stone stairs, and opens a steel door with two keys, one from his pocket and one from a chain round his neck.'),
          p('The bank keeps paper for clients who prefer paper. One client prefers it very much. The ledger is bound in green leather, and he opens it on a lectern under a single lamp and stands back.'),
        ]
      : k === 'trade'
        ? [
            p('Five o’clock. His office is small, for a man who owns the building, with a piano against one wall with its lid closed. You put the outline of the next deal on his desk. He puts a plain envelope on top of it, and slides both across, so that for a moment your hands are on the same pile of paper.'),
            q('Lucien Morel', 'Two professionals.'),
          ]
        : [
            p('Five in the morning. The cleaners come in by the goods entrance in a line, in blue tabards, and one of them is you, with a trolley and your hair under a scarf, and nobody looks at a cleaner, ever, anywhere, in any city in the world.'),
            p('The records room is on the first floor. The lock is older than the bank’s cameras. The ledger is bound in green leather, and you photograph every page of it with the phone in your tabard pocket while the vacuum cleaner runs in the corridor outside, and over the door a small red light watches you do it.'),
          ];
  return [
    ...lead,
    ...LIST12.map((line) => p(line)),
    ...(k === 'ask'
      ? [
          p('Tucked into the back of the ledger, a single sheet of the bank’s notepaper in a hand you have never seen and somehow recognise: Close it. Send the rest to Nora. — E.L.'),
          q('Lucien Morel', 'She asked me to help her disappear. She sat in that chair and asked me. I said no. I said it very politely, the way my father taught me. I have been sorry for a year.'),
        ]
      : []),
    p('The Singapore line has a note in the margin in a clerk’s neat pencil: RE-ISSUE PENDING. The London line has no note. It does not need one. It has you.'),
    t('My flat. The wardrobe door, the kettle, the bed. Paid for by the month, by the woman who signs in green, since before they gave me the keys. I have been living inside somebody’s inventory.'),
  ];
}

function vaultChoices(): C12Choice[] {
  const v = (id: string, label: string, hint: string, body: Block[]) =>
    offer('list-' + id, label, hint, 'lake', (x) => {
      set12(x, 'p-list', id);
      setKey(x, 'pred.geneva', 'list');
      setKey(x, 'pred.nell', 'known');
      note(x, 'p12-list', 'Morel & Cie holds nine accounts paying the running costs of nine kept legend sites (Singapore, Lisbon, Vienna, Montreal, two in Paris, Cape Town, Buenos Aires, and Evelynn’s own London flat), each standing order signed C. Eleanor Linden’s personal account was closed eight days after the harbour; its balance went to Nora Linden, Holland Village.', 'The green ledger, Morel & Cie, Geneva');
      return body;
    });
  return [
    v('nell', 'Put your finger on her name', 'Eleanor Linden.', [
      p('You put your finger on her name, LINDEN, ELEANOR, and keep it there longer than you need to, the way you would hold somebody’s hand at a bedside.'),
      t('Nell. Her name was Nell. I have been answering to hers for a year and never once said it.'),
    ]),
    v('own', 'Put your finger on your own address', 'The flat with the wardrobe door.', [
      p('You put your finger on your own address, and read the standing order twice: the amount, the date, the green C. It is less than you would have guessed. A woman’s whole life, furnished, costs less a month than Marcus’s car.'),
    ]),
    v('close', 'Close the ledger', 'You have it. Go.', [p('You close the ledger. You have it now, all of it, and there is nothing to be gained by reading it again in a room that is watching you.')]),
  ];
}

// ── The lake: the account, and the evening ──

function lakeBlocks(s: GameState): Block[] {
  return [
    p('Your last night in Geneva. The rain has stopped, and the lake is black and flat, and the lights of the far shore lie on it in long gold lines, like the edges of pages.'),
    p(
      take(s) === 'ask'
        ? 'Lucien meets you at the hotel bar at ten, in the corner where Lyle sat, and puts a small card on the table between you, face down.'
        : 'At ten the concierge brings a small card on a silver tray: Monsieur Morel is in the bar, and would be grateful for ten minutes. He is in the corner where Lyle sat, and puts the card face down between you.',
    ),
    ...(key(s, 'pred.watch') ? [p('He sees the watch on your wrist before he sees anything else, and for a moment the trained face is not trained at all.'), q('Lucien Morel', 'Where did you get that?'), q('You', 'The Rue du Rhône. It was ready.')] : []),
    q('Lucien Morel', 'Every client’s representative has one. It is how we say thank you. The fund seeds it, and the fund forgets about it, and one day you are grateful that it did.'),
    p('On the other side of the card, in the bank’s engraved type: a number, and nothing else. Beside it, in pencil, a figure with a great many noughts. Working capital.'),
    t(key(s, 'pred.want') === 'money' ? 'Enough money that nobody can starve me into anything again. That is what I told Marcus I wanted. Here it is, on a card, from the woman who pays my rent.' : 'This is how she keeps them. Not with a threat. With a card, and a number, and a figure in pencil you can always tell yourself you never touched.'),
  ];
}

function accountChoices(s: GameState): C12Choice[] {
  const a = (id: string, label: string, hint: string, value: string, body: Block[], paid = false) =>
    offer('account-' + id, label, hint, 'lake', (x) => {
      set12(x, 'p-account', id);
      setKey(x, 'pred.account', value);
      if (paid) setKey(x, 'own.cash', String(cash(x) + 25000));
      return body;
    });
  return [
    a('take', 'Turn the card over, and keep it', 'The fund’s money. The fund’s hook.', 'taken', [
      p('You turn the card over, and put it in your purse, and say thank you. He inclines his head, as if you had done exactly what every representative does, which you have.'),
      t('It will be there in the morning. So will she. That is the point.'),
    ], true),
    a('decline', '“I’ll open my own, thank you.”', 'He will like you more for it.', 'declined', [
      q('You', 'I’ll open my own, thank you. Somewhere with a name on the door.'),
      p('He takes the card back and tears it in half, and then, looking at you, in half again.'),
      q('Lucien Morel', 'She said exactly the same thing. The first one. Word for word.'),
    ]),
    ...(canMove12(s)
      ? [
          a('move', 'Take it, and move it by morning', 'To a bank the fund does not own. The most fun, and noticed.', 'moved', [
            p('You take the card and say thank you, and at seven the next morning, from the hotel bed, you move every franc of it to a bank in Zurich with its name in large letters on the door, and the fund’s money becomes yours in the time it takes to boil a kettle.'),
            t(clause(s, 'indemnity') ? 'If anybody calls it theft, Helix pays my lawyers. My clause. His signature.' : 'I know where the fund keeps its money now. I know how it moves. I have just moved some of it the other way.'),
          ], true),
        ]
      : []),
  ];
}

const scopeReply: Record<'no-sex' | 'sex', string> = {
  'no-sex': 'Then that is the evening. You say stop, and I stop. I am, as you know, very good at stopping.',
  sex: 'Yes. And you say stop, it stops. The same for me.',
};
const stay: Record<'no-sex' | 'sex', Block[]> = {
  'no-sex': [p('He plays for you: one piece, very quietly, the most honest hour of his day. Then he kisses you by the black window with the lake behind you, and stops exactly where you said, and you stand there together in the dark like two people who have both been lying all day and have, for an hour, run out.')],
  sex: [p('He undresses you as if he were reading something he wants to remember, slowly, without writing anything down, and asks once more, and you answer by pulling him toward the bedroom and the lake-light on the ceiling.'), p('What happens next is two people who both know the other is lying, choosing each other anyway. The scene fades.')],
};

function eveningChoices(s: GameState): C12Choice[] {
  const open = get12(s, 'p-evening-open');
  if (open === 'lucien') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer(`p12-lucien-${id}`, label, hint, 'lake', (x) => {
        set12(x, 'p-evening-open', 'lucien-room');
        set12(x, 'p-evening-scope', id);
        note(x, 'p12-evening-consent', `Evelynn chose the evening’s scope (${id}); Lucien Morel agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Lucien Morel', scopeReply[id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('p12-leave', 'Say goodnight and go back to the hotel', 'Leaving is complete and respected.', 'call', (x) => {
        delete x.choices['c12.p-evening-open'];
        set12(x, 'p-evening-outcome', 'declined');
        return [p('You say goodnight at his door and mean it. He walks you back along the Quai to the hotel, under one umbrella, and does not try to come in.')];
      }),
    ];
  }
  if (open === 'lucien-room') {
    const sc = get12(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p12-stop', 'Stop here', 'Honoured immediately, without argument.', 'call', (x) => {
        delete x.choices['c12.p-evening-open'];
        set12(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He walks you back along the Quai to the hotel, and does not ask why.')];
      }),
      offer('p12-stay', 'Stay', 'Continue within what you chose.', 'call', (x) => {
        delete x.choices['c12.p-evening-open'];
        set12(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  return [
    offer('lake-lucien', 'Let him walk you home the long way', 'His flat is on the Quai. He plays at night.', 'lake', (x) => {
      set12(x, 'p-evening', 'lucien');
      set12(x, 'p-evening-open', 'lucien');
      return [
        p('He walks you home the long way, along the black water, and his home turns out to be on the way: a flat on the Quai with the piano’s twin in it, and the lake filling every window.'),
        q('Lucien Morel', 'Nothing you have asked me today and nothing I have given you has anything to do with this. I want that understood before I ask. Tell me what you want tonight.'),
      ];
    }),
    offer('lake-alone', 'Go up alone', 'The call you have to make is at two.', 'call', (x) => {
      set12(x, 'p-evening', 'alone');
      return [p('You say goodnight in the bar, and go up alone, and sit on the bed in your coat with the list on your knees until the lake goes from black to less black.')];
    }),
  ];
}

// ── The call ──

function callBlocks(): Block[] {
  return [
    p('Two in the morning in Geneva. Nine in the morning in Singapore. The hotel phone, heavy and cream, on the table by the window, and a number you copied from the ledger in your own hand, a Holland Village number, the only name on the list that is still alive.'),
    t('She was paid for her sister. By the woman who signs in green. She has a right to know somebody read it.'),
  ];
}

function callChoices(s: GameState): C12Choice[] {
  const c = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('call-' + id, label, hint, 'call', (x) => {
      set12(x, 'p-call', id);
      setKey(x, 'pred.nora', value);
      after?.(x);
      return body;
    });
  return [
    c('truth', 'Ring her, and tell her the truth', '“I’m wearing your sister’s name.”', 'told', [
      q('Nora Linden', 'Hello? Linden.'),
      q('You', 'Mrs Linden, you don’t know me. I’m wearing your sister’s name. I’d like to know who she was.'),
      p('A silence so long you think the line has gone. Somewhere behind it, a child asking for something, and being told to wait.'),
      q('Nora Linden', 'I don’t know who you are, and I’m not going to ask. I’ll tell you one thing, and then I’m going to put the phone down, and you’re not going to ring again.'),
      q('Nora Linden', 'She had a bad leg. From a motorbike, when she was nineteen. She would never have walked the harbour wall. Never. Remember that.'),
      ...(key(s, 'pred.watch') ? [q('You', 'I have her watch. For N., from N. A jeweller in Geneva kept it for her.'), p('A breath on the line, the kind that has had to be taken on purpose.'), q('Nora Linden', 'Then keep it wound. She never did.')] : []),
      p('The line goes dead.'),
    ], (x) => note(x, 'p12-leg', 'Nora Linden: Nell had a bad leg from a motorbike accident at nineteen, and would never have walked the harbour wall.', 'Nora Linden, by telephone from Geneva')),
    c('bank', 'Ring her, and say you are from the bank', 'About the transfer. See what she says.', 'lied', [
      q('Nora Linden', 'Hello? Linden.'),
      q('You', 'Mrs Linden, I’m calling from Morel & Cie in Geneva, about a transfer last year from your sister’s account.'),
      q('Nora Linden', 'Tell her friend the tall one that I spent it on my son. Every penny. And tell her not to ring this number again.'),
      p('She puts the phone down. You sit with the receiver in your hand until it starts to make the noise receivers make.'),
      t('Her friend the tall one. She thinks I am Celeste’s. On this road, perhaps I am.'),
    ]),
    c('none', 'Don’t ring', 'Not yet. Not like this.', 'none', [p('You do not ring. You fold the number into the lining of Adrian’s old jacket, with everything else that matters, for the day you can say something to her that is worth her hearing.')]),
  ];
}

/** The dawn after the call (deepening pass), before the flight home. */
function dawnChoices(s: GameState): C12Choice[] {
  const k = take(s) ?? 'night';
  const d = (id: string, label: string, hint: string, body: Block[]) =>
    offer('dawn-' + id, label, hint, 'ledger', (x) => {
      set12(x, 'p-dawn', id);
      return body;
    });
  return [
    d('fountain', 'Walk down to the fountain', 'The end of the jetty, before the city wakes.', [
      p('At six you walk out along the stone jetty in the dark to the foot of the fountain, switched off for the winter: a steel nozzle in the black water, and a sign explaining, in four languages, how high it goes when it is allowed to.'),
      p('You stand at the end of it, with the lake on three sides and the whole of Geneva asleep behind you, and find that you are saying her name, out loud, once, to nobody.'),
      t('Nell. There. Somebody has said it in this city, at least once, since the bank closed her account.'),
    ]),
    d('lucien', 'Open the envelope under the door', 'Somebody slipped it under at four.', [
      p('A cream envelope, the bank’s, with no name on it, slipped under the door at some point in the night. Inside, one line in a hand that has never written anything down in front of you:'),
      q(
        'The note',
        k === 'ask'
          ? 'They will ask me what you wanted. I shall tell them you were charming and asked for nothing. It will be the first lie I have told for a client in eleven years, and the first I have enjoyed. — L.'
          : k === 'trade'
            ? 'A pleasure doing business. The piano is out of tune. Come back one day and tell me how badly. — L.'
            : 'The camera on the first floor is mine, not theirs. It was a very dark morning on my tape. I cannot speak for theirs. — L.',
      ),
      t(k === 'night' ? 'He saw me. He saw me and he said nothing. Everybody in this city is somebody’s, and he has just told me whose he would like to be.' : 'The only man in the game as good at this as I am. I would like to know which of us is going to have to find that out.'),
    ]),
    d('sleep', 'Sleep two hours before the flight', 'You have earned two.', [p('You sleep two hours in your clothes on top of the covers, deeply, like somebody who has put something down, and wake to the alarm and the grey and the car the bank has sent.')]),
  ];
}

// ── The ledger ──

function ledgerBlocks(s: GameState): Block[] {
  const k = take(s) ?? 'night';
  const intimate = get12(s, 'p-evening-outcome')?.startsWith('intimate');
  return [
    p('Home. The flat on your own street at your own number, paid for by the month, which you walk into as if for the first time, touching things: the kettle, the wardrobe door, the bed.'),
    p('You stand in the kitchen and work out, from the ledger, how many months of the kettle she paid for, and how many of the bed, and find that you cannot stop.'),
    ...(key(s, 'pred.watch') ? [p('You wind her watch before you do anything else, and pin it to the wardrobe door by its strap, and it hangs there over the cards, ticking, the only thing on the door that is moving.')] : []),
    p('You pin a new card above Marcus, above the fund, in capitals: ELEANOR LINDEN. NINE FLATS. C. And under it, smaller, a tenth line you never thought you would write: THIS FLAT.'),
    p('The black phone lights before you have taken your coat off.'),
    q(
      'C.',
      k === 'night'
        ? 'The bank tells me somebody borrowed a tabard at five in the morning, darling. How enterprising. I do hope it was warm enough.'
        : intimate && k !== 'ask'
          ? 'Lucien tells me you are charming. He never tells me that. About anybody.'
          : k === 'ask'
            ? 'Geneva agreed with you, darling. It usually disagrees with people. Lucien has gone very quiet. I shall have to find out why.'
            : 'Geneva agreed with you, darling. Lucien tells me you drive a hard bargain. Marcus will be so surprised.',
    ),
    ...(key(s, 'pred.account') === 'taken' ? [q('C.', 'And I’m so glad you kept the card. Everybody does, in the end.')] : key(s, 'pred.account') === 'moved' ? [q('C.', 'Zurich. How very unsentimental. I did so like the first one, for saying no.')] : []),
    t('She pays for the roof over my head, and I have just read the receipt. Whatever she asks me next, I will know what it costs her to ask.'),
  ];
}

export function predatorBlocks12(s: GameState): Block[] {
  if (s.phase === 'geneva') return genevaBlocks(s);
  if (s.phase === 'bank') return bankBlocks(s);
  if (s.phase === 'morel') return morelBlocks(s);
  if (s.phase === 'vault') return vaultBlocks(s);
  if (s.phase === 'lake') return lakeBlocks(s);
  if (s.phase === 'call') return callBlocks();
  if (s.phase === 'ledger') return ledgerBlocks(s);
  return [];
}

export function predatorChoices12(s: GameState): C12Choice[] {
  if (s.phase === 'geneva') return genevaChoices(s);
  if (s.phase === 'bank') return bankChoices();
  if (s.phase === 'morel') return !get12(s, 'p-lunch') ? lunchChoices() : !get12(s, 'p-take') ? takeChoices(s) : afternoonChoices(s);
  if (s.phase === 'vault') return vaultChoices();
  if (s.phase === 'lake') return get12(s, 'p-account') ? eveningChoices(s) : accountChoices(s);
  if (s.phase === 'call') return get12(s, 'p-call') ? dawnChoices(s) : callChoices(s);
  return [];
}
