/** Chapter 10 (Act III opener, own-power played as the Celebrity route) · She Knows:
 * breakfast → claimed → wall → order → answer → invitation → complete.
 * Design: docs/story/CHAPTER_10_SHE_KNOWS_DESIGN.md (owner-approved 2026-09-24); flow and flags:
 * docs/story/scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md. Gated behind chapter10Playable(), reached from an own-power
 * Chapter 9 ending. The coercion beat follows docs/story/CONTENT_DIRECTION.md §3: comply / refuse / counterplay,
 * each with a real cost; refusal lands on the named, non-sexual threat (Maya's clearance). The only intimacy is the
 * optional chosen evening (heat 3, consent-gated, fades), never with a partner betrayed this chapter.
 * Payoffs (2026-09-25): the threads Chapters 7–9 opened come back here, each read from the save and silent when the
 * flag is absent. Celeste's reading of the week is Mr Pryce's reports (the window, Ruth, Kessler, the auction,
 * Castellane, Lotte's balcony, the tailor); the two sugars and cinnamon meet the receipt in the coat; at noon Lotte
 * names C., the Courier runs or rings, Mrs Kowalczyk knows her friend with the key; the man in the alley is Pryce; the
 * wall carries Pryce, the rent, the HELD card, the photographs, Kessler and the lawyer, and not Ruth; the black phone
 * knows how the wall was kept; Maya saw her at the wake; Daniel remembers the tie; the first Thursday gathers
 * Castellane, the club and Sloane's warning; the dress is paid the way she left the bank; Kessler comes back at the end.
 * The refusal's cost is still only Maya's clearance. */
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
  out.push(...weekReport10(s));
  if (!out.length) out.push(q('Celeste', 'You have had a busy fortnight. I do admire a busy woman. She was never busy. She was only ever away.'));
  return [
    p('She talks while you eat, easily, the way people talk to someone they have known for years. It takes you a minute to understand that every sentence is an item on a list she has already checked.'),
    ...out,
    p('Then she stops, and waits for you to begin, chin on her hand, as if you were the one who had asked for this.'),
  ];
}

/** What Mr Pryce reported (payoffs of Chapters 7–9): the window always, then at most two more, by weight. */
function weekReport10(s: GameState): Block[] {
  const out: Block[] = [];
  const win = c(s, 'c9.window');
  if (win === 'sign')
    out.push(
      q('Celeste', 'I got your message, by the way. Mr Pryce brought it round at breakfast, bless him, in a plastic sleeve. Good morning to you too.'),
      p('Lipstick on the back of a cereal box. She has had it put in a sleeve, and she has read it, and she is pleased with it.'),
    );
  else if (win === 'wave') out.push(q('Celeste', 'Mr Pryce tells me you waved. He was quite undone. Nobody waves at Mr Pryce.'));
  else if (win === 'dark') out.push(q('Celeste', 'You sat in the dark for an hour on Tuesday. Mr Pryce was worried. I told him you were thinking. She used to do that too.'));
  const more: Block[][] = [];
  if (c(s, 'c9.ruth'))
    more.push([
      q('Celeste', 'And you went to see Ruth Adair. Give Ruth my love. She never takes it.'),
      t('I wrote Ruth’s name down nowhere. I said it to nobody. I walked to the harbour, and somebody walked behind me.'),
    ]);
  if (c(s, 'c9.kessler') === 'follow')
    more.push([
      q('Celeste', 'You have been reading old society pages, I hear. Poor Anna. She never did learn to sail.'),
      p('She says it into her cup, fondly, the way you would mention a friend who was always late.'),
    ]);
  const auction = c(s, 'c9.auction');
  if (auction)
    more.push([
      q(
        'Celeste',
        auction === 'thank'
          ? 'You were very gracious at the auction. You hang in my hall now. I say good morning to you on the stairs.'
          : auction === 'ask'
            ? 'You asked me why, at the auction. I told you: a very good likeness. I still haven’t said of whom.'
            : 'You left the auction before I could reach you. I had to say good night to your picture instead.',
      ),
    ]);
  const table = c(s, 'c9.table');
  if (table)
    more.push([
      q(
        'Celeste',
        table === 'cancel'
          ? 'You tried to cancel my table at Castellane. Henri was beside himself. Nobody has cancelled my table in eleven years.'
          : table === 'ask'
            ? 'Henri tells me you asked who used to sit across from you. You did, darling. For years.'
            : 'Henri tells me you left a third of the Chablis. She always did. I used to finish it.',
      ),
    ]);
  const photos = c(s, 'c8.photos');
  if (photos === 'all' || photos === 'one')
    more.push([q('Celeste', 'Lotte gave you the balcony. That one was always my favourite. I took it, you know. She was laughing at me.')]);
  const tailor = c(s, 'c9.tailor');
  if (tailor === 'alter') more.push([q('Celeste', 'And you had Mr Anand take in the charcoal. A centimetre. I noticed the moment you sat down.')]);
  else if (tailor === 'ask') more.push([q('Celeste', 'Mr Anand says you asked who brought you, that time. It was me. I chose the cloth. I still think I was right.')]);
  return [...out, ...more.slice(0, 2).flat()];
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
          ...receipt10(s),
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
          ...(c(s, 'c7.robe') === 'coats'
            ? [p('And a coffee, which she orders without asking and the waiter brings without being told: two sugars, cinnamon on the foam.'), ...receipt10(s)]
            : []),
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

/** The receipt in her coat pocket (Chapter 7's wardrobe), met at last. */
const receipt10 = (s: GameState): Block[] =>
  c(s, 'c7.robe') === 'coats'
    ? [t('The receipt in the pocket of her coat: one black, one with two sugars and cinnamon. I said that one day somebody would order it for me and watch my face. It did not take long.')]
    : [];

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
      p('Sloane answers before it has finished ringing once, which means she was holding the phone.'),
      q('Sloane', 'Laurent is not a friend of this directorate. Or of yours. I assume you know that.'),
      ...(sloaneDoubts(s) ? [q('Sloane', 'Or is this another guess?')] : []),
      q('You', 'I know exactly what she is.'),
      q('Sloane', 'Do you. Then tell me why she bought you breakfast.'),
      q('You', 'She wanted to be seen doing it.'),
      p('A silence on the line: the particular silence of Sloane deciding whether you are being clever or only right.'),
      q('Sloane', 'Then you also know that a photograph like that is a leash, and she has just shown the whole city who is holding it. Be careful what you let her walk you into.'),
      q('You', 'Is that a warning, or an offer?'),
      q('Sloane', 'It is a description. I don’t make offers on open lines.'),
      p('She rings off. The phone is warm in your hand, the way it gets after a long call, though the call was not long.'),
      t('Sloane, warning me about leashes. She would know. She wears one too. I just have not found out yet who holds her end of it.'),
    ];
  if (who === 'maya')
    return [
      p('Maya is calling from the stairwell at work. You can tell by the echo, and by the way she speaks a little too quietly, the way people do when a door might open above them.'),
      q('Maya', 'Who is Celeste Laurent, and why is she holding your wrist like she owns it?'),
      q('You', 'Not on this phone.'),
      q('Maya', 'Then on what phone? … Fine. Fine.'),
      p('You hear her breathe out, and a door bang somewhere far above her, and footsteps that are not hers coming down past her. She waits until they have gone.'),
      q('Maya', 'Somebody put it up on the screen in the break room. As a joke, I think. “Isn’t that Adrian’s friend from the magazine?” Everybody laughed. I laughed. Then I came out here.'),
      q('Maya', 'Just — people like that don’t have friends. They have holdings. Don’t be one.'),
      q('You', 'Keep your head down this week, Maya. Please.'),
      q('Maya', 'My head is always down. It’s where I keep it.'),
      t('Too late, Maya. And you are on her list too.'),
    ];
  if (who === 'theo')
    return [
      p('Theo rings from somewhere with traffic in it. He sounds delighted, which is the most alarming thing he could sound.'),
      q('Theo Marr', 'I asked you on air who hands out lives. Is it her?'),
      q('You', 'Not on the phone, Theo.'),
      q('Theo Marr', 'Then not on the phone. I had my researcher pull everything on Laurent that exists. It took eleven minutes, because nothing on Laurent exists. No interviews. Two photographs in twenty years, and one of them is of the back of her head.'),
      q('Theo Marr', 'And now three. She wanted this one taken. People like her are never photographed by accident.'),
      q('You', 'I know.'),
      q('Theo Marr', 'I rather thought you might.'),
      p('A bus goes by at his end, long and loud, and he waits for it to pass.'),
      q('Theo Marr', 'I’m not letting it go. And I would much rather be on your side of it when it comes out.'),
      t('He means it kindly. He also means it.'),
    ];
  return [
    p('Odile rings from a fitting. You can hear pins, and somebody being told to breathe in.'),
    q('Odile Frayne', 'Laurent is money, darling. Her people rang me an hour after the picture. They want you for the autumn campaign, the big one, and they want to pay in advance.'),
    q('You', 'How much in advance?'),
    q('Odile Frayne', 'Enough that I asked them to say it twice. Enough that I haven’t told the girl with the pins, in case she swallows one.'),
    t('Celeste has found my agent. Of course she has. She is making herself the hand that feeds me.'),
    q('You', 'Tell them I’ll think about it.'),
    q('Odile Frayne', 'Think quickly. Money like that has a very short attention span.'),
    p('Then, lower, with the pins gone quiet behind her:'),
    q('Odile Frayne', 'And darling. I have represented faces for thirty years. When somebody pays in advance, it is never for the face.'),
  ];
}
const doorstepIntro = (s: GameState): Block[] => [
  p('By four there are photographers on the pavement outside your building: three of them, then seven, the kind who work for nobody and sell to everyone. They have the patient, bored look of men who are paid by the picture and have been paid before for waiting.'),
  p('The concierge rings up to ask, very politely, what you would like him to do. He has never asked you anything before. You like him better for sounding frightened.'),
  ...(c(s, 'c8.neighbour')
    ? [
        p('On the landing Mrs Kowalczyk is waiting with the paper held out to you like a present, Bishop under her other arm.'),
        q('Mrs Kowalczyk', 'Your friend! In the paper! The one with the key! I knew she was somebody.'),
      ]
    : []),
];

