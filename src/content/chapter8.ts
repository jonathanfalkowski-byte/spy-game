/** Chapter 8 (own-power, played as the Celebrity route) · The Cost Bites: cost → leverage (one crossover decision, then
 * its scene) → advance → close. Additive in revision 19 after Chapter 7's own-power ending, gated behind
 * chapter8Playable(). Wording and flags: docs/story/scripts/CHAPTER_8_OWN_POWER_SCRIPT.md with its Phase 0 decisions,
 * deepened by the heat-and-danger pass (docs/story/BEAT_MAP.md). Each road over the wall sets the same flags it always
 * did, then opens a scene (held in c8.leverage-open) with one choice of its own. own.crossover changes access, never
 * route.lane. No intimacy in this chapter beyond a line from a partner she already chose.
 * Deepening pass 2 (2026-09-24): the cost is played (the break-in: lock / trap / report; the week's money: pay /
 * sell the gown / Odile's advance / let it run), the client list is a choice (reading it finds VALE, E. returned to
 * inventory), and the night after answers both.
 * Set pieces (2026-09-24): the break-in is walked room by room, every road's scene and its choice are played through,
 * the list arrives as a page, and the night after has a moment of its own (c8.night: watch the street, walk to
 * Meridian's brass plate, or sleep).
 * New scenes (2026-09-24), in cost after the money: the work (Odile's shoot if she took the campaign, else a
 * freelance reading at a small firm; c8.work = give | hold, c8.work-kind = shoot | desk), where Laurent's money is
 * glimpsed for the first time; then the bank, where her account turns out to sit under a corporate relationship she
 * never opened (c8.bank = cash | new | leave).
 * New scenes, round 2 (2026-09-24): after the break-in, Mrs Kowalczyk across the landing says "your friend" let herself
 * in with a key (c8.neighbour = ask | warn | thank; asking gets a tall woman with close-cropped hair, a fact); and, if
 * her face is public, a Sunday Courier reporter at her door the night after the list (c8.hack = line | meridian | door).
 * New scenes, round 3 (2026-09-24): Bishop on the fire escape (cost, after the bank: binoculars in the flat opposite;
 * c8.bishop = stare | photo | cat), and the landline at 3 a.m. (close, after the night: Mrs Tan from Emerald Hill,
 * the flat emptied by men in white gloves; asking brings the tall lady who took the white orchid; c8.call).
 * Sequence (2026-09-25), "Emerald Hill": the day after the list, Lotte (Chapter 7's c7.lotte; if she was denied on the
 * bridge, a card under the door) brings nine photographs of the first Evelynn. Where they meet (c8.lotte-meet = cafe |
 * home), what she asks (c8.lotte-ask = work | c | last), what she takes (c8.photos = all | one | back; all is a fact).
 * Held in c8.lotte-open (invite → ask → take) in advance, before close.
 * Sequence (2026-09-25), "The Wake": on the tram home from Lotte, a notice: drinks in Adrian's memory at the Anchor,
 * tonight. She goes in as a stranger or as a friend, or stands at the window (c8.wake = stranger | friend | window);
 * inside, somebody asks how she knew him (c8.knew = close | work | nothing); then Daniel's toast (c8.toast = drink |
 * speak | leave). Maya drinks from his chipped mug if she is back. A grey coat across the street. Held in c8.wake-open
 * (go → inside → toast) in advance, before close.
 * Sequence (2026-09-25), "The Spare Key": after the wake, Adrian's spare key (from the jacket lining, Chapter 7) takes
 * her over the river to Number 14. She rings Kemi, lets herself in, or posts the key back (c8.key = ring | in | post;
 * posting ends it). Inside, his hiding place behind the skirting board has been screwed shut and stickered SERVICED,
 * D.P. (c8.board = open | leave; a fact either way), and then the key itself (c8.spare = keep | kemi | river). Held in
 * c8.key-open (go → board → spare) in advance, before close.
 * Restructuring pass (2026-09-25): each sequence is its own phase with its own title and place, its lead-in that
 * phase's opening: cost (break-in, neighbour, money) → work (the shoot or the desk; the bank) → fireescape (Bishop) →
 * leverage → advance (the list) → emerald (Lotte) → wake → number14 (the spare key) → close (the reporter, the night)
 * → call (the landline) → complete. Choice ids are unchanged.
 * Sequence (2026-09-25), "Maintenance" (its own phase, Thursday, after the bank): Mr Pryce at her door with a tool
 * bag, "to look at your boiler". She lets him in, talks through the chain, or sends him away (c8.pryce = in | chain |
 * away; away ends it); then what she asks him (c8.pryce-talk = owner | window | tea). He names himself either way, so
 * Bishop's binoculars (Saturday) and Chapter 9's knock know him. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5, julian5 } from './chapter5-model';
import { get6 } from './chapter6-model';
import { get7, getKey, setKey } from './chapter7-model';
import { sloaneDoubts } from './sloane-standing';

export type C8Scene = { title: string; place: string; blocks: Block[] };
export type C8Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get8 = (s: GameState, k: string) => s.choices['c8.' + k];
export const set8 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c8.' + k] = v;
};
const offer8 = (id: string, label: string, hint: string, next: string, apply?: C8Choice['apply']): C8Choice => ({
  id: 'chapter8.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter8Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER8 === '1';

function note8(s: GameState, key: string, text: string, source: string) {
  if (get8(s, 'rec.' + key) !== undefined) return;
  set8(s, 'rec.' + key, String(s.history.length));
  set8(s, 'event.' + key, String(s.revision));
  set8(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c8.' + key);
  s.knowledge.push('c8.' + key);
}

export const DIG_COST = 120;
/** The week's ordinary costs (deepening pass 2): the phone, the fees, the coffee drunk standing up. */
export const WEEK_COST = 90;
export const LOCK_COST = 60;
export const GOWN_PRICE = 400;
export const ODILE_ADVANCE = 300;
const LOW_CASH = 100;
const cash = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);
const SENDER = 'Unknown sender';

export const chapter8Definitions: Record<string, C8Scene> = {
  cost: { title: 'The Cost Bites', place: 'DAYS LATER · ON YOUR OWN', blocks: [] },
  work: { title: 'The Working Week', place: 'WEDNESDAY · AT WORK', blocks: [] },
  maintenance: { title: 'Maintenance', place: 'THURSDAY · YOUR KITCHEN', blocks: [] },
  fireescape: { title: 'Bishop', place: 'SATURDAY · THE FIRE ESCAPE', blocks: [] },
  leverage: { title: 'Over the Wall', place: '· THE CHOICE', blocks: [] },
  advance: { title: 'What It Was Hiding', place: '· THE SHAPE', blocks: [] },
  emerald: { title: 'Emerald Hill', place: 'NEXT DAY · WITH LOTTE', blocks: [] },
  wake: { title: 'The Wake', place: '18:00 · THE ANCHOR, HARBOUR STREET', blocks: [] },
  number14: { title: 'The Spare Key', place: 'LATE · NUMBER 14, ACROSS THE RIVER', blocks: [] },
  close: { title: 'Whose Door', place: '· THAT NIGHT', blocks: [] },
  call: { title: 'The Landline', place: '03:10 · THE HALL', blocks: [] },
  complete: { title: 'The Next Room', place: '· LATER', blocks: [] },
};
export const chapter8Scenes = Object.entries(chapter8Definitions).map(([phase, scene]) => ({
  id: `chapter8.${phase}` as NodeId,
  ...scene,
}));

/** Scene-specific place lines while a road's scene is open (display only). */
export function place8(s: GameState): string | undefined {
  if (s.scene === 'chapter8' && s.phase === 'work')
    return get8(s, 'work') ? 'Thursday · The bank' : onCampaign(s) ? 'Wednesday · The tram sheds' : 'Wednesday · Pell & Rourke';
  if (s.scene === 'chapter8' && s.phase === 'wake' && get8(s, 'wake'))
    return get8(s, 'wake') === 'window' ? '18:00 · Outside the Anchor, Harbour Street' : '18:00 · The Anchor, Harbour Street';
  if (s.scene === 'chapter8' && s.phase === 'emerald' && get8(s, 'lotte-meet'))
    return get8(s, 'lotte-meet') === 'home' ? 'Next day · Lotte’s flat, the old docks' : 'Next day · A café by the river';
  if (s.scene !== 'chapter8' || s.phase !== 'leverage') return;
  return {
    audience: '21:00 · The Harbour winter gala',
    rook: '07:50 · Axiom Tower lobby',
    editor: '23:30 · Aster Review, after hours',
    maya: '22:00 · The counter near Compliance',
    executive: '22:15 · Helix, the contracts room',
    institutional: 'Late · The back of Sloane’s car',
    dig: '02:10 · The commercial registry, night terminal',
  }[get8(s, 'leverage-open') ?? ''];
}

// ── Blocks ──

/** Chapter 7's choice about her notes, answered by the break-in (c7.notes). */
function notesAfterBreakIn8(s: GameState): Block[] {
  const notes = get7(s, 'notes');
  if (notes === 'hide')
    return [
      p('You go to the wardrobe with your heart hammering and put your hand inside the lining of Adrian’s old jacket. The notes are still there, folded twice, exactly as you left them. Whoever squared your papers did not think to search a dead man’s coat.'),
    ];
  if (notes === 'burn')
    return [t('There was nothing on paper to find. They squared the bills and the Aster proofs and went away with nothing, and they will know that means it is all in my head.')];
  if (notes === 'maya')
    return [t('They found nothing here worth taking. Maya has the only copy. If they came for the notes, they will think of her next, and it was me who put her on the list.')];
  return [];
}

