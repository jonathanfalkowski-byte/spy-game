import { it, expect } from 'vitest';
import { replay, initialState } from '../../src/state/reducer';
import { replay as oldReplay } from '../../src/persistence/legacy-v8/state/reducer';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { readSize, writeSize } from '../../src/persistence/preferences';
import { journalEntries } from '../../src/ui/journal-entries';
import { day, atOffer } from '../day-helpers';
import { runMission, missionStart } from '../mission-helpers';
import { missionBlocks, availableMissionChoices, reasoningText } from '../../src/content/mission';

it('authenticates content 8 at every phase and preserves the unchanged decision ledger', () => {
  const end = runMission();
  for (let i = 0; i <= end.ledger.length; i++) {
    const ledger = end.ledger.slice(0, i),
      old = oldReplay(ledger);
    const raw = JSON.stringify({ schemaVersion: 5, contentVersion: 8, state: old });
    const current = decodeSave(raw);
    expect(current).toEqual(replay(ledger));
    expect(current.ledger).toEqual(old.ledger);
    expect([
      current.scene,
      current.phase,
      current.choices,
      current.clinic,
      current.mission,
    ]).toEqual([old.scene, old.phase, old.choices, old.clinic, old.mission]);
    expect(
      loadGame({
        getItem: () => raw,
        setItem: () => {
          throw Error('Loading must not write');
        },
      }),
    ).toMatchObject({ kind: 'ready', raw });
  }
  const bad = oldReplay(end.ledger);
  bad.relationships.mayaTrust++;
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 5, contentVersion: 8, state: bad })),
  ).toThrow('snapshot');
}, 30000);

it('appends Sloane questions once in either selection order, including after reload', () => {
  const offer = atOffer();
  const count = offer.ledger.findIndex(
    (e) => e.action.type === 'DAY_CHOOSE' && e.action.id === 'brief.mission',
  );
  for (const order of [
    ['why', 'insider'],
    ['insider', 'why'],
  ]) {
    let s = replay(offer.ledger.slice(0, count));
    for (const q of order) s = decodeSave(encodeSave(day(s, 'question.' + q)));
    const entries = s.history.filter((h) => h.node === 'sloane.brief');
    const speech = entries
      .flatMap((h) => h.blocks)
      .filter((b) => b.speaker === 'Adrian')
      .map((b) => b.text);
    expect(speech).toEqual(
      order.map((q) =>
        q === 'why' ? '“Why use an analyst with no field experience?”' : '“Who is the insider?”',
      ),
    );
    expect(
      entries
        .flatMap((h) => h.blocks)
        .filter((b) => b.text.includes('She finally gestures to the chair')),
    ).toHaveLength(1);
  }
});

it('journal attributes records to earned milestones and retains capture ownership and limits', () => {
  expect(journalEntries(initialState())).toEqual([]);
  const s = runMission(missionStart('shadow'), {
    hub: ['lead.service', 'assess.begin'],
    method: 'method.token',
  });
  const entries = journalEntries(s);
  expect(entries.find((e) => e.id === 'clinic.exam.terminal')?.milestone).toBe('clinic');
  expect(entries.find((e) => e.id === 'mission.lead.service')?.milestone).toBe('mission');
  expect(entries.some((e) => e.id === 'mission.lead.guest')).toBe(false);
  expect(entries.find((e) => e.id === 'capture')).toMatchObject({
    type: 'capture',
    source: expect.stringContaining('Evelyn'),
    limits: expect.stringContaining('incomplete proof'),
  });
});

it('a capture review does not reveal the real contact or confirm a lucky guess', () => {
  const s = runMission(missionStart(), { assessment: 'source.insufficient' }, 'method');
  expect(
    missionBlocks(s)
      .map((b) => b.text)
      .join(' '),
  ).not.toContain('Benton');
  expect(
    availableMissionChoices(s)
      .map((c) => c.label)
      .join(' '),
  ).not.toContain('Benton');
  const guess = runMission(missionStart(), {}, 'method');
  expect(reasoningText(guess)).not.toContain('Being right');
});

it('reading preference errors are harmless and values are bounded', () => {
  const broken = {
    getItem: () => {
      throw Error('Denied');
    },
    setItem: () => {
      throw Error('Full');
    },
  };
  expect(readSize(broken)).toBe('18');
  expect(writeSize(broken, '24')).toBe(false);
  expect(readSize({ getItem: () => '999', setItem: () => {} })).toBe('18');
  let value = '';
  const memory = {
    getItem: () => value,
    setItem: (_: string, v: string) => {
      value = v;
    },
  };
  expect(writeSize(memory, '24')).toBe(true);
  expect(readSize(memory)).toBe('24');
  expect(writeSize(memory, '999')).toBe(false);
  expect(value).toBe('24');
});
