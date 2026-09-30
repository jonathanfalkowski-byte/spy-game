/** Chapter 16 (Institutional route, lane id `institutional`) · Reasonable Notice:
 * briefing → objective → detail → bundle → uniform → notice → complete (the shared end, with Institutional blocks).
 * Design: docs/story/INSTITUTIONAL_CHAPTER_16_REASONABLE_NOTICE_DESIGN.md (owner-approved 2026-09-30, all eight
 * decisions as recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_16_SCRIPT.md. The shared approach ("The
 * Approach") in Institutional framing: the morning of the board. The case laid out like an Axiom briefing (act4.case; the
 * client file counts for most, and a torn 9C receipt is one card shorter and says why). The aim is the Institutional
 * position (act4.aim): terms from inside (needs Sloane allied; closed aims say why), through channels (always; stronger
 * with Marsh), walk with what you know (always), or Nell (always), each with a one-line notice to the board
 * (act4.notice). Who comes (two inside, one outside); on the cut road Benton insists on escorting her, and she can accept
 * or shut the door on him (act4.benton = escort | refused | gone | absent). The first card and the one held back (the
 * client file, Nell's order, the 1109 cards, page seven, the empty box). Armour (the charcoal suit, her own black, the
 * lanyard worn like jewellery; Daniel at her cuffs if he knows, Maya at her hair, Sloane's "Collar." from the doorway,
 * never touching; heat 1–2). The way in; "Good luck, Ms Vale." The long room; Celeste stands, as herself. Sloane is never
 * a romance; the green light is never near anything erotic. Entered from an Institutional `chapter15.complete`; ends at
 * the Chapters 17–18 in-development stop, having set the shared act4.* contract. Choice ids carry `i16-`.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. Five past five, before the cards are picked up
 * (c16.i-dawn = sloane | daniel | nell | quiet: Sloane on the phone, awake since three, "Read me the first line."; Daniel's
 * text about the tie; Nell's photograph into her pocket; or the cards). Noon, Celeste's reply to the notice by courier,
 * "Received with thanks. Twenty-three hours would have been reasonable. C." (c16.i-reply = bin | pin | file). Five o'clock,
 * the last look at the flat on the way out (c16.i-leave = light | wardrobe | go: a word to the green light, "Back by
 * nine. Log it."; the first card on the wardrobe door; or out). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

type C16Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get16 = (s: GameState, k: string) => s.choices['c16.' + k];
const set16 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c16.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C16Choice['apply']): C16Choice => ({ id: 'chapter16.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get16(s, 'rec.' + k) !== undefined) return;
  set16(s, 'rec.' + k, String(s.history.length));
  set16(s, 'event.' + k, String(s.revision));
  set16(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c16.' + k);
  s.knowledge.push('c16.' + k);
}

export const INSTITUTIONAL_PHASES16 = ['briefing', 'objective', 'detail', 'bundle', 'uniform', 'notice'] as const;
export const isInstitutional16 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase16 = (s: GameState) => isInstitutional16(s) && ((INSTITUTIONAL_PHASES16 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const told = (s: GameState) => !!key(s, 'inst.daniel-told');
const danielNight = (s: GameState) => ['c10.i-night', 'c11.i-night', 'c14.i-evening', 'c15.i-night'].some((k) => key(s, k) === 'daniel' && !!key(s, k + '-outcome')?.startsWith('intimate'));
const way14 = (s: GameState) => key(s, 'inst.way14') as 'ally' | 'proof' | 'cut' | undefined;
const cost15 = (s: GameState) => key(s, 'inst.cost15');
const spentAlly = (s: GameState, who: string) => cost15(s) === 'ally' && key(s, 'c15.cost-who') === who;
const sloaneAllied = (s: GameState) => key(s, 'act3.sloane') === 'allied';
const marshIn = (s: GameState) => key(s, 'act3.ally.marsh') === 'in' && !spentAlly(s, 'marsh');
const irisIn = (s: GameState) => key(s, 'act3.ally.iris') === 'in' && !spentAlly(s, 'iris');
const noraIn = (s: GameState) => key(s, 'act3.ally.nora') === 'in' || ['truth', 'kind'].includes(key(s, 'inst.nora12') ?? '');
const took = (s: GameState) => key(s, 'inst.took15');
const cards1109 = (s: GameState) => took(s) === 'cards' || key(s, 'c13.card') === 'taken';
const emptyBox = (s: GameState) => key(s, 'c8.i-dark') === 'torch';
/** Benton walks her in on the cut road, unless Maya's people already walked him out (Ch14). */
export const bentonInsists16 = (s: GameState) => key(s, 'inst.authority') === 'benton' && !key(s, 'inst.benton-exposed');
const commissioned = (s: GameState) => cost15(s) !== 'badge' && way14(s) !== 'proof';
export const insideOpen16 = (s: GameState) => sloaneAllied(s);

