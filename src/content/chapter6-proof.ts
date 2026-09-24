/** Chapter 6 movement 5 — proof, not confession. Wording and flags:
 * docs/story/scripts/CHAPTER_6_PROOF_SCRIPT.md (with its build resolutions). The whole proof runs
 * inside the `proof` phase, step-unlocked; decline, broken and untested go straight to counterpower. */
import { optionalNpc, type GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block } from './schema';
import { type C6Choice, get6, note6, offer6, set6 } from './chapter6-model';

const SENDER = 'Unknown sender';

export const proofEntry6: Block[] = [
  p('The message comes on the unknown-number thread, slipping past the Axiom filter the way the others did. No name, no header, only a line and an attachment held back behind it.'),
  q(SENDER, 'You keep asking who I am. I will do better than answer. I will show you where you come from. One page. You decide what it is worth.'),
  p('The attachment waits. You have learned what a claim is worth, and what a photograph is worth, and what “trust me” is worth. This is none of those yet.'),
];

const leaf: Block[] = [
  p('It is a single page, scanned clean: a courier log, ruled by hand, one night’s entries in a column, headed in block capitals with a word you do not know: MERIDIAN. Operation names you do not recognise. A date — 14 March, a year before your assignment. One line is circled: a handoff logged at 02:40, received by a courier entered only as “R.”'),
  p('And in the margin, in a small, fast hand, a note that was never meant to be evidence: “missed the Katong breakfast for this. C. will sulk.”'),
  t('I have seen the Blackglass package. Age 31, Singapore location history, ninety-nine point nine seven percent compatibility. A specification. A thing they built and handed to me.'),
  t('This is a person’s handwriting. Someone stayed up until two in the morning, and was annoyed about a breakfast, and wrote it down. Evelyn Vale was not a file. She was somebody, and somebody is still holding the paper.'),
];

const celesteCall: Block[] = [
  p('You reach Celeste on the fund’s line. You do not mention a courier log, or Axiom, or a sender. You ask her, lightly, about Singapore — about a breakfast.'),
  q('Celeste', 'The Katong one. God, yes. I planned it for a week and she simply wasn’t there. No message, no apology, and then she breezed back two days later as if I’d imagined the whole thing. I adored her and I could have killed her.'),
  p('She is talking about a woman she knew. Warmly. To your face. And she says she, not you, as if the woman she planned that breakfast for were somebody else. You tell yourself it is only the way people talk about who you used to be. You do not let yourself wonder how she would know to say it.'),
  t('She cannot tell me the courier’s name, or what was in the handoff, or anything Axiom decided. I decide she was never inside it: that she only knew Evelyn — the real one — well enough to be hurt when she vanished. That is all I let her be, and it is enough for tonight.'),
];

const oracle: Block[] = [
  q(SENDER, 'Now you know the page is real, here is what it is a page of. Pull the ORACLE assessment for Project Eve. You were denied it. I was not.'),
  p('The attachment opens on a prediction, dated before your assignment. ORACLE ran the identity transfer and returned two numbers. High probability of voluntary adoption — that the candidate would come to live as Evelyn willingly, and call it a choice. Low probability of durable long-term control by the sponsoring directorate.'),
  t('They predicted I would choose it. They also predicted that once I had, Sloane would not be able to hold the leash for long. And Sloane read that, and signed, and proceeded anyway.'),
  q(SENDER, 'Sit with the second number. She was told she could not keep you. She did it regardless. Ask yourself what she wanted, if it was never control.'),
];
const distance = t('The sender has not told me who they are. I have proof they were there, and no proof of what they want. That distance is the only thing I am sure of.');

/** Retained, self-authenticated evidence: a Glass House item or the Chapter 3 verified date. */
export const canCompare6 = (s: GameState) =>
  s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn' || !!s.choices['c3.verified-date'];
/** She can withhold the breakfast only if she heard Celeste say it at the Glass House. */
export const canPredict6 = (s: GameState) => s.day.records.some((r) => r.key === 'mission.celeste-greeting');
/** The sender will not spend the truth on someone who lied to it. */
export const predictionPasses6 = (s: GameState) => !s.choices['c3.misdirect-rook'];

