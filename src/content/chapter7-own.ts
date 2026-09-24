/** Chapter 7 (own-power, played as the Celebrity route) — Standing Alone: standing → pursue (hub) → close.
 * Wording: docs/story/scripts/CHAPTER_7_OWN_POWER_SCRIPT.md with its Phase 0 decisions, deepened by the heat-and-danger
 * pass (docs/story/scripts/CHAPTER_7_CELEBRITY_SAMPLE_INTERVIEW.md, docs/story/BEAT_MAP.md). Each hub door opens a
 * scene with its own choice (held in c7.pursue-open) and still resolves to the same piece Chapter 8 reads. Hooks
 * Chapter 8 reads: own.exposed, own.alliance.rook, c7.finding and route.entry.
 * The optional evening (Julian or Sebastian) is chosen, consent-gated, heat 3 and fades at the act
 * (docs/story/CONTENT_DIRECTION.md). Firewall: nothing in the investigation reads a c7.evening-* flag. */
import { optionalNpc, type GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get4 } from './chapter4-model';
import { get5 } from './chapter5-model';
import { sebastianDoorOpen5 } from './chapter5-sebastian';
import { get6 } from './chapter6-model';
import { type C7Choice, get7, getKey, note7, offer7, set7, setKey } from './chapter7-model';

const SENDER = 'Unknown sender';
export const RECORDS_FEE = 40;
/** Below this, the money line reads as barely enough (it follows actual cash, not route.entry). */
export const LOW_CASH = 100;
const pieceKeys = ['records', 'maya', 'rook', 'audience'] as const;
export const pieces7 = (s: GameState) => pieceKeys.filter((k) => getKey(s, 'own.piece.' + k)).length;
export const cash7 = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);

/** Close fixes the finding from the pieces held (shape ≥2, lead 1, none 0). */
export function enterClose7(s: GameState) {
  const n = pieces7(s);
  set7(s, 'finding', n >= 2 ? 'shape' : n === 1 ? 'lead' : 'none');
}

/** Scene-specific place lines while a hub scene or the evening is open (display only). */
export function place7(s: GameState): string | undefined {
  if (s.scene !== 'chapter7') return;
  const open = get7(s, 'pursue-open');
  if (s.phase === 'pursue' && open)
    return {
      records: '23:10 · Municipal registry · Night desk',
      maya: '21:00 · The Lantern',
      rook: '02:00 · The old ferry terminal',
      audience: 'Evening · A studio on the river',
      'audience-exit': 'Late · A studio on the river',
    }[open];
  const evening = get7(s, 'evening-open');
  if (s.phase === 'close' && evening)
    return evening.startsWith('julian') ? 'Late · Julian’s apartment' : 'Late · Harbour, after the last set';
}

const entryFrame: Record<string, string> = {
  built: 'You wake in a life with your name on all of it and no one else’s. The desk you pay for, the phone that answers only to you, the small stubborn independence you spent real money to keep. It is quieter than the lives you were offered. This morning you find out what quiet is worth.',
  partial: 'You turned toward this a week ago and you are still learning the footing. Some of what you built still holds; some of it you are building now, in the open, with your own hands. It is slower this way. You knew that when you chose it.',
  unbuilt: 'A week ago you walked out of the arrangement that made everything easy, and into this — a room you pay for that is barely furnished, a budget you can count, a quiet that is mostly just alone. You chose it against everything that pointed the other way. Now you have to make it into something before it makes you regret it.',
};

const famousMorning = [
  p('Your face is on a bus shelter at the end of the street. You pass it on the way to buy coffee: the Aster print, the famous back, a line of type across the bottom that isn’t your name and is. A girl waiting for the 38 looks from the poster to you and back again, and decides she must be wrong.'),
  p('By nine your phone has forty messages. An editor wants a cover. A stylist wants a fitting. Somebody’s assistant wants to know whether you would consider a campaign, and doesn’t say for what. Three numbers you don’t recognise send nothing at all, which is its own kind of message.'),
  p('And there is a man across the road who has been reading the same newspaper outside the bakery since eight. When you come back with the coffee he has gone, and the paper is on the bench, folded open at the page with your picture.'),
  t('Press, or Sloane’s people, or someone worse. The trouble with being looked at is that you stop being able to tell who is looking.'),
];
const quietMorning = [
  p('Nobody on the street knows your face. The Aster pictures never ran, and some mornings that feels like a door you didn’t walk through. Other mornings it feels like the only reason you can still buy coffee without anyone watching you drink it.'),
];