/** The case, stated honestly (design §2): points and the reasons behind them. */
export function case16i(s: GameState): { strength: 'thin' | 'supported' | 'strong' | 'overwhelming'; reasons: string[] } {
  const pr = key(s, 'inst.priya15');
  const r: [boolean, number, string][] = [
    [!!key(s, 'inst.client-file'), 2, 'AXIOM · CLIENT: the vendor’s own receipts, E. V. (II) delivered' + (pr === 'tear' ? ', one receipt shorter than it was, because a woman by the far window is safe' : '')],
    [pr === 'keep', 1, 'CANDIDATE 9C, whole: the next one, from Axiom’s own floor'],
    [pr === 'give', 1, 'Priya, who read her own receipt and can say so'],
    [way14(s) === 'ally', 1, 'the ORACLE verdict, already on the inquiry’s record'],
    [took(s) === 'nell', 1, 'the Jakarta order, signed C.'],
    [cards1109(s), 1, 'the 1109 cards: every placement filmed'],
    [took(s) === 'adrian', 1, 'Adrian Vale’s file: what the clinic did, in the clinic’s own hand'],
    [['copy', 'note'].includes(key(s, 'inst.file') ?? ''), 1, 'the Project Eve procurement file, from Records'],
    [key(s, 'inst.report12') === 'all', 1, 'the Singapore report, all of it, on Axiom’s record'],
    [sloaneAllied(s), 1, 'Sloane, the officer of record'],
    [marshIn(s), 1, 'Owen Marsh and the Markets Authority'],
    [noraIn(s), 1, 'Nora Linden'],
    [key(s, 'act3.black-phone') === 'keep', 1, 'the black phone, every message'],
  ];
  const got = r.filter(([ok]) => ok);
  const pts = got.reduce((a, [, n]) => a + n, 0);
  return { strength: pts >= 10 ? 'overwhelming' : pts >= 7 ? 'strong' : pts >= 4 ? 'supported' : 'thin', reasons: got.map(([, , why]) => why) };
}

type Who = 'sloane' | 'maya' | 'daniel' | 'priya' | 'marsh' | 'nora';
export function inside16i(s: GameState): Who[] {
  return [
    sloaneAllied(s) && 'sloane',
    'maya',
    told(s) && 'daniel',
    key(s, 'inst.priya15') === 'give' && 'priya',
    marshIn(s) && 'marsh',
    noraIn(s) && 'nora',
  ].filter(Boolean) as Who[];
}
const inside = (s: GameState): Who[] => ((key(s, 'act4.inside') ?? '').split(',').filter(Boolean) as Who[]);

export function placeInstitutional16(s: GameState): string | undefined {
  if (s.phase === 'detail' && key(s, 'act4.inside-done')) return 'Morning · Outside';
  if (s.phase === 'bundle' && key(s, 'act4.first')) return 'Noon · The one you keep';
  if (s.phase === 'uniform' && key(s, 'act4.wear')) return '16:30 · The mirror';
}

// ── The entry ──

export function beginInstitutional16(): C16Choice {
  return offer('begin-institutional', 'Thursday', 'The board meets at six.', 'briefing');
}

// ── The briefing ──

