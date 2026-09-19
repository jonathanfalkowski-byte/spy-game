import { beforeAll, expect, it } from 'vitest';
import { act, reducer, replay, replayPrefix, availableIntents } from '../../src/state/reducer';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { morning, choose } from '../chapter3-next-helpers';
import { departure, assignment, choose4 } from '../chapter4-helpers';
import { end4, c5, walk5 } from '../chapter5-helpers';
import { nextChoices } from '../../src/content/chapter3-next';
import { chapter4Choices } from '../../src/content/chapter4';
import { chapter5Choices } from '../../src/content/chapter5';
import { read5 } from '../../src/content/chapter5-model';
import { uncorrectedExcuse5 } from '../../src/content/chapter5-reward';
import { coffeeBeats5, apartmentEndingArt5 } from '../../src/ui/chapter5-beats';
import { harbourShotPlan5 } from '../../src/content/chapter5-harbour-shots';
import type { GameState } from '../../src/state/schema';
import { deriveConsequences } from '../../src/state/consequences';

const upgrade = (s: GameState) => act(s, { type: 'CONTINUE_AUDIT_REVISION' });
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
let paid: GameState, free: GameState;
beforeAll(() => {
  paid = end4('professional');
  free = end4();
}, 30000);
it('authenticates explicit continuation at 13/14/15/16, preserving all historical data', () => {
  for (const old of [morning(), departure(), free, c5(paid, 'begin')]) {
    const next = upgrade(old);
    expect(next.contentRevision).toBe(17);
    expect({
      ...next,
      contentRevision: old.contentRevision,
      revision: old.revision,
      ledger: old.ledger,
    }).toEqual(old);
    expect(next.ledger.slice(0, -1)).toEqual(old.ledger);
    expect(replay(next.ledger, 17)).toEqual(next);
    expect(replayPrefix(next.ledger.slice(0, -1), 17)).toEqual(old);
    expect(decodeSave(encodeSave(old))).toEqual(old);
    expect(decodeSave(encodeSave(next))).toEqual(next);
    const forged = structuredClone(old);
    forged.choices['invented'] = 'yes';
    expect(upgrade(forged)).toBe(forged);
    expect(
      reducer(old, { type: 'CONTINUE_AUDIT_REVISION', expectedRevision: old.revision - 1 }),
    ).toBe(old);
    expect(upgrade(next)).toBe(next);
    expect(() => replay(old.ledger, 17)).toThrow();
    expect(() =>
      decodeSave(
        JSON.stringify({
          schemaVersion: 5,
          contentVersion: 17,
          state: { ...old, contentRevision: 17 },
        }),
      ),
    ).toThrow();
  }
}, 30000);
it.each([false, true])(
  'H1 reports only an actual date request; verify=%s',
  (verify) => {
    let s = upgrade(morning());
    for (const id of [
      'begin-followup',
      'care-attend',
      'plan-information',
      'defer-review',
      verify ? 'verify-date' : 'defer-date',
      ...(verify ? ['compare-date'] : []),
    ])
      s = choose(s, id);
    expect(nextChoices(s).some((c) => c.id === 'chapter3.partial-rook')).toBe(verify);
    const after = act(s, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.partial-rook' });
    if (verify)
      expect(
        after.npcs.sloane.known.some(
          (k) => k.key === 'I requested the date of a clinical preparation instruction.',
        ),
      ).toBe(true);
    else {
      expect(after).toBe(s);
      expect(text(s)).not.toContain('switch from the patient-record thread');
    }
    expect(decodeSave(encodeSave(after))).toEqual(after);
  },
  15000,
);

function finishPublic(s: GameState) {
  return [
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
  ].reduce(choose4, s);
}
it.each(['excused', 'corrected', 'cancelled', 'missed'])(
  'M1 preserves authenticated %s callback',
  (kind) => {
    const extra =
      kind === 'cancelled' ? ['cancel-maya'] : kind === 'missed' ? ['book-maya'] : ['excuse-maya'];
    let s = upgrade(departure('own', { extra }));
    s = choose4(choose4(s, 'begin'), 'payoff');
    if (kind === 'corrected') s = choose4(s, 'correct-maya');
    while (s.phase === 'consequences') {
      const c = chapter4Choices(s).find(
        (c) => c.id.endsWith('next-day') || c.id.includes('.resolve-'),
      )!;
      s = choose4(s, c.id.slice(9));
    }
    s = finishPublic(choose4(s, 'reader-pass'));
    s = c5(c5(s, 'begin'), 'inspect-messages');
    expect(uncorrectedExcuse5(s, 'maya')).toBe(kind === 'excused');
    expect(text(s).includes('maya thread still contains your medical excuse')).toBe(
      kind === 'excused',
    );
    expect(text(s).includes('maya thread still has an unresolved missed-call')).toBe(
      kind === 'missed',
    );
    expect(decodeSave(encodeSave(s))).toEqual(s);
    expect(() => deriveConsequences(s)).not.toThrow();
  },
  20000,
);

it('continues the full revised Chapter3 path into Chapter4 and Chapter5 without reverting epochs', () => {
  let s = upgrade(morning());
  for (const id of [
    'begin-followup',
    'care-attend',
    'plan-information',
    'defer-review',
    'defer-date',
    'close-source',
    'open-invitation',
    'decline-inquiry',
    'enter-review',
    'review-clinical',
    'review-cover',
    'review-routing',
    'review-compare',
    'qualification-formal',
    'open-calendar',
    'depart-own',
  ])
    s = choose(s, id);
  expect(s.phase).toBe('departure');
  expect(s.contentRevision).toBe(17);
  s = finishPublic(assignment(s));
  s = walk5(s, [
    'begin',
    'go-spend',
    'spend-save',
    'echo-listing',
    'invitation-decline',
    'look-minimal',
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-unchanged',
  ]);
  expect(s.phase).toBe('complete');
  expect(s.contentRevision).toBe(17);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  expect(replay(s.ledger, 17)).toEqual(s);
}, 20000);

it('M2/M3 exploration remains bounded while acceptance can return to any explored concept', () => {
  let s = walk5(upgrade(free), [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-decline',
    'look-minimal',
    'leave-room',
  ]);
  for (const id of ['professional', 'glamorous', 'provocative', 'private'])
    s = c5(s, 'concept-' + id);
  expect(chapter5Choices(s).filter((c) => c.id.startsWith('chapter5.concept-'))).toHaveLength(0);
  expect(act(s, { type: 'CHAPTER5_CHOOSE', id: 'chapter5.concept-professional' })).toBe(s);
  s = walk5(s, ['negotiate-fee', 'negotiate-name', 'negotiate-image']);
  const offered = chapter5Choices(s).find((c) => c.id === 'chapter5.offer-accept-professional')!;
  expect(offered.hint).toContain('Fee: $500');
  expect(offered.hint).toContain('Name: E. Vale');
  expect(offered.hint).toContain('Image: none');
  const before = s;
  s = c5(s, 'offer-accept-professional');
  expect(s.revision).toBe(before.revision + 1);
  expect(s.phase).toBe('proof');
  expect(read5(s, 'editorial-terms')?.text).toBe(offered.hint);
  expect(s.choices['c5.cash']).toBe('0');
  s = walk5(s, [
    'publish',
    'service-self',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-unchanged',
  ]);
  expect(s.phase).toBe('complete');
  expect(s.choices['c5.cash']).toBe('440');
  expect(decodeSave(encodeSave(s))).toEqual(s);
}, 20000);

it.each([16, 17])(
  'H2 binds ordered coffee beats and only the exact phone ending for revision %s',
  (revision) => {
    let s = walk5(revision === 17 ? upgrade(paid) : paid, [
      'begin',
      'go-spend',
      'buy-phone',
      'echo-listing',
      'invitation-attend',
      'look-professional',
    ]);
    const before = s;
    s = c5(s, 'attention-coffee');
    const entry = s.history.find((h) =>
      h.blocks.some((b) => b.text.startsWith('You leave the programme table and wait outside')),
    )!;
    const beats = coffeeBeats5(s, entry)!;
    expect(beats.map((b) => b.shotId)).toEqual([
      'c05.s06.shot14-wait',
      'c05.s06.shot12-entrance',
      'c05.s06.shot15-departed',
      'c05.s06.shot13-return',
    ]);
    expect(beats.map((b) => !!b.file)).toEqual([false, true, true, true]);
    expect(beats[0].blocks.map((b) => b.text).join(' ')).not.toContain('Julian arrives');
    expect(beats[1].blocks.map((b) => b.text).join(' ')).not.toContain('goodbye');
    expect(harbourShotPlan5(before, 'attention-coffee').at(-1)?.props).toContain(
      'coffee-carried-or-off-frame',
    );
    expect(harbourShotPlan5(s, 'attention-photo')[0].props).toContain(
      'coffee-carried-or-off-frame',
    );
    expect(apartmentEndingArt5(s)).toBeUndefined();
    s = walk5(s, [
      'leave-room',
      'offer-decline',
      'service-municipal',
      'terms-refuse',
      'people-finish',
      'want-none',
    ]);
    expect(apartmentEndingArt5(s)).toBeUndefined();
    s = c5(s, 'place-phone');
    expect(s.phase).toBe('complete');
    expect(apartmentEndingArt5(s)?.shotId).toBe('c05.s12.shot05-phone');
    expect(decodeSave(encodeSave(s))).toEqual(s);
    for (const [key, value] of [
      ['c5.presentation', 'minimal'],
      ['c5.event-photo', 'yes'],
      ['c5.published', 'yes'],
      ['c5.went-out', 'yes'],
      ['c5.old-jacket', 'table'],
    ]) {
      expect(
        apartmentEndingArt5({ ...s, choices: { ...s.choices, [key]: value } }),
      ).toBeUndefined();
    }
  },
  20000,
);

it.each(['minimal', 'glamorous', 'provocative'])(
  'never borrows professional art for %s',
  (look) => {
    const s = c5(
      walk5(upgrade(paid), [
        'begin',
        'go-spend',
        'spend-nothing',
        'echo-listing',
        'invitation-attend',
        'look-' + look,
      ]),
      'attention-coffee',
    );
    const entry = s.history.find((h) =>
      h.blocks.some((b) => b.text.startsWith('You leave the programme table and wait outside')),
    )!;
    expect(coffeeBeats5(s, entry)?.some((b) => b.file)).toBe(false);
  },
  15000,
);
