/** Chapter 18 (Institutional route, lane id `institutional`) · No Further Action:
 * debrief → disposition → light → floor → particulars → scope → nfa.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_18_NO_FURTHER_ACTION_DESIGN.md (owner-approved 2026-09-30, all eight decisions
 * as recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_18_SCRIPT.md. The Institutional road's close, on the
 * shared "Position" spine. The morning after, by the board (Celeste's canon last word: Lisbon, an orchid, or nothing), and
 * Axiom's (end.morning = sloane | daniel | sleep). The position, by aim and terms (end.position), and where Sloane ends,
 * by what Evelynn made her (end.sloane = promoted | pen | reassigned | retired); the switch (end.switch = armed | handed |
 * disarmed). The green light in the hall, dealt with first, in daylight, on its own (end.light = down | form | tape |
 * checked). Axiom's floor: Terry, Priya, the people, and Daniel's hello answered, or, if he was never told, the chance to
 * tell him now with no night attached (end.daniel = hello | told-now | never); who she goes home to (end.with = daniel |
 * julian | sebastian | maya | none). Who she is now, in the NAME box (end.name = adrian | evelyn | new, none punished). A
 * year later, a page headed SCOPE: three terms for a life (end.scope), Sloane's pencil answering Ch7's margins; a chosen
 * night (heat 3, consent in character, fades) or a quiet one (end.later); the two cards, WHO IS WATCHING HER? and WHO IS
 * WATCHING ME?, answered (end.cards); the last line. `nfa` is the terminal phase: nothing is offered after it. Sloane is
 * never a romance; monitoring is never sexualised; Daniel is never deceived into intimacy. Entered from an Institutional
 * `chapter17.complete`. Choice ids carry `i18-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C18Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C18Choice['apply']): C18Choice => ({ id: 'chapter18.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (key(s, 'c18.rec.' + k) !== undefined) return;
  setKey(s, 'c18.rec.' + k, String(s.history.length));
  setKey(s, 'c18.event.' + k, String(s.revision));
  setKey(s, 'c18.layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c18.' + k);
  s.knowledge.push('c18.' + k);
}

export const INSTITUTIONAL_PHASES18 = ['debrief', 'disposition', 'light', 'floor', 'particulars', 'scope', 'nfa'] as const;
export const isInstitutional18 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase18 = (s: GameState) => isInstitutional18(s) && (INSTITUTIONAL_PHASES18 as readonly string[]).includes(s.phase);

const board = (s: GameState) => (key(s, 'act4.board') ?? 'closed') as 'resigned' | 'diminished' | 'closed';
const terms = (s: GameState) => (key(s, 'act4.terms') ?? 'none') as 'full' | 'partial' | 'none';
const aim = (s: GameState) => (key(s, 'act4.aim') ?? 'walk') as 'inside' | 'channels' | 'walk' | 'nell';
const way14 = (s: GameState) => key(s, 'inst.way14') as 'ally' | 'proof' | 'cut' | undefined;
const cost15 = (s: GameState) => key(s, 'inst.cost15');
const toldBefore = (s: GameState) => !!key(s, 'inst.daniel-told') && key(s, 'end.daniel') !== 'told-now';
const homeLost = (s: GameState) => key(s, 'act3.home') === 'lost';
const taped7 = (s: GameState) => key(s, 'c7.i-evening') === 'alone';
const holders = (s: GameState) => (key(s, 'act3.switch') ?? '').split(',').filter((x) => x && x !== 'solicitor');
const holderName: Record<string, string> = { marsh: 'Owen Marsh', nora: 'Nora', iris: 'Iris', sloane: 'Sloane', daniel: 'Daniel' };
type Partner = 'daniel' | 'julian' | 'sebastian';
const partnerName: Record<Partner, string> = { daniel: 'Daniel', julian: 'Julian Mercer', sebastian: 'Sebastian' };
/** A chosen night with him before, in any Institutional chapter: then a night of the fuller scope is on offer again. */
const nightOk = (s: GameState, pt: Partner) =>
  [
    ['c7.i-evening', 'c7.i-evening-outcome'],
    ['c8.i-evening', 'c8.i-evening-outcome'],
    ['c10.i-night', 'c10.i-night-outcome'],
    ['c11.i-night', 'c11.i-night-outcome'],
    ['c14.i-evening', 'c14.i-evening-outcome'],
    ['c15.i-night', 'c15.i-night-outcome'],
  ].some(([who, out]) => key(s, who) === pt && !!key(s, out)?.startsWith('intimate'));

