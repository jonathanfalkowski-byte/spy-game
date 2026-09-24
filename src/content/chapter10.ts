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

// ── Breakfast (the set piece: docs/story/scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md §breakfast) ──
// One continuous scene: arrival → the menu → her reading of your week → how you open → a question about the
// first Evelyn → her question back → "Adrian" → how you take it. Every beat is held in a c10.* sub-state.

/** Dawn, before the choice to go (the breakfast phase's opening blocks). */
function dawnBlocks(): Block[] {
  return [
    p('You wake before the alarm, in the grey hour when the tower across the river is still lit floor by floor, as if nobody had told it the night was over. The flat smells faintly of something green and expensive. It takes you a moment to remember why.'),
    p('The orchid is on the kitchen table where you put it at midnight, in its black pot, the card still tucked into the moss. In the half-light the flower looks less like a gift than like something that has been set down to watch you.'),
    p('At six your phone lights with a message from a number you have never saved.'),
    q('Unknown number', 'The Lindqvist. Seven. They will know your name at the door.'),
    t('She is not asking whether I will come. She is telling me how easy she has made it, and how hard it would be to explain, later, why I did not.'),
    p('You make coffee you do not drink and stand at the window with it, watching the street wake up underneath you: the bakery shutters going up, the newspaper bench still empty, a delivery van idling where it should not. Ordinary. Everything this morning is going to be ordinary, and you are going to have to walk through all of it with her name in your mouth.'),
  ];
}

const lindqvist = (): Block[] => [
  p('You dress for her the way you would dress for a board. The charcoal, because it is the most expensive thing you own and looks it. The heels. Hair up and pinned hard, the face finished and then finished again. In the wardrobe mirror a woman you are still learning looks back at you and does not flinch, and you decide to take that as advice.'),
  p('The taxi goes the long way along the river because of the rain. You watch the towers slide past, half of them, if the business pages are right, built with money nobody can quite trace, and you wonder in how many of them she has had breakfast.'),
  p('The Lindqvist has no sign. It has a black door between a bank and a jeweller, a brass bell nobody rings, and a doorman in a grey coat who opens the door before you reach it.'),
  q('Doorman', 'Ms Vale. You’re expected.'),
  p('Inside it is warm and very quiet: a corridor of dark wood and old portraits of men who owned things, carpet deep enough to lose a footstep in, and at the end of it the breakfast room, whose curtains never open. At seven in the morning it is lamps and linen and rain moving behind velvet, silver domes on a long sideboard, a fire someone has lit for nobody. One other table is occupied, by two men in good suits who have coffee in front of them and do not drink it.'),
  p('The waiter knows your name too. He takes your coat as if he has taken it before, and perhaps, from someone, he has.'),
  p('Celeste is at the far table with her back to the wall and the whole room in front of her: tall even sitting down, the lamplight warm on her dark skin, her hair cropped close to her head, grey silk at her throat. She is reading the financial pages, and folds them away when she sees you, not quickly, the way you would close a book you intend to finish.'),
  t('Across a room at the Glass House she was warm and a little drunk and delighted to see me. In this light, at this hour, she looks like someone who has never been drunk in her life.'),
  p('She rises. She kisses you on both cheeks and holds your hands a moment longer than a greeting needs, her thumbs resting on the backs of your wrists, the way she did on the terrace. Her hands are cool. She smells of rain and something bitter, like the inside of an orange.'),
  q('Celeste', 'You came. I did wonder. She never came to breakfast when I asked. She came when she felt like it, and always hungry, and always late, and always forgiven.'),
  p('She sits. You sit. The two men at the other table do not look up, which is how you know they are listening.'),
  q('Celeste', 'Shall I order for you? I know what you like.'),
];

const bakery = (): Block[] => [
  p('You don’t go. You dress anyway, properly: the charcoal, the heels, hair up and pinned hard, the face finished. You know she will find you, and you would rather be found looking like someone who expected it.'),
  p('At nine you take a book you will not read down to the bakery on the corner and sit at the window table with your back to the room, where you can see the street and the street can see you. The girl behind the counter brings your coffee without being asked. Across the road the man with the newspaper is on his bench, turning a page he has not read.'),
  p('At ten past, the bell over the door rings and the queue turns to look, the way queues do for a certain kind of woman. Tall, dark-skinned, her hair cropped close to her head, grey silk under a long black coat the rain has not been allowed to touch. Two coffees in a paper tray.'),
  p('Celeste Laurent sits down at your table as if you had been saving her the chair, in front of the whole street. She takes the book out of your hands, reads the spine, and gives it back.'),
  t('At the Glass House she was warm and a little drunk and delighted to see me. In daylight, in my bakery, she looks like someone who has never been drunk in her life.'),
  q('Celeste', 'You didn’t come. So I did. I don’t mind at all, darling. I like your street. It is so much more public than my club.'),
  t('That is the point. She has made breakfast something anyone could photograph, and she has done it on my doorstep, in my bakery, with my coffee going cold.'),
  p('Across the road, the man with the newspaper has stopped pretending to read.'),
  q('Celeste', 'I brought you a coffee. I know how you take it.'),
];

