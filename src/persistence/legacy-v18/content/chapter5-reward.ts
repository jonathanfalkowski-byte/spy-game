import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import {
  type C5Scene,
  type C5Choice,
  get5,
  set5,
  get4,
  old,
  oldRecord,
  offer5,
  note5,
  send5,
  cash5,
  voucher5,
  money5,
} from './chapter5-model';
export const rewardScenes5: Record<string, C5Scene> = {
  home: {
    title: 'What you brought home',
    place: '10:30 · Collection day · Adrian’s apartment',
    blocks: [
      p(
        'You take the permitted packet home from the records desk. The chair is still angled toward the window. Before unpacking, you change into the plain charcoal knee-length dress and black low heels from the delivered wardrobe. You leave off jewellery and hang the clothes you came home in. Adrian’s old jacket remains on its hanger inside the wardrobe. Then you clear enough space on the table to open your bag.',
      ),
      p(
        'The reader card goes beside the packet. You can leave them there for a moment. Nobody is waiting for a report this morning.',
      ),
    ],
  },
  spend: {
    title: 'Spend it',
    place: '11:30–13:00 · Shopping street',
    blocks: [
      p(
        'You walk to the shopping street and slow at a window you usually pass. Inside, a soft blouse hangs beside a display of silver hair clasps. The prices are written where you can see them.',
      ),
      p(
        'A phone shop, a tailor and a restaurant are on the same street. You have time for one purchase—or none.',
      ),
    ],
  },
  echo: {
    title: 'The echo',
    place: '14:00 · Apartment correspondence',
    blocks: [
      p(
        'The municipal reader bulletin includes a Harbour Arts preview and an open call from Aster Review for portraits of people at work. The examples are handsome: a ceramicist, a translator, a woman who repairs old clocks.',
      ),
      p(
        'The editor’s address is printed underneath. You could make yourself known, or simply read the listing.',
      ),
    ],
  },
  invitation: {
    title: 'An invitation that is not a mission',
    place: '15:00 · An invitation for tomorrow',
    blocks: [
      q(
        'Harbour Arts invitation',
        'Tomorrow, six thirty. A preview, a short performance and supper. Courtesy admission; photography is by separate agreement. Come for the evening, not for a presentation.',
      ),
      p(
        'The reply form asks for a name, not an employer. Beside it is a quieter option: the free reading salon at three. You can decline the preview without losing the afternoon.',
      ),
    ],
  },
};
export function rewardBlocks5(s: GameState): Block[] {
  if (s.phase === 'home')
    return [
      p(
        cash5(s) > 0
          ? `You put the settled receipts in order: $${cash5(s)} is yours to use.`
          : 'The packet and pass are yours. There is no new cash receipt to lay beside them.',
      ),
      ...(voucher5(s)
        ? [p('The unredeemed $600 Helix voucher is still in the pocket of the folder.')]
        : []),
      ...(get4(s, 'favor') === 'accept'
        ? [
            p(
              'Yesterday’s temporary workspace slip has expired. You file it behind the permanent reader pass.',
            ),
          ]
        : []),
    ];
  if (s.phase === 'spend') return [p(`Available settled money: $${cash5(s)}.`)];
  return [];
}
export const uncorrectedExcuse5 = (s: GameState, who: string) =>
  old(s, 'cal-' + who) === 'excused' && get4(s, 'cal-' + who) !== 'corrected';

