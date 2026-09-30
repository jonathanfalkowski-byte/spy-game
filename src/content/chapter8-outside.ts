/** Chapter 8 (Outside route, lane id `outside`) · Provenance:
 * settle → leads → plant → terminal → after → complete (the shared end: 'The Next Room').
 * Design: docs/story/OUTSIDE_CHAPTER_8_PROVENANCE_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/OUTSIDE_CHAPTER_8_SCRIPT.md. Route: docs/story/OUTSIDE_ROUTE_DESIGN.md.
 * Entered from an Outside `chapter7.complete`; hands on to the shared Chapter 9 bridge ("Follow the vendor"). Three weeks
 * off the books, a hub of leads: three of five (the manifest, the board list, E.V. (I), Sloane's file, the courier
 * route), each verify / use raw / sell on, each touched by a Ch7 rule. Then the plant: one lead was Meridian's, caught by
 * anyone who checks (the verify rule, or a verified lead), biting anyone who doesn't; MERIDIAN HOLDINGS surfaces. Then the
 * terminal at 02:40, the sender in person for the first time, a man in a courier's jacket who says "Evelynn" and pauses
 * and proves he is "R." (take his hand / stay in the dark / turn a light on him); he gives her the vendor, not his name.
 * The evening (a partner from before with the consent flow, Maya, or alone with the wall). The second card, MERIDIAN ·
 * THE VENDOR. His price is always information; the skeptic is never punished; the sender stays unnamed (three soft cracks
 * of Nell); Sloane is a target or a trade, never a romance (OUTSIDE_ROUTE_DESIGN §2). Keys live under `out.*` and
 * `c8.o-*`; choice ids carry `o8-`. Local helpers mirror chapter8.ts to avoid a circular import. */
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
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES8 = ['settle', 'leads', 'plant', 'terminal', 'after'] as const;
export const isOutside8 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase8 = (s: GameState) => isOutside8(s) && ((OUTSIDE_PHASES8 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const rule = (s: GameState, id: string) => (key(s, 'out.rules') ?? '').split(',').includes(id);
const bump = (s: GameState, k: string) => setKey(s, k, String(Number(key(s, k) ?? 0) + 1));
type Lead = 'manifest' | 'board' | 'retired' | 'sloane' | 'courier';
const LEADS: Lead[] = ['manifest', 'board', 'retired', 'sloane', 'courier'];
const LEAD_CARD: Record<Lead, string> = { manifest: 'THE MANIFEST', board: 'THE BOARD LIST', retired: 'E.V. (I)', sloane: 'SLOANE’S FILE', courier: 'THE COURIER ROUTE' };
const weeks = (s: GameState) => Number(get8(s, 'o-weeks') ?? 0);
const WEEK = ['Week one', 'Week two', 'Week three'];
type Partner = 'julian' | 'sebastian';
const c = (s: GameState, k: string) => s.choices[k];
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');
const verified = (s: GameState) => Number(key(s, 'out.verified') ?? 0);

export function placeOutside8(s: GameState): string | undefined {
  const open = get8(s, 'o-open') as Lead | undefined;
  if (s.phase === 'leads' && open) return WEEK[weeks(s)] + ' · The wall over the water';
  const ev = get8(s, 'o-evening-open');
  if (s.phase === 'after' && ev) return ev.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · A hotel round the corner from the Harbour';
}

// ── The settle ──

function settleBlocks(): Block[] {
  return [
    p('Three weeks in the room over the water, and you learn the shape of a life with no badge in it. You wake when the light comes off the river. You do not leave at the same time twice. You buy nothing on a card. The wall above the table fills, page by page, with what the sender sends, and between the pages you run a red thread, corner to corner, wherever two of them agree about the same night.'),
    p('And beside the wall, a smaller thing, a schoolchild’s exercise book: your ledger of what you have actually checked. It is much shorter than the wall. That gap — between what you have been told and what you have proved — is the only honest measure of where you stand, and you keep it in pencil, and you do not let yourself lie to it.'),
    p('The phone rings at 02:40, always 02:40, the hour of the handoff on the leaf. A page a week, one week at a time. He never sends two before you have done something with the first. He is teaching you, or testing you, or both, and you have decided to let him, because a rule he sets is information too.'),
    q(SENDER, 'Three this month. Take them one at a time. And Evelynn — check them. I’d rather be doubted than believed. The last person who believed me isn’t here to say so.'),
    t('The last person. He does that. Drops a stone in the water and lets me watch the rings. I write it on the wall with the rest: THE LAST PERSON. And a question mark, because a question mark is all I have earned.'),
  ];
}

function settleChoices(): C8Choice[] {
  return [offer('o8-settle-on', 'Take the first page down off the phone', 'One at a time. Check them.', 'leads', () => [p('You take the first page down and lay it on the table under the lamp, and begin.')])];
}

// ── The leads hub ──

const leadLead: Record<Lead, Block[]> = {
  manifest: [p('A shipping manifest, a year old, a container line out of Singapore, one consignment ringed: booked by a freight-forwarder you have never heard of, to a warehouse on the black side of the river, not a mile from where you sleep.')],
  board: [p('A list: the Project Eve board, the people who signed off on the reuse of a dead woman’s name. Five entries. Four are initials and titles. The fifth is blacked out with a marker, all but the shape of it — and the shape of it is a name you have already met, and did not expect.')],
  retired: [p('A single page about the prior instance. E. V. (I). A location history, a set of dates, and stamped across the top in red, at an angle, the way they close a matter: RETIRED · SINGAPORE. Someone wore this name before you. This is the first solid thing you have ever held that says so.')],
  sloane: [p('A file you did not ask for: VICTORIA SLOANE, her Axiom personnel jacket, every posting, every assessment, the ORACLE note, the reprimand that never came. The sender sent it unasked, which is the sender telling you something without saying it: here is a person who could be a lever, if you were the sort of person who used one.')],
  courier: [p('A page that is about a route, not a fact: a courier’s movements, years old, a pattern of handoffs, a terminal, an hour — 02:40. It is not a lead into Meridian. It is a lead into the sender. He has sent you, without seeming to, the thread that runs back to his own door.')],
};
const LEAD_LABEL: Record<Lead, string> = { manifest: 'The manifest', board: 'The board list', retired: 'E.V. (I)', sloane: 'Sloane’s file', courier: 'The courier route' };
const LEAD_HINT: Record<Lead, string> = {
  manifest: 'A container out of Singapore.',
  board: 'Who signed for you. One name hidden.',
  retired: 'The one who wore the name before you.',
  sloane: 'Her whole jacket. Unasked.',
  courier: 'A route that runs back to him.',
};

function leadsBlocks(): Block[] {
  return [p('The wall. Three pages to work this month, one at a time, each asking the only question that matters off the books: can you prove it?')];
}

function answers(s: GameState, lead: Lead): C8Choice[] {
  const done = weeks(s) >= 2 ? 'plant' : 'leads';
  const verify = (body: (x: GameState) => Block[]) =>
    offer('o8-' + lead + '-verify', 'Verify it', 'Slow. Certain. Stand behind it.', done, (x) => {
      setKey(x, 'out.lead.' + lead, 'verified');
      bump(x, 'out.verified');
      set8(x, 'o-weeks', String(weeks(x) + 1));
      delete x.choices['c8.o-open'];
      return body(x);
    });
  const raw = (body: (x: GameState) => Block[]) =>
    offer('o8-' + lead + '-raw', 'Use it raw', 'Fast. Risky. His word for it.', done, (x) => {
      setKey(x, 'out.lead.' + lead, 'raw');
      bump(x, 'out.raw');
      set8(x, 'o-weeks', String(weeks(x) + 1));
      delete x.choices['c8.o-open'];
      return body(x);
    });
  const sell = (body: (x: GameState) => Block[]) =>
    offer('o8-' + lead + '-sell', 'Sell it on', 'Money now. A trail behind it.', done, (x) => {
      setKey(x, 'out.lead.' + lead, 'sold');
      bump(x, 'out.sold');
      setKey(x, 'out.trail');
      set8(x, 'o-weeks', String(weeks(x) + 1));
      delete x.choices['c8.o-open'];
      return body(x);
    });
  if (lead === 'manifest')
    return [
      verify((x) => [p(rule(x, 'provenance') ? 'You make him say where he got it before you touch it. A broker’s name, in Rotterdam, which is itself a lead, which is the point of the rule.' : 'You take it slowly: the container number against the line’s public schedule, the forwarder against the companies register, three days of it.'), p('It is a legend-supply shipment. Wardrobe, papers, a watch, a wallet worn to look ten years old — everything you build a reissued person out of. There is a woman being made in a warehouse across the river, the way you were made in a clinic. You verified it. You can say it in a room and not blink.')]),
      raw(() => [p('You move on the warehouse that night, in the rain, and find a roller door, a padlock, and a smell of new cardboard. Something was here. It is not here now. You acted while it was warm, and warm is all you have to show for it.')]),
      sell(() => [p('A rival importer pays you, in cash, for a competitor’s manifest, and asks no questions, and you have money for a month and a record, somewhere, that Evelynn Vale sold a page. You tell yourself the page was nothing. You write SOLD on the wall anyway, in pencil, honest.')]),
    ];
  if (lead === 'board')
    return [
      verify((x) => [p(rule(x, 'verify') ? 'You will not let yourself even think the name until it is checked. You run the four you can see against the public filings, and the shape of the fifth against the same, and the shape holds: the blacked-out seat belongs to someone who sits on three boards you can name and one you cannot.' : 'You cross-check the names against public filings, patient and slow.'), t('I know the shape. I have stood in a room with the shape. I do not write it down yet. A shape is not a name until it is checked, and I have only checked that the seat is real.')]),
      raw(() => [q(SENDER, 'Careful. That one I can’t stand behind. It’s a shape, not a signature. Act on a shape and you’re doing their work for them.'), p('You act on the guess anyway, and set something moving that you cannot call back, and do not yet know whether you are right.')]),
      sell(() => [p('You trade the list — a journalist, or a name at Axiom you still half-trust — for something you want more than a list. It is out of your hands now, and moving, and it has your fingerprints on it, faint, but there.')]),
    ];
  if (lead === 'retired')
    return [
      verify(() => [p('You set the page beside the leaf, and the dates line up: the same Singapore, the same season, the same small hours. The woman on this page is the woman who wrote the note in the margin. She was real. She had a hand. And stamped across her, in red: RETIRED.'), t('Retired. They retire a legend the way you retire a debt: you stop servicing it. I check the word twice. I do not like it any better the second time.')]),
      raw(() => [p('You carry it out into the world before you know what it weighs: a page that says a woman was unmade, waved at the wrong person, used as a lever before you have understood it is a headstone. It works. It also costs you something you cannot name and do not get back.')]),
      // no people: selling a page with a person in it is closed
      ...(rule(s, 'people')
        ? []
        : [sell(() => [p('You put it on the market, and then, at the last second, you don’t. You take it back off the table with your own hand. Some pages have a person in them, and this one is all person, and you find you cannot, after all, sell a woman by the pound.'), t('So there is a line even I won’t cross for rent. Good to know. Expensive to learn.')])]),
    ];
  if (lead === 'sloane')
    return [
      offer('o8-sloane-bank', 'Bank it', 'Keep it. Unspent. Leverage, held.', done, (x) => {
        setKey(x, 'out.file', 'bank');
        setKey(x, 'out.lead.sloane', 'bank');
        set8(x, 'o-weeks', String(weeks(x) + 1));
        delete x.choices['c8.o-open'];
        return [p('You copy it, and file the copy behind the skirting with the hard drive, and send nothing on. Victoria Sloane is a door you might need, one day, and now you have the key to it, and she does not know you do. You do not like how easily you did that. You do it anyway.')];
      }),
      offer('o8-sloane-burn', 'Burn it to the sender', 'Trade it. Owe, or be owed, one.', done, (x) => {
        setKey(x, 'out.file', 'burn');
        setKey(x, 'out.lead.sloane', 'burn');
        setKey(x, 'out.alliance.rook', key(x, 'out.alliance.rook') === 'owed' ? 'square' : 'creditor');
        set8(x, 'o-weeks', String(weeks(x) + 1));
        delete x.choices['c8.o-open'];
        return [p('You send it back to him, marked read, in exchange for the next thing you want, and the ledger between you shifts a line. He will use it. You have decided you would rather he used it than you.'), q(SENDER, 'She’ll have made an enemy of you the day this lands. I hope you meant to.')];
      }),
      offer('o8-sloane-leave', 'Leave it', rule(s, 'people') ? 'Your rule. Not a woman’s file.' : 'Send it back unread.', done, (x) => {
        setKey(x, 'out.file', 'leave');
        setKey(x, 'out.lead.sloane', 'leave');
        set8(x, 'o-weeks', String(weeks(x) + 1));
        delete x.choices['c8.o-open'];
        return [q('You', rule(x, 'people') ? 'I trade facts. Not a woman’s file. We wrote that down.' : 'Not this one. Send it back.'), q(SENDER, 'Noted. You’ll keep more of yourself that way than I did.')];
      }),
    ];
  // courier
  return [
    verify(() => [p('You do the thing he did not expect: you turn his own method on him. You follow the route on the page — the terminal, the hour, the pattern — and it does not lead to Meridian at all. It leads to a man. To a standing appointment at 02:40, at the dead terminal, kept by somebody for years. You have found where he lives, or near enough. You do not tell him you have. You simply say you will be there.'), t('The source has a shape now, and a place, and an hour. Provenance, turned on the man who taught me the word.')]),
    raw(() => [q('You', 'I followed your route. I know it runs back to you. Who are you?'), p('The line is silent for a long time, longer than the disguiser needs.'), q(SENDER, 'Not on a phone. If you’ve got this far, you already know where. And when.'), p('He rings off, and you sit with the knowledge that you rattled him, which is the first time, and does not feel the way you thought it would.')]),
    ...(rule(s, 'source')
      ? []
      : [sell(() => [p('You look for somebody to sell a ghost to, and find there is no market in a man with no name, and put the page in the drawer, and keep it after all. Some pages have nobody to buy them. This is the one you keep.')])]),
  ];
}

function leadsChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'o-open') as Lead | undefined;
  if (open) return answers(s, open);
  return LEADS.filter((l) => !key(s, 'out.lead.' + l)).map((l) =>
    offer('o8-lead-' + l, WEEK[weeks(s)] + ': ' + LEAD_LABEL[l], LEAD_HINT[l], 'leads', (x) => {
      set8(x, 'o-open', l);
      return leadLead[l];
    }),
  );
}

