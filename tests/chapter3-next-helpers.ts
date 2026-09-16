import { scene2, chooseEvening } from './chapter3-evening-helpers';
export const choose = chooseEvening;
export function morning() {
  let s = scene2();
  for (const id of ['no-contact', 'access-decline', 'sleep']) s = choose(s, id);
  return s;
}
export function information() {
  let s = morning();
  for (const id of [
    'begin-followup',
    'care-attend',
    'medical',
    'monitoring',
    'later-stages',
    'confidential',
    'plan-information',
    'defer-review',
    'verify-date',
    'compare-date',
    'keep-source',
  ])
    s = choose(s, id);
  return s;
}
