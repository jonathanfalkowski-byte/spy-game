/** Chapter 18 (Act IV finale, own-power played as the Celebrity route) · The Position:
 * morning → position → people → name → later → complete.
 * Design: docs/story/CHAPTER_18_THE_POSITION_DESIGN.md (owner-approved 2026-09-26, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_18_THE_POSITION_SCRIPT.md. Gated behind chapter18Playable(), reached from
 * an own-power Chapter 17 ending. The endings, as positions (ENDGAME_RECONVERGENCE §7, own-power: "hold the proof no one
 * can revoke; audience as shield; Adrian ends beholden to no door"; "increased agency, not capture"). The morning after,
 * read from the board's decision (act4.board, act4.terms), with Celeste's last word (a postcard from Lisbon, an orchid,
 * or nothing) and Sloane's; the aim becoming a life (act4.aim), and the last lever, the dead man's switch
 * (end.switch = armed | handed | disarmed); the people resolved, and who she goes home to (end.with); who she is now
 * (end.name = adrian | evelyn | new, none punished, the transformation not revisited); a year later, with an optional
 * chosen night (heat 3 at most, consent in character, fades); and the last card on a wall that is hers. The last
 * chapter of the route: nothing is offered after `complete`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { getKey, setKey } from './chapter7-model';
import { eveningPartners14 } from './chapter14';
import { mayaKnowsAdaptation } from '../state/chapter3-provenance';

export type C18Scene = { title: string; place: string; blocks: Block[] };
export type C18Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const offer18 = (id: string, label: string, hint: string, next: string, apply?: C18Choice['apply']): C18Choice => ({
  id: 'chapter18.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter18Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER18 === '1';

export const chapter18Definitions: Record<string, C18Scene> = {
  morning: { title: 'Friday', place: 'THE MORNING AFTER', blocks: [] },
  position: { title: 'The Position', place: 'THAT WEEK', blocks: [] },
  people: { title: 'The People', place: 'THAT MONTH', blocks: [] },
  name: { title: 'A Name', place: 'THE WALL', blocks: [] },
  later: { title: 'A Year Later', place: 'A YEAR LATER', blocks: [] },
  complete: { title: 'The End', place: '', blocks: [] },
};
export const chapter18Scenes = Object.entries(chapter18Definitions).map(([phase, scene]) => ({
  id: `chapter18.${phase}` as NodeId,
  ...scene,
}));

// ── What she walked out holding ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const board = (s: GameState) => (getKey(s, 'act4.board') ?? 'closed') as 'resigned' | 'diminished' | 'closed';
const terms = (s: GameState) => (getKey(s, 'act4.terms') ?? 'none') as 'full' | 'partial' | 'none';
const aim = (s: GameState) => (getKey(s, 'act4.aim') ?? 'terms') as 'expose' | 'terms' | 'nell' | 'out';
const spentWho = (s: GameState) => (['ally', 'relationship'].includes(c(s, 'c15.cost') ?? '') ? (c(s, 'c15.cost-who') ?? '').toLowerCase() : '');
/** Maya is close enough to be told everything over breakfast, and to be gone home to. */
export const mayaClose18 = (s: GameState) =>
  (c(s, 'c6.maya') === 'restored' || getKey(s, 'act3.maya-choice') === 'stay') && spentWho(s) !== 'maya';
