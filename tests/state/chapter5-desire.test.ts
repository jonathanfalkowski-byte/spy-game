import { sebastianScenes5 } from '../../src/content/chapter5-sebastian';
import { scene2, chooseEvening } from '../chapter3-evening-helpers';
import { assignment, choose4 } from '../chapter4-helpers';
import { it, expect } from 'vitest';
import { end4, walk5, dress5, c5 } from '../chapter5-helpers';
import { chapter5Scenes, chapter5Choices } from '../../src/content/chapter5';
import { get5, read5, cash5 } from '../../src/content/chapter5-model';
import { createChapter5Handoff } from '../../src/narrative/adult-scenes/chapter5';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { StateSchema } from '../../src/state/schema';
const want = (mode = 'professional') =>
  walk5(dress5(end4(mode)), [
    'look-glamorous',
    ...(mode === 'professional' ? ['attention-flirt'] : []),
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
  ]);
it.each(['personal', 'instrumental', 'mixed'])(
  'authenticates fresh %s scope and export stays read-only',
  (motive) => {
    const s = walk5(want(), ['want-julian', 'desire-' + motive, 'consent-sex']);
    const before = encodeSave(s);
    const workspace = createChapter5Handoff(s),
      spec = workspace.issue('fade_to_black');
    expect(workspace.verify(spec)).toEqual(spec);
    expect(encodeSave(s)).toBe(before);
    expect(
      spec.participantKnowledge
        .find((p) => p.characterId === 'julian-mercer')
        ?.records.some((r) => r.id === 'private-motive'),
    ).toBe(false);
    expect(() => workspace.issue('explicit_external')).toThrow();
    expect(get5(s, 'desire')).toBe(motive === 'instrumental' ? 'not-established' : 'wanted');
    const end = walk5(s, ['fade', 'place-jacket']);
    expect(decodeSave(encodeSave(end))).toEqual(end);
    expect(end.phase).toBe('complete');
    expect(get5(end, 'dependency')).toBeUndefined();
    const revoked = c5(s, 'withdraw');
    expect(() => createChapter5Handoff(revoked)).toThrow();
    expect(cash5(revoked)).toBe(cash5(s));
  },
  15_000,
);
it('supports no-sex, flirtation, refusal, uncertainty and instrumental public enjoyment', () => {
  const base = want();
  const agreed = walk5(base, ['want-julian', 'desire-personal', 'consent-no-sex']);
  expect(createChapter5Handoff(agreed).issue('fade_to_black').canonicalOutcomeId).toBe(
    'chapter5.physical-without-sex',
  );
  expect(get5(c5(agreed, 'fade'), 'intimacy')).toBe('physical-without-sex');
  for (const id of ['flirt-only', 'intimacy-decline']) {
    const end = walk5(base, ['want-julian', 'desire-instrumental', id]);
    expect(() => createChapter5Handoff(end)).toThrow();
    expect(cash5(end)).toBe(900);
  }
  for (const [id, desire] of [
    ['desire-refuse', 'wanted'],
    ['desire-uncertain', 'uncertain'],
    ['desire-no-interest', 'no-interest'],
    ['desire-instrumental', 'not-established'],
  ]) {
    const s = walk5(want('public'), ['want-salon', id]);
    expect(get5(s, 'desire')).toBe(desire);
    expect(get5(s, 'authorization')).toBeUndefined();
  }
}, 15000);
it('can decline every paid/public/personal offer and finish all non-Julian movements', () => {
  const old = end4(),
    s = walk5(dress5(old), [
      'look-minimal',
      'leave-room',
      'offer-decline',
      'service-axiom',
      'terms-refuse',
      'people-finish',
      'want-none',
      'place-unchanged',
    ]);
  expect(s.phase).toBe('complete');
  expect(cash5(s)).toBe(0);
  expect(get5(s, 'published')).toBeUndefined();
  expect(get5(s, 'obligation-count')).toBeUndefined();
  expect(chapter5Choices(s)).toEqual([]);
  expect(s.day).toEqual(old.day);
  expect(StateSchema.safeParse(s).success).toBe(true);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
it('bounds the maximal new-content path within schema 5 and reaches every authored scene', () => {
  const old = end4('professional');
  let s = walk5(old, [
    'begin',
    'inspect-packet',
    'inspect-messages',
    'inspect-receipts',
    'go-spend',
    'redeem-voucher',
    'buy-phone',
    'echo-intro',
    'invitation-attend',
    'look-provocative',
    'attention-photo',
    'attention-flirt',
    'leave-room',
    'concept-professional',
    'concept-glamorous',
    'concept-provocative',
    'concept-private',
    'negotiate-fee',
    'negotiate-name',
    'negotiate-image',
    'negotiate-approval',
    'negotiate-contact',
    'offer-accept',
    'withhold',
    'service-julian',
    'terms-backup',
    'message-maya',
    'message-sloane',
    'people-finish',
    'want-julian',
    'desire-mixed',
    'consent-no-sex',
    'fade',
    'place-phone',
  ]);
  expect(StateSchema.safeParse(s).success).toBe(true);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  expect(encodeSave(s).length).toBeLessThan(2000000);
  const reached = new Set(s.history.map((h) => h.node));
  // This path runs on the frozen revision-18 engine; revision-19 salon scenes are covered in revision19-sebastian.test.ts.
  for (const scene of chapter5Scenes.filter((scene) => !Object.hasOwn(sebastianScenes5, scene.id.slice('chapter5.'.length))))
    expect(reached.has(scene.id), scene.id).toBe(true);
  expect(read5(s, 'placement')?.text).toContain('new phone');
  expect(s.history.slice(0, old.history.length)).toEqual(old.history);
});

it('preserves schema-5 capacity after an exploratory historical route', () => {
  const path = (s: ReturnType<typeof scene2>, ids: string[]) =>
    ids.reduce((state, id) => chooseEvening(state, id), s);
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
  s = path(s, ['open-calendar', 'book-sloane', 'move-rook', 'depart-own']);

  s = assignment(s);
  for (const id of [
    'public-independent',
    'inspect-receipt',
    'inspect-template',
    'inspect-witness',
    'assess',
    'report-accuse',
    'interest-distant',
    'outside-desk',
    'favor-accept',
    'notice-boundary',
    'power-exploit',
    'quiet-evening',
    'collect',
  ])
    s = choose4(s, id);
  s = walk5(s, [
    'begin',
    'inspect-packet',
    'inspect-receipts',
    'inspect-messages',
    'go-spend',
    'redeem-voucher',
    'buy-phone',
    'echo-link',
    'invitation-attend',
    'look-glamorous',
    'attention-photo',
    'attention-network',
    'leave-room',
    'concept-professional',
    'concept-glamorous',
    'concept-provocative',
    'negotiate-fee',
    'negotiate-name',
    'negotiate-image',
    'negotiate-approval',
    'negotiate-contact',
    'offer-accept',
    'publish',
    'service-self',
    'terms-backup',
    'message-maya',
    'message-sloane',
    'people-finish',
    'want-salon',
    'desire-mixed',
    'place-phone',
  ]);
  expect(StateSchema.safeParse(s).success).toBe(true);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  expect(s.history.length).toBeLessThanOrEqual(1000);
  expect(s.day.records.length).toBeLessThanOrEqual(100);
});