const eveningLines: Record<string, Block[]> = {
  julian: [p('You get home as the city wakes, in last night’s dress, with his taste still on your mouth and the folded line of a contract you didn’t read still folded in your head.')],
  sebastian: [p('You get home after his train has gone, hair down, his coat still around your shoulders. He refused to take it back.')],
  withdrawn: [p('You stopped when you wanted to stop, and he let it be simple. It stays with you longer than you expected.')],
};

export function ownBlocks7(s: GameState): Block[] {
  if (s.phase === 'complete') {
    const outcome = get7(s, 'evening-outcome');
    const partner = get7(s, 'evening');
    const extra = outcome === 'withdrawn' ? eveningLines.withdrawn : outcome?.startsWith('intimate') && partner ? eveningLines[partner] : [];
    return [
      ...extra,
      p('The night does not answer you, and you do not need it to. You know more than you did this morning, and you found it alone. That will have to be enough to sleep on. It is.'),
    ];
  }
  if (s.phase === 'standing')
    return [
      p(entryFrame[getKey(s, 'route.entry') ?? 'built']),
      ...(get5(s, 'published') ? famousMorning : quietMorning),
      p('You keep circling the same seam. ORACLE predicted you would take the identity willingly and that Sloane could not hold you — and Sloane proceeded anyway. But Sloane did not build the Evelyn identity. She was handed it, the way you were. Someone, above her or before her, decided a real operative’s whole life could be pulled off a shelf and fitted to Adrian Vale.'),
      t('Who signed that. Not who ran it — who authorized reusing her. That name is the start of the real shape of this, and you have no clearance to ask for it. Which means you do it the only way left to you. Yourself.'),
      p(
        `You count what you have. ${cash7(s) >= LOW_CASH ? 'Enough to work with, if you are careful and the work is quick.' : 'Barely enough, if nothing goes wrong.'} Every road from here costs something — money, time, or being seen — and you are the one who pays.`,
      ),
    ];
  if (s.phase === 'pursue')
    return [
      p('You write the ways in on the back of an envelope, the way Adrian used to lay out a case: the paper trail, the people who might tell you something, the voices that trade in secrets, and your own face, which opens doors and draws eyes. You can walk through two of them before somebody notices you walking.'),
    ];
  if (s.phase === 'close') {
    const finding = get7(s, 'finding');
    return [
      ...(finding === 'shape'
        ? [
            p('You lay the pieces beside each other. Meridian — the operation’s own name, reused. A signature that had to come from directorate level or above. And, from more than one direction, the same wrongness: Sloane did not author this. She was handed it, the way you were.'),
            t('You went looking for who signed off on reusing her, and you found the first true edge of the shape: the person you have spent this whole affair fearing is not the top of it. Sloane executed a decision made over her head, by whoever controls Meridian and sits on the Project Eve board. That is who you are actually looking for. And you found the edge of it with no clearance, no cover, and no one’s permission but your own.'),
          ]
        : finding === 'lead'
          ? [p('One thread, not yet a shape — a name that is only an initial, or a floor without a face, or a warning you cannot source. It points somewhere above Sloane. It is not enough to act on. It is enough to know you are pulling the right thread.')]
          : [p('You did not spend what it would have cost, and you carry the question forward unanswered. That is a choice, not a failure. The thread is still there. So is the money you kept.')]),
      p(
        [
          ...(getKey(s, 'own.exposed') ? ['You are more visible than you were this morning; Sloane’s directorate knows the independent one is asking.'] : []),
          ...(get7(s, 'fee') === 'paid' ? ['You are lighter in the pocket than you were, and there is no one to bill.'] : []),
          'And you are still the only person holding what you found.',
        ].join(' '),
      ),
      t('Standing alone is slower, and it costs, and it is beginning to be seen. It is also, so far, working — and it is entirely yours.'),
    ];
  }
  return [];
}

/** A piece; the second one ends the search (the budget is two). */
const afterPiece = (s: GameState) => (pieces7(s) + 1 >= 2 ? 'close' : 'pursue');

// ── The records office ──

