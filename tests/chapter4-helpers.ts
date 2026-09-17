import { chapter4Choices } from '../src/content/chapter4';
import { scene2, chooseEvening as c3 } from './chapter3-evening-helpers';
import { act } from '../src/state/reducer';
import type { GameState } from '../src/state/schema';
export const destinations = ['sloane', 'julian-mercer', 'rook', 'voss', 'maya', 'own'] as const;
export function departure(
  destination: (typeof destinations)[number] = 'own',
  options: {
    late?: boolean;
    helix?: boolean;
    pressure?: boolean;
    published?: boolean;
    extra?: string[];
    disclose?: string[];
  } = {},
) {
  let s = scene2();
  const helix = options.helix ?? destination === 'julian-mercer';
  const ids = [
    'call',
    'tell-home',
    'arrange-contact',
    'access-decline',
    'sleep',
    'begin-followup',
    'morning-call',
    'care-attend',
    'plan-information',
    'defer-review',
    'verify-date',
    'compare-date',
    'keep-source',
    'open-invitation',
  ];
  if (helix)
    ids.push(
      'request-brief',
      'accept-session',
      'open-case',
      'case-qualified',
      'reception-embrace',
      options.published ? 'photo-publish' : 'photo-refuse',
      'read-marcus',
      'authenticate-note',
      options.pressure ? 'memo-pressure' : 'memo-retain',
    );
  else
    ids.push(
      'decline-inquiry',
      'enter-review',
      'review-clinical',
      'review-cover',
      'review-routing',
      'review-compare',
      'qualification-formal',
    );
  ids.push(...(options.disclose ?? []), 'open-calendar', ...(options.extra ?? []));
  if (destination !== 'own') ids.push((options.late ? 'move-' : 'book-') + destination);
  ids.push('depart-' + destination);
  for (const id of ids) s = c3(s, id);
  return s;
}
export function choose4(s: GameState, id: string) {
  const next = act(s, { type: 'CHAPTER4_CHOOSE', id: 'chapter4.' + id });
  if (next === s) throw Error(`Unavailable Chapter4 choice ${id} at ${s.phase}`);
  return next;
}

export function assignment(s = departure()) {
  s = choose4(choose4(s, 'begin'), 'payoff');
  for (let i = 0; i < 10 && s.phase === 'consequences'; i++) {
    const choices = chapter4Choices(s);
    s = choose4(
      s,
      choices.find((v) => v.id.endsWith('next-day') || v.id.includes('.resolve-'))!.id.slice(9),
    );
  }
  return choose4(s, 'reader-pass');
}
export function evening(
  s = assignment(departure('julian-mercer')),
  flirt = true,
  method = 'honest',
) {
  s = choose4(s, 'accept-audit');
  for (const id of [
    'inspect-receipt',
    'inspect-template',
    'assess',
    'report-process',
    flirt ? 'interest-attraction' : 'interest-professional',
    flirt ? 'outside-flirt' : 'outside-professional',
    'favor-accept',
    'notice-boundary',
    'power-' + method,
  ])
    s = choose4(s, id);
  return s;
}
