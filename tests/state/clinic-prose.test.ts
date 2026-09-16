import { it, expect } from 'vitest';
import { traverse, clinicStart } from '../clinic-helpers';
import { replay as legacyReplay } from '../../src/persistence/legacy-v5/state/reducer';
import { EventSchema as LegacyEvent } from '../../src/persistence/legacy-v5/state/actions';
import { replay } from '../../src/state/reducer';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
it('authenticates and migrates original clinic prose at every phase without changing gameplay', () => {
  const paths = [
    traverse(clinicStart(), {
      voice: ['voice.sample', 'voice.evelyn'],
      profile: 'profile.socialite',
      mirror: 'mirror.beautiful',
      wardrobe: 'outfit.socialite',
      makeup: 'makeup.custom',
    }),
    traverse(clinicStart(), { face: 'face.pause', facePause: 'stop.request' }),
  ];
  for (const end of paths)
    for (let i = 0; i <= end.ledger.length; i++) {
      const ledger = end.ledger.slice(0, i);
      const old = legacyReplay(LegacyEvent.array().parse(ledger));
      const raw = JSON.stringify({ schemaVersion: 4, contentVersion: 5, state: old });
      const current = decodeSave(raw);
      expect(current).toEqual(replay(ledger, 11));
      for (const key of [
        'choices',
        'scene',
        'phase',
        'revision',
        'ledger',
        'relationships',
        'knowledge',
        'facts',
        'claims',
        'day',
      ] as const)
        expect(current[key]).toEqual(old[key]);
      expect(current.npcs).toEqual({ ...old.npcs, celeste: { known: [], beliefs: [] } });
      const { response: oldResponse, ...oldClinic } = old.clinic;
      const { response: newResponse, ...newClinic } = current.clinic;
      expect(newClinic).toEqual(oldClinic);
      expect(decodeSave(encodeSave(current))).toEqual(current);
      expect(
        loadGame({
          getItem: () => raw,
          setItem: () => {
            throw Error('Unexpected write');
          },
        }),
      ).toMatchObject({ kind: 'ready', raw });
    }
  const old = legacyReplay(LegacyEvent.array().parse(paths[0].ledger));
  old.history[0].blocks[0].text = 'altered';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 4, contentVersion: 5, state: old })),
  ).toThrow();
}, 30000);
