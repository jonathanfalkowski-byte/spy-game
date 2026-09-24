/** Chapter 10 (Act III opener, own-power played as the Celebrity route) · She Knows:
 * breakfast → claimed → wall → order → answer → invitation → complete.
 * Design: docs/story/CHAPTER_10_SHE_KNOWS_DESIGN.md (owner-approved 2026-09-24); flow and flags:
 * docs/story/scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md. Gated behind chapter10Playable(), reached from an own-power
 * Chapter 9 ending. The coercion beat follows docs/story/CONTENT_DIRECTION.md §3: comply / refuse / counterplay,
 * each with a real cost; refusal lands on the named, non-sexual threat (Maya's clearance). The only intimacy is the
 * optional chosen evening (heat 3, consent-gated, fades), never with a partner betrayed this chapter. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5, julian5 } from './chapter5-model';
import { get6 } from './chapter6-model';
import { getKey, setKey } from './chapter7-model';
import { mayaKnowsAdaptation } from '../state/chapter3-provenance';
import { sloaneDoubts } from './sloane-standing';
import { wallLines } from './leverage';

export type C10Scene = { title: string; place: string; blocks: Block[] };
export type C10Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get10 = (s: GameState, k: string) => s.choices['c10.' + k];
export const set10 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c10.' + k] = v;
};
const offer10 = (id: string, label: string, hint: string, next: string, apply?: C10Choice['apply']): C10Choice => ({
  id: 'chapter10.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter10Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER10 === '1';

function note10(s: GameState, key: string, text: string, source: string) {
  if (get10(s, 'rec.' + key) !== undefined) return;
  set10(s, 'rec.' + key, String(s.history.length));
  set10(s, 'event.' + key, String(s.revision));
  set10(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c10.' + key);
  s.knowledge.push('c10.' + key);
}

export const chapter10Definitions: Record<string, C10Scene> = {
  breakfast: { title: 'She Knows', place: 'MORNING · BREAKFAST', blocks: [] },
  claimed: { title: 'Old Friends', place: 'NOON · THE PHOTOGRAPH', blocks: [] },
  wall: { title: 'The Wall', place: 'NIGHT · THE WARDROBE DOOR', blocks: [] },
  order: { title: 'One Small Thing', place: '23:00 · THE BLACK PHONE', blocks: [] },
  answer: { title: 'What It Cost', place: 'THE NEXT MORNING', blocks: [] },
  invitation: { title: 'The First Thursday', place: 'EVENING · THE ORCHID', blocks: [] },
  complete: { title: 'Something to Push Against', place: '· LATER', blocks: [] },
};
export const chapter10Scenes = Object.entries(chapter10Definitions).map(([phase, scene]) => ({
  id: `chapter10.${phase}` as NodeId,
  ...scene,
}));

// ── What Chapters 5–9 left her (design §2) ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const intimate7 = (s: GameState, who: string) => c(s, 'c7.evening') === who && (c(s, 'c7.evening-outcome') ?? '').startsWith('intimate');
/** Theo is in play once she let him in on air, took his drink, or chose his evening. */
export const theoInPlay10 = (s: GameState) => c(s, 'c7.theo') === 'curious' || c(s, 'c7.exit') === 'theo' || c(s, 'c7.evening') === 'theo';
const theoTrusts = (s: GameState) => c(s, 'c7.exit') === 'theo' || intimate7(s, 'theo');
export const julianInPlay10 = (s: GameState) => julian5(s) || c(s, 'c7.evening') === 'julian' || getKey(s, 'own.crossover') === 'executive';
const julianTrusts = (s: GameState) =>
  intimate7(s, 'julian') ||
  !!(get5(s, 'intimacy') && get5(s, 'want-target') === 'julian') ||
  !!get5(s, 'mutual-interest') ||
  !!c(s, 'c4.mutual-interest') ||
  getKey(s, 'own.crossover') === 'executive';
const strongCase = (s: GameState) => ['supported', 'strong'].includes(getKey(s, 'case.strength') ?? '');
const mayaBack = (s: GameState) => get6(s, 'maya') === 'restored';
const mayaClose = (s: GameState) => mayaBack(s) && getKey(s, 'own.maya-distance') !== 'away';
const mayaKnowsWho = (s: GameState) => get6(s, 'maya-knows') === 'in-person' || mayaKnowsAdaptation(s);
const ambushed = (s: GameState) => get10(s, 'breakfast') === 'ambushed';

export type Target10 = 'tape' | 'workroom' | 'notes';
/** The first order's target follows her relationships (owner decision 2): Theo's tape, Julian's page, her notes. */
export const target10 = (s: GameState): Target10 => (theoInPlay10(s) ? 'tape' : julianInPlay10(s) ? 'workroom' : 'notes');
/** Counterplay needs something she built: Theo's trust, Julian's trust, or a case she can lie around. */
export const counterReady10 = (s: GameState, target = target10(s)) =>
  target === 'tape' ? theoTrusts(s) : target === 'workroom' ? julianTrusts(s) : strongCase(s) || c(s, 'c7.notes') === 'burn';

/** Scene-specific place lines (display only). */
export function place10(s: GameState): string | undefined {
  if (s.scene !== 'chapter10') return;
  if (s.phase === 'breakfast') {
    const b = get10(s, 'breakfast');
    return b === 'went' ? '07:00 · THE LINDQVIST' : b === 'ambushed' ? '09:10 · THE BAKERY ON YOUR STREET' : 'DAWN · APARTMENT';
  }
  const evening = get10(s, 'evening-open');
  if (s.phase === 'invitation' && evening)
    return evening.startsWith('julian') ? 'LATE · JULIAN’S APARTMENT' : evening.startsWith('theo') ? 'LATE · THEO’S FLAT ABOVE THE STUDIO' : 'LATE · HARBOUR, AFTER THE LAST SET';
}

// ── Breakfast ──

