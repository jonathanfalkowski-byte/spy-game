/** Chapter 10 (Institutional route, lane id `institutional`) · A Very Good Officer:
 * card → club → log → pages → fridays → nightfall → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_10_A_VERY_GOOD_OFFICER_DESIGN.md (owner-approved 2026-09-30, all eight decisions
 * as recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_10_SCRIPT.md. The shared "She Knows" breakfast in
 * Institutional framing. A grey Axiom envelope in a hand like Sloane's (go / show Sloane / don't go, and Celeste comes to
 * the staff gate). The Lindqvist: AX-7A, a scope term quoted exactly, Records with Victoria in the car (Benton told her;
 * never the copy or the note), Daniel; then "Adrian". "Victoria is a very good officer. She'll never survive us. Unless
 * you help me." The order: Sloane's tasking log, every Friday (give / doctor / refuse; the refusal cost is Sloane's
 * budget line, non-sexual; Adrian's name is kept for Ch14). Sloane with the City pages (old / work / report). The week:
 * the Friday photograph; Benton outside the wrong hotel room; or Sloane grey. The Vesper invitation in Sloane's in-tray.
 * The night (Daniel as a colleague, or if he knows the consent flow at his place; Maya; a partner from before; alone).
 * Entered from an Institutional `chapter9.complete`; hands on to the Ch14 interim bridge. Keys under `inst.*` and
 * `c10.i-*`; ids carry `i10-`.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. Dawn on Wednesday, dressing for the woman who
 * designed you (c10.i-dress = ivory | grey | black: the ivory jacket from the photograph, a provocation she notices at
 * once; Axiom's grey, like armour; or black). Page seven reaches Daniel before Sloane (c10.i-daniel = joke | true |
 * nothing: "It's a very good photograph."; the truth, as far as it goes; or nothing). Friday at seven, a white orchid
 * on her mat, "For the operative. C." (c10.i-orchid = security | sill | bin: handed in to Axiom security as a
 * suspicious package, and Sloane laughs out loud for the first time; turned to the street; or the bin). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C10Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get10 = (s: GameState, k: string) => s.choices['c10.' + k];
const set10 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c10.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C10Choice['apply']): C10Choice => ({ id: 'chapter10.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get10(s, 'rec.' + k) !== undefined) return;
  set10(s, 'rec.' + k, String(s.history.length));
  set10(s, 'event.' + k, String(s.revision));
  set10(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c10.' + k);
  s.knowledge.push('c10.' + k);
}

export const INSTITUTIONAL_PHASES10 = ['card', 'club', 'log', 'pages', 'fridays', 'nightfall'] as const;
export const isInstitutional10 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase10 = (s: GameState) => isInstitutional10(s) && ((INSTITUTIONAL_PHASES10 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const gate = (s: GameState) => get10(s, 'i-card') === 'gate';
const answer = (s: GameState) => key(s, 'inst.log10') as 'gave' | 'doctored' | 'refused' | undefined;
const told = (s: GameState) => !!key(s, 'inst.daniel-told');
type Partner = 'julian' | 'sebastian' | 'daniel';
const partners = (s: GameState): Partner[] => [
  ...(told(s) ? (['daniel'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian', daniel: 'Daniel' };

export function placeInstitutional10(s: GameState): string | undefined {
  if (s.phase === 'club' || s.phase === 'log') return gate(s) ? '07:40 · The staff entrance, Axiom Tower' : '07:00 · The Lindqvist';
  const open = get10(s, 'i-night-open');
  if (s.phase === 'nightfall' && open) return open.startsWith('daniel') ? 'Late · Daniel’s flat, above the launderette' : open.startsWith('julian') ? 'Late · Julian’s apartment' : open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · A hotel round the corner from the Harbour';
}

// ── The entry ──

export function beginInstitutional10(): C10Choice {
  return offer('begin-institutional', 'Monday', 'An envelope that isn’t Sloane’s.', 'card');
}

// ── The card ──

function cardBlocks(): Block[] {
  return [
    p('Monday. On your desk at nine, where the grey envelopes always are, a grey envelope: Axiom’s internal post, AX-7A on the front in small upright capitals so like Sloane’s that you have the flap open before you notice the sevens are crossed, and Sloane has never crossed a seven in her life.'),
    p('Inside, on a card the colour of cream, in green ink, in a looping hand you last saw on a list of names:'),
    q('The card', 'Breakfast? Wednesday. The Lindqvist, seven. — C.'),
    t('She is inside Axiom’s post. Of course she is. The vendor always has a key to the shop.'),
  ];
}

function cardChoices(): C10Choice[] {
  const c = (id: 'go' | 'sloane' | 'gate', label: string, hint: string, body: Block[]) =>
    offer('i10-card-' + id, label, hint, 'club', (x) => {
      set10(x, 'i-card', id);
      return body;
    });
  return [
    c('go', 'Go', 'Wednesday. Seven. Wear something she hasn’t seen.', [p('Wednesday, a quarter to seven, you walk down the river to the Lindqvist, the club whose curtains never open, and give a name at the door that is not the one on your badge, and the doorman says, “Madame is expecting you,” before you have finished saying it.')]),
    c('sloane', 'Take it up to seventy-one first', 'Show your handler.', [
      p('You take it up to seventy-one before you have taken your coat off, and put it on Sloane’s desk.'),
      q('Sloane', 'That isn’t my hand. It’s very good. Go, and tell me everything she says, including the things you think don’t matter. Those are the ones she means.'),
      p('On Wednesday you walk down to the Lindqvist with Sloane’s voice in your head, which is almost as good as backup.'),
    ]),
    c('gate', 'Don’t go', 'Let her come to you.', [p('You put the card in the bin under your desk. On Wednesday at twenty to eight your desk phone rings, and it is Terry at the staff gate, sounding like a man who has been smiled at.'), q('Terry', 'A lady for you, madam. She says you’re expecting her. She’s brought pastries.')]),
  ];
}

// ── The club ──

function inventory(s: GameState): Block[] {
  const term = key(s, 'inst.scope.people') ? 'No person the Operative names as close to her shall be made the subject of a tasking' : key(s, 'inst.scope.name') ? 'The personnel file of Adrian Vale shall remain sealed' : key(s, 'inst.scope.refusal') ? 'The Operative may decline any single tasking, in writing, without penalty' : 'Every tasking shall carry named backup, reachable at a number that answers';
  return [
    q('Celeste Laurent', 'AX-7A. They gave you his candidate number. How unkind of them. Axiom was always so bad at kindness.'),
    q('Celeste Laurent', '“' + term + '.” You wrote that yourself, I’m told, in your own words, on Victoria’s good paper. She has a pencil she likes, doesn’t she. I always wondered what she wrote in the margins.'),
    q('Celeste Laurent', 'And you went down to Records one Thursday night, with Victoria outside in the car with the engine running. How romantic. Elias tells me everything, darling. It’s the only thing he’s good for.'),
    ...(['copy', 'note'].includes(key(s, 'inst.file') ?? '') ? [t(key(s, 'inst.file') === 'note' ? 'She doesn’t know about the note. It is in the lining of my coat, twelve inches from her hand, and she doesn’t know.' : 'She doesn’t know about the copy. Forty-one pages on a phone she has never heard of. She doesn’t know.')] : []),
    q('Celeste Laurent', key(s, 'inst.daniel') === 'tie' || told(s) ? 'And the boy with the ties. He looks at you as if he’s trying to remember a word. Be kind to him. Somebody should be.' : 'And the boy with the ties, two desks over. He brings you coffee from that dreadful machine. I think that’s sweet.'),
    p('She butters a piece of toast with great care, and puts the knife down, and looks at you across the silver domes the way she looked at a woman in an ivory jacket once, in a room with better light.'),
    q('Celeste Laurent', 'Eat your eggs, Adrian.'),
  ];
}

function clubBlocks(): Block[] {
  return [
    p('Wednesday, six o’clock. The wardrobe mirror, the cards behind you, and a question that is not about clothes at all: what do you wear to breakfast with the woman who designed you?'),
  ];
}

function dressChoices(): C10Choice[] {
  const d = (id: 'ivory' | 'grey' | 'black', label: string, hint: string, body: Block[]) =>
    offer('i10-dress-' + id, label, hint, 'club', (x) => {
      set10(x, 'i-dress', id);
      return [...body, ...arrivalBlocks(x)];
    });
  return [
    d('ivory', 'An ivory jacket', 'Like the woman in the photograph.', [p('An ivory jacket, bought on Saturday in a shop you had never been into, the nearest thing in London to the one in the photograph on Sloane’s file. You put it on over black and look at yourself for a long time. It is not a costume. It is a question, and you are going to ask it with your shoulders.')]),
    d('grey', 'Axiom grey', 'The work suit. Armour.', [p('The grey suit you wear to Axiom, pressed, with the lanyard in the pocket where she will see its edge. Let her have breakfast with an Axiom operative. Let her see what her product became.')]),
    d('black', 'Black', 'It never tells anybody anything.', [p('Black. It never tells anybody anything, and today that is exactly what you want from it.')]),
  ];
}

function arrivalBlocks(s: GameState): Block[] {
  return [
    ...(gate(s)
      ? [p('Twenty to eight, the staff entrance. Celeste Laurent is standing by Terry’s desk in a camel coat with a white box of pastries from the good bakery, and every analyst coming through the barrier looks at her twice. She kisses the air beside your cheek, and takes your arm, and walks you out onto the pavement as if she owned it, which, you remember, she may.')]
      : [p('The Lindqvist at seven: the long room with the curtains that never open, the silver domes, the coffee poured before you ask. Celeste is at the table in the window that has no window, in cream, and she stands when you come in, and holds you at arm’s length, and looks.')]),
    q('Celeste Laurent', 'There you are. Back at Axiom. At his desk. You must tell me what it’s like.'),
    ...(get10(s, 'i-dress') === 'ivory'
      ? [p('Her eyes go to the jacket, and stay there, and for one second the whole of her face stops, the way a clock stops, and then starts again.'), q('Celeste Laurent', 'Ivory. How cruel of you. She wore it better. No, that isn’t true. She wore it first.')]
      : get10(s, 'i-dress') === 'grey'
        ? [q('Celeste Laurent', 'Axiom grey. They do love to dress you all alike, don’t they. It suits you. I’d hoped it wouldn’t.')]
        : []),
    ...inventory(s),
  ];
}

function clubChoices(s: GameState): C10Choice[] {
  if (!get10(s, 'i-dress')) return dressChoices();
  const a = (id: 'composed' | 'ask' | 'walk', label: string, hint: string, body: Block[]) =>
    offer('i10-adrian-' + id, label, hint, 'log', (x) => {
      set10(x, 'i-adrian', id);
      return body;
    });
  return [
    a('composed', 'Eat your eggs', 'Give her nothing. Not even a flinch.', [p('You eat your eggs. You do not flinch. She watches you not flinch with open pleasure, like a woman watching a horse she bred clear a fence.')]),
    a('ask', '“What do you want?”', 'Straight to it.', [q('You', 'What do you want, Celeste?'), q('Celeste Laurent', 'So direct. He was like that. I want to talk about Victoria.')]),
    a('walk', 'Stand up to leave', 'Make her say it to your back.', [p('You put your napkin on the table and stand. She doesn’t try to stop you. She says the next thing to your back, pleasantly, as if you were still sitting down, and it stops you at the door anyway.')]),
  ];
}

// ── The log ──

function logBlocks(s: GameState): Block[] {
  const b = key(s, 'inst.task.benton');
  return [
    q('Celeste Laurent', 'Victoria is a very good officer. She has always been very good. She’ll never survive us, of course. Nobody that good ever does. Unless you help me.'),
    q('Celeste Laurent', 'Her tasking log. Every Friday, the week ahead: who she sends where, and with whom. Photograph it and send it to me. You sit closer to it than anyone.'),
    ...(b === 'book'
      ? [q('Celeste Laurent', 'Elias brought me a log, you know. It was very pretty, and wrong in eleven places. Victoria’s work, I think. I’d like the real one.')]
      : b === 'shade'
        ? [q('Celeste Laurent', 'Elias brought me a log, you know. It was wrong in three places, and those three very well chosen. Yours, I think. I did enjoy it. I’d like the real one now.')]
        : b === 'refuse'
          ? [q('Celeste Laurent', 'Elias asked you once, and you said no. He was quite hurt. I’m asking more nicely.')]
          : []),
    p('She slides a phone across the tablecloth: black, cheap, with one contact in it, C.'),
    q('Celeste Laurent', 'It isn’t much. It’s only paper. And it would save her such a lot of trouble.'),
  ];
}

function logChoices(): C10Choice[] {
  const l = (id: 'gave' | 'doctored' | 'refused', label: string, hint: string, celeste: string, body: Block[]) =>
    offer('i10-log-' + ({ gave: 'give', doctored: 'doctor', refused: 'refuse' } as const)[id], label, hint, 'pages', (x) => {
      setKey(x, 'inst.log10', id);
      setKey(x, 'inst.celeste10', celeste);
      note(x, 'i-order', 'Celeste Laurent asked Evelynn for Victoria Sloane’s tasking log, weekly, on a black phone with one contact, C.', 'The Lindqvist, Wednesday breakfast');
      return body;
    });
  return [
    l('gave', 'Take the phone', 'Every Friday. The real log.', 'trusted', [p('You put the phone in your bag. It weighs almost nothing.'), q('Celeste Laurent', 'Thank you, darling. You’ve no idea how much trouble this will save her.'), t('It is the easiest thing I have ever agreed to, and I hate how easy.')]),
    l('doctored', 'Take the phone, and plan the lie', 'A true-looking week with one false tasking in it.', 'fooled', [p('You put the phone in your bag, and smile, and already know which Friday entry you will change, and where it will send whoever reads it.'), t('One lie. One. In a true week. That is how Adrian was taught to write a cover story, and it is the first time the training has been any fun.')]),
    l('refused', 'Leave the phone on the tablecloth', '“Her log is hers.”', 'refused', [q('You', 'Her log is hers.'), q('Celeste Laurent', 'Of course, darling.'), p('She puts the phone back in her bag without the slightest sign of disappointment, which frightens you more than anything else she has said.')]),
  ];
}

// ── The pages ──

function pagesBlocks(s: GameState): Block[] {
  return [
    p('By noon it is in the City pages, page seven, a photograph taken from somewhere you did not see: the two of you laughing over silver domes, her hand on your wrist. CELESTE LAURENT AT BREAKFAST WITH AXIOM’S NEW ANALYST.'),
    p('At ten past twelve Daniel rolls his chair the two desks over with the paper folded to page seven, and holds it up beside your face, and looks from one to the other.'),
    q('Daniel', told(s) ? 'Adrian Vale had breakfast with Celeste Laurent. I’m going to need a minute. Actually, I’m going to need a drink.' : 'Is this you? This is you. You had breakfast with Celeste Laurent. People like us don’t have breakfast with Celeste Laurent. People like us have the coffee machine.'),
  ];
}

function danielChoices(s: GameState): C10Choice[] {
  const d = (id: 'joke' | 'true' | 'nothing', label: string, hint: string, body: Block[]) =>
    offer('i10-daniel-' + id, label, hint, 'pages', (x) => {
      set10(x, 'i-daniel', id);
      return [...body, ...sloaneBlocks(x)];
    });
  return [
    d('joke', '“It’s a very good photograph.”', 'Make him laugh. Buy a minute.', [q('You', 'It’s a very good photograph. Look at my hair.'), p('He laughs, the startled real laugh, and rolls back to his desk, and looks at page seven again when he thinks you aren’t watching, and then at you, and then at page seven.')]),
    d('true', 'The truth, as far as it goes', '“She knew me before.”', [q('You', 'She knew me before. Before Axiom. It wasn’t a nice breakfast, Daniel.'), p(told(s) ? 'He looks at you for a long moment with the face he has started wearing since the Feathers, the one that knows exactly who is under yours.' : 'He stops smiling at once, and puts the paper face down on your desk, and says, “Then I’m sorry I waved it about,” and means it.'), ...(told(s) ? [q('Daniel', 'Then I don’t like her. Whoever she is. Just so you know whose side the coffee machine is on.')] : [])]),
    d('nothing', 'Say nothing', 'Let him look.', [p('You say nothing at all, and go on typing, and after a moment he folds the paper away and rolls back to his desk, and the floor goes on pretending not to have seen page seven.')]),
  ];
}

function sloaneBlocks(s: GameState): Block[] {
  return [
    p('At half past twelve Sloane is at your desk with the paper folded to page seven, which she puts down on your keyboard, the way she puts down everything, squared to the edge.'),
    q('Sloane', 'You didn’t tell me you knew Celeste Laurent.'),
    ...(get10(s, 'i-card') === 'sloane' ? [q('Sloane', 'You told me she asked you to breakfast. You didn’t tell me she’d put you on page seven.')] : []),
  ];
}

function pagesChoices(s: GameState): C10Choice[] {
  if (!get10(s, 'i-daniel')) return danielChoices(s);
  const a = answer(s);
  const pg = (id: 'old' | 'work' | 'report', label: string, hint: string, body: Block[]) =>
    offer('i10-pages-' + id, label, hint, 'fridays', (x) => {
      setKey(x, 'inst.pages10', id);
      if (id === 'report') setKey(x, 'inst.told10');
      return body;
    });
  return [
    pg('old', '“She knew me before.”', 'True, and not all of it.', [q('You', 'She knew me before. Before all this.'), p('Sloane looks at the photograph, and at you, and something in her face does the arithmetic and does not like the answer.'), q('Sloane', 'Then she knows what you are. Be very careful, Ms Vale. She’s the only person in London who’s read your file before I did.')]),
    pg('work', '“She wanted to meet Axiom’s new operative.”', 'Everyone does.', [q('You', 'She wanted to meet Axiom’s new operative. Apparently everyone does.'), p('Sloane does not laugh. She picks the paper up, and folds it once more, and takes it away with her.'), t('She doesn’t believe me. She is going to act as if she does. That is what handlers are for, and it is worse.')]),
    pg('report', 'Tell her about the order', 'Your handler. This is what she’s for.', [
      q('You', 'She asked me for your tasking log. Every Friday.'),
      ...(a === 'gave'
        ? [q('Sloane', 'And you said yes.'), q('You', 'I said yes.'), p('A long silence.'), q('Sloane', 'Then give it to her. The real one. I’d rather she had the truth from you than a lie from Elias. And thank you for telling me after. It’s more than most people manage.')]
        : a === 'doctored'
          ? [q('Sloane', 'Which version are you giving her?'), q('You', 'Mine. One lie a week.'), p('The corner of her mouth moves.'), q('Sloane', 'Good. Let me choose the lie on Fridays. I know where it will hurt.')]
          : [q('Sloane', 'And you said no.'), q('You', 'I said no.'), q('Sloane', 'Then she’ll make me pay for it, not you. Thank you. I mean that. I’d rather pay than be sold.')]),
    ]),
  ];
}

// ── The week ──

function fridaysBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(a === 'gave'
      ? [p('Friday, six o’clock. Sloane’s log for the week ahead lies open on her side table on seventy-one while she is at a meeting, and you photograph two pages and send them to C., and the phone makes a small satisfied sound, and nothing else happens at all. That is the worst part.')]
      : a === 'doctored'
        ? [
            p('Friday, six o’clock. You send C. the week ahead: true in every line but one. Tuesday, noon, a debrief at a hotel near the station, room 412, the room you sat in once across from a man with a child’s drawing in his wallet.'),
            p('On Tuesday at noon, from the café across the road, you watch Elias Benton walk into the hotel near the station with his little slate under his arm, and come out again forty minutes later, alone, looking at his watch.'),
            t('Meridian’s man, standing in a corridor outside room 412 for a debrief that doesn’t exist. I have never enjoyed a Tuesday more.'),
          ]
        : [
            p('On Monday a client of Executive Intelligence, a shipping insurer that has paid Axiom’s fees for nine years, writes to the board with sudden concerns about the directorate’s methods, and by Wednesday Sloane’s budget line has been cut by a third.'),
            p('You watch her all week through the glass on seventy-one: grey, upright, working later every night, never once saying why. She doesn’t know why. You do.'),
            q('C. · message', 'That was a small one. Friday?'),
          ]),
    p('And on Friday, in Sloane’s in-tray, a card on cream, in green ink, addressed to Axiom as a client of long standing:'),
    q('The card', 'The Vesper. The first Thursday. — and do bring your operative. C.L.'),
    q('Sloane', 'Axiom has never been asked before. Apparently we are now. I wonder why.'),
    p('At seven, when you get home, there is a white orchid on your mat in a black pot, three flowers open and one closed, and a card in the looping green hand:'),
    q('The card', 'For the operative. C.'),
    t('Past a monitored door. In a building Axiom watches. She wanted me to know she could.'),
  ];
}

function fridaysChoices(): C10Choice[] {
  const o = (id: 'security' | 'sill' | 'bin', label: string, hint: string, body: Block[]) =>
    offer('i10-orchid-' + id, label, hint, 'nightfall', (x) => {
      set10(x, 'i-orchid', id);
      return body;
    });
  return [
    o('security', 'Hand it in to Axiom security', 'As a suspicious package. Through the proper channel.', [
      p('You carry it back to Axiom Tower, pot and all, and hand it in at the security desk on the ground floor as a suspicious package, and fill in the form, in triplicate, with the time of delivery and the text of the card.'),
      p('Security x-rays it. It is an orchid. On Monday a copy of the form comes up to seventy-one with the incident log, and for the first time in your acquaintance you hear Victoria Sloane laugh out loud, once, behind a closed door.'),
      q('Sloane', 'Suspicious package. One orchid, white. Logged. That’s the best thing anybody has done in this building all year.'),
    ]),
    o('sill', 'Put it on the sill, turned to the street', 'Let it look at somebody else.', [p('You put it on the windowsill with its flowers turned to face the street, so that whatever she meant by it can look at somebody else, and whoever is watching the building can see that you received it and were not impressed.')]),
    o('bin', 'Put it in the bin', 'Pot and all.', [p('You put it in the kitchen bin, pot and all, and the flowers go on looking up at you, very white, until you put the lid on.')]),
  ];
}

// ── Nightfall ──

function nightfallChoices(s: GameState): C10Choice[] {
  const open = get10(s, 'i-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i10-night-' + id, label, hint, 'complete', (x) => {
      set10(x, 'i-night', id);
      return body;
    });
  if (open && !open.endsWith('-room') && open !== 'maya') {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('i10-' + pt + '-' + id, label, hint, 'nightfall', (x) => {
        set10(x, 'i-night-open', pt + '-room');
        set10(x, 'i-night-scope', id);
        note(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s tonight. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('i10-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c10.i-night-open'];
        set10(x, 'i-night-outcome', 'declined');
        return [p('You say goodnight at his door and mean it, and he lets you go without a question.')];
      }),
    ];
  }
  if (open && open.endsWith('-room')) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get10(s, 'i-night-scope') as 'no-sex' | 'sex';
    return [
      offer('i10-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c10.i-night-open'];
        set10(x, 'i-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead.')];
      }),
      offer('i10-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c10.i-night-open'];
        set10(x, 'i-night-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p(pt === 'daniel' ? 'He kisses you as if he has been rehearsing it on the tram for weeks, and says your name, the real one, and asks once more. You answer by pulling him down with you.' : 'He kisses you, and then not only that. He asks once more, low, at your shoulder, and you answer by pulling him down with you.'), p('What happens next is yours and his, and nobody’s log. The scene fades.')]
          : [p('He kisses you by the window and stops exactly where you said, and holds you there, and in your bag on the chair the black phone buzzes once, and neither of you looks at it.')];
      }),
    ];
  }
  return [
    ...(told(s)
      ? []
      : [done('daniel', 'The Feathers, with Daniel', 'As colleagues. He saw page seven.', [p('The Feathers. Daniel has page seven folded in his jacket pocket and does not mention it for an hour, and then does.'), q('Daniel', 'You looked happy. In the picture. You never look happy at your desk.'), q('You', 'I wasn’t.'), p('He looks at you for a long moment, and nods, as if you had told him something true, which you had.')])]),
    ...partners(s).map((pt) =>
      offer('i10-night-' + pt, pt === 'daniel' ? 'Daniel' : pt === 'julian' ? 'Julian' : 'Sebastian', pt === 'daniel' ? 'He knows exactly who you are.' : 'His place.', 'nightfall', (x) => {
        set10(x, 'i-night', pt);
        set10(x, 'i-night-open', pt);
        return pt === 'daniel'
          ? [p('Daniel’s flat above the launderette, which smells of clean washing and toast.'), q('Daniel', 'I saw page seven. I don’t care who she is. I care that you looked like you wanted to be anywhere else. Tell me what you want tonight.')]
          : [q(partnerName[pt], 'I saw the papers. Come in. Tell me what you want tonight, and that’s what happens.')];
      }),
    ),
    ...(key(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Maya', 'She’ll clock the black phone in seconds.', [p('Maya’s kitchen, a bottle, the cat on the tax return. The black phone is in your bag for four seconds before she sees it.'), q('Maya', 'That’s not your phone. Whose leash is that?')])]
      : []),
    done('alone', 'Alone', 'The black phone, face down.', [p('You sit at the kitchen table with the black phone face down in front of you, under the green light in the hall, and neither of them says anything for a long time.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(get10(s, 'i-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The black phone has three messages on it. You read them in the morning.')] : []),
    p('The wardrobe door. A new card, beside MERIDIAN, in capitals:'),
    q('The card', 'CELESTE LAURENT. ' + (a === 'gave' ? 'GIVEN.' : a === 'doctored' ? 'DOCTORED.' : 'REFUSED.')),
    ...(key(s, 'inst.told10') ? [p('And under it, in pencil: SLOANE KNOWS.')] : []),
    p('And the invitation, pinned beside it: THE VESPER. THE FIRST THURSDAY. BRING YOUR OPERATIVE.'),
    t('Victoria is a very good officer, she said. She’ll never survive us. I am beginning to think she meant me as well.'),
  ];
}

export function institutionalBlocks10(s: GameState): Block[] {
  if (s.phase === 'card') return cardBlocks();
  if (s.phase === 'club') return clubBlocks();
  if (s.phase === 'log') return logBlocks(s);
  if (s.phase === 'pages') return pagesBlocks(s);
  if (s.phase === 'fridays') return fridaysBlocks(s);
  if (s.phase === 'nightfall') return [p('Friday night.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices10(s: GameState): C10Choice[] {
  if (s.phase === 'card') return cardChoices();
  if (s.phase === 'club') return clubChoices(s);
  if (s.phase === 'log') return logChoices();
  if (s.phase === 'pages') return pagesChoices(s);
  if (s.phase === 'fridays') return fridaysChoices();
  if (s.phase === 'nightfall') return nightfallChoices(s);
  return [];
}