function briefingBlocks(s: GameState): Block[] {
  const c = case16i(s);
  const light = key(s, 'act3.home') !== 'lost';
  return [
    p('Thursday, five in the morning. You take every card down from the wardrobe door and lay them out on the floor the way Axiom lays out a briefing: subject, source, grade, in the order they will matter. Adrian sat through four hundred of these. He never once gave one.'),
    p('AXIOM · CLIENT in the middle. Around it, in a ring: a forged tasking with a blank line for BACKUP, a pen from a balcony, a report from Singapore, a card that says VICTORIA SLOANE. HANDLER. AX-7A., and under it, in pencil, the question you pinned there on your first night back.'),
    ...(light ? [p('In the hall, the little green light watches you do it, the way it has watched everything since the spring. Let it. It can put this in its log with the rest.')] : []),
    p('What you hold: ' + (c.reasons.length ? c.reasons.join('; ') : 'less than you would like, and all of it yours') + '.'),
    q('The card', 'THE CASE: ' + c.strength.toUpperCase() + '.'),
    t(c.strength === 'thin' ? 'Thin. Then I walk in thin, and make up the rest with my face.' : c.strength === 'overwhelming' ? 'Overwhelming. She has never been overwhelmed in her life. I would like to be there when she finds out what it feels like.' : 'Enough to make her sit down. Not enough to make her stay down. Then I choose carefully.'),
  ];
}

function dawnChoices(s: GameState): C16Choice[] {
  const d = (id: 'sloane' | 'daniel' | 'nell' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('i16-dawn-' + id, label, hint, 'briefing', (x) => {
      set16(x, 'i-dawn', id);
      return body;
    });
  return [
    ...(way14(s) !== 'cut'
      ? [d('sloane', 'Answer the phone', 'Ten past five. You know who it is.', [
          p('Ten past five, the phone, and you know who it is before you look.'),
          q('Sloane', 'You’re up.'),
          q('You', 'So are you.'),
          q('Sloane', 'Since three. I always am, before a board. Read me the first line of what you’ll say. Just the first line. I’ll know from that whether you’re ready.'),
          p('You read it to her. There is a silence on the line of exactly the length she uses before she signs something.'),
          q('Sloane', 'Good. Don’t change it. And don’t ring me back, I shall only tell you to change it.'),
        ])]
      : []),
    ...(told(s)
      ? [d('daniel', 'Read Daniel’s text', 'He’s awake too.', [
          q('Daniel', 'Are you awake? I’m awake. I’ve ironed the tie. Don’t ask which tie. It’s the one you hate. It felt right.'),
          q('Daniel', danielNight(s) ? 'Also I love you. That’s not a board thing. That’s just a five in the morning thing.' : 'Also, you’ll be brilliant. That’s not a prediction. I’ve seen you read a filing.'),
          p('You read it twice, and put the phone face down on the floor beside the cards, and do not answer yet, because you will want to say it properly, and properly takes longer than a text.'),
        ])]
      : []),
    ...(noraIn(s) ? [d('nell', 'Take Nell’s photograph off the wall', 'The one Nora gave you. For your pocket.', [p('You unpin the photograph Nora gave you, Nell on the harbour wall, laughing, in flat shoes, and look at it for a long time, and put it in the inside pocket of the jacket you will wear, over your heart, where it will be in the room whether anybody else says her name or not.')])] : []),
    d('quiet', 'Keep laying out the cards', 'In order. In silence.', [p('You keep laying out the cards in silence, and the room gets light around you, and the kettle clicks off, and you do not notice.')]),
  ];
}

function briefingChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'i-dawn')) return dawnChoices(s);
  return [
    offer('i16-case-set', 'Pick up the cards', 'Graded, sourced, in order.', 'objective', (x) => {
      setKey(x, 'act4.case', case16i(x).strength);
      return [p('You pick them up in order, square the edges, and put a rubber band round them, and write on the top one, the way the briefing officers do: FOR THE BOARD. EYES ONLY. It is a case now. Something you can carry into a room.')];
    }),
  ];
}

// ── The objective: the aim and the notice ──

function objectiveBlocks(s: GameState): Block[] {
  const w = way14(s);
  return [
    p('Six o’clock, the kitchen table, the kettle, the cards in their rubber band. The real decision of the day is not what she will say. It is what you want Axiom to be when you walk out of that room: the client that returned its product, the client that reported its vendor, or nothing of yours at all.'),
    ...(insideOpen16(s)
      ? []
      : [t(w === 'cut' ? 'Terms from inside needs somebody on seventy-one to raise it. Victoria resigned on a Friday with a typed sheet. There’s nobody left up there who would.' : 'Terms from inside needs Victoria to raise it. I made her the proof, not the partner. She’ll testify. She won’t raise it.')]),
  ];
}

