import { wardrobe5 } from './chapter5-continuity';
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import {
  type C5Scene,
  type C5Choice,
  get5,
  set5,
  offer5,
  note5,
  send5,
  julian5,
  money5,
} from './chapter5-model';
export const publicScenes5: Record<string, C5Scene> = {
  presentation: {
    title: 'Dress for yourself',
    place: 'The following day · Apartment',
    blocks: [
      p(
        'You set the Axiom phone on the dresser with the invitation open. For once there is no equipment list beneath it. You are wearing the plain charcoal dress and black low heels again. The delivered wardrobe holds your tailored suit and evening gown; any new purchase stays on the table. You will leave jewellery off today.',
      ),
      p(
        'You can make an entrance, keep things spare, or enjoy putting the look together without deciding what the evening should become.',
      ),
    ],
  },
  room: {
    title: 'The room wants Evelynn',
    place: 'Harbour Arts · Your chosen visit',
    blocks: [p('You have made time for this visit. There is no report to bring back.')],
  },
  offer: {
    title: 'The public offer',
    place: 'Next morning · 10:00 · Aster correspondence',
    blocks: [
      p(
        'At home the next morning, you dress in yesterday’s selected outfit again, with the same shoes and no added jewellery, then open the brief you requested—or the same public call you saved. Aster wants one conversation and a considered portrait for its next digital issue. It is paid work, with a proof you can refuse to release.',
      ),
      q(
        'Aster brief',
        'A professional profile pays four hundred. A fashion-led piece pays six; a deliberately sensual, fully clothed portrait pays eight. We can also pay one hundred for a private research sitting with no publication. Choose what you would actually enjoy making.',
      ),
      p(
        'The standard license covers one issue for thirty days. It excludes advertising, syndication, reuse and your private history. The editor has left the name and image boxes for you.',
      ),
    ],
  },
  proof: {
    title: 'The proof is yours to release',
    place: '13:30 · Aster studio · Proof table',
    blocks: [
      p(
        'You finish the agreed sitting and review the proof at a small table away from the camera. The editor sets a pencil beside it. The publish button is still untouched.',
      ),
    ],
  },
};
export const asterConcepts = ['professional', 'glamorous', 'provocative', 'private'] as const;
export const proposal5 = (s: GameState, concept: string): GameState => ({...s, choices: {...s.choices, 'c5.concept': concept}});
export const concept5 = (s: GameState) => get5(s, 'concept') ?? 'professional';
export const fee5 = (s: GameState) =>
  (({ professional: 400, glamorous: 600, provocative: 800, private: 100 })[concept5(s)] ?? 400) +
  (get5(s, 'fee-raised') && concept5(s) !== 'private' ? 100 : 0);
export const publicName5 = (s: GameState) =>
  get5(s, 'name-use') === 'initials' ? 'E. Vale' : 'Evelynn Vale';
export const caption5 = (s: GameState) =>
  `${publicName5(s)} — ${concept5(s) === 'professional' ? 'a conversation about making room for considered work' : concept5(s) === 'glamorous' ? 'an afternoon in personal style' : get5(s, 'image-use') === 'none' ? 'a conversation about choosing a bolder public style' : 'a deliberately sensual portrait, fully clothed'}. No employer endorsement.`;
export const rights5 = (s: GameState) =>
  `Provider: Aster Review. Concept: ${concept5(s)}. Fee: $${fee5(s)} after ${concept5(s) === 'private' ? 'completed private sitting' : 'approved issue publication'}. Name: ${publicName5(s)}. Image: ${get5(s, 'image-use') === 'none' ? 'none; text only' : 'one reviewed fully clothed portrait'}. Use: ${concept5(s) === 'private' ? 'no publication' : 'one Aster digital issue for thirty days, subscribers and public issue readers; no ads, syndication, archive reuse or sublicensing'}. Creative control: Evelynn approves the final proof or withholds it. No Adrian binding, employer endorsement, exclusivity or future work.`;
