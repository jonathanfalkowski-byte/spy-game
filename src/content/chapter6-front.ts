/** Chapter 6 movements 1–4 — benefit, expectation, friction (the Counter), exit. Wording and flags:
 * docs/story/scripts/CHAPTER_6_FRONT_MOVEMENTS_SCRIPT.md (with its wording fill and build decisions).
 * A benefit is not a debt: nothing here resolves the arrangement or assigns a route. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get5, julian5, old } from './chapter5-model';
import { get4 } from './chapter4-model';
import { sloaneDoubts } from './sloane-standing';
import { mayaHeardNewVoice, mayaKnowsAdaptation } from '../state/chapter3-provenance';
import { type C6Choice, type ExitArrangement6, get6, note6, offer6, set6 } from './chapter6-model';

const arrangement = (s: GameState) => (get6(s, 'exit-arrangement') ?? 'self-funded') as ExitArrangement6;
const selfFunded = (s: GameState) => arrangement(s) === 'self-funded';

// ── Movement 1: benefit ──

const inUse: Record<ExitArrangement6, string> = {
  'julian-workroom': 'You let yourself into the Helix workroom with the card that still works. Good light, quiet, a door that closes. The entry logs your name, the way it always has. It is the easiest place in the city to do your work, and it is not yours.',
  'public-artifact': 'The Aster issue is still circulating, and a message waits from someone who read it — a small opportunity, attached to your name because your name is now attached to a face and a page. The visibility you released is still working for you. It is also still working.',
  'sloane-institutional': 'The apartment is warm, the phone is charged, the arrangement that keeps you housed and legible runs in the background like weather. None of it is in your name. All of it is easy, and easy is a thing someone else is providing.',
  'self-funded': 'You pay for the desk you use and the phone in your bag, and nobody’s name is on your day but yours. It is more expensive and more work and slightly lonelier, and it is entirely yours. There is nothing here to be used against you, because you never handed anyone the other end.',
};

/** A prior promise she can hold them to (script decision F2). */
export const priorPromise6 = (s: GameState) =>
  !!get5(s, 'obligation-provider') ||
  get5(s, 'offer') === 'accepted' ||
  (!!get4(s, 'julian-kept') && old(s, 'helix-window') === 'offered');

// ── Movement 2: expectation ──

const request: Record<ExitArrangement6, Block> = {
  'julian-workroom': q('Julian', 'There’s a dinner Thursday — people worth your knowing, and one who asked about you by name. Come as my guest. It isn’t work. I’d just like you there.'),
  'public-artifact': q('Aster editor', 'The first piece did numbers. I want a follow-up while the attention’s warm — a little more of you this time, a picture if you’ll give me one, entirely your call on where the line is. Same rights conversation as before.'),
  'sloane-institutional': q('Sloane', 'A small thing. When Compliance asks — and they will — you tell them the review of your file is closed and cooperative. It is true enough. It keeps everyone’s paperwork quiet, including yours.'),
  'self-funded': p('No one asks you for anything, because no one is holding a thing you need. The only expectation on you today is the one you set yourself. It is a strange, light feeling, and you notice how unused to it you are.'),
};

// ── Movement 4: exit ──

const cost: Record<ExitArrangement6, string> = {
  'julian-workroom': 'You add it up honestly. The room and the open channel are worth real money and real access to replace — a self-paid Harbour week, or the public desk and its queue, and Julian noticing the day you stop needing him. Leaving is not a cliff. It is a bill, and you can read the number.',
  'public-artifact': 'You add it up. The audience is an asset that also watches; the follow-on is an ask you can refuse. Leaving means the first piece keeps circulating on exactly the terms you set, and nothing more grows from it — a smaller footprint, wholly yours.',
  'sloane-institutional': 'You add it up, and the number is not money. The housing, the legibility, the cooperative version of events — none of it is in your name, and leaving the easy version means carrying an exposure you don’t currently carry. It is the most expensive door in the building, and you are standing in front of it.',
  'self-funded': 'You add it up and there is nothing to add. You paid as you went — in money, in effort, in the quiet of doing it alone — and no bill is waiting. Your cost of leaving is only the leaving. It is the strangest luxury you own.',
};