type Partner18 = 'julian' | 'theo' | 'sebastian' | 'marsh';
/** Partners in play, not betrayed, and not spent in Chapter 15. */
export function partners18(s: GameState): Partner18[] {
  const gone = spentWho(s);
  return (eveningPartners14(s) as Partner18[]).filter((pt) => (pt === 'marsh' ? !['owen', 'owen marsh'].includes(gone) : pt !== gone));
}
const partnerName: Record<Partner18, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian', marsh: 'Owen' };
const partnerFull: Record<Partner18, string> = { julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian', marsh: 'Owen Marsh' };

/** Who could hold the switch for her. */
function keeper18(s: GameState): { id: string; name: string } {
  if (mayaClose18(s)) return { id: 'maya', name: 'Maya' };
  if (getKey(s, 'act4.sloane') === 'vouch') return { id: 'sloane', name: 'Sloane' };
  if (getKey(s, 'act3.ally.nora') === 'in') return { id: 'nora', name: 'Nora' };
  if (getKey(s, 'act3.ally.marsh') === 'in') return { id: 'marsh', name: 'Owen' };
  return { id: 'nadia', name: 'Nadia Brandt' };
}

// ── Friday ──

function morningBlocks(s: GameState): Block[] {
  const b = board(s);
  const a = aim(s);
  const sloane = getKey(s, 'act4.sloane');
  return [
    p('Friday comes up the way Fridays do, which is the first surprise. Buses. A man hosing down the pavement outside the café. The sky doing nothing in particular. You lie in bed and listen to it for a long time, the ordinary noise of a city that does not know yet, or does not care, what happened in a long room on the embankment last night.'),
    ...(b === 'resigned'
      ? a === 'expose'
        ? [p('Then the papers. The front page: the verdict, photographed, and a signature circled in red, and under it a headline that uses the word Meridian four times. By nine o’clock it is on every screen in the country. By ten, two ministers have said they were not aware.')]
        : [p('Then the papers, and a line in the business pages, four sentences, low down: MERIDIAN DIRECTOR STEPS DOWN. No reason given. In your bag, still folded in three, the back of the verdict with Deverell’s fountain pen on it, and four signatures.')]
      : b === 'diminished'
        ? [p('The papers say nothing. At eleven a letter comes by hand, typed, on Meridian’s cream paper, from Marguerite Soames: courteous, precise, and conceding in writing half of what you asked for, “pending the board’s further consideration”. You read it twice. You know exactly what is going to make them consider it.')]
        : [p('The papers say nothing. Nobody writes. Nobody rings. The board closed ranks, and the world closed round them like water. You have what you walked in with, and the switch, and the street, and the long slow road, and a Friday.')]),
    ...(b === 'resigned'
      ? [
          p('On the Monday, a postcard. A tiled street going steeply down to a river, trams, sun. Lisbon. On the back, in green ink, in the looping hand, no address:'),
          q('The postcard', 'You were worth it. C.'),
          t('The first one she ended was in Lisbon. She has gone back to where she started. I pin it up. I don’t know why. Yes I do.'),
        ]
      : b === 'diminished'
        ? [p('On the Monday, on the doormat: a single white orchid in a pot, with no card at all. You put it outside on the landing, for whoever wants it. Somebody always keeps them alive.')]
        : [p('From Celeste, nothing. Not on the Monday, not ever. The black phone, wherever it is, stays dark. It is the only thing she ever did that you did not see coming, and you understand, after a week, that it was the last move she had: to leave you waiting for one.')]),
    p(
      sloane === 'vouch'
        ? 'Sloane rings on the Wednesday. Axiom has cleared her, in writing; she is back at her desk; she wanted you to know, and to know that she has framed the letter, which is the first joke you have ever heard her make.'
        : sloane === 'use'
          ? 'Sloane leaves Axiom on the Wednesday with a cardboard box and the good shoes. She does not ring. A month later a copy of her report arrives by post, three hundred pages, with one line on a compliments slip clipped to the front: You were right to. — V.S.'
          : 'Sloane is on leave, writing a report nobody asked for. She rings every Sunday at ten, for exactly two minutes, and never once says why.',
    ),
  ];
}

function morningChoices(s: GameState): C18Choice[] {
  const m = (id: string, label: string, hint: string, body: Block[]) =>
    offer18('morning-' + id, label, hint, 'position', (x) => {
      setKey(x, 'end.morning', id);
      return body;
    });
  return [
    m('papers', 'Read every word, twice', 'You earned the reading.', [
      p('You buy every paper at the newsagent’s, including the ones you despise, and read every word of every one of them at the café across the road, twice, with a pen, the way Adrian read a filing, underlining the lies. There are a great many lies. You do not mind. They are all somebody else’s now.'),
    ]),
    m('sleep', 'Sleep until two', 'The first unguarded sleep in eight months.', [
      p('You sleep until two in the afternoon, with the phone off and the chain on and the curtains open, which you have not done once in eight months: a whole day of sleep, like something falling off you in layers. When you wake the light has moved all the way across the ceiling, and nobody wants anything from you, and you lie there and let that be true.'),
    ]),
    ...(mayaClose18(s)
      ? [
          m('maya', 'Breakfast with Maya', 'The whole story, slowly, with wine at eleven, as promised.', [
            p('Maya arrives at nine with pastries and a bottle, and you tell her all of it, slowly, from the promotion morning on, with wine at eleven as promised, and she interrupts only twice: once to say “Oh my God” and once, much later, to take your hand across the table the way she did once, very late, a long time ago.'),
            q('Maya', mayaKnowsAdaptation(s) || c(s, 'c6.maya-knows') === 'in-person' ? 'You idiot. You absolute idiot. I’m so proud of you I could scream.' : 'Adrian. It really was you. All of it. I’m so angry, and I’m so proud of you I could scream.'),
          ]),
        ]
      : []),
  ];
}

// ── The Position ──

function positionBlocks(s: GameState): Block[] {
  const a = aim(s);
  const tm = terms(s);
  const byAim: Record<'expose' | 'terms' | 'nell' | 'out', Block[]> = {
    expose:
      tm === 'none'
        ? [
            p('You publish anyway. Without the board’s paper, without anybody’s blessing, the slow way: the verdict to a journalist Theo trusts, the 1109 cards to the Authority, Nell’s order to a coroner in Singapore, one thing at a time, sourced, dated, until it cannot be ignored. It takes a year. It is a year of doors closing in your face, and then, one by one, opening.'),
            t('The audience as a shield. It takes longer to build without their signature on it. It is heavier. It is mine.'),
          ]
        : [
            p('The story runs, and runs. Theo’s documentary, three parts, a fortnight later. The Authority’s inquiry reopened, and widened, and given a budget. Questions in Parliament from people who had never heard the word Meridian a week before and now cannot stop saying it.'),
            p('You are the most recognised woman in the country. You cannot buy a coffee without somebody saying your name. And nobody, anywhere, can ever place you again, because everyone is watching.'),
            t('The audience as a shield. They made me famous so that they could sell me. It turns out famous is the one thing you can’t sell twice.'),
          ],
    terms:
      tm === 'none'
        ? [
            p('No undertaking. No paper. So you make the terms yourself: the switch armed, the letters out, three people who have never met waiting for a phone to stop ringing. Every week, a little less of Meridian’s attention on you. Every week, a little more of your own life back.'),
            t('Nobody gave me terms. I wrote my own, and I hold the pen.'),
          ]
        : [
            p('The undertaking holds. ' + (tm === 'full' ? 'All of it.' : 'Half of it in writing, and the other half because they know what is in three envelopes in three parts of the country.') + ' Maya is left alone. Adrian Vale’s name is retired and never spent. Page seven is closed. Nobody outside a handful of people in London knows what happened in that room.'),
            p('That is the point. You wake up every morning and nobody is watching the flat from across the gap. The flat across the gap is let to a couple with a baby, who wave.'),
            t('Wounded, quietly. Not toppled. And never, ever again, anything of mine.'),
          ],
    nell: [
      p(
        tm === 'full'
          ? 'Nell’s file goes to Nora, entire, by courier, the week after: every placement, every page, and the pages that were taken out of it. Nora rings you from Holland Village and does not say anything for a long time, and then says, “Thank you,” and then, “It’s all here.”'
          : 'Nell’s file stays in a drawer at sixteen degrees. But her order is in a coroner’s office in Singapore now, and the inquest into Eleanor Linden’s death has been reopened, and Nora has a date.',
      ),
      p('You fly out in the spring. The harbour wall at dusk, the two of you, Nora and you, sitting on it with your shoes off and your feet over the water, where the railing stops. Two coffees from the all-night stall: one black, one with two sugars and cinnamon, which the man has to go into the back to find.'),
      p('You put the sweet one on the wall between you. Nobody drinks it. Nobody needs to.'),
      t('Eleanor Linden. She took two sugars and cinnamon, and hated orchids, and wanted to go home. She got her name back. It was the only thing I could give her. It turns out it was the only thing she wanted.'),
    ],
    out: [
      p('You leave in the spring, with one bag, and the leverage in your pocket, and the switch armed behind you in three envelopes.'),
      p(
        partners18(s).includes('julian')
          ? 'Julian’s plane, from a small airfield in Kent, at dawn; he does not ask where to, and he does not come.'
          : getKey(s, 'act3.ally.iris') === 'in'
            ? 'A boat from a harbour on the south coast that Iris knows, skippered by a man who once told somebody in a bar in Singapore he would find her a boat, and meant it.'
            : 'A train, and then another train, and then a ferry, paid for in cash, in a coat nobody gave you.',
      ),
      p('A coast you have never seen. A town where nobody knows the face from the station poster, because the posters never came this far. A flat with a view of the sea and no view of anybody’s window.'),
      t('The door she never let Nell have. I walked through it for both of us.'),
    ],
  };
  return [
    p('The week after, you do what Adrian always did after a hearing: you sit at the kitchen table and write down what you now hold, and what it cost, and what you are going to do with it.'),
    ...byAim[a],
    ...(c(s, 'c15.cost') === 'money' ? [p('You are, for most of that year, very nearly broke. You find that you do not mind as much as Adrian would have.')] : []),
    ...(c(s, 'c15.cost') === 'visibility' && a !== 'expose' ? [p('You are never private again, after the seven minutes on air. People say Meridian at you in the street, as if it were your name. You learn to smile at them. It helps.')] : []),
    p('And one thing left on the table: three envelopes, three names, a switch. The last lever. The only one you ever get to decide about calmly, at a kitchen table, with nobody waiting for an answer.'),
  ];
}

function positionChoices(s: GameState): C18Choice[] {
  const keeper = keeper18(s);
  const sw = (id: string, label: string, hint: string, body: Block[], to?: string) =>
    offer18('switch-' + id, label, hint, 'people', (x) => {
      setKey(x, 'end.switch', id);
      if (to) setKey(x, 'end.switch-to', to);
      setKey(x, 'end.position', aim(x) + ':' + terms(x));
      return body;
    });
  return [
    sw('armed', 'Keep it armed', 'For the rest of your life. Three people, waiting for a phone that must keep ringing.', [
      p('You keep it armed. Every Sunday for the rest of your life you will ring three people who have never met, in three parts of the country, and say one sentence, and put the phone down. It will become, in time, a kind of prayer.'),
      t('Held. Nobody can revoke it. Nobody can even find it.'),
    ]),
    sw('handed', `Hand it to ${keeper.name}`, 'Someone you trust to hold it when you can’t.', [
      p(`You give the switch to ${keeper.name}: the three names, the sentence, the Sunday calls. ${keeper.name === 'Maya' ? 'She takes the envelope and puts it in her handbag next to her lipstick and says, “Obviously,” as if you had asked her to water a plant.' : 'They take it without a word, which is how you know you chose right.'}`),
      t('For eight months nobody in my life held anything but a lever over me. Now somebody holds one for me.'),
    ], keeper.id),
    sw('disarmed', 'Disarm it', 'Take the letters back and burn them. Free without a gun to anyone’s head.', [
      p('You take the letters back, one by one, from three people who are surprised and then, all three of them, relieved. You burn them in the kitchen sink with a match, and open the window to let the smoke out, and stand there a long time.'),
      t('I don’t need a gun to the head of the world to be free. I held one long enough to know that. Maybe that was the whole lesson.'),
    ]),
  ];
}

// ── The People ──

function peopleBlocks(s: GameState): Block[] {
  const out: Block[] = [p('That month, the people. One at a time, the way you took the cards down off the wall.')];
  const maya = getKey(s, 'act3.maya-choice');
  out.push(
    p(
      maya === 'stay'
        ? 'Maya gets the head-of-section job. She rings you from the pavement outside Axiom and screams, and then says, in her normal voice, “Dinner. You’re paying. Most expensive in London,” and you pay, and she orders the lobster, and doesn’t like lobster, and eats all of it anyway.'
        : maya === 'away'
          ? 'Maya comes back from Leeds in a hired car with her sister’s dog in the back, and walks up your stairs, and stands in the doorway, and says, “Right. The whole story. Properly,” and you tell her, and at the end she says nothing for a long time and then puts the kettle on.'
          : 'Maya goes on the record, and the man who wrote her emails loses his job, and she gets her interview back. She sends you a photograph of her new office door with her name on it. Underneath, one word: Thank you. And then, a minute later: I’m still angry. Both things.',
    ),
  );
  if (getKey(s, 'act3.ally.iris') === 'in') out.push(p('Iris sends a postcard from a coast, with no message on it at all, and a small drawing in one corner: a pair of flat shoes, size five.'));
  if (c(s, 'c8.pryce')) out.push(p('Mr Pryce drives a black cab now, his own, with the licence in his own name. You flag him down once, by accident, in the rain on the Strand. He will not take your money. He turns the heating up.'));
  if (getKey(s, 'act3.ally.nora') === 'in') out.push(p('Nora has Nell’s photograph on her kitchen wall in Holland Village, the one on the harbour wall, in flat shoes. Her son Sam asks about it sometimes. She tells him the truth.'));
  if (getKey(s, 'act3.ally.marsh') === 'in')
    out.push(
      p(
        ['owen', 'owen marsh'].includes(spentWho(s))
          ? 'Owen gets his inquiry back in the autumn, from the man they gave it to, who could not make head or tail of it. He cycles to work. He sends you a single page of it, the page with your name deliberately left off.'
          : 'Owen’s inquiry runs for a year and ends with three directors in front of a tribunal and one line in its conclusions about “a person who came forward at great cost to herself”. He sends you a copy with that line underlined, twice, in red pen.',
      ),
    );
  out.push(p('And the doorman at the Vesper, whose name, it turns out, is Joe, writes to you care of your agent: he has left, and is training to be a nurse, and he wanted you to know that you were the only person in four years who ever said good evening back.'));
  const cost = c(s, 'c15.cost');
  if (cost === 'ally' || cost === 'relationship')
    out.push(t(`And ${c(s, 'c15.cost-who') ?? 'the one I spent'}. I spent them on purpose, to make the rest hold. It held. I am still paying, and I will be for a long time, and it was still the right price.`));
  out.push(t('Who do I go home to? Not who wants me. Who I want.'));
  return out;
}

function peopleChoices(s: GameState): C18Choice[] {
  const withWho = (id: string, label: string, hint: string, body: Block[]) =>
    offer18('with-' + id, label, hint, 'name', (x) => {
      setKey(x, 'end.with', id);
      return body;
    });
  const lines: Record<Partner18, Block[]> = {
    julian: [
      p('You go to Julian. Not to the forty-first floor: to a flat he has bought by the river, with no view of anything he owns.'),
      q('Julian Mercer', 'Tell me what you want, and that’s what happens. That was always the offer. It still is. For as long as you want it to be.'),
    ],
    theo: [
      p('You go to Theo. The story ran; he ran it; he kept your name out of every word, as he promised, and it cost him the biggest scoop of his life, and he does not mention it once.'),
      q('Theo Marr', 'I’m going to stop asking you questions now. Permanently. It’s going to kill me. Stay anyway.'),
    ],
    sebastian: [
      p('You go to Sebastian, in whichever city the tour has reached: Vienna, it turns out, in the snow.'),
      q('Sebastian', 'You don’t have to tell me any of it. I read the papers. I’d rather hear what you want for breakfast.'),
    ],
    marsh: [
      p('You go to Owen, and the small flat in Kennington, and the bicycle on the wall, and the thousand pages of inquiry on every chair, which he moves, one pile at a time, so that you can sit down.'),
      q('Owen Marsh', 'No mirrors. I checked again. Toast?'),
    ],
  };
  return [
    ...partners18(s).map((pt) => withWho(pt, `Go home to ${partnerName[pt]}`, 'On your terms. For as long as you want.', lines[pt])),
    ...(mayaClose18(s)
      ? [
          withWho('maya', 'Go home to Maya', 'The family you chose. The sofa, the good blanket, the kettle.', [
            p('You go home to Maya: the blue sofa, the true-crime paperbacks, the kettle, the photograph of her and her sister squinting on a beach in Wales. Not a love story. The other kind, the kind that lasts.'),
            q('Maya', 'You’re on the sofa. The good blanket. Don’t argue. I’ve been waiting eight months to make you a hot-water bottle.'),
          ]),
        ]
      : []),
    withWho('alone', 'Go home to nobody', 'Your own flat, your own key, your own silence. A whole answer.', [
      p('You go home to nobody. Your own flat, your own key in your own lock, nobody watching the window, nobody waiting up. You make tea and drink it at the kitchen table and nobody asks you anything at all.'),
      t('Nobody. It is not the same as alone. I had to learn the difference. It took eight months and a board of directors.'),
    ]),
  ];
}

// ── A Name ──

function nameBlocks(s: GameState): Block[] {
  return [
    p(getKey(s, 'act3.home') === 'lost' && aim(s) !== 'out' ? 'A new flat, with a wall that is yours, that nobody else has ever pinned anything to.' : 'The wall, the last time.'),
    p('You take every card down. Celeste’s. Nell’s. 1109. The board. Maya’s, with KNOWS on it in her small capitals, if she wrote it. The black phone’s. Page seven, the actual page, torn along the spine. One by one, into a shoebox, with the lid on, and the shoebox on the top shelf of the wardrobe, next to a pair of flat shoes worn down at the left heel.'),
    p('The wall is bare. A few pinholes. The paint a little paler where the cards were.'),
    p('There is one card left in your hand. Blank. The last one. You sit down at the kitchen table with a pen, and look at it for a long time.'),
    t('Eight months ago a man called Adrian Vale went into a building and came out as a woman called Evelyn, who had belonged to somebody else, and before that to somebody else. Every name I have had was given to me. The last card is the only one I get to write myself.'),
  ];
}

function nameChoices(): C18Choice[] {
  const n = (id: string, label: string, hint: string, body: Block[]) =>
    offer18('name-' + id, label, hint, 'later', (x) => {
      setKey(x, 'end.name', id);
      return body;
    });
  return [
    n('adrian', 'Adrian', 'His name back, in the life you have. On your terms.', [
      p('You write ADRIAN VALE on the card, in capitals, in the hand that has changed so much in eight months you would not have recognised it once. Not going back. Nobody goes back. Taking his name with you, into this life, and making it mean what you want it to mean now.'),
    ]),
    n('evelyn', 'Evelyn', 'The name they gave you, made yours by what you did with it.', [
      p('You write EVELYN VALE on the card. They built her to be sold. She was a legend, and a product, and a page in a catalogue, and a dead woman’s coat. And for eight months she was you, and you did with her the one thing none of them ever imagined: you made her somebody nobody could own.'),
    ]),
    n('new', 'A new name', 'One nobody gave you. Write it, and keep it to yourself.', [
      p('You write a name on the card that nobody has ever called you. Not Adrian, not Evelyn, not Evie, not a page number. You look at it for a long time, and then you turn the card over so that the writing faces the wall.'),
    ]),
  ];
}

// ── A Year Later ──

function laterBlocks(s: GameState): Block[] {
  const a = aim(s);
  const b = board(s);
  return [
    p(
      a === 'out'
        ? 'A year later. The coast. A flat above a harbour where nobody knows the face from the station poster, because the posters never came this far.'
        : a === 'nell'
          ? 'A year later. London in the rain, and a photograph on your own kitchen wall now: two coffee cups on a harbour wall at dusk.'
          : 'A year later. London in the rain, the way it was on the first night, and every night after, and you have stopped minding it.',
    ),
    p(
      getKey(s, 'act3.black-phone') === 'keep'
        ? 'In a drawer, in a freezer bag, the black phone. You have never switched it on. You never will. You also have never thrown it away.'
        : 'No black phone, anywhere. Some nights you still listen for it, out of habit, and then remember, and laugh at yourself in the dark.',
    ),
    p('A friend of Iris’s sends you, by post, without comment, Meridian’s new catalogue: The Spring Collection. You turn to page seven. There is no page seven. The numbering goes six, eight. Somebody at the printer’s has had to be told, very carefully, to leave it out.'),
    ...(b === 'resigned' ? [p('A postcard from Lisbon every year, on the first Thursday of spring. Green ink. Never a word. Just the initial.')] : []),
    t('What I hold, a year on: my name, my key, my evenings. Nobody’s leverage. Not even mine.'),
  ];
}

function laterChoices(s: GameState): C18Choice[] {
  const withWho = getKey(s, 'end.with') ?? 'alone';
  const partner = ['julian', 'theo', 'sebastian', 'marsh'].includes(withWho) ? (withWho as Partner18) : undefined;
  const open = getKey(s, 'end.later-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer18('later-' + id, label, hint, 'complete', (x) => {
      setKey(x, 'end.later', id);
      return body;
    });
  if (partner && open) {
    if (open === 'invited')
      return [
        offer18('later-no-sex', 'Stay close, but not sex tonight', 'Kissing, touch, and stopping where you choose.', 'later', (x) => {
          setKey(x, 'end.later-open', 'no-sex');
          setKey(x, 'end.consent', 'no-sex');
          return [q(partnerFull[partner], 'Then that’s the night. You set the edge, and I stay on my side of it.')];
        }),
        offer18('later-sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.', 'later', (x) => {
          setKey(x, 'end.later-open', 'sex');
          setKey(x, 'end.consent', 'sex');
          return [q(partnerFull[partner], 'Yes. And you say stop, it stops. That hasn’t changed, and it isn’t going to.')];
        }),
        done('goodnight', 'Say goodnight', 'Leaving is complete and respected.', [
          p('You kiss him once, and say goodnight, and go to the window with a cup of coffee, black, and he lets you, and that is exactly what you wanted.'),
        ]),
      ];
    return [
      done('stop', 'Stop here', 'Honoured immediately, without argument.', [
        p('You put a hand flat on his chest and he stops at once, and holds you instead, and does not ask for anything, and the city goes on outside the window.'),
      ]),
      done(
        'close',
        'Stay',
        'Continue within what you chose.',
        open === 'sex'
          ? [
              p('He undoes the dress slowly, and says out loud what he likes about what he finds, and asks once more, low, with his mouth at your shoulder. You answer by drawing him down with you.'),
              p('What happens next is yours and his, and nobody holds anything over either of you, and nobody is watching, and nobody ever will be again. The scene fades.'),
            ]
          : [p('He kisses you by the window with the rain on it, slowly, and stops exactly where you told him to, and holds you there, his chin on your hair, until the lights across the river start going out one by one.')],
      ),
    ];
  }
  return [
    ...(partner
      ? [
          offer18('later-' + partner, `A night with ${partnerName[partner]}`, 'Chosen, and yours.', 'later', (x) => {
            setKey(x, 'end.later-open', 'invited');
            return [
              p('He is at the door at eight, with the rain on his shoulders, and does not come in until you ask him to.'),
              q(partnerFull[partner], 'Tell me what you want tonight. That’s what happens. It always was.'),
            ];
          }),
        ]
      : withWho === 'maya'
        ? [
            done('maya', 'An evening with Maya', 'The kitchen, the kettle, a laugh.', [
              p('Maya, in your kitchen, a year on, burning the toast, telling you about her new section and a man in it who does magic tricks at parties, uninvited. You laugh until you have to sit down on the floor, and so does she, and neither of you says anything about why.'),
            ]),
          ]
        : []),
    done('quiet', 'A quiet night', 'Alone, at a window, with a cup of coffee. Black.', [
      p('You sit at the window with a cup of coffee, black, the way somebody took it on a balcony in Singapore a long time ago, before any of this, and watch the city do nothing in particular, and it is enough. It is more than enough. It is the whole of what you wanted.'),
    ]),
  ];
}

