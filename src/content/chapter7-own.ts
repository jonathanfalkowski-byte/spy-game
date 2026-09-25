/** Chapter 7 (own-power, played as the Celebrity route) — Standing Alone: standing → pursue (hub) → close.
 * Wording: docs/story/scripts/CHAPTER_7_OWN_POWER_SCRIPT.md with its Phase 0 decisions, deepened by the heat-and-danger
 * pass (docs/story/scripts/CHAPTER_7_CELEBRITY_SAMPLE_INTERVIEW.md, docs/story/BEAT_MAP.md). Each hub door opens a
 * scene with its own choice (held in c7.pursue-open) and still resolves to the same piece Chapter 8 reads. Hooks
 * Chapter 8 reads: own.exposed, own.alliance.rook, c7.finding and route.entry.
 * The optional evening (Julian or Sebastian) is chosen, consent-gated, heat 3 and fades at the act
 * (docs/story/CONTENT_DIRECTION.md). Firewall: nothing in the investigation reads a c7.evening-* flag.
 * Deepening pass 2 (2026-09-24): the standing morning plays as scenes (the watcher and Odile Frayne's offer
 * when her face is public; the forwarded letter from "C." for everyone, which Chapter 9's orchid echoes);
 * each door has a second beat (the dark aisle, the photographer, the woman in the raincoat; Theo's drink as
 * a third way out of the interview); the day between the doors; and what she does with her notes, which
 * Chapter 8's break-in answers (c7.notes).
 * Set pieces (2026-09-24): the quiet morning, Odile at the Carlisle, every answer to the watcher, the campaign and the
 * card, the envelope of ways in, the sender's price, the day between, a close with nothing or one thread, and the
 * night alone are written as scenes. Prose only: no new choices or flags.
 * New scene (2026-09-24): the Old Flat. After the letter, she walks without deciding to to Adrian's old street
 * (someone else's name on his buzzer) and rings, watches, or walks on (c7.old-flat). Ringing brings Adrian's post
 * and a letter saying his personal effects were collected; she never collected anything (a note Chapter 8 can read).
 * New scenes, round 2 (2026-09-24): on the bridge home, Lotte from Emerald Hill knows her as "Evie" (c7.lotte = played |
 * ask | deny; asking remembers "you and C." on a Singapore balcony); and, entering close, the night tram past Axiom
 * with Daniel, who worked across the corridor from Adrian and does not know her (c7.daniel = ask | tie | quiet).
 * New scenes, round 3 (2026-09-24): the lift, as the hub opens (a man with dry shoulders who knows her name and her
 * sticking window; c7.lift = speak | out | stare), and, if Chapter 5 published, a letter from Amy, nineteen, who
 * started again somewhere nobody knew her (c7.fan = answer | keep | away).
 * Sequence (2026-09-25), "The Grey Coat": after the lift, the next morning, she follows the man from the lift across
 * the river to a green door marked PROPERTY SERVICES (c7.grey = close | far | ahead), then rings, watches or goes home
 * (c7.grey-door = ring | watch | home; ringing learns Mr Pryce's name and sees her empty key hook, a fact). That
 * evening her sticking window has been fixed, initialled D.P. Held in c7.pursue-open (grey → grey-door). Chapter 9's
 * watcher's rent follows the same man. */
import { optionalNpc, type GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get4 } from './chapter4-model';
import { get5 } from './chapter5-model';
import { sebastianDoorOpen5 } from './chapter5-sebastian';
import { mayaHeardNewVoice, mayaKnowsAdaptation } from '../state/chapter3-provenance';
import { get6 } from './chapter6-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';

const SENDER = 'Unknown sender';
export const RECORDS_FEE = 40;
/** Below this, the money line reads as barely enough (it follows actual cash, not route.entry). */
export const LOW_CASH = 100;
const pieceKeys = ['records', 'maya', 'rook', 'audience'] as const;
export const pieces7 = (s: GameState) => pieceKeys.filter((k) => getKey(s, 'own.piece.' + k)).length;
export const cash7 = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);

/** Close fixes the finding from the pieces held (shape ≥2, lead 1, none 0). */
export function enterClose7(s: GameState) {
  const n = pieces7(s);
  set7(s, 'finding', n >= 2 ? 'shape' : n === 1 ? 'lead' : 'none');
}

/** Scene-specific place lines while a hub scene or the evening is open (display only). */
export function place7(s: GameState): string | undefined {
  if (s.scene !== 'chapter7') return;
  const open = get7(s, 'pursue-open');
  if (s.phase === 'pursue' && open)
    return {
      lift: '19:00 · Your building · The lift',
      grey: 'Morning · Following the grey coat',
      'grey-door': 'Late morning · Property Services, behind the old customs house',
      records: '23:10 · Municipal registry · Night desk',
      'records-dark': '23:45 · Municipal registry · The stacks',
      maya: '21:00 · The Lantern',
      'maya-photo': '23:40 · Outside the Lantern',
      rook: '02:00 · The old ferry terminal',
      'rook-woman': '02:20 · The embankment',
      audience: 'Evening · A studio on the river',
      'audience-exit': 'Late · A studio on the river',
    }[open];
  const evening = get7(s, 'evening-open');
  if (s.phase === 'close' && evening)
    return evening.startsWith('julian') ? 'Late · Julian’s apartment' : evening.startsWith('theo') ? 'Late · Theo’s flat above the studio' : 'Late · Harbour, after the last set';
}

/** What Chapter 5 actually put into the world: a portrait (the provocative one is "the famous back"), words only, or nothing. */
export function publicImage7(s: GameState): 'back' | 'portrait' | 'words' | 'none' {
  if (!get5(s, 'published')) return 'none';
  if (get5(s, 'image-use') === 'none') return 'words';
  return get5(s, 'concept') === 'provocative' ? 'back' : 'portrait';
}
/** Maya already knows Evelynn is Adrian (told at the counter, or earlier). */
const mayaKnowsWho7 = (s: GameState) => get6(s, 'maya-knows') === 'in-person' || mayaKnowsAdaptation(s);
/** She recognised the voice from Adrian's calls at the counter and let Evelynn not confirm it. */
const unspokenAtCounter7 = (s: GameState) => mayaHeardNewVoice(s) && ['none', 'partial'].includes(get6(s, 'maya-knows') ?? '');

/** The Chapter 5 personal phone, the only line Axiom does not monitor. */
const ownPhone7 = (s: GameState) => get5(s, 'purchase') === 'phone';
const builtFrame = (s: GameState) =>
  get5(s, 'service') === 'julian'
    ? `You wake in a life with your name on most of it. ${ownPhone7(s) ? 'The phone that answers only to you; ' : ''}the work you do in a room Julian’s office still books for you, which you have made sure you could walk away from; the small stubborn independence you have refused to trade. It is quieter than the lives you were offered. This morning you find out what quiet is worth.`
    : `You wake in a life with your name on as much of it as you could manage. ${get5(s, 'service') === 'self' ? 'The desk you pay for, ' : 'The public desk and its queue, '}${ownPhone7(s) ? 'the phone that answers only to you, ' : ''}the small stubborn independence you have refused to trade. It is quieter than the lives you were offered. This morning you find out what quiet is worth.`;
const entryFrame: Record<string, string> = {
  built: '',
  partial: 'You turned toward this a week ago and you are still learning the footing. Some of what you built still holds; some of it you are building now, in the open, with your own hands. It is slower this way. You knew that when you chose it.',
  unbuilt: 'A week ago you walked out of the arrangement that made everything easy, and into this — a room you pay for that is barely furnished, a budget you can count, a quiet that is mostly just alone. You chose it against everything that pointed the other way. Now you have to make it into something before it makes you regret it.',
};

function famousMorning(s: GameState): Block[] {
  const image = publicImage7(s);
  return [
    p(
      image === 'words'
        ? 'The Aster piece ran without a picture, at your insistence, and it turns out that is its own kind of famous: a name people repeat without a face to put to it. At the café the barista has the issue open beside the till. She doesn’t look up, and you enjoy that more than you should.'
        : `Your face is on a bus shelter at the end of the street. You pass it on the way to buy coffee: the Aster portrait${image === 'back' ? ', the famous back,' : ','} a line of type across the bottom that isn’t your name and is. A girl waiting for the 38 looks from the poster to you and back again, and decides she must be wrong.`,
    ),
    p('By nine your phone has forty messages. An editor wants a cover. A stylist wants a fitting. Somebody’s assistant wants to know whether you would consider a campaign, and doesn’t say for what. Three numbers you don’t recognise send nothing at all, which is its own kind of message.'),
    p(`And there is a man across the road who has been reading the same newspaper outside the bakery since eight. When you come back with the coffee he has gone, and the paper is on the bench, folded open at ${image === 'words' ? 'the page that quotes you' : 'the page with your picture'}.`),
    t('Press, or Sloane’s people, or someone worse. The trouble with being looked at is that you stop being able to tell who is looking.'),
  ];
}
/** Evelynn’s standing-morning scenes run in order: the watcher and Odile (only if her face is public), then the letter. */
const letterArrives: Block[] = [
  p('When you get home the concierge stops you at the desk with a padded envelope and an apology. It came for you a long time ago, he says. It has been in the post room; he was told to hold it until you were back. He does not say who told him.'),
  p('The envelope has been forwarded three times. The stamps are Singaporean, the postmark fourteen months old, the address written in green ink in a confident, looping hand: Ms E. Vale. Inside is a single white orchid, pressed flat and gone the colour of old paper, and a card.'),
  q('The card', 'For E., who always comes back. Breakfast when you do. — C.'),
  t('Fourteen months. Before Adrian ever opened the wrong file, someone was waiting for her to come home to breakfast. And someone decided the letter should reach me now.'),
];
const odileMeets: Block[] = [
  p('At eleven one of the forty messages turns into a voice: Odile Frayne, who represents three faces you have seen on the sides of buildings and would like to represent a fourth. She will be in the bar of the Carlisle at noon. “Bring nothing, sign nothing,” she says, as if she has said it to frightened people before.'),
  p('The Carlisle bar is dark wood, low lamps and the kind of quiet that costs money. Odile is sixty, silver hair cropped close, in a black suit that has never been in a hurry. She slides a card across the table: a perfume house, a one-day shoot, a campaign that would put your face six metres high on the side of the station.'),
  p('She looks at you for a long time before she says anything: your hands, your hair, the way you sit. Not the way men look. The way a jeweller looks at a stone somebody else has cut.'),
  q('Odile Frayne', 'Somebody taught you to sit like that. Don’t tell me who. I don’t want to know, and I’d charge them if I did.'),
  q('Odile Frayne', 'Fifteen hundred for a day, paid thirty days after the posters go up. More later, if they like you, and they will. They want the woman nobody can place. I want to know if you understand what that costs.'),
  t('Money, which I am short of. My face, which is already the problem. And a hundred thousand strangers a day looking up at a woman who was somebody else first.'),
];

