import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { type NextChoice, flag, mark, record, deliver, choice } from './chapter3-next-model';

export const autonomyScenes: Record<string, { title: string; place: string; blocks: Block[] }> = {
  marcusRecord: {
    title: 'What the office wrote down',
    place: '15:20 · Helix correspondence',
    blocks: [
      p(
        'The executive assistant routes your actual acceptance and completed-session receipt to Marcus for a referral summary. Marcus replies: “Evelynn demonstrated willingness to explore an advisory relationship.” The assistant offers you the signed internal note, including its time and the limited circulation list. It is a description of the discussion, not an executed contract.',
      ),
    ],
  },
  marcusLeverage: {
    title: 'Interpretation is power',
    place: '15:28 · The authenticated note',
    blocks: [
      p(
        'The office supplies the note with its message identifier, author and delivery receipt. Marcus confirms he wrote it after receiving the session record. The recipients are Mercer and his assistant. Your retained copy includes your narrower acceptance alongside his wording.',
      ),
      q(
        'Marcus',
        'You did agree to explore the question. I did not say you signed a contract. If you want the distinction appended, give me the words.',
      ),
    ],
  },
  institutional: {
    title: 'The scope of a finding',
    place: '14:00 · Clinical records room',
    blocks: [
      p(
        'You confirm the records appointment, travel to the clinic and check in. Voss meets you in the records room. She identifies the clinical record, the operational cover sheet and its routing receipt as three different documents. This is a records review, not another examination; no procedure is authorized. Only you and Voss are in the room. Notes remain in the clinical system.',
      ),
    ],
  },
  reviewQualification: {
    title: 'A qualification in writing',
    place: '14:35 · Clinical records room',
    blocks: [
      q(
        'Voss',
        'A record that you completed monitored recovery is not a finding that you are operationally available without restriction. I will sign that distinction. It does not settle every dispute with Executive Intelligence.',
      ),
      p(
        'She turns the proposed qualification toward you. You can retain it, circulate this limited document, or ask for a formal review of the cover sheet.',
      ),
    ],
  },
  truths: {
    title: 'Competing truths',
    place: '16:00 · Apartment desk',
    blocks: [
      p(
        'You return to the apartment with the records you actually obtained. The phone offers several reply routes. A document in your possession is not a document in anyone else’s hands.',
      ),
      p(
        'There is time to compose four deliberate messages before turning to the evening. You can send less, defer everything, or keep the records private. Select a record to see exact wording and recipients before sending. This is not an agreement to join anyone.',
      ),
    ],
  },
  disclosure: {
    title: 'The words that leave',
    place: '16:10 · Message draft',
    blocks: [
      p(
        'A draft is local until you send it. The limited version does not attach the underlying document. The full version sends the selected record, not the rest of your files. A misleading version transmits only its displayed claim.',
      ),
    ],
  },
  calendar: {
    title: 'The calendar',
    place: '17:00 · Overlapping requests',
    blocks: [
      p(
        'The invitations below each ask for 18:00–18:30. They cannot all be kept. Each is a call you may take from a place you choose; a meeting tomorrow is not implied. You can confirm, ask to move a call, cancel, give an explanation, or deliberately leave a request unanswered.',
      ),
      p(
        'The phone remains monitored. The apartment does not become private because you plan to leave it. Two confirmations for the same half-hour create a real conflict; neither contact is told about the other automatically.',
      ),
    ],
  },
  departure: {
    title: 'The door closes',
    place: '18:00 · Departure',
    blocks: [
      p(
        'You take your keys. The lift opens; you step inside and press the lobby button. Behind you, the apartment door settles into its frame.',
      ),
    ],
  },
};
const rec = (s: GameState, key: string) => s.day.records.find((r) => r.key === 'c3.' + key);
export const disclosureRecords = (s: GameState) =>
  ['instruction', 'public-association', 'marcus-note', 'qualification', 'fee'].filter((key) =>
    rec(s, key),
  );
