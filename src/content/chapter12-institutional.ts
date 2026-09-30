/** Chapter 12 (Institutional route, lane id `institutional`) · Her City:
 * wheels → landing → site → marlowe → village → report → wall → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_12_HER_CITY_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_12_SCRIPT.md. The shared Singapore spine as an Axiom
 * tasking in Sloane's capitals (SITE SG/EH-9 · ESTABLISH WHAT BECAME OF E.V. (I) · BACKUP: V.S. · THE FULLERTON, ROOM 811).
 * On the books or off them (Axiom's car / a cash taxi / the MRT). Mrs Tan and the key (canon). Number 9 (the bureau /
 * the wardrobe / the balcony) and the caretaker (hide / the Axiom warrant card / "Who pays you?"). Ashby at the Punkah Bar
 * (canon, plus "They bought the reissue. The original was never theirs."). Nora (canon). The report in room 811 (all /
 * shaded / the site only). The harbour wall at midnight. Entered from an Institutional `chapter11.complete`; hands on to
 * the Ch14 bridge. Keys `inst.*`, `act3.nell`, `c12.i-*`; ids carry `i12-`.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. Monday night at a hawker centre, where her handler
 * turns up to check on her operative (c12.i-hawker = sit | away | alone: Sloane eating chilli crab with no dignity at
 * all; sent back to the hotel; or alone). Wednesday morning after Ashby (c12.i-morning = swim | breakfast | desk: the
 * rooftop pool at six; breakfast with Sloane, who asks nothing; or the notes). In room 811 before the report, Sloane
 * pours two drinks from the minibar (c12.i-minibar = drink | ask | water: a whisky and one true thing, "I ran in this city
 * once."; one question, "Why Axiom?"; or water). */
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