/** A third party can see the term (script decision F4). */
export const recordChannel6 = (s: GameState) =>
  !!get5(s, 'published') || get6(s, 'counter-ask') === 'bounded' || get5(s, 'service') === 'municipal';

export function frontBlocks6(s: GameState): Block[] {
  if (s.phase === 'benefit')
    return [
      p('The morning is ordinary, which is the point. Whatever you built in the last weeks is simply there now, part of how the day works. You use it without thinking. Then you catch yourself thinking about it.'),
      p(inUse[arrangement(s)]),
    ];
  if (s.phase === 'expectation') return [request[arrangement(s)]];
  if (s.phase === 'exit') return [p(cost[arrangement(s)])];
  return [];
}

// ── Movement 3: the Counter ──

const arrival = (s: GameState): Block[] =>
  mayaKnowsAdaptation(s)
    ? [
        p('She is already at her usual seat when you come in. She looks for Adrian in your face and does not hide that she is looking.'),
        q('Maya', 'Give me a second. I’m allowed a second.'),
      ]
    : [
        p('She is at her seat, and she watches you cross to her the way a compliance investigator watches anyone she did not invite. Polite. Guarded. You know her order before she gives it, and you have to not know it out loud.'),
      ];

function mayaLearns(x: GameState, key: string, source: string, belief = false) {
  (belief ? x.npcs.maya.beliefs : x.npcs.maya.known).push({ key, source, event: x.revision });
}