function costBlocks(s: GameState): Block[] {
  const low = cash(s) < LOW_CASH;
  // Meridian is named here only if she found it herself in Chapter 7; advance names it for everyone.
  const frame = getKey(s, 'own.piece.records')
    ? `The thread from last week points somewhere you cannot follow on foot. The authorization sits above Sloane, at Meridian and whoever sits on its board — and Meridian is a closed shell with no public face and no door you can pay to open. ${low ? 'You count your money again and it counts back shorter than it did.' : 'You have a little runway left, and a wall in front of it.'}`
    : 'The thread from last week points up, past Sloane, to something you cannot name yet — a signature you never found, an authority above the woman you’ve been fearing. You know it is there. You do not know what it is called. That is the wall.';
  const partner = get7(s, 'evening-outcome')?.startsWith('intimate') ? get7(s, 'evening') : undefined;
  return [
    p('You come home late and stop in the doorway. Nothing is missing. The papers are on the table where you left them, squared to the edge now, the way you never square anything. The window you always leave an inch open is shut. The room smells, very faintly, of a cigarette nobody in this building smokes.'),
    p('You go through the flat room by room with every light on, the way you would walk a building you were about to buy. The bathroom: your things where you left them, the toothbrush in its glass. The bedroom: the bed made the way you made it, badly. The wardrobe: the dresses on their hangers, every one of them facing the same way. You never hang them all facing the same way.'),
    ...notesAfterBreakIn8(s),
    t('Someone wanted me to know they could. That is worse than someone wanting me not to know.'),
    p('You sit down on the edge of the bed in your coat and do not take it off for a long time.'),
    p(frame),
    ...(partner === 'julian'
      ? [p('Julian sends one line after midnight: “Still thinking about the window.” You read it three times and don’t answer, and not answering is its own answer.')]
      : partner === 'sebastian'
        ? [p('A postcard arrives from the second of Sebastian’s four cities. No message: only a staff of music in his hand, the middle section, the new version. You tuck it into the frame of the mirror.')]
        : partner === 'theo'
          ? [p('Theo sends one line the next evening: “The pad was blank, by the way. I know you didn’t turn it over. I’d have liked you less if you had.”')]
          : []),
    t('This is the part they meant when they said independence was expensive. Not the money, or not only. Some rooms will not open for someone with no institution behind her, and I chose to be someone with no institution behind her.'),
    ...(getKey(s, 'own.exposed')
      ? [
          p('Sloane does not send a message. When you come down the next morning her car is at the kerb, engine running, the rear window lowered two inches.'),
          q('Sloane', 'You have been asking who authorized reusing her. I know, because you asked it where I could hear. I am not going to tell you to stop. I am going to tell you that you are about to walk into something with no cover, and that I could give you cover, and that you should think hard about why I would offer. Get in when you are ready. Not today, if you like.'),
          ...(sloaneDoubts(s)
            ? [q('Sloane', 'One condition. At the Glass House you gave me a name on a guess, and it happened to be right. If you get in this car, you do not guess again. You bring me what you have, or you bring me nothing.')]
            : []),
          p('The window goes up. The car pulls away. She has left you her card on the step, face down, as if it might be read by the wrong person.'),
          t('Help, or a leash held out as help. From what I found last week, Sloane may be as much inside this as I am — which makes the offer either the truest thing anyone has said to me, or the most useful lie. I cannot tell yet. That is the trap of it.'),
        ]
      : [p('Nobody has come to you yet. Whoever let themselves into the apartment has not introduced themselves, and no help is offered, because no one knows you need it. That is its own kind of alone. The wall is still there, and it is yours to get over quietly.')]),
  ];
}

const roadLine: Record<string, string> = {
  audience: 'Keel said more than he meant to, and the filings did the rest.',
  rook: 'The sender’s page does most of the work; the rest you check twice.',
  editor: 'The reporter’s filing peels the last layer back.',
  maya: 'Maya’s category turns out to be exactly the right key.',
  executive: 'The contract on Julian’s wall names its counterparty in full.',
  institutional: 'Sloane’s tablet shows you more than she meant to, or exactly as much.',
  dig: 'The slow dig gets there, one filing at a time, a day later than you wanted.',
};

function advanceBlocks(s: GameState): Block[] {
  const crossed = (getKey(s, 'own.crossover') ?? 'none') !== 'none';
  const allyPaid = getKey(s, 'own.alliance.rook') === 'spent' || getKey(s, 'own.alliance.editor') === 'spent';
  return [
    p(`${roadLine[get8(s, 'entered') ?? 'dig']} On the other side of the wall the shape is waiting, and it is bigger than you feared and smaller than you hoped. Meridian Holdings is not Helix. It is not Axiom. It is a private concern that builds operations — identities, legends, whole manufactured people — and sells them to whoever can pay. Project Eve is a product. Axiom is a client. Sloane is a client’s officer.`),
    p('You read the words product and client three times each, the way you would test a floorboard before you put your weight on it.'),
    p('Then the list itself. It comes as these things always come in the end: a single page, plain type, no letterhead, the kind of document a company keeps precisely because it can never show it to anyone.'),
    p('And the client list does not stop at Axiom. Halfway down the page, in the same plain type, is Helix.'),
    t('I was never Axiom’s asset, or Sloane’s. I am Meridian’s product, sold on. Whoever authorized reusing her authorized it as a vendor reusing stock. And the company that paid me to review its acquisitions buys from the same vendor. That is the coldest thing I have learned yet, and I learned it myself.'),
    p(
      crossed
        ? 'You know it because someone opened a door for you. You will not forget who, or that you needed them to.'
        : 'You know it because you would not let anyone open the door for you. It cost you, and no one can take it back or hold it over you.',
    ),
    ...(allyPaid ? [p('And it cost the ally, too — a marker called, a patience spent. Help is not free either; you only chose which kind of not-free.')] : []),
  ];
}

/** The night after: the break-in, answered by what she did about it; the money, by what she did about that. */
function nightAfter8(s: GameState): Block[] {
  const breakin = get8(s, 'breakin');
  const money = get8(s, 'money');
  return [
    ...(breakin === 'trap'
      ? [
          p('Before bed you check the trap. The hair across the wardrobe door is gone. In the talc inside the threshold there is one print: narrow, a good shoe, a woman’s size, pointing in.'),
          t('They came back. They wanted something they did not find the first time, and they walk like someone who has never once been told no.'),
        ]
      : breakin === 'locks'
        ? [p('The new key is warm from your pocket. The old one is still in somebody else’s.')]
        : breakin === 'report'
          ? [p('The letter from the managing agents is still on the table. You read it again before bed, the way you would reread a threat, and it reads the same both times.')]
          : []),
    ...(money === 'owing'
      ? [p('The invoices are still in the drawer. So is the week, getting shorter.')]
      : money === 'advance'
        ? [p('Odile’s office has sent the fitting time twice. You have not answered either. You will.')]
        : money === 'sell'
          ? [p('There is a gap in the wardrobe where the gown hung. You keep looking at it.')]
          : []),
  ];
}

function closeBlocks(s: GameState): Block[] {
  const crossed = (getKey(s, 'own.crossover') ?? 'none') !== 'none';
  return [
    ...nightAfter8(s),
    p('You have the shape now: a private maker of people, a board above Sloane, one name on it you are almost sure you have met. What you do not have is the name, or the why, or a single institution you can trust to hold any of this but yourself.'),
    t(
      `Standing alone got me here — to a truth an institution would have buried, held by no one but me.${crossed ? ' Except I did not stand entirely alone this time, and I know it.' : ''} The next room is the one with the name in it, and I will decide then whose door I walk through to reach it.`,
    ),
    ...(hackComes(s) ? hackLead : []),
  ];
}

// ── The Sunday reporter (new scene, round 2): only if her face is public ──

const hackComes = (s: GameState) => !!get5(s, 'published') && !get8(s, 'hack');
const hackLead: Block[] = [
  p('Late as it is, there is a knock: a man on your doorstep with a notebook, which nobody carries any more, and the smile of somebody who has been told no by better people than you.'),
  q('Rafe Collis', 'Rafe Collis, the Sunday Courier. We’re running something this weekend about women who appear from nowhere. Beautiful ones. No school, no family, no dentist, and then suddenly on the side of a bus. You’re in it either way. I thought you’d like to give me your side.'),
];

function hackChoices(): C8Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('hack-' + id, label, hint, 'close', (x) => {
      set8(x, 'hack', id);
      return body;
    });
  return [
    answer('line', 'Give him one line', 'Make it good enough that he stops looking.', [
      q('You', 'I came from exactly where everybody comes from, Mr Collis. I just didn’t bring it with me.'),
      p('He writes it down, and reads it back to himself, and looks almost disappointed at how good it is.'),
      q('Rafe Collis', 'That’s the headline, then. You’ve made my Sunday.'),
      t('And his readers will spend Sunday wondering where I came from. So will whoever else reads the Courier.'),
    ]),
    answer('meridian', 'Give him somewhere else to look', 'Meridian. A company that appeared from nowhere too.', [
      q('You', 'If you want something that appeared from nowhere, Mr Collis, try Meridian Holdings. It owns half the river and nobody has ever seen its face.'),
      p('His pen stops.'),
      q('Rafe Collis', 'That’s not a story about you.'),
      q('You', 'No. It’s a better one.'),
      p('He looks at you for a long time. Then he writes the name down, underlines it twice, and goes without saying goodbye, which you decide to take as a compliment.'),
      t('I have just set a dog on them. I don’t know yet whose leg it will bite.'),
    ]),
    answer('door', 'Close the door', 'Gently. In the middle of his sentence.', [
      p('You close the door, gently, in the middle of his next sentence. Through it you hear him laugh, and then his feet going down the stairs, unhurried: a man with a story either way.'),
      t('He is right. I am in it either way.'),
    ]),
  ];
}

export function chapter8Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter8') return [];
  if (s.phase === 'cost') return costBlocks(s);
  if (s.phase === 'work') return workLead(s);
  if (s.phase === 'maintenance') return maintLead;
  if (s.phase === 'fireescape') return bishopLead(s);
  if (s.phase === 'advance') return advanceBlocks(s);
  if (s.phase === 'emerald') return lotteLead(s);
  if (s.phase === 'wake') return wakeLead;
  if (s.phase === 'number14') return keyLead;
  if (s.phase === 'close') return closeBlocks(s);
  if (s.phase === 'call') return callLead;
  if (s.phase === 'complete')
    return [p('You lie awake with it. Tomorrow you go looking for the name. Tonight you hold what it cost to get this far.')];
  return [];
}

// ── The crossover decision ──

function over(x: GameState, entered: string, crossover: 'none' | 'executive' | 'institutional') {
  setKey(x, 'own.crossover', crossover);
  set8(x, 'entered', entered);
  set8(x, 'leverage-open', entered);
}

/** One ally, by priority: the sender's debt, then the editor she met, then Maya within her public scope. */
function ally(s: GameState): 'rook' | 'editor' | 'maya' | undefined {
  if (getKey(s, 'own.alliance.rook') === 'owed') return 'rook';
  if (get5(s, 'editor-contact')) return 'editor';
  if (get6(s, 'maya') === 'restored') return 'maya';
  return undefined;
}

function leverageChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'leverage-open');
  if (open) return sceneChoices(open);
  const c: C8Choice[] = [];
  if (get5(s, 'published'))
    c.push(
      offer8('leverage-audience', 'Smoke them out in public', 'The Harbour winter gala. Aim your visibility at a closed door — and be more seen than ever.', 'leverage', (x) => {
        over(x, 'audience', 'none');
        setKey(x, 'own.exposed', 'yes-deep');
        x.npcs.sloane.known.push({ key: 'The independent one has made Meridian a public question.', source: 'Evelynn’s public questions about a closed company', event: x.revision });
        return [
          p('The Harbour winter gala is three hundred people in black, a string quartet nobody is listening to, and a list of guests your editor sent over with one name circled: Tobias Keel, who sits on the boards of companies that do not advertise, and who has asked, twice, to be introduced to you.'),
          p('You wear the green. It is the kind of dress that makes a room decide something about you before you have said a word, and you let it. By the time you reach the bar, Keel is already there, silver at the temples and very sure of his welcome.'),
          q('Tobias Keel', 'Evelynn Vale. You are much more dangerous in person. I was warned.'),
          t('Everyone here knows my face. One of them knows who made it. I have perhaps an hour before someone decides I have asked one question too many.'),
        ];
      }),
    );
  const who = ally(s);
  if (who === 'rook')
    c.push(
      offer8('leverage-rook', 'Spend an ally · call the debt with the sender', 'You owe them. They will tell you what the debt costs.', 'leverage', (x) => {
        over(x, 'rook', 'none');
        setKey(x, 'own.alliance.rook', 'spent');
        note8(x, 'rook-debt', 'The sender collected the debt: Evelynn watched who in Sloane’s office moved when her question surfaced, in exchange for one page of Meridian’s offshore board.', 'The sender, collecting in kind');
        return [
          q(SENDER, 'You owe me one, and this is how you pay it. At eight tomorrow I let it be known, in a place Sloane reads, that you are asking about Meridian. You stand in the Axiom lobby and you watch who comes down in a hurry. Then you tell me. Then you get a page of Meridian’s board.'),
          p(
            `At ten to eight you are in the Axiom lobby in a borrowed coat and dark glasses, ${get5(x, 'published') ? 'a face half the lobby has seen in a magazine' : 'a woman nobody here would think to look at twice'}, pretending to wait for somebody. At 08:04 the lift opens and one of Sloane’s aides crosses the floor almost at a run, phone to her ear, and goes out into the rain without an umbrella.`,
          ),
          t('Now I know something the sender wants. The question is whether I give it to them straight.'),
        ];
      }),
    );
  if (who === 'editor')
    c.push(
      offer8('leverage-editor', 'Spend an ally · put a reporter on it', 'Aster’s editor has a reporter who can peel a corporate veil. It costs the ally something.', 'leverage', (x) => {
        over(x, 'editor', 'none');
        setKey(x, 'own.alliance.editor', 'spent');
        return [
          p('Aster’s office after hours is one lamp and a bottle of something the editor keeps for occasions. The reporter she has brought in, Clara Duvall, is small and unhurried and has spent twenty years filing for things people would rather stayed sealed. She listens to you for ten minutes without writing anything down.'),
          q('Clara Duvall', 'It’s a strange little company you’ve found. It doesn’t sell anything you can buy. Give me a week and I’ll tell you who it sells to.'),
          p('It takes four days. On the fifth, a lawyer’s letter arrives at Aster addressed to the editor, polite and specific, about a story nobody has written yet. And Clara comes back with the shell peeled one layer, a real counterparty underneath.'),
          q('Clara Duvall', 'They know I’m looking. That usually means I’m right. It also means this is the point where you decide whether I print.'),
        ];
      }),
    );
  if (who === 'maya')
    c.push(
      offer8('leverage-maya', 'Spend an ally · ask Maya what she can say', 'The late counter near Compliance. She can name a category, not a person.', 'leverage', (x) => {
        over(x, 'maya', 'none');
        setKey(x, 'own.alliance.maya', 'used');
        return [
          p('The counter near Compliance, late, the steam and the noise and your old stools. Maya is already there. She has ordered for both of you, and she has chosen the seat facing the door.'),
          q('Maya', 'I can’t touch it, but I can tell you what it isn’t. No public products, an offshore board — that’s not a government arm and not a normal corporate subsidiary. It’s a private contractor. Someone builds things and sells them quietly. That’s as far as I go.'),
          p('Then, quieter, with her eyes on the door: someone from her own department asked her last week, casually, whether she was still in touch with “Adrian’s friend, the one in the magazine”. She said no. She is not sure they believed her.'),
          t('Every time I come to her for help, I leave her a little more visible. I have to decide what she is to me now: someone I lean on, or someone I keep out of range.'),
        ];
      }),
    );
  if (julian5(s))
    c.push(
      offer8('leverage-executive', 'Take Julian’s access, once', 'He can get you into the Helix room where Meridian’s shape is visible. It works — and puts you back inside a door someone else holds.', 'leverage', (x) => {
        over(x, 'executive', 'executive');
        note8(x, 'crossover', 'Evelynn re-entered a provider’s door once: Julian’s access to a Helix room. Her road is unchanged; her standing paid for it.', 'Julian’s access, taken by choice');
        return [
          p('Julian does not ask why. He signs you in at a quarter past ten, after the floor has emptied, and walks you to a room you could never have entered alone: a long table, a wall of framed contracts, the city pressing against the glass. He stands close enough that you can feel the warmth of him at your shoulder while you read, and does not touch you.'),
          q('Julian Mercer', 'You are not here for me. I know that. I find I don’t entirely mind.'),
          p('The third contract from the left names its counterparty in full, and the word is Meridian. Then footsteps in the corridor: a security round, early, a torch sweeping the frosted glass. Julian puts himself between you and the door without a word.'),
          t('Everyone I want is standing next to something I am trying to find. I have perhaps thirty seconds.'),
        ];
      }),
    );
  if (getKey(s, 'own.exposed'))
    c.push(
      offer8('leverage-institutional', 'Accept Sloane’s cover', 'Get in her car. She’ll show you who’s above her. Believe her at your peril.', 'leverage', (x) => {
        over(x, 'institutional', 'institutional');
        note8(x, 'crossover', 'Evelynn accepted Sloane’s cover to see Meridian’s board. The dependency is recorded; Sloane’s motive is not.', 'Sloane’s offer, taken by choice');
        return [
          p('You call the number on the card. That night the car is at the kerb again, and this time you get in. The rear seat is dark leather and very quiet. Sloane is in the far corner, legs crossed, a tablet face down on her knee, and for the first minute neither of you says anything while the city slides past the tinted glass.'),
          q('Sloane', 'I am going to show you something I should not have. When I do, you will understand that I am not the top of this. What you do with that is yours.'),
          p('She turns the tablet over. Meridian’s board, or enough of it: names you half-know, an offshore address, a column of client codes. She does not flinch at what it means for her. Her hands, you notice, are not quite still.'),
          t('Either she is as trapped as I am, or she is walking me exactly where she wants me. I have the length of this drive to decide which.'),
        ];
      }),
    );
  c.push(
    offer8('leverage-refuse-cross', 'Refuse the shortcut; find the hard way', 'No borrowed doors. The night terminal at the registry. It costs you more and it stays yours.', 'leverage', (x) => {
      over(x, 'dig', 'none');
      // Never blocked: short of the cost, the dig is recorded unpaid and cash clamps at 0.
      const before = cash(x);
      set8(x, 'dig-fee', before >= DIG_COST ? 'paid' : 'unpaid');
      setKey(x, 'own.cash', String(Math.max(0, before - DIG_COST)));
      note8(x, 'dig', before >= DIG_COST ? `Spent $${DIG_COST} on the slow self-funded dig. Own cash: $${before - DIG_COST}.` : `The $${DIG_COST} dig is unpaid; own cash was $${before}.`, 'Filings, fees and time, paid by Evelynn');
      return [
        p('You do it the long way. The commercial registry keeps a night terminal for lawyers on deadline, and at two in the morning it is you, a vending machine, and a security guard asleep behind his paper. Every search costs. On the fourth one your card is declined, and you pay the rest in coins, one at a time, while the machine counts them back to you.'),
        p('You are not the only one here. Two terminals down, a man in a good coat is pulling filings with the patience of someone paid by the hour. When you glance at his screen, the name at the top is the same as yours: Meridian Holdings.'),
        t('Someone else is climbing the same wall tonight. I can find out who, or I can leave before he finds out who I am.'),
      ];
    }),
  );
  return c;
}

