/** Chapter 7 (Outside route, lane id `outside`) · The Sender:
 * flit → room → rules → page → price → dusk → complete (the shared end: 'Where It Points').
 * Design: docs/story/OUTSIDE_CHAPTER_7_THE_SENDER_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_7_SCRIPT.md. Route: docs/story/OUTSIDE_ROUTE_DESIGN.md.
 * Entered from the Chapter 7 confirm beat when the road is `outside`; the road continues to the shared Chapter 9 bridge
 * placeholder until Outside Chapter 8 exists. She cuts every institutional line and lives on the truth a source chooses
 * to send her: she leaves the watched flat (the green light goes off when Axiom stops paying); takes a room above a
 * shut-down shop by the old ferry terminal that the sender paid three months up in cash (she reads the gift as kindness,
 * a hook, or just a room); answers the 02:40 phone and hears the disguised voice that pauses before her name; writes her
 * rules of trade (three of five: verify, provenance, the source, no people, the door), which he reads back and keeps one
 * of his own to match; takes the first page (by Ch6) and pays the first price (always information: a fact, an answer, a
 * debt — refusable, and refusing costs only the page); a chosen evening (a partner from before at his place with the
 * consent flow, Maya who tracked her down, or alone at the window); the first card, WHO IS HOLDING THE PAGE? The sender
 * stays a voice this chapter (no face, no name until Ch8); he never makes her Nell; his price is always information; the
 * skeptic is never punished (OUTSIDE_ROUTE_DESIGN §2). Keys live under `out.*` and `c7.o-*`; choice ids carry `o7-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get5 } from './chapter5-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';
import { eveningPartners7 } from './chapter7-own';

const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES7 = ['flit', 'room', 'rules', 'page', 'price', 'dusk'] as const;
export const isOutside7 = (s: GameState) => getKey(s, 'route.lane') === 'outside';
export const outsidePhase7 = (s: GameState) => isOutside7(s) && ((OUTSIDE_PHASES7 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const c = (s: GameState, k: string) => s.choices[k];
const proof = (s: GameState) => c(s, 'c6.rook-proof'); // supported | broken | untested
const oracle = (s: GameState) => c(s, 'c6.oracle-seen') === 'yes';
const lied = (s: GameState) => !!c(s, 'c3.misdirect-rook');
const gave = (s: GameState) => c(s, 'c6.resolve-action') === 'resolve-trade-give';
type Partner = 'julian' | 'sebastian';
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');

export function placeOutside7(s: GameState): string | undefined {
  const open = get7(s, 'o-evening-open');
  if (s.phase === 'dusk' && open) return open.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
  if (s.phase === 'rules' && get7(s, 'o-rules-count')) return 'Noon · The table, the phone between you';
}

// ── The flit ──

function flitBlocks(): Block[] {
  return [
    p('Eight in the morning, the flat Axiom has watched since the spring, one last time. A holdall by the door with everything in it that is actually yours, which turns out to be very little: clothes, a hard drive, a photograph you will not look at until you are somewhere the lens in the hall cannot see it.'),
    p('On the counter, in a row, the things that are theirs: the badge, the key, the phone with SLOANE in it and a number marked BACKUP. You are giving them all back today. No handler, no file number, no protection. Just a name on a list of people who used to be an asset.'),
    p('High in the corner of the hall, the little camera with its steady green light, which has logged every morning of the last year: you leaving, you coming home, you not sleeping. In about an hour, when the tenancy Axiom paid for lapses and nobody renews it, it will go dark on its own.'),
    t('They will not stop me. That is the strange part. They spent a year watching me and the moment I walk out with nothing of theirs, I am nobody’s problem. Or I am a different kind of problem, the kind you watch from further away.'),
  ];
}

function flitChoices(): C7Choice[] {
  const f = (id: 'note' | 'tape' | 'nothing', label: string, hint: string, body: Block[]) =>
    offer7('o7-flit-' + id, label, hint, 'room', (x) => {
      set7(x, 'o-flit', id);
      return body;
    });
  return [
    f('note', 'Leave Sloane a note', 'On the counter, under the badge.', [
      p('You write it on the back of the envelope with your file number on it, in block capitals, and leave it under the badge where she will find it when facilities clear the flat.'),
      q('The note', 'YOU WATCHED THE WRONG PERSON. — 7A'),
      t('She will read it in a car, with the reading light on, and file it, and think about it more than she lets anyone see. That is as much of a goodbye as either of us gets.'),
    ]),
    f('tape', 'Tape over the green light, a last time', 'The first thing you did here. The last, too.', [p('You take the roll of electrician’s tape from the kitchen drawer, the same roll, and put one last strip over the green light in the hall, and stand under it for a moment in the dark you have made, the way you did on your first night in this flat.'), t('It will go off by itself in an hour. But I would rather it went off because I put my hand over it.')]),
    f('nothing', 'Leave it exactly as it is', 'Let them find the flat the way you leave it.', [p('You leave everything where it is, the badge squared on the counter, the light still green, and pick up the holdall and go, and do not look back at the corner of the hall, because there is a camera in it and you will not give it your face on the way out.')]),
  ];
}

// ── The room ──

function roomBlocks(): Block[] {
  return [
    p('Eleven o’clock, the far side of the river, the streets that smell of diesel and low tide. Above a shut-down chandler’s shop with its windows whited out, a room reached by an iron stair at the back: a bed, a table, a chair, a kettle, and a window that looks straight out over the black water at the old ferry terminal, dead these ten years.'),
    p('The key was in an envelope taped under the third step, where a voice on a payphone told you it would be. Inside, on the table, another envelope, fat with used notes — EXPENSES printed on it in the same block hand — and, squared beside it, a cheap phone in a blister pack, switched off.'),
    p('Three months, the landlord’s card says, paid up front, in cash, by a man he never met, over the telephone.'),
    t('Somebody I have never seen has given me a bed, a view and a bankroll, and asked for nothing yet. Nothing yet is the most expensive phrase in the language. I learned that from a file with my own face on it.'),
  ];
}

function roomChoices(): C7Choice[] {
  const r = (id: 'kindness' | 'hook' | 'room', label: string, hint: string, body: Block[]) =>
    offer7('o7-room-' + id, label, hint, 'rules', (x) => {
      set7(x, 'o-gift', id);
      return body;
    });
  return [
    r('kindness', 'Take it as a kindness', 'Somebody wanted you off the grid and safe.', [p('You let yourself, for one hour, take it as a kindness: that somewhere there is a person who looked at what you were caught in and simply got you out of it, and asked for nothing because there was nothing to ask. You make tea in the working kettle and drink it at the window and let yourself believe it, because you have not been able to believe anything for a year and the muscle needs the exercise.')]),
    r('hook', 'Take it as a hook', 'Everything baited is comfortable first.', [p('You count the notes — more than a month of careful living — and put them back, and check the room for a lens the way you have learned to, every corner, the smoke alarm, the mirror, the light fitting, and find nothing, which proves nothing. A gift this size is a hook. The only question is how long the line is, and who is holding the rod, and you do not know either, and that is exactly how they want you.')]),
    r('room', 'Take it as a room, and nothing more', 'A bed and a window. Owe it no story.', [p('You decide it is a room. A bed, a window, a kettle. You will not make it a kindness and you will not make it a trap, because both of those are stories about the person who paid for it, and you do not have that person yet. You put your holdall on the bed and your hard drive in the gap behind the skirting and your back to the wall, and wait for the phone.')]),
  ];
}

// ── The rules ──

const ruleName: Record<string, string> = { verify: 'Verify', provenance: 'Provenance', source: 'The source', people: 'No people', door: 'The door' };
const ruleText: Record<string, string> = {
  verify: 'I act on nothing I have not checked myself.',
  provenance: 'Every page comes with where you got it, or I don’t take it.',
  source: 'I never give up who you are. To anyone. For anything.',
  people: 'I trade facts. Never a person.',
  door: 'I can stop this, any time, and keep everything you have already sent.',
};
const ruleReply: Record<string, Block[]> = {
  verify: [q(SENDER, 'Then you’ll be slow. Slow is how the last one stayed alive. For a while.')],
  provenance: [q(SENDER, 'You want the chain of custody. I want you not to ask. One of us will give. It had better be written down which.')],
  source: [q(SENDER, 'You don’t know who I am. That is the only reason you can promise that. Keep not knowing, and you’ll keep being able to.')],
  people: [q(SENDER, 'Good.'), p('A silence on the line, longer than the others.'), q(SENDER, 'I traded a person once. I’m still paying. Write it down and hold to it and you’ll do better than I did.')],
  door: [q(SENDER, 'Yes. You can. She couldn’t, at the end — the door was there and she went the other way. I would like you to be able to. I mean that more than the rest of it.')],
};
/** His own rule, chosen to mirror hers. */
function hisRule(chosen: string[]): Block[] {
  if (chosen.includes('people')) return [q(SENDER, 'One of mine, then, to match yours: I will never ask you to be her. You have her face. You are not her errand. I forget that at two in the morning sometimes. Hold me to it.')];
  if (chosen.includes('door')) return [q(SENDER, 'One of mine, to match: I’ll take my door too, one day. When you don’t need the pages any more, you won’t hear from me again, and that will be the kindness, not the pages.')];
  if (chosen.includes('source')) return [q(SENDER, 'One of mine: I’ll never send you at a person. A page, a place, a date — never a knock on a door with your name behind it. That is not what you are for.')];
  return [q(SENDER, 'One of mine, to match yours: everything I send you is true, or marked where it isn’t. I have lied to a great many people. I find I would rather not start with you.')];
}