function counterChoices(s: GameState): C6Choice[] {
  if (get6(s, 'maya')) return frictionHub(s);
  const arranged = get6(s, 'counter-arranged');
  if (!arranged)
    return [
      ...(get5(s, 'maya-clean-line')
        ? [
            offer6('counter-clean', 'Arrange it on the personal number', 'Private. Off the monitored line.', 'friction', (x) => {
              set6(x, 'counter-arranged', 'clean');
              if (!get6(x, 'maya-exposed')) set6(x, 'maya-exposed', 'no');
              return [
                p('You use the number she saved and nothing else. A place, a time, no explanation. She names the counter — the late one near Compliance, where she and Adrian used to eat after audits.'),
                ...arrival(x),
              ];
            }),
          ]
        : []),
      offer6('counter-monitored', 'Arrange it on the Axiom phone', 'Possible — but Sloane can see you did.', 'friction', (x) => {
        set6(x, 'counter-arranged', 'monitored');
        set6(x, 'maya-exposed', 'yes');
        x.npcs.sloane.known.push({
          key: 'Evelynn arranged an off-record meeting with Maya Reyes.',
          source: 'Axiom-monitored phone: meeting arrangement',
          event: x.revision,
        });
        return [
          p('You only have the monitored line to reach her on. You use it, knowing the arrangement itself becomes a thing Sloane’s system can read: that you met Maya, off the books, by choice. You tell Maya the line is watched. She agrees anyway.'),
          ...arrival(x),
        ];
      }),
      offer6('counter-skip', 'Don’t arrange it', 'Leave it for now. A respected choice.', 'friction', (x) => {
        set6(x, 'maya', 'deferred');
        return [
          p('You leave her number where it is. Not tonight. The lane pauses without a wound; she is not owed a meeting and you are not owed her forgiveness for the silence.'),
        ];
      }),
    ];
  const knows = mayaKnowsAdaptation(s);
  const heard = mayaHeardNewVoice(s);
  if (!knows && !get6(s, 'maya-knows')) {
    const tell = (id: 'tell' | 'partial' | 'none', label: string, hint: string, value: string, learned: string, blocks: Block[]) =>
      offer6('counter-' + id, label, hint, 'friction', (x) => {
        set6(x, 'maya-knows', value);
        mayaLearns(x, learned, 'Evelynn, in person at the counter');
        return blocks;
      });
    return [
      tell('tell', 'Tell her, here, all of it', 'The full truth, in your own words, no one listening.', 'in-person', 'Evelynn is Adrian, told in person and tested with a question only Adrian could answer.', [
        p('You tell her who you are. She asks one question only Adrian could answer — the name of the bar you both hated, the year of the audit that nearly broke you — and you answer it, and she stops asking.'),
        q('Maya', 'Okay. Okay. I’m not going to cry in the noodle place. Give me the second again.'),
      ]),
      ...(heard
        ? [
            // She has heard this voice call itself Adrian: she cannot meet it as a stranger (review 2026-09-24).
            tell('partial', 'Tell her only what protects her', '“I knew Adrian. Watch the 12:14 lookup.” She will hear the rest.', 'partial', 'The woman at the counter, in the voice from Adrian’s calls, said she knew Adrian and warned her about the 12:14 lookup.', [
              p('She knows the voice before she has finished looking at you: the one that called her on Axiom’s phone and said Adrian’s name. You give her the warning and not the person. You knew Adrian. He would want her careful about the lookup she was never meant to see.'),
              q('Maya', 'You knew Adrian.'),
              p('She says it back slowly, like a term she is agreeing to, and does not ask the next question. Holding the wall costs you more than she will ever know, and you can see that she knows that too.'),
            ]),
            tell('none', 'Don’t confirm what she hears', 'She knows the voice from the phone. Don’t say the name.', 'none', 'The woman at the counter had the voice from Adrian’s calls. She gave the 12:14 warning and did not confirm who she was.', [
              p('She knows the voice before she knows the face. She has heard it on the phone saying Adrian’s name, and now it is across a counter coming out of a stranger. You give her the warning and nothing else. She does not make you give her more.'),
              q('Maya', 'All right. You are someone who is worried about me. I can hold that for as long as you need me to.'),
              t('She knows. She is letting me not say it. It is the kindest thing anyone has done for me since the mirror, and I cannot even thank her for it.'),
            ]),
          ]
        : [
            tell('partial', 'Tell her only what protects her', '“I knew Adrian. Watch the 12:14 lookup.” True, bounded.', 'partial', 'A woman who knew Adrian warned her to be careful about the 12:14 lookup.', [
              p('You give her the warning and not the person: that you knew Adrian, that he would want her careful about the lookup she was never meant to see. It is true, and it is a wall, and holding it costs you more than she will ever know.'),
            ]),
            tell('none', 'Stay a stranger with a warning', 'Give her the caution; keep yourself out of it.', 'none', 'A stranger warned her about the 12:14 lookup.', [
              p('You are a woman she has never met, with a warning she takes seriously and a self she does not get to see. She thanks the stranger. Once, when you laugh, she looks at you a beat too long, as if a voice has reminded her of someone, and then she lets it go. It is the loneliest thing you have done since the mirror.'),
            ]),
          ]),
    ];
  }
  const topics = Number(get6(s, 'counter-topics') ?? 0);
  const c: C6Choice[] = [];
  if (!get6(s, 'counter-ask')) {
    if (knows && topics < 2) {
      const topic = (id: string, label: string, hint: string, blocks: Block[], after?: (x: GameState) => void) =>
        get6(s, 'topic-' + id)
          ? undefined
          : offer6('counter-' + id, label, hint, 'friction', (x) => {
              set6(x, 'topic-' + id);
              set6(x, 'counter-topics', String(topics + 1));
              after?.(x);
              return blocks;
            });
      c.push(
        ...[
          topic('what-happened', 'What happened to you', 'The body, the voice, what the clinic did that you can say.', [
            q('Maya', 'Can I ask what they actually did? You don’t have to. I just keep imagining it, and I’d rather know than imagine.'),
            p('You tell her what is yours to give — the body that is yours now, the voice, the weeks of learning to stand — and not the clinical detail that is still Axiom’s. She listens the way she used to read a case file, without flinching, and at the end she nods once, like something has finally been filed correctly.'),
          ]),
          topic('what-chose', 'What you chose', 'Something you wanted — a dress, a night, a person — as far as you like.', [
            p('You tell her about one thing you wanted and went and got — a dress, an evening, a person — because it was yours to choose. Her face does something complicated, and lands on relief.'),
            q('Maya', 'Tell me one good thing. Not a thing that happened to you. A thing you wanted and went and got. I need to know there’s been one.'),
          ]),
          topic(
            'her-life',
            'Her review, and the lookup',
            'Ask, and actually listen.',
            [
              q('Maya', 'Someone ran me at 12:14 and I wasn’t supposed to know, and now there’s a “routine review” with my name on it and no one will say by whom. I’m scared, Evelynn. I haven’t said that to anyone. Don’t make me regret saying it to you.'),
              p('You do not fix it and you do not promise to. You let her be frightened out loud to the one person who will not repeat it. It is the most you have been a friend to anyone since the mirror.'),
            ],
            (x) => {
              set6(x, 'maya-exposed', 'yes');
              note6(x, 'maya-review', 'Maya is under a “routine review” after the 12:14 lookup and is frightened. Evelynn holds it in confidence.', 'Maya, in person at the counter', 'claim');
            },
          ),
          ...(s.relationships.bond === 'love'
            ? [
                topic('adrian-loved', 'What Adrian felt', '', [
                  q('Maya', 'I loved you too. Not like that. I needed you to be the one person who never wanted anything from me. Don’t be the person who wanted something now.'),
                  p('It is not a rejection and does not feel like one. It feels like being handed back a true thing about yourself, undamaged.'),
                ]),
              ]
            : []),
        ].filter((x): x is C6Choice => !!x),
      );
    }
    // Once the telling (or at least one topic) is done, the ask stage is the way on.
    if (!knows || topics > 0)
      c.push(
        offer6('counter-ask-bounded', 'Ask for a public-file opinion only', 'She’ll give a bounded read, nothing restricted.', 'friction', (x) => {
          set6(x, 'counter-ask', 'bounded');
          mayaLearns(x, 'Evelynn asked only for a read of a public filing.', 'Evelynn’s request at the counter');
          return [
            q('You', 'There’s a public filing I can’t read cleanly. Not your work — the public part. Would you look?'),
            q('Maya', 'The public part, yes. Send it. And thank you for asking me the version I can say yes to.'),
            p('She gives you a bounded, careful read — exactly what a compliance investigator gives a friend and not a gram more. It helps, and it costs her nothing.'),
          ];
        }),
        offer6('counter-ask-restricted', 'Push her for restricted material', 'She refuses; pushing costs.', 'friction', (x) => {
          set6(x, 'counter-ask', 'restricted');
          set6(x, 'maya', 'strained');
          mayaLearns(x, 'Evelynn pushed her for restricted work material.', 'Evelynn’s request at the counter', true);
          return [
            q('Maya', 'No. That’s the thing I don’t do, and you knew that, and you asked anyway.'),
            p('She stands, pays for both bowls.'),
            q('Maya', 'I’ll see you, Evelynn.'),
          ];
        }),
        offer6('counter-ask-none', 'Ask her for nothing', 'Keep it to the two of you.', 'friction', (x) => {
          set6(x, 'counter-ask', 'none');
          return [];
        }),
      );
    return c;
  }
  return [
    offer6('counter-restored', 'Agree how to reach each other, and what neither will ask', 'A newer, smaller, careful friendship.', 'friction', (x) => {
      set6(x, 'maya', 'restored');
      return [
        p('You settle it plainly: how you’ll reach each other, what neither of you will ask the other to carry. Not the friendship you had — that one belonged to Adrian. A newer one, smaller and more careful and real, that belongs to whoever you are now.'),
        q('Maya', 'Same counter, then. When you can. I’ll be the one pretending to read the menu.'),
      ];
    }),
    offer6('counter-careful', 'Let her ask for distance until the review clears', 'Her choice, for her own safety.', 'friction', (x) => {
      set6(x, 'maya', 'paused-by-maya');
      return [
        q('Maya', 'Don’t contact me until the review’s done. Not because of you — because I can’t afford one more thing on my file I’d have to explain. Give me that, and when it’s over I’ll find you.'),
        p('It is her choice, and a good one, and you honor it without making her manage your disappointment. You leave first, so she doesn’t have to watch you go.'),
      ];
    }),
  ];
}

