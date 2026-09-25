/** Chapter 14 (Act III, own-power played as the Celebrity route) · Sloane's Turn:
 * door → order → maya → answer → sunday → after → complete.
 * Design: docs/story/CHAPTER_14_SLOANES_TURN_DESIGN.md (owner-approved 2026-09-25, all seven decisions as recommended);
 * flow and flags: docs/story/scripts/CHAPTER_14_SLOANES_TURN_SCRIPT.md. Gated behind chapter14Playable(), reached from
 * an own-power Chapter 13 ending (Sloane at the door). Sloane's motive from her own mouth (ENDGAME_RECONVERGENCE §4):
 * handed Project Eve by Meridian with ORACLE's verdict already on it, made officer of record for a product built to
 * slip. On this lane she is the door not taken (c14.sloane = hear | hold | shut, or take through an institutional
 * crossover). The last order: deliver Sloane and her file to the Vesper on Sunday; refusal spends Adrian Vale's name to
 * Axiom and takes the flat (non-sexual); counterplay needs the ORACLE verdict plus one more thing, and makes Celeste
 * afraid. Maya is told the truth, or enough of it, and chooses for herself (act3.maya-choice, derived, never picked
 * over her). The optional chosen evening (heat 3, consent-gated, fades) can include Owen Marsh if he was turned. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { getKey, setKey } from './chapter7-model';
import { eveningPartners11 } from './chapter11';
import { mayaKnowsAdaptation } from '../state/chapter3-provenance';
import { sloaneDoubts } from './sloane-standing';

export type C14Scene = { title: string; place: string; blocks: Block[] };
export type C14Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get14 = (s: GameState, k: string) => s.choices['c14.' + k];
export const set14 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c14.' + k] = v;
};
const offer14 = (id: string, label: string, hint: string, next: string, apply?: C14Choice['apply']): C14Choice => ({
  id: 'chapter14.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter14Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER14 === '1';

function note14(s: GameState, key: string, text: string, source: string) {
  if (get14(s, 'rec.' + key) !== undefined) return;
  set14(s, 'rec.' + key, String(s.history.length));
  set14(s, 'event.' + key, String(s.revision));
  set14(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c14.' + key);
  s.knowledge.push('c14.' + key);
}

export const chapter14Definitions: Record<string, C14Scene> = {
  door: { title: 'The Door Not Taken', place: 'FRIDAY · 19:00 · THE FLAT', blocks: [] },
  order: { title: 'The Last Order', place: 'SATURDAY · MORNING', blocks: [] },
  maya: { title: 'Maya', place: 'SATURDAY · MAYA’S KITCHEN', blocks: [] },
  answer: { title: 'The Answer', place: 'SATURDAY · MIDNIGHT', blocks: [] },
  sunday: { title: 'The Vesper, Sunday', place: 'SUNDAY · 18:00 · THE VESPER', blocks: [] },
  after: { title: 'Afterwards', place: 'SUNDAY NIGHT', blocks: [] },
  complete: { title: 'The Board', place: '· LATER', blocks: [] },
};
export const chapter14Scenes = Object.entries(chapter14Definitions).map(([phase, scene]) => ({
  id: `chapter14.${phase}` as NodeId,
  ...scene,
}));

// ── What Chapters 6–13 left her ──

const c = (s: GameState, k: string) => s.choices[k];
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const famous = (s: GameState) => !!get5(s, 'published');
const pryceKnown = (s: GameState) => !!c(s, 'c8.pryce');
const mayaClose = (s: GameState) => c(s, 'c6.maya') === 'restored';
const mayaKnowsWho = (s: GameState) => c(s, 'c6.maya-knows') === 'in-person' || mayaKnowsAdaptation(s);
const mayaCharged = (s: GameState) => getKey(s, 'act3.maya-status') === 'detained';
const sloaneHere = (s: GameState) => ['truce', 'held', 'allied'].includes(getKey(s, 'act3.sloane') ?? '');

/** The ORACLE verdict in hand: Sloane's signed copy, or what Evelynn already carried (Ch6, Ch9). */
export const holdsVerdict14 = (s: GameState) => get14(s, 'file') === 'yes' || !!c(s, 'c9.lever') || c(s, 'c6.oracle-seen') === 'yes';
/** The one more thing that makes the verdict dangerous by Monday. */
export function secondThings14(s: GameState): ('marsh' | 'card' | 'broadcast' | 'ashby' | 'nora' | 'case')[] {
  const out: ('marsh' | 'card' | 'broadcast' | 'ashby' | 'nora' | 'case')[] = [];
  if (getKey(s, 'act3.ally.marsh') === 'in') out.push('marsh');
  if (c(s, 'c13.card') === 'taken') out.push('card');
  if (getKey(s, 'act3.honeypot') === 'burned') out.push('broadcast');
  if (c(s, 'c12.statement') === 'recorded') out.push('ashby');
  if (getKey(s, 'act3.ally.nora') === 'in') out.push('nora');
  if (c(s, 'case.strength') === 'strong') out.push('case');
  return out;
}
export const counterReady14 = (s: GameState) => holdsVerdict14(s) && secondThings14(s).length > 0;

type Partner14 = 'julian' | 'theo' | 'sebastian' | 'marsh';
const who14: Record<Partner14, string> = { julian: 'Julian Mercer', theo: 'Theo Marr', sebastian: 'Sebastian', marsh: 'Owen Marsh' };
const name14: Record<Partner14, string> = { julian: 'Julian', theo: 'Theo', sebastian: 'Sebastian', marsh: 'Owen' };
/** Partners she chose and did not betray, and Marsh if she turned him in Chapter 13. */
export function eveningPartners14(s: GameState): Partner14[] {
  const out = eveningPartners11(s) as Partner14[];
  if (getKey(s, 'act3.ally.marsh') === 'in') out.push('marsh');
  return out;
}

