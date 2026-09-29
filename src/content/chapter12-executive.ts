/** Chapter 12 (Executive route, lane id `executive`) · Whose Face:
 * changi → tan → number9 → punkah → nora → suite → harbour → complete (the shared end, with Executive blocks).
 * Design: docs/story/EXECUTIVE_CHAPTER_12_WHOSE_FACE_DESIGN.md (owner-approved 2026-09-28, all eight decisions as
 * recommended); script: docs/story/scripts/EXECUTIVE_CHAPTER_12_SCRIPT.md. The shared Singapore spine with Julian beside
 * her on Helix business (his days are meetings, her days are Nell): Mrs Tan and the key; Number 9 kept dressed for the
 * reissue, and the caretaker; Colin Ashby at the Punkah Bar ("a friend of hers"; the white orchids; and Helix: "She
 * takes a man's company the way she took Nell's name. By being kind to him first."); Nora in Holland Village (the
 * cinnamon and the black; the tall friend who rang first). No order: Celeste's pressure is a photograph of their dinner
 * and "Does he know whose face he's kissing?", the threat to tell him first, never carried out. The telling, in his
 * suite on the Straits (told / partly / not; "Is the woman who wrote her own terms into my contract real?" "Yes."). The
 * harbour, and a chosen night (heat 3, consent-gated, fades). Nell is not alive; Celeste's guilt is a seed, not proof.
 * Entered from an Executive `chapter11.complete`; until Executive Ch13 exists the road goes on through the
 * in-development bridge to Ch14, which reads exec.told12. Local helpers mirror chapter12.ts (c12.* keys, chapter12.*
 * ids); choice ids carry `x12-`.
 * Deepening pass (2026-09-29): three moments, each with a neutral pick. The first evening (c12.x-evening = hawker |
 * rain | hotel: chilli crab with his sleeves rolled, or the afternoon storm along the river, or the hotel); the morning
 * after Ashby, "Where do you go all day?" (c12.x-morning = take | truthish | errands: he comes to Emerald Hill for an hour,
 * and Mrs Tan calls her Evie in front of him, exec.heard-evie; "To see where I used to live"; or errands); and Sunday
 * afternoon (c12.x-afternoon = opposite | pool | sleep: the watcher's flat across the lane, one chair at the window
 * facing Number 9, binoculars, a white orchid dying; the hotel pool; or sleep). The suite remembers "Evie". */
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

