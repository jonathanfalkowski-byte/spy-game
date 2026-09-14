import { act, initialState, nodeOf } from '../src/state/reducer';
import type { GameState } from '../src/state/schema';
import type { Intent } from '../src/state/actions';
import type { AssessmentId, SearchId } from '../src/content/schema';
export function apply(s: GameState, a: Intent) {
  const next = act(s, a);
  if (next === s) throw new Error(`Fixture action rejected: ${JSON.stringify(a)} at ${nodeOf(s)}`);
  return next;
}
export function choice(s: GameState, id: string) {
  return apply(s, { type: 'CHOOSE_DIALOGUE', id });
}
export const advance = (s: GameState) => apply(s, { type: 'CONTINUE' });
export function toAnalysis(
  bond = 'friend',
  morning = 'yes',
  promotion = 'professional',
  benton = 'obey',
): GameState {
  let s = choice(initialState(), 'bond.' + bond);
  s = choice(s, 'morning.' + morning);
  s = advance(advance(s));
  s = choice(s, 'promotion.' + promotion);
  s = choice(s, 'benton.' + benton);
  s = advance(advance(s));
  for (const id of ['email', 'finance', 'news', 'intel'] as const)
    s = apply(s, { type: 'READ_DOCUMENT', id });
  return advance(s);
}
export function connect(s: GameState) {
  s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'email' });
  s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'finance' });
  return apply(s, { type: 'CONNECT_EVIDENCE', relation: 'conflict' });
}
export function toMaya(
  options: {
    assessment?: AssessmentId;
    search?: SearchId;
    conflict?: boolean;
    bond?: string;
    morning?: string;
  } = {},
) {
  let s = toAnalysis(options.bond, options.morning);
  if (options.conflict !== false) s = connect(s);
  if (options.search) s = apply(s, { type: 'SPEND_INVESTIGATION', id: options.search });
  s = apply(s, { type: 'REVIEW_ASSESSMENT', id: options.assessment ?? 'bounded' });
  s = apply(s, { type: 'SUBMIT_ASSESSMENT' });
  return advance(s);
}
export function finish(s: GameState) {
  s = choice(s, 'mayaPromotion.hurt');
  s = choice(s, 'invitation.yes');
  s = choice(s, 'disclosure.private');
  return advance(s);
}
