import { it, expect } from 'vitest';
import {
  loadGame,
  persist,
  encodeSave,
  decodeSave,
  SAVE_KEY,
  MAX_SAVE_BYTES,
} from '../../src/persistence/saves';
import { initialState, replay } from '../../src/state/reducer';
import { replay as replayOriginal } from '../../src/persistence/legacy-v1/state/reducer';
import { EventSchema as OriginalEvent } from '../../src/persistence/legacy-v1/state/actions';
import { finish, toMaya } from '../helpers';
it('round-trips every committed phase, including evidence selections, results and ending', () => {
  const final = finish(toMaya({ search: 'personnel' }));
  for (let i = 0; i <= final.ledger.length; i++) {
    const s = replay(final.ledger.slice(0, i));
    expect(decodeSave(encodeSave(s))).toEqual(s);
  }
});
it('migrates internal v1 event-only saves with current defaults', () => {
  const s = toMaya();
  expect(
    decodeSave(JSON.stringify({ schemaVersion: 1, contentVersion: 1, ledger: s.ledger })),
  ).toEqual(replay(s.ledger, 11));
  expect(decodeSave(JSON.stringify({ schemaVersion: 1, contentVersion: 1, ledger: [] }))).toEqual(
    initialState(11),
  );
});
it('rejects malformed, oversized, unknown-version, duplicate and tampered saves', () => {
  const s = finish(toMaya());
  const original = JSON.parse(encodeSave(s));
  for (const alter of [
    (v: any) => (v.schemaVersion = 100),
    (v: any) => (v.contentVersion = 100),
    (v: any) => (v.state.phase = 'forbidden'),
    (v: any) => (v.state.relationships.credibility = 900),
    (v: any) => (v.state.opportunities = 1),
    (v: any) => v.state.knowledge.push('voss_connection'),
    (v: any) => (v.state.ledger[0].action.id = 'bond.nonexistent'),
    (v: any) =>
      v.state.npcs.maya.known.push({ key: 'future_secret', source: 'omniscience', event: 1 }),
  ]) {
    const v = structuredClone(original);
    alter(v);
    expect(() => decodeSave(JSON.stringify(v))).toThrow();
  }
  expect(() => decodeSave('{')).toThrow();
  expect(() => decodeSave(' '.repeat(MAX_SAVE_BYTES + 1))).toThrow();
});
it('migrates authentic original prose saves at every phase without changing decisions or knowledge', () => {
  const final = finish(toMaya({ search: 'personnel' }));
  for (let i = 0; i <= final.ledger.length; i++) {
    const ledger = final.ledger.slice(0, i);
    const original = replayOriginal(OriginalEvent.array().parse(ledger));
    const raw = JSON.stringify({ schemaVersion: 2, contentVersion: 1, state: original });
    const migrated = decodeSave(raw);
    expect(migrated).toEqual(replay(ledger, 11));
    for (const key of [
      'ledger',
      'choices',
      'knowledge',
      'npcs',
      'relationships',
      'opportunities',
      'scene',
      'phase',
    ] as const)
      expect(migrated[key]).toEqual(
        key === 'npcs'
          ? {
              ...original.npcs,
              voss: { known: [], beliefs: [] },
              celeste: { known: [], beliefs: [] },
            }
          : original[key],
      );
    expect(
      loadGame({
        getItem: () => raw,
        setItem: () => {
          throw new Error('Loading must not write');
        },
      }),
    ).toMatchObject({ kind: 'ready', raw });
  }
});
it('rejects tampered legacy prose and mechanical state before migration', () => {
  for (const tamper of [
    (s: any) => (s.history[0].blocks[0].text = 'invented history'),
    (s: any) => s.knowledge.push('unearned_secret'),
  ]) {
    const state = replayOriginal(OriginalEvent.array().parse(finish(toMaya()).ledger));
    tamper(state);
    expect(() =>
      decodeSave(JSON.stringify({ schemaVersion: 2, contentVersion: 1, state })),
    ).toThrow();
  }
});
it('preserves invalid storage and reports read/write failures', () => {
  let raw = '{broken';
  let writes = 0;
  const storage = {
    getItem: () => raw,
    setItem: (_k: string, v: string) => {
      writes++;
      raw = v;
    },
  };
  expect(loadGame(storage)).toMatchObject({ kind: 'invalid', raw: '{broken' });
  expect(writes).toBe(0);
  expect(
    loadGame({
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {},
    }),
  ).toMatchObject({ kind: 'invalid', error: 'denied' });
  expect(() =>
    persist(
      {
        getItem: () => null,
        setItem: () => {
          throw new Error('quota');
        },
      },
      initialState(),
      null,
    ),
  ).toThrow('quota');
});
it('isolates prototype saves and detects another-tab conflicts', () => {
  const values = new Map([['eve_m0', 'prototype unchanged']]);
  const storage = {
    getItem: (k: string) => values.get(k) ?? null,
    setItem: (k: string, v: string) => {
      values.set(k, v);
    },
  };
  const raw = persist(storage, initialState(), null);
  expect(values.get('eve_m0')).toBe('prototype unchanged');
  expect(loadGame(storage).kind).toBe('ready');
  values.set(SAVE_KEY, 'changed elsewhere');
  expect(() => persist(storage, initialState(), raw)).toThrow('Another tab');
});
