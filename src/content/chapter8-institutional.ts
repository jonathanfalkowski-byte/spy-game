/** Chapter 8 (Institutional route, lane id `institutional`) · Scope:
 * rota → tasked → records → backseat → afterhours → complete (the shared end: 'The Next Room').
 * Design: docs/story/INSTITUTIONAL_CHAPTER_8_SCOPE_DESIGN.md (owner-approved 2026-09-29, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_8_SCRIPT.md. Route: docs/story/INSTITUTIONAL_ROUTE_DESIGN.md.
 * Entered from an Institutional `chapter7.complete`; hands on to the shared Chapter 9 bridge ("Follow the vendor").
 * Three weeks on Axiom's books: the rota, and the unknown number again ("Ask Records for E.V. (I)." — Rook, the Unknown
 * sender); three of five taskings, one a week, each by the book / shaded / refused, each testing a Ch7 scope term (the
 * debrief, the compliance question, Benton's errand, Daniel's report, the monthly file); Records on Sloane's own order,
 * the first Meridian name (MERIDIAN HOLDINGS · VENDOR; LEGEND E.V. (II) · PRIOR INSTANCE RETIRED · SINGAPORE), handed
 * over intact, copied, or the note held back; the back of Sloane's car ("You're the second."); the evening (Daniel,
 * and the telling if she chooses, after which he asks for a day; Maya; a partner from before with the consent flow;
 * alone); the second card. Refusal without the term costs a hearing, never safety. Keys live under `inst.*` and
 * `c8.i-*`; choice ids carry `i8-`. Local helpers mirror chapter8.ts to avoid a circular import.
 * Deepening pass (2026-09-30): three moments, each with a neutral pick. The coffee machine in week one (c8.i-machine =
 * kick | show | cafe: she kicks it where Adrian always kicked it, and Daniel stares; he shows her the trick "somebody
 * taught me"; or the café downstairs). Week two, 02:00, the hall camera's green light goes out for eleven minutes
 * (c8.i-light = look | ring | sleep: a man under the street lamp, then nobody; Sloane on the backup line, "Maintenance.
 * Go back to sleep."; or sleep). Records, the timers: the lights go out in aisle nine (c8.i-dark = torch | talk | wait:
 * the phone's torch finds the next box, PROJECT EVE (I), empty but for the outline of a file in the dust; Sloane's
 * voice in the dark, with the backup term; or standing still and counting). */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C8Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get8 = (s: GameState, k: string) => s.choices['c8.' + k];
