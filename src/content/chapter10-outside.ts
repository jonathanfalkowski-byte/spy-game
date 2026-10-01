/** Chapter 10 (Outside route, lane id `outside`) · Bring Me Their Name:
 * slip → cafe → source → press → weeks → hours → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_10_BRING_ME_THEIR_NAME_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_10_SCRIPT.md. The shared "She Knows" breakfast in Outside framing.
 * Celeste reaches the room that was supposed to be nobody's: a black Vesper box on the third step of the iron stair, where
 * the key once was (go / ring the sender first / don't go, and she comes to the foot of the stair with pastries). The
 * Lindqvist: she knows Evelynn left Axiom with a holdall, the chandler's by the dead ferry, the envelope of cash, one of her
 * rules quoted exactly; she does not know his name; then "Adrian." "Somebody has been sending you pages, darling. Bring me
 * their name." The order: his name, or failing that a place and an hour, on the black phone. Give / doctor / refuse (the
 * refusal cost falls on the source, never on her body: the 02:40 phone goes silent for a week). The City pages, and the sender
 * ringing at an hour he never rings (old / work / report: telling the source is this road's honest answer). The week: the
 * empty terminal, Meridian's man on the wrong pier, or a week of silence. The Vesper invitation, "do bring your source". A
 * chosen night (a partner from before with the consent flow; Maya; alone). The card, CELESTE LAURENT, and the answer. Adrian's
 * name is kept for Ch14; Nell is not named. Keys under `out.*` and `c10.o-*`; ids carry `o10-`. */
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
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES10 = ['slip', 'cafe', 'source', 'press', 'weeks', 'hours'] as const;
export const isOutside10 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase10 = (s: GameState) => isOutside10(s) && ((OUTSIDE_PHASES10 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const door = (s: GameState) => get10(s, 'o-card') === 'door';
const answer = (s: GameState) => key(s, 'out.give10') as 'gave' | 'doctored' | 'refused' | undefined;
const rule = (s: GameState, id: string) => (key(s, 'out.rules') ?? '').split(',').includes(id);
type Partner = 'julian' | 'sebastian';
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };

export function placeOutside10(s: GameState): string | undefined {
  if (s.phase === 'cafe' || s.phase === 'source') return door(s) ? 'Early · The foot of the iron stair' : '07:00 · The Lindqvist';
  const open = get10(s, 'o-night-open');
  if (s.phase === 'hours' && open) return open.startsWith('julian') ? 'Late · Julian’s apartment' : open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · A hotel round the corner from the Harbour';
}

// ── The entry ──

export function beginOutside10(): C10Choice {
  return offer('begin-outside', 'The third step', 'A box where the key used to be.', 'slip');
}

// ── The slip ──

function slipBlocks(): Block[] {
  return [
    p('Monday, and the room over the water has been yours for long enough that you have stopped listening for the stair. This morning you listen for it anyway, because on the third step down, where the key once waited in an envelope, there is a box.'),
    p('Black, glossy, the size of a hatbox, a Vesper orchid box with a single white orchid in it, three flowers open and one closed, and under the pot a card on cream, in green ink, in a looping hand you last saw on a list of names:'),
    q('The card', 'Breakfast? Wednesday. The Lindqvist, seven. — C.'),
    t('She has found the room. A room I took on a dead payphone’s word, three months in cash, nothing on paper, nobody knowing. Eleven weeks, and she has found it. The vendor always has a key to the shop.'),
  ];
}

function slipChoices(): C10Choice[] {
  const c = (id: 'go' | 'sender' | 'door', label: string, hint: string, body: Block[]) =>
    offer('o10-slip-' + id, label, hint, 'cafe', (x) => {
      set10(x, 'o-card', id);
      setKey(x, 'out.card10', id);
      return body;
    });
  return [
    c('go', 'Go', 'Wednesday. Seven. Wear something she hasn’t seen.', [p('Wednesday, a quarter to seven, you cross the river and walk to the Lindqvist, the club whose curtains never open, and give a name at the door that is not any of the names you have, and the doorman says, “Madame is expecting you,” before you have finished saying it.')]),
    c('sender', 'Ring the 02:40 phone first', 'He never picks up before the hour. Try.', [
      p('You ring the cheap phone’s one contact at twenty past nine in the morning. It answers on the first ring, which in eleven weeks it has never done.'),
      q(SENDER, 'That isn’t mine. It’s her hand; I’ve seen it on a list. She’s found the room. That’s what a year of cash and a shut shop buys: a week, if you’re lucky. Go.'),
      q(SENDER, 'Don’t tell me what she says. Tell me what she doesn’t. It’s always the second list that matters.'),
      p('On Wednesday you cross the river with his voice in your head, which is not backup, and is a great deal better than none.'),
    ]),
    c('door', 'Don’t go', 'Let her come to you.', [
      p('You put the card in the stove. On Wednesday at twenty to eight the landlord’s knock comes at the foot of the iron stair, and then the landlord, looking like a man who has been smiled at.'),
      q('The landlord', 'A lady’s here for you, miss. She says you’re expecting her. She’s brought pastries, from the good bakery.'),
      p('At the bottom of the stair, in a camel coat that has never in its life stood on this pavement, with a white box in her hands, Celeste Laurent looks up at the shut shop and the whited-out windows and the iron steps, and smiles, delighted, like somebody who has found a toy she buried.'),
    ]),
  ];
}

// ── The cafe: the Lindqvist ──

function inventory(s: GameState): Block[] {
  const ruleLine = rule(s, 'source')
    ? ['“I never give up who you are. To anyone. For anything.” Oh, darling. You wrote that down? They always do. It never holds.', 'The rule is in her mouth, word for word. I told it to one man on a telephone. Either he has told her, or she has a way into my room I can’t imagine, and neither of those is better.']
    : rule(s, 'verify')
      ? ['“I act on nothing I have not checked myself.” How very Adrian. He was a great one for the footnotes.', 'Word for word. I wrote it at the table, alone, in a room she should not be able to see into.']
      : rule(s, 'people')
        ? ['“I trade facts. Never a person.” What a lovely thing to believe. Everyone starts with it.', 'Word for word. I told it to one man on a telephone.']
        : rule(s, 'provenance')
          ? ['“Every page with where you got it, or I don’t take it.” Provenance. He always did love a chain of custody.', 'Word for word. I told it to one man on a telephone.']
          : ['“I can stop this, any time, and keep everything you have already sent.” How brave. I do hope you can.', 'Word for word. I told it to one man on a telephone.'];
  return [
    q('Celeste Laurent', 'Out of Axiom with a holdall. Victoria must be frantic. She hates a loose end, and you were her only one.'),
    q('Celeste Laurent', 'And a chandler’s, on the black side of the river, with a view of a ferry that can’t leave. How romantic, darling. Everything about you has become a view of something that can’t leave.'),
    q('Celeste Laurent', 'An envelope of cash on the table, three months paid, by a man nobody has ever seen. You’ve been kept. By somebody invisible. I’ve never known you to take that from anyone.'),
    q('Celeste Laurent', ruleLine[0]),
    t(ruleLine[1]),
    t('She has the room, the cash, the rule. She does not have his name. If she had, she would have said it by now. She is not a woman who holds a good card.'),
    p('She butters a piece of toast with great care, and puts the knife down, and looks at you across the silver domes the way she looked at a woman in an ivory jacket once, in a room with better light.'),
    q('Celeste Laurent', 'Eat your eggs, Adrian.'),
  ];
}

function cafeBlocks(): Block[] {
  return [p('Wednesday, six o’clock, in a room with a view of the dead ferry terminal and a mirror you have not used since you moved in. A question that is not about clothes at all: what do you wear to breakfast with the woman who designed you?')];
}

function dressChoices(): C10Choice[] {
  const d = (id: 'cash' | 'own' | 'black', label: string, hint: string, body: Block[]) =>
    offer('o10-dress-' + id, label, hint, 'cafe', (x) => {
      set10(x, 'o-dress', id);
      return [...body, ...arrivalBlocks(x)];
    });
  return [
    d('cash', 'Something bought with his envelope', 'EXPENSES, spent on a coat.', [p('A coat from the shop on the corner of Bond Street, bought on Tuesday out of the envelope marked EXPENSES, in cash, dark green. You are wearing a stranger’s money to breakfast with the woman who sold you, and you know it, and you decided that if she was going to notice it she may as well notice it done well.')]),
    d('own', 'What you came out of Axiom in', 'The holdall’s coat. Honest and creased.', [p('The coat from the holdall, the one you left Axiom in, pressed on the edge of the table with a kettle, because you have run out of irons and ideas. It is honest, and a little creased, and it has never once been anywhere she designed.')]),
    d('black', 'Black', 'It never tells anybody anything.', [p('Black. It never tells anybody anything, and today that is exactly what you want from it.')]),
  ];
}

function arrivalBlocks(s: GameState): Block[] {
  return [
    ...(door(s)
      ? [p('Twenty to eight, and you go down the iron stair to meet her on your own pavement. She kisses the air beside your cheek, and takes your arm, and walks you to a black car idling at the corner of the street, as if she had called on you every Wednesday of your life, and the landlord stands in the shop doorway with his mouth a little open.')]
      : [p('The Lindqvist at seven: the long room with the curtains that never open, the silver domes, the coffee poured before you ask. Celeste is at the table in the window that has no window, in cream, and she stands when you come in, and holds you at arm’s length, and looks.')]),
    q('Celeste Laurent', 'There you are. Off the books, and out of the building. You must tell me what it’s like.'),
    ...(get10(s, 'o-dress') === 'cash'
      ? [q('Celeste Laurent', 'Green. Bond Street. Bought with somebody else’s money, and worn well. I always said you had a sense of occasion.')]
      : get10(s, 'o-dress') === 'own'
        ? [q('Celeste Laurent', 'You’ve ironed it with a kettle. Oh, darling. How honest. How very Axiom, the honest ones, right up until they aren’t.')]
        : []),
    ...inventory(s),
  ];
}

function cafeChoices(s: GameState): C10Choice[] {
  if (!get10(s, 'o-dress')) return dressChoices();
  const a = (id: 'composed' | 'ask' | 'walk', label: string, hint: string, body: Block[]) =>
    offer('o10-adrian-' + id, label, hint, 'source', (x) => {
      set10(x, 'o-adrian', id);
      return body;
    });
  return [
    a('composed', 'Eat your eggs', 'Give her nothing. Not even a flinch.', [p('You eat your eggs. You do not flinch. She watches you not flinch with open pleasure, like a woman watching a horse she bred clear a fence.')]),
    a('ask', '“What do you want?”', 'Straight to it.', [q('You', 'What do you want, Celeste?'), q('Celeste Laurent', 'So direct. He was like that. I want to talk about your friend.')]),
    a('walk', 'Stand up to leave', 'Make her say it to your back.', [p('You put your napkin on the table and stand. She doesn’t try to stop you. She says the next thing to your back, pleasantly, as if you were still sitting down, and it stops you at the door.')]),
  ];
}

// ── The source: the order ──

function sourceBlocks(): Block[] {
  return [
    q('Celeste Laurent', 'Somebody has been sending you pages, darling. Real ones; I should know, I’ve read the originals. Somebody who knows a great deal about a night in Singapore, and a courier’s log, and a little handwriting in a margin. I’d like to meet him.'),
    q('Celeste Laurent', 'Bring me his name. Failing that, a place and an hour, on this, on Fridays. I shan’t ask how. I never ask how.'),
    p('She slides a phone across the tablecloth: black, cheap, with one contact in it, C.'),
    q('Celeste Laurent', 'He’s a lonely man, whoever he is. Lonely men are so easily hurt by the people they’ve decided to trust. I should hate for that to happen to him.'),
    t('She doesn’t know who he is. She knows what he is: somebody who has been paying for me for a year. And she wants the one thing I wrote down that I would never give.'),
  ];
}

function sourceChoices(s: GameState): C10Choice[] {
  const l = (id: 'gave' | 'doctored' | 'refused', label: string, hint: string, celeste: string, body: Block[]) =>
    offer('o10-order-' + ({ gave: 'give', doctored: 'doctor', refused: 'refuse' } as const)[id], label, hint, 'press', (x) => {
      setKey(x, 'out.give10', id);
      setKey(x, 'out.celeste10', celeste);
      note(x, 'o-order', 'Celeste Laurent asked Evelynn for the sender’s name, or failing that a place and an hour, weekly, on a black phone with one contact, C.', 'The Lindqvist, Wednesday breakfast');
      return body;
    });
  return [
    l('gave', 'Take the phone, and give her the hour', '02:40. The old ferry terminal. He’ll be there.', 'trusted', [
      p('You put the phone in your bag. It weighs almost nothing. You tell her the place and the hour, in a voice you do not recognise: 02:40, the old ferry terminal, the tide out, a man in a courier’s jacket on the far side of the barrier.'),
      q('Celeste Laurent', 'Thank you, darling. You’ve no idea how much trouble this will save him.'),
      ...(rule(s, 'source') ? [t('I wrote a rule that I would never give him up. I have given him up. Both of those are now on the wall, and I will have to live in the space between them, in pencil, honest.')] : [t('A place and an hour. It was not his name. I tell myself that. It is exactly what she asked for, and I gave it to her over eggs.')]),
    ]),
    l('doctored', 'Take the phone, and plan the lie', 'A place and an hour that are wrong.', 'fooled', [
      p('You put the phone in your bag, and smile, and already know where you will send her: Pier Nine, a rotting jetty three miles downriver where no ferry has landed since the war, at ten past three, an hour after he has gone home.'),
      q('Celeste Laurent', 'Thank you, darling. I knew you’d see sense.'),
      t('She will send somebody. And whoever she sends will stand in the rain on a dead pier at the wrong hour. I find I am looking forward to Friday more than I have looked forward to anything since the Glass House.'),
    ]),
    l('refused', 'Leave the phone on the tablecloth', '“I don’t give people.”', 'refused', [
      q('You', 'I don’t give people. I trade facts. It’s in the rules.'),
      q('Celeste Laurent', 'Of course, darling.'),
      p('She puts the phone back in her bag without the slightest sign of disappointment, and signals for the bill, and that is the whole of it. You do not think, walking out into the grey morning, that it is the whole of it.'),
    ]),
  ];
}

// ── The press ──

function pressBlocks(s: GameState): Block[] {
  return [
    p('By noon it is in the City pages, page seven, a photograph taken from somewhere you did not see: the two of you laughing over silver domes, her hand on your wrist. CELESTE LAURENT AT BREAKFAST WITH A WOMAN NOBODY CAN PLACE.'),
    p('You have nobody to hold the paper beside your face, which is the point of a room with no address, and the whole of the loneliness. At ten past twelve the cheap phone in your pocket rings. It has never rung at noon. It has never rung at any hour but one.'),
    q(SENDER, 'I saw the paper.'),
    ...(answer(s) === 'refused' ? [p('The voice is the same, flat and shaved, and under it something else, as if it had been up all night with the phone in its hand.')] : []),
  ];
}

function pressChoices(s: GameState): C10Choice[] {
  const a = answer(s);
  const pg = (id: 'old' | 'work' | 'report', label: string, hint: string, body: Block[]) =>
    offer('o10-press-' + id, label, hint, 'weeks', (x) => {
      setKey(x, 'out.pages10', id);
      if (id === 'report') setKey(x, 'out.told10');
      return body;
    });
  return [
    pg('old', '“She knew the woman I’m wearing.”', 'True, and not all of it.', [q('You', 'She knew the woman I’m wearing. Before all this.'), p('A silence on the line, long enough that you can hear him decide not to say the thing he almost says.'), q(SENDER, 'She did. Be careful what you let her know you’ve guessed.')]),
    pg('work', '“A business breakfast.”', 'Everyone wants to meet the new one.', [q('You', 'A business breakfast. Everyone wants to meet the new one. I gave her nothing.'), p('The line is quiet for a moment, and then he says “All right,” in the tone of a man who is not going to ask a second time, and has a good idea whether he should.')]),
    pg('report', 'Tell him what she asked', 'Your source. This is what the rules are for.', [
      q('You', 'She asked me for your name. Failing that, a place and an hour.'),
      ...(a === 'gave'
        ? [q(SENDER, 'And you gave her the place.'), q('You', 'I gave her the place. And the hour.'), p('A long silence.'), q(SENDER, 'Then I’m already somewhere else. I move the night I hear a thing like that; I moved the night before you told me. Thank you for telling me after. It would have been easier not to.')]
        : a === 'doctored'
          ? [q(SENDER, 'Which place did you give her?'), q('You', 'Pier Nine. Ten past three.'), p('You can hear him almost smile, and then not.'), q(SENDER, 'Nobody’s landed at Pier Nine since the war. Good. Let me watch it on Friday. I know exactly the doorway.')]
          : [q(SENDER, 'And you said no.'), q('You', 'I said no.'), q(SENDER, 'Then she’ll go round you. She’ll make it cost me, not you. Thank you. I mean that. Nobody has ever not given me up before.')]),
    ]),
  ];
}

// ── The weeks ──

function weeksBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(a === 'gave'
      ? [
          p('Friday, six o’clock. You send C. the place and the hour again, as agreed, and the phone makes a small satisfied sound. On Saturday morning a photograph arrives on the black phone: the old ferry terminal at 02:40 under its dead sodium lamp, the barrier, the mud shining. Nobody there.'),
          q('C. · message', 'He wasn’t there. Careless of him.'),
          t('He wasn’t there because he told me he’d moved, and I could not have said, an hour earlier, whether I was glad or sick that he had.'),
        ]
      : a === 'doctored'
        ? [
            p('Friday, six o’clock. You send C. the same lie: Pier Nine, ten past three. And at ten past three, from the iron stair outside the room over the water, with the landlord’s binoculars and a flask, you watch a thin man in a long coat walk out onto a pier three miles downriver that has not borne weight since 1944.'),
            p('He stands there for three hours in the rain, holding his flask, and at six in the morning he tips out the last of the tea over the rail and goes home.'),
            t('Meridian’s man, on the wrong pier, in the wrong hour, in the right weather. I have never enjoyed a Friday more.'),
            q('C. · message', 'He was shy. Next Friday?'),
          ]
        : [
            p('The cheap phone does not ring at 02:40 on Thursday. Or on Friday. Or on Saturday, when you sit up with the lamp low and the phone face up on the table and your hand flat beside it, and it is simply a piece of plastic.'),
            p('On Sunday the landlord says, apropos of nothing, that two men from a shipping line were asking at the shop whether anybody had been paying rent in cash. He told them it was a woman, alone. He doesn’t say what else he told them, and you don’t ask.'),
            t('He has gone to ground. Meridian leaned on his line, and he went where they cannot lean, and I am what is left standing in the room. I did that, by saying no. It was the right word. I have never hated a right word so much.'),
            q('C. · message', 'That was a small one. Friday?'),
          ]),
    p('And on the Sunday night, on the cheap phone, a number it should never have been sent to, a text:'),
    q('The text', 'The Vesper. The first Thursday. — and do bring your source. I should so like to meet him. C.L.'),
    t('She has this number. Whoever has this number is somebody she has already decided to hurt, and she wants me to know she can reach the one thing I thought was only his.'),
  ];
}