function rulesBlocks(): Block[] {
  return [
    p('The cheap phone, out of its plastic, switched on, one contact in it and no name. It rings at noon, because he knows you have arrived, because he knew you would come here, because he has known things about you for a year that you did not know he could.'),
    p('The voice is disguised, and disguised well: flat, unhurried, neither young nor old, run through something that shaves the edges off it. But it pauses before your name, a half-beat, the way you pause before a word in a language you learned late.'),
    q(SENDER, 'Evelynn. You’re in. Good. Before I send you anything, you’ll want to tell me the terms. You always did strike me as someone who reads the contract. So. Tell me how we do this.'),
    t('He is letting me write the rules. Which means either he is generous, or he has already decided which ones he will break, and wants to know which. I write them anyway. A rule he breaks is information too.'),
  ];
}

function rulesChoices(s: GameState): C7Choice[] {
  const chosen = (c(s, 'out.rules') ?? '').split(',').filter(Boolean);
  const n = chosen.length;
  if (n < 3) {
    const picks = (['verify', 'provenance', 'source', 'people', 'door'] as const)
      .filter((id) => !chosen.includes(id))
      .map((id) =>
        offer7('o7-rule-' + id, ruleName[id], ruleText[id], n + 1 >= 3 ? 'page' : 'rules', (x) => {
          const next = [...chosen, id];
          setKey(x, 'out.rules', next.join(','));
          set7(x, 'o-rules-count', String(next.length));
          const body: Block[] = [q('You', ruleText[id]), ...ruleReply[id]];
          if (next.length < 3) return body;
          note7(x, 'o-rules', `Evelynn set her rules of trade with the sender: ${next.map((k) => ruleName[k].toLowerCase()).join(', ')}.`, 'Written at the table, the first day off the books');
          return [...body, p('Three. He lets them stand, and does not argue, and then adds one of his own, unasked.'), ...hisRule(next)];
        }),
      );
    return picks;
  }
  return [];
}

