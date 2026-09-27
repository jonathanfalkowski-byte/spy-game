/** Chapter 14 (Predator route, lane id `predator`) · Marcus Falls:
 * dawn → case → safe (only if Pryce told her) → room → last → desk → evening → ledger (its own end; the Celebrity
 * `complete` is 'The Board'). Design: docs/story/PREDATOR_CHAPTER_14_MARCUS_FALLS_DESIGN.md (owner-approved 2026-09-27,
 * all eight decisions as recommended); script: docs/story/scripts/PREDATOR_CHAPTER_14_SCRIPT.md. Entered from the
 * Predator `chapter13.ledger`. The payoff of every lever: three ways to take Marcus, each gated by what she built (the
 * board: votes she owns; the press: her face on her terms; the letter: always open, from the Chapter 7 Novagen file);
 * the safe behind the horse, if Pryce told her in Chapter 8; Marcus's last move (a partnership against Celeste: refuse,
 * take, or laugh); what he keeps; her Chapter 7 want paid; Julian in the room; an optional chosen evening (heat 3,
 * consent-gated, fades); and Celeste's invitation to Meridian's board. The fall is financial, professional and public,
 * never sexual. Local helpers mirror chapter14.ts (c14.* keys, chapter14.* ids) to avoid a circular import.
 * Deepening pass (2026-09-27): the night before the fall, which every way passes through (c14.p-eve = dress | marcus |
 * maya | sleep: the clothes for tomorrow, chosen by the way; a last drink with Marcus at the top of the building, who
 * does not know yet; Maya, if she is back); one question before Marcus's offer (c14.p-ask = why | leeds | none: why he
 * said yes eleven years ago; his mother, who cleaned offices like this one); and the day at the desk after the mercy
 * (c14.p-day = floor | pryce | window: the people on the page headed OWES; Pryce in the garage, and whose car it is
 * now). Dawn, the board and the ledger at greater length. */
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

export const PREDATOR_PHASES14 = ['dawn', 'case', 'safe', 'room', 'last', 'desk', 'evening', 'ledger'] as const;
export const isPredator14 = (s: GameState) => key(s, 'route.lane') === 'predator';
export const predatorPhase14 = (s: GameState) => isPredator14(s) && (PREDATOR_PHASES14 as readonly string[]).includes(s.phase);

type Way = 'board' | 'press' | 'letter';
const way = (s: GameState) => get14(s, 'p-way') as Way | undefined;
const clause = (s: GameState, id: string) => !!key(s, 'pred.clause.' + id);
const julian = (s: GameState) => key(s, 'pred.julian') as 'ally' | 'rival' | 'casualty' | undefined;
const mirror = (s: GameState) => key(s, 'pred.mirror') as 'complied' | 'refused' | 'turned' | 'freed' | undefined;
const cash = (s: GameState) => Number(key(s, 'own.cash') ?? 0);
const pryceTold = (s: GameState) => s.choices['c8.p-night'] === 'pryce';
const safe = (s: GameState) => get14(s, 'p-safe') as 'her' | 'letters' | 'horse' | undefined;

/** The hands she owns on the Helix board (design §4). Julian sits on it as Group COO. */
export function boardVotes14(s: GameState): ('hollis' | 'varga' | 'chair' | 'julian')[] {
  const out: ('hollis' | 'varga' | 'chair' | 'julian')[] = [];
  if (key(s, 'pred.hollis') === 'owned') out.push('hollis');
  if (['use', 'spare'].includes(key(s, 'pred.lever8.counsel') ?? '')) out.push('varga');
  // The audit committee's chair, who asked for her calendar, votes with whoever brings him the fund's schedule.
  if (key(s, 'pred.lever8.archive')) out.push('chair');
  if (julian(s) === 'ally' || (julian(s) === 'casualty' && key(s, 'pred.julian8') === 'use')) out.push('julian');
  return out;
}
/** A rival Julian votes against her: the board way needs one more hand. */
export const boardNeed14 = (s: GameState) => (julian(s) === 'rival' ? 3 : 2);
export const boardOpen14 = (s: GameState) => boardVotes14(s).length >= boardNeed14(s);
export const pressOpen14 = (s: GameState) => !!get5(s, 'published') && (key(s, 'pred.lever8.press') === 'use' || clause(s, 'private'));

export function placePredator14(s: GameState): string | undefined {
  if (s.phase === 'case' && way(s)) return 'Evening · The night before';
  if (s.phase === 'desk' && get14(s, 'p-mercy')) return 'Afternoon · The thirty-eighth floor';
  if (s.phase === 'room')
    return { board: '08:00 · The Helix boardroom, the fortieth floor', press: '07:10 · The Helix lift', letter: '19:00 · Marcus’s office' }[way(s) ?? 'letter'];
  const evening = get14(s, 'p-evening-open');
  if (s.phase === 'evening' && evening) return evening.startsWith('marcus') ? 'Late · Marcus’s apartment, above the river' : 'Late · Julian’s apartment, the forty-first floor';
}

// ── The entry, and the wardrobe door ──

export function beginPredator14(): C14Choice {
  return offer('begin-predator', 'Marcus next', 'Everything you kept on the floor goes on the table.', 'dawn');
}

function cardsLine(s: GameState): string {
  const lever = (l: string, name: string) => (key(s, 'pred.lever8.' + l) ? name + ': ' + key(s, 'pred.lever8.' + l)!.toUpperCase() + '. ' : '');
  const top = { complied: 'DELPHINE (ANA). I SENT HER.', refused: 'DELPHINE. SOMEBODY ELSE SENT HER.', turned: 'DELPHINE. ASLEEP. MARSH, ALLY.', freed: 'ANA. ON A TRAIN.' }[mirror(s) ?? 'refused'];
  return lever('hollis', 'HOLLIS') + lever('counsel', 'VARGA') + lever('archive', 'BENTON (HARLAND)') + lever('press', 'MY FACE') + 'L.S.F. ADVISORY. ' + top + ' And in the middle of the door, where it has been since the autumn: MARCUS CHEN.';
}

