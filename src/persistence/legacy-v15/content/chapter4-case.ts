import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import {
  type C4Scene,
  type C4Choice,
  get4,
  set4,
  old,
  offer4,
  note4,
  read4,
  send4,
  asset4,
} from './chapter4-model';
export const caseScenes4: Record<string, C4Scene> = {
  assignment: {
    title: 'The disclosure problem',
    place: '10:00 · The brief and the public file',
    blocks: [
      p(
        'You find PA-17 in the municipal index: a warehouse acquisition dispute. The filed complaint says a confidential price ceiling reached an outside print supplier in an exported meeting pack during the earlier negotiations. Three desks handled the material: finance, negotiations and vendor coordination.',
      ),
      p(
        'The public bundle lists the documents you can request. Redaction bars cover figures and names. Helix’s internal receipts require a separate review agreement.',
      ),
    ],
  },
  room: {
    title: 'Work the room',
    place: '10:30 · Authorized review session',
    blocks: [
      p(
        'This time, your name belongs on the request. You put the access sheet on the desk and ask for the index.',
      ),
      p(
        'The review window closes at half past eleven. There is time for three inquiries. You draw three small boxes on the scratch paper.',
      ),
    ],
  },
  assessment: {
    title: 'What the records support',
    place: '11:30 · Review desk',
    blocks: [
      p(
        'You arrange the pages under three headings: what left, how it travelled, who meant it to happen. The last heading has the most white space.',
      ),
    ],
  },
  interest: {
    title: 'Personal interest',
    place: '12:00 · After the report',
    blocks: [
      p(
        'The report is finished. You close the working file and take a moment before speaking again.',
      ),
    ],
  },
  outside: {
    title: 'Outside the office',
    place: '12:15 · Lunch interval',
    blocks: [p('You let the formal review end before beginning another conversation.')],
  },
};
export const helix4 = (s: GameState) => get4(s, 'client') === 'helix';
export const caseChecks4 = [
  {
    id: 'observe',
    label: 'Check the earlier meeting’s arrival log',
    text: 'The finance participant left the room before the print envelope was collected. The coordinator remained. Leaving first establishes an opportunity difference, not who sent a file.',
    source: 'Observed sequence in the filed meeting log',
  },
  {
    id: 'receipt',
    label: 'Inspect the certified delivery receipt',
    text: 'On the negotiation day, the print supplier received one exported meeting pack at 09:42. Its manifest includes the price-ceiling annex. The destination was an external print-service queue, not a rival bidder.',
    source: 'Authenticated delivery manifest; certified filed extract on the public route',
  },
  {
    id: 'template',
    label: 'Inspect the export template',
    text: 'The approved excerpt was exported with a template whose hidden attachment list still included the confidential price-ceiling annex. The visible cover sheet alone did not show that attachment.',
    source: 'Versioned template and attachment list; redacted certified copy on public route',
  },
  {
    id: 'witness',
    label: 'Question the print-service witness',
    text: 'The witness says they printed the received pack and placed it in the pickup tray. They deny forwarding it to a bidder. Their statement is attributed and does not authenticate every later copy.',
    source: 'Witness answer, or signed witness answer in the public filed bundle',
  },
  {
    id: 'restricted',
    label: 'Request the restricted negotiation annex',
    text: 'The custodian refuses access outside the current review scope. You obtain an access-denial receipt, not the contents or a secret copy.',
    source: 'Custodian’s explicit scope decision',
  },
] as const;
export const supported4 = (s: GameState) =>
  !!get4(s, 'check-receipt') && !!get4(s, 'check-template');