const NOTICE: Record<'inside' | 'channels' | 'walk' | 'nell', string> = {
  inside: 'AXIOM, AS CLIENT, GIVES NOTICE OF A DEFECT IN THE PRODUCT SUPPLIED UNDER THE PROJECT EVE CONTRACT. THE PRODUCT WILL ATTEND.',
  channels: 'PLEASE FIND ENCLOSED A COPY OF THE INQUIRY’S FINDINGS, WHICH WILL BE FILED WITH THE REGULATOR AT NINE TOMORROW. YOU MAY WISH TO READ THEM FIRST.',
  walk: 'I AM COMING TO TELL YOU WHAT I KNOW. I WILL NOT BE STAYING.',
  nell: 'ELEANOR LINDEN. SIX O’CLOCK.',
};

function objectiveChoices(s: GameState): C16Choice[] {
  const paper = commissioned(s) ? 'on Axiom paper, with your file number under the signature' : 'on your own paper, a sheet from the pad by the telephone, with nothing under the signature but your name';
  const a = (id: 'inside' | 'channels' | 'walk' | 'nell', label: string, hint: string, body: Block[]) =>
    offer('i16-aim-' + id, label, hint, 'detail', (x) => {
      setKey(x, 'act4.aim', id);
      setKey(x, 'act4.notice', id);
      return [...body, p('Then the notice. One line, typed, ' + paper + ', and couriered to the Vesper by seven, so that six people read it over breakfast:'), q('The notice', NOTICE[id]), t('Reasonable notice is twenty-four hours. I am giving them eleven. Victoria would approve.')];
    });
  return [
    ...(insideOpen16(s)
      ? [a('inside', 'Terms from inside', 'Axiom returns the product as defective, and you stay: protected, ranked, known.', [
          t('Not revenge. A contract, terminated for defect, by the client, in the vendor’s own minutes. Victoria raises it. I stay, and everybody on seventy-one knows exactly what I was, and I stay anyway.'),
          ...(cost15(s) === 'badge' ? [t('I gave Terry my badge a week ago. Then I go in on my own paper, and come out with a better one.')] : []),
        ])]
      : []),
    a('channels', 'Through channels', marshIn(s) ? 'Maya’s findings to the board, and the Markets Authority behind them.' : 'Maya’s findings to the board, and a regulator behind them.', [t('The whistle, the slow way, in writing. Meridian wounded on paper, Axiom surviving because it told first. I keep my protection. I lose my rank. It was only ever on loan.')]),
    a('walk', 'Walk with what you know', cost15(s) === 'badge' ? 'You handed Terry your badge a week ago. This is the other half.' : 'Tell them, refuse whatever they offer, and walk out of Axiom.', [t('Everything I know, said to their faces, and then out: out of Axiom, out of the flat, out of the file. Unprotected. Free. Nobody’s product and nobody’s officer.')]),
    a('nell', 'Nell’s name', 'Said out loud in that room, by the woman who signed the order.', [t('Not justice. Nobody can give her that. Her name, out loud, in that room, from that mouth. That much I can do.')]),
  ];
}

// ── The detail: who comes ──

const insideScene: Record<Who, [string, string, Block[]]> = {
  sloane: ['Sloane', 'The client’s officer of record.', [p('Sloane on seventy-one at eight, at the window, with a lanyard in each hand, holding one of them out to you without turning round.'), q('Sloane', 'I have wanted to see the room upstairs for three years as well. I’ll sit where they put the client. I expect it’s by the door.')]],
  maya: ['Maya', 'The inquiry, with its bundle.', [p('Maya at your door at half past seven with the inquiry’s bundle in a box, three highlighters and a face like Christmas.'), q('Maya', 'I’ve been waiting my whole career to serve a notice on somebody who deserves it. I brought tabs. Nobody at that table has ever seen tabs like these.')]],
  daniel: ['Daniel', 'He knows. He carries the boxes.', [p('Daniel at the door with two coffees and the tie you told him never to wear again, wearing it.'), q('Daniel', 'I’ll carry the boxes. Nobody looks at the man carrying the boxes. You taught me that too, as it turns out.')]],
  priya: ['Priya', 'Only if she chooses to.', [p('You ring Priya at seven and ask, and tell her she can say no, and mean it. She is quiet for a long time.'), q('Priya', 'You said to ask you next week whether I meant it. I’ve decided. I mean it. I’m coming.')]],
  marsh: ['Owen Marsh', 'His notice to produce, and his bicycle clips.', [p('Marsh with a box of files, a Markets Authority notice to produce signed at six, and his bicycle clips still on.'), q('Owen Marsh', 'I’m not strictly allowed in rooms like that. I have a piece of paper that says I am. We’ll see which of us is right.')]],
  nora: ['Nora Linden', 'Off the overnight flight.', [p('Nora off the overnight flight from Singapore with Nell’s photograph in her handbag and her face set.'), q('Nora Linden', 'I want to see her face when somebody says it. That’s all I want. I’ve wanted it for three years.')]],
};

