import { it, expect } from 'vitest';
import { departure, assignment, evening, choose4 as c } from '../chapter4-helpers';
import { information, choose as c3 } from '../chapter3-next-helpers';
import { chapter4Blocks, chapter4Choices } from '../../src/content/chapter4';
import { get4, records4 } from '../../src/content/chapter4-model';
import { readingBlocks } from '../../src/ui/reading-presentation';
import { conversationHistory, currentPlace } from '../../src/ui/chapter4-presentation';
import { journalEntries } from '../../src/ui/journal-entries';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import type { GameState } from '../../src/state/schema';
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join(' ');
const path3 = (s: GameState, ids: string[]) => ids.reduce(c3, s);
const path4 = (s: GameState, ids: string[]) => ids.reduce(c, s);
it.each(['retain', 'correct', 'allow', 'negotiate', 'pressure'])(
  'carries the actual Marcus %s outcome into the opening',
  (mode) => {
    let s = path3(information(), [
      'open-invitation',
      'request-brief',
      'accept-session',
      'open-case',
      'case-qualified',
      'reception-embrace',
      'photo-refuse',
      'read-marcus',
      'authenticate-note',
      'memo-' + mode,
      'open-calendar',
      'depart-own',
    ]);
    const old = structuredClone(s);
    s = c(s, 'begin');
    const opening = s.history
      .at(-1)!
      .blocks.map((b) => b.text)
      .join(' ');
    const expected: Record<string, string> = {
      retain: 'reply beneath it is empty',
      correct: 'Both versions',
      allow: 'let the wording stand',
      negotiate: 'procurement address',
      pressure: 'withdrawn the follow-up',
    };
    expect(opening).toContain(expected[mode]);
    expect(s.npcs).toEqual(old.npcs);
    expect(s.day).toEqual(old.day);
    expect(decodeSave(encodeSave(s))).toEqual(s);
  },
);
it('does not withdraw a nonexistent personal invitation after a professional-only audit', () => {
  const s = evening(undefined, false, 'exploit');
  expect(get4(s, 'personal-withdrawn')).toBeUndefined();
  expect(records4(s).some((r) => r.key === 'c4.invitation-withdrawn')).toBe(false);
  expect(text(s)).not.toContain('I also withdraw the personal invitation');
  expect(get4(s, 'audit-paid')).toBe('900');
});
it.each(['personal', 'mixed', 'instrumental'])(
  'does not infer desire from %s motive or authorization',
  (motive) => {
    const s = path4(evening(), ['motive-' + motive, 'consent-sex']);
    expect(get4(s, 'desire')).toBe('not-established');
    expect(get4(s, 'willingness')).toBe('willing');
    expect(
      records4(s)
        .filter((r) => r.key.endsWith('-julian-mercer'))
        .some((r) => r.text.includes('Player-selected motive')),
    ).toBe(false);
  },
);
it('keeps records in the journal and authenticated save without speaking private choice labels', () => {
  const s = path4(evening(), ['motive-instrumental', 'consent-no-sex']);
  const before = encodeSave(s);
  const visible = conversationHistory(s);
  expect(visible.length).toBeLessThan(s.history.length);
  expect(
    visible.some((h) => h.blocks.some((b) => b.text.startsWith('Player-selected motive:'))),
  ).toBe(false);
  expect(journalEntries(s).some((e) => e.id === 'c4.private-motive')).toBe(true);
  expect(
    s.history.some((h) =>
      h.blocks.some(
        (b) => b.kind === 'speech' && b.text === 'Explore private time with an instrumental motive',
      ),
    ),
  ).toBe(false);
  expect(encodeSave(s)).toBe(before);
});
it('does not reveal the sender internal identifier in delivery journal labels', () => {
  const s = path4(departure('rook'), ['begin', 'payoff']);
  const delivered = journalEntries(s).filter((e) => e.id.startsWith('c4.sent-'));
  expect(delivered.some((e) => e.text.startsWith('Unknown sender received:'))).toBe(true);
  expect(delivered.map((e) => e.title + ' ' + e.text).join(' ')).not.toMatch(/\brook\b/i);
});
it('represents a second simultaneous later call as missed, not as extra time', () => {
  let s = path4(departure('own', { extra: ['move-maya', 'move-sloane'] }), [
    'begin',
    'payoff',
    'keep-maya',
  ]);
  expect(get4(s, 'clock')).toBe('1155');
  expect(chapter4Choices(s).some((o) => o.id === 'chapter4.keep-sloane')).toBe(false);
  s = c(s, 'repair-sloane');
  expect(get4(s, 'cal-sloane')).toBe('repair-requested');
  expect(get4(s, 'clock')).toBe('1155');
});
it('puts the coordinator exchange after arrival and keeps private bookings out of the clerk reply', () => {
  let s = path4(assignment(departure('julian-mercer')), [
    'accept-audit',
    'inspect-receipt',
    'inspect-template',
    'assess',
    'report-process',
    'interest-professional',
    'outside-professional',
    'favor-accept',
    'notice-boundary',
  ]);
  expect(chapter4Blocks(s)[0].text).toContain('return to the Helix case desk');
  s = path4(s, ['power-honest', 'quiet-evening', 'collect']);
  const response = s.history
    .at(-2)!
    .blocks.map((b) => b.text)
    .join(' ');
  expect(response).not.toContain('booking ended yesterday');
  expect(text(s)).not.toContain('Later, you return home and sleep');
});
it('gives Sloane the response to the report actually delivered to her', () => {
  const s = path4(assignment(departure('sloane')), [
    'public-sloane',
    'inspect-receipt',
    'inspect-template',
    'assess',
    'report-process',
  ]);
  const response = s.history.at(-2)!.blocks;
  expect(response.some((b) => b.kind === 'speech' && b.speaker === 'Sloane · reply')).toBe(true);
  expect(response.some((b) => b.kind === 'speech' && b.speaker === 'Records clerk')).toBe(false);
});
it('projects frozen checkpoint prose only at its original scene without mutating the source', () => {
  const block = {
    kind: 'narrative' as const,
    text: 'Scene 2 ends here. The clinical follow-up and later Chapter 3 scenes remain ahead.',
  };
  const original = structuredClone(block);
  expect(readingBlocks([block], 'chapter3.nightComplete')[0].text).toContain(
    'morning follow-up notice',
  );
  expect(readingBlocks([block], 'chapter4.entry')).toEqual([block]);
  expect(block).toEqual(original);
  const s = departure();
  s.phase = 'truths';
  expect(currentPlace(s, '16:00')).toContain('16:00–17:00');
});
