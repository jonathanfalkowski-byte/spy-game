import {chapter5Scenes} from '../../src/content/chapter5';
import {chapter6Scenes} from '../../src/content/chapter6';
import {chapter7Scenes} from '../../src/content/chapter7';
import {chapter8Scenes} from '../../src/content/chapter8';
import {chapter9Scenes} from '../../src/content/chapter9';
import { chapter10Scenes } from '../../src/content/chapter10';
import { chapter11Scenes } from '../../src/content/chapter11';
import {chapter4Scenes} from '../../src/content/chapter4';
import { nextSceneDefinitions } from '../../src/content/chapter3-next';
import { missionChoices } from '../../src/content/mission';
import { it, expect } from 'vitest';
import { scenes, sceneBlocks } from '../../src/content/scenes';
import { dayChoices } from '../../src/content/day';
import { clinicChoices } from '../../src/content/clinic';
import { dialogue } from '../../src/content/dialogue';
import { chapter3Choices } from '../../src/content/chapter3';
import { eveningChoices } from '../../src/content/chapter3-evening';
import { validateContent } from '../../src/content/validate';
import { act, availableIntents, initialState, nodeOf } from '../../src/state/reducer';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { toMaya, toAnalysis, choice, advance, apply } from '../helpers';
it('validates legacy nodes reach their existing endpoints; revisions 14 through 16 are covered by playable route tests', () => {
  expect(validateContent).not.toThrow();
  const reachable = new Set([
    'dayend.cautious',
    'dayend.walkaway',
    'mission.complete',
    'clinic.stopped',
    'chapter3.complete',
    'chapter3.nightComplete',
  ]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const s of scenes) {
      const next = [
        s.next,
        ...[...dialogue, ...dayChoices, ...clinicChoices, ...missionChoices, ...chapter3Choices]
          .filter((c) => c.node === s.id)
          .map((c) => c.next),
      ];
      if (s.id === 'helix.analysis') next.push('helix.review');
      if (s.id.startsWith('chapter3.')) next.push(...eveningChoices({...initialState(),scene:'chapter3',phase:s.id.split('.')[1]}).map(c=>c.next));
      if (s.id === 'helix.review') next.push('helix.submitted');
      if (next.some((id) => id && reachable.has(id)) && !reachable.has(s.id)) {
        reachable.add(s.id);
        changed = true;
      }
    }
  }
  expect(reachable.size).toBe(scenes.length-Object.keys(nextSceneDefinitions).length-chapter4Scenes.length-chapter5Scenes.length-chapter6Scenes.length-chapter7Scenes.length-chapter8Scenes.length-chapter9Scenes.length-chapter10Scenes.length-chapter11Scenes.length);
});
for (const promotion of ['professional', 'angry', 'joke', 'quiet'])
  for (const benton of ['obey', 'push', 'promotion'])
    it(`office route: ${promotion} / ${benton}`, () => {
      const s = toAnalysis('friend', 'yes', promotion, benton);
      expect(nodeOf(s)).toBe('helix.analysis');
      expect(s.choices.promotion).toBe('promotion.' + promotion);
      expect(s.choices.benton).toBe('benton.' + benton);
      expect(s.npcs.daniel.known.some((k) => k.source === 'Adrian’s reply at his desk')).toBe(true);
      expect(
        s.npcs.benton.known.some((k) => k.source === 'Adrian’s spoken response to the assignment'),
      ).toBe(true);
    });
it('covers every dialogue choice and Maya combination with exact resume and a working exit', () => {
  const visited = new Set<string>();
  for (const bond of ['friend', 'love', 'colleague'])
    for (const morning of ['yes', 'work', 'day', 'ignore']) {
      const base = toMaya({ bond, morning, search: 'personnel' });
      visited.add('bond.' + bond);
      visited.add('morning.' + morning);
      for (const emotion of ['fine', 'hurt', 'angry', 'deflect'])
        for (const invite of ['yes', 'maybe', 'no'])
          for (const disclosure of ['voss', 'contradiction', 'private', 'nothing']) {
            let s = choice(base, 'mayaPromotion.' + emotion);
            visited.add('mayaPromotion.' + emotion);
            expect(
              sceneBlocks(s)
                .map((b) => b.text)
                .join(' '),
            ).toContain(
              morning === 'yes'
                ? 'absolutely'
                : morning === 'work'
                  ? 'probably working'
                  : morning === 'day'
                    ? 'terrible the day'
                    : 'never answered',
            );
            s = choice(s, 'invitation.' + invite);
            visited.add('invitation.' + invite);
            s = choice(s, 'disclosure.' + disclosure);
            visited.add('disclosure.' + disclosure);
            expect(availableIntents(s).length).toBeGreaterThan(0);
            const restored = decodeSave(encodeSave(s));
            expect(restored).toEqual(s);
            s = advance(restored);
            expect(nodeOf(s)).toBe('ending.complete');
            expect(availableIntents(s)).toEqual([{ type: 'DAY_CHOOSE', id: 'day.begin' }]);
            expect(s.npcs.sloane.known).toEqual([]);
          }
    }
  dialogue
    .filter((c) => !['promotion', 'benton'].includes(c.slot))
    .forEach((c) => expect(visited.has(c.id), c.id).toBe(true));
}, 30000);
it('all legal actions commit and stale copies fail; bounded random walks never dead-end', () => {
  for (let seed = 1; seed <= 60; seed++) {
    let n = seed;
    const random = () => {
      n = (n * 1664525 + 1013904223) >>> 0;
      return n;
    };
    let s = initialState();
    for (let step = 0; step < 110 && s.scene !== 'ending'; step++) {
      let actions = availableIntents(s);
      expect(actions.length, nodeOf(s)).toBeGreaterThan(0);
      for (const a of actions) expect(act(s, a)).not.toBe(s);
      if (step > 75)
        actions = actions.filter(
          (a) =>
            !['TOGGLE_EVIDENCE', 'REVISE_ASSESSMENT', 'REQUEST_HINT', 'CONNECT_EVIDENCE'].includes(
              a.type,
            ),
        );
      const a = actions[random() % actions.length];
      s = apply(s, a);
    }
    expect(nodeOf(s)).toBe('ending.complete');
  }
}, 30000);