// ── The Old Flat (new scene): after the letter, the street where Adrian lived ──

const oldFlatLead: Block[] = [
  p('In the afternoon you find you have walked, without deciding to, to the street where Adrian lived.'),
  p('It is twenty minutes from your door and on the other side of the river, which is to say a hundred miles: a terrace of flat-fronted brick with bins in the front gardens, a launderette on the corner that still has the handwritten sign about the broken dryer, and number 14 with its green door. His door. His window on the second floor, hung now with new curtains, yellow ones, the colour of something you would buy to cheer yourself up.'),
  p('The buzzer panel has four names. His is gone. In its place, in fresh biro on a strip of masking tape: K. OKAFOR.'),
  t('Eleven years he lived behind that door. It took them a month to put somebody else there. It took them about the same to put me behind this face.'),
  p('A woman comes out of the launderette with a basket on her hip and looks at you — the coat, the heels, the hair up — the way this street looks at anybody from the other side of the river.'),
];

function oldFlatChoices(): C7Choice[] {
  const visit = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('flat-' + id, label, hint, 'standing', (x) => {
      set7(x, 'old-flat', id);
      after?.(x);
      return [...body, ...evieLead];
    });
  return [
    visit('ring', 'Ring the bell', 'Meet whoever lives in his rooms now.', [
      p('You press the button with the masking tape on it before you can think about it. A long pause, then feet on the stairs you know by heart: the fourth one creaks, and whoever is coming down knows to step over it already.'),
      p('The woman who opens the door is thirty, in scrubs under a cardigan, with the grey face of somebody who works nights and has just been woken. She looks at you for a long second, and you watch her decide whether she knows you.'),
      q('Kemi Okafor', 'If you’re selling something, I’m asleep.'),
      q('You', 'I’m sorry. I used to know the man who lived here before you.'),
      p('Something in her face changes. Not softer. More careful.'),
      q('Kemi Okafor', 'The quiet one. Everyone round here says that, “the quiet one”. I never met him. The agent said he’d gone away and wasn’t coming back, and a van came and cleared it all in an afternoon before I moved in.'),
      p('She hesitates, then reaches behind the door and comes back with a bundle held together by an elastic band.'),
      q('Kemi Okafor', 'His post still comes. I keep meaning to send it back and there’s nowhere to send it. You might as well have it. You look like you’ve got somewhere to put things.'),
      p('On the walk home you go through it under the streetlights. A dentist’s reminder. A gym that would like him back. And a letter on Axiom’s own paper, from a department you never had to deal with, regretting to inform the addressee that his personal effects have now been collected in full, and thanking him for his years of service.'),
      t('Collected. By whom? I never collected anything. Somebody went through his drawers, his coats, his letters, and signed for him. Somebody signed for me.'),
    ], (x) => note7(x, 'old-flat', 'Axiom wrote to Adrian Vale’s old address that his personal effects had been collected in full. Evelynn collected nothing.', 'Adrian’s post, handed over by the new tenant')),
    visit('watch', 'Watch the window from across the road', 'Don’t go in. Just look.', [
      p('You sit on the low wall by the launderette, in the smell of warm soap, and watch his window. After a while the yellow curtain moves and a young woman in scrubs waters a plant on the sill. He never kept a plant. He said they were a commitment.'),
      p('The woman with the basket comes and sits on the other end of the wall to light a cigarette, and offers you one, and you shake your head.'),
      q('Woman from the launderette', 'You waiting for someone?'),
      q('You', 'I used to know someone who lived there.'),
      q('Woman from the launderette', 'Fourteen? The quiet one. He carried my baskets to the car when my back went, every Saturday for a year, and never once said more than good morning. Went away, they said. Van came and took the lot in an afternoon. No goodbye, no forwarding. Nobody asked after him, after.'),
      p('She smokes for a while, looking where you are looking.'),
      q('Woman from the launderette', 'You’re the first.'),
      t('The first. Eleven years on this street, and I am the only person who has come looking for him, and I cannot tell her who I am.'),
    ]),
    visit('go', 'Walk on before anyone sees you', 'He isn’t here. Neither are you.', [
      p('You walk on, past his door, past the launderette, down to the river path where he ran every morning before work, badly, in a grey sweatshirt with a hole in the cuff.'),
      p('The bench at the second bridge is where he used to stop to pretend he was stretching. A runner goes past, one of the regulars: you know his gait, the left foot that turns out a little. He nodded to Adrian every morning for six years. He does not nod to you. Why would he?'),
      t('Nobody here knows me. That was the point. I didn’t know it would feel like this.'),
    ]),
  ];
}

// ── Evie (new scene, round 2): on the bridge home, somebody from her Singapore ──

const evieLead: Block[] = [
  p('On the bridge home, halfway across, a woman coming the other way stops dead in front of you, so suddenly that the man behind her walks into her.'),
  q('Woman on the bridge', 'Evie? Oh my God. Evie!'),
  p('She is your age, or the age you look: sun-browned, sunglasses pushed up into hair the colour of wet sand, a canvas bag of shopping on her shoulder. Before you can move she has her arms round you, and she smells of sun cream and oranges, and she is laughing.'),
  q('Woman on the bridge', 'It’s Lotte! Lotte, from Emerald Hill! You never answered a single letter. They said you’d gone home. Where even is home? You never said.'),
  t('Evie. Nobody has ever called me that. Somebody called her that.'),
];

function evieChoices(): C7Choice[] {
  const meet = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('evie-' + id, label, hint, 'standing', (x) => {
      set7(x, 'lotte', id);
      after?.(x);
      return body;
    });
  return [
    meet('play', 'Be Evie for her', 'Hug her back. Take her number. Let her have her friend.', [
      p('You hug her back. You say her name as if you had been saying it for years. You let her put her number into your phone and promise coffee, and ask after people you have never heard of, and she tells you, delighted, all the way to the end of the bridge.'),
      q('Lotte', 'You look well. You look — different. Softer, somehow. Whatever you’re doing, keep doing it.'),
      t('I have just made a friend by pretending to be her friend. Somewhere, the real Evie is still not answering her letters.'),
    ], (x) => note7(x, 'lotte', 'Lotte, from Emerald Hill in Singapore, knew the first Evelynn as “Evie” and now has Evelynn’s number.', 'Lotte herself, on the bridge')),
    meet('ask', 'Ask her how you knew each other', 'Carefully. As if you were testing her memory, not yours.', [
      q('You', 'Remind me how we met. This last year has been — a lot.'),
      q('Lotte', 'The terrible parties! The flat on Emerald Hill with no furniture and that view. You and C. out on the balcony every night, plotting. God, I was jealous of you two.'),
      p('She stops. Her face changes, just slightly, the way a face does when it steps on something it was told not to mention.'),
      q('Lotte', 'Sorry. I never know if I’m allowed to say. You were always so private about her.'),
      p('She hugs you again, quickly, and goes, and looks back once from the end of the bridge.'),
      t('C. On a balcony in Singapore, every night. The looping green hand. Breakfast when you do.'),
    ], (x) => note7(x, 'lotte', 'Lotte, who knew the first Evelynn in Singapore as “Evie”, remembers her and “C.” as close: the flat on Emerald Hill, the balcony every night.', 'Lotte herself, on the bridge')),
    meet('deny', 'Tell her she has the wrong woman', 'Gently. It is kinder, and it is safer.', [
      q('You', 'I’m so sorry. I think you have me confused with somebody.'),
      p('Her arms drop. She looks at your face, really looks, from very close, the way nobody has looked at it since the clinic mirror.'),
      q('Lotte', 'I — yes. Sorry. God. You look exactly like — sorry.'),
      p('She goes. At the end of the bridge she turns and looks back at you for a long time, and she does not look like somebody who believes she was wrong.'),
    ]),
  ];
}