function dawnBlocks(s: GameState): Block[] {
  const m = mirror(s);
  return [
    p('Five in the morning. The kettle, the wardrobe door, and every card on it, in the grey light before the city gets up.'),
    p(cardsLine(s)),
    p('In the drawer under the wardrobe is Adrian’s old jacket, and in its lining everything that matters: copies, envelopes, a photograph of your own work under somebody else’s name. You take it out and lay it on the bed like a person, and sit beside it, and drink the tea.'),
    p('You take the pins out of his card one at a time and hold it in your hand. Under his name, in three colours of ink over three months, is everything he owes, everything he has promised, and everything he has done with other people’s names.'),
    t(
      m === 'complied'
        ? 'Celeste told me I have a gift. I am going to use it on the man she was going to give me to.'
        : m === 'refused'
          ? 'I said no to her once, and it cost me Stuttgart. It is time somebody paid me back.'
          : 'Twice now, she said. She has started keeping count. Let her count this.',
    ),
    t('He hired me to be frightening. It is only fair that he should be the first to find out how much.'),
  ];
}

// ── The case ──

function caseBlocks(s: GameState): Block[] {
  const votes = boardVotes14(s);
  const names = { hollis: 'Hollis’s', varga: 'Varga’s', chair: 'the audit chair’s', julian: 'Julian’s' };
  const published = !!get5(s, 'published');
  return [
    p('By eight you are at your desk on the thirty-sixth floor with the door shut and three sheets of paper in front of you, one for each way a man like Marcus Chen can fall.'),
    p(
      boardOpen14(s)
        ? 'The board. You count the hands you own: ' + votes.map((v) => names[v]).join(', ').replace(/, ([^,]*)$/, ' and $1') + '. ' + (julian(s) === 'rival' ? 'Enough, even with Julian’s against you.' : 'Enough.')
        : 'The board. You count the hands you own, and there are not enough of them' + (julian(s) === 'rival' ? ', not with Julian’s raised against you' : '') + '. You put the sheet face down.',
    ),
    p(
      pressOpen14(s)
        ? 'The press. Your face, on your terms, on the front of every paper at every station, and the fund’s money under it. It would end him by lunchtime. It would also make you the story, for good.'
        : published
          ? 'The press. Your face is famous, but you never set the terms for it at Helix, and you are not about to let Marcus’s people print it for you.'
          : 'The press. No paper has ever printed your name, and you are not about to start with his.',
    ),
    p('The letter. Always the letter. The Novagen file from your first day: your work, Benton’s name, a director’s countersignature in the wrong ink, and a note saying the folder came from Marcus’s office. On its own it is enough to end him quietly.' + (pryceTold(s) ? ' And somewhere above the river there is a safe behind a painting of a horse, which would make it more than enough.' : '')),
    t('Three ways. He taught me every one of them.'),
  ];
}

/** The night before the fall (deepening pass): every way passes through it. */
function eveChoices(s: GameState): C14Choice[] {
  const w = way(s) ?? 'letter';
  const e = (id: string, label: string, hint: string, body: Block[]) =>
    offer('eve-' + id, label, hint, pryceTold(s) ? 'safe' : 'room', (x) => {
      set14(x, 'p-eve', id);
      return body;
    });
  return [
    e('dress', 'Lay out tomorrow’s clothes', 'You always dress for the room.', [
      p(
        w === 'board'
          ? 'The grey suit, the one that makes a boardroom look at the chair and not at the woman in it. The white shirt with nothing at the throat. The shoes that make a sound on a stone floor and none on a carpet. You hang them on the wardrobe door, over the ledger, so that they are the last thing you see.'
          : w === 'press'
            ? 'They will photograph you tomorrow, at the station, at the lift, at the door, so you choose for the photograph: black, plain, high at the neck, the kind of dress that makes a front page look like a portrait. You try it on in the dark, in front of the wardrobe mirror, and do not turn the light on to check. You know.'
            : 'The dress you wore on your first day at Helix, the dark green one, the one he looked at for exactly one second too long across his desk. He will remember it. You want him to remember it while he signs.',
      ),
      t('Adrian wore the same suit for eleven years. I have learned that clothes are a sentence. Tomorrow mine says: I was always going to do this.'),
    ]),
    e('marcus', 'Have one last drink with him', 'The bar at the top of the building. He does not know yet.', [
      p('At seven you go up to the bar at the top of the building, the one that is not on any floor plan, and he is there, on the stool with his back to the view, his tie off, as if he had been waiting.'),
      q('Marcus Chen', 'Twice in one month. People will talk.'),
      p('He orders for you without asking, and gets it right, and for forty minutes you talk about nothing: Leeds, horses, a restaurant in Lisbon he has been meaning to go back to for fifteen years. He is funny. He is always funny, when he is not afraid.'),
      q('Marcus Chen', 'You look like somebody with a secret.'),
      q('You', 'I’ve got lots of them. You gave me most.'),
      p('He laughs, and finishes his drink, and at the door, leaving for the fund’s dinner, he puts his hand on your shoulder for one second, the way he did at the Glass House, and says goodnight.'),
      t('He has no idea. For forty minutes I liked him more than I have liked anybody all year, and I did not change my mind once. I am not sure which of those frightens me more.'),
    ]),
    ...(key(s, 'c6.maya') === 'restored'
      ? [
          e('maya', 'Ring Maya', 'Not to tell her. Just to hear her.', [
            p('You ring Maya at ten. She is watching something terrible on television and describes the whole plot to you, badly, with her mouth full, and you lie on the bed next to Adrian’s jacket and laugh until your ribs hurt.'),
            q('Maya', 'You sound different. You sound like the night before an exam.'),
            q('You', 'It is the night before an exam.'),
            q('Maya', 'Then go and pass it. And ring me after. Not the version for the page. The real one.'),
          ]),
        ]
      : []),
    e('sleep', 'Go to bed early', 'Tomorrow will be long.', [p('You go to bed at ten, and to your own surprise you sleep, like somebody with nothing left to decide.')]),
  ];
}