// ── Movement 3: the other people (one-shot beats around the Counter) ──

/** She reacts only to what reached her: the workspace message or the monitored meeting arrangement. */
const sloaneSees = (s: GameState) => !!workspaceNote(s) || meetingSeen(s);

/** What the workspace message actually named (only when c5.message-sloane was sent). */
const workspaceSeen: Record<string, [string, string]> = {
  julian: ['you took the Helix workroom Julian keeps open', 'A workroom Helix lets me use, on the terms we wrote down.'],
  self: ['you’re paying for your own Harbour room', 'A workspace I pay for myself.'],
  municipal: ['you’re using the public reading desk', 'A public desk anyone can use.'],
  axiom: ['you kept the workspace in the flat', 'The desk in the flat, same as it’s always been.'],
};
const workspaceNote = (s: GameState) => (get5(s, 'message-sloane') ? workspaceSeen[get5(s, 'service') ?? ''] : undefined);
const meetingSeen = (s: GameState) => get6(s, 'counter-arranged') === 'monitored';

function sloaneOpening(s: GameState): Block[] {
  // The Meridian capture happens later (proof), so friction references only what has reached her by now.
  const workspace = workspaceNote(s)?.[0],
    meeting = meetingSeen(s);
  const seen =
    workspace && meeting
      ? `I have your note that ${workspace}, and a line saying you met Ms Reyes off-hours.`
      : workspace
        ? `I have your note that ${workspace}.`
        : 'I have a line saying you met Ms Reyes off-hours.';
  return [
    q('Sloane', seen + ' I am not asking you to explain any of it. I am telling you I can see the parts you let me see, and I would like you to remember that before you decide I can see all of it.'),
    ...(sloaneDoubts(s)
      ? [
          q('Sloane', 'And one thing you did not let me see, because there was nothing to see. At the Glass House you gave me Benton’s name before a single thing had put him in the room. You were right. I have been waiting since to learn whether that was judgment or luck. I do not build on luck.'),
        ]
      : []),
    t('She is right about the risk and wrong about the reason, and she cannot tell the difference from where she sits. That gap is the only privacy I have.'),
  ];
}

