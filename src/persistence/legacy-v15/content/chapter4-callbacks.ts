import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block } from './schema';
import { old, oldRecord } from './chapter4-model';
/** Read the earned record; these private reminders do not transmit it. */
export function carriedCallbacks4(s: GameState): Block[] {
  const blocks: Block[] = [];
  if (old(s, 'memo') === 'pressure')
    blocks.push(
      p(
        'Mercer’s office has withdrawn the follow-up. Marcus’s refusal is still above it in the thread. The fee voucher remains in your bag.',
      ),
    );
  else if (oldRecord(s, 'memo-correction'))
    blocks.push(
      p(
        'You saved Marcus’s qualification with the original note. Both versions remain in the chain; the latest says no further advisory work was agreed.',
      ),
    );
  else if (old(s, 'memo') === 'allow')
    blocks.push(
      p(
        'Marcus’s summary still uses “advisory relationship.” You let the wording stand. Your narrower acceptance remains attached.',
      ),
    );
  else if (old(s, 'memo') === 'retain')
    blocks.push(p('Marcus’s note is saved. The reply beneath it is empty.'));
  if (oldRecord(s, 'procurement') || oldRecord(s, 'marcus-access'))
    blocks.push(
      p('The procurement address is still available for a proposal. There is no order beside it.'),
    );
  return blocks;
}
/** Called only once a call is actually kept, never while a later call is pending. */
export function contactCallback4(s: GameState, who: string): Block[] {
  if (who === 'rook') {
    if (old(s, 'misdirect-rook'))
      return [
        q('Unknown sender', 'You said you sent everything to Sloane. I cannot check your outbox.'),
      ];
    if (old(s, 'confirm-rook'))
      return [
        q(
          'Unknown sender',
          'You said the date checked out. Keep the record. You may want to read the next one differently.',
        ),
      ];
    return [q('Unknown sender', 'I gave you a date. Today, a docket number.')];
  }
  if (who === 'voss')
    return [
      q(
        'Voss',
        old(s, 'qualification') === 'formal'
          ? 'You asked me to request a scope review. I have no determination to give you yet. My signed qualification stands.'
          : old(s, 'qualification') === 'circulate'
            ? 'Keep the signed qualification with the cover sheet. I can answer for the clinical scope, not their use of it.'
            : 'You left with the signed copy. I have not sent it to scheduling.',
      ),
    ];
  if (who === 'julian-mercer' && oldRecord(s, 'memo-correction'))
    return [
      q(
        'Julian Mercer',
        'I received the qualification to Marcus’s note. Today’s discussion ended today. This would be a new piece of work.',
      ),
    ];
  if (who === 'sloane' && old(s, 'report-rook'))
    return [
      q(
        'Sloane',
        'I have your report about the unknown sender. Keep the message. I have not asked you to send your patient file.',
      ),
    ];
  if (who === 'sloane' && old(s, 'partial-rook'))
    return [q('Sloane', 'You reported a date request. You gave me no source for it.')];
  if (who === 'maya') {
    const known = s.npcs.maya.known;
    if (known.some((k) => k.key.startsWith('Signed Voss qualification:')))
      return [
        q(
          'Maya',
          'I read the qualification you sent. I would keep the signed version, whatever anyone puts on the cover sheet.',
        ),
      ];
    if (known.some((k) => k.key.includes('paid discussion') || k.key.includes('fee voucher')))
      return [
        q(
          'Maya',
          'You told me about the paid work. Was it useful to do something you could actually finish?',
        ),
      ];
  }
  return [];
}
