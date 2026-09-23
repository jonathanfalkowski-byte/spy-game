import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { characters } from './characters';
import { adultEligibility } from './character-schema';
import {
  type C5Scene,
  type C5Choice,
  get5,
  set5,
  get4,
  offer5,
  note5,
  send5,
  mutual5,
  cash5,
  voucher5,
} from './chapter5-model';
export const desireScenes5: Record<string, C5Scene> = {
  want: {
    title: 'Wanting something',
    place: '20:00 · Apartment',
    blocks: [
      p(
        'The guest card you collected at Harbour offers tonight’s rooftop listening hour to every visitor. The photograph on the card shows low chairs, a small stage and the last light over the water. You do not need to go.',
      ),
      p('The card is still beside the programme on the table.'),
    ],
  },
  handoff: {
    title: 'The evening you agreed to',
    place: '20:30 · Hotel guest room doorway',
    blocks: [
      p('Julian meets you at the door and waits. He stands aside, leaving the doorway clear.'),
    ],
  },
  return: {
    title: 'The life she built',
    place: '22:30 · Adrian’s apartment',
    blocks: [
      p(
        'The familiar chair and cabinet are where they were. Adrian’s old jacket is still on its hanger inside the wardrobe. There is room for a small decision without moving any of them.',
      ),
    ],
  },
  complete: {
    title: 'Where you leave it',
    place: '22:35 · Apartment',
    blocks: [p('You leave it that way for the night.')],
  },
};
export const intimate5 = (s: GameState) =>
  mutual5(s) &&
  get5(s, 'want-target') === 'julian' &&
  get5(s, 'authorization') === 'granted' &&
  get5(s, 'willingness') === 'willing' &&
  ['player-character', 'julian-mercer'].every((id) => {
    const c = characters.find((c) => c.id === id);
    return !!c && adultEligibility(c) === 'adult';
  });