// ── The page ──

function pageBlocks(s: GameState): Block[] {
  if (oracle(s))
    return [
      q(SENDER, 'You’ve seen one number from the ORACLE assessment. Here is the whole of it.'),
      p('The phone lights with a document you were denied clearance to read when you were Adrian: the full ORACLE run on the Evelyn identity transfer, both numbers, the modelling behind them, and at the bottom the directorate’s sign-off, and a signature you can almost read.'),
      t('High voluntary adoption. Low durable control. They knew they couldn’t keep me, and they signed anyway, and here is the page that says so, and the name of the hand that signed it, one blink away from legible.'),
    ];
  if (proof(s) === 'supported')
    return [
      q(SENDER, 'You proved the leaf to yourself. So you’ll believe this. The reuse of her name wasn’t Sloane’s to authorise. It was signed on the Project Eve board. One of the names on it, you have already met, and did not expect.'),
      p('A single line arrives: a board, a date, and one name blacked out with a marker, all but the shape of it, which is a shape you know.'),
      t('He blacks it out and sends me the shape of it anyway. He wants me to guess, and be right, and come to him needing the rest. I write the shape down. I do not write the guess.'),
    ];
  return [
    q(SENDER, 'You don’t trust the big pages yet. Fair. Here’s a small one. See what you can do with a true thing that looks like nothing.'),
    p('A scanned shipping manifest, a year old, a container line out of Singapore, one entry highlighted: a consignment booked by a freight-forwarder you have never heard of, to a warehouse address you could find on a map in an afternoon.'),
    t('Real, and dull, and hard to use. Which is either all he has for someone who doubts him, or a test of whether I can turn a dull true thing into a live one. Both, probably.'),
  ];
}