const recordsFinding = [
  p('The file is thinner than it should be. Stapled inside the cover is the sign-out card, and two days ago somebody else pulled this exact bundle. The requester’s name has been scored through so hard the pen went through the card.'),
  p('At a quarter to twelve the lights in the far aisle click off on their timer, one bank and then the next, walking toward you. In the dark at the end of the row something shifts: a chair, a coat, a person. You don’t wait to find out which. You photograph the pages, put the file back exactly as it was, and walk out past the night desk without running.'),
  p('On the train home you read what you took. The apartment you live in, and the accounts that dress the Evelyn identity, trace to a single holding company — Meridian Holdings. The same word that was on the courier page. Its only named officer is an initial, and a registered agent that exists to have no face.'),
  t('Meridian. Whoever reused her, reused her name for the operation too. That is not tidiness. That is someone who was there the first time. And someone else was in that file two days before you.'),
];
function recordsChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const finish = (x: GameState) => {
    delete x.choices['c7.pursue-open'];
    setKey(x, 'own.piece.records', 'meridian');
    note7(x, 'piece-records', 'The apartment and the accounts dressing the Evelyn identity trace to Meridian Holdings, whose only named officer is an initial. Someone else pulled the same file two days earlier.', 'Public corporate, property and procurement filings');
  };
  return [
    offer7('records-charm', 'Let him know it’s really you', 'Sign something for his daughter and ask nicely. He’ll remember you.', next, (x) => {
      set7(x, 'fee', 'waived');
      set7(x, 'records-mode', 'charm');
      finish(x);
      note7(x, 'records-clerk', 'The registry night clerk recognised Evelynn, waived the fee and let her into the stacks. He will remember her.', 'Evelynn’s own choice to use her face');
      return [
        p('You take the pen from his crossword and write his daughter’s name, and then yours, the one you wear, with the kind of flourish Evelyn might have used. You lean on the counter while you do it and let him watch you do it. He lets you into the stacks himself, the keys not quite steady in his hand, and never mentions the fee.'),
        ...recordsFinding,
      ];
    }),
    offer7('records-pay', 'Pay the fee and do it by the book', `$${RECORDS_FEE}. Slower, and nobody has a story to tell about it.`, next, (x) => {
      // The fee never blocks the free-agent core: short of $40, it is recorded unpaid and cash clamps at 0.
      const cash = cash7(x);
      set7(x, 'fee', cash >= RECORDS_FEE ? 'paid' : 'unpaid');
      set7(x, 'records-mode', 'book');
      setKey(x, 'own.cash', String(Math.max(0, cash - RECORDS_FEE)));
      note7(x, 'records-fee', cash >= RECORDS_FEE ? `Spent $${RECORDS_FEE} on records fees. Own cash: $${cash - RECORDS_FEE}.` : `A $${RECORDS_FEE} records fee is unpaid; own cash was $${cash}.`, 'Public registry and filing fees');
      finish(x);
      return [
        p('You pay the forty dollars and fill in the retrieval slip in a plain hand. He fetches what the rules let him fetch and leaves you alone in the reading room with a lamp and the knocking radiator, which is exactly how you wanted it.'),
        ...recordsFinding,
      ];
    }),
  ];
}

// ── Drinks with Maya ──

function mayaChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const finish = (x: GameState): Block[] => {
    delete x.choices['c7.pursue-open'];
    setKey(x, 'own.piece.maya', 'directorate');
    set7(x, 'maya-photographed');
    note7(x, 'piece-maya', 'A reuse authorization is signed at directorate level or above, never at Compliance. No one is named.', 'Maya, public-file scope only');
    return [
      q('Maya', 'I can’t pull it and I wouldn’t. But I can tell you this much for free: a reuse authorization — taking a live legend off one operative and fitting it to another — never clears at Compliance. That’s a directorate signature or higher. Someone with the authority to spend a person.'),
      p('She has not named anyone. She has drawn you a floor: this was signed at the level of a directorate — Executive Intelligence, or above it. Sloane’s level, or over Sloane’s head.'),
      p('When you leave, a flash goes off across the street: a photographer on the steps of the cinema, long lens, already turning away. Tomorrow there may be a picture of you and a woman from Axiom Compliance, heads together in a corner booth.'),
      t('You have just made Maya visible. Whatever comes for you now knows her face.'),
    ];
  };
  return [
    offer7('maya-truth', 'Tell her more than you should', 'She deserves it. It makes her closer to you, and more dangerous to know you.', next, (x) => {
      setKey(x, 'own.maya-knows', 'more');
      return [
        p('You tell her some of it. Not Adrian — never Adrian — but that the life you are wearing belonged to a real woman first, and somebody signed her away. Maya listens without interrupting, the way she always did, and when you finish she reaches across the table and holds your wrist, hard.'),
        q('Maya', 'Okay. Okay. Then I’ll tell you what I can, and you are never going to say where you heard it.'),
        ...finish(x),
      ];
    }),
    offer7('maya-shield', 'Keep her out of it', 'Ask the procedural question and nothing else. She’ll know you’re hiding something.', next, (x) => {
      setKey(x, 'own.maya-knows', 'little');
      return [
        p('“Research,” you say. “For a piece.” She knows it isn’t, and she lets you have it anyway, which is worse.'),
        q('Maya', 'Fine. Research.'),
        ...finish(x),
      ];
    }),
  ];
}