/** Where Sloane ends, by what Evelynn made her (route design §5; design §4). */
export function sloaneEnd18(s: GameState): 'promoted' | 'pen' | 'reassigned' | 'retired' {
  if (way14(s) === 'cut') return 'retired';
  if (key(s, 'act4.sloane') === 'use') return 'reassigned';
  if (key(s, 'act4.sloane') === 'vouch') return 'promoted';
  if (aim(s) === 'inside' && key(s, 'act3.sloane') === 'allied' && terms(s) !== 'none' && cost15(s) !== 'sloane') return 'promoted';
  if (way14(s) === 'proof') return 'reassigned';
  return 'pen';
}

// ── The entry ──

export function beginInstitutional18(): C18Choice {
  return offer('begin-institutional', 'Friday', 'The morning after.', 'debrief');
}

// ── The debrief ──

function debriefBlocks(s: GameState): Block[] {
  const b = board(s);
  return [
    ...(b === 'resigned'
      ? [p('Friday. A paragraph in the business pages, below the fold: a non-executive director of Meridian Holdings has stood down “to pursue other interests”. No photograph.'), p('And in the afternoon post, a postcard from Lisbon: yellow trams, a hill, a view of the river. On the back, in the looping green hand:'), q('The postcard', 'You were worth it. C.')]
      : b === 'diminished'
        ? [p('Friday. Nothing in the papers. In the post, a typed letter from Marguerite Soames, two lines, which does not apologise and does not need to. And on the doormat, a white orchid in a black pot, with no card at all.')]
        : [p('Friday. Nothing in the papers. Nothing in the post. Nothing on the black phone, or anywhere. Meridian has closed its ranks and its mouth, and the switch is still armed in four envelopes.')]),
    ...(way14(s) === 'cut'
      ? [p('At seven, Maya, on the phone, still in her dressing gown by the sound of it: “It’s filed. Go back to sleep.”')]
      : [p('At seven, an email from seventy-one, one line, no greeting:'), q('The email', 'Debrief. 10:00. Bring coffee. V.S.')]),
  ];
}

function debriefChoices(s: GameState): C18Choice[] {
  const m = (id: 'sloane' | 'daniel' | 'sleep', label: string, hint: string, body: Block[]) =>
    offer('i18-morning-' + id, label, hint, 'disposition', (x) => {
      setKey(x, 'end.morning', id);
      return body;
    });
  return [
    ...(way14(s) !== 'cut'
      ? [m('sloane', 'The debrief, on seventy-one', 'Two coffees. The window.', [
          p('Ten o’clock, her office, the window, two coffees from the good place on the corner. She takes hers without looking at it, and you stand side by side at the glass and look at the river, the way you did on your first morning back, when she offered you a contract and you wrote your own scope into it.'),
          q('Sloane', 'For the record. You were not fit for purpose. I’d like that minuted.'),
          q('You', 'Whose purpose?'),
          q('Sloane', 'Exactly.'),
          p('She does not smile. She drinks her coffee. It is the closest thing to a debrief either of you has ever given.'),
        ])]
      : []),
    ...(toldBefore(s) ? [m('daniel', 'Coffee with Daniel', 'He brings two. From the machine.', [p('Daniel at your door at eight with two coffees from the machine on seventy-one, which he has finally fixed with a paperclip and a threat. You sit on the steps and drink them, and they are terrible, and you tell him everything, in order, with footnotes.')])] : []),
    m('sleep', 'Go back to sleep', 'For once, do as you’re told.', [p('You go back to sleep, for once doing exactly as you are told, and sleep until two in the afternoon, and nobody rings, and nobody logs it.')]),
  ];
}