export const EXECUTIVE_PHASES12 = ['changi', 'tan', 'number9', 'punkah', 'nora', 'suite', 'harbour'] as const;
export const isExecutive12 = (s: GameState) => key(s, 'route.lane') === 'executive';
export const executivePhase12 = (s: GameState) => isExecutive12(s) && ((EXECUTIVE_PHASES12 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const told = (s: GameState) => key(s, 'exec.told12') as 'told' | 'partly' | 'not' | undefined;
const coat = (s: GameState) => key(s, 'exec.coat11') === 'take';
const nightOk = (s: GameState) =>
  key(s, 'c6.friction-julian') === 'warmed' ||
  ['c7.x-evening-outcome', 'c8.x-late-outcome', 'c10.x-night-outcome', 'c11.x-night-outcome'].some((k) => !!key(s, k)?.startsWith('intimate'));

export function placeExecutive12(s: GameState): string | undefined {
  if (s.phase === 'tan' && get12(s, 'x-tan')) return 'Monday · 18:00 · The hotel lobby';
  if (s.phase === 'punkah' && get12(s, 'x-ashby')) return 'Wednesday · 07:30 · His terrace';
  if (s.phase === 'nora' && key(s, 'exec.nora12')) return 'Sunday · 14:00 · The heat';
  if (s.phase === 'number9' && get12(s, 'x-search')) return 'Emerald Hill · a key in the lock';
  if (s.phase === 'harbour' && get12(s, 'x-harbour')) {
    const open = get12(s, 'x-night-open');
    return open ? 'Late · Julian’s suite, the Straits' : '00:40 · The harbour';
  }
}

// ── The entry ──

export function beginExecutive12(): C12Choice {
  return offer('begin-executive', 'Singapore', 'A week on Helix business. His days are meetings. Yours are hers.', 'changi');
}

// ── Changi ──

function changiBlocks(s: GameState): Block[] {
  const tone = key(s, 'exec.celeste11');
  return [
    p('Business class on Helix, Julian asleep over a board pack somewhere above the Bay of Bengal with his glasses still on, and you awake beside him with a camel coat folded on your knees that is not yours, or a paperback you have not read a page of, watching the map.'),
    p('Changi at ten past six in the morning. The doors open and the heat puts a hand on the back of your neck like somebody who knows you.'),
    p('The black phone lights before you are through passport control.'),
    q('C.', tone === 'suspects' ? 'Welcome home, darling. Do give my love to Mrs Tan. And do be careful what you say on the stairs.' : tone === 'cold' ? 'Welcome home. Do give my love to Mrs Tan.' : 'Welcome home, darling. Emerald Hill is lovely at this time of year. Do give my love to Mrs Tan.'),
    p('You have not told anybody about Mrs Tan. You did not know there was a Mrs Tan.'),
    q('Julian Mercer', 'I have meetings until six every day. The evenings are yours if you want them, and mine if you’ll let me have them.'),
    ...(coat(s) ? [p('In the pocket of the camel coat, the transit card. The last journey on it ends at Somerset, for Emerald Hill, fourteen months ago, at twenty past eleven at night.')] : []),
  ];
}

function changiChoices(): C12Choice[] {
  return [offer('x12-changi-go', 'Emerald Hill', 'While he is in his first meeting.', 'tan')];
}

// ── Mrs Tan ──

function tanBlocks(): Block[] {
  return [
    p('A row of old shophouses on Emerald Hill, painted shutters, the smell of rain on hot stone. Number 9 on the second floor, the door shut. Across the landing, a door open on a flat full of other people’s orchids, and a small woman in her seventies with a watering can, who turns round, and drops it.'),
    q('Mrs Tan', 'Evie! Evie. Aiyoh, look at you. So thin.'),
    p('She has both your hands before you can decide anything.'),
  ];
}

function tanChoices(): C12Choice[] {
  const story: Block[] = [
    p('The last night, fourteen months ago: Evie came home late and limping, left the orchids on Mrs Tan’s mat with a note (Water them for me, I’m going to my sister’s), and went down the stairs with one small bag before it was light. If a tall lady asked, Mrs Tan was to say Penang.'),
    p('Then the tall lady came, and sat in the flat all afternoon with the door shut. And after her the men in white gloves, who come every month now, and clean.'),
    q('Mrs Tan', 'They changed nothing. Every month. They clean. For who?'),
    p('And a key, from under the orchids, where Evie left it, and where Mrs Tan has kept it, watering around it.'),
  ];
  const c = (id: 'evie' | 'truth' | 'listen', label: string, hint: string, body: Block[]) =>
    offer('x12-tan-' + id, label, hint, 'tan', (x) => {
      set12(x, 'x-tan', id);
      return [...body, ...story, ...eveningLead];
    });
  return [
    c('evie', 'Be Evie for her', 'She has waited fourteen months.', [p('You are Evie for her. She feeds you rice and scolds you for being thin and tells you about “your” last night without being asked, and you let her, and it is the kindest lie you have ever told.')]),
    c('truth', 'Tell her, gently', 'You are not Evie.', [
      q('You', 'Mrs Tan. I’m not Evie.'),
      p('She looks at you for a long time, still holding your hands.'),
      q('Mrs Tan', 'No. You stand wrong. I thought it was the tiredness.'),
      p('She tells you anyway, as a witness this time, and asks you to find out what happened.'),
    ]),
    c('listen', 'Let her decide who you are', 'Say nothing. She will talk.', [p('You say nothing, and she does not decide, and she talks, the way people talk to a face they miss.')]),
  ];
}

const eveningLead: Block[] = [p('At six Julian comes out of his last meeting with his tie in his pocket and finds you in the lobby, and looks at your face, and does not ask where you have been.')];

function eveningChoices(): C12Choice[] {
  const e = (id: 'hawker' | 'rain' | 'hotel', label: string, hint: string, body: Block[]) =>
    offer('x12-evening-' + id, label, hint, 'number9', (x) => {
      set12(x, 'x-evening', id);
      return body;
    });
  return [
    e('hawker', 'A hawker centre, and chilli crab', 'Plastic stools. His sleeves rolled.', [
      p('A hawker centre under a Victorian iron roof, plastic stools, fans turning, and chilli crab, which he eats with enormous concentration and no dignity at all, his sleeves rolled to the elbow, sauce on his wrist. He asks nothing. He tells you about a man in his meeting who said “going forward” eleven times. You laugh until you have to put your crab down.'),
      t('For an hour nobody in this city knows whose face I have. Not even me.'),
    ]),
    e('rain', 'Walk by the river, into the storm', 'The afternoon storm comes at six here.', [
      p('You walk along the river and the storm comes, all at once, the way they do here: warm rain like a bath being emptied on you. He takes off his jacket and holds it over both your heads, which is useless, and you both know it, and he keeps holding it anyway, and you are soaked to the skin and laughing under a bridge by the time it stops.'),
    ]),
    e('hotel', 'The hotel, and room service', 'You are tired. Let him see it.', [p('Room service, and the air conditioning, and his feet on the coffee table, and your head against his arm, and the news on with the sound down. You fall asleep before the food comes. He eats his quietly, and leaves yours under the silver lid.')]),
  ];
}

// ── Number 9 ──

function number9Blocks(): Block[] {
  return [
    p('Monday, after midnight, while he sleeps. You take the key and a taxi. The key still fits.'),
    p('The flat is not empty. It is furnished exactly as it was: an ivory jacket over a chair, a lipstick by the mirror, fresh milk in the fridge with a date on it from this week. A stage, kept dressed. And in the wardrobe, new clothes, in your size, not hers. The legend has a flat, and the flat has been waiting for you.'),
  ];
}

const caretakerLead: Block[] = [
  p('A key in the lock. A young man in a polo shirt, with a clipboard and a phone: the caretaker, who has kept this flat for a year for people he has never met, and has never seen the tenant.'),
];

function searchChoices(): C12Choice[] {
  const c = (id: 'desk' | 'wardrobe' | 'balcony', label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('x12-search-' + id, label, hint, 'number9', (x) => {
      set12(x, 'x-search', id);
      after?.(x);
      return [...body, ...caretakerLead];
    });
  return [
    c('desk', 'The bureau', 'Paper. There is always paper.', [
      p('In the bureau, a maintenance schedule on thick cream paper with no letterhead: Site SG/EH-9 · monthly · keep lived-in · Family contact (sister): N. Linden, cooperative, do not disturb.'),
      t('Sister. She had a sister.'),
    ], (x) => note(x, 'x-schedule', 'Number 9, Emerald Hill is kept furnished monthly as “Site SG/EH-9”, with a family contact: a sister, N. Linden, “cooperative, do not disturb”.', 'The maintenance schedule in the bureau at Number 9')),
    c('wardrobe', 'The wardrobe', 'Her clothes. Yours.', [p('Behind the new clothes in your size, missed by the men in white gloves: a man’s shirt, and in its pocket a boarding pass to Penang, unused, for the morning she left. She was running.')]),
    c('balcony', 'The balcony', 'Two chairs, one ashtray.', [p('Two chairs and one ashtray on the balcony, and across the lane, in the window opposite, a white orchid on a sill, turned toward this flat. Somebody kept watch from over there.')]),
  ];
}

function caughtChoices(): C12Choice[] {
  const c = (id: 'hide' | 'evie' | 'own', label: string, hint: string, body: Block[]) =>
    offer('x12-caught-' + id, label, hint, 'punkah', (x) => {
      set12(x, 'x-caught', id);
      return body;
    });
  return [
    c('hide', 'The bathroom, door not quite shut', 'Let him do his list.', [p('The bathroom, the light off, the door not quite shut. He does his list, waters a plant that is plastic, photographs every room, nearly opens your door, and goes. You photograph his report on the clipboard as he passes: the number he sends it to, at the bottom.')]),
    c('evie', 'Walk out as the tenant', '“Thank you. I’ll be staying a while.”', [q('You', 'Thank you. I’ll be staying a while.'), p('He goes white, and apologises, and makes a phone call on the stairs, and you hear, faintly, a hotel switchboard answer: “The Marlowe, good evening.”')]),
    c('own', '“Who pays you?”', 'Your own name.', [q('You', 'My name is Evelyn Vale. Who pays you?'), p('He tells you the truth, which is that he does not know, and gives you the number he reports to. It is answered by a hotel switchboard on the Straits.')]),
  ];
}

// ── The Punkah Bar ──

function punkahBlocks(s: GameState): Block[] {
  return [
    ...(key(s, 'exec.iris11') === 'warn'
      ? [p('A card at the hotel desk, in an envelope with no stamp and no return address. One name on it, in a woman’s hand: Colin Ashby. The Marlowe. Evenings. — I.')]
      : [p('The number goes to the Marlowe, an old colonial hotel on the Straits. It takes you one evening in the bar to find out who in it answers.')]),
    p('Tuesday night. The Punkah Bar at the top of the Marlowe: fans turning, a pianist playing to nobody, the harbour lights beyond the shutters. Colin Ashby, sixty, linen suit, the manners of a man who used to be important and the drinking of a man who knows he no longer is. He sees you from across the room and puts his glass down very slowly.'),
  ];
}

function punkahChoices(s: GameState): C12Choice[] {
  const knows = (x: GameState): Block[] => [
    q('Colin Ashby', 'She was the best I ever ran. After Jakarta she wanted out. She was going to walk out of her own legend and take it with her. Nobody leaves.'),
    q('Colin Ashby', 'Her name went to the wrong people in Jakarta. The order came down from upstairs. From a friend of hers. I won’t say the name. When she was in hospital, somebody sent white orchids. Every day. She hated orchids.'),
    q('Colin Ashby', 'You’re here with Mercer. Julian Mercer’s Helix.'),
    p('He looks at you over his glass for a long moment.'),
    q('Colin Ashby', 'She takes a man’s company the way she took Nell’s name. By being kind to him first.'),
    ...(key(x, 'exec.sign11') === 'signed' ? [t('The good pen. My hand on his shoulder. Kind to him first. I was the kind part.')] : []),
  ];
  const c = (id: 'nell' | 'press' | 'truth', label: string, hint: string, body: Block[]) =>
    offer('x12-ashby-' + id, label, hint, 'punkah', (x) => {
      set12(x, 'x-ashby', id);
      note(x, 'x-ashby', 'Colin Ashby, who ran Meridian’s Singapore station, says the order to burn Nell in Jakarta came “from upstairs. From a friend of hers.” White orchids came to her hospital bed. Of Helix: “She takes a man’s company the way she took Nell’s name. By being kind to him first.”', 'Colin Ashby, the Punkah Bar, the Marlowe');
      return [...body, ...knows(x), ...morningLead];
    });
  const evidence = get12(s, 'x-search') === 'desk' || ['hide', 'own'].includes(get12(s, 'x-caught') ?? '');
  return [
    c('nell', 'Sit down as Nell', 'Let him talk to a ghost.', [p('You sit down opposite him as Nell, and he talks to a ghost, and apologises to her, and tells her it wasn’t his desk, and has no idea he has said it.')]),
    ...(evidence ? [c('press', 'Lay it on the bar', 'The schedule, or the report. Let him read.', [p('You put your phone on the bar, the photograph up. He reads it, and understands that the reissue is holding things he never could, and orders two more drinks without asking you.')])] : []),
    c('truth', '“I’m the reissue.”', 'They fitted me to her.', [q('You', 'I’m the reissue, Mr Ashby. They fitted me to her.'), p('He looks at your face for a long time, and orders two more drinks, and tells you everything he is prepared to say, which is not quite everything.')]),
  ];
}

const morningLead: Block[] = [
  p('Wednesday morning, breakfast on his terrace, the city already hot. He butters toast for both of you without asking, and then puts the knife down.'),
  q('Julian Mercer', 'Where do you go all day? You don’t have to tell me. I’d just like to know if it’s somewhere I could come.'),
];

function morningChoices(): C12Choice[] {
  const m = (id: 'take' | 'truthish' | 'errands', label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer('x12-morning-' + id, label, hint, 'nora', (x) => {
      set12(x, 'x-morning', id);
      after?.(x);
      return body;
    });
  return [
    m('take', 'Take him with you, for an hour', 'Emerald Hill. Mrs Tan.', [
      p('You take him to Emerald Hill for the hour before his first meeting. He stands on the landing in his suit among somebody else’s orchids, and Mrs Tan comes out with her watering can, and looks at him, and at you, and lights up.'),
      q('Mrs Tan', 'Evie! And this is your man? Good. Tall. Evie never brought a man home. Never.'),
      p('Julian says good morning to her very politely, and accepts a cup of tea, and does not look at you once while he drinks it. You know he heard the name. You watch him decide not to ask.'),
    ], (x) => setKey(x, 'exec.heard-evie')),
    m('truthish', '“To see where I used to live.”', 'True, in its way.', [
      q('You', 'To see where I used to live.'),
      p('He looks at you for a long moment over the toast.'),
      q('Julian Mercer', 'I didn’t know you’d lived here.'),
      q('You', 'Neither did I.'),
      p('He does not laugh, because it was not a joke, and he can tell.'),
    ]),
    m('errands', '“Errands.”', 'Everybody has errands.', [q('You', 'Errands. Boring ones.'), p('He nods, and pours your coffee, and lets you have it.')]),
  ];
}

// ── Nora ──

function noraBlocks(): Block[] {
  return [
    p('Sunday. A low house in Holland Village, a frangipani in the yard, a child’s bicycle against the wall. Nora Linden, forty, a teacher, opens the door and sees her sister’s face, and holds on to the door frame with both hands.'),
  ];
}

function noraChoices(s: GameState): C12Choice[] {
  const gives = (x: GameState): Block[] => [
    p('Nell took two sugars and cinnamon in her coffee. She hated orchids. She loved the harbour at night. She rang on the Saturday night, fourteen months ago: I’m out, I’m coming to you Sunday, make the spare bed. She never came. They found her in the harbour the next week. Misadventure, they said. She had a bad leg. It was dark.'),
    ...(coat(x) ? [p('You give her the receipt from the camel coat. Two coffees, a café on Emerald Hill. She reads it and laughs, and it breaks in the middle.'), q('Nora Linden', 'The cinnamon was hers. The black was always her friend’s.')] : []),
    q('Nora Linden', 'Her friend rang me on the Sunday morning. The tall one, with the beautiful voice. Before the police. Before anybody. She said she was so sorry. I have spent a year wondering how she knew.'),
  ];
  const c = (id: 'truth' | 'kind' | 'go', label: string, hint: string, body: Block[], giveAll: boolean) =>
    offer('x12-nora-' + id, label, hint, 'nora', (x) => {
      setKey(x, 'exec.nora12', id);
      if (giveAll) note(x, 'x-nora', 'Nora Linden says her sister Nell rang on the Saturday night to say she was out and coming on Sunday; a tall friend with a beautiful voice rang Nora on the Sunday morning, before the police, to say she was sorry.', 'Nora Linden, Holland Village');
      return [...(giveAll ? [...body, ...gives(x), p('At the door she gives you a photograph: Nell on the harbour wall, laughing, in flat shoes. Your face, on somebody else.')] : body), ...afternoonLead];
    });
  return [
    c('truth', '“I’m not Nell. They gave me her life.”', 'The hardest thing in the chapter.', [q('You', 'I’m not Nell. They gave me her life.'), q('Nora Linden', 'I know. She walked like our father. You don’t.'), p('You sit in her kitchen until dark.')], true),
    c('kind', '“I knew her. She talked about you.”', 'A kindness that is also a lie.', [q('You', 'I knew her. She talked about you.'), p('She wants it so badly she takes it, and makes coffee, and talks.')], true),
    c('go', 'Say you have the wrong house', 'You cannot do it.', [p('You cannot. You say you have the wrong house, and walk back to the road, and she stands in the doorway watching you go in her sister’s body.')], false),
  ];
}

const afternoonLead: Block[] = [p('Sunday afternoon. Four hours until dinner. The heat at its worst, and the city asleep under it.')];

function afternoonChoices(): C12Choice[] {
  const a = (id: 'opposite' | 'pool' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('x12-afternoon-' + id, label, hint, 'suite', (x) => {
      set12(x, 'x-afternoon', id);
      return body;
    });
  return [
    a('opposite', 'Knock on the flat across the lane', 'The window with the white orchid.', [
      p('You go back to Emerald Hill and cross the lane to the house opposite Number 9, and climb to the second floor, to the window you saw from the balcony. The door is not locked.'),
      p('An empty flat. One chair, pulled up to the window, facing Number 9. A pair of good binoculars on the sill. An ashtray, washed. And the white orchid, in a black pot exactly like the one on your desk on forty-one, dying slowly, turned toward her balcony.'),
      t('Somebody sat here and watched her, every night. Somebody who sends orchids.'),
      p('You do not touch anything. You close the door behind you exactly as you found it.'),
    ]),
    a('pool', 'The hotel pool', 'Wash Holland Village off.', [p('The rooftop pool, empty in the heat, and you swim lengths until your arms burn and Nora’s kitchen goes quiet in your head, and then float on your back and look up at the white sky until the black phone, on the lounger, starts to feel like something you could ignore.')]),
    a('sleep', 'Sleep through it', 'The heat wins. Let it.', [p('You lie on top of the sheets with the curtains drawn and sleep through the worst of the heat, and dream of nothing, and wake at six with the photograph of a woman on a harbour wall face down on the pillow beside you.')]),
  ];
}

// ── The suite ──

function suiteBlocks(s: GameState): Block[] {
  return [
    p('Sunday night. His suite at the top of the hotel, the windows open on the Straits, the sea black and crowded with ships’ lights. Dinner on the terrace, and his tie off, and the first evening in a week he has not had a board pack beside his plate.'),
    p('Before dessert the black phone, face down by your glass, buzzes once. You turn it over. A photograph: the two of you at this table, twenty minutes ago, taken from somewhere across the water. His hand over yours on the cloth.'),
    q('C.', 'You make a lovely couple, darling. Does he know whose face he’s kissing? Somebody ought to tell him. It oughtn’t to be me.'),
    ...(key(s, 'exec.calendar') === 'gave' ? [q('C.', 'I know where he’ll be all week. You sent it.')] : []),
    p('Julian sees your face, and then the photograph, because you let him. He does not know who sent it. He waits.'),
    ...(key(s, 'exec.heard-evie') ? [q('Julian Mercer', 'Mrs Tan called you Evie. I didn’t ask. I’d like to be told.')] : []),
    ...(key(s, 'exec.book11') === 'show' ? [t('Later, I promised him, at the Vesper, over a page that said available. It is later.')] : []),
  ];
}

function suiteChoices(): C12Choice[] {
  const c = (id: 'told' | 'partly' | 'not', label: string, hint: string, body: Block[]) =>
    offer('x12-tell-' + id, label, hint, 'harbour', (x) => {
      setKey(x, 'exec.told12', id);
      if (id === 'told') note(x, 'x-told', 'In Singapore Evelynn told Julian Mercer who she is: Adrian Vale, fitted at a clinic to the legend of Evelyn Vale, who was Nell Linden; and that she is in a catalogue, available for placement. Not Celeste’s orders.', 'Evelynn, to Julian Mercer, the Straits');
      return body;
    });
  return [
    c('told', 'Tell him who you are', 'Adrian. The clinic. The reissue. Nell. The page.', [
      p('You tell him. Adrian Vale, and a clinic, and a face fitted to a woman who was burned in Jakarta and found in the harbour you can see from this terrace. Nell. Her flat, her shoes, her sister. And the page in the book at the Vesper, and the word under your photograph. Not Celeste’s orders. Not yet. Everything about who.'),
      p('It takes a long time. He listens with his hands flat on the table, and does not interrupt once, and when you have finished he is quiet for so long that you hear the ships.'),
      q('Julian Mercer', 'One question. Is the woman who wrote her own terms into my contract real?'),
      q('You', 'Yes.'),
      q('Julian Mercer', 'Then that’s who I know. The rest is a name. I’ve never cared much for names. I’ll learn yours, if you’ll tell me it.'),
    ]),
    c('partly', '“Somebody is selling me. I’m finding out who.”', 'True. Not all.', [
      q('You', 'Somebody is selling me, Julian. I’m finding out who. I’ll tell you the rest when I know it.'),
      q('Julian Mercer', 'Then tell me when you can. I’m not going anywhere.'),
      p('He puts his hand over yours on the cloth, exactly where it was in the photograph, and leaves it there.'),
    ]),
    c('not', '“Not tonight.”', 'Turn the photograph face down.', [
      q('You', 'Not tonight.'),
      p('You turn the phone face down on the cloth, like his photograph on forty-one, and he looks at it, and at you, and lets you.'),
      t('Somebody ought to tell him. She is right about that. She is wrong about who.'),
    ]),
  ];
}

// ── The harbour, and the night ──

function harbourBlocks(): Block[] {
  return [p('Midnight. The harbour, where Nell went into the water: lights on the black surface, the heat that does not break, a wall she would have walked with a bad leg in the dark.')];
}

function harbourChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'x-harbour')) {
    const c = (id: 'name' | 'photo' | 'quiet', label: string, hint: string, body: Block[]) =>
      offer('x12-harbour-' + id, label, hint, 'harbour', (x) => {
        set12(x, 'x-harbour', id);
        return body;
      });
    return [
      c('name', 'Say her name to the water', 'Out loud. Once.', [p('You say it out loud, once, to the water. Eleanor. Nell. Nobody answers. You did not expect anybody to.')]),
      ...(['truth', 'kind'].includes(key(s, 'exec.nora12') ?? '') ? [c('photo', 'Hold up Nora’s photograph', 'Her on this wall, laughing.', [p('You hold up the photograph Nora gave you, Nell on this wall, laughing, in flat shoes, and line it up with the wall in front of you until the two walls are one, and she is standing where you are standing.')])] : []),
      c('quiet', 'Stand there', 'Until the heat lets go of you.', [p('You stand there until the heat lets go of you, which it does not, quite.')]),
    ];
  }
  const open = get12(s, 'x-night-open');
  if (open === 'julian') {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('x12-julian-' + id, label, hint, 'harbour', (x) => {
        set12(x, 'x-night-open', 'julian-room');
        set12(x, 'x-night-scope', id);
        note(x, 'x-evening-consent', `Evelynn chose the evening’s scope (${id}); Julian Mercer agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q('Julian Mercer', id === 'sex' ? 'Yes. And you say stop, it stops. Whoever you are. The same for me.' : 'Then that’s tonight. You set the edge. I’m glad to be on this side of it.')];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      ...(nightOk(s) ? [scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.')] : []),
      offer('x12-leave', 'Say goodnight', 'Your own room, down the corridor.', 'complete', (x) => {
        delete x.choices['c12.x-night-open'];
        set12(x, 'x-night-outcome', 'declined');
        return [p('You say goodnight at his door and go to your own room down the corridor, and lie awake listening to the air conditioning and the ships.')];
      }),
    ];
  }
  if (open === 'julian-room') {
    const sc = get12(s, 'x-night-scope') as 'no-sex' | 'sex';
    return [
      offer('x12-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c12.x-night-open'];
        set12(x, 'x-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you at the open window until the city goes quiet.')];
      }),
      offer('x12-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c12.x-night-open'];
        set12(x, 'x-night-outcome', 'intimate-' + sc);
        return sc === 'sex'
          ? [
              p(told(x) === 'told' ? 'He says your name, the one you gave him tonight, as if he were learning it, carefully, twice, the way he reads everything that matters, and asks once more, and you answer by pulling him toward the open window and the bed beside it.' : 'The heat, the open window, the ships. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bed.'),
              p('What happens next stays in Singapore. The scene fades.'),
            ]
          : [p('He kisses you at the open window for a long time, with the ships going out, and stops where you said, and holds you, and in the morning you are still there, in his shirt, and he has not moved.')];
      }),
    ];
  }
  return [
    offer('x12-night-julian', 'Go back to his suite', 'The windows are still open.', 'harbour', (x) => {
      set12(x, 'x-night', 'julian');
      set12(x, 'x-night-open', 'julian');
      return [
        p('His suite, the windows still open on the Straits, the table cleared. He is waiting up, and pretending not to.'),
        q('Julian Mercer', told(x) === 'told' ? 'Whoever you are. Tell me what you want tonight, and that’s what happens.' : 'Tell me what you want tonight, and that’s what happens.'),
      ];
    }),
    offer('x12-night-alone', 'The hotel roof, alone', 'Chapter 12 ends here.', 'complete', (x) => {
      set12(x, 'x-night', 'alone');
      return [p('The hotel roof, the pool lit from below, and the city that thinks it knows you. You sit at the edge with your feet in the water until the sky goes grey.')];
    }),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const tl = told(s);
  return [
    p('The flight home. He sleeps with his head against the window. You do not sleep at all.'),
    p('The wardrobe door, in the grey before London wakes. Beside THE VESPER, a new card, and a photograph pinned to it: a woman on a harbour wall, laughing, in flat shoes, if Nora gave you one; otherwise only the name.'),
    q('The card', 'NELL. ELEANOR LINDEN. “SHE HATED ORCHIDS.”'),
    p('And under JULIAN MERCER, a line you add in pencil:'),
    q('The card', tl === 'told' ? 'HE KNOWS WHO I AM. HE ASKED ONE QUESTION.' : tl === 'partly' ? 'HE KNOWS SOMEBODY IS SELLING ME.' : 'HE DOESN’T KNOW. SHE COULD TELL HIM. SHE WON’T. I SHOULD.'),
    t('A friend of hers, Ashby said. The tall one, Nora said. Kind to him first. I know her name. I am not allowed to prove it yet.'),
  ];
}

export function executiveBlocks12(s: GameState): Block[] {
  if (s.phase === 'changi') return changiBlocks(s);
  if (s.phase === 'tan') return tanBlocks();
  if (s.phase === 'number9') return number9Blocks();
  if (s.phase === 'punkah') return punkahBlocks(s);
  if (s.phase === 'nora') return noraBlocks();
  if (s.phase === 'suite') return suiteBlocks(s);
  if (s.phase === 'harbour') return harbourBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function executiveChoices12(s: GameState): C12Choice[] {
  if (s.phase === 'changi') return changiChoices();
  if (s.phase === 'tan') return get12(s, 'x-tan') ? eveningChoices() : tanChoices();
  if (s.phase === 'number9') return get12(s, 'x-search') ? caughtChoices() : searchChoices();
  if (s.phase === 'punkah') return get12(s, 'x-ashby') ? morningChoices() : punkahChoices(s);
  if (s.phase === 'nora') return key(s, 'exec.nora12') ? afternoonChoices() : noraChoices(s);
  if (s.phase === 'suite') return suiteChoices();
  if (s.phase === 'harbour') return harbourChoices(s);
  return [];
}