function celesteReads(s: GameState): Block[] {
  const out: Block[] = [];
  const card = c(s, 'c7.card');
  if (card === 'kept' || card === 'studied')
    out.push(
      q('Celeste', 'You kept my card. She never kept anything. I used to find my letters in hotel bins, unopened. You have better manners than she did. Or a better reason.'),
      p('She says it lightly, buttering toast she will not eat. You have told nobody where you keep that card.'),
    );
  else if (card === 'burned')
    out.push(
      q('Celeste', 'You burned my card. Good. It was hers, not yours. I would have thought a little less of you for keeping another woman’s post.'),
      p('You told nobody that either. The smell stayed in the kitchen for an hour. Somebody, it seems, was in the kitchen with it.'),
    );
  const terrace = c(s, 'c9.terrace');
  if (terrace === 'turn')
    out.push(q('Celeste', 'You asked me whether I liked looking at her. I have thought about it since. The answer is still yes, and it still isn’t the one you think.'));
  else if (terrace === 'truth') out.push(q('Celeste', 'You told me you liked being her, some days. I have thought about that more than I should.'));
  const beat = c(s, 'c9.name-beat');
  if (beat === 'walk')
    out.push(
      q('Celeste', 'You walked past my building on Tuesday. I waved. You didn’t see.'),
      p('It was midnight, and raining, and you were on the far pavement in a dark coat. She is telling you she can see that far.'),
    );
  else if (beat === 'photos')
    out.push(
      p('She slides a photograph across the cloth: the ninth frame from the Glass House, you laughing at something Marcus said, and in the background, out of focus, Celeste at the window.'),
      q('Celeste', 'I had this one framed. You look happy in it. So did she, once.'),
    );
  if (c(s, 'c8.breakin') === 'trap')
    out.push(
      q('Celeste', 'Talc on the floor, darling. A hair across the wardrobe. How very nineteenth century. I nearly left you a note.'),
      p('You think of the print in the talc: narrow, a good shoe, a woman’s size, pointing in. You look, without meaning to, at her shoes under the table. She lets you.'),
    );
  if (c(s, 'c7.notes') === 'hide') out.push(q('Celeste', 'And you hide things in coats. So did she. It must be something in the lining.'));
  if (intimate7(s, 'julian')) out.push(q('Celeste', 'How is Julian’s view? I have always thought the forty-first floor was a little much. He likes to be looked up to.'));
  else if (intimate7(s, 'sebastian')) out.push(q('Celeste', 'And a cellist. How romantic. They are always leaving on a train, aren’t they? It makes them so easy to love.'));
  if (getKey(s, 'own.campaign') === 'taken') out.push(q('Celeste', 'And the station. Six metres high. They lit you so much better than Singapore ever did.'));
  if (theoInPlay10(s))
    out.push(
      q('Celeste', 'Theo Marr is a sweet man. He asks such good questions. He should be more careful where he asks them.'),
      p('She says his name the way you would mention the weather somewhere the weather kills people.'),
    );
  if (!out.length) out.push(q('Celeste', 'You have had a busy fortnight. I do admire a busy woman. She was never busy. She was only ever away.'));
  return [
    p('She talks while you eat, easily, the way people talk to someone they have known for years. It takes you a minute to understand that every sentence is an item on a list she has already checked.'),
    ...out,
    p('Then she stops, and waits for you to begin, chin on her hand, as if you were the one who had asked for this.'),
  ];
}

function menuChoices(s: GameState): C10Choice[] {
  const bak = ambushed(s);
  const menu = (id: string, label: string, hint: string, body: Block[]) =>
    offer10('menu-' + id, label, hint, 'breakfast', (x) => {
      set10(x, 'menu', id);
      return [...body, ...celesteReads(x)];
    });
  return bak
    ? [
        menu('let', 'Drink the coffee she brought', 'Let her show you what she knows.', [
          p('You drink it. It is sweet, much sweeter than you take it, with cinnamon on the foam, and you manage not to make a face.'),
          q('Celeste', 'Two sugars and cinnamon. She took it like a child. I used to tease her about it.'),
          t('It is not how I take it. It is how she did. Celeste knows that, and wanted to watch me drink it anyway.'),
        ]),
        menu('own', 'Buy your own coffee', 'Give her one thing she didn’t predict.', [
          p('You leave her coffee where it is, go to the counter, buy your own, black, and bring it back and sit down again.'),
          q('Celeste', 'Oh, that’s new. She took two sugars and cinnamon. I used to tease her about it.'),
          p('She moves the untouched cup an inch toward the window, as if setting a place for someone who has not arrived.'),
          t('One thing she didn’t predict. I’ll take it. I may not get another.'),
        ]),
      ]
    : [
        menu('let', 'Let her order for you', 'Let her show you what she knows.', [
          p('You tell her yes. She does not look at the menu. She tells the waiter two soft-boiled eggs, toast cut into soldiers, the Assam, milk on the side, and a small dish of the bitter marmalade, and the waiter writes none of it down.'),
          q('Celeste', 'She always ordered the eggs, and never ate them. I used to eat them for her. I think she ordered them so that I would.'),
          p('The eggs come in silver cups. Yours sits in front of you with its hat still on, and you understand that you are being watched to see whether you will take it off.'),
          t('I am eating her breakfast, at her table, with her friend. The only thing in this room that is mine is the fork, and I am not sure about the fork.'),
        ]),
        menu('own', 'Order for yourself', 'Give her one thing she didn’t predict.', [
          p('You smile, pick up the menu and order for yourself: black coffee and dry toast, nothing else, the breakfast Adrian ate standing up at the counter for eleven years.'),
          p('Celeste watches you do it with great interest, the way you would watch a card trick you have seen before, performed by someone new.'),
          q('Celeste', 'That’s new. She never once ate toast in her life. She said it was what the English had instead of hope.'),
          t('One thing she didn’t know. I’ll take it. I may not get another.'),
        ]),
      ];
}

function adrianTurn(s: GameState): Block[] {
  const bak = ambushed(s);
  const line = bak ? 'Drink your coffee, Adrian.' : get10(s, 'menu') === 'own' ? 'Eat your toast, Adrian.' : 'Eat your eggs, Adrian.';
  return [
    ...(bak
      ? [
          p('The queue has moved on and the street has filled up behind the glass. She drains her coffee, stands, drops a note on the table that would pay for everyone in the room, and bends to kiss your cheek.'),
          p('Across the road the man with the newspaper folds it and gets up and goes, as if a shift has ended.'),
        ]
      : [
          p('The plates go. The coffee comes back. The fire settles. One of the two men at the other table gets up and leaves, and the other stays, and you understand that one of them was for her and one of them was for you.'),
          p('When the waiter brings the bill she signs it without reading it, caps her pen, lays it exactly parallel to the edge of the table, and looks at you with great fondness.'),
        ]),
    p('For a while she talks about nothing, and it takes you too long to notice what the nothing is made of.'),
    q('Celeste', 'Axiom was always so bad at promotions. Some poor analyst does half the job for three years and watches it go to someone called Priya. And that dreadful Benton, walking to people’s desks with his little slate, as if he were delivering a baby. I never understood why anyone stayed.'),
    p('She says it the way you would talk about a film you had both seen. You did see it. You were in it.'),
    q('Celeste', 'And that flat. Did they ever fix the crease in the sofa? Eleven years, and that crease.'),
    t('Somebody wrote my life down for her, down to the sofa. She has read it the way she reads the financial pages: all of it, and without hurrying.'),
    q('Celeste', 'I won’t threaten you, darling. I never threaten anyone; it is so vulgar, and it gives people time to prepare. Things will simply happen, and you will notice them, and you will know that I noticed first.'),
    q('Celeste', `${line} You never did look after yourself.`),
    p('She says it the way you would say a name in a crowded room to see who turns around. You do not turn around. It doesn’t matter. She was not asking.'),
    t('Not her name. Not the one I wear. Adrian. She knows who is under the face. She has always known. Everything warm she has said to me, she said across that.'),
    p('Your hand is quite steady on the cup. You notice that, distantly, as if it were somebody else’s hand, and you are grateful to whoever taught it.'),
  ];
}