// ── The plant ──

const caught = (s: GameState) => rule(s, 'verify') || verified(s) >= 1;

function plantBlocks(s: GameState): Block[] {
  if (caught(s))
    return [
      p('Thursday of the third week, and something on the wall does not sit right. You have felt it for days, the way you feel a wrong note in a room next door: one of the pages he sent has a seam in it. You go back to it with the lamp and a glass, slowly, the way the rule taught you, and you find it — a date that cannot be right, a letterhead a season too new — and you pull the thread, and it runs back through a company that owns nothing to a company that owns that one, to a name on a brass plate that is a cut-out for MERIDIAN HOLDINGS.'),
      q('The wall', 'MERIDIAN HOLDINGS · VENDOR'),
      t('A plant. Seeded into the pile to see whether the new one checks her pages. I checked. So now I know two things I am sure of: Meridian is the vendor, and Meridian is already watching to see what kind of Evelyn they reissued.'),
    ];
  return [
    p('Thursday of the third week, and it goes wrong the way these things go wrong: quietly, and then all at once. A page you took on his word and acted on turns out to have been built to be acted on — a date a season too new, a letterhead from a company that is a cut-out for something called MERIDIAN HOLDINGS. You moved on a lie. You did their work for them. And now, somewhere in Meridian, somebody has the one piece of intelligence they seeded the pile to get: the new Evelyn does not check.'),
    q('The wall', 'MERIDIAN HOLDINGS · VENDOR'),
    t('They fed me a false page to find out what kind of me they made. I ate it. The cost is not a bruise. The cost is that they know, now, exactly how to feed me the next one.'),
  ];
}

