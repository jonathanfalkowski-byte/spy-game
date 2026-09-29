/** Chapter 7 (Institutional route, lane id `institutional`) · Level 71:
 * gate → window → scope → crossing → desk → watched → complete (the shared end: 'Where It Points').
 * Design: docs/story/INSTITUTIONAL_CHAPTER_7_LEVEL_71_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_7_SCRIPT.md. Route: docs/story/INSTITUTIONAL_ROUTE_DESIGN.md.
 * Entered from the Chapter 7 confirm beat when the road is `institutional`; the road continues to the shared Chapter 9
 * bridge placeholder until Institutional Chapter 8 exists. Back inside the machine that made her: Axiom Tower as Evelyn;
 * Sloane's offer on Level 71, opened by Chapter 6 (the ORACLE challenge, the terms held, the protection accepted, or a
 * road she turned onto); an operative's contract (a file number, a handler, real backup, the flat's monitoring made
 * official) and Sloane's rule out loud, "We don't watch that."; three of five scope terms in her own words, each with
 * Sloane's pencil in the margin (the refusal, the record, the name, the backup, her people); Benton at his smoked-glass
 * door, "Ms Vale. I believe we've met."; Adrian's own desk, two desks from Daniel Kessler, who meets a stranger; a chosen
 * evening (Daniel as a colleague and nothing more, Maya, a partner from before at his place with the consent flow, or
 * alone with tape over the camera light); the first card, WHO IS WATCHING HER? Sloane is never a romance; monitoring is
 * never sexualised; Daniel is never deceived into intimacy (INSTITUTIONAL_ROUTE_DESIGN §2). Keys live under `inst.*` and
 * `c7.i-*`; choice ids carry `i7-`.
 * Deepening pass (2026-09-29): three moments, each with a neutral pick. The photograph still in Sloane's file, the woman in
 * the ivory jacket Adrian was first shown (c7.i-photo = ask | window | wait: "Someone the vendor told us was retired.";
 * standing beside Sloane at the glass, the two of them in it; or waiting). The lift down from seventy-one with Sloane
 * (c7.i-lift = why | look | quiet: "Because you'd have walked in anyway."; the two of them in the steel doors; or
 * nothing). And the new phone's first message, "Welcome home, 7A." (c7.i-message = reply | sloane | delete: two ticks
 * and no answer; forwarded, and Sloane's "Not us. Leave it with me."; or deleted, with the green light watching). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get5 } from './chapter5-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';
import { eveningPartners7 } from './chapter7-own';
import { sloaneDoubts } from './sloane-standing';

export const INSTITUTIONAL_PHASES7 = ['gate', 'window', 'scope', 'crossing', 'desk', 'watched'] as const;
export const isInstitutional7 = (s: GameState) => getKey(s, 'route.lane') === 'institutional';
export const institutionalPhase7 = (s: GameState) => isInstitutional7(s) && ((INSTITUTIONAL_PHASES7 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const c = (s: GameState, k: string) => s.choices[k];
const famous = (s: GameState) => !!get5(s, 'published');
type Partner = 'julian' | 'sebastian';
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');

export function placeInstitutional7(s: GameState): string | undefined {
  const open = get7(s, 'i-evening-open');
  if (s.phase === 'watched' && open) return open.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
  if (s.phase === 'desk' && get7(s, 'i-desk')) return '09:40 · Two desks over';
}

// ── The gate ──

function gateBlocks(): Block[] {
  return [
    p('Axiom Tower, twenty to eight, in the rain. The staff entrance on the east side, the one with the bad step, the one Adrian Vale walked through five days a week for eleven years with a coffee in one hand and his badge already out in the other.'),
    p('At the desk there is a temporary badge waiting in a paper sleeve, with a photograph you did not sit for and a name you did not choose: EVELYN VALE. VISITOR · LEVEL 71 · ESCORTED.'),
    p('The guard is Terry. Terry has been on this desk since before Adrian’s first day. Terry said “Morning, Mr Vale” perhaps two thousand five hundred times, and asked after a football team Adrian never supported, because Adrian was too polite to say so in the first week and it was too late by the second.'),
    q('Terry', 'Morning, madam. Lifts on your left. Mind the step.'),
    t('He doesn’t know me. Of course he doesn’t. I have known his face for eleven years and it has never once been this hard to look at.'),
  ];
}

function gateChoices(): C7Choice[] {
  const g = (id: 'step' | 'team' | 'lift', label: string, hint: string, body: Block[]) =>
    offer7('i7-gate-' + id, label, hint, 'window', (x) => {
      set7(x, 'i-gate', id);
      return body;
    });
  return [
    g('step', 'Step over the bad step without looking', 'The way your feet remember.', [p('You step over the bad step without looking down, the way your feet have done it for eleven years, and Terry glances up from his screen, and frowns very slightly, and goes back to it.')]),
    g('team', 'Ask him how the team did on Saturday', 'Adrian always asked. Adrian never cared.', [
      q('You', 'How did they do on Saturday?'),
      q('Terry', 'Lost two–one. Robbed. You follow them, madam?'),
      q('You', 'Somebody I knew did.'),
      p('He tells you about the penalty all the way to the barrier, and you let him, and it is the most ordinary five minutes you have had in a month.'),
    ]),
    g('lift', 'Go straight to the lifts', 'Don’t give the building anything.', [p('You go straight to the lifts and give the building nothing, not a glance, not a hesitation, and in the steel doors a tall woman in a dark coat looks back at you as if she has every right to be here.')]),
  ];
}

// ── Level 71 ──

function opening(s: GameState): Block[] {
  const action = c(s, 'c6.resolve-action');
  if (action === 'resolve-challenge')
    return [q('Sloane', 'You read me the ORACLE assessment in my own car. It says I can’t hold you. I’ve read it a great many times since. So I won’t try to hold you, Ms Vale. I’ll hire you.')];
  if (action === 'resolve-enforce' && c(s, 'c6.exit-arrangement') === 'sloane-institutional')
    return [q('Sloane', 'You read my own terms back to me, word for word, and held me to them. Nobody has done that to me since I was a junior. Good. Let’s write better ones.')];
  if (action === 'resolve-protect')
    return [q('Sloane', 'You let me protect you. I have been doing it off the books, which is where people like me keep things we intend to deny. I would like to stop doing it off the books.')];
  return [q('Sloane', 'You came to me. People don’t, usually. They wait to be collected. I find I’d rather work with the kind who walk in.')];
}

function windowBlocks(s: GameState): Block[] {
  const f = c(s, 'c6.friction-sloane');
  return [
    p('Level 71. The office you first saw with an escort at each elbow, the day you were shown a photograph of a woman you were about to become. The same grey carpet, the same absence of anything personal, and Victoria Sloane at the window with the city behind her, in graphite, with the silver streak in her black hair catching what light there is.'),
    p('She does not turn round straight away. She lets you look at her back for a count of three, the way she once let Adrian stand on the carpet and wait. Then she turns, and looks at you properly, all of you, slowly, the way a jeweller looks at a stone somebody else cut.'),
    ...opening(s),
    ...(f === 'corrected'
      ? [q('Sloane', 'You gave me the narrow version, last month. I checked every word of it. It was true. That is rarer in this building than you would think.')]
      : f === 'unanswered'
        ? [q('Sloane', 'You let me guess, last month. I am still guessing. I would like to stop, and this is the only way I know how.')]
        : []),
    ...(sloaneDoubts(s)
      ? [q('Sloane', 'And you named Benton on a guess, at the Glass House. You were right. I am hiring the judgment. I will be watching for the luck.')]
      : []),
    p('She puts a folder on the desk between you. An operative’s contract, on Axiom paper: a file number, a handler of record (V. SLOANE), backup on every tasking, a salary with a comma in it, and the flat, the phone and the cover, which she has been providing quietly since the spring, made official. Monitored, logged, and yours.'),
    p('Under the contract, in a buff folder with a clinic’s crest, the first page of your own file lies open, and on it the photograph they showed Adrian in this room in the spring: a woman of thirty-one in an ivory jacket, shoulder-length dark hair, a face near enough to yours now that it takes you a moment to understand that it is not.'),
    q('Sloane', 'One thing before you read it, so that you don’t have to ask. The flat is monitored. The hall, the door, the phone, the street. The bedroom is not. We don’t watch that. I’m not that kind of officer, and neither will you be.'),
  ];
}

function photoChoices(): C7Choice[] {
  const ph = (id: 'ask' | 'window' | 'wait', label: string, hint: string, body: Block[]) =>
    offer7('i7-photo-' + id, label, hint, 'window', (x) => {
      set7(x, 'i-photo', id);
      return body;
    });
  return [
    ph('ask', 'Ask who she was', 'The woman in the ivory jacket.', [
      q('You', 'Who was she? Before me.'),
      p('Sloane looks at the photograph for a moment, as if she had not looked at it properly in a long time, and then closes the folder over it.'),
      q('Sloane', 'Someone the vendor told us was retired. I didn’t ask what that meant. I’m asking now. I haven’t had an answer.'),
      t('Retired. Like a racehorse. Like a legend nobody needs any more.'),
    ]),
    ph('window', 'Stand beside her at the window', 'Look at the city she looks at.', [
      p('You get up and go and stand beside her at the glass, not close, a hand’s width, and look at what she looks at all day: the river, the cranes, the grey roofs going on for ever. In the window the two of you stand side by side, one in graphite, one in black, and for a moment neither of you is anybody’s officer.'),
      q('Sloane', 'Most people stay in the chair.'),
      q('You', 'Most people don’t know the view.'),
      p('She turns her head and looks at you, very close, for a count of three, and you look back, and it is Sloane who turns away first, back to the city, with something that is almost a smile.'),
    ]),
    ph('wait', 'Wait', 'Let her say what she brought you here to say.', [p('You wait, the way Adrian learned to wait in this room, and after a moment she closes the file over the photograph without a word.')]),
  ];
}

function windowChoices(s: GameState): C7Choice[] {
  if (!get7(s, 'i-photo')) return photoChoices();
  const w = (id: 'cost' | 'above' | 'pen', label: string, hint: string, body: Block[]) =>
    offer7('i7-offer-' + id, label, hint, 'scope', (x) => {
      set7(x, 'i-offer', id);
      return [...body, p('She turns the folder round to face you and takes the cap off a pen. The last page is blank but for a heading, SCOPE OF TASKING, and two lines for signatures.'), q('Sloane', 'Three. In your own words. I’ll sign them, and then I’ll write what I actually think of each one in the margin, in pencil, because I’d rather you knew.')];
    });
  return [
    w('cost', 'Ask what she gets out of it', 'Everyone in this building gets something.', [
      q('You', 'What do you get?'),
      q('Sloane', 'An asset nobody else can run, on my books instead of in the wind. And Axiom gets a problem it cannot sell, which from where I sit is the only kind worth having.'),
    ]),
    w('above', 'Ask who is above her', 'On paper, and off it.', [
      q('You', 'Who is above you?'),
      q('Sloane', 'On paper, Elias Benton. Above him, a client. Above the client, people I don’t meet.'),
      p('She says it without any expression at all, which is how you know she has thought about it at three in the morning.'),
    ]),
    w('pen', 'Hold out your hand for the pen', 'Read it first. But take the pen.', [p('You hold out your hand for the pen. She looks at the hand, and then at you, and something at the corner of her mouth moves, very slightly, for the first time since you walked in.'), q('Sloane', 'Good.')]),
  ];
}

// ── The scope ──

const SCOPE: [id: string, label: string, hint: string, text: string, pencil: string][] = [
  ['refusal', 'The refusal: any tasking, once, in writing, without penalty', 'She can say no, and it stays a no.', 'The Operative may decline any single tasking, in writing, without penalty to her standing, her salary or her cover.', 'Once per tasking. Not once per career.'],
  ['record', 'The record: her own file, monitoring logs and all, every month', 'She sees what they see.', 'The Operative shall be shown her own file, including all monitoring logs, on the first working day of every month.', 'You’ll wish you hadn’t.'],
  ['name', 'The name: Adrian Vale’s file stays sealed', 'Nobody at Axiom is tasked against it.', 'The personnel file of Adrian Vale shall remain sealed, and no officer of Axiom shall be tasked against it or against her by means of it.', 'I can seal it. I can’t unread it for him.'],
  ['backup', 'The backup: every tasking has named backup, a number that answers', 'Real backup, not a promise.', 'Every tasking shall carry named backup, reachable at a number that answers, at any hour, for its duration.', 'Mine. Always mine.'],
  ['people', 'Her people: nobody she loves is ever a tasking', 'Not Maya. Not a partner. Nobody.', 'No person the Operative names as close to her shall be made the subject of a tasking, or a means of one.', 'Define “loves”. No, don’t. I’ll take it as written.'],
];

function scopeChoices(s: GameState): C7Choice[] {
  const taken = Number(get7(s, 'i-scope') ?? 0);
  return SCOPE.filter(([id]) => !getKey(s, 'inst.scope.' + id)).map(([id, label, hint, text, pencil]) =>
    offer7('i7-scope-' + id, label, hint, taken >= 2 ? 'crossing' : 'scope', (x) => {
      setKey(x, 'inst.scope.' + id);
      set7(x, 'i-scope', String(taken + 1));
      const body: Block[] = [q('You', text), p('She signs under it without argument. Then she takes a pencil from the drawer and writes in the margin, small and quick, and turns the page so that you can read it.'), q('The margin', pencil)];
      if (taken < 2) return body;
      const chosen = SCOPE.filter(([k]) => getKey(x, 'inst.scope.' + k)).map(([k]) => k);
      note7(x, 'i-contract', `Evelynn signed an operative’s contract with Axiom, handler V. Sloane, with three scope terms in her own words (${chosen.join(', ')}).`, 'The contract on Level 71, signed by both, pencilled by one');
      return [
        ...body,
        p('She signs the last page, and blots it, which nobody has done for thirty years, and gives you the top copy.'),
        q('Sloane', 'Welcome back to Axiom, Ms Vale. You’ll find it hasn’t changed. That’s rather the problem.'),
      ];
    }),
  );
}

// ── The crossing ──

function crossingBlocks(): Block[] {
  return [
    p('Five past nine. The lift down from seventy-one, Sloane beside you, the doors closing on the grey carpet. Seventy-one floors of brushed steel and a mirror at the back, and in the mirror two women standing exactly as far apart as a handler and her operative should.'),
  ];
}

function floorBlocks(s: GameState): Block[] {
  return [
    p('Ten past nine. Sloane walks you down to Strategic Intelligence herself, which she has never done for anybody, and the floor notices. The same hum of terminals, the same bad carpet, the same smell of burnt coffee from the machine by the window that has been broken in the same way for six years.'),
    p('Heads come up. Heads go down. Somebody’s chair squeaks and stops. You walk it the way you used to walk it, past the printer, past the pillar, and then not the way you used to, because you are wearing heels and a face and everybody is looking.'),
    p('At the far end, the smoked-glass office. The door opens before you reach it, and Elias Benton stands in it with his little black slate held against his chest, silver-haired and compact and precise, and looks at your face for a long, long time.'),
    ...(s.mission.source === 'benton' ? [t('The man at the Glass House. The man I named. And the man who holds my name in a drawer.')] : [t('The man who supervised Adrian for four years, and walked to his desk on the morning he lost everything, carrying bad news on a slate. He holds my name in a drawer.')]),
    q('Benton', 'Ms Vale. I believe we’ve met.'),
  ];
}

function liftChoices(): C7Choice[] {
  const l = (id: 'why' | 'look' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer7('i7-lift-' + id, label, hint, 'crossing', (x) => {
      set7(x, 'i-lift', id);
      return [...body, ...floorBlocks(x)];
    });
  return [
    l('why', '“Why me?”', 'Of all the problems on her desk.', [
      q('You', 'Why me? You could have let me go. You could have let them have me.'),
      q('Sloane', 'Because you’d have walked in anyway. Through a different door, with a worse badge, and I’d have spent a year finding out which one. I would rather know where you are.'),
      q('You', 'That isn’t a compliment.'),
      q('Sloane', 'It is the only kind I give.'),
    ]),
    l('look', 'Look at her in the mirror', 'She is looking at you.', [p('You look at her in the mirror at the back of the lift, and find that she is already looking at you, and neither of you pretends otherwise. Forty floors. Thirty. Her eyes go, once, to your mouth, and back, as if checking a detail in a report, and then the doors open on forty-four and she steps out first, and you follow, and nobody on the floor could possibly know that anything happened in there, because nothing did.')]),
    l('quiet', 'Say nothing', 'Watch the numbers.', [p('You watch the numbers go down, seventy-one to forty-four, and say nothing, and neither does she. It is a comfortable silence, which is the most alarming thing about it.')]),
  ];
}

function crossingChoices(s: GameState): C7Choice[] {
  if (!get7(s, 'i-lift')) return liftChoices();
  const b = (id: 'cool' | 'adrian' | 'silent', label: string, hint: string, body: Block[]) =>
    offer7('i7-benton-' + id, label, hint, 'desk', (x) => {
      setKey(x, 'inst.benton', id);
      return body;
    });
  return [
    b('cool', '“I don’t think so. I’d remember.”', 'Give him nothing.', [q('You', 'I don’t think so, Director. I’d remember.'), p('He smiles, a small dry professional smile, and says “Of course,” and steps back into his office, and does not close the door.')]),
    b('adrian', '“Is this development feedback, Elias?”', 'His phrase. Only Adrian would know it.', [
      q('You', 'Is this development feedback, Elias?'),
      p('Benton goes perfectly still. The slate stays against his chest. For a moment nothing on his face moves at all, and then everything does, very slightly, the way a building settles.'),
      p('Behind you, Sloane says nothing, loudly.'),
      q('Benton', 'Welcome to the floor, Ms Vale.'),
      t('He knows. He knows I know he knows. And nobody in this building will ever say it out loud. That is the first thing I have enjoyed about Axiom in eleven years.'),
    ]),
    b('silent', 'Say nothing. Let Sloane answer', 'She is your handler. Let her handle.', [q('Sloane', 'Ms Vale is mine, Elias. On my books, under my scope. You’ll have the paperwork by noon.'), q('Benton', 'I’m sure I will.'), p('He watches you all the way down the floor. You can feel it between your shoulder blades like a hand that isn’t there.')]),
  ];
}

// ── The desk ──

function deskBlocks(): Block[] {
  return [
    p('Your desk is by the window, fourth from the end. You would know it with your eyes shut. It has been cleared, and wiped, and someone has left a small green plant on it in a pot, as if to make it look like somebody else’s.'),
    p('It is Adrian’s desk.'),
    q('Sloane', 'It’s the only desk on the floor nobody wanted. And I wanted to see your face.'),
    t('She is testing me. She is also, I think, being honest. With Sloane those have never been different things.'),
  ];
}

function danielIntro(s: GameState): Block[] {
  return [
    p('Two desks over, a chair rolls back. Daniel Kessler: thirty-two, long-limbed, dark curls that no memo has ever defeated, one button short of the dress code as he has been every day for four years, and wearing, today, a truly terrible tie.'),
    ...(famous(s) ? [p('He looks at you, and then looks again, and goes faintly pink, as if he has seen your face somewhere he shouldn’t have, on a magazine in a newsagent, and is too polite to say so.')] : []),
    q('Daniel', 'Hi. Daniel. I sit there, I mostly eat there, the coffee machine is broken and has been since the Romans. The last person at that desk read everything. No pressure.'),
    t('You sent me your reports at eleven at night for four years, Daniel. I fixed them by seven. You never knew.'),
  ];
}

function deskChoices(s: GameState): C7Choice[] {
  if (!get7(s, 'i-desk')) {
    const d = (id: 'keep' | 'move', label: string, hint: string, body: Block[]) =>
      offer7('i7-desk-' + id, label, hint, 'desk', (x) => {
        set7(x, 'i-desk', id);
        setKey(x, 'inst.desk', id);
        return [...body, ...danielIntro(x)];
      });
    return [
      d('keep', 'Sit down', 'It was always a good desk.', [p('You sit down. The chair still has the wobble in the left arm that Adrian meant to report for four years and never did. You put your hand on the desk, flat, and leave it there a moment. Sloane watches your face, as promised, and then goes back up to seventy-one without a word.')]),
      d('move', 'Ask for another desk', 'Not this one.', [q('You', 'Not this one.'), q('Sloane', 'Fair.'), p('By ten there is a desk by the pillar with your name on a strip of card, and nobody on the floor could tell you why the new woman moved, and the plant has come with you.')]),
    ];
  }
  const dn = (id: 'warm' | 'tie' | 'work', label: string, hint: string, body: Block[]) =>
    offer7('i7-daniel-' + id, label, hint, 'watched', (x) => {
      setKey(x, 'inst.daniel', id);
      return body;
    });
  return [
    dn('warm', 'Be kind to him', 'He always deserved more of it than he got.', [q('You', 'Evelyn. I’ll try to keep up. Show me where the good biscuits are hidden.'), p('He laughs, surprised, and shows you: the second drawer of the filing cabinet nobody uses, behind the fire procedures, where Adrian put them six years ago. He tells you he found them himself. You let him.')]),
    dn('tie', '“That tie doesn’t suit you.”', 'Adrian always said so.', [
      q('You', 'That tie doesn’t suit you.'),
      p('He stares at you. Something goes across his face very fast, like a bird across a window.'),
      q('Daniel', 'Someone used to say that to me. Exactly that. Every Monday.'),
      q('You', 'Then someone was right.'),
      p('He takes it off, there at his desk, and puts it in the drawer, and looks at you for a moment longer than a stranger should, frowning, as if trying to remember a word. He does not find it. You go back to your screen with your heart going.'),
      t('Careless. And the first time since the clinic that anybody has looked at me and nearly seen him.'),
    ]),
    dn('work', 'Keep it to work', 'Name, extension, back to the screen.', [q('You', 'Evelyn. Extension four-one-one-two. I’ll let you know if I need anything.'), p('He nods, and rolls back to his own desk, and all morning you can hear him not looking at you.')]),
  ];
}

// ── The watched flat ──

function watchedBlocks(): Block[] {
  return [
    p('Seven o’clock. The flat, which has been hers since the spring and is Axiom’s tonight. Nothing has moved, and everything is different: a small camera high in the corner of the hall with a steady green light, a new phone on the kitchen counter in a box, and a sealed envelope with her file number on the front.'),
    p('You open it. The file number is AX-7A.'),
    t('Candidate 7A. They gave me Adrian’s candidate number. Of course they did. Somebody in records has a sense of humour, or no imagination at all.'),
    p('You take the new phone out of its box and switch it on. It has one contact in it, SLOANE, and a number marked BACKUP. It has been on for less than a minute when it buzzes, once, with a message from a number with no name.'),
    q('The message', 'Welcome home, 7A.'),
  ];
}

function messageChoices(): C7Choice[] {
  const m = (id: 'reply' | 'sloane' | 'delete', label: string, hint: string, body: Block[]) =>
    offer7('i7-message-' + id, label, hint, 'watched', (x) => {
      set7(x, 'i-message', id);
      return body;
    });
  return [
    m('reply', '“Who is this?”', 'Ask. See who answers.', [p('You type WHO IS THIS? and send it. Two grey ticks. Then two blue ones. Then nothing, for the rest of the night, and you check eleven times, and hate yourself for every one of them.')]),
    m('sloane', 'Forward it to Sloane', 'This is what a handler is for.', [p('You forward it to SLOANE without a word. The reply comes in under a minute, which means she was awake, which means she is always awake.'), q('Sloane', 'Not us. Leave it with me. Lock the door. Goodnight, Ms Vale.'), t('Not us. She says it as if it were reassuring.')]),
    m('delete', 'Delete it', 'Give it nothing.', [p('You delete it, and put the phone face down on the counter, and in the hall the little green light watches you do it, and logs it, probably, as a woman deleting a message, which is all it was.')]),
  ];
}

const inviteLines: Record<Partner, Block[]> = {
  julian: [
    p('His flat is on the forty-first floor of a building Axiom does not own, which you checked before you came, and which he notices you checking, and says nothing about.'),
    q('Julian Mercer', 'Axiom. Well. Nobody at Helix will believe it. Stay as long as you like. Tell me what you want tonight, and that’s what happens.'),
  ],
  sebastian: [
    p('The late set at the Harbour, forty people in the dark and one cello, and he plays the middle section looking straight at you. Afterwards, in the corridor behind the stage, he takes your face in both hands.'),
    q('Sebastian', 'You look like somebody who’s been in a building all day that didn’t deserve you. The hotel’s round the corner. Or I walk you home. You choose.'),
  ],
};
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that’s the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  sebastian: { 'no-sex': 'Good. I’d like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stayBody: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the window with the city behind you, slowly, as if there were no hurry anywhere in the world, and stops exactly where you said, and holds you there, his hand warm on the back of your neck, until the lights go out down there one district at a time.')],
    sex: [p('He kisses you against the window with the city behind you. The dress goes first, then his shirt, then any pretence that either of you came to talk about Axiom. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next is yours and his. Nobody is watching this one. The scene fades.')],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says out loud what he likes about what he finds, and every word of it lands, and when you say that is where tonight stops he laughs against your throat and stays exactly there with you.')],
    sex: [p('He undoes the dress slowly and says out loud what he likes, and every word of it lands. The lamp stays on. When he asks once more, low, whether you are sure, you answer by drawing him down onto the bed with you.'), p('What happens next is yours and his, in a room no camera has ever seen. The scene fades.')],
  },
};

function watchedChoices(s: GameState): C7Choice[] {
  if (!get7(s, 'i-message')) return messageChoices();
  const open = get7(s, 'i-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('i7-evening-' + id, label, hint, 'complete', (x) => {
      set7(x, 'i-evening', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer7('i7-' + partner + '-' + id, label, hint, 'watched', (x) => {
        set7(x, 'i-evening-open', partner + '-room');
        set7(x, 'i-evening-scope', id);
        note7(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      scope('sex', partner === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer7('i7-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c7.i-evening-open'];
        set7(x, 'i-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and he walks you to a taxi and does not ask why, and you go home to a flat with a green light in the hall.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get7(s, 'i-evening-scope') as 'no-sex' | 'sex';
    return [
      offer7('i7-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c7.i-evening-open'];
        set7(x, 'i-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and steps back, and says “Of course,” and means it, and calls you a car.')];
      }),
      offer7('i7-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c7.i-evening-open'];
        set7(x, 'i-evening-outcome', 'intimate-' + sc);
        return stayBody[partner][sc];
      }),
    ];
  }
  return [
    done('daniel', 'A drink with Daniel', 'As colleagues. He doesn’t know. Nothing more.', [
      p('The Feathers, across the road, where Axiom has drunk on Fridays since before Adrian was born. Daniel buys the first round and apologises for the wine, and talks, because you ask him to, about the man who used to sit at your desk.'),
      q('Daniel', 'Adrian. He read everything. He fixed my reports at night and never told anyone they’d needed fixing. When he went, nobody said where. One day the desk was just empty. I kept thinking I’d see him on the tram.'),
      p('At the tram stop he says goodnight, and puts his hands in his pockets, and doesn’t lean in, because you are a stranger he met this morning and he is a decent man. You find, riding home, that you are sorry about that, and that you have no right to be. Not yet.'),
      t('If he is ever going to kiss me, he is going to know whose mouth it is first. That is the only rule I am sure of tonight.'),
    ]),
    ...(c(s, 'c6.maya') === 'restored'
      ? [
          done('maya', 'Ring Maya', 'Compliance. A decade of bad coffee.', [
            p('Maya comes round with a bottle and two coffees, one for now and one for the morning, because she has known you for ten years, in two bodies, and still thinks of everything.'),
            q('Maya', 'Axiom. You went back to Axiom. On Sloane’s books. With Benton on the floor.'),
            q('You', 'At my own desk.'),
            p('Maya looks at the green light in the hall for a long moment, and then, deliberately, stands with her back to it.'),
            q('Maya', 'Then you’ve got a friend in compliance. Don’t tell me anything you don’t want written down. I’ll tell you everything I do.'),
          ]),
        ]
      : []),
    ...partners(s).map((pt) =>
      offer7('i7-evening-' + pt, pt === 'julian' ? 'Go to Julian’s' : 'The late set at the Harbour', pt === 'julian' ? 'His place. Not the watched one.' : 'Sebastian. One cello, and afterwards.', 'watched', (x) => {
        set7(x, 'i-evening', pt);
        set7(x, 'i-evening-open', pt);
        return inviteLines[pt];
      }),
    ),
    done('alone', 'Stay in, alone', 'Tape over the light. Sit in the dark.', [p('You take a strip of electrician’s tape from the kitchen drawer and put it over the green light in the hall, and sit on the floor with your back to the wall in the dark, in a flat Axiom is listening to, and for the first time all day nobody is looking at your face.'), t('Tomorrow they will log it. Let them. It is the first thing in this flat that I did.')]),
  ];
}

// ── The first card ──

function completeBlocks(s: GameState): Block[] {
  return [
    ...(get7(s, 'i-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The green light in the hall watches you come in. It does not know where you have been. That is in the contract, and for the first time you believe it.')] : []),
    p('The wardrobe door, late. You pin the first card of a new road in the middle of it, in capitals.'),
    q('The card', 'VICTORIA SLOANE. HANDLER. AX-7A.'),
    p('And underneath it, in pencil, smaller, the question you have been asking since the window:'),
    q('The card', 'WHO IS WATCHING HER?'),
    ...(getKey(s, 'inst.benton') === 'adrian' ? [p('And, in the corner, very small: BENTON KNOWS.')] : []),
    ...(get7(s, 'i-message') === 'sloane' ? [p('And on the other corner: WELCOME HOME, 7A. NOT US.')] : get7(s, 'i-message') ? [p('And on the other corner: WELCOME HOME, 7A. WHO?')] : []),
    ...(getKey(s, 'inst.daniel') === 'tie' ? [p('And under that, smaller still, a word you rub out as soon as you have written it: DANIEL.')] : []),
    t('I walked back into the building that made me, and sat down at my own desk, and nobody stopped me. That should frighten me more than it does.'),
  ];
}

export function institutionalBlocks7(s: GameState): Block[] {
  if (s.phase === 'gate') return gateBlocks();
  if (s.phase === 'window') return windowBlocks(s);
  if (s.phase === 'scope') return [];
  if (s.phase === 'crossing') return crossingBlocks();
  if (s.phase === 'desk') return deskBlocks();
  if (s.phase === 'watched') return watchedBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'gate') return gateChoices();
  if (s.phase === 'window') return windowChoices(s);
  if (s.phase === 'scope') return scopeChoices(s);
  if (s.phase === 'crossing') return crossingChoices(s);
  if (s.phase === 'desk') return deskChoices(s);
  if (s.phase === 'watched') return watchedChoices(s);
  return [];
}
