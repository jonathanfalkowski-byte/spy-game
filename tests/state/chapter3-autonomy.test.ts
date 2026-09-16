import { scene2 } from '../chapter3-evening-helpers';
import { it, expect } from 'vitest';
import { information, choose, morning } from '../chapter3-next-helpers';
import { nextChoices, nextSceneDefinitions } from '../../src/content/chapter3-next';
import { calendarInvites, disclosureText } from '../../src/content/chapter3-autonomy';
import { StateSchema, type GameState } from '../../src/state/schema';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { replay, act } from '../../src/state/reducer';
const path = (s: GameState, ids: string[]) => ids.reduce((s, id) => choose(s, id), s);
function leverage() {
  return path(information(), [
    'open-invitation',
    'request-brief',
    'accept-session',
    'open-case',
    'case-question',
    'reception-embrace',
    'photo-publish',
    'read-marcus',
    'authenticate-note',
  ]);
}
function review() {
  return path(information(), [
    'open-invitation',
    'decline-inquiry',
    'enter-review',
    'review-clinical',
    'review-cover',
    'review-routing',
    'review-compare',
    'qualification-formal',
  ]);
}
const valid = (s: GameState) => {
  expect(StateSchema.parse(s)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  expect(replay(s.ledger, 14)).toEqual(s);
};
it.each(['correct', 'allow', 'retain', 'negotiate', 'pressure'])(
  'supports authenticated Marcus %s',
  (mode) => {
    const old = leverage(),
      s = choose(old, 'memo-' + mode);
    valid(s);
    expect(s.day.records.find((r) => r.key === 'c3.marcus-note')?.text).toContain('no contract');
    expect(s.choices['c3.paid']).toBe('600');
    if (mode === 'pressure') {
      expect(s.choices['c3.helix-window']).toBe('withdrawn');
      expect(s.day.records.find((r) => r.key === 'c3.delivery.julian-mercer')?.text).toContain(
        'Marcus forwards Evelynn’s actual message to Mercer',
      );
      expect(s.npcs.marcus.beliefs.at(-1)?.source).toBe('Her exact written demand');
    }
    if (mode === 'retain') expect(s.npcs).toEqual(old.npcs);
  },
);
it('gives Helix refusal sequential evidence and a meaningful institutional outcome', () => {
  const s = review();
  valid(s);
  expect(s.choices['c3.paid']).toBeUndefined();
  expect(s.proof.some((p) => p.key === 'c3.qualification')).toBe(true);
  for (const k of [
    'review-clinical',
    'review-cover',
    'review-routing',
    'scope-gap',
    'qualification-routed',
    'scope-review',
  ])
    expect(s.day.records.some((r) => r.key === 'c3.' + k)).toBe(true);
  expect(s.npcs.sloane).toEqual(information().npcs.sloane);
  expect(nextChoices(s).some((c) => c.id.includes('memo-'))).toBe(false);
});
it('sends exactly the selected scope only to its named recipient; silence delivers nothing', () => {
  const old = choose(leverage(), 'memo-retain');
  let s = choose(old, 'draft-public-association');
  const words = disclosureText(s, 'partial');
  s = choose(s, 'send-maya-partial');
  expect(s.npcs.maya.known.at(-1)?.key).toBe(words);
  expect(s.npcs.maya.known.at(-1)?.key).not.toContain('Helix');
  expect(s.npcs.sloane).toEqual(old.npcs.sloane);
  const draft = choose(s, 'draft-marcus-note');
  const silent = choose(draft, 'keep-draft');
  expect(silent.npcs).toEqual(draft.npcs);
  expect(silent.day.records).toEqual(draft.day.records);
  valid(silent);
});
it('only offers earned invitations, and records actual waiting without inventing discovery', () => {
  let s = path(leverage(), ['memo-retain', 'open-calendar']);
  expect(calendarInvites(s)).toEqual(['sloane', 'julian-mercer', 'rook']);
  s = path(s, ['book-sloane', 'book-julian-mercer', 'wait-rook', 'depart-julian-mercer']);
  expect(s.phase).toBe('departure');
  expect(s.choices['c3.cal-sloane']).toBe('waiting-confirmed');
  expect(s.day.records.find((r) => r.key === 'c3.waiting-sloane')?.text).toContain(
    'No explanation',
  );
  expect(nextChoices(s)).toHaveLength(0);
  valid(s);
  const alternate = choose(review(), 'open-calendar');
  expect(calendarInvites(alternate)).toEqual(['sloane', 'rook', 'voss']);
});
it('negotiates actual schedules, and keeps untrue excuses attributed to their speaker', () => {
  let s = path(review(), [
    'open-calendar',
    'move-sloane',
    'excuse-voss',
    'book-rook',
    'depart-rook',
  ]);
  expect(s.choices['c3.cal-sloane']).toBe('18:45');
  expect(s.npcs.voss.known.at(-1)?.key).toBe('Voss has ordered me to remain home tonight.');
  expect(s.npcs.voss.known.at(-1)?.source).toContain('false assertion');
  expect(s.day.records.some((r) => r.key === 'c3.waiting-sloane')).toBe(false);
  valid(s);
});
it('keeps an exploratory long path inside schema-5 capacity and blocks unavailable actions', () => {
  let s = path(scene2('lookup', { miss: true, lie: true, home: true }), [
    'call',
    'apologize',
    'correct-account',
    'tell-identity',
    'arrange-contact',
    'pressure-warn',
    'send-followup',
    'sleep',
  ]);
  s = path(s, [
    'begin-followup',
    'morning-call',
    'care-remote',
    'medical',
    'monitoring',
    'later-stages',
    'confidential',
    'plan-refuse',
    'reserve-review',
    'verify-date',
    'compare-date',
    'ask-source',
    'report-rook',
    'partial-rook',
    'confirm-rook',
    'misdirect-rook',
    'keep-source',
    'open-invitation',
    'request-brief',
    'check-audience',
    'check-axiom',
    'accept-session',
    'open-case',
    'case-qualified',
    'reception-exploit',
    'photo-publish',
    'read-marcus',
    'authenticate-note',
    'memo-pressure',
  ]);
  for (const [key, recipient, mode] of [
    ['instruction', 'rook', 'full'],
    ['public-association', 'julian-mercer', 'partial'],
    ['marcus-note', 'rook', 'full'],
    ['fee', 'julian-mercer', 'misdirect'],
  ])
    s = path(s, ['draft-' + key, `send-${recipient}-${mode}`]);
  expect(nextChoices(s).filter((c) => c.id.includes('draft-'))).toHaveLength(0);
  s = path(s, ['open-calendar', 'book-sloane', 'move-rook', 'depart-own']);
  valid(s);
  expect(s.day.records.length).toBeLessThanOrEqual(100);
  expect(act(s, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.memo-pressure' })).toBe(s);
});

it('reaches every new phase on actual complete routes with a working departure', () => {
  const routes = [
    path(leverage(), [
      'memo-retain',
      'draft-instruction',
      'send-sloane-partial',
      'open-calendar',
      'book-sloane',
      'depart-sloane',
    ]),
    path(review(), ['open-calendar', 'book-voss', 'depart-voss']),
  ];
  const visited = new Set(routes.flatMap((s) => s.history.map((h) => h.node)));
  for (const phase of Object.keys(nextSceneDefinitions))
    expect(visited.has(('chapter3.' + phase) as never), phase).toBe(true);
  for (const s of routes) {
    expect(s.phase).toBe('departure');
    valid(s);
  }
});
