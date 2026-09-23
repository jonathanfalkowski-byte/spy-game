import { carriedCallbacks4, contactCallback4 } from './chapter4-callbacks';
import { mayaKnowsAdaptation } from '../state/chapter3-provenance';
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { calendarInvites, calendarStatus } from './chapter3-autonomy';
import {
  type C4Scene,
  type C4Choice,
  get4,
  set4,
  old,
  offer4,
  note4,
  send4,
  asset4,
  names4,
  boundary4,
} from './chapter4-model';
export const entryScenes4: Record<string, C4Scene> = {
  entry: {
    title: 'The choice you made',
    place: '18:00 · River path · Chapter 4',
    blocks: [
      p(
        'At the foot of the building steps, the river wind catches your coat. You check the name on the screen before walking on.',
      ),
      ...boundary4,
    ],
  },
  consequences: {
    title: 'Consequences arrive',
    place: 'After the selected call or walk · Same evening',
    blocks: [
      p(
        'You stop at a bench above the river and open the remaining threads. Some end with a cancellation. Others still have a question waiting.',
      ),
      p('Check the times before putting the phone away.'),
    ],
  },
  resource: {
    title: 'An asset of her own',
    place: '09:15 · Next day · Public records reading room',
    blocks: [
      p(
        'You return home, eat and sleep. Next morning, you dress, pin up your hair and take your folder to the public records room. A card beside the desk lists its opening hours.',
      ),
      p(
        'The registration form has a name field and a signature line. No employer’s countersignature. The pass is free; it covers a reading desk and ordinary public-file copies. Certified copies have separate terms.',
      ),
    ],
  },
};
export function entryBlocks4(s: GameState): Block[] {
  if (s.phase !== 'entry') return [];
  const dest = old(s, 'departure') ?? 'own',
    time =
      dest === 'own' ? undefined : calendarStatus(s, dest as Parameters<typeof calendarStatus>[1]);
  return [
    ...carriedCallbacks4(s),
    p(
      dest === 'own'
        ? 'You left without opening a call. For the first stretch of the path, you let the phone stay in your pocket.'
        : time === '18:45'
          ? `The reminder names ${names4[dest]} at 18:45. It is still 18:00; the call has not happened.`
          : `${names4[dest]} is still on the connected call. You have asked for a moment to get downstairs; now you bring the phone back to your ear.`,
    ),
  ];
}
const hasAdaptation = mayaKnowsAdaptation;
export function entryChoices4(s: GameState): C4Choice[] {
  const c: C4Choice[] = [];
  if (s.phase === 'entry') {
    const dest = old(s, 'departure') ?? 'own';
    c.push(
      offer4(
        'payoff',
        dest === 'own' ? 'Take the uncalled walk' : `Keep the chosen ${names4[dest]} call`,
        dest !== 'own' &&
          calendarStatus(s, dest as Parameters<typeof calendarStatus>[1]) === '18:45'
          ? 'Walk until the agreed time, then place the call.'
          : 'Continue the call already connected, or finish your chosen walk.',
        'consequences',
        (x) => {
          const late =
            dest !== 'own' &&
            calendarStatus(x, dest as Parameters<typeof calendarStatus>[1]) === '18:45';
          set4(x, 'clock', late ? '1155' : '1110');
          set4(x, 'opening', dest);
          if (dest !== 'own') {
            set4(x, 'cal-' + dest, 'kept');
            send4(
              x,
              dest,
              'I am here for the call we arranged.',
              'Kept ' + (late ? '18:45' : '18:00') + ' call',
            );
          }
          const blocks: Block[] = [
            p(
              late
                ? 'You walk the loop, wait for the reminder, then call at 18:45.'
                : 'You follow the path toward the river bend.',
            ),
          ];
          blocks.push(...contactCallback4(x, dest));
          if (dest === 'julian-mercer') {
            set4(x, 'julian-kept');
            blocks.push(
              q(
                'Julian Mercer',
                'A price ceiling reached our print supplier. It should not have left the negotiating room. Nine hundred dollars to trace the route tomorrow. I need an answer I can use, even if the answer is that we cannot name anyone yet.',
              ),
            );
            note4(
              x,
              'outside-offer',
              'Julian offers a next-day bounded acquisition-disclosure audit; no acceptance yet.',
              'Kept follow-up call',
              'claim',
            );
          } else if (dest === 'sloane') {
            set4(x, 'sloane-brief');
            blocks.push(
              q(
                'Sloane',
                'PA-17, municipal records. An acquisition dispute. Take a look if you want the work. Public documents only; send me your assessment if you accept.',
              ),
            );
          } else if (dest === 'rook') {
            set4(x, 'sender-tip');
            note4(
              x,
              'docket-tip',
              'The sender supplies public docket PA-17, an acquisition-disclosure dispute. The number can be checked independently.',
              'Unknown sender’s call',
              'claim',
            );
            blocks.push(
              q(
                'Unknown sender',
                'PA-17. The delivery receipt is in the public file. Start there.',
              ),
            );
          } else if (dest === 'voss') {
            set4(x, 'voss-support');
            blocks.push(
              q(
                'Voss',
                'If you want to compare another routing dispute, ask the municipal desk for PA-17. Keep my qualification with your own records. I do not need a copy of that case.',
              ),
            );
          } else if (dest === 'maya') {
            set4(x, 'maya-kept');
            blocks.push(
              q(
                'Maya',
                hasAdaptation(x)
                  ? 'I keep thinking about what you told me. I am glad you called. I still have questions, but they can wait if you need them to.'
                  : 'You made the call. Good. You can start wherever you want.',
              ),
              q(
                'Maya',
                'Send me a public docket number if you find something worth looking at. I can spare a few minutes tomorrow. My work files stay at work.',
              ),
            );
          } else
            blocks.push(
              p(
                'At the pedestrian exit, a municipal notice lists recent commercial disputes, including PA-17. You photograph the reading-room address for tomorrow.',
              ),
            );
          note4(
            x,
            'opening-kept',
            dest === 'own'
              ? 'The uncalled walk is completed.'
              : `${names4[dest]}’s selected call was kept; no further contract or disclosure was implied.`,
            'Actual opening action',
          );
          blocks.push(
            p(
              late
                ? 'The call ends at 19:15.'
                : 'By half past six, you have reached the bend in the path.',
            ),
          );
          return blocks;
        },
      ),
    );
  }
  if (s.phase === 'consequences') {
    for (const r of calendarInvites(s)) {
      if (get4(s, 'cal-' + r)) continue;
      const status = calendarStatus(s, r),
        future = status === '18:45' && Number(get4(s, 'clock') ?? 1110) < 1125;
      if (future)
        c.push(
          offer4(
            'keep-' + r,
            `Keep ${names4[r]}’s 18:45 call`,
            'Wait until 18:45. Other calls at that time remain separate obligations.',
            'consequences',
            (x) => {
              set4(x, 'clock', '1155');
              set4(x, 'cal-' + r, 'kept');
              if (r === 'maya') set4(x, 'maya-kept');
              if (r === 'sloane') set4(x, 'sloane-brief');
              send4(
                x,
                r,
                'I am keeping our 18:45 call. I am not sending other records.',
                'Actual later call',
              );
              return [
                ...contactCallback4(x, r),
                q(names4[r], 'You kept the time.'),
                q(
                  names4[r],
                  r === 'maya'
                    ? 'Send me a public docket number tomorrow. I can spare a few minutes; my work files stay at work.'
                    : 'PA-17, municipal records. If you want the work, read the public file and send me your assessment.',
                ),
                p('You finish at 19:15.'),
              ];
            },
          ),
        );
      if (status === 'excused')
        c.push(
          offer4(
            'correct-' + r,
            `Correct the medical excuse to ${names4[r]}`,
            'Send: “Voss did not order me to remain home. That was my excuse.”',
            'consequences',
            (x) => {
              set4(x, 'cal-' + r, 'corrected');
              send4(
                x,
                r,
                'Voss did not order me to remain home. That was my excuse.',
                'Voluntary correction of earlier assertion',
              );
              return [
                q(
                  names4[r],
                  r === 'voss'
                    ? 'I told you I issued no such order. I will attach your correction.'
                    : 'All right. Next time, just say you cannot make the call.',
                ),
              ];
            },
          ),
        );
      const missed =
        ['waiting-confirmed', 'conflict-pending'].includes(status) ||
        (status === '18:45' && !future);
      if (missed)
        c.push(
          offer4(
            'repair-' + r,
            `Acknowledge the missed call to ${names4[r]}`,
            'Apologize and request another time; no replacement is promised.',
            'consequences',
            (x) => {
              set4(x, 'cal-' + r, 'repair-requested');
              send4(
                x,
                r,
                'I missed the time we agreed. I am sorry. Please tell me if another time is possible.',
                'Delivered acknowledgment after the missed window',
              );
              note4(
                x,
                'repair-' + r,
                `${names4[r]} receives the acknowledgment. No replacement appointment is confirmed tonight.`,
                'Actual reply',
              );
              return [q(names4[r], 'I received that. I cannot give you another slot tonight.')];
            },
          ),
        );
      c.push(
        offer4(
          'resolve-' + r,
          future ? `Cancel ${names4[r]} before 18:45` : `Close the ${names4[r]} scheduling thread`,
          future
            ? 'Send a timely cancellation.'
            : 'Preserve the actual status; no fabricated explanation is sent.',
          'consequences',
          (x) => {
            set4(
              x,
              'cal-' + r,
              future
                ? 'cancelled'
                : missed
                  ? 'missed'
                  : ['cancelled', 'excused', 'unavailable'].includes(status)
                    ? 'released'
                    : 'unconfirmed',
            );
            if (future)
              send4(
                x,
                r,
                'I cancel our 18:45 call before its start.',
                'Timely explicit cancellation',
              );
            note4(
              x,
              'calendar-' + r,
              future
                ? `${names4[r]}’s later appointment was cancelled before it began.`
                : missed
                  ? `${names4[r]}’s confirmed call elapsed unanswered; that contact receives no explanation.`
                  : status === 'excused'
                    ? r === 'voss'
                      ? 'Voss already rejected the false medical-order claim. Evelynn sends no correction.'
                      : `${names4[r]} retains the delivered medical-excuse assertion; no correction was sent.`
                    : `${names4[r]}’s ${status} request does not create a new promise or a no-show.`,
              'Prior confirmation/cancellation and actual elapsed time',
            );
            return [
              p(
                future
                  ? 'The cancellation is acknowledged.'
                  : missed
                    ? 'The missed window remains in the thread. You send nothing.'
                    : 'You close the thread without adding a message.',
              ),
            ];
          },
        ),
      );
    }
    if (calendarInvites(s).every((r) => get4(s, 'cal-' + r)))
      c.push(
        offer4(
          'next-day',
          'Return home, then visit the records desk tomorrow',
          'Close the evening’s threads and plan tomorrow’s first stop.',
          'resource',
          (x) => {
            set4(x, 'clock', '1995');
            return [
              p(
                'You put the resolved threads aside. The route home is familiar; tomorrow’s address is written on a separate piece of paper.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'resource') {
    if (old(s, 'paid') === '600' && !get4(s, 'redeemed'))
      c.push(
        offer4(
          'redeem',
          'Redeem the earned $600 voucher',
          'Make a round trip to Helix accounts, then return here before ten.',
          'resource',
          (x) => {
            set4(x, 'redeemed');
            set4(x, 'clock', '2030');
            set4(x, 'income', '600');
            asset4(
              x,
              'income-old',
              'Helix accounts redeems the previously earned $600 voucher and issues a cash receipt. The voucher is marked redeemed; no further obligation.',
              'Accounts receipt, next morning',
            );
            return [
              p(
                'You leave the reading room for Helix accounts. The clerk checks the voucher, marks it redeemed and counts out the money. By 09:50 you are back at the municipal desk with the receipt in your folder.',
              ),
            ];
          },
        ),
      );
    c.push(
      offer4(
        'reader-pass',
        'Obtain the free independent reader pass',
        'Free registration. Public documents and ordinary copies only; visits are logged.',
        'assignment',
        (x) => {
          set4(x, 'reader-pass');
          asset4(
            x,
            'reader-pass',
            'Municipal reader pass: reading desk during public hours, public-file copies retained by Evelynn; free, nonexclusive, no future work owed. Registration is logged.',
            'Posted municipal desk terms and issued pass',
          );
          return [
            q(
              'Records clerk',
              'The pass is yours. The desk closes at five. You may retain public copies; restricted attachments remain restricted.',
            ),
            p('The clerk slides the pass across. You sign it and put it in your wallet.'),
          ];
        },
      ),
    );
  }
  return c;
}