// ── The disposition ──

const SLOANE_END: Record<ReturnType<typeof sloaneEnd18>, Block[]> = {
  promoted: [p('Sloane: a directorate that did not exist a month ago, for reading contracts before Axiom signs them. She sends you the first memo she writes in it, unasked, with one line in pencil at the top.'), q('Sloane', 'I’ve read every one of them twice. You would be amazed what we’ve bought.')],
  pen: [p('Sloane: the pen. She writes the report, the one that saved her, and signs it as the officer of record, and sends you a copy, bound, with a single flag on the last page.'), q('Sloane', 'It’s the best thing I have ever written. Nobody will read it. That’s how you know it worked.')],
  reassigned: [p('Sloane: Records, aisle nine, at her own request, under one bulb, with a trolley and a clipboard and nobody at all watching her.'), q('Sloane', 'Somebody should know where everything is. It may as well be somebody who knows what it cost.')],
  retired: [p('Sloane: a flat in Pimlico with a view of nothing, a garden the size of a desk, and in the post one morning a postcard with no picture on it at all, just five words, typed.'), q('The postcard', 'NO FURTHER ACTION. V.')],
};

function positionLines(s: GameState): Block[] {
  const a = aim(s);
  const tm = terms(s);
  if (a === 'inside')
    return tm === 'full'
      ? [p('The Project Eve contract, terminated for defect, on the client’s terms. 9C never delivered. And you: Officer, Client Assurance, with one job written into the post by your own hand. Read every contract Axiom signs, and strike any clause that buys a person. A desk by the window on seventy-one. Everybody on the floor knows exactly what you were, and the board has decided you are worth more than the scandal. Known is not owned. You have the paperwork to prove it.')]
      : tm === 'partial'
        ? [p('The contract suspended, 9C “deferred”, your rank “acting”. The rest is a year of Maya’s inquiry, and the switch behind you, and a desk by the window you are not yet allowed to call yours.')]
        : [p('Axiom terminates alone, and slowly, a clause at a time, and you sit at the desk by the pillar and read every one of them. Solvable. Costlier.')];
  if (a === 'channels')
    return tm === 'full'
      ? [p('Meridian referred to the regulator by its own board, first, at nine on Friday, as promised. The inquiry’s findings published, tabs and all. Axiom survives as the client that reported its vendor. You keep its protection and lose your rank: a witness, not an officer. You find, to your surprise, that you prefer it.')]
      : tm === 'partial'
        ? [p('The findings filed, not published. The regulator slow, and careful, and in no hurry. Your protection kept. Your rank gone. The rest in writing, in a drawer, waiting.')]
        : [p('You file it yourself, through Marsh, the long way, a form at a time. Solvable. Costlier.')];
  if (a === 'walk')
    return [
      p(tm === 'full' ? 'The undertaking, signed by six people: your name never placed, catalogued or sold again, by anyone.' : tm === 'partial' ? 'The undertaking, unsigned. You don’t need the signatures.' : 'No undertaking at all. You walk anyway. It was always the one thing in your scope nobody could take.'),
      p(cost15(s) === 'badge' ? 'Terry already has your badge. You go and say goodbye to him anyway.' : 'On Monday you hand your badge to Terry at the staff gate, and walk out with the file in your head: unprotected, and free.'),
    ];
  return [p('The minute records her name' + (key(s, 'act4.nell-said') === 'eleanor' ? ': Eleanor Linden.' : '.') + ' And in the spring, Holland Village, Nora’s kitchen, and the harbour wall at dusk, walked slowly, in flat shoes.')];
}

function dispositionBlocks(s: GameState): Block[] {
  return [p('That month.'), ...positionLines(s), ...SLOANE_END[sloaneEnd18(s)], p('And the switch, still in its envelopes, still armed, waiting for you to decide what it is for now.')];
}