function celesteOpeners(s: GameState): Block[] {
  const out: Block[] = [];
  const card = c(s, 'c7.card');
  if (card === 'kept' || card === 'studied')
    out.push(q('Celeste', 'You kept my card. She never kept anything. I used to find my letters in hotel bins, unopened. You have better manners than she did. Or a better reason.'));
  else if (card === 'burned')
    out.push(q('Celeste', 'You burned my card. Good. It was hers, not yours. I would have thought a little less of you for keeping another woman’s post.'));
  const terrace = c(s, 'c9.terrace');
  if (terrace === 'turn')
    out.push(q('Celeste', 'You asked me whether I liked looking at her. I have thought about it since. The answer is still yes, and it still isn’t the one you think.'));
  else if (terrace === 'truth') out.push(q('Celeste', 'You told me you liked being her, some days. I have thought about that more than I should.'));
  const beat = c(s, 'c9.name-beat');
  if (beat === 'walk') out.push(q('Celeste', 'You walked past my building on Tuesday. I waved. You didn’t see.'));
  else if (beat === 'photos')
    out.push(
      p('She slides a photograph across the cloth: the ninth frame from the Glass House, you laughing at something Marcus said, and in the background, out of focus, Celeste at the window.'),
      q('Celeste', 'I had this one framed. You look happy in it. So did she, once.'),
    );
  if (getKey(s, 'own.campaign') === 'taken') out.push(q('Celeste', 'And the station. Six metres high. They lit you so much better than Singapore ever did.'));
  if (theoInPlay10(s)) out.push(q('Celeste', 'Theo Marr is a sweet man. He asks such good questions. He should be more careful where he asks them.'));
  if (!out.length) out.push(q('Celeste', 'You have had a busy fortnight. I do admire a busy woman. She was never busy. She was only ever away.'));
  return [
    ...out,
    p('She waits for you to begin, chin on her hand, as if you were the one who had asked for this.'),
  ];
}

function adrianTurn(s: GameState): Block[] {
  return [
    ambushed(s)
      ? p('The queue has moved on and the street has filled up behind the glass. She drains her coffee, stands, drops a note on the table that would pay for everyone in the room, and bends to kiss your cheek.')
      : p('The plates go. The coffee comes back. When the waiter brings the bill she signs it without reading it, caps her pen, and looks at you with great fondness.'),
    q('Celeste', 'Eat your eggs, Adrian. You never did look after yourself.'),
    p('She says it the way you would say a name in a crowded room to see who turns around. You do not turn around. It doesn’t matter. She was not asking.'),
    t('Not her name. Not the one I wear. Adrian. She knows who is under the face. She has always known. Everything warm she has said to me, she said across that.'),
  ];
}