function pageChoices(s: GameState): C7Choice[] {
  const kind = oracle(s) ? 'oracle' : proof(s) === 'supported' ? 'board' : 'thin';
  const label = oracle(s) ? 'the ORACLE assessment, in full' : proof(s) === 'supported' ? 'a Project Eve board name' : 'a year-old shipping manifest';
  const pg = (id: 'verify' | 'raw' | 'aside', l: string, hint: string, body: Block[]) =>
    offer7('o7-page-' + id, l, hint, 'price', (x) => {
      setKey(x, 'out.page1', kind);
      set7(x, 'o-page', id);
      note7(x, 'o-page1', `The sender’s first page: ${label}. Evelynn chose to ${id === 'verify' ? 'verify it independently' : id === 'raw' ? 'use it raw' : 'set it aside for now'}.`, 'The sender, the first day');
      return body;
    });
  return [
    pg('verify', 'Verify it yourself first', 'Slow. Certain. Your first rule, if you wrote it.', [p('You do not touch it yet. You start the slow way: a second source, a public record, a cross-check you run yourself, the way you ran the leaf. It will take days. It is the only thing you will ever be able to stand behind in a room, and you decide, in this bare room over the water, that standing behind things is the whole of what you have left.')]),
    pg('raw', 'Use it raw', 'Fast. Risky. His word for it, and nothing else.', [p('You take it as it is, on his word, and move on it the same afternoon, because a true thing is only worth anything while it is still warm, and a page you sit on to verify is a page somebody else acts on first. It is a risk. You have decided, for today, to be the one who moves.')]),
    pg('aside', 'Set it aside', 'Take it. Do nothing yet. Watch him.', [p('You take the page and do nothing with it, and tell him so, and watch what he does when a source does not jump. A real source waits. A handler pushes. You are going to learn which one he is by the shape of the silence.')]),
  ];
}

// ── The price ──

function priceBlocks(s: GameState): Block[] {
  return [
    q(SENDER, 'Now the part you’ve been waiting for. Nothing is free, and I don’t insult you by pretending it is. My price is never money and it is never you. It is what you know. A fact for a fact.'),
    ...(lied(s) ? [q(SENDER, 'And before you choose — you lied to me once. The date, a year ago, when I first found you. I sent the page anyway. I’m not holding it against you. I’m telling you I remember, so you know the terms are honest on both sides.')] : []),
    p('Three ways to pay, he says, and you may refuse, and if you refuse the page goes back in the drawer and you are out nothing but the page.'),
  ];
}