export function publicBlocks5(s: GameState): Block[] {
  if (s.phase === 'presentation')
    return [
      p(
        get5(s, 'event') === 'attend'
          ? 'By five, you have time to dress for the half-past-six preview.'
          : 'After lunch, you get ready for the three-o’clock reading salon. The preview is still declined.',
      ),
    ];
  if (s.phase === 'room')
    return [
      p(
        get5(s, 'event') === 'attend'
          ? 'You leave home and arrive at Harbour for 18:30. The first notes of the rehearsal carry down the staircase; supper is already laid out.'
          : 'You leave home and walk to Harbour for 15:00. The free salon opens onto a courtyard. A few readers are discussing a photograph without agreeing what makes it good.',
      ),
      p(
        'Inside, the host checks your name at the programme table and gives you a programme with a guest card for tomorrow’s rooftop music hour. The editor waits at one end of the table. You have time for two short conversations or stops before leaving; each brings you back here.',
      ),
    ];
  if (s.phase === 'offer') return [{ kind: 'notice', text: rights5(s) }];
  if (s.phase === 'proof')
    return [
      p(
        concept5(s) === 'private'
          ? 'The private sitting is complete. Nothing has been prepared for a public issue.'
          : `The proof caption reads: “${caption5(s)}”`,
      ),
      p(
        get5(s, 'image-use') === 'none'
          ? 'The image area is empty, as requested.'
          : `The agreed ${concept5(s)} portrait shows you fully clothed in the presentation you selected. There is no undressing or intimate activity in the frame.`,
      ),
      { kind: 'notice', text: rights5(s) },
    ];
  return [];
}
export function publicChoices5(s: GameState): C5Choice[] {
  const c: C5Choice[] = [];
  if (s.phase === 'presentation')
    for (const [id, label, line] of [
      [
        'professional',
        'Elegant and professional',
        'You change into the charcoal tailored jacket, ivory blouse and matching trousers, keeping the black low heels. The other outfits stay in the wardrobe.',
      ],
      [
        'glamorous',
        'Glamorous; enjoy being visible',
        'You change into the black floor-length evening gown and wear the charcoal tailored jacket open over it, keeping the black low heels. You like the way the look holds together.',
      ],
      [
        'provocative',
        'Deliberately sensual, on your terms',
        'You change into the black floor-length evening gown, keeping the black low heels. You leave the tailored jacket in the wardrobe; the open back is part of the look you want.',
      ],
      [
        'minimal',
        'Minimal; leave the attention unplanned',
        'You keep the plain charcoal knee-length dress and black low heels. Nothing else needs adding.',
      ],
    ])
      c.push(
        offer5(
          'look-' + id,
          label,
          'Use owned clothes; this records presentation only, never sexual willingness.',
          'room',
          (x) => {
            set5(x, 'presentation', id);
            set5(x, 'axiom-location', 'carried');
            set5(x, 'wardrobe', wardrobe5[id as keyof typeof wardrobe5].id);
            set5(x, 'harbour-position', 'programme-table');
            set5(x, 'guest-card', 'bag');
            note5(
              x,
              'presentation',
              `Self-selected ${id} presentation using owned wardrobe. No image rights or personal permission.`,
              'Explicit appearance choice',
            );
            return [p(line), p('You take the Axiom phone and your bag before leaving.')];
          },
        ),
      );
  if (s.phase === 'room') {
    const left = 2 - Number(get5(s, 'attention') ?? 0);
    if (left > 0) {
      const opts: [string, string, string, (x: GameState) => Block[]][] = [
        [
          'network',
          'Introduce your professional work',
          'Share a bounded introduction, without case papers.',
          (x) => {
            set5(x, 'editor-contact');
            send5(
              x,
              'aster',
              'I completed a bounded records review and would like the editorial brief. I am not sharing client papers.',
              'Evelynn approaches the editor at Harbour',
            );
            return [
              p('At the end of the programme table, you introduce yourself to the editor.'),
              q(
                'Aster editor',
                'I was hoping to meet someone who did more than describe a job title. Write to me tomorrow. Bring your own idea.',
              ),
            ];
          },
        ],
        [
          'enjoy',
          'Enjoy being noticed',
          'No publication permission or personal promise.',
          (x) => {
            set5(x, 'enjoyed-attention');
            return [
              p(
                'Someone compliments the way you have put the look together. You let the compliment land before thanking them. You do not rush to explain it away.',
              ),
            ];
          },
        ],
        [
          'conversation',
          'Give one person your full attention',
          'An ordinary conversation; no promised work.',
          (x) => {
            set5(x, 'conversation');
            return [
              q('Harbour host', 'My favourite piece is the one almost everyone walks past.'),
              p(
                'You follow the host to the painting on the near wall. “Green,” you say. “Look at the reflection.” The host shakes their head. “That is the bank. The water is grey.” Neither of you concedes it. Ten minutes later you return to the programme table together.',
              ),
            ];
          },
        ],
        [
          'observe',
          'Take your time with the art',
          'No intelligence objective or secret evidence.',
          (x) => {
            set5(x, 'observed');
            return [
              p(
                'You leave the programme table to look at the works along the near wall. At one, you stay long enough for the room to go on without you, then return to the table.',
              ),
            ];
          },
        ],
        [
          'photo',
          'Agree to one programme-page photograph',
          'One reviewed image on Harbour’s page for thirty days; no reuse, ads or private identity.',
          (x) => {
            set5(x, 'event-photo');
            send5(
              x,
              'harbour',
              'I authorize this reviewed photograph, named Evelynn Vale, on this programme page for thirty days only. No further reuse.',
              'Explicit image and name scope after previewing camera frame',
            );
            note5(
              x,
              'event-artifact',
              'Harbour programme page publishes one approved photograph, named Evelynn Vale. Audience: programme visitors, thirty days; no ads or reuse.',
              'Harbour host shows the published programme page on the table tablet',
            );
            return [
              p(
                'The photographer joins you at the programme table, takes one frame with your permission, and turns the camera so you can review it. You approve that one. The photographer leaves; a moment later the host shows you the published programme page on the tablet at the table.',
              ),
            ];
          },
        ],
        [
          'status',
          'Use the introduction to ask for access',
          'Ask for the editor’s address; claim no Helix authority.',
          (x) => {
            set5(x, 'editor-contact');
            send5(
              x,
              'aster',
              'May I have your editorial address? I speak for myself, not Helix.',
              'Explicit request at programme table',
            );
            return [
              q(
                'Aster editor',
                'Of course. I can offer a brief, not a promised cover. Your idea still has to suit the issue.',
              ),
            ];
          },
        ],
      ];
      if (julian5(s))
        opts.push(
          [
            'coffee',
            'Ask Julian for ten minutes away from work',
            'Send your current location and request; no disclosure of private files.',
            (x) => {
              send5(
                x,
                'julian-mercer',
                'I am at Harbour Arts. Would you like ten minutes of coffee outside the entrance? No work proposal.',
                'Explicit new invitation by Evelynn',
              );
              set5(x, 'coffee');
              return [
                q('Julian · reply', 'I am nearby. Ten minutes would be welcome.'),
                p(
                  'You leave the programme table and wait outside the entrance with a coffee from the refreshment table. Julian arrives without an assistant. “Which piece?” he asks. You name a title from the programme. “That one deserves longer than the space they gave it.” He considers that. “Then I will start there.” Ten minutes pass. He says goodbye and leaves. You go back inside to the host at the programme table, still carrying your cup.',
                ),
              ];
            },
          ],
          [
            'flirt',
            'Tell Julian you would welcome personal time',
            'A new explicit expression and reciprocal reply. Conversation is not physical consent.',
            (x) => {
              send5(
                x,
                'julian-mercer',
                'I would welcome personal time with you. Is that interest mutual?',
                'Player-initiated new message, separate from work',
              );
              set5(x, 'mutual-interest');
              set5(x, 'attraction', 'expressed');
              note5(
                x,
                'mutual-interest',
                'Julian replies that personal interest is mutual and he would welcome a fresh invitation. No physical permission is granted.',
                'Julian’s actual reply',
              );
              return [
                q(
                  'Julian · reply',
                  'Yes. I would like that. Ask when you know what you want the evening to be.',
                ),
              ];
            },
          ],
        );
      for (const [id, label, hint, fn] of opts)
        if (!get5(s, 'attention-' + id))
          c.push(
            offer5(
              'attention-' + id,
              label,
              `${left} attention choices left. ${hint}`,
              'room',
              (x) => {
                set5(x, 'attention-' + id);
                set5(x, 'attention', String(Number(get5(x, 'attention') ?? 0) + 1));
                return fn(x);
              },
            ),
          );
    }
    c.push(
      offer5(
        'leave-room',
        left === 2 ? 'Leave early; keep the rest of the day' : 'Leave when you have had enough',
        'No new attendance or publicity obligation.',
        'offer',
        (x) => {
          set5(x, 'left-room');
          set5(x, 'harbour-position', 'departed');
          set5(x, 'guest-card', 'table-home');
          return [
            p(
              'Back at the programme table, you thank the host and leave Harbour. At home you put the programme and guest card on the table. Later, you hang your selected outfit for the morning.',
            ),
          ];
        },
      ),
    );
  }
  if (s.phase === 'offer') {
    for (const [id, label] of [
      ['professional', 'Choose a professional profile'],
      ['glamorous', 'Choose a fashion-led profile'],
      ['provocative', 'Propose a sensual, fully clothed portrait'],
      ['private', 'Request a paid private sitting with no publication'],
    ] as const)
      if (!get5(s, 'concept-seen-' + id))
        c.push(
          offer5(
            'concept-' + id,
            label,
            'This changes the proposal; nothing is accepted or published yet.',
            'offer',
            (x) => {
              set5(x, 'concept', id);
              set5(x, 'concept-seen-' + id);
              return [
                q(
                  'Aster editor',
                  id === 'private'
                    ? 'A private research sitting, one hundred. No public issue or future rights.'
                    : 'That direction works. I have put the fee and usage beside it in the proposal.',
                ),
              ];
            },
          ),
        );
    for (const [id, label, key, value, line] of [
      [
        'fee',
        'Ask for a higher fee',
        'fee-raised',
        'yes',
        'Another hundred for a published piece. The private research rate stays at one hundred.',
      ],
      [
        'name',
        'Restrict the credited name to E. Vale',
        'name-use',
        'initials',
        'E. Vale in the agreed issue. No biography linking a private identity.',
      ],
      [
        'image',
        'Request text only; retain all image use',
        'image-use',
        'none',
        'No portrait in the issue. The editorial fee and your final approval remain.',
      ],
      [
        'approval',
        'Confirm final creative approval',
        'creative-approval',
        'yes',
        'You approve the exact caption and image. If you withhold publication, no public-use fee is due.',
      ],
      [
        'contact',
        'Ask for the studio’s public professional directory',
        'directory',
        'yes',
        'Here is our public directory. You would need to approach them yourself.',
      ],
    ])
      if (!get5(s, 'negotiated-' + id))
        c.push(
          offer5('negotiate-' + id, label, 'Ask for these exact amended terms.', 'offer', (x) => {
            set5(x, 'negotiated-' + id);
            set5(x, key, value);
            send5(x, 'aster', label, 'Evelynn’s explicit negotiation request');
            note5(x, 'negotiation-' + id, line, 'Aster editor accepts the named amendment');
            return [q('Aster editor', line)];
          }),
        );
    c.push(
      offer5(
        'offer-accept',
        'Accept the displayed sitting terms; retain proof approval',
        rights5(s),
        'proof',
        (x) => {
          set5(x, 'offer', 'accepted');
          send5(
            x,
            'aster',
            `I accept the ${concept5(x)} sitting at $${fee5(x)}, with final approval and the displayed name/image limits. No private files.`,
            'Explicit accepted editorial terms',
          );
          note5(x, 'editorial-terms', rights5(x), 'Written terms accepted before production');
          return [
            p(
              'You confirm the 11:30 appointment, leave home and arrive at the studio on time in the same selected outfit. After reading back the scope, the editor asks, “What would you keep out of the frame?” You describe the work without naming a client. The editor crosses a phrase out. “That is the sentence, then.” Over the next two hours you choose what belongs in the proof.',
            ),
          ];
        },
      ),
    );
    // Draft changes are presentation-only; accepting a reviewed concept is one durable event.
    const accept = c.find(choice => choice.id === 'chapter5.offer-accept')!;
    for (const concept of asterConcepts) c.push({
      ...accept, id: 'chapter5.offer-accept-' + concept,
      hint: rights5(proposal5(s, concept)),
      apply: x => { set5(x, 'concept', concept); return accept.apply?.(x) ?? []; },
    });
    c.splice(c.indexOf(accept), 1);
    c.push(
      offer5(
        'offer-decline',
        'Decline the editorial work',
        'No artifact, fee or rights transfer.',
        'infrastructure',
        (x) => {
          set5(x, 'offer', 'declined');
          send5(
            x,
            'aster',
            'I decline the editorial sitting. No publication or image use is authorized.',
            'Explicit refusal',
          );
          return [q('Aster editor', 'Thank you for considering it. Nothing will be published.')];
        },
      ),
    );
  }
  if (s.phase === 'proof') {
    if (concept5(s) !== 'private')
      c.push(
        offer5(
          'publish',
          'Authorize this exact proof for the agreed issue',
          caption5(s) + ' ' + rights5(s),
          'infrastructure',
          (x) => {
            set5(x, 'published');
            note5(
              x,
              'publication',
              caption5(x) + ' ' + rights5(x),
              'Evelynn approves exact proof; Aster publishes agreed issue and sends live link',
            );
            send5(
              x,
              'aster',
              'I authorize the reviewed proof under the signed scope, and no other use.',
              'Explicit publication authorization',
            );
            money5(
              x,
              'editorial',
              fee5(x),
              'Aster settles the completed public-use fee after authorized publication',
            );
            return [
              p(
                'The editor sends the live issue link and settled receipt. You read the caption once in its finished place. You collect your agreement and leave the studio for home.',
              ),
            ];
          },
        ),
      );
    c.push(
      offer5(
        'withhold',
        concept5(s) === 'private'
          ? 'Finish the private sitting; keep it unpublished'
          : 'Withhold publication',
        'No public artifact or public-use fee. A completed agreed private sitting pays $100.',
        'infrastructure',
        (x) => {
          set5(x, 'publication-withheld');
          send5(
            x,
            'aster',
            'No publication is authorized. Keep the proof private under the agreed limits.',
            'Explicit no-publication decision',
          );
          if (concept5(x) === 'private')
            money5(
              x,
              'private-sitting',
              100,
              'Completed private research sitting under its separate $100 terms',
            );
          return [
            q('Aster editor', 'Nothing goes into the issue. I will mark the file accordingly.'),
            p('You collect your copy of the agreement and leave the studio for home.'),
          ];
        },
      ),
    );
  }
  return c;
}