function breakfastChoices(s: GameState): C10Choice[] {
  if (!get10(s, 'breakfast'))
    return [
      offer10('breakfast-go', 'Go to the Lindqvist', 'She asked. Answering is the first thing you control.', 'breakfast', (x) => {
        set10(x, 'breakfast', 'went');
        return [
          p('The Lindqvist is a members’ club on the river whose curtains never open. At seven in the morning the breakfast room is lamps and dark wood and rain moving behind velvet, silver domes on a sideboard, and one other table occupied, by two men in good suits who do not eat.'),
          p('The doorman knows your name. So does the waiter, who takes your coat as if he has taken it before.'),
          p('Celeste is at the far table with her back to the wall, in grey silk with her hair up, reading a newspaper she folds away when she sees you. She rises, kisses you on both cheeks and holds your hands a moment longer than a greeting needs, the way she did on the terrace.'),
          q('Celeste', 'You came. I did wonder. She never came to breakfast when I asked. She came when she felt like it, and always hungry.'),
          ...celesteOpeners(x),
        ];
      }),
      offer10('breakfast-stay', 'Don’t go', 'Let her come to you, if she wants you that much.', 'breakfast', (x) => {
        set10(x, 'breakfast', 'ambushed');
        return [
          p('You don’t go. You dress anyway, properly, hair up and the face finished, because you know she will find you. At nine you take your coffee to the bakery on the corner and sit in the window with your back to the room.'),
          p('At ten past, the bell over the door rings and the queue turns to look, the way queues do for a certain kind of woman. Grey silk under a black coat, hair up, two coffees in her hands. Celeste Laurent sits down at your table as if you had been saving her the chair, in front of the whole street and the man who used to read his newspaper on the bench outside.'),
          q('Celeste', 'You didn’t come. So I did. I don’t mind at all, darling. I like your street. It is so much more public than my club.'),
          t('That is the point. She has just made breakfast something anyone could photograph.'),
          ...celesteOpeners(x),
        ];
      }),
    ];
  if (!get10(s, 'open')) {
    const listLine = c(s, 'c8.list') === 'read' ? ' Evelyn Vale, returned to inventory, reissued.' : '';
    return [
      offer10('open-case', 'Put the case on the table', 'Say her name back to her, and the week Evelyn vanished.', 'breakfast', (x) => {
        set10(x, 'open', 'case');
        return [
          ...(strongCase(x)
            ? [
                q('You', `Meridian Holdings. A board that meets somewhere nobody can subpoena the minutes.${listLine} And you, who knew the week she vanished, because you signed for it.`),
                p('For exactly one sentence, Celeste stops smiling. It is not fear. It is the look of a woman reading a figure on a bill that is higher than she expected, and deciding whether to query it.'),
                q('Celeste', 'You have been busy. Good. I hate having breakfast with people who haven’t done the reading.'),
                t('She did not deny a word of it. She did not need to. She has already decided what it is worth, and it is less than I hoped.'),
              ]
            : [
                q('You', 'You sit on Meridian’s board. You knew her. You knew the week she disappeared.'),
                p('Celeste listens with her head on one side and her coffee going cold, and when you finish she corrects you, gently, the way you would correct a child’s spelling.'),
                q('Celeste', 'It was a Thursday, darling, not the Wednesday. If you are going to accuse me of something, do at least get the day right.'),
                t('One wrong day, and she has made the whole thing sound like gossip. I brought her a rumour, and she knows it.'),
              ]),
          ...adrianTurn(x),
        ];
      }),
      offer10('open-evelyn', 'Play Evelyn', 'Let her talk to the woman she knew. Answer as her.', 'breakfast', (x) => {
        set10(x, 'open', 'evelyn');
        note10(x, 'orchids', 'Celeste says the first Evelyn hated orchids, and that she kept sending them anyway.', 'Celeste, at breakfast, to the woman she thought she was talking to');
        return [
          p('You take the chair facing the door, because something in the way she glanced at it tells you that is where Evelyn would have sat. You let your voice go lower and lazier, and you let her talk.'),
          q('Celeste', 'You always did take that chair. And you always ordered the eggs and never ate them. And you hated orchids. Did you know I knew? I kept sending them anyway. I liked that you had to decide what to do with something beautiful you didn’t want.'),
          q('You', 'I kept the last one.'),
          p('Something crosses her face, too quick to name, and is gone.'),
          t('It was so easy. I sat in her chair and wore her voice, and a woman who loved her, or owned her, or both, leaned across the table to talk to me. I did not have to pretend very hard. That is the part I will think about tonight.'),
          ...adrianTurn(x),
        ];
      }),
      offer10('open-silent', 'Eat, and let her talk', 'Say almost nothing. Make her fill the silence.', 'breakfast', (x) => {
        set10(x, 'open', 'silent');
        setKey(x, 'act3.board-day', 'first-thursday');
        return [
          p('You eat. The eggs are very good. You say almost nothing, and let the silence sit on the table between the cups like a third guest.'),
          p('Celeste fills it the way Theo would, beautifully, with stories about Singapore you did not ask for and people you have never met: a fund, a yacht, a dinner that ended in a swimming pool. You listen the way Adrian listened to acquisitions, for the sentence that doesn’t belong.'),
          q('Celeste', '…and of course the board is impossible, we only ever meet on the first Thursday, and half of them are asleep by the pudding—'),
          p('She stops, laughs at herself and moves on. She did not mean to give you that. You let her see nothing.'),
          t('The first Thursday. Whatever else happens, I know when they meet.'),
          ...adrianTurn(x),
        ];
      }),
    ];
  }
  const away = ambushed(s) ? 'She leaves first, and does not look back, because she does not need to.' : 'She leaves first. The two men who did not eat leave a minute after her.';
  return [
    offer10('adrian-composed', 'Don’t flinch', 'Give her nothing.', 'claimed', (x) => {
      set10(x, 'adrian', 'composed');
      return [
        p('You finish the eggs. You fold your napkin. You thank her for breakfast in the voice you have now, the one that is yours, and you do not let it change on the last word.'),
        q('Celeste', 'There you are. I did hope you would be good at this.'),
        p(away),
      ];
    }),
    offer10('adrian-asked', 'Ask her what she wants', 'Make her say it.', 'claimed', (x) => {
      set10(x, 'adrian', 'asked');
      return [
        q('You', 'What do you want?'),
        q('Celeste', 'Nothing yet, darling. That’s the lovely thing about owning something. You don’t have to want anything from it until you do.'),
        p('She touches your cheek on the way past, cool fingers, the way she did on the terrace: the way you would straighten a painting.'),
      ];
    }),
    offer10('adrian-walked', 'Walk out and leave her the bill', 'Leave first. Let her watch you go.', 'claimed', (x) => {
      set10(x, 'adrian', 'walked');
      return [
        p('You stand up in the middle of her sentence, take your coat yourself and walk out without looking back.'),
        q('Celeste', 'Same time next week?'),
        p('She says it to your back, lightly, loud enough for the room. You do not answer. You feel her watching you all the way to the door, and you know that she is smiling.'),
      ];
    }),
  ];
}

// ── Claimed ──

type Caller = 'sloane' | 'maya' | 'theo' | 'odile';
const voicemail: Record<Caller, Block> = {
  sloane: q('Sloane · voicemail', 'Call me back. That is not a request.'),
  maya: q('Maya · message', 'Call me when you can. Please.'),
  theo: q('Theo Marr · voicemail', 'Nice picture. We should talk. Not about the picture.'),
  odile: q('Odile Frayne · voicemail', 'Laurent’s people rang me! Ring me back, darling, immediately.'),
};
function callBody(s: GameState, who: Caller): Block[] {
  if (who === 'sloane')
    return [
      q('Sloane', 'Laurent is not a friend of this directorate. Or of yours. I assume you know that.'),
      ...(sloaneDoubts(s) ? [q('Sloane', 'Or is this another guess?')] : []),
      q('You', 'I know exactly what she is.'),
      q('Sloane', 'Then you also know that a photograph like that is a leash, and she has just shown the whole city who is holding it. Be careful what you let her walk you into.'),
      t('Sloane, warning me about leashes. She would know.'),
    ];
  if (who === 'maya')
    return [
      q('Maya', 'Who is Celeste Laurent, and why is she holding your wrist like she owns it?'),
      q('You', 'Not on this phone.'),
      q('Maya', 'Then on what phone? … Fine. Just — people like that don’t have friends. They have holdings. Don’t be one.'),
      t('Too late, Maya. And you are on her list too.'),
    ];
  if (who === 'theo')
    return [
      q('Theo Marr', 'I asked you on air who hands out lives. Is it her?'),
      q('You', 'Not on the phone, Theo.'),
      q('Theo Marr', 'Then not on the phone. But I’m not letting it go, and I would much rather be on your side of it when it comes out.'),
    ];
  return [
    q('Odile Frayne', 'Laurent is money, darling. Her people rang me an hour after the picture. They want you for the autumn campaign, the big one, and they want to pay in advance.'),
    t('Celeste has found my agent. Of course she has. She is making herself the hand that feeds me.'),
    q('You', 'Tell them I’ll think about it.'),
    q('Odile Frayne', 'Think quickly. Money like that has a very short attention span.'),
  ];
}
function claimedChoices(s: GameState): C10Choice[] {
  const callers: [Caller, string, string][] = [
    ['sloane', 'Answer Sloane first', 'She won’t wait for a second call.'],
    ...(mayaBack(s) ? ([['maya', 'Answer Maya first', 'She saw it. She is worried.']] as [Caller, string, string][]) : []),
    ...(theoInPlay10(s) ? ([['theo', 'Answer Theo first', 'He saw it. He is curious, which is worse.']] as [Caller, string, string][]) : []),
    ...(getKey(s, 'own.campaign') ? ([['odile', 'Answer Odile first', 'She saw money.']] as [Caller, string, string][]) : []),
  ];
  return callers.map(([who, label, hint]) =>
    offer10('call-' + who, label, hint, 'wall', (x) => {
      set10(x, 'first-call', who);
      const rest = callers.filter(([other]) => other !== who).map(([other]) => voicemail[other]);
      return [...callBody(x, who), ...(rest.length ? [p('The others you let go to voicemail, and listen to later, in the dark.'), ...rest] : [])];
    }),
  );
}

