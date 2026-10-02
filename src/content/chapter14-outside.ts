/** Chapter 14 (Outside route, lane id `outside`) · The Source:
 * seam → reckoning → verdict → source → water → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_14_THE_SOURCE_DESIGN.md (owner-approved 2026-10-01, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_14_SCRIPT.md. Route: docs/story/OUTSIDE_ROUTE_DESIGN.md.
 * Entered through an interim bridge from an Outside `chapter9.complete` until Outside Chapters 10–13 exist (their keys read
 * at defaults). The source-figure's turn: one page the sender shaded (his own initial scraped off the Jakarta handoff copy),
 * caught by the verify or provenance rule or confessed first (out.seam = caught | told). The reckoning on her ground at 02:40:
 * his name, Rafe Lim; the Jakarta list he carried without reading; the Sunday ferry to Batam; the Saturday Meridian sent him
 * away; why he chose her; that he does not know how Nell died (that stays for Act IV). Let him finish / press the lie / stop
 * and verify (out.told, act3.nell = known). Sloane's fate (burn just | burn useful | trade | spare, gated by out.file: bank or
 * burn, or only spare if she left it; act3.sloane = burned | traded | spared). What Rafe is (keep, bounded, with the Jakarta
 * original held | cut, verify and walk | trust, once, with open eyes: out.way14). A chosen night (Rafe only if heard and not
 * cut; a partner from before; Maya; alone), the consent flow, fading at the act; he never makes her Nell. Sloane is a target
 * or a trade, never a romance; nothing here is sexual coercion. Keys under `out.*`, `act3.*`, `c14.*`; ids carry `o14-`.
 * Deepening pass (2026-10-02): three moments, each with a neutral pick that changes no flag. The gap in the Jakarta copy,
 * before she summons him (c14.o-gap = hand | light | ledger: the R from the EXPENSES envelope laid against the scraped place,
 * or recalled if she burned it; the page held to the lamp, the blade marks; or SEAM written in the exercise book against the
 * very first page, whose CHECKED BY has been blank all year). His name, before the reckoning's three ways (c14.o-name = say |
 * write | keep: "Rafe" said aloud, with no half-beat before it; RAFE LIM written on the wall under R.; or left unsaid, kept).
 * The cup, before Sloane (c14.o-cup = tea | window | none: two cups, his held and not drunk; the window opened an inch; or
 * nothing at all, the two of them at the table with the lamp). */
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
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES14 = ['seam', 'reckoning', 'verdict', 'source', 'water'] as const;
export const isOutside14 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase14 = (s: GameState) => isOutside14(s) && ((OUTSIDE_PHASES14 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const rule = (s: GameState, id: string) => (key(s, 'out.rules') ?? '').split(',').includes(id);
const catches = (s: GameState) => rule(s, 'verify') || rule(s, 'provenance');
const way = (s: GameState) => key(s, 'out.way14') as 'keep' | 'cut' | 'trust' | undefined;
const fileState = (s: GameState) => key(s, 'out.file') as 'bank' | 'burn' | 'leave' | undefined;
type Partner = 'rafe' | 'julian' | 'sebastian';
const partnerName: Record<Partner, string> = { rafe: 'Rafe', julian: 'Julian Mercer', sebastian: 'Sebastian' };
const partners = (s: GameState): Partner[] => [
  ...(way(s) && way(s) !== 'cut' ? (['rafe'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];

export function placeOutside14(s: GameState): string | undefined {
  const open = get14(s, 'o-evening-open');
  if (s.phase === 'water' && open) return open.startsWith('rafe') ? 'Before dawn · The room over the water' : open.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
  if (s.phase === 'reckoning') return '02:40 · The room over the water';
}

// ── The entry ──

export function beginOutside14(s: GameState): C14Choice {
  if (s.scene === 'chapter13') return offer('begin-outside', 'The seam', 'Something on the wall does not sit right.', 'seam');
  return offer('begin-outside', 'Go on to the seam', 'This road’s Act III chapters are in development.', 'seam', () => [
    p(
      (s.scene === 'chapter12' ? '[Chapter 13 · outside road — in development] The first Thursday of the next month, and a placement, and a price on a page. ' : s.scene === 'chapter11' ? '[Chapters 12–13 · outside road — in development] His city, her city, a breakfast table set for two. The first Thursday of the next month, and a placement. ' : s.scene === 'chapter10' ? '[Chapters 11–13 · outside road — in development] The Vesper, the first Thursday, and a page with no source. ' : '[Chapters 10–13 · outside road — in development] ') +
        'The winter comes to the room over the water the way it always did: the damp in the corner, the kettle slower, the phone at 02:40. Celeste Laurent’s name, which you found at the end of the bridge, sits on the wall beside MERIDIAN. The red thread. The three pencilled stones: the last person, the last one, what became of her. And a man with no name, who has not missed an hour in a year.',
    ),
  ]);
}

// ── The seam ──

function seamBlocks(s: GameState): Block[] {
  return [
    p('Late, the room over the water, the wall lit by the lamp you keep low. You have taken to standing in front of it the way people stand in front of a painting they cannot place: not reading, just letting the shape come up.'),
    p('The ledger leaf, in a dead woman’s hand: the handoff at 02:40, received by a courier entered only as “R.” And beside it, pinned months ago and never once held against it, the copy he sent with the very first page, the Jakarta handoff, three lines in a different ink.'),
    ...(catches(s)
      ? [
          p('You take them both down. You do what the rule you wrote taught you to do with two pages that claim the same night: you lay them together under the lamp, edge to edge, and you read the spaces between the lines.'),
          p('The Jakarta copy has a gap where the courier’s initial should be. A little gap, the width of a single capital, the paper a shade too smooth there, the way paper is when somebody has taken a blade to it and then breathed on it. The leaf says R. The copy says nothing.'),
          t('A page he shaded. He. After a year of telling me to check, and the one page I never checked was the one he sent first, and he scraped his own name off it.'),
          q('The wall', 'SEAM.'),
        ]
      : [
          p('The phone rings at 02:40, as it always does, and for the first time in a year it rings before you have touched anything on the wall. His voice is the same, flat and shaved, and under it something that is not the disguiser.'),
          q(SENDER, 'There’s a page I doctored. One. I need to tell you why before you find it, because you will find it. You’re the only person who ever checked me.'),
          p('You look at the wall: the leaf, the copy, the three lines in a different ink. You have not found it. You find that you believe him, and that this is exactly what he was afraid of.'),
        ]),
  ];
}

function gapChoices(): C14Choice[] {
  const k = (id: 'hand' | 'light' | 'ledger', label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('o14-gap-' + id, label, hint, 'seam', (x) => {
      set14(x, 'o-gap', id);
      return body(x);
    });
  return [
    k('hand', 'Set the scraped place against a letter you know', 'The R from the EXPENSES envelope.', (x) => [
      x.choices['c7.o-hand'] === 'burn'
        ? p('You reach for the EXPENSES envelope, and remember, with a small cold clarity, that you burned it in the sink in the first week. You draw the R from memory instead, on the back of the copy: the long straight leg, the small careful bowl. You hold it against the scraped place, a width of one capital, and the shape the blade took away is the shape you drew.')
        : p('You take the EXPENSES envelope from the wall and lay it beside the copy, and look at the R, the long straight leg and the small careful bowl, and then at the scraped place, a width of one capital. The shape the blade took away is the shape on the envelope. You had known it for months. It is different on paper.'),
    ]),
    k('light', 'Hold the copy to the lamp', 'Where the paper is too smooth.', () => [p('You hold the copy up to the lamp and tilt it until the light runs along the surface, and there it is: a faint raised scatter of paper-fibre where the blade went, and the small, bright, breathed-on patch beside it, the shape of a capital that has been taken off a page by someone who did not want to be read and could not quite bear to be gone.')]),
    k('ledger', 'Write SEAM in the exercise book', 'Against the very first page. In the column.', () => [p('You open the exercise book to the first page of the first week, the Jakarta copy, and in the right-hand column, headed CHECKED BY, which has stood empty beside it for a year, you write at last, in pencil: SEAM. Then you look at it. It is the first entry in that column that is a finding and not a hope.')]),
  ];
}

function seamChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'o-gap')) return gapChoices();
  return [
    offer('o14-seam-summon', catches(s) ? 'Summon him' : 'Tell him to come here', 'Your room. Your hour. Not the terminal.', 'reckoning', (x) => {
      setKey(x, 'out.seam', catches(x) ? 'caught' : 'told');
      return [
        q('You', catches(x) ? 'You shaded a page. The Jakarta copy. Come to the room. Not the terminal. Mine. Alone.' : 'Then come and tell me in the room. Mine. Not the terminal. And tell me the whole of it, not the page.'),
        q(SENDER, 'Two-forty. I know where it is. I’ve paid the rent on it for a year.'),
        p('You put the phone face down on the table and turn the lamp up, for the first time since you took the room, and put the chair opposite the door.'),
      ];
    }),
  ];
}

// ── The reckoning ──

function reckoningBlocks(s: GameState): Block[] {
  return [
    p('02:40. The iron stair outside, a step you know and have never heard. A knock, which is a courtesy, since he has a key, and has had, you suppose, from the first day.'),
    p('He comes in without the disguiser, without the dark, without the barrier between you. The courier’s jacket, waxed at the cuffs. The good watch on the worn strap. He stands in the lamplight with his hands where you can see them, a man of forty or so who has not slept in a year, and he looks at the wall first, the red thread, the three pencilled stones, and something in his face shifts, the way a man’s face shifts when he sees his own handwriting on someone else’s door.'),
    q(SENDER, 'You’ve kept the stones. I wondered if you would.'),
    ...(key(s, 'out.give10') === 'gave'
      ? [q(SENDER, 'You gave her the terminal. I moved the same night. I would have done the same in your coat, and I need you to hear that I know it.')]
      : key(s, 'out.give10') === 'doctored'
        ? [q(SENDER, 'Somebody stood on Pier Nine in the rain for three hours with a flask. I watched from a doorway. I have not been so happy in years, and I am ashamed of how much.')]
        : key(s, 'out.give10') === 'refused'
          ? [q(SENDER, 'You said no to her over eggs, and I went to ground, and you let me. Nobody has ever not given me up before. I have not known what to do with it since.')]
          : []),
    ...(key(s, 'out.seam') === 'caught'
      ? [p('He looks at the two pages in your hand, the leaf and the copy, the little gap in the paper, and does not pretend.')]
      : []),
    p('And he says it, the thing he has withheld for a year. He says it as if setting down something heavy that he has carried up a great many stairs.'),
    q('Rafe', 'My name is Rafe Lim. I carried a package at two in the morning for a woman called Nell Linden, for three years, on Meridian’s Singapore line. The handoff on your leaf is me. R. is me. I scraped it off the Jakarta copy because a name is the thing they take you apart with, and I didn’t want you to find mine until I’d found out whether you’d stop checking.'),
    t(key(s, 'act3.nell') === 'known' ? 'Nell. Nora’s sister, the one on the harbour wall, in his mouth, said plainly, the way you say the name of someone you have said every day for a year and never aloud.' : 'Nell. He says it plainly, the way you say the name of someone you have said every day for a year and never aloud. Nell Linden. Eleanor. The first one. The woman who wore my name.'),
    ...claremontCallbacks(s),
    ...singaporeCallbacks(s),
    ...vesperCallbacks(s),
  ];
}

function nameChoices(): C14Choice[] {
  const k = (id: 'say' | 'write' | 'keep', label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer('o14-name-' + id, label, hint, 'reckoning', (x) => {
      set14(x, 'o-name', id);
      return body(x);
    });
  return [
    k('say', 'Say it aloud, once', 'Rafe. Without the half-beat.', (x) => [
      q('You', 'Rafe.'),
      p('You say it plainly, and there is no pause before it, none at all, no half-beat of a woman crossing a floor in the dark. It comes out as easily as a word you have said every day. He hears that, and something in his face that has been braced for a year lets go by about an inch.'),
      ...(x.choices['c8.o-walk'] === 'watch' ? [p('You do not say that you once watched him sit among the dryers in a launderette on the far bank, for an hour, with nothing to deliver. That is yours to keep.')] : []),
    ]),
    k('write', 'Write it on the wall', 'RAFE LIM. Under the card that says R.', () => [p('You get up, without a word, and take the pencil, and write on the wall under the card that says R., in capitals, RAFE LIM, the first name on that wall that is not a code. He watches you write it. He does not say anything. It is the only form of witness either of you has ever really trusted.')]),
    k('keep', 'Leave it unsaid, for now', 'Keep it. A name is a thing they take you apart with.', () => [p('You do not say it. You do not write it. You let it sit in the room between you like something set down on a table that neither of you has decided yet whether to pick up, and he sees that, and nods, once, as if you had told him something true: that you intend to be careful with it.')]),
  ];
}

function reckoningChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'o-name')) return nameChoices();
  const r = (id: 'finish' | 'press' | 'verify', label: string, hint: string, body: Block[]) =>
    offer('o14-reck-' + id, label, hint, 'verdict', (x) => {
      set14(x, 'o-reck', id);
      setKey(x, 'out.told');
      setKey(x, 'act3.nell', 'known');
      note(x, 'o-rafe', 'The sender gave his name, Rafe Lim, and said he was the courier “R.” on the ledger leaf, Nell Linden’s courier on Meridian’s Singapore line. He does not know how she died.', 'Rafe, in the room over the water, 02:40');
      return [...body, ...theRest];
    });
  return [
    r('finish', 'Let him finish', 'Say nothing. The way he taught you to wait.', [p('You say nothing at all. You sit with your hands flat on the table and let him have the whole of it, the way he taught you to wait across a table from a person who is about to tell you the truth and has to get there on their own. It takes a long time. He does not hurry, and you do not help.')]),
    r('press', 'Press the lie first', 'Before the grief. Why that page. Why your own initial.', [
      q('You', 'Before any of the rest. Why that page. Why hide your own initial.'),
      q('Rafe', 'Because the first page was a test. If you checked it, I’d know you checked, and I’d have to tell you what you’d find. If you didn’t, I’d know you were her. I wanted you to find it. I didn’t want to be the one holding the paper when you did.'),
      q('You', 'That is the worst reason I have ever heard for lying to a person.'),
      q('Rafe', 'It’s the only one I had. Everyone else I ever lied to, I did it for money. You, I did it for a year of sleep.'),
    ]),
    r('verify', 'Stop him, and check', 'The ferry. The tickets. The job that pulled him out.', [
      q('You', 'Stop. Everything you are about to say, I’m going to check before I let myself believe it. The ferry. The tickets. The job that pulled you out of the country. Give me what I can check.'),
      p('He stops. He nods, once, as if you have said the first thing he has wanted to hear in a year. He takes a folded square of paper from the lining of his jacket, soft with handling: two ferry tickets, Singapore to Batam, a Sunday, both unused.'),
      q('Rafe', 'Good. Check me. She didn’t, and look.'),
      p('You turn the tickets over. A date, a sailing, a stamp from a booth that closed that spring. You verify them, there at the table, against two things on the wall, while he waits. They hold.'),
    ]),
  ];
}

/** What the placement cost (Ch13) comes back in his mouth. */
function claremontCallbacks(s: GameState): Block[] {
  const a = key(s, 'c13.answer');
  return [
    ...(a === 'complied'
      ? [q('Rafe', 'I did not ask what happened on the Thursday. I read you the shipping forecast and I did not ask. I have been ashamed ever since that the price was me.')]
      : a === 'refused'
        ? [q('Rafe', 'They found my lodging on the Friday, two men with a clipboard. I was in a launderette on the other side of the river, at the dryers, reading a paper. I have never been so glad of a launderette. You said no, and it cost me a flat. I have never been so happy to pay a bill.')]
        : a === 'countered'
          ? [q('Rafe', 'You took my ledger to Marsh. Every page in my hand. He has kept my name off every one of them, and I did not think anybody would. I should like to shake his hand some day, in daylight.')]
          : []),
  ];
}

/** What happened in his city (Ch12) comes back in his mouth. */
function singaporeCallbacks(s: GameState): Block[] {
  const nora = key(s, 'out.nora12');
  const asked = key(s, 'out.asked12');
  return [
    ...(nora === 'with'
      ? [q('Rafe', 'You sat me at Nora’s table, and she looked straight at me and did not know me. Three years I was her sister’s Postman, and she never once saw my face. I will remember that look until I die. I would not take it back.')]
      : nora === 'gate'
        ? [q('Rafe', 'I stood under her frangipani while you were inside, with my back to the house, and I did not turn round once. I have never been so close to anything I wanted and been so unable to go in.')]
        : []),
    ...(asked === 'ask'
      ? [q('Rafe', 'You asked me at Nora’s gate. I said before the first Thursday. This is before the first Thursday. This is me keeping it.')]
      : asked === 'wait'
        ? [q('Rafe', 'You did not ask me at Nora’s gate. I have been grateful for that every day since, and ashamed that I let you not.')]
        : []),
  ];
}

/** What she did at the Vesper (Ch11) comes back in his mouth. */
function vesperCallbacks(s: GameState): Block[] {
  const ph = key(s, 'out.photo11');
  const sl = key(s, 'out.slip11');
  return [
    ...(ph === 'photo'
      ? [q('Rafe', 'You sent me her face. I have not shown it to anyone. I keep it where I keep nothing else. I wanted you to know that before I asked you for anything else.')]
      : ph === 'heart'
        ? [q('Rafe', 'You told me about the eyebrow. Nobody who had not looked at her could have known the eyebrow. I have thought about it every night since.')]
        : ph === 'turned'
          ? [q('Rafe', 'You turned the page. You were right to. I have been ashamed since of having asked, and I have not once been sorry that you said no.')]
          : []),
    ...(sl === 'read'
      ? [t('You were never going to be on the ferry. I read that line on a landing at the Vesper, in her hand, and did not know what ferry. I know now. I know exactly which.')]
      : sl === 'passed'
        ? [q('Rafe', 'You passed me a page from her. I read it where she couldn’t see me read it. It said I was never going to be on the ferry. You didn’t know what you were carrying. I knew it was bait, and I walked toward it for a week anyway.')]
        : sl === 'burned'
          ? [q('Rafe', 'The page you burned. I know what it said, because she sent it again, by post, three days later. I am grateful you did not make me read it first in your hand.')]
          : []),
  ];
}

const theRest: Block[] = [
  q('Rafe', 'The package on the leaf, the one she missed her breakfast to bring me: that was the Jakarta list. The people Meridian was about to burn, and the order to do it. I carried it without reading it. Three years I never read a thing I carried. That was the job. I read that one every day for the year after.'),
  q('Rafe', 'We had two tickets on the Sunday ferry to Batam. She’d said yes. Out. The Saturday, a courier job came down that I couldn’t refuse, a man in Rotterdam, three days, a man who knew exactly what I’d be leaving. I think that was the point. She walked down to the harbour wall that night, to a meeting I was supposed to be at. I wasn’t. I was in a hotel in a country I’d never seen.'),
  q('Rafe', 'I don’t know how she went into the water. Nobody’s told me. Nobody who knows will. A week later she was found there, and the file said misadventure, and I have been trying to find the one person who can say what actually happened for three years, and I can’t get into a single room that person lives in.'),
  q('Rafe', 'Meridian reissued the legend. That means they’ll put the new Evelyn in the same rooms. The Vesper. The breakfast. Celeste. I could never get in. You could. So I chose you. I fed you true pages and one false one and I watched you check, and when you checked, I let myself hope.'),
  t('He doesn’t know. After all of it, after the ferry and the list and the Saturday, he does not know how she died. That is what he wants. That is why he chose me. And the only person who can tell him is somewhere I will have to go.'),
];

// ── The verdict: Sloane ──

function verdictBlocks(s: GameState): Block[] {
  const f = fileState(s);
  return [
    p('Before dawn, the lamp, the two of you at the table and the wall behind. There is a thing between you that you both know about and neither has mentioned: a file you did not ask for, and what is to be done with a woman in a machine.'),
    ...(f === 'bank'
      ? [p('You have it, behind the skirting, with the hard drive: Victoria Sloane, every posting, every assessment, the ORACLE note, the reprimand that never came. A door you might need.')]
      : f === 'burn'
        ? [p('He has it. You sent it back to him, marked read, in a trade, and he has been holding it for you for weeks with the patience of a man who never throws anything away.')]
        : [p('You sent it back unread, weeks ago, and you are glad, and you are also, tonight, aware that you have no lever on Victoria Sloane at all.')]),
    q('Rafe', f === 'leave' ? 'She’s nobody’s to burn, now. You made sure. I think that was the best thing either of us did this year.' : 'She signed. You know that, and I know that. What you do with a woman who signed is the thing you will carry longest. I’ll help you carry it, or I’ll stay out of it. Tell me which.'),
  ];
}

function cupChoices(): C14Choice[] {
  const k = (id: 'tea' | 'window' | 'none', label: string, hint: string, body: Block[]) =>
    offer('o14-cup-' + id, label, hint, 'verdict', (x) => {
      set14(x, 'o-cup', id);
      return body;
    });
  return [
    k('tea', 'Put the kettle on', 'Two cups. His, in both hands.', [p('You put the kettle on, because it is four in the morning and there is a man at your table, and you make two cups of tea and put one in front of him, and he holds it in both hands the way he holds a crate, and does not drink it, and looks at it as if nobody had made him a cup of anything in a very long time. Which, you suspect, is exactly the case.')]),
    k('window', 'Open the window an inch', 'For the river.', [p('You open the window an inch. The river comes in, cold and brown and smelling of mud and diesel and the beginning of day, and the lamp gutters once and recovers. He closes his eyes for a moment as the air reaches him, the way a man does who has been in a closed room for a year without noticing the lack of weather.')]),
    k('none', 'Nothing at all', 'The lamp. The two of you. The table.', [p('You do nothing. You do not make tea and you do not open a window. You sit at the table with the lamp between you and the wall behind, and let the silence be the length it wants to be, and it turns out that two people can sit in a silence for a very long time when neither of them is lying.')]),
  ];
}

function verdictChoices(s: GameState): C14Choice[] {
  if (!get14(s, 'o-cup')) return cupChoices();
  const holds = fileState(s) === 'bank' || fileState(s) === 'burn';
  const v = (id: string, label: string, hint: string, act3: 'burned' | 'traded' | 'spared', out: 'burn' | 'trade' | 'spare', body: Block[], extra?: (x: GameState) => void) =>
    offer('o14-sloane-' + id, label, hint, 'source', (x) => {
      setKey(x, 'act3.sloane', act3);
      setKey(x, 'out.sloane', out);
      extra?.(x);
      return body;
    });
  return [
    ...(holds
      ? [
          v('burn-just', 'Burn her, because she signed', 'The inquiry, the regulator, the audit committee. All on one Tuesday.', 'burned', 'burn', [
            p('You send it on a Tuesday, to three desks at once: a regulator’s inbox, a journalist who has been waiting a year for a page like this, and Axiom’s own audit committee, so that nobody can say they were not told. Victoria Sloane signed for a product she was told she could not keep, and then she countersigned the next one. The page says so. You send it exactly as it is.'),
            t('Just. I tell myself the word and I do not look at it too closely. A woman who signed. A woman who was also handed the product with the verdict already on it. Both of those are in the file, and I send both.'),
          ], (x) => setKey(x, 'out.burn', 'just')),
          v('burn-useful', 'Burn her, to draw the eye off Rafe', 'A fire so nobody looks at a courier.', 'burned', 'burn', [
            p('You send it for a different reason: because a fire draws the eye, and as long as Meridian is busy with the officer of record, nobody is looking for the courier who has been sending her pages. You time it for the morning after the audit committee meets, and you pick the desks that will shout loudest.'),
            q('Rafe', 'That’s not justice.'),
            q('You', 'No. It’s useful. I’ll let you decide, later, which of those I should be ashamed of.'),
          ], (x) => setKey(x, 'out.burn', 'useful')),
          v('trade', 'Trade her to Axiom', 'For one thing: call off whatever is hunting the courier.', 'traded', 'trade', [
            p('You send nothing to a regulator and nothing to a paper. You send one line, by the old route, to the one person at Axiom who can pick up a phone: that you hold Victoria Sloane’s file, and that it will stay in a drawer, if somebody stops looking for a courier on Meridian’s Singapore line.'),
            q('Rafe', 'You’re bargaining my life with a woman’s file.'),
            q('You', 'I’m bargaining your life with a file she keeps in a drawer anyway. She keeps her post. You keep your skin. It’s the cleanest trade on the wall.'),
          ]),
        ]
      : []),
    v('spare', 'Spare her', holds ? 'Leave Victoria Sloane alone. A person in the machine.' : 'Your rule, honoured. A woman’s file stays unread.', 'spared', 'spare', [
      p(holds ? 'You leave the file where it is, behind the skirting, and tell him so, and he looks at you for a long moment, the way a man looks at a person who has done the one thing he could not do.' : 'You do not need to decide. You made that choice weeks ago, and tonight it is only confirmed.'),
      q('You', 'She’s a person in the same machine. I’ve met her. I won’t make her the proof.'),
      q('Rafe', 'Then I won’t either. You’ll keep more of yourself that way than I kept of me.'),
    ]),
  ];
}

// ── The source: what Rafe is ──

function sourceBlocks(): Block[] {
  return [
    p('The window has gone from black to the colour of a bruise, and the river is beginning to have edges. You have heard a man’s whole life in three hours, and checked a part of it, and decided about a woman you may never meet again. One thing left. The oldest question on the wall, in your own hand: WHO IS HOLDING THE PAGE?'),
    q('Rafe', 'Now the one that’s yours. What am I to you? I won’t argue with any of them. I’ve earned all three.'),
  ];
}

function sourceChoices(): C14Choice[] {
  const w = (id: 'keep' | 'cut' | 'trust', label: string, hint: string, body: Block[], extra?: (x: GameState) => void) =>
    offer('o14-way-' + id, label, hint, 'water', (x) => {
      setKey(x, 'out.way14', id);
      extra?.(x);
      return body;
    });
  return [
    w('keep', 'Keep him, on your terms', 'Every page with its provenance. The Jakarta original, in your keeping.', [
      p('You tell him the terms, and you hold the Jakarta original while you say them, the page with the scraped gap, the one with his name taken off it. He has put it on the table himself, and you have not touched it yet.'),
      q('You', 'You get me into the rooms. Every page from now with where it came from, or I don’t take it. And I hold this. The one page that is you.'),
      q('Rafe', 'That’s the first fair price anyone’s offered me. I accept. And — thank you for keeping it. I never could.'),
    ], (x) => {
      setKey(x, 'act3.nell-order', 'taken');
    }),
    w('cut', 'Cut him, and verify everything', 'Keep only what you proved. Walk away from the source.', [
      p('You tell him, as gently as you have ever told anyone anything, that you are going to go back through the wall and keep only the pages you proved yourself, and that you will not take another from him, and that you will do the rest alone.'),
      q('Rafe', 'That’s your door.'),
      q('You', 'It’s the one I wrote into the rules the first day. You said you’d like me to be able to use it.'),
      q('Rafe', 'I did. I meant it.'),
      p('He stands, and puts the ferry tickets on the table, and does not ask for them back, and goes down the iron stair at a quarter to five, and you do not watch him go. You write on the wall, in pencil, under WHO IS HOLDING THE PAGE?: me.'),
    ]),
    w('trust', 'Trust him, once', 'With open eyes. Forgive the page, knowing it is a choice.', [
      p('You tell him you forgive the page. Not because it was nothing: because you have decided to, and a decision is the only kind of trust you can still afford, and you want him to know it is a decision and not an accident.'),
      q('You', 'Once. With my eyes open. If there’s a second false page, there’s no third conversation.'),
      q('Rafe', 'There won’t be a second. And I’ll give you the one thing I’ve never given anybody.'),
      p('He takes the original from his jacket, the page with the gap where his name was, and puts it into your hand, and closes your fingers on it with his own.'),
    ], (x) => {
      setKey(x, 'act3.nell-order', 'taken');
      if (key(x, 'out.alliance.rook') === 'owed' || key(x, 'out.alliance.rook') === 'creditor') setKey(x, 'out.alliance.rook', 'square');
    }),
  ];
}

// ── The night ──

const inviteLines: Record<Partner, Block[]> = {
  rafe: [
    p('The room goes quiet in the way it does when the thing that has been standing between two people for a year is gone. He has not moved. He is looking at you the way a man looks at somebody he has only ever heard.'),
    q('Rafe', 'One thing first, before anything. If I ever say her name when I mean yours, stop me. I will, once, by accident. It’s the thing I’m most afraid of. You’re not her. Don’t let me forget it.'),
    q('Rafe', 'Tell me what you want, and that’s what happens.'),
  ],
  julian: [p('Julian’s flat, late, and his careful not-asking about where you have been at five in the morning.'), q('Julian Mercer', 'You look like somebody who’s been told the truth and has to carry it home. Stay. Tell me what you want tonight, and that’s what happens.')],
  sebastian: [p('Sebastian, after the late set, who takes one look at your face and does not play you anything sad.'), q('Sebastian', 'You’ve heard something heavy and it’s still on you. The hotel’s round the corner, or I walk you to the water. You choose.')],
};
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  rafe: { 'no-sex': 'Then that’s the night. You set the edge, and I stay on my side of it. And I’ll say your name, the one you’ve got.', sex: 'Yes. And you say stop, it stops. The same for me. And whichever name you give me tonight, I’ll use it, and only that.' },
  julian: { 'no-sex': 'Then that’s the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  sebastian: { 'no-sex': 'Good. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stayBody = (s: GameState, pt: Partner, sc: 'no-sex' | 'sex'): Block[] => {
  if (pt === 'rafe') {
    const trusting = way(s) === 'trust';
    return sc === 'sex'
      ? [
          p(trusting ? 'He kisses you the way you open a letter you have read a hundred times and are afraid to find different: slowly, and then with a rush of relief that is almost funny, and he laughs against your mouth, and says your name, the one you gave him, and nothing else.' : 'He kisses you carefully, like a man who has been given something on terms and means to honour them, and when you pull him closer, he says your name, only yours, as though setting it down.'),
          p('What happens next is yours and his, in a room nobody has ever watched, with the river going grey at the window. The scene fades.'),
        ]
      : [p('He kisses you slowly by the window while the dark goes out of the river, and stops exactly where you said, and holds you there, and you stand like that, two people who have been alone with the same dead woman’s paper for a year, and for one night are not.')];
  }
  const stay: Record<'julian' | 'sebastian', Record<'no-sex' | 'sex', Block[]>> = {
    julian: {
      'no-sex': [p('He kisses you slowly with the city behind you, and stops exactly where you said, and holds you there until the cold comes off you and you are only tired.')],
      sex: [p('He kisses you and the night goes off you like a coat, and he asks once more, his mouth at your shoulder, and you answer by drawing him toward the bedroom.'), p('What happens next is yours and his. Nobody is watching this one. The scene fades.')],
    },
    sebastian: {
      'no-sex': [p('He undoes the dress slowly and says what he likes, and when you say that is where tonight stops he laughs against your throat and stays there.')],
      sex: [p('He undoes the dress slowly, and when he asks once more whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room no one has ever watched. The scene fades.')],
    },
  };
  return stay[pt][sc];
};

function waterBlocks(): Block[] {
  return [p('Before dawn, and nothing left to decide that cannot wait for light. You are very tired, and the room is very quiet, and there is the question of who, if anyone, you want near you at the end of a night like this.')];
}

function waterChoices(s: GameState): C14Choice[] {
  const open = get14(s, 'o-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o14-evening-' + id, label, hint, 'complete', (x) => {
      set14(x, 'o-evening', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('o14-' + partner + '-' + id, label, hint, 'water', (x) => {
        set14(x, 'o-evening-open', partner + '-room');
        set14(x, 'o-evening-scope', id);
        note(x, 'o-evening-consent', `Evelynn chose the night’s scope (${id}); ${partnerName[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      scope('sex', partner === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('o14-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c14.o-evening-open'];
        set14(x, 'o-evening-outcome', 'declined');
        return [p(partner === 'rafe' ? 'You say goodnight, and mean it, and he nods, once, at the door, as though you had given him something rather than withheld it, and goes down the iron stair.' : 'You say goodnight and mean it, and go home to the room over the water, and the wall, and the thread.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get14(s, 'o-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('o14-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c14.o-evening-open'];
        set14(x, 'o-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you until the light comes.')];
      }),
      offer('o14-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c14.o-evening-open'];
        set14(x, 'o-evening-outcome', 'intimate-' + sc);
        return stayBody(x, partner, sc);
      }),
    ];
  }
  return [
    ...(key(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Maya, who came', 'She heard the terminal meeting go long.', [
          p('Maya at the door at five, with a flask and a cardigan over her pyjamas, because she has been awake all night too and had a feeling.'),
          q('Maya', 'You look like you’ve been told something true. I hate that look. I always have.'),
          q('You', 'Sit down. I’ll tell you what I can.'),
          p('She sits on the end of the bed with her feet up, and you tell her what you can, and nobody writes anything down.'),
        ])]
      : []),
    ...partners(s).map((pt) =>
      offer('o14-evening-' + pt, pt === 'rafe' ? 'Rafe, if he stays' : pt === 'julian' ? 'Go to Julian’s' : 'The late set at the Harbour', pt === 'rafe' ? 'The first easy thing in a year. He never makes you her.' : pt === 'julian' ? 'His place. Warm, and off the grid.' : 'Sebastian. One cello, and afterwards.', 'water', (x) => {
        set14(x, 'o-evening', pt);
        set14(x, 'o-evening-open', pt);
        return inviteLines[pt];
      }),
    ),
    done('alone', 'Alone, with a name on the wall', 'Write it in.', [p('You stay alone at the table while the light comes. When it is bright enough, you take the pencil and write, under the three stones, the first name you have been given that is not a code: NELL. And beside it, smaller, the second: RAFE. You look at the two of them for a long time.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const w = way(s);
  const sl = key(s, 'out.sloane');
  return [
    ...(get14(s, 'o-evening-outcome')?.startsWith('intimate') ? [p('You wake in the grey, in the room over the water, with the wall behind you and nothing having watched any of it.')] : []),
    p('The wall over the table. A third card, in capitals.'),
    q('The card', 'THE SOURCE.'),
    q('The card', w === 'cut' ? 'HIS NAME. I DON’T KEEP IT.' : 'RAFE LIM. R. ON THE LEAF.'),
    p(sl === 'burn' ? 'Under it: SLOANE · BURNED.' : sl === 'trade' ? 'Under it: SLOANE · TRADED. THE COURIER LIVES.' : 'Under it: SLOANE · SPARED.'),
    p('And under that, the next line, which is a door:'),
    q('The card', w === 'cut' ? 'THE VESPER · BY THE STAIR. ALONE.' : w === 'trust' ? 'THE VESPER · BY THE COURIER’S DOOR. TOGETHER.' : 'THE VESPER · BY THE COURIER’S DOOR. MY TERMS.'),
    q('The card', 'LINDEN, E.'),
    t(w === 'cut' ? 'I kept only what I proved. It is not much. It is mine, and it holds, and I will find the rest myself.' : w === 'trust' ? 'I forgave a page, once, with my eyes open. If he lies again there is no third conversation. But for tonight the voice has a name, and a hand, and a wound I recognise.' : 'I hold the one page that is him. He gets me into the rooms. We both know what it weighs.'),
  ];
}

export function outsideBlocks14(s: GameState): Block[] {
  if (s.phase === 'seam') return seamBlocks(s);
  if (s.phase === 'reckoning') return reckoningBlocks(s);
  if (s.phase === 'verdict') return verdictBlocks(s);
  if (s.phase === 'source') return sourceBlocks();
  if (s.phase === 'water') return waterBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices14(s: GameState): C14Choice[] {
  if (s.phase === 'seam') return seamChoices(s);
  if (s.phase === 'reckoning') return reckoningChoices(s);
  if (s.phase === 'verdict') return verdictChoices(s);
  if (s.phase === 'source') return sourceChoices();
  if (s.phase === 'water') return waterChoices(s);
  return [];
}