function standingChoices(s: GameState): C7Choice[] {
  const famous = !!get5(s, 'published');
  if (famous && !get7(s, 'watcher')) {
    const watch = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
      offer7('watcher-' + id, label, hint, 'standing', (x) => {
        set7(x, 'watcher', id);
        after?.(x);
        return [...body, ...odileMeets];
      });
    return [
      watch('follow', 'Follow him', 'He has ten minutes’ start. You know these streets.', [
        p('He has ten minutes on you, and a man who reads a newspaper for an hour is not in a hurry. You find him two streets over, walking without looking at anything, which is its own tell. You keep a bus between you, then a queue, then the reflection in a jeweller’s window, the way Sloane’s people taught you without meaning to.'),
        p('He stops at a black saloon parked where nobody is allowed to park. The driver winds the window down and takes something from him: a small envelope, or a phone. On the dashboard, face up, is a parking permit with a green H on it. The car pulls out. He walks away in the other direction, lighter.'),
        t('Helix. Marcus watched me leave his party, and now he has someone on my street. Or someone wants me to think it is Marcus. A permit is a thing you can put on any dashboard.'),
        p('You walk home the long way, through the market, and buy nothing, and check every window you pass for a man with a newspaper. There isn’t one. That is almost worse.'),
      ], (x) => note7(x, 'watcher', 'A man watching Evelynn’s street handed something to a car displaying a Helix parking permit.', 'Evelynn followed him herself')),
      watch('paper', 'Take his newspaper', 'He left it on purpose. Read it.', [
        p('You pick up the paper as if it were yours. Folded inside the page with you on it is a smaller page torn from a hotel notepad, the hotel’s name cut away. Two words in pencil, in a hand that presses hard: WELCOME BACK.'),
        p('Under them, fainter, as if the writer had thought better of it: a phone number with the last two digits missing.'),
        t('Not a threat. Worse: a greeting. Somebody here knew her and wants me to know they think I am her. Or wants me to know they know I am not.'),
        p('You fold the note into your wallet behind your own card, which has her name on it, and go upstairs and try all hundred numbers the missing digits could make, in your head, until you are sick of the sound of them. You do not dial any of them.'),
      ]),
      watch('ignore', 'Let him watch', 'Go about your day. Being watched is the job now.', [
        p('You drink the coffee on the bakery step with your face turned to the sun and let him have his look. If being seen is the price of the life, you might as well be seen enjoying it.'),
        p('He is back at six, with a different paper, on the same bench. You wave. He does not wave back, but he does leave.'),
        t('If they want to watch me, let them watch a woman who waves. It costs me nothing, and it costs them the pleasure of being unseen.'),
      ]),
    ];
  }
  if (famous && !get7(s, 'campaign'))
    return [
      offer7('campaign-take', 'Take the campaign', 'Your face six metres high. The money comes in thirty days.', 'standing', (x) => {
        set7(x, 'campaign', 'taken');
        setKey(x, 'own.campaign', 'taken');
        note7(x, 'campaign', 'Evelynn agreed a one-day perfume campaign through Odile Frayne: $1,500 thirty days after the posters go up. Her face will be on the station.', 'Evelynn’s handshake with Odile Frayne');
        return [
          p('You sign nothing, as instructed, and shake her hand, which in this bar is the same thing. The shoot is next week. The money comes thirty days after the posters go up, which is thirty days you do not have. She knows it, and she lets you watch her decide not to mention it.'),
          q('Odile Frayne', 'Get some sleep. Eat something. They are paying for the face, so the face is now my business.'),
          p('On the way out she tells the barman to put your drink on her account, and he nods as if you were already one of hers.'),
          t('Six metres high. Whoever is looking for her will not have to look very hard.'),
          ...letterArrives,
        ];
      }),
      offer7('campaign-terms', 'Offer your hands and your voice, not your face', 'Less money. Less of you on the station wall.', 'standing', (x) => {
        set7(x, 'campaign', 'terms');
        setKey(x, 'own.campaign', 'terms');
        note7(x, 'campaign', 'Evelynn offered the perfume house her hands and voice, not her face: $400 on delivery next month.', 'Evelynn’s terms to Odile Frayne');
        return [
          p('“Hands,” you say. “A voice-over. The back of my head, if they must.” Odile looks at you for a long moment, then laughs, one short bark that turns heads at the bar.'),
          q('Odile Frayne', 'Four hundred, and they will hate it, and they will say yes, because saying no to you is becoming unfashionable. You are going to be very difficult to represent. I think I am going to enjoy it.'),
          p('She writes “hands, voice, back of head” on the back of her own card, in capitals, and underlines “back” twice, and laughs again.'),
          t('Some of me for sale. Not the part anyone could recognise across a station.'),
          ...letterArrives,
        ];
      }),
      offer7('campaign-refuse', 'Say no', 'Keep your face your own, and stay short of money.', 'standing', (x) => {
        set7(x, 'campaign', 'refused');
        return [
          p('You push the card back across the table. Odile does not argue. She tucks it into her breast pocket as though she were filing it, not losing it.'),
          q('Odile Frayne', 'Everyone says no the first time. The ones who mean it are the interesting ones. Call me when somebody else decides what your face is for.'),
          p('You walk out into the noon light with nothing signed and nothing earned, and the doorman touches his hat to you as if you had just bought the building.'),
          t('That was either the smartest thing I have done this week or the most expensive.'),
          ...letterArrives,
        ];
      }),
    ];
  if (get7(s, 'card') && !get7(s, 'old-flat')) return oldFlatChoices();
  if (get7(s, 'old-flat') && !get7(s, 'lotte')) return evieChoices();
  if (!get7(s, 'card'))
    return withOldFlat([
      offer7('card-keep', 'Keep it', 'It’s hers. It is also the only thing anyone ever sent her that you can hold.', 'standing', (x) => {
        set7(x, 'card', 'kept');
        return [
          p('You slide the orchid back into the envelope and put the envelope in the drawer with your passport and the phone that is only yours. It feels like theft, and like the opposite of theft.'),
          p('Twice that afternoon you open the drawer to check it is still there. The second time you catch yourself doing it and close the drawer too hard.'),
          t('Somebody loved her enough to wait fourteen months for breakfast. I am keeping that. I don’t know yet whether it is evidence or company.'),
        ];
      }),
      offer7('card-study', 'Read the postmarks like evidence', 'Adrian’s way. The envelope has a history.', 'standing', (x) => {
        set7(x, 'card', 'studied');
        note7(x, 'card', 'A card to “E.” from “C.”, posted in Singapore fourteen months ago, was held in the building’s post room and released for delivery last Tuesday.', 'The envelope’s own postmarks and labels');
        return [
          p('You lay it out under the lamp the way Adrian used to lay out a filing. Singapore, fourteen months ago. A redirect label to a serviced address in the Straits district. A second, eleven months ago, to this building. And a third, printed last Tuesday, that is not a redirect at all: a release instruction, telling the post room the item may now be delivered.'),
          t('It was not lost. It was held. Someone decided when she would get her post, and decided it should be now, while the face is back on the street.'),
        ];
      }),
      offer7('card-burn', 'Burn it in the sink', 'It was never yours to keep.', 'standing', (x) => {
        set7(x, 'card', 'burned');
        return [
          p('You hold the corner of the card to the gas ring, drop it in the sink and watch the green ink go brown and then go. The orchid does not burn so much as vanish. The smell stays in the kitchen for an hour.'),
          p('You open the window and stand at it with the cold coming in until the kitchen smells only of the street again.'),
          t('Whoever C. is, they are waiting for someone who is not coming. I will not be the thing that walks in and sits down in her chair.'),
        ];
      }),
    ]);
  return [
    offer7('standing-begin', 'Start pulling the thread', 'No clearance, no cover. Your tools only.', 'pursue', (x) => {
      set7(x, 'pursue-open', 'lift');
      return [];
    }),
  ];
}

/** Every answer to the letter leads into the afternoon walk (the Old Flat). */
const withOldFlat = (choices: C7Choice[]): C7Choice[] => choices.map((c) => ({ ...c, apply: (x) => [...(c.apply?.(x) ?? []), ...oldFlatLead] }));

const quietMorning = [
  p('Nobody on the street knows your face. The Aster pictures never ran, and some mornings that feels like a door you didn’t walk through. Other mornings it feels like the only reason you can still buy coffee without anyone watching you drink it.'),
  p('The girl at the bakery gives you the same croissant as yesterday without asking, which is the closest thing you have to being known. You eat it on the step in the cold with your coat buttoned to the throat, dressed properly anyway, hair up, the face finished, because whoever is looking will look at a woman who has made an effort, and whoever is not looking will not care.'),
  p('An old man at the bus stop tells you it will rain by eleven. You tell him you know. It is the longest conversation you have had with anyone in three days.'),
  t('Adrian had a desk, a badge and forty people who said good morning to him whether he wanted them to or not. I have a croissant and a weather forecast. I chose this. I keep choosing it.'),
];

const eveningLines: Record<string, Block[]> = {
  julian: [p('You get home as the city wakes, in last night’s dress, with his taste still on your mouth and the folded line of a contract you didn’t read still folded in your head.')],
  sebastian: [p('You get home after his train has gone, hair down, his coat still around your shoulders. He refused to take it back.')],
  theo: [p('You get home at dawn in last night’s dress with his jacket over it, and the face-down legal pad still in your mind’s eye.')],
  withdrawn: [p('You stopped when you wanted to stop, and he let it be simple. It stays with you longer than you expected.')],
};

export function ownBlocks7(s: GameState): Block[] {
  if (s.phase === 'complete') {
    const outcome = get7(s, 'evening-outcome');
    const partner = get7(s, 'evening');
    const extra = outcome === 'withdrawn' ? eveningLines.withdrawn : outcome?.startsWith('intimate') && partner ? eveningLines[partner] : [];
    return [
      ...extra,
      p('The night does not answer you, and you do not need it to. You know more than you did this morning, and you found it alone. That will have to be enough to sleep on. It is.'),
      p('Somewhere across the river a bell strikes one, and then, a long way off, another bell, late, as if it had had to think about it. You fall asleep between them.'),
    ];
  }
  if (s.phase === 'standing')
    return [
      p((getKey(s, 'route.entry') ?? 'built') === 'built' ? builtFrame(s) : entryFrame[getKey(s, 'route.entry')!]),
      ...(get5(s, 'published') ? famousMorning(s) : quietMorning),
      p(
        get6(s, 'oracle-seen') === 'yes'
          ? 'You keep circling the same seam. ORACLE predicted you would take the identity willingly and that Sloane could not hold you — and Sloane proceeded anyway. Sloane ran this; but nobody builds eight years of a woman’s life in a month. Someone, above her or before her, decided a real operative’s whole life could be pulled off a shelf and fitted to Adrian Vale.'
          : 'You keep circling the same seam. Sloane ran this; but nobody builds eight years of a woman’s life in a month, and the Evelyn in the Blackglass file had been living it long before anyone looked at you. Someone, above Sloane or before her, decided a real operative’s whole life could be pulled off a shelf and fitted to Adrian Vale.',
      ),
      t('Who signed that. Not who ran it — who authorized reusing her. That name is the start of the real shape of this, and I have no clearance to ask for it. Which means I do it the only way left to me. Myself.'),
      p(
        `You count what you have. ${cash7(s) >= LOW_CASH ? 'Enough to work with, if you are careful and the work is quick.' : 'Barely enough, if nothing goes wrong.'} Every road from here costs something — money, time, or being seen — and you are the one who pays.`,
      ),
      ...(get5(s, 'published') ? [] : letterArrives),
    ];
  // The lift plays first when the hub opens; the envelope of ways in follows it.
  if (s.phase === 'pursue') return get7(s, 'pursue-open') === 'lift' ? liftLead : waysIn7(s);
  if (s.phase === 'close') {
    const finding = get7(s, 'finding');
    return [
      ...(finding === 'shape'
        ? [
            p(
              [
                'You lay the pieces beside each other.',
                ...(getKey(s, 'own.piece.records') ? ['Meridian Holdings, behind the apartment and the accounts that dress her.'] : []),
                ...(getKey(s, 'own.piece.maya') ? ['A signature that had to come from directorate level or above.'] : []),
                ...(getKey(s, 'own.piece.rook') ? ['A sender who says the signature sits on a board, not with Sloane.'] : []),
                ...(getKey(s, 'own.piece.audience') ? ['A frightened stranger who says Sloane did not authorize it.'] : []),
                'And, from more than one direction, the same wrongness: Sloane did not author this. She was handed it, the way you were.',
              ].join(' '),
            ),
            t('I went looking for who signed off on reusing her, and I found the first true edge of the shape: the person I have spent this whole affair fearing is not the top of it. Sloane executed a decision made over her head, by whoever sits above her. That is who I am actually looking for. And I found the edge of it with no clearance, no cover, and no one’s permission but my own.'),
          ]
        : finding === 'lead'
          ? [
              p('One thread, not yet a shape — a name that is only an initial, or a floor without a face, or a warning you cannot source. It points somewhere above Sloane. It is not enough to act on. It is enough to know you are pulling the right thread.'),
              p('You write it on a single card and prop it against the lamp, and every time you pass it on the way to the kettle you read it again, as if it might have changed its mind.'),
            ]
          : [
              p('You did not spend what it would have cost, and you carry the question forward unanswered. That is a choice, not a failure. The thread is still there. So is the money you kept.'),
              p('You put the envelope of ways in on the mantelpiece, face out, where you will see it in the morning. The prices in pencil are still there. They will still be there tomorrow, and some of them will have gone up.'),
            ]),
      p(
        [
          ...(getKey(s, 'own.exposed') ? ['You are more visible than you were this morning; Sloane’s directorate knows the independent one is asking.'] : []),
          ...(get7(s, 'fee') === 'paid' ? ['You are lighter in the pocket than you were, and there is no one to bill.'] : []),
          'And you are still the only person holding what you found.',
        ].join(' '),
      ),
      t('Standing alone is slower, and it costs, and it is beginning to be seen. It is also, so far, working — and it is entirely mine.'),
      // The night tram comes last, just before its choice.
      ...(get7(s, 'daniel') ? [] : tramLead(s)),
    ];
  }
  return [];
}

