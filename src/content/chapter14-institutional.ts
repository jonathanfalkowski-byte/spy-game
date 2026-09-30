/** Chapter 14 (Institutional route, lane id `institutional`) · Officer of Record:
 * notice → confession → wire → channels → hearing → dusk → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_14_OFFICER_OF_RECORD_DESIGN.md (owner-approved 2026-09-30, all eight decisions
 * as recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_14_SCRIPT.md. Route: docs/story/INSTITUTIONAL_ROUTE_DESIGN.md.
 * Entered through an interim bridge from an Institutional `chapter9.complete` until Institutional Chapters 10–13 exist
 * (their keys read at defaults). An internal inquiry into the Project Eve procurement, run from Maya's compliance wing;
 * Sloane suspended, the grey envelopes stopped, the backup number ringing out. Sloane's confession across her own sealed
 * desk (hear / hold / shut: act3.sloane truce | held | shut, c14.file). Celeste's last order: give the inquiry Victoria;
 * Adrian Vale's name is the threat. Maya across a glass table (on / off / nothing: c14.maya-room). The three ways
 * (inst.way14): the bounded ally (countered; Sloane reinstated and owing; Benton exposed as Meridian's man inside Axiom,
 * with the PROJECT EVE (I) file in his drawer if she found the empty box), the proof ("I am Project Eve"; refused; Adrian's
 * name spent by her own hand; the flat lost), or cut her loose (complied; Sloane resigns; Benton her handler). Writes the
 * shared Act III keys Chapter 15 reads. A chosen evening (Daniel only if he knows; the consent flow; at his place).
 * Sloane is never a romance; nothing here is sexual coercion. Keys under `inst.*`, `act3.*`, `c14.*`; ids carry `i14-`.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. In the sealed office, before the choice about
 * Sloane (c14.i-office = water | desk | door: pour her the glass of water she is not allowed to touch; sit on the edge
 * of her desk, close, in the one place she can't ask you to leave; or stay by the door). Thursday night, the eve of the
 * hearing (c14.i-eve = mirror | sloane | sleep: rehearse the way at the wardrobe mirror, in its own words; Sloane's
 * forbidden call, on the ally way only; or sleep). The corridor on Level 12 afterwards (c14.i-corridor = sloane |
 * benton | walk: one look and one line from Sloane, by the way; Benton's; or walk straight to the lift). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

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

export const INSTITUTIONAL_PHASES14 = ['notice', 'confession', 'wire', 'channels', 'hearing', 'dusk'] as const;
export const isInstitutional14 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase14 = (s: GameState) => isInstitutional14(s) && ((INSTITUTIONAL_PHASES14 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const scope = (s: GameState, id: string) => !!key(s, 'inst.scope.' + id);
const told = (s: GameState) => !!key(s, 'inst.daniel-told');
const way = (s: GameState) => key(s, 'inst.way14') as 'ally' | 'proof' | 'cut' | undefined;
/** The bounded ally needs Sloane heard or held, and something to put on the record. */
export const allyOpen14 = (s: GameState) =>
  ['truce', 'held'].includes(key(s, 'act3.sloane') ?? '') && (get14(s, 'file') === 'yes' || ['copy', 'note'].includes(key(s, 'inst.file') ?? '') || key(s, 'c6.oracle-seen') === 'yes');