function weeksChoices(): C10Choice[] {
  return [
    offer('o10-week-on', 'The Friday after', 'Whatever the week left.', 'hours', () => [p('You put both phones face down on the table, the cheap one and the black one, side by side like two halves of an argument, and leave them there.')]),
  ];
}

// ── The hours ──

function hoursChoices(s: GameState): C10Choice[] {
  const open = get10(s, 'o-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o10-night-' + id, label, hint, 'complete', (x) => {
      set10(x, 'o-night', id);
      return body;
    });
  if (open && !open.endsWith('-room') && open !== 'maya') {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('o10-' + pt + '-' + id, label, hint, 'hours', (x) => {
        set10(x, 'o-night-open', pt + '-room');
        set10(x, 'o-night-scope', id);
        note(x, 'o-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s tonight. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('o10-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c10.o-night-open'];
        set10(x, 'o-night-outcome', 'declined');
        return [p('You say goodnight at his door and mean it, and he lets you go without a question.')];
      }),
    ];
  }
  if (open && open.endsWith('-room')) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get10(s, 'o-night-scope') as 'no-sex' | 'sex';
    return [
      offer('o10-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c10.o-night-open'];
        set10(x, 'o-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead.')];
      }),
      offer('o10-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c10.o-night-open'];
        set10(x, 'o-night-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p(pt === 'julian' ? 'He kisses you against the window and the day goes off you like a coat, and he asks once more, his mouth at your shoulder, and you answer by drawing him toward the bedroom.' : 'He kisses you, and then not only that. When he asks once more, low, whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room neither Meridian nor the vendor has ever found. The scene fades.')]
          : [p('He kisses you by the window and stops exactly where you said, and holds you there, and in your bag on the chair the black phone buzzes once, and neither of you looks at it.')];
      }),
    ];
  }
  return [
    ...partners(s).map((pt) =>
      offer('o10-night-' + pt, pt === 'julian' ? 'Julian' : 'Sebastian', 'His place. Off the grid.', 'hours', (x) => {
        set10(x, 'o-night', pt);
        set10(x, 'o-night-open', pt);
        return [q(partnerName[pt], 'I saw the papers. Come in. Tell me what you want tonight, and that’s what happens.')];
      }),
    ),
    ...(key(s, 'c6.maya') === 'restored'
      ? [offer('o10-night-maya', 'Maya', 'She’ll clock both phones in seconds.', 'hours', (x) => {
          set10(x, 'o-night', 'maya');
          set10(x, 'o-night-open', 'maya');
          return [p('Maya’s kitchen, a bottle, the cat on the tax return. The two phones are in your bag for four seconds before she sees them.'), q('Maya', 'Two phones. Neither of them yours. I’m not going to ask. I’m going to pour, and you’re going to tell me the half you can.')];
        })]
      : []),
    done('alone', 'Alone', 'Both phones, face down.', [p('You sit at the table in the room over the water with the cheap phone and the black phone face down in front of you, and the whole of the river dark outside, and neither of them says anything for a long time.')]),
  ];
}