export const INSTITUTIONAL_PHASES12 = ['wheels', 'landing', 'site', 'marlowe', 'village', 'report', 'wall'] as const;
export const isInstitutional12 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase12 = (s: GameState) => isInstitutional12(s) && ((INSTITUTIONAL_PHASES12 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const report = (s: GameState) => key(s, 'inst.report12') as 'all' | 'shaded' | 'site' | undefined;

export function placeInstitutional12(s: GameState): string | undefined {
  if (s.phase === 'site' && get12(s, 'i-search')) return '22:40 · Number 9, the door';
}

// ── The entry ──

export function beginInstitutional12(): C12Choice {
  return offer('begin-institutional', 'Singapore', 'Her city. On paper.', 'wheels');
}

// ── Wheels down ──

function wheelsBlocks(): Block[] {
  return [
    p('Monday, ten past six, Changi, and the heat at the doors like a hand. Axiom’s rules put a handler and her operative on different flights, so you came alone, in economy, beside a man who ate your biscuits, with a single sheet in your bag in small upright capitals:'),
    q('The tasking', 'SINGAPORE · SITE SG/EH-9 · ESTABLISH WHAT BECAME OF E.V. (I) · BACKUP: V.S. · THE FULLERTON, ROOM 811.'),
    p('In your other bag, the black phone, which lights as the plane reaches the gate.'),
    q('C. · message', 'Welcome home, darling. Do give my love to Mrs Tan.'),
    t('Her city. My city, apparently. Everyone keeps telling me where I live.'),
  ];
}

function wheelsChoices(): C12Choice[] {
  const w = (id: 'axiom' | 'taxi' | 'mrt', label: string, hint: string, body: Block[]) =>
    offer('i12-cover-' + id, label, hint, 'landing', (x) => {
      setKey(x, 'inst.cover12', id);
      return [...body, ...landingLead];
    });
  return [
    w('axiom', 'Axiom’s car from the desk', 'On the books. Logged.', [p('Axiom’s Singapore desk has sent a car, a grey saloon with a driver who says nothing and writes down the time you get in. Everything today will be on the books. That is what you signed for.')]),
    w('taxi', 'A taxi, paid in cash', 'Off the books. Unlogged.', [p('You walk past Axiom’s grey car and its driver, and take a taxi from the rank, and pay in cash, and give the driver an address two streets from the one you want. Nobody will log this. You have decided that some of today is yours.')]),
    w('mrt', 'The MRT to Somerset', 'The way she would have gone.', [p('You take the MRT, the way she would have, standing, holding the rail, to Somerset, and walk up Emerald Hill in the heat with everybody else, which is the best cover there is.')]),
  ];
}

// ── Mrs Tan ──

const landingLead: Block[] = [
  p('A row of old shophouses on Emerald Hill, painted shutters, the smell of rain on hot stone. Number 9 on the second floor, the door shut. Across the landing, a door open on a flat full of other people’s orchids, and a small woman in her seventies with a watering can, who turns round, and drops it.'),
  q('Mrs Tan', 'Evie! Evie. Aiyoh, look at you. So thin.'),
  p('She has both your hands before you can decide anything.'),
];

const tanStory: Block[] = [
  p('The last night, fourteen months ago: Evie came home late and limping, left the orchids on Mrs Tan’s mat with a note (Water them for me, I’m going to my sister’s), and went down the stairs with one small bag before it was light. If a tall lady asked, Mrs Tan was to say Penang.'),
  p('Then the tall lady came, and sat in the flat all afternoon with the door shut. And after her the men in white gloves, who come every month now, and clean.'),
  q('Mrs Tan', 'They changed nothing. Every month. They clean. For who?'),
  p('And a key, from under the orchids, where Evie left it, and where Mrs Tan has kept it, watering around it.'),
];

function landingChoices(): C12Choice[] {
  const c = (id: 'evie' | 'truth' | 'listen', label: string, hint: string, body: Block[]) =>
    offer('i12-tan-' + id, label, hint, 'site', (x) => {
      setKey(x, 'inst.tan12', id);
      return [...body, ...tanStory];
    });
  return [
    c('evie', 'Be Evie for her', 'She has waited fourteen months.', [p('You are Evie for her. She feeds you rice and scolds you for being thin and tells you about “your” last night without being asked, and you let her, and it is the kindest lie you have ever told, and it will not go in any report.')]),
    c('truth', 'Tell her, gently', 'You are not Evie.', [q('You', 'Mrs Tan. I’m not Evie.'), p('She looks at you for a long time, still holding your hands.'), q('Mrs Tan', 'No. You stand wrong. I thought it was the tiredness.'), p('She tells you anyway, as a witness this time, and asks you to find out what happened.')]),
    c('listen', 'Let her decide who you are', 'Say nothing. She will talk.', [p('You say nothing, and she does not decide, and she talks, the way people talk to a face they miss.')]),
  ];
}

// ── The site ──

function siteBlocks(): Block[] {
  return [
    p('Seven o’clock. A hawker centre under an old iron roof, fans turning, plastic stools, the smell of chilli and lime and charcoal. You have a plate of something you pointed at and a can of lime juice, and you are halfway through both when a woman in a linen shirt sits down on the stool opposite with a plate of chilli crab and a very straight back.'),
    q('Sloane', 'Your handler is checking on her operative. It says so in the manual. I wrote the manual.'),
  ];
}

function hawkerChoices(): C12Choice[] {
  const h = (id: 'sit' | 'away' | 'alone', label: string, hint: string, body: Block[]) =>
    offer('i12-hawker-' + id, label, hint, 'site', (x) => {
      set12(x, 'i-hawker', id);
      return [...body, p('That night, when the lane is dark, you let yourself into Number 9 with the key that smells of wet soil.'), ...nineBlocks()];
    });
  return [
    h('sit', 'Let her stay', 'Watch Victoria Sloane eat chilli crab.', [p('You let her stay. She eats the chilli crab with surgical precision and no dignity at all, sauce to the wrist, her linen sleeve rolled, and asks nothing about Emerald Hill, and tells you instead about a man at Axiom’s Singapore desk who says “per my last email” out loud. You laugh until you have to put your fork down, and so, very nearly, does she.'), t('I have never seen her eat before. I did not know she was allowed.')]),
    h('away', 'Send her back to the hotel', '“Backup waits in room 811.”', [q('You', 'Backup waits in room 811. It says so in the tasking. You wrote the tasking.'), p('She looks at you over the crab for a long moment, and then, astonishingly, picks up her plate and goes, and you hear her laugh once, out in the street, where she thinks you can’t.')]),
    h('alone', 'Eat alone', 'She came. You didn’t ask her to.', [p('You finish your plate without looking up, and after a while she understands, and eats hers at another table, and leaves before you do. Neither of you mentions it again.')]),
  ];
}

function nineBlocks(): Block[] {
  return [p('Number 9. The flat kept dressed, as if its tenant had gone out for milk fourteen months ago: cushions plumped, the bed made, fresh flowers in a vase, and in the wardrobe new clothes in your size, with the tags cut off.'), t('Site SG/EH-9. They keep it lived-in. For the reissue. For me.')];
}

const caretakerLead: Block[] = [p('A key in the lock. A young man in a polo shirt, with a clipboard and a phone: the caretaker, who has kept this flat for a year for people he has never met, and has never seen the tenant.')];

function siteChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'i-hawker')) return hawkerChoices();
  if (!get12(s, 'i-search')) {
    const c = (id: 'desk' | 'wardrobe' | 'balcony', label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
      offer('i12-search-' + id, label, hint, 'site', (x) => {
        set12(x, 'i-search', id);
        setKey(x, 'inst.search12', id);
        after?.(x);
        return [...body, ...caretakerLead];
      });
    return [
      c('desk', 'The bureau', 'Paper. There is always paper.', [p('In the bureau, a maintenance schedule on thick cream paper with no letterhead: Site SG/EH-9 · monthly · keep lived-in · Family contact (sister): N. Linden, cooperative, do not disturb.'), t('Sister. She had a sister.')], (x) => note(x, 'i-schedule', 'Number 9, Emerald Hill is kept furnished monthly as “Site SG/EH-9”, with a family contact: a sister, N. Linden, “cooperative, do not disturb”.', 'The maintenance schedule in the bureau at Number 9')),
      c('wardrobe', 'The wardrobe', 'Her clothes. Yours.', [p('Behind the new clothes in your size, missed by the men in white gloves: a man’s shirt, and in its pocket a boarding pass to Penang, unused, for the morning she left. She was running.')]),
      c('balcony', 'The balcony', 'Two chairs, one ashtray.', [p('Two chairs and one ashtray on the balcony, and across the lane, in the window opposite, a white orchid on a sill, turned toward this flat. Somebody kept watch from over there.')]),
    ];
  }
  const c = (id: 'hide' | 'card' | 'who', label: string, hint: string, body: Block[]) =>
    offer('i12-caretaker-' + id, label, hint, 'marlowe', (x) => {
      setKey(x, 'inst.caretaker12', id);
      return [...body, p('Tuesday night. You go looking for the man who ran her.')];
    });
  return [
    c('hide', 'Hide', 'Behind the bedroom door. Breathe.', [p('You stand behind the bedroom door and breathe through your mouth while he walks round the flat ticking boxes, and checks the flowers, and photographs the wardrobe, and leaves. The door clicks. You find you have been holding the Penang boarding pass so hard it has creased.')]),
    c('card', 'Show him the warrant card', '“Axiom. Routine inspection.”', [q('You', 'Axiom. Routine inspection.'), p('You hold up the card with the crest. He has never heard of Axiom. It doesn’t matter. It has a crest, and you are holding it as if it matters, and he apologises, and gives you his clipboard to sign, and leaves you the flat.'), t('It works. It works horribly well. That is what authority is: a crest and a tone of voice, and people apologising to you in a dead woman’s flat.')]),
    c('who', '“Who pays you?”', 'Ask him straight.', [q('You', 'Who pays you?'), p('He gives you, before he can think better of it, a number he rings on the first of the month. A Singapore number. You write it on the back of your hand.'), q('The caretaker', 'An agency. They pay on time. I never met anyone. Are you — are you the tenant?')]),
  ];
}