/** The envelope of ways in: the hub's opening (after the lift, when the lift plays). */
function waysIn7(s: GameState): Block[] {
  return [
    p(
      `You write the ways in on the back of an envelope, the way Adrian used to lay out a case: the paper trail, the people who might tell you something, the voices that trade in secrets${
        get5(s, 'published') ? ', and your own name, which opens doors and draws eyes' : ''
      }. You can walk through two of them before somebody notices you walking.`,
    ),
    p('You sit with the envelope under the lamp and look at it for a long time. Each way in has a price written next to it in pencil, and the prices are not all in money. Some of them are in people.'),
    t('Adrian would have picked the cheapest door and felt clever about it. I am learning that the cheapest door is the one somebody else pays for.'),
  ];
}

/** A piece; the second one ends the search (the budget is two). */
const afterPiece = (s: GameState) => (pieces7(s) + 1 >= 2 ? 'close' : 'pursue');

// ── The lift (new scene, round 3) ──

const liftLead: Block[] = [
  p('You come home at seven with the shopping, and the lift is waiting on the ground floor with its doors open, which it never is.'),
  p('A man steps in after you: fifty, grey coat, no shopping, no umbrella, though it has rained all afternoon and his shoulders are dry. He does not press a button. The doors close. You press nine, and he watches you press it.'),
  q('Man in the lift', 'Good evening, Ms Vale.'),
  p('The lift climbs. Four. Five. He stands with his hands folded in front of him, the way men stand at funerals, and looks at the numbers, not at you.'),
];

function liftChoices(): C7Choice[] {
  const ride = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('lift-' + id, label, hint, 'pursue', (x) => {
      set7(x, 'pursue-open', 'grey');
      set7(x, 'lift', id);
      return [...body, ...greyLead];
    });
  return [
    ride('speak', 'Ask him which floor', 'Make him say something he did not plan to.', [
      q('You', 'Which floor?'),
      q('Man in the lift', 'This one is fine.'),
      p('At nine the doors open on your corridor. You step out. He does not. As the doors close he says, pleasantly, “Mind the window. It sticks.”'),
      t('My window sticks. I have told nobody that it sticks.'),
    ]),
    ride('out', 'Get out at the next floor', 'Take the stairs. Don’t let him see your door.', [
      p('At six you step out onto a corridor you have never stood in, walk to the fire stairs without looking back, and climb the last three floors with your heart going like a bird against glass. When you reach nine, the lift is standing open on your floor, empty, its light humming.'),
      t('He got there first. He wanted me to know he could.'),
    ]),
    ride('stare', 'Look at him until he looks back', 'You are not the thing he was told to expect.', [
      p('You turn and look at him. Not at the numbers: at him, the way Sloane looks at a report she does not believe. It takes him until the seventh floor. When at last he meets your eyes something in his face goes still and careful, the way a man’s face goes when the dog he was told was tame turns out not to be.'),
      p('He gets out at eight without a word.'),
      t('Somebody told him I would be frightened. Somebody was wrong, for about four floors.'),
    ]),
  ];
}

// ── The Grey Coat (sequence): following the man from the lift ──

const greyLead: Block[] = [
  p('In the morning he is on the bench across the road by the bakery: the same grey coat, a newspaper he is not reading, his shoulders dry again although the pavement is wet. He does not look up at your window. He does not need to.'),
  p('At half past eight he folds the paper, tucks it under his arm and walks away toward the river, not hurrying, the way a man walks who has somewhere to be and knows he will be let in when he gets there.'),
  t('Somebody told him my window sticks. I would like to know who, and what else they told him.'),
];
const greyDoor: Block[] = [
  p('The plate is polished, and the door is the green of an old bank. There is a bell, a camera above the bell, and a ground-floor window with the blind down.'),
];
const windowFixed: Block[] = [
  p('That evening, when you go to open the window its usual inch, it slides up under your hand without a sound.'),
  p('Somebody has been in and fixed it. There are fresh screws in the hinge, still bright, and on the frame, very neatly, a small white sticker: SERVICED, a date, and two initials. D.P.'),
  t('They fixed my window. It is the most frightening thing anyone has ever done for me.'),
];

function greyChoices(): C7Choice[] {
  const tail = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('grey-' + id, label, hint, 'pursue', (x) => {
      set7(x, 'grey', id);
      set7(x, 'pursue-open', 'grey-door');
      return [...body, ...greyDoor];
    });
  return [
    tail('close', 'Stay close behind him', 'Let him know. See what he does with it.', [
      p('You come down in your coat, fall in thirty yards behind him and do not bother to hide it. He knows by the second corner. He does not speed up. At the café by the tram stop he goes in, orders at the counter, comes out with one coffee, and leaves a second on the counter by the door with the lid on.'),
      q('Girl at the counter', 'He said it was for the lady behind him. Black, no sugar.'),
      t('Black, no sugar. That is how I take it now. Adrian took milk.'),
      p('You leave the coffee where it is. You follow him over the old bridge to a narrow mews behind the customs house, where he lets himself in through a green door with a brass plate that says only PROPERTY SERVICES.'),
    ]),
    tail('far', 'Keep a street back', 'Windows, reflections, a bus between you.', [
      p('You give him a street and use the shop windows, the way Sloane’s people taught you without meaning to: a bus between you, then a queue, then the long mirror of a department store. You lose him once, in the crush by the fish stalls at the market, and find him again by his coat, the only dry one among the wet.'),
      p('He crosses the river by the old bridge and turns into a narrow mews behind the customs house, and lets himself in through a green door with a brass plate that says only PROPERTY SERVICES.'),
      t('He never looked back. Either he is very good, or he did not think he needed to.'),
    ]),
    tail('ahead', 'Get there before him', 'Your tenancy letters came from somewhere. Guess, and be waiting.', [
      p('You do not follow him at all. You go back upstairs and find the letters that came with the flat, the service charges and the welcome pack, and the return address on every one of them is the same: a mews behind the old customs house, across the river.'),
      p('You take a taxi, and you are sitting in the window of the café at the end of the mews with a coffee going cold when he turns the corner twenty minutes later, on foot. He stops at a green door with a brass plate that says only PROPERTY SERVICES and lets himself in with his own key. Just before he does, he glances down the mews at the café window, at you, and nods, as if you had arranged to meet.'),
    ]),
  ];
}

function greyDoorChoices(): C7Choice[] {
  const door = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('grey-' + id, label, hint, 'pursue', (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'grey-door', id);
      after?.(x);
      return [...body, ...windowFixed, ...waysIn7(x)];
    });
  return [
    door('ring', 'Ring, and complain about your window', 'A tenant with a grievance. Nobody questions a grievance.', [
      p('You ring. A young man at a desk lets you in to a front office with a kettle, a calendar from a plumbing supplier, and a steel key cabinet on the wall with its door ajar.'),
      q('You', 'My window sticks. I’d like somebody to look at it.'),
      p('He types in your address and reads the screen, and his face changes very slightly, the way a clerk’s face changes when a name on the screen has a note beside it.'),
      q('Clerk', 'Ah. Yes. Your building’s one of Mr Pryce’s. The owner’s office likes all the maintenance on those flats done by him personally. I’ll let him know.'),
      p('Behind him, in the key cabinet, on a hook with your flat’s number on a red tag, there is no key.'),
      t('Mr Pryce. The owner’s office. And a hook with my number on it and nothing hanging from it.'),
    ], (x) => note7(x, 'pryce', 'Property Services, behind a green door in a mews by the old customs house, manages Evelynn’s building. The owner’s office has all maintenance on her flat done personally by a Mr Pryce, the man from the lift. Her flat’s key hook was empty.', 'The Property Services front office')),
    door('watch', 'Wait across the mews and watch the door', 'Whoever goes in and out of there is your landlord’s hands.', [
      p('You wait in the café at the end of the mews for two hours, through three coffees you do not drink. Two men in overalls go in. A woman with a clipboard comes out. Nobody else.'),
      p('At eleven the green door opens and he comes out with a small tool bag and a key on a red tag, and walks back toward the river: toward your side of the river, toward your building.'),
      t('He is going to my flat, with a key and a bag of tools. I could go home and meet him there. I find I do not want to be in a small room with that man.'),
    ]),
    door('home', 'Go home the long way', 'You know where he works. That is enough for today.', [
      p('You walk home the long way, past everything and nothing, and do not go in until it is dark, because you find you do not want to be in the flat today, and do not want to know why.'),
    ]),
  ];
}

// ── A letter from Amy (new scene, round 3): only if the Aster piece ran ──

function fanLead(s: GameState): Block[] {
  if (!get5(s, 'published') || get7(s, 'fan')) return [];
  const saw = publicImage7(s) === 'words' ? 'I read what you said in Aster three times and copied out the last paragraph and put it on the fridge' : 'I cut your picture out of Aster and put it on the fridge';
  return [
    p('When you get back, among the bills on the mat, there is a letter Aster has forwarded in a bigger envelope, addressed in a careful, unjoined hand to Evelynn Vale, care of the magazine.'),
    q('The letter', `Dear Ms Vale, I am nineteen. Last year I had to start again somewhere nobody knew me, for reasons I won’t put in a letter. ${saw} in my new flat, because you looked like somebody who had started again too and made it look like a choice. I don’t know if that’s true. I don’t need to know. I just wanted you to know it helped. — Amy, Flat 3`),
    t('Somebody who had started again and made it look like a choice. She saw that from a magazine. It took Sloane’s people months to see less.'),
  ];
}

function fanChoices(): C7Choice[] {
  const keep = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('fan-' + id, label, hint, 'close', (x) => {
      set7(x, 'fan', id);
      return body;
    });
  return [
    keep('answer', 'Write back', 'By hand. Honestly.', [
      p('You write back that night, by hand, on the good paper, a page and a half. You tell her it is true, and that it is also not a choice, most days, and that both of those can be true at once. You do not sign it with a flourish. You sign it the way you would sign a letter to a friend.'),
      t('The first letter I have written in this name that is entirely honest.'),
    ]),
    keep('keep', 'Tuck it into the mirror', 'Where you will see it every morning while you put the face on.', [
      p('You tuck it into the frame of the mirror, where you will see it every morning while you put the face on.'),
      t('Somebody needs her to be real. Fine. Then some mornings I will be.'),
    ]),
    keep('away', 'Put it away', 'You cannot carry a stranger’s hope this week.', [
      p('You put it in the drawer with the passport and close the drawer, and sit for a while with your hand flat on it.'),
      t('I cannot carry a stranger’s hope as well. Not this week.'),
    ]),
  ];
}

// ── The records office ──