type Partner = 'julian' | 'sebastian' | 'daniel';
const partners = (s: GameState): Partner[] => [
  ...(told(s) ? (['daniel'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian', daniel: 'Daniel' };

export function placeInstitutional14(s: GameState): string | undefined {
  if (s.phase === 'channels' && get14(s, 'maya-room')) return 'Wednesday · Compliance, the glass room';
  const open = get14(s, 'i-evening-open');
  if (s.phase === 'dusk' && open) return open.startsWith('daniel') ? 'Late · Daniel’s flat, above the launderette' : open.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
}

// ── The entry ──

export function beginInstitutional14(s: GameState): C14Choice {
  return offer('begin-institutional', 'Go on to the inquiry', 'This road’s Act III chapters are in development.', 'notice', () => [
    p((s.scene === 'chapter11' ? '[Chapters 12–13 · institutional road — in development] Singapore, her city, on an Axiom tasking. The first Thursday of the next month, and a placement. ' : s.scene === 'chapter10' ? '[Chapters 11–13 · institutional road — in development] The Vesper, the first Thursday, with Axiom’s card in Sloane’s hand. ' : '[Chapters 10–13 · institutional road — in development] ') + 'The winter comes to Axiom the way it always did: the heating late, the coffee machine worse, the grey envelopes every Monday. Celeste Laurent’s name, which you found at the end of the bridge, sits on the card beside MERIDIAN on your wardrobe door. The ORACLE page. The empty box. A man under a street lamp who has not come back. And the black phone, which rings on Fridays.'),
  ]);
}

// ── The notice ──

function noticeBlocks(): Block[] {
  return [
    p('Monday, five past eight. The floor goes quiet the way a room goes quiet when somebody has died in it, which is to say all at once, and then everybody talks very softly about something else.'),
    p('An all-staff notice, on every screen, in the grey typeface Axiom keeps for the things it would rather not say: a formal inquiry into the procurement of PROJECT EVE, to be led by Compliance (M. Reyes). The officer of record, V. Sloane, Director of Executive Intelligence, is suspended pending its findings.'),
    p('There is no grey envelope on your desk. You ring the backup number. It rings out.'),
    t('For the first time since Level 71, I have no handler. I did not expect that to feel like falling.'),
  ];
}

function noticeChoices(s: GameState): C14Choice[] {
  const n = (id: 'maya' | 'daniel' | 'screen', label: string, hint: string, body: Block[]) =>
    offer('i14-notice-' + id, label, hint, 'confession', (x) => {
      set14(x, 'i-notice', id);
      return body;
    });
  return [
    n('maya', 'The stairwell', 'Maya, thirty seconds, off the record.', [
      p('Maya catches you on the back stairs between forty-four and forty-three, where the cameras have never worked, and holds your arm for exactly thirty seconds.'),
      q('Maya', 'I asked for this file. Nobody gave me you. I’m going to run it straight, and that means I can’t help you, and you can’t help me, and I need you to know I hate it.'),
      p('Then she lets go, and goes up, and you go down, and neither of you looks back.'),
    ]),
    n('daniel', 'Daniel, over your shoulder', 'He reads it before you do.', [
      p('Daniel reads it over your shoulder, one hand on the back of your chair, and does not take the hand away.'),
      q('Daniel', told(s) ? 'Your handler. Adrian’s — your — God. Are you all right?' : 'Your handler. Are you all right? You look like somebody just pulled a floor out.'),
    ]),
    n('screen', 'The screen', 'Read it twice. Alone.', [p('You read it twice, alone, and then close it, and sit with your hands flat on Adrian’s desk, or yours, until the floor starts talking about something else.')]),
  ];
}

// ── The confession ──

function confessionBlocks(s: GameState): Block[] {
  return [
    p('Monday, ten at night. Level 71. There is tape across Sloane’s door, yellow, with COMPLIANCE printed on it, and you step over it, and she is inside, in graphite, sitting behind her own desk with her hands folded on it, because she is not allowed to touch anything in the room, including the desk.'),
    q('Sloane', 'They let me come up and look at it. Once. I thought you might come. You always did walk in.'),
    ...(key(s, 'inst.car') === 'press' ? [p('She says it the way she said it in the car, with the reading light on: as if you had never stopped talking.')] : []),
    q('Sloane', 'Project Eve came to Axiom from Meridian, as a product. A legend with a life already lived in it, and a candidate to fit. I was the officer of record. It came with ORACLE’s verdict already on it: willing, and not controllable. I raised it. I was told it was a known characteristic of the product, and priced in.'),
    q('Sloane', 'I understood too late that a slipping asset that stays useful is a better product than a controlled one. And that if it slipped far enough, Meridian would have an officer to blame. Me. I didn’t know about the placements. I didn’t know about the first one until the week I met you.'),
    p('She takes a single sheet out of the inside of her jacket, the one place in the room that is still hers, and puts it on the desk between you: the ORACLE verdict, with the board’s sign-off at the bottom, and three signatures. One of them is C. Laurent’s.'),
    ...(key(s, 'inst.file') === 'note' ? [q('Sloane', 'And you have the delivery note. I counted the pages in the car. I’m glad it was you.')] : []),
    ...(key(s, 'inst.pen11') === 'signed' ? [q('Sloane', 'And I signed 9C. In her house. Because you brought it. I’ll carry that one myself.')] : []),
    ...(s.mission.source === 'benton' ? [q('Sloane', 'You guessed Benton, once. You were right. You are about to find out how right.')] : []),
  ];
}

function officeChoices(): C14Choice[] {
  const o = (id: 'water' | 'desk' | 'door', label: string, hint: string, body: Block[]) =>
    offer('i14-office-' + id, label, hint, 'confession', (x) => {
      set14(x, 'i-office', id);
      return body;
    });
  return [
    o('water', 'Pour her a glass of water', 'From the carafe she isn’t allowed to touch.', [
      p('There is a carafe on the side table, and a glass, and she has been sitting here an hour not touching either, because the tape says she mayn’t. You pour her a glass of water and put it in front of her, on the desk, by her folded hands.'),
      p('She looks at it for a long moment, as if it were a document. Then she drinks it, all of it, without taking her eyes off you, and puts the glass down exactly where you put it.'),
      q('Sloane', 'Thank you. Nobody has given me anything in this building for eleven years that wasn’t a file.'),
    ]),
    o('desk', 'Sit on the edge of her desk', 'Close. The one place she can’t ask you to leave.', [
      p('You don’t take the chair. You sit on the edge of her desk, her side of it, close enough to see the one grey hair she has let stay and the place at her collar where the graphite has worn soft, in the one place in the room she cannot ask you to leave, because she is not allowed to touch anything, including you.'),
      p('She looks up at you, and neither of you says anything, and the silence goes on a count of three past where it should.'),
      q('Sloane', 'You’ve become very difficult to supervise.'),
      q('You', 'You said you’d rather know where I am.'),
      q('Sloane', 'I did. I do. Right now I know exactly where you are.'),
    ]),
    o('door', 'Stay by the door', 'Hear it from there.', [p('You stay by the door, on the right side of the tape, with your coat on, and let her say it to you across the room. She doesn’t seem to mind. She says it to the window, mostly.')]),
  ];
}

function confessionChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'i-office')) return officeChoices();
  const c = (id: 'hear' | 'hold' | 'shut', label: string, hint: string, sloane: string, file: boolean, body: Block[]) =>
    offer('i14-sloane-' + id, label, hint, 'wire', (x) => {
      setKey(x, 'act3.sloane', sloane);
      if (file) {
        set14(x, 'file', 'yes');
        note(x, 'verdict', 'The ORACLE assessment of Project Eve (voluntary adoption: high; durable control: low), with the Meridian board’s sign-off approving the sale to Axiom anyway. One of three signatures is C. Laurent’s.', 'Victoria Sloane’s own copy, on her sealed desk');
      }
      return body;
    });
  return [
    c('hear', 'Hear her out', 'Take the sheet. A truce, this week.', 'truce', true, [q('You', 'All right. This week. Nothing more.'), p('You take the sheet. She watches it go into your coat and lets out a breath she seems to have been holding since the spring.'), q('Sloane', 'This week will do.')]),
    c('hold', 'Hold ORACLE over her', '“You’ll sign for the truth now.”', 'held', true, [q('You', 'You read that I’d slip, and you signed for me anyway. You’ll sign for the truth now. On the record. When I ask.'), p('A long, level look across the desk she can’t touch. Then she pushes the sheet an inch towards you with one finger.'), q('Sloane', 'Yes. That’s fair. I’d have done the same, and worse.')]),
    c('shut', 'Shut her out', 'Take nothing from the woman who built the cage.', 'shut', false, [q('You', 'Keep it. It’s yours. It always was.'), p('You leave the sheet on the desk and step back over the tape, and she does not call after you. In the lift you find your hands are shaking, and you do not know whether it is anger or something worse.')]),
  ];
}

// ── The wire ──

function wireBlocks(s: GameState): Block[] {
  return [
    p('Tuesday. The black phone, at nine in the morning, which is early for her.'),
    ...(key(s, 'inst.log10') ? [q('C.', 'I told you at breakfast, darling. A very good officer. They never survive us.')] : []),
    q('C.', 'Poor Victoria. They will want a name, darling, and hers is on everything. Tell the inquiry she knew about the placements. She didn’t, of course, but nobody will believe that of an officer of record. You’ll have her chair by Christmas.'),
    q('C.', 'And if you won’t, then on Friday Adrian Vale’s name goes to the inquiry, and the regulator, and a man at the Courier who has been very patient. Axiom will have no choice but to disown its operative. And I’m afraid the flat was always mine.'),
  ];
}

function wireChoices(): C14Choice[] {
  const w = (id: 'yes' | 'no' | 'silent', label: string, hint: string, body: Block[]) =>
    offer('i14-wire-' + id, label, hint, 'channels', (x) => {
      set14(x, 'i-wire', id);
      return body;
    });
  return [
    w('yes', '“Of course.”', 'Let her think so. For now.', [q('You', 'Of course.'), q('C.', 'Good girl. I knew you’d understand.'), t('She has never once heard me lie. She has heard me do nothing else.')]),
    w('no', '“No.”', 'Say it now.', [q('You', 'No.'), p('A pause on the line, long enough to hear the Vesper’s clocks behind her.'), q('C.', 'Friday, then. I do hope you know what you’re doing, darling. So few people do.')]),
    w('silent', 'Say nothing', 'Let her talk to the dial tone.', [p('You say nothing at all, and let her listen to your breathing, and after a while she laughs, softly, and hangs up first.')]),
  ];
}

// ── Channels ──

function channelsBlocks(s: GameState): Block[] {
  return [
    p('Wednesday. Compliance, a glass room on forty with the blinds half down, a table, two chairs and a small grey recorder. Maya sits on the far side of it in her navy suit with the cuffs turned back, and switches the recorder on in front of you, so that you can see her do it.'),
    ...(scope(s, 'people')
      ? [q('Maya', 'Before you say anything. Nobody gave me you, and nobody can give you me. It’s in your contract, and I read it. I asked for this file myself. That’s the only reason I’m sitting here.')]
      : [q('Maya', 'Before you say anything. I asked for this file myself. Nobody gave me you. That’s the only reason I’m sitting here.')]),
    q('Maya', 'Interview with operative AX-7A, in the matter of the procurement of Project Eve. Wednesday. Ten past ten.'),
  ];
}

function channelsChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'maya-room')) {
    const m = (id: 'on' | 'off' | 'nothing', label: string, hint: string, body: Block[]) =>
      offer('i14-maya-' + id, label, hint, 'channels', (x) => {
        set14(x, 'maya-room', id);
        return [...body, p('Then there is the question of Friday, and how you mean to walk into that room.')];
      });
    return [
      m('on', 'On the record', 'Tell her the truth into the machine.', [p('You tell her the truth into the recorder: the file, the vendor, the verdict, the order on the black phone. All of it, flatly, in order, the way Adrian used to write a report. Maya writes nothing down. She doesn’t need to. She is listening the way she listened for ten years, and at the end she switches the recorder off and sits for a moment with her hand on it.'), q('Maya', 'Thank you. That’s the first straight thing anybody has said to me in this inquiry.')]),
      m('off', '“Switch it off.”', 'Thirty seconds.', [q('You', 'Switch it off.'), p('She looks at you, and at the recorder, and does, once.'), q('Maya', 'Thirty seconds.'), q('You', 'Whatever I do on Friday, I’m doing it on purpose. Don’t try to save me from it.'), p('She switches it back on at twenty-eight, and says “Resuming,” in a voice that is almost steady.')]),
      m('nothing', 'Answer only what she asks', 'The way Adrian was trained.', [p('You answer only what she asks, in as few words as the questions allow, the way Adrian was trained to sit an inquiry, and she asks the right things, the way she was trained, and for an hour two old friends are perfectly, painfully professional.')]),
    ];
  }
  const wy = (id: 'ally' | 'proof' | 'cut', label: string, hint: string, answer: string, body: (x: GameState) => Block[]) =>
    offer('i14-way-' + id, label, hint, 'hearing', (x) => {
      setKey(x, 'inst.way14', id);
      set14(x, 'answer', answer);
      if (id === 'ally') {
        setKey(x, 'act3.sloane', 'allied');
        setKey(x, 'act3.celeste-afraid', 'yes');
        setKey(x, 'act3.terms', 'agreed');
        setKey(x, 'inst.authority', 'formal');
        if (key(x, 'c8.i-dark') === 'torch') setKey(x, 'inst.benton-exposed');
      } else if (id === 'proof') {
        setKey(x, 'act3.sloane', 'handed');
        setKey(x, 'act3.adrian-burned', 'yes');
        setKey(x, 'act3.home', 'lost');
        setKey(x, 'inst.authority', 'regulator');
      } else {
        setKey(x, 'act3.sloane', 'shut');
        setKey(x, 'inst.authority', 'benton');
      }
      return body(x);
    });
  return [
    ...(allyOpen14(s)
      ? [wy('ally', 'The bounded ally', 'Sloane testifies. You put the verdict on the record. Through the channel.', 'countered', () => [p('You go up to seventy-one that night, over the tape, and tell Sloane what she will say on Friday, and what you will put in front of Maya, and in what order. She listens to all of it without interrupting, which she has never done for anybody.'), q('Sloane', 'You’re running me.'), q('You', 'I’m running us. Bounded. After Friday we’re square, or we aren’t.')])]
      : []),
    wy('proof', 'The proof', 'Yourself. “I am Project Eve.”', 'refused', () => [t('If Adrian’s name is going to be spent on Friday, it is going to be spent by me, in that room, for something. Not by her, on the phone, for nothing.')]),
    wy('cut', 'Cut her loose', 'Give the inquiry what Celeste asked for.', 'complied', () => [t('Victoria built the cage. Let her live in it. The chair on seventy-one has a very good view.')]),
  ];
}