// ── The Marlowe ──

function marloweBlocks(s: GameState): Block[] {
  return [
    p('The Punkah Bar of the Marlowe Hotel, the fans turning under a teak ceiling, and in the corner a heavy Englishman in a linen suit gone soft at the elbows, drinking gin as if it were a duty. Colin Ashby, who ran Meridian’s Singapore station for eleven years, and ran her.'),
    ...(key(s, 'inst.caretaker12') === 'who' ? [p('The number on the back of your hand rang an agency, and the agency rang him, and he rang you, and here you both are.')] : []),
    p('He looks up, and puts his glass down very slowly.'),
  ];
}

const ashbyTells: Block[] = [
  q('Colin Ashby', 'She was the best I ever ran. After Jakarta she wanted out. She was going to walk out of her own legend and take it with her. Nobody leaves.'),
  q('Colin Ashby', 'Her name went to the wrong people in Jakarta. The order came down from upstairs. From a friend of hers. I won’t say the name. When she was in hospital, somebody sent white orchids. Every day. She hated orchids.'),
  q('Colin Ashby', 'And your Axiom. They bought the reissue, love. From us. The original was never theirs. She was ours, and then she was nobody’s.'),
];

function marloweChoices(): C12Choice[] {
  const a = (id: 'nell' | 'bar' | 'reissue', label: string, hint: string, body: Block[]) =>
    offer('i12-ashby-' + id, label, hint, 'village', (x) => {
      setKey(x, 'inst.ashby12', id);
      note(x, 'i-ashby', 'Colin Ashby says Nell was burned in Jakarta on an order “from upstairs, from a friend of hers”, and that Axiom bought the reissue; the original was never theirs.', 'Colin Ashby, the Punkah Bar, the Marlowe');
      return [...body, ...ashbyTells];
    });
  return [
    a('nell', 'Be Nell', 'Sit down as if you always had.', [p('You sit down across from him the way she would have, the way the photograph sits, and order her drink without asking what it was, and he goes white, and then, when he understands, grey.')]),
    a('bar', 'Lay it on the bar', 'The tasking sheet. Axiom’s crest.', [p('You put Axiom’s tasking sheet on the bar between you, crest up, and let him read it. SITE SG/EH-9. E.V. (I). He laughs, once, without any pleasure.'), q('Colin Ashby', 'On paper. God help us. They’ve sent the reissue to audit the original.')]),
    a('reissue', '“I’m the reissue.”', 'Say it plainly.', [q('You', 'I’m the reissue.'), p('He looks at you for a long time over the gin.'), q('Colin Ashby', 'Yes. You are. She’d have hated you. Then she’d have liked you. That was always the order with her.')]),
  ];
}