// ── The wall ──

function wallChoices(): C10Choice[] {
  return [
    offer10('wall-build', 'Put it all on the wall', 'Every debt you took on, in your own hand.', 'order', (x) => {
      set10(x, 'wall', 'built');
      // The order arrives with the next phase; its target is fixed now, so the board shows what she wants.
      set10(x, 'target', target10(x));
      return [
        p('You write a card for each of them and pin it, and run the thread from each card to the one in the middle that just says ME.'),
        ...wallLines(x).map((line) => p(line)),
        p('Then you stand back and look at it for a long time.'),
        t('I thought I would feel trapped, seeing it all at once. I don’t. For the first time since the clinic I can see the whole shape of what is being done to me, and a shape is a thing you can take apart.'),
        { kind: 'notice', text: 'The leverage board is now in your Records.' },
      ];
    }),
  ];
}

// ── The order ──

const asks: Record<Target10, (s: GameState) => string> = {
  tape: () => 'Your interview with Theo. The raw tape, uncut, before anybody edits it. My office asked him nicely and he said no. He won’t say no to you.',
  workroom: () => 'The contract you read on Julian’s wall, the one with our name on it. I would like to see what you saw. A photograph will do.',
  notes: (s) =>
    'Everything you found. On paper, in your hand. I do like a woman who writes things down.' +
    (c(s, 'c7.notes') === 'maya' ? ' And the copy you sent Maya, darling. Ask her for it back.' : ''),
};
const noThirdWay: Record<Target10, string> = {
  tape: 'If Theo trusted me, there might be a third way. He is curious about me. That is not the same thing.',
  workroom: 'If Julian trusted me enough to lie for me, there might be a third way. I have never asked him to.',
  notes: 'If I had a case she could not laugh at, or no paper to give her at all, there might be a third way. I don’t. Not this time.',
};

function orderBlocks(s: GameState): Block[] {
  const target = target10(s);
  return [
    p('The courier comes at eleven at night, which is its own message: a boy on a bicycle with a padded envelope and no card, who will not wait for a signature.'),
    p('Inside is a slim black phone, charged, with one contact saved in it. The contact is a single letter.'),
    q('C.', 'Maya Reyes. Compliance, level three. Her clearance renews in nine days. Renewals are such a formality. I would like one small thing from you, darling. Consider it a kindness to us both.'),
    t('Maya. She said Maya’s name. Nobody on that side of the table should know Maya’s name.'),
    q('C.', asks[target](s)),
    t(counterReady10(s, target) ? 'There might be a third way. There usually is, if you have built anything worth spending.' : noThirdWay[target]),
  ];
}

type Answer = 'comply' | 'refuse' | 'counter';
const labels: Record<Target10, Record<Answer, [string, string]>> = {
  tape: {
    comply: ['Get Theo’s tape for her', 'Maya keeps her clearance. Theo loses something he trusted you with.'],
    refuse: ['Don’t touch Theo’s tape', 'Keep your hands clean. She said what it would cost, and it isn’t you.'],
    counter: ['Tell Theo, and give her a tape he has cut', 'He is good at this. He will also be in it now.'],
  },
  workroom: {
    comply: ['Take the page from Julian’s wall', 'Maya keeps her clearance. Julian trusted you in that room.'],
    refuse: ['Leave Julian’s room alone', 'Keep your hands clean. She said what it would cost, and it isn’t you.'],
    counter: ['Tell Julian, and let her have a decoy', 'He can draft a page that lies. He will know who owns you.'],
  },
  notes: {
    comply: ['Give her your notes', 'Everything you found, in your own hand. Maya keeps her clearance.'],
    refuse: ['Keep your notes', 'Keep your work. She said what it would cost, and it isn’t you.'],
    counter: ['Give her notes you have poisoned', 'Two wrong details. If they surface, you will know who she told.'],
  },
};