function caseChoices(s: GameState): C14Choice[] {
  if (get14(s, 'p-way')) return eveChoices(s);
  const w = (id: Way, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('way-' + id, label, hint, 'case', (x) => {
      set14(x, 'p-way', id);
      setKey(x, 'pred.way', id);
      return body(x);
    });
  return [
    ...(boardOpen14(s)
      ? [
          w('board', 'The board', 'A special meeting at eight. Every hand is a lever you pulled. They will be spent.', (x) => [
            p('You send ' + boardVotes14(x).length + ' messages before nine, each of them one line long, and each of them answered inside the hour. By noon the chair has called a special meeting of the Helix board for eight tomorrow morning, under a clause nobody has used in the company’s history.'),
            t('After tomorrow they will not owe me anything. That is the price of a room full of hands. I am going to enjoy watching them go up.'),
          ]),
        ]
      : []),
    ...(pressOpen14(s)
      ? [
          w('press', 'The press', 'Your face on a front page you approved. She will stop trusting you. So will everyone.', (x) => [
            p('You ring a newspaper you have been photographed for twice, and ask for the editor by her first name, and give her the fund’s schedule, the Laurent money, and your photograph, and your terms: your words, your face, your approval on every line.'),
            ...(key(x, 'pred.ally.marsh') === 'in' ? [p('Then you ring a number you were given in February. Owen Marsh answers on the first ring. “I wondered when,” he says. “Tomorrow’s fine.”')] : []),
            t('Tomorrow I am the story. There will be no going back into the lift after that.'),
          ]),
        ]
      : []),
    w('letter', 'The letter', 'His paper, his pen. Nobody outside the room will know who did it. Not even her.', () => [
      p('You write it yourself, in longhand first, the way Adrian drafted anything that mattered, and then again on Helix paper. Three lines. You read it back twice, and leave a space at the bottom for his name.'),
      p('Then you ask his assistant for fifteen minutes at seven tomorrow evening, “about Novagen”, and watch her write it in his diary in pencil.'),
    ]),
  ];
}

// ── The safe behind the horse ──

function safeBlocks(s: GameState): Block[] {
  const m = mirror(s);
  return [
    p('At midnight the long black car is waiting outside your building with its engine running. Mr Pryce does not get out. He winds the window down an inch and passes you a key card and a folded square of paper, the way another man might pass a light.'),
    q('Pryce', 'Mr Chen is at the fund’s dinner until two. The concierge takes his break at one. The number is his mother’s birthday. It always is, with men like him.'),
    p('Marcus’s flat above the river is all glass and grey stone and nothing on the walls but one painting: a brown horse in a field, very badly done, in a gilt frame worth more than the horse. It swings out on a hinge. Behind it, a grey safe and a keypad. Six digits. The door opens with a sigh, like something relieved.'),
    p('He keeps a copy of everything. Pryce was right. Hanging files, in alphabetical order, eleven years of them: Hollis’s letter, and the one before Hollis’s, and the one before that; the fund’s letters on cream paper, every one signed with a looping green C.; and a folder with your name on it.'),
    p(
      'In your folder: your contract, with his pencil in the margins, She will want more. Give it to her slowly. Every clause you chose, and what he thought each one said about you. And, on the fund’s paper, ' +
        (m === 'complied'
          ? 'a receipt from L.S.F. Advisory “for services at the Claremont, 1109”, with your name typed in the column marked operator.'
          : m === 'refused'
            ? 'a note in the green hand: V. declined. Reassign Stuttgart. Watch.'
            : 'a card in the green hand: Twice. Watch her. And under it, in his large one: I am.'),
    ),
    t('He has been keeping my ledger while I kept his. One thing. Take one thing, and he will know which.'),
  ];
}

function safeChoices(): C14Choice[] {
  const k = (id: 'her' | 'letters' | 'horse', label: string, hint: string, body: Block[]) =>
    offer('safe-' + id, label, hint, 'room', (x) => {
      set14(x, 'p-safe', id);
      setKey(x, 'pred.safe', id);
      return body;
    });
  return [
    k('her', 'Take his copy of you', 'Everything he holds on you, in one folder.', [
      p('You take your own folder, and nothing else, and close the safe, and swing the horse back, and wipe the frame with your sleeve.'),
      t('Whatever happens tomorrow, he will not have me on paper. Nobody will, except me.'),
    ]),
    k('letters', 'Take the fund’s letters', 'Cream paper, a green C. Enough to end him twice. She will know.', [
      p('You take the fund’s letters, all of them, in their cream envelopes, and they go into the lining of Adrian’s old jacket with everything else that matters. Your own folder you leave where it is. Let him read it again.'),
      t('That is not his secret any more. That is hers. I have just put my hand into Celeste’s pocket.'),
    ]),
    k('horse', 'Take nothing, and leave the horse crooked', 'He will know somebody was here. He will know who.', [
      p('You read everything, and take nothing, and close the safe, and swing the horse back, and then you reach up and tilt the frame, very slightly, to the left.'),
      t('Let him sit up at two in the morning and look at it. Let him wonder what I read. That is the one thing a man like Marcus cannot bear.'),
    ]),
  ];
}

// ── The fall ──

function roomBlocks(s: GameState): Block[] {
  const w = way(s) ?? 'letter';
  if (w === 'board') {
    const votes = boardVotes14(s);
    return [
      p('At eight the Helix board meets in special session on the fortieth floor. Eleven chairs, a long table, coffee nobody drinks. Marcus arrives at two minutes past in his good suit, smiling, because nobody has told him what it is about, and sits in his usual place.'),
      clause(s, 'report')
        ? p('None of them has ever seen your work. Your clause made sure of that: you reported to Marcus alone. They look at you now the way people look at a stranger at a funeral who turns out to be in the will.')
        : p('The chair of the audit committee, who asked for your calendar twice, nods to you when you sit down, the way you nod to a colleague.'),
      ...(votes.includes('hollis') ? [p('Anthony Hollis moves the motion, in his regimental tie, without looking at Marcus once. His hands are perfectly steady. He has had nine years to practise.')] : []),
      ...(votes.includes('varga')
        ? [
            p(
              key(s, 'pred.lever8.counsel') === 'use'
                ? 'Ines Varga confirms, for Legal, that the director’s conduct is a matter for the board, in a voice with nothing left in it at all.'
                : 'Ines Varga confirms, for Legal, that the director’s conduct is a matter for the board, and then, before she sits down, looks straight at you, and you understand that she would have done it anyway.',
            ),
          ]
        : []),
      ...(votes.includes('chair') ? [p('The chair reads the fund’s financing schedule into the minutes: six years of acquisitions, every one of them part-paid by L.S.F. Advisory, and a monthly retainer to a man in Surrey who sells garden benches.')] : []),
      ...(safe(s) === 'letters' ? [p('Then he reads the letters. You left them on his desk at seven, in their cream envelopes. He reads them aloud, all of them, and every time he comes to the green C. at the bottom, nobody in the room looks at anybody else.')] : []),
      ...(julian(s) === 'ally'
        ? [p('Julian, in the Group COO’s chair, votes with you, and does not look at you while he does it, which is how you know it cost him something.')]
        : julian(s) === 'rival'
          ? [p('Julian votes against. He raises his hand for Marcus alone, clearly, so that the minutes will show it, and looks at you across the table while he does. It is the most honest thing anybody does all morning.')]
          : votes.includes('julian')
            ? [p('Julian votes with you. He does not look at you. He knows what you are holding, and so do you.')]
            : []),
      p('Marcus listens to all of it without interrupting, the way he listened to you on the first day, turning a pen. When the chair asks whether he wishes to respond, he says, pleasantly: “Only that I’d like the minutes to show I hired her.”'),
      p('Marcus Chen is removed as Director of Strategic Acquisitions in eleven minutes, by a show of hands. You count them. Every hand in the air is a lever you pulled.'),
    ];
  }
  if (w === 'press')
    return [
      p('At ten past seven the Helix lift is full of people holding the same newspaper. Your face is on the front of it: not the Aster photograph, the new one, the one you approved, in black, looking straight into the lens. Over it, in the largest type they own: HELIX’S HIDDEN FUND.'),
      p('The second paragraph is the Laurent money: six years of it, on cream paper, behind every deal Marcus Chen ever signed.'),
      p(
        key(s, 'pred.ally.marsh') === 'in'
          ? 'The third paragraph is Owen Marsh, deputy director of enforcement at the Markets Authority, confirming on the record that his inquiry into the fund has been reopened, and thanking an unnamed source for her courage.'
          : 'The third paragraph says the Markets Authority has declined to comment, which in London means it has started reading.',
      ),
      p(
        clause(s, 'private')
          ? 'Your words, your photograph, your approval on every line. Your clause, in your own capitals, in a contract he signed without reading: your face is your own. You have just spent it on him.'
          : 'You set the price with Dominic Ashe three weeks ago, when Marcus meant your face to be his. He paid for this photograph. He just did not know what it was for.',
      ),
      p('Marcus gets into the lift on the ground floor with his phone in his hand. He reads it all the way up. Nobody in the lift says a word, and nobody gets out, and when the doors open on thirty-eight he walks out into a corridor of people standing up to look at him.'),
    ];
  return [
    p('Seven in the evening. The floor is empty. His office, the corner of glass above the river, the enormous desk with nothing on it but a folder and, tonight, a single sheet of Helix paper, face down.'),
    p('He turns it over. Three lines. I resign as Director of Strategic Acquisitions with immediate effect, for personal reasons. I waive all claims against Helix and its partners. I will not speak of either. And under it, a space for his name.'),
    p('Beside it, the Novagen file from your first day: your work, Benton’s name, a countersignature in the wrong ink, and HR’s note saying the folder came from his office.' + (key(s, 'pred.lever') === 'return' ? ' He thought you gave it back because he owned your discretion. You gave it back because you had already read it twice.' : '')),
    ...(safe(s) === 'letters' ? [p('Beside that, the fund’s letters from his own safe, fanned out in their cream envelopes so that he can see the green C. on every one.')] : []),
    ...(clause(s, 'indemnity') ? [t('And if he calls this blackmail, Helix pays my lawyers. My clause. His signature.')] : []),
    p('He reads the letter twice. Then he holds out his hand, not for the letter: for the pen. His pen, the one he gave you on your first day. “Keep it,” he said. “You’ll want to sign things.”'),
  ];
}

function roomChoices(s: GameState): C14Choice[] {
  const r = (id: string, label: string, hint: string, body: Block[]) =>
    offer('room-' + id, label, hint, 'last', (x) => {
      set14(x, 'p-room', id);
      return body;
    });
  const w = way(s) ?? 'letter';
  if (w === 'board')
    return [
      r('watch', 'Watch his face while the hands go up', 'He looked at your clauses the same way.', [
        p('You watch his face. It does not move at all, which is how you know. He looks at each hand as it goes up the way he looked at your clauses as you wrote them: reading, filing, learning.'),
      ]),
      r('river', 'Watch the river instead', 'You have seen enough men’s faces this year.', [
        p('You look at the river instead. The water goes on being grey and going somewhere, and when you turn back, it is done, and eleven people are gathering their papers without looking at anybody.'),
      ]),
    ];
  if (w === 'press')
    return [
      r('lift', 'Be in the lift with him', 'The last two floors.', [
        p('You get in on thirty-six and stand beside him for the last two floors. He looks up from his phone at your face, and back down at your face, and says, very quietly:'),
        q('Marcus Chen', 'It’s a good photograph.'),
      ]),
      r('desk', 'Let him find you at your desk', 'He will come. He always does.', [
        p('You let him find you. He stands in your doorway at a quarter to eight with the paper folded in his hand, and does not come in, and says only:'),
        q('Marcus Chen', 'You look very well.'),
      ]),
    ];
  return [
    r('wait', 'Wait while he reads it again', 'The silence he taught you.', [
      p('You wait. You have learned how from him: the silence that goes on long enough for a lift to arrive and leave somewhere behind the wall. In the end he signs, in the large hand, the one he uses when he wants to be seen.'),
    ]),
    r('pen', 'Uncap the pen for him', 'Put it in his hand, the way he put it in yours.', [
      p('You uncap the pen and put it in his hand, the way he put it in yours, and he signs in the large hand, and blots it, and slides the letter back across the desk to you, and then, after a moment, the pen as well.'),
    ]),
  ];
}

// ── His last move ──

function lastBlocks(s: GameState): Block[] {
  const w = way(s) ?? 'letter';
  const sf = safe(s);
  return [
    p(
      w === 'board'
        ? 'Afterwards he asks for ten minutes in his own office, which is still his for an hour, and the board gives them to him, and he gives them to you.'
        : w === 'press'
          ? 'At nine he sends for you, through his assistant, in the old way, as if nothing had happened. You go.'
          : 'He does not get up. Neither do you.',
    ),
    p('He takes his tie off, and his watch, and puts them side by side on the desk, the way he did at the bar. Behind him, the chair from his first company, the one you have sat in every time you came to this office, is pushed back at an angle, as if somebody had just stood up.'),
    ...(sf === 'horse'
      ? [q('Marcus Chen', 'You left the horse crooked. I noticed at two this morning. I sat and looked at it for an hour. Nobody has ever been in my flat without my knowing.')]
      : sf === 'her'
        ? [q('Marcus Chen', 'You took my copy of you. I’d have done the same. I did, once, to the man who had this office before me.')]
        : sf === 'letters'
          ? [q('Marcus Chen', 'You took the fund’s letters. That was brave. That was very, very stupid. She will know by lunch.')]
          : []),
    p('He looks round the office, at the glass and the river and the desk, the way a man looks at a house he has sold, fixing it.'),
    q('Marcus Chen', 'She’ll do this to you, you know. Celeste. Not this year. In three, or five. She will find somebody who wants your desk the way you wanted mine, and she will give them your letters, and they will stand where you are standing, and you will sit where I am sitting.'),
    p('He waits, as if there were a question you ought to ask before he goes on.'),
  ];
}

/** His offer, after whatever she asks (deepening pass). */
const offerLines: Block[] = [
  q('Marcus Chen', 'So. You and me. I know where the fund keeps everything. Every letter she has ever written in that green ink. Take her, with me, instead of taking me for her.'),
  t('He means it. He is falling, and he is still selling. I have never liked him more.'),
];

function askChoices(s: GameState): C14Choice[] {
  const a = (id: string, label: string, hint: string, body: Block[]) =>
    offer('ask-' + id, label, hint, 'last', (x) => {
      set14(x, 'p-ask', id);
      return [...body, ...offerLines];
    });
  const m = mirror(s);
  return [
    a('why', 'Ask him why he said yes, eleven years ago', 'When she asked him to run one.', [
      q('You', 'Why did you say yes? When she asked you. Eleven years ago.'),
      p('He does not pretend not to understand. That is the thing about Marcus: he never once pretended with you.'),
      q('Marcus Chen', 'Because I’d come up from a council flat in Leeds, and she was the first person who ever offered me the top of the stairs. I said yes before she’d finished asking. I have never once been sorry, until about eight o’clock this morning.'),
      q('Marcus Chen', m === 'complied' ? 'You said yes too. Don’t look at me like that. I read the receipt.' : m === 'refused' ? 'You said no. I heard. I didn’t believe it. I thought you were negotiating.' : 'You did something else. Twice. I didn’t know there was anything else to do. Nobody ever told me.'),
    ]),
    a('leeds', 'Ask him about his mother', 'The woman who cleaned offices at night.', [
      q('You', 'Tell me about your mother.'),
      p('It is the only question anybody has asked him in this office that he did not see coming. You watch it land.'),
      q('Marcus Chen', 'She cleaned offices. This kind. Nights. I did my homework under the desks while she hoovered round me. The first building I ever bought was one she cleaned. I kept the chair from the office on the top floor, the man’s chair, the one she used to dust around without ever sitting in. That’s the chair you’ve been sitting in.'),
      q('Marcus Chen', 'She’s eighty-one. She thinks I’m in insurance. She’s going to be delighted I’m coming home.'),
    ]),
    a('none', 'Say nothing, and let him finish', 'He always finishes.', [p('You say nothing. He smiles at that, as if you had passed something, and goes on.')]),
  ];
}

const hasLetters = (s: GameState) => safe(s) === 'letters';

function lastChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'p-ask')) return askChoices(s);
  const l = (id: string, label: string, hint: string, value: string, body: Block[], after?: (x: GameState) => void) =>
    offer('last-' + id, label, hint, 'desk', (x) => {
      set14(x, 'p-last', id);
      setKey(x, 'pred.marcus', value);
      after?.(x);
      // Her Chapter 7 want, paid (design decision 5).
      if (key(x, 'pred.want') === 'money') setKey(x, 'own.cash', String(cash(x) + 20000));
      return body;
    });
  return [
    l('refuse', 'Turn him down', 'He goes alone.', 'refused', [
      q('You', 'No, Marcus. You were her kind. I watched you be it for three months.'),
      p('He nods slowly, as if confirming a figure he had hoped was wrong, and does not ask again.'),
    ]),
    l('take', 'Take his hand', 'A man in exile who knows where the fund keeps its secrets.', 'ally', [
      p('You reach across the desk and take his hand, and shake it once, the way he shook yours on the first day, when you had not yet decided what you were going to do to him.'),
      q('Marcus Chen', 'Then I’ll need somewhere to go. Leeds, probably. It usually is.'),
      t('An enemy who knows her handwriting. That is worth more than his desk. Almost.'),
    ], (x) => setKey(x, 'pred.ally.marcus', 'in')),
    l('laugh', 'Laugh, and tell him you already have them', 'The most fun. The most dangerous.', 'laughed', [
      q('You', hasLetters(s) ? 'I already have the letters, Marcus. I took them out of your safe last night.' : 'I already have everything I need from you, Marcus. You told me most of it at the bar.'),
      p('For a moment he looks at you with something that is very nearly fear. Then he laughs too, helplessly: the real laugh, the one that was surprised out of him the day you said Yours.'),
      q('Marcus Chen', 'God help her. God help all of us.'),
      t('He will tell her. Of course he will. Let him.'),
    ]),
  ];
}