function dispositionChoices(s: GameState): C18Choice[] {
  const h = holders(s);
  const sw = (id: 'armed' | 'handed' | 'disarmed', label: string, hint: string, body: Block[]) =>
    offer('i18-switch-' + id, label, hint, 'light', (x) => {
      setKey(x, 'end.switch', id);
      if (id === 'handed') setKey(x, 'end.switch-to', h[0] ?? 'solicitor');
      setKey(x, 'end.position', aim(x) + '-' + terms(x));
      setKey(x, 'end.sloane', sloaneEnd18(x));
      return body;
    });
  return [
    sw('armed', 'Keep it armed', 'Ring every month. Forever, if you have to.', [p('You keep it armed. On the first of every month you ring each of them and say you are still here, and they say good, and that is all. It is a very small price for a very large silence.')]),
    sw('handed', h.length ? 'Hand it to ' + holderName[h[0]] : 'Hand it to the solicitor', 'Somebody else’s to hold.', [p(h.length ? 'You give ' + holderName[h[0]] + ' the other keys, and the list, and the date, and they take it the way you would take somebody’s child for an afternoon: carefully, and without asking why.' : 'You give the solicitor in Holborn the other keys, and he files them without reading them, which is exactly what you pay him for.')]),
    sw('disarmed', 'Disarm it', 'Burn the envelopes. You don’t need them now.', [p('You collect the envelopes, one by one, and burn them in the sink, and open the window, and the flat smells of smoke and paper for a day. You don’t need them now. That is the point of them.')]),
  ];
}

// ── The light ──

function lightBlocks(s: GameState): Block[] {
  return homeLost(s)
    ? [p('A Saturday. The new flat, the one with the new lock, and nobody’s camera in any corner of it. There is no green light. You know there isn’t.')]
    : [p('A Saturday, in daylight. The flat on the river, and in the corner of the hall, high up, the little camera with its steady green light that has watched everything since the spring: you coming home, you not sleeping, ' + (taped7(s) ? 'you taping it over once, in the dark, the first thing in the flat that you did.' : 'you standing under it at three in the morning, wondering who was on the other end.'))];
}

function lightChoices(s: GameState): C18Choice[] {
  const l = (id: 'down' | 'form' | 'tape' | 'checked', label: string, hint: string, body: Block[]) =>
    offer('i18-light-' + id, label, hint, 'floor', (x) => {
      setKey(x, 'end.light', id);
      return body;
    });
  if (homeLost(s)) return [l('checked', 'Check the corners anyway', 'Once. Then never again.', [p('You check the corners anyway, once, standing on a chair, every room. Nothing. Then you get down off the chair and never check again.')])];
  return [
    l('down', 'Take it down yourself', 'A chair, a screwdriver, and your own two hands.', [p('You stand on a kitchen chair with a screwdriver from the drawer and take it down yourself: four screws, a cable, and it comes away from the wall in your hand. The light goes out. You hold it in your palm.'), t('It weighs nothing. It weighed everything.')]),
    l('form', 'Fill in Axiom’s own form', 'REMOVAL OF MONITORING EQUIPMENT.', [p('You find the form on Axiom’s intranet, because of course there is a form: REMOVAL OF MONITORING EQUIPMENT (RESIDENTIAL). Name, file number, address. And a box at the bottom: REASON.'), p('You write, in capitals, NO FURTHER ACTION, and submit it, and on Tuesday two men from facilities come and take it down, and one of them says “Lovely flat,” and means it.')]),
    taped7(s)
      ? l('tape', 'Leave the tape on', 'You put it there. It stays.', [p('You leave it exactly as it is, with the strip of electrician’s tape across it that you put there in the dark on your first night back. You put it there. It stays. It is the oldest thing in the flat that is yours.')])
      : l('tape', 'Tape it over, and leave it', 'A strip of electrician’s tape. Yours.', [p('You take a strip of electrician’s tape from the kitchen drawer and put it across the lens, flat, with your thumb, and leave it there. Nobody asks you to take it off. Nobody ever will.')]),
  ];
}

