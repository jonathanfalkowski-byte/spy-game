/** Chapter 6 movement 6 — counterpower, resolve and the route branch. Wording and flags:
 * docs/story/scripts/CHAPTER_6_COUNTERPOWER_SCRIPT.md (with its build resolutions).
 * One primary end action per playthrough; route.lane is derived, re-derivable and sourced. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get4, get5 } from './chapter5-model';
import { type C6Choice, type ExitArrangement6, endPosition6, get6, note6, offer6, set6 } from './chapter6-model';

export const routeLanes6 = ['institutional', 'outside', 'executive', 'own-power'] as const;
export type RouteLane6 = (typeof routeLanes6)[number];

const arrangement = (s: GameState) => (get6(s, 'exit-arrangement') ?? 'self-funded') as ExitArrangement6;
const armLane = (a: ExitArrangement6): RouteLane6 =>
  a === 'julian-workroom' || a === 'public-artifact' ? 'executive' : a === 'sloane-institutional' ? 'institutional' : 'own-power';

// ── counterpower ──

const demand: Record<ExitArrangement6, Block> = {
  'julian-workroom': p('The workroom is booked through the month, the calls are on the calendar, and Julian’s message is warm and reasonable: a name he’d like you to meet, an evening that would help you both. Nothing is stated as a price. It does not have to be. The room is only free until you say no to something.'),
  'public-artifact': p('The issue is out, and it worked. Now the request: an appearance, a second piece, your face somewhere larger, on terms drafted to sound like an opportunity. The image you released is doing what images do — becoming a reason for the next ask.'),
  'sloane-institutional': q('Sloane', 'I have kept a great deal off your record, Evelynn. The apartment, the monitoring, the version of events that has you cooperative. I am asking for very little in return. I would like you to keep being easy to protect.'),
  'self-funded': p('No one is waiting on your answer, because you never let anyone hold the other end. There is no room to lose, no issue to withhold, no favour to call in. The cost of walking away is only the walking. That is what you bought when you paid your own way.'),
};
/** A provider who let the first refusal stand asks more gently. */
const gentle: Record<Exclude<ExitArrangement6, 'self-funded'>, Block[]> = {
  'julian-workroom': [q('Julian', 'I mentioned it once. You said no. That’s an answer, and I’m not going to make it expensive. The room’s still yours.')],
  'public-artifact': [q('Aster editor', 'You passed. The door stays open; I won’t push it. First piece holds on its terms.')],
  'sloane-institutional': [
    q('Sloane', 'As you like. I won’t lean on it tonight.'),
    p('From her, either patience or a longer game — you cannot tell which, and that is the point.'),
  ],
};
const hand: Record<ReturnType<typeof endPosition6>, Block> = {
  'oracle-truth': t('You know something now that changes the arithmetic. Their own system said you would take the identity willingly and that Sloane would not be able to hold you. She read that and proceeded. Whatever this is, it was never about keeping you. That is a crack, and you are standing in it.'),
  'own-hand': t('You did not need the sender in the end. You have your own: a thing you kept, a statement you can correct, an audience you can aim, a term written down in your favour. It is not a revelation. It is better — it is yours, and no one can un-give it to you.'),
  both: t('You have the truth the sender sold you and the leverage you built yourself. One tells you what they wanted; the other lets you act on it. You are, for the first time since the file appeared under your name, not the one being moved.'),
  none: t('You have no proof and no held card — you spent nothing, trusted no one, kept clean. It leaves you lighter than you expected. You cannot force the outcome. You can still choose your own part in it, and refuse to pretend the choice was made for you.'),
};

/** Entering counterpower fixes the end position from what she now holds. */
export function enterCounterpower6(s: GameState) {
  set6(s, 'end-position', endPosition6(s));
}

function demandBlocks(s: GameState): Block[] {
  const a = arrangement(s);
  return get6(s, 'expectation-response') === 'refused' && a !== 'self-funded' ? gentle[a] : [demand[a]];
}

export function counterpowerBlocks6(s: GameState): Block[] {
  if (s.phase === 'counterpower')
    return [
      p('It comes to a point the way these things do — not a threat, a request, made by someone who assumes the answer is yes because it has always been yes. What is different tonight is you. You are not the same person who accepted the first favour.'),
      ...demandBlocks(s),
      hand[(get6(s, 'end-position') ?? endPosition6(s)) as ReturnType<typeof endPosition6>],
      p('You know what you have. Now you decide what to do with it.'),
    ];
  if (s.phase === 'complete') {
    const lane = get6(s, 'route-lane') as RouteLane6 | undefined;
    if (!lane) return [];
    return [
      p(closing[lane]),
      p('The file appeared under your name and made you its subject. Tonight, for the first time, you moved. What that becomes — who you take with you, who you refuse, what it costs to keep going — is not written yet. But it is yours to write now, and they know it.'),
      t('Sloane wanted the adoption, and got it, and lost the leash exactly as her own system said she would. Why is the only thing left she is still holding. You intend to take that too.'),
    ];
  }
  return [];
}