function plantChoices(s: GameState): C8Choice[] {
  return [
    offer('o8-plant-on', caught(s) ? 'Tell the sender you caught it' : 'Tell the sender it bit', 'He will have something to say.', 'terminal', (x) => {
      setKey(x, 'out.plant', caught(x) ? 'caught' : 'bit');
      setKey(x, 'out.vendor', 'meridian');
      note(x, 'o-vendor', 'Evelynn traced a seeded page back to a cut-out for MERIDIAN HOLDINGS, the vendor behind the Evelyn legend.', 'The wall, the third week');
      return caught(x)
        ? [q(SENDER, 'You caught it.'), q('You', 'You sent it.'), q(SENDER, 'I sent it. I had to know. The last one stopped checking, near the end. That’s a sentence, not a coincidence. I needed you not to be her in the one way that got her killed.'), t('The last one. Stopped checking. Got killed. Three stones in the water, and the rings are starting to make a shape I can almost read.')]
        : [q(SENDER, 'It bit. I’m sorry. I had to know, and now we both do.'), q('You', 'You could have just asked.'), q(SENDER, 'The last one I asked is dead. I’ve stopped trusting what people tell me and started trusting what they do. You’ll forgive me, or you won’t. Either way you’ll check the next one.')];
    }),
  ];
}