function priceChoices(s: GameState): C7Choice[] {
  const pr = (id: 'fact' | 'answer' | 'debt' | 'refuse', label: string, hint: string, body: Block[]) =>
    offer7('o7-price-' + id, label, hint, 'dusk', (x) => {
      setKey(x, 'out.price1', id);
      if (id === 'fact') {
        setKey(x, 'out.gave-fact');
        note7(x, 'o-price', 'Evelynn paid the sender with a fact she held. It is his now.', 'The first trade, the first day');
      } else if (id === 'answer') {
        note7(x, 'o-price', 'Evelynn answered a question about herself for the sender. He knows one true thing about her he did not.', 'The first trade, the first day');
      } else if (id === 'debt') {
        setKey(x, 'out.alliance.rook', 'owed');
        note7(x, 'o-price', 'Evelynn owes the sender one, uncalled.', 'The first trade, the first day');
      } else {
        setKey(x, 'out.refused-price');
      }
      return body;
    });
  const surcharge = lied(s) ? p('He takes it, and there is a pause, the watchful kind. “Good,” he says. “That’s the other thing about a fact. I can check it. Unlike a date.”') : p('He takes it, and files it somewhere you cannot see, and the line is quiet in the way a person is quiet when they are writing something down.');
  return [
    pr('fact', 'Give him a fact you hold', 'A detail you carried out. It’s his now.', [p('You give him one thing you know and he does not: a name from the Glass House, a date, a number off a wafer. You feel it leave you, the way you feel a photograph leave your hand across a counter, and know you cannot ask for it back.'), surcharge]),
    pr('answer', 'Answer a question about yourself', 'Let him know one true thing about you.', [
      q(SENDER, 'Then a question. The night they made you — Candidate 7A. Did you say yes, or did you only stop saying no?'),
      q('You', 'I stopped saying no. I have spent a year deciding those are different. Some days I win.'),
      p('The line is silent for a long moment.'),
      q(SENDER, 'They are different. Hold on to the days you win.'),
    ]),
    pr('debt', 'Owe him one instead', 'Pay nothing now. He’ll call it.', [p('You give him nothing today, and take the page, and let the ledger sit open between you with your name on the wrong side of it. A debt to a man with no face, called at a time of his choosing. You have owed worse people for worse reasons. You write it down so at least one of you has it in writing.')]),
    pr('refuse', 'Refuse; give the page back', 'Keep the room. Lose the page.', [p('You put the page back in the drawer, unspent, and tell him no, not today, not at that price. He does not argue. The page was never the point of the first day. The first day is about whether you can say no to him and still be on the phone tomorrow. You can. So can he.'), q(SENDER, 'All right. It keeps. Leave by the river side when you go out. Habit. Yours now, too.')]),
  ];
}

// ── The evening ──

const inviteLines: Record<Partner, Block[]> = {
  julian: [
    p('Julian’s flat, on the forty-first floor of a building nobody watches, and his face when you tell him you have left Axiom, left everything, taken a room over a shut shop with a river view and a burner phone.'),
    q('Julian Mercer', 'You’ve gone off the map entirely. I find I’m not surprised, and I find I like it, and I’m not sure what that says about me. Stay. Tell me what you want tonight, and that’s what happens.'),
  ],
  sebastian: [
    p('The late set at the Harbour, forty people in the dark and one cello, and afterwards, in the corridor behind the stage, Sebastian takes your face in both hands and looks at you as if he can see the badge is gone.'),
    q('Sebastian', 'You’ve got a new kind of tired on you. Lighter. The hotel’s round the corner, or I walk you to wherever you live now. You choose.'),
  ],
};
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that’s the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  sebastian: { 'no-sex': 'Good. I’d like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stayBody: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you against the window with the city behind you, slowly, and stops exactly where you said, and holds you there, his hand warm at the back of your neck, until the lights go out down there one district at a time.')],
    sex: [p('He kisses you against the window, and the dress goes first, and then any pretence that either of you came to talk. He asks once more, his mouth against your shoulder, and you answer by drawing him toward the bedroom.'), p('What happens next is yours and his. Nobody is watching this one. The scene fades.')],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says out loud what he likes about what he finds, and when you say that is where tonight stops he laughs against your throat and stays exactly there with you.')],
    sex: [p('He undoes the dress slowly and says out loud what he likes, and every word lands. When he asks once more, low, whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room no camera has ever seen. The scene fades.')],
  },
};

function duskBlocks(): Block[] {
  return [p('Seven o’clock, and the river going grey, then black, then the lights of the far bank coming on one at a time. A room nobody is watching. No green light. For the first time in a year, the evening is entirely yours, and you have to decide, out of practice, what to do with a thing that is yours.')];
}