const set8 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c8.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C8Choice['apply']): C8Choice => ({ id: 'chapter8.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get8(s, 'rec.' + k) !== undefined) return;
  set8(s, 'rec.' + k, String(s.history.length));
  set8(s, 'event.' + k, String(s.revision));
  set8(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c8.' + k);
  s.knowledge.push('c8.' + k);
}

export const INSTITUTIONAL_PHASES8 = ['rota', 'tasked', 'records', 'backseat', 'afterhours'] as const;
export const isInstitutional8 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase8 = (s: GameState) => isInstitutional8(s) && ((INSTITUTIONAL_PHASES8 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const scope = (s: GameState, id: string) => !!key(s, 'inst.scope.' + id);
const bump = (s: GameState, k: string) => setKey(s, k, String(Number(key(s, k) ?? 0) + 1));
type Task = 'debrief' | 'compliance' | 'benton' | 'report' | 'file';
const TASKS: Task[] = ['debrief', 'compliance', 'benton', 'report', 'file'];
const TASK_NAME: Record<Task, string> = { debrief: 'THE DEBRIEF', compliance: 'THE COMPLIANCE QUESTION', benton: 'BENTON’S ERRAND', report: 'DANIEL’S REPORT', file: 'MY OWN FILE' };
const weeks = (s: GameState) => Number(get8(s, 'i-weeks') ?? 0);
const WEEK = ['Week one', 'Week two', 'Week three'];
type Partner = 'julian' | 'sebastian';
const c = (s: GameState, k: string) => s.choices[k];
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');

export function placeInstitutional8(s: GameState): string | undefined {
  const open = get8(s, 'i-open') as Task | undefined;
  if (s.phase === 'tasked' && open) return WEEK[weeks(s)] + ' · ' + (open === 'debrief' ? 'A hotel room at noon' : open === 'report' ? '23:00 · Strategic Intelligence' : open === 'file' ? 'The first working day · Level 71' : 'Strategic Intelligence');
  const ev = get8(s, 'i-evening-open');
  if (s.phase === 'afterhours' && ev) return ev.startsWith('daniel') ? 'Friday · The Feathers' : ev.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
}

// ── The rota ──

function rotaBlocks(s: GameState): Block[] {
  return [
    p('Three weeks. You learn the rhythm again the way a hand learns a piano it played as a child: 07:40 at the gate and Terry’s football; the coffee machine by the window, which takes your coin and gives you nothing, as it gave Adrian nothing for six years; Daniel’s ties, each worse than the last; the hush that goes across Strategic Intelligence when the lift opens on seventy-one’s people.'),
    p('And the grey envelopes. They come up from seventy-one by hand, one on Monday of each week, sealed, with AX-7A on the front in Sloane’s small upright capitals. Inside, a single sheet: a tasking, a scope line, a backup name. Nothing that could embarrass anybody if it were found in a bin.'),
    ...(key(s, 'inst.benton') === 'adrian' ? [p('Benton does not speak to you once in the first week. He does not need to. Every time you look up, the smoked glass is turned your way.')] : []),
    p('Wednesday of the first week, ten past eight. The coffee machine by the window takes your coin, thinks about it, and gives you nothing, with the small self-satisfied click it has been making since before Adrian’s first day. Daniel is behind you in the queue with his mug, a mug that says WORLD’S OKAYEST ANALYST, which Adrian gave him as a joke and which he has apparently used every day since.'),
  ];
}

const messageLead: Block[] = [
  p('On the first Sunday, at 23:02, the phone Axiom gave you buzzes once. The same number with no name.'),
  q('The message', 'Ask Records for E.V. (I).'),
];

function machineChoices(): C8Choice[] {
  const m = (id: 'kick' | 'show' | 'cafe', label: string, hint: string, body: Block[]) =>
    offer('i8-machine-' + id, label, hint, 'rota', (x) => {
      set8(x, 'i-machine', id);
      return [...body, ...messageLead];
    });
  return [
    m('kick', 'Kick it', 'Low on the left. Where Adrian always did.', [
      p('You kick it, once, low on the left side, exactly where the panel is loose, exactly as hard as it needs, without looking. It clunks, and thinks, and pours a perfect cup.'),
      p('Behind you Daniel has gone completely still, with his mug halfway up.'),
      q('Daniel', 'Who told you about that?'),
      q('You', 'Nobody. It looked like it wanted kicking.'),
      p('He does not believe you. He does not say so. He puts his mug under the spout and kicks it himself, in the same place, and watches you walk back to your desk all the way down the floor.'),
    ]),
    m('show', 'Let him show you', 'He is dying to.', [
      q('Daniel', 'No, no, you have to — here. Low on the left. Somebody taught me. Not too hard, it sulks.'),
      p('He kicks it, carefully, the way you taught him four years ago on a wet Monday, and it pours, and he hands you the cup as if he had made it himself, and is so pleased with himself that you have to look out of the window.'),
      t('He kept the mug. He kept the kick. He is keeping all of it, and he doesn’t know what for.'),
    ]),
    m('cafe', 'Go down to the café', 'Six pounds. Worth it.', [p('You leave the machine to its victory and go down to the café in the lobby, where the coffee costs six pounds and is worth it, and Terry tells you about Saturday’s penalty again on the way back.')]),
  ];
}

function rotaChoices(s: GameState): C8Choice[] {
  if (!get8(s, 'i-machine')) return machineChoices();
  const r = (id: 'reply' | 'sloane' | 'leave', label: string, hint: string, body: Block[]) =>
    offer('i8-rota-' + id, label, hint, 'tasked', (x) => {
      set8(x, 'i-message', id);
      return body;
    });
  return [
    r('reply', '“Who are you?”', 'Ask again. Expect nothing.', [p('You type WHO ARE YOU? Two ticks go blue at once, as if somebody were holding the phone waiting. No answer comes. At 23:40 you find you have typed E.V. (I) into a search box and deleted it three times.')]),
    r('sloane', 'Forward it to Sloane', 'Again.', [q('Sloane', c(s, 'c7.i-message') === 'sloane' ? 'Still not us. Somebody wants you in Records. So do I, as it happens. That’s what worries me.' : 'Not us. Somebody wants you in Records. So do I, as it happens. That’s what worries me.')]),
    r('leave', 'Leave it on read', 'Monday comes whatever you do.', [p('You leave it on read and put the phone in a drawer, and lie awake until two thinking about a woman in an ivory jacket, and a word: retired.')]),
  ];
}
// ── The taskings ──

function taskLead(s: GameState, t8: Task): Block[] {
  if (t8 === 'debrief')
    return [
      p('The envelope says: DEBRIEF. A hotel near the station, room 412, noon. A junior analyst from a rival firm who has a file to sell and wants to be told he is doing the right thing. Your name for the day is Ms Grey.'),
      ...(scope(s, 'backup') ? [p('Backup: a man called Okafor, in the corridor, with a newspaper he is not reading. Two knocks means time.')] : [p('No backup on the sheet. You notice, and go anyway.')]),
      p('He is twenty-six. He has bitten his nails to the quick and there is a child’s drawing in his wallet, a house and a dog and a sun with a face, which he shows you without meaning to while he looks for his pass. His hands shake when he slides the file across the table.'),
      q('The analyst', 'I’m doing the right thing, aren’t I? Tell me I’m doing the right thing.'),
    ];
  if (t8 === 'compliance')
    return [
      p('The envelope says: COMPLIANCE. One line, in Sloane’s capitals. Compliance is asking questions about Executive Intelligence. Find out what Maya Reyes is asking, and whom.'),
      t('Maya. A decade of bad coffee. The one person in this building who might be on my side, and the first name they hand me.'),
    ];
  if (t8 === 'benton')
    return [
      p('No envelope. Benton himself, at your desk at six o’clock, when the floor has emptied, with his little black slate against his chest.'),
      q('Benton', key(s, 'inst.benton') === 'adrian' ? 'You and I needn’t pretend with each other, need we. I’d like a copy of Victoria’s tasking log. For the review. You sit closer to it than I do.' : key(s, 'inst.benton') === 'silent' ? 'Victoria speaks for you, I’m told. Perhaps you can speak for yourself on one small thing. Her tasking log. A copy. For the review.' : 'Ms Vale. A small thing, outside your scope, which is why I’m asking you rather than her. A copy of Victoria’s tasking log. For the review.'),
      ...(scope(s, 'name') ? [q('Benton', 'And in return, I could let you see a file you might find interesting. Personnel. An old analyst of ours.'), q('You', 'That file is sealed, Director. It’s in my contract. You can read the clause, if you like. I wrote it.')] : []),
    ];
  if (t8 === 'report')
    return [
      p('Eleven at night. The floor dark except for your lamp and his. Daniel, two desks over, is asleep on his arms beside a Novagen risk note that is due on Benton’s desk at nine, and you can see from here that it is wrong: page four, the renewal date, the same mistake he made for four years, which somebody used to fix for him before morning.'),
      ...(key(s, 'inst.desk') === 'keep' ? [t('At this desk. At this hour. With him asleep over there. I have done exactly this a hundred times, in another body.')] : []),
    ];
  return [
    p('The first working day of the month. Level 71, a side room, a clerk who does not look at you, and a grey file with AX-7A on the spine: your own life, as Axiom sees it. Entry after entry, in time order. Gate 07:38. Gate 07:41. Phone active 23:02.'),
    p('Two entries you did not know about.'),
    q('The log', '22:14 · subject taped hall camera. Logged. No action. — V.S.'),
    q('The log', 'Personnel file A. VALE · accessed · E. BENTON · 3×.'),
    ...(scope(s, 'record') ? [t('You’ll wish you hadn’t, she wrote in the margin. She was right about the second one.')] : []),
  ];
}

const refuseCost = (x: GameState): Block[] => {
  if (scope(x, 'refusal')) return [p('You write DECLINED UNDER SCOPE across the sheet and send it back up to seventy-one. It comes back the next morning with one word pencilled under yours: Noted.')];
  setKey(x, 'inst.hearing');
  return [p('You send it back unworked. The next morning you are on the carpet on seventy-one for an hour, being asked for reasons, and giving them, and a note goes on your file, and for a week Sloane speaks to you only in writing. Nothing else happens. That is the whole of the price, and it is enough.')];
};

function answers(s: GameState, t8: Task): C8Choice[] {
  const a = (id: string, label: string, hint: string, value: 'book' | 'shade' | 'refuse' | 'scope', body: (x: GameState) => Block[]) =>
    offer('i8-' + t8 + '-' + id, label, hint, weeks(s) >= 2 ? 'records' : 'tasked', (x) => {
      setKey(x, 'inst.task.' + t8, value);
      if (value === 'book') bump(x, 'inst.trust');
      if (value === 'shade') bump(x, 'inst.kept');
      delete x.choices['c8.i-open'];
      set8(x, 'i-weeks', String(weeks(x) + 1));
      return weeks(x) === 2 ? [...body(x), ...lightLead] : body(x);
    });
  if (t8 === 'debrief')
    return [
      a('full', 'Report everything', 'Including the drawing.', 'book', () => [p('Your report runs to four pages and leaves nothing out: the file, the price, the nails, the child’s drawing, the shake in his hands, the name of the school on the back of the drawing. It goes up to seventy-one by five.'), q('Sloane', 'Thorough.'), t('It was the right word. I have never hated a right word so much.')]),
      a('shade', 'Shade it', 'The file goes up. The daughter doesn’t.', 'shade', () => [p('The file goes up to seventy-one, and the price, and his name. The drawing does not. Nor does the school. Nobody asks, because nobody knew to.'), t('My first secret on Axiom’s books. It is about a sun with a face.')]),
      a('refuse', 'Walk him out', 'Tell him to go home.', 'refuse', (x) => [p('You close the file without opening it and slide it back across the table. “Go home,” you tell him. “Keep your job. Keep the drawing.” He stares at you, and then does, and you sit alone in room 412 until the two knocks come.'), ...refuseCost(x)]),
    ];
  if (t8 === 'compliance') {
    if (scope(s, 'people'))
      return [
        a('page', 'Point at the page', 'Her people. It’s written down.', 'scope', () => [p('You go up to seventy-one with your contract, and open it at the last page, and put your finger on the line you wrote: No person the Operative names as close to her. And then, in pencil, underneath: Define “loves”.'), q('Sloane', 'As written.'), p('She takes the sheet back and feeds it into the shredder herself, and does not seem angry. If anything, she seems relieved to have been stopped.')]),
      ];
    return [
      a('tell', 'Tell Sloane', 'What Maya is asking, and whom.', 'book', () => [p('You have coffee with Maya on Tuesday, the way you always have, and on Wednesday you send seventy-one a page: what compliance is asking, and whom. Maya never knows. That is the part you cannot put down.')]),
      a('shade', 'The shape, not the names', 'Enough to be useful. Not enough to hurt her.', 'shade', () => [p('You send up the shape of it, in a paragraph as smooth as glass: compliance is interested in how Executive Intelligence procures. No names. No dates. Sloane reads it and looks at you over the top of the page for a long time.'), q('Sloane', 'That’s very elegant. I’ll take it as written.')]),
      a('refuse', 'Refuse', 'Not Maya.', 'refuse', (x) => refuseCost(x)),
    ];
  }
  if (t8 === 'benton')
    return [
      a('no', 'Refuse him', 'It’s not in your scope, and he knows it.', 'refuse', () => [q('You', 'That’s outside my scope, Director. As you said.'), p('He smiles the small dry smile and says “Of course,” and goes back into his office, and from that day the smoked glass is turned your way whenever you look up. He remembers. That is what men like Benton are for.')]),
      a('sloane', 'Tell Sloane', 'This is what a handler is for.', 'book', () => [q('Sloane', 'Give him what he asked for. I’ll tell you which version.'), p('The next morning there is a copy of her tasking log in your in-tray, complete, plausible, and wrong in eleven places, each of them small. You give it to Benton at six. He thanks you.')]),
      a('doctor', 'Feed him a doctored copy', 'Your own edit. Tell nobody.', 'shade', () => [p('You make him one yourself, on your own time: Sloane’s log, true in every line but three, and those three lead nowhere. You give it to him at six. He thanks you.'), p('On Friday, in the lift, Sloane says without looking at you, “Nice work on the Tuesday entry. I’d have used the Thursday,” and gets out at seventy-one, and never mentions it again.')]),
    ];
  if (t8 === 'report')
    return [
      a('silent', 'Fix it silently', 'The way Adrian did.', 'shade', (x) => [p('You take his note from under his arm, carefully, and fix page four, and the two things on page seven he would have got wrong next, and put it back, and go home at one.'), p('At eight he comes in, and reads it, and sits very still, and then looks down the floor at you for a long time.'), q('Daniel', key(x, 'inst.desk') === 'keep' ? 'Somebody used to do this. Sat right where you’re sitting. I never thanked him.' : 'Somebody used to do this. I never thanked him.'), t('You did, Daniel. Once, at a leaving do. You blamed the wine.')]),
      a('tell', 'Fix it and tell him', '“Your renewal date. Page four.”', 'book', () => [p('You wake him with a hand on his shoulder. “Your renewal date,” you say. “Page four.” He looks at it, and at you, and groans, and fixes it, and at one in the morning buys you the worst sandwich either of you has ever eaten, from a machine, and you eat it on the fire stairs and laugh until he has to sit down.')]),
      a('stand', 'Let it stand', 'It’s his work.', 'refuse', () => [p('You leave it. It’s his work, and his name on it. At ten Benton walks it back to his desk with the slate and says “Development feedback,” and Daniel goes red to the ears, and you look at your screen and do not move at all.')]),
    ];
  return [
    a('confront', 'Take it to Sloane', 'Benton. Three times.', 'book', () => [q('You', 'Benton opened Adrian Vale’s file three times this month. It was sealed. I wrote the seal.'), q('Sloane', 'I know. It’s why I let you see the log. Seals are for keeping honest men honest. He isn’t one. Leave him to me.'), t('She let me see it. She wanted me to know he is reading. So now there are two of us watching him.')]),
    a('margin', 'Log it back', 'Your own entry, in the margin.', 'shade', () => [p('You take the clerk’s pen and write your own entry in the margin, in your own hand, under the one about the tape: Subject noticed. — E.V.'), p('Next month the entry is still there, typed into the official log in the same font as everything else, as if it had always been Axiom’s idea.')]),
    a('quiet', 'Say nothing', 'Remember.', 'refuse', () => [p('You sign the review sheet, and hand the file back to the clerk, and say nothing, and remember every word.')]),
  ];
}

const lightLead: Block[] = [
  p('Week two. Wednesday night, or Thursday morning: 02:00, and you are awake for no reason, lying in the dark in the flat Axiom pays for, looking at the sliver of hall through the bedroom door.'),
  p('The green light on the hall camera goes out.'),
  p('Not a flicker. Out. The hall is darker than you have ever seen it. The fridge hums. Somewhere below, a car door closes softly, the way people close car doors when they do not want to be heard closing them.'),
];

function lightChoices(): C8Choice[] {
  const l = (id: 'look' | 'ring' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('i8-light-' + id, label, hint, 'tasked', (x) => {
      set8(x, 'i-light', id);
      return body;
    });
  return [
    l('look', 'Go to the window', 'Barefoot. Don’t touch the curtain.', [
      p('You go to the window barefoot and do not touch the curtain, and look down through the gap. Under the street lamp opposite a man in a dark coat is standing with his hands in his pockets, looking up at your building, not at your window, at the building, as if counting floors.'),
      p('You blink, and he is walking away, unhurried, and turns the corner. Behind you, in the hall, the green light comes back on. Eleven minutes, by the oven clock.'),
      t('Eleven minutes with nobody watching. Somebody wanted eleven minutes. I would very much like to know what for.'),
    ]),
    l('ring', 'Ring the backup number', 'It is supposed to answer. At any hour.', [
      p('You ring BACKUP. It answers on the first ring, and it is Sloane, awake, with no sleep in her voice at all.'),
      q('Sloane', 'Maintenance. A firmware push. It’ll be back in ten minutes. Go back to sleep, Ms Vale.'),
      p('It is back in eleven. You lie awake until four wondering whether she was lying, and whether she knew, and which of those would be worse.'),
    ]),
    l('sleep', 'Go back to sleep', 'It’s a light.', [p('You turn over and close your eyes. It is a light. Lights go out. When you wake at seven the green is back, steady, and there is nothing in the log about it when you think to look, which you do, twice.')]),
  ];
}

function taskedChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'i-open') as Task | undefined;
  if (open) return answers(s, open);
  if (weeks(s) === 2 && !get8(s, 'i-light')) return lightChoices();
  return TASKS.filter((t8) => !key(s, 'inst.task.' + t8) && (t8 !== 'file' || scope(s, 'record'))).map((t8) =>
    offer('i8-task-' + t8, WEEK[weeks(s)] + ': ' + (t8 === 'debrief' ? 'The debrief' : t8 === 'compliance' ? 'The compliance question' : t8 === 'benton' ? 'Benton’s errand' : t8 === 'report' ? 'Daniel’s report' : 'Your own file'), t8 === 'debrief' ? 'Room 412, noon. A man with a file to sell.' : t8 === 'compliance' ? 'Find out what Maya is asking.' : t8 === 'benton' ? 'Off scope. At your desk.' : t8 === 'report' ? '23:00. Page four is wrong.' : 'The monthly log. You wrote the right to read it.', 'tasked', (x) => {
      set8(x, 'i-open', t8);
      return taskLead(x, t8);
    }),
  );
}

// ── Records ──

function recordsBlocks(s: GameState): Block[] {
  return [
    p('Thursday of the third week, the last grey envelope, and this one is not a tasking. It is in Sloane’s own hand, not her capitals: Records, B2, tonight. Pull the Project Eve procurement file. I want to read what we bought.'),
    p('Twenty past ten. Level B2, under the car park, where the lights are on timers and go out behind you in the long aisles one bank at a time, so that you walk always in a pool of light with the dark closing up at your back.'),
    ...(scope(s, 'backup')
      ? [p('Your backup is Sloane herself. She is in her car on the ramp above, engine running, on the line in your ear.'), q('Sloane', 'Aisle nine. Third bay. I’m here.')]
      : [p('No backup. The number on the sheet is Sloane’s desk, and her desk is empty at this hour, and you know it, and you go down anyway.')]),
    p('Aisle nine. You are halfway down it when the timer clicks, and the bank of lights over your head goes out, and then the next, and the one behind, and there is nothing in B2 but the dark and the smell of paper and the sound of your own breathing.'),
  ];
}

function fileBlocks(s: GameState): Block[] {
  return [
    p('The lights come back, bank by bank, as if nothing had happened. Aisle nine. Third bay. A grey box with a clinic’s crest, and inside it a file thicker than your wrist. The procurement papers for a product called PROJECT EVE. The purchaser: AXIOM. The officer of record: V. SLOANE. And the vendor, on every page, at the top, in a typeface nobody at Axiom uses:'),
    q('The file', 'MERIDIAN HOLDINGS · VENDOR.'),
    p('The ORACLE page is there, the one you have seen before, with its numbers about how willingly you would take a face and how badly anyone would hold you. And behind it, a single sheet on thinner paper, a delivery note, stamped:'),
    q('The file', 'LEGEND E.V. (II). PRIOR INSTANCE RETIRED · SINGAPORE.'),
    t('The second. I am the second. There was a first, and they retired her, and her photograph is in Sloane’s file wearing my face.'),
    ...(scope(s, 'backup') ? [q('Sloane', 'You’ve gone quiet. Talk to me.')] : []),
  ];
}

function darkChoices(s: GameState): C8Choice[] {
  const d = (id: 'torch' | 'talk' | 'wait', label: string, hint: string, body: Block[]) =>
    offer('i8-dark-' + id, label, hint, 'records', (x) => {
      set8(x, 'i-dark', id);
      return [...body, ...fileBlocks(x)];
    });
  return [
    d('torch', 'The phone’s torch', 'Look at what’s in front of you.', [
      p('You thumb the torch on. A white circle on grey boxes, labels, dates. Aisle nine, second bay, one box before the one you came for: a box with the same clinic’s crest, and on its label, in the same typeface: PROJECT EVE (I).'),
      p('You lift the lid. It is empty. On the cardboard floor of it, in the dust, the clean pale outline of a file that sat there for a long time and was taken away not long ago.'),
      t('Ask Records for E.V. (I). I asked. Records says somebody got here first.'),
    ]),
    ...(scope(s, 'backup')
      ? [d('talk', '“Talk to me.”', 'She said she was there.', [q('You', 'The lights have gone. Talk to me.'), q('Sloane', 'I’m here. I can see the ramp. Nobody has come in or out since you went down. Count to twenty, and they’ll come back. Count out loud, if you like. I’ll count with you.'), p('And she does, in your ear, in the dark, low and even, one to twenty, and you have never in your life heard anybody count like that, as if every number were a promise, and at nineteen the lights come back.')])]
      : []),
    d('wait', 'Stand still and count', 'They come back. They always come back.', [p('You stand still in the dark and count, the way Adrian counted floors in buildings he did not own, and at twenty-two the timer clicks and the lights come back, bank by bank, and you are standing exactly where you were.')]),
  ];
}

function recordsChoices(s: GameState): C8Choice[] {
  if (!get8(s, 'i-dark')) return darkChoices(s);
  const f = (id: 'intact' | 'copy' | 'note', label: string, hint: string, body: Block[]) =>
    offer('i8-file-' + id, label, hint, 'backseat', (x) => {
      setKey(x, 'inst.file', id);
      note(x, 'i-vendor', 'The Project Eve procurement file names the vendor as Meridian Holdings, and a delivery note reads: LEGEND E.V. (II). PRIOR INSTANCE RETIRED · SINGAPORE.', 'Axiom Records, Level B2, the Project Eve procurement file');
      return body;
    });
  return [
    f('intact', 'Bring it up as it is', 'Every page. Nothing kept.', [p('You close the box and carry it up the ramp as it is, every page in its place, and put it on the back seat of Sloane’s car, and get in beside it.')]),
    f('copy', 'Photograph every page first', 'On your own phone. The one they don’t log.', [p('You photograph every page, on your own phone, the one Axiom doesn’t know you still carry, forty-one pages in the pool of light with the dark at your back, and then close the box and carry it up the ramp.'), t('Whatever they keep, I keep.')]),
    f('note', 'Take the delivery note', 'Into your coat. One page.', [p('You take the delivery note out of the file, one thin page, and fold it once, and put it in the inside pocket of your coat, over your heart. Then you close the box and carry it up the ramp, lighter by a single sheet.')]),
  ];
}

// ── The back seat ──

function backseatBlocks(s: GameState): Block[] {
  return [
    p('Sloane’s car on the ramp, the engine running, the rain on the windscreen. She reads the file on the back seat under the little reading light, a hand’s width from you, page by page, the way she reads everything: without hurry and without expression. The light is on her hands and her mouth and the silver streak in her hair, and on your knee beside hers.'),
    p('At the ORACLE page she stops for a long moment. Then she turns it.'),
    ...(key(s, 'inst.file') === 'note'
      ? [p('At the back, the index. She runs a finger down it, and stops, and looks at you, a long level look, and then back at the page.'), q('Sloane', 'The index lists a delivery note. I don’t have one. I’m going to assume Records lost it. Records loses things.')]
      : [p('At the delivery note she stops again, and reads it twice, and puts two fingers flat on it, as if to keep it from getting up and leaving.')]),
    q('Sloane', 'You’re the second. I didn’t know there was a first until the week I met you. I read the word “retired” in this car, three months ago, and I didn’t ask what it meant.'),
  ];
}

function backseatChoices(s: GameState): C8Choice[] {
  const b = (id: 'press' | 'ask' | 'out', label: string, hint: string, body: Block[]) =>
    offer('i8-car-' + id, label, hint, 'afterhours', (x) => {
      setKey(x, 'inst.car', id);
      return body;
    });
  return [
    ...(c(s, 'c6.oracle-seen') === 'yes'
      ? [b('press', '“You read that I’d slip.”', 'The ORACLE page is under her hand.', [q('You', 'You read that I’d slip. And you signed for me anyway.'), q('Sloane', 'I read that the vendor’s system thought so. I have been wrong less often than their system.'), p('But she does not look at you when she says it, and her two fingers are still on the page, and for the first time since Level 71 you see the leash, and whose neck it is round.')])]
      : []),
    b('ask', '“Who was the first?”', 'Ask her straight.', [q('You', 'Who was the first?'), q('Sloane', 'Someone the vendor told us was retired. Now I’ve read the word twice, and I don’t like it any better.'), p('She turns off the reading light. In the dark the two of you sit a hand’s width apart and listen to the rain, and neither of you reaches across it, and neither of you gets out.')]),
    b('out', 'Get out at the lights', 'Walk the rest.', [p('At the lights on the Embankment you open the door and get out into the rain without a word, and she lets you, and does not call after you, and when you look back from the far pavement the reading light is on again and she is reading it all from the beginning.')]),
  ];
}

// ── After hours ──

const inviteLines: Record<Partner, Block[]> = {
  julian: [p('Julian’s flat on the forty-first floor of a building nobody you work for owns.'), q('Julian Mercer', 'Three weeks. You look like somebody who has been reading things she can’t unread. Stay as long as you like. Tell me what you want tonight, and that’s what happens.')],
  sebastian: [p('The Harbour, the late set, one cello, and afterwards the corridor behind the stage, and his hands on your face.'), q('Sebastian', 'You’ve been somewhere cold. Come and be warm. You choose how.')],
};
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };
const stayBody: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you by the window with the city laid out below, and stops exactly where you said, and holds you there with his hand warm on the back of your neck until you stop thinking about a basement full of timers.')],
    sex: [p('He kisses you by the window, and then not by the window. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom.'), p('What happens next is yours and his, in a room no file will ever describe. The scene fades.')],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says out loud what he likes about what he finds, and when you say that is where tonight stops he laughs against your throat and stays exactly there with you.')],
    sex: [p('He undoes the dress slowly and says out loud what he likes, and every word of it lands. When he asks once more, low, whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his. The scene fades.')],
  },
};