/** Scene-specific place lines (display only). */
export function place14(s: GameState): string | undefined {
  if (s.scene !== 'chapter14') return;
  if (s.phase === 'maya' && get14(s, 'tell') === 'later') return 'SATURDAY NIGHT · YOUR DOORSTEP';
  if (s.phase === 'sunday' && get14(s, 'answer') === 'refused') return 'SUNDAY · 19:00 · HOME, AND THE FIRE ESCAPE';
  if (s.phase === 'after' && get14(s, 'answer') === 'refused' && !get14(s, 'evening-open')) return 'SUNDAY NIGHT · A HOTEL, UNDER ANOTHER NAME';
  const evening = get14(s, 'evening-open');
  if (s.phase === 'after' && evening)
    return evening.startsWith('julian')
      ? 'Late · Julian’s apartment'
      : evening.startsWith('theo')
        ? 'Late · Theo’s flat above the studio'
        : evening.startsWith('marsh')
          ? 'Late · A flat in Kennington'
          : 'Late · Sebastian’s hotel';
}

// ── The Door Not Taken ──

function doorBlocks(s: GameState): Block[] {
  const answer13 = c(s, 'c13.answer');
  return [
    p('You let her in. You had always thought, if this ever happened, that you would make her wait on the landing, the way she made Adrian wait outside her office with his coat on his knee. You open the door, and stand aside, and she comes in, and it is only afterwards that you notice you did not decide to.'),
    p('She does not sit down until you have asked her twice. She stands in the middle of the room in the grey coat, dripping on the floorboards, looking at the wall. At the cards. At Celeste’s. At Nell’s. At the card that says only SLOANE, and under it, in your own hand, a single question mark.'),
    q('Sloane', 'That’s a fair question. I’ve been asking it too.'),
    p('She sits, at last, on the edge of the sofa, with the folder on her knees, and tells it in order, the way she used to brief a room: no adjectives, no apologies, the facts in the sequence they happened. It is how you know she means it. She has never once, in all the time you have known her, told you a story.'),
    q('Sloane', 'Project Eve did not start at Axiom. It came to us from Meridian, finished, like a car. A legend with eight years of life already in it, and a candidate to fit. The candidate was you. I was made officer of record. My name is on every page.'),
    q('Sloane', 'The file came with an ORACLE assessment already attached. Two numbers. Voluntary adoption: high. Durable control: low. I raised it. In writing. I was told it was a known characteristic of the product, and priced in.'),
    q('Sloane', 'It took me a year to understand what priced in meant. A candidate who slips, but stays useful, is worth more to them than one who stays on the lead. Something that has to be managed. Something that has to keep coming back to buy more management. And if it slips too far, there is an officer of record to explain it to the client. That is what I am, it turns out. I am the part of the product that takes the blame.'),
    ...(sloaneDoubts(s)
      ? [q('Sloane', 'You guessed Benton, that night at the Glass House. With nothing that put him in the room. I never forgot it. It was the first time I thought you might be cleverer than the file.')]
      : []),
    q(
      'Sloane',
      answer13 === 'complied'
        ? 'On Friday morning their client services asked my directorate for a copy of Thursday’s recording. For the file. That is how I found out what a placement is. I have been sick twice today. I am not telling you that for sympathy. I am telling you so that you know I did not know.'
        : answer13 === 'refused'
          ? 'On Friday morning Maya Reyes was charged on a referral with my directorate’s stamp on it. I did not authorise it. Somebody used my stamp. That is how I found out what they are, and what they do to the people round the people they own.'
          : 'On Friday morning the Markets Authority opened an inquiry into the targeting of public officials by private intelligence concerns. Axiom is on the list. My name is on Axiom’s contract. That is how I found out.',
    ),
    p('She opens the folder and takes out a single sheet, and holds it out to you, and does not let go of it when you take the other edge.'),
    q('Sloane', 'This is the assessment. The real one. With the sign-off underneath it: the Meridian board approving the sale to Axiom, knowing what ORACLE said. Three signatures. You will recognise one of them.'),
    p('You do. The looping green hand. C. Laurent.'),
    q('Sloane', 'I have been carrying this for a year, waiting to find out whether it was my insurance or my confession. I think it’s yours now. I think I came here to find out whether you want it, and what you want for it.'),
    t('The woman who built the cage, asking me what I want. I have imagined this so many times, and in none of them did she look so tired.'),
  ];
}

function doorChoices(s: GameState): C14Choice[] {
  const door = (id: string, label: string, hint: string, sloane: string, file: boolean, body: Block[]) =>
    offer14('sloane-' + id, label, hint, 'order', (x) => {
      set14(x, 'sloane', id);
      setKey(x, 'act3.sloane', sloane);
      if (file) {
        set14(x, 'file', 'yes');
        note14(x, 'verdict', 'The ORACLE assessment of Project Eve (voluntary adoption: high; durable control: low), with the Meridian board’s sign-off approving the sale to Axiom anyway. One of three signatures is C. Laurent’s.', 'Victoria Sloane’s own copy');
      }
      return body;
    });
  return [
    door('hear', 'Hear her out, and take the file', 'A truce. This weekend. Nothing more.', 'truce', true, [
      q('You', 'I’ll take it. And you can stay tonight, because you look as if you haven’t slept in a week and I don’t want you on the stairs. That’s all this is. A weekend. Don’t mistake it for anything else.'),
      p('Something goes out of her shoulders. She lets go of the paper.'),
      q('Sloane', 'I wouldn’t know what else to mistake it for.'),
      p('She falls asleep sitting up on the sofa before you have finished making the tea, still in the coat, the empty folder on her knees, and you put a blanket over her and stand looking at her for a long time: the most powerful person in Adrian’s life, asleep in your flat with her mouth a little open.'),
    ]),
    door('hold', 'Hold it over her', '“You knew enough.” Take the file because she has to give it to you.', 'held', true, [
      q('You', 'You knew enough. You knew what ORACLE said, and you signed for me anyway, and you let them cut me to fit it. You don’t get to be frightened in my flat and have me feel sorry for you.'),
      q('You', 'Give me the file. Not because you want to. Because if you don’t, I will make sure the client knows its officer of record read the defect and delivered the product regardless.'),
      p('She looks at you for a long moment. Then, very precisely, she lets go of the paper.'),
      q('Sloane', 'Good. That’s the right answer. It’s the one I’d have given.'),
      p('You let her sleep on the sofa, because it is raining and you are not a monster, and lie awake in the next room listening to her not sleeping either.'),
    ]),
    door('shut', 'Shut the door on her', 'Take nothing from the woman who built the cage.', 'shut', false, [
      q('You', 'No. I don’t want your insurance, and I don’t want your confession. I don’t want anything that’s been in your hands. Go home, Victoria.'),
      p('She takes it without flinching, which is somehow worse. She puts the paper back in the folder, and the folder under her arm, and buttons the grey coat to the throat.'),
      q('Sloane', 'For what it’s worth, you’re right. I would have shut it too.'),
      p('At the door she stops, without turning round.'),
      q('Sloane', 'They’ll know I came. Be careful this weekend.'),
      p('You listen to her go down all four flights, slowly, like someone much older, and then you sit down on the floor with your back against the door, and find that you are shaking, and cannot have said why.'),
    ]),
    ...(getKey(s, 'own.crossover') === 'institutional'
      ? [
          door('take', 'Take the door, once', 'You crossed into her world before. Walk through it with her now. It will cost you later.', 'allied', true, [
            q('You', 'Once. I’ll work with you once. Not for you. With you. And when it’s done, we’re quits, and you never sign anything with my name on it again.'),
            p('She holds out her hand. You look at it for a long time before you shake it. It is cold, and entirely steady.'),
            q('Sloane', 'Quits. I’ll hold you to it. You know I will.'),
            t('I have just made an alliance with the woman who made me. Adrian would have laughed. Or been sick. I am not sure which I am going to do.'),
          ]),
        ]
      : []),
  ];
}