// ── The End ──

function completeBlocks(s: GameState): Block[] {
  const name = getKey(s, 'end.name');
  return [
    p('The last card, pinned to a wall that is yours, in your own hand. Nothing else on the wall. Nothing else needs to be.'),
    t(
      name === 'adrian'
        ? 'My name is Adrian Vale. I was a product once. Now I’m the only one who knows what I’m worth.'
        : name === 'evelyn'
          ? 'My name is Evelyn Vale. They built her to be sold. I bought her back.'
          : 'I wrote my name on the last card and pinned it to the wall. It’s nobody’s business but mine. That’s the whole point.',
    ),
    { kind: 'notice', text: 'The end of the Celebrity route.' },
  ];
}

// ── Blocks and choices ──

export function chapter18Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter18') return [];
  if (s.phase === 'morning') return morningBlocks(s);
  if (s.phase === 'position') return positionBlocks(s);
  if (s.phase === 'people') return peopleBlocks(s);
  if (s.phase === 'name') return nameBlocks(s);
  if (s.phase === 'later') return laterBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter18Choices(s: GameState): C18Choice[] {
  if (!chapter18Playable(s)) return [];
  if (s.scene === 'chapter17' && s.phase === 'complete' && ownPower(s))
    return [offer18('begin', 'Friday', 'The morning after.', 'morning')];
  if (s.scene !== 'chapter18') return [];
  if (s.phase === 'morning') return morningChoices(s);
  if (s.phase === 'position') return positionChoices(s);
  if (s.phase === 'people') return peopleChoices(s);
  if (s.phase === 'name') return nameChoices();
  if (s.phase === 'later') return laterChoices(s);
  return [];
}

export function applyChapter18Choice(state: GameState, id: string): GameState {
  const choice = chapter18Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter18';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter18.${s.phase}` as NodeId, blocks: chapter18Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER18_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