// ── The terminal ──

function terminalBlocks(): Block[] {
  return [
    p('02:40, the old ferry terminal, the tide out, the mud shining under a dead sodium lamp. He is where he said he would be, on the far side of the broken barrier, and for the first time in a year he is not a voice. He is a man.'),
    p('Forty, give or take. A courier’s jacket, waxed at the cuffs from a thousand handoffs. A good watch on a strap gone soft with age. A face that has not slept properly in a long time, and was handsome once, and would be again if it ever stopped listening for a sound behind it. He does not disguise his voice now. There is no point. You are looking straight at him.'),
    q(SENDER, 'Evelynn.'),
    p('The pause is there, live, in the air between you: the half-beat before your name, the one you have heard on the phone for a year, and now you can see it, a small flinch at the corner of his mouth, the effort of putting the right name to a face that is the wrong one.'),
    q(SENDER, 'The 02:40 on the leaf. The handoff marked R. That was me, on the other end of it, taking a package I didn’t read from a woman who missed her breakfast to bring it. Nobody who only held that page could tell you what was in it. I can. I carried it. Ask me, if you want it. Or don’t, and we stay what we are.'),
    t('R. On the leaf. The courier she handed things to at two in the morning. He is not proof of everything. He is proof of one thing: he was there, on the other side of the handoff, close enough to the first Evelyn to be paying for it a year later at a dead terminal in the rain.'),
  ];
}

