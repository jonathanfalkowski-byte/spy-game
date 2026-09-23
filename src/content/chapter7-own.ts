/** Chapter 7 (own-power) — Standing Alone: standing → pursue (hub) → close. Wording and flags:
 * docs/story/scripts/CHAPTER_7_OWN_POWER_SCRIPT.md with its Phase 0 decisions. Hooks Chapter 8 reads:
 * own.exposed, own.alliance.rook, c7.finding and route.entry. No intimacy in this chapter. */
import { optionalNpc, type GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { get5 } from './chapter5-model';
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

const entryFrame: Record<string, string> = {
  built: 'You wake in a life with your name on all of it and no one else’s. The desk you pay for, the phone that answers only to you, the small stubborn independence you spent real money to keep. It is quieter than the lives you were offered. This morning you find out what quiet is worth.',
  partial: 'You turned toward this a week ago and you are still learning the footing. Some of what you built still holds; some of it you are building now, in the open, with your own hands. It is slower this way. You knew that when you chose it.',
  unbuilt: 'A week ago you walked out of the arrangement that made everything easy, and into this — a room you pay for that is barely furnished, a budget you can count, a quiet that is mostly just alone. You chose it against everything that pointed the other way. Now you have to make it into something before it makes you regret it.',
};

export function ownBlocks7(s: GameState): Block[] {
  if (s.phase === 'standing')
    return [
      p(entryFrame[getKey(s, 'route.entry') ?? 'built']),
      p('You keep circling the same seam. ORACLE predicted you would take the identity willingly and that Sloane could not hold you — and Sloane proceeded anyway. But Sloane did not build the Evelyn identity. She was handed it, the way you were. Someone, above her or before her, decided a real operative’s whole life could be pulled off a shelf and fitted to Adrian Vale.'),
      t('Who signed that. Not who ran it — who authorized reusing her. That name is the start of the real shape of this, and you have no clearance to ask for it. Which means you do it the only way left to you. Yourself.'),
      p(
        `You count what you have. ${cash7(s) >= LOW_CASH ? 'Enough to work with, if you are careful and the work is quick.' : 'Barely enough, if nothing goes wrong.'} Every road from here costs something — money, time, or being seen — and you are the one who pays.`,
      ),
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

function rookTrade(s: GameState): C7Choice[] {
  const trade = (id: string, label: string, hint: string, apply: (x: GameState) => void) =>
    offer7(id, label, hint, afterPiece(s), (x) => {
      delete x.choices['c7.pursue-open'];
      apply(x);
      setKey(x, 'own.piece.rook', 'board');
      setKey(x, 'own.piece.rook-verified', 'no');
      note7(x, 'piece-rook', 'The sender says the reuse was signed on the Project Eve board, not by Sloane. Unconfirmed, and convenient.', 'The sender, traded for; unverified');
      return [
        q(SENDER, 'It was not Sloane’s authority to give. She executed it. The signature is on the Project Eve board — and one name there you have already met, and did not expect.'),
        t('Or that is exactly what someone would say to point you away from Sloane and toward a door of their choosing. You cannot source it. You write it down with a mark next to it: unconfirmed, and convenient.'),
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
      return [];
    }),
  ];
}

export function ownChoices7(s: GameState): C7Choice[] {
  if (s.phase === 'standing')
    return [offer7('standing-begin', 'Start pulling the thread', 'No clearance, no cover. Your tools only.', 'pursue')];
  if (s.phase === 'close') return [offer7('close-end', 'Carry it into tomorrow', 'Chapter 7 ends here.', 'complete')];
  if (s.phase !== 'pursue') return [];
  if (get7(s, 'pursue-open') === 'rook') return rookTrade(s);
  const done = (k: string) => !!get7(s, 'done-' + k);
  const c: C7Choice[] = [];
  if (!done('records'))
    c.push(
      offer7('pursue-records', 'Dig the public record yourself', 'Slow, legal, entirely yours. Costs time and a small fee.', afterPiece(s), (x) => {
        set7(x, 'done-records');
        setKey(x, 'own.piece.records', 'meridian');
        // The fee never blocks the free-agent core: short of $40, it is recorded unpaid and cash clamps at 0.
        const cash = cash7(x);
        set7(x, 'fee', cash >= RECORDS_FEE ? 'paid' : 'unpaid');
        setKey(x, 'own.cash', String(Math.max(0, cash - RECORDS_FEE)));
        note7(x, 'records-fee', cash >= RECORDS_FEE ? `Spent $${RECORDS_FEE} on records fees. Own cash: $${cash - RECORDS_FEE}.` : `A $${RECORDS_FEE} records fee is unpaid; own cash was $${cash}.`, 'Public registry and filing fees');
        note7(x, 'piece-records', 'The apartment and the accounts dressing the Evelyn identity trace to Meridian Holdings, whose only named officer is an initial.', 'Public corporate, property and procurement filings');
        return [
          p('You do it the patient way: corporate registries, property filings, the procurement trail a cover identity leaves when someone has to pay for it. Hours of it, and a records fee you feel.'),
          p('The apartment you live in, and the accounts that dress the Evelyn identity, trace to a single holding company — Meridian Holdings. The same word that was on the courier page. Its only named officer is an initial, and a registered agent that exists to have no face.'),
          t('Meridian. Whoever reused her, reused her name for the operation too. That is not tidiness. That is someone who was there the first time.'),
        ];
      }),
    );
  if (!done('maya') && get6(s, 'maya') === 'restored')
    c.push(
      offer7('pursue-maya', 'Ask Maya what a sign-off like that looks like', 'Public-file scope only. She tells you where to look, not the answer.', afterPiece(s), (x) => {
        set7(x, 'done-maya');
        setKey(x, 'own.piece.maya', 'directorate');
        note7(x, 'piece-maya', 'A reuse authorization is signed at directorate level or above, never at Compliance. No one is named.', 'Maya, public-file scope only');
        return [
          q('Maya', 'I can’t pull it and I wouldn’t. But I can tell you this much for free: a reuse authorization — taking a live legend off one operative and fitting it to another — never clears at Compliance. That’s a directorate signature or higher. Someone with the authority to spend a person.'),
          p('She has not named anyone. She has drawn you a floor: this was signed at the level of a directorate — Executive Intelligence, or above it. Sloane’s level, or over Sloane’s head.'),
        ];
      }),
    );
  if (!done('rook') && get6(s, 'proof-opened'))
    c.push(
      offer7('pursue-rook', 'Trade the sender for a name', 'Fast, and you can’t fully source it. A piece for a piece.', 'pursue', (x) => {
        set7(x, 'done-rook');
        set7(x, 'pursue-open', 'rook');
        return [q(SENDER, 'You want the signature. I have it. It costs — not money, information. Tell me one thing you have not told anyone, and I will tell you who spent her.')];
      }),
    );
  if (!done('audience') && get5(s, 'published'))
    c.push(
      offer7('pursue-audience', 'Ask the question in public', 'Your visibility surfaces a source — and tells Sloane you’re looking.', afterPiece(s), (x) => {
        set7(x, 'done-audience');
        setKey(x, 'own.piece.audience', 'adjacent');
        setKey(x, 'own.exposed', 'yes');
        x.npcs.sloane.known.push({
          key: 'The independent one is publicly asking who authorized the identity reuse.',
          source: 'Evelynn’s public question to her own audience',
          event: x.revision,
        });
        note7(x, 'piece-audience', 'Someone adjacent to Project Eve answered: she did not authorize it; stop looking where they want you to.', 'Self-deleting account replying to Evelynn’s public question; unverified');
        return [
          p('You use the one megaphone you own. Not an accusation — a careful, deniable question, the kind that only means something to someone who already knows: a line about identities that outlive the people who wore them, placed where your readers are.'),
          p('Someone answers. A message from an account that deletes itself an hour later, from somebody who was adjacent to Project Eve and is frightened: “You’re asking the right question about the wrong person. She didn’t authorize it. Stop looking where they want you to.”'),
          p('And the cost, immediately: your question was public. Somewhere in Sloane’s directorate, a note is made that the independent one is asking who authorized the reuse.'),
        ];
      }),
    );
  c.push(offer7('pursue-stop', 'Stop here; work with what you have', 'You don’t have to spend more to move.', 'close'));
  return c;
}