// ── The desk ──

function deskBlocks(s: GameState): Block[] {
  const want = key(s, 'pred.want');
  const j = julian(s);
  return [
    p('The next morning, at eight, you walk across the floor, and the floor stands up.'),
    p(
      want === 'money'
        ? 'At nine HR sends a letter: the bonus pool of the Director of Strategic Acquisitions, for a year he will not be here to finish, is reallocated to the executive who brought the matter to the board’s attention. You watch the number arrive on your phone and do not do the arithmetic. You will never have to again.'
        : want === 'title'
          ? 'At nine a man from facilities comes up to take his name off the door of the corner office, and forty minutes later another comes to put a name on yours: Director of Strategic Acquisitions. They spell it right. You check twice.'
          : 'At nine you walk into his office and sit down behind the enormous desk. It is warm from the sun, not from him. Somebody has already taken his photographs. The river is exactly where he left it.',
    ),
    p(
      j === 'ally'
        ? 'Julian brings you coffee at half past, the way you take it, and stands in the doorway, and does not say congratulations, which with Julian is a kind of declaration.'
        : j === 'rival'
          ? 'Julian passes your door at ten and does not stop. At eleven you hear that he has asked the chair for a meeting about you. Fair. He voted in the open. He will fight in it too.'
          : 'Julian is waiting by your door at ten with a sheet of paper from Marcus’s files, folded twice. His own name is on it: the favour he did you in the spring, off the books, written down in Marcus’s large hand.',
    ),
    p('At noon HR asks what, if anything, the departing director is to keep. It is your decision, apparently. Everything seems to be, this week.'),
  ];
}