function afterhoursBlocks(): Block[] {
  return [p('Friday. The end of three weeks. The floor empties by six and the Feathers fills by seven, and your phone, both of them, are quiet for once.')];
}

function afterhoursChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'i-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[] | ((x: GameState) => Block[])) =>
    offer('i8-evening-' + id, label, hint, 'complete', (x) => {
      set8(x, 'i-evening', id.startsWith('daniel') ? 'daniel' : id);
      return typeof body === 'function' ? body(x) : body;
    });
  if (open === 'daniel')
    return [
      offer('i8-daniel-tell', 'Tell him', 'Who she was. Who sat at that desk.', 'complete', (x) => {
        delete x.choices['c8.i-evening-open'];
        setKey(x, 'inst.daniel-told');
        note(x, 'i-daniel-told', 'Evelynn told Daniel Kessler that she was Adrian Vale.', 'Evelynn, at the Feathers, in her own words');
        return [
          q('You', 'Daniel. The report. It was me. It was always me. I sat at that desk for four years, two desks from you, and I fixed your renewal dates, and you blamed the wine at my leaving do.'),
          p('He does not say anything for a long time. He looks at your hands, and your face, and your hands again, as if the answer were written on them in a hand he used to know. The pub goes on around you, loud and warm and oblivious.'),
          q('Daniel', 'Adrian.'),
          q('You', 'Not any more. But yes.'),
          q('Daniel', 'I need a day. I’m not — it’s not — I just need a day. Is that all right?'),
          q('You', 'Take two.'),
          p('He walks you to the tram anyway, in silence, with his hands in his pockets, and at the stop he looks at you for a long moment with an expression you never once saw on his face in four years, and then he goes home, and you let him.'),
          t('Nobody gets to kiss me under a name I stole. He knows whose mouth it is now. What he does with that is his.'),
        ];
      }),
      offer('i8-daniel-notyet', 'Not yet', 'Walk to the tram.', 'complete', (x) => {
        delete x.choices['c8.i-evening-open'];
        return [p('You say nothing, and finish your drink, and he walks you to the tram with his hands in his pockets, and at the stop he doesn’t lean in, and you wish he had, and you are glad he didn’t, and you ride home with both of those at once.')];
      }),
    ];
  if (open && (open === 'julian' || open === 'sebastian')) {
    const partner = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('i8-' + partner + '-' + id, label, hint, 'afterhours', (x) => {
        set8(x, 'i-evening-open', partner + '-room');
        set8(x, 'i-evening-scope', id);
        note(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[partner], id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s the evening. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('i8-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c8.i-evening-open'];
        set8(x, 'i-evening-outcome', 'declined');
        return [p('You say goodnight and mean it. He does not ask why, and you go home to the green light in the hall.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const scp = get8(s, 'i-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('i8-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c8.i-evening-open'];
        set8(x, 'i-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and means it.')];
      }),
      offer('i8-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c8.i-evening-open'];
        set8(x, 'i-evening-outcome', 'intimate-' + scp);
        return stayBody[partner][scp];
      }),
    ];
  }
  return [
    offer('i8-evening-daniel', 'The Feathers, with Daniel', 'The third Friday.', 'afterhours', (x) => {
      set8(x, 'i-evening', 'daniel');
      set8(x, 'i-evening-open', 'daniel');
      return [
        p('The Feathers, the third Friday, the corner table by the fruit machine that Axiom has sat at since before either of you was born. Daniel buys the first round and apologises for it.'),
        q('Daniel', key(x, 'inst.task.report') === 'shade' ? 'Somebody fixed my report in the night. Page four, and two things on page seven I’d have got wrong next. There was a man who used to do that. I keep thinking about it. I keep thinking about you, if I’m honest, and I don’t know why those are the same thought.' : 'There was a man who used to sit where you sit. I keep thinking about him when I look at you. I don’t know why. You’re nothing like him. You’re exactly like him.'),
      ];
    }),
    ...(c(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Maya', 'Coffee that isn’t from the machine.', [p('Maya, in her kitchen, with the cat on the tax return. She has heard about Benton and Adrian’s file, because compliance hears everything a week late.'), q('Maya', 'Three times. He’s not reading it for the review. He’s reading it for somebody. Be careful whose floor you’re sitting on.')])]
      : []),
    ...partners(s).map((pt) =>
      offer('i8-evening-' + pt, pt === 'julian' ? 'Go to Julian’s' : 'The late set at the Harbour', 'His place.', 'afterhours', (x) => {
        set8(x, 'i-evening', pt);
        set8(x, 'i-evening-open', pt);
        return inviteLines[pt];
      }),
    ),
    done('alone', 'Alone', 'With what you kept.', (x) => [p(key(x, 'inst.file') === 'note' ? 'You sit on the floor of the flat with your back to the wall, under the green light, and unfold the delivery note on your knee, and read it until you know it the way you know your own file number.' : key(x, 'inst.file') === 'copy' ? 'You sit on the floor of the flat with your own phone, the one they don’t log, and go through forty-one pages again, slowly, in the dark.' : 'You sit on the floor of the flat with nothing in your hands, and find that you remember every page anyway.')]),
  ];
}