/** Each road's own choice. Every one leads over the wall to advance; the flags record how. */
function sceneChoices(open: string): C8Choice[] {
  const done = (id: string, label: string, hint: string, key: string, value: string, blocks: Block[]) =>
    offer8(id, label, hint, 'advance', (x) => {
      delete x.choices['c8.leverage-open'];
      if (key.startsWith('own.')) setKey(x, key, value);
      else set8(x, key, value);
      return blocks;
    });
  switch (open) {
    case 'audience':
      return [
        done('gala-dance', 'Dance with Keel and let him talk', 'Charm, and let him feel clever. You will be photographed in his arms.', 'gala', 'dance', [
          p('He dances well and knows it. You let him lead, and you let him talk, which is what men like Keel want more than anything, and somewhere in the second waltz he tells you, as a joke, that he sits on a board that meets in a place where nobody can subpoena the minutes. He names the town. He names the company. He does not notice he has done it.'),
          p('A flash from the balcony. Tomorrow there will be a photograph of you in his arms, and the caption will say something about a new romance. Let it.'),
          p('When the music stops he kisses your hand, which nobody has done since you became somebody whose hand gets kissed, and tells you he will call. You smile the Glass House smile. You are already writing down the name of the town in your head, over and over, so it cannot fall out.'),
        ]),
        done('gala-carpet', 'Ask it on the red carpet', 'Put the question to the cameras. Loud, public, impossible to take back.', 'gala', 'carpet', [
          p('On the way out, a dozen lenses and a woman from a morning show with a microphone. You stop. You look straight down the barrel of the nearest camera and ask, pleasantly, whether anyone in the room tonight could tell you who owns Meridian Holdings, since nobody seems able to. Behind you, you hear Keel’s glass go down on a tray a little too hard.'),
          p('By the time you are home the clip has been watched forty thousand times. By the morning a closed company has three reporters asking for comment, and one of its directors has stopped answering his phone.'),
          p('At two in the morning your own phone lights with a message from a number you don’t know: a photograph of the red carpet, taken from the balcony, with a circle drawn round your face in red. No words. None needed.'),
        ]),
      ];
    case 'rook':
      return [
        done('debt-true', 'Tell the sender exactly what you saw', 'Pay the debt honestly. The sender will trust you further.', 'rook-report', 'true', [
          p('You give it straight: the aide, the time, the door, the rain. The page arrives within the hour, one sheet of Meridian’s offshore board, and a line under it: “Straight dealing. I remember that.”'),
          t('Whoever that aide was running to, I have just handed them to a stranger. I tell myself the stranger already knew. I don’t believe it.'),
        ]),
        done('debt-false', 'Give the sender a different name', 'Protect whoever that aide was running to. If they check, they will know you lied.', 'rook-report', 'false', [
          p('You give them a different floor, a different woman, a different time. The page still arrives, one sheet of Meridian’s offshore board. There is no line under it this time. You tell yourself that means nothing.'),
          t('I lied to the only source who has never lied to me. For a woman I saw for four seconds crossing a lobby in the rain. I would do it again, and I don’t know why.'),
        ]),
      ];
    case 'editor':
      return [
        done('press-run', 'Let her print what she finds', 'The story runs. Meridian is named in public, and so is the fact that you started it.', 'press', 'run', [
          p('“Print it,” you say. Clara nods once, as if you had passed a test, and goes to work. The piece runs in the next issue under her name, careful and sourced, and yours is nowhere in it. It does not need to be. Anyone who matters will know where the question came from.'),
          p('The editor sends you the first copy off the press by courier, still smelling of ink, with a note in the margin in her tidy hand: “You owe me nothing now. I find I mind that.”'),
        ]),
        done('press-hold', 'Ask her to hold it', 'Keep the finding private for now. Clara will not wait forever.', 'press', 'hold', [
          p('“Not yet,” you say. Clara looks at you for a long moment and then puts the folder in her bag. “I’ll hold it,” she says, “until I can’t.” It is the most honest promise anyone has made you in weeks.'),
          t('Until she can’t. Somewhere there is a date on that, and I don’t know it, and neither does she.'),
        ]),
      ];
    case 'maya':
      return [
        done('maya-away', 'Tell her to stay away from you for a while', 'Keep her out of range. It will hurt you both.', 'own.maya-distance', 'away', [
          p('“Stop meeting me,” you say. “For a while. Until this is over.” She stares at you across the steam. Then she nods, and pays for both bowls before you can stop her, and leaves first, the way you asked, without looking back. You sit there until the noodles go cold.'),
          t('I did the right thing. It feels exactly like the other thing.'),
        ]),
        done('maya-close', 'Let her stay close', 'She chose this. Trust her to know the risk.', 'own.maya-distance', 'close', [
          p('“I’m not going to tell you to stay away,” you say. “You’d ignore me anyway.” She laughs, properly, for the first time tonight. “Same counter,” she says. “Same seat. I’ll keep facing the door.”'),
          t('She is braver than I am. She always was. She just never had anything to be brave about, until me.'),
        ]),
      ];
    case 'executive':
      return [
        done('room-photo', 'Photograph the page', 'Proof you can keep. If the guard sees the phone, Julian pays for it.', 'room', 'photo', [
          p('You lift the phone and take the page in two frames while the torch sweeps closer. Julian opens the door himself before the guard can, blocks it with his shoulders, and says something easy and bored about a late meeting. The guard apologises. When the corridor is empty again, Julian lets out a breath and looks at the phone in your hand, and says nothing at all.'),
          p('In the lift on the way down he stands on the far side of the car with his hands in his pockets, watching the numbers. At the ground floor, as the doors open, he says, to the doors: “Next time, tell me first.” It is not a reproach. It is an invitation, and you both know it.'),
        ]),
        done('room-read', 'Only read it, and keep his hands clean', 'Memorise what you can. Nothing on the phone, nothing to find.', 'room', 'read', [
          p('You read the page twice, fast, and put it back exactly as it hung. When the guard’s torch finds the glass, there is nothing to see but a Helix director and a woman in a good coat, standing a little too close together in an empty room. The guard apologises and moves on. Julian does not step back right away.'),
          p('Neither do you. For the length of a breath the room is very quiet, and the city is very bright below it, and the counterparty’s name is going round and round in your head like a coin in a funnel, and his hand is not quite touching yours.'),
        ]),
      ];
    case 'institutional':
      return [
        done('car-ask', 'Ask her why she really took this on', 'Sloane has never answered a direct question. Ask one.', 'sloane', 'asked', [
          p('“Why did you sign it?” you ask. “You knew it wouldn’t hold me.” Sloane is quiet for so long you think she will not answer. Then: “Because the alternative was someone worse holding you. I thought I could at least be the one who let go.” She turns the tablet face down again. It is the first thing she has told you that you almost believe.'),
          p('The car stops outside your building. She does not look at you as you get out. As the door closes you hear her tell the driver, in a voice you have never heard her use, to take the long way.'),
        ]),
        done('car-watch', 'Say nothing; watch her hands', 'Let her talk, or not. Learn from what she can’t control.', 'sloane', 'watched', [
          p('You say nothing. The car turns along the river. Sloane talks about access and cover and what you will owe, and her voice never changes, but her thumb keeps moving along the edge of the tablet, over and over, the whole way. When the car stops outside your building, you understand that she is afraid, and that it is not of you.'),
          t('Sloane, afraid. I have spent weeks being afraid of her. It never occurred to me to wonder who she was afraid of.'),
        ]),
      ];
    default:
      return [
        done('dig-watch', 'Find out who he is', 'Watch what he pulls and follow him out. Riskier, and you learn who else is looking.', 'dig-rival', 'seen', [
          p('You wait until he prints, and read the header on his page as he folds it: a law firm whose name you have seen on the letterhead of Meridian’s registered agent. Meridian is checking who else has been reading its filings. When he leaves, he looks at you for exactly one second too long.'),
          p('You follow him as far as the lobby. He buttons his good coat at the door, turns his collar up against the rain, and, without looking back, lifts one hand, as if to say goodnight to someone he knows is there.'),
        ]),
        done('dig-leave', 'Take what you have and go', 'Leave before he looks up. Safe, and you never learn who he was.', 'dig-rival', 'unseen', [
          p('You gather your printouts and leave by the side door before he looks up. Outside, the city is empty and wet and yours. You have what you came for, a day later than you wanted, paid for in coins.'),
          t('I will never know who he was. That is either the safest thing I have done this month, or the thing I will regret. I will find out which.'),
        ]),
      ];
  }
}

// ── The cost, made concrete ──

function weekIntro(x: GameState): Block[] {
  return [
    p('Then the ordinary costs arrive, the way they do, all at once.'),
    p(
      `The week comes to $${WEEK_COST}: the phone that answers only to you, the fees you keep paying at registry counters, the coffee you drink standing up. You have $${cash(x)}. ${
        cash(x) >= 500
          ? 'It sounds like a lot until you divide it by a number of months nobody will tell you.'
          : cash(x) >= WEEK_COST
            ? 'Enough for this week. Not for many more, and nothing coming in that you can touch before the end of the month.'
            : 'Not enough, and nothing coming in that you can touch before the end of the month.'
      }`,
    ),
    t('Adrian had a salary and a pension and a manager who signed his expenses. I have what I earn and what I can sell, and every day the life I chose sends me an invoice.'),
  ];
}

// ── The neighbour (new scene, round 2) ──

const neighbourLead: Block[] = [
  p('In the morning Mrs Kowalczyk from across the landing stops you by the lift. She is eighty-one and takes in everybody’s parcels, and she has a cat called Bishop who is not allowed out and gets out anyway.'),
  q('Mrs Kowalczyk', 'Your friend came. The day before yesterday, in the afternoon. I told her you were out, and she said she knew, she had a key. Lovely manners. Such a coat.'),
  t('My friend.'),
];

function neighbourChoices(): C8Choice[] {
  const talk = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer8('neighbour-' + id, label, hint, 'cost', (x) => {
      set8(x, 'neighbour', id);
      after?.(x);
      return [...body, ...weekIntro(x)];
    });
  return [
    talk('ask', 'Ask her what your friend looked like', 'Lightly. As if you had several friends with keys.', [
      q('Mrs Kowalczyk', 'Tall. Taller than you. Hair very short, like a boy’s, but on her it was elegant, you know how some women can. She asked after Bishop by name. I don’t know how she knew his name.'),
      p('She laughs, pleased, as if it had been a charming trick.'),
      t('Tall, with her hair cropped close. I have met one woman who looks like that. She told me I had disappeared before breakfast.'),
    ], (x) => note8(x, 'friend', 'Mrs Kowalczyk saw a tall woman with close-cropped hair let herself into Evelynn’s flat with a key on the afternoon of the break-in. She called herself a friend.', 'Mrs Kowalczyk, across the landing')),
    talk('warn', 'Ask her not to open her door to anyone', 'Frighten her a little. It may keep her safe.', [
      q('You', 'Mrs Kowalczyk, if anyone comes again, anyone at all, don’t open your door. Ring me.'),
      p('She looks at you over her glasses for a long moment. She has lived eighty-one years, and some of them, you remember, were not in this country, and were not easy.'),
      q('Mrs Kowalczyk', 'I know that look. I had it once. Yes. I will ring.'),
    ]),
    talk('thank', 'Thank her, and say nothing', 'She is eighty-one. Keep her out of it.', [
      p('You thank her, and ask after Bishop, and say nothing about keys. She is eighty-one. She has a cat. Whatever is happening to you does not need to happen to her too.'),
      t('Anybody who can let themselves into my flat can let themselves into hers.'),
    ]),
  ];
}

function breakInChoices(s: GameState): C8Choice[] {
  const records = !!getKey(s, 'own.piece.records');
  const deal = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer8('breakin-' + id, label, hint, 'cost', (x) => {
      set8(x, 'breakin', id);
      return [...body(x), ...neighbourLead];
    });
  return [
    deal('locks', 'Change the lock yourself, tonight', `$${LOCK_COST} you can’t really spare.`, (x) => {
      const before = cash(x);
      setKey(x, 'own.cash', String(Math.max(0, before - LOCK_COST)));
      note8(x, 'lock', before >= LOCK_COST ? `Spent $${LOCK_COST} on a new lock. Own cash: $${before - LOCK_COST}.` : `The $${LOCK_COST} lock is unpaid; own cash was $${before}.`, 'A night locksmith, paid by Evelynn');
      return [
        p('The locksmith who answers at eleven at night is a tired woman with a van and no curiosity, which is what you are paying for. She takes the old cylinder out, turns it under her torch and shows you its face: clean, no scratches, no marks.'),
        q('Locksmith', 'Nobody picked this. Somebody opened it with a key. Yours, or one just like it.'),
        p(
          records
            ? 'You think of the filings: Meridian Holdings, behind the building and everything in it. Of course they have a key. They have all the keys.'
            : 'You think of everyone who could have a key to a flat that was furnished for you before you ever arrived, and stop, because the list is too long.',
        ),
        p('She fits the new cylinder in eleven minutes and gives you three keys on a ring. On her way out she looks at your door, and the corridor, and you, and says the only unprofessional thing she says all night.'),
        q('Locksmith', 'Get a chain as well, love. Keys are for people who ask first.'),
        t('Sixty dollars to make them use a different door. It is still worth it.'),
      ];
    }),
    deal('trap', 'Set a trap and say nothing', 'Talc on the floor, a hair across the wardrobe. You’ll know if they come back.', () => [
      p('You do it the way a novel would tell you to, and feel foolish doing it: a hair laid across the wardrobe door, a breath of talc on the boards inside the threshold, the old Axiom phone propped on the bookshelf recording the room to nobody.'),
      t('If they come back, I want them to find the flat exactly as they left it. And I want to know they came.'),
      p('You lie awake afterwards listening to the building: the lift, the pipes, a door two floors down. Every sound is a key in a lock. None of them is yours.'),
    ]),
    deal('report', 'Report it to the building', 'Make it official, and see who answers.', () => [
      p('The night concierge writes it down with great care and no expression, in a ledger with a green cloth spine, and turns the ledger round for you to sign. The line above yours, from three weeks ago, is a complaint about a dog. In the morning there is a letter under your door on heavy cream paper from the managing agents: they have reviewed the entry logs, there has been no unauthorised access to your apartment, and they trust this reassures you.'),
      p(
        records
          ? 'The letterhead’s registered address is the one you photographed at the registry: Meridian’s agent, the company that exists to have no face.'
          : 'The letter is signed by nobody. Only a company name you have never heard of, and a registered address in a building of brass plates.',
      ),
      t('Reassured. They wanted me to know they had checked, and that the checking was theirs to do.'),
    ]),
  ];
}