// ── The village ──

function villageBlocks(): Block[] {
  return [p('Wednesday, a quarter to six, the sky over the Straits going from black to the colour of a bruise. You have not slept. A friend of hers, he said. From upstairs.')];
}

function morningChoices(): C12Choice[] {
  const m = (id: 'swim' | 'breakfast' | 'desk', label: string, hint: string, body: Block[]) =>
    offer('i12-morning-' + id, label, hint, 'village', (x) => {
      set12(x, 'i-morning', id);
      return [...body, p('Sunday. Holland Village. The sister.'), ...noraDoor()];
    });
  return [
    m('swim', 'The rooftop pool at six', 'Swim until you can think.', [p('The rooftop pool at six, empty, the water the temperature of skin, the city coming up grey and gold all round you. You swim lengths until your shoulders burn and your head goes quiet, and when you climb out there is a towel on your lounger that you did not put there, and a note in small upright capitals: BREAKFAST 7.30. V.S.')]),
    m('breakfast', 'Breakfast with Sloane', 'She won’t ask. That’s the point.', [p('Breakfast on the terrace, Sloane already there with the papers and a pot of tea. She pours you a cup and asks nothing at all about Tuesday night, and you tell her nothing, and it is, you realise halfway through a slice of papaya, the most restful hour you have spent with anyone in a year.')]),
    m('desk', 'Write it up', 'Notes, in order. The way Adrian did.', [p('You sit at the desk in your room and write it all down, in order, in longhand, the way Adrian did: the bar, the gin, the fans, “a friend of hers”. Then you read it back and tear out the page you are not ready to hand to anybody, and fold it into your passport.')]),
  ];
}

function noraDoor(): Block[] {
  return [p('A low house in Holland Village, a frangipani in the yard, a child’s bicycle against the wall. Nora Linden, forty, a teacher, opens the door and sees her sister’s face, and holds on to the door frame with both hands.')];
}

function villageChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'i-morning')) return morningChoices();
  const gives: Block[] = [
    p('Nell took two sugars and cinnamon in her coffee. She hated orchids. She loved the harbour at night. She rang on the Saturday night, fourteen months ago: I’m out, I’m coming to you Sunday, make the spare bed. She never came. They found her in the harbour the next week. Misadventure, they said. She had a bad leg. It was dark.'),
    q('Nora Linden', 'Her friend rang me on the Sunday morning. The tall one, with the beautiful voice. Before the police. Before anybody. She said she was so sorry. I have spent a year wondering how she knew.'),
    p('At the door she gives you a photograph: Nell on the harbour wall, laughing, in flat shoes. Your face, on somebody else.'),
  ];
  const c = (id: 'truth' | 'kind' | 'go', label: string, hint: string, body: Block[], giveAll: boolean) =>
    offer('i12-nora-' + id, label, hint, 'report', (x) => {
      setKey(x, 'inst.nora12', id);
      if (giveAll) {
        setKey(x, 'act3.nell', 'known');
        note(x, 'i-nora', 'Nora Linden says her sister Nell rang on the Saturday night to say she was out and coming on Sunday; a tall friend with a beautiful voice rang Nora on the Sunday morning, before the police, to say she was sorry.', 'Nora Linden, Holland Village');
      }
      return giveAll ? [...body, ...gives] : body;
    });
  return [
    c('truth', '“I’m not Nell. They gave me her life.”', 'The hardest thing in the chapter.', [q('You', 'I’m not Nell. They gave me her life.'), q('Nora Linden', 'I know. She walked like our father. You don’t.'), p('You sit in her kitchen until dark.')], true),
    c('kind', '“I knew her. She talked about you.”', 'A kindness that is also a lie.', [q('You', 'I knew her. She talked about you.'), p('She wants it so badly she takes it, and makes coffee, and talks.')], true),
    c('go', 'Say you have the wrong house', 'You cannot do it.', [p('You cannot. You say you have the wrong house, and walk back to the road, and she stands in the doorway watching you go in her sister’s body.')], false),
  ];
}

