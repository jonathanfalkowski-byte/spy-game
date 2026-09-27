/** Chapter 10 (Predator route, lane id `predator`) · Let Me Help:
 * ask → table → offer → floor → evening → ledger (its own end; the Celebrity `complete` is 'Something to Push Against').
 * Design: docs/story/PREDATOR_CHAPTER_10_LET_ME_HELP_DESIGN.md (owner-approved 2026-09-27, all eight decisions as
 * recommended); script: docs/story/scripts/PREDATOR_CHAPTER_10_SCRIPT.md. The shared "She Knows" breakfast in Predator
 * framing: Celeste is delighted. Summoned through Marcus (Chapter 13's card stays "the first time she has ever written
 * to you directly"); the Lindqvist, or Celeste on the thirty-sixth floor. Her inventory of every lever and of the
 * wardrobe ledger; "Adrian Vale would never have dared", as admiration. The first order is an offer: help for reports on
 * Marcus (accept / decline / feed her nothing true, covertly: not a surprise, which stays Chapter 11's). The black phone
 * at breakfast; the City-pages photograph; Marcus's "What did she want?"; an optional chosen evening (heat 3,
 * consent-gated, fades). Entered from a Predator `chapter9.complete`; Chapter 11 enters from `chapter10.ledger`, and the
 * Predator road runs without gaps from Chapter 7 to Chapter 14. Local helpers mirror chapter10.ts (c10.* keys,
 * chapter10.* ids) to avoid a circular import. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

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

export const PREDATOR_PHASES10 = ['ask', 'table', 'offer', 'floor', 'evening', 'ledger'] as const;
export const isPredator10 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase10 = (s: GameState) => isPredator10(s) && (PREDATOR_PHASES10 as readonly string[]).includes(s.phase);

const office = (s: GameState) => get10(s, 'p-ask') === 'wait';
const left = (s: GameState) => get10(s, 'p-adrian') === 'leave';
const answer = (s: GameState) => key(s, 'pred.celeste10') as 'accepted' | 'declined' | 'fed' | undefined;
/** Feeding her nothing true needs the report clause (nobody else sees her work) or a case she can stand on. */
export const canFeed10 = (s: GameState) => !!key(s, 'pred.clause.report') || ['supported', 'strong'].includes(key(s, 'case.strength') ?? '');