function terminalChoices(): C8Choice[] {
  const m = (id: 'hand' | 'dark' | 'light', label: string, hint: string, body: Block[]) =>
    offer('o8-met-' + id, label, hint, 'after', (x) => {
      setKey(x, 'out.met', id);
      note(x, 'o-met', `Evelynn met the sender in person for the first time at the ferry terminal; he proved he is "R." on the ledger leaf. She ${id === 'hand' ? 'crossed the distance to him' : id === 'dark' ? 'kept to her side and kept him a source' : 'turned a light on him and pressed for who he is'}.`, 'The old ferry terminal, 02:40');
      return body;
    });
  return [
    m('hand', 'Cross to him', 'Over the barrier. Nearer.', [
      p('You climb the broken barrier and cross the mud and stand close enough to see that his eyes are not on you but on the middle distance, still, always, listening. It is not romance. It is two people who have been alone with the same dead woman’s handwriting for a year, standing in the one place she is nearest, and it is the closest thing to being known that either of you has had in a long time.'),
      q('You', 'I don’t know your name.'),
      q(SENDER, 'No. Not yet. Names are the last thing I’ll give you, because a name is the thing they take you apart with. But I’m glad you came over. She’d have stayed behind the barrier. She stayed behind everything, right up until she didn’t.'),
    ]),
    m('dark', 'Stay on your side', 'Keep the barrier. Keep him a source.', [
      p('You stay where you are, on your side of the broken rail, hands in your pockets, and let the distance stand. He nods, once, as if you have passed a test he did not tell you he was setting.'),
      q(SENDER, 'Good. Don’t trust the face. Faces are the easiest thing in the world to fake — I should know, I’ve carried a dozen of them across a border in a bag. The page, you can check. The face, you can only believe. Keep believing the pages.'),
    ]),
    m('light', 'Turn a torch on him', 'Who are you. What do you want.', [
      p('You take the little torch from your pocket and put it on his face, full, and he does not flinch from the light the way a hunted man flinches — he has been in worse lights than yours.'),
      q('You', 'Who are you, and what do you actually want out of this? No more pages. A sentence.'),
      q(SENDER, 'I want what you want. To know what became of her. You just don’t know yet that that’s what you want, because you’re still busy being frightened of being her. Follow the vendor. Meridian. Everything that was done to her and to you was signed there. That’s the sentence. Now put the torch down before somebody who isn’t me sees it.'),
    ]),
  ];
}