// ── The report ──

function reportBlocks(s: GameState): Block[] {
  return [
    p('Sunday, eleven at night. The Fullerton, room 811. Sloane at the desk by the window with her shoes off and her jacket on the back of the chair, a legal pad in front of her and a pen she has not uncapped. She has been waiting for you since six. She did not ring.'),
    p('Before she says anything, she gets up, in her stockinged feet, and opens the minibar, and takes out two small bottles of whisky, and holds one out to you.'),
  ];
}

function minibarChoices(s: GameState): C12Choice[] {
  const m = (id: 'drink' | 'ask' | 'water', label: string, hint: string, body: Block[]) =>
    offer('i12-minibar-' + id, label, hint, 'report', (x) => {
      set12(x, 'i-minibar', id);
      return [...body, ...reportPrompt(x)];
    });
  return [
    m('drink', 'Take the whisky', 'Drink with her.', [p('You take it. She pours hers into a tooth glass and sits on the end of the bed, a hand’s width from the desk chair, and drinks half of it, and looks at the window.'), q('Sloane', 'I ran in this city once. Your age, or near it. On Axiom’s books, with a handler who wrote very thin reports about me. I used to think he was lazy. He was protecting me. It took me ten years to work that out.')]),
    m('ask', 'Ask her one question', 'She might answer one.', [q('You', 'Why Axiom? Of everywhere.'), p('She turns the little bottle over in her fingers.'), q('Sloane', 'Because they asked me first. That’s everybody’s reason, if they’re honest. Nobody chooses the first door. You only choose whether to stay in the room.')]),
    m('water', 'Water', 'One of you should.', [q('You', 'Water.'), q('Sloane', 'Good. One of us should.'), p('She puts the whisky back, unopened, and pours you a glass of water from the jug, and sits down again behind the legal pad.')]),
  ];
}

function reportPrompt(s: GameState): Block[] {
  return [
    q('Sloane', 'Report.'),
    t(key(s, 'inst.nora12') === 'go' ? 'I have a flat, a dead man’s gin and a sister I couldn’t face. What goes on the pad is mine to decide.' : 'I have a flat, a bar, a sister, and a phone call on a Sunday morning before the police. What goes on the pad is mine to decide.'),
  ];
}

function reportChoices(s: GameState): C12Choice[] {
  if (!get12(s, 'i-minibar')) return minibarChoices(s);
  const nora = key(s, 'inst.nora12') !== 'go';
  const r = (id: 'all' | 'shaded' | 'site', label: string, hint: string, body: Block[]) =>
    offer('i12-report-' + id, label, hint, 'wall', (x) => {
      setKey(x, 'inst.report12', id);
      return body;
    });
  return [
    r('all', 'All of it', nora ? 'Ashby, Nora, the Sunday-morning call.' : 'Ashby, the site, all of it.', [
      p('You give her all of it, in order, the way Adrian wrote a report: the site, the schedule, the caretaker, Ashby and “a friend of hers”, and, if you have it, Nora, and the cinnamon and the black, and the tall friend with the beautiful voice who rang before the police.'),
      ...(nora ? [p('At “the tall friend with the beautiful voice” Sloane’s pen, which she has finally uncapped, stops. She knows that voice. So do you.')] : []),
      q('Sloane', 'Thank you. That goes in my own file, not Axiom’s. I don’t yet know who reads Axiom’s.'),
    ]),
    r('shaded', 'Shaded', nora ? 'The site and Ashby. Not Nora.' : 'The site. Not Ashby’s name.', [
      p(nora ? 'You give her the site, and the schedule, and Ashby. You do not give her Nora. You do not give her a teacher in Holland Village with a child’s bicycle against the wall.' : 'You give her the site, and the schedule, and “a man who ran her”. You do not give her Ashby’s name.'),
      p('Sloane writes it all down, and at the end looks at the pad, and at you, and knows exactly what shape the hole is.'),
      q('Sloane', 'Her people. As written. I won’t ask.'),
    ]),
    r('site', 'The site only', 'Number 9. Nothing else.', [p('You give her Number 9: the furniture, the schedule, the clothes in your size. Nothing else. Not Mrs Tan, not the bar, not the sister. It is a short report. She reads it twice.'), q('Sloane', 'That’s a very thin week, Ms Vale.'), q('You', 'It was a very thin city.'), p('She lets it stand. She has been on the other side of a thin report before.')]),
  ];
}