// ── The Last Order ──

function orderBlocks(s: GameState): Block[] {
  const surprised = getKey(s, 'act3.celeste-surprised');
  return [
    p(
      sloaneHere(s)
        ? 'Saturday comes up grey. Sloane is asleep on the sofa under the blanket with one arm over her eyes, and the kettle is too loud, and you stand in the kitchen with the black phone in your hand before it has even lit, because you know it is going to.'
        : 'Saturday comes up grey. You have not slept. You stand in the kitchen with the black phone in your hand before it has even lit, because you know it is going to.',
    ),
    p('It lights.'),
    q('C.', 'You had a visitor. She has something of ours, darling, and she has been carrying it about for a year like a handbag. Bring her to the Vesper on Sunday at six, and bring what she carries.'),
    q('C.', surprised === 'thrice' ? 'Do this one thing properly and I shall stop counting. I shan’t ask you for anything for a long time. You have my word.' : 'Do this one thing, and I shan’t ask you for anything for a long time. You have my word.'),
    p('A minute. Then the second message, which is the one she has been saving.'),
    q('C.', 'If you would rather not, then on Monday Axiom will be told where its missing analyst is, and who he is now, with the clinic’s file to prove it. Sloane’s own people will be sent to recover their property. And the flat will want its keys back. We own the building, darling. We always have.'),
    t('Adrian’s name. She has held it since the breakfast, and never once touched it. She has been keeping it for exactly this.'),
    ...(pryceKnown(s) ? [p('Across the gap, in the flat opposite, a curtain moves. Of course. Mr Pryce saw Sloane on the stairs last night. That is his job. He has never pretended it wasn’t.')] : []),
    t('And Maya. Whatever I do tomorrow, somebody is going to tell Maya something before Monday. It had better be me.'),
  ];
}

function orderChoices(): C14Choice[] {
  return [
    offer14('tell-now', 'Go to Maya now', 'Before Celeste can. Today.', 'maya', (x) => {
      set14(x, 'tell', 'now');
      return [p('You leave a note for nobody on the kitchen table, and take the bus, because you cannot sit still in a taxi, and get off two stops early and walk the rest in the rain, rehearsing, and throwing every rehearsal away.')];
    }),
    offer14('tell-later', 'After Sunday', 'One thing at a time. Maya can have the truth when it is finished.', 'maya', (x) => {
      set14(x, 'tell', 'later');
      return [
        p('You decide it can wait until Sunday is over. You spend the afternoon on the wall, working out routes and times and who could stand where, and at six in the evening your own phone buzzes with a message from Maya, and you know before you open it.'),
        q('Maya', 'Somebody just sent me this. From a number I don’t know. With one line. I’m outside.'),
      ];
    }),
  ];
}

// ── Maya ──

function mayaBlocks(s: GameState): Block[] {
  const knows = mayaKnowsWho(s);
  const later = get14(s, 'tell') === 'later';
  if (later)
    return [
      p('She is on the doorstep in her work coat, though she has no work to go to, with her phone held out in front of her like something she found in the street.'),
      p('On the screen is a photograph of a man. Thirty-four, tired, a good suit worn badly, looking up from a desk at somebody out of frame: Adrian Vale, on his last ordinary morning at Axiom. Under it, one line.'),
      q('The message', 'Ask her who this is.'),
      ...(knows
        ? [q('Maya', 'I know who that is. You know I know. What I want to know is who sent it to me, and why tonight, and what they think it’s going to do.')]
        : [
            q('Maya', 'That’s Adrian. That’s my Adrian, from work. He vanished eight months ago and nobody would tell me anything. Why is somebody sending me Adrian with your name on it?'),
            p('She looks at you. At your face. For a long time. You watch her look.'),
          ]),
      t('Celeste got there first. Of course she did. I gave her the whole afternoon.'),
    ];
  return [
    p(
      mayaClose(s)
        ? 'Maya’s kitchen on a Saturday afternoon: the radio on low, a pan soaking, her laptop’s empty charger still plugged into the wall where the laptop used to be. She lets you in without a word and puts the kettle on, because that is what she does when she is frightened.'
        : 'Maya opens the door on the chain, and looks at you through the gap for a long moment, and then takes the chain off, because something in your face makes her.',
    ),
    ...(mayaCharged(s)
      ? [p('There is a letter from Axiom on the table, face down. There is a letter from the police under it. She has put the sugar bowl on top of both of them, as if they might blow away.')]
      : []),
    p('You sit at her table. She sits opposite. It is the table where Adrian ate a hundred takeaways, and argued about audits, and once, very late, cried about his father, and she held his hand across it and said nothing, which was exactly right.'),
    q('Maya', mayaClose(s) ? 'Go on, then. Whatever it is. You’ve looked like this for a month.' : 'You’d better say it, whatever it is. You’ve been carrying it round for weeks. I can see it from here.'),
  ];
}

