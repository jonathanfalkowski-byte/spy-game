import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { type NextChoice, flag, mark, record, deliver, choice } from './chapter3-next-model';

export const publicityCaption =
  'Evelynn Vale, following an exploratory advisory discussion at Helix.';
export const opportunityScenes: Record<string, { title: string; place: string; blocks: Block[] }> =
  {
    invitation: {
      title: 'An invitation addressed to Evelynn',
      place: '11:05 · External-message relay',
      blocks: [
        p(
          'Axiom’s switchboard forwards a named business inquiry from Helix’s published executive-office line. The routing note says Helix asked for Evelynn Vale; no private number was supplied to Helix. The switchboard can relay a reply. Routing a message is not arranging the offer, and there is no delivery acknowledgment from Sloane.',
        ),
        q(
          'Helix executive office',
          'Julian Mercer, our Group COO, requests a 14:00–14:45 exploratory advisory discussion. We offer a $600 fee for the completed session, regardless of any later agreement. No employment, exclusivity, publicity or access to Axiom information is included. May we send the brief?',
        ),
      ],
    },
    verifyOffer: {
      title: 'Two checks before the deadline',
      place: '11:20 · The written offer',
      blocks: [
        p(
          'The office will hold the 14:00 appointment until noon. You have time for two substantive inquiries and their replies. The written terms are available without spending either inquiry. The office’s reply address is now available; using it does not promise a meeting.',
        ),
        p(
          'Terms: $600 for a completed 45-minute advisory discussion of a supplied fictional acquisition case. Payment is due at its conclusion by a fee voucher redeemable through Helix accounts; no bank details are requested here. No Axiom documents, recruitment commitment, publicity, exclusivity or personal obligation. Reception attendance is separate. The appointment conflicts with Voss’s 14:00 records window. Neither office can move its staffed session today; later clinical care remains available.',
        ),
      ],
    },
    executive: {
      title: 'Julian Mercer',
      place: '14:00 · Helix executive suite',
      blocks: [
        p(
          'You travel to Helix and give reception the appointment reference. The receptionist checks it and shows you into a meeting room. Julian Mercer rises from the far side of the table: forty-nine, gray at his temples, a navy suit. The nameplate identifies him as Group COO.',
        ),
        q(
          'Julian Mercer',
          'Axiom can decide whether you enter its building. That need not make it the only place that pays for your judgment. The fee covers today. Anything after today requires another agreement.',
        ),
        p(
          'He puts the terms beside the case brief rather than beneath it. The empty signature line concerns receipt of the fee voucher, not employment. His attention rests on the page you are reading.',
        ),
      ],
    },
    executiveWork: {
      title: 'The work on the table',
      place: '14:10 · A fictional acquisition case',
      blocks: [
        p(
          'The supplied case has rising sales and a concentration note: the largest customer provides forty percent of revenue. Its renewal date is missing. No case detail comes from your Axiom work. Mercer asks whether the headline growth supports the asking price.',
        ),
        q(
          'Julian Mercer',
          'I do not need a confident answer to the question we cannot yet answer. I need to know what you would ask next.',
        ),
      ],
    },
    reception: {
      title: 'The price of being seen',
      place: '14:50 · Outside the smaller reception',
      blocks: [
        p(
          'A host waits beyond the meeting room. Mercer offers an introduction to two commercial directors and a conversation about a possible paid follow-up. The proposed spoken introduction is: “Evelynn Vale, here following an exploratory advisory discussion.” The host wants that limited association witnessed. A photograph is a separate request, still unanswered.',
        ),
        q(
          'Julian Mercer',
          'You can leave with the completed fee. Or we can agree on how I introduce you. Neither choice gives me a claim on the rest of your afternoon.',
        ),
      ],
    },
    photograph: {
      title: 'One photograph, one use',
      place: '15:05 · Reception photo desk',
      blocks: [
        p(
          'The photographer asks for one posed image and one publication on Helix’s public event page. No syndication, advertising reuse, licensing or later image rights are requested. You may refuse. The host shows the exact caption:',
        ),
        q('Proposed caption', publicityCaption),
        p(
          'Authorization here permits that image and caption to be published now on the event page; it grants no other use.',
        ),
      ],
    },
    opportunityEnd: {
      title: 'Outside the meeting',
      place: 'After your decision',
      blocks: [
        p('You check the records this decision leaves with you before opening another message.'),
      ],
    },
  };