// ── The dead drop ──

function rookTrade(s: GameState): C7Choice[] {
  const trade = (id: string, label: string, hint: string, apply: (x: GameState) => void) =>
    offer7(id, label, hint, afterPiece(s), (x) => {
      delete x.choices['c7.pursue-open'];
      apply(x);
      setKey(x, 'own.piece.rook', 'board');
      setKey(x, 'own.piece.rook-verified', 'no');
      set7(x, 'rook-watcher');
      note7(x, 'piece-rook', 'The sender says the reuse was signed on the Project Eve board, not by Sloane. Unconfirmed, and convenient.', 'The sender, traded for; unverified');
      return [
        q(SENDER, 'It was not Sloane’s authority to give. She executed it. The signature is on the Project Eve board — and one name there you have already met, and did not expect.'),
        t('Or that is exactly what someone would say to point you away from Sloane and toward a door of their choosing. You cannot source it. You write it down with a mark next to it: unconfirmed, and convenient.'),
        q(SENDER, 'And Evelynn. The woman under the timetable isn’t mine. Leave by the river side.'),
        p('You leave by the river side. When you look back from the embankment, the side door is shut, and someone is standing behind the glass.'),
      ];
    });
  return [
    trade('rook-trade-fact', 'Give a fact you hold', 'Give them a detail you hold — it’s theirs now.', (x) => {
      optionalNpc(x, 'rook')?.known.push({ key: 'Evelynn gave the sender one held evidence detail.', source: 'Traded at Evelynn’s choice for the signature', event: x.revision });
    }),
    trade('rook-trade-debt', 'Owe them one instead', 'Owe them one. They’ll call it.', (x) => {
      setKey(x, 'own.alliance.rook', 'owed');
    }),
    offer7('rook-refuse-trade', 'Refuse; take nothing', 'Take nothing; owe nothing.', 'pursue', (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'rook-refused');
      set7(x, 'rook-watcher');
      return [
        q(SENDER, 'Then we have nothing to say to each other. Leave by the river side. She isn’t mine.'),
        p('You leave by the river side, and you don’t look back until the embankment. Someone is standing behind the glass of the side door, watching you go.'),
      ];
    }),
  ];
}

// ── The interview ──