function moneyChoices(s: GameState): C8Choice[] {
  const settle = (id: string, label: string, hint: string, apply: (x: GameState) => Block[]) =>
    offer8('money-' + id, label, hint, 'work', (x) => {
      set8(x, 'money', id);
      return apply(x);
    });
  const pay = (x: GameState, income: number, source: string) => {
    const before = cash(x) + income;
    setKey(x, 'own.cash', String(Math.max(0, before - WEEK_COST)));
    note8(
      x,
      'week',
      `${income ? `Received $${income} (${source}); spent` : 'Spent'} $${WEEK_COST} on the week. Own cash: $${Math.max(0, before - WEEK_COST)}.`,
      'Evelynn’s own accounts',
    );
  };
  const campaign = getKey(s, 'own.campaign');
  return [
    settle('pay', 'Pay it', `$${WEEK_COST}. Clean, and thinner.`, (x) => {
      pay(x, 0, '');
      return [
        p('You pay it all on Friday morning at the bank machine with your coat collar up, and watch the number get smaller. It is a very ordinary kind of fear. You find you prefer it to the other kind.'),
        p('The man behind you in the queue is reading the paper. Your face is on page nine. He does not look up from it long enough to notice that it is standing in front of him, taking out money like anybody else.'),
      ];
    }),
    settle('sell', 'Sell the evening gown', `Someone will pay $${GOWN_PRICE} for it. It was hers first.`, (x) => {
      pay(x, GOWN_PRICE, 'the evening gown');
      return [
        p('The dress agency on the hill takes one look at the gown and stops pretending to be casual. Four hundred, cash. The woman behind the counter holds it up against the window light and says, “She had beautiful taste,” and does not say who she means.'),
        p('You walk home down the hill with the money in an envelope inside your coat, past the window of the shop, where by the time you look back they have already put the gown on a mannequin with no face.'),
        t('I am selling her off a piece at a time to pay for looking for her. There is probably a word for that. I would rather not know it.'),
      ];
    }),
    ...(campaign === 'taken' || campaign === 'terms'
      ? [
          settle('advance', 'Ask Odile for an advance', 'She’ll say yes. She will also remember that you asked.', (x) => {
            pay(x, ODILE_ADVANCE, 'an advance against the campaign');
            setKey(x, 'own.odile', 'owed');
            return [
              q('Odile Frayne', 'Of course, darling. Three hundred, against the campaign. I like my faces fed.'),
              p('The money is in your account before you have finished your coffee. So is a calendar invitation to a fitting you did not agree to, which you accept, because you have just been paid.'),
              t('That is how it starts. A small kindness, and then a diary that is not quite mine.'),
            ];
          }),
        ]
      : []),
    settle('owing', 'Let it run a week', 'Nothing now. It will still be there.', () => [
      p('You put the invoices in a drawer and close it, and the closing sounds exactly like a decision.'),
      p('The phone company sends a polite reminder on Tuesday and a less polite one on Thursday. You read both standing at the counter, eating toast, and feel almost nothing, which frightens you more than the letters do.'),
      t('A week. In a week I will either have the name, or I will be looking for work.'),
    ]),
  ];
}

// ── Maintenance (sequence): Mr Pryce, in her kitchen ──

const maintLead: Block[] = [
  p('At four there is a knock, and a voice through the door, pleasant and unhurried: “Maintenance.”'),
  p('Through the spyhole: a grey coat, a tool bag, a face you have seen in a lift. He waits with his hands folded in front of him, the way men stand at funerals.'),
  q('Man at the door', 'Pryce, Ms Vale. From the agents. They’ve asked me to look at your boiler.'),
  t('My boiler is fine. He knows my boiler is fine.'),
];

function maintChoices(s: GameState): C8Choice[] {
  const how = get8(s, 'pryce');
  if (!how)
    return [
      offer8('pryce-in', 'Let him in, and watch him work', 'Your kitchen. Your eyes on him the whole time.', 'maintenance', (x) => {
        set8(x, 'pryce', 'in');
        return [
          p('You take the chain off and stand aside. He comes in, wipes his feet twice, and goes straight to the cupboard where the boiler is without asking where it is.'),
          p('He works with his back to you, unhurried, in his shirtsleeves, the grey coat folded over a kitchen chair. You lean on the counter and watch every single thing his hands do.'),
        ];
      }),
      offer8('pryce-chain', 'Talk through the chain', 'He can service the door, then.', 'maintenance', (x) => {
        set8(x, 'pryce', 'chain');
        return [
          p('You leave the chain on. He does not seem to mind. He puts his tool bag down on the landing and talks to you through four inches of door, as if this were how he always did business, and perhaps it is.'),
        ];
      }),
      offer8('pryce-away', 'Send him away', '“Another time, Mr Pryce.”', 'fireescape', (x) => {
        set8(x, 'pryce', 'away');
        return [
          q('You', 'Another time, Mr Pryce.'),
          q('Pryce', 'Of course.'),
          p('He picks up his bag and goes without argument, and at the turn of the stairs he says, not unkindly, over his shoulder:'),
          q('Pryce', 'It’s your flat, Ms Vale. For as long as it is.'),
        ];
      }),
    ];
  const inside = how === 'in';
  const talk = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('talk-' + id, label, hint, 'fireescape', (x) => {
      set8(x, 'pryce-talk', id);
      return [
        ...body,
        p(
          inside
            ? 'He finishes, or pretends to, and packs his bag, and on his way out he peels a small white sticker off a sheet and presses it onto the boiler cupboard: SERVICED, today’s date, D.P.'
            : 'He hands a small white sticker through the gap in the door instead of coming in: SERVICED, today’s date, D.P. “For the cupboard,” he says. “They like to see one.”',
        ),
        t('D.P. On my window, on the shelf in the basement, and now on my boiler. He initials everything he touches. I wonder who reads the initials.'),
      ];
    });
  return [
    talk('owner', 'Ask who he works for', 'Straight. See how far down the answer goes.', [
      q('You', 'Who do you work for, Mr Pryce?'),
      q('Pryce', 'The agents. The agents work for the owner’s office. I’ve never met the owner. Nobody has. I get a list on a Monday and I do the list.'),
      q('You', 'Am I on the list?'),
      q('Pryce', 'You’re always on the list, Ms Vale.'),
    ]),
    talk('window', 'Ask about the window', 'Somebody fixed it. You never asked anybody to.', [
      q('You', 'Did you fix my window?'),
      q('Pryce', 'Somebody reported it sticking.'),
      q('You', 'I didn’t report it.'),
      q('Pryce', 'No. Somebody did.'),
      p(inside ? 'He does not look round from the boiler.' : 'He does not look up from his bag.'),
    ]),
    talk('tea', 'Offer him tea', 'He looks as if nobody has offered him anything in years.', [
      p(inside ? 'You put the kettle on without asking and make two cups. When you hold one out to him he looks at it for a long moment, and does not take it.' : 'You make two cups and hold one out through the gap. He looks at it for a long moment, and does not take it.'),
      q('Pryce', 'Better not, Ms Vale. They ask, afterwards, whether I had anything. Thirty years of other people’s boilers. You learn not to have anything.'),
      p('For a moment he looks very tired: the way a man looks who has stood at other people’s windows for a long time and has stopped expecting to be asked in.'),
    ]),
  ];
}

// ── Bishop on the fire escape (new scene, round 3) ──

const bishopLead = (s: GameState): Block[] => [
  p('On Saturday afternoon there is a knock, and Mrs Kowalczyk is on the landing in her slippers, distraught. Bishop is out. Not in the corridor: out, through her kitchen window onto the fire escape, and he is sitting on the iron landing one floor up, washing his face, and she cannot manage the steps any more.'),
  p('You go out through her kitchen window in your stockinged feet. The iron is cold and wet. Bishop watches you come with contempt. You get a hand on him on the landing below the roof, and you are crouched there with an armful of furious cat when you look across the gap between the buildings and see the binoculars.'),
  p('The flat opposite, one floor above yours, has its blind half down. Under the blind, at a table in the window, a man sits with a pair of binoculars resting on a folded newspaper, the way you would rest a cup. They are pointed at your window. He is not using them now. He is looking at you, crouched on a fire escape holding a cat, and he has not yet decided what to do with his face.'),
  ...(get8(s, 'pryce') ? [p('It is Mr Pryce. He has taken off the grey coat. On Thursday he stood in your kitchen.')] : []),
];

function bishopChoices(): C8Choice[] {
  const catch_ = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer8('bishop-' + id, label, hint, 'fireescape', (x) => {
      set8(x, 'bishop', id);
      after?.(x);
      return body;
    });
  return [
    catch_('stare', 'Look straight back at him', 'Let him know you know.', [
      p('You look straight back. Five seconds. Ten. Then he reaches up without hurrying and pulls the blind the rest of the way down.'),
      t('Now we both know. That is worth something. I am not sure yet to whom.'),
    ]),
    catch_('photo', 'Photograph him', 'One-handed, with a cat trying to climb your face.', [
      p('You get the phone out one-handed, with Bishop trying to climb your face, and take three frames before the blind comes down. The best is soft, but it will do: a man, a window, a pair of binoculars on a newspaper, and the number on the street door below.'),
      t('A face and an address. Somebody pays his rent. I can find out who.'),
    ], (x) => note8(x, 'binoculars', 'A man in the flat opposite, one floor above Evelynn’s, keeps binoculars trained on her window. She photographed him and the building’s street number.', 'Evelynn’s photographs from the fire escape')),
    catch_('cat', 'Get the cat inside and say nothing', 'Let him wonder whether you saw.', [
      p('You look away as if you had seen nothing, and climb back in through Mrs Kowalczyk’s window with the cat, and let her fuss, and drink the tea she makes you, and say nothing at all about the window across the way.'),
      t('He saw me see him. Let him wonder whether I did.'),
    ]),
  ];
}

// ── The landline at 3 a.m. (new scene, round 3) ──

const callLead: Block[] = [
  p('At ten past three the landline rings.'),
  p('You did not know the flat had a landline until the week you moved in, when you found the handset in a drawer: cream-coloured, heavy, no number on it. It has never rung. It rings eleven times while you stand in the dark hall looking at it. On the twelfth you pick it up.'),
  q('Woman on the line', 'Evie? Evie, is that you? It’s Mrs Tan. From the building on Emerald Hill. I found this number in the book at the front desk. Your flat — they came and emptied it. Men in white gloves. They said you weren’t coming back. I kept your orchids. I didn’t know who else to tell.'),
];

function callChoices(): C8Choice[] {
  const answer = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer8('call-' + id, label, hint, 'call', (x) => {
      set8(x, 'call', id);
      after?.(x);
      return body;
    });
  return [
    answer('evie', 'Be Evie for her', 'She kept the orchids. Let her have somebody to tell.', [
      q('You', 'Mrs Tan. Thank you. Keep the orchids.'),
      q('Mrs Tan', 'You sound tired. You sound — different. Are you eating?'),
      q('You', 'I’m eating.'),
      q('Mrs Tan', 'Good. Come back and see them. They flower every spring. I tell them you’re coming.'),
      p('The line goes quiet, and then dead, and you stand in the dark hall holding a cream telephone with your eyes stinging, for a woman you have never met, about a flat you have never seen.'),
    ]),
    answer('ask', 'Ask her when they came', 'Carefully. She is the only witness who has called you.', [
      q('You', 'When did they come, Mrs Tan?'),
      q('Mrs Tan', 'In the spring. The week after you went. A lady came first, a tall lady, very elegant, and sat in your flat all afternoon by herself with the door shut. Then the men came, and she stood in the doorway and told them what to take.'),
      p('A pause, long-distance, full of other people’s static.'),
      q('Mrs Tan', 'She took one orchid for herself. The white one. I thought you wouldn’t mind.'),
      t('A white orchid. She sat alone in her flat for an afternoon, and then she had it emptied, and she kept the flower.'),
    ], (x) => note8(x, 'emerald-hill', 'Mrs Tan, a neighbour on Emerald Hill, says the first Evelynn’s Singapore flat was emptied in the spring by men in white gloves, directed by a tall, elegant woman who kept a white orchid.', 'Mrs Tan, on the landline at 3 a.m.')),
    answer('down', 'Put it down', 'Her grief is not yours to answer.', [
      p('You put the handset down very gently, as if it might break, and stand with your hand on it in the dark. It does not ring again. In the morning, when you pick it up, there is no dial tone at all.'),
    ]),
  ];
}