/** Evelynn bounds only the things Sloane actually named. */
const sloaneCorrection = (s: GameState): Block[] => [
  q('You', [workspaceNote(s)?.[1], meetingSeen(s) ? 'A friend I’ve known ten years.' : undefined, 'Each is exactly what it is, and none of it is what you’re worried it might be.'].filter(Boolean).join(' ')),
  p('You put the true, narrow version on the record before she can build a wider one on top of it. It does not remove her concern. It removes her excuse for guessing.'),
];

type Beat = {
  id: 'sloane' | 'julian' | 'public';
  label: string;
  open: (s: GameState) => Block[];
  options: [string, string, string, string, Block[] | ((s: GameState) => Block[])][];
};
const beats: Beat[] = [
  {
    id: 'sloane',
    label: 'What Sloane can see',
    open: sloaneOpening,
    options: [
      ['correct', 'Bound each thing precisely', 'Say exactly what each was — no more, no less.', 'corrected', sloaneCorrection],
      ['let', 'Let her assumption sit', 'Say nothing. Let her wonder what it means.', 'unanswered', [
        p('You thank her for her concern and explain nothing. Let her hold a shape she can’t fill in. A woman who thinks she might not see everything is more careful than one you’ve reassured.'),
      ]],
    ],
  },
  {
    id: 'julian',
    label: 'The same door',
    open: () => [
      q('Julian', 'You’ve been a little further away since the audit. I’m not asking why — that’s yours. I’d just like to know it’s the same door: that if you want the room, or the conversation, it’s there, and that I haven’t misread where we stand.'),
      t('He is not pushing. He is checking. There is a difference, and the fact that he knows there’s a difference is most of what I have ever liked about him.'),
    ],
    options: [
      ['hold', 'Keep it exactly professional', 'Clear, warm, no more than that.', 'professional', [q('You', 'The same door. Professional, and real, and I mean both words. I’d tell you if that changed.')]],
      ['warm', 'Let the personal stand', 'Acknowledge there’s more than work here.', 'warmed', [q('You', 'You haven’t misread it. I’ve been further away because a lot has been further away. Not you.')]],
      ['cool', 'Step back deliberately', 'Put more space in, on purpose.', 'cooled', [q('You', 'The professional door stays open. The rest — I need it quieter for a while. That’s not about you either, but it’s real.')]],
    ],
  },
  {
    id: 'public',
    label: 'The attention answers back',
    open: () => [
      p('A message from someone who saw the Aster piece — a real offer, small and paid, your face in a bigger room. The image you released, doing what a released image does: finding you the next thing, whether or not you asked it to.'),
      t('This is the part they don’t tell you about being seen. It doesn’t stop when you’re done being seen. It becomes a door other people feel entitled to open.'),
    ],
    options: [
      ['restrict', 'Hold it to what you released', 'Decline the expansion; keep the first piece’s exact scope.', 'restricted', [
        p('You decline, and you restate the scope you actually agreed to, so the first piece stays the first piece and grows nothing you didn’t plant. The attention is a tool. You decline to be one.'),
      ]],
      // friction-public-correct is offered only when a misstatement exists; no current state records one.
      ['use', 'Aim it at something you want', 'Turn the attention toward your own end.', 'used', [
        p('You say yes, on your terms, because a bigger room is a bigger room and you have things you would like heard in it. Visibility you steer is not the same as visibility that steers you.'),
      ]],
    ],
  },
];
const unlocked = (s: GameState, id: Beat['id']) =>
  id === 'sloane' ? sloaneSees(s) : id === 'julian' ? julian5(s) : !!get5(s, 'published');