// ── resolve ──

export const enforceableTerm6 = (s: GameState) =>
  ['accept', 'narrow', 'backup'].includes(get5(s, 'terms') ?? '') && !!get5(s, 'obligation-provider');

export type RouteTotals6 = Record<RouteLane6, number>;
const priority6: readonly RouteLane6[] = ['own-power', 'institutional', 'executive', 'outside'];

/** The Chapter 6 end action's lane (weight 3); resolve-protect is lane-neutral. */
function primaryLane6(s: GameState): RouteLane6 | undefined {
  const action = get6(s, 'resolve-action');
  if (action === 'resolve-challenge') return 'institutional';
  if (action === 'resolve-trade-expose' || action === 'resolve-trade-give') return 'outside';
  if (action === 'resolve-break' || action === 'resolve-hold') return 'own-power';
  if (action === 'resolve-enforce') return armLane(arrangement(s));
  return undefined;
}

/** Suggested route (docs/story/CHAPTER_7_ROUTE_CONFIRM.md §1): a transparent, re-derivable tally over sourced
 * state. Nothing is stored as a score; Chapter 7's confirm beat is where the lane is actually chosen. */
export function deriveRoute6(s: GameState): { lane: RouteLane6; totals: RouteTotals6; overlay: string[] } | undefined {
  if (!get6(s, 'resolve-action')) return undefined;
  const totals: RouteTotals6 = { institutional: 0, outside: 0, executive: 0, 'own-power': 0 };
  const primary = primaryLane6(s);
  if (primary) totals[primary] += 3;
  const service = get5(s, 'service');
  const c3 = (k: string) => s.choices['c3.' + k];
  // Executive seeds.
  if (service === 'julian') totals.executive += 2;
  if (get4(s, 'julian-kept') && get4(s, 'audit-paid')) totals.executive += 1;
  if ((get5(s, 'intimacy') && get5(s, 'want-target') === 'julian') || get5(s, 'mutual-interest') || get4(s, 'mutual-interest'))
    totals.executive += 1;
  // Own-power seeds.
  if (get5(s, 'published')) totals['own-power'] += 2;
  if (service === 'self' || service === 'municipal') totals['own-power'] += 2;
  if (['self-funded', 'refused'].includes(get5(s, 'terms') ?? '')) totals['own-power'] += 1;
  if (s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn' || c3('verified-date')) totals['own-power'] += 1;
  // Institutional seeds.
  if (get5(s, 'message-sloane')) totals.institutional += 2;
  if (service === 'axiom') totals.institutional += 1;
  if (get6(s, 'photo-custody') === 'phone' || get6(s, 'counter-arranged') === 'monitored') totals.institutional += 1;
  // Outside seeds.
  if (get6(s, 'rook-proof') === 'supported') totals.outside += 2;
  if (get6(s, 'oracle-seen') === 'yes') totals.outside += 1;
  if (['prediction', 'comparison'].includes(get6(s, 'verify-method') ?? '')) totals.outside += 1;
  if (c3('rook-window') || c3('compared-date')) totals.outside += 1;
  const top = Math.max(...Object.values(totals));
  const tied = priority6.filter((lane) => totals[lane] === top);
  const lane = primary && tied.includes(primary) ? primary : tied[0];
  // Overlays come only from causes already in state, never from the tally; at most one.
  const kept =
    service === 'julian' &&
    get6(s, 'exit-prep') === 'deepened' &&
    ['narrowed', 'negotiated', 'redirected'].includes(get6(s, 'expectation-response') ?? '');
  return { lane, totals, overlay: kept ? ['kept'] : [] };
}

const provider: Record<ExitArrangement6, string> = {
  'julian-workroom': 'Julian Mercer / Helix office',
  'public-artifact': 'Aster Review',
  'sloane-institutional': 'Sloane / Axiom',
  'self-funded': 'none (self-funded)',
};
const request: Record<ExitArrangement6, string> = {
  'julian-workroom': 'An introduction and an evening, asked as a favour while the workroom is booked.',
  'public-artifact': 'An appearance and a second piece on broader terms.',
  'sloane-institutional': 'Stay cooperative and easy to protect.',
  'self-funded': 'No request; no provider holds the other end.',
};
const recovery: Record<ExitArrangement6, string> = {
  'julian-workroom': 'Booked days returned; a self-paid Harbour week or the public desk instead.',
  'public-artifact': 'Second piece declined; the first held to its released scope.',
  'sloane-institutional': 'Stops relying on the protective version and accepts the exposure.',
  'self-funded': 'Nothing to break; she keeps walking.',
};

function resolve6(
  x: GameState,
  action: string,
  exitAction: string,
  consequence: { benefit: string; response: string; actorKnowledge: string; knows: string; obligation?: string; altCost?: string; recovery?: boolean },
) {
  const a = arrangement(x);
  set6(x, 'resolve-action', action);
  set6(x, 'exit-action', exitAction);
  // Saved choice values are capped at 80 characters: store short, stable codes here and keep the
  // full sourced sentences in the consequence note (history text).
  const codes: Record<string, string> = {
    benefit: consequence.benefit,
    provider: (get5(x, 'obligation-provider') ?? provider[a]).slice(0, 80),
    term: get5(x, 'obligation-term') ? `${get5(x, 'obligation-term')} days` : 'n/a',
    obligation: consequence.obligation ?? 'n/a',
    'alt-cost': consequence.altCost ? 'money-and-time' : 'n/a',
    'actor-knowledge': consequence.knows,
    request: a,
    response: action,
    recovery: consequence.recovery ? a : 'n/a',
  };
  for (const [k, v] of Object.entries(codes)) set6(x, 'cons.' + k, v);
  const route = deriveRoute6(x)!;
  set6(x, 'route-lane', route.lane);
  set6(x, 'route-overlay', route.overlay.join(','));
  note6(
    x,
    'consequence',
    [
      consequence.response,
      `Benefit: ${codes.benefit}.`,
      `Provider: ${codes.provider}.`,
      `Request: ${request[a]}`,
      `Who knows: ${consequence.actorKnowledge}`,
      ...(consequence.recovery ? [`Recovery: ${recovery[a]}`] : []),
      ...(consequence.altCost ? [`Alternative cost: ${consequence.altCost}.`] : []),
    ].join(' '),
    `Evelynn’s chosen end action on the ${a} arrangement`,
  );
  note6(x, 'route', `Route signal: ${route.lane}.`, `Suggested by the weighted route tally (${action} on the ${a} arrangement plus Chapter 3–6 seeds); Chapter 7 confirms or redirects it`);
}

export function resolveChoices6(s: GameState): C6Choice[] {
  if (s.phase === 'counterpower')
    return [offer6('counterpower-decide', 'Decide what to do with it', 'Choose one action. It sets your course.', 'resolve')];
  if (s.phase !== 'resolve' || get6(s, 'resolve-action')) return [];
  const a = arrangement(s);
  const held = ['oracle-truth', 'own-hand', 'both'].includes(get6(s, 'end-position') ?? '');
  const oracle = get6(s, 'oracle-seen') === 'yes';
  const c: C6Choice[] = [];
  if (enforceableTerm6(s) || a === 'julian-workroom' || a === 'public-artifact')
    c.push(
      offer6('resolve-enforce', 'Hold them to the exact words', 'Make the arrangement obey its own terms, no more.', 'complete', (x) => {
        resolve6(x, 'resolve-enforce', 'negotiated', { benefit: 'retained', response: 'Held the arrangement to its written terms.', actorKnowledge: 'The provider knows she will hold them to the exact wording.', knows: 'provider-knows-terms', obligation: 'no new obligation' });
        return [
          p('You do not refuse and you do not comply. You quote the agreement back at them — the scope you actually accepted, the line they wrote themselves — and you hold it there. The favour stays a favour. The ask has to become a real, named offer or disappear.'),
          ...(held ? [p('They can hear that you would spend what you know if they pushed. They do not push.')] : []),
        ];
      }),
    );
  if (oracle)
    c.push(
      offer6('resolve-challenge', 'Turn it back on Sloane', 'Use what you know to change the terms from strength.', 'complete', (x) => {
        resolve6(x, 'resolve-challenge', 'exposed', { benefit: 'retained', response: 'Challenged Sloane with the ORACLE assessment.', actorKnowledge: 'Sloane knows Evelynn has the ORACLE assessment. Her motive is still unresolved.', knows: 'sloane-knows-oracle' });
        return [
          q('You', 'You keep saying protect. Your own assessment said you couldn’t hold me and you went ahead. So this was never protection. Tell me what it was, or stop pretending you’re doing me a kindness.'),
          p('A pause that is itself an answer.'),
          q('Sloane', 'You have been busy. All right. Not tonight, and not as a favour. We will talk as two people who know the same thing. That is more than you had this morning.'),
          p('You did not win. You moved the table. That is the whole of it, and it is a great deal.'),
        ];
      }),
    );
  c.push(
    offer6('resolve-break', 'Walk, and pay the cost', 'Leave the arrangement; take the recovery route.', 'complete', (x) => {
      resolve6(x, 'resolve-break', a === 'self-funded' ? 'declined' : 'paid', {
        benefit: 'released',
        response: 'Left the arrangement and took the recovery route.',
        actorKnowledge: 'The provider knows she walked.',
        knows: 'provider-knows-walked',
        altCost: 'money and time (narrative only this pass)',
        recovery: true,
      });
      const fragment = {
        'julian-workroom': 'You give back the booked days and take a Harbour week you pay for yourself, or the public desk; the room is gone and the work still gets done.',
        'public-artifact': 'You decline the second piece and hold the first to its exact released scope.',
        'sloane-institutional': 'You stop relying on the version that keeps you easy to protect, and you accept the exposure that comes with that.',
        'self-funded': 'There is nothing to break; you simply keep walking.',
      }[a];
      return [p('You leave it. ' + fragment), p('It costs what it costs — money, a little slower, a little more alone. None of it costs you yourself.')];
    }),
  );
  if (get6(s, 'maya-exposed'))
    c.push(
      offer6('resolve-protect', 'Spend it on someone else', 'Use your leverage to shield a person, not your position.', 'complete', (x) => {
        resolve6(x, 'resolve-protect', 'protected', { benefit: 'spent on Maya', response: 'Spent her leverage to shield Maya.', actorKnowledge: 'Maya knows Evelynn intervened for her.', knows: 'maya-knows-intervention' });
        return [
          p('You have one move and you do not spend it on yourself. Maya is under a review she did not earn, frightened of a lookup she was never supposed to see. Whatever you hold — the page, the file, the term, the audience — you point it at that, and you make her problem cost someone more than it costs her.'),
          get5(x, 'maya-clean-line')
            ? q('Maya', 'You didn’t have to do that. I know what it probably cost you. Don’t make a habit of it. And — thank you.')
            : q('Maya', 'Whatever you did, it landed. I won’t ask on this line. Thank you.'),
        ];
      }),
    );
  const trade = (id: 'expose' | 'give', hint: string, variant: string, knowledge: string) =>
    offer6('resolve-trade-' + id, 'Put the proof in play', hint, 'complete', (x) => {
      resolve6(x, 'resolve-trade-' + id, 'exposed', { benefit: 'retained', response: id === 'expose' ? 'Exposed the ORACLE fact.' : 'Traded the sender’s proof away.', actorKnowledge: knowledge, knows: id === 'expose' ? 'oracle-circulating' : 'unnamed-actor-holds-proof' });
      return [
        p('Proof is only power while you hold it; you decide to spend it. ' + variant + ' Either way, it is out of your hands now, and moving.'),
        t('You still do not know who the sender is, or what they wanted you to do with this. You did it anyway, with your eyes open. That is not the same as being used.'),
      ];
    });
  if (oracle)
    c.push(
      trade(
        'expose',
        'Expose the ORACLE fact where it will be read.',
        'You put the ORACLE fact where it will be read — that they predicted they could not keep you and did it anyway — and you let it do its work in rooms you are not in.',
        'The ORACLE fact is in circulation; provenance and the sender’s aim are still open.',
      ),
    );
  if (get6(s, 'rook-proof') === 'supported')
    c.push(
      trade(
        'give',
        'Give the sender’s proof to an actor who wants it more than you do.',
        'You hand the sender’s proof to someone who wants it more than you do, for something you want more than the proof.',
        'An unnamed actor now holds the sender’s proof; provenance and the sender’s aim are still open.',
      ),
    );
  c.push(
    offer6('resolve-hold', 'Keep it, unspent', 'Take the knowing position; use nothing tonight.', 'complete', (x) => {
      resolve6(x, 'resolve-hold', 'declined', { benefit: 'retained', response: 'Kept everything unspent.', actorKnowledge: 'No one; a knowing reserve carried forward.', knows: 'none' });
      return [
        p('You do nothing with it, and that is the point. You let them believe the answer is still yes, and you keep the truth folded up where only you can feel its weight. Not fear — patience. A card unplayed is still a card, and now you are the only one at the table who knows it is in your hand.'),
      ];
    }),
  );
  return c;
}

const closing: Record<RouteLane6, string> = {
  institutional: 'You go home on the monitored phone, the way you always have, except that the line runs both ways now. Sloane knows you know. Whatever comes next, you are inside it as a person with a position, not a package with a location.',
  outside: 'The proof is loose in the world and the sender is still a voice without a face. You have chosen to act on a truth you cannot fully source. It is a risk. It is also the first move you made that no institution authored.',
  executive: 'The arrangement holds, on your terms, in writing. You have decided access is worth keeping when you are the one holding the wording. It is still there in the morning — the room, the page, the door that opens — and whoever offered it now knows exactly where your line is.',
  'own-power': 'Nothing is holding the other end of you. No room, no issue, no favour, no file you had to borrow. It is quieter than the other lives on offer, and slower, and entirely yours. You will find out what that is worth.',
};