function detailBlocks(): Block[] {
  return [
    p('Morning. Axiom would call it a detail: who goes in with the principal, and who waits outside with the engine running and a number to ring.'),
    t('Two inside, at most. One outside. Or nobody, which is how I walked into the Glass House.'),
  ];
}

function detailChoices(s: GameState): C16Choice[] {
  if (!key(s, 'act4.inside-done')) {
    const chosen = inside(s);
    const n = chosen.length;
    const picks = inside16i(s)
      .filter((w) => !chosen.includes(w))
      .map((w) => {
        const [label, hint, body] = insideScene[w];
        return offer('i16-inside-' + w, label, hint, 'detail', (x) => {
          setKey(x, 'act4.inside', [...chosen, w].join(','));
          if (n + 1 >= 2) setKey(x, 'act4.inside-done');
          return body;
        });
      });
    return [
      ...picks,
      offer(n ? 'i16-inside-done' : 'i16-inside-none', n ? 'That’s enough' : 'Nobody inside', n ? 'Two is a detail. More is a delegation.' : 'Alone into the room. Harder. Allowed.', 'detail', (x) => {
        setKey(x, 'act4.inside-done');
        if (!n) setKey(x, 'act4.inside', '');
        return n ? [] : [t('Alone. She will like that. Let her.')];
      }),
    ];
  }
  const inn = inside(s);
  const o = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i16-outside-' + id, label, hint, 'bundle', (x) => {
      setKey(x, 'act4.outside', id);
      return body;
    });
  return [
    ...(sloaneAllied(s) && !inn.includes('sloane') ? [o('sloane', 'Sloane, in the van', 'The headphones on and the engine running.', [q('Sloane', 'Grey van, the Embankment, from half past five. Seven o’clock and you haven’t rung, I stop being polite.')])] : []),
    ...(marshIn(s) && !inn.includes('marsh') ? [o('marsh', 'Marsh, across the road', 'The minister’s number on his phone.', [q('Owen Marsh', 'Seven o’clock. If you haven’t rung, I ring the minister. I’d rather not. He says “going forward”.')])] : []),
    ...(irisIn(s) ? [o('iris', 'Iris, from a station', 'The switch, wherever she is.', [q('Iris Moreau', 'I’m in a station you’ve never heard of with your envelope in my coat. Seven o’clock. Don’t make me open it. I hate paperwork.')])] : []),
    o('switch', 'The switch', 'A phone call at seven if you haven’t walked out.', [p('You ring each of them, and say the same eleven words, and hang up: “If you haven’t heard from me by seven, open it.”')]),
  ];
}

// ── The bundle: the order of things ──

type Card = 'client' | 'nell' | 'cards' | 'page' | 'box';
const cardName: Record<Card, string> = { client: 'the client file', nell: 'the Jakarta order', cards: 'the 1109 cards', page: 'page seven', box: 'the empty box' };
const cardHint: Record<Card, string> = {
  client: 'Their receipts. “Did we know about 9C?”',
  nell: 'The burn, signed C.',
  cards: 'The product, in use.',
  page: 'Yourself, torn out of their book.',
  box: 'PROJECT EVE (I), and the outline of a file in the dust.',
};
const cardsHeld = (s: GameState): Card[] => ['client', ...(took(s) === 'nell' ? ['nell' as Card] : []), ...(cards1109(s) ? ['cards' as Card] : []), 'page', ...(emptyBox(s) ? ['box' as Card] : [])];

function bundleBlocks(): Block[] {
  return [
    p('Noon. A courier at the door with a black envelope, Vesper stock, and inside it a single card in the looping green hand: her reply to your notice.'),
    q('The card', 'Received with thanks. Twenty-three hours would have been reasonable. C.'),
    t('She knows about clause 22. She knows about Victoria’s twenty-three hours. Of course she does. She keeps everything.'),
  ];
}