function hoursOnMaya(s: GameState): C10Choice[] {
  return [offer('o10-maya-stay', 'Stay and talk it through', 'Half the truth, and a bottle.', 'complete', (x) => {
    set10(x, 'o-night-outcome', 'maya');
    delete x.choices['c10.o-night-open'];
    return [p('You tell her the half you can, and she pours, and nobody writes anything down. At two she falls asleep on the sofa under the cat, and you cover her with the coat, and sit up, and do not turn the phones over.')];
  })];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(get10(s, 'o-night-outcome')?.startsWith('intimate') ? [p('You get back to the room over the water at dawn. Both phones are where you left them. The black one has three messages on it. You read them in the morning.')] : []),
    p('The wall over the table. A new card, beside MERIDIAN, in capitals:'),
    q('The card', 'CELESTE LAURENT. ' + (a === 'gave' ? 'GIVEN.' : a === 'doctored' ? 'DOCTORED.' : 'REFUSED.')),
    ...(key(s, 'out.told10') ? [p('And under it, in pencil: HE KNOWS.')] : []),
    p('And the invitation, pinned beside it: THE VESPER. THE FIRST THURSDAY. BRING YOUR SOURCE.'),
    t('He is a lonely man, she said. Lonely men are so easily hurt. I am beginning to think she meant me as well.'),
  ];
}

export function outsideBlocks10(s: GameState): Block[] {
  if (s.phase === 'slip') return slipBlocks();
  if (s.phase === 'cafe') return cafeBlocks();
  if (s.phase === 'source') return sourceBlocks();
  if (s.phase === 'press') return pressBlocks(s);
  if (s.phase === 'weeks') return weeksBlocks(s);
  if (s.phase === 'hours') return [p('Sunday night.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices10(s: GameState): C10Choice[] {
  if (s.phase === 'slip') return slipChoices();
  if (s.phase === 'cafe') return cafeChoices(s);
  if (s.phase === 'source') return sourceChoices(s);
  if (s.phase === 'press') return pressChoices(s);
  if (s.phase === 'weeks') return weeksChoices();
  if (s.phase === 'hours') return get10(s, 'o-night-open') === 'maya' ? hoursOnMaya(s) : hoursChoices(s);
  return [];
}
