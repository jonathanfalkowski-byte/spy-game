/** Chapter 12 (Outside route, lane id `outside`) · His City:
 * ticket → arrivals → katong → hill → kitchen → quay → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_12_HIS_CITY_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_12_SCRIPT.md. The shared Singapore spine in Outside framing, with
 * the sender in his own city. He sends the ticket and insists on coming ("it's my city, and it's the only place I'm any
 * use"; together / apart); Changi at dawn, the heat, a man too warm in a courier's jacket. Katong, the breakfast place:
 * Mrs Wee takes her for the woman who stopped coming, and Celeste, it seems, still keeps a table for two on the first Sunday
 * of every month (play along / tell her / say nothing). Emerald Hill, number 9, the kept flat with the ivory jacket on the
 * dining chair (go in alone / take him in / leave it): he carried things to this door for three years and never went in.
 * Holland Village: Nora, Nell's sister, who knows the name Nell used for him, the Postman, and has never seen his face
 * (bring him in / leave him at the gate; then the trust question, which is his: ask him / wait / leave it). The harbour wall
 * at dusk (stand beside him / read the leaf to him / leave him alone with the water). A man in a linen suit watches. The
 * sender is still unnamed and Nell's death is not told here (Ch17); she is named by her sister as in every road. Keys `out.*`,
 * `act3.*`, `c12.o-*`; ids carry `o12-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';

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
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES12 = ['ticket', 'arrivals', 'katong', 'hill', 'kitchen', 'quay'] as const;
export const isOutside12 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase12 = (s: GameState) => isOutside12(s) && ((OUTSIDE_PHASES12 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const together = (s: GameState) => get12(s, 'o-ticket') === 'together';

export function placeOutside12(s: GameState): string | undefined {
  if (s.phase === 'arrivals') return '06:10 · Changi, Arrivals';
  if (s.phase === 'katong') return 'Morning · Katong, a coffee shop on Joo Chiat Road';
  if (s.phase === 'hill') return 'Evening · Emerald Hill, number 9';
  if (s.phase === 'kitchen') return 'Sunday · Holland Village';
  if (s.phase === 'quay') return 'Dusk · The harbour wall';
}

// ── The entry ──

export function beginOutside12(): C12Choice {
  return offer('begin-outside', 'A ticket in an envelope', 'Where it started.', 'ticket');
}

// ── The ticket ──

function ticketBlocks(): Block[] {
  return [
    p('The first Thursday of next month is on the wall in your own hand, under a card that says UNCLAIMED. You have a little under four weeks before a thing that has been priced for you is delivered to somebody who has paid. And on the third step of the iron stair, where the key was, and the box was, an envelope.'),
    p('A single ticket, economy, London to Singapore, Sunday night, in a name you have never used, and four hundred dollars in small notes. At 02:40 the cheap phone rings.'),
    q(SENDER, 'If you want to know what you’re being placed into, go where it started. Singapore. It’s where she lived. It’s where I’m any use. I know the city the way you know a room you grew up in with the lights off.'),
    q(SENDER, 'I’m coming. Not as your source. As a man who knows which streets to stay off. I haven’t been home in three years, and I’m not a man who can say that out loud to anyone but a telephone.'),
    t('Home. He has said it once, and plainly, and gone on talking as if he had said nothing at all.'),
  ];
}

function ticketChoices(): C12Choice[] {
  const k = (id: 'together' | 'apart', label: string, hint: string, body: Block[]) =>
    offer('o12-ticket-' + id, label, hint, 'arrivals', (x) => {
      set12(x, 'o-ticket', id);
      setKey(x, 'out.sg12', id);
      return body;
    });
  return [
    k('together', 'Fly together', 'He is on the same flight, three rows back.', [
      q('You', 'We fly together. If something’s going to go wrong, I want to see it from the same row.'),
      q(SENDER, 'Three rows back. Don’t turn round. I’ll be the man who doesn’t look at you for fourteen hours.'),
      p('He is. You do not turn round once, and you know to the inch where he is the whole way, the way you know where a camera is.'),
    ]),
    k('apart', 'Fly apart', 'Separate flights. Meet in the city.', [
      q('You', 'Separate flights. I don’t want us on one manifest.'),
      q(SENDER, 'Then I’ll fly through Doha and be there before you. I’ll be in Arrivals. I’ll be the man you recognise by the way I don’t look pleased to be home.'),
      p('You fly alone, in a window seat with a view of nothing, and for fourteen hours you have the unaccustomed feeling of being on your own account.'),
    ]),
  ];
}

// ── The arrivals ──

function arrivalsBlocks(): Block[] {
  return [
    p('Changi at ten past six in the morning, the air-conditioning cold as a mortuary and the heat waiting behind the glass like a held breath. The smell of the place, wet green and jet fuel and something sweet frying, comes to you before you reach the doors, and under it something that you do not recognise, and that is not in the Axiom package, and that you will remember for the rest of your life: the smell of somebody else’s home.'),
    p('He is in Arrivals, as promised, in the courier’s jacket, which is wrong for the weather by twenty degrees, with his hands in the pockets and his face turned to the middle distance. In daylight, in the crowd, among the families with their garlands and their trolleys, he looks like what he is: a man standing very still in a city that has gone on without him.'),
    q(SENDER, 'Evelynn.'),
    p('The pause is there before your name, the half-beat, and in this air, in this city, you understand for the first time what it is. It is not the pause of a man learning a word in a language he learned late. It is the pause of a man who is stopping himself from saying a different one.'),
    q(SENDER, 'Don’t say anything. Don’t look at the taxis. Look at the man with the flowers. Good. Now we walk.'),
  ];
}

function arrivalsChoices(): C12Choice[] {
  return [offer('o12-arrivals-on', 'Walk with him', 'Out of the cold and into the wet.', 'katong', () => [p('The doors part, and the heat takes you by the whole of the body, and for a moment you stand in it with your eyes shut and let it. He waits. He does not hurry you. He is, you notice, breathing in as if it were a medicine.')])];
}

// ── Katong ──

function katongBlocks(): Block[] {
  return [
    p('A coffee shop on Joo Chiat Road, marble tables and wire-backed stools, a ceiling fan and a woman in an apron stirring a kettle the size of a child. It is the place on the leaf: the Katong breakfast, the one a woman planned for a week and a friend did not come to. He does not tell you this. He sits down at a table by the wall, with his back to it, and looks at the table opposite, which is laid for two, and has been, you can see, for a very long time.'),
    p('The woman in the apron looks up from the kettle. She stops. She sets the kettle down very carefully. She comes across the marble floor with her hand to her chest.'),
    q('Mrs Wee', 'Miss Evelyn! So long! Where you go? We think you go home. Last March, you stop coming, no message, nothing. Same like always: kopi-o kosong, kaya toast, soft eggs?'),
    p('And she looks past you, at the table laid for two, and then, very gently, at the man by the wall, who has gone entirely grey.'),
    q('Mrs Wee', 'Your friend also. The tall one. She still comes. First Sunday every month she sit one hour, two cups, she don’t drink. I tell her, madam, I think Miss Evelyn gone. She say, “I know, I’m just keeping the table.”'),
    t('A table for two. Celeste, once a month, in a coffee shop on Joo Chiat Road, keeping a seat for a woman who is not coming. I do not have a word for what that is, and I do not like that I do not.'),
  ];
}

function katongChoices(): C12Choice[] {
  const k = (id: 'along' | 'told' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('o12-katong-' + id, label, hint, 'hill', (x) => {
      set12(x, 'o-katong', id);
      setKey(x, 'out.katong12', id);
      setKey(x, 'out.watched12');
      note(x, 'o-table', 'Celeste Laurent keeps a table for two at a Katong coffee shop on the first Sunday of every month, and orders for the first Evelyn, who stopped coming last March.', 'Mrs Wee, Joo Chiat Road');
      return [...body, p('At the corner table, a man in a linen suit, who has not touched his coffee, looks at you twice and at the man by the wall once, and puts a note under his saucer, and goes.'), t('Somebody saw us. Somebody who will say so to somebody who will say so to her.')];
    });
  return [
    k('along', 'Play along', 'Let her believe it. Learn what she ordered.', [
      q('You', 'Same as always, please.'),
      p('The woman beams. She brings the kopi-o kosong black as ink, and the kaya toast cut in strips, and the soft eggs in their little glass with the soy and the pepper, and sets a second cup opposite, empty, out of habit. She watches you eat and pours, and does not stop smiling, and does not ask a single question, which in her way is a kind of grace.'),
      t('She ordered it black, no sugar, the toast in strips. I am learning a stranger by her breakfast, and I like her.'),
    ]),
    k('told', 'Tell her gently', '“I’m not her. I’m so sorry.”', [
      q('You', 'I’m sorry. I’m not who you think. I’m — a friend. Of hers. I came to see where she had breakfast.'),
      p('Mrs Wee’s face goes still, and then does a thing that is worse than tears, which is smile, carefully, as if you had told her the weather.'),
      q('Mrs Wee', 'Ah. Then I know why she stop coming.'),
      p('She makes you the coffee anyway, and does not charge you, and will not hear of it.'),
    ]),
    k('silent', 'Say nothing', 'Sit. Let the table be what it is.', [p('You sit at the marble table and say nothing at all, and she brings what she brings, and you eat it, and across the room he sits with his back to the wall and does not eat, and neither of you says one word, and the fan turns, and it is the loudest breakfast of your life.')]),
  ];
}

// ── The hill ──

function hillBlocks(s: GameState): Block[] {
  return [
    p('Evening, Emerald Hill, number 9: a narrow terraced house in a lane of narrow terraced houses, shutters and tiles and a brass number, the street so quiet you can hear the geckos. A caretaker’s cousin in the next doorway has left the key under a pot, as promised, in a note you were handed at the airport that you have not asked the source of.'),
    p('He stops at the foot of the steps. He will not climb them.'),
    q(SENDER, 'I’ve carried things to this door for three years. A thin envelope on a Tuesday. A drive on a Friday. I’ve never been inside it. She never asked me in, and I never asked. I’ll wait here.'),
    ...(together(s) ? [] : [p('He says it as if it were a thing he had decided on the plane.')]),
    t('A kept flat, one of nine, dressed every month so that when anybody checks, Evelyn Vale has somewhere to live. He has stood at this door a hundred times with a package in his hand, and never gone in, because she never said he might.'),
  ];
}

function hillChoices(): C12Choice[] {
  const h = (id: 'alone' | 'with' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('o12-flat-' + id, label, hint, 'kitchen', (x) => {
      set12(x, 'o-flat', id);
      setKey(x, 'out.flat12', id);
      return body;
    });
  return [
    h('alone', 'Go in alone', 'He waits at the foot of the steps.', [
      p('The key turns as if it had been oiled last week. It probably was. You stand in the doorway with your hand on the switch and do not press it, and the street lamp lays the room out in bars through the shutters: a long room, a fan, a sofa, a dining table with two chairs, glass doors onto a balcony over the lane.'),
      p('Then you press the switch, and it is the room from the photographs, the sofa, the lamp with the crooked shade, and on the back of the dining chair, where it hung in the photograph, an ivory jacket. A lipstick by the mirror with the cap off. White orchids in a glass vase, the water changed.'),
      t('It is not a home. It is a set. They kept the shape. Down in the lane, on the foot of the steps, a man who has never come in is holding his own breath.'),
    ]),
    h('with', 'Ask him in', 'He has never been over the threshold. Offer it.', [
      q('You', 'Come in.'),
      q(SENDER, 'She never asked me in.'),
      q('You', 'I’m asking.'),
      p('He comes up the steps like a man crossing a river on stones, and stands in the doorway, and does not press the switch, and you press it for him. The room comes up around the two of you: the sofa, the lamp, the jacket on the chair. He looks at the jacket for a very long time, and puts out one hand, and does not touch it, and takes the hand back.'),
      q(SENDER, 'She hated orchids.'),
      t('He knows that. Nobody in the Axiom package knew that. Somebody who stood on a doorstep with a thin envelope for three years knew that.'),
    ]),
    h('leave', 'Don’t go in', 'It’s a set. Some places you just stand outside.', [p('You do not go in. You stand on the step with your hand on the brass number for a minute, looking at the shutters, and then you come down the steps, and he looks at your face, and says nothing, and you walk away down the lane together, two people who have stood outside the same door.')]),
  ];
}

// ── The kitchen: Nora ──

function kitchenBlocks(): Block[] {
  return [
    p('Sunday, Holland Village: low white houses behind hedges, a hawker centre smelling of charcoal and lime, children on bicycles, the heat sitting on everything like a cat. A house at the end of a lane, a frangipani dropping its flowers on a child’s bicycle, a porch with a fan, a door with a name on a painted tile: LINDEN.'),
    t('I am about to show a woman her dead sister’s face. And beside me, in the lane, a man who has been her sister’s Postman for three years, and has never once been let past the gate.'),
    p('The woman who opens the door is forty, in a faded cotton dress, with reading glasses pushed up into grey-streaked hair and a pen in her hand. She has her sister’s mouth. She has, you realise with a lurch, your mouth.'),
    p('The pen falls out of her hand, and she takes hold of the door frame with both hands as if the house were moving.'),
    q('Nora', 'Nell?'),
  ];
}

function kitchenChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'o-nora')) {
    const n = (id: 'with' | 'gate', label: string, hint: string, body: Block[]) =>
      offer('o12-nora-' + id, label, hint, 'kitchen', (x) => {
        set12(x, 'o-nora', id);
        setKey(x, 'out.nora12', id);
        setKey(x, 'act3.nell', 'known');
        note(x, 'o-nora', 'Nora Linden, Nell’s sister, told Evelynn that her sister Eleanor rang on the Saturday night to say she was out, and that a friend rang on the Sunday morning, before the police, to say she was so sorry.', 'Nora Linden, Holland Village');
        return body;
      });
    return [
      n('with', 'Bring him in', 'Nora has never seen the Postman’s face.', [
        q('You', 'This is — somebody who knew her.'),
        p('Nora looks past you at the man in the courier’s jacket, standing in her porch in the wrong clothes for the weather, holding himself as if he were carrying something, and she does not know him. Her face does not move at all. She looks straight at him, and sees a stranger.'),
        q('Nora', 'Come in. Both of you. I’ll put the kettle on.'),
        p('The kitchen is small and bright and full of her son’s drawings. She makes coffee without asking, and puts two sugars and a pinch of cinnamon in yours, and stops with the spoon in her hand.'),
        q('Nora', 'That was hers. Two sugars and cinnamon. Our mother made it like that.'),
        q('Nora', 'She had a name for him, you know. For her friend. She never said who. She called him the Postman. “The Postman says Tuesday.” “The Postman’s a good man.” I always wanted to meet the Postman.'),
        p('She says it to the table, not to him. At the end of it, in the chair next to yours, a man has become very careful about his cup.'),
        ...norasStory,
      ]),
      n('gate', 'Leave him at the gate', 'Under the frangipani. This part is hers.', [
        q('You', 'There’s somebody with me. He’d rather wait. I think he’d rather not be seen.'),
        p('Nora glances down the path at the man in the courier’s jacket standing under the frangipani with his hands in his pockets and his face turned away, and does not know him, and lets it go.'),
        q('Nora', 'Come in, then. Just you.'),
        p('The kitchen is small and bright and full of her son’s drawings. She makes coffee without asking, and puts two sugars and a pinch of cinnamon in yours, and stops with the spoon in her hand.'),
        q('Nora', 'That was hers. Two sugars and cinnamon. Our mother made it like that.'),
        q('Nora', 'She had a name for her friend. She never said who. She called him the Postman. “The Postman says Tuesday.” I always wanted to meet the Postman.'),
        p('Through the window, under the frangipani, a man is standing with his back to the house, very still, as if he had been told to.'),
        ...norasStory,
      ]),
    ];
  }
  const a = (id: 'ask' | 'wait' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('o12-trust-' + id, label, hint, 'quay', (x) => {
      set12(x, 'o-trust', id);
      setKey(x, 'out.asked12', id);
      return body;
    });
  return [
    a('ask', 'Ask him', 'At the gate, with the frangipani coming down. “Were you the Postman?”', [
      q('You', 'Were you the Postman?'),
      p('He stands very still, with the white flowers on his shoulders. The silence is not the silence of a man deciding whether to lie. It is the silence of a man deciding whether he is able to stand up under what he is about to say.'),
      q(SENDER, 'Yes. I was. And it’s not all of it, and it isn’t the part that matters most. Not here. Not at her sister’s gate. Before the first Thursday I’ll tell you all of it, from the beginning, in a room you pick. I swear it on the only thing I’ve got left.'),
      q('You', 'What have you got left?'),
      q(SENDER, 'A page in a dead woman’s hand that says I was there. You’re the only person who’s seen it.'),
    ]),
    a('wait', 'Wait', 'Give him room. Let it be his to say.', [p('You do not ask. You walk beside him down the lane with the heat coming off the pavement in sheets, and let the not-asking be the question. He does not answer it. At the end of the lane, at the corner where the taxis wait, he says, without turning, “Thank you for not,” and that is all, and it is a great deal.')]),
    a('leave', 'Leave it', 'Not today. Not in her sister’s lane.', [p('You leave it where it is. You have a feeling about it, the size and shape of a sentence you could say, and you do not say it. You will know when. The taxi takes you to the sea, and neither of you speaks, and the not-speaking has a different weight from before.')]),
  ];
}

const norasStory: Block[] = [
  p('And she tells it, for an hour. Eleanor Linden, Nell to everyone who mattered, two years older, the clever one. A job in a family office that paid for everything and could not be described. A second name for work, Vale, that she said was “for the clients”, with a little laugh. Nora followed her out here eight years ago, and they had lunch every Sunday, and Nell never missed one, not once, until the one she missed.'),
  q('Nora', 'She rang me on the Saturday. Late. She said, “I’m out. I’m coming to you tomorrow. Make up the spare bed.” She sounded — happy. Frightened, and happy. I made the bed.'),
  q('Nora', 'She didn’t come. They found her in the harbour the next week. Misadventure, the coroner said. She had a bad leg, it was dark, the wall by the water is low there. They said she had been drinking. Nell didn’t drink.'),
  q('Nora', 'And her friend rang me. On the Sunday morning, early, before the police, before anybody knew anything. The tall one, with the beautiful voice. She said she was so sorry. So terribly sorry. And then she rang off. I have spent a year wondering how she knew.'),
];

// ── The quay ──

function quayBlocks(): Block[] {
  return [
    p('Dusk, and the harbour, the wall by the water that Nora said was low: a long line of old stone with the lamps coming on one by one along it and the lit ships standing out in the roads like a second city. You have not asked him to bring you here. He came, and you came with him.'),
    p('He walks to the wall. He does not touch it. He stands a yard back from it, as if it were something that could still be waked, and the water goes by below, black and unhurried, and a very long way down.'),
    q(SENDER, 'A week after, they found her. That’s all anyone ever told me. A week, and a wall, and the word misadventure. I’ve never known how, and nobody who does will tell me, and I have been on the other side of a great many doors.'),
    t('He doesn’t know. After a year of pages and a flight and a kopitiam and a flat he would not enter, he does not know how she went into this water. And whoever does, I now understand, is in a room I am walking towards.'),
  ];
}

function quayChoices(): C12Choice[] {
  const w = (id: 'beside' | 'leaf' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('o12-wall-' + id, label, hint, 'complete', (x) => {
      set12(x, 'o-wall', id);
      setKey(x, 'out.wall12', id);
      return body;
    });
  return [
    w('beside', 'Stand beside him', 'No words. A yard from the wall, with him.', [p('You stand beside him, a yard from the wall, and do not say anything. After a long time he says “Thank you,” to the water, not to you, and you do not answer that either, and the lamps come on along the quay, one by one, until it is a long bright line from one end of the dark to the other.')]),
    w('leaf', 'Read him her hand', 'The leaf, in his pocket. Her note in the margin.', [
      q('You', 'You have the leaf. Give it to me. I want to read you something.'),
      p('He takes it from the lining of his jacket, folded small, soft with handling, and puts it in your hand without a word. You open it under a lamp. The courier log, the handoff at 02:40, the circled R., and in the margin, small and fast:'),
      q('The leaf', 'Missed the Katong breakfast for this. C. will sulk.'),
      q('You', '“C. will sulk.” She was annoyed about a breakfast. She wrote it down.'),
      p('He makes a sound, short, and not a laugh, and takes the leaf back, and holds it as if it might be taken.'),
      q(SENDER, 'She was always annoyed about the breakfasts. She said the woman could have been sulking about anything, and chose a coffee shop.'),
    ]),
    w('alone', 'Leave him alone with it', 'Walk down the wall. Come back when he’s ready.', [p('You walk away along the wall, slowly, to the first lamp, and stand under it with your back to him, and look at the ships. You give him the length of the quay. When you come back, he is standing exactly where you left him, and he has not moved, and his face is wet, and he lets you see that, which is the thing you will remember.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const kt = key(s, 'out.katong12');
  return [
    p('The hotel, late, on the other side of the island from a flat and a kitchen and a wall. Two rooms, two floors apart, which is how he booked them. The window looks out at nothing, a car park and the blank side of another hotel, and you stand at it for a long time.'),
    p('The wall of the room, where you have pinned, because it is what you do, the four things of the day, on the hotel’s own notepaper, in capitals:'),
    q('The card', 'SINGAPORE. HIS CITY.'),
    q('The card', kt === 'along' ? 'MRS WEE. SAME AS ALWAYS.' : kt === 'told' ? 'MRS WEE. “THEN I KNOW WHY SHE STOP COMING.”' : 'MRS WEE. A TABLE FOR TWO.'),
    q('The card', 'NORA LINDEN. NELL. THE POSTMAN.'),
    ...(key(s, 'out.asked12') === 'ask' ? [p('And under it, in pencil: BEFORE THE FIRST THURSDAY. HE SWORE.')] : []),
    p('And under that, the next line, which is a month away and is already on the wall:'),
    q('The card', 'THE FIRST THURSDAY. WHO IS WATCHING?'),
    t('A man in a linen suit put a note under his saucer, and went. Whatever I have been in this city, it knows now that I am here. I came to find out what became of her, and I have been given a kitchen, a coffee shop and a wall. I have not been given how.'),
  ];
}

export function outsideBlocks12(s: GameState): Block[] {
  if (s.phase === 'ticket') return ticketBlocks();
  if (s.phase === 'arrivals') return arrivalsBlocks();
  if (s.phase === 'katong') return katongBlocks();
  if (s.phase === 'hill') return hillBlocks(s);
  if (s.phase === 'kitchen') return kitchenBlocks();
  if (s.phase === 'quay') return quayBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices12(s: GameState): C12Choice[] {
  if (s.phase === 'ticket') return ticketChoices();
  if (s.phase === 'arrivals') return arrivalsChoices();
  if (s.phase === 'katong') return katongChoices();
  if (s.phase === 'hill') return hillChoices();
  if (s.phase === 'kitchen') return kitchenChoices(s);
  if (s.phase === 'quay') return quayChoices();
  return [];
}