const cardsLine = p('Then the cards on the kitchen table in a row. What goes down first, in front of the woman who sold you. And which one you keep in your pocket, for the moment she thinks she has won.');

function replyChoices(): C16Choice[] {
  const r = (id: 'bin' | 'pin' | 'file', label: string, hint: string, body: Block[]) =>
    offer('i16-reply-' + id, label, hint, 'bundle', (x) => {
      set16(x, 'i-reply', id);
      return [...body, cardsLine];
    });
  return [
    r('bin', 'In the bin', 'With the coffee grounds.', [p('You put it in the kitchen bin with this morning’s coffee grounds, green ink down, and wash your hands, which is childish, and helps.')]),
    r('pin', 'Pin it to the wardrobe door', 'With the others.', [p('You pin it to the wardrobe door beside the others, in the corner, where it can watch you get dressed. Let her. It is the last time.')]),
    r('file', 'File it with the receipts', 'She wrote enough of them.', [p('You slide it into the client file, behind the last receipt, where it belongs: one more piece of paper from the vendor, filed, in date order.'), t('Received. She taught me that word. I’m keeping it.')]),
  ];
}

function bundleChoices(s: GameState): C16Choice[] {
  if (!get16(s, 'i-reply')) return replyChoices();
  const first = key(s, 'act4.first') as Card | undefined;
  if (!first)
    return cardsHeld(s).map((c) =>
      offer('i16-first-' + c, 'First: ' + cardName[c], cardHint[c], 'bundle', (x) => {
        setKey(x, 'act4.first', c);
        return [p('You put ' + cardName[c] + ' on top of the pile.')];
      }),
    );
  return [
    ...cardsHeld(s)
      .filter((c) => c !== first)
      .map((c) =>
        offer('i16-held-' + c, 'Keep back: ' + cardName[c], c === 'box' && bentonInsists16(s) ? 'For the man who will walk you in.' : 'In your pocket, for the moment she thinks she has won.', 'uniform', (x) => {
          setKey(x, 'act4.held', c);
          return [p('You fold ' + cardName[c] + ' into the inside pocket of your jacket, where you will feel it all evening, against your ribs.')];
        }),
      ),
    offer('i16-held-none', 'Keep nothing back', 'Everything on the table.', 'uniform', (x) => {
      setKey(x, 'act4.held', 'none');
      return [t('Nothing held back. She will be looking for the card in my pocket. There isn’t one. Let her look.')];
    }),
  ];
}

// ── The uniform: armour ──

function uniformBlocks(): Block[] {
  return [p('Four o’clock. Getting dressed as power, not display: finished, fitted, heels you can walk out in.')];
}

function leaveChoices(s: GameState): C16Choice[] {
  const l = (id: 'light' | 'wardrobe' | 'go', label: string, hint: string, body: Block[]) =>
    offer('i16-leave-' + id, label, hint, 'notice', (x) => {
      set16(x, 'i-leave', id);
      return body;
    });
  return [
    ...(key(s, 'act3.home') !== 'lost'
      ? [l('light', 'A word to the green light', 'On your way out. It has watched everything else.', [p('At the door you stop under the little camera in the corner of the hall, and look straight up into it, the way you never have, and say, clearly, for the log:'), q('You', 'Back by nine. Log it.'), p('The light stays green. Somewhere on seventy-one, a duty officer writes it down, and does not know why he is smiling.')])]
      : []),
    l('wardrobe', 'One look at the wardrobe door', 'The first card of this road.', [p('One look at the wardrobe door before you go: VICTORIA SLOANE. HANDLER. AX-7A., and under it, in pencil, the question you pinned there on your first night back. You leave it unanswered. Tomorrow you will know the answer.')]),
    l('go', 'Just go', 'Keys, door, stairs.', [p('Keys, door, stairs. You don’t look back. You have looked at this flat enough for one year.')]),
  ];
}