const greenRoom = [
  p('The green room is empty except for a man in a grey suit who isn’t on any call sheet. He doesn’t stand. He looks at you the way the clinic’s mirror did, measuring the fit.'),
  q('Man in grey', 'You stand like someone taught you to stand quite recently. It’s very good. Nearly perfect.'),
  p('Then he is gone, through a door you didn’t see, and your hands are cold. When you reach the loading bay, the car Aster sent has left. Another car idles in its place with its lights off, and nobody gets out.'),
];
function audienceChoices(s: GameState): C7Choice[] {
  const plant = (id: string, label: string, hint: string, mode: string, exposed: string, body: Block[]) =>
    offer7(id, label, hint, 'pursue', (x) => {
      set7(x, 'pursue-open', 'audience-exit');
      set7(x, 'audience-mode', mode);
      setKey(x, 'own.exposed', exposed);
      if (mode === 'theo') set7(x, 'theo', 'curious');
      return [...body, ...greenRoom];
    });
  return [
    plant('plant-subtle', 'Ask it as a feeling', 'Only someone who already knows will hear it.', 'subtle', 'yes', [
      p('You look past him, into the lens, and let your voice drop. “Sometimes I think a life can outlast the woman who lived it. Someone keeps it on a shelf. Someone decides who gets to wear it next.” You laugh, lightly, as if it were a line from a song. Theo laughs with you. Forty people in this room hear a mood. Somewhere, one or two people hear a confession.'),
    ]),
    plant('plant-bold', 'Say it straight to camera', 'More people will answer. More of the wrong people will hear.', 'bold', 'yes-deep', [
      p('“Here’s what I’d like to know,” you say, and you don’t smile. “When someone’s whole life gets reused, who signs for it? Somebody signs. I’d like to know their name.” The floor manager looks up from her tablet. Theo, for the first time all evening, doesn’t have the next line.'),
    ]),
    plant('plant-theo', 'Make Theo ask it for you', 'Tradecraft. The question is his, not yours — and now he’s curious about you.', 'theo', 'yes', [
      p('You don’t answer. You let the silence sit until he fills it, and you steer him with your eyes and a half-finished sentence about borrowed names, until he is the one leaning forward, delighted with himself: “Are you telling me somebody gave you a life? Who hands out lives, Evelynn?” It goes out under his name. Clever. It is also the first time Theo Marr has looked at you as a story instead of a guest, and a man like that doesn’t stop pulling a thread once he has found it.'),
    ]),
  ];
}
function audienceExitChoices(s: GameState): C7Choice[] {
  const next = afterPiece(s);
  const leave = (id: string, label: string, hint: string, exit: string, body: Block[]) =>
    offer7(id, label, hint, next, (x) => {
      delete x.choices['c7.pursue-open'];
      set7(x, 'exit', exit);
      setKey(x, 'own.piece.audience', 'adjacent');
      x.npcs.sloane.known.push({
        key: 'The independent one is publicly asking who authorized the identity reuse.',
        source: 'Evelynn’s public question to her own audience',
        event: x.revision,
      });
      note7(x, 'piece-audience', 'Someone adjacent to Project Eve answered: she did not authorize it; stop looking where they want you to.', 'Self-deleting account replying to Evelynn’s public question; unverified');
      return [
        ...body,
        p('At home, still in the dark dress, you check your phone. Among the hundreds of messages is one from an account that will delete itself within the hour, from somebody who was adjacent to Project Eve and is frightened: “You’re asking the right question about the wrong person. She didn’t authorize it. Stop looking where they want you to.”'),
        p('And the cost, already paid: your question was public. Somewhere in Sloane’s directorate, a note is made that the independent one is asking who authorized the reuse.'),
      ];
    });
  return [
    leave('exit-crowd', 'Go out the front, into the fans', 'Your face is the problem. Use it as the answer.', 'crowd', [
      p('There are twenty of them behind the rope, phones up, and they scream your name, the name you are wearing, as you step out into the rain. You sign three programmes, take a photograph with a girl who is shaking, and let the crowd fold around you all the way to the corner, where no taxi can refuse a woman with twenty witnesses. Behind you, the dark car pulls out and does not follow. Fame is a cage. Tonight, for ten minutes, it was a bodyguard.'),
    ]),
    leave('exit-river', 'Walk the river path in the rain', 'Alone and quiet. You’ll know if they follow.', 'river', [
      p('You take the long way along the embankment, heels in your hand once the stones get slick. At the second bridge you see him in a shop window’s reflection: grey suit, no umbrella, thirty yards back. At the third you cut through a hotel lobby and out through its kitchens, and come up on the far side of the road in time to watch him stand at the river rail, looking the wrong way. You have never been so frightened. You have never felt so awake.'),
    ]),
  ];
}

// ── The optional evening (chosen, consent-gated, heat 3, fades) ──

const julianAvailable7 = (s: GameState) =>
  !!((get5(s, 'intimacy') && get5(s, 'want-target') === 'julian') || get5(s, 'mutual-interest') || get4(s, 'mutual-interest'));
const sebastianAvailable7 = sebastianDoorOpen5;
export const eveningPartners7 = (s: GameState) => [
  ...(julianAvailable7(s) ? (['julian'] as const) : []),
  ...(sebastianAvailable7(s) ? (['sebastian'] as const) : []),
];