function mayaChoices(s: GameState): C14Choice[] {
  const knows = mayaKnowsWho(s);
  const close = mayaClose(s);
  const say = (id: 'all' | 'enough' | 'go', label: string, hint: string, body: Block[], choice: 'stay' | 'witness' | 'away', outcome: Block[]) =>
    offer14('said-' + id, label, hint, 'answer', (x) => {
      set14(x, 'said', id);
      setKey(x, 'act3.maya-choice', choice);
      if (choice === 'witness') note14(x, 'maya-witness', 'Maya Reyes will go on record about the forged emails and who wrote them.', 'Maya herself');
      return [...body, ...outcome];
    });
  const adrian: Block[] = knows
    ? [q('You', 'You know who I was. What you don’t know is who made me, and who owns me, and why your laptop is in an evidence bag.')]
    : [
        q('You', 'Maya. It’s me. I was Adrian. They took me into a building eight months ago and I came out like this, and I have been trying to find a way to tell you every day since.'),
        p('She does not move. She does not say anything at all for a very long time. Then she reaches across the table, the way she did once, very late, and puts her hand over yours, and turns it over, and looks at it, as if she were reading it.'),
        q('Maya', 'You still bite the side of your thumb. You always did that. I told you it would scar.'),
      ];
  const everything: Block[] = [
    p('Then you tell her the rest. Meridian. The legend they sold. Nell in the harbour. Celeste, and the black phone, and the wall. Page seven. Thursday, and the Claremont, and suite 1109, and what was asked, and what you answered. It takes an hour. She does not interrupt once.'),
  ];
  return [
    say(
      'all',
      'Tell her everything',
      knows ? 'Meridian, Celeste, 1109. All of it.' : 'Adrian, and everything after. All of it.',
      [...adrian, ...everything],
      close ? 'stay' : 'witness',
      close
        ? [
            p('When you have finished she gets up and goes to the window and stands there with her back to you, and you watch her shoulders, and wait.'),
            q('Maya', 'Right. I’m in it. Don’t argue with me. You don’t get to do this on your own any more, and you don’t get to decide whether I’m brave enough. I decide that.'),
            q('Maya', 'And when this is over you are going to buy me the most expensive dinner in London, and you are going to tell me all of it again, slowly, with wine.'),
          ]
        : [
            p('When you have finished she sits for a long time with her hands flat on the table.'),
            q('Maya', 'I don’t know what we are now. I don’t know if I can have dinner with you. But I know what they did to me, and I know who did it, and I am not going to be quiet about it. I’ll go on record. With your lawyer, or your regulator, or whoever you’ve got. Somebody wrote those emails in my voice. I want them to have to hear it.'),
          ],
    ),
    say(
      'enough',
      'Tell her enough',
      'Meridian, Celeste, and the charge. Not the rest. Not yet.',
      [
        q('You', 'There’s a company called Meridian. A woman called Celeste Laurent sits on its board. They wanted something from me on Thursday and I didn’t give it to them, or I did, and either way they needed you to be the price. The emails are theirs. The charge is theirs. None of it is yours.'),
        p('She listens with her head on one side, the way she listens to a witness who is telling the truth but not all of it.'),
      ],
      'witness',
      [
        q('Maya', 'That’s not all of it.'),
        q('You', 'No.'),
        q('Maya', 'Fine. I don’t need all of it to know what somebody did to me. I’ll go on record. With whoever you trust. And one day you’ll tell me the rest, and I’ll decide then whether I forgive you for making me wait.'),
      ],
    ),
    say(
      'go',
      'Ask her to leave London',
      'Say as little as you can. Get her out of reach.',
      [
        q('You', 'I can’t tell you why. I’m asking you to go away for a few weeks. Your sister’s, anywhere. Please. Just until it’s over.'),
      ],
      close ? 'stay' : 'away',
      close
        ? [
            q('Maya', 'No.'),
            p('Just that. She folds her arms.'),
            q('Maya', 'You don’t get to send me away like a child and then do something stupid. Whatever this is, I’m staying, and you’re going to tell me the rest of it, and not today, because today I’m too angry to hear it properly.'),
          ]
        : [
            p('She looks at you for a long time, and then she nods, once, the way she used to sign off an audit she didn’t agree with.'),
            q('Maya', 'Leeds, then. My sister’s. I’ll go on Monday. And when I come back, whoever you are, you are going to explain this to me properly, or you are never going to see me again.'),
          ],
    ),
  ];
}

// ── The Answer ──

function answerBlocks(s: GameState): Block[] {
  return [
    p(
      sloaneHere(s)
        ? 'Saturday, midnight. Sloane is asleep on the sofa again, properly this time, on her side, with her shoes off, like somebody who has decided to trust the room. The signed verdict is on the kitchen table under the fruit bowl.'
        : get14(s, 'file') === 'yes'
          ? 'Saturday, midnight. The signed verdict is on the kitchen table under the fruit bowl.'
          : 'Saturday, midnight. The kitchen table is bare. Whatever Sloane carried, she carried away with her.',
    ),
    p('The black phone, with its one contact. The wall, with all of them.'),
    t('She wants me to hand her the one person in London who can hurt her, and the one piece of paper that proves why. And if I don’t, she spends Adrian.'),
  ];
}

function answerChoices(s: GameState): C14Choice[] {
  const say = (id: 'comply' | 'refuse' | 'counter', label: string, hint: string, body: Block[], answer: string) =>
    offer14('order-' + id, label, hint, 'sunday', (x) => {
      set14(x, 'answer', answer);
      return body;
    });
  return [
    say('comply', 'Type “Six o’clock.”', 'Bring her Sloane, and the file. Keep Adrian’s name where it is.', [
      q('You · to C.', 'Six o’clock.'),
      q('C.', 'Thank you, darling. I knew you would see it properly.'),
    ], 'complied'),
    say('refuse', 'Type “No.”', 'Let her spend Adrian. Keep Sloane.', [
      q('You · to C.', 'No.'),
      p('Nothing comes back for a long time. Then:'),
      q('C.', 'Monday, then. You were always going to make me do it the hard way.'),
    ], 'refused'),
    ...(counterReady14(s)
      ? [
          say('counter', 'Type “Six o’clock,” and bring more than she asked for', 'The verdict, and what makes it dangerous by Monday.', [
            q('You · to C.', 'Six o’clock.'),
            q('C.', 'Thank you, darling. I knew you would see it properly.'),
            t('I see it very properly. That is exactly the trouble she is in.'),
          ], 'countered'),
        ]
      : []),
  ];
}