// ── The hearing ──

function hearingBlocks(): Block[] {
  return [
    p('Thursday night. The eve of it. The flat is quiet in the way it has been quiet since the notice: the green light steady in the hall, the grey envelopes gone, the black phone face down on the counter.'),
    t('Tomorrow at ten, in a room with a recorder in it, I find out what I am to this building. I would like to be the one who says it.'),
  ];
}

function eveChoices(s: GameState): C14Choice[] {
  const w = way(s);
  const e = (id: 'mirror' | 'sloane' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('i14-eve-' + id, label, hint, 'hearing', (x) => {
      set14(x, 'i-eve', id);
      return [...body, ...fridayBlocks(x)];
    });
  return [
    e('mirror', 'Rehearse at the mirror', 'Say it out loud. In order.', [
      p('You stand at the wardrobe mirror with the cards behind you, and say it out loud, in order, the way Adrian used to rehearse a briefing to an empty room.'),
      ...(w === 'ally'
        ? [p('The verdict first. Then the file. Then the note. Then the question for the directorate’s witness. You say it until the order is in your hands and not your head.')]
        : w === 'proof'
          ? [q('You', 'I am Project Eve.'), p('The woman in the mirror says it back to you. You say it again, and the second time your voice does not shake, and the third time you believe it, and the fourth time you are proud of it.')]
          : [q('You', 'She knew.'), p('You say it to the mirror until it sounds like the truth. It takes nine times. The woman in the mirror looks as if she has done something unforgivable, and then, at the ninth, as if she has done nothing at all, which is worse.')]),
    ]),
    ...(w === 'ally'
      ? [
          e('sloane', 'Answer the unknown number', 'It isn’t unknown. It’s her, on a phone she shouldn’t have.', [
            p('At eleven your phone rings from a number you don’t know, and it is Sloane, on a phone a suspended officer should not have, from somewhere with traffic outside.'),
            q('Sloane', 'I’m not calling. This call isn’t happening. I wanted to hear you say it’s still tomorrow.'),
            q('You', 'It’s still tomorrow.'),
            p('Neither of you hangs up for a long time. Neither of you says anything else. You listen to her breathing and the traffic, and she listens to yours, and it is the most she has ever let anybody hear.'),
          ]),
        ]
      : []),
    e('sleep', 'Sleep', 'You’ll need it.', [p('You go to bed at ten, like a sensible person, and to your considerable surprise you sleep.')]),
  ];
}

function fridayBlocks(s: GameState): Block[] {
  const w = way(s);
  const opening: Block[] = [
    p('Friday, ten o’clock. The inquiry room on Level 12: a long table, a window with the blinds half down, a grey recorder, and a jug of water nobody touches. Maya in the chair. Sloane at the far end of the table, in graphite, alone. Benton to her right as the directorate’s witness, with his little slate. And, called about “the analyst who sat at that desk”, Daniel, in his worst tie, looking at nobody.'),
  ];
  if (w === 'ally')
    return [
      ...opening,
      p('Sloane speaks first, in order, without self-pity: the product, the verdict, the phrase “priced in”, the name of the man who used it. Then Maya turns to you, and you put three things on the table in front of the recorder, one at a time, through the proper channel, in triplicate: the ORACLE verdict with the board’s three signatures; the procurement file; and, if you have it, the delivery note, LEGEND E.V. (II), PRIOR INSTANCE RETIRED.'),
      q('Maya', 'Entered. The vendor knew.'),
      ...(key(s, 'inst.benton-exposed')
        ? [
            q('You', 'One more question, for the directorate’s witness. Director Benton, where is the PROJECT EVE (I) file? The box in Records is empty. Somebody took it the week I arrived.'),
            p('Benton does not answer. He looks at his slate, as if the answer might be on it, and then at Maya, and something in his face gives way, very slightly, the way a building settles.'),
            p('Maya sends two people from her wing to his office. They come back in eleven minutes with a grey file with a clinic’s crest from his locked drawer, and put it on the table, and nobody in the room says anything at all.'),
            t('Meridian’s man inside Axiom. Since before the Glass House. He read my old name three times for them. He took hers.'),
          ]
        : []),
      p('The inquiry rises at noon. Sloane is reinstated by five, bounded: she owes you, and both of you know it, and neither of you will ever say so in a room with a recorder in it.'),
    ];
  if (w === 'proof')
    return [
      ...opening,
      p('When Maya asks whether the operative has anything to add, you stand up, which nobody does in an inquiry, and put both hands flat on the table.'),
      q('You', 'For the record. I am Project Eve. I was Adrian Vale, senior analyst, Strategic Intelligence, eleven years, the desk fourth from the end. Ask me what the vendor sold you. I was there.'),
      p('The recorder turns. Sloane closes her eyes. Benton’s slate slips an inch against his chest.'),
      ...(told(s)
        ? [q('Maya', 'Mr Kessler. You worked beside Adrian Vale for four years. Is this him?'), p('Daniel looks at you for a long time across the table, all of you, the way he looked at the coffee machine the morning you kicked it.'), q('Daniel', 'Yes. That’s him.')]
        : [q('Maya', 'Mr Kessler. You worked beside Adrian Vale for four years. Is this him?'), p('Daniel looks at you for a long time, frowning, as if trying to remember a word.'), q('Daniel', 'I can’t be sure. I — I don’t know. I don’t know why I want to say yes.')]),
      p('By Friday night Adrian Vale’s name is with the inquiry, the regulator and Axiom’s board, by your hand, before Celeste could send it anywhere. Sloane is cleared by your testimony whether she likes it or not. Axiom keeps you, known, as its witness, not its operative. On Saturday there is a new lock on the flat.'),
    ];
  return [
    ...opening,
    p('When Maya asks the operative whether the officer of record knew of any placements, you say yes. You say it clearly, for the recorder, the way Celeste asked.'),
    p('Sloane does not look at you once. When you have finished, she stands, and says to Maya that she will save the inquiry its time, and puts a single typed sheet on the table: her resignation, dated this morning, as if she had known.'),
    p('Benton, beside her, does not smile. He does not need to. By Monday he is your handler of record, and the grey envelopes start again, in a different hand.'),
    q('C.', 'You see? Nobody had to be unkind.'),
  ];
}

function hearingChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'i-eve')) return eveChoices(s);
  const w = way(s);
  const c = (id: 'sloane' | 'benton' | 'walk', label: string, hint: string, body: Block[]) =>
    offer('i14-corridor-' + id, label, hint, 'dusk', (x) => {
      set14(x, 'i-corridor', id);
      return body;
    });
  return [
    c('sloane', 'Look at Sloane', 'In the corridor, as she passes.', [
      p('In the corridor on Level 12 she passes you, close, going the other way.'),
      ...(w === 'ally'
        ? [q('Sloane', 'Square.'), p('She says it without stopping, and it is the warmest thing you have ever heard from her.')]
        : w === 'proof'
          ? [q('Sloane', 'You didn’t have to do that for me.'), q('You', 'I didn’t.'), p('She almost smiles. It is the first time you have ever seen her not know what to say.')]
          : [p('She does not look at you. She walks past you with her resignation still in her hand and her eyes on the lift, and you understand that she will never look at you again, and that you will spend a long time wishing she would.')]),
    ]),
    c('benton', 'Look at Benton', 'Let him see you looking.', [
      p(key(s, 'inst.benton-exposed') ? 'Benton is walked past you by two people from Maya’s wing, not touching him, one on each side. He stops, and looks at you, and for the first time there is no slate against his chest.' : 'Benton comes out last, with his slate, and stops beside you, and looks at your face for a long time, the way he did at his door on your first morning.'),
      q('Benton', key(s, 'inst.benton-exposed') ? 'You were always the better analyst. I told them so. They should have listened.' : w === 'cut' ? 'Monday, then, Ms Vale. My office. We’ll discuss your development.' : 'Well played. I hope you know who you’ve just made an enemy of. It isn’t me.'),
    ]),
    c('walk', 'Walk straight to the lift', 'Don’t look back.', [p('You walk straight to the lift and do not look back, and the doors close on Level 12, and in the steel a woman in black looks at you as if she has every right to be here, which, as of today, she does.')]),
  ];
}

