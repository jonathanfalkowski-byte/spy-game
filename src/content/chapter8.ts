/** Chapter 8 (own-power, played as the Celebrity route) · The Cost Bites: cost → leverage (one crossover decision, then
 * its scene) → advance → close. Additive in revision 19 after Chapter 7's own-power ending, gated behind
 * chapter8Playable(). Wording and flags: docs/story/scripts/CHAPTER_8_OWN_POWER_SCRIPT.md with its Phase 0 decisions,
 * deepened by the heat-and-danger pass (docs/story/BEAT_MAP.md). Each road over the wall sets the same flags it always
 * did, then opens a scene (held in c8.leverage-open) with one choice of its own. own.crossover changes access, never
 * route.lane. No intimacy in this chapter beyond a line from a partner she already chose.
 * Deepening pass 2 (2026-09-24): the cost is played (the break-in: lock / trap / report; the week's money: pay /
 * sell the gown / Odile's advance / let it run), the client list is a choice (reading it finds VALE, E. returned to
 * inventory), and the night after answers both. */
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
  leverage: { title: 'Over the Wall', place: '· THE CHOICE', blocks: [] },
  advance: { title: 'What It Was Hiding', place: '· THE SHAPE', blocks: [] },
  close: { title: 'Whose Door', place: '· THAT NIGHT', blocks: [] },
  complete: { title: 'The Next Room', place: '· LATER', blocks: [] },
};
export const chapter8Scenes = Object.entries(chapter8Definitions).map(([phase, scene]) => ({
  id: `chapter8.${phase}` as NodeId,
  ...scene,
}));

/** Scene-specific place lines while a road's scene is open (display only). */
export function place8(s: GameState): string | undefined {
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
    ...notesAfterBreakIn8(s),
    t('Someone wanted me to know they could. That is worse than someone wanting me not to know.'),
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
  ];
}