// ── The second card ──

function completeBlocks(s: GameState): Block[] {
  const col = (v: string[]) => TASKS.filter((t8) => v.includes(key(s, 'inst.task.' + t8) ?? '')).map((t8) => TASK_NAME[t8]).join(', ') || '—';
  return [
    ...(get8(s, 'i-evening-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The green light watches you come in. It does not know where you have been. That is in the contract.')] : []),
    p('The wardrobe door. Under VICTORIA SLOANE. HANDLER., a second card, in three columns, in your own hand:'),
    q('The card', 'DONE: ' + col(['book']) + '. SHADED: ' + col(['shade']) + '. REFUSED: ' + col(['refuse', 'scope']) + '.'),
    p('And under it, in capitals, pressed so hard the pen goes through:'),
    q('The card', 'MERIDIAN · E.V. (I) · RETIRED.'),
    ...(key(s, 'inst.file') === 'note' ? [p('Behind the card, pinned face in, a thin page with a stamp on it that nobody else in the world knows is gone.')] : []),
    ...(get8(s, 'i-dark') === 'torch' ? [p('And under RETIRED, smaller: THE BOX WAS EMPTY. SOMEBODY GOT THERE FIRST.')] : []),
    ...(key(s, 'inst.daniel-told') ? [p('And in the corner, the word you rubbed out three weeks ago, written back in: DANIEL. And after it, in pencil: KNOWS.')] : []),
    t('They bought me from somebody. The somebody has a name now. Tomorrow I find out whose.'),
  ];
}

export function institutionalBlocks8(s: GameState): Block[] {
  if (s.phase === 'rota') return rotaBlocks(s);
  if (s.phase === 'tasked') return [];
  if (s.phase === 'records') return recordsBlocks(s);
  if (s.phase === 'backseat') return backseatBlocks(s);
  if (s.phase === 'afterhours') return afterhoursBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices8(s: GameState): C8Choice[] {
  if (s.phase === 'rota') return rotaChoices(s);
  if (s.phase === 'tasked') return taskedChoices(s);
  if (s.phase === 'records') return recordsChoices(s);
  if (s.phase === 'backseat') return backseatChoices(s);
  if (s.phase === 'afterhours') return afterhoursChoices(s);
  return [];
}