// ── The floor ──

function floorBlocks(s: GameState): Block[] {
  const pr = key(s, 'inst.priya15');
  const inside = aim(s) === 'inside' && terms(s) !== 'none';
  return [
    p('A Monday. The staff gate, the bad step, and Terry, who has been on this desk since before Adrian’s first day.'),
    q('Terry', cost15(s) === 'badge' && inside ? 'Morning, madam. Something for you.' : 'Morning, madam. Mind the step.'),
    ...(cost15(s) === 'badge' && inside ? [p('He takes your old badge out of his drawer, and then, from under it, a new one, with a new number and your photograph, and slides them both across the desk, and lets you choose which to keep.')] : []),
    p('Seventy-one. Everybody looks up when you come out of the lift, and everybody knows, now, what you were, and nobody says anything, and then somebody by the printers says “Morning,” and it is simply a Monday.'),
    p(pr === 'give' ? 'Priya, at the desk by the far window, careful fringe, lanyard, looks up and says, “Lunch? You’re paying. You owe me a receipt.”' : pr === 'keep' ? 'Priya, at the desk by the far window, knows from the inquiry what was nearly done to her. She nods to you as you pass, once, very straight, as if you were both in uniform.' : 'Priya, at the desk by the far window, careful fringe, lanyard, never knew, and never will, and looks up only to ask whether anybody has seen the good stapler.'),
    ...(toldBefore(s)
      ? [p('And two desks from the pillar, a chair rolls back, and Daniel Kessler looks up at you with his terrible tie and his hair that no memo has ever defeated, and says it on purpose, exactly the way he said it to a stranger on your first morning back:'), q('Daniel', 'Hi. Daniel. I sit there, I mostly eat there.'), q('Daniel', 'Hello, you.')]
      : [p('And two desks from the pillar, a chair rolls back, and Daniel Kessler looks up with his terrible tie, and says hello to a stranger, kindly, the way he always has.'), q('Daniel', 'Hi. Daniel. I sit there, I mostly eat there. The coffee machine works now, by the way. Don’t ask how.')]),
  ];
}

function floorChoices(s: GameState): C18Choice[] {
  if (!key(s, 'inst.daniel-told') && !key(s, 'end.daniel')) {
    const d = (id: 'told-now' | 'never', label: string, hint: string, body: Block[]) =>
      offer('i18-daniel-' + id, label, hint, 'floor', (x) => {
        setKey(x, 'end.daniel', id);
        if (id === 'told-now') setKey(x, 'inst.daniel-told', 'late');
        return body;
      });
    return [
      d('told-now', 'Tell him', 'At his desk. All of it. Nothing asked of him.', [
        p('You sit down on the edge of his desk, the way Adrian used to, and tell him, quietly, all of it: the clinic, the name, the desk fourth from the end, the four years he sat two chairs from a man he never saw again. You ask him for nothing.'),
        p('He is quiet for a very long time. Then he looks at the coffee machine, and back at you.'),
        q('Daniel', 'I knew the coffee machine. I didn’t know I knew you.'),
      ]),
      d('never', 'Let it be', 'Say hello back. Nothing else.', [q('You', 'Hello, Daniel.'), p('You say hello back, and nothing else, and he goes back to his screen, and never knows, and is never asked for anything he didn’t choose.')]),
    ];
  }
  const partners = eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian');
  const h = (id: 'daniel' | 'julian' | 'sebastian' | 'maya' | 'none', label: string, hint: string, body: Block[]) =>
    offer('i18-home-' + id, label, hint, 'particulars', (x) => {
      setKey(x, 'end.with', id);
      if (!key(x, 'end.daniel')) setKey(x, 'end.daniel', key(x, 'inst.daniel-told') ? 'hello' : 'never');
      return body;
    });
  return [
    ...(toldBefore(s) ? [h('daniel', 'Daniel', 'Who said hello to a stranger, and then to you.', [p('You go home with Daniel, that night and most nights after, to his flat with the books on every surface, and it is not a secret from anybody, least of all him.')])] : []),
    ...partners.map((pt) => h(pt, pt === 'julian' ? 'Julian' : 'Sebastian', 'From before. As a partner, not a keeper.', [p(pt === 'julian' ? 'You go home to Julian’s, some nights, and to your own, others, and he never once asks which it will be.' : 'You go home with Sebastian, some nights, and he never asks what you do all day, and you never tell him, and it suits you both.')])),
    ...(key(s, 'c6.maya') === 'restored' ? [h('maya', 'Maya', 'Who was there before any of it.', [p('You go round to Maya’s on Fridays, and stay till Sunday, and the cat sleeps on your coat, and nobody in the flat has ever been a product.')])] : []),
    h('none', 'Nobody', 'Your own door, your own key.', [p('You go home to your own door, with your own key, and nobody waiting, and you find that you like the sound of the lock very much.')]),
  ];
}