function bridge(s: GameState): Block[] {
  return [
    ambushed(s)
      ? p('Behind the counter the girl pretends not to watch you. Celeste stirs her coffee, sets the spoon down with great precision, and leans back as if the bakery were hers.')
      : p('The waiter clears the first plates. Celeste refills your cup herself, which she has probably not done for anyone in years, and leans back.'),
    q('Celeste', 'Ask me something, darling. You have been dying to. Everyone does, eventually.'),
  ];
}

/** The question about the woman she knew: held in c10.asked; then her question back. */
function askChoices(): C10Choice[] {
  const ask = (id: string, label: string, hint: string, body: Block[]) =>
    offer10('ask-' + id, label, hint, 'breakfast', (x) => {
      set10(x, 'asked', id);
      return [
        ...body,
        q('Celeste', 'My turn. You owe me one; everyone does, eventually.'),
        p('She sets her cup down and looks at you properly, the way nobody at this table has looked at you yet this morning.'),
        q('Celeste', 'When you dream, darling, are you him or are you her?'),
      ];
    });
  return [
    ask('happened', 'Ask what happened to her', 'The one thing she won’t want to say.', [
      q('You', 'What happened to her?'),
      q('Celeste', 'She stopped being useful, darling, and then she stopped being anywhere. People do. You of all people know how quickly a life can be packed into a box and labelled.'),
      p('She looks past you at the window and the rain, and for a moment her face is simply tired.'),
      q('You', 'Did you sign for it?'),
      q('Celeste', 'I sign for a great many things. I read almost none of them. That was the one I read twice.'),
      p('She says it without any change in her voice, and then reaches across and straightens your knife, which did not need straightening.'),
      t('Twice. She read it twice, and signed it anyway, and then sent me an orchid.'),
      q('You', 'Where is she now?'),
      q('Celeste', 'Where do you keep a coat you have stopped wearing, darling? Somewhere dry. Somewhere you can find it again, if the fashion comes back.'),
      t('Returned to inventory. She won’t say it. She doesn’t have to.'),
    ]),
    ask('like', 'Ask what she was like', 'Let her talk about someone she loved.', [
      q('You', 'What was she like?'),
      q('Celeste', 'Impossible. Late for everything. She could walk into a room of men who wanted her dead and leave with two of them asking her to dinner. She laughed with her whole face. You do it with half of yours, which is better, frankly, for the work.'),
      q('Celeste', 'She was the only person I ever met who was frightened of nothing and sensible about everything. It’s a terrible combination. It gets you killed, or promoted.'),
      q('Celeste', 'She used to steal the sugar cubes from here. Put them in her coat pockets, like a child. I never knew what she did with them.'),
      p('Celeste takes two cubes from the silver bowl with the tongs and sets them, very precisely, beside your cup.'),
      t('She is not telling me about Evelyn. She is showing me how much of her she still has.'),
      q('You', 'Did you love her?'),
      p('For the first time this morning, Celeste does not answer at once.'),
      q('Celeste', 'I was very fond of her. It isn’t the same thing, and it lasts longer.'),
    ]),
    ask('meridian', 'Ask about Meridian', 'Make her say what it is, out loud.', [
      q('You', 'Tell me what Meridian is. In your words.'),
      q('Celeste', 'Meridian is a very dull company that does very interesting work. We make people who can go where people can’t. You are one of our better ones. You should be proud; so few products get to read their own specifications.'),
      p('She says it at a normal volume, with a stranger three feet away, and nobody so much as blinks.'),
      q('Celeste', 'Don’t look like that. Everyone is a product, darling. You were one at Axiom too. You simply had worse packaging.'),
      t('Product. She said it to my face, over breakfast, in front of a witness who did not think it was worth hearing.'),
      q('You', 'And you? What are you, at Meridian?'),
      q('Celeste', 'Quality control.'),
    ]),
  ];
}

/** Her question back: held in c10.dream, then "Adrian". */
function dreamChoices(): C10Choice[] {
  const dream = (id: string, label: string, hint: string, body: Block[]) =>
    offer10('dream-' + id, label, hint, 'breakfast', (x) => {
      set10(x, 'dream', id);
      return [...body, ...adrianTurn(x)];
    });
  return [
    dream('true', 'Tell her the truth', 'You don’t know. That is the truth.', [
      q('You', 'I don’t know. I wake up before I find out.'),
      p('Celeste looks at you with an expression you have not seen on her before, and it takes you a moment to recognise it as pity.'),
      q('Celeste', 'She used to say that too. About something else.'),
      t('I gave her something true, and she put it in a drawer with the rest of Evelyn.'),
    ]),
    dream('lie', 'Tell her: her', 'Make her believe the fitting took.', [
      q('You', 'Her. Always.'),
      p('Celeste smiles at you over her cup, slowly, the way you would smile at a child who has lied about a broken vase.'),
      q('Celeste', 'No, darling. Not yet. But it’s sweet that you want me to think so.'),
      t('She can tell. Of course she can tell. She knew the original.'),
    ]),
    dream('refuse', 'Tell her that’s yours', 'Keep one thing back.', [
      q('You', 'That one’s mine.'),
      q('Celeste', 'Good. Keep something. She never kept anything either, and look where it got her.'),
      t('Everything she says is a compliment with a knife folded inside it.'),
    ]),
  ];
}