function duskChoices(s: GameState): C7Choice[] {
  const open = get7(s, 'o-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer7('o7-evening-' + id, label, hint, 'complete', (x) => {
      set7(x, 'o-evening', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer7('o7-' + partner + '-' + id, label, hint, 'dusk', (x) => {
        set7(x, 'o-evening-open', partner + '-room');
        set7(x, 'o-evening-scope', id);
        note7(x, 'o-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      scope('sex', partner === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer7('o7-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c7.o-evening-open'];
        set7(x, 'o-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and he walks you to a taxi and does not ask why, and you go home to a room over the water with one phone in it, face down on the table.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get7(s, 'o-evening-scope') as 'no-sex' | 'sex';
    return [
      offer7('o7-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c7.o-evening-open'];
        set7(x, 'o-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and steps back, and says “Of course,” and means it, and calls you a car.')];
      }),
      offer7('o7-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c7.o-evening-open'];
        set7(x, 'o-evening-outcome', 'intimate-' + sc);
        return stayBody[partner][sc];
      }),
    ];
  }
  return [
    ...(c(s, 'c6.maya') === 'restored'
      ? [
          done('maya', 'Maya finds the room', 'She always could.', [
            p('She knocks at nine, with a bottle and two coffees, and does not explain how she found a room you told no one about.'),
            q('Maya', 'You’re off every system I have. No badge, no number, no address on file. That’s how I knew where to look — the one place with nothing pointing at it. You can’t hide from a woman in compliance by disappearing. That’s the one move we’re trained on.'),
            q('You', 'Then don’t put me back on a system.'),
            q('Maya', 'I never put you on one. That was the others. Give me the number of that horrible phone and I’ll never ring it, so you know somebody has it who won’t.'),
          ]),
        ]
      : []),
    ...partners(s).map((pt) =>
      offer7('o7-evening-' + pt, pt === 'julian' ? 'Go to Julian’s' : 'The late set at the Harbour', pt === 'julian' ? 'His place. Off the map, like you.' : 'Sebastian. One cello, and afterwards.', 'dusk', (x) => {
        set7(x, 'o-evening', pt);
        set7(x, 'o-evening-open', pt);
        return inviteLines[pt];
      }),
    ),
    done('alone', 'Alone, at the window', 'The river side. The phone face down.', [p('You stay in, alone, and pull the chair to the window, and watch the ferry terminal that no ferry has left from in ten years, and the water moving under it, black and patient. The phone lies face down on the table behind you. You do not turn it over. It is the first night in a year that nothing is watching you, and you find you want to spend it watching something else.'), t('She stood where I am standing, maybe. The first one. Looked at this water. I am wearing her name and I am standing in her city’s poorer cousin and I still do not know if she is dead. Tomorrow I start finding out.')]),
  ];
}

// ── The first card ──

function completeBlocks(s: GameState): Block[] {
  return [
    ...(get7(s, 'o-evening-outcome')?.startsWith('intimate') ? [p('You get back to the room over the water at dawn. Nothing has watched it while you were gone. Nothing watched you while you were away. You had forgotten that a night could belong to nobody but the people in it.')] : []),
    p('The wall over the table, late. You pin the first card of a new road in the middle of it, in capitals.'),
    q('The card', 'THE SENDER.'),
    p('And underneath it, in pencil, smaller, the question the whole road turns on:'),
    q('The card', 'WHO IS HOLDING THE PAGE?'),
    ...(c(s, 'out.price1') === 'debt' ? [p('And in the corner: I OWE HIM ONE.')] : c(s, 'out.refused-price') ? [p('And in the corner: I SAID NO AND HE STAYED.')] : []),
    ...(c(s, 'out.rules')?.includes('people') ? [p('And under that, in his words, smaller still: HE TRADED A PERSON ONCE.')] : []),
    t('No badge, no handler, no camera, no name for the man who pays the rent. Everything I have now, I have because I can check it. It is not much. It is the first thing in a year that is only mine.'),
  ];
}

export function outsideBlocks7(s: GameState): Block[] {
  if (s.phase === 'flit') return flitBlocks();
  if (s.phase === 'room') return roomBlocks();
  if (s.phase === 'rules') return rulesBlocks();
  if (s.phase === 'page') return pageBlocks(s);
  if (s.phase === 'price') return priceBlocks(s);
  if (s.phase === 'dusk') return duskBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'flit') return flitChoices();
  if (s.phase === 'room') return roomChoices();
  if (s.phase === 'rules') return rulesChoices(s);
  if (s.phase === 'page') return pageChoices(s);
  if (s.phase === 'price') return priceChoices(s);
  if (s.phase === 'dusk') return duskChoices(s);
  return [];
}