// ── The wall ──

function wallBlocks(): Block[] {
  return [p('Midnight. The harbour, where Nell went in. The wall is lower than you imagined, and wider, and the water very black and very quiet, and on the far side the city goes on being lit for nobody.')];
}

function wallChoices(s: GameState): C12Choice[] {
  const w = (id: 'name' | 'orchid' | 'stand' | 'daniel', label: string, hint: string, body: Block[]) =>
    offer('i12-wall-' + id, label, hint, 'complete', (x) => {
      set12(x, 'i-wall', id);
      return body;
    });
  return [
    w('name', 'Say her name', 'Out loud. To the water.', [q('You', 'Eleanor. Eleanor Linden.'), p('Nobody answers. The water takes it the way water takes everything, without comment. It is the first time anybody has said it on this wall in fourteen months, and it was you, in her face, and that will have to do.')]),
    w('orchid', 'Drop an orchid in the water', 'The one from across the lane.', [p('You drop a white orchid into the harbour, the one from the sill across the lane, and watch it float for a while, turning, and then go under. She hated orchids. You think she would have enjoyed that.')]),
    ...(key(s, 'inst.daniel-told') ? [w('daniel', 'Ring Daniel', 'It is afternoon there. He’ll answer.', [p('You ring Daniel from the harbour wall. It is five in the afternoon in London, and he answers on the first ring, at his desk, two desks from yours.'), q('Daniel', 'Where are you? You sound like you’re standing somewhere high.'), q('You', 'On a wall. Where somebody fell. Talk to me about the coffee machine.'), p('He does, for twenty minutes, and you stand on the wall and listen and do not fall.')])] : []),
    w('stand', 'Stand there', 'Just stand.', [p('You stand there until your legs ache, and then a little longer, for her, and then you go back to the hotel.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const r = report(s);
  return [
    p('The flight home, a different flight from Sloane’s, and then the wardrobe door. A new card:'),
    q('The card', 'NELL. ELEANOR LINDEN. HER CITY.'),
    p('And under it, in pencil:'),
    q('The card', 'REPORT: ' + (r === 'all' ? 'ALL OF IT.' : r === 'shaded' ? 'SHADED. NORA IS MINE.' : 'THE SITE ONLY. THE REST IS MINE.')),
    ...(key(s, 'act3.nell') === 'known' ? [p('And pinned beside it, the photograph: Nell on the harbour wall, laughing, in flat shoes.')] : []),
    t('A friend of hers. A tall friend with a beautiful voice. I know that voice. I have had breakfast with it.'),
  ];
}

export function institutionalBlocks12(s: GameState): Block[] {
  if (s.phase === 'wheels') return wheelsBlocks();
  if (s.phase === 'landing') return [];
  if (s.phase === 'site') return siteBlocks();
  if (s.phase === 'marlowe') return marloweBlocks(s);
  if (s.phase === 'village') return villageBlocks();
  if (s.phase === 'report') return reportBlocks(s);
  if (s.phase === 'wall') return wallBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices12(s: GameState): C12Choice[] {
  if (s.phase === 'wheels') return wheelsChoices();
  if (s.phase === 'landing') return landingChoices();
  if (s.phase === 'site') return siteChoices(s);
  if (s.phase === 'marlowe') return marloweChoices();
  if (s.phase === 'village') return villageChoices(s);
  if (s.phase === 'report') return reportChoices(s);
  if (s.phase === 'wall') return wallChoices(s);
  return [];
}