export function chapter8Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter8') return [];
  if (s.phase === 'cost') return costBlocks(s);
  if (s.phase === 'advance') return advanceBlocks(s);
  if (s.phase === 'close') return closeBlocks(s);
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
        ]),
        done('gala-carpet', 'Ask it on the red carpet', 'Put the question to the cameras. Loud, public, impossible to take back.', 'gala', 'carpet', [
          p('On the way out, a dozen lenses and a woman from a morning show with a microphone. You stop. You look straight down the barrel of the nearest camera and ask, pleasantly, whether anyone in the room tonight could tell you who owns Meridian Holdings, since nobody seems able to. Behind you, you hear Keel’s glass go down on a tray a little too hard.'),
          p('By the time you are home the clip has been watched forty thousand times. By the morning a closed company has three reporters asking for comment, and one of its directors has stopped answering his phone.'),
        ]),
      ];
    case 'rook':
      return [
        done('debt-true', 'Tell the sender exactly what you saw', 'Pay the debt honestly. The sender will trust you further.', 'rook-report', 'true', [
          p('You give it straight: the aide, the time, the door, the rain. The page arrives within the hour, one sheet of Meridian’s offshore board, and a line under it: “Straight dealing. I remember that.”'),
        ]),
        done('debt-false', 'Give the sender a different name', 'Protect whoever that aide was running to. If they check, they will know you lied.', 'rook-report', 'false', [
          p('You give them a different floor, a different woman, a different time. The page still arrives, one sheet of Meridian’s offshore board. There is no line under it this time. You tell yourself that means nothing.'),
        ]),
      ];
    case 'editor':
      return [
        done('press-run', 'Let her print what she finds', 'The story runs. Meridian is named in public, and so is the fact that you started it.', 'press', 'run', [
          p('“Print it,” you say. Clara nods once, as if you had passed a test, and goes to work. The piece runs in the next issue under her name, careful and sourced, and yours is nowhere in it. It does not need to be. Anyone who matters will know where the question came from.'),
        ]),
        done('press-hold', 'Ask her to hold it', 'Keep the finding private for now. Clara will not wait forever.', 'press', 'hold', [
          p('“Not yet,” you say. Clara looks at you for a long moment and then puts the folder in her bag. “I’ll hold it,” she says, “until I can’t.” It is the most honest promise anyone has made you in weeks.'),
        ]),
      ];
    case 'maya':
      return [
        done('maya-away', 'Tell her to stay away from you for a while', 'Keep her out of range. It will hurt you both.', 'own.maya-distance', 'away', [
          p('“Stop meeting me,” you say. “For a while. Until this is over.” She stares at you across the steam. Then she nods, and pays for both bowls before you can stop her, and leaves first, the way you asked, without looking back. You sit there until the noodles go cold.'),
        ]),
        done('maya-close', 'Let her stay close', 'She chose this. Trust her to know the risk.', 'own.maya-distance', 'close', [
          p('“I’m not going to tell you to stay away,” you say. “You’d ignore me anyway.” She laughs, properly, for the first time tonight. “Same counter,” she says. “Same seat. I’ll keep facing the door.”'),
        ]),
      ];
    case 'executive':
      return [
        done('room-photo', 'Photograph the page', 'Proof you can keep. If the guard sees the phone, Julian pays for it.', 'room', 'photo', [
          p('You lift the phone and take the page in two frames while the torch sweeps closer. Julian opens the door himself before the guard can, blocks it with his shoulders, and says something easy and bored about a late meeting. The guard apologises. When the corridor is empty again, Julian lets out a breath and looks at the phone in your hand, and says nothing at all.'),
        ]),
        done('room-read', 'Only read it, and keep his hands clean', 'Memorise what you can. Nothing on the phone, nothing to find.', 'room', 'read', [
          p('You read the page twice, fast, and put it back exactly as it hung. When the guard’s torch finds the glass, there is nothing to see but a Helix director and a woman in a good coat, standing a little too close together in an empty room. The guard apologises and moves on. Julian does not step back right away.'),
        ]),
      ];
    case 'institutional':
      return [
        done('car-ask', 'Ask her why she really took this on', 'Sloane has never answered a direct question. Ask one.', 'sloane', 'asked', [
          p('“Why did you sign it?” you ask. “You knew it wouldn’t hold me.” Sloane is quiet for so long you think she will not answer. Then: “Because the alternative was someone worse holding you. I thought I could at least be the one who let go.” She turns the tablet face down again. It is the first thing she has told you that you almost believe.'),
        ]),
        done('car-watch', 'Say nothing; watch her hands', 'Let her talk, or not. Learn from what she can’t control.', 'sloane', 'watched', [
          p('You say nothing. The car turns along the river. Sloane talks about access and cover and what you will owe, and her voice never changes, but her thumb keeps moving along the edge of the tablet, over and over, the whole way. When the car stops outside your building, you understand that she is afraid, and that it is not of you.'),
        ]),
      ];
    default:
      return [
        done('dig-watch', 'Find out who he is', 'Watch what he pulls and follow him out. Riskier, and you learn who else is looking.', 'dig-rival', 'seen', [
          p('You wait until he prints, and read the header on his page as he folds it: a law firm whose name you have seen on the letterhead of Meridian’s registered agent. Meridian is checking who else has been reading its filings. When he leaves, he looks at you for exactly one second too long.'),
        ]),
        done('dig-leave', 'Take what you have and go', 'Leave before he looks up. Safe, and you never learn who he was.', 'dig-rival', 'unseen', [
          p('You gather your printouts and leave by the side door before he looks up. Outside, the city is empty and wet and yours. You have what you came for, a day later than you wanted, paid for in coins.'),
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

function breakInChoices(s: GameState): C8Choice[] {
  const records = !!getKey(s, 'own.piece.records');
  const deal = (id: string, label: string, hint: string, body: (x: GameState) => Block[]) =>
    offer8('breakin-' + id, label, hint, 'cost', (x) => {
      set8(x, 'breakin', id);
      return [...body(x), ...weekIntro(x)];
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
        t('Sixty dollars to make them use a different door. It is still worth it.'),
      ];
    }),
    deal('trap', 'Set a trap and say nothing', 'Talc on the floor, a hair across the wardrobe. You’ll know if they come back.', () => [
      p('You do it the way a novel would tell you to, and feel foolish doing it: a hair laid across the wardrobe door, a breath of talc on the boards inside the threshold, the old Axiom phone propped on the bookshelf recording the room to nobody.'),
      t('If they come back, I want them to find the flat exactly as they left it. And I want to know they came.'),
    ]),
    deal('report', 'Report it to the building', 'Make it official, and see who answers.', () => [
      p('The night concierge writes it down with great care and no expression. In the morning there is a letter under your door on heavy cream paper from the managing agents: they have reviewed the entry logs, there has been no unauthorised access to your apartment, and they trust this reassures you.'),
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
    offer8('money-' + id, label, hint, 'cost', (x) => {
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
      return [p('You pay it all on Friday morning at the bank machine with your coat collar up, and watch the number get smaller. It is a very ordinary kind of fear. You find you prefer it to the other kind.')];
    }),
    settle('sell', 'Sell the evening gown', `Someone will pay $${GOWN_PRICE} for it. It was hers first.`, (x) => {
      pay(x, GOWN_PRICE, 'the evening gown');
      return [
        p('The dress agency on the hill takes one look at the gown and stops pretending to be casual. Four hundred, cash. The woman behind the counter holds it up against the window light and says, “She had beautiful taste,” and does not say who she means.'),
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
      t('A week. In a week I will either have the name, or I will be looking for work.'),
    ]),
  ];
}

/** Over the wall: what she does with Meridian's client list. */
function listChoices(): C8Choice[] {
  return [
    offer8('list-read', 'Read every line', 'Slowly. It is all you will get.', 'close', (x) => {
      set8(x, 'list', 'read');
      note8(x, 'inventory', 'Meridian’s client list carries an entry set apart from the rest: VALE, E. · SINGAPORE · RETURNED TO INVENTORY · REISSUED.', 'The list itself, read line by line');
      return [
        p('You read it the way Adrian read an acquisition: every line, every footnote, every code. Most of it is a catalogue of things that should not be for sale. Near the bottom, set apart by a single blank line, is an entry that stops your breath.'),
        q('The client list', 'VALE, E. · SINGAPORE · RETURNED TO INVENTORY · REISSUED'),
        t('Returned to inventory. Not killed. Not retired. Shelved, like a coat nobody was wearing, and then taken down and fitted to me.'),
      ];
    }),
    offer8('list-copy', 'Copy it three ways and go', 'Get it out before anyone knows it’s gone.', 'close', (x) => {
      set8(x, 'list', 'copied');
      return [
        p('You do not read it. You photograph it, send the photograph to an address that forwards on, and write the three lines that matter most on the inside of your wrist in eyeliner, because paper can be taken and a phone can be wiped, and skin, for a few hours, is harder to search.'),
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
    if (!get8(s, 'money')) return moneyChoices(s);
    return [offer8('cost-continue', 'Look for a way over the wall', 'Every way costs something.', 'leverage')];
  }
  if (s.phase === 'leverage') return leverageChoices(s);
  if (s.phase === 'advance') return listChoices();
  if (s.phase === 'close') return [offer8('close-end', 'Carry it into the next room', 'Chapter 8 ends here.', 'complete')];
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