function jobBody(s: GameState, target: Target10, answer: Answer): Block[] {
  const theoNight = intimate7(s, 'theo');
  const mayaCopy = c(s, 'c7.notes') === 'maya';
  if (target === 'tape') {
    if (answer === 'comply')
      return [
        p(
          theoNight
            ? 'Theo gave you a key to the loading-bay door the morning after, laughing, “so you never have to charm the night man.” You use it at midnight.'
            : 'The night producer remembers you from the show and lets you in for “a thing I left in the green room”, and does not think about it again.',
        ),
        p('The archive is two floors down, under the studio: shelves of drives and old tape in grey boxes, one work lamp, the hum of the air handling. Your segment is where anyone would file it, under the date, labelled in Theo’s untidy capitals: VALE — RAW — DO NOT RELEASE.'),
        p('The copy takes eleven minutes. You watch the progress bar and not the monitor, where your own face is asking, twenty-five times a second, who signs for a stolen life.'),
        t(theoNight ? 'He slept beside me. He did not turn the pad over. And I am stealing his tape with his key.' : 'He said no to her office. He would have said yes to me. That is exactly why she sent me.'),
        p('At one in the morning you hand a sealed envelope to the night doorman at the Lindqvist, who takes it without a word, as if he has been expecting it all his life.'),
      ];
    if (answer === 'refuse')
      return [
        p('You go as far as the loading bay. You stand in the rain with your hand on the door and think about Theo at his desk, turning a legal pad face down so you would not have to see it.'),
        p('Then you take your hand off the door and walk home the long way, along the river, and put the black phone in a drawer, and do not answer it when it lights up at two, or at three.'),
        t('I will not be her courier. Whatever she does to me for it, I will not be that.'),
        t('It is not me she will do it to.'),
      ];
    return [
      p('You call Theo at midnight and he answers on the first ring, as if he had been waiting for a call he could not name.'),
      q('You', 'Somebody wants the raw tape of my interview. The same somebody who rang your office. If I don’t get it for them, a friend of mine loses her job.'),
      p('A long silence on the line. When he speaks again, the television voice is gone.'),
      q('Theo Marr', 'Then let’s give them a tape.'),
      p('He meets you at the archive in a jumper and reading glasses, and for two hours you watch a man who edits for a living take your segment apart and put it back together without the one thing that matters. The question goes. So do four seconds either side of it. What is left is a long, charming conversation about dresses, with a seam in the timecode that only a professional would ever see.'),
      q('Theo Marr', 'Anyone who knows what they are looking at will know it has been cut. Which is rather the point, isn’t it? You want her to know you said no, without ever saying it.'),
      p('He sends it himself, from his own address, with a note that says only: “As requested. — T.M.”'),
      t('Theo is in this now. I put him in it. He is delighted, and that frightens me more than anything she has said.'),
    ];
  }
  if (target === 'workroom') {
    if (answer === 'comply')
      return [
        p('Julian meets you in the Helix lobby at ten at night because you asked him to, and does not ask why. He takes you up to the contracts room himself and stands close while you look at the wall, the way he did the first time.'),
        p('At twenty past, his phone goes: a call from Asia he has to take. He squeezes your shoulder and steps out into the corridor, and leaves you alone with the wall.'),
        p('The third contract from the left. You photograph the page with Meridian’s name on it in two frames, steadily, put your phone away, and are looking out at the city when he comes back in.'),
        q('Julian Mercer', 'Sorry. Where were we?'),
        q('You', 'Nowhere. I’m tired. Take me home?'),
        t('He trusts me alone in a room with his contracts. That is what she was buying.'),
        p('At one in the morning the photographs leave your phone for the black one, and the black one says: “Thank you, darling.”'),
      ];
    if (answer === 'refuse')
      return [
        p('You think about asking Julian to take you up to that room again, and about the way he put himself between you and the door when the guard came.'),
        p('You do not ask. You put the black phone in a drawer. It lights up at two, and at three, and you let it.'),
        t('I will not walk her into his rooms. Whatever it costs.'),
        t('It is not me it will cost.'),
      ];
    return [
      p('You tell Julian the truth, or enough of it: that someone who sits on a board above his counterparty wants the page you read on his wall, and that a friend of yours will lose her job if she does not get it.'),
      p('He listens without interrupting, the way he did at the audit, and when you finish he is quiet for a long moment.'),
      q('Julian Mercer', 'Then she can have a page.'),
      p('The next night the third contract from the left has a new schedule stapled behind its first sheet: a counterparty that does not exist, a figure wrong by one digit, a clause that would never survive a lawyer. He watches you photograph it with a face you cannot read.'),
      q('Julian Mercer', 'Now you owe me, and she owes us both a surprise. I find I don’t mind any of those things.'),
      t('He knows she owns me now, and who she is. That was the price, and he paid it for me without being asked.'),
    ];
  }
  if (answer === 'comply')
    return [
      p('You write it all out again at the kitchen table, everything you found, in your own hand, because that is what she asked for: Meridian, the board, the week Evelyn vanished, the names. It takes until two. Your hand aches. It feels like signing a confession to somebody else’s crime.'),
      ...(mayaCopy
        ? [
            p('Then, in the morning, you call Maya.'),
            q('You', 'That envelope I sent you. I need it back. It was a mistake to put you in it.'),
            q('Maya', 'Are you all right?'),
            q('You', 'I’m fine. I just want you out of it.'),
            p('She brings it to the counter at lunch, sealed, and pushes it across to you, and believes you. That is the worst part. She believes you, and she is relieved.'),
            t('I lied to Maya to get my own evidence back, so that I could hand it to the woman who is threatening her. There is no version of that sentence I can live with.'),
          ]
        : []),
      p('You leave the notes with the doorman at the Lindqvist. The black phone says, at once: “Beautiful handwriting. She had terrible handwriting.”'),
    ];
  if (answer === 'refuse')
    return [
      p('You take the notes out of wherever you keep them and look at them for a long time. Then you put them back.'),
      p('The black phone lights up at two, and at three. You leave it face down under Celeste’s card on the wall.'),
      t('She wants my work. She can’t have it. Whatever she does instead, she does to me.'),
      t('Except she won’t. She said Maya’s name for a reason.'),
    ];
  return [
    p('You write the notes again from memory, which is easy, because it is all in your head, the way Adrian’s filings always were. You write them almost exactly as they are.'),
    p('Almost. Two details are wrong: a registry date moved by a week, and a company name with one letter changed, the kind of mistake a tired woman makes at two in the morning. If either of them ever turns up somewhere, you will know exactly who Celeste passed your notes to.'),
    ...(mayaCopy ? [p('Maya’s copy stays exactly where it is. You do not ask for it back. If Celeste asks, you will tell her Maya burned it, and she will not be able to prove otherwise.')] : []),
    t('She wanted my handwriting. She can have it. It lies beautifully.'),
  ];
}