function uniformChoices(s: GameState): C16Choice[] {
  if (key(s, 'act4.dressed-with') && !get16(s, 'i-leave')) return leaveChoices(s);
  if (!key(s, 'act4.wear')) {
    const w = (id: 'charcoal' | 'black' | 'lanyard', label: string, hint: string, body: Block[]) =>
      offer('i16-wear-' + id, label, hint, 'uniform', (x) => {
        setKey(x, 'act4.wear', id);
        return body;
      });
    return [
      w('charcoal', 'The charcoal suit', key(s, 'c15.i-mon') === 'suit' ? 'The one you dressed in for her archive.' : 'Cut close. Axiom’s colour, worn as yours.', [p(key(s, 'c15.i-mon') === 'suit' ? 'The charcoal suit, the one you dressed in for her archive a week ago, and the silk shirt the colour of a bruise. It worked once. It is going to work again.' : 'The charcoal suit, cut close, the colour of every good coat on seventy-one, worn tonight as if you had invented it.')]),
      w('black', 'Your own black', 'Bought with your own money. Nobody else’s.', [p('Your own black, the one you have had taken in twice, bought with your own money. Nothing on you tonight belongs to anybody else.')]),
      ...(commissioned(s)
        ? [w('lanyard', 'The lanyard, worn outside the coat', 'Like pearls. Axiom’s, round your neck, on purpose.', [p('Black, plain, and over it, outside the coat, where everybody can see it, Axiom’s lanyard and your pass, worn the way other women wear pearls. You were delivered to them with a file number. Tonight you are wearing it.')])]
        : []),
    ];
  }
  const d = (id: 'daniel' | 'maya' | 'sloane' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('i16-dressed-' + id, label, hint, 'uniform', (x) => {
      setKey(x, 'act4.dressed-with', id);
      return body;
    });
  return [
    ...(told(s)
      ? [d('daniel', 'Let Daniel do your cuffs', 'He knows who you are. His hands aren’t quite steady.', [
          p('He comes at half past four and stands in front of you in the hall, well away from the green light’s corner, and does up your cuffs one at a time, with fingers that are not quite steady, and does not let go of the second one when it is done.'),
          q('Daniel', 'Come back and tell me everything. In order. With footnotes.'),
          p('You kiss him once, at the door, because you choose to, and he lets you go first.'),
        ])]
      : []),
    ...(key(s, 'c6.maya') === 'restored' ? [d('maya', 'Let Maya do your hair', 'And a lecture on evidential chains.', [p('Maya at the bathroom mirror with a mouthful of pins, doing your hair the way she did before Adrian’s first hearing, and explaining the chain of custody for every document in the box while she does it, and at the end: “There. Now go and serve her.”')])] : []),
    ...(sloaneAllied(s) ? [d('sloane', 'Sloane, from the doorway', '“Collar.”', [p('Sloane comes up at half past four to walk you down, and stops in the doorway, and looks you over the way she looks over a report before she signs it, top to bottom, once.'), q('Sloane', 'Collar.'), p('You fix it yourself. She nods, once, as if a page had been initialled.')])] : []),
    d('alone', 'Alone', 'Nobody’s hands but yours.', [p('Alone, at the long mirror. The cuffs take you three goes. You get them on the third.')]),
  ];
}

// ── The notice: the way in ──

function noticeBlocks(s: GameState): Block[] {
  return [
    p('A quarter to six. The Embankment in the last of the light, the river the colour of a knife, and the Vesper’s black glass front with no name on it.'),
    ...(bentonInsists16(s)
      ? [p('And at the kerb, as you knew he would be, a dark Axiom saloon with Elias Benton in the back of it, his slate on his knee, holding the door.'), q('Benton', 'Axiom will escort its asset, Ms Vale. Handler of record. It would look very odd if I didn’t.')]
      : []),
  ];
}

function noticeChoices(s: GameState): C16Choice[] {
  const arr = (id: 'client' | 'notice' | 'escort' | 'front' | 'car', label: string, hint: string, body: Block[]) =>
    offer('i16-arrive-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'act4.arrive', id);
      setKey(x, 'act4.benton', bentonInsists16(x) ? (id === 'escort' ? 'escort' : 'refused') : key(x, 'inst.benton-exposed') ? 'gone' : 'absent');
      note(x, 'i-approach', `Evelynn arrived at the Vesper for Meridian’s board with the aim “${key(x, 'act4.aim')}”, notice served, the case ${key(x, 'act4.case')}, first card ${key(x, 'act4.first')}, and ${key(x, 'act4.held') === 'none' ? 'nothing held back' : key(x, 'act4.held') + ' held back'}.`, 'The approach');
      return [...body, q('The doorman', 'They’re expecting you.'), p('And then, for the first time, he adds, very quietly:'), q('The doorman', 'Good luck, Ms Vale.'), ...(key(x, 'act4.notice') ? [p('And, lower still, as he opens the door: “They read it. Twice.”')] : [])];
    });
  return [
    ...(key(s, 'inst.authority') === 'formal' || key(s, 'act4.aim') === 'inside'
      ? [arr('client', 'As the client', 'Axiom’s car. The notice already served.', [p('Axiom’s car at the kerb, a driver who calls you ma’am, and you get out with the notice in your hand: a client of the house, come to discuss a defect, at the building that once had your photograph in a book.')])]
      : []),
    ...(marshIn(s) ? [arr('notice', 'With Marsh’s notice', 'The Markets Authority’s car, which is his bicycle.', [p('Marsh locks his bicycle to the Vesper’s railings, which nobody has ever done, and takes his clips off, and holds the door for you with the notice to produce in his other hand. You arrived by taxi. He arrived by conscience.')])] : []),
    ...(bentonInsists16(s)
      ? [arr('escort', 'Get into Benton’s car', 'Meridian’s man, walking you in. Let him.', [p('You get into the back of Benton’s car and sit beside him, and he talks pleasantly about the traffic for eleven minutes, and you let him, with the thing in your pocket against your ribs. Let Meridian’s man walk Meridian’s product in. Let everybody see who brought you.')])]
      : []),
    arr('front', bentonInsists16(s) ? 'Shut the car door on him' : 'The front door, alone', bentonInsists16(s) ? 'Walk up the steps on your own.' : 'The door simply opens.', [p(bentonInsists16(s) ? 'You close the car door on him, gently, with his hand still out, and walk up the steps on your own, and do not look back to see his face. You don’t need to.' : 'Up the steps on your own, and the door simply opens.')]),
    arr('car', 'In the car she sends', 'As her guest. The one thing she won’t expect you to use.', [p('Celeste’s car at half past five, a driver who does not look at you, and you arrive as her guest, which is exactly what she expects, and the one thing she will not expect you to use.')]),
  ];
}

