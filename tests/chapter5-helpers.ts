import type { GameState } from '../src/state/schema';
import { act } from '../src/state/reducer';
import { departure, assignment, evening, choose4 } from './chapter4-helpers';
export const c5 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER5_CHOOSE', id: 'chapter5.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
export const walk5 = (s: GameState, ids: string[]) => ids.reduce(c5, s);
export function end4(mode = 'public', motive = 'personal', scope = 'sex') {
  if (mode === 'public') {
    let s = assignment();
    for (const id of [
      'public-independent',
      'inspect-receipt',
      'inspect-template',
      'assess',
      'report-process',
      'interest-professional',
      'outside-desk',
      'favor-refuse',
      'notice-boundary',
      'power-protect',
      'quiet-evening',
      'collect',
    ])
      s = choose4(s, id);
    return s;
  }
  let s = evening(
    assignment(departure('julian-mercer')),
    mode !== 'professional',
    mode === 'backfire' ? 'exploit' : 'honest',
  );
  if (['professional', 'backfire'].includes(mode)) s = choose4(s, 'quiet-evening');
  else if (['intimacy-decline', 'flirt-only'].includes(mode)) s = choose4(s, mode);
  else {
    s = choose4(choose4(s, 'motive-' + motive), 'consent-' + scope);
    s = choose4(s, mode === 'withdraw' ? 'withdraw' : 'fade');
  }
  return choose4(s, 'collect');
}
export const dress5 = (s = end4()) =>
  walk5(s, ['begin', 'go-spend', 'spend-nothing', 'echo-listing', 'invitation-attend']);
