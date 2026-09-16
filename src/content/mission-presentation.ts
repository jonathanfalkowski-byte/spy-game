import type { Block, NodeId } from './schema';
import { paragraph as p, speech as s, thought as t } from './schema';
import type { GameState } from '../state/schema';

/**
 * Current-run connective prose for the Glass House. These blocks are rendered
 * beside the authored history but are deliberately not written to the event
 * ledger, so frozen content-9 saves retain their original replay exactly.
 */
export function missionPresentation(state: GameState): Block[] {
  if (state.scene !== 'mission') return [];
  const node = `${state.scene}.${state.phase}` as NodeId;
  if (node === 'mission.arrival')
    return [
      p(
        'Through the revolving doors you can see the coat check, invitation desk and dark elevator doors in one line of sight. You are still beneath the canopy when Sloane speaks through the earpiece.',
      ),
      s('Sloane · earpiece', '“You have one clean opportunity. Every extra conversation becomes part of the room’s memory.”'),
    ];
  if (node === 'mission.marcusReply')
    return [
      p(
        'A guest calls Marcus from the central table. He gives her a raised finger without looking away from you, holding the interruption at the edge of the conversation. The gesture is courteous; the delay is deliberate.',
      ),
      t('He is making me choose whether to follow his attention or make him spend more of it on me.'),
    ];
  if (node === 'mission.celesteReply')
    return [
      p(
        'Celeste lowers her voice as another guest passes between the window and the central table, as if the room has become a third person in the conversation.',
      ),
      t('Whatever she remembers, she is measuring how much of it I will claim in public.'),
    ];
  if (node === 'mission.hub' && state.mission.leads.length > 0)
    return [
      p(
        state.mission.remaining > 0
          ? 'One investigation has already cost you a stretch of attention. There is still room for another lead, though the quartet is nearing the end of its set.'
          : 'Both opportunities are spent. The quartet is nearing the end of its set; you can review what you learned or give Sloane your assessment.',
      ),
    ];
  if (node === 'mission.method')
    return [
      p(
        'At the edge of the gallery, the party briefly settles into a pattern: Marcus keeps the private table in view, Benton is not yet visible, and the service door opens whenever a tray is needed. Sloane waits for your method before she commits her own attention to the window.',
      ),
      t('The operation is no longer a question on a brief. It is a room moving around one moment I may miss.'),
    ];
  return [];
}