/** The night after (set pieces): a moment of her own before the chapter closes (c8.night). */
function nightChoices(): C8Choice[] {
  const night = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('night-' + id, label, hint, 'call', (x) => {
      set8(x, 'night', id);
      return body;
    });
  return [
    night('watch', 'Sit up and watch the street', 'The bench, the awning, the car that shouldn’t be parked there.', [
      p('You sit at the window with the lights off and the list in your lap, and watch. At one a car parks where cars are not allowed to park, and nobody gets out of it. At two it leaves. At three a man walks a dog that does not want to be walked, looks up at your window once, and moves on.'),
      t('Everyone in this city has a reason to be awake. I just don’t know any of theirs.'),
    ]),
    night('walk', 'Walk to Meridian’s registered address', 'A brass plate in a building of brass plates. Look at it. Let it look back.', [
      p('Meridian’s registered address is twenty minutes on foot, in a street of grey stone where every door carries thirty brass plates and none of the windows are lit. You find it on the fourth plate down, smaller than the others, and polished brighter.'),
      p('You stand in front of it in the rain for a long time. Nobody comes. A camera over the door turns, very slowly, until it is looking at you, and stops.'),
      t('Let it look. It made me. It can see what it made.'),
    ]),
    night('sleep', 'Sleep', 'For once. It will all still be there.', [
      p('You take your make-up off properly, and hang the dress up facing the wrong way, on purpose, and get into bed and sleep without dreaming, which is the most defiant thing you have done all week, until the telephone.'),
    ]),
  ];
}

// ── New scenes: the work, then the bank ──

const onCampaign = (s: GameState) => ['taken', 'terms'].includes(getKey(s, 'own.campaign') ?? '');
const backImage = (s: GameState) => !!get5(s, 'published') && get5(s, 'image-use') !== 'none' && get5(s, 'concept') === 'provocative';

function workLead(s: GameState): Block[] {
  if (onCampaign(s))
    return [
      p('The shoot is on Wednesday, in the old tram sheds by the canal, which somebody has painted white inside and filled with more light than a building should hold. There are twenty people there for you: lights, hair, a man whose only job appears to be the wind machine. Odile sits on a folding chair by the door in her black suit, not watching the camera, watching everyone who is watching you.'),
      p('The photographer is called Lior, young and polite and very good, and after an hour he stops talking to you and starts talking to the light. You find you know how to stand for him. You find you know which way to turn your chin before he asks. You do not know how you know.'),
      p('At the back, out of the light, by the door the crew uses, there is a tall woman in a camel coat with her hair cropped close to her head. She does not come forward. She watches for ten minutes, the way you would watch a horse you were thinking of buying, and then she is gone.'),
      q('Creative director', 'The fund’s guest. Madame Laurent’s office. They’re the money behind the house. The money likes to see what it’s buying.'),
      t('Laurent. The woman at the Glass House who said I had disappeared before breakfast. Her money is paying for my face.'),
      q('Creative director', getKey(s, 'own.campaign') === 'terms'
        ? 'Just one frame with the face. For the files. Nobody will ever use it.'
        : backImage(s)
          ? 'One more, from the back. The famous back. They’ll pay for the extra day.'
          : 'One more, without the jacket. They’ll pay for the extra day.'),
    ];
  return [
    p('On Wednesday you go looking for work of the only kind you are sure you can do. A small firm in the old insurance district, Pell & Rourke, takes freelance readers for due diligence: people who will read a thousand pages of somebody else’s acquisition and find the one that lies.'),
    p('Ines Pell sees you herself, in a room with a view of a wall, and puts a file in front of you and a clock beside it.'),
    q('Ines Pell', 'Twenty minutes. Tell me what’s wrong with it.'),
    p('It takes you eight. A subsidiary’s lease, signed on behalf of the company by a director who had resigned from its board three weeks earlier. Adrian found the same trick in the same place four years ago, in a deal nobody here has heard of. You put your finger on the signature and look up.'),
    p('Ines Pell looks at the signature, and at you, and at the clock, for a long time.'),
    q('Ines Pell', 'Our biggest client is a fund on the river. They like discretion and they like people who see things. Where did you train?'),
  ];
}

function workChoices(s: GameState): C8Choice[] {
  const shoot = onCampaign(s);
  const work = (id: 'give' | 'hold', label: string, hint: string, body: Block[]) =>
    offer8('work-' + id, label, hint, 'work', (x) => {
      set8(x, 'work', id);
      set8(x, 'work-kind', shoot ? 'shoot' : 'desk');
      return [...body, ...bankLead(x)];
    });
  if (shoot) {
    const terms = getKey(s, 'own.campaign') === 'terms';
    return [
      work('give', terms ? 'Give them one frame of your face' : 'Give them the extra frame', 'Your light, your angle, and you say when it stops.', [
        q('You', 'One. My light. And I say when we’re done.'),
        p('Lior moves the lamp where you point and does not argue. It takes four minutes. You look at nothing and nobody, and you think about the woman in the camel coat the whole time, and when you say “done” the whole shed hears it and nobody asks for another.'),
        p('Odile, by the door, writes something in a small black book and puts it away.'),
        t('I gave them something they did not pay for. I chose to. I would like to remember which of those two things was the point.'),
      ]),
      work('hold', 'Hold to the terms', 'That wasn’t the brief. It doesn’t become the brief because the money is watching.', [
        q('You', 'That wasn’t the brief.'),
        p('The creative director looks at Odile. Odile does not look up from her chair.'),
        q('Odile Frayne', 'You heard her. That wasn’t the brief.'),
        p('They wrap at six. On the way out Odile walks you to the canal and lights a cigarette she does not smoke, only holds.'),
        q('Odile Frayne', 'That woman’s office will ring me tomorrow, darling. They always do, after a no. It makes them curious.'),
      ]),
    ];
  }
  return [
    work('give', 'Give her a history', 'The one on your passport. Singapore, a family office, discretion.', [
      q('You', 'Singapore. A family office. I can’t say whose.'),
      p('It comes out smooth, whole, with the right pause before “whose”. It is not your history. It is the one the passport tells, and it fits your mouth better than you would like.'),
      q('Ines Pell', 'They never can. Files come by courier. We pay at thirty days, badly.'),
      t('I lied for the legend, fluently, to get the one job Adrian could have done. I am not sure who I was protecting.'),
    ]),
    work('hold', 'Let the work answer', '“Does it matter?” The signature is still under your finger.', [
      q('You', 'Does it matter?'),
      p('Ines Pell looks at the signature under your finger one more time. Then she closes the file.'),
      q('Ines Pell', 'Not to me. It will to somebody, one day. Files come by courier. We pay at thirty days, badly.'),
      t('Adrian’s work, in my hands, under my name. The only thing about me that nobody made.'),
    ]),
  ];
}

function bankLead(s: GameState): Block[] {
  const records = !!getKey(s, 'own.piece.records');
  return [
    p('On Thursday your card is declined at the café on the corner, for a coffee, in front of a queue. It works the second time. By the time you are home there is a message from your bank asking you to come in, at your convenience, today.'),
    p('The branch manager is a soft-spoken man with a cardigan under his jacket who apologises four times before he says anything. There has been a routine review of the account’s arrangements. Nothing is wrong. It is only that your account, madam, is not strictly an account. It is a sub-account, under a corporate relationship, and the relationship has asked to be notified of unusual activity.'),
    q('You', 'What relationship?'),
    p(
      records
        ? 'He turns his screen a little toward you, as if by accident. The parent account is held by a registered agent in a building of brass plates: the same agent that stands in front of Meridian Holdings.'
        : 'He turns his screen a little toward you, as if by accident. The parent account is held by a registered agent you have never heard of, in a building of brass plates.',
    ),
    q('Branch manager', 'You didn’t open it yourself, then. I did wonder. It came to us fully formed, like —'),
    p('He stops, and apologises a fifth time, and does not say like what.'),
    t('Every coffee I have bought with that card, somebody has watched me buy.'),
  ];
}

function bankChoices(): C8Choice[] {
  const bank = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('bank-' + id, label, hint, 'maintenance', (x) => {
      set8(x, 'bank', id);
      return body;
    });
  return [
    bank('cash', 'Take it all out in cash, today', 'Every note. Let them watch the number go to nothing.', [
      p('You take it all out, over the counter, in notes, while the manager counts it twice and apologises a sixth time. It fits in an envelope. Your whole independence fits in one envelope.'),
      p('At home you divide it into three: the lining of the old jacket, the flour jar, the back of the drawer with the passport.'),
      t('Now they can’t watch me spend it. Now anybody who comes through that door can take it.'),
    ]),
    bank('new', 'Open an account of your own, somewhere else', 'A building society across the river, in your name. The first thing in this life you signed for yourself.', [
      p('You walk across the river to a building society with a queue of pensioners and a girl behind the glass who has never read Aster. You open an account in the name on your passport, and sign the card with the signature you have practised, and move everything into it while you wait.'),
      p('It is the first document in this life that you have signed for yourself.'),
      t('On a passport they issued, in a name they chose. It is still the first.'),
    ]),
    bank('leave', 'Leave it where it is', 'Let them watch. It will tell you when they move.', [
      p('You thank the manager and leave everything exactly where it is. On the way out you buy a coffee with the card, and it works, and you drink it on the step of the bank in full view of the cameras.'),
      t('Let them watch it. The day they freeze it, I will know they have decided something. It is a tripwire. I just have to be standing on it.'),
    ]),
  ];
}

// ── Emerald Hill (sequence): Lotte and nine photographs ──

/** Lotte believes she is Evie unless Chapter 7 denied it on the bridge. */
const lotteKnows = (s: GameState) => ['play', 'ask'].includes(s.choices['c7.lotte'] ?? '');

function lotteLead(s: GameState): Block[] {
  return lotteKnows(s)
    ? [
        p('In the morning there is a message from the number you saved on a bridge: “Found something of yours. Photographs, from Emerald Hill. You never took anything when you left. Coffee? — L.”'),
        t('Photographs of her. Of me. I do not know which I am more afraid of.'),
      ]
    : [
        p('In the morning there is an envelope under your door, hand-delivered, no stamp. Inside is a card: “I’m sorry about the bridge. I don’t need you to tell me who you are. I have some photographs that were hers, and I think you should have them more than I should. — Lotte.” And a number.'),
        t('She did not believe me on the bridge. She still doesn’t. She has decided it doesn’t matter.'),
      ];
}

