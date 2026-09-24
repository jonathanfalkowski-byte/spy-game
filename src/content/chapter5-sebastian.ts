/** Revision 19: the Sebastian lane (Harbour sound check, rooftop salon) and Maya's new number.
 * Wording: docs/story/scripts/REV19_SEBASTIAN_MAYA_SCRIPT.md. Firewall: nothing in the
 * investigation, Helix, Axiom or Sloane may read a c5.sebastian-* flag. */
import { sebastianNpc, type GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { type C5Scene, type C5Choice, get5, set5, offer5, note5, intimate5, intimatePartner5 } from './chapter5-model';

export const rev19 = (s: GameState) => s.contentRevision === 19;
/** Owner decision (2026-09-24, docs/story/CONTENT_DIRECTION.md §8): EVE is Mature, so the sex scope
 * is offered with a heat-3 body that fades at the act, like Julian's. No explicit body. */
export const SEBASTIAN_SEX_SCOPE_OFFERED = true;
const met = (s: GameState) => get5(s, 'sebastian-met') === 'harbour';
const S = 'Sebastian';

/** Only what Evelynn says to him is recorded. */
function tell(x: GameState, key: string, source: string) {
  sebastianNpc(x)?.known.push({ key, source, event: x.revision });
}

export const sebastianScenes5: Record<string, C5Scene> = {
  salon: {
    title: 'The rooftop music hour',
    place: '20:30 · Harbour roof terrace',
    blocks: [],
  },
  'salon-room': {
    title: 'His room',
    place: 'Late · A room near the harbour',
    blocks: [
      p(
        'His room is small and warm. He switches on one lamp, not the overhead light, and props the cello case against the wall as if introducing it. He takes the rings off one by one and sets them on the dresser. You watch his hands do it.',
      ),
      q(S, 'Come here.'),
      p(
        'The first kiss is slow enough to be a question and certain enough to be an answer. His hand finds the pins in your hair and waits until you nod before taking them out.',
      ),
    ],
  },
};

// ── 1. Harbour room: the sound check ────────────────────────────────────────

export const soundCheckAttention5 = [
  'sebastian',
  'Follow the cello into the side room',
  'An open rehearsal. No introduction owed, no promise to attend.',
  (x: GameState): Block[] => {
    set5(x, 'sebastian-met', 'harbour');
    return [
      p(
        'Behind the programme wall a door stands half open. Someone is playing the same eight bars over and over, stopping each time in the same place. You step inside. A man sits alone with a cello in the middle of a stacked-chair room, sleeves pushed to the elbow, a pair of reading glasses hanging on a cord at his chest. He finishes the phrase before he looks up.',
      ),
      q(S, 'Stay if you want. I’m arguing with the middle section and losing.'),
      p(
        'He plays it through once more. It is beautiful, and then for about four bars it isn’t. It wanders, as if it has forgotten where it was going.',
      ),
      q(S, 'Be honest. Does it drag?'),
    ];
  },
] as const;

/** While his question is open, the room offers only the three answers. */
export function soundCheckPending5(s: GameState) {
  return rev19(s) && s.phase === 'room' && met(s) && !get5(s, 'sebastian-note');
}

export function soundCheckChoices5(): C5Choice[] {
  const card = [
    p(
      'He sets the bow across his knee, reaches into the case and holds out a card: Harbour’s rooftop music hour, tomorrow, twenty-thirty.',
    ),
    q(S, 'I’m playing it properly tomorrow night. If you’re free, come up. If not, not. I’m Sebastian.'),
    p(
      'You take the card. His eyes stay on you a moment longer than the question needed. You notice. So does he, and he doesn’t pretend otherwise.',
    ),
  ];
  const answers: [string, string, string, string | undefined, Block[]][] = [
    [
      'honest',
      '“It loses its nerve in the middle.”',
      'Say what you actually heard.',
      'It loses its nerve in the middle.',
      [
        p('He laughs, once, surprised.'),
        q(S, 'Loses its nerve. Yes. That’s exactly what it does.'),
        p('He writes something on the score in pencil without looking away from you.'),
      ],
    ],
    [
      'kind',
      '“It’s lovely. Maybe a little long.”',
      'Soften it.',
      'It’s lovely. Maybe a little long.',
      [q(S, 'A little long. That’s what people say when it’s a lot long. Thank you for being gentle about it.')],
    ],
    [
      'silent',
      'Say nothing and listen to it again',
      'Give no verdict.',
      undefined,
      [
        p(
          'You don’t answer. He takes that as permission and plays it a third time. Neither of you says anything when it stops.',
        ),
      ],
    ],
  ];
  return answers.map(([id, label, hint, said, blocks]) =>
    offer5('sebastian-' + id, label, hint, 'room', (x) => {
      set5(x, 'sebastian-note', id);
      if (said) tell(x, said, 'Evelynn’s verdict on the rehearsal at Harbour');
      note5(
        x,
        'sebastian-met',
        'Evelynn listened to a cellist’s rehearsal at Harbour and received the rooftop guest card from him. No obligation.',
        'Harbour side room',
      );
      return [...blocks, ...card];
    }),
  );
}

// ── 2. people: Maya's new number ────────────────────────────────────────────

export function mayaNumberChoice5(s: GameState): C5Choice | undefined {
  if (!rev19(s) || s.phase !== 'people' || get5(s, 'purchase') !== 'phone') return;
  if (get5(s, 'maya-clean-line') || Number(get5(s, 'messages') ?? 0) >= 2) return;
  return offer5(
    'maya-new-number',
    'Send Maya the new number, and nothing else',
    'From the personal phone. Axiom does not monitor this line. No explanation attached.',
    'people',
    (x) => {
      set5(x, 'maya-clean-line');
      set5(x, 'messages', String(Number(get5(x, 'messages') ?? 0) + 1));
      x.npcs.maya.known.push({
        key: 'A personal phone number, digits only; no message.',
        source: 'Evelynn’s unmonitored personal phone',
        event: x.revision,
      });
      note5(
        x,
        'maya-clean-line',
        'Evelynn sent Maya a personal number from an unmonitored phone. Maya saved it. No content disclosed.',
        'Personal phone, not the Axiom thread',
      );
      return [
        p('You type the number into a message on the new phone, delete the sentence you started after it, and send only the digits.'),
        p('It takes her four minutes.'),
        q('Maya · new number', 'Received. That’s a new habit for you.'),
        p('You read it twice. It isn’t a question, and it isn’t nothing.'),
      ];
    },
  );
}

// ── 3. want → salon ─────────────────────────────────────────────────────────

export const salonChoice5 = () =>
  offer5(
    'want-salon',
    'Go up to the rooftop music hour',
    'A free guest hour. Nothing to purchase, publish or promise.',
    'salon',
    (x) => {
      set5(x, 'want-target', 'salon');
      set5(x, 'went-out');
      return [
        p(
          met(x)
            ? 'The card from yesterday is still in your bag. You turn it over once, and you already know you are going.'
            : 'The Harbour guest card says twenty-thirty, roof terrace. There is still time to get there.',
        ),
      ];
    },
  );

export function sebastianBlocks5(s: GameState): Block[] {
  if (!rev19(s) || s.phase !== 'salon') return [];
  return [
    p(
      'The roof is quieter than the city under it. Forty chairs, perhaps half of them taken. Glass balustrades, the towers lit behind them, a warm strip of light along the parapet. A cellist walks out without an introduction, sits, and begins.',
    ),
    p(
      met(s)
        ? 'It is the piece from the side room. When he reaches the middle section he does something different. Where it used to wander, he holds one long note until the whole roof leans towards it, then turns the corner as if it had never had any doubt. He finds you in the second row at the end of the phrase. It was your note.'
        : 'The playing is unhurried and very exact. Halfway through, he slows one passage almost to stopping, and the roof goes so still you can hear the traffic forty floors down. You realise you have been holding your breath.',
    ),
    p('For an hour nobody asks you for anything. When it ends, the applause is small and real. People drift towards the stairs.'),
  ];
}

const offerLine = q(S, 'I’m walking back along the water. Come if you want to. You don’t owe me a reason either way.');
/** The walk-back offer is spoken once, when talk or request first completes. */
function offerOnce(x: GameState): Block[] {
  if (get5(x, 'sebastian-offered')) return [];
  set5(x, 'sebastian-offered');
  return [offerLine];
}
const ending = (id: string, label: string, hint: string, outcome: string, blocks: Block[]) =>
  offer5(id, label, hint, 'return', (x) => {
    set5(x, 'sebastian-outcome', outcome);
    return blocks;
  });

export function sebastianChoices5(s: GameState): C5Choice[] {
  if (!rev19(s)) return [];
  if (s.phase === 'room' && soundCheckPending5(s)) return soundCheckChoices5();
  if (s.phase === 'salon') return salonChoices(s);
  if (s.phase === 'salon-room') return roomChoices(s);
  return [];
}

function salonChoices(s: GameState): C5Choice[] {
  if (get5(s, 'want-target') === 'sebastian') return scopeChoices(s);
  if (get5(s, 'salon-talked') && !get5(s, 'sebastian-talk')) return talkChoices();
  const c: C5Choice[] = [];
  const talked = !!get5(s, 'salon-talked'),
    played = !!get5(s, 'sebastian-played');
  if (!talked)
    c.push(
      offer5('salon-talk', 'Stay and talk to him', 'An ordinary conversation. Nothing is owed after it.', 'salon', (x) => {
        set5(x, 'salon-talked');
        return [
          q(
            S,
            met(x)
              ? 'You came. And you were right, it had lost its nerve. Did I fix it, or did I just make it louder?'
              : 'You were the one not checking your phone. Thank you for that. Most people listen like they’re waiting for their turn.',
          ),
          p('He packs the cello without hurrying and sits on the edge of the low stage, one arm across his knee.'),
          q(S, 'Tell me one thing that’s true about you. Not your job. Something you’d be annoyed to have got wrong.'),
        ];
      }),
    );
  if (!played)
    c.push(
      offer5('salon-request', 'Ask him to play something for you', 'Your choice of music, for no one else’s reasons.', 'salon', (x) => {
        set5(x, 'sebastian-played');
        tell(x, 'She asked him to play a piece of her own choosing.', 'Evelynn’s request after the set');
        return [
          q(S, 'Name it.'),
          p(
            'You say the first piece that comes to you. Not something Evelyn Vale should like, not something that would suit a dossier. Something you want to hear.',
          ),
          p('He takes the cello back out. Most of the roof has gone. He plays it for you, and he doesn’t look at the instrument once.'),
          ...offerOnce(x),
        ];
      }),
    );
  if (!talked || !played)
    c.push(
      ending('salon-leave', 'Leave while the music is still in your head', 'A complete ending. Nothing is lost.', 'left', [
        p('You stand. He sees it and nods, no disappointment in it, only acknowledgement.'),
        q(S, 'Goodnight. Thank you for listening properly.'),
        p('You take the stairs down with the last phrase still going round, and it stays with you all the way home.'),
      ]),
    );
  if (get5(s, 'sebastian-talk') || played)
    c.push(
      ending('sebastian-decline', 'Say goodnight here', 'A full answer. He means what he said.', 'declined', [
        q(S, 'Then goodnight, and thank you. It was a better hour for having you in it.'),
        p('He shoulders the case and goes. There’s nothing unfinished in it.'),
      ]),
      ending('sebastian-walk', 'Walk with him, as company', 'Conversation and the water. Nothing more is proposed.', 'walk', [
        p(
          'The promenade is lit low and the tide is in. He carries the cello on his back and talks about the four cities on the tour, and which hall he dreads. You tell him which one you’d dread, and why. At his hotel he stops under the entrance light.',
        ),
        q(S, 'I’ll send you the middle section when it’s finished. If you want it.'),
        p('You say you want it. He says goodnight like a man who has enjoyed exactly what happened and wanted nothing else from it.'),
      ]),
      ending('sebastian-open', 'Tell him you don’t know yet', 'Leave it open. No answer is owed tonight.', 'open', [
        q(S, 'That’s allowed.'),
        p('He writes a number and four city names on the back of the programme.'),
        q(S, 'I’m here until Thursday. That’s not a deadline. It’s just the train.'),
      ]),
      offer5(
        'sebastian-want',
        'Tell him you want him',
        'Your desire, said plainly. Nothing is agreed until you choose what you want tonight.',
        'salon',
        (x) => {
          set5(x, 'desire', 'wanted');
          set5(x, 'want-target', 'sebastian');
          tell(x, 'I want you.', 'Evelynn, after the set');
          return [
            p('You say it without dressing it up. His answer comes just as plainly.'),
            q(
              S,
              `I want you too. I have since ${met(x) ? 'you told me it lost its nerve' : 'you stopped breathing in the slow part'}. So tell me what you’d like tonight, and we’ll start there.`,
            ),
          ];
        },
      ),
    );
  return c;
}

function talkChoices(): C5Choice[] {
  const talk = (id: string, label: string, hint: string, said: string | undefined, blocks: Block[]) =>
    offer5('talk-' + id, label, hint, 'salon', (x) => {
      set5(x, 'sebastian-talk', id);
      if (said) tell(x, said, 'What Evelynn told him after the set');
      return [...blocks, ...offerOnce(x)];
    });
  return [
    talk(
      'true',
      'Tell him something true',
      'Something real about you, nothing about the case.',
      'She has only recently started choosing her own clothes, and is better at it than she expected.',
      [
        p(
          'You tell him you’ve only recently started choosing your own clothes, and that you are better at it than you expected. It’s the truest thing you’ve said aloud in days.',
        ),
        q(S, 'Then you’re ahead of most people in this building. They’re still wearing what someone chose for them.'),
      ],
    ),
    talk('deflect', 'Turn the question back on him', 'Keep your own counsel.', undefined, [
      q(
        S,
        'Fair. Mine, then. I’ve been avoiding my brother for a month because he wants to sell our mother’s house, and he’s right. There. Now you owe me nothing.',
      ),
    ]),
    talk(
      'lie',
      'Give him a light, pleasant fiction',
      'He cannot check it. It costs you nothing tonight.',
      'She grew up by the sea.',
      [
        p(
          'You tell him you grew up by the sea. He takes it at face value, visibly, as a gift, and asks what the water sounded like in winter. You invent that too. It is easier than it should be.',
        ),
      ],
    ),
  ];
}

// ── 3e. Scope: fresh consent through the shared intimate5 flags, partner sebastian ──

function scopeChoices(s: GameState): C5Choice[] {
  if (get5(s, 'authorization')) return [];
  const scope = (id: 'no-sex' | 'sex', label: string, hint: string, said: string, reply: string) =>
    offer5('scope-' + id, label, hint, 'salon-room', (x) => {
      set5(x, 'authorization', 'granted');
      set5(x, 'willingness', 'willing');
      set5(x, 'scope', id);
      set5(x, 'want-action', 'authorized');
      set5(x, 'planned-outcome', 'intimate-' + id);
      set5(x, 'sebastian-room');
      tell(x, said, 'Evelynn’s chosen scope, stated to him now');
      note5(
        x,
        'authorization',
        said,
        'Evelynn chooses and Sebastian explicitly agrees to this same scope now',
      );
      return [q(S, reply)];
    });
  return [
    scope(
      'no-sex',
      'Go back with him, but not sex tonight',
      'Kissing, touch, undressing, and stopping where you choose.',
      'Go back with him, but not sex tonight.',
      'Good. I’d like that very much. You say stop and I stop, and I’ll say it too if I need to.',
    ),
    ...(SEBASTIAN_SEX_SCOPE_OFFERED
      ? [
          scope(
            'sex',
            'Go back with him and have sex',
            'Your stated choice. Either of you can stop at any time. The scene fades.',
            'Go back with him and have sex.',
            'Yes. And the same rule both ways: either of us says stop, and it stops.',
          ),
        ]
      : []),
    offer5('scope-back', 'Change your mind and say goodnight', 'Withdrawing now is complete and respected.', 'return', (x) => {
      set5(x, 'want-action', 'refused');
      set5(x, 'sebastian-outcome', 'withdrawn');
      tell(x, 'Goodnight; she changed her mind.', 'Evelynn’s withdrawal before any scope was agreed');
      return [q(S, 'Then goodnight. Honestly, I’m glad you said it.')];
    }),
  ];
}

// ── 3f. Handoff in his room ─────────────────────────────────────────────────

function roomChoices(s: GameState): C5Choice[] {
  if (intimatePartner5(s) !== 'sebastian' || !intimate5(s)) return [];
  const aftermath = [
    p('Later, the lamp is still on. He is drawing a slow line down your spine with one finger, humming the middle section, the new version.'),
    q(S, 'It holds its nerve now. I have you to blame for that.'),
  ];
  return [
    offer5('handoff-withdraw', 'Stop here', 'Honored immediately, without argument.', 'return', (x) => {
      set5(x, 'authorization', 'revoked');
      set5(x, 'willingness', 'unwilling');
      set5(x, 'intimacy', 'withdrawn');
      set5(x, 'sebastian-outcome', 'withdrawn');
      tell(x, 'Stop.', 'Evelynn’s withdrawal in his room');
      return [
        p('You put your hand flat on his chest. He stops at once and steps back half a pace, breathing hard, smiling a little.'),
        q(S, 'All right. Stay for a glass of water, or I’ll walk you down. Either is fine.'),
        p('You take the water. He means it, and that is its own kind of pleasure.'),
      ];
    }),
    offer5('handoff-continue', 'Stay', 'Continue within the scope you chose.', 'return', (x) => {
      const outcome = get5(x, 'planned-outcome')!;
      set5(x, 'intimacy', outcome);
      set5(x, 'sebastian-outcome', outcome);
      return [
        ...(get5(x, 'scope') === 'no-sex'
          ? [
              p(
                'You let him undo the dress. He does it slowly and says out loud what he likes about what he finds, and every word of it lands. You pull his shirt over his head and learn the shape of him with your hands. At some point you are on the bed with his mouth at your throat and your heels kicked off somewhere in the dark, and it is very good, and when you say “that’s where tonight stops”, he laughs against your skin and stays exactly there with you.',
              ),
            ]
          : [
              p(
                'He undoes the dress slowly, and this time neither of you is keeping count of where it stops. The lamp stays on. You pull him down by the collar; his mouth finds your shoulder, the line of your collarbone, the place under your ear that makes you say his name. Your heels are somewhere in the dark. When he asks once more, low, whether you are sure, you answer by drawing him down onto the bed with you.',
              ),
              p('What happens next is yours and his, and it stays in that room. The scene fades.'),
            ]),
        ...aftermath,
      ];
    }),
  ];
}

// ── 4. return: one remembering line ─────────────────────────────────────────

export function sebastianReturn5(s: GameState): Block[] {
  if (!rev19(s)) return [];
  const outcome = get5(s, 'sebastian-outcome');
  const line =
    outcome === 'intimate-sex' || outcome === 'intimate-no-sex'
      ? 'You get home after midnight with your hair still down and the smell of his coat on your dress. You don’t hurry to change.'
      : outcome === 'withdrawn'
        ? 'You stopped when you wanted to stop, and he let it be simple. You’re surprised by how much that stays with you.'
        : outcome === 'walk'
          ? 'The programme with the four city names is in your bag. You don’t take it out; you know where it is.'
          : outcome === 'open'
            ? 'The number is on the back of the programme. Thursday is three days away. It is just a train.'
            : outcome === 'declined' || outcome === 'left'
              ? 'The last phrase is still in your head when you unlock the door. It’s yours to keep; nobody gave it to you in exchange for anything.'
              : undefined;
  if (!line) return [];
  return [p(line), ...(get5(s, 'sebastian-talk') === 'lie' ? [t('The sea. You wonder what the winter water really sounds like.')] : [])];
}

/** Return-scene place by how the salon ended; every other path keeps the authored 22:30. */
export function sebastianReturnPlace5(s: GameState): string | undefined {
  if (!rev19(s) || s.phase !== 'return') return;
  const outcome = get5(s, 'sebastian-outcome');
  if (!outcome) return;
  return get5(s, 'sebastian-room') || outcome === 'walk'
    ? 'After midnight · Adrian’s apartment'
    : '22:05 · Adrian’s apartment';
}