export function caseBlocks4(s: GameState): Block[] {
  if (s.phase === 'room')
    return [
      ...(get4(s, 'client') === 'sender'
        ? [
            p(
              'The sender gave you a number. The municipal index, rather than another message from that thread, will tell you whether it leads anywhere.',
            ),
          ]
        : get4(s, 'client') === 'voss'
          ? [
              p(
                'You leave Voss’s qualification in your own folder. You are here to compare how a routing mistake changes what a record appears to authorize.',
              ),
            ]
          : get4(s, 'client') === 'maya'
            ? [
                p(
                  'You mark the passages you want to ask Maya about. Her few minutes are for the public file, not another search through her work systems.',
                ),
              ]
            : get4(s, 'client') === 'independent'
              ? [
                  p(
                    'Nobody has commissioned this report. You chose the file and will decide what to do with your copy.',
                  ),
                ]
              : []),
      p(
        helix4(s)
          ? 'At Helix, the coordinator checks your signature and brings the permitted bundle. A tab marked NEGOTIATION ANNEX stays in the locked tray.'
          : 'At the municipal desk, the clerk stamps your request and brings the filed extracts. The witness’s signed answer is clipped to the index.',
      ),
    ];
  if (s.phase === 'outside')
    return [
      p(
        helix4(s)
          ? 'With the payment receipt in your folder, you walk with Julian to the hotel café beside Helix. He waits while you choose a table. The office line stays in his pocket.'
          : 'You step away for a sandwich, then return to the counter. The clerk sets the copy-request form beside your pass.',
      ),
    ];
  return [];
}
export function caseChoices4(s: GameState): C4Choice[] {
  const c: C4Choice[] = [];
  if (s.phase === 'assignment') {
    if (get4(s, 'julian-kept') && old(s, 'helix-window') === 'offered')
      c.push(
        offer4(
          'accept-audit',
          'Accept Julian’s $900 process audit',
          'Fixed fee for a completed bounded report. No required culprit, exclusivity, publicity or personal obligation.',
          'room',
          (x) => {
            set4(x, 'client', 'helix');
            note4(
              x,
              'audit-terms',
              '$900 for a completed acquisition-disclosure process report, regardless of finding. Read-only review authority excludes the restricted negotiation annex. No Axiom files, exclusivity, publicity or personal obligation.',
              'Written Helix terms explicitly accepted',
            );
            send4(
              x,
              'julian-mercer',
              'I accept the bounded process audit on those written terms.',
              'Delivered professional acceptance',
            );
            return [
              q(
                'Julian Mercer',
                'Do not give me a convenient name. Give me something I can act on.',
              ),
              p(
                'The office issues temporary review access. You travel to Helix and sign for the permitted materials.',
              ),
            ];
          },
        ),
      );
    for (const [id, label] of [
      ['independent', 'Review the public file independently'],
      ...(get4(s, 'sloane-brief')
        ? [['sloane', 'Accept Sloane’s public-source task voluntarily']]
        : []),
      ...(get4(s, 'sender-tip')
        ? [['sender', 'Verify the sender’s docket through public records']]
        : []),
      ...(get4(s, 'voss-support')
        ? [['voss', 'Compare routing scope with Voss’s qualification']]
        : []),
      ...(get4(s, 'maya-kept') ? [['maya', 'Use Maya’s offered public-file interpretation']] : []),
    ])
      c.push(
        offer4(
          'public-' + id,
          label,
          'Inspect the filed public extracts. Restricted Helix material stays outside this request.',
          'room',
          (x) => {
            set4(x, 'client', id);
            if (get4(x, 'julian-kept'))
              send4(
                x,
                'julian-mercer',
                'I am not taking the audit. I will work from the public file.',
                'Explicit refusal of the new audit when selecting the public route',
              );
            note4(
              x,
              'public-scope',
              'Public docket PA-17 is confirmed in the municipal index. Evelynn may inspect filed extracts, not private Helix attachments. No unpaid work for Helix is accepted.',
              'Public index and reading-desk permission',
            );
            if (id === 'sloane')
              send4(
                x,
                'sloane',
                'I accept only the public-source PA-17 review; no private data acquisition.',
                'Voluntary bounded acceptance',
              );
            if (id === 'maya')
              send4(
                x,
                'maya',
                'Please discuss the wording of public docket PA-17 with me. No private employer files.',
                'Explicit bounded request',
              );
            return [
              q(
                'Records clerk',
                'PA-17. Here is the index. Anything sealed is marked; I cannot release those attachments.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'room') {
    if (Number(get4(s, 'checks') ?? 0) < 3)
      for (const check of caseChecks4)
        if (!get4(s, 'check-' + check.id))
          c.push(
            offer4(
              'inspect-' + check.id,
              check.id === 'witness' && !helix4(s) ? 'Read the filed witness answer' : check.label,
              'Uses one of three inquiry opportunities.',
              'room',
              (x) => {
                set4(x, 'check-' + check.id);
                set4(x, 'checks', String(Number(get4(x, 'checks') ?? 0) + 1));
                note4(
                  x,
                  'case-' + check.id,
                  check.text,
                  check.id === 'witness'
                    ? helix4(x)
                      ? 'Witness answers the review call'
                      : 'Signed witness statement in the filed public bundle'
                    : check.source,
                  check.id === 'witness' ? 'claim' : 'fact',
                );
                return [
                  q(
                    check.id === 'witness'
                      ? helix4(x)
                        ? 'Print-service witness'
                        : 'Filed witness statement'
                      : 'Record',
                    check.text,
                  ),
                ];
              },
            ),
          );
    if (!get4(s, 'concealed'))
      c.push(
        offer4(
          'conceal',
          'Keep your working suspicion private',
          'No name or theory is sent to the room.',
          'room',
          (x) => {
            set4(x, 'concealed');
            return [
              p('You turn the scratch page toward yourself. The name at the top stays there.'),
            ];
          },
        ),
      );
    c.push(
      offer4(
        'assess',
        'Close the inquiries and write your assessment',
        'Unused inquiries are forgone; evidence is not invented.',
        'assessment',
      ),
    );
  }
  if (s.phase === 'assessment')
    for (const [id, label] of [
      ['process', 'Report a process-disclosure finding with intent unresolved'],
      ['accuse', 'Accuse the finance participant of a deliberate leak'],
      ['uncertain', 'Report an unresolved source with specific limits'],
    ] as const)
      c.push(
        offer4(
          'report-' + id,
          label,
          id === 'accuse'
            ? 'Commit the accusation; being confident does not supply missing proof.'
            : 'Submit only the checks you actually obtained.',
          'interest',
          (x) => {
            set4(x, 'assessment', id);
            const grounded = id === 'process' && supported4(x);
            set4(
              x,
              'finding',
              grounded ? 'bounded' : id === 'uncertain' ? 'unresolved' : 'challenged',
            );
            const text = grounded
              ? 'Receipt and template support over-distribution through an export attachment list. Deliberate intent and downstream copies remain unproved.'
              : id === 'uncertain'
                ? 'Available checks do not establish a deliberate source. Preserve the records and inspect missing links before naming a person.'
                : id === 'accuse'
                  ? 'Evelynn accuses the finance participant of a deliberate disclosure; her obtained records do not prove that intent.'
                  : 'Evelynn proposes an export-template cause without obtaining both the receipt and template; it remains a hypothesis.';
            note4(x, 'assessment', text, 'Evelynn’s submitted assessment', 'claim');
            send4(
              x,
              helix4(x)
                ? 'julian-mercer'
                : get4(x, 'client') === 'sloane'
                  ? 'sloane'
                  : 'records-desk',
              text,
              'Submitted report, obtained extracts only',
            );
            asset4(
              x,
              'case-packet',
              'Evelynn retains a permitted copy of her submitted assessment and the extracts actually inspected. Restricted attachments are excluded.',
              'Review custodian’s explicit retention permission',
            );
            const blocks: Block[] = [
              q(
                helix4(x)
                  ? 'Julian Mercer'
                  : get4(x, 'client') === 'sloane'
                    ? 'Sloane · reply'
                    : 'Review clerk',
                grounded
                  ? 'The export list explains how it reached the printer. Keep the question of intent open.'
                  : id === 'uncertain'
                    ? 'You have marked the gaps. Leave them visible in the final copy.'
                    : 'You have gone further than these pages support. I want a second review before anyone acts on that conclusion.',
              ),
            ];
            if (!grounded && id !== 'uncertain') {
              set4(x, 'recommendation', 'review-required');
              note4(
                x,
                'challenge',
                'The report recipient requires independent review before acting on the accusation or unsupported causal claim. No person is disciplined by this report alone.',
                'Authored evidentiary challenge',
              );
            }
            if (helix4(x)) {
              set4(x, 'audit-paid', '900');
              set4(x, 'income', String(Number(get4(x, 'income') ?? 0) + 900));
              asset4(
                x,
                'audit-income',
                'The completed fixed-fee report earns $900; Helix accounts pays it and issues a receipt. Later social or intimate refusal cannot reverse it.',
                'Settled professional payment and receipt',
              );
              blocks.push(
                p(
                  'At the accounts desk, you check the amount before folding the receipt into your file.',
                ),
              );
            }
            return blocks;
          },
        ),
      );
  if (s.phase === 'interest') {
    for (const [id, label] of [
      ['professional', 'Keep your interest professional'],
      ['curious', 'Acknowledge personal curiosity without promising more'],
      ['distant', 'Prefer distance'],
    ] as const)
      c.push(
        offer4(
          'interest-' + id,
          label,
          'This sets your stated focus, not another person’s feelings or your consent.',
          'outside',
          (x) => {
            set4(x, 'interest', id);
            return [
              p(
                id === 'curious'
                  ? !helix4(x)
                    ? 'You wonder how many disputes the clerk has watched turn into another numbered folder.'
                    : 'You find yourself wondering what he is like when the office stops calling.'
                  : id === 'distant'
                    ? 'You finish the note before looking up. A little distance would suit you.'
                    : 'You put the report and receipt together. The work is the part you mean to carry forward.',
              ),
            ];
          },
        ),
      );
    if (helix4(s))
      c.push(
        offer4(
          'interest-attraction',
          'Acknowledge attraction to Julian',
          'Your attraction only. Affection, trust, desire, willingness and consent remain separate.',
          'outside',
          (x) => {
            set4(x, 'attraction', 'established');
            set4(x, 'interest', 'attraction');
            note4(
              x,
              'private-attraction',
              'The player acknowledges attraction to Julian. It is private; no permission or reciprocal feeling follows.',
              'Explicit player choice',
            );
            return [
              p(
                'You catch yourself watching his face after he has finished speaking. For the moment, you keep that to yourself.',
              ),
            ];
          },
        ),
      );
  }
  if (s.phase === 'outside') {
    if (helix4(s))
      for (const [id, label, line, response] of [
        [
          'professional',
          'Discuss the work only',
          'I want to keep this about the review.',
          'Of course. Where would you look next?',
        ],
        [
          'curious',
          'Ask what he enjoys outside work',
          'What do you choose when nobody needs a decision from you?',
          'A long walk without the office line. I do not always manage it.',
        ],
        [
          'challenge',
          'Challenge his idea of independence',
          'I have a public reader pass of my own. If your office supplies everything else, how independent is that?',
          'Less than having several clients. Keep the pass.',
        ],
        [
          'friendly',
          'Enjoy an ordinary conversation',
          'For a few minutes, can we talk without turning it into a proposal?',
          'Gladly. I have been in meetings since eight. Even I am tired of proposals.',
        ],
        [
          'guarded',
          'Keep your private history private',
          'I do not want to discuss my private history.',
          'You do not owe it to me.',
        ],
        [
          'instrumental',
          'Study how to turn his interest into access',
          'What would make another professional introduction worth your time?',
          'A precise scope and a reason the other person benefits. My interest is not a guarantee on their behalf.',
        ],
      ])
        c.push(
          offer4(
            'outside-' + id,
            label,
            'Say this in the café. Your private thoughts stay private.',
            'favor',
            (x) => {
              set4(x, 'approach', id);
              send4(x, 'julian-mercer', line, 'Spoken café exchange');
              return [q('You', line), q('Julian Mercer', response)];
            },
          ),
        );
    if (helix4(s) && get4(s, 'attraction') === 'established')
      c.push(
        offer4(
          'outside-flirt',
          'Express attraction and ask whether it is mutual',
          'No physical or sexual permission. The work is already paid.',
          'favor',
          (x) => {
            set4(x, 'approach', 'flirt');
            set4(x, 'mutual-interest');
            send4(
              x,
              'julian-mercer',
              'I am attracted to you. Is this personal interest mutual?',
              'Explicit spoken question, outside paid work',
            );
            note4(
              x,
              'julian-interest',
              'Julian says he is attracted and would welcome personal time if Evelynn wants it. No physical or sexual scope is authorized.',
              'Julian’s explicit conditional reply',
            );
            return [
              q('You', 'I am attracted to you. Is this personal interest mutual?'),
              q('Julian Mercer', 'Yes. I would like to see you after work, if you want that too.'),
            ];
          },
        ),
      );
    if (!helix4(s)) {
      c.push(
        offer4(
          'outside-desk',
          'Discuss an independent copy and workspace',
          'Ask the clerk about access you can retain without an employer.',
          'favor',
          (x) => {
            set4(x, 'approach', 'independent');
            return [
              q(
                'You',
                'Can I keep the copies here until I am done? I need somewhere to spread them out.',
              ),
              q(
                'Records clerk',
                'The permitted copies are yours. I can find you a desk for the afternoon.',
              ),
            ];
          },
        ),
      );
      if (get4(s, 'maya-kept'))
        c.push(
          offer4(
            'outside-maya',
            'Have the offered bounded conversation with Maya',
            'Public file only; no automatic affection, trust or intimacy.',
            'favor',
            (x) => {
              send4(
                x,
                'maya',
                'The public bundle separates a delivery receipt from a finding of deliberate intent. I would like your view on that distinction.',
                'Delivered public-file question',
              );
              note4(
                x,
                'maya-answer',
                'Maya says delivery alone does not prove intent and suggests keeping exact scope qualifications.',
                'Maya’s bounded compliance opinion',
                'claim',
              );
              return [
                q(
                  'Maya',
                  'Put the limit on the first page. I have seen people forward a conclusion and lose every qualification underneath it.',
                ),
                p('You thank her, end the call and return to the counter.'),
              ];
            },
          ),
        );
    }
  }
  return c;
}