/** After the Counter (or skipping it): each unlocked beat once, in any order, then on to exit. */
function frictionHub(s: GameState): C6Choice[] {
  const open = get6(s, 'friction-open') as Beat['id'] | undefined;
  if (open) {
    const beat = beats.find((b) => b.id === open)!;
    return beat.options.map(([id, label, hint, value, blocks]) =>
      offer6(`friction-${open}-${id}`, label, hint, 'friction', (x) => {
        set6(x, 'friction-' + open, value);
        delete x.choices['c6.friction-open'];
        if (open === 'sloane' && value === 'corrected')
          x.npcs.sloane.known.push({
            key: 'Evelynn bounded each reported item to exactly what it was.',
            source: 'Evelynn’s direct reply to Sloane',
            event: x.revision,
          });
        return typeof blocks === 'function' ? blocks(x) : blocks;
      }),
    );
  }
  return [
    ...beats
      .filter((b) => unlocked(s, b.id) && !get6(s, 'friction-' + b.id))
      .map((b) =>
        offer6('friction-' + b.id, b.label, '', 'friction', (x) => {
          set6(x, 'friction-open', b.id);
          return b.open(x);
        }),
      ),
    offer6('friction-done', 'Leave it there for tonight', 'Enough people for one night.', 'exit'),
  ];
}

// ── Choices for movements 1, 2, 3, 4 ──