function deskChoices(s: GameState): C14Choice[] {
  if (julian(s) === 'casualty' && !get14(s, 'p-julian')) {
    const jc = (id: string, label: string, hint: string, value: string, body: Block[]) =>
      offer('julian14-' + id, label, hint, 'desk', (x) => {
        set14(x, 'p-julian', id);
        setKey(x, 'pred.julian14', value);
        return body;
      });
    return [
      jc('keep', 'Keep his favour out of it', 'Burn the page. He will owe you for the rest of his life.', 'kept', [
        p('You take the page from him, and tear it in half, and in half again, and drop it in the bin under your desk.'),
        q('Julian Mercer', 'I suppose I owe you now.'),
        q('You', 'You always did. Now it’s only me who knows.'),
      ]),
      jc('out', 'Let it come out with Marcus’s', 'Everything in the safe sees daylight. His too.', 'out', [
        p('You hand the page back to him. He reads your face, and nods, and goes to the chair’s office with it himself, which is braver than you expected.'),
        p('By five the Group COO has resigned from the executive committee, pending a review. He does not come to say goodbye. You find that you minded.'),
      ]),
    ];
  }
  if (get14(s, 'p-mercy')) return dayChoices(s);
  const m = (id: 'none' | 'chair' | 'name', label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('mercy-' + id, label, hint, 'desk', (x) => {
      set14(x, 'p-mercy', id);
      setKey(x, 'pred.mercy', id);
      const w = way(x) ?? 'letter';
      note(
        x,
        'p-fall',
        `Marcus Chen was removed as Helix Director of Strategic Acquisitions by ${w === 'board' ? 'the board in special session, in eleven minutes' : w === 'press' ? 'the press (“Helix’s Hidden Fund”, with Evelynn’s face on the front)' : 'a resignation letter Evelynn wrote and he signed with his own pen'}. He kept ${id === 'none' ? 'nothing' : id === 'chair' ? 'his pension and the chair from his first company' : 'his name'}.`,
        'Evelynn’s own ledger',
      );
      return body(x);
    });
  return [
    m('none', 'Nothing', 'Everything he took, taken.', () => [
      p('Nothing. Security takes his pass at the door and the fund takes his car at the kerb, and Mr Pryce drives it away, empty, without looking up at the building.'),
      t('He would have done exactly the same to me. He would have enjoyed it less.'),
    ]),
    m('chair', 'His pension, and the chair', 'The chair from his first company, sent home to Leeds.', (x) => [
      p('His pension, which is large, and the chair, which is not. You watch two men from facilities carry it out of the corner office and into the goods lift, wrapped in a blanket, with a label on it addressed to a council flat in Leeds.'),
      ...(key(x, 'pred.want') === 'desk' ? [t('The desk is mine, and the chair I sat in is gone. Good. I will buy my own.')] : []),
    ]),
    m('name', 'His name', '“Personal reasons.” Nobody outside will ever know who.', (x) => [
      p(
        (way(x) === 'press' ? 'The papers have already done their work. But the announcement says personal reasons, and so does the letter he will show his mother. ' : 'The announcement says personal reasons. ') +
          'He keeps his name. Somewhere above the river he will read it and understand exactly what it cost you to give it to him, and that you did.',
      ),
    ]),
  ];
}

/** The day at the desk (deepening pass), after the mercy and before the evening. */
const floorLines: Record<string, Record<string, string>> = {
  hollis: {
    use: 'Anthony Hollis is in his doorway when you pass, and nods, and does not meet your eye. He has the look of a man who has been let off one hook and has just noticed another.',
    hold: 'Anthony Hollis stops you by the lifts to say congratulations, too loudly, and then, very quietly, “Are we square?” You say you have no idea what he means. He goes away happier than he came.',
    spare: 'On Anthony Hollis’s desk, in a frame, a photograph of a cottage in Norfolk. He has put in his notice. He winks at you across the floor.',
  },
  counsel: {
    use: 'Ines Varga’s door is shut. It has been shut since the board. You find that you walk past it a little faster than the others.',
    hold: 'Ines Varga looks up as you pass and holds your gaze for exactly as long as it takes to understand that you still have not said anything. Then she goes back to her screen.',
    spare: 'Ines Varga comes out of her office as you pass and walks the length of the floor beside you, not saying anything, like an escort, and leaves you at your door.',
  },
  archive: {
    use: 'Elias Benton’s name is in the Axiom newsletter again: “retiring, with gratitude”. There is a photograph of him with a trophy. He looks like a man who has been told where to stand.',
    hold: 'The archivist in the records vault sends up a note, in ink: Your key card has been reactivated. For context. You keep it.',
    spare: 'The archivist in the records vault sends up a note, in ink: Your key card has been reactivated. For context. You keep it.',
  },
  press: {
    use: 'In Communications, Dominic Ashe is taking your face down from the lobby, very carefully, with a man on a ladder, and asks you whether you would like it for your wall.',
    hold: 'In Communications there is a new mood board, and you are not on it, and Dominic Ashe lifts his coffee to you through the glass.',
    spare: 'In Communications the small question mark is still on the mood board where your photograph was. Somebody has drawn a crown on it.',
  },
};

function dayChoices(s: GameState): C14Choice[] {
  const d = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('day-' + id, label, hint, 'evening', (x) => {
      set14(x, 'p-day', id);
      return body(x);
    });
  return [
    d('floor', 'Walk the floor', 'The names on the page headed OWES, one by one.', (x) => {
      const lines = (['hollis', 'counsel', 'archive', 'press'] as const)
        .map((l) => floorLines[l][key(x, 'pred.lever8.' + l) ?? ''])
        .filter((line): line is string => !!line)
        .map((line) => p(line));
      return [
        p('At three you walk the floor, the whole length of it, the way you did on the first day, slowly, learning it. It has learned you now.'),
        ...lines,
        t('Every one of them is a person, and every one of them is a line on a card. I used to think those were two different things.'),
      ];
    }),
    d('pryce', 'Go down to the garage', 'The long black car. Whose is it now?', () => [
      p('Level B2, four in the afternoon. The long black car is beside the lift doors, and Mr Pryce is polishing it, as if nothing had happened, because for him nothing has.'),
      q('You', 'Whose car is it now, Mr Pryce?'),
      q('Pryce', 'The same as always, Ms Vale. The fund’s. I’m to drive you from Monday, if you’d like. They asked me to ask.'),
      p('He opens the rear door, as if you had booked him. You do not get in. Not today.'),
      t('Lent out by a fund to a man, and now lent out by the same fund to me. The car never belonged to Marcus. I wonder what else of mine has never belonged to me.'),
    ]),
    d('window', 'Sit at the window', 'Let the day go past.', () => [p('You sit at the window with your shoes off and let the day go past, boat by boat, on the river he used to own the view of.')]),
  ];
}

// ── The evening ──

type Partner = 'marcus' | 'julian';
const who: Record<Partner, string> = { marcus: 'Marcus Chen', julian: 'Julian Mercer' };
const invite: Record<Partner, Block[]> = {
  marcus: [
    p('At nine a message from a number you know: “I’m still above the river until Friday. Come and tell me how you did it. No business. There isn’t any, now.”'),
    p('He opens the door in shirtsleeves, lighter than you have ever seen him, as if the company had been a coat. The horse is still on the wall. He has left it exactly as he found it.'),
    q('Marcus Chen', 'Same rule as always. Tell me what you want tonight.'),
  ],
  julian: [
    p('At nine a message from Julian: “Come up. No questions. I’ve run out of them.”'),
    p('The forty-first floor, the city laid out below, his cuffs undone. He pours you a drink and does not mention Marcus, or the board, or the floor, once.'),
    q('Julian Mercer', 'Tell me what you want tonight. Only tonight.'),
  ],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  marcus: { 'no-sex': 'Then that is the evening. You say stop, I stop. I always did.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
};
const stay: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  marcus: {
    'no-sex': [p('He kisses you by the glass like a man with nothing left to win, and stops exactly where you said, and you stand there together for a long time, two people who have finished their game, looking at a city neither of you owns tonight.')],
    sex: [p('He undoes the dress as slowly as he signed the letter, and says out loud what he likes about what he finds, and asks once more whether you are sure. You answer by drawing him toward the bedroom.'), p('What happens next is two people who have stopped keeping score, for one night. The scene fades.')],
  },
  julian: {
    'no-sex': [p('He kisses you against the glass and stops exactly where you tell him to, and holds you there, and when he says your name it is the first time all day that anybody has said it without wanting something.')],
    sex: [p('The dress goes, and his shirt, and the whole long day with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next stays on the forty-first floor. The scene fades.')],
  },
};

function eveningChoices(s: GameState): C14Choice[] {
  const open = get14(s, 'p-evening-open');
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer(`p14-${partner}-${id}`, label, hint, 'evening', (x) => {
          set14(x, 'p-evening-open', partner + '-room');
          set14(x, 'p-evening-scope', id);
          note(x, 'p14-evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who[partner], scopeReply[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer('p14-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'ledger', (x) => {
          delete x.choices['c14.p-evening-open'];
          set14(x, 'p-evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const sc = get14(s, 'p-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('p14-stop', 'Stop here', 'Honoured immediately, without argument.', 'ledger', (x) => {
        delete x.choices['c14.p-evening-open'];
        set14(x, 'p-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car, and walks you down to it, and does not ask why.')];
      }),
      offer('p14-stay', 'Stay', 'Continue within what you chose.', 'ledger', (x) => {
        delete x.choices['c14.p-evening-open'];
        set14(x, 'p-evening-outcome', 'intimate-' + sc);
        return [...stay[partner][sc], p('For a few hours nobody owes anybody anything. You chose that too.')];
      }),
    ];
  }
  const go = (partner: Partner, label: string, hint: string) =>
    offer('p14-evening-' + partner, label, hint, 'evening', (x) => {
      set14(x, 'p-evening', partner);
      set14(x, 'p-evening-open', partner);
      return invite[partner];
    });
  return [
    ...(julian(s) === 'ally' && key(s, 'c6.friction-julian') !== 'cooled' ? [go('julian', 'Go to Julian', 'The one who voted with you, or would have.')] : []),
    ...(key(s, 'pred.mercy') === 'name' ? [go('marcus', 'Go to Marcus', 'You let him keep his name. He would like to thank you for it.')] : []),
    offer('p14-evening-alone', 'Stay in with the ledger', 'Chapter 14 ends here.', 'ledger', (x) => {
      set14(x, 'p-evening', 'alone');
      return [p('You stay in with a glass of wine and the wardrobe door, and nobody at all, which is its own kind of celebration.')];
    }),
  ];
}

// ── The ledger ──

function ledgerBlocks(s: GameState): Block[] {
  const w = way(s) ?? 'letter';
  const kept = { none: 'NOTHING', chair: 'HIS PENSION, AND THE CHAIR', name: 'HIS NAME' }[(key(s, 'pred.mercy') as 'none' | 'chair' | 'name') ?? 'none'];
  return [
    ...(get14(s, 'p-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn, and do not sleep, and do not want to.')] : []),
    p('The wardrobe door. You take Marcus’s card down, and turn it over, and write on the back what he kept: ' + kept + '. Then you put it in the drawer with Adrian’s things.'),
    p('The door looks different without him. Every other card was pinned in a ring around his, and now the ring is around nothing, and all the lines of string you ran from name to name run into the gap and stop.'),
    p('There is a space in the middle of the door now, where he was. You pin a new card in it, in capitals: MERIDIAN — THE BOARD.'),
    p('At midnight the black phone lights.'),
    q(
      'C.',
      w === 'board'
        ? 'Eleven minutes, darling. I timed it. The board of Meridian would like to meet Helix’s new counterparty. The first Thursday of next month, at the Vesper. Wear something you can be photographed in.'
        : w === 'press'
          ? 'Every front page in London, darling. How very public of you. The board of Meridian would like to meet Helix’s new counterparty all the same. The first Thursday of next month, at the Vesper.'
          : 'Marcus has resigned, darling. Personal reasons. So sudden. The board of Meridian would like to meet whoever Helix sends in his place. The first Thursday of next month, at the Vesper. I do hope it’s you.',
    ),
    ...(key(s, 'pred.marcus') === 'laughed' ? [q('C.', 'Marcus tells me you laughed. I should so like to hear it.')] : []),
    ...(safe(s) === 'letters' ? [q('C.', 'And do bring my letters. I should like them back.')] : []),
    t(
      w === 'letter' && key(s, 'pred.marcus') !== 'laughed'
        ? 'She does not know it was me. For the first time since the autumn, I know something about her that she does not know about me.'
        : 'The stairs go on. I always knew they did. Now the woman at the top has invited me up them, and she thinks she is the one doing the inviting.',
    ),
  ];
}

export function predatorBlocks14(s: GameState): Block[] {
  if (s.phase === 'dawn') return dawnBlocks(s);
  if (s.phase === 'case') return caseBlocks(s);
  if (s.phase === 'safe') return safeBlocks(s);
  if (s.phase === 'room') return roomBlocks(s);
  if (s.phase === 'last') return lastBlocks(s);
  if (s.phase === 'desk') return deskBlocks(s);
  if (s.phase === 'evening') return [p('Night. The city comes on outside the glass, floor by floor. For the first time since the autumn there is nowhere you have to be, and nobody you have to be it for.')];
  if (s.phase === 'ledger') return ledgerBlocks(s);
  return [];
}

export function predatorChoices14(s: GameState): C14Choice[] {
  if (s.phase === 'dawn') return [offer('dawn-today', 'Pin his card back up, face down', 'It starts today.', 'case')];
  if (s.phase === 'case') return caseChoices(s);
  if (s.phase === 'safe') return safeChoices();
  if (s.phase === 'room') return roomChoices(s);
  if (s.phase === 'last') return lastChoices(s);
  if (s.phase === 'desk') return deskChoices(s);
  if (s.phase === 'evening') return eveningChoices(s);
  return [];
}
