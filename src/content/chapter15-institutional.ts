/** Chapter 15 (Institutional route, lane id `institutional`) · The Audit:
 * warrant → audit → cabinets → aftermath → eve → complete.
 * Design: docs/story/INSTITUTIONAL_CHAPTER_15_THE_AUDIT_DESIGN.md (owner-approved 2026-09-30, all eight decisions as
 * recommended); script: docs/story/scripts/INSTITUTIONAL_CHAPTER_15_SCRIPT.md. The shared archive-heist spine in
 * Institutional framing: the Vesper archive entered by audit, under clause 22 of Axiom's contract. The crew (one or two:
 * Sloane if allied, Daniel if he knows, Iris if free, Maya if restored, Marsh outside with the switch). The ways in by Ch14
 * (audit with Sloane's van outside; a Markets Authority notice with Marsh; Benton's escort), or the stair, or a meeting with
 * Celeste as cover (always). The snag. The archive: her page, Axiom's client file with the receipt for CANDIDATE 9C,
 * Priya (tear / keep / give), and one thing more (Adrian's file / the 1109 safe / Nell's order). The holds broken; one
 * cost (ally / badge / money / Sloane). "No more orders." The phone. The night. Entered from an Institutional
 * `chapter14.complete`; ends at the Act IV in-development stop, having written the shared Act III keys. Keys `inst.*`,
 * `act3.*`, `c15.*`; ids carry `i15-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C15Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get15 = (s: GameState, k: string) => s.choices['c15.' + k];
const set15 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c15.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C15Choice['apply']): C15Choice => ({ id: 'chapter15.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get15(s, 'rec.' + k) !== undefined) return;
  set15(s, 'rec.' + k, String(s.history.length));
  set15(s, 'event.' + k, String(s.revision));
  set15(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c15.' + k);
  s.knowledge.push('c15.' + k);
}

export const INSTITUTIONAL_PHASES15 = ['warrant', 'audit', 'cabinets', 'aftermath', 'eve'] as const;
export const isInstitutional15 = (s: GameState) => key(s, 'route.lane') === 'institutional';
export const institutionalPhase15 = (s: GameState) => isInstitutional15(s) && ((INSTITUTIONAL_PHASES15 as readonly string[]).includes(s.phase) || s.phase === 'complete');

type Who = 'sloane' | 'daniel' | 'iris' | 'maya' | 'marsh';
const told = (s: GameState) => !!key(s, 'inst.daniel-told');
const irisFree = (s: GameState) => s.choices['c11.i-cloak'] === 'number' || key(s, 'inst.iris11') === 'warned';
const available = (s: GameState): Who[] =>
  [
    key(s, 'act3.sloane') === 'allied' && 'sloane',
    told(s) && 'daniel',
    irisFree(s) && 'iris',
    key(s, 'c6.maya') === 'restored' && 'maya',
    key(s, 'act3.ally.marsh') === 'in' && 'marsh',
  ].filter(Boolean) as Who[];
const crew = (s: GameState): Who[] => ((key(s, 'inst.crew15') ?? '').split(',').filter(Boolean) as Who[]);
const has = (s: GameState, w: Who) => crew(s).includes(w);
const authority = (s: GameState) => key(s, 'inst.authority') as 'formal' | 'regulator' | 'benton' | undefined;
type Partner = 'julian' | 'sebastian' | 'daniel';
const partners = (s: GameState): Partner[] => [
  ...(told(s) ? (['daniel'] as const) : []),
  ...eveningPartners7(s).filter((x): x is 'julian' | 'sebastian' => x === 'julian' || x === 'sebastian'),
];
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian', daniel: 'Daniel' };

export function placeInstitutional15(s: GameState): string | undefined {
  const w = key(s, 'inst.way15');
  if (s.phase === 'audit' && w) return w === 'stair' ? '02:00 · The Vesper, the service stair' : w === 'invited' ? '18:00 · The Vesper, the long room' : '10:00 · The Vesper, the reading room';
}

// ── The entry ──

export function beginInstitutional15(): C15Choice {
  return offer('begin-institutional', 'The week before the board', 'I keep everything, she said.', 'warrant');
}

// ── The warrant ──

const crewLine: Record<Who, [string, string, Block[]]> = {
  sloane: ['Sloane', 'Backup. Hers, and now yours.', [q('Sloane', 'Backup. Mine. You’ll have me in the van with the headphones on and the engine running. I have wanted to see inside that room for three years.')]],
  daniel: ['Daniel', 'He knows who you are. He reads fast.', [q('Daniel', 'I’ll carry the boxes. I’m very good at boxes. And I can read a filing system upside down, which you taught me, as it turns out.')]],
  iris: ['Iris', 'She stocked that archive for four years.', [q('Iris Moreau', 'I stocked that archive for four years. I know which cabinet squeaks. I’ll be there.')]],
  maya: ['Maya', 'Compliance. She knows what a record is worth.', [q('Maya', 'An audit? I’ve been waiting my whole career to audit somebody who deserves it. I’ll bring the evidence bags.')]],
  marsh: ['Marsh, outside', 'Holding the switch.', [q('Owen Marsh', 'I’ll be outside with the switch. If you don’t ring by noon, the minister gets everything. Try to ring by noon. He’s an awful man and I’d hate to give him the satisfaction.')]],
};

function warrantBlocks(s: GameState): Block[] {
  const a = authority(s);
  return [
    p('The week before the board. The card on your wardrobe door says THE VESPER, and under it, in Celeste’s own words from a year ago: I keep everything, darling.'),
    p(a === 'formal'
      ? 'Sloane is back on seventy-one, bounded, owing you. On Monday she puts a document on your desk that nobody at the Vesper has ever read: Axiom’s contract with Meridian Holdings, clause 22. The client may audit, on reasonable notice, any record held by the vendor in respect of the product. “Reasonable notice,” she says, “is twenty-four hours. I gave them twenty-three.”'
      : a === 'regulator'
        ? 'Axiom keeps you as its witness now, not its operative. No authority, no badge that opens anything. But a regulator is watching, and a regulator can do what a client can’t.'
        : 'Benton is your handler of record now. On Monday he tells you, pleasantly, that Axiom will be auditing its vendor this week, under clause 22, and that he will walk the audit himself. He says it as if it were a kindness. It is a leash.'),
  ];
}

function warrantChoices(s: GameState): C15Choice[] {
  const c = crew(s);
  const picks = available(s).filter((w) => !c.includes(w)).map((w) =>
    offer('i15-crew-' + w, crewLine[w][0], crewLine[w][1], c.length >= 1 ? 'audit' : 'warrant', (x) => {
      setKey(x, 'inst.crew15', [...crew(x), w].join(','));
      return crewLine[w][2];
    }),
  );
  return [
    ...picks,
    c.length
      ? offer('i15-crew-done', 'That’s enough', 'Two is a crew. More is a party.', 'audit')
      : offer('i15-crew-none', 'Nobody', 'You’ll do it yourself.', 'audit', () => [t('Nobody. It’s my name in that room. I’ll carry it out myself.')]),
  ];
}

// ── The audit ──

function auditBlocks(): Block[] {
  return [p('The Vesper on the Embankment, the black glass front with no name on it.')];
}

const wayText: Record<string, Block[]> = {
  audit: [
    p('Tuesday at ten, by the front door, in daylight, with a letter on Axiom paper: CLIENT AUDIT UNDER CLAUSE 22. On the Embankment a grey van with no markings, and in it, if she came, Sloane with the headphones on.'),
    p('Celeste’s assistant reads the letter twice, and then the clause, and then rings somebody, and then, very pale, brings coffee, and leaves you the key to the reading room “for as long as Axiom requires”.'),
  ],
  notice: [
    p('Tuesday at ten, by the front door, with Owen Marsh beside you in his good suit, his lanyard and his bicycle clips, and a Markets Authority notice to produce, signed that morning.'),
    q('Owen Marsh', 'Good morning. I’m told you keep everything. So do we. Shall we compare?'),
  ],
  escort: [
    p('Tuesday at ten, by the front door, with Elias Benton at your side, his slate against his chest, smiling at the doorman as if they had known each other for years, which you now suspect they have.'),
    q('Benton', 'Take what the contract allows, Ms Vale. And nothing more. I’ll be right here.'),
  ],
  stair: [p('Two in the morning, the service stair behind the kitchens, a door that is never locked because the bins go out at five. Iris’s way, or Sloane’s keys, and your heart going like a train.')],
  invited: [
    p('You ask Celeste for a meeting, “to discuss the board”, at six on Tuesday, and she says yes at once, because she has been waiting for you to ask for something. You sit with her in the long room under the empty frames and talk about nothing, beautifully, for an hour.'),
    p('Two floors down, your crew does the job. Or, if there is no crew, you excuse yourself at twenty past, to the powder room, and take the back stairs, and have nine minutes.'),
  ],
};

function auditChoices(s: GameState): C15Choice[] {
  if (!key(s, 'inst.way15')) {
    const a = authority(s);
    const w = (id: 'audit' | 'notice' | 'escort' | 'stair' | 'invited', label: string, hint: string) =>
      offer('i15-way-' + id, label, hint, 'audit', (x) => {
        setKey(x, 'inst.way15', id);
        return wayText[id];
      });
    return [
      ...(a === 'formal' ? [w('audit', 'By audit', 'Clause 22. Daylight. Coffee.')] : []),
      ...(a === 'regulator' && key(s, 'act3.ally.marsh') === 'in' ? [w('notice', 'By notice', 'A Markets Authority notice to produce, and Marsh.')] : []),
      ...(a === 'benton' ? [w('escort', 'With Benton’s escort', 'Axiom’s authority, Meridian’s man beside you.')] : []),
      ...(irisFree(s) || key(s, 'act3.sloane') === 'allied' ? [w('stair', 'By the stair', '2 a.m. Iris’s way, or Sloane’s keys.')] : []),
      w('invited', 'By invitation', 'A meeting with Celeste as cover. Always open.'),
    ];
  }
  const way = key(s, 'inst.way15');
  const snag: Block[] =
    way === 'audit' || way === 'invited'
      ? [p('The snag: Celeste, early, in the reading-room doorway with a glass of something pale, looking at the open drawers with pleasure.'), q('Celeste Laurent', 'Axiom, auditing me. Victoria must be feeling better.')]
      : way === 'notice'
        ? [p('The snag: the Vesper’s lawyer, a thin man in a thinner tie, who asks to see the notice twice, and then a third time, and then rings somebody.')]
        : way === 'escort'
          ? [p('The snag: Benton, watching every drawer you open, and making a small note on his slate each time, pleasantly.')]
          : [p('The snag: the night doorman, asleep in the cloakroom, who wakes, and sits up, and looks straight at the stairs.')];
  const g = (id: 'talk' | 'hide' | 'bold', label: string, hint: string, body: Block[]) =>
    offer('i15-snag-' + id, label, hint, 'cabinets', (x) => {
      set15(x, 'i-snag', id);
      return body;
    });
  return [
    g('talk', 'Talk your way through it', 'Smile. Be exactly as expected.', [...snag, p('You talk. You are exactly what they expect: charming, a little bored, entitled to be there. It works. It always works on people who think they know what you are.')]),
    g('hide', 'Stand still and let it pass', 'Say nothing. Be furniture.', [...snag, p('You stand very still between two cabinets and let it pass, the way Adrian learned to be furniture in rooms where he was not supposed to be, and it passes.')]),
    g('bold', 'Be bold', 'Do the thing you came to do, in front of them.', [...snag, p('You open the next drawer anyway, in front of them, slowly, and look up, and smile. Nobody stops you. Nobody in this building has ever been told what to do when a product audits its maker.')]),
  ];
}

// ── The cabinets ──

function cabinetsBlocks(s: GameState): Block[] {
  const signed = key(s, 'inst.pen11') === 'signed';
  return [
    p('The archive. Grey steel cabinets numbered by catalogue page, one lamp, cold as a church. Everything Celeste Laurent has ever kept.'),
    p('Your own page first, torn out of The Autumn Collection with one clean pull, folded, into your coat.'),
    p('Then the drawer that matters on this road: AXIOM · CLIENT. Three years of receipts on cream paper. E.V. (II), delivered. And the newest, on top, for a product not yet delivered:'),
    q('The receipt', 'CANDIDATE 9C · AXIOM · STRATEGIC INTELLIGENCE · DELIVERY: THE FIRST THURSDAY AFTER NEXT' + (signed ? ' · COUNTERSIGNED: V. SLOANE' : ' · COUNTERSIGNATURE PENDING')),
    p('Priya’s photograph, clipped to the corner. The careful fringe. The lanyard.'),
  ];
}

function cabinetsChoices(s: GameState): C15Choice[] {
  if (!key(s, 'inst.priya15')) {
    const r = (id: 'tear' | 'keep' | 'give', label: string, hint: string, body: Block[]) =>
      offer('i15-priya-' + id, label, hint, 'cabinets', (x) => {
        setKey(x, 'inst.priya15', id);
        setKey(x, 'inst.client-file');
        note(x, 'i-client', 'Evelynn took Axiom’s client file from the Vesper archive: every receipt, E.V. (II) delivered, and CANDIDATE 9C (Priya) pending.', 'The Vesper archive, the AXIOM · CLIENT drawer');
        return [...body, p('And there is time for one thing more.')];
      });
    return [
      r('tear', 'Tear it up', 'No receipt, no delivery.', [p('You tear the receipt in half, and in half again, and put the pieces in four different pockets. No receipt, no delivery. Nobody at the Vesper will ever find the paperwork to deliver a woman who sits by the far window and brought Maya a birthday card.')]),
      r('keep', 'Keep it', 'Evidence. Whole.', [p('You keep it whole, in the client file, with everything else. It is the proof that Meridian was about to sell Axiom another person, from Axiom’s own floor. You will need it whole.')]),
      r('give', 'Give it to her', 'The hardest honest thing.', [p('You keep it whole, and on Wednesday morning you walk to the desk by the far window, and put it in front of Priya, face up, and sit down, and tell her what it is, and what you are, and why you are telling her. She reads it twice. Then she looks at you for a very long time.'), q('Priya', 'Thank you. I think. Ask me again next week whether I mean it.')]),
    ];
  }
  const m = (id: 'adrian' | 'cards' | 'nell', label: string, hint: string, body: Block[]) =>
    offer('i15-took-' + id, label, hint, 'aftermath', (x) => {
      setKey(x, 'inst.took15', id);
      return body;
    });
  return [
    m('adrian', 'Adrian Vale’s file', key(s, 'act3.adrian-burned') ? 'You spent the name. Take the file, and there’s nothing left to spend it with.' : 'The clinic, the fitting, the name. Nobody spends it again.', [p('A thick file, the clinic’s crest, a name that was yours. You do not open it. You put it in the box.')]),
    ...(key(s, 'c13.card') !== 'taken' ? [m('cards', 'The 1109 safe', 'Every placement filmed in that room.', [p('The safe behind the last cabinet, which opens to the date on your catalogue page. Inside, rows of memory cards in little labelled envelopes, every one of them a person in a room with a mirror.')])] : []),
    m('nell', 'Nell’s file', 'The Jakarta order, signed C.', [p('LINDEN, E. A thin file. On top, a single sheet, the Jakarta order, a name given to the wrong people, and at the bottom, in the looping green hand, one initial. C.'), t('Proof of the burn. Not of the harbour. Not yet.')]),
  ];
}

// ── The aftermath ──

function holders(s: GameState): string[] {
  return [
    key(s, 'act3.ally.marsh') === 'in' && 'marsh',
    ['truth', 'kind'].includes(key(s, 'inst.nora12') ?? '') && 'nora',
    irisFree(s) && 'iris',
    key(s, 'act3.sloane') === 'allied' && 'sloane',
    told(s) && 'daniel',
  ].filter(Boolean) as string[];
}

function aftermathBlocks(s: GameState): Block[] {
  const took = key(s, 'inst.took15');
  return [
    p('The week after, fast, like a list.'),
    ...(key(s, 'inst.maya13') === 'warned' ? [p('Maya’s warning: withdrawn by Wednesday, when the client file lands on the board with the same forger’s hand all over it. Her promotion comes back on Friday, with an apology nobody signs.')] : []),
    ...(took === 'adrian' ? [p(key(s, 'act3.adrian-burned') ? 'Adrian Vale’s name: spent, in a room with a recorder, by you. Now the file is in your box, and there is nothing left for anybody to spend it with.' : 'Adrian Vale’s name: in your box. Nobody spends it again.')] : []),
    p('Copies of everything, in envelopes, to the people who hold the switch: ' + (holders(s).length ? holders(s).map((h) => ({ marsh: 'Owen Marsh', nora: 'Nora Linden', iris: 'Iris Moreau', sloane: 'Victoria Sloane', daniel: 'Daniel Kessler' })[h]).join(', ') : 'a solicitor in Holborn who has never met you and never will') + '. If you stop ringing, everything goes to everyone.'),
    p('And the price. There is always a price for the last door.'),
  ];
}

function aftermathChoices(s: GameState): C15Choice[] {
  const allyWho = irisFree(s) ? 'iris' : key(s, 'act3.ally.marsh') === 'in' ? 'marsh' : '';
  const c = (id: 'ally' | 'badge' | 'money' | 'sloane', label: string, hint: string, shared: string, who: string, body: Block[]) =>
    offer('i15-cost-' + id, label, hint, 'eve', (x) => {
      setKey(x, 'inst.cost15', id);
      set15(x, 'cost', shared);
      if (who) set15(x, 'cost-who', who);
      setKey(x, 'act3.leash', 'broken');
      setKey(x, 'act3.switch', holders(x).join(',') || 'solicitor');
      if (key(x, 'act3.ally.marsh') === 'in') setKey(x, 'act3.ally.marsh', 'in');
      if (irisFree(x)) setKey(x, 'act3.ally.iris', 'in');
      if (['truth', 'kind'].includes(key(x, 'inst.nora12') ?? '')) setKey(x, 'act3.ally.nora', 'in');
      return body;
    });
  return [
    ...(allyWho
      ? [c('ally', 'Spend an ally', allyWho === 'iris' ? 'Iris’s cover, burned to open the last door.' : 'Marsh goes public early, and loses his inquiry.', 'ally', allyWho, [p(allyWho === 'iris' ? 'Iris’s cover goes, the last of it: a photograph of her at the Vesper’s service door, in a paper that matters. She rings you from a station you do not recognise. “Worth it. Don’t you dare say sorry.”' : 'Marsh goes to the minister a week early, with everything, and the minister takes his inquiry off him by lunchtime, and gives it to somebody safer. He rings you from his bicycle. “Worth it. They can’t un-read it.”')])]
      : []),
    c('badge', 'Hand in your badge', 'Resign your commission. No rank. No protection.', 'visibility', '', [p('You resign your commission on Thursday, in writing, on Axiom paper, and hand your badge to Terry at the staff gate, because he is the only person in the building you want to say goodbye to. No rank. No handler. No protection. Just a name on a list of people who used to work here.'), q('Terry', 'Mind the step, madam.')]),
    c('money', 'Spend everything you have', 'Lawyers, couriers, silence.', 'money', '', [p('Everything you had goes on lawyers and couriers and a locksmith and a solicitor in Holborn. By Friday you are broke, and free, and it is the best bargain you have ever made.')]),
    ...(key(s, 'act3.sloane') === 'allied'
      ? [c('sloane', 'Let Sloane go on the record', 'Her choice. She loses her directorate.', 'relationship', 'sloane', [p('Sloane goes on the record on Thursday, in front of Axiom’s board, as the officer who was sold a defective product and bought another one, and she loses her directorate by lunchtime, by her own choice.'), q('Sloane', 'It was never mine. I was keeping it warm for somebody. It turns out to have been you.')])]
      : []),
  ];
}

// ── The eve ──

function eveBlocks(): Block[] {
  return [
    p('Wednesday night, the eve of the board. You type it on the black phone with its one contact, and send it before you can think better of it.'),
    q('You', 'No more orders.'),
    p('The reply comes after four minutes, which for her is a very long time.'),
    q('C.', 'I shall be there as myself.'),
  ];
}

function eveChoices(s: GameState): C15Choice[] {
  if (!key(s, 'act3.black-phone')) {
    const ph = (id: 'return' | 'river' | 'keep', label: string, hint: string, body: Block[]) =>
      offer('i15-phone-' + id, label, hint, 'eve', (x) => {
        setKey(x, 'act3.black-phone', id);
        return body;
      });
    return [
      ph('return', 'Send it back', 'In a Vesper orchid box. No card.', [p('In the morning you send it back by courier, in a black Vesper orchid box, with nothing written on the card.')]),
      ph('river', 'The river', 'Off the wall.', [p('You walk to the river at one in the morning and drop it off the wall, and it makes almost no sound at all.')]),
      ph('keep', 'Keep it', 'Switched off, in a drawer. Evidence.', [p('You switch it off and put it in a drawer with Adrian’s old jacket. Evidence. Thursday might want it.')]),
    ];
  }
  const open = get15(s, 'i-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('i15-night-' + id, label, hint, 'complete', (x) => {
      set15(x, 'i-night', id);
      return body;
    });
  if (open && !open.endsWith('-room')) {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('i15-' + pt + '-' + id, label, hint, 'eve', (x) => {
        set15(x, 'i-night-open', pt + '-room');
        set15(x, 'i-night-scope', id);
        note(x, 'i-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? 'Yes. And you say stop, it stops. Nobody else in the room tonight.' : 'Then that’s tonight. Just the edge you set.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('i15-leave', 'Say goodnight', 'Tomorrow is the board.', 'complete', (x) => {
        delete x.choices['c15.i-night-open'];
        set15(x, 'i-night-outcome', 'declined');
        return [p('You say goodnight at his door. He holds your face in both hands, and lets you go, and says, “Thursday.”')];
      }),
    ];
  }
  if (open) {
    const scp = get15(s, 'i-night-scope') as 'no-sex' | 'sex';
    return [
      offer('i15-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c15.i-night-open'];
        set15(x, 'i-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and sits with you at the window until you are ready.')];
      }),
      offer('i15-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c15.i-night-open'];
        set15(x, 'i-night-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p('The first night in a year with nobody holding anything over either of you. He says your name, whichever one you gave him, and asks once more, and you answer by pulling him down, and nothing in the room is owed to anybody.'), p('What happens next is yours and his. The scene fades.')]
          : [p('He kisses you by the window for a long time, and stops where you said, and you fall asleep against him with the city on, owing nobody anything, for the first time in a year.')];
      }),
    ];
  }
  return [
    ...partners(s).map((pt) =>
      offer('i15-night-' + pt, pt === 'daniel' ? 'Daniel' : pt === 'julian' ? 'Julian' : 'Sebastian', 'The first night in a year with nothing owed.', 'eve', (x) => {
        set15(x, 'i-night', pt);
        set15(x, 'i-night-open', pt);
        return [q(partnerName[pt], 'Tell me what you want tonight, and that’s what happens. Nobody else gets a say. Not tonight.')];
      }),
    ),
    done('alone', 'Alone', 'Act III ends here.', [p('You sit up alone, the wall in front of you, a glass of wine you do not drink, and the first quiet in a year that belongs to nobody but you.')]),
  ];
}

// ── The wall ──

function completeBlocks(s: GameState): Block[] {
  const pr = key(s, 'inst.priya15');
  return [
    ...(get15(s, 'i-night-outcome')?.startsWith('intimate') ? [p('You get home at dawn. The green light in the hall is off. Somebody on seventy-one switched it off on Tuesday, and nobody has switched it back on.')] : []),
    p('The wardrobe door. Everything on Celeste’s side of the door is on yours now: your page, Axiom’s receipts, a file with your old name on it or a dead woman’s order, and the switch in four envelopes, or one.'),
    p(pr === 'tear' ? 'And in a saucer on the chest of drawers, four pieces of a receipt for a woman who will never know how close it came.' : pr === 'give' ? 'And in the corner a card in someone else’s hand, left on your desk on Friday: THANK YOU. I THINK. — P.' : 'And in the client file, whole, a receipt for a woman who sits by the far window.'),
    p('One card left, in capitals:'),
    q('The card', 'THE BOARD MEETS.'),
    t('She held everything. Now I do. Thursday, I find out what that’s worth.'),
    p('[Chapters 16–18 · institutional road — in development]'),
  ];
}

export function institutionalBlocks15(s: GameState): Block[] {
  if (s.phase === 'warrant') return warrantBlocks(s);
  if (s.phase === 'audit') return auditBlocks();
  if (s.phase === 'cabinets') return cabinetsBlocks(s);
  if (s.phase === 'aftermath') return aftermathBlocks(s);
  if (s.phase === 'eve') return eveBlocks();
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function institutionalChoices15(s: GameState): C15Choice[] {
  if (s.phase === 'warrant') return warrantChoices(s);
  if (s.phase === 'audit') return auditChoices(s);
  if (s.phase === 'cabinets') return cabinetsChoices(s);
  if (s.phase === 'aftermath') return aftermathChoices(s);
  if (s.phase === 'eve') return eveChoices(s);
  return [];
}
