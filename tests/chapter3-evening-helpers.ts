import { act } from '../src/state/reducer';
import type { GameState } from '../src/state/schema';
import { atOffer, evening, endAccepted } from './day-helpers';
import { traverse } from './clinic-helpers';
import { runMission } from './mission-helpers';
export const chooseEvening = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.' + id });
  if (next === s) throw Error('Invalid evening choice ' + id + ' at ' + s.phase);
  return next;
};
export function scene1End(
  tier: 'access' | 'warning' | 'lookup' = 'access',
  options: {
    miss?: boolean;
    lie?: boolean;
    identity?: boolean;
    refused?: boolean;
    home?: boolean;
  } = {},
) {
  const day = endAccepted(
    evening(
      atOffer(
        tier === 'warning' ? 'maya' : 'comply',
        'arrest',
        'need',
        'evelyn',
        tier === 'lookup',
      ),
      options.refused,
    ),
    'call',
    options.lie ? 'lie' : 'medical',
    'checkin',
  );
  const clinic = traverse(day, {
    contact: options.miss ? 'morning.miss' : 'morning.answer',
    recoveryContact: options.identity ? 'contact.identity' : 'contact.quiet',
  });
  let s = act(runMission(clinic, { complete: options.home ? 'home.begin' : 'mission.begin' }), {
    type: 'CONTINUE_CHAPTER3',
  });
  s = chooseEvening(s, 'phone');
  return chooseEvening(s, 'scope');
}
export const scene2 = (
  tier: 'access' | 'warning' | 'lookup' = 'access',
  options: Parameters<typeof scene1End>[1] = {},
) => act(scene1End(tier, options), { type: 'CONTINUE_CHAPTER3_SCENE2' });