type Recipient = 'sloane' | 'rook' | 'maya' | 'julian-mercer' | 'voss';
export function recipients(s: GameState): Recipient[] {
  return [
    'sloane',
    'maya',
    'voss',
    ...(flag(s, 'rook-window') ? ['rook' as const] : []),
    ...(flag(s, 'helix-reply') ? ['julian-mercer' as const] : []),
  ] as Recipient[];
}
export const recipientNames: Record<Recipient, string> = {
  sloane: 'Sloane',
  rook: 'the unknown sender',
  maya: 'Maya',
  'julian-mercer': 'Julian’s executive office',
  voss: 'Voss',
};
export function disclosureText(s: GameState, mode: 'full' | 'partial' | 'misdirect') {
  const key = flag(s, 'draft') ?? '';
  if (mode === 'full') return rec(s, key)?.text ?? '';
  if (mode === 'misdirect') return 'I have no documents to share about today.';
  return (
    (
      {
        instruction: 'I checked a date in a patient record. I am not sending its contents.',
        'public-association': 'I attended a professional event. I am not sending the publication.',
        'marcus-note':
          'I obtained an internal account of a discussion. I am not sending the wording.',
        qualification:
          'I obtained a written qualification of an administrative record. I am not sending it.',
        fee: 'I completed a paid discussion. I am not sending the amount or terms.',
      } as Record<string, string>
    )[key] ?? ''
  );
}
export function calendarInvites(s: GameState): Recipient[] {
  return [
    'sloane',
    ...(flag(s, 'helix-window') === 'offered' ? ['julian-mercer' as const] : []),
    ...(flag(s, 'rook-window') === 'offered' ? ['rook' as const] : []),
    ...(flag(s, 'review-done') ? ['voss' as const] : []),
    ...(s.day.completed.includes('chapter3.call') || flag(s, 'morning-contact') === 'called'
      ? ['maya' as const]
      : []),
  ] as Recipient[];
}
export function calendarStatus(s: GameState, r: Recipient) {
  return flag(s, 'cal-' + r) ?? 'unanswered';
}
export function autonomyChoices(s: GameState): NextChoice[] {
  const c: NextChoice[] = [];
  if (s.phase === 'opportunityEnd') {
    if (flag(s, 'helix') === 'meeting' && flag(s, 'paid'))
      c.push(
        choice(
          'read-marcus',
          'Read the referral-summary notice',
          'The office now sends Marcus the actual session record.',
          'marcusRecord',
          (x) => {
            deliver(
              x,
              'marcus',
              'session',
              'Evelynn agreed to the paid exploratory discussion and completed it; no further commitment.',
              'Executive assistant now forwards actual acceptance and completed-session receipt',
            );
            return [
              p(
                'The assistant identifies the material sent to Marcus: your acceptance and the completed-session receipt. No medical record or mission capture accompanies them.',
              ),
            ];
          },
        ),
      );
    else
      c.push(
        choice(
          'enter-review',
          'Confirm and attend the Voss records review',
          'Substantial records work remains available after declining Helix.',
          'institutional',
          (x) => {
            mark(x, 'review-done');
            deliver(
              x,
              'voss',
              'review-attend',
              'Please confirm the 14:00 records review; I will attend.',
              'Delivered scheduling message and attendance',
            );
            return [
              q(
                'Voss · scheduling',
                'Confirmed. We will examine the documents, not perform a procedure.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'marcusRecord')
    c.push(
      choice(
        'authenticate-note',
        'Request the exact note and authenticate it',
        'Retain its limited wording, author, recipients and timestamp.',
        'marcusLeverage',
        (x) => {
          mark(x, 'marcus-auth');
          record(
            x,
            'marcus-note',
            'Marcus wrote after receiving the completed-session record: “Evelynn demonstrated willingness to explore an advisory relationship.” Circulated to Mercer and his assistant. Evelynn agreed only to the completed paid discussion; no contract for future work exists.',
            'Office releases signed message and delivery receipt; Marcus confirms authorship',
          );
          x.proof.push({
            key: 'c3.marcus-note',
            source: 'Authenticated internal summary with narrower acceptance attached',
            owner: 'Evelynn',
          });
          deliver(
            x,
            'marcus',
            'authentication',
            'Please confirm you authored this referral summary.',
            'Delivered request with message identifier',
          );
          return [q('Marcus', 'Yes. Those are my words, and that is the circulation list.')];
        },
      ),
    );
  if (s.phase === 'marcusLeverage' && flag(s, 'marcus-auth')) {
    for (const [id, label, line] of [
      [
        'correct',
        'Demand a precise qualification',
        'Append: today’s discussion is complete; no future advisory relationship is agreed.',
      ],
      ['allow', 'Allow the wording to stand', 'I will not request a correction to this summary.'],
      ['retain', 'Retain the note without replying', ''],
    ] as const)
      c.push(
        choice(
          'memo-' + id,
          label,
          id === 'retain' ? 'Silence sends nothing.' : 'Marcus receives only this exact response.',
          'truths',
          (x) => {
            mark(x, 'memo', id);
            if (line)
              deliver(x, 'marcus', 'response', line, 'Delivered response to authenticated summary');
            if (id === 'correct')
              record(
                x,
                'memo-correction',
                'Marcus appends: today’s discussion is complete; no future advisory relationship is agreed. The office sends the qualification to the original two recipients.',
                'Revised note and delivery receipt',
              );
            return id === 'correct'
              ? [
                  q(
                    'Marcus',
                    'Appended and sent to the original recipients. The old message remains in the chain.',
                  ),
                ]
              : id === 'allow'
                ? [q('Marcus', 'Then the summary stands.')]
                : [p('You save the note and leave the reply empty.')];
          },
        ),
      );
    c.push(
      choice(
        'memo-negotiate',
        'Ask for an introduction without trading silence',
        'Request a procurement contact; no guaranteed concession.',
        'truths',
        (x) => {
          mark(x, 'memo', 'negotiate');
          deliver(
            x,
            'marcus',
            'response',
            'I want the scope qualified. Can you introduce me to procurement separately?',
            'Delivered request',
          );
          record(
            x,
            'memo-correction',
            'Marcus appends the no-future-commitment qualification to the original circulation.',
            'Revised message',
          );
          record(
            x,
            'marcus-access',
            'Marcus supplies the procurement office reply address, with permission to send one scope proposal. No work is promised.',
            'Marcus’s written permission and address',
          );
          return [
            q(
              'Marcus',
              'I will qualify the note. Procurement can receive one proposal. Those are separate decisions.',
            ),
          ];
        },
      ),
    );
    c.push(
      choice(
        'memo-pressure',
        'Trade silence for guaranteed executive access',
        'Demand: “Give me guaranteed access, or I circulate your wording.” Marcus may forward this demand.',
        'truths',
        (x) => {
          mark(x, 'memo', 'pressure');
          deliver(
            x,
            'marcus',
            'demand',
            'Give me guaranteed executive access, or I circulate your wording.',
            'Evelynn’s explicit delivered demand',
          );
          deliver(
            x,
            'julian-mercer',
            'demand',
            'Give me guaranteed executive access, or I circulate your wording.',
            'Marcus forwards Evelynn’s actual message to Mercer',
          );
          x.npcs.marcus.beliefs.push({
            key: 'Evelynn used threatened circulation to demand guaranteed access.',
            source: 'Her exact written demand',
            event: x.revision,
          });
          record(
            x,
            'access-reduced',
            'Marcus refuses guaranteed access and withdraws his discretionary introductions. Mercer’s office withdraws the optional evening follow-up after reading the forwarded demand. The $600 earned voucher is unchanged.',
            'Marcus refusal and executive-office acknowledgment',
          );
          mark(x, 'helix-window', 'withdrawn');
          return [
            q(
              'Marcus',
              'No guaranteed access. I am sending that request to Mercer with my note. I will not sponsor another introduction.',
            ),
            q(
              'Executive office',
              'We withdraw the optional evening follow-up. The completed-session fee remains payable.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'institutional') {
    const steps = [
      [
        'clinical',
        'Read the clinical finding',
        'The clinical release records completion of monitored Stage One recovery. It does not authorize later adaptation or certify unlimited operational fitness.',
        'Voss opens the clinical release',
      ],
      [
        'cover',
        'Read the operational cover sheet',
        'The administrative cover sheet routes Evelynn as available for operational scheduling. It is an administrative interpretation, not Voss’s clinical finding.',
        'Voss opens the administrative cover sheet',
      ],
      [
        'routing',
        'Read the delivery receipt',
        'The cover sheet was routed to Executive Intelligence scheduling. The receipt establishes system delivery, not that Sloane personally read it.',
        'Authenticated routing receipt',
      ],
    ];
    const step = steps.find(([id]) => !flag(s, 'review-' + id));
    if (step) {
      const [id, label, text, source] = step;
      c.push(
        choice(
          'review-' + id,
          label,
          'Inspect this document before comparing its scope.',
          'institutional',
          (x) => {
            mark(x, 'review-' + id);
            record(x, 'review-' + id, text, source);
            return [q('Document', text)];
          },
        ),
      );
    } else
      c.push(
        choice(
          'review-compare',
          'Compare clinical scope with the cover sheet',
          'A delivery receipt does not turn policy into a medical finding.',
          'reviewQualification',
          (x) => {
            record(
              x,
              'scope-gap',
              'The clinical release and operational cover sheet make different claims. Routing the latter does not expand the former’s medical scope.',
              'Evelynn compares all three documents with Voss',
            );
            return [
              q(
                'You',
                'The cover sheet treats release as availability. Your finding does not say that.',
              ),
              q(
                'Voss',
                'Correct. I can qualify my finding and ask that it travel with the cover sheet.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'reviewQualification')
    for (const [id, label] of [
      ['retain', 'Retain the signed qualification'],
      ['circulate', 'Send the qualification to scheduling'],
      ['formal', 'Request a formal scope review'],
    ] as const)
      c.push(
        choice(
          'qualification-' + id,
          label,
          'No further intervention or broad disclosure is authorized.',
          'truths',
          (x) => {
            record(
              x,
              'qualification',
              'Signed Voss qualification: completion of monitored recovery is not unrestricted operational availability or consent to later adaptation.',
              'Voss signed qualification delivered to Evelynn',
            );
            x.proof.push({
              key: 'c3.qualification',
              source: 'Signed clinical-scope qualification',
              owner: 'Evelynn',
            });
            mark(x, 'qualification', id);
            if (id !== 'retain') {
              record(
                x,
                'qualification-routed',
                'The signed qualification is delivered to Executive Intelligence scheduling for attachment to the cover sheet. Receipt does not establish Sloane read it.',
                'Scheduling acknowledgment',
              );
            }
            if (id === 'formal') {
              record(
                x,
                'scope-review',
                'Formal scope-review request accepted for review. Scheduling flags the cover sheet as disputed pending a written determination; no outcome is promised.',
                'Review intake acknowledgment and disputed-scope flag',
              );
              deliver(
                x,
                'voss',
                'formal-review',
                'Please request a formal scope review using this qualification only.',
                'Explicit request',
              );
            }
            return [
              p('Voss signs and gives you a copy.'),
              ...(id === 'retain'
                ? [p('You retain it without sending it elsewhere.')]
                : [
                    q(
                      'Scheduling · receipt',
                      id === 'formal'
                        ? 'Received. The scope is flagged as disputed pending a written determination.'
                        : 'Received. The qualification is attached to the cover sheet.',
                    ),
                  ]),
              q(
                'Voss',
                'I can offer an 18:00 call about the record’s scope. It is optional and separate from treatment.',
              ),
              p('You leave the clinic with the document in your bag.'),
            ];
          },
        ),
      );
  if (s.phase === 'truths') {
    if (Number(flag(s, 'messages') ?? 0) < 4)
      for (const key of disclosureRecords(s))
        c.push(
          choice(
            'draft-' + key,
            'Prepare a message about ' +
              (
                {
                  instruction: 'the preparation date',
                  'public-association': 'the public event entry',
                  'marcus-note': 'Marcus’s wording',
                  qualification: 'the signed qualification',
                  fee: 'the earned fee',
                } as Record<string, string>
              )[key],
            'Nothing is sent until you choose a recipient and exact wording.',
            'disclosure',
            (x) => {
              mark(x, 'draft', key);
              return [q('Selected record', rec(x, key)!.text)];
            },
          ),
        );
    c.push(
      choice(
        'open-calendar',
        'Put the messages aside and open the calendar',
        'Unsent information stays private. Incoming requests are shown before you commit.',
        'calendar',
        (x) => {
          mark(x, 'calendar-open');
          record(
            x,
            'calendar-invitations',
            calendarInvites(x)
              .map((r) => recipientNames[r] + ': 18:00–18:30 call')
              .join('; '),
            'Actual incoming scheduling messages',
          );
          return calendarInvites(x).map((r) =>
            q(
              recipientNames[r],
              r === 'sloane'
                ? 'I request an 18:00 status call. Confirm a time; this request does not tell me what you did today.'
                : r === 'maya'
                  ? 'If you want to talk, I can take a call at six. Please tell me if we arrange it and then something changes.'
                  : r === 'rook'
                    ? 'The six o’clock window is available. You have not confirmed.'
                    : 'I can offer 18:00–18:30. Reply to confirm or ask for another time.',
            ),
          );
        },
      ),
    );
  }
  if (s.phase === 'disclosure') {
    const key = flag(s, 'draft') ?? '';
    if (disclosureRecords(s).includes(key) && Number(flag(s, 'messages') ?? 0) < 4)
      for (const r of recipients(s))
        for (const mode of ['full', 'partial', 'misdirect'] as const) {
          const text = disclosureText(s, mode);
          const token = `sent-${disclosureRecords(s).indexOf(key)}-${r}-${mode}`;
          if (!flag(s, token))
            c.push(
              choice(
                `send-${r}-${mode}`,
                `Send ${mode === 'full' ? 'selected record' : mode === 'partial' ? 'limited account' : 'misleading claim'} to ${recipientNames[r]}`,
                text,
                'truths',
                (x) => {
                  mark(x, token);
                  mark(x, 'messages', String(Number(flag(x, 'messages') ?? 0) + 1));
                  deliver(
                    x,
                    r,
                    `${key}-${mode}`,
                    text,
                    `Evelynn sends ${mode === 'full' ? 'selected record only' : mode === 'partial' ? 'limited message without attachment' : 'her assertion, not an authenticated fact'}`,
                  );
                  return [
                    q('You · delivered', text),
                    p(
                      'The delivery receipt names ' +
                        recipientNames[r] +
                        '. No other recipient is included.',
                    ),
                  ];
                },
              ),
            );
        }
    c.push(
      choice(
        'keep-draft',
        'Keep it private / delay sending',
        'Close this draft without transmission.',
        'truths',
      ),
    );
  }
  if (s.phase === 'calendar') {
    for (const r of calendarInvites(s)) {
      const status = calendarStatus(s, r);
      if (status === 'unanswered') {
        c.push(
          choice(
            'book-' + r,
            `Confirm ${recipientNames[r]} · 18:00–18:30`,
            'A second confirmation for this time creates a conflict.',
            'calendar',
            (x) => {
              mark(x, 'cal-' + r, '18:00');
              deliver(
                x,
                r,
                'calendar',
                'I confirm 18:00–18:30.',
                'Delivered appointment confirmation',
              );
              return [q(recipientNames[r], 'Confirmed. I will expect your call at six.')];
            },
          ),
        );
        c.push(
          choice(
            'wait-' + r,
            `Leave ${recipientNames[r]} waiting for a reply`,
            'Send nothing; the request remains unconfirmed.',
            'calendar',
            (x) => {
              mark(x, 'cal-' + r, 'waiting');
              return [p('You leave the invitation unanswered. It is not an accepted appointment.')];
            },
          ),
        );
      }
      if (['unanswered', '18:00', 'waiting'].includes(status)) {
        c.push(
          choice(
            'move-' + r,
            `Ask ${recipientNames[r]} for 18:45`,
            'Send: “I have a conflict at six. Can we speak at 18:45?”',
            'calendar',
            (x) => {
              const yes = r === 'maya' || r === 'sloane';
              mark(x, 'cal-' + r, yes ? '18:45' : 'unavailable');
              deliver(
                x,
                r,
                'reschedule',
                'I have a conflict at six. Can we speak at 18:45?',
                'Delivered scheduling request',
              );
              record(
                x,
                'reschedule-' + r,
                yes
                  ? `${recipientNames[r]} agrees to 18:45–19:15; the six o’clock slot is released.`
                  : `${recipientNames[r]} cannot offer 18:45; the six o’clock slot is released. No replacement is booked.`,
                'Actual reply to reschedule request',
              );
              return [
                q(
                  recipientNames[r],
                  yes
                    ? '18:45–19:15 works. The earlier slot is released.'
                    : 'I cannot do 18:45. I have released the earlier slot; there is no replacement tonight.',
                ),
              ];
            },
          ),
        );
      }
      if (['unanswered', '18:00', '18:45', 'waiting'].includes(status))
        for (const lie of [false, true])
          c.push(
            choice(
              (lie ? 'excuse-' : 'cancel-') + r,
              (lie ? 'Give an untrue medical excuse to ' : 'Cancel plainly with ') +
                recipientNames[r],
              lie
                ? 'Send: “Voss has ordered me to remain home tonight.” No such order exists.'
                : 'Send: “I am not available for this call tonight.” No other appointment is named.',
              'calendar',
              (x) => {
                mark(x, 'cal-' + r, lie ? 'excused' : 'cancelled');
                deliver(
                  x,
                  r,
                  'cancellation',
                  lie
                    ? 'Voss has ordered me to remain home tonight.'
                    : 'I am not available for this call tonight.',
                  'Evelynn’s delivered ' +
                    (lie ? 'false assertion; not Voss authority' : 'cancellation'),
                );
                if (lie && r === 'voss')
                  return [
                    q(
                      'Voss',
                      'I issued no such order. I am recording your message as your claim, not my instruction.',
                    ),
                  ];
                return [q(recipientNames[r], 'Received. I have released the call.')];
              },
            ),
          );
    }
    const booked = calendarInvites(s).filter((r) =>
      ['18:00', '18:45'].includes(calendarStatus(s, r)),
    );
    for (const destination of [...booked, 'own' as const])
      c.push(
        choice(
          'depart-' + destination,
          destination === 'own'
            ? 'Leave for a walk with no call'
            : `Leave to take ${recipientNames[destination]}’s call`,
          destination === 'own'
            ? 'Carry the unanswered consequences with you. No identity or allegiance is decided.'
            : `Take this call at ${calendarStatus(s, destination)}. Other overlapping confirmed calls will wait without an explanation.`,
          'departure',
          (x) => {
            mark(x, 'departure', destination);
            const selectedTime = destination === 'own' ? null : calendarStatus(x, destination);
            const blocks: Block[] = [];
            for (const r of calendarInvites(x)) {
              const status = calendarStatus(x, r);
              if (r !== destination && status === '18:00') {
                mark(x, 'cal-' + r, 'waiting-confirmed');
                record(
                  x,
                  'waiting-' + r,
                  `${recipientNames[r]} opens the confirmed six o’clock call; Evelynn does not answer while leaving. The contact sends a request to confirm whether the call will happen. No explanation is supplied.`,
                  'Unanswered call and received follow-up',
                );
                blocks.push(q(recipientNames[r], 'We confirmed six. Are you making this call?'));
              } else if (r !== destination && status === '18:45' && selectedTime === '18:45') {
                mark(x, 'cal-' + r, 'conflict-pending');
                record(
                  x,
                  'conflict-' + r,
                  `${recipientNames[r]} still expects 18:45; Evelynn has chosen the competing call without cancelling this confirmation.`,
                  'Two explicit confirmations and departure decision',
                );
              }
            }
            record(
              x,
              'departure',
              destination === 'own'
                ? 'Evelynn leaves for the riverside footpath without opening a call.'
                : `Evelynn leaves for the riverside footpath to take ${recipientNames[destination]}’s ${selectedTime} call.`,
              'Player-selected action; no future agreement',
            );
            if (destination !== 'own')
              blocks.push(
                p(
                  selectedTime === '18:00'
                    ? `You open the call to ${recipientNames[destination]} as you pick up your keys. The connection answers; you ask for a moment while you get downstairs.`
                    : `You set an 18:40 reminder for ${recipientNames[destination]} and pick up your keys. The later call has not happened yet.`,
                ),
              );
            else
              blocks.push(
                p(
                  'You put the phone in your coat pocket and take the river path key off its hook.',
                ),
              );
            blocks.push(
              p(
                'The river path is a place to walk, not a secure channel. You check the weather through the window, choose your coat, and leave.',
              ),
            );
            return blocks;
          },
        ),
      );
  }
  return c;
}