function orderChoices(s: GameState): C10Choice[] {
  const target = target10(s);
  const answers: Answer[] = ['comply', 'refuse', ...(counterReady10(s, target) ? (['counter'] as Answer[]) : [])];
  return answers.map((answer) =>
    offer10('order-' + answer, labels[target][answer][0], labels[target][answer][1], 'answer', (x) => {
      set10(x, 'target', target);
      set10(x, 'answer', answer === 'comply' ? 'complied' : answer === 'refuse' ? 'refused' : 'countered');
      if (answer === 'comply') {
        setKey(x, 'act3.maya-clearance', 'renewed');
        set10(x, 'betrayed', target === 'tape' ? 'theo' : target === 'workroom' ? 'julian' : c(x, 'c7.notes') === 'maya' ? 'maya' : 'none');
      }
      if (answer === 'refuse') setKey(x, 'act3.maya-clearance', 'suspended');
      if (answer === 'counter') {
        setKey(x, 'act3.maya-clearance', 'renewed');
        setKey(x, 'act3.celeste-surprised', 'once');
        if (target === 'tape') setKey(x, 'act3.ally.theo', 'in');
        if (target === 'workroom') setKey(x, 'act3.ally.julian', 'in');
        if (target === 'notes') set10(x, 'poison', 'planted');
      }
      note10(
        x,
        'order',
        `Celeste’s first order (${target}): Evelynn ${answer === 'comply' ? 'complied' : answer === 'refuse' ? 'refused' : 'found a third way'}. The named threat was Maya’s clearance renewal.`,
        'The black phone with one contact',
      );
      return jobBody(x, target, answer);
    }),
  );
}

// ── What it cost ──

const celesteReply: Record<Target10, string> = {
  tape: 'You edit well, darling. So does he.',
  workroom: 'Julian always did draft beautiful fictions. Tell him I enjoyed this one.',
  notes: 'Such a tidy hand. Such a tired one. I shall read it very carefully.',
};

function answerBlocks(s: GameState): Block[] {
  const answer = get10(s, 'answer');
  const target = get10(s, 'target') as Target10;
  if (answer === 'refused')
    return mayaClose(s)
      ? [
          p('At eight the next morning Maya calls. Her voice is very steady, the way it goes when it is not.'),
          q('Maya', 'Somebody pulled my clearance this morning. Suspended pending review, no reason given. They asked me three questions in the review room, and two of them were about you.'),
          t('It is not me she hurt. It is never going to be me.'),
        ]
      : [
          p('Maya does not call. You hear it at noon from Daniel, of all people, who rings for the first time in months to say, carefully, that Maya’s clearance was suspended this morning, and that someone in the review room asked about “Adrian’s friend from the magazine”.'),
          t('She didn’t call me. She kept me out of it. She is protecting me, and I am the reason she needs protecting.'),
        ];
  if (answer === 'complied') {
    const betrayed = get10(s, 'betrayed');
    return [
      p('Maya’s renewal comes through two days early, without a word. Nobody thanks you. Nobody knows there was anything to thank you for.'),
      p('A second orchid arrives in the afternoon, white, in a black pot, with a card that has one word on it in the looping hand: “Lovely.”'),
      t('The leverage held. It will hold next time too, and she will ask for more, and I have just shown her what I will do for Maya.'),
      ...(betrayed === 'theo'
        ? [p('Theo sends a message that night, cheerful, about nothing: a restaurant he wants to take you to. He doesn’t know yet.')]
        : betrayed === 'julian'
          ? [p('Julian sends flowers, which he has never done, with a card that says only “For last night.” He doesn’t know yet.')]
          : []),
    ];
  }
  return [
    p('Maya’s renewal comes through on the ninth day, ordinary and late, the way renewals do.'),
    p('The black phone lights up once, at midnight.'),
    q('C.', celesteReply[target]),
    t('Not angry. Interested. She has stopped looking at me as something she owns and started looking at me as someone she is playing. That is better. It is also much more dangerous.'),
  ];
}

function answerChoices(s: GameState): C10Choice[] {
  const answer = get10(s, 'answer');
  const reply = (id: string, label: string, hint: string, key: string, body: Block[]) =>
    offer10(id, label, hint, 'invitation', (x) => {
      set10(x, key, id.replace(/^(maya|reply|wall)-/, ''));
      return body;
    });
  if (answer === 'refused') {
    if (!mayaClose(s))
      return [
        reply('maya-call', 'Call Maya anyway', 'She kept you out of it. Don’t let her.', 'maya-told', [
          q('You', 'I heard. It’s because of me. I can’t tell you why yet. I’m going to fix it.'),
          q('Maya', 'I know it’s because of you. I worked that out before Daniel did. Fix it, then. And then tell me why.'),
        ]),
        reply('maya-leave', 'Leave her to it', 'She chose to keep you out. Respect it, for now.', 'maya-told', [
          p('You do not call. You write her name on a card and pin it next to Celeste’s, and run the red thread between them, and sit on the edge of the bed looking at it until it is light.'),
        ]),
      ];
    return [
      ...(mayaKnowsWho(s)
        ? [
            reply('maya-truth', 'Tell Maya the truth', 'Who, and why. She knows who you are; she can carry this.', 'maya-told', [
              q('You', 'It’s because of me. A woman called Celeste Laurent wanted something from me, and I said no, and this is how she answers. I am going to fix it.'),
              q('Maya', '…Okay. Okay. Then tell me what I can do, and don’t you dare tell me nothing.'),
              t('She is not angry. She is enlisting. I do not deserve her.'),
            ]),
          ]
        : []),
      reply('maya-part', 'Tell her it’s because of you, not why', 'A true thing, and a wall around it.', 'maya-told', [
        q('You', 'It’s because of me. I can’t tell you why yet. I am going to fix it.'),
        q('Maya', 'You’d better. And then you’d better tell me why.'),
      ]),
      reply('maya-nothing', 'Tell her nothing', 'Keep her out of it. She will know you are lying.', 'maya-told', [
        q('You', 'I’m so sorry, Maya. I don’t know.'),
        p('She doesn’t believe you. She lets you have it anyway, and hangs up, and the silence afterwards is the worst thing on the wall.'),
      ]),
    ];
  }
  if (answer === 'complied')
    return [
      reply('wall-move', 'Move Celeste’s card closer to the middle', 'An honest measurement.', 'reply', [
        p('You move Celeste’s card an inch closer to the one that says ME. It is not a decision. It is an honest measurement.'),
      ]),
    ];
  return [
    reply('reply-silence', 'Say nothing', 'Let her wonder what else you have.', 'reply', [p('You do not answer. Let her wonder what else you have.')]),
    reply('reply-orchid', 'Send her an orchid', 'Your own, in your own hand.', 'reply', [
      p('In the morning you send an orchid to the Lindqvist, white, in a black pot, with a card in your own hand: “Breakfast was lovely. — E.” Let her decide which E.'),
    ]),
  ];
}