export function desireBlocks5(s: GameState): Block[] {
  if (s.phase === 'return')
    return [
      p(
        get5(s, 'went-out')
          ? 'You make your own way back to the apartment. By half past ten, you set your bag and Axiom phone on the table, still in the outfit you chose this morning.'
          : 'By half past ten, you are still at home in the same outfit. You rinse the cup, put it back and set the Axiom phone on the table.',
      ),
      ...(get5(s, 'went-out') && get5(s, 'want-target') === 'salon'
        ? [p('You put the guest card back beside the programme.')]
        : []),
      ...(voucher5(s) ? [p('The earned Helix voucher remains unredeemed in the folder.')] : []),
      ...(get5(s, 'service') === 'julian'
        ? [p('The Helix room confirmation is filed beside your own reader card.')]
        : get5(s, 'service') === 'self'
          ? [p('The personally paid room receipt is filed with the booking card and reader pass.')]
          : []),
      ...(get5(s, 'purchase') === 'phone'
        ? [
            p(
              'The personal phone is still boxed on the table beside the Axiom handset; the monitoring notice is unchanged.',
            ),
          ]
        : []),
      ...(get5(s, 'purchase') === 'wardrobe'
        ? [p('The blouse hangs from its paper-covered hanger, ready for a place in the wardrobe.')]
        : []),
      ...(get5(s, 'purchase') === 'accessory'
        ? [p('The small silver clasp is waiting in its box.')]
        : []),
      ...(get5(s, 'published')
        ? [
            p(
              'You open the approved issue on the Axiom phone, with exactly the name and image use you released.',
            ),
          ]
        : []),
      ...(get5(s, 'obligation-count')
        ? [
            p(
              `${get5(s, 'obligation-count')} future feedback window${get5(s, 'obligation-count') === '1' ? ' is' : 's are'} entered with the cancellation contact. Your municipal pass is still in the folder.`,
            ),
          ]
        : []),
      p(`After the purchases and completed payments, $${cash5(s)} remains yours to use.`),
    ];
  return [];
}
function endWant(x: GameState, desire: string, action: string, motive: string) {
  set5(x, 'desire', desire);
  set5(x, 'want-action', action);
  set5(x, 'motive', motive);
  note5(
    x,
    'wanting',
    `Object: ${get5(x, 'want-target') ?? 'salon'}. Stated desire: ${desire}. Chosen action: ${action}. Private motive: ${motive}. No new work or future personal obligation.`,
    'Explicit private player selection',
  );
}
export function desireChoices5(s: GameState): C5Choice[] {
  const c: C5Choice[] = [];
  if (s.phase === 'want') {
    if (!get5(s, 'want-target')) {
      c.push(
        offer5(
          'want-salon',
          'Consider the rooftop music hour',
          'A free guest hour for Harbour visitors; no purchase, publicity or future booking.',
          'want',
          (x) => {
            set5(x, 'want-target', 'salon');
            return [p('You look at the start time. There is still time to get there.')];
          },
        ),
      );
      if (mutual5(s))
        c.push(
          offer5(
            'want-julian',
            'Ask Julian whether he wants private time tonight',
            'Send a fresh invitation only. Prior intimacy grants no permission now.',
            'want',
            (x) => {
              set5(x, 'want-target', 'julian');
              send5(
                x,
                'julian-mercer',
                'Would you welcome private time tonight? I have not decided the scope.',
                'Fresh player-initiated request after earned mutual interest',
              );
              note5(
                x,
                'current-interest',
                'Julian welcomes a fresh discussion of private time tonight; scope remains unset.',
                'Actual affirmative reply to current request',
              );
              return [
                q(
                  'Julian · reply',
                  'I would like to see you. Tell me what sort of evening you want. We can leave it at conversation, or leave it altogether.',
                ),
              ];
            },
          ),
        );
      c.push(
        offer5(
          'want-none',
          'Let the invitation go; no interest tonight',
          'Stay home without a new arrangement.',
          'return',
          (x) => {
            endWant(x, 'no-interest', 'refused', 'none');
            return [p('You put the card with the programme and make no booking.')];
          },
        ),
      );
      return c;
    }
    if (!get5(s, 'motive')) {
      const personal = get5(s, 'want-target') === 'julian';
      for (const [id, label, desire, motive] of [
        ['personal', 'I want this; take the next step', 'wanted', 'personal'],
        [
          'instrumental',
          'Take the next step for what it might offer',
          'not-established',
          'instrumental',
        ],
        ['mixed', 'I want it, and I see an advantage too', 'wanted', 'mixed'],
      ] as const)
        c.push(
          offer5(
            'desire-' + id,
            label,
            personal
              ? 'Record private desire/motive, then choose present scope. Nothing is authorized yet.'
              : 'Use the free music hour. This is not a promise to return.',
            personal ? 'want' : 'return',
            (x) => {
              if (personal) {
                set5(x, 'desire', desire);
                set5(x, 'motive', motive);
                note5(
                  x,
                  'private-motive',
                  `Stated desire: ${desire}. Private motive: ${motive}. No permission or disclosure to Julian.`,
                  'Explicit private choice',
                );
                return [
                  p(
                    'You know why you are considering it. You still have to say what you are agreeing to.',
                  ),
                ];
              }
              endWant(x, desire, 'accepted', motive);
              set5(x, 'went-out');
              note5(
                x,
                'music-hour',
                'Evelynn uses one free Harbour guest listening hour, 20:30–21:30. No purchase, photograph, subscription or future attendance obligation.',
                'Guest card presented at salon door',
              );
              return [
                p(
                  'You take the guest card from the table, leave home and arrive at Harbour’s roof terrace for half past eight. Nobody asks you to introduce yourself to the room. For an hour, you listen. You leave when the musicians set down their instruments.',
                ),
              ];
            },
          ),
        );
      c.push(
        offer5(
          'desire-refuse',
          'Want it and refuse tonight',
          'Wanting does not require accepting.',
          'return',
          (x) => {
            endWant(x, 'wanted', 'refused', 'personal');
            if (personal)
              send5(
                x,
                'julian-mercer',
                'I want to see you, but I decline tonight.',
                'Explicit current refusal',
              );
            return [
              p(
                'You let yourself want it without rearranging the evening. No replacement date has been agreed.',
              ),
            ];
          },
        ),
      );
      c.push(
        offer5(
          'desire-no-interest',
          'No interest after considering it',
          'No private meeting or new promise.',
          'return',
          (x) => {
            endWant(x, 'no-interest', 'refused', 'none');
            if (personal)
              send5(
                x,
                'julian-mercer',
                'I decline private time tonight.',
                'Explicit current refusal',
              );
            return [p('You decide against it and leave the rest of the evening unbooked.')];
          },
        ),
      );
      c.push(
        offer5(
          'desire-uncertain',
          'Remain uncertain and leave it for now',
          'No action or permission follows uncertainty.',
          'return',
          (x) => {
            endWant(x, 'uncertain', 'deferred', 'unsettled');
            if (personal)
              send5(
                x,
                'julian-mercer',
                'I am uncertain and will not arrange private time tonight.',
                'Explicit deferral, no booking',
              );
            return [p('You close the invitation for tonight. It can remain a question.')];
          },
        ),
      );
      c.push(
        offer5(
          'desire-negotiate',
          'Ask for a shorter, conversation-only visit',
          personal
            ? 'A twenty-minute phone conversation only. No physical encounter.'
            : 'Ask for twenty minutes of the free listening hour; no future commitment.',
          'return',
          (x) => {
            endWant(x, 'not-established', 'negotiated', 'unsettled');
            set5(x, 'authorization', 'conversation-only');
            if (personal) {
              send5(
                x,
                'julian-mercer',
                'Twenty minutes by phone only. No physical or sexual intimacy tonight.',
                'Explicit narrowed scope',
              );
              return [
                q('Julian Mercer', 'Twenty minutes, by phone. That suits me.'),
                p(
                  'You place the call and end the conversation when the twenty minutes are up.',
                ),
              ];
            }
            set5(x, 'went-out');
            return [
              p(
                'The host confirms by message that you may come for twenty minutes. You take the guest card, leave home and arrive at Harbour’s roof terrace at half past eight. A low phrase returns under the melody. You catch it on the second pass and listen for it again. At ten to nine you leave while the set continues.',
              ),
            ];
          },
        ),
      );
    } else {
      c.push(
        offer5(
          'intimacy-decline',
          'Decline private time tonight',
          'No loss of professional payment or services.',
          'return',
          (x) => {
            set5(x, 'want-action', 'refused');
            set5(x, 'authorization', 'not-granted');
            send5(
              x,
              'julian-mercer',
              'I decline private time tonight.',
              'Explicit current refusal',
            );
            return [q('Julian Mercer', 'All right. Have a good evening.')];
          },
        ),
      );
      c.push(
        offer5(
          'flirt-only',
          'Keep it to a flirtatious call',
          'Conversation only; no physical permission.',
          'return',
          (x) => {
            set5(x, 'authorization', 'conversation-only');
            set5(x, 'want-action', 'flirtation');
            send5(
              x,
              'julian-mercer',
              'A flirtatious phone call only. No physical intimacy.',
              'Explicit limited current scope',
            );
            return [
              q('Julian Mercer', 'A call, then.'),
              p(
                'You call him. The conversation is easy enough that you notice the time reluctantly, but you end it at the boundary you set.',
              ),
            ];
          },
        ),
      );
      for (const [id, label, scope] of [
        [
          'no-sex',
          'Agree to physical closeness without sex',
          'Physical closeness only; no sex. Either participant can stop.',
        ],
        [
          'sex',
          'Agree to voluntary sexual intimacy · non-graphic',
          'Voluntary sexual intimacy tonight only; either participant can stop.',
        ],
      ] as const)
        c.push(
          offer5(
            'consent-' + id,
            label,
            'Current authorization only. No payment, benefit or future-work condition.',
            'handoff',
            (x) => {
              set5(x, 'authorization', 'granted');
              set5(x, 'willingness', 'willing');
              set5(x, 'scope', id);
              set5(x, 'want-action', 'authorized');
              set5(x, 'went-out');
              const outcome =
                id === 'no-sex'
                  ? 'physical-without-sex'
                  : get5(x, 'motive') === 'instrumental'
                    ? 'instrumental-encounter'
                    : get5(x, 'motive') === 'mixed'
                      ? 'mixed-encounter'
                      : 'voluntary-encounter';
              set5(x, 'planned-outcome', outcome);
              send5(
                x,
                'julian-mercer',
                scope,
                'Explicit present scope, not earlier Chapter 4 permission',
              );
              note5(
                x,
                'authorization',
                scope,
                'Evelynn authorizes and Julian explicitly agrees to this same scope now',
              );
              note5(
                x,
                'agency',
                'Both adults are willing within current scope. Work authority remains contextual asymmetry; no threat, dependency, fee condition or future promise. Private motive is not disclosed.',
                'Current agreement separate from work and benefits',
              );
              return [
                q('You', scope),
                q('Julian Mercer', 'Agreed. We stop whenever either of us wants to.'),
                p(
                  'You agree on a guest room at the hotel beside Helix. Julian covers the room, with no work or future condition. You arrange your own journey and arrive at half past eight.',
                ),
              ];
            },
          ),
        );
    }
  }
  if (s.phase === 'handoff' && intimate5(s)) {
    c.push(
      offer5(
        'withdraw',
        'Withdraw before the encounter',
        'No intimate outcome; earned funds and services remain.',
        'return',
        (x) => {
          set5(x, 'authorization', 'revoked');
          set5(x, 'willingness', 'unwilling');
          set5(x, 'intimacy', 'withdrawn');
          send5(
            x,
            'julian-mercer',
            'I want to stop. I am leaving.',
            'Explicit withdrawal before any encounter',
          );
          note5(
            x,
            'aftermath',
            'Withdrawal acknowledged. No encounter occurred; earned payment and unrelated service agreements remain.',
            'Julian acknowledges withdrawal',
          );
          return [
            q('Julian Mercer', 'Then we stop.'),
            p('You collect your things. He leaves the way to the door clear.'),
          ];
        },
      ),
    );
    c.push(
      offer5(
        'fade',
        'Continue within the agreed scope · fade to black',
        'Non-graphic. This commits only the currently authorized outcome.',
        'return',
        (x) => {
          set5(x, 'intimacy', get5(x, 'planned-outcome')!);
          note5(
            x,
            'intimacy-outcome',
            `Adult Evelynn and adult Julian complete ${get5(x, 'planned-outcome')}. Scope: ${get5(x, 'scope')}. Private motive remains private. No romance, future work, dependency or recurring personal commitment is established.`,
            'Current mutual authorization followed by player-selected fade',
          );
          note5(
            x,
            'aftermath',
            'Private time ends within the agreed scope. Either may refuse future contact; earned payments and separate service terms are unchanged.',
            'Authored non-graphic aftermath',
          );
          return [
            p(
              get5(x, 'scope') === 'no-sex'
                ? 'The evening stays within the no-sex boundary. The scene fades.'
                : 'The private encounter remains off-page. The scene fades.',
            ),
            p(
              'Later, dressed in the clothes you arrived in, you say goodnight and take your bag and phone.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'return') {
    const finals: [string, string, string][] = [
      [
        'jacket',
        'Leave Adrian’s old jacket in its usual place',
        'You straighten Adrian’s old jacket on its hanger inside the wardrobe and leave it there.',
      ],
      [
        'unchanged',
        'Change nothing tonight',
        'You put the loose papers away and leave the room as it was.',
      ],
    ];
    if (get5(s, 'purchase') === 'phone')
      finals.unshift([
        'phone',
        'Place the personal phone beside the Axiom handset',
        'You take the new phone out of its box and place it beside the Axiom handset on the table.',
      ]);
    if (get5(s, 'purchase') === 'wardrobe')
      finals.unshift([
        'clothes',
        'Hang the blouse in the wardrobe',
        'You take off the paper cover and give the blouse a place on the rail.',
      ]);
    if (get5(s, 'purchase') === 'accessory')
      finals.unshift([
        'clasp',
        'Put the clasp where you will see it tomorrow',
        'You leave the silver clasp on the dresser, outside its box.',
      ]);
    if (get5(s, 'published'))
      finals.unshift(
        [
          'visible',
          'Leave the approved issue visible',
          'You leave the approved issue open on your screen.',
        ],
        [
          'private',
          'Put the publication away for tonight',
          'You close the public issue and put the device away. The publication itself remains within its agreed term.',
        ],
      );
    if (get5(s, 'event-photo'))
      finals.push([
        'photo',
        'Close the programme photograph',
        'You open the programme photograph on the Axiom phone, look at it once, then close the page.',
      ]);
    for (const [id, label, line] of finals)
      c.push(
        offer5('place-' + id, label, 'Leave the room this way for the night.', 'complete', (x) => {
          set5(x, 'placement', id);
          if (id === 'phone') set5(x, 'personal-location', 'table-unboxed');
          if (id === 'private') set5(x, 'axiom-location', 'put-away');
          note5(x, 'placement', line, 'Explicit final physical choice');
          return [p(line)];
        }),
      );
  }
  return c;
}
