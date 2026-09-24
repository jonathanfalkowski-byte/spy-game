import { expect, it } from 'vitest';
import golden from '../fixtures/rev19-golden-ledgers.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { readingBlocks, renderChoiceText } from '../../src/ui/reading-presentation';
import { evening, choose4 as c4 } from '../chapter4-helpers';
import { end4, walk5, dress5 } from '../chapter5-helpers';
import { toRevision20 } from '../rev20-ledger';
import { chapter5Choices } from '../../src/content/chapter5';

/** What a reader of this save sees, at the save's own revision unless another is forced. */
const shown = (s: GameState, revision = s.contentRevision) =>
  s.history.flatMap((h) => readingBlocks(h.blocks, h.node, revision).map((b) => b.text)).join('\n');

const route = (name: string) => golden.routes.find((r) => r.name === name)!.ledger as GameEvent[];
const act20 = (s: GameState, id: string) => act(s, { type: 'CHAPTER5_CHOOSE', id } as Parameters<typeof act>[1]);
/** A golden route's decisions played as a revision-20 game (Aster's menu is shorter there). */
const play20 = (name: string) => replay(toRevision20(route(name)), 20);

/** Review 2026-09-24, Group 3: phrases a revision-20 reader should never meet in Chapters 1–5. */
const RETIRED = [
  'Provider: ',
  'cannot reverse it',
  'You can surrender the phone, demand an explanation',
  'Adrian remained silent after the simulation.',
  'You have either come down from the apartment',
  'or the same public call you saved',
  'You sound different.',
  'scope remains unset',
  'within the agreed scope',
  'No Adrian binding',
  'does not create a new promise or a no-show',
  'You can practice the approach, ask about its limitations',
  'Maya is the closest thing I have to family inside Axiom. She knows',
];

it.each(golden.routes.map((r) => r.name))('retires the review’s legal and menu prose for revision 20 only: %s', (name) => {
  const r19 = replay(route(name), 19);
  const r20 = play20(name);
  const old = shown(r19);
  const now = shown(r20);
  for (const phrase of RETIRED) expect(now, phrase).not.toContain(phrase);
  // The same save, read at revision 19, is exactly what it always was.
  expect(old).toContain('You can surrender the phone, demand an explanation');
  expect(old).toContain('You sound different.');
  // Dropped threads now land.
  expect(now).toContain('Benton went on leave an hour ago');
  expect(now).toContain('Your breach stays in my drawer.');
  expect(now).toContain('That is not a cold.');
  expect(now).toContain('Nine weeks before the file ever reached your desk.');
  if (old.includes('Axiom isn’t the only place that can pay for your judgment.'))
    expect(now).toContain('Marcus tells me you left the Glass House early last night.');
}, 30_000);

it('makes an evidence-free Benton guess cost Sloane’s confidence from revision 20', () => {
  const r19 = replay(route('julian-intimate'), 19);
  const r20 = play20('julian-intimate');
  expect(r20.mission.reasoning).toBe('unsupported');
  expect(shown(r20)).toContain('You named Benton on a guess.');
  expect(shown(r19)).not.toContain('You named Benton on a guess.');
  expect(decodeSave(encodeSave(r20))).toEqual(r20);
});

it('explains the frozen accounts wherever the settled balance is shown', () => {
  const now = shown(play20('public-want-none'));
  expect(now).toContain('Available settled money: $0.');
  expect(now).toContain('Adrian Vale’s accounts froze');
});

it('lets the mirror be looked into before it is named, and keeps “Look away” honest', () => {
  const now = shown(play20('julian-intimate'));
  expect(now).toContain('Something moves at the edge of the glass.');
  expect(now).toContain('You look properly this time.');
  expect(renderChoiceText('Pass the mirror without looking', 'clinic.mirror', 20)).toBe('Look away');
  expect(renderChoiceText('Pass the mirror without looking', 'clinic.mirror', 19)).toBe('Pass the mirror without looking');
});

it.each([
  ['sex', ['Still yes?', 'The lamp goes off.', 'it was not part of the work']],
  ['no-sex', ['going no further than you said', 'He finds your shoes, kisses you once']],
] as const)('writes Julian’s Chapter 4 %s evening as a scene at revision 20', (scope, lines) => {
  // The helpers build older-revision states; replay the same choices as a revision-20 game.
  const s = replay(c4(c4(c4(evening(), 'motive-personal'), 'consent-' + scope), 'fade').ledger, 20);
  expect(s.contentRevision).toBe(20);
  const now = shown(s);
  for (const line of lines) expect(now).toContain(line);
  expect(now).not.toMatch(/fade to black|Participants: adult|agreed scope/);
  const old = shown(s, 19);
  expect(old).toContain(scope === 'sex' ? 'The encounter remains private as the scene fades.' : 'You share the closeness you agreed to, without sex.');
  expect(renderChoiceText('Continue within the agreed scope · fade to black', 'chapter4.handoff', 20)).toBe('Go in');
});

const want5 = () =>
  walk5(dress5(end4('professional')), [
    'look-glamorous',
    'attention-flirt',
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
  ]);

it.each([
  ['sex', ['Tell me again. I want to hear it in the room.', 'asks nothing about Axiom']],
  ['no-sex', ['It is its own kind of heat.', 'does not ask when']],
] as const)('writes Julian’s Chapter 5 %s evening as a scene at revision 20', (scope, lines) => {
  const s = replay(walk5(want5(), ['want-julian', 'desire-personal', 'consent-' + scope, 'fade']).ledger, 20);
  const now = shown(s);
  for (const line of lines) expect(now).toContain(line);
  expect(now).not.toMatch(/Private time ends within the agreed scope|fade to black/);
  expect(shown(s, 19)).toContain('Later, dressed in the clothes you arrived in');
});

it('collapses the Aster negotiation to two levers and four named offers at revision 20', () => {
  const ledger = route('public-want-none');
  const at = ledger.findIndex((e) => String((e.action as { id?: string }).id).startsWith('chapter5.concept-'));
  const labels = (s: GameState) => chapter5Choices(s).map((c) => c.label);
  const r19 = replay(ledger.slice(0, at), 19);
  const r20 = replay(toRevision20(ledger.slice(0, at)), 20);
  expect(`${r20.scene}.${r20.phase}`).toBe('chapter5.offer');
  expect(chapter5Choices(r19).length).toBeGreaterThan(10);
  expect(labels(r20)).toEqual([
    'Ask for a higher fee',
    'Keep your face and full name out of it',
    'Take the professional profile · $400',
    'Take the fashion-led piece · $600',
    'Take the sensual portrait, fully clothed · $800',
    'Take the private sitting, never printed · $100',
    'Decline the editorial work',
  ]);
  const privacy = act20(r20, 'chapter5.negotiate-private');
  expect(privacy.choices['c5.name-use']).toBe('initials');
  expect(privacy.choices['c5.image-use']).toBe('none');
  expect(labels(privacy)).not.toContain('Keep your face and full name out of it');
  expect(chapter5Choices(privacy).find((c) => c.id === 'chapter5.offer-accept-provocative')!.hint).toContain('as E. Vale, words only');
});