// ── The Vesper, Sunday ──

function sundayBlocks(s: GameState): Block[] {
  const answer = get14(s, 'answer');
  const sloaneWith = sloaneHere(s)
    ? p('Sloane rides with you in the taxi, in the grey coat, with her hands folded in her lap, looking out at the Sunday streets. She has not asked where you are taking her. She has not needed to.')
    : p('You ring Sloane at five. She answers on the first ring. You tell her the Vesper, six o’clock, and she says she will be there, and does not ask why, and you understand that she has been waiting all weekend for somebody to tell her where to stand.');
  if (answer === 'complied')
    return [
      p('Sunday, and the city shut up for the day behind its shutters. You dress for the Vesper the way you would dress for a funeral you have arranged yourself: black, plain, the good coat.'),
      sloaneWith,
      p('The Vesper is closed, its window empty, its door opened before you touch it by the same young man in the same black suit. He looks at Sloane and then at you and then at nothing, and says, “They’re upstairs.”'),
      p('On the stairs Sloane stops, one step below you, and looks up at you, and you watch her understand. Not the whole of it; enough. She does not run. She takes the next step, and the one after that, with her hand on the rail.'),
      q('Sloane', 'I would have done the same. I want you to know I know that.'),
    ];
  if (answer === 'refused')
    return [
      p('At six on Sunday you are at home, with Sloane’s number in your phone and the black phone face down on the table, not going to the Vesper.'),
      p('At seven you go out for milk, because you cannot sit still, and when you come back up the four flights with the carton in your hand, your key does not fit your own door.'),
      p('You try it again. It goes in a centimetre and stops. The lock is new: brass, bright, the scratches of the fitting still on the plate. Taped to the door, at eye level, a printed notice on Meridian Property Services paper, advising the occupant that the tenancy has been terminated with immediate effect and that personal effects may be collected by appointment.'),
      p('Downstairs the street door opens. Voices in the hall. Two men, and one of them you know: he sat two floors below Adrian for six years and never once said good morning. Axiom security. They are coming up.'),
      ...(pryceKnown(s)
        ? [
            p('Across the gap, on the fire escape of the flat opposite, in the rain, Mr Pryce is standing with his hands in his pockets. He looks at you through the landing window. Then he takes one hand out, and points, once, down and to the left: the back stairs, the fire door, the yard.'),
            t('The one who drives. Who doesn’t do the endings. Pointing me out of mine.'),
          ]
        : [p('The landing window. The fire escape. You have looked at it every night for two months and thought: if I ever had to.')]),
    ];
  return [
    p('Sunday. You dress for the Vesper as if you were going to win: the green, the good earrings, the heels you can run in, your hair up and pinned hard. In the mirror a woman who looks like she was placed there by somebody, and is about to explain to them that she wasn’t.'),
    sloaneWith,
    p('The Vesper is closed, its window empty, its door opened before you touch it. The young man in the black suit looks at Sloane, and then at you, and then at the folder under your arm, and something in his face goes careful.'),
    q('Doorman', 'They’re upstairs.'),
    p('On the stairs you tell Sloane, very quietly, what you are going to do. She listens without breaking step. At the top she says only:'),
    q('Sloane', 'Let me stand where she can see me. I’d like her to have to look at me while she reads it.'),
  ];
}

