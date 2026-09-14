import { EventSchema as DayV3Event } from '../../src/persistence/legacy-v3/state/actions';
import { it, expect } from 'vitest';
import { day, checkpoint, atOffer, evening, endAccepted } from '../day-helpers';
import { sceneBlocks } from '../../src/content/scenes';
import { availableDayChoices } from '../../src/content/day';
import { replay } from '../../src/state/reducer';
import { decodeSave, loadGame } from '../../src/persistence/saves';
import { replay as replayV3 } from '../../src/persistence/legacy-v3/state/reducer';
const text = (s: ReturnType<typeof checkpoint>) =>
  sceneBlocks(s)
    .map((b) => b.text)
    .join(' ');
it('keeps candidate identifiers out of unopened scenes and choice hints', () => {
  for (const s of [
    day(checkpoint(), 'day.begin'),
    day(day(checkpoint(), 'day.begin'), 'file.leave'),
  ]) {
    const visible =
      text(s) +
      ' ' +
      availableDayChoices(s)
        .map((c) => c.label + ' ' + c.hint)
        .join(' ');
    expect(visible).not.toMatch(/candidate|ORACLE|Evelyn|Lena Voss/i);
  }
});
it('Maya places the check-in call consistently in prose and knowledge', () => {
  for (const channel of ['meet', 'call']) {
    let s = day(day(day(evening(), 'evening.' + channel), 'disclose.medical'), 'closure.checkin');
    expect(text(s)).toContain('I call you at six-thirty');
    expect(s.npcs.maya.known.some((k) => k.key.startsWith('Maya will call Adrian at 06:30'))).toBe(
      true,
    );
    s = day(s, 'evening.end');
    expect(text(s)).toContain('Maya will call at 06:30');
    expect(text(s)).not.toContain('Maya is expecting a call');
  }
});
it('evening responses acknowledge only witnessed or delivered events', () => {
  for (const security of ['comply', 'reason', 'maya']) {
    const s = evening(atOffer(security));
    expect(
      s.npcs.maya.known.some(
        (k) => k.source === 'Maya witnessed the escort through the compliance partition',
      ),
    ).toBe(true);
    expect(text(s)).toContain(security === 'maya' ? 'You said Security' : 'I saw them');
    const talk = day(day(s, 'evening.call'), 'disclose.lie');
    expect(text(talk)).toContain(
      security === 'maya' ? 'You told me Security' : 'I watched Security',
    );
    expect(text(talk)).not.toContain('after that security alert');
  }
  expect(text(evening(atOffer(), true))).toContain('after the security alert');
});
it('migrates v3 prose saves at every day-zero phase and rejects altered old history', () => {
  const endings = [
    endAccepted(
      evening(atOffer('maya', 'planted', 'maya', 'sloane', true), true),
      'call',
      'medical',
      'checkin',
    ),
    endAccepted(evening(), 'meet', 'security', 'evelyn'),
    day(day(atOffer(), 'offer.refuse'), 'refusal.walk'),
    day(day(checkpoint(), 'day.begin'), 'file.leave'),
  ];
  for (const end of endings)
    for (let i = 0; i <= end.ledger.length; i++) {
      const ledger = end.ledger.slice(0, i),
        old = replayV3(DayV3Event.array().parse(ledger));
      const raw = JSON.stringify({ schemaVersion: 3, contentVersion: 3, state: old });
      const current = decodeSave(raw);
      expect(current).toEqual(replay(ledger));
      for (const key of ['choices', 'ledger', 'scene', 'phase', 'relationships'] as const)
        expect(current[key]).toEqual(old[key]);
      expect(current.day.outcome).toBe(old.day.outcome);
      expect(
        loadGame({
          getItem: () => raw,
          setItem: () => {
            throw Error('read only');
          },
        }),
      ).toMatchObject({ kind: 'ready', raw });
    }
  const old = replayV3(DayV3Event.array().parse(endings[0].ledger));
  old.history[0].blocks[0].text = 'tampered';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 3, contentVersion: 3, state: old })),
  ).toThrow();
}, 30000);