const recordsDark = [
  p('The file is thinner than it should be. Stapled inside the cover is the sign-out card, and two days ago somebody else pulled this exact bundle. The requester’s name has been scored through so hard the pen went through the card.'),
  p('At a quarter to twelve the lights in the far aisle click off on their timer, one bank and then the next, walking toward you. In the dark at the end of the row something shifts: a chair, a coat, a person.'),
];
const recordsFinding = [
  p('You walk out past the night desk without running.'),
  p('On the train home you read what you took. The apartment you live in, and the accounts that dress the Evelyn identity, trace to a single holding company — Meridian Holdings. Its only named officer is an initial, and a registered agent that exists to have no face.'),
  t('Meridian. Whoever reused her kept the operation’s name for the company that owns the rest of it. That is not tidiness. That is someone who was there the first time. And someone else was in that file two days before me.'),
];
function recordsDarkChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const dark = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('dark-' + id, label, hint, next, (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'records-dark', id);
      after?.(x);
      setKey(x, 'own.piece.records', 'meridian');
      note7(x, 'piece-records', 'The apartment and the accounts dressing the Evelyn identity trace to Meridian Holdings, whose only named officer is an initial. Someone else pulled the same file two days earlier.', 'Public corporate, property and procurement filings');
      return [...body, ...recordsFinding];
    });
  return [
    dark('call', 'Say something into the dark', 'Make them answer, or make them move.', [
      p('“The stacks close at midnight,” you say to the dark, in the clerk’s tired voice. Nothing. Then a chair scrapes, a door you had not seen opens and closes at the far end, and the air moves across the pages under your hand. Whoever it was did not want to be spoken to. You photograph what you came for and put the file back exactly as it was.'),
    ]),
    dark('card', 'Photograph the sign-out card first', 'The scored-out name. Somebody else wanted this file.', [
      p('You turn the card to the lamp before you do anything else. The pen went through, but a hard hand leaves a groove: under the scoring you can just make out a looped capital that might be a C, and an L, and then nothing. You photograph it three times at three angles, then the pages. When you look up, the dark at the end of the row is only dark.'),
    ], (x) => note7(x, 'records-card', 'The earlier sign-out name, scored through, keeps the impression of a looped capital C and an L.', 'Evelynn’s photographs of the registry sign-out card')),
    dark('wait', 'Stand still and wait', 'Let them move first.', [
      p('You do not move. Neither does the dark. For a long minute there is only the radiator and your own pulse. Then soft shoes on the tiles, going away from you, unhurried: a person who wanted you to know they could have stayed. You photograph the pages and put the file back exactly as it was.'),
    ]),
  ];
}
function recordsChoices(s: GameState): C7Choice[] {
  const toDark = (x: GameState) => set7(x, 'pursue-open', 'records-dark');
  return [
    offer7('records-charm', 'Let him know it’s really you', 'Sign something for his daughter and ask nicely. He’ll remember you.', 'pursue', (x) => {
      set7(x, 'fee', 'waived');
      set7(x, 'records-mode', 'charm');
      toDark(x);
      note7(x, 'records-clerk', 'The registry night clerk recognised Evelynn, waived the fee and let her into the stacks. He will remember her.', 'Evelynn’s own choice to use her face');
      return [
        p('You take the pen from his crossword and write his daughter’s name, and then yours, the one you wear, with the kind of flourish Evelyn might have used. You lean on the counter while you do it and let him watch you do it. He lets you into the stacks himself, the keys not quite steady in his hand, and never mentions the fee.'),
        ...recordsDark,
      ];
    }),
    offer7('records-pay', 'Pay the fee and do it by the book', `$${RECORDS_FEE}. Slower, and nobody has a story to tell about it.`, 'pursue', (x) => {
      // The fee never blocks the free-agent core: short of $40, it is recorded unpaid and cash clamps at 0.
      const cash = cash7(x);
      set7(x, 'fee', cash >= RECORDS_FEE ? 'paid' : 'unpaid');
      set7(x, 'records-mode', 'book');
      setKey(x, 'own.cash', String(Math.max(0, cash - RECORDS_FEE)));
      note7(x, 'records-fee', cash >= RECORDS_FEE ? `Spent $${RECORDS_FEE} on records fees. Own cash: $${cash - RECORDS_FEE}.` : `A $${RECORDS_FEE} records fee is unpaid; own cash was $${cash}.`, 'Public registry and filing fees');
      toDark(x);
      return [
        p('You pay the forty dollars and fill in the retrieval slip in a plain hand. He fetches what the rules let him fetch and leaves you alone in the reading room with a lamp and the knocking radiator, which is exactly how you wanted it.'),
        ...recordsDark,
      ];
    }),
  ];
}

// ── Drinks with Maya ──

function mayaPhotoChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const photo = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('photo-' + id, label, hint, next, (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'maya-photo', id);
      after?.(x);
      setKey(x, 'own.piece.maya', 'directorate');
      note7(x, 'piece-maya', 'A reuse authorization is signed at directorate level or above, never at Compliance. No one is named.', 'Maya, public-file scope only');
      return body;
    });
  return [
    photo('chase', 'Go after the photographer', 'Find out who booked him.', [
      p('You are across the road before he has capped the lens. He is young, wet and apologetic in the way of a man who is paid by the picture. He shows you the job on his phone because you ask the way a woman on a bus shelter asks: a booking from an agency, a name you don’t know, and a brief of four words.'),
      q('Photographer', '“Evelynn Vale plus companion.” That’s all they ever send. I don’t know who’s paying. I never do.'),
      t('Plus companion. Somebody wanted Maya in the frame, not just me.'),
    ], (x) => note7(x, 'maya-photo', 'A photographer booked through an agency was briefed to shoot “Evelynn Vale plus companion” outside the Lantern.', 'The photographer’s own job booking')),
    photo('walk', 'Walk Maya home', 'Stay between her and the street.', [
      p('You walk her home the long way, under the arcades, her arm through yours. At her door she tells you, for no reason she can name, that Adrian’s desk was cleared last week: one box to storage with a label she didn’t recognise. She kept his mug, the one with the chip in the rim. She doesn’t know why she is telling you. You do.'),
      q('Maya', 'Go home. Text me when you’re in. Don’t make me come looking for you.'),
      t('She is worried for me. She should be worried for herself, and that is my fault.'),
    ]),
    photo('let', 'Let it go', 'Chasing a picture turns it into a story.', [
      p('You put Maya in a taxi and stand at the kerb in the rain until its lights are gone. Across the road the photographer is already walking away. You let him. A picture of two women having a drink is only a story if someone runs after it.'),
      t('Or if someone paid for it. I will find out which soon enough.'),
    ]),
  ];
}
function mayaChoices(s: GameState): C7Choice[] {
  const finish = (x: GameState): Block[] => {
    set7(x, 'pursue-open', 'maya-photo');
    set7(x, 'maya-photographed');
    return [
      q('Maya', 'I can’t pull it and I wouldn’t. But I can tell you this much for free: a reuse authorization — taking a live legend off one operative and fitting it to another — never clears at Compliance. That’s a directorate signature or higher. Someone with the authority to spend a person.'),
      p('She has not named anyone. She has drawn you a floor: this was signed at the level of a directorate — Executive Intelligence, or above it. Sloane’s level, or over Sloane’s head.'),
      p('When you leave, a flash goes off across the street: a photographer on the steps of the cinema, long lens, already turning away. Tomorrow there may be a picture of you and a woman from Axiom Compliance, heads together in a corner booth.'),
      t('I have just made Maya visible. Whatever comes for me now knows her face.'),
    ];
  };
  return [
    offer7('maya-truth', 'Tell her more than you should', 'She deserves it. It makes her closer to you, and more dangerous to know you.', 'pursue', (x) => {
      setKey(x, 'own.maya-knows', 'more');
      return [
        p(
          mayaKnowsWho7(x)
            ? 'She already knows who you are; she has known since the counter. What you give her now is the rest of it: that the life you are wearing belonged to a real woman first, and somebody signed her away. Maya listens without interrupting, the way she always did, and when you finish she reaches across the table and holds your wrist, hard.'
            : unspokenAtCounter7(x)
              ? 'You tell her some of it. Still not the name; she has never asked for it since the counter, and you have never said it, and you both know. But you tell her that the life you are wearing belonged to a real woman first, and somebody signed her away. Maya listens without interrupting, the way she always did, and when you finish she reaches across the table and holds your wrist, hard.'
              : 'You tell her some of it. Not Adrian — never Adrian — but that the life you are wearing belonged to a real woman first, and somebody signed her away. Maya listens without interrupting, the way she always did, and when you finish she reaches across the table and holds your wrist, hard.',
        ),
        q('Maya', 'Okay. Okay. Then I’ll tell you what I can, and you are never going to say where you heard it.'),
        ...finish(x),
      ];
    }),
    offer7('maya-shield', 'Keep her out of it', 'Ask the procedural question and nothing else. She’ll know you’re hiding something.', 'pursue', (x) => {
      setKey(x, 'own.maya-knows', 'little');
      return [
        p('“Research,” you say. “For a piece.” She knows it isn’t, and she lets you have it anyway, which is worse.'),
        q('Maya', 'Fine. Research.'),
        ...finish(x),
      ];
    }),
  ];
}

// ── The dead drop ──

function rookWomanChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const leave = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('woman-' + id, label, hint, next, (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'rook-woman', id);
      setKey(x, 'own.piece.rook', 'board');
      setKey(x, 'own.piece.rook-verified', 'no');
      note7(x, 'piece-rook', 'The sender says the reuse was signed on the Project Eve board, not by Sloane. Unconfirmed, and convenient.', 'The sender, traded for; unverified');
      return body;
    });
  return [
    leave('follow', 'Follow the woman in the raincoat', 'She isn’t the sender’s. Then whose is she?', [
      p('She drops her cigarette as you move and walks out through the dead ticket hall without hurrying. You follow her to the embankment. Under the second lamp she stops, turns and lets you catch up: a woman of fifty in a good coat and bad shoes, who looks at your face the way people look at a photograph of someone they buried.'),
      q('Woman in the raincoat', 'You even stand like her. They did good work on you.'),
      p('Then a car pulls in to the kerb and she is in it before you can ask her name, or what yours used to be.'),
      t('Not the sender’s. Not Sloane’s. Someone who knew Evelyn, and grieved her.'),
    ]),
    leave('river', 'Leave by the river side, as told', 'Take the advice. Watch the glass.', [
      p('You leave by the river side. When you look back from the embankment, the side door is shut, and someone is standing behind the glass.'),
      t('I did what I was told. I will have to decide how often I can afford to.'),
    ]),
  ];
}
function rookTrade(s: GameState): C7Choice[] {
  const trade = (id: string, label: string, hint: string, apply: (x: GameState) => void) =>
    offer7(id, label, hint, 'pursue', (x) => {
      set7(x, 'pursue-open', 'rook-woman');
      apply(x);
      set7(x, 'rook-watcher');
      return [
        q(SENDER, 'It was not Sloane’s authority to give. She executed it. The signature is on the Project Eve board — and one name there you have already met, and did not expect.'),
        t('Or that is exactly what someone would say to point me away from Sloane and toward a door of their choosing. I cannot source it. I write it down with a mark next to it: unconfirmed, and convenient.'),
        p('The voice on the phone is doing something to disguise itself, and doing it well: flat, unhurried, neither young nor old. But it pauses before your name, the way you pause before a word in a language you learned late.'),
        q(SENDER, 'And Evelynn. The woman under the timetable isn’t mine. Leave by the river side.'),
      ];
    });
  return [
    trade('rook-trade-fact', 'Give a fact you hold', 'Give them a detail you hold — it’s theirs now.', (x) => {
      optionalNpc(x, 'rook')?.known.push({ key: 'Evelynn gave the sender one held evidence detail.', source: 'Traded at Evelynn’s choice for the signature', event: x.revision });
    }),
    trade('rook-trade-debt', 'Owe them one instead', 'Owe them one. They’ll call it.', (x) => {
      setKey(x, 'own.alliance.rook', 'owed');
    }),
    offer7('rook-refuse-trade', 'Refuse; take nothing', 'Take nothing; owe nothing.', 'pursue', (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'rook-refused');
      set7(x, 'rook-watcher');
      return [
        q(SENDER, 'Then we have nothing to say to each other. Leave by the river side. She isn’t mine.'),
        p('You leave by the river side, and you don’t look back until the embankment. Someone is standing behind the glass of the side door, watching you go.'),
      ];
    }),
  ];
}