function sundayChoices(s: GameState): C14Choice[] {
  const answer = get14(s, 'answer');
  const readingRoom = (x: GameState): Block[] => [
    p('The reading room. The blinds down, the one lamp, The Autumn Collection on its lectern. Celeste is in the leather chair, and two men you have not seen before are standing by the far door, the one that goes down to the kitchens.'),
    q('Celeste', 'Victoria. How lovely. It has been a very long time.'),
    p('Sloane says nothing. Celeste holds out her hand, not to Sloane, but to you, and you put the file in it.'),
    p('She opens it on her knee and reads the verdict, and then the sign-off underneath it, the three signatures, and you watch her read her own name. She reads it twice. For one sentence, when she speaks, she forgets to say darling.'),
    q('Celeste', 'Well. You kept it.'),
    p('Then the word comes back, and the smile, and she closes the folder.'),
    q('Celeste', 'Thank you, darling. Victoria, these gentlemen will see you out. The back way, I think. It is so much quieter.'),
    p('The two men walk Sloane to the far door. She goes without a word. At the door she turns and looks back at you once, not angry, only checking that it really was you, and then she is gone, and the door closes, and you hear their feet on the kitchen stairs, going down.'),
    ...(get14(x, 'copy') === 'yes' ? [t('I photographed every page of it in the taxi, with Sloane watching me do it and saying nothing. Celeste has the paper. I have the paper’s face.')] : []),
    t('I handed her the woman who showed me who I was. I did it well. I am going to have to look at that on the wall every morning, next to 1109.'),
  ];
  if (answer === 'complied')
    return [
      offer14('comply-copy', 'Photograph the verdict in the taxi first', 'Every page. She will have the paper. You will have its face.', 'after', (x) => {
        set14(x, 'copy', 'yes');
        setKey(x, 'act3.sloane', 'handed');
        return readingRoom(x);
      }),
      offer14('comply-clean', 'Hand it over as it is', 'Do exactly what she asked. Nothing she can find later.', 'after', (x) => {
        set14(x, 'copy', 'no');
        setKey(x, 'act3.sloane', 'handed');
        return readingRoom(x);
      }),
    ];
  if (answer === 'refused') {
    const out = (id: string, label: string, hint: string, body: Block[]) =>
      offer14('escape-' + id, label, hint, 'after', (x) => {
        set14(x, 'escape', id);
        setKey(x, 'act3.adrian-burned', 'yes');
        setKey(x, 'act3.home', 'lost');
        note14(x, 'burned', 'Celeste spent Adrian Vale’s name: Axiom has been told its missing analyst is Evelynn, with the clinic file, and its security came to recover her. Meridian Property Services took back the flat.', 'The new lock, the notice on the door, and the men on the stairs');
        return body;
      });
    return [
      out('fire', 'The fire escape', 'Out of the landing window, in the rain, in heels.', [
        p('You put the milk down on the doormat, very carefully, as if it mattered, and open the landing window, and climb out onto the fire escape in the rain.'),
        p('It is iron, and old, and wet, and the heels are the ones you can run in but not, it turns out, the ones you can climb down four storeys of wet iron in. You take them off and hold them in one hand and go down barefoot, a flight at a time, with the rain in your eyes and the voices on the landing above you now, a man’s voice saying your name, not Evelyn, the other one, Adrian, as if he were trying it out.'),
        p('The last flight stops two metres above the yard. You hang from the bottom rung by both hands for one long second, like a child on climbing frames, and drop, and land badly, and get up, and go out through the back gate into the alley with your shoes in your hand and your stockings ruined, laughing, which you do not expect.'),
        t('Adrian could not have done that. Adrian would have stood on the landing and explained himself. I am not explaining myself to anyone ever again.'),
      ]),
      ...(famous(s)
        ? [
            out('front', 'Walk out of the front door past them', 'They won’t lay a hand on a famous woman in front of a street.', [
              p('You put your sunglasses on. In the dark, on the stairs. You go down all four flights at an easy pace, heels loud on the stone, and meet them on the second landing.'),
              p('The one who never said good morning opens his mouth. You look at him over the top of the sunglasses, the look from the station poster, six metres high, and say, pleasantly, “Excuse me,” and he steps back against the wall to let you pass, because in thirty years of being a large man in corridors he has never once been looked at like that.'),
              p('On the pavement outside there are, as there have been every evening since the Claremont, two photographers. You give them a smile and a wave and get into the first taxi, and by the time the men from Axiom are back on the street the taxi is at the lights, and the photographers have a very good picture of a woman who does not look like she is running.'),
              t('Let them try to take me in front of a camera. I have been learning about cameras.'),
            ]),
          ]
        : []),
    ];
  }
  const things = secondThings14(s);
  const lay = (id: (typeof things)[number], label: string, hint: string, what: Block[]) =>
    offer14('lay-' + id, label, hint, 'after', (x) => {
      set14(x, 'lay', id);
      setKey(x, 'act3.celeste-afraid', 'yes');
      setKey(x, 'act3.terms', 'agreed');
      setKey(x, 'act3.sloane', 'free');
      if (getKey(x, 'act3.maya-status') === 'detained') setKey(x, 'act3.maya-status', 'withdrawn');
      return [
        p('The reading room. The blinds down, the one lamp. Celeste in the leather chair, two men by the far door. She looks at Sloane beside you, and smiles, and holds out her hand.'),
        q('Celeste', 'Victoria. How lovely. And you brought her something, darling. Give it here.'),
        p('You don’t give it to her. You walk past her to the lectern, where The Autumn Collection lies open at page seven, and lay the verdict down on top of your own photograph: the two numbers, voluntary adoption high, durable control low, and underneath them the board’s sign-off, and three signatures, and one of them hers.'),
        ...what,
        p('Celeste gets up. She comes to the lectern and reads it standing, with one hand on the page, and it takes her a long time, far longer than it takes to read three lines and three names.'),
        p('Then she puts the verdict down. She does it too carefully, the way people put down something that is hot, and you see it: her hand is not quite steady, and she knows you saw.'),
        t('She is afraid. For the first time since I have known her. Only for a sentence. I watched it cross her face like weather.'),
        q('You', 'Maya’s charge is withdrawn by Monday. Victoria walks out of the front door, now, past those two gentlemen. And you give me no orders. None. Until your board has met and you have explained that page to them.'),
        p('A long pause. The two men by the far door look at each other.'),
        q('Celeste', 'You have my word.'),
        p('And then, because she is Celeste, and cannot help it, with the smile coming back into place like a picture being rehung:'),
        q('Celeste', 'You know exactly what it is worth, darling.'),
        p('Sloane walks out of the front door. You walk out beside her. Nobody stops either of you.'),
      ];
    });
  const labels: Record<(typeof things)[number], [string, string, Block[]]> = {
    marsh: ['Lay down Owen Marsh’s card beside it', 'The Markets Authority has an open inquiry, and a deputy director who owes you.', [
      p('Beside it you put a Claremont coaster with a telephone number written on the back in a careful hand.'),
      q('You', 'Owen Marsh has an inquiry into the targeting of public officials by private intelligence concerns. He would very much like to see this page. He is expecting a call from me by Monday. If he doesn’t get one, he knows who to ask why.'),
    ]],
    card: ['Lay down the 1109 card beside it', 'A month of your own camera, darling.', [
      p('Beside it you put a small black memory card, in the finger of a housekeeping glove.'),
      q('You', 'A month of 1109, on your own camera. Iris knows where the other months are kept. The verdict says you sold a defective product. The card says what you do with the product afterwards.'),
    ]],
    broadcast: ['Put Theo’s producer on speaker', 'He went on air once. He would love to go on air again.', [
      p('Beside it you put your phone, face up, with a number ready on the screen under a name: Theo Marr, producer.'),
      q('You', 'You watched what happened to the Claremont on television. This would be the second segment. They have been asking me for a second segment all week.'),
    ]],
    ashby: ['Play Ashby’s voice beside it', 'A man in a Singapore bar, on the record.', [
      p('Beside it you put your phone, and play eleven seconds of a tired man in a bar full of fans, saying: “It came down from upstairs. From a friend of hers.”'),
      q('You', 'Colin Ashby, on the record. Nine years running your Singapore station. The verdict is what you sold. Ashby is what you did to the last one.'),
    ]],
    nora: ['Put Nora Linden’s name beside it', 'Nell’s sister wants to be in the room.', [
      p('Beside it you put a card with a name and an address in Holland Village.'),
      q('You', 'Nora Linden. Nell’s sister. She wants to be in the room when whoever did it is asked about it. I told her I would find her a room. This one has a lectern.'),
    ]],
    case: ['Lay the whole case beside it', 'Everything on your wall, sourced, in order.', [
      p('Beside it you put the case: a slim folder, everything from the wall in order, sourced, dated, the way Adrian used to file for a hearing.'),
      q('You', 'The verdict is the first page. This is the rest of the book. It goes to the client, the Authority and the press on Monday, together, unless you and I agree otherwise tonight.'),
    ]],
  };
  return things.map((id) => lay(id, labels[id][0], labels[id][1], labels[id][2]));
}

