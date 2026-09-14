import { it, expect } from 'vitest';
import { act, availableIntents, nodeOf, replay, reducer } from '../../src/state/reducer';
import { sceneBlocks } from '../../src/content/scenes';
import { dayScenes, dayChoices, availableDayChoices } from '../../src/content/day';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v2/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v2/state/actions';
import { day, checkpoint, atOffer, evening, endAccepted } from '../day-helpers';
import { choice, advance, toMaya, finish } from '../helpers';
const prose = (s: ReturnType<typeof checkpoint>) =>
  sceneBlocks(s)
    .map((b) => b.text)
    .join(' ');
const seen = new Set<string>();
it('all report qualities continue unchanged and new state tampering is rejected', () => {
  for (const assessment of ['bounded', 'personnel', 'data', 'fraud', 'insufficient'] as const) {
    let s = finish(toMaya({ assessment, conflict: assessment !== 'insufficient' }));
    const report = s.report;
    for (const id of [
      'day.begin',
      'file.open',
      'file.authorize',
      'security.turn',
      'security.comply',
      'security.enter',
      'intro.arrest',
      'leverage.need',
      'brief.mission',
      'attention.exit',
    ])
      s = day(s, id);
    s = endAccepted(evening(s), 'avoid');
    expect(s.report).toEqual(report);
    expect(s.npcs.sloane.known.some((x) => x.source.includes('Helix report'))).toBe(false);
    const raw = JSON.parse(encodeSave(s));
    raw.state.day.biometric = false;
    expect(() => decodeSave(JSON.stringify(raw))).toThrow();
  }
});
function verify(s: ReturnType<typeof checkpoint>) {
  expect(replay(s.ledger)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const e of s.ledger) if (e.action.type === 'DAY_CHOOSE') seen.add(e.action.id);
}
it('keeps checkpoint explicit and migrates v2 without losing choices or adding consent', () => {
  const now = checkpoint();
  for (let i = 0; i <= now.ledger.length; i++) {
    const ledger = OldEvent.array().parse(now.ledger.slice(0, i));
    expect(
      decodeSave(JSON.stringify({ schemaVersion: 2, contentVersion: 2, state: oldReplay(ledger) })),
    ).toEqual(replay(ledger));
  }
  const old = oldReplay(OldEvent.array().parse(now.ledger));
  const raw = JSON.stringify({ schemaVersion: 2, contentVersion: 2, state: old });
  const restored = decodeSave(raw);
  expect(restored).toEqual(now);
  expect(restored.day.biometric).toBe(false);
  expect(nodeOf(restored)).toBe('ending.complete');
  expect(
    loadGame({
      getItem: () => raw,
      setItem: () => {
        throw Error('must not write');
      },
    }),
  ).toMatchObject({ kind: 'ready', raw });
  old.choices.bond = 'bond.love';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 2, contentVersion: 2, state: old })),
  ).toThrow();
});
it('handles all ordered subsets of file actions, reopening and cautious endings', () => {
  const visit = (ids: string[], remaining: string[]) => {
    let s = day(checkpoint(), 'day.begin');
    for (const id of ids) {
      s = day(s, id);
      expect(act(s, { type: 'DAY_CHOOSE', id })).toBe(s);
    }
    expect(s.day.biometric).toBe(false);
    expect(s.day.fileActions).toHaveLength(ids.length);
    for (const opened of [false, true]) {
      let route = s;
      if (opened) {
        route = day(route, 'file.open');
        route = day(route, 'file.close');
        route = day(route, 'file.open');
      }
      route = day(route, opened ? 'file.withdraw' : 'file.leave');
      verify(route);
      expect(route.day.outcome).toBe('cautious');
      expect(route.day.phone).toBe('personal');
      expect(route.npcs.sloane.known).toEqual([]);
      expect(route.knowledge).not.toContain('evelyn_package');
      expect(availableIntents(route)).toEqual([]);
    }
    for (const id of remaining)
      visit(
        [...ids, id],
        remaining.filter((x) => x !== id),
      );
  };
  visit([], ['file.report', 'file.delete', 'file.trace']);
});
it('guards biometric access, obsolete actions and hidden Maya leverage', () => {
  let s = day(checkpoint(), 'day.begin');
  expect(act(s, { type: 'DAY_CHOOSE', id: 'file.authorize' })).toBe(s);
  s = day(s, 'file.open');
  const stale = { type: 'DAY_CHOOSE', id: 'file.authorize', expectedRevision: s.revision };
  s = day(s, 'file.authorize');
  expect(act(s, { type: 'DAY_CHOOSE', id: 'file.authorize' })).toBe(s);
  expect(reducer(s, stale)).toBe(s);
  let noExposure = day(day(day(s, 'security.turn'), 'security.comply'), 'security.enter');
  noExposure = day(noExposure, 'intro.silent');
  expect(availableDayChoices(noExposure).map((c) => c.id)).not.toContain('leverage.maya');
  expect(act(noExposure, { type: 'DAY_CHOOSE', id: 'leverage.maya' })).toBe(noExposure);
});
it('all security, Sloane, attention and refusal choices have sourced consequences', () => {
  for (const security of ['comply', 'reason', 'maya'])
    for (const intro of ['arrest', 'planted', 'counsel', 'silent'])
      for (const voss of [false, true])
        for (const leverage of security === 'maya' || voss
          ? ['need', 'fight', 'maya']
          : ['need', 'fight'])
          for (const attention of ['evelyn', 'sloane', 'exit']) {
            const s = atOffer(security, intro, leverage, attention, voss);
            verify(s);
            expect(s.day.exposure.some((e) => e.key === 'warning')).toBe(security === 'maya');
            expect(s.day.exposure.some((e) => e.key === 'voss_lookup')).toBe(voss);
            expect(s.npcs.sloane.known.some((x) => x.key.includes('looked at'))).toBe(true);
            expect(s.relationships).toEqual(checkpoint(voss).relationships);
          }
  let s = day(atOffer(), 'offer.refuse');
  expect(s.day.employment).toBe('terminated');
  expect(s.day.phone).toBe('returned');
  verify(day(s, 'refusal.walk'));
  s = day(s, 'refusal.return');
  verify(day(s, 'return.leave'));
  s = day(s, 'return.accept');
  verify(s);
  expect(s.day.employment).toBe('terminated');
  expect(s.day.housing).toBe('notice30');
  expect(prose(s)).toContain('remained with you');
  expect(prose(s)).not.toContain('confiscated phone beside');
});
it('briefing questions work in either order exactly once', () => {
  let s = atOffer();
  s = replay(s.ledger.slice(0, -2));
  for (const order of [
    ['question.insider', 'question.why'],
    ['question.why', 'question.insider'],
  ]) {
    let r = s;
    for (const id of order) {
      r = day(r, id);
      expect(act(r, { type: 'DAY_CHOOSE', id })).toBe(r);
    }
    verify(day(day(r, 'brief.mission'), 'attention.exit'));
  }
});
it('all evening branches finish; monitored calls and private meetings have distinct knowledge paths', () => {
  const disclosureLine = dayChoices.find((c) => c.id === 'closure.evelyn')!.label;
  for (const detail of ['Sloane', 'tomorrow', 'made from me', 'Evelyn Vale'])
    expect(disclosureLine).toContain(detail);
  for (const bond of ['friend', 'love', 'colleague'])
    for (const invitation of ['yes', 'maybe', 'no'])
      for (const reconsider of [false, true])
        for (const channel of ['meet', 'call', 'avoid'])
          for (const disclosure of channel === 'avoid'
            ? ['medical']
            : ['medical', 'security', 'lie'])
            for (const closure of channel === 'avoid'
              ? ['checkin']
              : ['checkin', 'evelyn', 'distance']) {
              let start = toMaya({ bond });
              start = choice(start, 'mayaPromotion.fine');
              start = choice(start, 'invitation.' + invitation);
              start = choice(start, 'disclosure.private');
              start = advance(start);
              for (const id of [
                'day.begin',
                'file.open',
                'file.authorize',
                'security.turn',
                'security.comply',
                'security.enter',
                'intro.arrest',
                'leverage.need',
                'brief.mission',
                'attention.exit',
              ])
                start = day(start, id);
              const s = endAccepted(evening(start, reconsider), channel, disclosure, closure);
              verify(s);
              expect(s.day.outcome).toBe('accepted');
              expect(availableIntents(s)).toEqual([{ type: 'CLINIC_CHOOSE', id: 'clinic.begin' }]);
              expect(s.day.exposure.some((x) => x.key.startsWith('call_'))).toBe(
                channel === 'call',
              );
              expect(s.npcs.maya.known.some((x) => x.key.includes('woman’s identity'))).toBe(
                channel !== 'avoid' && closure === 'evelyn',
              );
              expect(s.day.records.filter((x) => x.key.startsWith('warning.'))).toHaveLength(3);
              if (channel === 'call') {
                const h = s.history
                  .filter((x) => x.node === 'evening.goodbye')
                  .flatMap((x) => x.blocks)
                  .map((x) => x.text)
                  .join(' ');
                expect(h).not.toContain('across the table');
                expect(h).not.toContain('enter the cab');
              }
            }
}, 60000);
it('every new phase saves exactly and all authored choices are exercised', () => {
  const ends = [
    endAccepted(
      evening(atOffer('maya', 'planted', 'maya', 'sloane', true), true),
      'call',
      'security',
      'evelyn',
    ),
    day(day(atOffer(), 'offer.refuse'), 'refusal.walk'),
    day(day(day(atOffer(), 'offer.refuse'), 'refusal.return'), 'return.leave'),
    day(day(checkpoint(), 'day.begin'), 'file.leave'),
    day(day(day(checkpoint(), 'day.begin'), 'file.open'), 'file.withdraw'),
    endAccepted(evening(), 'meet', 'medical', 'checkin'),
  ];
  const phases = new Set<string>();
  for (const end of ends)
    for (let i = 0; i <= end.ledger.length; i++) {
      const s = replay(end.ledger.slice(0, i));
      phases.add(nodeOf(s));
      expect(decodeSave(encodeSave(s))).toEqual(s);
      if (s.scene !== 'dayend') expect(availableIntents(s).length).toBeGreaterThan(0);
    }
  for (const s of dayScenes) expect(phases.has(s.id), s.id).toBe(true);
  for (const c of dayChoices) expect(seen.has(c.id), c.id).toBe(true);
});