export function placePredator10(s: GameState): string | undefined {
  if (s.phase === 'table') return office(s) ? '08:00 · Your office, the thirty-sixth floor' : '07:00 · The Lindqvist';
  if (s.phase === 'offer') return left(s) ? '23:00 · The black phone' : office(s) ? '08:40 · Your office, the coffee' : '07:50 · The Lindqvist, the coffee';
  const evening = get10(s, 'p-evening-open');
  if (s.phase === 'evening' && evening) return evening.startsWith('marcus') ? 'Late · Marcus’s apartment, above the river' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The entry: Marcus asks ──

export function beginPredator10(): C10Choice {
  return offer('begin-predator', 'Monday', 'Marcus has a message for you. He does not like it.', 'ask');
}

function askBlocks(): Block[] {
  return [
    p('On Monday Marcus stops in your doorway on his way past, and does not come in, and does not sit on the edge of your desk, and does not smile. It is the first time since the Glass House that you have seen him not know what to do with his hands.'),
    q('Marcus Chen', 'Celeste Laurent would like to have breakfast with you. Wednesday. The Lindqvist, at seven. She asked me to ask.'),
    q('Marcus Chen', 'She has never asked to meet anybody who works for me. Not in eleven years.'),
    t('L.S.F. Advisory. Cream paper, old money, a woman in London who likes to own things quietly. She has just asked the man she owns to bring me to her. He knows it. He is standing in my doorway knowing it.'),
  ];
}

function askChoices(s: GameState): C10Choice[] {
  const a = (id: 'go' | 'wait', label: string, hint: string, body: Block[]) =>
    offer('ask-' + id, label, hint, 'table', (x) => {
      set10(x, 'p-ask', id);
      return body;
    });
  return [
    a('go', 'Tell him you’ll go', 'She asked. Answering is the first thing you control.', [
      q('You', 'Tell her yes.'),
      p('Wednesday at a quarter to seven the city is still dark and wet.'),
      ...(key(s, 'c8.p-night') === 'pryce' ? [p('The long black car is at your kerb, and Mr Pryce is holding the door. “Ms Laurent’s compliments.” He does not say whose car it is. You are beginning to understand that it has never been anybody’s but hers.')] : []),
    ]),
    a('wait', 'Tell him you’re busy on Wednesday', 'Let her come to you. She will.', [
      q('You', 'Tell her I’m busy on Wednesday.'),
      p('Marcus looks at you for a long moment, and then, slowly, he smiles, the smile that arrives after his eyes.'),
      q('Marcus Chen', 'I’ll tell her. I should like very much to be there when she hears it.'),
    ]),
  ];
}

// ── The table ──

const leverLine: Record<string, Record<string, string>> = {
  hollis: { use: 'Poor Anthony. You own him now, and he sends you roses.', hold: 'Anthony Hollis has been frightened of you for a month. You haven’t asked him for anything. That is the frightening part.', spare: 'You gave Anthony his letter back. Nobody has ever given anybody anything back in that building.' },
  counsel: { use: 'Ines Varga does whatever you ask now. So would I, if you’d seen what you saw.', hold: 'You know about Ines and Robert, and you’ve told nobody. I do admire a woman who can sit on a thing.', spare: 'You spared Ines Varga. That was the cleverest thing anybody has done in that building for years.' },
  archive: { use: 'Elias Benton rang you four times in an afternoon. I enjoyed that very much.', hold: 'You copied the Novagen schedule and put it somewhere clever. The lining of something, I expect.', spare: 'You left Benton to Sloane. Generous. A little wasteful.' },
  press: { use: 'Your face in the Helix lobby, twelve feet high. At your price. Marcus paid it without blinking. He has never paid anybody’s price before.', hold: 'You took your photograph off Dominic’s wall. Very ladylike.', spare: 'You put your photograph on Marcus’s empty desk, face up. He kept it, you know. It’s in his drawer.' },
};

function tableBlocks(s: GameState): Block[] {
  const want = key(s, 'pred.want');
  const levers = (['hollis', 'counsel', 'archive', 'press'] as const)
    .map((l) => leverLine[l][key(s, 'pred.lever8.' + l) ?? ''])
    .filter((line): line is string => !!line);
  return [
    ...(office(s)
      ? [
          p('At eight on Wednesday the floor goes quiet from the lifts inwards, the way a room goes quiet when somebody important comes into it by the wrong door. Celeste Laurent walks the whole length of the thirty-sixth floor in green, carrying two coffees, and every head on it turns to follow her to your glass office.'),
          p('She sits down across your desk without being asked and puts one of the coffees in front of you. It is the way you take it.'),
          q('Celeste', 'You were busy. I’m never busy. It’s the great luxury of my position.'),
        ]
      : [
          p('The Lindqvist has no sign: a black door between a bank and a jeweller, a doorman in a grey coat who opens it before you reach it, and a breakfast room on the river whose curtains are never opened. Lamps, dark wood, silver domes. One other table is occupied, by two men who do not eat.'),
          p('Celeste Laurent rises to meet you in green, tall and entirely made of edges, and kisses the air beside your cheek, and holds you away from her by both elbows to look at you, the way a woman looks at a dress she has bought and is pleased with.'),
        ]),
    q('Celeste', want === 'desk' ? 'You asked Marcus for his desk. To his face. I have been dining out on it for a month. Glorious.' : want === 'title' ? 'A name on a door. How sentimental. I like sentiment in a woman who can afford it.' : 'Money. Sensible. The only people I trust are the ones who tell me their price.'),
    ...levers.map((line) => q('Celeste', line)),
    ...(key(s, 'pred.friday') === 'tell' ? [q('Celeste', 'Marcus writes everything down, darling. And I read everything he writes.')] : []),
    q('Celeste', 'And you have been reading my letterhead. L.S.F. The Laurent Sovereign Fund. You needn’t look like that. I should have been disappointed if you hadn’t.'),
    q('Celeste', 'You keep a ledger on the back of your wardrobe door, don’t you. Cards, and pins. So did I, at your age.'),
    t('She knows about the door. The one thing in my life I thought nobody had seen.'),
  ];
}

function openChoices(s: GameState): C10Choice[] {
  const want = key(s, 'pred.want');
  const turn: Block[] = [
    p('She signals for more coffee without looking round, and it comes, and she stirs it, and then she says, lightly, the way you would drop a name in a crowded room to see who turns round:'),
    q('Celeste', want === 'money' ? 'Adrian Vale never asked anybody for money in his life. He’d rather have starved, and very nearly did. I have been dying to meet whoever taught him better.' : want === 'title' ? 'Adrian Vale spent six years with his name under Benton’s and never said a word. I have been dying to meet whoever finally did.' : 'Adrian Vale would never have dared ask Marcus for his desk. I have been dying to meet whoever did.'),
    t('She knows. Of course she knows. And she is not holding it over me. She is holding it out to me, across the silver, like a compliment.'),
  ];
  const strong = ['supported', 'strong'].includes(key(s, 'case.strength') ?? '');
  const o = (id: string, label: string, hint: string, body: Block[]) =>
    offer('open-' + id, label, hint, 'table', (x) => {
      set10(x, 'p-open', id);
      return [...body, ...turn];
    });
  return [
    o('case', 'Say “Meridian” first', 'Put the case on the table before she does.', [
      q('You', 'Meridian Holdings. The board. The fund. You.'),
      ...(strong
        ? [p('For one sentence she stops smiling, and looks at you as if across a much longer distance than a table, and then the smile comes back, wider.'), q('Celeste', 'Oh, well done. Nobody ever says it first. They wait for me to say it, and then they pretend they didn’t know.')]
        : [q('Celeste', 'Meridian Holdings, darling, not Meridian Partners, and I sit on the board, I don’t chair it. Details. You’ll get them right next time. I can tell.'), t('Corrected, gently, over eggs. I would rather she had slapped me.')]),
    ]),
    o('flatter', 'Let her lead', 'Be the audience. Learn the most.', [
      p('You let her talk. She is very good at it: Marcus at twenty-nine, “all elbows and ambition, in a suit he had clearly bought for a funeral”; the fund; the river; the towers; and, when you have said nothing for long enough, the thing she did not mean to say.'),
      q('Celeste', 'The last woman who wore your name never once asked me for anything. Not a thing. It was very restful, and in the end very disappointing. You are going to ask me for everything. I can tell.'),
      t('The last woman who wore my name. She said it the way you would mention a previous tenant.'),
    ]),
    o('ask', '“What do you want?”', 'Straight to the price.', [
      q('You', 'What do you want?'),
      q('Celeste', 'Straight to the price. Marcus said you would. I’ll tell you, in a moment. Eat something first. You never did look after yourself.'),
    ]),
  ];
}

function adrianChoices(): C10Choice[] {
  const a = (id: string, label: string, hint: string, body: Block[]) =>
    offer('adrian-' + id, label, hint, 'offer', (x) => {
      set10(x, 'p-adrian', id);
      setKey(x, 'pred.adrian', id);
      note(x, 'p10-adrian', 'Celeste Laurent knows that Evelynn is Adrian Vale. On the Predator road she said so as admiration, over breakfast.', 'Celeste Laurent, in person');
      return body;
    });
  return [
    a('composed', 'Give her nothing', 'Not a flicker.', [
      p('You butter a piece of toast, very evenly, to the edges, and eat it. She watches you do it, and something in her face approves, the way a teacher approves of a pupil who has not cried.'),
    ]),
    a('laugh', 'Laugh with her', 'It was a long time coming.', [
      p('You laugh. You did not know you were going to. It comes up from somewhere under the ribs, a real laugh, and she laughs with you, delighted, and the two men at the other table look round, and for a moment you are just two women at breakfast who have found the same thing funny.'),
      q('You', 'He was a very dull man. I don’t miss him.'),
      q('Celeste', 'Nobody does, darling. That’s rather the point of you.'),
    ]),
    a('leave', 'Leave her with the bill', 'Get up. Walk out. Let her watch.', [
      p('You fold your napkin and put it beside the plate, and stand up, and say thank you for breakfast, and walk out. You feel her watching you all the way to the door. She does not call after you. She does not need to.'),
      p('The doorman has your coat ready. In its pocket, when you put your hands in it on the pavement, there is something that was not there when you came in: a slim black phone, charged, with one contact saved in it, a single letter.'),
    ]),
  ];
}

// ── The offer ──

const OFFER10 = 'Let me help. Marcus is a very good man to climb, darling, but he is not the top of anything. The audit committee has been asking for your calendar. I can make them stop. There is a door on the thirty-eighth floor Marcus has never been through. I can open it. All I should like in return is one small thing. When Marcus talks about my fund, and he will, tell me what he says. Nothing else. I am terribly easy to please.';

function offerBlocks(s: GameState): Block[] {
  if (left(s))
    return [
      p('At eleven that night the black phone rings in your coat, which is still over the chair where you dropped it. You let it ring four times.'),
      q('Celeste', 'You left me with the bill, darling. I haven’t enjoyed a breakfast so much in years. Now listen.'),
      q('Celeste', OFFER10),
    ];
  return [
    q('Celeste', OFFER10),
    p('She takes something from her bag and slides it across the table to you, between the silver: a slim black phone, charged, with one contact saved in it, a single letter.'),
    q('Celeste', 'So we can talk without Marcus listening. He does listen, you know. He can’t help it.'),
  ];
}

function offerChoices(s: GameState): C10Choice[] {
  const o = (id: string, label: string, hint: string, value: 'accepted' | 'declined' | 'fed', body: (x: GameState) => Block[]) =>
    offer('offer-' + id, label, hint, 'floor', (x) => {
      set10(x, 'p-offer', id);
      setKey(x, 'pred.celeste10', value);
      setKey(x, 'pred.phone', 'yes');
      return body(x);
    });
  return [
    o('accept', 'Say yes', 'Take the help. Every confidence Marcus gives you will have two readers.', 'accepted', () => [
      q('You', 'Yes.'),
      q('Celeste', 'Lovely. Friday, darling. Just a line or two. Nothing that would embarrass anybody.'),
      p('By Thursday the audit committee has stopped asking for your calendar. Nobody tells you why. Nobody needs to.'),
      t('Every confidence Marcus gives me now has two readers. He will never know which of them is laughing.'),
    ]),
    o('decline', '“Thank you. I’d rather climb on my own.”', 'She will watch. She loves to watch.', 'declined', (x) => [
      q('You', 'Thank you. I’d rather climb on my own.'),
      q('Celeste', 'Then I shall watch. I do love to watch.'),
      q('Celeste', key(x, 'c6.maya') === 'restored' ? 'Give my love to Ms Reyes, by the way. The one at the paper. She rang you four times last week. I do admire persistence in a friend.' : 'Give my love to Ms Reyes, by the way. The one at the paper. Such a loyal girl, I hear.'),
      t('Maya’s name. In her mouth, over the coffee, like a spoon she was stirring with. It is not a threat. She would never be so vulgar. It is an inventory.'),
    ]),
    ...(canFeed10(s)
      ? [
          o('feed', 'Say yes, and mean nothing by it', 'Take the help. Send her a report on Friday, beautifully written, entirely untrue.', 'fed', () => [
            q('You', 'Yes.'),
            q('Celeste', 'Lovely. Friday, darling. Just a line or two.'),
            p('On Friday you send her three lines on the black phone: that Marcus has been asking, quietly, what it would cost to finance Helix without the fund. It is beautifully written. Not one word of it is true. Nobody but Marcus ever sees your work, and Marcus will never see this.'),
            q('C.', 'How very interesting. Thank you, darling.'),
            t('She believed it. She has an informant in Marcus’s office, and the informant is mine.'),
          ]),
        ]
      : []),
  ];
}

// ── The floor ──

function floorBlocks(s: GameState): Block[] {
  const j = key(s, 'pred.julian');
  return [
    p(
      office(s)
        ? 'By noon the City pages have the photograph. It was taken through the glass of your own office, from the floor, by somebody on it: Celeste Laurent across your desk in green, her hand on your wrist, both of you laughing at something neither of you said.'
        : 'By noon the City pages have the photograph: the two of you at the Lindqvist, lamplight and silver, her hand on your wrist, both of you laughing at something neither of you said. It was taken from low down, from a table. The two men who did not eat.',
    ),
    q('The caption', 'Old money, new blood. Celeste Laurent breakfasts with Helix’s Evelynn Vale.'),
    p('The floor looks at you differently by one o’clock. Not the way it looked at you when you pulled the levers, frightened. The way people look at a woman who has been seen with somebody they are frightened of.'),
    ...(j === 'ally' ? [p('A message from Julian, one line: Careful. She never has breakfast with anybody twice.')] : []),
    p('At three Marcus is in your doorway with the paper folded in his hand, and this time he comes in, and shuts the door, and does not sit down.'),
    q('Marcus Chen', 'What did she want?'),
  ];
}

function floorChoices(s: GameState): C10Choice[] {
  const a = answer(s);
  const m = (id: string, label: string, hint: string, value: string, body: Block[]) =>
    offer('marcus-' + id, label, hint, 'evening', (x) => {
      set10(x, 'p-marcus', id);
      setKey(x, 'pred.marcus10', value);
      return body;
    });
  return [
    m('tell', 'Tell him the truth', 'What she asked for.', 'told', [
      q('You', a === 'declined' ? 'She wanted me to tell her what you say about the fund. I said no.' : 'She wants me to tell her what you say about the fund.'),
      p('He is quiet for a long time. Outside the glass the floor is pretending not to watch.'),
      q('Marcus Chen', a === 'declined' ? 'Nobody says no to her.' : 'And will you?'),
      q('You', a === 'declined' ? 'I just did.' : 'I haven’t decided what I’ll tell her.'),
      t(a === 'declined' ? 'He looked at me, just then, the way he looked at me on the first day. As if he had bought something much more expensive than he meant to.' : 'Every word of that was true. That is the most dangerous kind of answer I know.'),
    ]),
    m('lie', '“She wanted to meet your acquisition.”', 'Light. Easy. Not true.', 'lied', [
      q('You', 'She wanted to meet your acquisition.'),
      q('Marcus Chen', 'That’s what she told me, too.'),
      p('He looks at the paper in his hand, and at you, and puts it face down on your desk, and goes.'),
    ]),
    m('deflect', '“Ask her.”', 'Let him wonder.', 'deflected', [
      q('You', 'Ask her.'),
      q('Marcus Chen', 'I did. She told me to ask you.'),
      p('He laughs, not happily, and goes, and leaves the door open behind him, which he has never once done.'),
    ]),
  ];
}

// ── The evening ──

type Partner = 'marcus' | 'julian';
const who: Record<Partner, string> = { marcus: 'Marcus Chen', julian: 'Julian Mercer' };
const invite: Record<Partner, Block[]> = {
  marcus: [
    p('At nine you go up to the river without being asked. He opens the door in his shirtsleeves, and looks at you on his step for a long moment, like a man who has spent the day being reminded that he is not the top of anything.'),
    q('Marcus Chen', 'I didn’t think you’d come. Same rule. No business. Tell me what you want tonight.'),
  ],
  julian: [
    p('At nine, Julian: “I saw the paper. I’m not going to ask. Come up, if you want to.”'),
    p('The forty-first floor, the city laid out below, his cuffs undone, and the paper nowhere in sight.'),
    q('Julian Mercer', 'Tell me what you want tonight. Only tonight.'),
  ],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  marcus: { 'no-sex': 'Then that is the evening. You say stop, I stop.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
};
const stay: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  marcus: {
    'no-sex': [p('He kisses you by the window like a man making sure of something, and stops exactly where you said, and holds you there with the river going by below, and neither of you says her name once.')],
    sex: [p('He undoes the dress slowly, as if the day had taken something from him and this were how he meant to get it back, and asks once more whether you are sure. You answer by drawing him toward the bedroom.'), p('What happens next is two people who have both been told today that they are not the top of anything, deciding for one night not to care. The scene fades.')],
  },
  julian: {
    'no-sex': [p('He kisses you against the glass and stops exactly where you tell him to, and holds you, and does not mention the photograph, and you find that you are grateful to him for something you could not have named.')],
    sex: [p('The dress goes, and his shirt, and the photograph with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next stays on the forty-first floor. The scene fades.')],
  },
};

function eveningChoices(s: GameState): C10Choice[] {
  const open = get10(s, 'p-evening-open');
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer(`p10-${partner}-${id}`, label, hint, 'evening', (x) => {
        set10(x, 'p-evening-open', partner + '-room');
        set10(x, 'p-evening-scope', id);
        note(x, 'p10-evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(who[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('p10-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'ledger', (x) => {
        delete x.choices['c10.p-evening-open'];
        set10(x, 'p-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get10(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p10-stop', 'Stop here', 'Honoured immediately, without argument.', 'ledger', (x) => {
        delete x.choices['c10.p-evening-open'];
        set10(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer('p10-stay', 'Stay', 'Continue within what you chose.', 'ledger', (x) => {
        delete x.choices['c10.p-evening-open'];
        set10(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[partner][sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  const go = (partner: Partner, label: string, hint: string) =>
    offer('ev-' + partner, label, hint, 'evening', (x) => {
      set10(x, 'p-evening', partner);
      set10(x, 'p-evening-open', partner);
      return invite[partner];
    });
  return [
    go('marcus', 'Go up to the river', 'He needs, for once, to be told he is still wanted.'),
    ...(key(s, 'pred.julian') === 'ally' && key(s, 'c6.friction-julian') !== 'cooled' ? [go('julian', 'Go to Julian', 'He will not ask about the paper.')] : []),
    offer('ev-alone', 'Stay in with the ledger', 'Chapter 10 ends here.', 'ledger', (x) => {
      set10(x, 'p-evening', 'alone');
      return [p('You stay in, with the black phone face down on the kitchen table, and the wardrobe door open.')];
    }),
  ];
}

// ── The ledger ──

function ledgerBlocks(s: GameState): Block[] {
  const a = answer(s);
  return [
    ...(get10(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep.')] : []),
    p('The wardrobe door, late. Every card on it has been seen now, by somebody who admired it. You look at them for a long time, the pins and the string, the way you would look at a room somebody has been in while you were out.'),
    p('Then you write a new card, and pin it above Marcus, above L.S.F. Advisory, above everything, at the very top of the door:'),
    q('The card', a === 'accepted' ? 'CELESTE LAURENT. LET ME HELP. I SAID YES.' : a === 'fed' ? 'CELESTE LAURENT. LET ME HELP. I SAID YES. I LIED.' : 'CELESTE LAURENT. LET ME HELP. I SAID NO. SHE IS WATCHING.'),
    p('At midnight the black phone lights, face down, and you turn it over.'),
    q('C.', a === 'declined' ? 'The first Thursday of December, darling. The Vesper. Marcus will bring you, whether or not you would like to come. He doesn’t know yet.' : 'The first Thursday of December, darling. The Vesper. Marcus will bring you. He doesn’t know yet.'),
    t('She knows who I am, and what I want, and where I keep my cards. She thinks that is the same thing as owning me. I have met people who thought that before. I have their cards on the door.'),
  ];
}

export function predatorBlocks10(s: GameState): Block[] {
  if (s.phase === 'ask') return askBlocks();
  if (s.phase === 'table') return tableBlocks(s);
  if (s.phase === 'offer') return offerBlocks(s);
  if (s.phase === 'floor') return floorBlocks(s);
  if (s.phase === 'evening') return [p('By seven the floor is empty. The photograph is on every desk you pass on your way to the lift, face up, and on some of them somebody has drawn a small circle around your face.')];
  if (s.phase === 'ledger') return ledgerBlocks(s);
  return [];
}

export function predatorChoices10(s: GameState): C10Choice[] {
  if (s.phase === 'ask') return askChoices(s);
  if (s.phase === 'table') return get10(s, 'p-open') ? adrianChoices() : openChoices(s);
  if (s.phase === 'offer') return offerChoices(s);
  if (s.phase === 'floor') return floorChoices(s);
  if (s.phase === 'evening') return eveningChoices(s);
  return [];
}