export function rewardChoices5(s: GameState): C5Choice[] {
  const c: C5Choice[] = [];
  if (s.phase === 'home') {
    for (const [id, label] of [
      ['packet', 'Open the packet'],
      ['messages', 'Read the waiting threads'],
      ['receipts', 'Sort the receipts'],
    ] as const)
      if (!get5(s, 'inspect-' + id))
        c.push(
          offer5(
            'inspect-' + id,
            label,
            'Look at what actually came home. No message is sent.',
            'home',
            (x) => {
              set5(x, 'inspect-' + id);
              if (id === 'packet')
                return [
                  p(
                    'The permitted public copies are together. Your assessment is clipped to the extracts you actually inspected.',
                  ),
                  p(
                    get4(x, 'method') === 'exploit'
                      ? 'The disputed extra routing copy stays apart from the certified packet. The denial of approval is still attached.'
                      : 'You leave the source labels with the pages. A page will be easier to find this way.',
                  ),
                ];
              if (id === 'receipts')
                return [
                  p(
                    voucher5(x)
                      ? 'The voucher has an amount and an accounts address, but no redemption stamp.'
                      : cash5(x) > 0
                        ? 'You check the settled receipt against the amount you have available.'
                        : 'The reader card has no cash value. There is no payment receipt in the folder.',
                  ),
                  p(
                    'A purchase would be yours to choose. The reader pass can stay in the folder either way.',
                  ),
                ];
              const out = [p('You scroll past the calendar threads before opening a new message.')];
              for (const who of ['maya', 'sloane', 'voss', 'rook', 'julian-mercer'])
                if (
                  uncorrectedExcuse5(x, who) || ['repair-requested', 'missed'].includes(
                    get4(x, 'cal-' + who) ?? '',
                  )
                )
                  out.push(
                    p(
                      uncorrectedExcuse5(x, who)
                        ? who === 'voss' ? 'Voss rejected the false medical-order claim. Your correction is still unsent.' : `The ${who === 'rook' ? 'unknown sender' : who === 'julian-mercer' ? 'Julian' : who} thread still contains your medical excuse. You have not corrected it.`
                        : `The ${who === 'rook' ? 'unknown sender' : who === 'julian-mercer' ? 'Julian' : who} thread still has an unresolved missed-call exchange. No replacement time has been agreed.`,
                    ),
                  );
              if (old(x, 'qualification') === 'formal')
                out.push(
                  p(
                    'Voss’s signed qualification is saved. The scope-review request still has no determination.',
                  ),
                );
              if (get4(x, 'intimacy') === 'withdrawn')
                out.push(
                  p('Julian acknowledged your change of mind. You left before anything happened.'),
                );
              else if (
                [
                  'voluntary-encounter',
                  'instrumental-encounter',
                  'mixed-encounter',
                  'physical-without-sex',
                ].includes(get4(x, 'intimacy') ?? '')
              )
                out.push(
                  p('You remember saying goodnight. There was no arrangement for another evening.'),
                );
              if (old(x, 'memo') === 'pressure')
                out.push(
                  p(
                    'The withdrawn Helix follow-up remains withdrawn. The paid voucher was never part of that argument.',
                  ),
                );
              return out;
            },
          ),
        );
    c.push(
      offer5(
        'go-spend',
        'Take the rest of the morning for yourself',
        'Leave the private records at home.',
        'spend',
        (x) => {
          set5(x, 'cash', String(cash5(x)));
          if (voucher5(x)) set5(x, 'voucher-location', 'bag');
          return [
            p(
              voucher5(x)
                ? 'You take the unredeemed voucher out of the folder and put it in your bag with the Axiom phone. You close the folder, leaving the private records and reader pass at home, and go out.'
                : 'You close the folder, leaving the private records and reader pass at home. You take your bag and Axiom phone and go out.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'spend') {
    if (voucher5(s))
      c.push(
        offer5(
          'redeem-voucher',
          'Collect the outstanding $600 voucher',
          'Visit Helix accounts before returning to the shops. One redemption only.',
          'spend',
          (x) => {
            set5(x, 'voucher-redeemed');
            set5(x, 'voucher-location', 'accounts-retained');
            money5(
              x,
              'voucher',
              600,
              'Original earned Chapter 3 fee; Helix accounts marks voucher redeemed now',
            );
            return [
              p(
                'You leave the shops for Helix accounts and take the voucher from your bag at the counter. The clerk stamps and retains it, then hands you $600 and a redemption receipt. Back on the shopping street, you put the receipt in your bag.',
              ),
            ];
          },
        ),
      );
    for (const [id, label, cost, item] of [
      ['phone', 'Buy a personal phone and prepaid month', 120, 'personal phone'],
      ['wardrobe', 'Buy the blouse you stopped to look at', 80, 'soft blouse'],
      ['accessory', 'Buy the silver clasp', 45, 'silver hair clasp'],
      ['dinner', 'Have a good lunch on your own', 60, 'restaurant lunch'],
    ] as const)
      if (cash5(s) >= cost)
        c.push(
          offer5(
            'buy-' + id,
            `${label} · $${cost}`,
            'One purchase, paid from settled money. No automatic renewal.',
            'echo',
            (x) => {
              money5(x, id, -cost, 'Retail purchase paid personally');
              set5(x, 'purchase', id);
              if (id === 'phone') set5(x, 'personal-location', 'boxed-home');
              if (voucher5(x)) set5(x, 'voucher-location', 'folder-home');
              note5(
                x,
                'purchase',
                `Owner: Evelynn. Item: ${item}. Provider: local ${id === 'phone' ? 'phone shop' : id === 'dinner' ? 'restaurant' : 'retailer'}. Cost: $${cost}. Recurring charge: none. ${id === 'phone' ? 'Service prepaid for thirty days; renewing later would cost $20. A separate device does not change Axiom housing/device monitoring.' : ''}`,
                'Item and receipt handed to Evelynn',
              );
              return [
                p(
                  id === 'phone'
                    ? 'You choose a number, decline automatic renewal and put the small box in your own bag.'
                    : id === 'wardrobe'
                      ? 'You hold the blouse against yourself to check the sleeve length, then buy it on its paper-covered hanger.'
                      : id === 'accessory'
                        ? 'The silver hair clasp has a pleasing weight. You test its fastening in your palm, then ask for the box.'
                        : 'You have the good table at lunch. The food arrives slowly enough that you stop checking the time.',
                ),
                p(
                  id === 'dinner'
                    ? 'At home by two, you put the lunch receipt on the table. Any unredeemed voucher goes back into the folder.'
                    : 'At home by two, you put your purchase and receipt on the table. Any unredeemed voucher goes back into the folder.',
                ),
              ];
            },
          ),
        );
    for (const [id, label] of [
      ['save', cash5(s) > 0 ? 'Set the money aside' : 'Keep the budget unchanged; buy nothing'],
      ['nothing', 'Buy nothing today'],
    ] as const)
      c.push(
        offer5(
          'spend-' + id,
          label,
          'Keep every available dollar and the independent reader pass.',
          'echo',
          (x) => {
            set5(x, 'purchase', id);
            if (voucher5(x)) set5(x, 'voucher-location', 'folder-home');
            return [
              p(
                'You leave the window and walk home. By two, your bag is back on the table; any unredeemed voucher goes into the folder again.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'echo') {
    if (oldRecord(s, 'public-association'))
      c.push(
        offer5(
          'echo-link',
          'Send the editor your existing Helix event link',
          'Only that public caption and image; no case packet or private identity.',
          'invitation',
          (x) => {
            set5(x, 'echo', 'public-link');
            send5(
              x,
              'aster',
              oldRecord(x, 'public-association')!.text,
              'Evelynn sends actual existing event-page link; editor opens it',
            );
            note5(
              x,
              'editor-discovery',
              'Aster editor sees the existing Helix event caption and image. No private work or Axiom file is delivered.',
              'Actual opened link',
            );
            return [
              q(
                'Aster editor',
                'You look at home in a room. Would you consider something quieter—a portrait with a conversation attached? Harbour has a preview tomorrow. I can put your chosen name at the desk.',
              ),
            ];
          },
        ),
      );
    c.push(
      offer5(
        'echo-intro',
        'Write a short professional introduction',
        'Send: “I completed a bounded records review. I would like your editorial brief. No case files are attached.”',
        'invitation',
        (x) => {
          set5(x, 'echo', 'introduction');
          send5(
            x,
            'aster',
            'I completed a bounded records review. I would like your editorial brief. No case files are attached.',
            'Explicit introduction to published editorial address',
          );
          return [
            q(
              'Aster editor',
              'Send me how you would like to be named. I am interested in the person doing the work, not a confidential file. You would be welcome at tomorrow’s preview.',
            ),
          ];
        },
      ),
    );
    c.push(
      offer5(
        'echo-listing',
        'Read the public invitation without contacting anyone',
        'No recipient learns that you looked.',
        'invitation',
        (x) => {
          set5(x, 'echo', 'listing');
          return [
            p(
              'You save the public programme. The invitation is open to readers; no personal referral is required.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'invitation')
    for (const [id, label] of [
      ['attend', 'Accept the preview because you want to go'],
      ['decline', 'Decline the preview; choose the free reading salon'],
    ] as const)
      c.push(
        offer5(
          'invitation-' + id,
          label,
          'No intelligence objective or automatic image permission.',
          'presentation',
          (x) => {
            set5(x, 'event', id);
            set5(x, 'axiom-location', 'dresser');
            send5(
              x,
              'harbour',
              id === 'attend'
                ? 'Please register Evelynn Vale for tomorrow’s 18:30 preview. No photograph permission is included.'
                : 'I decline the preview. Please reserve a place at the free 15:00 reading salon as Evelynn Vale.',
              'Explicit voluntary event registration',
            );
            return [
              p(
                id === 'attend'
                  ? 'The confirmation comes with a supper menu. You read it before putting tomorrow’s time in the calendar.'
                  : 'The salon confirmation lists a table near the courtyard. You keep the afternoon; the evening is free.',
              ),
            ];
          },
        ),
      );
  return c;
}