// ── The particulars ──

function particularsBlocks(s: GameState): Block[] {
  const a = aim(s);
  return [
    p(a === 'inside' ? 'Axiom’s new contract, in a cream folder, on your desk by the window. Page one. PARTICULARS OF THE OFFICER. And a box: NAME.' : a === 'channels' ? 'The regulator’s witness statement, forty pages, and on the first of them a box: FULL NAME OF WITNESS.' : 'A form of your own: the tenancy for a flat nobody gave you, on the kitchen table. A box at the top: NAME.'),
    t('Every file I have ever been in had a name in that box that somebody else wrote. This one is mine.'),
  ];
}

function particularsChoices(): C18Choice[] {
  const n = (id: 'adrian' | 'evelyn' | 'new', label: string, hint: string, body: Block[]) =>
    offer('i18-name-' + id, label, hint, 'scope', (x) => {
      setKey(x, 'end.name', id);
      return body;
    });
  return [
    n('adrian', 'Adrian Vale', 'The one Axiom knew first.', [p('You write ADRIAN VALE in the box, in capitals, the way it was on the desk fourth from the end, and it looks, for the first time, like a name and not a file.')]),
    n('evelyn', 'Evelyn Vale', 'The one they sold. Yours now.', [p('You write EVELYN VALE in the box. They made it. You wore it. It is yours now, by use, the way a road becomes a right of way.')]),
    n('new', 'A new name', 'Yours. Nobody else needs to know it.', [p('You write a name in the box that nobody at Axiom, or Meridian, or anywhere else, has ever seen. It is short. You chose it yourself. Nobody else needs to know it.')]),
  ];
}

// ── The scope ──

const SCOPE18: [id: string, label: string, text: string, margin: string][] = [
  ['refusal', 'The refusal', 'I may decline anything, once, in writing, and it stays declined.', 'As often as you like.'],
  ['record', 'The record', 'I see my own file. All of it. Every month.', 'You’ll wish you hadn’t. You won’t.'],
  ['name', 'The name', 'Nobody is tasked against me by means of who I was.', 'Sealed. And this time I didn’t read it either.'],
  ['backup', 'The backup', 'Every hard thing has a number that answers.', 'Yours now.'],
  ['people', 'The people', 'Nobody I love is ever a means to anything.', 'I’ll take it as written. I always did.'],
  ['leave', 'Leaving (new)', 'I may leave, at any time, and it will not be called desertion.', 'Took you long enough.'],
];
const scopeTaken = (s: GameState) => (key(s, 'end.scope') ?? '').split(',').filter(Boolean);

