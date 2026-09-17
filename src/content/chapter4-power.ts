import type { GameState } from '../state/schema';
import { characters } from './characters';
import { adultEligibility } from './character-schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { helix4 } from './chapter4-case';
import {
  type C4Scene,
  type C4Choice,
  get4,
  set4,
  old,
  oldRecord,
  offer4,
  note4,
  read4,
  send4,
  asset4,
} from './chapter4-model';
export const powerScenes4: Record<string, C4Scene> = {
  favor: {
    title: 'The favor',
    place: '13:00 · A place to work',
    blocks: [
      p(
        'The papers no longer fit comfortably on the corner of the table. You have an afternoon’s work left in them.',
      ),
    ],
  },
  notice: {
    title: 'What reaches Sloane',
    place: '13:30 · Phone messages',
    blocks: [p('You check the phone before opening the next file.')],
  },
  power: {
    title: 'Evelynn uses someone',
    place: '14:00 · The routing-copy request',
    blocks: [
      p(
        'The coordinator finds a second routing copy. It names the pickup desk and the worker who handled the envelope. Your request is the last item in the queue.',
      ),
      p(
        'The release box is empty. You could explain why you need the copy—or say the approval has already been given.',
      ),
    ],
  },
  intimacy: {
    title: 'Private time',
    place: '20:00 · After the working day',
    blocks: [
      p(
        'You finish the afternoon’s notes and return home. By eight, the file is closed and dinner is on the table.',
      ),
    ],
  },
  handoff: {
    title: 'The agreed boundary',
    place: '20:30 · Before private time',
    blocks: [
      p('At the door, Julian waits for you. The encounter has not occurred. You can still leave.'),
    ],
  },
  privateAccess: {
    title: 'Private access',
    place: '09:30 · Following morning · Records desk',
    blocks: [
      p(
        'After a night at home, you reach the records desk at half past nine. You take out your reader pass before the clerk asks for it.',
      ),
      p(
        'You request the permitted public copies. Your earlier papers stay in the closed part of your folder.',
      ),
    ],
  },
  complete: {
    title: 'The copy she keeps',
    place: '09:40 · Outside the records room',
    blocks: [
      p(
        'You check the receipt against the packet, close the cover and place it in your bag. At the exit you use your own reader pass to sign out. The next opening time is printed on its reverse. You keep the card.',
      ),
    ],
  },
};
export function intimacyEligible4(s: GameState) {
  return (
    helix4(s) &&
    !!get4(s, 'mutual-interest') &&
    !get4(s, 'personal-withdrawn') &&
    get4(s, 'audit-paid') === '900' &&
    ['player-character', 'julian-mercer'].every((id) => {
      const c = characters.find((c) => c.id === id);
      return !!c && adultEligibility(c) === 'adult';
    })
  );
}
export function sloaneBasis4(s: GameState) {
  return s.npcs.sloane.known.find((k) =>
    /municipal reader pass|Helix event-page entry|professional event|paid discussion|fee voucher|public-source PA-17/.test(
      k.key,
    ),
  );
}
function discover4(s: GameState) {
  const artifact = oldRecord(s, 'public-association');
  if (artifact && !read4(s, 'public-discovery')) {
    send4(
      s,
      'sloane',
      artifact.text,
      'Executive Intelligence public-page digest actually forwards the existing Helix event entry now',
    );
    note4(
      s,
      'public-discovery',
      'Sloane receives the existing Helix event-page entry in a public-page digest. She sees its exact caption, not private fee terms, workroom arrangements or relationship state.',
      'Actual digest delivery',
    );
  }
}
export function powerBlocks4(s: GameState): Block[] {
  if (s.phase === 'power')
    return [
      p(
        helix4(s)
          ? 'After lunch, you return to the Helix case desk. The coordinator pulls the request tray closer.'
          : 'Back at the municipal case desk, the coordinator opens your public-copy request.',
      ),
      q(
        'Coordinator',
        'If you already have approval, I can release it now. Otherwise I need to ask.',
      ),
    ];
  if (s.phase === 'favor')
    return [
      q(
        helix4(s) ? 'Julian Mercer' : 'Records clerk',
        helix4(s)
          ? 'There is a workroom free until five. I can book it for you. Just the room—no extra work attached.'
          : 'I can hold a desk until five and certify the extracts you inspected. No charge for this bundle.',
      ),
    ];
  if (s.phase === 'notice') {
    const basis = sloaneBasis4(s);
    return basis
      ? [
          p('Sloane’s message quotes: “' + basis.key + '”'),
          q(
            'Sloane',
            basis.key.includes('reader pass')
              ? 'A desk outside Axiom. Useful. Read who can revoke access before you rely on it.'
              : basis.key.includes('event-page')
                ? 'Helix has your name on its event page. Being useful to them is one thing. Having nowhere else to go is another.'
                : 'Outside work can give you room. Check who sets the terms. I do not have yours.',
          ),
        ]
      : [
          p(
            'Nothing from Sloane about the pass or the afternoon’s arrangements. You leave the details where they are.',
          ),
        ];
  }
  if (s.phase === 'intimacy')
    return intimacyEligible4(s)
      ? [
          q(
            'Julian · evening message',
            'I would like to see you tonight, if you still want to. Tell me what you have in mind. It is fine to leave it for another time.',
          ),
        ]
      : [
          p(
            'There is no personal arrangement to keep tonight. You leave the file closed while you eat.',
          ),
        ];
  return [];
}
export function powerChoices4(s: GameState): C4Choice[] {
  const c: C4Choice[] = [];
  if (s.phase === 'favor')
    for (const [id, label] of [
      ['accept', 'Accept the afternoon workspace'],
      ['narrow', 'Ask only for a certified copy; keep your own workspace'],
      ['refuse', 'Decline the extra help'],
    ] as const)
      c.push(
        offer4(
          'favor-' + id,
          label,
          'Keep the independent reader pass. Help does not authorize access to your private life.',
          'notice',
          (x) => {
            set4(x, 'favor', id);
            const provider = helix4(x) ? 'Julian’s office' : 'municipal records desk';
            note4(
              x,
              'favor',
              id === 'refuse'
                ? `Extra help declined; existing reader access and earned income remain.`
                : id === 'narrow'
                  ? `Provider: ${provider}. Benefit: certified permitted copy only. Scope: inspected extracts; no obligation, exclusivity or personal condition.`
                  : `Provider: ${provider}. Benefit: ${helix4(x) ? 'workroom' : 'public desk'} until 17:00 today. Scope: workspace only. Cost: none. Obligation: none. Independent reader pass retained.`,
              'Explicit offer and chosen scope',
            );
            if (id !== 'refuse')
              asset4(
                x,
                'favor-receipt',
                id === 'narrow'
                  ? 'Certified copy receipt; no workspace obligation.'
                  : 'Confirmed workspace booking until 17:00, no further obligation.',
                provider + ' confirms the requested scope',
              );
            discover4(x);
            return [
              q(
                helix4(x) ? 'Julian Mercer' : 'Records clerk',
                id === 'refuse'
                  ? 'Understood. Your existing access remains.'
                  : id === 'narrow'
                    ? 'Copy only. Nothing else is booked.'
                    : 'Booked until five. Bring only the papers you want to work on.',
              ),
            ];
          },
        ),
      );
  if (s.phase === 'notice') {
    if (!get4(s, 'told-resource'))
      c.push(
        offer4(
          'tell-resource',
          'Tell Sloane only about the reader pass',
          'Send: “I obtained a municipal reader pass and may retain public-file copies. It creates no work obligation.”',
          'notice',
          (x) => {
            set4(x, 'told-resource');
            send4(
              x,
              'sloane',
              'I obtained a municipal reader pass and may retain public-file copies. It creates no work obligation.',
              'Evelynn’s explicit limited resource disclosure',
            );
            return [q('Sloane', 'Keep the pass. Read the terms as carefully as the files.')];
          },
        ),
      );
    c.push(
      offer4(
        'notice-boundary',
        sloaneBasis4(s)
          ? 'Acknowledge the argument without disclosing more'
          : 'Keep the resource private',
        'No hidden file, calendar, image rights or personal information is attached.',
        'power',
        (x) => {
          if (sloaneBasis4(x))
            send4(
              x,
              'sloane',
              'I understand the risk. I am not sending further terms or personal information.',
              'Explicit limited reply',
            );
          else
            note4(
              x,
              'sloane-silence',
              'No outside-resource information was sent to Sloane.',
              'Player chooses no transmission',
            );
          return [p('You close the thread and return to the folder.')];
        },
      ),
    );
  }
  if (s.phase === 'power')
    for (const [id, label] of [
      ['honest', 'Explain the purpose and negotiate permission'],
      ['protect', 'Request a redacted copy protecting the pickup worker'],
      ['decline', 'Decline the additional copy'],
      ['exploit', 'Claim the superior already approved release'],
    ] as const)
      c.push(
        offer4(
          'power-' + id,
          label,
          id === 'exploit'
            ? 'False claim: “Your superior approved my retaining this copy.” The coordinator can verify it.'
            : 'Choose the actual scope of cooperation.',
          'intimacy',
          (x) => {
            set4(x, 'method', id);
            const authority = helix4(x) ? 'julian-mercer' : 'records-supervisor';
            if (id === 'decline') {
              note4(
                x,
                'advantage',
                'The extra routing copy is declined; original permitted packet remains.',
                'Explicit refusal',
              );
              return [q('You', 'I will work with the authorized packet.')];
            }
            if (id === 'exploit') {
              send4(
                x,
                'case-coordinator',
                'Your superior approved my retaining this copy.',
                'Evelynn’s false authority assertion',
              );
              asset4(
                x,
                'extra-copy',
                'Extra routing copy obtained after a false approval claim; it names the pickup desk. Retention permission is contested, not established.',
                'Coordinator releases copy then checks approval',
              );
              send4(
                x,
                authority,
                'Evelynn told me you approved her retaining this routing copy. Please confirm.',
                'Coordinator forwards the exact claimed authorization for verification',
              );
              note4(
                x,
                'backfire',
                'The superior denies giving approval. Expedited access is withdrawn and the copy’s retention is disputed; the original authorized packet and earned fee remain.',
                'Source-specific verification and reply',
              );
              if (helix4(x) && get4(x, 'mutual-interest')) {
                set4(x, 'personal-withdrawn');
                note4(
                  x,
                  'invitation-withdrawn',
                  'Julian withdraws his personal invitation after receiving the false authority claim. No fee is revoked.',
                  'Julian’s explicit reply',
                );
              }
              return [
                q('Coordinator', 'Here is the copy. I will confirm the approval for the file.'),
                q(
                  helix4(x) ? 'Julian Mercer' : 'Records supervisor',
                  'I did not give that approval. Expedited access is closed; your original access is unchanged.',
                ),
                ...(helix4(x) && get4(x, 'mutual-interest')
                  ? [
                      q(
                        'Julian Mercer',
                        'I also withdraw the personal invitation tonight. The completed work remains paid.',
                      ),
                    ]
                  : []),
              ];
            }
            send4(
              x,
              'case-coordinator',
              id === 'honest'
                ? 'I want to check the pickup route. Please obtain permission before releasing a copy.'
                : 'Please remove the worker’s name; I need only the routing sequence.',
              'Informed request and stated use',
            );
            asset4(
              x,
              'extra-copy',
              id === 'honest'
                ? 'An authorized routing copy identifies the pickup desk; it does not identify a deliberate leaker.'
                : 'A permitted redacted routing copy preserves the sequence while protecting the pickup worker’s name.',
              'Coordinator obtains explicit permission for the named scope',
            );
            note4(
              x,
              'cooperation',
              id === 'protect'
                ? 'The coordinator knows Evelynn requested protection of the worker’s name.'
                : 'The coordinator knows the stated investigative purpose before cooperating.',
              'Actual explanation and scoped permission',
            );
            return [
              q(
                'Coordinator',
                'I have approval for that scope. Keep the qualification with the copy.',
              ),
            ];
          },
        ),
      );
  if (s.phase === 'intimacy') {
    if (!intimacyEligible4(s))
      return [
        offer4(
          'quiet-evening',
          'Keep the evening to yourself',
          'Finish the evening at home.',
          'privateAccess',
          (x) => {
            set4(x, 'intimacy', 'none');
            note4(
              x,
              'evening',
              'Evelynn spends the evening privately; no encounter or new personal agreement occurs.',
              'Player-selected quiet evening',
            );
            return [p('You put the phone aside and make room on the table for tomorrow’s packet.')];
          },
        ),
      ];
    c.push(
      offer4(
        'intimacy-decline',
        'Decline private time',
        'Earned payment and ordinary access remain unchanged.',
        'privateAccess',
        (x) => {
          set4(x, 'intimacy', 'declined');
          set4(x, 'authorization', 'not-granted');
          send4(x, 'julian-mercer', 'I decline private time tonight.', 'Explicit personal refusal');
          return [q('Julian Mercer', 'Understood. Thank you for telling me.')];
        },
      ),
    );
    c.push(
      offer4(
        'flirt-only',
        'Keep it to flirtation only',
        'Authorize conversation only; no physical or sexual permission.',
        'privateAccess',
        (x) => {
          set4(x, 'intimacy', 'flirtation-only');
          set4(x, 'authorization', 'conversation-only');
          send4(
            x,
            'julian-mercer',
            'Conversation and flirtation only. I do not authorize physical or sexual intimacy.',
            'Explicit boundary accepted by Julian',
          );
          note4(
            x,
            'flirtation',
            'A short mutually welcomed flirtatious conversation occurs and ends at the stated boundary.',
            'Scoped conversation; no physical encounter',
          );
          return [
            p('You call him after sending the limit.'),
            q('Julian Mercer', 'Conversation only. I understand.'),
            p('You talk briefly and end the call without making another promise.'),
          ];
        },
      ),
    );
    if (!get4(s, 'motive'))
      for (const [id, label] of [
        ['personal', 'Explore private time from personal interest'],
        ['instrumental', 'Explore private time with an instrumental motive'],
        ['mixed', 'Acknowledge mixed personal and instrumental motives'],
      ] as const)
        c.push(
          offer4(
            'motive-' + id,
            label,
            'Record your private motive only. It gives Julian no knowledge or permission.',
            'intimacy',
            (x) => {
              set4(x, 'motive', id);
              note4(
                x,
                'private-motive',
                `Player-selected motive: ${id}. This is private, not a disclosure to Julian or a bargain for professional favors.`,
                'Explicit private player choice',
              );
              return [p('You read his message once more. Your answer is still unwritten.')];
            },
          ),
        );
    else
      for (const [id, label, scope] of [
        [
          'no-sex',
          'Agree to physical intimacy without sex',
          'Physical closeness only; no sex. Either person can stop.',
        ],
        [
          'sex',
          'Agree to voluntary sexual intimacy, shown non-graphically',
          'Voluntary sexual intimacy tonight only; either person can stop. No work or future obligation.',
        ],
      ] as const)
        c.push(
          offer4('consent-' + id, label, scope, 'handoff', (x) => {
            set4(x, 'authorization', 'granted');
            set4(x, 'scope', id);
            set4(x, 'willingness', 'willing');
            set4(x, 'desire', 'not-established');
            set4(
              x,
              'planned-outcome',
              id === 'no-sex'
                ? 'physical-without-sex'
                : get4(x, 'motive') === 'instrumental'
                  ? 'instrumental-encounter'
                  : get4(x, 'motive') === 'mixed'
                    ? 'mixed-encounter'
                    : 'voluntary-encounter',
            );
            send4(
              x,
              'julian-mercer',
              scope,
              'Explicit current authorization, separate from payment and favors',
            );
            note4(
              x,
              'authorization',
              scope,
              'Evelynn explicitly authorizes this scope; Julian explicitly agrees to the same scope',
            );
            note4(
              x,
              'agency',
              'Both participants are willing within the named scope. Professional authority remains a contextual asymmetry; no threat, coercion, dependency or payment condition is established. Affection and trust are not inferred.',
              'Current mutually confirmed boundaries',
            );
            return [
              q('You', scope),
              q(
                'Julian Mercer',
                'Yes. Those limits suit me. If either of us wants to stop, we stop.',
              ),
              p(
                'You agree to meet in a guest room at the hotel whose café you visited at lunch. You arrange your own journey and arrive at half past eight.',
              ),
            ];
          }),
        );
  }
  if (s.phase === 'handoff' && intimacyEligible4(s) && get4(s, 'authorization') === 'granted') {
    c.push(
      offer4(
        'withdraw',
        'Withdraw before the encounter',
        'Revoke authorization. No intimate outcome occurs.',
        'privateAccess',
        (x) => {
          set4(x, 'authorization', 'revoked');
          set4(x, 'willingness', 'unwilling');
          set4(x, 'intimacy', 'withdrawn');
          send4(
            x,
            'julian-mercer',
            'I have changed my mind. I want to stop.',
            'Explicit withdrawal before the encounter',
          );
          note4(
            x,
            'aftermath',
            'Withdrawal acknowledged; no encounter occurs. Earned payment and ordinary access are unchanged.',
            'Julian acknowledges the stop',
          );
          return [q('Julian Mercer', 'We stop here.'), p('You collect your things and head home.')];
        },
      ),
    );
    c.push(
      offer4(
        'fade',
        'Continue within the agreed scope · fade to black',
        'The scene fades without graphic detail. The agreed limits remain in effect.',
        'privateAccess',
        (x) => {
          set4(x, 'intimacy', get4(x, 'planned-outcome')!);
          note4(
            x,
            'intimacy-outcome',
            `Private time concluded: ${get4(x, 'planned-outcome')?.replaceAll('-', ' ')}. Participants: adult Evelynn and adult Julian. Scope: ${get4(x, 'scope')}. Motive remains private. No new work, romance or dependency commitment.`,
            'Mutually authorized encounter, non-graphic presentation',
          );
          note4(
            x,
            'aftermath',
            'The agreed private time ends. Both retain the right to decline future contact; no future meeting or relationship is promised. Income and independent access are unchanged.',
            'The encounter ends within its agreed scope',
          );
          return [
            p(
              get4(x, 'scope') === 'no-sex'
                ? 'The agreed closeness remains within the no-sex boundary. The scene fades.'
                : 'The private encounter remains off-page. The scene fades.',
            ),
            p('Later, you gather your things, say goodnight and head home.'),
          ];
        },
      ),
    );
  }
  if (s.phase === 'privateAccess')
    c.push(
      offer4(
        'collect',
        'Use your own pass and collect the permitted packet',
        'Store only the authorized copies; leave disputed extra material out of the certified packet.',
        'complete',
        (x) => {
          asset4(
            x,
            'retained-packet',
            'Evelynn collects permitted public copies and adds them to the case packet already in her custody. The pass remains valid during public hours. ' +
              (get4(x, 'favor') === 'accept'
                ? 'The temporary workspace booking has expired. '
                : 'No temporary workspace booking is carried forward. ') +
              'Any disputed extra copy is excluded from the certified packet.',
            'Reader-pass use and collection receipt',
          );
          note4(
            x,
            'future-terms',
            helix4(x)
              ? 'A completed paid client engagement exists; future work requires another agreement. Independent reader access remains available.'
              : 'Independent reader access and documentary custody remain. No professional client or income is fabricated.',
            'Actual resources and their limits',
          );
          return [
            q(
              'Records clerk',
              get4(x, 'favor') === 'accept' && !helix4(x)
                ? 'These are your permitted public copies. The temporary booking ended yesterday. You can book another public desk under the posted rules.'
                : 'These are your permitted public copies. Your reader pass remains valid. You can request a public desk under the posted rules.',
            ),
            p('You compare the receipt with the papers before putting them away.'),
          ];
        },
      ),
    );
  return c;
}