function openChoices(s: GameState): C10Choice[] {
  const listLine = c(s, 'c8.list') === 'read' ? ' Evelyn Vale, returned to inventory, reissued.' : '';
  return [
    offer10('open-case', 'Put the case on the table', 'Say her name back to her, and the week Evelyn vanished.', 'breakfast', (x) => {
      set10(x, 'open', 'case');
      return [
        ...(strongCase(x)
          ? [
              q('You', `Meridian Holdings. A board that meets somewhere nobody can subpoena the minutes.${listLine} And you, who knew the week she vanished, because you signed for it.`),
              p('You say it quietly, because of the men at the other table, and because you want her to have to lean in to hear it. She leans in.'),
              p('For exactly one sentence, Celeste stops smiling. It is not fear. It is the look of a woman reading a figure on a bill that is higher than she expected, and deciding whether to query it.'),
              p('Then she sits back, and the smile returns, and it is a better smile than before: a smile for an opponent instead of a guest.'),
              q('Celeste', 'You have been busy. Good. I hate having breakfast with people who haven’t done the reading. Do keep all of it somewhere safe, darling. Not a drawer. Everyone looks in drawers.'),
              t('She did not deny a word of it. She did not need to. She has already decided what it is worth, and she has just told me she knows where people keep things.'),
            ]
          : [
              q('You', 'You sit on Meridian’s board. You knew her. You knew the week she disappeared.'),
              p('Celeste listens with her head on one side and her coffee going cold, nodding now and then as if you were a junior analyst presenting a first draft. When you finish she corrects you, gently, the way you would correct a child’s spelling.'),
              q('Celeste', 'It was a Thursday, darling, not the Wednesday. And it wasn’t a board, that week. It was a committee. Boards have minutes. If you are going to accuse me of something, do at least get the day right.'),
              p('Somewhere behind you, somebody almost laughs, and turns it into a cough.'),
              t('One wrong day, one wrong word, and she has made the whole thing sound like gossip. I brought her a rumour, and she knows it, and now so does whoever coughed.'),
            ]),
        ...bridge(x),
      ];
    }),
    offer10('open-evelyn', 'Play the woman she knew', 'Let her talk to the first Evelyn. Answer as her.', 'breakfast', (x) => {
      set10(x, 'open', 'evelyn');
      note10(x, 'orchids', 'Celeste says the first Evelyn hated orchids, and that she kept sending them anyway.', 'Celeste, at breakfast, to the woman she thought she was talking to');
      const burned = c(x, 'c7.card') === 'burned';
      return [
        p('You take the chair facing the door, because something in the way she glanced at it tells you that is where Evelyn would have sat. You let your voice go lower and lazier. You let her talk.'),
        q('Celeste', 'You always did take that chair. And you hated orchids. Did you know I knew? I kept sending them anyway. I liked that you had to decide what to do with something beautiful you didn’t want.'),
        q('You', burned ? 'I burned the last one.' : 'I kept the last one.'),
        p('Something crosses her face, too quick to name, and is gone.'),
        q('Celeste', burned ? 'Good. So did she, once. In a hotel sink in Kuala Lumpur. The fire alarm went off and we had to stand in the car park in our dressing gowns.' : 'Did you. She never kept anything of mine. Not once.'),
        p('For a while after that she talks to you the way you would talk to someone you had missed: a flat in Tanjong Pagar with a broken lift, a night on somebody’s boat, a fight about a bracelet that neither of them could afterwards remember the cause of. You say “mm” and “I remember” in the right places. She does not correct you once.'),
        t('It was so easy. I sat in her chair and wore her voice, and a woman who loved her, or owned her, or both, leaned across the table to talk to me. I did not have to pretend very hard. That is the part I will think about tonight.'),
        ...bridge(x),
      ];
    }),
    offer10('open-silent', 'Say nothing, and let her talk', 'Make her fill the silence.', 'breakfast', (x) => {
      set10(x, 'open', 'silent');
      setKey(x, 'act3.board-day', 'first-thursday');
      return [
        p('You say almost nothing. You let the silence sit on the table between the cups like a third guest, and you wait.'),
        p('Celeste fills it the way Theo would, beautifully, with stories about Singapore you did not ask for and people you have never met: a fund, a yacht, a dinner that ended in a swimming pool, a minister who cried at a wedding. You listen the way Adrian listened to acquisitions, for the one sentence that doesn’t belong.'),
        q('Celeste', '…and of course the board is impossible, we only ever meet on the first Thursday, and half of them are asleep by the pudding—'),
        p('She stops, laughs at herself and moves on. She did not mean to give you that. You let her see nothing at all.'),
        t('The first Thursday. Whatever else happens, I know when they meet.'),
        ...bridge(x),
      ];
    }),
  ];
}

/** Leaving breakfast: the flinch she promised herself for later (every way out). */
function afterBreakfast(s: GameState): Block[] {
  return ambushed(s)
    ? [
        p('The girl behind the counter clears the two cups, the one you drank from and the one nobody did, and does not meet your eyes. You make it up the stairs to the flat before your hands start to shake. You hold them together under the tap until the water runs hot.'),
        t('Adrian. She said it as if it were a pet name. As if it were something she had given me.'),
      ]
    : [
        p('Outside, the rain has thinned to a mist. The doorman holds the door and says “Good morning, Ms Vale,” as if nothing has happened, and in the taxi, two streets away, your hands finally start to shake. You hold them together in your lap and watch the river until they stop.'),
        t('Adrian. She said it as if it were a pet name. As if it were something she had given me.'),
      ];
}