// ── The interview ──

const greenRoom = [
  p('The green room is empty except for a man in a grey suit who isn’t on any call sheet. He doesn’t stand. He looks at you the way the clinic’s mirror did, measuring the fit.'),
  q('Man in grey', 'You stand like someone taught you to stand quite recently. It’s very good. Nearly perfect.'),
  p('Then he is gone, through a door you didn’t see, and your hands are cold. When you reach the loading bay, the car Aster sent has left. Another car idles in its place with its lights off, and nobody gets out.'),
];
function audienceChoices(s: GameState): C7Choice[] {
  const plant = (id: string, label: string, hint: string, mode: string, exposed: string, body: Block[]) =>
    offer7(id, label, hint, 'pursue', (x) => {
      set7(x, 'pursue-open', 'audience-exit');
      set7(x, 'audience-mode', mode);
      setKey(x, 'own.exposed', exposed);
      if (mode === 'theo') set7(x, 'theo', 'curious');
      return [...body, ...greenRoom];
    });
  return [
    plant('plant-subtle', 'Ask it as a feeling', 'Only someone who already knows will hear it.', 'subtle', 'yes', [
      p('You look past him, into the lens, and let your voice drop. “Sometimes I think a life can outlast the woman who lived it. Someone keeps it on a shelf. Someone decides who gets to wear it next.” You laugh, lightly, as if it were a line from a song. Theo laughs with you. Forty people in this room hear a mood. Somewhere, one or two people hear a confession.'),
    ]),
    plant('plant-bold', 'Say it straight to camera', 'More people will answer. More of the wrong people will hear.', 'bold', 'yes-deep', [
      p('“Here’s what I’d like to know,” you say, and you don’t smile. “When someone’s whole life gets reused, who signs for it? Somebody signs. I’d like to know their name.” The floor manager looks up from her tablet. Theo, for the first time all evening, doesn’t have the next line.'),
    ]),
    plant('plant-theo', 'Make Theo ask it for you', 'Tradecraft. The question is his, not yours — and now he’s curious about you.', 'theo', 'yes', [
      p('You don’t answer. You let the silence sit until he fills it, and you steer him with your eyes and a half-finished sentence about borrowed names, until he is the one leaning forward, delighted with himself: “Are you telling me somebody gave you a life? Who hands out lives, Evelynn?” It goes out under his name. Clever. It is also the first time Theo Marr has looked at you as a story instead of a guest, and a man like that doesn’t stop pulling a thread once he has found it.'),
    ]),
  ];
}
function audienceExitChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const leave = (id: string, label: string, hint: string, exit: string, body: Block[]) =>
    offer7(id, label, hint, next, (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'exit', exit);
      setKey(x, 'own.piece.audience', 'adjacent');
      x.npcs.sloane.known.push({
        key: 'The independent one is publicly asking who authorized the identity reuse.',
        source: 'Evelynn’s public question to her own audience',
        event: x.revision,
      });
      note7(x, 'piece-audience', 'Someone adjacent to Project Eve answered: she did not authorize it; stop looking where they want you to.', 'Self-deleting account replying to Evelynn’s public question; unverified');
      return [
        ...body,
        p('At home, still in the dark dress, you check your phone. Among the hundreds of messages is one from an account that will delete itself within the hour, from somebody who was adjacent to Project Eve and is frightened: “You’re asking the right question about the wrong person. She didn’t authorize it. Stop looking where they want you to.”'),
        p('And the cost, already paid: your question was public. Somewhere in Sloane’s directorate, a note is made that the independent one is asking who authorized the reuse.'),
      ];
    });
  return [
    leave('exit-crowd', 'Go out the front, into the fans', 'Your face is the problem. Use it as the answer.', 'crowd', [
      p('There are twenty of them behind the rope, phones up, and they scream your name, the name you are wearing, as you step out into the rain. You sign three programmes, take a photograph with a girl who is shaking, and let the crowd fold around you all the way to the corner, where no taxi can refuse a woman with twenty witnesses. Behind you, the dark car pulls out and does not follow. Fame is a cage. Tonight, for ten minutes, it was a bodyguard.'),
    ]),
    leave('exit-theo', 'Let Theo buy you a drink first', 'He wants the story. He may already have part of yours.', 'theo', [
      p('Theo takes you to the members’ bar on the roof, where the lights are low and nobody looks at anyone on purpose. He orders without asking what you want and gets it right, which you do not tell him. For twenty minutes he is charming about nothing, and then, with his glass halfway to his mouth, he stops being charming.'),
      q('Theo Marr', 'Somebody rang upstairs before we were off the air. Not a viewer. An office. They wanted the raw tape of your segment, all of it, before the edit. Said they sat on a board, as if that explained anything.'),
      p('He watches you hear it. He is very good at watching people hear things.'),
      q('Theo Marr', 'I said no, for tonight. I’m curious what I said no to. When you want to tell me, I’m a very good listener. When you don’t, I’m a very good guesser.'),
      p('He puts you in his own car home, and does not get in with you, and the not getting in is so clearly a move that you almost admire it.'),
      t('A board. Somebody on a board wanted to see my face ask that question, frame by frame, before anyone else did.'),
    ]),
    leave('exit-river', 'Walk the river path in the rain', 'Alone and quiet. You’ll know if they follow.', 'river', [
      p('You take the long way along the embankment, heels in your hand once the stones get slick. At the second bridge you see him in a shop window’s reflection: grey suit, no umbrella, thirty yards back. At the third you cut through a hotel lobby and out through its kitchens, and come up on the far side of the road in time to watch him stand at the river rail, looking the wrong way. You have never been so frightened. You have never felt so awake.'),
    ]),
  ];
}

// ── The optional evening (chosen, consent-gated, heat 3, fades) ──

const julianAvailable7 = (s: GameState) =>
  !!((get5(s, 'intimacy') && get5(s, 'want-target') === 'julian') || get5(s, 'mutual-interest') || get4(s, 'mutual-interest'));
const sebastianAvailable7 = sebastianDoorOpen5;
/** Theo is available once she has let him in: he asked her question for her, or bought her the drink after. */
const theoAvailable7 = (s: GameState) => get7(s, 'theo') === 'curious' || get7(s, 'exit') === 'theo';
export const eveningPartners7 = (s: GameState) => [
  ...(julianAvailable7(s) ? (['julian'] as const) : []),
  ...(sebastianAvailable7(s) ? (['sebastian'] as const) : []),
  ...(theoAvailable7(s) ? (['theo'] as const) : []),
];