function scopeBlocks(s: GameState): Block[] {
  const a = aim(s);
  const w = key(s, 'end.with');
  return [
    p(
      a === 'inside'
        ? 'A year later. The desk by the window on seventy-one, a contract from a vendor in Zurich, forty pages, and a red pen. You have struck three clauses this morning. Two of them bought people.'
        : a === 'channels'
          ? 'A year later. The regulator’s report, published in the spring, two hundred pages and a very dull title, with your statement in an appendix. Meridian wounded in writing, and standing. Axiom still here. So are you.'
          : a === 'walk'
            ? 'A year later. A desk of your own, three streets from the river, over a small practice that reads contracts for people who cannot afford to have them read. Nobody’s product. Nobody’s officer.'
            : 'A year later. Holland Village, Nora’s kitchen, Nell’s photograph on the wall, and two sugars and cinnamon in your coffee, because somebody should go on taking it that way.',
    ),
    p(w && w !== 'none' && w !== 'maya' ? 'In the evening he comes round, and you sit at the table with a single sheet of paper between you, and you write across the top of it, the way you did once on seventy-one, with Sloane watching: SCOPE.' : 'In the evening you sit at the table with a single sheet of paper and write across the top of it, the way you did once on seventy-one, with Sloane watching: SCOPE.'),
    t('Three terms. Not for a job this time. For a life.'),
  ];
}

function scopeChoices(s: GameState): C18Choice[] {
  const taken = scopeTaken(s);
  const retired = key(s, 'end.sloane') === 'retired';
  if (taken.length < 3)
    return SCOPE18.filter(([id]) => !taken.includes(id)).map(([id, label, text, margin]) =>
      offer('i18-scope-' + id, label, text, 'scope', (x) => {
        const next = [...scopeTaken(x), id];
        setKey(x, 'end.scope', next.join(','));
        const body: Block[] = [q('The page', text), q('The margin', margin)];
        if (next.length < 3) return body;
        return [
          ...body,
          p(retired ? 'You post it to Pimlico, because some habits are worth keeping, and it comes back a week later, pencilled in the margin by every line, and at the bottom:' : 'You send it up to Sloane, because some habits are worth keeping, and it comes back the same afternoon, pencilled in the margin by every line in that small quick hand, and at the bottom:'),
          q('The margin', retired ? 'I can’t sign this. I’ve pencilled it anyway. V.' : 'Countersigned. V.S.'),
        ];
      }),
    );
  const w = key(s, 'end.with') as Partner | 'maya' | 'none' | undefined;
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i18-later-' + id, label, hint, 'nfa', (x) => {
      setKey(x, 'end.later', id);
      return body;
    });
  if (w === 'daniel' || w === 'julian' || w === 'sebastian') {
    const nm = partnerName[w];
    const open = key(s, 'end.later-open');
    if (open === 'invited')
      return [
        offer('i18-later-no-sex', 'Stay close, but not sex tonight', 'Kissing, touch, and stopping where you choose.', 'scope', (x) => {
          setKey(x, 'end.later-open', 'no-sex');
          setKey(x, 'end.consent', 'no-sex');
          note(x, 'i-evening-consent', `Evelynn chose the night’s scope (no-sex); ${nm} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
          return [q(nm, 'Then that’s tonight. You say stop, I stop. It’s in writing now.')];
        }),
        ...(nightOk(s, w)
          ? [
              offer('i18-later-sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.', 'scope', (x) => {
                setKey(x, 'end.later-open', 'sex');
                setKey(x, 'end.consent', 'sex');
                note(x, 'i-evening-consent', `Evelynn chose the night’s scope (sex); ${nm} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
                return [q(nm, 'Yes. And you say stop, it stops. Same for me. It’s on the page.')];
              }),
            ]
          : []),
        done('goodnight', 'Say goodnight', 'Leaving is complete and respected.', [p('You kiss him once at the door, and say goodnight, and he goes, and you stand at the window with the page in your hand and read it again.')]),
      ];
    if (open)
      return [
        done('stop', 'Stop here', 'Honoured immediately, without argument.', [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead, and the page lies on the table between the glasses.')]),
        done('close', 'Stay', 'Continue within what you chose.', open === 'sex'
          ? [p(w === 'daniel' ? 'He says your name, the one you wrote in the box, as if he has been practising it, and undoes your buttons one at a time, careful, and then, when you laugh at him for it, not careful at all, and asks once more, low, at your shoulder.' : 'He undoes your dress slowly enough that you could stop him at every inch, and asks once more, low, at your shoulder.'), p('You answer by pulling him down with you, in a room with no light in the corner, and nothing in it owed to anybody. What happens next is yours and his. The scene fades.')]
          : [p('He kisses you by the window for a long time, and stops exactly where you said, and you stand there together in the dark, a year on, with the page on the table and nobody watching, and nothing owed in either direction.')]),
      ];
    return [
      offer('i18-later-invite', 'Tonight, with him', 'A chosen night. Heat 3, consent in character, fades.', 'scope', (x) => {
        setKey(x, 'end.later-open', 'invited');
        return [q(nm, 'Tell me what you want tonight. That’s the only scope that matters in this room.')];
      }),
      done('quiet', 'The page, and the river', 'Sit up, and read it again.', [p('You sit up together with the page on the table between you and the river going by outside, and read it again, both of you, out loud, and laugh at the same line.')]),
    ];
  }
  return [
    ...(w === 'maya' ? [done('maya', 'Take it round to Maya’s', 'She will want to witness it.', [p('You take it round to Maya’s, and she witnesses it at the kitchen table in eyeliner pencil, and adds a tab, and the cat sits on it.')])] : []),
    done('own', 'The window, and black coffee', 'Nobody watching back.', [p('You pin the page to the wardrobe door and stand at the window with a cup of coffee, black, and watch the city, and nobody is watching you back.')]),
  ];
}