function lottePhotos(s: GameState): Block[] {
  const knows = lotteKnows(s);
  return [
    p('There are nine prints, square, the colours gone warm the way photographs do in heat. You lay them out on the table one at a time, and she lets you, and does not talk.'),
    p('A balcony at night, the city lit below it, and a woman laughing with her head thrown back and a glass held out to somebody outside the frame. It is your face. It is almost your face. The laugh is not yours; you have never laughed like that, with your whole throat, as if nothing could ever be taken from you.'),
    p('The same woman asleep on a green sofa, one arm flung over her eyes, her head on a cushion with a crease across it like a scar. The same woman at a long table among twenty people, beside a man with silver coming in at his temples who is looking at her and not at the camera: Marcus, younger. And one more of the balcony, not laughing now, leaning in to talk to somebody tall whose face is turned away from the lens, whose hair is cropped close, whose hand rests on the back of her neck.'),
    t('Every photograph of her has somebody just outside it. In the last one, they are only just inside.'),
    q('Lotte', knows ? 'You were so happy there. So happy and so tired. Ask me anything. I kept all of it.' : 'She was so happy there. So happy and so tired. Ask me anything. Somebody should know it besides me.'),
  ];
}

function lotteChoices(s: GameState): C8Choice[] {
  const stage = get8(s, 'lotte-open');
  const knows = lotteKnows(s);
  if (stage === 'invite') {
    const meet = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
      offer8('lotte-' + id, label, hint, 'emerald', (x) => {
        set8(x, 'lotte-meet', id);
        set8(x, 'lotte-open', 'ask');
        return [...body(x), ...lottePhotos(x)];
      });
    return [
      meet('cafe', 'Meet her at the café by the river', 'Somewhere public. Somewhere you can leave.', () => [
        p('The café by the river has tables outside under heaters, and Lotte is at one already, in sunglasses although it is overcast, with a brown envelope under her hand as if it might blow away.'),
      ]),
      meet('home', 'Go to her flat', 'Somewhere private. Somewhere she is at home.', () => [
        p('Lotte’s flat is at the top of a converted warehouse in the old docks, all brick and plants and a view of cranes. There are orchids on every windowsill. She sees you look at them.'),
        q('Lotte', knows ? 'You got me into them. I never forgave you.' : 'She got me into them. I never forgave her.'),
      ]),
    ];
  }
  if (stage === 'ask') {
    const ask = (id: string, label: string, hint: string, body: Block[]) =>
      offer8('lotte-' + id, label, hint, 'emerald', (x) => {
        set8(x, 'lotte-ask', id);
        set8(x, 'lotte-open', 'take');
        return [...body, q('Lotte', knows ? 'Take them. They’re yours.' : 'Take them. I think they’re more yours than mine.')];
      });
    return [
      ask('work', 'Ask what she did', knows ? 'Carefully. As if you had forgotten.' : 'What she did, out there.', [
        q('Lotte', 'Something with a fund. Risk, she said. She used to say she was paid to know what people would do before they did it, and that she was never wrong, and that it was the loneliest job in the world.'),
        t('Paid to predict people. Somebody built a machine that predicted me. I wonder whether she ever met it.'),
      ]),
      ask('c', 'Ask who C. was', 'The looping hand. The balcony. The one just outside every frame.', [
        q('Lotte', 'I never knew her name. Evie called her C., as if it were a whole name. Tall. Never let anybody photograph her. She’d come to the flat at two in the morning with food from the hawker stalls, and they’d sit out on the balcony until it got light, talking so low nobody could hear.'),
        q('Lotte', 'I asked once if they were together. Evie laughed and said, “She’s my employer, my landlady and my conscience, Lotte. Pick one.”'),
        t('Employer. Landlady. Conscience. Somebody still pays for my flat. I would like very much to know whether it is the same somebody.'),
      ]),
      ask('last', 'Ask when she last saw her', 'The last night on Emerald Hill.', [
        q('Lotte', 'The night before she went. She came up at two in the morning and gave me her keys, to water the orchids, and said she’d be back for breakfast.'),
        p('Lotte turns her coffee cup round and round on its saucer.'),
        q('Lotte', 'She wasn’t. The next week men came and emptied the flat. Mrs Tan downstairs kept most of the orchids. I kept one.'),
        t('Back for breakfast. Everybody who loved her is still waiting for breakfast.'),
      ]),
    ];
  }
  const take = (id: string, label: string, hint: string, body: Block[], after?: (x: GameState) => void) =>
    offer8('photos-' + id, label, hint, 'wake', (x) => {
      delete x.choices['c8.lotte-open'];
      set8(x, 'photos', id);
      set8(x, 'wake-open', 'go');
      after?.(x);
      return [
        ...body,
        p('On the tram home you sit by the window and watch your reflection ride along beside you over the dark shop fronts: a face in the glass, laughing at nothing, or not laughing. In that light you cannot tell any more.'),
      ];
    });
  return [
    take('all', 'Take them all', 'Nine photographs of a life you are wearing.', [
      p('You put all nine back in the envelope and the envelope inside your coat, against your ribs, and thank her, and she hugs you at the door the way she did on the bridge, hard, smelling of oranges.'),
    ], (x) => note8(x, 'photos', 'Lotte gave Evelynn nine photographs from Emerald Hill: the first Evelynn laughing on a balcony, asleep on a green sofa, at a dinner beside a younger Marcus, and leaning in to a tall woman with cropped hair whose face is turned from the lens.', 'Lotte’s photographs, taken by Evelynn')),
    take('one', 'Take only the balcony', 'The laugh. Leave her the rest.', [
      p('You take the one from the balcony, the laugh, and slide the other eight back across the table to her.'),
      q('Lotte', 'That one. Of course that one.'),
      p('At the door she holds your face in both hands for a second, looking at it, and lets go.'),
    ]),
    take('back', 'Give them back', 'They were hers, and then Lotte’s. Never yours.', [
      q('You', knows ? 'Keep them, Lotte. They’re better with you.' : 'They were hers, and then they were yours. They were never mine.'),
      p('She looks at you for a long moment and puts the envelope back in her bag, and something in her face settles, as if you had passed a test she did not know she was setting.'),
    ]),
  ];
}

// ── The Wake (sequence): drinks in Adrian's memory ──

const wakeLead: Block[] = [
  p('On the seat beside you somebody has left the evening paper, folded open at the notices. You would not have read it. Your eye falls on your own name, the old one, in small capitals.'),
  q('The notice', 'VALE, Adrian. Colleagues and friends will raise a glass in his memory tonight at the Anchor, Harbour Street, from six. All who knew him welcome.'),
  t('All who knew him. That is a very short list, and I am at the top of it.'),
];

function wakeRoom(s: GameState, asker: string): Block[] {
  const maya = get6(s, 'maya') === 'restored';
  const knows = get6(s, 'maya-knows') === 'in-person';
  return [
    p('The Anchor is a long brown room with a carpet that has seen things. Forty people, maybe, from Axiom, standing the way office people stand when they are not in the office: too close to the bar, not close enough to each other.'),
    p('Daniel has organised it; you can tell, because there is a laminated photograph of Adrian propped against the till and a bowl of crisps nobody has touched. The new Compliance director is asking people to call him Rob. Priya, who got the promotion, stands on her own by the fruit machine with a white wine she is not drinking, looking as if she would like to say something to somebody and cannot decide who.'),
    ...(maya
      ? [
          p('Maya is in the corner with her coat still on, drinking red wine out of a chipped mug. His mug. She has brought it from home.'),
          p(knows ? 'She sees you. Her face does something complicated, and then she lifts the mug to you across the room, very slightly.' : 'She looks at you twice, the way she did at the counter, and then away.'),
        ]
      : [p('Somebody says Maya couldn’t face it. Somebody else says that isn’t like Maya at all.')]),
    q(asker, asker === 'Daniel' ? 'Sorry — how did you know him?' : 'Were you a friend of his? Sorry. I don’t think I know you.'),
  ];
}
const toastInside: Block[] = [
  p('At seven Daniel climbs onto a chair, which takes two attempts, and taps a glass with a crisp packet, which does not work, and then just starts talking.'),
  q('Daniel', 'Adrian never once said the thing he was thinking, and he was always right. He fixed my reports for six years and never told anyone. I never thanked him. So. To Adrian.'),
];
const toastWindow: Block[] = [
  p('Through the glass you watch Daniel climb onto a chair, which takes two attempts, and start to talk. You cannot hear him. You can see forty people go quiet and lift their glasses, and you can see, in the dark window, your own reflection standing in the middle of them.'),
];
const wakeEnd: Block[] = [
  p('Across Harbour Street, under the awning of a shop that closed years ago, a man in a grey coat is not looking at the pub. He does not look at you either, as you pass. He does not need to.'),
  t('Even my wake has a watcher.'),
];

function wakeChoices(s: GameState): C8Choice[] {
  const stage = get8(s, 'wake-open');
  if (stage === 'go') {
    const go = (id: string, label: string, hint: string, body: (x: GameState) => Block[], next: 'inside' | 'toast') =>
      offer8('wake-' + id, label, hint, 'wake', (x) => {
        set8(x, 'wake', id);
        set8(x, 'wake-open', next);
        return body(x);
      });
    return [
      go('stranger', 'Go in, as a stranger', 'Stand at the bar. Be nobody.', (x) => [
        p('You go in and stand at the end of the bar with a glass of something, a woman nobody knows, at a wake nobody would think to look for her at.'),
        ...wakeRoom(x, 'A woman from Accounts'),
      ], 'inside'),
      go('friend', 'Go in, as a friend of his', 'Say it. It is the truest lie you have.', (x) => [
        p('You go in and find Daniel by the till and tell him you were a friend of Adrian’s. He looks at you, and then at the photograph, and then at you, and shakes your hand for slightly too long.'),
        ...wakeRoom(x, 'Daniel'),
      ], 'inside'),
      go('window', 'Stand outside at the window', 'Close enough to see. Not close enough to be asked.', () => [
        p('You stand across the pavement from the window, in the dark, with your collar up. It is a long brown room full of people from Axiom, too close to the bar and not close enough to each other, and a laminated photograph of a tired man propped against the till.'),
        ...toastWindow,
      ], 'toast'),
    ];
  }
  if (stage === 'inside') {
    const asker = get8(s, 'wake') === 'friend' ? 'Daniel' : 'A woman from Accounts';
    const answer = (id: string, label: string, hint: string, body: Block[]) =>
      offer8('knew-' + id, label, hint, 'wake', (x) => {
        set8(x, 'knew', id);
        set8(x, 'wake-open', 'toast');
        return [...body, ...toastInside];
      });
    return [
      answer('close', 'Say you knew him better than anyone here', 'True. Say it anyway.', [
        q('You', 'Better than anyone here, I think.'),
        p(asker === 'Daniel' ? 'Daniel looks at you for a long moment with a line between his eyebrows.' : 'A small, awkward silence opens round you, and Daniel, coming past with a tray, stops and looks at you over it with a line between his eyebrows.'),
        q('Daniel', 'He never said. He never said anything, did he.'),
      ]),
      answer('work', 'Say you knew him through work', 'A little. Everyone did.', [
        q('You', 'Through work. A little.'),
        q(asker, 'That’s how everyone knew him. A little.'),
      ]),
      answer('nothing', 'Say you didn’t know him at all', 'You saw the notice. Nobody should drink to an empty room.', [
        q('You', 'I didn’t. I saw the notice. Nobody should drink to an empty room.'),
        q(asker, 'That’s the nicest thing anybody’s said tonight.'),
      ]),
    ];
  }
  const inside = get8(s, 'wake') !== 'window';
  const toast = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('toast-' + id, label, hint, 'number14', (x) => {
      delete x.choices['c8.wake-open'];
      set8(x, 'toast', id);
      set8(x, 'key-open', 'go');
      return [...body, ...wakeEnd];
    });
  return [
    toast('drink', inside ? 'Drink to him' : 'Lift your hand to the glass', 'To yourself. Nobody will know.', [
      p(
        inside
          ? 'You lift your glass with the rest of them and drink to yourself, and it goes down like cold water, and nobody in the room knows.'
          : 'You lift your hand to the glass, very slightly, as if there were a drink in it.',
      ),
    ]),
    toast('speak', inside ? 'Say something' : 'Say it to the glass', '“To the quiet ones.”', [
      q('You', 'To the quiet ones.'),
      p(
        inside
          ? 'It goes round the room — to the quiet ones, to the quiet ones — and Daniel looks at you from his chair with his glass in the air, frowning, as if he were trying to remember a word.'
          : 'You say it to the glass, to nobody, and your breath fogs the window over his photograph, and clears.',
      ),
    ]),
    toast('leave', 'Leave before the glasses come down', 'Before anyone asks your name.', [
      p('You go before the glasses come down, out along Harbour Street, fast, as if somebody might call your name. Nobody does. Nobody here knows it.'),
    ]),
  ];
}