// ── Afterwards ──

function afterBlocks(s: GameState): Block[] {
  const answer = get14(s, 'answer');
  if (answer === 'complied')
    return [
      p('You walk home the long way, along the river, in the good coat, with your hands empty. It is the first time in a year that nobody in London is carrying that piece of paper except Celeste.'),
      p('At the bridge the black phone lights.'),
      q('C.', 'Thank you.'),
      p('Just that. No darling. You look at it for a long time, standing on the bridge with the river going under you black and fast.'),
      t('She read her own name twice. I saw it. Whatever she says, it frightened her, and she needed me to be the one who brought it to her, so that she could watch me do it.'),
    ];
  if (answer === 'refused')
    return [
      p(
        c(s, 'c11.walk') === 'name'
          ? 'A hotel near the station, the kind with a night porter and no questions, under a name you make up at the desk: Helen, because it was a terrible name and Iris was glad to give it back. The room has a kettle and a view of a wall.'
          : 'A hotel near the station, the kind with a night porter and no questions, under a name you make up at the desk, and forget by the time you reach the lift. The room has a kettle and a view of a wall.',
      ),
      p('You sit on the bed in your ruined stockings with your shoes in your lap and turn on the television, and there it is, a line along the bottom of the late news, between a football score and the weather: AXIOM CONFIRMS SECURITY REVIEW AFTER ANALYST DISAPPEARANCE. No names. Not yet.'),
      q('Sloane · message', 'I know. I didn’t send them. I am trying to find out who did. Stay where you are.'),
      ...(getKey(s, 'act3.maya-choice') === 'away'
        ? [q('Maya · message', 'I’m on the train. You said stay away. I’m staying away. I hate you. Be alive on Monday.')]
        : [q('Maya · message', 'Where are you? Don’t tell me. Just tell me you’re somewhere with a lock on the door.')]),
      t('They took the flat. They can have it. It was hers.'),
    ];
  return [
    p('The embankment, at eight on a Sunday night, the river high and fast. Sloane beside you, the grey coat buttoned to the throat, and between you one cigarette, which she found in a pocket of the coat and cannot have smoked in twenty years, and which neither of you lights.'),
    q('Sloane', 'She’ll keep her word until it costs her more to keep it than to break it. You know that.'),
    q('You', 'I know. I only need it to last until the board meets.'),
    p('She looks out at the water for a while.'),
    q('Sloane', 'I built you. I thought I did. I signed the pages. And you walked into that room and did something I would never have had the nerve to do in twenty years in the service.'),
    q('Sloane', 'That was the defect, wasn’t it. That was what ORACLE saw. Not that you would slip. That you would turn round.'),
    p('She gives you the unlit cigarette, and walks away towards the bridge without saying goodbye, and you stand there holding it until she is out of sight.'),
    ...(getKey(s, 'act3.maya-status') === 'withdrawn' ? [q('Maya · message', 'My lawyer just rang. On a SUNDAY. They’re withdrawing it. All of it. What did you DO?')] : []),
  ];
}