/** Noon (payoffs): Lotte names C.; the Courier ran her line, or Collis rings. */
function noonPayoffs10(s: GameState): Block[] {
  const out: Block[] = [];
  if (c(s, 'c8.lotte-meet')) {
    const knows = ['play', 'ask'].includes(c(s, 'c7.lotte') ?? '');
    out.push(
      p('In among the calls, a message from Lotte:'),
      q('Lotte · message', knows ? 'That’s her. That’s C. The balcony. Evie, what are you doing?' : 'That’s C. The one on the balcony. Whoever you are, be careful.'),
      t('C. I knew. It is different, hearing it from somebody who watched them laugh on a balcony in Singapore.'),
    );
  }
  const hack = c(s, 'c8.hack');
  if (hack === 'line')
    out.push(p('The Sunday Courier ran your line at the weekend, in bold, under a headline about women from nowhere. Next to this photograph it reads differently: I came from exactly where everybody comes from. I just didn’t bring it with me.'));
  else if (hack === 'meridian')
    out.push(q('Rafe Collis · message', 'Meridian’s lawyers rang my editor an hour after that photograph went up. Nobody has ever rung about Meridian before. Who is she, Ms Vale?'));
  return out;
}

function doorstepChoices(s: GameState): C10Choice[] {
  const pryce = !!c(s, 'c8.pryce');
  const alley = pryce ? 'Mr Pryce' : 'Man in the alley';
  const door = (id: string, label: string, hint: string, body: Block[]) =>
    offer10('door-' + id, label, hint, 'wall', (x) => {
      set10(x, 'doorstep', id);
      return body;
    });
  return [
    door('face', 'Go out the front and give them one line', 'Use the picture before it uses you.', [
      p('You take forty minutes over it, because it is the only part of the afternoon you control. The charcoal again, pressed. The heels. Hair up and pinned hard, the face finished in the hall mirror under the bad light, where every mistake shows. Then you go down.'),
      p('You stop on the top step and let them have the photograph they came for: a woman in charcoal, not smiling, not hurrying, in front of a door that is hers. The shutters go like rain. Someone shouts her name at you, and then the question.'),
      q('You', 'Celeste is a very old friend. Of a friend.'),
      p('Then you walk. You look at none of the lenses in particular, which is the trick of it; you look at the corner, where you are going. They shout “Which friend?” all the way to the corner. You do not turn round.'),
      p('You walk for an hour, for no reason but to be seen walking, buy nothing, and come home the long way.'),
      t('Let her read that in the morning and wonder which friend I mean.'),
    ]),
    door('back', 'Leave by the service door', 'Slip them, and see who else is waiting.', [
      p('The service door opens onto the bins, a wet courtyard and an alley nobody photographs. It smells of the bakery’s flour and the rain. There is a man in the alley anyway. He is not holding a camera.'),
      p(
        pryce
          ? 'It is Mr Pryce, in a raincoat the colour of the wall instead of the grey coat, and he has been standing there long enough for the shoulders of it to darken. He does not come toward you. He only lifts his chin at the corner.'
          : 'He is fifty, clean-shaven, in a raincoat the colour of the wall, and he has been standing there long enough for the shoulders of it to darken. He does not come toward you. He only lifts his chin at the corner.',
      ),
      q(alley, 'Ms Laurent’s car is at the corner, if you need it.'),
      q('You', 'And if I don’t?'),
      q(alley, 'Then it will be at the corner, madam, while you don’t.'),
      ...(pryce ? [t('Pryce. The agents, the owner’s office, the list on a Monday. The owner has a car, and it is at the corner.')] : []),
      p('You don’t. You walk the other way, fast, and do not look back to see whether he follows. He doesn’t need to. At the end of the alley you glance once into the wing mirror of a parked van, and he is exactly where he was, looking at nothing, getting wetter.'),
      t('She has people at my back door too. Of course she does. The front door was never the one that mattered.'),
    ]),
    door('stay', 'Stay in and draw the curtains', 'Give them nothing, and watch.', [
      p('You draw the curtains and sit with the lights off, watching the street through the gap. They have flasks. One of them has brought a folding stool. At half past five a boy comes with flowers from somebody at a magazine, and they photograph the flowers.'),
      p('By seven they have gone, one by one, bored.'),
      p('All but one. He does not have a camera, and he does not leave. He stands under the bakery awning until midnight, and then someone else stands there instead, and the first one walks away without either of them looking at the other.'),
      t('They are not watching for a picture. They are watching the door.'),
    ]),
  ];
}

function claimedChoices(s: GameState): C10Choice[] {
  if (get10(s, 'first-call')) return doorstepChoices(s);
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
      return [...callBody(x, who), ...(rest.length ? [p('The others you let go to voicemail, and listen to later, in the dark.'), ...rest] : []), ...doorstepIntro(x)];
    }),
  );
}

// ── The wall ──