type Partner = 'julian' | 'sebastian' | 'theo';
const who: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian', theo: 'Theo Marr' };
const invitation: Record<Partner, Block[]> = {
  julian: [
    p('His apartment is on the forty-first floor of a building Helix doesn’t own, he tells you at the door, as if that matters, and perhaps it does. He has taken off his tie and forgotten his cufflinks, and he looks at you the way he did the first time, as if you were a problem he would very much like to have.'),
    p('On the desk by the window, under a glass of whisky, lies a contract with the Helix crest. The counterparty line is folded under. You could unfold it. You don’t. Not tonight.'),
    t('Everyone I want is standing next to something I am trying to find. That is the job now. It is also, tonight, beside the point.'),
    q('Julian Mercer', 'Stay as long as you like. Tell me what you want, and that’s what happens.'),
  ],
  sebastian: [
    p('The late set is forty people in the dark and one cello, and he plays the middle section looking straight at you. Afterwards, in the corridor behind the stage, he kisses you before either of you has said hello.'),
    p('On the way out, a man by the fire door watches the two of you a little too long. When you glance back he is on his phone. Sebastian doesn’t notice. You do, and you file it with the others.'),
    q('Sebastian', 'The hotel’s round the corner. Or I walk you home. Or we stand here until they throw us out. You choose.'),
  ],
  theo: [
    p('Theo’s flat is above the studio, up an iron stair from the loading bay: one long room with the river along one side and a hundred books nobody has ever arranged. He has taken off the television face along with the jacket. Without it he looks younger and less sure, which you suspect is also a face.'),
    p('On the desk, under the lamp, a legal pad lies face down. He sees you see it, and does not turn it over.'),
    t('He pulls threads for a living, and I am a thread. I know that. I came anyway.'),
    q('Theo Marr', 'No cameras. No notes. I’m off the clock, and so are you. Tell me what you want tonight and I’ll take you at your word.'),
  ],
};
const scopeReply: Record<Partner, { 'no-sex': string; sex: string }> = {
  julian: { 'no-sex': 'Then that’s the evening. You set the edge and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  sebastian: { 'no-sex': 'Good. I’d like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
  theo: { 'no-sex': 'Then that’s what we do. I’m very good at wanting things I don’t get. Ask anyone I’ve interviewed.', sex: 'Yes. And the moment you want to stop, we stop. I mean that more than anything I’ve ever said on air.' },
};
const stopBody: Record<Partner, Block[]> = {
  julian: [
    p('You put a hand on his chest and he stops at once, and laughs under his breath.'),
    q('Julian Mercer', 'Right. Water, a car home, or the sofa. Your choice.'),
    p('You take the car. He walks you to the lift and doesn’t kiss you goodnight, and somehow that is what you think about all the way home.'),
  ],
  sebastian: [
    p('You put your hand flat on his chest. He stops at once, breathing hard, grinning.'),
    q('Sebastian', 'Glass of water and a taxi, then. I’ll walk you down.'),
    p('He does, with his coat around your shoulders, and plays you the first bar of something new on the hotel steps, badly, on an imaginary cello.'),
  ],
  theo: [
    p('You put a hand flat on his chest. He stops at once and rests his forehead against yours, laughing under his breath.'),
    q('Theo Marr', 'Right. A car, the sofa, or a very long walk by the river. Your call.'),
    p('You take the car. He does not ask when he will see you again, which is the first thing all night that surprises you.'),
  ],
};
const stayBody: Record<Partner, { 'no-sex': Block[]; sex: Block[]; after: Block[] }> = {
  julian: {
    'no-sex': [
      p('He kisses you against the window with the whole city behind you, slowly, as if there were no hurry anywhere in the world. He unzips the dress an inch at a time and tells you, in that low boardroom voice, exactly what he thinks of you, and you let him. Later you are lying across his bed half-dressed with his hand spread warm on your bare back, and when you say that is where tonight stops, he says “good” and means it, and neither of you moves for a long time.'),
    ],
    sex: [
      p('He kisses you against the window with the whole city behind you. The dress goes first, then his shirt, then any pretence that either of you came here to talk. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom and not letting go.'),
      p('What happens next is yours and his, and it stays on the forty-first floor. The scene fades.'),
    ],
    after: [
      p('Later, the city is going grey at the edges and Julian is asleep. The contract is still on the desk under the empty glass. You still don’t touch it, and you are not entirely sure whether that is decency or strategy.'),
    ],
  },
  sebastian: {
    'no-sex': [
      p('He undoes the dress slowly and says out loud what he likes about what he finds, and every word of it lands. Your heels are somewhere in the dark. When you say that is where tonight stops, he laughs against your throat and stays exactly there with you, and it is very, very good.'),
    ],
    sex: [
      p('He undoes the dress slowly and says out loud what he likes, and every word of it lands. The lamp stays on. You pull him down by the collar and stop keeping count of where anything ends. When he asks once more, low, whether you are sure, you answer by drawing him down onto the bed with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
    after: [
      p('Later he is drawing a slow line down your spine with one finger, humming, and his train leaves at eight. Neither of you mentions it. Somewhere a man with a phone knows where you are tonight, and for a few hours you let that be somebody else’s problem.'),
    ],
  },
  theo: {
    'no-sex': [
      p('He kisses you by the window with the river going past below, slow and curious, as if every answer only leads him to a better question. He finds the zip of the dress and asks with his eyes before he uses it. Later you are lying across his unmade bed in your slip with his hand spread warm on your stomach, and when you tell him that is where tonight stops, he says “good” against your shoulder, and you both believe him.'),
    ],
    sex: [
      p('He kisses you by the window with the river going past below, slow and curious, and then not slow at all. The dress goes. So does the careful television manner, all at once, and under it is someone hungrier and much less certain, which you like better. He asks once more, low, whether you are sure. You answer by pulling him down with you onto the bed.'),
      p('What happens next is yours and his, and it stays above the studio. The scene fades.'),
    ],
    after: [
      p('Later, while he sleeps, you get up for water and stand at the desk with the lamp off. The legal pad is still face down. You could turn it over. You find, to your surprise, that you do not want to know yet whether your name is on it.'),
      t('Or I am afraid that it is. Tonight it comes to the same thing.'),
    ],
  },
};

function eveningChoices(s: GameState): C7Choice[] {
  const open = get7(s, 'evening-open') as string;
  const partner = open.replace('-room', '') as Partner;
  const leave = offer7('evening-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
    delete x.choices['c7.evening-open'];
    set7(x, 'evening-outcome', 'declined');
    return [p('You say goodnight and mean it, and go home alone through the rain, and it is exactly what you wanted.')];
  });
  if (!open.endsWith('-room')) {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer7(`evening-${partner}-${id}`, label, hint, 'close', (x) => {
        set7(x, 'evening-open', partner + '-room');
        set7(x, 'evening-scope', id);
        note7(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(who[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', partner === 'sebastian' ? 'Go back with him, but not sex tonight' : 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', partner === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      leave,
    ];
  }
  const scope = get7(s, 'evening-scope') as 'no-sex' | 'sex';
  return [
    offer7('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
      delete x.choices['c7.evening-open'];
      set7(x, 'evening-outcome', 'withdrawn');
      return stopBody[partner];
    }),
    offer7('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
      delete x.choices['c7.evening-open'];
      set7(x, 'evening-outcome', 'intimate-' + scope);
      return [...stayBody[partner][scope], ...stayBody[partner].after];
    }),
  ];
}

/** Before the night: what Evelynn does with what she found. Chapter 8's break-in reads it (c7.notes). */
function notesChoices(s: GameState): C7Choice[] {
  const keep = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer7('notes-' + id, label, hint, 'close', (x) => {
      set7(x, 'notes', id);
      after?.(x);
      return body;
    });
  return [
    keep('hide', 'Hide the notes where Adrian hid things', 'In the lining of the old jacket. Nobody searches a dead man’s coat.', [
      p('You write it all out once, small, on two sheets of hotel notepaper, and fold them into the lining of Adrian’s old jacket, where he used to keep the spare key and the letter he never sent. It is the one thing in the wardrobe nobody has a reason to touch.'),
      t('A dead man’s coat. Nobody searches the dead.'),
    ]),
    keep('burn', 'Learn it by heart and burn the paper', 'Nothing to find. Nothing to prove, either.', [
      p('You read the notes three times, then once more with your eyes closed, then hold them over the sink with the lighter until there is nothing left but the smell. Adrian had a memory for filings that people used to find unsettling. It turns out it came with the rest of you.'),
      t('If they want it now, they will have to take it out of me.'),
    ]),
    ...(get6(s, 'maya') === 'restored'
      ? [
          keep('maya', 'Send Maya a sealed copy', 'Insurance. It also makes her someone worth watching.', [
            p('You photograph the notes and send them to Maya’s personal address with one line: “If I stop answering, open this. Not before.” She replies inside a minute with a single full stop. She has understood, and she has not argued, which frightens you more than an argument would.'),
            t('Insurance. And a second person who can be hurt for knowing.'),
          ], (x) => note7(x, 'notes-maya', 'Evelynn sent Maya a sealed copy of her findings, to open only if Evelynn stops answering.', 'Evelynn’s own message to Maya')),
        ]
      : []),
  ];
}

// ── The last tram (new scene, round 2): Daniel, who worked across the corridor from Adrian ──

function tramLead(s: GameState): Block[] {
  const famous = !!get5(s, 'published');
  return [
    p('Later, too restless to sleep, you go out again and ride the night tram for no reason at all, the slow one that goes the long way round past Axiom Tower and back. At the Axiom stop a man gets on with his tie pulled loose and his lanyard still round his neck, and sits down opposite you, and you know him before he has finished sitting down.'),
    p('Daniel. Adrian worked across the corridor from Daniel for six years: Daniel who ate the same sandwich every day, who said “per my last email” out loud, who cried once at a leaving do and blamed the wine. He has started wearing a tie. It is a terrible tie.'),
    p(
      famous
        ? 'He looks at you, and then looks again, and goes pink, and turns to the window, where your reflection is, and has to look away from that too.'
        : 'He does not look at you. He looks at his phone, and then at nothing, the way people do at the end of a day that went on too long.',
    ),
    q('Daniel', famous ? 'Sorry. You’re — from the magazine. Sorry. I’m not going to ask you for anything.' : 'Sorry. Does this one go past the market? I never know.'),
    q('You', famous ? 'It’s all right.' : 'It does.'),
    q('Daniel', 'Long day. They gave away a man’s desk today. Somebody I worked with. He’s been gone a while, but they only just gave it to someone else, and she’s put a plant on it, and I found I minded. Stupid.'),
  ];
}

function danielChoices(): C7Choice[] {
  const ride = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('daniel-' + id, label, hint, 'close', (x) => {
      set7(x, 'daniel', id);
      return [...body, ...fanLead(x)];
    });
  return [
    ride('ask', 'Ask him about the man', 'Let him talk about Adrian. You will have to sit still for it.', [
      q('Daniel', 'Adrian. He read everything. I used to send him my reports at eleven at night and they’d come back fixed by seven, and he never told anyone they’d needed fixing. I never thanked him. You always think there’ll be another Friday.'),
      p('He gets off at the market with a nod and a “sorry, going on”, and the tram pulls away, and you sit with your hands in your lap.'),
      t('You did thank me, Daniel. Once, at the leaving do, when you blamed the wine. I remember it better than you do.'),
    ]),
    ride('tie', 'Tell him the tie doesn’t suit him', 'Adrian always did.', [
      q('You', 'That tie doesn’t suit you.'),
      p('He stares at you. For a second something goes across his face, very fast, like a bird across a window.'),
      q('Daniel', 'Someone used to say that to me. Exactly that.'),
      q('You', 'Then someone was right.'),
      p('He laughs, not quite, and takes the tie off, there on the tram, and puts it in his pocket. At his stop he looks back at you through the glass as the doors close, frowning, as if he were trying to remember a word.'),
      t('That was careless. It was also the first time in weeks that anybody has looked at me and nearly seen him.'),
    ]),
    ride('quiet', 'Let him be', 'Say nothing. He is not yours to comfort any more.', [
      p('You say nothing. He gets off at the market and leaves his coffee cup on the seat beside him, the lid chewed at the edge, the way he chewed every lid for six years.'),
      t('Six years across a corridor, and I could pick his rubbish out of a bin. He could not pick me out of a tram.'),
    ]),
  ];
}

function closeChoices(s: GameState): C7Choice[] {
  if (get7(s, 'evening-open')) return eveningChoices(s);
  if (!get7(s, 'daniel')) return danielChoices();
  if (get5(s, 'published') && !get7(s, 'fan')) return fanChoices();
  if (get7(s, 'finding') !== 'none' && !get7(s, 'notes')) return notesChoices(s);
  const partners = eveningPartners7(s);
  const c: C7Choice[] = [];
  if (partners.includes('julian'))
    c.push(
      offer7('evening-julian', 'Go to Julian’s', '“Dinner ran long. I’d like to see you. Only if you want to.”', 'close', (x) => {
        set7(x, 'evening', 'julian');
        set7(x, 'evening-open', 'julian');
        return [
          p('Julian’s message arrives while you are still standing at the window: “Dinner ran long. I’m home, I’m sober, and I’d like to see you. Only if you want to.” A minute later: “No business. I promise.”'),
          ...invitation.julian,
        ];
      }),
    );
  if (partners.includes('sebastian'))
    c.push(
      offer7('evening-sebastian', 'Go and hear Sebastian play', '“Back for one night. It holds its nerve now. Come and tell me if I’m lying.”', 'close', (x) => {
        set7(x, 'evening', 'sebastian');
        set7(x, 'evening-open', 'sebastian');
        return [
          p('A message from a number you have saved under a single letter: “Back for one night. Harbour, the late set, the new version. It holds its nerve now. Come and tell me if I’m lying.”'),
          ...invitation.sebastian,
        ];
      }),
    );
  if (partners.includes('theo'))
    c.push(
      offer7('evening-theo', 'Go to Theo’s', '“No cameras. No notes. Come over.”', 'close', (x) => {
        set7(x, 'evening', 'theo');
        set7(x, 'evening-open', 'theo');
        return [
          p(
            get7(x, 'exit') === 'theo'
              ? 'A message from Theo, a little after eleven: “I said I wouldn’t get in the car. I didn’t say I wouldn’t ask. Come over. No cameras, no notes. I’ll behave exactly as badly as you want me to.”'
              : 'A message from Theo, a little after eleven: “You made me ask your question for you tonight. Let me ask one of my own. Come over. No cameras, no notes.”',
          ),
          ...invitation.theo,
        ];
      }),
    );
  c.push(
    offer7(
      'close-end',
      partners.length ? 'Stay in tonight' : 'Carry it into tomorrow',
      partners.length ? 'Go to bed alone with what you found. Chapter 7 ends here.' : 'Chapter 7 ends here.',
      'complete',
      (x) => [
        p('You cook for one, properly, because the alternative is standing at the fridge at midnight: an omelette, a glass of the wine that came with the flat and that nobody has drunk. You eat it standing up at the counter, the way Adrian always did, and laugh at yourself, and sit down to finish it.'),
        p('Then you take your make-up off slowly in the bathroom mirror, and watch her come off in layers until there is only a tired woman with good bones and a face nobody gave her permission to have.'),
        p('You sit at the window with the lights off and watch the street. Nobody is on the bench. You watch it anyway, for an hour, until watching is a habit and not a fear.'),
        ...(get7(x, 'card') === 'kept' || get7(x, 'card') === 'studied'
          ? [p('Before bed you take the envelope out of the drawer and do not open it. Somewhere, C. is still waiting for breakfast.')]
          : []),
      ],
    ),
  );
  return c;
}

/** The day between the first door and the second (appended when a piece lands and the hub reopens). */
function between7(x: GameState): Block[] {
  return [
    p('You sleep four hours and wake before the alarm with the finding still in your mouth like a taste. You dress properly anyway: the fitted black, the heels, your hair up, the face finished. Whatever you walk into next will look at you before it listens to you.'),
    p(
      get5(x, 'published')
        ? 'Two more messages from Odile’s office, one from a television producer, and one from a number you do not have: a single photograph of your own front door, taken from across the street, this morning.'
        : 'One message, from a number you do not have: a single photograph of your own front door, taken from across the street, this morning.',
    ),
    t('Someone wants me to know they are keeping up. Fine. So am I.'),
    p('You spend the afternoon doing the ordinary things that make a life look lived in: the dry cleaner, the chemist, a coffee at the café on the corner where the waiter now calls you madam. You pay cash for all of it. You notice, for the first time, how many cameras there are on an ordinary street, and how few of them point at the road.'),
    p('At six you go through what you found again, from the beginning, at the kitchen table, until it stops being frightening and starts being work.'),
  ];
}
/** A door's closing beat: when it lands the first piece and the hub reopens, the day between follows. */
const withBetween = (choices: C7Choice[]): C7Choice[] =>
  choices.map((c) =>
    c.next === 'pursue'
      ? {
          ...c,
          apply: (x) => {
            const body = c.apply?.(x) ?? [];
            return x.choices['c7.pursue-open'] ? body : [...body, ...between7(x)];
          },
        }
      : c,
  );

// ── The hub ──

export function ownChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'standing') return standingChoices(s);
  if (s.phase === 'close') return closeChoices(s);
  if (s.phase !== 'pursue') return [];
  const open = get7(s, 'pursue-open');
  if (open === 'lift') return liftChoices();
  if (open === 'grey') return greyChoices();
  if (open === 'grey-door') return greyDoorChoices();
  if (open === 'rook') return rookTrade(s);
  if (open === 'rook-woman') return withBetween(rookWomanChoices(s));
  if (open === 'records') return recordsChoices(s);
  if (open === 'records-dark') return withBetween(recordsDarkChoices(s));
  if (open === 'maya') return mayaChoices(s);
  if (open === 'maya-photo') return withBetween(mayaPhotoChoices(s));
  if (open === 'audience') return audienceChoices(s);
  if (open === 'audience-exit') return withBetween(audienceExitChoices(s));
  const done = (k: string) => !!get7(s, 'done-' + k);
  const c: C7Choice[] = [];
  if (!done('records'))
    c.push(
      offer7('pursue-records', 'Dig the public record yourself', 'The registry’s night desk. Slow, legal, entirely yours.', 'pursue', (x) => {
        set7(x, 'done-records');
        set7(x, 'pursue-open', 'records');
        return [
          p('The municipal registry keeps a night desk for lawyers and the desperate. At ten past eleven it is you, a radiator that knocks, and a clerk in a cardigan who looks up from his crossword and forgets to look down again.'),
          q('Night clerk', 'You’re — my daughter has your picture on her wall. The one with the back.'),
          p('He goes red to the ears. You need the filings behind the apartment and the accounts that dress the Evelyn identity: who owns the building, who pays the service contracts, who stands behind the company that stands behind the company. It is all in the stacks. The stacks close at midnight. Retrieval costs forty dollars and takes two days, unless somebody decides otherwise.'),
        ];
      }),
    );
  if (!done('maya') && get6(s, 'maya') === 'restored')
    c.push(
      offer7('pursue-maya', 'Ask Maya what a sign-off like that looks like', 'Drinks at the Lantern. Public-file scope only: she tells you where to look, not the answer.', 'pursue', (x) => {
        set7(x, 'done-maya');
        set7(x, 'pursue-open', 'maya');
        return [
          p('Maya is already at the Lantern when you arrive, in the corner booth under the bad painting, with two glasses of the house red and the face of someone who has been rehearsing what to say.'),
          q(
            'Maya',
            publicImage7(x) === 'back' || publicImage7(x) === 'portrait'
              ? 'I saw you on the side of a bus. On the side of a bus, Evelynn. I nearly walked into a bin.'
              : 'I read you in Aster. In Aster, Evelynn. I read it twice on the train and nearly missed my stop.',
          ),
          p('She pushes a glass across the table. “You look good. You look like somebody I’d be scared of.”'),
          q('Maya', 'Compliance has a new director. He calls everyone “team”. Daniel has started wearing a tie, which I think is a cry for help.'),
          p('You tell her about the stylist with pins in her mouth, the photographer who asked you to “do the face you do”, the woman on the train who wanted an autograph for her mother and then admitted it was for herself. Maya laughs in the right places and in two of the wrong ones, which is how you know she is really listening.'),
          q('Maya', 'Are you sleeping?'),
          q('You', 'Some.'),
          q('Maya', 'That’s a no. You used to say “some” when the answer was no.'),
          t(
            mayaKnowsWho7(x)
              ? 'Used to. She has decided to talk to me the way she talked to him, and I have decided to let her.'
              : unspokenAtCounter7(x)
                ? 'Used to. Neither of us says anything about that.'
                : 'Used to. She says it as if she has known me for years. She has. She just doesn’t know that she knows.',
          ),
          p('It is the best hour you have had in weeks. Then you ask your question, and she goes quiet and looks at you properly.'),
          q('Maya', 'Why do you want to know who signs a reuse authorisation?'),
        ];
      }),
    );
  if (!done('rook') && get6(s, 'proof-opened'))
    c.push(
      offer7('pursue-rook', 'Trade the sender for a name', 'A dead drop at two in the morning. Fast, and you can’t fully source it.', 'pursue', (x) => {
        set7(x, 'done-rook');
        set7(x, 'pursue-open', 'rook');
        return [
          p('The message comes at one in the morning from a number that will not work at two: an address, a locker number, a time. The old ferry terminal is closed for renovation, but the side door has been left on the latch for you, and the departures board still flickers over an empty hall.'),
          p('Locker 41 holds a cheap phone. It rings as your hand touches it.'),
          q(SENDER, 'You want the signature. I have it. It costs — not money, information. Tell me one thing you have not told anyone, and I will tell you who spent her.'),
          p('You are not alone. Under the dead timetable a woman in a raincoat is smoking and not looking at you so carefully that she can only be looking at you.'),
        ];
      }),
    );
  if (!done('audience') && get5(s, 'published'))
    c.push(
      offer7('pursue-audience', 'Ask the question in public', 'A live interview. Your visibility surfaces a source — and tells Sloane you’re looking.', 'pursue', (x) => {
        set7(x, 'done-audience');
        set7(x, 'pursue-open', 'audience');
        return [
          p('The car Aster sends is black and silent and smells of someone else’s perfume. By the time it slides into the loading bay behind the studio your phone has lit up eleven times: the producer, the stylist, two numbers you don’t know, and your editor, who has written only “wear the dark one”.'),
          p('You wear the dark one. It is cut to be looked at: high at the throat, and nothing at all across the back. The stylist is a small, fierce woman with pins in her mouth. She circles you twice, lifts one strand of your hair and lets it fall exactly where it was.'),
          q('Stylist', 'Don’t let them light you flat. You’re better in shadow.'),
          t('Everyone is better in shadow. That’s the whole job.'),
          p('The studio is a black box with one bright island in the middle: two low chairs, a table, a glass of water nobody will drink. The host rises to meet you. Theo Marr, handsome in the way television likes, forty and pretending otherwise, famous for making guests say one thing more than they meant to. He takes your hand in both of his and holds it a beat too long.'),
          q('Theo Marr', `I’ve wanted you in that chair since the Aster ${publicImage7(x) === 'words' ? 'piece' : 'pictures'}. Everyone has. Do you know what they call you upstairs? The woman nobody can place.`),
          p('He means it as a compliment. He has no idea how close he is. You smile the Glass House smile, the one that gives a man the feeling he has been let in, and you feel the room lean toward you: the floor manager, the camera operator, the boy holding the cables. Forty strangers wanting something from you, and you could spend it however you liked.'),
          t('Adrian never had a room lean toward him in his life. I am going to have to be careful how much I enjoy this.'),
          p(
            `The red light comes on. Theo is good. He starts warm — ${
              publicImage7(x) === 'back'
                ? 'the pictures, the dress, whether the famous back of the Aster print was your idea (it was)'
                : publicImage7(x) === 'portrait'
                  ? 'the portrait, the dress, what it is like to see your own face on a bus shelter'
                  : 'the Aster piece, the dress, why a woman who talks like that won’t let anyone photograph her'
            } — and walks you slowly toward the things you haven’t said anywhere. Where you grew up. Why nobody had heard of you a year ago. He leans in when he asks, close enough that the question feels private, with half the city watching.`,
          ),
          q('Theo Marr', 'You came out of nowhere. That’s the rumour. A woman with a face like that doesn’t come out of nowhere.'),
          p('This is the opening. You came to put one question into the public air, a question that will mean nothing to almost everyone watching and everything to the few who know what Project Eve is. How you ask it decides who hears it, and who hears you.'),
        ];
      }),
    );
  c.push(offer7('pursue-stop', 'Stop here; work with what you have', 'You don’t have to spend more to move.', 'close'));
  return c;
}
