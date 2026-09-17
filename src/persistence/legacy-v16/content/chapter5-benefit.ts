import type { GameState } from '../../../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { mayaKnowsAdaptation } from '../state/chapter3-provenance';
import {
  type C5Scene,
  type C5Choice,
  get5,
  set5,
  get4,
  old,
  offer5,
  note5,
  send5,
  cash5,
  money5,
  julian5,
  read5,
} from './chapter5-model';
export const benefitScenes5: Record<string, C5Scene> = {
  infrastructure: {
    title: 'A little easier',
    place: '15:00 · Back at the apartment',
    blocks: [
      p(
        'By three, you are at home. The small table will hold the papers if you move your meal to the counter. You would rather have a quiet place to spread out.',
      ),
      p(
        'Harbour rents ordinary workrooms by the week. Your municipal reader pass still provides a public desk. Neither requires you to give up this apartment.',
      ),
    ],
  },
  terms: {
    title: 'The price is not money',
    place: '16:00 · The written extension',
    blocks: [
      p(
        'The written workroom offer is longer. Four weeks of workspace, with two one-hour feedback calls seven and fourteen days from today, from ten until eleven. No client files are requested.',
      ),
      p(
        'You turn to the cancellation line before deciding. Ending the extension cancels its unused workspace and future calls together. Your original booking, completed work, possessions and municipal pass are unaffected.',
      ),
    ],
  },
  people: {
    title: 'People who knew Adrian',
    place: '18:00–19:00 · Apartment · Existing message threads',
    blocks: [
      p(
        'You make tea before opening the familiar threads. The people in them have had days of their own. You can send two deliberate messages, or leave the evening quiet.',
      ),
      p('Earlier messages remain above the new reply field.'),
    ],
  },
};
export const provider5 = (s: GameState) =>
  get5(s, 'service') === 'julian' ? 'Helix office' : 'Harbour workroom programme';
const extensionStart5 = (s: GameState) =>
  ['julian', 'self'].includes(get5(s, 'service') ?? '')
    ? 'after the current seven-day booking'
    : 'tomorrow';