// ── The long room ──

function completeBlocks(s: GameState): Block[] {
  const aim = key(s, 'act4.aim');
  const inn = inside(s);
  return [
    p('Six o’clock. The long room. The empty frames lit as if they held something. A table down the middle, seven chairs, and at it Meridian’s board: Anton Deverell in the chair, shipping and insurance; Marguerite Soames, who reads everything; three men whose names you have never been told. In front of each of them, squared, your notice.'),
    ...(inn.includes('sloane') ? [p('By the door, in the chair marked AXIOM, CLIENT, Victoria Sloane, in graphite, with her hands folded on a single sheet of paper.')] : []),
    ...(key(s, 'act4.benton') === 'escort' ? [p('And Benton, who walked you in, taking the chair beside the door as if it had always been his, his slate on his knee.')] : []),
    p('At the head of the table, in grey, Celeste Laurent stands up.'),
    q('Celeste Laurent', inn.includes('sloane') ? 'Darling. You came as yourself. So did I. And Victoria. How lovely. It’s a reunion.' : 'Darling. You came as yourself. So did I.'),
    t(aim === 'inside' ? 'A contract. A defect. A return. Let’s begin.' : aim === 'channels' ? 'Everything in writing, filed at nine. First she is going to read it.' : aim === 'walk' ? 'I am going to tell them what I know, and walk out owing nobody. First she is going to watch me do it.' : 'Eleanor Linden. Say it. I am not leaving until you say it.'),
    ...(import.meta.env.VITE_EVE_CHAPTER17 === '1' ? [] : [p('[Chapters 17–18 · institutional road — in development]')]),
  ];
}

export function institutionalBlocks16(s: GameState): Block[] {
  if (s.phase === 'briefing') return briefingBlocks(s);
  if (s.phase === 'objective') return objectiveBlocks(s);
  if (s.phase === 'detail') return detailBlocks();
  if (s.phase === 'bundle') return bundleBlocks();
  if (s.phase === 'uniform') return uniformBlocks();
  if (s.phase === 'notice') return noticeBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices16(s: GameState): C16Choice[] {
  if (s.phase === 'briefing') return briefingChoices(s);
  if (s.phase === 'objective') return objectiveChoices(s);
  if (s.phase === 'detail') return detailChoices(s);
  if (s.phase === 'bundle') return bundleChoices(s);
  if (s.phase === 'uniform') return uniformChoices(s);
  if (s.phase === 'notice') return noticeChoices(s);
  return [];
}