// ── The evening ──

const inviteLines: Record<Partner, Block[]> = {
  julian: [p('Julian’s flat, late, and his careful not-asking about where you have been at two in the morning, which is its own kind of tact.'), q('Julian Mercer', 'You smell of the river and you’re miles away. I’m not going to ask. Stay. Tell me what you want tonight, and that’s what happens.')],
  sebastian: [p('Sebastian, after the late set, who takes one look at your face and does not play you anything sad.'), q('Sebastian', 'You’ve been somewhere cold and it’s still on you. Come here. The hotel’s round the corner, or I walk you to the water. You choose.')],
};
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };
const scopeReply: Record<Partner, Record<'no-sex' | 'sex', string>> = {
  julian: { 'no-sex': 'Then that’s the evening. You set the edge, and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. The same for me.' },
  sebastian: { 'no-sex': 'Good. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stayBody: Record<Partner, Record<'no-sex' | 'sex', Block[]>> = {
  julian: {
    'no-sex': [p('He kisses you slowly, with the city behind you, and stops exactly where you said, and holds you there until the cold comes off you and you are only tired.')],
    sex: [p('He kisses you and the day goes off you like a coat, and he asks once more, his mouth at your shoulder, and you answer by drawing him toward the bedroom.'), p('What happens next is yours and his. Nobody is watching this one. The scene fades.')],
  },
  sebastian: {
    'no-sex': [p('He undoes the dress slowly and says what he likes, and when you say that is where tonight stops he laughs against your throat and stays there.')],
    sex: [p('He undoes the dress slowly, and when he asks once more whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room no one has ever watched. The scene fades.')],
  },
};

function afterBlocks(): Block[] {
  return [p('Home, or somewhere warmer. The wall is still on the far side of the room with its red thread and its three stones — the last person, the last one, what became of her — and you have to decide what to do with the rest of a night that is entirely your own.')];
}

function afterChoices(s: GameState): C8Choice[] {
  const open = get8(s, 'o-evening-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o8-evening-' + id, label, hint, 'complete', (x) => {
      set8(x, 'o-evening', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const partner = open as Partner;
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('o8-' + partner + '-' + id, label, hint, 'after', (x) => {
        set8(x, 'o-evening-open', partner + '-room');
        set8(x, 'o-evening-scope', id);
        note(x, 'o-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      scope('sex', partner === 'sebastian' ? 'Go back with him for the night' : 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('o8-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c8.o-evening-open'];
        set8(x, 'o-evening-outcome', 'declined');
        return [p('You say goodnight and mean it, and go home to the room over the water, and the wall, and the thread.')];
      }),
    ];
  }
  if (open) {
    const partner = open.replace('-room', '') as Partner;
    const sc = get8(s, 'o-evening-scope') as 'no-sex' | 'sex';
    return [
      offer('o8-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c8.o-evening-open'];
        set8(x, 'o-evening-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you until the cold is gone.')];
      }),
      offer('o8-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c8.o-evening-open'];
        set8(x, 'o-evening-outcome', 'intimate-' + sc);
        return stayBody[partner][sc];
      }),
    ];
  }
  return [
    ...(c(s, 'c6.maya') === 'restored'
      ? [done('maya', 'Ring Maya', 'She worries about the terminal.', [
          p('Maya comes to the room over the water with soup in a flask and a face full of worry she does not bother to hide.'),
          q('Maya', 'You met him. At two in the morning. At a terminal nobody uses. Alone.'),
          q('You', 'I checked the ground first.'),
          q('Maya', 'You checked the ground. Adrian used to say that. Right before the thing he hadn’t checked. Give me the number of that phone, so somebody has it who’d come.'),
        ])]
      : []),
    ...partners(s).map((pt) =>
      offer('o8-evening-' + pt, pt === 'julian' ? 'Go to Julian’s' : 'The late set at the Harbour', pt === 'julian' ? 'His place. Warm, and off the grid.' : 'Sebastian. One cello, and afterwards.', 'after', (x) => {
        set8(x, 'o-evening', pt);
        set8(x, 'o-evening-open', pt);
        return inviteLines[pt];
      }),
    ),
    done('alone', 'Alone, with the wall', 'The thread. The three stones.', [p('You stay in, alone, and sit in front of the wall with the lamp off and the river light moving on it, and look at the red thread and the three pencilled stones, and do not take them down. Tomorrow you follow the vendor. Tonight you just sit with the shape of her, whoever she was, coming slowly up out of the water.')]),
  ];
}