// ── The invitation, and a chosen evening ──

type Partner10 = 'julian' | 'theo' | 'sebastian';
const who10: Record<Partner10, string> = { julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian' };
/** A partner she already chose, who was not betrayed this chapter (design §4.7). */
export function eveningPartners10(s: GameState): Partner10[] {
  const betrayed = get10(s, 'betrayed');
  const out: Partner10[] = [];
  const julianRomance =
    c(s, 'c7.evening') === 'julian' || !!(get5(s, 'intimacy') && get5(s, 'want-target') === 'julian') || !!get5(s, 'mutual-interest') || !!c(s, 'c4.mutual-interest');
  if (julianRomance && betrayed !== 'julian') out.push('julian');
  if ((c(s, 'c7.theo') === 'curious' || c(s, 'c7.exit') === 'theo' || c(s, 'c7.evening') === 'theo') && betrayed !== 'theo') out.push('theo');
  if (intimate7(s, 'sebastian')) out.push('sebastian');
  return out;
}

function eveningInvite(s: GameState, partner: Partner10): Block[] {
  if (partner === 'julian')
    return [
      p('Julian’s message comes at ten: “I saw the photograph. I don’t care who she is to you. I would like to see you, if you would like to be seen.”'),
      getKey(s, 'act3.ally.julian')
        ? p('When he opens the door on the forty-first floor he looks at you for a long moment: a man who knows now exactly whose leash you are on, and has asked you here anyway.')
        : p('His apartment is on the forty-first floor. He has taken his tie off, and he looks at you the way he always has, as if you were a problem he would very much like to have.'),
      q('Julian Mercer', 'No business tonight. Tell me what you want.'),
    ];
  if (partner === 'theo')
    return [
      p('Theo’s message: “Come and have a drink with a man who is not going to ask you a single question.” You laugh out loud in the empty flat.'),
      getKey(s, 'act3.ally.theo')
        ? p('He opens the door above the studio in his jumper with the reading glasses pushed up into his hair, and the look he gives you is the look of a man who helped you lie to a very dangerous woman and has not stopped smiling since.')
        : p('The flat above the studio: the river along one side, a hundred books nobody has arranged, and the legal pad still face down on the desk.'),
      q('Theo Marr', 'No cameras. No questions. Tell me what you want tonight.'),
    ];
  return [
    p('A message from a number saved under a single letter: “Between cities. One night. Harbour, the late set. Come and let me play you something that isn’t about anything.”'),
    p('He plays the middle section looking at you, and afterwards, in the corridor behind the stage, he does not kiss you straight away. He looks at your face first, as if checking it is still yours.'),
    q('Sebastian', 'You look like somebody has been leaning on you. Tell me what you want tonight, and nobody leans.'),
  ];
}
const scopeReply10: Record<Partner10, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that is the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  theo: { 'no-sex': 'Then that is what we do. I am very good at wanting things I don’t get.', sex: 'Yes. And the moment you want to stop, we stop.' },
  sebastian: { 'no-sex': 'Good. I would like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stay10: Record<Partner10, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the window with the whole city behind you and stops exactly where you tell him to, and holds you there, half-undressed, his hand warm on your bare back, for a very long time.')],
    sex: [
      p('The dress goes, and his shirt, and the week goes with them. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'),
      p('What happens next stays on the forty-first floor. The scene fades.'),
    ],
  },
  theo: {
    'no-sex': [p('He kisses you slowly by the window with the river going past, and when you tell him where tonight stops he says “good” and means it, and you fall asleep across his unmade bed with his hand spread on your stomach.')],
    sex: [
      p('The careful television manner goes all at once, and underneath it is someone hungrier and much less sure of himself, which you like better. He asks once more, low. You answer by pulling him down with you.'),
      p('What happens next stays above the studio. The scene fades.'),
    ],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says out loud what he likes about what he finds, and stays exactly on his side of the line you drew, and it is very, very good.')],
    sex: [
      p('He undoes the dress slowly and says out loud what he likes. The lamp stays on. When he asks once more whether you are sure, you answer by drawing him down with you.'),
      p('What happens next stays in that room. The scene fades.'),
    ],
  },
};