type Partner = 'julian' | 'sebastian';
const who: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };
const invitation: Record<Partner, Block[]> = {
  julian: [
    p('His apartment is on the forty-first floor of a building Helix doesn’t own, he tells you at the door, as if that matters, and perhaps it does. He has taken off his tie and forgotten his cufflinks, and he looks at you the way he did the first time, as if you were a problem he would very much like to have.'),
    p('On the desk by the window, under a glass of whisky, lies a contract with the Helix crest. The counterparty line is folded under. You could unfold it. You don’t. Not tonight.'),
    t('Everyone you want is standing next to something you are trying to find. That is the job now. It is also, tonight, beside the point.'),
    q('Julian Mercer', 'Stay as long as you like. Tell me what you want, and that’s what happens.'),
  ],
  sebastian: [
    p('The late set is forty people in the dark and one cello, and he plays the middle section looking straight at you. Afterwards, in the corridor behind the stage, he kisses you before either of you has said hello.'),
    p('On the way out, a man by the fire door watches the two of you a little too long. When you glance back he is on his phone. Sebastian doesn’t notice. You do, and you file it with the others.'),
    q('Sebastian', 'The hotel’s round the corner. Or I walk you home. Or we stand here until they throw us out. You choose.'),
  ],
};
const scopeReply: Record<Partner, { 'no-sex': string; sex: string }> = {
  julian: { 'no-sex': 'Then that’s the evening. You set the edge and I stay on my side of it.', sex: 'Yes. And you say stop, it stops. Same for me.' },
  sebastian: { 'no-sex': 'Good. I’d like that very much. You say stop and I stop.', sex: 'Yes. Same rule as always: either of us says stop, and it stops.' },
};
const stopBody: Record<Partner, Block[]> = {
  julian: [
    p('You put a hand on his chest and he stops at once, and laughs under his breath.'),
    q('Julian Mercer', 'Right. Water, a car home, or the sofa. Your choice.'),
    p('You take the car. He walks you to the lift and doesn’t kiss you goodnight, and somehow that is what you think about all the way home.'),
  ],
  sebastian: [
    p('You put your hand flat on his chest. He stops at once, breathing hard, grinning.'),
    q('Sebastian', 'Glass of water and a taxi, then. I’ll walk you down.'),
    p('He does, with his coat around your shoulders, and plays you the first bar of something new on the hotel steps, badly, on an imaginary cello.'),
  ],
};
const stayBody: Record<Partner, { 'no-sex': Block[]; sex: Block[]; after: Block[] }> = {
  julian: {
    'no-sex': [
      p('He kisses you against the window with the whole city behind you, slowly, as if there were no hurry anywhere in the world. He unzips the dress an inch at a time and tells you, in that low boardroom voice, exactly what he thinks of you, and you let him. Later you are lying across his bed half-dressed with his hand spread warm on your bare back, and when you say that is where tonight stops, he says “good” and means it, and neither of you moves for a long time.'),
    ],
    sex: [
      p('He kisses you against the window with the whole city behind you. The dress goes first, then his shirt, then any pretence that either of you came here to talk. He asks once more, his mouth against your shoulder, and you answer by pulling him toward the bedroom and not letting go.'),
      p('What happens next is yours and his, and it stays on the forty-first floor. The scene fades.'),
    ],
    after: [
      p('Later, the city is going grey at the edges and Julian is asleep. The contract is still on the desk under the empty glass. You still don’t touch it, and you are not entirely sure whether that is decency or strategy.'),
    ],
  },
  sebastian: {
    'no-sex': [
      p('He undoes the dress slowly and says out loud what he likes about what he finds, and every word of it lands. Your heels are somewhere in the dark. When you say that is where tonight stops, he laughs against your throat and stays exactly there with you, and it is very, very good.'),
    ],
    sex: [
      p('He undoes the dress slowly and says out loud what he likes, and every word of it lands. The lamp stays on. You pull him down by the collar and stop keeping count of where anything ends. When he asks once more, low, whether you are sure, you answer by drawing him down onto the bed with you.'),
      p('What happens next is yours and his, and it stays in that room. The scene fades.'),
    ],
    after: [
      p('Later he is drawing a slow line down your spine with one finger, humming, and his train leaves at eight. Neither of you mentions it. Somewhere a man with a phone knows where you are tonight, and for a few hours you let that be somebody else’s problem.'),
    ],
  },
};