export function frontChoices6(s: GameState): C6Choice[] {
  if (s.phase === 'benefit') {
    const choose = (id: string, label: string, hint: string, value: string, line: string) =>
      offer6('benefit-' + id, label, hint, 'expectation', (x) => {
        set6(x, 'benefit-response', value);
        return [t(line)];
      });
    const who = choose('who', 'Ask who this actually serves', 'Name the provider and what they get.', 'examined', 'Someone provides this, and provision is never free of interest. Not a trap — a fact. I would rather know whose convenience I am also serving by taking my own.');
    const accept = choose('accept', 'Take the convenience and get on with the day', 'Use it. A benefit is not a debt.', 'accepted', 'I use the good thing because it is good, and I refuse to pretend that using it is the same as owing for it. It is not. Not yet, and maybe not ever.');
    if (selfFunded(s)) return [who, accept];
    return [
      who,
      choose('workaround', 'Note the independent way to do the same thing', 'Price the alternative before you need it.', 'alternative-priced', 'The public desk exists. The Harbour week I can pay for exists. I do not take them today, but I learn what they cost, so that leaving is a decision I could make and not a cliff I would fall off.'),
      accept,
      ...(priorPromise6(s)
        ? [choose('leverage', 'Remember what you were promised', 'A prior promise is a card, not just a comfort.', 'leverage-noted', 'When they set this up, they said words I can hold them to. I file those words where I can reach them. If this ever tightens, I will not be arguing from nothing.')]
        : []),
    ];
  }
  if (s.phase === 'expectation') {
    if (selfFunded(s))
      return [
        offer6('expect-selfnote', 'Note it and move on', 'No one is asking you for anything.', 'friction', (x) => {
          set6(x, 'expectation-response', 'noted');
          return [];
        }),
      ];
    const respond = (id: string, label: string, hint: string, value: string, line: string) =>
      offer6('expect-' + id, label, hint, 'friction', (x) => {
        set6(x, 'expectation-response', value);
        return [p(line)];
      });
    return [
      respond('clarify', 'Ask exactly what is being requested', 'Make the soft ask a specific one.', 'clarified', 'You ask them to say the actual thing — the scope, the ask under the ask. Made specific, it is smaller than it felt, and now it is on the record as a request and not an assumption.'),
      respond('narrow', 'Agree to a strict, smaller version', 'Comply only with the part you actually choose.', 'narrowed', 'You say yes to a narrow slice of it and no to the rest, in plain words, and you let the narrowness stand. The favour is honoured; the drift is not.'),
      respond('negotiate', 'Ask for a real consideration in return', 'If it is an exchange, price it.', 'negotiated', 'You treat it as the transaction it is and name your side of it. Either it becomes a fair exchange with your terms in it, or it stops being an exchange and goes back to being a favour, which is fine too.'),
      respond('refuse', 'Decline it', 'No. The benefit does not require this.', 'refused', 'You decline, warmly and completely. You watch to see whether the benefit was ever really free — whether “no” costs you the room, the page, the quiet. What they do next tells you what the arrangement actually was.'),
      respond('redirect', 'Offer a different thing instead', 'Give them a real yes that isn’t this one.', 'redirected', 'You offer something you are actually glad to give in place of the thing you are not, and you mean it. A relationship that can absorb a redirection is a different animal from one that cannot.'),
    ];
  }
  if (s.phase === 'friction') return counterChoices(s);
  if (s.phase === 'exit') {
    const prep = (id: string, label: string, hint: string, value: string, line: string) =>
      offer6('exit-' + id, label, hint, 'proof', (x) => {
        set6(x, 'exit-prep', value);
        return [p(line)];
      });
    const price = prep('price', 'Build the off-ramp now', 'Secure the independent alternative before you need it.', 'off-ramp', 'You quietly put the fallback in place — the paid week, the public desk, the number that isn’t theirs. You do not leave yet. You make leaving a door instead of a leap, so that when the moment comes you are choosing, not trapped.');
    const hold = prep('hold', 'Leave it unexamined tonight', 'Not every night is a decision.', 'held', 'You let it be, for now. The cost is real and you have looked at it and you choose not to move yet. That is also a choice, and an honest one.');
    if (selfFunded(s)) return [price, hold];
    return [
      price,
      prep('negotiate', 'Renegotiate the term while you still hold the benefit', 'Fix the wording from inside.', 'renegotiated', 'You reopen the term while you are still useful to them and rewrite the part that could tighten. Better wording now is cheaper than an argument later.'),
      ...(recordChannel6(s)
        ? [prep('expose', 'Put the term on the record where others can see it', 'Make the arrangement legible to more than you and them.', 'exposed-term', 'You make the shape of the arrangement visible to someone other than its two parties. A term nobody else can see is a term that can be quietly changed; a term on the record cannot.')]
        : []),
      prep('deepen', 'Take more of it, knowingly', 'Accept a deeper reliance with your eyes open.', 'deepened', 'You take more, not less — the longer booking, the bigger piece, the deeper cover — and you do it deliberately, because the benefit is worth it to you and you refuse to be ashamed of a choice you are making on purpose. It costs more to leave now. You have decided that is acceptable.'),
      hold,
    ];
  }
  return [];
}
