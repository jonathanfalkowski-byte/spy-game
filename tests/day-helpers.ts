import { apply, finish, toMaya, choice, advance } from './helpers';
import type { GameState } from '../src/state/schema';
export const day = (s: GameState, id: string) => apply(s, { type: 'DAY_CHOOSE', id });
export function checkpoint(voss = false) {
  let s = toMaya({ search: voss ? 'personnel' : undefined });
  if (!voss) return finish(s);
  s = choice(s, 'mayaPromotion.hurt');
  s = choice(s, 'invitation.yes');
  s = choice(s, 'disclosure.voss');
  return advance(s);
}
export function atOffer(
  security = 'comply',
  intro = 'arrest',
  leverage = 'need',
  attention = 'evelyn',
  voss = false,
) {
  let s = checkpoint(voss);
  for (const id of [
    'day.begin',
    'file.open',
    'file.authorize',
    'security.turn',
    'security.' + security,
    'security.enter',
    'intro.' + intro,
    'leverage.' + leverage,
    'brief.mission',
    'attention.' + attention,
  ])
    s = day(s, id);
  return s;
}
export function evening(s = atOffer(), reconsider = false) {
  for (const id of reconsider
    ? ['offer.refuse', 'refusal.return', 'return.accept']
    : ['offer.accept'])
    s = day(s, id);
  for (const id of ['release.home', 'release.evening']) s = day(s, id);
  return s;
}
export function endAccepted(
  s: GameState,
  channel = 'meet',
  disclosure = 'medical',
  closure = 'checkin',
) {
  s = day(s, 'evening.' + channel);
  if (channel !== 'avoid')
    for (const id of ['disclose.' + disclosure, 'closure.' + closure, 'evening.end'])
      s = day(s, id);
  for (const id of ['warning.begin', 'warning.next', 'warning.last', 'warning.end']) s = day(s, id);
  return s;
}