function invitationBlocks(s: GameState): Block[] {
  return [
    p('The invitation comes with the next orchid, as you knew it would, on heavy card in the looping green hand.'),
    q('The card', 'The first Thursday. The Vesper Gallery, eight o’clock. Some of our clients would love to meet you. Wear the green. Bring nobody. — C.'),
    t(
      getKey(s, 'act3.board-day')
        ? 'The first Thursday. The day the board meets. She has invited me to the one evening of the month when all of them are in the same city.'
        : 'Some of our clients. She is going to show me to them.',
    ),
  ];
}

function invitationChoices(s: GameState): C10Choice[] {
  const open = get10(s, 'evening-open');
  if (open) {
    const partner = open.replace('-room', '') as Partner10;
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer10(`evening-${partner}-${id}`, label, hint, 'invitation', (x) => {
          set10(x, 'evening-open', partner + '-room');
          set10(x, 'evening-scope', id);
          note10(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who10[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who10[partner], scopeReply10[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer10('evening-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c10.evening-open'];
          set10(x, 'evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and go home alone, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get10(s, 'evening-scope') as 'no-sex' | 'sex';
    return [
      offer10('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c10.evening-open'];
        set10(x, 'evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He calls you a car and walks you down to it and does not ask why, and you are more grateful for that than for anything else this week.')];
      }),
      offer10('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c10.evening-open'];
        set10(x, 'evening-outcome', 'intimate-' + scope);
        return [...stay10[partner][scope], p('For a few hours, nobody holds anything over you. You chose that too.')];
      }),
    ];
  }
  const partners = eveningPartners10(s);
  // Answer the card first; with a partner she already chose, the evening is offered after it.
  if (!get10(s, 'invitation'))
    return [
      offer10('invite-accept', 'Tell her you’ll come', 'Walk in on her invitation, on your own terms.', partners.length ? 'invitation' : 'complete', (x) => {
        set10(x, 'invitation', 'accepted');
        return [q('You · to C.', 'I’ll be there.'), p('The reply comes at once: “I know.”')];
      }),
      offer10('invite-wait', 'Let it sit', 'The Thursday will come whether you answer or not.', partners.length ? 'invitation' : 'complete', (x) => {
        set10(x, 'invitation', 'pending');
        return [p('You leave the card on the table beside the orchid and do not answer. She does not ask again. She doesn’t need to.')];
      }),
    ];
  const name: Record<Partner10, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian' };
  return [
    ...partners.map((partner) =>
      offer10('evening-' + partner, `Go to ${name[partner]}`, 'A night you choose, in a week where everything else was chosen for you.', 'invitation', (x) => {
        set10(x, 'evening', partner);
        set10(x, 'evening-open', partner);
        return eveningInvite(x, partner);
      }),
    ),
    offer10('close-end', 'Stay in tonight', 'Chapter 10 ends here.', 'complete'),
  ];
}

// ── Blocks and choices ──

export function chapter10Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter10') return [];
  if (s.phase === 'breakfast')
    return [
      p('You wake before the alarm. The orchid is on the kitchen table where you put it at midnight, in its black pot, the card still tucked into the moss. It is the only thing in the flat that looks rested.'),
      p('At six your phone lights with a message from a number you have never saved: “The Lindqvist. Seven. They will know your name at the door.”'),
      t('She is not asking whether I will come. She is telling me how easy she has made it.'),
    ];
  if (s.phase === 'claimed')
    return [
      p(
        ambushed(s)
          ? 'By noon the photograph is everywhere that matters: the two of you in the window of the bakery on your street, the queue behind you like a crowd scene, her hand on your wrist, both of you laughing at something neither of you said.'
          : 'By noon the photograph is everywhere that matters: the two of you at the Lindqvist, lamplight and silver, her hand on your wrist, both of you laughing at something neither of you said.',
      ),
      q('The caption', 'Old friends. Evelynn Vale and Celeste Laurent, reunited.'),
      t('She has put her arm around me in front of the whole city. Anyone I tell about her now will have seen this picture first.'),
      p('Then the phone starts, and does not stop.'),
    ];
  if (s.phase === 'wall')
    return [
      p('That night you do what Adrian did with a case that would not come apart in his hands. You take the mirror off the wardrobe door and lean it face in against the wall. You do not need to watch her while you work.'),
      p('Index cards from the stationer on the corner. A reel of red thread from the sewing kit that came with the flat. A box of pins. The back of the wardrobe door, which is wood and takes a pin, and faces the bed.'),
      t('Who holds what. What they want. What they have threatened. And what I hold back. Adrian would have called it a risk register. I am going to call it the wall.'),
    ];
  if (s.phase === 'order') return orderBlocks(s);
  if (s.phase === 'answer') return answerBlocks(s);
  if (s.phase === 'invitation') return invitationBlocks(s);
  if (s.phase === 'complete') {
    const outcome = get10(s, 'evening-outcome');
    return [
      ...(outcome?.startsWith('intimate') ? [p('You get home at dawn. The wall is where you left it. The orchid has opened another flower in the night.')] : []),
      t('She knows my name. Both of them. And for the first time since the clinic I know exactly what I am being asked to be. That, at least, is something to push against.'),
    ];
  }
  return [];
}

export function chapter10Choices(s: GameState): C10Choice[] {
  if (!chapter10Playable(s)) return [];
  if (s.scene === 'chapter9' && s.phase === 'complete' && ownPower(s))
    return [offer10('begin', 'Answer the orchid', 'Morning. She is expecting you.', 'breakfast')];
  if (s.scene !== 'chapter10') return [];
  if (s.phase === 'breakfast') return breakfastChoices(s);
  if (s.phase === 'claimed') return claimedChoices(s);
  if (s.phase === 'wall') return wallChoices();
  if (s.phase === 'order') return orderChoices(s);
  if (s.phase === 'answer') return answerChoices(s);
  if (s.phase === 'invitation') return invitationChoices(s);
  return [];
}

export function applyChapter10Choice(state: GameState, id: string): GameState {
  const choice = chapter10Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter10';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter10.${s.phase}` as NodeId, blocks: chapter10Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER10_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