function wallChoices(s: GameState): C10Choice[] {
  // Once it is built: where she keeps it (c10.wall-kept). Chapter 11 reads it; whoever lets themselves in next finds it, or doesn't.
  if (get10(s, 'wall') === 'built') {
    const keep = (id: string, label: string, hint: string, body: Block[]) =>
      offer10('wall-' + id, label, hint, 'order', (x) => {
        set10(x, 'wall-kept', id);
        return body;
      });
    return [
      keep('close', 'Close the wardrobe door on it', 'It is there when you open it, and only then.', [
        p('You close the wardrobe door on it and hang the charcoal on the outside, on its hook, the way it always hangs. From the bed it is a wardrobe. That is all anybody who lets themselves in will see.'),
        t('Anybody who opens it, though, will know exactly what I know. I have just written my whole mind on a door.'),
      ]),
      keep('photo', 'Photograph it, then take it down', 'Every card back in the box each morning. The pins stay in the wood.', [
        p('You photograph it in four overlapping frames, then take every card down in order and stack them in the stationer’s box with an elastic band, and put the box in the lining of the old jacket. The pins you leave in the wood. Tomorrow night you will put it back up, card by card, in the order of the holes.'),
        t('Adrian would have liked the holes. A pattern only the person who made it can read.'),
      ]),
      keep('open', 'Leave it open, facing the bed', 'If they come in again, let them read it.', [
        p('You leave the door standing open, the wall facing the bed, the lamp angled onto it. If whoever squared your papers comes back, let them stand here in the dark and read it.'),
        t('It is nothing they don’t already know. The only new thing on it is that I know it too. I want them to see that.'),
      ]),
    ];
  }
  return [
    offer10('wall-build', 'Put it all on the wall', 'Every debt you took on, in your own hand.', 'wall', (x) => {
      set10(x, 'wall', 'built');
      // The order arrives with the next phase; its target is fixed now, so the board shows what she wants.
      set10(x, 'target', target10(x));
      return [
        p('You start with the easy ones, the way you would start a crossword. A card for Celeste first, at the top of the door, at the height of your eyes. You write her name, and under it, smaller, what she holds, and it takes you a long time to decide how to write it.'),
        p('You write a card for each of them and pin it, and run the thread from each card to the one in the middle that just says ME.'),
        ...wallLines(x).map((line) => p(line)),
        ...(mayaBack(x)
          ? [p('You make a card for Maya too, though nobody holds her yet. You pin it outside the thread, on its own, and then you move it, and then you move it back.')]
          : []),
        p('Sloane’s card goes on the left, a little apart from Celeste’s. You run a thread between them anyway, loosely, because you are not sure yet which way it pulls.'),
        ...(c(x, 'c9.ruth') ? [p('There is no card for Ruth Adair. You promised her that. You leave a space where it would go, and pin nothing in it, and run no thread to it.')] : []),
        p('Your own column is shorter. You write each of those cards slowly, in capitals, the way Adrian wrote the things he wanted to be able to read at three in the morning.'),
        p('It takes until two. The red thread runs out once, and you finish with a length of black cotton from the same kit, which you tell yourself means nothing.'),
        p('Then you stand back and look at it for a long time.'),
        t('I thought I would feel trapped, seeing it all at once. I don’t. For the first time since the clinic I can see the whole shape of what is being done to me, and a shape is a thing you can take apart.'),
        { kind: 'notice', text: 'The leverage board is now in your Records.' },
        t('And anyone who opens this door can see it too.'),
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

/** The black phone knows how she kept the wall: Mr Pryce has been in (payoff of c10.wall-kept). */
function wallSeen10(s: GameState): Block[] {
  const kept = get10(s, 'wall-kept');
  if (!kept || !c(s, 'c8.pryce')) return [];
  return [
    q(
      'C.',
      kept === 'open'
        ? 'Such a pretty wall, darling. Red thread is so old-fashioned. Mr Pryce says you finished it in black.'
        : kept === 'photo'
          ? 'Mr Pryce found a door full of pinholes and nothing on it. Clever girl.'
          : 'Mr Pryce says your wardrobe door is shut. Very wise. Keep it that way.',
    ),
    t('He has been in again. Of course he has. I am always on the list.'),
  ];
}

function orderBlocks(s: GameState): Block[] {
  const target = target10(s);
  return [
    p('The courier comes at eleven at night, which is its own message: a boy on a bicycle with a padded envelope and no card, who will not wait for a signature.'),
    p('He is gone before the concierge has finished ringing up to say he is on his way. You find the envelope on the mat outside your door, squared to the frame, the way your papers were squared.'),
    p('Inside is a slim black phone, charged, with one contact saved in it. The contact is a single letter.'),
    p('It lights while it is still in your hand, as if it had been waiting for the warmth of it.'),
    q('C.', 'Maya Reyes. Compliance, level three. Her clearance renews in nine days. Renewals are such a formality. I would like one small thing from you, darling. Consider it a kindness to us both.'),
    t('Maya. She said Maya’s name. Nobody on that side of the table should know Maya’s name.'),
    p('Then nothing, for a whole minute, while you stand in the hall in your stockinged feet. She is letting you read it twice.'),
    ...wallSeen10(s),
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

/** A job is a set piece played in two halves around one moment (docs/story/scripts/CHAPTER_10_SHE_KNOWS_SCRIPT.md):
 * the order sets c10.job, the moment ends it. Refusals share one night, opened by what she walked away from. */
type Beat = [id: string, label: string, hint: string, body: (x: GameState) => Block[]];
type Job = {
  open: (s: GameState) => Block[];
  beats: (s: GameState) => Beat[];
  /** A second moment, where the set piece has one: its lead-in, then its choices (held in c10.job-after). */
  bridge?: (s: GameState) => Block[];
  after?: (s: GameState) => Beat[];
  close: (s: GameState) => Block[];
};

const refuseNight = (): Block[] => [
  p('You do not sleep. You lie on your back in the dark with the wall across the room from you, the cards pale in the streetlight, and you do the arithmetic Adrian was always good at: what she holds, what she wants, what she said she would do. Nine days. A renewal. Maya at the counter with her coat still on, the chipped mug, eleven years.'),
  t('I have refused things before. I refused the promotion speech I had written for myself when it went to Priya. I refused to cry in Sloane’s office. I have never refused anything that cost somebody else.'),
  p('You make yourself imagine it the way Adrian imagined risks, in order and all the way through: a letter on Compliance letterhead, a review room with no window, three questions, two of them about you. A badge taken at a gate by a guard who used to say good morning. Maya in her coat on the pavement outside Axiom at ten in the morning with nowhere to be.'),
  t('If I am going to choose this, I am going to know exactly what I chose. I owe her that much. It is a very small much.'),
  p('Once, around two, you get up and stand in front of the wall in the dark, and put your finger on Maya’s card, the one outside the thread, and leave it there for a long time, as if it could feel it.'),
  p('At three in the morning the black phone starts to ring.'),
];
const refuseBeats = (): Beat[] => [
  ['job-answer', 'Answer it', 'Hear her say it.', () => [
    p('You pick it up and answer it, and say nothing.'),
    p('Her voice, for the first time on this phone, is soft with sleep, or with something that sounds like it. There is music somewhere behind her, very low, and the clink of a glass being set down on stone.'),
    q('C.', 'I did so hope you would say yes. Never mind. Tell Maya I’m sorry. I rather liked her photograph.'),
    p('The line goes dead. You sit on the edge of the bed with the phone in your hand until it is light, and the whole time the only thing you can think is that she has seen a photograph of Maya, and you have not seen the photograph, and you do not know where it was taken.'),
  ]],
  ['job-ignore', 'Let it ring', 'Don’t give her your voice.', () => [
    p('It rings nine times. You count. You lie very still, as if it could hear you breathing, and on the ninth ring it stops, and the room is louder for it.'),
    p('Then it lights once more with a message.'),
    q('C.', 'Nine days, darling. Eight, now.'),
  ]],
];
const refuseClose = (): Block[] => [
  p('At six the light comes up grey behind the curtains. You get up and shower and dress properly, hair up and pinned, the face finished, because whatever arrives today you are going to meet it looking like someone who chose this.'),
  p('The black phone is quiet. The bakery shutters go up. Across the road the bench is empty, and you look at it for a long time before you understand that its being empty is also a message: nobody needs to watch you any more this morning. Whatever was going to happen has already been set in motion somewhere else.'),
  t('It is not me she will do it to. It was never going to be me.'),
];

const jobs: Record<Target10, Record<Answer, Job>> = {
  tape: {
    comply: {
      open: (s) => [
        ...(intimate7(s, 'theo')
          ? [
              p('Theo gave you a key to the loading-bay door the morning after, laughing, pressing it into your palm with his hand over yours: “So you never have to charm the night man.” You have not used it. You use it now, at ten to midnight, in the rain, with your collar up.'),
              p('The lock turns as if it has been waiting for you. Inside, the loading bay smells of wet cable and cold coffee, and the stage beyond it is dark: the two low chairs still set out under the dead lights, the glass of water nobody drank still on the table.'),
            ]
          : [
              p('The studio on the river looks different at midnight: the big letters on the roof switched off, the car park empty, one light in the security booth. The night producer is a boy with a lanyard and a sandwich who remembers you from the show and would very much like you to remember him.'),
              q('Night producer', 'Ms Vale! Did you — is everything —'),
              q('You', 'I left something in the green room. A scarf. I won’t be a minute.'),
              p('He lets you in himself, holding the door, apologising for the rain as if it were his fault, and does not think about it again. You are counting on that. You are counting, you realise, on being the kind of woman nobody thinks about twice after she has smiled at them.'),
            ]),
        p('The archive is two floors down, under the studio, reached by an iron stair that rings under your heels however carefully you take it. At the bottom: a long, low room of steel shelving, drives in labelled trays and older tapes in grey boxes going back decades, one work lamp on a trolley, and the air handling breathing somewhere overhead like something asleep.'),
        p('Your segment is where anyone would file it: under the date, in a tray on the third shelf, labelled in Theo’s untidy capitals. VALE — RAW — DO NOT RELEASE. He has underlined DO NOT twice.'),
        t('He underlined it for me. He was keeping it safe for me. That is what I am about to steal.'),
        p('The copy station is an old machine with a cracked plastic cover and a progress bar that moves as if it resents you. You plug in the drive that came with the black phone and start it, and it tells you eleven minutes.'),
        p('You do not watch the monitor. The monitor is showing the raw feed, silent, and on it your own face is leaning toward Theo’s, asking, twenty-five times a second, who signs for a stolen life. You watch the progress bar instead. You watch your hands. They are very steady. You have started to hate how steady they are.'),
        p('At minute nine there are footsteps on the iron stair. You know them at once, which is its own small shock: you know the rhythm of his walk now, the slight drag of the left heel. Theo. He has come back for the reading glasses he always forgets.'),
      ],
      beats: () => [
        ['job-lie', 'Tell him you left something in the green room', 'He might believe you. He might decide to.', (x) => {
          set10(x, 'theo-suspects', 'maybe');
          return [
            q('You', intimate7(x, 'theo') ? 'I left my scarf in the green room. I used your key; I didn’t want to wake anyone.' : 'I left my scarf in the green room. The night man let me in. I got lost looking for it.'),
            p('Theo stops at the foot of the stair. He looks at you, and at the lamp, and at the screen behind you where the progress bar is still crawling, and you watch him decide not to see it. It takes him exactly as long as it takes to decide anything that matters.'),
            q('Theo Marr', 'Your scarf. Of course.'),
            p('He finds his glasses on the shelf where he always leaves them, and puts them in his breast pocket, and kisses your cheek on his way past, and at the foot of the stair he stops with his hand on the rail.'),
            q('Theo Marr', 'Evelynn. Whatever it is, you could just ask me.'),
            p('Then he goes up, and you stand very still until the door at the top closes.'),
            t('He didn’t look. I am almost sure he didn’t look. I am going to have to live with almost.'),
          ];
        }],
        ['job-hide', 'Kill the lamp and stand in the dark', 'Let him find nothing.', (x) => {
          set10(x, 'theo-suspects', 'yes');
          return [
            p('You kill the lamp. The screen still glows, so you stand in front of it, your back to your own face. The footsteps stop at the bottom of the stair.'),
            q('Theo Marr', '…Hello?'),
            p('A long moment: long enough to hear him breathing, and the air handling, and the tiny, patient tick of the drive. Long enough for you to wonder what you will say if he turns on the light.'),
            q('Theo Marr', 'Goodnight, then.'),
            p('He says it to the dark, gently, and goes back up without his glasses.'),
            t('He knew. Or he knew someone was here and chose not to know who. Either way, he said goodnight to me.'),
          ];
        }],
      ],
      bridge: (s) => [
        p('The bar reaches the end. The machine clicks, as if satisfied. You unplug the drive and put the tray back exactly where it was, the label facing out, and on your way up the iron stair you take the steps at their outside edges, where they ring least.'),
        ...(intimate7(s, 'theo')
          ? [
              p('At the top the loading-bay door has swung shut behind him, and for one bad second you think he has locked it. He hasn’t. He never locks anything. It is the kind of thing you would have loved about him, a week ago.'),
              p('Across the car park the security booth is lit. The guard inside has looked up from his screen, and is looking at you.'),
            ]
          : [
              p('On the way out the night producer is still at his desk with the sandwich. He asks whether you found your scarf, and you hold up the empty hand you have been keeping a little behind you, and say no, and he says he’ll keep an eye out, and means it.'),
              q('Night producer', 'Could I — sorry — could I get a picture? For my sister. She’s got your poster on her wall.'),
            ]),
      ],
      after: (s) =>
        intimate7(s, 'theo')
          ? [
              ['seen-wave', 'Wave to him', 'Be a woman with every right to be here.', (x) => {
                set10(x, 'seen', 'guard');
                return [
                  p('You lift a hand, the way you would to a doorman you knew. After a moment he lifts his back, and goes back to his screen.'),
                  t('He will remember a woman waving. He will not remember a woman hiding. That is the whole of the trick.'),
                ];
              }],
              ['seen-hood', 'Turn up your collar and keep walking', 'Give him a coat and a pair of heels, nothing more.', (x) => {
                set10(x, 'seen', 'none');
                return [
                  p('You turn your collar up and keep your face to the rain and walk, not fast, to the gate. Behind you the booth light does not change.'),
                  t('If he writes anything down, it will be a coat and a pair of heels. Half the city owns both.'),
                ];
              }],
            ]
          : [
              ['seen-photo', 'Smile for his sister', 'Kind, and on the record.', (x) => {
                set10(x, 'seen', 'photo');
                return [
                  p('You smile for his sister. The flash goes off in the empty lobby, and he thanks you three times, and on the photograph, time-stamped 00:31, you are standing in Theo Marr’s studio with nothing in your hands.'),
                  t('An alibi and a piece of evidence in the same frame. I will have to decide later which one it is.'),
                ];
              }],
              ['seen-no', 'Tell him another time', 'Kindly. Leave no picture behind.', (x) => {
                set10(x, 'seen', 'none');
                return [p('You tell him another time, kindly, and he goes pink and says of course, and you leave him with his sandwich and his disappointment and no picture of you at all.')];
              }],
            ],
      close: (s) => [
        t(intimate7(s, 'theo') ? 'He slept beside me. He did not turn the pad over. And I am stealing his tape with his key.' : 'He said no to her office. He would have said yes to me. That is exactly why she sent me.'),
        p('At one in the morning you hand a sealed envelope to the night doorman at the Lindqvist. He takes it without a word, as if he has been expecting it all his life, and wishes you goodnight by name.'),
        p('You walk home. It is a long way and you walk all of it, in the heels, in the rain, because a taxi would get you home too quickly and you would have to be inside with what you have done.'),
        t('I was good at it. I am going to have to stop being surprised by that.'),
      ],
    },
    refuse: {
      open: (s) => [
        p('You go as far as the loading bay. The studio is dark except for the security booth, and the rain is coming sideways off the river, and you stand at the door with your hand flat against it.'),
        p(intimate7(s, 'theo') ? 'The key he gave you is in your pocket. You can feel the teeth of it through the lining.' : 'Through the glass you can see the night producer eating his sandwich, waiting for the kind of woman nobody thinks about twice.'),
        p('You think about Theo at his desk, turning a legal pad face down so that you would not have to see it. You think about DO NOT, underlined twice, in a hand you would know anywhere now.'),
        p('Then you take your hand off the door and walk home the long way, along the river, and put the black phone in a drawer.'),
        t('I will not be her courier. Whatever she does to me for it, I will not be that.'),
        ...refuseNight(),
      ],
      beats: refuseBeats,
      close: refuseClose,
    },
    counter: {
      open: () => [
        p('You call Theo at midnight and he answers on the first ring, as if he had been waiting for a call he could not name.'),
        q('You', 'Somebody wants the raw tape of my interview. The same somebody who rang your office. If I don’t get it for them, a friend of mine loses her job.'),
        p('The silence on the line is long enough that you can hear his flat around him: rain on a skylight, a radio very low, a chair creaking as he sits up. When he speaks again, the television voice is gone.'),
        q('Theo Marr', 'Then let’s give them a tape.'),
        p('He meets you at the loading bay twenty minutes later in a jumper and reading glasses with an old wax jacket over both, lets you in with his own key, and does not turn a single light on until you are both downstairs.'),
        p('In the archive he pulls two chairs up to the copy station, sits in one, and turns it to face you, and for a moment he is not Theo Marr at all: just a tired man of forty in the middle of the night, deciding how much trouble he is about to get into.'),
        q('Theo Marr', 'One condition. Tell me who it is.'),
      ],
      beats: () => [
        ['job-name', 'Tell him it’s Celeste Laurent', 'He will never let it go. That might be useful.', (x) => {
          setKey(x, 'act3.theo-knows', 'celeste');
          return [
            q('You', 'Celeste Laurent.'),
            p('He takes his glasses off and cleans them on the hem of his jumper and puts them back on, the way a man does when he needs a second that nobody will notice.'),
            q('Theo Marr', 'The old friend from the photograph. Of course it is. I had her on my list of people to ask about you. I had her quite near the top.'),
            t('Now he knows. Now he is a risk to her, and she is a risk to him, and I did that.'),
          ];
        }],
        ['job-withhold', 'Not yet', 'Keep him safe from the name, for now.', () => [
          q('You', 'Not yet. Not because I don’t trust you. Because I do.'),
          p('He looks at you over his glasses for a long moment, the look he gives guests who have said the true thing by accident.'),
          q('Theo Marr', 'Then I’ll cut blind. I’m very good blind.'),
        ]],
      ],
      bridge: () => [
        p('Then he works. You have never watched an editor work before. He does not touch the machine at first. He plays the raw feed with the sound up and listens to your question three times with his eyes closed, marking in and out points in pencil on a pad, like a man tuning an instrument by ear.'),
        q('Theo Marr', 'There. That’s where you stop being a guest and start being a story. Four seconds of breath either side. I’ll lose the lot.'),
        p('For two hours you watch him take your segment apart and put it back together without the one thing that matters. The question goes. So do the breath you took before you asked it and the silence after. What is left is a long, charming conversation about dresses, and a seam in the timecode that only a professional would ever see.'),
        q('Theo Marr', 'Anyone who knows what they’re looking at will know it’s been cut. Which is rather the point, isn’t it? You want her to know you said no, without ever having to say it.'),
        p('At four he sends it himself, from his own address, with a note that says only: “As requested. — T.M.” Then he takes off his glasses and rubs his eyes and laughs quietly at nothing.'),
        q('Theo Marr', 'I haven’t had this much fun since a minister tried to sue me. Go home. Sleep. I’ll be here when she notices.'),
        p('At the loading bay he stops you with a hand on your arm, the first time he has touched you all night.'),
        q('Theo Marr', 'When you’re ready to tell me the rest, I want it on the record. Not for the show. For me.'),
      ],
      after: () => [
        ['bay-kiss', 'Kiss him', 'You want to. That is reason enough tonight.', (x) => {
          set10(x, 'theo-bay', 'kiss');
          return [
            p('You kiss him in the doorway of the loading bay with the rain coming in sideways, briefly, the way you would sign something you meant. He tastes of cold coffee. When you step back he is smiling like a man who has just been handed a story he will never be allowed to tell.'),
            q('Theo Marr', 'Go home, Evelynn.'),
          ];
        }],
        ['bay-thank', 'Thank him, and go', 'Keep it where it is, for now.', (x) => {
          set10(x, 'theo-bay', 'thank');
          return [
            q('You', 'Thank you, Theo.'),
            q('Theo Marr', 'Don’t thank me yet. Thank me when she’s sorry.'),
            p('You walk out into the rain. When you look back from the gate he is still standing in the lit doorway, watching you go, the way you watch a door you are not sure will open again.'),
          ];
        }],
      ],
      close: () => [
        t('Theo is in this now. I put him in it. He is delighted, and that frightens me more than anything she has said.'),
      ],
    },
  },
  workroom: {
    comply: {
      open: () => [
        p('You ask Julian to take you up to the contracts room again, and he does not ask why. That is the thing about Julian. He decides what he will ask, and then he does not ask anything else.'),
        p('He meets you in the Helix lobby at ten, after the floor has emptied: the marble dark, the reception desk abandoned, one guard in a glass booth doing a crossword. Julian signs you in himself, his signature a single line you could not forge if you tried.'),
        p('In the lift he stands close. He smells of the day, of wool and someone else’s cigar and, underneath, of himself. He does not touch you. He never touches you first. You have noticed that, and you have liked it, and tonight you wish he would, so that you could hate him a little.'),
        p('The contracts room is as you remember it: the long table, the framed agreements along one wall like a gallery of trophies, the city pressing its lights against the glass. The third contract from the left.'),
        q('Julian Mercer', 'I keep meaning to take them down. My predecessor liked to look at what he’d bought. I find I prefer to look at what I haven’t.'),
        p('At twenty past, his phone goes: a call from Asia he has to take. He squeezes your shoulder, once, and steps out into the corridor, and leaves you alone with the wall.'),
        p('You do not hurry. Hurrying is what gets noticed. You lift the frame an inch from its hook so that the glass will not catch the light, photograph the page with Meridian’s name on it in two frames, steadily, the way you would photograph a menu, and set the frame back exactly as it hung.'),
        p('You are putting the phone away when you hear him: back early, the call cut short, his hand already on the door.'),
      ],
      beats: () => [
        ['job-lie', 'Tell him you were admiring the view', 'He wants to believe you. Let him.', () => [
          q('Julian Mercer', 'Sorry. Where were we?'),
          p('You are at the window when he comes in, with your back to the wall of contracts and the whole lit city in front of you, and you do not turn round at once.'),
          q('You', 'Nowhere. I was looking at the city. It looks different from up here. Smaller. I’m tired, Julian. Take me home?'),
          p('He does. In the lift he holds your hand, and you let him, and you do not look at your reflection in the brass.'),
        ]],
        ['job-cover', 'Kiss him before he can ask', 'Make sure the only thing he looks at is you.', () => [
          p('You cross the room before he is through the door and kiss him, hard, so that the only thing in the room he is looking at is you.'),
          p('He laughs against your mouth, surprised and pleased, one hand coming up to your jaw, and you hate how easy it was, and you kiss him again so that you do not have to think about how easy it was.'),
          q('Julian Mercer', 'Well. Where were we?'),
          q('You', 'Leaving. Take me home.'),
        ]],
      ],
      bridge: () => [
        p('He drives you himself, the long way, along the river, and talks about nothing: a restaurant he wants to take you to, a painting he nearly bought, a man in Singapore who once tried to sell him a racehorse. At the last light before your street he stops talking, and the wipers go back and forth, and he says it to the windscreen.'),
        q('Julian Mercer', 'Whatever you were looking for up there, I hope you found it.'),
      ],
      after: () => [
        ['car-true', 'Tell him something true', 'Not all of it. Something.', (x) => {
          set10(x, 'julian-car', 'truth');
          return [
            q('You', 'I was looking for the person who signed away my life, Julian. I think I found her. Please don’t ask me who.'),
            p('He does not ask. He drives the rest of the way with one hand on the wheel and the other resting, very lightly, on the seat between you, palm up. You do not take it. You look at it all the way home.'),
          ];
        }],
        ['car-silent', 'Say nothing', 'Let him have the silence.', (x) => {
          set10(x, 'julian-car', 'silent');
          return [p('You say nothing. The wipers go back and forth. After a while he starts talking about the racehorse again, and you are so grateful you could cry.')];
        }],
      ],
      close: () => [
        p('At your door he does not ask to come up, and he does not kiss you, and he waits in the car until your light goes on.'),
        t('He trusts me alone in a room with his contracts. That is what she was buying.'),
        p('At one in the morning the photographs leave your phone for the black one, and the black one says: “Thank you, darling.”'),
        p('You delete them from your own phone afterwards. It does not help. You know exactly where they are, and so does she.'),
      ],
    },
    refuse: {
      open: () => [
        p('You get as far as Julian’s number. You have it open on your screen with your thumb over it and the message already written: Can I see you tonight? At Helix. I’d like to see that room again.'),
        p('You think about the way he put himself between you and the door when the guard came, without a word, without asking why. You delete the message, one letter at a time.'),
        p('You put the black phone in a drawer.'),
        t('I will not walk her into his rooms. Whatever it costs.'),
        ...refuseNight(),
      ],
      beats: refuseBeats,
      close: refuseClose,
    },
    counter: {
      open: () => [
        p('You don’t ask to see the room. You ask to see him: his apartment, the forty-first floor, ten o’clock. He opens the door in his shirtsleeves, knows from your face that it isn’t that kind of evening, and lets you in anyway.'),
        p('You tell him the truth, or enough of it, standing at his window with the city under you: that someone who sits on a board above his counterparty wants the page you read on his wall, and that a friend of yours will lose her job if she does not get it. That you are not asking him for anything. That you are telling him because you will not do it behind his back.'),
        p('He listens without interrupting, the way he did at the audit, his hands in his pockets.'),
        q('Julian Mercer', 'Then she can have a page.'),
        p('He does not draft it yet. He pours two drinks, gives you one, sits on the arm of the sofa so that his eyes are level with yours, and asks the question you knew he would.'),
        q('Julian Mercer', 'Who is she to you?'),
      ],
      beats: () => [
        ['job-name', 'Tell him the truth', 'Give him her name. He will do something with it.', (x) => {
          setKey(x, 'act3.julian-knows', 'celeste');
          return [
            q('You', 'Celeste Laurent. She sat on the board that signed away the life I’m wearing.'),
            p('Julian sets his glass down very carefully on the arm of the sofa, and looks at it there for a moment, as if it had been someone else’s.'),
            q('Julian Mercer', 'Then I have had dinner with her four times and never once seen her.'),
            t('He believes me. Worse: he believes me, and he is angry, and an angry man with Julian’s access is a weapon I did not mean to pick up.'),
          ];
        }],
        ['job-withhold', 'Tell him: someone who owns me, for now', 'True, and not the whole of it.', () => [
          q('You', 'Someone who owns me. For now.'),
          q('Julian Mercer', 'For now. I like that you said that.'),
        ]],
      ],
      bridge: () => [
        p('Then he works, at the desk by the window, in his reading glasses, with a fountain pen, because, he says, anything typed can be traced to a keyboard and nothing handwritten can be traced to anything but a hand. He drafts a schedule for the third contract from the left: a counterparty that does not exist, a figure wrong by a single digit, a clause that would never survive a lawyer and would take a clever woman at least a week to notice.'),
        q('Julian Mercer', 'She’ll check it. People like that always check. Let her spend a week on it.'),
        p('The next night he takes you up to the contracts room himself, staples the new schedule behind the first sheet, rehangs the frame, and stands back to let you photograph it.'),
        p('Then the torch: a security round, early, exactly the way it came the first time, a white circle sliding along the frosted glass toward the door.'),
      ],
      after: () => [
        ['round-stay', 'Stay where you are, beside him', 'Two people with every right to be here.', (x) => {
          set10(x, 'julian-round', 'stay');
          return [
            p('You stay exactly where you are, beside him, in front of the wall, and when the guard opens the door Julian says good evening to him by name and asks after his daughter, and the guard apologises and goes, and never once looks at the frame.'),
            t('Two people with every right to be here. That is the best cover there is.'),
            p('You take the photograph after he has gone, slowly, in good light.'),
          ];
        }],
        ['round-photo', 'Finish the photograph first', 'Two frames. Flash off. Steady.', (x) => {
          set10(x, 'julian-round', 'photo');
          return [p('You take the photograph as the torch reaches the door, two frames, the flash off, your hand steady, and have the phone in your pocket when the handle turns. Julian is already between you and the door, the way he was the first time, saying good evening to the guard by name.')];
        }],
      ],
      close: () => [
        q('Julian Mercer', 'Now you owe me, and she owes us both a surprise. I find I don’t mind any of those things.'),
        p('In the lift going down he takes your hand, for the first time without asking, and you let him.'),
        t('He knows she owns me now. That was the price, and he paid it for me without being asked.'),
      ],
    },
  },
  notes: {
    comply: {
      open: (s) => [
        p('You write it all out again at the kitchen table, because that is what she asked for: everything, on paper, in your own hand. Meridian, the board, the ledger leaf, the week Evelyn vanished, the names, the dates. Everything you found the hard way, with no one’s permission.'),
        p('You write the registry first: the night desk, the file thinner than it should have been, the name scored through on the sign-out card. Then the doors you went through after it, one by one, in the order you opened them. Then Meridian, the shell with no face, and the client list with Helix halfway down it. You write the sentence about the board three times before it says only what you can prove.'),
        p('It takes until two. The lamp, the pen, the rain. Your hand aches, and then your wrist, and then something higher up that is not a muscle at all. You catch yourself writing in Adrian’s capitals, and stop, and write the rest in hers.'),
        p('Somewhere after one you read back what you have, and it is good. It is careful and sourced and dated, the kind of work Adrian did for eleven years for people who never read past the first page. Celeste will read every page. You are almost flattered. Then you are not, and you put the pen down, and stand at the dark window until you can pick it up again.'),
        t('It feels like signing a confession to somebody else’s crime. It feels like doing her homework for her.'),
        ...(c(s, 'c7.notes') === 'maya'
          ? [
              p('In the morning you call Maya and tell her you need the envelope back; it was a mistake to put her in it. She doesn’t argue. That is almost worse.'),
              p('She brings it to the counter at lunch, sealed, in the same brown envelope you sent it in, her own initials across the flap where she signed it closed. She holds on to it a second longer than she needs to before she slides it across.'),
              q('Maya', 'Are you in trouble?'),
            ]
          : [p('At the Lindqvist door you stop under the awning with the envelope in your hand. The doorman watches the street and not you, which is either a courtesy or a job.')]),
      ],
      beats: (s) =>
        c(s, 'c7.notes') === 'maya'
          ? [
              ['job-lie', 'Say no', 'Keep her out of it. She will believe you.', () => [
                q('You', 'No. I just want you out of it.'),
                p('She believes you. That is the worst part. She believes you, and she is relieved, and she pushes a bowl of noodles across to you as if the problem were that you had not eaten.'),
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
                p('You hand it over. It is the only copy. If she ever asks, you will be able to say so and mean it, and she will know you mean it, and that will be worth something later. You hope.'),
              ]],
              ['job-copy', 'Photograph every page first', 'She gets your work. She doesn’t get the only copy.', (x) => {
                set10(x, 'kept-copy', 'yes');
                return [
                  p('You step back under the awning and photograph every page against the wall of the club, forty-one pages, while the doorman watches the street and says nothing, and a taxi idles at the kerb with its meter running for somebody else.'),
                  t('She wanted my work. She is getting it. She is not getting the only copy.'),
                ];
              }],
            ],
      close: () => [
        p('You leave the notes with the doorman at the Lindqvist. He takes the envelope in both hands, the way you would take something fragile, or something that belongs to someone important.'),
        p('The black phone says, at once: “Beautiful handwriting. She had terrible handwriting.”'),
        t('She is going to read every word. She is going to know exactly how much I know, and exactly what I don’t. I have just handed her the map of my own blind spots.'),
        p('On the way home you pass the stationer where you bought the index cards, and go in, and buy a new notebook, a cheap one, and on the first page, standing at the counter, you write the one thing you left out. Then you put it inside your coat, in the lining.'),
      ],
    },
    refuse: {
      open: () => [
        p('You take the notes out of wherever you keep them and lay them on the kitchen table under the lamp, the way you would lay out a case, and look at them for a long time: Meridian, the board, the week Evelyn vanished, the names. Everything you found the hard way, with no one’s permission.'),
        p('Then you put them back.'),
        t('She wants my work. She can’t have it. Whatever she does instead, she does to me.'),
        t('Except she won’t. She said Maya’s name for a reason.'),
        p('You pin the black phone to the wall under her card, like evidence. It hangs there, dark, a small black rectangle in the middle of the red thread, and it is the first thing on the wall that belongs to her.'),
        ...refuseNight(),
      ],
      beats: refuseBeats,
      close: refuseClose,
    },
    counter: {
      open: () => [
        p('You write the notes again from memory, which is easy, because it is all in your head, the way Adrian’s filings always were. Forty pages. The lamp, the rain, the pen.'),
        p('You write them almost exactly as they are: enough truth that she will believe it, because she will check, and everything she checks will be right. The registry, the night desk, the scored-out name. The doors you went through, in order. Meridian, the client list, Helix halfway down it.'),
        p('Lying on paper, it turns out, is mostly a matter of rhythm. A real mistake has a shape: it comes when the hand is tired and the mind is somewhere else, halfway down a page, in a sentence that is otherwise dull. A planted mistake wants to sit somewhere important. You make yourself put it somewhere dull.'),
        p('Almost. At page thirty you stop with the pen over the paper and decide which lie to plant: one wrong detail, the kind a tired woman makes at two in the morning, that will show you exactly who Celeste passes your notes to, if it ever turns up in someone else’s mouth.'),
      ],
      beats: () => [
        ['job-date', 'Move a registry date by a week', 'Quiet. Only someone checking filings will trip on it.', (x) => {
          set10(x, 'poison', 'date');
          return [p('A filing date, moved by exactly seven days. It is the kind of mistake that looks like fatigue and reads like certainty. If it ever appears in someone else’s mouth, it came from these pages.')];
        }],
        ['job-letter', 'Change one letter in a company name', 'Loud, if anyone searches for it.', (x) => {
          set10(x, 'poison', 'letter');
          return [p('Meridian’s registered agent, spelled with one letter wrong. Anyone who searches for it will find nothing, and somebody, somewhere, will have to explain to someone why they searched.')];
        }],
      ],
      bridge: () => [
        p('At nine you take the envelope to the Lindqvist, freshly dressed and styled, as if you were dropping off a birthday present. The doorman takes it in both hands.'),
        q('Doorman', 'Shall I say who it’s from, madam?'),
      ],
      after: () => [
        ['doorman-e', 'Tell him: from E.', 'Let her decide which E.', (x) => {
          set10(x, 'doorman', 'e');
          return [q('You', 'From E.'), p('He inclines his head, as if E. were a name he had heard before, in this doorway, in this rain.')];
        }],
        ['doorman-none', 'Tell him she’ll know', 'She always does.', (x) => {
          set10(x, 'doorman', 'none');
          return [q('You', 'She’ll know.'), q('Doorman', 'Yes, madam. She generally does.')];
        }],
      ],
      close: (s) => [
        ...(c(s, 'c7.notes') === 'maya' ? [p('Maya’s copy stays exactly where it is. You do not ask for it back. If Celeste asks, you will tell her Maya burned it, and she will not be able to prove otherwise.')] : []),
        p('You walk home in the rain, and for the first time in days you enjoy it. You stop at the bakery and buy a coffee, black, and drink it on the bench across the road where the man with the newspaper usually sits, and watch your own front door for a while, the way they watch it.'),
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
    // The second moment, where the set piece has one; the answer was already settled by the first.
    if (get10(s, 'job-after'))
      return (job.after?.(s) ?? []).map(([id, label, hint, body]) =>
        offer10(id, label, hint, 'answer', (x) => {
          delete x.choices['c10.job'];
          delete x.choices['c10.job-after'];
          return [...body(x), ...job.close(x)];
        }),
      );
    return job.beats(s).map(([id, label, hint, body]) =>
      offer10(id, label, hint, job.after ? 'order' : 'answer', (x) => {
        if (!job.after) delete x.choices['c10.job'];
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
        if (job.after) {
          set10(x, 'job-after', 'yes');
          return [...body(x), ...(job.bridge?.(x) ?? [])];
        }
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
          // The Maya scene (set piece): the call, then the counter.
          p('At eight the next morning Maya calls. Her voice is very steady, the way it goes when it is not.'),
          q('Maya', 'Somebody pulled my clearance this morning. Suspended pending review, no reason given. They asked me three questions in the review room, and two of them were about you.'),
          q('You', 'Where are you?'),
          q('Maya', 'Outside. On the pavement. They walked me out. I’m standing next to the bin with the pigeons, holding a cardboard box with a cactus in it, like somebody in a film.'),
          q('You', 'The counter. One o’clock. I’ll be there first.'),
          p('You are there at half past twelve. You take the stools you always took, the two at the end by the steamed-up window, order nothing, and watch the door.'),
          p('At one she meets you at the counter in her coat, with the lanyard still round her neck and nothing on the end of it. She has left the box somewhere. She sits down, orders for both of you out of habit, the same two bowls, and then does not eat.'),
          q('Maya', 'Eleven years I’ve had that badge. They took it off me at the gate like I was a contractor. Frank did it. Frank, who does the crossword with me at Christmas. He wouldn’t look at me. He said, “Sorry, love, you’re on the list,” and held his hand out.'),
          p('She turns the empty clip of the lanyard over in her fingers while she talks, click, click, the way she used to turn a pen in meetings she thought were stupid.'),
          q('Maya', 'The review room hasn’t got a window. Did you know that? Eleven years in that building and I didn’t know. A man I’d never seen, a woman from Legal, and a jug of water nobody poured.'),
          q('Maya', 'First question: had I ever shared classified material with anyone outside the directorate. Second: did I know an Evelynn Vale socially. Third: how long had I known her.'),
          q('You', 'What did you tell them?'),
          q('Maya', 'The truth. No. Yes. A few weeks.'),
          p('She looks at you then, properly, for the first time since she sat down, and the look goes all the way in.'),
          q('Maya', 'It didn’t feel like a few weeks. That’s what I kept thinking, sitting there. It hasn’t felt like a few weeks for a while.'),
          q('Maya', 'I’ve got savings. I’ve got a union rep who owes me a drink. I’ll be fine for a month.'),
          p('She says it to her noodles, not to you.'),
          ...(['stranger', 'friend', 'window'].includes(c(s, 'c8.wake') ?? '')
            ? [
                q(
                  'Maya',
                  c(s, 'c8.wake') === 'window'
                    ? 'I took his mug to the Anchor, you know. For the drinks. I think I saw you outside the window. I didn’t say.'
                    : 'I took his mug to the Anchor, you know. For the drinks. Daniel cried. You were there. I saw you.',
                ),
                p('She does not ask why you were there. She puts it on the counter between you and leaves it there.'),
              ]
            : []),
          q('Maya', 'I just want to know who hates me enough to do it properly.'),
          t('Nobody hates you, Maya. That is what makes it unbearable. You are only the nearest thing to me that she could reach.'),
          t('It is not me she hurt. It is never going to be me.'),
        ]
      : [
          p('Maya does not call. You hear it at noon from Daniel, of all people, who rings for the first time in months to say, carefully, that Maya’s clearance was suspended this morning, and that someone in the review room asked about “Adrian’s friend from the magazine”.'),
          q('Daniel', 'I don’t know what you are to her. I’m only ringing because she won’t, and somebody ought to.'),
          q('You', 'Is she all right?'),
          q('Daniel', 'She walked out of the gate with a box and a cactus and told the guard to have a nice weekend. So, no. She’s Maya.'),
          ...(c(s, 'c7.daniel') === 'tie'
            ? [q('Daniel', 'And — the tie thing. On the tram. Somebody used to say that to me. I’ve been thinking about it. I don’t know why I’m telling you.')]
            : []),
          p('He rings off before you can thank him, which you suspect is the point.'),
          t('She didn’t call me. She kept me out of it. She is protecting me, and I am the reason she needs protecting.'),
        ];
  if (answer === 'complied') {
    const betrayed = get10(s, 'betrayed');
    return [
      p('Maya’s renewal comes through two days early, without a word. Nobody thanks you. Nobody knows there was anything to thank you for.'),
      ...(mayaBack(s)
        ? [
            p('You hear about it the way you hear about everything at Axiom now, sideways: a message from Maya herself at lunchtime, cheerful and baffled. “Clearance renewed EARLY. First thing in eleven years that building has done early. Drinks Friday. You’re paying, you’re famous.”'),
            p('You read it four times. You don’t answer until the evening, and then you answer with a joke, and it is the hardest joke you have ever written.'),
          ]
        : []),
      p('A second orchid arrives in the afternoon, white, in a black pot, with a card that has one word on it in the looping hand: “Lovely.”'),
      p('You stand in the hall holding the card for a long time. The hand is so pleased with itself.'),
      t('The leverage held. It will hold next time too, and she will ask for more, and I have just shown her what I will do for Maya.'),
      t('I did it well. That is the part I keep coming back to. I was good at it, and she knew I would be.'),
      q('Sloane · message', 'Laurent’s office asked Compliance to expedite a renewal this morning. A Ms Reyes. Did you know anything about that?'),
      t('Sloane is watching the same board I am, from the other side of it.'),
      ...(betrayed === 'theo'
        ? [
            p('Theo sends a message that night, cheerful, about nothing: a restaurant under the railway arches he wants to take you to, where they only cook three things and all three are right. He doesn’t know yet.'),
            t('He will. Tapes get played. When he plays that one, he will watch the counter and find eleven minutes he cannot account for.'),
          ]
        : betrayed === 'julian'
          ? [
              p('Julian sends flowers, which he has never done, with a card that says only “For last night.” He doesn’t know yet.'),
              t('For last night. He means the car, and the river, and the talking about nothing. He does not mean the frame. He will.'),
            ]
          : []),
    ];
  }
  return [
    p('Maya’s renewal comes through on the ninth day, ordinary and late, the way renewals do.'),
    p(
      mayaBack(s)
        ? 'She mentions it in passing, in a message about something else entirely: “Clearance came through, finally. The usual fortnight of pretending I might be a spy.” You laugh out loud in the empty kitchen, and then you have to sit down.'
        : 'You find out from the Axiom directory, where her name is still where it was, with the small green dot beside it that means current.',
    ),
    p('For eight days the black phone says nothing at all. You carry it everywhere. You sleep with it on the pillow beside you, face down, like a lover you do not trust.'),
    p('It lights up once, at midnight on the ninth.'),
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
          p('She answers on the first ring, which means she was holding the phone and deciding not to call you.'),
          q('You', 'I heard. It’s because of me. I can’t tell you why yet. I’m going to fix it.'),
          q('Maya', 'I know it’s because of you. I worked that out before Daniel did. Fix it, then. And then tell me why.'),
          q('Maya', 'And don’t ring me from your own phone again. I mean it.'),
        ]),
        reply('maya-leave', 'Leave her to it', 'She chose to keep you out. Respect it, for now.', 'maya-told', [
          p('You do not call. You write her name on a card and pin it next to Celeste’s, and run the red thread between them, and sit on the edge of the bed looking at it until it is light.'),
          t('She wanted me out of it. It is the one thing she has asked me for, and I can give it to her. It feels exactly like cowardice.'),
        ]),
      ];
    return [
      ...(mayaKnowsWho(s)
        ? [
            reply('maya-truth', 'Tell Maya the truth', 'Who, and why. She knows who you are; she can carry this.', 'maya-told', [
              q('You', 'It’s because of me. A woman called Celeste Laurent wanted something from me, and I said no, and this is how she answers. I am going to fix it.'),
              p('Maya puts her chopsticks down, square, side by side, the way she does when she is about to take something apart.'),
              q('Maya', 'The woman in the photograph.'),
              q('You', 'The woman in the photograph.'),
              q('Maya', '…Okay. Okay. Then tell me what I can do, and don’t you dare tell me nothing.'),
              p('She eats, suddenly, fast, the whole bowl, as if she has just remembered she is going to need her strength.'),
              t('She is not angry. She is enlisting. I do not deserve her.'),
            ]),
          ]
        : []),
      reply('maya-part', 'Tell her it’s because of you, not why', 'A true thing, and a wall around it.', 'maya-told', [
        q('You', 'It’s because of me. I can’t tell you why yet. I am going to fix it.'),
        p('She looks at you for a long moment through the steam. Then she reaches over and takes the last dumpling off your plate, which is the closest she comes, these days, to forgiving anyone.'),
        q('Maya', 'You’d better. And then you’d better tell me why.'),
      ]),
      reply('maya-nothing', 'Tell her nothing', 'Keep her out of it. She will know you are lying.', 'maya-told', [
        q('You', 'I’m so sorry, Maya. I don’t know.'),
        p('She doesn’t believe you. She lets you have it anyway. She pays for both bowls, which she has never once done, puts her coat on, and touches your shoulder on the way out, lightly, the way you would touch something to check it was still there.'),
        p('The silence afterwards is the worst thing on the wall.'),
      ]),
    ];
  }
  if (answer === 'complied')
    return [
      reply('wall-move', 'Move Celeste’s card closer to the middle', 'An honest measurement.', 'reply', [
        p('That night you stand in front of the wall with the little card in your hand. You move Celeste’s card an inch closer to the one that says ME. It is not a decision. It is an honest measurement.'),
      ]),
      reply('wall-card', 'Pin “Lovely.” under her name', 'Keep it. A receipt for what you did.', 'reply', [
        p('You pin the little card with its one word under Celeste’s name, where you will see it every time you open the door. Lovely. You make yourself read it until it stops meaning anything, and then a little longer, until it starts to mean something else.'),
        t('A receipt. She has given me a receipt. One day I am going to hand it back to her.'),
      ]),
    ];
  return [
    reply('reply-silence', 'Say nothing', 'Let her wonder what else you have.', 'reply', [
      p('You do not answer. You put the black phone in the drawer with your passport and close it, and that night, for the first time in nine, you sleep with it in another room.'),
      t('Let her wonder what else I have. Not knowing is the one thing I can give her that she hasn’t already got.'),
    ]),
    reply('reply-orchid', 'Send her an orchid', 'Your own, in your own hand.', 'reply', [
      p('In the morning you send an orchid to the Lindqvist, white, in a black pot, with a card in your own hand: “Breakfast was lovely. — E.” Let her decide which E.'),
      p('You carry it there yourself. The doorman takes it in both hands, as if he had been expecting it, and you walk home through the park feeling, for twenty minutes, like the one who is doing the playing.'),
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
      p('He pours you a drink without asking what you want, and gets it right, and hands it to you by the window with the whole city laid out underneath. The photograph is on the low table, torn out of the paper. He sees you see it.'),
      q('Julian Mercer', 'I kept it because you are laughing in it and your eyes aren’t. I have watched you do that across my boardroom table. I wanted to remember what it looks like from the outside.'),
      q('Julian Mercer', 'No business tonight. Tell me what you want.'),
    ];
  if (partner === 'theo')
    return [
      p('Theo’s message: “Come and have a drink with a man who is not going to ask you a single question.” You laugh out loud in the empty flat.'),
      getKey(s, 'act3.ally.theo')
        ? p('He opens the door above the studio in his jumper with the reading glasses pushed up into his hair, and the look he gives you is the look of a man who helped you lie to a very dangerous woman and has not stopped smiling since.')
        : p('The flat above the studio: the river along one side, a hundred books nobody has arranged, and the legal pad still face down on the desk.'),
      p('He has cooked, badly, something with too much garlic, and apologises for it for ten minutes, and you eat all of it sitting on the floor with your back against his sofa and your shoes off, and for ten minutes nobody on earth wants anything from you but an opinion on the garlic.'),
      q('Theo Marr', 'No cameras. No questions. Tell me what you want tonight.'),
    ];
  return [
    p('A message from a number saved under a single letter: “Between cities. One night. Harbour, the late set. Come and let me play you something that isn’t about anything.”'),
    p('He plays the middle section looking at you, and afterwards, in the corridor behind the stage, he does not kiss you straight away. He looks at your face first, as if checking it is still yours.'),
    q('Sebastian', 'You look like somebody has been leaning on you. Tell me what you want tonight, and nobody leans.'),
    p('He does not ask who. He never has. He takes your hand instead and turns it over and looks at the palm, the way he looks at a score before he plays it.'),
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
    p('The concierge carries it up himself this time, holding the black pot out in front of him like something that might go off. The flower is the same white. The card is heavier than the last, deckle-edged, the kind of card that costs more than the flower.'),
    q('The card', 'The first Thursday. The Vesper Gallery, eight o’clock. Some of our clients would love to meet you. Wear the green. Bring nobody. — C.'),
    t(
      getKey(s, 'act3.board-day')
        ? 'The first Thursday. The day the board meets. She has invited me to the one evening of the month when all of them are in the same city.'
        : 'Some of our clients. She is going to show me to them.',
    ),
    p('You prop it against the pot on the kitchen table and look at it while the kettle boils. You have walked past the Vesper Gallery: a black glass front on the embankment with no name on the door and one painting in the window, changed every month, never for sale.'),
    ...(c(s, 'c9.table') && c(s, 'c9.club')
      ? [t('The first Thursday. The book at the Straits Club before lunch, the table for two at Castellane at one, and now the Vesper at eight. Her whole day, and she has put me at the end of it.')]
      : []),
    ...(c(s, 'c9.rail') ? [t('Do it before the first Thursday, Sloane said, at the rail. She knew about this before I did.')] : []),
    t('Wear the green. Bring nobody. She has written me a dress code and a guest list, and the guest list is me.'),
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
        ...(c(x, 'c8.bank') === 'cash'
          ? [p('You pay in notes from the envelope in the flour jar. The woman at the till counts them twice and looks at you with new respect.')]
          : c(x, 'c8.bank') === 'new'
            ? [p('You pay with the building society card from across the river, the only card in your purse whose statements nobody else reads.')]
            : c(x, 'c8.bank') === 'leave'
              ? [p('You pay with the card, and watch the machine think about it for a second longer than it should, and know that somebody is watching you buy a dress.')]
              : []),
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
        return [
          q('You · to C.', 'I’ll be there.'),
          p('The reply comes at once: “I know.”'),
          p('A minute later, a second message, which is somehow worse: “You will adore the Thursday people. They are all so like you.”'),
        ];
      }),
      offer10('invite-wait', 'Let it sit', 'The Thursday will come whether you answer or not.', 'invitation', (x) => {
        set10(x, 'invitation', 'pending');
        return [
          p('You leave the card on the table beside the orchid and do not answer. She does not ask again. She doesn’t need to.'),
          p('That evening the concierge rings up to say a car has been booked in your name for the first Thursday of the month, half past seven, already paid. You did not book it. You do not cancel it either.'),
        ];
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
      p('At noon you go down for bread you do not want, because the flat has got too small. The woman ahead of you in the newsagent’s queue is scrolling with her thumb. She stops, and enlarges something, and looks up at you, and down again, and you watch her decide that she must be wrong.'),
      p(
        ambushed(s)
          ? 'By noon the photograph is everywhere that matters: the two of you in the window of the bakery on your street, the queue behind you like a crowd scene, her hand on your wrist, both of you laughing at something neither of you said.'
          : 'By noon the photograph is everywhere that matters: the two of you at the Lindqvist, lamplight and silver, her hand on your wrist, both of you laughing at something neither of you said.',
      ),
      q('The caption', 'Old friends. Evelynn Vale and Celeste Laurent, reunited.'),
      p('You read the rest standing at the rack with the paper open in both hands. The photograph is good. That is the first thing you notice, and you hate yourself a little for noticing. It was taken from the side and low down, from a table, not from the street. Whoever took it was sitting in the room with you, eating, while she held your wrist.'),
      q('The article', 'Laurent, whose fund has quietly backed half the new towers on the river, is rarely photographed and never interviewed. Friends describe her as “generous to a fault, and very, very patient”. Vale, whose Aster portrait has made hers the face of the season, declined to comment. A source close to Laurent says the two women “go back years”.'),
      t('Years. I have been alive, as this, for weeks.'),
      t('She has put her arm around me in front of the whole city. Anyone I tell about her now will have seen this picture first.'),
      p('Under the article there are already four hundred comments. You read nine of them. Three are about your dress. One asks who Celeste Laurent is, and the reply beneath it says only: “Nobody you will ever meet.”'),
      p('Then the phone starts, and does not stop.'),
      p('It rings in your pocket all the way up the stairs: four numbers, taking turns, as if they had agreed an order among themselves. You put it on the kitchen table beside the orchid and let it ring once all the way through, to hear who gives up first. Nobody does.'),
      ...noonPayoffs10(s),
    ];
  if (s.phase === 'wall')
    return [
      p('That night you do what Adrian did with a case that would not come apart in his hands. You take the mirror off the wardrobe door and lean it face in against the wall. You do not need to watch her while you work.'),
      p('He did it once before, on the back of a kitchen door in a flat that no longer has his name on it, the winter an acquisition went wrong underneath him: every party a card, every debt a thread. It was the only way he ever understood anything, by making it stand still and look back at him.'),
      p('Index cards from the stationer on the corner. A reel of red thread from the sewing kit that came with the flat. A box of pins. The back of the wardrobe door, which is wood and takes a pin, and faces the bed.'),
      t('Who holds what. What they want. What they have threatened. And what I hold back. Adrian would have called it a risk register. I am going to call it the wall.'),
    ];
  if (s.phase === 'order') return orderBlocks(s);
  if (s.phase === 'answer') return answerBlocks(s);
  if (s.phase === 'invitation') return invitationBlocks(s);
  if (s.phase === 'complete') {
    const outcome = get10(s, 'evening-outcome');
    const answer = get10(s, 'answer');
    return [
      ...(outcome?.startsWith('intimate')
        ? [p('You get home at dawn. The wall is where you left it. The orchid has opened another flower in the night.')]
        : [p('The orchid on the kitchen table has opened another flower. You leave the lamp off and look at it for a while in the light from the street: white, patient, turned toward the window, as if it were waiting for someone to come in.')]),
      p(
        answer === 'refused'
          ? mayaBack(s)
            ? 'On the way to bed you stop at the wall. Maya’s card is still outside the thread, on its own. You take a pin from the box and, very carefully, pin her back inside it.'
            : 'On the way to bed you stop at the wall, and put your finger on the card that says ME, and leave it there, as if it could feel it.'
          : answer === 'complied'
            ? 'On the way to bed you stop at the wall. The thread from Celeste’s card is tighter than it was. You did that. You leave it.'
            : 'On the way to bed you stop at the wall and look at the inch of bare wood between Celeste’s card and where it used to be. An inch. You could live in an inch.',
      ),
      ...(c(s, 'c9.kessler') === 'follow' ? [t('Anna Kessler had one season. I have had a few weeks. I intend to have a great deal more than a season.')] : []),
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
  if (s.phase === 'wall') return wallChoices(s);
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
