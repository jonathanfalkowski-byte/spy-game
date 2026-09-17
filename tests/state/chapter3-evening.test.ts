import { it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { act, reducer, replay, availableIntents, initialState } from '../../src/state/reducer';
import { StateSchema } from '../../src/state/schema';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { eveningChoices, eveningBlocks } from '../../src/content/chapter3-evening';
import {
  pressureSource,
  mayaKnowsAdaptation,
  identityDisclosure,
} from '../../src/state/chapter3-provenance';
import { journalEntries } from '../../src/ui/journal-entries';
import { scene1End, scene2, chooseEvening as choose } from '../chapter3-evening-helpers';

it('freezes the complete content12 graph against its reviewed commit', () => {
  const manifest = JSON.parse(
    readFileSync('src/persistence/legacy-v12/content-12-hashes.json', 'utf8'),
  );
  expect(Object.keys(manifest.files)).toHaveLength(38);
  for (const [file, hash] of Object.entries(manifest.files)) {
    const bytes = readFileSync('src/persistence/legacy-v12/' + file);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hash);
    expect(
      bytes.equals(execFileSync('git', ['show', manifest.sourceCommit + ':src/' + file])),
    ).toBe(true);
  }
});
it.each([false, true])(
  'continues authentic content12 only by explicit choice, preserving every prefix field (home %s)',
  (home) => {
    const current = scene1End('lookup', { home });
    const old = replay(current.ledger, 12);
    expect({ ...current, contentRevision: 12 }).toEqual(old);
    const raw = encodeSave(old);
    expect(JSON.parse(raw).contentVersion).toBe(12);
    const loaded = loadGame({
      getItem: () => raw,
      setItem: () => {
        throw Error('must not write on load');
      },
    });
    expect(loaded.kind).toBe('ready');
    expect(decodeSave(raw)).toEqual(old);
    const next = act(old, { type: 'CONTINUE_CHAPTER3_SCENE2' });
    expect(next.contentRevision).toBe(13);
    expect(next.phase).toBe('mayaContact');
    expect(next.ledger.slice(0, -1)).toEqual(old.ledger);
    expect(next.history.slice(0, old.history.length)).toEqual(old.history);
    expect(next.npcs).toEqual(old.npcs);
    expect(next.day).toEqual(old.day);
    expect(decodeSave(encodeSave(next))).toEqual(next);
    const forged = structuredClone(old);
    forged.relationships.mayaTrust++;
    expect(act(forged, { type: 'CONTINUE_CHAPTER3_SCENE2' })).toBe(forged);
    expect(
      reducer(old, { type: 'CONTINUE_CHAPTER3_SCENE2', expectedRevision: old.revision - 1 }),
    ).toBe(old);
    expect(act(initialState(12), { type: 'CONTINUE_CHAPTER3_SCENE2' }).contentRevision).toBe(12);
    expect(availableIntents(replay(current.ledger, 11))).not.toContainEqual({
      type: 'CONTINUE_CHAPTER3_SCENE2',
    });
  },
);
it('rejects revision-envelope mismatch, forged snapshots and unknown events', () => {
  const raw = JSON.parse(encodeSave(scene2()));
  raw.contentVersion = 12;
  expect(() => decodeSave(JSON.stringify(raw))).toThrow();
  const s = scene2();
  const altered = structuredClone(s);
  altered.npcs.sloane.known.push({
    key: 'invented',
    source: 'phone monitoring',
    event: s.revision,
  });
  expect(() => decodeSave(encodeSave(altered))).toThrow();
  expect(act(s, { type: 'CHAPTER3_CHOOSE', id: 'chapter3.pressure-warn' })).toBe(s);
});
it.each(['lookup', 'warning', 'access'] as const)(
  'selects only authenticated %s pressure and closes every offered response',
  (tier) => {
    const start = scene2(tier);
    expect(pressureSource(start)).toBe(tier);
    const pressure = choose(start, 'no-contact');
    if (tier === 'access')
      expect(JSON.stringify(eveningBlocks(pressure))).not.toMatch(/Maya|Reyes|Voss/);
    for (const c of eveningChoices(pressure)) {
      let s = act(pressure, { type: 'CHAPTER3_CHOOSE', id: c.id });
      expect(s.day.records.some((r) => r.key === 'chapter3.sloane-closed')).toBe(true);
      if (s.phase === 'mayaFollowup') s = choose(s, 'send-followup');
      s = choose(s, 'sleep');
      expect(s.phase).toBe('nightComplete');
      expect(availableIntents(s)).toEqual([{type:'CONTINUE_AUDIT_REVISION'},{type:'CHAPTER3_CHOOSE',id:'chapter3.begin-followup'}]);
      expect(StateSchema.safeParse(s).success).toBe(true);
      expect(decodeSave(encodeSave(s))).toEqual(s);
      expect(s.relationships).toEqual(start.relationships);
      expect(s.clinic).toEqual(start.clinic);
      expect(s.mission).toEqual(start.mission);
      expect(s.day.employment).toBe(start.day.employment);
      expect(s.day.housing).toBe(start.day.housing);
      expect(s.npcs.voss).toEqual(start.npcs.voss);
      expect(
        journalEntries(s)
          .filter((r) => r.id.startsWith('chapter3.'))
          .every((r) => r.milestone === 'chapter3'),
      ).toBe(true);
    }
  },
);
it.each(['lookup', 'warning'] as const)(
  'fails closed when any %s receipt chain component is absent or mismatched',
  (tier) => {
    const good = scene2(tier),
      key = tier === 'lookup' ? 'voss_lookup' : 'warning';
    for (const mutation of [
      (s: typeof good) => {
        s.day.exposure = s.day.exposure.filter((e) => e.key !== key);
      },
      (s: typeof good) => {
        s.npcs.sloane.known = s.npcs.sloane.known.filter((e) => e.key !== key);
      },
      (s: typeof good) => {
        s.day.records = s.day.records.filter((e) => e.key !== 'maya_' + tier);
      },
      (s: typeof good) => {
        s.npcs.sloane.known.find((e) => e.key === key)!.event = s.revision;
      },
      (s: typeof good) => {
        s.day.exposure.find((e) => e.key === key)!.source = 'monitored contact';
      },
    ]) {
      const bad = structuredClone(good);
      mutation(bad);
      expect(pressureSource(bad)).toBe('access');
    }
  },
);
it('does not turn a private bond, witnessed escort or new monitored call into Sloane receipt', () => {
  const start = scene2();
  const before = structuredClone(start.npcs.sloane);
  let s = choose(start, 'call');
  expect(mayaKnowsAdaptation(s)).toBe(false);
  expect(eveningChoices(s).find((c) => c.id === 'chapter3.tell-identity')!.hint).toContain(
    identityDisclosure,
  );
  s = choose(s, 'tell-identity');
  expect(mayaKnowsAdaptation(s)).toBe(true);
  expect(s.day.exposure.at(-1)!.source).toContain(identityDisclosure);
  expect(s.npcs.sloane).toEqual(before);
  s = choose(s, 'close-call');
  expect(pressureSource(s)).toBe('access');
  expect(eveningChoices(s).every((c) => !c.id.startsWith('chapter3.pressure-'))).toBe(true);
});
it('honors received adaptation knowledge and offers only real missed-call and lie corrections', () => {
  let s = choose(scene2('access', { identity: true }), 'call');
  expect(JSON.stringify(eveningBlocks(s))).toContain('How did the day end');
  expect(eveningChoices(s).map((c) => c.id)).not.toContain('chapter3.tell-identity');
  expect(eveningChoices(s).map((c) => c.id)).not.toContain('chapter3.apologize');
  s = choose(scene2('access', { miss: true, lie: true }), 'call');
  const trust = s.relationships.mayaTrust;
  s = choose(choose(s, 'apologize'), 'correct-account');
  expect(
    s.npcs.maya.known.some((k) => k.key === 'Adrian says he is tired from Benton’s assignment'),
  ).toBe(true);
  expect(s.relationships.mayaTrust).toBe(trust);
  expect(eveningChoices(s).map((c) => c.id)).not.toContain('chapter3.apologize');
  expect(eveningChoices(s).map((c) => c.id)).not.toContain('chapter3.correct-account');
});
it('records an explicitly accepted future call and does not cancel it through private distance', () => {
  let s = choose(choose(scene2('lookup'), 'call'), 'tell-boundary');
  s = choose(s, 'arrange-contact');
  expect(s.day.records.find((r) => r.key === 'chapter3.next-contact')!.text).toContain('06:45');
  expect(
    s.history
      .flatMap((h) => h.blocks)
      .some((b) => b.speaker === 'Maya' && b.text.startsWith('Yes. Call me at 06:45')),
  ).toBe(true);
  const maya = structuredClone(s.npcs.maya);
  s = choose(s, 'pressure-distance');
  expect(s.npcs.maya).toEqual(maya);
  s = choose(s, 'sleep');
  expect(JSON.stringify(eveningBlocks(s))).toContain('has not happened yet');
});
it('allows deliberate noncontact and an unsent follow-up without fabricating Maya knowledge', () => {
  const start = scene2('warning', { refused: true });
  const s = choose(
    choose(choose(choose(start, 'no-contact'), 'pressure-warn'), 'withhold-followup'),
    'sleep',
  );
  expect(s.npcs.maya).toEqual(start.npcs.maya);
  expect(s.relationships).toEqual(start.relationships);
  expect(s.day.employment).toBe('terminated');
  expect(s.day.housing).toBe('notice30');
  expect(s.day.records.filter((r) => r.key === 'termination')).toEqual(
    start.day.records.filter((r) => r.key === 'termination'),
  );
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
it('round-trips every new phase with stale and repeated choices rejected', () => {
  let s = scene2('lookup', { miss: true, lie: true });
  for (const id of [
    'call',
    'apologize',
    'correct-account',
    'tell-home',
    'close-call',
    'pressure-truth',
    'send-followup',
    'sleep',
  ]) {
    expect(decodeSave(encodeSave(s))).toEqual(s);
    const previous = s;
    s = choose(s, id);
    expect(
      reducer(s, {
        type: 'CHAPTER3_CHOOSE',
        id: 'chapter3.' + id,
        expectedRevision: previous.revision,
      }),
    ).toBe(s);
  }
  expect(mayaKnowsAdaptation(s)).toBe(true);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