// ── Dusk ──

function duskBlocks(s: GameState): Block[] {
  return [p(way(s) === 'proof' ? 'Friday night, in a hotel under a name you make up at the desk, with everything you own in two bags.' : 'Friday night. The floor empties early. Nobody quite knows what to say to you, so nobody says anything.')];
}

function duskChoices(s: GameState): C14Choice[] {
  const open = get14(s, 'i-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i14-evening-' + id, label, hint, 'complete', (x) => {
      set14(x, 'i-evening', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('i14-' + pt + '-' + id, label, hint, 'dusk', (x) => {
        set14(x, 'i-evening-open', pt + '-room');
        set14(x, 'i-evening-scope', id);
        note(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? (pt === 'daniel' ? 'Yes. I know exactly who you are. That’s the point. And you say stop, it stops.' : 'Yes. And you say stop, it stops. The same for me.') : 'Then that’s tonight. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('i14-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c14.i-evening-open'];
        set14(x, 'i-evening-outcome', 'declined');
        return [p('You say goodnight at his door, and mean it, and he lets you go without a question.')];
      }),
    ];
  }
  if (open) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get14(s, 'i-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('i14-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c14.i-evening-open'];
        set14(x, 'i-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead.')];
      }),
      offer('i14-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c14.i-evening-open'];
        set14(x, 'i-evening-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p(pt === 'daniel' ? 'He kisses you as if he has been thinking about how for four years and six weeks, and says your name, the one you gave him, not the one on the badge, and asks once more. You answer by pulling him down with you.' : 'He kisses you, and then not only that. He asks once more, low, at your shoulder, and you answer by pulling him down with you.'), p('What happens next is yours and his. The scene fades.')]
          : [p(pt === 'daniel' ? 'He kisses you by the window of the flat above the launderette, carefully, as if you might still turn into somebody else, and stops exactly where you said, and you stand there together a long time with the dryers turning over downstairs.' : 'He kisses you by the window and stops exactly where you said, and holds you there a long time, until the week goes quiet.')];
      }),
    ];
  }
  return [
    ...partners(s).map((pt) =>
      offer('i14-evening-' + pt, pt === 'daniel' ? 'Daniel' : pt === 'julian' ? 'Julian' : 'Sebastian', pt === 'daniel' ? 'He knows exactly who you are.' : 'His place.', 'dusk', (x) => {
        set14(x, 'i-evening', pt);
        set14(x, 'i-evening-open', pt);
        return pt === 'daniel'
          ? [p('Daniel’s flat above the launderette, which smells of clean washing and toast, with a sofa that has seen better decades and a view of a bus stop.'), q('Daniel', way(x) === 'proof' ? 'You said it. In that room. I’ve never seen anybody do anything like it. Tell me what you want tonight. I’ll take you at your word, whichever name it’s in.' : 'I’ve had my day. I’ve had about forty days, actually. Tell me what you want tonight.')]
          : [q(partnerName[pt], 'I heard. Some of it. Come in. Tell me what you want tonight, and that’s what happens.')];
      }),
    ),
    ...(key(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Maya, off the record', 'At last.', [p('Maya, in her kitchen, with no recorder anywhere, a bottle between you and the cat on the report she is supposed to be writing.'), q('Maya', 'For the record, which this isn’t: you were magnificent. And I’m going to have to put that in writing without using the word.')])]
      : []),
    done('alone', 'Alone', 'Let the week go quiet.', [p('You sit in the dark by the window, and let the week go quiet around you, and for once nobody is on the other end of any phone.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const w = way(s);
  return [
    ...(get14(s, 'i-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn. Nobody logged it. Nobody could.')] : []),
    p('The wardrobe door. A third card, in capitals.'),
    q('The card', w === 'ally' ? 'OFFICER OF RECORD: CLEARED. SHE OWES ME.' : w === 'proof' ? 'OFFICER OF RECORD: CLEARED. I SAID IT MYSELF.' : 'OFFICER OF RECORD: RESIGNED. BENTON ABOVE ME.'),
    ...(key(s, 'inst.benton-exposed') ? [p('And under it: BENTON = MERIDIAN. E.V. (I) FOUND.')] : []),
    p('And under that, the next line, which is the Vesper:'),
    q('The card', w === 'ally' ? 'THE VESPER · WITH AXIOM’S AUTHORITY.' : w === 'proof' ? 'THE VESPER · WITHOUT IT. THE REGULATOR IS WATCHING.' : 'THE VESPER · WITH AXIOM’S AUTHORITY. BENTON’S VERSION.'),
    t(w === 'ally' ? 'Celeste is afraid. I heard it on the phone on Friday night: one word, and no darling after it.' : w === 'proof' ? 'I spent the name. It was mine to spend. Nobody can threaten me with it again.' : 'I kept everything and gave her away. I will be deciding for a long time whether that was clever.'),
    p('[Chapters 15–18 · institutional road — in development]'),
  ];
}

export function institutionalBlocks14(s: GameState): Block[] {
  if (s.phase === 'notice') return noticeBlocks();
  if (s.phase === 'confession') return confessionBlocks(s);
  if (s.phase === 'wire') return wireBlocks(s);
  if (s.phase === 'channels') return channelsBlocks(s);
  if (s.phase === 'hearing') return hearingBlocks();
  if (s.phase === 'dusk') return duskBlocks(s);
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices14(s: GameState): C14Choice[] {
  if (s.phase === 'notice') return noticeChoices(s);
  if (s.phase === 'confession') return confessionChoices(s);
  if (s.phase === 'wire') return wireChoices();
  if (s.phase === 'channels') return channelsChoices(s);
  if (s.phase === 'hearing') return hearingChoices(s);
  if (s.phase === 'dusk') return duskChoices(s);
  return [];
}