// ── No further action ──

function nfaBlocks(s: GameState): Block[] {
  const end = key(s, 'end.sloane');
  const light = key(s, 'end.light');
  const name = key(s, 'end.name');
  const her = end === 'retired' ? 'NOBODY. GOOD.' : end === 'reassigned' ? 'SHE IS. SHE ALWAYS WAS.' : 'I AM.';
  const me = light === 'tape' ? 'NOBODY. I KEPT THE TAPE.' : light === 'checked' ? 'NOBODY. I CHECKED.' : 'NOBODY. THE LIGHT IS OFF.';
  const line =
    name === 'adrian'
      ? 'My name is Adrian Vale. I sat down at my own desk and nobody stopped me. This time, nobody had to.'
      : name === 'evelyn'
        ? 'My name is Evelyn Vale. I was delivered with a file number. I wrote my own scope, and it held.'
        : 'The light in the hall is off. Nobody is watching. I wrote my name down anyway.';
  return [
    p('The wardrobe door, the last time. The first card of this road is still in the middle of it: VICTORIA SLOANE. HANDLER. AX-7A. And under it, in pencil, the question you pinned there on your first night back.'),
    q('The card', 'WHO IS WATCHING HER?'),
    p('You answer it in ink, underneath.'),
    q('The card', her),
    p('And beside it, a new card, your own, in the same hand:'),
    q('The card', 'WHO IS WATCHING ME?'),
    q('The card', me),
    p('At the bottom, across both of them, the way Axiom closes a file, you write three words and a date.'),
    q('The card', 'NO FURTHER ACTION.'),
    t(line),
    { kind: 'notice', text: 'The end of the Institutional route.' },
  ];
}

export function institutionalBlocks18(s: GameState): Block[] {
  if (s.phase === 'debrief') return debriefBlocks(s);
  if (s.phase === 'disposition') return dispositionBlocks(s);
  if (s.phase === 'light') return lightBlocks(s);
  if (s.phase === 'floor') return floorBlocks(s);
  if (s.phase === 'particulars') return particularsBlocks(s);
  if (s.phase === 'scope') return scopeBlocks(s);
  if (s.phase === 'nfa') return nfaBlocks(s);
  return [];
}

export function institutionalChoices18(s: GameState): C18Choice[] {
  if (s.phase === 'debrief') return debriefChoices(s);
  if (s.phase === 'disposition') return dispositionChoices(s);
  if (s.phase === 'light') return lightChoices(s);
  if (s.phase === 'floor') return floorChoices(s);
  if (s.phase === 'particulars') return particularsChoices();
  if (s.phase === 'scope') return scopeChoices(s);
  return [];
}