function rookLearns(x: GameState, key: string, source: string) {
  optionalNpc(x, 'rook')?.known.push({ key, source, event: x.revision });
}

export function proofChoices6(s: GameState): C6Choice[] {
  if (s.phase !== 'proof') return [];
  const proof = get6(s, 'rook-proof');
  if (!get6(s, 'proof-opened'))
    return [
      offer6('proof-open', 'Open the page', 'Look at what the sender actually has.', 'proof', (x) => {
        set6(x, 'proof-opened');
        return leaf;
      }),
      offer6('proof-decline', 'Refuse the contact tonight', 'You do not have to look. Nothing is lost by waiting.', 'counterpower', (x) => {
        set6(x, 'rook-proof', 'untested');
        set6(x, 'verify-method', 'refused');
        return [p('You leave it unopened. Whatever it is, it will still be a claim in the morning, and you will still be the one deciding.')];
      }),
    ];
  if (!get6(s, 'photo-custody'))
    return [
      offer6('proof-view', 'Read it where it sits, take nothing', 'Compare it without custody. No copy on your phone.', 'proof', (x) => {
        set6(x, 'photo-custody', 'none');
        return [p('You read it twice and give it back to the screen. No copy reaches your phone; nothing of this is anywhere Sloane can pull it.')];
      }),
      offer6(
        'proof-photo',
        'Photograph the page on the Axiom phone',
        'A copy you keep — on the monitored device. Sloane’s system can see what you capture.',
        'proof',
        (x) => {
          set6(x, 'photo-custody', 'phone');
          x.npcs.sloane.known.push({
            key: 'Evelynn captured a Meridian courier page on the monitored phone. The capture shows she held the page, not what it proves.',
            source: 'Axiom-monitored phone capture, Meridian courier page',
            event: x.revision,
          });
          return [
            p('You photograph it before the sender can withdraw it. The image is yours now. It is also on the phone Axiom monitors; somewhere in Sloane’s system, a record exists that you captured a Meridian page. You decided the copy was worth the trace.'),
          ];
        },
      ),
    ];
  if (!proof) {
    const c: C6Choice[] = [];
    if (canCompare6(s))
      c.push(
        offer6('verify-compare', 'Set the leaf against what you already kept', 'Available because you kept your own dated evidence.', 'proof', (x) => {
          // Always consistent: no current state yields a conflicting retained record (script resolution P1).
          set6(x, 'rook-proof', 'supported');
          set6(x, 'verify-method', 'comparison');
          note6(x, 'rook-proof', 'The Meridian leaf is consistent with Evelynn’s own retained, dated record.', 'Comparison against self-authenticated evidence');
          return [
            p('You put the leaf beside your own trail — the dated record you carried out yourself, the one thing in all of this you authenticated rather than were handed.'),
            p('The night lines up. 14 March, the small hours, a handoff that no summary in the Blackglass package spells out but that the location history cannot contradict. Two records, captured by two people who never met, agreeing on a night. That is not nothing. That is the first thing in this whole affair that holds.'),
            ...celesteCall,
          ];
        }),
      );
    if (canPredict6(s)) {
      const pass = predictionPasses6(s);
      c.push(
        offer6('verify-predict', 'Make the sender tell you something first', 'Withhold what you know. If they can predict it, they were there.', pass ? 'proof' : 'counterpower', (x) => {
          rookLearns(x, 'The page says she missed a breakfast. Whose. Tell me the name before I tell you, or the page is paper.', 'Evelynn’s challenge on the untraceable channel');
          const ask = [
            p('You do not have a clean record of your own to lay against it. So you do the other thing. You know one fact the page implies and the sender does not know you know it — because it did not come from the sender. It came from a woman who touched your arm at the Glass House and said you disappeared before breakfast.'),
            q('You', 'The page says she missed a breakfast. Whose. Tell me the name before I tell you, or the page is paper.'),
          ];
          set6(x, 'verify-method', 'prediction');
          if (!pass) {
            set6(x, 'rook-proof', 'broken');
            note6(x, 'rook-proof', 'The sender could not name the breakfast. The page remains a claim.', 'Failed prediction test');
            return [
              ...ask,
              q(SENDER, 'A breakfast. A colleague. I do not have every name a year on.'),
              p('A person who lived that night would have the name. The sender does not. Either they were never there, or they will not spend the truth to earn your trust. Either way, the page stays a claim.'),
            ];
          }
          set6(x, 'rook-proof', 'supported');
          rookLearns(x, 'The Marikina breakfast, Celeste Laurent’s table, the 02:40 handoff.', 'Demonstrated by the sender before Evelynn revealed it');
          note6(x, 'rook-proof', 'The sender named the Marikina breakfast and Celeste Laurent’s table before Evelynn revealed either.', 'Passed prediction test');
          return [
            ...ask,
            q(SENDER, 'The Marikina breakfast. Celeste Laurent’s table. Evelyn was expected and did not come; she was making the 02:40 handoff instead, and she never explained it. Ask your friend. She has been sulking about it for a year.'),
            p('You did not give the sender Celeste’s name, or the breakfast, or the sulk. The sender gave them to you. Whoever is holding that page was in Singapore that night, inside the identity you are wearing now.'),
            ...celesteCall,
          ];
        }),
      );
    }
    c.push(
      offer6('verify-refuse', 'Decline to test it at all', 'Let it stay a claim. You owe the sender nothing.', 'counterpower', (x) => {
        set6(x, 'rook-proof', 'untested');
        set6(x, 'verify-method', 'refused');
        return [
          p('You close the channel. Maybe the page is real; maybe it is the best forgery you have seen. You decline to spend your own knowledge finding out. The sender stays exactly what it has always been: a voice with an agenda you cannot see.'),
        ];
      }),
    );
    return c;
  }
  if (proof !== 'supported') return [];
  if (!get6(s, 'celeste'))
    return [
      offer6('celeste-let-be', 'Thank her and change the subject', 'Take the confirmation; leave her the version she loves.', 'proof', (x) => {
        set6(x, 'celeste', 'let-be');
        note6(x, 'celeste-breakfast', 'Celeste confirms Evelyn vanished the night before the Marikina breakfast and never explained.', 'Celeste on the fund’s line; firsthand social memory only');
        return [p('You let her keep the friend she remembers. You have what you needed, and she keeps what she has.'), ...oracle];
      }),
      offer6('celeste-press', 'Push her for more', 'She does not have more, and pushing costs.', 'proof', (x) => {
        set6(x, 'celeste', 'pressed');
        x.npcs.celeste.beliefs.push({
          key: 'Evelynn pressed about the Singapore breakfast like a lawyer',
          source: 'Evelynn’s questions on the fund’s line',
          event: x.revision,
        });
        note6(x, 'celeste-limit', 'Celeste had only the one memory. Pressing past it produced wariness, not information.', 'Evelynn’s own note: the limit of Celeste’s firsthand scope, not a fact', 'claim');
        return [
          q('Celeste', 'More? Darling, it was a breakfast. Why are you — is something wrong? You sound like a lawyer.'),
          p('She does not have more; she only had the one true thing, and pressing her for a dossier she never held makes her wary of you instead. You get a guarded silence, flagged in your own notes as her limit, not a fact.'),
          ...oracle,
        ];
      }),
    ];
  if (get6(s, 'oracle-seen')) return [];
  return [
    offer6('oracle-take', 'Take the assessment', 'Keep it. It changes what you can say to Sloane.', 'counterpower', (x) => {
      set6(x, 'oracle-seen', 'yes');
      note6(x, 'oracle', 'ORACLE predicted high voluntary adoption and low durable control; Sloane proceeded knowing it. Her motive is not stated.', 'ORACLE assessment supplied by the sender; motive unresolved');
      return [distance];
    }),
    offer6('oracle-leave', 'Refuse to carry it', 'You believe the page; you do not need the sender’s file to act.', 'counterpower', (x) => {
      set6(x, 'oracle-seen', 'no');
      return [p('You do not take the file. The leaf was enough; the rest is the sender’s to spend, not yours to hold.'), distance];
    }),
  ];
}