// ── The second card ──

function completeBlocks(s: GameState): Block[] {
  const v = verified(s);
  const sold = Number(key(s, 'out.sold') ?? 0);
  const headline = v >= sold && v >= Number(key(s, 'out.raw') ?? 0) ? 'VERIFIED.' : sold > 0 && sold >= v ? 'SOLD.' : 'MOVED.';
  return [
    ...(get8(s, 'o-evening-outcome')?.startsWith('intimate') ? [p('You get back to the room over the water before light, and the wall is where you left it, patient, and nothing has watched it while you were gone.')] : []),
    p('The wall over the table, late. You take the card down that has sat in the middle of it since the first night, and under THE SENDER you pin the second card of the road, in capitals.'),
    q('The card', headline),
    p('And under it, the thread to the next thing, the name that came up out of a seeded page and a torch at a terminal:'),
    q('The card', 'MERIDIAN · THE VENDOR.'),
    ...(key(s, 'out.plant') === 'caught' ? [p('And in the corner: I CHECKED. IT SAVED ME.')] : key(s, 'out.plant') === 'bit' ? [p('And in the corner: I DIDN’T CHECK. THEY KNOW.')] : []),
    ...(key(s, 'out.met') === 'hand' ? [p('And, very small, where you can rub it out: I CROSSED THE BARRIER.')] : []),
    t('A man with no name, a vendor with every name, and a dead woman coming up out of the water one page at a time. I have proved almost nothing. But everything I have proved is mine, and nobody handed it to me, and nobody can take it back.'),
  ];
}

export function outsideBlocks8(s: GameState): Block[] {
  if (s.phase === 'settle') return settleBlocks();
  if (s.phase === 'leads') return leadsBlocks();
  if (s.phase === 'plant') return plantBlocks(s);
  if (s.phase === 'terminal') return terminalBlocks();
  if (s.phase === 'after') return afterBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices8(s: GameState): C8Choice[] {
  if (s.phase === 'settle') return settleChoices();
  if (s.phase === 'leads') return leadsChoices(s);
  if (s.phase === 'plant') return plantChoices(s);
  if (s.phase === 'terminal') return terminalChoices();
  if (s.phase === 'after') return afterChoices(s);
  return [];
}