export function benefitBlocks5(s: GameState): Block[] {
  if (s.phase === 'infrastructure' && julian5(s))
    return [
      p(
        'Julian’s professional thread is still open. You could tell him about the crowded table, if you want help with this particular problem.',
      ),
    ];
  if (s.phase === 'terms')
    return [
      p(
        get5(s, 'service') === 'julian'
          ? 'The Helix bookings office sends the extension with your confirmation.'
          : 'Harbour’s visitor bulletin includes the feedback-for-workspace offer. You open its public terms; nobody needs to know which desk you chose.',
      ),
      p(
        `The extension would start ${extensionStart5(s)}. The calls are measured from today, not from the start of the booking.`,
      ),
      q(
        provider5(s) === 'Helix office' ? 'Julian’s office' : 'Harbour coordinator',
        'We can book access in exchange for the two feedback windows. Or one week and one call. We want to know whether the rooms are useful; there is no right to your work or to other hours.',
      ),
    ];
  return [];
}
function service5(x: GameState, provider: string, scope: string, cost: number) {
  set5(x, 'service', provider);
  set5(
    x,
    'service-term',
    provider === 'municipal' || provider === 'axiom' ? 'existing' : 'seven-days',
  );
  note5(
    x,
    'service',
    `Provider: ${provider === 'julian' ? 'Helix office' : provider === 'self' ? 'Harbour workrooms, personally funded' : provider === 'municipal' ? 'municipal reading room' : 'existing Axiom-supported home'}. Benefit/scope: ${scope}. Term: ${provider === 'municipal' ? 'posted public opening hours' : provider === 'axiom' ? 'existing housing terms unchanged' : 'seven days, staffed hours 09:00–17:00'}. New cost: $${cost}. New obligation: none. No image, personal or file-access rights. Existing pass retained.`,
    'Named provider confirms only the chosen service',
  );
}
export function benefitChoices5(s: GameState): C5Choice[] {
  const c: C5Choice[] = [];
  if (s.phase === 'infrastructure') {
    if (julian5(s))
      c.push(
        offer5(
          'service-julian',
          'Tell Julian about the crowded table and accept a week’s workroom',
          'Helix provides staffed-hours space for seven days, $0, no new duty. Entry logged; no promise of absolute privacy.',
          'terms',
          (x) => {
            send5(
              x,
              'julian-mercer',
              'My apartment table is cramped. I want a quiet workroom, not housing or access to my files. What can you offer?',
              'Explicit new disclosure of the workspace need',
            );
            service5(
              x,
              'julian',
              'one booked quiet workroom; office logs entry, cannot access your private files',
              0,
            );
            return [
              q(
                'Julian Mercer',
                'The accessible room is usually kept for travelling directors. Hold on.',
              ),
              p(
                'You hear him ask the bookings desk to move his own afternoon slot. When he returns, he gives you the confirmation number rather than a promise to sort it out later.',
              ),
              q(
                'Julian Mercer',
                'Seven days. No extra work. I would be glad to have a useful professional contact nearby, but that is my hope, not your agreement. Keep your public pass.',
              ),
              p(
                'You leave home for the Helix bookings desk, collect the card and return before four. The card goes in the folder beside the reader pass.',
              ),
            ];
          },
        ),
      );
    if (cash5(s) >= 60)
      c.push(
        offer5(
          'service-self',
          'Pay for your own quiet workspace · $60',
          'Harbour, seven staffed days. No automatic renewal or work obligation.',
          'terms',
          (x) => {
            money5(x, 'workspace', -60, 'Harbour seven-day room booking paid by Evelynn');
            service5(x, 'self', 'one quiet workroom in staffed hours, entry logged', 60);
            return [
              p(
                'You leave home for Harbour, choose a desk from the public rate sheet and pay at the counter. You take the receipt and booking card home before four and file them beside the reader pass.',
              ),
            ];
          },
        ),
      );
    for (const [id, label, line] of [
      [
        'municipal',
        'Use the reader pass you already own',
        'From home, you use the municipal booking page to request a shared reading desk under the posted hours. The confirmation arrives on the Axiom phone.',
      ],
      [
        'axiom',
        'Keep working at home; accept the inconvenience',
        'You put the loose papers in two shallow piles and clear a place to eat.',
      ],
    ] as const)
      c.push(
        offer5(
          'service-' + id,
          label,
          'No new cost or provider obligation; keep other earned resources.',
          'terms',
          (x) => {
            service5(
              x,
              id,
              id === 'municipal'
                ? 'ordinary shared public reading desk'
                : 'existing apartment table',
              0,
            );
            return [p(line)];
          },
        ),
      );
  }
  if (s.phase === 'terms') {
    for (const [id, label, count, term] of [
      ['accept', 'Accept four weeks for two defined calls', 2, 28],
      ['narrow', 'Negotiate one week and one call', 1, 7],
      ['backup', 'Accept two calls and keep a public-desk fallback', 2, 28],
    ] as const)
      c.push(
        offer5(
          'terms-' + id,
          label,
          `${provider5(s)}: workspace for ${term} days starting ${extensionStart5(s)}; ${count} one-hour feedback call${count > 1 ? 's' : ''}. No files, exclusivity or automatic renewal. Cancel unused service and future calls together.`,
          'people',
          (x) => {
            set5(x, 'terms', id);
            set5(x, 'obligation-provider', provider5(x));
            set5(x, 'obligation-count', String(count));
            set5(x, 'obligation-term', String(term));
            set5(x, 'obligation-scope', 'feedback-only');
            set5(x, 'obligation-cost', '0');
            set5(
              x,
              'obligation-start',
              ['julian', 'self'].includes(get5(x, 'service') ?? '')
                ? 'after-current-booking'
                : 'tomorrow',
            );
            set5(x, 'obligation-cancel', 'unused-service-and-calls');
            if (id === 'backup') set5(x, 'public-backup');
            send5(
              x,
              get5(x, 'service') === 'julian' ? 'julian-mercer' : 'harbour',
              `I accept ${term} days of workspace starting ${extensionStart5(x)}, for ${count} feedback call${count > 1 ? 's' : ''}: day +7${count > 1 ? ' and +14' : ''}, 10:00–11:00. No files or other availability. Either side may end unused service and future calls together.`,
              'Explicit accepted limited extension',
            );
            note5(
              x,
              'obligation',
              `Provider: ${provider5(x)}. Benefit: workspace in staffed hours. Term: ${term} days starting ${['julian', 'self'].includes(get5(x, 'service') ?? '') ? 'after the current seven-day booking' : 'tomorrow'}. Cost: $0. Obligation: ${count} feedback window${count > 1 ? 's' : ''}, day +7${count > 1 ? ' and +14' : ''}, 10:00–11:00. No client data, exclusivity or automatic renewal. Cancellation ends unused extension service and future windows together; the original booking remains. Existing paid/earned resources and municipal access remain.`,
              'Written extension accepted; no feedback call has occurred yet',
            );
            return [
              q(
                'Coordinator',
                'Those are the terms I will book. I have left the other hours blank.',
              ),
              p(
                id === 'backup'
                  ? 'You put the public reading-room hours beside the new booking.'
                  : 'You enter the exact windows in your calendar, including the cancellation contact.',
              ),
            ];
          },
        ),
      );
    if (cash5(s) >= 60)
      c.push(
        offer5(
          'terms-pay',
          'Pay $60 for another independent week; accept no calls',
          'Harbour; a second paid week is additional to any existing booking. No renewal or extra availability.',
          'people',
          (x) => {
            money5(
              x,
              'extension',
              -60,
              'Separately purchased additional Harbour week; no feedback agreement',
            );
            set5(x, 'terms', 'self-funded');
            set5(x, 'paid-extension-start', extensionStart5(x));
            note5(
              x,
              'extension',
              'Personally paid $60 for an additional seven staffed days at Harbour. No feedback windows, image use, exclusivity or automatic renewal.',
              'Paid independent booking',
            );
            return [
              p(
                'You pay through Harbour’s booking page at home and save the receipt on the Axiom phone. The additional week starts after any current seven-day booking, or tomorrow if you have none. There are no calls to add to the calendar.',
              ),
            ];
          },
        ),
      );
    c.push(
      offer5(
        'terms-refuse',
        'Refuse the extension',
        'Keep the previously accepted week or existing desk exactly as agreed. No new obligation.',
        'people',
        (x) => {
          set5(x, 'terms', 'refused');
          note5(
            x,
            'extension-refused',
            'Extension refused. Prior service, earned payments and reader access remain; no feedback window is booked.',
            'Explicit refusal',
          );
          return [q('Coordinator', 'Then we leave your current arrangement alone.')];
        },
      ),
    );
  }
  if (s.phase === 'people') {
    const left = 2 - Number(get5(s, 'messages') ?? 0);
    const choices: [string, string, string, string, (x: GameState) => Block[]][] = [];
    const shared = get5(s, 'published')
      ? 'I approved an Aster profile. Here is the public issue link; I am not sending private work records.'
      : get5(s, 'purchase') === 'phone'
        ? 'I bought a personal phone with a prepaid month. My housing terms are unchanged.'
        : 'I have kept my reader pass and made time to choose something for myself. No new files are attached.';
    choices.push([
      'maya',
      'Tell Maya one concrete thing',
      'maya',
      shared,
      (x) => {
        const missed = ['missed', 'repair-requested'].includes(get4(x, 'cal-maya') ?? '');
        return [
          q(
            'Maya',
            missed
              ? 'I have ten minutes. I am still waiting for you to suggest a time to talk about the call you missed.'
              : mayaKnowsAdaptation(x)
                ? 'I am glad you told me. I would like to hear about something you chose, as well as everything that happened to you.'
                : 'I am glad you wrote. Tell me about the part you enjoyed.',
          ),
          q(
            'Maya',
            'I have to leave soon. Send me a time if you want a longer conversation; I will tell you whether I can make it.',
          ),
        ];
      },
    ]);
    choices.push([
      'sloane',
      'Tell Sloane only the workspace arrangement',
      'sloane',
      `I chose ${get5(s, 'service') === 'julian' ? 'a seven-day Helix workroom' : get5(s, 'service') === 'self' ? 'a personally paid Harbour workroom' : get5(s, 'service') === 'municipal' ? 'a public reading desk' : 'my existing home workspace'}. I retain my public reader pass. No personal or case files are attached.`,
      () => [
        q(
          'Sloane',
          'Read the end date as carefully as the opening hours. Check what the same desk would cost you next month.',
        ),
        p('She has your description of the workspace. You have not sent the rest of the calendar.'),
      ],
    ]);
    if (old(s, 'rook-window') === 'offered')
      choices.push([
        'sender',
        'Ask the sender about public attention',
        'rook',
        'I am considering public attention on terms I can review. I am not sending my work or calendar.',
        (x) => [
          ...(old(x, 'misdirect-rook')
            ? [
                q(
                  'Unknown sender',
                  'You once said you sent everything to Sloane. I still have only your word for that.',
                ),
              ]
            : []),
          q(
            'Unknown sender',
            'Keep the version you approved. When someone calls it a favour later, you can read them the terms.',
          ),
        ],
      ]);
    if (old(s, 'qualification'))
      choices.push([
        'voss',
        'Ask Voss about the existing qualification',
        'voss',
        old(s, 'qualification') === 'formal'
          ? 'I still have your signed qualification. Has its clinical scope or the pending administrative status changed?'
          : 'I still have your signed qualification. Has its clinical scope changed?',
        (x) => [
          q(
            'Voss',
            old(x, 'qualification') === 'formal'
              ? 'There is no determination on the formal review to send you. My clinical qualification is unchanged.'
              : 'My signed qualification is unchanged. No further procedure is booked by this exchange.',
          ),
        ],
      ]);
    if (left > 0)
      for (const [id, label, to, words, reply] of choices)
        if (!get5(s, 'message-' + id))
          c.push(
            offer5('message-' + id, label, `Send exactly: “${words}”`, 'people', (x) => {
              set5(x, 'message-' + id);
              set5(x, 'messages', String(Number(get5(x, 'messages') ?? 0) + 1));
              send5(
                x,
                to,
                words,
                'Evelynn chooses exact limited message on existing verified thread',
              );
              if (to === 'maya' && get5(x, 'published'))
                note5(
                  x,
                  'maya-discovery',
                  'Maya opens the Aster issue link Evelynn sent. She sees only the authorized caption and public content.',
                  'Actual delivered link opened in reply',
                );
              return reply(x);
            }),
          );
    c.push(
      offer5(
        'people-finish',
        'Leave the remaining threads alone tonight',
        'No unselected disclosure or new appointment.',
        'want',
        () => [p('You finish the tea. The unanswered threads remain where you left them.')],
      ),
    );
  }
  return c;
}