// ── The Spare Key (sequence): Number 14, once more ──

const keyLead: Block[] = [
  p('The key has been in your coat pocket since the night of the box: his spare, on a split ring with a plastic fob from a hardware shop. After the Anchor you find that your feet have taken you over the river, the way they did once before, to his street.'),
  p('Number 14. The launderette is shut. The yellow curtains upstairs are dark: whoever lives there now works nights, or is out, or is asleep.'),
  t('It is still his key. It is not still his door.'),
];
const HIDING_FACT = 'Adrian’s old hiding place behind the skirting board at Number 14 has been emptied and screwed shut, with a sticker: SERVICED, D.P.';

function keyChoices(s: GameState): C8Choice[] {
  const stage = get8(s, 'key-open');
  const metKemi = s.choices['c7.old-flat'] === 'ring';
  if (stage === 'go') {
    const go = (id: string, label: string, hint: string, body: Block[]) =>
      offer8('key-' + id, label, hint, 'number14', (x) => {
        set8(x, 'key', id);
        set8(x, 'key-open', 'board');
        return [...body, ...keyInside];
      });
    return [
      go('ring', 'Ring her bell and ask', 'Five minutes. Tell her the truth, or most of it.', [
        p('You ring. After a long time there are feet on the stairs — the fourth one creaks, and she steps over it — and the door opens on a woman in scrubs with her coat half on.'),
        q('Kemi Okafor', metKemi ? 'You again. The quiet one’s friend.' : 'Sorry — can I help you?'),
        q('You', 'I used to know the man who lived here. I have his key. I wondered if I could see it, once. Five minutes.'),
        p('She looks at the key in your hand for a long time, and then at you.'),
        q('Kemi Okafor', 'I’m on at ten. Five minutes. Don’t touch my plants.'),
      ]),
      go('in', 'Let yourself in', 'Her window is dark. His key still turns.', [
        p('The key turns as if it had never been away. Nobody has changed the lock. Nobody has needed to. You climb the stairs in the dark, step over the fourth one without thinking, and stand in the doorway of a flat that is somebody else’s now, with your heart going.'),
        t('This is what they did to me. Now I am doing it to her.'),
      ]),
      offer8('key-post', 'Post it through his letterbox', 'Give it back. Close one door yourself.', 'close', (x) => {
        delete x.choices['c8.key-open'];
        set8(x, 'key', 'post');
        return [
          p('You push the key through the letterbox and hear it land on the mat on the other side, a small sound in an empty hall. Then you walk back over the river without looking round.'),
          t('It was his to keep and mine to give back. One door I have closed myself.'),
        ];
      }),
    ];
  }
  if (stage === 'board') {
    const board = (id: string, label: string, hint: string, body: Block[]) =>
      offer8('board-' + id, label, hint, 'number14', (x) => {
        set8(x, 'board', id);
        set8(x, 'key-open', 'spare');
        note8(x, 'hiding-place', HIDING_FACT, 'Evelynn, at Number 14');
        return [
          ...body,
          ...(get8(x, 'key') === 'ring'
            ? [q('Kemi Okafor', 'You’re the second this month, you know. A man came to look at the skirting boards. From the agents, he said. Grey coat. Didn’t take his shoes off.')]
            : [p('On the way down you step over the fourth stair again, and close the street door so softly it does not click, and stand on the pavement shaking.')]),
        ];
      });
    return [
      board('open', 'Unscrew it', 'With the nail file from your bag. Badly. In the dark.', [
        p('You do it with the nail file from your bag, badly, in the dark, with your hands not quite steady. Behind the board is the gap he knew by heart, and in it there is nothing. Not dust. Not a receipt. Somebody has hoovered it.'),
        t('They did not just take his things. They took the place he kept them.'),
      ]),
      board('leave', 'Leave it', 'Whatever was there has gone. The sticker is the message.', [
        p('You put your fingers on the two screws and do not turn them. Whatever was there has gone. Whoever took it wanted the next person who looked to find the sticker, and understand.'),
      ]),
    ];
  }
  const ringing = get8(s, 'key') === 'ring';
  const spare = (id: string, label: string, hint: string, body: Block[]) =>
    offer8('spare-' + id, label, hint, 'close', (x) => {
      delete x.choices['c8.key-open'];
      set8(x, 'spare', id);
      return body;
    });
  return [
    spare('keep', 'Keep the key', 'It opens nothing of yours. Keep it anyway.', [
      p('You put it back in your pocket. It opens nothing that is yours any more. You keep it anyway.'),
    ]),
    spare('kemi', ringing ? 'Give Kemi the key' : 'Leave the key on her table', 'And tell her to change the lock.', ringing
      ? [
          p('You hand her the key.'),
          q('You', 'Change the lock. Tell the agents you lost yours. Don’t tell them why.'),
          p('She looks at you, and at the key, and nods slowly, the way people nod when they have just understood that they live somewhere other than they thought.'),
        ]
      : [p('You leave it on her kitchen table beside the plants, with a note in capitals: CHANGE YOUR LOCK. Unsigned.')]),
    spare('river', 'Drop it in the river', 'From the old bridge. Nobody’s door, now.', [
      p('On the old bridge you take it out and hold it over the water for a long time, and let it go. It makes no sound at all.'),
    ]),
  ];
}
const keyInside: Block[] = [
  p('It is smaller than you remember. Everything is. Her plants on every surface, her scrubs drying on the radiator, a yellow throw over the sofa he bought in a sale and hated. The carpet still has the dark patch by the kitchen door where he dropped a bottle of red the night the promotion went to somebody else.'),
  p('In the bedroom, behind the door, is the skirting board with the loose end, where he kept cash, his passport and the things he did not want anybody to find.'),
  p('It is not loose any more. It has been fixed, neatly, with two fresh screws, still bright, and a small white sticker on the wood: SERVICED, a date, two initials. D.P.'),
  t('Even his hiding place has been serviced.'),
];

/** Over the wall: what she does with Meridian's client list. */
function listChoices(): C8Choice[] {
  return [
    offer8('list-read', 'Read every line', 'Slowly. It is all you will get.', 'emerald', (x) => {
      set8(x, 'list', 'read');
      set8(x, 'lotte-open', 'invite');
      note8(x, 'inventory', 'Meridian’s client list carries an entry set apart from the rest: VALE, E. · SINGAPORE · RETURNED TO INVENTORY · REISSUED.', 'The list itself, read line by line');
      return [
        p('You read it the way Adrian read an acquisition: every line, every footnote, every code. Most of it is a catalogue of things that should not be for sale. Near the bottom, set apart by a single blank line, is an entry that stops your breath.'),
        q('The client list', 'VALE, E. · SINGAPORE · RETURNED TO INVENTORY · REISSUED'),
        t('Returned to inventory. Not killed. Not retired. Shelved, like a coat nobody was wearing, and then taken down and fitted to me.'),
        p('You read the rest of the page again, more slowly, now that you know what it is. The other entries are not names. They are codes, and cities, and dates. Three of them say RETIRED. One says only CLOSED, and you find you cannot look at that one for very long.'),
      ];
    }),
    offer8('list-copy', 'Copy it three ways and go', 'Get it out before anyone knows it’s gone.', 'emerald', (x) => {
      set8(x, 'list', 'copied');
      set8(x, 'lotte-open', 'invite');
      return [
        p('You do not read it. You photograph it, send the photograph to an address that forwards on, and write the three lines that matter most on the inside of your wrist in eyeliner, because paper can be taken and a phone can be wiped, and skin, for a few hours, is harder to search.'),
        p('On the way home you keep your sleeve pulled down over your wrist, and your hand in your pocket, the way you would carry something warm.'),
        t('Whatever this says, I have it three times. They would have to find all three.'),
      ];
    }),
  ];
}

export function chapter8Choices(s: GameState): C8Choice[] {
  if (!chapter8Playable(s)) return [];
  if (s.scene === 'chapter7' && s.phase === 'complete' && getKey(s, 'route.lane') === 'own-power')
    return [offer8('begin', 'Go on', 'Days later. The wall is still there.', 'cost')];
  if (s.scene !== 'chapter8') return [];
  if (s.phase === 'cost') {
    if (!get8(s, 'breakin')) return breakInChoices(s);
    if (!get8(s, 'neighbour')) return neighbourChoices();
    return moneyChoices(s);
  }
  if (s.phase === 'work') return get8(s, 'work') ? bankChoices() : workChoices(s);
  if (s.phase === 'maintenance') return maintChoices(s);
  if (s.phase === 'fireescape')
    return get8(s, 'bishop') ? [offer8('cost-continue', 'Look for a way over the wall', 'Every way costs something.', 'leverage')] : bishopChoices();
  if (s.phase === 'leverage') return leverageChoices(s);
  if (s.phase === 'advance') return listChoices();
  if (s.phase === 'emerald') return lotteChoices(s);
  if (s.phase === 'wake') return wakeChoices(s);
  if (s.phase === 'number14') return keyChoices(s);
  if (s.phase === 'call')
    return get8(s, 'call') ? [offer8('close-end', 'Carry it into the next room', 'Chapter 8 ends here.', 'complete')] : callChoices();
  if (s.phase === 'close') {
    if (hackComes(s)) return hackChoices();
    return nightChoices();
  }
  return [];
}

export function applyChapter8Choice(state: GameState, id: string): GameState {
  const choice = chapter8Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter8';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'advance' && state.phase !== 'advance') set8(s, 'meridian', 'product');
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter8.${s.phase}` as NodeId, blocks: chapter8Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER8_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