function eveningChoices(s: GameState): C7Choice[] {
  const open = get7(s, 'evening-open') as string;
  const partner = open.replace('-room', '') as Partner;
  const leave = offer7('evening-leave', 'Say goodnight and go home', 'Leaving is complete and respected.', 'complete', (x) => {
    delete x.choices['c7.evening-open'];
    set7(x, 'evening-outcome', 'declined');
    return [p('You say goodnight and mean it, and go home alone through the rain, and it is exactly what you wanted.')];
  });
  if (!open.endsWith('-room')) {
    const scope = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer7(`evening-${partner}-${id}`, label, hint, 'close', (x) => {
        set7(x, 'evening-open', partner + '-room');
        set7(x, 'evening-scope', id);
        note7(x, 'evening-consent', `Evelynn chose the evening’s scope (${id}); ${who[partner]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(who[partner], scopeReply[partner][id])];
      });
    return [
      scope('no-sex', partner === 'julian' ? 'Stay, but not sex tonight' : 'Go back with him, but not sex tonight', 'Kissing, touch, undressing, and stopping where you choose.'),
      scope('sex', partner === 'julian' ? 'Stay the night with him' : 'Go back with him for the night', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      leave,
    ];
  }
  const scope = get7(s, 'evening-scope') as 'no-sex' | 'sex';
  return [
    offer7('evening-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
      delete x.choices['c7.evening-open'];
      set7(x, 'evening-outcome', 'withdrawn');
      return stopBody[partner];
    }),
    offer7('evening-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
      delete x.choices['c7.evening-open'];
      set7(x, 'evening-outcome', 'intimate-' + scope);
      return [...stayBody[partner][scope], ...stayBody[partner].after];
    }),
  ];
}

function closeChoices(s: GameState): C7Choice[] {
  if (get7(s, 'evening-open')) return eveningChoices(s);
  const partners = eveningPartners7(s);
  const c: C7Choice[] = [];
  if (partners.includes('julian'))
    c.push(
      offer7('evening-julian', 'Go to Julian’s', '“Dinner ran long. I’d like to see you. Only if you want to.”', 'close', (x) => {
        set7(x, 'evening', 'julian');
        set7(x, 'evening-open', 'julian');
        return [
          p('Julian’s message arrives while you are still standing at the window: “Dinner ran long. I’m home, I’m sober, and I’d like to see you. Only if you want to.” A minute later: “No business. I promise.”'),
          ...invitation.julian,
        ];
      }),
    );
  if (partners.includes('sebastian'))
    c.push(
      offer7('evening-sebastian', 'Go and hear Sebastian play', '“Back for one night. It holds its nerve now. Come and tell me if I’m lying.”', 'close', (x) => {
        set7(x, 'evening', 'sebastian');
        set7(x, 'evening-open', 'sebastian');
        return [
          p('A message from a number you have saved under a single letter: “Back for one night. Harbour, the late set, the new version. It holds its nerve now. Come and tell me if I’m lying.”'),
          ...invitation.sebastian,
        ];
      }),
    );
  c.push(
    offer7(
      'close-end',
      partners.length ? 'Stay in tonight' : 'Carry it into tomorrow',
      partners.length ? 'Go to bed alone with what you found. Chapter 7 ends here.' : 'Chapter 7 ends here.',
      'complete',
    ),
  );
  return c;
}

// ── The hub ──

export function ownChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'standing')
    return [offer7('standing-begin', 'Start pulling the thread', 'No clearance, no cover. Your tools only.', 'pursue')];
  if (s.phase === 'close') return closeChoices(s);
  if (s.phase !== 'pursue') return [];
  const open = get7(s, 'pursue-open');
  if (open === 'rook') return rookTrade(s);
  if (open === 'records') return recordsChoices(s);
  if (open === 'maya') return mayaChoices(s);
  if (open === 'audience') return audienceChoices(s);
  if (open === 'audience-exit') return audienceExitChoices(s);
  const done = (k: string) => !!get7(s, 'done-' + k);
  const c: C7Choice[] = [];
  if (!done('records'))
    c.push(
      offer7('pursue-records', 'Dig the public record yourself', 'The registry’s night desk. Slow, legal, entirely yours.', 'pursue', (x) => {
        set7(x, 'done-records');
        set7(x, 'pursue-open', 'records');
        return [
          p('The municipal registry keeps a night desk for lawyers and the desperate. At ten past eleven it is you, a radiator that knocks, and a clerk in a cardigan who looks up from his crossword and forgets to look down again.'),
          q('Night clerk', 'You’re — my daughter has your picture on her wall. The one with the back.'),
          p('He goes red to the ears. You need the filings behind the apartment and the accounts that dress the Evelyn identity: who owns the building, who pays the service contracts, who stands behind the company that stands behind the company. It is all in the stacks. The stacks close at midnight. Retrieval costs forty dollars and takes two days, unless somebody decides otherwise.'),
        ];
      }),
    );
  if (!done('maya') && get6(s, 'maya') === 'restored')
    c.push(
      offer7('pursue-maya', 'Ask Maya what a sign-off like that looks like', 'Drinks at the Lantern. Public-file scope only: she tells you where to look, not the answer.', 'pursue', (x) => {
        set7(x, 'done-maya');
        set7(x, 'pursue-open', 'maya');
        return [
          p('Maya is already at the Lantern when you arrive, in the corner booth under the bad painting, with two glasses of the house red and the face of someone who has been rehearsing what to say.'),
          q('Maya', 'I saw you on the side of a bus. On the side of a bus, Evelynn. I nearly walked into a bin.'),
          p('She pushes a glass across the table. “You look good. You look like somebody I’d be scared of.” For a while it is only this: her stories about Compliance, yours about photographers, the old easy rhythm, both of you laughing too loudly. It is the best hour you have had in weeks. Then you ask your question, and she goes quiet and looks at you properly.'),
          q('Maya', 'Why do you want to know who signs a reuse authorisation?'),
        ];
      }),
    );
  if (!done('rook') && get6(s, 'proof-opened'))
    c.push(
      offer7('pursue-rook', 'Trade the sender for a name', 'A dead drop at two in the morning. Fast, and you can’t fully source it.', 'pursue', (x) => {
        set7(x, 'done-rook');
        set7(x, 'pursue-open', 'rook');
        return [
          p('The message comes at one in the morning from a number that will not work at two: an address, a locker number, a time. The old ferry terminal is closed for renovation, but the side door has been left on the latch for you, and the departures board still flickers over an empty hall.'),
          p('Locker 41 holds a cheap phone. It rings as your hand touches it.'),
          q(SENDER, 'You want the signature. I have it. It costs — not money, information. Tell me one thing you have not told anyone, and I will tell you who spent her.'),
          p('You are not alone. Under the dead timetable a woman in a raincoat is smoking and not looking at you so carefully that she can only be looking at you.'),
        ];
      }),
    );
  if (!done('audience') && get5(s, 'published'))
    c.push(
      offer7('pursue-audience', 'Ask the question in public', 'A live interview. Your visibility surfaces a source — and tells Sloane you’re looking.', 'pursue', (x) => {
        set7(x, 'done-audience');
        set7(x, 'pursue-open', 'audience');
        return [
          p('The car Aster sends is black and silent and smells of someone else’s perfume. By the time it slides into the loading bay behind the studio your phone has lit up eleven times: the producer, the stylist, two numbers you don’t know, and your editor, who has written only “wear the dark one”.'),
          p('You wear the dark one. It is cut to be looked at: high at the throat, and nothing at all across the back. The stylist is a small, fierce woman with pins in her mouth. She circles you twice, lifts one strand of your hair and lets it fall exactly where it was.'),
          q('Stylist', 'Don’t let them light you flat. You’re better in shadow.'),
          t('Everyone is better in shadow. That’s the whole job.'),
          p('The studio is a black box with one bright island in the middle: two low chairs, a table, a glass of water nobody will drink. The host rises to meet you. Theo Marr, handsome in the way television likes, forty and pretending otherwise, famous for making guests say one thing more than they meant to. He takes your hand in both of his and holds it a beat too long.'),
          q('Theo Marr', 'I’ve wanted you in that chair since the Aster pictures. Everyone has. Do you know what they call you upstairs? The woman nobody can place.'),
          p('He means it as a compliment. He has no idea how close he is. You smile the Glass House smile, the one that gives a man the feeling he has been let in, and you feel the room lean toward you: the floor manager, the camera operator, the boy holding the cables. Forty strangers wanting something from you, and you could spend it however you liked.'),
          t('Adrian never had a room lean toward him in his life. You are going to have to be careful how much you enjoy this.'),
          p('The red light comes on. Theo is good. He starts warm — the pictures, the dress, whether the famous back of the Aster print was your idea (it was) — and walks you slowly toward the things you haven’t said anywhere. Where you grew up. Why nobody had heard of you a year ago. He leans in when he asks, close enough that the question feels private, with half the city watching.'),
          q('Theo Marr', 'You came out of nowhere. That’s the rumour. A woman with a face like that doesn’t come out of nowhere.'),
          p('This is the opening. You came to put one question into the public air, a question that will mean nothing to almost everyone watching and everything to the few who know what Project Eve is. How you ask it decides who hears it, and who hears you.'),
        ];
      }),
    );
  c.push(offer7('pursue-stop', 'Stop here; work with what you have', 'You don’t have to spend more to move.', 'close'));
  return c;
}