function eveningInvite14(partner: Partner14, s: GameState): Block[] {
  const refused = get14(s, 'answer') === 'refused';
  if (partner === 'julian')
    return refused
      ? [
          p('Julian answers on the first ring, and does not ask a single question, and sends a car to the hotel that isn’t Meridian’s, with a driver who has worked for him for twenty years.'),
          q('Julian Mercer', 'You can have the spare room, or you can have me. Or you can have a bath and a whisky and no conversation at all. Tell me what you want, and that’s what happens.'),
        ]
      : [
          p('Julian is on the embankment when you turn round, collar up, as if he had simply been walking by, which he has not.'),
          q('Julian Mercer', 'I heard there was a meeting at the Vesper on a Sunday. There is never a meeting at the Vesper on a Sunday. Come home with me. Tell me what you want tonight, and that’s what happens.'),
        ];
  if (partner === 'theo')
    return [
      p('Theo sends a message: “I have a bottle of something a cabinet minister gave me and nobody to not ask questions to. Studio flat. Door’s open.”'),
      q('Theo Marr', 'No cameras. No questions. Tell me what you want tonight.'),
    ];
  if (partner === 'sebastian')
    return [
      p('Sebastian is back from the tour, his message says, for three nights, in a hotel with a piano in the lobby that nobody is allowed to play.'),
      q('Sebastian', 'Come and stop me playing it. Or don’t. Whatever you want tonight. Nobody gets to buy any of it.'),
    ];
  return [
    p('There is a message from a number on a Claremont coaster, in the careful hand of a man who writes everything down.'),
    q('Owen Marsh', 'I don’t know what you did today. I know something happened, because I’ve had three calls from people who have never rung me before. I have a very small flat in Kennington, and a very good bottle, and I would like to see you when nobody is filming. Only if you want to.'),
    ...(refused ? [q('Owen Marsh', 'And I have a sofa, if what you need tonight is a sofa. That’s a whole answer too.')] : []),
  ];
}
const scopeReply14: Record<Partner14, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that is the night. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  theo: { 'no-sex': 'Then that’s what we do. I’m very good at wanting things I don’t get.', sex: 'Yes. And the moment you want to stop, we stop.' },
  sebastian: { 'no-sex': 'Good. I would like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
  marsh: { 'no-sex': 'Good. I would like that more than I can tell you. You say stop and I stop. That’s the whole rule.', sex: 'Yes. Is this all right? I am going to keep asking. I’ve got into the habit.' },
};
const stay14: Record<Partner14, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the glass with the whole city behind you and stops exactly where you tell him to, and holds you there for a long time, his hand warm on your bare back, until the day goes out of you.')],
    sex: [
      p('He undresses you slowly by the window and tells you, while he does it, exactly what he thought the first time he saw you, and asks once more with his mouth at your shoulder. You answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays on the forty-first floor. The scene fades.'),
    ],
  },
  theo: {
    'no-sex': [p('He kisses you slowly on the sofa with the minister’s bottle between your feet, and when you tell him where tonight stops he says “good” and means it, and you fall asleep with your head on his shoulder and his glasses still on.')],
    sex: [
      p('For once he says nothing clever at all. Underneath the charm is somebody hungrier and less sure of himself, which you like better. He asks once more, low. You answer by pulling him down with you.'),
      p('What happens next is yours and his, and it stays above the studio. The scene fades.'),
    ],
  },
  sebastian: {
    'no-sex': [p('He undoes your dress slowly and says out loud what he likes about what he finds, and stays exactly on his side of the line you drew, and afterwards plays the lobby piano very quietly at two in the morning until the night porter gives up and applauds.')],
    sex: [
      p('He undoes your dress slowly and says out loud what he likes. The lamp stays on. When he asks once more whether you are sure, you answer by drawing him down with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
  },
  marsh: {
    'no-sex': [p('He kisses you in his tiny kitchen, next to a bicycle hanging on the wall, carefully, as if he were afraid you might be taken away for evidence, and stops exactly where you say, and makes you toast at one in the morning, and it is the best toast you have ever eaten.')],
    sex: [
      p('In the flat in Kennington, with the bicycle on the wall and a thousand pages of his inquiry stacked on every chair, he kisses you slowly, the way he did in 1109, except that there is no mirror, and nobody is watching, and neither of you is acting. He asks once more, off no microphone at all. You answer by pulling him down with you.'),
      p('What happens next is yours and his, and for once nobody is filming it. The scene fades.'),
    ],
  },
};

function afterChoices(s: GameState): C14Choice[] {
  const open = get14(s, 'evening-open');
  if (open) {
    const partner = open.replace('-room', '') as Partner14;
    if (!open.endsWith('-room')) {
      const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
        offer14(`evening-${partner}-${id}`, label, hint, 'after', (x) => {
          set14(x, 'evening-open', partner + '-room');
          set14(x, 'evening-scope', id);
          note14(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who14[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(who14[partner], scopeReply14[partner][id])];
        });
      return [
        scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
        scope('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
        offer14('evening-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
          delete x.choices['c14.evening-open'];
          set14(x, 'evening-outcome', 'declined');
          return [p('You say goodnight and mean it, and he lets you go without a word of argument, and it is exactly what you wanted.')];
        }),
      ];
    }
    const scope = get14(s, 'evening-scope') as 'no-sex' | 'sex';
    return [
      offer14('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c14.evening-open'];
        set14(x, 'evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once.'), p('He makes up the sofa, or the spare room, or simply sits up with you, and does not ask for anything, and you are more grateful for that than for anything else today.')];
      }),
      offer14('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c14.evening-open'];
        set14(x, 'evening-outcome', 'intimate-' + scope);
        return [...stay14[partner][scope], p('For one night nobody owns any of it. You made sure of that.')];
      }),
    ];
  }
  return [
    ...eveningPartners14(s).map((partner) =>
      offer14('evening-' + partner, `Go to ${name14[partner]}`, get14(s, 'answer') === 'refused' ? 'Somewhere with a lock on the door, and someone you chose.' : 'A night you choose, after a weekend of being chosen.', 'after', (x) => {
        set14(x, 'evening', partner);
        set14(x, 'evening-open', partner);
        return eveningInvite14(partner, x);
      }),
    ),
    offer14('after-alone', 'Be alone tonight', 'Chapter 14 ends here.', 'complete'),
  ];
}

// ── The Board ──

function completeBlocks(s: GameState): Block[] {
  const answer = get14(s, 'answer');
  return [
    p(
      answer === 'refused'
        ? 'On the hotel notepad, under the kettle, you write the card you would have pinned to the wall if you still had a wall.'
        : 'On Monday morning you take a new card from the drawer and pin it to the wall, at the top, above everything else.',
    ),
    q('The card', 'THE BOARD MEETS. THE FIRST THURSDAY.'),
    p(
      answer === 'countered'
        ? 'Sloane told you on the embankment: the Meridian board sits at the Vesper on the first Thursday of next month, and Celeste will have to stand up in front of it and explain one page.'
        : answer === 'complied'
          ? 'Celeste told you herself, as you left, as a kindness: the board sits on the first Thursday of next month, and you will be wanted there. She did not say for what.'
          : 'Sloane’s second message, at three in the morning: the board sits on the first Thursday of next month, and your name is on the agenda. Not Evelyn’s. The other one.',
    ),
    t(
      answer === 'countered'
        ? 'She was afraid. Only for a sentence. I am going to live in that sentence until the board meets.'
        : answer === 'complied'
          ? 'She read her own name twice. I saw it. I handed her the woman who showed it to me.'
          : 'They took the flat. They can have it. It was hers. Everything else I am taking with me.',
    ),
  ];
}

// ── Blocks and choices ──

export function chapter14Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter14') return [];
  if (s.phase === 'door') return doorBlocks(s);
  if (s.phase === 'order') return orderBlocks(s);
  if (s.phase === 'maya') return mayaBlocks(s);
  if (s.phase === 'answer') return answerBlocks(s);
  if (s.phase === 'sunday') return sundayBlocks(s);
  if (s.phase === 'after') return afterBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function chapter14Choices(s: GameState): C14Choice[] {
  if (!chapter14Playable(s)) return [];
  if (s.scene === 'chapter13' && s.phase === 'complete' && ownPower(s))
    return [offer14('begin', 'Let her in', 'Sloane, on your landing, asking.', 'door')];
  if (s.scene !== 'chapter14') return [];
  if (s.phase === 'door') return doorChoices(s);
  if (s.phase === 'order') return orderChoices();
  if (s.phase === 'maya') return mayaChoices(s);
  if (s.phase === 'answer') return answerChoices(s);
  if (s.phase === 'sunday') return sundayChoices(s);
  if (s.phase === 'after') return afterChoices(s);
  return [];
}

export function applyChapter14Choice(state: GameState, id: string): GameState {
  const choice = chapter14Choices(state).find((x) => x.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter14';
  s.phase = choice.next;
  s.feedback = '';
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter14.${s.phase}` as NodeId, blocks: chapter14Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER14_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