export function invitationBasis(s: GameState) {
  const greeting = s.npcs.marcus.known.find((k) => k.source.includes('greeting'));
  return greeting
    ? { text: greeting.key, source: greeting.source }
    : {
        text: 'Evelynn attended the Glass House reception.',
        source: 'Helix guest desk attendance; no inference about private investigations',
      };
}
export function opportunityChoices(s: GameState): NextChoice[] {
  const c: NextChoice[] = [];
  if (s.phase === 'informationEnd')
    c.push(
      choice(
        'open-invitation',
        'Read the incoming business inquiry',
        'A new message through the switchboard; Sloane has not arranged it.',
        'invitation',
        (x) => {
          const basis = invitationBasis(x);
          record(
            x,
            'referral',
            `Executive office attaches this referral observation: ${basis.text}`,
            `Marcus’s office forwards his observation: ${basis.source}`,
            'claim',
          );
          record(
            x,
            'invitation',
            'Helix executive office offers a paid exploratory appointment; switchboard forwards the incoming request.',
            'Named Helix inquiry through Axiom switchboard',
            'claim',
          );
          return [
            q('Attached referral', basis.text),
            p(
              'The forwarding note identifies the observed exchange as the reason to request a discussion. It contains no mission assessment, captured proof, medical record or account of last night.',
            ),
          ];
        },
      ),
    );
  if (s.phase === 'invitation') {
    c.push(
      choice(
        'request-brief',
        'Request the terms and contact details',
        'Reply authorizes a written brief only.',
        'verifyOffer',
        (x) => {
          mark(x, 'helix-reply', 'details');
          deliver(
            x,
            'julian-mercer',
            'brief',
            'Please send details. I have not agreed to a meeting.',
            'Switchboard relays the exact reply to executive office',
          );
          return [p('The office sends its brief and a direct reply address. You open both.')];
        },
      ),
    );
    c.push(
      choice(
        'decline-inquiry',
        'Decline and take the records-review path',
        'No Helix engagement or Marcus leverage is created.',
        'opportunityEnd',
        (x) => {
          mark(x, 'helix', 'declined');
          deliver(
            x,
            'julian-mercer',
            'decline',
            'I decline the appointment.',
            'Delivered switchboard reply',
          );
          return [
            q('Helix office', 'Understood. No appointment is booked.'),
            p('At 11:10 you close the inquiry. The 14:00 Voss records window remains available.'),
          ];
        },
      ),
    );
  }
  if (s.phase === 'verifyOffer') {
    const checks = [
      [
        'authority',
        'Call the published Helix switchboard',
        'Please verify the invitation and its author.',
        'The independently reached switchboard connects the executive office, which confirms Julian Mercer authorized the paid session. The call verifies origin, not benevolence.',
      ],
      [
        'referral',
        'Ask what Marcus actually sent',
        'Please identify the referral used for this invitation.',
        'The office releases the same bounded observation attached to the inquiry. It withholds other correspondence; you cannot establish what else Marcus believes.',
      ],
      [
        'axiom',
        'Ask whether Axiom is a party',
        'Is Axiom a party to this arrangement?',
        'The office says it seeks Evelynn’s independent discussion, not Axiom representation. It has no mandate from Sloane. This is its representation, not access to Axiom’s internal knowledge.',
      ],
      [
        'audience',
        'Ask who knows about the invitation',
        'Who received this invitation inside Helix?',
        'The office identifies Mercer, his scheduling assistant and Marcus as current recipients. It will not certify that none of them spoke to anyone else.',
      ],
    ];
    if (Number(flag(s, 'checks') ?? 0) < 2)
      for (const [id, label, ask, answer] of checks)
        if (!flag(s, 'check-' + id))
          c.push(
            choice(
              'check-' + id,
              label,
              'Uses one of two inquiries; other uncertainties remain.',
              'verifyOffer',
              (x) => {
                mark(x, 'check-' + id);
                mark(x, 'checks', String(Number(flag(x, 'checks') ?? 0) + 1));
                deliver(
                  x,
                  'julian-mercer',
                  'check-' + id,
                  ask,
                  'Delivered inquiry to executive office',
                );
                record(x, 'check-' + id, answer, 'Helix reply to ' + ask, 'claim');
                return [q('Helix office', answer)];
              },
            ),
          );
    c.push(
      choice(
        'accept-session',
        'Accept only the paid discussion',
        'Cancel any reserved Voss records window explicitly; no future work is accepted.',
        'executive',
        (x) => {
          mark(x, 'helix', 'meeting');
          mark(x, 'helix-reply', 'meeting');
          deliver(
            x,
            'julian-mercer',
            'meeting',
            'I agree to the 14:00 paid exploratory discussion on the written terms, with no further commitment.',
            'Delivered acceptance',
          );
          if (flag(x, 'voss-window') === 'reserved') {
            deliver(
              x,
              'voss',
              'cancel-window',
              'I cancel my 14:00 records appointment because of a conflicting appointment.',
              'Delivered cancellation; no Helix name supplied',
            );
            mark(x, 'voss-window', 'cancelled');
          }
          record(
            x,
            'terms',
            'Completed 45-minute fictional-case session earns $600; no employment, exclusivity, publicity, Axiom information or personal obligations.',
            'Written offer explicitly accepted',
          );
          return [
            p('Helix confirms the appointment. You retain the terms and arrange your own journey.'),
          ];
        },
      ),
    );
    c.push(
      choice(
        'decline-session',
        'Decline after reading the terms',
        'Use Voss’s records-review opportunity instead.',
        'opportunityEnd',
        (x) => {
          mark(x, 'helix', 'declined');
          deliver(
            x,
            'julian-mercer',
            'decline',
            'I decline the proposed discussion.',
            'Delivered direct reply',
          );
          return [
            q('Helix office', 'The slot is released. No agreement has been made.'),
            p('Before noon, you put the offer aside. Voss’s records window is still ahead.'),
          ];
        },
      ),
    );
  }
  if (s.phase === 'executive')
    c.push(
      choice(
        'open-case',
        'Open the fictional case',
        'Begin only the work covered by the agreed fee.',
        'executiveWork',
      ),
    );
  if (s.phase === 'executiveWork')
    for (const [id, label, line, response] of [
      [
        'question',
        'Ask for the missing renewal date',
        'I need the renewal terms before recommending a price.',
        'That is the exposure I wanted identified. We can price a conditional recommendation.',
      ],
      [
        'qualified',
        'Give a conditional assessment',
        'Growth alone does not establish value; the missing renewal can materially change it.',
        'A useful qualification. Put that condition before the headline.',
      ],
      [
        'boundary',
        'Decline a firm valuation without the missing data',
        'I will identify the gap, but I will not manufacture a firm valuation from this brief.',
        'That is a completed answer to an incomplete brief. The agreed fee stands.',
      ],
    ])
      c.push(
        choice(
          'case-' + id,
          label,
          'Finish the scheduled discussion; the fee is earned independently of reception.',
          'reception',
          (x) => {
            mark(x, 'work', id);
            mark(x, 'paid', '600');
            deliver(x, 'julian-mercer', 'assessment', line, 'Spoken assessment of fictional case');
            record(
              x,
              'fee',
              'A $600 fee voucher payable to Evelynn Vale is issued for the completed advisory discussion. Reception or publicity refusal cannot revoke it.',
              'Numbered Helix accounts voucher delivered at 14:45',
            );
            x.proof.push({ key: 'c3.fee', source: 'Helix accounts fee voucher', owner: 'Evelynn' });
            return [
              q('You', line),
              q('Julian Mercer', response),
              p(
                'You spend the remainder of the session working through that limit. At 14:45 the assistant delivers the fee voucher; you acknowledge receipt only.',
              ),
            ];
          },
        ),
      );
  if (s.phase === 'reception') {
    const options = [
      [
        'embrace',
        'Accept the defined introduction',
        'Evelynn Vale, here following an exploratory advisory discussion.',
      ],
      ['negotiate', 'Narrow it to guest; no photograph', 'Evelynn Vale, our guest today.'],
      [
        'exploit',
        'Require a procurement introduction in exchange',
        'Evelynn Vale, here following an exploratory advisory discussion.',
      ],
    ] as const;
    for (const [id, label, wording] of options)
      c.push(
        choice(
          'reception-' + id,
          label,
          id === 'exploit'
            ? 'Require a concrete introduction, not a guaranteed contract.'
            : 'No exclusivity, employment or personal obligation.',
          id === 'negotiate' ? 'opportunityEnd' : 'photograph',
          (x) => {
            mark(x, 'reception', id);
            mark(x, 'helix-window', 'offered');
            record(
              x,
              'introduction',
              wording,
              'Exact introduction spoken by Mercer to the two reception directors',
            );
            deliver(
              x,
              'julian-mercer',
              'association',
              wording,
              'Evelynn authorizes this spoken introduction only',
            );
            if (id === 'exploit') {
              record(
                x,
                'procurement',
                'Mercer introduces Evelynn to the procurement director, who supplies a business reply address. No purchase or contract is promised.',
                'Completed introduction and contact card',
              );
            }
            if (id === 'negotiate') {
              mark(x, 'photo', 'refused');
              record(
                x,
                'no-photo',
                'No photograph authorized or taken.',
                'Evelynn’s condition accepted by host and photographer',
              );
            }
            return [
              q('Julian Mercer', wording),
              p(
                id === 'exploit'
                  ? 'The procurement director steps over, exchanges a card with you and agrees to receive a scope proposal.'
                  : 'The directors give their names. You ask about their work; one gives you a business reply address.',
              ),
              q(
                'Julian Mercer',
                'If useful, my office can hold 18:00–18:30 for a follow-up. Nothing is booked until you confirm.',
              ),
              ...(id === 'negotiate'
                ? [p('The photographer lowers the camera. You leave after the introductions.')]
                : []),
            ];
          },
        ),
      );
    c.push(
      choice(
        'reception-refuse',
        'Leave with the earned fee',
        'Decline the reception, association and photograph.',
        'opportunityEnd',
        (x) => {
          mark(x, 'reception', 'refused');
          mark(x, 'photo', 'refused');
          deliver(
            x,
            'julian-mercer',
            'reception',
            'I decline the reception and publicity.',
            'Spoken refusal',
          );
          return [
            q('Julian Mercer', 'Thank you for the work today.'),
            p(
              'You put the voucher in your bag and take the lift. There is no introduction and no photograph.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'photograph') {
    c.push(
      choice(
        'photo-publish',
        'Authorize this photograph and its one publication',
        'Exact caption; Helix public event page only. No other image rights.',
        'opportunityEnd',
        (x) => {
          mark(x, 'photo', 'published');
          record(
            x,
            'photo-scope',
            `One posed photo; one Helix public event-page publication now. Caption: ${publicityCaption} No licensing, advertising, syndication or reuse.`,
            'Evelynn’s specific authorization to photographer',
          );
          record(
            x,
            'public-association',
            `Published Helix event-page entry: ${publicityCaption} One posed image accompanies it.`,
            'Photographer shows the live event page after publication',
          );
          x.proof.push({
            key: 'c3.public-association',
            source: 'Retained copy of the Helix public event-page entry',
            owner: 'public',
          });
          return [
            p(
              'You approve the displayed caption. The shutter clicks once. The photographer publishes the image and shows you the live entry; you retain a copy. Its availability does not establish who has seen it.',
            ),
          ];
        },
      ),
    );
    c.push(
      choice(
        'photo-refuse',
        'Decline the photograph',
        'Keep the introductions and earned fee. No image is taken.',
        'opportunityEnd',
        (x) => {
          mark(x, 'photo', 'refused');
          record(
            x,
            'no-photo',
            'No photograph authorized or taken.',
            'Evelynn refuses; photographer acknowledges',
          );
          return [
            q('Photographer', 'Understood.'),
            p(
              'The camera stays down. You leave with the same fee voucher and the contacts already exchanged.',
            ),
          ];
        },
      ),
    );
  }
  return c;
}