function breakfastChoices(s: GameState): C10Choice[] {
  if (!get10(s, 'breakfast'))
    return [
      offer10('breakfast-go', 'Go to the Lindqvist', 'She asked. Answering is the first thing you control.', 'breakfast', (x) => {
        set10(x, 'breakfast', 'went');
        return lindqvist();
      }),
      offer10('breakfast-stay', 'Don’t go', 'Let her come to you, if she wants you that much.', 'breakfast', (x) => {
        set10(x, 'breakfast', 'ambushed');
        return bakery();
      }),
    ];
  if (!get10(s, 'menu')) return menuChoices(s);
  if (!get10(s, 'open')) return openChoices(s);
  if (!get10(s, 'asked')) return askChoices();
  if (!get10(s, 'dream')) return dreamChoices();
  const away = ambushed(s) ? 'She leaves first, and does not look back, because she does not need to.' : 'She leaves first. The man who stayed at the other table leaves a minute after her.';
  return [
    offer10('adrian-composed', 'Don’t flinch', 'Give her nothing.', 'claimed', (x) => {
      set10(x, 'adrian', 'composed');
      return [
        p('You finish what is on your plate. You fold your napkin. You thank her for breakfast in the voice you have now, the one that is yours, and you do not let it change on the last word.'),
        q('Celeste', 'There you are. I did hope you would be good at this.'),
        p(away),
        t('I did not flinch. I will flinch later, somewhere with a lock on the door. She knows that too.'),
        ...afterBreakfast(x),
      ];
    }),
    offer10('adrian-asked', 'Ask her what she wants', 'Make her say it.', 'claimed', (x) => {
      set10(x, 'adrian', 'asked');
      return [
        q('You', 'What do you want?'),
        q('Celeste', 'Nothing yet, darling. That’s the lovely thing about owning something. You don’t have to want anything from it until you do.'),
        p('She touches your cheek on the way past, cool fingers, the way she did on the terrace: the way you would straighten a painting.'),
        t('Owning. She chose the word. She chooses all of them.'),
        ...afterBreakfast(x),
      ];
    }),
    offer10('adrian-walked', 'Walk out first', 'Leave before she does. Let her watch you go.', 'claimed', (x) => {
      set10(x, 'adrian', 'walked');
      return [
        p(
          ambushed(x)
            ? 'You are on your feet before she has straightened up. You take your coat and walk out ahead of her, into your own street, past the queue.'
            : 'You stand up in the middle of her sentence, take your coat yourself and walk out without looking back.',
        ),
        q('Celeste', 'Same time next week?'),
        p('She says it to your back, lightly, loud enough for the room. You do not answer. You feel her watching you all the way to the door, and you know that she is smiling.'),
        ...afterBreakfast(x),
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
const doorstepIntro = p('By four there are photographers on the pavement outside your building: three of them, then seven, the kind who work for nobody and sell to everyone. The concierge rings up to ask, very politely, what you would like him to do.');

function doorstepChoices(): C10Choice[] {
  const door = (id: string, label: string, hint: string, body: Block[]) =>
    offer10('door-' + id, label, hint, 'wall', (x) => {
      set10(x, 'doorstep', id);
      return body;
    });
  return [
    door('face', 'Go out the front and give them one line', 'Use the picture before it uses you.', [
      p('You come down in the charcoal and the heels with your hair up, and stop on the step, and let them have the photograph they came for. Someone shouts her name at you, and then the question.'),
      q('You', 'Celeste is a very old friend. Of a friend.'),
      p('They shout “Which friend?” all the way to the corner. You do not turn round.'),
      t('Let her read that in the morning and wonder which friend I mean.'),
    ]),
    door('back', 'Leave by the service door', 'Slip them, and see who else is waiting.', [
      p('The service door opens onto the bins and a wet courtyard and an alley nobody photographs. There is a man in the alley anyway. He is not holding a camera.'),
      q('Man in the alley', 'Ms Laurent’s car is at the corner, if you need it.'),
      p('You don’t. You walk the other way, fast, and do not look back to see whether he follows.'),
      t('She has people at my back door too. Of course she does. The front door was never the one that mattered.'),
    ]),
    door('stay', 'Stay in and draw the curtains', 'Give them nothing, and watch.', [
      p('You draw the curtains and sit with the lights off, watching the street through the gap. By seven they have gone, one by one, bored.'),
      p('All but one. He does not have a camera, and he does not leave. He stands under the bakery awning until midnight, and then someone else stands there instead.'),
      t('They are not watching for a picture. They are watching the door.'),
    ]),
  ];
}

function claimedChoices(s: GameState): C10Choice[] {
  if (get10(s, 'first-call')) return doorstepChoices();
  const callers: [Caller, string, string][] = [
    ['sloane', 'Answer Sloane first', 'She won’t wait for a second call.'],
    ...(mayaBack(s) ? ([['maya', 'Answer Maya first', 'She saw it. She is worried.']] as [Caller, string, string][]) : []),
    ...(theoInPlay10(s) ? ([['theo', 'Answer Theo first', 'He saw it. He is curious, which is worse.']] as [Caller, string, string][]) : []),
    ...(getKey(s, 'own.campaign') ? ([['odile', 'Answer Odile first', 'She saw money.']] as [Caller, string, string][]) : []),
  ];
  return callers.map(([who, label, hint]) =>
    offer10('call-' + who, label, hint, 'claimed', (x) => {
      set10(x, 'first-call', who);
      const rest = callers.filter(([other]) => other !== who).map(([other]) => voicemail[other]);
      return [...callBody(x, who), ...(rest.length ? [p('The others you let go to voicemail, and listen to later, in the dark.'), ...rest] : []), doorstepIntro];
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
        ...(mayaBack(x)
          ? [p('You make a card for Maya too, though nobody holds her yet. You pin it outside the thread, on its own, and then you move it, and then you move it back.')]
          : []),
        p('Sloane’s card goes on the left, a little apart from Celeste’s. You run a thread between them anyway, loosely, because you are not sure yet which way it pulls.'),
        p('Your own column is shorter. You write each of those cards slowly, in capitals, the way Adrian wrote the things he wanted to be able to read at three in the morning.'),
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
    counter: ['Give her notes you have poisoned', 'One wrong detail. If it surfaces, you will know who she told.'],
  },
};

/** A job is played in two halves around one moment inside it (pass 2): the order sets c10.job, the moment ends it. */
type Beat = [id: string, label: string, hint: string, body: (x: GameState) => Block[]];
type Job = { open: (s: GameState) => Block[]; beats: (s: GameState) => Beat[]; close: (s: GameState) => Block[] };

/** Refusing is the same moment whatever she refused: the black phone, at three in the morning. */
const refuseBeats = (): Beat[] => [
  ['job-answer', 'Answer it', 'Hear her say it.', () => [
    p('You take it out of the drawer and answer it, and say nothing.'),
    p('Her voice, for the first time on this phone, is soft with sleep, or with something that sounds like it.'),
    q('C.', 'I did so hope you would say yes. Never mind. Tell Maya I’m sorry. I rather liked her photograph.'),
    p('The line goes dead. You sit on the edge of the bed with the phone in your hand until it is light.'),
  ]],
  ['job-ignore', 'Let it ring', 'Don’t give her your voice.', () => [
    p('It rings nine times. You count. Then it stops, and lights once more with a message.'),
    q('C.', 'Nine days, darling. Eight, now.'),
  ]],
];
const refuseClose = (): Block[] => [t('It is not me she will do it to.')];

const jobs: Record<Target10, Record<Answer, Job>> = {
  tape: {
    comply: {
      open: (s) => [
        p(
          intimate7(s, 'theo')
            ? 'Theo gave you a key to the loading-bay door the morning after, laughing, “so you never have to charm the night man.” You use it at midnight.'
            : 'The night producer remembers you from the show and lets you in for “a thing I left in the green room”, and does not think about it again.',
        ),
        p('The archive is two floors down, under the studio: shelves of drives and old tape in grey boxes, one work lamp, the hum of the air handling. Your segment is where anyone would file it, under the date, labelled in Theo’s untidy capitals: VALE — RAW — DO NOT RELEASE.'),
        p('The copy takes eleven minutes. You watch the progress bar and not the monitor, where your own face is asking, twenty-five times a second, who signs for a stolen life.'),
        p('At minute nine there are footsteps on the iron stair. Theo’s footsteps; you know them now. He has come back for the reading glasses he always forgets.'),
      ],
      beats: () => [
        ['job-lie', 'Tell him you left something in the green room', 'He might believe you. He might decide to.', (x) => {
          set10(x, 'theo-suspects', 'maybe');
          return [
            q('You', 'I left my scarf in the green room. The night man let me in.'),
            p('Theo looks at you, and at the lamp, and at the screen behind you where the progress bar is still crawling, and you watch him decide not to see it.'),
            q('Theo Marr', 'Your scarf. Of course.'),
            p('He kisses your cheek, finds his glasses on the shelf where he always leaves them, and goes back up the stairs, and you stand very still until the door at the top closes.'),
            t('He didn’t look. I am almost sure he didn’t look. I am going to have to live with almost.'),
          ];
        }],
        ['job-hide', 'Kill the lamp and stand in the dark', 'Let him find nothing.', (x) => {
          set10(x, 'theo-suspects', 'yes');
          return [
            p('You kill the lamp. The screen still glows, so you stand in front of it. The footsteps stop at the bottom of the stair.'),
            q('Theo Marr', '…Hello?'),
            p('A long moment: long enough to hear him breathing, and the air handling, and the tiny tick of the drive.'),
            q('Theo Marr', 'Goodnight, then.'),
            p('He says it to the dark, gently, and goes back up without his glasses.'),
            t('He knew. Or he knew someone was here and chose not to know who. Either way, he said goodnight to me.'),
          ];
        }],
      ],
      close: (s) => [
        t(intimate7(s, 'theo') ? 'He slept beside me. He did not turn the pad over. And I am stealing his tape with his key.' : 'He said no to her office. He would have said yes to me. That is exactly why she sent me.'),
        p('At one in the morning you hand a sealed envelope to the night doorman at the Lindqvist, who takes it without a word, as if he has been expecting it all his life.'),
      ],
    },
    refuse: {
      open: () => [
        p('You go as far as the loading bay. You stand in the rain with your hand on the door and think about Theo at his desk, turning a legal pad face down so that you would not have to see it.'),
        p('Then you take your hand off the door and walk home the long way, along the river, and put the black phone in a drawer.'),
        t('I will not be her courier. Whatever she does to me for it, I will not be that.'),
        p('At three in the morning the drawer starts to ring.'),
      ],
      beats: refuseBeats,
      close: refuseClose,
    },
    counter: {
      open: () => [
        p('You call Theo at midnight and he answers on the first ring, as if he had been waiting for a call he could not name.'),
        q('You', 'Somebody wants the raw tape of my interview. The same somebody who rang your office. If I don’t get it for them, a friend of mine loses her job.'),
        p('A long silence on the line. When he speaks again, the television voice is gone.'),
        q('Theo Marr', 'Then let’s give them a tape.'),
        p('He meets you at the archive in a jumper and reading glasses. Before he touches the tape, he turns his chair to face you.'),
        q('Theo Marr', 'One condition. Tell me who it is.'),
      ],
      beats: () => [
        ['job-name', 'Tell him it’s Celeste Laurent', 'He will never let it go. That might be useful.', (x) => {
          setKey(x, 'act3.theo-knows', 'celeste');
          return [
            q('You', 'Celeste Laurent.'),
            p('He takes his glasses off and cleans them and puts them back on, the way a man does when he needs a second that nobody will notice.'),
            q('Theo Marr', 'The old friend from the photograph. Of course it is.'),
            t('Now he knows. Now he is a risk to her, and she is a risk to him, and I did that.'),
          ];
        }],
        ['job-withhold', 'Not yet', 'Keep him safe from the name, for now.', () => [
          q('You', 'Not yet. Not because I don’t trust you. Because I do.'),
          q('Theo Marr', 'Then I’ll cut blind. I’m very good blind.'),
        ]],
      ],
      close: () => [
        p('For two hours you watch a man who edits for a living take your segment apart and put it back together without the one thing that matters. The question goes. So do four seconds either side of it. What is left is a long, charming conversation about dresses, with a seam in the timecode that only a professional would ever see.'),
        q('Theo Marr', 'Anyone who knows what they are looking at will know it has been cut. Which is rather the point, isn’t it? You want her to know you said no, without ever saying it.'),
        p('He sends it himself, from his own address, with a note that says only: “As requested. — T.M.”'),
        t('Theo is in this now. I put him in it. He is delighted, and that frightens me more than anything she has said.'),
      ],
    },
  },
  workroom: {
    comply: {
      open: () => [
        p('Julian meets you in the Helix lobby at ten at night because you asked him to, and does not ask why. He takes you up to the contracts room himself and stands close while you look at the wall, the way he did the first time.'),
        p('At twenty past, his phone goes: a call from Asia he has to take. He squeezes your shoulder and steps out into the corridor, and leaves you alone with the wall.'),
        p('The third contract from the left. You photograph the page with Meridian’s name on it in two frames, steadily, and are putting the phone away when you hear him: back early, the call cut short, his hand already on the door.'),
      ],
      beats: () => [
        ['job-lie', 'Tell him you were admiring the view', 'He wants to believe you. Let him.', () => [
          q('Julian Mercer', 'Sorry. Where were we?'),
          q('You', 'Nowhere. I was looking at the city. I’m tired. Take me home?'),
          p('He does. In the lift he holds your hand, and you let him, and you do not look at your reflection in the brass.'),
        ]],
        ['job-cover', 'Kiss him before he can ask', 'Make sure the only thing he looks at is you.', () => [
          p('You cross the room before he is through the door and kiss him, hard, so that the only thing in the room he is looking at is you.'),
          p('He laughs against your mouth, surprised and pleased, and you hate how easy it was, and you kiss him again.'),
          q('Julian Mercer', 'Well. Where were we?'),
        ]],
      ],
      close: () => [
        t('He trusts me alone in a room with his contracts. That is what she was buying.'),
        p('At one in the morning the photographs leave your phone for the black one, and the black one says: “Thank you, darling.”'),
      ],
    },
    refuse: {
      open: () => [
        p('You think about asking Julian to take you up to that room again, and about the way he put himself between you and the door when the guard came.'),
        p('You do not ask. You put the black phone in a drawer.'),
        t('I will not walk her into his rooms. Whatever it costs.'),
        p('At three in the morning the drawer starts to ring.'),
      ],
      beats: refuseBeats,
      close: refuseClose,
    },
    counter: {
      open: () => [
        p('You tell Julian the truth, or enough of it: that someone who sits on a board above his counterparty wants the page you read on his wall, and that a friend of yours will lose her job if she does not get it.'),
        p('He listens without interrupting, the way he did at the audit.'),
        q('Julian Mercer', 'Then she can have a page.'),
        p('He does not draft it yet. He pours two drinks, gives you one, and asks the question you knew he would.'),
        q('Julian Mercer', 'Who is she to you?'),
      ],
      beats: () => [
        ['job-name', 'Tell him the truth', 'Give him her name. He will do something with it.', (x) => {
          setKey(x, 'act3.julian-knows', 'celeste');
          return [
            q('You', 'Celeste Laurent. She sat on the board that signed away the life I’m wearing.'),
            p('Julian sets his glass down very carefully.'),
            q('Julian Mercer', 'Then I have had dinner with her four times and never once seen her.'),
            t('He believes me. Worse: he believes me, and he is angry, and an angry man with Julian’s access is a weapon I did not mean to pick up.'),
          ];
        }],
        ['job-withhold', 'Tell him: someone who owns me, for now', 'True, and not the whole of it.', () => [
          q('You', 'Someone who owns me. For now.'),
          q('Julian Mercer', 'For now. I like that you said that.'),
        ]],
      ],
      close: () => [
        p('The next night the third contract from the left has a new schedule stapled behind its first sheet: a counterparty that does not exist, a figure wrong by one digit, a clause that would never survive a lawyer. He watches you photograph it with a face you cannot read.'),
        q('Julian Mercer', 'Now you owe me, and she owes us both a surprise. I find I don’t mind any of those things.'),
        t('He knows she owns me now. That was the price, and he paid it for me without being asked.'),
      ],
    },
  },
  notes: {
    comply: {
      open: (s) => [
        p('You write it all out again at the kitchen table, everything you found, in your own hand, because that is what she asked for: Meridian, the board, the week Evelyn vanished, the names. It takes until two. Your hand aches. It feels like signing a confession to somebody else’s crime.'),
        ...(c(s, 'c7.notes') === 'maya'
          ? [
              p('In the morning you call Maya and tell her you need the envelope back; it was a mistake to put her in it. She brings it to the counter at lunch, sealed, and holds on to it a second longer than she needs to before she slides it across.'),
              q('Maya', 'Are you in trouble?'),
            ]
          : [p('At the Lindqvist door you stop in the rain with the envelope in your hand.')]),
      ],
      beats: (s) =>
        c(s, 'c7.notes') === 'maya'
          ? [
              ['job-lie', 'Say no', 'Keep her out of it. She will believe you.', () => [
                q('You', 'No. I just want you out of it.'),
                p('She believes you. That is the worst part. She believes you, and she is relieved.'),
                t('I lied to Maya to get my own evidence back, so that I could hand it to the woman who is threatening her. There is no version of that sentence I can live with.'),
              ]],
              ['job-half', 'Say yes, and nothing else', 'The truth, and a wall around it.', () => [
                q('You', 'Yes. That’s all I can say.'),
                p('She looks at you for a long moment, and then lets go of the envelope.'),
                q('Maya', 'Then that’s all I’ll ask. Today.'),
              ]],
            ]
          : [
              ['job-clean', 'Hand over the only copy', 'If she asks, you can say so and mean it.', () => [
                p('You hand it over. It is the only copy. If she ever asks, you will be able to say so and mean it.'),
              ]],
              ['job-copy', 'Photograph every page first', 'She gets your work. She doesn’t get the only copy.', (x) => {
                set10(x, 'kept-copy', 'yes');
                return [
                  p('You step back under the awning and photograph every page against the wall of the club, forty-one pages, while the doorman watches and says nothing.'),
                  t('She wanted my work. She is getting it. She is not getting the only copy.'),
                ];
              }],
            ],
      close: () => [p('You leave the notes with the doorman at the Lindqvist. The black phone says, at once: “Beautiful handwriting. She had terrible handwriting.”')],
    },
    refuse: {
      open: () => [
        p('You take the notes out of wherever you keep them and look at them for a long time. Then you put them back.'),
        t('She wants my work. She can’t have it. Whatever she does instead, she does to me.'),
        t('Except she won’t. She said Maya’s name for a reason.'),
        p('At three in the morning the black phone starts to ring on the wall, where you pinned it under her card.'),
      ],
      beats: refuseBeats,
      close: () => [],
    },
    counter: {
      open: () => [
        p('You write the notes again from memory, which is easy, because it is all in your head, the way Adrian’s filings always were. You write them almost exactly as they are.'),
        p('Almost. You sit with the pen over the page and decide which lie to plant: one wrong detail, the kind a tired woman makes at two in the morning, that will show you exactly who Celeste passes your notes to if it ever turns up.'),
      ],
      beats: () => [
        ['job-date', 'Move a registry date by a week', 'Quiet. Only someone checking filings will trip on it.', (x) => {
          set10(x, 'poison', 'date');
          return [p('A filing date, moved by exactly seven days. If it ever appears in someone else’s mouth, it came from these pages.')];
        }],
        ['job-letter', 'Change one letter in a company name', 'Loud, if anyone searches for it.', (x) => {
          set10(x, 'poison', 'letter');
          return [p('Meridian’s registered agent, spelled with one letter wrong. Anyone who searches for it will find nothing, and you will know who searched.')];
        }],
      ],
      close: (s) => [
        ...(c(s, 'c7.notes') === 'maya' ? [p('Maya’s copy stays exactly where it is. You do not ask for it back. If Celeste asks, you will tell her Maya burned it, and she will not be able to prove otherwise.')] : []),
        t('She wanted my handwriting. She can have it. It lies beautifully.'),
      ],
    },
  },
};

function orderChoices(s: GameState): C10Choice[] {
  const target = target10(s);
  const open = get10(s, 'job') as Answer | undefined;
  if (open) {
    const job = jobs[target][open];
    return job.beats(s).map(([id, label, hint, body]) =>
      offer10(id, label, hint, 'answer', (x) => {
        delete x.choices['c10.job'];
        set10(x, 'answer', open === 'comply' ? 'complied' : open === 'refuse' ? 'refused' : 'countered');
        if (open === 'comply') {
          setKey(x, 'act3.maya-clearance', 'renewed');
          set10(x, 'betrayed', target === 'tape' ? 'theo' : target === 'workroom' ? 'julian' : c(x, 'c7.notes') === 'maya' ? 'maya' : 'none');
        }
        if (open === 'refuse') setKey(x, 'act3.maya-clearance', 'suspended');
        if (open === 'counter') {
          setKey(x, 'act3.maya-clearance', 'renewed');
          setKey(x, 'act3.celeste-surprised', 'once');
          if (target === 'tape') setKey(x, 'act3.ally.theo', 'in');
          if (target === 'workroom') setKey(x, 'act3.ally.julian', 'in');
          if (target === 'notes' && !get10(x, 'poison')) set10(x, 'poison', 'planted');
        }
        note10(
          x,
          'order',
          `Celeste’s first order (${target}): Evelynn ${open === 'comply' ? 'complied' : open === 'refuse' ? 'refused' : 'found a third way'}. The named threat was Maya’s clearance renewal.`,
          'The black phone with one contact',
        );
        return [...body(x), ...job.close(x)];
      }),
    );
  }
  const answers: Answer[] = ['comply', 'refuse', ...(counterReady10(s, target) ? (['counter'] as Answer[]) : [])];
  return answers.map((answer) =>
    offer10('order-' + answer, labels[target][answer][0], labels[target][answer][1], 'order', (x) => {
      set10(x, 'target', target);
      set10(x, 'job', answer);
      return jobs[target][answer].open(x);
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
          p('At one she meets you at the counter in her coat, with the lanyard still round her neck and nothing on the end of it. She orders for both of you out of habit and then does not eat.'),
          q('Maya', 'Eleven years I’ve had that badge. They took it off me at the gate like I was a contractor.'),
          q('Maya', 'I’ve got savings. I’ve got a union rep who owes me a drink. I’ll be fine for a month.'),
          p('She says it to her noodles, not to you.'),
          q('Maya', 'I just want to know who hates me enough to do it properly.'),
          t('Nobody hates you, Maya. That is what makes it unbearable. You are only the nearest thing to me that she could reach.'),
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
      t('I did it well. That is the part I keep coming back to. I was good at it, and she knew I would be.'),
      q('Sloane · message', 'Laurent’s office asked Compliance to expedite a renewal this morning. A Ms Reyes. Did you know anything about that?'),
      t('Sloane is watching the same board I am, from the other side of it.'),
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
    p('You take Celeste’s card down from the wall and pin it back a little further from the middle. Not far. An inch. It is the first time anything on the wall has moved away from you.'),
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

export const GREEN_PRICE = 150;
/** "Wear the green" (pass 2): what she wears to the Vesper Gallery. Chapter 11 reads c10.green. */
function greenChoices(s: GameState, next: string): C10Choice[] {
  const green = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer10('green-' + id, label, hint, next, (x) => {
      set10(x, 'green', id);
      return [p('Wear the green. You read the line again. She has chosen your colour, the way she chose your breakfast.'), ...body(x)];
    });
  const campaign = getKey(s, 'own.campaign');
  return [
    ...(c(s, 'c8.gala')
      ? [
          green('own', 'Wear the green you wore to the gala', 'You already own it. She knows you do.', () => [
            p('You still have it: the green you wore to the Harbour gala, the night you asked a room full of people who owned Meridian. You hang it on the wardrobe door, beside the wall.'),
            t('She chose the colour because she knew I owned it. Or she chose it because Evelyn did.'),
          ]),
        ]
      : []),
    ...(campaign === 'taken' || campaign === 'terms'
      ? [
          green('odile', 'Ask Odile for a green', 'She will send one within the hour. And remember that she did.', (x) => {
            setKey(x, 'own.odile', 'owed');
            return [
              p('Odile sends a green by courier within the hour, with a note: “Darling, they will all be looking. Let them see something worth the price.” It fits as if it had been cut for you. It has.'),
              t('Everyone is dressing me this week.'),
            ];
          }),
        ]
      : []),
    green('buy', 'Buy one yourself', `$${GREEN_PRICE} of your own money.`, (x) => {
      const before = Number(getKey(x, 'own.cash') ?? 0);
      setKey(x, 'own.cash', String(Math.max(0, before - GREEN_PRICE)));
      note10(
        x,
        'green',
        before >= GREEN_PRICE ? `Spent $${GREEN_PRICE} on a green dress. Own cash: $${before - GREEN_PRICE}.` : `The $${GREEN_PRICE} dress is on account; own cash was $${before}.`,
        'The dress shop on the hill',
      );
      return [
        p('The shop on the hill has three greens. You try all of them, standing in the little curtained room with your hair up and your arms bare, and choose the one that makes you look least like anyone’s idea of you. You pay for it yourself.'),
        t('In this city, this week, it is the only thing I have done entirely on my own terms.'),
      ];
    }),
    green('black', 'Wear black', 'Refuse the colour. She will notice.', () => [
      p('You hang the black on the wardrobe door instead: the plain black you keep for days you need to disappear in.'),
      t('Let her notice. Let her wonder what else I will refuse.'),
    ]),
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
  // Answer the card, then decide what to wear; with a partner she already chose, the evening follows.
  if (!get10(s, 'invitation'))
    return [
      offer10('invite-accept', 'Tell her you’ll come', 'Walk in on her invitation, on your own terms.', 'invitation', (x) => {
        set10(x, 'invitation', 'accepted');
        return [q('You · to C.', 'I’ll be there.'), p('The reply comes at once: “I know.”')];
      }),
      offer10('invite-wait', 'Let it sit', 'The Thursday will come whether you answer or not.', 'invitation', (x) => {
        set10(x, 'invitation', 'pending');
        return [p('You leave the card on the table beside the orchid and do not answer. She does not ask again. She doesn’t need to.')];
      }),
    ];
  if (!get10(s, 'green')) return greenChoices(s, partners.length ? 'invitation' : 'complete');
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
  if (s.phase === 'breakfast') return dawnBlocks();
  if (s.phase === 'claimed')
    return [
      p(
        ambushed(s)
          ? 'By noon the photograph is everywhere that matters: the two of you in the window of the bakery on your street, the queue behind you like a crowd scene, her hand on your wrist, both of you laughing at something neither of you said.'
          : 'By noon the photograph is everywhere that matters: the two of you at the Lindqvist, lamplight and silver, her hand on your wrist, both of you laughing at something neither of you said.',
      ),
      q('The caption', 'Old friends. Evelynn Vale and Celeste Laurent, reunited.'),
      q('The article', 'Laurent, whose fund has quietly backed half the new towers on the river, is rarely photographed and never interviewed. Friends describe her as “generous to a fault, and very, very patient”. Vale, whose Aster portrait has made hers the face of the season, declined to comment. A source close to Laurent says the two women “go back years”.'),
      t('Years. I have been alive, as this, for weeks.'),
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
